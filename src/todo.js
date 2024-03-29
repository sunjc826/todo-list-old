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

    function toString() {
        const output = [];
        for (let cat in categoryMap) {
            output.push(categoryMap[cat].toString());
        }
        return `{${output.join("")}}`;
    }

    return {
        addCategory,
        getTodoList,
        toString,
    }
}) ();


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

    function add(name, date, priority) {
        const todo = new Todo(name, date, priority, todoList.length);
        todoList.push(todo);
    }

    function getAtIndex(index) {
        return todoList[index];
    }

    function getCount() {
        return todoList.length;
    }

    function toString() {
        const output = [];
        for (let todo of todoList) {
            output.push(todo.toString());
        }
        return `{${output.join("")}}`;
    }

    return {
        getName,
        add, 
        getAtIndex,
        getCount,
        toString,
    }
}

const Todo = function(name, date, priority, index) {
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

    function getIndex() {
        return index;
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

    function toString() {
        return `{${name},${date},${priority},${notes},${checklist.toString()}}`;
    }

    return {
        toggleListItem,
        addListItem,
        getListLength,
        getListItemText,
        getListItemStatus,
        getName,
        getDate,
        getPriority,
        getNotes,
        getIndex,
        setName,
        setDate,
        setPriority,
        setNotes,
        toString,
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
        console.table(listItems);
    }

    function deleteItem(index) {
        listItems.splice(index, 1);
    }

    function toggleItem(index) {
        listItems[index].toggleSelected;
    }

    function getLength() {
        return listItems.length;
    }

    function getItemTextContent(index) {
        return listItems[index].getTextContent();
    }

    function getItemStatus(index) {
        return listItems[index].isSelected();
    }

    function setItemTextContent(index, newTextContent) {
        listItems[index].setTextContent(newTextContent);
    }

    function toString() {
        const output = [];
        for (let item of listItems) {
            output.push(item.toString());
        }
        return `{${output.join("")}}`;
    }

    return {
        addItem, 
        deleteItem,
        toggleItem,
        getLength,
        getItemTextContent,
        getItemStatus,
        setItemTextContent,
        toString,
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

    function toString() {
        return `{${selected},${textContent}}`
    }

    return {
        toggleSelected,
        isSelected,
        getTextContent, 
        setTextContent,
        toString,
    };
};

(function pubsub() {
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
            todoList.add(...todoData);
            events.emit("refresh");
        });
    events.on("addChecklistItem", 
        (todo, item) => {
            todo.addListItem(false, item);
            events.emit("refreshTodo", todo.getIndex());
        });
    events.on("saveAll", 
        () => {
            events.emit("saveDataReady", categoryList, "category-list");
        });
})();


};

export {runTodo as default};