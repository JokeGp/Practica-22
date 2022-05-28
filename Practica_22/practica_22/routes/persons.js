const express = require(`express`);
const router = express.Router();
const mongoose = require(`../node_modules/mongoose`);
let Person = require(`../models/person`);

router.get("/", function (req, res) {
  res.render("main");
});

router.get(`/persons`, function (req, res, next) {
  Person.find(function (err, boludos) {
    if (err) return next(err);
    // res.json(boludos);
    res.render(`personsIndex`, { boludos });
  });
});

router.get(`/person`, function (req, res) {
  res.render(`person`);
});

router.post(`/addPerson`, function (req, res) {
  const myPerson = new Person({
    // crea entidad
    nombre: req.body.nombre,
    edad: req.body.edad,
    tipoSangre: req.body.tipoSangre,
    nss: req.body.nss,
  });
  myPerson.save(); // Guarda en BD
  res.redirect(`/persons`);
});

// update person
router.post(`/updatePerson`, function (req, res, next) {
  Person.findByIdAndUpdate(
    req.body.objId,
    {
      nombre: req.body.nombre,
      edad: req.body.edad,
      tipoSangre: req.body.tipoSangre,
      nss: req.body.nss,
    },
    function (err, post) {
      if (err) return next(err);
      res.redirect(`/persons`);
    }
  );
});

// find by id person
router.get(`/findById/:id`, function (req, res, next) {
  Person.findById(req.params.id, function (err, boludo) {
    if (err) return next(err);
    res.render(`personUpdate`, { boludo });
  });
});

// Delete person
router.get(`/deletePerson/:id`, function (req, res, next) {
  Person.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.redirect(`/persons`);
  });
});

module.exports = router;
