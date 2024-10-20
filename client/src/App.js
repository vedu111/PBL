import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppAppBar from "./components/AppAppBar";
import Dashboard from "./pages/Dashboard";
import Error from "./pages/Error";
import Exercises from "./pages/Exercises";
import Index from "./pages/Home";
import User from "./pages/user";
import withRoot from "./components/withRoot";

function App() {
  return (
    <>
      <Router>
        <AppAppBar />
        <Routes>
          <Route path="/" element={<Index />} /> 
          <Route path="/user" element={<User />} /> 
          <Route path="/dashboard" element={<Dashboard />} /> 
          <Route path="/exercise" element={<Exercises />} /> 
          <Route path="*" element={<Error />} /> 
        </Routes>
      </Router>
    </>
  );
}

export default withRoot(App);
