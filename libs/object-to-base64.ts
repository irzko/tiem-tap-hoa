const objectToBase64 = (obj: Object) =>
  btoa(encodeURIComponent(JSON.stringify(obj)));

const base64ToObject = (base64: string) =>
  JSON.parse(decodeURIComponent(atob(base64)));

export { objectToBase64, base64ToObject };
