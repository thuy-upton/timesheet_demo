// src/components/ProfileForm.js
import React, { useState } from "react";
import { useUser } from "../UserContext";
import JoblyApi from "../api";

function ProfileForm() {
  const { currentUser, setCurrentUser } = useUser();
  const [formData, setFormData] = useState({
    username: currentUser.username,
    firstName: currentUser.firstName,
    lastName: currentUser.lastName,
    email: currentUser.email,
    password: "",
  });
  const [errors, setErrors] = useState([]);
  const [saveConfirmed, setSaveConfirmed] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const profileData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
    };

    let username = formData.username;
    let updatedUser;

    try {
      updatedUser = await JoblyApi.updateUser(username, profileData);
    } catch (errors) {
      setErrors(errors);
      return;
    }

    setFormData((data) => ({ ...data, password: "" }));
    setErrors([]);
    setSaveConfirmed(true);

    // trigger reloading of user information throughout the site
    setCurrentUser(updatedUser);
  };

  return (
    <div>
      <h3>Profile</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <input name="username" value={formData.username} disabled />
        </div>
        <div>
          <label>First Name</label>
          <input
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Last Name</label>
          <input
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Email</label>
          <input name="email" value={formData.email} onChange={handleChange} />
        </div>
        <div>
          <label>Confirm password to make changes:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        {errors.length ? (
          <div>
            {errors.map((error) => (
              <p key={error}>{error}</p>
            ))}
          </div>
        ) : null}

        {saveConfirmed ? <div>Updated successfully.</div> : null}

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}

export default ProfileForm;
