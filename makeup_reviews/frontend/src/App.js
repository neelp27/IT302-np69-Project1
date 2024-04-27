import './App.css';
import React, { useState, useCallback } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import MakeupList from "./components/makeupList";
import MakeupDetail from "./components/MakeupDetail";
import Login from "./components/login";
import AddComments from "./components/addcomment"; 

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function App() {
  const [user, setUser] = useState(null);

  const loginSetter = useCallback(user => {
    setUser(user);
  }, [setUser]);

  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand>Makeup Website</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={NavLink} to={"/np69_makeup"}>
              Makeup
            </Nav.Link>
            <Nav.Link as={NavLink} to={user ? "" : "/np69_login"}>
              {user ? "Logout User" : "Login"}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      
      <Routes>
        <Route path="/" element={<MakeupList setUser={setUser} />}></Route>
        <Route path="/np69_makeup" element={<MakeupList setUser={setUser} />}></Route>
        <Route path="/np69_makeup/:id" element={<MakeupDetail />}></Route>
        <Route path="/np69_login" element={<Login setUser={setUser} user={user} loginSetter={loginSetter} />}></Route>
        
        <Route
          path="/np69_makeup/:id/review" 
          element={<AddComments user={user} />}
        ></Route>
        
      </Routes>
    </div>
  );
}

export default App;
