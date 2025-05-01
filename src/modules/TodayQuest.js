import ProjectAndTodo from "./ProjectAndTodo.js";

//Main homepage module. A summary of the current project selected
//Generate Today Quest content

function TodayQuest() {

    //Main generation function
    function generateTodayQuest() {
        //Generate base containers
        const contentContainer = document.querySelector("#content");
        const todayQuestHeader = document.createElement("h1");
        const projectContainer = document.createElement("div");
        const projectHeader = document.createElement("div");
        const todoContainer = document.createElement("div");

        //add attributes and content to static elements
        todayQuestHeader.setAttribute("class", "today-quest-header");
        todayQuestHeader.textContent = "Today's Quest: ";
        projectContainer.setAttribute("class", "project-container");
        projectHeader.setAttribute("class", "project-header");
        todoContainer.setAttribute("class", "todo-container");


        /*
        Checks if localStorage is empty and dynamically creates/displays projects depending on if it is empty
        1. if localStorage is empty = create a default project to display
        2. if localStorage is full = display the first project from localStorage
        */
        const tempProj = checkLocalStorageEmpty();

        generateProjHeader(projectHeader, tempProj);

        for (let todo of tempProj.todos) {
            generateTodoCard(todoContainer, todo);
        }


        //Construct main container
        projectContainer.appendChild(projectHeader);
        projectContainer.appendChild(todoContainer);
        contentContainer.appendChild(todayQuestHeader);
        contentContainer.appendChild(projectContainer);

    }

    function generateProjHeader(projectHeader, tempProj) {
        const projectName = document.createElement("h2");
        const projHeaderButtons = document.createElement("div");
        const changeProjNameButton = document.createElement("button");
        const changeQuestButton = document.createElement("button");

        //add attributes and content
        projectName.textContent = tempProj.name; //Project name placeholder
        projHeaderButtons.setAttribute("class", "project-header-buttons");
        changeProjNameButton.setAttribute("class", "change-proj-name");
        changeProjNameButton.textContent = "Edit Project";
        changeQuestButton.setAttribute("class", "change-quest-button");
        changeQuestButton.textContent = "Change Quest";

        //Construct the HTML elements together
        projHeaderButtons.appendChild(changeProjNameButton);
        projHeaderButtons.appendChild(changeQuestButton);
        projectHeader.appendChild(projectName);
        projectHeader.appendChild(projHeaderButtons);
    }

    function generateTodoCard(todoContainer, todoObj) {
        const todoCard = document.createElement("div");
        const cardLeft = document.createElement("div");
        const cardRight = document.createElement("div");
        const completeButton = document.createElement("button");
        const todoTitle = document.createElement("p");
        const todoDueDate = document.createElement("p");
        const editButton = document.createElement("button");
        const removeButton = document.createElement("button");

        //add attributes and content
        todoCard.setAttribute("class", "todo-card");
        cardLeft.setAttribute("class", "card-left");
        cardRight.setAttribute("class", "card-right");
        completeButton.setAttribute("class", "todo-complete");
        completeButton.textContent = "Complete";
        todoTitle.setAttribute("class", "todo-title");
        todoTitle.textContent = todoObj.title; 
        todoDueDate.setAttribute("class", "todo-due-date");
        todoDueDate.textContent = todoObj.dueDate; 
        editButton.setAttribute("class", "todo-edit-button");
        editButton.textContent = "Edit";
        removeButton.setAttribute("class", "todo-remove-button");
        removeButton.textContent = "Remove";

        //Construct HTML elements
        cardLeft.appendChild(completeButton);
        cardLeft.appendChild(todoTitle);
        cardLeft.appendChild(todoDueDate);
        cardRight.appendChild(editButton);
        cardRight.appendChild(removeButton);
        todoCard.appendChild(cardLeft);
        todoCard.appendChild(cardRight);

        //Add card to todo container
        todoContainer.appendChild(todoCard);
    }

    function checkLocalStorageEmpty() {
        //This is a utility function to check if the user is loading the App for the first time, or checks if there is nothing in the localStorage.
        const appManage = ProjectAndTodo();
        //If there is nothing in localStorage, then create a default project to display to the user
        if (localStorage.length === 0) { //Default project display
            appManage.createProject("Default Project");
            appManage.createTodo("Default Todo", "Description goes here", "01/01/2025", "high", "Default Project");
            return appManage.getProject("Default Project");
        }
        
        //If there IS something in localStorage, get the first project from localStorage
        return appManage.getFirstProject();

        
    }

   

    return { generateTodayQuest };
}

export default TodayQuest;