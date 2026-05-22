import chalk from "chalk";
import type Task from "../types/task.js";
import { saveTasks } from "../utils/storage.js";

export default function markTask(
  tasks: Task[],
  payload: string,
  action: "todo" | "in-progress" | "done",
  path: string,
): Task[] {
  const idToMark = parseInt(payload, 10);
  if (isNaN(idToMark)) {
    console.log(
      chalk.red(
        `The Task ID must be a number. Please provide a valid NUMBER to mark as ${action}.`,
      ),
    );
    return tasks;
  }
  const getIndexToMark = tasks.findIndex((task) => task.id === idToMark);
  if (getIndexToMark === -1) {
    console.log(chalk.red(`No task found with ID ${idToMark}.`));
  } else {
    tasks[getIndexToMark]!.status = action;
    tasks[getIndexToMark]!.updatedAt = new Date();

    saveTasks(tasks, path, `with ID ${idToMark} marked as ${action}`, "yellow");
  }
  return tasks;
}
