const express = require('express')
const mongoose = require('mongoose')
const app = express();
require('dotenv').config();
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.CONNECTION_STRING, {
     
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
  }
};
module.exports = connectDB;