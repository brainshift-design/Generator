const R = 0, G = 1, B = 2, A = 3;
const Eps = 0.0000001;

function nozero(x)
{
    return x != 0 ? x : Eps;
}


function getDigitCount(i)
{
    var l = Math.floor(Math.log10(Math.abs(i))); // the minus sign doesn't count as a digit;
    return l + 1;
}


function isDigit(key)
{
    var is = 
           key >= '0' 
        && key <= '9';

    return is;
}

function isHexLetter(key)
{
    var is =
           key.length == 1
        && (   key >= 'A' && key <= 'F'
            || key >= 'a' && key <= 'f');

    return is;
}


function getNumberString(num, dec)
{
    var str = Number(num).toFixed(dec).toString();

    var i = 0;

    // find decimal place

    while (i < str.length && str[i] !== '.' && str[i] !== ',')
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


function forwardEvent(element, event)
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
    return (
           Object.keys(obj).length === 0 
        && obj.constructor === Object);
}