const express = require('express');

const db = require('./server.js');
const authorRouter = require('./src/routes/authorRoutes');
const app = express();

app.use(express.json());
app.use(express.urlencoded( { extended: true } ));

app.use('/api',authorRouter);
app.listen(3000, function() { console.log('listening on 3000') });


















//  app.get('/',(req,res)=>{
//     res.send('Hello World')
//      res.sendFile(__dirname + '/index.html')
//  });

//  app.post('/author',(req,res)=>{
//     console.log(req.body)
//  });