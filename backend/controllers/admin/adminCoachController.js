const Coach = require("../../models/coach/Coach");

exports.getAllCoaches = async (req, res) => {
    try {
        const allCoachesRequest = await Coach.find();
        res.json(allCoachesRequest);
    } catch (error) {
        console.log("Error while getting all the Coaches: ", error)
        res.status(500).json({ message: error.message})
    }
}

exports.updateRequestStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!["approved", "rejected", "pending"].includes(status)) {
            return res.status(400).json({ message: "Invalid status" });
        }

        const request = await Coach.findById(id).populate("owner");
        if (!request) return res.status(404).json({ message: "Coach request not found" });

        request.status = status;
        await request.save();

        if (status === "approved") {
            request.owner.role = "coach",
            await request.owner.save();
        }

        res.json({ message: `Request ${status}`, request });
    } catch (error) {
        console.log("Error while updating the status :", error)
        res.status(500).json({ message: error.message });
    }
}