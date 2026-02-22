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

## Run on any PC (Windows / macOS / Linux)

Follow these steps to run the project on any machine — desktop or laptop — regardless of the OS. This covers both local devices and using an Android/iOS simulator or Expo Go on a phone.

1. Install Node.js (LTS recommended, v14+). Verify with:

```bash
node --version
npm --version
```

2. (Optional) Install Git and clone the repository if you haven't already:

```bash
git clone <repo-url>
cd aiseva
```

3. Install dependencies:

```bash
npm install
# or, if you prefer yarn
# yarn install
```

4. Install Expo CLI (optional). You can use npx to avoid a global install:

```bash
# Global (one-time):
npm install -g expo-cli

# Or use npx (recommended if you don't want a global tool):
npx expo start
```

5. Start the development server (Metro bundler / Expo):

```bash
npm start
# or
expo start
# to clear cache if you run into Metro bundler issues:
expo start -c
```

6. Open the app:

- On a physical device: install Expo Go (Android / iOS) and scan the QR code shown by the Expo dev tools.
- On Android emulator: ensure Android Studio + AVD is installed and running, then:

```bash
npm run android
```

- On iOS simulator (macOS only): ensure Xcode is installed, then:

```bash
npm run ios
```

- In a browser (web):

```bash
npm run web
```

7. Common troubleshooting tips

- If bundler shows module-not-found, try reinstalling deps:

```bash
rm -rf node_modules package-lock.json
npm install
```

- On Windows PowerShell, prefix commands with ./ when required (e.g., `./node_modules/.bin/expo`), or run PowerShell as Administrator if you hit permission issues.
- If Metro caches cause stale builds, run `expo start -c` or `npm start -- --reset-cache`.
- For Android builds, ensure ANDROID_HOME is set and platform-tools are on PATH; for macOS iOS builds, ensure Xcode command line tools are installed.

8. Notes about environment and platform differences

- iOS builds require macOS and Xcode; you cannot run the iOS simulator on Windows/Linux.
- If you prefer not to install Expo CLI globally, using `npx expo` works the same and avoids global dependency.
- If the project later requires environment variables, create a `.env` file in the project root and add placeholders (do not commit secrets).

This guide should let you run the app on any PC. If you want, I can add a short troubleshooting script or create a small CONTRIBUTING.md with platform-specific setup steps (Android SDK, AVD, Xcode setup).

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

## Developer

**yagnarashagan**

- 📧 Email: yaknarashagan2@gmail.com
- 🔗 GitHub: [https://github.com/yagnarashagan6](https://github.com/yagnarashagan6)

### Settings & Developer Options

For accessing developer settings and configuration options within the app, contact the developer through the above channels.

## License

This project is part of the AISEVA platform.
