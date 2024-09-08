const mongoose = require('mongoose');

const app = require('./app');

const PORT = 3001;


mongoose
    .connect(DB_HOST)
    .then(() =>
        app.listen(PORT, () => {
            console.log(`server is runing on port ${PORT}`);
        })
    )
    .catch((err) => console.error(err.message));
