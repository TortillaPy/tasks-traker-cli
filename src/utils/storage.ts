import * as fs from "fs";
import chalk from "chalk";
import type Task from "../types/task.js";
import type { ChalkColor } from "./colors.js";

/**
 * Loads tasks from the JSON file. If the file does not exist, it creates it with an empty array.
 */
export function readTasks(filePath: string): Task[] {
  try {
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, "[]");
      return [];
    }

    const fileContent = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(fileContent) as Task[];
  } catch (error) {
    throw new Error(
      `Failed to load tasks from ${filePath}: ${(error as Error).message}`,
    );
  }
}

/**
 * Saves tasks to the JSON file and prints a colored success message.
 */
export function saveTasks(
  tasks: Task[],
  filePath: string,
  action = "actions",
  color: ChalkColor = "yellow",
): void {
  try {
    fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));
    console.log(chalk[color](`Task ${action} successfully!`));
  } catch (error) {
    throw new Error(
      `Failed to save tasks to ${filePath}: ${(error as Error).message}`,
    );
  }
}
