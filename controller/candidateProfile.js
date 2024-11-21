const path = require("path");
const CandidateProfile = require("../Model/registerAsCandidate");

const uploadCandidateDetails = async (req, res) => {
    try {
        const { hobbies, rank, candidateName, candidateEmail, candidateAge, candidateGender, candidatePassport, candidatePosition, candidateLinkedin, institution, degreeType, institutionStartDate, institutionEndDate, departmentType } = req.body;

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
        const video = req.files["video"] ? req.files["video"][0].path : null;


        if (!governmentId || !collegeIdProof || !marksheets || !certifications || !video || !rank || !hobbies || !candidateName || !candidateEmail || !candidateAge || !candidateGender || !candidatePassport || !candidatePosition || !candidateLinkedin || !institution || !degreeType || !institutionEndDate || !institutionStartDate || !degreeTypeEndDate || !departmentType) {
            return res.status(400).json({
                message: "All candidate verification details are required",
            });
        }

        const candidate = new CandidateProfile({
            candidateName,
            candidateEmail,
            candidateAge,
            candidateGender,
            candidatePassport,
            candidatePosition,
            candidateLinkedin,
            institution,
            degreeType,
            institutionStartDate,
            institutionEndDate,
            departmentType,
            governmentId,
            collegeIdProof,
            marksheets,
            certifications,
            video,
            hobbies,
            rank,
        });

        await candidate.save();

        res.status(201).json({
            message: "Candidate verification details saved successfully",
            candidate,
        });
    } catch (error) {
        console.error("Error processing candidate details:", error);
        res.status(500).json({
            message: "An error occurred while saving candidate details",
            error,
        });
    }
};

module.exports = {
    uploadCandidateDetails,
};
