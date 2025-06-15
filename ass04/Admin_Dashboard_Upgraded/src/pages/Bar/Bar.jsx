import React, { useMemo } from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { Box, useTheme, Typography } from '@mui/material';
import Header from '../../components/Header.jsx';
import { useStore } from '../../store/useStore.js';

const BarChart = () => {
    const theme = useTheme();
    const tasks = useStore((state) => state.tasks);

    // useMemo will re-calculate the chart data only when the global `tasks` state changes.
    const barData = useMemo(() => {
        // Create an array to hold data for 12 months, initialized to zero.
        const monthlyTotals = Array.from({ length: 12 }, (_, i) => ({
            month: new Date(0, i).toLocaleString('default', { month: 'short' }),
            Tasks: 0,
        }));

        // Aggregate tasks into their respective months.
        tasks.forEach(task => {
            const monthIndex = new Date(task.dueDate).getMonth();
            if (monthlyTotals[monthIndex]) {
                monthlyTotals[monthIndex].Tasks += 1;
            }
        });

        return monthlyTotals;
    }, [tasks]);

    return (
        <Box m="20px">
          <Header title="Bar Chart" subtitle="Total Tasks Due Per Month" />
          <Box height="75vh">
            {tasks.length > 0 ? (
                <ResponsiveBar
                    data={barData}
                    theme={{
                      axis: {
                        domain: { line: { stroke: theme.palette.divider } },
                        legend: { text: { fill: theme.palette.text.secondary } },
                        ticks: { line: { stroke: theme.palette.divider, strokeWidth: 1 }, text: { fill: theme.palette.text.primary } }
                      },
                      legends: { text: { fill: theme.palette.text.secondary } },
                      tooltip: { container: { color: theme.palette.text.primary, background: theme.palette.background.paper } }
                    }}
                    keys={['Tasks']}
                    indexBy="month"
                    margin={{ top: 50, right: 60, bottom: 50, left: 60 }}
                    padding={0.3}
                    valueScale={{ type: 'linear' }}
                    indexScale={{ type: 'band', round: true }}
                    colors={{ scheme: 'nivo' }}
                    borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                    axisTop={null}
                    axisRight={null}
                    axisBottom={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'Month',
                        legendPosition: 'middle',
                        legendOffset: 32
                    }}
                    axisLeft={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'Total Tasks',
                        legendPosition: 'middle',
                        legendOffset: -40
                    }}
                    labelSkipWidth={12}
                    labelSkipHeight={12}
                    labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                    role="application"
                    ariaLabel="Nivo bar chart demonstrating tasks per month"
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

export default BarChart;