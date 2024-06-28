const { Router } = require("express");
const router = Router();
const multer = require('multer');
const path = require("path");
const Blog = require("../models/blog");

const storage = multer.diskStorage({
    destination: function (req,file,cb){
        cb(null , path.resolve(`./public/uploads/`));
    },
    filename: function (req,file,cb){
        const filename = `${Date.now()}-${file.originalname}`;
        cb(null , filename);
    },
});

const upload = multer({storage: storage});

router.get("/add-new" , (req,res) => {
    return res.render("add-blog" , {
        user: req.user,
    });
});

router.post('/' , upload.single() , async(req,res) => {
    const {title , body} = req.body;
    const Blog = Blog.create({
        body,
        title,
        createdby: req.user._id,
        coverimageURL: `uploads/${req.file.filename}`
    });
    return res.redirect(`/blogs/${Blog._id}`);
});

router.get("/:_id" , async(req,res) => {
    const blog = await Blog.findbyID(req.params.id);
    return res.render("blog" , {
        user: req.user,
        blog,
    });
});

module.exports = router;