import React from 'react';
import { ResponsivePie } from '@nivo/pie';
import { Box, useTheme } from '@mui/material';
import Header from '../../components/Header';
import { mockPieData as data } from '../../data/mockData';

const Pie = () => {
  const theme = useTheme();
  return (
    <Box m="20px">
      <Header title="Pie Chart" subtitle="Task Status Distribution" />
      <Box height="75vh">
        <ResponsivePie
            data={data}
            theme={{
              axis: {
                domain: { line: { stroke: theme.palette.divider } },
                legend: { text: { fill: theme.palette.text.secondary } },
                ticks: { line: { stroke: theme.palette.divider, strokeWidth: 1 }, text: { fill: theme.palette.text.primary } }
              },
              legends: { text: { fill: theme.palette.text.secondary } }
            }}
            margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
            innerRadius={0.5}
            padAngle={0.7}
            cornerRadius={3}
            activeOuterRadiusOffset={8}
            borderWidth={1}
            borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
        />
      </Box>
    </Box>
  );
};

export default Pie;