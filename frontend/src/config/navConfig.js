// import AccountMenu from "../components/AccountMenu";

export const navConfig = {
  public: [
    { id: 1, text: "Play", type: "scroll", key: 0 },
    { id: 2, text: "Learn", type: "scroll", key: 1 },
    { id: 3, text: "Shop", type: "scroll", key: 2 },
    {
      id: 4,
      text: "Partner with Us",
      type: "dropdown",
      items: [
        {
          id: 41,
          text: "Become an Owner",
          type: "route",
          path: "/owner-landing",
        },
        {
          id: 42,
          text: "Join as a Coach",
          type: "route",
          path: "/coach-landing",
        },
      ],
    },
    { id: 5, text: "Login", type: "route", path: "/login" },
  ],

  user: [
    { id: 1, text: "Book Turf", type: "route", path: "/user/bookings/turf" },
    {
      id: 2,
      text: "Join Coaching",
      type: "route",
      path: "/user/bookings/coach",
    },
    {
      id: 3,
      text: "Partner with Us",
      type: "dropdown",
      items: [
        {
          id: 31,
          text: "Become an Owner",
          type: "route",
          path: "/owner-landing",
        },
        {
          id: 32,
          text: "Join as a Coach",
          type: "route",
          path: "/coach-landing",
        },
      ],
    },
    { id: 4, text: "Profile", type: "route", path: "/user/profile" },
  ],

  admin: [
    { id: 1, text: "Dashboard", type: "route", path: "/admin/dashboard" },
    { id: 2, text: "Users", type: "route", path: "/admin/users" },
    { id: 3, text: "Owners", type: "route", path: "/admin/owners" },
    { id: 4, text: "Venues", type: "route", path: "/admin/venues" },
    { id: 5, text: "Applications", type: "route", path: "/admin/applications" },
    {
      id: 6,
      text: "Partner with Us",
      type: "dropdown",
      items: [
        {
          id: 61,
          text: "Become an Owner",
          type: "route",
          path: "/owner-landing",
        },
        {
          id: 62,
          text: "Join as a Coach",
          type: "route",
          path: "/coach-landing",
        },
      ],
    },
    { id: 7, text: "Settings", type: "route", path: "/admin/settings" },
    { id: 8, text: "Logout", type: "logout", path: "/" },
  ],

  owner: [
    { id: 1, text: "Dashboard", type: "route", path: "/owner/dashboard" },
    { id: 2, text: "My Venues", type: "route", path: "/owner/venues" },
    { id: 3, text: "Bookings", type: "route", path: "/owner/bookings" },
    { id: 4, text: "Calendar", type: "route", path: "/owner/calendar" },
    { id: 5, text: "Revenue", type: "route", path: "/owner/revenue" },
    {
      id: 6,
      text: "Partner with Us",
      type: "dropdown",
      items: [
        {
          id: 61,
          text: "Become an Owner",
          type: "route",
          path: "/owner-landing",
        },
        {
          id: 62,
          text: "Join as a Coach",
          type: "route",
          path: "/coach-landing",
        },
      ],
    },
    { id: 7, text: "Profile", type: "route", path: "/user/profile" },
    { id: 8, text: "Logout", type: "logout", path: "/" },
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
