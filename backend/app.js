const express = require('express');
const bodyParser = require('body-parser');

const app = express();
// parsing json data on POST request
app.use(bodyParser.json());



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
    const post = req.body;
    console.log(post);
    res.status(201).json({
        message : 'Posts Successfully',
    })
});

app.get('/api/posts',(req, res, next) => {
    const posts = [
        {id: "vcgvc651654", title : "Cats are cute", content: "Cats are fatty"},
        {id: "vcgvc651655", title : "Dogs are cute", content: "Dogs are not fatty"},
    ];
    res.status(200).json({
        message : 'Posts Successfully',
        posts: posts
    })
});

module.exports = app;
