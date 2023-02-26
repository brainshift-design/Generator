const isMac = navigator.platform.toLowerCase().indexOf('mac') >= 0;



var utilCanvas;
var utilContext;
    


function initUtilContext()
{
    utilCanvas  = document.createElement('canvas');
    utilContext = utilCanvas.getContext('2d');
}



function indexOfChild(parent, child)
{
    return Array.prototype.indexOf.call(parent.children, child);
}



function pluralString(count, pluralChar = 's')
{
    return count == 1 ? '' : pluralChar;
}



function countString(itemName, count)
{
    const lastChar   = lastOf(itemName);
    const pluralChar = lastChar == lastChar.toUpperCase() ? 'S' : 's';

    return itemName + pluralString(count, pluralChar);
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



function clone(val) 
{
    const type = typeof val;
    
    if (val === null) 
      return null;

    else if (type === 'undefined' 
          || type === 'number' 
          || type === 'string' 
          || type === 'boolean') 
        return val;

    else if (type === 'object') 
    {
        if (val instanceof Array) 
            return val.map(x => clone(x));

        else if (val instanceof Uint8Array) 
            return new Uint8Array(val);

        else 
        {
            let obj = {};

            for (const key in val) 
                obj[key] = clone(val[key]);

            return obj;
        }
    }

    throw 'unknown';
}



function filterUnique(array)
{
    return array.filter((value, index) => 
        array.indexOf(value) === index);
}



function createSvg(element)
{
    const svg = document.createElementNS('http://www.w3.org/2000/svg', element);
    svg.style.pointerEvents = 'none';
    return svg;
}



function isVisible(element)
{ 
    return element.style.visibility == 'visible'; 
}



function isLastInArray(array, item)
{
    return array.indexOf(item) == array.length-1;
}



function pushUnique(array, item)
{
    if (Array.isArray(item))
        item.forEach(i => pushUnique(array, i));
    else if (!array.includes(item))
        array.push(item);
}



function pushUniqueExcept(array, item, except)
{
    if (Array.isArray(item))
        item.forEach(i => pushUniqueExcept(array, i, except));
    else if (!array.find(except))
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
    let str = '';

    for (let i = 0; i < data.length; i++)
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



function printNum(num)
{
    return !isNaN(num) ? num : NAN_CHAR;
}



function parseNum(str)
{
    return str == NAN_CHAR
         ? Number.NaN 
         : parseFloat(str);
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


function readonly(target, name, descriptor)
{
    descriptor.writable = false;
    return descriptor;
}



function osCtrl()  { return isMac ? '⌘' : 'Ctrl+';  }
function osAlt()   { return isMac ? '⌥' : 'Alt+';   }
function osShift() { return isMac ? '⇧'  : 'Shift+'; }



function isMultiplier(node)
{
    return node instanceof OpRepeat;
}



function getCreateNodeAction(type, creatingButton, options)
{
    return !!options.insert
           ? new CreateInsertNodeAction(type, creatingButton, options)
           : new CreateNodeAction      (type, creatingButton, options, settings.autoConnectNewNodes);
}



function isPanning(e)
{
    if (panMode)
    {
        e.preventDefault();
        setCursor(panCursor);
        return true;
    }

    if (graphView.spaceDown)
    {
        e.preventDefault();
        return true;
    }

    return false;
}



function point2screen(p)
{
    return point(
        (p.x + graphView.pan.x / graphView.zoom) * graphView.zoom,
        (p.y + graphView.pan.y / graphView.zoom) * graphView.zoom);
}



function rect2screen(rect)
{
    return new Rect(
        (rect.x + graphView.pan.x / graphView.zoom) * graphView.zoom,
        (rect.y + graphView.pan.y / graphView.zoom) * graphView.zoom,
        rect.w / graphView.zoom,
        rect.h / graphView.zoom);
}