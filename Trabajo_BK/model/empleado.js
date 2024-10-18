const mongoose = require('mongoose');

const EmpleadoSchema = mongoose.Schema({
    nombre:String,
    ap_paterno:String,
    ap_materno:String,
    email:String,
    telefono:String,
    direccion:String,
    puesto:String,
    sueldo:Number 
});

mongoose.model('Empleado',EmpleadoSchema);