const express = require(`express`)
const cors = require(`cors`) 
const mongoose = require(`mongoose`)
var ObjId = require('mongoose').mongo.BSON.ObjectId;
const Blog = require('./blogModel')
const app = express()

app.use(cors())
app.use(express.json())
const port =3001

mongoose.connect('mongodb+srv://tejassatish:mernstack@cluster0.zh6szkp.mongodb.net/blog_app?retryWrites=true&w=majority',{useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
    console.log("connected to mongodb atlas")
    app.listen(port,()=>{
        console.log(`Node server is running on port ${port}`)
    })        
})
.catch((e)=>{
    console.error(e)
})


app.post(`/blogs/post`,async (req,res)=>{
    try{
        const blog = await Blog.create(req.body)
        return res.status(200).json(blog)
    }catch(err){
        console.log(err)
    }
})

app.get(`/blogs/get`, async (req,res)=>{
    try{
        const blogs=await Blog.find({})
        res.json(blogs)
    }catch(e){
        console.error(e) 
        console.log(typeof(db))
    }
})



app.delete(`/blogs/del/:id`, async (req,res)=>{
    try{
        //let id= new mongoose.mongo.BSON.ObjectId(req.body)
        //const blogs = await Blog.findByIdAndDelete(req.body.id)
        console.log(req.params)
        let {id}= req.params
        const blog= await Blog.findByIdAndDelete(id)
        if(!blog){
            return res.status(404).json({"error": "no such id"})
        }

        return res.status(200).json({"success":"true"})
    }catch(err){
        console.log(err)
    }
})

app.put(`/blogs/put/:id`, async (req,res)=>{
    try{
        console.log(req.params)
        let {id}= req.params
        const blog= await Blog.findByIdAndUpdate(id,req.body)
        if(!blog){
            return res.status(404).json({"error": "no such id"})
        }
        return res.status(200).json(blog)
    }catch(err){
        console.log(err)
    }
})

app.get(`/blogs/get/:id`, async (req,res)=>{
    try{
        let {id}=req.params
        console.log(id)
        const blog=await Blog.findById(id)
        res.json(blog)
        if(!blog){
            return res.status(504).json({"error": "timeout"})
        }
        res.json(blog)
    }catch(e){
        console.error(e) 
        console.log(typeof(db))
    }
})

