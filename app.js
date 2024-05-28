const express = require('express');
const app = express();
require('dotenv').config();
const logger = require('./src/helpers/logger');
const { notFound, errorStack } = require('./src/middlewares/errorHandlers');
const { PrismaClient } = require('@prisma/client'); 
const prisma = new PrismaClient();
const router = require('./src/routes');
const path = require('path');
const cors = require('cors');


const port = process.env.PORT || '3000';
const host = process.env.HOST || '0.0.0.0';


app.listen(port);
logger('info', 'Server', `Server is listening on: http://${host}:${port}`);

async function connectToDatabase() {
    try {
      await prisma.$connect();
      console.log('Connected to the database');
    } catch (error) {
      console.error('Error connecting to the database:', error);
    }
  }
  
  // Middleware untuk menghubungkan ke database
  app.use(async (req, res, next) => {
    if (!prisma.$isConnected) {
      await connectToDatabase();
    }
    next();
  });
app.use(cors())
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



app.get('/', (req, res) => {
    res.json('welcome to api v1');
})

app.use('/', router)
app.use(notFound);
app.use(errorStack);