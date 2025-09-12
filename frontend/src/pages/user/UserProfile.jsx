import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import TransactionHistoryModal from "../../components/TransactionHistoryModal";
import CertificationUploadModal from "../../components/CertificationUploadModal";
import ShopModal from "../../components/ShopModal";
import {
  Avatar,
  Button,
  Card,
  CardContent,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Box,
  Chip,
  IconButton,
  Badge,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Skeleton,
  Container,
  Stack,
  Tab,
  Tabs,
  Grid
} from "@mui/material";
import {
  Edit as EditIcon,
  LocationOn as LocationIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  CalendarToday as CalendarIcon,
  SportsTennis as SportsIcon,
  CameraAlt as CameraIcon,
  Close as CloseIcon,
  Visibility as ViewIcon,
  EmojiEvents as TrophyIcon,
  Star as StarIcon,
  Receipt as ReceiptIcon,
  CloudUpload as UploadIcon,
  ShoppingCart as ShopIcon
} from "@mui/icons-material";
import { useDispatch, useSelector } from 'react-redux';
import { logout, updateUserProfile, uploadProfilePic } from "../../features/auth/authSlice";
import { fetchUserBookings } from "../../features/bookings/bookingSlice";

const UserProfile = () => {
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.auth.user);
  const bookings = useSelector((state) => state.bookings.bookings);
  const bookingsLoading = useSelector((state) => state.bookings.loading);

  const [user, setUser] = useState(loggedInUser);
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [detailsDialog, setDetailsDialog] = useState({ open: false, type: '', data: [] });
  const [transactionModalOpen, setTransactionModalOpen] = useState(false);
  const [certificationModalOpen, setCertificationModalOpen] = useState(false);
  const [shopModalOpen, setShopModalOpen] = useState(false);
  const [profilePic, setProfilePicture] = useState(user?.profilePic || null);
  const [coachingSessions, setCoachingSessions] = useState([]);
  const [userStats, setUserStats] = useState({
    totalBookings: 0,
    coachingSessions: 0,
    points: 0,
    achievements: []
  });
  const [favoritesSports, setFavoritesSports] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editData, setEditData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    location: user?.location || '',
    profilePic: null
  });


  useEffect(() => {
    if (user?._id) {
      fetchUserData();
    }
  }, [user?._id]);

  useEffect(() => {
    if (user) {
      setEditData({
        name: user.name || '',
        phone: user.phone || '',
        location: user.location || '',
        profilePic: null
      });
      setProfilePicture(user.profilePic || null);
    }
  }, [user]);

  const fetchUserData = async () => {
    setLoading(true);
    try {
      dispatch(fetchUserBookings(user._id));
      setCoachingSessions([]);
      setFavoritesSports([]);
      setRecentActivity([]);

    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];
    console.log("file: ", file)

    file && dispatch(uploadProfilePic({ file, token: loggedInUser.token }));
  };

  const handleSave = async () => {
    try {
      const result = await dispatch(updateUserProfile({
        name: editData.name,
        phone: editData.phone,
        location: editData.location,
        profilePic: editData.profilePic,
        token: loggedInUser.token
      }));

      if (updateUserProfile.fulfilled.match(result)) {
        console.log('Profile updated successfully:', result.payload);
        setUser(result.payload);
        setOpen(false);
      } else {
        console.error('Profile update failed:', result.payload);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleStatClick = (type) => {
    let data = [];
    let title = '';

    switch (type) {
      case 'bookings':
        data = bookings || [];
        title = 'My Bookings';
        break;
      case 'coaching':
        data = coachingSessions || [];
        title = 'Coaching Sessions';
        break;
      default:
        return;
    }

    setDetailsDialog({ open: true, type, data, title });
  };

  const closeDetailsDialog = () => {
    setDetailsDialog({ open: false, type: '', data: [], title: '' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <Container maxWidth="lg" sx={{ pt: { xs: 12, md: 15 }, pb: 4 }}>
        <Card sx={{ mb: 3, borderRadius: 3, overflow: 'hidden' }}>
          <Box sx={{
            height: { xs: 140, md: 180 },
            background: 'linear-gradient(135deg, #22c55e 0%, #3b82f6 50%, #8b5cf6 100%)'
          }} />

          <CardContent sx={{ px: { xs: 3, md: 4 }, pb: 4 }}>
            <Box sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: { xs: 'flex-start', md: 'flex-end' },
              gap: { xs: 3, md: 4 },
              mt: { xs: -10, md: -12 }
            }}>
              <Box sx={{ position: 'relative', alignSelf: { xs: 'center', md: 'flex-start' } }}>
                <Badge
                  overlap="circular"
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  badgeContent={
                    <IconButton
                      size="small"
                      onClick={() => setOpen(true)}
                      sx={{
                        bgcolor: '#22c55e',
                        color: 'white',
                        '&:hover': { bgcolor: '#16a34a' },
                        width: 40,
                        height: 40
                      }}
                    >
                      <CameraIcon fontSize="small" />
                    </IconButton>
                  }
                >
                  <Avatar
                    src={loggedInUser?.profilePic || profilePic}
                    sx={{
                      width: { xs: 120, md: 140 },
                      height: { xs: 120, md: 140 },
                      bgcolor: "#22c55e",
                      fontSize: { xs: 48, md: 56 },
                      border: '5px solid white',
                      boxShadow: '0 8px 32px rgba(0,0,0,0.12)'
                    }}
                  >
                    {!profilePic && !loggedInUser?.profilePic && user?.name?.charAt(0)?.toUpperCase()}
                  </Avatar>
                </Badge>
              </Box>

              {/* User Info */}
              <Box sx={{
                flex: 1,
                ml: { md: 3 },
                mb: { md: 3 }
              }}>
                <Typography
                  variant="h3"
                  fontWeight="bold"
                  sx={{
                    mb: 0.5,
                    fontSize: { xs: '2rem', md: '2.75rem' },
                    color: 'text.primary',
                    lineHeight: 1.2
                  }}
                >
                  {user?.name}
                </Typography>

                <Box sx={{
                  display: 'flex',
                  alignItems: 'center',
                  mb: 3
                }}>
                  <EmailIcon sx={{ fontSize: 18, color: 'text.secondary', mr: 1 }} />
                  <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1rem' }}>
                    {user?.email}
                  </Typography>
                </Box>

                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  spacing={{ xs: 1, sm: 3 }}
                  alignItems={{ xs: 'flex-start', sm: 'center' }}
                  sx={{ mb: 2 }}
                >
                  {user?.phone && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <PhoneIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                      <Typography variant="body2" color="text.secondary">{user.phone}</Typography>
                    </Box>
                  )}
                  {user?.location && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <LocationIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                      <Typography variant="body2" color="text.secondary">{user.location}</Typography>
                    </Box>
                  )}
                </Stack>
              </Box>

              {/* Logout Button */}
              <Box sx={{ textAlign: 'center', mt: 4 }}>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => dispatch(logout())}
                  sx={{
                    borderRadius: 2,
                    textTransform: 'none',
                    fontWeight: 'bold',
                    px: 4,
                    py: 1
                  }}
                >
                  Logout
                </Button>
              </Box>


              <Box sx={{
                display: 'flex',
                gap: 1,
                alignSelf: { xs: 'center', md: 'flex-end' },
                mt: { xs: 2, md: 0 }
              }}>

                <Button
                  variant="contained"
                  startIcon={<EditIcon />}
                  onClick={() => setOpen(true)}
                  sx={{
                    bgcolor: "#22c55e",
                    "&:hover": { bgcolor: "#16a34a" },
                    borderRadius: 3,
                    textTransform: 'none',
                    fontWeight: 'bold',
                    px: 4,
                    py: 1.5,
                    fontSize: '1rem'
                  }}
                >
                  Edit Profile
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>

        <Card sx={{ borderRadius: 3, mb: 4, overflow: 'hidden' }}>
          <Box sx={{
            display: 'grid',
            gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
            '& > *': {
              borderRight: { xs: 'none', md: '1px solid' },
              borderBottom: { xs: '1px solid', md: 'none' },
              borderColor: 'divider',
              '&:nth-of-type(2n)': {
                borderRight: { xs: '0', md: '1px solid' },
                borderColor: 'divider'
              },
              '&:nth-of-type(n+3)': {
                borderBottom: { xs: '0', md: 'none' }
              },
              '&:last-child': {
                borderRight: '0',
                borderBottom: '0'
              }
            }
          }}>
            <Box
              onClick={() => handleStatClick('bookings')}
              sx={{
                textAlign: 'center',
                py: { xs: 3, md: 4 },
                px: { xs: 1, md: 2 },
                cursor: 'pointer',
                transition: 'all 0.2s',
                '&:hover': {
                  bgcolor: 'grey.50',
                  transform: 'translateY(-2px)'
                },
                minHeight: { xs: 140, md: 160 },
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <CalendarIcon sx={{ fontSize: { xs: 36, md: 48 }, color: '#22c55e', mb: 1 }} />
              <Typography variant="h4" fontWeight="bold" sx={{ mb: 0.5, fontSize: { xs: '1.5rem', md: '2rem' } }}>
                {bookingsLoading ? <Skeleton width={40} /> : (bookings?.length || 0)}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5, fontSize: { xs: '0.75rem', md: '0.875rem' } }}>
                Total Bookings
              </Typography>
              <ViewIcon sx={{ fontSize: { xs: 16, md: 18 }, color: '#22c55e' }} />
            </Box>

            <Box
              onClick={() => handleStatClick('coaching')}
              sx={{
                textAlign: 'center',
                py: { xs: 3, md: 4 },
                px: { xs: 1, md: 2 },
                cursor: 'pointer',
                transition: 'all 0.2s',
                '&:hover': {
                  bgcolor: 'grey.50',
                  transform: 'translateY(-2px)'
                },
                minHeight: { xs: 140, md: 160 },
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <SportsIcon sx={{ fontSize: { xs: 36, md: 48 }, color: '#3b82f6', mb: 1 }} />
              <Typography variant="h4" fontWeight="bold" sx={{ mb: 0.5, fontSize: { xs: '1.5rem', md: '2rem' } }}>
                {loading ? <Skeleton width={40} /> : (coachingSessions?.length || 0)}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5, fontSize: { xs: '0.75rem', md: '0.875rem' } }}>
                Coaching Sessions
              </Typography>
              <ViewIcon sx={{ fontSize: { xs: 16, md: 18 }, color: '#3b82f6' }} />
            </Box>

            <Box sx={{
              textAlign: 'center',
              py: { xs: 3, md: 4 },
              px: { xs: 1, md: 2 },
              minHeight: { xs: 140, md: 160 },
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <StarIcon sx={{ fontSize: { xs: 36, md: 48 }, color: '#f59e0b', mb: 1 }} />
              <Typography variant="h4" fontWeight="bold" sx={{ mb: 0.5, fontSize: { xs: '1.5rem', md: '2rem' } }}>
                {loading ? <Skeleton width={40} /> : (userStats.points || 0)}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.75rem', md: '0.875rem' } }}>
                Points Earned
              </Typography>
            </Box>

            <Box
              onClick={() => setShopModalOpen(true)}
              sx={{
                textAlign: 'center',
                py: { xs: 3, md: 4 },
                px: { xs: 1, md: 2 },
                cursor: 'pointer',
                transition: 'all 0.2s',
                '&:hover': {
                  bgcolor: 'grey.50',
                  transform: 'translateY(-2px)'
                },
                minHeight: { xs: 140, md: 160 },
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <ShopIcon sx={{ fontSize: { xs: 36, md: 48 }, color: '#8b5cf6', mb: 1 }} />
              <Typography variant="h4" fontWeight="bold" sx={{ mb: 0.5, fontSize: { xs: '1.5rem', md: '2rem' } }}>
                {loading ? <Skeleton width={40} /> : '8'}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5, fontSize: { xs: '0.75rem', md: '0.875rem' } }}>
                Shop Orders
              </Typography>
              <ViewIcon sx={{ fontSize: { xs: 16, md: 18 }, color: '#8b5cf6' }} />
            </Box>
          </Box>
        </Card>

        <Card sx={{ borderRadius: 3, mb: 4 }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              sx={{ px: 3 }}
              variant="scrollable"
              scrollButtons="auto"
            >
              <Tab label="Recent Activity" />
              <Tab label="Achievements" />
              <Tab label="Transaction History" />
            </Tabs>
          </Box>

          <CardContent sx={{ p: 4 }}>
            {activeTab === 0 && (
              <Box>
                <Typography variant="h6" fontWeight="bold" sx={{ mb: 3 }}>
                  Recent Activity
                </Typography>
                {bookings && bookings.length > 0 ? (
                  <Stack spacing={2}>
                    {bookings.slice(0, 5).map((booking, index) => (
                      <Box
                        key={booking._id || index}
                        sx={{
                          p: 3,
                          bgcolor: 'grey.50',
                          borderRadius: 2,
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center'
                        }}
                      >
                        <Box>
                          <Typography variant="body1" fontWeight="medium" sx={{ mb: 0.5 }}>
                            Booked {booking.venue?.name || 'Venue'}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {new Date(booking.date).toLocaleDateString()} • {booking.timeSlot || 'Time slot'}
                          </Typography>
                        </Box>
                        <Chip
                          label={booking.status}
                          size="small"
                          color={booking.status === 'confirmed' ? 'success' : 'warning'}
                        />
                      </Box>
                    ))}
                  </Stack>
                ) : (
                  <Box sx={{ textAlign: 'center', py: 6 }}>
                    <CalendarIcon sx={{ fontSize: 64, color: 'grey.300', mb: 2 }} />
                    <Typography variant="body1" color="text.secondary">
                      No recent activity
                    </Typography>
                  </Box>
                )}
              </Box>
            )}

            {activeTab === 1 && (
              <Box className="w-full max-h-96 flex justify-between items-start mb-3 overflow-y-scroll">
                {/* Certification Upload Modal */}
                <CertificationUploadModal
                  open={certificationModalOpen}
                  onClose={() => setCertificationModalOpen(false)}
                  userId={user?._id}
                />
              </Box>
            )}

            {activeTab === 2 && (
              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography variant="h6" fontWeight="bold">
                    Transaction History
                  </Typography>
                  <Button
                    variant="contained"
                    startIcon={<ReceiptIcon />}
                    onClick={() => setTransactionModalOpen(true)}
                    sx={{
                      bgcolor: '#8b5cf6',
                      '&:hover': { bgcolor: '#7c3aed' },
                      textTransform: 'none',
                      fontWeight: 'bold'
                    }}
                  >
                    View All Transactions
                  </Button>
                </Box>

                <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                  View your complete transaction history including bookings, coaching sessions, and shop purchases.
                  Filter by type and date range to find specific transactions.
                </Typography>

                {/* Recent Transactions Preview */}
                <Box sx={{ textAlign: 'center', py: 6 }}>
                  <ReceiptIcon sx={{ fontSize: 64, color: 'grey.300', mb: 2 }} />
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
                    Click "View All Transactions" to see your complete history
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Track all your bookings, sessions, and purchases in one place
                  </Typography>
                </Box>
              </Box>
            )}
          </CardContent>
        </Card>
      </Container>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 'bold' }}>Edit Profile</DialogTitle>
        <DialogContent sx={{ mt: 1 }}>
          <div className="space-y-4">
            <div className="flex flex-col items-center gap-3 mb-4">
              <Avatar
                src={profilePic ? `${profilePic}?v=${Date.now()}` : loggedInUser?.profilePic ? `${loggedInUser.profilePic}?v=${Date.now()}` : undefined}
                sx={{ width: 80, height: 80, bgcolor: "#22c55e", fontSize: 32 }}
              >
                {!profilePic && !loggedInUser?.profilePic && loggedInUser?.name?.charAt(0).toUpperCase()}
              </Avatar>

              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="profile-picture-upload"
                type="file"
                onChange={handleProfilePictureChange}
              />
              <label htmlFor="profile-picture-upload">
                <Button
                  variant="outlined"
                  component="span"
                  startIcon={<CameraIcon />}
                  sx={{ textTransform: 'none' }}
                >
                  Change Picture
                </Button>
              </label>
            </div>

            <TextField
              label="Full Name"
              value={editData.name}
              onChange={(e) => setEditData({ ...editData, name: e.target.value })}
              fullWidth
              variant="outlined"
              required
            />
            <TextField
              label="Phone Number"
              value={editData.phone}
              onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
              fullWidth
              variant="outlined"
              placeholder="Enter your phone number"
            />
            <TextField
              label="Location"
              value={editData.location}
              onChange={(e) => setEditData({ ...editData, location: e.target.value })}
              fullWidth
              variant="outlined"
              placeholder="Enter your location"
            />
          </div>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            variant="contained"
            sx={{
              bgcolor: "#22c55e",
              "&:hover": { bgcolor: "#16a34a" },
              borderRadius: '8px',
              textTransform: 'none',
              fontWeight: 'bold'
            }}
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={detailsDialog.open}
        onClose={closeDetailsDialog}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 3, m: 2 }
        }}
      >
        <DialogTitle sx={{
          fontWeight: 'bold',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          pb: 1
        }}>
          {detailsDialog.title}
          <IconButton onClick={closeDetailsDialog} size="small">
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ px: 3 }}>
          {detailsDialog.type === 'bookings' && (
            <Box>
              {detailsDialog.data.length === 0 ? (
                <Box sx={{ textAlign: 'center', py: 6 }}>
                  <CalendarIcon sx={{ fontSize: 48, color: 'grey.300', mb: 2 }} />
                  <Typography variant="body1" color="text.secondary">
                    No bookings found
                  </Typography>
                </Box>
              ) : (
                <Stack spacing={2}>
                  {detailsDialog.data.map((booking, index) => (
                    <Card key={booking._id || index} variant="outlined" sx={{ borderRadius: 2 }}>
                      <CardContent sx={{ p: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Avatar sx={{ bgcolor: '#22c55e' }}>
                            <CalendarIcon />
                          </Avatar>
                          <Box sx={{ flex: 1 }}>
                            <Typography variant="subtitle1" fontWeight="medium">
                              {booking.venue?.name || 'Venue Name'}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {new Date(booking.date).toLocaleDateString()}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {booking.timeSlot || 'Time slot not specified'}
                            </Typography>
                          </Box>
                          <Chip
                            label={booking.status}
                            size="small"
                            color={booking.status === 'confirmed' ? 'success' : 'warning'}
                          />
                        </Box>
                      </CardContent>
                    </Card>
                  ))}
                </Stack>
              )}
            </Box>
          )}

          {detailsDialog.type === 'coaching' && (
            <Box>
              {detailsDialog.data.length === 0 ? (
                <Box sx={{ textAlign: 'center', py: 6 }}>
                  <SportsIcon sx={{ fontSize: 48, color: 'grey.300', mb: 2 }} />
                  <Typography variant="body1" color="text.secondary">
                    No coaching sessions found
                  </Typography>
                </Box>
              ) : (
                <Stack spacing={2}>
                  {detailsDialog.data.map((session, index) => (
                    <Card key={session.id || index} variant="outlined" sx={{ borderRadius: 2 }}>
                      <CardContent sx={{ p: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Avatar sx={{ bgcolor: '#3b82f6' }}>
                            <SportsIcon />
                          </Avatar>
                          <Box sx={{ flex: 1 }}>
                            <Typography variant="subtitle1" fontWeight="medium">
                              Coach: {session.coach}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Sport: {session.sport}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Date: {session.date}
                            </Typography>
                          </Box>
                          <Chip
                            label={session.status}
                            size="small"
                            color={session.status === 'completed' ? 'success' : 'primary'}
                          />
                        </Box>
                      </CardContent>
                    </Card>
                  ))}
                </Stack>
              )}
            </Box>
          )}
        </DialogContent>
      </Dialog>

      {/* Transaction History Modal */}
      <TransactionHistoryModal
        open={transactionModalOpen}
        onClose={() => setTransactionModalOpen(false)}
        userId={user?._id}
      />

      {/* Shop Modal */}
      <ShopModal
        open={shopModalOpen}
        onClose={() => setShopModalOpen(false)}
        userId={user?._id}
      />
    </div>
  );
};

export default UserProfile;
