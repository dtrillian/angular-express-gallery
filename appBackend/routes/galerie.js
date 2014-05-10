
var Galerie = require('../model/Galerie.js'),
    galeries = new Galerie(),
    galerieToFind = galeries.createDBGalerie();

exports.list = function(req, res) {

    galerieToFind.find({}, function(err, docs) {
        if(!err) {
            res.json(200, { galeries: docs });
        } else {
            res.json(500, { message: err });
        }
    });
};

exports.create = function(req, res) {

    var galerie_name = req.body.galerie_name,
        galerie_description = req.body.galerie_description,
        galerie_host = req.body.galerie_host;

    galerieToFind.findOne({ name: { $regex: new RegExp(galerie_name, "i") } },
        function(err, doc) {
            if(!err && !doc) {

                var newGalerie = new galerieToFind();

                newGalerie.name = galerie_name;
                newGalerie.description = galerie_description;
                newGalerie.host = galerie_host;

                newGalerie.save(function(err) {

                    if(!err) {
                        return res.json(201, {message: "Galerie created with name: " +
                            newGalerie.name });
                    } else {
                        return res.json(500, {message: "Could not create Galerie.Error: " + err});
                    }
                });

            } else if(!err) {

                return res.json(403, {message: "Galerie with that name already exists,"+
                    "please update instead of create or create a new galerie with a different name."});

            } else {
                return  res.json(500, { message: err});
            }
        });
};

exports.show = function(req, res) {

    var id = req.params.id;
    galerieToFind.findById(id, function(err, doc) {
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
    galerieToFind.findById(id, function(err, doc) {
        if(!err && doc) {
            doc.remove();
            res.json(200, { message: "Galerie removed."});
        } else if(!err) {
            res.json(404, { message: "Could not find galerie."});
        } else {
            res.json(403, {message: "Could not delete galerie." + err});
        }
    });
};

exports.update = function(req, res) {

    var id = req.body.id,
        galerie_name = req.body.galerie_name,
        galerie_description = req.body.galerie_description,
        galerie_host = req.body.galerie_host;

    galerieToFind.findById(id, function(err, doc) {
        if(!err && doc) {
            doc.name = galerie_name;
            doc.description = galerie_description;
            doc.host = galerie_host;
            doc.save(function(err) {
                if(!err) {
                    res.json(200, {message: "Galerie updated: " +
                        galerie_name});
                } else {
                    res.json(500, {message: "Could not update galerie. " +
                        err});
                }
            });
        } else if(!err) {
            res.json(404, { message: "Could not find galerie."});
        } else {
            res.json(500, { message: "Could not update galerie. " +
                err});
        }
    });
};