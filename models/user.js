const {Schema , model} = require('mongoose');
const {createHmac , randomBytes} = require("crypto");
const { error } = require('console');
const { createTokenforUser } = require('../Services/auth');

const userSchema = new Schema({
    Fullname:{
        type:String,
        required: true,
    },
    email:{
        type:String,
        required:true,
        unique: true,
    },
    salt:{
        type:String,
    },
    password:{
        type:String,
        required:true,
    },
    profileimageurl:
    {
        type: String,
        default: "../public/images/default-pfp.webp"
    },
    role:{
        type: String,
        enum: ["USER" , "ADMIN"],
        default: "USER",
    }
} , {timestamps: true});

userSchema.pre("save" , function (next){
    const user = this;

    if(!user.isModified("password")) return;
    const salt = randomBytes(16).toString();//ifnot work , hard code it
    const hashedPassword = createHmac("sha256" , salt).update(user.password).digest("hex");

    this.salt = salt;
    this.password = hashedPassword;

    next();
});

userSchema.static("matchPasswordandgenerateToken" , async function(email,password){
    const user = await this.findOne({email});
    if(!user) throw new error("User not found");

    const salt = user.salt;
    const hashedPassword = user.password;

    const userProvidedHash = createHmac("sha256" , salt).update(user.password).digest("hex");

    if(hashedPassword !== userProvidedHash) throw new error("Incorrect info");
    
    const token = createTokenforUser(user);
    return token;
})

const User = model('user' , userSchema);
module.exports = User;