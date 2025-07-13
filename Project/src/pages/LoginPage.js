import React, { useState } from 'react';

// Firebase imports for authentication
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../services/firebase';

// React Router for navigation after login
import { useNavigate, Link as RouterLink } from 'react-router-dom';

// Material-UI components for building the UI
import {
  Button,
  TextField,
  Container,
  Typography,
  Link,
  Box,
  CircularProgress,
  Paper,
  Avatar,
  Stack
} from '@mui/material';

// Icon for the avatar
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const LoginPage = () => {
  // State for form inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // State for handling errors and loading status
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Hook for programmatic navigation
  const navigate = useNavigate();

  // Function to handle form submission
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setError('');       // Clear any previous errors
    setLoading(true);   // Set loading state to true

    try {
      // Attempt to sign in the user with Firebase
      await signInWithEmailAndPassword(auth, email, password);
      // If successful, navigate to the user's dashboard
      navigate('/');
    } catch (err) {
      // If an error occurs, provide a user-friendly message
      switch (err.code) {
        case 'auth/user-not-found':
        case 'auth/wrong-password':
        case 'auth/invalid-credential':
          setError('Invalid email or password. Please try again.');
          break;
        case 'auth/invalid-email':
          setError('Please enter a valid email address.');
          break;
        default:
          setError('An unexpected error occurred. Please try again.');
          break;
      }
      // Log the detailed error to the console for debugging
      console.error("Login Error:", err);
    } finally {
      // No matter the outcome, set loading state back to false
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ mt: 8 }}>
      <Paper
        elevation={6} // Adds a nice shadow effect to the card
        sx={{
          padding: { xs: 2, sm: 4 }, // Responsive padding
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>
        <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 3, width: '100%' }}>
          {/* Stack component provides easy spacing for its children */}
          <Stack spacing={2}>
            <TextField
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading} // Disable the field while loading
            />
            <TextField
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading} // Disable the field while loading
            />
          </Stack>

          {/* Conditionally render the error message */}
          {error && (
            <Typography color="error" variant="body2" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, py: 1.5 }} // py adds vertical padding for a taller button
            disabled={loading} // Disable the button while loading
          >
            {/* Show a spinner or text based on the loading state */}
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
          </Button>

          <Box textAlign="right">
            <Link component={RouterLink} to="/register" variant="body2">
              {"Don't have an account? Register"}
            </Link>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginPage;