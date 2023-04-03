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



function appendDivTo(div, to)
{
    if (!to.contains(div))
        to.appendChild(div);
}



function removeDivFrom(div, from)
{
    if (from.contains(div))
        from.removeChild(div);
}



function createTextbox(className = '')
{
    const textbox = document.createElement('INPUT');
    textbox.setAttribute('type', 'text'); 

    if (className.trim() != '')
        textbox.className = className;
    
    return textbox;
}



function createTextarea(className = '')
{
    const textarea = document.createElement('textarea');

    if (className.trim() != '')
        textarea.className = className;
    
    textarea.spellcheck = false;
    
    return textarea;
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
    const elem = document.getElementById(id);

    for (const property of properties)
        elem.style[property] = properties[property];
}



function containsChild(parent, child)
{
    return child.parentNode == parent;
}



function forwardEvent(event, element)
{
    const e = new event.constructor(event.type, event);
    element.dispatchEvent(e);
}



function offsetRect(element)
{
    return new Rect(
        element.offsetLeft,
        element.offsetTop,
        element.offsetWidth,
        element.offsetHeight);
}



function clientRect(element)
{
    return new Rect(
        element.clientLeft,
        element.clientTop,
        element.clientWidth,
        element.clientHeight);
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



function selectElementText(elementId)
{
    if (document.selection) // IE
    {
        var range = document.body.createTextRange();
        range.moveToElementText(document.getElementById(elementId));
        range.select();
    }
    else if (window.getSelection) 
    {
        var range = document.createRange();
        range.selectNode(document.getElementById(elementId));
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
    }
}



function isTouchpad(e)
{
    return Math.abs(e.deltaX) < 100
        && Math.abs(e.deltaY) < 100;
}



function showElement(element, show = true) 
{
    const showStyle = 'block';
    const hideStyle = 'none';

    if (  !show
        && element.style.display != hideStyle)
        element.oldDisplay = element.style.display;

    element.style.display = 
        show 
        ? (   element.style.oldDisplay 
           && element.style.oldDisplay != hideStyle
           ? element.style.oldDsplay
           : showStyle)
        : hideStyle; 
}


function hideElement(element)              
{ 
    showElement(element, false); 
}



function isVisible(element)
{
    return element.offsetParent !== null;
}



function getSelectedText(element) // only allow input[type=text] & textarea
{ 
    if (   element.tagName === 'TEXTAREA' 
        || (   element.tagName === 'INPUT' 
            && element.type === 'text')) 
    {
        return element.value.substring(
            element.selectionStart,
            element.selectionEnd);
    }
}



function clearSelectedText(element)
{
    if (   element.tagName === 'TEXTAREA' 
        || (   element.tagName === 'INPUT' 
            && element.type === 'text')) 
    {
        const str = element.value;

        element.value = 
              str.slice(0, element.selectionStart) 
            + str.slice(element.selectionEnd)
    }
}



function scrollbarVisible(element) 
{
    return element.scrollHeight > element.clientHeight;
}