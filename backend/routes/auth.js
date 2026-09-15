const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { prisma } = require("../db");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// =====================================================
// ADMIN LOGIN
// POST /api/auth/login
// =====================================================

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }

        const admin = await prisma.admin.findFirst({
            where: {
                email: {
                    equals: email.trim(),
                    mode: "insensitive"
                }
            }
        });

        if (!admin) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        const passwordMatch = await bcrypt.compare(
            password,
            admin.password_hash
        );

        if (!passwordMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        const token = jwt.sign(
            {
                id: Number(admin.id),
                email: admin.email,
                role: admin.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "2h"
            }
        );

        res.json({
            success: true,
            message: "Login successful",
            token
        });

    } catch (error) {
        console.error("Login error:", error);

        res.status(500).json({
            success: false,
            message: "Login failed"
        });
    }
});


// =====================================================
// CHANGE PASSWORD
// POST /api/auth/change-password
// =====================================================

router.post(
    "/change-password",
    authMiddleware,
    async (req, res) => {

        try {

            const {
                email,
                currentPassword,
                newPassword
            } = req.body;

            if (
                !email ||
                !currentPassword ||
                !newPassword
            ) {
                return res.status(400).json({
                    success: false,
                    message:
                        "Email, current password and new password are required"
                });
            }

            if (newPassword.length < 8) {
                return res.status(400).json({
                    success: false,
                    message:
                        "New password must be at least 8 characters"
                });
            }

            const admin = await prisma.admin.findFirst({
                where: {
                    email: {
                        equals: email.trim(),
                        mode: "insensitive"
                    }
                }
            });

            if (!admin) {
                return res.status(404).json({
                    success: false,
                    message: "Admin not found"
                });
            }

            const passwordMatch = await bcrypt.compare(
                currentPassword,
                admin.password_hash
            );

            if (!passwordMatch) {
                return res.status(401).json({
                    success: false,
                    message:
                        "Current password is incorrect"
                });
            }

            const newPasswordHash = await bcrypt.hash(
                newPassword,
                10
            );

            await prisma.admin.update({
                where: {
                    id: admin.id
                },
                data: {
                    password_hash: newPasswordHash,
                    updated_at: new Date()
                }
            });

            res.json({
                success: true,
                message:
                    "Password changed successfully"
            });

        } catch (error) {

            console.error(
                "Change password error:",
                error
            );

            res.status(500).json({
                success: false,
                message:
                    "Password change failed"
            });
        }
    }
);


// =====================================================
// UPDATE EMAIL
// POST /api/auth/update-email
// =====================================================

router.post(
    "/update-email",
    authMiddleware,
    async (req, res) => {

        try {

            const {
                currentEmail,
                newEmail,
                currentPassword
            } = req.body;

            if (
                !currentEmail ||
                !newEmail ||
                !currentPassword
            ) {
                return res.status(400).json({
                    success: false,
                    message:
                        "Current email, new email and current password are required"
                });
            }

            const emailRegex =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailRegex.test(newEmail)) {
                return res.status(400).json({
                    success: false,
                    message:
                        "Please enter a valid email address"
                });
            }

            if (
                currentEmail.trim().toLowerCase() ===
                newEmail.trim().toLowerCase()
            ) {
                return res.status(400).json({
                    success: false,
                    message:
                        "New email must be different from current email"
                });
            }

            const admin = await prisma.admin.findFirst({
                where: {
                    email: {
                        equals: currentEmail.trim(),
                        mode: "insensitive"
                    }
                }
            });

            if (!admin) {
                return res.status(404).json({
                    success: false,
                    message:
                        "Admin account not found"
                });
            }

            const passwordMatch = await bcrypt.compare(
                currentPassword,
                admin.password_hash
            );

            if (!passwordMatch) {
                return res.status(401).json({
                    success: false,
                    message:
                        "Current password is incorrect"
                });
            }

            const existingEmail =
                await prisma.admin.findFirst({
                    where: {
                        email: {
                            equals: newEmail.trim(),
                            mode: "insensitive"
                        },
                        NOT: {
                            id: admin.id
                        }
                    }
                });

            if (existingEmail) {
                return res.status(409).json({
                    success: false,
                    message:
                        "This email is already registered"
                });
            }

            await prisma.admin.update({
                where: {
                    id: admin.id
                },
                data: {
                    email: newEmail.trim(),
                    updated_at: new Date()
                }
            });

            res.json({
                success: true,
                message:
                    "Email updated successfully",
                email: newEmail.trim()
            });

        } catch (error) {

            console.error(
                "Update email error:",
                error
            );

            res.status(500).json({
                success: false,
                message:
                    "Email update failed"
            });
        }
    }
);


// =====================================================
// EXPORT ROUTER
// =====================================================

module.exports = router;
