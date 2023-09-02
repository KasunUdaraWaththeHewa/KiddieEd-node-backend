const Plans = require("../models/lesson-plans");

//add Plan
const addPlan = (req, res) => {
  Plans.create({
    image: req.file.filename,
    planName: req.body.planName,
    payment: req.body.payment,
    category: req.body.category,
  })
    .then(() => res.json({success: true}))
    .catch((err) => console.log(err));
};

//get Plans
const getPlans = (req, res) => {
  Plans.find().exec((err, plans) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: true,
      existingPlans: plans,
    });
  });
};

//update Plan
const updatePlan = (req, res) => {
  if (req.file) {
    Plans.findByIdAndUpdate(
      req.params.id,
      {
        image: req.file.filename,
        planName: req.body.planName,
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
    Plans.findByIdAndUpdate(
      req.params.id,
      {
        planName: req.body.planName,
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

//delete Plan
const deletePlan = (req, res) => {
  Plans.findByIdAndDelete(req.params.id).exec((err, deletePlan) => {
    if (err)
      return res.status(400).json({
        message: "Delete unsuccessful",
        err,
      });
    return res.json({
      message: "Delete Successfull",
      deletePlan,
    });
  });
};

//get a specific Plan
const getSpecificPlan = (req, res) => {
  let planId = req.params.id;
  Plans.findById(planId, (err, plan) => {
    if (err) {
      return res.status(400).json({ success: false, err });
    }
    return res.status(200).json({
      success: true,
      plan,
    });
  });
};

module.exports = {
  addPlan,
  getPlans,
  updatePlan,
  deletePlan,
  getSpecificPlan,
};
