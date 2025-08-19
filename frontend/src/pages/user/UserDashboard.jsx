import React from 'react'

const UserDashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));
    return (
      <div>
        <h1 className="text-xl font-bold">Welcome, {user.name}</h1>
        <p>Your role: {user.role}</p>
      </div>
    );
}

export default UserDashboard