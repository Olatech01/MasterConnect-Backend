const express = require('express')
const multer = require("multer");
const { uploadCandidateDetails } = require('../controller/candidateProfile');


const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); 
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

router.post(
  "/candidate-verification",
  upload.fields([
    { name: "governmentId" },
    { name: "collegeIdProof" },
    { name: "marksheets" },
    { name: "certifications" },
  ]),
  uploadCandidateDetails
);

module.exports = router;