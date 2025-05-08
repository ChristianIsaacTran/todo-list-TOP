import ProjectAndTodo from "./ProjectAndTodo.js";
import { format, parseISO } from "date-fns";

function CreateTodo() {

    function generateCreateTodo() {
        const contentContainer = document.createElement("#content");
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
        //Dynamically make project datalist options based on localStorage
        const projectOption = document.createElement("option");
        //Work on this tomorrow
    }

    return {generateCreateTodo};
}

export default CreateTodo;