# Job Application Tracker

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-20232A?style=for-the-badge&logo=vite)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-20232A?style=for-the-badge&logo=tailwindcss)
![Node.js](https://img.shields.io/badge/Node.js-20232A?style=for-the-badge&logo=node.js)
![Express](https://img.shields.io/badge/Express-20232A?style=for-the-badge&logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-20232A?style=for-the-badge&logo=mongodb)
![Mongoose](https://img.shields.io/badge/Mongoose-20232A?style=for-the-badge&logo=mongoose)
![JWT](https://img.shields.io/badge/JWT-20232A?style=for-the-badge&logo=jsonwebtokens)
![Axios](https://img.shields.io/badge/Axios-20232A?style=for-the-badge&logo=axios)
![GSAP](https://img.shields.io/badge/GSAP-20232A?style=for-the-badge&logo=greensock)
![DndKit](https://img.shields.io/badge/Dnd--Kit-20232A?style=for-the-badge&logo=draganddrop)
![Nodemailer](https://img.shields.io/badge/Nodemailer-20232A?style=for-the-badge&logo=gmail)

A full-stack job application tracking platform built with a **React + Vite** frontend and a **Node.js + Express + MongoDB** backend. Helps users organize their entire job search in one place — create, edit, and track applications across a Kanban board, card grid, or table, with automated email reminders for follow-up dates.

---

## Features

### Authentication
- Secure registration and login with **bcrypt** password hashing
- **JWT** tokens stored in **HttpOnly cookies** — inaccessible to JavaScript, protecting against XSS attacks
- Protected API routes enforced by Express middleware with resource-level ownership checks
- Rate limiting on auth endpoints (20 requests / 15 min) to prevent brute-force attacks

### Application Management
- Full **CRUD** for job applications — create, view, edit, and delete
- Track applications across 4 statuses: **Applied**, **Interviewing**, **Offer**, **Rejected**
- Store follow-up dates, notes, and direct job posting links per application

### Dashboard Views
- **Card View** — responsive grid layout with status-colored pills and quick actions
- **Table View** — compact tabular layout for scanning many applications at once
- **Kanban View** — drag-and-drop board with **optimistic UI updates** (status reflects instantly before the server responds)
- Live status filter to narrow any view down to a specific stage

### Automated Reminders
- Daily **cron job** checks for applications with due follow-up dates
- Sends personalized reminder emails via **Nodemailer** + Gmail SMTP
- `reminderSent` flag in MongoDB guarantees exactly-once delivery per application

### UI & Experience
- **GSAP** timeline animations on auth pages and modal open/close transitions
- Fully responsive layout across mobile and desktop
- Animated details modal with view and edit modes for every application field

---

## Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React 19 + Vite | SPA framework and dev/build tooling |
| React Router DOM 7 | Client-side routing and route guards |
| Tailwind CSS 4 | Utility-first styling |
| Axios | HTTP client with automatic cookie handling |
| GSAP + @gsap/react | Entrance and transition animations |
| @dnd-kit | Accessible drag-and-drop for the Kanban board |

### Backend
| Technology | Purpose |
|---|---|
| Node.js + Express 5 | REST API server |
| MongoDB + Mongoose | Database and ODM |
| jsonwebtoken + bcrypt | JWT signing and password hashing |
| Helmet + CORS + express-rate-limit | Security hardening |
| cookie-parser | HttpOnly cookie handling |
| node-cron | Scheduled daily reminder job |
| Nodemailer | Transactional email via Gmail SMTP |

---

## Getting Started

### Prerequisites
- Node.js 18+
- A [MongoDB Atlas](https://www.mongodb.com/atlas) cluster (or local MongoDB instance)
- A Gmail account with an [App Password](https://support.google.com/accounts/answer/185833) enabled

### 1. Clone the repository

```bash
git clone https://github.com/LuisHuerta4/Job-Tracker.git
cd Job-Tracker
```

### 2. Configure the backend

```bash
cd server
npm install
```

Create a `.env` file in the `server/` directory:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_strong_random_secret
EMAIL_USER=your_gmail_address@gmail.com
EMAIL_PASS=your_gmail_app_password
CORS_ORIGIN=http://localhost:5173
PORT=5000
NODE_ENV=development
```

Start the backend:

```bash
npm run dev
```

### 3. Configure the frontend

```bash
cd ../client
npm install
```

Create a `.env` file in the `client/` directory:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## Screens

### Login
<img src="client\public\Login.png" width="auto" height="500">

### Create, View, Edit
<img src="client\public\Create-view-edit.png" width="auto" height="500">

### Cards
<img src="client\public\Dashboard-card.png" width="auto" height="500">

### Table
<img src="client\public\Dashboard-table.png" width="auto" height="500">

### Kanban
<img src="client\public\Dashboard-kanban.png" width="auto" height="500">
