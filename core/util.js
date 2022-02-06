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



function getDecimalCount(strValue)
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



function numToString(num, dec)
{
    var str = Number(num).toFixed(dec).toString();

    var i = 0;

    // find decimal place

    while (   i < str.length 
           && str[i] !== '.' 
           && str[i] !== ',')
        i++;

    if (i >= str.length) // if no decimal place
        return str;

    i = str.length-1;

    while (i >= 0 && str[i] === '0')
        str = str.substring(0, i--);

    if (str[i] === '.' || str[i] === ',') // hack because JavaScript has shit support for locales
        str = str.substring(0, i--);

    return str;
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
    return Object.assign({}, obj);
}



function deepCopy(obj)
{
    return JSON.parse(JSON.stringify(obj));
}



function createSvg(element)
{
    var svg = document.createElementNS('http://www.w3.org/2000/svg', element);
    svg.style.pointerEvents = 'none';
    return svg;
}



function show(element, show = true) { element.style.visibility = show ? 'visible' : 'hidden'; }
function hide(element)              { element.style.visibility = 'hidden';  }

function isVisible(element) { return element.style.visibility == 'visible'; }


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



function removeFromArray(array, obj)
{
    var index = array.indexOf(obj);
    
    if (index > -1)
        array.splice(index, 1);
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
    setTimeout(console.log.bind(console, ...params));
}



function logTrace()
{
    setTimeout(console.trace.bind(console));
}
