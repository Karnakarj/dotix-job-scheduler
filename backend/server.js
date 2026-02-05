
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const sequelize = require("./config/db");
const jobRoutes = require("./routes/jobRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", jobRoutes);

sequelize.authenticate()
  .then(() => console.log("DB Connected"))
  .catch(err => console.log(err));

app.listen(process.env.PORT, () => {
  console.log("Server running on port", process.env.PORT);
});
