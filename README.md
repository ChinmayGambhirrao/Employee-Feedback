# Employee Feedback Portal - Frontend

This is the frontend application for the Employee Feedback Portal, built with React and Material-UI.

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## Setup Instructions

1. Clone the repository:
```bash
git clone <your-frontend-repo-url>
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```
REACT_APP_API_URL=http://localhost:5000/api
```

4. Start the development server:
```bash
npm start
```

The application will run on `http://localhost:3000`

## Features

### Employee Features
- Login system
- Submit anonymous feedback
- View feedback history
- Update profile information

### Admin Features
- Secure admin login
- Dashboard with statistics
- Employee management
- Feedback management
- Status updates for feedback

## Project Structure

```
src/
├── components/         # Reusable components
├── pages/             # Page components
├── context/           # React context
├── services/          # API services
├── utils/             # Utility functions
└── App.js            # Main application component
```

## Assumptions Made

1. Modern browser support (Chrome, Firefox, Safari, Edge)
2. Responsive design for desktop and tablet
3. JWT token stored in localStorage
4. Backend API running on localhost:5000
5. Material-UI as the component library
6. React Router for navigation

## Completion Status

### Completed Features
- ✅ Employee authentication
- ✅ Admin authentication
- ✅ Feedback submission form
- ✅ Admin dashboard
- ✅ Employee management
- ✅ Feedback management
- ✅ Responsive design
- ✅ JWT token handling
- ✅ Basic error handling

### Pending Features
- ⏳ Advanced filtering and search
- ⏳ Data visualization improvements
- ⏳ Export functionality
- ⏳ Unit tests
- ⏳ E2E tests
- ⏳ Performance optimizations

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App

## Dependencies

- React
- Material-UI
- Axios
- React Router
- React Context API
- Chart.js (for statistics)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## Security Considerations

1. JWT tokens are stored in localStorage
2. API calls include authentication headers
3. Protected routes for admin access
4. Input validation on forms
5. XSS protection through React

## Error Handling

The application handles various error scenarios:
- Network errors
- Authentication failures
- Form validation errors
- API response errors
- Session expiration
