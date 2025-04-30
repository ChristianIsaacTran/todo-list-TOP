import "./style.css";
import  ProjectAndTodo from "./modules/ProjectAndTodo.js";

//The entry point of the project. Import module 
//pages here.

//Menu switching logic will go here.

const appManage = ProjectAndTodo();

// appManage.createTodo("do laundry 3 ", "weewfwf", "21312", "dwqqd", "new project 1");
// console.log(appManage.getTodo("do laundry 2103", "new project 3"));

appManage.removeTodo("do laundry", "new project 1");