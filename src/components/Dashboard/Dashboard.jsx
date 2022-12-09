import React, {useState} from 'react';

//Other Shit
import MotionPhotosAutoIcon from '@mui/icons-material/MotionPhotosAuto';
import ClearIcon from '@mui/icons-material/Clear';
import CalculateIcon from '@mui/icons-material/Calculate';
import { tokens } from "../../theme";
import EmailIcon from "@mui/icons-material/Email";
import CalculatorBox from './CalculatorBox';
import CalculatorTotalBox from './CalculatorTotalBox';

//Firebase
import { db } from '../../Firebase/firebase';
import { collection, getDocs, where, query } from 'firebase/firestore';

//Components
import Topbar from "../NAVBars/TopBar";
import Sidebar from "../NAVBars/SideBar";
import NewOrders from './NewOrders';

//Light/Dark Mode
import { ColorModeContext, useMode } from '../../theme';
import { Box, CssBaseline, ThemeProvider, Button } from '@mui/material';
import Header from "../Header/Header";

const Dashboard = () => {

  const [theme, colorMode] = useMode();
  const colors = tokens(theme.palette.mode);

  const [smallBrazilBagData, setSmallBrazilBagData] = useState(0);
  const [largeBrazilBagData, setLargeBrazilBagData] = useState(0);

  const [smallCostaRicaBagData, setSmallCostaRicaBagData] = useState(0);
  const [largeCostaRicaBagData, setLargeCostaRicaBagData] = useState(0);

  const [smallColumbiaBagData, setSmallColumbiaBagData] = useState(0);
  const [largeColumbiaBagData, setLargeColumbiaBagData] = useState(0);

  const [smallEthopiaBagData, setSmallEthopiaBagData] = useState(0);
  const [largeEthopiaBagData, setLargeEthopiaBagData] = useState(0);

  const [smallSouthCentralBagData, setSmallSouthCentralBagData] = useState(0);
  const [largeSouthCentralBagData, setLargeSouthCentralBagData] = useState(0);

  const [smallJavaBagData, setSmallJavaBagData] = useState(0);
  const [largeJavaBagData, setLargeJavaBagData] = useState(0);

  const [smallDecafBagData, setSmallDecafBagData] = useState(0);
  const [largeDecafBagData, setLargeDecafBagData] = useState(0);

  function clearCalculations() { 
    setSmallBrazilBagData(0);
    setLargeBrazilBagData(0);
    setSmallCostaRicaBagData(0);
    setLargeCostaRicaBagData(0);
    setSmallColumbiaBagData(0);
    setLargeColumbiaBagData(0);
    setSmallEthopiaBagData(0);
    setLargeEthopiaBagData(0);
    setSmallSouthCentralBagData(0);
    setLargeSouthCentralBagData(0);
    setSmallJavaBagData(0);
    setLargeJavaBagData(0);
    setSmallDecafBagData(0);
    setLargeDecafBagData(0);
  }

  async function populateCalculations() {
    clearCalculations();
    try {
      const ordersCollection = query(collection(db,'orders'),where("Status","==","Order Created"))
      const ordersSnapshot = await getDocs(ordersCollection);
      const ordersList = ordersSnapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data()
      }));
      for (var key in ordersList) {
        console.log("KEY: " + ordersList[key].id);
        populateCalculationsFinish(ordersList[key].id);
      }
    } catch(e) {
      alert("Error: " + e);
    }
    
  }

  async function populateCalculationsFinish(orderID) {
    const orderLinesCollection = collection(db, "orders", orderID, "orderlines");
    const orderLinesSnapshot = await getDocs(orderLinesCollection);

    const orderLinesList = orderLinesSnapshot.docs.map((doc) => ({
        id: doc.id,
        BagSize: doc.data().BagSize,
        Quantity: doc.data().Quantity,
        ItemId: doc.data().ItemId
    }));

    console.log(orderLinesList);

    for (var key in orderLinesList) {
      console.log("ITEM ID: " + orderLinesList[key].ItemId);
      var ItemID = orderLinesList[key].ItemId * 1;

      if (orderLinesList[key].ItemId === "0") {
        if (orderLinesList[key].BagSize === "340G") {
          setSmallDecafBagData(smallDecafBagData + orderLinesList[key].Quantity);
        } else if (orderLinesList[key].BagSize === "1000G") {
          setLargeDecafBagData(largeDecafBagData + orderLinesList[key].Quantity);
        }
      } else if (orderLinesList[key].ItemId === "1") {
        if (orderLinesList[key].BagSize === "340G") {
          setSmallBrazilBagData(smallBrazilBagData + orderLinesList[key].Quantity);
        } else if (orderLinesList[key].BagSize === "1000G") {
          setLargeBrazilBagData(largeBrazilBagData + orderLinesList[key].Quantity);
        }
      } else if (orderLinesList[key].ItemId === "2") {
        if (orderLinesList[key].BagSize === "340G") {
          setSmallSouthCentralBagData(smallSouthCentralBagData + orderLinesList[key].Quantity);
        } else if (orderLinesList[key].BagSize === "1000G") {
          setLargeSouthCentralBagData(largeSouthCentralBagData + orderLinesList[key].Quantity);
        }
      } else if (orderLinesList[key].ItemId === "3") {
        if (orderLinesList[key].BagSize === "340G") {
          setSmallCostaRicaBagData(smallCostaRicaBagData + orderLinesList[key].Quantity);
        } else if (orderLinesList[key].BagSize === "1000G") {
          setLargeCostaRicaBagData(largeCostaRicaBagData + orderLinesList[key].Quantity);
        }
      } else if (orderLinesList[key].ItemId === "4") {
        if (orderLinesList[key].BagSize === "340G") {
          setSmallColumbiaBagData(smallColumbiaBagData + orderLinesList[key].Quantity);
        } else if (orderLinesList[key].BagSize === "1000G") {
          setLargeColumbiaBagData(largeColumbiaBagData + orderLinesList[key].Quantity);
        }
      } else if (orderLinesList[key].itemId === "5") {
        if (orderLinesList[key].BagSize === "340G") {
          setSmallEthopiaBagData(smallEthopiaBagData + orderLinesList[key].Quantity);
        } else if (orderLinesList[key].BagSize === "1000G") {
          setLargeEthopiaBagData(largeEthopiaBagData + orderLinesList[key].Quantity);
        }
      } else if (ItemID === 7) {
        console.log("HIT.");
        if (orderLinesList[key].BagSize === "340G") {
          setSmallJavaBagData(smallJavaBagData + orderLinesList[key].Quantity);
        } else if (orderLinesList[key].BagSize === "1000G") {
          setLargeJavaBagData(largeJavaBagData + orderLinesList[key].Quantity);
        }
      }
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
          <CssBaseline />
            <div className="app">
              <Sidebar />
              <main className="content">
                <Topbar />
                  <Box m="20px">
                    {/* HEADER */}
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                      <Header title="DASHBOARD" subtitle="Welcome to the fucking moon." />
                      <Box>
                        <Button
                          sx={{
                            backgroundColor: colors.greenAccent[700],
                            color: colors.grey[100],
                            fontSize: "14px",
                            fontWeight: "bold",
                            padding: "10px 20px",
                          }}
                          onClick={() => {
                              populateCalculations();
                            }
                          }
                        >
                          <MotionPhotosAutoIcon sx={{ mr: "10px" }} />
                          Populate
                        </Button>
                        <Button
                          sx={{
                            backgroundColor: colors.grey[700],
                            color: colors.grey[100],
                            fontSize: "14px",
                            fontWeight: "bold",
                            padding: "10px 20px",
                          }}
                          onClick={() => {
                              clearCalculations();
                            }
                          }
                        >
                          <ClearIcon sx={{ mr: "10px" }} />
                          Clear All
                        </Button>
                        <Button
                          sx={{
                            backgroundColor: colors.blueAccent[700],
                            color: colors.grey[100],
                            fontSize: "14px",
                            fontWeight: "bold",
                            padding: "10px 20px",
                          }}
                        >
                          <CalculateIcon sx={{ mr: "10px" }} />
                          Calc. Roast
                        </Button>
                      </Box>
                    </Box>
                     {/* GRID & CHARTS */}
                     {/* ROW 1*/}
                    <Box
                      display="grid"
                      gridTemplateColumns="repeat(12, 1fr)"
                      gridAutoRows="140px"
                      gap="20px"
                    >
                      <Box
                        gridColumn="span 3"
                        mt="25px"
                        backgroundColor={colors.primary[400]}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <CalculatorBox
                          title="Brazil"
                          small={smallBrazilBagData}
                          large={largeBrazilBagData}
                          icon={
                            <EmailIcon
                              sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                            />
                          }
                        />
                      </Box>
                      <Box
                        gridColumn="span 3"
                        mt="25px"
                        backgroundColor={colors.primary[400]}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <CalculatorBox
                          title="Costa Rica"
                          small={smallCostaRicaBagData}
                          large={largeCostaRicaBagData}
                          icon={
                            <EmailIcon
                              sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                            />
                          }
                        />
                      </Box>
                      <Box
                        gridColumn="span 3"
                        mt="25px"
                        backgroundColor={colors.primary[400]}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <CalculatorBox
                          title="Columbia"
                          small={smallColumbiaBagData}
                          large={largeColumbiaBagData}
                          icon={
                            <EmailIcon
                              sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                            />
                          }
                        />
                      </Box>
                      <Box
                        gridColumn="span 3"
                        mt="25px"
                        backgroundColor={colors.primary[400]}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <CalculatorBox
                          title="Ethopia"
                          small={smallEthopiaBagData}
                          large={largeEthopiaBagData}
                          icon={
                            <EmailIcon
                              sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                            />
                          }
                        />
                      </Box>
                    </Box>
                    {/* ROW 2 */} 
                    <Box
                      display="grid"
                      gridTemplateColumns="repeat(12, 1fr)"
                      gridAutoRows="140px"
                      gap="20px"
                    >
                      <Box
                        gridColumn="span 3"
                        mt="25px"
                        backgroundColor={colors.primary[400]}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <CalculatorBox
                          title="South Central"
                          small={smallSouthCentralBagData}
                          large={largeSouthCentralBagData}
                          icon={
                            <EmailIcon
                              sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                            />
                          }
                        />
                      </Box>
                      <Box
                        gridColumn="span 3"
                        mt="25px"
                        backgroundColor={colors.primary[400]}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <CalculatorBox
                          title="Java"
                          small={smallJavaBagData}
                          large={largeJavaBagData}
                          icon={
                            <EmailIcon
                              sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                            />
                          }
                        />
                      </Box>
                      <Box
                        gridColumn="span 3"
                        mt="25px"
                        backgroundColor={colors.primary[400]}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <CalculatorBox
                          title="Decaf"
                          small={smallDecafBagData}
                          large={largeDecafBagData}
                          icon={
                            <EmailIcon
                              sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                            />
                          }
                        />
                      </Box>
                      <Box
                        gridColumn="span 3"
                        mt="25px"
                        backgroundColor={colors.primary[400]}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <CalculatorTotalBox
                          title="Totals (g)"
                          brazil="0"
                          costarica="0"
                          columbia="0"
                          ethopia="0"
                          southcentral="0"
                          java="0"
                          decaf="0"
                          increase="+14%"
                          icon={
                            <EmailIcon
                              sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                            />
                          }
                        />
                      </Box>
                    </Box>
                  </Box>
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