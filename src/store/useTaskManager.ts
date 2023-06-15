import { Task } from "@/pages/tasks";
import { create } from "zustand";

const useTaskManager = create((set) => ({
  tasks: [],
  search: "",
  setSearch: (searched: string) => {
    useTaskManager.search = searched;
  },
  addTask: (task: Task) =>
    set((state: any) => ({ tasks: [...state.tasks, task] })),
  updateTask: (index: unknown, task: Task) =>
    set((state: any) => ({
      tasks: state.tasks.map((t: any, i: any) => (i === index ? task : t)),
    })),
  deleteTask: (index: unknown) =>
    set((state: any) => ({
      tasks: state.tasks.filter((i: any) => i.id !== index),
    })),
}));
export default useTaskManager;
