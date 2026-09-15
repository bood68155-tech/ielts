/* ============================================================
   IELTS PA — EmailJS configuration (LIVE REAL EMAIL)
   ------------------------------------------------------------
   EmailJS sends real verification emails to the learner's Gmail
   inbox. Free tier: 200 emails/day.

   • Service ID  : service_l5hn0k3       ✅
   • Template ID : template_wvon9iu      ✅
   • Public Key  : Q2agmJZXRSIRFESQ7     ✅

   When all three are configured the auth flow sends a real OTP
   email via EmailJS to the learner's inbox. No verification code
   is ever printed on screen — delivery is enforced via EmailJS.
   ============================================================ */
(function () {
  'use strict';
  var pc = /YOUR_|PASTE|TODO|xxx|XXXX/i;
  var serviceId = 'service_l5hn0k3';
  /* ↓↓↓ PASTE YOUR Template ID AND Public Key BELOW ↓↓↓ */
  var templateId = 'template_wvon9iu';
  var publicId  = 'Q2agmJZXRSIRFESQ7';
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