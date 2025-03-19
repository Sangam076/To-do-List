import { useState, useEffect } from "react";
import './App.css';

function App() {
  const [task_name, setTaskName] = useState("");
  const [task_time, setTime] = useState("");
  const [tasks, setTasks] = useState([]);
  
  const [newName, setNewName] = useState("");
  

  const addTask = async () =>{
    
    const taskData = {
      task_name, 
      task_time,
    }
    try{
      const response = await fetch("http://127.0.0.1:8000/api/create/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),
      });
      const data = await response.json();
      setTasks((prev) => [...prev, data]);
    }
    catch(error){
      console.log(error); 
    }
    setTaskName("");
    setTime("");
  };

  

  useEffect(() => {
    fetchTasks();
  }, []);


  const fetchTasks = async () =>{
    try{
        const response = await fetch("http://127.0.0.1:8000/api/tasks/");
        const data = await response.json();
        setTasks(data);
    }catch(err){
        console.log(err);
    }
  }

  const editTask = async (pk, task_time) => {
    
    const taskData = {
      task_name: newName, 
      task_time,
    };
    console.log("Editing task with ID:", pk);
  console.log("Sending task data:", taskData);
    try{
      const response = await fetch(`http://127.0.0.1:8000/api/tasks/${pk}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),
      });

      const data = await response.json();
      setTasks((prev) => prev.map((task) => {
        if (task.task_id === pk) {
          return data;
        }
        else{
          return task;
        }
      })
      );
  }
    catch(error){
      console.log(error); 
    }   
  };
  const deleteTask = async(pk) => {
      try{
        await fetch(`http://127.0.0.1:8000/api/tasks/${pk}/`,{
          method: "DELETE",
        });
        
        setTasks((prev) => prev.filter((task) => task.task_id !== pk));
      }catch(err){
        console.log(err);
      }
    }

  return (
  <>
    <div className="app-container">
      <div className="app-header">
        <h1>To-Do List</h1>
        <p className="subtitle">Organize your tasks efficiently</p>
      </div>
      
      <div className="task-form">
        <div className="form-group">
          <label>Task Name</label>
          <input 
            type="text" 
            value={task_name} 
            onChange={(e) => setTaskName(e.target.value)} 
            placeholder="What needs to be done?" 
          />
        </div>
        
        <div className="form-group">
          <label>Time (min)</label>
          <input 
            type="number" 
            value={task_time} 
            onChange={(e) => setTime(e.target.value)} 
            placeholder="Duration" 
          />
        </div>
        
        <button className="add-button" onClick={addTask}>Add Task</button>
      </div>
      
      <div className="tasks-section">
        <h2>Your Tasks <span className="task-count">{tasks.length}</span></h2>
        
        <div className="tasks-list">
          {tasks.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">📝</div>
              <p className="empty-state-text">No tasks yet. Start by adding a new task!</p>
            </div>
          ) : (
            tasks.map((task) => (
              <div key={task.task_id} className="task-item">
                <div className="task-content">
                  <div className="task-info">
                    <div className="task-name">{task.task_name}</div>
                    <span className="task-time">{task.task_time} minutes</span>
                  </div>
                  <div className="task-actions">
                    <button className="edit-button" onClick={() => editTask(task.task_id, task.task_time)}>Edit</button>
                    <button className="delete-button" onClick={() => deleteTask(task.task_id)}>Delete</button>
                  </div>
                </div>
                <div className="edit-form">
                  <input
                    type="text"
                    className="edit-input"
                    placeholder="New task name..."
                    onChange={(e) => setNewName(e.target.value)}
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  </>
);
}

export default App;
