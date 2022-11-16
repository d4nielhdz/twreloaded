import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import NotFoundScreen from "./screens/NotFoundScreen";
import Layout from "./components/Layout";
import LoginScreen from "./screens/authentication/LoginScreen";
import ProtectedRoute from "./components/ProtectedRoute";
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
            <Route path="*" element={<NotFoundScreen />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthIsLoaded>
  );
}

export default App;
