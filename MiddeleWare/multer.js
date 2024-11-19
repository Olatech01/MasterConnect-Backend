const multer = require("multer");
// const path = require("path");

// const storage = multer.diskStorage({
//     destination: './upload/images',
//     filename: (req, file, cb) => {
//         cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
//     }
// });

// const fileFilter = (req, file, cb) => {
//     const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
//     if (allowedTypes.includes(file.mimetype)) {
//         cb(null, true);
//     } else {
//         cb(new Error("Only .png, .jpg, and .jpeg formats are allowed"), false);
//     }
// };

// const upload = multer({
//     storage: storage,
//     fileFilter: fileFilter,
//     limits: {
//         fileSize: 2 * 1024 * 1024,
//     },
// });

// module.exports = upload;

const storage = multer.diskStorage({
    filename:function(req, file, callback){
        callback(null, file.originalname);
    }
})

const upload = multer({storage})

module.exports = upload;