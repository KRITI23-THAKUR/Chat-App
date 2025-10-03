import React from "react";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import { Toaster, toast } from "sonner";

import { Route, Routes } from "react-router-dom";
import NonexistRoutes from "./components/routing/NonexistRoutes";

const App = () => {
  return (
    <>
    <Toaster/>
      <Routes>
        <Route path="/" element={<Dashboard />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/*" element={<NonexistRoutes />} />
      </Routes>
    </>
  );
};

export default App;
