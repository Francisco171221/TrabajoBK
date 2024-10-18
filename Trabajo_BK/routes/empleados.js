var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');

const Empleado = mongoose.model('Empleado');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/',async (req,res)=>{

    let emp = new Empleado({
    nombre:req.body.nombre,
    ap_paterno:req.body.ap_paterno,
    ap_materno:req.body.ap_materno,
    email:req.body.email,
    telefono:req.body.telefono,
    direccion:req.body.direccion,
    puesto:req.body.puesto,
    sueldo:req.body.sueldo 
    });
    await emp.save();
    res.status(201).send({emp});
});

router.put('/',(req,res)=>{

});

router.delete('/',(req,res)=>{

});

module.exports = router;
