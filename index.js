const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const port = process.env.PORT || 3001;
const principalRouter = require('./routes/principal');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', principalRouter);

app.listen(port, function () {
    console.log("Esperando en " + port);
});

module.exports = app;