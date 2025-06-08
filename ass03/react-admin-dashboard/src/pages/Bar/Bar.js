import React from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { Box, useTheme } from '@mui/material';
import Header from '../../components/Header';
import { mockBarData as data } from '../../data/mockData';

const Bar = () => {
    const theme = useTheme();
    return (
        <Box m="20px">
          <Header title="Bar Chart" subtitle="Tasks Completed Per Month" />
          <Box height="75vh" sx={{
            "& .MuiSvgIcon-root": {
              fill: theme.palette.text.primary,
            }
          }}>
            <ResponsiveBar
                data={data}
                theme={{
                  axis: {
                    domain: { line: { stroke: theme.palette.divider } },
                    legend: { text: { fill: theme.palette.text.secondary } },
                    ticks: { line: { stroke: theme.palette.divider, strokeWidth: 1 }, text: { fill: theme.palette.text.primary } }
                  },
                  legends: { text: { fill: theme.palette.text.secondary } }
                }}
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
};

export default Bar;