const express = require('express');
const user = require('../user.model');
const connection = require("../conexion");
const { body, param, validationResult } = require('express-validator');
var router = express.Router();

router.get('/carreras', (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.json({ success: false, err: JSON.stringify(errors) })
        return
    }
    let body = req.body;
    user.getCarreras(connection, body, (data => {
        res.json(data);
    }))
});
router.post('/dpto', [
    body('IdCarrera').not().isEmpty().isString(),
  ], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.json({ success: false, err: JSON.stringify(errors) })
        return
    }
    let body = req.body;
    user.getdpto(connection, body, (data => {
        res.json(data);
    }))
  });
router.post('/materia', [
    body('IdCarrera').not().isEmpty().isString(),
    body('IdDpto').not().isEmpty().isString(),
  ], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.json({ success: false, err: JSON.stringify(errors) })
        return
    }
    let body = req.body;
    user.getmateria(connection, body, (data => {
        res.json(data);
    }))
  });
  router.post('/lista', [
    body('Materia').not().isEmpty().isString(),
  ], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.json({ success: false, err: JSON.stringify(errors) })
        return
    }
    let body = req.body;
    user.getlista(connection, body, (data => {
        res.json(data);
    }))
  });
  router.post('/createlista', [
    body('Materia').not().isEmpty().isString(),
  ], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.json({ success: false, err: JSON.stringify(errors) })
        return
    }
    let body = req.body;
    user.createlista(connection, body, (data => {
        res.json(data);
    }))
  });
  router.post('/inscribirlista', [
    body('Id').not().isEmpty().isString(),
    body('Nombre').not().isEmpty().isString(),
    body('Carrera').not().isEmpty().isString(),
    body('Materia').not().isEmpty().isString(),
  ], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.json({ success: false, err: JSON.stringify(errors) })
        return
    }
    let body = req.body;
    user.inscribirlista(connection, body, (data => {
        res.json(data);
    }))
  });
module.exports = router;