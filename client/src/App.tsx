import React from 'react';
import { 
  BrowserRouter as Router, 
  Route, 
  Routes
} from "react-router-dom";
import Login from './pages/LoginForm';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import ProtectedRoute from './context/ProtectedRoute';


const App: React.FC = () => {
  return(
    <AuthProvider>
      <Router>
        <Routes>
          
          <Route path='/login' element={<Login />}>Login</Route>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
