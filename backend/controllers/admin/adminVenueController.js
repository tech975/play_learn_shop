// controllers/admin/ownerRequestController.js
const OwnerRequest = require("../../models/role-request/OwnerRequest");
const User = require("../../models/User");

exports.applyAsOwner = async (req, res) => {
  try {
    const { name, email, phone, role, groundName, groundAddress } = req.body;

    console.info(req.body)

    if (!name || !email || !phone || !role || !groundName || !groundAddress) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // prevent duplicate pending request
    const existing = await OwnerRequest.findOne({ user: req.user._id, status: "pending" });
    if (existing) {
      return res.status(400).json({ message: "You already have a pending request" });
    }

    const request = await OwnerRequest.create({
      user: req.user._id,
      name,
      email,
      phone,
      role,
      groundName,
      groundAddress
    });

    res.status(201).json({ message: "Request submitted", request });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getPendingRequests = async (req, res) => {
  try {
    const requests = await OwnerRequest.find({ status: "pending" }).populate("user", "name email phone");
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateRequestStatus = async (req, res) => {
  try {
    const { requestId } = req.params;
    const { status } = req.body;

    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const request = await OwnerRequest.findById(requestId).populate("user");
    if (!request) return res.status(404).json({ message: "Request not found" });

    request.status = status;
    await request.save();

    if (status === "approved") {
      request.user.role = "owner";
      await request.user.save();
    }

    res.json({ message: `Request ${status}`, request });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
