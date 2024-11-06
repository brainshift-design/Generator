var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function t1046(key, tag) { return key.substring(0, tag.length + 1) == tag + ' '; }
function n1047(key, tag) { return key.substring(tag.length + 1); }
function j1048(key) { return t1046(key, e875); }
function n1049(key) { return t1046(key, m873); }
function y1050(key) { return t1046(key, c874); }
function z1051(key) { return n1047(key, e875); }
function z1052(key) { return n1047(key, m873); }
function a1053(key) { return n1047(key, c874); }
const generatorVersion = 441;
const n866 = 2147483647;
const NULL = '';
const NULL_VALUE = 'NULL';
const c867 = '  ';
const h868 = '    ';
const d870 = '\n';
const i871 = '◦ G •';
const PLUGIN_NAME = 'Generator';
const PLUGIN_LOGO_AND_NAME = i871 + ' ' + PLUGIN_NAME;
const q872 = i871 + ' ';
const m873 = 'G_NODE';
const c874 = 'G_CONN';
const e875 = 'G_PAGE';
const g876 = 'G_TEMP';
const minWindowWidth = 602;
const minWindowHeight = 39;
const identity = Object.freeze([[1, 0, 0], [0, 1, 0], [0, 0, 1]]);
const Epsilon = 0.0000001;
const Tau = Math.PI * 2;
var enableAsserts = false;
function a877(x, eps = 0.000000001) { return Math.abs(x) < eps ? 0 : x; }
function hardPosZero(x, eps = 0.000000001) { return x < 0 && x > -eps ? 0 : x; }
function nozero(x, eps = 0.000000001) { return x != 0 ? x : (x < 0 ? -eps : eps); }
function p878(v, eps = 0.000000001) { return point(nozero(v.x, eps), nozero(v.y, eps)); }
function equal(a, b, eps = 0.000000001) { return Math.abs(b - a) < eps; }
function sqr(x) { return x * x; }
;
function cube(x) { return x * x * x; }
;
function b879(f) { return Math.floor(f) | 0; }
function s880(x) { x = b879(x); x--; x |= x >> 1; x |= x >> 2; x |= x >> 4; x |= x >> 8; x |= x >> 16; x |= x >> 32; return ++x; }
function gcd(a, b) { let temp; while (1) {
    temp = a % b;
    if (temp == 0)
        return b;
    a = b;
    b = temp;
} }
function distv(p1, p2) { const dx = p2.x - p1.x; const dy = p2.y - p1.y; return Math.sqrt(dx * dx + dy * dy); }
function n881(v) { let angle = Math.atan2(v.y, v.x); if (angle < 0)
    angle += Tau; return angle; }
function anglev2(v1, v2) { return anglev2_(v1.x, v1.y, v2.x, v2.y); }
function anglev2_(x1, y1, x2, y2) { const dx = x2 - x1; const dy = y2 - y1; let angle = Math.atan2(dy, dx); if (angle < 0)
    angle += Tau; return angle; }
function h883(v) { return Math.sqrt(v.x * v.x + v.y * v.y); }
function lengthv_(x, y) { return Math.sqrt(x * x + y * y); }
function z884(v) { return point(v.x == 0 ? 0 : v.x / h883(v), v.y == 0 ? 0 : v.y / h883(v)); }
function dotv(v1, v2) { return v1.x * v2.x + v1.y * v2.y; }
function o885(a1, a2) { let diff = a2 - a1; while (diff <= -Tau / 2)
    diff += Tau; while (diff > Tau / 2)
    diff -= Tau; return diff; }
function l886(v, m) { let v3 = [v.x, v.y, 1]; let r = l946(v3, m); return point(r[0], r[1]); }
function n887(...mm) { c950(mm.length > 0, 'mulm3m3() must take at least one argument'); let result = clone(mm[0]); for (let a = 1; a < mm.length; a++) {
    const m1 = result;
    const m2 = mm[a];
    const m = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            for (let k = 0; k < 3; k++)
                m[i][j] += m1[i][k] * m2[k][j];
        }
    }
    result = m;
} return result; }
function l888(m, s) { for (let i = 0; i < 3; i++)
    for (let j = 0; j < 3; j++)
        m[i][j] /= s; return m; }
function adjugate(m) { return cofactor(transpose(m)); }
function transpose(m) { return [[m[0][0], m[1][0], m[2][0]], [m[0][1], m[1][1], m[2][1]], [m[0][2], m[1][2], m[2][2]]]; }
function cofactor(m) { return [[m[1][1] * m[2][2] - m[2][1] * m[1][2], -(m[1][0] * m[2][2] - m[2][0] * m[1][2]), m[1][0] * m[2][1] - m[2][0] * m[1][1]], [-(m[0][1] * m[2][2] - m[2][1] * m[0][2]), m[0][0] * m[2][2] - m[2][0] * m[0][2], -(m[0][0] * m[2][1] - m[2][0] * m[0][1])], [m[0][1] * m[1][2] - m[1][1] * m[0][2], -(m[0][0] * m[1][2] - m[1][0] * m[0][2]), m[0][0] * m[1][1] - m[1][0] * m[0][1]]]; }
function determinant(m) { return m[0][0] * (m[1][1] * m[2][2] - m[1][2] * m[2][1]) - m[0][1] * (m[1][0] * m[2][2] - m[2][0] * m[1][2]) + m[0][2] * (m[1][0] * m[2][1] - m[2][0] * m[1][1]); }
function h889(m) { return l888(adjugate(m), determinant(m)); }
function n890(angle) { const cosA = a877(Math.cos(angle)); const sinA = a877(Math.sin(angle)); return [[cosA, sinA, 0], [-sinA, cosA, 0], [0, 0, 1]]; }
function i891(x = 0, y = 0, scaleX = 1, scaleY = 1, angle = 0, skewX = 0, skewY = 0) { const cosA = Math.cos(angle); const sinA = Math.sin(angle); return [[scaleX * cosA - skewY * sinA, -skewX * cosA + scaleY * sinA, x], [skewY * cosA + scaleX * sinA, scaleY * cosA + skewX * sinA, y], [0, 0, 1]]; }
function l892(v1, v2) { return v1.x * v2.y - v1.y * v2.x; }
function y893(v1, v2) { return point(v1.x + v2.x, v1.y + v2.y); }
function sqrv(v) { return i894(v, v); }
function i894(v1, v2) { return point(v1.x * v2.x, v1.y * v2.y); }
function a895(v, s) { return point(v.x * s, v.y * s); }
function m896(v1, v2) { return point(v1.x / v2.x, v1.y / v2.y); }
function g897(v, s) { return point(v.x / s, v.y / s); }
function v898(v1, v2) { return point(v1.x - v2.x, v1.y - v2.y); }
function v899(str) { return decodeURI(encodeURIComponent(str)); }
function o900(str) { return decodeURIComponent(encodeURI(str)); }
function k901(bytes) { let str = ''; for (let i = 0; i < bytes.length; i++)
    str += String.fromCharCode(bytes[i]); return str; }
function w902(str) { return Array.from(o900(str), c => c.charCodeAt(0)); }
function v903(array, size) { const newArray = new Uint8Array(size); h904(array, newArray); return newArray; }
function h904(src, dst) { y905(src, 0, src.length, dst, 0, dst.length); }
function y905(src, y906, q907, dst, x908, j909) { const size = Math.min(q907, j909); for (let i = 0; i < size; i++)
    dst[x908 + i] = src[y906 + i]; }
function b910(t911, x912) { if (t911.length != x912.length)
    return false; for (let i = 0; i < t911.length; i++) {
    if (t911[i] != x912[i])
        return false;
} return true; }
function b913(d914, i915) { return d914.findIndex(i => i915.includes(i)) > -1; }
function y916(list) { return list ? '<==' : '<--'; }
;
function f917(list) { return list ? '==>' : '-->'; }
;
function s918(nodeId) { return m873 + ' ' + nodeId; }
function y919(name) { return c874 + ' ' + name; }
function w920(name) { return e875 + ' ' + name; }
function z921(str) { if (str.trim().toLowerCase() == 'true')
    return true; if (str.trim().toLowerCase() == 'false')
    return false; const num = parseFloat(str); if (!isNaN(num))
    return num > 0; console.error('invalid bool string "' + str + '"'); return false; }
function stringIsNumber(str) { const num = Number(str); if ((isNaN(num) || parseFloat(str).toString() !== str.trim()) && !Object.is(num, -0))
    return false; return true; }
function q922(z923, r924 = false) { return b929(z923.outputNodeId, z923.outputId, z923.outputOrder, z923.inputNodeId, z923.inputId, z923.list, r924); }
function u925(outputNodeId, outputId, outputOrder, inputNodeId, inputId) { return y919(outputNodeId + ' ' + outputId + ' ' + outputOrder + ' ' + inputNodeId + ' ' + inputId); }
function x926(t243) { return u925(t243.outputNodeId, t243.outputId, t243.outputOrder, t243.inputNodeId, t243.inputId); }
function r927(t243) { return u925(t243.output.node.id, t243.output.id, t243.outputOrder, t243.input.node.id, t243.input.id); }
function e928(t243, r924 = false) { return b929(t243.output.node.id, t243.output.id, t243.outputOrder, t243.input.node.id, t243.input.id, t243.list, r924); }
function b929(outputNodeId, outputId, outputOrder, inputNodeId, inputId, list, r924 = false) { const sp = r924 ? ' ' : '  '; const jsp = r924 ? '' : ' '; const arrow = sp + u933(typeof outputOrder == 'string' ? parseInt(outputOrder) : outputOrder) + f917(typeof list == 'string' ? z921(list) : list) + sp; const join = jsp + '.' + jsp; return outputNodeId + join + outputId + arrow + inputNodeId + join + inputId; }
function r930(pageId) { return w920(pageId); }
function a931(num) { const str = num.toString(); let sup = ''; for (const c of str)
    sup += f932(c); return sup; }
function f932(c) { switch (c) {
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
} }
function u933(num) { const str = num.toString(); let sup = ''; for (const c of str)
    sup += m934(c); return sup; }
function m934(c) { switch (c) {
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
} }
function h935(bool) { return bool ? 'true' : 'false'; }
function isValid(val) { return val != undefined && val != null; }
function isEmpty(array) { return array.length == 0; }
function r936(array, item) { y937(array, array.indexOf(item)); }
function y937(array, index) { if (index > -1 && index < array.length)
    array.splice(index, 1); }
function a938(array) { if (isEmpty(array))
    return null; let last = array.at(-1); array.splice(array.length - 1, 1); return last; }
function a939(array) { return array[array.length - 1]; }
function p940(array, from, to) { const item = array[from]; array.splice(from, 1); array.splice(to, 0, item); }
function u941(array, item) { const index = array.indexOf(item); if (index > -1)
    array.splice(index, 1); }
function q942(c2894, array) { for (const item of array) {
    const index = c2894.indexOf(item);
    if (index > -1)
        c2894.splice(index, 1);
} }
function b943(array, where) { const index = array.findIndex(where); if (index > -1)
    array.splice(index, 1); }
function f944(styleId) { return styleId.split(',')[0] + ','; }
function u945(points) { let q4126 = ''; if (points.length < 2)
    return q4126; q4126 += 'M'; q4126 += ' ' + a877(points[0].x); q4126 += ' ' + a877(points[0].y); for (let i = 1; i < points.length; i++) {
    q4126 += ' L' + ' ' + a877(points[i].x) + ' ' + a877(points[i].y);
} return q4126; }
function point(x, y) { return { x: x, y: y }; }
function l946(v, m) { let r = [0, 0, 0]; for (let i = 0; i < 3; i++)
    for (let j = 0; j < 3; j++)
        r[i] += v[j] * m[i][j]; return r; }
function clone(val) { const type = typeof val; if (val === null)
    return null;
else if (type === 'undefined' || type === 'number' || type === 'string' || type === 'boolean')
    return val;
else if (type === 'object') {
    if (val instanceof Array)
        return val.map(x => clone(x));
    else if (val instanceof Uint8Array)
        return new Uint8Array(val);
    else {
        let b111 = {};
        for (const key in val)
            b111[key] = clone(val[key]);
        return b111;
    }
} throw 'unknown'; }
function j947(array, item, equal = null) { if (equal) {
    if (Array.isArray(item))
        item.forEach(i => j947(array, i, equal));
    else if (!array.find(i => equal(i, item)))
        array.push(item);
}
else {
    if (Array.isArray(item))
        item.forEach(i => j947(array, i));
    else if (!array.includes(item))
        array.push(item);
} }
function v948(array, item, equal) { if (Array.isArray(item))
    item.forEach(i => v948(array, i, equal));
else if (!array.find(equal))
    array.push(item); }
function a949(array, item, except) { if (Array.isArray(item))
    item.forEach(i => a949(array, i, except));
else if (!array.find(except))
    array.push(item); }
function c950(...args) { if (enableAsserts) {
    console.assert(...args);
} }
function h951(...args) { if (enableAsserts)
    console.error(...args); }
function n952(str, trim) { while (str.length >= trim.length && str.substring(0, trim.length) == trim)
    str = str.substring(trim.length); return str; }
function w953(str, trim) { while (str.length >= trim.length && str.substring(str.length - trim.length) == trim)
    str = str.substring(0, str.length - trim.length); return str; }
function y954(k4184) { const fills = []; for (const fill of k4184) {
    switch (fill[0]) {
        case 'SOLID': {
            const color = { r: Math.min(Math.max(0, fill[1] / 0xff), 1), g: Math.min(Math.max(0, fill[2] / 0xff), 1), b: Math.min(Math.max(0, fill[3] / 0xff), 1) };
            const opacity = Math.min(Math.max(0, fill[4] / 100), 1);
            if (!isNaN(color.r) && !isNaN(color.g) && !isNaN(color.b) && !isNaN(opacity))
                fills.push({ type: fill[0], color: color, opacity: opacity, blendMode: fill[5] });
            break;
        }
        case 'GRADIENT_LINEAR':
        case 'GRADIENT_RADIAL':
        case 'GRADIENT_ANGULAR':
        case 'GRADIENT_DIAMOND': {
            const [p0, p1, p2] = fill[1];
            const k4299 = [[0, 1, 0], [0.5, 0.5, 1], [1, 1, 1]];
            let x4300 = [[p0.x, p1.x, p2.x], [p0.y, p1.y, p2.y], [1, 1, 1]];
            x4300 = n887(k4299, h889(x4300));
            x4300 = [x4300[0], x4300[1]];
            const stops = [];
            for (const stop of fill[2]) {
                stops.push({ color: { r: Math.min(Math.max(0, stop[0]), 1), g: Math.min(Math.max(0, stop[1]), 1), b: Math.min(Math.max(0, stop[2]), 1), a: Math.min(Math.max(0, stop[3]), 1) }, position: stop[4] });
            }
            fills.push({ type: fill[0], gradientTransform: x4300, gradientStops: stops, blendMode: fill[3] });
            break;
        }
    }
} return fills; }
function o955(type) { return a1088.includes(type); }
function isValueListOfLists(value) { if (!o955(value.type))
    return false; for (const item of value.items) {
    if (!o955(item.type))
        return false;
} return true; }
function isValueListOfCondensedLists(value) { if (!value || !o955(value.type))
    return false; for (const item of value.items) {
    if (!item || !o955(item.type) || item.condensed !== true)
        return false;
} return true; }
const q1054 = 'LIST#';
const b1055 = 'NLIST#';
const y1056 = 'TLIST#';
const f1057 = 'SLIST#';
const COLOR_LIST_VALUE = 'CLIST#';
const FILL_LIST_VALUE = 'FLIST#';
const COLOR_STOP_LIST_VALUE = 'CSLIST#';
const s1058 = 'NULL';
const y1060 = 'VARGRP';
const k1061 = 'FEEDBK';
const e1062 = 'REPT';
const ADVANCE = 'ADVNC';
const m1063 = 'CACHE';
const d1064 = 'FRZ';
const s1065 = 'TIMER';
const z1066 = 'GVNAME';
const l1067 = 'SVNAME';
const i1351 = 'GVNAMES';
const o1352 = 'SVNAMES';
const x1353 = 'SONAME';
const o1059 = 'VAR';
const VARIABLE_VALUE = 'VAR#';
const VARIABLE_TYPES = [VARIABLE_VALUE, o1059];
const q1068 = 'LIST';
const b1069 = 'LSASIT';
const u1070 = 'EXTR';
const n1071 = 'SETP';
const n1072 = 'GETP';
const y1073 = 'SUBLST';
const c1074 = 'UNIQ';
const q1348 = 'RORD';
const s1349 = 'SHFTLST';
const x1075 = 'REVLST';
const z1350 = 'BUKLST';
const j1076 = 'SORT';
const k1077 = 'CLMN';
const x1078 = 'CELL';
const y1079 = 'ITEMS';
const b1080 = 'COUNT';
const OBJECT_COUNT = 'OBJCOUNT';
const q1081 = 'LCONT';
const LIST_FIND = 'LFIND';
const i1082 = 'SELECT';
const e1359 = 'LSTSEL';
const e1083 = 'IF';
const b1084 = 'LSTFLT';
const n1086 = 'ANY#';
const f1087 = [q1054, b1055, y1056, f1057, COLOR_LIST_VALUE, FILL_LIST_VALUE, COLOR_STOP_LIST_VALUE, q1068, u1070, n1071, n1072, y1073, y1079, b1080, q1081, LIST_FIND, e1062, ADVANCE];
const a1088 = [q1054, b1055, y1056, f1057, COLOR_LIST_VALUE, FILL_LIST_VALUE, COLOR_STOP_LIST_VALUE];
const u1085 = 'ITER';
const b1107 = 'PROB';
const HOLD = 'HOLD';
const BOOLEAN_NUMBER = 'BOOL';
const c1090 = 'NUM#';
const n1091 = 'NUM';
const BOUNDED_NUMBER = 'BNDNUM';
const s1354 = 'NPREC';
const d1092 = 'NSIGN';
const g1093 = 'ABS';
const u1355 = 'NEG';
const y1094 = 'ROUND';
const j1356 = 'QUANT';
const w1095 = 'SMINMAX';
const m1096 = 'MINMAX';
const j1097 = 'LIM';
const v1098 = 'NCURVE';
const a1357 = 'NMAP';
const x1358 = 'NBIAS';
const a1099 = 'ISNAN';
const j1100 = 'CONST';
const i1101 = 'DATE';
const x1102 = 'SEQ';
const h1103 = 'RANGE';
const s1104 = 'WAVE';
const k1105 = 'RAND';
const l1106 = 'NOISE';
const x1108 = 'ACCUM';
const s1109 = 'LERP';
const s1110 = 'SOLVE';
const o1111 = 'NANIM';
const h1112 = 'SMATH';
const u1113 = 'MATH';
const m1114 = 'ADD';
const h1115 = 'SUB';
const c1116 = 'MUL';
const z1117 = 'DIV';
const k1118 = 'MOD';
const i1119 = 'EXP';
const e1120 = 'NBOOL';
const t1121 = 'NOT';
const l1122 = 'AND';
const b1123 = 'OR';
const y1124 = 'XOR';
const h1125 = 'CMP';
const j1126 = 'EQ';
const h1127 = 'NE';
const z1128 = 'LT';
const g1129 = 'LE';
const k1130 = 'GT';
const a1131 = 'GE';
const o1132 = 'TRIG';
const x1133 = 'SIN';
const o1134 = 'COS';
const t1135 = 'TAN';
const t1136 = 'ATAN2';
const a1137 = 'CNVANG';
const h1142 = 'TEXT#';
const h1143 = 'TEXT';
const w1144 = 'TLEN';
const n1145 = 'TTRIM';
const f1146 = 'TSUB';
const j1147 = 'TCONT';
const TEXT_FIND = 'TFIND';
const t1148 = 'TCASE';
const r1149 = 'TREPL';
const TEXT_ADD = 'TADD';
const t1150 = 'TJOIN';
const m1151 = 'TPAD';
const y1152 = 'TCMP';
const m1153 = 'TCHAR';
const v1154 = 'TUNI';
const TEXT_ESCAPE = 'TESC';
const TEXT_UNESCAPE = 'TUNESC';
const p1155 = 'INDEX';
const w1156 = 'N2T';
const BOOLEAN_TO_TEXT = 'B2T';
const v1157 = 'C2T';
const i1158 = 'T2N';
const TEXT_TO_BOOLEAN = 'T2B';
const l1159 = 'T2C';
const a1160 = 'TSPLT';
const w3601 = 'PRJSON';
const b1162 = 'PRCSV';
const r1163 = 'FETCH';
const i1164 = 'TFILE';
const TO_JSON = 'TOJSON';
const j1167 = 'COL#';
const f1168 = 'COL';
const t1169 = 'CVAL';
const o1170 = 'CCOR';
const b1171 = 'CCNT';
const o1172 = 'CDLTE';
const t1173 = 'BLND';
const COLOR_SCHEME = 'CPAL';
const a1174 = 'CLERP';
const s1175 = 'CBLND';
const d1177 = 'FILL#';
const e1178 = 'FILL';
const l1179 = [d1177, e1178];
const b1180 = 'STRK#';
const a1181 = 'STRK';
const o1182 = [b1180, a1181];
const y1189 = 'STRKSD#';
const w1190 = 'STRKSD';
const x1191 = [y1189, w1190];
const i1183 = 'CSTOP#';
const m1184 = 'CSTOP';
const x1185 = [i1183, m1184];
const c1186 = 'GRAD#';
const c1187 = 'GRAD';
const c1188 = [c1186, c1187];
const r1192 = 'RCRN#';
const a1193 = 'RCRN';
const q1194 = [r1192, a1193];
const e1195 = 'DRSH#';
const k1196 = 'DRSH';
const p1197 = [e1195, k1196];
const y1198 = 'INSH#';
const e1199 = 'INSH';
const n1200 = [y1198, e1199];
const w1201 = 'LBLR#';
const e1202 = 'LBLR';
const z1203 = [w1201, e1202];
const d1204 = 'BBLR#';
const s1205 = 'BBLR';
const y1206 = [d1204, s1205];
const e1207 = 'MASK#';
const m1208 = 'MASK';
const c1209 = [e1207, m1208];
const d1210 = 'BLEND#';
const s1211 = 'BLEND';
const q1212 = [d1210, s1211];
const a1215 = 'CSTL';
const p1216 = 'SHP#';
const s1217 = 'RECT#';
const f1218 = 'RECT';
const l1219 = [s1217, f1218];
const p1220 = 'LINE#';
const y1221 = 'LINE';
const h1222 = [p1220, y1221];
const g1223 = 'ELPS#';
const w1224 = 'ELPS';
const q1225 = [g1223, w1224];
const j1226 = 'TRPZ#';
const n1227 = 'TRPZ';
const d1228 = [j1226, n1227];
const f1235 = 'POLY#';
const w1236 = 'POLY';
const o1237 = [f1235, w1236];
const f1238 = 'STAR#';
const t1239 = 'STAR';
const y1240 = [f1238, t1239];
const x1241 = 'TXTS#';
const p1242 = 'TXTS';
const z1243 = [x1241, p1242];
const v1244 = 'PT#';
const d1245 = 'PT';
const g1246 = [v1244, d1245];
const u1247 = 'PCORN';
const q1248 = 'VPATH#';
const p1249 = 'VPATH';
const o1250 = [q1248, p1249];
const s1251 = 'VPT#';
const k1252 = 'VPT';
const n1253 = [s1251, k1252];
const p1254 = 'VEDGE#';
const p1255 = 'VEDGE';
const o1256 = [p1254, p1255];
const x1257 = 'VREG#';
const c1258 = 'VREG';
const m1259 = [x1257, c1258];
const i1260 = 'VNET#';
const k1261 = 'VNET';
const b1262 = [i1260, k1261];
const r1263 = 'SGRP#';
const v1264 = 'SGRP';
const h1265 = [r1263, v1264];
const n1266 = 'FRM#';
const q1267 = 'FRM';
const a1268 = [n1266, q1267];
const h1230 = 'ARC#';
const v1229 = 'ARC';
const w1231 = [h1230, v1229];
const a1233 = 'WAVEP#';
const f1232 = 'WAVEP';
const x1234 = [a1233, f1232];
const e1269 = 'MOVE';
const e1270 = 'ROT';
const b1271 = 'SCALE';
const n1272 = 'SKEW';
const SHOW_CENTER = 'SHOWCNTR';
const l1273 = 'SCENTR';
const m1274 = 'RSTX';
const s1275 = 'PLACE';
const i1276 = 'APPLY';
const PATH_LENGTH = 'PTHLEN';
const JOIN_PATHS = 'JOINPTH';
const REORIENT_PATHS = 'REORPTH';
const o1283 = 'PTALPATH';
const g1284 = 'CPTONPATH';
const h1277 = 'MESPT';
const l1278 = 'PTANGLE';
const t1279 = 'VECLEN';
const k1280 = 'CIRCEN';
const ARC_FROM_POINTS = 'ARCPT';
const p1281 = 'INTLIN';
const x1282 = 'PTLERP';
const REVERSE_PATH = 'REVPTH';
const BLEND_PATH = 'BLENDPTH';
const p1285 = 'SBOOL';
const l1286 = 'SBOOL#';
const r1287 = 'SBOOLU';
const k1288 = 'SBOOLS';
const h1289 = 'SBOOLI';
const q1290 = 'SBOOLE';
const l1292 = 'RETAIN';
const EXPORT = 'EXPORT';
const y1297 = 'GROUP';
const d1298 = 'GPARAM';
const q1300 = 'CMNT';
const p1301 = 'CMNTARR';
const t1302 = 'PANEL';
const m1303 = 'ACT';
const k1304 = 'BFACT';
const n1305 = 'BFLST';
const e1306 = 'DIS';
const y1307 = 'NOC';
const PARAM = 'PARAM';
const b1308 = 'LOG';
const w1309 = 'GRAPH';
const o1089 = [s1058, o1059, y1060, ...f1087, b1069, u1070, n1071, n1072, y1073, c1074, q1348, s1349, x1075, k1077, j1076, x1078, y1079, i1082, e1359, e1083, b1084, k1061, e1062, ADVANCE, u1085, b1107, HOLD, m1063, d1064, w3601, b1162, TO_JSON, s1065, z1066, l1067, i1351, o1352, COLOR_SCHEME, o1172, v1157, l1292];
const l1138 = [u1113, h1112, m1114, h1115, c1116, z1117, k1118, i1119];
const r1139 = [e1120, t1121, l1122, b1123, y1124];
const i1140 = [h1125, j1126, h1127, z1128, g1129, k1130, a1131];
const m1141 = [o1132, x1133, o1134, t1135, t1136];
const r1165 = [c1090, b1055, n1091, BOUNDED_NUMBER, BOOLEAN_NUMBER, s1354, d1092, g1093, u1355, y1094, j1356, w1095, m1096, j1097, v1098, a1357, x1358, a1099, j1100, i1101, x1102, h1103, s1104, k1105, l1106, x1108, s1109, s1110, o1111, w1156, BOOLEAN_TO_TEXT, m1153, ...l1138, ...r1139, ...i1140, ...m1141, a1137, z1350];
const a1166 = [h1142, y1056, h1143, w1144, n1145, f1146, j1147, TEXT_FIND, t1148, TEXT_ADD, t1150, m1151, r1149, y1152, v1154, TEXT_ESCAPE, TEXT_UNESCAPE, p1155, i1158, TEXT_TO_BOOLEAN, l1159, a1160, r1163, i1164];
const m1176 = [j1167, f1168, t1169, o1170, t1173, b1171, o1172, a1174, s1175, v1157];
const COLOR_HEADER_TYPES = [f1168, e1178, a1181, m1184, c1187];
const COLOR_VALUES = [j1167, d1177, b1180, i1183, c1186];
const x1213 = [...x1191, ...q1194, ...p1197, ...n1200, ...z1203, ...y1206, ...q1212, ...c1209];
const j1214 = [j1167, d1177, c1186, b1180, y1189, e1195, y1198, w1201, d1204, d1210, e1207];
const PATH_TYPES = [p1249, n1227, v1229, f1232];
const PATH_VALUES = [q1248, j1226, h1230, a1233];
const y1291 = [p1285, l1286, r1287, k1288, h1289, q1290];
const s1293 = [p1216, f1057, s1217, p1220, g1223, j1226, f1235, f1238, x1241, v1244, q1248, s1251, p1254, x1257, i1260, h1230, a1233, r1263, n1266, l1286, e1195, y1198, w1201, d1204, d1210, e1207];
const l1294 = [e1270, b1271, n1272];
const n1295 = [...s1293, ...l1219, ...h1222, ...q1225, ...d1228, ...o1237, ...y1240, ...z1243, ...g1246, u1247, ...o1250, ...n1253, ...o1256, ...m1259, ...b1262, ...w1231, ...x1234, ...h1265, ...a1268, ...y1291, e1269, ...l1294, SHOW_CENTER, l1273, m1274, s1275, i1276, PATH_LENGTH, JOIN_PATHS, REORIENT_PATHS, o1283, g1284, h1277, l1278, t1279, k1280, v1229, f1232, ARC_FROM_POINTS, p1281, x1282, REVERSE_PATH, BLEND_PATH, x1353, EXPORT];
const NUMBER_VALUES = [c1090, b1055];
const TEXT_VALUES = [h1142, y1056];
const w1296 = [q1054, b1055, y1056, f1057, VARIABLE_VALUE, c1090, h1142, j1167, d1177, i1183, c1186, b1180, i1183, c1186, p1216, s1217, p1220, g1223, j1226, f1235, f1238, x1241, v1244, q1248, s1251, p1254, x1257, i1260, r1263, n1266, r1192, e1195, y1198, w1201, d1204, d1210, e1207];
const n1299 = [y1297, d1298];
const g1310 = [[k1118, '%'], [z1117, '/'], [h1115, '−'], [m1114, '+'], [c1116, '×'], [i1119, 'e<sup>x']];
const h1311 = [[z1117, '/'], [h1115, '−'], [m1114, '+'], [c1116, '×']];
const l1312 = 0;
const j1313 = 1;
const c1314 = 2;
const s1315 = 3;
const n1316 = [[l1312, 'not'], [j1313, 'xor'], [c1314, 'or'], [s1315, 'and']];
const n1317 = 0;
const k1318 = 1;
const g1319 = 2;
const v1320 = 3;
const w1321 = 4;
const f1322 = 5;
const s1323 = [[n1317, '<'], [k1318, '≤'], [g1319, '≠'], [v1320, '='], [w1321, '≥'], [f1322, '>']];
const o1324 = 0;
const g1325 = 1;
const p1326 = 2;
const v1327 = 3;
const a1328 = 4;
const y1329 = 5;
const w1330 = [[o1324, 'sin'], [g1325, 'cos'], [p1326, 'tan'], [v1327, 'asin'], [a1328, 'acos'], [y1329, 'atan']];
const k1331 = 'EMPTY';
const d1332 = 'CONNECT';
const x1333 = 'CREATE';
const d1334 = 'CREATE_INSERT';
const v1335 = 'DELETE';
const v1336 = 'DISCONNECT';
const l1337 = 'LINK_STYLE';
const d1338 = 'LINK_VARIABLE';
const s1339 = 'LINK_VARIABLE_GROUP';
const l1340 = 'MAKE_ACTIVE';
const MAKE_NOT_CONDITION_ACTION = 'MAKE_NOT_CONDITION';
const n1341 = 'MAKE_PASSIVE';
const q1342 = 'PASTE';
const o1343 = 'RECONNECT';
const a1344 = 'REMOVE';
const j1345 = 'RENAME';
const m1346 = 'REORDER_INPUTS';
const c1347 = 'REORDER_CONNECTIONS';
const y1360 = 'SELECT';
const i1361 = 'SELECT_MOVE';
const y1362 = 'MOVE_NODES';
const c1363 = 'SET_PARAM_VALUE';
const SET_MULTIPLE_VALUES_ACTION = 'SET_MULTIPLE_VALUES';
const SET_SHOW_VALUE_NAMES_ACTION = 'SET_SHOW_VALUE_NAMES';
const a1364 = 'SET_PARAM_SETTING';
const w1365 = 'SET_NODE_RECT';
const d1366 = 'TOGGLE_DISABLE';
const n1367 = 'TOGGLE_PARAM_HEADER';
const g1368 = 'SET_CURRENT_GRAPH';
const g1369 = 'CREATE_PAGE';
const w1370 = 'DELETE_PAGE';
const c1371 = 'GROUP_NODES';
const j1372 = 'UNGROUP_NODES';
const r1373 = 'HIGHLIGHT_NODES';
const SCROLL_LIST_NODE_ACTION = 'SCROLL_LIST_NODE';
const SET_LIST_DIVIDER_ACTION = 'SET_LIST_DIVIDER';
const SET_NODE_PARAM_ACTION = 'SET_NODE_PARAM';
const u1374 = 'BNORM';
const i1375 = 'BDARK';
const f1376 = 'BMULT';
const r1377 = 'BPDRK';
const s1378 = 'BBURN';
const f1379 = 'BLITE';
const t1380 = 'BSCRN';
const m1381 = 'BPLGT';
const f1382 = 'BDODG';
const h1383 = 'BOVER';
const y1384 = 'BSOFT';
const n1385 = 'BHARD';
const w1386 = 'BDIFF';
const g1387 = 'BEXCL';
const f1388 = 'BHUE';
const j1389 = 'BSAT';
const l1390 = 'BCOL';
const u1391 = 'BLUM';
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
const n1392 = [[u1374, 'normal', 'NORMAL'], [i1375, 'darken', 'DARKEN'], [f1376, 'multiply', 'MULTIPLY'], [r1377, 'plus darker', 'LINEAR_BURN'], [s1378, 'color burn', 'COLOR_BURN'], [f1379, 'lighten', 'LIGHTEN'], [t1380, 'screen', 'SCREEN'], [m1381, 'plus lighter', 'LINEAR_DODGE'], [f1382, 'color dodge', 'COLOR_DODGE'], [h1383, 'overlay', 'OVERLAY'], [y1384, 'soft light', 'SOFT_LIGHT'], [n1385, 'hard light', 'HARD_LIGHT'], [w1386, 'difference', 'DIFFERENCE'], [g1387, 'exclusion', 'EXCLUSION'], [f1388, 'hue', 'HUE'], [j1389, 'saturation', 'SATURATION'], [l1390, 'color', 'COLOR'], [u1391, 'luminosity', 'LUMINOSITY']];
const EllipsePositions = ['top-left', 'center'];
const TextAlignX = ['left', 'center', 'right', 'justify'];
const TextAlignY = ['bottom', 'middle', 'top'];
const PathDegrees = ['linear', 'quadratic', 'cubic', 'smooth', 'sine X', 'sine Y'];
const PathJoinDegrees = ['linear', 'cubic', 'smooth', 'sine X', 'sine Y'];
const PathWindings = ['even-odd', 'non-zero'];
const StrokeAlign = ['inside', 'center', 'outside'];
const StrokeJoin = ['miter', 'bevel', 'round'];
const StrokeCap = ['none', 'square', 'round'];
const LayerMaskTypes = ['alpha', 'vector', 'luminance'];
const FramePositions = ['relative', 'absolute'];
const y1393 = [['thin', 100], ['extra light', 200], ['light', 300], ['regular', 400], ['medium', 500], ['semi bold', 600], ['bold', 700], ['extra bold', 800], ['black', 900]];
const u1394 = 0;
const c1395 = 1;
const p1396 = 2;
const n1397 = 2;
const n1398 = 3;
const d1399 = 3;
const f1400 = 4;
const z1401 = 4;
const FO_PERSIST = 5;
const j1403 = 6;
const w1404 = 7;
const x1405 = 8;
const y1406 = 9;
const w1407 = 10;
const FO_VARIABLE_TYPE = 10;
const d1408 = 11;
const FO_VARIABLE_COUNT = 11;
const j1409 = 12;
const FO_VARIABLE_IS_ALIAS = 12;
const o1410 = 13;
const r1411 = 14;
const i1412 = 15;
const s1413 = 16;
const l1414 = 17;
const l1415 = 18;
const d1416 = 19;
const r1417 = 20;
const e1418 = 21;
const m1419 = 22;
const a1420 = 23;
const x1421 = 24;
const j1452 = 24;
const h1422 = 24;
const x1423 = 25;
const a1453 = 25;
const v1424 = 26;
const b1425 = 27;
const p1426 = 28;
const k1427 = 28;
const x1428 = 28;
const s1429 = 28;
const t1430 = 28;
const s1431 = 28;
const e1432 = 28;
const o1433 = 28;
const z1434 = 29;
const t1435 = 29;
const q1436 = 29;
const v1437 = 29;
const l1438 = 29;
const d1454 = 29;
const o1440 = 30;
const z1441 = 30;
const d1442 = 30;
const w1443 = 30;
const b1439 = 30;
const u1444 = 31;
const u1445 = 31;
const l1446 = 32;
const u1447 = 33;
const n1448 = 34;
const i1449 = 35;
const z1450 = 36;
const y1451 = 37;
const c2895 = '12345679ABCDEFGHJKLMNPQRSTUVWXYZ';
function d844(array, chars = c2895) { let m846 = ''; let len = array.length; let i = 0; while (len > 0) {
    if (len >= 5) {
        const a0 = array[i], a1 = array[i + 1], a2 = array[i + 2], a3 = array[i + 3], a4 = array[i + 4];
        m846 += chars[(a0 & 0xF8) >>> 3];
        m846 += chars[((a0 & 0x07) << 2) | ((a1 & 0xC0) >>> 6)];
        m846 += chars[(a1 & 0x3E) >>> 1];
        m846 += chars[((a1 & 0x01) << 4) | ((a2 & 0xF0) >>> 4)];
        m846 += chars[((a2 & 0x0F) << 1) | ((a3 & 0x80) >>> 7)];
        m846 += chars[(a3 & 0x7C) >>> 2];
        m846 += chars[((a3 & 0x03) << 3) | ((a4 & 0xE0) >>> 5)];
        m846 += chars[(a4 & 0x1F)];
    }
    else if (len == 4) {
        const a0 = array[i], a1 = array[i + 1], a2 = array[i + 2], a3 = array[i + 3];
        m846 += chars[(a0 & 0xF8) >>> 3];
        m846 += chars[((a0 & 0x07) << 2) | ((a1 & 0xC0) >>> 6)];
        m846 += chars[(a1 & 0x3E) >>> 1];
        m846 += chars[((a1 & 0x01) << 4) | ((a2 & 0xF0) >>> 4)];
        m846 += chars[((a2 & 0x0F) << 1) | ((a3 & 0x80) >>> 7)];
        m846 += chars[(a3 & 0x7C) >>> 2];
        m846 += chars[((a3 & 0x03) << 3)];
    }
    else if (len == 3) {
        const a0 = array[i], a1 = array[i + 1], a2 = array[i + 2];
        m846 += chars[(a0 & 0xF8) >>> 3];
        m846 += chars[((a0 & 0x07) << 2) | ((a1 & 0xC0) >>> 6)];
        m846 += chars[(a1 & 0x3E) >>> 1];
        m846 += chars[((a1 & 0x01) << 4) | ((a2 & 0xF0) >>> 4)];
        m846 += chars[((a2 & 0x0F) << 1)];
    }
    else if (len == 2) {
        const a0 = array[i], a1 = array[i + 1];
        m846 += chars[(a0 & 0xF8) >>> 3];
        m846 += chars[((a0 & 0x07) << 2) | ((a1 & 0xC0) >>> 6)];
        m846 += chars[(a1 & 0x3E) >>> 1];
        m846 += chars[((a1 & 0x01) << 4)];
    }
    else if (len == 1) {
        const a0 = array[i];
        m846 += chars[(a0 & 0xF8) >>> 3];
        m846 += chars[((a0 & 0x07) << 2)];
    }
    i += 5;
    len -= 5;
} return m846; }
function b845(m846, chars = c2895) { const array = []; let len = m846.length; let c = 0; while (len > 0) {
    if (len >= 8) {
        const c0 = chars.indexOf(m846[c]), c1 = chars.indexOf(m846[c + 1]), c2 = chars.indexOf(m846[c + 2]), c3 = chars.indexOf(m846[c + 3]), c4 = chars.indexOf(m846[c + 4]), c5 = chars.indexOf(m846[c + 5]), c6 = chars.indexOf(m846[c + 6]), c7 = chars.indexOf(m846[c + 7]);
        array.push((c0 << 3) | ((c1 & 0x1C) >>> 2));
        array.push(((c1 & 0x03) << 6) | (c2 << 1) | ((c3 & 0x10) >>> 4));
        array.push(((c3 & 0x0F) << 4) | ((c4 & 0x1E) >>> 1));
        array.push(((c4 & 0x01) << 7) | (c5 << 2) | ((c6 & 0x18) >>> 3));
        array.push(((c6 & 0x07) << 5) | c7);
    }
    else if (len == 7) {
        const c0 = chars.indexOf(m846[c]), c1 = chars.indexOf(m846[c + 1]), c2 = chars.indexOf(m846[c + 2]), c3 = chars.indexOf(m846[c + 3]), c4 = chars.indexOf(m846[c + 4]), c5 = chars.indexOf(m846[c + 5]), c6 = chars.indexOf(m846[c + 6]);
        array.push((c0 << 3) | ((c1 & 0x1C) >>> 2));
        array.push(((c1 & 0x03) << 6) | (c2 << 1) | ((c3 & 0x10) >>> 4));
        array.push(((c3 & 0x0F) << 4) | ((c4 & 0x1E) >>> 1));
        array.push(((c4 & 0x01) << 7) | (c5 << 2) | ((c6 & 0x18) >>> 3));
    }
    else if (len == 5) {
        const c0 = chars.indexOf(m846[c]), c1 = chars.indexOf(m846[c + 1]), c2 = chars.indexOf(m846[c + 2]), c3 = chars.indexOf(m846[c + 3]), c4 = chars.indexOf(m846[c + 4]);
        array.push((c0 << 3) | ((c1 & 0x1C) >>> 2));
        array.push(((c1 & 0x03) << 6) | (c2 << 1) | ((c3 & 0x10) >>> 4));
        array.push(((c3 & 0x0F) << 4) | ((c4 & 0x1E) >>> 1));
    }
    else if (len == 4) {
        const c0 = chars.indexOf(m846[c]), c1 = chars.indexOf(m846[c + 1]), c2 = chars.indexOf(m846[c + 2]), c3 = chars.indexOf(m846[c + 3]);
        array.push((c0 << 3) | ((c1 & 0x1C) >>> 2));
        array.push(((c1 & 0x03) << 6) | (c2 << 1) | ((c3 & 0x10) >>> 4));
    }
    else if (len == 2) {
        const c0 = chars.indexOf(m846[c]), c1 = chars.indexOf(m846[c + 1]);
        array.push((c0 << 3) | ((c1 & 0x1C) >>> 2));
    }
    c += 8;
    len -= 8;
} return array; }
function logSavedNode(nodeKey, g4102) {
    return __awaiter(this, void 0, void 0, function* () { const log = l2120(yield b1564(nodeKey, false)); if (g4102) {
        console.log('%c%s\n%c%s', 'background: #fa24; color: white;', z1052(nodeKey), 'background: #fa44; color: #edc;', log);
    }
    else {
        console.log('%c%s\n%c%s', 'background: #fdb; color: black;', z1052(nodeKey), 'background: #fed; color: black;', log);
    } });
}
function l2120(json) { let f4127 = json.replace('{\n', '').replace('\n}', '').replace('[\n' + c867, '').replace('\n' + c867 + ']', '').split(c867 + '"params":\n').join('').split('": "').join(': ').split('", "').join(': ').split(c867 + '"').join(c867).split(c867 + c867 + '["').join(c867 + c867).split('",\n').join('\n').split('"\n').join('\n').split('"],\n').join('\n'); if (f4127[f4127.length - 1] == '"')
    f4127 = f4127.substring(0, f4127.length - 1); if (f4127.substring(f4127.length - 2) == '"]')
    f4127 = f4127.substring(0, f4127.length - 2); return f4127; }
function c2121(json) { let f4127 = json.replace('{\n', '').replace('\n}', '').replace('[\n' + c867, '').replace('\n' + c867 + ']', ''); return f4127; }
function n2122(t243, g4102) { const a4303 = q922(t243, true); if (g4102) {
    console.log('%c%s', 'background: #4f44; color: #ded', a4303);
}
else {
    console.log('%c%s', 'background: #cfc; color: black;', a4303);
} }
console.clear();
figma.payments.setPaymentStatusInDevelopment({ type: 'PAID' });
figma.loadAllPagesAsync().then(() => { figma.on('documentchange', y1535); figma.on('selectionchange', i1543); figma.on('close', t1536); });
p1524(true);
d1525();
figma.clientStorage.getAsync('pro').then(data => { figma.showUI(__html__, { visible: false, themeColors: true, title: PLUGIN_NAME + (data !== true ? ' (Free version)' : '') }); });
var t2807 = figma.viewport.zoom;
setInterval(c1540, 100);
var strBackgrounds = '';
setInterval(figCheckBackgrounds, 500);
const s2896 = 'clock_';
const p2897 = 1000;
var t2898 = false;
var objectCenterSize = 15;
var tempVariableCollection = null;
function b1537(genVersion) { m1565('generatorVersion', genVersion.toString()); (function () {
    return __awaiter(this, void 0, void 0, function* () { figma.currentPage.loadAsync().then(() => __awaiter(this, void 0, void 0, function* () { let g2899 = yield figma.currentPage.getPluginData(figma.currentUser.id + ',windowWidth'); let x2900 = yield figma.currentPage.getPluginData(figma.currentUser.id + ',windowHeight'); let u2901; let p2902; if (g2899 === NULL) {
        u2901 = 800;
        figma.currentPage.setPluginData(figma.currentUser.id + ',windowWidth', g2899.toString());
    }
    else
        u2901 = parseInt(g2899); if (x2900 === NULL) {
        p2902 = 600;
        figma.currentPage.setPluginData(figma.currentUser.id + ',windowHeight', x2900.toString());
    }
    else
        p2902 = parseInt(x2900); figma.ui.resize(Math.max(minWindowWidth, u2901), Math.max(minWindowHeight, p2902)); figma.ui.show(); const fonts = yield figma.listAvailableFontsAsync(); const eula = (yield figma.clientStorage.getAsync('eula')) === 'true'; const tutorials = (yield figma.clientStorage.getAsync('tutorials')) === 'true'; const isLocked = yield a1542(); b1544({ cmd: 'uiReturnFigStartGenerator', currentUser: figma.currentUser, viewportRect: figma.viewport.bounds, viewportZoom: figma.viewport.zoom, fonts: fonts, eula: eula, tutorials: tutorials, isLocked: isLocked, windowWidth: u2901, windowHeight: p2902 }); })); });
})(); }
function b1538() {
    return __awaiter(this, void 0, void 0, function* () { p1524(); d1525(); figma.showUI(__html__, { visible: false, themeColors: true }); });
}
function b1539() { setInterval(d1541, p2897); }
function c1540() { if (figma.viewport.zoom == t2807)
    return; t2807 = figma.viewport.zoom; q2795(); g1558(); r1560(); }
function figCheckBackgrounds() { if (strBackgrounds != JSON.stringify(figma.currentPage.backgrounds)) {
    g1558();
    strBackgrounds = JSON.stringify(figma.currentPage.backgrounds);
} }
function d1541() { m1565(s2896 + figma.currentUser.sessionId.toString(), Date.now().toString()); }
function a1542() {
    return __awaiter(this, void 0, void 0, function* () { yield figma.currentPage.loadAsync(); const clocks = figma.currentPage.getPluginDataKeys().filter(k => k.length > s2896.length && k.substring(0, s2896.length) == s2896 && k.substring(s2896.length) != figma.currentUser.sessionId.toString()).map((k) => __awaiter(this, void 0, void 0, function* () { return parseInt(yield b1564(k)); })); clocks.sort(); const now = Date.now(); const locked = clocks.length > 0 && now - (yield clocks[clocks.length - 1]) < p2897 * 2; return locked; });
}
function i1543() { q2795(); }
var v2828 = new Array();
var v2830 = new Array();
function figGetObjectsFromIds(objectIds) {
    return __awaiter(this, void 0, void 0, function* () { for (let i = q2864.length - 1; i >= 0; i--)
        if (!q2864[i].removed && objectIds.includes(q2864[i].getPluginData('objectId')))
            q2864.splice(i, 1); for (let i = h2880.length - 1; i >= 0; i--)
        if (h2880[i].removed || objectIds.includes(h2880[i].getPluginData('objectId')))
            h2880.splice(i, 1); yield figma.currentPage.loadAsync(); return figma.currentPage.findAll(o => objectIds.includes(o.getPluginData('objectId'))); });
}
function c1523(nodeIds) {
    return __awaiter(this, void 0, void 0, function* () { for (let i = q2864.length - 1; i >= 0; i--)
        if (!q2864[i].removed && nodeIds.includes(q2864[i].getPluginData('nodeId')))
            q2864.splice(i, 1); for (let i = h2880.length - 1; i >= 0; i--)
        if (h2880[i].removed || nodeIds.includes(h2880[i].getPluginData('nodeId')))
            h2880.splice(i, 1); yield figma.currentPage.loadAsync(); figma.currentPage.findAll(o => nodeIds.includes(o.getPluginData('nodeId'))).forEach(o => { if (!o.removed)
        o.remove(); }); v2828 = v2828.filter(a => !nodeIds.includes(a.nodeId)); });
}
function p1524(z1526 = false) { for (const b1531 of figma.currentPage.children) {
    if (b1531.removed)
        continue;
    if (b1531.getPluginData('objectId') != '' && b1531.getPluginData('userId') == figma.currentUser.id && (parseInt(b1531.getPluginData('retain')) == 0 || z1526))
        b1531.remove();
} }
function o1527(nodeIds, i1528) { for (let i = v2828.length - 1; i >= 0; i--) {
    const f2829 = v2828[i];
    if (!nodeIds.includes(f2829.nodeId))
        continue;
    for (let j = f2829.objects.length - 1; j >= 0; j--) {
        const b1531 = f2829.objects[j];
        if (b1531.removed || !x1529(b1531, i1528)) {
            if (!b1531.removed)
                b1531.remove();
            u941(f2829.objects, b1531);
            if (q2864.includes(b1531))
                u941(q2864, b1531);
            if (h2880.includes(b1531))
                u941(h2880, b1531);
        }
        if (!b1531.removed) {
            if (parseInt(b1531.getPluginData('retain')) == 2)
                k1550(b1531);
        }
    }
    if (isEmpty(f2829.objects))
        u941(v2828, f2829);
} }
function x1529(b1531, i1528) { if (b1531.type == v1264 || b1531.type == q1267) {
    for (const child of b1531.children) {
        const found = x1529(child, i1528);
        if (found)
            return found;
    }
}
else {
    const found = i1528.find(o => b1531.getPluginData('objectId') == o[p1396] && b1531.getPluginData('userId') == figma.currentUser.id || o[FO_PERSIST] == 2 && o[FO_PERSIST] == b1531.getPluginData('retain'));
    if (found)
        return found;
} return null; }
function g1532(nodeIds, d1533) { figma.getLocalPaintStylesAsync().then(paintStyles => { paintStyles.filter(s => nodeIds.includes(s.getPluginData('nodeId'))).forEach(s => { const nodeId = s.getPluginData('nodeId'); const existing = z921(s.getPluginData('existing')); if (!existing) {
    s.remove();
}
else if (d1533) {
    b943(v2830, a => a.nodeId == nodeId);
    s.setPluginData('type', NULL);
    s.setPluginData('nodeId', NULL);
    s.setPluginData('existing', NULL);
} }); }); if (d1533)
    v2830 = v2830.filter(a => !nodeIds.includes(a.nodeId)); }
var u1534 = false;
function y1535(e) { for (const change of e.documentChanges) {
    switch (change.type) {
        case 'STYLE_CREATE':
            if (!change.style)
                break;
            if (!u1534) {
                change.style.setPluginData('type', NULL);
                change.style.setPluginData('nodeId', NULL);
                change.style.setPluginData('existing', NULL);
            }
            break;
        case 'STYLE_PROPERTY_CHANGE': {
            if (!change.style)
                break;
            if (!u1534) {
                const msg = { cmd: 'uiStylePropertyChange', styleId: f944(change.id), properties: change.properties, name: '', paints: [] };
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
                b1544(msg);
            }
            break;
        }
        case 'STYLE_DELETE':
            b1544({ cmd: 'uiStyleDelete', styleId: change.id });
            break;
    }
} u1534 = false; }
function t1536() { p1524(); d1525(); b1544({ cmd: 'updateMetrics' }); }
figma.ui.onmessage = function (msg) { msg = JSON.parse(msg); if (msg.cmd == 'returnUiGetValueForFigma')
    return; switch (msg.cmd) {
    case 'figStartGenerator':
        b1537(msg.generatorVersion);
        break;
    case 'figRestartGenerator':
        b1538();
        break;
    case 'figFinishStart':
        b1539();
        break;
    case 'figDockWindowNormal':
        v2837('normal');
        break;
    case 'figDockWindowMaximize':
        v2837('maximize');
        break;
    case 'figDockWindowTop':
        v2837('top');
        break;
    case 'figDockWindowLeft':
        v2837('left');
        break;
    case 'figDockWindowRight':
        v2837('right');
        break;
    case 'figDockWindowBottom':
        v2837('bottom');
        break;
    case 'figGetMousePosition':
        m1610(msg.clientPosition);
        break;
    case 'figResizeWindow':
        o1613(msg.width, msg.height);
        break;
    case 'figSetWindowRect':
        g1611(msg.x, msg.y, msg.width, msg.height);
        break;
    case 'figNotify':
        b1614(msg);
        break;
    case 'figGetLocalData':
        x1562(msg.key);
        break;
    case 'figSetLocalData':
        f1563(msg.key, msg.value);
        break;
    case 'figClearAllLocalData':
        g4122();
        break;
    case 'figGetPageData':
        b1564(msg.key);
        break;
    case 'figSetPageData':
        m1565(msg.key, msg.value);
        break;
    case 'figSavePages':
        s1570(msg.pageIds, msg.pageJson, msg.currentPageId);
        break;
    case 'figLoadNodesAndConns':
        t1567(msg.debugMode);
        break;
    case 'figSaveNodes':
        o1571(msg.nodeIds, msg.nodeJson);
        break;
    case 'figGetAllLocalTemplateNames':
        g2834();
        break;
    case 'figSaveLocalTemplate':
        i1572(msg.w4123, msg.template);
        break;
    case 'figRemoveConnsToNodes':
        q1573(msg.nodeIds);
        break;
    case 'figRemoveSavedNodesAndConns':
        t1574(msg.nodeIds);
        break;
    case 'figRemoveAllSavedNodesAndConns':
        j1575();
        break;
    case 'figLogAllSavedNodesAndConns':
        j1576(msg.g4102);
        break;
    case 'figLogAllSavedNodes':
        a1577(msg.g4102);
        break;
    case 'figLogAllSavedConns':
        b1578(msg.g4102);
        break;
    case 'figLogAllSavedPageKeys':
        s1579(msg.g4102);
        break;
    case 'figLogAllSavedPages':
        i1580(msg.g4102);
        break;
    case 'figLogAllSavedConnKeys':
        e1581(msg.g4102);
        break;
    case 'figLogAllLocalData':
        b1582(msg.g4102);
        break;
    case 'figGetValue':
        b1583(msg.key, msg.spec);
        break;
    case 'figRemoveSavedPage':
        l1585(msg.pageId);
        break;
    case 'figRemoveAllSavedPages':
        b1586();
        break;
    case 'figSaveConnection':
        w1587(msg.key, msg.json);
        break;
    case 'figSaveConnections':
        q1588(msg.keys, msg.json);
        break;
    case 'figUpdateSavedConnections':
        y1589(msg.curKeys, msg.newKeys, msg.json);
        break;
    case 'figDeleteSavedConnection':
        r1590(msg.key);
        break;
    case 'figRemoveAllSavedConnections':
        v1591();
        break;
    case 'figDeleteSavedConnectionsToNode':
        u1592(msg.nodeId);
        break;
    case 'figDeleteSavedConnectionsFromNode':
        s1593(msg.nodeId);
        break;
    case 'figRemovePluginDataFromAllLocalStyles':
        j1594();
        break;
    case 'figGetAllLocalVariables':
        t1618(msg.nodeId, msg.px, msg.py);
        break;
    case 'figGetAllLocalColorStyles':
        y1595(msg.nodeId, msg.px, msg.py);
        break;
    case 'figLinkNodeToExistingColorStyle':
        f1596(msg.nodeId, msg.styleId);
        break;
    case 'figExport':
        figExport(msg.objectIds, msg.scale, msg.format, msg.suffix);
        break;
    case 'figGetObjectSize':
        h1549(msg.object);
        break;
    case 'figGetVariableUpdates':
        m1584(msg.linkedVarIds);
        break;
    case 'figUpdateShowIds':
        t2898 = msg.t2898;
        break;
    case 'figUpdateObjectCenterSize':
        objectCenterSize = msg.objectCenterSize;
        break;
    case 'figDeleteAllObjects':
        p1524();
        break;
    case 'figDeleteAllVariables':
        d1525();
        break;
    case 'figUpdateObjectsAndStyles':
        j2843 = 0;
        v2844 = 0;
        msg.objects.forEach(o => o.counted = false);
        v2831(null, msg.objects, msg.objectBatchSize, msg.k2068, msg.nodeIds, msg.i2860, msg.x2861, msg.y270);
        c1601(msg);
        break;
    case 'figDeleteObjectsAndStyles':
        c1523(msg.nodeIds);
        g1532(msg.nodeIds, msg.d1533);
        break;
    case 'figDeleteObjectsExcept':
        o1527(msg.nodeIds, msg.ignoreObjects);
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
} b1544({ cmd: 'uiEndFigMessage', msgCmd: msg.cmd }); };
function b1544(msg) { figma.ui.postMessage(JSON.stringify(msg)); }
function r2832(key) {
    return __awaiter(this, void 0, void 0, function* () { return yield figma.clientStorage.getAsync(key); });
}
function x1562(key) { figma.currentPage.loadAsync().then(() => { if (key == 'canvasEmpty') {
    b1544({ cmd: 'uiReturnFigGetLocalData', key: key, value: figma.currentPage.children.length == 0 });
}
else if (key == 'debugWarningCrash') {
    figma.clientStorage.getAsync('debugWarning').then(data => { b1544({ cmd: 'uiReturnFigGetLocalData', key: key, value: data }); });
}
else {
    figma.clientStorage.getAsync(key).then(data => { b1544({ cmd: 'uiReturnFigGetLocalData', key: key, value: data }); });
} }); }
function f1563(key, value, postToUi = true) { figma.clientStorage.setAsync(key, value); if (postToUi) {
    b1544({ cmd: 'uiReturnFigSetLocalData', key: key, value: value });
} }
function g4122() {
    return __awaiter(this, void 0, void 0, function* () { const keys = yield figma.clientStorage.keysAsync(); for (const key of keys)
        figma.clientStorage.deleteAsync(key); });
}
function b1564(key_1) {
    return __awaiter(this, arguments, void 0, function* (key, postToUi = true) { yield figma.currentPage.loadAsync(); const data = figma.currentPage.getPluginData(key); if (postToUi) {
        b1544({ cmd: 'uiReturnFigGetPageData', key: key, value: data });
    } return data; });
}
function m1565(key, value) { z1566(key); figma.currentPage.setPluginData(key, value); }
function z1566(key) { figma.currentPage.setPluginData(key, ''); }
function t1567(debugMode) { figma.currentPage.loadAsync().then(() => { const pageKeys = figma.currentPage.getPluginDataKeys().filter(k => j1048(k)); const nodeKeys = figma.currentPage.getPluginDataKeys().filter(k => n1049(k)); const connKeys = figma.currentPage.getPluginDataKeys().filter(k => y1050(k)); if (!debugMode)
    f1569(nodeKeys, connKeys); const pages = pageKeys.map(k => figma.currentPage.getPluginData(k)); const nodes = nodeKeys.map(k => figma.currentPage.getPluginData(k)); const u2139 = connKeys.map(k => figma.currentPage.getPluginData(k)); const pageOrder = figma.currentPage.getPluginData('pageOrder').split(','); const currentPageId = figma.currentPage.getPluginData('currentPageId'); const generatorVersion = parseInt(figma.currentPage.getPluginData('generatorVersion')); s1568(nodes); b1544({ cmd: 'uiReturnFigLoadNodesAndConns', pageKeys: pageKeys, pageJson: pages, pageOrder: pageOrder, currentPageId: currentPageId, nodeKeys: nodeKeys, nodeJson: nodes, connKeys: connKeys, connJson: u2139, generatorVersion: generatorVersion }); }); }
function s1568(nodes) { v2830 = []; figma.getLocalPaintStylesAsync().then(paintStyles => { for (const c3119 of nodes) {
    const node = JSON.parse(c3119);
    if (node.type == a1215) {
        const style = paintStyles.find(s => { const nodeId = s.getPluginData('nodeId'); return nodeId == node.id; });
        if (style) {
            v2830.push({ nodeId: node.id, existing: z921(node.existing), styles: [style] });
        }
    }
} }); }
function f1569(nodeKeys, connKeys) { figma.currentPage.loadAsync().then(() => { const n2833 = '"loading": "true"'; const not = '{\n'; const set = '{\n' + c867 + n2833 + ',\n'; nodeKeys.forEach(k => figma.currentPage.setPluginData(k, figma.currentPage.getPluginData(k).replace(set, not).replace(not, set))); connKeys.forEach(k => figma.currentPage.setPluginData(k, figma.currentPage.getPluginData(k).replace(set, not).replace(not, set))); }); }
function s1570(pageIds, pageJson, currentPageId) { for (let i = 0; i < pageIds.length; i++) {
    m1565(w920(pageIds[i]), pageJson[i]);
} m1565('pageOrder', pageIds.join(',')); m1565('currentPageId', currentPageId); }
function o1571(nodeIds, nodeJson) { for (let i = 0; i < nodeIds.length; i++) {
    m1565(s918(nodeIds[i]), nodeJson[i]);
} }
function g2834() {
    return __awaiter(this, void 0, void 0, function* () { let keys = yield figma.clientStorage.keysAsync(); keys = keys.filter(k => k.length >= g876.length && k.substring(0, g876.length) == g876); b1544({ cmd: 'uiReturnGetAllLocalTemplateNames', templateNames: keys }); });
}
function i1572(w4123, template) { f1563(g876 + ' ' + w4123, template); }
function q1573(nodeIds) { figma.currentPage.loadAsync().then(() => { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => y1050(k)); for (const key of connKeys) {
    const parts = a1053(key).split(' ');
    if (nodeIds.includes(parts[0]) || nodeIds.includes(parts[2]))
        z1566(key);
} }); }
function t1574(nodeIds) { figma.currentPage.loadAsync().then(() => { q1573(nodeIds); const nodeKeys = figma.currentPage.getPluginDataKeys().filter(k => n1049(k) && nodeIds.includes(z1052(k))); nodeKeys.forEach(k => z1566(k)); }); }
function j1575() { figma.currentPage.loadAsync().then(() => { const nodeKeys = figma.currentPage.getPluginDataKeys().filter(k => n1049(k)); const connKeys = figma.currentPage.getPluginDataKeys().filter(k => y1050(k)); for (const key of nodeKeys)
    z1566(key); for (const key of connKeys)
    z1566(key); }); }
function j1576(g4102) {
    return __awaiter(this, void 0, void 0, function* () { yield a1577(g4102); b1578(g4102); });
}
function a1577(g4102) {
    return __awaiter(this, void 0, void 0, function* () { yield figma.currentPage.loadAsync(); figma.currentPage.getPluginDataKeys().filter(k => n1049(k)).forEach((k) => __awaiter(this, void 0, void 0, function* () { return yield logSavedNode(k, g4102); })); });
}
function b1578(g4102) { figma.currentPage.loadAsync().then(() => { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => y1050(k)); connKeys.sort((key1, key2) => { const p1 = a1053(key1).split(' '); const p2 = a1053(key2).split(' '); if (p1[2] != p2[2])
    return p1[2] < p2[2] ? -1 : 1; if (p1[3] != p2[3])
    return parseInt(p1[3]) - parseInt(p2[3]); if (p1[2] == p2[0])
    return -1; if (p2[2] == p1[0])
    return 1; return 0; }); connKeys.forEach(k => n2122(JSON.parse(figma.currentPage.getPluginData(k)), g4102)); }); }
function s1579(g4102) { figma.currentPage.loadAsync().then(() => { const keys = figma.currentPage.getPluginDataKeys().filter(k => j1048(k)); keys.forEach(k => console.log('%c' + k, 'background: #fff; color: ' + (g4102 ? 'black' : 'white'))); const pageOrder = figma.currentPage.getPluginData('pageOrder'); console.log('%c' + pageOrder, 'background: #fff; color: ' + (g4102 ? 'black' : 'white')); }); }
function i1580(g4102) { figma.currentPage.loadAsync().then(() => { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => j1048(k)); connKeys.forEach(k => console.log('%c' + figma.currentPage.getPluginData(k), 'background: #fff; color: ' + (g4102 ? 'black' : 'white'))); const pageOrder = figma.currentPage.getPluginData('pageOrder'); console.log('%c' + pageOrder, 'background: #fff; color: ' + (g4102 ? 'black' : 'white')); }); }
function e1581(g4102) { figma.currentPage.loadAsync().then(() => { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => y1050(k)); connKeys.forEach(k => console.log('%c' + k, 'background: #dff; color: ' + (g4102 ? 'black' : 'white'))); }); }
function b1582(g4102) { figma.clientStorage.keysAsync().then(keys => keys.forEach(k => figma.clientStorage.getAsync(k).then(val => console.log(k + ': ' + val)))); }
function b1583(key, spec) {
    return __awaiter(this, void 0, void 0, function* () { let result = null; switch (key) {
        case 'getVariableData':
            result = yield p1619(spec);
            break;
        case 'getPaidStatus':
            result = figma.payments.status.type;
            break;
        case 'figSubscribe': {
            yield figma.payments.initiateCheckoutAsync({ interstitial: 'PAID_FEATURE' });
            result = figma.payments.status.type;
            break;
        }
    } b1544({ cmd: 'returnFigGetValue', value: result }); });
}
function m1584(varIds) { p1619(varIds).then(variables => { b1544({ cmd: 'uiReturnFigGetVariableUpdates', variables: variables }); }); }
function l1585(pageId) {
    return __awaiter(this, void 0, void 0, function* () { z1566(r930(pageId)); const pageOrder = (yield b1564('pageOrder')).split(','); b943(pageOrder, id => id == pageId); m1565('pageOrder', pageOrder.join(',')); });
}
function b1586() { figma.currentPage.loadAsync().then(() => { const pageKeys = figma.currentPage.getPluginDataKeys().filter(k => j1048(k)); pageKeys.forEach(k => z1566(k)); z1566('pageOrder'); }); }
function w1587(key, json) { m1565(key, json); }
function q1588(_keys, _json) { const keys = JSON.parse(_keys); const json = JSON.parse(_json); for (let i = 0; i < keys.length; i++)
    m1565(keys[i], json[i]); }
function y1589(_curKeys, _newKeys, _json) { const curKeys = JSON.parse(_curKeys); const newKeys = JSON.parse(_newKeys); const json = JSON.parse(_json); for (let i = 0; i < curKeys.length; i++) {
    z1566(curKeys[i]);
    m1565(newKeys[i], json[i]);
} }
function r1590(key) { z1566(key); }
function v1591() { figma.currentPage.loadAsync().then(() => { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => y1050(k)); connKeys.forEach(k => z1566(k)); }); }
function u1592(nodeId) { figma.currentPage.loadAsync().then(() => { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => y1050(k)); for (const key of connKeys) {
    const parts = key.split(' ');
    if (parts[4] == nodeId)
        z1566(key);
} }); }
function s1593(nodeId) { figma.currentPage.loadAsync().then(() => { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => y1050(k)); for (const key of connKeys) {
    const parts = key.split(' ');
    if (parts[1] == nodeId)
        z1566(key);
} }); }
function j1594() { figma.getLocalPaintStylesAsync().then(h1598 => { for (const style of h1598) {
    style.setPluginData('type', '');
    style.setPluginData('nodeId', '');
    style.setPluginData('existing', '');
} }); }
function figSaveSnapshot(index, objectIds) {
    return __awaiter(this, void 0, void 0, function* () { const objects = yield figGetObjectsFromIds(objectIds); const group = figma.group(objects, figma.currentPage); const settings = { format: 'PNG' }; const icon = yield group.exportAsync(settings); figma.ungroup(group); b1544({ cmd: 'uiReturnFigSaveSnapshot', index: index, iconWidth: group.width, iconHeight: group.height, icon: icon }); });
}
var x2835 = null;
var w4124 = () => x2835 = null;
var d2836 = 'normal';
function m1610(clientPosition) { b1544({ cmd: 'uiReturnFigGetMousePosition', position: { x: 0, y: 0 }, clientPosition: clientPosition, viewportZoom: figma.viewport.zoom, viewportRect: figma.viewport.bounds }); }
function g1611(x, y, width, height) { return; }
function x1612(dock, rect, bounds) { switch (dock) {
    case 'normal': break;
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
} }
function o1613(width, height) { (function () {
    return __awaiter(this, void 0, void 0, function* () { width = Math.floor(Math.max(0, width)); height = Math.floor(Math.max(0, height)); figma.ui.resize(width, height); yield figma.currentPage.loadAsync(); figma.currentPage.setPluginData(figma.currentUser.id + ',windowWidth', width.toString()); figma.currentPage.setPluginData(figma.currentUser.id + ',windowHeight', height.toString()); b1544({ cmd: 'uiReturnFigResizeWindow', width: width, height: height }); });
})(); }
function v2837(dock) {
    return __awaiter(this, void 0, void 0, function* () { if (dock != 'normal' && d2836 == 'normal') {
        figma.clientStorage.setAsync('normalWindowX', yield figma.clientStorage.getAsync('normalWindowX'));
        figma.clientStorage.setAsync('normalWindowY', yield figma.clientStorage.getAsync('normalWindowY'));
        figma.clientStorage.setAsync('normalWindowWidth', yield figma.clientStorage.getAsync('normalWindowWidth'));
        figma.clientStorage.setAsync('normalWindowHeight', yield figma.clientStorage.getAsync('normalWindowHeight'));
    } d2836 = dock; figma.clientStorage.setAsync('windowDock', dock); o1613(yield figma.clientStorage.getAsync('windowWidth'), yield figma.clientStorage.getAsync('windowHeight')); });
}
function b1614(msg) { m1615(msg.text, msg.prefix, msg.delay, msg.error, msg.c1616, msg.w1617); }
function m1615(text, prefix = '', delay = 4000, error = false, c1616 = '', w1617 = NULL) { const options = { timeout: delay, error: error, onDequeue: w4124 }; if (c1616 != '') {
    options['button'] = { text: c1616 };
    if (w1617.substring(0, 'removeConnection'.length) == 'removeConnection') {
        options['button']['action'] = () => r1590(w1617.split(',')[1]);
    }
    else {
        switch (w1617) {
            case 'hideClearUndoWarning':
                options['button']['action'] = () => b1544({ cmd: 'uiHideClearUndoWarning' });
                break;
        }
    }
} if (x2835)
    x2835.cancel(); x2835 = figma.notify(prefix + text, options); }
function n2838(key_1) {
    return __awaiter(this, arguments, void 0, function* (key, params = null) { return yield l2839(key, params); });
}
function l2839(key_1) {
    return __awaiter(this, arguments, void 0, function* (key, params = null) { return new Promise((resolve, reject) => { const timeout = 60000; b1544(Object.assign({ cmd: 'uiGetValueForFigma', key: key }, (params || {}))); const z2840 = setTimeout(() => reject(new Error('Timeout: Result not received by Figma within the specified time')), timeout); function s4125(msg) { msg = JSON.parse(msg); if (msg.cmd === 'returnUiGetValueForFigma') {
        clearTimeout(z2840);
        resolve({ key: msg.key, value: msg.value });
        figma.ui.off('message', s4125);
    } } figma.ui.on('message', s4125); }); });
}
var r2841 = [];
var c2842 = [];
var j2843 = 0;
var v2844 = 0;
function v2831(b2857_1, k2858_1, m2859_1) {
    return __awaiter(this, arguments, void 0, function* (b2857, k2858, m2859, k2068 = -1, nodeIds = [], i2860 = false, x2861 = false, y270 = false, addProps = true, transform = true) { let abort = false; const m3738 = []; let g2845 = 0; r2841.push(...nodeIds); if (k2068 > -1)
        j2843 = k2068; for (const b1530 of k2858) {
        if (b1530[u1394] == o1059)
            yield figUpdateVariableObjectAsync(b1530);
        else
            yield figUpdateGeometricObjectAsync(b1530, m3738, g2845, m2859, abort, b2857, addProps, transform);
        g2845++;
        if (g2845 >= m2859) {
            const result = yield n2838('returnObjectUpdate', { j2843: j2843, v2844: v2844 });
            abort = result.value;
            g2845 = 0;
            if (abort)
                break;
        }
    } if (b2857 != undefined && b2857 != null && !b2857.removed) {
        for (const b1531 of b2857.children) {
            if (b1531 != undefined && b1531 != null && b1531.removed || !k2858.find(o => o[p1396] == b1531.getPluginData('objectId') && b1531.getPluginData('userId') == figma.currentUser.id))
                b1531.remove();
        }
    } for (const point of q2864) {
        if (point.parent == figma.currentPage)
            yield figma.currentPage.loadAsync();
        if (point != undefined && point != null && !point.removed && !point.parent.removed)
            point.parent.appendChild(point);
    } if (x2861 && !abort) {
        o1527(r2841, c2842);
        r2841 = [];
        c2842 = [];
        if (y270 && m3738.length > 0) {
            figma.viewport.scrollAndZoomIntoView(m3738);
            const bounds = p1551(m3738);
            figma.viewport.zoom = Math.min(figma.viewport.bounds.width * figma.viewport.zoom / bounds.width - 0.05, figma.viewport.bounds.height * figma.viewport.zoom / bounds.height - 0.05);
        }
    } yield n2838('returnObjectUpdate', { j2843: j2843, v2844: v2844 }); });
}
function figUpdateVariableObjectAsync(genVar) {
    return __awaiter(this, void 0, void 0, function* () { const nodeId = genVar[c1395]; const varId = genVar[p1396]; const varName = genVar[n1398]; const varValueCount = genVar[FO_VARIABLE_COUNT]; const varIsAlias = genVar[FO_VARIABLE_IS_ALIAS]; const varValues = []; for (let i = 0; i < varValueCount; i++)
        varValues.push(genVar[FO_VARIABLE_IS_ALIAS + 1 + i]); const m2391 = varName.split('/'); console.assert(m2391.length > 1, 'nameParts must be > 1'); let figVar; let collection; if (varId == NULL) {
        collection = yield figGetVariableCollectionByNameAsync(m2391[0]);
        if (!collection)
            collection = yield figCreateVariableCollectionAsync(m2391[0]);
    }
    else {
        [figVar,] = yield l1620(nodeId, varId);
        collection = yield figma.variables.getVariableCollectionByIdAsync(figVar.variableCollectionId);
    } if (figVar) {
        yield figUpdateVariableAsync(figVar.id, varName, varValues, varIsAlias);
    } });
}
function figUpdateGeometricObjectAsync(b1530, m3738, g2845, m2859, abort, b2857, addProps, transform) {
    return __awaiter(this, void 0, void 0, function* () { c2842.push(b1530); let n2863 = null; let y2862 = NULL; if (b1530[c1395] != y2862) {
        y2862 = b1530[c1395];
        n2863 = v2828.find(a => a.nodeId == b1530[c1395]);
        if (!n2863) {
            v2828.push(n2863 = { nodeId: b1530[c1395], objects: [] });
        }
    } const addObject = b1531 => { if (b2857 != undefined && b2857 != null && !b2857.removed)
        b2857.appendChild(b1531);
    else
        n2863.objects.push(b1531); }; let objects = b2857 != undefined && b2857 != null && !b2857.removed ? b2857.children : n2863.objects; let b1531 = objects.find(o => o.removed || o.getPluginData('userId') == figma.currentUser.id && o.getPluginData('objectId') == b1530[p1396]); if (b1531 != undefined && b1531 != null && b1531.removed) {
        r936(objects, b1531);
        if (q2864.includes(b1531))
            u941(q2864, b1531);
        if (h2880.includes(b1531))
            u941(h2880, b1531);
    } if (b1531 == undefined || b1531 == null || b1531.removed) {
        const newObj = yield v1546(b1530, addObject, addProps, transform);
        m3738.push(newObj);
    }
    else if (b1531 != undefined && b1531 != null && !b1531.removed && b1531.getPluginData('type') == b1530[u1394].toString()) {
        yield u1547(b1531, b1530, addProps, transform);
        if (b1531 != undefined && b1531 != null && !b1531.removed)
            m3738.push(b1531);
    }
    else {
        b1531.remove();
        if (q2864.includes(b1531))
            u941(q2864, b1531);
        if (h2880.includes(b1531))
            u941(h2880, b1531);
        yield v1546(b1530, addObject, addProps, transform);
    } });
}
function w1545(b111) { return (b111[FO_PERSIST] === 2 ? '' : q872) + (t2898 ? b111[p1396] : b111[n1398]); }
function v1546(b1530_1) {
    return __awaiter(this, arguments, void 0, function* (b1530, addObject = null, addProps = true, transform = true) { if (!n1548(b1530))
        return null; let b1531; switch (b1530[u1394]) {
        case f1218:
            b1531 = q2812(b1530, addProps, transform);
            break;
        case y1221:
            b1531 = c2891(b1530, addProps, transform);
            break;
        case w1224:
            b1531 = f2887(b1530, addProps, transform);
            break;
        case w1236:
            b1531 = s2808(b1530, addProps, transform);
            break;
        case t1239:
            b1531 = m2815(b1530, addProps, transform);
            break;
        case p1242:
            b1531 = r2818(b1530, addProps, transform);
            break;
        case d1245:
            b1531 = w2794(b1530);
            break;
        case p1249:
            b1531 = w2846(b1530, addProps, transform);
            break;
        case k1261:
            b1531 = c2847(b1530, addProps, transform);
            break;
        case p1285:
            b1531 = yield v2848(b1530, addProps, transform);
            break;
        case v1264:
            b1531 = yield k2849(b1530);
            break;
        case q1267:
            b1531 = yield c2850(b1530, addProps, transform);
            break;
        case o1059:
            b1531 = yield figCreateVariableAsync(b1530);
            break;
    } if (addObject && b1531 != undefined && b1531 != null && !b1531.removed) {
        b1531.name = w1545(b1530);
        c950(b1530[u1394] == v1264 || !!b1531, 'no Figma object created');
        if (b1531 != undefined && b1531 != null) {
            b1531.setPluginData('retain', b1530[FO_PERSIST].toString());
            if (b1530[FO_PERSIST] < 2) {
                b1531.setPluginData('userId', figma.currentUser.id);
                b1531.setPluginData('sessionId', figma.currentUser.sessionId.toString());
                b1531.setPluginData('type', b1530[u1394]);
                b1531.setPluginData('nodeId', b1530[c1395]);
                b1531.setPluginData('objectId', b1530[p1396]);
                b1531.setPluginData('isCenter', h935(b1530[r1417]));
                if (b1530[u1394] == d1245)
                    q2864.push(b1531);
                if (b1530[d1416])
                    d1561(b1531);
            }
            addObject(b1531);
        }
    } if (!b1530.counted) {
        v2844++;
        b1530.counted = true;
    } return b1531; });
}
function u1547(b1531, b1530, addProps, transform) {
    return __awaiter(this, void 0, void 0, function* () { if (!n1548(b1530) || b1531 == undefined || b1531 == null || b1531.removed)
        return; b1531.name = w1545(b1530); b1531.setPluginData('retain', b1530[FO_PERSIST].toString()); switch (b1530[u1394]) {
        case f1218:
            t2813(b1531, b1530, addProps, transform);
            break;
        case y1221:
            l2892(b1531, b1530, addProps, transform);
            break;
        case w1224:
            l2888(b1531, b1530, addProps, transform);
            break;
        case w1236:
            l2809(b1531, b1530, addProps, transform);
            break;
        case t1239:
            o2816(b1531, b1530, addProps, transform);
            break;
        case p1242:
            e2819(b1531, b1530, addProps, transform);
            break;
        case d1245:
            p2851(b1531, b1530);
            break;
        case p1249:
            q2852(b1531, b1530, addProps, transform);
            break;
        case k1261:
            m2853(b1531, b1530, addProps, transform);
            break;
        case p1285:
            c2854(b1531, b1530, addProps, transform);
            break;
        case v1264:
            s2855(b1531, b1530);
            break;
        case q1267:
            d2856(b1531, b1530, addProps, transform);
            break;
        case o1059:
            yield figUpdateVariableObjectAsync(b1530);
            break;
    } if (b1531 != undefined && b1531 != null && !b1531.removed) {
        if (b1531.parent == figma.currentPage)
            yield figma.currentPage.loadAsync();
        b1531.parent.appendChild(b1531);
        if (b1530[d1416])
            d1561(b1531);
    } if (!b1530.counted) {
        v2844++;
        b1530.counted = true;
    } });
}
function n1548(b1530) { switch (b1530[u1394]) {
    case f1218: return a2811(b1530);
    case y1221: return g2873(b1530);
    case w1224: return e2874(b1530);
    case w1236: return u4121(b1530);
    case t1239: return z2814(b1530);
    case p1242: return i2817(b1530);
    case d1245: return k4120(b1530);
    case p1249: return d2875(b1530);
    case k1261: return y2876(b1530);
    case p1285: return y2877(b1530);
    case v1264: return y2878(b1530);
    case q1267: return n2879(b1530);
} }
function h1549(b1530) {
    return __awaiter(this, void 0, void 0, function* () { (() => __awaiter(this, void 0, void 0, function* () { const b1531 = yield v1546(b1530); const width = b1531.width; const height = b1531.height; b1531.remove(); b1544({ cmd: 'uiForwardToGenerator', msg: { cmd: 'returnFigGetObjectSize', objectId: b1530[p1396], width: width, height: height } }); }))(); });
}
function k1550(b1531) { b1531.setPluginData('type', ''); b1531.setPluginData('nodeId', ''); b1531.setPluginData('userId', ''); b1531.setPluginData('sessionId', ''); b1531.setPluginData('objectId', ''); b1531.setPluginData('isCenter', ''); b1531.setPluginData('retain', ''); }
function p1551(objects) { const bounds = { left: 0, top: 0, right: 0, bottom: 0 }; for (const b111 of objects) {
    if (b111.x < bounds.left || bounds.left == bounds.right)
        bounds.left = b111.x;
    if (b111.y < bounds.top || bounds.top == bounds.bottom)
        bounds.top = b111.y;
    if (b111.x + b111.width > bounds.right || bounds.left == bounds.right)
        bounds.right = b111.x + b111.width;
    if (b111.y + b111.height > bounds.bottom || bounds.top == bounds.bottom)
        bounds.bottom = b111.y + b111.height;
} return { x: bounds.left, y: bounds.top, width: bounds.right - bounds.left, height: bounds.bottom - bounds.top }; }
function figExport(objectIds, scale, format, suffix) {
    return __awaiter(this, void 0, void 0, function* () { yield figma.currentPage.loadAsync(); for (const objId of objectIds) {
        let b1531 = figma.currentPage.children.find(o => !o.removed && o.getPluginData('userId') == figma.currentUser.id && o.getPluginData('objectId') == objId);
        if (!b1531)
            continue;
        const settings = { constraint: { type: 'SCALE', value: scale }, format: format == 0 ? 'PNG' : 'JPG', suffix: suffix };
        yield b1531.exportAsync(settings);
    } });
}
const h2880 = [];
const s2881 = [];
function a1552(j1553, m1554) { const effects = []; for (const effect of j1553) {
    const type = effect[0];
    switch (type) {
        case 'DROP_SHADOW': {
            const color = { r: Math.min(Math.max(0, effect[1]), 1), g: Math.min(Math.max(0, effect[2]), 1), b: Math.min(Math.max(0, effect[3]), 1), a: Math.min(Math.max(0, effect[4]), 1) };
            const offset = { x: effect[5], y: effect[6] };
            const radius = effect[7];
            const spread = effect[8];
            const blend = effect[9];
            const behind = effect[10];
            const visible = effect[11];
            if (!isNaN(color.r) && !isNaN(color.g) && !isNaN(color.b) && !isNaN(color.a) && !isNaN(offset.x) && !isNaN(offset.y) && !isNaN(radius)) {
                effects.push({ type: type, color: color, offset: offset, radius: radius, visible: visible, blendMode: blend, showShadowBehindNode: behind, boundVariables: {} });
                if (m1554 && !isNaN(spread))
                    effects[effects.length - 1]['spread'] = spread;
            }
            break;
        }
        case 'INNER_SHADOW': {
            const color = { r: Math.min(Math.max(0, effect[1]), 1), g: Math.min(Math.max(0, effect[2]), 1), b: Math.min(Math.max(0, effect[3]), 1), a: Math.min(Math.max(0, effect[4]), 1) };
            const offset = { x: effect[5], y: effect[6] };
            const radius = effect[7];
            const spread = effect[8];
            const blend = effect[9];
            const visible = effect[10];
            if (!isNaN(color.r) && !isNaN(color.g) && !isNaN(color.b) && !isNaN(color.a) && !isNaN(offset.x) && !isNaN(offset.y) && !isNaN(radius) && !isNaN(spread)) {
                effects.push({ type: type, color: color, offset: offset, radius: radius, spread: spread, visible: visible, blendMode: blend, boundVariables: {} });
            }
            break;
        }
        case 'LAYER_BLUR': {
            const radius = effect[1];
            const visible = effect[2];
            if (!isNaN(radius)) {
                effects.push({ type: type, visible: visible, radius: Math.max(0, radius), boundVariables: {} });
            }
            break;
        }
        case 'BACKGROUND_BLUR': {
            const radius = effect[1];
            const visible = effect[2];
            if (!isNaN(radius)) {
                effects.push({ type: type, visible: visible, radius: Math.max(0, radius), boundVariables: {} });
            }
            break;
        }
    }
} return effects; }
function l2801(b1531, b1530, phantom = true) { y1557(b1531, b1530); v2802(b1531, b1530, phantom); e2803(b1531, b1530); b1531.opacity = b1530[e1418]; b1531.blendMode = b1530[m1419]; const maskType = b1530[a1420]; b1531.isMask = maskType > 0; if (b1531.isMask) {
    switch (maskType) {
        case 1:
            b1531.maskType = 'ALPHA';
            break;
        case 2:
            b1531.maskType = 'VECTOR';
            break;
        case 3:
            b1531.maskType = 'LUMINANCE';
            break;
    }
} if (b1531.isMask && b1531.fills.length == 0 && b1531.strokes.length == 0)
    b1531.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 }, opacity: 1, blendMode: 'NORMAL' }]; }
function e2803(b1531, b1530) { if (!!b1530[w1407] && !isEmpty(b1530[w1407])) {
    b1531.fills = y954(b1530[w1407]);
    if (h2880.includes(b1531))
        u941(h2880, b1531);
}
else
    b1531.fills = []; }
function v2802(b1531, b1530, phantom = true) { if (b1530[d1408] != null && !isEmpty(b1530[d1408])) {
    h1556(b1531, y954(b1530[d1408]), b1530[j1409], b1530[o1410], b1530[r1411], b1530[i1412], b1530[s1413], q2804(b1530[l1414]));
    if (b1530[d1416])
        b1531.setPluginData('dashes', b1530[l1414]);
    if (h2880.includes(b1531))
        u941(h2880, b1531);
    if (b1530[d1416])
        j947(s2881, b1531);
}
else if (isEmpty(b1530[w1407]) && isEmpty(b1530[d1408]) && !b1530[a1420] && phantom) {
    j1559(b1531);
    j947(h2880, b1531);
}
else
    b1531.strokes = []; }
function q2804(w1555) { w1555 = w1555; w1555 = n952(w1555, ','); w1555 = w953(w1555, ','); w1555 = w1555.trim(); return w1555 == '' ? [] : w1555.split(',').map(s => Math.max(0, parseFloat(s))); }
function d2805(w1555) { w1555 = w1555; w1555 = n952(w1555, ','); w1555 = w953(w1555, ','); w1555 = w1555.trim(); return w1555 == '' ? [] : w1555.split(',').map(s => Math.max(0, parseFloat(s) / t2807)); }
function h1556(b1531, fills, weight, align, join, miterLimit, cap, dashes = []) { b1531.strokes = fills; b1531.strokeWeight = Math.max(0, weight); b1531.strokeAlign = align; b1531.strokeJoin = join; const miterAngle = miterLimit / 360 * Tau; const g2882 = 1 / Math.sin(miterAngle / 2); b1531.strokeMiterLimit = Math.min(Math.max(0, g2882), 16); b1531.strokeCap = cap; b1531.dashPattern = dashes; }
function y1557(b1531, b1530) { if (!!b1530[l1415] && !isEmpty(b1530[l1415])) {
    const m1554 = b1530[u1394] == f1218 || b1530[u1394] == w1224 || b1530[u1394] == q1267;
    b1531.effects = a1552(b1530[l1415], m1554);
}
else
    b1531.effects = []; }
function g1558() { for (const b111 of h2880) {
    if (b111.removed)
        u941(h2880, b111);
    else
        j1559(b111);
} }
function j1559(b111) { figma.currentPage.loadAsync().then(() => { const back = figma.currentPage.backgrounds.find(b => b.type == 'SOLID'); let phantomColor; if (back) {
    const l = back.color.r * 0.2126 + back.color.g * 0.7152 + back.color.b * 0.0722;
    phantomColor = l > 0.5 ? { r: 0, g: 0, b: 0 } : { r: 1, g: 1, b: 1 };
}
else
    phantomColor = { r: 1, g: 0, b: 1 }; h1556(b111, [{ type: 'SOLID', color: phantomColor, opacity: 0.5 }], 1 / t2807, 'CENTER', 'MITER', 1, 'NONE', [1 / t2807, 2 / t2807]); }); }
function r1560() { for (const b1531 of s2881) {
    if (b1531.removed)
        u941(s2881, b1531);
    else
        d1561(b1531);
} }
function d1561(b1531) { b1531.strokeWeight = Math.max(0, 1.5 / t2807); if (z921(b1531.getPluginData('isCenter'))) {
    const path = b1531.vectorPaths[0];
    const parts = path.data.split(' ');
    let t = { x: parseFloat(parts[1]), y: parseFloat(parts[2]) };
    let c = { x: parseFloat(parts[4]), y: parseFloat(parts[5]) };
    let r = { x: parseFloat(parts[7]), y: parseFloat(parts[8]) };
    const a = 2;
    const b = 0.05;
    const f = 1 - Math.pow(1 - Math.min(t2807, 1), a) / Math.pow(a, b);
    t = y893(c, a895(z884(v898(t, c)), objectCenterSize / f));
    r = y893(c, a895(z884(v898(r, c)), objectCenterSize / f));
    parts[1] = t.x;
    parts[2] = t.y;
    parts[4] = c.x;
    parts[5] = c.y;
    parts[7] = r.x;
    parts[8] = r.y;
    const k2883 = { windingRule: path.windingRule, data: parts.join(' ') };
    b1531.vectorPaths = [k2883];
} const dashes = b1531.getPluginData('dashes'); if (dashes != '')
    b1531.dashPattern = d2805(dashes); }
function y1595(nodeId, px, py) { figma.getLocalPaintStylesAsync().then(_styles => { const styles = new Array(); for (const m168 of _styles) {
    const _nodeId = m168.getPluginData('nodeId');
    const _existing = m168.getPluginData('existing');
    const existing = !!_existing;
    const style = { id: m168.id, nodeId: _nodeId, name: m168.name, existing: existing, paints: new Array() };
    let onlyPaint = true;
    for (const g2885 of m168.paints) {
        if (g2885.type == 'SOLID') {
            style.paints.push([g2885.color.r, g2885.color.g, g2885.color.b, g2885.opacity]);
        }
        else {
            onlyPaint = false;
            break;
        }
    }
    if (onlyPaint)
        styles.push(style);
} b1544({ cmd: 'uiReturnFigGetAllLocalColorStyles', nodeId: nodeId, px: px, py: py, styles: JSON.stringify(styles) }); }); }
function f1596(nodeId, styleId) { figma.getLocalPaintStylesAsync().then(h1598 => { if (styleId != NULL)
    u1597(h1598, nodeId, styleId);
else
    o1599(h1598, nodeId); }); }
function u1597(h1598, nodeId, styleId, clearExisting = true) { const d2884 = v2830.find(a => a.nodeId == nodeId); if (d2884 && clearExisting)
    o1599(h1598, nodeId); const h1603 = h1598.find(s => s.id == styleId); c950(!!h1603, 'figStyle should be found here'); h1603.setPluginData('type', a1215); h1603.setPluginData('nodeId', nodeId); h1603.setPluginData('existing', h935(true)); v2830.push({ nodeId: nodeId, existing: true, styles: [h1603] }); return h1603; }
function o1599(h1598, nodeId) { const h1603 = h1598.find(s => s.getPluginData('nodeId') == nodeId); c950(!!h1603, 'figStyle should be found here'); if (h1603) {
    h1603.setPluginData('type', NULL);
    h1603.setPluginData('nodeId', NULL);
    h1603.setPluginData('existing', NULL);
    b943(v2830, a => a.nodeId == nodeId);
} return h1603; }
function w1600(styles, o1604) { const h1603 = figma.createPaintStyle(); h1603.setPluginData('type', o1604[u1394]); h1603.setPluginData('nodeId', o1604[c1395]); h1603.name = o1604[d1399]; setStylePaints(h1603, o1604); styles.push(h1603); b1544({ cmd: 'uiSetStyleId', nodeId: o1604[c1395], styleId: h1603.id }); return h1603; }
function c1601(msg) { let y2862 = NULL; let d2884; for (const o1604 of msg.styles) {
    if (o1604[c1395] != y2862) {
        y2862 = o1604[c1395];
        d2884 = v2830.find(a => a.nodeId == o1604[c1395]);
        if (!d2884) {
            d2884 = { nodeId: o1604[c1395], styles: [] };
            v2830.push(d2884);
        }
    }
    else
        d2884 = null;
    const h1603 = d2884.styles[0];
    figma.getLocalPaintStylesAsync().then(h1598 => { const localStyle = h1598.find(s => s.getPluginData('nodeId') == o1604[c1395]); if (isValid(h1603) && !isValid(localStyle)) {
        r936(d2884.styles, h1603);
    } const existing = isValid(h1603) && isValid(localStyle) && h1603.getPluginData('existing'); if (!isValid(h1603) || !isValid(localStyle)) {
        if (!existing) {
            u1534 = true;
            f1596(o1604[c1395], o1604[n1397]);
        }
    }
    else if (isValid(h1603) && h1603.getPluginData('type') == o1604[u1394]) {
        u1534 = true;
        c1602(localStyle, o1604);
    } });
} }
function c1602(h1603, o1604) { setStylePaints(h1603, o1604); h1603.name = o1604[d1399]; }
function getStylePaints(stylePaints) { const paints = new Array(); for (const g2885 of stylePaints) {
    const fill = g2885[1].split(' ');
    switch (g2885[0]) {
        case 'SOLID':
            paints.push({ type: 'SOLID', color: { r: Math.min(Math.max(0, parseFloat(fill[0]) / 0xff), 1), g: Math.min(Math.max(0, parseFloat(fill[1]) / 0xff), 1), b: Math.min(Math.max(0, parseFloat(fill[2]) / 0xff), 1) }, opacity: Math.min(Math.max(0, parseFloat(fill[3]) / 100), 1) });
            break;
    }
} return paints; }
function setStylePaints(h1603, o1604) { if (!isEmpty(o1604[z1401]))
    h1603.paints = getStylePaints(o1604[z1401]);
else
    h1603.paints = []; }
function genVariableIsValid(genVariable) { return genVariable[FO_VARIABLE_TYPE] != null && genVariable[FO_VARIABLE_COUNT] != null; }
function figCreateVariableAsync(genVariable) {
    return __awaiter(this, void 0, void 0, function* () { });
}
function figCreateVariableCollectionAsync(name) {
    return __awaiter(this, void 0, void 0, function* () { const collection = yield figma.variables.createVariableCollection(name); collection.setPluginData('userId', figma.currentUser.id); collection.setPluginData('sessionId', figma.currentUser.sessionId.toString()); return collection; });
}
function figGetVariableFromData(nodeId, varName) {
    return __awaiter(this, void 0, void 0, function* () { const collections = yield figma.variables.getLocalVariableCollectionsAsync(); for (const collection of collections) {
        for (const varId of collection.variableIds) {
            const variable = yield figma.variables.getVariableByIdAsync(varId);
            if (variable.getPluginData('nodeId') == nodeId && variable.name == varName)
                return variable;
        }
    } return null; });
}
function t1618(nodeId, px, py) { figma.variables.getLocalVariablesAsync().then((e2886) => __awaiter(this, void 0, void 0, function* () { const variables = new Array(); for (const _var of e2886) {
    try {
        const collection = yield figma.variables.getVariableCollectionByIdAsync(_var.variableCollectionId);
        const [, resolvedValues] = yield figGetResolvedVariableValuesAsync(_var);
        const [aliasIds, aliasNames] = yield figGetVariableAliasIdsAsync(_var);
        const variable = { id: _var.id, resolvedType: _var.resolvedType, name: collection.name + '/' + _var.name, resolvedValues: resolvedValues, aliasIds: aliasIds, aliasNames: aliasNames };
        variables.push(variable);
    }
    catch (ex) { }
} figma.variables.getLocalVariableCollectionsAsync().then((collections) => __awaiter(this, void 0, void 0, function* () { b1544({ cmd: 'uiReturnFigGetAllLocalVariables', nodeId: nodeId, px: px, py: py, variables: JSON.stringify(variables), nCollections: collections.length }); })); })); }
function p1619(varIds) {
    return __awaiter(this, void 0, void 0, function* () { const e2886 = yield figma.variables.getLocalVariablesAsync(); const varsFromIds = varIds.map(id => e2886.find(v => v.id == id)); let variables = []; for (let i = 0; i < varIds.length; i++) {
        const variable = varsFromIds[i];
        const collection = variable != undefined ? (yield figma.variables.getVariableCollectionByIdAsync(variable.variableCollectionId)) : null;
        if (collection) {
            const varValues = [];
            const resolvedValues = [];
            const resolvedAliasNames = [];
            const modes = [];
            for (const mode of collection.modes) {
                let _var = variable;
                let value = _var.valuesByMode[mode.modeId];
                let resolvedName = '';
                varValues.push(value);
                while (value && value['type'] === 'VARIABLE_ALIAS') {
                    _var = yield figma.variables.getVariableByIdAsync(value.id);
                    value = _var.valuesByMode[mode.modeId];
                    resolvedName = _var.name;
                }
                resolvedValues.push(value);
                resolvedAliasNames.push(resolvedName);
                modes.push(mode.name);
            }
            variables.push({ id: varIds[i], name: collection.name + '/' + variable.name, resolvedType: variable.resolvedType, values: varValues, resolvedValues: resolvedValues, resolvedModes: modes, resolvedAliasNames: resolvedAliasNames });
        }
        else {
            variables.push({ id: varIds[i], name: '', resolvedType: NULL, values: [], resolvedValues: [], resolvedModes: [], resolvedAliasNames: [] });
        }
    } return variables; });
}
function figUpdateVariableAsync(varId, p3356, newValues, isAlias) {
    return __awaiter(this, void 0, void 0, function* () { let variable = yield figma.variables.getVariableByIdAsync(varId); if (!variable)
        return; const collection = yield figma.variables.getVariableCollectionByIdAsync(variable.variableCollectionId); const newCollectionName = p3356.split('/')[0]; if (collection.name != newCollectionName) {
        let newCollection = yield figGetVariableCollectionByNameAsync(newCollectionName);
        if (!newCollection)
            newCollection = yield figCreateVariableCollectionAsync(newCollectionName);
        variable = yield figMoveVariableToCollectionAsync(variable, newCollection);
    } const newVarName = p3356.split('/').slice(1).join('/'); if (variable.name != newVarName)
        variable.name = newVarName; for (let i = 0; i < newValues.length; i++) {
        let b3687 = newValues[i];
        if (b3687 !== null && isAlias[i] === false) {
            try {
                if (variable.resolvedType == 'BOOLEAN')
                    b3687 = b3687 > 0;
                variable.setValueForMode(collection.modes[i].modeId, b3687);
            }
            catch (ex) { }
        }
    } });
}
function figGetVariableByNameAsync(name_1) {
    return __awaiter(this, arguments, void 0, function* (name, collectionId = '') { const e2886 = yield figma.variables.getLocalVariablesAsync(); return collectionId != '' ? e2886.find(v => v.name == name && v.variableCollectionId == collectionId) : e2886.find(v => v.name == name); });
}
function figGetVariableCollectionByIdAsync(id) {
    return __awaiter(this, void 0, void 0, function* () { const collections = yield figma.variables.getLocalVariableCollectionsAsync(); return collections.find(c => c.id === id); });
}
function figGetVariableCollectionByNameAsync(name) {
    return __awaiter(this, void 0, void 0, function* () { const collections = yield figma.variables.getLocalVariableCollectionsAsync(); return collections.find(c => c.name === name); });
}
function figMoveVariableToCollectionAsync(oldVariable, newCollection) {
    return __awaiter(this, void 0, void 0, function* () { if (!oldVariable || !newCollection)
        throw new Error('both variable and collection must be provided'); const existingVar = yield figGetVariableByNameAsync(oldVariable.name, newCollection.id); if (existingVar) {
        m1615('Variable names must be unique within a collection', '');
        return oldVariable;
    } const oldCollection = yield figGetVariableCollectionByIdAsync(oldVariable.variableCollectionId); for (const oldMode of oldCollection.modes) {
        let newMode = newCollection.modes.find(m => m.name == oldMode.name);
        if (!newMode)
            newCollection.addMode(oldMode.name);
    } const newVariable = figma.variables.createVariable(oldVariable.name, newCollection, oldVariable.resolvedType); for (const newMode of newCollection.modes) {
        const oldMode = oldCollection.modes.find(m => m.name == newMode.name);
        const value = oldVariable.valuesByMode[oldMode.modeId];
        newVariable.setValueForMode(newMode.modeId, value);
    } figRelinkObjectVariables(oldVariable, newVariable); b1544({ cmd: 'uiReturnFigRelinkVariable', oldVariableId: oldVariable.id, newVariableId: newVariable.id }); oldVariable.remove(); return newVariable; });
}
function figRelinkObjectVariables(oldVariable, newVariable) { figTraverseNode(figma.root, oldVariable, newVariable); }
function figTraverseNode(node, oldVariable, newVariable) { if (node.boundVariables) {
    for (const property in node.boundVariables) {
        const binding = node.boundVariables[property];
        if (binding && binding.id == oldVariable.id)
            node.setBoundVariable(property, newVariable);
    }
} if (node.type == 'TEXT') {
    for (let i = 0; i < node.characters.length; i++) {
        const boundVariable = node.getVariableForCharacterRange(i, i + 1);
        if (boundVariable && boundVariable.id == oldVariable.id)
            node.setRangeVariableId(i, i + 1, newVariable.id);
    }
} if ('children' in node) {
    for (const child of node.children)
        figTraverseNode(child, oldVariable, newVariable);
} }
function figMakeValue(value, resolvedType) { switch (resolvedType) {
    case 'FLOAT': return Number(value);
    case 'BOOLEAN': return Boolean(value);
    case 'STRING': return String(value);
    case 'COLOR': return { r: value.r, g: value.g, b: value.b, a: value.a };
    default:
        console.error(`Unsupported resolved type: ${resolvedType}`);
        return value;
} }
function l1620(nodeId, varId) {
    return __awaiter(this, void 0, void 0, function* () { const variable = yield figma.variables.getVariableByIdAsync(varId); console.assert(variable != null, 'variable must exist'); variable.setPluginData('userId', figma.currentUser.id); variable.setPluginData('sessionId', figma.currentUser.sessionId.toString()); variable.setPluginData('nodeId', nodeId); const [resolvedVar, values] = yield figGetResolvedVariableValuesAsync(variable); return [variable, resolvedVar]; });
}
function figGetResolvedVariableValuesAsync(variable) {
    return __awaiter(this, void 0, void 0, function* () { if (!variable)
        return [null, []]; const values = []; const collection = yield figma.variables.getVariableCollectionByIdAsync(variable.variableCollectionId); let _var = variable; for (const mode of collection.modes) {
        let value = _var.valuesByMode[mode.modeId];
        while (value && value['type'] === 'VARIABLE_ALIAS') {
            _var = yield figma.variables.getVariableByIdAsync(value.id);
            value = _var.valuesByMode[mode.modeId];
        }
        values.push(value);
    } return [_var, values]; });
}
function figGetVariableAliasIdsAsync(variable) {
    return __awaiter(this, void 0, void 0, function* () { if (!variable)
        return []; const aliasIds = []; const aliasNames = []; const collection = yield figma.variables.getVariableCollectionByIdAsync(variable.variableCollectionId); for (const mode of collection.modes) {
        const value = variable.valuesByMode[mode.modeId];
        if (value && value['type'] === 'VARIABLE_ALIAS') {
            aliasIds.push(value['id']);
            aliasNames.push((yield figma.variables.getVariableByIdAsync(value['id'])).name);
        }
        else {
            aliasIds.push('');
            aliasNames.push('');
        }
    } return [aliasIds, aliasNames]; });
}
function d1525(z1526 = false) { if (tempVariableCollection)
    tempVariableCollection.remove(); }
function v1605(tl, tr, bl) { let vr = point(tr.x - tl.x, tr.y - tl.y); let vb = point(bl.x - tl.x, bl.y - tl.y); let sx = vr.x; let sy = vb.y; let kx = -vr.y; let ky = -vb.x; let dx = -tl.x; let dy = -tl.y; const _sx = kx / nozero(sx); const _sy = ky / nozero(sy); let x4300 = n887([[1, _sy, 0], [_sx, 1, 0], [0, 0, 1]], i891(dx, dy)); x4300 = h889(x4300); const a = n881(vr); if (a > Tau / 4 && a < Tau * 3 / 4)
    x4300 = n887(x4300, i891(0, 0, 1, 1, Tau / 2)); if (determinant(x4300) < 0)
    x4300 = n887(x4300, i891(0, 0, -1, 1, 0)); return x4300; }
function g1606(b1531, tl, tr, bl) { const x4300 = v1605(tl, tr, bl); b1531.relativeTransform = [x4300[0], x4300[1]]; }
function j1607(b1531, b1530, setSize = true, noHeight = 0.01) { if (!b1530[j1403] || !b1530[w1404] || !b1530[x1405])
    return; const xp0 = b1530[j1403]; const xp1 = b1530[w1404]; const xp2 = b1530[x1405]; g1606(b1531, xp0, xp1, xp2); if (setSize) {
    const scaleX = distv(xp0, xp1);
    const scaleY = distv(xp0, xp2);
    const height = b1530[u1394] == p1242 ? b1530[l1438] : b1530[b1425];
    if (!b1531.removed) {
        b1531.resizeWithoutConstraints(Math.max(0.01, scaleX), height ? Math.max(0.01, scaleY) : noHeight);
    }
} }
function q1608(w2799, t2800) { if (w2799.removed)
    return; w2799.resizeWithoutConstraints(0.01, 0.01); w2799.setPluginData('actualX', t2800[x1421].toString()); w2799.setPluginData('actualY', t2800[x1423].toString()); w2799.x = t2800[x1421]; w2799.y = t2800[x1423]; w2799.rotation = t2800[r1417] ? 45 : 0; }
function d1609(w2799) { if (!w2799.removed)
    w2799.resizeWithoutConstraints(0.01, 0.01); }
function y2877(genBool) { return true; }
function v2848(genBool, addProps, transform) {
    return __awaiter(this, void 0, void 0, function* () { let objects = []; for (const b111 of genBool[j1452])
        yield v1546(b111, o => objects = [...objects, o], false); yield figma.currentPage.loadAsync(); let figBool = null; if (!isEmpty(objects)) {
        switch (genBool[a1453]) {
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
    } if (figBool) {
        figBool.expanded = false;
        c2854(figBool, genBool, addProps, transform);
    } return figBool; });
}
function c2854(figBool, genBool, addProps, transform) {
    return __awaiter(this, void 0, void 0, function* () { if (genBool[j1452].length == 0) {
        figBool.remove();
        return;
    } yield v2831(figBool, genBool[j1452], genBool[j1452].length, -1, [], false, false, false, false, true); const hasProps = genBool[w1407].length > 0 || genBool[d1408].length > 0 || genBool[l1415].length > 0; l2801(figBool, genBool, !hasProps && addProps); });
}
function e2874(p2865) { return p2865[x1421] != null && !isNaN(p2865[x1421]) && p2865[x1423] != null && !isNaN(p2865[x1423]) && p2865[v1424] != null && !isNaN(p2865[v1424]) && p2865[b1425] != null && !isNaN(p2865[b1425]) && p2865[k1427] != null && !isNaN(p2865[k1427]) && p2865[z1434] != null && !isNaN(p2865[z1434]) && p2865[o1440] != null && !isNaN(p2865[o1440]) && p2865[u1444] != null && !isNaN(p2865[u1444]); }
function f2887(p2865, addProps, transform) { if (!e2874(p2865))
    return null; const i2866 = figma.createEllipse(); l2888(i2866, p2865, addProps, transform, true); return i2866; }
function l2888(i2866, p2865, addProps, transform, isValid = false) { if (!isValid && !e2874(p2865))
    return; n2889(i2866, p2865, transform); if (q2864.includes(i2866))
    y2796(i2866);
else
    l2801(i2866, p2865, addProps); }
function n2889(i2866, p2865, transform) { i2866.cornerRadius = p2865[k1427]; const start = p2865[z1434] / 360 * (Math.PI * 2); const sweep = p2865[o1440] / 100 * (Math.PI * 2); i2866.arcData = { startingAngle: start, endingAngle: start + sweep, innerRadius: Math.min(Math.max(0, p2865[u1444] / 100), 1) }; if (transform)
    j1607(i2866, p2865); }
function n2879(c2867) { return c2867[x1421] != null && !isNaN(c2867[x1421]) && c2867[x1423] != null && !isNaN(c2867[x1423]) && c2867[v1424] != null && !isNaN(c2867[v1424]) && c2867[b1425] != null && !isNaN(c2867[b1425]) && c2867[o1433] != null && !isNaN(c2867[o1433]) && c2867[d1454] != null && !isNaN(c2867[d1454]); }
function c2850(c2867, addProps, transform) {
    return __awaiter(this, void 0, void 0, function* () { if (!n2879(c2867))
        return null; const m2868 = figma.createFrame(); if (m2868) {
        m2868.expanded = false;
        t2890(m2868, c2867, addProps, transform);
        let objects = [];
        for (const b111 of c2867[b1439])
            yield v1546(b111, o => objects = [...objects, o]);
        for (const b111 of objects)
            m2868.appendChild(b111);
    } return m2868; });
}
function d2856(m2868, c2867, addProps, transform) { t2890(m2868, c2867, addProps, transform); v2831(m2868, c2867[b1439], c2867[b1439].length); }
function t2890(m2868, c2867, addProps, transform) { m2868.cornerRadius = c2867[o1433]; m2868.clipsContent = c2867[d1454] > 0; if (transform)
    j1607(m2868, c2867); l2801(m2868, c2867, addProps && c2867[b1439].length == 0); figUpdateStrokeSides(m2868, c2867); }
function y2878(c2869) { return true; }
function k2849(c2869) {
    return __awaiter(this, void 0, void 0, function* () { let objects = []; for (const b111 of c2869[h1422])
        yield v1546(b111, o => objects = [...objects, o]); yield figma.currentPage.loadAsync(); const i2870 = !isEmpty(objects) ? figma.group(objects, figma.currentPage) : null; if (i2870) {
        i2870.expanded = false;
        s2855(i2870, c2869);
    } return i2870; });
}
function s2855(i2870, c2869) { if (c2869[h1422].length == 0) {
    i2870.remove();
    return;
} v2831(i2870, c2869[h1422], c2869[h1422].length); y1557(i2870, c2869); }
function g2873(s2871) { return s2871[x1421] != null && !isNaN(s2871[x1421]) && s2871[x1423] != null && !isNaN(s2871[x1423]) && s2871[v1424] != null && !isNaN(s2871[v1424]); }
function c2891(s2871, addProps, transform) { if (!g2873(s2871))
    return null; const u2872 = figma.createLine(); l2892(u2872, s2871, addProps, transform, true); return u2872; }
function l2892(u2872, s2871, addProps, transform, isValid = false) { if (!isValid && !g2873(s2871))
    return; if (transform)
    j1607(u2872, s2871, true, 0); l2801(u2872, s2871, addProps); }
var q2864 = [];
function k4120(t2800) { return t2800[x1421] != null && !isNaN(t2800[x1421]) && t2800[x1423] != null && !isNaN(t2800[x1423]); }
function w2794(t2800) { const w2799 = t2800[r1417] ? figma.createRectangle() : figma.createEllipse(); if (!k4120(t2800))
    return w2799; if (q2864.includes(w2799))
    q2798(w2799, t2800);
else
    p2851(w2799, t2800); return w2799; }
function p2851(w2799, t2800) { q1608(w2799, t2800); i2797(w2799); }
function q2795() { b1544({ cmd: 'uiUpdateZoom', zoom: figma.viewport.zoom }); for (const point of q2864)
    y2796(point); }
function y2796(w2799) { d1609(w2799); i2797(w2799); }
function q2798(w2799, t2800) { q1608(w2799, t2800); i2797(w2799); }
function i2797(w2799) { if (w2799.removed)
    return; figma.currentPage.loadAsync().then(() => { const isCenter = z921(w2799.getPluginData('isCenter')); const z2806 = figma.currentPage.selection.includes(w2799); const color = isCenter ? [0xf2, 0x48, 0x22] : z2806 ? [12, 140, 233] : [255, 255, 255]; const border = isCenter ? [255, 255, 255] : z2806 ? [255, 255, 255] : [12, 140, 233]; w2799.fills = y954([['SOLID', color[0], color[1], color[2], 100]]); const effects = []; effects.push(...a1552([['DROP_SHADOW', border[0] / 255, border[1] / 255, border[2] / 255, 1, 0, 0, 0, (isCenter ? 3 : z2806 ? 5 : 3.6) / t2807, 'NORMAL', true, true]], true)); effects.push(...a1552([['DROP_SHADOW', color[0] / 255, color[1] / 255, color[2] / 255, 1, 0, 0, 0, (z2806 ? 4 : 2.4) / t2807, 'NORMAL', true, true]], true)); w2799.effects = effects; }); }
function u4121(genPoly) { return genPoly[x1421] != null && !isNaN(genPoly[x1421]) && genPoly[x1423] != null && !isNaN(genPoly[x1423]) && genPoly[v1424] != null && !isNaN(genPoly[v1424]) && genPoly[b1425] != null && !isNaN(genPoly[b1425]) && genPoly[t1430] != null && !isNaN(genPoly[t1430]) && genPoly[q1436] != null && !isNaN(genPoly[q1436]); }
function s2808(genPoly, addProps, transform) { if (!u4121(genPoly))
    return null; const figPoly = figma.createPolygon(); l2809(figPoly, genPoly, addProps, transform, true); return figPoly; }
function l2809(figPoly, genPoly, addProps, transform, isValid = false) { if (!isValid && !u4121(genPoly))
    return; figPoly.cornerRadius = genPoly[t1430]; figPoly.pointCount = Math.max(3, genPoly[q1436]); if (transform)
    j1607(figPoly, genPoly); l2801(figPoly, genPoly, addProps); }
function a2811(k2810) { return k2810[x1421] != null && !isNaN(k2810[x1421]) && k2810[x1423] != null && !isNaN(k2810[x1423]) && k2810[v1424] != null && !isNaN(k2810[v1424]) && k2810[b1425] != null && !isNaN(k2810[b1425]) && k2810[p1426] != null && !isNaN(k2810[p1426]); }
function q2812(k2810, addProps, transform) { if (!a2811(k2810))
    return null; const figRect = figma.createRectangle(); t2813(figRect, k2810, addProps, transform, true); return figRect; }
function t2813(figRect, k2810, addProps, transform, isValid = false) { if (!isValid && !a2811(k2810))
    return; const foundCorners = k2810[l1415].findIndex(e => e[0] == 'ROUND_CORNERS'); if (foundCorners > -1) {
    const corners = k2810[l1415][foundCorners];
    figRect.topLeftRadius = corners[1];
    figRect.topRightRadius = corners[2];
    figRect.bottomLeftRadius = corners[3];
    figRect.bottomRightRadius = corners[4];
}
else
    figRect.cornerRadius = k2810[p1426]; if (transform)
    j1607(figRect, k2810); l2801(figRect, k2810, addProps); figUpdateStrokeSides(figRect, k2810); }
function figUpdateStrokeSides(b1531, b1530) { const foundSides = b1530[l1415].findIndex(e => e[0] == 'STROKE_SIDES'); if (foundSides < 0)
    return; const sides = b1530[l1415][foundSides]; b1531.strokeWeight = 0; b1531.strokeTopWeight = sides[1]; b1531.strokeLeftWeight = sides[2]; b1531.strokeRightWeight = sides[3]; b1531.strokeBottomWeight = sides[4]; }
function z2814(u2824) { return u2824[x1421] != null && !isNaN(u2824[x1421]) && u2824[x1423] != null && !isNaN(u2824[x1423]) && u2824[v1424] != null && !isNaN(u2824[v1424]) && u2824[b1425] != null && !isNaN(u2824[b1425]) && u2824[s1431] != null && !isNaN(u2824[s1431]) && u2824[v1437] != null && !isNaN(u2824[v1437]) && u2824[d1442] != null && !isNaN(u2824[d1442]); }
function m2815(u2824, addProps, transform) { if (!z2814(u2824))
    return null; const e2825 = figma.createStar(); o2816(e2825, u2824, addProps, transform, true); return e2825; }
function o2816(e2825, u2824, addProps, transform, isValid = false) { if (!isValid && !z2814(u2824))
    return; e2825.cornerRadius = u2824[s1431]; e2825.pointCount = u2824[v1437]; e2825.innerRadius = Math.min(Math.max(0, u2824[d1442] / 100), 1); if (transform)
    j1607(e2825, u2824); l2801(e2825, u2824, addProps); }
const r4361 = [];
function i2817(a2821) { return a2821[w1443] != null && a2821[x1421] != null && !isNaN(a2821[x1421]) && a2821[x1423] != null && !isNaN(a2821[x1423]) && a2821[v1424] != null && !isNaN(a2821[v1424]) && a2821[b1425] != null && !isNaN(a2821[b1425]) && a2821[u1445] != null && a2821[u1445] != NULL && a2821[l1446] != null && !isNaN(a2821[l1446]); }
function r2818(a2821, addProps, transform) { if (!i2817(a2821))
    return null; const b2893 = figma.createText(); e2819(b2893, a2821, addProps, transform, true); return b2893; }
function e2819(b2893, a2821, addProps, transform, isValid = false) { if (!isValid && !i2817(a2821))
    return null; const fontName = { family: a2821[u1445], style: a2821[u1447] }; try {
    if (!r4361.includes(fontName)) {
        figma.loadFontAsync(fontName).then(() => { r4361.push(fontName); u2820(b2893, a2821, fontName, addProps, transform); });
    }
    else {
        u2820(b2893, a2821, fontName, addProps, transform);
    }
}
catch (e) {
    h951(e);
} }
function u2820(b2893, a2821, fontName, addProps, transform) { b2893.fontName = fontName; b2893.fontSize = Math.max(1, a2821[l1446]); b2893.characters = a2821[w1443]; b2893.lineHeight = { unit: 'PERCENT', value: a2821[z1450] }; b2893.letterSpacing = { unit: 'PERCENT', value: a2821[y1451] }; if (a2821[n1448] == 0)
    b2893.textAlignHorizontal = 'LEFT';
else if (a2821[n1448] == 1)
    b2893.textAlignHorizontal = 'CENTER';
else if (a2821[n1448] == 2)
    b2893.textAlignHorizontal = 'RIGHT';
else if (a2821[n1448] == 3)
    b2893.textAlignHorizontal = 'JUSTIFIED'; if (a2821[i1449] == 0)
    b2893.textAlignVertical = 'TOP';
else if (a2821[i1449] == 1)
    b2893.textAlignVertical = 'CENTER';
else if (a2821[i1449] == 2)
    b2893.textAlignVertical = 'BOTTOM'; if (transform)
    j1607(b2893, a2821); l2801(b2893, a2821, addProps); if (a2821[e1432] == 0 && a2821[l1438] == 0)
    b2893.textAutoResize = 'WIDTH_AND_HEIGHT';
else if (a2821[e1432] == 0)
    b2893.textAutoResize = 'HEIGHT';
else
    b2893.textAutoResize = 'NONE'; }
function y2876(u2826) { return true; }
function c2847(u2826, addProps, transform) { if (!y2876(u2826))
    return null; const b2827 = figma.createVector(); m2853(b2827, u2826, addProps, transform, true); return b2827; }
function m2853(b2827, u2826, addProps, transform, isValid = false) { if (!isValid && !y2876(u2826))
    return; b2827.setVectorNetworkAsync(u2826[x1428]); if (transform)
    j1607(b2827, u2826, false); l2801(b2827, u2826, addProps); }
function d2875(h2822) { return h2822[t1435] != null && !isNaN(h2822[t1435]) && h2822[z1441] != null && !isNaN(h2822[z1441]); }
function w2846(h2822, addProps, transform) { const t2823 = figma.createVector(); q2852(t2823, h2822, addProps, transform, true); return t2823; }
function q2852(t2823, h2822, addProps, transform, isValid = false) { if (!isValid && !d2875(h2822))
    return; t2823.vectorPaths = [{ windingRule: h2822[t1435] == 1 ? 'NONZERO' : 'EVENODD', data: h2822[s1429] }]; t2823.cornerRadius = Number(h2822[z1441]); if (transform)
    j1607(t2823, h2822, false); l2801(t2823, h2822, addProps); }
