const CandidateProfile = require("../Model/registerAsCandidate");

exports.candidate = (req, res, next) => {
    try {
        if (!req.files.passport || !req.files.governmentID) {
            return res.status(400).json({ message: 'Main image and additional images are required' });
        }

        const passportPath = req.files.passport[0].path;
        const governmentPath = req.files.governmentID[0].path;
        const collegePath = req.files.collegeID[0].path;
        const certificatesPath = req.files.certificates[0].path;

        const product = new CandidateProfile({
            _id: new mongoose.Types.ObjectId(),
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
            certificates: certificatesPath,
        });

        product.save()
            .then(result => {
                res.status(201).json({
                    message: "Created product successfully!",
                    createdProduct: {
                        _id: result._id,
                        result: {
                            type: 'GET',
                            url: 'http://localhost:3000/products/' + result._id
                        }
                    }
                });
            })
            .catch(err => {
                console.error(err);
                res.status(500).json({ error: err });
            });
    } catch (error) {
        console.error("Error processing request:", error);
        res.status(500).json({ message: "An error occurred while saving the product." });
    }
};
