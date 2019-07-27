const express = require('express');
const BodyParser = require('body-parser');
let config = require("config");

let port = process.env.PORT || config.get('PORT');
let host = process.env.HOST || config.get('HOST');

const app = express();
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

app.use("/user", require('./routers/userRouter'));
app.use("/posts", require('./routers/postsRouter'));


app.listen(port, host, function (err) {
    if(err)
    {
        console.log(err);
    }
    else
        console.log(`Your port and host is ${port}, ${host}`);
})