import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import CarCarousel from './components/Caroussel';
import RentWay from './components/RentWay';
import AboutUs from './components/About';
import Footer from './components/Footer';
import Home from './pages/Home';
import MyForm from './pages/SignUp';
import Sidebar from './components/Dashboard';
import Profile from './pages/profil';
import Reservation from './pages/reservation';
import Login from './pages/Login';
import ReservationSuccess from './pages/ReservationSuccess';
import ReservationArchive from './pages/Archive';
import Dashboard from './pages/Accueil';
import CarsPage from './pages/cars';
import ChangePassword from './components/PasswordChang';
import CarsAdmin from './pages/CarsAdmin';
import SidebarA from './components/SideBarAdmin';
import CarsCrud from './pages/carsCrud';
import Payment from './pages/PaymentForm';

// Stripe
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import ProfileAdmin from './pages/profilAdmin';
import Maintenance from './pages/maintenance';
import NewReservationNotification from './pages/Notification';
import DashboardA from './pages/DashboardA';


// Load Stripe with your public key
const stripePromise = loadStripe('pk_test_51Qa4URJ0GcGDS8zCHtvX70c6awf1bVExnHvmKtxIY4nO6eGtdIfCRMVtpqVvcXwoQqXQEgpDYdd6dNCOxyEdzPP700cbDKuDx7');

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<MyForm />} />
          <Route path="/login" element={<Login />} />
          <Route path="/rent" element={<RentWay />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/client" element={<Sidebar />} />
          <Route path="/profil" element={<Profile />} />
          <Route path="/reservation" element={<Reservation />} />
          <Route path="/reservation-success" element={<ReservationSuccess />} />
          <Route path="/archive" element={<ReservationArchive />} />
          <Route path="/accueil" element={<Dashboard />} />
          <Route path="/cars" element={<CarsPage />} />
          <Route path="/password" element={<ChangePassword />} />
          <Route path="/sideAdmin" element={<SidebarA />} />
          <Route path="/carsAdmin" element={<CarsCrud/>} />
          <Route path="/profilAdmin" element={<ProfileAdmin/>} />
          <Route path="/maintenance" element={<Maintenance/>} />
          <Route path="/notifier" element={<NewReservationNotification/>} />
          <Route path="/Dashborad_admin" element={<DashboardA/>} />

          <Route 
            path="/payer" 
            element={
              <Elements stripe={stripePromise}>
                <Payment />
              </Elements>
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
