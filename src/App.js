import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Signin from './auth/signin';
import Home from './admin/home.js'
import SHome from './student/home.js'
import UsedContext from './auth/usercontext';
function App() {
  return (
    <div className="App">
      <UsedContext>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Signin />} />
            <Route path="/admindash" element={<Home />} />
            <Route path="/studdash" element={<SHome />} />
          </Routes>
        </BrowserRouter>
      </UsedContext>
    </div>
  );
}

export default App;
