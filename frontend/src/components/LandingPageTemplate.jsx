import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "../pages/public/Footer";

const LandingPageTemplate = ({ 
  type, // 'coach' or 'owner'
  heroTitle,
  heroDescription,
  benefits,
  steps,
  testimonials,
  ctaText,
  onCtaClick
}) => {
  const navigate = useNavigate();

  return (
    <div className="font-sans text-gray-800 min-h-screen bg-gray-50">
      <Navbar scroller={[]} />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 py-20 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            {heroTitle}
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto leading-relaxed">
            {heroDescription}
          </p>
          <button 
            onClick={onCtaClick}
            className="bg-white text-blue-600 px-8 py-4 rounded-xl shadow-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 text-lg font-semibold"
          >
            {ctaText}
          </button>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-purple-400/20 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-blue-300/20 rounded-full blur-lg"></div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-800">
            Why Join Us?
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto text-lg">
            Discover the amazing benefits of being part of our growing community
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, idx) => (
              <div
                key={idx}
                className="p-8 bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
              >
                <div className="text-5xl mb-6 text-center">{benefit.icon}</div>
                <h3 className="text-xl font-bold mb-4 text-gray-800 text-center">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  {benefit.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-800">
            How It Works
          </h2>
          <p className="text-gray-600 text-center mb-12 text-lg">
            Get started in just a few simple steps
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-8">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className="relative p-8 bg-white rounded-2xl shadow-lg text-center transform hover:scale-105 transition-all duration-300 border border-gray-100"
              >
                {/* Step number */}
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  {idx + 1}
                </div>
                <div className="text-5xl mb-6 mt-4">{step.icon}</div>
                <p className="font-semibold text-gray-800 text-lg">{step.step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-800">
            Success Stories
          </h2>
          <p className="text-gray-600 text-center mb-12 text-lg">
            Hear from our community members who have transformed their journey
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, idx) => (
              <div
                key={idx}
                className="p-8 border-2 border-gray-100 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-gray-50"
              >
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-xl">★</span>
                  ))}
                </div>
                <p className="italic mb-6 text-gray-700 text-lg leading-relaxed">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-gray-800 text-lg">
                      {testimonial.name}
                    </p>
                    <p className="text-gray-600">
                      {type === 'coach' ? 'Professional Coach' : 'Venue Owner'}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 py-20 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Join thousands of {type === 'coach' ? 'coaches' : 'venue owners'} who have already transformed their business with our platform
          </p>
          <button 
            onClick={onCtaClick}
            className="bg-white text-blue-600 px-8 py-4 rounded-xl shadow-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 text-lg font-semibold"
          >
            {ctaText}
          </button>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-10 right-10 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 left-10 w-32 h-32 bg-purple-400/20 rounded-full blur-2xl"></div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPageTemplate;