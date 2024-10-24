const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

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

EmpleadoSchema.method.generadorJwt(function(){
    return jwt.sign({
        email : this.usuario,
        nombre: this.tipo
    }, 'c0ntr4s3n14');
});

mongoose.model('Empleado',EmpleadoSchema);