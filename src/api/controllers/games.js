const Games = require("../models/game");

//add Game
const addGame = (req, res) => {
  Games.create({
    image: req.file.filename,
    gameName: req.body.gameName,
    payment: req.body.payment,
    category: req.body.category,
  })
    .then(() => res.json({success: true}))
    .catch((err) => console.log(err));
};

//get Games
const getGames = (req, res) => {
  Games.find().exec((err, games) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: true,
      existingGames: games,
    });
  });
};

//update Game
const updateGame = (req, res) => {
  if (req.file) {
    Games.findByIdAndUpdate(
      req.params.id,
      {
        image: req.file.filename,
        gameName: req.body.gameName,
        payment: req.body.payment,
        category: req.body.category,
      },
      (err, post) => {
        if (err) {
          return res.status(401).json({ error: err });
        }
        return res.status(200).json({
          success: "Updated Succesfully",
        });
      }
    );
  } else {
    Games.findByIdAndUpdate(
      req.params.id,
      {
        gameName: req.body.gameName,
        payment: req.body.payment,
        category: req.body.category,
      },
      (err, post) => {
        if (err) {
          return res.status(401).json({ error: err });
        }
        return res.status(200).json({
          success: "Updated Succesfully",
        });
      }
    );
  }
};

//delete Game
const deleteGame = (req, res) => {
  Games.findByIdAndDelete(req.params.id).exec((err, deleteGame) => {
    if (err)
      return res.status(400).json({
        message: "Delete unsuccessful",
        err,
      });
    return res.json({
      message: "Delete Successfull",
      deleteGame,
    });
  });
};

//get a specific Game
const getSpecificGame = (req, res) => {
  let gameId = req.params.id;
  Games.findById(gameId, (err, game) => {
    if (err) {
      return res.status(400).json({ success: false, err });
    }
    return res.status(200).json({
      success: true,
      game,
    });
  });
};

module.exports = {
  addGame,
  getGames,
  updateGame,
  deleteGame,
  getSpecificGame,
};
