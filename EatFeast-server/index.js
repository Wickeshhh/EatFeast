const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 6001;
const mongoose = require("mongoose");
require("dotenv").config();
const jwt = require('jsonwebtoken');
// const _crypto = require("crypto");
// const x = _crypto.randomBytes(32).toString('hex');


//middleware
app.use(cors());
app.use(express.json());

//mongodb config using mongoose
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@eatfeast-cluster.vm49x.mongodb.net/eatfeast-server?retryWrites=true&w=majority&appName=eatfeast-cluster`
  )
  .then(console.log("Mongodb connected successfully!"))
  .catch((error) => console.log("Error connecting to MongoDB: " + error));

// jwt authentication

// jwt related api
app.post("/jwt", async (req, res) => {
  const user = req.body;
  // console.log(user)
  const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1h",
  });
  res.send({ token });
});


//import routes
const menuRoutes = require("./api/routes/menuRoutes");
const cartRoutes = require("./api/routes/cartRoutes");
const userRoutes = require("./api/routes/userRoutes");
app.use("/menu", menuRoutes);
app.use("/carts", cartRoutes);
app.use("/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
