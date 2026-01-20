const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
//const { OAuth2Client } = require('google-auth-library');
const crypto = require('crypto');
const emailService = require('../services/notification/EmailService');
const admin = require('../config/firebaseAdmin');
//const emailService = require("../services/notification/EmailService");

//const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

exports.register = async (req, res) => {
    try {
        const { email, password, name, phone } = req.body;

        // Check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create user
        const user = new User({
            email,
            password: hashedPassword,
            name,
            phone,
            notificationPreferences: {
                email: true,
                sms: phone ? true : false,
                push: true
            }
        });

        await user.save();
        emailService.sendWelcomeEmail(user.email, user.name)
    .then(() => console.log('📧 Welcome email sent'))
    .catch(err => console.error('❌ Welcome email failed:', err.message));

    
        
        // Generate token
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN  }
        );

        res.status(201).json({
            message: 'User registered successfully',
            token,
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
                phone: user.phone
            }
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

// exports.login = async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         // Find user
//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(401).json({ error: 'Invalid credentials' });
//         }
//         if (!user.password || user.isGoogleAuth) {
//       return res.status(400).json({
//         error: "This account uses Google login. Please login with Google.",
//       });
//     }
//         // Check password
//         const isValidPassword = await bcrypt.compare(password, user.password);
//         if (!isValidPassword) {
//             return res.status(401).json({ error: 'Invalid credentials' });
//         }

//         // Generate token
//         const token = jwt.sign(
//             { userId: user._id },
//             process.env.JWT_SECRET,
//             { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN  }
//         );

//         res.json({
//             message: 'Login successful',
//             token,
//             user: {
//                 id: user._id,
//                 email: user.email,
//                 name: user.name,
//                 phone: user.phone,
//                 notificationPreferences: user.notificationPreferences,
//                 rewardPoints: user.rewardPoints
//             }
//         });
//     } catch (error) {
//         console.error('Login error:', error);
//         res.status(500).json({ error: 'Server error' });
//     }
// };
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Case 1: User signed up with Google only
        if (user.isGoogleAuth && !user.password) {
            return res.status(400).json({
                error: "This account uses Google login. Please login with Google.",
            });
        }

        // Case 2: Normal email/password login
        if (!user.isGoogleAuth || user.password) {
            if (!password) {
                return res.status(400).json({ error: "Password is required" });
            }

            const isValidPassword = await bcrypt.compare(password, user.password);
            if (!isValidPassword) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN }
        );

        res.json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
                phone: user.phone,
                notificationPreferences: user.notificationPreferences,
                rewardPoints: user.rewardPoints,
                isGoogleAuth: user.isGoogleAuth
            }
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Server error' });
    }
};



exports.googleAuth = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { uid, email, name } = req.user;

    // 1️⃣ Find by googleId
    let user = await User.findOne({ googleId: uid });

    // 2️⃣ If not found, try by email
    if (!user) {
      user = await User.findOne({ email });
    }

    // 3️⃣ Create user if not exists
    if (!user) {
      user = await User.create({
        email,
        name,
        googleId: uid,
        isGoogleAuth: true,
        password: undefined, // 🔥 IMPORTANT
      });
    } else {
      // 4️⃣ Attach googleId if missing
      if (!user.googleId) {
        user.googleId = uid;
        user.isGoogleAuth = true;
        user.password = undefined;
        await user.save({ validateBeforeSave: false });
      }
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN }
    );

    res.status(200).json({
      message: "Google authentication successful",
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        isGoogleAuth: true,
      },
    });

  } catch (err) {
    console.error("Backend Google auth failed:", err.message);
    res.status(500).json({
      message: "Backend Google auth failed",
      error: err.message,
    });
  }
};



exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.userId)
            .select('-password -googleId');
        
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({ user });
    } catch (error) {
        console.error('Get profile error:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.updateProfile = async (req, res) => {
    try {
        const { name, phone, emergencyContact } = req.body;
        
        const user = await User.findById(req.userId);
        
        if (name) user.name = name;
        if (phone) user.phone = phone;
        if (emergencyContact) {
            user.emergencyContact = {
                ...user.emergencyContact,
                ...emergencyContact
            };
        }
        
        user.updatedAt = Date.now();
        await user.save();

        res.json({
            message: 'Profile updated successfully',
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
                phone: user.phone,
                emergencyContact: user.emergencyContact
            }
        });
    } catch (error) {
        console.error('Update profile error:', error);
        res.status(500).json({ error: 'Server error' });
    }
};
// Placeholder functions for routes you haven't implemented yet
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 🔐 Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    user.resetOtp = otp;
    user.resetOtpExpiry = Date.now() + 10 * 60 * 1000; // 10 min
    await user.save();

    // 📧 Send OTP email
    await emailService.sendEmail(
      email,
      "🔐 Password Reset OTP - MediTracker",
      `<h2>Password Reset</h2>
       <p>Your OTP is:</p>
       <h1>${otp}</h1>
       <p>This OTP is valid for 10 minutes.</p>`
    );

    res.status(200).json({
      message: "OTP sent to registered email",
    });

  } catch (err) {
    console.error("Forgot password error:", err);
    res.status(500).json({ message: "Failed to send OTP" });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    const user = await User.findOne({
      email,
      resetOtp: otp,
      resetOtpExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetOtp = undefined;
    user.resetOtpExpiry = undefined;

    await user.save();

    res.status(200).json({ message: "Password reset successful" });

  } catch (err) {
    console.error("Reset password error:", err);
    res.status(500).json({ message: "Password reset failed" });
  }
};
exports.resendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    if (!user.resetOtp || user.resetOtpExpiry < Date.now()) {
      // Generate new OTP if expired or missing
      user.resetOtp = Math.floor(100000 + Math.random() * 900000).toString();
      user.resetOtpExpiry = Date.now() + 10 * 60 * 1000; // 10 min
      await user.save();
    }

    await emailService.sendEmail(
      email,
      "🔐 Password Reset OTP - MediTracker",
      `<h2>Password Reset</h2>
       <p>Your OTP is:</p>
       <h1>${user.resetOtp}</h1>
       <p>This OTP is valid for 10 minutes.</p>`
    );

    res.status(200).json({ message: "OTP resent successfully" });
  } catch (err) {
    console.error("Resend OTP error:", err);
    res.status(500).json({ message: "Failed to resend OTP" });
  }
};

