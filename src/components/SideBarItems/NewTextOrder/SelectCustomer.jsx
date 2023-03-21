import React from "react";
import {
  Box,
  CssBaseline,
  ThemeProvider,
  Button,
  Stepper,
  Typography,
  Step,
  StepLabel,
  Paper,
} from "@mui/material";
import { ColorModeContext, useMode, tokens } from "../../../theme";

const SelectCustomer = ({ nextStep }) => {
  const [theme, colorMode] = useMode();
  const colors = tokens(theme.palette.mode);
  return (
    <>
    <h1>SELECT Customer</h1>
      <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
        <Box sx={{ flex: "1 1 auto" }} />
        <Button
          sx={{
            backgroundColor: colors.grey[700],
            color: colors.grey[100],
            fontSize: "14px",
            fontWeight: "bold",
            padding: "10px 20px",
          }}
          onClick={nextStep}
        >
          Next
        </Button>
      </Box>
    </>
  );
};

export default SelectCustomer;