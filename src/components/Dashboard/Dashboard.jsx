import React from 'react';

//Components
import Topbar from "../NAVBars/TopBar";
import Sidebar from "../NAVBars/SideBar";
import NewOrders from './NewOrders';

//Light/Dark Mode
import { ColorModeContext, useMode } from '../../theme';
import { CssBaseline, ThemeProvider } from '@mui/material';

const Dashboard = () => {

  const [theme, colorMode] = useMode();

  return (
    <>
    {/*
    
      <Card>
        <Card.Body>
           <h2 className="text-center mb-4">Profile</h2>         
           {error && <Alert variant="danger">{error}</Alert>}
           <strong>Email: </strong> {currentUser.email}
           <Link to="/updateProfile" className="btn btn-primary w-100 mt-3">
              Update Profile
           </Link>
        </Card.Body>
      </Card>
    */}
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
            <div className="app">
              <Sidebar />
              <main className="content">
                <Topbar />
                  <div className='w-100 text-center mt-2'>
                    <NewOrders />
                  </div>
              </main>
            </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
      
    </>
  )
}

export default Dashboard