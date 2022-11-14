const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const router = require("./routes/allRoutes");

// Setup server
const app = express();
const PORT = "7000";

app.listen(PORT, () => {
  console.log("===============================");
  console.log(`Server started on port ${PORT}`);
  console.log("===============================");
});

// utilities
app.use(cors());

// routes
app.use(router);
