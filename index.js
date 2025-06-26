/*
To do:
-add created on & modified on date to be viewed
-auto detect port
-add SVG icons
-add comfimation message dialogues box for creation,updation and deletion
*/
import bodyParser from "body-parser";
import express from "express";

const app=express();
const port=3000;

var blog=[];

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    res.render("index.ejs",{blog:blog});
});

app.post("/",(req,res)=>{
    blog.splice(parseInt(req.body.index),1);
    res.redirect("/");
});

app.get("/write",(req,res)=>{
    res.render("write.ejs");
});

app.post("/write",(req,res)=>{
    blog.push({title:req.body.title,content:req.body.content});
    res.redirect("/");
});

app.get("/view",(req,res)=>{
    res.render("view.ejs",{
        blog:blog,
        index:parseInt(req.query.index)
    });
});

app.get("/edit",(req,res)=>{
    res.render("edit.ejs",{
        blog:blog,
        index:parseInt(req.query.index)
    });
});

app.post("/edit",(req,res)=>{
    var index=parseInt(req.body.index);
    blog[index].title=req.body.title;
    blog[index].content=req.body.content;
    res.redirect("/");
})

app.listen(port,()=>{
    console.log(`Listening at ${port}`);
});