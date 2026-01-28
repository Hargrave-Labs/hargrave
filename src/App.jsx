import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import DiscoveryCall from './pages/DiscoveryCall';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/discovery-call" element={<DiscoveryCall />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
