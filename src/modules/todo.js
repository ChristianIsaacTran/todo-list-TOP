
import project from "./project.js";

function todo() {

    //Create todo object with specified properties
    function createTodo(title, description, dueDate, priority, projName) {
        const tempTodo = {
            title: title,
            description: description,
            dueDate: dueDate,
            priority: priority
        };

        //add new todo to project in local storage, IF there isnt an exact named todo in the project already
        const projectManage = project();
        const tempProj = projectManage.getProject(projName);
        //Check if the exact todo already exists for the selected project
        for(let todoObj of tempProj.todos) {
            if(todoObj.title === tempTodo.title){
                return console.log("Todo already exists for this project!")
            }
        }

        //If it doesn't exist, then add it to the todo list of the given project
        projectManage.addTodoToProject(projName, tempTodo);
    }

    //get specific todo from a specific project
    function getTodo(titleName, projName) {
        //get the project that todo is in
        const projectManage = project();
        const tempProj = projectManage.getProject(projName);
        console.log(tempProj);
        //Search for todo from todos array
        for(let todoObj of tempProj.todos) {
            if(todoObj.title === titleName){
                return todoObj; //If todo is found, then return the object
            }
        }

        return console.log("Todo is not found within this project");
    }

    return { createTodo, getTodo }; 
}

export default todo; 