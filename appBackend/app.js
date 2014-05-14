
/**
 * Module dependencies.
 */

var express = require('express'),
    mongodb = require('mongodb'),
    routes = require('./routes'),
    image = require('./routes/image'),
    gallery = require('./routes/gallery'),
    http = require('http'),
    domainAllow = ['*','http://bsexercice.dev'],
    authorizeDomain = domainAllow.join(),
    mongoose = require('mongoose'), Schema = mongoose.Schema,
    fixtures = require('pow-mongoose-fixtures'),
    multipart = require('connect-multiparty'),
    multipartMiddleware = multipart();

mongoose.connect('mongodb://localhost/bsdev-exo');

/* Load Fixtures */
fixtures.load({

});

/* End MongoDatabase */

var app = express();

// all environments
app.set('port', process.env.PORT || 8080);
//app.set('views', path.join('./appFrontEnd/views/html'));
//app.set('view engine', 'html');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
//app.use(express.static(path.join('./appFrontEnd/public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.all(authorizeDomain, function(req, res, next) {
    console.log(authorizeDomain);
    res.header("Access-Control-Allow-Origin", authorizeDomain);
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

app.get('/', routes.index);
app.get('/image', image.list);
app.get('/gallery', gallery.list);



/* API CRUD */

    /*Create*/
app.post('/gallery/create',multipartMiddleware, gallery.create);
app.post('/image/create', image.create);

    /* Show */
app.get('/gallery/:id', gallery.show);
app.get('/image/:id', image.show);

    /* Delete */
app.del('/gallery/delete', gallery.delete);
app.del('/image/delete', image.delete);

    /* Update */
app.put('/gallery', gallery.update);
app.put('/image', image.update);

/* END API CRUD */


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
