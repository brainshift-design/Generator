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
    
    const strNum = num.toFixed(10);
    const iDec   = strNum.indexOf('.');
    
    if (iDec === -1)
        return 0;
    
    let count = 0;
    for (let i = iDec + 1; i < strNum.length; i++)
        if (strNum[i] !== '0')
            count++;
    
    return count;
}



function isArrowKey(code)
{
    return code == 'ArrowLeft'
        || code == 'ArrowRight'
        || code == 'ArrowUp'
        || code == 'ArrowDown';
}



function numToString(num, dec, showHex = false)
{
    if (showHex)
    {
        const _num = Number(num);
        let str = Math.round(Math.abs(_num)).toString(16);

        if (str.length % 2 > 0) str = '0' + str;
        if (_num < 0)           str = '-' + str;

        return str;
    }

    
    const _dec = Math.abs(dec);
    let    str = Number(num).toFixed(_dec).toString(showHex ? 16 : 10);
    

    let i = 0;

    // find decimal place

    while (i < str.length 
        && str[i] !== '.' 
        && str[i] !== ',')
        i++;

    if (i >= str.length) // if no decimal place
        return str;

        
    i = str.length-1;

    if (dec < 0)
    {
        while (i >= 0 && str[i] === '0')
            str = str.substring(0, i--);
        
         if (   str[i] === '.' 
             || str[i] === ',') // hack because JavaScript has shit support for locales
            str = str.substring(0, i--);
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