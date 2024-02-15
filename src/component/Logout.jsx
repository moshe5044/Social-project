import React from "react";

const Logout = ({ setUser, setIslog }) => {

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setIslog(false);

  };

  return (
    <div className="logout">
      <h1 className="logout-message">Are you sure you want to log out?</h1>
      <button className="logout-button" onClick={handleLogout}>yes</button>
    </div>
  );
};

export default Logout;

