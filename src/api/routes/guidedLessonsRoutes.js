const express = require("express");
const router = express.Router();
const guidedLessonController = require("../controllers/guidedLessonController");

router.route("/add").post(guidedLessonController.addGuidedLesson);

router.route("/get/:guidedLessonID").get(guidedLessonController.getGuidedLessonByID);

router.route("/update/:guidedLessonID").put(guidedLessonController.updateGuidedLessonByID);

router.route("/delete/:guidedLessonID").delete(guidedLessonController.deleteGuidedLessonByID);

router.route("/").get(guidedLessonController.getAllGuidedLessons);

module.exports = router;
