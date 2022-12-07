import React, { Component } from "react";
import Signup from "./signup";
import Login from "./login";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Wrapper from "./NavWrapper";
import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import Home from "./home";
import NotFound from "./notFound";
export const themeContext = React.createContext();
const App = () => {
  const client = new QueryClient();

  const [darkMode, setDarkMode] = useState(false);
  const changeTheme = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    if (darkMode) {
      document.body.style.backgroundColor = "black";
    } else document.body.style.backgroundColor = "white";
  }, [darkMode]);
  return (
    <div className={`${darkMode && `dark`}`}>
      <themeContext.Provider value={changeTheme}>
        <QueryClientProvider client={client}>
          <React.Fragment>
            <Routes>
              <Route path="/dashboard/*" element={<Wrapper />} />

              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Home />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </React.Fragment>
        </QueryClientProvider>
      </themeContext.Provider>
      <ToastContainer />
    </div>
  );
};

export default App;
