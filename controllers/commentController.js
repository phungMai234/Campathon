const Comment = require('../models/commentModel');
const Post = require('../models/postsModel');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const response = require('../utils/response');
const db = require('../database');

exports.createComment = async (req, res)=>{
    try {
        const {cmmt, user_id, post_id} = req.body;
        if(!cmmt || !user_id ||!post_id)
            throw new Error("you have not commnent yet");
        const newComment = new Comment({
            content: cmmt,
            user_id:user_id,
            post_id:post_id
        })
        await newComment.save();
        return res.json(response.success(newComment))
    }
    catch (e) {
        res.json(response.fail(e));

    }
}