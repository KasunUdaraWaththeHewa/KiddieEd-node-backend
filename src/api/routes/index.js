const express = require("express");
const path = require("path");
const multer = require("multer");

const plansController = require("../controllers/lesson-plans");
const sheetsController = require("../controllers/worksheets");

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

/* ****************************** lesson plans start ************************************ */
//add plan
router.post(
  "/lesson-plans/add",
  upload.single("file"),
  plansController.addPlan
);

//get plans
router.get("/lesson-plans", plansController.getPlans);

//update lesson
router.put(
  "/lesson-plans/update/:id",
  upload.single("file"),
  plansController.updatePlan
);

//delete plan
router.delete("/lesson-plans/delete/:id", plansController.deletePlan);

//get a specific plan
router.get("/lesson-plans/:id", plansController.getSpecificPlan);

/* ****************************** lesson plans end ************************************ */

/* ****************************** worsheets start ************************************ */
//add worksheet
router.post(
  "/worksheets/add",
  upload.single("file"),
  sheetsController.addSheet
);

//get worksheets
router.get("/worksheets", sheetsController.getSheets);

//update worksheet
router.put(
  "/worksheets/update/:id",
  upload.single("file"),
  sheetsController.updateSheet
);

//delete worksheet
router.delete("/worksheets/delete/:id", sheetsController.deleteSheet);

//get a specific worksheet
router.get("/worksheets/:id", sheetsController.getSpecificSheet);

/* ****************************** worsheets end ************************************ */

module.exports = router;
