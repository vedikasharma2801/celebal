import React from 'react';
import { ResponsiveLine } from "@nivo/line";
import { mockLineData as data } from "../../data/mockData";
import { Box, useTheme } from '@mui/material';
import Header from '../../components/Header';

const Line = () => {
  const theme = useTheme();
  return (
    <Box m="20px">
      <Header title="Line Chart" subtitle="Monthly User Growth" />
      <Box height="75vh">
        <ResponsiveLine
          data={[{ id: 'Users', data }]}
          theme={{
            axis: {
              domain: { line: { stroke: theme.palette.divider } },
              legend: { text: { fill: theme.palette.text.secondary } },
              ticks: { line: { stroke: theme.palette.divider, strokeWidth: 1 }, text: { fill: theme.palette.text.primary } }
            },
            legends: { text: { fill: theme.palette.text.secondary } },
            tooltip: { container: { color: theme.palette.text.primary } }
          }}
          margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
          xScale={{ type: 'point' }}
          yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
          yFormat=" >-.2f"
          axisTop={null}
          axisRight={null}
          axisBottom={{ legend: 'Month', legendOffset: 36, legendPosition: 'middle' }}
          axisLeft={{ legend: 'Total Users', legendOffset: -40, legendPosition: 'middle' }}
          pointSize={10}
          pointColor={{ theme: 'background' }}
          pointBorderWidth={2}
          pointBorderColor={{ from: 'serieColor' }}
          useMesh={true}
        />
      </Box>
    </Box>
  );
};

export default Line;