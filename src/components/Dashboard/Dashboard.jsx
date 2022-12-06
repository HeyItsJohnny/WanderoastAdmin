import React, {useState} from 'react';
import { Card, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../Contexts/AuthContext';
import { Link,useNavigate } from 'react-router-dom';

//Components
import Topbar from "../NAVBars/TopBar";

//Light/Dark Mode
import { ColorModeContext, useMode } from '../../theme';
import { CssBaseline, ThemeProvider } from '@mui/material';

const Dashboard = () => {

  const [theme, colorMode] = useMode();

  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
      setError("");
      try {
        await logout();
        navigate("/login");
      } catch(e) {
        setError("Failed to logout: " + e);
      }
  }

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
          <div className="app">
            <main className="content">
              <Topbar />
              
                <Button variant="link" onClick={handleLogout}>Log Out</Button>
              
            </main>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
      
    </>
  )
}

export default Dashboard