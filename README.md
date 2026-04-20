# RideNow - Modern Taxi Booking Application

RideNow is a premium, full-stack taxi booking web application built with React, Vite, and Firebase. It offers a seamless user experience for booking rides, tracking journey history, and managing account statistics through a modern, responsive interface inspired by industry leaders like Uber.

## 🚀 Features

### 🔐 Authentication & Security
- **Secure Access**: Full User Authentication (Signup, Login, Logout) powered by Firebase Auth.
- **Protected Routes**: Ensuring sensitive features like booking and history are only accessible to authenticated users.
- **Environment Security**: All sensitive API keys and Firebase configurations are managed via `.env` files.

### 🚕 Booking Experience
- **Interactive Map**: Built with Leaflet, allowing users to select pickup and drop-off points directly on the map.
- **Smart Search**: Autocomplete location search powered by the **Photon (Komoot) API**.
- **Reverse Geocoding**: Automatically fetches readable addresses from map coordinates using **Nominatim (OpenStreetMap)**.
- **Real-time Fare Estimation**: Calculates journey distance using the **Haversine formula** and provides instant fare estimates based on vehicle type (Mini, Sedan, SUV).
- **Estimated Travel Time**: Calculates travel duration based on distance and average traffic conditions.

### 📊 Dashboard & History
- **Personalized Dashboard**: Real-time account summary showing total rides, completed trips, and spending analytics.
- **Ride History**: Detailed logs of all past bookings with status tracking (Pending, Completed, Cancelled).
- **CRUD Operations**: Create new bookings, Read ride logs/stats, and Delete (cancel) pending rides.

### 🎨 UI/UX
- **Premium Design**: Built with Tailwind CSS for a clean, minimal, and modern aesthetic.
- **Dark Mode**: Context-aware theme switching that persists across user sessions.
- **Mobile Responsive**: Fully optimized for Desktop, Tablet, and Mobile screens.
- **Smooth Feedback**: Interactive loading spinners, toast notifications, and empty states.

## 🛠️ Tech Stack

- **Frontend**: React 18+ (Functional Components & Hooks)
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Backend/Database**: Firebase Firestore
- **Authentication**: Firebase Auth
- **Mapping**: React-Leaflet / Leaflet.js
- **Geocoding**: Photon API & Nominatim API
- **State Management**: React Context API (Auth & Theme)
- **Routing**: React Router DOM v6

## 📂 Project Structure

```text
src/
 ├── components/     # Reusable UI components (Buttons, Cards, Inputs, etc.)
 ├── context/        # Global State (AuthContext, ThemeContext)
 ├── hooks/          # Custom Hooks (useDarkMode)
 ├── pages/          # Main application views/screens
 ├── services/       # Firebase initialization and configuration
 ├── utils/          # Logic for Maps, Geocoding, Distance, and Fare
 └── App.jsx         # Main Routing and Layout logic
```

## ⚙️ Setup Instructions

1. **Clone the repository**
   ```bash
   git clone [your-repo-link]
   cd taxi-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env` file in the root directory and add your Firebase configuration:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

4. **Run the application**
   ```bash
   npm run dev
   ```

## 🧠 Technical Decisions

- **Vite vs CRA**: Vite was chosen for its superior build speed and optimized development server performance.
- **Photon API**: Selected for geocoding over Nominatim's direct search to avoid CORS issues and provide faster autocomplete results.
- **Context API**: Used for Auth and Theme management to avoid "prop drilling" and ensure global state is handled cleanly without the overhead of Redux.
- **Haversine Formula**: Implemented manually in `mapUtils.js` to accurately calculate great-circle distances between coordinates on the Earth's surface for fare generation.

## video link 
https://drive.google.com/file/d/1RRBxOSbEngB6AfXm7pE_Vy8VnFM3BoBj/view?usp=sharing


---
**Developer**: Manvi Gupta  

```








If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
