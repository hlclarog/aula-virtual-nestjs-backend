export function generate(length) {
  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
export function generateCourseCode(type: number) {
  let result = '';
  switch (type) {
    case 1:
      result = 'COURSE-' + generate(5);
      break;
    case 2:
      result = 'CERTIFICATE-' + generate(5);
      break;
  }
  return result;
}
