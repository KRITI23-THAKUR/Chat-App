
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

import { Toaster} from "sonner";

import { Route, Routes } from "react-router-dom";
import NonexistRoutes from "./components/routing/NonexistRoutes";
import Chat from "./pages/Chat";
import ProtectedRoutes from "./components/routing/ProtectedRoutes";
import PublicRoutes from "./components/routing/PublicRoutes";
import ChatProviderWrapper from "./components/routing/ChatProviderWrapper";


const App = () => {
  return (
    <>
      <Toaster />
      <Routes>
        <Route element={<ProtectedRoutes />}>
        <Route element={<ChatProviderWrapper/>}>
          <Route path="/" element={<Chat />} />
          </Route>
        </Route>
        <Route element={<PublicRoutes />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/*" element={<NonexistRoutes />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
