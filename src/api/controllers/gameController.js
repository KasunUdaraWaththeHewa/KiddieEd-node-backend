const game = require("../models/Game");

const addGame = async (req, res) => {
  const {
    gameName,
    image,
    payment,
    category
  } = req.body;

  const newGame = new Game({
    gameName,
    image,
    payment,
    category
  });

  try {
    await newGame.save();
    res.json("Game Added");
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error adding game" });
  }
};

const getGameByID = async (req, res) => {
  const gameID = req.params.gameID;

  try {
    const game = await game.findById(gameID);

    if (!game) {
      return res.status(404).json({ error: "Game not found" });
    }

    res.status(200).json({ status: "Game fetched", game });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ status: "Error with fetching Game", error: err.message });
  }
};

const updateGameByID = async (req, res) => {
  const gameID = req.params.gameID;

  const {
    gameName,
    image,
    payment,
    category
  } = req.body;

  const updateGame = {
    gameName,
    image,
    payment,
    category
  };

  try {
    const updatedGame = await game.findByIdAndUpdate(
      gameID,
      updateGame,
      { new: true }
    );

    if (updatedGame) {
      res.status(200).send({ status: "Game updated", data: updatedGame });
    } else {
      res.status(404).send({ status: "Game not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ status: "Error with updating data", error: err.message });
  }
};


const deleteGameByID = async (req, res) => {
  const gameID = req.params.gameID;

  try {
    const deletedGame = await game.findByIdAndDelete(gameID);

    if (!deletedGame) {
      return res.status(404).json({ error: "Game not found" });
    }

    res.status(200).json({ status: "Game's data deleted", data: deletedGame });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ status: "Error with deleting Game", error: err.message });
  }
};


const getAllGames = async (req, res) => {
  game.find()
    .then((games) => {
      res.json(games);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Internal server error" });
    });
};

module.exports = {
  addGame,
  getGameByID,
  updateGameByID,
  deleteGameByID,
  getAllGames,
};
