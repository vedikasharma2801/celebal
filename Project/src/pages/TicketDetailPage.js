// src/pages/TicketDetailPage.js

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../services/firebase';
import { doc, getDoc } from 'firebase/firestore';
import {
  Container, Typography, Paper, CircularProgress, Box, Chip, Grid, Stack
} from '@mui/material';

const TicketDetailPage = () => {
  const { ticketId } = useParams();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTicket = async () => {
      if (!ticketId) return;
      try {
        const docRef = doc(db, 'tickets', ticketId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setTicket({ id: docSnap.id, ...docSnap.data() });
        } else {
          setError("Ticket not found.");
        }
      } catch (err) { setError("Failed to fetch ticket data."); } 
      finally { setLoading(false); }
    };
    fetchTicket();
  }, [ticketId]);

  const getStatusColor = (status) => {
    if (status === 'Resolved') return 'success';
    if (status === 'In Progress') return 'warning';
    if (status === 'Closed') return 'default';
    return 'primary';
  };

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>;
  if (error) return <Container><Typography color="error" sx={{ mt: 4 }}>{error}</Typography></Container>;

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: { xs: 2, sm: 4 } }}>
        <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', sm: 'center' }} mb={3} spacing={2}>
          <Typography variant="h4" component="h1">Ticket Details</Typography>
          <Chip label={ticket.status} color={getStatusColor(ticket.status)} sx={{ fontSize: '1rem', padding: '16px 8px', height: 'auto' }} />
        </Stack>
        <Grid container spacing={3}>
          {/* --- UPDATED CODE IS HERE --- */}
          {/* The 'item' prop has been removed from all the Grid components below. */}
          <Grid xs={12} sm={6}>
            <Typography variant="overline" color="text.secondary">Ticket ID</Typography>
            <Typography sx={{ wordBreak: 'break-all' }}>{ticket.id}</Typography>
          </Grid>
          <Grid xs={12} sm={6}>
            <Typography variant="overline" color="text.secondary">Submitted On</Typography>
            <Typography>{ticket.createdAt ? new Date(ticket.createdAt.seconds * 1000).toLocaleString() : 'N/A'}</Typography>
          </Grid>
          <Grid xs={12} sm={6}>
            <Typography variant="overline" color="text.secondary">Submitted By</Typography>
            <Typography>{ticket.userEmail}</Typography>
          </Grid>
          <Grid xs={12} sm={6}>
            <Typography variant="overline" color="text.secondary">Priority</Typography>
            <Typography>{ticket.priority}</Typography>
          </Grid>
          <Grid xs={12}>
            <Typography variant="overline" color="text.secondary">Category</Typography>
            <Typography>{ticket.category}</Typography>
          </Grid>
          <Grid xs={12}>
            <Typography variant="overline" color="text.secondary">Full Description</Typography>
            <Paper variant="outlined" sx={{ p: 2, mt: 1, whiteSpace: 'pre-wrap', backgroundColor: '#f9f9f9', borderColor: '#e0e0e0' }}><Typography>{ticket.description}</Typography></Paper>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default TicketDetailPage;