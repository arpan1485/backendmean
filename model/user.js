const mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
const UserSchema = mongoose.Schema(

    {

        id:
        {
            type: String,
            required: "unique Id required",
            unique: true

        },
        name:
        {
            type: String,
            required: true

        },
        loginname:
        {
            type: String,
            minlength: [4, 'long UserName'],
            maxlength: [20, 'long UserName'],
            required: true

        },
        phone:
        {
            type: Number,
            required: true

        },
        password:
        {
            type: String,
            required: "Password required",
            minlength: [4, 'long UserName'],
            maxlength: [20, 'long UserName']
        },
        status:
        {
            type: String,
            required: true

        },
        role:
        {
            type: String,
            required: true

        }



    }
);

UserSchema.pre('save', function (next) {
    var user = this;
  
    if (!user.isModified('password')) { return next() };
    bcrypt.hash(user.password, 10).then((hashedPassword) => {
        user.password = hashedPassword;
        next();
    })
},
    function (err) { next(err); }
)
const user = mongoose.model('user', UserSchema);
module.exports = user;
