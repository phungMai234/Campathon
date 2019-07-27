const Comment = require('../models/commentModel');
const Post = require('../models/postsModel');
const User = require('../models/userModel');
const Vote = require('../models/voteModel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const response = require('../utils/response');
const db = require('../database');

exports.createVote = async (req, res)=>{
    try {
        const {user_id, post_id} = req.body;
        const newVote = new Vote({
            user_id:user_id,
            post_id:post_id
        })
    }catch (e) {
        return res.json(response.fail(e))
    }

}