mongoose = require('mongoose');

const article = mongoose.model('article');

categoryFilter = function (req, res) {
        article.find(req.query.filterSelected ? {listingType: req.query.filterSelected} : {}, function (err, docs) {
            if (err) {
                console.error(err)
            } else {
                res.send(docs)
            }
        });
};

module.exports = categoryFilter;