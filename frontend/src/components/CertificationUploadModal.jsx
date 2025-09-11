import React, { useState } from "react";

export default function CertificationUploadModal() {
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [achievements, setAchievements] = useState([]);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleUpload = () => {
    if (!description || !image) {
      alert("Please add description and image!");
      return;
    }

    // Normally, yahan API call karni hogi backend pe
    const newAchievement = {
      id: Date.now(),
      description,
      image: URL.createObjectURL(image),
    };

    // naya achievement list ke TOP pe add karo
    setAchievements([...achievements, newAchievement]);

    // reset inputs
    setDescription("");
    setImage(null);
  };

  return (
    <div className="w-full flex flex-col items-center bg-gray-100 p-6">
      {/* Upload Card */}

      {/* Achievements List */}
      <div className="w-full max-w-md space-y-4 mb-2">
        {achievements.map((ach) => (
          <div
            key={ach.id}
            className="bg-white shadow-md rounded-2xl p-4 flex flex-col items-center"
          >
            <img
              src={ach.image}
              alt="achievement"
              className="w-full h-48 object-cover rounded-xl mb-3"
            />
            <p className="text-gray-700">{ach.description}</p>
          </div>
        ))}
      </div>

      <div className="w-full max-w-md bg-white shadow-md rounded-2xl p-6 mb-6">
        {/* <h2 className="text-xl font-semibold text-center mb-4">Upload Achievement</h2> */}
        <textarea
          className="w-full border rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="3"
          placeholder="Write description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="file"
          accept="image/*"
          className="mb-4 w-full"
          onChange={handleImageChange}
        />
        <button
          onClick={handleUpload}
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Upload
        </button>
      </div>

    </div>
  );
}
