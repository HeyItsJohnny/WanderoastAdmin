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
import CustomerShipCodeList from './CustomerShipCodeList';
import CustomerDetailsForm from './CustomerDetailsForm';

const CustomerDetails = () => {
    const [theme, colorMode] = useMode();
    const colors = tokens(theme.palette.mode);
  
    const { customerid } = useParams();
    const [customer, setCustomer] = useState({});
  
    const setCustomerFromURL = async () => {
      try {
        const customerRef = doc(db, "customer-profile", customerid);
        const customerSnap = await getDoc(customerRef);
        if (customerSnap.exists()) {
          setCustomer(customerSnap.data());
        }
      } catch (err) {
          alert(err);
      }
    };
  
    useEffect(() => {
      setCustomerFromURL();
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
                      <Header title={customer.CustomerName} subtitle='' />
                    </Box>
                    <CustomerDetailsForm customer={customer} customerid={customerid}/>
                  </Box>
                    
                  <div className='w-100 text-center mt-2'>
                    <CustomerShipCodeList customerid={customerid}/> 
                    {/*
                      ADD Customer Square Account Credit Cards
                      ADD Customer Shipping Codes
                      <CustomerShipCodeList customerid={customerid}/> 
                    */}
                  </div>
              </main>
            </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
  )
}

export default CustomerDetails