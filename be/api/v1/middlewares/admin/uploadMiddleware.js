const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');

// Cloudinary config
cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret,
});

const uploadToCloudinary = (fileBuffer) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream((error, result) => {
            if (result) resolve(result);
            else reject(error);
        });

        streamifier.createReadStream(fileBuffer).pipe(stream);
    });
};

module.exports.upload = async (req, res, next) => {
    try {
        // Để lưu danh sách link ảnh upload
        const imageLinks = [];

        // Xử lý nhiều ảnh (array)
        if (req.files && Array.isArray(req.files)) {
            for (const file of req.files) {
                const result = await uploadToCloudinary(file.buffer);
                imageLinks.push(result.secure_url); // hoặc result.url
            }
        }

        // Xử lý 1 ảnh (single)
        if (req.file) {
            const result = await uploadToCloudinary(req.file.buffer);
            imageLinks.push(result.secure_url);
        }

        // Gán mảng link ảnh vào req.body.images (dù là 1 hay nhiều)
        req.body.images = imageLinks;

        next();
    } catch (error) {
        console.error("Upload middleware error:", error);
        res.status(500).json({
            error: "Upload failed"
        });
    }
};