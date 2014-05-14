var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    galleriesModel,
    path = require('path'),
    thumbnailPluginLib = require('mongoose-thumbnail'),
    thumbnailPlugin = thumbnailPluginLib.thumbnailPlugin,
    make_upload_to_model = thumbnailPluginLib.make_upload_to_model,
    uploads_base = path.join("./imgGalleries"),
    uploads = path.join(uploads_base, "photosGalleries");

console.log("DIRNAME : " + uploads_base);
console.log('A3E : ' + uploads);


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
    });

    galleries.plugin(thumbnailPlugin, {
        name: "photo",
        inline: false,
        save: true,
        upload_to: make_upload_to_model(uploads, 'photos'),
        relative_to: uploads_base
    });

    if(galleriesModel == undefined){
        galleriesModel = mongoose.model('galleries', galleries);
    }

    return galleriesModel;
};

module.exports = Gallery;
