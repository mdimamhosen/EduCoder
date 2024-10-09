const otpTemplate = (otp: string) => {
  return `<!DOCTYPE html>
  <html>

  <head>
    <meta charset="UTF-8">
    <title>OTP Verification Email</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
      body {
        background-color: #E0E0E0; /* Light gray background */
        font-family: Arial, sans-serif;
        font-size: 16px;
        line-height: 1.4;
        color: #333333;
        margin: 0;
        padding: 0;
      }

      .container {
        max-width: 600px;
        margin: 20px auto;
        padding: 20px;
        text-align: center;
        background-color: #ffffff; /* White background for the email container */
        border: 1px solid #dddddd; /* Light border */
        border-radius: 10px; /* Rounded corners */
        box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
      }

      .header {
        background-color: #FFD60A;
        color: #000000;
        width: 30%;
        margin: 0 auto 10px auto;
        padding: 7px;
        border-radius: 5px;
        text-align: center;
        font-size: 24px;
        font-weight: bold;
      }

      .headerContainer {
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .message {
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 20px;
      }

      .body {
        font-size: 16px;
        margin-bottom: 20px;
      }

      .highlight {
        font-weight: bold;
        font-size: 24px;
        margin-top: 10px;
        color: #333;
      }

      .support {
        font-size: 14px;
        color: #999999;
        margin-top: 20px;
      }

      /* Media Query for Mobile and Tablet */
      @media only screen and (max-width: 768px) {
        .container {
          padding: 10px;
        }

        .header {
          width: 50%;
          font-size: 20px;
        }

        .body {
          font-size: 14px;
        }

        .highlight {
          font-size: 20px;
        }

        .support {
          font-size: 12px;
        }
      }

      @media only screen and (max-width: 480px) {
        .header {
          width: 70%;
          font-size: 18px;
        }

        .body {
          font-size: 13px;
        }

        .highlight {
          font-size: 18px;
        }

        .support {
          font-size: 11px;
        }
      }
    </style>
  </head>

  <body>
    <div class="container">
      <div class="headerContainer">
        <div class="header">EduCoder</div>
      </div>
      <div class="body">
        <p>Dear User,</p>
        <p>Thank you for registering with EduCoder. To complete your registration, please use the following OTP
          (One-Time Password) to verify your account:</p>
        <h2 class="highlight">${otp}</h2>
        <p>This OTP is valid for 5 minutes. If you did not request this verification, please disregard this email.
        Once your account is verified, you will have access to our platform and its features.</p>
      </div>
      <div class="support">
        If you have any questions or need assistance, please feel free to reach out to us at
        <a href="mailto:info@educoder.com">info@educoder.com</a>. We are here to help!
      </div>
    </div>
  </body>

  </html>`;
};

export default otpTemplate;
