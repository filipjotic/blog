const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

const article = mongoose.model('article');
const signUpUserDatabase = mongoose.model('signUpUser');

function dashboard(req, res) {
    dotenv.config();
    const userToken = req.headers['x-access-token'];
    if (!userToken) return res.send("no token provided");

    let decodedEmail = jwt.verify(userToken, process.env.TOKEN_SECRET, function (err, decoded) {
        if (err) {
            return res.send({
                error: 'Failed to authenticate'
            });
        }
        return decoded
    });

    signUpUserDatabase.findOne({email: decodedEmail}, function (err, docs) {
        if (err) {
            console.error(err)
        } else {
            article.find({ownerEmail: decodedEmail}, function (err, articleDocs) {
                if (err) {
                    console.error(err)
                } else {
                    res.send(articleDocs);
                }
            })

        }
    });

}

module.exports = dashboard;