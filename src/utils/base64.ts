export function base64MimeType(encoded) {
  let result = null;
  if (typeof encoded !== 'string') {
    return result;
  }
  const mime = encoded.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/);
  if (mime && mime.length) {
    result = mime[1];
  }
  return result;
}

export function verifyIfBase64(encoded) {
  let result = false;
  const mime = encoded.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/);
  if (mime && mime.length) {
    result = true;
  }
  return result;
}

export function extractDatab64(file) {
  const base64Data = file.split(';base64,')[1];
  const fileType: string = this.base64MimeType(file);
  return {
    base: base64Data,
    type: fileType,
    extension: fileType.split('/').length ? fileType.split('/')[1] : null,
  };
}
