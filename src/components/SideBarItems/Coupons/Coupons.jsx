import React from 'react';

//Light/Dark Mode
import { ColorModeContext, useMode, tokens } from '../../../theme';
import { Box, CssBaseline, ThemeProvider, Button } from '@mui/material';

//Icons
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

//Components
import Topbar from "../../NAVBars/TopBar";
import Sidebar from "../../NAVBars/SideBar";
import NewOrders from './CouponsList';
import Header from "../../Header/Header";

const Coupons = () => {
  const [theme, colorMode] = useMode();
  const colors = tokens(theme.palette.mode);

  function addNewCoupon() {

  }

  function removeCoupon() {

  }

  return (
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
                      <Header title="COUPONS" subtitle='There is no "I" in team. But there is a "me" in that bitch.' />
                      <Box>
                        <Button
                          sx={{
                            backgroundColor: colors.greenAccent[700],
                            color: colors.grey[100],
                            fontSize: "14px",
                            fontWeight: "bold",
                            padding: "10px 20px",
                          }}
                          onClick={() => {
                              addNewCoupon();
                            }
                          }
                        >
                          <AddCircleIcon sx={{ mr: "10px" }} />
                          Add New Coupon
                        </Button>
                        <Button
                          sx={{
                            backgroundColor: colors.grey[700],
                            color: colors.grey[100],
                            fontSize: "14px",
                            fontWeight: "bold",
                            padding: "10px 20px",
                          }}
                          onClick={() => {
                              removeCoupon();
                            }
                          }
                        >
                          <RemoveCircleIcon sx={{ mr: "10px" }} />
                          Remove Coupon
                        </Button>
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

  )
}

export default Coupons