const express = require("express");
const router = express.Router();
const lessonPlanController = require("../controllers/lessonPlanController");

router.route("/add").post(lessonPlanController.addLessonPlan);

router.route("/get/:lessonPlanID").get(lessonPlanController.getLessonPlanByID);

router.route("/update/:lessonPlanID").put(lessonPlanController.updateLessonPlanByID);

router.route("/delete/:lessonPlanID").delete(lessonPlanController.deleteLessonPlanByID);

router.route("/").get(lessonPlanController.getAllLessonPlans);

module.exports = router;
