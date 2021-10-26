const cloudinary = require('cloudinary').v2

cloudinary.config({ 
    cloud_name: 'debsp3fca', 
    api_key: '738712861227217', 
    api_secret: 'Ok3CVANhTvsCd3seJgeDzj_P07c' 
})

module.exports = cloudinary;