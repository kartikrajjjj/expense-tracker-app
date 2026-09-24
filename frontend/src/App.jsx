import { ToastContainer } from "react-toastify";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Guard from "./Guard";
import { lazy, Suspense } from "react";
import Loader from "./components/Shared/Loader";

const PageNotFound = lazy(()=> import("./components/PageNotFound"));
const Signup = lazy(()=> import("./components/Home/Signup"));
const ForgotPassword = lazy(()=> import("./components/Home/forgotPassword"));
const HomePage = lazy(()=> import("./components/Home"));
const Dashboard = lazy(()=> import("./components/User/Dashboard"));
const Report = lazy(()=> import("./components/User/Report"));
const Userlayout = lazy(() => import("./components/User/Userlayout"));



const App = () => {
  return (
    <BrowserRouter>
    <Suspense fallback={<Loader />}>
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
    </Suspense>
      <ToastContainer />
    </BrowserRouter>
  );
};
export default App;
