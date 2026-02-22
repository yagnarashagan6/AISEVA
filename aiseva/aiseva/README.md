# AISEVA - React Native Mobile App

This is the React Native version of the AISEVA web application, featuring government scheme management and AI-powered eligibility checking.

## Features

### User Features

- ✅ **Login/Signup** - User authentication with persistent sessions
- ✅ **Dashboard** - Browse all schemes with search and filters
- ✅ **AI Recommendations** - Get personalized scheme recommendations
- ✅ **Scheme Details** - View detailed information about each scheme
- ✅ **Eligibility Check** - AI-powered eligibility verification
- ✅ **Application Form** - Apply for schemes with pre-filled data
- ✅ **User Profile** - Manage personal, contact, family, education, and bank details
- ✅ **Notifications** - View scheme updates and deadlines

### Admin Features

- ✅ **Admin Dashboard** - Manage schemes and view statistics
- ✅ **Scheme Management** - View, edit, and delete schemes
- ✅ **User Statistics** - View active users and applications

## Technology Stack

- **React Native** - Cross-platform mobile development
- **Expo** - Development and build tools
- **React Navigation** - Screen navigation
- **AsyncStorage** - Local data persistence
- **Expo Vector Icons** - Icons library

## Project Structure

```
aiseva/
├── App.js                          # Main app entry point with navigation
├── src/
│   ├── screens/
│   │   ├── auth/
│   │   │   ├── LoginScreen.js     # User/Admin login
│   │   │   └── SignupScreen.js    # User registration
│   │   ├── user/
│   │   │   ├── UserDashboardScreen.js      # Main user dashboard
│   │   │   ├── SchemeDetailsScreen.js      # Scheme details view
│   │   │   ├── ApplicationFormScreen.js    # Application form
│   │   │   ├── UserProfileScreen.js        # User profile management
│   │   │   └── NotificationsScreen.js      # Notifications list
│   │   └── admin/
│   │       └── AdminDashboardScreen.js     # Admin panel
│   └── lib/
│       └── mockData.js            # Mock data for schemes and users
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI (install with `npm install -g expo-cli`)
- Expo Go app on your mobile device (iOS/Android)

### Installation

1. Navigate to the aiseva directory:

```bash
cd aiseva
```

2. Install dependencies (if not already installed):

```bash
npm install
```

3. Start the development server:

```bash
npm start
# or
expo start
```

4. Scan the QR code with:
   - **iOS**: Camera app
   - **Android**: Expo Go app

## Running the App

### Development Mode

```bash
npm start
```

### Run on Android

```bash
npm run android
```

### Run on iOS

```bash
npm run ios
```

### Run on Web

```bash
npm run web
```

## Demo Credentials

You can use any email and password combination to login:

**User Login:**

- Email: user@example.com
- Password: any password

**Admin Login:**

- Email: admin@example.com
- Password: any password

## Key Components

### Login Screen

- Toggle between User and Admin login
- Form validation
- Session persistence with AsyncStorage

### User Dashboard

- Search functionality
- Category and location filters
- Recommended schemes carousel
- Scheme cards with eligibility badges
- Navigation to notifications and profile

### Scheme Details

- Full scheme information
- AI eligibility check with visual feedback
- Benefits, criteria, documents, and instructions
- Apply button (enabled only if eligible)

### Application Form

- Pre-filled with user profile data
- Personal details section
- Contact information section
- Bank details section
- Declaration and submission

### User Profile

- 5 sections: Personal Details, Contact Info, Family & Income, Education & Employment, Bank Details
- Tab-based navigation
- Form fields for all user data
- Save functionality with AsyncStorage

### Notifications

- List of scheme updates
- Visual indicators for read/unread
- Different notification types (new scheme, deadline, update)

### Admin Dashboard

- Statistics cards (schemes, users, applications)
- Schemes management list
- Edit and delete functionality

## Data Persistence

The app uses AsyncStorage to persist:

- Authentication state (isAuthenticated, userType, currentUser)
- User profile data (all sections)
- Session information

## Navigation Flow

```
Login Screen
    ├── User Login → User Dashboard
    │                     ├── Scheme Details → Application Form
    │                     ├── User Profile
    │                     └── Notifications
    └── Admin Login → Admin Dashboard
```

## Customization

### Adding New Schemes

Edit `src/lib/mockData.js` and add new scheme objects to the `mockSchemes` array.

### Modifying Styles

All styles are defined inline using StyleSheet.create() in each component. Update the styles object to change colors, spacing, etc.

### Theme Colors

Primary Blue: `#3B82F6`
Success Green: `#10B981`
Error Red: `#EF4444`
Warning Amber: `#F59E0B`
Background Gray: `#F9FAFB`

## Features Matching Web App

✅ Responsive design adapted for mobile
✅ Same authentication flow
✅ Identical data structure
✅ Same user journey
✅ AI-powered features (simulated)
✅ Complete CRUD operations (simulated)
✅ Form validation
✅ Session management

## Differences from Web App

- Mobile-optimized UI components
- Touch-friendly interactions
- Native navigation (React Navigation vs React Router)
- AsyncStorage instead of localStorage
- Simplified admin panel (no full scheme editing form)
- Optimized for smaller screens

## Future Enhancements

- Backend API integration
- Real AI/ML model integration
- Push notifications
- Document upload functionality
- Offline mode
- Biometric authentication
- Multi-language support
- Dark mode

## Troubleshooting

### App won't start

```bash
# Clear cache and restart
expo start -c
```

### Module not found errors

```bash
# Reinstall dependencies
rm -rf node_modules
npm install
```

### AsyncStorage issues

```bash
# Reinstall AsyncStorage
npm uninstall @react-native-async-storage/async-storage
npm install @react-native-async-storage/async-storage
```

## Support

For issues or questions, please check:

- Expo documentation: https://docs.expo.dev/
- React Navigation docs: https://reactnavigation.org/

## License

This project is part of the AISEVA platform.
