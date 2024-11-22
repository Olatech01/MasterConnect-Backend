const CandidateProfile = require("../Model/registerAsCandidate");
const multer = require("multer");



const uploadCandidateDetails = async (req, res) => {
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
  } catch (error) {
    console.error("Error processing candidate details:", error);
    return res.status(500).json({
      message: "An error occurred while saving candidate details",
      error,
    });
  }
};

module.exports = {
  uploadCandidateDetails,
};
