import { join } from 'path';

const FOLDER_FONTS = join(__dirname, '..', '..', '..', 'fonts');
export const fonts = {
  Roboto: {
    normal: `${FOLDER_FONTS}/Roboto/Roboto-Regular.ttf`,
    bold: `${FOLDER_FONTS}/Roboto/Roboto-Medium.ttf`,
    italics: `${FOLDER_FONTS}/Roboto/Roboto-Italic.ttf`,
    bolditalics: `${FOLDER_FONTS}/Roboto/Roboto-MediumItalic.ttf`,
  },
};
