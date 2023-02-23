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


const generatorVersion = 108;


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



function arrayToString(bytes) 
{
    let str = '';

    for (let i = 0; i < bytes.length; i++)
        str += String.fromCharCode(bytes[i]);

    return str;
}



function stringToArray(str)
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


const NAN_CHAR                = '?';
const NAN_DISPLAY             = '?';
    
const UNKNOWN_CHAR            = '?';
const UNKNOWN_DISPLAY         = UNKNOWN_CHAR;//'🤷‍♂️';
    
const TRUE_DISPLAY            = '✓';//'true';
const FALSE_DISPLAY           = '❌';//'false';
    
const LIST_VALUE              = 'LIST#';
const LIST                    = 'LIST';
    
const ITEMS                   = 'ITEMS';
const SELECT                  = 'SEL';
const IF_ELSE                 = 'IF';
    
const START                   = 'START';
const REPEAT                  = 'REPT';
    
const CACHE                   = 'CACHE';
const COPY                    = 'COPY';


const LIST_TYPES =
[
    LIST_VALUE,
    LIST,
    ITEMS,
    REPEAT
];


const FOREACH                 = 'FOR';


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
const NUMBER_ABSOLUTE         = 'ABS';   
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
    NUMBER_ABSOLUTE,
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
const VALID_COLOR       = 'CVAL';  
const CORRECT_COLOR     = 'CCOR';  
const COLOR_CONTRAST    = 'CCNT';  
const COLORBLIND        = 'BLND';  
const COLOR_INTERPOLATE = 'CLERP'; 


const COLOR_TYPES =
[
    COLOR_VALUE,
    COLOR,
    COLOR_INTERPOLATE,
    CORRECT_COLOR,
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

//const COLOR_STYLE_VALUE = 'CSTL#';
const COLOR_STYLE       = 'CSTL';
//const COLOR_STYLE_TYPES = [COLOR_STYLE_VALUE, COLOR_STYLE];


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
    //...COLOR_STYLE_TYPES,
    COLOR_STYLE,
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
    [NUMBER_SUBTRACT, '−' ],
    [NUMBER_ADD,      '+' ],
    [NUMBER_MODULO,   '%' ],
    [NUMBER_DIVIDE,   '/' ], //'÷' ],
    [NUMBER_MULTIPLY, '×' ],
    [NUMBER_EXPONENT, 'e<sup>x</sup>'] 
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
    [CONDITION_LESS,             '<'],
    [CONDITION_LESS_OR_EQUAL,    '≤'],
    [CONDITION_NOT_EQUAL,        '≠'],
    [CONDITION_EQUAL,            '='],
    [CONDITION_GREATER_OR_EQUAL, '≥'],
    [CONDITION_GREATER,          '>']
];



/*

FRAME       F
IMAGE       I
SLICE       /
TEXT        T
VECTOR      V

*/


const base32chars = '12345679ABCDEFGHJKLMNPQRSTUVWXYZ';



function arrayToBase32(array, chars = base32chars)
{
    let base32 = '';

    
    let len = array.length;
    let i   = 0;

    while (len > 0)
    {
        if (len >= 5)
        {
            const a0 = array[i  ],
                  a1 = array[i+1],
                  a2 = array[i+2],
                  a3 = array[i+3],
                  a4 = array[i+4];
            
            base32 += chars[ (a0 & 0xF8) >>> 3];
            base32 += chars[((a0 & 0x07) <<  2) | ((a1 & 0xC0) >>> 6)];
            base32 += chars[ (a1 & 0x3E) >>> 1];
            base32 += chars[((a1 & 0x01) <<  4) | ((a2 & 0xF0) >>> 4)];
            base32 += chars[((a2 & 0x0F) <<  1) | ((a3 & 0x80) >>> 7)];
            base32 += chars[ (a3 & 0x7C) >>> 2];
            base32 += chars[((a3 & 0x03) <<  3) | ((a4 & 0xE0) >>> 5)];
            base32 += chars[ (a4 & 0x1F)];
        }
        else if (len == 4)
        {
            const a0 = array[i  ],
                  a1 = array[i+1],
                  a2 = array[i+2],
                  a3 = array[i+3];
            
            base32 += chars[ (a0 & 0xF8) >>> 3];
            base32 += chars[((a0 & 0x07) <<  2) | ((a1 & 0xC0) >>> 6)];
            base32 += chars[ (a1 & 0x3E) >>> 1];
            base32 += chars[((a1 & 0x01) <<  4) | ((a2 & 0xF0) >>> 4)];
            base32 += chars[((a2 & 0x0F) <<  1) | ((a3 & 0x80) >>> 7)];
            base32 += chars[ (a3 & 0x7C) >>> 2];
            base32 += chars[((a3 & 0x03) <<  3)];
        }
        else if (len == 3)
        {
            const a0 = array[i  ],
                  a1 = array[i+1],
                  a2 = array[i+2];
            
            base32 += chars[ (a0 & 0xF8) >>> 3];
            base32 += chars[((a0 & 0x07) <<  2) | ((a1 & 0xC0) >>> 6)];
            base32 += chars[ (a1 & 0x3E) >>> 1];
            base32 += chars[((a1 & 0x01) <<  4) | ((a2 & 0xF0) >>> 4)];
            base32 += chars[((a2 & 0x0F) <<  1)];
        }
        else if (len == 2)
        {
            const a0 = array[i  ],
                  a1 = array[i+1];
            
            base32 += chars[ (a0 & 0xF8) >>> 3];
            base32 += chars[((a0 & 0x07) <<  2) | ((a1 & 0xC0) >>> 6)];
            base32 += chars[ (a1 & 0x3E) >>> 1];
            base32 += chars[((a1 & 0x01) <<  4)];
        }
        else if (len == 1)
        {
            const a0 = array[i];
            
            base32 += chars[ (a0 & 0xF8) >>> 3];
            base32 += chars[((a0 & 0x07) <<  2)];
        }


        i   += 5;
        len -= 5;
    }


    return base32;
}



function base32toArray(base32, chars = base32chars)
{
    const array = [];


    let len = base32.length;
    let c   = 0;

    while (len > 0)
    {
        if (len >= 8)
        {
            const c0 = chars.indexOf(base32[c  ]),
                  c1 = chars.indexOf(base32[c+1]),
                  c2 = chars.indexOf(base32[c+2]),
                  c3 = chars.indexOf(base32[c+3]),
                  c4 = chars.indexOf(base32[c+4]),
                  c5 = chars.indexOf(base32[c+5]),
                  c6 = chars.indexOf(base32[c+6]),
                  c7 = chars.indexOf(base32[c+7]);

            array.push( (c0         << 3) | ((c1 & 0x1C) >>> 2));
            array.push(((c1 & 0x03) << 6) | (c2 << 1) | ((c3 & 0x10) >>> 4));
            array.push(((c3 & 0x0F) << 4) | ((c4 & 0x1E) >>> 1));
            array.push(((c4 & 0x01) << 7) | (c5 << 2) | ((c6 & 0x18) >>> 3));
            array.push(((c6 & 0x07) << 5) | c7);
        }
        else if (len == 7)
        {
            const c0 = chars.indexOf(base32[c  ]),
                  c1 = chars.indexOf(base32[c+1]),
                  c2 = chars.indexOf(base32[c+2]),
                  c3 = chars.indexOf(base32[c+3]),
                  c4 = chars.indexOf(base32[c+4]),
                  c5 = chars.indexOf(base32[c+5]),
                  c6 = chars.indexOf(base32[c+6]);

            array.push(( c0         << 3) | ((c1 & 0x1C) >>> 2));
            array.push(((c1 & 0x03) << 6) | (c2 << 1) | ((c3 & 0x10) >>> 4));
            array.push(((c3 & 0x0F) << 4) | ((c4 & 0x1E) >>> 1));
            array.push(((c4 & 0x01) << 7) | (c5 << 2) | ((c6 & 0x18) >>> 3));
        }
        else if (len == 5)
        {
            const c0 = chars.indexOf(base32[c  ]),
                  c1 = chars.indexOf(base32[c+1]),
                  c2 = chars.indexOf(base32[c+2]),
                  c3 = chars.indexOf(base32[c+3]),
                  c4 = chars.indexOf(base32[c+4]);

            array.push( (c0         << 3) | ((c1 & 0x1C) >>> 2));
            array.push(((c1 & 0x03) << 6) | (c2 << 1) | ((c3 & 0x10) >>> 4));
            array.push(((c3 & 0x0F) << 4) | ((c4 & 0x1E) >>> 1));
        }
        else if (len == 4)
        {
            const c0 = chars.indexOf(base32[c  ]),
                  c1 = chars.indexOf(base32[c+1]),
                  c2 = chars.indexOf(base32[c+2]),
                  c3 = chars.indexOf(base32[c+3]);

            array.push( (c0         << 3) | ((c1 & 0x1C) >>> 2));
            array.push(((c1 & 0x03) << 6) | (c2 << 1) | ((c3 & 0x10) >>> 4));
        }
        else if (len == 2)
        {
            const c0 = chars.indexOf(base32[c  ]),
                  c1 = chars.indexOf(base32[c+1]);

            array.push((c0 << 3) | ((c1 & 0x1C) >>> 2));
        }


        c   += 8;
        len -= 8;
    }


    return array;
}


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


// // constants because b0 b1 b2 literals aren't allowed for some reason
// const b0  = BigInt(0);
// const b1  = BigInt(1);
// const b2  = BigInt(2);
// const b3  = BigInt(3);
// const b8  = BigInt(8);
// const bFF = BigInt(0xff);


// var bigBuffer = new Uint8Array(2048);



// function bigRandom(max: bigint = b0)
// {
//     const size = 
//         max > 0
//         ? Math.max(1, Math.floor(bigBitCount(max)/8))
//         : bigBuffer.length;
    
//     if (size > bigBuffer.length)
//         bigBuffer = new Uint8Array(nextPow2(size));
        
//     for (let i = 0; i < size; i++)
//         bigBuffer[i] = toInt(Math.random() * 0x100);

//     let rnd = bigFromBufferAt(bigBuffer, 0, size);

//     if (max > 0)
//         rnd = rnd % BigInt(max);
        
//     return rnd;
// }



// function bigPowMod(n: bigint, e: bigint, m: bigint) // n^e % mod
// {
//     let c = b1;

//     while (e > b0)
//     {
//         if ((e & b1) != b0)
//         {
//             c *= n;
//             c %= m;
//         }

//         e >>= b1;
        
//         n *= n;
//         n %= m;
//     }
    
//     return c;
// }



// function bigNextPrime(n: bigint) 
// {
//     while (!bigIsPrime(++n));
//     return n;
// }



// function bigIsPrime(x: bigint, k = millerRabinIterations) // Miller-Rabin
// {
//     if (x <= b1) return false; 
//     if (x <= b3) return true;
    
//     if (x % b2 == b0) 
//         return false;
        
        
//     let d = x - b1;
//     let s = b0; 
                
//     while (d % b2 == b0) 
//     {
//         d /= b2;
//         s++;
//     }
        

//     for (let i = 0; i < k; i++)    
//     {
//         const a = b2 + bigRandom(x - b1);

//         if (!bigIsWitness(a, s, d, x))
//             return false;        
//     }
        

//     return true; 
// }    

    

// function bigIsWitness(a: bigint, s: bigint, d: bigint, n: bigint)
// {
//     let x = bigPowMod(a, d, n);
        
//     if (x == b1)
//         return true;

//     for (let j = b0; j < s-b1; j++)
//     {
//         if (x == n-b1)
//             return true;
        
//         x = bigPowMod(x, b2, n);
//     }

//     return x == n-b1;
// }



// function bigFromBuffer(buffer)
// {
//     return bigFromBufferAt(buffer, 0, buffer.length);
// }



// function bigFromBufferAt(buffer, start, size)
// {
//     size = Math.min(size, buffer.length - start);
    
//     let val = b0;
//     let mul = b1;

//     for (let i = start+size-1; i >= start; i--) // little-endian
//     {
//         val += mul * BigInt(buffer[i]);
//         mul <<= b8;
//     }

//     return val;
// }



// function bigToBuffer(n: bigint, buffer, bufferSize)
// {
//     bigToBufferAt(n, buffer, 0, bufferSize);
// }



// function bigToBufferAt(n: bigint, buffer, start, bufferSize)
// {
//     let size = Math.ceil(bigBitCount(n) / 8);
    
//     size = Math.min(size, buffer.length - start);

//     start += bufferSize - size;

//     for (let i = start+size-1; i >= start; i--) // little-endian
//     {
//         buffer[i] = Number(n & bFF); 
//         n >>= b8;
//     }
// }



// function bigBitCount(n: bigint)
// {
//     return n.toString(2).length;
// }



// function bigModInvert(n: bigint, m: bigint)
// {
//     const gcd = bigGcdExtended(n, m);

//     if (gcd[0] != b1) return undefined; // inverse doesn't exist
//     else              return (gcd[1] % m + m) % m;
// }



// function bigGcdExtended(n: bigint, m: bigint)
// {
//     if (n == b0)
//         return [m, b0, b1];

//     const gcd = bigGcdExtended(m % n, n);

//     const x   = gcd[1];
//     const y   = gcd[2];

//     return [
//         gcd[0], 
//         y - (m/n)*x,
//         x ];
// }


// const cryptoModulusSize     = 64; // to keep the keys short
// const millerRabinIterations = 40;

// const cryptoBufferSize      = cryptoModulusSize/8;
// const cryptoPrimeBufferSize = cryptoBufferSize /2;
     
// const cryptoBuffer          = new Uint8Array(cryptoPrimeBufferSize);


// function bigCryptoRandom()
// {
//     for (let i = 0; i < cryptoPrimeBufferSize; i++)
//         cryptoBuffer[i] = toInt(Math.random() * 0x100);

//     cryptoBuffer[0]                       |= 0xC0; // set the top bit to ensure a relatively large number
//     cryptoBuffer[cryptoPrimeBufferSize-1] |= 0x01; // set low bit to ensure the number is odd

//     return bigFromBuffer(cryptoBuffer);
// }



// function bigNextCryptoPrime(n) 
// {
//     while (!bigIsPrime(n))
//         n += b2;
    
//     return n;
// }



// function bigCryptoPrime(e)
// {
//     // set p so that gcd(e, p-1) = 1
    
//     let p;

//     do
//     {
//         const rnd = bigCryptoRandom();
//         p         = bigNextCryptoPrime(rnd);
//     }
//     while (gcd(p-b1, e) != b1); 
        
//     return p;
// }



// function createCryptoPrimePair(e)
// {
//     let p = bigCryptoPrime(e);
    
//     let q;
//     do { q = bigCryptoPrime(e); } 
//     while (q == p);

    
//     if (p < q)
//         [p,q] = [q,p];

    
//     // console.log('p: ' + p);
//     // console.log('q: ' + q);

//     return [p, q];
// }



// function createCryptoKeys()
// {
//     const e = BigInt(65537); // 0x10001


//     const p = 171015884525198953812766518124105165718653873998956756668025044221872229189000224853283418100843709051461026314124691533908776566252132643262590538651722808414927589080453045207809268132409732602333460056024268701292425924373474424856230484676389948410647363185480527668352208344285098898398427328550005504453,
//           q = 155609589144550304318321520462261131589420632313724769782511579674112504658012602948864212319636338680003350414119487761858358450704391631375906758644966783345911054968703886354891203894119403383879286405905868259207088334824357002928336613811380509880129563041650203531859521495334731320347454780789832377709;
    

//     const  n   = p * q;
//     const _phi = (p-b1) * (q-b1);

//     const  d   = bigModInvert(e, _phi);


//     return {
//         public:  {n:n, e:e },
//         private: {n:n, d:d, p:p, q:q} };
// }                        



// function encryptBlock(n, key, sign  ) { return bigPowMod(n, (sign   ? key.d : key.e), key.n); }        
// function decryptBlock(n, key, verify) { return bigPowMod(n, (verify ? key.e : key.d), key.n); }        



// function encrypt(data, key) { return encryptData(data, key, false); }
// function decrypt(data, key) { return decryptData(data, key, false); }

// function sign   (data, key) { return encryptData(data, key, true); } // yes I know real sign/verify uses a hash,
// function verify (data, key) { return decryptData(data, key, true); } // but I prefer it this way for what I need



// function encryptData(data, key, sign)
// {
//     // prep array should be a multiple of cryptoBufferSize
//     const prep   = new Uint8Array(Math.ceil((data.length) / cryptoBufferSize) * cryptoBufferSize); 
//     const cipher = new Uint8Array(prep.length);


//     const start = prep.length - data.length;
//     for (let i = 0; i < data.length; i++)
//         prep[start+i] = data[i];


//     let length = prep.length;
//     let nBlock = 0;

//     while (length > 0)
//     {
//         const blockStart = nBlock * cryptoBufferSize;
//         const blockSize  = Math.min(length, cryptoBufferSize);
        
//         const block      = bigFromBufferAt(prep, blockStart, cryptoBufferSize);
//         const enc        = encryptBlock(block, key, sign);
        
//         bigToBufferAt(enc, cipher, blockStart, cryptoBufferSize);
        
//         nBlock++;
//         length -= blockSize;
//     }
    
    
//     return cipher;
// }



// function decryptData(cipher, key, verify)
// {
//     const data = new Uint8Array(cipher.length);
    
    
//     let length = cipher.length;
//     let nBlock = 0;
    
//     while (length > 0)
//     {
//         const blockStart = nBlock * cryptoBufferSize;
//         const blockSize  = Math.min(length, cryptoBufferSize);

//         const block      = bigFromBufferAt(cipher, blockStart, cryptoBufferSize);
//         const dec        = decryptBlock(block, key, verify);

//         bigToBufferAt(dec, data, blockStart, cryptoBufferSize); 

//         nBlock++;
//         length -= blockSize;
//     }    


//     return data;    
// }


const MONTHLY_LICENSE = 'M';
const  YEARLY_LICENSE = 'Y';


//const licenseKeys     = createCryptoKeys();
//const licenseHashSize = 4;



function figValidateLicense(license)
{
    figPostMessageToUi({
        cmd:   'uiReturnFigValidateLicense',
        result: false
    })
}



// function createProductKey(userId: string, licenseType: string, lastYear: number, lastMonth: number)
// {
//     // how to revoke
    
//     const str = 
//           userId 
//         + licenseType
//         + lastYear .toString() 
//         + lastMonth.toString();

//     const hash = hashLicenseName(str, licenseHashSize);
//     const enc  = sign(hash, licenseKeys.private);
//     const key  = arrayToBase32(enc);

//     return key;
// }



// function validateProductKey(name, key, rec = false)
// {
//     // TODO: check from today until 1 year from now (max license length)
//     // 1/day, so 365 max, add end day to name
//     // check today against last launch date (in private data) to prevent clock tampering

//     const arr  = base32toArray(key.toUpperCase());
//     const dec  = verify(arr, licenseKeys.public).subarray(licenseHashSize);
//     const trim = dec.subarray(dec.length - licenseHashSize);
//     const hash = hashLicenseName(name, licenseHashSize);
    
//     const valid = arraysAreEqual(trim, hash);

//     if (valid && !rec)
//     {
//         let lowerKey = key;

//         const lastChar  = lastOf(lowerKey);
//         const lastIndex = base32chars.indexOf(lastChar);

//         if (lastIndex > 0)
//         {
//             lowerKey = replaceInStringAt(lowerKey, lowerKey.length-1, base32chars[lastIndex-1]);

//             if (validateProductKey(name, lowerKey, true))
//                 return false; // at this scale of product key the last bit needs to be guarded against
//         }
//     }

//     return valid;
// }



// function hashLicenseName(name, nBytes)
// {
//     // XOR wrap name around a given number of bytes

//     const bytes = stringToArray(name);

//     if (bytes.length > nBytes)
//     {
//         let pos    = nBytes;
//         let length = bytes.length - nBytes;
        
//         while (length > 0)
//         {
//             for (let i = 0; i < nBytes; i++)
//                 bytes[i] ^= bytes[pos+i];
            
//             pos    += nBytes;
//             length -= nBytes;
//         }
//     }
    

//     return newSizeArrayFrom(bytes, nBytes);
// }


//const MAX_NODES   = 0x10000;

//const objNodes    = new Array(MAX_NODES).fill(null);

//var   minNodeId   = Number.MAX_SAFE_INTEGER;
//var   maxNodeId   = Number.MIN_SAFE_INTEGER;


//figma.on('selectionchange', figOnSelectionChange);

figma.on('documentchange', figOnDocumentChange);
figma.on('close',          figOnPluginClose);


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

        if (wndWidth  == null) { wndWidth  = 800; figma.clientStorage.setAsync('windowWidth',  wndWidth ); }
        if (wndHeight == null) { wndHeight = 600; figma.clientStorage.setAsync('windowHeight', wndHeight); }

        
        figma.ui.resize(
            Math.max(0, wndWidth),
            Math.max(0, wndHeight));

        figma.ui.show();

        
        figPostMessageToUi({
            cmd:        'uiReturnFigStartGenerator',
            currentUser: figma.currentUser,
            productKey:  productKey });
    })();
}





var figObjectArrays = new Array(); // [ {nodeId, [objects]} ]
var figStyleArrays  = new Array(); // [ {nodeId, [styles]}  ]



function figDeleteObjectsFromNodeIds(nodeIds)
{
    figObjectArrays = figObjectArrays.filter(a => !nodeIds.includes(a.nodeId));
}



function figDeleteAllObjects()
{
    for (const obj of figma.currentPage.children)
        if (!!obj.getPluginData('id')) 
            obj.remove();
}



function figDeleteStylesFromNodeIds(nodeIds, mustDelete)
{
    // styles are deleted first
    
    const paintStyles = figma.getLocalPaintStyles();

    figma.currentPage
        .findAll(o => nodeIds.includes(o.getPluginData('nodeId')))
        .forEach(o => o.remove());

    paintStyles
        .filter(s => 
                nodeIds.includes(s.getPluginData('nodeId')))
//            && !parseBool(s.getPluginData('existing')))
        .forEach(s => 
        {
            const nodeId   = s.getPluginData('nodeId');
            const existing = parseBool(s.getPluginData('existing'));
            
            if (!existing) 
            {
                s.remove();
            }
            else if (mustDelete)
            {
                removeFromArrayWhere(figStyleArrays, a => a.nodeId == nodeId);

                s.setPluginData('type',     NULL);
                s.setPluginData('nodeId',   NULL);
                s.setPluginData('existing', NULL);
            }
        });


    if (mustDelete)
        figStyleArrays = figStyleArrays.filter(a => !nodeIds.includes(a.nodeId));
}


var styleChangingFromGenerator = false;



//function figOnSelectionChange(e)
//{
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
//}



function figOnDocumentChange(e)
{
    for (const change of e.documentChanges)
    {
        switch (change.type)
        {
            case 'STYLE_CREATE': 
                // this is for undoing style deletion in Figma,
                // when the style comes back it shouldn't be like before

                if (!change.style)
                    break;

                if (!styleChangingFromGenerator)
                {
                    change.style.setPluginData('type',     NULL);
                    change.style.setPluginData('nodeId',   NULL);
                    change.style.setPluginData('existing', NULL);
                }

                break;


            case 'STYLE_PROPERTY_CHANGE': 
            {
                if (!change.style)
                    break;

                if (!styleChangingFromGenerator)
                {
                    const msg = {
                        cmd:       'uiStylePropertyChange',
                        styleId:    cleanStyleId(change.id),
                        properties: change.properties,
                        name:       '',
                        paints:     [] };
    

                    for (const prop of change.properties)
                    {
                        switch (prop)
                        {
                            case 'name':  msg.name   = change.style.name;   break;
                            case 'paint': msg.paints = change.style.paints; break;
                        }
                    }


                    figPostMessageToUi(msg);
                }
                
                break;
            }

            
            case 'STYLE_DELETE':
                figPostMessageToUi({
                    cmd:    'uiStyleDelete',
                    styleId: change.id });

                break;
        }
    }

    styleChangingFromGenerator = false;
}



function figOnPluginClose()
{
    figDeleteAllObjects();
}


// from UI <--
///////////////////////////////////////////////////////////////////////////////////////////////////

figma.ui.onmessage = function(msg)
{
    msg = JSON.parse(msg);
    
    switch (msg.cmd)
    {
        case 'figStartGenerator':                     figStartGenerator                    ();                                            break;
     
        case 'figDockWindowNormal':                   figDockWindow                        ('normal');                                    break;
        case 'figDockWindowMaximize':                 figDockWindow                        ('maximize');                                  break;
        case 'figDockWindowTop':                      figDockWindow                        ('top');                                       break;
        case 'figDockWindowLeft':                     figDockWindow                        ('left');                                      break;
        case 'figDockWindowRight':                    figDockWindow                        ('right');                                     break;
        case 'figDockWindowBottom':                   figDockWindow                        ('bottom');                                    break;        

        //case 'figPositionWindow':                   figPositionWindow                    (msg.x, msg.y);                                break; 
        case 'figResizeWindow':                       figResizeWindow                      (msg.width, msg.height);                       break; 
        case 'figSetWindowRect':                      figSetWindowRect                     (msg.x, msg.y, msg.width, msg.height);         break;

        case 'figNotify':                             figNotifyMsg                         (msg);                                         break;
     
        case 'figGetLocalData':                       figGetLocalData                      (msg.key);                                     break;
        case 'figSetLocalData':                       figSetLocalData                      (msg.key, msg.value);                          break;
     
        case 'figClearAllLocalData':                  figClearAllLocalData                 ();                                            break;
     
        case 'figGetPageData':                        figGetPageData                       (msg.key);                                     break;
        case 'figSetPageData':                        figSetPageData                       (msg.key, msg.value);                          break;
     
        case 'figLoadNodesAndConns':                  figLoadNodesAndConns                 (msg.dataMode);                                break;
        case 'figSaveNodes':                          figSaveNodes                         (msg.nodeIds, msg.nodeJson);                   break;
     
        case 'figRemoveConnsToNodes':                 figRemoveConnsToNodes                (msg.nodeIds);                                 break;
        case 'figRemoveSavedNodesAndConns':           figRemoveSavedNodesAndConns          (msg.nodeIds);                                 break;
        case 'figRemoveAllSavedNodesAndConns':        figRemoveAllSavedNodesAndConns       ();                                            break;
     
        case 'figLogAllSavedNodesAndConns':           figLogAllSavedNodesAndConns          ();                                            break;
        case 'figLogAllSavedNodes':                   figLogAllSavedNodes                  ();                                            break;
        case 'figLogAllSavedConns':                   figLogAllSavedConns                  ();                                            break;
     
        case 'figLogAllSavedConnKeys':                figLogAllSavedConnKeys               ();                                            break;
     
        case 'figSaveConnection':                     figSaveConnection                    (msg.key, msg.json);                           break;
        case 'figSaveConnections':                    figSaveConnections                   (msg.keys, msg.json);                          break;
        case 'figUpdateSavedConnections':             figUpdateSavedConnections            (msg.curKeys, msg.newKeys, msg.json);          break;
        case 'figDeleteSavedConnection':              figDeleteSavedConnection             (msg.key);                                     break;
     
        case 'figRemoveAllSavedConnections':          figRemoveAllSavedConnections         ();                                            break;
        case 'figDeleteSavedConnectionsToNode':       figDeleteSavedConnectionsToNode      (msg.nodeId);                                  break;
        case 'figDeleteSavedConnectionsFromNode':     figDeleteSavedConnectionsFromNode    (msg.nodeId);                                  break;
        case 'figRemovePluginDataFromAllLocalStyles': figRemovePluginDataFromAllLocalStyles();                                            break;

        case 'figGetAllLocalColorStyles':             figGetAllLocalColorStyles            (msg.nodeId, msg.px, msg.py);                  break;
        case 'figLinkNodeToExistingColorStyle':       figLinkNodeToExistingColorStyle      (msg.nodeId, msg.styleId);                     break;
     
        case 'figUpdateObjectsAndStyles':                      
            figUpdateObjects(msg);
            figUpdateStyles(msg);
            break;
     
        case 'figDeleteObjectsAndStyles':             
            figDeleteObjectsFromNodeIds(msg.nodeIds); 
            figDeleteStylesFromNodeIds(msg.nodeIds, msg.mustDelete); 
            break; 
    
        case 'figTriggerUndo': figma.triggerUndo(); break; 
        case 'figCommitUndo':  figma.commitUndo();  break; 

        case 'figValidateLicense':
            figValidateLicense(msg.license);
            break;
    }


    figPostMessageToUi({
        cmd:      'uiEndFigMessage',
        msgCmd:    msg.cmd });
}

///////////////////////////////////////////////////////////////////////////////////////////////////



// to UI -->
///////////////////////////////////////////////////////////////////////////////////////////////////

function figPostMessageToUi(msg)
{
    figma.ui.postMessage(JSON.stringify(msg));
}

///////////////////////////////////////////////////////////////////////////////////////////////////



// to Generator -->
///////////////////////////////////////////////////////////////////////////////////////////////////

// function figPostMessageToGenerator(msg)
// {
//     figPostMessageToUi({
//         cmd: 'uiForwardToGen',
//         msg:  msg
//     });
// }



// function figEndGeneratorMessage()
// {
//     figPostMessageToGenerator({cmd: 'genEndFigMessage'}); 
// }

///////////////////////////////////////////////////////////////////////////////////////////////////


function figCreateObject(objects, genObj)
{
    let figObj;

    switch (genObj.type)
    {
        case RECTANGLE:  figObj = figCreateRect   (genObj);  break;
        case LINE:       figObj = figCreateLine   (genObj);  break;
        case ELLIPSE:    figObj = figCreateEllipse(genObj);  break;
        case POLYGON:    figObj = figCreatePolygon(genObj);  break;
        case STAR:       figObj = figCreateStar   (genObj);  break;
    }

    console.assert(!!figObj, 'no Figma object created');


    figObj.setPluginData('id',       genObj.objectId.toString());
    figObj.setPluginData('type',     genObj.type);
    figObj.setPluginData('nodeId',   genObj.nodeId);
    figObj.setPluginData('nodeName', genObj.nodeName);
    

    objects.push(figObj);


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
            {
                figObjectArrays.push(figObjects = {
                    nodeId:   genObj.nodeId, 
                    existing: genObj.existing,
                    objects:  []});
            }
        }


        const figObj = figObjects.objects[genObj.objectId];


        if (   isValid(figObj)
            && figObj.removed)
            removeFrom(figObjects.objects, figObj);


        if (  !isValid(figObj)
            || figObj.removed) // no existing object, create new object
            figCreateObject(figObjects.objects, genObj);
            
        else if (figObj.getPluginData('type') == genObj.type.toString()) // update existing object
            figUpdateObject(figObj, genObj);

        else // delete existing object, create new object
        {
            figObj.remove();
            figCreateObject(figObjects.objects, genObj);
        }
    }
}



function figUpdateObject(figObj, genObj)
{
    switch (genObj.type)
    {
        case RECTANGLE:  figUpdateRect   (figObj, genObj);  break;
        case LINE:       figUpdateLine   (figObj, genObj);  break;
        case ELLIPSE:    figUpdateEllipse(figObj, genObj);  break;
        case POLYGON:    figUpdatePolygon(figObj, genObj);  break;
        case STAR:       figUpdateStar   (figObj, genObj);  break;
    }
}



///////////////////////////////////////////////////////////////////////////////////////////////////



function makeObjectName(obj)
{
    return OBJECT_PREFIX + obj.nodeId
         + (obj.objectId > -1 ? '.'+obj.objectId : '');
}



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
        &&  !isEmpty(src.fills))
        obj.fills = getObjectFills(src.fills);
    else
        obj.fills = [];
}



function setObjectStrokes(obj, src)
{
    if (    src.strokes != null
        && !isEmpty(src.strokes))
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


function figGetAllLocalColorStyles(nodeId, px, py)
{
    const _styles = figma.getLocalPaintStyles();


    const styles = new Array();

    for (const _style of _styles)
    {
        const _nodeId   = _style.getPluginData('nodeId');
        const _existing = _style.getPluginData('existing');

        const existing = !!_existing;

        const style = { 
            id:       _style.id,
            nodeId:   _nodeId,
            name:     _style.name,
            existing: existing,
            paints:   new Array()
        };

        
        let onlyPaint = true;

        for (const _paint of _style.paints)
        {
            if (_paint.type == 'SOLID')
            {
                style.paints.push([
                    _paint.color.r,
                    _paint.color.g,
                    _paint.color.b]);
            }
            else
            {
                onlyPaint = false;
                break;
            }
        }


        if (onlyPaint)
            styles.push(style);
    }


    figPostMessageToUi({
        cmd:   'uiReturnFigGetAllLocalColorStyles',
        nodeId: nodeId,
        px:     px,
        py:     py,
        styles: JSON.stringify(styles)});
}



function figLinkNodeToExistingColorStyle(nodeId, styleId)
{
    const localStyles = figma.getLocalPaintStyles();

    if (styleId != NULL) figLinkColorStyle(localStyles, nodeId, styleId);
    else                 figClearColorStyle(localStyles, nodeId);
}



function figLinkColorStyle(localStyles, nodeId, styleId, clearExisting = true)
{
    const figStyles = figStyleArrays.find(a => a.nodeId == nodeId);
    
    if (   figStyles 
        && clearExisting) 
        figClearColorStyle(localStyles, nodeId);


    const figStyle = localStyles.find(s => s.id == styleId);
    console.assert(!!figStyle, 'figStyle should be found here');


    figStyle.setPluginData('type',     COLOR_STYLE);
    figStyle.setPluginData('nodeId',   nodeId);
    figStyle.setPluginData('existing', boolToString(true));


    figStyleArrays.push({
        nodeId:   nodeId, 
        existing: true, 
        styles:   [figStyle]});


    return figStyle;
}



function figClearColorStyle(localStyles, nodeId)
{
    const figStyle = localStyles.find(s => s.getPluginData('nodeId') == nodeId);
    //console.assert(!!figStyle, 'figStyle should be found here');

    if (figStyle) // could have been deleted
    {
        figStyle.setPluginData('type',     NULL);
        figStyle.setPluginData('nodeId',   NULL);
        figStyle.setPluginData('existing', NULL);

        removeFromArrayWhere(figStyleArrays, a => a.nodeId == nodeId);
    }

    return figStyle;
}



function figCreateColorStyle(styles, genStyle)
{
    const figStyle = figma.createPaintStyle();


    figStyle.setPluginData('type',     genStyle.type);
    figStyle.setPluginData('nodeId',   genStyle.nodeId);
    figStyle.setPluginData('existing', boolToString(genStyle.existing));

    figStyle.name = genStyle.styleName;


    setStylePaints(figStyle, genStyle);


    styles.push(figStyle);


    figPostMessageToUi({
        cmd:    'uiSetStyleId',
        nodeId:  genStyle.nodeId,
        styleId: figStyle.id });

    
    return figStyle;
}



function figUpdateStyles(msg)
{
    let curNodeId = NULL;
    let figStyles;


    for (const genStyle of msg.styles)
    {
        if (genStyle.nodeId != curNodeId)
        {
            curNodeId = genStyle.nodeId;
            
            figStyles = figStyleArrays.find(a => a.nodeId == genStyle.nodeId);

            if (!figStyles) 
            {
                figStyles = {
                    nodeId:   genStyle.nodeId, 
                    existing: genStyle.existing, 
                    styles:   [] };

                figStyleArrays.push(figStyles);
            }
        }
        else
            figStyles = null;


        const figStyle    = figStyles.styles[0];
        
        const localStyles = figma.getLocalPaintStyles();
        const localStyle  = localStyles.find(s => s.getPluginData('nodeId') == genStyle.nodeId);


        if (    isValid(figStyle)
            && !isValid(localStyle)) // removed
        {
            removeFrom(figStyles.styles, figStyle);
        }


        const existing = 
               isValid(figStyle)
            && isValid(localStyle)
            && figStyle.getPluginData('existing');


        if (   !isValid(figStyle)
            || !isValid(localStyle)) // no existing style, create new style
        {
            if (!existing)
            {
                styleChangingFromGenerator = true;
                figCreateColorStyle(figStyles.styles, genStyle);
            }
        }
        else if (isValid(figStyle) 
              && figStyle.getPluginData('type') == genStyle.type) // update existing style
        {
            styleChangingFromGenerator = true;
            figUpdateColorStyle(localStyle, genStyle);
        }
        else // delete existing style, create new style
        {
            if (!existing)
            {
                localStyle.remove();
                styleChangingFromGenerator = true;
                figCreateColorStyle(figStyles.styles, genStyle);
            }
        }
    }
}



function figUpdateColorStyle(figStyle, genStyle)
{
    setStylePaints(figStyle, genStyle);

    figStyle.name = genStyle.nodeName;
}



function getStylePaints(stylePaints)
{
    const paints = new Array();

    for (const _paint of stylePaints)
    {
        const fill = _paint[1].split(' ');

        switch (_paint[0])
        {
            case 'SOLID':
                paints.push(
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

    return paints;
}



function setStylePaints(style, src)
{
    if (   !!src.paints
        &&  !isEmpty(src.paints))
        style.paints = getStylePaints(src.paints);
    else
        style.paints = [];
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
        figPostMessageToUi({
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
        figPostMessageToUi({
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
    const nodeKeys = figma.currentPage.getPluginDataKeys().filter(k => isNodeKey(k));
    const connKeys = figma.currentPage.getPluginDataKeys().filter(k => isConnKey(k));

    if (!dataMode)
        figMarkForLoading(nodeKeys, connKeys);

    const nodes = nodeKeys.map(k => figma.currentPage.getPluginData(k));
    const conns = connKeys.map(k => figma.currentPage.getPluginData(k));


    initPageStyles(nodes);


    const legacy = figma.currentPage.getPluginData('graph');


    figPostMessageToUi({
        legacy:   legacy,
        cmd:      'uiReturnFigLoadNodesAndConns',
        nodeKeys: JSON.stringify(nodeKeys),
        nodeJson: JSON.stringify(nodes),
        connKeys: JSON.stringify(connKeys),
        connJson: JSON.stringify(conns)
    });
}



function initPageStyles(nodes)
{
    figStyleArrays = [];

    const paintStyles = figma.getLocalPaintStyles();


    for (const _node of nodes)
    {
        const node = JSON.parse(_node);

        if (node.type == COLOR_STYLE)
        {
            const style = paintStyles.find(s =>
            {
                const nodeId = s.getPluginData('nodeId');
                return nodeId == node.id;
            });

            if (style)
            {
                figStyleArrays.push({
                    nodeId:   node.id, 
                    existing: parseBool(node.existing), 
                    styles:   [style]});
            }
        }
    }
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
    figRemoveConnsToNodes(nodeIds);

    const nodeKeys = figma.currentPage.getPluginDataKeys().filter(
           k => isNodeKey(k)
        && nodeIds.includes(noNodeTag(k)));

    nodeKeys.forEach(k => figClearPageData(k));
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



function figRemovePluginDataFromAllLocalStyles()
{
    const localStyles = figma.getLocalPaintStyles();

    for (const style of localStyles)
    {
        style.setPluginData('type',     '');
        style.setPluginData('nodeId',   '');
        style.setPluginData('existing', '');
    }
}


var notifyNotificationHandler = null;
var notifyDequeueHandler = () => notifyNotificationHandler = null;

var windowDock = 'normal'; // '', 'maximize', 'top', 'left', 'right', 'bottom'



function figSetWindowRect(x, y, width, height)
{
    (async function()
    {
        let position = false;

        const rect = {
            x:      x,
            y:      y,
            width:  Math.floor(Math.max(0, width )),
            height: Math.floor(Math.max(0, height))    
        };

        
        if (windowDock != 'normal')
            position = true;

        if (isNaN(rect.x)) rect.x = await figma.clientStorage.getAsync('windowX');
        if (isNaN(rect.y)) rect.y = await figma.clientStorage.getAsync('windowY');


        dockWindow(
            windowDock,
            rect, 
            figma.viewport.bounds);


        rect.x      = Math.round(rect.x     );
        rect.y      = Math.round(rect.y     );
        rect.width  = Math.round(rect.width );
        rect.height = Math.round(rect.height);


        // console.log('_ x =',      rect.x);
        // console.log('_ y =',      rect.y);
        // console.log('_ width =',  rect.width);
        // console.log('_ height =', rect.height);


        figma.ui.resize(rect.width, rect.height);

        figma.clientStorage.setAsync('windowWidth',  rect.width);
        figma.clientStorage.setAsync('windowHeight', rect.height);


        if (position)
        {
            //figma.ui.reposition(rect.x, rect.y);

            figma.clientStorage.setAsync('windowX', rect.x);
            figma.clientStorage.setAsync('windowY', rect.y);
        }


        figPostMessageToUi({cmd: 'uiReturnFigSetWindowRect'});
    })();
}



function dockWindow(dock, rect, bounds)
{
    switch (dock)
    {
        case 'normal':   
            // x      = windowX;
            // y      = windowY;
            // width  = windowWidth;
            // height = windowHeight;
            break;
            
        case 'maximize':
            rect.x      = bounds.x;
            rect.y      = bounds.y;
            rect.width  = bounds.width;
            rect.height = bounds.height;        
            break;

        case 'top':      
            rect.x      = bounds.x;
            rect.y      = bounds.y;
            rect.width  = bounds.width;
            break;

        case 'left':     
            rect.x      = bounds.x;
            rect.y      = bounds.y;
            rect.height = bounds.height;        
            break;

        case 'right':    
            rect.x      = bounds.x + bounds.width - rect.width;
            rect.y      = bounds.y;
            rect.height = bounds.height;        
            break;

        case 'bottom':   
            rect.x      = bounds.x;
            rect.y      = bounds.y + bounds.height - rect.height;
            rect.width  = bounds.width;
            break;
    }
}



// function figRepositionWindow(x, y)
// {
//     figma.ui.reposition(x, y);

//     figma.clientStorage.setAsync('windowX', x);
//     figma.clientStorage.setAsync('windowY', y);

//     figPostMessageToUi({cmd: 'uiReturnFigRepositionWindow'});
// }



function figResizeWindow(width, height)
{
    (async function()
    {
        let x, y;

        let position = false;


        const bounds = figma.viewport.bounds;


        width  = Math.floor(Math.max(0, width ));
        height = Math.floor(Math.max(0, height));

        
        if (windowDock != 'normal')
        {
            figma.clientStorage.setAsync('normalWindowX',      await figma.clientStorage.getAsync('normalWindowX'     ));
            figma.clientStorage.setAsync('normalWindowY',      await figma.clientStorage.getAsync('normalWindowY'     ));
            figma.clientStorage.setAsync('normalWindowWidth',  await figma.clientStorage.getAsync('normalWindowWidth' ));
            figma.clientStorage.setAsync('normalWindowHeight', await figma.clientStorage.getAsync('normalWindowHeight'));

            position = true;
        }


        // const windowX = figma.clientStorage.getAsync('windowX');
        // const windowY = figma.clientStorage.getAsync('windowY');


        // switch (windowDock)
        // {
        //     case 'normal':   
        //         // x      = windowX;
        //         // y      = windowY;
        //         // width  = windowWidth;
        //         // height = windowHeight;
        //         break;
                
        //     case 'maximize':
        //         x      = bounds.x;
        //         y      = bounds.y;
        //         width  = bounds.width;
        //         height = bounds.height;        
        //         break;

        //     case 'top':      
        //         x      = bounds.x;
        //         y      = bounds.y;
        //         width  = bounds.width;
        //         break;

        //     case 'left':     
        //         x      = bounds.x;
        //         y      = bounds.y;
        //         height = bounds.height;        
        //         break;

        //     case 'right':    
        //         x      = bounds.x + bounds.width - width;
        //         y      = bounds.y;
        //         height = bounds.height;        
        //         break;

        //     case 'bottom':   
        //         x      = bounds.x;
        //         y      = bounds.y + bounds.height - height;
        //         width  = bounds.width;
        //         break;
        // }


        // x      = Math.round(x     );
        // y      = Math.round(y     );
        width  = Math.round(width );
        height = Math.round(height);


        // console.log('width =',  width);
        // console.log('height =', height);

        figma.ui.resize(width, height);

        figma.clientStorage.setAsync('windowWidth',  width);
        figma.clientStorage.setAsync('windowHeight', height);


        // if (position)
        // {
        //     figma.ui.reposition(x, y);

        //     figma.clientStorage.setAsync('windowX', x);
        //     figma.clientStorage.setAsync('windowY', y);
        // }


        figPostMessageToUi({cmd: 'uiReturnFigResizeWindow'});
    })();
}



async function figDockWindow(dock) 
{
    if (   dock       != 'normal'
        && windowDock == 'normal')
    {
        figma.clientStorage.setAsync('normalWindowX',      await figma.clientStorage.getAsync('normalWindowX'     ));
        figma.clientStorage.setAsync('normalWindowY',      await figma.clientStorage.getAsync('normalWindowY'     ));
        figma.clientStorage.setAsync('normalWindowWidth',  await figma.clientStorage.getAsync('normalWindowWidth' ));
        figma.clientStorage.setAsync('normalWindowHeight', await figma.clientStorage.getAsync('normalWindowHeight'));
    }


    windowDock = dock;

    figma.clientStorage.setAsync('windowDock', dock);

    figResizeWindow(
        await figma.clientStorage.getAsync('windowWidth' ),
        await figma.clientStorage.getAsync('windowHeight'));
}



function figNotifyMsg(msg)
{
    figNotify(
        msg.text, 
        msg.prefix, 
        msg.delay, 
        msg.error, 
        msg.buttonText,
        msg.buttonAction);
}



function figNotify(text, prefix = 'Generator ', delay = 400, error = false, buttonText = '', buttonAction = NULL)
{
    const options = {
        timeout:   delay,
        error:     error,
        onDequeue: notifyDequeueHandler
    };


    if (buttonText != '')
    {
        options['button'] = {text: buttonText};

        switch (buttonAction)
        {
            case 'hideClearUndoWarning':
                options['button']['action'] = () => figPostMessageToUi({ cmd: 'uiHideClearUndoWarning' });
                break;
        }
    }


    if (notifyNotificationHandler)
        notifyNotificationHandler.cancel();


    notifyNotificationHandler = figma.notify(prefix + text, options);
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