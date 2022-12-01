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
        _conn.order,
        _conn.inputNodeId,
        _conn.inputId,
        _conn.list,
        logSpace);
}



function getConnectionKey(outputNodeId, outputId, order, inputNodeId, inputId)
{
    return connNameForStorage(
          outputNodeId + ' '
        + outputId     + ' '
        + order        + ' '
        + inputNodeId  + ' '
        + inputId);
}



function getConnKey(conn)
{
    return getConnectionKey(
        conn.output.node.id,
        conn.output.id,
        conn.order,
        conn.input.node.id,
        conn.input.id);
}



function getConnString(conn, logSpace = false)
{
    return getConnectionString(
        conn.output.node.id,
        conn.output.id,
        conn.order,
        conn.input.node.id,
        conn.input.id,
        conn.list,
        logSpace);
}



function getConnectionString(outputNodeId, outputId, order, inputNodeId, inputId, list, logSpace = false)
{
    const  sp = logSpace ? ' ' : '  '; 
    const jsp = logSpace ? '' : ' '; 

    const arrow = subscriptNumber(parseInt(order)) + sp + rightArrowChar(parseBool(list)) + sp;
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