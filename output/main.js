var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function c1052(key, tag) { return key.substring(0, tag.length + 1) == tag + ' '; }
function b1053(key, tag) { return key.substring(tag.length + 1); }
function f1054(key) { return c1052(key, j876); }
function p1055(key) { return c1052(key, d874); }
function n1056(key) { return c1052(key, j875); }
function w1057(key) { return b1053(key, j876); }
function z1058(key) { return b1053(key, d874); }
function m1059(key) { return b1053(key, j875); }
const generatorVersion = 414;
const m868 = 2147483647;
const NULL = '';
const j869 = '  ';
const t870 = '    ';
const p871 = '\n';
const w872 = '◦ G •';
const x873 = w872 + ' ';
const d874 = 'G_NODE';
const j875 = 'G_CONN';
const j876 = 'G_PAGE';
const r877 = 'G_TEMP';
const minWindowWidth = 602;
const minWindowHeight = 39;
const identity = Object.freeze([[1, 0, 0], [0, 1, 0], [0, 0, 1]]);
const Epsilon = 0.0000001;
const Tau = Math.PI * 2;
var enableAsserts = false;
function m878(x, eps = 0.000000001) { return Math.abs(x) < eps ? 0 : x; }
function nozero(x, eps = 0.000000001) { return x != 0 ? x : (x < 0 ? -eps : eps); }
function n879(v, eps = 0.000000001) { return point(nozero(v.x, eps), nozero(v.y, eps)); }
function equal(a, b, eps = 0.000000001) { return Math.abs(b - a) < eps; }
function sqr(x) { return x * x; }
;
function cube(x) { return x * x * x; }
;
function q880(f) { return Math.floor(f) | 0; }
function f881(x) { x = q880(x); x--; x |= x >> 1; x |= x >> 2; x |= x >> 4; x |= x >> 8; x |= x >> 16; x |= x >> 32; return ++x; }
function gcd(a, b) { let temp; while (1) {
    temp = a % b;
    if (temp == 0)
        return b;
    a = b;
    b = temp;
} }
function distv(p1, p2) { const dx = p2.x - p1.x; const dy = p2.y - p1.y; return Math.sqrt(dx * dx + dy * dy); }
function h882(v) { let angle = Math.atan2(v.y, v.x); if (angle < 0)
    angle += Tau; return angle; }
function anglev2(v1, v2) { return anglev2_(v1.x, v1.y, v2.x, v2.y); }
function anglev2_(x1, y1, x2, y2) { const dx = x2 - x1; const dy = y2 - y1; let angle = Math.atan2(dy, dx); if (angle < 0)
    angle += Tau; return angle; }
function z884(v) { return Math.sqrt(v.x * v.x + v.y * v.y); }
function lengthv_(x, y) { return Math.sqrt(x * x + y * y); }
function y885(v) { return point(v.x == 0 ? 0 : v.x / z884(v), v.y == 0 ? 0 : v.y / z884(v)); }
function dotv(v1, v2) { return v1.x * v2.x + v1.y * v2.y; }
function c886(a1, a2) { let diff = a2 - a1; while (diff <= -Tau / 2)
    diff += Tau; while (diff > Tau / 2)
    diff -= Tau; return diff; }
function i887(v, m) { let v3 = [v.x, v.y, 1]; let r = c951(v3, m); return point(r[0], r[1]); }
function f888(...mm) { u955(mm.length > 0, 'mulm3m3() must take at least one argument'); let result = clone(mm[0]); for (let a = 1; a < mm.length; a++) {
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
function d889(m, s) { for (let i = 0; i < 3; i++)
    for (let j = 0; j < 3; j++)
        m[i][j] /= s; return m; }
function adjugate(m) { return cofactor(transpose(m)); }
function transpose(m) { return [[m[0][0], m[1][0], m[2][0]], [m[0][1], m[1][1], m[2][1]], [m[0][2], m[1][2], m[2][2]]]; }
function cofactor(m) { return [[m[1][1] * m[2][2] - m[2][1] * m[1][2], -(m[1][0] * m[2][2] - m[2][0] * m[1][2]), m[1][0] * m[2][1] - m[2][0] * m[1][1]], [-(m[0][1] * m[2][2] - m[2][1] * m[0][2]), m[0][0] * m[2][2] - m[2][0] * m[0][2], -(m[0][0] * m[2][1] - m[2][0] * m[0][1])], [m[0][1] * m[1][2] - m[1][1] * m[0][2], -(m[0][0] * m[1][2] - m[1][0] * m[0][2]), m[0][0] * m[1][1] - m[1][0] * m[0][1]]]; }
function determinant(m) { return m[0][0] * (m[1][1] * m[2][2] - m[1][2] * m[2][1]) - m[0][1] * (m[1][0] * m[2][2] - m[2][0] * m[1][2]) + m[0][2] * (m[1][0] * m[2][1] - m[2][0] * m[1][1]); }
function y890(m) { return d889(adjugate(m), determinant(m)); }
function y891(angle) { const cosA = m878(Math.cos(angle)); const sinA = m878(Math.sin(angle)); return [[cosA, sinA, 0], [-sinA, cosA, 0], [0, 0, 1]]; }
function u892(x = 0, y = 0, e893 = 1, m894 = 1, angle = 0, b895 = 0, i896 = 0) { const cosA = Math.cos(angle); const sinA = Math.sin(angle); return [[e893 * cosA - i896 * sinA, -b895 * cosA + m894 * sinA, x], [i896 * cosA + e893 * sinA, m894 * cosA + b895 * sinA, y], [0, 0, 1]]; }
function q897(v1, v2) { return v1.x * v2.y - v1.y * v2.x; }
function b898(v1, v2) { return point(v1.x + v2.x, v1.y + v2.y); }
function sqrv(v) { return u899(v, v); }
function u899(v1, v2) { return point(v1.x * v2.x, v1.y * v2.y); }
function i900(v, s) { return point(v.x * s, v.y * s); }
function c901(v1, v2) { return point(v1.x / v2.x, v1.y / v2.y); }
function r902(v, s) { return point(v.x / s, v.y / s); }
function i903(v1, v2) { return point(v1.x - v2.x, v1.y - v2.y); }
function g904(str) { return decodeURI(encodeURIComponent(str)); }
function n905(str) { return decodeURIComponent(encodeURI(str)); }
function a906(bytes) { let str = ''; for (let i = 0; i < bytes.length; i++)
    str += String.fromCharCode(bytes[i]); return str; }
function g907(str) { return Array.from(n905(str), c => c.charCodeAt(0)); }
function k908(array, size) { const newArray = new Uint8Array(size); b909(array, newArray); return newArray; }
function b909(src, dst) { j910(src, 0, src.length, dst, 0, dst.length); }
function j910(src, q911, t912, dst, g913, q914) { const size = Math.min(t912, q914); for (let i = 0; i < size; i++)
    dst[g913 + i] = src[q911 + i]; }
function c915(r916, g917) { if (r916.length != g917.length)
    return false; for (let i = 0; i < r916.length; i++) {
    if (r916[i] != g917[i])
        return false;
} return true; }
function q918(v919, l920) { return v919.findIndex(i => l920.includes(i)) > -1; }
function n921(list) { return list ? '<==' : '<--'; }
;
function e922(list) { return list ? '==>' : '-->'; }
;
function j923(nodeId) { return d874 + ' ' + nodeId; }
function k924(name) { return j875 + ' ' + name; }
function u925(name) { return j876 + ' ' + name; }
function u926(str) { return str.toLowerCase() == 'true' || str == '1'; }
function r927(k928, c929 = false) { return e934(k928.outputNodeId, k928.outputId, k928.outputOrder, k928.inputNodeId, k928.inputId, k928.list, c929); }
function b930(outputNodeId, outputId, outputOrder, inputNodeId, inputId) { return k924(outputNodeId + ' ' + outputId + ' ' + outputOrder + ' ' + inputNodeId + ' ' + inputId); }
function s931(u243) { return b930(u243.outputNodeId, u243.outputId, u243.outputOrder, u243.inputNodeId, u243.inputId); }
function p932(u243) { return b930(u243.output.node.id, u243.output.id, u243.outputOrder, u243.input.node.id, u243.input.id); }
function s933(u243, c929 = false) { return e934(u243.output.node.id, u243.output.id, u243.outputOrder, u243.input.node.id, u243.input.id, u243.list, c929); }
function e934(outputNodeId, outputId, outputOrder, inputNodeId, inputId, list, c929 = false) { const sp = c929 ? ' ' : '  '; const jsp = c929 ? '' : ' '; const arrow = sp + t938(typeof outputOrder == 'string' ? parseInt(outputOrder) : outputOrder) + e922(typeof list == 'string' ? u926(list) : list) + sp; const join = jsp + '.' + jsp; return outputNodeId + join + outputId + arrow + inputNodeId + join + inputId; }
function o935(pageId) { return u925(pageId); }
function o936(num) { const str = num.toString(); let sup = ''; for (const c of str)
    sup += z937(c); return sup; }
function z937(c) { switch (c) {
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
function t938(num) { const str = num.toString(); let sup = ''; for (const c of str)
    sup += l939(c); return sup; }
function l939(c) { switch (c) {
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
function x940(bool) { return bool ? 'true' : 'false'; }
function isValid(val) { return val != undefined && val != null; }
function isEmpty(array) { return array.length == 0; }
function v941(array, item) { y942(array, array.indexOf(item)); }
function y942(array, index) { if (index > -1 && index < array.length)
    array.splice(index, 1); }
function d943(array) { if (isEmpty(array))
    return null; let last = array.at(-1); array.splice(array.length - 1, 1); return last; }
function t944(array) { return array[array.length - 1]; }
function i945(array, from, to) { const item = array[from]; array.splice(from, 1); array.splice(to, 0, item); }
function f946(array, item) { const index = array.indexOf(item); if (index > -1)
    array.splice(index, 1); }
function o947(q2779, array) { for (const item of array) {
    const index = q2779.indexOf(item);
    if (index > -1)
        q2779.splice(index, 1);
} }
function n948(array, where) { const index = array.findIndex(where); if (index > -1)
    array.splice(index, 1); }
function j949(styleId) { return styleId.split(',')[0] + ','; }
function j950(points) { let c4014 = ''; if (points.length < 2)
    return c4014; c4014 += 'M'; c4014 += ' ' + m878(points[0].x); c4014 += ' ' + m878(points[0].y); for (let i = 1; i < points.length; i++) {
    c4014 += ' L' + ' ' + m878(points[i].x) + ' ' + m878(points[i].y);
} return c4014; }
function point(x, y) { return { x: x, y: y }; }
function c951(v, m) { let r = [0, 0, 0]; for (let i = 0; i < 3; i++)
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
        let h111 = {};
        for (const key in val)
            h111[key] = clone(val[key]);
        return h111;
    }
} throw 'unknown'; }
function a952(array, item, equal = null) { if (equal) {
    if (Array.isArray(item))
        item.forEach(i => a952(array, i, equal));
    else if (!array.find(i => equal(i, item)))
        array.push(item);
}
else {
    if (Array.isArray(item))
        item.forEach(i => a952(array, i));
    else if (!array.includes(item))
        array.push(item);
} }
function f953(array, item, equal) { if (Array.isArray(item))
    item.forEach(i => f953(array, i, equal));
else if (!array.find(equal))
    array.push(item); }
function i954(array, item, except) { if (Array.isArray(item))
    item.forEach(i => i954(array, i, except));
else if (!array.find(except))
    array.push(item); }
function u955(...args) { if (enableAsserts) {
    console.assert(...args);
} }
function x956(...args) { if (enableAsserts)
    console.error(...args); }
function h957(str, trim) { while (str.length >= trim.length && str.substring(0, trim.length) == trim)
    str = str.substring(trim.length); return str; }
function y958(str, trim) { while (str.length >= trim.length && str.substring(str.length - trim.length) == trim)
    str = str.substring(0, str.length - trim.length); return str; }
function l959(q4074) { const fills = []; for (const fill of q4074) {
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
            const i4190 = fill[1];
            const stops = [];
            for (const stop of fill[2]) {
                stops.push({ color: { r: Math.min(Math.max(0, stop[0]), 1), g: Math.min(Math.max(0, stop[1]), 1), b: Math.min(Math.max(0, stop[2]), 1), a: Math.min(Math.max(0, stop[3]), 1) }, position: stop[4] });
            }
            fills.push({ type: fill[0], gradientTransform: i4190, gradientStops: stops, blendMode: fill[3] });
            break;
        }
    }
} return fills; }
function s960(type) { return t1093.includes(type); }
const z1060 = 'LIST#';
const k1061 = 'NLIST#';
const i1062 = 'TLIST#';
const y1063 = 'SLIST#';
const c1064 = 'NULL';
const g1065 = 'VAR';
const y1066 = 'VARGRP';
const f1067 = 'FEEDBK';
const a1068 = 'REPT';
const n1069 = 'CACHE';
const t1070 = 'FRZ';
const l1071 = 'TIMER';
const o1072 = 'VNAME';
const GET_LIST_VALUE_NAMES = 'GVNAMES';
const LIST_VALUE_NAMES = 'VNAMES';
const OBJECT_NAME = 'ONAME';
const m1073 = 'CMB';
const s1074 = 'LSASIT';
const z1075 = 'EXTR';
const p1076 = 'SETP';
const z1077 = 'GETP';
const l1078 = 'SUBLST';
const s1079 = 'UNIQ';
const REORDER_LIST = 'RORD';
const SHIFT_LIST = 'SHFTLST';
const u1080 = 'REVLST';
const BUCKLE_LIST = 'BUKLST';
const m1081 = 'SORT';
const u1082 = 'CLMN';
const g1083 = 'CELL';
const a1084 = 'LIST';
const k1085 = 'COUNT';
const OBJECT_COUNT = 'OBJCOUNT';
const v1086 = 'LCONT';
const w1087 = 'SELECT';
const SELECT_FROM_LIST = 'LSTSEL';
const g1088 = 'IF';
const f1089 = 'LSTFLT';
const w1091 = 'ANY#';
const u1092 = [z1060, k1061, i1062, y1063, m1073, z1075, p1076, z1077, l1078, a1084, k1085, v1086, a1068];
const t1093 = [z1060, k1061, i1062, y1063];
const w1090 = 'ITER';
const l1112 = 'PROB';
const HOLD = 'HOLD';
const z1095 = 'NUM#';
const p1096 = 'NUM';
const NUMBER_PRECISION = 'NPREC';
const d1097 = 'NSIGN';
const o1098 = 'ABS';
const NUMBER_NEGATIVE = 'NEG';
const z1099 = 'ROUND';
const NUMBER_QUANTIZE = 'QUANT';
const u1100 = 'SMINMAX';
const i1101 = 'MINMAX';
const e1102 = 'LIM';
const x1103 = 'NCURVE';
const NUMBER_MAP = 'NMAP';
const NUMBER_BIAS = 'NBIAS';
const m1104 = 'NANISNUM';
const x1105 = 'CONST';
const r1106 = 'DATE';
const p1107 = 'SEQ';
const i1108 = 'RANGE';
const g1109 = 'WAVE';
const a1110 = 'RAND';
const o1111 = 'NOISE';
const g1113 = 'ACCUM';
const s1114 = 'LERP';
const m1115 = 'SOLVE';
const q1116 = 'NANIM';
const b1117 = 'SMATH';
const x1118 = 'MATH';
const s1119 = 'ADD';
const k1120 = 'SUB';
const c1121 = 'MUL';
const y1122 = 'DIV';
const v1123 = 'MOD';
const r1124 = 'EXP';
const w1125 = 'NBOOL';
const r1126 = 'NOT';
const u1127 = 'AND';
const k1128 = 'OR';
const s1129 = 'XOR';
const j1130 = 'COND';
const l1131 = 'EQ';
const k1132 = 'NE';
const l1133 = 'LT';
const x1134 = 'LE';
const l1135 = 'GT';
const i1136 = 'GE';
const w1137 = 'TRIG';
const t1138 = 'SIN';
const d1139 = 'COS';
const s1140 = 'TAN';
const f1141 = 'ATAN2';
const n1142 = 'CNVANG';
const c1094 = [c1064, g1065, y1066, ...u1092, s1074, z1075, p1076, z1077, l1078, s1079, REORDER_LIST, SHIFT_LIST, u1080, BUCKLE_LIST, u1082, m1081, g1083, a1084, w1087, SELECT_FROM_LIST, g1088, f1089, f1067, a1068, w1090, l1112, HOLD, n1069, t1070, l1071, o1072, GET_LIST_VALUE_NAMES, LIST_VALUE_NAMES, OBJECT_NAME];
const a1143 = [x1118, b1117, s1119, k1120, c1121, y1122, v1123, r1124];
const e1144 = [w1125, r1126, u1127, k1128, s1129];
const h1145 = [j1130, l1131, k1132, l1133, x1134, l1135, i1136];
const l1146 = [w1137, t1138, d1139, s1140, f1141];
const n1147 = 'TEXT#';
const b1148 = 'TEXT';
const p1149 = 'TLEN';
const j1150 = 'TTRIM';
const o1151 = 'TSUB';
const f1152 = 'TCONT';
const w1153 = 'TCASE';
const o1154 = 'TREPL';
const s1155 = 'TJOIN';
const j1156 = 'TPAD';
const i1157 = 'TCMP';
const g1158 = 'TCHAR';
const q1159 = 'TUNI';
const f1160 = 'INDEX';
const w1161 = 'N2T';
const f1162 = 'C2T';
const q1163 = 'T2N';
const w1164 = 'T2C';
const p1165 = 'TSPLT';
const v3488 = 'TJSON';
const z1167 = 'TCSV';
const j1168 = 'FETCH';
const g1169 = 'TFILE';
const d1170 = [z1095, k1061, p1096, NUMBER_PRECISION, d1097, o1098, NUMBER_NEGATIVE, z1099, NUMBER_QUANTIZE, u1100, i1101, e1102, x1103, NUMBER_MAP, NUMBER_BIAS, m1104, x1105, r1106, p1107, i1108, g1109, a1110, o1111, g1113, s1114, m1115, q1116, w1161, g1158, ...a1143, ...e1144, ...h1145, ...l1146, n1142, BUCKLE_LIST];
const t1171 = [n1147, i1062, b1148, p1149, j1150, o1151, f1152, w1153, s1155, j1156, o1154, i1157, q1159, f1160, q1163, w1164, p1165, v3488, z1167, j1168, g1169];
const h1172 = 'COL#';
const u1173 = 'COL';
const z1174 = 'CVAL';
const f1175 = 'CCOR';
const o1176 = 'COLP3';
const y1177 = 'CCNT';
const q1178 = 'BLND';
const j1179 = 'CLERP';
const k1180 = 'CBLND';
const e1181 = [h1172, u1173, f1175, o1176, q1178, j1179, k1180, f1162];
const t1182 = 'FILL#';
const u1183 = 'FILL';
const j1184 = [t1182, u1183];
const v1185 = 'STRK#';
const f1186 = 'STRK';
const o1187 = [v1185, f1186];
const x1188 = 'CSTOP#';
const f1189 = 'CSTOP';
const c1190 = [x1188, f1189];
const z1191 = 'GRAD#';
const p1192 = 'GRAD';
const d1193 = [z1191, p1192];
const x1194 = 'RCRN#';
const w1195 = 'RCRN';
const a1196 = [x1194, w1195];
const x1197 = 'DRSH#';
const d1198 = 'DRSH';
const p1199 = [x1197, d1198];
const d1200 = 'INSH#';
const m1201 = 'INSH';
const e1202 = [d1200, m1201];
const u1203 = 'LBLR#';
const m1204 = 'LBLR';
const p1205 = [u1203, m1204];
const g1206 = 'BBLR#';
const k1207 = 'BBLR';
const w1208 = [g1206, k1207];
const j1209 = 'MASK#';
const d1210 = 'MASK';
const l1211 = [j1209, d1210];
const s1212 = 'BLEND#';
const x1213 = 'BLEND';
const f1214 = [s1212, x1213];
const a1215 = [...a1196, ...p1199, ...e1202, ...p1205, ...w1208, ...f1214, ...l1211];
const d1216 = [h1172, t1182, z1191, v1185, x1197, d1200, u1203, g1206, s1212, j1209];
const l1217 = 'CSTL';
const g1218 = 'SHP#';
const b1219 = 'RECT#';
const j1220 = 'RECT';
const p1221 = [b1219, j1220];
const b1222 = 'LINE#';
const d1223 = 'LINE';
const e1224 = [b1222, d1223];
const e1225 = 'ELPS#';
const d1226 = 'ELPS';
const e1227 = [e1225, d1226];
const x1228 = 'TRPZ#';
const d1229 = 'TRPZ';
const f1230 = [x1228, d1229];
const z1237 = 'POLY#';
const i1238 = 'POLY';
const t1239 = [z1237, i1238];
const o1240 = 'STAR#';
const u1241 = 'STAR';
const r1242 = [o1240, u1241];
const o1243 = 'TXTS#';
const b1244 = 'TXTS';
const r1245 = [o1243, b1244];
const h1246 = 'PT#';
const s1247 = 'PT';
const x1248 = [h1246, s1247];
const w1249 = 'PCORN';
const s1250 = 'VPATH#';
const o1251 = 'VPATH';
const r1252 = [s1250, o1251];
const c1253 = 'VPT#';
const g1254 = 'VPT';
const n1255 = [c1253, g1254];
const k1256 = 'VEDGE#';
const a1257 = 'VEDGE';
const q1258 = [k1256, a1257];
const h1259 = 'VREG#';
const m1260 = 'VREG';
const c1261 = [h1259, m1260];
const n1262 = 'VNET#';
const s1263 = 'VNET';
const e1264 = [n1262, s1263];
const n1265 = 'SGRP#';
const q1266 = 'SGRP';
const s1267 = [n1265, q1266];
const r1268 = 'FRM#';
const h1269 = 'FRM';
const a1270 = [r1268, h1269];
const u1232 = 'ARC#';
const q1231 = 'ARC';
const a1233 = [u1232, q1231];
const y1235 = 'WAVEP#';
const f1234 = 'WAVEP';
const a1236 = [y1235, f1234];
const e1271 = 'MOVE';
const c1272 = 'ROT';
const m1273 = 'SCALE';
const n1274 = 'SKEW';
const o1275 = 'SCENTR';
const y1276 = 'RSTX';
const n1277 = 'PLACE';
const c1278 = 'APPLY';
const PATH_LENGTH = 'PTHLEN';
const JOIN_PATHS = 'JOINPTH';
const REORIENT_PATHS = 'REORPTH';
const k1284 = 'PTALPATH';
const q1285 = 'CPTONPATH';
const m1279 = 'MESPT';
const x1280 = 'VECLEN';
const l1281 = 'CIRCEN';
const ARC_FROM_POINTS = 'ARCPT';
const g1282 = 'INTLIN';
const a1283 = 'PTLERP';
const REVERSE_PATH = 'REVPTH';
const BLEND_PATH = 'BLENDPTH';
const PATH_TYPES = [o1251, d1229, q1231, f1234];
const PATH_VALUES = [s1250, x1228, u1232, y1235];
const z1286 = 'SBOOL';
const s1287 = 'SBOOL#';
const u1288 = 'SBOOLU';
const s1289 = 'SBOOLS';
const o1290 = 'SBOOLI';
const z1291 = 'SBOOLE';
const i1292 = [z1286, s1287, u1288, s1289, o1290, z1291];
const a1293 = 'RENDER';
const EXPORT = 'EXPORT';
const h1294 = [g1218, y1063, b1219, b1222, e1225, x1228, z1237, o1240, o1243, h1246, s1250, c1253, k1256, h1259, n1262, u1232, y1235, n1265, r1268, s1287, x1197, d1200, u1203, g1206, s1212, j1209];
const l1295 = [c1272, m1273, n1274];
const h1296 = [...h1294, ...p1221, ...e1224, ...e1227, ...f1230, ...t1239, ...r1242, ...r1245, ...x1248, w1249, ...r1252, ...n1255, ...q1258, ...c1261, ...e1264, ...a1233, ...a1236, ...s1267, ...a1270, ...i1292, e1271, ...l1295, o1275, y1276, n1277, c1278, PATH_LENGTH, JOIN_PATHS, REORIENT_PATHS, k1284, q1285, m1279, x1280, l1281, q1231, f1234, ARC_FROM_POINTS, g1282, a1283, REVERSE_PATH, BLEND_PATH, a1293, EXPORT];
const z1297 = [z1060, k1061, i1062, y1063, z1095, n1147, h1172, t1182, x1188, z1191, v1185, x1188, z1191, g1218, b1219, b1222, e1225, x1228, z1237, o1240, o1243, h1246, s1250, c1253, k1256, h1259, n1262, n1265, r1268, x1194, x1197, d1200, u1203, g1206, s1212, j1209];
const k1298 = 'GROUP';
const o1299 = 'GPARAM';
const a1300 = [k1298, o1299];
const o1301 = 'CMNT';
const b1302 = 'CMNTARR';
const q1303 = 'PANEL';
const w1304 = 'ACT';
const o1305 = 'BFACT';
const l1306 = 'BFLST';
const e1307 = 'DIS';
const o1308 = 'NOC';
const PARAM = 'PARAM';
const s1309 = 'LOG';
const p1310 = 'GRAPH';
const w1311 = [[v1123, '%'], [y1122, '/'], [k1120, '−'], [s1119, '+'], [c1121, '×'], [r1124, 'e<sup>x']];
const y1312 = [[y1122, '/'], [k1120, '−'], [s1119, '+'], [c1121, '×']];
const d1313 = 0;
const k1314 = 1;
const a1315 = 2;
const w1316 = 3;
const n1317 = [[d1313, 'not'], [k1314, 'xor'], [a1315, 'or'], [w1316, 'and']];
const h1318 = 0;
const n1319 = 1;
const n1320 = 2;
const x1321 = 3;
const x1322 = 4;
const z1323 = 5;
const s1324 = [[h1318, '<'], [n1319, '≤'], [n1320, '≠'], [x1321, '='], [x1322, '≥'], [z1323, '>']];
const a1325 = 0;
const v1326 = 1;
const c1327 = 2;
const f1328 = 3;
const b1329 = 4;
const h1330 = 5;
const y1331 = [[a1325, 'sin'], [v1326, 'cos'], [c1327, 'tan'], [f1328, 'asin'], [b1329, 'acos'], [h1330, 'atan']];
const c1332 = 'EMPTY';
const o1333 = 'CONNECT';
const l1334 = 'CREATE';
const i1335 = 'CREATE_INSERT';
const k1336 = 'DELETE';
const p1337 = 'DISCONNECT';
const d1338 = 'LINK_STYLE';
const w1339 = 'LINK_VARIABLE';
const e1340 = 'LINK_VARIABLE_GROUP';
const v1341 = 'MAKE_ACTIVE';
const MAKE_NOT_CONDITION_ACTION = 'MAKE_NOT_CONDITION';
const d1342 = 'MAKE_PASSIVE';
const b1343 = 'PASTE';
const c1344 = 'RECONNECT';
const r1345 = 'REMOVE';
const b1346 = 'RENAME';
const f1347 = 'REORDER_INPUTS';
const p1348 = 'REORDER_CONNECTIONS';
const g1349 = 'SELECT';
const p1350 = 'SELECT_MOVE';
const t1351 = 'MOVE_NODES';
const r1352 = 'SET_PARAM_VALUE';
const SET_MULTIPLE_VALUES_ACTION = 'SET_MULTIPLE_VALUES';
const w1353 = 'SET_PARAM_SETTING';
const a1354 = 'SET_NODE_RECT';
const d1355 = 'TOGGLE_DISABLE';
const q1356 = 'TOGGLE_PARAM_HEADER';
const b1357 = 'SET_CURRENT_GRAPH';
const y1358 = 'CREATE_PAGE';
const v1359 = 'DELETE_PAGE';
const t1360 = 'GROUP_NODES';
const j1361 = 'UNGROUP_NODES';
const z1362 = 'HIGHLIGHT_NODES';
const SCROLL_LIST_NODE_ACTION = 'SCROLL_LIST_NODE';
const SET_LIST_DIVIDER_ACTION = 'SET_LIST_DIVIDER';
const SET_NODE_PARAM_ACTION = 'SET_NODE_PARAM';
const n1363 = 'BNORM';
const k1364 = 'BDARK';
const q1365 = 'BMULT';
const t1366 = 'BPDRK';
const k1367 = 'BBURN';
const r1368 = 'BLITE';
const c1369 = 'BSCRN';
const q1370 = 'BPLGT';
const h1371 = 'BDODG';
const j1372 = 'BOVER';
const l1373 = 'BSOFT';
const i1374 = 'BHARD';
const s1375 = 'BDIFF';
const u1376 = 'BEXCL';
const w1377 = 'BHUE';
const x1378 = 'BSAT';
const b1379 = 'BCOL';
const z1380 = 'BLUM';
const p1381 = [[n1363, 'normal', 'NORMAL'], [k1364, 'darken', 'DARKEN'], [q1365, 'multiply', 'MULTIPLY'], [t1366, 'plus darker', 'LINEAR_BURN'], [k1367, 'color burn', 'COLOR_BURN'], [r1368, 'lighten', 'LIGHTEN'], [c1369, 'screen', 'SCREEN'], [q1370, 'plus lighter', 'LINEAR_DODGE'], [h1371, 'color dodge', 'COLOR_DODGE'], [j1372, 'overlay', 'OVERLAY'], [l1373, 'soft light', 'SOFT_LIGHT'], [i1374, 'hard light', 'HARD_LIGHT'], [s1375, 'difference', 'DIFFERENCE'], [u1376, 'exclusion', 'EXCLUSION'], [w1377, 'hue', 'HUE'], [x1378, 'saturation', 'SATURATION'], [b1379, 'color', 'COLOR'], [z1380, 'luminosity', 'LUMINOSITY']];
const m1382 = [['thin', 100], ['extra light', 200], ['light', 300], ['regular', 400], ['medium', 500], ['semi bold', 600], ['bold', 700], ['extra bold', 800], ['black', 900]];
const y1383 = 0;
const m1384 = 1;
const n1385 = 2;
const h1386 = 2;
const g1387 = 3;
const n1388 = 3;
const i1389 = 4;
const r1390 = 4;
const i1391 = 5;
const r1392 = 6;
const i1393 = 7;
const c1394 = 8;
const v1395 = 9;
const w1396 = 10;
const q1397 = 11;
const r1398 = 12;
const l1399 = 13;
const x1400 = 14;
const r1401 = 15;
const n1402 = 16;
const n1403 = 17;
const p1404 = 18;
const i1405 = 19;
const k1406 = 20;
const f1407 = 21;
const n1408 = 22;
const i1409 = 23;
const j1410 = 24;
const FO_BOOLEAN_CHILDREN = 24;
const u1411 = 24;
const e1412 = 25;
const FO_BOOLEAN_OPERATION = 25;
const w1413 = 26;
const v1414 = 27;
const d1415 = 28;
const w1416 = 28;
const a1417 = 28;
const b1418 = 28;
const x1419 = 28;
const j1420 = 28;
const n1421 = 28;
const x1422 = 28;
const i1423 = 29;
const l1424 = 29;
const i1425 = 29;
const q1426 = 29;
const a1427 = 29;
const i1428 = 29;
const n1429 = 30;
const v1430 = 30;
const d1431 = 30;
const e1432 = 30;
const l1433 = 31;
const e1434 = 31;
const i1435 = 32;
const c1436 = 33;
const z1437 = 34;
const i1438 = 35;
const e1439 = 36;
const d1440 = 37;
const q2780 = '12345679ABCDEFGHJKLMNPQRSTUVWXYZ';
function m846(array, chars = q2780) { let s848 = ''; let len = array.length; let i = 0; while (len > 0) {
    if (len >= 5) {
        const a0 = array[i], a1 = array[i + 1], a2 = array[i + 2], a3 = array[i + 3], a4 = array[i + 4];
        s848 += chars[(a0 & 0xF8) >>> 3];
        s848 += chars[((a0 & 0x07) << 2) | ((a1 & 0xC0) >>> 6)];
        s848 += chars[(a1 & 0x3E) >>> 1];
        s848 += chars[((a1 & 0x01) << 4) | ((a2 & 0xF0) >>> 4)];
        s848 += chars[((a2 & 0x0F) << 1) | ((a3 & 0x80) >>> 7)];
        s848 += chars[(a3 & 0x7C) >>> 2];
        s848 += chars[((a3 & 0x03) << 3) | ((a4 & 0xE0) >>> 5)];
        s848 += chars[(a4 & 0x1F)];
    }
    else if (len == 4) {
        const a0 = array[i], a1 = array[i + 1], a2 = array[i + 2], a3 = array[i + 3];
        s848 += chars[(a0 & 0xF8) >>> 3];
        s848 += chars[((a0 & 0x07) << 2) | ((a1 & 0xC0) >>> 6)];
        s848 += chars[(a1 & 0x3E) >>> 1];
        s848 += chars[((a1 & 0x01) << 4) | ((a2 & 0xF0) >>> 4)];
        s848 += chars[((a2 & 0x0F) << 1) | ((a3 & 0x80) >>> 7)];
        s848 += chars[(a3 & 0x7C) >>> 2];
        s848 += chars[((a3 & 0x03) << 3)];
    }
    else if (len == 3) {
        const a0 = array[i], a1 = array[i + 1], a2 = array[i + 2];
        s848 += chars[(a0 & 0xF8) >>> 3];
        s848 += chars[((a0 & 0x07) << 2) | ((a1 & 0xC0) >>> 6)];
        s848 += chars[(a1 & 0x3E) >>> 1];
        s848 += chars[((a1 & 0x01) << 4) | ((a2 & 0xF0) >>> 4)];
        s848 += chars[((a2 & 0x0F) << 1)];
    }
    else if (len == 2) {
        const a0 = array[i], a1 = array[i + 1];
        s848 += chars[(a0 & 0xF8) >>> 3];
        s848 += chars[((a0 & 0x07) << 2) | ((a1 & 0xC0) >>> 6)];
        s848 += chars[(a1 & 0x3E) >>> 1];
        s848 += chars[((a1 & 0x01) << 4)];
    }
    else if (len == 1) {
        const a0 = array[i];
        s848 += chars[(a0 & 0xF8) >>> 3];
        s848 += chars[((a0 & 0x07) << 2)];
    }
    i += 5;
    len -= 5;
} return s848; }
function e847(s848, chars = q2780) { const array = []; let len = s848.length; let c = 0; while (len > 0) {
    if (len >= 8) {
        const c0 = chars.indexOf(s848[c]), c1 = chars.indexOf(s848[c + 1]), c2 = chars.indexOf(s848[c + 2]), c3 = chars.indexOf(s848[c + 3]), c4 = chars.indexOf(s848[c + 4]), c5 = chars.indexOf(s848[c + 5]), c6 = chars.indexOf(s848[c + 6]), c7 = chars.indexOf(s848[c + 7]);
        array.push((c0 << 3) | ((c1 & 0x1C) >>> 2));
        array.push(((c1 & 0x03) << 6) | (c2 << 1) | ((c3 & 0x10) >>> 4));
        array.push(((c3 & 0x0F) << 4) | ((c4 & 0x1E) >>> 1));
        array.push(((c4 & 0x01) << 7) | (c5 << 2) | ((c6 & 0x18) >>> 3));
        array.push(((c6 & 0x07) << 5) | c7);
    }
    else if (len == 7) {
        const c0 = chars.indexOf(s848[c]), c1 = chars.indexOf(s848[c + 1]), c2 = chars.indexOf(s848[c + 2]), c3 = chars.indexOf(s848[c + 3]), c4 = chars.indexOf(s848[c + 4]), c5 = chars.indexOf(s848[c + 5]), c6 = chars.indexOf(s848[c + 6]);
        array.push((c0 << 3) | ((c1 & 0x1C) >>> 2));
        array.push(((c1 & 0x03) << 6) | (c2 << 1) | ((c3 & 0x10) >>> 4));
        array.push(((c3 & 0x0F) << 4) | ((c4 & 0x1E) >>> 1));
        array.push(((c4 & 0x01) << 7) | (c5 << 2) | ((c6 & 0x18) >>> 3));
    }
    else if (len == 5) {
        const c0 = chars.indexOf(s848[c]), c1 = chars.indexOf(s848[c + 1]), c2 = chars.indexOf(s848[c + 2]), c3 = chars.indexOf(s848[c + 3]), c4 = chars.indexOf(s848[c + 4]);
        array.push((c0 << 3) | ((c1 & 0x1C) >>> 2));
        array.push(((c1 & 0x03) << 6) | (c2 << 1) | ((c3 & 0x10) >>> 4));
        array.push(((c3 & 0x0F) << 4) | ((c4 & 0x1E) >>> 1));
    }
    else if (len == 4) {
        const c0 = chars.indexOf(s848[c]), c1 = chars.indexOf(s848[c + 1]), c2 = chars.indexOf(s848[c + 2]), c3 = chars.indexOf(s848[c + 3]);
        array.push((c0 << 3) | ((c1 & 0x1C) >>> 2));
        array.push(((c1 & 0x03) << 6) | (c2 << 1) | ((c3 & 0x10) >>> 4));
    }
    else if (len == 2) {
        const c0 = chars.indexOf(s848[c]), c1 = chars.indexOf(s848[c + 1]);
        array.push((c0 << 3) | ((c1 & 0x1C) >>> 2));
    }
    c += 8;
    len -= 8;
} return array; }
function logSavedNode(nodeKey, s3989) {
    return __awaiter(this, void 0, void 0, function* () { const log = a2103(yield z1548(nodeKey, false)); if (s3989) {
        console.log('%c%s\n%c%s', 'background: #fa24; color: white;', z1058(nodeKey), 'background: #fa44; color: #edc;', log);
    }
    else {
        console.log('%c%s\n%c%s', 'background: #fdb; color: black;', z1058(nodeKey), 'background: #fed; color: black;', log);
    } });
}
function a2103(json) { let t4015 = json.replace('{\n', '').replace('\n}', '').replace('[\n' + j869, '').replace('\n' + j869 + ']', '').split(j869 + '"params":\n').join('').split('": "').join(': ').split('", "').join(': ').split(j869 + '"').join(j869).split(j869 + j869 + '["').join(j869 + j869).split('",\n').join('\n').split('"\n').join('\n').split('"],\n').join('\n'); if (t4015[t4015.length - 1] == '"')
    t4015 = t4015.substring(0, t4015.length - 1); if (t4015.substring(t4015.length - 2) == '"]')
    t4015 = t4015.substring(0, t4015.length - 2); return t4015; }
function g2104(json) { let t4015 = json.replace('{\n', '').replace('\n}', '').replace('[\n' + j869, '').replace('\n' + j869 + ']', ''); return t4015; }
function a2105(u243, s3989) { const w4193 = r927(u243, true); if (s3989) {
    console.log('%c%s', 'background: #4f44; color: #ded', w4193);
}
else {
    console.log('%c%s', 'background: #cfc; color: black;', w4193);
} }
console.clear();
figma.payments.setPaymentStatusInDevelopment({ type: 'PAID' });
figma.loadAllPagesAsync().then(() => { figma.on('documentchange', m1519); figma.on('selectionchange', q1527); figma.on('close', q1520); });
u1509(true);
figma.clientStorage.getAsync('pro').then(data => { figma.showUI(__html__, { visible: false, themeColors: true, title: 'Generator' }); });
var j2692 = figma.viewport.zoom;
setInterval(y1524, 100);
const n2781 = 'clock_';
const j2782 = 1000;
var q2783 = false;
var objectCenterSize = 15;
function f1521() { (function () {
    return __awaiter(this, void 0, void 0, function* () { figma.currentPage.loadAsync().then(() => __awaiter(this, void 0, void 0, function* () { let c2784 = yield figma.currentPage.getPluginData(figma.currentUser.id + ',windowWidth'); let t2785 = yield figma.currentPage.getPluginData(figma.currentUser.id + ',windowHeight'); let p2786; let j2787; if (c2784 === NULL) {
        p2786 = 800;
        figma.currentPage.setPluginData(figma.currentUser.id + ',windowWidth', c2784.toString());
    }
    else
        p2786 = parseInt(c2784); if (t2785 === NULL) {
        j2787 = 600;
        figma.currentPage.setPluginData(figma.currentUser.id + ',windowHeight', t2785.toString());
    }
    else
        j2787 = parseInt(t2785); figma.ui.resize(Math.max(minWindowWidth, p2786), Math.max(minWindowHeight, j2787)); figma.ui.show(); const fonts = yield figma.listAvailableFontsAsync(); const eula = (yield figma.clientStorage.getAsync('eula')) === 'true'; const tutorials = (yield figma.clientStorage.getAsync('tutorials')) === 'true'; const isLocked = yield a1526(); k1528({ cmd: 'uiReturnFigStartGenerator', currentUser: figma.currentUser, viewportRect: figma.viewport.bounds, viewportZoom: figma.viewport.zoom, fonts: fonts, eula: eula, tutorials: tutorials, isLocked: isLocked, windowWidth: p2786, windowHeight: j2787 }); })); });
})(); }
function j1522() { u1509(); figma.showUI(__html__, { visible: false, themeColors: true }); }
function w1523() { setInterval(e1525, j2782); }
function y1524() { if (figma.viewport.zoom == j2692)
    return; j2692 = figma.viewport.zoom; a2680(); j1542(); h1544(); }
function e1525() { q1549(n2781 + figma.currentUser.sessionId.toString(), Date.now().toString()); }
function a1526() {
    return __awaiter(this, void 0, void 0, function* () { yield figma.currentPage.loadAsync(); const clocks = figma.currentPage.getPluginDataKeys().filter(k => k.length > n2781.length && k.substring(0, n2781.length) == n2781 && k.substring(n2781.length) != figma.currentUser.sessionId.toString()).map((k) => __awaiter(this, void 0, void 0, function* () { return parseInt(yield z1548(k)); })); clocks.sort(); const now = Date.now(); const locked = clocks.length > 0 && now - (yield clocks[clocks.length - 1]) < j2782 * 2; return locked; });
}
function q1527() { a2680(); }
var l2713 = new Array();
var n2715 = new Array();
function figGetObjectsFromIds(objectIds) {
    return __awaiter(this, void 0, void 0, function* () { for (let i = q2749.length - 1; i >= 0; i--)
        if (!q2749[i].removed && objectIds.includes(q2749[i].getPluginData('objectId')))
            q2749.splice(i, 1); for (let i = b2765.length - 1; i >= 0; i--)
        if (b2765[i].removed || objectIds.includes(b2765[i].getPluginData('objectId')))
            b2765.splice(i, 1); yield figma.currentPage.loadAsync(); return figma.currentPage.findAll(o => objectIds.includes(o.getPluginData('objectId'))); });
}
function a1508(nodeIds) {
    return __awaiter(this, void 0, void 0, function* () { for (let i = q2749.length - 1; i >= 0; i--)
        if (!q2749[i].removed && nodeIds.includes(q2749[i].getPluginData('nodeId')))
            q2749.splice(i, 1); for (let i = b2765.length - 1; i >= 0; i--)
        if (b2765[i].removed || nodeIds.includes(b2765[i].getPluginData('nodeId')))
            b2765.splice(i, 1); yield figma.currentPage.loadAsync(); figma.currentPage.findAll(o => nodeIds.includes(o.getPluginData('nodeId'))).forEach(o => { if (!o.removed)
        o.remove(); }); l2713 = l2713.filter(a => !nodeIds.includes(a.nodeId)); });
}
function u1509(n1510 = false) { for (const w1515 of figma.currentPage.children) {
    if (w1515.removed)
        continue;
    if (w1515.getPluginData('objectId') != '' && w1515.getPluginData('userId') == figma.currentUser.id && (parseInt(w1515.getPluginData('retain')) == 0 || n1510))
        w1515.remove();
} }
function b1511(nodeIds, v1512) { for (let i = l2713.length - 1; i >= 0; i--) {
    const l2714 = l2713[i];
    if (!nodeIds.includes(l2714.nodeId))
        continue;
    for (let j = l2714.objects.length - 1; j >= 0; j--) {
        const w1515 = l2714.objects[j];
        if (w1515.removed || !m1513(w1515, v1512)) {
            if (!w1515.removed)
                w1515.remove();
            f946(l2714.objects, w1515);
            if (q2749.includes(w1515))
                f946(q2749, w1515);
            if (b2765.includes(w1515))
                f946(b2765, w1515);
        }
        if (!w1515.removed) {
            if (parseInt(w1515.getPluginData('retain')) == 2)
                j1534(w1515);
        }
    }
    if (isEmpty(l2714.objects))
        f946(l2713, l2714);
} }
function m1513(w1515, v1512) { if (w1515.type == q1266 || w1515.type == h1269) {
    for (const child of w1515.children) {
        const found = m1513(child, v1512);
        if (found)
            return found;
    }
}
else {
    const found = v1512.find(o => w1515.getPluginData('objectId') == o[n1385] && w1515.getPluginData('userId') == figma.currentUser.id || o[i1391] == 2 && o[i1391] == w1515.getPluginData('retain'));
    if (found)
        return found;
} return null; }
function u1516(nodeIds, m1517) { figma.getLocalPaintStylesAsync().then(paintStyles => { paintStyles.filter(s => nodeIds.includes(s.getPluginData('nodeId'))).forEach(s => { const nodeId = s.getPluginData('nodeId'); const existing = u926(s.getPluginData('existing')); if (!existing) {
    s.remove();
}
else if (m1517) {
    n948(n2715, a => a.nodeId == nodeId);
    s.setPluginData('type', NULL);
    s.setPluginData('nodeId', NULL);
    s.setPluginData('existing', NULL);
} }); }); if (m1517)
    n2715 = n2715.filter(a => !nodeIds.includes(a.nodeId)); }
var l1518 = false;
function m1519(e) { for (const change of e.documentChanges) {
    switch (change.type) {
        case 'STYLE_CREATE':
            if (!change.style)
                break;
            if (!l1518) {
                change.style.setPluginData('type', NULL);
                change.style.setPluginData('nodeId', NULL);
                change.style.setPluginData('existing', NULL);
            }
            break;
        case 'STYLE_PROPERTY_CHANGE': {
            if (!change.style)
                break;
            if (!l1518) {
                const msg = { cmd: 'uiStylePropertyChange', styleId: j949(change.id), properties: change.properties, name: '', paints: [] };
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
                k1528(msg);
            }
            break;
        }
        case 'STYLE_DELETE':
            k1528({ cmd: 'uiStyleDelete', styleId: change.id });
            break;
    }
} l1518 = false; }
function q1520() { u1509(); k1528({ cmd: 'updateMetrics' }); }
figma.ui.onmessage = function (msg) { msg = JSON.parse(msg); if (msg.cmd == 'returnUiGetValueForFigma')
    return; switch (msg.cmd) {
    case 'figStartGenerator':
        f1521();
        break;
    case 'figRestartGenerator':
        j1522();
        break;
    case 'figFinishStart':
        w1523();
        break;
    case 'figDockWindowNormal':
        q2722('normal');
        break;
    case 'figDockWindowMaximize':
        q2722('maximize');
        break;
    case 'figDockWindowTop':
        q2722('top');
        break;
    case 'figDockWindowLeft':
        q2722('left');
        break;
    case 'figDockWindowRight':
        q2722('right');
        break;
    case 'figDockWindowBottom':
        q2722('bottom');
        break;
    case 'figGetMousePosition':
        m1594(msg.clientPosition);
        break;
    case 'figResizeWindow':
        i1597(msg.width, msg.height);
        break;
    case 'figSetWindowRect':
        k1595(msg.x, msg.y, msg.width, msg.height);
        break;
    case 'figNotify':
        x1598(msg);
        break;
    case 'figGetLocalData':
        b1546(msg.key);
        break;
    case 'figSetLocalData':
        k1547(msg.key, msg.value);
        break;
    case 'figClearAllLocalData':
        l4010();
        break;
    case 'figGetPageData':
        z1548(msg.key);
        break;
    case 'figSetPageData':
        q1549(msg.key, msg.value);
        break;
    case 'figSavePages':
        d1554(msg.pageIds, msg.pageJson, msg.currentPageId);
        break;
    case 'figLoadNodesAndConns':
        r1551(msg.debugMode);
        break;
    case 'figSaveNodes':
        a1555(msg.nodeIds, msg.nodeJson);
        break;
    case 'figGetAllLocalTemplateNames':
        u2719();
        break;
    case 'figSaveLocalTemplate':
        b1556(msg.p4011, msg.template);
        break;
    case 'figRemoveConnsToNodes':
        f1557(msg.nodeIds);
        break;
    case 'figRemoveSavedNodesAndConns':
        a1558(msg.nodeIds);
        break;
    case 'figRemoveAllSavedNodesAndConns':
        t1559();
        break;
    case 'figLogAllSavedNodesAndConns':
        a1560(msg.s3989);
        break;
    case 'figLogAllSavedNodes':
        m1561(msg.s3989);
        break;
    case 'figLogAllSavedConns':
        h1562(msg.s3989);
        break;
    case 'figLogAllSavedPageKeys':
        b1563(msg.s3989);
        break;
    case 'figLogAllSavedPages':
        r1564(msg.s3989);
        break;
    case 'figLogAllSavedConnKeys':
        k1565(msg.s3989);
        break;
    case 'figLogAllLocalData':
        z1566(msg.s3989);
        break;
    case 'figGetValue':
        h1567(msg.key, msg.spec);
        break;
    case 'figRemoveSavedPage':
        i1569(msg.pageId);
        break;
    case 'figRemoveAllSavedPages':
        d1570();
        break;
    case 'figSaveConnection':
        f1571(msg.key, msg.json);
        break;
    case 'figSaveConnections':
        a1572(msg.keys, msg.json);
        break;
    case 'figUpdateSavedConnections':
        x1573(msg.curKeys, msg.newKeys, msg.json);
        break;
    case 'figDeleteSavedConnection':
        p1574(msg.key);
        break;
    case 'figRemoveAllSavedConnections':
        u1575();
        break;
    case 'figDeleteSavedConnectionsToNode':
        v1576(msg.nodeId);
        break;
    case 'figDeleteSavedConnectionsFromNode':
        u1577(msg.nodeId);
        break;
    case 'figRemovePluginDataFromAllLocalStyles':
        p1578();
        break;
    case 'figGetAllLocalVariables':
        g1602(msg.nodeId, msg.px, msg.py);
        break;
    case 'figLinkNodeToVariable':
        n1604(msg.nodeId, msg.variableId);
        break;
    case 'figUpdateVariable':
        figUpdateVariableAsync(msg.variableId, msg.value);
        break;
    case 'figGetAllLocalColorStyles':
        l1579(msg.nodeId, msg.px, msg.py);
        break;
    case 'figLinkNodeToExistingColorStyle':
        c1580(msg.nodeId, msg.styleId);
        break;
    case 'figExport':
        figExport(msg.objectIds, msg.scale, msg.format, msg.suffix);
        break;
    case 'figGetObjectSize':
        o1533(msg.object);
        break;
    case 'figGetVariableUpdates':
        d1568(msg.linkedVarIds);
        break;
    case 'figUpdateShowIds':
        q2783 = msg.q2783;
        break;
    case 'figUpdateObjectCenterSize':
        objectCenterSize = msg.objectCenterSize;
        break;
    case 'figDeleteAllObjects':
        u1509();
        break;
    case 'figUpdateObjectsAndStyles':
        g2728 = 0;
        j2729 = 0;
        msg.objects.forEach(o => o.counted = false);
        d2716(null, msg.objects, msg.v4003, msg.s2051, msg.nodeIds, msg.e2745, msg.g2746, msg.p270);
        l1585(msg);
        break;
    case 'figDeleteObjectsAndStyles':
        a1508(msg.nodeIds);
        u1516(msg.nodeIds, msg.m1517);
        break;
    case 'figDeleteObjectsExcept':
        b1511(msg.nodeIds, msg.ignoreObjects);
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
} k1528({ cmd: 'uiEndFigMessage', msgCmd: msg.cmd }); };
function k1528(msg) { figma.ui.postMessage(JSON.stringify(msg)); }
function k2717(key) {
    return __awaiter(this, void 0, void 0, function* () { return yield figma.clientStorage.getAsync(key); });
}
function b1546(key) { figma.currentPage.loadAsync().then(() => { if (key == 'canvasEmpty') {
    k1528({ cmd: 'uiReturnFigGetLocalData', key: key, value: figma.currentPage.children.length == 0 });
}
else if (key == 'debugWarningCrash') {
    figma.clientStorage.getAsync('debugWarning').then(data => { k1528({ cmd: 'uiReturnFigGetLocalData', key: key, value: data }); });
}
else {
    figma.clientStorage.getAsync(key).then(data => { k1528({ cmd: 'uiReturnFigGetLocalData', key: key, value: data }); });
} }); }
function k1547(key, value, postToUi = true) { figma.clientStorage.setAsync(key, value); if (postToUi) {
    k1528({ cmd: 'uiReturnFigSetLocalData', key: key, value: value });
} }
function l4010() {
    return __awaiter(this, void 0, void 0, function* () { const keys = yield figma.clientStorage.keysAsync(); for (const key of keys)
        figma.clientStorage.deleteAsync(key); });
}
function z1548(key, postToUi = true) {
    return __awaiter(this, void 0, void 0, function* () { yield figma.currentPage.loadAsync(); const data = figma.currentPage.getPluginData(key); if (postToUi) {
        k1528({ cmd: 'uiReturnFigGetPageData', key: key, value: data });
    } return data; });
}
function q1549(key, value) { z1550(key); figma.currentPage.setPluginData(key, value); }
function z1550(key) { figma.currentPage.setPluginData(key, ''); }
function r1551(debugMode) { figma.currentPage.loadAsync().then(() => { const pageKeys = figma.currentPage.getPluginDataKeys().filter(k => f1054(k)); const nodeKeys = figma.currentPage.getPluginDataKeys().filter(k => p1055(k)); const connKeys = figma.currentPage.getPluginDataKeys().filter(k => n1056(k)); if (!debugMode)
    f1553(nodeKeys, connKeys); const pages = pageKeys.map(k => figma.currentPage.getPluginData(k)); const nodes = nodeKeys.map(k => figma.currentPage.getPluginData(k)); const q2122 = connKeys.map(k => figma.currentPage.getPluginData(k)); const pageOrder = figma.currentPage.getPluginData('pageOrder').split(','); const currentPageId = figma.currentPage.getPluginData('currentPageId'); g1552(nodes); const showAllColorSpaces = figma.currentPage.getPluginData('showAllColorSpaces'); k1528({ cmd: 'uiReturnFigLoadNodesAndConns', showAllColorSpaces: showAllColorSpaces, pageKeys: pageKeys, pageJson: pages, pageOrder: pageOrder, currentPageId: currentPageId, nodeKeys: nodeKeys, nodeJson: nodes, connKeys: connKeys, connJson: q2122 }); }); }
function g1552(nodes) { n2715 = []; figma.getLocalPaintStylesAsync().then(paintStyles => { for (const f3002 of nodes) {
    const node = JSON.parse(f3002);
    if (node.type == l1217) {
        const style = paintStyles.find(s => { const nodeId = s.getPluginData('nodeId'); return nodeId == node.id; });
        if (style) {
            n2715.push({ nodeId: node.id, existing: u926(node.existing), styles: [style] });
        }
    }
} }); }
function f1553(nodeKeys, connKeys) { figma.currentPage.loadAsync().then(() => { const d2718 = '"loading": "true"'; const not = '{\n'; const set = '{\n' + j869 + d2718 + ',\n'; nodeKeys.forEach(k => figma.currentPage.setPluginData(k, figma.currentPage.getPluginData(k).replace(set, not).replace(not, set))); connKeys.forEach(k => figma.currentPage.setPluginData(k, figma.currentPage.getPluginData(k).replace(set, not).replace(not, set))); }); }
function d1554(pageIds, pageJson, currentPageId) { for (let i = 0; i < pageIds.length; i++) {
    q1549(u925(pageIds[i]), pageJson[i]);
} q1549('pageOrder', pageIds.join(',')); q1549('currentPageId', currentPageId); }
function a1555(nodeIds, nodeJson) { for (let i = 0; i < nodeIds.length; i++) {
    q1549(j923(nodeIds[i]), nodeJson[i]);
} }
function u2719() {
    return __awaiter(this, void 0, void 0, function* () { let keys = yield figma.clientStorage.keysAsync(); keys = keys.filter(k => k.length >= r877.length && k.substring(0, r877.length) == r877); k1528({ cmd: 'uiReturnGetAllLocalTemplateNames', templateNames: keys }); });
}
function b1556(p4011, template) { k1547(r877 + ' ' + p4011, template); }
function f1557(nodeIds) { figma.currentPage.loadAsync().then(() => { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => n1056(k)); for (const key of connKeys) {
    const parts = m1059(key).split(' ');
    if (nodeIds.includes(parts[0]) || nodeIds.includes(parts[2]))
        z1550(key);
} }); }
function a1558(nodeIds) { figma.currentPage.loadAsync().then(() => { f1557(nodeIds); const nodeKeys = figma.currentPage.getPluginDataKeys().filter(k => p1055(k) && nodeIds.includes(z1058(k))); nodeKeys.forEach(k => z1550(k)); }); }
function t1559() { figma.currentPage.loadAsync().then(() => { const nodeKeys = figma.currentPage.getPluginDataKeys().filter(k => p1055(k)); const connKeys = figma.currentPage.getPluginDataKeys().filter(k => n1056(k)); for (const key of nodeKeys)
    z1550(key); for (const key of connKeys)
    z1550(key); }); }
function a1560(s3989) {
    return __awaiter(this, void 0, void 0, function* () { yield m1561(s3989); h1562(s3989); });
}
function m1561(s3989) {
    return __awaiter(this, void 0, void 0, function* () { yield figma.currentPage.loadAsync(); figma.currentPage.getPluginDataKeys().filter(k => p1055(k)).forEach((k) => __awaiter(this, void 0, void 0, function* () { return yield logSavedNode(k, s3989); })); });
}
function h1562(s3989) { figma.currentPage.loadAsync().then(() => { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => n1056(k)); connKeys.sort((key1, key2) => { const p1 = m1059(key1).split(' '); const p2 = m1059(key2).split(' '); if (p1[2] != p2[2])
    return p1[2] < p2[2] ? -1 : 1; if (p1[3] != p2[3])
    return parseInt(p1[3]) - parseInt(p2[3]); if (p1[2] == p2[0])
    return -1; if (p2[2] == p1[0])
    return 1; return 0; }); connKeys.forEach(k => a2105(JSON.parse(figma.currentPage.getPluginData(k)), s3989)); }); }
function b1563(s3989) { figma.currentPage.loadAsync().then(() => { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => f1054(k)); connKeys.forEach(k => console.log('%c' + k, 'background: #fff; color: ' + (s3989 ? 'black' : 'white'))); const pageOrder = figma.currentPage.getPluginData('pageOrder'); console.log('%c' + pageOrder, 'background: #fff; color: ' + (s3989 ? 'black' : 'white')); }); }
function r1564(s3989) { figma.currentPage.loadAsync().then(() => { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => f1054(k)); connKeys.forEach(k => console.log('%c' + figma.currentPage.getPluginData(k), 'background: #fff; color: ' + (s3989 ? 'black' : 'white'))); const pageOrder = figma.currentPage.getPluginData('pageOrder'); console.log('%c' + pageOrder, 'background: #fff; color: ' + (s3989 ? 'black' : 'white')); }); }
function k1565(s3989) { figma.currentPage.loadAsync().then(() => { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => n1056(k)); connKeys.forEach(k => console.log('%c' + k, 'background: #dff; color: ' + (s3989 ? 'black' : 'white'))); }); }
function z1566(s3989) { figma.clientStorage.keysAsync().then(keys => keys.forEach(k => figma.clientStorage.getAsync(k).then(val => console.log(k + ': ' + val)))); }
function h1567(key, spec) {
    return __awaiter(this, void 0, void 0, function* () { let result = null; switch (key) {
        case 'getVariableData':
            result = yield q1603(spec);
            break;
        case 'getPaidStatus':
            result = figma.payments.status.type;
            break;
        case 'figSubscribe': {
            yield figma.payments.initiateCheckoutAsync({ interstitial: 'PAID_FEATURE' });
            result = figma.payments.status.type;
            break;
        }
    } k1528({ cmd: 'returnFigGetValue', value: result }); });
}
function d1568(varIds) { q1603(varIds).then(values => { k1528({ cmd: 'uiReturnFigGetVariableUpdates', values: values }); }); }
function i1569(pageId) {
    return __awaiter(this, void 0, void 0, function* () { z1550(o935(pageId)); const pageOrder = (yield z1548('pageOrder')).split(','); n948(pageOrder, id => id == pageId); q1549('pageOrder', pageOrder.join(',')); });
}
function d1570() { figma.currentPage.loadAsync().then(() => { const pageKeys = figma.currentPage.getPluginDataKeys().filter(k => f1054(k)); pageKeys.forEach(k => z1550(k)); z1550('pageOrder'); }); }
function f1571(key, json) { q1549(key, json); }
function a1572(_keys, _json) { const keys = JSON.parse(_keys); const json = JSON.parse(_json); for (let i = 0; i < keys.length; i++)
    q1549(keys[i], json[i]); }
function x1573(_curKeys, _newKeys, _json) { const curKeys = JSON.parse(_curKeys); const newKeys = JSON.parse(_newKeys); const json = JSON.parse(_json); for (let i = 0; i < curKeys.length; i++) {
    z1550(curKeys[i]);
    q1549(newKeys[i], json[i]);
} }
function p1574(key) { z1550(key); }
function u1575() { figma.currentPage.loadAsync().then(() => { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => n1056(k)); connKeys.forEach(k => z1550(k)); }); }
function v1576(nodeId) { figma.currentPage.loadAsync().then(() => { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => n1056(k)); for (const key of connKeys) {
    const parts = key.split(' ');
    if (parts[4] == nodeId)
        z1550(key);
} }); }
function u1577(nodeId) { figma.currentPage.loadAsync().then(() => { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => n1056(k)); for (const key of connKeys) {
    const parts = key.split(' ');
    if (parts[1] == nodeId)
        z1550(key);
} }); }
function p1578() { figma.getLocalPaintStylesAsync().then(r1582 => { for (const style of r1582) {
    style.setPluginData('type', '');
    style.setPluginData('nodeId', '');
    style.setPluginData('existing', '');
} }); }
function figSaveSnapshot(index, objectIds) {
    return __awaiter(this, void 0, void 0, function* () { const objects = yield figGetObjectsFromIds(objectIds); const group = figma.group(objects, figma.currentPage); const settings = { format: 'PNG' }; const icon = yield group.exportAsync(settings); figma.ungroup(group); k1528({ cmd: 'uiReturnFigSaveSnapshot', index: index, iconWidth: group.width, iconHeight: group.height, icon: icon }); });
}
var f2720 = null;
var w4012 = () => f2720 = null;
var j2721 = 'normal';
function m1594(clientPosition) { k1528({ cmd: 'uiReturnFigGetMousePosition', position: { x: 0, y: 0 }, clientPosition: clientPosition, viewportZoom: figma.viewport.zoom, viewportRect: figma.viewport.bounds }); }
function k1595(x, y, width, height) { return; }
function o1596(dock, rect, bounds) { switch (dock) {
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
function i1597(width, height) { (function () {
    return __awaiter(this, void 0, void 0, function* () { width = Math.floor(Math.max(0, width)); height = Math.floor(Math.max(0, height)); figma.ui.resize(width, height); yield figma.currentPage.loadAsync(); figma.currentPage.setPluginData(figma.currentUser.id + ',windowWidth', width.toString()); figma.currentPage.setPluginData(figma.currentUser.id + ',windowHeight', height.toString()); k1528({ cmd: 'uiReturnFigResizeWindow', width: width, height: height }); });
})(); }
function q2722(dock) {
    return __awaiter(this, void 0, void 0, function* () { if (dock != 'normal' && j2721 == 'normal') {
        figma.clientStorage.setAsync('normalWindowX', yield figma.clientStorage.getAsync('normalWindowX'));
        figma.clientStorage.setAsync('normalWindowY', yield figma.clientStorage.getAsync('normalWindowY'));
        figma.clientStorage.setAsync('normalWindowWidth', yield figma.clientStorage.getAsync('normalWindowWidth'));
        figma.clientStorage.setAsync('normalWindowHeight', yield figma.clientStorage.getAsync('normalWindowHeight'));
    } j2721 = dock; figma.clientStorage.setAsync('windowDock', dock); i1597(yield figma.clientStorage.getAsync('windowWidth'), yield figma.clientStorage.getAsync('windowHeight')); });
}
function x1598(msg) { w1599(msg.text, msg.prefix, msg.delay, msg.error, msg.n1600, msg.u1601); }
function w1599(text, prefix = 'Generator ', delay = 400, error = false, n1600 = '', u1601 = NULL) { const options = { timeout: delay, error: error, onDequeue: w4012 }; if (n1600 != '') {
    options['button'] = { text: n1600 };
    if (u1601.substring(0, 'removeConnection'.length) == 'removeConnection') {
        options['button']['action'] = () => p1574(u1601.split(',')[1]);
    }
    else {
        switch (u1601) {
            case 'hideClearUndoWarning':
                options['button']['action'] = () => k1528({ cmd: 'uiHideClearUndoWarning' });
                break;
        }
    }
} if (f2720)
    f2720.cancel(); f2720 = figma.notify(prefix + text, options); }
function r2723(key, params = null) {
    return __awaiter(this, void 0, void 0, function* () { return yield u2724(key, params); });
}
function u2724(key, params = null) {
    return __awaiter(this, void 0, void 0, function* () { return new Promise((resolve, reject) => { const timeout = 60000; k1528(Object.assign({ cmd: 'uiGetValueForFigma', key: key }, (params || {}))); const x2725 = setTimeout(() => reject(new Error('Timeout: Result not received by Figma within the specified time')), timeout); function a4013(msg) { msg = JSON.parse(msg); if (msg.cmd === 'returnUiGetValueForFigma') {
        clearTimeout(x2725);
        resolve({ key: msg.key, value: msg.value });
        figma.ui.off('message', a4013);
    } } figma.ui.on('message', a4013); }); });
}
var l2726 = [];
var o2727 = [];
var g2728 = 0;
var j2729 = 0;
function z1529(h111) { return (h111[i1391] === 2 ? '' : x873) + (q2783 ? h111[n1385] : h111[g1387]); }
function c1530(c1514, addObject = null, addProps = true, transform = true) {
    return __awaiter(this, void 0, void 0, function* () { if (!b1532(c1514))
        return null; let w1515; switch (c1514[y1383]) {
        case j1220:
            w1515 = r2697(c1514, addProps, transform);
            break;
        case d1223:
            w1515 = z2776(c1514, addProps, transform);
            break;
        case d1226:
            w1515 = b2772(c1514, addProps, transform);
            break;
        case i1238:
            w1515 = p2693(c1514, addProps, transform);
            break;
        case u1241:
            w1515 = b2700(c1514, addProps, transform);
            break;
        case b1244:
            w1515 = o2703(c1514, addProps, transform);
            break;
        case s1247:
            w1515 = v2679(c1514);
            break;
        case o1251:
            w1515 = c2731(c1514, addProps, transform);
            break;
        case s1263:
            w1515 = s2732(c1514, addProps, transform);
            break;
        case z1286:
            w1515 = yield f2733(c1514, addProps, transform);
            break;
        case q1266:
            w1515 = yield u2734(c1514);
            break;
        case h1269:
            w1515 = yield h2735(c1514, addProps, transform);
            break;
    } if (addObject && w1515 != undefined && w1515 != null && !w1515.removed) {
        w1515.name = z1529(c1514);
        u955(c1514[y1383] == q1266 || !!w1515, 'no Figma object created');
        if (w1515 != undefined && w1515 != null) {
            w1515.setPluginData('retain', c1514[i1391].toString());
            if (c1514[i1391] < 2) {
                w1515.setPluginData('userId', figma.currentUser.id);
                w1515.setPluginData('sessionId', figma.currentUser.sessionId.toString());
                w1515.setPluginData('type', c1514[y1383]);
                w1515.setPluginData('nodeId', c1514[m1384]);
                w1515.setPluginData('objectId', c1514[n1385]);
                w1515.setPluginData('isCenter', x940(c1514[k1406]));
                if (c1514[y1383] == s1247)
                    q2749.push(w1515);
                if (c1514[i1405])
                    n1545(w1515);
            }
            addObject(w1515);
        }
    } if (!c1514.counted) {
        j2729++;
        c1514.counted = true;
    } return w1515; });
}
function d1531(w1515, c1514, addProps, transform) {
    return __awaiter(this, void 0, void 0, function* () { if (!b1532(c1514) || w1515 == undefined || w1515 == null || w1515.removed)
        return; w1515.name = z1529(c1514); w1515.setPluginData('retain', c1514[i1391].toString()); switch (c1514[y1383]) {
        case j1220:
            d2698(w1515, c1514, addProps, transform);
            break;
        case d1223:
            q2777(w1515, c1514, addProps, transform);
            break;
        case d1226:
            q2773(w1515, c1514, addProps, transform);
            break;
        case i1238:
            d2694(w1515, c1514, addProps, transform);
            break;
        case u1241:
            s2701(w1515, c1514, addProps, transform);
            break;
        case b1244:
            b2704(w1515, c1514, addProps, transform);
            break;
        case s1247:
            x2736(w1515, c1514);
            break;
        case o1251:
            z2737(w1515, c1514, addProps, transform);
            break;
        case s1263:
            j2738(w1515, c1514, addProps, transform);
            break;
        case z1286:
            n2739(w1515, c1514, addProps, transform);
            break;
        case q1266:
            y2740(w1515, c1514);
            break;
        case h1269:
            x2741(w1515, c1514, addProps, transform);
            break;
    } if (w1515 != undefined && w1515 != null && !w1515.removed) {
        if (w1515.parent == figma.currentPage)
            yield figma.currentPage.loadAsync();
        w1515.parent.appendChild(w1515);
        if (c1514[i1405])
            n1545(w1515);
    } if (!c1514.counted) {
        j2729++;
        c1514.counted = true;
    } });
}
function d2716(j2742, z2743, k2744, s2051 = -1, nodeIds = [], e2745 = false, g2746 = false, p270 = false, addProps = true, transform = true) {
    return __awaiter(this, void 0, void 0, function* () { let y2747 = NULL; let e2748 = null; let abort = false; const i3626 = []; let x2730 = 0; l2726.push(...nodeIds); if (s2051 > -1)
        g2728 = s2051; for (const c1514 of z2743) {
        o2727.push(c1514);
        if (c1514[m1384] != y2747) {
            y2747 = c1514[m1384];
            e2748 = l2713.find(a => a.nodeId == c1514[m1384]);
            if (!e2748) {
                l2713.push(e2748 = { nodeId: c1514[m1384], objects: [] });
            }
        }
        const addObject = w1515 => { if (j2742 != undefined && j2742 != null && !j2742.removed)
            j2742.appendChild(w1515);
        else
            e2748.objects.push(w1515); };
        let objects = j2742 != undefined && j2742 != null && !j2742.removed ? j2742.children : e2748.objects;
        let w1515 = objects.find(o => o.removed || o.getPluginData('userId') == figma.currentUser.id && o.getPluginData('objectId') == c1514[n1385]);
        if (w1515 != undefined && w1515 != null && w1515.removed) {
            v941(objects, w1515);
            if (q2749.includes(w1515))
                f946(q2749, w1515);
            if (b2765.includes(w1515))
                f946(b2765, w1515);
        }
        if (w1515 == undefined || w1515 == null || w1515.removed) {
            const newObj = yield c1530(c1514, addObject, addProps, transform);
            i3626.push(newObj);
        }
        else if (w1515 != undefined && w1515 != null && !w1515.removed && w1515.getPluginData('type') == c1514[y1383].toString()) {
            yield d1531(w1515, c1514, addProps, transform);
            if (w1515 != undefined && w1515 != null && !w1515.removed)
                i3626.push(w1515);
        }
        else {
            w1515.remove();
            if (q2749.includes(w1515))
                f946(q2749, w1515);
            if (b2765.includes(w1515))
                f946(b2765, w1515);
            yield c1530(c1514, addObject, addProps, transform);
        }
        x2730++;
        if (x2730 >= k2744) {
            const result = yield r2723('returnObjectUpdate', { g2728: g2728, j2729: j2729 });
            abort = result.value;
            x2730 = 0;
            if (abort)
                break;
        }
    } if (j2742 != undefined && j2742 != null && !j2742.removed) {
        for (const w1515 of j2742.children) {
            if (w1515 != undefined && w1515 != null && w1515.removed || !z2743.find(o => o[n1385] == w1515.getPluginData('objectId') && w1515.getPluginData('userId') == figma.currentUser.id))
                w1515.remove();
        }
    } for (const point of q2749) {
        if (point.parent == figma.currentPage)
            yield figma.currentPage.loadAsync();
        if (point != undefined && point != null && !point.removed && !point.parent.removed)
            point.parent.appendChild(point);
    } if (g2746 && !abort) {
        b1511(l2726, o2727);
        l2726 = [];
        o2727 = [];
        if (p270 && i3626.length > 0) {
            figma.viewport.scrollAndZoomIntoView(i3626);
            const bounds = t1535(i3626);
            figma.viewport.zoom = Math.min(figma.viewport.bounds.width * figma.viewport.zoom / bounds.width - 0.05, figma.viewport.bounds.height * figma.viewport.zoom / bounds.height - 0.05);
        }
    } yield r2723('returnObjectUpdate', { g2728: g2728, j2729: j2729 }); });
}
function b1532(c1514) { switch (c1514[y1383]) {
    case j1220: return p2696(c1514);
    case d1223: return t2758(c1514);
    case d1226: return d2759(c1514);
    case i1238: return f4009(c1514);
    case u1241: return t2699(c1514);
    case b1244: return q2702(c1514);
    case s1247: return h4008(c1514);
    case o1251: return h2760(c1514);
    case s1263: return l2761(c1514);
    case z1286: return d2762(c1514);
    case q1266: return u2763(c1514);
    case h1269: return e2764(c1514);
} }
function o1533(c1514) {
    return __awaiter(this, void 0, void 0, function* () { (() => __awaiter(this, void 0, void 0, function* () { const w1515 = yield c1530(c1514); const width = w1515.width; const height = w1515.height; w1515.remove(); k1528({ cmd: 'uiForwardToGenerator', msg: { cmd: 'returnFigGetObjectSize', objectId: c1514[n1385], width: width, height: height } }); }))(); });
}
function j1534(w1515) { w1515.setPluginData('type', ''); w1515.setPluginData('nodeId', ''); w1515.setPluginData('userId', ''); w1515.setPluginData('sessionId', ''); w1515.setPluginData('objectId', ''); w1515.setPluginData('isCenter', ''); w1515.setPluginData('retain', ''); }
function t1535(objects) { const bounds = { left: 0, top: 0, right: 0, bottom: 0 }; for (const h111 of objects) {
    if (h111.x < bounds.left || bounds.left == bounds.right)
        bounds.left = h111.x;
    if (h111.y < bounds.top || bounds.top == bounds.bottom)
        bounds.top = h111.y;
    if (h111.x + h111.width > bounds.right || bounds.left == bounds.right)
        bounds.right = h111.x + h111.width;
    if (h111.y + h111.height > bounds.bottom || bounds.top == bounds.bottom)
        bounds.bottom = h111.y + h111.height;
} return { x: bounds.left, y: bounds.top, width: bounds.right - bounds.left, height: bounds.bottom - bounds.top }; }
function figExport(objectIds, scale, format, suffix) {
    return __awaiter(this, void 0, void 0, function* () { yield figma.currentPage.loadAsync(); for (const objId of objectIds) {
        let w1515 = figma.currentPage.children.find(o => !o.removed && o.getPluginData('userId') == figma.currentUser.id && o.getPluginData('objectId') == objId);
        if (!w1515)
            continue;
        const settings = { constraint: { type: 'SCALE', value: scale }, format: format == 0 ? 'PNG' : 'JPG', suffix: suffix };
        yield w1515.exportAsync(settings);
    } });
}
const b2765 = [];
const v2766 = [];
function t1536(p1537, m1538) { const effects = []; for (const effect of p1537) {
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
                if (m1538 && !isNaN(spread))
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
function g2686(w1515, c1514, phantom = true) { w1541(w1515, c1514); n2687(w1515, c1514, phantom); b2688(w1515, c1514); w1515.opacity = c1514[f1407]; w1515.blendMode = c1514[n1408]; const maskType = c1514[i1409]; w1515.isMask = maskType > 0; if (w1515.isMask) {
    switch (maskType) {
        case 1:
            w1515.maskType = 'ALPHA';
            break;
        case 2:
            w1515.maskType = 'VECTOR';
            break;
        case 3:
            w1515.maskType = 'LUMINANCE';
            break;
    }
} if (w1515.isMask && w1515.fills.length == 0 && w1515.strokes.length == 0)
    w1515.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 }, opacity: 1, blendMode: 'NORMAL' }]; }
function b2688(w1515, c1514) { if (!!c1514[w1396] && !isEmpty(c1514[w1396])) {
    w1515.fills = l959(c1514[w1396]);
    if (b2765.includes(w1515))
        f946(b2765, w1515);
}
else
    w1515.fills = []; }
function n2687(w1515, c1514, phantom = true) { if (c1514[q1397] != null && !isEmpty(c1514[q1397])) {
    x1540(w1515, l959(c1514[q1397]), c1514[r1398], c1514[l1399], c1514[x1400], c1514[r1401], c1514[n1402], p2689(c1514[n1403]));
    if (c1514[i1405])
        w1515.setPluginData('dashes', c1514[n1403]);
    if (b2765.includes(w1515))
        f946(b2765, w1515);
    if (c1514[i1405])
        a952(v2766, w1515);
}
else if (isEmpty(c1514[w1396]) && isEmpty(c1514[q1397]) && !c1514[i1409] && phantom) {
    p1543(w1515);
    a952(b2765, w1515);
}
else
    w1515.strokes = []; }
function p2689(n1539) { n1539 = n1539; n1539 = h957(n1539, ','); n1539 = y958(n1539, ','); n1539 = n1539.trim(); return n1539 == '' ? [] : n1539.split(',').map(s => Math.max(0, parseFloat(s))); }
function r2690(n1539) { n1539 = n1539; n1539 = h957(n1539, ','); n1539 = y958(n1539, ','); n1539 = n1539.trim(); return n1539 == '' ? [] : n1539.split(',').map(s => Math.max(0, parseFloat(s) / j2692)); }
function x1540(w1515, fills, weight, align, join, miterLimit, cap, dashes = []) { w1515.strokes = fills; w1515.strokeWeight = Math.max(0, weight); w1515.strokeAlign = align; w1515.strokeJoin = join; const miterAngle = miterLimit / 360 * Tau; const m2767 = 1 / Math.sin(miterAngle / 2); w1515.strokeMiterLimit = Math.min(Math.max(0, m2767), 16); w1515.strokeCap = cap; w1515.dashPattern = dashes; }
function w1541(w1515, c1514) { if (!!c1514[p1404] && !isEmpty(c1514[p1404])) {
    const m1538 = c1514[y1383] == j1220 || c1514[y1383] == d1226 || c1514[y1383] == h1269;
    w1515.effects = t1536(c1514[p1404], m1538);
}
else
    w1515.effects = []; }
function j1542() { for (const h111 of b2765) {
    if (h111.removed)
        f946(b2765, h111);
    else
        p1543(h111);
} }
function p1543(h111) { figma.currentPage.loadAsync().then(() => { const back = figma.currentPage.backgrounds.find(b => b.type == 'SOLID'); let phantomColor; if (back) {
    const l = back.color.r * 0.2126 + back.color.g * 0.7152 + back.color.b * 0.0722;
    phantomColor = l > 0.5 ? { r: 0, g: 0, b: 0 } : { r: 1, g: 1, b: 1 };
}
else
    phantomColor = { r: 1, g: 0, b: 1 }; x1540(h111, [{ type: 'SOLID', color: phantomColor, opacity: 0.5 }], 1 / j2692, 'CENTER', 'MITER', 1, 'NONE', [1 / j2692, 2 / j2692]); }); }
function h1544() { for (const w1515 of v2766) {
    if (w1515.removed)
        f946(v2766, w1515);
    else
        n1545(w1515);
} }
function n1545(w1515) { w1515.strokeWeight = Math.max(0, 1.5 / j2692); if (u926(w1515.getPluginData('isCenter'))) {
    const path = w1515.vectorPaths[0];
    const parts = path.data.split(' ');
    let t = { x: parseFloat(parts[1]), y: parseFloat(parts[2]) };
    let c = { x: parseFloat(parts[4]), y: parseFloat(parts[5]) };
    let r = { x: parseFloat(parts[7]), y: parseFloat(parts[8]) };
    const a = 2;
    const b = 0.05;
    const f = 1 - Math.pow(1 - Math.min(j2692, 1), a) / Math.pow(a, b);
    t = b898(c, i900(y885(i903(t, c)), objectCenterSize / f));
    r = b898(c, i900(y885(i903(r, c)), objectCenterSize / f));
    parts[1] = t.x;
    parts[2] = t.y;
    parts[4] = c.x;
    parts[5] = c.y;
    parts[7] = r.x;
    parts[8] = r.y;
    const q2768 = { windingRule: path.windingRule, data: parts.join(' ') };
    w1515.vectorPaths = [q2768];
} const dashes = w1515.getPluginData('dashes'); if (dashes != '')
    w1515.dashPattern = r2690(dashes); }
function l1579(nodeId, px, py) { figma.getLocalPaintStylesAsync().then(_styles => { const styles = new Array(); for (const m168 of _styles) {
    const _nodeId = m168.getPluginData('nodeId');
    const _existing = m168.getPluginData('existing');
    const existing = !!_existing;
    const style = { id: m168.id, nodeId: _nodeId, name: m168.name, existing: existing, paints: new Array() };
    let onlyPaint = true;
    for (const p2770 of m168.paints) {
        if (p2770.type == 'SOLID') {
            style.paints.push([p2770.color.r, p2770.color.g, p2770.color.b, p2770.opacity]);
        }
        else {
            onlyPaint = false;
            break;
        }
    }
    if (onlyPaint)
        styles.push(style);
} k1528({ cmd: 'uiReturnFigGetAllLocalColorStyles', nodeId: nodeId, px: px, py: py, styles: JSON.stringify(styles) }); }); }
function c1580(nodeId, styleId) { figma.getLocalPaintStylesAsync().then(r1582 => { if (styleId != NULL)
    q1581(r1582, nodeId, styleId);
else
    u1583(r1582, nodeId); }); }
function q1581(r1582, nodeId, styleId, clearExisting = true) { const d2769 = n2715.find(a => a.nodeId == nodeId); if (d2769 && clearExisting)
    u1583(r1582, nodeId); const w1587 = r1582.find(s => s.id == styleId); u955(!!w1587, 'figStyle should be found here'); w1587.setPluginData('type', l1217); w1587.setPluginData('nodeId', nodeId); w1587.setPluginData('existing', x940(true)); n2715.push({ nodeId: nodeId, existing: true, styles: [w1587] }); return w1587; }
function u1583(r1582, nodeId) { const w1587 = r1582.find(s => s.getPluginData('nodeId') == nodeId); u955(!!w1587, 'figStyle should be found here'); if (w1587) {
    w1587.setPluginData('type', NULL);
    w1587.setPluginData('nodeId', NULL);
    w1587.setPluginData('existing', NULL);
    n948(n2715, a => a.nodeId == nodeId);
} return w1587; }
function z1584(styles, l1588) { const w1587 = figma.createPaintStyle(); w1587.setPluginData('type', l1588[y1383]); w1587.setPluginData('nodeId', l1588[m1384]); w1587.name = l1588[n1388]; setStylePaints(w1587, l1588); styles.push(w1587); k1528({ cmd: 'uiSetStyleId', nodeId: l1588[m1384], styleId: w1587.id }); return w1587; }
function l1585(msg) { let y2747 = NULL; let d2769; for (const l1588 of msg.styles) {
    if (l1588[m1384] != y2747) {
        y2747 = l1588[m1384];
        d2769 = n2715.find(a => a.nodeId == l1588[m1384]);
        if (!d2769) {
            d2769 = { nodeId: l1588[m1384], styles: [] };
            n2715.push(d2769);
        }
    }
    else
        d2769 = null;
    const w1587 = d2769.styles[0];
    figma.getLocalPaintStylesAsync().then(r1582 => { const localStyle = r1582.find(s => s.getPluginData('nodeId') == l1588[m1384]); if (isValid(w1587) && !isValid(localStyle)) {
        v941(d2769.styles, w1587);
    } const existing = isValid(w1587) && isValid(localStyle) && w1587.getPluginData('existing'); if (!isValid(w1587) || !isValid(localStyle)) {
        if (!existing) {
            l1518 = true;
            c1580(l1588[m1384], l1588[h1386]);
        }
    }
    else if (isValid(w1587) && w1587.getPluginData('type') == l1588[y1383]) {
        l1518 = true;
        w1586(localStyle, l1588);
    } });
} }
function w1586(w1587, l1588) { setStylePaints(w1587, l1588); w1587.name = l1588[n1388]; }
function getStylePaints(stylePaints) { const paints = new Array(); for (const p2770 of stylePaints) {
    const fill = p2770[1].split(' ');
    switch (p2770[0]) {
        case 'SOLID':
            paints.push({ type: 'SOLID', color: { r: Math.min(Math.max(0, parseFloat(fill[0]) / 0xff), 1), g: Math.min(Math.max(0, parseFloat(fill[1]) / 0xff), 1), b: Math.min(Math.max(0, parseFloat(fill[2]) / 0xff), 1) }, opacity: Math.min(Math.max(0, parseFloat(fill[3]) / 100), 1) });
            break;
    }
} return paints; }
function setStylePaints(w1587, l1588) { if (!isEmpty(l1588[r1390]))
    w1587.paints = getStylePaints(l1588[r1390]);
else
    w1587.paints = []; }
function g1602(nodeId, px, py) {
    return __awaiter(this, void 0, void 0, function* () { figma.variables.getLocalVariablesAsync().then((d2771) => __awaiter(this, void 0, void 0, function* () { const variables = new Array(); for (const _var of d2771) {
        const collection = yield figma.variables.getVariableCollectionByIdAsync(_var.variableCollectionId);
        const variable = { id: _var.id, resolvedType: _var.resolvedType, name: _var.name, collectionName: collection.name };
        variables.push(variable);
    } figma.variables.getLocalVariableCollectionsAsync().then((collections) => __awaiter(this, void 0, void 0, function* () { k1528({ cmd: 'uiReturnFigGetAllLocalVariables', nodeId: nodeId, px: px, py: py, variables: JSON.stringify(variables), nCollections: collections.length }); })); })); });
}
function q1603(varIds) {
    return __awaiter(this, void 0, void 0, function* () { const d2771 = yield figma.variables.getLocalVariablesAsync(); const variables = varIds.map(id => d2771.find(v => v.id == id)); let values = []; for (let i = 0; i < varIds.length; i++) {
        const variable = variables[i];
        const collection = variable != undefined ? (yield figma.variables.getVariableCollectionByIdAsync(variable.variableCollectionId)) : null;
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
            values.push({ id: varIds[i], name: variable.name, resolvedType: variable.resolvedType, value: vals[0] });
        }
        else {
            values.push({ id: varIds[i], resolvedType: NULL, value: null });
        }
    } return values; });
}
function n1604(nodeId, varId) { figma.variables.getLocalVariablesAsync().then(d2771 => { figLinkVariableAsync(d2771, nodeId, varId); }); }
function figUpdateVariableAsync(varId, value) {
    return __awaiter(this, void 0, void 0, function* () { figma.variables.getLocalVariablesAsync().then((d2771) => __awaiter(this, void 0, void 0, function* () { let variable = d2771.find(v => v.id == varId); if (!variable)
        return; let collection = yield figma.variables.getVariableCollectionByIdAsync(variable.variableCollectionId); let mode = collection.modes[0]; let curValue = variable.valuesByMode[mode.modeId]; while (curValue && curValue.hasOwnProperty('type') && curValue['type'] === 'VARIABLE_ALIAS') {
        variable = yield figma.variables.getVariableByIdAsync(curValue['id']);
        curValue = variable.valuesByMode[mode.modeId];
        collection = yield figma.variables.getVariableCollectionByIdAsync(variable.variableCollectionId);
        mode = collection.modes[0];
    } if (value !== null) {
        if (variable.resolvedType == 'BOOLEAN')
            value = value != 0;
        else
            variable.setValueForMode(mode.modeId, value);
    } })); });
}
function figLinkVariableAsync(d2771, nodeId, varId) {
    return __awaiter(this, void 0, void 0, function* () { let variable = d2771.find(v => v.id == varId); if (!variable)
        return null; const [resolvedVar, values] = yield figGetResolvedVariableValuesAsync(variable); k1528({ cmd: 'uiReturnFigLinkNodeToVariable', nodeId: nodeId, variableId: resolvedVar ? resolvedVar.id : NULL, variableName: resolvedVar ? resolvedVar.name : '', resolvedType: resolvedVar ? resolvedVar.resolvedType : NULL, values: values }); return resolvedVar; });
}
function figGetResolvedVariableValuesAsync(variable) {
    return __awaiter(this, void 0, void 0, function* () { const values = []; if (!variable)
        return values; const collection = yield figma.variables.getVariableCollectionByIdAsync(variable.variableCollectionId); for (const mode of collection.modes) {
        let value = variable.valuesByMode[mode.modeId];
        while (value && value['type'] === 'VARIABLE_ALIAS') {
            variable = yield figma.variables.getVariableByIdAsync(value.id);
            value = variable.valuesByMode[mode.modeId];
        }
        values.push(value);
    } return [variable, values]; });
}
function i1589(tl, tr, bl) { let vr = point(tr.x - tl.x, tr.y - tl.y); let vb = point(bl.x - tl.x, bl.y - tl.y); let sx = vr.x; let sy = vb.y; let kx = -vr.y; let ky = -vb.x; let dx = -tl.x; let dy = -tl.y; const _sx = kx / nozero(sx); const _sy = ky / nozero(sy); let i4190 = f888([[1, _sy, 0], [_sx, 1, 0], [0, 0, 1]], u892(dx, dy)); i4190 = y890(i4190); const a = h882(vr); if (a > Tau / 4 && a < Tau * 3 / 4)
    i4190 = f888(i4190, u892(0, 0, 1, 1, Tau / 2)); if (determinant(i4190) < 0)
    i4190 = f888(i4190, u892(0, 0, -1, 1, 0)); return i4190; }
function r1590(w1515, tl, tr, bl) { const i4190 = i1589(tl, tr, bl); w1515.relativeTransform = [i4190[0], i4190[1]]; }
function n1591(w1515, c1514, setSize = true, noHeight = 0.01) { if (!c1514[r1392] || !c1514[i1393] || !c1514[c1394])
    return; const xp0 = c1514[r1392]; const xp1 = c1514[i1393]; const xp2 = c1514[c1394]; r1590(w1515, xp0, xp1, xp2); if (setSize) {
    const e893 = distv(xp0, xp1);
    const m894 = distv(xp0, xp2);
    const height = c1514[y1383] == b1244 ? c1514[a1427] : c1514[v1414];
    if (!w1515.removed) {
        w1515.resizeWithoutConstraints(Math.max(0.01, e893), height ? Math.max(0.01, m894) : noHeight);
    }
} }
function o1592(h2684, y2685) { if (h2684.removed)
    return; h2684.resizeWithoutConstraints(0.01, 0.01); h2684.setPluginData('actualX', y2685[j1410].toString()); h2684.setPluginData('actualY', y2685[e1412].toString()); h2684.x = y2685[j1410]; h2684.y = y2685[e1412]; h2684.rotation = y2685[k1406] ? 45 : 0; }
function s1593(h2684) { if (!h2684.removed)
    h2684.resizeWithoutConstraints(0.01, 0.01); }
function d2762(genBool) { return true; }
function f2733(genBool, addProps, transform) {
    return __awaiter(this, void 0, void 0, function* () { let objects = []; for (const h111 of genBool[FO_BOOLEAN_CHILDREN])
        yield c1530(h111, o => objects = [...objects, o], false); yield figma.currentPage.loadAsync(); let figBool = null; if (!isEmpty(objects)) {
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
    } if (figBool) {
        figBool.expanded = false;
        n2739(figBool, genBool, addProps, transform);
    } return figBool; });
}
function n2739(figBool, genBool, addProps, transform) {
    return __awaiter(this, void 0, void 0, function* () { if (genBool[FO_BOOLEAN_CHILDREN].length == 0) {
        figBool.remove();
        return;
    } yield d2716(figBool, genBool[FO_BOOLEAN_CHILDREN], genBool[FO_BOOLEAN_CHILDREN].length, -1, [], false, false, false, false, true); const hasProps = genBool[w1396].length > 0 || genBool[q1397].length > 0 || genBool[p1404].length > 0; g2686(figBool, genBool, !hasProps && addProps); });
}
function d2759(g2750) { return g2750[j1410] != null && !isNaN(g2750[j1410]) && g2750[e1412] != null && !isNaN(g2750[e1412]) && g2750[w1413] != null && !isNaN(g2750[w1413]) && g2750[v1414] != null && !isNaN(g2750[v1414]) && g2750[w1416] != null && !isNaN(g2750[w1416]) && g2750[i1423] != null && !isNaN(g2750[i1423]) && g2750[n1429] != null && !isNaN(g2750[n1429]) && g2750[l1433] != null && !isNaN(g2750[l1433]); }
function b2772(g2750, addProps, transform) { if (!d2759(g2750))
    return null; const e2751 = figma.createEllipse(); q2773(e2751, g2750, addProps, transform, true); return e2751; }
function q2773(e2751, g2750, addProps, transform, isValid = false) { if (!isValid && !d2759(g2750))
    return; v2774(e2751, g2750, transform); if (q2749.includes(e2751))
    o2681(e2751);
else
    g2686(e2751, g2750, addProps); }
function v2774(e2751, g2750, transform) { e2751.cornerRadius = g2750[w1416]; const start = g2750[i1423] / 360 * (Math.PI * 2); const sweep = g2750[n1429] / 100 * (Math.PI * 2); e2751.arcData = { startingAngle: start, endingAngle: start + sweep, innerRadius: Math.min(Math.max(0, g2750[l1433] / 100), 1) }; if (transform)
    n1591(e2751, g2750); }
function e2764(n2752) { return n2752[j1410] != null && !isNaN(n2752[j1410]) && n2752[e1412] != null && !isNaN(n2752[e1412]) && n2752[w1413] != null && !isNaN(n2752[w1413]) && n2752[v1414] != null && !isNaN(n2752[v1414]) && n2752[x1422] != null && !isNaN(n2752[x1422]); }
function h2735(n2752, addProps, transform) {
    return __awaiter(this, void 0, void 0, function* () { if (!e2764(n2752))
        return null; const j2753 = figma.createFrame(); j2753.expanded = false; if (j2753) {
        i2775(j2753, n2752, addProps, transform);
        let objects = [];
        for (const h111 of n2752[i1428])
            yield c1530(h111, o => objects = [...objects, o]);
        for (const h111 of objects)
            j2753.appendChild(h111);
    } return j2753; });
}
function x2741(j2753, n2752, addProps, transform) { i2775(j2753, n2752, addProps, transform); d2716(j2753, n2752[i1428], n2752[i1428].length); }
function i2775(j2753, n2752, addProps, transform) { j2753.cornerRadius = n2752[x1422]; if (transform)
    n1591(j2753, n2752); g2686(j2753, n2752, addProps && n2752[i1428].length == 0); }
function u2763(o2754) { return true; }
function u2734(o2754) {
    return __awaiter(this, void 0, void 0, function* () { let objects = []; for (const h111 of o2754[u1411])
        yield c1530(h111, o => objects = [...objects, o]); yield figma.currentPage.loadAsync(); const r2755 = !isEmpty(objects) ? figma.group(objects, figma.currentPage) : null; if (r2755) {
        r2755.expanded = false;
        y2740(r2755, o2754);
    } return r2755; });
}
function y2740(r2755, o2754) { if (o2754[u1411].length == 0) {
    r2755.remove();
    return;
} d2716(r2755, o2754[u1411], o2754[u1411].length); w1541(r2755, o2754); }
function t2758(c2756) { return c2756[j1410] != null && !isNaN(c2756[j1410]) && c2756[e1412] != null && !isNaN(c2756[e1412]) && c2756[w1413] != null && !isNaN(c2756[w1413]); }
function z2776(c2756, addProps, transform) { if (!t2758(c2756))
    return null; const z2757 = figma.createLine(); q2777(z2757, c2756, addProps, transform, true); return z2757; }
function q2777(z2757, c2756, addProps, transform, isValid = false) { if (!isValid && !t2758(c2756))
    return; if (transform)
    n1591(z2757, c2756, true, 0); g2686(z2757, c2756, addProps); }
var q2749 = [];
function h4008(y2685) { return y2685[j1410] != null && !isNaN(y2685[j1410]) && y2685[e1412] != null && !isNaN(y2685[e1412]); }
function v2679(y2685) { const h2684 = y2685[k1406] ? figma.createRectangle() : figma.createEllipse(); if (!h4008(y2685))
    return h2684; if (q2749.includes(h2684))
    k2683(h2684, y2685);
else
    x2736(h2684, y2685); return h2684; }
function x2736(h2684, y2685) { o1592(h2684, y2685); o2682(h2684); }
function a2680() { k1528({ cmd: 'uiUpdateZoom', zoom: figma.viewport.zoom }); for (const point of q2749)
    o2681(point); }
function o2681(h2684) { s1593(h2684); o2682(h2684); }
function k2683(h2684, y2685) { o1592(h2684, y2685); o2682(h2684); }
function o2682(h2684) { if (h2684.removed)
    return; figma.currentPage.loadAsync().then(() => { const isCenter = u926(h2684.getPluginData('isCenter')); const y2691 = figma.currentPage.selection.includes(h2684); const color = isCenter ? [0xf2, 0x48, 0x22] : y2691 ? [12, 140, 233] : [255, 255, 255]; const border = isCenter ? [255, 255, 255] : y2691 ? [255, 255, 255] : [12, 140, 233]; h2684.fills = l959([['SOLID', color[0], color[1], color[2], 100]]); const effects = []; effects.push(...t1536([['DROP_SHADOW', border[0] / 255, border[1] / 255, border[2] / 255, 1, 0, 0, 0, (isCenter ? 3 : y2691 ? 5 : 3.6) / j2692, 'NORMAL', true, true]], true)); effects.push(...t1536([['DROP_SHADOW', color[0] / 255, color[1] / 255, color[2] / 255, 1, 0, 0, 0, (y2691 ? 4 : 2.4) / j2692, 'NORMAL', true, true]], true)); h2684.effects = effects; }); }
function f4009(genPoly) { return genPoly[j1410] != null && !isNaN(genPoly[j1410]) && genPoly[e1412] != null && !isNaN(genPoly[e1412]) && genPoly[w1413] != null && !isNaN(genPoly[w1413]) && genPoly[v1414] != null && !isNaN(genPoly[v1414]) && genPoly[x1419] != null && !isNaN(genPoly[x1419]) && genPoly[i1425] != null && !isNaN(genPoly[i1425]); }
function p2693(genPoly, addProps, transform) { if (!f4009(genPoly))
    return null; const figPoly = figma.createPolygon(); d2694(figPoly, genPoly, addProps, transform, true); return figPoly; }
function d2694(figPoly, genPoly, addProps, transform, isValid = false) { if (!isValid && !f4009(genPoly))
    return; figPoly.cornerRadius = genPoly[x1419]; figPoly.pointCount = Math.max(3, genPoly[i1425]); if (transform)
    n1591(figPoly, genPoly); g2686(figPoly, genPoly, addProps); }
function p2696(j2695) { return j2695[j1410] != null && !isNaN(j2695[j1410]) && j2695[e1412] != null && !isNaN(j2695[e1412]) && j2695[w1413] != null && !isNaN(j2695[w1413]) && j2695[v1414] != null && !isNaN(j2695[v1414]) && j2695[d1415] != null && !isNaN(j2695[d1415]); }
function r2697(j2695, addProps, transform) { if (!p2696(j2695))
    return null; const figRect = figma.createRectangle(); d2698(figRect, j2695, addProps, transform, true); return figRect; }
function d2698(figRect, j2695, addProps, transform, isValid = false) { if (!isValid && !p2696(j2695))
    return; const found = j2695[p1404].findIndex(e => e[0] == 'ROUND_CORNERS'); if (found > -1) {
    const corners = j2695[p1404][found];
    figRect.topLeftRadius = corners[1];
    figRect.topRightRadius = corners[2];
    figRect.bottomLeftRadius = corners[3];
    figRect.bottomRightRadius = corners[4];
}
else
    figRect.cornerRadius = j2695[d1415]; if (transform)
    n1591(figRect, j2695); g2686(figRect, j2695, addProps); }
function t2699(c2709) { return c2709[j1410] != null && !isNaN(c2709[j1410]) && c2709[e1412] != null && !isNaN(c2709[e1412]) && c2709[w1413] != null && !isNaN(c2709[w1413]) && c2709[v1414] != null && !isNaN(c2709[v1414]) && c2709[j1420] != null && !isNaN(c2709[j1420]) && c2709[q1426] != null && !isNaN(c2709[q1426]) && c2709[d1431] != null && !isNaN(c2709[d1431]); }
function b2700(c2709, addProps, transform) { if (!t2699(c2709))
    return null; const e2710 = figma.createStar(); s2701(e2710, c2709, addProps, transform, true); return e2710; }
function s2701(e2710, c2709, addProps, transform, isValid = false) { if (!isValid && !t2699(c2709))
    return; e2710.cornerRadius = c2709[j1420]; e2710.pointCount = c2709[q1426]; e2710.innerRadius = Math.min(Math.max(0, c2709[d1431] / 100), 1); if (transform)
    n1591(e2710, c2709); g2686(e2710, c2709, addProps); }
const z4252 = [];
function q2702(a2706) { return a2706[e1432] != null && a2706[j1410] != null && !isNaN(a2706[j1410]) && a2706[e1412] != null && !isNaN(a2706[e1412]) && a2706[w1413] != null && !isNaN(a2706[w1413]) && a2706[v1414] != null && !isNaN(a2706[v1414]) && a2706[e1434] != null && a2706[e1434] != NULL && a2706[i1435] != null && !isNaN(a2706[i1435]); }
function o2703(a2706, addProps, transform) { if (!q2702(a2706))
    return null; const h2778 = figma.createText(); b2704(h2778, a2706, addProps, transform, true); return h2778; }
function b2704(h2778, a2706, addProps, transform, isValid = false) { if (!isValid && !q2702(a2706))
    return null; const fontName = { family: a2706[e1434], style: a2706[c1436] }; try {
    if (!z4252.includes(fontName)) {
        figma.loadFontAsync(fontName).then(() => { z4252.push(fontName); t2705(h2778, a2706, fontName, addProps, transform); });
    }
    else {
        t2705(h2778, a2706, fontName, addProps, transform);
    }
}
catch (e) {
    x956(e);
} }
function t2705(h2778, a2706, fontName, addProps, transform) { h2778.fontName = fontName; h2778.fontSize = Math.max(1, a2706[i1435]); h2778.characters = a2706[e1432]; h2778.lineHeight = { unit: 'PERCENT', value: a2706[e1439] }; h2778.letterSpacing = { unit: 'PERCENT', value: a2706[d1440] }; if (a2706[z1437] == 0)
    h2778.textAlignHorizontal = 'LEFT';
else if (a2706[z1437] == 1)
    h2778.textAlignHorizontal = 'CENTER';
else if (a2706[z1437] == 2)
    h2778.textAlignHorizontal = 'RIGHT';
else if (a2706[z1437] == 3)
    h2778.textAlignHorizontal = 'JUSTIFIED'; if (a2706[i1438] == 0)
    h2778.textAlignVertical = 'TOP';
else if (a2706[i1438] == 1)
    h2778.textAlignVertical = 'CENTER';
else if (a2706[i1438] == 2)
    h2778.textAlignVertical = 'BOTTOM'; if (transform)
    n1591(h2778, a2706); g2686(h2778, a2706, addProps); if (a2706[n1421] == 0 && a2706[a1427] == 0)
    h2778.textAutoResize = 'WIDTH_AND_HEIGHT';
else if (a2706[n1421] == 0)
    h2778.textAutoResize = 'HEIGHT';
else
    h2778.textAutoResize = 'NONE'; }
function l2761(n2711) { return true; }
function s2732(n2711, addProps, transform) { if (!l2761(n2711))
    return null; const s2712 = figma.createVector(); j2738(s2712, n2711, addProps, transform, true); return s2712; }
function j2738(s2712, n2711, addProps, transform, isValid = false) { if (!isValid && !l2761(n2711))
    return; s2712.setVectorNetworkAsync(n2711[a1417]); if (transform)
    n1591(s2712, n2711, false); g2686(s2712, n2711, addProps); }
function h2760(j2707) { return j2707[l1424] != null && !isNaN(j2707[l1424]) && j2707[v1430] != null && !isNaN(j2707[v1430]); }
function c2731(j2707, addProps, transform) { const e2708 = figma.createVector(); z2737(e2708, j2707, addProps, transform, true); return e2708; }
function z2737(e2708, j2707, addProps, transform, isValid = false) { if (!isValid && !h2760(j2707))
    return; e2708.vectorPaths = [{ windingRule: j2707[l1424] == 1 ? 'NONZERO' : 'EVENODD', data: j2707[b1418] }]; e2708.cornerRadius = j2707[v1430]; if (transform)
    n1591(e2708, j2707, false); g2686(e2708, j2707, addProps); }
