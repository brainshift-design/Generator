const smallScrollGap =  6;
const largeScrollGap = 14;

const MAX_INT32      = 2147483647;

const NULL           = '';

const TAB            = '  ';
const NL             = '\n';

const GENERATOR_LOGO = '◦ G •';
const OBJECT_PREFIX  = 'G.';

const nodeTag        = 'G_NODE';
const connTag        = 'G_CONN';



function  leftArrowChar(list) { return list ? '⟸' : '⟵'; }
function rightArrowChar(list) { return list ? '⟹' : '⟶'; }

function nodeNameForStorage(nodeId) { return nodeTag + ' ' + nodeId; }
function connNameForStorage(name)   { return connTag + ' ' + name;   }



function parseBool(str) { return str === 'true'; }



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

    const arrow = sp + subscriptNumber(parseInt(outputOrder)) + rightArrowChar(parseBool(list)) + sp;
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



function isValid(val)
{
    return val != null
        && val != undefined;
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

    let last = lastOf(array);
    array.splice(array.length-1, 1)

    return last;
}



function beforeLastOf(array)
{
    return array.length > 1 
         ? array[array.length-2]
         : null;
}



function lastOf(array)
{
    return array[array.length-1];
}



function firstOf(array)
{
    return array[0];
}



function moveInArray(array, from, to) 
{
    const item = array[from];
    array.splice(from, 1);
    array.splice(to, 0, item);
}