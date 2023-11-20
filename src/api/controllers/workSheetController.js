const worksheet = require("../models/worksheet");

const addWorkSheet = async (req, res) => {
  const {
    sheetName,
    image,
    payment,
    category
  } = req.body;

  const newWorkSheet = new worksheet({
    sheetName,
    image,
    payment,
    category 
  });

  try {
    await newWorkSheet.save();
    res.json("Worksheet Added");
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error adding worksheet" });
  }
};

const getWorkSheetByID = async (req, res) => {
  const worksheetID = req.params.worksheetID;

  try {
    const worksheet = await worksheet.findById(worksheetID);

    if (!worksheet) {
      return res.status(404).json({ error: "Worksheet not found" });
    }

    res.status(200).json({ status: "Worksheet fetched", worksheet });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ status: "Error with fetching Worksheet", error: err.message });
  }
};

const updateWorkSheetByID = async (req, res) => {
  const worksheetID = req.params.worksheetID;

  const {
    sheetName,
    image,
    payment,
    category
  } = req.body;

  const updateWorkSheet = {
    sheetName,
    image,
    payment,
    category
  };

  try {
    const updatedWorkSheet = await worksheet.findByIdAndUpdate(
      worksheetID,
      updateWorkSheet,
      { new: true }
    );

    if (updatedWorkSheet) {
      res.status(200).send({ status: "Worksheet updated", data: updatedWorkSheet });
    } else {
      res.status(404).send({ status: "Worksheet not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ status: "Error with updating data", error: err.message });
  }
};


const deleteWorkSheetByID = async (req, res) => {
  const worksheetID = req.params.worksheetID;
  try {
    const deletedWorkSheet = await worksheet.findByIdAndDelete(worksheetID);

    if (!deletedWorkSheet) {
      return res.status(404).json({ error: "Worksheet not found" });
    }

    res.status(200).json({ status: "Worksheet's data deleted", data: deletedWorkSheet });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ status: "Error with deleting Worksheet", error: err.message });
  }
};


const getAllWorkSheets = async (req, res) => {
  worksheet.find()
    .then((worksheets) => {
      res.json(worksheets);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Internal server error" });
    });
};

module.exports = {
  addWorkSheet,
  getWorkSheetByID,
  updateWorkSheetByID,
  deleteWorkSheetByID,
  getAllWorkSheets,
};
