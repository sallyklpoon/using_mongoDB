const express = require('express');
let app = express();
const mongoose = require ('mongoose');

let db_url = "mongodb+srv://root:1234@cluster0.ztxlv.mongodb.net/myDatabase?retryWrites=true&w=majority";
mongoose.connect(db_url, {useNewUrlParser: true, useUnifiedTopology: true});

