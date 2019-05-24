// npm init
// npm i express body-parser request
const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set('view engine', 'ejs');

var items=["Buy Food", "Cook Food", "Eat Food"];
var workItems = [];

app.get("/", function (req, res) {

    let day = date.getDate();
    

    res.render("list", {
        listTitle: day,
        newListItems : items
    });

    app.post("/", function(req, res){

       var item = req.body.new;

       if (req.body.list === "Work") {

        workItems.push(item);
        res.redirect ("/work");
           
       } else {
        items.push(item);

        res.redirect("/");
       }
    });
});

 app.get("/work", function(req,res){
     res.render("list", {listTitle: "Work List", newListItems: workItems});
 });

app.listen(3000, function () {
    console.log("Server is running on port 3000.");
});