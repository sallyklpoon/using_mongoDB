const express = require("express");
let app = express();
const mongoose = require('mongoose');


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
mongoose.connect(db_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

let Items = require('./models/items');

let db = mongoose.connection;

db.once('open', () => {
    console.log('Connection was successful');
})


// ========================================
// Routes
// ========================================


/**
 * GET request to '/' renders index with Items collection items.
 */
app.get("/", (req, res) => {
    Items.find()
        .then(items => {
            res.render('index.ejs', {
                items: items
            })
        })

});


app.get("/myForm", (req, res) => res.render("myForm.ejs"));


/**
 * POST to 'myForm' saves submitted form items to Items collection.
 */
app.post("/myForm", (req, res) => {

    // retrieve an array of the items to be added
    let new_items = Object.values(req.body);

    // for each new item, save to the Items collection
    for (let i = 0; i < new_items.length; i++) {

        let item = new Items({
            item: new_items[i].toLowerCase()
        })

        item.save({
                item: new_items[i]
            })
            .then(result => {
                res.redirect('/') // redirect to '/' after saving
            })
            .catch(err => console.error(err))

    }

});

/**
 * PUT request to '/', find the item to modify in the Items collection and update it.
 */
app.put('/', (req, res) => {

    Items.findOneAndUpdate({
            item: req.body.mod_item              // find the item to modify
        }, {
            $set: {
                item: req.body.update_item
            }
        })
        .then(result => {
            if (result === null) {
                res.json('null')                // if search result found nothing
            } else {
                res.json('Success')             // search found something to update!
            }
        })
        .catch(err => console.error(err))
})

/**
 * DELETE request made to '/' will search the item to delete in Items collection
 */
app.delete('/', (req, res) => {
    Items.deleteOne({
            item: req.body.del_item                 // find the item to delete
        })
        .then(result => {
            if (result.deletedCount === 0) {        // if nothing was deleted
                res.json('Nothing deleted')
            } else {                                // else, something was deleted!
                res.json('Success')
            }
        })
        .catch(err => console.error(err))
})


app.listen(3000);