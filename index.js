const express = require ('express');
const app = express();
const connectDB = require('./services/db');

const dotenv = require('dotenv');
dotenv.config();

connectDB();

app.use(express.json({ extended: true }));

const PORT = process.env.SERVER_PORT || 4100

app.listen(PORT, () => {
    console.log(`Server escuchando en puerto ${PORT}`)
})

