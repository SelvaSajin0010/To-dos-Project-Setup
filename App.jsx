import { useState } from "react";
import "./App.css";

function App() {
  // Initial data
  const initialProjects = [
    {
      id: 1,
      title: "Website Redesign",
      tasks: [
        { id: 1, text: "Create wireframe", isDone: false },
        { id: 2, text: "Set up color palette", isDone: true },
      ],
    },
    {
      id: 2,
      title: "Marketing Campaign",
      tasks: [{ id: 1, text: "Write blog post", isDone: false }],
    },
  ];

  const [projects, setProjects] = useState(initialProjects);
  const [projectTitle, setProjectTitle] = useState("");
  const [todoText, setTodoText] = useState("");

  // Create a new project
  const addProject = () => {
    if (!projectTitle.trim()) return;

    const newProject = {
      id: Date.now(),
      title: projectTitle,
      tasks: [],
    };

    setProjects([...projects, newProject]);
    setProjectTitle("");
  };

  // Add Todo to project
  const addTodo = (projectId) => {
    if (!todoText.trim()) return;

    setProjects((prev) =>
      prev.map((project) =>
        project.id === projectId
          ? {
              ...project,
              tasks: [
                ...project.tasks,
                {
                  id: Date.now(),
                  text: todoText,
                  isDone: false,
                },
              ],
            }
          : project
      )
    );

    setTodoText("");
  };

  // Toggle Todo Done / Undone
  const toggleTodo = (projectId, taskId) => {
    setProjects((prev) =>
      prev.map((project) =>
        project.id === projectId
          ? {
              ...project,
              tasks: project.tasks.map((task) =>
                task.id === taskId ? { ...task, isDone: !task.isDone } : task
              ),
            }
          : project
      )
    );
  };

  // Delete Todo
  const deleteTodo = (projectId, taskId) => {
    setProjects((prev) =>
      prev.map((project) =>
        project.id === projectId
          ? {
              ...project,
              tasks: project.tasks.filter((t) => t.id !== taskId),
            }
          : project
      )
    );
  };

  // Delete Project
  const deleteProject = (projectId) => {
    setProjects((prev) => prev.filter((p) => p.id !== projectId));
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Project Manager</h1>

      {/* Create Project */}
      <div>
        <input
          type="text"
          placeholder="Enter project title"
          value={projectTitle}
          onChange={(e) => setProjectTitle(e.target.value)}
        />
        <button onClick={addProject}>Add Project</button>
      </div>

      <hr />

      {/* Show Projects */}
      {projects.map((project) => (
        <div
          key={project.id}
          style={{
            border: "1px solid gray",
            marginBottom: "20px",
            padding: "15px",
            borderRadius: "10px",
          }}
        >
          <h2>
            {project.title}
            <button
              onClick={() => deleteProject(project.id)}
              style={{
                float: "right",
                background: "red",
                color: "white",
                border: "none",
                padding: "5px 10px",
              }}
            >
              Delete Project
            </button>
          </h2>

          {/* Add Todo */}
          <input
            type="text"
            placeholder="Add todo..."
            value={todoText}
            onChange={(e) => setTodoText(e.target.value)}
          />
          <button onClick={() => addTodo(project.id)}>Add Todo</button>

          {/* Todo List */}
          <ul>
            {project.tasks.map((task) => (
              <li key={task.id} style={{ marginTop: "5px" }}>
                <input
                  type="checkbox"
                  checked={task.isDone}
                  onChange={() => toggleTodo(project.id, task.id)}
                />
                <span
                  style={{
                    marginLeft: "10px",
                    textDecoration: task.isDone ? "line-through" : "none",
                  }}
                >
                  {task.text}
                </span>
                <button
                  onClick={() => deleteTodo(project.id, task.id)}
                  style={{
                    marginLeft: "10px",
                    background: "crimson",
                    color: "#fff",
                    border: "none",
                    padding: "4px 8px",
                  }}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default App;
