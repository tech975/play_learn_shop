import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/public/Home';
import Login from '../pages/public/Login';
import Register from '../pages/public/Register';
import UserLayout from '../layout/UserLayout';
import ProtectedRoute from './ProtectedRoute';
import UserDashboard from '../pages/user/UserDashboard';
import MyBookings from '../pages/user/MyBookings';
import NotFound from '../pages/NotFound';

const AppRoutes = () => {
    const loginUser = JSON.parse(localStorage.getItem("user"));

    return (
        <Router>
            <Routes>
                <Route path='/' element={ <Home /> } />
                <Route path='/login' element={ <Login /> } />
                <Route path='/register' element={ <Register /> } />

                <Route path='*' element={ <NotFound /> } />

                {loginUser && <Route path={`/${loginUser?.role + '/dashboard'}`} element={<ProtectedRoute allowedRoles={["user"]}><UserLayout /></ProtectedRoute> } >
                    {/* <Route index element={ <Home /> } /> */}
                    <Route index element={ <UserDashboard /> } />
                    <Route path="bookings" element={<MyBookings />} />
                </Route>}
            </Routes>
        </Router>
    )
}

export default AppRoutes;