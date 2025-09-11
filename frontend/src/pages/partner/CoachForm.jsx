import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Lock, LogIn } from "lucide-react";
import { createCoach } from "../../features/coach/coachBookingSlice";

const CoachForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const onSubmit = async (data) => {

    console.log("data: ", data)
    if (!user) {
      toast.error("Please login first to submit your application");
      sessionStorage.setItem("redirectAfterLogin", "/partner/coach");
      navigate("/login");
      return;
    }

    try {
      // Include user ID in the application data
      const applicationData = {
        ...data,
        // userId: user?._id || user.id,
        email: user?.email,
        name: user?.name,
        phone: user?.phone,
        sports: Array.isArray(data?.sports) ? data?.sports : [data?.sports],
        experienceYears: data?.experienceYears,
        pricing: {
          ...data.pricing,
          amount: Number(data?.pricing?.amount), // ensure number
          currency: "INR",
        },
        location: data?.location,
        studentsTrain: data?.studentsTrain
      };

      console.log("application Data: ", applicationData)

      // const response = await submitCoachApplication(applicationData);
      await dispatch(createCoach(applicationData))
      reset();
      setShowSuccessModal(true);
    } catch (error) {
      console.error("Error submitting coach application:", error);
      toast.error(
        error.message || "Failed to submit application. Please try again."
      );
    }
  };

  // Show form regardless of authentication status
  // Authentication check happens only on form submission

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-0">
              {/* Left Side - Image/Video */}
              <div className="bg-gradient-to-br from-[#00df9a] to-[#00b87a] p-8 lg:p-12 flex flex-col justify-center items-center text-white">
                <div className="text-center">
                  <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                    Join as a Coach
                  </h2>
                  <p className="text-lg lg:text-xl mb-8 opacity-90">
                    Share your expertise and help aspiring athletes achieve
                    their dreams
                  </p>
                  <div className="w-full max-w-md mx-auto">
                    <img
                      src="https://images.unsplash.com/photo-1585757318177-0570a997dc3a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y29hY2h8ZW58MHx8MHx8fDA%3D"
                      alt="Sports Coach"
                      className="w-full h-64 object-cover rounded-lg shadow-lg"
                    />
                  </div>
                  <div className="mt-8 space-y-4">
                    <div className="flex items-center justify-center space-x-3">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                      <span>Flexible coaching schedules</span>
                    </div>
                    <div className="flex items-center justify-center space-x-3">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                      <span>Connect with passionate athletes</span>
                    </div>
                    <div className="flex items-center justify-center space-x-3">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                      <span>Competitive compensation</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side - Form */}
              <div className="p-8 lg:p-12">
                <div className="max-w-md mx-auto">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    Coach Registration
                  </h3>
                  <p className="text-gray-600 mb-8">
                    Fill out the form below to get started
                  </p>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Full Name */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        defaultValue={user?.name || ""}
                        type="text"
                        {...register("name", {
                          required: "Name is required",
                          minLength: { value: 2, message: "At least 2 characters required" },
                        })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00df9a]"
                        placeholder="Enter your full name"
                      />
                      {errors.name && <p className="text-red-600">{errors.name.message}</p>}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        defaultValue={user?.email || ""}
                        type="email"
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid email address",
                          },
                        })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00df9a]"
                        placeholder="Enter your email"
                      />
                      {errors.email && <p className="text-red-600">{errors.email.message}</p>}
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <input
                        defaultValue={user?.phone || ""}
                        type="tel"
                        {...register("phone", {
                          required: "Phone number is required",
                          pattern: { value: /^[0-9]{10}$/, message: "Must be 10 digits" },
                        })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00df9a]"
                        placeholder="Enter 10-digit phone number"
                        maxLength="10"
                      />
                      {errors.phone && <p className="text-red-600">{errors.phone.message}</p>}
                    </div>

                    {/* Sports */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Sports *
                      </label>
                      <select
                        {...register("sports", { required: "Please select your sport" })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00df9a]"
                      >
                        <option value="">Select your sports</option>
                        <option value="football">Football</option>
                        <option value="cricket">Cricket</option>
                        <option value="basketball">Basketball</option>
                        <option value="tennis">Tennis</option>
                        <option value="badminton">Badminton</option>
                        <option value="volleyball">Volleyball</option>
                        <option value="athletics">Athletics</option>
                        <option value="swimming">Swimming</option>
                        <option value="other">Other</option>
                      </select>
                      {errors.sports && <p className="text-red-600">{errors.sports.message}</p>}
                    </div>

                    {/* Years of Experience & Students Trained */}
                    <div className="flex gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Years of Experience *
                        </label>
                        <input
                          type="number"
                          {...register("experienceYears", {
                            required: "Experience is required",
                            min: { value: 1, message: "At least 1 year required" },
                            max: { value: 50, message: "Max 50 years allowed" },
                          })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00df9a]"
                          placeholder="Years of experience"
                        />
                        {errors.experienceYears && (
                          <p className="text-red-600">{errors.experienceYears.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Students Trained *
                        </label>
                        <input
                          type="number"
                          {...register("studentsTrain", {
                            required: "Students trained is required",
                            min: { value: 0, message: "Cannot be negative" },
                          })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00df9a]"
                          placeholder="Number of students"
                        />
                        {errors.studentsTrain && (
                          <p className="text-red-600">{errors.studentsTrain.message}</p>
                        )}
                      </div>
                    </div>

                    {/* Pricing */}
                    <div className="flex gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Pricing Type *
                        </label>
                        <select
                          {...register("pricing.type", { required: "Select pricing type" })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00df9a]"
                        >
                          <option value="per_session">Per Session</option>
                          <option value="hourly">Hourly</option>
                        </select>
                        {errors?.pricing?.type && (
                          <p className="text-red-600">{errors.pricing.type.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Pricing Amount (INR) *
                        </label>
                        <input
                          type="number"
                          {...register("pricing.amount", {
                            required: "Amount is required",
                            min: { value: 1, message: "Must be greater than 0" },
                          })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00df9a]"
                          placeholder="Enter amount"
                        />
                        {errors?.pricing?.amount && (
                          <p className="text-red-600">{errors.pricing.amount.message}</p>
                        )}
                      </div>
                    </div>

                    {/* Location */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Address *
                      </label>
                      <textarea
                        {...register("location.address", {
                          required: "Address is required",
                          minLength: { value: 10, message: "At least 10 characters" },
                        })}
                        rows="3"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00df9a]"
                        placeholder="Enter address"
                      />
                      {errors.location?.address && (
                        <p className="text-red-600">{errors.location.address.message}</p>
                      )}
                    </div>

                    <div className="flex gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          City *
                        </label>
                        <input
                          type="text"
                          {...register("location.city", { required: "City is required" })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00df9a]"
                          placeholder="Enter city"
                        />
                        {errors.location?.city && (
                          <p className="text-red-600">{errors.location.city.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          State *
                        </label>
                        <input
                          type="text"
                          {...register("location.state", { required: "State is required" })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00df9a]"
                          placeholder="Enter state"
                        />
                        {errors.location?.state && (
                          <p className="text-red-600">{errors.location.state.message}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Pincode *
                      </label>
                      <input
                        type="text"
                        {...register("location.pincode", {
                          required: "Pincode is required",
                          pattern: { value: /^[0-9]{6}$/, message: "Must be 6 digits" },
                        })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00df9a]"
                        placeholder="Enter pincode"
                      />
                      {errors.location?.pincode && (
                        <p className="text-red-600">{errors.location.pincode.message}</p>
                      )}
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#00df9a] text-black font-semibold py-3 px-6 rounded-lg hover:bg-[#00b87a] transition"
                    >
                      {isSubmitting ? "Submitting..." : "Submit Application"}
                    </button>
                  </form>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CoachForm;
