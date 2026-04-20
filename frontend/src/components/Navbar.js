import React from 'react';

function Navbar({ user, onLogout }) {
  return (
    <nav className="navbar">
      <h1>📦 Package Tracker System</h1>
      <div className="navbar-user">
        <span>Welcome, {user.username} ({user.role})</span>
        <button className="btn-logout" onClick={onLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;

