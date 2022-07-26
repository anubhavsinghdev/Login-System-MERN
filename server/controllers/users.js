const User = require('../models/user');
const jwt = require('jsonwebtoken');

module.exports.getUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (error) {
        console.log(error);
    }
}

module.exports.register = async (req, res) => {
    const {
        fullname, username, password, email
    } = req.body;

    User.find({
        username: username
    }, async (err, docs) => {
        if (docs.length) {
            res.status(409).send('Username Already Registered');
        } else {
            const user = new User({
                fullname, username, password, email
            })
            await user.save();
            res.status(201).send('User Registered');
        }
    })
}

module.exports.login = async (req, res) => {
    const {
        username, password
    } = req.body;

    const foundUser = await User.findAndValidate(username, password);
    if (foundUser) {
        const uid = foundUser._id;
        const accessToken = jwt.sign({ uid, username }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '15s'
        });
        const refreshToken = jwt.sign({ uid, username }, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '1d'
        });
        await User.findOneAndUpdate({ username: username }, {
            refresh_token: refreshToken
        });
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        });

        res.status(200).json({ accessToken });
    } else {
        res.status(401).send("Username/Password Incorrect");
    }
}

module.exports.logout = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(204);
    const user = await User.findOne({
        where: {
            refresh_token: refreshToken
        }
    });
    if (!user) return res.sendStatus(204);
    const uid = user._id;
    await User.updateOne({ refresh_token: null }, {
        where: {
            _id: uid
        }
    });
    res.clearCookie('refreshToken');
    return res.sendStatus(200);
}