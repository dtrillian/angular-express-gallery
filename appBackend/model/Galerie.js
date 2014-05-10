var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    galeriesModel;

function Galerie(){}

Galerie.prototype.createDBGalerie = function() {

    var galeries = new Schema({
        id : {type: Number , seq:0}
        , name : { type: String, required: true, index: { unique: true } }
        , host : { type: String, required: true }
        , date_created : { type: Date, required: true, default: Date.now}
        , description : { type: String, required: true }
        , elements : { type: Number}
        , views : {type : Number}
    });

    if(galeriesModel == undefined){
        galeriesModel = mongoose.model('galeries', galeries);
    }

    return galeriesModel;
};

module.exports = Galerie;
