import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/profile/ProfileScreen';
import TweetScreen from './screens/TweetScreen';
import NotFoundScreen from './screens/NotFoundScreen';
import Layout from './components/Layout';
import LoginScreen from './screens/authentication/LoginScreen';
import { useState } from 'react';
import { AppContext } from './context/AppContext';
import ProtectedRoute from './components/ProtectedRoute';
import RegisterScreen from './screens/authentication/RegisterScreen';
import EditProfileScreen from './screens/profile/EditProfileScreen';
import SearchScreen from './screens/SearchScreen';

function App() {
  const [username, setUsername] = useState<string | null>(JSON.parse(localStorage.getItem('username')!));

  return (
    <AppContext.Provider value={{ username: username, setUsername: setUsername }}>
      <BrowserRouter>
        <Routes>
          <Route path='login' element={<LoginScreen />} />
          <Route path='register' element={<RegisterScreen />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<ProtectedRoute><HomeScreen /></ProtectedRoute>} />
            <Route path="profile/:id" element={<ProtectedRoute><ProfileScreen /></ProtectedRoute>} />
            <Route path="profile/:id/edit" element={<ProtectedRoute><EditProfileScreen /></ProtectedRoute>} />
            <Route path="tweet/:id" element={<TweetScreen />} />
            <Route path="search" element={<SearchScreen />} />
            <Route path="*" element={<NotFoundScreen />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;

