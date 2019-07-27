const Comment = require('../models/commentModel');
const Post = require('../models/postsModel');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const response = require('../utils/response');
const db = require('../database');

exports.createComment = async (req, res)=>{
    try {
        const {content} = req.body;
        const {id} = req.params;

        if(!content)
            throw new Error("you have not commnent yet");
        const usernow = await User.findById(req.tokenData.id)
        if(usernow)
        {
            const newComment = new Comment({
                content:content,
                post_id:id,
                user_id:usernow._id,
                create: Date.now()
            })
            console.log(newComment.post_id);
            await newComment.save();
            return res.json(response.success(newComment))
        }
        else {
           throw new Error("you must be login")
        }

    }
    catch (e) {
        res.json(response.fail(e));

    }
}

exports.listComment = async (req, res)=>{
    try {
        const {id} = req.params;
        const listcomment = await Comment.find({post_id: id});
        return res.json(response.success({listcomment}));
    }
    catch (e) {
        return res.json(response.fail(e));
    }
}