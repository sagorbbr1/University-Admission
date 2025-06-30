const Notice = require("../models/Notice");

const getAllNotices = async (req, res) => {
  try {
    const notices = await Notice.find().sort({ date: -1 });
    res.status(200).json(notices);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch notices" });
  }
};

const submitNotices = async (req, res) => {
  try {
    const { title, content, date } = req.body;
    const newNotice = await Notice.create({ title, content, date });
    res.status(201).json({ success: true, notice: newNotice });
  } catch (err) {
    res.status(500).json({ message: "Failed to create notice" });
  }
};

const deleteNotice = async (req, res) => {
  try {
    await Notice.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete" });
  }
};
module.exports = {
  getAllNotices,
  submitNotices,
  deleteNotice,
};
