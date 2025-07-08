// src/pages/TicketDetailPage.js

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { db } from '../services/firebase'; // Corrected path
import { doc, getDoc } from 'firebase/firestore';
import { Container, Typography, Paper, CircularProgress, Box, Chip, Grid, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const TicketDetailPage = () => {
  const { ticketId } = useParams();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const docRef = doc(db, 'tickets', ticketId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setTicket({ id: docSnap.id, ...docSnap.data() });
        } else {
          setError("Ticket not found.");
        }
      } catch (err) {
        setError("Failed to fetch ticket data.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTicket();
  }, [ticketId]);

  if (loading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>;
  }

  if (error) {
    return <Container><Typography color="error" sx={{ mt: 4 }}>{error}</Typography></Container>;
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Open': return 'primary';
      case 'In Progress': return 'warning';
      case 'Resolved': return 'success';
      case 'Closed': return 'default';
      default: return 'default';
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Button component={Link} to="/" startIcon={<ArrowBackIcon />} sx={{ mb: 2 }}>
        Back to Dashboard
      </Button>
      <Paper elevation={3} sx={{ p: { xs: 2, sm: 4 } }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Ticket Details
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Typography variant="overline" color="text.secondary">Status</Typography>
            <Chip label={ticket.status} color={getStatusColor(ticket.status)} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="overline" color="text.secondary">Submitted On</Typography>
            <Typography>
              {ticket.createdAt ? new Date(ticket.createdAt.seconds * 1000).toLocaleString() : 'N/A'}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="overline" color="text.secondary">Submitted By</Typography>
            <Typography>{ticket.userEmail}</Typography>
          </Grid>
           <Grid item xs={12} sm={6}>
            <Typography variant="overline" color="text.secondary">Priority</Typography>
            <Typography>{ticket.priority}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="overline" color="text.secondary">Category</Typography>
            <Typography>{ticket.category}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="overline" color="text.secondary">Full Description</Typography>
            <Paper variant="outlined" sx={{ p: 2, mt: 1, whiteSpace: 'pre-wrap', backgroundColor: '#f9f9f9' }}>
                <Typography>{ticket.description}</Typography>
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default TicketDetailPage;