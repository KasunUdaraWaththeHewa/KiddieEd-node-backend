const express = require("express");
const router = express.Router();
const gamesController = require("../controllers/gameController");

router.route("/add").post(gamesController.addGame);

router.route("/get/:gameID").get(gamesController.getGameByID);

router.route("/update/:gameID").put(gamesController.updateGameByID);

router.route("/delete/:gameID").delete(gamesController.deleteGameByID);

router.route("/").get(gamesController.getAllGames);

module.exports = router;
