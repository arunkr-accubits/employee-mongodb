const express = require('express');
const authorModel = require('../model/author');
const app = express();

//GET REQUEST
app.get("/authors", async(req,res)=>{
    const author = await authorModel.find({});

    try{
        res.send(author);
    } catch (error){
        res.status(500).send(error);
    }
});



//POST REQUEST
app.post("/authors", async(req,res)=>{
    const author = new authorModel(req.body);

    try{
        await author.save();
        res.send(author);
    } catch(error){
        res.status(500).send(error);
    }
});


//PATCH REQUEST
app.patch("/authors/:id", async(req, res)=>{
    try{
        await authorModel.findByIdAndUpdate(req.params.id, req.body);
        await authorModel.save();
        res.send(author);
    } catch (error){
        res.status(500).send(error);
    }
});

//DELETE REQUEST
app.delete("/authors/:id", async(req, res)=>{
    try{
        const author = await authorModel.findByIdAndDelete(req.params.id);
        if(!author) res.status(404).send("No author exists");
        res.status(200).send();
    } catch(error){
        res.status(500).send(error);
    }
});



module.exports = app;
