import * as fs from "fs";

interface Task {
  id: number;
  description: string;
  status: "todo" | "in-progress" | "done";
  createdAt: Date;
  updatedAt: Date;
}

const TASKS_FILE = "tasks.json";
let tasks: Task[] = [];
let filteredTasks: Task[] = [];

if (!fs.existsSync("tasks.json")) {
  fs.writeFileSync("tasks.json", "[]");
} else {
  const fileContent = fs.readFileSync(TASKS_FILE, "utf-8");
  tasks = JSON.parse(fileContent);
}

const args: String[] = process.argv.slice(2);
const action = args[0];
const payload = args[1];
const updatePayload = args[2];

switch (action) {
  case "add":
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
    fs.writeFileSync(TASKS_FILE, JSON.stringify(tasks, null, 2));
    console.log("Task added successfully!");

    break;
  case "list":
    if (payload) {
      filteredTasks = tasks.filter((task) => task.status === payload);
      console.log(filteredTasks);
    } else {
      console.log(tasks);
    }

    break;
  case "delete":
    const idToDelete = parseInt(payload as string, 10);
    if (isNaN(idToDelete)) {
      console.log(
        "The Task ID must be a number. Please provide a valid NUMBER to delete.",
      );
      break;
    }
    filteredTasks = tasks.filter((task) => task.id !== idToDelete);
    if (filteredTasks.length === tasks.length) {
      console.log(`No task found with ID ${idToDelete}.`);
    } else {
      fs.writeFileSync(TASKS_FILE, JSON.stringify(filteredTasks, null, 2));
      console.log(`Task with ID ${idToDelete} deleted successfully!`);
    }

    break;

  case "update": // update description
    const idToUpdate = parseInt(payload as string, 10);
    if (isNaN(idToUpdate)) {
      console.log(
        "The Task ID must be a number. Please provide a valid NUMBER to update.",
      );
      break;
    }
    const getIndex = tasks.findIndex((task) => task.id === idToUpdate);
    if (getIndex === -1) {
      console.log(`No task found with ID ${idToUpdate}.`);
      break;
    } else {
      tasks[getIndex]!.description = updatePayload as string;
      tasks[getIndex]!.updatedAt = new Date();

      fs.writeFileSync(TASKS_FILE, JSON.stringify(tasks, null, 2));
      console.log(`Task with ID ${idToUpdate} updated successfully!`);
    }

    break;

  case "mark-in-progress":
    const idToMarkInProgress = parseInt(payload as string, 10);
    if (isNaN(idToMarkInProgress)) {
      console.log(
        "The Task ID must be a number. Please provide a valid NUMBER to mark as in progress.",
      );
      break;
    }
    const getIndexToMarkInProgress = tasks.findIndex(
      (task) => task.id === idToMarkInProgress,
    );
    if (getIndexToMarkInProgress === -1) {
      console.log(`No task found with ID ${idToMarkInProgress}.`);
      break;
    } else {
      tasks[getIndexToMarkInProgress]!.status = "in-progress";
      tasks[getIndexToMarkInProgress]!.updatedAt = new Date();

      fs.writeFileSync(TASKS_FILE, JSON.stringify(tasks, null, 2));
      console.log(
        `Task with ID ${idToMarkInProgress} marked as in progress successfully!`,
      );
    }

    break;

  case "mark-done":
    const idToMarkDone = parseInt(payload as string, 10);
    if (isNaN(idToMarkDone)) {
      console.log(
        "The Task ID must be a number. Please provide a valid NUMBER to mark as done.",
      );
      break;
    }
    const getIndexToMarkDone = tasks.findIndex(
      (task) => task.id === idToMarkDone,
    );
    if (getIndexToMarkDone === -1) {
      console.log(`No task found with ID ${idToMarkDone}.`);
      break;
    } else {
      tasks[getIndexToMarkDone]!.status = "done";
      tasks[getIndexToMarkDone]!.updatedAt = new Date();

      fs.writeFileSync(TASKS_FILE, JSON.stringify(tasks, null, 2));
      console.log(
        `Task with ID ${idToMarkDone} marked as done successfully!`,
      );
    }

    break;  

  default:
    console.log(
      "Command not recognized. Available commands: add, list, update, delete, mark(-in-progress, -done)",
    );
}
