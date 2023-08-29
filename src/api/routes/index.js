const express = require('express');
const Lessons = require('../models/lesson');

const router = express.Router();

//save posts
router.post('/lesson/add',(req,res) => {
    let newLesson = new Lessons(req.body);
    newLesson.save((err)=>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:"Lesson added successfully"
        });
    });
});

//get posts
router.get('/lessons',(req,res) => {
    Lessons.find().exec((err,lessons) => {
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:true,
            existingLessons:lessons
        });
    });
});

//update posts
router.put('/lesson/update/:id',(req,res) => {
    Lessons.findByIdAndUpdate(
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
router.delete('/lesson/delete/:id',(req,res) =>{
    Lessons.findByIdAndDelete(req.params.id).exec((err,deleteLesson) =>{
        if(err) return res.status(400).json({
            message:"Delete unsuccessful",err
        });
        return res.json({
            message:"Delete Successfull",deleteLesson
        });
    });
});

//get a specific post
router.get("/lesson/:id",(req,res) =>{
    let lessonId = req.params.id;
    Lessons.findById(lessonId,(err,lesson) =>{
        if(err){
            return res.status(400).json({success:false,err});
        }
        return res.status(200).json({
            success:true,
            lesson
        });
    });
});

module.exports = router;