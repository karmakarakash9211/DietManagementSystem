import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  MenuItem
} from "@mui/material";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "CHALLENGER"
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = async () => {
    try {
      await API.post("/auth/register", user);
      alert("Registered successfully");
      navigate("/");
    } catch {
      alert("Registration failed");
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper sx={{ padding: 4, marginTop: 10 }}>
        <Typography variant="h5" align="center">
          Register
        </Typography>

        <TextField
          fullWidth
          label="Name"
          name="name"
          margin="normal"
          onChange={handleChange}
        />

        <TextField
          fullWidth
          label="Email"
          name="email"
          margin="normal"
          onChange={handleChange}
        />

        <TextField
          fullWidth
          type="password"
          label="Password"
          name="password"
          margin="normal"
          onChange={handleChange}
        />

        {/* ROLE SELECT */}
        <TextField
          select
          fullWidth
          label="Role"
          name="role"
          value={user.role}
          margin="normal"
          onChange={handleChange}
        >
          <MenuItem value="CHALLENGER">Challenger</MenuItem>
          <MenuItem value="MOTIVATOR">Motivator</MenuItem>
        </TextField>

        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 2 }}
          onClick={handleRegister}
        >
          Register
        </Button>

        <Button
          fullWidth
          sx={{ mt: 1 }}
          onClick={() => navigate("/")}
        >
          Back to Login
        </Button>
      </Paper>
    </Container>
  );
}

export default Register;