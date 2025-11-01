// rbac/server.js
const express = require("express");
const cors = require("cors");
const app = express();
const routes = require("./routes");

app.use(cors());
app.use(express.json());
app.use("/", routes);

app.listen(3000, () => {
  console.log("RBAC server running at http://localhost:3000");
});