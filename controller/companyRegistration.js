const companyModel = require("../Model/RegisterCompany");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const uploadDir = path.join(__dirname, "../uploads");
try {
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }
} catch (err) {
    console.error("Error creating upload directory:", err);
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueName = `${uuidv4()}${path.extname(file.originalname)}`;
        cb(null, uniqueName);
    }
});

function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb(new Error("Only images (jpeg, jpg, png, gif) are allowed."));
    }
}

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb);
    }
}).fields([
    { name: "companyLogo", maxCount: 1 },
    { name: "proof", maxCount: 1 },
    { name: "profilePhoto", maxCount: 1 },
    { name: "certificates", maxCount: 1 },
]);

const multerUpload = (req, res) => {
    return new Promise((resolve, reject) => {
        upload(req, res, (err) => {
            if (err instanceof multer.MulterError) {
                reject(new Error(`Multer error: ${err.message}`));
            } else if (err) {
                reject(new Error(`File upload error: ${err.message}`));
            } else {
                resolve();
            }
        });
    });
};

const basicDetails = async (req, res) => {
    const {
        companyName,
        typeOfCompany,
        city,
        state,
        officialWebsite,
        companyContact,
        recruiterName,
        jobTitle,
        gender,
        age,
        recruiterEmail,
        workingYears,
        linkedinProfile,
        personalContact,
        companyAddress,
        companySize,
        companyEmail,
        companyRegistrationNumber,
        companyTaxIdentidicationNumber,
        companyMedia,
        companyFoundedYear
    } = req.body;

    try {
        await multerUpload(req, res);

        const proofPath = req.files?.proof?.[0]?.path || null;
        const companyLogoPath = req.files?.companyLogo?.[0]?.path || null;
        const profilePhotoPath = req.files?.profilePhoto?.[0]?.path || null;
        const certificatesPath = req.files?.certificates?.[0]?.path || null;

        const existingCompany = await companyModel.findOne({ companyName });
        if (existingCompany) {
            return res.status(400).json({ error: "A company with this name already exists" });
        }

        if (!companyName ||!typeOfCompany ||!city ||!state ||!officialWebsite ||!companyContact ||!recruiterName ||!jobTitle ||!gender ||!age ||!recruiterEmail ||!workingYears ||!linkedinProfile ||!personalContact ||!companyAddress ||!companySize ||!companyEmail ||!companyRegistrationNumber ||!companyTaxIdentidicationNumber ||!companyMedia ||!companyFoundedYear) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const profile = new companyModel({
            companyName,
            typeOfCompany,
            city,
            state,
            companyLogo: companyLogoPath,
            officialWebsite,
            companyFoundedYear,
            companyContact,
            recruiterName,
            jobTitle,
            gender,
            age,
            proof: proofPath,
            recruiterEmail,
            workingYears,
            linkedinProfile,
            personalContact,
            profilePhoto: profilePhotoPath,
            certificates: certificatesPath,
            companyAddress,
            companySize,
            companyEmail,
            companyRegistrationNumber,
            companyTaxIdentidicationNumber,
            companyMedia
        });

        await profile.save();
        return res.json({
            message: "Congratulations, your company has been registered successfully, Please wait for the admin approval......",
            companyId: profile._id,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = { basicDetails };
