function position(e)
{
    return point(e.clientX, e.clientY);
}



function getStyleValue(obj, style)
{
    return window.getComputedStyle(obj).getPropertyValue(style);
}



function getCtrlKey(e)
{
    return  isMac && e.metaKey
        || !isMac && e.ctrlKey;
}



function dispatchNewEvent(target, proto)
{
    target.dispatchEvent(new proto.constructor(proto.type, proto));
}



function createDiv(className = '', id = '')
{
    const div = document.createElement('div');
    
    if (className != '')
        div.className = className;
    
    if (id != '')
        div.id = id;

    return div;
}



function createTextbox(className = '')
{
    const textbox = document.createElement('INPUT');
    textbox.setAttribute('type', 'text'); 

    if (className.trim() != '')
        textbox.className = className;
    
    return textbox;
}



function enableElementText(elem, enable)
{
    elem.style.fontStyle  = enable ? 'normal' : 'italic'; 
    elem.style.fontWeight = enable ? 'normal' : 'bold';
}



function hasFocus(elem)
{
    return elem == document.activeElement;
}



function setStyle(id, properties)
{
    var elem = document.getElementById(id);

    for (const property of properties)
        elem.style[property] = properties[property];
}



function containsChild(parent, child)
{
    return child.parentNode == parent;
}



function forwardEvent(event, element)
{
    var e = new event.constructor(event.type, event);
    element.dispatchEvent(e);
}



// function triggerMouseEvent(element, event, px, py, button = 0)
// {
//     const e = new MouseEvent(event, 
//     {
//         clientX: px,
//         clientY: py,
//         button:  button
//     });
//
//     element.dispatchEvent(e);
// }