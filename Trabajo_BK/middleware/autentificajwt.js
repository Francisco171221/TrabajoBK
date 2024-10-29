const jwt = require('jsonwebtoken');

function auntentifica(req,res,next){
    const jwttoken = req.header('Authorization');
    if(!jwttoken){
        return res.status(401).send('Acceso denegado. Necesitas Token');
    }

    try{
        const payload = jwt.verify(jwttoken, 'c0ntr4s3n14');
        req.user = payload;
        next();
    }
    catch(e){
        res.status(400).send('Acceso denegado. Token no valido');
    }
}

module.exports = auntentifica