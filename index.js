const express = require ('express');
const app = express();
const connectDB = require('./services/db');

const dotenv = require('dotenv');
dotenv.config();

connectDB();

app.use(express.json({ extended: true }));

const PORT = process.env.SERVER_PORT || 4000

app.use('/api/tests',require('./routes/tests'));
app.use('/api/norms',require('./routes/norms'));
app.use('/api/assessments',require('./routes/assessments'));
app.use('/api/users',require('./routes/users'));
app.use('/api/subjects',require('./routes/subjects'));
app.use('/api/auth',require('./routes/auth'));

app.listen(PORT, () => {
    console.log(`Server escuchando en puerto ${PORT}`)
})

