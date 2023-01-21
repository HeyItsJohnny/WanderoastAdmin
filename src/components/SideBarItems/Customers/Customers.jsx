import React from 'react';

//Light/Dark Mode
import { ColorModeContext, useMode, tokens } from '../../../theme';
import { Box, CssBaseline, ThemeProvider, Button } from '@mui/material';

//Icons
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

//Components
import Topbar from "../../NAVBars/TopBar";
import Sidebar from "../../NAVBars/SideBar";
import CustomersList from './CustomersList';
import Header from "../../Header/Header";

//Modals

//Firebase
import { db } from '../../../Firebase/firebase';
import { doc, deleteDoc} from 'firebase/firestore';

const Customers = () => {
  const [theme, colorMode] = useMode();

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
                      <Header title="CUSTOMERS" subtitle='' />
                    </Box>
                </Box>
                <div className='w-100 text-center mt-2'>
                  <CustomersList />
                </div>
            </main>
          </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}

export default Customers