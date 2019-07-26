const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const db = require('../database')

const Schema = mongoose.Schema;

const postSchema = new Schema({
    title:{
        type: String
    },
    content:{
        type:String
    },
    create:{
        type: Date
    },
    like:{
        type:Number
    }
});
const Post = db.model('Post', postSchema);
module.exports = Post; // k duoc de {}