# Employee Feedback Portal - Frontend

A modern web application for managing employee feedback, built with React, Redux Toolkit, and Tailwind CSS.

## Features

### Authentication
- Secure login system for admin access
- JWT-based authentication
- Protected routes

### Feedback Management
- Submit anonymous feedback with categories:
  - Work Environment
  - Leadership
  - Growth
  - Others
- Form validation using Zod
- Real-time feedback submission status
- Browser information tracking

### Admin Dashboard
- View all submitted feedback
- Filter feedback by category
- Sort feedback by date or category
- Mark feedback as reviewed
- Delete feedback entries
- Pagination support
- Status indicators for reviewed/pending feedback

## Tech Stack

### Core Technologies
- React 18
- Redux Toolkit for state management
- React Router for navigation
- Tailwind CSS for styling
- Vite as build tool

### Key Dependencies
- Axios for API communication
- React Toastify for notifications
- Zod for form validation

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

3. Start the development server:
```bash
npm run dev
```

The application will run on `http://localhost:3000`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Features Status

### Completed
- ✅ Admin authentication
- ✅ Feedback submission with validation
- ✅ Admin dashboard with CRUD operations
- ✅ Real-time notifications
- ✅ Responsive design
- ✅ Form validation
- ✅ Pagination
- ✅ Filtering and sorting

### Pending
- ⏳ User registration
- ⏳ Password reset functionality
- ⏳ Email notifications
- ⏳ Advanced analytics
- ⏳ Export functionality
- ⏳ Unit tests
- ⏳ E2E tests

## Security Features

1. JWT-based authentication
2. Protected routes
3. Form validation
4. Secure API communication
5. XSS protection through React

## Error Handling

The application handles various error scenarios:
- Network errors
- Authentication failures
- Form validation errors
- API response errors
- Session expiration

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
