import "./style.css";
import  ProjectAndTodo from "./modules/ProjectAndTodo.js";
import TodayQuest from "./modules/TodayQuest.js";
import CreateProject from "./modules/CreateProject.js";
import CreateTodo from "./modules/CreateTodo.js";

//The entry point of the project. Import module 
//pages here.

//Menu switching logic will go here.

const appManage = ProjectAndTodo();

const todayQuestPage = TodayQuest();

const createProjectPage = CreateProject();

const createTodoPage = CreateTodo();


// appManage.createProject("project 1");
// appManage.createProject("project 2");

// appManage.createTodo("todo 1", "fewwe","fewewff","fwefweew","incomplete", "Default Project");
// appManage.createTodo("todo 2", "fewwe","fewewff","fwefweew","incomplete", "Default Project");
// appManage.createTodo("todo 4", "this is another description.","01/01/20","high","incomplete", "Default Project");

//First time render, or page open render
// todayQuestPage.generateTodayQuest();

// createProjectPage.generateCreateProject();

// createTodoPage.generateCreateTodo();


