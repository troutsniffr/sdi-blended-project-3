import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RoomBuilder } from './RoomBuilder'
import { OrgManager } from './OrgManager'
import { HomePage } from './HomePage'
import { LaunchBuilder } from './LaunchBuilder'
import { NavBar } from './NavBar';
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";


export default function App() {

  return (
    <div>
      <NavBar/>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path="/orgmanager" element={<OrgManager />} />
        <Route path="/roombuilder" element={<RoomBuilder />} />
        <Route path="/LaunchBuilder" element={<LaunchBuilder />} />
        
      </Routes>
    </BrowserRouter>
    </div>
  )
}
