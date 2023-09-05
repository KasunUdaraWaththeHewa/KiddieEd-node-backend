const Homes = require("../models/home");

//add Home
const addHome = (req, res) => {
  Homes.create({
    image: req.file.filename,
    homeName: req.body.homeName,
    payment: req.body.payment,
    category: req.body.category,
  })
    .then(() => res.json({success: true}))
    .catch((err) => console.log(err));
};

//get Homes
const getHomes = (req, res) => {
  Homes.find().exec((err, homes) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: true,
      existingHomes: homes,
    });
  });
};

//update Home
const updateHome = (req, res) => {
  if (req.file) {
    Homes.findByIdAndUpdate(
      req.params.id,
      {
        image: req.file.filename,
        homeName: req.body.homeName,
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
    Homes.findByIdAndUpdate(
      req.params.id,
      {
        homeName: req.body.homeName,
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

//delete Home
const deleteHome = (req, res) => {
  Homes.findByIdAndDelete(req.params.id).exec((err, deleteHome) => {
    if (err)
      return res.status(400).json({
        message: "Delete unsuccessful",
        err,
      });
    return res.json({
      message: "Delete Successfull",
      deleteHome,
    });
  });
};

//get a specific Home
const getSpecificHome = (req, res) => {
  let homeId = req.params.id;
  Homes.findById(homeId, (err, home) => {
    if (err) {
      return res.status(400).json({ success: false, err });
    }
    return res.status(200).json({
      success: true,
      home,
    });
  });
};

module.exports = {
  addHome,
  getHomes,
  updateHome,
  deleteHome,
  getSpecificHome,
};
