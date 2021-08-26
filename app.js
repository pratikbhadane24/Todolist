const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");

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


app.get("/", (req, res) => {

    Item.find({ }, (err, foundItems) => {

        if (foundItems.length === 0) {
            Item.insertMany(defaultItems, (err) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Successfully saved default items to DB.");
                }
            });
            res.redirect("/");
        } else {
            res.render("list", { listTitle: "Today", newListItems: foundItems });
        }
    });
});

app.get("/:customListName", (req, res) => {
    const customListName = _.capitalize(req.params.customListName)

    List.findOne({ name: customListName }, (err, foundList) => {
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


app.post("/", (req, res) => {
    const itemName = req.body.newItem;
    const listName = req.body.list;

    const item = new Item({
        name: itemName
    });

    if (listName === "Today") {
        item.save();
        res.redirect("/");
    } else {
        List.findOne({ name: listName }, (err, foundList) => {
            foundList.items.push(item);
            foundList.save();
            res.redirect("/" + listName);
        })
    }
});

app.post("/delete", (req, res) => {
    const checkedItemId = req.body.checkbox;
    const listName = req.body.listName;

    if (listName === "Today") {
        Item.findByIdAndRemove(checkedItemId, (err) => {
            if (!err) {
                console.log("success delete");
                res.redirect("/");
            }
        });
    } else {
        List.findOneAndUpdate({ name: listName }, { $pull: { items: { _id: checkedItemId } } }, (err, foundList) => {
            if (!err) {
                res.redirect("/" + listName);
            }
        });

    }

});


app.get("/work", (req, res) => {
    res.render("list", { listTitle: "Work List", newListItems: workItems });
});

app.get("/about", (req, res) => {
    res.render("about");
});

app.listen(3000, (req, res) => {
    console.log("Server started at 3000")
});