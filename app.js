// IMPORT CONFIG & DEPENDENCIES
const express = require('express');
const helmet = require('helmet');
const path = require('path');
const compression = require('compression');
const bodyParser = require('body-parser');
const multer = require('multer');
var fs = require('fs');
const serveIndex = require('serve-index');




const app = express();

// IMPORT ROUTES
const anindaRoutes = require('./routes/aninda');

app.use(bodyParser.json());  // application-json
//app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).single('image'));
// app.use('./images',express.static(path.join(__dirname,'images')));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
})

app.use('/ftp', express.static('public'), serveIndex('public', {'icons': true}));

//SETUP ROUTES
app.use('/api/aninda', anindaRoutes);

app.use(helmet());
app.use(compression());


app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
});

app.listen(process.env.PORT || 3000, () => {
    console.log('server started==>')
});

// app.listen( 3000, () => {
//     console.log('server started==>')
// });






