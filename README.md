# Project Management System

## Overview
This Project Management System is a web application built using **Node.js** and **MySQL**. It enables users to create and manage projects, upload files, send email notifications, and fetch weather information for project locations using an external API.

---

## Features
1. **Authentication**
   - User registration and login using JWT.
   - Passwords hashed with `bcryptjs` for security.

2. **Project CRUD Operations**
   - Create, read, update, and delete projects.
   - Role-based access control (admin-only actions).

3. **File Upload**
   - Securely upload and store files related to projects.

4. **Email Notifications**
   - Send email notifications using `nodemailer`.

5. **External API Integration**
   - Fetch weather information for project locations using a public weather API.

6. **Unit Testing**
   - Comprehensive tests for authentication, project CRUD, file upload, and email notifications.

7. **API Documentation**
   - Clear documentation for all endpoints with examples.

---


API END [POINTS]

app.use("/api/v1/users", userRouter)
app.use("/api/v1/projects", projectRouter)
app.use("/api/v1/files", fileuploadRouterRouter)
app.use("/api/v1/wather", weatherRouter)
