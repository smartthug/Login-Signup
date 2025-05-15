import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import './Database/mongodb.js';
import cors from 'cors';
import { authRouter } from './Router/auth_route.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dotenv.config();
const PORT = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(cors({
  origin: process.env.CLIENT,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS','PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // Replace with your frontend URL
}));

// Serve static files
app.use(express.static(path.join(__dirname, '..', 'login-signup', 'dist')));

// Fallback route for SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'login-signup', 'dist', 'index.html'));
});

app.use("/auth",authRouter);

app.listen(PORT, () => {
  
  console.log(`Server is running on ${PORT}`);

});
