const article = mongoose.model('article');

function detail(req, res) {
    article.find({_id: req.query.id}, function (err, docs) {
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

module.exports = detail;