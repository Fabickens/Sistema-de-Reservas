const cloudinary = require('cloudinary').v2;

const connectCloudinary = () => {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_SECRET_KEY
    });
    console.log('Cloudinary configurado correctamente.');
};

module.exports = { cloudinary, connectCloudinary };