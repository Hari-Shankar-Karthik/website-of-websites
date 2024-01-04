const output = document.querySelector("#preview");
const clearButton = document.querySelector("#clearOutput");
const defaultsButton = document.querySelector("#useDefaults");

const addItem = (tagName, tagContents, tagAttributeNames = [], tagAttributeValues = []) => {
    const nextElement = document.createElement(tagName);
    for(let i = 0; i < tagAttributeNames.length; i++) {
        nextElement.setAttribute(tagAttributeNames[i], tagAttributeValues[i]);
    }
    nextElement.innerHTML = tagContents;
    output.append(nextElement);
    clearButton.disabled = false;
    defaultsButton.disabled = true;
}

const removeAllItems = () => {
    while(output.childElementCount > 0) {
        output.removeChild(output.firstChild);
    }
    clearButton.disabled = true;
    defaultsButton.disabled = false;
}

const resetForm = (tagNameInput, tagContentsInput, attributePrompts) => {
    tagNameInput.value = "";
    tagContentsInput.value = "";
    while(attributePrompts.childElementCount > 0) {
        attributePrompts.removeChild(attributePrompts.firstChild);
    }
}

defaultsButton.addEventListener("click", () => {
    addItem("h1", "Website of Websites", ["class"], ["display-2"]);
    addItem("blockquote", "Website of Websites (WoW) is an awesome tool where you can interactively create your own website without using an editor.", ["class"], ["blockquote"])
    addItem("h2", "The Features", ["class"], ["display-4"]);
    addItem("p", "WoW comes with Bootstrap support. The interface is minimalistic, so you can dive right into creating your website and leave the boring bits to WoW. Just click away and marvel at the power of WoW!", ["class"], ["lead"]);
});


clearButton.addEventListener("click", removeAllItems);

// when I click on 'Add attribute' a new prompt for it shows up
const attributeButton = document.querySelector("#addAttribute");
const attributePrompts = document.querySelector("#attributePrompts")
attributeButton.addEventListener("click", () => {

    const namePrompt = document.createElement("input");
    namePrompt.setAttribute("class", "form-control col attributeName");
    namePrompt.setAttribute("type", "text");
    namePrompt.setAttribute("name", "attributeName");
    namePrompt.setAttribute("placeholder", "Attribute name");
    
    const valuePrompt = document.createElement("input");
    valuePrompt.setAttribute("class", "form-control col attributeValue");
    valuePrompt.setAttribute("type", "text");
    valuePrompt.setAttribute("name", "attributeValue");
    valuePrompt.setAttribute("placeholder", "Attribute value");

    const deleteAttribute = document.createElement("button");
    deleteAttribute.setAttribute("type", "button");
    deleteAttribute.setAttribute("class", "btn btn-danger btn-sm col-2 deleteAttribute");
    deleteAttribute.innerHTML = '<svg class="deleteAttribute" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16"><path class="deleteAttribute" d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/><path class="deleteAttribute" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/></svg>';
    
    const newAttribute = document.createElement("div");
    newAttribute.setAttribute("class", "row mb-2 nextAttribute");
    newAttribute.append(namePrompt);
    newAttribute.append(valuePrompt);
    newAttribute.append(deleteAttribute);
    attributePrompts.append(newAttribute);
});

// deleting an 'Add attribute' prompt 
attributePrompts.addEventListener("click", e => {
    if(e.target.classList.contains("deleteAttribute")) {
        let currentNode = e.target.parentNode;
        while(!currentNode.classList.contains("nextAttribute")) {
            currentNode = currentNode.parentNode;
        }
        currentNode.remove();
    }
});

// inserting element into preview section
const form = document.querySelector("#maker-form");
form.addEventListener("submit", e => {
    e.preventDefault();
    const tagNameInput = form.elements.tagName;
    const tagAttributeNames = [];
    const tagAttributeValues = [];
    for(let attributeNameInput of document.querySelectorAll(".attributeName")) {
        tagAttributeNames.push(attributeNameInput.value);
        attributeNameInput.value = "";
    }
    for(let attributeValueInput of document.querySelectorAll(".attributeValue")) {
        tagAttributeValues.push(attributeValueInput.value);
        attributeValueInput.value = "";
    }
    const tagContentsInput = form.elements.tagContents;
    addItem(tagNameInput.value, tagContentsInput.value, tagAttributeNames, tagAttributeValues);
    resetForm(tagNameInput, tagContentsInput, attributePrompts);
});

