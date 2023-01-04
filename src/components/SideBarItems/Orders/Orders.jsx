import React from 'react';

//Light/Dark Mode
import { ColorModeContext, useMode } from '../../../theme';
import { Box, CssBaseline, ThemeProvider } from '@mui/material';

//Components
import Topbar from "../../NAVBars/TopBar";
import Sidebar from "../../NAVBars/SideBar";
import Header from "../../Header/Header";
import OrdersList from './OrdersList';

const Orders = () => {
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
                      <Header title="ORDERS" subtitle='' />
                    </Box>
                </Box>
                <div className='w-100 text-center mt-2'>
                  <OrdersList />
                </div>
            </main>
          </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}

export default Orders