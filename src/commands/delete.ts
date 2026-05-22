import chalk from "chalk";
import type Task from "../types/task.js";
import { saveTasks } from "../utils/storage.js";

export default function deleteTask(
  tasks: Task[],
  payload: string,
  path: string,
): Task[] {
  const idToDelete = parseInt(payload, 10);
  if (isNaN(idToDelete)) {
    console.log(
      chalk.red(
        "The Task ID must be a number. Please provide a valid NUMBER to delete.",
      ),
    );
    return tasks;
  }
  const filteredTasks = tasks.filter((task) => task.id !== idToDelete);
  if (filteredTasks.length === tasks.length) {
    console.log(chalk.red(`No task found with ID ${idToDelete}.`));
  } else {
    const taskDeletedString = `with ID ${idToDelete} deleted`;
    saveTasks(filteredTasks, path, taskDeletedString, "green");
  }
  return filteredTasks;
}
