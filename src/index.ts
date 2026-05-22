import type Task from "./types/task.js";
import { readTasks, saveTasks } from "./utils/storage.js";
import { handlers } from "./commands/handlers.js";

const TASKS_FILE = "tasks.json";
let tasks: Task[] = [];

// Load tasks with error handling
try {
  tasks = readTasks(TASKS_FILE);
} catch (error) {
  console.error("Error loading tasks:", (error as Error).message);
  process.exit(1);
}

const args: string[] = process.argv.slice(2);
const action = args[0] || "help";
const payload = args[1];
const updatePayload = args[2];

// Get handler
const handler = handlers[action];

if (!handler) {
  console.error(`Command not recognized: "${action}"`);
  console.log('Type "help" for available commands.\n');
  process.exit(1);
}

// Validate payload if required
if (handler.requiresPayload && !payload) {
  console.error(`Command "${action}" requires a value.`);
  process.exit(1);
}

// Execute handler with error handling
try {
  const result = handler.run(tasks, payload, updatePayload, TASKS_FILE);
  tasks = result;

  // Save to file if not list or help
  if (!["list", "help"].includes(action)) {
    saveTasks(tasks, TASKS_FILE, handler.label, handler.color);
  }
} catch (error) {
  console.error(`Error executing "${action}":`, (error as Error).message);
  process.exit(1);
}
