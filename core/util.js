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



function countString(count, singular, plural = singular)
{
    if (singular == plural)
    {
        const lastChar   = singular.at(-1);
        const pluralChar = lastChar == lastChar.toUpperCase() ? 'S' : 's';

        return singular + (count == 1 ? '' : pluralChar);
    }
    else
    {
        const lastChar = plural.at(-1);

        if (lastChar == lastChar.toUpperCase())
            plural = plural.toUpperCase();

        return count == 1
            ? singular
            : plural;
    }
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



function clearChildren(parent) 
{
    while (parent.firstChild)
        parent.removeChild(parent.firstChild);
}



// function replaceInStringAt(str, index, replace)
// {
//     return str.substring(0, index) 
//          + replace 
//          + str.substring(index + replace.length);
// }



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



function getCreateNodeAction(type, creatingButton, options)
{
    return  options.insert != undefined
        &&  options.insert
        && (    options.autoConnect == undefined
            || !options.autoConnect)
        ? new CreateInsertNodeAction(type, creatingButton, options)
        : new CreateNodeAction      (type, creatingButton, options, options.autoConnect != undefined && options.autoConnect);
}



function simpleIntHash(x)
{
    return (x * 2654435761 % Math.pow(2, 32)) / Math.pow(2, 32);
}



function getNewNumberId(curId, checkExists, id = curId, join = '')
{
    if (!checkExists(id))
        return id;
    

    let numLength = getNumLength(id);

    if (numLength > 0)
    {
        const len = id.length - numLength;
        let   num = parseInt(id.substring(len));

        let newId = '';
        while (newId == '' || checkExists(newId))
            newId = id.substring(0, len + join.length) + join + (++num);

        return newId;
    }

    else if (numLength == 0)
    {
        let num   = 2;
        let newId = id + join + num;

        while (checkExists(newId))
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



function isValidFloatString(str) 
{
    return /^-?\d*\.?\d*(e-?\d+)?$/.test(str);
}



function setControlFont(control, family, size, align = 'left')
{
    control.style.fontFamily = family;
    control.style.fontSize   = size + 'px';
    control.style.textAlign  = align;
}



function daysInMonth(month, year)
{
    if (month == 2)
    {
        return year % 4 != 0
             ? 28
             : 29;
    }
    else if (month == 4
          || month == 7
          || month == 9
          || month == 11)
        return 30;
    else
        return 31;
}



function getFontStyles(fontName)
{
    let fonts = figFonts.filter(f => f.fontName.family == fontName)


    fonts.sort((a, b) =>
    {
        if (a.fontName.style != b.fontName.style)
            return FONT_WEIGHTS.findIndex(w => w[0] == a.fontName.style.toLowerCase())
                 - FONT_WEIGHTS.findIndex(w => w[0] == b.fontName.style.toLowerCase());

        return 0;
    });

    
    return fonts.map(f => f.fontName.style);
}



function unescapeString(str)
{
    return str.replace(/\\(.)/g, (match, char) => 
    {
        const replacements = 
        {
            'n':  '\n',
            'r':  '\r',
            't':  '\t',
            '\\': '\\',
            '\'': '\'',
            '\"': '\"',
            '\`': '\`'
        };
      
        return replacements[char] || match;
    });
}



function getEditDistance(str1, str2)
{
    // calculate the Levenshtein distance between two strings
    // implementation taken from http://blog.softwx.net/2014/12/optimizing-levenshtein-algorithm-in-c.html

    // TODO replace with Damerau-Levenshtein

    if (str1.length == 0) return str2.length;
    if (str2.length == 0) return str1.length;

    // make sure str1 is the shorter string

    if (str1.length > str2.length)
    {
        const _str = str1;
        str1 = str2;
        str2 = _str;
    } 

    let len1 = str1.length; // min length of the two strings
    let len2 = str2.length;

    // suffix common to both strings can be ignored

    while (len1 > 0 
        && str1[len1 - 1] == str2[len2 - 1])
    {
        len1--; 
        len2--; 
    }

    let start = 0;

    // if there's a shared prefix or str1 == str2's suffix

    if (str1[0] == str2[0])
    {
        while (start < len1 
            && str1[start] == str2[start]) 
            start++;

        len1 -= start; // length of the part excluding common prefix and suffix
        len2 -= start;

        // if str1 == prefix and/or suffix of str2, 
        // edit distance is just the number of additional characters in str2

        if (len1 == 0) return len2;

        str2 = str2.substring(start, len2); // faster than str2[start + j] in inner loop below
    }

    //

    let v0 = [];
    
    for (let j = 0; j < len2; j++) 
        v0.push(j + 1);

    //

    let current = 0;

    for (let i = 0; i < len1; i++)
    {
        const c = str1[start + i];

        let left = current = i;

        for (let j = 0; j < len2; j++)
        {
            const above = current;
           
            current = left; // cost on diagonal (substitution)
            left = v0[j];

            if (c != str2[j])
            {
                current++; // substitution

                let insDel = above + 1; // deletion

                if (insDel < current) 
                    current = insDel;

                insDel = left + 1; // insertion

                if (insDel < current) 
                    current = insDel;
            }

            v0[j] = current;
        }
    }
    
    return current;
}



function skipRandom(count)
{
    for (let i = 0; i < count; i++) 
        Math.random();
}



function includesSimilar(str, sub, levenshteinDistance)
{
    if (sub.length > str.length)
        return false;
    
    if (str.includes(sub))
        return true;
    
    for (let i = 0; i <= str.length - sub.length; i++) 
    {
        const s = str.substring(i, i + sub.length);
        
        if (getEditDistance(sub, s) <= levenshteinDistance)
            return true;
    }
}



function degamma(rgb, cs = sRGB)
{
    return [ cs.degamma(rgb[0]),
             cs.degamma(rgb[1]),
             cs.degamma(rgb[2]) ];
}



function regamma(rgb, cs = sRGB)
{
    return [ cs.regamma(rgb[0]),
             cs.regamma(rgb[1]),
             cs.regamma(rgb[2]) ];
}



String.prototype.replaceAt = function(index, replacement) 
{
    return this.substring(0, index) 
         + replacement 
         + this.substring(index+1);// + replacement.length);
}



function findAllIndices(array, condition)
{
    const items   = array.filter(condition);
    const indices = [];
    
    for (const item of items)
        indices.push(items.indexOf(item));

    return indices;
}



function createRandomString(length)
{
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.split('');

    let str = '';

    for (let i = 0; i < length; i++)
        str += letters[Math.floor(Math.random() * letters.length)];

    return str;
}



function rectToString(rect)
{
    return '{'
             /*+ rect.x
        + ', ' + rect.y
        + ', '*/ + rect.width
        + ', '   + rect.height
        + '}';
}