import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  People,
  Business,
  SportsBasketball,
  CurrencyRupee,
  TrendingUp,
  Visibility,
  VisibilityOff
} from '@mui/icons-material';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { fetchOwnerRequests } from '../../features/admin/adminSlice';
import { CircularProgress, Alert, IconButton } from '@mui/material';
import { fetchUsers } from '../../features/auth/authSlice';
import { fetchCoaches } from '../../features/coach/coachBookingSlice';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { dashboardStats, statsLoading, error } = useSelector((state) => state.admin);
  const { usersData } = useSelector((state) => state.auth);
  const { coaches, loading } = useSelector((state) => state.coaches);

  const [showRevenue, setShowRevenue] = useState(false);

  useEffect(() => {
    // dispatch(fetchDashboardStats());
    dispatch(fetchOwnerRequests());
    dispatch(fetchUsers());
    dispatch(fetchCoaches());
  }, [dispatch]);

  const chartData = [
    // { name: 'Users', value: dashboardStats.users, color: '#3b82f6' },
    // { name: 'Owners', value: dashboardStats.owners, color: '#10b981' },
    // { name: 'Coaches', value: dashboardStats.coaches, color: '#f59e0b' },
    // { name: 'Revenue', value: dashboardStats.revenue, color: '#8b5cf6' }
  ];

  const monthlyData = [
    { month: 'Jan', users: 120, revenue: 4500 },
    { month: 'Feb', users: 150, revenue: 5200 },
    { month: 'Mar', users: 180, revenue: 6100 },
    { month: 'Apr', users: 220, revenue: 7300 },
    { month: 'May', users: 280, revenue: 8900 },
    { month: 'Jun', users: 320, revenue: 10200 }
  ];

  const pieColors = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'];

  const StatCard = ({ title, value, icon, color, trend, trendValue, isRevenue, onClick }) => (
    <div
      className={`bg-white border shadow rounded-xl p-5 transition-transform duration-300 hover:-translate-y-1 cursor-pointer`}
      style={{
        background: `linear-gradient(135deg, ${color}15 0%, ${color}05 100%)`,
        borderColor: `${color}20`
      }}
      onClick={onClick}
    >
      <div className="flex justify-between items-center mb-4">
        <div
          className="p-3 rounded-xl shadow-md"
          style={{
            background: `linear-gradient(135deg, ${color} 0%, ${color}dd 100%)`
          }}
        >
          {icon}
        </div>

        <div className="flex items-center gap-2">
          {isRevenue && (
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                setShowRevenue(!showRevenue);
              }}
              sx={{
                color: color,
                '&:hover': { backgroundColor: `${color}20` }
              }}
            >
              {showRevenue ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
            </IconButton>
          )}
          {trend && (
            <div className={`flex items-center text-sm font-semibold ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
              <TrendingUp fontSize="small" />
              <span className="ml-1">{trendValue}%</span>
            </div>
          )}
        </div>
      </div>

      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-1">
        {isRevenue
          ? showRevenue
            ? `₹${value?.toLocaleString()}`
            : '₹••••••'
          : value?.toLocaleString()}
      </h2>
      <p className="text-gray-500 font-medium">{title}</p>
    </div>
  );

  if (error) {
    return (
      <div className="w-full px-6 mt-4 mb-4">
        <Alert severity="error" className="mb-4">
          {error}
        </Alert>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col overflow-y-scroll px-4 md:px-6">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 mb-6">
        <StatCard
          title="Total Users"
          value={statsLoading ? 0 : usersData?.length}
          icon={<People sx={{ color: 'white', fontSize: 28 }} />}
          color="#3b82f6"
          trend="up"
          trendValue="12"
          onClick={() => navigate('/admin/users')}
        />
        <StatCard
          title="Total Owners"
          value={statsLoading ? 0 : usersData && usersData?.filter((item) => item?.role === 'owner').length}
          icon={<Business sx={{ color: 'white', fontSize: 28 }} />}
          color="#10b981"
          trend="up"
          trendValue="8"
          onClick={() => navigate('/admin/owners')}
        />
        <StatCard
          title="Total Coaches"
          value={statsLoading ? 0 : coaches?.length}
          icon={<SportsBasketball sx={{ color: 'white', fontSize: 28 }} />}
          color="#f59e0b"
          trend="up"
          trendValue="5"
          onClick={() => navigate('/admin/coaches')}
        />
        <StatCard
          title="Total Revenue"
          value={statsLoading ? 0 : 0}
          icon={<CurrencyRupee sx={{ color: 'white', fontSize: 28 }} />}
          color="#8b5cf6"
          trend="up"
          trendValue="15"
          isRevenue
          onClick={() => navigate('/admin/invoices')}
        />
      </div>

      {/* Charts */}
      <div className="flex flex-col gap-6">
        {/* Line Chart */}
        <div className="bg-white border rounded-xl p-4 shadow-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Monthly Growth Trends</h3>
          {statsLoading ? (
            <div className="flex justify-center items-center h-72">
              <CircularProgress />
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="users"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#8b5cf6"
                  strokeWidth={3}
                  dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Pie Chart */}
        <div className="bg-white border rounded-xl p-4 shadow-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Platform Distribution</h3>
          {statsLoading ? (
            <div className="flex justify-center items-center h-64">
              <CircularProgress />
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {chartData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          )}

          {/* Legend */}
          <div className="mt-4">
            {chartData.map((item, index) => (
              <div key={item.name} className="flex items-center mb-2 text-sm text-gray-600">
                <div
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: pieColors[index] }}
                />
                {item.name}: {item.value}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
