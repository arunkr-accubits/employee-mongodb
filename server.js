const express = require('express');
const authorRouter = require('./src/routes/authorRoutes');
const app=express();
const db = require('./src/app');

app.use(express.json());
app.use(express.urlencoded( { extended: true } ));

app.use('/api',authorRouter);
app.listen(3000, () => { 
    console.log('Express Server is listening on port: 3000');
});
