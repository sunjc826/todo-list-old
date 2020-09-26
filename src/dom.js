// master class for DOM manipulation related functionality

import events from "./pubsub.js";
import {ExpandableDiv, divHelper, formHelper} from "./domClass.js";

let runDom = function() {
console.log("dom.js running");
// global variables
let currentTodoList; // should currentTodoList be here or in todo.js?


// DOM elements
const categoryPanel = document.querySelector(".sidebar");

const categories = categoryPanel.querySelectorAll("li");

const mainPanel = document.querySelector("main");
const todoHeading = mainPanel.querySelector("#todo-heading");
const todoPanel = mainPanel.querySelector("#todo-list");
const addTodoBtn = mainPanel.querySelector("#add-todo");

// event listeners
categories.forEach(category => {
    events.emit("addCategory", category.getAttribute("id"));
    category.addEventListener("click", catListener);
});
addTodoBtn.addEventListener("click", addTodoBtnListener);

function catListener(e) {
    addTodoBtn.setAttribute("style", "display: block;");
    events.emit("queryCategory", this.getAttribute("id"));
}

function addTodoBtnListener(e) {
    todoPanel.appendChild(newTodoForm); // remember to delete form after submission
}

// helper functions
const newTodoForm = (function() {
    const div = document.createElement("div");
    div.setAttribute("style", "position: relative; width: 100%; height: 100%");
    const form = document.createElement("form");
    form.setAttribute("id", "todo-form");
    form.classList.add("grid-form");
    // start by only allowing user to set name, date and priority
    const inputs = [
        ["Name: ", "name", "text"],
        ["Date: ", "date", "date"],
        ["Priority", "priority", "number"]
    ];
    
    for (let input of inputs) {
        const inputField = formHelper.createInputField(...input);
        form.appendChild(inputField);
    }

    div.appendChild(form);
    
    const submitBtn = document.createElement("button");
    submitBtn.textContent = "Submit";
    submitBtn.addEventListener("click", submitBtnListener);
    function submitBtnListener(e) {
        // create new todo
        const todoForm = this.parentNode.querySelector("form");
        const inputs = todoForm.querySelectorAll("input");
        const todoData = [];
        for (let input of inputs) {
            // console.log(input.value);
            todoData.push(input.value);
            input.value = "";
        }
        events.emit("createTodo", currentTodoList, todoData); // should currentTodoList be here or in todo.js?
        this.parentNode.remove();
        console.log("Form submitted");
    }

    div.appendChild(submitBtn);

    return div;
})();

function displayList(todoList) {
    todoHeading.textContent = todoList.getName();
    divHelper.displayList(todoPanel, todoList, createTodoDiv);
}



function createTodoDiv(todo, index) {
    const id = index;

    function initTodo(todoObj) {
        const div = document.createElement("div");
        const name = todoObj.getName();
        const date = todoObj.getDate();
        const priority = todoObj.getPriority();
    
        const lst = [["name", name], ["date", date], ["priority", priority]];
        for (let item of lst) {
            div.appendChild(divHelper.createDivWithHeading(item[0], item[1]));
        }
        return div;
    }

    function expandTodo(todoObj) {
        const div = document.createElement("div");
        const notes = todoObj.getNotes();
        const len = todoObj.getListLength();

        const elements = [];
        const lst = [["notes", notes]];
        for (let item of lst) {
            div.appendChild(divHelper.createDivWithHeading(item[0], item[1]));
        }

        const checklistDiv = document.createElement("ul"); 
        for (let i = 0; i < len; i++) {
            const text = todoObj.getListItemText();
            const selected = todoObj.getListItemStatus();
            const listItem = document.createElement("li");
            listItem.textContent = text;
            if (selected) {
                listItem.setAttribute("style", "list-style-type: bullet;");
            } else {
                listItem.setAttribute("style", "list-style-type: circle;");
            }
            checklistDiv.appendChild(listItem);
        }
        div.appendChild(checklistDiv);
        return div;
    }

    return ExpandableDiv(id, initTodo, expandTodo, todo, "section");
}

/*
function createExpandedTodo(todo, index) {
    const todoDiv = document.createElement("div");
    todoDiv.setAttribute("id", `${index}`);
    const name = todo.getName();
    const date = todo.getDate();
    const priority = todo.getPriority();
    const notes = todo.getNotes();
    const len = todo.getListLength();

    const lst = [["name", name], ["date", date], ["priority", priority], ["notes", notes]];
    for (let item of lst) {
        todoDiv.appendChild(createDivWithHeading(item[0], item[1]));
    }


    const checklistDiv = document.createElement("ul"); 
    for (let i = 0; i < len; i++) {
        const text = todo.getListItemText();
        const selected = todo.getListItemStatus();
        const listItem = document.createElement("li");
        listItem.textContent = text;
        if (selected) {
            listItem.setAttribute("style", "list-style-type: bullet;");
        } else {
            listItem.setAttribute("style", "list-style-type: circle;");
        }
        checklistDiv.appendChild(listItem);
    }
    todoDiv.appendChild(checklistDiv);
    return todoDiv;
}
*/

function pubSub() {
    events.on("answerCategory", 
        todoList => {
            currentTodoList = todoList;
            displayList(todoList);
        });
    events.on("doneCreateTodo", 
        () => {
            displayList(currentTodoList);
        });
}

pubSub();

};

export {runDom as default};