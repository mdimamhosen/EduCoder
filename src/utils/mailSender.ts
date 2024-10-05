import nodemailer from "nodemailer";

const mailSender = async (email: string, title: string, body: string) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT),
      secure: process.env.MAIL_SECURE === "true",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: `EduCoder <${process.env.MAIL_USER}>`,
      to: email,
      subject: title,
      html: body,
    });

    console.log("Email sent: %s", info.messageId);
    return info;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Email server error:", error.message);
    } else {
      console.error("Email server error:", "Unknown error occurred");
    }
  }
};

export default mailSender;
