const mongoose = require("mongoose");

const ProductoSchema = new mongoose.Schema({

    nombre:String,
    descripcion:String,
    existencia:Number,
    precio:Number,
    imgurl:String
});

ProductoSchema.method.setimgurl = function setimgurl(imagen){
    this.imgurl = "http://localhost:3000/foto/" +imagen;
}

mongoose.model("Producto", ProductoSchema);