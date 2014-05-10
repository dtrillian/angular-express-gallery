
/**
 * Module dependencies.
 */

var express = require('express'),
    mongodb = require('mongodb'),
    routes = require('./routes'),
    image = require('./routes/image'),
    galerie = require('./routes/galerie'),
    http = require('http'),
    path = require('path'),
    mongoose = require('mongoose'), Schema = mongoose.Schema,
    fixtures = require('pow-mongoose-fixtures');

mongoose.connect('mongodb://localhost/bsdev-exo');

/* Load Fixtures */
fixtures.load({

});

/* End MongoDatabase */

var app = express();

// all environments
app.set('port', process.env.PORT || 8080);
app.set('views', path.join('./appFrontEnd/views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join('./appFrontEnd/public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/image', image.list);
app.get('/galerie', galerie.list);

/* API CRUD */

    /*Create*/
app.post('/galerie', galerie.create);
app.post('/image', image.create);

    /* Show */
app.get('/galerie/:id', galerie.show);
app.get('/image/:id', image.show);

    /* Delete */
app.del('/galerie', galerie.delete);
app.del('/image', image.delete);

    /* Update */
app.put('/galerie', galerie.update);
app.put('/image', image.update);

/* END API CRUD */


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
