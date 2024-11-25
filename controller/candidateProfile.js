const CandidateProfile = require("../Model/registerAsCandidate");
const multer = require("multer");
const path = require("path"); // Import for file path manipulation

// Multer Configuration (Improved error handling and file validation)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Specify the upload directory
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9); 1
    const ext = path.extname(file.originalname); // Extract extension
    cb(null, `<span class="math-inline">\{uniqueSuffix\}</span>{ext}`); // Combine unique prefix with extension
  },
});

const allowedTypes = ["image/jpeg", "image/png", "image/pdf"]; // Allowed file types
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Set file size limit to 5MB (adjust as needed)
  fileFilter: (req, file, cb) => {
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Unsupported file type."), false);
    }
  },
});

const uploadCandidateDetails = async (req, res) => {
  // Multer upload with error handling
  try {
    await upload.fields([
      { name: "passport", maxCount: 1 },
      { name: "governmentID", maxCount: 1 },
      { name: "collegeID", maxCount: 1 },
      { name: "certificates", maxCount: 1 },
    ])(req, res, async (err) => {
      if (err) {
        return res.status(500).json({ message: "File upload error", error: err.message });
      }

      const {
        hobbies = "", 
        rank = "",
        candidateName = "",
        candidateEmail = "",
        candidateAge = 0,
        candidateGender = "",
        internShipCompleted = false,
        candidatePosition = "",
        candidateLinkedin = "",
        institution = "",
        degreeType = "",
        institutionStartDate = "",
        institutionEndDate = "",
        departmentType = "",
      } = req.body;


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
        !departmentType
      ) {
        return res.status(400).json({
          message: "All candidate verification details are required",
        });
      }

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
      });

      return res.status(201).json({
        message: "Candidate verification details saved successfully",
        candidate,
      });
    });
  } catch (error) {
    console.error("Error processing candidate details:", error);
    return res.status(500).json({
      message: "An error occurred while saving"

    });
  };
}


module.exports = {
  uploadCandidateDetails,
};