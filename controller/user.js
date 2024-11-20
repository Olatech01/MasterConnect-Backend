const userModel = require("../Model/Auth")
const bcrypt = require('bcrypt')
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');



const jwtSecret = process.env.JWT_SECRET;

const transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
    }
});

async function sendMail(to, subject, htmlContent) {
    try {
        await transport.sendMail({
            from: process.env.EMAIL,
            to: to,
            subject: subject,
            html: htmlContent
        });
        console.log("Email sent successfully!");
    } catch (error) {
        console.error("Error sending email:", error);
        throw new Error("Failed to send email.");
    }
}


const register = async (req, res) => {
    const { username, email, password, userType, state, city, } = req.body;

    try {
        if (!username || !email || !password || !userType || !state || !city) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "User with this email already exists" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const otp = crypto.randomInt(100000, 999999).toString();
        const otpExpiration = Date.now() + 10 * 60 * 1000;

        const newUser = await userModel.create({
            username,
            email,
            password: hashedPassword,
            state,
            city,
            userType,
            verificationToken: otp,
            otpExpiration,
            isVerified: false
        });

        const subject = "Verify Your Email - OTP Included";
        const message = `
<html>
<head>
  <style>
    body {
      margin: 0;
      font-family: Arial, sans-serif;
      background-color: #f4f4f9;
      color: #333;
    }
    .email-container {
      max-width: 600px;
      margin: 20px auto;
      background-color: #ffffff;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      overflow: hidden;
      border: 2px solid #003591;
    }
    .email-header {
      background-color: #896bc2;
      color: #ffffff;
      padding: 20px;
      text-align: center;
      font-size: 24px;
      font-weight: bold;
    }
    .email-body {
      padding: 20px;
      text-align: left;
      line-height: 1.6;
    }
    .email-body h1 {
      font-size: 24px;
      margin-bottom: 10px;
      color: #003591;
    }
    .email-body p {
      margin: 10px 0;
    }
    .otp-box {
      display: block;
      margin: 20px auto;
      padding: 10px;
      font-size: 20px;
      text-align: center;
      color: #ffffff;
      background-color: #003591;
      border-radius: 5px;
      width: 150px;
      font-weight: bold;
      letter-spacing: 2px;
    }
    .email-footer {
      margin-top: 20px;
      text-align: center;
      font-size: 12px;
      color: #777;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="email-header">
      Verify Your Email
    </div>
    <div class="email-body">
      <h1>Hello, ${newUser.firstName}!</h1>
      <p>Thank you for signing up with us! To verify your email, please use the one-time password (OTP) below:</p>
      <div class="otp-box">${otp}</div>
      <p><strong>Note:</strong> This OTP will expire in 10 minutes.</p>
      <p>If you didn’t request this email, you can safely ignore it.</p>
    </div>
    <div class="email-footer">
      &copy; ${new Date().getFullYear()} Your Company. All rights reserved.
    </div>
  </div>
</body>
</html>
`;

        await sendMail(email, subject, message);

        return res.status(201).json({ msg: "Candidate registered successfully. Please verify your email.", newUser });
    } catch (error) {
        console.error("Registration error:", error);
        return res.status(500).json({ error: "Failed to register" });
    }
}

const emailVerification = async (req, res) => {
    const { email, otp } = req.body;

    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        if (user.otpExpiration < Date.now()) {
            return res.status(400).json({ error: "OTP expired" });
        }
        if (user.verificationToken !== otp) {
            return res.status(400).json({ error: "Invalid OTP" });
        }

        user.isVerified = true;
        user.verificationToken = null;
        user.otpExpiration = null
        await user.save();

        return res.status(200).json({ msg: "Email verification successful" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Failed to verify email" });
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        if (!user.isVerified) {
            return res.status(403).json({ error: "Email is not verified" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid credentials" });
        }
        const token = jwt.sign({ id: user._id }, jwtSecret, { expiresIn: '1h' });

        return res.json({
            msg: "Logged in successfully",
            user: {
                _id: user._id,
                email: user.email,
                userType: user.userType,
                token: token,
                username: user.username
            }
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Server error" });
    }
};

const changePassword = async (req, res) => {
    const { email, oldPassword, newPassword } = req.body;

    if (!email || !oldPassword || !newPassword) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        user.password = hashedPassword;
        await user.save();

        return res.status(200).json({ msg: "Password changed successfully" });
    } catch (error) {
        console.error("Error changing password:", error);
        return res.status(500).json({ error: "An error occurred while changing the password" });
    }
};



module.exports = {
    register,
    emailVerification,
    login,
    changePassword,
}