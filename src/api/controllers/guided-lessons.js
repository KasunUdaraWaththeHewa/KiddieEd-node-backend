const Lessons = require("../models/guided-lessons");

//add Lesson
const addLesson = (req, res) => {
  Lessons.create({
    image: req.file.filename,
    lessonName: req.body.lessonName,
    payment: req.body.payment,
    category: req.body.category,
  })
    .then(() => res.json({success: true}))
    .catch((err) => console.log(err));
};

//get Lessons
const getLessons = (req, res) => {
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
};

//update Lesson
const updateLesson = (req, res) => {
  if (req.file) {
    Lessons.findByIdAndUpdate(
      req.params.id,
      {
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
  } else {
    Lessons.findByIdAndUpdate(
      req.params.id,
      {
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
};

//delete Lesson
const deleteLesson = (req, res) => {
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
};

//get a specific Lesson
const getSpecificLesson = (req, res) => {
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
};

module.exports = {
  addLesson,
  getLessons,
  updateLesson,
  deleteLesson,
  getSpecificLesson,
};
