import React, { useMemo } from 'react';
import { Box, Typography, Grid, Paper, useTheme } from '@mui/material';
import Header from '../../components/Header.jsx';
import { DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, useSortable, arrayMove } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useStore } from '../../store/useStore.js';

const TaskCard = ({ task }) => {
  const theme = useTheme();
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: task.id });
  const style = { transform: CSS.Transform.toString(transform), transition, cursor: 'grab', marginBottom: theme.spacing(2), backgroundColor: theme.palette.background.default, padding: theme.spacing(2), borderRadius: '4px' };
  return <Paper ref={setNodeRef} style={style} {...attributes} {...listeners}><Typography>{task.title}</Typography></Paper>;
};

const Column = ({ id, title, tasks }) => {
  const theme = useTheme();
  const { setNodeRef } = useSortable({ id });
  return (
    <SortableContext id={id} items={tasks.map(t => t.id)}>
      <Box ref={setNodeRef} sx={{ p: 2, backgroundColor: theme.palette.mode === 'dark' ? theme.palette.primary[600] : theme.palette.primary[300], borderRadius: '4px', height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h6" sx={{ mb: 2 }}>{title}</Typography>
        <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>{tasks.map((task) => (<TaskCard key={task.id} task={task} />))}</Box>
      </Box>
    </SortableContext>
  );
};

const Kanban = () => {
  const tasks = useStore((state) => state.tasks);
  const updateTaskStatus = useStore((state) => state.updateTaskStatus);
  const updateTasksOrder = useStore((state) => state.updateTasksOrder);

  const columns = useMemo(() => ({
      todo: tasks.filter((t) => t.status === 'todo'),
      'in-progress': tasks.filter((t) => t.status === 'in-progress'),
      done: tasks.filter((t) => t.status === 'done'),
  }), [tasks]);

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }));
  const findColumn = (taskId) => tasks.find(t => t.id === taskId)?.status;

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;
    const { id: activeId } = active;
    const { id: overId } = over;
    if (activeId === overId) return;

    const activeColumn = findColumn(activeId);
    let overColumn = findColumn(overId) || over.id;

    if (!activeColumn || !overColumn) return;

    if (activeColumn === overColumn) {
      const currentColumnTasks = columns[activeColumn];
      const oldIndex = currentColumnTasks.findIndex(t => t.id === activeId);
      const newIndex = currentColumnTasks.findIndex(t => t.id === overId);
      if (oldIndex !== newIndex) {
        updateTasksOrder(arrayMove(currentColumnTasks, oldIndex, newIndex));
      }
    } else {
      updateTaskStatus(activeId, overColumn);
    }
  };

  return (
    <Box m="20px">
      <Header title="Kanban Board" subtitle="Organize your project tasks" />
      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <Grid container spacing={3} sx={{ height: '75vh' }}>
          <Grid item xs={12} md={4}><Column id="todo" title="To Do" tasks={columns.todo} /></Grid>
          <Grid item xs={12} md={4}><Column id="in-progress" title="In Progress" tasks={columns['in-progress']} /></Grid>
          <Grid item xs={12} md={4}><Column id="done" title="Done" tasks={columns.done} /></Grid>
        </Grid>
      </DndContext>
    </Box>
  );
};

export default Kanban;