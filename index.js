const path = require('path');
const express = require('express');
const app = express();
const PORT = 8000;
const userRoutes = require("./Routes/user");
const mongo = require('mongoose');
const cookieparser = require("cookie-parser");
const { checkforAuthenticationCookie } = require('./middlewares/authent');

mongo.connect("mongodb://localhost:27017/bloggy")
.then((e) => console.log("connected to database !!"));

app.set('view engine' , 'ejs');
app.set('views' , path.resolve('./views'));

app.use(express.urlencoded({extended: false}));
app.use(cookieparser());
app.use(checkforAuthenticationCookie("token"));

app.get("/" , (req,res) => {
    res.render('home',{
        user: req.user,
    });
});

app.use("/user" , userRoutes);

app.listen(PORT , () => console.log("server has started at PORT" , PORT));