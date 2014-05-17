/**
 * Module dependencies.
 */

var express = require('express'),
    mongodb = require('mongodb'),
    routes = require('./routes'),
    image = require('./routes/image'),
    gallery = require('./routes/gallery'),
    http = require('http'),
    domainAllow = ['*'],
    authorizeDomain = domainAllow.join(),
    allowedHost = {
        '*': true,
        'http://localhost:3001': true,
        'http://localhost:7357': true,
        'http://contestnco': true
    },
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    fixtures = require('pow-mongoose-fixtures'),
    multipart = require('connect-multiparty'),
    multipartMiddleware = multipart(),
    bodyParser = require('body-parser'),
    photoGalleries = __dirname + '/uploads/photoGalleries/';


mongoose.connect('mongodb://localhost/bsdev-exo');

// Load Fixtures
fixtures.load({

});


var app = express();

app.all('*', function(req, res, next) {
    if (allowedHost[req.headers.origin]) {
        res.header('Access-Control-Allow-Credentials', true);
        res.header('Access-Control-Allow-Origin', req.headers.origin);
        res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE');
        // res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        res.header('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
        next();
    } else {
        res.send(403, {
            auth: false
        });
    }
});

// all environments
app.set('port', process.env.PORT || 8080);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.session({
    secret: "@@@ A6E34B51D4 @@@",
    cookie: {
        httpOnly: true
    }
}));

app.use(express.csrf());
app.use(function(req, res, next) {
    res.cookie('_csrf', req.session._csrf);
    next();
});

app.use(app.router);
app.use(express.bodyParser({
    uploadDir: './uploads'
}));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/image', image.list);
app.get('/gallery', gallery.list);



/* API CRUD */

/*Create*/
app.post('/gallery/create', multipartMiddleware, gallery.create);
app.post('/image/create', multipartMiddleware, image.create);

/* Show */
app.get('/gallery/:id', image.showElementsByGallery);
app.get('/image/:id', image.show);
app.get('/gallery/show/:id', gallery.show);

/* Delete */
app.del('/gallery/delete', gallery.delete);
app.del('/image/delete', image.delete);

/* Update */
app.put('/gallery', gallery.update);
app.put('/image', image.update);

/* END API CRUD */

app.get('/upload/galleriePhoto/:id', function(req, res) {
    var uid = req.params.id;
    console.log('./uploads/photoGalleries/' + uid + '.png');
    res.sendfile('./uploads/photoGalleries/' + uid + '.png');
});


http.createServer(app).listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});