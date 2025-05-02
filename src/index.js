import "./style.css";
import  ProjectAndTodo from "./modules/ProjectAndTodo.js";
import TodayQuest from "./modules/TodayQuest.js";

//The entry point of the project. Import module 
//pages here.

//Menu switching logic will go here.

const appManage = ProjectAndTodo();

// appManage.createProject("project 1");

// appManage.createTodo("new todo 2", "dqwdwq", "dqqdw", "dwqq", "project 1");

appManage.updateTodo("new todo 1", "project 1", "new todo 8", "fewfew", "fweefw", "fewfew");

const todayQuestPage = TodayQuest();

todayQuestPage.generateTodayQuest();




