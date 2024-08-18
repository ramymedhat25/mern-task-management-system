// src/App.js
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import TaskList from "./pages/TaskList";
import TaskForm from "./pages/TaskForm";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/tasks"
          element={
            <PrivateRoute>
              <TaskList />
            </PrivateRoute>
          }
        />
        <Route
          path="/tasks/new"
          element={
            <PrivateRoute>
              <TaskForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/tasks/edit/:id"
          element={
            <PrivateRoute>
              <TaskForm />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
