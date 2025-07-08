// src/pages/NewTicketPage.js

import React, { useState } from 'react';
import { db, auth } from '../services/firebase'; // Corrected path
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, Select, MenuItem, InputLabel, FormControl, Box, Paper } from '@mui/material';

const NewTicketPage = () => {
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Technical');
  const [priority, setPriority] = useState('Medium');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!description.trim()) {
      setError('Description cannot be empty.');
      return;
    }

    if (!auth.currentUser) {
      setError("You must be logged in to create a ticket.");
      return;
    }

    try {
      await addDoc(collection(db, 'tickets'), {
        description,
        category,
        priority,
        status: 'Open', // Default status
        userId: auth.currentUser.uid,
        userEmail: auth.currentUser.email,
        createdAt: serverTimestamp(),
      });
      navigate('/'); // Go back to dashboard after submission
    } catch (error) {
      console.error("Error creating ticket: ", error);
      setError("Failed to create ticket. Please try again.");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Create New Ticket
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            label="Issue Description"
            multiline
            rows={5}
            fullWidth
            margin="normal"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            helperText="Please be as detailed as possible."
          />
          <FormControl fullWidth margin="normal" required>
            <InputLabel id="category-select-label">Category</InputLabel>
            <Select
              labelId="category-select-label"
              id="category-select"
              value={category}
              label="Category"
              onChange={(e) => setCategory(e.target.value)}
            >
              <MenuItem value="Technical">Technical Issue</MenuItem>
              <MenuItem value="Billing">Billing Question</MenuItem>
              <MenuItem value="General">General Inquiry</MenuItem>
              <MenuItem value="Feature Request">Feature Request</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal" required>
            <InputLabel id="priority-select-label">Priority</InputLabel>
            <Select
              labelId="priority-select-label"
              id="priority-select"
              value={priority}
              label="Priority"
              onChange={(e) => setPriority(e.target.value)}
            >
              <MenuItem value="Low">Low</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="High">High</MenuItem>
            </Select>
          </FormControl>
          {error && <Typography color="error" variant="body2" sx={{ mt: 2 }}>{error}</Typography>}
          <Button type="submit" variant="contained" color="primary" sx={{ mt: 3 }}>
            Submit Ticket
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default NewTicketPage;