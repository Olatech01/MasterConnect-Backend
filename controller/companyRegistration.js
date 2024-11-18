const companyModel = require("../Model/RegisterCompany");




const basicDetails = async (req, res) => {
    const {
        companyName,
        typeOfCompany,
        city,
        state,
        officialWebsite,
        companyContact,
        recruiterName,
        jobTitle,
        gender,
        age,
        email,
        workingYears,
        linkedinProfile,
        personalContact, } = req.body;

    try {
        const profile = new companyModel({ companyName, typeOfCompany, city, state, officialWebsite, companyContact, recruiterName, jobTitle, gender, age, email, workingYears, linkedinProfile, personalContact });
        await profile.save();
        return res.json({ message: "Congratulation, Your company has been registered successfully", profileId: profile._id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to save step 1 data" });
    }
}

const recruiterDetails = async (req, res) => {
    const { recruiterName, jobTitle, gender, age, email, workingYears, linkedinProfile, personalContact } = req.body;


    try {
        const recruiter = new companyModel({
            recruiterName,
            jobTitle,
            gender,
            age,
            email,
            workingYears,
            linkedinProfile,
            personalContact,
        });
        await recruiter.save();
        return res.json({ message: "Step 2 completed" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to save step 2 data" });
    }
}

module.exports = {
    basicDetails,
    recruiterDetails,
}