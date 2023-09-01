const express = require("express");
const lessonController = require("../controllers/lesson")

const router = express.Router();

//save posts
router.post("/lesson/add",lessonController.addLesson);

//get posts
router.get("/lessons", lessonController.getLessons);

//update posts
router.put("/lesson/update/:id",lessonController.updateLesson);

//delete posts
router.delete("/lesson/delete/:id",lessonController.deleteLesson);

//get a specific post
router.get("/lesson/:id",lessonController.getSpecific);

module.exports = router;
