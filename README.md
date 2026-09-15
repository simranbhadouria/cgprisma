# 🛡️ Cynox Security

## Cybersecurity Solutions & Security Information Platform

Cynox Security is a modern, responsive cybersecurity website developed to present cybersecurity solutions, security platforms, technical information, resources, datasheets, blogs, and other security-related content through a professional web interface.

The project combines a React-based frontend with backend APIs, Oracle Database integration, administrator functionality, and an AI-powered chatbot.

---

# 📌 Project Overview

The Cynox Security website is designed as a complete cybersecurity information and solution platform.

The website provides visitors with a centralized place to:

* Learn about cybersecurity
* Explore security solutions
* Understand security platforms
* View company information
* Explore technical resources
* Access datasheets
* Read cybersecurity blogs
* Interact with an AI-powered chatbot
* Access additional security-related information

The project also includes an administrator section for managing dynamic website content.

---

# 🌐 Live Project

### Live Website

https://cynox-security-blog.vercel.app/

### Admin Panel

https://cynox-security-blog.vercel.app/admin/login

### Admin Blog Management

https://cynox-security-blog.vercel.app/admin/blogs

### GitHub Repository

https://github.com/simranbhadouria/cynox-security-blog

---

# 🎯 Project Objectives

The main objectives of the project are:

1. Build a professional cybersecurity website.
2. Present cybersecurity solutions in a clear and structured way.
3. Provide information about security platforms and technologies.
4. Provide technical resources and datasheets.
5. Publish and manage cybersecurity blogs.
6. Provide an administrator interface for dynamic content management.
7. Provide an AI-powered chatbot for visitor assistance.
8. Store application data using Oracle Database.
9. Implement secure administrator authentication.
10. Deploy the complete application to the cloud.

---

# 🏠 Website Sections

The website is not limited to the blog or administrator section.

The complete website contains multiple public-facing sections designed to provide information about Cynox Security and its cybersecurity capabilities.

---

## 1. Home

The Home page is the main entry point of the website.

It introduces the cybersecurity platform and provides visitors with an overview of the organization's security-focused services and capabilities.

The Home page is designed to guide visitors toward the main sections of the website.

### Main purpose

* Introduce Cynox Security
* Present key security capabilities
* Provide navigation to important sections
* Create a professional first impression
* Guide users toward solutions and resources

---

# 2. About

The About section provides information about the organization and its cybersecurity focus.

It helps visitors understand the purpose, background, and security-oriented approach of the organization.

### Main purpose

* Provide company information
* Explain the organization's cybersecurity focus
* Build credibility
* Provide background information to visitors

---

# 3. Solutions

The Solutions section presents cybersecurity-related solutions and capabilities.

This section is designed to help visitors understand the different types of security solutions available.

### Main purpose

* Present cybersecurity solutions
* Explain security capabilities
* Organize security offerings
* Help users understand available solutions

---

# 4. Security Platform

The Security Platform section provides information about the security technologies and platform capabilities.

The purpose is to explain how the platform supports cybersecurity requirements and security operations.

### Main purpose

* Explain platform capabilities
* Present security technologies
* Provide technical information
* Help users understand the security platform

---

# 5. Datasheets

The Datasheets section provides technical resources and product-related information.

Datasheets are useful for users who need more detailed technical information about cybersecurity solutions.

### Main purpose

* Provide technical resources
* Present detailed product information
* Support technical evaluation
* Make resources accessible from the website

---

# 6. Blog

The Blog section provides cybersecurity-related articles and information.

The blog is dynamically connected to the backend so that content can be managed through the administrator interface.

### Main purpose

* Publish cybersecurity information
* Share technical articles
* Educate website visitors
* Provide regularly updated content

---

# 7. AI Chatbot

The website contains an AI-powered chatbot that allows visitors to ask questions.

The chatbot provides an interactive way for users to get information without manually searching through every page.

### Chatbot flow

```text
User
  |
  v
Chatbot Interface
  |
  v
POST /api/chat
  |
  v
Vercel API Function
  |
  v
Google Gemini API
  |
  v
AI Generated Response
  |
  v
Chatbot Interface
  |
  v
User
```

The Gemini API key is stored server-side using an environment variable rather than exposing it in the frontend.

---

# 8. Admin Panel

The website includes a separate administrator area.

The administrator can securely log in and manage dynamic website content.

### Admin functionality

* Administrator login
* Authentication
* Blog management
* Create blog posts
* View blog posts
* Edit blog posts
* Delete blog posts

The administrator area is separated from the public-facing website.

---

# 💻 Technology Stack

## Frontend

### React

React is used to build the website's user interface.

React allows the application to be divided into reusable components and pages.

Examples include:

* Navigation
* Website sections
* Blog components
* Chatbot
* Admin interface
* Reusable UI elements

### Why React?

React provides:

* Component-based development
* Reusable components
* Dynamic rendering
* Maintainable code
* Efficient UI updates

---

## Vite

Vite is used as the frontend development and build tool.

### Why Vite?

Vite provides:

* Fast development server
* Fast Hot Module Replacement
* Fast production builds
* Simple React integration

Development:

```bash
npm run dev
```

Production build:

```bash
npm run build
```

---

## JavaScript

JavaScript is used for the application's logic and functionality.

It handles:

* User interactions
* API requests
* Form handling
* Dynamic data
* Chatbot communication
* Authentication-related frontend behavior

---

## React Router

React Router is used for navigation between different pages of the website.

It allows the application to support different routes such as:

```text
/
 /about
 /solutions
 /platform
 /datasheets
 /blog
 /admin/login
 /admin/blogs
```

---

## CSS

CSS is used to create the visual design of the website.

It controls:

* Layout
* Colors
* Typography
* Spacing
* Buttons
* Cards
* Navigation
* Responsive behavior
* Chatbot appearance
* Admin interface styling

---

# ⚙️ Backend

## Node.js

Node.js is used for server-side application development.

It handles backend operations such as:

* API requests
* Authentication
* Database communication
* Blog operations
* Server-side processing

---

## Express.js

Express.js is used to build the backend REST APIs.

Express handles:

* HTTP requests
* API routes
* Middleware
* Authentication
* Database communication
* Backend responses

---

# 🔌 REST API

The frontend communicates with the backend through REST-style APIs.

General architecture:

```text
React Frontend
      |
      | HTTP Request
      v
REST API
      |
      v
Node.js / Express
      |
      v
Oracle Database
```

The API layer keeps the frontend and backend separated.

---

# 🗄️ Database

## Oracle Database

Oracle Database is used for persistent application data.

The database can be used for information such as:

* Administrator accounts
* Blog information
* Blog content
* Other backend application data

### Database architecture

```text
React Frontend
       |
       v
Express Backend
       |
       v
OracleDB Driver
       |
       v
Oracle Database
```

---

# 🔗 OracleDB Driver

The Node.js OracleDB driver provides communication between the Node.js backend and Oracle Database.

```text
Node.js
   |
   v
OracleDB Driver
   |
   v
Oracle Database
```

---

# 🔐 Authentication

The administrator functionality uses authentication to protect restricted functionality.

---

## bcryptjs

bcryptjs is used for password hashing.

Instead of storing administrator passwords as plain text:

```text
Password
   |
   v
bcrypt
   |
   v
Password Hash
   |
   v
Database
```

This provides a safer way to store administrator credentials.

---

## JWT

JSON Web Tokens are used for administrator authentication and authorization.

Authentication flow:

```text
Admin
  |
  v
Login
  |
  v
Email + Password
  |
  v
Backend Verification
  |
  v
JWT Token
  |
  v
Protected API
```

JWT allows the backend to identify authenticated administrator requests.

---

# 🤖 Artificial Intelligence

## Google Gemini API

Google Gemini is integrated into the website to provide AI-powered chatbot functionality.

The chatbot allows visitors to ask questions directly from the website.

### AI architecture

```text
Visitor
   |
   v
Chatbot
   |
   v
/ api / chat
   |
   v
Vercel API
   |
   v
Gemini API
   |
   v
AI Response
   |
   v
Chatbot
```

The API key is stored in an environment variable.

It is not placed directly inside frontend code.

---

# 📂 Project Structure

```text
cynox-security-blog/
│
├── api/
│   └── index.js
│
├── backend/
│   ├── routes/
│   ├── server.js
│   └── ...
│
├── public/
│   └── ...
│
├── src/
│   ├── components/
│   │   ├── Chatbot.jsx
│   │   └── ...
│   │
│   ├── pages/
│   │   ├── Home
│   │   ├── About
│   │   ├── Solutions
│   │   ├── Platform
│   │   ├── Datasheets
│   │   ├── Blog
│   │   ├── Admin
│   │   └── ...
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── ...
│
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── vercel.json
├── vite.config.js
└── README.md
```

---

# 🧩 Application Architecture

The complete application can be represented as:

```text
                         USER
                          |
                          v
                 React Frontend
                          |
        +-----------------+-----------------+
        |                 |                 |
        v                 v                 v
     Website            Blog             Chatbot
     Pages              Pages               |
        |                 |                 |
        |                 v                 v
        |              REST API          /api/chat
        |                 |                 |
        |                 v                 v
        |             Node.js          Gemini API
        |             Express
        |                 |
        |                 v
        |          Oracle Database
        |                 |
        +-----------------+
```

---

# 🔄 Complete Data Flow

## Public Website

```text
User
 ↓
React
 ↓
Website Page
 ↓
UI Content
```

---

## Blog

```text
User
 ↓
Blog Page
 ↓
API Request
 ↓
Backend
 ↓
Oracle Database
 ↓
Blog Data
 ↓
Blog Page
```

---

## Admin

```text
Administrator
 ↓
Admin Login
 ↓
Backend
 ↓
Password Verification
 ↓
JWT
 ↓
Protected API
 ↓
Blog Management
 ↓
Oracle Database
```

---

## Chatbot

```text
User
 ↓
Chatbot
 ↓
/api/chat
 ↓
Vercel API
 ↓
Gemini
 ↓
AI Response
 ↓
Chatbot
```

---

# 🔒 Security Practices

Security is an important part of the project because the application itself is focused on cybersecurity.

The project follows practices such as:

* Password hashing
* JWT authentication
* Protected administrator functionality
* Environment variables for sensitive values
* Server-side API key handling
* Database credential protection
* HTTPS production deployment
* Separation between frontend and backend
* API-based communication

---

# 🔑 Environment Variables

Sensitive configuration should be stored using environment variables.

Example:

```env
GEMINI_API_KEY=your_gemini_api_key

DB_USER=your_database_user

DB_PASSWORD=your_database_password

DB_CONNECT_STRING=your_database_connection

JWT_SECRET=your_secure_jwt_secret

PORT=5000
```

### Security Warning

Never commit real:

* API keys
* Database passwords
* JWT secrets
* Authentication credentials

to GitHub.

For local development, use `.env`.

For production, use Vercel Environment Variables.

---

# 🚀 Local Installation

## 1. Clone the Repository

```bash
git clone https://github.com/simranbhadouria/cynox-security-blog.git
```

## 2. Enter the Project

```bash
cd cynox-security-blog
```

## 3. Install Frontend Dependencies

```bash
npm install
```

## 4. Start the Development Server

```bash
npm run dev
```

The development application normally runs at:

```text
http://localhost:5173
```

---

# ⚙️ Backend Setup

The backend is located inside:

```text
backend/
```

Install backend dependencies if required:

```bash
cd backend
npm install
```

Configure the required environment variables before starting the backend.

---

# 🏗️ Production Build

Create a production build using:

```bash
npm run build
```

The production build is generated for deployment.

---

# ☁️ Deployment

The project uses GitHub for source-code management and Vercel for production deployment.

Deployment flow:

```text
Developer
    |
    v
Local Development
    |
    v
Git
    |
    v
GitHub
    |
    v
Vercel
    |
    v
Production Website
```

Production website:

https://cynox-security-blog.vercel.app/

---

# 🔄 Git Workflow

The development workflow is:

```text
1. Develop
      ↓
2. Test
      ↓
3. Git Add
      ↓
4. Git Commit
      ↓
5. Git Push
      ↓
6. GitHub
      ↓
7. Vercel Deployment
```

Example:

```bash
git add .
git commit -m "Update project"
git push origin main
```

---

# 📋 Testing Checklist

Before deploying changes, the following areas should be checked:

### Website

* [ ] Home page
* [ ] Navigation
* [ ] About section
* [ ] Solutions
* [ ] Security Platform
* [ ] Datasheets
* [ ] Blog
* [ ] Chatbot
* [ ] Responsive layout

### Admin

* [ ] Admin login
* [ ] Authentication
* [ ] Blog creation
* [ ] Blog editing
* [ ] Blog deletion
* [ ] Blog listing

### Backend

* [ ] REST APIs
* [ ] Database connection
* [ ] Authentication
* [ ] Blog APIs
* [ ] Chatbot API

### Production

* [ ] Vercel deployment
* [ ] Environment variables
* [ ] API endpoints
* [ ] Production chatbot
* [ ] Production admin panel

---

# 🛠️ Development Tools

The project uses the following development and deployment tools:

| Tool / Technology | Purpose                       |
| ----------------- | ----------------------------- |
| React             | Frontend UI                   |
| Vite              | Development and build tool    |
| JavaScript        | Application logic             |
| React Router      | Page routing                  |
| CSS               | Styling and responsive design |
| Node.js           | Backend runtime               |
| Express.js        | REST API framework            |
| Oracle Database   | Data storage                  |
| OracleDB          | Node.js–Oracle connection     |
| SQL               | Database operations           |
| bcryptjs          | Password hashing              |
| JWT               | Authentication                |
| Multer            | File upload handling          |
| CORS              | Cross-origin request handling |
| Google Gemini     | AI chatbot                    |
| Git               | Version control               |
| GitHub            | Source-code repository        |
| Vercel            | Cloud deployment              |

---

# 📖 Why README.md Is Included

The README provides complete documentation for the project.

It explains:

* Project purpose
* Website sections
* Features
* Technology stack
* Frontend architecture
* Backend architecture
* Database architecture
* Authentication
* AI chatbot
* API communication
* Project structure
* Environment variables
* Local setup
* Deployment
* Security practices

This allows another developer or team member to understand the project without having to inspect every source file first.

---

# 🎯 Key Project Highlights

The main technical highlights of Cynox Security are:

### 1. Responsive Cybersecurity Website

A modern interface designed for different screen sizes.

### 2. Component-Based Frontend

React components make the interface reusable and maintainable.

### 3. Dynamic Blog System

Blog content is managed dynamically through backend APIs.

### 4. Secure Administrator System

JWT and bcrypt are used for administrator authentication and password security.

### 5. Oracle Database Integration

Application data is stored persistently using Oracle Database.

### 6. REST API Architecture

Frontend and backend communicate through API endpoints.

### 7. AI-Powered Chatbot

Google Gemini provides intelligent responses to website visitors.

### 8. Cloud Deployment

The application is deployed using Vercel.

### 9. Git-Based Development

GitHub is used for source-code management and deployment integration.

---

# 📈 Future Enhancements

Potential improvements for future versions include:

* Advanced chatbot knowledge based on website content
* Website-wide search
* Blog categories
* Blog filtering
* Blog pagination
* Advanced admin dashboard
* Role-based access control
* API rate limiting
* Improved input validation
* Security logging
* Automated testing
* Analytics
* SEO improvements
* Accessibility improvements
* Performance optimization

---

# 👨‍💻 Developer

**Simran Bhadouria**

GitHub:

https://github.com/simranbhadouria

---

# 🔗 Project Links

### 🌐 Live Website

https://cynox-security-blog.vercel.app/

### 🔐 Admin Login

https://cynox-security-blog.vercel.app/admin/login

### 📝 Admin Blog Management

https://cynox-security-blog.vercel.app/admin/blogs

### 💻 GitHub Repository

https://github.com/simranbhadouria/cynox-security-blog

---

# 📌 Project Summary

Cynox Security is a full-stack cybersecurity web application that combines a professional public-facing website with dynamic content management, secure administrator functionality, Oracle Database integration, REST APIs, and an AI-powered chatbot.

The project demonstrates the complete development lifecycle of a modern web application:

```text
Frontend
   ↓
Backend
   ↓
REST APIs
   ↓
Database
   ↓
Authentication
   ↓
AI Integration
   ↓
GitHub
   ↓
Vercel
   ↓
Production
```

The result is a centralized cybersecurity platform where users can explore security information, solutions, resources, datasheets, blogs, and interact with an AI assistant.
