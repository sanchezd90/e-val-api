const express = require ('express');
const cors = require("cors");
const app = express();
const connectDB = require('./services/db');

const dotenv = require('dotenv');
dotenv.config();

connectDB();

const corsOptions ={
    origin:'*', 
    credentials:true,           
    optionSuccessStatus:200,
 }

app.use(cors(corsOptions))

app.use(express.json({ extended: true }));

const PORT = process.env.PORT || 5000
const HOST = process.env.HOST || '0.0.0.0'

app.use('/api/tests',require('./routes/tests'));
app.use('/api/norms',require('./routes/norms'));
app.use('/api/assessments',require('./routes/assessments'));
app.use('/api/users',require('./routes/users'));
app.use('/api/subjects',require('./routes/subjects'));
app.use('/api/auth',require('./routes/auth'));

app.listen(PORT, HOST, () => {
    console.log(`Server escuchando en puerto ${PORT}`)
})

