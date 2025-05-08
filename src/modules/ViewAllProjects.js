import ProjectAndTodo from "./ProjectAndTodo.js";

function ViewAllProjects() {

    function generateViewAllProjects() {
        const contentContainer = document.querySelector("#content");
        const viewProjectsContainer = document.createElement("div");
        const header = document.createElement("header");
        const headerTitle = document.createElement("h1");
        const projectMenu = document.createElement("div");

        //dynamically create project cards based on localStorage keys
        const appManage = ProjectAndTodo();
        const LSkeys = appManage.getAllProjectKeys();
        for(let key of LSkeys) {
            const projectCard = document.createElement("div");
            projectCard.setAttribute("class", "project-card");
            const projectCardName = document.createElement("h3");
            projectCardName.setAttribute("class", "project-card-name");
            projectCardName.textContent = key;
            projectCard.appendChild(projectCardName);
            projectMenu.appendChild(projectCard);
        }

        //Add Attributes and content
        viewProjectsContainer.setAttribute("class", "view-projects-container");
        header.setAttribute("class","view-projects-header");
        headerTitle.setAttribute("class","view-projects-title");
        headerTitle.textContent = "All Quests";
        projectMenu.setAttribute("class","view-projects-menu");


        //Construct HTML
        header.appendChild(headerTitle);
        viewProjectsContainer.appendChild(header);
        viewProjectsContainer.appendChild(projectMenu);
        

        //Append to content div
        contentContainer.appendChild(viewProjectsContainer);
    }

    return {generateViewAllProjects};
}

export default ViewAllProjects;