/* ============================================================
   IELTS PA — EmailJS configuration (REAL EMAIL DELIVERY)
   ------------------------------------------------------------
   EmailJS enables sending real verification emails to the
   learner's Gmail inbox (free tier: 200/day).

   • Service ID  : service_l5hn0k3          ← CONFIGURED ✅
   • Template ID : template_XXXXXXXXXX      ← PASTE HERE
   • Public Key  : XXXX_XXXXXXXXXXXXXX      ← PASTE HERE

   Until the two missing values are pasted below the site keeps
   using the built-in Mock Email Service (code shown on screen +
   local virtual inbox) so the OTP flow always works end to end.
   ============================================================ */
(function () {
  'use strict';
  var pc = /YOUR_|PASTE|TODO|xxx|XXXX/i;
  var serviceId = 'service_l5hn0k3';
  /* ↓↓↓ PASTE YOUR Template ID AND Public Key BELOW ↓↓↓ */
  var templateId = 'PASTE_TEMPLATE_ID_HERE';
  var publicId  = 'PASTE_PUBLIC_KEY_HERE';
  /* ↑↑↑ --------------------------------------------------- ↑↑↑ */

  var ok = serviceId && templateId && publicId &&
           !pc.test(serviceId) && !pc.test(templateId) && !pc.test(publicId);

  window.EMAILJS_CONFIG = {
    serviceId: ok ? serviceId : '',
    templateId: ok ? templateId : '',
    publicId: ok ? publicId : '',
    enabled: !!ok
  };
})();