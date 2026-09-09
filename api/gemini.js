/* ============================================================
   IELTS PA — Vercel serverless proxy for the Gemini API
   ------------------------------------------------------------
   Keeps the Gemini key server-side (process.env.GEMINI_API_KEY)
   so it never ships to the browser bundle. The client posts the
   model + prompt; this function calls the Gemini REST API and
   returns the generated text only.
   ============================================================ */
const GEMINI_BASE = 'https://generativelanguage.googleapis.com/v1beta/models/';
const PROMPT_CHAR_LIMIT = 20000;

function respond(res, status, obj) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.end(JSON.stringify(obj));
}

module.exports = async function handler(req, res) {
  if (req.method === 'OPTIONS') return respond(res, 204, {});
  if (req.method !== 'POST') return respond(res, 405, { error: 'Method not allowed' });

  const key = process.env.GEMINI_API_KEY;
  if (!key) return respond(res, 500, { error: 'GEMINI_API_KEY is not configured on the server.' });

  let body = {};
  try { body = req.body || {}; } catch (e) { return respond(res, 400, { error: 'Invalid JSON body' }); }

  const model = String(body.model || 'gemini-2.0-flash').replace(/[^a-zA-Z0-9._-]/g, '');
  const system = String(body.system || '');
  const user = String(body.user || '');
  const wantsJson = !!body.json;
  const prompt = (system ? system + '\n\n' : '') + user;

  if (!user.trim()) return respond(res, 400, { error: 'Missing prompt text' });
  if (prompt.length > PROMPT_CHAR_LIMIT) return respond(res, 400, { error: 'Prompt too large' });

  try {
    const upstream = await fetch(GEMINI_BASE + encodeURIComponent(model) + ':generateContent?key=' + encodeURIComponent(key), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: Object.assign({ temperature: 0.85, maxOutputTokens: 4096 }, wantsJson ? { responseMimeType: 'application/json' } : {})
      })
    });
    const data = await upstream.json().catch(() => ({}));
    if (!upstream.ok) {
      const msg = (data && data.error && data.error.message) || ('Upstream HTTP ' + upstream.status);
      return respond(res, upstream.status, { error: msg });
    }
    const parts = (((data.candidates || [])[0] || {}).content || {}).parts;
    const out = Array.isArray(parts) ? parts.map((p) => p.text || '').join('') : '';
    if (!out.trim()) return respond(res, 502, { error: 'Empty response from Gemini' });
    return respond(res, 200, { text: out });
  } catch (e) {
    return respond(res, 502, { error: String((e && e.message) || e) });
  }
};