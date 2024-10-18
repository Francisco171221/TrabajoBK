const mongoose = require('mongoose');

const SensorSchema = mongoose.Schema({
    lectura:String,
    fecha:String,
    hora:String 
});

mongoose.model('Sensore',SensorSchema);