const isMac = navigator.platform.toLowerCase().indexOf('mac') >= 0;



function setStyle(id, properties)
{
    var elem = document.getElementById(id);

    for (const property of properties)
        elem.style[property] = properties[property];
}



function indexOfChild(parent, child)
{
    return Array.prototype.indexOf.call(parent.children, child);
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



function countToString(items, itemName)
{
    return itemName + (items.length == 1 ? '' : 's');
}



function decCount(strValue)
{
    const dotIndex   = strValue.indexOf('.');//getUserDecimalSeparator());
    const commaIndex = strValue.indexOf(',');//getUserDecimalSeparator());

    return dotIndex >= 0
         ? strValue.length-1 - dotIndex
         : (commaIndex >= 0
            ? strValue.length-1 - commaIndex
            : 0);
}



function getUserDecimalSeparator()
{
    const num = 1.1;

    return num
        .toLocaleString(navigator.language)
        .substring(1, 2);
}



function isEmptyObject(obj)
{
    if (obj == null)
        return false;
        
    return (
           Object.keys(obj).length === 0 
        && obj.constructor === Object);
}



function shallowCopy(obj)
{
    return Object.assign(Object.create(Object.getPrototypeOf(obj)), obj);
}



function deepCopy(obj)
{
    return JSON.parse(JSON.stringify(obj));
}



function filterUnique(array)
{
    return array.filter((value, index) => 
        array.indexOf(value) === index);
}



function createSvg(element)
{
    var svg = document.createElementNS('http://www.w3.org/2000/svg', element);
    svg.style.pointerEvents = 'none';
    return svg;
}



function show(element, show = true) 
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


function hide(element)              
{ 
    show(element, false); 
}



function isVisible(element)
{ 
    return element.style.visibility == 'visible'; 
}



function copyArray(src, dst)
{
    copyArrayAt(
        src, 0, src.length,
        dst, 0, dst.length);
}



function copyArrayAt(src, srcStart, srcSize, dst, dstStart, dstSize)
{
    var size = Math.min(srcSize, dstSize);

    for (var i = 0; i < size; i++)
        dst[dstStart + i] = src[srcStart + i];
}



function newSizeArrayFrom(array, size) // resizes an array and returns a new array
{
    var newArray = new Uint8Array(size);
    copyArray(array, newArray);
    return newArray;
}



function arraysEqual(arr1, arr2)
{
    if (arr1.length != arr2.length)
        return false;

    for (var i = 0; i < arr1.length; i++)
    {
        if (arr1[i] != arr2[i])
            return false;
    }

    return true;
}



function removeFromArray(array, item)
{
    var index = array.indexOf(item);
    
    if (index > -1)
        array.splice(index, 1);
}



function removeFromArrayWhere(array, where)
{
    var index = array.findIndex(where);
    
    if (index > -1)
        array.splice(index, 1);
}



function isLastInArray(array, item)
{
    return array.indexOf(item) == array.length-1;
}



function pushUnique(array, item)
{
    if (Array.isArray(item))
    {
        items
            .filter(i => !array.includes(i))
            .forEach(i => array.push(i));
    }
    else if (!array.includes(item))
        array.push(item);
}



function clearChildren(parent) 
{
    while (parent.firstChild)
        parent.removeChild(parent.firstChild);
}



function replaceInStringAt(str, index, replace)
{
    return str.substring(0, index) 
         + replace 
         + str.substring(index + replace.length);
}



function strFromData(data)
{
    var str = '';

    for (var i = 0; i < data.length; i++)
        str += String.fromCharCode(data[si]);

    return str;
}



function clearConsole()
{
    setTimeout(console.clear.bind(console));
}



function log(...params)
{
    setTimeout(console.log.bind(console, ...params)); // doesn't show log source, which makes logs cleaner
}



function logTrace()
{
    setTimeout(console.trace.bind(console));
}



function boolString(bool)
{
    return bool ? 'true' : 'false';
}



function isTrue(strBool)
{
    return strBool == 'true';
}



function strIsNum(str) 
{
    if (typeof str != 'string') 
        return false; // only process strings

    if (str == 'NaN') // explicitly support NaN
        return true;

    return !isNaN(str) // use type coercion to parse the whole string
        && !isNaN(parseFloat(str)); // ensure strings of whitespace fail
}



function reflow(elem)
{
    void(elem.offsetHeight);
}