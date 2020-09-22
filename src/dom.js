// master class for DOM manipulation related functionality

import events from "./pubsub.js";

const categoryPanel = document.querySelector(".sidebar");

const categories = categoryPanel.querySelectorAll("li");

const mainPanel = document.querySelector("main");
const todoHeading = mainPanel.querySelector("#todo-heading");
const todoPanel = mainPanel.querySelector("#todo-list");

categories.forEach(category => {
    events.emit("addCategory", category.getAttribute("id"));
    category.addEventListener("click", catListener);
});

function catListener(e) {
    events.emit("queryCategory", this.getAttribute("id"));
}

function displayList(todoList) {
    todoHeading.textContent = todoList.getName();
    let numItems = todoList.getTodoCount();
    for (let i = 0; i < numItems; i++) {
        const todo = todoList.getTodo(i);
        const todoDiv = createTodo(todo, i);
        todoPanel.appendChild(todoDiv);
    }
}

function createTodo(todo, index) {
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
}

function createDivWithHeading(headingText, text) {
    const div = document.createElement("div");
    // div.setAttribute("style", "text-align: left;");
    const heading = document.createElement("h3");
    heading.textContent = headingText;
    const p = document.createElement("p");
    p.textContent = text;
    div.appendChild(heading);
    div.appendChild(p);
    return div;
}

function pubSub() {
    events.on("answerCategory", todoList => {
        displayList(todoList);
    });
}

pubSub();