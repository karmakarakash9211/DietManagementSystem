import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper
} from "@mui/material";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", { email, password });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      if (res.data.role === "ADMIN") navigate("/admin");
      else if (res.data.role === "MOTIVATOR") navigate("/motivator");
      else navigate("/challenger");

    } catch {
      alert("Invalid Credentials");
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper sx={{ padding: 4, marginTop: 10 }}>
        <Typography variant="h5" align="center">Login</Typography>

        <TextField
          fullWidth
          label="Email"
          margin="normal"
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          fullWidth
          type="password"
          label="Password"
          margin="normal"
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 2 }}
          onClick={handleLogin}
        >
          Login
        </Button>
        <Button
  fullWidth
  variant="outlined"
  sx={{ mt: 2 }}
  onClick={() => navigate("/register")}
>
  Create Account
</Button>
      </Paper>
    </Container>
  );
}

export default Login;