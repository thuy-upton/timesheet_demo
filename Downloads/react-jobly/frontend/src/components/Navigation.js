import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "../UserContext";

function Navigation({ logout }) {
  const { currentUser } = useUser();

  function handleLogout() {
    logout();
  }

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/companies">Companies</Link>
        </li>
        <li>
          <Link to="/jobs">Jobs</Link>
        </li>
        {currentUser ? (
          <>
            <li>{currentUser.username}</li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <Link to="/" onClick={handleLogout}>
                Logout
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navigation;
