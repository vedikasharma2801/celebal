import React, { useState, useMemo } from 'react';
import { Box, Typography, Grid, Paper, useTheme } from '@mui/material';
import Header from '../../components/Header';
import { DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, useSortable, arrayMove } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { mockTasks } from '../../data/mockData';

// Reusable Task Card Component
const TaskCard = ({ task }) => {
  const theme = useTheme();
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: 'grab',
    marginBottom: theme.spacing(2),
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(2),
    borderRadius: '4px',
  };

  return (
    <Paper ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Typography>{task.title}</Typography>
    </Paper>
  );
};

// Reusable Column Component
const Column = ({ id, title, tasks }) => {
  const theme = useTheme();
  const { setNodeRef } = useSortable({ id });

  return (
    <SortableContext id={id} items={tasks.map(t => t.id)}>
      <Box
        ref={setNodeRef}
        sx={{
          p: 2,
          backgroundColor: theme.palette.mode === 'dark' ? theme.palette.primary[600] : theme.palette.primary[300],
          borderRadius: '4px',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>{title}</Typography>
        <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </Box>
      </Box>
    </SortableContext>
  );
};

const Kanban = () => {
  // Group tasks by status into columns
  const initialColumns = useMemo(() => {
    return {
      todo: mockTasks.filter((t) => t.status === 'todo'),
      inProgress: mockTasks.filter((t) => t.status === 'in-progress'),
      done: mockTasks.filter((t) => t.status === 'done'),
    };
  }, []);

  const [columns, setColumns] = useState(initialColumns);
  const sensors = useSensors(useSensor(PointerSensor));

  const findColumn = (id) => {
    if (columns.todo.find(t => t.id === id)) return 'todo';
    if (columns.inProgress.find(t => t.id === id)) return 'inProgress';
    if (columns.done.find(t => t.id === id)) return 'done';
    return null;
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const activeColumnId = findColumn(activeId);
    let overColumnId = findColumn(overId);
    
    // If 'over' is a column, not a task, find the column id from the droppable container
    if (!overColumnId) {
        overColumnId = over.id;
    }

    if (!activeColumnId || !overColumnId) return;

    setColumns((prev) => {
      const activeItems = prev[activeColumnId];
      const overItems = prev[overColumnId];
      
      const activeIndex = activeItems.findIndex((t) => t.id === activeId);
      let overIndex = overItems.findIndex((t) => t.id === overId);

      let newColumns = { ...prev };

      if (activeColumnId === overColumnId) {
        // Same column sorting
        if (activeIndex !== overIndex) {
          newColumns[overColumnId] = arrayMove(overItems, activeIndex, overIndex);
        }
      } else {
        // Different column moving
        const [movedItem] = activeItems.splice(activeIndex, 1);
        movedItem.status = overColumnId; // Update the task status

        if (overIndex < 0) { // If dropped on column, not on an item
          overIndex = overItems.length;
        }

        overItems.splice(overIndex, 0, movedItem);
        
        newColumns[activeColumnId] = [...activeItems];
        newColumns[overColumnId] = [...overItems];
      }
      
      return newColumns;
    });
  };

  return (
    <Box m="20px">
      <Header title="Kanban Board" subtitle="Organize your project tasks" />
      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <Grid container spacing={3} sx={{ height: '75vh' }}>
          <Grid item xs={12} md={4}>
            <Column id="todo" title="To Do" tasks={columns.todo} />
          </Grid>
          <Grid item xs={12} md={4}>
            <Column id="inProgress" title="In Progress" tasks={columns.inProgress} />
          </Grid>
          <Grid item xs={12} md={4}>
            <Column id="done" title="Done" tasks={columns.done} />
          </Grid>
        </Grid>
      </DndContext>
    </Box>
  );
};

export default Kanban;