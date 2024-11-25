const CandidateProfile = require("../Model/registerAsCandidate");
const multer = require("multer");

// Multer Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage }).fields([
  { name: "passport", maxCount: 1 },
  { name: "governmentID", maxCount: 1 },
  { name: "collegeID", maxCount: 1 },
  { name: "certificates", maxCount: 1 },
]);

const uploadCandidateDetails = async (req, res) => {
  // Handle Multer upload
  upload(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ message: "File upload error", error: err.message });
    }

    try {
      const {
        hobbies,
        rank,
        candidateName,
        candidateEmail,
        candidateAge,
        candidateGender,
        internShipCompleted,
        candidatePosition,
        candidateLinkedin,
        institution,
        degreeType,
        institutionStartDate,
        institutionEndDate,
        departmentType,
      } = req.body;

      // Access files
      const { passport, governmentID, collegeID, certificates } = req.files;

      // Validate required fields
      if (
        !rank ||
        !hobbies ||
        !candidateName ||
        !candidateEmail ||
        !candidateAge ||
        !internShipCompleted ||
        !candidateGender ||
        !candidatePosition ||
        !candidateLinkedin ||
        !institution ||
        !degreeType ||
        !institutionStartDate ||
        !institutionEndDate ||
        !departmentType ||
        !passport ||
        !governmentID ||
        !collegeID ||
        !certificates
      ) {
        return res.status(400).json({
          message: "All candidate verification details are required",
        });
      }

      // Save candidate to the database
      const candidate = await CandidateProfile.create({
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
        passport: `/uploads/${passport[0].filename}`,
        governmentID: `/uploads/${governmentID[0].filename}`,
        collegeID: `/uploads/${collegeID[0].filename}`,
        certificates: `/uploads/${certificates[0].filename}`,
      });

      return res.status(201).json({
        message: "Candidate verification details saved successfully",
        candidate,
      });
    } catch (error) {
      console.error("Error processing candidate details:", error);
      return res.status(500).json({
        message: "An error occurred while saving candidate details",
        error,
      });
    }
  });
};

module.exports = {
  uploadCandidateDetails,
};
