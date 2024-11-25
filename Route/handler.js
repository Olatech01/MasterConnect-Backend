const express = require("express");
const { isAdmin, isLoggedin } = require("../MiddeleWare/auth");
const {
    register,
    emailVerification,
    login,
    changePassword,
} = require("../controller/user");
const { basicDetails } = require("../controller/companyRegistration");
const {
    postJob,
    getAllJobs,
    getJobById,
} = require("../controller/JobController");
const { uploadCandidateDetails } = require("../controller/candidateProfile");
const multer = require("multer")
const path = require("path");
const CandidateProfile = require("../Model/registerAsCandidate");
const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null,
            Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage:
        storage
}).fields([
    { name: 'passport', maxCount: 1 },
    { name: 'governmentID', maxCount: 1 },
    { name: 'collegeID', maxCount: 1 },
    { name: 'certificate', maxCount: 1 }
]);


router.post("/candidateRegistration", upload, async (req, res) => {
    try {
        const {
            candidateName,
            candidateEmail,
            candidateAge,
            candidateGender,
            candidatePosition,
            candidateLinkedin,
            internShipCompleted,
            institution,
            degreeType,
            institutionStartDate,
            institutionEndDate,
            departmentType,
            hobbies,
            rank,
        } = req.body;
        const passportPath = req.files.passport[0].path;
        const governmentIDPath = req.files.governmentID[0].path;
        const collegeIDPath = req.files.collegeID[0].path;
        const certificatePath = req.files.certificate[0].path;



        const profile = new CandidateProfile({
            candidateName,
            candidateEmail,
            candidateAge,
            candidateGender,
            candidatePosition,
            candidateLinkedin,
            internShipCompleted,
            institution,
            degreeType,
            institutionStartDate,
            institutionEndDate,
            departmentType,
            hobbies,
            rank,
            passport: passportPath,
            governmentID: governmentIDPath,
            collegeID: collegeIDPath,
            certificate: certificatePath,
        });

        await profile.save();
        res.status(201).json({ message: 'Candidate details registered successfully', profile });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Server Error'
        });
    }
})

// User Routes
router.route("/register").post(register);
router.route("/emailVerification").post(emailVerification);
router.route("/login").post(login);
router.route("/changePassword").post(changePassword);

// Company Routes
router.route("/basicDetails").post(basicDetails);
router.route("/postJob").post(postJob);
router.route("/fetchAllJob").get(getAllJobs);
router.route("/singlejob/:id").get(getJobById);

// Candidate Routes
router.route("/candidate").post(uploadCandidateDetails);





module.exports = router;
