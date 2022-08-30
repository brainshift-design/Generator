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



function createDiv(className = '')
{
    const div = document.createElement('div');
    
    if (className != '')
        div.className = className;
    
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