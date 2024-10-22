var express = require('express');
var router =express.Router();

const mongoose = require('mongoose');

const { SerialPort } = require('serialport');

const { ReadlineParser } = require('@serialport/parser-readline');
const Sensor =mongoose.model('Sensore');

const arduinoPort = "COM4";

const arduinoSerialPort = new SerialPort({ path: arduinoPort, baudRate: 9600});

const parser = arduinoSerialPort.pipe(new ReadlineParser({ delimiter: '\r\n'}));

let valorDistancia="";

//rutas del metodo http
router.get('/',async (req,res)=>{
    parser.on('data', function(data,err){
        if(err){
            return console.log(err)
        }
        console.log("valor:" + data);
        valorDistancia = data.toString('utf8');
    }
);


    res.send({valorDistancia});
});

router.get('/reanudar', async (req,res)=>{

    arduinoSerialPort.resume();

    res.send({valorDistancia});

});

router.get('/detener',async (req,res)=>{
    
    arduinoSerialPort.pause();

    detenido={
        msg:"cerrar"
    }
    res.send({detenido});
});

router.post('/', async (req,res)=>{
    //let cod = await Sensor.find().count() + 1;
    var distancia = new Sensor ({
        fecha: req.body.fecha,
        hora: req.body.hora,
        //distancia: valorDistancia
        lectura: req.body.lectura
    });

    await distancia.save();
    res.status(201).send(distancia)
});

//apertura del puerto COM4
parser.on('open', function(err){
    if(err){
        return console.log(err);
    }
    console.log("Exito en apertura");
}
);

let puerta=true;//esto significa puerta fisica cerrada
parser.on('data', function(data,err){
    if(err){
        return console.log(err);
    }
    console.log("valor:" + data);
    valorDistancia = data.toString('utf8');

    /*if(valorDistancia=="Abierto"){
    puerta = false;
    var distancia = new Sensor({
        fecha: new Date(),
        hora: new Date().getTime(),
        //distancia: valorDistancia
        //lectura: req.body.lectura
        lectura: valorDistancia   
    });
    await distancia.save();
    }
    else if(valorDistancia=="Cerrado"){
        puerta = true;
        var distancia = new Sensor({
            fecha: new Date(),
            hora: new Date().getTime(),
            //distancia: valorDistancia
            //lectura: req.body.lectura
            lectura: valorDistancia
        });
    await distancia.save();    
    }

    if(puerta==true && valorDistancia=="Intruso detectado!!!"){
        var distancia = new Sensor({
            fecha: new Date(),
            hora: new Date().getTime(),
            //distancia: valorDistancia
            //lectura: req.body.lectura
            lectura: valorDistancia
        });
        await distancia.save();
    }*/
}
);

arduinoSerialPort.on('error',function(err){
    if(err){
    return console.log(err);
    }
});

module.exports = router;