<!--
  SignIcons.vue — the drawn pictogram set, inlined once
  =====================================================
  Every icon is a <symbol> on one 24 x 24 grid with the same 2px round stroke, so they read as one sign family.
  SignIcon.vue draws a copy of a symbol with <use href="#i-name">.
-->
<template>
  <svg aria-hidden="true" width="0" height="0" style="position: absolute">
    <symbol id="i-arrow-right" viewBox="0 0 24 24"><path d="M4 12h15M13 6l6 6-6 6" /></symbol>
    <symbol id="i-download" viewBox="0 0 24 24"><path d="M12 4v12M6.5 10.5 12 16l5.5-5.5M5 20h14" /></symbol>
    <symbol id="i-mail" viewBox="0 0 24 24">
      <rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3.5 6.5 8.5 6.5 8.5-6.5" />
    </symbol>
    <symbol id="i-chat" viewBox="0 0 24 24">
      <path d="M20 11.5a8 8 0 0 1-11.6 7.1L4 20l1.4-4.2A8 8 0 1 1 20 11.5Z" /><path d="M9 11.5h.01M12.5 11.5h.01M16 11.5h.01" />
    </symbol>
    <symbol id="i-linkedin" viewBox="0 0 24 24">
      <rect x="3" y="3" width="18" height="18" rx="3" /><path d="M8 10.5V17M8 7.5v.01M12 17v-6.5M12 13.5a3 3 0 0 1 6 0V17" />
    </symbol>
    <symbol id="i-code" viewBox="0 0 24 24"><path d="m8 7-5 5 5 5M16 7l5 5-5 5M13.5 4.5l-3 15" /></symbol>
    <symbol id="i-pin" viewBox="0 0 24 24">
      <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z" /><circle cx="12" cy="9.5" r="2.5" />
    </symbol>
    <symbol id="i-camera" viewBox="0 0 24 24">
      <rect x="3" y="7" width="18" height="13" rx="2" /><path d="M8 7l1.5-3h5L16 7" /><circle cx="12" cy="13.5" r="3.5" />
    </symbol>
    <symbol id="i-copy" viewBox="0 0 24 24">
      <rect x="8.5" y="8.5" width="12" height="12" rx="2" /><path d="M15.5 8.5V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v7.5a2 2 0 0 0 2 2h2.5" />
    </symbol>
    <symbol id="i-check" viewBox="0 0 24 24"><path d="m5 12.5 4.5 4.5L19 7.5" /></symbol>
    <symbol id="i-external" viewBox="0 0 24 24">
      <path d="M14 4h6v6M20 4l-9 9M18 14v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4" />
    </symbol>
    <symbol id="i-award" viewBox="0 0 24 24">
      <circle cx="12" cy="9" r="6" /><path d="m8.5 14-1.5 7 5-3 5 3-1.5-7" />
    </symbol>
    <symbol id="i-device" viewBox="0 0 24 24">
      <rect x="6.5" y="2.5" width="11" height="19" rx="2.5" /><path d="M10.5 18.5h3" />
    </symbol>
  </svg>
</template>
