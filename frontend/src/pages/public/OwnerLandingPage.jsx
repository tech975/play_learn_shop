import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LandingPageTemplate from "../../components/LandingPageTemplate";

const OwnerLandingPage = () => {
  const navigate = useNavigate();

  const benefits = [
    {
      title: "Maximize Revenue",
      desc: "Increase your venue bookings and revenue with our smart pricing and booking management system.",
      icon: "💰",
    },
    {
      title: "Easy Management",
      desc: "Manage bookings, schedules, and payments digitally with our comprehensive dashboard.",
      icon: "📊",
    },
    {
      title: "Wider Reach",
      desc: "Get discovered by thousands of sports enthusiasts looking for quality venues in your area.",
      icon: "🌍",
    },
    {
      title: "Automated Bookings",
      desc: "24/7 online booking system that works even when you're not available to take calls.",
      icon: "🤖",
    },
    {
      title: "Customer Reviews",
      desc: "Build trust and credibility with verified customer reviews and ratings system.",
      icon: "⭐",
    },
    {
      title: "Marketing Support",
      desc: "Get featured in our platform promotions and benefit from our marketing campaigns.",
      icon: "📢",
    },
  ];

  const steps = [
    { step: "List Your Venue", icon: "🏟️" },
    { step: "Set Your Pricing", icon: "💵" },
    { step: "Start Earning", icon: "📈" },
  ];

  const testimonials = [
    {
      name: "Rajesh Kumar",
      quote: "My venue bookings increased by 300% after joining this platform. The automated system saves me so much time!",
    },
    {
      name: "Meera Patel",
      quote: "Best decision for my sports complex. The platform brings consistent bookings and the payment system is seamless.",
    },
  ];

  const { user } = useSelector((state) => state.auth);

  const handleListVenue = () => {
    if (!user) {
      // Store redirect path and navigate to login
      sessionStorage.setItem('redirectAfterLogin', '/partner/owner');
      navigate("/login");
    } else {
      // User is logged in, redirect to owner form
      navigate("/partner/owner");
    }
  };

  return (
    <LandingPageTemplate
      type="owner"
      heroTitle="Transform Your Venue into a Profitable Business"
      heroDescription="List your sports venue, reach thousands of players, and maximize your revenue with our comprehensive booking platform."
      benefits={benefits}
      steps={steps}
      testimonials={testimonials}
      ctaText="List Your Ground"
      onCtaClick={handleListVenue}
    />
  );
};

export default OwnerLandingPage;