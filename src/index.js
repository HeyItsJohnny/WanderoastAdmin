import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { ProSidebarProvider } from "react-pro-sidebar";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ProSidebarProvider>
      <App />
    </ProSidebarProvider>
  </React.StrictMode>
);

