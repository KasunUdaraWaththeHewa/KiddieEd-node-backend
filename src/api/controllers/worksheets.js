const Sheets = require("../models/worksheet");

//add Sheet
const addSheet = (req, res) => {
  Sheets.create({
    image: req.file.filename,
    sheetName: req.body.sheetName,
    payment: req.body.payment,
    category: req.body.category,
  })
    .then(() => res.json({success: true}))
    .catch((err) => console.log(err));
};

//get Sheets
const getSheets = (req, res) => {
  Sheets.find().exec((err, sheets) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: true,
      existingSheets: sheets,
    });
  });
};

//update Sheet
const updateSheet = (req, res) => {
  if (req.file) {
    Sheets.findByIdAndUpdate(
      req.params.id,
      {
        image: req.file.filename,
        sheetName: req.body.sheetName,
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
    Sheets.findByIdAndUpdate(
      req.params.id,
      {
        sheetName: req.body.sheetName,
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

//delete Sheet
const deleteSheet = (req, res) => {
  Sheets.findByIdAndDelete(req.params.id).exec((err, deleteSheet) => {
    if (err)
      return res.status(400).json({
        message: "Delete unsuccessful",
        err,
      });
    return res.json({
      message: "Delete Successfull",
      deleteSheet,
    });
  });
};

//get a specific Sheet
const getSpecificSheet = (req, res) => {
  let sheetId = req.params.id;
  Sheets.findById(sheetId, (err, sheet) => {
    if (err) {
      return res.status(400).json({ success: false, err });
    }
    return res.status(200).json({
      success: true,
      sheet,
    });
  });
};

module.exports = {
  addSheet,
  getSheets,
  updateSheet,
  deleteSheet,
  getSpecificSheet,
};
