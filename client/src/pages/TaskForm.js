import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const TaskForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("Medium");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const fetchTask = async () => {
        try {
          const res = await axios.get(`/api/tasks/${id}`, {
            headers: { "x-auth-token": localStorage.getItem("token") },
          });
          setTitle(res.data.title);
          setDescription(res.data.description);
          setDueDate(res.data.dueDate);
          setPriority(res.data.priority);
        } catch (err) {
          console.error(err);
        }
      };
      fetchTask();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const taskData = { title, description, dueDate, priority };

    try {
      if (id) {
        await axios.put(`/api/tasks/${id}`, taskData, {
          headers: { "x-auth-token": localStorage.getItem("token") },
        });
      } else {
        await axios.post("/api/tasks", taskData, {
          headers: { "x-auth-token": localStorage.getItem("token") },
        });
      }
      navigate("/tasks");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>{id ? "Edit Task" : "New Task"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <button type="submit">{id ? "Update Task" : "Create Task"}</button>
      </form>
    </div>
  );
};

export default TaskForm;
