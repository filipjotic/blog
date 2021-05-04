mongoose = require('mongoose');
let dbUrl = 'mongodb://localhost/ezmid';

mongoose.connect(dbUrl);

// CONNECTION EVENTS
mongoose.connection.on('connected', function () {
    console.log('Mongoose connected to ' + dbUrl);
});
mongoose.connection.on('errorho', function (err) {
    console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose disconnected');
});

const signUpUser = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    joinedDate: Object,
});
const article = mongoose.Schema({
    ownerEmail : String,
    ownerName : String,
    articleTitle: {type : String},
    articleBody: String,
    articlePerex : String,
    listingType: String,
    dateCreated: Date,
});

mongoose.model('signUpUser', signUpUser);
mongoose.model('article', article);




