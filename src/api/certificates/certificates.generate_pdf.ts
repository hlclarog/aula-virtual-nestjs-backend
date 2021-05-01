import * as Handlebars from 'handlebars';
import { HandleDataCertificate } from './certificates.dto';
export function generateContent(
  html: string,
  background: string,
  info: HandleDataCertificate,
) {
  const options: any = {
    width: '792px',
    height: '612px',
    margin: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
    printBackground: true,
  };
  const setContent = (contentHtml, background) => {
    return {
      content: `
        <body style="margin: 0">
          <div style="
            background-image: url('${background}');
            width: 792px;height: 612px;
            margin: 0px;
            background-repeat: no-repeat;
            background-size: 792px 612px;
            position: relative;
          ">
          <div style="
            margin: 0;
            width: 100%;
            position: absolute;
            top: 50%;
            -ms-transform: translateY(-50%);
            transform: translateY(-50%);">
              ${contentHtml}
            </div>
          </div>
        </body>
      `,
    };
  };
  html = html.replace(
    '{{SIGN_PICTURE}}',
    `<img style="width: 15%; display: block; margin-left: auto; margin-right: auto;" src="${info.SIGN_PICTURE}" />`,
  );
  const body = setContent(html, background);
  const template = Handlebars.compile(body.content);
  const content = template(info);
  return { options, content };
}
