import React, { useState } from 'react';

//Light/Dark Mode
import { ColorModeContext, useMode, tokens } from '../../../theme';
import { Box, CssBaseline, ThemeProvider, Button } from '@mui/material';

//Icons
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

//Components
import Topbar from "../../NAVBars/TopBar";
import Sidebar from "../../NAVBars/SideBar";
import ItemsList from './ItemsList';
import Header from "../../Header/Header";

//Modals
import ItemModal from '../../Modals/ItemModal';

//Firebase
import { db } from '../../../Firebase/firebase';
import { doc, deleteDoc} from 'firebase/firestore';

const Items = () => {
  const [theme, colorMode] = useMode();
  const colors = tokens(theme.palette.mode);

  var selectedItem = [];

  const itemsToRemove = (data) => {
    selectedItem = data.selectedRowsData;
  }

  function removeItem() {
    for (var key in selectedItem) {
      deleteItem(selectedItem[key].id)
    }
  }

  async function deleteItem(itemID) {
    await deleteDoc(doc(db,"items",itemID));
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
                    <Header title="ITEMS" subtitle='There is no "I" in team. But there is a "me" in that bitch.' />
                    <Box>
                      <ItemModal />
                      <Button
                        sx={{
                          backgroundColor: colors.grey[700],
                          color: colors.grey[100],
                          fontSize: "14px",
                          fontWeight: "bold",
                          padding: "10px 20px",
                        }}
                        onClick={() => {
                            removeItem();
                          }
                        }
                      >
                        <RemoveCircleIcon sx={{ mr: "10px" }} />
                        Remove Item
                      </Button>
                    </Box>
                  </Box>
              </Box>
              <div className='w-100 text-center mt-2'>
                <ItemsList itemsToRemove={itemsToRemove}/>
              </div>
          </main>
        </div>
    </ThemeProvider>
  </ColorModeContext.Provider>
  )
}

export default Items