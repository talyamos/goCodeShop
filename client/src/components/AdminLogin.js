import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const handleUserNameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = () => {
    if (username === "admin" && password === "password") {
      navigate(`/Admin`);
    } else {
      setError(true);
      setTimeout(() => setError(false), 3000);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Card sx={{ maxWidth: 500, height: 300, margin: "100px" }}>
        <br />
        <CardContent>
          <Typography variant="h5" component="div">
            Admin Login
          </Typography>
          <TextField
            autoFocus
            required
            margin="dense"
            id="userName"
            label="userName"
            type="string"
            fullWidth
            variant="standard"
            onChange={handleUserNameChange}
          />

          <TextField
            required
            margin="dense"
            id="password"
            label="Password"
            type="password"
            fullWidth
            variant="standard"
            onChange={handlePasswordChange}
          />
        </CardContent>
        {error && (
          <CardContent>
            <Alert severity="error">Incorrect username or password.</Alert>
          </CardContent>
        )}
        <CardActions>
          <Button onClick={handleLogin}>Login</Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default AdminLogin;
