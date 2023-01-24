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
//import ItemDetailsSizeList from './ItemDetailsSizeList';
//import ItemDetailsForm from './ItemDetailsForm';

const CustomerDetails = () => {
    const [theme, colorMode] = useMode();
    const colors = tokens(theme.palette.mode);
  
    const { customerid } = useParams();
    const [customer, setCustomer] = useState({});
  
    const setItemFromURL = async (firebaseCustId) => {
      try {
        const customerRef = doc(db, "customer-profile", firebaseCustId);
        const customerSnap = await getDoc(customerRef);
        if (customerSnap.exists()) {
          setCustomer(customerSnap.data());
        }
      } catch (err) {
          alert(err);
      }
    };
  
    useEffect(() => {
      setItemFromURL(customerid);
    }, []);

    return (
        <div>CustomerDetails</div>
    )
}

export default CustomerDetails