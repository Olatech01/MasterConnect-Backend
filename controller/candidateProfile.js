const CandidateProfile = require("../Model/registerAsCandidate");
const multer = require("multer");
const fs = require("fs");

// Ensure upload directory exists
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = "uploads/";
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = ["image/jpeg", "image/png", "application/pdf"];
    if (!allowedMimeTypes.includes(file.mimetype)) {
      return cb(new Error("Invalid file type! Only JPEG, PNG, and PDF are allowed."));
    }
    cb(null, true);
  },
});

const uploadCandidateDetails = async (req, res) => {
  try {
    const requiredFields = [
      "rank",
      "hobbies",
      "candidateName",
      "candidateEmail",
      "candidateAge",
      "internShipCompleted",
      "candidateGender",
      "candidatePosition",
      "candidateLinkedin",
      "institution",
      "degreeType",
      "institutionStartDate",
      "institutionEndDate",
      "departmentType",
    ];

    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).json({ message: `Missing required field: ${field}` });
      }
    }

    const governmentId = req.files?.["governmentId"]?.[0]?.path || null;
    const collegeIdProof = req.files?.["collegeIdProof"]?.[0]?.path || null;
    const marksheets = req.files?.["marksheets"]?.[0]?.path || null;
    const certifications = req.files?.["certifications"]?.[0]?.path || null;
    const candidatePassport = req.files?.["candidatePassport"]?.path || null;

    if (!governmentId || !collegeIdProof || !marksheets || !certifications) {
      return res.status(400).json({ message: "All file uploads are required" });
    }

    const existingCandidate = await CandidateProfile.findOne({ candidateEmail });
    if (existingCandidate) {
      return res.status(400).json({ message: "Candidate with this email already exists." });
    }

    const candidate = await CandidateProfile.create({
      ...req.body,
      governmentId,
      collegeIdProof,
      marksheets,
      certifications,
      candidatePassport,  
    });

    return res.status(201).json({
      message: "Candidate verification details saved successfully",
      candidate,
    });
  } catch (error) {
    console.error("Error processing candidate details:", {
      message: error.message,
      stack: error.stack,
    });
    return res.status(500).json({
      message: "An error occurred while saving candidate details",
      error: error.message,
    });
  }
};

module.exports = {
  uploadCandidateDetails,
  upload,
};
