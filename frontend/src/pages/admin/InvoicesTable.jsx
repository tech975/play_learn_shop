import React, { useState, useEffect } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  Chip,
  Box,
  TextField,
  MenuItem,
  Grid,
  Button,
  CircularProgress,
  Tooltip,
  IconButton
} from '@mui/material';
import { 
  Visibility, 
  GetApp, 
  Edit, 
  Delete, 
  Send, 
  Print,
  FilterList,
  TrendingUp,
  CurrencyRupee
} from '@mui/icons-material';
import ActionButtons from '../../components/admin/ActionButtons';

const InvoicesTable = () => {
  const [invoices, setInvoices] = useState([]);
  const [filteredInvoices, setFilteredInvoices] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for invoices
  useEffect(() => {
    const mockInvoices = [
      {
        _id: '1',
        invoiceNumber: 'INV-000001',
        customerName: 'John Doe',
        customerEmail: 'john@example.com',
        amount: 1250.00,
        status: 'paid',
        dueDate: '2024-02-15',
        createdAt: '2024-01-15',
        items: [
          { description: 'Ground Booking', quantity: 2, price: 625.00 }
        ]
      },
      {
        _id: '2',
        invoiceNumber: 'INV-000002',
        customerName: 'Jane Smith',
        customerEmail: 'jane@example.com',
        amount: 800.00,
        status: 'pending',
        dueDate: '2024-02-20',
        createdAt: '2024-01-20',
        items: [
          { description: 'Coaching Session', quantity: 4, price: 200.00 }
        ]
      },
      {
        _id: '3',
        invoiceNumber: 'INV-000003',
        customerName: 'Mike Johnson',
        customerEmail: 'mike@example.com',
        amount: 1500.00,
        status: 'overdue',
        dueDate: '2024-01-30',
        createdAt: '2024-01-10',
        items: [
          { description: 'Monthly Membership', quantity: 1, price: 1500.00 }
        ]
      }
    ];
    
    setInvoices(mockInvoices);
    setFilteredInvoices(mockInvoices);
  }, []);

  useEffect(() => {
    filterInvoices();
  }, [invoices, statusFilter, searchTerm]);

  const filterInvoices = () => {
    let filtered = invoices;

    if (statusFilter !== 'all') {
      filtered = filtered.filter(invoice => invoice.status === statusFilter);
    }

    if (searchTerm) {
      filtered = filtered.filter(invoice =>
        invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        invoice.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        invoice.customerEmail.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredInvoices(filtered);
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const formatCurrency = (amount) => {
    return `₹${amount.toFixed(2)}`;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'paid':
        return 'success';
      case 'pending':
        return 'warning';
      case 'overdue':
        return 'error';
      case 'draft':
        return 'default';
      default:
        return 'default';
    }
  };

  const columns = [
    { id: 'invoiceNumber', label: 'Invoice #', minWidth: 120 },
    { id: 'customerName', label: 'Customer', minWidth: 150 },
    { id: 'customerEmail', label: 'Email', minWidth: 200 },
    { id: 'amount', label: 'Amount', minWidth: 120 },
    { id: 'status', label: 'Status', minWidth: 100 },
    { id: 'dueDate', label: 'Due Date', minWidth: 120 },
    { id: 'createdAt', label: 'Created', minWidth: 120 },
    { id: 'actions', label: 'Actions', minWidth: 150 }
  ];

  return (
    <Box sx={{ width: '100%', px: { xs: 2, sm: 3 }, mt: 2, mb: 4 }}>
      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }} className="invoice-summary-cards">
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ 
            p: 2, 
            background: 'linear-gradient(135deg, #3b82f615 0%, #3b82f605 100%)',
            border: '1px solid #3b82f620'
          }}>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#3b82f6' }}>
                  ₹{(filteredInvoices.reduce((sum, inv) => sum + inv.amount, 0)).toLocaleString()}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Total Revenue
                </Typography>
              </Box>
              <CurrencyRupee sx={{ color: '#3b82f6', fontSize: 32 }} />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ 
            p: 2, 
            background: 'linear-gradient(135deg, #10b98115 0%, #10b98105 100%)',
            border: '1px solid #10b98120'
          }}>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#10b981' }}>
                  {filteredInvoices.filter(inv => inv.status === 'paid').length}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Paid Invoices
                </Typography>
              </Box>
              <TrendingUp sx={{ color: '#10b981', fontSize: 32 }} />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ 
            p: 2, 
            background: 'linear-gradient(135deg, #f59e0b15 0%, #f59e0b05 100%)',
            border: '1px solid #f59e0b20'
          }}>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#f59e0b' }}>
                  {filteredInvoices.filter(inv => inv.status === 'pending').length}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Pending
                </Typography>
              </Box>
              <FilterList sx={{ color: '#f59e0b', fontSize: 32 }} />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ 
            p: 2, 
            background: 'linear-gradient(135deg, #ef444415 0%, #ef444405 100%)',
            border: '1px solid #ef444420'
          }}>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#ef4444' }}>
                  {filteredInvoices.filter(inv => inv.status === 'overdue').length}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Overdue
                </Typography>
              </Box>
              <Typography variant="h4" sx={{ color: '#ef4444' }}>⚠️</Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
      
      {/* Filters */}
      <Paper sx={{ 
        p: 2, 
        mb: 3, 
        background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
        border: '1px solid #e2e8f0'
      }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              label="Search Invoices"
              variant="outlined"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by invoice #, customer..."
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              select
              label="Status Filter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <MenuItem value="all">All Status</MenuItem>
              <MenuItem value="draft">Draft</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="paid">Paid</MenuItem>
              <MenuItem value="overdue">Overdue</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={12} md={5}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
              <Button variant="outlined" startIcon={<GetApp />}>
                Export
              </Button>
              <Button variant="outlined" startIcon={<Print />}>
                Print
              </Button>
              <Button variant="contained" color="primary">
                + New Invoice
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      <Paper sx={{ 
        width: '100%', 
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
        border: '1px solid #e2e8f0'
      }}>
        <TableContainer sx={{ maxHeight: 600 }}>
          <Table stickyHeader aria-label="invoices table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    style={{ 
                      minWidth: column.minWidth, 
                      fontWeight: 'bold',
                      backgroundColor: '#f8fafc',
                      color: '#1f2937'
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={columns.length} align="center" sx={{ py: 4 }}>
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              ) : filteredInvoices.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={columns.length} align="center" sx={{ py: 4 }}>
                    <Typography variant="body1" color="textSecondary">
                      No invoices found
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                filteredInvoices
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((invoice) => (
                    <TableRow hover role="checkbox" tabIndex={-1} key={invoice._id}>
                      <TableCell>
                        <Typography variant="body2" color="primary" sx={{ fontWeight: 'bold' }}>
                          {invoice.invoiceNumber}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {invoice.customerName}
                        </Typography>
                      </TableCell>
                      <TableCell>{invoice.customerEmail}</TableCell>
                      <TableCell>
                        <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#10b981' }}>
                          {formatCurrency(invoice.amount)}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={invoice.status.toUpperCase()}
                          color={getStatusColor(invoice.status)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>{formatDate(invoice.dueDate)}</TableCell>
                      <TableCell>{formatDate(invoice.createdAt)}</TableCell>
                      <TableCell>
                        <ActionButtons
                          onView={() => console.log('View invoice:', invoice._id)}
                          onEdit={() => console.log('Edit invoice:', invoice._id)}
                          onDelete={() => console.log('Delete invoice:', invoice._id)}
                          showEdit={true}
                          showDelete={true}
                        />
                      </TableCell>
                    </TableRow>
                  ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50, 100]}
          component="div"
          count={filteredInvoices.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};

export default InvoicesTable;