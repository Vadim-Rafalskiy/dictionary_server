const mongoose = require('mongoose');

const app = require('./app');

const PORT = 3001;

const { BD_HOST_DICTIONARY } = process.env;

mongoose
    .connect(BD_HOST_DICTIONARY)
    .then(() =>
        app.listen(PORT, () => {
            console.log(`Server is runing on port ${PORT}`);
        })
    )
    .catch((err) => console.error(err.message));
