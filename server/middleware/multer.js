const multer = require('multer')

//parametrage multer

const storage = multer.diskStorage({
    destination: (req,file, cb) => {
        cb(null, './images')//lieu ou on stocke les images
    },
    filename: (req, file, cb) => {
        const name = file.originalname.split(' ').join('_')
        cb(null, Date.now() + name)
    }
})

exports.upload = multer({ storage: storage})