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
import OwnerDashboard from '../pages/owner/OwnerDashboard';
import VenueManagement from '../pages/owner/VenueManagement';
import BookingRequests from '../pages/owner/BookingRequests';
import CalendarManagement from '../pages/owner/CalendarManagement';
import RevenueTracking from '../pages/owner/RevenueTracking';
import AdminDashboard from '../pages/admin/AdminDashboard';
import AdminLogin from '../pages/admin/AdminLogin';
import { useSelector } from 'react-redux';


const AppRoutes = () => {
  // const user = useSelector((state) => state.auth.user);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin/login" element={<AdminLogin />} />


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
        <Route path="/user/bookings/coach" element={ <ProtectedRoute allowedRoles={["user"]}> <CoachList /> </ProtectedRoute> } />

        <Route path="/user/bookings/coach/:id" element={ <ProtectedRoute allowedRoles={["user"]}> <CoachDetails /> </ProtectedRoute> } />

        {/* Partner Routes */}
        <Route path="/partner/owner" element={<OwnerForm />} />
        <Route path="/partner/coach" element={<CoachForm />} />

        {/* Owner Dashboard Routes */}
        <Route path="/owner/dashboard" element={
          <ProtectedRoute allowedRoles={["owner"]}>
            <OwnerDashboard />
          </ProtectedRoute>
        } />
        <Route path="/owner/venues" element={
          <ProtectedRoute allowedRoles={["owner"]}>
            <VenueManagement />
          </ProtectedRoute>
        } />
        <Route path="/owner/bookings" element={
          <ProtectedRoute allowedRoles={["owner"]}>
            <BookingRequests />
          </ProtectedRoute>
        } />
        <Route path="/owner/calendar" element={
          <ProtectedRoute allowedRoles={["owner"]}>
            <CalendarManagement />
          </ProtectedRoute>
        } />
        <Route path="/owner/revenue" element={
          <ProtectedRoute allowedRoles={["owner"]}>
            <RevenueTracking />
          </ProtectedRoute>
        } />

        {/* Admin Dashboard Routes */}
        <Route path="/admin/dashboard" element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminDashboard />
          </ProtectedRoute>
        } />
        <Route path="/admin/users" element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminDashboard />
          </ProtectedRoute>
        } />
        <Route path="/admin/venues" element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminDashboard />
          </ProtectedRoute>
        } />
        <Route path="/admin/owners" element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminDashboard />
          </ProtectedRoute>
        } />
        <Route path="/admin/applications" element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminDashboard />
          </ProtectedRoute>
        } />

        {/* Add more protected routes for other roles here */}

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
