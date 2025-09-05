require("dotenv").config();

const express = require("express");
const cors = require("cors");
const sequelize = require("./utils/db-connection");
const authRoutes=require('./routes/authRoutes');
const manufacturerRoutes = require("./routes/manufacturer");
const workerRoutes = require("./routes/workerRoutes");



require("./models");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("Backend is running"));

app.use("/auth",authRoutes);
app.use("/manufacturer", manufacturerRoutes);
app.use("/worker",workerRoutes);


sequelize
  .sync() 
  .then(() => {
    console.log("Database synced");
    app.listen(process.env.PORT, () => console.log("Server running on port 3001"));
  })
  .catch((err) => console.error("Error syncing DB:", err));
