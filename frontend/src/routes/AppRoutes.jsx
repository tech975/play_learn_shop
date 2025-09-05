import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/public/Home';
import Login from '../pages/public/Login';
import Register from '../pages/public/Register';
import UserLayout from '../layout/UserLayout';
import ProtectedRoute from './ProtectedRoute';
import UserDashboard from '../pages/user/UserDashboard';
import MyBookings from '../pages/user/MyBookings';
import NotFound from '../pages/NotFound';
import UserProfile from '../pages/user/UserProfile';
import VenueList from '../pages/user/VenueList';
import VenueDetails from '../pages/user/VenueDetails';
import CoachList from '../pages/user/coach-booking/CoachList';
import CoachDetails from '../pages/user/coach-booking/CoachDetails';
import OwnerForm from '../pages/partner/OwnerForm';
import CoachForm from '../pages/partner/CoachForm';
// import { useSelector } from 'react-redux';


const AppRoutes = () => {
  // const user = useSelector((state) => state.auth.user);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path='/partner/owner' element={<OwnerForm />} />
        <Route path='/partner/coach' element={<CoachForm />} />

        {/* User Dashboard Route */}

        <Route
          path="/user"
          element={
            <ProtectedRoute allowedRoles={["user"]}>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/user/dashboard"
          element={
            <ProtectedRoute allowedRoles={["user"]}>
              <UserDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path='/user/bookings/turf'
          element={
            <ProtectedRoute allowedRoles={["user"]}>
              <VenueList />
            </ProtectedRoute>
          }
        />

        <Route
          path='/user/bookings/turf/:id'
          element={
            <ProtectedRoute allowedRoles={["user"]}>
              <VenueDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/user/bookings"
          element={
            <ProtectedRoute allowedRoles={["user"]}>
              <MyBookings />
            </ProtectedRoute>
          }
        />

        <Route
          path="/user/profile"
          element={
            <ProtectedRoute allowedRoles={["user"]}>
              <UserProfile />
            </ProtectedRoute>
          }
        />

        {/* Coach Routes for user perspective */}
        <Route path="/user/bookings/coach" element={<ProtectedRoute allowedRoles={["user"]}> <CoachList /> </ProtectedRoute>} />

        <Route path="/user/bookings/coach/:id" element={<ProtectedRoute allowedRoles={["user"]}> <CoachDetails /> </ProtectedRoute>} />

        {/* Add more protected routes for other roles here */}

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;