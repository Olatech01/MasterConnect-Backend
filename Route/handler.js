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
const upload = require("../MiddeleWare/upload");
const uploadCandidateDetails = require("../controller/candidateProfile");
const router = express.Router();


// router.post('/candidateRegistration', async (req, res) => {
//     try {
//         // console.log('Request Body:', req.body);
//         // console.log('Uploaded Files:', req.files);

//         // if (!req.files.passport || !req.files.governmentID || !req.files.collegeID || !req.files.certificate) {
//         //     return res.status(400).json({ error: 'Required files are missing' });
//         // }

//         const {
//             candidateName,
//             candidateEmail,
//             candidateAge,
//             candidateGender,
//             candidatePosition,
//             candidateLinkedin,
//             internShipCompleted,
//             institution,
//             degreeType,
//             institutionStartDate,
//             institutionEndDate,
//             departmentType,
//             hobbies,
//             rank,
//         } = req.body;

//         const profile = new CandidateProfile({
//             candidateName,
//             candidateEmail,
//             candidateAge,
//             candidateGender,
//             candidatePosition,
//             candidateLinkedin,
//             internShipCompleted,
//             institution,
//             degreeType,
//             institutionStartDate,
//             institutionEndDate,
//             departmentType,
//             hobbies,
//             rank,
//             // passport: req.files.passport[0].path,
//             // governmentID: req.files.governmentID[0].path,
//             // collegeID: req.files.collegeID[0].path,
//             // certificate: req.files.certificate[0].path,
//         });

//         console.log('Profile to Save:', profile);

//         await profile.save();
//         res.status(201).json({ message: 'Candidate details registered successfully', profile });
//     } catch (error) {
//         console.error('Error:', error);
//         res.status(500).json({ error: 'Server Error' });
//     }
// });

// User Routes
router.route("/register").post(register);
router.route("/emailVerification").post(emailVerification);
router.route("/login").post(login);
router.route("/changePassword").post(changePassword);

router.route("/basicDetails").post(basicDetails);
router.route("/postJob").post(postJob);
router.route("/fetchAllJob").get(getAllJobs);
router.route("/singlejob/:id").get(getJobById);

router.post(
    "/candidateRegistration",
    upload.fields([
        { name: "passport", maxCount: 1 },
        { name: "governmentID", maxCount: 1 },
        { name: "collegeID", maxCount: 1 },
        { name: "certificate", maxCount: 1 },
    ]),
    uploadCandidateDetails
);





module.exports = router;
