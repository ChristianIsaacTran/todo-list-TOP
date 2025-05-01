import "./style.css";
import  ProjectAndTodo from "./modules/ProjectAndTodo.js";
import TodayQuest from "./modules/TodayQuest.js";

//The entry point of the project. Import module 
//pages here.

//Menu switching logic will go here.

const appManage = ProjectAndTodo();

// appManage.createProject("project 6");

const todayQuestPage = TodayQuest();

todayQuestPage.generateTodayQuest();




