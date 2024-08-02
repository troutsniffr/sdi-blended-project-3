import { BrowserRouter, Routes, Route, Switch } from 'react-router-dom';
import { RoomBuilder } from './RoomBuilder'
import { OrgManager } from './OrgManager'
import { HomePage } from './HomePage'
import { LaunchBuilder } from './LaunchBuilder'
import Layout from './Layout';
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primereact/resources/themes/md-dark-indigo/theme.css"


export default function App() {

  return (
    <div>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout><HomePage /></Layout>} />

        <Route path="/roombuilder" element={<Layout><RoomBuilder /></Layout>} />
        <Route path="/LaunchBuilder" element={<Layout><LaunchBuilder /></Layout>} />
        <Route path="/orgmanager/:id/:maxAttendees" element={<OrgManager />} />
        <Route path="/OrgManager" element={<OrgManager/>} />
      </Routes>
    </BrowserRouter>
    </div>
  )
}
