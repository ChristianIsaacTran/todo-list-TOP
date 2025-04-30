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
        projectName.textContent = "(Placeholder project name)";
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

    }

    return {generateTodayQuest};
}

export default TodayQuest;