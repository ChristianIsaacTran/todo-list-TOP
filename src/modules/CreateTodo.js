import ProjectAndTodo from "./ProjectAndTodo.js";
import { format, parseISO } from "date-fns";

function CreateTodo() {

    function generateCreateTodo() {
        const contentContainer = document.querySelector("#content");
        const createTodoContainer = document.createElement("div");
        const header = document.createElement("header");
        const createTodoPageTitle = document.createElement("h1");
        const form = document.createElement("form");
        const formInputContainer = document.createElement("div");
        const titleLabel = document.createElement("label");
        const titleValue = document.createElement("input");
        const descriptionLabel = document.createElement("label");
        const descriptionValue = document.createElement("textarea");
        const dateLabel = document.createElement("label");
        const dateValue = document.createElement("input");
        const priorityLabel = document.createElement("label");
        const priorityValue = document.createElement("select");
        const priorityValueLow = document.createElement("option");
        const priorityValueMedium = document.createElement("option");
        const priorityValueHigh = document.createElement("option");
        const completionLabel = document.createElement("label");
        const radioGroup = document.createElement("div");
        const radio1 = document.createElement("div");
        const radio2 = document.createElement("div");
        const radioIncompleteValue = document.createElement("input");
        const radioIncompleteLabel = document.createElement("label");
        const radioCompleteValue = document.createElement("input");
        const radioCompleteLabel = document.createElement("label");
        const projectLabel = document.createElement("label");
        const projectChoice = document.createElement("input");
        const projectDatalist = document.createElement("datalist");
        //Dynamically make project datalist options based on localStorage keys
        const appManage = ProjectAndTodo();
        const LSkeys = appManage.getAllProjectKeys();
        for(let key of LSkeys) {
            const projectOption = document.createElement("option");
            projectOption.setAttribute("value", key);
            projectDatalist.appendChild(projectOption);
        }

        const buttonContainer = document.createElement("div");
        const buttonPointer = document.createElement("div");
        const createTodoButton = document.createElement("button");


        //add attributes and content
        createTodoContainer.setAttribute("class","create-todo-container");
        header.setAttribute("class","create-todo-header");
        createTodoPageTitle.setAttribute("class","create-todo-title");
        createTodoPageTitle.textContent = "Create A Todo";
        form.setAttribute("class","create-todo-form");
        formInputContainer.setAttribute("class","create-todo-inputs");
        titleLabel.setAttribute("class","create-todo-title-label");
        titleLabel.setAttribute("for","create-todo-title-value");
        titleLabel.textContent = "New Todo Title:";
        titleValue.setAttribute("maxlength","20");
        titleValue.setAttribute("placeholder", "Max 20 characters...");
        titleValue.setAttribute("type", "text");
        titleValue.setAttribute("id","create-todo-title-value");
        titleValue.setAttribute("name","create-todo-title-value");
        descriptionLabel.setAttribute("class","create-todo-description-label");
        descriptionLabel.setAttribute("for","create-todo-description-value");
        descriptionLabel.textContent = "Description:";
        descriptionValue.setAttribute("name","create-todo-description-value");
        descriptionValue.setAttribute("id","create-todo-description-value");
        descriptionValue.setAttribute("placeholder","Max 275 characters...");
        descriptionValue.setAttribute("maxlength","275");
        dateLabel.setAttribute("class","create-todo-date-label");
        dateLabel.setAttribute("for","create-todo-date-value");
        dateLabel.textContent = "Due Date:";
        dateValue.setAttribute("id","create-todo-date-value");
        dateValue.setAttribute("type", "date");
        dateValue.setAttribute("name", "create-todo-date-value");
        priorityLabel.setAttribute("class","create-todo-priority-label");
        priorityLabel.setAttribute("for", "create-todo-priority-value");
        priorityLabel.textContent = "Priority:";
        priorityValue.setAttribute("name","create-todo-priority-value");
        priorityValue.setAttribute("id","create-todo-priority-value");
        priorityValueLow.setAttribute("value","low");
        priorityValueLow.textContent = "Low";
        priorityValueMedium.setAttribute("value","medium");
        priorityValueMedium.textContent = "Medium";
        priorityValueHigh.setAttribute("value", "high");
        priorityValueHigh.textContent = "High";
        completionLabel.setAttribute("class","create-todo-completion-label");
        completionLabel.textContent = "Completion Status:";
        radioGroup.setAttribute("class","create-todo-radio-group");
        radio1.setAttribute("class","create-todo-radio1");
        radio2.setAttribute("class","create-todo-radio2");
        radioIncompleteValue.setAttribute("checked", "");
        radioIncompleteValue.setAttribute("type","radio");
        radioIncompleteValue.setAttribute("name","create-todo-completion-value");
        radioIncompleteValue.setAttribute("value","incomplete");
        radioIncompleteValue.setAttribute("id","create-todo-incomplete-value");
        radioIncompleteLabel.setAttribute("class","create-todo-incomplete-label");
        radioIncompleteLabel.setAttribute("for","create-todo-incomplete-value");
        radioIncompleteLabel.textContent = "Incomplete";
        radioCompleteValue.setAttribute("type","radio");
        radioCompleteValue.setAttribute("name","create-todo-completion-value");
        radioCompleteValue.setAttribute("value","complete");
        radioCompleteValue.setAttribute("id","create-todo-complete-value");
        radioCompleteLabel.setAttribute("class", "create-todo-complete-label");
        radioCompleteLabel.setAttribute("for", "create-todo-complete-value");
        radioCompleteLabel.textContent = "Complete";
        projectLabel.setAttribute("class", "create-todo-project-label");
        projectLabel.setAttribute("for", "create-todo-project-choice");
        projectLabel.textContent = "Add to Project:";
        projectChoice.setAttribute("id", "create-todo-project-choice");
        projectChoice.setAttribute("name","create-todo-project-choice");
        projectChoice.setAttribute("list","create-todo-project-list");
        projectDatalist.setAttribute("id", "create-todo-project-list");
        buttonContainer.setAttribute("class", "create-todo-button-container");
        buttonPointer.setAttribute("class","button-pointer");
        createTodoButton.setAttribute("type", "submit");
        createTodoButton.setAttribute("class","create-todo-button");
        createTodoButton.textContent = "Create Todo";

        //Button event listeners
        createTodoButton.addEventListener("click", function(e) {
            e.preventDefault();
            //Get all formdata and project and create a new todo into 
            //the chosen project. Return error message if invalid entry
            //or project not found.
            const appManage = ProjectAndTodo();


            //Reset form after successful submission and notify user
            alert("working?");
            form.reset();
        });


        //Construct HTML
        header.appendChild(createTodoPageTitle);
        formInputContainer.appendChild(titleLabel);
        formInputContainer.appendChild(titleValue);
        formInputContainer.appendChild(descriptionLabel);
        formInputContainer.appendChild(descriptionValue);
        formInputContainer.appendChild(dateLabel);
        formInputContainer.appendChild(dateValue);
        formInputContainer.appendChild(priorityLabel);
        priorityValue.appendChild(priorityValueLow);
        priorityValue.appendChild(priorityValueMedium);
        priorityValue.appendChild(priorityValueHigh);
        formInputContainer.appendChild(priorityValue);
        formInputContainer.appendChild(completionLabel);
        radio1.appendChild(radioIncompleteValue);
        radio1.appendChild(radioIncompleteLabel);
        radio2.appendChild(radioCompleteValue);
        radio2.appendChild(radioCompleteLabel);
        radioGroup.appendChild(radio1);
        radioGroup.appendChild(radio2);
        formInputContainer.appendChild(radioGroup);
        formInputContainer.appendChild(projectLabel);
        formInputContainer.appendChild(projectChoice);
        formInputContainer.appendChild(projectDatalist);
        buttonPointer.appendChild(createTodoButton);
        buttonContainer.appendChild(buttonPointer);
        form.appendChild(formInputContainer);
        form.appendChild(buttonContainer);
        createTodoContainer.appendChild(header);
        createTodoContainer.appendChild(form);

        //Append to the content div
        contentContainer.appendChild(createTodoContainer);
    }

    return {generateCreateTodo};
}

export default CreateTodo;