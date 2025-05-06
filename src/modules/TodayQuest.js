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

    //PROJECT HEADER generate
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
        for (let key of LSkeys) {
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
        cancelButton.addEventListener("click", function () {
            form.reset();
            dialog.close();
        });

        submitButton.addEventListener("click", function (event) {
            event.preventDefault();
            const appManage = ProjectAndTodo();
            const modalData = new FormData(form);

            //USE FORM DATA TO UPDATE PROJECT NAME
            if (modalData.get("project-choice") === "" || modalData.get("project-choice") === " ") { //Empty string check
                return alert("Error: Empty or blank text. Please enter a valid project name.");
            }

            if (!appManage.getProject(modalData.get("project-choice"))) {
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

    //TODO card generate
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
        todoStatus.textContent = todoObj.status;

        //Construct current todo's modal for view button
        generateViewTodoModal(todoObj, todoContainer);

        //Construct current todo's modal for edit button
        generateEditTodoModal(todoObj, todoContainer, currentProj);

        //if statement to apply styling class tag
        if (todoObj.status === "incomplete") {
            todoStatus.setAttribute("class", "todo-status-incomplete");
        }
        else {
            todoStatus.setAttribute("class", "todo-status-complete");
        }

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
        completeButton.addEventListener("click", function () {
            const appManage = ProjectAndTodo();
            //Re-render
            removeTodayQuestPage();
            //Switch current Todo's status, then use the new returned currentProj to re-render
            generateTodayQuest(appManage.updateCompleteStatus(todoObj, currentProj));
        });

        viewButton.addEventListener("click", function () {
            viewTodoHandler(todoObj);
        });

        removeButton.addEventListener("click", function () {
            const appManage = ProjectAndTodo();
            //visually remove todo card, and also remove card from localStorage
            todoCard.remove();
            appManage.removeTodo(todoObj.title, currentProj.name);
        });

        editButton.addEventListener("click", function () {
            //Open a modal for the todoObj, then use appManage to 
            //edit the data of the todo, then re-render page to reflect changes.
            editTodoHandler(todoObj);
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

    function generateEditTodoModal(todoObj, todoContainer, currentProj) {
        const dialog = document.createElement("dialog");
        const form = document.createElement("form");
        const formInputContainer = document.createElement("div");
        const titleLabel = document.createElement("label");
        const descriptionLabel = document.createElement("label");
        const dueDateLabel = document.createElement("label");
        const priorityLabel = document.createElement("label");
        const completionLabel = document.createElement("label");
        const titleValue = document.createElement("input");
        const descriptionValue = document.createElement("textarea");
        const dueDateValue = document.createElement("input");
        const priorityValue = document.createElement("select");
        const priorityOptionLow = document.createElement("option");
        const priorityOptionMedium = document.createElement("option");
        const priorityOptionHigh = document.createElement("option");
        const radioGroup = document.createElement("div");
        const radioChoice1 = document.createElement("div");
        const radioChoice2 = document.createElement("div");
        const completionChoiceIncompleteLabel = document.createElement("label");
        const completionChoiceIncompleteValue = document.createElement("input");
        const completionChoiceCompleteLabel = document.createElement("label");
        const completionChoiceCompleteValue = document.createElement("input");
        const updateTodoModalButtonContainer = document.createElement("div");
        const buttonPointer1 = document.createElement("div");
        const buttonPointer2 = document.createElement("div");
        const cancelButton = document.createElement("button");
        const submitButton = document.createElement("button");

        //add attributes and content
        dialog.setAttribute("class", `${todoObj.title.replaceAll(" ", "-")} update-todo-modal`);
        form.setAttribute("class", "update-todo-form");
        formInputContainer.setAttribute("class", "update-todo-modal-inputs");
        titleLabel.setAttribute("class", "title-label");
        titleLabel.setAttribute("for", "title-value");
        titleLabel.textContent = "Title:";
        descriptionLabel.setAttribute("class", "description-label");
        descriptionLabel.setAttribute("for", "description-value");
        descriptionLabel.textContent = "Description:";
        dueDateLabel.setAttribute("class", "due-date-label");
        dueDateLabel.setAttribute("for", "due-date-value");
        dueDateLabel.textContent = "Due Date:";
        priorityLabel.setAttribute("class", "priority-label");
        priorityLabel.setAttribute("for", "priority-value");
        priorityLabel.textContent = "Priority:";
        completionLabel.setAttribute("class", "completion-label");
        completionLabel.textContent = "Completion Status:";
        completionChoiceIncompleteLabel.setAttribute("for", "incomplete-choice");
        completionChoiceIncompleteLabel.textContent = "Incomplete";
        completionChoiceCompleteLabel.setAttribute("for", "complete-choice");
        completionChoiceCompleteLabel.textContent = "Complete";
        titleValue.setAttribute("id", "title-value");
        titleValue.setAttribute("type", "text");
        titleValue.setAttribute("name", "title-value");
        titleValue.setAttribute("required", "");
        descriptionValue.setAttribute("id", "description-value");
        descriptionValue.setAttribute("name", "description-value");
        descriptionValue.setAttribute("placeholder", "Max 275 Characters...");
        descriptionValue.setAttribute("maxlength", "275");
        descriptionValue.setAttribute("required", "");
        dueDateValue.setAttribute("type", "date");
        dueDateValue.setAttribute("id", "due-date-value");
        dueDateValue.setAttribute("name", "due-date-value");
        dueDateValue.setAttribute("required", "");
        priorityValue.setAttribute("id", "priority-value");
        priorityValue.setAttribute("name", "priority-value");
        priorityOptionLow.setAttribute("value", "low");
        priorityOptionLow.setAttribute("selected", "");
        priorityOptionLow.textContent = "Low";
        priorityOptionMedium.setAttribute("value", "medium");
        priorityOptionMedium.textContent = "Medium";
        priorityOptionHigh.setAttribute("value", "high");
        priorityOptionHigh.textContent = "High";
        radioGroup.setAttribute("class", "radio-group");
        radioChoice1.setAttribute("class", "radio-choices");
        radioChoice2.setAttribute("class", "radio-choices");
        completionChoiceIncompleteValue.setAttribute("type", "radio");
        completionChoiceIncompleteValue.setAttribute("id", "incomplete-choice");
        completionChoiceIncompleteValue.setAttribute("name", "completion-value");
        completionChoiceIncompleteValue.setAttribute("value", "incomplete");
        completionChoiceIncompleteValue.setAttribute("checked", "");
        completionChoiceCompleteValue.setAttribute("type", "radio");
        completionChoiceCompleteValue.setAttribute("id", "complete-choice");
        completionChoiceCompleteValue.setAttribute("name", "completion-value");
        completionChoiceCompleteValue.setAttribute("value", "complete");
        updateTodoModalButtonContainer.setAttribute("class", "update-todo-modal-buttons");
        buttonPointer1.setAttribute("class", "button-pointer");
        buttonPointer2.setAttribute("class", "button-pointer");
        cancelButton.setAttribute("type", "button");
        cancelButton.setAttribute("class", "cancel-button");
        cancelButton.textContent = "Cancel";
        submitButton.setAttribute("type", "submit");
        submitButton.setAttribute("class", "submit-button");
        submitButton.textContent = "Submit";

        //button event listeners
        cancelButton.addEventListener("click", function () {
            //Reset form and close the modal
            form.reset();
            dialog.close();
        });

        submitButton.addEventListener("click", function (e) {
            e.preventDefault(); //Prevent submit action since no backend
            const appManage = ProjectAndTodo(); //For app manipulation
            const modalData = new FormData(form);
            //Do this in a little bit
            //When the form is submitted, overwrite the data
            //of the current todo in localStorage, then re-render page

            //Check for empty/invalid form data entries
            if (modalData.get("title-value") === "" || 
            modalData.get("title-value") === " " ||
            modalData.get("description-value") === "" ||
            modalData.get("description-value") === " " ||
            modalData.get("due-date-value") === "" ||
            modalData.get("due-date-value") === " " ) {
                return alert("Error: empty or invalid data entered. Try again.");
            }

            //If the input IS valid, then update the current todo in the localStorage
            //and re-render page.
            if(!appManage.updateTodo(todoObj.title, currentProj.name, modalData.get("title-value"), modalData.get("description-value"), modalData.get("due-date-value"), modalData.get("priority-value"), modalData.get("completion-value"))){
                //If updateTodo fails in anyway, do not close the modal and inform user of error
                return;
            }

            //re-render page with current todo details
            removeTodayQuestPage();
            generateTodayQuest(appManage.getProject(currentProj.name));


        });

        //construct html
        formInputContainer.appendChild(titleLabel);
        formInputContainer.appendChild(titleValue);
        formInputContainer.appendChild(descriptionLabel);
        formInputContainer.appendChild(descriptionValue);
        formInputContainer.appendChild(dueDateLabel);
        formInputContainer.appendChild(dueDateValue);
        formInputContainer.appendChild(priorityLabel);
        priorityValue.appendChild(priorityOptionLow);
        priorityValue.appendChild(priorityOptionMedium);
        priorityValue.appendChild(priorityOptionHigh);
        formInputContainer.appendChild(priorityValue);
        formInputContainer.appendChild(completionLabel);
        radioChoice1.appendChild(completionChoiceIncompleteValue);
        radioChoice1.appendChild(completionChoiceIncompleteLabel);
        radioChoice2.appendChild(completionChoiceCompleteValue);
        radioChoice2.appendChild(completionChoiceCompleteLabel);
        radioGroup.appendChild(radioChoice1);
        radioGroup.appendChild(radioChoice2);
        formInputContainer.appendChild(radioGroup);
        buttonPointer1.appendChild(cancelButton);
        buttonPointer2.appendChild(submitButton);
        updateTodoModalButtonContainer.appendChild(buttonPointer1);
        updateTodoModalButtonContainer.appendChild(buttonPointer2);
        form.appendChild(formInputContainer);
        form.appendChild(updateTodoModalButtonContainer);
        dialog.appendChild(form);

        //Append modal/dialog to todoContainer
        todoContainer.appendChild(dialog);
    }

    function editTodoHandler(todoObj) {
        const dialog = document.querySelector(`dialog.${todoObj.title.replaceAll(" ", "-")}.update-todo-modal`);
        dialog.showModal();
    }

    function generateViewTodoModal(todoObj, todoContainer) {
        const dialog = document.createElement("dialog");
        const todoInfo = document.createElement("div");
        const titleLabel = document.createElement("p");
        const descriptionLabel = document.createElement("p");
        const dueDateLabel = document.createElement("p");
        const priorityLabel = document.createElement("p");
        const completionLabel = document.createElement("p");
        const titleValue = document.createElement("p");
        const descriptionValue = document.createElement("p");
        const dueDateValue = document.createElement("p");
        const priorityValue = document.createElement("p");
        const completionValue = document.createElement("p");
        const modalButtonContainer = document.createElement("div");
        const closeButton = document.createElement("button");
        const buttonPointer = document.createElement("div");

        //add attributes and content
        dialog.setAttribute("class", `${todoObj.title.replaceAll(" ", "-")} todo-view-modal`);
        todoInfo.setAttribute("class", "todo-info");
        titleLabel.setAttribute("class", "title-label");
        descriptionLabel.setAttribute("class", "description-label");
        dueDateLabel.setAttribute("class", "due-date-label");
        priorityLabel.setAttribute("class", "priority-label");
        completionLabel.setAttribute("class", "completion-label");
        titleValue.setAttribute("class", "title-value");
        titleValue.textContent = todoObj.title;
        descriptionValue.setAttribute("class", "description-value");
        descriptionValue.textContent = todoObj.description;
        dueDateValue.setAttribute("class", "due-date-value");
        dueDateValue.textContent = todoObj.dueDate;
        titleLabel.textContent = "Title:";
        descriptionLabel.textContent = "Description:";
        dueDateLabel.textContent = "Due Date:";
        priorityLabel.textContent = "Priority:";
        completionLabel.textContent = "Completion Status:";
        modalButtonContainer.setAttribute("class", "view-todo-modal-buttons");
        buttonPointer.setAttribute("class", "button-pointer");
        closeButton.setAttribute("class", "close-button");
        closeButton.setAttribute("type", "button");
        closeButton.textContent = "Close";

        //priority if statement class label
        if (todoObj.priority === "low") {
            priorityValue.setAttribute("class", "priority-value-low");
            priorityValue.textContent = "low";
        }
        else if (todoObj.priority === "medium") {
            priorityValue.setAttribute("class", "priority-value-medium");
            priorityValue.textContent = "medium";
        }
        else if (todoObj.priority === "high") {
            priorityValue.setAttribute("class", "priority-value-high");
            priorityValue.textContent = "high";
        }

        //completion if statement class label
        if (todoObj.status === "incomplete") {
            completionValue.setAttribute("class", "completion-value-incomplete");
            completionValue.textContent = "incomplete";
        }
        else {
            completionValue.setAttribute("class", "completion-value-complete");
            completionValue.textContent = "complete";
        }

        //Button event listeners
        closeButton.addEventListener("click", function () {
            dialog.close();
        });

        //Construct HTML elements
        todoInfo.appendChild(titleLabel);
        todoInfo.appendChild(descriptionLabel);
        todoInfo.appendChild(dueDateLabel);
        todoInfo.appendChild(priorityLabel);
        todoInfo.appendChild(completionLabel);
        todoInfo.appendChild(titleValue);
        todoInfo.appendChild(descriptionValue);
        todoInfo.appendChild(dueDateValue);
        todoInfo.appendChild(priorityValue);
        todoInfo.appendChild(completionValue);
        buttonPointer.appendChild(closeButton);
        modalButtonContainer.appendChild(buttonPointer);
        dialog.appendChild(todoInfo);
        dialog.appendChild(modalButtonContainer);


        //Add todo modal to todoContainer
        todoContainer.appendChild(dialog);
    }

    function viewTodoHandler(todoObj) {
        const dialog = document.querySelector(`dialog.${todoObj.title.replaceAll(" ", "-")}.todo-view-modal`);
        dialog.showModal();
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