# Setup Guide for Admin Dashboard

## Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create .env file in backend directory:**
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/khelomore_clone
   JWT_SECRET=your_jwt_secret_key_here
   ```

4. **Start the backend server:**
   ```bash
   npm start
   # or
   node server.js
   ```

   You should see:
   ```
   Server running on port 5000
   ```

## Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the frontend development server:**
   ```bash
   npm run dev
   ```

   You should see:
   ```
   Local:   http://localhost:5173/
   ```

## Testing the Admin Dashboard

1. **Create an admin user** (you can do this via MongoDB directly or create a signup endpoint):
   ```javascript
   // In MongoDB, create a user with role: 'admin'
   {
     name: "Admin User",
     email: "admin@example.com",
     password: "$2a$10$hashedPasswordHere", // Use bcrypt to hash "admin123"
     role: "admin"
   }
   ```

2. **Login Process:**
   - Go to `http://localhost:5173/login`
   - Enter admin credentials
   - You'll be automatically redirected to `/admin/dashboard`

3. **API Endpoints Used:**
   - `POST /api/auth/login` - Login
   - `GET /api/auth/users` - Get all users
   - `GET /api/admin/venue-request/pending` - Get owner requests
   - `PUT /api/admin/venue-request/status/:id` - Update owner request status

## Troubleshooting

### 404 Error on Login
- Ensure backend server is running on port 5000
- Check that routes are properly mounted in `backend/server.js`
- Verify the API endpoints match the frontend calls

### CORS Issues
- Backend already has CORS enabled in `server.js`
- Ensure frontend is running on port 5173 (default Vite port)

### Database Connection
- Ensure MongoDB is running
- Check the MONGO_URI in your .env file
- Verify database name matches your setup

### Home Page Banner Issue
- Fixed: Changed HeroSlider from `fixed` to `absolute` positioning
- The banner should now only appear on the hero section, not as a background for the entire page

## Admin Dashboard Features

✅ **Modern Design**: Gradient theme with professional styling
✅ **Real API Integration**: Uses your existing backend APIs
✅ **Redux State Management**: Proper state management with slices
✅ **Responsive Design**: Works on all devices
✅ **Owner Management**: Complete CRUD operations for owner applications
✅ **User Management**: View and manage all users
✅ **Dashboard Analytics**: Real-time stats and charts

## Production Deployment

1. **Remove API Test Component:**
   - Remove `<ApiTest />` from `Home.jsx`
   - Delete `frontend/src/components/ApiTest.jsx`

2. **Update API Base URL:**
   - Update `frontend/src/api/axios.js` with your production API URL

3. **Build Frontend:**
   ```bash
   cd frontend
   npm run build
   ```

4. **Deploy Backend:**
   - Set production environment variables
   - Deploy to your preferred hosting service
   - Update CORS settings if needed