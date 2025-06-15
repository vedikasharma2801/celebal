import React, { useMemo } from 'react';
import { ResponsiveLine } from "@nivo/line";
import { Box, useTheme, Typography } from '@mui/material';
import Header from '../../components/Header.jsx';
import { useStore } from '../../store/useStore.js';

const LineChart = () => {
  const theme = useTheme();
  const tasks = useStore(state => state.tasks);

  // useMemo will re-calculate the chart data only when the global `tasks` state changes.
  const lineData = useMemo(() => {
    // Aggregate tasks by month.
    const monthlyTotals = tasks.reduce((acc, task) => {
        const month = new Date(task.dueDate).toLocaleString('default', { month: 'short' });
        if (!acc[month]) {
            acc[month] = { x: month, y: 0 };
        }
        acc[month].y += 1;
        return acc;
    }, {});
    
    // Convert object to array and sort by month order for a logical line.
    const sortedData = Object.values(monthlyTotals).sort((a, b) => {
        const dateA = new Date(`1 ${a.x} 2024`); // Use a dummy year for sorting
        const dateB = new Date(`1 ${b.x} 2024`);
        return dateA - dateB;
    });

    // Nivo expects an array containing an object with an id and data array.
    return [{ id: 'Tasks', data: sortedData }];
  }, [tasks]);

  return (
    <Box m="20px">
      <Header title="Line Chart" subtitle="Trend of Tasks Due Per Month" />
      <Box height="75vh">
        {lineData[0].data.length > 0 ? (
          <ResponsiveLine
            data={lineData}
            theme={{
              axis: {
                domain: { line: { stroke: theme.palette.divider } },
                legend: { text: { fill: theme.palette.text.secondary } },
                ticks: { line: { stroke: theme.palette.divider, strokeWidth: 1 }, text: { fill: theme.palette.text.primary } }
              },
              legends: { text: { fill: theme.palette.text.secondary } },
              tooltip: { container: { color: theme.palette.text.primary, background: theme.palette.background.paper } }
            }}
            margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
            xScale={{ type: 'point' }}
            yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: false, reverse: false }}
            yFormat=" >-.2f"
            axisTop={null}
            axisRight={null}
            axisBottom={{
                legend: 'Month',
                legendOffset: 36,
                legendPosition: 'middle'
            }}
            axisLeft={{
                legend: 'Total Tasks',
                legendOffset: -40,
                legendPosition: 'middle'
            }}
            pointSize={10}
            pointColor={{ theme: 'background' }}
            pointBorderWidth={2}
            pointBorderColor={{ from: 'serieColor' }}
            useMesh={true}
          />
        ) : (
          <Typography sx={{ textAlign: 'center', mt: 4 }}>
            No task data available to display the chart.
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default LineChart;