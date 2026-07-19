<div align="center">

# Startup CRM Lite 🚀

**A modern, lightweight Customer Relationship Management (CRM) platform designed specifically for startups, small businesses, and solopreneurs to manage leads, track conversions, and analyze sales performance.**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-%3E%3D%2018.0.0-brightgreen.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-19.2.6-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-8.0.12-purple.svg)](https://vitejs.dev/)
[![Express](https://img.shields.io/badge/Express-5.2.1-lightgrey.svg)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-green.svg)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.3.1-38B2AC.svg)](https://tailwindcss.com/)

</div>

---

## 📑 Table of Contents

1. [Project Overview](#-project-overview)
2. [Problem Statement & Vision](#-problem-statement--vision)
3. [Key Features](#-key-features)
4. [Target Users & Use Cases](#-target-users--use-cases)
5. [High-Level Architecture](#-high-level-architecture)
6. [Technology Stack](#-technology-stack)
7. [Project Folder Structure](#-project-folder-structure)
8. [Backend Architecture & API](#-backend-architecture--api)
9. [Frontend Architecture](#-frontend-architecture)
10. [Database Architecture](#-database-architecture)
11. [Security Considerations](#-security-considerations)
12. [Development Prerequisites](#-development-prerequisites)
13. [Installation & Setup](#-installation--setup)
14. [Environment Variables](#-environment-variables)
15. [Running the Application](#-running-the-application)
16. [Deployment & CI/CD](#-deployment--cicd)
17. [Coding Standards](#-coding-standards)
18. [Contribution Guidelines](#-contribution-guidelines)
19. [License](#-license)

---

## 🎯 Project Overview

**Startup CRM Lite** is a streamlined, full-stack CRM solution providing essential tools for managing customer relationships without the bloat of enterprise systems. Built with the powerful MERN stack (MongoDB, Express.js, React, Node.js) alongside Vite and Tailwind CSS, it offers a blazing fast, secure, and intuitive user experience. 

The application facilitates seamless lead tracking, insightful analytics, and secure user management—all out of the box.

---

## 💡 Problem Statement & Vision

**Problem:** Most existing CRM platforms are overly complex, expensive, and bloated with features that early-stage startups and independent professionals rarely use. They require extensive onboarding and slow down the sales process rather than accelerating it.

**Vision:** To provide a hyper-efficient, easy-to-use, and highly secure CRM system focused strictly on the core fundamentals of sales pipeline management: Lead Generation, Tracking, and Analytics. 

---

## ✨ Key Features

- **Lead Management:** Create, read, update, and delete (CRUD) leads effortlessly.
- **Sales Analytics:** Visual dashboards leveraging Recharts to monitor lead statuses, conversion rates, and growth over time.
- **Secure Authentication:** JWT-based user authentication, password hashing with bcrypt, and protected routing.
- **Modern UI/UX:** Responsive, beautiful interface designed with Tailwind CSS and Lucide React icons.
- **API Security:** Enterprise-grade backend security featuring Helmet, Express Rate Limiter, and CORS configuration.
- **High Performance:** Vite-powered frontend for instant HMR and optimized production builds.

---

## 👥 Target Users & Use Cases

- **Early-Stage Startups:** Tracking initial customer outreach and early adopters.
- **Freelancers & Consultants:** Managing client pipelines and project leads.
- **Small Sales Teams:** Needing a collaborative, central repository for prospect data without a steep learning curve.

---

## 🏗 High-Level Architecture

Startup CRM Lite follows a decoupled client-server architecture:

1. **Client Tier (Frontend):** A React Single Page Application (SPA) built with Vite. It handles routing (React Router), state management, and UI rendering. Communicates with the backend via RESTful API calls using Axios.
2. **Application Tier (Backend):** A Node.js/Express REST API serving as the business logic and integration layer. It provides endpoints for authentication, lead management, and data aggregation.
3. **Data Tier (Database):** A MongoDB database (typically hosted on MongoDB Atlas) accessed via Mongoose ODM for structured schema validation and data persistence.

---

## 💻 Technology Stack

### Frontend
- **Framework:** React 19
- **Build Tool:** Vite 8
- **Styling:** Tailwind CSS 4
- **Routing:** React Router DOM 7
- **HTTP Client:** Axios
- **Icons:** Lucide React
- **Data Visualization:** Recharts
- **Notifications:** React Hot Toast

### Backend
- **Runtime:** Node.js (v18+)
- **Framework:** Express.js 5
- **Database:** MongoDB & Mongoose 9
- **Authentication:** JSON Web Tokens (JWT) & bcryptjs
- **Security:** Helmet, express-rate-limit, CORS, express-mongo-sanitize
- **Logging:** Morgan

---

## 📂 Project Folder Structure

```text
startup-crm-lite/
├── Backend/                    # Node.js Express Backend
│   ├── config/                 # Database & environment configurations
│   ├── controllers/            # Request handlers (Auth, Leads)
│   ├── middleware/             # Custom middleware (Auth guarding, Error handling)
│   ├── models/                 # Mongoose database schemas (User, Lead)
│   ├── routes/                 # API route definitions
│   ├── utils/                  # Helper functions and utilities
│   ├── .env                    # Backend environment variables
│   ├── package.json            # Backend dependencies
│   └── server.js               # Main Express application entry point
├── src/                        # React Frontend Source
│   ├── assets/                 # Static assets (images, logos)
│   ├── components/             # Reusable UI components (Navbar, Sidebar, Buttons)
│   ├── context/                # React Context for global state (AuthContext)
│   ├── hooks/                  # Custom React hooks
│   ├── pages/                  # Route-level components (Dashboard, Leads, Login, Analytics)
│   ├── routes/                 # Application routing logic (Protected routes)
│   ├── services/               # API service integrations (Axios wrappers)
│   ├── utils/                  # Frontend utilities and formatters
│   ├── App.jsx                 # Root React component
│   ├── main.jsx                # React DOM rendering entry
│   └── index.css               # Global Tailwind CSS directives
├── .env                        # Frontend environment variables
├── package.json                # Root package.json (concurrently scripts)
└── vite.config.js              # Vite configuration
```

---

## ⚙️ Backend Architecture & API

The backend is structured using the **MVC (Model-View-Controller)** pattern (excluding Views, as this is a REST API).

- **Controllers:** House the core business logic.
- **Middleware:** Intercepts requests for authentication (`protect` middleware), rate limiting, and global error handling (`errorHandler.js`).
- **Models:** Define the data structure and validation rules using Mongoose.

### Key API Endpoints

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Register a new user | No |
| `POST` | `/api/auth/login` | Authenticate user & return JWT | No |
| `GET` | `/api/leads` | Retrieve all leads for the user | Yes |
| `POST` | `/api/leads` | Create a new lead | Yes |
| `PUT` | `/api/leads/:id` | Update an existing lead | Yes |
| `DELETE` | `/api/leads/:id` | Remove a lead | Yes |
| `GET` | `/api/health` | System health check | No |

---

## 🎨 Frontend Architecture

The React application is modularized for scalability:

- **Pages:** Top-level views mapping directly to routes (e.g., `/dashboard` -> `Dashboard.jsx`, `/analytics` -> `Analytics.jsx`).
- **Context API:** Handles global state, specifically user authentication (`AuthContext`), minimizing prop-drilling.
- **Services:** All external API calls are centralized in the `services/` directory using Axios interceptors to automatically attach JWT tokens to requests.
- **Protected Routes:** React Router is wrapped with an authentication guard that redirects unauthenticated users to the `/login` page.

---

## 🗄️ Database Architecture

We utilize MongoDB, a NoSQL document database, ideal for the flexible nature of CRM data.

### 1. User Schema (`User.js`)
- **Fields:** `name`, `email`, `password` (hashed).
- **Hooks:** Pre-save middleware to hash passwords before storing them.

### 2. Lead Schema (`Lead.js`)
- **Fields:** `firstName`, `lastName`, `email`, `company`, `status` (New, Contacted, Qualified, Lost, Won), `user` (Reference to User ID).
- **Relationships:** Every lead is strictly bound to the User who created it, ensuring complete data isolation between accounts in a multi-tenant setup.

---

## 🛡️ Security Considerations

Security is treated as a first-class citizen in this project:

1. **Password Protection:** Passwords are never stored in plain text. They are hashed using `bcryptjs` with a secure salt round.
2. **Stateless Authentication:** JWTs are used for authentication. Tokens expire (`7d`) to limit risk.
3. **HTTP Headers:** `helmet` is used to secure Express apps by setting various HTTP headers (XSS protection, sniffing prevention).
4. **Rate Limiting:** Global rate limit applies to the entire API, with strict rate limits on `/api/auth` endpoints to prevent brute-force attacks.
5. **CORS:** Cross-Origin Resource Sharing is strictly configured to allow requests only from trusted frontend domains.

---

## 📋 Development Prerequisites

Before setting up the project, ensure you have the following installed:

- **Node.js** (v18.0.0 or higher)
- **npm** (v9.0.0 or higher) or **yarn**
- **Git**
- A **MongoDB** instance (Local or MongoDB Atlas)

---

## 🚀 Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/startup-crm-lite.git
   cd startup-crm-lite
   ```

2. **Install Root Dependencies:**
   *(Installs tooling like `concurrently` to run both servers at once)*
   ```bash
   npm install
   ```

3. **Install Backend Dependencies:**
   ```bash
   cd Backend
   npm install
   cd ..
   ```

---

## 🔐 Environment Variables

You must configure environment variables for both the backend and the frontend. 

### Backend (`Backend/.env`)
Create a `.env` file inside the `Backend/` directory:
```env
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/startup-crm-lite?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRES_IN=7d
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

### Frontend (`src/.env` or root `.env`)
Create a `.env` file in the root directory (for Vite):
```env
VITE_API_URL=http://localhost:5000/api
```

---

## 🏃 Running the Application

### Development Mode

The project utilizes `concurrently` to run both the Vite frontend and Express backend with a single command from the root directory:

```bash
npm run dev
```
- Frontend will be available at: `http://localhost:5173`
- Backend API will be running on: `http://localhost:5000`

### Production Mode

To build the frontend for production:
```bash
npm run build
```
*(This generates optimized static files in the `/dist` directory).*

---

## 🚢 Deployment & CI/CD

### Backend Deployment (Render / Heroku)
1. Set the Node environment to production.
2. Ensure environment variables (`MONGODB_URI`, `JWT_SECRET`, `FRONTEND_URL`) are securely added to the deployment platform.
3. Start command: `node server.js`

### Frontend Deployment (Vercel / Netlify)
1. Connect the repository to your hosting provider.
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Add `VITE_API_URL` pointing to your deployed backend URL.

---

## 📝 Coding Standards

- **ESLint & Prettier:** Standardized formatting and linting.
- **Component Structure:** Functional components with React Hooks.
- **Naming Conventions:** 
  - `PascalCase` for React components.
  - `camelCase` for variables and functions.
- **API Responses:** Standardized JSON response format `{ success: boolean, data/message: any }`.

---

## 🤝 Contribution Guidelines

We welcome contributions from the open-source community!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<div align="center">
  <b>Built with ❤️ for Startups and Independent Professionals</b>
</div>
