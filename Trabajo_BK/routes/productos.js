var express = require('express');
var router = express.Router();
const upload = require ('../libs/almacen');
const fs = require('fs-extra');
const path = require('path');

const mongoose = require("mongoose");
const Producto = mongoose.model("Producto");

router.post('/',upload.single('imagen'),async (req,res)=>{

    let prod_guardado= new Producto({

        nombre:req.body.nombre,
        descripcion:req.body.descripcion,
        existencia:req.body.existencia,
        precio:req.body.precio
    });

    if(req.file){
        const {filename} = req.file;
        prod_guardado.setimgurl(filename);
    }

    await prod_guardado.save();

    res.status(201).send({prod_guardado});
});

router.put('/',upload.single('imagen'),async (req,res)=>{
    
    let prod = await Producto.findOne({nombre: req.body.nombre});

    if(!prod){
        return res.status(402).send("Producto no encontrado");
    }

    /*http://localhost:3000/foto/imagen-1636379151090-59215371.png */
    let utlfotoanterior = prod.imgurl.split("/");
    //console.log(urlfotoanterior[4]);
    //obtiene la url de la imagen almacenada
    //agregar a imgurl dicha url obtenida 

    console.log(req.file);
    if(req.file){
        const {filename} = req.file;
        prod.setimgurl(filename);
    }

    let prod_modificado = await Producto.findOneAndUpdate(
        {nombre : req.body.nombre},
        {

            nombre:req.body.nombre,
            descripcion:req.body.descripcion,
            existencia:req.body.existencia,
            precio:req.body.precio,
            imgurl:prod.imgurl
        },
        {
            new:true
        },
    );

    if(req.file){
        await fs.unlink(path.resolve("almacen/img/"+urlfotoanterior[4]));
    }

    res.send({prod_modificado});
});

//actualizar imagen
router.put('/imagen',upload.single('imagen'),async(req,res)=>{
    let prod = await Producto.findOne({nombre: req.body.nombre});

    if(!prod){
        return res.status(402).send("Producto no encontrado")
    }

    /*http://localhost:3000/foto/imagen-544541665151515-651981.png */
    let urlfotoanterior = prod.imgurl.split("/");
    //console.log(urlfotoanterior[4]);
    //obtiene la url d la imagen almacenada
    //agregar a imgurl dicha url obtenida
    
    if(req.file){
        const {filename} = req.file;
        prod.setimgurl(filename);
    }

    let prod_modificado = await Producto.findOneAndUpdate(
        {nombre: req.body.nombre},
        {
            imgurl:prod.imgurl
        },
        {
            new:true
        },

    );

    await fs.unlink(path.resolve("almacen/img/"+urlfotoanterior[4]));

    res.send({prod_modificado});
});

router.delete('/borrar/:nombre', async (req,res)=>{
    let prod = await Producto.findOne({nombre:req.params.nombre});
    if(!prod){
        return res.status(402).send("Producto no encontrado");
    }

    /*http://localhost:3000/foto/imagen-1636379151090-59215371.png */
    let urlfotoanterior = prod.imgurl.split("/");
    //console.log(urlfotoanterior[4]);
    //obtiene la url de la imagen almacenada
    //agregar a imgurl dicha url obtenida

    let prod_eliminada = await Producto.findOneAndDelete({nombre:req.params.nombre});

    await fs.unlink(path.resolve("almacen/img/"+urlfotoanterior[4]));

    res.send({prod_eliminada});
});

router.get('/', async(req,res)=>{
    /* try{
            cont resultado = await Producto.find();
             res.json(resultado);
    }catch(err){
            console.error(err);
            res.status(500).send('Error en el servidor);
    } */
   let pro = await Producto.find({});
   res.send(pro);
});

router.get('/nombre/:nombre', async(req,res)=>{
    let pro = await Producto.findOne({nombre:req.params.nombre});

    if(!pro){
        return res.status(401).send("Producto no encontrado");
    }

    //envia toda la informacion
    res.send({pro});

    //envio de objeto personalizado
    //res.send({emp_envio});
});

module.exports = router;