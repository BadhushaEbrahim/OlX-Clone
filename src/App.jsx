import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { AuthContext, PostContext } from "./Store/Context";
/**
 * ===== Import Components =====
 */
import Home from './Pages/Home';
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import Create from './Pages/Create'
import View from './Pages/ViewPost';

function App() {
  const { user, setUser } = useContext(AuthContext);
  const { postDetails, setPostDetails } = useContext(PostContext)
  useEffect(() => {
    const auth = getAuth()
    onAuthStateChanged(auth, (user) => {
      setUser(user)
    })
  });
  return (
    <Router>
      <AuthContext.Provider value={{ user, setUser }}>
        <PostContext.Provider value={{ postDetails, setPostDetails }}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/login' element={<Login />} />
            <Route path='/create' element={<Create />} />
            <Route path="/viewpost" element={<View />} />
          </Routes>
        </PostContext.Provider>
      </AuthContext.Provider>
    </Router>
  );
}

export default App;
