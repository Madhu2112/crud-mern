const express = require('express');
const cors = require('cors');
var app = express();
const userRoutes = require("./routes/userRoutes");

app.use(cors());
app.use(express.json());
app.use('', userRoutes);

app.listen(4000, () => {
    console.log("server is listening on port 4000");
});