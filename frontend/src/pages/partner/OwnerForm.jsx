import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Lock, LogIn } from 'lucide-react';
import { submitOwnerApplication } from '../../services/partnerService';
import SuccessModal from '../../components/SuccessModal';

const OwnerForm = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm();

  // Check if user is authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      // Store the current path to redirect back after login
      sessionStorage.setItem('redirectAfterLogin', '/partner/owner');
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
      
      const response = await submitOwnerApplication(applicationData);
      reset();
      setShowSuccessModal(true);
    } catch (error) {
      console.error('Error submitting owner application:', error);
      toast.error(error.message || 'Failed to submit application. Please try again.');
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
            You need to be logged in to submit a ground owner application. Please login or create an account to continue.
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
        title="Ground Owner Application Submitted!"
        message="Thank you for your interest in becoming a ground owner! We've received your application and our team will review it within 2-3 business days. Once approved, your account will be upgraded to Owner status and you can access the Owner Dashboard with the same login credentials."
        type="owner"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Left Side - Image/Video */}
            <div className="bg-gradient-to-br from-[#00df9a] to-[#00b87a] p-8 lg:p-12 flex flex-col justify-center items-center text-white">
              <div className="text-center">
                <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                  Become a Ground Owner
                </h2>
                <p className="text-lg lg:text-xl mb-8 opacity-90">
                  Join our network of successful ground owners and start earning from your sports facility
                </p>
                <div className="w-full max-w-md mx-auto">
                  <img 
                    src="https://images.unsplash.com/photo-1546608235-3310a2494cdf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGZvb3RiYWxsfGVufDB8fDB8fHww" 
                    alt="Sports Ground" 
                    className="w-full h-64 object-cover rounded-lg shadow-lg"
                  />
                </div>
                <div className="mt-8 space-y-4">
                  <div className="flex items-center justify-center space-x-3">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span>Easy registration process</span>
                  </div>
                  <div className="flex items-center justify-center space-x-3">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span>Maximize your ground utilization</span>
                  </div>
                  <div className="flex items-center justify-center space-x-3">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span>24/7 support and management</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="p-8 lg:p-12">
              <div className="max-w-md mx-auto">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  Owner Registration
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
                      {...register('name', { 
                        required: 'Name is required',
                        minLength: { value: 2, message: 'Name must be at least 2 characters' }
                      })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00df9a] focus:border-transparent transition-all duration-200"
                      placeholder="Enter your full name"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      {...register('email', { 
                        required: 'Email is required',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Invalid email address'
                        }
                      })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00df9a] focus:border-transparent transition-all duration-200"
                      placeholder="Enter your email"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      {...register('phone', { 
                        required: 'Phone number is required',
                        pattern: {
                          value: /^[0-9]{10}$/,
                          message: 'Phone number must be exactly 10 digits'
                        }
                      })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00df9a] focus:border-transparent transition-all duration-200"
                      placeholder="Enter 10-digit phone number"
                      maxLength="10"
                    />
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                    )}
                  </div>

                  {/* Ground Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ground Name *
                    </label>
                    <input
                      type="text"
                      {...register('groundName', { 
                        required: 'Ground name is required',
                        minLength: { value: 3, message: 'Ground name must be at least 3 characters' }
                      })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00df9a] focus:border-transparent transition-all duration-200"
                      placeholder="Enter your ground name"
                    />
                    {errors.groundName && (
                      <p className="mt-1 text-sm text-red-600">{errors.groundName.message}</p>
                    )}
                  </div>

                  {/* Address */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ground Address *
                    </label>
                    <textarea
                      {...register('address', { 
                        required: 'Address is required',
                        minLength: { value: 10, message: 'Address must be at least 10 characters' }
                      })}
                      rows="3"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00df9a] focus:border-transparent transition-all duration-200 resize-none"
                      placeholder="Enter complete address"
                    />
                    {errors.address && (
                      <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
                    )}
                  </div>

                  {/* City and State */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        City *
                      </label>
                      <input
                        type="text"
                        {...register('city', { 
                          required: 'City is required',
                          minLength: { value: 2, message: 'City must be at least 2 characters' }
                        })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00df9a] focus:border-transparent transition-all duration-200"
                        placeholder="City"
                      />
                      {errors.city && (
                        <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        State *
                      </label>
                      <input
                        type="text"
                        {...register('state', { 
                          required: 'State is required',
                          minLength: { value: 2, message: 'State must be at least 2 characters' }
                        })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00df9a] focus:border-transparent transition-all duration-200"
                        placeholder="State"
                      />
                      {errors.state && (
                        <p className="mt-1 text-sm text-red-600">{errors.state.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#00df9a] text-black font-semibold py-3 px-6 rounded-lg hover:bg-[#00b87a] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Application'}
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

export default OwnerForm;
