const { Router } = require("express");
const router = Router();
const multer = require('multer');

const storage = mult.diskStorage({
    destination: function (req,file,cb){
        return cb(null , "./public/uploads");
    },
    filename: function (req,file,cb){
        return cb(null , `${Date.now()}-${file.originalname}`);
    },
});

router.get("/add-new" , (req,res) => {
    return res.render("add-blog" , {
        user: req.user,
    });
});

router.post('/blog' , (req,res) => {

});