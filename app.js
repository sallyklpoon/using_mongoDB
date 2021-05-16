const express = require("express");
let app = express();
const mongoose = require ('mongoose');


// ==========================================
// Set up Express
// ==========================================
app.use(express.urlencoded({
    extended: true
}));
app.use(express.static("public"));
app.use(express.json());
app.set("view engine", "ejs");


// ==========================================
// Set up Mongo DB
// ==========================================


let db_url = "mongodb+srv://root:1234@cluster0.ztxlv.mongodb.net/myDatabase?retryWrites=true&w=majority";
mongoose.connect(db_url, {useNewUrlParser: true, useUnifiedTopology: true});

let items = require('./models/items');

let db = mongoose.connection;

db.once('open', () => {
    console.log('Connection was successful');
})


// ========================================
// Routes
// ========================================


// Render to do list
app.get("/", (req, res) => {
    items.find()
    .then(items => {
        res.render('index.ejs', { items: items })
    })

});


app.get("/myForm", (req, res) => res.render("pages/myForm"));


/**
 * POST request from myForm using urlencoded
 */
app.post("/myForm", (req, res) => {

    let items_list = req.body.items.split(',')
    res.render('pages/result', {
        items: items_list
    })

});


/**
 * GET request using req.query
 */
app.get("/myListQueryString", (req, res) => {

    let items_list = [req.query.item1, req.query.item2]
    res.render('pages/result', {
        items: items_list
    })

});


/**
 * GET request using req.params
 */
app.get("/myList/:item1/:item2", (req, res) => {

    let items_list = [req.params.item1, req.params.item2]
    res.render('pages/result', {
        items: items_list
    })

});


app.listen(3000);