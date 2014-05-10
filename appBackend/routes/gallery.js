
var Gallery = require('../model/Gallery.js'),
    galleries = new Gallery(),
    galleryToFind = galleries.createDBGallery();

exports.list = function(req, res) {

    galleryToFind.find({}, function(err, docs) {
        if(!err) {
            res.json(200, { galleries: docs });
        } else {
            res.json(500, { message: err });
        }
    });
};

exports.create = function(req, res) {

    var gallery_name = req.body.gallery_name,
        gallery_description = req.body.gallery_description,
        gallery_host = req.body.gallery_host;

    galleryToFind.findOne({ name: { $regex: new RegExp(gallery_name, "i") } },
        function(err, doc) {
            if(!err && !doc) {

                var newGallery = new galleryToFind();

                newGallery.name = gallery_name;
                newGallery.description = gallery_description;
                newGallery.host = gallery_host;

                newGallery.save(function(err) {

                    if(!err) {
                        return res.json(201, {message: "Gallery created with name: " +
                            newGallery.name });
                    } else {
                        return res.json(500, {message: "Could not create gallery.Error: " + err});
                    }
                });

            } else if(!err) {

                return res.json(403, {message: "Gallery with that name already exists,"+
                    "please update instead of create or create a new gallery with a different name."});

            } else {
                return  res.json(500, { message: err});
            }
        });
};

exports.show = function(req, res) {

    var id = req.params.id;
    galleryToFind.findById(id, function(err, doc) {
            if(!err && doc) {
                res.json(200, doc);
            } else if(err) {
                res.json(500, { message: "Error loading Categorie." + err});
            } else {
                res.json(404, { message: "Categorie not found."});
            }
        });
};

exports.delete = function(req, res) {

    var id = req.body.id;
    galleryToFind.findById(id, function(err, doc) {
        if(!err && doc) {
            doc.remove();
            res.json(200, { message: "Gallery removed."});
        } else if(!err) {
            res.json(404, { message: "Could not find Gallery."});
        } else {
            res.json(403, {message: "Could not delete Gallery." + err});
        }
    });
};

exports.update = function(req, res) {

    var id = req.body.id,
        gallery_name = req.body.gallery_name,
        gallery_description = req.body.gallery_description,
        gallery_host = req.body.gallery_host;

    galleryToFind.findById(id, function(err, doc) {
        if(!err && doc) {
            doc.name = gallery_name;
            doc.description = gallery_description;
            doc.host = gallery_host;
            doc.save(function(err) {
                if(!err) {
                    res.json(200, {message: "Gallery updated: " +
                        gallery_name});
                } else {
                    res.json(500, {message: "Could not update Gallery. " +
                        err});
                }
            });
        } else if(!err) {
            res.json(404, { message: "Could not find Gallery."});
        } else {
            res.json(500, { message: "Could not update Gallery. " +
                err});
        }
    });
};