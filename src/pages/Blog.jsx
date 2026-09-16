import "./Blog.css";

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
function Blog() {

    const { slug } = useParams();
    const navigate = useNavigate();

    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [selectedBlog, setSelectedBlog] = useState(null);

    useEffect(() => {
        fetch("/api/blogs")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch blogs");
                }

                return response.json();
            })
            .then((data) => {
                console.log("API Response:", data);

                const fetchedBlogs = data.blogs || [];

                setBlogs(fetchedBlogs);

                if (slug) {
                    const blogBySlug = fetchedBlogs.find(
                        (blog) => blog.URL_SLUG === slug
                    );

                    if (blogBySlug) {
                        setSelectedBlog(blogBySlug);
                    } else {
                        setError("Blog not found");
                    }
                }

                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching blogs:", error);

                setError("Unable to load blogs");
                setLoading(false);
            });
    }, [slug]);

    // =========================
    // SEO METADATA
    // =========================
    useEffect(() => {
        const defaultTitle = "Cynox Security Blog";

        const defaultDescription =
            "Cynox Security Blog - Cybersecurity news, awareness and security insights.";

        // =========================
        // NO BLOG SELECTED
        // =========================
        if (!selectedBlog) {
            document.title = defaultTitle;

            let metaDescription = document.querySelector(
                'meta[name="description"]'
            );

            if (!metaDescription) {
                metaDescription = document.createElement("meta");
                metaDescription.name = "description";

                document.head.appendChild(metaDescription);
            }

            metaDescription.setAttribute(
                "content",
                defaultDescription
            );

            const canonical = document.querySelector(
                'link[rel="canonical"]'
            );

            if (canonical) {
                canonical.remove();
            }

            return;
        }

        // =========================
        // SEO TITLE
        // =========================
        document.title =
            selectedBlog.SEO_TITLE ||
            selectedBlog.TITLE ||
            defaultTitle;

        // =========================
        // META DESCRIPTION
        // =========================
        let metaDescription = document.querySelector(
            'meta[name="description"]'
        );

        if (!metaDescription) {
            metaDescription = document.createElement("meta");

            metaDescription.name = "description";

            document.head.appendChild(metaDescription);
        }

        metaDescription.setAttribute(
            "content",
            selectedBlog.META_DESCRIPTION ||
            selectedBlog.DESCRIPTION ||
            defaultDescription
        );

        // =========================
        // CANONICAL URL
        // =========================
        let canonical = document.querySelector(
            'link[rel="canonical"]'
        );

        if (selectedBlog.CANONICAL_URL) {
            if (!canonical) {
                canonical = document.createElement("link");

                canonical.rel = "canonical";

                document.head.appendChild(canonical);
            }

            canonical.href = selectedBlog.CANONICAL_URL;
        } else if (canonical) {
            canonical.remove();
        }

        // =========================
        // CLEANUP
        // =========================
        return () => {
            document.title = defaultTitle;
        };
    }, [selectedBlog]);

    // =========================
    // FORMAT DATE
    // =========================
  const formatDate = (date) => {
    if (!date) {
        return "";
    }

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
        return "";
    }

    return parsedDate.toLocaleDateString("en-US", {
        timeZone: "UTC",
        month: "short",
        day: "numeric",
        year: "numeric"
    });
};
    // =========================
    // IMAGE ERROR
    // =========================
    const handleImageError = (e) => {
        e.target.style.display = "none";
    };

    // =========================
    // LOADING
    // =========================
    if (loading) {
        return (
            <div className="blog-page">
                Loading blogs...
            </div>
        );
    }

    // =========================
    // ERROR
    // =========================
    if (error) {
        return (
            <div className="blog-page">
                {error}
            </div>
        );
    }

    return (
        <div className="blog-page">

            <h1>Our Blogs</h1>

            {/* =========================
                BLOG CARDS
            ========================= */}

            <div className="blog-grid">

                {blogs.map((blog) => (

                    <div
                        className="blog-card"
                        key={blog.ID}
                    >

                        {/* BLOG IMAGE */}

                        {blog.IMAGE && (
                            <img
                                src={blog.IMAGE}
                                alt={blog.TITLE}
                                className="blog-image"
                                onError={handleImageError}
                            />
                        )}

                        <div className="blog-content">

                            {/* CATEGORY */}

                            {blog.CATEGORY && (
                                <p className="blog-category">
                                    {blog.CATEGORY}
                                </p>
                            )}

                            {/* TITLE */}

                            <h2>
                                {blog.TITLE}
                            </h2>

                            {/* DESCRIPTION */}

                            <p className="blog-description">
                                {blog.DESCRIPTION}
                            </p>

                            {/* AUTHOR + DATE */}

                            <div className="blog-meta">

                                <span>
                                    By {blog.AUTHOR}
                                </span>

                                <span>
                                    |
                                </span>

                                <span>
                                    {formatDate(blog.CREATED_AT)}
                                </span>

                            </div>

                            {/* READ FULL BLOG */}

                            <button
                                className="read-blog-btn"
                                onClick={() => {
                                    if (blog.URL_SLUG) {
                                        navigate(`/blog/${blog.URL_SLUG}`);
                                    } else {
                                        setSelectedBlog(blog);
                                    }
                                }}
                            >
                                Read Full Blog
                            </button>

                        </div>

                    </div>

                ))}

            </div>

            {/* =========================
                FULL BLOG MODAL
            ========================= */}

            {selectedBlog && (

                <div className="blog-modal">

                    <div className="blog-modal-content">

                        {/* CLOSE BUTTON */}

                        <button
                            className="close-blog"
                            onClick={() =>
                                setSelectedBlog(null)
                            }
                        >
                            ×
                        </button>

                        {/* FULL BLOG IMAGE */}

                        {selectedBlog.IMAGE && (
                            <img
                                src={selectedBlog.IMAGE}
                                alt={selectedBlog.TITLE}
                                className="blog-full-image"
                                onError={handleImageError}
                            />
                        )}

                        {/* CATEGORY */}

                        {selectedBlog.CATEGORY && (
                            <p className="blog-category">
                                {selectedBlog.CATEGORY}
                            </p>
                        )}

                        {/* TITLE */}

                        <h1>
                            {selectedBlog.TITLE}
                        </h1>

                        {/* AUTHOR + DATE */}

                        <div className="blog-full-meta">

                            By {selectedBlog.AUTHOR}

                            {" | "}

                            {formatDate(
                                selectedBlog.CREATED_AT
                            )}

                        </div>

                        {/* DESCRIPTION */}

                        <p className="blog-full-description">
                            {selectedBlog.DESCRIPTION}
                        </p>

                        {/* FULL CONTENT */}

                        <div className="blog-full-content">

                            {selectedBlog.CONTENT
                                ?.split(/\r?\n/)
                                .filter(
                                    (line) =>
                                        line.trim() !== ""
                                )
                                .map((line, index) => (

                                    <p key={index}>
                                        {line}
                                    </p>

                                ))}

                        </div>

                    </div>

                </div>

            )}

        </div>
    );
}

export default Blog;
