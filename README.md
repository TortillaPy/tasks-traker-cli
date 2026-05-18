# Task Tracker CLI 📝

A Command Line Interface (CLI) application built with TypeScript and Node.js to manage daily tasks. This project demonstrates the use of the local file system (`fs`), array manipulation, and strict typing, saving data persistently in a JSON file.

## What I Learned
Building this project was a huge stepping stone for my backend and TypeScript skills. Key takeaways include:
* **Data Persistence:** Using Node.js native `fs` module (`readFileSync`, `writeFileSync`) to read, write, and format data using `JSON.parse()` and `JSON.stringify(data, null, 2)` for readability.
* **TypeScript Execution:** Overcoming Node's native module execution errors (`ERR_UNKNOWN_FILE_EXTENSION`) and learning to run TypeScript files on the fly using tools like `tsx`.
* **Advanced Array Methods:** Mastering `.filter()` to delete or sort tasks, `.findIndex()` to safely update specific elements without losing the rest of the dataset, and the modern `.at(-1)` to dynamically calculate sequential IDs.
* **TypeScript Strictness:** Learning how to handle "possibly undefined" warnings using the non-null assertion operator (`!`) when accessing array elements, and converting types safely.
* **Edge Case Handling:** Preventing app crashes by validating user input (e.g., using `isNaN()` for IDs) and safely handling scenarios where the database (array) might be completely empty.

## Features
* **Full CRUD:** Create, read, update, and delete tasks.
* **State Management:** Move tasks seamlessly through `todo`, `in-progress`, and `done` statuses.
* **Filters:** View your entire inventory or filter by a specific status.
* **Persistence:** Data is not lost when the terminal is closed; everything is safely stored in `tasks.json`.

## Technologies Used
* TypeScript
* Node.js

## Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

## How to Use

The project runs using `tsx` to compile TypeScript on the fly. From your terminal, use the following commands:

**Add a new task:**
\`\`\`bash
npx tsx Task-CLI.ts add "Buy groceries"
\`\`\`

**List all tasks:**
\`\`\`bash
npx tsx Task-CLI.ts list
\`\`\`

**List tasks by status (todo, in-progress, done):**
\`\`\`bash
npx tsx Task-CLI.ts list in-progress
\`\`\`

**Update a task's description (requires ID):**
\`\`\`bash
npx tsx Task-CLI.ts update 1 "Buy groceries for the whole week"
\`\`\`

**Change a task's status (requires ID):**
\`\`\`bash
npx tsx Task-CLI.ts mark-in-progress 1
npx tsx Task-CLI.ts mark-done 1
\`\`\`

**Delete a task (requires ID):**
\`\`\`bash
npx tsx Task-CLI.ts delete 1
\`\`\`

## Acknowledgements
This project was built following the backend developer project ideas from [roadmap.sh](https://roadmap.sh/projects/task-tracker). Thank you to the community for providing excellent structured paths and practical challenges for continuous learning.