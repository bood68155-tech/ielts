# IELTS Master 🎧📖✍️🗣️

A free, interactive IELTS practice web application built with **HTML, Tailwind CSS and vanilla JavaScript** — no build step, no dependencies, runs entirely in the browser.

## Features

### 🔐 Accounts & progression
- **User authentication** — create an account or sign in (demo auth; do not reuse a real password)
- **Optional Supabase/Neon sync** — when configured, accounts, profiles, training progress, exam history, saved words, study hours and chat messages are stored in the database so data follows you across devices. Without a key the app falls back seamlessly to `localStorage`.
- **Progressive CEFR levels (A1 → C2)** — Beginner to Proficiency
  - Earn XP by completing listening sections, reading passages, graded readings, writing tasks, speaking parts, weekly exams, study sessions and vocabulary practice
  - Higher levels unlock more content (e.g. A1 unlocks Listening section 1, C2 unlocks all 4) and a new shelf of graded reading
- **Learning path dashboard** — see your current CEFR level, XP progress, and exactly which content is unlocked

### 📚 Level Reading (graded A1–C2)
- 12 graded passages — two per CEFR level — with comprehension quizzes
- **Tap any highlighted word** for an instant English meaning + Arabic translation
- Save glossary words straight into your personal vocabulary builder
- +15 XP per passage completed

### 🌐 Translator (offline EN ↔ AR)
- Built-in offline English ↔ Arabic glossary (440+ entries)
- Instant word lookups and word-by-word sentence translation
- Every translated word can be added to My Words with one tap

### ⏱ Study Tracker
- Interactive focus timer (start / pause / finish) that logs your daily study hours
- Daily goal (30/60/90/120 min), last-7-days chart, lifetime stats
- 🔥 Streaks for consistent days, with XP rewards for sessions, daily goals and 7-day streaks

### 🐱 Catlango (word packs + spelling practice)
- A dedicated vocabulary and word-learning section with **six curated word packs** organised by CEFR level — A1 Beginner → C2 Proficiency
- Each pack has ~16 high-frequency IELTS words with English meaning, Arabic translation, part of speech and an example sentence
- **Interactive spelling practice** — type each word correctly based on its Arabic translation and English definition, with instant validation, progressive hints (reveals letters after wrong attempts), and a reveal button
- **Custom word creator** — add your own words with a definition, Arabic translation, part of speech and example sentence
  - Custom words are saved to local storage and synced to the database (`saved_words`), appearing instantly in **My Words**
- Per-user progress: words mastered, reviews and pack completion are saved per account and synced to the database
- +2 XP per correctly spelled word and +30 XP bonus for completing an entire pack
- Save any word straight into **My Words** with one tap

### 📒 My Words (personal vocabulary builder)
- Save words from Level Reading, the Translator, Catlango or manually (with Arabic translation)
- Flashcard review with flip cards — mark words as mastered
- Search, filter, delete; +2 XP per word, bonus XP for mastering 10 / 50 words

### 📅 Weekly Exam
- A fresh **15-question timed quiz every week** (questions are selected deterministically from a pool of 30, so they change week to week)
- 15-minute countdown timer with auto-submit
- Score history with a bar chart, best-score tracking, and XP rewards per correct answer

### 🎧 Listening
- Full mock test: 4 sections · 40 questions
- Audio is read aloud using the browser's built-in text-to-speech (Web Speech API), with a play/pause control and progress bar
- Transcript viewer for every section
- Mixed question types: multiple choice and gap-fill
- Instant scoring with per-question explanations

### 📖 Reading
- 3 academic passages · 40 questions
- Question types: Multiple Choice, True/False/Not Given, and gap-fill
- Per-passage scoring with explanations
- 60-minute exam timer (start/pause)

### ✍️ Writing
- Academic Task 1 (chart description, with a visual bar chart) and Task 2 (essay)
- Live word counter, draft autosave to localStorage, and a 60-minute timer
- Model answers and feedback on length

### 🗣️ Speaking
- Full test structure: Part 1 (interview), Part 2 (long turn with cue card), Part 3 (discussion)
- 1-minute preparation timer and 2-minute speaking timer for Part 2
- Model answers for every question

### 💬 Community feed
- Share progress, post updates, like posts and add comments
- With database configured, the feed is a **shared community feed** backed by the `posts` table; without it, posts are cached locally

### 💬 Chat & Support (real-time)
- **Community room** — real-time chat with every learner (Supabase Realtime, `postgres_changes`)
- **Official support** — ask the IELTS Master team anything; auto-replies with helpful answers
- **Direct messages** — private learner-to-learner chat
- Falls back to a shared local cache with polling when database isn't configured

## Getting started

No installation required. Open `index.html` in any modern browser (Chrome or Edge recommended for the listening text-to-speech feature).

```bash
# or serve it locally, e.g.
python -m http.server 8000
# then open http://localhost:8000
```

## Database setup

The app works fully offline with `localStorage`, but connecting to a database makes accounts, progress, exam history and the community feed persist in the cloud and sync across devices.

### Option 1: Supabase (recommended for Auth + Realtime)

1. **Create a project** at [supabase.com](https://supabase.com) (free tier is fine).
2. **Create the tables** — open your project → **SQL Editor** → **New query**, paste the contents of [`supabase/schema.sql`](supabase/schema.sql) and run it. This creates the `users`, `profiles`, `training_progress`, `exam_results`, `posts`, `chat_messages`, `saved_words` and `study_log` tables with permissive RLS policies (see the security note in the file). The script also enables **Realtime** on `chat_messages` so the chat updates live.
3. **Grab your publishable key** — open **Project Settings → API Keys** and copy the **publishable** key (modern format `sb_publishable_...`; the legacy **anon public** JWT also works).
4. **Configure the app** — open [`js/supabase-config.js`](js/supabase-config.js) and paste the key into the `anonKey` field:

   ```js
   window.SUPABASE_CONFIG = {
     url: 'https://gmmbjgjrlgibglaojflh.supabase.co',
     anonKey: 'PASTE_YOUR_ANON_KEY_HERE'
   };
   ```

   Alternatively, inject it at deploy time by setting `window.SUPABASE_ANON_KEY` before `js/supabase-config.js` loads (e.g. from an environment variable in your hosting setup).

5. **Reload the app.** While the key is missing or still a placeholder, the app automatically runs on `localStorage` — no code changes needed.

### Option 2: Neon PostgreSQL (serverless Postgres)

[Neon](https://neon.tech) provides serverless PostgreSQL with branching, autoscaling, and bottomless storage — ideal for modern web applications.

1. **Create a Neon project** at [console.neon.tech](https://console.neon.tech) (free tier available).
2. **Copy your connection string** — select your project → **Connection Details** → copy the connection string (use the **Pooled connection** option for serverless environments).
3. **Create the .env file** in the project root with your Neon credentials:

   ```bash
   cp .env.example .env
   ```

   Then edit `.env` and add your Neon connection string:

   ```env
   DATABASE_URL="postgresql://USERNAME:PASSWORD@HOST.neon.tech/DBNAME?sslmode=require"
   ```

4. **Create the database tables** — open the **Neon SQL Editor** and run the schema from [`supabase/schema.sql`](supabase/schema.sql) (the same schema works for Neon since it's standard PostgreSQL).
5. **Install the Neon serverless driver** (for backend/API usage):

   ```bash
   npm install @neondatabase/serverless
   ```

6. **Configure the app** — the `js/supabaseClient.js` will automatically detect Neon configuration. For browser-based apps, route database queries through your backend API. The `js/neon-db.js` utility provides helper functions for Node.js backends.

7. **Reload the app.**

#### Neon vs Supabase comparison

| Feature | Supabase | Neon |
|---------|----------|------|
| Authentication | ✅ Built-in Auth | ❌ Use external auth |
| Realtime | ✅ Built-in Realtime | ❌ Use WebSockets/LLM |
| Storage | ✅ Built-in Storage | ❌ Use S3/external |
| Serverless Postgres | ⚠️ Limited branching | ✅ Full branching |
| Connection pooling | ✅ Available | ✅ Native support |
| Free tier | Generous | Generous |

**Recommendation**: Use **Supabase** if you need Auth + Realtime + Storage. Use **Neon** if you want pure serverless PostgreSQL with branching for your backend.

### How the sync works

- Every write hits `localStorage` first (instant, works offline) and is then pushed to the database in the background (`UPSERT`/`INSERT`/`UPDATE`/`DELETE`).
- Reads use the local cache and refresh from the database in the background, so sign-ups, logins, feed posts and training progress are seamless whether you're online or offline.
- If the network drops, the app keeps working locally and re-syncs when the connection returns.

### Environment variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | Neon PostgreSQL connection string | Yes (for Neon) |
| `SUPABASE_URL` | Supabase project URL | Yes (for Supabase) |
| `SUPABASE_ANON_KEY` | Supabase anonymous key | Yes (for Supabase) |
| `APP_URL` | Application URL (for CORS/links) | No |
| `NODE_ENV` | Environment (development/production) | No |

## Project structure

```
ielts/
├── index.html              # Single-page app shell (all sections + auth screen)
├── css/
│   └── styles.css          # Custom styles on top of Tailwind
├── js/
│   ├── supabase-config.js  # Supabase URL + anon key (paste your key here)
│   ├── supabaseClient.js   # Supabase client init + local-first CRUD/sync layer (IELTS_DB)
│   ├── neon-db.js          # Neon PostgreSQL client utility (Node.js backend)
│   ├── data.js             # Test content + CEFR levels + graded readers + translation glossary
│   ├── auth.js             # Authentication, user profiles, XP & level gating
│   ├── levels.js           # Learning path (CEFR levels) UI
│   ├── exam.js             # Weekly exam module (timed quiz + history)
│   ├── feed.js             # Community feed (posts, likes, comments)
│   ├── training.js         # Zero-to-hero training modules
│   ├── readings.js         # Graded reading library (A1-C2) with tap-to-translate
│   ├── translator.js       # Offline English ↔ Arabic translator
│   ├── study.js            # Daily study hours tracker + interactive timer
│   ├── vocabulary.js       # Personal vocabulary builder + flashcards
│   ├── catlango.js         # Catlango word packs (A1-C2) + spelling practice
│   ├── chat.js             # Real-time chat, support & direct messages
│   └── app.js              # Application logic (navigation, timers, scoring, audio)
└── supabase/
    └── schema.sql          # Database tables + RLS policies (run in the SQL editor)
```

## Notes

- Progress, accounts and exam history are stored in your browser's `localStorage` and — when configured — mirrored to database tables.
- Authentication is demo-only and runs entirely client-side — it is not secure and should not be used with real passwords.
- The database RLS policies are intentionally permissive because the app uses its own demo auth; replace them with `auth.uid()`-based policies before any production use.
- This is an unofficial practice tool and is not affiliated with the official IELTS test partners.
