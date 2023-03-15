import React, { useState } from 'react';

//Light/Dark Mode
import { ColorModeContext, useMode, tokens } from '../../../theme';
import { Box, CssBaseline, ThemeProvider, Button } from '@mui/material';

//Icons
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

//Components
import Topbar from "../../NAVBars/TopBar";
import Sidebar from "../../NAVBars/SideBar";
import CouponsList from './CouponsList';
import Header from "../../Header/Header";

//Modals
import CouponModal from '../../Modals/CouponModal';

//Firebase
import { db } from '../../../Firebase/firebase';
import { doc, deleteDoc} from 'firebase/firestore';

const Coupons = () => {
  const [theme, colorMode] = useMode();
  const colors = tokens(theme.palette.mode);

  //var [selectedCoupons, setSelectedCoupons] = useState([]);
  var selectedCoupons = [];

  const couponsToRemove = (data) => {
    selectedCoupons = data.selectedRowsData;
}

  function removeCoupon() {
    for (var key in selectedCoupons) {
      deleteCoupon(selectedCoupons[key].CouponCode)
    }
  }

  async function deleteCoupon(couponcode) {
    await deleteDoc(doc(db,"coupons",couponcode));
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
                        <CouponModal />
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
                  <CouponsList couponsToRemove={couponsToRemove}/>
                </div>
            </main>
          </div>
      </ThemeProvider>
    </ColorModeContext.Provider>

  )
}

export default Coupons