

/*
Projects are going to be our "folder" to hold all of our 
todos for that specific project. 4 functionalities:
1. create a project
2. edit a project
3. delete a project
4. update a project's name
*/
function project() {

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
        else{
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

    function addTodoToProject(projName, todo) {
        const tempProj = getProject(projName); //get the requested project
        tempProj.todos.push(todo); //push todo into the project
        localStorage.setItem(projName, JSON.stringify(tempProj)); //Convert to JSON and re-add it to project in localStorage
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
        else {
            return console.log("The given key/value doesn't exist");
        }

    }

    return { createProject, removeProject, getProject, updateProjectName, addTodoToProject};
}

export default project;