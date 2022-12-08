import React from 'react';

//Other Shit
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import { tokens } from "../../theme";
import EmailIcon from "@mui/icons-material/Email";
import CalculatorBox from './CalculatorBox';
import CalculatorTotalBox from './CalculatorTotalBox';

//Components
import Topbar from "../NAVBars/TopBar";
import Sidebar from "../NAVBars/SideBar";
import NewOrders from './NewOrders';

//Light/Dark Mode
import { ColorModeContext, useMode } from '../../theme';
import { Box, CssBaseline, ThemeProvider, Button } from '@mui/material';
import Header from "../Header/Header";

const Dashboard = () => {

  const [theme, colorMode] = useMode();
  const colors = tokens(theme.palette.mode);

  return (
    <>
    {/*
    
      <Card>
        <Card.Body>
           <h2 className="text-center mb-4">Profile</h2>         
           {error && <Alert variant="danger">{error}</Alert>}
           <strong>Email: </strong> {currentUser.email}
           <Link to="/updateProfile" className="btn btn-primary w-100 mt-3">
              Update Profile
           </Link>
        </Card.Body>
      </Card>
    */}
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
            <div className="app">
              <Sidebar />
              <main className="content">
                <Topbar />
                  <Box m="20px">
                    {/* HEADER */}
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                      <Header title="DASHBOARD" subtitle="Welcome to the fucking moon." />
                      <Box>
                        <Button
                          sx={{
                            backgroundColor: colors.blueAccent[700],
                            color: colors.grey[100],
                            fontSize: "14px",
                            fontWeight: "bold",
                            padding: "10px 20px",
                          }}
                        >
                          <DownloadOutlinedIcon sx={{ mr: "10px" }} />
                          Calculate Roast
                        </Button>
                      </Box>
                    </Box>
                     {/* GRID & CHARTS */}
                    <Box
                      display="grid"
                      gridTemplateColumns="repeat(12, 1fr)"
                      gridAutoRows="140px"
                      gap="20px"
                    >
                      {/* ROW 1*/}
                      <Box
                        gridColumn="span 3"
                        backgroundColor={colors.primary[400]}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <CalculatorBox
                          title="Brazil"
                          small="100"
                          large="100"
                          increase="+14%"
                          icon={
                            <EmailIcon
                              sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                            />
                          }
                        />
                      </Box>
                      <Box
                        gridColumn="span 3"
                        backgroundColor={colors.primary[400]}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <CalculatorBox
                          title="Costa Rica"
                          small="0"
                          large="0"
                          increase="+14%"
                          icon={
                            <EmailIcon
                              sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                            />
                          }
                        />
                      </Box>
                      <Box
                        gridColumn="span 3"
                        backgroundColor={colors.primary[400]}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <CalculatorBox
                          title="Columbia"
                          small="0"
                          large="0"
                          increase="+14%"
                          icon={
                            <EmailIcon
                              sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                            />
                          }
                        />
                      </Box>
                      <Box
                        gridColumn="span 3"
                        backgroundColor={colors.primary[400]}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <CalculatorBox
                          title="Ethopia"
                          small="0"
                          large="0"
                          increase="+14%"
                          icon={
                            <EmailIcon
                              sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                            />
                          }
                        />
                      </Box>
                    </Box>
                    <Box
                      display="grid"
                      gridTemplateColumns="repeat(12, 1fr)"
                      gridAutoRows="140px"
                      gap="20px"
                    >
                      {/* ROW 2*/}
                      <Box
                        gridColumn="span 3"
                        backgroundColor={colors.primary[400]}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <CalculatorBox
                          title="South Central"
                          small="0"
                          large="0"
                          increase="+14%"
                          icon={
                            <EmailIcon
                              sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                            />
                          }
                        />
                      </Box>
                      <Box
                        gridColumn="span 3"
                        backgroundColor={colors.primary[400]}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <CalculatorBox
                          title="Java"
                          small="0"
                          large="0"
                          increase="+14%"
                          icon={
                            <EmailIcon
                              sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                            />
                          }
                        />
                      </Box>
                      <Box
                        gridColumn="span 3"
                        backgroundColor={colors.primary[400]}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <CalculatorBox
                          title="Decaf"
                          small="0"
                          large="0"
                          increase="+14%"
                          icon={
                            <EmailIcon
                              sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                            />
                          }
                        />
                      </Box>
                      <Box
                        gridColumn="span 3"
                        backgroundColor={colors.primary[400]}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <CalculatorTotalBox
                          title="Totals"
                          brazil="0"
                          costarica="0"
                          columbia="0"
                          ethopia="0"
                          southcentral="0"
                          java="0"
                          decaf="0"
                          increase="+14%"
                          icon={
                            <EmailIcon
                              sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                            />
                          }
                        />
                      </Box>
                    </Box>
                  </Box>
                  <div className='w-100 text-center mt-2'>
                    <NewOrders />
                  </div>
              </main>
            </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
      
    </>
  )
}

export default Dashboard