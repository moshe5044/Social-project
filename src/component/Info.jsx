import React from 'react';

const Info = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div className='userDetailes'>
      {user && (
        <div className='infoContainer'>
          <nav>Name: {user.name}</nav>
          <nav>Email: {user.email}</nav>
          <nav>Phone: {user.phone}</nav>
          <nav>Street: {user.street}</nav>
          <nav className='lastNav'>City: {user.city}</nav>
        </div>
      )}
      {!user && <p>No user information available.</p>}
    </div>
  )
}

export default Info;
