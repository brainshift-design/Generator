function noNaN(x, replace)
{
    return !isNaN(x) ? x : replace;
}



function isSimpleLatinLetter(c)
{
    return c >= 'a' && c <= 'z'
        || c >= 'A' && c <= 'Z';
}


function getDigitCount(i)
{
    if (i == 0) return 1;

    let l = Math.floor(Math.log10(Math.abs(i))); // the minus sign doesn't count as a digit;

    return l + 1;
}



function getDecimalFactor(dec)
{
    return Math.pow(10, -dec);
}



function isDigit(c)
{
    return c >= '0' 
        && c <= '9';
}



function isHexDigit(c)
{
    return c.length == 1
        && (   c >= 'A' && c <= 'F'
            || c >= 'a' && c <= 'f');
}



function decDigits(num) 
{
    if (typeof num !== 'number')
        consoleError('Input must be a number');

    return strDecDigits(num.toFixed(10));
}



function strDecDigits(strNum)
{
    const iDec = strNum.indexOf('.');
    
    if (iDec === -1)
        return 0;
    
    let count = strNum.length - iDec - 1;
    
    for (let i = strNum.length-1; i > iDec; i--)
    {
        if (strNum[i] === '0')
            count--;
        else
            break;
    }
    
    return count;
}



function isArrowKey(code)
{
    return code == 'ArrowLeft'
        || code == 'ArrowRight'
        || code == 'ArrowUp'
        || code == 'ArrowDown';
}



function numToString(num, dec = 0, showHex = false, decSep = '.', thouSep = '')
{
    return showHex
         ? numToStringHex(num, dec, decSep, thouSep)
         : numToStringDec(num, dec, decSep, thouSep);
}



function numToStringDec(num, dec, decSep = '.', thouSep = '')
{
    const _dec = Math.abs(dec);
    let    str = Number(num).toFixed(_dec).toString(10);
    

    // find decimal place
    
    let i = str.length-1;
    
    while (i >= 0
        && str[i] !== '.' 
        && str[i] !== ',')
        i--;

    if (i < 0) // if no decimal place
        return addGroupSeparator(str, thouSep, 3);

    
    let whole = str.slice(0, i);
    let frac  = str.slice(i+1);


    // format fraction

    i = frac.length-1;

    if (dec < 0)
    {
        while (i >= 0 
            && frac[i] === '0')
            frac = frac.substring(0, i--);
    }    


    return addGroupSeparator(whole, thouSep, 3) + (frac != '' ? decSep : '') + frac;
}



function numToStringHex(num, dec, decSep = '.', thouSep = '')
{
    const _num = Number(num);
    const _dec = Math.abs(dec);

    let   _str = Number(num).toFixed(_dec).toString(10);
    let    str = Math.abs(_num).toString(16);


    // find decimal place
    
    let i = str.length-1;

    while (i >= 0
        && str[i] !== '.' 
        && str[i] !== ',')
        i--;

    if (i < 0) // if no decimal place
        return addGroupSeparator(str, thouSep, 2);

    
    let whole = str.slice(0, i);
    let frac  = _str.slice(i+1);


    // format fraction
    
    i = frac.length-1;

    let _frac = parseFloat(frac);
    frac = '';

    while (_frac != 0)
    {
        _frac *= 16;

        const decFrac = Math.floor(_frac);

        frac += decFrac.toString(16);
        _frac -= decFrac;
    }    


    if (whole.length % 2 > 0) whole = '0' + whole;
    if (frac .length % 2 > 0) frac  = frac + '0';


    const neg = num < 0 ? '-' : '';

    return neg + addGroupSeparator(whole, thouSep, 2) + decSep + addHexFracGroupSeparator(frac, thouSep, 2);
}



function addGroupSeparator(_str, sep, groupSize)
{
    let str = '';

    for (let i = _str.length-1, t = 0; i >= 0; i--, t++)
    {
        if (t == groupSize)
        {
            str = sep + str;
            t = 0;
        }

        str = _str[i] + str;
    }

    return str;
}



function addHexFracGroupSeparator(_str, sep, groupSize)
{
    let str = '';

    for (let i = 0, t = 0; i < _str.length; i++, t++)
    {
        if (t == groupSize)
        {
            str += sep;
            t = 0;
        }

        str += _str[i];
    }

    return str;
}



// function numToString(num, dec)
// {
//     lst str = Number(num).toFixed(dec).toString();

//     let i = 0;

//     // find decimal place

//     while (   i < str.length 
//            && str[i] !== '.' 
//            && str[i] !== ',')
//         i++;

//     if (i >= str.length) // if no decimal place
//         return str;

//     i = str.length-1;

//     while (i >= 0 && str[i] === '0')
//         str = str.substring(0, i--);

//     if (str[i] === '.' || str[i] === ',') // hack because JavaScript has shit support for locales
//         str = str.substring(0, i--);

//     return str;
// }



function capitalize(str)
{
    let cap = "";

    if (str.length > 0)
        cap += str[0].toUpperCase();

    if (str.length > 1)
        cap += str.substring(1).toLowerCase();

    return cap;
}



function getQueryVariable(strVar)
{
    const query = window.location.search.substring(1);
    const vars  = query.split('&');

    for (let i = 0; i < vars.length; i++) 
    {
        let pair = vars[i].split('=');

        if (pair[0] == strVar)
            return pair[1];
    }

    return false;
}