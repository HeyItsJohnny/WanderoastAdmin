import React, {useState} from 'react';
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme"


const CalculatorBox = ({ title, small, large }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Box width="100%" m="0 10px">
            <Box display="flex" justifyContent="space-between">
                <Box>
                    <Typography
                        variant="h4"
                        fontWeight="bold"
                        sx={{ color: colors.grey[100] }}
                        >
                        {title}
                    </Typography>
                </Box>
                </Box>
            <Box display="flex" justifyContent="space-between" mt="2px">
                <Typography variant="h6" sx={{ color: colors.greenAccent[500] }}>
                    Small Bag: {small}
                </Typography>
            </Box>
            <Box display="flex" justifyContent="space-between" mt="2px">
                <Typography variant="h6" sx={{ color: colors.greenAccent[500] }}>
                    Large Bag: {large}
                </Typography>
            </Box>
      </Box>
    )
}

export default CalculatorBox