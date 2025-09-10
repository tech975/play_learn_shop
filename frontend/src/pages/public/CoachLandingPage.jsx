import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LandingPageTemplate from "../../components/LandingPageTemplate";

const CoachLandingPage = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const benefits = [
    {
      title: "Get More Students",
      desc: "Access to a large student base and grow your coaching business with verified bookings.",
      icon: "👨‍🎓",
    },
    {
      title: "Easy Scheduling",
      desc: "Manage your sessions, bookings, and availability digitally with our smart calendar system.",
      icon: "📅",
    },
    {
      title: "Instant Earnings",
      desc: "Transparent payments with fast withdrawals and detailed earning analytics.",
      icon: "💰",
    },
    {
      title: "Brand Building",
      desc: "Get visibility, collect reviews, and become a trusted coach in your community.",
      icon: "🏆",
    },
    {
      title: "Analytics Dashboard",
      desc: "Track your sessions, earnings, student progress, and performance metrics.",
      icon: "📊",
    },
    {
      title: "Dedicated Support",
      desc: "Our team helps you grow your coaching journey with 24/7 support and guidance.",
      icon: "🤝",
    },
  ];

  const steps = [
    { step: "Sign Up as a Coach", icon: "📝" },
    { step: "Create Your Profile", icon: "👤" },
    { step: "Start Getting Bookings", icon: "📈" },
  ];

  const testimonials = [
    {
      name: "John Doe",
      quote:
        "Since joining, I've doubled my student base and simplified my scheduling. The platform is amazing for coaches!",
    },
    {
      name: "Priya Sharma",
      quote:
        "The platform helped me reach more students and increase my income significantly. Highly recommended!",
    },
  ];

  const handleJoinAsCoach = () => {
    if (!user) {
      // Store redirect path and navigate to login
      sessionStorage.setItem('redirectAfterLogin', '/partner/coach');
      navigate("/login");
    } else {
      // User is logged in, redirect to coach form
      navigate("/partner/coach");
    }
  };

  return (
    <LandingPageTemplate
      type="coach"
      heroTitle="Grow Your Coaching Career with Our Platform"
      heroDescription="Get access to students, manage sessions, earn more, and build your reputation as a professional coach."
      benefits={benefits}
      steps={steps}
      testimonials={testimonials}
      ctaText="Join as a Coach"
      onCtaClick={handleJoinAsCoach}
    />
  );
};

export default CoachLandingPage;
