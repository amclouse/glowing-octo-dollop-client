import React, { useState } from "react";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
} from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { Button } from "@material-ui/core"
import { Switch, Route, Link } from "react-router-dom";
import Applications from "./Applications/Applications";
import Home from "./Home"


const Navbar = ({ clearToken, token }) => {
  
  const [collapse, setCollapse] = useState(false)

  const handleCollapsedChange = (collapsed) => {
    setCollapse(!collapsed)
    console.log('collapsed')
  }
  
  

  return (
    <div style={{display: 'flex', width: '100%'}} >
      <ProSidebar collapsed={collapse} collapsedWidth="80px" style={{height: '100vh', opacity: '0.95'}}>
        <Menu iconShape="square">
          <MenuItem ><Link to="/">Home</Link></MenuItem>
          <MenuItem ><Link to="/applications">Applications</Link></MenuItem>
          <MenuItem >Resume</MenuItem>
        </Menu>
        <Button style={{color: 'white'}} onClick={clearToken}> Logout </Button>
        <Button style={{color: 'white'}} onClick={() => handleCollapsedChange(collapse)}> collapse </Button>
      </ProSidebar>

      <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/applications">
            <Applications token={token} />
          </Route>
        </Switch> 

    </div>
  );
};

export default Navbar;
