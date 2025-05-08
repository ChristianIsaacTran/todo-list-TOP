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
    
    (Done) -- Project Buttons: 
    (Done) Edit Project Name button: confirmed working 4/30/2025. Changes the current project's name on display and in the localStorage

    **note: max-character length of project name is 20 characters

    (Done) Change Quest button: Confirmed working 5/1/2025. Changes the current project that the user is viewing. Bring up a modal with a drop down menu of all of the projects. Probably can get all of them in a loop with localStorage.key();


    (Done) -- Todo Buttons: 
    (Done) Complete button: Confirmed working 5/1/2025. toggles a crossed out faded thing to indicate the todo is completed.

    (Done) Edit: Confirmed working 5/6/2025. Edit the todo properties and update them.
    Also used date-fns to format the dates
    
    **note: max-character length for todo-description is 275 characters

    (Done)remove: Confirmed working 5/5/2025. completely removes the todo from the project visually, and also from localStorage.

    (Done) view: Confirmed working 5/5/2025. Will let the user view the entire selected todo in detail, probably through a modal.

    (Done) Confirmed working 5/8/2025 -- Create todo menu:
    Switch to a separate page/menu where it is similar to the edit button modal 
    where the user can enter any information and submit it, then it will add it to 
    a chosen project and confirms with the user that it has been added.

    (Done) Confirmed working 5/7/2025 -- Create Project menu:
    Same thing as the create todo menu but for projects. Have a form that lets users
    input the project name and creates a new project in the localStorage. confirms with 
    the user if the project is successfully added.

   (Done) Confirmed working 5/8/2025 -- View all projects page
    A grid/flex that cascades and displays all of the project names in a card format,
    similar to the todo card list. Will be scrollable if overflow.


    (Done) Confirmed working 5/8/2025 -- Page switching logic in index.js 
    Finished the logic for switching pages with the navigation links on the sidebar. Made a utility function 
    that queries all of the inside html elements inside the content div and removes them so that the next page can re-render.
    Since following the odin project's teachings, all of the modules do their own thing (single responsibility principle)
    and so they all function independently from one another. 



-- ** (finished project 5/8/2025) Notes: I am very proud that I finished this project. It was kind of complex with all of the modals I made, but 
I feel like this is an application that does what it needs to do while also demonstrating the use of SOLID principles, webpack configs, npm scripts, 
and npm library imports (date-fns). I gotta keep going, I am learning so much.