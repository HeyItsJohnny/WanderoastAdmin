import React, {useState} from 'react';

//Other Shit
import MotionPhotosAutoIcon from '@mui/icons-material/MotionPhotosAuto';
import ClearIcon from '@mui/icons-material/Clear';
import CalculateIcon from '@mui/icons-material/Calculate';
import { tokens } from "../../theme";
import EmailIcon from "@mui/icons-material/Email";
import CalculatorBox from './CalculatorBox';
import CalculatorTotalBox from './CalculatorTotalBox';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';

//Firebase
import { db } from '../../Firebase/firebase';
import { collection, getDocs, where, query, updateDoc, doc } from 'firebase/firestore';

//Components
import Topbar from "../NAVBars/TopBar";
import Sidebar from "../NAVBars/SideBar";
import NewOrders from './NewOrders';
import OrderStatusChange from '../Modals/OrderStatusChange';

//Light/Dark Mode
import { ColorModeContext, useMode } from '../../theme';
import { Box, CssBaseline, ThemeProvider, Button } from '@mui/material';
import Header from "../Header/Header";

const Dashboard = () => {

  const [theme, colorMode] = useMode();
  const colors = tokens(theme.palette.mode);
  var selectedOrders = [];

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

  const [brazilTotalData, setBrazilTotalData] = useState(0);
  const [costaRicaTotalData, setCostaRicaTotalData] = useState(0);
  const [columbiaTotalData, setColumbiaTotalData] = useState(0);
  const [ethopiaTotalData, setEthopiaTotalData] = useState(0);
  const [southCentralTotalData, setSouthCentralTotalData] = useState(0);
  const [javaTotalData, setJavaTotalData] = useState(0);
  const [decafTotalData, setDecafTotalData] = useState(0);

  var EthopiaSmallBag = 0;
  var EthopiaBigBag = 0;
  var ColumbiaSmallBag = 0;
  var ColumbiaBigBag = 0;
  var CostaRicaSmallBag = 0;
  var CostaRicaBigBag = 0;
  var BrazilSmallBag = 0;
  var BrazilBigBag = 0;
  var SouthCentralSmallBag = 0;
  var SouthCentralBigBag = 0;
  var DecafSmallBag = 0;
  var DecafBigBag = 0;
  var JavaSmallBag = 0;
  var JavaBigBag = 0;

  function clearCalculationsForPopulate() { 
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

    EthopiaSmallBag = 0;
    EthopiaBigBag = 0;
    ColumbiaSmallBag = 0;
    ColumbiaBigBag = 0;
    CostaRicaSmallBag = 0;
    CostaRicaBigBag = 0;
    BrazilSmallBag = 0;
    BrazilBigBag = 0;
    SouthCentralSmallBag = 0;
    SouthCentralBigBag = 0;
    DecafSmallBag = 0;
    DecafBigBag = 0;
    JavaSmallBag = 0;
    JavaBigBag = 0;
  }

  async function populateCalculations() {
    clearCalculationsForPopulate();
    try {
      const ordersCollection = query(collection(db,'orders'),where("Status","==","Order Created"))
      const ordersSnapshot = await getDocs(ordersCollection);
      const ordersList = ordersSnapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data()
      }));
      for (var key in ordersList) {
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
        ItemName: doc.data().ItemName,
        BagSize: doc.data().BagSize,
        Quantity: doc.data().Quantity,
        ItemId: doc.data().ItemId
    }));


    for (var key in orderLinesList) {
      var ItemName = orderLinesList[key].ItemName;

      if (ItemName === 'DECAF - BRAZIL FAZHENDA RAINA') {
        if (orderLinesList[key].BagSize === "340G") {
          DecafSmallBag +=  orderLinesList[key].Quantity;
        } else if (orderLinesList[key].BagSize === "1000G") {
          DecafBigBag +=  orderLinesList[key].Quantity;
        }
      } else if (ItemName === 'BRAZIL FAZHENDA RAINA') {
        if (orderLinesList[key].BagSize === "340G") {
          BrazilSmallBag +=  orderLinesList[key].Quantity;
        } else if (orderLinesList[key].BagSize === "1000G") {
          BrazilBigBag +=  orderLinesList[key].Quantity;
        }
      } else if (ItemName === 'SOUTH CENTRAL') {
        if (orderLinesList[key].BagSize === "340G") {
          SouthCentralSmallBag +=  orderLinesList[key].Quantity;
        } else if (orderLinesList[key].BagSize === "1000G") {
          SouthCentralBigBag +=  orderLinesList[key].Quantity;
        }
      } else if (ItemName === 'COSTA RICA DOTA TARRAZU EL VAPOR GRAIN PRO') {
        if (orderLinesList[key].BagSize === "340G") {
          CostaRicaSmallBag +=  orderLinesList[key].Quantity;
        } else if (orderLinesList[key].BagSize === "1000G") {
          CostaRicaBigBag +=  orderLinesList[key].Quantity;
        }
      } else if (ItemName === 'COLOMBIA') {
        if (orderLinesList[key].BagSize === "340G") {
          ColumbiaSmallBag +=  orderLinesList[key].Quantity;
        } else if (orderLinesList[key].BagSize === "1000G") {
          ColumbiaBigBag +=  orderLinesList[key].Quantity;
        }
      } else if (ItemName === 'ETHIOPIA YIRGACHEFFE 1 FTO DUMERSO') {
        if (orderLinesList[key].BagSize === "340G") {
          EthopiaSmallBag +=  orderLinesList[key].Quantity;
        } else if (orderLinesList[key].BagSize === "1000G") {
          EthopiaBigBag +=  orderLinesList[key].Quantity;
        }
      } else if (ItemName === 'NICARAGUA JAVA') {
        if (orderLinesList[key].BagSize === "340G") {
          JavaSmallBag += orderLinesList[key].Quantity;
        } else if (orderLinesList[key].BagSize === "1000G") {
          JavaBigBag += orderLinesList[key].Quantity;
        }
      }
    }
    setVariables();
  }

  function setVariables() {
    setSmallColumbiaBagData(ColumbiaSmallBag);
    setLargeColumbiaBagData(ColumbiaBigBag);
    setSmallEthopiaBagData(EthopiaSmallBag);
    setLargeEthopiaBagData(EthopiaBigBag);
    setSmallCostaRicaBagData(CostaRicaSmallBag);
    setLargeCostaRicaBagData(CostaRicaBigBag);
    setSmallBrazilBagData(BrazilSmallBag);
    setLargeBrazilBagData(BrazilBigBag);
    setSmallSouthCentralBagData(SouthCentralSmallBag);
    setLargeSouthCentralBagData(SouthCentralBigBag);
    setSmallDecafBagData(DecafSmallBag);
    setLargeDecafBagData(DecafBigBag);
    setSmallJavaBagData(JavaSmallBag);
    setLargeJavaBagData(JavaBigBag);
  }

  function clearAllCalculations() {
    clearCalculationsForPopulate();
    clearTotals();
  }

  function clearTotals() {
    setBrazilTotalData(0);
    setCostaRicaTotalData(0);
    setColumbiaTotalData(0);
    setEthopiaTotalData(0);
    setSouthCentralTotalData(0);
    setJavaTotalData(0);
    setDecafTotalData(0);
  }

  function calculateRoast() {
    clearTotals();

    setBrazilTotalData(((smallBrazilBagData*340) + (largeBrazilBagData * 1000)) * 1);
    setCostaRicaTotalData(((smallCostaRicaBagData*340) + (largeCostaRicaBagData * 1000)) * 1);
    setColumbiaTotalData(((smallColumbiaBagData*340) + (largeColumbiaBagData * 1000)) * 1);
    setEthopiaTotalData(((smallEthopiaBagData*340) + (largeEthopiaBagData * 1000)) * 1);
    setSouthCentralTotalData(((smallSouthCentralBagData*340) + (largeSouthCentralBagData * 1000)) * 1);
    setJavaTotalData(((smallJavaBagData*340) + (largeJavaBagData * 1000)) * 1);
    setDecafTotalData(((smallDecafBagData*340) + (largeDecafBagData * 1000)) * 1);
  }

  function changeOrderStatus(newOrderStatus) {
    console.log("New Status: " + newOrderStatus);
    if (selectedOrders.length === 0) {
      alert("Nothing was selected.");
    } else {
      for (var key in selectedOrders) {
        console.log('Orders to Change: ' + selectedOrders[key].FullName);
        updateOrderStatus(selectedOrders[key].id,newOrderStatus);
      }
    }
  }

  async function updateOrderStatus(orderID, newStatus) {
    const orderRef = doc(db, "orders", orderID);
      await updateDoc(orderRef, {
        Status: newStatus,
      });
  }

  const selectedOrdersForStatusChange = (data) => {
    selectedOrders = data.selectedRowsData;
  };

  const selectedNewOrderStatus = (data) => {
    changeOrderStatus(data.orderStatus);
  }

  return (
    <>
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
                      <Header title="DASHBOARD" subtitle="A snowflake is one of God's most fragile creations, but look what they can do when they stick together." />
                      <Box>
                        <OrderStatusChange selectedNewOrderStatus={selectedNewOrderStatus} />
                      </Box>
                    </Box>
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
                            backgroundColor: colors.blueAccent[700],
                            color: colors.grey[100],
                            fontSize: "14px",
                            fontWeight: "bold",
                            padding: "10px 20px",
                          }}
                          onClick={() => {
                            calculateRoast();
                          }
                        }
                        >
                          <CalculateIcon sx={{ mr: "10px" }} />
                          Calc. Roast
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
                              clearAllCalculations();
                            }
                          }
                        >
                          <ClearIcon sx={{ mr: "10px" }} />
                          Clear All
                        </Button>
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
                          total={brazilTotalData}
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
                          total={costaRicaTotalData}
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
                          total={columbiaTotalData}
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
                          total={ethopiaTotalData}
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
                          total={southCentralTotalData}
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
                          total={javaTotalData}
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
                          total={decafTotalData}
                          icon={
                            <EmailIcon
                              sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                            />
                          }
                        />
                      </Box>
                      {/*
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
                          brazil={brazilTotalData}
                          costarica={costaRicaTotalData}
                          columbia={columbiaTotalData}
                          ethopia={ethopiaTotalData}
                          southcentral={southCentralTotalData}
                          java={javaTotalData}
                          decaf={decafTotalData}
                          increase="+14%"
                          icon={
                            <EmailIcon
                              sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                            />
                          }
                        />
                      </Box>
                        */}
                    </Box>
                  </Box>
                  <div className='w-100 text-center mt-2'>
                    <NewOrders selectedOrdersForStatusChange={selectedOrdersForStatusChange}/>
                  </div>
              </main>
            </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </>
  )
}

export default Dashboard