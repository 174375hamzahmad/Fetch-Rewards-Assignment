import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import LoginPage from "./pages/Login";
import { SearchPage } from "./pages/Search";
import { AuthProvider, useAuthContext } from "./context/authContext";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import CssBaseline from "@mui/material/CssBaseline";

const PrivateRoute = ({ children }: { children: React.JSX.Element }) => {
  const { user } = useAuthContext();
  return user ? children : <Navigate to="/" />;
};

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route
              path="/search"
              element={
                <PrivateRoute>
                  <SearchPage />
                </PrivateRoute>
              }
            />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
