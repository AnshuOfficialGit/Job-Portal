const express = require('express')
const app = express();
require('dotenv').config()
const apiRoutes = require('./routes/api');
const connectDB = require('./app/database/dbConfig')
const PORT = process.env.PORT || 4000
connectDB();
app.use(express.json());
app.use('/', apiRoutes);
app.listen(PORT, (req, res) => {
    console.log(`INFO  Server running on [http://localhost:${PORT}]`)
})