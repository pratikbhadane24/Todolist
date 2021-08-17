const express = require("express");
// const bodyParser = require("bodyparser"); 

const app = express();

app.set('view engine', 'ejs');

app.get("/", function (req, res) {


    // Getting the Date
    var today = new Date();
    var options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    }
    var day = today.toLocaleDateString("en-US", options)

    res.render("list", { kindofDay: day });
});


app.listen(3000, function (req, res) {
    console.log("Server started at 3000")
});