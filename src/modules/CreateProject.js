import ProjectAndTodo from "./ProjectAndTodo.js";


function CreateProject() {

    function generateCreateProject() {
        const contentContainer = document.querySelector("#content");
        const createProjectContainer = document.createElement("div");
        const header = document.createElement("header");
        const webpageTitle = document.createElement("h1");
        const form = document.createElement("form");
        const formInputContainer = document.createElement("div");
        const buttonPointer = document.createElement("div");
        const formLabel = document.createElement("label");
        const formInput = document.createElement("input");
        const submitButton = document.createElement("button");

        //add attributes and content
        createProjectContainer.setAttribute("class","create-project-container");
        header.setAttribute("class","create-project-header");
        webpageTitle.setAttribute("class","create-project-title");
        webpageTitle.textContent = "Create A Project";
        form.setAttribute("class","create-project-form");
        formInputContainer.setAttribute("class","create-project-inputs");
        buttonPointer.setAttribute("class","button-pointer");
        formLabel.setAttribute("class","new-project-label");
        formLabel.setAttribute("for","project-name-value");
        formLabel.textContent = "New Project Name:";
        formInput.setAttribute("type","text");
        formInput.setAttribute("id","project-name-value");
        formInput.setAttribute("name","project-name-value");
        formInput.setAttribute("maxlength","20");
        formInput.setAttribute("placeholder","Max 20 characters...");
        submitButton.setAttribute("class","create-project-button");
        submitButton.setAttribute("type","submit");
        submitButton.textContent = "Create Project";

        //button event listeners
        submitButton.addEventListener("click", function(e) {
            e.preventDefault();
            const formValues = new FormData(form);
            const appManage = ProjectAndTodo();
            //Add this new project to localStorage
            //if checkProject is unsuccessful, stop form.reset()
            if(!appManage.createProject(formValues.get("project-name-value"))){
                return;
            }

            //Reset form after a successful submission and inform user
            alert("Submission successful. Created Project.");
            form.reset()
        });

        //Construct HTML 
        header.appendChild(webpageTitle);
        formInputContainer.appendChild(formLabel);
        formInputContainer.appendChild(formInput);
        buttonPointer.appendChild(submitButton);
        form.appendChild(formInputContainer);
        form.appendChild(buttonPointer);
        createProjectContainer.appendChild(header);
        createProjectContainer.appendChild(form);
        contentContainer.appendChild(createProjectContainer);
    }


    return {generateCreateProject};
}

export default CreateProject;
