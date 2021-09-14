const R = 0, G = 1, B = 2, A = 3;
const Eps = 0.0000001;



function toInt(f)
{
    return Math.floor(f) | 0;
}



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
    
    if (   str[i] === '.' 
        || str[i] === ',') // hack because JavaScript
        str = str.substring(0, i--);
    
    return str;
}



function removeFrom(array, item)
{
    var index = array.indexOf(item);

    if (index > -1)
        array.splice(index, 1)
}



function removeLast(array)
{
    if (array.length == 0)
        return null;

    var last = lastOf(array);
    array.splice(array.length-1, 1)

    return last;
}



function lastOf(array)
{
    return array[array.length-1];
}



function capitalize(str)
{
    var cap = "";

    if (str.length > 0)
        cap += str[0].toUpperCase();

    if (str.length > 1)
        cap += str.substring(1).toLowerCase();

    return cap;
}



function toUtf8(str) 
{
    return decodeURI(encodeURIComponent(str));
}



function fromUtf8(str) 
{
    return decodeURIComponent(encodeURI(str));
}



function stringToArray(str)
{
    return Array.from(fromUtf8(str), c => c.charCodeAt(0));
}



function arrayToString(bytes) 
{
    var str = '';

    for (var i = 0; i < bytes.length; i++)
        str += String.fromCharCode(bytes[i]);

    return str;
}