// import AccountMenu from "../components/AccountMenu";

export const navConfig = {
  public: [
    { id: 1, text: "Play", type: "scroll", key: 0 },
    { id: 2, text: "Learn", type: "scroll", key: 1 },
    { id: 3, text: "Shop", type: "scroll", key: 2 },
    { id: 4, text: "Login", type: "route", path: "/login" },
  ],

  user: [
    { id: 1, text: "Dashboard", type: "route", path: "/user/dashboard" },
    { id: 2, text: "Book Turf", type: "route", path: "/user/bookings/turf" },
    { id: 3, text: "Join Coaching", type: "route", path: "/user/bookings/coach" },
    { id: 4, text: "Bookings", type: "route", path: "/user/bookings" },
    // { id: 5, text: <AccountMenu />, type: "route"},
    { id: 5, text: "Profile", type: "route", path: "/user/profile" },
    // { id: 6, text: "Logout", type: "logout", path: "/" },
  ],

  admin: [
    { id: 1, text: "Dashboard", type: "route", path: "/admin/dashboard" },
    { id: 2, text: "Manage Users", type: "route", path: "/admin/users" },
    { id: 3, text: "Manage Grounds", type: "route", path: "/admin/grounds" },
    { id: 4, text: "Reports", type: "route", path: "/admin/reports" },
    { id: 5, text: "Settings", type: "route", path: "/admin/settings" },
    { id: 6, text: "Logout", type: "logout", path: "/" },
  ],

  owner: [
    { id: 1, text: "Dashboard", type: "route", path: "/owner/dashboard" },
    { id: 2, text: "My Grounds", type: "route", path: "/owner/grounds" },
    { id: 3, text: "Add Ground", type: "route", path: "/owner/add-ground" },
    { id: 4, text: "Bookings", type: "route", path: "/owner/bookings" },
    { id: 5, text: "Profile", type: "route", path: "/owner/profile" },
    { id: 6, text: "Logout", type: "logout" },
  ],

  coach: [
    { id: 1, text: "Dashboard", type: "route", path: "/coach/dashboard" },
    { id: 2, text: "My Students", type: "route", path: "/coach/students" },
    { id: 3, text: "Manage Sessions", type: "route", path: "/coach/sessions" },
    { id: 4, text: "Bookings", type: "route", path: "/coach/bookings" },
    { id: 5, text: "Profile", type: "route", path: "/coach/profile" },
    { id: 6, text: "Logout", type: "logout" },
  ],
};
