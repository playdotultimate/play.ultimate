import expressAsyncHandler from "express-async-handler";
import nodemailer from "nodemailer";
import { SMTP_HOST, SMTP_MAIL, SMTP_PASSWORD, SMTP_PORT } from "../secrets";
import { Request, Response } from "express";
import generateOTP from "../service/otp";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
let transporter: nodemailer.Transporter;
const genrate = () => {
  const OTP = generateOTP();

  return OTP;
};
const update = async (email: any, otp: any) => {
  try {
    // Update the user's OTP in the database

    const updatedUser = await prisma.user.update({
      where: { email: email },
      data: { otp: otp },
    });
  } catch (err) {
    console.error(err);
  }
};
try {
  transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: SMTP_MAIL, // generated ethereal user
      pass: SMTP_PASSWORD, // generated ethereal password
    },
  });
} catch (error) {
  console.error("Error creating transporter:", error);
}

const sendEmail = expressAsyncHandler(async (req: Request, res: Response) => {
  const { email, subject, message } = req.body;
  const OTP = genrate();
  update(email, OTP);

  const mailOptions: nodemailer.SendMailOptions = {
    from: SMTP_MAIL,
    to: email,
    subject: subject,
    text: `Your OTP is: ${OTP}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully!");
    res.status(200).json("OTP Has been sended");
  } catch (error) {
    console.error("Error sending email:", error);
  }
});

export { sendEmail };
