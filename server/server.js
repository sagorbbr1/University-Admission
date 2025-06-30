const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
app.use(cors());
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
dotenv = require("dotenv");
dotenv.config();
const authRoutes = require("./routes/AuthRoutes.js");
const questionRoutes = require("./routes/QuestionRoutes.js");
const mockTestRoutes = require("./routes/mockTestRoutes.js");
const adminRoutes = require("./routes/AdminRoutes.js");
const noticeRoutes = require("./routes/noticeRoutes.js");
const discussionRoutes = require("./routes/discussionRoutes.js");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch((err) => console.log(err));

app.use("/api/auth", authRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/mock-test", mockTestRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/notices", noticeRoutes);
app.use("/api/discussions", discussionRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});
