import { InternalServerErrorException } from '@nestjs/common';
import * as pdfmake from 'pdfmake';
import { fonts } from './pdfmake.variables';

export function generateFile(docDefinition, options) {
  try {
    const PdfPrinters = new pdfmake(fonts);
    return new Promise((resolve) => {
      const doc = PdfPrinters.createPdfKitDocument(docDefinition, options);
      const chunks = [];
      doc.on('data', (chunk) => {
        chunks.push(chunk);
      });
      doc.on('end', () => {
        const result = Buffer.concat(chunks);
        resolve('data:application/pdf;base64,' + result.toString('base64'));
      });
      doc.end();
    });
  } catch (error) {
    console.log(error);
    throw new InternalServerErrorException('ERROR TO GENERATE PDF', error);
  }
}
