const article = mongoose.model('article');

function homepage(req, res) {
    article.find({}, function (err, docs) {
        if (err) {
            console.error(err)
        } else {
            res.send(docs)
        }
    })
}

module.exports = homepage;