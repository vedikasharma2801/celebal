import React, { useMemo } from 'react';
import { ResponsivePie } from '@nivo/pie';
import { Box, useTheme, Typography } from '@mui/material';
import Header from '../../components/Header.jsx';
import { useStore } from '../../store/useStore.js';

const PieChart = () => {
  const theme = useTheme();
  const tasks = useStore((state) => state.tasks);

  // useMemo will re-calculate the chart data only when the global `tasks` state changes.
  const pieData = useMemo(() => {
    return [
      { id: "todo", label: "To Do", value: tasks.filter((t) => t.status === "todo").length },
      { id: "in-progress", label: "In Progress", value: tasks.filter((t) => t.status === "in-progress").length },
      { id: "done", label: "Done", value: tasks.filter((t) => t.status === "done").length },
    ].filter(d => d.value > 0); // Important: Filter out slices with a value of 0 to prevent rendering issues.
  }, [tasks]);

  return (
    <Box m="20px">
      <Header title="Pie Chart" subtitle="Task Status Distribution" />
      <Box height="75vh">
        {pieData.length > 0 ? (
          <ResponsivePie
            data={pieData}
            theme={{
              axis: {
                domain: { line: { stroke: theme.palette.divider } },
                legend: { text: { fill: theme.palette.text.secondary } },
                ticks: { line: { stroke: theme.palette.divider, strokeWidth: 1 }, text: { fill: theme.palette.text.primary } }
              },
              legends: { text: { fill: theme.palette.text.secondary } },
              tooltip: { container: { color: theme.palette.text.primary, background: theme.palette.background.paper } }
            }}
            margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
            innerRadius={0.5}
            padAngle={0.7}
            cornerRadius={3}
            activeOuterRadiusOffset={8}
            borderWidth={1}
            borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
            arcLinkLabelsSkipAngle={10}
            arcLinkLabelsTextColor={theme.palette.text.primary}
            arcLinkLabelsThickness={2}
            arcLinkLabelsColor={{ from: 'color' }}
            arcLabelsSkipAngle={10}
            arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
            legends={[
                {
                    anchor: 'bottom',
                    direction: 'row',
                    justify: false,
                    translateX: 0,
                    translateY: 56,
                    itemsSpacing: 0,
                    itemWidth: 100,
                    itemHeight: 18,
                    itemTextColor: '#999',
                    itemDirection: 'left-to-right',
                    itemOpacity: 1,
                    symbolSize: 18,
                    symbolShape: 'circle',
                    effects: [{ on: 'hover', style: { itemTextColor: theme.palette.text.primary } }]
                }
            ]}
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

export default PieChart;