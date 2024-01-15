import React from "react";
import { Box, Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

const pages = ["Dynamic Bar Chart", "Weather Forecast Line Graph"];

const Home = () => {
  const navigate = useNavigate();

  const handleNavigation = (route) => {
    const url = `/${route.toLowerCase().replaceAll(" ", "-")}`;
    navigate(url);
  };

  return (
    <Box>
      <Stack direction="column" justifyContent="center" alignItems="center" spacing={2} sx={{ mt: 2 }}>
        {pages.map((page) => (
          <Button
            variant="contained"
            onClick={() => {
              handleNavigation(page);
            }}
          >
            {page}
          </Button>
        ))}
      </Stack>
    </Box>
  );
};

export default Home;
