const classes = {
    dir: "folder",
    file: "file",
    info: "info",
    accordion: "accordion",
    open: "open",
    closed: "closed",
    list: "list",
    display: "display",
    hide: "hide"
}

function generateListElements(list, cdir = "", recursive = false) {
    const listElements = document.createElement("ul");
    let listDisplayState, accordionState;
    if (recursive) {
        listDisplayState = classes.hide;
        accordionState = classes.closed;
    } else {
        listDisplayState = classes.display;
        accordionState = classes.open;
    }
    listElements.classList.add(classes.list, listDisplayState);
    let listItem, itemContent, itemClass, itemId, itemPath;
    for (const item in list) {
        listItem = document.createElement("li");
        if (typeof list[item] === "string") {
            itemContent = list[item];
            itemClass = classes.file;
        } else {
            itemContent = item;
            itemClass = classes.dir;
        }
        const separator = "-";
        itemPath = `${cdir}/${itemContent}`;
        itemId = itemPath.replaceAll(".", separator).replaceAll("/", separator);
        listItem.innerHTML = `<div id="${itemId}" class="${itemClass}"><div class="${classes.info}"><a href="${itemPath}" target="_blank">${itemContent}</a></div></div>`;
        if (typeof list[item] === "object" && Object.keys(list[item]).length > 0) {
            listItem.querySelector(`.${itemClass}`).innerHTML += `<button class="${classes.accordion} ${accordionState}" type="button" onclick="toggleListDisplay(this)"><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 12H18M12 6V18" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>`;
            listItem.appendChild(generateListElements(list[item], itemPath, true));
        }
        listElements.appendChild(listItem);
    }
    return listElements;
}

function toggleListDisplay(source) {
    const dirContent = source.parentNode.parentNode.querySelector(`.${classes.list}`);
    if (source.classList.contains(classes.open) && dirContent.classList.contains(classes.display)) {
        source.innerHTML = `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 12H18M12 6V18" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
        source.classList.replace(classes.open, classes.closed);
        dirContent.classList.replace(classes.display, classes.hide);
    } else {
        source.innerHTML = `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 12L18 12" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
        source.classList.replace(classes.closed, classes.open);
        dirContent.classList.replace(classes.hide, classes.display);
    }
}