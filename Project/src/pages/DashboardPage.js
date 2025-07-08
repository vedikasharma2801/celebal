// src/pages/DashboardPage.js

import React, { useState, useEffect } from 'react';
import { db, auth } from '../services/firebase'; // Corrected path
import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore';
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';
import { Container, Button, Typography, List, ListItem, ListItemText, Paper, CircularProgress, Box, Chip } from '@mui/material';

const DashboardPage = () => {
  const { currentUser } = useAuth(); // Get user from our Auth context
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentUser) {
      // Create a query to get tickets for the current user
      const q = query(
        collection(db, 'tickets'),
        where('userId', '==', currentUser.uid),
        orderBy('createdAt', 'desc') // Show newest tickets first
      );

      // Use onSnapshot for real-time updates
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const userTickets = [];
        querySnapshot.forEach((doc) => {
          userTickets.push({ id: doc.id, ...doc.data() });
        });
        setTickets(userTickets);
        setLoading(false);
      });

      // Cleanup subscription on unmount
      return () => unsubscribe();
    }
  }, [currentUser]); // Re-run effect if currentUser changes

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  const getStatusColor = (status) => {
    if (status === 'Resolved' || status === 'Closed') return 'success';
    if (status === 'In Progress') return 'warning';
    return 'primary';
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4">My Tickets</Typography>
        <Button variant="contained" color="primary" component={Link} to="/new-ticket">
          Create New Ticket
        </Button>
      </Box>
      <Paper elevation={2}>
        <List>
          {tickets.length > 0 ? (
            tickets.map(ticket => (
              <ListItem
                button
                key={ticket.id}
                component={Link}
                to={`/ticket/${ticket.id}`}
                divider
              >
                <ListItemText
                  primary={ticket.description.substring(0, 80) + (ticket.description.length > 80 ? '...' : '')}
                  secondary={`Category: ${ticket.category} | Priority: ${ticket.priority}`}
                />
                <Chip label={ticket.status} color={getStatusColor(ticket.status)} />
              </ListItem>
            ))
          ) : (
            <ListItem>
              <ListItemText primary="You have not created any tickets yet." />
            </ListItem>
          )}
        </List>
      </Paper>
    </Container>
  );
};

export default DashboardPage;