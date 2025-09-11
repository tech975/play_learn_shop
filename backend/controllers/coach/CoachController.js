const Coach = require('../../models/coach/Coach');

/**
 * @desc   Get all approved coaches (for users)
 * @route  GET /api/coaches
 * @access Public
 */
exports.getCoaches = async (req, res) => {
    try {
        const coaches = await Coach.find({ status: 'approved' });
        res.status(200).json(coaches);
    } catch (error) {
        res.status(500).json({ message: "Error fetching coaches" });
    }
}

/**
 * @desc   Create new coach (self-registration)
 * @route  POST /api/coaches
 * @access Private (Coach user)
 */
exports.createCoach = async (req, res) => {
  try {
    const { name, email, phone, sports, experienceYears, studentsTrain, pricing, location } = req.body;

    if (!name || !email || !phone || !sports || !experienceYears || !studentsTrain || !pricing?.amount || !location?.city) {
      return res.status(400).json({ message: "All required fields must be filled" });
    }

    if (experienceYears < 0) {
      return res.status(400).json({ message: "Experience years cannot be negative" });
    }
    if (studentsTrain < 0) {
      return res.status(400).json({ message: "Students trained cannot be negative" });
    }
    if (pricing.amount <= 0) {
      return res.status(400).json({ message: "Pricing amount must be greater than 0" });
    }

    const existing = await Coach.findOne({ owner: req.user._id, status: { $in: ["pending", "approved"] } });
    if (existing) {
      return res.status(400).json({ message: `You already have a ${existing?.status} request` });
    }

    const coach = new Coach({
      ...req.body,
      owner: req.user._id,
      status: "pending"
    });
    await coach.save();

    res.status(201).json({ message: "Request submitted successfully", coach });
  } catch (error) {
    console.error("Error creating coach: ", error);
    res.status(500).json({ message: "Error creating coach" });
  }
};

/**
 * @desc   Get coach by ID
 * @route  GET /api/coaches/:id
 * @access Public
 */
exports.getCoachById = async (req, res) => {
    const { id } = req.params;

    try {
        const coach = await Coach.findById(id);
        if (!coach) {
            return res.status(404).json({ message: "Coach not found" });
        }
        res.status(200).json(coach);
    } catch (error) {
        res.status(500).json({ message: "Error fetching coach" });
    }
};

/**
 * @desc   Update coach
 * @route  PUT /api/coaches/:id
 * @access Private (Coach/Admin)
 */
exports.updateCoach = async (req, res) => {
    const { id } = req.params;

    try {
        const coach = await Coach.findById(id);
        if (!coach) {
            return res.status(404).json({ message: "Coach not found" });
        }

        Object.assign(coach, req.body);
        // coach.status = "pending";

        await coach.save();
        res.status(200).json(coach);
    } catch (error) {
        console.log("error, while updating coach: ", error)
        res.status(500).json({ message: "Error updating coach" });
    }
};

/**
 * @desc   Delete coach (only owner or admin)
 * @route  DELETE /api/coaches/:id
 * @access Private (Coach/Admin)
 */
exports.deleteCoach = async (req, res) => {
    const { id } = req.params;
    
    try {
        const coach = await Coach.findById(id);

        if(!coach){
            return res.status(404).json({ message: "Coach not found" });
        }

        await coach.deleteOne();
        res.status(204).send({ message: "Coach deleted successfully" });
    } catch (error) {
        console.log("error, while deleting coach: ", error)
        res.status(500).json({ message: "Error deleting coach" });
    }
};

/**
 * @desc   Admin: Get all pending coaches
 * @route  GET /api/admin/coaches/pending
 * @access Private (Admin)
 */
exports.getPendingCoaches = async (req, res) => {
  try {
    const coaches = await Coach.find({ status: "pending" });
    res.status(200).json(coaches);
  } catch (error) {
    res.status(500).json({ message: "Error fetching pending coaches", error: error.message });
  }
};

/**
 * @desc   Admin: Approve a coach
 * @route  PUT /api/admin/coaches/:id/approve
 * @access Private (Admin)
 */
exports.approveCoach = async (req, res) => {
  const { id } = req.params;

  try {
    const coach = await Coach.findById(id);
    if (!coach) return res.status(404).json({ message: "Coach not found" });

    coach.status = "approved";
    await coach.save();
    res.status(200).json({ message: "Coach approved successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error approving coach", error: error.message });
  }
};

/**
 * @desc   Admin: Reject a coach
 * @route  PUT /api/admin/coaches/:id/reject
 * @access Private (Admin)
 */
exports.rejectCoach = async (req, res) => {
    const { id } = req.params;

    try {
        const coach = await Coach.findById(id);

        if (!coach) {
            return res.status(404).json({ message: "Coach not found" });
        }

        coach.status = "rejected";
        await coach.save();

        res.status(200).json({ message: "Coach rejected successfully" })
    } catch (error) {
        console.log("error, while rejecting coach: ", error);
        res.status(500).json({ message: "Error rejecting coach" });
    }
}