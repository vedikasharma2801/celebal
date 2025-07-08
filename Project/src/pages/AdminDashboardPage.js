// src/pages/AdminDashboardPage.js

import React, { useState, useEffect } from 'react';
import { db, auth } from '../services/firebase'; // Corrected path
import { collection, query, onSnapshot, doc, updateDoc, orderBy } from 'firebase/firestore';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Paper, List, ListItem, ListItemText, Select, MenuItem, CircularProgress, Box, FormControl, InputLabel } from '@mui/material';

// ! IMPORTANT: Replace this with the actual UID of your admin user account
// You can find this in the Firebase Console > Authentication > Users tab
const ADMIN_UID = "PASTE_YOUR_ADMIN_UID_HERE";

const AdminDashboardPage = () => {
  const { currentUser } = useAuth();
  const [allTickets, setAllTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // If auth is still loading, or user is not logged in, do nothing yet.
    if (!currentUser) {
        // If auth finished loading and there's no user, they can't be an admin.
        if (auth.currentUser === null) navigate('/');
        return;
    }
    
    // Check if the logged-in user is the admin
    if (currentUser.uid !== ADMIN_UID) {
      navigate('/'); // Redirect non-admins to the regular dashboard
      return;
    }

    // User is an admin, fetch all tickets
    const q = query(collection(db, 'tickets'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const ticketsData = [];
      querySnapshot.forEach((doc) => {
        ticketsData.push({ id: doc.id, ...doc.data() });
      });
      setAllTickets(ticketsData);
      setLoading(false);
    });
    
    return () => unsubscribe();
  }, [currentUser, navigate]);

  const handleStatusChange = async (ticketId, newStatus) => {
    const ticketRef = doc(db, 'tickets', ticketId);
    try {
      await updateDoc(ticketRef, {
        status: newStatus
      });
    } catch (error) {
      console.error("Error updating ticket status: ", error);
    }
  };
  
  // This handles the case where the component renders before the auth state is determined
  if (loading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>;
  }

  // Once loading is false, if the user is not the admin, this will prevent rendering the dashboard.
  if (!currentUser || currentUser.uid !== ADMIN_UID) {
    return <Container><Typography sx={{mt: 4}}>Access Denied.</Typography></Container>;
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>Admin Dashboard</Typography>
      <Paper elevation={2}>
        <List>
          {allTickets.map(ticket => (
            <ListItem key={ticket.id} divider>
              <ListItemText
                primary={`Ticket from: ${ticket.userEmail}`}
                secondary={
                    <>
                        <Typography component="span" variant="body2" color="text.primary">
                            {ticket.description}
                        </Typography>
                        <br />
                        {`Priority: ${ticket.priority} | Submitted: ${ticket.createdAt ? new Date(ticket.createdAt.seconds * 1000).toLocaleDateString() : 'N/A'}`}
                    </>
                }
              />
              <FormControl sx={{ m: 1, minWidth: 150 }} size="small">
                <InputLabel>Status</InputLabel>
                <Select
                  value={ticket.status}
                  label="Status"
                  onChange={(e) => handleStatusChange(ticket.id, e.target.value)}
                >
                  <MenuItem value="Open">Open</MenuItem>
                  <MenuItem value="In Progress">In Progress</MenuItem>
                  <MenuItem value="Resolved">Resolved</MenuItem>
                  <MenuItem value="Closed">Closed</MenuItem>
                </Select>
              </FormControl>
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
};

export default AdminDashboardPage;