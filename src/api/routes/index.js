const express = require("express");
const lessonController = require("../controllers/lesson");
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

//add lesson
router.post("/lesson/add",upload.single("file") ,lessonController.addLesson);

//get lessons
router.get("/lessons", lessonController.getLessons);

//update lesson
router.put("/lesson/update/:id",upload.single("file") ,lessonController.updateLesson);

//delete lesson
router.delete("/lesson/delete/:id", lessonController.deleteLesson);

//get a specific lesson
router.get("/lesson/:id", lessonController.getSpecificLesson);

module.exports = router;
