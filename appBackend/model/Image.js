var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

function Image(){}

Image.prototype.createDBImage = function() {
    var images = new Schema({
        name : { type: String, required: true, trim: true}
        , author : { type: String, required: true }
        , date_created : { type: Date, required: true, default: Date.now}
        , description : { type: String, required: true }
    });

    var imagesModel = mongoose.model('images', images);

    return imagesModel;
}

module.exports = Image;
