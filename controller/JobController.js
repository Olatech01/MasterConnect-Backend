const jobModel = require("../Model/Job");



const postJob = async (req, res) => {
    const { title, company, location, salary, jobType, description, skills, salaryDuration, experience, deadline } = req.body;

    try {
        const job = new jobModel({ title, company, location, salary, jobType, description, skills, salaryDuration, experience, deadline });
        await job.save();
        res.status(201).json({ message: "Job posted successfully", job });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to post job" });
    }
};

const getAllJobs = async (req, res) => {
    try {
        const jobs = await jobModel.find();
        res.status(200).json(jobs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch jobs" });
    }
};

const getJobById = async (req, res) => {
    try {
        const job = await jobModel.findById(req.params.id);
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }
        return res.status(200).json(job);
    } catch (error) {
        console.error("Error retrieving job:", error);
        res.status(500).json({ message: 'Failed to retrieve job' });
    }
}


module.exports = {
    postJob,
    getAllJobs,
    getJobById,
}