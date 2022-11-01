import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/profile/ProfileScreen';
import TweetScreen from './screens/TweetScreen';
import NotFoundScreen from './screens/NotFoundScreen';
import Layout from './components/Layout';
import LoginScreen from './screens/authentication/LoginScreen';
import { useEffect, useState } from 'react';
import { AppContext } from './context/AppContext';
import ProtectedRoute from './components/ProtectedRoute';
import RegisterScreen from './screens/authentication/RegisterScreen';
import EditProfileScreen from './screens/profile/EditProfileScreen';
import SearchScreen from './screens/SearchScreen';
import { auth } from './firebase-config';
import { User } from './models/user';
import { getUserById } from './services/auth-service';

function App() {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async user => {
      if (user) {
        let userdb = await getUserById(user.uid);
        setUser(userdb);
      }
    });
    return () => {
      unsubscribe();
    }
  }, []);

  return (
    <AppContext.Provider value={{ user: user, setUser: setUser }}>
      <BrowserRouter>
        <Routes>
          <Route path='login' element={<LoginScreen />} />
          <Route path='register' element={<RegisterScreen />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<ProtectedRoute><HomeScreen /></ProtectedRoute>} />
            <Route path="profile/:id" element={<ProfileScreen />} />
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

