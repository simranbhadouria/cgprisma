const express = require("express");
const cors = require("cors");
const multer = require("multer");

require("dotenv").config();

const { prisma } = require("./db");

const blogRoutes = require("./routes/blogs");
const authRoutes = require("./routes/auth");
const chatRoutes = require("./routes/chat");

const app = express();

app.use(cors());

app.use(express.json({
    limit: "10mb"
}));


// =====================================================
// BLOG API
// =====================================================

app.use("/api/blogs", blogRoutes);


// =====================================================
// AUTH API
// =====================================================

app.use("/api/auth", authRoutes);


// =====================================================
// CHAT API
// =====================================================

app.use("/api/chat", chatRoutes);


// =====================================================
// IMAGE UPLOAD
// =====================================================

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024
    }
});

const authMiddleware =
    require("./middleware/authMiddleware");


// =====================================================
// VERCEL BLOB UPLOAD
// =====================================================

app.post(
    "/api/upload",
    authMiddleware,
    upload.single("image"),
    async (req, res) => {

        try {

            if (!req.file) {

                return res.status(400).json({
                    success: false,
                    message: "No image uploaded"
                });

            }

            if (!process.env.BLOB_READ_WRITE_TOKEN) {

                return res.status(500).json({
                    success: false,
                    message:
                        "Image storage is not configured"
                });

            }

            const { put } =
                await import("@vercel/blob");

            const safeName =
                req.file.originalname
                    .replace(/[^a-zA-Z0-9._-]/g, "-");

            const filename =
                `blogs/${Date.now()}-${safeName}`;

            const blob =
                await put(
                    filename,
                    req.file.buffer,
                    {
                        access: "public",
                        token:
                            process.env.BLOB_READ_WRITE_TOKEN,
                        contentType:
                            req.file.mimetype
                    }
                );

            res.json({
                success: true,
                message:
                    "Image uploaded successfully",
                imageUrl: blob.url
            });

        } catch (error) {

            console.error(
                "Image upload error:",
                error
            );

            res.status(500).json({
                success: false,
                message:
                    "Image upload failed"
            });

        }

    }
);


// =====================================================
// DATABASE TEST
// =====================================================

app.get("/api/test-db", async (req, res) => {

    try {

        const result = await prisma.$queryRaw`
            SELECT NOW() AS current_time
        `;

        res.json({
            success: true,
            message: "PostgreSQL connection successful",
            time: result[0].current_time
        });

    } catch (error) {

        console.error(
            "PostgreSQL connection error:",
            error
        );

        res.status(500).json({
            success: false,
            message: "PostgreSQL connection failed"
        });

    }

});

// =====================================================
// API HOME
// =====================================================

app.get("/api", (req, res) => {

    res.json({
        success: true,
        message:
            "Cynox Global API is running"
    });

});


// =====================================================
// EXPORT FOR VERCEL
// =====================================================

module.exports = app;


// =====================================================
// LOCAL DEVELOPMENT
// =====================================================

if (require.main === module) {

    const PORT =
        process.env.PORT || 5000;

    app.listen(
        PORT,
        "0.0.0.0",
        () => {

            console.log(
                `Server running on port ${PORT}`
            );

        }
    );

}