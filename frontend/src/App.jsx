import HomePage from "./components/Home";
import Signup from "./components/Home/Signup";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import PageNotFound from "./components/PageNotFound";
import Userlayout from "./components/PageNotFound/Userlayout";
import ForgotPassword from "./components/Home/forgotPassword";

const App = ()=>{
  return(
    <BrowserRouter>
    <Routes>
      <Route path ="/" element={<HomePage/>}/>
      <Route path = "/signup" element={<Signup/>}/>
      <Route path = "/forgot-password" element={<ForgotPassword></ForgotPassword>}/>
      <Route path="/app/user" element={<Userlayout/>} ></Route>
      <Route path = "/*" element={<PageNotFound/>}/>
    </Routes>
    <ToastContainer/>
    </BrowserRouter>
  )
}
export default App;