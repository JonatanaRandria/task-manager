import useTaskManager from "@/store/useTaskManager";
import React, { ChangeEvent, useRef } from "react";

export interface Task {
  id: number;
  title: string;
  completed: boolean;
}

const TaskManager = () => {
  const createTaskRef = useRef<string>("");
  const tasks = useTaskManager((state) => state.tasks);
  const { addTask, updateTask, deleteTask } = useTaskManager();
  const handleAddTask = () => {
    const title = createTaskRef.current.value;
    const newTask: Task = {
      id: Date.now(),
      title,
      completed: false,
    };
    console.log(title);

    addTask(newTask);
  };

  const handleUpdateTask = (taskId: number, updatedTask: Task) => {
    updateTask(taskId, updatedTask);
  };

  const handleDeleteTask = (taskId: number) => {
    deleteTask(taskId);
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    createTaskRef.current = e.target.value;
  };

  const filteredTasks = tasks;

  return (
    <div>
      <h1>Task Manager</h1>

      <input type="text" ref={createTaskRef} />

      <button onClick={handleAddTask}>Add Task</button>

      <input type="text" onChange={handleSearch} placeholder="Search Task" />

      <ul>
        {filteredTasks.map((task: any) => (
          <li key={task.id}>
            <input
              type="text"
              value={task.title}
              onChange={(e) =>
                handleUpdateTask(task.id, {
                  title: e.target.value,
                  id: task.id,
                  completed: false,
                })
              }
            />
            <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskManager;
