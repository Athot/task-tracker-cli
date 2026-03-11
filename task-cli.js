const fs = require("fs");
const FILE = "tasks.json";
const args = process.argv.slice(2);
let command = args[0];
let description = args[1];
function loadTasks() {
  if (!fs.existsSync(FILE)) {
    fs.writeFileSync(FILE, JSON.stringify([]));
  }
  const data = fs.readFileSync(FILE);
  return JSON.parse(data);
}

function saveTask(tasks) {
  fs.writeFileSync(FILE, JSON.stringify(tasks, null, 2));
}

function addTask() {
  const tasks = loadTasks();
  const newID = tasks.length > 0 ? Math.max(...tasks.map((t) => t.id)) + 1 : 1;
  const newTask = {
    id: newID,
    description: description,
    status: "todos",
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  tasks.push(newTask);
  saveTask(tasks);
  console.log(`Task added succesfully (ID ${newTask.id})`);
}

function listAllTasks() {
  const tasks = loadTasks();
  tasks.forEach((tasks) => {
    console.log(
      `${tasks.id} | ${tasks.description} | ${tasks.status} | ${tasks.createdAt} | ${tasks.updatedAt}`,
    );
  });
}

function updatedList(id, description) {
  console.log(`ID ${id} and description ${description}`);
  // filter the id out
  const tasks = loadTasks();
  const task = tasks.find((t) => t.id == id);
  if (!task) {
    console.log("This ID is not found");
    return;
  }

  //   if the task is found
  task.description = description;
  task.updatedAt = new Date();
  saveTask(tasks);
  console.log("Updated successfully");
}
// now will do the delted one
function deleteTask(id) {
  console.log(id);
  const task = loadTasks();
  const taskID = task.find((t) => t.id == id);
  if (taskID) {
    const newTask = task.filter((t) => t.id != id);
    saveTask(newTask);
    listAllTasks();
  } else {
    console.log("ID is not found");
  }
}

// now we will use switch case for updated one

switch (command) {
  case "add":
    addTask();
    break;

  case "list":
    listAllTasks();
    break;

  case "update":
    updatedList(args[1], args[2]);
    break;
  case "delete":
    deleteTask(args[1]);
    break;

  default:
    console.log("Unknown command");
}
