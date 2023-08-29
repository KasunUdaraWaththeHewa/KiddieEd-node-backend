const express = require('express');
const Posts = require('../models/lesson');

const router = express.Router();

//save posts
router.post('/post/save',(req,res) => {
    let newPost = new Posts(req.body);
    newPost.save((err)=>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:"Posts saved successfully"
        });
    });
});

//get posts
router.get('/post',(req,res) => {
    Posts.find().exec((err,posts) => {
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:true,
            existingPosts:posts
        });
    });
});

//update posts
router.put('/post/update/:id',(req,res) => {
    Posts.findByIdAndUpdate(
        req.params.id,
        {
            $set:req.body
        },
        (err,post)=>{
            if(err){
                return res.status(401).json({error:err});
            }
            return res.status(200).json({
                success:"Updated Succesfully"
            });
        }
    );
});

//delete posts
router.delete('/post/delete/:id',(req,res) =>{
    Posts.findByIdAndDelete(req.params.id).exec((err,deletePost) =>{
        if(err) return res.status(400).json({
            message:"Delete unsuccessful",err
        });
        return res.json({
            message:"Delete Successfull",deletePost
        });
    });
});

//get a specific post
router.get("/post/:id",(req,res) =>{
    let postId = req.params.id;
    Posts.findById(postId,(err,post) =>{
        if(err){
            return res.status(400).json({success:false,err});
        }
        return res.status(200).json({
            success:true,
            post
        });
    });
});
module.exports = router;