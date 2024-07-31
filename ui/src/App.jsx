import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RoomBuilder } from './RoomBuilder'
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";


export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/roombuilder" element={<RoomBuilder />} />
      </Routes>
    </BrowserRouter>
  )
}
