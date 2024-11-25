const CandidateProfile = require("../Model/registerAsCandidate");

const uploadCandidateDetails = async (req, res) => {
  try {
    // Check if files are provided
    if (!req.files.passport || !req.files.passport || !req.files.collegeID || !req.files.certificates) {
      return res.status(400).json({ message: 'Main image and additional images are required' });
    }

    const passportPath = req.files.passport[0].path;
    const governmentPath = req.files.governmentID[0].path;
    const collegePath = req.files.collegeID[0].path;
    const certificatesPath = req.files.certificates[0].path;

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
      passport: passportPath,
      governmentID: governmentPath,
      collegeID: collegePath,
      certificate: certificatesPath,
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
