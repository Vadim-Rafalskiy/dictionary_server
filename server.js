const mongoose = require('mongoose');

const app = require('./app');

const { BD_HOST_DICTIONARY, PORT = 3001 } = process.env;

mongoose
    .connect(BD_HOST_DICTIONARY)
    .then(() =>
        app.listen(PORT, () => {
            console.log(`Server is runing on port ${PORT}`);
        })
    )
    .catch((err) => console.error(err.message));
