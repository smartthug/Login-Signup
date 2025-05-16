# 🔐 Login-Signup Authentication System

A secure and modern full-stack authentication system built with **React.js**, **Node.js**, **Express.js**, and **MongoDB**. This project includes OTP-based signup, JWT-based login, and password reset functionality.

---

## 📌 Features

- ✅ **User Registration with OTP Verification**
- 🔒 **Secure Login using JWT Tokens**
- 🔁 **Password Reset via Email and Token**
- 🌐 **SPA (Single Page Application) served via Express**
- 📦 RESTful APIs using Express

---

## 🛠️ Tech Stack

**Frontend**  
- React.js  
- Tailwind CSS  

**Backend**  
- Node.js  
- Express.js  
- MongoDB (Mongoose)  
- JSON Web Tokens (JWT)  
- Nodemailer for email services  

---

## 📂 Folder Structure

/client # React Frontend
/server # Node.js Backend
README.md

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/login-signup-auth.git
cd login-signup-auth
cd server
```
### 2. Start the Backend

```
npm install
# Add your .env file (see below)
npm run dev
```
### Create a .env file in /server with the following:
```
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
```
### 3. Start the Frontend
```
cd ../client
npm install
npm run dev
```
##🔑 API Routes (Backend)
POST /api/signup → User registration + OTP

POST /api/verify → OTP verification

POST /api/login → Login with JWT

POST /api/forgot-password → Request password reset

POST /api/reset-password → Reset password via token

📸 Screenshots
![WhatsApp Image 2025-05-15 at 19 08 04_3687422e](https://github.com/user-attachments/assets/1db72227-1c24-4a08-8231-e2d3c9a8f5ce)

📬 Contact
If you like this project or have suggestions, feel free to connect:

LinkedIn: https://www.linkedin.com/in/rahuldeva5

Email: rahuldeva5555@gmail.com
