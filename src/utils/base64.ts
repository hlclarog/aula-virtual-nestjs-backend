import * as filetype from 'file-type';

export async function base64MimeType(encoded) {
  if (typeof encoded !== 'string') {
    return null;
  }
  const bitmap = Buffer.from(encoded, 'base64');
  const type = await filetype.fromBuffer(bitmap);
  return type.ext;
}

export function verifyIfBase64(encoded) {
  let result = false;
  const mime = encoded.match(/data:*.*,.*/);
  if (mime && mime.length) {
    result = true;
  }
  return result;
}

export async function extractDatab64(file) {
  const base64Data = file.split(';base64,')[1];
  const fileType: string = await this.base64MimeType(base64Data);
  return {
    base: base64Data,
    type: fileType,
    extension: fileType ? fileType : null,
  };
}
