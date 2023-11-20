const lessonPlan = require("../models/LessonPlan");

const addLessonPlan = async (req, res) => {
  const {
    planName,
    image,
    payment,
    category
  } = req.body;

  const newLessonPlan = new LessonPlan({
    planName,
    image,
    payment,
    category
  });

  try {
    await newLessonPlan.save();
    res.json("LessonPlan Added");
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error adding lessonPlan" });
  }
};

const getLessonPlanByID = async (req, res) => {
  const lessonPlanID = req.params.lessonPlanID;

  try {
    const lessonPlan = await lessonPlan.findById(lessonPlanID);

    if (!lessonPlan) {
      return res.status(404).json({ error: "LessonPlan not found" });
    }

    res.status(200).json({ status: "LessonPlan fetched", lessonPlan });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ status: "Error with fetching LessonPlan", error: err.message });
  }
};

const updateLessonPlanByID = async (req, res) => {
  const lessonPlanID = req.params.lessonPlanID;

  const {
    planName,
    image,
    payment,
    category
  } = req.body;

  const updateLessonPlan = {
    planName,
    image,
    payment,
    category
  };

  try {
    const updatedLessonPlan = await lessonPlan.findByIdAndUpdate(
      lessonPlanID,
      updateLessonPlan,
      { new: true }
    );

    if (updatedLessonPlan) {
      res.status(200).send({ status: "LessonPlan updated", data: updatedLessonPlan });
    } else {
      res.status(404).send({ status: "LessonPlan not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ status: "Error with updating data", error: err.message });
  }
};


const deleteLessonPlanByID = async (req, res) => {
  const lessonPlanID = req.params.lessonPlanID;

  try {
    const deletedLessonPlan = await lessonPlan.findByIdAndDelete(lessonPlanID);

    if (!deletedLessonPlan) {
      return res.status(404).json({ error: "LessonPlan not found" });
    }

    res.status(200).json({ status: "LessonPlan's data deleted", data: deletedLessonPlan });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ status: "Error with deleting LessonPlan", error: err.message });
  }
};


const getAllLessonPlans = async (req, res) => {
  lessonPlan.find()
    .then((lessonPlans) => {
      res.json(lessonPlans);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Internal server error" });
    });
};

module.exports = {
  addLessonPlan,
  getLessonPlanByID,
  updateLessonPlanByID,
  deleteLessonPlanByID,
  getAllLessonPlans,
};
