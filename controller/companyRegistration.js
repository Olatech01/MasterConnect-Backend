const Company = require('../Model/RegisterCompany');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueName = `${uuidv4()}${path.extname(file.originalname)}`;
        cb(null, uniqueName);
    },
});

const checkFileType = (file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const isValidExt = allowedTypes.test(
        path.extname(file.originalname).toLowerCase()
    );
    const isValidMime = allowedTypes.test(file.mimetype);

    if (isValidExt && isValidMime) {
        cb(null, true);
    } else {
        cb(new Error("Only images (jpeg, jpg, png, gif) are allowed."));
    }
};

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb);
    },
}).fields([
    { name: 'companyLogo', maxCount: 1 },
    { name: 'proof', maxCount: 1 },
    { name: 'profilePhoto', maxCount: 1 },
    { name: 'certificates', maxCount: 1 },
]);

const multerUpload = (req, res) =>
    new Promise((resolve, reject) => {
        upload(req, res, (err) => {
            if (err) {
                if (err instanceof multer.MulterError) {
                    reject(new Error(`Multer error: ${err.message}`));
                } else {
                    reject(new Error(`File upload error: ${err.message}`));
                }
            } else {
                resolve();
            }
        });
    });

const basicDetails = async (req, res) => {
    try {
        await multerUpload(req, res);

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
            companyFoundedYear,
        } = req.body;

        const proofPath = req.files?.proof?.[0]?.path || null;
        const companyLogoPath = req.files?.companyLogo?.[0]?.path || null;
        const profilePhotoPath = req.files?.profilePhoto?.[0]?.path || null;
        const certificatesPath = req.files?.certificates?.[0]?.path || null;

        const requiredFields = [
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
            companyFoundedYear,
        ];

        if (requiredFields.some((field) => !field)) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const existingCompany = await Company.findOne({ companyName });
        if (existingCompany) {
            return res.status(400).json({
                error: "A company with this name already exists.",
            });
        }

        const profile = new Company({
            companyName,
            typeOfCompany,
            city,
            state,
            companyLogo: companyLogoPath,
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
            profilePhoto: profilePhotoPath,
            proof: proofPath,
            certificates: certificatesPath,
            companyAddress,
            companySize,
            companyEmail,
            companyRegistrationNumber,
            companyTaxIdentidicationNumber,
            companyMedia,
            companyFoundedYear,
        });

        await profile.save();
        return res.status(201).json({
            message:
                "Your company has been registered successfully. Please wait for admin approval.",
            companyId: profile._id,
        });
    } catch (error) {
        console.error("Error registering company:", error);
        res.status(500).json({ error: "Failed to register your company." });
    }
};

module.exports = { basicDetails };
