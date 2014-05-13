var Image = require('../model/Image.js'),
    image = new Image(),
    imageToFind = image.createDBImage();

exports.list = function(req, res, next) {

    imageToFind.find({}, function(err, docs) {
        if(!err) {
            res.json(200, { images: docs });
        } else {
            res.json(500, { message: err });
        }
    });
}

exports.create = function(req, res) {

    var img_name = req.body.img_name,
        img_author = req.body.img_author,
        img_description = req.body.img_description;

    imageToFind.findOne({ name: { $regex: new RegExp(img_name, "i") } },
        function(err, doc) {
            if(!err && !doc) {

                var newImg = new imageToFind();

                newImg.name = img_name;
                newImg.author = img_author;
                newImg.description = img_description;

                newImg.save(function(err) {

                    if(!err) {
                        return res.json(201, {message: "Image created with name: " +
                            newImg.name });
                    } else {
                        return res.json(500, {message: "Could not store Image.Error: " + err});
                    }
                });

            } else if(!err) {

                return res.json(403, {message: "Image with that name already exists,"+
                    "please update instead of create or create a new image with a different name."});

            } else {
                return  res.json(500, { message: err});
            }
        });
};

exports.show = function(req, res) {

    var id = req.params.id;
    imageToFind.findById(id, function(err, doc) {
        if(!err && doc) {
            res.json(200, doc);
        } else if(err) {
            res.json(500, { message: "Error loading Image." + err});
        } else {
            res.json(404, { message: "Image not found."});
        }
    });
};

exports.delete = function(req, res) {

    var id = req.body.id;
    imageToFind.findById(id, function(err, doc) {
        if(!err && doc) {
            doc.remove();
            res.json(200, { message: "Image removed."});
        } else if(!err) {
            res.json(404, { message: "Could not find image."});
        } else {
            res.json(403, {message: "Could not delete image. " + err});
        }
    });
};


exports.update = function(req, res) {

    var id = req.body.id,
        img_name = req.body.img_name,
        img_description = req.body.img_description;

    imageToFind.findById(id, function(err, doc) {
        if(!err && doc) {
            doc.name = img_name;
            doc.description = img_description;
            doc.save(function(err) {
                if(!err) {
                    res.json(200, {message: "Image updated: " +
                        img_name});
                } else {
                    res.json(500, {message: "Could not update image. " +
                        err});
                }
            });
        } else if(!err) {
            res.json(404, { message: "Could not find image."});
        } else {
            res.json(500, { message: "Could not update image. " +
                err});
        }
    });
};
