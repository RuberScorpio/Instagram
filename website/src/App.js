import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import { useState, useEffect } from "react";
import { AuthContext } from "./services/AuthContext";
import { PrivateRoute } from "./services/PrivateRoute";
import axios from "axios";
import './App.css';
import Entry from "./pages/Entry";
import Home from "./pages/Home";
import UserProfile from "./pages/UserProfile";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {

  const [login, setLogin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect (() => {
    if(localStorage.getItem("AuthToken")) {
      checkAuth();
    } else {
      setLoading(false);
    }
  }, [])
  
  async function checkAuth() {
    let response = await axios.get("http://localhost:5555/users/auth",
      {
        headers: {
          authToken: localStorage.getItem("AuthToken"),
        }
      }
    )
    
    if(response?.data?.error) {
      toast.error(response.data.error);
    } else if(response?.data?.user) {
      setLogin(response?.data?.user)
    }
    setLoading(false);
  }

  if(loading) {
    return <></>
  }

  return (
    <>
      <AuthContext.Provider value={{ login, setLogin }}>
        <Router>
          <Routes>
            <Route path="/entry" element={<Entry />} />
            <Route path="/home" element={<PrivateRoute />}>
              <Route path="/home" element={<Home />} />
            </Route>
            <Route path="/user/:username" element={<PrivateRoute />}>
              <Route path="/user/:username" element={<UserProfile />} />
            </Route>
            <Route path="*" element={<Navigate to={login  ? "/home" : "/entry"} />} />
          </Routes>
        </Router>
      </AuthContext.Provider>
      <ToastContainer />
    </>
  );
}

export default App;
