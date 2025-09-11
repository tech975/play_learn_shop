// controllers/admin/ownerRequestController.js
const OwnerRequest = require("../../models/role-request/OwnerRequest");
const User = require("../../models/User");
const Venue = require("../../models/Venue");

exports.getPendingRequests = async (req, res) => {
  try {
    const requests = await Venue.find({ status: "pending" });
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateRequestStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["approved", "rejected", "pending"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const request = await Venue.findById(id).populate("owner");
    if (!request) return res.status(404).json({ message: "Venue request not found" });

    request.status = status;
    await request.save();

    if (status === "approved") {
      request.owner.role = "owner";
      await request.owner.save();
    }

    res.json({ message: `Request ${status}`, request });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
