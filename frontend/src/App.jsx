import HomePage from "./components/Home";
import Signup from "./components/Home/Signup";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import { ToastContainer } from 'react-toastify';

const App = ()=>{
  return(
    <BrowserRouter>
    <Routes>
      <Route path ="/" element={<HomePage></HomePage>}/>
      <Route path = "/signup" element={<Signup/>}/>
    </Routes>
    <ToastContainer/>
    </BrowserRouter>
  )
}
export default App;