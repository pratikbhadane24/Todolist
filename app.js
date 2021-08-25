const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const date = require(__dirname + "/date.js");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/todolistDB", { useNewUrlParser: true });
const itemsSchema = {
    name: String,
}
const Item = mongoose.model("Item", itemsSchema);

const item1 = new Item({ name: "Welcome to your To Do List!", });
const item2 = new Item({ name: "Click on + to add new item.", });
const item3 = new Item({ name: "Check on checkbox when you complete item task.", });

const defaultItems = [ item1, item2, item3 ];

app.get("/", function (req, res) {
    const day = date.getDay();

    Item.find({}, function (err, foundItems) {

        if (foundItems.length === 0) {
            Item.insertMany(defaultItems, function (err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Successfully saved default items to DB.");
                }
            });
            res.redirect("/");
        } else {
            res.render("list", { listTitle: day, newListItems: foundItems });
        }
    }); 
});

app.post("/", function (req, res) {

    const item = req.body.newItem

    if (req.body.list === "Work") {
        workItems.push(item);
        res.redirect("/work")
    }
    else {
        items.push(item);
        res.redirect("/");
    }
});


app.get("/work", function (req, res) {
    res.render("list", { listTitle: "Work List", newListItems: workItems });
});

app.get("/about", function (req, res) {
    res.render("about");
});

app.listen(3000, function (req, res) {
    console.log("Server started at 3000")
});