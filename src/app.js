const mongoose = require('mongoose');
const app = require('./routes/authorRoutes');

const authorRouter = require('./routes/authorRoutes');

mongoose.connect('mongodb://127.0.0.1:27017/author', {
    useNewUrlParser: true
});
const db= mongoose.connection;

db.once('open', () => {
    console.log('Connected to MongoDB Successfully... ')
});
db.on('error', (error) => {
    console.log(error);
});

return app;