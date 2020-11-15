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
    
    if (   str[i] === '.' 
        || str[i] === ',') // hack because JavaScript
        str = str.substring(0, i--);
    
    return str;
}    