const express = require('express');
const errorHandler = require('./middleware/errorHandler');
const connectDb = require('./config/dbConnection');
const app = express();
const dotenv = require('dotenv').config();

const port = process.env.PORT || 8000;

// middleware --> app.use()
connectDb();
app.use(express.json());
app.use('/api/contacts', require('./routes/contactRoute'));
app.use('/api/users', require('./routes/userRoute'));
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server running on port ${port}...`);
});