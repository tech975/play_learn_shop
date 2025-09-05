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
  Avatar,
  Box,
  Button,
  TextField,
  MenuItem,
  Grid,
  CircularProgress
} from '@mui/material';
import { Edit, Delete, Visibility } from '@mui/icons-material';
import ActionButtons from '../../components/admin/ActionButtons';

const CoachesTable = () => {
  const [coaches, setCoaches] = useState([]);
  const [filteredCoaches, setFilteredCoaches] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for coaches
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const mockCoaches = [
        {
          _id: '1',
          name: 'John Doe',
          email: 'john@example.com',
          phone: '+91 9876543210',
          specialization: 'Basketball',
          experience: '5 years',
          status: 'active',
          rating: 4.8,
          totalSessions: 150,
          createdAt: new Date().toISOString()
        },
        {
          _id: '2',
          name: 'Jane Smith',
          email: 'jane@example.com',
          phone: '+91 9876543211',
          specialization: 'Football',
          experience: '3 years',
          status: 'active',
          rating: 4.6,
          totalSessions: 89,
          createdAt: new Date().toISOString()
        },
        {
          _id: '3',
          name: 'Mike Johnson',
          email: 'mike@example.com',
          phone: '+91 9876543212',
          specialization: 'Tennis',
          experience: '7 years',
          status: 'inactive',
          rating: 4.9,
          totalSessions: 245,
          createdAt: new Date().toISOString()
        }
      ];
      setCoaches(mockCoaches);
      setFilteredCoaches(mockCoaches);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    filterCoaches();
  }, [coaches, statusFilter, searchTerm]);

  const filterCoaches = () => {
    let filtered = coaches;

    if (statusFilter !== 'all') {
      filtered = filtered.filter(coach => coach.status === statusFilter);
    }

    if (searchTerm) {
      filtered = filtered.filter(coach =>
        coach.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        coach.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        coach.specialization.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredCoaches(filtered);
    setPage(0);
  };

  const handleChangePage = (_, newPage) => {
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
      case 'active':
        return 'success';
      case 'inactive':
        return 'default';
      case 'suspended':
        return 'error';
      default:
        return 'default';
    }
  };

  const columns = [
    { id: 'avatar', label: 'Avatar', minWidth: 80 },
    { id: 'name', label: 'Name', minWidth: 150 },
    { id: 'email', label: 'Email', minWidth: 200 },
    { id: 'phone', label: 'Phone', minWidth: 130 },
    { id: 'specialization', label: 'Specialization', minWidth: 150 },
    { id: 'experience', label: 'Experience', minWidth: 120 },
    { id: 'rating', label: 'Rating', minWidth: 100 },
    { id: 'sessions', label: 'Sessions', minWidth: 100 },
    { id: 'status', label: 'Status', minWidth: 100 },
    { id: 'createdAt', label: 'Joined', minWidth: 120 },
    { id: 'actions', label: 'Actions', minWidth: 150 }
  ];

  return (
    <Box sx={{ width: '100%', px: { xs: 2, sm: 3 }, mt: 2, mb: 4 }}>
      {/* Filters */}
      <Paper sx={{ p: 2, mb: 3, background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)' }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              label="Search Coaches"
              variant="outlined"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name, email, specialization..."
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
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="inactive">Inactive</MenuItem>
              <MenuItem value="suspended">Suspended</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={12} md={5}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
              <Button variant="outlined" color="primary">
                Export Data
              </Button>
              <Button variant="contained" color="primary">
                + Add Coach
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
          <Table stickyHeader aria-label="coaches table">
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
              ) : filteredCoaches.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={columns.length} align="center" sx={{ py: 4 }}>
                    <Typography variant="body1" color="textSecondary">
                      No coaches found
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                filteredCoaches
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((coach) => (
                    <TableRow hover role="checkbox" tabIndex={-1} key={coach._id}>
                      <TableCell>
                        <Avatar
                          src={coach.profilePic}
                          alt={coach.name}
                          sx={{ 
                            width: 40, 
                            height: 40,
                            background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)'
                          }}
                        >
                          {coach.name?.charAt(0)?.toUpperCase()}
                        </Avatar>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {coach.name}
                        </Typography>
                      </TableCell>
                      <TableCell>{coach.email}</TableCell>
                      <TableCell>{coach.phone}</TableCell>
                      <TableCell>
                        <Chip
                          label={coach.specialization}
                          variant="outlined"
                          size="small"
                          sx={{ fontWeight: 500 }}
                        />
                      </TableCell>
                      <TableCell>{coach.experience}</TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            {coach.rating}
                          </Typography>
                          <Typography variant="caption" color="textSecondary" sx={{ ml: 0.5 }}>
                            ⭐
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {coach.totalSessions}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={coach.status.toUpperCase()}
                          color={getStatusColor(coach.status)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>{formatDate(coach.createdAt)}</TableCell>
                      <TableCell>
                        <ActionButtons
                          onView={() => console.log('View coach:', coach._id)}
                          onAccept={() => console.log('Accept coach:', coach._id)}
                          onReject={() => console.log('Reject coach:', coach._id)}
                          onEdit={() => console.log('Edit coach:', coach._id)}
                          onDelete={() => console.log('Delete coach:', coach._id)}
                          showAcceptReject={coach.status === 'pending'}
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
          count={filteredCoaches.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};

export default CoachesTable;