import React, { useState, useMemo } from 'react';
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
  InputAdornment,
} from '@mui/material';
import { Check, Close, Search, FilterList } from '@mui/icons-material';
import { getAllOwnerVenues, updateOwnerRequestStatus } from '../../features/admin/adminSlice';
import ActionButtons from '../../components/admin/ActionButtons';
import { useEffect } from 'react';
import { fetchUsers } from '../../features/auth/authSlice';
// import { fetchVenues } from '../../features/venues/venueSlice';

// Utility Functions
const formatDate = (dateString) => new Date(dateString).toLocaleDateString();

const getStatusColor = (status) => {
  switch (status) {
    case 'approved': return 'success';
    case 'rejected': return 'error';
    case 'pending': return 'warning';
    default: return 'default';
  }
};

const columns = [
  { id: 'ownerName', label: 'Owner Name', minWidth: 150 },
  { id: 'email', label: 'Email', minWidth: 200 },
  { id: 'phone', label: 'Phone', minWidth: 130 },
  { id: 'groundName', label: 'Ground Name', minWidth: 150 },
  { id: 'address', label: 'Address', minWidth: 200 },
  { id: 'status', label: 'Status', minWidth: 120 },
  { id: 'actions', label: 'Actions', minWidth: 200 },
];

const OwnersTable = () => {
  const dispatch = useDispatch();
  const { allOwnerVenues, error, ownersLoading } = useSelector((state) => state.admin);
  const { usersData } = useSelector((state) => state.auth);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOwner, setSelectedOwner] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const ownerIds = useMemo(() => {
    return usersData && usersData?.filter((item) => item?.role === 'owner').map((o) => o._id);
  }, [usersData]);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    if (ownerIds?.length) {
      dispatch(getAllOwnerVenues(ownerIds));
    }
  }, [ownerIds, dispatch]);

  // Filter logic with useMemo
  const filteredOwners = useMemo(() => {
    let filtered = allOwnerVenues || [];
    if (statusFilter !== 'all') {
      filtered = filtered.filter((o) => o.status === statusFilter);
    }
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (o) =>
          o.user?.name?.toLowerCase().includes(term) ||
          o.user?.email?.toLowerCase().includes(term) ||
          o.groundName?.toLowerCase().includes(term) ||
          o.groundAddress?.toLowerCase().includes(term)
      );
    }
    return filtered;
  }, [allOwnerVenues, statusFilter, searchTerm]);

  const handleStatusUpdate = async (requestId, newStatus) => {
    try {
      await dispatch(updateOwnerRequestStatus({ requestId, status: newStatus })).unwrap();
      setDialogOpen(false);
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  if (error) {
    return (
      <Box sx={{ width: '100%', px: { xs: 2, sm: 3 }, mt: 4, mb: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%', px: { xs: 2, sm: 3 }, mt: 2, mb: 4 }}>
      {/* Filters */}
      <Paper sx={{ p: 3, mb: 3, borderRadius: 2, border: '1px solid #e2e8f0', background: 'linear-gradient(135deg, #fff 0%, #f8fafc 100%)' }}>
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
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
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
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
            >
              <MenuItem value="all">All Status</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="approved">Approved</MenuItem>
              <MenuItem value="rejected">Rejected</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box display="flex" justifyContent="flex-end" gap={1}>
              <Chip label={`Total: ${filteredOwners.length}`} color="primary" variant="outlined" />
              <Chip
                label={`Pending: ${filteredOwners.filter((o) => o.status === 'pending').length}`}
                color="warning"
                variant="outlined"
              />
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Table */}
      <Paper sx={{ width: '100%', overflow: 'hidden', borderRadius: 2, border: '1px solid #e2e8f0' }}>
        <TableContainer sx={{ maxHeight: 540 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow sx={{ '& .MuiTableCell-head': { backgroundColor: '#f8fafc', fontWeight: 600, color: '#374151' } }}>
                {columns.map((col) => (
                  <TableCell key={col.id} style={{ minWidth: col.minWidth }}>{col.label}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {ownersLoading ? (
                <TableRow>
                  <TableCell colSpan={columns.length} align="center"><CircularProgress /></TableCell>
                </TableRow>
              ) : filteredOwners.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={columns.length} align="center">
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
                  .map((o) => (
                    <TableRow key={o._id} hover sx={{ '&:hover': { backgroundColor: '#f8fafc' } }}>
                      <TableCell sx={{ fontWeight: 500 }}>{o?.name || 'N/A'}</TableCell>
                      <TableCell>{o?.email || 'N/A'}</TableCell>
                      <TableCell>{o?.phone || 'N/A'}</TableCell>
                      <TableCell sx={{ fontWeight: 500 }}>{o?.groundName || 'N/A'}</TableCell>
                      <TableCell sx={{ maxWidth: 200 }}>
                        <Typography noWrap variant="body2">{o?.groundAddress || o?.location}</Typography>
                      </TableCell>
                      <TableCell>
                        <Chip label={o?.status.toUpperCase()} color={getStatusColor(o.status)} size="small" sx={{ fontWeight: 600, minWidth: 80 }} />
                      </TableCell>
                      <TableCell>
                        <ActionButtons
                          onView={() => { setSelectedOwner(o); setDialogOpen(true); }}
                          onAccept={() => handleStatusUpdate(o._id, 'approved')}
                          onReject={() => handleStatusUpdate(o._id, 'rejected')}
                          showAcceptReject={o.status === 'pending'}
                          disabled={ownersLoading}
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
          onPageChange={(_, newPage) => setPage(newPage)}
          onRowsPerPageChange={(e) => { setRowsPerPage(parseInt(e.target.value, 10)); setPage(0); }}
          sx={{ borderTop: '1px solid #e2e8f0', backgroundColor: '#f8fafc' }}
        />
      </Paper>

      {/* Owner Details Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Owner Request Details</DialogTitle>
        <DialogContent>
          {selectedOwner && (
            <Box sx={{ pt: 2 }}>
              <Grid container spacing={2}>
                {[
                  { label: 'Owner Name', value: selectedOwner?.name },
                  { label: 'Email', value: selectedOwner?.email },
                  { label: 'Phone', value: selectedOwner?.phone },
                  { label: 'Ground Name', value: selectedOwner.groundName },
                  { label: 'Ground Address', value: selectedOwner.groundAddress },
                  { label: 'Status', value: <Chip label={selectedOwner.status} color={getStatusColor(selectedOwner.status)} size="small" /> },
                  { label: 'Applied Date', value: formatDate(selectedOwner.createdAt) },
                ].map((item, idx) => (
                  <Grid item xs={12} sm={6} key={idx}>
                    <Typography variant="subtitle2" color="textSecondary">{item.label}</Typography>
                    <Typography variant="body1" gutterBottom>{item.value || 'N/A'}</Typography>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          {selectedOwner?.status === 'pending' && (
            <>
              <Button variant="contained" color="success" startIcon={<Check />} onClick={() => handleStatusUpdate(selectedOwner._id, 'approved')}>
                Accept
              </Button>
              <Button variant="contained" color="error" startIcon={<Close />} onClick={() => handleStatusUpdate(selectedOwner._id, 'rejected')}>
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
