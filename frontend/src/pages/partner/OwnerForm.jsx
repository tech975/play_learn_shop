import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from "react-toastify";
import { Lock, LogIn } from 'lucide-react';
import { submitCoachApplication } from "../../services/partnerService";
import SuccessModal from "../../components/SuccessModal";

const CoachForm = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  // Check if user is authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      // Store the current path to redirect back after login
      sessionStorage.setItem('redirectAfterLogin', '/partner/coach');
    }
  }, [isAuthenticated]);

  const onSubmit = async (data) => {
    if (!isAuthenticated) {
      toast.error('Please login first to submit your application');
      navigate('/login');
      return;
    }

    try {
      // Include user ID in the application data
      const applicationData = {
        ...data,
        userId: user.id,
        userEmail: user.email,
        userName: user.name
      };
      
      const response = await submitCoachApplication(applicationData);
      reset();
      setShowSuccessModal(true);
    } catch (error) {
      console.error("Error submitting coach application:", error);
      toast.error(
        error.message || "Failed to submit application. Please try again."
      );
    }
  };

  // If user is not authenticated, show login prompt
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 flex items-center justify-center">
        <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock className="w-10 h-10 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Login Required</h2>
          <p className="text-gray-600 mb-6">
            You need to be logged in to submit a coach application. Please login or create an account to continue.
          </p>
          <button
            onClick={() => navigate('/login')}
            className="w-full bg-[#00df9a] text-black font-semibold py-3 px-6 rounded-lg hover:bg-[#00b87a] transition-colors duration-200 flex items-center justify-center"
          >
            <LogIn className="w-5 h-5 mr-2" />
            Login to Continue
          </button>
          <button
            onClick={() => navigate('/')}
            className="w-full mt-3 text-gray-600 hover:text-gray-800 transition-colors duration-200"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title="Coach Application Submitted!"
        message="Thank you for your interest in becoming a coach! We've received your application and our team will review it within 2-3 business days. Once approved, your account will be upgraded to Coach status and you can access coaching features with the same login credentials."
        type="coach"
      />

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
                    {/* Name */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        {...register("name", {
                          required: "Name is required",
                          minLength: {
                            value: 2,
                            message: "Name must be at least 2 characters",
                          },
                        })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00df9a] focus:border-transparent transition-all duration-200"
                        placeholder="Enter your full name"
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.name.message}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid email address",
                          },
                        })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00df9a] focus:border-transparent transition-all duration-200"
                        placeholder="Enter your email"
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.email.message}
                        </p>
                      )}
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        {...register("phone", {
                          required: "Phone number is required",
                          pattern: {
                            value: /^[0-9]{10}$/,
                            message: "Phone number must be exactly 10 digits",
                          },
                        })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00df9a] focus:border-transparent transition-all duration-200"
                        placeholder="Enter 10-digit phone number"
                        maxLength="10"
                      />
                      {errors.phone && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.phone.message}
                        </p>
                      )}
                    </div>

                    {/* Expertise */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Expertise/Sport *
                      </label>
                      <select
                        {...register("expertise", {
                          required: "Please select your expertise",
                        })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00df9a] focus:border-transparent transition-all duration-200"
                      >
                        <option value="">Select your expertise</option>
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
                      {errors.expertise && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.expertise.message}
                        </p>
                      )}
                    </div>

                    {/* Years of Experience */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Years of Experience *
                      </label>
                      <input
                        type="number"
                        {...register("experience", {
                          required: "Experience is required",
                          min: {
                            value: 1,
                            message: "Experience must be at least 1 year",
                          },
                          max: {
                            value: 50,
                            message: "Experience cannot exceed 50 years",
                          },
                        })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00df9a] focus:border-transparent transition-all duration-200"
                        placeholder="Enter years of experience"
                        min="1"
                        max="50"
                      />
                      {errors.experience && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.experience.message}
                        </p>
                      )}
                    </div>

                    {/* Students Trained */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Number of Students Trained *
                      </label>
                      <input
                        type="number"
                        {...register("studentsTrained", {
                          required: "Number of students trained is required",
                          min: { value: 0, message: "Cannot be negative" },
                          max: {
                            value: 10000,
                            message: "Number seems too high",
                          },
                        })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00df9a] focus:border-transparent transition-all duration-200"
                        placeholder="Enter number of students trained"
                        min="0"
                      />
                      {errors.studentsTrained && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.studentsTrained.message}
                        </p>
                      )}
                    </div>

                    {/* Address */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Address *
                      </label>
                      <textarea
                        {...register("address", {
                          required: "Address is required",
                          minLength: {
                            value: 10,
                            message: "Address must be at least 10 characters",
                          },
                        })}
                        rows="3"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00df9a] focus:border-transparent transition-all duration-200 resize-none"
                        placeholder="Enter your complete address"
                      />
                      {errors.address && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.address.message}
                        </p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#00df9a] text-black font-semibold py-3 px-6 rounded-lg hover:bg-[#00b87a] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
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
