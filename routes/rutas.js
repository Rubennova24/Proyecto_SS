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



router.get('/asignacion', (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.json({ success: false, err: JSON.stringify(errors) })
        return
    }
    let body = req.body;
    user.getVistas2(connection, body, (data => {
        res.json(data);
    }))
});

router.post('/maestroAsignado', [
    body('nom_tab').not().isEmpty().isString(),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.json({ success: false, err: JSON.stringify(errors) })
        return
    }
    let body = req.body;
    user.maestroAsignado(connection, body, (data => {
        res.json(data);
    }))
});
router.post('/checkDpto', [
    body('nom_tab').not().isEmpty().isString(),
    body('Dpto').not().isEmpty().isString(),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.json({ success: false, err: JSON.stringify(errors) })
        return
    }
    let body = req.body;
    user.checkDpto(connection, body, (data => {
        res.json(data);
    }))
});
/*router.post('/dropTableyView', [
    body('nom_tab').not().isEmpty().isString(),
    body('nom_view').not().isEmpty().isString(),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.json({ success: false, err: JSON.stringify(errors) })
        return
    }
    let body = req.body;
    user.dropTableyView(connection, body, (data => {
        
    }))
});*/

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
router.post('/conteo', [
    body('Nombre').not().isEmpty().isString(),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.json({ success: false, err: JSON.stringify(errors) })
        return
    }
    let body = req.body;
    user.getConteo(connection, body, (data => {
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
    body('Imagen').not().isEmpty().isString(),
    body('Dpto').not().isEmpty().isString(),
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
router.post('/asignarMaestro', [
    body('Clase').not().isEmpty().isString(),
    body('Nombre').not().isEmpty().isString(),
    body('Salon').not().isEmpty().isString(),
    body('Horario').not().isEmpty().isString(),
    body('NombreLista').not().isEmpty().isString(),
    body('Carrera').not().isEmpty().isString(),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.json({ success: false, err: JSON.stringify(errors) })
        return
    }
    let body = req.body;
    user.asignarMaestro(connection, body, (data => {
        res.json(data);
    }))
});

router.post('/VerCarrerasLista', [
    body('Materia').not().isEmpty().isString(),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.json({ success: false, err: JSON.stringify(errors) })
        return
    }
    let body = req.body;
    user.VerCarrerasLista(connection, body, (data => {
        res.json(data);
    }))
});

router.post('/CrearVista', [
    body('Nombre').not().isEmpty().isString(),
    body('Materia').not().isEmpty().isString(),
    body('Carrera').not().isEmpty().isString(),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.json({ success: false, err: JSON.stringify(errors) })
        return
    }
    let body = req.body;
    user.createVista(connection, body, (data => {
        res.json(data);
    }))
});

router.post('/VerVistas', [
    body('Nombre').not().isEmpty().isString()
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.json({ success: false, err: JSON.stringify(errors) })
        return
    }
    let body = req.body;
    user.VerVistas(connection, body, (data => {
        res.json(data);
    }))
});
router.post('/VerVistas2', [
    body('Nombre').not().isEmpty().isString()
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.json({ success: false, err: JSON.stringify(errors) })
        return
    }
    let body = req.body;
    user.VerVistas2(connection, body, (data => {
        res.json(data);
    }))
});
router.post('/asignjefedpto',[
    body('jefe').not().isEmpty().isString(),
    body('nombre_maestro').not().isEmpty().isString(),
] ,(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.json({ success: false, err: JSON.stringify(errors) })
        return
    }
    let body = req.body;
    user.setMaestro(connection, body, (data => {
        res.json(data);
    }))
});
router.post('/getCarreraVista', [
    body('Nombre').not().isEmpty().isString()
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.json({ success: false, err: JSON.stringify(errors) })
        return
    }
    let body = req.body;
    user.getCarreraVista(connection, body, (data => {
        res.json(data);
    }))
});
router.post('/usr',[
    body('Usuario').not().isEmpty().isString(),
    body('Password').not().isEmpty().isString(),],(req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.json({ success: false, err: JSON.stringify(errors) })
        return
    }
    let body = req.body;
    user.getUsr(connection,body, (data => {
        res.json(data);
    }))
});
router.post('/usr2',[
    body('Usuario').not().isEmpty().isString(),
    body('Password').not().isEmpty().isString(),],(req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.json({ success: false, err: JSON.stringify(errors) })
        return
    }
    let body = req.body;
    user.getUsr2(connection,body, (data => {
        res.json(data);
    }))
});
module.exports = router;