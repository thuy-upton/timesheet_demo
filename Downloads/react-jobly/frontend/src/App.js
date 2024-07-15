// src/App.js
import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import JoblyApi from "./api";
import Home from "./components/Home";
import CompanyList from "./components/CompanyList";
import CompanyDetail from "./components/CompanyDetail";
import JobList from "./components/JobList";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import ProfileForm from "./components/ProfileForm";
import Navigation from "./components/Navigation";
import { UserProvider, useUser } from "./UserContext";
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
  const [token, setToken] = useLocalStorage("jobly-token");
  const { currentUser, setCurrentUser } = useUser();

  useEffect(() => {
    async function fetchUser() {
      if (token) {
        try {
          JoblyApi.token = token;
          let { username } = JoblyApi.decodeToken(token); // Assume decodeToken is a utility to decode JWT
          let user = await JoblyApi.getCurrentUser(username);
          setCurrentUser(user);
        } catch (err) {
          console.error("Failed to fetch user", err);
          setCurrentUser(null);
        }
      }
    }
    fetchUser();
  }, [token, setCurrentUser]);

  async function login(data) {
    try {
      let token = await JoblyApi.login(data);
      setToken(token);
    } catch (err) {
      console.error("Login failed", err);
    }
  }

  async function signup(data) {
    try {
      let token = await JoblyApi.signup(data);
      setToken(token);
    } catch (err) {
      console.error("Signup failed", err);
    }
  }

  function logout() {
    setToken(null);
    setCurrentUser(null);
  }

  function PrivateRoute({ children }) {
    return currentUser ? children : <Navigate to="/login" />;
  }

  return (
    <Router>
      <div>
        <Navigation logout={logout} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/companies"
            element={
              <PrivateRoute>
                <CompanyList />
              </PrivateRoute>
            }
          />
          <Route
            path="/companies/:handle"
            element={
              <PrivateRoute>
                <CompanyDetail />
              </PrivateRoute>
            }
          />
          <Route
            path="/jobs"
            element={
              <PrivateRoute>
                <JobList />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<LoginForm login={login} />} />
          <Route path="/signup" element={<SignupForm signup={signup} />} />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <ProfileForm />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default function AppWithProvider() {
  return (
    <UserProvider>
      <App />
    </UserProvider>
  );
}
