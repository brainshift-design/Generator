function isTagKey(key, tag) 
{
    return key.substring(0, tag.length+1) == tag + ' ';
}



function noTag(key, tag)
{
    return key.substring(tag.length+1);
}



function isNodeKey(key) { return isTagKey(key, nodeTag); }
function isConnKey(key) { return isTagKey(key, connTag); }



function noNodeTag(key) { return noTag(key, nodeTag); }
function noConnTag(key) { return noTag(key, connTag); }


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


const NAN_CHAR            = '?';
const NAN_DISPLAY         = '?';

const UNKNOWN_CHAR        = '?';
const UNKNOWN_DISPLAY     = UNKNOWN_CHAR;//'🤷‍♂️';

const TRUE_DISPLAY        = '✓';//'true';
const FALSE_DISPLAY       = '❌';//'false';

const LIST_VALUE          = 'LIST#';
const LIST                = 'LIST';

const ITEMS               = 'ITEMS';
const SELECT              = 'SEL';
const IF_ELSE             = 'IF';

const START               = 'START';
const REPEAT              = 'REPT';

const CACHE               = 'CACHE';
const COPY                = 'COPY';


const LIST_TYPES =
[
    LIST_VALUE,
    LIST,
    ITEMS,
    REPEAT
];


const FOREACH             = 'FOR';


const FLOW_TYPES =
[
    ...LIST_TYPES,
    ITEMS,
    SELECT,
    IF_ELSE,
    START,
    REPEAT,
    FOREACH,
    CACHE,
    COPY
];


const NUMBER_VALUE            = 'NUM#';  
const NUMBER                  = 'NUM';   
const NUMBER_ROUND            = 'ROUND';   
const NUMBER_LIMITS           = 'LIM';   
const NUMBER_SERIES           = 'SER';  
const NUMBER_RANDOM           = 'RAND';  
const NUMBER_INTERPOLATE      = 'LERP';  

const NUMBER_MATH             = 'MATH';  
const NUMBER_ADD              = 'ADD';   
const NUMBER_SUBTRACT         = 'SUB';   
const NUMBER_MULTIPLY         = 'MUL';   
const NUMBER_DIVIDE           = 'DIV';   
const NUMBER_MODULO           = 'MOD';   
const NUMBER_EXPONENT         = 'EXP';

const NUMBER_BOOLEAN          = 'BOOL';  
const NUMBER_NOT              = 'NOT';
const NUMBER_AND              = 'AND';
const NUMBER_OR               = 'OR';
const NUMBER_XOR              = 'XOR';

const NUMBER_CONDITION        = 'COND';
const NUMBER_EQUAL            = 'EQ';
const NUMBER_NOT_EQUAL        = 'NE';
const NUMBER_LESS             = 'LT';
const NUMBER_LESS_OR_EQUAL    = 'LE';
const NUMBER_GREATER          = 'GT';
const NUMBER_GREATER_OR_EQUAL = 'GE';


const MATH_TYPES =
[
    NUMBER_MATH,
    NUMBER_ADD,
    NUMBER_SUBTRACT,
    NUMBER_MULTIPLY,
    NUMBER_DIVIDE,
    NUMBER_MODULO,
    NUMBER_EXPONENT
];


const BOOLEAN_TYPES =
[
    NUMBER_BOOLEAN,
    NUMBER_NOT,
    NUMBER_AND,
    NUMBER_OR,
    NUMBER_XOR
];


const CONDITION_TYPES =
[
    NUMBER_CONDITION,
    NUMBER_EQUAL,
    NUMBER_NOT_EQUAL,
    NUMBER_LESS,
    NUMBER_LESS_OR_EQUAL,
    NUMBER_GREATER,
    NUMBER_GREATER_OR_EQUAL
];


const NUMBER_TYPES =
[
    NUMBER_VALUE,
    NUMBER,
    NUMBER_ROUND,
    NUMBER_LIMITS,
    NUMBER_SERIES,
    NUMBER_RANDOM,
    NUMBER_INTERPOLATE,

    ...MATH_TYPES,
    ...BOOLEAN_TYPES,
    ...CONDITION_TYPES
];


const STRING_VALUE   = 'STR#';  
const STRING         = 'STR';   
const STRING_ADD     = 'SADD';  
const STRING_REPLACE = 'SREPL'; 


const STRING_TYPES =
[
    STRING_VALUE,
    STRING,
    STRING_ADD,
    STRING_REPLACE
];


const COLOR_VALUE       = 'COL#';  
const COLOR             = 'COL';   
const COLOR_INTERPOLATE = 'CLERP'; 
const COLOR_CORRECT     = 'CCOR';  
const COLOR_CONTRAST    = 'CCNT';  
const COLORBLIND        = 'BLND';  


const COLOR_TYPES =
[
    COLOR_VALUE,
    COLOR,
    COLOR_INTERPOLATE,
    COLOR_CORRECT,
    COLORBLIND
];


const FILL_VALUE       = 'FILL#';
const FILL             = 'FILL';
const FILL_TYPES       = [FILL_VALUE, FILL];

const STROKE_VALUE     = 'STRK#';
const STROKE           = 'STRK';
const STROKE_TYPES     = [STROKE_VALUE, STROKE];

const COLOR_STOP_VALUE = 'CSTOP#';
const COLOR_STOP       = 'CSTOP';

const GRADIENT_VALUE   = 'GRAD#';
const GRADIENT         = 'GRAD';
const GRADIENT_TYPES   = [GRADIENT_VALUE, GRADIENT];

const STYLE_VALUE      = 'STYLE#';
const STYLE            = 'STYLE';
const STYLE_TYPES      = [STYLE_VALUE, STYLE];


const SHAPE_VALUE      = 'SHP#'; // abstract placeholder

const RECTANGLE_VALUE  = 'RECT#';
const RECTANGLE        = 'RECT'; 
const RECTANGLE_TYPES  = [RECTANGLE_VALUE, RECTANGLE];

const LINE_VALUE       = 'LINE#';
const LINE             = 'LINE'; 
const LINE_TYPES       = [LINE_VALUE, LINE];

const ELLIPSE_VALUE    = 'ELPS#';
const ELLIPSE          = 'ELPS'; 
const ELLIPSE_TYPES    = [ELLIPSE_VALUE, ELLIPSE];

const POLYGON_VALUE    = 'POLY#';
const POLYGON          = 'POLY'; 
const POLYGON_TYPES    = [POLYGON_VALUE, POLYGON];

const STAR_VALUE       = 'STAR#';
const STAR             = 'STAR'; 
const STAR_TYPES       = [STAR_VALUE, STAR];


const SHAPE_VALUES =
[
    SHAPE_VALUE,

    RECTANGLE_VALUE,
    LINE_VALUE,
    ELLIPSE_VALUE,
    POLYGON_VALUE,
    STAR_VALUE
];


const SHAPE_TYPES =
[
    ...SHAPE_VALUES,

    ...RECTANGLE_TYPES,
    ...LINE_TYPES,
    ...ELLIPSE_TYPES,
    ...POLYGON_TYPES,
    ...STAR_TYPES//,
    //TEXT
];


const ALL_TYPES =
[
    ...FLOW_TYPES,
    ...NUMBER_TYPES,
    ...STRING_TYPES,
    ...COLOR_TYPES,
    ...FILL_TYPES,
    ...STROKE_TYPES,
    ...GRADIENT_TYPES,
    ...STYLE_TYPES,
    ...SHAPE_TYPES
];


const GROUP         = 'GRP';   // ???? count O...


const COMMENT       = 'CMNT';


const ACTIVE        = 'ACT';
const BEFORE_ACTIVE = 'BEF';
const DISABLED      = 'DIS';
const NOCACHE       = 'NOC';

const PARAM         = 'PARAM'; // nodeId paramId


const LOG           = 'LOG';



const MATH_OPS = 
[   // the order is important for logical keyboard value changes
    [NUMBER_SUBTRACT, '-' ],
    [NUMBER_ADD,      '+' ],
    [NUMBER_DIVIDE,   '/' ], //'÷' ],
    [NUMBER_MULTIPLY, '×' ],
    [NUMBER_MODULO,   '%' ],
    [NUMBER_EXPONENT, 'eˣ'] 
];



const BOOLEAN_NOT = 0;
const BOOLEAN_AND = 1;
const BOOLEAN_OR  = 2;
const BOOLEAN_XOR = 3;

const BOOLEAN_OPS = 
[   
    [BOOLEAN_NOT, 'not'],
    [BOOLEAN_AND, 'and'],
    [BOOLEAN_OR,  'or' ],
    [BOOLEAN_XOR, 'xor'] 
];



const CONDITION_EQUAL            = 0;
const CONDITION_NOT_EQUAL        = 1;
const CONDITION_LESS             = 2;
const CONDITION_LESS_OR_EQUAL    = 3;
const CONDITION_GREATER          = 4;
const CONDITION_GREATER_OR_EQUAL = 5;

const CONDITION_OPS = 
[   
    [CONDITION_EQUAL,            '='],
    [CONDITION_NOT_EQUAL,        '≠'],
    [CONDITION_LESS,             '<'],
    [CONDITION_LESS_OR_EQUAL,    '≤'],
    [CONDITION_GREATER,          '>'],
    [CONDITION_GREATER_OR_EQUAL, '≥'] 
];



/*

FRAME       F
IMAGE       I
SLICE       /
TEXT        T
VECTOR      V

*/


function logSavedNode(nodeKey)
{
    let log = formatSavedNodeJson(figGetPageData(nodeKey, false));

    console.log(
        '%c%s\n%c%s', 
        'background: #fdb', 
         noNodeTag(nodeKey), 
        'background: #fed;',    
         log);
}



function formatSavedNodeJson(json)
{
    let formJson = json
        .replace('{\n', '')
        .replace('\n}', '')

        .replace('[\n' + TAB, '')
        .replace('\n' + TAB + ']', '')

        .split(TAB + '"params":\n').join('') // have to do .split().join() because there's no .replace() in TS

        .split('": "').join(': ')
        .split('", "').join(': ')

        .split(TAB + '"').join(TAB)
        .split(TAB + TAB + '["').join(TAB + TAB)
        
        .split('",\n').join('\n')
        .split('"\n').join('\n')
        
        .split('"],\n').join('\n');


    if (formJson[formJson.length-1] == '"')
        formJson = formJson.substring(0, formJson.length - 1);

    if (formJson.substring(formJson.length-2) == '"]')    
        formJson = formJson.substring(0, formJson.length - 2);

    return formJson;
}



function formatSavedDataJson(json)
{
    let formJson = json
        .replace('{\n', '')
        .replace('\n}', '')
        .replace('[\n' + TAB, '')
        .replace('\n' + TAB + ']', '');

    return formJson;
}



function logSavedConn(conn)
{
    const strConn = connToString(conn, true);

    console.log(
        '%c%s', 
        'background: #cfc', 
        strConn); 
}


function logRequest(parse)
{
    let log = '';

    if (   parse.updateNodeId  != '' 
        || parse.updateParamId != '')
        log = '↓ ' + logReqId(parse.updateNodeId) + '.' + logReqId(parse.updateParamId);

    log += parse.log;

    console.log(
        '%c%s', 
        'background: #60aa60; color: #fff', 
         log);
}



function logReqNodeId(node)
{
    return ' ' 
         + logReqId(node.nodeId)
         + logReqOptions(node);
}



function logReqId(nodeId)
{
    return nodeId == '' ? '\'\'' : nodeId;
}



function logReqOptions(node)
{
    let log = '';

    if ( node.options.active      ) log += ' ' + ACTIVE;
    if ( node.options.beforeActive) log += ' ' + BEFORE_ACTIVE;
    if (!node.options.enabled     ) log += ' ' + DISABLED;
    if (!node.options.cached      ) log += ' ' + NOCACHE;

    return log;
}



function logReqParam(param, type, parse)
{
    parse.log += 
                parse.tab + PARAM
        + ' ' + type 
        + ' ' + logReqId(param.nodeId) 
        + '.' + logReqId(param.paramId);
}



function logReqNode(node, parse)
{
    parse.log += parse.tab + node.type;
    parse.log += logReqNodeId(node);
}


const figObjectArrays = []; // {nodeId, [objects]}



function figCreateObject(objects, genObj)
{
    let figObj;

    switch (genObj.type)
    {
        case RECTANGLE: figObj = figCreateRect   (genObj); break;
        case LINE:      figObj = figCreateLine   (genObj); break;
        case ELLIPSE:   figObj = figCreateEllipse(genObj); break;
        case POLYGON:   figObj = figCreatePolygon(genObj); break;
        case STAR:      figObj = figCreateStar   (genObj); break;
    }

    console.assert(!!figObj, 'no Figma object created');


    figObj.setPluginData('id',     genObj.id    .toString());
    figObj.setPluginData('type',   genObj.type  .toString());
    figObj.setPluginData('nodeId', genObj.nodeId.toString());
    

    objects[genObj.id] = figObj;
    figma.currentPage.appendChild(figObj);
}



function figUpdateObjects(msg)
{
    let curNodeId  = NULL;
    let figObjects = null;

    for (const genObj of msg.objects)
    {
        if (genObj.nodeId != curNodeId)
        {
            curNodeId  = genObj.nodeId;
            
            figObjects = figObjectArrays.find(a => a.nodeId == genObj.nodeId);

            if (!figObjects) 
                figObjectArrays.push(figObjects = {nodeId: genObj.nodeId, objects: []});
        }

        const figObj = figObjects[genObj.id];


        if (  !figObj 
            || figObj.removed) // no existing object, create new object
            figCreateObject(figObjects, genObj);

        else if (figObj.getPluginData('type') == genObj.type.toString()) // update existing object
            figUpdateObject(figObj, genObj);

        else // delete existing object, create new object
        {
            figObj.remove();
            figCreateObject(figObjects, genObj);
        }
    }
}



function figUpdateObject(figObj, genObj)
{
    switch (genObj.type)
    {
        case RECTANGLE: figUpdateRect   (figObj, genObj); break;
        case LINE:      figUpdateLine   (figObj, genObj); break;
        case ELLIPSE:   figUpdateEllipse(figObj, genObj); break;
        case POLYGON:   figUpdatePolygon(figObj, genObj); break;
        case STAR:      figUpdateStar   (figObj, genObj); break;
    }
}



function figDeleteObjectsFromNodeIds(nodeIds)
{
    figma.currentPage
        .findAll(o => nodeIds.includes(o.getPluginData('nodeId')))
        .forEach(o => o.remove());
}



function figDeleteAllObjects()
{
    for (const obj of figma.currentPage.children)
        if (!!obj.getPluginData('id')) obj.remove();
}





function figOnSelectionChange()
{
    /*  Every time a selection changes, check that all objects in the object table
        still exist in the canvas. If not, remove the pointer from the object table.  
        
        NOTE: at this point I don't know if objects are deleted by the API, but then again,
        only one plugin runs at a time right now, so maybe it's not an issue.  */


    // for (let i = 0; i < objNodes.length; i++)
    // {
    //     if (!objNodes[i]) continue;
        
    //     for (let j = 0; j < objNodes[i].length; j++)
    //     {
    //         if (!objNodes[i][j]) continue;

    //         const exists = figma.currentPage.children.findIndex(obj => parseInt(obj.getPluginData('id')) == i);
    //         if (!exists) objNodes[i][j] = null;
    //     }
    // }
}



function figOnPluginClose()
{
    figDeleteAllObjects();
}


//const MAX_NODES   = 0x10000;

//const objNodes    = new Array(MAX_NODES).fill(null);

//var   minNodeId   = Number.MAX_SAFE_INTEGER;
//var   maxNodeId   = Number.MIN_SAFE_INTEGER;



figma.on('selectionchange', figOnSelectionChange);
figma.on('close',           figOnPluginClose);


figma.showUI(
    __html__,
    {
        visible:     false,
        themeColors: true
    });



function figStartGenerator()
{
    (async function()
    {
        let productKey = await figLoadLocal('productKey');
        if (productKey == null) productKey = '';


        let wndWidth  = await figma.clientStorage.getAsync('windowWidth');
        let wndHeight = await figma.clientStorage.getAsync('windowHeight');

        if (wndWidth  == null) wndWidth  = 800;
        if (wndHeight == null) wndHeight = 600;

        figma.ui.resize(
            Math.max(0, wndWidth),
            Math.max(0, wndHeight));

        figma.ui.show();

        
        figPostMessageToUI({
            cmd:        'uiReturnFigStartGenerator',
            currentUser: figma.currentUser,
            productKey:  productKey });
    })();
}


// from UI <--
///////////////////////////////////////////////////////////////////////////////////////////////////

figma.ui.onmessage = msg => 
{
    msg = JSON.parse(msg);
    
    switch (msg.cmd)
    {
        case 'figStartGenerator':                 figStartGenerator                ();                                            break;
             
        case 'figPositionWindow':                 figPositionWindow                (msg.x, msg.y);                                break; 
        case 'figResizeWindow':                   figResizeWindow                  (msg.width, msg.height);                       break; 
        case 'figNotify':                         figNotify                        (msg.text, msg.prefix, msg.delay, msg.error);  break;
                             
        case 'figGetLocalData':                   figGetLocalData                  (msg.key);                                     break;
        case 'figSetLocalData':                   figSetLocalData                  (msg.key, msg.value);                          break;
     
        case 'figClearAllLocalData':              figClearAllLocalData             ();                                            break;
                     
        case 'figGetPageData':                    figGetPageData                   (msg.key);                                     break;
        case 'figSetPageData':                    figSetPageData                   (msg.key, msg.value);                          break;
                     
        case 'figLoadNodesAndConns':              figLoadNodesAndConns             (msg.dataMode);                                break;
        case 'figSaveNodes':                      figSaveNodes                     (msg.nodeIds, msg.nodeJson);                   break;        
             
        case 'figRemoveConnsToNodes':             figRemoveConnsToNodes            (msg.nodeIds);                                 break;
        case 'figRemoveSavedNodesAndConns':       figRemoveSavedNodesAndConns      (msg.nodeIds);                                 break;
        case 'figRemoveAllSavedNodesAndConns':    figRemoveAllSavedNodesAndConns   ();                                            break;
             
        case 'figLogAllSavedNodesAndConns':       figLogAllSavedNodesAndConns      ();                                            break;
        case 'figLogAllSavedNodes':               figLogAllSavedNodes              ();                                            break;
        case 'figLogAllSavedConns':               figLogAllSavedConns              ();                                            break;
        
        case 'figLogAllSavedConnKeys':            figLogAllSavedConnKeys           ();                                            break;
        
        
        case 'figSaveConnection':                 figSaveConnection                (msg.key, msg.json);                           break;
        case 'figSaveConnections':                figSaveConnections               (msg.keys, msg.json);                          break;
        case 'figUpdateSavedConnections':         figUpdateSavedConnections        (msg.curKeys, msg.newKeys, msg.json);          break;
        case 'figDeleteSavedConnection':          figDeleteSavedConnection         (msg.key);                                     break;
  
        case 'figRemoveAllSavedConnections':      figRemoveAllSavedConnections     ();                                            break;
        case 'figDeleteSavedConnectionsToNode':   figDeleteSavedConnectionsToNode  (msg.nodeId);                                  break;
        case 'figDeleteSavedConnectionsFromNode': figDeleteSavedConnectionsFromNode(msg.nodeId);                                  break;
           
        case 'figUpdateObjects':                  figUpdateObjects                 (msg);                                         break;
        case 'figDeleteObjects':                  figDeleteObjectsFromNodeIds      (msg.nodeIds);                                 break; 
    }

    
    figPostMessageToUI({
        cmd:   'uiReturnFigMessage',
        msgCmd: msg.cmd });
}

///////////////////////////////////////////////////////////////////////////////////////////////////



// to UI -->
///////////////////////////////////////////////////////////////////////////////////////////////////

function figPostMessageToUI(msg)
{
    figma.ui.postMessage(JSON.stringify(msg));
}

///////////////////////////////////////////////////////////////////////////////////////////////////



// to Generator -->
///////////////////////////////////////////////////////////////////////////////////////////////////

// function figPostMessageToGenerator(msg)
// {
//     figPostMessageToUI({
//         cmd: 'uiForwardToGen',
//         msg:  msg
//     });
// }



// function figEndGeneratorMessage()
// {
//     figPostMessageToGenerator({cmd: 'genEndFigMessage'}); 
// }

///////////////////////////////////////////////////////////////////////////////////////////////////


function makeObjectName(obj)
{
    return OBJECT_PREFIX + obj.nodeId
         + (obj.id > -1 ? '.'+obj.id : '');
}



///////////////////////////////////////////////////////////////////////////////////////////////////



function genRectIsValid(genRect)
{
    return genRect.x      != null && !isNaN(genRect.x     )
        && genRect.y      != null && !isNaN(genRect.y     )
        && genRect.width  != null && !isNaN(genRect.width )
        && genRect.height != null && !isNaN(genRect.height)
        && genRect.angle  != null && !isNaN(genRect.angle )
        && genRect.round  != null && !isNaN(genRect.round );
}



function figCreateRect(obj)
{
    //console.log(obj);

    const rect = figma.createRectangle();

    rect.name = makeObjectName(obj);

    if (!genRectIsValid(obj))
        return rect;


    rect.x = obj.x;
    rect.y = obj.y;

    rect.resize(
        Math.max(0.01, obj.width), 
        Math.max(0.01, obj.height));
        
    rect.rotation     = obj.angle;
    rect.cornerRadius = obj.round;


    setObjectFills  (rect, obj);
    setObjectStrokes(rect, obj);


    return rect;
}



function figUpdateRect(figRect, genRect)
{
    if (!genRectIsValid(genRect))
        return;


    figRect.x = genRect.x;
    figRect.y = genRect.y;

    if (   figRect.width  != genRect.width
        || figRect.height != genRect.height)
    {
        figRect.resize(
            Math.max(0.01, genRect.width), 
            Math.max(0.01, genRect.height));
    }

    figRect.rotation     = genRect.angle;
    figRect.cornerRadius = genRect.round;


    setObjectFills  (figRect, genRect);
    setObjectStrokes(figRect, genRect);
}



///////////////////////////////////////////////////////////////////////////////////////////////////



function genLineIsValid(genLine)
{
    return genLine.x     != null && !isNaN(genLine.x    )
        && genLine.y     != null && !isNaN(genLine.y    )
        && genLine.width != null && !isNaN(genLine.width)
        && genLine.angle != null && !isNaN(genLine.angle);
}



function figCreateLine(obj)
{
    //console.log(obj);

    const line = figma.createLine();

    line.name = makeObjectName(obj);


    if (!genLineIsValid(obj))
        return line;


    line.x = obj.x;
    line.y = obj.y;
    
    line.resize(Math.max(0.01, obj.width), 0);
        
    line.rotation = obj.angle;


    setObjectFills  (line, obj);
    setObjectStrokes(line, obj);

    
    return line;
}



function figUpdateLine(figLine, genLine)
{
    if (!genLineIsValid(genLine))
        return;


    figLine.x = genLine.x;
    figLine.y = genLine.y;

    if (figLine.width != genLine.width)
        figLine.resize(Math.max(0.01, genLine.width), 0);

    figLine.rotation = genLine.angle;


    setObjectFills  (figLine, genLine);
    setObjectStrokes(figLine, genLine);
}



///////////////////////////////////////////////////////////////////////////////////////////////////



function genEllipseIsValid(genEllipse)
{
    return genEllipse.x      != null && !isNaN(genEllipse.x     )
        && genEllipse.y      != null && !isNaN(genEllipse.y     )
        && genEllipse.width  != null && !isNaN(genEllipse.width )
        && genEllipse.height != null && !isNaN(genEllipse.height)
        && genEllipse.angle  != null && !isNaN(genEllipse.angle );
}



function figCreateEllipse(obj)
{
    //console.log(obj);

    const ellipse = figma.createEllipse();

    ellipse.name = makeObjectName(obj);

    if (!genEllipseIsValid(obj))
        return ellipse;


    ellipse.x = obj.x;
    ellipse.y = obj.y;
    
    ellipse.resize(
        Math.max(0.01, obj.width), 
        Math.max(0.01, obj.height));
        
    ellipse.rotation = obj.angle;


    setObjectFills  (ellipse, obj);
    setObjectStrokes(ellipse, obj);
    
    
    return ellipse;
}



function figUpdateEllipse(figEllipse, genEllipse)
{
    if (!genEllipseIsValid(genEllipse))
        return;


    figEllipse.x = genEllipse.x;
    figEllipse.y = genEllipse.y;

    if (   figEllipse.width  != genEllipse.width
        || figEllipse.height != genEllipse.height)
    {
        figEllipse.resize(
            Math.max(0.01, genEllipse.width), 
            Math.max(0.01, genEllipse.height));
    }

    figEllipse.rotation = genEllipse.angle;


    setObjectFills  (figEllipse, genEllipse);
    setObjectStrokes(figEllipse, genEllipse);
}



///////////////////////////////////////////////////////////////////////////////////////////////////



function genPolyIsValid(genPoly)
{
    return genPoly.x       != null && !isNaN(genPoly.x      )
        && genPoly.y       != null && !isNaN(genPoly.y      )
        && genPoly.width   != null && !isNaN(genPoly.width  )
        && genPoly.height  != null && !isNaN(genPoly.height )
        && genPoly.angle   != null && !isNaN(genPoly.angle  )
        && genPoly.round   != null && !isNaN(genPoly.round  )
        && genPoly.corners != null && !isNaN(genPoly.corners);
}



function figCreatePolygon(obj)
{
    //console.log(obj);

    const poly = figma.createPolygon();

    poly.name = makeObjectName(obj);

    if (!genPolyIsValid(obj))
        return poly;


    poly.x = obj.x;
    poly.y = obj.y;
    
    poly.resize(
        Math.max(0.01, obj.width), 
        Math.max(0.01, obj.height));
        
    poly.rotation     = obj.angle;
    poly.cornerRadius = obj.round;
    poly.pointCount   = obj.corners;


    setObjectFills  (poly, obj);
    setObjectStrokes(poly, obj);


    return poly;
}



function figUpdatePolygon(figPoly, genPoly)
{
    if (!genPolyIsValid(genPoly))
        return;


    figPoly.x = genPoly.x;
    figPoly.y = genPoly.y;

    if (   figPoly.width  != genPoly.width
        || figPoly.height != genPoly.height)
    {
        figPoly.resize(
            Math.max(0.01, genPoly.width), 
            Math.max(0.01, genPoly.height));
    }

    figPoly.rotation     = genPoly.angle;
    figPoly.cornerRadius = genPoly.round;
    figPoly.pointCount   = genPoly.corners;


    setObjectFills  (figPoly, genPoly);
    setObjectStrokes(figPoly, genPoly);
}



///////////////////////////////////////////////////////////////////////////////////////////////////



function genStarIsValid(genStar)
{
    return genStar.x      != null && !isNaN(genStar.x     )
        && genStar.y      != null && !isNaN(genStar.y     )
        && genStar.width  != null && !isNaN(genStar.width )
        && genStar.height != null && !isNaN(genStar.height)
        && genStar.angle  != null && !isNaN(genStar.angle )
        && genStar.round  != null && !isNaN(genStar.round )
        && genStar.points != null && !isNaN(genStar.points)
        && genStar.convex != null && !isNaN(genStar.convex);
}



function figCreateStar(obj)
{
    //console.log(obj);

    const star = figma.createStar();

    star.name = makeObjectName(obj);

    if (!genStarIsValid(obj))
        return star;


    star.x = obj.x;
    star.y = obj.y;
    
    star.resize(
        Math.max(0.01, obj.width), 
        Math.max(0.01, obj.height));
        
    star.rotation     = obj.angle;
    star.cornerRadius = obj.round;
    star.pointCount   = obj.points;
    star.innerRadius  = obj.convex / 100;


    setObjectFills  (star, obj);
    setObjectStrokes(star, obj);


    return star;
}



function figUpdateStar(figStar, genStar)
{
    if (!genStarIsValid(genStar))
        return;


    figStar.x = genStar.x;
    figStar.y = genStar.y;

    if (   figStar.width  != genStar.width
        || figStar.height != genStar.height)
    {
        figStar.resize(
            Math.max(0.01, genStar.width), 
            Math.max(0.01, genStar.height));
    }

    figStar.rotation     = genStar.angle;
    figStar.cornerRadius = genStar.round;
    figStar.pointCount   = genStar.points;
    figStar.innerRadius  = genStar.convex / 100;


    setObjectFills  (figStar, genStar);
    setObjectStrokes(figStar, genStar);
}



///////////////////////////////////////////////////////////////////////////////////////////////////



// function figCreateFrame()
// {
//     let frame = figma.createFrame();

//     frame.name = 'Generator';

//     let tx : Paint = {type: 'SOLID', color: {r: 0, g: 0, b: 0}, opacity: 0};
//     frame.fills = [tx];

//     //frame.resize(
//     //    (nCols*rectSize + (nCols-1)*hgap),
//     //    (nRows*rectSize + (nRows-1)*hgap));

//     return frame;
// }



///////////////////////////////////////////////////////////////////////////////////////////////////

function getObjectFills(objFills)
{
    const fills = [];

    for (const _fill of objFills)
    {
        const fill = _fill[1].split(' ');

        switch (_fill[0])
        {
            case 'SOLID':
                fills.push(
                {
                    type: 'SOLID', 
                    color: {
                        r: Math.min(Math.max(0, parseFloat(fill[0]) / 0xff), 1), 
                        g: Math.min(Math.max(0, parseFloat(fill[1]) / 0xff), 1), 
                        b: Math.min(Math.max(0, parseFloat(fill[2]) / 0xff), 1) },
                    opacity: Math.min(Math.max(0, parseFloat(fill[3]) / 100), 1)
                });

                break;
        }
    }

    return fills;
}



function setObjectFills(obj, src)
{
    if (   !!src.fills
        && src.fills.length > 0)
        obj.fills = getObjectFills(src.fills);
    else
        obj.fills = [];//{type: 'SOLID', color: {r: 0.85, g: 0.85, b: 0.85}}];
}



function setObjectStrokes(obj, src)
{
    if (   src.strokes != null
        && src.strokes.length > 0)
    {
        obj.strokes = getObjectFills(src.strokes);

        obj.strokeWeight     = Math.max(0, src.strokeWeight);
        obj.strokeAlign      = src.strokeAlign;
        obj.strokeJoin       = src.strokeJoin;
        obj.strokeMiterLimit = Math.min(Math.max(0, src.strokeMiterLimit), 16);
    }

    else
        obj.strokes = [];
}


async function figLoadLocal(key)
{
    return await figma.clientStorage.getAsync(key); 
}



function figGetLocalData(key)
{
    figma.clientStorage.getAsync(key).then(data =>
    {
        //console.log('getAsync', data);
        figPostMessageToUI({
            cmd:  'uiReturnFigGetLocalData',
            key:   key,
            value: data
        });
    });
}



function figSetLocalData(key, value)
{
    figma.clientStorage.setAsync(key, value); 
}



async function figClearAllLocalData()
{
    const keys = await figma.clientStorage.keysAsync(); 

    for (const key of keys)
        figma.clientStorage.deleteAsync(key);
}



function figGetPageData(key, postToUi = true)
{
    const data = figma.currentPage.getPluginData(key);

    if (postToUi)
    {
        figPostMessageToUI({
            cmd:  'uiReturnFigGetPageData',
            key:   key,
            value: data
        });
    }

    return data;
}



function figSetPageData(key, value)
{
    figClearPageData(key); // remove possible existing values first
    figma.currentPage.setPluginData(key, value);
}



function figClearPageData(key)
{
    figma.currentPage.setPluginData(key, ''); 
}



function figLoadNodesAndConns(dataMode)
{
    const nodeKeys  = figma.currentPage.getPluginDataKeys().filter(k => isNodeKey(k));
    const connKeys  = figma.currentPage.getPluginDataKeys().filter(k => isConnKey(k));

    if (!dataMode)
        figMarkForLoading(nodeKeys, connKeys);

    const nodes     = nodeKeys.map(k => figma.currentPage.getPluginData(k));
    const conns     = connKeys.map(k => figma.currentPage.getPluginData(k));

    figPostMessageToUI({
        cmd:      'uiReturnFigLoadNodesAndConns',
        nodeKeys: JSON.stringify(nodeKeys),
        nodeJson: JSON.stringify(nodes),
        connKeys: JSON.stringify(connKeys),
        connJson: JSON.stringify(conns)
    });
}



function figMarkForLoading(nodeKeys, connKeys)
{
    const loadingFlag = '"loading": "true"';
    const not         = '{\n';
    const set         = '{\n' + TAB + loadingFlag + ',\n';

    nodeKeys.forEach(k => figma.currentPage.setPluginData(k, 
        figma.currentPage.getPluginData(k)
            .replace(set, not)
            .replace(not, set)));
    
    connKeys.forEach(k => figma.currentPage.setPluginData(k, 
        figma.currentPage.getPluginData(k)
            .replace(set, not)
            .replace(not, set)));
}



function figSaveNodes(nodeIds, nodeJson)
{
    for (let i = 0; i < nodeIds.length; i++)
    {
        figSetPageData(
            nodeNameForStorage(nodeIds[i]),
            nodeJson[i]);        
    }
}



function figRemoveConnsToNodes(nodeIds)
{
    const connKeys = figma.currentPage.getPluginDataKeys().filter(k => isConnKey(k));

    for (const key of connKeys)
    {
        const parts = noConnTag(key).split(' ');

        if (   nodeIds.includes(parts[0])
            || nodeIds.includes(parts[2]))
            figClearPageData(key);
    }
}



function figRemoveSavedNodesAndConns(nodeIds)
{
    const nodeKeys = figma.currentPage.getPluginDataKeys().filter(
           k => isNodeKey(k)
        && nodeIds.includes(noNodeTag(k)));

    nodeKeys.forEach(k => figClearPageData(k));

    figRemoveConnsToNodes(nodeIds);
}



function figRemoveAllSavedNodesAndConns()
{
    const nodeKeys = figma.currentPage.getPluginDataKeys().filter(k => isNodeKey(k));
    const connKeys = figma.currentPage.getPluginDataKeys().filter(k => isConnKey(k));

    for (const key of nodeKeys) figClearPageData(key);
    for (const key of connKeys) figClearPageData(key);
}



function figLogAllSavedNodesAndConns()
{
    figLogAllSavedNodes();
    figLogAllSavedConns();
}



function figLogAllSavedNodes()
{
    figma.currentPage.getPluginDataKeys()
        .filter (k => isNodeKey(k))
        .forEach(k => logSavedNode(k));
}



function figLogAllSavedConns()
{
    const connKeys = figma.currentPage.getPluginDataKeys()
        .filter(k => isConnKey(k));
        
    connKeys.sort((key1, key2) => 
    {
        const p1 = noConnTag(key1).split(' ');
        const p2 = noConnTag(key2).split(' ');

        if (p1[2] != p2[2]) return p1[2] < p2[2] ? -1 : 1;
        if (p1[3] != p2[3]) return parseInt(p1[3]) - parseInt(p2[3]);
        
        if (p1[2] == p2[0]) return -1;
        if (p2[2] == p1[0]) return  1;

        return 0;
    });

    connKeys.forEach(k => logSavedConn(JSON.parse(figma.currentPage.getPluginData(k))));
}



function figLogAllSavedConnKeys()
{
    const connKeys = figma.currentPage.getPluginDataKeys()
        .filter(k => isConnKey(k));
        
    connKeys.forEach(k => console.log('%c'+k, 'background: #dff'));
}



function figSaveConnection(key, json)
{
    figSetPageData(key, json);        
}



function figSaveConnections(_keys, _json)
{
    const keys = JSON.parse(_keys);
    const json = JSON.parse(_json);

    for (let i = 0; i < keys.length; i++)
        figSetPageData(keys[i], json[i]);
}



function figUpdateSavedConnections(_curKeys, _newKeys, _json)
{
    const curKeys = JSON.parse(_curKeys);
    const newKeys = JSON.parse(_newKeys);
    const json    = JSON.parse(_json);

    for (let i = 0; i < curKeys.length; i++)
    {
        figClearPageData(curKeys[i]);
        figSetPageData(newKeys[i], json[i]);
    }
}



function figDeleteSavedConnection(key)
{
    figClearPageData(key);        
}



function figRemoveAllSavedConnections()
{
    const connKeys = figma.currentPage.getPluginDataKeys().filter(k => isConnKey(k));
    connKeys.forEach(k => figClearPageData(k));
}



function figDeleteSavedConnectionsToNode(nodeId)
{
    const connKeys = figma.currentPage.getPluginDataKeys().filter(k => isConnKey(k));

    for (const key of connKeys)
    {
        const parts = key.split(' ');

        if (parts[4] == nodeId)
            figClearPageData(key);        
    }
}



function figDeleteSavedConnectionsFromNode(nodeId)
{
    const connKeys = figma.currentPage.getPluginDataKeys().filter(k => isConnKey(k));

    for (const key of connKeys)
    {
        const parts = key.split(' ');

        if (parts[1] == nodeId)
            figClearPageData(key);        
    }
}


function figPositionWindow(x, y)
{
    // x = Math.floor(Math.max(0, x ));
    // y = Math.floor(Math.max(0, y));

    // figma.ui.resize(x, y);

    
    // figma.ui.close();
    // figma.showUI(
    //     __html__,
    //     {
    //         visible:     false,
    //         themeColors: true,
    //         position: {x: x, y: y}
    //     });

    // figma.clientStorage.setAsync('windowWidth',  x);
    // figma.clientStorage.setAsync('windowHeight', y);


    figPostMessageToUI({cmd: 'uiEndPositionWindow'});
}



function figResizeWindow(width, height)
{
    width  = Math.floor(Math.max(0, width ));
    height = Math.floor(Math.max(0, height));

    figma.ui.resize(width, height);

    figma.clientStorage.setAsync('windowWidth',  width);
    figma.clientStorage.setAsync('windowHeight', height);


    figPostMessageToUI({cmd: 'uiReturnFigResizeWindow'});
}



function figNotify(text, prefix = 'Generator ', delay = 400, error = false)
{
    figma.notify(
        prefix + text, 
        {
            timeout: delay,
            error:   error
        });
}


// function objTypeString(type)
// {
//     switch (type)
//     {
//         case RECTANGLE: return 'RECTANGLE';
//         // case 'VECTOR':
//         // case 'LINE':
//         // case 'ELLIPSE':
//         // case 'POLYGON':
//         // case 'STAR':
//         // case 'TEXT':
//         // case 'BOOLEAN_OPERATION':
//     }

//     return 'ERROR_TYPE';
// }