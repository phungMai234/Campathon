const user = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const response = require('../utils/response');
const key = require('../key.json');
const db = require('../database');

exports.register = async (req, res) =>{
    try{
        const {username, email, password} = req.body;

        if(!password || !username ||!email){
            throw new Error("Please fill in form");
        }

        if(password.length < 8){
            throw new Error("Password must have at least eight characters")
        }

        const userExist = await user.findOne({username: username})


        if(userExist){
            throw new Error('The username is already exist on this account!');
        }

        const newUser = new user({
            username:username,
            email: email,
            password:password,
            created:Date.now()
        });
        console.log(newUser.id)
        newUser.hash_password = await bcrypt.hashSync(password, 10);
        await newUser.save();
        return res.json(response.success(newUser));
    }
    catch (e) {
        res.json(response.fail(e));
    }

};
exports.login = async (req, res) =>{

    try{
        let {username, password} = req.body;
        const userSignin = await user.findOne({username: username});
        if(!userSignin)
        {
            throw new Error("Authentication failed. User not found");
        }

        const match = await bcrypt.compareSync(password, userSignin.hash_password)
        const sixHours = 6*60*60;
        if(match)
        {
            const token = jwt.sign({

                    id:userSignin.id
                },
                key.ACCESS_SECRET_KEY,
                {
                    expiresIn: sixHours
                })
            return res.json(response.success({token}));
        }
        else {
            throw new Error("Authentication failed. Wrong password");
        }
    }
    catch (e) {
        res.json({
            success: false,
            error: e.message
        })
    }
};

exports.changePassword = async (req, res) =>{
    try {

        const {old_password, new_password} = req.body;
        const usernow = await user.findOne({id:req.tokenData.id});
        if(usernow)
        {
            const match = bcrypt.compareSync(old_password, user.password)
            if(match)
            {
                if(new_password.length < 8){
                    throw new Error("Password must have at least eight characters")
                }
                let salt = await bcrypt.genSalt(10);
                let hashPassword = await bcrypt.hash(new_password, salt);
                await usernow.update({
                    hash_password:hashPassword
                },{
                    where:{
                        id:req.tokenData.id
                    }
                })
                return res.json(response.success({}));
            }
            else
            {
                throw new Error(" Wrong password")
            }
        }
        else
        {
            throw new Error("User is not exist")

        }
    }
    catch (e) {
        res.json(response.fail(e));
    }
}