import chalk from "chalk";
import type Task from "../types/task.js";

export default function list(tasks: Task[], payload?: string) {
  if (tasks.length === 0) {
    console.log("No tasks found. Please add some tasks to the list.");
    return;
  }

  if (!payload) {
    console.log(chalk.magenta("All tasks:"));
    console.log(tasks);
    return;
  }

  const filteredTasks = tasks.filter((task) => task.status === payload);

  if (filteredTasks.length === 0) {
    console.log(chalk.red(`No tasks found with status "${payload}".`));
  } else {
    console.log(chalk.blue(`Tasks with status "${payload}":`));
    console.log(filteredTasks);
  }

  return;
}
