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
import ItemDetailsSizeList from './ItemDetailsSizeList';
import ItemDetailsForm from './ItemDetailsForm';

const ItemDetails = () => {
  const [theme, colorMode] = useMode();
  const colors = tokens(theme.palette.mode);

  const { itemid } = useParams();
  const [item, setItem] = useState({});

  const setItemFromURL = async (firebaseProductId) => {
    try {
      const itemRef = doc(db, "items", firebaseProductId);
      const itemSnap = await getDoc(itemRef);
      if (itemSnap.exists()) {
        setItem(itemSnap.data());
      }
    } catch (err) {
        alert(err);
    }
  };

  useEffect(() => {
    setItemFromURL(itemid);
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
                    <Header title={item.Name} subtitle='' />
                  </Box>
                  <ItemDetailsForm item={item} itemid={itemid}/>
              </Box>
                
              <div className='w-100 text-center mt-2'>
                <ItemDetailsSizeList itemid={itemid}/>
              </div>
          </main>
        </div>
    </ThemeProvider>
  </ColorModeContext.Provider>
    
  )
}



export default ItemDetails