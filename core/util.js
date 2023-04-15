const isMac = navigator.platform.toLowerCase().indexOf('mac') >= 0;



var utilCanvas;
var utilContext;
    


function initUtilContext()
{
    utilCanvas  = document.createElement('canvas');
    utilContext = utilCanvas.getContext('2d');

    utilContext.willReadFrequently = true;
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
    const lastChar   = itemName.at(-1);
    const pluralChar = lastChar == lastChar.toUpperCase() ? 'S' : 's';

    return itemName + pluralString(count, pluralChar);
}



function decCount(strValue)
{
    const dotIndex   = strValue.indexOf('.');
    const commaIndex = strValue.indexOf(',');

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
    return !isNaN(num) ? num : NAN_DISPLAY;
}



function parseNum(str)
{
    return str == NAN_DISPLAY
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



function osCtrl     (plus = true) { return isMac ? ('⌘' + (plus ? ' ' : '')) : ('Ctrl'  + (plus ? '+' : '')); }
function osAlt      (plus = true) { return isMac ? ('⌥' + (plus ? ' ' : '')) : ('Alt'   + (plus ? '+' : '')); }
function osShift    (plus = true) { return isMac ? ('⇧' + (plus ? ' ' : '')) : ('Shift' + (plus ? '+' : '')); }
function osCtrlShift(plus = true) { return isMac ? osShift(plus) + osCtrl(plus) : osCtrl(plus) + osShift(plus); }



function isMultiplier(node)
{
    return node instanceof OpRepeat;
}



function getCreateNodeAction(type, creatingButton, options)
{
    let node = createNode(type);

    if (isEmpty(node.headerOutputs))
        options.autoConnect = true;

    node = null;


    return !!options.insert
        &&  !options.autoConnect
           ? new CreateInsertNodeAction(type, creatingButton, options)
           : new CreateNodeAction      (type, creatingButton, options, !!options.autoConnect);
}



function simpleIntHash(x)
{
    return (x * 2654435761 % Math.pow(2, 32)) / Math.pow(2, 32);
}



function getNewNumberId(nodes, checkExists, curId, id = curId, join = '')
{
    if (!checkExists(id))//nodes.find(n => n.id == id))
        return id;
    

    let numLength = getNumLength(id);

    if (numLength > 0)
    {
        const len = id.length - numLength;
        let   num = parseInt(id.substring(len));

        let newId = '';
        while (newId == '' || checkExists(newId))//nodes.find(n => n.id == newId))
            newId = id.substring(0, len + join.length) + join + (++num);

        return newId;
    }

    else if (numLength == 0)
    {
        let num   = 2;
        let newId = id + join + num;

        while (checkExists(newId))//nodes.find(n => 
            //    n.id != curId 
            // && n.id == newId))
            newId = id + join + (++num);

        return newId;
    }

    else
        return id;
}



function getNumLength(name)
{
    let numLength = 0;

    for (let i = name.length - 1; i >= 0; i--)
    {
        if (isDigit(name[i])) numLength++;
        else break;
    }

    return numLength;
}
