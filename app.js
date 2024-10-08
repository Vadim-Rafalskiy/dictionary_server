const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const authRouter = require('./routes/api/auth-routes');
const wordsRouter = require('./routes/api/words-routes');

const app = express();

const accessLogStream = fs.createWriteStream(
    path.join(__dirname, 'server.log'),
    {
        flags: 'a',
    }
);

const logOptions =
    ':status   :method  :url  [:date]  :res[content-length] byte  :response-time ms';

app.use(morgan(logOptions, { stream: accessLogStream }));
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/words', wordsRouter);

app.use((req, res) => {
    res.status(404).json({ message: 'Not Found' });
});

app.use((err, req, res, next) => {
    const { status = 500, message = 'Serwer error' } = err;
    res.status(status).json({ message });
});

module.exports = app;
