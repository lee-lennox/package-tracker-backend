# Package Tracker Frontend

This is the frontend application for the Package Tracker System, built with React.

## Technologies Used

- React 18
- Axios for API calls
- HTML5
- CSS3
- JavaScript (ES6+)

## Prerequisites

- Node.js 14 or higher
- npm 6 or higher
- Backend server running on http://localhost:8080

## How to Run

1. Navigate to the project directory:
   ```bash
   cd package-tracker-frontend
   ```

2. Install dependencies (if not already installed):
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

The application will open in your browser at `http://localhost:3000`.

## Default Users

You can login with the following pre-configured users:

| Username | Password | Role |
|----------|----------|------|
| admin | admin123 | ADMIN |
| agent | agent123 | AGENT |
| customer | customer123 | CUSTOMER |

## Features

### Customer Features
- View their own packages
- Track package status and history
- View detailed tracking events

### Agent Features
- Create new packages
- Update package status
- Add tracking events
- View all packages

### Admin Features
- All Agent features
- Delete packages
- Manage users
- Full system access

## Project Structure

```
src/
├── components/
│   ├── Login.js          # Login and registration form
│   ├── Navbar.js         # Navigation bar
│   ├── Dashboard.js      # Main dashboard
│   ├── PackageList.js    # Package grid view
│   ├── PackageDetails.js # Detailed package view with tracking
│   └── PackageModal.js   # Create/edit package modal
├── services/
│   └── api.js           # API service layer
├── App.js               # Main application component
├── App.css              # Application styles
└── index.js             # Application entry point
```

## API Configuration

The frontend is configured to connect to the backend at `http://localhost:8080/api`. 

To change this, edit the `API_BASE_URL` in `src/services/api.js`.

## Building for Production

To create a production build:

```bash
npm run build
```

This will create an optimized production build in the `build/` directory.

