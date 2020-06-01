const express = require('express');
const connectDB = require('./config/db')
const path = require('path');


const app = express();


connectDB();

//Init middleware
app.use(express.json({ extended: false }))


// Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/create', require('./routes/api/create-quest'));
app.use('/api/quest', require('./routes/api/quest'));



// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
/*
    app.use (function (req, res, next) {
        if (req.secure) {
                next();
        } else {
            // request was via http, so redirect to https
            res.redirect('https://' + req.headers.host + req.url);
        }
    });
*/

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    });
}


app.use((err, req, res, next) => {

    //console.log("error", err);
    //console.log("res", res);
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    console.log("errors", err.errors);

    res.status(err.statusCode).json({
        status: err.status,
        errors: err.errors
    });
});



const PORT = process.env.PORT || 5000;


app.listen(PORT, () => console.log(`Server started on port ${PORT}`));


