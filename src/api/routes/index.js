const express = require("express");
const path = require("path");
const multer = require("multer");

const plansController = require("../controllers/lesson-plans");
const sheetsController = require("../controllers/worksheets");
const gamesController = require("../controllers/games");
const lessonsController = require("../controllers/guided-lessons");
const homesController = require("../controllers/home");

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

/* ****************************** games start ************************************ */
//add game
router.post(
  "/games/add",
  upload.single("file"),
  gamesController.addGame
);

//get games
router.get("/games", gamesController.getGames);

//update game
router.put(
  "/games/update/:id",
  upload.single("file"),
  gamesController.updateGame
);

//delete game
router.delete("/games/delete/:id", gamesController.deleteGame);

//get a specific game
router.get("/games/:id", gamesController.getSpecificGame);

/* ****************************** games end ************************************ */

/* ****************************** guided-lessons start ************************************ */
//add guided-lesson
router.post(
  "/guid-lessons/add",
  upload.single("file"),
  lessonsController.addLesson
);

//get guided-lessons
router.get("/guid-lessons", lessonsController.getLessons);

//update guided-lesson
router.put(
  "/guid-lessons/update/:id",
  upload.single("file"),
  lessonsController.updateLesson
);

//delete guided-lesson
router.delete("/guid-lessons/delete/:id", lessonsController.deleteLesson);

//get a specific guided-lesson
router.get("/guid-lessons/:id", lessonsController.getSpecificLesson);

/* ****************************** guided-lessons end ************************************ */

/* ****************************** homes start ************************************ */
//add home
router.post(
  "/homes/add",
  upload.single("file"),
  homesController.addHome
);

//get homes
router.get("/homes", homesController.getHomes);

//update home
router.put(
  "/homes/update/:id",
  upload.single("file"),
  homesController.updateHome
);

//delete home
router.delete("/homes/delete/:id", homesController.deleteHome);

//get a specific home
router.get("/homes/:id", homesController.getSpecificHome);

/* ****************************** homes end ************************************ */

module.exports = router;
