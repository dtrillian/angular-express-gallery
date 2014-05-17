
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
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    fixtures = require('pow-mongoose-fixtures'),
    multipart = require('connect-multiparty'),
    multipartMiddleware = multipart(),
    bodyParser = require('body-parser'),
    photoGalleries = __dirname+'/uploads/photoGalleries/';


mongoose.connect('mongodb://localhost/bsdev-exo');


// Load Fixtures
fixtures.load({

});


var app = express();

// all environments
app.set('port', process.env.PORT || 8080);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.bodyParser({uploadDir:'./uploads'}));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

app.all('*', function(req, res, next) {
    console.log(authorizeDomain);
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.get('/', routes.index);
app.get('/image', image.list);
app.get('/gallery', gallery.list);



/* API CRUD */

/*Create*/
app.post('/gallery/create',multipartMiddleware, gallery.create);
app.post('/image/create',multipartMiddleware, image.create);

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

app.get('/upload/galleriePhoto/:id', function(req,res){
    var uid = req.params.id;
    console.log('./uploads/photoGalleries/' + uid + '.png');
    res.sendfile('./uploads/photoGalleries/' + uid + '.png');
});


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
