import React from 'react';
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme"

const CalculatorTotalBox = ({ title, brazil, costarica, columbia, ethopia, southcentral, java, decaf }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <Box width="100%" m="0 30px">
            <Box display="flex" justifyContent="space-between">
                <Box>
                    <Typography
                    variant="h5"
                    fontWeight="bold"
                    sx={{ color: colors.grey[100] }}
                    >
                    {title}
                    </Typography>
                </Box>
            </Box>
            <Box display="flex" justifyContent="space-between" mt="2px">
                <Typography variant="h6" sx={{ color: colors.greenAccent[500] }}>
                    Brazil: {brazil}
                </Typography>
            </Box>
      </Box>
    )
}

export default CalculatorTotalBox