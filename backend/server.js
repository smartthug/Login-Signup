import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import item from './module/usermongoschema.js';
import {authRouter} from './Router/auth_route.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';



dotenv.config();
const port = process.env.PORT || 3000;
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(cors({
  origin: process.env.CLIENT_URL,
}));
app.use('/auth', authRouter);

// Import your database connection
import './Database/mongodb.js';
import { lstat } from 'fs';
// console.log(__dirname)
// console.log(__filename)
// if(process.env.NODE_ENV==='production'){
const filename=fileURLToPath(import.meta.url);
const dirname=path.dirname(filename); 
app.use(express.static(path.join(dirname, '..','login-signup','dist')));
app.get('/', (req, res) => {
  res.sendFile(path.join(dirname,'..', 'login-signup','dist','index.html'));
});
// }8

// app.post('/reg', (req, res) => {
//   item.create(req.body)
//     .then(data => res.status(201).json(data))
//     .catch(err => res.status(500).json({ error: err.message }));
// });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});