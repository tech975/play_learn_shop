import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import {
  Avatar,
  Button,
  Card,
  CardContent,
  Typography,
  Divider,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  IconButton,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { logout, updateUserProfile, uploadProfilePic } from "../../features/auth/authSlice"; 
import HeroSlider from "../public/HeroSlider";
import { PhotoCamera } from "@mui/icons-material";

const UserProfile = () => {
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.auth.user);

  const [user, setUser] = useState(loggedInUser);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(user?.name);

  // ✅ Save Name Only
  const handleSave = () => {
    dispatch(updateUserProfile({ name, token: loggedInUser.token }));
    setUser({ ...user, name });
    setOpen(false);
  };

  // ✅ Upload Profile Pic via Redux Thunk
  const handleProfilePicUpload = (e) => {
    const file = e.target.files[0];
    console.log("File: ", file)
    if (!file) return;
    dispatch(uploadProfilePic({ file, token: loggedInUser.token }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      <Navbar />
      <HeroSlider />

      <div className="pt-20 px-4 md:px-10">
        {/* Profile Card */}
        <Card
          sx={{
            maxWidth: 600,
            margin: "auto",
            bgcolor: "rgba(30,41,59,0.8)",
            color: "white",
            borderRadius: "16px",
          }}
        >
          <CardContent>
            <div className="flex flex-col items-center text-center gap-4">
              <div className="relative">
                <Avatar
                  src={loggedInUser?.profilePic}
                  sx={{ width: 100, height: 100, bgcolor: "#22c55e", fontSize: 32 }}
                >
                  {loggedInUser?.name?.charAt(0).toUpperCase()}
                </Avatar>

                {/* Upload button overlay */}
                <IconButton
                  component="label"
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    bgcolor: "rgba(0,0,0,0.6)",
                    color: "white",
                    "&:hover": { bgcolor: "rgba(0,0,0,0.8)" },
                  }}
                >
                  <PhotoCamera />
                  <input
                    hidden
                    accept="image/*"
                    type="file"
                    onChange={handleProfilePicUpload}
                  />
                </IconButton>
              </div>

              <Typography variant="h5" fontWeight="bold">
                {loggedInUser?.name}
              </Typography>
              <Typography variant="body1" color="gray">
                {loggedInUser?.email}
              </Typography>
              <Typography
                variant="body2"
                sx={{ bgcolor: "#22c55e", px: 2, py: 0.5, borderRadius: "8px", mt: 1 }}
              >
                Role: {loggedInUser?.role}
              </Typography>

              <Divider sx={{ width: "100%", my: 2, borderColor: "rgba(255,255,255,0.2)" }} />

              {/* Details Section */}
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="gray">
                    Joined
                  </Typography>
                  <Typography variant="body1">Jan 2024</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="gray">
                    Bookings
                  </Typography>
                  <Typography variant="body1">12</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="gray">
                    Coaching Sessions
                  </Typography>
                  <Typography variant="body1">5</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="gray">
                    Points
                  </Typography>
                  <Typography variant="body1">150</Typography>
                </Grid>
              </Grid>

              <div className="flex gap-4 mt-4">
                <Button
                  variant="contained"
                  sx={{ bgcolor: "#22c55e", "&:hover": { bgcolor: "#16a34a" } }}
                  onClick={() => setOpen(true)}
                >
                  Edit Profile
                </Button>
                <Button variant="outlined" color="error" onClick={() => dispatch(logout())}>
                  Logout
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ✨ Edit Profile Modal */}
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          <TextField
            label="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSave} variant="contained" sx={{ bgcolor: "#22c55e" }}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UserProfile;
