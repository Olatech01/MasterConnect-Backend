const CandidateProfile = require("../Model/registerAsCandidate");

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
      candidatePassport,
      candidatePosition,
      candidateLinkedin,
      institution,
      degreeType,
      institutionStartDate,
      institutionEndDate,
      departmentType,
    } = req.body;

    const governmentId = req.files["governmentId"]
      ? req.files["governmentId"][0].path
      : null;
    const collegeIdProof = req.files["collegeIdProof"]
      ? req.files["collegeIdProof"][0].path
      : null;
    const marksheets = req.files["marksheets"]
      ? req.files["marksheets"][0].path
      : null;
    const certifications = req.files["certifications"]
      ? req.files["certifications"][0].path
      : null;

    if (
      !governmentId ||
      !collegeIdProof ||
      !marksheets ||
      !certifications ||
      !rank ||
      !hobbies ||
      !candidateName ||
      !candidateEmail ||
      !candidateAge ||
      !internShipCompleted ||
      !candidateGender ||
      !candidatePassport ||
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
      candidatePassport,
      candidatePosition,
      candidateLinkedin,
      internShipCompleted,
      institution,
      degreeType,
      institutionStartDate,
      institutionEndDate,
      departmentType,
      governmentId,
      collegeIdProof,
      marksheets,
      certifications,
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
