const express = require("express");
const app = express();
var cors = require("cors");
const PORT = process.env.PORT || 4000;

app.use(cors());

const mapRoute = require("./routes/map.routes");
const nodeRoute = require("./routes/node.routes");

const db = require("./config/db");
db();

app.use(express.json());

//Use Routes
app.use("/api/v1/", mapRoute);
app.use("/api/v1/node", nodeRoute);

app.get("/", (req, res) => {
  res.json("Server is running successfully!");
});

app.listen(PORT, console.log("Server started on port: " + PORT));
