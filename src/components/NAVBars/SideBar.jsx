import React from 'react';
import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";
import { useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import DiscountOutlinedIcon from '@mui/icons-material/DiscountOutlined';
import EmojiPeopleOutlinedIcon from '@mui/icons-material/EmojiPeopleOutlined';
import CoffeeMakerOutlinedIcon from '@mui/icons-material/CoffeeMakerOutlined';
import GradeOutlinedIcon from '@mui/icons-material/GradeOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import SubscriptionsOutlinedIcon from '@mui/icons-material/SubscriptionsOutlined';
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

const SideBar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { toggleSidebar, collapseSidebar, broken, rtl } = useProSidebar();

  return (
    <div style={{ display: 'flex', height: '100%', direction: rtl ? 'rtl' : 'ltr' }}>

        <Sidebar backgroundColor={colors.primary[400]}>
          <div>
            <Menu>
              <MenuItem icon={<HomeOutlinedIcon />} routerLink={<Link to="/"/>}>Dashboard</MenuItem>
              <MenuItem icon={<FavoriteBorderOutlinedIcon />} routerLink={<Link to="/newtextorder"/>}>New Text Order</MenuItem>
              <MenuItem icon={<DiscountOutlinedIcon />} routerLink={<Link to="/coupons"/>}>Coupons</MenuItem>
              <MenuItem icon={<EmojiPeopleOutlinedIcon />} routerLink={<Link to="/customers"/>}>Customers</MenuItem>
              <MenuItem icon={<CoffeeMakerOutlinedIcon />} routerLink={<Link to="/items" />}>Items</MenuItem>
              <MenuItem icon={<GradeOutlinedIcon />} routerLink={<Link to="/orders" />}>Orders</MenuItem>
              <MenuItem icon={<SubscriptionsOutlinedIcon />} routerLink={<Link to="/subscriptions" />}>Subscriptions</MenuItem>
              <MenuItem icon={<PeopleOutlinedIcon />} routerLink={<Link to="/adminusers" />}>Admin Users</MenuItem>
            </Menu>
          </div>
        </Sidebar>

      <main>
        <div style={{ display: 'flex', padding: 10 }}>
          <MenuOutlinedIcon onClick={() => collapseSidebar()}/>
          {broken ? (
            <button className="sb-button" onClick={() => toggleSidebar()}>
              Toggle
            </button>
          ) : null}
        </div>
      </main>
    </div>
  )
}

export default SideBar