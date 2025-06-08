import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import Header from '../../components/Header';

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// Individual item component
function SortableItem(props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Box
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      p={2}
      mb={2}
      bgcolor="grey.300"
      borderRadius="4px"
      sx={{ cursor: 'grab' }}
    >
      {props.children}
    </Box>
  );
}

const Kanban = () => {
  const [items, setItems] = useState([
    { id: 'item-1', content: 'Configure the draggable board' },
    { id: 'item-2', content: 'Design the UI' },
    { id: 'item-3', content: 'Develop the Kanban logic' },
    { id: 'item-4', content: 'Add more columns' },
  ]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <Box m="20px">
      <Header title="Kanban Board" subtitle="Organize your tasks" />
      <Box p={2} width="300px" bgcolor="#141b2d" borderRadius="4px">
        <Typography variant="h5" color="white" mb={2}>
          To-Do
        </Typography>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={items.map(item => item.id)} strategy={verticalListSortingStrategy}>
            {items.map((item) => (
              <SortableItem key={item.id} id={item.id}>
                {item.content}
              </SortableItem>
            ))}
          </SortableContext>
        </DndContext>
      </Box>
    </Box>
  );
};

export default Kanban;