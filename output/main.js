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
const generatorVersion = 441;
const MAX_INT32 = 2147483647;
const NULL = '';
const NULL_VALUE = 'NULL';
const HTAB = '  '; // half-tab
const TAB = '    ';
const NL = '\n';
const PLUGIN_LOGO = '◦ G •';
const PLUGIN_NAME = 'Generator';
const PLUGIN_LOGO_AND_NAME = PLUGIN_LOGO + ' ' + PLUGIN_NAME;
const OBJECT_PREFIX = PLUGIN_LOGO + ' ';
const nodeTag = 'G_NODE';
const connTag = 'G_CONN';
const pageTag = 'G_PAGE';
const tempTag = 'G_TEMP';
const minWindowWidth = 602;
const minWindowHeight = 39;
const identity = Object.freeze([[1, 0, 0],
    [0, 1, 0],
    [0, 0, 1]]);
const Epsilon = 0.0000001;
const Tau = Math.PI * 2;
var enableAsserts = false;
function hardZero(x, eps = 0.000000001) {
    return Math.abs(x) < eps ? 0 : x;
}
function hardPosZero(x, eps = 0.000000001) {
    return x < 0
        && x > -eps
        ? 0
        : x;
}
function nozero(x, eps = 0.000000001) {
    return x != 0
        ? x
        : (x < 0 ? -eps : eps);
}
function nozerov(v, eps = 0.000000001) {
    return point(nozero(v.x, eps), nozero(v.y, eps));
}
function equal(a, b, eps = 0.000000001) {
    return Math.abs(b - a) < eps;
}
function sqr(x) { return x * x; }
;
function cube(x) { return x * x * x; }
;
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
function distv(p1, p2) {
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    return Math.sqrt(dx * dx + dy * dy);
}
function anglev(v) {
    let angle = Math.atan2(v.y, v.x);
    if (angle < 0)
        angle += Tau;
    return angle;
}
function anglev2(v1, v2) {
    return anglev2_(v1.x, v1.y, v2.x, v2.y);
}
function anglev2_(x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    let angle = Math.atan2(dy, dx);
    if (angle < 0)
        angle += Tau;
    return angle;
}
function lengthv(v) {
    return Math.sqrt(v.x * v.x + v.y * v.y);
}
function lengthv_(x, y) {
    return Math.sqrt(x * x + y * y);
}
function unitv(v) {
    return point(v.x == 0 ? 0 : v.x / lengthv(v), v.y == 0 ? 0 : v.y / lengthv(v));
}
function dotv(v1, v2) {
    return v1.x * v2.x + v1.y * v2.y;
}
function angleDiff(a1, a2) {
    let diff = a2 - a1;
    while (diff <= -Tau / 2)
        diff += Tau;
    while (diff > Tau / 2)
        diff -= Tau;
    return diff; // |-Tau/2, Tau/2]
}
function mulv2m3(v, m) {
    let v3 = [v.x, v.y, 1];
    let r = mulv3m3(v3, m);
    return point(r[0], r[1]);
}
function mulm3m3(...mm) {
    consoleAssert(mm.length > 0, 'mulm3m3() must take at least one argument');
    let result = clone(mm[0]);
    for (let a = 1; a < mm.length; a++) {
        const m1 = result;
        const m2 = mm[a];
        const m = [[0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]];
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                /*	calculate the dot product of ith row
                    of this and jth column of m  */
                for (let k = 0; k < 3; k++)
                    m[i][j] += m1[i][k] * m2[k][j];
            }
        }
        result = m;
    }
    return result;
}
function divm3s(m, s) {
    for (let i = 0; i < 3; i++)
        for (let j = 0; j < 3; j++)
            m[i][j] /= s;
    return m;
}
function adjugate(m) {
    return cofactor(transpose(m));
}
function transpose(m) {
    return [[m[0][0], m[1][0], m[2][0]],
        [m[0][1], m[1][1], m[2][1]],
        [m[0][2], m[1][2], m[2][2]]];
}
function cofactor(m) {
    return [[m[1][1] * m[2][2] - m[2][1] * m[1][2], -(m[1][0] * m[2][2] - m[2][0] * m[1][2]), m[1][0] * m[2][1] - m[2][0] * m[1][1]],
        [-(m[0][1] * m[2][2] - m[2][1] * m[0][2]), m[0][0] * m[2][2] - m[2][0] * m[0][2], -(m[0][0] * m[2][1] - m[2][0] * m[0][1])],
        [m[0][1] * m[1][2] - m[1][1] * m[0][2], -(m[0][0] * m[1][2] - m[1][0] * m[0][2]), m[0][0] * m[1][1] - m[1][0] * m[0][1]]];
}
function determinant(m) {
    return m[0][0] * (m[1][1] * m[2][2] - m[1][2] * m[2][1])
        - m[0][1] * (m[1][0] * m[2][2] - m[2][0] * m[1][2])
        + m[0][2] * (m[1][0] * m[2][1] - m[2][0] * m[1][1]);
}
function inversem3(m) {
    return divm3s(adjugate(m), determinant(m));
}
function createRotateTransform(angle) {
    const cosA = hardZero(Math.cos(angle));
    const sinA = hardZero(Math.sin(angle));
    return [[cosA, sinA, 0],
        [-sinA, cosA, 0],
        [0, 0, 1]];
}
function createTransform(x = 0, y = 0, scaleX = 1, scaleY = 1, angle = 0, skewX = 0, skewY = 0) {
    const cosA = Math.cos(angle);
    const sinA = Math.sin(angle);
    return [[scaleX * cosA - skewY * sinA, -skewX * cosA + scaleY * sinA, x],
        [skewY * cosA + scaleX * sinA, scaleY * cosA + skewX * sinA, y],
        [0, 0, 1]];
}
function crossv2(v1, v2) {
    // returns the magnitude of v1×v2 = ‖v1‖‖v2‖sinθ "perpendicular dot product",
    // equivalent to dotv(v1, cross(v2)) (same as in 3D with a Z component of 0)
    // also the area of the parallelogram between the two vectors
    // also determinant of 2×2 matrix built from the two vectors
    // positive if turn from v1 to v2 is clockwise
    return v1.x * v2.y - v1.y * v2.x;
}
function addv(v1, v2) {
    return point(v1.x + v2.x, v1.y + v2.y);
}
function sqrv(v) {
    return mulv(v, v);
}
function mulv(v1, v2) {
    return point(v1.x * v2.x, v1.y * v2.y);
}
function mulvs(v, s) {
    return point(v.x * s, v.y * s);
}
function divv(v1, v2) {
    return point(v1.x / v2.x, v1.y / v2.y);
}
function divvs(v, s) {
    return point(v.x / s, v.y / s);
}
function subv(v1, v2) {
    return point(v1.x - v2.x, v1.y - v2.y);
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
function leftArrowChar(list) { return list ? '<==' : '<--'; }
;
function rightArrowChar(list) { return list ? '==>' : '-->'; }
;
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
    return /*'( ' +*/ outputNodeId + join + outputId
        + arrow
        + inputNodeId + join + inputId;
    //+ ' )';
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
function getLinearPathData(points) {
    let pathData = '';
    if (points.length < 2)
        return pathData;
    pathData += 'M';
    pathData += ' ' + hardZero(points[0].x);
    pathData += ' ' + hardZero(points[0].y);
    for (let i = 1; i < points.length; i++) {
        pathData +=
            ' L'
                + ' ' + hardZero(points[i].x)
                + ' ' + hardZero(points[i].y);
    }
    return pathData;
}
function point(x, y) { return { x: x, y: y }; }
function mulv3m3(v, m) {
    let r = [0, 0, 0];
    for (let i = 0; i < 3; i++)
        for (let j = 0; j < 3; j++)
            r[i] += v[j] * m[i][j];
    return r;
}
function clone(val) {
    const type = typeof val;
    if (val === null)
        return null;
    else if (type === 'undefined'
        || type === 'number'
        || type === 'string'
        || type === 'boolean')
        return val;
    else if (type === 'object') {
        if (val instanceof Array)
            return val.map(x => clone(x));
        else if (val instanceof Uint8Array)
            return new Uint8Array(val);
        else {
            let obj = {};
            for (const key in val)
                obj[key] = clone(val[key]);
            return obj;
        }
    }
    throw 'unknown';
}
function pushUnique(array, item, equal = null) {
    if (equal) {
        if (Array.isArray(item))
            item.forEach(i => pushUnique(array, i, equal));
        else if (!array.find(i => equal(i, item)))
            array.push(item);
    }
    else {
        if (Array.isArray(item))
            item.forEach(i => pushUnique(array, i));
        else if (!array.includes(item))
            array.push(item);
    }
}
function pushUniqueBy(array, item, equal) {
    if (Array.isArray(item))
        item.forEach(i => pushUniqueBy(array, i, equal));
    else if (!array.find(equal))
        array.push(item);
}
function pushUniqueExcept(array, item, except) {
    if (Array.isArray(item))
        item.forEach(i => pushUniqueExcept(array, i, except));
    else if (!array.find(except))
        array.push(item);
}
function consoleAssert(...args) {
    // if (  !settings 
    //     || settings.enableAsserts)
    if (enableAsserts) {
        console.assert(...args);
        //console.trace();
    }
}
function consoleError(...args) {
    // if (  !settings
    //     || settings.enableAsserts)
    if (enableAsserts)
        console.error(...args);
}
function trimCharFromStart(str, trim) {
    while (str.length >= trim.length
        && str.substring(0, trim.length) == trim)
        str = str.substring(trim.length);
    return str;
}
function trimCharFromEnd(str, trim) {
    while (str.length >= trim.length
        && str.substring(str.length - trim.length) == trim)
        str = str.substring(0, str.length - trim.length);
    return str;
}
function getObjectFills(genObjFills) {
    const fills = [];
    for (const fill of genObjFills) {
        switch (fill[0]) {
            case 'SOLID':
                {
                    const color = {
                        r: Math.min(Math.max(0, fill[1] / 0xff), 1),
                        g: Math.min(Math.max(0, fill[2] / 0xff), 1),
                        b: Math.min(Math.max(0, fill[3] / 0xff), 1)
                    };
                    const opacity = Math.min(Math.max(0, fill[4] / 100), 1);
                    if (!isNaN(color.r)
                        && !isNaN(color.g)
                        && !isNaN(color.b)
                        && !isNaN(opacity))
                        fills.push({
                            type: fill[0],
                            color: color,
                            opacity: opacity,
                            blendMode: fill[5]
                        });
                    break;
                }
            case 'GRADIENT_LINEAR':
            case 'GRADIENT_RADIAL':
            case 'GRADIENT_ANGULAR':
            case 'GRADIENT_DIAMOND':
                {
                    const [p0, p1, p2] = fill[1];
                    const identityHandles = [[0, 1, 0],
                        [0.5, 0.5, 1],
                        [1, 1, 1]];
                    let xform = [
                        [p0.x, p1.x, p2.x],
                        [p0.y, p1.y, p2.y],
                        [1, 1, 1]
                    ];
                    xform = mulm3m3(identityHandles, inversem3(xform));
                    xform = [xform[0], xform[1]];
                    const stops = [];
                    for (const stop of fill[2]) {
                        stops.push({
                            color: {
                                r: Math.min(Math.max(0, stop[0]), 1),
                                g: Math.min(Math.max(0, stop[1]), 1),
                                b: Math.min(Math.max(0, stop[2]), 1),
                                a: Math.min(Math.max(0, stop[3]), 1)
                            },
                            position: stop[4]
                        });
                    }
                    fills.push({
                        type: fill[0],
                        gradientTransform: xform,
                        gradientStops: stops,
                        blendMode: fill[3]
                    });
                    break;
                }
        }
    }
    return fills;
}
function isListValueType(type) {
    return LIST_VALUES.includes(type);
}
function isValueListOfLists(value) {
    if (!isListValueType(value.type))
        return false;
    for (const item of value.items) {
        if (!isListValueType(item.type))
            return false;
    }
    return true;
}
function isValueListOfCondensedLists(value) {
    if (!isListValueType(value.type))
        return false;
    for (const item of value.items) {
        if (!isListValueType(item.type)
            || item.condensed !== true)
            return false;
    }
    return true;
}
const LIST_VALUE = 'EXPAND#';
const NUMBER_LIST_VALUE = 'NLIST#';
const TEXT_LIST_VALUE = 'TLIST#';
const SHAPE_LIST_VALUE = 'SLIST#';
const NULL_NODE = 'NULL';
const VARIABLE_GROUP = 'VARGRP';
const FEEDBACK = 'FEEDBK';
const REPEAT = 'REPT';
const CACHE = 'CACHE';
const FREEZE = 'FRZ';
const TIMER = 'TIMER';
const GET_VALUE_NAME = 'GVNAME';
const SET_VALUE_NAME = 'SVNAME';
const GET_LIST_VALUE_NAMES = 'GVNAMES';
const SET_LIST_VALUE_NAMES = 'SVNAMES';
const SET_OBJECT_NAME = 'SONAME';
const VARIABLE = 'VAR';
const VARIABLE_VALUE = 'VAR#';
const VARIABLE_TYPES = [VARIABLE_VALUE, VARIABLE];
const LIST = 'LIST';
const LIST_AS_ITEM = 'LSASIT';
const EXTRACT = 'EXTR';
const SET_PARAM = 'SETP';
const GET_PARAM = 'GETP';
const SUBLIST = 'SUBLST';
const UNIQUE = 'UNIQ';
const REORDER_LIST = 'RORD';
const SHIFT_LIST = 'SHFTLST';
const REVERSE_LIST = 'REVLST';
const BUCKLE_LIST = 'BUKLST';
const SORT = 'SORT';
const COLUMN = 'CLMN';
const CELL = 'CELL';
const EXPAND = 'EXPAND';
const LIST_COUNT = 'COUNT';
const OBJECT_COUNT = 'OBJCOUNT';
const LIST_CONTAINS = 'LCONT';
const LIST_FIND = 'LFIND';
const SELECT = 'SELECT';
const SELECT_FROM_LIST = 'LSTSEL';
const IF_ELSE = 'IF';
const FILTER = 'LSTFLT';
const ANY_VALUE = 'ANY#';
const LIST_TYPES = [
    LIST_VALUE,
    NUMBER_LIST_VALUE,
    TEXT_LIST_VALUE,
    SHAPE_LIST_VALUE,
    LIST,
    EXTRACT,
    SET_PARAM,
    GET_PARAM,
    SUBLIST,
    EXPAND,
    LIST_COUNT,
    LIST_CONTAINS,
    LIST_FIND,
    REPEAT
];
const LIST_VALUES = [
    LIST_VALUE,
    NUMBER_LIST_VALUE,
    TEXT_LIST_VALUE,
    SHAPE_LIST_VALUE
];
const ITERATE = 'ITER';
const PROBABILITY = 'PROB';
const HOLD = 'HOLD';
const BOOLEAN_NUMBER = 'BOOL';
const NUMBER_VALUE = 'NUM#';
const NUMBER = 'NUM';
const NUMBER_PRECISION = 'NPREC';
const NUMBER_SIGN = 'NSIGN';
const NUMBER_ABSOLUTE = 'ABS';
const NUMBER_NEGATIVE = 'NEG';
const NUMBER_ROUND = 'ROUND';
const NUMBER_QUANTIZE = 'QUANT';
const NUMBER_SIMPLE_MINMAX = 'SMINMAX';
const NUMBER_MINMAX = 'MINMAX';
const NUMBER_LIMITS = 'LIM';
const NUMBER_CURVE = 'NCURVE';
const NUMBER_MAP = 'NMAP';
const NUMBER_BIAS = 'NBIAS';
const NUMBER_NAN = 'NANISNUM';
const NUMBER_CONSTANT = 'CONST';
const NUMBER_DATETIME = 'DATE';
const NUMBER_SEQUENCE = 'SEQ';
const NUMBER_RANGE = 'RANGE';
const NUMBER_WAVE = 'WAVE';
const NUMBER_RANDOM = 'RAND';
const NUMBER_NOISE = 'NOISE';
const NUMBER_ACCUMULATE = 'ACCUM';
const NUMBER_INTERPOLATE = 'LERP';
const NUMBER_SOLVE = 'SOLVE';
const NUMBER_ANIMATE = 'NANIM';
const NUMBER_SIMPLE_MATH = 'SMATH';
const NUMBER_MATH = 'MATH';
const NUMBER_ADD = 'ADD';
const NUMBER_SUBTRACT = 'SUB';
const NUMBER_MULTIPLY = 'MUL';
const NUMBER_DIVIDE = 'DIV';
const NUMBER_MODULO = 'MOD';
const NUMBER_EXPONENT = 'EXP';
const NUMBER_BOOLEAN = 'NBOOL';
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
const NUMBER_ATAN2 = 'ATAN2';
const CONVERT_ANGLE = 'CNVANG';
const TEXT_VALUE = 'TEXT#';
const TEXT = 'TEXT';
const TEXT_LENGTH = 'TLEN';
const TEXT_TRIM = 'TTRIM';
const TEXT_SUBSTRING = 'TSUB';
const TEXT_CONTAINS = 'TCONT';
const TEXT_FIND = 'TFIND';
const TEXT_CASE = 'TCASE';
const TEXT_REPLACE = 'TREPL';
const TEXT_ADD = 'TADD';
const TEXT_JOIN = 'TJOIN';
const TEXT_PAD = 'TPAD';
const TEXT_COMPARE = 'TCMP';
const TEXT_CHAR = 'TCHAR';
const TEXT_UNICODE = 'TUNI';
const INDEX_TO_NAME = 'INDEX';
const NUMBER_TO_TEXT = 'N2T';
const COLOR_TO_TEXT = 'C2T';
const TEXT_TO_NUMBER = 'T2N';
const TEXT_TO_COLOR = 'T2C';
const TEXT_SPLIT = 'TSPLT';
const PARSE_JSON = 'TJSON';
const PARSE_CSV = 'TCSV';
const TEXT_FETCH = 'FETCH';
const TEXT_FILE = 'TFILE';
const COLOR_VALUE = 'COL#';
const COLOR = 'COL';
const VALID_COLOR = 'CVAL';
const CORRECT_COLOR = 'CCOR';
const COLOR_CONTRAST = 'CCNT';
const COLOR_DELTA_E = 'CDLTE';
const COLORBLIND = 'BLND';
const COLOR_SCHEME = 'CPAL';
const COLOR_INTERPOLATE = 'CLERP';
const COLOR_BLEND = 'CBLND';
const FILL_VALUE = 'FILL#';
const FILL = 'FILL';
const FILL_TYPES = [FILL_VALUE, FILL];
const STROKE_VALUE = 'STRK#';
const STROKE = 'STRK';
const STROKE_TYPES = [STROKE_VALUE, STROKE];
const STROKE_SIDES_VALUE = 'STRKSD#';
const STROKE_SIDES = 'STRKSD';
const STROKE_SIDES_TYPES = [STROKE_SIDES_VALUE, STROKE_SIDES];
const COLOR_STOP_VALUE = 'CSTOP#';
const COLOR_STOP = 'CSTOP';
const COLOR_STOP_TYPES = [COLOR_STOP_VALUE, COLOR_STOP];
const GRADIENT_VALUE = 'GRAD#';
const GRADIENT = 'GRAD';
const GRADIENT_TYPES = [GRADIENT_VALUE, GRADIENT];
const ROUND_CORNERS_VALUE = 'RCRN#';
const ROUND_CORNERS = 'RCRN';
const ROUND_CORNERS_TYPES = [ROUND_CORNERS_VALUE, ROUND_CORNERS];
const DROP_SHADOW_VALUE = 'DRSH#';
const DROP_SHADOW = 'DRSH';
const DROP_SHADOW_TYPES = [DROP_SHADOW_VALUE, DROP_SHADOW];
const INNER_SHADOW_VALUE = 'INSH#';
const INNER_SHADOW = 'INSH';
const INNER_SHADOW_TYPES = [INNER_SHADOW_VALUE, INNER_SHADOW];
const LAYER_BLUR_VALUE = 'LBLR#';
const LAYER_BLUR = 'LBLR';
const LAYER_BLUR_TYPES = [LAYER_BLUR_VALUE, LAYER_BLUR];
const BACK_BLUR_VALUE = 'BBLR#';
const BACK_BLUR = 'BBLR';
const BACK_BLUR_TYPES = [BACK_BLUR_VALUE, BACK_BLUR];
const LAYER_MASK_VALUE = 'MASK#';
const LAYER_MASK = 'MASK';
const LAYER_MASK_TYPES = [LAYER_MASK_VALUE, LAYER_MASK];
const LAYER_BLEND_VALUE = 'BLEND#';
const LAYER_BLEND = 'BLEND';
const LAYER_BLEND_TYPES = [LAYER_BLEND_VALUE, LAYER_BLEND];
const COLOR_STYLE = 'CSTL';
const SHAPE_VALUE = 'SHP#'; // abstract placeholder
const RECTANGLE_VALUE = 'RECT#';
const RECTANGLE = 'RECT';
//const RECTANGLE_EXT         = 'RECTEXT'; 
const RECTANGLE_TYPES = [RECTANGLE_VALUE, RECTANGLE]; //, RECTANGLE_EXT];
const LINE_VALUE = 'LINE#';
const LINE = 'LINE';
const LINE_TYPES = [LINE_VALUE, LINE];
const ELLIPSE_VALUE = 'ELPS#';
const ELLIPSE = 'ELPS';
const ELLIPSE_TYPES = [ELLIPSE_VALUE, ELLIPSE];
const TRAPEZE_VALUE = 'TRPZ#';
const TRAPEZE = 'TRPZ';
const TRAPEZE_TYPES = [TRAPEZE_VALUE, TRAPEZE];
const POLYGON_VALUE = 'POLY#';
const POLYGON = 'POLY';
const POLYGON_TYPES = [POLYGON_VALUE, POLYGON];
const STAR_VALUE = 'STAR#';
const STAR = 'STAR';
const STAR_TYPES = [STAR_VALUE, STAR];
const TEXT_SHAPE_VALUE = 'TXTS#';
const TEXT_SHAPE = 'TXTS';
const TEXT_SHAPE_TYPES = [TEXT_SHAPE_VALUE, TEXT_SHAPE];
const POINT_VALUE = 'PT#';
const POINT = 'PT';
const POINT_TYPES = [POINT_VALUE, POINT];
const POINT_CORNER = 'PCORN';
const VECTOR_PATH_VALUE = 'VPATH#';
const VECTOR_PATH = 'VPATH';
const VECTOR_PATH_TYPES = [VECTOR_PATH_VALUE, VECTOR_PATH];
const VECTOR_VERTEX_VALUE = 'VPT#';
const VECTOR_VERTEX = 'VPT';
const VECTOR_VERTEX_TYPES = [VECTOR_VERTEX_VALUE, VECTOR_VERTEX];
const VECTOR_EDGE_VALUE = 'VEDGE#';
const VECTOR_EDGE = 'VEDGE';
const VECTOR_EDGE_TYPES = [VECTOR_EDGE_VALUE, VECTOR_EDGE];
const VECTOR_REGION_VALUE = 'VREG#';
const VECTOR_REGION = 'VREG';
const VECTOR_REGION_TYPES = [VECTOR_REGION_VALUE, VECTOR_REGION];
const VECTOR_NETWORK_VALUE = 'VNET#';
const VECTOR_NETWORK = 'VNET';
const VECTOR_NETWORK_TYPES = [VECTOR_NETWORK_VALUE, VECTOR_NETWORK];
const SHAPE_GROUP_VALUE = 'SGRP#';
const SHAPE_GROUP = 'SGRP';
const SHAPE_GROUP_TYPES = [SHAPE_GROUP_VALUE, SHAPE_GROUP];
const FRAME_VALUE = 'FRM#';
const FRAME = 'FRM';
const FRAME_TYPES = [FRAME_VALUE, FRAME];
const ARC_PATH_VALUE = 'ARC#';
const ARC_PATH = 'ARC';
const ARC_PATH_TYPES = [ARC_PATH_VALUE, ARC_PATH];
const WAVE_PATH_VALUE = 'WAVEP#';
const WAVE_PATH = 'WAVEP';
const WAVE_PATH_TYPES = [WAVE_PATH_VALUE, WAVE_PATH];
const MOVE = 'MOVE';
const ROTATE = 'ROT';
const SCALE = 'SCALE';
const SKEW = 'SKEW';
const SHOW_CENTER = 'SHOWCNTR';
const SET_CENTER = 'SCENTR';
const RESET_XFORM = 'RSTX';
const PLACE = 'PLACE';
const SHAPE_APPLY = 'APPLY';
const PATH_LENGTH = 'PTHLEN';
const JOIN_PATHS = 'JOINPTH';
const REORIENT_PATHS = 'REORPTH';
const POINT_ALONG_PATH = 'PTALPATH';
const CLOSEST_POINT_ON_PATH = 'CPTONPATH';
const MEASURE_VECTOR = 'MESPT';
const POINT_ANGLE = 'PTANGLE';
const VECTOR = 'VECLEN';
const CIRCLE_CENTER = 'CIRCEN';
const ARC_FROM_POINTS = 'ARCPT';
const INTERSECT_LINES = 'INTLIN';
const INTERPOLATE_POINT = 'PTLERP';
const REVERSE_PATH = 'REVPTH';
const BLEND_PATH = 'BLENDPTH';
const SHAPE_BOOLEAN = 'SBOOL';
const SHAPE_BOOLEAN_VALUE = 'SBOOL#';
const BOOL_UNION = 'SBOOLU';
const BOOL_SUBTRACT = 'SBOOLS';
const BOOL_INTERSECT = 'SBOOLI';
const BOOL_EXCLUDE = 'SBOOLE';
const PERSIST = 'PERSIST';
const EXPORT = 'EXPORT';
const GROUP_NODE = 'GROUP';
const GROUP_PARAM = 'GPARAM';
const COMMENT = 'CMNT';
const COMMENT_ARROW = 'CMNTARR';
const PANEL = 'PANEL';
const ACTIVE = 'ACT';
const BEFORE_ACTIVE = 'BFACT';
const BEFORE_LIST = 'BFLST';
const DISABLED = 'DIS';
const NOCACHE = 'NOC';
const PARAM = 'PARAM'; // nodeId paramId
const LOG = 'LOG';
const GRAPH = 'GRAPH';
const FLOW_TYPES = [
    NULL_NODE,
    VARIABLE,
    VARIABLE_GROUP,
    ...LIST_TYPES,
    LIST_AS_ITEM,
    EXTRACT,
    SET_PARAM,
    GET_PARAM,
    SUBLIST,
    UNIQUE,
    REORDER_LIST,
    SHIFT_LIST,
    REVERSE_LIST,
    BUCKLE_LIST,
    COLUMN,
    SORT,
    CELL,
    EXPAND,
    SELECT,
    SELECT_FROM_LIST,
    IF_ELSE,
    FILTER,
    FEEDBACK,
    REPEAT,
    ITERATE,
    PROBABILITY,
    HOLD,
    CACHE,
    FREEZE,
    PARSE_JSON,
    PARSE_CSV,
    TIMER,
    GET_VALUE_NAME,
    SET_VALUE_NAME,
    GET_LIST_VALUE_NAMES,
    SET_LIST_VALUE_NAMES,
    COLOR_SCHEME,
    COLOR_DELTA_E,
    COLOR_TO_TEXT
];
const MATH_TYPES = [
    NUMBER_MATH,
    NUMBER_SIMPLE_MATH,
    NUMBER_ADD,
    NUMBER_SUBTRACT,
    NUMBER_MULTIPLY,
    NUMBER_DIVIDE,
    NUMBER_MODULO,
    NUMBER_EXPONENT
];
const NUMBER_BOOLEAN_TYPES = [
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
    NUMBER_TAN,
    NUMBER_ATAN2
];
const NUMBER_TYPES = [
    NUMBER_VALUE,
    NUMBER_LIST_VALUE,
    NUMBER,
    BOOLEAN_NUMBER,
    NUMBER_PRECISION,
    NUMBER_SIGN,
    NUMBER_ABSOLUTE,
    NUMBER_NEGATIVE,
    NUMBER_ROUND,
    NUMBER_QUANTIZE,
    NUMBER_SIMPLE_MINMAX,
    NUMBER_MINMAX,
    NUMBER_LIMITS,
    NUMBER_CURVE,
    NUMBER_MAP,
    NUMBER_BIAS,
    NUMBER_NAN,
    NUMBER_CONSTANT,
    NUMBER_DATETIME,
    NUMBER_SEQUENCE,
    NUMBER_RANGE,
    NUMBER_WAVE,
    NUMBER_RANDOM,
    NUMBER_NOISE,
    NUMBER_ACCUMULATE,
    NUMBER_INTERPOLATE,
    NUMBER_SOLVE,
    NUMBER_ANIMATE,
    NUMBER_TO_TEXT,
    TEXT_CHAR,
    ...MATH_TYPES,
    ...NUMBER_BOOLEAN_TYPES,
    ...CONDITION_TYPES,
    ...TRIG_TYPES,
    CONVERT_ANGLE,
    BUCKLE_LIST
];
const TEXT_TYPES = [
    TEXT_VALUE,
    TEXT_LIST_VALUE,
    TEXT,
    TEXT_LENGTH,
    TEXT_TRIM,
    TEXT_SUBSTRING,
    TEXT_CONTAINS,
    TEXT_FIND,
    TEXT_CASE,
    TEXT_ADD,
    TEXT_JOIN,
    TEXT_PAD,
    TEXT_REPLACE,
    TEXT_COMPARE,
    TEXT_UNICODE,
    INDEX_TO_NAME,
    TEXT_TO_NUMBER,
    TEXT_TO_COLOR,
    TEXT_SPLIT,
    TEXT_FETCH,
    TEXT_FILE
];
const COLOR_TYPES = [
    COLOR_VALUE,
    COLOR,
    VALID_COLOR,
    CORRECT_COLOR,
    COLORBLIND,
    COLOR_CONTRAST,
    COLOR_DELTA_E,
    COLOR_INTERPOLATE,
    COLOR_BLEND,
    COLOR_TO_TEXT
];
const COLOR_HEADER_TYPES = [
    COLOR,
    FILL,
    STROKE,
    COLOR_STOP,
    GRADIENT
];
const COLOR_VALUES = [
    COLOR_VALUE,
    FILL_VALUE,
    STROKE_VALUE,
    COLOR_STOP_VALUE,
    GRADIENT_VALUE
];
const EFFECT_TYPES = [
    ...STROKE_SIDES_TYPES,
    ...ROUND_CORNERS_TYPES,
    ...DROP_SHADOW_TYPES,
    ...INNER_SHADOW_TYPES,
    ...LAYER_BLUR_TYPES,
    ...BACK_BLUR_TYPES,
    ...LAYER_BLEND_TYPES,
    ...LAYER_MASK_TYPES
];
const STYLE_VALUES = [
    COLOR_VALUE,
    FILL_VALUE,
    GRADIENT_VALUE,
    STROKE_VALUE,
    STROKE_SIDES_VALUE,
    DROP_SHADOW_VALUE,
    INNER_SHADOW_VALUE,
    LAYER_BLUR_VALUE,
    BACK_BLUR_VALUE,
    LAYER_BLEND_VALUE,
    LAYER_MASK_VALUE
];
const PATH_TYPES = [
    VECTOR_PATH,
    TRAPEZE,
    ARC_PATH,
    WAVE_PATH
];
const PATH_VALUES = [
    VECTOR_PATH_VALUE,
    TRAPEZE_VALUE,
    ARC_PATH_VALUE,
    WAVE_PATH_VALUE
];
const BOOLEAN_TYPES = [
    SHAPE_BOOLEAN,
    SHAPE_BOOLEAN_VALUE,
    BOOL_UNION,
    BOOL_SUBTRACT,
    BOOL_INTERSECT,
    BOOL_EXCLUDE
];
const SHAPE_VALUES = [
    SHAPE_VALUE,
    SHAPE_LIST_VALUE,
    RECTANGLE_VALUE,
    LINE_VALUE,
    ELLIPSE_VALUE,
    TRAPEZE_VALUE,
    POLYGON_VALUE,
    STAR_VALUE,
    TEXT_SHAPE_VALUE,
    POINT_VALUE,
    VECTOR_PATH_VALUE,
    VECTOR_VERTEX_VALUE,
    VECTOR_EDGE_VALUE,
    VECTOR_REGION_VALUE,
    VECTOR_NETWORK_VALUE,
    ARC_PATH_VALUE,
    WAVE_PATH_VALUE,
    SHAPE_GROUP_VALUE,
    FRAME_VALUE,
    SHAPE_BOOLEAN_VALUE,
    DROP_SHADOW_VALUE,
    INNER_SHADOW_VALUE,
    LAYER_BLUR_VALUE,
    BACK_BLUR_VALUE,
    LAYER_BLEND_VALUE,
    LAYER_MASK_VALUE
];
const AFFINE_TYPES = [
    ROTATE,
    SCALE,
    SKEW
];
const SHAPE_TYPES = [
    ...SHAPE_VALUES,
    ...RECTANGLE_TYPES,
    ...LINE_TYPES,
    ...ELLIPSE_TYPES,
    ...TRAPEZE_TYPES,
    ...POLYGON_TYPES,
    ...STAR_TYPES,
    ...TEXT_SHAPE_TYPES,
    ...POINT_TYPES,
    POINT_CORNER,
    ...VECTOR_PATH_TYPES,
    ...VECTOR_VERTEX_TYPES,
    ...VECTOR_EDGE_TYPES,
    ...VECTOR_REGION_TYPES,
    ...VECTOR_NETWORK_TYPES,
    ...ARC_PATH_TYPES,
    ...WAVE_PATH_TYPES,
    ...SHAPE_GROUP_TYPES,
    ...FRAME_TYPES,
    ...BOOLEAN_TYPES,
    MOVE,
    ...AFFINE_TYPES,
    SHOW_CENTER,
    SET_CENTER,
    RESET_XFORM,
    PLACE,
    SHAPE_APPLY,
    PATH_LENGTH,
    JOIN_PATHS,
    REORIENT_PATHS,
    POINT_ALONG_PATH,
    CLOSEST_POINT_ON_PATH,
    MEASURE_VECTOR,
    POINT_ANGLE,
    VECTOR,
    CIRCLE_CENTER,
    ARC_PATH,
    WAVE_PATH,
    ARC_FROM_POINTS,
    INTERSECT_LINES,
    INTERPOLATE_POINT,
    REVERSE_PATH,
    BLEND_PATH,
    SET_OBJECT_NAME,
    PERSIST,
    EXPORT
];
const ALL_VALUES = [
    LIST_VALUE,
    NUMBER_LIST_VALUE,
    TEXT_LIST_VALUE,
    SHAPE_LIST_VALUE,
    VARIABLE_VALUE,
    NUMBER_VALUE,
    TEXT_VALUE,
    COLOR_VALUE,
    FILL_VALUE,
    COLOR_STOP_VALUE,
    GRADIENT_VALUE,
    STROKE_VALUE,
    COLOR_STOP_VALUE,
    GRADIENT_VALUE,
    SHAPE_VALUE,
    RECTANGLE_VALUE,
    LINE_VALUE,
    ELLIPSE_VALUE,
    TRAPEZE_VALUE,
    POLYGON_VALUE,
    STAR_VALUE,
    TEXT_SHAPE_VALUE,
    POINT_VALUE,
    VECTOR_PATH_VALUE,
    VECTOR_VERTEX_VALUE,
    VECTOR_EDGE_VALUE,
    VECTOR_REGION_VALUE,
    VECTOR_NETWORK_VALUE,
    SHAPE_GROUP_VALUE,
    FRAME_VALUE,
    ROUND_CORNERS_VALUE,
    DROP_SHADOW_VALUE,
    INNER_SHADOW_VALUE,
    LAYER_BLUR_VALUE,
    BACK_BLUR_VALUE,
    LAYER_BLEND_VALUE,
    LAYER_MASK_VALUE
];
const GROUP_TYPES = [
    GROUP_NODE,
    GROUP_PARAM
];
const MATH_OPS = [
    [NUMBER_MODULO, '%'],
    [NUMBER_DIVIDE, '/'], //'÷' ],
    [NUMBER_SUBTRACT, '−'],
    [NUMBER_ADD, '+'],
    [NUMBER_MULTIPLY, '×'],
    [NUMBER_EXPONENT, 'e<sup>x']
];
const MATH_OPS_SHORT = [
    [NUMBER_DIVIDE, '/'], //'÷' ],
    [NUMBER_SUBTRACT, '−'],
    [NUMBER_ADD, '+'],
    [NUMBER_MULTIPLY, '×']
];
const BOOLEAN_NOT = 0;
const BOOLEAN_XOR = 1;
const BOOLEAN_OR = 2;
const BOOLEAN_AND = 3;
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
const TRIG_ASIN = 3;
const TRIG_ACOS = 4;
const TRIG_ATAN = 5;
const TRIG_OPS = [
    [TRIG_SIN, 'sin'],
    [TRIG_COS, 'cos'],
    [TRIG_TAN, 'tan'],
    [TRIG_ASIN, 'asin'],
    [TRIG_ACOS, 'acos'],
    [TRIG_ATAN, 'atan']
];
const EMPTY_ACTION = 'EMPTY';
const CONNECT_ACTION = 'CONNECT';
const CREATE_ACTION = 'CREATE';
const CREATE_INSERT_ACTION = 'CREATE_INSERT';
const DELETE_ACTION = 'DELETE';
const DISCONNECT_ACTION = 'DISCONNECT';
const LINK_STYLE_ACTION = 'LINK_STYLE';
const LINK_VARIABLE_ACTION = 'LINK_VARIABLE';
const LINK_VARIABLE_GROUP_ACTION = 'LINK_VARIABLE_GROUP';
const MAKE_ACTIVE_ACTION = 'MAKE_ACTIVE';
const MAKE_NOT_CONDITION_ACTION = 'MAKE_NOT_CONDITION';
const MAKE_PASSIVE_ACTION = 'MAKE_PASSIVE';
const PASTE_ACTION = 'PASTE';
const RECONNECT_ACTION = 'RECONNECT';
const REMOVE_ACTION = 'REMOVE';
const RENAME_ACTION = 'RENAME';
const REORDER_INPUTS_ACTION = 'REORDER_INPUTS';
const REORDER_CONNECTIONS_ACTION = 'REORDER_CONNECTIONS';
const SELECT_ACTION = 'SELECT';
const SELECT_MOVE_ACTION = 'SELECT_MOVE';
const MOVE_NODES_ACTION = 'MOVE_NODES';
const SET_PARAM_VALUE_ACTION = 'SET_PARAM_VALUE';
const SET_MULTIPLE_VALUES_ACTION = 'SET_MULTIPLE_VALUES';
const SET_PARAM_SETTING_ACTION = 'SET_PARAM_SETTING';
const SET_NODE_RECT_ACTION = 'SET_NODE_RECT';
const TOGGLE_DISABLE_ACTION = 'TOGGLE_DISABLE';
const TOGGLE_PARAM_HEADER_ACTION = 'TOGGLE_PARAM_HEADER';
const SET_CURRENT_GRAPH_ACTION = 'SET_CURRENT_GRAPH';
const CREATE_PAGE_ACTION = 'CREATE_PAGE';
const DELETE_PAGE_ACTION = 'DELETE_PAGE';
const GROUP_NODES_ACTION = 'GROUP_NODES';
const UNGROUP_NODES_ACTION = 'UNGROUP_NODES';
const HIGHLIGHT_NODES_ACTION = 'HIGHLIGHT_NODES';
const SCROLL_LIST_NODE_ACTION = 'SCROLL_LIST_NODE';
const SET_LIST_DIVIDER_ACTION = 'SET_LIST_DIVIDER';
const SET_NODE_PARAM_ACTION = 'SET_NODE_PARAM';
const BLEND_NORMAL = 'BNORM';
const BLEND_DARKEN = 'BDARK';
const BLEND_MULTIPLY = 'BMULT';
const BLEND_PLUS_DARKER = 'BPDRK';
const BLEND_COLOR_BURN = 'BBURN';
const BLEND_LIGNTEN = 'BLITE';
const BLEND_SCREEN = 'BSCRN';
const BLEND_PLUS_LIGHTER = 'BPLGT';
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
const BLEND_NORMAL_INDEX = 0;
const BLEND_DARKEN_INDEX = 1;
const BLEND_MULTIPLY_INDEX = 2;
const BLEND_PLUS_DARKER_INDEX = 3;
const BLEND_COLOR_BURN_INDEX = 4;
const BLEND_LIGHTEN_INDEX = 5;
const BLEND_SCREEN_INDEX = 6;
const BLEND_PLUS_LIGHTER_INDEX = 7;
const BLEND_COLOR_DODGE_INDEX = 8;
const BLEND_OVERLAY_INDEX = 9;
const BLEND_SOFT_LIGHT_INDEX = 10;
const BLEND_HARD_LIGHT_INDEX = 11;
const BLEND_DIFFERENCE_INDEX = 12;
const BLEND_EXCLUSION_INDEX = 13;
const BLEND_HUE_INDEX = 14;
const BLEND_SATURATION_INDEX = 15;
const BLEND_COLOR_INDEX = 16;
const BLEND_LUMINOSITY_INDEX = 17;
const BlendModes = [
    [BLEND_NORMAL, 'normal', 'NORMAL'],
    [BLEND_DARKEN, 'darken', 'DARKEN'],
    [BLEND_MULTIPLY, 'multiply', 'MULTIPLY'],
    [BLEND_PLUS_DARKER, 'plus darker', 'LINEAR_BURN'],
    [BLEND_COLOR_BURN, 'color burn', 'COLOR_BURN'],
    [BLEND_LIGNTEN, 'lighten', 'LIGHTEN'],
    [BLEND_SCREEN, 'screen', 'SCREEN'],
    [BLEND_PLUS_LIGHTER, 'plus lighter', 'LINEAR_DODGE'],
    [BLEND_COLOR_DODGE, 'color dodge', 'COLOR_DODGE'],
    [BLEND_OVERLAY, 'overlay', 'OVERLAY'],
    [BLEND_SOFT_LIGHT, 'soft light', 'SOFT_LIGHT'],
    [BLEND_HARD_LIGHT, 'hard light', 'HARD_LIGHT'],
    [BLEND_DIFFERENCE, 'difference', 'DIFFERENCE'],
    [BLEND_EXCLUSION, 'exclusion', 'EXCLUSION'],
    [BLEND_HUE, 'hue', 'HUE'],
    [BLEND_SATURATION, 'saturation', 'SATURATION'],
    [BLEND_COLOR, 'color', 'COLOR'],
    [BLEND_LUMINOSITY, 'luminosity', 'LUMINOSITY']
];
const FONT_WEIGHTS = [
    ['thin', 100],
    ['extra light', 200],
    ['light', 300],
    ['regular', 400],
    ['medium', 500],
    ['semi bold', 600],
    ['bold', 700],
    ['extra bold', 800],
    ['black', 900]
];
const FO_TYPE = 0;
const FO_NODE_ID = 1;
const FO_OBJECT_ID = 2;
const FO_STYLE_ID = 2;
const FO_OBJECT_NAME = 3;
const FO_STYLE_NAME = 3;
const FO_FEEDBACK = 4;
const FO_STYLE_PAINTS = 4;
const FO_PERSIST = 5;
const FO_XP0 = 6;
const FO_XP1 = 7;
const FO_XP2 = 8;
const FO_SCALE = 9;
const FO_FILLS = 10;
const FO_VARIABLE_TYPE = 10;
const FO_STROKES = 11;
const FO_VARIABLE_VALUE = 11;
const FO_STROKE_WEIGHT = 12;
const FO_STROKE_ALIGN = 13;
const FO_STROKE_JOIN = 14;
const FO_STROKE_MITER = 15;
const FO_STROKE_CAP = 16;
const FO_STROKE_DASHES = 17;
const FO_EFFECTS = 18;
const FO_DECO = 19;
const FO_IS_CENTER = 20;
const FO_OPACITY = 21;
const FO_BLEND = 22;
const FO_MASK = 23;
const FO_X = 24;
const FO_BOOLEAN_CHILDREN = 24;
const FO_GROUP_CHILDREN = 24;
const FO_Y = 25;
const FO_BOOLEAN_OPERATION = 25;
const FO_WIDTH = 26;
const FO_HEIGHT = 27;
const FO_RECT_ROUND = 28;
const FO_ELLIPSE_ROUND = 28;
const FO_VECTOR_NETWORK_DATA = 28;
const FO_VECTOR_PATH_DATA = 28;
const FO_POLY_ROUND = 28;
const FO_STAR_ROUND = 28;
const FO_FIG_WIDTH = 28;
const FO_FRAME_ROUND = 28;
const FO_ELLIPSE_START = 29;
const FO_VECTOR_PATH_WINDING = 29;
const FO_POLY_CORNERS = 29;
const FO_STAR_POINTS = 29;
const FO_FIG_HEIGHT = 29;
const FO_FRAME_CLIP = 29;
const FO_ELLIPSE_SWEEP = 30;
const FO_VECTOR_PATH_ROUND = 30;
const FO_STAR_CONVEX = 30;
const FO_TEXT = 30;
const FO_FRAME_CHILDREN = 30;
const FO_ELLIPSE_INNER = 31;
const FO_FONT = 31;
const FO_FONT_SIZE = 32;
const FO_FONT_STYLE = 33;
const FO_ALIGN_H = 34;
const FO_ALIGN_V = 35;
const FO_LINE_HEIGHT = 36;
const FO_LETTER_SPACING = 37;
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
    return __awaiter(this, void 0, void 0, function* () {
        const log = formatSavedNodeJson(yield figGetPageData(nodeKey, false));
        if (darkMode) {
            console.log('%c%s\n%c%s', 'background: #fa24; color: white;', noNodeTag(nodeKey), 'background: #fa44; color: #edc;', log);
        }
        else {
            console.log('%c%s\n%c%s', 'background: #fdb; color: black;', noNodeTag(nodeKey), 'background: #fed; color: black;', log);
        }
    });
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
console.clear();
figma.payments.setPaymentStatusInDevelopment({ type: 'PAID' });
figma.loadAllPagesAsync().then(() => {
    //figma.on('selectionchange', figOnSelectionChange);
    figma.on('documentchange', figOnDocumentChange);
    figma.on('selectionchange', figOnSelectionChange);
    figma.on('close', figOnPluginClose);
});
figDeleteAllObjects(true);
figDeleteTempVariableCollection();
figma.clientStorage.getAsync('pro').then(data => {
    figma.showUI(__html__, {
        visible: false,
        themeColors: true,
        title: PLUGIN_NAME + (data !== true ? ' (Free version)' : '')
    });
});
var curZoom = figma.viewport.zoom;
setInterval(figOnZoomInterval, 100);
var strBackgrounds = '';
setInterval(figCheckBackgrounds, 500);
const clockMarker = 'clock_';
const clockInterval = 1000;
var showIds = false;
var objectCenterSize = 15;
var tempVariableCollection = null;
// figma.currentPage
//     .getPluginDataKeys()
//     .forEach(k => figma.currentPage.setPluginData(k, figma.currentPage.getPluginData(k).replace('\\', '\\\\')));
function figStartGenerator() {
    (function () {
        return __awaiter(this, void 0, void 0, function* () {
            figma.currentPage.loadAsync().then(() => __awaiter(this, void 0, void 0, function* () {
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
                figma.ui.resize(Math.max(minWindowWidth, wndWidth), Math.max(minWindowHeight, wndHeight));
                figma.ui.show();
                const fonts = yield figma.listAvailableFontsAsync();
                const eula = (yield figma.clientStorage.getAsync('eula')) === 'true';
                const tutorials = (yield figma.clientStorage.getAsync('tutorials')) === 'true';
                const isLocked = yield figPageIsLocked();
                figPostMessageToUi({
                    cmd: 'uiReturnFigStartGenerator',
                    currentUser: figma.currentUser,
                    viewportRect: figma.viewport.bounds,
                    viewportZoom: figma.viewport.zoom,
                    fonts: fonts,
                    eula: eula,
                    tutorials: tutorials,
                    isLocked: isLocked,
                    windowWidth: wndWidth,
                    windowHeight: wndHeight
                });
            }));
        });
    })();
}
function figRestartGenerator() {
    return __awaiter(this, void 0, void 0, function* () {
        figDeleteAllObjects();
        figDeleteTempVariableCollection();
        figma.showUI(__html__, {
            visible: false,
            themeColors: true
        });
    });
}
function figFinishStart() {
    setInterval(figOnIdInterval, clockInterval);
}
function figOnZoomInterval() {
    if (figma.viewport.zoom == curZoom)
        return;
    curZoom = figma.viewport.zoom;
    updatePointObjects();
    updateEmptyObjects();
    updateDecoObjects();
}
function figCheckBackgrounds() {
    if (strBackgrounds != JSON.stringify(figma.currentPage.backgrounds)) {
        updateEmptyObjects();
        strBackgrounds = JSON.stringify(figma.currentPage.backgrounds);
    }
}
function figOnIdInterval() {
    figSetPageData(clockMarker + figma.currentUser.sessionId.toString(), Date.now().toString());
}
function figPageIsLocked() {
    return __awaiter(this, void 0, void 0, function* () {
        yield figma.currentPage.loadAsync();
        const clocks = figma.currentPage.getPluginDataKeys()
            .filter(k => k.length > clockMarker.length
            && k.substring(0, clockMarker.length) == clockMarker
            && k.substring(clockMarker.length) != figma.currentUser.sessionId.toString())
            .map((k) => __awaiter(this, void 0, void 0, function* () { return parseInt(yield figGetPageData(k)); }));
        clocks.sort();
        const now = Date.now();
        const locked = clocks.length > 0
            && now - (yield clocks[clocks.length - 1]) < clockInterval * 2;
        return locked;
    });
}
function figOnSelectionChange() {
    updatePointObjects();
}
var figObjectArrays = new Array(); // [ {nodeId, [objects]} ]
var figStyleArrays = new Array(); // [ {nodeId, [styles]}  ]
function figGetObjectsFromIds(objectIds) {
    return __awaiter(this, void 0, void 0, function* () {
        for (let i = figPoints.length - 1; i >= 0; i--)
            if (!figPoints[i].removed
                && objectIds.includes(figPoints[i].getPluginData('objectId')))
                figPoints.splice(i, 1);
        for (let i = figEmptyObjects.length - 1; i >= 0; i--)
            if (figEmptyObjects[i].removed
                || objectIds.includes(figEmptyObjects[i].getPluginData('objectId')))
                figEmptyObjects.splice(i, 1);
        yield figma.currentPage.loadAsync();
        return figma.currentPage.findAll(o => objectIds.includes(o.getPluginData('objectId')));
    });
}
function figDeleteObjectsFromNodeIds(nodeIds) {
    return __awaiter(this, void 0, void 0, function* () {
        for (let i = figPoints.length - 1; i >= 0; i--)
            if (!figPoints[i].removed
                && nodeIds.includes(figPoints[i].getPluginData('nodeId')))
                figPoints.splice(i, 1);
        for (let i = figEmptyObjects.length - 1; i >= 0; i--)
            if (figEmptyObjects[i].removed
                || nodeIds.includes(figEmptyObjects[i].getPluginData('nodeId')))
                figEmptyObjects.splice(i, 1);
        yield figma.currentPage.loadAsync();
        figma.currentPage
            .findAll(o => nodeIds.includes(o.getPluginData('nodeId')))
            .forEach(o => { if (!o.removed)
            o.remove(); });
        figObjectArrays = figObjectArrays.filter(a => !nodeIds.includes(a.nodeId));
    });
}
function figDeleteAllObjects(forceDelete = false) {
    for (const figObj of figma.currentPage.children) {
        if (figObj.removed)
            continue;
        if (figObj.getPluginData('objectId') != ''
            && figObj.getPluginData('userId') == figma.currentUser.id
            && (parseInt(figObj.getPluginData('persist')) == 0
                || forceDelete))
            figObj.remove();
    }
}
function figDeleteObjectsExcept(nodeIds, genIgnoreObjects) {
    for (let i = figObjectArrays.length - 1; i >= 0; i--) {
        const figObjArray = figObjectArrays[i];
        if (!nodeIds.includes(figObjArray.nodeId))
            continue;
        for (let j = figObjArray.objects.length - 1; j >= 0; j--) {
            const figObj = figObjArray.objects[j];
            if (figObj.removed
                || !findObject(figObj, genIgnoreObjects)) {
                if (!figObj.removed)
                    figObj.remove();
                removeFromArray(figObjArray.objects, figObj);
                if (figPoints.includes(figObj))
                    removeFromArray(figPoints, figObj);
                if (figEmptyObjects.includes(figObj))
                    removeFromArray(figEmptyObjects, figObj);
            }
            if (!figObj.removed) {
                if (parseInt(figObj.getPluginData('persist')) == 2)
                    clearObjectData(figObj);
            }
        }
        if (isEmpty(figObjArray.objects))
            removeFromArray(figObjectArrays, figObjArray);
    }
}
function findObject(figObj, genIgnoreObjects) {
    if (figObj.type == SHAPE_GROUP
        || figObj.type == FRAME) {
        for (const child of figObj.children) {
            const found = findObject(child, genIgnoreObjects);
            if (found)
                return found;
        }
    }
    else {
        const found = genIgnoreObjects.find(o => figObj.getPluginData('objectId') == o[FO_OBJECT_ID]
            && figObj.getPluginData('userId') == figma.currentUser.id
            //&& figObj.getPluginData('sessionId') == figma.currentUser.sessionId.toString()
            || o[FO_PERSIST] == 2
                && o[FO_PERSIST] == figObj.getPluginData('persist'));
        if (found)
            return found;
    }
    return null;
}
function figDeleteStylesFromNodeIds(nodeIds, mustDelete) {
    // styles are deleted first
    figma.getLocalPaintStylesAsync().then(paintStyles => {
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
// figma.currentPage.loadAsync().then(() =>
// {
// for (let i = 0; i < objNodes.length; i++)
// {
//     if (!objNodes[i]) continue;
//     for (let j = 0; j < objNodes[i].length; j++)
//     {
//         if (!objNodes[i][j]) continue;
//         const exists = figma.currentPage.children.findIndex(obj => parseInt(obj.getPluginData('objectId')) == i);
//         if (!exists) objNodes[i][j] = null;
//     }
// }
// });
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
    figDeleteTempVariableCollection();
    figPostMessageToUi({ cmd: 'updateMetrics' });
}
// from UI <--
///////////////////////////////////////////////////////////////////////////////////////////////////
figma.ui.onmessage = function (msg) {
    msg = JSON.parse(msg);
    if (msg.cmd == 'returnUiGetValueForFigma') // ignore this message in the queue
        return;
    switch (msg.cmd) {
        case 'figStartGenerator':
            figStartGenerator();
            break;
        case 'figRestartGenerator':
            figRestartGenerator();
            break;
        case 'figFinishStart':
            figFinishStart();
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
            break; // underscore is for minification
        case 'figLoadNodesAndConns':
            figLoadNodesAndConns(msg.debugMode);
            break;
        case 'figSaveNodes':
            figSaveNodes(msg.nodeIds, msg.nodeJson);
            break;
        case 'figGetAllLocalTemplateNames':
            figGetAllLocalTemplateNames();
            break;
        case 'figSaveLocalTemplate':
            figSaveLocalTemplate(msg.templateName, msg.template);
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
        case 'figLogAllSavedPages':
            figLogAllSavedPages(msg.darkMode);
            break;
        case 'figLogAllSavedConnKeys':
            figLogAllSavedConnKeys(msg.darkMode);
            break;
        case 'figLogAllLocalData':
            figLogAllLocalData(msg.darkMode);
            break;
        case 'figGetValue':
            figGetValue(msg.key, msg.spec);
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
        case 'figGetAllLocalVariables':
            figGetAllLocalVariables(msg.nodeId, msg.px, msg.py);
            break;
        //case 'figUpdateVariable':                     figUpdateVariableAsync               (msg.variableId, msg.value);                   break;
        case 'figGetAllLocalColorStyles':
            figGetAllLocalColorStyles(msg.nodeId, msg.px, msg.py);
            break;
        case 'figLinkNodeToExistingColorStyle':
            figLinkNodeToExistingColorStyle(msg.nodeId, msg.styleId);
            break;
        // case 'figUpdateViewportRect':                 figPostMessageToUi({cmd: 'uiReturnUpdateViewportRect', viewportRect: figma.viewport.bounds }); break;
        case 'figExport':
            figExport(msg.objectIds, msg.scale, msg.format, msg.suffix);
            break;
        case 'figGetObjectSize':
            figGetObjectSize(msg.object);
            break;
        case 'figGetVariableUpdates':
            figGetVariableUpdates(msg.linkedVarIds);
            break;
        case 'figUpdateShowIds':
            showIds = msg.showIds;
            break;
        case 'figUpdateObjectCenterSize':
            objectCenterSize = msg.objectCenterSize;
            break;
        case 'figDeleteAllObjects':
            figDeleteAllObjects();
            break;
        case 'figDeleteAllVariables':
            figDeleteTempVariableCollection();
            break;
        case 'figUpdateObjectsAndStyles':
            nominalObjectCount = 0;
            actualObjectCount = 0;
            msg.objects.forEach(o => o.counted = false);
            figUpdateObjectsAsync(null, msg.objects, msg.objectBatchSize, msg.totalObjects, msg.nodeIds, msg.firstChunk, msg.lastChunk, msg.zoomToFit);
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
        case 'figSaveSnapshot':
            figSaveSnapshot(msg.index, msg.objectIds);
            break;
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
function figLoadLocal(key) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield figma.clientStorage.getAsync(key);
    });
}
function figGetLocalData(key) {
    figma.currentPage.loadAsync().then(() => {
        if (key == 'canvasEmpty') {
            figPostMessageToUi({
                cmd: 'uiReturnFigGetLocalData',
                key: key,
                value: figma.currentPage.children.length == 0
            });
        }
        else if (key == 'debugWarningCrash') {
            figma.clientStorage.getAsync('debugWarning').then(data => {
                figPostMessageToUi({
                    cmd: 'uiReturnFigGetLocalData',
                    key: key,
                    value: data
                });
            });
        }
        else {
            figma.clientStorage.getAsync(key).then(data => {
                figPostMessageToUi({
                    cmd: 'uiReturnFigGetLocalData',
                    key: key,
                    value: data
                });
            });
        }
    });
}
function figSetLocalData(key, value, postToUi = true) {
    figma.clientStorage.setAsync(key, value);
    if (postToUi) {
        figPostMessageToUi({
            cmd: 'uiReturnFigSetLocalData',
            key: key,
            value: value
        });
    }
}
function figClearAllLocalData() {
    return __awaiter(this, void 0, void 0, function* () {
        const keys = yield figma.clientStorage.keysAsync();
        for (const key of keys)
            figma.clientStorage.deleteAsync(key);
    });
}
function figGetPageData(key_1) {
    return __awaiter(this, arguments, void 0, function* (key, postToUi = true) {
        yield figma.currentPage.loadAsync();
        const data = figma.currentPage.getPluginData(key);
        if (postToUi) {
            figPostMessageToUi({
                cmd: 'uiReturnFigGetPageData',
                key: key,
                value: data
            });
        }
        return data;
    });
}
function figSetPageData(key, value) {
    figClearPageData(key); // remove possible existing values first
    figma.currentPage.setPluginData(key, value);
}
function figClearPageData(key) {
    figma.currentPage.setPluginData(key, '');
}
function figLoadNodesAndConns(debugMode) {
    figma.currentPage.loadAsync().then(() => {
        // const pageIds  = figma.currentPage.getPluginData('pages');
        const pageKeys = figma.currentPage.getPluginDataKeys().filter(k => isPageKey(k));
        const nodeKeys = figma.currentPage.getPluginDataKeys().filter(k => isNodeKey(k));
        const connKeys = figma.currentPage.getPluginDataKeys().filter(k => isConnKey(k));
        if (!debugMode)
            figMarkForLoading(nodeKeys, connKeys);
        const pages = pageKeys.map(k => figma.currentPage.getPluginData(k));
        const nodes = nodeKeys.map(k => figma.currentPage.getPluginData(k));
        const conns = connKeys.map(k => figma.currentPage.getPluginData(k));
        const pageOrder = figma.currentPage.getPluginData('pageOrder').split(',');
        const currentPageId = figma.currentPage.getPluginData('currentPageId');
        initPageStyles(nodes);
        //const showAllColorSpaces = figma.currentPage.getPluginData('showAllColorSpaces');
        figPostMessageToUi({
            cmd: 'uiReturnFigLoadNodesAndConns',
            //showAllColorSpaces: showAllColorSpaces,
            pageKeys: pageKeys,
            pageJson: pages,
            pageOrder: pageOrder,
            currentPageId: currentPageId,
            nodeKeys: nodeKeys,
            nodeJson: nodes,
            connKeys: connKeys,
            connJson: conns
        });
    });
}
function initPageStyles(nodes) {
    figStyleArrays = [];
    figma.getLocalPaintStylesAsync().then(paintStyles => {
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
    });
}
function figMarkForLoading(nodeKeys, connKeys) {
    figma.currentPage.loadAsync().then(() => {
        const loadingFlag = '"loading": "true"';
        const not = '{\n';
        const set = '{\n' + HTAB + loadingFlag + ',\n';
        nodeKeys.forEach(k => figma.currentPage.setPluginData(k, figma.currentPage.getPluginData(k)
            .replace(set, not)
            .replace(not, set)));
        connKeys.forEach(k => figma.currentPage.setPluginData(k, figma.currentPage.getPluginData(k)
            .replace(set, not)
            .replace(not, set)));
    });
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
function figGetAllLocalTemplateNames() {
    return __awaiter(this, void 0, void 0, function* () {
        let keys = yield figma.clientStorage.keysAsync();
        keys = keys.filter(k => k.length >= tempTag.length
            && k.substring(0, tempTag.length) == tempTag);
        figPostMessageToUi({
            cmd: 'uiReturnGetAllLocalTemplateNames',
            templateNames: keys
        });
    });
}
function figSaveLocalTemplate(templateName, template) {
    figSetLocalData(tempTag + ' ' + templateName, template);
}
function figRemoveConnsToNodes(nodeIds) {
    figma.currentPage.loadAsync().then(() => {
        const connKeys = figma.currentPage.getPluginDataKeys().filter(k => isConnKey(k));
        for (const key of connKeys) {
            const parts = noConnTag(key).split(' ');
            if (nodeIds.includes(parts[0])
                || nodeIds.includes(parts[2]))
                figClearPageData(key);
        }
    });
}
function figRemoveSavedNodesAndConns(nodeIds) {
    figma.currentPage.loadAsync().then(() => {
        figRemoveConnsToNodes(nodeIds);
        const nodeKeys = figma.currentPage.getPluginDataKeys().filter(k => isNodeKey(k)
            && nodeIds.includes(noNodeTag(k)));
        nodeKeys.forEach(k => figClearPageData(k));
    });
}
function figRemoveAllSavedNodesAndConns() {
    figma.currentPage.loadAsync().then(() => {
        const nodeKeys = figma.currentPage.getPluginDataKeys().filter(k => isNodeKey(k));
        const connKeys = figma.currentPage.getPluginDataKeys().filter(k => isConnKey(k));
        for (const key of nodeKeys)
            figClearPageData(key);
        for (const key of connKeys)
            figClearPageData(key);
    });
}
function figLogAllSavedNodesAndConns(darkMode) {
    return __awaiter(this, void 0, void 0, function* () {
        yield figLogAllSavedNodes(darkMode);
        figLogAllSavedConns(darkMode);
    });
}
function figLogAllSavedNodes(darkMode) {
    return __awaiter(this, void 0, void 0, function* () {
        yield figma.currentPage.loadAsync();
        figma.currentPage.getPluginDataKeys()
            .filter(k => isNodeKey(k))
            .forEach((k) => __awaiter(this, void 0, void 0, function* () { return yield logSavedNode(k, darkMode); }));
    });
}
function figLogAllSavedConns(darkMode) {
    figma.currentPage.loadAsync().then(() => {
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
    });
}
function figLogAllSavedPageKeys(darkMode) {
    figma.currentPage.loadAsync().then(() => {
        const connKeys = figma.currentPage.getPluginDataKeys()
            .filter(k => isPageKey(k));
        connKeys.forEach(k => console.log('%c' + k, 'background: #fff; color: ' + (darkMode ? 'black' : 'white')));
        const pageOrder = figma.currentPage.getPluginData('pageOrder');
        console.log('%c' + pageOrder, 'background: #fff; color: ' + (darkMode ? 'black' : 'white'));
    });
}
function figLogAllSavedPages(darkMode) {
    figma.currentPage.loadAsync().then(() => {
        const connKeys = figma.currentPage.getPluginDataKeys()
            .filter(k => isPageKey(k));
        connKeys.forEach(k => console.log('%c' + figma.currentPage.getPluginData(k), 'background: #fff; color: ' + (darkMode ? 'black' : 'white')));
        const pageOrder = figma.currentPage.getPluginData('pageOrder');
        console.log('%c' + pageOrder, 'background: #fff; color: ' + (darkMode ? 'black' : 'white'));
    });
}
function figLogAllSavedConnKeys(darkMode) {
    figma.currentPage.loadAsync().then(() => {
        const connKeys = figma.currentPage.getPluginDataKeys()
            .filter(k => isConnKey(k));
        connKeys.forEach(k => console.log('%c' + k, 'background: #dff; color: ' + (darkMode ? 'black' : 'white')));
    });
}
function figLogAllLocalData(darkMode) {
    figma.clientStorage.keysAsync().then(keys => keys.forEach(k => figma.clientStorage.getAsync(k).then(val => console.log(k + ': ' + val))));
}
function figGetValue(key, spec) {
    return __awaiter(this, void 0, void 0, function* () {
        let result = null;
        switch (key) {
            case 'getVariableData':
                result = yield getVariableValuesAsync(spec);
                break;
            case 'getPaidStatus':
                result = figma.payments.status.type;
                break;
            case 'figSubscribe':
                {
                    yield figma.payments.initiateCheckoutAsync({ interstitial: 'PAID_FEATURE' });
                    result = figma.payments.status.type;
                    break;
                }
        }
        figPostMessageToUi({
            cmd: 'returnFigGetValue',
            value: result
        });
    });
}
function figGetVariableUpdates(varIds) {
    getVariableValuesAsync(varIds).then(values => {
        figPostMessageToUi({
            cmd: 'uiReturnFigGetVariableUpdates',
            values: values
        });
    });
}
function figRemoveSavedPage(pageId) {
    return __awaiter(this, void 0, void 0, function* () {
        figClearPageData(getPageKey(pageId));
        const pageOrder = (yield figGetPageData('pageOrder')).split(',');
        removeFromArrayWhere(pageOrder, id => id == pageId);
        figSetPageData('pageOrder', pageOrder.join(','));
    });
}
function figRemoveAllSavedPages() {
    figma.currentPage.loadAsync().then(() => {
        const pageKeys = figma.currentPage.getPluginDataKeys().filter(k => isPageKey(k));
        pageKeys.forEach(k => figClearPageData(k));
        figClearPageData('pageOrder');
    });
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
    figma.currentPage.loadAsync().then(() => {
        const connKeys = figma.currentPage.getPluginDataKeys().filter(k => isConnKey(k));
        connKeys.forEach(k => figClearPageData(k));
    });
}
function figDeleteSavedConnectionsToNode(nodeId) {
    figma.currentPage.loadAsync().then(() => {
        const connKeys = figma.currentPage.getPluginDataKeys().filter(k => isConnKey(k));
        for (const key of connKeys) {
            const parts = key.split(' ');
            if (parts[4] == nodeId)
                figClearPageData(key);
        }
    });
}
function figDeleteSavedConnectionsFromNode(nodeId) {
    figma.currentPage.loadAsync().then(() => {
        const connKeys = figma.currentPage.getPluginDataKeys().filter(k => isConnKey(k));
        for (const key of connKeys) {
            const parts = key.split(' ');
            if (parts[1] == nodeId)
                figClearPageData(key);
        }
    });
}
function figRemovePluginDataFromAllLocalStyles() {
    figma.getLocalPaintStylesAsync().then(localStyles => {
        for (const style of localStyles) {
            style.setPluginData('type', '');
            style.setPluginData('nodeId', '');
            style.setPluginData('existing', '');
        }
    });
}
function figSaveSnapshot(index, objectIds) {
    return __awaiter(this, void 0, void 0, function* () {
        const objects = yield figGetObjectsFromIds(objectIds);
        const group = figma.group(objects, figma.currentPage);
        const settings = { format: 'PNG' };
        const icon = yield group.exportAsync(settings);
        figma.ungroup(group);
        figPostMessageToUi({
            cmd: 'uiReturnFigSaveSnapshot',
            index: index,
            iconWidth: group.width,
            iconHeight: group.height,
            icon: icon
        });
    });
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
    // (async function()
    // {
    //     //console.log('figma.viewport.bounds =', figma.viewport.bounds);
    //     //console.log('_x =',      x);
    //     //console.log('_y =',      y);
    //     //console.log('_width =',  width);
    //     //console.log('_height =', height);
    //     const rect = {
    //         x:      Math.round(x),
    //         y:      Math.round(y),
    //         width:  Math.floor(Math.max(0, width )),
    //         height: Math.floor(Math.max(0, height))    
    //     };
    //     // if (windowDock != 'normal')
    //     //     position = true;
    //     // if (isNaN(rect.x)) rect.x = await figma.clientStorage.getAsync('windowX');
    //     // if (isNaN(rect.y)) rect.y = await figma.clientStorage.getAsync('windowY');
    //     // dockWindow(
    //     //     windowDock,
    //     //     rect, 
    //     //     figma.viewport.bounds);
    //     figma.ui.reposition(rect.x,     rect.y     );
    //     figma.ui.resize    (rect.width, rect.height);
    //     figma.clientStorage.setAsync('windowX',      rect.x     );
    //     figma.clientStorage.setAsync('windowY',      rect.y     );
    //     figma.clientStorage.setAsync('windowWidth',  rect.width );
    //     figma.clientStorage.setAsync('windowHeight', rect.height);
    //     figPostMessageToUi({cmd: 'uiReturnFigSetWindowRect'});
    // })();
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
            //let position = false;
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
            // width  = Math.round(width );
            // height = Math.round(height);
            // console.log('width =',  width);
            // console.log('height =', height);
            figma.ui.resize(width, height);
            yield figma.currentPage.loadAsync();
            figma.currentPage.setPluginData(figma.currentUser.id + ',windowWidth', width.toString());
            figma.currentPage.setPluginData(figma.currentUser.id + ',windowHeight', height.toString());
            // if (position)
            // {
            //     figma.ui.reposition(x, y);
            //     figma.clientStorage.setAsync('windowX', x);
            //     figma.clientStorage.setAsync('windowY', y);
            // }
            figPostMessageToUi({
                cmd: 'uiReturnFigResizeWindow',
                width: width,
                height: height
            });
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
function figGetValueFromUiSync(key_1) {
    return __awaiter(this, arguments, void 0, function* (key, params = null) {
        return yield figGetValueFromUi(key, params);
    });
}
function figGetValueFromUi(key_1) {
    return __awaiter(this, arguments, void 0, function* (key, params = null) {
        return new Promise((resolve, reject) => {
            const timeout = 60000;
            figPostMessageToUi(Object.assign({ cmd: 'uiGetValueForFigma', key: key }, (params || {})));
            const timeoutId = setTimeout(() => reject(new Error('Timeout: Result not received by Figma within the specified time')), timeout);
            function handleMessage(msg) {
                msg = JSON.parse(msg);
                if (msg.cmd === 'returnUiGetValueForFigma') {
                    clearTimeout(timeoutId);
                    resolve({
                        key: msg.key,
                        value: msg.value
                    });
                    figma.ui.off('message', handleMessage);
                }
            }
            figma.ui.on('message', handleMessage);
        });
    });
}
var _genIgnoreNodeIds = [];
var _genIgnoreObjects = [];
var nominalObjectCount = 0;
var actualObjectCount = 0;
function figUpdateObjectsAsync(figParent_1, genObjects_1, batchSize_1) {
    return __awaiter(this, arguments, void 0, function* (figParent, genObjects, batchSize, totalObjects = -1, nodeIds = [], firstChunk = false, lastChunk = false, zoomToFit = false, addProps = true, transform = true) {
        let abort = false;
        const updateObjects = [];
        let updateObjectCount = 0;
        _genIgnoreNodeIds.push(...nodeIds);
        if (totalObjects > -1)
            nominalObjectCount = totalObjects;
        for (const genObj of genObjects) {
            if (genObj[FO_TYPE] == VARIABLE)
                yield figUpdateVariableObjectAsync(genObj);
            else
                yield figUpdateGeometricObjectAsync(genObj, updateObjects, updateObjectCount, batchSize, abort, figParent, addProps, transform);
            updateObjectCount++;
            if (updateObjectCount >= batchSize) {
                const result = yield figGetValueFromUiSync('returnObjectUpdate', {
                    nominalObjectCount: nominalObjectCount,
                    actualObjectCount: actualObjectCount
                });
                abort = result.value;
                updateObjectCount = 0;
                if (abort)
                    break;
            }
        }
        // delete removed objects from parent
        if (figParent != undefined
            && figParent != null
            && !figParent.removed) {
            for (const figObj of figParent.children) {
                if (figObj != undefined
                    && figObj != null
                    && figObj.removed
                    || !genObjects.find(o => o[FO_OBJECT_ID] == figObj.getPluginData('objectId')
                        && figObj.getPluginData('userId') == figma.currentUser.id))
                    //&& figObj.getPluginData('sessionId') == figma.currentUser.sessionId.toString()))
                    figObj.remove();
            }
        }
        // put points on top
        for (const point of figPoints) {
            if (point.parent == figma.currentPage)
                yield figma.currentPage.loadAsync();
            if (point != undefined
                && point != null
                && !point.removed
                && !point.parent.removed)
                point.parent.appendChild(point);
        }
        if (lastChunk
            && !abort) {
            // delete old content
            figDeleteObjectsExcept(_genIgnoreNodeIds, _genIgnoreObjects);
            _genIgnoreNodeIds = [];
            _genIgnoreObjects = [];
            if (zoomToFit
                && updateObjects.length > 0) {
                figma.viewport.scrollAndZoomIntoView(updateObjects);
                const bounds = figGetObjectBounds(updateObjects);
                figma.viewport.zoom = Math.min(figma.viewport.bounds.width * figma.viewport.zoom / bounds.width - 0.05, figma.viewport.bounds.height * figma.viewport.zoom / bounds.height - 0.05);
            }
        }
        yield figGetValueFromUiSync('returnObjectUpdate', {
            nominalObjectCount: nominalObjectCount,
            actualObjectCount: actualObjectCount
        });
    });
}
function figUpdateVariableObjectAsync(genVar) {
    return __awaiter(this, void 0, void 0, function* () {
        const varId = genVar[FO_OBJECT_ID];
        const varValue = genVar[FO_VARIABLE_VALUE];
        let figVar;
        if (varId == NULL) // not linked yet
         {
            const varName = genVar[FO_OBJECT_NAME];
            const nameParts = varName.split('/');
            console.assert(nameParts.length > 1, 'nameParts must be > 1');
            let collection;
            if (nameParts.length > 1) {
                collection = yield figGetVariableCollectionByNameAsync(nameParts[0]);
                if (!collection)
                    collection = yield figCreateVariableCollectionAsync(nameParts[0]);
            }
        }
        // else // linked already
        //     let figVar = await figLinkNodeToVariableAsync(genVar[FO_NODE_ID], genVar[FO_OBJECT_ID]);
        console.assert(figVar, 'variable must have been created');
        console.log('figVar =', figVar);
        yield figUpdateVariableAsync(figVar.id, varValue);
    });
}
function figUpdateGeometricObjectAsync(genObj, updateObjects, updateObjectCount, batchSize, abort, figParent, addProps, transform) {
    return __awaiter(this, void 0, void 0, function* () {
        _genIgnoreObjects.push(genObj);
        let figObjects = null;
        let curNodeId = NULL;
        if (genObj[FO_NODE_ID] != curNodeId) {
            curNodeId = genObj[FO_NODE_ID];
            figObjects = figObjectArrays.find(a => a.nodeId == genObj[FO_NODE_ID]);
            if (!figObjects) {
                figObjectArrays.push(figObjects =
                    {
                        nodeId: genObj[FO_NODE_ID],
                        objects: []
                    });
            }
        }
        const addObject = figObj => {
            if (figParent != undefined
                && figParent != null
                && !figParent.removed)
                figParent.appendChild(figObj);
            else
                figObjects.objects.push(figObj);
        };
        let objects = figParent != undefined
            && figParent != null
            && !figParent.removed
            ? figParent.children
            : figObjects.objects;
        let figObj = objects.find(o => o.removed
            || o.getPluginData('userId') == figma.currentUser.id
                && o.getPluginData('objectId') == genObj[FO_OBJECT_ID]);
        if (figObj != undefined
            && figObj != null
            && figObj.removed) {
            removeFrom(objects, figObj);
            if (figPoints.includes(figObj))
                removeFromArray(figPoints, figObj);
            if (figEmptyObjects.includes(figObj))
                removeFromArray(figEmptyObjects, figObj);
        }
        if (figObj == undefined
            || figObj == null
            || figObj.removed) // no existing object, create new one
         {
            const newObj = yield figCreateObject(genObj, addObject, addProps, transform);
            updateObjects.push(newObj);
        }
        else if (figObj != undefined
            && figObj != null
            && !figObj.removed
            && figObj.getPluginData('type') == genObj[FO_TYPE].toString()) // update existing object
         {
            yield figUpdateObjectAsync(figObj, genObj, addProps, transform);
            if (figObj != undefined
                && figObj != null
                && !figObj.removed)
                updateObjects.push(figObj);
        }
        else // delete existing object, create new one
         {
            figObj.remove();
            if (figPoints.includes(figObj))
                removeFromArray(figPoints, figObj);
            if (figEmptyObjects.includes(figObj))
                removeFromArray(figEmptyObjects, figObj);
            yield figCreateObject(genObj, addObject, addProps, transform);
        }
    });
}
function makeObjectName(obj) {
    return (obj[FO_PERSIST] === 2 ? '' : OBJECT_PREFIX)
        + (showIds ? obj[FO_OBJECT_ID] : obj[FO_OBJECT_NAME]);
}
function figCreateObject(genObj_1) {
    return __awaiter(this, arguments, void 0, function* (genObj, addObject = null, addProps = true, transform = true) {
        if (!genObjectIsValid(genObj))
            return null;
        let figObj;
        switch (genObj[FO_TYPE]) {
            case RECTANGLE:
                figObj = figCreateRect(genObj, addProps, transform);
                break;
            case LINE:
                figObj = figCreateLine(genObj, addProps, transform);
                break;
            case ELLIPSE:
                figObj = figCreateEllipse(genObj, addProps, transform);
                break;
            case POLYGON:
                figObj = figCreatePolygon(genObj, addProps, transform);
                break;
            case STAR:
                figObj = figCreateStar(genObj, addProps, transform);
                break;
            case TEXT_SHAPE:
                figObj = figCreateText(genObj, addProps, transform);
                break;
            case POINT:
                figObj = figCreatePoint(genObj);
                break;
            case VECTOR_PATH:
                figObj = figCreateVectorPath(genObj, addProps, transform);
                break;
            case VECTOR_NETWORK:
                figObj = figCreateVectorNetwork(genObj, addProps, transform);
                break;
            case SHAPE_BOOLEAN:
                figObj = yield figCreateShapeBooleanAsync(genObj, addProps, transform);
                break;
            case SHAPE_GROUP:
                figObj = yield figCreateShapeGroupAsync(genObj);
                break;
            case FRAME:
                figObj = yield figCreateFrameAsync(genObj, addProps, transform);
                break;
            case VARIABLE:
                figObj = yield figCreateVariableAsync(genObj);
                break;
        }
        if (addObject
            && figObj != undefined
            && figObj != null
            && !figObj.removed) {
            figObj.name = makeObjectName(genObj);
            consoleAssert(genObj[FO_TYPE] == SHAPE_GROUP // cannot exist without children
                || !!figObj, 'no Figma object created');
            if (figObj != undefined
                && figObj != null) {
                figObj.setPluginData('persist', genObj[FO_PERSIST].toString());
                if (genObj[FO_PERSIST] < 2) {
                    figObj.setPluginData('userId', figma.currentUser.id);
                    figObj.setPluginData('sessionId', figma.currentUser.sessionId.toString());
                    figObj.setPluginData('type', genObj[FO_TYPE]);
                    figObj.setPluginData('nodeId', genObj[FO_NODE_ID]);
                    figObj.setPluginData('objectId', genObj[FO_OBJECT_ID]);
                    figObj.setPluginData('isCenter', boolToString(genObj[FO_IS_CENTER]));
                    if (genObj[FO_TYPE] == POINT)
                        figPoints.push(figObj);
                    if (genObj[FO_DECO])
                        updateDecoObject(figObj);
                }
                addObject(figObj);
            }
        }
        if (!genObj.counted) {
            actualObjectCount++;
            genObj.counted = true;
        }
        return figObj;
    });
}
function figUpdateObjectAsync(figObj, genObj, addProps, transform) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!genObjectIsValid(genObj)
            || figObj == undefined
            || figObj == null
            || figObj.removed)
            return;
        figObj.name = makeObjectName(genObj);
        figObj.setPluginData('persist', genObj[FO_PERSIST].toString());
        switch (genObj[FO_TYPE]) {
            case RECTANGLE:
                figUpdateRect(figObj, genObj, addProps, transform);
                break;
            case LINE:
                figUpdateLine(figObj, genObj, addProps, transform);
                break;
            case ELLIPSE:
                figUpdateEllipse(figObj, genObj, addProps, transform);
                break;
            case POLYGON:
                figUpdatePolygon(figObj, genObj, addProps, transform);
                break;
            case STAR:
                figUpdateStar(figObj, genObj, addProps, transform);
                break;
            case TEXT_SHAPE:
                figUpdateText(figObj, genObj, addProps, transform);
                break;
            case POINT:
                figUpdatePoint(figObj, genObj);
                break;
            case VECTOR_PATH:
                figUpdateVectorPath(figObj, genObj, addProps, transform);
                break;
            case VECTOR_NETWORK:
                figUpdateVectorNetwork(figObj, genObj, addProps, transform);
                break;
            case SHAPE_BOOLEAN:
                figUpdateBoolean(figObj, genObj, addProps, transform);
                break;
            case SHAPE_GROUP:
                figUpdateShapeGroup(figObj, genObj);
                break;
            case FRAME:
                figUpdateFrame(figObj, genObj, addProps, transform);
                break;
            case VARIABLE:
                yield figUpdateVariableAsync(figObj, genObj);
                break;
        }
        if (figObj != undefined
            && figObj != null
            && !figObj.removed) {
            if (figObj.parent == figma.currentPage)
                yield figma.currentPage.loadAsync();
            figObj.parent.appendChild(figObj);
            if (genObj[FO_DECO])
                updateDecoObject(figObj);
        }
        if (!genObj.counted) {
            actualObjectCount++;
            genObj.counted = true;
        }
    });
}
function genObjectIsValid(genObj) {
    switch (genObj[FO_TYPE]) {
        case RECTANGLE: return genRectIsValid(genObj);
        case LINE: return genLineIsValid(genObj);
        case ELLIPSE: return genEllipseIsValid(genObj);
        case POLYGON: return genPolygonIsValid(genObj);
        case STAR: return genStarIsValid(genObj);
        case TEXT_SHAPE: return genTextIsValid(genObj);
        case POINT: return genPointIsValid(genObj);
        case VECTOR_PATH: return genVectorPathIsValid(genObj);
        case VECTOR_NETWORK: return genVectorNetworkIsValid(genObj);
        case SHAPE_BOOLEAN: return genBooleanIsValid(genObj);
        case SHAPE_GROUP: return genShapeGroupIsValid(genObj);
        case FRAME: return genFrameIsValid(genObj);
    }
}
function figGetObjectSize(genObj) {
    return __awaiter(this, void 0, void 0, function* () {
        (() => __awaiter(this, void 0, void 0, function* () {
            const figObj = yield figCreateObject(genObj);
            const width = figObj.width;
            const height = figObj.height;
            figObj.remove();
            figPostMessageToUi({
                cmd: 'uiForwardToGenerator',
                msg: {
                    cmd: 'returnFigGetObjectSize',
                    objectId: genObj[FO_OBJECT_ID],
                    width: width,
                    height: height
                }
            });
        }))();
    });
}
function clearObjectData(figObj) {
    figObj.setPluginData('type', '');
    figObj.setPluginData('nodeId', '');
    figObj.setPluginData('userId', '');
    figObj.setPluginData('sessionId', '');
    figObj.setPluginData('objectId', '');
    figObj.setPluginData('isCenter', '');
    figObj.setPluginData('persist', '');
}
function figGetObjectBounds(objects) {
    const bounds = {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
    };
    for (const obj of objects) {
        if (obj.x < bounds.left || bounds.left == bounds.right)
            bounds.left = obj.x;
        if (obj.y < bounds.top || bounds.top == bounds.bottom)
            bounds.top = obj.y;
        if (obj.x + obj.width > bounds.right || bounds.left == bounds.right)
            bounds.right = obj.x + obj.width;
        if (obj.y + obj.height > bounds.bottom || bounds.top == bounds.bottom)
            bounds.bottom = obj.y + obj.height;
    }
    return {
        x: bounds.left,
        y: bounds.top,
        width: bounds.right - bounds.left,
        height: bounds.bottom - bounds.top
    };
}
function figExport(objectIds, scale, format, suffix) {
    return __awaiter(this, void 0, void 0, function* () {
        yield figma.currentPage.loadAsync();
        for (const objId of objectIds) {
            let figObj = figma.currentPage.children.find(o => !o.removed
                && o.getPluginData('userId') == figma.currentUser.id
                && o.getPluginData('objectId') == objId);
            if (!figObj)
                continue;
            const settings = {
                constraint: {
                    type: 'SCALE',
                    value: scale
                },
                format: format == 0 ? 'PNG' : 'JPG',
                suffix: suffix
            };
            yield figObj.exportAsync(settings);
        }
    });
}
const figEmptyObjects = [];
const figDecoObjects = [];
function getObjectEffects(genObjEffects, canSpread) {
    const effects = [];
    for (const effect of genObjEffects) {
        const type = effect[0];
        switch (type) {
            case 'DROP_SHADOW':
                {
                    const color = {
                        r: Math.min(Math.max(0, effect[1]), 1),
                        g: Math.min(Math.max(0, effect[2]), 1),
                        b: Math.min(Math.max(0, effect[3]), 1),
                        a: Math.min(Math.max(0, effect[4]), 1)
                    };
                    const offset = {
                        x: effect[5],
                        y: effect[6]
                    };
                    const radius = effect[7];
                    const spread = effect[8];
                    const blend = effect[9];
                    const behind = effect[10];
                    const visible = effect[11];
                    if (!isNaN(color.r)
                        && !isNaN(color.g)
                        && !isNaN(color.b)
                        && !isNaN(color.a)
                        && !isNaN(offset.x)
                        && !isNaN(offset.y)
                        && !isNaN(radius)) {
                        effects.push({
                            type: type,
                            color: color,
                            offset: offset,
                            radius: radius,
                            visible: visible,
                            blendMode: blend,
                            showShadowBehindNode: behind,
                            boundVariables: {}
                        });
                        if (canSpread
                            && !isNaN(spread))
                            effects[effects.length - 1]['spread'] = spread;
                    }
                    break;
                }
            case 'INNER_SHADOW':
                {
                    const color = {
                        r: Math.min(Math.max(0, effect[1]), 1),
                        g: Math.min(Math.max(0, effect[2]), 1),
                        b: Math.min(Math.max(0, effect[3]), 1),
                        a: Math.min(Math.max(0, effect[4]), 1)
                    };
                    const offset = {
                        x: effect[5],
                        y: effect[6]
                    };
                    const radius = effect[7];
                    const spread = effect[8];
                    const blend = effect[9];
                    const visible = effect[10];
                    if (!isNaN(color.r)
                        && !isNaN(color.g)
                        && !isNaN(color.b)
                        && !isNaN(color.a)
                        && !isNaN(offset.x)
                        && !isNaN(offset.y)
                        && !isNaN(radius)
                        && !isNaN(spread)) {
                        effects.push({
                            type: type,
                            color: color,
                            offset: offset,
                            radius: radius,
                            spread: spread,
                            visible: visible,
                            blendMode: blend,
                            boundVariables: {}
                        });
                    }
                    break;
                }
            case 'LAYER_BLUR':
                {
                    const radius = effect[1];
                    const visible = effect[2];
                    if (!isNaN(radius)) {
                        effects.push({
                            type: type,
                            visible: visible,
                            radius: Math.max(0, radius),
                            boundVariables: {}
                        });
                    }
                    break;
                }
            case 'BACKGROUND_BLUR':
                {
                    const radius = effect[1];
                    const visible = effect[2];
                    if (!isNaN(radius)) {
                        effects.push({
                            type: type,
                            visible: visible,
                            radius: Math.max(0, radius),
                            boundVariables: {}
                        });
                    }
                    break;
                }
        }
    }
    return effects;
}
function setObjectProps(figObj, genObj, phantom = true) {
    // if (genObj.badTransform)
    //     return;
    setObjectEffects(figObj, genObj);
    setObjectStrokes(figObj, genObj, phantom);
    setObjectFills(figObj, genObj);
    figObj.opacity = genObj[FO_OPACITY];
    figObj.blendMode = genObj[FO_BLEND];
    const maskType = genObj[FO_MASK];
    figObj.isMask = maskType > 0;
    if (figObj.isMask) {
        switch (maskType) {
            case 1:
                figObj.maskType = 'ALPHA';
                break;
            case 2:
                figObj.maskType = 'VECTOR';
                break;
            case 3:
                figObj.maskType = 'LUMINANCE';
                break;
        }
    }
    if (figObj.isMask
        && figObj.fills.length == 0
        && figObj.strokes.length == 0)
        figObj.fills =
            [{
                    type: 'SOLID',
                    color: { r: 0, g: 0, b: 0 },
                    opacity: 1,
                    blendMode: 'NORMAL'
                }];
}
function setObjectFills(figObj, genObj) {
    if (!!genObj[FO_FILLS]
        && !isEmpty(genObj[FO_FILLS])) {
        figObj.fills = getObjectFills(genObj[FO_FILLS]);
        if (figEmptyObjects.includes(figObj))
            removeFromArray(figEmptyObjects, figObj);
    }
    else
        figObj.fills = [];
}
function setObjectStrokes(figObj, genObj, phantom = true) {
    if (genObj[FO_STROKES] != null
        && !isEmpty(genObj[FO_STROKES])) {
        setObjectStroke_(figObj, getObjectFills(genObj[FO_STROKES]), genObj[FO_STROKE_WEIGHT], genObj[FO_STROKE_ALIGN], genObj[FO_STROKE_JOIN], genObj[FO_STROKE_MITER], genObj[FO_STROKE_CAP], parseStrokeDashes(genObj[FO_STROKE_DASHES]));
        if (genObj[FO_DECO])
            figObj.setPluginData('dashes', genObj[FO_STROKE_DASHES]); // for updating deco polys
        if (figEmptyObjects.includes(figObj))
            removeFromArray(figEmptyObjects, figObj);
        if (genObj[FO_DECO])
            pushUnique(figDecoObjects, figObj);
    }
    else if (isEmpty(genObj[FO_FILLS])
        && isEmpty(genObj[FO_STROKES])
        && !genObj[FO_MASK]
        && phantom) {
        setEmptyObjectStroke(figObj);
        pushUnique(figEmptyObjects, figObj);
    }
    else
        figObj.strokes = [];
}
function parseStrokeDashes(_dashes) {
    _dashes = _dashes;
    _dashes = trimCharFromStart(_dashes, ',');
    _dashes = trimCharFromEnd(_dashes, ',');
    _dashes = _dashes.trim();
    return _dashes == ''
        ? []
        : _dashes.split(',').map(s => Math.max(0, parseFloat(s)));
}
function parseDecoStrokeDashes(_dashes) {
    _dashes = _dashes;
    _dashes = trimCharFromStart(_dashes, ',');
    _dashes = trimCharFromEnd(_dashes, ',');
    _dashes = _dashes.trim();
    return _dashes == ''
        ? []
        : _dashes.split(',').map(s => Math.max(0, parseFloat(s) / curZoom));
}
function setObjectStroke_(figObj, fills, weight, align, join, miterLimit, cap, dashes = []) {
    figObj.strokes = fills;
    figObj.strokeWeight = Math.max(0, weight);
    figObj.strokeAlign = align;
    figObj.strokeJoin = join;
    const miterAngle = miterLimit / 360 * Tau;
    const _miterLimit = 1 / Math.sin(miterAngle / 2);
    figObj.strokeMiterLimit = Math.min(Math.max(0, _miterLimit), 16);
    figObj.strokeCap = cap;
    figObj.dashPattern = dashes;
}
function setObjectEffects(figObj, genObj) {
    if (!!genObj[FO_EFFECTS]
        && !isEmpty(genObj[FO_EFFECTS])) {
        const canSpread = genObj[FO_TYPE] == RECTANGLE
            || genObj[FO_TYPE] == ELLIPSE
            || genObj[FO_TYPE] == FRAME;
        figObj.effects = getObjectEffects(genObj[FO_EFFECTS], canSpread);
    }
    else
        figObj.effects = [];
}
function updateEmptyObjects() {
    for (const obj of figEmptyObjects) {
        if (obj.removed)
            removeFromArray(figEmptyObjects, obj);
        else
            setEmptyObjectStroke(obj);
    }
}
function setEmptyObjectStroke(obj) {
    figma.currentPage.loadAsync().then(() => {
        const back = figma.currentPage.backgrounds.find(b => b.type == 'SOLID');
        let phantomColor;
        if (back) {
            const l = back.color.r * 0.2126
                + back.color.g * 0.7152
                + back.color.b * 0.0722;
            phantomColor =
                l > 0.5
                    ? { r: 0, g: 0, b: 0 }
                    : { r: 1, g: 1, b: 1 };
        }
        else
            phantomColor = { r: 1, g: 0, b: 1 };
        setObjectStroke_(obj, [{ type: 'SOLID',
                color: phantomColor,
                opacity: 0.5 }], 1 / curZoom, 'CENTER', 'MITER', 1, 'NONE', [1 / curZoom,
            2 / curZoom]);
    });
}
function updateDecoObjects() {
    for (const figObj of figDecoObjects) {
        if (figObj.removed)
            removeFromArray(figDecoObjects, figObj);
        else
            updateDecoObject(figObj);
    }
}
function updateDecoObject(figObj) {
    figObj.strokeWeight = Math.max(0, 1.5 / curZoom);
    if (parseBool(figObj.getPluginData('isCenter'))) {
        const path = figObj.vectorPaths[0];
        const parts = path.data.split(' ');
        let t = { x: parseFloat(parts[1]), y: parseFloat(parts[2]) };
        let c = { x: parseFloat(parts[4]), y: parseFloat(parts[5]) };
        let r = { x: parseFloat(parts[7]), y: parseFloat(parts[8]) };
        const a = 2;
        const b = 0.05;
        const f = 1 - Math.pow(1 - Math.min(curZoom, 1), a) / Math.pow(a, b);
        t = addv(c, mulvs(unitv(subv(t, c)), objectCenterSize / f));
        r = addv(c, mulvs(unitv(subv(r, c)), objectCenterSize / f));
        parts[1] = t.x;
        parts[2] = t.y;
        parts[4] = c.x;
        parts[5] = c.y;
        parts[7] = r.x;
        parts[8] = r.y;
        const newPath = {
            windingRule: path.windingRule,
            data: parts.join(' ')
        };
        figObj.vectorPaths = [newPath];
    }
    const dashes = figObj.getPluginData('dashes');
    if (dashes != '')
        figObj.dashPattern = parseDecoStrokeDashes(dashes);
}
function figGetAllLocalColorStyles(nodeId, px, py) {
    figma.getLocalPaintStylesAsync().then(_styles => {
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
    });
}
function figLinkNodeToExistingColorStyle(nodeId, styleId) {
    figma.getLocalPaintStylesAsync().then(localStyles => {
        if (styleId != NULL)
            figLinkColorStyle(localStyles, nodeId, styleId);
        else
            figClearColorStyle(localStyles, nodeId);
    });
}
function figLinkColorStyle(localStyles, nodeId, styleId, clearExisting = true) {
    const figStyles = figStyleArrays.find(a => a.nodeId == nodeId);
    if (figStyles
        && clearExisting)
        figClearColorStyle(localStyles, nodeId);
    const figStyle = localStyles.find(s => s.id == styleId);
    consoleAssert(!!figStyle, 'figStyle should be found here');
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
    consoleAssert(!!figStyle, 'figStyle should be found here');
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
    figStyle.setPluginData('type', genStyle[FO_TYPE]);
    figStyle.setPluginData('nodeId', genStyle[FO_NODE_ID]);
    //figStyle.setPluginData('existing', boolToString(genStyle.existing));
    figStyle.name = genStyle[FO_STYLE_NAME];
    setStylePaints(figStyle, genStyle);
    styles.push(figStyle);
    figPostMessageToUi({
        cmd: 'uiSetStyleId',
        nodeId: genStyle[FO_NODE_ID],
        styleId: figStyle.id
    });
    return figStyle;
}
function figUpdateStyles(msg) {
    let curNodeId = NULL;
    let figStyles;
    for (const genStyle of msg.styles) {
        if (genStyle[FO_NODE_ID] != curNodeId) {
            curNodeId = genStyle[FO_NODE_ID];
            figStyles = figStyleArrays.find(a => a.nodeId == genStyle[FO_NODE_ID]);
            if (!figStyles) {
                figStyles = {
                    nodeId: genStyle[FO_NODE_ID],
                    //existing: genStyle.existing, 
                    styles: []
                };
                figStyleArrays.push(figStyles);
            }
        }
        else
            figStyles = null;
        const figStyle = figStyles.styles[0];
        figma.getLocalPaintStylesAsync().then(localStyles => {
            const localStyle = localStyles.find(s => s.getPluginData('nodeId') == genStyle[FO_NODE_ID]);
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
                    figLinkNodeToExistingColorStyle(genStyle[FO_NODE_ID], genStyle[FO_STYLE_ID]);
                    //figCreateColorStyle(figStyles.styles, genStyle);
                }
            }
            else if (isValid(figStyle)
                && figStyle.getPluginData('type') == genStyle[FO_TYPE]) // update existing style
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
        });
    }
}
function figUpdateColorStyle(figStyle, genStyle) {
    setStylePaints(figStyle, genStyle);
    figStyle.name = genStyle[FO_STYLE_NAME];
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
function setStylePaints(figStyle, genStyle) {
    if (!isEmpty(genStyle[FO_STYLE_PAINTS]))
        figStyle.paints = getStylePaints(genStyle[FO_STYLE_PAINTS]);
    else
        figStyle.paints = [];
}
function genVariableIsValid(genVariable) {
    return genVariable[FO_VARIABLE_TYPE] != null
        && genVariable[FO_VARIABLE_VALUE] != null;
}
function figCreateVariableAsync(genVariable) {
    return __awaiter(this, void 0, void 0, function* () {
        //     if (!genRectIsValid(genVariable))
        //         return null;
        //     const figVariable = null;//figma.createRectangle();
        //     await figUpdateVariableAsync(figVariable, genVariable, true);
        //     return figVariable;
    });
}
//async function figUpdateVariableAsync(figVariable, genVariable, isValid = false)
//{
//     if (   !isValid
//         && !genVariableIsValid(genVariable))
//         return;
//     const foundCorners = genVariable[FO_EFFECTS].findIndex(e => e[0] == 'ROUND_CORNERS');
//     if (foundCorners > -1)
//     {
//         const corners = genVariable[FO_EFFECTS][foundCorners];
//         figVariable.topLeftRadius     = corners[1];
//         figVariable.topRightRadius    = corners[2];
//         figVariable.bottomLeftRadius  = corners[3];
//         figVariable.bottomRightRadius = corners[4];
//     }
//     else
//         figVariable.cornerRadius = genVariable[FO_RECT_ROUND];
//     if (transform)
//         setObjectTransform(figVariable, genVariable);
//     setObjectProps(figVariable, genVariable, addProps);
//     figUpdateStrokeSides(figVariable, genVariable);
//}
function figCreateVariableCollectionAsync(name) {
    return __awaiter(this, void 0, void 0, function* () {
        const collection = yield figma.variables.createVariableCollection(name);
        collection.setPluginData('userId', figma.currentUser.id);
        collection.setPluginData('sessionId', figma.currentUser.sessionId.toString());
        return collection;
    });
}
function figGetVariableCollectionByNameAsync(name) {
    return __awaiter(this, void 0, void 0, function* () {
        const collections = yield figma.variables.getLocalVariableCollectionsAsync();
        for (const collection of collections) {
            if (collection.name == name)
                return collection;
        }
        return null;
    });
}
function figGetVariableFromData(nodeId, varName) {
    return __awaiter(this, void 0, void 0, function* () {
        const collections = yield figma.variables.getLocalVariableCollectionsAsync();
        for (const collection of collections) {
            for (const varId of collection.variableIds) {
                const variable = yield figma.variables.getVariableByIdAsync(varId);
                if (variable.getPluginData('nodeId') == nodeId
                    && variable.name == varName)
                    return variable;
            }
        }
        return null;
    });
}
function figGetAllLocalVariables(nodeId, px, py) {
    figma.variables.getLocalVariablesAsync().then((localVars) => __awaiter(this, void 0, void 0, function* () {
        const variables = new Array();
        for (const _var of localVars) {
            try {
                const collection = yield figma.variables.getVariableCollectionByIdAsync(_var.variableCollectionId);
                const variable = {
                    id: _var.id,
                    resolvedType: _var.resolvedType,
                    name: _var.name,
                    collectionName: collection.name
                };
                variables.push(variable);
            }
            catch (ex) {
            }
        }
        figma.variables.getLocalVariableCollectionsAsync().then((collections) => __awaiter(this, void 0, void 0, function* () {
            figPostMessageToUi({
                cmd: 'uiReturnFigGetAllLocalVariables',
                nodeId: nodeId,
                px: px,
                py: py,
                variables: JSON.stringify(variables),
                nCollections: collections.length
            });
        }));
    }));
}
function getVariableValuesAsync(varIds) {
    return __awaiter(this, void 0, void 0, function* () {
        const localVars = yield figma.variables.getLocalVariablesAsync();
        const variables = varIds.map(id => localVars.find(v => v.id == id));
        let values = [];
        for (let i = 0; i < varIds.length; i++) {
            const variable = variables[i];
            const collection = variable != undefined // deleted
                ? (yield figma.variables.getVariableCollectionByIdAsync(variable.variableCollectionId))
                : null;
            if (collection) {
                const vals = [];
                for (const mode of collection.modes) {
                    let _var = variable;
                    let value = _var.valuesByMode[mode.modeId];
                    while (value && value.type === 'VARIABLE_ALIAS') {
                        _var = yield figma.variables.getVariableByIdAsync(value.id);
                        value = _var.valuesByMode[mode.modeId];
                    }
                    vals.push(value);
                }
                values.push({
                    id: varIds[i],
                    name: variable.name,
                    resolvedType: variable.resolvedType,
                    value: vals[0]
                });
            }
            else {
                values.push({
                    id: varIds[i],
                    resolvedType: NULL,
                    value: null
                });
            }
        }
        return values;
    });
}
function figUpdateVariableAsync(varId, value) {
    return __awaiter(this, void 0, void 0, function* () {
        let variable = yield figma.variables.getVariableByIdAsync(varId);
        if (!variable)
            return;
        let collection = yield figma.variables.getVariableCollectionByIdAsync(variable.variableCollectionId);
        let mode = collection.modes[0];
        // resolve if alias
        let curValue = variable.valuesByMode[mode.modeId];
        while (curValue
            && curValue.hasOwnProperty('type')
            && curValue['type'] === 'VARIABLE_ALIAS') {
            variable = yield figma.variables.getVariableByIdAsync(curValue['id']);
            curValue = variable.valuesByMode[mode.modeId];
            collection = yield figma.variables.getVariableCollectionByIdAsync(variable.variableCollectionId);
            mode = collection.modes[0];
        }
        if (value !== null) {
            if (variable.resolvedType == 'BOOLEAN')
                value = value != 0;
            else
                variable.setValueForMode(mode.modeId, value);
        }
    });
}
// async function figLinkNodeToVariableAsync(nodeId, varId, varType, varName, collection = null)
// {
//     const localVars = await figma.variables.getLocalVariablesAsync();
//     if (!collection)
//     {
//         const collections = await figma.variables.getLocalVariableCollectionsAsync();
//         collection = 
//             collections.length > 0 
//             ? collections[0]
//             : null;
//     }
//     return collection
//         ? await figLinkVariableAsync(localVars, nodeId, varId, varType, varName, collection)
//         : null;
// }
function figLinkNodeToVariableAsync(nodeId, varId) {
    return __awaiter(this, void 0, void 0, function* () {
        const variable = yield figma.variables.getVariableByIdAsync(varId);
        console.assert(variable != null, 'variable must exist');
        variable.setPluginData('userId', figma.currentUser.id);
        variable.setPluginData('sessionId', figma.currentUser.sessionId.toString());
        variable.setPluginData('nodeId', nodeId);
        const [resolvedVar, values] = yield figGetResolvedVariableValuesAsync(variable);
        figPostMessageToUi({
            cmd: 'uiReturnFigLinkNodeToVariable',
            nodeId: nodeId,
            variableId: resolvedVar ? resolvedVar.id : NULL,
            variableName: resolvedVar ? resolvedVar.name : '',
            resolvedType: resolvedVar ? resolvedVar.resolvedType : NULL,
            values: values
        });
        return resolvedVar;
    });
}
function figGetResolvedVariableValuesAsync(variable) {
    return __awaiter(this, void 0, void 0, function* () {
        const values = [];
        if (!variable)
            return values;
        const collection = yield figma.variables.getVariableCollectionByIdAsync(variable.variableCollectionId);
        for (const mode of collection.modes) {
            let value = variable.valuesByMode[mode.modeId];
            while (value
                && value['type'] === 'VARIABLE_ALIAS') {
                variable = yield figma.variables.getVariableByIdAsync(value.id);
                value = variable.valuesByMode[mode.modeId];
            }
            values.push(value);
        }
        return [variable, values];
    });
}
function figDeleteTempVariableCollection(forceDelete = false) {
    if (tempVariableCollection)
        tempVariableCollection.remove();
}
function getFigmaTransform(tl, tr, bl) {
    let vr = point(tr.x - tl.x, tr.y - tl.y);
    let vb = point(bl.x - tl.x, bl.y - tl.y);
    let sx = vr.x;
    let sy = vb.y;
    let kx = -vr.y;
    let ky = -vb.x;
    let dx = -tl.x;
    let dy = -tl.y;
    const _sx = kx / nozero(sx);
    const _sy = ky / nozero(sy);
    let xform = mulm3m3([[1, _sy, 0],
        [_sx, 1, 0],
        [0, 0, 1]], createTransform(dx, dy));
    xform = inversem3(xform);
    const a = anglev(vr);
    if (a > Tau / 4
        && a < Tau * 3 / 4)
        xform = mulm3m3(xform, createTransform(0, 0, 1, 1, Tau / 2));
    if (determinant(xform) < 0)
        xform = mulm3m3(xform, createTransform(0, 0, -1, 1, 0));
    return xform;
}
function applyFigmaTransform(figObj, tl, tr, bl) {
    const xform = getFigmaTransform(tl, tr, bl);
    figObj.relativeTransform =
        [
            xform[0],
            xform[1]
        ];
}
function setObjectTransform(figObj, genObj, setSize = true, noHeight = 0.01) {
    if (!genObj[FO_XP0]
        || !genObj[FO_XP1]
        || !genObj[FO_XP2])
        return;
    const xp0 = genObj[FO_XP0];
    const xp1 = genObj[FO_XP1];
    const xp2 = genObj[FO_XP2];
    applyFigmaTransform(figObj, xp0, xp1, xp2);
    if (setSize) {
        const scaleX = distv(xp0, xp1);
        const scaleY = distv(xp0, xp2);
        const height = genObj[FO_TYPE] == TEXT_SHAPE
            ? genObj[FO_FIG_HEIGHT]
            : genObj[FO_HEIGHT];
        if (!figObj.removed) {
            figObj.resizeWithoutConstraints(Math.max(0.01, scaleX), height ? Math.max(0.01, scaleY) : noHeight);
        }
    }
}
function setPointTransform(figPoint, genPoint) {
    if (figPoint.removed)
        return;
    figPoint.resizeWithoutConstraints(0.01, 0.01);
    figPoint.setPluginData('actualX', genPoint[FO_X].toString());
    figPoint.setPluginData('actualY', genPoint[FO_Y].toString());
    figPoint.x = genPoint[FO_X];
    figPoint.y = genPoint[FO_Y];
    figPoint.rotation = genPoint[FO_IS_CENTER] ? 45 : 0;
}
function updateExistingPointTransform(figPoint) {
    if (!figPoint.removed)
        figPoint.resizeWithoutConstraints(0.01, 0.01);
}
function genBooleanIsValid(genBool) {
    return true; //genBool[FO_BOOLEAN_CHILDREN].length > 0;
}
function figCreateShapeBooleanAsync(genBool, addProps, transform) {
    return __awaiter(this, void 0, void 0, function* () {
        let objects = [];
        for (const obj of genBool[FO_BOOLEAN_CHILDREN])
            yield figCreateObject(obj, o => objects = [...objects, o], false);
        yield figma.currentPage.loadAsync();
        let figBool = null;
        if (!isEmpty(objects)) {
            switch (genBool[FO_BOOLEAN_OPERATION]) {
                case 0:
                    figBool = figma.union(objects, figma.currentPage);
                    break;
                case 1:
                    figBool = figma.subtract(objects, figma.currentPage);
                    break;
                case 2:
                    figBool = figma.intersect(objects, figma.currentPage);
                    break;
                case 3:
                    figBool = figma.exclude(objects, figma.currentPage);
                    break;
            }
        }
        if (figBool) {
            figBool.expanded = false;
            figUpdateBoolean(figBool, genBool, addProps, transform);
        }
        return figBool;
    });
}
function figUpdateBoolean(figBool, genBool, addProps, transform) {
    return __awaiter(this, void 0, void 0, function* () {
        if (genBool[FO_BOOLEAN_CHILDREN].length == 0) {
            figBool.remove();
            return;
        }
        yield figUpdateObjectsAsync(figBool, genBool[FO_BOOLEAN_CHILDREN], genBool[FO_BOOLEAN_CHILDREN].length, -1, [], false, false, false, false, true);
        // if (transform)
        //     setObjectTransform(figBool, genBool, false);
        const hasProps = genBool[FO_FILLS].length > 0
            || genBool[FO_STROKES].length > 0
            || genBool[FO_EFFECTS].length > 0;
        setObjectProps(figBool, genBool, !hasProps && addProps);
    });
}
function genEllipseIsValid(genEllipse) {
    return genEllipse[FO_X] != null && !isNaN(genEllipse[FO_X])
        && genEllipse[FO_Y] != null && !isNaN(genEllipse[FO_Y])
        && genEllipse[FO_WIDTH] != null && !isNaN(genEllipse[FO_WIDTH])
        && genEllipse[FO_HEIGHT] != null && !isNaN(genEllipse[FO_HEIGHT])
        && genEllipse[FO_ELLIPSE_ROUND] != null && !isNaN(genEllipse[FO_ELLIPSE_ROUND])
        && genEllipse[FO_ELLIPSE_START] != null && !isNaN(genEllipse[FO_ELLIPSE_START])
        && genEllipse[FO_ELLIPSE_SWEEP] != null && !isNaN(genEllipse[FO_ELLIPSE_SWEEP])
        && genEllipse[FO_ELLIPSE_INNER] != null && !isNaN(genEllipse[FO_ELLIPSE_INNER]);
}
function figCreateEllipse(genEllipse, addProps, transform) {
    if (!genEllipseIsValid(genEllipse))
        return null;
    const figEllipse = figma.createEllipse();
    figUpdateEllipse(figEllipse, genEllipse, addProps, transform, true);
    return figEllipse;
}
function figUpdateEllipse(figEllipse, genEllipse, addProps, transform, isValid = false) {
    if (!isValid
        && !genEllipseIsValid(genEllipse))
        return;
    figUpdateEllipseData(figEllipse, genEllipse, transform);
    if (figPoints.includes(figEllipse))
        updatePointObject(figEllipse);
    else
        setObjectProps(figEllipse, genEllipse, addProps);
}
function figUpdateEllipseData(figEllipse, genEllipse, transform) {
    figEllipse.cornerRadius = genEllipse[FO_ELLIPSE_ROUND];
    const start = genEllipse[FO_ELLIPSE_START] / 360 * (Math.PI * 2);
    const sweep = genEllipse[FO_ELLIPSE_SWEEP] / 100 * (Math.PI * 2);
    figEllipse.arcData =
        {
            startingAngle: start,
            endingAngle: start + sweep,
            innerRadius: Math.min(Math.max(0, genEllipse[FO_ELLIPSE_INNER] / 100), 1)
        };
    if (transform)
        setObjectTransform(figEllipse, genEllipse);
}
function genFrameIsValid(genFrame) {
    return genFrame[FO_X] != null && !isNaN(genFrame[FO_X])
        && genFrame[FO_Y] != null && !isNaN(genFrame[FO_Y])
        && genFrame[FO_WIDTH] != null && !isNaN(genFrame[FO_WIDTH])
        && genFrame[FO_HEIGHT] != null && !isNaN(genFrame[FO_HEIGHT])
        && genFrame[FO_FRAME_ROUND] != null && !isNaN(genFrame[FO_FRAME_ROUND])
        && genFrame[FO_FRAME_CLIP] != null && !isNaN(genFrame[FO_FRAME_CLIP]);
}
function figCreateFrameAsync(genFrame, addProps, transform) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!genFrameIsValid(genFrame))
            return null;
        const figFrame = figma.createFrame();
        if (figFrame) {
            figFrame.expanded = false;
            figUpdateFrameData(figFrame, genFrame, addProps, transform);
            let objects = [];
            for (const obj of genFrame[FO_FRAME_CHILDREN])
                yield figCreateObject(obj, o => objects = [...objects, o]);
            for (const obj of objects)
                figFrame.appendChild(obj);
        }
        return figFrame;
    });
}
function figUpdateFrame(figFrame, genFrame, addProps, transform) {
    figUpdateFrameData(figFrame, genFrame, addProps, transform);
    figUpdateObjectsAsync(figFrame, genFrame[FO_FRAME_CHILDREN], genFrame[FO_FRAME_CHILDREN].length);
}
function figUpdateFrameData(figFrame, genFrame, addProps, transform) {
    figFrame.cornerRadius = genFrame[FO_FRAME_ROUND];
    figFrame.clipsContent = genFrame[FO_FRAME_CLIP] > 0;
    if (transform)
        setObjectTransform(figFrame, genFrame);
    setObjectProps(figFrame, genFrame, addProps && genFrame[FO_FRAME_CHILDREN].length == 0);
    figUpdateStrokeSides(figFrame, genFrame);
}
function genShapeGroupIsValid(genGroup) {
    return true; //genGroup[FO_GROUP_CHILDREN].length > 0;
}
function figCreateShapeGroupAsync(genGroup) {
    return __awaiter(this, void 0, void 0, function* () {
        let objects = [];
        for (const obj of genGroup[FO_GROUP_CHILDREN])
            yield figCreateObject(obj, o => objects = [...objects, o]);
        yield figma.currentPage.loadAsync();
        const figGroup = !isEmpty(objects)
            ? figma.group(objects, figma.currentPage)
            : null;
        if (figGroup) {
            figGroup.expanded = false;
            figUpdateShapeGroup(figGroup, genGroup);
        }
        return figGroup;
    });
}
function figUpdateShapeGroup(figGroup, genGroup) {
    if (genGroup[FO_GROUP_CHILDREN].length == 0) {
        figGroup.remove();
        return;
    }
    figUpdateObjectsAsync(figGroup, genGroup[FO_GROUP_CHILDREN], genGroup[FO_GROUP_CHILDREN].length);
    setObjectEffects(figGroup, genGroup);
}
function genLineIsValid(genLine) {
    return genLine[FO_X] != null && !isNaN(genLine[FO_X])
        && genLine[FO_Y] != null && !isNaN(genLine[FO_Y])
        && genLine[FO_WIDTH] != null && !isNaN(genLine[FO_WIDTH]);
}
function figCreateLine(genLine, addProps, transform) {
    if (!genLineIsValid(genLine))
        return null;
    const figLine = figma.createLine();
    figUpdateLine(figLine, genLine, addProps, transform, true);
    return figLine;
}
function figUpdateLine(figLine, genLine, addProps, transform, isValid = false) {
    if (!isValid
        && !genLineIsValid(genLine))
        return;
    if (transform)
        setObjectTransform(figLine, genLine, true, 0);
    setObjectProps(figLine, genLine, addProps);
}
var figPoints = [];
function genPointIsValid(genPoint) {
    return genPoint[FO_X] != null && !isNaN(genPoint[FO_X])
        && genPoint[FO_Y] != null && !isNaN(genPoint[FO_Y]);
}
function figCreatePoint(genPoint) {
    const figPoint = genPoint[FO_IS_CENTER]
        ? figma.createRectangle()
        : figma.createEllipse();
    // figPoint.setPluginData('isCenter', boolToString(genPoint[FO_IS_CENTER]));
    if (!genPointIsValid(genPoint))
        return figPoint;
    //figPoint.rotation = 0;
    if (figPoints.includes(figPoint))
        updatePointObject_(figPoint, genPoint);
    else
        figUpdatePoint(figPoint, genPoint);
    return figPoint;
}
function figUpdatePoint(figPoint, genPoint) {
    setPointTransform(figPoint, genPoint);
    updatePointStyles(figPoint);
}
function updatePointObjects() {
    figPostMessageToUi({
        cmd: 'uiUpdateZoom',
        zoom: figma.viewport.zoom
    });
    for (const point of figPoints)
        updatePointObject(point);
}
function updatePointObject(figPoint) {
    updateExistingPointTransform(figPoint);
    updatePointStyles(figPoint);
}
function updatePointObject_(figPoint, genPoint) {
    setPointTransform(figPoint, genPoint);
    updatePointStyles(figPoint);
}
function updatePointStyles(figPoint) {
    if (figPoint.removed)
        return;
    figma.currentPage.loadAsync().then(() => {
        const isCenter = parseBool(figPoint.getPluginData('isCenter'));
        const isSelected = figma.currentPage.selection.includes(figPoint);
        const color = isCenter
            ? [0xf2, 0x48, 0x22]
            : isSelected
                ? [12, 140, 233]
                : [255, 255, 255];
        const border = isCenter
            ? [255, 255, 255]
            : isSelected
                ? [255, 255, 255]
                : [12, 140, 233];
        figPoint.fills = getObjectFills([['SOLID', color[0], color[1], color[2], 100]]);
        const effects = [];
        effects.push(...getObjectEffects([['DROP_SHADOW', border[0] / 255, border[1] / 255, border[2] / 255, 1, 0, 0, 0, (isCenter ? 3 : isSelected ? 5 : 3.6) / curZoom, 'NORMAL', true, true]], true));
        effects.push(...getObjectEffects([['DROP_SHADOW', color[0] / 255, color[1] / 255, color[2] / 255, 1, 0, 0, 0, (isSelected ? 4 : 2.4) / curZoom, 'NORMAL', true, true]], true));
        figPoint.effects = effects;
    });
}
function genPolygonIsValid(genPoly) {
    return genPoly[FO_X] != null && !isNaN(genPoly[FO_X])
        && genPoly[FO_Y] != null && !isNaN(genPoly[FO_Y])
        && genPoly[FO_WIDTH] != null && !isNaN(genPoly[FO_WIDTH])
        && genPoly[FO_HEIGHT] != null && !isNaN(genPoly[FO_HEIGHT])
        && genPoly[FO_POLY_ROUND] != null && !isNaN(genPoly[FO_POLY_ROUND])
        && genPoly[FO_POLY_CORNERS] != null && !isNaN(genPoly[FO_POLY_CORNERS]);
}
function figCreatePolygon(genPoly, addProps, transform) {
    if (!genPolygonIsValid(genPoly))
        return null;
    const figPoly = figma.createPolygon();
    figUpdatePolygon(figPoly, genPoly, addProps, transform, true);
    return figPoly;
}
function figUpdatePolygon(figPoly, genPoly, addProps, transform, isValid = false) {
    if (!isValid
        && !genPolygonIsValid(genPoly))
        return;
    figPoly.cornerRadius = genPoly[FO_POLY_ROUND];
    figPoly.pointCount = Math.max(3, genPoly[FO_POLY_CORNERS]);
    if (transform)
        setObjectTransform(figPoly, genPoly);
    setObjectProps(figPoly, genPoly, addProps);
}
function genRectIsValid(genRect) {
    return genRect[FO_X] != null && !isNaN(genRect[FO_X])
        && genRect[FO_Y] != null && !isNaN(genRect[FO_Y])
        && genRect[FO_WIDTH] != null && !isNaN(genRect[FO_WIDTH])
        && genRect[FO_HEIGHT] != null && !isNaN(genRect[FO_HEIGHT])
        && genRect[FO_RECT_ROUND] != null && !isNaN(genRect[FO_RECT_ROUND]);
}
function figCreateRect(genRect, addProps, transform) {
    if (!genRectIsValid(genRect))
        return null;
    const figRect = figma.createRectangle();
    figUpdateRect(figRect, genRect, addProps, transform, true);
    return figRect;
}
function figUpdateRect(figRect, genRect, addProps, transform, isValid = false) {
    if (!isValid
        && !genRectIsValid(genRect))
        return;
    const foundCorners = genRect[FO_EFFECTS].findIndex(e => e[0] == 'ROUND_CORNERS');
    if (foundCorners > -1) {
        const corners = genRect[FO_EFFECTS][foundCorners];
        figRect.topLeftRadius = corners[1];
        figRect.topRightRadius = corners[2];
        figRect.bottomLeftRadius = corners[3];
        figRect.bottomRightRadius = corners[4];
    }
    else
        figRect.cornerRadius = genRect[FO_RECT_ROUND];
    if (transform)
        setObjectTransform(figRect, genRect);
    setObjectProps(figRect, genRect, addProps);
    figUpdateStrokeSides(figRect, genRect);
}
function figUpdateStrokeSides(figObj, genObj) {
    const foundSides = genObj[FO_EFFECTS].findIndex(e => e[0] == 'STROKE_SIDES');
    if (foundSides < 0)
        return;
    const sides = genObj[FO_EFFECTS][foundSides];
    figObj.strokeWeight = 0;
    figObj.strokeTopWeight = sides[1];
    figObj.strokeLeftWeight = sides[2];
    figObj.strokeRightWeight = sides[3];
    figObj.strokeBottomWeight = sides[4];
}
function genStarIsValid(genStar) {
    return genStar[FO_X] != null && !isNaN(genStar[FO_X])
        && genStar[FO_Y] != null && !isNaN(genStar[FO_Y])
        && genStar[FO_WIDTH] != null && !isNaN(genStar[FO_WIDTH])
        && genStar[FO_HEIGHT] != null && !isNaN(genStar[FO_HEIGHT])
        && genStar[FO_STAR_ROUND] != null && !isNaN(genStar[FO_STAR_ROUND])
        && genStar[FO_STAR_POINTS] != null && !isNaN(genStar[FO_STAR_POINTS])
        && genStar[FO_STAR_CONVEX] != null && !isNaN(genStar[FO_STAR_CONVEX]);
}
function figCreateStar(genStar, addProps, transform) {
    if (!genStarIsValid(genStar))
        return null;
    const figStar = figma.createStar();
    figUpdateStar(figStar, genStar, addProps, transform, true);
    return figStar;
}
function figUpdateStar(figStar, genStar, addProps, transform, isValid = false) {
    if (!isValid
        && !genStarIsValid(genStar))
        return;
    figStar.cornerRadius = genStar[FO_STAR_ROUND];
    figStar.pointCount = genStar[FO_STAR_POINTS];
    figStar.innerRadius = Math.min(Math.max(0, genStar[FO_STAR_CONVEX] / 100), 1);
    if (transform)
        setObjectTransform(figStar, genStar);
    setObjectProps(figStar, genStar, addProps);
}
const loadedFonts = [];
function genTextIsValid(genText) {
    return genText[FO_TEXT] != null
        && genText[FO_X] != null && !isNaN(genText[FO_X])
        && genText[FO_Y] != null && !isNaN(genText[FO_Y])
        && genText[FO_WIDTH] != null && !isNaN(genText[FO_WIDTH])
        && genText[FO_HEIGHT] != null && !isNaN(genText[FO_HEIGHT])
        && genText[FO_FONT] != null && genText[FO_FONT] != NULL
        && genText[FO_FONT_SIZE] != null && !isNaN(genText[FO_FONT_SIZE]);
}
function figCreateText(genText, addProps, transform) {
    if (!genTextIsValid(genText))
        return null;
    const figText = figma.createText();
    figUpdateText(figText, genText, addProps, transform, true);
    return figText;
}
function figUpdateText(figText, genText, addProps, transform, isValid = false) {
    if (!isValid
        && !genTextIsValid(genText))
        return null;
    const fontName = {
        family: genText[FO_FONT],
        style: genText[FO_FONT_STYLE]
    };
    try {
        if (!loadedFonts.includes(fontName)) {
            figma.loadFontAsync(fontName).then(() => {
                loadedFonts.push(fontName);
                figUpdateText_(figText, genText, fontName, addProps, transform);
            });
        }
        else {
            figUpdateText_(figText, genText, fontName, addProps, transform);
        }
    }
    catch (e) {
        consoleError(e);
    }
}
function figUpdateText_(figText, genText, fontName, addProps, transform) {
    figText.fontName = fontName;
    figText.fontSize = Math.max(1, genText[FO_FONT_SIZE]);
    figText.characters = genText[FO_TEXT];
    figText.lineHeight = { unit: 'PERCENT', value: genText[FO_LINE_HEIGHT] };
    figText.letterSpacing = { unit: 'PERCENT', value: genText[FO_LETTER_SPACING] };
    if (genText[FO_ALIGN_H] == 0)
        figText.textAlignHorizontal = 'LEFT';
    else if (genText[FO_ALIGN_H] == 1)
        figText.textAlignHorizontal = 'CENTER';
    else if (genText[FO_ALIGN_H] == 2)
        figText.textAlignHorizontal = 'RIGHT';
    else if (genText[FO_ALIGN_H] == 3)
        figText.textAlignHorizontal = 'JUSTIFIED';
    if (genText[FO_ALIGN_V] == 0)
        figText.textAlignVertical = 'TOP';
    else if (genText[FO_ALIGN_V] == 1)
        figText.textAlignVertical = 'CENTER';
    else if (genText[FO_ALIGN_V] == 2)
        figText.textAlignVertical = 'BOTTOM';
    if (transform)
        setObjectTransform(figText, genText);
    setObjectProps(figText, genText, addProps);
    // const xp0 = genText[FO_XP0];
    // const xp1 = genText[FO_XP1];
    // const xp2 = genText[FO_XP2];
    // const scaleY = distv(xp0, xp2);
    // console.log('scaleY =', scaleY);
    // figText.fontSize = 
    //       Math.max(1, genText[FO_FONT_SIZE])
    //     * scaleY / 100;
    if (genText[FO_FIG_WIDTH] == 0
        && genText[FO_FIG_HEIGHT] == 0)
        figText.textAutoResize = 'WIDTH_AND_HEIGHT';
    else if (genText[FO_FIG_WIDTH] == 0)
        figText.textAutoResize = 'HEIGHT';
    else
        figText.textAutoResize = 'NONE';
}
function genVectorNetworkIsValid(genNetwork) {
    return true; //genNetwork[FO_VECTOR_NETWORK_DATA] != null && !isNaN(genNetwork[FO_VECTOR_NETWORK_DATA]);
}
function figCreateVectorNetwork(genNetwork, addProps, transform) {
    if (!genVectorNetworkIsValid(genNetwork))
        return null;
    const figNetwork = figma.createVector();
    figUpdateVectorNetwork(figNetwork, genNetwork, addProps, transform, true);
    return figNetwork;
}
function figUpdateVectorNetwork(figNetwork, genNetwork, addProps, transform, isValid = false) {
    if (!isValid
        && !genVectorNetworkIsValid(genNetwork))
        return;
    figNetwork.setVectorNetworkAsync(genNetwork[FO_VECTOR_NETWORK_DATA]);
    if (transform)
        setObjectTransform(figNetwork, genNetwork, false);
    setObjectProps(figNetwork, genNetwork, addProps);
}
function genVectorPathIsValid(genPath) {
    return genPath[FO_VECTOR_PATH_WINDING] != null && !isNaN(genPath[FO_VECTOR_PATH_WINDING])
        && genPath[FO_VECTOR_PATH_ROUND] != null && !isNaN(genPath[FO_VECTOR_PATH_ROUND]);
}
function figCreateVectorPath(genPath, addProps, transform) {
    const figPath = figma.createVector();
    figUpdateVectorPath(figPath, genPath, addProps, transform, true);
    return figPath;
}
function figUpdateVectorPath(figPath, genPath, addProps, transform, isValid = false) {
    if (!isValid
        && !genVectorPathIsValid(genPath))
        return;
    figPath.vectorPaths = [{
            windingRule: genPath[FO_VECTOR_PATH_WINDING] == 1 ? 'NONZERO' : 'EVENODD',
            data: genPath[FO_VECTOR_PATH_DATA]
        }];
    figPath.cornerRadius = Number(genPath[FO_VECTOR_PATH_ROUND]);
    if (transform)
        setObjectTransform(figPath, genPath, false);
    setObjectProps(figPath, genPath, addProps);
}
