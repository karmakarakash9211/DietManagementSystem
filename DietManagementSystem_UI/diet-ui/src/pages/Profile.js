import React, { useEffect, useState } from "react";
import {
  Paper,
  Typography,
  TextField,
  Button
} from "@mui/material";
import API from "../services/api";

function Profile() {

  const [user, setUser] = useState({
    name: "",
    email: "",
    height: "",
    weight: "",
    status: ""
  });

  // 📥 Fetch profile
  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const res = await API.get("/user/profile");
    setUser(res.data);
  };

  // ✏️ Handle change
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  // 💾 Update profile
  const updateProfile = async () => {
    await API.put("/user/profile", user);
    alert("Profile updated");
  };

  return (
    <Paper sx={{ p: 3, maxWidth: 500 }}>
      <Typography variant="h5">My Profile</Typography>

      <TextField
        fullWidth
        label="Name"
        name="name"
        value={user.name}
        onChange={handleChange}
        sx={{ mt: 2 }}
      />

      <TextField
        fullWidth
        label="Email"
        value={user.email}
        disabled
        sx={{ mt: 2 }}
      />

      <TextField
        fullWidth
        label="Height"
        name="height"
        value={user.height}
        onChange={handleChange}
        sx={{ mt: 2 }}
      />

      <TextField
        fullWidth
        label="Weight"
        name="weight"
        value={user.weight}
        onChange={handleChange}
        sx={{ mt: 2 }}
      />

     
    </Paper>
  );
}

export default Profile;