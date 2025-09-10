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
  Divider,
  Grid
} from '@mui/material';
import {
  Close as CloseIcon,
  Download as DownloadIcon,
  Receipt as ReceiptIcon,
  SportsTennis as SportsIcon,
  ShoppingCart as ShopIcon,
  CalendarToday as BookingIcon,
  FilterList as FilterIcon
} from '@mui/icons-material';

const TransactionHistoryModal = ({ open, onClose, userId }) => {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('all');
  const [dateRange, setDateRange] = useState('all');

  // Mock transaction data - replace with actual API call
  const mockTransactions = [
    {
      id: 'TXN001',
      type: 'booking',
      description: 'Football Ground Booking',
      amount: 500,
      date: '2024-01-15',
      status: 'completed',
      venue: 'Sports Complex A',
      timeSlot: '10:00 AM - 11:00 AM'
    },
    {
      id: 'TXN002',
      type: 'session',
      description: 'Cricket Coaching Session',
      amount: 800,
      date: '2024-01-14',
      status: 'completed',
      coach: 'John Doe',
      sport: 'Cricket'
    },
    {
      id: 'TXN003',
      type: 'shop',
      description: 'Sports Equipment Purchase',
      amount: 1200,
      date: '2024-01-13',
      status: 'completed',
      items: ['Cricket Bat', 'Tennis Balls']
    },
    {
      id: 'TXN004',
      type: 'booking',
      description: 'Tennis Court Booking',
      amount: 300,
      date: '2024-01-12',
      status: 'pending',
      venue: 'Tennis Club B',
      timeSlot: '6:00 PM - 7:00 PM'
    },
    {
      id: 'TXN005',
      type: 'session',
      description: 'Swimming Coaching',
      amount: 600,
      date: '2024-01-11',
      status: 'completed',
      coach: 'Sarah Wilson',
      sport: 'Swimming'
    }
  ];

  useEffect(() => {
    if (open) {
      fetchTransactions();
    }
  }, [open, userId]);

  useEffect(() => {
    applyFilters();
  }, [transactions, filter, dateRange]);

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      // Replace with actual API call
      // const response = await fetch(`/api/transactions/${userId}`);
      // const data = await response.json();
      
      // Using mock data for now
      setTimeout(() => {
        setTransactions(mockTransactions);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error fetching transactions:', error);
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...transactions];

    // Filter by type
    if (filter !== 'all') {
      filtered = filtered.filter(transaction => transaction.type === filter);
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
        filtered = filtered.filter(transaction => 
          new Date(transaction.date) >= filterDate
        );
      }
    }

    setFilteredTransactions(filtered);
  };

  const getTransactionIcon = (type) => {
    switch (type) {
      case 'booking':
        return <BookingIcon />;
      case 'session':
        return <SportsIcon />;
      case 'shop':
        return <ShopIcon />;
      default:
        return <ReceiptIcon />;
    }
  };

  const getTransactionColor = (type) => {
    switch (type) {
      case 'booking':
        return '#22c55e';
      case 'session':
        return '#3b82f6';
      case 'shop':
        return '#f59e0b';
      default:
        return '#6b7280';
    }
  };

  const exportTransactions = () => {
    const csvContent = [
      ['Transaction ID', 'Type', 'Description', 'Amount (₹)', 'Date', 'Status'],
      ...filteredTransactions.map(transaction => [
        transaction.id,
        transaction.type,
        transaction.description,
        transaction.amount,
        transaction.date,
        transaction.status
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'transaction-history.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const totalAmount = filteredTransactions.reduce((sum, transaction) => sum + transaction.amount, 0);

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
          <ReceiptIcon sx={{ color: '#22c55e' }} />
          Transaction History
        </Box>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ px: 3, py: 0 }}>
        {/* Filters */}
        <Box sx={{ mb: 3 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth size="small">
                <InputLabel>Filter by Type</InputLabel>
                <Select
                  value={filter}
                  label="Filter by Type"
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <MenuItem value="all">All Types</MenuItem>
                  <MenuItem value="booking">Bookings</MenuItem>
                  <MenuItem value="session">Sessions</MenuItem>
                  <MenuItem value="shop">Shop</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
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
            <Grid item xs={12} sm={4}>
              <Button
                variant="outlined"
                startIcon={<DownloadIcon />}
                onClick={exportTransactions}
                fullWidth
                sx={{ textTransform: 'none' }}
              >
                Export CSV
              </Button>
            </Grid>
          </Grid>
        </Box>

        {/* Summary */}
        <Card sx={{ mb: 3, bgcolor: 'grey.50' }}>
          <CardContent sx={{ py: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={6} sm={3}>
                <Typography variant="body2" color="text.secondary">
                  Total Transactions
                </Typography>
                <Typography variant="h6" fontWeight="bold">
                  {filteredTransactions.length}
                </Typography>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Typography variant="body2" color="text.secondary">
                  Total Amount
                </Typography>
                <Typography variant="h6" fontWeight="bold" color="success.main">
                  ₹{totalAmount.toLocaleString()}
                </Typography>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Typography variant="body2" color="text.secondary">
                  Bookings
                </Typography>
                <Typography variant="h6" fontWeight="bold">
                  {filteredTransactions.filter(t => t.type === 'booking').length}
                </Typography>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Typography variant="body2" color="text.secondary">
                  Sessions
                </Typography>
                <Typography variant="h6" fontWeight="bold">
                  {filteredTransactions.filter(t => t.type === 'session').length}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Transactions List */}
        <Box sx={{ maxHeight: '400px', overflowY: 'auto' }}>
          {loading ? (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography>Loading transactions...</Typography>
            </Box>
          ) : filteredTransactions.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 6 }}>
              <ReceiptIcon sx={{ fontSize: 64, color: 'grey.300', mb: 2 }} />
              <Typography variant="body1" color="text.secondary">
                No transactions found
              </Typography>
            </Box>
          ) : (
            <Stack spacing={2}>
              {filteredTransactions.map((transaction) => (
                <Card key={transaction.id} variant="outlined" sx={{ borderRadius: 2 }}>
                  <CardContent sx={{ p: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                      <Avatar sx={{ 
                        bgcolor: getTransactionColor(transaction.type),
                        width: 40,
                        height: 40
                      }}>
                        {getTransactionIcon(transaction.type)}
                      </Avatar>
                      
                      <Box sx={{ flex: 1 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                          <Typography variant="subtitle1" fontWeight="medium">
                            {transaction.description}
                          </Typography>
                          <Typography variant="h6" fontWeight="bold" color="success.main">
                            ₹{transaction.amount.toLocaleString()}
                          </Typography>
                        </Box>
                        
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                          {new Date(transaction.date).toLocaleDateString('en-IN', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </Typography>

                        {/* Transaction specific details */}
                        {transaction.type === 'booking' && (
                          <Box sx={{ mb: 1 }}>
                            <Typography variant="body2" color="text.secondary">
                              Venue: {transaction.venue}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Time: {transaction.timeSlot}
                            </Typography>
                          </Box>
                        )}

                        {transaction.type === 'session' && (
                          <Box sx={{ mb: 1 }}>
                            <Typography variant="body2" color="text.secondary">
                              Coach: {transaction.coach}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Sport: {transaction.sport}
                            </Typography>
                          </Box>
                        )}

                        {transaction.type === 'shop' && transaction.items && (
                          <Box sx={{ mb: 1 }}>
                            <Typography variant="body2" color="text.secondary">
                              Items: {transaction.items.join(', ')}
                            </Typography>
                          </Box>
                        )}

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Chip
                            label={transaction.status}
                            size="small"
                            color={transaction.status === 'completed' ? 'success' : 'warning'}
                            sx={{ textTransform: 'capitalize' }}
                          />
                          <Typography variant="caption" color="text.secondary">
                            ID: {transaction.id}
                          </Typography>
                        </Box>
                      </Box>
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

export default TransactionHistoryModal;