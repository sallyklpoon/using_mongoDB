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

let Items = require('./models/items');

let db = mongoose.connection;

db.once('open', () => {
    console.log('Connection was successful');
})


// ========================================
// Routes
// ========================================


// Render to do list
app.get("/", (req, res) => {
    Items.find()
    .then(items => {
        res.render('index.ejs', { items: items })
    })

});


app.get("/myForm", (req, res) => res.render("myForm.ejs"));


/**
 * POST request from myForm using urlencoded
 */
app.post("/myForm", (req, res) => {

    let new_items = Object.values(req.body);

    console.log(new_items)


    for(let i=0; i<new_items.length; i++) {

        let item = new Items({ item: new_items[i] })

        item.save({ item: new_items[i] })
        .then(result => {
            res.redirect('/')
        })
        .catch(err => console.error(err))

    }

});


app.put('/', (req, res) => {

    console.log(req.body)

    Items.findOneAndUpdate(
        { item: req.body.mod_item },
        {
            $set: {
                item: req.body.update_item
            }
        },
        {
            upsert: true
        }
    )
    .then(result => res.json('Success'))
    .catch(err => console.error(err))
})


/**
 * GET request using req.params
 */

// app.get("/myList/:item1/:item2", (req, res) => {

//     let items_list = [req.params.item1, req.params.item2]
//     res.render('pages/result', {
//         items: items_list
//     })

// });


app.listen(3000);