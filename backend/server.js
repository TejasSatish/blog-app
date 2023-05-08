const express = require(`express`)
const cors = require(`cors`) 
const mongoose = require(`mongoose`)
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


app.post(`/blogs`,async (req,res)=>{
    try{
        const blog = await Blog.create(req.body)
        res.status(200).json(blog)
    }catch(err){
        console.log(err)
    }
})

app.get(`/blogs`, async (req,res)=>{
    try{
        const blogs=await Blog.find({})
        res.json(blogs)
    }catch(e){
        console.error(e) 
        console.log(typeof(db))
    }
})

