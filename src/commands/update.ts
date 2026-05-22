import type Task from "../types/task.js";
import { saveTasks } from "../utils/storage.js";

export default function update(
  tasks: Task[],
  payload: string,
  updatePayload: string,
  path: string,
): Task[] {
  const idToUpdate = parseInt(payload, 10);
  if (isNaN(idToUpdate)) {
    console.log(
      "The Task ID must be a number. Please provide a valid NUMBER to update.",
    );
    return tasks;
  }

  const getIndex = tasks.findIndex((task) => task.id === idToUpdate);

  if (getIndex === -1) {
    console.log(`No task found with ID ${idToUpdate}.`);
    console.log("All tasks available:");
    tasks.forEach((task) => {
      console.log(`ID: ${task.id}, Description: ${task.description}`);
    });
  } else {
    tasks[getIndex]!.description = updatePayload;
    tasks[getIndex]!.updatedAt = new Date();

    const taskUpdatedString = `with ID ${idToUpdate} updated`;

    saveTasks(tasks, path, taskUpdatedString, "green");
  }
  return tasks;
}
