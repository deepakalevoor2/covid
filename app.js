const express = require("express");
require("dotenv").config();
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

//My Routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const patientRoutes = require("./routes/patient");

//Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//DB connection
//mongoose.connect("mongodb://localhost:27017/test", { useNewUrlParser: true });
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("DB Connected");
  });

app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", patientRoutes);

//PORT
const port = process.env.PORT || 8000;

//Stating Server
app.listen(port, () => {
  console.log(`App is running at ${port}`);
});
