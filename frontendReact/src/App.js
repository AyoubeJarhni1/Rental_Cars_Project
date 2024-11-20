import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import CarCarousel from './components/Caroussel';
import RentWay from './components/RentWay';
import AboutUs from './components/About';
import Footer from './components/Footer';
import Home from './pages/Home'; // Assurez-vous que Home est bien importé depuis le bon emplacement
import MyForm from './pages/SignUp';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Définir la route par défaut (Home) */}
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<MyForm/>} />
          <Route path="/rent" element={<RentWay />} />
          <Route path="/about" element={<AboutUs />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
