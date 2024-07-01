import pug from 'pug';
import path from 'path';
import mail from 'mailgun-js';

export async function mailFactory(email: string, fileName: string, meta: Object) {
  const compiledFunction = pug.compileFile(path.join(__dirname, '..','template', `${fileName}.pug`));
  const mailgun = mail({
    apiKey: String(process.env.MAILGUN_API_KEY),
    domain: String(process.env.MAILGUN_DOMAIN),
  });
  

  // @ts-ignore
  meta.redirect = process.env.MAIL_REDIRECT;

  const data: mail.messages.SendData = {
    from: `<${process.env.MAILGUN_FROMUSER}@${process.env.MAILGUN_FROMUSER}>`,
    to: `${email}`,
    subject: `${meta.subject}`,
    html: compiledFunction(meta),
  };

  await mailgun.messages().send(data);
}

export async function welcomemail(email: string, meta: Object) {
  const fileName = 'welcome'; // Pug 템플릿 파일 이름
  const compiledFunction = pug.compileFile(path.join(__dirname, '..', 'template', `${fileName}.pug`));
  const mailgun = mail({
    apiKey: String(process.env.MAILGUN_API_KEY),
    domain: String(process.env.MAILGUN_DOMAIN),
  });

  // 메타 데이터에 추가적인 정보를 포함할 수 있습니다
  meta.redirect = process.env.MAIL_REDIRECT; // 예를 들어, 이메일 인증을 위한 리다이렉트 URL

  const data = {
    from: `<${process.env.MAILGUN_FROMUSER}@${process.env.MAILGUN_DOMAIN}>`,
    to: email,
    subject: '회원가입을 축하합니다!',
    html: compiledFunction(meta),
  };

  await mailgun.messages().send(data);
}
