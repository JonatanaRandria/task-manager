import { Task } from "@/pages/tasks";
import { create } from "zustand";

const useTaskManager = create((set) => ({
  tasks: [],
  search: "",
  addTask: (task: Task) =>
    set((state: any) => ({ tasks: [...state.tasks, task] })),
  updateTask: (index: unknown, task: Task) =>
    set((state: any) => ({
      tasks: state.tasks.map((t: any, i: any) => (i === index ? task : t)),
    })),
  deleteTask: (index: unknown) =>
    set((state: any) => ({
      tasks: state.tasks.filter((_: any, i: any) => i !== index),
    })),
}));
export default useTaskManager;
