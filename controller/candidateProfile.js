const CandidateProfile = require("../Model/registerAsCandidate");

const uploadCandidateDetails = async (req, res) => {
  try {
    // Check if files are provided
    if (
      !req.files.passport ||
      !req.files.governmentID ||
      !req.files.collegeID ||
      !req.files.certificate
    ) {
      return res.status(400).json({ error: "All required files must be uploaded." });
    }

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

    // Validate required fields
    if (
      !candidateName ||
      !candidateEmail ||
      !candidateAge ||
      !candidateGender ||
      !candidatePosition
    ) {
      return res.status(400).json({ error: "Missing required candidate details." });
    }

    // Save candidate profile
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
      passport: req.files.passport[0].path,
      governmentID: req.files.governmentID[0].path,
      collegeID: req.files.collegeID[0].path,
      certificate: req.files.certificate[0].path,
    });

    return res.status(201).json({
      message: "Candidate verification details saved successfully.",
      candidate,
    });
  } catch (error) {
    console.error("Error processing candidate details:", error.message);
    return res.status(500).json({ error: "An error occurred while processing the request." });
  }
};

module.exports = uploadCandidateDetails;
