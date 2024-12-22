var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function u1046(key, tag) { return key.substring(0, tag.length + 1) == tag + ' '; }
function k1047(key, tag) { return key.substring(tag.length + 1); }
function s1048(key) { return u1046(key, g875); }
function l1049(key) { return u1046(key, p873); }
function f1050(key) { return u1046(key, s874); }
function n1051(key) { return k1047(key, g875); }
function a1052(key) { return k1047(key, p873); }
function r1053(key) { return k1047(key, s874); }
const generatorVersion = 442;
const j866 = 2147483647;
const NULL = '';
const NULL_VALUE = 'NULL';
const v867 = '  ';
const n868 = '    ';
const q870 = '\n';
const j871 = '◦ G •';
const PLUGIN_NAME = 'Generator';
const PLUGIN_LOGO_AND_NAME = j871 + ' ' + PLUGIN_NAME;
const t872 = j871 + ' ';
const p873 = 'G_NODE';
const s874 = 'G_CONN';
const g875 = 'G_PAGE';
const m876 = 'G_TEMP';
const minWindowWidth = 602;
const minWindowHeight = 40;
const identity = Object.freeze([[1, 0, 0], [0, 1, 0], [0, 0, 1]]);
const Epsilon = 0.0000001;
const Tau = Math.PI * 2;
var enableAsserts = false;
function d877(x, eps = 0.000000001) { return Math.abs(x) < eps ? 0 : x; }
function hardPosZero(x, eps = 0.000000001) { return x < 0 && x > -eps ? 0 : x; }
function nozero(x, eps = 0.000000001) { return x != 0 ? x : (x < 0 ? -eps : eps); }
function p878(v, eps = 0.000000001) { return point(nozero(v.x, eps), nozero(v.y, eps)); }
function equal(a, b, eps = 0.000000001) { return Math.abs(b - a) < eps; }
function sqr(x) { return x * x; }
;
function cube(x) { return x * x * x; }
;
function m879(f) { return Math.floor(f) | 0; }
function p880(x) { x = m879(x); x--; x |= x >> 1; x |= x >> 2; x |= x >> 4; x |= x >> 8; x |= x >> 16; x |= x >> 32; return ++x; }
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
function a883(v) { return Math.sqrt(v.x * v.x + v.y * v.y); }
function lengthv_(x, y) { return Math.sqrt(x * x + y * y); }
function i884(v) { return point(v.x == 0 ? 0 : v.x / a883(v), v.y == 0 ? 0 : v.y / a883(v)); }
function dotv(v1, v2) { return v1.x * v2.x + v1.y * v2.y; }
function m885(a1, a2) { let diff = a2 - a1; while (diff <= -Tau / 2)
    diff += Tau; while (diff > Tau / 2)
    diff -= Tau; return diff; }
function s886(v, m) { let v3 = [v.x, v.y, 1]; let r = m946(v3, m); return point(r[0], r[1]); }
function g887(...mm) { r950(mm.length > 0, 'mulm3m3() must take at least one argument'); let result = clone(mm[0]); for (let a = 1; a < mm.length; a++) {
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
function o888(m, s) { for (let i = 0; i < 3; i++)
    for (let j = 0; j < 3; j++)
        m[i][j] /= s; return m; }
function adjugate(m) { return cofactor(transpose(m)); }
function transpose(m) { return [[m[0][0], m[1][0], m[2][0]], [m[0][1], m[1][1], m[2][1]], [m[0][2], m[1][2], m[2][2]]]; }
function cofactor(m) { return [[m[1][1] * m[2][2] - m[2][1] * m[1][2], -(m[1][0] * m[2][2] - m[2][0] * m[1][2]), m[1][0] * m[2][1] - m[2][0] * m[1][1]], [-(m[0][1] * m[2][2] - m[2][1] * m[0][2]), m[0][0] * m[2][2] - m[2][0] * m[0][2], -(m[0][0] * m[2][1] - m[2][0] * m[0][1])], [m[0][1] * m[1][2] - m[1][1] * m[0][2], -(m[0][0] * m[1][2] - m[1][0] * m[0][2]), m[0][0] * m[1][1] - m[1][0] * m[0][1]]]; }
function determinant(m) { return m[0][0] * (m[1][1] * m[2][2] - m[1][2] * m[2][1]) - m[0][1] * (m[1][0] * m[2][2] - m[2][0] * m[1][2]) + m[0][2] * (m[1][0] * m[2][1] - m[2][0] * m[1][1]); }
function g889(m) { return o888(adjugate(m), determinant(m)); }
function l890(angle) { const cosA = d877(Math.cos(angle)); const sinA = d877(Math.sin(angle)); return [[cosA, sinA, 0], [-sinA, cosA, 0], [0, 0, 1]]; }
function v891(x = 0, y = 0, scaleX = 1, scaleY = 1, angle = 0, skewX = 0, skewY = 0) { const cosA = Math.cos(angle); const sinA = Math.sin(angle); return [[scaleX * cosA - skewY * sinA, -skewX * cosA + scaleY * sinA, x], [skewY * cosA + scaleX * sinA, scaleY * cosA + skewX * sinA, y], [0, 0, 1]]; }
function x892(v1, v2) { return v1.x * v2.y - v1.y * v2.x; }
function y893(v1, v2) { return point(v1.x + v2.x, v1.y + v2.y); }
function sqrv(v) { return p894(v, v); }
function p894(v1, v2) { return point(v1.x * v2.x, v1.y * v2.y); }
function y895(v, s) { return point(v.x * s, v.y * s); }
function s896(v1, v2) { return point(v1.x / v2.x, v1.y / v2.y); }
function c897(v, s) { return point(v.x / s, v.y / s); }
function j898(v1, v2) { return point(v1.x - v2.x, v1.y - v2.y); }
function w899(str) { return decodeURI(encodeURIComponent(str)); }
function p900(str) { return decodeURIComponent(encodeURI(str)); }
function a901(bytes) { let str = ''; for (let i = 0; i < bytes.length; i++)
    str += String.fromCharCode(bytes[i]); return str; }
function x902(str) { return Array.from(p900(str), c => c.charCodeAt(0)); }
function s903(array, size) { const newArray = new Uint8Array(size); t904(array, newArray); return newArray; }
function t904(src, dst) { d905(src, 0, src.length, dst, 0, dst.length); }
function d905(src, h906, t907, dst, y908, y909) { const size = Math.min(t907, y909); for (let i = 0; i < size; i++)
    dst[y908 + i] = src[h906 + i]; }
function l910(p911, i912) { if (p911.length != i912.length)
    return false; for (let i = 0; i < p911.length; i++) {
    if (p911[i] != i912[i])
        return false;
} return true; }
function c913(z914, s915) { return z914.findIndex(i => s915.includes(i)) > -1; }
function g916(list) { return list ? '<==' : '<--'; }
;
function a917(list) { return list ? '==>' : '-->'; }
;
function r918(nodeId) { return p873 + ' ' + nodeId; }
function j919(name) { return s874 + ' ' + name; }
function b920(name) { return g875 + ' ' + name; }
function d921(str) { if (str.trim().toLowerCase() == 'true')
    return true; if (str.trim().toLowerCase() == 'false')
    return false; const num = parseFloat(str); if (!isNaN(num))
    return num > 0; console.error('invalid bool string "' + str + '"'); return false; }
function stringIsNumber(str) { const num = Number(str); if ((isNaN(num) || parseFloat(str).toString() !== str.trim()) && !Object.is(num, -0))
    return false; return true; }
function h922(h923, r924 = false) { return t929(h923.outputNodeId, h923.outputId, h923.outputOrder, h923.inputNodeId, h923.inputId, h923.list, r924); }
function v925(outputNodeId, outputId, outputOrder, inputNodeId, inputId) { return j919(outputNodeId + ' ' + outputId + ' ' + outputOrder + ' ' + inputNodeId + ' ' + inputId); }
function l926(o243) { return v925(o243.outputNodeId, o243.outputId, o243.outputOrder, o243.inputNodeId, o243.inputId); }
function v927(o243) { return v925(o243.output.node.id, o243.output.id, o243.outputOrder, o243.input.node.id, o243.input.id); }
function z928(o243, r924 = false) { return t929(o243.output.node.id, o243.output.id, o243.outputOrder, o243.input.node.id, o243.input.id, o243.list, r924); }
function t929(outputNodeId, outputId, outputOrder, inputNodeId, inputId, list, r924 = false) { const sp = r924 ? ' ' : '  '; const jsp = r924 ? '' : ' '; const arrow = sp + t933(typeof outputOrder == 'string' ? parseInt(outputOrder) : outputOrder) + a917(typeof list == 'string' ? d921(list) : list) + sp; const join = jsp + '.' + jsp; return outputNodeId + join + outputId + arrow + inputNodeId + join + inputId; }
function o930(pageId) { return b920(pageId); }
function j931(num) { const str = num.toString(); let sup = ''; for (const c of str)
    sup += t932(c); return sup; }
function t932(c) { switch (c) {
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
function t933(num) { const str = num.toString(); let sup = ''; for (const c of str)
    sup += x934(c); return sup; }
function x934(c) { switch (c) {
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
function o935(bool) { return bool ? 'true' : 'false'; }
function isValid(val) { return val != undefined && val != null; }
function isEmpty(array) { return array.length == 0; }
function p936(array, item) { r937(array, array.indexOf(item)); }
function r937(array, index) { if (index > -1 && index < array.length)
    array.splice(index, 1); }
function h938(array) { if (isEmpty(array))
    return null; let last = array.at(-1); array.splice(array.length - 1, 1); return last; }
function e939(array) { return array[array.length - 1]; }
function f940(array, from, to) { const item = array[from]; array.splice(from, 1); array.splice(to, 0, item); }
function y941(array, item) { const index = array.indexOf(item); if (index > -1)
    array.splice(index, 1); }
function h942(i2706, array) { for (const item of array) {
    const index = i2706.indexOf(item);
    if (index > -1)
        i2706.splice(index, 1);
} }
function p943(array, where) { const index = array.findIndex(where); if (index > -1)
    array.splice(index, 1); }
function v944(styleId) { return styleId.split(',')[0] + ','; }
function w945(points) { let b3913 = ''; if (points.length < 2)
    return b3913; b3913 += 'M'; b3913 += ' ' + d877(points[0].x); b3913 += ' ' + d877(points[0].y); for (let i = 1; i < points.length; i++) {
    b3913 += ' L' + ' ' + d877(points[i].x) + ' ' + d877(points[i].y);
} return b3913; }
function point(x, y) { return { x: x, y: y }; }
function m946(v, m) { let r = [0, 0, 0]; for (let i = 0; i < 3; i++)
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
        let c111 = {};
        for (const key in val)
            c111[key] = clone(val[key]);
        return c111;
    }
} throw 'unknown'; }
function v947(array, item, equal = null) { if (equal) {
    if (Array.isArray(item))
        item.forEach(i => v947(array, i, equal));
    else if (!array.find(i => equal(i, item)))
        array.push(item);
}
else {
    if (Array.isArray(item))
        item.forEach(i => v947(array, i));
    else if (!array.includes(item))
        array.push(item);
} }
function z948(array, item, equal) { if (Array.isArray(item))
    item.forEach(i => z948(array, i, equal));
else if (!array.find(equal))
    array.push(item); }
function w949(array, item, except) { if (Array.isArray(item))
    item.forEach(i => w949(array, i, except));
else if (!array.find(except))
    array.push(item); }
function r950(...args) { if (enableAsserts) {
    console.assert(...args);
} }
function s951(...args) { if (enableAsserts)
    console.error(...args); }
function k952(str, trim) { while (str.length >= trim.length && str.substring(0, trim.length) == trim)
    str = str.substring(trim.length); return str; }
function z953(str, trim) { while (str.length >= trim.length && str.substring(str.length - trim.length) == trim)
    str = str.substring(0, str.length - trim.length); return str; }
function u954(p3971) { const fills = []; for (const fill of p3971) {
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
            const h4086 = [[0, 1, 0], [0.5, 0.5, 1], [1, 1, 1]];
            let u4087 = [[p0.x, p1.x, p2.x], [p0.y, p1.y, p2.y], [1, 1, 1]];
            u4087 = g887(h4086, g889(u4087));
            u4087 = [u4087[0], u4087[1]];
            const stops = [];
            for (const stop of fill[2]) {
                stops.push({ color: { r: Math.min(Math.max(0, stop[0]), 1), g: Math.min(Math.max(0, stop[1]), 1), b: Math.min(Math.max(0, stop[2]), 1), a: Math.min(Math.max(0, stop[3]), 1) }, position: stop[4] });
            }
            fills.push({ type: fill[0], gradientTransform: u4087, gradientStops: stops, blendMode: fill[3] });
            break;
        }
    }
} return fills; }
function l955(type) { return d1088.includes(type); }
function isValueListOfLists(value) { if (!l955(value.type))
    return false; for (const item of value.items) {
    if (!l955(item.type))
        return false;
} return true; }
function isValueListOfCondensedLists(value) { if (!value || !l955(value.type))
    return false; for (const item of value.items) {
    if (!item || !l955(item.type) || item.condensed !== true)
        return false;
} return true; }
const q1054 = 'LIST#';
const z1055 = 'NLIST#';
const g1056 = 'TLIST#';
const x1057 = 'SLIST#';
const COLOR_LIST_VALUE = 'CLIST#';
const FILL_LIST_VALUE = 'FLIST#';
const COLOR_STOP_LIST_VALUE = 'CSLIST#';
const a1058 = 'NULL';
const d1060 = 'VARGRP';
const n1061 = 'FEEDBK';
const x1062 = 'REPT';
const ADVANCE = 'ADVNC';
const m1063 = 'CACHE';
const u1064 = 'FRZ';
const x1065 = 'TIMER';
const q1066 = 'GVNAME';
const k1067 = 'SVNAME';
const y1332 = 'GVNAMES';
const c1333 = 'SVNAMES';
const a1334 = 'SONAME';
const n1059 = 'VAR';
const VARIABLE_VALUE = 'VAR#';
const VARIABLE_TYPES = [VARIABLE_VALUE, n1059];
const l1068 = 'LIST';
const f1069 = 'LSASIT';
const c1070 = 'EXTR';
const g1071 = 'SETP';
const g1072 = 'GETP';
const b1073 = 'SUBLST';
const q1074 = 'UNIQ';
const c1329 = 'RORD';
const c1330 = 'SHFTLST';
const c1075 = 'REVLST';
const x1331 = 'BUKLST';
const d1076 = 'SORT';
const l1077 = 'CLMN';
const w1078 = 'CELL';
const u1079 = 'ITEMS';
const j1080 = 'COUNT';
const OBJECT_COUNT = 'OBJCOUNT';
const o1081 = 'LCONT';
const LIST_FIND = 'LFIND';
const s1082 = 'SELECT';
const i1340 = 'LSTSEL';
const o1083 = 'IF';
const d1084 = 'LSTFLT';
const r1086 = 'ANY#';
const t1087 = [q1054, z1055, g1056, x1057, COLOR_LIST_VALUE, FILL_LIST_VALUE, COLOR_STOP_LIST_VALUE, l1068, c1070, g1071, g1072, b1073, u1079, j1080, o1081, LIST_FIND, x1062, ADVANCE];
const d1088 = [q1054, z1055, g1056, x1057, COLOR_LIST_VALUE, FILL_LIST_VALUE, COLOR_STOP_LIST_VALUE];
const j1085 = 'ITER';
const z1107 = 'PROB';
const HOLD = 'HOLD';
const BOOLEAN_NUMBER = 'BOOL';
const e1090 = 'NUM#';
const b1091 = 'NUM';
const BOUNDED_NUMBER = 'BNDNUM';
const e1335 = 'NPREC';
const h1092 = 'NSIGN';
const w1093 = 'ABS';
const p1336 = 'NEG';
const x1094 = 'ROUND';
const v1337 = 'QUANT';
const k1095 = 'SMINMAX';
const d1096 = 'MINMAX';
const l1097 = 'LIM';
const l1098 = 'NCURVE';
const u1338 = 'NMAP';
const d1339 = 'NBIAS';
const z1099 = 'ISNAN';
const d1100 = 'CONST';
const k1101 = 'DATE';
const y1102 = 'SEQ';
const n1103 = 'RANGE';
const i1104 = 'WAVE';
const z1105 = 'RAND';
const h1106 = 'NOISE';
const b1108 = 'ACCUM';
const n1109 = 'LERP';
const v1110 = 'SOLVE';
const v1111 = 'NANIM';
const b1112 = 'SMATH';
const f1113 = 'MATH';
const e1114 = 'NBOOL';
const o1115 = 'CMP';
const v1116 = 'TRIG';
const i1117 = 'ATAN2';
const i1118 = 'CNVANG';
const q1123 = 'TEXT#';
const b1124 = 'TEXT';
const b1125 = 'TLEN';
const y1126 = 'TTRIM';
const k1127 = 'TSUB';
const e1128 = 'TCONT';
const TEXT_FIND = 'TFIND';
const g1129 = 'TCASE';
const y1130 = 'TREPL';
const TEXT_ADD = 'TADD';
const s1131 = 'TJOIN';
const a1132 = 'TPAD';
const x1133 = 'TCMP';
const r1134 = 'TCHAR';
const z1135 = 'TUNI';
const TEXT_ESCAPE = 'TESC';
const TEXT_UNESCAPE = 'TUNESC';
const q1136 = 'INDEX';
const e1137 = 'N2T';
const BOOLEAN_TO_TEXT = 'B2T';
const g1138 = 'C2T';
const COLOR_TO_CSS = 'C2CSS';
const e1139 = 'T2N';
const TEXT_TO_BOOLEAN = 'T2B';
const c1140 = 'T2C';
const s1141 = 'TSPLT';
const s3412 = 'PRJSON';
const p1143 = 'PRCSV';
const z1144 = 'FETCH';
const i1145 = 'TFILE';
const TO_JSON = 'TOJSON';
const s1148 = 'COL#';
const j1149 = 'COL';
const o1150 = 'CVAL';
const u1151 = 'CCOR';
const c1152 = 'CCNT';
const a1153 = 'CDLTE';
const t1154 = 'BLND';
const COLOR_SCHEME = 'CPAL';
const g1155 = 'CLERP';
const c1156 = 'CBLND';
const m1158 = 'FILL#';
const h1159 = 'FILL';
const a1160 = [m1158, h1159];
const x1161 = 'STRK#';
const u1162 = 'STRK';
const v1163 = [x1161, u1162];
const x1170 = 'STRKSD#';
const q1171 = 'STRKSD';
const c1172 = [x1170, q1171];
const o1164 = 'CSTOP#';
const c1165 = 'CSTOP';
const v1166 = [o1164, c1165];
const d1167 = 'GRAD#';
const o1168 = 'GRAD';
const e1169 = [d1167, o1168];
const d1173 = 'RCRN#';
const i1174 = 'RCRN';
const m1175 = [d1173, i1174];
const f1176 = 'DRSH#';
const s1177 = 'DRSH';
const q1178 = [f1176, s1177];
const s1179 = 'INSH#';
const b1180 = 'INSH';
const w1181 = [s1179, b1180];
const r1182 = 'LBLR#';
const v1183 = 'LBLR';
const r1184 = [r1182, v1183];
const e1185 = 'BBLR#';
const q1186 = 'BBLR';
const z1187 = [e1185, q1186];
const d1188 = 'MASK#';
const l1189 = 'MASK';
const w1190 = [d1188, l1189];
const i1191 = 'BLEND#';
const s1192 = 'BLEND';
const y1193 = [i1191, s1192];
const x1196 = 'CSTL';
const w1197 = 'SHP#';
const a1198 = 'RECT#';
const x1199 = 'RECT';
const n1200 = [a1198, x1199];
const w1201 = 'LINE#';
const n1202 = 'LINE';
const n1203 = [w1201, n1202];
const l1204 = 'ELPS#';
const y1205 = 'ELPS';
const s1206 = [l1204, y1205];
const y1207 = 'TRPZ#';
const s1208 = 'TRPZ';
const h1209 = [y1207, s1208];
const f1216 = 'POLY#';
const z1217 = 'POLY';
const d1218 = [f1216, z1217];
const k1219 = 'STAR#';
const m1220 = 'STAR';
const w1221 = [k1219, m1220];
const z1222 = 'TXTS#';
const d1223 = 'TXTS';
const h1224 = [z1222, d1223];
const p1225 = 'PT#';
const y1226 = 'PT';
const d1227 = [p1225, y1226];
const z1228 = 'PCORN';
const c1229 = 'VPATH#';
const o1230 = 'VPATH';
const i1231 = [c1229, o1230];
const r1232 = 'VPT#';
const t1233 = 'VPT';
const f1234 = [r1232, t1233];
const e1235 = 'VEDGE#';
const i1236 = 'VEDGE';
const e1237 = [e1235, i1236];
const k1238 = 'VREG#';
const t1239 = 'VREG';
const l1240 = [k1238, t1239];
const r1241 = 'VNET#';
const h1242 = 'VNET';
const w1243 = [r1241, h1242];
const j1244 = 'SGRP#';
const m1245 = 'SGRP';
const r1246 = [j1244, m1245];
const y1247 = 'FRM#';
const s1248 = 'FRM';
const a1249 = [y1247, s1248];
const k1211 = 'ARC#';
const b1210 = 'ARC';
const r1212 = [k1211, b1210];
const g1214 = 'WAVEP#';
const t1213 = 'WAVEP';
const d1215 = [g1214, t1213];
const a1250 = 'MOVE';
const x1251 = 'ROT';
const t1252 = 'SCALE';
const p1253 = 'SKEW';
const SHOW_CENTER = 'SHOWCNTR';
const k1254 = 'SCENTR';
const r1255 = 'RSTX';
const x1256 = 'PLACE';
const k1257 = 'APPLY';
const PATH_LENGTH = 'PTHLEN';
const JOIN_PATHS = 'JOINPTH';
const REORIENT_PATHS = 'REORPTH';
const s1264 = 'PTALPATH';
const t1265 = 'CPTONPATH';
const g1258 = 'MESPT';
const v1259 = 'PTANGLE';
const z1260 = 'VECLEN';
const o1261 = 'CIRCEN';
const ARC_FROM_POINTS = 'ARCPT';
const y1262 = 'INTLIN';
const p1263 = 'PTLERP';
const REVERSE_PATH = 'REVPTH';
const BLEND_PATH = 'BLENDPTH';
const s1266 = 'SBOOL';
const x1267 = 'SBOOL#';
const o1268 = 'SBOOLU';
const c1269 = 'SBOOLS';
const u1270 = 'SBOOLI';
const b1271 = 'SBOOLE';
const j1273 = 'RETAIN';
const EXPORT = 'EXPORT';
const t1278 = 'GROUP';
const u1279 = 'GPARAM';
const z1281 = 'CMNT';
const l1282 = 'CMNTARR';
const z1283 = 'PANEL';
const c1284 = 'ACT';
const q1285 = 'BFACT';
const o1286 = 'BFLST';
const c1287 = 'DIS';
const j1288 = 'NOC';
const PARAM = 'PARAM';
const o1289 = 'LOG';
const g1290 = 'GRAPH';
const v1089 = [a1058, n1059, d1060, ...t1087, f1069, c1070, g1071, g1072, b1073, q1074, c1329, c1330, c1075, l1077, d1076, w1078, u1079, s1082, i1340, o1083, d1084, n1061, x1062, ADVANCE, j1085, z1107, HOLD, m1063, u1064, s3412, p1143, TO_JSON, x1065, q1066, k1067, y1332, c1333, COLOR_SCHEME, a1153, g1138, COLOR_TO_CSS, j1273];
const k1119 = [f1113, b1112];
const f1120 = [e1114];
const w1121 = [o1115];
const h1122 = [v1116, i1117];
const a1146 = [e1090, z1055, b1091, BOUNDED_NUMBER, BOOLEAN_NUMBER, e1335, h1092, w1093, p1336, x1094, v1337, k1095, d1096, l1097, l1098, u1338, d1339, z1099, d1100, k1101, y1102, n1103, i1104, z1105, h1106, b1108, n1109, v1110, v1111, e1137, BOOLEAN_TO_TEXT, r1134, ...k1119, ...f1120, ...w1121, ...h1122, i1118, x1331];
const b1147 = [q1123, g1056, b1124, b1125, y1126, k1127, e1128, TEXT_FIND, g1129, TEXT_ADD, s1131, a1132, y1130, x1133, z1135, TEXT_ESCAPE, TEXT_UNESCAPE, q1136, e1139, TEXT_TO_BOOLEAN, c1140, s1141, z1144, i1145];
const h1157 = [s1148, j1149, o1150, u1151, t1154, c1152, a1153, g1155, c1156, g1138, COLOR_TO_CSS];
const COLOR_HEADER_TYPES = [j1149, h1159, u1162, c1165, o1168];
const COLOR_VALUES = [s1148, m1158, x1161, o1164, d1167];
const e1194 = [...c1172, ...m1175, ...q1178, ...w1181, ...r1184, ...z1187, ...y1193, ...w1190];
const f1195 = [s1148, m1158, d1167, x1161, x1170, f1176, s1179, r1182, e1185, i1191, d1188];
const PATH_TYPES = [o1230, s1208, b1210, t1213];
const PATH_VALUES = [c1229, y1207, k1211, g1214];
const p1272 = [s1266, x1267, o1268, c1269, u1270, b1271];
const z1274 = [w1197, x1057, a1198, w1201, l1204, y1207, f1216, k1219, z1222, p1225, c1229, r1232, e1235, k1238, r1241, k1211, g1214, j1244, y1247, x1267, f1176, s1179, r1182, e1185, i1191, d1188];
const v1275 = [x1251, t1252, p1253];
const o1276 = [...z1274, ...n1200, ...n1203, ...s1206, ...h1209, ...d1218, ...w1221, ...h1224, ...d1227, z1228, ...i1231, ...f1234, ...e1237, ...l1240, ...w1243, ...r1212, ...d1215, ...r1246, ...a1249, ...p1272, a1250, ...v1275, SHOW_CENTER, k1254, r1255, x1256, k1257, PATH_LENGTH, JOIN_PATHS, REORIENT_PATHS, s1264, t1265, g1258, v1259, z1260, o1261, b1210, t1213, ARC_FROM_POINTS, y1262, p1263, REVERSE_PATH, BLEND_PATH, a1334, EXPORT];
const NUMBER_VALUES = [e1090, z1055];
const TEXT_VALUES = [q1123, g1056];
const c1277 = [q1054, z1055, g1056, x1057, VARIABLE_VALUE, e1090, q1123, s1148, m1158, o1164, d1167, x1161, o1164, d1167, w1197, a1198, w1201, l1204, y1207, f1216, k1219, z1222, p1225, c1229, r1232, e1235, k1238, r1241, j1244, y1247, d1173, f1176, s1179, r1182, e1185, i1191, d1188];
const y1280 = [t1278, u1279];
const NUMBER_ADD = '+';
const NUMBER_SUBTRACT = '-';
const NUMBER_MULTIPLY = '*';
const NUMBER_DIVIDE = '/';
const NUMBER_MODULO = '%';
const NUMBER_EXPONENT = '^';
const y1291 = [[NUMBER_MODULO, 'mod'], [NUMBER_DIVIDE, '/'], [NUMBER_SUBTRACT, '−'], [NUMBER_ADD, '+'], [NUMBER_MULTIPLY, '×'], [NUMBER_EXPONENT, 'e<sup>x']];
const x1292 = [[NUMBER_DIVIDE, '/'], [NUMBER_SUBTRACT, '−'], [NUMBER_ADD, '+'], [NUMBER_MULTIPLY, '×']];
const o1293 = 0;
const t1294 = 1;
const w1295 = 2;
const s1296 = 3;
const r1297 = [[o1293, 'not'], [t1294, 'xor'], [w1295, 'or'], [s1296, 'and']];
const e1298 = 0;
const q1299 = 1;
const u1300 = 2;
const t1301 = 3;
const k1302 = 4;
const p1303 = 5;
const f1304 = [[e1298, '<'], [q1299, '≤'], [u1300, '≠'], [t1301, '='], [k1302, '≥'], [p1303, '>']];
const z1305 = 0;
const i1306 = 1;
const j1307 = 2;
const q1308 = 3;
const p1309 = 4;
const c1310 = 5;
const u1311 = [[z1305, 'sin'], [i1306, 'cos'], [j1307, 'tan'], [q1308, 'asin'], [p1309, 'acos'], [c1310, 'atan']];
const r1312 = 'EMPTY';
const l1313 = 'CONNECT';
const x1314 = 'CREATE';
const z1315 = 'CREATE_INSERT';
const c1316 = 'DELETE';
const z1317 = 'DISCONNECT';
const m1318 = 'LINK_STYLE';
const b1319 = 'LINK_VARIABLE';
const e1320 = 'LINK_VARIABLE_GROUP';
const q1321 = 'MAKE_ACTIVE';
const MAKE_NOT_CONDITION_ACTION = 'MAKE_NOT_CONDITION';
const o1322 = 'MAKE_PASSIVE';
const z1323 = 'PASTE';
const v1324 = 'RECONNECT';
const w1325 = 'REMOVE';
const d1326 = 'RENAME';
const b1327 = 'REORDER_INPUTS';
const q1328 = 'REORDER_CONNECTIONS';
const f1341 = 'SELECT';
const l1342 = 'SELECT_MOVE';
const u1343 = 'MOVE_NODES';
const m1344 = 'SET_PARAM_VALUE';
const SET_MULTIPLE_VALUES_ACTION = 'SET_MULTIPLE_VALUES';
const SET_SHOW_VALUE_NAMES_ACTION = 'SET_SHOW_VALUE_NAMES';
const l1345 = 'SET_PARAM_SETTING';
const g1346 = 'SET_NODE_RECT';
const m1347 = 'TOGGLE_DISABLE';
const r1348 = 'TOGGLE_PARAM_HEADER';
const t1349 = 'SET_CURRENT_GRAPH';
const u1350 = 'CREATE_PAGE';
const t1351 = 'DELETE_PAGE';
const e1352 = 'GROUP_NODES';
const c1353 = 'UNGROUP_NODES';
const m1354 = 'HIGHLIGHT_NODES';
const SCROLL_LIST_NODE_ACTION = 'SCROLL_LIST_NODE';
const SET_LIST_DIVIDER_ACTION = 'SET_LIST_DIVIDER';
const SET_NODE_PARAM_ACTION = 'SET_NODE_PARAM';
const d1355 = 'BNORM';
const f1356 = 'BDARK';
const l1357 = 'BMULT';
const u1358 = 'BPDRK';
const i1359 = 'BBURN';
const v1360 = 'BLITE';
const g1361 = 'BSCRN';
const t1362 = 'BPLGT';
const o1363 = 'BDODG';
const m1364 = 'BOVER';
const e1365 = 'BSOFT';
const w1366 = 'BHARD';
const p1367 = 'BDIFF';
const l1368 = 'BEXCL';
const s1369 = 'BHUE';
const k1370 = 'BSAT';
const g1371 = 'BCOL';
const f1372 = 'BLUM';
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
const j1373 = [[d1355, 'normal', 'NORMAL'], [f1356, 'darken', 'DARKEN'], [l1357, 'multiply', 'MULTIPLY'], [u1358, 'plus darker', 'LINEAR_BURN'], [i1359, 'color burn', 'COLOR_BURN'], [v1360, 'lighten', 'LIGHTEN'], [g1361, 'screen', 'SCREEN'], [t1362, 'plus lighter', 'LINEAR_DODGE'], [o1363, 'color dodge', 'COLOR_DODGE'], [m1364, 'overlay', 'OVERLAY'], [e1365, 'soft light', 'SOFT_LIGHT'], [w1366, 'hard light', 'HARD_LIGHT'], [p1367, 'difference', 'DIFFERENCE'], [l1368, 'exclusion', 'EXCLUSION'], [s1369, 'hue', 'HUE'], [k1370, 'saturation', 'SATURATION'], [g1371, 'color', 'COLOR'], [f1372, 'luminosity', 'LUMINOSITY']];
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
const s1374 = [['thin', 100], ['extra light', 200], ['light', 300], ['regular', 400], ['medium', 500], ['semi bold', 600], ['bold', 700], ['extra bold', 800], ['black', 900]];
const y1375 = 0;
const e1376 = 1;
const u1377 = 2;
const m1378 = 2;
const j1379 = 3;
const p1380 = 3;
const r1381 = 4;
const k1382 = 4;
const FO_PERSIST = 5;
const i1384 = 6;
const j1385 = 7;
const s1386 = 8;
const w1387 = 9;
const p1388 = 10;
const FO_VARIABLE_TYPE = 10;
const w1389 = 11;
const FO_VARIABLE_COUNT = 11;
const y1390 = 12;
const FO_VARIABLE_IS_ALIAS = 12;
const e1391 = 13;
const b1392 = 14;
const l1393 = 15;
const i1394 = 16;
const c1395 = 17;
const m1396 = 18;
const x1397 = 19;
const h1398 = 20;
const h1399 = 21;
const p1400 = 22;
const r1401 = 23;
const a1402 = 24;
const f1433 = 24;
const y1403 = 24;
const j1404 = 25;
const u1434 = 25;
const n1405 = 26;
const n1406 = 27;
const v1407 = 28;
const j1408 = 28;
const n1409 = 28;
const z1410 = 28;
const l1411 = 28;
const y1412 = 28;
const k1413 = 28;
const s1414 = 28;
const e1415 = 29;
const w1416 = 29;
const w1417 = 29;
const g1418 = 29;
const c1419 = 29;
const y1435 = 29;
const a1421 = 30;
const z1422 = 30;
const o1423 = 30;
const u1424 = 30;
const m1420 = 30;
const g1425 = 31;
const f1426 = 31;
const u1427 = 32;
const b1428 = 33;
const q1429 = 34;
const m1430 = 35;
const h1431 = 36;
const m1432 = 37;
const s2707 = '12345679ABCDEFGHJKLMNPQRSTUVWXYZ';
function p844(array, chars = s2707) { let w846 = ''; let len = array.length; let i = 0; while (len > 0) {
    if (len >= 5) {
        const a0 = array[i], a1 = array[i + 1], a2 = array[i + 2], a3 = array[i + 3], a4 = array[i + 4];
        w846 += chars[(a0 & 0xF8) >>> 3];
        w846 += chars[((a0 & 0x07) << 2) | ((a1 & 0xC0) >>> 6)];
        w846 += chars[(a1 & 0x3E) >>> 1];
        w846 += chars[((a1 & 0x01) << 4) | ((a2 & 0xF0) >>> 4)];
        w846 += chars[((a2 & 0x0F) << 1) | ((a3 & 0x80) >>> 7)];
        w846 += chars[(a3 & 0x7C) >>> 2];
        w846 += chars[((a3 & 0x03) << 3) | ((a4 & 0xE0) >>> 5)];
        w846 += chars[(a4 & 0x1F)];
    }
    else if (len == 4) {
        const a0 = array[i], a1 = array[i + 1], a2 = array[i + 2], a3 = array[i + 3];
        w846 += chars[(a0 & 0xF8) >>> 3];
        w846 += chars[((a0 & 0x07) << 2) | ((a1 & 0xC0) >>> 6)];
        w846 += chars[(a1 & 0x3E) >>> 1];
        w846 += chars[((a1 & 0x01) << 4) | ((a2 & 0xF0) >>> 4)];
        w846 += chars[((a2 & 0x0F) << 1) | ((a3 & 0x80) >>> 7)];
        w846 += chars[(a3 & 0x7C) >>> 2];
        w846 += chars[((a3 & 0x03) << 3)];
    }
    else if (len == 3) {
        const a0 = array[i], a1 = array[i + 1], a2 = array[i + 2];
        w846 += chars[(a0 & 0xF8) >>> 3];
        w846 += chars[((a0 & 0x07) << 2) | ((a1 & 0xC0) >>> 6)];
        w846 += chars[(a1 & 0x3E) >>> 1];
        w846 += chars[((a1 & 0x01) << 4) | ((a2 & 0xF0) >>> 4)];
        w846 += chars[((a2 & 0x0F) << 1)];
    }
    else if (len == 2) {
        const a0 = array[i], a1 = array[i + 1];
        w846 += chars[(a0 & 0xF8) >>> 3];
        w846 += chars[((a0 & 0x07) << 2) | ((a1 & 0xC0) >>> 6)];
        w846 += chars[(a1 & 0x3E) >>> 1];
        w846 += chars[((a1 & 0x01) << 4)];
    }
    else if (len == 1) {
        const a0 = array[i];
        w846 += chars[(a0 & 0xF8) >>> 3];
        w846 += chars[((a0 & 0x07) << 2)];
    }
    i += 5;
    len -= 5;
} return w846; }
function y845(w846, chars = s2707) { const array = []; let len = w846.length; let c = 0; while (len > 0) {
    if (len >= 8) {
        const c0 = chars.indexOf(w846[c]), c1 = chars.indexOf(w846[c + 1]), c2 = chars.indexOf(w846[c + 2]), c3 = chars.indexOf(w846[c + 3]), c4 = chars.indexOf(w846[c + 4]), c5 = chars.indexOf(w846[c + 5]), c6 = chars.indexOf(w846[c + 6]), c7 = chars.indexOf(w846[c + 7]);
        array.push((c0 << 3) | ((c1 & 0x1C) >>> 2));
        array.push(((c1 & 0x03) << 6) | (c2 << 1) | ((c3 & 0x10) >>> 4));
        array.push(((c3 & 0x0F) << 4) | ((c4 & 0x1E) >>> 1));
        array.push(((c4 & 0x01) << 7) | (c5 << 2) | ((c6 & 0x18) >>> 3));
        array.push(((c6 & 0x07) << 5) | c7);
    }
    else if (len == 7) {
        const c0 = chars.indexOf(w846[c]), c1 = chars.indexOf(w846[c + 1]), c2 = chars.indexOf(w846[c + 2]), c3 = chars.indexOf(w846[c + 3]), c4 = chars.indexOf(w846[c + 4]), c5 = chars.indexOf(w846[c + 5]), c6 = chars.indexOf(w846[c + 6]);
        array.push((c0 << 3) | ((c1 & 0x1C) >>> 2));
        array.push(((c1 & 0x03) << 6) | (c2 << 1) | ((c3 & 0x10) >>> 4));
        array.push(((c3 & 0x0F) << 4) | ((c4 & 0x1E) >>> 1));
        array.push(((c4 & 0x01) << 7) | (c5 << 2) | ((c6 & 0x18) >>> 3));
    }
    else if (len == 5) {
        const c0 = chars.indexOf(w846[c]), c1 = chars.indexOf(w846[c + 1]), c2 = chars.indexOf(w846[c + 2]), c3 = chars.indexOf(w846[c + 3]), c4 = chars.indexOf(w846[c + 4]);
        array.push((c0 << 3) | ((c1 & 0x1C) >>> 2));
        array.push(((c1 & 0x03) << 6) | (c2 << 1) | ((c3 & 0x10) >>> 4));
        array.push(((c3 & 0x0F) << 4) | ((c4 & 0x1E) >>> 1));
    }
    else if (len == 4) {
        const c0 = chars.indexOf(w846[c]), c1 = chars.indexOf(w846[c + 1]), c2 = chars.indexOf(w846[c + 2]), c3 = chars.indexOf(w846[c + 3]);
        array.push((c0 << 3) | ((c1 & 0x1C) >>> 2));
        array.push(((c1 & 0x03) << 6) | (c2 << 1) | ((c3 & 0x10) >>> 4));
    }
    else if (len == 2) {
        const c0 = chars.indexOf(w846[c]), c1 = chars.indexOf(w846[c + 1]);
        array.push((c0 << 3) | ((c1 & 0x1C) >>> 2));
    }
    c += 8;
    len -= 8;
} return array; }
function logSavedNode(nodeKey, c3889) {
    return __awaiter(this, void 0, void 0, function* () { const log = h1933(yield m1545(nodeKey, false)); if (c3889) {
        console.log('%c%s\n%c%s', 'background: #fa24; color: white;', a1052(nodeKey), 'background: #fa44; color: #edc;', log);
    }
    else {
        console.log('%c%s\n%c%s', 'background: #fdb; color: black;', a1052(nodeKey), 'background: #fed; color: black;', log);
    } });
}
function h1933(json) { let q3914 = json.replace('{\n', '').replace('\n}', '').replace('[\n' + v867, '').replace('\n' + v867 + ']', '').split(v867 + '"params":\n').join('').split('": "').join(': ').split('", "').join(': ').split(v867 + '"').join(v867).split(v867 + v867 + '["').join(v867 + v867).split('",\n').join('\n').split('"\n').join('\n').split('"],\n').join('\n'); if (q3914[q3914.length - 1] == '"')
    q3914 = q3914.substring(0, q3914.length - 1); if (q3914.substring(q3914.length - 2) == '"]')
    q3914 = q3914.substring(0, q3914.length - 2); return q3914; }
function z1934(json) { let q3914 = json.replace('{\n', '').replace('\n}', '').replace('[\n' + v867, '').replace('\n' + v867 + ']', ''); return q3914; }
function a1935(o243, c3889) { const i4090 = h922(o243, true); if (c3889) {
    console.log('%c%s', 'background: #4f44; color: #ded', i4090);
}
else {
    console.log('%c%s', 'background: #cfc; color: black;', i4090);
} }
console.clear();
const figCurrentPage = figma.currentPage;
figma.payments.setPaymentStatusInDevelopment({ type: 'PAID' });
figma.loadAllPagesAsync().then(() => { figma.on('documentchange', r1516); figma.on('selectionchange', n1524); figma.on('close', w1517); });
u1505(true);
g1506();
figma.clientStorage.getAsync('pro').then(data => { const title = PLUGIN_NAME + (data !== true ? ' (Free version)' : '') + '  │  ' + figCurrentPage.name; figma.showUI(__html__, { visible: false, themeColors: true, title: title }); });
var t2619 = figma.viewport.zoom;
setInterval(s1521, 100);
var strBackgrounds = '';
setInterval(figCheckBackgrounds, 500);
const o2708 = 'clock_';
const t2709 = 1000;
var i2710 = false;
var objectCenterSize = 15;
var tempVariableCollection = null;
function h1518(genVersion) { j1546('generatorVersion', genVersion.toString()); (function () {
    return __awaiter(this, void 0, void 0, function* () { figCurrentPage.loadAsync().then(() => __awaiter(this, void 0, void 0, function* () { let l2711 = yield figCurrentPage.getPluginData(figma.currentUser.id + ',windowWidth'); let e2712 = yield figCurrentPage.getPluginData(figma.currentUser.id + ',windowHeight'); let s2713; let t2714; if (l2711 === NULL) {
        s2713 = 800;
        figCurrentPage.setPluginData(figma.currentUser.id + ',windowWidth', l2711.toString());
    }
    else
        s2713 = parseInt(l2711); if (e2712 === NULL) {
        t2714 = 600;
        figCurrentPage.setPluginData(figma.currentUser.id + ',windowHeight', e2712.toString());
    }
    else
        t2714 = parseInt(e2712); figma.ui.resize(Math.max(minWindowWidth, s2713), Math.max(minWindowHeight, t2714)); figma.ui.show(); const fonts = yield figma.listAvailableFontsAsync(); const eula = (yield figma.clientStorage.getAsync('eula')) === 'true'; const tutorials = (yield figma.clientStorage.getAsync('tutorials')) === 'true'; const isLocked = yield l1523(); j1525({ cmd: 'uiReturnFigStartGenerator', currentUser: figma.currentUser, viewportRect: figma.viewport.bounds, viewportZoom: figma.viewport.zoom, fonts: fonts, eula: eula, tutorials: tutorials, isLocked: isLocked, windowWidth: s2713, windowHeight: t2714 }); })); });
})(); }
function f1519() {
    return __awaiter(this, void 0, void 0, function* () { u1505(); g1506(); figma.showUI(__html__, { visible: false, themeColors: true }); });
}
function b1520() { setInterval(j1522, t2709); }
function s1521() { if (figma.viewport.zoom == t2619)
    return; t2619 = figma.viewport.zoom; f2607(); q1539(); k1541(); }
function figCheckBackgrounds() { if (strBackgrounds != JSON.stringify(figCurrentPage.backgrounds)) {
    q1539();
    strBackgrounds = JSON.stringify(figCurrentPage.backgrounds);
} }
function j1522() { j1546(o2708 + figma.currentUser.sessionId.toString(), Date.now().toString()); }
function l1523() {
    return __awaiter(this, void 0, void 0, function* () { yield figCurrentPage.loadAsync(); const clocks = figCurrentPage.getPluginDataKeys().filter(k => k.length > o2708.length && k.substring(0, o2708.length) == o2708 && k.substring(o2708.length) != figma.currentUser.sessionId.toString()).map((k) => __awaiter(this, void 0, void 0, function* () { return parseInt(yield m1545(k)); })); clocks.sort(); const now = Date.now(); const locked = clocks.length > 0 && now - (yield clocks[clocks.length - 1]) < t2709 * 2; return locked; });
}
function n1524() { f2607(); }
var l2640 = new Array();
var a2642 = new Array();
function figGetObjectsFromIds(objectIds) {
    return __awaiter(this, void 0, void 0, function* () { for (let i = w2676.length - 1; i >= 0; i--)
        if (!w2676[i].removed && objectIds.includes(w2676[i].getPluginData('objectId')))
            w2676.splice(i, 1); for (let i = d2692.length - 1; i >= 0; i--)
        if (d2692[i].removed || objectIds.includes(d2692[i].getPluginData('objectId')))
            d2692.splice(i, 1); yield figCurrentPage.loadAsync(); return figCurrentPage.findAll(o => objectIds.includes(o.getPluginData('objectId'))); });
}
function p1504(nodeIds) {
    return __awaiter(this, void 0, void 0, function* () { for (let i = w2676.length - 1; i >= 0; i--)
        if (!w2676[i].removed && nodeIds.includes(w2676[i].getPluginData('nodeId')))
            w2676.splice(i, 1); for (let i = d2692.length - 1; i >= 0; i--)
        if (d2692[i].removed || nodeIds.includes(d2692[i].getPluginData('nodeId')))
            d2692.splice(i, 1); yield figCurrentPage.loadAsync(); figCurrentPage.findAll(o => nodeIds.includes(o.getPluginData('nodeId'))).forEach(o => { if (!o.removed)
        o.remove(); }); l2640 = l2640.filter(a => !nodeIds.includes(a.nodeId)); });
}
function u1505(f1507 = false) { for (const u1512 of figCurrentPage.children) {
    if (u1512.removed)
        continue;
    if (u1512.getPluginData('objectId') != '' && u1512.getPluginData('userId') == figma.currentUser.id && (parseInt(u1512.getPluginData('retain')) == 0 || f1507))
        u1512.remove();
} }
function y1508(nodeIds, g1509) { for (let i = l2640.length - 1; i >= 0; i--) {
    const r2641 = l2640[i];
    if (!nodeIds.includes(r2641.nodeId))
        continue;
    for (let j = r2641.objects.length - 1; j >= 0; j--) {
        const u1512 = r2641.objects[j];
        if (u1512.removed || !b1510(u1512, g1509)) {
            if (!u1512.removed)
                u1512.remove();
            y941(r2641.objects, u1512);
            if (w2676.includes(u1512))
                y941(w2676, u1512);
            if (d2692.includes(u1512))
                y941(d2692, u1512);
        }
        if (!u1512.removed) {
            if (parseInt(u1512.getPluginData('retain')) == 2)
                u1531(u1512);
        }
    }
    if (isEmpty(r2641.objects))
        y941(l2640, r2641);
} }
function b1510(u1512, g1509) { if (u1512.type == m1245 || u1512.type == s1248) {
    for (const child of u1512.children) {
        const found = b1510(child, g1509);
        if (found)
            return found;
    }
}
else {
    const found = g1509.find(o => u1512.getPluginData('objectId') == o[u1377] && u1512.getPluginData('userId') == figma.currentUser.id || o[FO_PERSIST] == 2 && o[FO_PERSIST] == u1512.getPluginData('retain'));
    if (found)
        return found;
} return null; }
function x1513(nodeIds, c1514) { figma.getLocalPaintStylesAsync().then(paintStyles => { paintStyles.filter(s => nodeIds.includes(s.getPluginData('nodeId'))).forEach(s => { const nodeId = s.getPluginData('nodeId'); const existing = d921(s.getPluginData('existing')); if (!existing) {
    s.remove();
}
else if (c1514) {
    p943(a2642, a => a.nodeId == nodeId);
    s.setPluginData('type', NULL);
    s.setPluginData('nodeId', NULL);
    s.setPluginData('existing', NULL);
} }); }); if (c1514)
    a2642 = a2642.filter(a => !nodeIds.includes(a.nodeId)); }
var t1515 = false;
function r1516(e) { for (const change of e.documentChanges) {
    switch (change.type) {
        case 'STYLE_CREATE':
            if (!change.style)
                break;
            if (!t1515) {
                change.style.setPluginData('type', NULL);
                change.style.setPluginData('nodeId', NULL);
                change.style.setPluginData('existing', NULL);
            }
            break;
        case 'STYLE_PROPERTY_CHANGE': {
            if (!change.style)
                break;
            if (!t1515) {
                const msg = { cmd: 'uiStylePropertyChange', styleId: v944(change.id), properties: change.properties, name: '', paints: [] };
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
                j1525(msg);
            }
            break;
        }
        case 'STYLE_DELETE':
            j1525({ cmd: 'uiStyleDelete', styleId: change.id });
            break;
    }
} t1515 = false; }
function w1517() { u1505(); g1506(); j1525({ cmd: 'updateMetrics' }); }
figma.ui.onmessage = function (msg) { msg = JSON.parse(msg); if (msg.cmd == 'returnUiGetValueForFigma')
    return; switch (msg.cmd) {
    case 'figStartGenerator':
        h1518(msg.generatorVersion);
        break;
    case 'figRestartGenerator':
        f1519();
        break;
    case 'figFinishStart':
        b1520();
        break;
    case 'figDockWindowNormal':
        e2649('normal');
        break;
    case 'figDockWindowMaximize':
        e2649('maximize');
        break;
    case 'figDockWindowTop':
        e2649('top');
        break;
    case 'figDockWindowLeft':
        e2649('left');
        break;
    case 'figDockWindowRight':
        e2649('right');
        break;
    case 'figDockWindowBottom':
        e2649('bottom');
        break;
    case 'figGetMousePosition':
        a1591(msg.clientPosition);
        break;
    case 'figResizeWindow':
        y1594(msg.width, msg.height);
        break;
    case 'figSetWindowRect':
        u1592(msg.x, msg.y, msg.width, msg.height);
        break;
    case 'figNotify':
        i1595(msg);
        break;
    case 'figGetLocalData':
        c1543(msg.key);
        break;
    case 'figSetLocalData':
        d1544(msg.key, msg.value);
        break;
    case 'figClearAllLocalData':
        l3909();
        break;
    case 'figGetPageData':
        m1545(msg.key);
        break;
    case 'figSetPageData':
        j1546(msg.key, msg.value);
        break;
    case 'figSavePages':
        g1551(msg.pageIds, msg.pageJson, msg.currentPageId);
        break;
    case 'figLoadNodesAndConns':
        h1548(msg.debugMode);
        break;
    case 'figSaveNodes':
        l1552(msg.nodeIds, msg.nodeJson);
        break;
    case 'figGetAllLocalTemplateNames':
        d2646();
        break;
    case 'figSaveLocalTemplate':
        u1553(msg.q3910, msg.template);
        break;
    case 'figRemoveConnsToNodes':
        d1554(msg.nodeIds);
        break;
    case 'figRemoveSavedNodesAndConns':
        w1555(msg.nodeIds);
        break;
    case 'figRemoveAllSavedNodesAndConns':
        d1556();
        break;
    case 'figLogAllSavedNodesAndConns':
        o1557(msg.c3889);
        break;
    case 'figLogAllSavedNodes':
        k1558(msg.c3889);
        break;
    case 'figLogAllSavedConns':
        f1559(msg.c3889);
        break;
    case 'figLogAllSavedPageKeys':
        s1560(msg.c3889);
        break;
    case 'figLogAllSavedPages':
        h1561(msg.c3889);
        break;
    case 'figLogAllSavedConnKeys':
        g1562(msg.c3889);
        break;
    case 'figLogAllLocalData':
        t1563(msg.c3889);
        break;
    case 'figGetValue':
        v1564(msg.key, msg.spec);
        break;
    case 'figRemoveSavedPage':
        w1566(msg.pageId);
        break;
    case 'figRemoveAllSavedPages':
        i1567();
        break;
    case 'figSaveConnection':
        g1568(msg.key, msg.json);
        break;
    case 'figSaveConnections':
        p1569(msg.keys, msg.json);
        break;
    case 'figUpdateSavedConnections':
        e1570(msg.curKeys, msg.newKeys, msg.json);
        break;
    case 'figDeleteSavedConnection':
        n1571(msg.key);
        break;
    case 'figRemoveAllSavedConnections':
        o1572();
        break;
    case 'figDeleteSavedConnectionsToNode':
        r1573(msg.nodeId);
        break;
    case 'figDeleteSavedConnectionsFromNode':
        p1574(msg.nodeId);
        break;
    case 'figRemovePluginDataFromAllLocalStyles':
        q1575();
        break;
    case 'figGetAllLocalVariables':
        w1599(msg.nodeId, msg.px, msg.py);
        break;
    case 'figGetAllLocalColorStyles':
        k1576(msg.nodeId, msg.px, msg.py);
        break;
    case 'figLinkNodeToExistingColorStyle':
        h1577(msg.nodeId, msg.styleId);
        break;
    case 'figExport':
        figExport(msg.objectIds, msg.scale, msg.format, msg.suffix);
        break;
    case 'figGetObjectSize':
        l1530(msg.object);
        break;
    case 'figGetVariableUpdates':
        h1565(msg.linkedVarIds);
        break;
    case 'figUpdateShowIds':
        i2710 = msg.i2710;
        break;
    case 'figUpdateObjectCenterSize':
        objectCenterSize = msg.objectCenterSize;
        break;
    case 'figDeleteAllObjects':
        u1505();
        break;
    case 'figDeleteAllVariables':
        g1506();
        break;
    case 'figUpdateObjectsAndStyles':
        e2655 = 0;
        d2656 = 0;
        msg.objects.forEach(o => o.counted = false);
        c2643(null, msg.objects, msg.objectBatchSize, msg.x1881, msg.nodeIds, msg.m2672, msg.a2673, msg.y270);
        r1582(msg);
        break;
    case 'figDeleteObjectsAndStyles':
        p1504(msg.nodeIds);
        x1513(msg.nodeIds, msg.c1514);
        break;
    case 'figDeleteObjectsExcept':
        y1508(msg.nodeIds, msg.ignoreObjects);
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
} j1525({ cmd: 'uiEndFigMessage', msgCmd: msg.cmd }); };
function j1525(msg) { figma.ui.postMessage(JSON.stringify(msg)); }
function b2644(key) {
    return __awaiter(this, void 0, void 0, function* () { return yield figma.clientStorage.getAsync(key); });
}
function c1543(key) { figCurrentPage.loadAsync().then(() => { if (key == 'canvasEmpty') {
    j1525({ cmd: 'uiReturnFigGetLocalData', key: key, value: figCurrentPage.children.length == 0 });
}
else if (key == 'debugWarningCrash') {
    figma.clientStorage.getAsync('debugWarning').then(data => { j1525({ cmd: 'uiReturnFigGetLocalData', key: key, value: data }); });
}
else {
    figma.clientStorage.getAsync(key).then(data => { j1525({ cmd: 'uiReturnFigGetLocalData', key: key, value: data }); });
} }); }
function d1544(key, value, postToUi = true) { figma.clientStorage.setAsync(key, value); if (postToUi) {
    j1525({ cmd: 'uiReturnFigSetLocalData', key: key, value: value });
} }
function l3909() {
    return __awaiter(this, void 0, void 0, function* () { const keys = yield figma.clientStorage.keysAsync(); for (const key of keys)
        figma.clientStorage.deleteAsync(key); });
}
function m1545(key_1) {
    return __awaiter(this, arguments, void 0, function* (key, postToUi = true) { yield figCurrentPage.loadAsync(); const data = figCurrentPage.getPluginData(key); if (postToUi) {
        j1525({ cmd: 'uiReturnFigGetPageData', key: key, value: data });
    } return data; });
}
function j1546(key, value) { k1547(key); figCurrentPage.setPluginData(key, value); }
function k1547(key) { figCurrentPage.setPluginData(key, ''); }
function h1548(debugMode) { figCurrentPage.loadAsync().then(() => { const pageKeys = figCurrentPage.getPluginDataKeys().filter(k => s1048(k)); const nodeKeys = figCurrentPage.getPluginDataKeys().filter(k => l1049(k)); const connKeys = figCurrentPage.getPluginDataKeys().filter(k => f1050(k)); if (!debugMode)
    k1550(nodeKeys, connKeys); const pages = pageKeys.map(k => figCurrentPage.getPluginData(k)); const nodes = nodeKeys.map(k => figCurrentPage.getPluginData(k)); const z1952 = connKeys.map(k => figCurrentPage.getPluginData(k)); const pageOrder = figCurrentPage.getPluginData('pageOrder').split(','); const currentPageId = figCurrentPage.getPluginData('currentPageId'); const generatorVersion = parseInt(figCurrentPage.getPluginData('generatorVersion')); t1549(nodes); j1525({ cmd: 'uiReturnFigLoadNodesAndConns', pageKeys: pageKeys, pageJson: pages, pageOrder: pageOrder, currentPageId: currentPageId, nodeKeys: nodeKeys, nodeJson: nodes, connKeys: connKeys, connJson: z1952, generatorVersion: generatorVersion }); }); }
function t1549(nodes) { a2642 = []; figma.getLocalPaintStylesAsync().then(paintStyles => { for (const w2930 of nodes) {
    const node = JSON.parse(w2930);
    if (node.type == x1196) {
        const style = paintStyles.find(s => { const nodeId = s.getPluginData('nodeId'); return nodeId == node.id; });
        if (style) {
            a2642.push({ nodeId: node.id, existing: d921(node.existing), styles: [style] });
        }
    }
} }); }
function k1550(nodeKeys, connKeys) { figCurrentPage.loadAsync().then(() => { const u2645 = '"loading": "true"'; const not = '{\n'; const set = '{\n' + v867 + u2645 + ',\n'; nodeKeys.forEach(k => figCurrentPage.setPluginData(k, figCurrentPage.getPluginData(k).replace(set, not).replace(not, set))); connKeys.forEach(k => figCurrentPage.setPluginData(k, figCurrentPage.getPluginData(k).replace(set, not).replace(not, set))); }); }
function g1551(pageIds, pageJson, currentPageId) { for (let i = 0; i < pageIds.length; i++) {
    j1546(b920(pageIds[i]), pageJson[i]);
} j1546('pageOrder', pageIds.join(',')); j1546('currentPageId', currentPageId); }
function l1552(nodeIds, nodeJson) { for (let i = 0; i < nodeIds.length; i++) {
    j1546(r918(nodeIds[i]), nodeJson[i]);
} }
function d2646() {
    return __awaiter(this, void 0, void 0, function* () { let keys = yield figma.clientStorage.keysAsync(); keys = keys.filter(k => k.length >= m876.length && k.substring(0, m876.length) == m876); j1525({ cmd: 'uiReturnGetAllLocalTemplateNames', templateNames: keys }); });
}
function u1553(q3910, template) { d1544(m876 + ' ' + q3910, template); }
function d1554(nodeIds) { figCurrentPage.loadAsync().then(() => { const connKeys = figCurrentPage.getPluginDataKeys().filter(k => f1050(k)); for (const key of connKeys) {
    const parts = r1053(key).split(' ');
    if (nodeIds.includes(parts[0]) || nodeIds.includes(parts[2]))
        k1547(key);
} }); }
function w1555(nodeIds) { figCurrentPage.loadAsync().then(() => { d1554(nodeIds); const nodeKeys = figCurrentPage.getPluginDataKeys().filter(k => l1049(k) && nodeIds.includes(a1052(k))); nodeKeys.forEach(k => k1547(k)); }); }
function d1556() { figCurrentPage.loadAsync().then(() => { const nodeKeys = figCurrentPage.getPluginDataKeys().filter(k => l1049(k)); const connKeys = figCurrentPage.getPluginDataKeys().filter(k => f1050(k)); for (const key of nodeKeys)
    k1547(key); for (const key of connKeys)
    k1547(key); }); }
function o1557(c3889) {
    return __awaiter(this, void 0, void 0, function* () { yield k1558(c3889); f1559(c3889); });
}
function k1558(c3889) {
    return __awaiter(this, void 0, void 0, function* () { yield figCurrentPage.loadAsync(); figCurrentPage.getPluginDataKeys().filter(k => l1049(k)).forEach((k) => __awaiter(this, void 0, void 0, function* () { return yield logSavedNode(k, c3889); })); });
}
function f1559(c3889) { figCurrentPage.loadAsync().then(() => { const connKeys = figCurrentPage.getPluginDataKeys().filter(k => f1050(k)); connKeys.sort((key1, key2) => { const p1 = r1053(key1).split(' '); const p2 = r1053(key2).split(' '); if (p1[2] != p2[2])
    return p1[2] < p2[2] ? -1 : 1; if (p1[3] != p2[3])
    return parseInt(p1[3]) - parseInt(p2[3]); if (p1[2] == p2[0])
    return -1; if (p2[2] == p1[0])
    return 1; return 0; }); connKeys.forEach(k => a1935(JSON.parse(figCurrentPage.getPluginData(k)), c3889)); }); }
function s1560(c3889) { figCurrentPage.loadAsync().then(() => { const keys = figCurrentPage.getPluginDataKeys().filter(k => s1048(k)); keys.forEach(k => console.log('%c' + k, 'background: #fff; color: ' + (c3889 ? 'black' : 'white'))); const pageOrder = figCurrentPage.getPluginData('pageOrder'); console.log('%c' + pageOrder, 'background: #fff; color: ' + (c3889 ? 'black' : 'white')); }); }
function h1561(c3889) { figCurrentPage.loadAsync().then(() => { const connKeys = figCurrentPage.getPluginDataKeys().filter(k => s1048(k)); connKeys.forEach(k => console.log('%c' + figCurrentPage.getPluginData(k), 'background: #fff; color: ' + (c3889 ? 'black' : 'white'))); const pageOrder = figCurrentPage.getPluginData('pageOrder'); console.log('%c' + pageOrder, 'background: #fff; color: ' + (c3889 ? 'black' : 'white')); }); }
function g1562(c3889) { figCurrentPage.loadAsync().then(() => { const connKeys = figCurrentPage.getPluginDataKeys().filter(k => f1050(k)); connKeys.forEach(k => console.log('%c' + k, 'background: #dff; color: ' + (c3889 ? 'black' : 'white'))); }); }
function t1563(c3889) { figma.clientStorage.keysAsync().then(keys => keys.forEach(k => figma.clientStorage.getAsync(k).then(val => console.log(k + ': ' + val)))); }
function v1564(key, spec) {
    return __awaiter(this, void 0, void 0, function* () { let result = null; switch (key) {
        case 'getVariableData':
            result = yield p1600(spec);
            break;
        case 'getPaidStatus':
            result = figma.payments.status.type;
            break;
        case 'figSubscribe': {
            yield figma.payments.initiateCheckoutAsync({ interstitial: 'PAID_FEATURE' });
            result = figma.payments.status.type;
            break;
        }
    } j1525({ cmd: 'returnFigGetValue', value: result }); });
}
function h1565(varIds) { p1600(varIds).then(variables => { j1525({ cmd: 'uiReturnFigGetVariableUpdates', variables: variables }); }); }
function w1566(pageId) {
    return __awaiter(this, void 0, void 0, function* () { k1547(o930(pageId)); const pageOrder = (yield m1545('pageOrder')).split(','); p943(pageOrder, id => id == pageId); j1546('pageOrder', pageOrder.join(',')); });
}
function i1567() { figCurrentPage.loadAsync().then(() => { const pageKeys = figCurrentPage.getPluginDataKeys().filter(k => s1048(k)); pageKeys.forEach(k => k1547(k)); k1547('pageOrder'); }); }
function g1568(key, json) { j1546(key, json); }
function p1569(_keys, _json) { const keys = JSON.parse(_keys); const json = JSON.parse(_json); for (let i = 0; i < keys.length; i++)
    j1546(keys[i], json[i]); }
function e1570(_curKeys, _newKeys, _json) { const curKeys = JSON.parse(_curKeys); const newKeys = JSON.parse(_newKeys); const json = JSON.parse(_json); for (let i = 0; i < curKeys.length; i++) {
    k1547(curKeys[i]);
    j1546(newKeys[i], json[i]);
} }
function n1571(key) { k1547(key); }
function o1572() { figCurrentPage.loadAsync().then(() => { const connKeys = figCurrentPage.getPluginDataKeys().filter(k => f1050(k)); connKeys.forEach(k => k1547(k)); }); }
function r1573(nodeId) { figCurrentPage.loadAsync().then(() => { const connKeys = figCurrentPage.getPluginDataKeys().filter(k => f1050(k)); for (const key of connKeys) {
    const parts = key.split(' ');
    if (parts[4] == nodeId)
        k1547(key);
} }); }
function p1574(nodeId) { figCurrentPage.loadAsync().then(() => { const connKeys = figCurrentPage.getPluginDataKeys().filter(k => f1050(k)); for (const key of connKeys) {
    const parts = key.split(' ');
    if (parts[1] == nodeId)
        k1547(key);
} }); }
function q1575() { figma.getLocalPaintStylesAsync().then(b1579 => { for (const style of b1579) {
    style.setPluginData('type', '');
    style.setPluginData('nodeId', '');
    style.setPluginData('existing', '');
} }); }
function figSaveSnapshot(index, objectIds) {
    return __awaiter(this, void 0, void 0, function* () { const objects = yield figGetObjectsFromIds(objectIds); const group = figma.group(objects, figCurrentPage); const settings = { format: 'PNG' }; const icon = yield group.exportAsync(settings); figma.ungroup(group); j1525({ cmd: 'uiReturnFigSaveSnapshot', index: index, iconWidth: group.width, iconHeight: group.height, icon: icon }); });
}
var c2647 = null;
var p3911 = () => c2647 = null;
var e2648 = 'normal';
function a1591(clientPosition) { j1525({ cmd: 'uiReturnFigGetMousePosition', position: { x: 0, y: 0 }, clientPosition: clientPosition, viewportZoom: figma.viewport.zoom, viewportRect: figma.viewport.bounds }); }
function u1592(x, y, width, height) { return; }
function c1593(dock, rect, bounds) { switch (dock) {
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
function y1594(width, height) { (function () {
    return __awaiter(this, void 0, void 0, function* () { width = Math.floor(Math.max(0, width)); height = Math.floor(Math.max(0, height)); figma.ui.resize(width, height); yield figCurrentPage.loadAsync(); figCurrentPage.setPluginData(figma.currentUser.id + ',windowWidth', width.toString()); figCurrentPage.setPluginData(figma.currentUser.id + ',windowHeight', height.toString()); j1525({ cmd: 'uiReturnFigResizeWindow', width: width, height: height }); });
})(); }
function e2649(dock) {
    return __awaiter(this, void 0, void 0, function* () { if (dock != 'normal' && e2648 == 'normal') {
        figma.clientStorage.setAsync('normalWindowX', yield figma.clientStorage.getAsync('normalWindowX'));
        figma.clientStorage.setAsync('normalWindowY', yield figma.clientStorage.getAsync('normalWindowY'));
        figma.clientStorage.setAsync('normalWindowWidth', yield figma.clientStorage.getAsync('normalWindowWidth'));
        figma.clientStorage.setAsync('normalWindowHeight', yield figma.clientStorage.getAsync('normalWindowHeight'));
    } e2648 = dock; figma.clientStorage.setAsync('windowDock', dock); y1594(yield figma.clientStorage.getAsync('windowWidth'), yield figma.clientStorage.getAsync('windowHeight')); });
}
function i1595(msg) { e1596(msg.text, msg.prefix, msg.delay, msg.error, msg.n1597, msg.g1598); }
function e1596(text, prefix = '', delay = 4000, error = false, n1597 = '', g1598 = NULL) { const options = { timeout: delay, error: error, onDequeue: p3911 }; if (n1597 != '') {
    options['button'] = { text: n1597 };
    if (g1598.substring(0, 'removeConnection'.length) == 'removeConnection') {
        options['button']['action'] = () => n1571(g1598.split(',')[1]);
    }
    else {
        switch (g1598) {
            case 'hideClearUndoWarning':
                options['button']['action'] = () => j1525({ cmd: 'uiHideClearUndoWarning' });
                break;
        }
    }
} if (c2647)
    c2647.cancel(); c2647 = figma.notify(prefix + text, options); }
function o2650(key_1) {
    return __awaiter(this, arguments, void 0, function* (key, params = null) { return yield v2651(key, params); });
}
function v2651(key_1) {
    return __awaiter(this, arguments, void 0, function* (key, params = null) { return new Promise((resolve, reject) => { const timeout = 60000; j1525(Object.assign({ cmd: 'uiGetValueForFigma', key: key }, (params || {}))); const s2652 = setTimeout(() => reject(new Error('Timeout: Result not received by Figma within the specified time')), timeout); function j3912(msg) { msg = JSON.parse(msg); if (msg.cmd === 'returnUiGetValueForFigma') {
        clearTimeout(s2652);
        resolve({ key: msg.key, value: msg.value });
        figma.ui.off('message', j3912);
    } } figma.ui.on('message', j3912); }); });
}
var w2653 = [];
var h2654 = [];
var e2655 = 0;
var d2656 = 0;
function c2643(j2669_1, z2670_1, j2671_1) {
    return __awaiter(this, arguments, void 0, function* (j2669, z2670, j2671, x1881 = -1, nodeIds = [], m2672 = false, a2673 = false, y270 = false, addProps = true, transform = true) { let abort = false; const r3549 = []; let g2657 = 0; w2653.push(...nodeIds); if (x1881 > -1)
        e2655 = x1881; for (const u1511 of z2670) {
        if (u1511[y1375] == n1059)
            yield figUpdateVariableObjectAsync(u1511);
        else
            yield figUpdateGeometricObjectAsync(u1511, r3549, g2657, j2671, abort, j2669, addProps, transform);
        g2657++;
        if (g2657 >= j2671) {
            const result = yield o2650('returnObjectUpdate', { e2655: e2655, d2656: d2656 });
            abort = result.value;
            g2657 = 0;
            if (abort)
                break;
        }
    } if (j2669 != undefined && j2669 != null && !j2669.removed) {
        for (const u1512 of j2669.children) {
            if (u1512 != undefined && u1512 != null && u1512.removed || !z2670.find(o => o[u1377] == u1512.getPluginData('objectId') && u1512.getPluginData('userId') == figma.currentUser.id))
                u1512.remove();
        }
    } for (const point of w2676) {
        if (point.parent == figCurrentPage)
            yield figCurrentPage.loadAsync();
        if (point != undefined && point != null && !point.removed && !point.parent.removed)
            point.parent.appendChild(point);
    } if (a2673 && !abort) {
        y1508(w2653, h2654);
        w2653 = [];
        h2654 = [];
        if (y270 && r3549.length > 0) {
            figma.viewport.scrollAndZoomIntoView(r3549);
            const bounds = x1532(r3549);
            figma.viewport.zoom = Math.min(figma.viewport.bounds.width * figma.viewport.zoom / bounds.width - 0.05, figma.viewport.bounds.height * figma.viewport.zoom / bounds.height - 0.05);
        }
    } yield o2650('returnObjectUpdate', { e2655: e2655, d2656: d2656 }); });
}
function figUpdateVariableObjectAsync(genVar) {
    return __awaiter(this, void 0, void 0, function* () { const nodeId = genVar[e1376]; const varId = genVar[u1377]; const varName = genVar[j1379]; const varValueCount = genVar[FO_VARIABLE_COUNT]; const varIsAlias = genVar[FO_VARIABLE_IS_ALIAS]; const varValues = []; for (let i = 0; i < varValueCount; i++)
        varValues.push(genVar[FO_VARIABLE_IS_ALIAS + 1 + i]); const s2204 = varName.split('/'); console.assert(s2204.length > 1, 'nameParts must be > 1'); let figVar; let collection; if (varId == NULL) {
        collection = yield figGetVariableCollectionByNameAsync(s2204[0]);
        if (!collection)
            collection = yield figCreateVariableCollectionAsync(s2204[0]);
    }
    else {
        [figVar,] = yield a1601(nodeId, varId);
        collection = yield figma.variables.getVariableCollectionByIdAsync(figVar.variableCollectionId);
    } if (figVar) {
        yield figUpdateVariableAsync(figVar.id, varName, varValues, varIsAlias);
    } });
}
function figUpdateGeometricObjectAsync(u1511, r3549, g2657, j2671, abort, j2669, addProps, transform) {
    return __awaiter(this, void 0, void 0, function* () { h2654.push(u1511); let n2675 = null; let i2674 = NULL; if (u1511[e1376] != i2674) {
        i2674 = u1511[e1376];
        n2675 = l2640.find(a => a.nodeId == u1511[e1376]);
        if (!n2675) {
            l2640.push(n2675 = { nodeId: u1511[e1376], objects: [] });
        }
    } const addObject = u1512 => { if (j2669 != undefined && j2669 != null && !j2669.removed)
        j2669.appendChild(u1512);
    else
        n2675.objects.push(u1512); }; let objects = j2669 != undefined && j2669 != null && !j2669.removed ? j2669.children : n2675.objects; let u1512 = objects.find(o => o.removed || o.getPluginData('userId') == figma.currentUser.id && o.getPluginData('objectId') == u1511[u1377]); if (u1512 != undefined && u1512 != null && u1512.removed) {
        p936(objects, u1512);
        if (w2676.includes(u1512))
            y941(w2676, u1512);
        if (d2692.includes(u1512))
            y941(d2692, u1512);
    } if (u1512 == undefined || u1512 == null || u1512.removed) {
        const newObj = yield y1527(u1511, addObject, addProps, transform);
        r3549.push(newObj);
    }
    else if (u1512 != undefined && u1512 != null && !u1512.removed && u1512.getPluginData('type') == u1511[y1375].toString()) {
        yield z1528(u1512, u1511, addProps, transform);
        if (u1512 != undefined && u1512 != null && !u1512.removed)
            r3549.push(u1512);
    }
    else {
        u1512.remove();
        if (w2676.includes(u1512))
            y941(w2676, u1512);
        if (d2692.includes(u1512))
            y941(d2692, u1512);
        yield y1527(u1511, addObject, addProps, transform);
    } });
}
function c1526(c111) { return (c111[FO_PERSIST] === 2 ? '' : t872) + (i2710 ? c111[u1377] : c111[j1379]); }
function y1527(u1511_1) {
    return __awaiter(this, arguments, void 0, function* (u1511, addObject = null, addProps = true, transform = true) { if (!e1529(u1511))
        return null; let u1512; switch (u1511[y1375]) {
        case x1199:
            u1512 = d2624(u1511, addProps, transform);
            break;
        case n1202:
            u1512 = u2703(u1511, addProps, transform);
            break;
        case y1205:
            u1512 = h2699(u1511, addProps, transform);
            break;
        case z1217:
            u1512 = e2620(u1511, addProps, transform);
            break;
        case m1220:
            u1512 = l2627(u1511, addProps, transform);
            break;
        case d1223:
            u1512 = n2630(u1511, addProps, transform);
            break;
        case y1226:
            u1512 = n2606(u1511);
            break;
        case o1230:
            u1512 = b2658(u1511, addProps, transform);
            break;
        case h1242:
            u1512 = b2659(u1511, addProps, transform);
            break;
        case s1266:
            u1512 = yield w2660(u1511, addProps, transform);
            break;
        case m1245:
            u1512 = yield c2661(u1511);
            break;
        case s1248:
            u1512 = yield a2662(u1511, addProps, transform);
            break;
        case n1059:
            u1512 = yield figCreateVariableAsync(u1511);
            break;
    } if (addObject && u1512 != undefined && u1512 != null && !u1512.removed) {
        u1512.name = c1526(u1511);
        r950(u1511[y1375] == m1245 || !!u1512, 'no Figma object created');
        if (u1512 != undefined && u1512 != null) {
            u1512.setPluginData('retain', u1511[FO_PERSIST].toString());
            if (u1511[FO_PERSIST] < 2) {
                u1512.setPluginData('userId', figma.currentUser.id);
                u1512.setPluginData('sessionId', figma.currentUser.sessionId.toString());
                u1512.setPluginData('type', u1511[y1375]);
                u1512.setPluginData('nodeId', u1511[e1376]);
                u1512.setPluginData('objectId', u1511[u1377]);
                u1512.setPluginData('isCenter', o935(u1511[h1398]));
                if (u1511[y1375] == y1226)
                    w2676.push(u1512);
                if (u1511[x1397])
                    h1542(u1512);
            }
            addObject(u1512);
        }
    } if (!u1511.counted) {
        d2656++;
        u1511.counted = true;
    } return u1512; });
}
function z1528(u1512, u1511, addProps, transform) {
    return __awaiter(this, void 0, void 0, function* () { if (!e1529(u1511) || u1512 == undefined || u1512 == null || u1512.removed)
        return; u1512.name = c1526(u1511); u1512.setPluginData('retain', u1511[FO_PERSIST].toString()); switch (u1511[y1375]) {
        case x1199:
            l2625(u1512, u1511, addProps, transform);
            break;
        case n1202:
            e2704(u1512, u1511, addProps, transform);
            break;
        case y1205:
            n2700(u1512, u1511, addProps, transform);
            break;
        case z1217:
            w2621(u1512, u1511, addProps, transform);
            break;
        case m1220:
            f2628(u1512, u1511, addProps, transform);
            break;
        case d1223:
            t2631(u1512, u1511, addProps, transform);
            break;
        case y1226:
            e2663(u1512, u1511);
            break;
        case o1230:
            a2664(u1512, u1511, addProps, transform);
            break;
        case h1242:
            u2665(u1512, u1511, addProps, transform);
            break;
        case s1266:
            h2666(u1512, u1511, addProps, transform);
            break;
        case m1245:
            w2667(u1512, u1511);
            break;
        case s1248:
            k2668(u1512, u1511, addProps, transform);
            break;
        case n1059:
            yield figUpdateVariableObjectAsync(u1511);
            break;
    } if (u1512 != undefined && u1512 != null && !u1512.removed) {
        if (u1512.parent == figCurrentPage)
            yield figCurrentPage.loadAsync();
        u1512.parent.appendChild(u1512);
        if (u1511[x1397])
            h1542(u1512);
    } if (!u1511.counted) {
        d2656++;
        u1511.counted = true;
    } });
}
function e1529(u1511) { switch (u1511[y1375]) {
    case x1199: return e2623(u1511);
    case n1202: return s2685(u1511);
    case y1205: return a2686(u1511);
    case z1217: return d3908(u1511);
    case m1220: return e2626(u1511);
    case d1223: return f2629(u1511);
    case y1226: return r3907(u1511);
    case o1230: return x2687(u1511);
    case h1242: return n2688(u1511);
    case s1266: return l2689(u1511);
    case m1245: return u2690(u1511);
    case s1248: return l2691(u1511);
} }
function l1530(u1511) {
    return __awaiter(this, void 0, void 0, function* () { (() => __awaiter(this, void 0, void 0, function* () { const u1512 = yield y1527(u1511); const width = u1512.width; const height = u1512.height; u1512.remove(); j1525({ cmd: 'uiForwardToGenerator', msg: { cmd: 'returnFigGetObjectSize', objectId: u1511[u1377], width: width, height: height } }); }))(); });
}
function u1531(u1512) { u1512.setPluginData('type', ''); u1512.setPluginData('nodeId', ''); u1512.setPluginData('userId', ''); u1512.setPluginData('sessionId', ''); u1512.setPluginData('objectId', ''); u1512.setPluginData('isCenter', ''); u1512.setPluginData('retain', ''); }
function x1532(objects) { const bounds = { left: 0, top: 0, right: 0, bottom: 0 }; for (const c111 of objects) {
    if (c111.x < bounds.left || bounds.left == bounds.right)
        bounds.left = c111.x;
    if (c111.y < bounds.top || bounds.top == bounds.bottom)
        bounds.top = c111.y;
    if (c111.x + c111.width > bounds.right || bounds.left == bounds.right)
        bounds.right = c111.x + c111.width;
    if (c111.y + c111.height > bounds.bottom || bounds.top == bounds.bottom)
        bounds.bottom = c111.y + c111.height;
} return { x: bounds.left, y: bounds.top, width: bounds.right - bounds.left, height: bounds.bottom - bounds.top }; }
function figExport(objectIds, scale, format, suffix) {
    return __awaiter(this, void 0, void 0, function* () { yield figCurrentPage.loadAsync(); for (const objId of objectIds) {
        let u1512 = figCurrentPage.children.find(o => !o.removed && o.getPluginData('userId') == figma.currentUser.id && o.getPluginData('objectId') == objId);
        if (!u1512)
            continue;
        const settings = { constraint: { type: 'SCALE', value: scale }, format: format == 0 ? 'PNG' : 'JPG', suffix: suffix };
        yield u1512.exportAsync(settings);
    } });
}
const d2692 = [];
const m2693 = [];
function m1533(r1534, n1535) { const effects = []; for (const effect of r1534) {
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
                if (n1535 && !isNaN(spread))
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
function a2613(u1512, u1511, phantom = true) { h1538(u1512, u1511); h2614(u1512, u1511, phantom); s2615(u1512, u1511); u1512.opacity = u1511[h1399]; u1512.blendMode = u1511[p1400]; const maskType = u1511[r1401]; u1512.isMask = maskType > 0; if (u1512.isMask) {
    switch (maskType) {
        case 1:
            u1512.maskType = 'ALPHA';
            break;
        case 2:
            u1512.maskType = 'VECTOR';
            break;
        case 3:
            u1512.maskType = 'LUMINANCE';
            break;
    }
} if (u1512.isMask && u1512.fills.length == 0 && u1512.strokes.length == 0)
    u1512.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 }, opacity: 1, blendMode: 'NORMAL' }]; }
function s2615(u1512, u1511) { if (!!u1511[p1388] && !isEmpty(u1511[p1388])) {
    u1512.fills = u954(u1511[p1388]);
    if (d2692.includes(u1512))
        y941(d2692, u1512);
}
else
    u1512.fills = []; }
function h2614(u1512, u1511, phantom = true) { if (u1511[w1389] != null && !isEmpty(u1511[w1389])) {
    e1537(u1512, u954(u1511[w1389]), u1511[y1390], u1511[e1391], u1511[b1392], u1511[l1393], u1511[i1394], o2616(u1511[c1395]));
    if (u1511[x1397])
        u1512.setPluginData('dashes', u1511[c1395]);
    if (d2692.includes(u1512))
        y941(d2692, u1512);
    if (u1511[x1397])
        v947(m2693, u1512);
}
else if (isEmpty(u1511[p1388]) && isEmpty(u1511[w1389]) && !u1511[r1401] && phantom) {
    p1540(u1512);
    v947(d2692, u1512);
}
else
    u1512.strokes = []; }
function o2616(p1536) { p1536 = p1536; p1536 = k952(p1536, ','); p1536 = z953(p1536, ','); p1536 = p1536.trim(); return p1536 == '' ? [] : p1536.split(',').map(s => Math.max(0, parseFloat(s))); }
function a2617(p1536) { p1536 = p1536; p1536 = k952(p1536, ','); p1536 = z953(p1536, ','); p1536 = p1536.trim(); return p1536 == '' ? [] : p1536.split(',').map(s => Math.max(0, parseFloat(s) / t2619)); }
function e1537(u1512, fills, weight, align, join, miterLimit, cap, dashes = []) { u1512.strokes = fills; u1512.strokeWeight = Math.max(0, weight); u1512.strokeAlign = align; u1512.strokeJoin = join; const miterAngle = miterLimit / 360 * Tau; const l2694 = 1 / Math.sin(miterAngle / 2); u1512.strokeMiterLimit = Math.min(Math.max(0, l2694), 16); u1512.strokeCap = cap; u1512.dashPattern = dashes; }
function h1538(u1512, u1511) { if (!!u1511[m1396] && !isEmpty(u1511[m1396])) {
    const n1535 = u1511[y1375] == x1199 || u1511[y1375] == y1205 || u1511[y1375] == s1248;
    u1512.effects = m1533(u1511[m1396], n1535);
}
else
    u1512.effects = []; }
function q1539() { for (const c111 of d2692) {
    if (c111.removed)
        y941(d2692, c111);
    else
        p1540(c111);
} }
function p1540(c111) { figCurrentPage.loadAsync().then(() => { const back = figCurrentPage.backgrounds.find(b => b.type == 'SOLID'); let phantomColor; if (back) {
    const l = back.color.r * 0.2126 + back.color.g * 0.7152 + back.color.b * 0.0722;
    phantomColor = l > 0.5 ? { r: 0, g: 0, b: 0 } : { r: 1, g: 1, b: 1 };
}
else
    phantomColor = { r: 1, g: 0, b: 1 }; e1537(c111, [{ type: 'SOLID', color: phantomColor, opacity: 0.5 }], 1 / t2619, 'CENTER', 'MITER', 1, 'NONE', [1 / t2619, 2 / t2619]); }); }
function k1541() { for (const u1512 of m2693) {
    if (u1512.removed)
        y941(m2693, u1512);
    else
        h1542(u1512);
} }
function h1542(u1512) { u1512.strokeWeight = Math.max(0, 1.5 / t2619); if (d921(u1512.getPluginData('isCenter'))) {
    const path = u1512.vectorPaths[0];
    const parts = path.data.split(' ');
    let t = { x: parseFloat(parts[1]), y: parseFloat(parts[2]) };
    let c = { x: parseFloat(parts[4]), y: parseFloat(parts[5]) };
    let r = { x: parseFloat(parts[7]), y: parseFloat(parts[8]) };
    const a = 2;
    const b = 0.05;
    const f = 1 - Math.pow(1 - Math.min(t2619, 1), a) / Math.pow(a, b);
    t = y893(c, y895(i884(j898(t, c)), objectCenterSize / f));
    r = y893(c, y895(i884(j898(r, c)), objectCenterSize / f));
    parts[1] = t.x;
    parts[2] = t.y;
    parts[4] = c.x;
    parts[5] = c.y;
    parts[7] = r.x;
    parts[8] = r.y;
    const i2695 = { windingRule: path.windingRule, data: parts.join(' ') };
    u1512.vectorPaths = [i2695];
} const dashes = u1512.getPluginData('dashes'); if (dashes != '')
    u1512.dashPattern = a2617(dashes); }
function k1576(nodeId, px, py) { figma.getLocalPaintStylesAsync().then(_styles => { const styles = new Array(); for (const t168 of _styles) {
    const _nodeId = t168.getPluginData('nodeId');
    const _existing = t168.getPluginData('existing');
    const existing = !!_existing;
    const style = { id: t168.id, nodeId: _nodeId, name: t168.name, existing: existing, paints: new Array() };
    let onlyPaint = true;
    for (const w2697 of t168.paints) {
        if (w2697.type == 'SOLID') {
            style.paints.push([w2697.color.r, w2697.color.g, w2697.color.b, w2697.opacity]);
        }
        else {
            onlyPaint = false;
            break;
        }
    }
    if (onlyPaint)
        styles.push(style);
} j1525({ cmd: 'uiReturnFigGetAllLocalColorStyles', nodeId: nodeId, px: px, py: py, styles: JSON.stringify(styles) }); }); }
function h1577(nodeId, styleId) { figma.getLocalPaintStylesAsync().then(b1579 => { if (styleId != NULL)
    h1578(b1579, nodeId, styleId);
else
    a1580(b1579, nodeId); }); }
function h1578(b1579, nodeId, styleId, clearExisting = true) { const q2696 = a2642.find(a => a.nodeId == nodeId); if (q2696 && clearExisting)
    a1580(b1579, nodeId); const u1584 = b1579.find(s => s.id == styleId); r950(!!u1584, 'figStyle should be found here'); u1584.setPluginData('type', x1196); u1584.setPluginData('nodeId', nodeId); u1584.setPluginData('existing', o935(true)); a2642.push({ nodeId: nodeId, existing: true, styles: [u1584] }); return u1584; }
function a1580(b1579, nodeId) { const u1584 = b1579.find(s => s.getPluginData('nodeId') == nodeId); r950(!!u1584, 'figStyle should be found here'); if (u1584) {
    u1584.setPluginData('type', NULL);
    u1584.setPluginData('nodeId', NULL);
    u1584.setPluginData('existing', NULL);
    p943(a2642, a => a.nodeId == nodeId);
} return u1584; }
function s1581(styles, e1585) { const u1584 = figma.createPaintStyle(); u1584.setPluginData('type', e1585[y1375]); u1584.setPluginData('nodeId', e1585[e1376]); u1584.name = e1585[p1380]; setStylePaints(u1584, e1585); styles.push(u1584); j1525({ cmd: 'uiSetStyleId', nodeId: e1585[e1376], styleId: u1584.id }); return u1584; }
function r1582(msg) { let i2674 = NULL; let q2696; for (const e1585 of msg.styles) {
    if (e1585[e1376] != i2674) {
        i2674 = e1585[e1376];
        q2696 = a2642.find(a => a.nodeId == e1585[e1376]);
        if (!q2696) {
            q2696 = { nodeId: e1585[e1376], styles: [] };
            a2642.push(q2696);
        }
    }
    else
        q2696 = null;
    const u1584 = q2696.styles[0];
    figma.getLocalPaintStylesAsync().then(b1579 => { const localStyle = b1579.find(s => s.getPluginData('nodeId') == e1585[e1376]); if (isValid(u1584) && !isValid(localStyle)) {
        p936(q2696.styles, u1584);
    } const existing = isValid(u1584) && isValid(localStyle) && u1584.getPluginData('existing'); if (!isValid(u1584) || !isValid(localStyle)) {
        if (!existing) {
            t1515 = true;
            h1577(e1585[e1376], e1585[m1378]);
        }
    }
    else if (isValid(u1584) && u1584.getPluginData('type') == e1585[y1375]) {
        t1515 = true;
        f1583(localStyle, e1585);
    } });
} }
function f1583(u1584, e1585) { setStylePaints(u1584, e1585); u1584.name = e1585[p1380]; }
function getStylePaints(stylePaints) { const paints = new Array(); for (const w2697 of stylePaints) {
    const fill = w2697[1].split(' ');
    switch (w2697[0]) {
        case 'SOLID':
            paints.push({ type: 'SOLID', color: { r: Math.min(Math.max(0, parseFloat(fill[0]) / 0xff), 1), g: Math.min(Math.max(0, parseFloat(fill[1]) / 0xff), 1), b: Math.min(Math.max(0, parseFloat(fill[2]) / 0xff), 1) }, opacity: Math.min(Math.max(0, parseFloat(fill[3]) / 100), 1) });
            break;
    }
} return paints; }
function setStylePaints(u1584, e1585) { if (!isEmpty(e1585[k1382]))
    u1584.paints = getStylePaints(e1585[k1382]);
else
    u1584.paints = []; }
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
function w1599(nodeId, px, py) { figma.variables.getLocalVariablesAsync().then((c2698) => __awaiter(this, void 0, void 0, function* () { const variables = new Array(); for (const _var of c2698) {
    try {
        const collection = yield figma.variables.getVariableCollectionByIdAsync(_var.variableCollectionId);
        const [, resolvedValues] = yield figGetResolvedVariableValuesAsync(_var);
        const [aliasIds, aliasNames] = yield figGetVariableAliasIdsAsync(_var);
        const variable = { id: _var.id, resolvedType: _var.resolvedType, name: collection.name + '/' + _var.name, resolvedValues: resolvedValues, aliasIds: aliasIds, aliasNames: aliasNames };
        variables.push(variable);
    }
    catch (ex) { }
} figma.variables.getLocalVariableCollectionsAsync().then((collections) => __awaiter(this, void 0, void 0, function* () { j1525({ cmd: 'uiReturnFigGetAllLocalVariables', nodeId: nodeId, px: px, py: py, variables: JSON.stringify(variables), nCollections: collections.length }); })); })); }
function p1600(varIds) {
    return __awaiter(this, void 0, void 0, function* () { const c2698 = yield figma.variables.getLocalVariablesAsync(); const varsFromIds = varIds.map(id => c2698.find(v => v.id == id)); let variables = []; for (let i = 0; i < varIds.length; i++) {
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
function figUpdateVariableAsync(varId, l3167, newValues, isAlias) {
    return __awaiter(this, void 0, void 0, function* () { let variable = yield figma.variables.getVariableByIdAsync(varId); if (!variable)
        return; const collection = yield figma.variables.getVariableCollectionByIdAsync(variable.variableCollectionId); const newCollectionName = l3167.split('/')[0]; if (collection.name != newCollectionName) {
        let newCollection = yield figGetVariableCollectionByNameAsync(newCollectionName);
        if (!newCollection)
            newCollection = yield figCreateVariableCollectionAsync(newCollectionName);
        variable = yield figMoveVariableToCollectionAsync(variable, newCollection);
    } const newVarName = l3167.split('/').slice(1).join('/'); if (variable.name != newVarName)
        variable.name = newVarName; for (let i = 0; i < newValues.length; i++) {
        let r3498 = newValues[i];
        if (r3498 !== null && isAlias[i] === false) {
            try {
                if (variable.resolvedType == 'BOOLEAN')
                    r3498 = r3498 > 0;
                variable.setValueForMode(collection.modes[i].modeId, r3498);
            }
            catch (ex) { }
        }
    } });
}
function figGetVariableByNameAsync(name_1) {
    return __awaiter(this, arguments, void 0, function* (name, collectionId = '') { const c2698 = yield figma.variables.getLocalVariablesAsync(); return collectionId != '' ? c2698.find(v => v.name == name && v.variableCollectionId == collectionId) : c2698.find(v => v.name == name); });
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
        e1596('Variable names must be unique within a collection', '');
        return oldVariable;
    } const oldCollection = yield figGetVariableCollectionByIdAsync(oldVariable.variableCollectionId); for (const oldMode of oldCollection.modes) {
        let newMode = newCollection.modes.find(m => m.name == oldMode.name);
        if (!newMode)
            newCollection.addMode(oldMode.name);
    } const newVariable = figma.variables.createVariable(oldVariable.name, newCollection, oldVariable.resolvedType); for (const newMode of newCollection.modes) {
        const oldMode = oldCollection.modes.find(m => m.name == newMode.name);
        const value = oldVariable.valuesByMode[oldMode.modeId];
        newVariable.setValueForMode(newMode.modeId, value);
    } figRelinkObjectVariables(oldVariable, newVariable); j1525({ cmd: 'uiReturnFigRelinkVariable', oldVariableId: oldVariable.id, newVariableId: newVariable.id }); oldVariable.remove(); return newVariable; });
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
function a1601(nodeId, varId) {
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
function g1506(f1507 = false) { if (tempVariableCollection)
    tempVariableCollection.remove(); }
function j1586(tl, tr, bl) { let vr = point(tr.x - tl.x, tr.y - tl.y); let vb = point(bl.x - tl.x, bl.y - tl.y); let sx = vr.x; let sy = vb.y; let kx = -vr.y; let ky = -vb.x; let dx = -tl.x; let dy = -tl.y; const _sx = kx / nozero(sx); const _sy = ky / nozero(sy); let u4087 = g887([[1, _sy, 0], [_sx, 1, 0], [0, 0, 1]], v891(dx, dy)); u4087 = g889(u4087); const a = n881(vr); if (a > Tau / 4 && a < Tau * 3 / 4)
    u4087 = g887(u4087, v891(0, 0, 1, 1, Tau / 2)); if (determinant(u4087) < 0)
    u4087 = g887(u4087, v891(0, 0, -1, 1, 0)); return u4087; }
function c1587(u1512, tl, tr, bl) { const u4087 = j1586(tl, tr, bl); u1512.relativeTransform = [u4087[0], u4087[1]]; }
function i1588(u1512, u1511, setSize = true, noHeight = 0.01) { if (!u1511[i1384] || !u1511[j1385] || !u1511[s1386])
    return; const xp0 = u1511[i1384]; const xp1 = u1511[j1385]; const xp2 = u1511[s1386]; c1587(u1512, xp0, xp1, xp2); if (setSize) {
    const scaleX = distv(xp0, xp1);
    const scaleY = distv(xp0, xp2);
    const height = u1511[y1375] == d1223 ? u1511[c1419] : u1511[n1406];
    if (!u1512.removed) {
        u1512.resizeWithoutConstraints(Math.max(0.01, scaleX), height ? Math.max(0.01, scaleY) : noHeight);
    }
} }
function v1589(b2611, r2612) { if (b2611.removed)
    return; b2611.resizeWithoutConstraints(0.01, 0.01); b2611.setPluginData('actualX', r2612[a1402].toString()); b2611.setPluginData('actualY', r2612[j1404].toString()); b2611.x = r2612[a1402]; b2611.y = r2612[j1404]; b2611.rotation = r2612[h1398] ? 45 : 0; }
function j1590(b2611) { if (!b2611.removed)
    b2611.resizeWithoutConstraints(0.01, 0.01); }
function l2689(genBool) { return true; }
function w2660(genBool, addProps, transform) {
    return __awaiter(this, void 0, void 0, function* () { let objects = []; for (const c111 of genBool[f1433])
        yield y1527(c111, o => objects = [...objects, o], false); yield figCurrentPage.loadAsync(); let figBool = null; if (!isEmpty(objects)) {
        switch (genBool[u1434]) {
            case 0:
                figBool = figma.union(objects, figCurrentPage);
                break;
            case 1:
                figBool = figma.subtract(objects, figCurrentPage);
                break;
            case 2:
                figBool = figma.intersect(objects, figCurrentPage);
                break;
            case 3:
                figBool = figma.exclude(objects, figCurrentPage);
                break;
        }
    } if (figBool) {
        figBool.expanded = false;
        h2666(figBool, genBool, addProps, transform);
    } return figBool; });
}
function h2666(figBool, genBool, addProps, transform) {
    return __awaiter(this, void 0, void 0, function* () { if (genBool[f1433].length == 0) {
        figBool.remove();
        return;
    } yield c2643(figBool, genBool[f1433], genBool[f1433].length, -1, [], false, false, false, false, true); const hasProps = genBool[p1388].length > 0 || genBool[w1389].length > 0 || genBool[m1396].length > 0; a2613(figBool, genBool, !hasProps && addProps); });
}
function a2686(r2677) { return r2677[a1402] != null && !isNaN(r2677[a1402]) && r2677[j1404] != null && !isNaN(r2677[j1404]) && r2677[n1405] != null && !isNaN(r2677[n1405]) && r2677[n1406] != null && !isNaN(r2677[n1406]) && r2677[j1408] != null && !isNaN(r2677[j1408]) && r2677[e1415] != null && !isNaN(r2677[e1415]) && r2677[a1421] != null && !isNaN(r2677[a1421]) && r2677[g1425] != null && !isNaN(r2677[g1425]); }
function h2699(r2677, addProps, transform) { if (!a2686(r2677))
    return null; const c2678 = figma.createEllipse(); n2700(c2678, r2677, addProps, transform, true); return c2678; }
function n2700(c2678, r2677, addProps, transform, isValid = false) { if (!isValid && !a2686(r2677))
    return; g2701(c2678, r2677, transform); if (w2676.includes(c2678))
    j2608(c2678);
else
    a2613(c2678, r2677, addProps); }
function g2701(c2678, r2677, transform) { c2678.cornerRadius = r2677[j1408]; const start = r2677[e1415] / 360 * (Math.PI * 2); const sweep = r2677[a1421] / 100 * (Math.PI * 2); c2678.arcData = { startingAngle: start, endingAngle: start + sweep, innerRadius: Math.min(Math.max(0, r2677[g1425] / 100), 1) }; if (transform)
    i1588(c2678, r2677); }
function l2691(j2679) { return j2679[a1402] != null && !isNaN(j2679[a1402]) && j2679[j1404] != null && !isNaN(j2679[j1404]) && j2679[n1405] != null && !isNaN(j2679[n1405]) && j2679[n1406] != null && !isNaN(j2679[n1406]) && j2679[s1414] != null && !isNaN(j2679[s1414]) && j2679[y1435] != null && !isNaN(j2679[y1435]); }
function a2662(j2679, addProps, transform) {
    return __awaiter(this, void 0, void 0, function* () { if (!l2691(j2679))
        return null; const i2680 = figma.createFrame(); if (i2680) {
        i2680.expanded = false;
        r2702(i2680, j2679, addProps, transform);
        let objects = [];
        for (const c111 of j2679[m1420])
            yield y1527(c111, o => objects = [...objects, o]);
        for (const c111 of objects)
            i2680.appendChild(c111);
    } return i2680; });
}
function k2668(i2680, j2679, addProps, transform) { r2702(i2680, j2679, addProps, transform); c2643(i2680, j2679[m1420], j2679[m1420].length); }
function r2702(i2680, j2679, addProps, transform) { i2680.cornerRadius = j2679[s1414]; i2680.clipsContent = j2679[y1435] > 0; if (transform)
    i1588(i2680, j2679); a2613(i2680, j2679, addProps && j2679[m1420].length == 0); figUpdateStrokeSides(i2680, j2679); }
function u2690(c2681) { return true; }
function c2661(c2681) {
    return __awaiter(this, void 0, void 0, function* () { let objects = []; for (const c111 of c2681[y1403])
        yield y1527(c111, o => objects = [...objects, o]); yield figCurrentPage.loadAsync(); const g2682 = !isEmpty(objects) ? figma.group(objects, figCurrentPage) : null; if (g2682) {
        g2682.expanded = false;
        w2667(g2682, c2681);
    } return g2682; });
}
function w2667(g2682, c2681) { if (c2681[y1403].length == 0) {
    g2682.remove();
    return;
} c2643(g2682, c2681[y1403], c2681[y1403].length); h1538(g2682, c2681); }
function s2685(b2683) { return b2683[a1402] != null && !isNaN(b2683[a1402]) && b2683[j1404] != null && !isNaN(b2683[j1404]) && b2683[n1405] != null && !isNaN(b2683[n1405]); }
function u2703(b2683, addProps, transform) { if (!s2685(b2683))
    return null; const r2684 = figma.createLine(); e2704(r2684, b2683, addProps, transform, true); return r2684; }
function e2704(r2684, b2683, addProps, transform, isValid = false) { if (!isValid && !s2685(b2683))
    return; if (transform)
    i1588(r2684, b2683, true, 0); a2613(r2684, b2683, addProps); }
var w2676 = [];
function r3907(r2612) { return r2612[a1402] != null && !isNaN(r2612[a1402]) && r2612[j1404] != null && !isNaN(r2612[j1404]); }
function n2606(r2612) { const b2611 = r2612[h1398] ? figma.createRectangle() : figma.createEllipse(); if (!r3907(r2612))
    return b2611; if (w2676.includes(b2611))
    n2610(b2611, r2612);
else
    e2663(b2611, r2612); return b2611; }
function e2663(b2611, r2612) { v1589(b2611, r2612); o2609(b2611); }
function f2607() { j1525({ cmd: 'uiUpdateZoom', zoom: figma.viewport.zoom }); for (const point of w2676)
    j2608(point); }
function j2608(b2611) { j1590(b2611); o2609(b2611); }
function n2610(b2611, r2612) { v1589(b2611, r2612); o2609(b2611); }
function o2609(b2611) { if (b2611.removed)
    return; figCurrentPage.loadAsync().then(() => { const isCenter = d921(b2611.getPluginData('isCenter')); const j2618 = figCurrentPage.selection.includes(b2611); const color = isCenter ? [0xf2, 0x48, 0x22] : j2618 ? [12, 140, 233] : [255, 255, 255]; const border = isCenter ? [255, 255, 255] : j2618 ? [255, 255, 255] : [12, 140, 233]; b2611.fills = u954([['SOLID', color[0], color[1], color[2], 100]]); const effects = []; effects.push(...m1533([['DROP_SHADOW', border[0] / 255, border[1] / 255, border[2] / 255, 1, 0, 0, 0, (isCenter ? 3 : j2618 ? 5 : 3.6) / t2619, 'NORMAL', true, true]], true)); effects.push(...m1533([['DROP_SHADOW', color[0] / 255, color[1] / 255, color[2] / 255, 1, 0, 0, 0, (j2618 ? 4 : 2.4) / t2619, 'NORMAL', true, true]], true)); b2611.effects = effects; }); }
function d3908(genPoly) { return genPoly[a1402] != null && !isNaN(genPoly[a1402]) && genPoly[j1404] != null && !isNaN(genPoly[j1404]) && genPoly[n1405] != null && !isNaN(genPoly[n1405]) && genPoly[n1406] != null && !isNaN(genPoly[n1406]) && genPoly[l1411] != null && !isNaN(genPoly[l1411]) && genPoly[w1417] != null && !isNaN(genPoly[w1417]); }
function e2620(genPoly, addProps, transform) { if (!d3908(genPoly))
    return null; const figPoly = figma.createPolygon(); w2621(figPoly, genPoly, addProps, transform, true); return figPoly; }
function w2621(figPoly, genPoly, addProps, transform, isValid = false) { if (!isValid && !d3908(genPoly))
    return; figPoly.cornerRadius = genPoly[l1411]; figPoly.pointCount = Math.max(3, genPoly[w1417]); if (transform)
    i1588(figPoly, genPoly); a2613(figPoly, genPoly, addProps); }
function e2623(u2622) { return u2622[a1402] != null && !isNaN(u2622[a1402]) && u2622[j1404] != null && !isNaN(u2622[j1404]) && u2622[n1405] != null && !isNaN(u2622[n1405]) && u2622[n1406] != null && !isNaN(u2622[n1406]) && u2622[v1407] != null && !isNaN(u2622[v1407]); }
function d2624(u2622, addProps, transform) { if (!e2623(u2622))
    return null; const figRect = figma.createRectangle(); l2625(figRect, u2622, addProps, transform, true); return figRect; }
function l2625(figRect, u2622, addProps, transform, isValid = false) { if (!isValid && !e2623(u2622))
    return; const foundCorners = u2622[m1396].findIndex(e => e[0] == 'ROUND_CORNERS'); if (foundCorners > -1) {
    const corners = u2622[m1396][foundCorners];
    figRect.topLeftRadius = corners[1];
    figRect.topRightRadius = corners[2];
    figRect.bottomLeftRadius = corners[3];
    figRect.bottomRightRadius = corners[4];
}
else
    figRect.cornerRadius = u2622[v1407]; if (transform)
    i1588(figRect, u2622); a2613(figRect, u2622, addProps); figUpdateStrokeSides(figRect, u2622); }
function figUpdateStrokeSides(u1512, u1511) { const foundSides = u1511[m1396].findIndex(e => e[0] == 'STROKE_SIDES'); if (foundSides < 0)
    return; const sides = u1511[m1396][foundSides]; u1512.strokeWeight = 0; u1512.strokeTopWeight = sides[1]; u1512.strokeLeftWeight = sides[2]; u1512.strokeRightWeight = sides[3]; u1512.strokeBottomWeight = sides[4]; }
function e2626(s2636) { return s2636[a1402] != null && !isNaN(s2636[a1402]) && s2636[j1404] != null && !isNaN(s2636[j1404]) && s2636[n1405] != null && !isNaN(s2636[n1405]) && s2636[n1406] != null && !isNaN(s2636[n1406]) && s2636[y1412] != null && !isNaN(s2636[y1412]) && s2636[g1418] != null && !isNaN(s2636[g1418]) && s2636[o1423] != null && !isNaN(s2636[o1423]); }
function l2627(s2636, addProps, transform) { if (!e2626(s2636))
    return null; const e2637 = figma.createStar(); f2628(e2637, s2636, addProps, transform, true); return e2637; }
function f2628(e2637, s2636, addProps, transform, isValid = false) { if (!isValid && !e2626(s2636))
    return; e2637.cornerRadius = s2636[y1412]; e2637.pointCount = s2636[g1418]; e2637.innerRadius = Math.min(Math.max(0, s2636[o1423] / 100), 1); if (transform)
    i1588(e2637, s2636); a2613(e2637, s2636, addProps); }
const b4148 = [];
function f2629(u2633) { return u2633[u1424] != null && u2633[a1402] != null && !isNaN(u2633[a1402]) && u2633[j1404] != null && !isNaN(u2633[j1404]) && u2633[n1405] != null && !isNaN(u2633[n1405]) && u2633[n1406] != null && !isNaN(u2633[n1406]) && u2633[f1426] != null && u2633[f1426] != NULL && u2633[u1427] != null && !isNaN(u2633[u1427]); }
function n2630(u2633, addProps, transform) { if (!f2629(u2633))
    return null; const e2705 = figma.createText(); t2631(e2705, u2633, addProps, transform, true); return e2705; }
function t2631(e2705, u2633, addProps, transform, isValid = false) { if (!isValid && !f2629(u2633))
    return null; const fontName = { family: u2633[f1426], style: u2633[b1428] }; try {
    if (!b4148.includes(fontName)) {
        figma.loadFontAsync(fontName).then(() => { b4148.push(fontName); u2632(e2705, u2633, fontName, addProps, transform); });
    }
    else {
        u2632(e2705, u2633, fontName, addProps, transform);
    }
}
catch (e) {
    s951(e);
} }
function u2632(e2705, u2633, fontName, addProps, transform) { e2705.fontName = fontName; e2705.fontSize = Math.max(1, u2633[u1427]); e2705.characters = u2633[u1424]; e2705.lineHeight = { unit: 'PERCENT', value: u2633[h1431] }; e2705.letterSpacing = { unit: 'PERCENT', value: u2633[m1432] }; if (u2633[q1429] == 0)
    e2705.textAlignHorizontal = 'LEFT';
else if (u2633[q1429] == 1)
    e2705.textAlignHorizontal = 'CENTER';
else if (u2633[q1429] == 2)
    e2705.textAlignHorizontal = 'RIGHT';
else if (u2633[q1429] == 3)
    e2705.textAlignHorizontal = 'JUSTIFIED'; if (u2633[m1430] == 0)
    e2705.textAlignVertical = 'TOP';
else if (u2633[m1430] == 1)
    e2705.textAlignVertical = 'CENTER';
else if (u2633[m1430] == 2)
    e2705.textAlignVertical = 'BOTTOM'; if (transform)
    i1588(e2705, u2633); a2613(e2705, u2633, addProps); if (u2633[k1413] == 0 && u2633[c1419] == 0)
    e2705.textAutoResize = 'WIDTH_AND_HEIGHT';
else if (u2633[k1413] == 0)
    e2705.textAutoResize = 'HEIGHT';
else
    e2705.textAutoResize = 'NONE'; }
function n2688(n2638) { return true; }
function b2659(n2638, addProps, transform) { if (!n2688(n2638))
    return null; const i2639 = figma.createVector(); u2665(i2639, n2638, addProps, transform, true); return i2639; }
function u2665(i2639, n2638, addProps, transform, isValid = false) { if (!isValid && !n2688(n2638))
    return; i2639.setVectorNetworkAsync(n2638[n1409]); if (transform)
    i1588(i2639, n2638, false); a2613(i2639, n2638, addProps); }
function x2687(q2634) { return q2634[w1416] != null && !isNaN(q2634[w1416]) && q2634[z1422] != null && !isNaN(q2634[z1422]); }
function b2658(q2634, addProps, transform) { const x2635 = figma.createVector(); a2664(x2635, q2634, addProps, transform, true); return x2635; }
function a2664(x2635, q2634, addProps, transform, isValid = false) { if (!isValid && !x2687(q2634))
    return; x2635.vectorPaths = [{ windingRule: q2634[w1416] == 1 ? 'NONZERO' : 'EVENODD', data: q2634[z1410] }]; x2635.cornerRadius = Number(q2634[z1422]); if (transform)
    i1588(x2635, q2634, false); a2613(x2635, q2634, addProps); }
