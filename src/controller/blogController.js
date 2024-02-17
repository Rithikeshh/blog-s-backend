const Blog = require('../models/blogModel')
const Comment = require('../models/commentModel')
const User = require('../models/userModel')

const createBlog = async (req, res) =>{
    const {title, description, tags, images} = req.body

    try {
        const user = await User.findById(req.userId);
        const blog = await Blog.create({
            title, description, tags, images,
            user: req.userId,
            author: user.username
        })
        await User.findByIdAndUpdate(req.userId, {
            $push : {blogs: blog._id}
        })
        return res.status(200).json({
            status: "success",
            data:blog
        })
    } catch (error) {
        return res.status(500).json({
            status: "failed",
            message: error.message
        })
    }
    
}
const getBlogs = async (req, res) =>{
    
    try {
        const allBlogs = await Blog.find();
        // select only title, author, images, tags
        // const allBlogs = await Blog.find().select({
        //     author: 1,
        //     images: 1,
        //     tags: 1,
        //     title: 1
        // });
        return res.status(200).json({
            status: "success",
            data: allBlogs
        })
    } catch (error) {
        return res.status(500).json({
            status: "failed",
            message: error.message
        })
    }
}

const updateBlog = async (req, res) => {

    const { blogId } = req.params;
    const { userId } = req;

    try {
        const  blog = await Blog.findById(blogId);
        const isOwner = blog.user.equals(userId);
        
        if (isOwner) {
            const updatedBlog = await Blog.findByIdAndUpdate(blogId, { $set: req.body }, {new: true});
            return res.status(200).json({
                status: "success",
                data: updatedBlog
            })
        }
        else{
            return res.status(400).json({
                status: "failed",
                message: "you are not authorized to update this blog"
            })
        }
    } catch (error) {
        return res.status(500).json({
            status: "failed",
            message: error.message
        })
    }
}

const deleteBlog = async (req, res) => {
    const { blogId } = req.params;
    const { userId } = req;

    try {
        const  blog = await Blog.findById(blogId);
        const isOwner = blog.user.equals(userId);
        
        if (isOwner) {
            const deletedBlog = await Blog.findByIdAndDelete(blogId);
            await Comment.deleteMany({blog : blogId});
            await User.findByIdAndUpdate(userId, {
                $pull : {blogs: blog._id}
            })
            return res.status(200).json({
                status: "success",
                data: deletedBlog
            })
        }
        else{
            return res.status(400).json({
                status: "failed",
                message: "you are not authorized to update this blog"
            })
        }
    } catch (error) {
        return res.status(500).json({
            status: "failed",
            message: error.message
        })
    }
}

const addVote = async (req, res) => {
    const {blogId} = req.params;
    const {userId} = req;
    const {voteType} = req.query;

    try {
        let blog;
        // check if the vote already exists for a user on this blog
        const check = await Blog.findById(blogId).select({
            votedBy: 1
        })
        
        if(check.votedBy.includes(userId)){
            return res.status(500).json({
                status: "failed",
                message:  'User has already cast their vote'
            })
        }
        if(voteType === "upVote"){

            blog = await Blog.findByIdAndUpdate(blogId, {
                $push : {votedBy: userId},
                $inc : {upVote : 1}
            }, {new : true})
        }
        else{
            blog = await Blog.findByIdAndUpdate(blogId, {
                $push : {votedBy: userId},
                $inc : {downVote : 1}
            }, {new : true})
        }
        return res.status(200).json({
            status: "success",
            data: blog
        })
    } catch (error) {
        return res.status(500).json({
            status: "failed",
            message: error.message
        })
    }
}

const addComments = async (req, res) =>{
    const { blogId } = req.params;
    const {content} = req.body

    try {
        const comment = await Comment.create({
            content,
            blog: blogId,
            user: req.userId,
        })
        await Blog.findByIdAndUpdate(blogId, {
            $push:{comments:comment._id}
        })
        return res.status(200).json({
            status: "success",
            data: comment
        })

    } catch (error) {
        return res.status(500).json({
            status: "failed",
            message: error.message
        })
    }
}

const getComments = async (req, res) =>{
    const { blogId } = req.params;

    try {
        const allComments = await Comment.find({blog: blogId}).populate({
            path: "user",
            model: "users",
            select: {
                username: 1
            }
        })
        // two way of doing samething

        // const allComments = await Blog.findById(blogId).populate({
        //     path: "comments",
        //     model: "comments",
        //     populate : {
        //         path:"user" ,
        //         model: "users",
        //         select: {
        //             username: 1
        //         }
        //     },
        // }).select({
        //     comments: 1
        // })
        return res.status(200).json({
            status: "success",
            data: allComments
        })

    } catch (error) {
        return res.status(500).json({
            status: "failed",
            message: error.message
        })
    }
}

module.exports = {createBlog, getBlogs, addComments, getComments, updateBlog, deleteBlog, addVote}