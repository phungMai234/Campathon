const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const database = require("../database");

const Schema = mongoose.Schema;

const voteShema = new Schema({
    user_id:{
        type:String
    },
    post_id:{
        type:String
    }
});

const Vote = database.model('Vote', voteShema);
module.exports = Vote;