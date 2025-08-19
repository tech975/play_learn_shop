import React from 'react'
import Navbar from '../../components/Navbar';
import HeroSlider from '../public/HeroSlider';

const UserDashboard = () => {
  // const user = JSON.parse(localStorage.getItem("user"));
    return (
      <div>
        <HeroSlider />
        <Navbar />
        {/* <h1 className="text-xl font-bold">Welcome, {user.name}</h1>
        <p>Your role: {user.role}</p> */}
      </div>
    );
}

export default UserDashboard