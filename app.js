const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');

const wordsRouter = require('./routes/api/words-api');

const app = express();

const accessLogStream = fs.createWriteStream(
    path.join(__dirname, 'server.log'),
    {
        flags: 'a',
    }
);

const logOptins =
    ':status   :method  :url  [:date]  :res[content-length] byte  :response-time ms';

app.use(morgan(logOptins, { stream: accessLogStream }));

app.use(cors());
app.use(express.json());

app.use('/api/words', wordsRouter);

app.use((req, res) => {
    res.status(404).json({ message: 'Not Found' });
});

app.use((err, req, res, next) => {
    const { status = 500, message = 'Serwer error' } = err;
    res.status(status).json({ message });
});

module.exports = app;
