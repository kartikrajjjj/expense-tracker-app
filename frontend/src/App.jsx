import HomePage from "./components/Home";
import Signup from "./components/Home/Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import PageNotFound from "./components/PageNotFound";
import Userlayout from "./components/User/Userlayout";
import ForgotPassword from "./components/Home/forgotPassword";
import Dashboard from "./components/User/Dashboard";
import Report from "./components/User/Report";
import Guard from "./Guard";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/app/user"
          element={
            <Guard endpoint="/api/user/session" role="user">
              <Userlayout />
            </Guard>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="report" element={<Report />} />
        </Route>
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
};
export default App;
