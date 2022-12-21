import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../../Firebase/firebase';
import { getDoc, doc, deleteDoc } from 'firebase/firestore';

//CSS
import { ColorModeContext, useMode, tokens } from '../../../theme';
import { Box, CssBaseline, ThemeProvider, Button } from '@mui/material';


//Components
import Topbar from "../../NAVBars/TopBar";
import Sidebar from "../../NAVBars/SideBar";
import Header from "../../Header/Header";
import ItemDetailsSizeList from './ItemDetailsSizeList';
import ItemSizeModal from '../../Modals/ItemSizeModal';
import ItemDetailsForm from './ItemDetailsForm';

//Icons
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

const ItemDetails = () => {
  const [theme, colorMode] = useMode();
  const colors = tokens(theme.palette.mode);

  const { itemid } = useParams();
  const [item, setItem] = useState({});
  var selectedItemSize = [];

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

  const itemSizesToRemove = (data) => {
    selectedItemSize = data.selectedRowsData;
  }

  function removeItemSize() {
    for (var key in selectedItemSize) {
      deleteItemSize(selectedItemSize[key].id)
    }
  }

  async function deleteItemSize(itemID) {
    await deleteDoc(doc(db,"items",itemid,"sizes",itemID));
  }
  
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
                    <Box>
                      <ItemSizeModal itemid={itemid}/>
                      <Button
                        sx={{
                          backgroundColor: colors.grey[700],
                          color: colors.grey[100],
                          fontSize: "14px",
                          fontWeight: "bold",
                          padding: "10px 20px",
                        }}
                        onClick={() => {
                            removeItemSize();
                          }
                        }
                      >
                        <RemoveCircleIcon sx={{ mr: "10px" }} />
                        Remove Size
                      </Button>
                    </Box>
                  </Box>
                  <ItemDetailsForm item={item} />
              </Box>
                
              <div className='w-100 text-center mt-2'>
                <ItemDetailsSizeList itemid={itemid} itemSizesToRemove={itemSizesToRemove}/>
              </div>
          </main>
        </div>
    </ThemeProvider>
  </ColorModeContext.Provider>
    
  )
}



export default ItemDetails