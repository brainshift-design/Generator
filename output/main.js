var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function isTagKey(key, tag) {
    return key.substring(0, tag.length + 1) == tag + ' ';
}
function noTag(key, tag) {
    return key.substring(tag.length + 1);
}
function isPageKey(key) { return isTagKey(key, pageTag); }
function isNodeKey(key) { return isTagKey(key, nodeTag); }
function isConnKey(key) { return isTagKey(key, connTag); }
function noPageTag(key) { return noTag(key, pageTag); }
function noNodeTag(key) { return noTag(key, nodeTag); }
function noConnTag(key) { return noTag(key, connTag); }
const generatorVersion = 132;
const MAX_INT32 = 2147483647;
const NULL = '';
const HTAB = '  '; // half-tab
const TAB = '    ';
const NL = '\n';
const GENERATOR_LOGO = '◦ G •';
const OBJECT_PREFIX = 'G ';
const nodeTag = 'G_NODE';
const connTag = 'G_CONN';
const pageTag = 'G_PAGE';
function toInt(f) { return Math.floor(f) | 0; }
function nextPow2(x) {
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
function gcd(a, b) {
    let temp;
    while (1) {
        temp = a % b;
        if (temp == 0)
            return b;
        a = b;
        b = temp;
    }
}
function toUtf8(str) {
    return decodeURI(encodeURIComponent(str));
}
function fromUtf8(str) {
    return decodeURIComponent(encodeURI(str));
}
function charCodeArrayToString(bytes) {
    let str = '';
    for (let i = 0; i < bytes.length; i++)
        str += String.fromCharCode(bytes[i]);
    return str;
}
function stringToCharCodeArray(str) {
    return Array.from(fromUtf8(str), c => c.charCodeAt(0));
}
function newSizeArrayFrom(array, size) {
    const newArray = new Uint8Array(size);
    copyArray(array, newArray);
    return newArray;
}
function copyArray(src, dst) {
    copyArrayAt(src, 0, src.length, dst, 0, dst.length);
}
function copyArrayAt(src, srcStart, srcSize, dst, dstStart, dstSize) {
    const size = Math.min(srcSize, dstSize);
    for (let i = 0; i < size; i++)
        dst[dstStart + i] = src[srcStart + i];
}
function arraysAreEqual(arr1, arr2) {
    if (arr1.length != arr2.length)
        return false;
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] != arr2[i])
            return false;
    }
    return true;
}
function arraysIntersect(array1, array2) {
    return array1.findIndex(i => array2.includes(i)) > -1;
}
function leftArrowChar(list) { return list ? '⟸' : '⟵'; }
function rightArrowChar(list) { return list ? '⟹' : '⟶'; }
function nodeNameForStorage(nodeId) { return nodeTag + ' ' + nodeId; }
function connNameForStorage(name) { return connTag + ' ' + name; }
function pageNameForStorage(name) { return pageTag + ' ' + name; }
function parseBool(str) {
    return str.toLowerCase() == 'true'
        || str == '1';
}
function connToString(_conn, logSpace = false) {
    return getConnectionString(_conn.outputNodeId, _conn.outputId, _conn.outputOrder, _conn.inputNodeId, _conn.inputId, _conn.list, logSpace);
}
function getConnectionKey(outputNodeId, outputId, outputOrder, inputNodeId, inputId) {
    return connNameForStorage(outputNodeId + ' '
        + outputId + ' '
        + outputOrder + ' '
        + inputNodeId + ' '
        + inputId);
}
function getStorageConnKey(conn) {
    return getConnectionKey(conn.outputNodeId, conn.outputId, conn.outputOrder, conn.inputNodeId, conn.inputId);
}
function getConnKey(conn) {
    return getConnectionKey(conn.output.node.id, conn.output.id, conn.outputOrder, conn.input.node.id, conn.input.id);
}
function getConnString(conn, logSpace = false) {
    return getConnectionString(conn.output.node.id, conn.output.id, conn.outputOrder, conn.input.node.id, conn.input.id, conn.list, logSpace);
}
function getConnectionString(outputNodeId, outputId, outputOrder, inputNodeId, inputId, list, logSpace = false) {
    const sp = logSpace ? ' ' : '  ';
    const jsp = logSpace ? '' : ' ';
    const arrow = sp
        + subscriptNumber(typeof outputOrder == 'string' ? parseInt(outputOrder) : outputOrder)
        + rightArrowChar(typeof list == 'string' ? parseBool(list) : list)
        + sp;
    const join = jsp + '.' + jsp;
    return '( '
        + outputNodeId + join + outputId
        + arrow
        + inputNodeId + join + inputId
        + ' )';
}
function getPageKey(pageId) {
    return pageNameForStorage(pageId);
}
function superscriptNumber(num) {
    const str = num.toString();
    let sup = '';
    for (const c of str)
        sup += superscriptChar(c);
    return sup;
}
function superscriptChar(c) {
    switch (c) {
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
function subscriptNumber(num) {
    const str = num.toString();
    let sup = '';
    for (const c of str)
        sup += subscriptChar(c);
    return sup;
}
function subscriptChar(c) {
    switch (c) {
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
function boolToString(bool) {
    return bool ? 'true' : 'false';
}
function isValid(val) {
    return val != undefined
        && val != null;
}
function isEmpty(array) {
    return array.length == 0;
}
function removeFrom(array, item) {
    removeAt(array, array.indexOf(item));
}
function removeAt(array, index) {
    if (index > -1
        && index < array.length)
        array.splice(index, 1);
}
function removeLast(array) {
    if (isEmpty(array))
        return null;
    let last = array.at(-1);
    array.splice(array.length - 1, 1);
    return last;
}
function lastOf(array) {
    return array[array.length - 1];
}
function moveInArray(array, from, to) {
    const item = array[from];
    array.splice(from, 1);
    array.splice(to, 0, item);
}
function removeFromArray(array, item) {
    const index = array.indexOf(item);
    if (index > -1)
        array.splice(index, 1);
}
function removeArrayFromArray(fromArray, array) {
    for (const item of array) {
        const index = fromArray.indexOf(item);
        if (index > -1)
            fromArray.splice(index, 1);
    }
}
function removeFromArrayWhere(array, where) {
    const index = array.findIndex(where);
    if (index > -1)
        array.splice(index, 1);
}
function cleanStyleId(styleId) {
    return styleId.split(',')[0] + ',';
}
const LIST_VALUE = 'LIST#';
const NUMBER_LIST_VALUE = 'NLIST#';
const TEXT_LIST_VALUE = 'TLIST#';
const SHAPE_LIST_VALUE = 'SLIST#';
const LIST = 'LIST';
const LIST_EXPAND = 'LEXP';
const ITEMS = 'ITEMS';
const SELECT = 'SEL';
const LIST_COUNT = 'COUNT';
const IF_ELSE = 'IF';
const START = 'START';
const REPEAT = 'REPT';
const CACHE = 'CACHE';
const COPY = 'COPY';
const ANY_VALUE = 'ANY#';
const LIST_TYPES = [
    LIST_VALUE,
    NUMBER_LIST_VALUE,
    TEXT_LIST_VALUE,
    SHAPE_LIST_VALUE,
    LIST,
    LIST_EXPAND,
    ITEMS,
    LIST_COUNT,
    REPEAT
];
const LIST_VALUES = [
    LIST_VALUE,
    NUMBER_LIST_VALUE,
    TEXT_LIST_VALUE,
    SHAPE_LIST_VALUE
];
const FOREACH = 'FOR';
const FLOW_TYPES = [
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
const NUMBER_VALUE = 'NUM#';
const NUMBER = 'NUM';
const NUMBER_SIGN = 'NSIGN';
const NUMBER_ABSOLUTE = 'ABS';
const NUMBER_ROUND = 'ROUND';
const NUMBER_LIMITS = 'LIM';
const NUMBER_SEQUENCE = 'SEQ';
const NUMBER_RANDOM = 'RAND';
const NUMBER_INTERPOLATE = 'LERP';
const NUMBER_SOLVE = 'SOLVE';
const NUMBER_ANIMATE = 'ANIM';
const NUMBER_MATH = 'MATH';
const NUMBER_ADD = 'ADD';
const NUMBER_SUBTRACT = 'SUB';
const NUMBER_MULTIPLY = 'MUL';
const NUMBER_DIVIDE = 'DIV';
const NUMBER_MODULO = 'MOD';
const NUMBER_EXPONENT = 'EXP';
const NUMBER_BOOLEAN = 'BOOL';
const NUMBER_NOT = 'NOT';
const NUMBER_AND = 'AND';
const NUMBER_OR = 'OR';
const NUMBER_XOR = 'XOR';
const NUMBER_CONDITION = 'COND';
const NUMBER_EQUAL = 'EQ';
const NUMBER_NOT_EQUAL = 'NE';
const NUMBER_LESS = 'LT';
const NUMBER_LESS_OR_EQUAL = 'LE';
const NUMBER_GREATER = 'GT';
const NUMBER_GREATER_OR_EQUAL = 'GE';
const NUMBER_TRIG = 'TRIG';
const NUMBER_SIN = 'SIN';
const NUMBER_COS = 'COS';
const NUMBER_TAN = 'TAN';
const MATH_TYPES = [
    NUMBER_MATH,
    NUMBER_ADD,
    NUMBER_SUBTRACT,
    NUMBER_MULTIPLY,
    NUMBER_DIVIDE,
    NUMBER_MODULO,
    NUMBER_EXPONENT
];
const BOOLEAN_TYPES = [
    NUMBER_BOOLEAN,
    NUMBER_NOT,
    NUMBER_AND,
    NUMBER_OR,
    NUMBER_XOR
];
const CONDITION_TYPES = [
    NUMBER_CONDITION,
    NUMBER_EQUAL,
    NUMBER_NOT_EQUAL,
    NUMBER_LESS,
    NUMBER_LESS_OR_EQUAL,
    NUMBER_GREATER,
    NUMBER_GREATER_OR_EQUAL
];
const TRIG_TYPES = [
    NUMBER_TRIG,
    NUMBER_SIN,
    NUMBER_COS,
    NUMBER_TAN
];
const NUMBER_TYPES = [
    NUMBER_VALUE,
    NUMBER_LIST_VALUE,
    NUMBER,
    NUMBER_SIGN,
    NUMBER_ABSOLUTE,
    NUMBER_ROUND,
    NUMBER_LIMITS,
    NUMBER_SEQUENCE,
    NUMBER_RANDOM,
    NUMBER_INTERPOLATE,
    NUMBER_SOLVE,
    NUMBER_ANIMATE,
    ...MATH_TYPES,
    ...BOOLEAN_TYPES,
    ...CONDITION_TYPES,
    ...TRIG_TYPES
];
const TEXT_VALUE = 'TEXT#';
const TEXT = 'TEXT';
const TEXT_LENGTH = 'TLEN';
const TEXT_TRIM = 'TTRIM';
const TEXT_SUBSTRING = 'TSUB';
const TEXT_REPLACE = 'TREPL';
const TEXT_JOIN = 'TJOIN';
const TEXT_CHAR = 'TCHAR';
const NUMBER_TO_TEXT = 'N2T';
const TEXT_CSV = 'TCSV';
const TEXT_FETCH = 'FETCH';
const TEXT_TYPES = [
    TEXT_VALUE,
    TEXT_LIST_VALUE,
    TEXT,
    TEXT_LENGTH,
    TEXT_TRIM,
    TEXT_SUBSTRING,
    TEXT_JOIN,
    TEXT_REPLACE,
    TEXT_CHAR,
    NUMBER_TO_TEXT,
    TEXT_CSV,
    TEXT_FETCH
];
const COLOR_VALUE = 'COL#';
const COLOR = 'COL';
const VALID_COLOR = 'CVAL';
const CORRECT_COLOR = 'CCOR';
const COLOR_CONTRAST = 'CCNT';
const COLORBLIND = 'BLND';
const COLOR_INTERPOLATE = 'CLERP';
const COLOR_BLEND = 'CBLND';
const COLOR_TYPES = [
    COLOR_VALUE,
    COLOR,
    CORRECT_COLOR,
    COLORBLIND,
    COLOR_INTERPOLATE,
    COLOR_BLEND
];
const FILL_VALUE = 'FILL#';
const FILL = 'FILL';
const FILL_TYPES = [FILL_VALUE, FILL];
const STROKE_VALUE = 'STRK#';
const STROKE = 'STRK';
const STROKE_TYPES = [STROKE_VALUE, STROKE];
const COLOR_STOP_VALUE = 'CSTOP#';
const COLOR_STOP = 'CSTOP';
const GRADIENT_VALUE = 'GRAD#';
const GRADIENT = 'GRAD';
const GRADIENT_TYPES = [GRADIENT_VALUE, GRADIENT];
const COLOR_STYLE = 'CSTL';
const SHAPE_VALUE = 'SHP#'; // abstract placeholder
const RECTANGLE_VALUE = 'RECT#';
const RECTANGLE = 'RECT';
const RECTANGLE_TYPES = [RECTANGLE_VALUE, RECTANGLE];
const LINE_VALUE = 'LINE#';
const LINE = 'LINE';
const LINE_TYPES = [LINE_VALUE, LINE];
const ELLIPSE_VALUE = 'ELPS#';
const ELLIPSE = 'ELPS';
const ELLIPSE_TYPES = [ELLIPSE_VALUE, ELLIPSE];
const POLYGON_VALUE = 'POLY#';
const POLYGON = 'POLY';
const POLYGON_TYPES = [POLYGON_VALUE, POLYGON];
const STAR_VALUE = 'STAR#';
const STAR = 'STAR';
const STAR_TYPES = [STAR_VALUE, STAR];
const TEXTSHAPE_VALUE = 'TXTS#';
const TEXTSHAPE = 'TXTS';
const TEXTSHAPE_TYPES = [TEXTSHAPE_VALUE, TEXTSHAPE];
const MOVE = 'MOVE';
const ROTATE = 'ROT';
const SCALE = 'SCALE';
const SHAPE_VALUES = [
    SHAPE_VALUE,
    SHAPE_LIST_VALUE,
    RECTANGLE_VALUE,
    LINE_VALUE,
    ELLIPSE_VALUE,
    POLYGON_VALUE,
    STAR_VALUE,
    TEXTSHAPE_VALUE
];
const SHAPE_TYPES = [
    ...SHAPE_VALUES,
    ...RECTANGLE_TYPES,
    ...LINE_TYPES,
    ...ELLIPSE_TYPES,
    ...POLYGON_TYPES,
    ...STAR_TYPES,
    ...TEXTSHAPE_TYPES,
    MOVE,
    ROTATE,
    SCALE
];
const ALL_VALUES = [
    LIST_VALUE,
    NUMBER_LIST_VALUE,
    TEXT_LIST_VALUE,
    SHAPE_LIST_VALUE,
    NUMBER_VALUE,
    TEXT_VALUE,
    COLOR_VALUE,
    FILL_VALUE,
    STROKE_VALUE,
    COLOR_STOP_VALUE,
    GRADIENT_VALUE,
    SHAPE_VALUE,
    RECTANGLE_VALUE,
    LINE_VALUE,
    ELLIPSE_VALUE,
    POLYGON_VALUE,
    STAR_VALUE,
    TEXTSHAPE_VALUE
];
// const ALL_TYPES =
// [
//     ...FLOW_TYPES,
//     ...NUMBER_TYPES,
//     ...TEXT_TYPES,
//     ...COLOR_TYPES,
//     ...FILL_TYPES,
//     ...STROKE_TYPES,
//     ...GRADIENT_TYPES,
//     COLOR_STYLE,
//     ...SHAPE_TYPES
// ];
const GROUP_NODE = 'GROUP';
const GROUP_PARAM = 'GPARAM';
const GROUP_TYPES = [
    GROUP_NODE,
    GROUP_PARAM
];
const COMMENT = 'CMNT';
const ACTIVE = 'ACT';
const BEFORE_ACTIVE = 'BEF';
const DISABLED = 'DIS';
const NOCACHE = 'NOC';
const PARAM = 'PARAM'; // nodeId paramId
const LOG = 'LOG';
const GRAPH = 'GRAPH';
const MATH_OPS = [
    [NUMBER_SUBTRACT, '−'],
    [NUMBER_ADD, '+'],
    [NUMBER_MODULO, '%'],
    [NUMBER_DIVIDE, '/'],
    [NUMBER_MULTIPLY, '×'],
    [NUMBER_EXPONENT, 'e<sup>x</sup>']
];
const BOOLEAN_NOT = 0;
const BOOLEAN_AND = 1;
const BOOLEAN_OR = 2;
const BOOLEAN_XOR = 3;
const BOOLEAN_OPS = [
    [BOOLEAN_NOT, 'not'],
    [BOOLEAN_XOR, 'xor'],
    [BOOLEAN_OR, 'or'],
    [BOOLEAN_AND, 'and']
];
const CONDITION_LESS = 0;
const CONDITION_LESS_OR_EQUAL = 1;
const CONDITION_NOT_EQUAL = 2;
const CONDITION_EQUAL = 3;
const CONDITION_GREATER_OR_EQUAL = 4;
const CONDITION_GREATER = 5;
const CONDITION_OPS = [
    [CONDITION_LESS, '<'],
    [CONDITION_LESS_OR_EQUAL, '≤'],
    [CONDITION_NOT_EQUAL, '≠'],
    [CONDITION_EQUAL, '='],
    [CONDITION_GREATER_OR_EQUAL, '≥'],
    [CONDITION_GREATER, '>']
];
const TRIG_SIN = 0;
const TRIG_COS = 1;
const TRIG_TAN = 2;
const TRIG_OPS = [
    [TRIG_SIN, 'sin'],
    [TRIG_COS, 'cos'],
    [TRIG_TAN, 'tan']
];
const EMPTY_ACTION = 'EMPTY';
const CONNECT_ACTION = 'CONNECT';
const CREATE_ACTION = 'CREATE';
const CREATE_INSERT_ACTION = 'CREATE_INSERT';
const DELETE_ACTION = 'DELETE';
const DISCONNECT_ACTION = 'DISCONNECT';
const LINK_STYLE_ACTION = 'LINK_STYLE';
const MAKE_ACTIVE_ACTION = 'MAKE_ACTIVE';
const PASTE_ACTION = 'PASTE';
const RECONNECT_ACTION = 'RECONNECT';
const REMOVE_ACTION = 'REMOVE';
const RENAME_ACTION = 'RENAME';
const REORDER_INPUTS_ACTION = 'REORDER_INPUTS';
const REORDER_CONNECTIONS_ACTION = 'REORDER_CONNECTIONS';
const SELECT_ACTION = 'SELECT';
const SELECT_MOVE_ACTION = 'SELECT_MOVE';
const SET_PARAM_VALUE_ACTION = 'SET_PARAM_VALUE';
const SET_PARAM_SETTING_ACTION = 'SET_PARAM_SETTING';
const SET_NODE_RECT_ACTION = 'SET_NODE_RECT';
const TOGGLE_DISABLE_ACTION = 'TOGGLE_DISABLE';
const TOGGLE_SYMBOL_ACTION = 'TOGGLE_SYMBOL';
const TOGGLE_PARAM_HEADER_ACTION = 'TOGGLE_PARAM_HEADER';
const SET_CURRENT_GRAPH_ACTION = 'SET_CURRENT_GRAPH';
const CREATE_PAGE_ACTION = 'CREATE_PAGE';
const DELETE_PAGE_ACTION = 'DELETE_PAGE';
const BLEND_NORMAL = 'BNORM';
const BLEND_DARKEN = 'BDARK';
const BLEND_MULTIPLY = 'BMULT';
const BLEND_COLOR_BURN = 'BBURN';
const BLEND_LIGNTEN = 'BLITE';
const BLEND_SCREEN = 'BSCRN';
const BLEND_COLOR_DODGE = 'BDODG';
const BLEND_OVERLAY = 'BOVER';
const BLEND_SOFT_LIGHT = 'BSOFT';
const BLEND_HARD_LIGHT = 'BHARD';
const BLEND_DIFFERENCE = 'BDIFF';
const BLEND_EXCLUSION = 'BEXCL';
const BLEND_HUE = 'BHUE';
const BLEND_SATURATION = 'BSAT';
const BLEND_COLOR = 'BCOL';
const BLEND_LUMINOSITY = 'BLUM';
const BlendModes = [
    [BLEND_NORMAL, 'normal'],
    [BLEND_DARKEN, 'darken'],
    [BLEND_MULTIPLY, 'multiply'],
    [BLEND_COLOR_BURN, 'color burn'],
    [BLEND_LIGNTEN, 'lighten'],
    [BLEND_SCREEN, 'screen'],
    [BLEND_COLOR_DODGE, 'color dodge'],
    [BLEND_OVERLAY, 'overlay'],
    [BLEND_SOFT_LIGHT, 'soft light'],
    [BLEND_HARD_LIGHT, 'hard light'],
    [BLEND_DIFFERENCE, 'difference'],
    [BLEND_EXCLUSION, 'exclusion'],
    [BLEND_HUE, 'hue'],
    [BLEND_SATURATION, 'saturation'],
    [BLEND_COLOR, 'color'],
    [BLEND_LUMINOSITY, 'luminosity']
];
const base32chars = '12345679ABCDEFGHJKLMNPQRSTUVWXYZ';
function arrayToBase32(array, chars = base32chars) {
    let base32 = '';
    let len = array.length;
    let i = 0;
    while (len > 0) {
        if (len >= 5) {
            const a0 = array[i], a1 = array[i + 1], a2 = array[i + 2], a3 = array[i + 3], a4 = array[i + 4];
            base32 += chars[(a0 & 0xF8) >>> 3];
            base32 += chars[((a0 & 0x07) << 2) | ((a1 & 0xC0) >>> 6)];
            base32 += chars[(a1 & 0x3E) >>> 1];
            base32 += chars[((a1 & 0x01) << 4) | ((a2 & 0xF0) >>> 4)];
            base32 += chars[((a2 & 0x0F) << 1) | ((a3 & 0x80) >>> 7)];
            base32 += chars[(a3 & 0x7C) >>> 2];
            base32 += chars[((a3 & 0x03) << 3) | ((a4 & 0xE0) >>> 5)];
            base32 += chars[(a4 & 0x1F)];
        }
        else if (len == 4) {
            const a0 = array[i], a1 = array[i + 1], a2 = array[i + 2], a3 = array[i + 3];
            base32 += chars[(a0 & 0xF8) >>> 3];
            base32 += chars[((a0 & 0x07) << 2) | ((a1 & 0xC0) >>> 6)];
            base32 += chars[(a1 & 0x3E) >>> 1];
            base32 += chars[((a1 & 0x01) << 4) | ((a2 & 0xF0) >>> 4)];
            base32 += chars[((a2 & 0x0F) << 1) | ((a3 & 0x80) >>> 7)];
            base32 += chars[(a3 & 0x7C) >>> 2];
            base32 += chars[((a3 & 0x03) << 3)];
        }
        else if (len == 3) {
            const a0 = array[i], a1 = array[i + 1], a2 = array[i + 2];
            base32 += chars[(a0 & 0xF8) >>> 3];
            base32 += chars[((a0 & 0x07) << 2) | ((a1 & 0xC0) >>> 6)];
            base32 += chars[(a1 & 0x3E) >>> 1];
            base32 += chars[((a1 & 0x01) << 4) | ((a2 & 0xF0) >>> 4)];
            base32 += chars[((a2 & 0x0F) << 1)];
        }
        else if (len == 2) {
            const a0 = array[i], a1 = array[i + 1];
            base32 += chars[(a0 & 0xF8) >>> 3];
            base32 += chars[((a0 & 0x07) << 2) | ((a1 & 0xC0) >>> 6)];
            base32 += chars[(a1 & 0x3E) >>> 1];
            base32 += chars[((a1 & 0x01) << 4)];
        }
        else if (len == 1) {
            const a0 = array[i];
            base32 += chars[(a0 & 0xF8) >>> 3];
            base32 += chars[((a0 & 0x07) << 2)];
        }
        i += 5;
        len -= 5;
    }
    return base32;
}
function base32toArray(base32, chars = base32chars) {
    const array = [];
    let len = base32.length;
    let c = 0;
    while (len > 0) {
        if (len >= 8) {
            const c0 = chars.indexOf(base32[c]), c1 = chars.indexOf(base32[c + 1]), c2 = chars.indexOf(base32[c + 2]), c3 = chars.indexOf(base32[c + 3]), c4 = chars.indexOf(base32[c + 4]), c5 = chars.indexOf(base32[c + 5]), c6 = chars.indexOf(base32[c + 6]), c7 = chars.indexOf(base32[c + 7]);
            array.push((c0 << 3) | ((c1 & 0x1C) >>> 2));
            array.push(((c1 & 0x03) << 6) | (c2 << 1) | ((c3 & 0x10) >>> 4));
            array.push(((c3 & 0x0F) << 4) | ((c4 & 0x1E) >>> 1));
            array.push(((c4 & 0x01) << 7) | (c5 << 2) | ((c6 & 0x18) >>> 3));
            array.push(((c6 & 0x07) << 5) | c7);
        }
        else if (len == 7) {
            const c0 = chars.indexOf(base32[c]), c1 = chars.indexOf(base32[c + 1]), c2 = chars.indexOf(base32[c + 2]), c3 = chars.indexOf(base32[c + 3]), c4 = chars.indexOf(base32[c + 4]), c5 = chars.indexOf(base32[c + 5]), c6 = chars.indexOf(base32[c + 6]);
            array.push((c0 << 3) | ((c1 & 0x1C) >>> 2));
            array.push(((c1 & 0x03) << 6) | (c2 << 1) | ((c3 & 0x10) >>> 4));
            array.push(((c3 & 0x0F) << 4) | ((c4 & 0x1E) >>> 1));
            array.push(((c4 & 0x01) << 7) | (c5 << 2) | ((c6 & 0x18) >>> 3));
        }
        else if (len == 5) {
            const c0 = chars.indexOf(base32[c]), c1 = chars.indexOf(base32[c + 1]), c2 = chars.indexOf(base32[c + 2]), c3 = chars.indexOf(base32[c + 3]), c4 = chars.indexOf(base32[c + 4]);
            array.push((c0 << 3) | ((c1 & 0x1C) >>> 2));
            array.push(((c1 & 0x03) << 6) | (c2 << 1) | ((c3 & 0x10) >>> 4));
            array.push(((c3 & 0x0F) << 4) | ((c4 & 0x1E) >>> 1));
        }
        else if (len == 4) {
            const c0 = chars.indexOf(base32[c]), c1 = chars.indexOf(base32[c + 1]), c2 = chars.indexOf(base32[c + 2]), c3 = chars.indexOf(base32[c + 3]);
            array.push((c0 << 3) | ((c1 & 0x1C) >>> 2));
            array.push(((c1 & 0x03) << 6) | (c2 << 1) | ((c3 & 0x10) >>> 4));
        }
        else if (len == 2) {
            const c0 = chars.indexOf(base32[c]), c1 = chars.indexOf(base32[c + 1]);
            array.push((c0 << 3) | ((c1 & 0x1C) >>> 2));
        }
        c += 8;
        len -= 8;
    }
    return array;
}
function logSavedNode(nodeKey, darkMode) {
    const log = formatSavedNodeJson(figGetPageData(nodeKey, false));
    if (darkMode) {
        console.log('%c%s\n%c%s', 'background: #fa24; color: white;', noNodeTag(nodeKey), 'background: #fa44; color: #edc;', log);
    }
    else {
        console.log('%c%s\n%c%s', 'background: #fdb; color: black;', noNodeTag(nodeKey), 'background: #fed; color: black;', log);
    }
}
function formatSavedNodeJson(json) {
    let formJson = json
        .replace('{\n', '')
        .replace('\n}', '')
        .replace('[\n' + HTAB, '')
        .replace('\n' + HTAB + ']', '')
        .split(HTAB + '"params":\n').join('') // have to do .split().join() because there's no .replace() in TS
        .split('": "').join(': ')
        .split('", "').join(': ')
        .split(HTAB + '"').join(HTAB)
        .split(HTAB + HTAB + '["').join(HTAB + HTAB)
        .split('",\n').join('\n')
        .split('"\n').join('\n')
        .split('"],\n').join('\n');
    if (formJson[formJson.length - 1] == '"')
        formJson = formJson.substring(0, formJson.length - 1);
    if (formJson.substring(formJson.length - 2) == '"]')
        formJson = formJson.substring(0, formJson.length - 2);
    return formJson;
}
function formatSavedDataJson(json) {
    let formJson = json
        .replace('{\n', '')
        .replace('\n}', '')
        .replace('[\n' + HTAB, '')
        .replace('\n' + HTAB + ']', '');
    return formJson;
}
function logSavedConn(conn, darkMode) {
    const strConn = connToString(conn, true);
    if (darkMode) {
        console.log('%c%s', 'background: #4f44; color: #ded', strConn);
    }
    else {
        console.log('%c%s', 'background: #cfc; color: black;', strConn);
    }
}
//const MAX_NODES   = 0x10000;
//const objNodes    = new Array(MAX_NODES).fill(null);
//var   minNodeId   = Number.MAX_SAFE_INTEGER;
//var   maxNodeId   = Number.MIN_SAFE_INTEGER;
//figma.on('selectionchange', figOnSelectionChange);
figma.on('documentchange', figOnDocumentChange);
figma.on('close', figOnPluginClose);
figma.showUI(__html__, {
    visible: false,
    themeColors: true
});
// figma.currentPage
//     .getPluginDataKeys()
//     .forEach(k => figma.currentPage.setPluginData(k, figma.currentPage.getPluginData(k).replace('\\', '\\\\')));
function figStartGenerator() {
    (function () {
        return __awaiter(this, void 0, void 0, function* () {
            let productKey = yield figLoadLocal('productKey');
            if (productKey == null)
                productKey = '';
            let _wndWidth = yield figma.currentPage.getPluginData(figma.currentUser.id + ',windowWidth');
            let _wndHeight = yield figma.currentPage.getPluginData(figma.currentUser.id + ',windowHeight');
            let wndWidth;
            let wndHeight;
            if (_wndWidth === NULL) {
                wndWidth = 800;
                figma.currentPage.setPluginData(figma.currentUser.id + ',windowWidth', _wndWidth.toString());
            }
            else
                wndWidth = parseInt(_wndWidth);
            if (_wndHeight === NULL) {
                wndHeight = 600;
                figma.currentPage.setPluginData(figma.currentUser.id + ',windowHeight', _wndHeight.toString());
            }
            else
                wndHeight = parseInt(_wndHeight);
            figma.ui.resize(Math.max(0, wndWidth), Math.max(0, wndHeight));
            figma.ui.show();
            const fonts = yield figma.listAvailableFontsAsync();
            // console.log('figma fonts =', fonts);
            figPostMessageToUi({
                cmd: 'uiReturnFigStartGenerator',
                currentUser: figma.currentUser,
                productKey: productKey,
                viewportRect: figma.viewport.bounds,
                fonts: fonts
            });
        });
    })();
}
function figRestartGenerator() {
    figma.showUI(__html__, {
        visible: false,
        themeColors: true
    });
}
var figObjectArrays = new Array(); // [ {nodeId, [objects]} ]
var figStyleArrays = new Array(); // [ {nodeId, [styles]}  ]
function figDeleteObjectsFromNodeIds(nodeIds) {
    figObjectArrays = figObjectArrays.filter(a => !nodeIds.includes(a.nodeId));
}
function figDeleteObjectsExcept(nodeIds, ignoreObjects) {
    for (let i = figObjectArrays.length - 1; i >= 0; i--) {
        const objArray = figObjectArrays[i];
        if (!nodeIds.includes(objArray.nodeId))
            continue;
        for (let j = objArray.objects.length - 1; j >= 0; j--) {
            const obj = objArray.objects[j];
            if (!ignoreObjects.find(o => obj.name == makeObjectName(o))) {
                obj.remove();
                removeFromArray(objArray.objects, obj);
            }
        }
        if (isEmpty(objArray.objects))
            removeFromArray(figObjectArrays, objArray);
    }
}
function figDeleteAllObjects() {
    for (const obj of figma.currentPage.children)
        if (!!obj.getPluginData('id'))
            obj.remove();
}
function figDeleteStylesFromNodeIds(nodeIds, mustDelete) {
    // styles are deleted first
    const paintStyles = figma.getLocalPaintStyles();
    figma.currentPage
        .findAll(o => nodeIds.includes(o.getPluginData('nodeId')))
        .forEach(o => o.remove());
    paintStyles
        .filter(s => nodeIds.includes(s.getPluginData('nodeId')))
        //            && !parseBool(s.getPluginData('existing')))
        .forEach(s => {
        const nodeId = s.getPluginData('nodeId');
        const existing = parseBool(s.getPluginData('existing'));
        if (!existing) {
            s.remove();
        }
        else if (mustDelete) {
            removeFromArrayWhere(figStyleArrays, a => a.nodeId == nodeId);
            s.setPluginData('type', NULL);
            s.setPluginData('nodeId', NULL);
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
function figOnDocumentChange(e) {
    for (const change of e.documentChanges) {
        switch (change.type) {
            case 'STYLE_CREATE':
                // this is for undoing style deletion in Figma,
                // when the style comes back it shouldn't be like before
                if (!change.style)
                    break;
                if (!styleChangingFromGenerator) {
                    change.style.setPluginData('type', NULL);
                    change.style.setPluginData('nodeId', NULL);
                    change.style.setPluginData('existing', NULL);
                }
                break;
            case 'STYLE_PROPERTY_CHANGE':
                {
                    if (!change.style)
                        break;
                    if (!styleChangingFromGenerator) {
                        const msg = {
                            cmd: 'uiStylePropertyChange',
                            styleId: cleanStyleId(change.id),
                            properties: change.properties,
                            name: '',
                            paints: []
                        };
                        for (const prop of change.properties) {
                            switch (prop) {
                                case 'name':
                                    msg.name = change.style.name;
                                    break;
                                case 'paint':
                                    msg.paints = change.style.paints;
                                    break;
                            }
                        }
                        figPostMessageToUi(msg);
                    }
                    break;
                }
            case 'STYLE_DELETE':
                figPostMessageToUi({
                    cmd: 'uiStyleDelete',
                    styleId: change.id
                });
                break;
        }
    }
    styleChangingFromGenerator = false;
}
function figOnPluginClose() {
    figDeleteAllObjects();
}
// from UI <--
///////////////////////////////////////////////////////////////////////////////////////////////////
figma.ui.onmessage = function (msg) {
    msg = JSON.parse(msg);
    switch (msg.cmd) {
        case 'figStartGenerator':
            figStartGenerator();
            break;
        case 'figRestartGenerator':
            figRestartGenerator();
            break;
        case 'figDockWindowNormal':
            figDockWindow('normal');
            break;
        case 'figDockWindowMaximize':
            figDockWindow('maximize');
            break;
        case 'figDockWindowTop':
            figDockWindow('top');
            break;
        case 'figDockWindowLeft':
            figDockWindow('left');
            break;
        case 'figDockWindowRight':
            figDockWindow('right');
            break;
        case 'figDockWindowBottom':
            figDockWindow('bottom');
            break;
        case 'figGetMousePosition':
            figGetMousePosition(msg.clientPosition);
            break;
        //case 'figPositionWindow':                   figPositionWindow                    (msg.x, msg.y);                                break; 
        case 'figResizeWindow':
            figResizeWindow(msg.width, msg.height);
            break;
        case 'figSetWindowRect':
            figSetWindowRect(msg.x, msg.y, msg.width, msg.height);
            break;
        case 'figNotify':
            figNotifyMsg(msg);
            break;
        case 'figGetLocalData':
            figGetLocalData(msg.key);
            break;
        case 'figSetLocalData':
            figSetLocalData(msg.key, msg.value);
            break;
        case 'figClearAllLocalData':
            figClearAllLocalData();
            break;
        case 'figGetPageData':
            figGetPageData(msg.key);
            break;
        case 'figSetPageData':
            figSetPageData(msg.key, msg.value);
            break;
        case 'figSavePages':
            figSavePages(msg.pageIds, msg.pageJson, msg.currentPageId);
            break;
        case 'figLoadNodesAndConns':
            figLoadNodesAndConns(msg.dataMode);
            break;
        case 'figSaveNodes':
            figSaveNodes(msg.nodeIds, msg.nodeJson);
            break;
        case 'figRemoveConnsToNodes':
            figRemoveConnsToNodes(msg.nodeIds);
            break;
        case 'figRemoveSavedNodesAndConns':
            figRemoveSavedNodesAndConns(msg.nodeIds);
            break;
        case 'figRemoveAllSavedNodesAndConns':
            figRemoveAllSavedNodesAndConns();
            break;
        case 'figLogAllSavedNodesAndConns':
            figLogAllSavedNodesAndConns(msg.darkMode);
            break;
        case 'figLogAllSavedNodes':
            figLogAllSavedNodes(msg.darkMode);
            break;
        case 'figLogAllSavedConns':
            figLogAllSavedConns(msg.darkMode);
            break;
        case 'figLogAllSavedPageKeys':
            figLogAllSavedPageKeys(msg.darkMode);
            break;
        case 'figLogAllSavedConnKeys':
            figLogAllSavedConnKeys(msg.darkMode);
            break;
        case 'figLogAllLocalData':
            figLogAllLocalData(msg.darkMode);
            break;
        case 'figRemoveSavedPage':
            figRemoveSavedPage(msg.pageId);
            break;
        case 'figRemoveAllSavedPages':
            figRemoveAllSavedPages();
            break;
        case 'figSaveConnection':
            figSaveConnection(msg.key, msg.json);
            break;
        case 'figSaveConnections':
            figSaveConnections(msg.keys, msg.json);
            break;
        case 'figUpdateSavedConnections':
            figUpdateSavedConnections(msg.curKeys, msg.newKeys, msg.json);
            break;
        case 'figDeleteSavedConnection':
            figDeleteSavedConnection(msg.key);
            break;
        case 'figRemoveAllSavedConnections':
            figRemoveAllSavedConnections();
            break;
        case 'figDeleteSavedConnectionsToNode':
            figDeleteSavedConnectionsToNode(msg.nodeId);
            break;
        case 'figDeleteSavedConnectionsFromNode':
            figDeleteSavedConnectionsFromNode(msg.nodeId);
            break;
        case 'figRemovePluginDataFromAllLocalStyles':
            figRemovePluginDataFromAllLocalStyles();
            break;
        case 'figGetAllLocalColorStyles':
            figGetAllLocalColorStyles(msg.nodeId, msg.px, msg.py);
            break;
        case 'figLinkNodeToExistingColorStyle':
            figLinkNodeToExistingColorStyle(msg.nodeId, msg.styleId);
            break;
        // case 'figUpdateViewportRect':                 figPostMessageToUi({cmd: 'uiReturnUpdateViewportRect', viewportRect: figma.viewport.bounds }); break;
        case 'figUpdateObjectsAndStyles':
            figUpdateObjects(msg);
            figUpdateStyles(msg);
            break;
        case 'figDeleteObjectsAndStyles':
            figDeleteObjectsFromNodeIds(msg.nodeIds);
            figDeleteStylesFromNodeIds(msg.nodeIds, msg.mustDelete);
            break;
        case 'figDeleteObjectsExcept':
            figDeleteObjectsExcept(msg.nodeIds, msg.ignoreObjects);
            break;
        case 'figTriggerUndo':
            figma.triggerUndo();
            break;
        case 'figCommitUndo':
            figma.commitUndo();
            break;
        // case 'figValidateLicense':
        //     figValidateLicense(msg.license);
        //     break;
    }
    figPostMessageToUi({
        cmd: 'uiEndFigMessage',
        msgCmd: msg.cmd
    });
};
///////////////////////////////////////////////////////////////////////////////////////////////////
// to UI -->
///////////////////////////////////////////////////////////////////////////////////////////////////
function figPostMessageToUi(msg) {
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
function figCreateObject(objects, genObj) {
    let figObj;
    switch (genObj.type) {
        case RECTANGLE:
            figObj = figCreateRect(genObj);
            break;
        case LINE:
            figObj = figCreateLine(genObj);
            break;
        case ELLIPSE:
            figObj = figCreateEllipse(genObj);
            break;
        case POLYGON:
            figObj = figCreatePolygon(genObj);
            break;
        case STAR:
            figObj = figCreateStar(genObj);
            break;
        case TEXTSHAPE:
            figObj = figCreateText(genObj);
            break;
    }
    console.assert(!!figObj, 'no Figma object created');
    figObj.setPluginData('id', genObj.objectId);
    figObj.setPluginData('type', genObj.type);
    figObj.setPluginData('nodeId', genObj.nodeId);
    //figObj.setPluginData('nodeName', genObj.nodeName);
    objects.push(figObj);
    figma.currentPage.appendChild(figObj);
}
function figUpdateObjects(msg) {
    let curNodeId = NULL;
    let figObjects = null;
    for (const genObj of msg.objects) {
        if (genObj.nodeId != curNodeId) {
            curNodeId = genObj.nodeId;
            figObjects = figObjectArrays.find(a => a.nodeId == genObj.nodeId);
            if (!figObjects) {
                figObjectArrays.push(figObjects =
                    {
                        nodeId: genObj.nodeId,
                        existing: genObj.existing,
                        objects: []
                    });
            }
        }
        const figObj = figObjects.objects.find(o => o.name == makeObjectName(genObj));
        if (isValid(figObj)
            && figObj.removed)
            removeFrom(figObjects.objects, figObj);
        if (!isValid(figObj)
            || figObj.removed) // no existing object, create new object
         {
            figCreateObject(figObjects.objects, genObj);
        }
        else if (figObj.getPluginData('type') == genObj.type.toString()) // update existing object
         {
            figUpdateObject(figObj, genObj);
        }
        else // delete existing object, create new object
         {
            figObj.remove();
            figCreateObject(figObjects.objects, genObj);
        }
    }
}
function figUpdateObject(figObj, genObj) {
    switch (genObj.type) {
        case RECTANGLE:
            figUpdateRect(figObj, genObj);
            break;
        case LINE:
            figUpdateLine(figObj, genObj);
            break;
        case ELLIPSE:
            figUpdateEllipse(figObj, genObj);
            break;
        case POLYGON:
            figUpdatePolygon(figObj, genObj);
            break;
        case STAR:
            figUpdateStar(figObj, genObj);
            break;
        case TEXTSHAPE:
            figUpdateText(figObj, genObj);
            break;
    }
}
function makeObjectName(obj) {
    return OBJECT_PREFIX + obj.nodeId
        + (obj.objectId != '' ? ' ' + obj.objectId : '');
}
///////////////////////////////////////////////////////////////////////////////////////////////////
function genRectIsValid(genRect) {
    return genRect.x != null && !isNaN(genRect.x)
        && genRect.y != null && !isNaN(genRect.y)
        && genRect.width != null && !isNaN(genRect.width)
        && genRect.height != null && !isNaN(genRect.height)
        && genRect.angle != null && !isNaN(genRect.angle)
        && genRect.round != null && !isNaN(genRect.round);
}
function figCreateRect(obj) {
    //console.log(obj);
    const rect = figma.createRectangle();
    rect.name = makeObjectName(obj);
    if (!genRectIsValid(obj))
        return rect;
    rect.x = obj.x;
    rect.y = obj.y;
    rect.resize(Math.max(0.01, obj.width), Math.max(0.01, obj.height));
    rect.rotation = obj.angle;
    rect.cornerRadius = obj.round;
    setObjectFills(rect, obj);
    setObjectStrokes(rect, obj);
    return rect;
}
function figUpdateRect(figRect, genRect) {
    if (!genRectIsValid(genRect))
        return;
    figRect.x = genRect.x;
    figRect.y = genRect.y;
    if (figRect.width != genRect.width
        || figRect.height != genRect.height) {
        figRect.resize(Math.max(0.01, genRect.width), Math.max(0.01, genRect.height));
    }
    figRect.rotation = genRect.angle;
    figRect.cornerRadius = genRect.round;
    setObjectFills(figRect, genRect);
    setObjectStrokes(figRect, genRect);
}
///////////////////////////////////////////////////////////////////////////////////////////////////
function genLineIsValid(genLine) {
    return genLine.x != null && !isNaN(genLine.x)
        && genLine.y != null && !isNaN(genLine.y)
        && genLine.width != null && !isNaN(genLine.width)
        && genLine.angle != null && !isNaN(genLine.angle);
}
function figCreateLine(obj) {
    //console.log(obj);
    const line = figma.createLine();
    line.name = makeObjectName(obj);
    if (!genLineIsValid(obj))
        return line;
    line.x = obj.x;
    line.y = obj.y;
    line.resize(Math.max(0.01, obj.width), 0);
    line.rotation = obj.angle;
    setObjectFills(line, obj);
    setObjectStrokes(line, obj);
    return line;
}
function figUpdateLine(figLine, genLine) {
    if (!genLineIsValid(genLine))
        return;
    figLine.x = genLine.x;
    figLine.y = genLine.y;
    if (figLine.width != genLine.width)
        figLine.resize(Math.max(0.01, genLine.width), 0);
    figLine.rotation = genLine.angle;
    setObjectFills(figLine, genLine);
    setObjectStrokes(figLine, genLine);
}
///////////////////////////////////////////////////////////////////////////////////////////////////
function genEllipseIsValid(genEllipse) {
    return genEllipse.x != null && !isNaN(genEllipse.x)
        && genEllipse.y != null && !isNaN(genEllipse.y)
        && genEllipse.width != null && !isNaN(genEllipse.width)
        && genEllipse.height != null && !isNaN(genEllipse.height)
        && genEllipse.angle != null && !isNaN(genEllipse.angle);
}
function figCreateEllipse(obj) {
    //console.log(obj);
    const ellipse = figma.createEllipse();
    ellipse.name = makeObjectName(obj);
    if (!genEllipseIsValid(obj))
        return ellipse;
    ellipse.x = obj.x;
    ellipse.y = obj.y;
    ellipse.resize(Math.max(0.01, obj.width), Math.max(0.01, obj.height));
    ellipse.rotation = obj.angle;
    setObjectFills(ellipse, obj);
    setObjectStrokes(ellipse, obj);
    return ellipse;
}
function figUpdateEllipse(figEllipse, genEllipse) {
    if (!genEllipseIsValid(genEllipse))
        return;
    figEllipse.x = genEllipse.x;
    figEllipse.y = genEllipse.y;
    if (figEllipse.width != genEllipse.width
        || figEllipse.height != genEllipse.height) {
        figEllipse.resize(Math.max(0.01, genEllipse.width), Math.max(0.01, genEllipse.height));
    }
    figEllipse.rotation = genEllipse.angle;
    setObjectFills(figEllipse, genEllipse);
    setObjectStrokes(figEllipse, genEllipse);
}
///////////////////////////////////////////////////////////////////////////////////////////////////
function genPolyIsValid(genPoly) {
    return genPoly.x != null && !isNaN(genPoly.x)
        && genPoly.y != null && !isNaN(genPoly.y)
        && genPoly.width != null && !isNaN(genPoly.width)
        && genPoly.height != null && !isNaN(genPoly.height)
        && genPoly.angle != null && !isNaN(genPoly.angle)
        && genPoly.round != null && !isNaN(genPoly.round)
        && genPoly.corners != null && !isNaN(genPoly.corners);
}
function figCreatePolygon(obj) {
    //console.log(obj);
    const poly = figma.createPolygon();
    poly.name = makeObjectName(obj);
    if (!genPolyIsValid(obj))
        return poly;
    poly.x = obj.x;
    poly.y = obj.y;
    poly.resize(Math.max(0.01, obj.width), Math.max(0.01, obj.height));
    poly.rotation = obj.angle;
    poly.cornerRadius = obj.round;
    poly.pointCount = obj.corners;
    setObjectFills(poly, obj);
    setObjectStrokes(poly, obj);
    return poly;
}
function figUpdatePolygon(figPoly, genPoly) {
    if (!genPolyIsValid(genPoly))
        return;
    figPoly.x = genPoly.x;
    figPoly.y = genPoly.y;
    if (figPoly.width != genPoly.width
        || figPoly.height != genPoly.height) {
        figPoly.resize(Math.max(0.01, genPoly.width), Math.max(0.01, genPoly.height));
    }
    figPoly.rotation = genPoly.angle;
    figPoly.cornerRadius = genPoly.round;
    figPoly.pointCount = genPoly.corners;
    setObjectFills(figPoly, genPoly);
    setObjectStrokes(figPoly, genPoly);
}
///////////////////////////////////////////////////////////////////////////////////////////////////
function genStarIsValid(genStar) {
    return genStar.x != null && !isNaN(genStar.x)
        && genStar.y != null && !isNaN(genStar.y)
        && genStar.width != null && !isNaN(genStar.width)
        && genStar.height != null && !isNaN(genStar.height)
        && genStar.angle != null && !isNaN(genStar.angle)
        && genStar.round != null && !isNaN(genStar.round)
        && genStar.points != null && !isNaN(genStar.points)
        && genStar.convex != null && !isNaN(genStar.convex);
}
function figCreateStar(obj) {
    //console.log(obj);
    const star = figma.createStar();
    star.name = makeObjectName(obj);
    if (!genStarIsValid(obj))
        return star;
    star.x = obj.x;
    star.y = obj.y;
    star.resize(Math.max(0.01, obj.width), Math.max(0.01, obj.height));
    star.rotation = obj.angle;
    star.cornerRadius = obj.round;
    star.pointCount = obj.points;
    star.innerRadius = obj.convex / 100;
    setObjectFills(star, obj);
    setObjectStrokes(star, obj);
    return star;
}
function figUpdateStar(figStar, genStar) {
    if (!genStarIsValid(genStar))
        return;
    figStar.x = genStar.x;
    figStar.y = genStar.y;
    if (figStar.width != genStar.width
        || figStar.height != genStar.height) {
        figStar.resize(Math.max(0.01, genStar.width), Math.max(0.01, genStar.height));
    }
    figStar.rotation = genStar.angle;
    figStar.cornerRadius = genStar.round;
    figStar.pointCount = genStar.points;
    figStar.innerRadius = genStar.convex / 100;
    setObjectFills(figStar, genStar);
    setObjectStrokes(figStar, genStar);
}
///////////////////////////////////////////////////////////////////////////////////////////////////
function genTextIsValid(genText) {
    return genText.text != null
        && genText.x != null && !isNaN(genText.x)
        && genText.y != null && !isNaN(genText.y)
        && genText.width != null && !isNaN(genText.width)
        && genText.height != null && !isNaN(genText.height)
        && genText.angle != null && !isNaN(genText.angle)
        && genText.font != null && genText.font != NULL
        && genText.size != null && !isNaN(genText.size);
}
function figCreateText(obj) {
    const text = figma.createText();
    text.name = makeObjectName(obj);
    if (!genTextIsValid(obj))
        return text;
    const fontName = {
        family: obj.font,
        style: 'Regular'
    };
    (function () {
        return __awaiter(this, void 0, void 0, function* () {
            yield figma.loadFontAsync(fontName);
            text.fontName = fontName;
            text.fontSize = Math.max(1, obj.size);
            text.characters = obj.text;
            //setTextStyle(text, obj);
        });
    })();
    text.x = obj.x;
    text.y = obj.y;
    text.resize(Math.max(0.01, obj.width), Math.max(0.01, obj.height));
    text.rotation = obj.angle;
    setObjectFills(text, obj);
    setObjectStrokes(text, obj);
    return text;
}
function figUpdateText(figText, genText) {
    if (!genTextIsValid(genText))
        return;
    const fontName = {
        family: genText.font,
        style: 'Regular'
    };
    (function () {
        return __awaiter(this, void 0, void 0, function* () {
            yield figma.loadFontAsync(fontName);
            figText.fontName = fontName;
            figText.fontSize = Math.max(1, genText.size);
            figText.characters = genText.text;
            //setTextStyle(figText, genText);
        });
    })();
    figText.x = genText.x;
    figText.y = genText.y;
    if (figText.width != genText.width
        || figText.height != genText.height) {
        figText.resize(Math.max(0.01, genText.width), Math.max(0.01, genText.height));
    }
    figText.rotation = genText.angle;
    setObjectFills(figText, genText);
    setObjectStrokes(figText, genText);
}
function setTextStyle(figText, genText) {
    //switch (genText.style)
    //{
    //}
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
function getObjectFills(objFills) {
    const fills = [];
    for (const _fill of objFills) {
        const fill = _fill[1].split(' ');
        switch (_fill[0]) {
            case 'SOLID':
                {
                    const color = {
                        r: Math.min(Math.max(0, parseFloat(fill[0]) / 0xff), 1),
                        g: Math.min(Math.max(0, parseFloat(fill[1]) / 0xff), 1),
                        b: Math.min(Math.max(0, parseFloat(fill[2]) / 0xff), 1)
                    };
                    const opacity = Math.min(Math.max(0, parseFloat(fill[3]) / 100), 1);
                    if (!isNaN(color.r)
                        && !isNaN(color.g)
                        && !isNaN(color.b)
                        && !isNaN(opacity))
                        fills.push({
                            type: 'SOLID',
                            color: color,
                            opacity: opacity
                        });
                    break;
                }
        }
    }
    return fills;
}
function setObjectFills(obj, src) {
    if (!!src.fills
        && !isEmpty(src.fills))
        obj.fills = getObjectFills(src.fills);
    else
        obj.fills = [];
}
function setObjectStrokes(obj, src) {
    if (src.strokes != null
        && !isEmpty(src.strokes)) {
        obj.strokes = getObjectFills(src.strokes);
        obj.strokeWeight = Math.max(0, src.strokeWeight);
        obj.strokeAlign = src.strokeFit;
        obj.strokeJoin = src.strokeJoin;
        obj.strokeMiterLimit = Math.min(Math.max(0, src.strokeMiterLimit), 16);
    }
    else
        obj.strokes = [];
}
function figGetAllLocalColorStyles(nodeId, px, py) {
    const _styles = figma.getLocalPaintStyles();
    const styles = new Array();
    for (const _style of _styles) {
        const _nodeId = _style.getPluginData('nodeId');
        const _existing = _style.getPluginData('existing');
        const existing = !!_existing;
        const style = {
            id: _style.id,
            nodeId: _nodeId,
            name: _style.name,
            existing: existing,
            paints: new Array()
        };
        let onlyPaint = true;
        for (const _paint of _style.paints) {
            if (_paint.type == 'SOLID') {
                style.paints.push([
                    _paint.color.r,
                    _paint.color.g,
                    _paint.color.b,
                    _paint.opacity
                ]);
            }
            else {
                onlyPaint = false;
                break;
            }
        }
        if (onlyPaint)
            styles.push(style);
    }
    figPostMessageToUi({
        cmd: 'uiReturnFigGetAllLocalColorStyles',
        nodeId: nodeId,
        px: px,
        py: py,
        styles: JSON.stringify(styles)
    });
}
function figLinkNodeToExistingColorStyle(nodeId, styleId) {
    const localStyles = figma.getLocalPaintStyles();
    if (styleId != NULL)
        figLinkColorStyle(localStyles, nodeId, styleId);
    else
        figClearColorStyle(localStyles, nodeId);
}
function figLinkColorStyle(localStyles, nodeId, styleId, clearExisting = true) {
    const figStyles = figStyleArrays.find(a => a.nodeId == nodeId);
    if (figStyles
        && clearExisting)
        figClearColorStyle(localStyles, nodeId);
    const figStyle = localStyles.find(s => s.id == styleId);
    console.assert(!!figStyle, 'figStyle should be found here');
    figStyle.setPluginData('type', COLOR_STYLE);
    figStyle.setPluginData('nodeId', nodeId);
    figStyle.setPluginData('existing', boolToString(true));
    figStyleArrays.push({
        nodeId: nodeId,
        existing: true,
        styles: [figStyle]
    });
    return figStyle;
}
function figClearColorStyle(localStyles, nodeId) {
    const figStyle = localStyles.find(s => s.getPluginData('nodeId') == nodeId);
    //console.assert(!!figStyle, 'figStyle should be found here');
    if (figStyle) // could have been deleted
     {
        figStyle.setPluginData('type', NULL);
        figStyle.setPluginData('nodeId', NULL);
        figStyle.setPluginData('existing', NULL);
        removeFromArrayWhere(figStyleArrays, a => a.nodeId == nodeId);
    }
    return figStyle;
}
function figCreateColorStyle(styles, genStyle) {
    const figStyle = figma.createPaintStyle();
    figStyle.setPluginData('type', genStyle.type);
    figStyle.setPluginData('nodeId', genStyle.nodeId);
    figStyle.setPluginData('existing', boolToString(genStyle.existing));
    figStyle.name = genStyle.styleName;
    setStylePaints(figStyle, genStyle);
    styles.push(figStyle);
    figPostMessageToUi({
        cmd: 'uiSetStyleId',
        nodeId: genStyle.nodeId,
        styleId: figStyle.id
    });
    return figStyle;
}
function figUpdateStyles(msg) {
    let curNodeId = NULL;
    let figStyles;
    for (const genStyle of msg.styles) {
        if (genStyle.nodeId != curNodeId) {
            curNodeId = genStyle.nodeId;
            figStyles = figStyleArrays.find(a => a.nodeId == genStyle.nodeId);
            if (!figStyles) {
                figStyles = {
                    nodeId: genStyle.nodeId,
                    existing: genStyle.existing,
                    styles: []
                };
                figStyleArrays.push(figStyles);
            }
        }
        else
            figStyles = null;
        const figStyle = figStyles.styles[0];
        const localStyles = figma.getLocalPaintStyles();
        const localStyle = localStyles.find(s => s.getPluginData('nodeId') == genStyle.nodeId);
        if (isValid(figStyle)
            && !isValid(localStyle)) // removed
         {
            removeFrom(figStyles.styles, figStyle);
        }
        const existing = isValid(figStyle)
            && isValid(localStyle)
            && figStyle.getPluginData('existing');
        if (!isValid(figStyle)
            || !isValid(localStyle)) // no existing style, create new style
         {
            if (!existing) {
                styleChangingFromGenerator = true;
                figLinkNodeToExistingColorStyle(genStyle.nodeId, genStyle.id);
                //figCreateColorStyle(figStyles.styles, genStyle);
            }
        }
        else if (isValid(figStyle)
            && figStyle.getPluginData('type') == genStyle.type) // update existing style
         {
            styleChangingFromGenerator = true;
            figUpdateColorStyle(localStyle, genStyle);
        }
        // else // delete existing style, create new style
        // {
        //     if (!existing)
        //     {
        //         localStyle.remove();
        //         styleChangingFromGenerator = true;
        //         figCreateColorStyle(figStyles.styles, genStyle);
        //     }
        // }
    }
}
function figUpdateColorStyle(figStyle, genStyle) {
    setStylePaints(figStyle, genStyle);
    figStyle.name = genStyle.name;
}
function getStylePaints(stylePaints) {
    const paints = new Array();
    for (const _paint of stylePaints) {
        const fill = _paint[1].split(' ');
        switch (_paint[0]) {
            case 'SOLID':
                paints.push({
                    type: 'SOLID',
                    color: { r: Math.min(Math.max(0, parseFloat(fill[0]) / 0xff), 1),
                        g: Math.min(Math.max(0, parseFloat(fill[1]) / 0xff), 1),
                        b: Math.min(Math.max(0, parseFloat(fill[2]) / 0xff), 1) },
                    opacity: Math.min(Math.max(0, parseFloat(fill[3]) / 100), 1)
                });
                break;
        }
    }
    return paints;
}
function setStylePaints(style, src) {
    if (!!src.paints
        && !isEmpty(src.paints))
        style.paints = getStylePaints(src.paints);
    else
        style.paints = [];
}
function figLoadLocal(key) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield figma.clientStorage.getAsync(key);
    });
}
function figGetLocalData(key) {
    figma.clientStorage.getAsync(key).then(data => {
        figPostMessageToUi({
            cmd: 'uiReturnFigGetLocalData',
            key: key,
            value: data
        });
    });
}
function figSetLocalData(key, value) {
    figma.clientStorage.setAsync(key, value);
}
function figClearAllLocalData() {
    return __awaiter(this, void 0, void 0, function* () {
        const keys = yield figma.clientStorage.keysAsync();
        for (const key of keys)
            figma.clientStorage.deleteAsync(key);
    });
}
function figGetPageData(key, postToUi = true) {
    const data = figma.currentPage.getPluginData(key);
    if (postToUi) {
        figPostMessageToUi({
            cmd: 'uiReturnFigGetPageData',
            key: key,
            value: data
        });
    }
    return data;
}
function figSetPageData(key, value) {
    figClearPageData(key); // remove possible existing values first
    figma.currentPage.setPluginData(key, value);
}
function figClearPageData(key) {
    figma.currentPage.setPluginData(key, '');
}
function figLoadNodesAndConns(dataMode) {
    // const pageIds  = figma.currentPage.getPluginData('pages');
    const pageKeys = figma.currentPage.getPluginDataKeys().filter(k => isPageKey(k));
    const nodeKeys = figma.currentPage.getPluginDataKeys().filter(k => isNodeKey(k));
    const connKeys = figma.currentPage.getPluginDataKeys().filter(k => isConnKey(k));
    if (!dataMode)
        figMarkForLoading(nodeKeys, connKeys);
    const pages = pageKeys.map(k => figma.currentPage.getPluginData(k));
    const nodes = nodeKeys.map(k => figma.currentPage.getPluginData(k));
    const conns = connKeys.map(k => figma.currentPage.getPluginData(k));
    const pageOrder = figma.currentPage.getPluginData('pageOrder').split(',');
    const currentPageId = figma.currentPage.getPluginData('currentPageId');
    initPageStyles(nodes);
    const showAllColorSpaces = figma.currentPage.getPluginData('showAllColorSpaces');
    figPostMessageToUi({
        cmd: 'uiReturnFigLoadNodesAndConns',
        showAllColorSpaces: showAllColorSpaces,
        pageKeys: pageKeys,
        pageJson: pages,
        pageOrder: pageOrder,
        currentPageId: currentPageId,
        nodeKeys: nodeKeys,
        nodeJson: nodes,
        connKeys: connKeys,
        connJson: conns
    });
}
function initPageStyles(nodes) {
    figStyleArrays = [];
    const paintStyles = figma.getLocalPaintStyles();
    for (const _node of nodes) {
        const node = JSON.parse(_node);
        if (node.type == COLOR_STYLE) {
            const style = paintStyles.find(s => {
                const nodeId = s.getPluginData('nodeId');
                return nodeId == node.id;
            });
            if (style) {
                figStyleArrays.push({
                    nodeId: node.id,
                    existing: parseBool(node.existing),
                    styles: [style]
                });
            }
        }
    }
}
function figMarkForLoading(nodeKeys, connKeys) {
    const loadingFlag = '"loading": "true"';
    const not = '{\n';
    const set = '{\n' + HTAB + loadingFlag + ',\n';
    nodeKeys.forEach(k => figma.currentPage.setPluginData(k, figma.currentPage.getPluginData(k)
        .replace(set, not)
        .replace(not, set)));
    connKeys.forEach(k => figma.currentPage.setPluginData(k, figma.currentPage.getPluginData(k)
        .replace(set, not)
        .replace(not, set)));
}
function figSavePages(pageIds, pageJson, currentPageId) {
    for (let i = 0; i < pageIds.length; i++) {
        figSetPageData(pageNameForStorage(pageIds[i]), pageJson[i]);
    }
    figSetPageData('pageOrder', pageIds.join(','));
    figSetPageData('currentPageId', currentPageId);
}
function figSaveNodes(nodeIds, nodeJson) {
    for (let i = 0; i < nodeIds.length; i++) {
        figSetPageData(nodeNameForStorage(nodeIds[i]), nodeJson[i]);
    }
}
function figRemoveConnsToNodes(nodeIds) {
    const connKeys = figma.currentPage.getPluginDataKeys().filter(k => isConnKey(k));
    for (const key of connKeys) {
        const parts = noConnTag(key).split(' ');
        if (nodeIds.includes(parts[0])
            || nodeIds.includes(parts[2]))
            figClearPageData(key);
    }
}
function figRemoveSavedNodesAndConns(nodeIds) {
    figRemoveConnsToNodes(nodeIds);
    const nodeKeys = figma.currentPage.getPluginDataKeys().filter(k => isNodeKey(k)
        && nodeIds.includes(noNodeTag(k)));
    nodeKeys.forEach(k => figClearPageData(k));
}
function figRemoveAllSavedNodesAndConns() {
    const nodeKeys = figma.currentPage.getPluginDataKeys().filter(k => isNodeKey(k));
    const connKeys = figma.currentPage.getPluginDataKeys().filter(k => isConnKey(k));
    for (const key of nodeKeys)
        figClearPageData(key);
    for (const key of connKeys)
        figClearPageData(key);
}
function figLogAllSavedNodesAndConns(darkMode) {
    figLogAllSavedNodes(darkMode);
    figLogAllSavedConns(darkMode);
}
function figLogAllSavedNodes(darkMode) {
    figma.currentPage.getPluginDataKeys()
        .filter(k => isNodeKey(k))
        .forEach(k => logSavedNode(k, darkMode));
}
function figLogAllSavedConns(darkMode) {
    const connKeys = figma.currentPage.getPluginDataKeys()
        .filter(k => isConnKey(k));
    connKeys.sort((key1, key2) => {
        const p1 = noConnTag(key1).split(' ');
        const p2 = noConnTag(key2).split(' ');
        if (p1[2] != p2[2])
            return p1[2] < p2[2] ? -1 : 1;
        if (p1[3] != p2[3])
            return parseInt(p1[3]) - parseInt(p2[3]);
        if (p1[2] == p2[0])
            return -1;
        if (p2[2] == p1[0])
            return 1;
        return 0;
    });
    connKeys.forEach(k => logSavedConn(JSON.parse(figma.currentPage.getPluginData(k)), darkMode));
}
function figLogAllSavedPageKeys(darkMode) {
    const connKeys = figma.currentPage.getPluginDataKeys()
        .filter(k => isPageKey(k));
    connKeys.forEach(k => console.log('%c' + k, 'background: #fff; color: ' + (darkMode ? 'black' : 'white')));
    const pageOrder = figma.currentPage.getPluginData('pageOrder');
    console.log('%c' + pageOrder, 'background: #fff; color: ' + (darkMode ? 'black' : 'white'));
}
function figLogAllSavedConnKeys(darkMode) {
    const connKeys = figma.currentPage.getPluginDataKeys()
        .filter(k => isConnKey(k));
    connKeys.forEach(k => console.log('%c' + k, 'background: #dff; color: ' + (darkMode ? 'black' : 'white')));
}
function figLogAllLocalData(darkMode) {
    figma.clientStorage.keysAsync().then(keys => keys.forEach(k => figma.clientStorage.getAsync(k).then(val => console.log(k + ': ' + val))));
}
function figRemoveSavedPage(pageId) {
    figClearPageData(getPageKey(pageId));
    const pageOrder = figGetPageData('pageOrder').split(',');
    removeFromArrayWhere(pageOrder, id => id == pageId);
    figSetPageData('pageOrder', pageOrder.join(','));
}
function figRemoveAllSavedPages() {
    const pageKeys = figma.currentPage.getPluginDataKeys().filter(k => isPageKey(k));
    pageKeys.forEach(k => figClearPageData(k));
    figClearPageData('pageOrder');
}
function figSaveConnection(key, json) {
    figSetPageData(key, json);
}
function figSaveConnections(_keys, _json) {
    const keys = JSON.parse(_keys);
    const json = JSON.parse(_json);
    for (let i = 0; i < keys.length; i++)
        figSetPageData(keys[i], json[i]);
}
function figUpdateSavedConnections(_curKeys, _newKeys, _json) {
    const curKeys = JSON.parse(_curKeys);
    const newKeys = JSON.parse(_newKeys);
    const json = JSON.parse(_json);
    for (let i = 0; i < curKeys.length; i++) {
        figClearPageData(curKeys[i]);
        figSetPageData(newKeys[i], json[i]);
    }
}
function figDeleteSavedConnection(key) {
    figClearPageData(key);
}
function figRemoveAllSavedConnections() {
    const connKeys = figma.currentPage.getPluginDataKeys().filter(k => isConnKey(k));
    connKeys.forEach(k => figClearPageData(k));
}
function figDeleteSavedConnectionsToNode(nodeId) {
    const connKeys = figma.currentPage.getPluginDataKeys().filter(k => isConnKey(k));
    for (const key of connKeys) {
        const parts = key.split(' ');
        if (parts[4] == nodeId)
            figClearPageData(key);
    }
}
function figDeleteSavedConnectionsFromNode(nodeId) {
    const connKeys = figma.currentPage.getPluginDataKeys().filter(k => isConnKey(k));
    for (const key of connKeys) {
        const parts = key.split(' ');
        if (parts[1] == nodeId)
            figClearPageData(key);
    }
}
function figRemovePluginDataFromAllLocalStyles() {
    const localStyles = figma.getLocalPaintStyles();
    for (const style of localStyles) {
        style.setPluginData('type', '');
        style.setPluginData('nodeId', '');
        style.setPluginData('existing', '');
    }
}
var notifyNotificationHandler = null;
var notifyDequeueHandler = () => notifyNotificationHandler = null;
var windowDock = 'normal'; // '', 'maximize', 'top', 'left', 'right', 'bottom'
function figGetMousePosition(clientPosition) {
    // (async () => 
    // {
    //     const relaunchData = await figma.ui.getRelaunchData();
    //     const x = relaunchData.x - window.pageXOffset;
    //     const y = relaunchData.y - window.pageYOffset;
    figPostMessageToUi({
        cmd: 'uiReturnFigGetMousePosition',
        position: { x: 0, y: 0 },
        clientPosition: clientPosition,
        viewportZoom: figma.viewport.zoom,
        viewportRect: figma.viewport.bounds
    });
    // })
    // ();
}
function figSetWindowRect(x, y, width, height) {
    return;
    (function () {
        return __awaiter(this, void 0, void 0, function* () {
            //console.log('figma.viewport.bounds =', figma.viewport.bounds);
            console.log('_x =', x);
            //console.log('_y =',      y);
            //console.log('_width =',  width);
            //console.log('_height =', height);
            const rect = {
                x: Math.round(x),
                y: Math.round(y),
                width: Math.floor(Math.max(0, width)),
                height: Math.floor(Math.max(0, height))
            };
            // if (windowDock != 'normal')
            //     position = true;
            // if (isNaN(rect.x)) rect.x = await figma.clientStorage.getAsync('windowX');
            // if (isNaN(rect.y)) rect.y = await figma.clientStorage.getAsync('windowY');
            // dockWindow(
            //     windowDock,
            //     rect, 
            //     figma.viewport.bounds);
            figma.ui.reposition(rect.x, rect.y);
            figma.ui.resize(rect.width, rect.height);
            figma.clientStorage.setAsync('windowX', rect.x);
            figma.clientStorage.setAsync('windowY', rect.y);
            figma.clientStorage.setAsync('windowWidth', rect.width);
            figma.clientStorage.setAsync('windowHeight', rect.height);
            figPostMessageToUi({ cmd: 'uiReturnFigSetWindowRect' });
        });
    })();
}
function dockWindow(dock, rect, bounds) {
    switch (dock) {
        case 'normal':
            // x      = windowX;
            // y      = windowY;
            // width  = windowWidth;
            // height = windowHeight;
            break;
        case 'maximize':
            rect.x = bounds.x;
            rect.y = bounds.y;
            rect.width = bounds.width;
            rect.height = bounds.height;
            break;
        case 'top':
            rect.x = bounds.x;
            rect.y = bounds.y;
            rect.width = bounds.width;
            break;
        case 'left':
            rect.x = bounds.x;
            rect.y = bounds.y;
            rect.height = bounds.height;
            break;
        case 'right':
            rect.x = bounds.x + bounds.width - rect.width;
            rect.y = bounds.y;
            rect.height = bounds.height;
            break;
        case 'bottom':
            rect.x = bounds.x;
            rect.y = bounds.y + bounds.height - rect.height;
            rect.width = bounds.width;
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
function figResizeWindow(width, height) {
    (function () {
        return __awaiter(this, void 0, void 0, function* () {
            // let x, y;
            let position = false;
            // const bounds = figma.viewport.bounds;
            width = Math.floor(Math.max(0, width));
            height = Math.floor(Math.max(0, height));
            // if (windowDock != 'normal')
            // {
            //     figma.clientStorage.setAsync('normalWindowX',      await figma.clientStorage.getAsync('normalWindowX'     ));
            //     figma.clientStorage.setAsync('normalWindowY',      await figma.clientStorage.getAsync('normalWindowY'     ));
            //     figma.clientStorage.setAsync('normalWindowWidth',  await figma.clientStorage.getAsync('normalWindowWidth' ));
            //     figma.clientStorage.setAsync('normalWindowHeight', await figma.clientStorage.getAsync('normalWindowHeight'));
            //     position = true;
            // }
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
            width = Math.round(width);
            height = Math.round(height);
            // console.log('width =',  width);
            // console.log('height =', height);
            figma.ui.resize(width, height);
            figma.currentPage.setPluginData(figma.currentUser.id + ',windowWidth', width.toString());
            figma.currentPage.setPluginData(figma.currentUser.id + ',windowHeight', height.toString());
            // if (position)
            // {
            //     figma.ui.reposition(x, y);
            //     figma.clientStorage.setAsync('windowX', x);
            //     figma.clientStorage.setAsync('windowY', y);
            // }
            figPostMessageToUi({ cmd: 'uiReturnFigResizeWindow' });
        });
    })();
}
function figDockWindow(dock) {
    return __awaiter(this, void 0, void 0, function* () {
        if (dock != 'normal'
            && windowDock == 'normal') {
            figma.clientStorage.setAsync('normalWindowX', yield figma.clientStorage.getAsync('normalWindowX'));
            figma.clientStorage.setAsync('normalWindowY', yield figma.clientStorage.getAsync('normalWindowY'));
            figma.clientStorage.setAsync('normalWindowWidth', yield figma.clientStorage.getAsync('normalWindowWidth'));
            figma.clientStorage.setAsync('normalWindowHeight', yield figma.clientStorage.getAsync('normalWindowHeight'));
        }
        windowDock = dock;
        figma.clientStorage.setAsync('windowDock', dock);
        figResizeWindow(yield figma.clientStorage.getAsync('windowWidth'), yield figma.clientStorage.getAsync('windowHeight'));
    });
}
function figNotifyMsg(msg) {
    figNotify(msg.text, msg.prefix, msg.delay, msg.error, msg.buttonText, msg.buttonAction);
}
function figNotify(text, prefix = 'Generator ', delay = 400, error = false, buttonText = '', buttonAction = NULL) {
    const options = {
        timeout: delay,
        error: error,
        onDequeue: notifyDequeueHandler
    };
    if (buttonText != '') {
        options['button'] = { text: buttonText };
        if (buttonAction.substring(0, 'removeConnection'.length) == 'removeConnection') {
            options['button']['action'] = () => figDeleteSavedConnection(buttonAction.split(',')[1]);
        }
        else {
            switch (buttonAction) {
                case 'hideClearUndoWarning':
                    options['button']['action'] = () => figPostMessageToUi({ cmd: 'uiHideClearUndoWarning' });
                    break;
            }
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
