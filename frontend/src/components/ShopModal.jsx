import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  Avatar,
  Stack,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  IconButton,
  Grid,
  Rating
} from '@mui/material';
import {
  Close as CloseIcon,
  ShoppingCart as ShopIcon,
  LocalShipping as ShippingIcon,
  CheckCircle as DeliveredIcon,
  Pending as PendingIcon,
  Cancel as CancelledIcon
} from '@mui/icons-material';

const ShopModal = ({ open, onClose, userId }) => {
  const [purchases, setPurchases] = useState([]);
  const [filteredPurchases, setFilteredPurchases] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('all');
  const [dateRange, setDateRange] = useState('all');

  // Mock purchase data - replace with actual API call
  const mockPurchases = [
    {
      id: 'ORD001',
      orderDate: '2024-01-15',
      status: 'delivered',
      totalAmount: 2500,
      items: [
        {
          name: 'Professional Cricket Bat',
          brand: 'MRF',
          price: 1500,
          quantity: 1,
          image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=100&h=100&fit=crop'
        },
        {
          name: 'Cricket Ball Set (6 balls)',
          brand: 'SG',
          price: 1000,
          quantity: 1,
          image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=100&h=100&fit=crop'
        }
      ],
      shippingAddress: '123 Sports Street, Mumbai, Maharashtra',
      trackingNumber: 'TRK123456789'
    },
    {
      id: 'ORD002',
      orderDate: '2024-01-10',
      status: 'shipped',
      totalAmount: 800,
      items: [
        {
          name: 'Badminton Racket',
          brand: 'Yonex',
          price: 600,
          quantity: 1,
          image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=100&h=100&fit=crop'
        },
        {
          name: 'Shuttlecock Set',
          brand: 'Victor',
          price: 200,
          quantity: 1,
          image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=100&h=100&fit=crop'
        }
      ],
      shippingAddress: '456 Game Avenue, Delhi, Delhi',
      trackingNumber: 'TRK987654321'
    },
    {
      id: 'ORD003',
      orderDate: '2024-01-05',
      status: 'processing',
      totalAmount: 1200,
      items: [
        {
          name: 'Football',
          brand: 'Nike',
          price: 800,
          quantity: 1,
          image: 'https://images.unsplash.com/photo-1486286701208-1d58e9338013?w=100&h=100&fit=crop'
        },
        {
          name: 'Football Boots',
          brand: 'Adidas',
          price: 400,
          quantity: 1,
          image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=100&h=100&fit=crop'
        }
      ],
      shippingAddress: '789 Victory Lane, Bangalore, Karnataka',
      trackingNumber: 'TRK456789123'
    },
    {
      id: 'ORD004',
      orderDate: '2023-12-28',
      status: 'cancelled',
      totalAmount: 600,
      items: [
        {
          name: 'Tennis Racket',
          brand: 'Wilson',
          price: 600,
          quantity: 1,
          image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=100&h=100&fit=crop'
        }
      ],
      shippingAddress: '321 Court Road, Chennai, Tamil Nadu',
      trackingNumber: null
    }
  ];

  useEffect(() => {
    if (open) {
      fetchPurchases();
    }
  }, [open, userId]);

  useEffect(() => {
    applyFilters();
  }, [purchases, filter, dateRange]);

  const fetchPurchases = async () => {
    setLoading(true);
    try {
      // Replace with actual API call
      // const response = await fetch(`/api/shop/orders/${userId}`);
      // const data = await response.json();
      
      // Using mock data for now
      setTimeout(() => {
        setPurchases(mockPurchases);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error fetching purchases:', error);
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...purchases];

    // Filter by status
    if (filter !== 'all') {
      filtered = filtered.filter(purchase => purchase.status === filter);
    }

    // Filter by date range
    if (dateRange !== 'all') {
      const now = new Date();
      const filterDate = new Date();
      
      switch (dateRange) {
        case 'week':
          filterDate.setDate(now.getDate() - 7);
          break;
        case 'month':
          filterDate.setMonth(now.getMonth() - 1);
          break;
        case '3months':
          filterDate.setMonth(now.getMonth() - 3);
          break;
        default:
          filterDate = null;
      }

      if (filterDate) {
        filtered = filtered.filter(purchase => 
          new Date(purchase.orderDate) >= filterDate
        );
      }
    }

    setFilteredPurchases(filtered);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered':
        return <DeliveredIcon sx={{ color: '#22c55e' }} />;
      case 'shipped':
        return <ShippingIcon sx={{ color: '#3b82f6' }} />;
      case 'processing':
        return <PendingIcon sx={{ color: '#f59e0b' }} />;
      case 'cancelled':
        return <CancelledIcon sx={{ color: '#ef4444' }} />;
      default:
        return <PendingIcon sx={{ color: '#6b7280' }} />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered':
        return 'success';
      case 'shipped':
        return 'info';
      case 'processing':
        return 'warning';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  const totalSpent = filteredPurchases.reduce((sum, purchase) => sum + purchase.totalAmount, 0);
  const totalItems = filteredPurchases.reduce((sum, purchase) => 
    sum + purchase.items.reduce((itemSum, item) => itemSum + item.quantity, 0), 0
  );

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 3, maxHeight: '90vh' }
      }}
    >
      <DialogTitle sx={{
        fontWeight: 'bold',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        pb: 2
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <ShopIcon sx={{ color: '#f59e0b' }} />
          My Purchases
        </Box>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ px: 3, py: 0 }}>
        {/* Filters */}
        <Box sx={{ mb: 3 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth size="small">
                <InputLabel>Filter by Status</InputLabel>
                <Select
                  value={filter}
                  label="Filter by Status"
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <MenuItem value="all">All Orders</MenuItem>
                  <MenuItem value="delivered">Delivered</MenuItem>
                  <MenuItem value="shipped">Shipped</MenuItem>
                  <MenuItem value="processing">Processing</MenuItem>
                  <MenuItem value="cancelled">Cancelled</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth size="small">
                <InputLabel>Date Range</InputLabel>
                <Select
                  value={dateRange}
                  label="Date Range"
                  onChange={(e) => setDateRange(e.target.value)}
                >
                  <MenuItem value="all">All Time</MenuItem>
                  <MenuItem value="week">Last Week</MenuItem>
                  <MenuItem value="month">Last Month</MenuItem>
                  <MenuItem value="3months">Last 3 Months</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Box>

        {/* Summary */}
        <Card sx={{ mb: 3, bgcolor: 'grey.50' }}>
          <CardContent sx={{ py: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Typography variant="body2" color="text.secondary">
                  Total Orders
                </Typography>
                <Typography variant="h6" fontWeight="bold">
                  {filteredPurchases.length}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="body2" color="text.secondary">
                  Total Spent
                </Typography>
                <Typography variant="h6" fontWeight="bold" color="success.main">
                  ₹{totalSpent.toLocaleString()}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="body2" color="text.secondary">
                  Items Purchased
                </Typography>
                <Typography variant="h6" fontWeight="bold">
                  {totalItems}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Orders List */}
        <Box sx={{ maxHeight: '400px', overflowY: 'auto' }}>
          {loading ? (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography>Loading purchases...</Typography>
            </Box>
          ) : filteredPurchases.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 6 }}>
              <ShopIcon sx={{ fontSize: 64, color: 'grey.300', mb: 2 }} />
              <Typography variant="body1" color="text.secondary">
                No purchases found
              </Typography>
            </Box>
          ) : (
            <Stack spacing={3}>
              {filteredPurchases.map((purchase) => (
                <Card key={purchase.id} variant="outlined" sx={{ borderRadius: 2 }}>
                  <CardContent sx={{ p: 3 }}>
                    {/* Order Header */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                      <Box>
                        <Typography variant="h6" fontWeight="bold" sx={{ mb: 0.5 }}>
                          Order #{purchase.id}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Ordered on {new Date(purchase.orderDate).toLocaleDateString('en-IN', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </Typography>
                      </Box>
                      <Box sx={{ textAlign: 'right' }}>
                        <Chip
                          icon={getStatusIcon(purchase.status)}
                          label={purchase.status.charAt(0).toUpperCase() + purchase.status.slice(1)}
                          color={getStatusColor(purchase.status)}
                          sx={{ mb: 1 }}
                        />
                        <Typography variant="h6" fontWeight="bold" color="success.main">
                          ₹{purchase.totalAmount.toLocaleString()}
                        </Typography>
                      </Box>
                    </Box>

                    {/* Items */}
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="subtitle2" fontWeight="bold" sx={{ mb: 1 }}>
                        Items:
                      </Typography>
                      <Stack spacing={1}>
                        {purchase.items.map((item, index) => (
                          <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Avatar
                              src={item.image}
                              variant="rounded"
                              sx={{ width: 50, height: 50 }}
                            />
                            <Box sx={{ flex: 1 }}>
                              <Typography variant="body2" fontWeight="medium">
                                {item.name}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                {item.brand} • Qty: {item.quantity}
                              </Typography>
                            </Box>
                            <Typography variant="body2" fontWeight="bold">
                              ₹{item.price.toLocaleString()}
                            </Typography>
                          </Box>
                        ))}
                      </Stack>
                    </Box>

                    {/* Shipping Info */}
                    <Box sx={{ bgcolor: 'grey.50', p: 2, borderRadius: 1 }}>
                      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
                        Shipping Address:
                      </Typography>
                      <Typography variant="body2">
                        {purchase.shippingAddress}
                      </Typography>
                      {purchase.trackingNumber && (
                        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5 }}>
                          Tracking: {purchase.trackingNumber}
                        </Typography>
                      )}
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          )}
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 2 }}>
        <Button onClick={onClose} variant="outlined" sx={{ textTransform: 'none' }}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ShopModal;