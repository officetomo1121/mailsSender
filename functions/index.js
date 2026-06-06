const { onCall } = require("firebase-functions/v2/https");
const nodemailer = require('nodemailer');
const { PromisePool } = require('@supercharge/promise-pool');
const admin = require('firebase-admin')

if (!admin.apps.length) {
  admin.initializeApp()
}

async function getAllUsers() {
  const snapshot = await admin.firestore()
    .collection('mailto')
    .where('subscribe', '==', true)
    .get()

  return snapshot.docs.map(doc => doc.id)
}

exports.mailsSender = onCall(
  {
    region: "us-central1",
    enforceAppCheck: true, // Reject requests with missing or invalid App Check tokens.
    consumeAppCheckToken: true,  // Consume the token after verification.
    
    secrets: ["SMTP_USER", "SMTP_PASS"] //secretManager使用宣言。これだけで良い
  },
  async(request) => {
    const { subject, detail, plain } = request.data;

    const users = await getAllUsers()
    console.log(`${users.length}件取得`)

    // 環境変数から認証情報を取得
    const smtpUser = process.env.SMTP_USER; // 環境変数は大文字でアクセスするのが一般的
    const smtpPass = process.env.SMTP_PASS;
    const mailFrom = 'info@office-tomo.net'
    const mailCc = ''

    let htmlContent = '<!doctype html><html lang="ja"><head><meta content="text/html "charset="iso-2022-jp"><meta name="viewport" content="width=device-width, initial-scale=1"></head><style>.indigo{background:#043c78 !important;}h1{font-size:calc(3840 / 1920 * 3.5rem) !important;font-size:-webkit-calc(3840 / 1920 * 3.5rem) !important; margin-bottom:2rem;}h2{font-size:calc(3840 / 1920 * 3rem) !important;font-size:-webkit-calc(3840 / 1920 * 3rem) !important; margin-bottom:2rem;}h3{font-size:calc(3840 / 1920 * 2.5rem) !important;font-size:-webkit-calc(3840 / 1920 * 2.5rem) !important; margin-bottom:2rem;}h4{font-size:calc(3840 / 1920 * 2rem) !important;font-size:-webkit-calc(3840 / 1920 * 2rem) !important; margin-bottom:2rem;}h5{font-size:calc(3840 / 1920 * 1.5rem) !important;font-size:-webkit-calc(3840 / 1920 * 1.5rem) !important; margin-bottom:2rem;}h6{font-size:calc(3840 / 1920 * 1.0rem) !important;font-size:-webkit-calc(3840 / 1920 * 1.0rem) !important; margin-bottom:2rem;}p{font-size:calc(3840 / 1920 * 1.5rem) !important;font-size:-webkit-calc(3840 / 1920 * 1.5rem) !important;margin:0 !important; padding:1rem;}.prem1{padding:calc(3840 / 1920 * 1.5rem) !important;padding:-webkit-calc(3840 / 1920 * 1.5rem) !important;}.pbrem1{padding-bottom:calc(3840 / 1920 * 1.5rem) !important;padding-bottom:-webkit-calc(3840 / 1920 * 1.5rem) !important;}.ptrem1{padding-top:calc(3840 / 1920 * 1.5rem) !important;padding-top:-webkit-calc(3840 / 1920 * 1.5rem) !important;}.plrem1{padding-left:calc(3840 / 1920 * 1.5rem) !important;padding-left:-webkit-calc(3840 / 1920 * 1.5rem) !important;}.prrem1{padding-right:calc(3840 / 1920 * 1.5rem) !important;padding-right:-webkit-calc(3840 / 1920 * 1.5rem) !important;}.premhalf{padding:calc(3840 / 1920 * 0.75rem) !important;padding:-webkit-calc(3840 / 1920 * 0.75rem) !important;}.ptremhalf{padding-top:calc(3840 / 1920 * 0.75rem) !important;padding-top:-webkit-calc(3840 / 1920 * 0.75rem) !important;}.pbremhalf{padding-bottom:calc(3840 / 1920 * 0.75rem) !important;padding-bottom:-webkit-calc(3840 / 1920 * 0.75rem) !important;}.prremhalf{padding-right:calc(3840 / 1920 * 0.75rem) !important;padding-right:-webkit-calc(3840 / 1920 * 0.75rem) !important;}.plremhalf{padding-left:calc(3840 / 1920 * 0.75rem) !important;padding-left:-webkit-calc(3840 / 1920 * 0.75rem) !important;}.premquarter{padding:calc(3840 / 1920 * 0.325rem) !important;padding:-webkit-calc(3840 / 1920 * 0.325rem) !important;}.spacer{height:calc(3840px / 10) !important;height:-webkit-calc(3840px / 10) !important;}.spacer-half{height:calc(3840px / 20) !important;height:-webkit-calc(3840px / 20) !important;}.spacer-quarter{height:calc(3840px / 40) !important;height:-webkit-calc(3840px / 40) !important;}.i-font{font-size:calc(3840 / 1920 * 12px) !important;font-size:-webkit-calc(3840 / 1920 * 12px) !important;}.psmall{font-size:calc(3840 / 1920 * 1rem) !important;font-size:-webkit-calc(3840 / 1920 * 1rem) !important;margin:0 !important;}.translate-middle-x{left:50%;-webkit-transform:translatex(-50%) !important;-ms-transform:translatex(-50%) !important;transform:translatex(-50%) !important;}.translate-middle-y{top:50%;-webkit-transform:translatey(-50%) !important;-ms-transform:translatey(-50%) !important;transform:translatey(-50%) !important;}.wrapper{width:100% !important;max-width:3840px !important;margin:0px auto !important;overflow:hidden !important;}.wrapper-wrapper{width:90% !important;margin:0px auto !important;}';
			htmlContent += '@media screen and (max-width:3840px){.wrapper{}.wrapper-wrapper{}h1{font-size:calc(100vw / 1920 * 56) !important;font-size:-webkit-calc(100vw / 1920 * 56) !important; margin-bottom:2rem;}h2{font-size:calc(100vw / 1920 * 48) !important;font-size:-webkit-calc(100vw / 1920 * 48) !important; margin-bottom:2rem;}h3{font-size:calc(100vw / 1920 * 40) !important;font-size:-webkit-calc(100vw / 1920 * 40) !important; margin-bottom:2rem;}h4{font-size:calc(100vw / 1920 * 32) !important;font-size:-webkit-calc(100vw / 1920 * 32) !important; margin-bottom:2rem;}h5{font-size:calc(100vw / 1920 * 24) !important;font-size:-webkit-calc(100vw / 1920 * 24) !important; margin-bottom:2rem;}h6{	font-size:calc(100vw / 1920 * 16) !important;font-size:-webkit-calc(100vw / 1920 * 16) !important; margin-bottom:2rem;}p{font-size:calc(100vw / 1920 * 24) !important;font-size:-webkit-calc(100vw / 1920 * 24) !important; padding:1rem;}.prem1{padding:calc(100vw / 1920 * 24) !important;padding:-webkit-calc(100vw / 1920 * 24) !important;}.ptrem1{padding-top:calc(100vw / 1920 * 24) !important;padding-top:-webkit-calc(100vw / 1920 * 24) !important;}.pbrem1{padding-bottom:calc(100vw / 1920 * 24) !important;padding-bottom:-webkit-calc(100vw / 1920 * 24) !important;}.plrem1{padding-left:calc(100vw / 1920 * 24) !important;padding-left:-webkit-calc(100vw / 1920 * 24) !important;}.prrem1{padding-right:calc(100vw / 1920 * 24) !important;padding-right:-webkit-calc(100vw / 1920 * 24) !important;}.premhalf{padding:calc(100vw / 1920 * 12) !important;padding:-webkit-calc(100vw / 1920 * 12) !important;}.ptremhalf{padding-top:calc(100vw / 1920 * 12) !important;padding-top:-webkit-calc(100vw / 1920 * 12) !important;}.pbremhalf{padding-bottom:calc(100vw / 1920 * 12) !important;padding-bottom:-webkit-calc(100vw / 1920 * 12) !important;}.prremhalf{padding-right:calc(100vw / 1920 * 12) !important;padding-right:-webkit-calc(100vw / 1920 * 12) !important;}.plremhalf{padding-left:calc(100vw / 1920 * 12) !important;padding-left:-webkit-calc(100vw / 1920 * 12) !important;}.premquarter{padding:calc(100vw / 1920 * 6) !important;padding:-webkit-calc(100vw / 1920 * 6) !important;}.selectFont{font-size:calc(100vw / 1920 * 24) !important;font-size:-webkit-calc(100vw / 1920 * 24) !important;}.spacer{height:calc(100vw / 10) !important;	height:-webkit-calc(100vw / 10) !important;}.spacer-half{height:calc(100vw / 20) !important;height:-webkit-calc(100vw / 20) !important;}.spacer-quarter{height:calc(100vw / 40) !important;height:-webkit-calc(100vw / 40) !important;}.i-font{font-size:calc(100vw / 1920 * 12) !important;font-size:-webkit-calc(100vw / 1920 * 12) !important;}.psmall{font-size:calc(100vw / 1920 * 16) !important;font-size:-webkit-calc(100vw / 1920 * 16) !important;margin:0 !important;}';
			htmlContent += '@media screen and (max-width:767.9px){.wrapper{}.wrapper-wrapper{width:100% !important;margin:0px auto !important;}h1{font-size:2.5rem !important; margin-bottom:2rem;}h2{font-size:2.25rem !important; margin-bottom:2rem;}h3{font-size:2rem !important; margin-bottom:2rem;}h4{font-size:1.75rem !important; margin-bottom:2rem;}h5{font-size:1.5rem !important; margin-bottom:2rem;}h6{font-size:1.25rem !important; margin-bottom:2rem;}p{font-size:1rem !important; padding:1rem;}.prem1{padding:1rem !important;}.ptrem1{padding-top:1rem !important;}.pbrem1{padding-bottom:1rem !important;}.plrem1{padding-left:1rem !important;}.prrem1{padding-right:1rem !important;}.premhalf{padding:0.5rem !important;}.ptremhalf{padding-top:0.5rem !important;}.pbremhalf{padding-bottom:0.5rem !important;}.prremhalf{padding-right:0.5rem !important;}.plremhalf{padding-left:0.5rem !important;}.premquarter{padding:0.25rem !important;}.spacer{height:calc(100vw / 5) !important;height:-webkit-calc(100vw / 5) !important;}.spacer-half{height:calc(100vw / 10) !important;height:-webkit-calc(100vw / 10) !important;}.spacer-quarter{height:calc(100vw / 40) !important;height:-webkit-calc(100vw / 40) !important;}.i-font{font-size:0.5rem !important;}.psmall{font-size:0.75rem !important;}}';
			htmlContent += '@media screen and (max-width:350px){p{font-size:0.75rem !important; padding:1rem;}}';
			htmlContent += 'a{color:#343a40 !important;text-decoration-line:none !important;}a:hover{color:#343a40 !important;text-decoration-line:none !important;background: none !important;-webkit-transition:1s !important;-o-transition:1s !important;transition:1s !important;}</style>';
			htmlContent += '<body><div style="width:100%;">';
            htmlContent += detail
			htmlContent += '<footer style="width:100%; padding-top:1rem;"><center><p class="psmall">This site is powered by Nuxt4 + Google Firebase.<br>Copyright OFFICE+<span style="color:blue;">T</span> All Rights Reserved.</p></center></footer></div></body></html>';

    // 環境変数が設定されているか確認 (開発時などに役立ちます)
    if (!smtpUser || !smtpPass) {
      console.error("Missing SMTP credentials or mail addresses in environment variables.");
      return { result: false, error: "Configuration error." };
    }
    
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: smtpUser, // 環境変数から取得
        pass: smtpPass, // 環境変数から取得
      },
    });

    const { results, errors } = await PromisePool
      .withConcurrency(5)
      .for(users)
      .process(async (user, index, pool) => {
        try {
          const info = await transporter.sendMail({
            from: mailFrom, // 環境変数から取得
            to: user,
            cc: mailCc, // 環境変数から取得
            subject,
            html: htmlContent,
            text: plain
          })

          return { result: true,from:mailFrom,to:user }
        } catch (error) {
          console.error(error);
          return { result: false,from:mailFrom,to:user,cc:mailCc };
        }
    })

    return results
  }
);