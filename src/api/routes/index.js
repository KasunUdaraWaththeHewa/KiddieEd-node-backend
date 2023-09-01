const express = require("express");
const lessonController = require("../controllers/lesson");

const router = express.Router();

//add lesson
router.post("/lesson/add", lessonController.addLesson);

//get lessons
router.get("/lessons", lessonController.getLessons);

//update lesson
router.put("/lesson/update/:id", lessonController.updateLesson);

//delete lesson
router.delete("/lesson/delete/:id", lessonController.deleteLesson);

//get a specific lesson
router.get("/lesson/:id", lessonController.getSpecificLesson);

module.exports = router;
