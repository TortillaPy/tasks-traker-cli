import type Task from "../types/task.js";

export default function add(tasks: Task[], payload: string) {
  const isEmpty = tasks.length === 0;
  const id = isEmpty ? 1 : tasks.at(-1)!.id + 1;
  const newTask: Task = {
    id,
    description: payload as string,
    status: "todo",
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  tasks.push(newTask);
  return tasks;
}
