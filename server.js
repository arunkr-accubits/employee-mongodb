const mongoose = require('mongoose');
const app = require('./app');
const url ='mongodb://127.0.0.1:27017/author'
mongoose.connect(url, {
    useNewUrlParser: true
})
.then( () => {
    console.log("Connected to MongoDB",url )
})
.catch(error => {
    console.log(error)
});

const db= mongoose.connection
module.export = db;
