const multer = require("multer");
const path = require("path");

// Create uploads directory if it doesn't exist
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads");
    },
    filename: (req, file, cb) => {
        cb(
            null,
            file.filename + "-" + Date.now() + path.extname(file.originalname)
        );
    },
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 2 },
    fileFilter: (req, file, cb) => {
        const filetypes = "/jpeg|jpg|png|gif";
        const extname = filetypes.test(
            path.extname(file.originalname).toLowerCase()
        );

        if (extname) {
            return cb(null, true);
        } else {
            cb("Error: Images Only");
        }
    },
});

module.exports = upload;
