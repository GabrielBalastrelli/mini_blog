import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import {onAuthStateChanged} from "firebase/auth";

import {AuthProvider} from "./context/AuthContext";
import createRegister from "./hooks/createRegister";

import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

import Register from "./pages/Register/Register";
import About from "./pages/About/About";
import Home from "./pages/Home/Home";
import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Login/Login";
import CreatePost from "./pages/CreatePost/CreatePost";
import Post from "./pages/Post/Post";
import Search from "./pages/Search/Search";
import Edit from "./pages/Edit/Edit";

import './App.css'


function App() {
  const {auth} = createRegister();

  const [user, setUser] = useState(undefined);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    })
  }, [auth])

  const loadingUser = user === undefined;

  if(loadingUser){
    return <span>Carregando...</span>
  }
  return (
    <AuthProvider value={{user}}>
      <Router>
        <NavBar/>
        <div className="container">
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/home" element={<Home/>}/>
            <Route path="/about"  element={<About/>}/>
            <Route path="/search" element={<Search/>}/>
            <Route path="/post/:id" element={<Post/>} />
            <Route path="/register" element={!user ? <Register/> : <Navigate to="/"/>}/>
            <Route path="/login" element={!user ? <Login/> : <Navigate to="/"/>}/>
            <Route path="/dashboard" element={user ? <Dashboard/> : <Navigate to="/"/>}/>
            <Route path="/create/post" element={user ? <CreatePost/> : <Navigate to="/"/>}/>
            <Route path="/posts/edit/:id" element={user ? <Edit/> : <Navigate to="/"/>}/>
          </Routes> 
        </div>
        <Footer/>
     </Router>
   </AuthProvider>
  )
}

export default App
