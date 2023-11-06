require('dotenv').config();
var cloudinary = require('cloudinary').v2;
cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
});

const uploadImage = async (imagePath) => {
    if(!imagePath) return {status : 'error', message : 'There is no image upload'};
    const options = {
        use_filename: true,
        unique_filename: false,
        overwrite: true,
        folder: "books"
    };
    const result = await cloudinary.uploader.upload(imagePath, options);
    return {status : 'success', url : result.url};
};
const deleteImage = async(url, file = true) => {
    if(!file) return {status : 'error', message : 'There is no image upload'};
    
    var public_id = url.slice(
        url.indexOf("books"),
        url.lastIndexOf(".")
    );
    const deleteImage = await cloudinary.uploader.destroy(public_id);
    return deleteImage;
}
module.exports = { uploadImage, deleteImage } ;