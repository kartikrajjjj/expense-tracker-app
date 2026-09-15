import HomePage from "./components/Home"
import {BrowserRouter, Routes, Route} from "react-router-dom"

const App = ()=>{
  return(
    <BrowserRouter>
    <Routes>
      <Route path ="/" element={<HomePage></HomePage>}/>
    </Routes>
    </BrowserRouter>
  )
}
export default App;