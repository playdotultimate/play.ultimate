const generateOTP = (): string => {
  const otp = Math.floor(1000 + Math.random() * 9000);

  const OTP = String(otp);

  return OTP;
};

export default generateOTP;
