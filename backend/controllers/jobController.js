const Job = require("../models/Job");
const axios = require("axios");

// CREATE JOB
exports.createJob = async (req, res) => {

  try {

    const { taskName, payload, priority } = req.body;

    if (!taskName || !payload || !priority) {
      return res.status(400).json({ message: "All fields required" });
    }

    const job = await Job.create({
      taskName,
      payload,
      priority,
      status: "pending"
    });

    res.json(job);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// GET ALL JOBS
exports.getJobs = async (req, res) => {

  const jobs = await Job.findAll({
    order: [["createdAt", "DESC"]]
  });

  res.json(jobs);
};


// GET JOB BY ID
exports.getJobById = async (req, res) => {

  const job = await Job.findByPk(req.params.id);
  res.json(job);
};


// RUN JOB
exports.runJob = async (req, res) => {

  const job = await Job.findByPk(req.params.id);

  if (!job) {
    return res.status(404).json({ message: "Job not found" });
  }

  job.status = "running";
  await job.save();

  setTimeout(async () => {

    job.status = "completed";
    await job.save();

    // WEBHOOK
    await axios.post(process.env.WEBHOOK_URL, {
      jobId: job.id,
      taskName: job.taskName,
      priority: job.priority,
      payload: job.payload,
      completedAt: new Date()
    });

    console.log("Webhook triggered");

  }, 3000);

  res.json({ message: "Job Started" });
};
