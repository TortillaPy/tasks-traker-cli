import type Task from "../types/task.js";
import type { ChalkColor } from "../utils/colors.js";
import add from "./add.js";
import list from "./list.js";
import deleteTask from "./delete.js";
import update from "./update.js";
import markTask from "./mark.js";

export interface Handler {
  run: (
    tasks: Task[],
    payload?: string,
    updatePayload?: string,
    filePath?: string,
  ) => Task[];
  label: string;
  color: ChalkColor;
  requiresPayload: boolean;
  description: string;
}

export const handlers: Record<string, Handler> = {
  add: {
    run: (tasks, payload) => {
      add(tasks, payload!);
      return tasks;
    },
    label: "added",
    color: "magenta",
    requiresPayload: true,
    description: "Add a new task",
  },
  list: {
    run: (tasks, payload) => {
      list(tasks, payload);
      return tasks;
    },
    label: "listed",
    color: "blue",
    requiresPayload: false,
    description: "List all tasks (or filter by status)",
  },
  delete: {
    run: (tasks, payload, _, filePath) =>
      deleteTask(tasks, payload!, filePath!),
    label: "deleted",
    color: "red",
    requiresPayload: true,
    description: "Delete a task by ID",
  },
  update: {
    run: (tasks, payload, updatePayload, filePath) =>
      update(tasks, payload!, updatePayload!, filePath!),
    label: "updated",
    color: "green",
    requiresPayload: true,
    description: "Update task description",
  },
  "mark-in-progress": {
    run: (tasks, payload, _, filePath) =>
      markTask(tasks, payload!, "in-progress", filePath!),
    label: "marked as in-progress",
    color: "yellow",
    requiresPayload: true,
    description: "Mark task as in-progress",
  },
  "mark-done": {
    run: (tasks, payload, _, filePath) =>
      markTask(tasks, payload!, "done", filePath!),
    label: "marked as done",
    color: "green",
    requiresPayload: true,
    description: "Mark task as done",
  },
  help: {
    run: () => {
      console.log("\nTask Tracker CLI - Available Commands:\n");
      Object.entries(handlers).forEach(([cmd, handler]) => {
        if (cmd !== "help") {
          const payload = handler.requiresPayload
            ? " <id|value>"
            : " [optional]";
          console.log(`  ${cmd}${payload}`);
          console.log(`    ${handler.description}\n`);
        }
      });
      return [];
    },
    label: "help displayed",
    color: "blue",
    requiresPayload: false,
    description: "Show this help message",
  },
};
