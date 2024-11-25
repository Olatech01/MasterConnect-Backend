const CandidateProfile = require("../Model/registerAsCandidate");





const uploadCandidateDetails = async (req, res) => {
  try {
    // Check uploaded files
    if (
      !req.files.passport ||
      !req.files.governmentID ||
      !req.files.collegeID ||
      !req.files.certificate
    ) {
      return res.status(400).json({ error: "Required files are missing" });
    }

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

    // Validate required fields
    const missingFields = [];
    [
      "hobbies",
      "rank",
      "candidateName",
      "candidateEmail",
      "candidateAge",
      "candidateGender",
      "internShipCompleted",
      "candidatePosition",
      "candidateLinkedin",
      "institution",
      "degreeType",
      "institutionStartDate",
      "institutionEndDate",
      "departmentType",
    ].forEach((field) => {
      if (!req.body[field]) missingFields.push(field);
    });

    if (missingFields.length > 0) {
      return res.status(400).json({
        error: `The following fields are required: ${missingFields.join(", ")}`,
      });
    }

    // Create and save candidate profile
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
      message: "Candidate verification details saved successfully",
      candidate,
    });
  } catch (error) {
    console.error("Error processing candidate details:", error.message);
    return res.status(500).json({
      error: "An error occurred while saving candidate details.",
    });
  }
};


module.exports = {
  uploadCandidateDetails,
};