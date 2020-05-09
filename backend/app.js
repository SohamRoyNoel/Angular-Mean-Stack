const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const postSchema = require('./models/post');
 
const app = express();
app.use(bodyParser.json());
mongoose.connect("mongodb+srv://Candy:Lx1IR9m8zQKiaDrQ@cluster0-alah9.mongodb.net/node-angular?retryWrites=true&w=majority")
.then(() => {
  console.log('Connected to database');
}).catch(() => {
  console.log('Connection Failed');
});
// parsing json data on POST request

//Lx1IR9m8zQKiaDrQ -- Candy


app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, DELETE, OPTIONS"
    );
    next();
  });

  app.post("/api/posts", (req, res, next)=>{
    const post = new postSchema({
      title : req.body.title,
    content : req.body.content
     });

     // when 1 post added we get an null pointer exception if we dont update the ID on localhost
    post.save().then(savedValue => {
      res.status(201).json({
          message : 'Posts Successfully',
          postId : savedValue.id
      })
    });

    
});

app.get('/api/posts',(req, res, next) => {
    postSchema.find().then((documents) => {
      res.status(200).json({
        message : 'Posts Successfully',
        posts: documents
    })
    });
    
});

app.delete('/api/delete/:id', (req, res, next) => {

    postSchema.deleteOne({_id:req.params.id}).then(() => {console.log("deleted from db")}); 
    console.log(req.params.id);
    res.status(200).json({message: "Deleted"});

});

module.exports = app;
