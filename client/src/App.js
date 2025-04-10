import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { jwtDecode } from "jwt-decode";
import setAuthToken from "./utils/setAuthHeader";
import { logoutUser, setCurrentUser } from "./actions/authActions";
import store from "./store";
import Register  from "./components/auth/Register";

import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Footer from "./components/layout/Footer";
import Login from "./components/auth/Login";

import "./App.css";

// Check for token 
if (localStorage.jwtToken) {
  // Set Auth token header auth 
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwtDecode(localStorage.jwtToken)
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded))

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    //Logout user 
    store.dispatch(logoutUser)
    //Clear current profile 
    //Redirect to login
    window.location.href = '/login' ;
    
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
