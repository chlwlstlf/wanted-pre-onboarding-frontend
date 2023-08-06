import React, { Component, useState, useEffect } from "react";
import { Routes, Route, Navigate, HashRouter, BrowserRouter, Redirect } from "react-router-dom";
import SignUp from "./pages/Sign/SignUp.tsx";
import SignIn from "./pages/Sign/SignIn.tsx";
import Todo from "./pages/Todo/Todo.tsx";
import "./App.css";

function App() {
  // localStorage.clear();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    setIsLoggedIn(!!token);
  }, []);

  return (
    <>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route
              path="/"
              element={
                !isLoggedIn ? (
                  <Navigate
                    to="/signin"
                    replace
                  />
                ) : (
                  <Todo />
                )
              }
            />
            <Route
              path="/signup"
              element={
                isLoggedIn ? (
                  <Navigate
                    to="/todo"
                    replace
                  />
                ) : (
                  <SignUp />
                )
              }
            />
            <Route
              path="/signin"
              element={
                isLoggedIn ? (
                  <Navigate
                    to="/todo"
                    replace
                  />
                ) : (
                  <SignIn setIsLoggedIn={setIsLoggedIn} />
                )
              }
            />
            <Route
              path="/todo"
              element={
                !isLoggedIn ? (
                  <Navigate
                    to="/signin"
                    replace
                  />
                ) : (
                  <Todo />
                )
              }
            />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
