const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    contact: {
        type: Number,
        required: true
    },
    profession: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    confirmPassword: {
        type: String,
        required: true
    },
    Token: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ]
});

//hasing the password
// userSchema.pre('save', async function (next) {
//     if (this.isModified('password')) {
//         this.password = await bcrypt.hash(this.password, 10);
//         this.cpassword = await bcrypt.hash(this.cpassword, 10);
//     }
//     next();
// });

//generating token
userSchema.methods.generateAuthToken = async function () {
    try {
        let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
        // this.Tokens = this.Tokens.concat({ token });

        await this.save();
        return token;
    }
    catch (err) {
        console.log(err); const jwt = require('jsonwebtoken');
        const User = require('../models/userSchema');


        const Authenticate = async (req, res, next) => {
            try {
                //get cookie
                const token = req.cookies.jwtLogin;
                //verify token 
                const verifyToken = jwt.verify(token, process.env.SECRET_KEY)
                //find the authenticateuser
                const authenticateUser = await User.findOne({ _id: verifyToken._id, "Tokens.token": token })

                if (!authenticateUser) {
                    throw new Error('User not found')
                }
                req.token = token;
                req.authenticateUser = authenticateUser;
                req.userId = authenticateUser._id;

                next();
            }
            catch (err) {
                res.status(401).send('Unauthorized: No token Provided');
                console.log(err)
            }

        }

        module.exports = Authenticate;
    }
}


//model for users collection
const User = mongoose.model('User', userSchema);

module.exports = User;