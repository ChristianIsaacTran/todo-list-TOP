import "./style.css";
import ProjectAndTodo from "./modules/ProjectAndTodo.js";
import TodayQuest from "./modules/TodayQuest.js";
import CreateProject from "./modules/CreateProject.js";
import CreateTodo from "./modules/CreateTodo.js";
import ViewAllProjects from "./modules/ViewAllProjects.js";

//The entry point of the project. Import module 
//pages here.

//Menu switching logic will go here.

const appManage = ProjectAndTodo();

const todayQuestPage = TodayQuest();

const createProjectPage = CreateProject();

const createTodoPage = CreateTodo();

const viewAllProjectsPage = ViewAllProjects();


//First time render, or page open render
todayQuestPage.generateTodayQuest();


//Add page switching logic now that the web pages are built

//links to the different pages
const todayQuestLink = document.querySelector(".today-quest-link");
const createTodoLink = document.querySelector(".create-todo-link");
const createProjectLink = document.querySelector(".create-project-link");
const viewAllProjectsLink = document.querySelector(".view-all-projects-link");



//clears all the content in the content div in HTML. Used for re-rendering 
function clearContentPage() {
    //Used for clearing and re-rendering the different web pages
    const contentDiv = document.querySelector("#content"); //used to search inside content div

    //Get all items inside contentDiv
    const selectAllContent = contentDiv.querySelectorAll("*");

    selectAllContent.forEach(function (htmlElement) {
        htmlElement.remove();
    });
}

//Event listeners for navigation
todayQuestLink.addEventListener("click", function (e) {
    e.preventDefault();
    clearContentPage();
    todayQuestPage.generateTodayQuest();
});

createTodoLink.addEventListener("click", function (e) {
    e.preventDefault();
    clearContentPage();
    createProjectPage.generateCreateProject();
});

createProjectLink.addEventListener("click", function (e) {
    e.preventDefault();
    clearContentPage();
    createTodoPage.generateCreateTodo();
});

viewAllProjectsLink.addEventListener("click", function (e) {
    e.preventDefault();
    clearContentPage();
    viewAllProjectsPage.generateViewAllProjects();
});






