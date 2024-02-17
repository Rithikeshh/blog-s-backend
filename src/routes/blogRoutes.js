const express = require('express')
const router = express.Router();
const {
    createBlog, 
    getBlogs, 
    addComments, 
    getComments, 
    updateBlog, 
    deleteBlog,
    addVote
} = require('../controller/blogController')
const { checkUserLogin } = require("../middlewares/auth");

router.post("/new",checkUserLogin, createBlog)
router.get("/all", getBlogs)
router.patch("/single/:blogId", checkUserLogin, updateBlog)
router.delete("/single/:blogId", checkUserLogin, deleteBlog)
router.post("/comment/:blogId", checkUserLogin, addComments)
router.get("/comment/:blogId", getComments)
router.patch("/vote/:blogId", checkUserLogin, addVote)

module.exports = router