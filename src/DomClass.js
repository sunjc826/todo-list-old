// helper classes for dom manipulation

const ExpandableDiv = function(id, init, expand, obj, tag="div") {
    // An object that is coupled with the div
    const linkedObj = obj;

    let currentDiv;

    const EmptyDiv = function() {
        const div = document.createElement(tag);
        div.setAttribute("id", id);
        return div;
    };

    function getDiv() {
        return currentDiv;
    }

    const STATE = {
        DEFAULT: 0,
        EXPANDED: 1,
    }
    let state;
    

    function initDiv() {
        state = STATE.DEFAULT;
        currentDiv = EmptyDiv();
        refresh();
        return currentDiv;
    }

    function refresh() {
        currentDiv.innerHTML = "";
        // list of elements
        const div = init(linkedObj);
        currentDiv.appendChild(div);
        const expandText = document.createElement("p");

        

        expandText.addEventListener("click", function() {
            if (state == STATE.DEFAULT) {
                expandDiv(this);
                this.textContent = "Hide details";
                state = STATE.EXPANDED;
            } else {
                
                currentDiv.querySelector(".expansion").remove();
                this.textContent = "See details";
                state = STATE.DEFAULT;
            }
        });
        currentDiv.appendChild(expandText);
        if (state == STATE.EXPANDED) {
            expandText.textContent = "Hide details";
            expandDiv(expandText);
        } else {
            expandText.textContent = "See details";
        }
    }

    function expandDiv(expandText) {
        const div = expand(linkedObj);
        div.classList.add("expansion");
        currentDiv.insertBefore(div, expandText);
        return currentDiv;
    }

    initDiv();
    let returnValue = {
        getDiv,
        initDiv,
        refresh,
        expandDiv,
    };
    //let attr = document.createAttribute("data-expandable-div");
    //currentDiv.setAttributeNode(attr);
    //currentDiv.setAttribute("data-expandable-div", function() {return returnValue});
    currentDiv.expandableDiv = returnValue;
    return returnValue;
};

const divHelper = (function() {
    function createDivWithHeading(headingText, text) {
        const div = document.createElement("div");
        // div.setAttribute("style", "text-align: left;");
        const heading = document.createElement("h3");
        heading.textContent = headingText;
        div.appendChild(heading);

        if (text) {
            const p = document.createElement("p");
            p.textContent = text;
            div.appendChild(p);
        }

        return div;
    }

    // adds list data to parentDiv
    // childdiv is of type ExpandableDiv
    function displayList(parentDiv, listData, createChildDiv) {
        parentDiv.innerHTML = "";
        let numItems = listData.getCount();
        for (let i = 0; i < numItems; i++) {
            const item = listData.getAtIndex(i);
            const childDiv = createChildDiv(item, i).getDiv();
            parentDiv.appendChild(childDiv);
        }
        return parentDiv;
    }

    return {createDivWithHeading, displayList};
})();


const formHelper = (function() {
    function createInputField(inputName, inputId, inputType="text") {
        const label = document.createElement("label");
        const input = document.createElement("input");
        input.setAttribute("id", inputId);
        input.setAttribute("type", inputType);
        label.appendChild(input);
        return label;
    }

    return {createInputField};
})();

export {ExpandableDiv, divHelper, formHelper};