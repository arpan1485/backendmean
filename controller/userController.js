var user = require('../model/user.js');
var bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config.json')
exports.getUsers = (req, res, next) => {
    user.find(function (err, user) {
        if (err) {
            res.json(err);
        }
        else {
            res.json(user);
        }
    })
};


exports.registerUsers = (req, res, next) => {
    let newuser = new user({
        id: req.body.id,
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        loginname: req.body.loginname,
        password: req.body.password,
        status: req.body.status,
        role: req.body.role

    });
    newuser.save(function (err, item) {

        if (err) {
            res.json(err);

        } else {
            res.json({ msg: "user added succesfully." });
        }
    });

};


async function authenticate({ loginname, password }) {

    const userlogin = await user.findOne({ loginname });
    if (userlogin && bcrypt.compareSync(password, userlogin.password)) {
        const { password, ...userWithoutpassword } = userlogin.toObject();
        const token = jwt.sign({ sub: userlogin.id }, config.secret, { expiresIn: config.tokenLife });
        const refreshToken = jwt.sign({ sub: userlogin.id }, config.refreshTokenSecret, { expiresIn: config.refreshTokenLife })
        return {
            ...userWithoutpassword,
            token,
            refreshToken
        };

    }
}


exports.userLogin = (req, res, next) => {
    authenticate(req.body)
        .then(user => user ? res.json(user) :
            res.status(400).json({ message: 'Username or password is incorrect' }))
        .catch(err => next(err));

};



async function checkUsernameandUpdate(req) {
    const userfind = await user.findOne({ "id": req.params.id });
    if (!userfind) throw 'User not found';
    if (userfind.loginname !== req.body.loginname && await user.findOne({ loginname: req.body.loginname })) {
        throw 'Username ' + req.body.loginname + ' is already taken';
    }
    if (req.body.password) {
        hashpassword = bcrypt.hashSync(req.body.password, 10);
    }
    await user.findOneAndUpdate({ "id": req.params.id }, {
        $set: {
            "name": req.body.name,
            "email": req.body.email,
            "phone": req.body.phone,
            "loginname": req.body.loginname,
            "password": hashpassword,
            "status": req.body.status
        }
    });
    return await user.findOne({ "id": req.params.id });
}

exports.updateUser = (req, res, next) => {
    checkUsernameandUpdate(req).then(item => { console.log(item); res.json(item); })
        .catch(err => res.json({ "msg": err }));
};



exports.deleteUser = (req, res, next) => {
    user.remove({ "_id": req.params.id },
        function (err, item) {
            console.log(" removed_ ", item, req.params.id);
            if (err) {
                res.json(err);

            } else {
                res.json({ msg: "user remove succesfully" });
            }
        });

};




