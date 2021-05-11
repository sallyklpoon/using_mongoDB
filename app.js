const express = require("express");

let app = express();
    app.use(express.urlencoded({extended: true}));
    app.use(express.static("public"));
    app.set("view engine", "ejs");

app.get("/", (req, res)=> res.render("pages/index"));




app.get("/myForm", (req, res) => res.render("pages/myForm"));


/**
 * POST request from myForm using urlencoded
 */
app.post("/myForm", (req, res) => {
    
    let items_list = req.body.items.split(',')
    res.render('pages/result', {items: items_list})

});


/**
 * GET request using req.query
 */
app.get("/myListQueryString", (req, res) => {

    let items_list = [req.query.item1, req.query.item2]
    res.render('pages/result', {items: items_list})

});


/**
 * GET request using req.params
 */
app.get("/myList/:item1/:item2", (req, res) => {
    
    let items_list = [req.params.item1, req.params.item2]
    res.render('pages/result', {items: items_list})

});


app.listen(3000);