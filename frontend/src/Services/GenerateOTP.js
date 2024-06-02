// Function to generate a 4-digit numeric OTP
export default function generateOTP() {
   return Math.floor(1000 + Math.random() * 9000);
}