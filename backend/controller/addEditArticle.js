mongoose = require('mongoose');
fs = require('fs');

const moment = require('moment');
const jwt = require('jsonwebtoken');

const dotenv = require('dotenv');
const signUpUserDatabase = mongoose.model('signUpUser');
const article = mongoose.model('article');


module.exports.addNewListing = function (req, res) {
    dotenv.config();
    const userToken = req.headers['x-access-token'];
    if (!userToken) return res.send("no token provided");

    const decodedEmail = jwt.verify(userToken, process.env.TOKEN_SECRET, function (err, decoded) {
        if (err) {
            return res.send({
                error: 'Failed to authenticate'
            });
        }
        return decoded
    });
    signUpUserDatabase.findOne({email: decodedEmail}, function (err, docs) {
        article.create({
            ownerEmail: docs.email,
            ownerName: docs.name,
            articleTitle: req.body.params.name,
            articlePerex: req.body.params.articlePerex,
            articleBody: req.body.params.articleBody,
            listingType: req.body.params.category,
            dateCreated: moment(),
        }, function (err, articleDocs) {
            const encodedId = jwt.sign(`${articleDocs._id}`, process.env.TOKEN_SECRET);
            article.updateOne({_id: articleDocs._id}, {encodedAvatarUrl: encodedId}, function (err, found) {
                if (err) {
                    console.log("This is happening " + err)
                }

                res.send(articleDocs);

            });
        })
    })

};

module.exports.editedArticle = function (req, res) {
    dotenv.config();
    const userToken = req.headers['x-access-token'];
    if (!userToken) return res.send("no token provided");

    article.findOne({_id: req.query.id}, function (err, docs) {
        if (err) {
            console.error(err);
        } else {
            res.send(docs)
        }
    })


};
module.exports.editedArticleUpdate = function (req, res) {
    dotenv.config();
    const userToken = req.headers['x-access-token'];
    if (!userToken) return res.send("no token provided");

    article.updateOne({_id: req.body.params.id}, {
        articleTitle: req.body.params.name,
        articleDescription: req.body.params.description,
        listingType: req.body.params.category,
        articlePerex: req.body.params.articlePerex,

    }, function (err, articleDocs) {
        res.send(articleDocs)
    })

};





