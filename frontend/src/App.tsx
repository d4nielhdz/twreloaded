import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ProfileScreen from "./screens/profile/ProfileScreen";
import TweetScreen from "./screens/TweetScreen";
import NotFoundScreen from "./screens/NotFoundScreen";
import Layout from "./components/Layout";
import LoginScreen from "./screens/authentication/LoginScreen";
import ProtectedRoute from "./components/ProtectedRoute";
import RegisterScreen from "./screens/authentication/RegisterScreen";
import EditProfileScreen from "./screens/profile/EditProfileScreen";
import SearchScreen from "./screens/SearchScreen";
import useFirebaseUser from "./hooks/useFirebaseUser";

function AuthIsLoaded({ children }: { children: any }) {
  const { hasLoaded } = useFirebaseUser();
  return hasLoaded ? <>{children}</> : <div>Cargando...</div>;
}

function App() {
  return (
    <AuthIsLoaded>
      <BrowserRouter>
        <Routes>
          <Route path="login" element={<LoginScreen />} />
          <Route path="register" element={<RegisterScreen />} />
          <Route path="/" element={<Layout />}>
            <Route path="home" element={<HomeScreen />} />
            <Route
              index
              element={
                <ProtectedRoute>
                  <HomeScreen />
                </ProtectedRoute>
              }
            />
            <Route path="profile/:id" element={<ProfileScreen />} />
            <Route
              path="profile/:id/edit"
              element={
                <ProtectedRoute>
                  <EditProfileScreen />
                </ProtectedRoute>
              }
            />
            <Route path="tweet/:id" element={<TweetScreen />} />
            <Route path="search" element={<SearchScreen />} />
            <Route path="*" element={<NotFoundScreen />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthIsLoaded>
  );
}

export default App;
