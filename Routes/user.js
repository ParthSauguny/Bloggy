const { Router } = require("express");
const User = require("../models/user");
const router = Router();

router.get('/signup' , (req,res) => {
    return res.render("signup");
});

router.get('/signin' , (req,res) => {
    return res.render("signin");
});

router.post("/signup" , async(req,res) => {
    const {Fullname , email , password} = req.body;
    await User.create({
        Fullname,
        email,
        password,
    });
    return res.redirect('/');
});

router.post('/signin' , async(req,res) => {
    const {email,password} = req.body;
    const user = await User.matchPassword(email,password);

    console.log("USER",user);
    return res.redirect("/");
});

module.exports = router;