const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './almacen/img');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.filename + '-' + uniqueSuffix + '.png');
        
        // Utiliza el nombre general como nombre del archivo
        // cb(null, file.originalname)
    }
})

const upload = multer({ storage: storage})

module.exports = upload