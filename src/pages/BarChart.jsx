import React, { useState } from "react";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Box, Container, Stack, TextField } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import { getRandomInt } from "../utils/Funtions";
import { StyledMenu } from "../style/customMuiStyle";
import { barChartInitialValues } from "../initialValues/InitialValues";

export default function BarChartComponent() {
  //States
  const [anchorEl, setAnchorEl] = useState(null);
  const [barChartData, setBarChartData] = useState(barChartInitialValues);
  const [showChart, setShowChart] = useState(false);

  const series = [{ data: Object.values(barChartData) }];
  const open = Boolean(anchorEl);

  const handleShowChart = () => {
    setShowChart(true);
    handleRandomChartData();
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleRandomChartData = () => {
    setBarChartData({
      value1: getRandomInt(1, 100),
      value2: getRandomInt(1, 100),
      value3: getRandomInt(1, 100),
      value4: getRandomInt(1, 100),
    });
  };

  const handleDataChange = (e) => {
    const { id, value } = e.target;
    setBarChartData((prevValues) => ({
      ...prevValues,
      [id]: parseInt(value, 10) || 0,
    }));
  };

  return (
    <Container sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
      {!showChart && (
        <Button variant="contained" onClick={handleShowChart}>
          Generate Chart
        </Button>
      )}
      {showChart && (
        <Box>
          <Box sx={{ display: "flex", justifyContent: "end" }}>
            <Button id="demo-customized-button" aria-controls={open ? "demo-customized-menu" : undefined} aria-haspopup="true" aria-expanded={open ? "true" : undefined} variant="contained" disableElevation onClick={handleClick} endIcon={<KeyboardArrowDownIcon />}>
              Update Data
            </Button>
            <StyledMenu
              id="demo-customized-menu"
              MenuListProps={{
                "aria-labelledby": "demo-customized-button",
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
            >
              {Object.values(barChartData).map((_, index) => {
                return (
                  <MenuItem disableRipple key={index}>
                    <TextField label={`Value ${index + 1}`} variant="outlined" type="number" id={`value${index + 1}`} value={barChartData[`value${index + 1}`]} onChange={handleDataChange} />
                  </MenuItem>
                );
              })}

              <MenuItem disableRipple>
                <Stack direction="row" spacing={8}>
                  <Button variant="outlined" onClick={handleClose}>
                    Cancel
                  </Button>
                  <Button variant="contained" onClick={handleClose}>
                    Ok
                  </Button>
                </Stack>
              </MenuItem>
            </StyledMenu>
          </Box>
          <Box>
            <BarChart xAxis={[{ scaleType: "band", data: ["Value 1", "Value 2", "Value 3", "Value 4"] }]} series={series} width={window?.innerWidth > 800 ? 800 : window?.innerWidth} height={300} />
          </Box>
        </Box>
      )}
    </Container>
  );
}
