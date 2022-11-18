const smallScrollGap =  6;
const largeScrollGap = 14;

const MAX_INT32      = 2147483647;

const NULL           = '';

const TAB            = '  ';
const NL             = '\n';

const GENERATOR_LOGO = '◦ G •';
const OBJECT_PREFIX  = 'G.';



function  leftArrowChar(list) { return list ? '⟸' : '⟵'; }
function rightArrowChar(list) { return list ? '⟹' : '⟶'; }



function parseBool(str) { return str === 'true'; }



function getConnString(conn)
{
    return getConnectionString(
        conn.outputNodeId,
        conn.outputId,
        conn.inputNodeId,
        conn.inputId,
        conn.list);
}



function getConnectionString(outputNodeId, outputId, inputNodeId, inputId, list)
{
    const arrow = '  ' + rightArrowChar(parseBool(list)) + '  ';

    return outputNodeId + ' . ' + outputId
         + arrow
         + inputNodeId + ' . ' + inputId;
}