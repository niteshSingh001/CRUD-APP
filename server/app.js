require("dotenv").config();
const express = require("express");
const app = express();
require("./db/conn");
const port = 8003;
const users = require("./models/userSchema");
const cors = require("cors");
const router = require("./routes/router");

app.use(cors());
app.use(express.json());

app.use(router);

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
