const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const app = express();

require('./model/db');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
});

app.get("/signUpUser", cors(), (req, res) => {
    console.info("GET /simple-cors");
    res.json({
        text: "Simple CORS requests are working. [GET]"
    });
});
app.get("/getUser", cors(), (req, res) => {
    console.info("GET /simple-cors");
    res.json({
        text: "Simple CORS requests are working. [GET]"
    });
});
app.get("/addNewListing", cors(), (req, res) => {
    console.info("GET /simple-cors");
    res.json({
        text: "Simple CORS requests are working. [GET]"
    });
});


app.post("/signUpUser", cors(), (req, res) => {
    console.info("POST /simple-cors");
    res.json({
        text: "Simple CORS requests are working. [POST]"
    });
});
app.post("/getUser", cors(), (req, res) => {
    console.info("POST /simple-cors");
    res.json({
        text: "Simple CORS requests are working. [POST]"
    });
});
app.post("/addNewListing", cors(), (req, res) => {
    console.info("POST /simple-cors");
    res.json({
        text: "Simple CORS requests are working. [POST]"
    });
});


const issue2options = {
    origin: ['https://softmagicbackend.herokuapp.com','http://localhost:3000'],
    methods: ["POST"],
    credentials: true,
    maxAge: 3600
};
app.options("/signUpUser", cors(issue2options));
app.options("/getUser", cors(issue2options));
app.options("/addNewListing", cors(issue2options));

app.post("/signUpUser", cors(issue2options), (req, res) => {
    console.info("POST /issue-2");
    res.json({
        text: "Issue #2 is fixed."
    });
});
app.post("/getUser", cors(issue2options), (req, res) => {
    console.info("POST /issue-2");
    res.json({
        text: "Issue #2 is fixed."
    });
});
app.post("/addNewListing", cors(issue2options), (req, res) => {
    console.info("POST /issue-2");
    res.json({
        text: "Issue #2 is fixed."
    });
});

app.options("/signUpUser", cors());
app.options("/getUser", cors());
app.options("/addNewListing", cors());

app.delete("/signUpUser", cors(), (req, res) => {
    console.info("DELETE /complex-cors");
    res.json({
        text: "Complex CORS requests are working. [DELETE]"
    });
});
app.delete("/getUser", cors(), (req, res) => {
    console.info("DELETE /complex-cors");
    res.json({
        text: "Complex CORS requests are working. [DELETE]"
    });
});
app.delete("/addNewListing", cors(), (req, res) => {
    console.info("DELETE /complex-cors");
    res.json({
        text: "Complex CORS requests are working. [DELETE]"
    });
});

app.listen(5000, () => {
    console.log(`Example app listening at http://localhost:5000`)
})
