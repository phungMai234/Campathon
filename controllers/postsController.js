const Post = require('../models/postsModel');
const User = require('../models/userModel')
const Vote = require('../models/voteModel')
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
    console.log("ui");
    try{

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
        res.json(response.fail(e))
    }
}
exports.searchDog= async (req, res)=>{
    try {

        let data = await Post.find({$text: {$search: "chó"}}, {score: {$meta: "textScore"}}).sort({score:{$meta:"textScore"}})
        if(!data)
        {
            throw new Error("No result");
        }
        else
            return res.json(response.success({data}));

    }
    catch (e) {
        console.log(e);
        res.json(response.fail(e.message));
    }
}
exports.searchCat= async (req, res)=>{

    try {
        let data = await Post.find({$text: {$search: "mèo"}})
        if(!data)
        {
            throw new Error("No result");
        }
        else
            return res.json(response.success({data}));

    }
    catch (e) {
        console.log(e);
        res.json(response.fail(e.message));
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
        const {id} = req.params;
        const fpost = await Post.findById(id);
        return res.json(response.success(fpost));
    }
    catch (e) {
        res.json(response.fail(e));
    }
}
exports.pressLike = async (req, res) =>{
    try {

        const {id} = req.params;
        const usernow = await User.findById(req.tokenData.id);
        if(!usernow)
        {
            throw new Error("You must be login");
        }
        else {
            const postnow = await Post.findById(id);
            let dem = postnow.like+1;
            console.log(dem);
            if(!postnow)
                throw new Error("No post is found");
            else
            {
                const voteNow = await Vote.findOne({user_id: usernow._id, post_id:id}) // de find se bi loi vi no tim tat ca
                if(!voteNow)
                {
                    console.log(dem);
                    await postnow.updateOne({
                        like: dem
                    })

                    const newVote = new Vote({
                        user_id: usernow._id,
                        post_id:id
                    })
                    await newVote.save();


                    return res.json(response.success({postnow}));
                }
                else
                {
                    throw new Error("you liked")
                }


            }
        }

    }
    catch (e) {
        res.json(response.fail(e))
    }
}