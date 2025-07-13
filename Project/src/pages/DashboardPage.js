// src/pages/DashboardPage.js

import React, { useState, useEffect } from 'react';
import { db } from '../services/firebase';
import { collection, query, where, onSnapshot, orderBy, doc, deleteDoc } from 'firebase/firestore';
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import {
  Container, Button, Typography, Grid, Card, CardContent, CardActions,
  Box, Chip, Skeleton, Stack, Paper, IconButton, Tooltip
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ConfirmationNumberOutlinedIcon from '@mui/icons-material/ConfirmationNumberOutlined';
import ComputerIcon from '@mui/icons-material/Computer';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import DeleteIcon from '@mui/icons-material/Delete';

const MySwal = withReactContent(Swal);
const categoryIcons = { "Technical": <ComputerIcon color="primary" />, "Billing": <MonetizationOnIcon sx={{ color: 'secondary.main' }} />, "General Inquiry": <HelpOutlineIcon color="disabled" />, "Feature Request": <HelpOutlineIcon color="disabled" />,};

const DashboardPage = () => {
  const { currentUser } = useAuth();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentUser) {
      const q = query(collection(db, 'tickets'), where('userId', '==', currentUser.uid), orderBy('createdAt', 'desc'));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        setTickets(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        setLoading(false);
      });
      return () => unsubscribe();
    }
  }, [currentUser]);

  const handleDeleteTicket = async (ticketId) => {
    MySwal.fire({ title: 'Are you sure?', text: "You won't be able to revert this!", icon: 'warning', showCancelButton: true, confirmButtonColor: '#00796B', cancelButtonColor: '#d33', confirmButtonText: 'Yes, delete it!'})
    .then(async (result) => {
      if (result.isConfirmed) {
        try { await deleteDoc(doc(db, 'tickets', ticketId)); MySwal.fire('Deleted!', 'Your ticket has been deleted.', 'success'); } 
        catch (error) { MySwal.fire('Error!', 'There was a problem deleting your ticket.', 'error'); }
      }
    });
  };

  const getStatusColor = (status) => { if (status === 'Resolved') return 'success'; if (status === 'In Progress') return 'warning'; if (status === 'Closed') return 'default'; return 'primary'; };
  const cardVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 }, exit: { opacity: 0, scale: 0.8 } };

  // --- UPDATED CODE IS HERE (Part 1) ---
  // The TicketSkeleton component no longer contains a Grid. It's just the Card.
  const TicketSkeleton = () => (
    <Card>
      <CardContent>
        <Skeleton variant="text" width="60%" height={30} />
        <Skeleton variant="rectangular" height={60} sx={{ my: 1 }} />
        <Skeleton variant="text" width="40%" />
      </CardContent>
      <CardActions>
        <Skeleton variant="text" width={100} height={40} />
      </CardActions>
    </Card>
  );

  const EmptyState = () => <Paper variant="outlined" sx={{ p: 4, textAlign: 'center', mt: 4, width: '100%' }}><ConfirmationNumberOutlinedIcon sx={{ fontSize: 60, color: 'text.disabled', mb: 2 }} /><Typography variant="h6">No tickets yet!</Typography><Typography color="text.secondary" sx={{ mb: 3 }}>Get started by creating your first support ticket.</Typography><Button variant="contained" component={Link} to="/new-ticket" startIcon={<AddIcon />}>Create New Ticket</Button></Paper>;

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1">My Dashboard</Typography>
        <Button variant="contained" color="primary" component={Link} to="/new-ticket" startIcon={<AddIcon />} sx={{ display: { xs: 'none', sm: 'flex' } }}>New Ticket</Button>
      </Box>

      {loading ? (
        <Grid container spacing={3}>
          {/* --- UPDATED CODE IS HERE (Part 2) --- */}
          {/* We now apply the <Grid> layout props here, outside the component. */}
          {[...Array(3)].map((_, i) => (
            <Grid xs={12} sm={6} md={4} key={i}>
              <TicketSkeleton />
            </Grid>
          ))}
        </Grid>
      ) : tickets.length > 0 ? (
        <Grid container spacing={3}>
          <AnimatePresence>
            {tickets.map(ticket => (
              <Grid xs={12} sm={6} md={4} key={ticket.id}>
                <motion.div layout variants={cardVariants} initial="hidden" animate="visible" exit="exit" transition={{ duration: 0.4 }} style={{ height: '100%' }}>
                  <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%', border: ticket.status === 'Resolved' ? '2px solid' : 'none', borderColor: 'success.main' }}>
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Stack direction="row" spacing={2} alignItems="center" mb={2}>
                        {categoryIcons[ticket.category] || <HelpOutlineIcon />}
                        <Typography variant="h6" component="div">{ticket.category}</Typography>
                      </Stack>
                      <Typography variant="body2" color="text.secondary" sx={{ height: 60, overflow: "hidden" }}>{ticket.description}</Typography>
                      <Stack direction="row" justifyContent="space-between" alignItems="center" mt={2}>
                        <Chip label={ticket.status} color={getStatusColor(ticket.status)} size="small" />
                        <Typography variant="caption" color="text.secondary">{ticket.createdAt ? new Date(ticket.createdAt.seconds * 1000).toLocaleDateString() : ''}</Typography>
                      </Stack>
                    </CardContent>
                    <CardActions sx={{ justifyContent: 'space-between' }}>
                      <Button size="small" component={Link} to={`/ticket/${ticket.id}`}>View Details</Button>
                      <Tooltip title="Delete Ticket"><IconButton aria-label="delete ticket" onClick={() => handleDeleteTicket(ticket.id)} size="small" sx={{ color: 'grey.600', '&:hover': { color: 'error.main', backgroundColor: 'rgba(211, 47, 47, 0.08)' } }}><DeleteIcon /></IconButton></Tooltip>
                    </CardActions>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </AnimatePresence>
        </Grid>
      ) : (
        <EmptyState />
      )}
    </Container>
  );
};

export default DashboardPage;