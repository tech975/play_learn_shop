# Admin Dashboard

This admin dashboard provides a comprehensive interface for managing your platform with the following features:

## Features

### 1. Dashboard Overview
- **Stats Cards**: Display key metrics including:
  - Number of registered users
  - Number of owners
  - Number of coaches
  - Total revenue
- **Charts**: Visual representation of the data using bar charts

### 2. Users Management
- View all registered users in a paginated table
- Display user information including:
  - Avatar/Profile picture
  - Name
  - Email
  - Phone number
  - Role
  - Registration date
  - Status

### 3. Owners Management
- View all owner applications with filtering capabilities
- **Filter Options**:
  - Search by name, email, ground name, or address
  - Filter by status (All, Pending, Approved, Rejected)
- **Table Columns**:
  - Owner Name
  - Email
  - Phone
  - Ground Name
  - Address
  - Status (with color-coded chips)
  - Action buttons
- **Actions**:
  - View detailed information
  - Accept pending applications
  - Reject pending applications
- **Detailed View**: Modal popup showing complete owner information

### 4. Coaches Management
- View all coaches in the system
- Display coach information including specialization and experience
- Currently uses mock data (can be connected to actual API when available)

### 5. Invoices Management
- View all invoices with filtering and search capabilities
- **Filter Options**:
  - Search by invoice number, customer name, or email
  - Filter by status (All, Draft, Pending, Paid, Overdue)
- **Features**:
  - Color-coded status indicators
  - Currency formatting
  - Action buttons for viewing and downloading invoices
  - "New Invoice" button for creating invoices

## Technical Implementation

### Components Structure
```
frontend/src/
├── components/admin/
│   └── AdminLayout.jsx          # Main layout with sidebar navigation
├── pages/admin/
│   ├── AdminDashboard.jsx       # Dashboard with stats and charts
│   ├── UsersTable.jsx           # Users management table
│   ├── OwnersTable.jsx          # Owners management with filters
│   ├── CoachesTable.jsx         # Coaches management table
│   ├── InvoicesTable.jsx        # Invoices management table
│   └── AdminLogin.jsx           # Admin login page
└── routes/
    └── AdminRoutes.jsx          # Admin routing configuration
```

### Technologies Used
- **Material-UI**: For consistent UI components and styling
- **React Router**: For navigation between admin pages
- **Recharts**: For dashboard charts and data visualization
- **Axios**: For API communication
- **React Hooks**: For state management

### API Integration
The dashboard integrates with your existing backend APIs:
- `GET /users` - Fetch all users
- `GET /admin/venue-request/pending` - Fetch owner applications
- `PUT /admin/venue-request/status/:requestId` - Update owner application status

## How to Access

### 1. Admin Login
- Navigate to `/admin/login`
- Login with admin credentials
- System will redirect to admin dashboard if user has admin role

### 2. Navigation
The admin panel includes a sidebar with the following sections:
- **Dashboard**: Overview with stats and charts
- **Users**: User management table
- **Owners**: Owner applications management
- **Coaches**: Coaches management
- **Invoices**: Invoice management

### 3. Mobile Responsive
- Responsive design that works on desktop and mobile devices
- Collapsible sidebar for mobile navigation
- Touch-friendly interface elements

## Features Highlights

### Material-UI Table Features
- **Pagination**: Handle large datasets efficiently
- **Sorting**: Click column headers to sort data
- **Filtering**: Real-time search and filter capabilities
- **Responsive**: Tables adapt to different screen sizes

### Owner Management Features
- **Status Management**: Easy approve/reject workflow
- **Detailed View**: Complete information in modal dialogs
- **Real-time Updates**: Status changes reflect immediately
- **Search & Filter**: Find specific applications quickly

### Dashboard Analytics
- **Real-time Data**: Fetches live data from your APIs
- **Visual Charts**: Bar charts for better data understanding
- **Key Metrics**: Important business metrics at a glance

## Customization

### Adding New Sections
1. Create new component in `pages/admin/`
2. Add route in `AdminRoutes.jsx`
3. Add menu item in `AdminLayout.jsx`

### Styling Customization
- All components use Material-UI theming
- Colors and styles can be customized through MUI theme
- Responsive breakpoints are configurable

### API Integration
- Update API endpoints in component files
- Modify data structure handling as needed
- Add authentication headers through axios interceptors

## Security Features
- **Protected Routes**: Admin routes require authentication
- **Role-based Access**: Only admin users can access admin panel
- **JWT Token**: Secure API communication
- **Logout Functionality**: Secure session management

This admin dashboard provides a professional, feature-rich interface for managing your platform efficiently while maintaining security and user experience standards.