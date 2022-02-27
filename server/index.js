const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

require("dotenv").config();

app.use(cors());
app.use(express.json());

const MONGODBURL = process.env.ATLAS_URI;
const JWTPASSWORD = process.env.JWT_PASS;

// mongoose.connect("mongodb://localhost:2701");

// mongodb connection url
mongoose.connect(MONGODBURL);

// register api
app.post("/api/register", async (req, res) => {
  console.log(req.body);

  try {
    const newPass = await bcrypt.hash(req.body.password, 10);
    await User.create({
      name: req.body.name,
      email: req.body.email,
      password: newPass,
    });
    res.json({ status: "ok" });
  } catch (err) {
    res.json({ status: "error", error: "Duplicate email" });
  }
});

// login api
app.post("/api/login", async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
  });

  !user && res.json({ status: "error", error: "Invalid Login" });

  const isPassValid = bcrypt.compare(req.body.password, user.password);
  if (isPassValid) {
    const token = jwt.sign({ name: user.name, email: user.email }, JWTPASSWORD);
    return res.json({ status: "ok", user: token });
  } else {
    return res.json({ status: "error", user: false });
  }
});

// get user quote
app.get("/api/quote", async (req, res) => {
  const token = req.headers["x-access-token"];

  try {
    const decoded = jwt.verify(token, JWTPASSWORD);
    const email = decoded.email;
    const user = await User.findOne({ email: email });

    return res.json({ status: "ok", quote: user.quote });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: "invalid token" });
  }
});

// udpate a user quote
app.post("/api/quote", async (req, res) => {
  const token = req.headers["x-access-token"];

  try {
    const decoded = jwt.verify(token, JWTPASSWORD);
    const email = decoded.email;
    await User.updateOne({ email: email }, { $set: { quote: req.body.quote } });

    return res.json({ status: "ok" });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: "invalid token" });
  }
});

// server port
app.listen(9999, () => console.log("Server started on port 9999"));
