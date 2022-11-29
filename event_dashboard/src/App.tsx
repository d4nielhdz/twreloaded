import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import NotFoundScreen from "./screens/NotFoundScreen";
import Layout from "./components/Layout";
import LoginScreen from "./screens/authentication/LoginScreen";
import ProtectedRoute from "./components/ProtectedRoute";
import useFirebaseUser from "./hooks/useFirebaseUser";
import TweetScreen from "./screens/TweetScreen";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

function AuthIsLoaded({ children }: { children: any }) {
  const { hasLoaded } = useFirebaseUser();
  return hasLoaded ? <>{children}</> : <div>Cargando...</div>;
}

function App() {
  return (
    <AuthIsLoaded>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <BrowserRouter>
          <Routes>
            <Route path="login" element={<LoginScreen />} />
            <Route path="/" element={<Layout />}>
              <Route path="home" element={<HomeScreen />} />
              <Route path="tweet/:id" element={<TweetScreen />} />
              <Route
                index
                element={
                  <ProtectedRoute>
                    <HomeScreen />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<NotFoundScreen />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </LocalizationProvider>
    </AuthIsLoaded>
  );
}

export default App;
