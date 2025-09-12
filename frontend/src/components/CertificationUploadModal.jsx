import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { addAchievement } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

export default function CertificationUploadModal() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const achievements = useSelector((state) => state.auth.user.achievements)

  console.log("achievements: ", achievements)

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleUpload = () => {
    if (!description || !image) {
      alert("Please add description and image!");
      return;
    }

    dispatch(addAchievement({
      image: image,
      description
    }))

    navigate('/user/profile')

    setDescription("");
    setImage(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="w-full flex flex-col items-start bg-gray-100 p-6">
      {/* Upload Card */}

      {/* Achievements List */}
      <div className="w-full space-y-4 mb-2">
        {achievements?.map((ach) => (
          <div
            key={ach.id}
            className="w-full flex space-x-4"
          >
            {/* Image Card */}
            <div className="bg-white shadow-md rounded-2xl p-4 flex justify-center items-center w-1/3">
              <img
                src={ach.image}
                alt="achievement"
                className="h-32 w-32 object-contain rounded-xl"
              />
            </div>

            {/* Description Card */}
            <div className="bg-white shadow-md rounded-2xl p-4 flex items-center w-2/3">
              <p className="text-gray-700 text-base">{ach.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="w-full bg-white shadow-md rounded-2xl p-6 mb-6">
        {/* <h2 className="text-xl font-semibold text-center mb-4">Upload Achievement</h2> */}
        <textarea
          className="w-full border rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="1"
          placeholder="Write description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          ref={fileInputRef}
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
