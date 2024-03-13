import { Route, Routes} from "react-router-dom";
import Landing from "./Components/Landing";
import Screen from "./Components/Screen";
import Camera from './Components/Camera'
import ScreenCam from './Components/ScreenCam'
import Pratice from "./Components/Pratice"
function App() {
  return (
    <div className="App">
      <Routes>
      <Route path="/" element={<Landing/>}/>
        <Route  element={<Screen/>} path="/screen"/>
        <Route  element={<Camera/>} path="/Camera"/>
        <Route  element={<ScreenCam/>} path="/ScreenCam"/>
        <Route  element={<Pratice/>} path="/Pratice"/>

      </Routes>
    </div>
  );
}

export default App;
