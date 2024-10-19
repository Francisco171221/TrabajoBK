var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');

const Empleado = mongoose.model('Empleado');

/* GET home page. */
router.get('/', async function(req, res, next) {
  let empleados = await Empleado.find({});

  res.send(empleados);
});

router.get('/email', async(req,res)=>{
  let emp = await Empleado.findOne({email:req.body.email});

  if(!emp){
    res.status(400).send("Empleado no encontrado");
  }

  res.send({emp});
})

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

router.put('/',async(req,res)=>{
  let emp = await Empleado.findOne({email:req.body.email});

  if(!emp){
    res.status(402).send("Empleado no encontrado");
  }

  let emp_modificado = await Empleado.findOneAndUpdate(
    //campo de referencia
    {email:req.body.email},
    //datos a modificar
    {
      nombre:req.body.nombre,
      ap_paterno:req.body.ap_paterno,
      ap_materno:req.body.ap_materno,
      email:req.body.email,
      telefono:req.body.telefono,
      direccion:req.body.direccion,
      puesto:req.body.puesto,
      sueldo:req.body.sueldo 
    },
    //tipo de respuesta
    {
      new:true
    }
  );
  res.send({emp_modificado});
});
//el metodo delete usa params en lugar de body y la informacion viene agregada en la url
router.delete('/',async(req,res)=>{
  let emp = await Empleado.findOne({email:req.params.email});

  if(!emp){
    res.status(402).send("Empleado no encontrado");
  }

  let emp_eliminado = await Empleado.findOneAndDelete({email:req.params.email});

  res.send({emp_eliminado});

});

module.exports = router;
