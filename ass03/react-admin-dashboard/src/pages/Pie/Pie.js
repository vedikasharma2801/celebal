import React from 'react';
import { ResponsivePie } from '@nivo/pie'; // This would have also caused an error
import { Box } from '@mui/material';
import Header from '../../components/Header';
import { mockPieData as data } from '../../data/mockData';

const Pie = () => (
    <Box m="20px">
      <Header title="Pie Chart" subtitle="Simple Pie Chart" />
      <Box height="75vh">
        <ResponsivePie
            data={data}
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

export default Pie;