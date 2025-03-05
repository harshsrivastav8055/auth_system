# User Authentication System

## Overview
This is a **user authentication system** built with **Node.js, Express, and MongoDB**. It supports **user registration, login, password reset**, and uses **JWT-based authentication**.

## Features
- User Registration
- User Login
- Password Reset via Email (Nodemailer)
- JWT Authentication
- Input Validation & Error Handling

## Tech Stack
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose)
- **Authentication:** JSON Web Tokens (JWT)
- **Email Service:** Nodemailer

---

## Installation

### 1. Clone the Repository
```sh
git clone https://github.com/yourusername/auth-system.git
cd auth-system
```

### 2. Install Dependencies
```sh
npm install
```

### 3. Create a `.env` File
Create a `.env` file in the project root and add the following:

```ini
# Server Configuration
PORT=5000

# MongoDB Configuration
MONGO_URI=mongodb://localhost:27017/auth-system  # Change for cloud DB

# JWT Secret Key
JWT_SECRET=your-secret-key  # Use a strong random string

# Email Configuration (Nodemailer)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password  # Use an App Password

# Frontend URL (For Password Reset Link)
CLIENT_URL=http://localhost:3000  # Change this if deployed
```

### 4. Start the Server
```sh
npm run dev  # If using nodemon
# OR
node server.js
```

---

## API Endpoints

### 1. **User Registration**
**Endpoint:** `POST /api/auth/register`
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword"
}
```

### 2. **User Login**
**Endpoint:** `POST /api/auth/login`
```json
{
  "email": "john@example.com",
  "password": "securepassword"
}
```
**Response:**
```json
{
  "token": "your-jwt-token"
}
```

### 3. **Forgot Password**
**Endpoint:** `POST /api/auth/forgot-password`
```json
{
  "email": "john@example.com"
}
```
**Response:**
```json
{
  "message": "Reset link sent to email"
}
```

### 4. **Reset Password**
**Endpoint:** `POST /api/auth/reset-password`
```json
{
  "token": "reset-token-received-in-email",
  "newPassword": "newsecurepassword"
}
```

---

## Folder Structure
```
/auth-system
│── controllers
│   ├── authController.js
│── models
│   ├── User.js
│── routes
│   ├── authRoutes.js
│── utils
│   ├── email.js
│── server.js
│── .env
│── package.json
│── README.md
```

---

## Notes
- Ensure **MongoDB is running** before starting the server.
- If using Gmail SMTP, **enable App Passwords**.
- Use **Postman** or `curl` to test the API.

Happy coding! 🚀

