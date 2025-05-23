/*
Updated ProjectsAndTodos into one module since it didn't 
make any sense to separate todos since todos are inside the project 
object.
*/
function ProjectAndTodo() {

    //Project functions
    function createProject(projName) {

        if (localStorage.getItem(projName)) {
            alert("Error: given project name already exists, createProject not successful");
            return false;
        }


        //Use localStorage to store previous data from last session
        //localStorage only stores string data, so JSON is useful
        const tempProj = { name: projName, todos: [] }; //new proj object

        //Store object as a string/JSON in localStorage with JSON.stringify
        localStorage.setItem(`${projName}`, JSON.stringify(tempProj));
        console.log("createProject successful");
        return true;
    }

    function createDefaultProject() {
        const tempProj = { name: "Default Project", todos: [
            {title: "Default todo 1",
                description: "Description goes here",
                dueDate: "2025-01-01",
                priority: "medium",
                status: "incomplete"}
        ] };

        //Store object as a string/JSON in localStorage with JSON.stringify
        localStorage.setItem("Default Project", JSON.stringify(tempProj));
        
        return getProject("Default Project");
    }

    function removeProject(projName) {
        //Look for key in localStorage to remove
        if (localStorage.getItem(projName)) { //Check if project even exists
            localStorage.removeItem(projName);
            return console.log(`Removed ${projName} from local storage, removeProject successful`)
        }
        else {
            return console.log("Project not found!, removeProject not successful");
        }
    }

    function getProject(projName) {
        //Look for key in localStorage to get value, then 
        //JSON.parse() the JSON to convert to an object.
        if (localStorage.getItem(projName)) { //Check if key exists
            const tempProj = JSON.parse(localStorage.getItem(projName));
            console.log("getProject successful");
            return tempProj; //Return parsed object
        }
        else {
            alert("Error: Project not found!, getProject not successful");
            return false;
        }
    }

    function getAllProjectKeys() {
        const keyArr = [];
        for (let i = 0; i < localStorage.length; i++) {
            keyArr.push(localStorage.key(i));
        }

        return keyArr;
    }

    function updateProjectName(prevName, replaceName) {

        //Check if the replaceName already exists within the localStorage 
        if (localStorage.getItem(replaceName)) {
            console.log("The project name already exists!, updateProjectName unsuccessful");
            alert("Error: Project name already exists!");
            return false;
        }

        //Check if key even exists
        if (localStorage.getItem(prevName)) {
            /*Parse, then create a new object, then create a new key/value pair in localStorage
            while also removing the previous existing item*/
            const tempProj = JSON.parse(localStorage.getItem(prevName));
            tempProj.name = replaceName;
            localStorage.setItem(replaceName, JSON.stringify(tempProj));
            removeProject(prevName);
            console.log("updateProjectName successful");
            return true;
        }

        console.log("The given key/value doesn't exist, updateProjectName unsuccessful");
        return false;


    }

   

    //utility function to replace an existing project with the new modified given project (projObj)
    function updateProjectAll(key, projObj) {
        //Takes an object and a given key value for a localStorage item, and overwrites the localStorage item with the object
        if (!localStorage.getItem(key)) { //Check if project exists first
            return console.log("Project doesn't exist!, updateProjectAll not successful");
        }
        else { //If project does exist, overwrite it with projObj
            console.log("updateProjectAll successful");
            localStorage.setItem(key, JSON.stringify(projObj));
        }
    }

    function getLastProject() {
        //Gets the last project object out of the localStorage
        const lastProjKey = localStorage.key(localStorage.length - 1);
        const lastProjObj = getProject(lastProjKey);
        return lastProjObj;
    }

    //Todo functions
    function createTodo(title, description, dueDate, priority, status = "incomplete", projName) {
        const tempTodo = {
            title: title,
            description: description,
            dueDate: dueDate,
            priority: priority,
            status: status
        };

        //add new todo to project in local storage, IF there isnt an exact named todo in the project already
        const tempProj = getProject(projName);
        if (!tempProj) {
            alert("Error: Project doesn't exist, createTodo not successful")
            return false;
        }
        

        //If it doesn't exist, then add it to the todo list of the given project
        tempProj.todos.push(tempTodo);
        localStorage.setItem(projName, JSON.stringify(tempProj));
        console.log("createTodo successful");
        return true; //if successful todo creation, send a true 
    }

    function getTodo(titleName, projName) {
        //get the project that todo is in
        const tempProj = getProject(projName);
        if (!tempProj) {
            console.log("Project doesn't exist, getTodo not succesful");
            return alert("Error: project doesn't exist, getTodo not successful");
        }
        //Search for todo from todos array
        for (let todoObj of tempProj.todos) {
            if (todoObj.title === titleName) {
                console.log("Todo is found, getTodo successful");
                return todoObj; //If todo is found, then return the object
            }
        }

        return alert("Error: Todo is not found, getTodo not successful");
    }

    function removeTodo(titleName, projName) {
        //get the project that todo is in
        const tempProj = getProject(projName);
        if (!tempProj) {
            return console.log("Project doesn't exist, removeTodo not successful")
        }
        //Search for todo from todos array
        for (let i = 0; i < tempProj.todos.length; i++) {
            if (tempProj.todos[i].title === titleName) {
                //Finds todo with index and removes it 
                tempProj.todos.splice(i, 1);
                updateProjectAll(projName, tempProj); //Overwrites existing project with tempProj to reflect todo array deletion
                return console.log("removeTodo successful");
            }
        }

        return console.log("given todo not found, removeTodo not successful");
    }

    function updateCompleteStatus(todoObj, currentProj) {
        const tempProj = getProject(currentProj.name);

        for(let todo of tempProj.todos) {
            if(todo.title === todoObj.title) {
                if(todo.status === "incomplete") {
                    todo.status = "complete";
                }
                else {
                    todo.status = "incomplete";
                }
                break;
            }
        }
        
        localStorage.setItem(tempProj.name, JSON.stringify(tempProj));
        return tempProj;
    }

    function updateTodo(prevTitleName, projName, replaceTitle, replaceDes, replaceDate, replacePriority, replaceStatus) {

        //Also check if prevTitleName (previous todo) even exists
        let prevTodoExist = false;
        const tempProj = getProject(projName);
        for (let todo of tempProj.todos) {
            if (todo.title === prevTitleName) {
                prevTodoExist = true; //Found, it does exist and will replace.
            }
        }

        if (prevTodoExist) {//If the previous todo exists, attempt to replace
            // 1. create a new todo and add it to the selected project
            if (createTodo(replaceTitle, replaceDes, replaceDate, replacePriority, replaceStatus, projName)) {
                // 2. remove the previous todo since we want to swap out the previous todo with the replacement 
                //    we just made above
                removeTodo(prevTitleName, projName);
                console.log("updateTodo successful");
                return true;
            }
        }
        alert("updateTodo not successful");
        return false;
    }

    return { createProject, createDefaultProject, removeProject, getProject, updateProjectName, getLastProject, getAllProjectKeys, createTodo, getTodo, removeTodo, updateTodo, updateCompleteStatus };
}

export default ProjectAndTodo;