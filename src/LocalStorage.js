// Handles all storage functionality
import events from "./pubsub.js";

function store(saveData, dataName) {
    localStorage.setItem(dataName, saveData.toString());
}

function retrieve(dataName) {
    const data = localStorage.getItem(dataName);
    
}

(function pubsub() {
    events.on("saveDataReady", 
        (saveData, dataName) => {
            store(saveData, dataName);
        })
})();