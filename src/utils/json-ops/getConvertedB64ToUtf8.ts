export const getConvertedB64ToUtf8 = (s: string) =>
  decodeURIComponent(escape(window.atob(s)))
