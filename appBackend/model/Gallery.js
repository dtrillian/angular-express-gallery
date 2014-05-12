var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    galleriesModel

function Gallery(){}

Gallery.prototype.createDBGallery = function() {

    var galleries = new Schema({
        id : {type: Number , seq:0}
        , name : { type: String, required: true, index: { unique: true } }
        , host : { type: String, required: true }
        , date_created : { type: Date, required: true, default: Date.now}
        , description : { type: String, required: true }
        , elements : { type: Number}
        , views : {type : Number}
        , img: { data: Buffer, contentType: String }
    });

    if(galleriesModel == undefined){
        galleriesModel = mongoose.model('galleries', galleries);
    }

    return galleriesModel;
};

module.exports = Gallery;
