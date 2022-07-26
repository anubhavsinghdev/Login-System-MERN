const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const userRoutes = require('./routes/users');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const dbURL = process.env.DB_URL;
mongoose.connect(dbURL)
    .then(() => console.log('DB Connected'))
    .catch((err) => console.log('Cannot connect to DB ', err))

const clientURL = process.env.CLIENT_URL;

app.use(cors({ credentials: true, origin: clientURL }));
app.use(cookieParser());

// routes
app.use('/api/user', userRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`On ${port}!!`));