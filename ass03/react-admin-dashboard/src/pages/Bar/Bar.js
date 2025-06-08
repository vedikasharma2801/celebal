import React from 'react';
import { ResponsiveBar } from '@nivo/bar'; // This line was causing the error
import { Box } from '@mui/material';
import Header from '../../components/Header';
import { mockBarData as data } from '../../data/mockData';

const Bar = () => (
    <Box m="20px">
      <Header title="Bar Chart" subtitle="Simple Bar Chart" />
      <Box height="75vh">
        <ResponsiveBar
            data={data}
            keys={['y']}
            indexBy="x"
            margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
            padding={0.3}
            valueScale={{ type: 'linear' }}
            indexScale={{ type: 'band', round: true }}
            colors={{ scheme: 'nivo' }}
            borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
            axisTop={null}
            axisRight={null}
        />
      </Box>
    </Box>
);

export default Bar;