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

function generate_list_elements(list, cdir = "", recursive = false) {
    const list_elements = document.createElement("ul");
    let list_display_state, accordion_state;
    if (recursive) {
        list_display_state = classes.hide;
        accordion_state = classes.closed;
    } else {
        list_display_state = classes.display;
        accordion_state = classes.open;
    }
    list_elements.classList.add(classes.list, list_display_state);
    let list_item, item_content, item_class, item_id, item_path;
    for (const item in list) {
        list_item = document.createElement("li");
        if (typeof list[item] === "string") {
            item_content = list[item];
            item_class = classes.file;
        } else {
            item_content = item;
            item_class = classes.dir;
        }
        const separator = "-";
        item_id = `${cdir}-${item_content}`.replaceAll(".", separator);
        item_path = `/${cdir.replaceAll(separator, "/")}/${item_content}`;
        list_item.innerHTML = `<div id="${item_id}" class="${item_class}"><div class="${classes.info}"><a href="${item_path}" target="_blank">${item_content}</a></div></div>`;
        if (typeof list[item] === "object" && Object.keys(list[item]).length > 0) {
            list_item.querySelector(`.${item_class}`).innerHTML += `<button class="${classes.accordion} ${accordion_state}" type="button" onclick="toggle_list_display(this)"><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 12H18M12 6V18" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>`;
            list_item.appendChild(generate_list_elements(list[item], item_id, true));
        }
        list_elements.appendChild(list_item);
    }
    return list_elements;
}

function toggle_list_display(source) {
    const dir_content = source.parentNode.parentNode.querySelector(`.${classes.list}`);
    if (source.classList.contains(classes.open) && dir_content.classList.contains(classes.display)) {
        source.innerHTML = `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 12H18M12 6V18" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
        source.classList.replace(classes.open, classes.closed);
        dir_content.classList.replace(classes.display, classes.hide);
    } else {
        source.innerHTML = `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 12L18 12" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
        source.classList.replace(classes.closed, classes.open);
        dir_content.classList.replace(classes.hide, classes.display);
    }
}