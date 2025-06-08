import { Box, Typography, useTheme } from "@mui/material";

const StatBox = ({ title, value, icon }) => {
  const theme = useTheme();

  return (
    <Box 
      width="100%" 
      m="0 15px"
      p="12px"
      borderRadius="4px"
      backgroundColor={theme.palette.mode === 'dark' ? theme.palette.primary[600] : theme.palette.primary[300]}
    >
      <Box display="flex" justifyContent="space-between">
        <Box>
          {icon}
          <Typography variant="h5" fontWeight="bold" sx={{ color: theme.palette.secondary.main }}>
            {title}
          </Typography>
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between" mt="2px">
        <Typography variant="h4" sx={{ color: theme.palette.mode === 'dark' ? 'white' : 'black' }}>
          {value}
        </Typography>
      </Box>
    </Box>
  );
};

export default StatBox;