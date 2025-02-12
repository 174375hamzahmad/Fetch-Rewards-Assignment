import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Container, Box, TextField, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import { login } from "../api/auth";

const LoginPage = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  // Update state when form fields change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await login(formData);
    setUser(formData);
    navigate("/search");

    console.log("Logging in with:", formData);
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 4,
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: "#ffffff",
        }}
      >
        <Typography component="h1" variant="h4" gutterBottom>
          Login
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ mt: 1, width: "100%" }}
        >
          <TextField
            label="Name"
            name="name"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            autoFocus
            value={formData.name}
            onChange={handleChange}
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            value={formData.email}
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;
