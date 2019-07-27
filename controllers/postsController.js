const Post = require('../models/postsModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const response = require('../utils/response');
const db = require('../database');

exports.createPost = async (req, res) =>{
    try {
        const {title, image, content} = req.body;
        if(!title || !content)
            throw new Error("Please fill full");

        let PostCheck = await Post.findOne({title:title})

        if(PostCheck)
            throw new Error("The Title "+"\""+ title +"\"" + " already exist in this database");
        else
        {
           const newPost = new Post({
               title:title,
               image:image,
               content:content,
               create:Date.now(),
               like: 0
           })
            await  newPost.save();
           return res.json(response.success({newPost}))
        }

    }
    catch (e) {
        res.json(response.fail(e));
    }
}
exports.searchPost = async (req, res)=>{
    try {
        const {keyword} = req.body;
        if(!keyword)
            throw new Error("full text is empty");
        let data = await Post.find({$text: {$search: keyword}}, {score: {$meta: "textScore"}}).sort({score:{$meta:"textScore"}})
        if(!data)
        {
            throw new Error("No result");
        }
        else
            return res.json(response.success({data}));

    }
    catch (e) {
        res.json(response.fail(e));
    }
}
exports.listTitle = async (req, res) =>{
    try {
        const titles = await Post.find();
        return res.json(response.success(titles));

    }
    catch (e) {
        res.json(response.fail(e));
    }
}
exports.getTitleByID = async (req, res)=>{
    try {

    }
    catch (e) {
        res.json(response.fail(e));
    }
}