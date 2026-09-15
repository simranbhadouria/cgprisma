import "./AdminBlog.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminBlog() {
    const navigate = useNavigate();

    const [blogs, setBlogs] = useState([]);

    const [form, setForm] = useState({
        title: "",
        description: "",
        content: "",
        image: "",
        author: "",
        category: "",

        // SEO fields

        seoTitle: "",
        metaDescription: "",
        seoKeywords: "",
        focusKeyword: "",
        urlSlug: "",
        canonicalUrl: ""
    });

    const [editingId, setEditingId] = useState(null);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [uploading, setUploading] = useState(false);

    // ===========================
    // ACCOUNT / PASSWORD STATES
    // ===========================

    const [showAccountMenu, setShowAccountMenu] = useState(false);
    const [showChangePassword, setShowChangePassword] = useState(false);

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [passwordMessage, setPasswordMessage] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [changingPassword, setChangingPassword] = useState(false);

    // ===========================
    // PASSWORD VISIBILITY STATES
    // ===========================

    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // ===========================
    // EMAIL UPDATE STATES
    // ===========================

    const [showUpdateEmail, setShowUpdateEmail] = useState(false);

    const [currentEmail, setCurrentEmail] = useState(
        localStorage.getItem("adminEmail") || ""
    );

    const [newEmail, setNewEmail] = useState("");
    const [emailPassword, setEmailPassword] = useState("");
    const [showEmailPassword, setShowEmailPassword] = useState(false);

    const [emailMessage, setEmailMessage] = useState("");
    const [emailError, setEmailError] = useState("");
    const [updatingEmail, setUpdatingEmail] = useState(false);

    // ===========================
    // GET BLOGS
    // ===========================

    const fetchBlogs = async () => {
        try {
            const response = await fetch(
               "/api/blogs"
            );

            const data = await response.json();

            if (response.ok) {
                setBlogs(data.blogs || []);
            }
        } catch (error) {
            console.error("Fetch blogs error:", error);
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    // ===========================
    // HANDLE INPUT
    // ===========================

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    // ===========================
    // CREATE / UPDATE BLOG
    // ===========================

    const handleSubmit = async (e) => {
        e.preventDefault();

        setMessage("");
        setError("");

        const token = localStorage.getItem("adminToken");

        if (!token) {
            navigate("/admin/login");
            return;
        }

        try {
            const url = editingId
                ? `/api/blogs/${editingId}`
                : "/api/blogs";

            const method = editingId ? "PUT" : "POST";

            const response = await fetch(url, {
                method: method,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(form)
            });

            const data = await response.json();

            if (!response.ok) {
                if (response.status === 401) {
                    localStorage.removeItem("adminToken");
                    localStorage.removeItem("adminEmail");
                    navigate("/admin/login");
                    return;
                }

                setError(
                    data.message ||
                    (editingId
                        ? "Failed to update blog"
                        : "Failed to create blog")
                );

                return;
            }

            setMessage(
                editingId
                    ? "Blog updated successfully!"
                    : "Blog created successfully!"
            );

            setForm({
                title: "",
                description: "",
                content: "",
                image: "",
                author: "",
                category: "",
                seoTitle: "",
                metaDescription: "",
                seoKeywords: "",
                focusKeyword: "",
                urlSlug: "",
                canonicalUrl: ""
            });

            setEditingId(null);

            fetchBlogs();
        } catch (error) {
            console.error("Save blog error:", error);
            setError("Unable to connect to server");
        }
    };

    // ===========================
    // EDIT BLOG
    // ===========================

    const handleEdit = (blog) => {
        setForm({
            title: blog.TITLE || "",
            description: blog.DESCRIPTION || "",
            content: blog.CONTENT || "",
            image: blog.IMAGE || "",
            author: blog.AUTHOR || "",
            category: blog.CATEGORY || "",

            // SEO fields
            seoTitle: blog.SEO_TITLE || "",
            metaDescription: blog.META_DESCRIPTION || "",
            seoKeywords: blog.SEO_KEYWORDS || "",
            focusKeyword: blog.FOCUS_KEYWORD || "",
            urlSlug: blog.URL_SLUG || "",
            canonicalUrl: blog.CANONICAL_URL || ""
        });

        setEditingId(blog.ID);
        setMessage("");
        setError("");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    // ===========================
    // CANCEL EDIT
    // ===========================

    const handleCancelEdit = () => {
        setEditingId(null);

        setForm({
            title: "",
            description: "",
            content: "",
            image: "",
            author: "",
            category: "",
            seoTitle: "",
            metaDescription: "",
            seoKeywords: "",
            focusKeyword: "",
            urlSlug: "",
            canonicalUrl: ""
        });

        setMessage("");
        setError("");
    };

    // ===========================
    // DELETE BLOG
    // ===========================

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this blog?"
        );

        if (!confirmDelete) {
            return;
        }

        const token = localStorage.getItem("adminToken");

        if (!token) {
            navigate("/admin/login");
            return;
        }

        try {
            const response = await fetch(
                `/api/blogs/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const data = await response.json();

            if (!response.ok) {
                if (response.status === 401) {
                    localStorage.removeItem("adminToken");
                    localStorage.removeItem("adminEmail");
                    navigate("/admin/login");
                    return;
                }

                setError(
                    data.message || "Failed to delete blog"
                );

                return;
            }

            setMessage("Blog deleted successfully!");
            fetchBlogs();
        } catch (error) {
            console.error("Delete blog error:", error);
            setError("Unable to connect to server");
        }
    };

    // ===========================
    // IMAGE UPLOAD
    // ===========================

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];

        if (!file) {
            return;
        }

        setUploading(true);
        setMessage("");
        setError("");

        const token = localStorage.getItem("adminToken");

        if (!token) {
            navigate("/admin/login");
            return;
        }

        try {
            const formData = new FormData();

            formData.append("image", file);

            const response = await fetch(
                "/api/upload",
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    body: formData
                }
            );

            const data = await response.json();

            if (!response.ok) {
                if (response.status === 401) {
                    localStorage.removeItem("adminToken");
                    localStorage.removeItem("adminEmail");
                    navigate("/admin/login");
                    return;
                }

                setError(
                    data.message || "Image upload failed"
                );

                return;
            }

            setForm({
                ...form,
                image: data.imageUrl
            });

            setMessage("Image uploaded successfully!");
        } catch (error) {
            console.error("Image upload error:", error);
            setError("Image upload failed");
        } finally {
            setUploading(false);
        }
    };

    // ===========================
    // CHANGE PASSWORD
    // ===========================

    const handleChangePassword = async (e) => {
        e.preventDefault();

        setPasswordMessage("");
        setPasswordError("");

        if (newPassword !== confirmPassword) {
            setPasswordError(
                "New passwords do not match"
            );
            return;
        }

        if (newPassword.length < 8) {
            setPasswordError(
                "New password must be at least 8 characters"
            );
            return;
        }

        const token = localStorage.getItem("adminToken");
        const email = localStorage.getItem("adminEmail");

        if (!token || !email) {
            navigate("/admin/login");
            return;
        }

        setChangingPassword(true);

        try {
            const response = await fetch(
                "/api/auth/change-password",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        email: email,
                        currentPassword: currentPassword,
                        newPassword: newPassword
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                setPasswordError(
                    data.message || "Password change failed"
                );

                return;
            }

            setPasswordMessage(
                "Password changed successfully!"
            );

            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");

            setShowCurrentPassword(false);
            setShowNewPassword(false);
            setShowConfirmPassword(false);

            setTimeout(() => {
                setShowChangePassword(false);
                setPasswordMessage("");
            }, 1500);
        } catch (error) {
            console.error(
                "Change password error:",
                error
            );

            setPasswordError(
                "Unable to connect to server"
            );
        } finally {
            setChangingPassword(false);
        }
    };

    // ===========================
    // UPDATE EMAIL
    // ===========================

    const handleUpdateEmail = async (e) => {
        e.preventDefault();

        setEmailMessage("");
        setEmailError("");

        const token = localStorage.getItem("adminToken");
        const storedEmail = localStorage.getItem("adminEmail");

        if (!token || !storedEmail) {
            navigate("/admin/login");
            return;
        }

        if (!newEmail.trim()) {
            setEmailError(
                "Please enter a new email address"
            );

            return;
        }

        if (
            newEmail.trim().toLowerCase() ===
            storedEmail.toLowerCase()
        ) {
            setEmailError(
                "New email must be different from current email"
            );

            return;
        }

        setUpdatingEmail(true);

        try {
            const response = await fetch(
                "/api/auth/update-email",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        currentEmail: storedEmail,
                        newEmail: newEmail.trim(),
                        currentPassword: emailPassword
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                if (response.status === 401) {
                    localStorage.removeItem("adminToken");
                    localStorage.removeItem("adminEmail");
                    navigate("/admin/login");
                    return;
                }

                setEmailError(
                    data.message || "Email update failed"
                );

                return;
            }

            localStorage.setItem(
                "adminEmail",
                data.email
            );

            setCurrentEmail(data.email);

            setEmailMessage(
                "Email updated successfully!"
            );

            setNewEmail("");
            setEmailPassword("");
            setShowEmailPassword(false);

            setTimeout(() => {
                setShowUpdateEmail(false);
                setEmailMessage("");
            }, 1500);
        } catch (error) {
            console.error(
                "Update email error:",
                error
            );

            setEmailError(
                "Unable to connect to server"
            );
        } finally {
            setUpdatingEmail(false);
        }
    };

    // ===========================
    // OPEN CHANGE PASSWORD
    // ===========================

    const openChangePassword = () => {
        setShowAccountMenu(false);

        setPasswordMessage("");
        setPasswordError("");

        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");

        setShowCurrentPassword(false);
        setShowNewPassword(false);
        setShowConfirmPassword(false);

        setShowChangePassword(true);
    };

    // ===========================
    // OPEN UPDATE EMAIL
    // ===========================

    const openUpdateEmail = () => {
        setShowAccountMenu(false);

        setEmailMessage("");
        setEmailError("");

        setCurrentEmail(
            localStorage.getItem("adminEmail") || ""
        );

        setNewEmail("");
        setEmailPassword("");
        setShowEmailPassword(false);

        setShowUpdateEmail(true);
    };

    // ===========================
    // LOGOUT
    // ===========================

    const handleLogout = () => {
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminEmail");

        navigate("/admin/login");
    };

    // ===========================
    // FORGOT PASSWORD
    // ===========================

    const handleForgotPassword = () => {
        setShowAccountMenu(false);

        alert(
            "Forgot password recovery requires an email/OTP reset process. Please contact the system administrator."
        );
    };

    // ===========================
    // FORMAT DATE
    // ===========================

    const formatDate = (date) => {
        if (!date) {
            return "";
        }

        return new Date(date).toLocaleDateString(
            "en-US",
            {
                month: "short",
                day: "numeric",
                year: "numeric"
            }
        );
    };

    // ===========================
    // RETURN
    // ===========================

    return (
        <div className="admin-blog-page">

            {/* ===========================
                HEADER
            =========================== */}

            <div className="admin-header">

                <div>
                    <h1>Blog Admin</h1>

                    <p>
                        Manage your website articles and content
                    </p>
                </div>

                {/* ACCOUNT BUTTONS */}

                <div className="admin-header-actions">

                    <div className="account-menu-wrapper">

                        <button
                            type="button"
                            className="admin-account-btn"
                            onClick={() =>
                                setShowAccountMenu(
                                    !showAccountMenu
                                )
                            }
                        >
                            ⚙ Account
                        </button>

                        {showAccountMenu && (
                            <div className="account-dropdown">

                                <div className="account-dropdown-title">
                                    Admin Account
                                </div>

                                {/* UPDATE EMAIL */}

                                <button
                                    type="button"
                                    onClick={openUpdateEmail}
                                >
                                    ✉️ Update Email
                                </button>

                                {/* CHANGE PASSWORD */}

                                <button
                                    type="button"
                                    onClick={openChangePassword}
                                >
                                    🔐 Change Password
                                </button>

                                {/* FORGOT PASSWORD */}

                                <button
                                    type="button"
                                    onClick={handleForgotPassword}
                                >
                                    ❓ Forgot Password
                                </button>

                            </div>
                        )}

                    </div>

                    {/* NORMAL LOGOUT BUTTON */}

                    <button
                        type="button"
                        className="admin-logout-btn"
                        onClick={handleLogout}
                    >
                        🔒 Logout
                    </button>

                </div>

                {/* ===========================
                    UPDATE EMAIL MODAL
                =========================== */}

                {showUpdateEmail && (
                    <div
                        className="password-modal-overlay"
                        onClick={() =>
                            setShowUpdateEmail(false)
                        }
                    >

                        <div
                            className="password-modal"
                            onClick={(e) =>
                                e.stopPropagation()
                            }
                        >

                            {/* MODAL HEADER */}

                            <div className="password-modal-header">

                                <div>

                                    <h2>
                                        Update Email
                                    </h2>

                                    <p>
                                        Update your admin account email
                                    </p>

                                </div>

                                <button
                                    type="button"
                                    className="password-modal-close"
                                    onClick={() => {
                                        setShowUpdateEmail(false);
                                        setEmailMessage("");
                                        setEmailError("");
                                    }}
                                >
                                    ×
                                </button>

                            </div>

                            {/* EMAIL FORM */}

                            <form onSubmit={handleUpdateEmail}>

                                {/* CURRENT EMAIL */}

                                <div className="password-field">

                                    <label>
                                        Current Email
                                    </label>

                                    <input
                                        type="email"
                                        value={currentEmail}
                                        readOnly
                                    />

                                </div>

                                {/* NEW EMAIL */}

                                <div className="password-field">

                                    <label>
                                        New Email
                                    </label>

                                    <input
                                        type="email"
                                        value={newEmail}
                                        onChange={(e) =>
                                            setNewEmail(
                                                e.target.value
                                            )
                                        }
                                        placeholder="Enter new email address"
                                        required
                                    />

                                </div>

                                {/* CURRENT PASSWORD */}

                                <div className="password-field">

                                    <label>
                                        Current Password
                                    </label>

                                    <div className="password-input-wrapper">

                                        <input
                                            type={
                                                showEmailPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            value={emailPassword}
                                            onChange={(e) =>
                                                setEmailPassword(
                                                    e.target.value
                                                )
                                            }
                                            placeholder="Enter current password"
                                            required
                                        />

                                        <button
                                            type="button"
                                            className="password-toggle-btn"
                                            onClick={() =>
                                                setShowEmailPassword(
                                                    !showEmailPassword
                                                )
                                            }
                                            aria-label={
                                                showEmailPassword
                                                    ? "Hide password"
                                                    : "Show password"
                                            }
                                        >
                                            {showEmailPassword
                                                ? "🙈"
                                                : "👁️"}
                                        </button>

                                    </div>

                                </div>

                                {/* ERROR */}

                                {emailError && (
                                    <div className="admin-error">
                                        {emailError}
                                    </div>
                                )}

                                {/* SUCCESS */}

                                {emailMessage && (
                                    <div className="admin-success">
                                        {emailMessage}
                                    </div>
                                )}

                                {/* BUTTONS */}

                                <div className="password-modal-actions">

                                    <button
                                        type="button"
                                        className="admin-secondary-btn"
                                        onClick={() => {
                                            setShowUpdateEmail(false);
                                            setEmailMessage("");
                                            setEmailError("");
                                        }}
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        type="submit"
                                        className="admin-primary-btn"
                                        disabled={updatingEmail}
                                    >
                                        {updatingEmail
                                            ? "Updating..."
                                            : "Update Email"}
                                    </button>

                                </div>

                            </form>

                        </div>

                    </div>
                )}

                {/* ===========================
                    CHANGE PASSWORD MODAL
                =========================== */}

                {showChangePassword && (
                    <div
                        className="password-modal-overlay"
                        onClick={() =>
                            setShowChangePassword(false)
                        }
                    >

                        <div
                            className="password-modal"
                            onClick={(e) =>
                                e.stopPropagation()
                            }
                        >

                            {/* MODAL HEADER */}

                            <div className="password-modal-header">

                                <div>

                                    <h2>
                                        Change Password
                                    </h2>

                                    <p>
                                        Update your admin account password
                                    </p>

                                </div>

                                <button
                                    type="button"
                                    className="password-modal-close"
                                    onClick={() => {
                                        setShowChangePassword(false);
                                        setPasswordMessage("");
                                        setPasswordError("");
                                    }}
                                >
                                    ×
                                </button>

                            </div>

                            {/* PASSWORD FORM */}

                            <form
                                onSubmit={handleChangePassword}
                            >

                                {/* CURRENT PASSWORD */}

                                <div className="password-field">

                                    <label>
                                        Current Password
                                    </label>

                                    <div className="password-input-wrapper">

                                        <input
                                            type={
                                                showCurrentPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            value={currentPassword}
                                            onChange={(e) =>
                                                setCurrentPassword(
                                                    e.target.value
                                                )
                                            }
                                            placeholder="Enter current password"
                                            required
                                        />

                                        <button
                                            type="button"
                                            className="password-toggle-btn"
                                            onClick={() =>
                                                setShowCurrentPassword(
                                                    !showCurrentPassword
                                                )
                                            }
                                            aria-label={
                                                showCurrentPassword
                                                    ? "Hide current password"
                                                    : "Show current password"
                                            }
                                        >
                                            {showCurrentPassword
                                                ? "🙈"
                                                : "👁️"}
                                        </button>

                                    </div>

                                </div>

                                {/* NEW PASSWORD */}

                                <div className="password-field">

                                    <label>
                                        New Password
                                    </label>

                                    <div className="password-input-wrapper">

                                        <input
                                            type={
                                                showNewPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            value={newPassword}
                                            onChange={(e) =>
                                                setNewPassword(
                                                    e.target.value
                                                )
                                            }
                                            placeholder="Minimum 8 characters"
                                            required
                                        />

                                        <button
                                            type="button"
                                            className="password-toggle-btn"
                                            onClick={() =>
                                                setShowNewPassword(
                                                    !showNewPassword
                                                )
                                            }
                                            aria-label={
                                                showNewPassword
                                                    ? "Hide new password"
                                                    : "Show new password"
                                            }
                                        >
                                            {showNewPassword
                                                ? "🙈"
                                                : "👁️"}
                                        </button>

                                    </div>

                                </div>

                                {/* CONFIRM PASSWORD */}

                                <div className="password-field">

                                    <label>
                                        Confirm New Password
                                    </label>

                                    <div className="password-input-wrapper">

                                        <input
                                            type={
                                                showConfirmPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            value={confirmPassword}
                                            onChange={(e) =>
                                                setConfirmPassword(
                                                    e.target.value
                                                )
                                            }
                                            placeholder="Confirm new password"
                                            required
                                        />

                                        <button
                                            type="button"
                                            className="password-toggle-btn"
                                            onClick={() =>
                                                setShowConfirmPassword(
                                                    !showConfirmPassword
                                                )
                                            }
                                            aria-label={
                                                showConfirmPassword
                                                    ? "Hide confirm password"
                                                    : "Show confirm password"
                                            }
                                        >
                                            {showConfirmPassword
                                                ? "🙈"
                                                : "👁️"}
                                        </button>

                                    </div>

                                </div>

                                {/* ERROR */}

                                {passwordError && (
                                    <div className="admin-error">
                                        {passwordError}
                                    </div>
                                )}

                                {/* SUCCESS */}

                                {passwordMessage && (
                                    <div className="admin-success">
                                        {passwordMessage}
                                    </div>
                                )}

                                {/* MODAL BUTTONS */}

                                <div className="password-modal-actions">

                                    <button
                                        type="button"
                                        className="admin-secondary-btn"
                                        onClick={() => {
                                            setShowChangePassword(false);
                                            setPasswordMessage("");
                                            setPasswordError("");
                                        }}
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        type="submit"
                                        className="admin-primary-btn"
                                        disabled={changingPassword}
                                    >
                                        {changingPassword
                                            ? "Updating..."
                                            : "Update Password"}
                                    </button>

                                </div>

                            </form>

                        </div>

                    </div>
                )}

            </div>

            {/* ===========================
                MAIN ADMIN CONTAINER
            =========================== */}

            <div className="admin-container">

                {/* ===========================
                    CREATE / UPDATE FORM
                =========================== */}

                <div className="admin-form-card">

                    <h2>
                        {editingId
                            ? "Update Blog"
                            : "Create New Blog"}
                    </h2>

                    <form onSubmit={handleSubmit}>

                        {/* TITLE */}

                        <div className="admin-form-group">

                            <label>
                                Blog Title
                            </label>

                            <input
                                type="text"
                                name="title"
                                value={form.title}
                                onChange={handleChange}
                                placeholder="Enter blog title"
                                required
                            />

                        </div>

                        {/* DESCRIPTION */}

                        <div className="admin-form-group">

                            <label>
                                Description
                            </label>

                            <textarea
                                name="description"
                                value={form.description}
                                onChange={handleChange}
                                placeholder="Enter a short description"
                                required
                            />

                        </div>

                        {/* CONTENT */}

                        <div className="admin-form-group">

                            <label>
                                Blog Content
                            </label>

                            <textarea
                                name="content"
                                value={form.content}
                                onChange={handleChange}
                                placeholder="Write your blog content here. Use blank lines between paragraphs."
                                rows="10"
                                required
                            />

                        </div>

                        {/* IMAGE */}

                        <div className="admin-image-section">

                            <div className="admin-form-group">

                                <label>
                                    Image URL
                                </label>

                                <input
                                    type="text"
                                    name="image"
                                    value={form.image}
                                    onChange={handleChange}
                                    placeholder="https://example.com/image.jpg"
                                />

                                {form.image && (
                                    <img
                                        src={form.image}
                                        alt="Preview"
                                        className="admin-image-preview"
                                        onError={(e) => {
                                            e.target.style.display =
                                                "none";
                                        }}
                                    />
                                )}

                            </div>

                            <div className="admin-form-group">

                                <label>
                                    Upload Image
                                </label>

                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={
                                        handleImageUpload
                                    }
                                    className="admin-file-input"
                                />

                                {uploading && (
                                    <p>
                                        Uploading image...
                                    </p>
                                )}

                            </div>

                        </div>

                        {/* AUTHOR + CATEGORY */}

                        <div className="admin-form-row">

                            <div className="admin-form-group">

                                <label>
                                    Author
                                </label>

                                <input
                                    type="text"
                                    name="author"
                                    value={form.author}
                                    onChange={handleChange}
                                    placeholder="Enter author"
                                />

                            </div>

                            <div className="admin-form-group">

                                <label>
                                    Category
                                </label>

                                <input
                                    type="text"
                                    name="category"
                                    value={form.category}
                                    onChange={handleChange}
                                    placeholder="Enter category"
                                />

                            </div>

                        </div>

                        {/* ===========================
                            SEO SETTINGS
                        =========================== */}

                        <div className="seo-section">

                            <h3>
                                SEO Settings
                            </h3>

                            {/* SEO TITLE */}

                            <div className="admin-form-group">

                                <label>
                                    SEO Title
                                </label>

                                <input
                                    type="text"
                                    name="seoTitle"
                                    value={form.seoTitle}
                                    onChange={handleChange}
                                    placeholder="Enter SEO title"
                                    maxLength="255"
                                />

                            </div>

                            {/* META DESCRIPTION */}

                            <div className="admin-form-group">

                                <label>
                                    Meta Description
                                </label>

                                <textarea
                                    name="metaDescription"
                                    value={
                                        form.metaDescription
                                    }
                                    onChange={handleChange}
                                    placeholder="Enter meta description"
                                    maxLength="500"
                                    rows="3"
                                />

                            </div>

                            {/* SEO KEYWORDS */}

                            <div className="admin-form-group">

                                <label>
                                    SEO Keywords
                                </label>

                                <input
                                    type="text"
                                    name="seoKeywords"
                                    value={form.seoKeywords}
                                    onChange={handleChange}
                                    placeholder="cybersecurity, data security, encryption"
                                    maxLength="500"
                                />

                            </div>

                            {/* FOCUS KEYWORD */}

                            <div className="admin-form-group">

                                <label>
                                    Focus Keyword
                                </label>

                                <input
                                    type="text"
                                    name="focusKeyword"
                                    value={form.focusKeyword}
                                    onChange={handleChange}
                                    placeholder="Enter focus keyword"
                                    maxLength="255"
                                />

                            </div>

                            {/* URL SLUG */}

                            <div className="admin-form-group">

                                <label>
                                    URL Slug
                                </label>

                                <input
                                    type="text"
                                    name="urlSlug"
                                    value={form.urlSlug}
                                    onChange={handleChange}
                                    placeholder="protection-and-encryption"
                                    maxLength="255"
                                />

                            </div>

                            {/* CANONICAL URL */}

                            <div className="admin-form-group">

                                <label>
                                    Canonical URL
                                </label>

                                <input
                                    type="url"
                                    name="canonicalUrl"
                                    value={form.canonicalUrl}
                                    onChange={handleChange}
                                    placeholder="https://cynox-security-blog.vercel.app/blog/..."
                                    maxLength="500"
                                />

                            </div>

                        </div>

                        {/* BUTTONS */}

                        <div className="admin-card-actions">

                            <button
                                type="submit"
                                className="admin-primary-btn"
                            >
                                {editingId
                                    ? "Update Blog"
                                    : "Create Blog"}
                            </button>

                            {editingId && (
                                <button
                                    type="button"
                                    className="admin-secondary-btn"
                                    onClick={
                                        handleCancelEdit
                                    }
                                >
                                    Cancel
                                </button>
                            )}

                        </div>

                    </form>

                    {/* MESSAGES */}

                    {message && (
                        <div className="admin-success">
                            {message}
                        </div>
                    )}

                    {error && (
                        <div className="admin-error">
                            {error}
                        </div>
                    )}

                </div>

                {/* ===========================
                    EXISTING BLOGS
                =========================== */}

                <div className="admin-blogs-section">

                    <h2>
                        Existing Blogs
                    </h2>

                    <div className="admin-blog-grid">

                        {blogs.map((blog) => (

                            <div
                                className="admin-blog-card"
                                key={blog.ID}
                            >

                                {/* BLOG IMAGE */}

                                {blog.IMAGE && (
                                    <img
                                        src={blog.IMAGE}
                                        alt={blog.TITLE}
                                        className="admin-blog-card-image"
                                    />
                                )}

                                <div className="admin-blog-card-content">

                                    {/* CATEGORY */}

                                    {blog.CATEGORY && (
                                        <div className="admin-blog-category">
                                            {blog.CATEGORY}
                                        </div>
                                    )}

                                    {/* TITLE */}

                                    <h3>
                                        {blog.TITLE}
                                    </h3>

                                    {/* DESCRIPTION */}

                                    <p>
                                        {blog.DESCRIPTION}
                                    </p>

                                    {/* AUTHOR + DATE */}

                                    <p>
                                        By {blog.AUTHOR}
                                        {" | "}
                                        {formatDate(
                                            blog.CREATED_AT
                                        )}
                                    </p>

                                    {/* EDIT / DELETE */}

                                    <div className="admin-card-actions">

                                        <button
                                            type="button"
                                            className="admin-edit-btn"
                                            onClick={() =>
                                                handleEdit(
                                                    blog
                                                )
                                            }
                                        >
                                            Edit
                                        </button>

                                        <button
                                            type="button"
                                            className="admin-delete-btn"
                                            onClick={() =>
                                                handleDelete(
                                                    blog.ID
                                                )
                                            }
                                        >
                                            Delete
                                        </button>

                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>

                </div>

            </div>

        </div>
    );
}

export default AdminBlog;
