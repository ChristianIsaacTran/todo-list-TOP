# node-template-repo
This is a template repository for myself with the sole purpose of creating future repositories that use webpack and npm easier.

-- Includes a .gitignore to ignore the node_modules and the dist file since the dist folder is going to be our bundled website code and node_modules is tracked by package.json and can be reinstalled based on package.json dependencies.

-- Updated 4/26/2025 with all of the basic html and css loaders for the webpack.config.js files. Also added the production mode and the development modes with npm scripts to run their respective config files.

-- Functionality Requirements: 
    each todo-item has to contain: 
    1. title
    2. description of the todo
    3. dueDate of todo
    4. priority
    5. A notes function (???)
    6. checklist

    the page should also include a default "project"/todo list to showcase the user's todos (kind of like a summary page)
    1. Should be able to create new projects/lists
    2. User can choose which project to put their todo tasks into

    UI should be able to:
    1. View all projects
    2. View all todos in each project
    3. Expand a single todo to see details/edit details
    4. delete a todo/project

-- Add additional library to help:
    1. date-fns library to help format dates and times
    2. No data storage yet, so we can store data locally to the user's computer with localStorage. Uses JSON to send and store data.

Modules:

ProjectAndTodo.js - 
    -- Main behind the scenes logic for creating projects, which are folders in which todos will reside inside, and todos themselves 
    to add to the chosen project. 
    Functionalities: 
        -- createProject(projName): creates a new project object and assigns the projName as the object name, and the key name in localStorage.
        
        -- removeProject(projName): removes a project from localStorage by using the projName/key in localStorage.

        -- getProject(projName): used to get a project from localStorage and returns a project object by parsing the JSON.

        -- updateProjectName(prevName, replaceName): used to update the project's name and also it's key as well in localStorage.

        -- viewProject(projName): displays the given project's name, and the todos under the project in the console.

        -- updateProjectAll(key, projObj): this is a utility function that is unexposed. Used to overwrite a localStorage key/value with another given JSON.

        -- createTodo(title, description, dueDate, priority, projName): creates a new todo object with the specified properties. Pushes the todo in the project todo array.

        -- getTodo(titleName, projName): gets the specified todo object from the specified project.

        -- removeTodo(titleName, projName): removes a todo from the project's todo array. Need to specify both what project to remove todo from, and the todo to be removed.

        -- updateTodo(prevTitleName, projName, replaceTitle, replaceDes, replaceDate, replacePriority): given a todo that you want to replace and the project that it's in, it will replace the todo in the project's todo array with the new todo specified with new properties.

    **All project/todo functions check if either the todo/project even exists. Will send a console.log if it is successful or not**


    Plans to implement:
    
    -- Project Buttons: 
    (Done) Edit Project Name button: confirmed working 4/30/2025. Changes the current project's name on display and in the localStorage

    Change Quest button: Changes the current project that the user is viewing. Bring up a modal with a drop down menu of all of the projects. Probably can get all of them in a loop with localStorage.key();


    -- Todo Buttons: 
    Complete button: toggles a crossed out faded thing to indicate the todo is completed.

    Edit: Edit the todo properties and update them.

    remove: completely removes the todo from the project.

    ** (not made yet) view: will let the user view the entire selected todo in detail, probably through a modal.