import React, { useState, useEffect } from "react";
import "./App.css";
import TodoApp from "./TodoApp";
import Login from "./Login";


//rajesh
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check for authentication status in localStorage on mount
  useEffect(() => {
    const loggedInStatus = JSON.parse(localStorage.getItem("isAuthenticated"));
    if (loggedInStatus) {
      setIsAuthenticated(true);
    }
  }, []);

  // Function to handle successful login
  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem("isAuthenticated", JSON.stringify(true));
  };

  // Function to handle logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated");
  };

  return (
    <div className="App">
      {isAuthenticated ? (
        <TodoApp onLogout={handleLogout} />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
