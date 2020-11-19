function setStyle(id, properties)
{
    var elem = document.getElementById(id);

    for (var property in properties)
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

//     element.dispatchEvent(e);
// }


function removeFromArray(obj, array)
{
    array.splice(array.indexOf(obj), 1);
}


function clearChildren(parent) 
{
    while (parent.firstChild)
        parent.removeChild(parent.firstChild);
}


function colorStyle_(r, g, b, a)
{
    if (a != undefined)
    {
        return 'rgba('
            + Math.round(r * 0xff) + ', '
            + Math.round(g * 0xff) + ', '
            + Math.round(b * 0xff) + ', '
            + a + ')';
    }
    else
    {
        return 'rgb('
            + Math.round(r * 0xff) + ', '
            + Math.round(g * 0xff) + ', '
            + Math.round(b * 0xff) + ')';
    }
}


function colorStyle(rgb)
{
    return colorStyle_(rgb[R], rgb[G], rgb[B], 1);
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


function show(element) { element.style.visibility = 'visible'; }
function hide(element) { element.style.visibility = 'hidden'; }


function colorFromDataType(dataType, active)
{
    switch (dataType)
    {
        case 'OBJ': return active ? ACTIVE_OBJ_COLOR : OBJ_COLOR;
        case 'NUM': return active ? ACTIVE_NUM_COLOR : NUM_COLOR;
    }

    return 'magenta';
}