const Epsilon = 0.0000001;



function nozero(x)
{
    return x != 0 ? x : Epsilon;
}



function noNaN(x, replace)
{
    return !isNaN(x) ? x : replace;
}



function getDigitCount(i)
{
    let l = Math.floor(Math.log10(Math.abs(i))); // the minus sign doesn't count as a digit;
    return l + 1;
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