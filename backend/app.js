const express = require("express");
const app = express();
require("dotenv").config();
require("./conn/connection");
const cors = require("cors");
const UserApi = require("./routes/user");
const TaskApi = require("./routes/task")

app.use(cors());


app.use(express.json())

app.use("/api/v1", UserApi);
app.use("/api/v2", TaskApi);

const port = process.env.PORT || 8200;

app.listen(port, () => {
    console.log("server started "+port)
});