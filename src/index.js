import "./style.css";
import project from "./modules/project.js";
import todo from "./modules/todo.js";

//The entry point of the project. Import module 
//pages here.

//Menu switching logic will go here.

const projectManage = project();
const todoManage = todo();

// projectManage.createProject("new project 1");
todoManage.createTodo("do laundry 2", "Do all of the laundry in my room", "1/1/25", "medium", "new project 1");
// todoManage.getTodo("do laundry", "new project 2");