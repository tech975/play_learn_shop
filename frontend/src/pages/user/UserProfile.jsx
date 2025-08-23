import React from "react";
import Navbar from "../../components/Navbar";
import { Avatar, Button, Card, CardContent, Typography, Divider, Grid, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import { logout, updateUserProfile } from "../../features/auth/authSlice";
import HeroSlider from "../public/HeroSlider";
import { useState } from "react";

const UserProfile = () => {
    const dispatch = useDispatch();
//   const user = JSON.parse(localStorage.getItem("user")) || {
//     name: "Guest",
//     email: "guest@example.com",
//     role: "user",
//   };
    const loggedInUser = useSelector((state) => state.auth.user);

    const [user, setUser] = useState(loggedInUser);
    const [open, setOpen] = useState(false);
    const [name, setName] = useState(user?.name);

    const handleSave = () => {
        const updatedUser = { ...user, name };
        setUser(updatedUser);
        // localStorage.setItem("user", JSON.stringify(updatedUser));
        dispatch(updateUserProfile({ name, token: loggedInUser.token }));
        setOpen(false);
    };
    console.log("user: ", user);

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
              <Avatar
                sx={{ width: 100, height: 100, bgcolor: "#22c55e", fontSize: 32 }}
              >
                {user.name?.charAt(0).toUpperCase()}
              </Avatar>

              <Typography variant="h5" fontWeight="bold">
                {user.name}
              </Typography>
              <Typography variant="body1" color="gray">
                {user.email}
              </Typography>
              <Typography
                variant="body2"
                sx={{ bgcolor: "#22c55e", px: 2, py: 0.5, borderRadius: "8px", mt: 1 }}
              >
                Role: {user.role}
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
