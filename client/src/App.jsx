import React from "react";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

import { Toaster, toast } from "sonner";

import { Route, Routes } from "react-router-dom";
import NonexistRoutes from "./components/routing/NonexistRoutes";
import ChatPage from "./pages/ChatPage";

const App = () => {
  return (
    <>
    <Toaster/>
      <Routes>
        <Route path="/" element={<ChatPage/>} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/*" element={<NonexistRoutes />} />
      </Routes>
    </>
  );
};

export default App;
