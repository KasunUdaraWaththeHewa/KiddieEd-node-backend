const guidedLesson = require("../models/GuidedLesson");

const addGuidedLesson = async (req, res) => {
  const {
    lessonName,
    image,
    payment,
    category
  } = req.body;

  const newGuidedLesson = new GuidedLesson({
    lessonName,
    image,
    payment,
    category
  });

  try {
    await newGuidedLesson.save();
    res.json("GuidedLesson Added");
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error adding GuidedLesson" });
  }
};

const getGuidedLessonByID = async (req, res) => {
  const guidedLessonID = req.params.guidedLessonID;

  try {
    const guidedLesson = await guidedLesson.findById(guidedLessonID);

    if (!guidedLesson) {
      return res.status(404).json({ error: "Guided Lesson not found" });
    }

    res.status(200).json({ status: "Guided Lesson fetched", guidedLesson });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ status: "Error with fetching Guided Lesson", error: err.message });
  }
};

const updateGuidedLessonByID = async (req, res) => {
  const guidedLessonID = req.params.guidedLessonID;

  const {
    lessonName,
    image,
    payment,
    category
  } = req.body;

  const updateGuidedLesson = {
    lessonName,
    image,
    payment,
    category
  };

  try {
    const updatedGuidedLesson = await guidedLesson.findByIdAndUpdate(
      guidedLessonID,
      updateGuidedLesson,
      { new: true }
    );

    if (updatedGuidedLesson) {
      res.status(200).send({ status: "Guided Lesson updated", data: updatedGuidedLesson });
    } else {
      res.status(404).send({ status: "Guided Lesson not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ status: "Error with updating data", error: err.message });
  }
};


const deleteGuidedLessonByID = async (req, res) => {
  const guidedLessonID = req.params.guidedLessonID;

  try {
    const deletedGuidedLesson = await guidedLesson.findByIdAndDelete(guidedLessonID);

    if (!deletedGuidedLesson) {
      return res.status(404).json({ error: "Guided Lesson not found" });
    }

    res.status(200).json({ status: "Guided Lesson's data deleted", data: deletedGuidedLesson });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ status: "Error with deleting Guided Lesson", error: err.message });
  }
};


const getAllGuidedLessons = async (req, res) => {
  guidedLesson.find()
    .then((guidedLessons) => {
      res.json(guidedLessons);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Internal server error" });
    });
};

module.exports = {
  addGuidedLesson,
  getGuidedLessonByID,
  updateGuidedLessonByID,
  deleteGuidedLessonByID,
  getAllGuidedLessons,
};
