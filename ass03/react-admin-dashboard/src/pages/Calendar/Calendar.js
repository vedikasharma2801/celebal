import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import { Box, List, ListItem, ListItemText, Typography, useTheme } from '@mui/material';
import Header from '../../components/Header';
import { mockTasks } from '../../data/mockData';

const Calendar = () => {
  const theme = useTheme();

  // Format the initial mock tasks for FullCalendar
  const initialEvents = mockTasks.map(task => ({
    id: task.id,
    title: task.title,
    start: task.dueDate,
    allDay: true,
  }));

  const [currentEvents, setCurrentEvents] = useState(initialEvents);

  const handleDateClick = (selected) => {
    const title = prompt('Please enter a new title for your event');
    const calendarApi = selected.view.calendar;
    calendarApi.unselect();

    if (title) {
      const newEvent = {
        id: `${selected.dateStr}-${title}-${Math.random()}`, // Create a simple unique ID
        title,
        start: selected.startStr,
        end: selected.endStr,
        allDay: selected.allDay,
      };
      calendarApi.addEvent(newEvent);
      // We manually update our state as well
      setCurrentEvents([...currentEvents, newEvent]);
    }
  };

  const handleEventClick = (selected) => {
    if (window.confirm(`Are you sure you want to delete the event '${selected.event.title}'`)) {
      selected.event.remove();
      // We manually update our state as well
      setCurrentEvents(currentEvents.filter(event => event.id !== selected.event.id));
    }
  };

  return (
    <Box m="20px">
      <Header title="CALENDAR" subtitle="Full Calendar Interactive Page" />
      <Box display="flex" justifyContent="space-between">
        {/* CALENDAR SIDEBAR */}
        <Box flex="1 1 20%" bgcolor={theme.palette.background.paper} p="15px" borderRadius="4px">
          <Typography variant="h5">Events</Typography>
          <List>
            {currentEvents.map((event) => (
              <ListItem 
                key={event.id} 
                sx={{ 
                  backgroundColor: theme.palette.secondary.main, 
                  margin: '10px 0', 
                  borderRadius: '2px' 
                }}
              >
                <ListItemText 
                  primary={event.title} 
                  secondary={new Date(event.start).toLocaleDateString()} 
                />
              </ListItem>
            ))}
          </List>
        </Box>

        {/* CALENDAR */}
        <Box flex="1 1 100%" ml="15px">
          <FullCalendar
            height="75vh"
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
            headerToolbar={{ left: 'prev,next today', center: 'title', right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth' }}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            select={handleDateClick}
            eventClick={handleEventClick}
            events={currentEvents} // Use the state to manage events
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Calendar;