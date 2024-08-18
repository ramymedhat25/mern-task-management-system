import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get("/api/tasks", {
          headers: { "x-auth-token": localStorage.getItem("token") },
        });
        setTasks(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTasks();
  }, []);

  return (
    <div>
      <h2>Task List</h2>
      <Link to="/tasks/new">Add New Task</Link>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            {task.title}
            <Link to={`/tasks/edit/${task._id}`}>Edit</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
