import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { jwtDecode } from "jwt-decode";
import setAuthToken from "./utils/setAuthHeader";
import { logoutUser, setCurrentUser } from "./actions/authActions";
import store from "./store";
import Register from "./components/auth/Register";

import PrivateRoute from "./components/common/PrivateRoute";

import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Footer from "./components/layout/Footer";
import Login from "./components/auth/Login";
import CreateProfile from "./components/create-profile/CreateProfile";
import EditProfile from "./components/edit-profile/EditProfile";
import AddExperience from "./components/add-credentials/AddExperience";
import AddEducation from "./components/add-credentials/AddEducation";
import Profiles from "./components/profiles/Profiles";


import "./App.css";
import Dashboard from "./components/dashboard/Dashboard";
import { clearCurrentProfile } from "./actions/profileActions";

// Check for token
if (localStorage.jwtToken) {
  // Set Auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwtDecode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    //Logout user
    store.dispatch(logoutUser());
    //Clear current profile
    store.dispatch(clearCurrentProfile());
    //Redirect to login
    window.location.href = "/login";
  }
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Landing />} />
            <Route
              exact
              path="/login"
              element={
                <div className="container">
                  <Login />
                </div>
              }
            />
            <Route
              exact
              path="/profiles"
              element={
                <div className="container">
                  <Profiles />
                </div>
              }
            />
            <Route
              exact
              path="/dashboard"
              element={
                <PrivateRoute>
                  <div className="container">
                    <Dashboard />
                  </div>
                </PrivateRoute>
              }
            />
            <Route
              exact
              path="/create-profile"
              element={
                <PrivateRoute>
                  <div className="container">
                    <CreateProfile />
                  </div>
                </PrivateRoute>
              }
            />
            <Route
              exact
              path="/edit-profile"
              element={
                <PrivateRoute>
                  <div className="container">
                    <EditProfile />
                  </div>
                </PrivateRoute>
              }
            />
            <Route
              exact
              path="/add-experience"
              element={
                <PrivateRoute>
                  <div className="container">
                    <AddExperience />
                  </div>
                </PrivateRoute>
              }
            />
            <Route
              exact
              path="/add-education"
              element={
                <PrivateRoute>
                  <div className="container">
                    <AddEducation />
                  </div>
                </PrivateRoute>
              }
            />

            <Route
              exact
              path="/register"
              element={
                <div className="container">
                  <Register />
                </div>
              }
            />
          </Routes>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
