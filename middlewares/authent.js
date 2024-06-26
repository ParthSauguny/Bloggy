const { validateToken } = require("../Services/auth");

function checkforAuthenticationCookie(cookiename){
    return (req,res,next)=>{
        const tokenCookieValue = req.cookies[cookiename];
        if(!tokenCookieValue){
            return next();
        }

        try {
            const userPaylod = validateToken(tokenCookieValue);
            req.user = userPaylod;
        } catch (error) {}
        return next();
    };
}

module.exports = {
    checkforAuthenticationCookie,
}