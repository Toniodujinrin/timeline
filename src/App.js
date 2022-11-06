import React, { Component } from "react";
import Signup from "./signup";
import Login from "./login";
import { QueryClient, QueryClientProvider } from "react-query";

import Wrapper from "./NavWrapper";
import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import Home from "./home";
import NotFound from "./notFound";
export const themeContext = React.createContext();
const App = () => {
  const user =
    typeof localStorage.getItem("user") == "string" &&
    localStorage.getItem("user").length !== 0
      ? JSON.parse(localStorage.getItem("user"))
      : null;

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
              <Route
                path="/dashboard/*"
                element={
                  user && user.expires > Date.now() ? (
                    <Wrapper />
                  ) : (
                    <Navigate to="/login" replace />
                  )
                }
              />

              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Home />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </React.Fragment>
        </QueryClientProvider>
      </themeContext.Provider>
    </div>
  );
};

export default App;
