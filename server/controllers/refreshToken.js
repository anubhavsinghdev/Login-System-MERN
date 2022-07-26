const User = require('../models/user');
const jwt = require('jsonwebtoken');

module.exports.refreshToken = async(req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if(!refreshToken) return res.sendStatus(401);
        const user = await User.findOne({
            where:{
                refresh_token: refreshToken
            }
        });
        if(!user) return res.sendStatus(403);
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if(err) return res.sendStatus(403);
            const uid = user._id;
            const fullname = user.fullname;
            const username = user.username;
            const email = user.email;
            const accessToken = jwt.sign({uid, fullname, username, email}, process.env.ACCESS_TOKEN_SECRET,{
                expiresIn: '15s'
            });
            res.json({ accessToken });
        });
    } catch (error) {
        console.log(error);
    }
}