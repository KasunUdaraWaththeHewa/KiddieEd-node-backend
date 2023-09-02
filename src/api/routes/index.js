const express = require("express");
const plansController = require("../controllers/lesson-plans");
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
router.post("/lesson-plans/add",upload.single("file") ,plansController.addPlan);

//get lessons
router.get("/lesson-plans", plansController.getPlans);

//update lesson
router.put("/lesson-plans/update/:id",upload.single("file") ,plansController.updatePlan);

//delete lesson
router.delete("/lesson-plans/delete/:id", plansController.deletePlan);

//get a specific lesson
router.get("/lesson-plans/:id", plansController.getSpecificPlan);

module.exports = router;
