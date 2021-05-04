const article = mongoose.model('article');

function removeArticle(req, res) {
    article.deleteOne({_id: req.query.id}, function (err, docs) {
        if (err) {
            console.error(err)
        } else {
            if(docs){
                res.send(docs)

            }else {
                console.log("not found")
            }
        }
    })
}

module.exports = removeArticle;