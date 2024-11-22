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
const { uploadCandidateDetails, upload } = require("../controller/candidateProfile");

const router = express.Router();

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
router
    .route("/candidate")
    .post(
        upload.fields([
            { name: "governmentId" },
            { name: "collegeIdProof" },
            { name: "marksheets" },
            { name: "certifications" },
        ]),
        uploadCandidateDetails
    );



module.exports = router;
