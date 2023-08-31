const express = require("express");
const Lessons = require("../models/lesson");
const path = require("path");
const multer = require("multer");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
});

//save posts
router.post("/lesson/add", upload.single("file"), (req, res) => {
  Lessons.create({
    image: req.file.filename,
    lessonName: req.body.lessonName,
    payment: req.body.payment,
    category: req.body.category,
  })
    .then((result) => res.json(result))
    .catch((err) => console.log(err));
});

//get posts
router.get("/lessons", (req, res) => {
  Lessons.find().exec((err, lessons) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: true,
      existingLessons: lessons,
    });
  });
});

//update posts
router.put("/lesson/update/:id", upload.single("file"), (req, res) => {
  if(req.file){
    Lessons.findByIdAndUpdate(
      req.params.id,
      {
        // $set: req.body,
        // image: req.body.file,
        image: req.file.filename,
        lessonName: req.body.lessonName,
        payment: req.body.payment,
        category: req.body.category,
      },
      (err, post) => {
        if (err) {
          return res.status(401).json({ error: err });
        }
        return res.status(200).json({
          success: "Updated Succesfully",
        });
      }
    );
  }else{
    Lessons.findByIdAndUpdate(
      req.params.id,
      {
        // $set: req.body,
        // image: req.body.file,
        // image: req.file.filename,
        lessonName: req.body.lessonName,
        payment: req.body.payment,
        category: req.body.category,
      },
      (err, post) => {
        if (err) {
          return res.status(401).json({ error: err });
        }
        return res.status(200).json({
          success: "Updated Succesfully",
        });
      }
    );
  }
  
  console.log(req.file);
});

//delete posts
router.delete("/lesson/delete/:id", (req, res) => {
  Lessons.findByIdAndDelete(req.params.id).exec((err, deleteLesson) => {
    if (err)
      return res.status(400).json({
        message: "Delete unsuccessful",
        err,
      });
    return res.json({
      message: "Delete Successfull",
      deleteLesson,
    });
  });
});

//get a specific post
router.get("/lesson/:id", (req, res) => {
  let lessonId = req.params.id;
  Lessons.findById(lessonId, (err, lesson) => {
    if (err) {
      return res.status(400).json({ success: false, err });
    }
    return res.status(200).json({
      success: true,
      lesson,
    });
  });
});

module.exports = router;

/*
Lessons.create({image:req.file.filename})
.then(result=>res.json(result))
.catch(err=> console.log(err))
*/
