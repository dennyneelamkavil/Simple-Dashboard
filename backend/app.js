const express = require('express');
const app = express();
const logger = require('morgan');
const cors = require('cors');
require('dotenv').config();
require('./db');
const routes = require('./routes');
const PORT = process.env.PORT || 4528;

app.use(cors({
    origin: '*',
}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/',routes)

app.all('*', (req, res) => {
    res.status(404).send({ message: 'Route not found' });
})


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    });