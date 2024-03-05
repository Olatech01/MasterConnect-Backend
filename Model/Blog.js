const mongoose = require('mongoose')
const {Schema, model} = mongoose


const techCorpSchema = new Schema({
    blogTitle: {
        type:String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: String
    }
})

const BlogModel = mongoose.model("task", techCorpSchema)
module.exports = BlogModel