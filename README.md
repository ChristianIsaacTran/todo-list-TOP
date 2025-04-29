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
