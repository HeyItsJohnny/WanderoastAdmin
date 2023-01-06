import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../../Firebase/firebase';
import { getDoc, doc } from 'firebase/firestore';

//CSS
import { ColorModeContext, useMode, tokens } from '../../../theme';
import { Box, CssBaseline, ThemeProvider } from '@mui/material';

//Components
import Topbar from "../../NAVBars/TopBar";
import Sidebar from "../../NAVBars/SideBar";
import Header from "../../Header/Header";
import OrderLinesList from './OrderLinesList';
import OrderDetailsForm from './OrderDetailsForm';

const OrderDetails = () => {
    const [theme, colorMode] = useMode();
    const colors = tokens(theme.palette.mode);
  
    const { orderid } = useParams();
    const [order, setOrder] = useState({});
  
    const setOrderFromURL = async (firebaseProductId) => {
      try {
        const itemRef = doc(db, "orders", firebaseProductId);
        const itemSnap = await getDoc(itemRef);
        if (itemSnap.exists()) {
          setOrder(itemSnap.data());
        }
      } catch (err) {
          alert(err);
      }
    };
  
    useEffect(() => {
        setOrderFromURL(orderid);
    }, []);

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
                                <Header title={"Order: " + order.FullName + " (" + order.OrderType + ")"} subtitle='' />
                            </Box>
                            <OrderDetailsForm order={order} itemid={orderid}/>
                        </Box>
                        
                        <div className='w-100 text-center mt-2'>
                            <OrderLinesList orderid={orderid}/>
                        </div>
                    </main>
                </div>
            </ThemeProvider>
        </ColorModeContext.Provider>
    )
}

export default OrderDetails