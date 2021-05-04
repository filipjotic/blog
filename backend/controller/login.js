const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

const signUpUserDatabase = mongoose.model('signUpUser');

getUser = function (req, res) {
    signUpUserDatabase.find({
        email: req.body.params.email,
    }, function (err, docs) {
        if (err) {
            console.log("Database connection error")
        } else {

            if (docs.length > 0) {

                bcrypt.compare(req.body.params.password, docs[0].password, function (err, result) {
                    if (result === true) {
                        dotenv.config();

                        function generateAccessToken(email) {
                            return jwt.sign(email, process.env.TOKEN_SECRET)
                        }

                        const generatedToken = generateAccessToken(req.body.params.email);

                        const fullDate = new Date();
                        const today = {
                            day: fullDate.getDate(),
                            month: fullDate.getMonth(),
                            year: fullDate.getFullYear()
                        };

                        signUpUserDatabase.updateOne(
                            {email: req.body.params.email},
                            {lastLogin: today, accessToken: generatedToken},
                        ).then(resalt => console.log(resalt));

                        res.send({token: generatedToken})
                    } else {
                        res.send("notUser")
                    }
                });
            } else {
                res.send("notUser")
            }
        }

    });
};

module.exports = getUser;