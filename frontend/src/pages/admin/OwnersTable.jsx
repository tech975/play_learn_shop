import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
  Container,
  Chip,
  Button,
  Box,
  TextField,
  MenuItem,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Alert,
  InputAdornment
} from '@mui/material';
import { Check, Close, Visibility, Search, FilterList } from '@mui/icons-material';
import { fetchOwnerRequests, updateOwnerRequestStatus } from '../../features/admin/adminSlice';
import ActionButtons from '../../components/admin/ActionButtons';

const OwnersTable = () => {
  const dispatch = useDispatch();
  const { ownerRequests, ownersLoading, loading, error } = useSelector((state) => state.admin);
  const [filteredOwners, setFilteredOwners] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOwner, setSelectedOwner] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchOwnerRequests());
  }, [dispatch]);

  useEffect(() => {
    filterOwners();
  }, [ownerRequests, statusFilter, searchTerm]);

  const filterOwners = () => {
    let filtered = ownerRequests || [];

    if (statusFilter !== 'all') {
      filtered = filtered.filter(owner => owner.status === statusFilter);
    }

    if (searchTerm) {
      filtered = filtered.filter(owner =>
        owner.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        owner.user?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        owner.groundName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        owner.groundAddress?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredOwners(filtered);
    setPage(0);
  };

  const handleStatusUpdate = async (requestId, newStatus) => {
    try {
      await dispatch(updateOwnerRequestStatus({ requestId, status: newStatus })).unwrap();
      setDialogOpen(false);
    } catch (error) {
      console.error('Error updating status:', error);
    }
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

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return 'success';
      case 'rejected':
        return 'error';
      case 'pending':
        return 'warning';
      default:
        return 'default';
    }
  };

  const handleViewDetails = (owner) => {
    setSelectedOwner(owner);
    setDialogOpen(true);
  };

  const columns = [
    { id: 'ownerName', label: 'Owner Name', minWidth: 150 },
    { id: 'email', label: 'Email', minWidth: 200 },
    { id: 'phone', label: 'Phone', minWidth: 130 },
    { id: 'groundName', label: 'Ground Name', minWidth: 150 },
    { id: 'address', label: 'Address', minWidth: 200 },
    { id: 'status', label: 'Status', minWidth: 120 },
    { id: 'actions', label: 'Actions', minWidth: 200 }
  ];

  if (error) {
    return (
      <Box sx={{ width: '100%', px: { xs: 2, sm: 3 }, mt: 4, mb: 4 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%', px: { xs: 2, sm: 3 }, mt: 2, mb: 4 }}>
      {/* Filters */}
      <Paper 
        sx={{ 
          p: 3, 
          mb: 3,
          borderRadius: 2,
          border: '1px solid #e2e8f0',
          background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)'
        }}
      >
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} sm={6} md={5}>
            <TextField
              fullWidth
              placeholder="Search by name, email, ground name, or address..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search color="action" />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                }
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              select
              label="Status Filter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FilterList color="action" />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                }
              }}
            >
              <MenuItem value="all">All Status</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="approved">Approved</MenuItem>
              <MenuItem value="rejected">Rejected</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box display="flex" justifyContent="flex-end" gap={1}>
              <Chip 
                label={`Total: ${filteredOwners.length}`} 
                color="primary" 
                variant="outlined"
              />
              <Chip 
                label={`Pending: ${filteredOwners.filter(o => o.status === 'pending').length}`} 
                color="warning" 
                variant="outlined"
              />
            </Box>
          </Grid>
        </Grid>
      </Paper>

      <Paper 
        sx={{ 
          width: '100%', 
          overflow: 'hidden',
          borderRadius: 2,
          border: '1px solid #e2e8f0'
        }}
      >
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="owners table">
            <TableHead>
              <TableRow sx={{ '& .MuiTableCell-head': { backgroundColor: '#f8fafc' } }}>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    style={{ 
                      minWidth: column.minWidth, 
                      fontWeight: 600,
                      color: '#374151'
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {ownersLoading ? (
                <TableRow>
                  <TableCell colSpan={columns.length} align="center" sx={{ py: 4 }}>
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              ) : filteredOwners.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={columns.length} align="center" sx={{ py: 4 }}>
                    <Typography color="textSecondary">
                      {searchTerm || statusFilter !== 'all' 
                        ? 'No owner applications found matching your criteria' 
                        : 'No owner applications found'}
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                filteredOwners
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((owner) => (
                    <TableRow 
                      hover 
                      role="checkbox" 
                      tabIndex={-1} 
                      key={owner._id}
                      sx={{ 
                        '&:hover': { 
                          backgroundColor: '#f8fafc' 
                        }
                      }}
                    >
                      <TableCell sx={{ fontWeight: 500 }}>
                        {owner.user?.name || 'N/A'}
                      </TableCell>
                      <TableCell>{owner.user?.email || 'N/A'}</TableCell>
                      <TableCell>{owner.user?.phone || 'N/A'}</TableCell>
                      <TableCell sx={{ fontWeight: 500 }}>
                        {owner.groundName || 'N/A'}
                      </TableCell>
                      <TableCell sx={{ maxWidth: 200 }}>
                        <Typography variant="body2" noWrap>
                          {owner.groundAddress}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={owner.status.toUpperCase()}
                          color={getStatusColor(owner.status)}
                          size="small"
                          sx={{ 
                            fontWeight: 600,
                            minWidth: 80
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <ActionButtons
                          onView={() => handleViewDetails(owner)}
                          onAccept={() => handleStatusUpdate(owner._id, 'approved')}
                          onReject={() => handleStatusUpdate(owner._id, 'rejected')}
                          showAcceptReject={owner.status === 'pending'}
                          disabled={loading}
                        />
                      </TableCell>
                    </TableRow>
                  ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={filteredOwners.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{
            borderTop: '1px solid #e2e8f0',
            backgroundColor: '#f8fafc'
          }}
        />
      </Paper>

      {/* Owner Details Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Owner Request Details</DialogTitle>
        <DialogContent>
          {selectedOwner && (
            <Box sx={{ pt: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Owner Name
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {selectedOwner.user?.name || 'N/A'}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Email
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {selectedOwner.user?.email || 'N/A'}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Phone
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {selectedOwner.user?.phone || 'N/A'}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Ground Name
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {selectedOwner.groundName || 'N/A'}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Ground Address
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {selectedOwner.groundAddress}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Status
                  </Typography>
                  <Chip
                    label={selectedOwner.status}
                    color={getStatusColor(selectedOwner.status)}
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Applied Date
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {formatDate(selectedOwner.createdAt)}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          {selectedOwner?.status === 'pending' && (
            <>
              <Button
                variant="contained"
                color="success"
                startIcon={<Check />}
                onClick={() => handleStatusUpdate(selectedOwner._id, 'approved')}
              >
                Accept
              </Button>
              <Button
                variant="contained"
                color="error"
                startIcon={<Close />}
                onClick={() => handleStatusUpdate(selectedOwner._id, 'rejected')}
              >
                Reject
              </Button>
            </>
          )}
          <Button onClick={() => setDialogOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default OwnersTable;