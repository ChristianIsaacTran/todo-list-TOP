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

        //Generate html modals for edit/change options
        generateChangeProjNameModal(projectContainer, tempProj);


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
        const buttonPointer1 = document.createElement("div");
        const buttonPointer2 = document.createElement("div");

        //add attributes and content
        projectName.textContent = tempProj.name; //Project name placeholder
        projHeaderButtons.setAttribute("class", "project-header-buttons");
        changeProjNameButton.setAttribute("class", "change-proj-name");
        changeProjNameButton.textContent = "Edit Project Name";
        changeProjNameButton.addEventListener("click", changeProjNameHandler);
        changeQuestButton.setAttribute("class", "change-quest-button");
        changeQuestButton.textContent = "Change Quest";
        buttonPointer1.setAttribute("class", "button-pointer");
        buttonPointer2.setAttribute("class", "button-pointer");
        

        //Construct the HTML elements together
        buttonPointer1.appendChild(changeProjNameButton);
        buttonPointer2.appendChild(changeQuestButton);
        projHeaderButtons.appendChild(buttonPointer1);
        projHeaderButtons.appendChild(buttonPointer2);
        projectHeader.appendChild(projectName);
        projectHeader.appendChild(projHeaderButtons);
    }

    function generateChangeProjNameModal(projectContainer, tempProj) {
        const dialog = document.createElement("dialog");
        const form = document.createElement("form");
        const modalInputsContainer = document.createElement("div");
        const projNameLabel = document.createElement("label");
        const projNameInput = document.createElement("input");
        const modalButtonContainer = document.createElement("div");
        const cancelButton = document.createElement("button");
        const submitButton = document.createElement("button");
        const buttonPointerCancel = document.createElement("div");
        const buttonPointerSubmit = document.createElement("div");

        //add attributes and content
        dialog.setAttribute("class", "change-project-name-modal");
        form.setAttribute("class", "change-project-name-form");
        modalInputsContainer.setAttribute("class", "changeP-modal-inputs");
        projNameLabel.setAttribute("for", "new-proj-name");
        projNameLabel.textContent = "Enter new project name:";
        projNameInput.setAttribute("id", "new-proj-name");
        projNameInput.setAttribute("type", "text");
        projNameInput.setAttribute("name", "projTitle");
        projNameInput.setAttribute("autofocus", "");
        projNameInput.setAttribute("maxlength","20");
        projNameInput.setAttribute("placeholder", "Max 20 characters...")
        modalButtonContainer.setAttribute("class", "changeP-modal-buttons");
        buttonPointerCancel.setAttribute("class", "button-pointer-cancel");
        buttonPointerSubmit.setAttribute("class", "button-pointer-submit");
        cancelButton.setAttribute("type", "button");
        cancelButton.setAttribute("class", "cancel-button");
        cancelButton.textContent = "Cancel";
        submitButton.setAttribute("type", "submit");
        submitButton.setAttribute("class", "submit-button");
        submitButton.textContent = "Submit";

        //button events
        cancelButton.addEventListener("click", function() {
            //reset form, then close modal
            form.reset();
            dialog.close();
        });
        submitButton.addEventListener("click", function(event) {
            event.preventDefault();
            const appManage = ProjectAndTodo();
            const modalData = new FormData(form);

            //USE FORM DATA TO UPDATE PROJECT NAME
            appManage.updateProjectName(tempProj.name, modalData.get("projTitle"));

            //remove content THEN re-render page
            removeTodayQuestPage();
            generateTodayQuest();

            dialog.close();
        });

        //Build HTML
        modalInputsContainer.appendChild(projNameLabel);
        modalInputsContainer.appendChild(projNameInput);
        buttonPointerCancel.appendChild(cancelButton);
        buttonPointerSubmit.appendChild(submitButton);
        modalButtonContainer.appendChild(buttonPointerCancel);
        modalButtonContainer.appendChild(buttonPointerSubmit);
        form.appendChild(modalInputsContainer);
        form.appendChild(modalButtonContainer);
        dialog.appendChild(form);

        //Append modal to project container
        projectContainer.appendChild(dialog);
    }


    function changeProjNameHandler() {
        //Open a modal for options
        const dialog = document.querySelector(".change-project-name-modal");
        dialog.showModal();
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
        const buttonPointer1 = document.createElement("div");
        const buttonPointer2 = document.createElement("div");
        const buttonPointer3 = document.createElement("div");

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
        buttonPointer1.setAttribute("class", "button-pointer");
        buttonPointer2.setAttribute("class", "button-pointer");
        buttonPointer3.setAttribute("class", "button-pointer");

        //Construct HTML elements
        buttonPointer1.appendChild(completeButton);
        cardLeft.appendChild(buttonPointer1);
        cardLeft.appendChild(todoTitle);
        cardLeft.appendChild(todoDueDate);
        buttonPointer2.appendChild(editButton);
        cardRight.appendChild(buttonPointer2);
        buttonPointer3.appendChild(removeButton);
        cardRight.appendChild(buttonPointer3);
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

    //Utility function to remove entire page. Used to help with re-rendering
    function removeTodayQuestPage() {
        //query header and project-container and remove them to wipe page
        const todayQuestHeader = document.querySelector(".today-quest-header");
        const projectContainer = document.querySelector(".project-container");

        //remove entire page from DOM
        todayQuestHeader.remove();  
        projectContainer.remove();
    }

    return { generateTodayQuest };
}

export default TodayQuest;