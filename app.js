const express = require("express");
// const bodyParser = require("bodyparser"); 

const app = express();

app.set('view engine', 'ejs');

app.get("/", function (req, res) {
    var today = new Date();
    var currentDay = today.getDay();
    day = ""



    res.render("list", { kindofDay: day });
});


app.listen(3000, function (req, res) {
    console.log("Server started at 3000")
});