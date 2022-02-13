function createElement(type, className) {
    let obj = document.createElement(type);
    obj.className = className;
    return obj;
}


export {
    createElement,
}
