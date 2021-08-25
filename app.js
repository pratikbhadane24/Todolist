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

const listSchema = {
    name: String,
    items: [ itemsSchema ]
};

const List = mongoose.model("List", listSchema);


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

app.get("/:customListName", function (req, res) {
    const customListName = req.params.customListName

    List.findOne({ name: customListName }, function (err, foundList) {
        if (!err) {
            if (!foundList) {
                const list = new List({
                    name: customListName,
                    items: defaultItems
                });

                list.save();
                res.redirect("/" + customListName);
            } else {
                res.render("list", { listTitle: foundList.name, newListItems: foundList.items });
            }
        }
    });
});


app.post("/", function (req, res) {
    const itemName = req.body.newItem
    const item = new Item({
        name: itemName
    });
    item.save();
    res.redirect("/");
});

app.post("/delete", function (req, res) {
    const checkedItemId = req.body.checkbox;

    Item.findByIdAndRemove(checkedItemId, function (err) {
        if (!err) {
            console.log("success delete");
            res.redirect("/");
        }
    });
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