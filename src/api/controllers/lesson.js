const path = require("path");
const multer = require("multer");
const Lessons = require("../models/lesson");

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

const addLesson = (req, res) => {
  upload.single("file")
  Lessons.create({
    image: req.file.filename,
    lessonName: req.body.lessonName,
    payment: req.body.payment,
    category: req.body.category,
  })
    .then((result) => res.json(result))
    .catch((err) => console.log(err));
};

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

const updateLesson = (req, res) => {
  upload.single("file")
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
