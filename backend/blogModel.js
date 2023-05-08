const mongoose = require(`mongoose`)

const blogSchema =mongoose.Schema(
    {
        postName:{
            type: String,
            required: [true, "Please enter blog name"]
        },
        authorName:{
            type: String,
            required: [true, "Please enter author name"]
        },
        text:{
            type: String,
            required: true,
        },
        image:{
            type: String,
            required: false,
        },
    },
    {
        timestamps: true
    }
)
const Blog=mongoose.model('Blog', blogSchema)

module.exports=Blog