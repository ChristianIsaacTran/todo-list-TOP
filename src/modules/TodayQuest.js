import ProjectAndTodo from "./ProjectAndTodo.js";

//Main homepage module. A summary of the current project selected
//Generate Today Quest content

function TodayQuest() {

    //Main generation function
    function generateTodayQuest(currentProj = checkLocalStorageEmpty()) {
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

        //Generate html modals for edit/change options
        generateChangeProjNameModal(projectContainer, currentProj);
        generateChangeQuestModal(projectContainer);
        
        //Generate project header
        generateProjHeader(projectHeader, currentProj);

        //Generate todo list
        for (let todo of currentProj.todos) {
            generateTodoCard(todoContainer, todo, currentProj);
        }

        //Construct main container
        projectContainer.appendChild(projectHeader);
        projectContainer.appendChild(todoContainer);
        contentContainer.appendChild(todayQuestHeader);
        contentContainer.appendChild(projectContainer);

    }

    function generateProjHeader(projectHeader, currentProj) {
        const projectName = document.createElement("h2");
        const projHeaderButtons = document.createElement("div");
        const changeProjNameButton = document.createElement("button");
        const changeQuestButton = document.createElement("button");
        const buttonPointer1 = document.createElement("div");
        const buttonPointer2 = document.createElement("div");

        //add attributes and content
        projectName.textContent = currentProj.name; //Project name placeholder
        projHeaderButtons.setAttribute("class", "project-header-buttons");
        changeProjNameButton.setAttribute("class", "change-proj-name");
        changeProjNameButton.textContent = "Edit Project Name";
        changeProjNameButton.addEventListener("click", changeProjNameHandler);
        changeQuestButton.setAttribute("class", "change-quest-button");
        changeQuestButton.textContent = "Change Quest";
        changeQuestButton.addEventListener("click", changeQuestHandler);
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

    function generateChangeQuestModal(projectContainer) {
        const dialog = document.createElement("dialog");
        const form = document.createElement("form");
        const modalInputsContainer = document.createElement("div");
        const changeProjLabel = document.createElement("label");
        const changeProjChoice = document.createElement("input");
        const changeProjList = document.createElement("datalist");
        //dynamically create list options from localStorage
        const modalButtonContainer = document.createElement("div");
        const cancelButton = document.createElement("button");
        const submitButton = document.createElement("button");
        const buttonPointerCancel = document.createElement("div");
        const buttonPointerSubmit = document.createElement("div");

        //add attributes and content
        dialog.setAttribute("class", "change-quest-modal");
        form.setAttribute("class", "change-quest-form");
        modalInputsContainer.setAttribute("class", "changeQ-modal-inputs");
        changeProjLabel.setAttribute("for", "project-choice");
        changeProjLabel.textContent = "Choose another quest: ";
        changeProjChoice.setAttribute("list", "project-list");
        changeProjChoice.setAttribute("id", "project-choice");
        changeProjChoice.setAttribute("name", "project-choice");
        changeProjChoice.setAttribute("placeholder", "Enter project name...");
        changeProjList.setAttribute("id", "project-list");

        //Dynamically create <option> html elements with all project names
        const appManage = ProjectAndTodo();
        const LSkeys = appManage.getAllProjectKeys(); //Gets an array of all project keys in localStorage

        //Loop through all keys in localStorage and add them to dataList
        for(let key of LSkeys) {
            const option = document.createElement("option");
            option.setAttribute("value", key);
            changeProjList.appendChild(option);
        }

        //cancel and submit button content
        modalButtonContainer.setAttribute("class", "modal-buttons");
        buttonPointerCancel.setAttribute("class", "button-pointer");
        buttonPointerSubmit.setAttribute("class", "button-pointer");
        cancelButton.setAttribute("type", "button");
        cancelButton.setAttribute("class", "cancel-button");
        cancelButton.textContent = "Cancel";
        submitButton.setAttribute("type", "submit");
        submitButton.setAttribute("class", "submit-button");
        submitButton.textContent = "Submit";

        //cancel and submit button events
        cancelButton.addEventListener("click", function() {
            form.reset();
            dialog.close();
        });

        submitButton.addEventListener("click", function(event) {
            event.preventDefault();
            const appManage = ProjectAndTodo();
            const modalData = new FormData(form);

            //USE FORM DATA TO UPDATE PROJECT NAME
            if (modalData.get("project-choice") === "" || modalData.get("project-choice") === " ") { //Empty string check
                return alert("Error: Empty or blank text. Please enter a valid project name.");
            }

            if(!appManage.getProject(modalData.get("project-choice"))) {
                return;
            }

            //re-render
            removeTodayQuestPage();
            generateTodayQuest(appManage.getProject(modalData.get("project-choice")));

            dialog.close()
        });


        //Build HTML
        modalInputsContainer.appendChild(changeProjLabel);
        modalInputsContainer.appendChild(changeProjChoice);
        modalInputsContainer.appendChild(changeProjList);
        buttonPointerCancel.appendChild(cancelButton);
        buttonPointerSubmit.appendChild(submitButton);
        modalButtonContainer.appendChild(buttonPointerCancel);
        modalButtonContainer.appendChild(buttonPointerSubmit);

        form.appendChild(modalInputsContainer);
        form.appendChild(modalButtonContainer);
        dialog.appendChild(form);

        projectContainer.appendChild(dialog);
    }

    function generateChangeProjNameModal(projectContainer, currentProj) {
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
        projNameInput.setAttribute("maxlength", "20");
        projNameInput.setAttribute("placeholder", "Max 20 characters...");
        projNameInput.setAttribute("required", "");
        modalButtonContainer.setAttribute("class", "modal-buttons");
        buttonPointerCancel.setAttribute("class", "button-pointer");
        buttonPointerSubmit.setAttribute("class", "button-pointer");
        cancelButton.setAttribute("type", "button");
        cancelButton.setAttribute("class", "cancel-button");
        cancelButton.textContent = "Cancel";
        submitButton.setAttribute("type", "submit");
        submitButton.setAttribute("class", "submit-button");
        submitButton.textContent = "Submit";

        //button events
        cancelButton.addEventListener("click", function () {
            //reset form, then close modal
            form.reset();
            dialog.close();
        });
        submitButton.addEventListener("click", function (event) {
            event.preventDefault();
            const appManage = ProjectAndTodo();
            const modalData = new FormData(form);

            //USE FORM DATA TO UPDATE PROJECT NAME
            if (modalData.get("projTitle") === "" || modalData.get("projTitle") === " ") { //Empty string check
                return alert("Error: Empty or blank text. Please enter a valid project name.");
            }

            if (!appManage.updateProjectName(currentProj.name, modalData.get("projTitle"))) { //Check if project name exists
                return; //prevent modal from closing
            }

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

    function changeQuestHandler() {
        const dialog = document.querySelector(".change-quest-modal");
        dialog.showModal();
    }


    function generateTodoCard(todoContainer, todoObj, currentProj) {
        const todoCard = document.createElement("div");
        const cardLeft = document.createElement("div");
        const cardRight = document.createElement("div");
        const completeButton = document.createElement("button");
        const todoTitle = document.createElement("p");
        const todoDueDate = document.createElement("p");
        const todoStatus = document.createElement("p");
        const viewButton = document.createElement("button");
        const editButton = document.createElement("button");
        const removeButton = document.createElement("button");
        const buttonPointer1 = document.createElement("div");
        const buttonPointer2 = document.createElement("div");
        const buttonPointer3 = document.createElement("div");
        const buttonPointer4 = document.createElement("div");

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
        todoStatus.setAttribute("class", "todo-status");
        todoStatus.textContent = todoObj.status;
        editButton.setAttribute("class", "todo-edit-button");
        editButton.textContent = "Edit";
        removeButton.setAttribute("class", "todo-remove-button");
        removeButton.textContent = "Remove";
        viewButton.setAttribute("class", "todo-view-button");
        viewButton.textContent = "View";
        buttonPointer1.setAttribute("class", "button-pointer");
        buttonPointer2.setAttribute("class", "button-pointer");
        buttonPointer3.setAttribute("class", "button-pointer");
        buttonPointer4.setAttribute("class", "button-pointer");

        //Button event listeners 
        completeButton.addEventListener("click", function() {
            const appManage = ProjectAndTodo();
            //Re-render
            removeTodayQuestPage();
            //Switch current Todo's status, then use the new returned currentProj to re-render
            generateTodayQuest(appManage.updateCompleteStatus(todoObj, currentProj));
        });

        //Construct HTML elements
        buttonPointer1.appendChild(completeButton);
        cardLeft.appendChild(buttonPointer1);
        cardLeft.appendChild(todoTitle);
        cardLeft.appendChild(todoDueDate);
        cardLeft.appendChild(todoStatus);
        buttonPointer4.appendChild(viewButton);
        cardRight.appendChild(buttonPointer4);
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
            return appManage.createDefaultProject();
        }

        //If there IS something in localStorage, get the last project from localStorage
        return appManage.getLastProject();


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