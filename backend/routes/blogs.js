const express = require("express");

const router = express.Router();

const { prisma } = require("../db");

const authMiddleware = require("../middleware/authMiddleware");


// =====================================================
// GET ALL BLOGS
// GET /api/blogs
// =====================================================

router.get("/", async (req, res) => {

    try {

        const blogsData = await prisma.blogs.findMany({
            orderBy: {
                created_at: "desc"
            }
        });

        const blogs = blogsData.map((blog) => ({
            ID: Number(blog.id),
            TITLE: blog.title,
            DESCRIPTION: blog.description,
            CONTENT: blog.content,
            IMAGE: blog.image,
            AUTHOR: blog.author,
            CATEGORY: blog.category,
            SEO_TITLE: blog.seo_title,
            META_DESCRIPTION: blog.meta_description,
            SEO_KEYWORDS: blog.seo_keywords,
            FOCUS_KEYWORD: blog.focus_keyword,
            URL_SLUG: blog.url_slug,
            CANONICAL_URL: blog.canonical_url,
            CREATED_AT: blog.created_at,
            UPDATED_AT: blog.updated_at
        }));

        res.json({
            success: true,
            blogs
        });

    } catch (error) {

        console.error("Error fetching blogs:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch blogs"
        });

    }
});


// =====================================================
// CREATE BLOG
// POST /api/blogs
// =====================================================

router.post("/", authMiddleware, async (req, res) => {

    try {

        const {
            title,
            description,
            content,
            image,
            author,
            category,
            seoTitle,
            metaDescription,
            seoKeywords,
            focusKeyword,
            urlSlug,
            canonicalUrl
        } = req.body;

        const blog = await prisma.blogs.create({
            data: {
                title,
                description,
                content,
                image,
                author,
                category,
                seo_title: seoTitle,
                meta_description: metaDescription,
                seo_keywords: seoKeywords,
                focus_keyword: focusKeyword,
                url_slug: urlSlug,
                canonical_url: canonicalUrl
            }
        });

        res.status(201).json({
            success: true,
            message: "Blog created successfully",
            id: Number(blog.id)
        });

    } catch (error) {

        console.error("Error creating blog:", error);

        res.status(500).json({
            success: false,
            message: "Failed to create blog"
        });

    }
});


// =====================================================
// UPDATE BLOG
// PUT /api/blogs/:id
// =====================================================

router.put("/:id", authMiddleware, async (req, res) => {

    try {

        const { id } = req.params;

        const {
            title,
            description,
            content,
            image,
            author,
            category,
            seoTitle,
            metaDescription,
            seoKeywords,
            focusKeyword,
            urlSlug,
            canonicalUrl
        } = req.body;

        const existingBlog = await prisma.blogs.findUnique({
            where: {
                id: BigInt(id)
            }
        });

        if (!existingBlog) {

            return res.status(404).json({
                success: false,
                message: "Blog not found"
            });

        }

        await prisma.blogs.update({
            where: {
                id: BigInt(id)
            },
            data: {
                title,
                description,
                content,
                image,
                author,
                category,
                seo_title: seoTitle,
                meta_description: metaDescription,
                seo_keywords: seoKeywords,
                focus_keyword: focusKeyword,
                url_slug: urlSlug,
                canonical_url: canonicalUrl,
                updated_at: new Date()
            }
        });

        res.json({
            success: true,
            message: "Blog updated successfully"
        });

    } catch (error) {

        console.error("Error updating blog:", error);

        res.status(500).json({
            success: false,
            message: "Failed to update blog"
        });

    }
});


// =====================================================
// DELETE BLOG
// DELETE /api/blogs/:id
// =====================================================

router.delete("/:id", authMiddleware, async (req, res) => {

    try {

        const { id } = req.params;

        const existingBlog = await prisma.blogs.findUnique({
            where: {
                id: BigInt(id)
            }
        });

        if (!existingBlog) {

            return res.status(404).json({
                success: false,
                message: "Blog not found"
            });

        }

        await prisma.blogs.delete({
            where: {
                id: BigInt(id)
            }
        });

        res.json({
            success: true,
            message: "Blog deleted successfully"
        });

    } catch (error) {

        console.error("Error deleting blog:", error);

        res.status(500).json({
            success: false,
            message: "Failed to delete blog"
        });

    }
});


module.exports = router;