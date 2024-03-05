const BlogModel = require("../Model/Blog");



const createBlog = async(req, res) =>{
    const{blogTitle, content, author} = req.body

    try {
        const newBlog = new BlogModel({blogTitle, content, author});
        const savedWord = newBlog.save();
        return res.status(201).json({msg: "New Blog Successfully Created!!", newBlog})
    } catch (error) {
        console.error (error)
        return res.status(500).json({error: "Server error"})
    }
}

const findAllBlogs = async(req, res) =>{
    try {
        const findAllBlog = await BlogModel.find()
        res.json(findAllBlog)
    } catch (error) {
        console.error(error)
        return res.status(500).json({error: "Server error"})
    }
}


const findSingleBlog = async(req, res) =>{
    try {
        const blogId = req.params.blogId
        const blog =await BlogModel.findById(blogId)

        if(!blog){
            return res.status(404).json({error: "Blog Not Found"})
        }
    } catch (error) {
        console.error(error)
        return res.status(500).json({error: "Server error"})
    }
}





const updateBlog = async(req, res) => {
    try {
        const blogId = req.params['id']
        const {blogTitle, content, author} = req.body;

        const updateBlog = await BlogModel.findOneAndUpdate(
            {_id: blogId}, req.body,
            {new:true, runValidators:true}
        )

        if(!updateBlog){
            return res.status(404).json({error:"Task not found!!"})
        }
        res.json(updateBlog)
    } catch (error) {
        console.error(error)
        res.status(500).json({error: "Server error"})
    }
}

const deleteBlog = async(req, res) =>{
    const _id = req.params("id")
    const sameId = await BlogModel.findById(_id);

    if(sameId){
        await BlogModel.findOneAndDelete(_id);
        return res.json({msg: "Blog deleted successfully!!"})
    }
    res.json({error: "Server error"})
}

module.exports = {
    createBlog,
    findAllBlogs,
    findSingleBlog,
    updateBlog,
    deleteBlog
}