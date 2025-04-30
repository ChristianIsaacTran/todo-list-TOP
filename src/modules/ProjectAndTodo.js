

/*
Projects are going to be our "folder" to hold all of our 
todos for that specific project. 4 functionalities:
1. create a project
2. edit a project
3. delete a project
4. update a project's name
*/
function ProjectAndTodo() {

    //Project functions
    function createProject(projName) {
        //Use localStorage to store previous data from last session
        //localStorage only stores string data, so JSON is useful
        const tempProj = { name: projName, todos: [] }; //new proj object

        //Store object as a string/JSON in localStorage with JSON.stringify
        localStorage.setItem(`${projName}`, JSON.stringify(tempProj));
    }

    function removeProject(projName) {
        //Look for key in localStorage to remove
        if (localStorage.getItem(projName)) { //Check if project even exists
            localStorage.removeItem(projName);
            return console.log(`Removed ${projName} from local storage`)
        }
        else {
            return console.log("Project not found!");
        }
    }

    function getProject(projName) {
        //Look for key in localStorage to get value, then 
        //JSON.parse() the JSON to convert to an object.
        if (localStorage.getItem(projName)) { //Check if key exists
            const tempProj = JSON.parse(localStorage.getItem(projName));
            return tempProj; //Return parsed object
        }
        else {
            return console.log("Project not found!");
        }
    }

    function updateProjectName(key, givenName) {

        //Check if the givenName already exists within the localStorage 
        if (localStorage.getItem(givenName)) {
            return console.log("The project name already exists!")
        }

        //Check if key even exists
        if (localStorage.getItem(key)) {
            /*Parse, then create a new object, then create a new key/value pair in localStorage
            while also removing the previous existing item*/
            const tempProj = JSON.parse(localStorage.getItem(key));
            tempProj.name = givenName;
            localStorage.setItem(givenName, JSON.stringify(tempProj));
            removeProject(key);
            return console.log("The property exists in local Storage");
        }

        return console.log("The given key/value doesn't exist");


    }

    function viewProject (projName) {
        const tempProj = getProject(projName);
        if(!tempProj) {
            return console.log("Project doesn't exist");
        }

        console.log(`Name of Project: ${tempProj.name} \n Todos: ${tempProj.todos}`);
    }

    //utility function to replace an existing project with the new modified given project (projObj)
    function updateProjectAll(key, projObj) {
        //Takes an object and a given key value for a localStorage item, and overwrites the localStorage item with the object
        if (!localStorage.getItem(key)) { //Check if project exists first
            return console.log("Project doesn't exist!");
        }
        else { //If project does exist, overwrite it with projObj
            localStorage.setItem(key, JSON.stringify(projObj));
        }
    }

    //Todo functions
    function createTodo(title, description, dueDate, priority, projName) {
        const tempTodo = {
            title: title,
            description: description,
            dueDate: dueDate,
            priority: priority
        };

        //add new todo to project in local storage, IF there isnt an exact named todo in the project already
        const tempProj = getProject(projName);
        if (!tempProj) {
            return console.log("Project doesn't exist")
        }
        //Check if the exact todo already exists for the selected project
        for (let todoObj of tempProj.todos) {
            if (todoObj.title === tempTodo.title) {
                return console.log("Todo already exists for this project!")
            }
        }

        //If it doesn't exist, then add it to the todo list of the given project
        tempProj.todos.push(tempTodo);
        localStorage.setItem(projName, JSON.stringify(tempProj));


    }

    function getTodo(titleName, projName) {
        //get the project that todo is in
        const tempProj = getProject(projName);
        if (!tempProj) {
            return console.log("Project doesn't exist")
        }
        //Search for todo from todos array
        for (let todoObj of tempProj.todos) {
            if (todoObj.title === titleName) {
                return todoObj; //If todo is found, then return the object
            }
        }

        return console.log("Todo is not found within this project");
    }

    function removeTodo(titleName, projName) {
        //get the project that todo is in
        const tempProj = getProject(projName);
        if (!tempProj) {
            return console.log("Project doesn't exist")
        }
        //Search for todo from todos array
        for (let i = 0; i < tempProj.todos.length; i++) {
            if (tempProj.todos[i].title === titleName) {
                //Finds todo with index and removes it 
                tempProj.todos.splice(i, 1);
                updateProjectAll(projName, tempProj); //Overwrites existing project with tempProj to reflect todo array deletion
                return console.log("removed todo from project");
            }
        }

        return console.log("Todo is not found within this project");
    }



    return { createProject, removeProject, getProject, updateProjectName, viewProject, createTodo, getTodo, removeTodo};
}

export default ProjectAndTodo;