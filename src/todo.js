// master class for inner implementation of todo
// decoupled from dom manipulation

/*
 * 1. Create new todo
 * 2. Assign priority to todo
 * 3. Setting todo to complete
 * 4. Add notes to todo
 * 5. Add checklist to todo
 * 6. Modify content of todo
 */

import events from "./pubsub.js";


let runTodo = function() {

console.log("todo.js running");

function pubSub() {
    events.on("addCategory", 
        category => (categoryList.addCategory(category)));
    events.on("queryCategory", 
        category => {
            let todoList = categoryList.getTodoList(category);
            events.emit("answerCategory", todoList);
        });
    events.on("createTodo", 
        (todoList, todoData) => {
            // const [name, date, priority] = todoData;
            todoList.addTodo(...todoData);
            events.emit("doneCreateTodo");
        });
}

const categoryList = (function() {
    const categoryMap = {};

    function addCategory(category) {
        if (!(category in categoryMap)) {
            categoryMap[category] = new TodoList(category);
        }
    }

    function getTodoList(category) {
        return categoryMap[category];
    }

    return {
        addCategory,
        getTodoList,
    }
})();


const TodoList = function(name="Sample Todo list") {
    // hashset
    const tagSet = {};
    const todoList = []; // associative array vs index-array implementation? to review.


    function getName() {
        return name;
    }

    function addTag(tag) {
        if (!(tag in tagSet)) {
            tagSet[tag] = tag;
        }
    }

    function removeTag(tag) {
        if (tag in tagSet) {
            delete tagSet[tag];
        }
    }

    function addTodo(name, date, priority) {
        const todo = new Todo(name, date, priority);
        todoList.push(todo);
    }

    function getTodo(index) {
        return todoList[index];
    }

    function getTodoCount() {
        return todoList.length;
    }

    return {
        getName,
        addTodo, 
        getTodo,
        getTodoCount,
    }
}

const Todo = function(name, date, priority) {
    name = name || "Sample Task";
    let complete = "false";
    let notes = "";
    let checklist = Checklist();

    // tell don't ask
    function toggleListItem(index) {
        checklist.toggleItem(index);
    }

    function addListItem(selected, textContent, index) {
        checklist.addItem(selected, textContent, index);
    }

    function getListLength() {
        return checklist.getLength();
    }

    function getListItemText(index) {
        return checklist.getItemTextContent(index);
    }

    function getListItemStatus(index) {
        return checklist.getItemStatus(index);
    }


    // other getters and setters

    function getName() {
        return name;
    }

    function getDate() {
        return date;
    }

    function getPriority() {
        return priority;
    }

    function getNotes() {
        return notes;
    }

    function setName(newName) {
        name = newName;
    }

    function setDate(newDate) {
        date = newDate;
    }

    function setPriority(newPriority) {
        priority = newPriority;
    }

    function setNotes(newNotes) {
        notes = newNotes;
    }

    return {
        toggleListItem,
        addListItem,
        getListItemText,
        getListItemStatus,
        getName,
        getDate,
        getPriority,
        getNotes,
        setName,
        setDate,
        setPriority,
        setNotes
    };
}

const Checklist = function() {
    const listItems = [];

    function addItem(selected, textContent, index) {
        let listItem = ListItem(selected, textContent);
        if (index === undefined) {
            listItems.push(listItem);
        } else {
            listItems.splice(index, 0, listItem);
        }
    }

    function deleteItem(index) {
        listItem.splice(index, 1);
    }

    function toggleItem(index) {
        listItem[index].toggleSelected;
    }

    function getLength() {
        return listItems.length;
    }

    function getItemTextContent(index) {
        return listItem[index].getTextContent();
    }

    function getItemStatus(index) {
        return listItem[index].getStatus();
    }

    function setItemTextContent(index, newTextContent) {
        listItem[index].setTextContent(newTextContent);
    }

    return {
        addItem, 
        deleteItem,
        toggleItem,
        getLength,
        getItemTextContent,
        setItemTextContent,
    };
}

const ListItem = function(selected=false, textContent="") {

    function isSelected() {
        return selected;
    }

    function getTextContent() {
        return textContent;
    }


    function toggleSelected() {
        selected = !selected;
    }
    
    function setTextContent(newTextContent) {
        textContent = newTextContent;
    }

    return {
        toggleSelected,
        isSelected,
        getTextContent, 
        setTextContent,
    };
}

pubSub();


};

export {runTodo as default};