const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const database = require("../database");

const Schema = mongoose.Schema;

const cmmtShema = new Schema({
    content:{
        type:String,
        trim:true,
        required:true
    },
    user_id:{
        type: String
    },
    post_id:{
        type: String
    }
}, {versionKey: false});

const Comment = database.model('Comment', cmmtShema);
module.exports = Comment;