export const getConvertedUtf8ToB64 = (str: any): string => {
  if (!!window) return window.btoa(unescape(encodeURIComponent(str)))
  return str
}
