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
        generateProjHeader(projectHeader);
        generateTodoCard(todoContainer);


        //Construct main container
        projectContainer.appendChild(projectHeader);
        projectContainer.appendChild(todoContainer);
        contentContainer.appendChild(todayQuestHeader);
        contentContainer.appendChild(projectContainer);
        
    }

    function generateProjHeader(projectHeader) {
        const projectName = document.createElement("h2");
        const projHeaderButtons = document.createElement("div");
        const changeProjNameButton = document.createElement("button");
        const changeQuestButton = document.createElement("button");

        //add attributes and content
        projectName.textContent = "(Placeholder project name)"; //Project name placeholder
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

    function generateTodoCard(todoContainer) {
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
        todoTitle.textContent = "Todo 1"; //todo name placeholder
        todoDueDate.setAttribute("class", "todo-due-date");
        todoDueDate.textContent = "2/3/2025"; //Date placeholder
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

    return {generateTodayQuest};
}

export default TodayQuest;