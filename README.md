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

A full-stack web application that helps users manage and track job applications in one place. Users can create, edit, and delete applications, view them in multiple formats, and organize progress through a Kanban-style workflow.

The application is built with a React + Vite frontend and a Node.js + Express + MongoDB backend with secure authentication.

---

## Features

- User authentication (register, login, logout)
- JWT-based authentication stored in HttpOnly cookies
- Create, edit, and delete job applications
- Track applications by status:
  - Applied
  - Interviewing
  - Offer
  - Rejected
- Dashboard statistics summary
- Multiple dashboard views:
  - Card view
  - Table view
  - Kanban board view with drag-and-drop support
- View and edit full application details in a modal
- Support for follow-up dates, notes, and job links
- Daily email reminder system for follow-up dates

---

## Tech Stack

### Frontend
- React (Vite)
- React Router
- Tailwind CSS
- GSAP
- Axios
- Dnd-Kit

### Backend
- Node.js
- Express
- MongoDB
- Mongoose
- JSON Web Tokens (JWT)
- bcrypt
- cookie-parser
- helmet
- express-rate-limit
- nodemailer
- node-cron

---

## Authentication

Authentication is handled using JWT tokens stored in HttpOnly cookies for improved security. Protected routes are enforced through backend middleware and frontend route guards.

---

## Reminder System

A scheduled cron job runs daily to check applications with follow-up dates and sends reminder emails. Applications are marked after reminders are sent to prevent duplicate notifications.
