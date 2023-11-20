const express = require("express");
const router = express.Router();
const worksheetController = require("../controllers/worksheetController");

router.route("/add").post(worksheetController.addWorkSheet);

router.route("/get/:worksheetID").get(worksheetController.getWorkSheetByID);

router.route("/update/:worksheetID").put(worksheetController.updateWorkSheetByID);

router.route("/delete/:worksheetID").delete(worksheetController.deleteWorkSheetByID);

router.route("/").get(worksheetController.getAllWorkSheets);

module.exports = router;
