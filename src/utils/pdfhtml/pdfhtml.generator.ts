import { InternalServerErrorException } from '@nestjs/common';
import * as html_to_pdf from 'html-pdf-node';

export function generateFile(file, options) {
  try {
    return new Promise((resolve) => {
      html_to_pdf.generatePdf(file, options).then((pdfBuffer) => {
        const result = pdfBuffer;
        resolve('data:application/pdf;base64,' + result.toString('base64'));
      });
    });
  } catch (error) {
    console.log(error);
    throw new InternalServerErrorException('ERROR TO GENERATE PDF', error);
  }
}
