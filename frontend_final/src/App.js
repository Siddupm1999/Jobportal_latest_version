import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider } from './context/AuthContext';

// Pages
import Home from './pages/Home';
import JobListings from './pages/JobListings';
import JobDetails from './pages/JobDetails';
import EmployerDashboard from './pages/EmployerDashboard';
import JobSeekerDashboard from './pages/JobSeekerDashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Blog from './pages/Blog';
import About from './pages/About';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2563eb',
    },
    secondary: {
      main: '#64748b',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <div className="App">
            <Navbar  style={{ padding: '10px', textAlign: 'center' }}>
              <Link to="/" style={{ margin: '0 10px' }}>Home</Link>
              <Link to="/jobs" style={{ margin: '0 10px' }}>Jobs</Link>
              <Link to="/blog" style={{ margin: '0 10px' }}>Blog</Link>
              <Link to="/about" style={{ margin: '0 10px' }}>About</Link>
            </Navbar>
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/jobs" element={<JobListings />} />
                <Route path="/jobs/:id" element={<JobDetails />} />
                <Route path="/employer/dashboard" element={<EmployerDashboard />} />
                <Route path="/jobseeker/dashboard" element={<JobSeekerDashboard />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/about" element={<About />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
