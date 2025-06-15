import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import { Box, List, ListItem, ListItemText, Typography, useTheme } from '@mui/material';
import Header from '../../components/Header.jsx';
import { useStore } from '../../store/useStore.js';

const Calendar = () => {
  const theme = useTheme();
  const tasks = useStore((state) => state.tasks);
  const addEvent = useStore((state) => state.addEvent);
  const deleteTask = useStore((state) => state.deleteTask);

  const calendarEvents = tasks.map(task => ({
    id: task.id,
    title: task.title,
    start: task.dueDate,
    allDay: true,
  }));

  const handleDateClick = (selected) => {
    const title = prompt('Please enter a new title for your event');
    if (title) {
      addEvent({
        id: `${selected.dateStr}-${title}-${Math.random()}`,
        title,
        start: selected.startStr,
        end: selected.endStr,
        allDay: selected.allDay,
      });
    }
  };

  const handleEventClick = (selected) => {
    if (window.confirm(`Are you sure you want to delete the event '${selected.event.title}'`)) {
      deleteTask(selected.event.id);
    }
  };

  return (
    <Box m="20px">
      <Header title="Calendar" subtitle="Full Calendar Interactive Page" />
      <Box display="flex" justifyContent="space-between">
        <Box flex="1 1 20%" bgcolor={theme.palette.background.paper} p="15px" borderRadius="4px">
          <Typography variant="h5">Events</Typography>
          <List>
            {calendarEvents.map((event) => (
              <ListItem key={event.id} sx={{ backgroundColor: theme.palette.secondary.main, margin: '10px 0', borderRadius: '2px' }}>
                <ListItemText primary={event.title} secondary={new Date(event.start).toLocaleDateString()} />
              </ListItem>
            ))}
          </List>
        </Box>
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
            events={calendarEvents}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Calendar;