import * as React from "react";

interface PlaidVerifyIdentityEmailProps {
  validationCode?: string;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "";

export const PlaidVerifyIdentityEmail = ({
  validationCode,
}: PlaidVerifyIdentityEmailProps) => (

  <html>
    <head>
      <style>
        {`
          body { background-color: #ffffff; font-family: HelveticaNeue,Helvetica,Arial,sans-serif; }
          .container { background-color: #ffffff; border: 1px solid #eee; border-radius: 5px; box-shadow: 0 5px 10px rgba(20,50,70,.2); margin: 20px auto; max-width: 360px; padding: 68px 0 130px; }
          .logo { display: block; margin: 0 auto; }
          .tertiary { color: #0a85ea; font-size: 11px; font-weight: 700; font-family: HelveticaNeue,Helvetica,Arial,sans-serif; height: 16px; letter-spacing: 0; line-height: 16px; margin: 16px 8px 8px 8px; text-transform: uppercase; text-align: center; }
          .secondary { color: #000; display: inline-block; font-family: HelveticaNeue-Medium,Helvetica,Arial,sans-serif; font-size: 20px; font-weight: 500; line-height: 24px; margin-bottom: 0; margin-top: 0; text-align: center; }
          .code-container { background: rgba(0,0,0,.05); border-radius: 4px; margin: 16px auto 14px; vertical-align: middle; width: 280px; text-align: center; }
          .code { color: #000; display: inline-block; font-family: HelveticaNeue-Bold; font-size: 32px; font-weight: 700; letter-spacing: 6px; line-height: 40px; padding-bottom: 8px; padding-top: 8px; margin: 0 auto; width: 100%; text-align: center; }
          .paragraph { color: #444; font-size: 15px; font-family: HelveticaNeue,Helvetica,Arial,sans-serif; letter-spacing: 0; line-height: 23px; padding: 0 40px; margin: 0; text-align: center; }
          .link { color: #444; text-decoration: underline; }
          .footer { color: #000; font-size: 12px; font-weight: 800; letter-spacing: 0; line-height: 23px; margin: 0; margin-top: 20px; font-family: HelveticaNeue,Helvetica,Arial,sans-serif; text-align: center; text-transform: uppercase; }
        `}
      </style>
    </head>
    <body>
      <div className="container">
        <img
          src={`${baseUrl}/static/plaid-logo.png`}
          width="212"
          height="88"
          alt="Plaid"
          className="logo"
        />
        <p className="tertiary">Verify Your Identity</p>
        <h1 className="secondary">
          Enter the following code to finish linking Venmo.
        </h1>
        <div className="code-container">
          <p className="code">{validationCode}</p>
        </div>
        <p className="paragraph">Not expecting this email?</p>
        <p className="paragraph">
          Contact{" "}
          <a href="mailto:login@plaid.com" className="link">
            login@plaid.com
          </a>{" "}
          if you did not request this code.
        </p>
      </div>
      <p className="footer">Securely powered by Plaid.</p>
    </body>
  </html>
);

PlaidVerifyIdentityEmail.PreviewProps = {
  validationCode: "144833",
} as PlaidVerifyIdentityEmailProps;

export default PlaidVerifyIdentityEmail;
