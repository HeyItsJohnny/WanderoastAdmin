import React from "react";
import SignUp from "./SignUp/SignUp";
import Dashboard from "./Dashboard/Dashboard";
import Login from "./Login/Login";
import ForgotPassword from "./ForgotPassword/ForgotPassword";

//Side bar items
import AdminUsers from "./SideBarItems/AdminUsers/AdminUsers";
import Coupons from "./SideBarItems/Coupons/Coupons";
import Customers from "./SideBarItems/Customers/Customers";
import Items from "./SideBarItems/Items/Items";
import NewTextOrder from "./SideBarItems/NewTextOrder/NewTextOrder";
import Orders from "./SideBarItems/Orders/Orders";
import Subscriptions from "./SideBarItems/Subscriptions/Subscriptions";
import ItemDetails from "./SideBarItems/Items/ItemDetails";

import { AuthProvider } from "./Contexts/AuthContext";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from "./PrivateRoute";



function App() {

    return (
      <>
        <Router>
          <AuthProvider>
            <Routes>
              <Route exact path="/" element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              } />
              <Route exact path="/adminusers" element={
                <PrivateRoute>
                  <AdminUsers />
                </PrivateRoute>
              } />
              <Route exact path="/coupons" element={
                <PrivateRoute>
                  <Coupons />
                </PrivateRoute>
              } />
              <Route exact path="/customers" element={
                <PrivateRoute>
                  <Customers />
                </PrivateRoute>
              } />
              <Route exact path="/items" element={
                <PrivateRoute>
                  <Items />
                </PrivateRoute>
              } />
              <Route exact path="/itemdetails/:itemid" element={
                <PrivateRoute>
                  <ItemDetails />
                </PrivateRoute>
              } />
              <Route exact path="/newtextorder" element={
                <PrivateRoute>
                  <NewTextOrder />
                </PrivateRoute>
              } />
              <Route exact path="/orders" element={
                <PrivateRoute>
                  <Orders />
                </PrivateRoute>
              } />
              <Route exact path="/subscriptions" element={
                <PrivateRoute>
                  <Subscriptions />
                </PrivateRoute>
              } />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
              <Route path="/forgotPassword" element={<ForgotPassword />} />
            </Routes>
          </AuthProvider>
        </Router>
      </>
    );
}

export default App;
