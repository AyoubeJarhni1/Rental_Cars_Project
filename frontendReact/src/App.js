import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import CarCarousel from './components/Caroussel';
import RentWay from './components/RentWay';
import AboutUs from './components/About';
import Footer from './components/Footer';
import Home from './pages/Home'; // Assurez-vous que Home est bien importé depuis le bon emplacement
import MyForm from './pages/SignUp';
import Sidebar from './components/Dashboard';
import Profile from './pages/profil';
import Reservation from './pages/reservation';
import Login from './pages/Login';
import ReservationSuccess from './pages/ReservationSuccess';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<MyForm/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/rent" element={<RentWay />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/client" element={<Sidebar/>} />
          <Route path="/profil" element={<Profile/>} />
          <Route path="/reservation" element={<Reservation/>} />
          <Route path="/reservation-success" element={<ReservationSuccess/>} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
