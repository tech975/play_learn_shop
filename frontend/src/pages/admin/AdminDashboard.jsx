import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Paper,
  CircularProgress,
  Alert,
  IconButton
} from '@mui/material';
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
import { fetchDashboardStats } from '../../features/admin/adminSlice';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { dashboardStats, statsLoading, error } = useSelector((state) => state.admin);
  const [showRevenue, setShowRevenue] = useState(false);

  useEffect(() => {
    dispatch(fetchDashboardStats());
  }, [dispatch]);

  const chartData = [
    { name: 'Users', value: dashboardStats.users, color: '#3b82f6' },
    { name: 'Owners', value: dashboardStats.owners, color: '#10b981' },
    { name: 'Coaches', value: dashboardStats.coaches, color: '#f59e0b' },
    { name: 'Revenue', value: dashboardStats.revenue, color: '#8b5cf6' }
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
    <Card 
      sx={{ 
        height: '100%',
        background: `linear-gradient(135deg, ${color}15 0%, ${color}05 100%)`,
        border: `1px solid ${color}20`,
        transition: 'all 0.3s ease',
        cursor: onClick ? 'pointer' : 'default',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: `0 8px 25px ${color}25`
        }
      }}
      onClick={onClick}
    >
      <CardContent sx={{ p: 3 }}>
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
          <Box
            sx={{
              background: `linear-gradient(135deg, ${color} 0%, ${color}dd 100%)`,
              borderRadius: '12px',
              p: 1.5,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: `0 4px 12px ${color}40`
            }}
          >
            {icon}
          </Box>
          <Box display="flex" alignItems="center" gap={1}>
            {isRevenue && (
              <IconButton
                size="small"
                onClick={() => setShowRevenue(!showRevenue)}
                sx={{ 
                  color: color,
                  '&:hover': { backgroundColor: `${color}20` }
                }}
              >
                {showRevenue ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
              </IconButton>
            )}
            {trend && (
              <Box display="flex" alignItems="center" sx={{ color: trend === 'up' ? '#10b981' : '#ef4444' }}>
                <TrendingUp fontSize="small" />
                <Typography variant="caption" sx={{ ml: 0.5, fontWeight: 600 }}>
                  {trendValue}%
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
        
        <Typography 
          variant="h3" 
          component="h2" 
          sx={{ 
            fontWeight: 700, 
            color: '#1f2937',
            mb: 1,
            fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' }
          }}
        >
          {isRevenue 
            ? (showRevenue ? `₹${value.toLocaleString()}` : '₹••••••')
            : value.toLocaleString()}
        </Typography>
        
        <Typography 
          color="textSecondary" 
          variant="body2"
          sx={{ fontWeight: 500 }}
        >
          {title}
        </Typography>
      </CardContent>
    </Card>
  );

  if (error) {
    return (
      <Box sx={{ width: '100%', px: 3, mt: 4, mb: 4 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%', px: { xs: 0.5, sm: 1 }, mt: 2, mb: 4 }} className="admin-dashboard-container">
      {/* Stats Cards */}
      <Grid container spacing={{ xs: 0.5, sm: 1 }} sx={{ mb: 4 }} className="admin-dashboard-grid">
        <Grid item xs={12} sm={6} lg={3}>
          <StatCard
            title="Total Users"
            value={statsLoading ? 0 : dashboardStats.users}
            icon={<People sx={{ color: 'white', fontSize: 28 }} />}
            color="#3b82f6"
            trend="up"
            trendValue="12"
            onClick={() => navigate('/admin/users')}
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <StatCard
            title="Owner Requests"
            value={statsLoading ? 0 : dashboardStats.owners}
            icon={<Business sx={{ color: 'white', fontSize: 28 }} />}
            color="#10b981"
            trend="up"
            trendValue="8"
            onClick={() => navigate('/admin/owners')}
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <StatCard
            title="Total Coaches"
            value={statsLoading ? 0 : dashboardStats.coaches}
            icon={<SportsBasketball sx={{ color: 'white', fontSize: 28 }} />}
            color="#f59e0b"
            trend="up"
            trendValue="5"
            onClick={() => navigate('/admin/coaches')}
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <StatCard
            title="Total Revenue"
            value={statsLoading ? 0 : dashboardStats.revenue}
            icon={<CurrencyRupee sx={{ color: 'white', fontSize: 28 }} />}
            color="#8b5cf6"
            trend="up"
            trendValue="15"
            isRevenue={true}
            onClick={() => navigate('/admin/invoices')}
          />
        </Grid>
      </Grid>

      {/* Charts Section */}
      <Grid container spacing={{ xs: 0.5, sm: 1 }} className="admin-charts-grid">
        {/* Line Chart */}
        <Grid item xs={12} lg={8}>
          <Paper 
            sx={{ 
              p: { xs: 2, sm: 3 },
              background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
              border: '1px solid #e2e8f0',
              borderRadius: 2,
              width: '100%'
            }}
          >
            <Typography 
              variant="h6" 
              gutterBottom 
              sx={{ fontWeight: 600, color: '#1f2937', mb: 3 }}
            >
              Monthly Growth Trends
            </Typography>
            {statsLoading ? (
              <Box display="flex" justifyContent="center" alignItems="center" height={300}>
                <CircularProgress />
              </Box>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis 
                    dataKey="month" 
                    stroke="#64748b"
                    fontSize={12}
                  />
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
          </Paper>
        </Grid>

        {/* Pie Chart */}
        <Grid item xs={12} lg={4}>
          <Paper 
            sx={{ 
              p: { xs: 2, sm: 3 },
              background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
              border: '1px solid #e2e8f0',
              borderRadius: 2,
              height: '100%',
              width: '100%'
            }}
          >
            <Typography 
              variant="h6" 
              gutterBottom 
              sx={{ fontWeight: 600, color: '#1f2937', mb: 3 }}
            >
              Platform Distribution
            </Typography>
            {statsLoading ? (
              <Box display="flex" justifyContent="center" alignItems="center" height={250}>
                <CircularProgress />
              </Box>
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
            <Box mt={2}>
              {chartData.map((item, index) => (
                <Box key={item.name} display="flex" alignItems="center" mb={1}>
                  <Box
                    sx={{
                      width: 12,
                      height: 12,
                      borderRadius: '50%',
                      backgroundColor: pieColors[index],
                      mr: 1
                    }}
                  />
                  <Typography variant="body2" color="textSecondary">
                    {item.name}: {item.value}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminDashboard;