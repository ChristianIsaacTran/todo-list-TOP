import "./style.css";
import  ProjectAndTodo from "./modules/ProjectAndTodo.js";
import TodayQuest from "./modules/TodayQuest.js";

//The entry point of the project. Import module 
//pages here.

//Menu switching logic will go here.

const appManage = ProjectAndTodo();

const todayQuestPage = TodayQuest();

// appManage.createProject("project 1");
// appManage.createProject("project 2");

// appManage.createTodo("todo 1", "fewwe","fewewff","fwefweew","incomplete", "project 1");
// appManage.createTodo("todo 2", "fewwe","fewewff","fwefweew","incomplete", "project 1");
// appManage.createTodo("todo 3", "fewwe","fewewff","fwefweew","incomplete", "project 1");

//First time render, or page open render
todayQuestPage.generateTodayQuest();




