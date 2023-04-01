const generatorVersion = 126;


const MAX_INT32        = 2147483647;
  
const NULL             = '';
  
const TAB              = '  ';
const NL               = '\n';
  
const GENERATOR_LOGO   = '◦ G •';
const OBJECT_PREFIX    = 'G.';
  
const nodeTag          = 'G_NODE';
const connTag          = 'G_CONN';


const smallScrollGap   =  6;
const largeScrollGap   = 14;
  
const menuBarHeight    = 40;



function toInt(f) { return Math.floor(f) | 0; }



function nextPow2(x)
{
    x = toInt(x);

    x--;

    x |= x >> 1;
    x |= x >> 2;
    x |= x >> 4;
    x |= x >> 8;
    x |= x >> 16;
    x |= x >> 32;

    return ++x;
}



function gcd(a, b)
{
    let temp;
    while (1)
    {
        temp = a % b;

        if (temp == 0)
          return b;

        a = b;
        b = temp;
    }
}



function toUtf8(str) 
{
    return decodeURI(encodeURIComponent(str));
}



function fromUtf8(str) 
{
    return decodeURIComponent(encodeURI(str));
}



function charCodeArrayToString(bytes) 
{
    let str = '';

    for (let i = 0; i < bytes.length; i++)
        str += String.fromCharCode(bytes[i]);

    return str;
}



function stringToCharCodeArray(str)
{
    return Array.from(fromUtf8(str), c => c.charCodeAt(0));
}



function newSizeArrayFrom(array, size) // resizes an array and returns a new array
{
    const newArray = new Uint8Array(size);
    copyArray(array, newArray);
    return newArray;
}



function copyArray(src, dst)
{
    copyArrayAt(
        src, 0, src.length,
        dst, 0, dst.length);
}



function copyArrayAt(src, srcStart, srcSize, dst, dstStart, dstSize)
{
    const size = Math.min(srcSize, dstSize);

    for (let i = 0; i < size; i++)
        dst[dstStart + i] = src[srcStart + i];
}



function arraysAreEqual(arr1, arr2)
{
    if (arr1.length != arr2.length)
        return false;

    for (let i = 0; i < arr1.length; i++)
    {
        if (arr1[i] != arr2[i])
            return false;
    }

    return true;
}



function arraysIntersect(array1, array2)
{
    return array1.findIndex(i => array2.includes(i)) > -1;
}



function  leftArrowChar(list) { return list ? '⟸' : '⟵'; }
function rightArrowChar(list) { return list ? '⟹' : '⟶'; }

function nodeNameForStorage(nodeId) { return nodeTag + ' ' + nodeId; }
function connNameForStorage(name)   { return connTag + ' ' + name;   }



function parseBool(str) 
{ 
    return str.toLowerCase() == 'true'
        || str == '1';
}



function connToString(_conn, logSpace = false)
{
    return getConnectionString(
        _conn.outputNodeId,
        _conn.outputId,
        _conn.outputOrder,
        _conn.inputNodeId,
        _conn.inputId,
        _conn.list,
        logSpace);
}



function getConnectionKey(outputNodeId, outputId, outputOrder, inputNodeId, inputId)
{
    return connNameForStorage(
          outputNodeId + ' '
        + outputId     + ' '
        + outputOrder  + ' '
        + inputNodeId  + ' '
        + inputId);
}



function getConnKey(conn)
{
    return getConnectionKey(
        conn.output.node.id,
        conn.output.id,
        conn.outputOrder,
        conn.input.node.id,
        conn.input.id);
}



function getConnString(conn, logSpace = false)
{
    return getConnectionString(
        conn.output.node.id,
        conn.output.id,
        conn.outputOrder,
        conn.input.node.id,
        conn.input.id,
        conn.list,
        logSpace);
}



function getConnectionString(outputNodeId, outputId, outputOrder, inputNodeId, inputId, list, logSpace = false)
{
    const  sp   = logSpace ? ' ' : '  '; 
    const jsp   = logSpace ? ''  : ' '; 

    const arrow = 
          sp 
        + subscriptNumber(typeof outputOrder == 'string' ? parseInt(outputOrder) : outputOrder) 
        + rightArrowChar(typeof list == 'string' ? parseBool(list) : list) 
        + sp;

    const join  = jsp + '.' + jsp;

    return outputNodeId + join + outputId
         + arrow
         + inputNodeId  + join + inputId;
}



function superscriptNumber(num)
{
    const str = num.toString();

    let sup = '';

    for (const c of str)
        sup += superscriptChar(c);

    return sup;
}



function superscriptChar(c)
{
    switch (c)
    {
        case '0': return '⁰';
        case '1': return '¹';
        case '2': return '²';
        case '3': return '³';
        case '4': return '⁴';
        case '5': return '⁵';
        case '6': return '⁶';
        case '7': return '⁷';
        case '8': return '⁸';
        case '9': return '⁹';
        case '.': return '·';
    }
}



function subscriptNumber(num)
{
    const str = num.toString();

    let sup = '';

    for (const c of str)
        sup += subscriptChar(c);

    return sup;
}



function subscriptChar(c)
{
    switch (c)
    {
        case '0': return '₀';
        case '1': return '₁';
        case '2': return '₂';
        case '3': return '₃';
        case '4': return '₄';
        case '5': return '₅';
        case '6': return '₆';
        case '7': return '₇';
        case '8': return '₈';
        case '9': return '₉';
        case '.': return ' ';
    }
}



function boolToString(bool)
{
    return bool ? 'true' : 'false';
}



function isValid(val)
{
    return val != undefined
        && val != null;
}



function isEmpty(array)
{
    return array.length == 0;
}



function removeFrom(array, item)
{
    removeAt(array, array.indexOf(item));
}



function removeAt(array, index)
{
    if (   index > -1 
        && index < array.length)
        array.splice(index, 1)
}



function removeLast(array)
{
    if (isEmpty(array))
        return null;

    let last = array.at(-1);
    array.splice(array.length-1, 1)

    return last;
}



function lastOf(array)
{
    return array[array.length-1];
}



function moveInArray(array, from, to) 
{
    const item = array[from];
    array.splice(from, 1);
    array.splice(to, 0, item);
}



function removeFromArray(array, item)
{
    const index = array.indexOf(item);
    
    if (index > -1)
        array.splice(index, 1);
}



function removeArrayFromArray(fromArray, array)
{
    for (const item of array)
    {
        const index = fromArray.indexOf(item);
        
        if (index > -1)
            fromArray.splice(index, 1);
    }
}



function removeFromArrayWhere(array, where)
{
    const index = array.findIndex(where);
    
    if (index > -1)
        array.splice(index, 1);
}



function cleanStyleId(styleId)
{
    return styleId.split(',')[0] + ',';
}
