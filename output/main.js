var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function r1051(key, tag) { return key.substring(0, tag.length + 1) == tag + ' '; }
function m1052(key, tag) { return key.substring(tag.length + 1); }
function e1053(key) { return r1051(key, w876); }
function p1054(key) { return r1051(key, b874); }
function y1055(key) { return r1051(key, t875); }
function s1056(key) { return m1052(key, w876); }
function i1057(key) { return m1052(key, b874); }
function b1058(key) { return m1052(key, t875); }
const generatorVersion = 424;
const m868 = 2147483647;
const NULL = '';
const o869 = '  ';
const v870 = '    ';
const l871 = '\n';
const w872 = '◦ G •';
const b873 = w872 + ' ';
const b874 = 'G_NODE';
const t875 = 'G_CONN';
const w876 = 'G_PAGE';
const e877 = 'G_TEMP';
const minWindowWidth = 602;
const minWindowHeight = 39;
const identity = Object.freeze([[1, 0, 0], [0, 1, 0], [0, 0, 1]]);
const Epsilon = 0.0000001;
const Tau = Math.PI * 2;
var enableAsserts = false;
function y878(x, eps = 0.000000001) { return Math.abs(x) < eps ? 0 : x; }
function nozero(x, eps = 0.000000001) { return x != 0 ? x : (x < 0 ? -eps : eps); }
function q879(v, eps = 0.000000001) { return point(nozero(v.x, eps), nozero(v.y, eps)); }
function equal(a, b, eps = 0.000000001) { return Math.abs(b - a) < eps; }
function sqr(x) { return x * x; }
;
function cube(x) { return x * x * x; }
;
function r880(f) { return Math.floor(f) | 0; }
function w881(x) { x = r880(x); x--; x |= x >> 1; x |= x >> 2; x |= x >> 4; x |= x >> 8; x |= x >> 16; x |= x >> 32; return ++x; }
function gcd(a, b) { let temp; while (1) {
    temp = a % b;
    if (temp == 0)
        return b;
    a = b;
    b = temp;
} }
function distv(p1, p2) { const dx = p2.x - p1.x; const dy = p2.y - p1.y; return Math.sqrt(dx * dx + dy * dy); }
function o882(v) { let angle = Math.atan2(v.y, v.x); if (angle < 0)
    angle += Tau; return angle; }
function anglev2(v1, v2) { return anglev2_(v1.x, v1.y, v2.x, v2.y); }
function anglev2_(x1, y1, x2, y2) { const dx = x2 - x1; const dy = y2 - y1; let angle = Math.atan2(dy, dx); if (angle < 0)
    angle += Tau; return angle; }
function o884(v) { return Math.sqrt(v.x * v.x + v.y * v.y); }
function lengthv_(x, y) { return Math.sqrt(x * x + y * y); }
function k885(v) { return point(v.x == 0 ? 0 : v.x / o884(v), v.y == 0 ? 0 : v.y / o884(v)); }
function dotv(v1, v2) { return v1.x * v2.x + v1.y * v2.y; }
function w886(a1, a2) { let diff = a2 - a1; while (diff <= -Tau / 2)
    diff += Tau; while (diff > Tau / 2)
    diff -= Tau; return diff; }
function m887(v, m) { let v3 = [v.x, v.y, 1]; let r = o951(v3, m); return point(r[0], r[1]); }
function k888(...mm) { a955(mm.length > 0, 'mulm3m3() must take at least one argument'); let result = clone(mm[0]); for (let a = 1; a < mm.length; a++) {
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
function f889(m, s) { for (let i = 0; i < 3; i++)
    for (let j = 0; j < 3; j++)
        m[i][j] /= s; return m; }
function adjugate(m) { return cofactor(transpose(m)); }
function transpose(m) { return [[m[0][0], m[1][0], m[2][0]], [m[0][1], m[1][1], m[2][1]], [m[0][2], m[1][2], m[2][2]]]; }
function cofactor(m) { return [[m[1][1] * m[2][2] - m[2][1] * m[1][2], -(m[1][0] * m[2][2] - m[2][0] * m[1][2]), m[1][0] * m[2][1] - m[2][0] * m[1][1]], [-(m[0][1] * m[2][2] - m[2][1] * m[0][2]), m[0][0] * m[2][2] - m[2][0] * m[0][2], -(m[0][0] * m[2][1] - m[2][0] * m[0][1])], [m[0][1] * m[1][2] - m[1][1] * m[0][2], -(m[0][0] * m[1][2] - m[1][0] * m[0][2]), m[0][0] * m[1][1] - m[1][0] * m[0][1]]]; }
function determinant(m) { return m[0][0] * (m[1][1] * m[2][2] - m[1][2] * m[2][1]) - m[0][1] * (m[1][0] * m[2][2] - m[2][0] * m[1][2]) + m[0][2] * (m[1][0] * m[2][1] - m[2][0] * m[1][1]); }
function q890(m) { return f889(adjugate(m), determinant(m)); }
function c891(angle) { const cosA = y878(Math.cos(angle)); const sinA = y878(Math.sin(angle)); return [[cosA, sinA, 0], [-sinA, cosA, 0], [0, 0, 1]]; }
function n892(x = 0, y = 0, b893 = 1, j894 = 1, angle = 0, m895 = 0, r896 = 0) { const cosA = Math.cos(angle); const sinA = Math.sin(angle); return [[b893 * cosA - r896 * sinA, -m895 * cosA + j894 * sinA, x], [r896 * cosA + b893 * sinA, j894 * cosA + m895 * sinA, y], [0, 0, 1]]; }
function u897(v1, v2) { return v1.x * v2.y - v1.y * v2.x; }
function a898(v1, v2) { return point(v1.x + v2.x, v1.y + v2.y); }
function sqrv(v) { return d899(v, v); }
function d899(v1, v2) { return point(v1.x * v2.x, v1.y * v2.y); }
function u900(v, s) { return point(v.x * s, v.y * s); }
function m901(v1, v2) { return point(v1.x / v2.x, v1.y / v2.y); }
function m902(v, s) { return point(v.x / s, v.y / s); }
function z903(v1, v2) { return point(v1.x - v2.x, v1.y - v2.y); }
function i904(str) { return decodeURI(encodeURIComponent(str)); }
function q905(str) { return decodeURIComponent(encodeURI(str)); }
function b906(bytes) { let str = ''; for (let i = 0; i < bytes.length; i++)
    str += String.fromCharCode(bytes[i]); return str; }
function p907(str) { return Array.from(q905(str), c => c.charCodeAt(0)); }
function r908(array, size) { const newArray = new Uint8Array(size); h909(array, newArray); return newArray; }
function h909(src, dst) { i910(src, 0, src.length, dst, 0, dst.length); }
function i910(src, l911, h912, dst, f913, n914) { const size = Math.min(h912, n914); for (let i = 0; i < size; i++)
    dst[f913 + i] = src[l911 + i]; }
function w915(u916, d917) { if (u916.length != d917.length)
    return false; for (let i = 0; i < u916.length; i++) {
    if (u916[i] != d917[i])
        return false;
} return true; }
function u918(h919, e920) { return h919.findIndex(i => e920.includes(i)) > -1; }
function u921(list) { return list ? '<==' : '<--'; }
;
function l922(list) { return list ? '==>' : '-->'; }
;
function h923(nodeId) { return b874 + ' ' + nodeId; }
function x924(name) { return t875 + ' ' + name; }
function t925(name) { return w876 + ' ' + name; }
function y926(str) { return str.toLowerCase() == 'true' || str == '1'; }
function u927(r928, p929 = false) { return v934(r928.outputNodeId, r928.outputId, r928.outputOrder, r928.inputNodeId, r928.inputId, r928.list, p929); }
function b930(outputNodeId, outputId, outputOrder, inputNodeId, inputId) { return x924(outputNodeId + ' ' + outputId + ' ' + outputOrder + ' ' + inputNodeId + ' ' + inputId); }
function c931(x243) { return b930(x243.outputNodeId, x243.outputId, x243.outputOrder, x243.inputNodeId, x243.inputId); }
function d932(x243) { return b930(x243.output.node.id, x243.output.id, x243.outputOrder, x243.input.node.id, x243.input.id); }
function v933(x243, p929 = false) { return v934(x243.output.node.id, x243.output.id, x243.outputOrder, x243.input.node.id, x243.input.id, x243.list, p929); }
function v934(outputNodeId, outputId, outputOrder, inputNodeId, inputId, list, p929 = false) { const sp = p929 ? ' ' : '  '; const jsp = p929 ? '' : ' '; const arrow = sp + h938(typeof outputOrder == 'string' ? parseInt(outputOrder) : outputOrder) + l922(typeof list == 'string' ? y926(list) : list) + sp; const join = jsp + '.' + jsp; return outputNodeId + join + outputId + arrow + inputNodeId + join + inputId; }
function f935(pageId) { return t925(pageId); }
function j936(num) { const str = num.toString(); let sup = ''; for (const c of str)
    sup += p937(c); return sup; }
function p937(c) { switch (c) {
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
function h938(num) { const str = num.toString(); let sup = ''; for (const c of str)
    sup += y939(c); return sup; }
function y939(c) { switch (c) {
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
function i940(bool) { return bool ? 'true' : 'false'; }
function isValid(val) { return val != undefined && val != null; }
function isEmpty(array) { return array.length == 0; }
function h941(array, item) { u942(array, array.indexOf(item)); }
function u942(array, index) { if (index > -1 && index < array.length)
    array.splice(index, 1); }
function d943(array) { if (isEmpty(array))
    return null; let last = array.at(-1); array.splice(array.length - 1, 1); return last; }
function w944(array) { return array[array.length - 1]; }
function f945(array, from, to) { const item = array[from]; array.splice(from, 1); array.splice(to, 0, item); }
function u946(array, item) { const index = array.indexOf(item); if (index > -1)
    array.splice(index, 1); }
function i947(i2783, array) { for (const item of array) {
    const index = i2783.indexOf(item);
    if (index > -1)
        i2783.splice(index, 1);
} }
function o948(array, where) { const index = array.findIndex(where); if (index > -1)
    array.splice(index, 1); }
function n949(styleId) { return styleId.split(',')[0] + ','; }
function r950(points) { let x4019 = ''; if (points.length < 2)
    return x4019; x4019 += 'M'; x4019 += ' ' + y878(points[0].x); x4019 += ' ' + y878(points[0].y); for (let i = 1; i < points.length; i++) {
    x4019 += ' L' + ' ' + y878(points[i].x) + ' ' + y878(points[i].y);
} return x4019; }
function point(x, y) { return { x: x, y: y }; }
function o951(v, m) { let r = [0, 0, 0]; for (let i = 0; i < 3; i++)
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
        let a111 = {};
        for (const key in val)
            a111[key] = clone(val[key]);
        return a111;
    }
} throw 'unknown'; }
function z952(array, item, equal = null) { if (equal) {
    if (Array.isArray(item))
        item.forEach(i => z952(array, i, equal));
    else if (!array.find(i => equal(i, item)))
        array.push(item);
}
else {
    if (Array.isArray(item))
        item.forEach(i => z952(array, i));
    else if (!array.includes(item))
        array.push(item);
} }
function t953(array, item, equal) { if (Array.isArray(item))
    item.forEach(i => t953(array, i, equal));
else if (!array.find(equal))
    array.push(item); }
function y954(array, item, except) { if (Array.isArray(item))
    item.forEach(i => y954(array, i, except));
else if (!array.find(except))
    array.push(item); }
function a955(...args) { if (enableAsserts) {
    console.assert(...args);
} }
function a956(...args) { if (enableAsserts)
    console.error(...args); }
function f957(str, trim) { while (str.length >= trim.length && str.substring(0, trim.length) == trim)
    str = str.substring(trim.length); return str; }
function b958(str, trim) { while (str.length >= trim.length && str.substring(str.length - trim.length) == trim)
    str = str.substring(0, str.length - trim.length); return str; }
function p959(f4079) { const fills = []; for (const fill of f4079) {
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
            const n4194 = [[0, 1, 0], [0.5, 0.5, 1], [1, 1, 1]];
            let k4195 = [[p0.x, p1.x, p2.x], [p0.y, p1.y, p2.y], [1, 1, 1]];
            k4195 = k888(n4194, q890(k4195));
            k4195 = [k4195[0], k4195[1]];
            const stops = [];
            for (const stop of fill[2]) {
                stops.push({ color: { r: Math.min(Math.max(0, stop[0]), 1), g: Math.min(Math.max(0, stop[1]), 1), b: Math.min(Math.max(0, stop[2]), 1), a: Math.min(Math.max(0, stop[3]), 1) }, position: stop[4] });
            }
            fills.push({ type: fill[0], gradientTransform: k4195, gradientStops: stops, blendMode: fill[3] });
            break;
        }
    }
} return fills; }
function s960(type) { return y1092.includes(type); }
const s1059 = 'LIST#';
const u1060 = 'NLIST#';
const p1061 = 'TLIST#';
const l1062 = 'SLIST#';
const z1063 = 'NULL';
const n1064 = 'VAR';
const t1065 = 'VARGRP';
const h1066 = 'FEEDBK';
const c1067 = 'REPT';
const n1068 = 'CACHE';
const z1069 = 'FRZ';
const k1070 = 'TIMER';
const z1071 = 'VNAME';
const GET_LIST_VALUE_NAMES = 'GVNAMES';
const LIST_VALUE_NAMES = 'VNAMES';
const OBJECT_NAME = 'ONAME';
const o1072 = 'CMB';
const u1073 = 'LSASIT';
const y1074 = 'EXTR';
const a1075 = 'SETP';
const k1076 = 'GETP';
const u1077 = 'SUBLST';
const v1078 = 'UNIQ';
const REORDER_LIST = 'RORD';
const SHIFT_LIST = 'SHFTLST';
const s1079 = 'REVLST';
const BUCKLE_LIST = 'BUKLST';
const z1080 = 'SORT';
const m1081 = 'CLMN';
const c1082 = 'CELL';
const m1083 = 'LIST';
const t1084 = 'COUNT';
const OBJECT_COUNT = 'OBJCOUNT';
const w1085 = 'LCONT';
const u1086 = 'SELECT';
const SELECT_FROM_LIST = 'LSTSEL';
const g1087 = 'IF';
const d1088 = 'LSTFLT';
const y1090 = 'ANY#';
const i1091 = [s1059, u1060, p1061, l1062, o1072, y1074, a1075, k1076, u1077, m1083, t1084, w1085, c1067];
const y1092 = [s1059, u1060, p1061, l1062];
const w1089 = 'ITER';
const x1111 = 'PROB';
const HOLD = 'HOLD';
const q1094 = 'NUM#';
const e1095 = 'NUM';
const NUMBER_PRECISION = 'NPREC';
const p1096 = 'NSIGN';
const o1097 = 'ABS';
const NUMBER_NEGATIVE = 'NEG';
const i1098 = 'ROUND';
const NUMBER_QUANTIZE = 'QUANT';
const a1099 = 'SMINMAX';
const d1100 = 'MINMAX';
const g1101 = 'LIM';
const r1102 = 'NCURVE';
const NUMBER_MAP = 'NMAP';
const NUMBER_BIAS = 'NBIAS';
const b1103 = 'NANISNUM';
const t1104 = 'CONST';
const d1105 = 'DATE';
const d1106 = 'SEQ';
const s1107 = 'RANGE';
const f1108 = 'WAVE';
const p1109 = 'RAND';
const o1110 = 'NOISE';
const n1112 = 'ACCUM';
const j1113 = 'LERP';
const t1114 = 'SOLVE';
const h1115 = 'NANIM';
const n1116 = 'SMATH';
const z1117 = 'MATH';
const g1118 = 'ADD';
const q1119 = 'SUB';
const z1120 = 'MUL';
const b1121 = 'DIV';
const z1122 = 'MOD';
const q1123 = 'EXP';
const b1124 = 'NBOOL';
const b1125 = 'NOT';
const a1126 = 'AND';
const c1127 = 'OR';
const d1128 = 'XOR';
const u1129 = 'COND';
const k1130 = 'EQ';
const v1131 = 'NE';
const m1132 = 'LT';
const u1133 = 'LE';
const o1134 = 'GT';
const s1135 = 'GE';
const u1136 = 'TRIG';
const a1137 = 'SIN';
const s1138 = 'COS';
const q1139 = 'TAN';
const t1140 = 'ATAN2';
const b1141 = 'CNVANG';
const l1093 = [z1063, n1064, t1065, ...i1091, u1073, y1074, a1075, k1076, u1077, v1078, REORDER_LIST, SHIFT_LIST, s1079, BUCKLE_LIST, m1081, z1080, c1082, m1083, u1086, SELECT_FROM_LIST, g1087, d1088, h1066, c1067, w1089, x1111, HOLD, n1068, z1069, k1070, z1071, GET_LIST_VALUE_NAMES, LIST_VALUE_NAMES, OBJECT_NAME];
const a1142 = [z1117, n1116, g1118, q1119, z1120, b1121, z1122, q1123];
const n1143 = [b1124, b1125, a1126, c1127, d1128];
const h1144 = [u1129, k1130, v1131, m1132, u1133, o1134, s1135];
const a1145 = [u1136, a1137, s1138, q1139, t1140];
const v1146 = 'TEXT#';
const p1147 = 'TEXT';
const s1148 = 'TLEN';
const j1149 = 'TTRIM';
const r1150 = 'TSUB';
const q1151 = 'TCONT';
const h1152 = 'TCASE';
const r1153 = 'TREPL';
const b1154 = 'TJOIN';
const b1155 = 'TPAD';
const h1156 = 'TCMP';
const b1157 = 'TCHAR';
const a1158 = 'TUNI';
const s1159 = 'INDEX';
const d1160 = 'N2T';
const a1161 = 'C2T';
const p1162 = 'T2N';
const l1163 = 'T2C';
const e1164 = 'TSPLT';
const p3493 = 'TJSON';
const l1166 = 'TCSV';
const t1167 = 'FETCH';
const u1168 = 'TFILE';
const a1169 = [q1094, u1060, e1095, NUMBER_PRECISION, p1096, o1097, NUMBER_NEGATIVE, i1098, NUMBER_QUANTIZE, a1099, d1100, g1101, r1102, NUMBER_MAP, NUMBER_BIAS, b1103, t1104, d1105, d1106, s1107, f1108, p1109, o1110, n1112, j1113, t1114, h1115, d1160, b1157, ...a1142, ...n1143, ...h1144, ...a1145, b1141, BUCKLE_LIST];
const m1170 = [v1146, p1061, p1147, s1148, j1149, r1150, q1151, h1152, b1154, b1155, r1153, h1156, a1158, s1159, p1162, l1163, e1164, p3493, l1166, t1167, u1168];
const m1171 = 'COL#';
const g1172 = 'COL';
const q1173 = 'CVAL';
const w1174 = 'CCOR';
const x1175 = 'COLP3';
const b1176 = 'CCNT';
const l1177 = 'BLND';
const i1178 = 'CLERP';
const a1179 = 'CBLND';
const g1180 = [m1171, g1172, w1174, x1175, l1177, i1178, a1179, a1161];
const k1181 = 'FILL#';
const j1182 = 'FILL';
const u1183 = [k1181, j1182];
const c1184 = 'STRK#';
const u1185 = 'STRK';
const n1186 = [c1184, u1185];
const z1193 = 'STRKSD#';
const n1194 = 'STRKSD';
const s1195 = [z1193, n1194];
const u1187 = 'CSTOP#';
const t1188 = 'CSTOP';
const m1189 = [u1187, t1188];
const l1190 = 'GRAD#';
const t1191 = 'GRAD';
const z1192 = [l1190, t1191];
const m1196 = 'RCRN#';
const p1197 = 'RCRN';
const i1198 = [m1196, p1197];
const o1199 = 'DRSH#';
const p1200 = 'DRSH';
const b1201 = [o1199, p1200];
const u1202 = 'INSH#';
const r1203 = 'INSH';
const w1204 = [u1202, r1203];
const e1205 = 'LBLR#';
const j1206 = 'LBLR';
const r1207 = [e1205, j1206];
const u1208 = 'BBLR#';
const d1209 = 'BBLR';
const a1210 = [u1208, d1209];
const v1211 = 'MASK#';
const s1212 = 'MASK';
const a1213 = [v1211, s1212];
const m1214 = 'BLEND#';
const s1215 = 'BLEND';
const r1216 = [m1214, s1215];
const v1217 = [...s1195, ...i1198, ...b1201, ...w1204, ...r1207, ...a1210, ...r1216, ...a1213];
const i1218 = [m1171, k1181, l1190, c1184, z1193, o1199, u1202, e1205, u1208, m1214, v1211];
const k1219 = 'CSTL';
const e1220 = 'SHP#';
const r1221 = 'RECT#';
const a1222 = 'RECT';
const h1223 = [r1221, a1222];
const p1224 = 'LINE#';
const t1225 = 'LINE';
const m1226 = [p1224, t1225];
const g1227 = 'ELPS#';
const d1228 = 'ELPS';
const e1229 = [g1227, d1228];
const l1230 = 'TRPZ#';
const m1231 = 'TRPZ';
const d1232 = [l1230, m1231];
const x1239 = 'POLY#';
const k1240 = 'POLY';
const w1241 = [x1239, k1240];
const z1242 = 'STAR#';
const p1243 = 'STAR';
const m1244 = [z1242, p1243];
const p1245 = 'TXTS#';
const a1246 = 'TXTS';
const z1247 = [p1245, a1246];
const n1248 = 'PT#';
const u1249 = 'PT';
const b1250 = [n1248, u1249];
const q1251 = 'PCORN';
const g1252 = 'VPATH#';
const x1253 = 'VPATH';
const k1254 = [g1252, x1253];
const y1255 = 'VPT#';
const b1256 = 'VPT';
const m1257 = [y1255, b1256];
const b1258 = 'VEDGE#';
const d1259 = 'VEDGE';
const s1260 = [b1258, d1259];
const d1261 = 'VREG#';
const o1262 = 'VREG';
const q1263 = [d1261, o1262];
const r1264 = 'VNET#';
const o1265 = 'VNET';
const s1266 = [r1264, o1265];
const z1267 = 'SGRP#';
const p1268 = 'SGRP';
const i1269 = [z1267, p1268];
const c1270 = 'FRM#';
const z1271 = 'FRM';
const y1272 = [c1270, z1271];
const k1234 = 'ARC#';
const t1233 = 'ARC';
const e1235 = [k1234, t1233];
const s1237 = 'WAVEP#';
const q1236 = 'WAVEP';
const x1238 = [s1237, q1236];
const k1273 = 'MOVE';
const a1274 = 'ROT';
const i1275 = 'SCALE';
const r1276 = 'SKEW';
const k1277 = 'SCENTR';
const v1278 = 'RSTX';
const z1279 = 'PLACE';
const s1280 = 'APPLY';
const PATH_LENGTH = 'PTHLEN';
const JOIN_PATHS = 'JOINPTH';
const REORIENT_PATHS = 'REORPTH';
const f1287 = 'PTALPATH';
const j1288 = 'CPTONPATH';
const n1281 = 'MESPT';
const t1282 = 'PTANGLE';
const i1283 = 'VECLEN';
const c1284 = 'CIRCEN';
const ARC_FROM_POINTS = 'ARCPT';
const u1285 = 'INTLIN';
const f1286 = 'PTLERP';
const REVERSE_PATH = 'REVPTH';
const BLEND_PATH = 'BLENDPTH';
const PATH_TYPES = [x1253, m1231, t1233, q1236];
const PATH_VALUES = [g1252, l1230, k1234, s1237];
const m1289 = 'SBOOL';
const d1290 = 'SBOOL#';
const d1291 = 'SBOOLU';
const q1292 = 'SBOOLS';
const t1293 = 'SBOOLI';
const f1294 = 'SBOOLE';
const h1295 = [m1289, d1290, d1291, q1292, t1293, f1294];
const h1296 = 'RENDER';
const EXPORT = 'EXPORT';
const i1297 = [e1220, l1062, r1221, p1224, g1227, l1230, x1239, z1242, p1245, n1248, g1252, y1255, b1258, d1261, r1264, k1234, s1237, z1267, c1270, d1290, o1199, u1202, e1205, u1208, m1214, v1211];
const x1298 = [a1274, i1275, r1276];
const x1299 = [...i1297, ...h1223, ...m1226, ...e1229, ...d1232, ...w1241, ...m1244, ...z1247, ...b1250, q1251, ...k1254, ...m1257, ...s1260, ...q1263, ...s1266, ...e1235, ...x1238, ...i1269, ...y1272, ...h1295, k1273, ...x1298, k1277, v1278, z1279, s1280, PATH_LENGTH, JOIN_PATHS, REORIENT_PATHS, f1287, j1288, n1281, t1282, i1283, c1284, t1233, q1236, ARC_FROM_POINTS, u1285, f1286, REVERSE_PATH, BLEND_PATH, h1296, EXPORT];
const x1300 = [s1059, u1060, p1061, l1062, q1094, v1146, m1171, k1181, u1187, l1190, c1184, u1187, l1190, e1220, r1221, p1224, g1227, l1230, x1239, z1242, p1245, n1248, g1252, y1255, b1258, d1261, r1264, z1267, c1270, m1196, o1199, u1202, e1205, u1208, m1214, v1211];
const b1301 = 'GROUP';
const k1302 = 'GPARAM';
const f1303 = [b1301, k1302];
const s1304 = 'CMNT';
const c1305 = 'CMNTARR';
const s1306 = 'PANEL';
const w1307 = 'ACT';
const x1308 = 'BFACT';
const b1309 = 'BFLST';
const h1310 = 'DIS';
const q1311 = 'NOC';
const PARAM = 'PARAM';
const r1312 = 'LOG';
const c1313 = 'GRAPH';
const l1314 = [[z1122, '%'], [b1121, '/'], [q1119, '−'], [g1118, '+'], [z1120, '×'], [q1123, 'e<sup>x']];
const e1315 = [[b1121, '/'], [q1119, '−'], [g1118, '+'], [z1120, '×']];
const j1316 = 0;
const f1317 = 1;
const o1318 = 2;
const x1319 = 3;
const i1320 = [[j1316, 'not'], [f1317, 'xor'], [o1318, 'or'], [x1319, 'and']];
const n1321 = 0;
const p1322 = 1;
const c1323 = 2;
const e1324 = 3;
const y1325 = 4;
const j1326 = 5;
const e1327 = [[n1321, '<'], [p1322, '≤'], [c1323, '≠'], [e1324, '='], [y1325, '≥'], [j1326, '>']];
const e1328 = 0;
const t1329 = 1;
const a1330 = 2;
const i1331 = 3;
const n1332 = 4;
const x1333 = 5;
const c1334 = [[e1328, 'sin'], [t1329, 'cos'], [a1330, 'tan'], [i1331, 'asin'], [n1332, 'acos'], [x1333, 'atan']];
const r1335 = 'EMPTY';
const d1336 = 'CONNECT';
const o1337 = 'CREATE';
const p1338 = 'CREATE_INSERT';
const z1339 = 'DELETE';
const c1340 = 'DISCONNECT';
const i1341 = 'LINK_STYLE';
const h1342 = 'LINK_VARIABLE';
const i1343 = 'LINK_VARIABLE_GROUP';
const f1344 = 'MAKE_ACTIVE';
const MAKE_NOT_CONDITION_ACTION = 'MAKE_NOT_CONDITION';
const m1345 = 'MAKE_PASSIVE';
const m1346 = 'PASTE';
const n1347 = 'RECONNECT';
const i1348 = 'REMOVE';
const b1349 = 'RENAME';
const x1350 = 'REORDER_INPUTS';
const b1351 = 'REORDER_CONNECTIONS';
const u1352 = 'SELECT';
const a1353 = 'SELECT_MOVE';
const o1354 = 'MOVE_NODES';
const k1355 = 'SET_PARAM_VALUE';
const SET_MULTIPLE_VALUES_ACTION = 'SET_MULTIPLE_VALUES';
const l1356 = 'SET_PARAM_SETTING';
const h1357 = 'SET_NODE_RECT';
const a1358 = 'TOGGLE_DISABLE';
const t1359 = 'TOGGLE_PARAM_HEADER';
const t1360 = 'SET_CURRENT_GRAPH';
const o1361 = 'CREATE_PAGE';
const r1362 = 'DELETE_PAGE';
const d1363 = 'GROUP_NODES';
const a1364 = 'UNGROUP_NODES';
const y1365 = 'HIGHLIGHT_NODES';
const SCROLL_LIST_NODE_ACTION = 'SCROLL_LIST_NODE';
const SET_LIST_DIVIDER_ACTION = 'SET_LIST_DIVIDER';
const SET_NODE_PARAM_ACTION = 'SET_NODE_PARAM';
const d1366 = 'BNORM';
const t1367 = 'BDARK';
const a1368 = 'BMULT';
const t1369 = 'BPDRK';
const b1370 = 'BBURN';
const v1371 = 'BLITE';
const q1372 = 'BSCRN';
const o1373 = 'BPLGT';
const u1374 = 'BDODG';
const a1375 = 'BOVER';
const f1376 = 'BSOFT';
const h1377 = 'BHARD';
const x1378 = 'BDIFF';
const s1379 = 'BEXCL';
const m1380 = 'BHUE';
const v1381 = 'BSAT';
const w1382 = 'BCOL';
const d1383 = 'BLUM';
const w1384 = [[d1366, 'normal', 'NORMAL'], [t1367, 'darken', 'DARKEN'], [a1368, 'multiply', 'MULTIPLY'], [t1369, 'plus darker', 'LINEAR_BURN'], [b1370, 'color burn', 'COLOR_BURN'], [v1371, 'lighten', 'LIGHTEN'], [q1372, 'screen', 'SCREEN'], [o1373, 'plus lighter', 'LINEAR_DODGE'], [u1374, 'color dodge', 'COLOR_DODGE'], [a1375, 'overlay', 'OVERLAY'], [f1376, 'soft light', 'SOFT_LIGHT'], [h1377, 'hard light', 'HARD_LIGHT'], [x1378, 'difference', 'DIFFERENCE'], [s1379, 'exclusion', 'EXCLUSION'], [m1380, 'hue', 'HUE'], [v1381, 'saturation', 'SATURATION'], [w1382, 'color', 'COLOR'], [d1383, 'luminosity', 'LUMINOSITY']];
const y1385 = [['thin', 100], ['extra light', 200], ['light', 300], ['regular', 400], ['medium', 500], ['semi bold', 600], ['bold', 700], ['extra bold', 800], ['black', 900]];
const o1386 = 0;
const m1387 = 1;
const i1388 = 2;
const r1389 = 2;
const f1390 = 3;
const v1391 = 3;
const n1392 = 4;
const v1393 = 4;
const g1394 = 5;
const n1395 = 6;
const r1396 = 7;
const e1397 = 8;
const h1398 = 9;
const g1399 = 10;
const j1400 = 11;
const s1401 = 12;
const n1402 = 13;
const o1403 = 14;
const z1404 = 15;
const b1405 = 16;
const l1406 = 17;
const f1407 = 18;
const f1408 = 19;
const o1409 = 20;
const f1410 = 21;
const e1411 = 22;
const j1412 = 23;
const i1413 = 24;
const FO_BOOLEAN_CHILDREN = 24;
const h1414 = 24;
const y1415 = 25;
const FO_BOOLEAN_OPERATION = 25;
const s1416 = 26;
const o1417 = 27;
const h1418 = 28;
const c1419 = 28;
const k1420 = 28;
const r1421 = 28;
const k1422 = 28;
const i1423 = 28;
const o1424 = 28;
const f1425 = 28;
const h1426 = 29;
const u1427 = 29;
const h1428 = 29;
const g1429 = 29;
const i1430 = 29;
const FO_FRAME_CLIP = 29;
const a1432 = 30;
const q1433 = 30;
const j1434 = 30;
const t1435 = 30;
const b1431 = 30;
const h1436 = 31;
const h1437 = 31;
const d1438 = 32;
const v1439 = 33;
const n1440 = 34;
const i1441 = 35;
const g1442 = 36;
const t1443 = 37;
const l2784 = '12345679ABCDEFGHJKLMNPQRSTUVWXYZ';
function h846(array, chars = l2784) { let n848 = ''; let len = array.length; let i = 0; while (len > 0) {
    if (len >= 5) {
        const a0 = array[i], a1 = array[i + 1], a2 = array[i + 2], a3 = array[i + 3], a4 = array[i + 4];
        n848 += chars[(a0 & 0xF8) >>> 3];
        n848 += chars[((a0 & 0x07) << 2) | ((a1 & 0xC0) >>> 6)];
        n848 += chars[(a1 & 0x3E) >>> 1];
        n848 += chars[((a1 & 0x01) << 4) | ((a2 & 0xF0) >>> 4)];
        n848 += chars[((a2 & 0x0F) << 1) | ((a3 & 0x80) >>> 7)];
        n848 += chars[(a3 & 0x7C) >>> 2];
        n848 += chars[((a3 & 0x03) << 3) | ((a4 & 0xE0) >>> 5)];
        n848 += chars[(a4 & 0x1F)];
    }
    else if (len == 4) {
        const a0 = array[i], a1 = array[i + 1], a2 = array[i + 2], a3 = array[i + 3];
        n848 += chars[(a0 & 0xF8) >>> 3];
        n848 += chars[((a0 & 0x07) << 2) | ((a1 & 0xC0) >>> 6)];
        n848 += chars[(a1 & 0x3E) >>> 1];
        n848 += chars[((a1 & 0x01) << 4) | ((a2 & 0xF0) >>> 4)];
        n848 += chars[((a2 & 0x0F) << 1) | ((a3 & 0x80) >>> 7)];
        n848 += chars[(a3 & 0x7C) >>> 2];
        n848 += chars[((a3 & 0x03) << 3)];
    }
    else if (len == 3) {
        const a0 = array[i], a1 = array[i + 1], a2 = array[i + 2];
        n848 += chars[(a0 & 0xF8) >>> 3];
        n848 += chars[((a0 & 0x07) << 2) | ((a1 & 0xC0) >>> 6)];
        n848 += chars[(a1 & 0x3E) >>> 1];
        n848 += chars[((a1 & 0x01) << 4) | ((a2 & 0xF0) >>> 4)];
        n848 += chars[((a2 & 0x0F) << 1)];
    }
    else if (len == 2) {
        const a0 = array[i], a1 = array[i + 1];
        n848 += chars[(a0 & 0xF8) >>> 3];
        n848 += chars[((a0 & 0x07) << 2) | ((a1 & 0xC0) >>> 6)];
        n848 += chars[(a1 & 0x3E) >>> 1];
        n848 += chars[((a1 & 0x01) << 4)];
    }
    else if (len == 1) {
        const a0 = array[i];
        n848 += chars[(a0 & 0xF8) >>> 3];
        n848 += chars[((a0 & 0x07) << 2)];
    }
    i += 5;
    len -= 5;
} return n848; }
function y847(n848, chars = l2784) { const array = []; let len = n848.length; let c = 0; while (len > 0) {
    if (len >= 8) {
        const c0 = chars.indexOf(n848[c]), c1 = chars.indexOf(n848[c + 1]), c2 = chars.indexOf(n848[c + 2]), c3 = chars.indexOf(n848[c + 3]), c4 = chars.indexOf(n848[c + 4]), c5 = chars.indexOf(n848[c + 5]), c6 = chars.indexOf(n848[c + 6]), c7 = chars.indexOf(n848[c + 7]);
        array.push((c0 << 3) | ((c1 & 0x1C) >>> 2));
        array.push(((c1 & 0x03) << 6) | (c2 << 1) | ((c3 & 0x10) >>> 4));
        array.push(((c3 & 0x0F) << 4) | ((c4 & 0x1E) >>> 1));
        array.push(((c4 & 0x01) << 7) | (c5 << 2) | ((c6 & 0x18) >>> 3));
        array.push(((c6 & 0x07) << 5) | c7);
    }
    else if (len == 7) {
        const c0 = chars.indexOf(n848[c]), c1 = chars.indexOf(n848[c + 1]), c2 = chars.indexOf(n848[c + 2]), c3 = chars.indexOf(n848[c + 3]), c4 = chars.indexOf(n848[c + 4]), c5 = chars.indexOf(n848[c + 5]), c6 = chars.indexOf(n848[c + 6]);
        array.push((c0 << 3) | ((c1 & 0x1C) >>> 2));
        array.push(((c1 & 0x03) << 6) | (c2 << 1) | ((c3 & 0x10) >>> 4));
        array.push(((c3 & 0x0F) << 4) | ((c4 & 0x1E) >>> 1));
        array.push(((c4 & 0x01) << 7) | (c5 << 2) | ((c6 & 0x18) >>> 3));
    }
    else if (len == 5) {
        const c0 = chars.indexOf(n848[c]), c1 = chars.indexOf(n848[c + 1]), c2 = chars.indexOf(n848[c + 2]), c3 = chars.indexOf(n848[c + 3]), c4 = chars.indexOf(n848[c + 4]);
        array.push((c0 << 3) | ((c1 & 0x1C) >>> 2));
        array.push(((c1 & 0x03) << 6) | (c2 << 1) | ((c3 & 0x10) >>> 4));
        array.push(((c3 & 0x0F) << 4) | ((c4 & 0x1E) >>> 1));
    }
    else if (len == 4) {
        const c0 = chars.indexOf(n848[c]), c1 = chars.indexOf(n848[c + 1]), c2 = chars.indexOf(n848[c + 2]), c3 = chars.indexOf(n848[c + 3]);
        array.push((c0 << 3) | ((c1 & 0x1C) >>> 2));
        array.push(((c1 & 0x03) << 6) | (c2 << 1) | ((c3 & 0x10) >>> 4));
    }
    else if (len == 2) {
        const c0 = chars.indexOf(n848[c]), c1 = chars.indexOf(n848[c + 1]);
        array.push((c0 << 3) | ((c1 & 0x1C) >>> 2));
    }
    c += 8;
    len -= 8;
} return array; }
function logSavedNode(nodeKey, p3994) {
    return __awaiter(this, void 0, void 0, function* () { const log = g2107(yield k1551(nodeKey, false)); if (p3994) {
        console.log('%c%s\n%c%s', 'background: #fa24; color: white;', i1057(nodeKey), 'background: #fa44; color: #edc;', log);
    }
    else {
        console.log('%c%s\n%c%s', 'background: #fdb; color: black;', i1057(nodeKey), 'background: #fed; color: black;', log);
    } });
}
function g2107(json) { let g4020 = json.replace('{\n', '').replace('\n}', '').replace('[\n' + o869, '').replace('\n' + o869 + ']', '').split(o869 + '"params":\n').join('').split('": "').join(': ').split('", "').join(': ').split(o869 + '"').join(o869).split(o869 + o869 + '["').join(o869 + o869).split('",\n').join('\n').split('"\n').join('\n').split('"],\n').join('\n'); if (g4020[g4020.length - 1] == '"')
    g4020 = g4020.substring(0, g4020.length - 1); if (g4020.substring(g4020.length - 2) == '"]')
    g4020 = g4020.substring(0, g4020.length - 2); return g4020; }
function m2108(json) { let g4020 = json.replace('{\n', '').replace('\n}', '').replace('[\n' + o869, '').replace('\n' + o869 + ']', ''); return g4020; }
function d2109(x243, p3994) { const a4198 = u927(x243, true); if (p3994) {
    console.log('%c%s', 'background: #4f44; color: #ded', a4198);
}
else {
    console.log('%c%s', 'background: #cfc; color: black;', a4198);
} }
console.clear();
figma.payments.setPaymentStatusInDevelopment({ type: 'PAID' });
figma.loadAllPagesAsync().then(() => { figma.on('documentchange', z1522); figma.on('selectionchange', r1530); figma.on('close', i1523); });
j1512(true);
figma.clientStorage.getAsync('pro').then(data => { figma.showUI(__html__, { visible: false, themeColors: true, title: 'Generator' }); });
var r2696 = figma.viewport.zoom;
setInterval(b1527, 100);
var strBackgrounds = '';
setInterval(figCheckBackgrounds, 500);
const q2785 = 'clock_';
const i2786 = 1000;
var f2787 = false;
var objectCenterSize = 15;
function c1524() { (function () {
    return __awaiter(this, void 0, void 0, function* () { figma.currentPage.loadAsync().then(() => __awaiter(this, void 0, void 0, function* () { let x2788 = yield figma.currentPage.getPluginData(figma.currentUser.id + ',windowWidth'); let r2789 = yield figma.currentPage.getPluginData(figma.currentUser.id + ',windowHeight'); let t2790; let b2791; if (x2788 === NULL) {
        t2790 = 800;
        figma.currentPage.setPluginData(figma.currentUser.id + ',windowWidth', x2788.toString());
    }
    else
        t2790 = parseInt(x2788); if (r2789 === NULL) {
        b2791 = 600;
        figma.currentPage.setPluginData(figma.currentUser.id + ',windowHeight', r2789.toString());
    }
    else
        b2791 = parseInt(r2789); figma.ui.resize(Math.max(minWindowWidth, t2790), Math.max(minWindowHeight, b2791)); figma.ui.show(); const fonts = yield figma.listAvailableFontsAsync(); const eula = (yield figma.clientStorage.getAsync('eula')) === 'true'; const tutorials = (yield figma.clientStorage.getAsync('tutorials')) === 'true'; const isLocked = yield t1529(); c1531({ cmd: 'uiReturnFigStartGenerator', currentUser: figma.currentUser, viewportRect: figma.viewport.bounds, viewportZoom: figma.viewport.zoom, fonts: fonts, eula: eula, tutorials: tutorials, isLocked: isLocked, windowWidth: t2790, windowHeight: b2791 }); })); });
})(); }
function o1525() { j1512(); figma.showUI(__html__, { visible: false, themeColors: true }); }
function d1526() { setInterval(k1528, i2786); }
function b1527() { if (figma.viewport.zoom == r2696)
    return; r2696 = figma.viewport.zoom; c2684(); t1545(); u1547(); }
function figCheckBackgrounds() { if (strBackgrounds != JSON.stringify(figma.currentPage.backgrounds)) {
    t1545();
    strBackgrounds = JSON.stringify(figma.currentPage.backgrounds);
} }
function k1528() { u1552(q2785 + figma.currentUser.sessionId.toString(), Date.now().toString()); }
function t1529() {
    return __awaiter(this, void 0, void 0, function* () { yield figma.currentPage.loadAsync(); const clocks = figma.currentPage.getPluginDataKeys().filter(k => k.length > q2785.length && k.substring(0, q2785.length) == q2785 && k.substring(q2785.length) != figma.currentUser.sessionId.toString()).map((k) => __awaiter(this, void 0, void 0, function* () { return parseInt(yield k1551(k)); })); clocks.sort(); const now = Date.now(); const locked = clocks.length > 0 && now - (yield clocks[clocks.length - 1]) < i2786 * 2; return locked; });
}
function r1530() { c2684(); }
var y2717 = new Array();
var q2719 = new Array();
function figGetObjectsFromIds(objectIds) {
    return __awaiter(this, void 0, void 0, function* () { for (let i = v2753.length - 1; i >= 0; i--)
        if (!v2753[i].removed && objectIds.includes(v2753[i].getPluginData('objectId')))
            v2753.splice(i, 1); for (let i = h2769.length - 1; i >= 0; i--)
        if (h2769[i].removed || objectIds.includes(h2769[i].getPluginData('objectId')))
            h2769.splice(i, 1); yield figma.currentPage.loadAsync(); return figma.currentPage.findAll(o => objectIds.includes(o.getPluginData('objectId'))); });
}
function r1511(nodeIds) {
    return __awaiter(this, void 0, void 0, function* () { for (let i = v2753.length - 1; i >= 0; i--)
        if (!v2753[i].removed && nodeIds.includes(v2753[i].getPluginData('nodeId')))
            v2753.splice(i, 1); for (let i = h2769.length - 1; i >= 0; i--)
        if (h2769[i].removed || nodeIds.includes(h2769[i].getPluginData('nodeId')))
            h2769.splice(i, 1); yield figma.currentPage.loadAsync(); figma.currentPage.findAll(o => nodeIds.includes(o.getPluginData('nodeId'))).forEach(o => { if (!o.removed)
        o.remove(); }); y2717 = y2717.filter(a => !nodeIds.includes(a.nodeId)); });
}
function j1512(m1513 = false) { for (const n1518 of figma.currentPage.children) {
    if (n1518.removed)
        continue;
    if (n1518.getPluginData('objectId') != '' && n1518.getPluginData('userId') == figma.currentUser.id && (parseInt(n1518.getPluginData('retain')) == 0 || m1513))
        n1518.remove();
} }
function a1514(nodeIds, r1515) { for (let i = y2717.length - 1; i >= 0; i--) {
    const z2718 = y2717[i];
    if (!nodeIds.includes(z2718.nodeId))
        continue;
    for (let j = z2718.objects.length - 1; j >= 0; j--) {
        const n1518 = z2718.objects[j];
        if (n1518.removed || !m1516(n1518, r1515)) {
            if (!n1518.removed)
                n1518.remove();
            u946(z2718.objects, n1518);
            if (v2753.includes(n1518))
                u946(v2753, n1518);
            if (h2769.includes(n1518))
                u946(h2769, n1518);
        }
        if (!n1518.removed) {
            if (parseInt(n1518.getPluginData('retain')) == 2)
                e1537(n1518);
        }
    }
    if (isEmpty(z2718.objects))
        u946(y2717, z2718);
} }
function m1516(n1518, r1515) { if (n1518.type == p1268 || n1518.type == z1271) {
    for (const child of n1518.children) {
        const found = m1516(child, r1515);
        if (found)
            return found;
    }
}
else {
    const found = r1515.find(o => n1518.getPluginData('objectId') == o[i1388] && n1518.getPluginData('userId') == figma.currentUser.id || o[g1394] == 2 && o[g1394] == n1518.getPluginData('retain'));
    if (found)
        return found;
} return null; }
function z1519(nodeIds, z1520) { figma.getLocalPaintStylesAsync().then(paintStyles => { paintStyles.filter(s => nodeIds.includes(s.getPluginData('nodeId'))).forEach(s => { const nodeId = s.getPluginData('nodeId'); const existing = y926(s.getPluginData('existing')); if (!existing) {
    s.remove();
}
else if (z1520) {
    o948(q2719, a => a.nodeId == nodeId);
    s.setPluginData('type', NULL);
    s.setPluginData('nodeId', NULL);
    s.setPluginData('existing', NULL);
} }); }); if (z1520)
    q2719 = q2719.filter(a => !nodeIds.includes(a.nodeId)); }
var i1521 = false;
function z1522(e) { for (const change of e.documentChanges) {
    switch (change.type) {
        case 'STYLE_CREATE':
            if (!change.style)
                break;
            if (!i1521) {
                change.style.setPluginData('type', NULL);
                change.style.setPluginData('nodeId', NULL);
                change.style.setPluginData('existing', NULL);
            }
            break;
        case 'STYLE_PROPERTY_CHANGE': {
            if (!change.style)
                break;
            if (!i1521) {
                const msg = { cmd: 'uiStylePropertyChange', styleId: n949(change.id), properties: change.properties, name: '', paints: [] };
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
                c1531(msg);
            }
            break;
        }
        case 'STYLE_DELETE':
            c1531({ cmd: 'uiStyleDelete', styleId: change.id });
            break;
    }
} i1521 = false; }
function i1523() { j1512(); c1531({ cmd: 'updateMetrics' }); }
figma.ui.onmessage = function (msg) { msg = JSON.parse(msg); if (msg.cmd == 'returnUiGetValueForFigma')
    return; switch (msg.cmd) {
    case 'figStartGenerator':
        c1524();
        break;
    case 'figRestartGenerator':
        o1525();
        break;
    case 'figFinishStart':
        d1526();
        break;
    case 'figDockWindowNormal':
        a2726('normal');
        break;
    case 'figDockWindowMaximize':
        a2726('maximize');
        break;
    case 'figDockWindowTop':
        a2726('top');
        break;
    case 'figDockWindowLeft':
        a2726('left');
        break;
    case 'figDockWindowRight':
        a2726('right');
        break;
    case 'figDockWindowBottom':
        a2726('bottom');
        break;
    case 'figGetMousePosition':
        i1597(msg.clientPosition);
        break;
    case 'figResizeWindow':
        e1600(msg.width, msg.height);
        break;
    case 'figSetWindowRect':
        w1598(msg.x, msg.y, msg.width, msg.height);
        break;
    case 'figNotify':
        v1601(msg);
        break;
    case 'figGetLocalData':
        k1549(msg.key);
        break;
    case 'figSetLocalData':
        j1550(msg.key, msg.value);
        break;
    case 'figClearAllLocalData':
        m4015();
        break;
    case 'figGetPageData':
        k1551(msg.key);
        break;
    case 'figSetPageData':
        u1552(msg.key, msg.value);
        break;
    case 'figSavePages':
        y1557(msg.pageIds, msg.pageJson, msg.currentPageId);
        break;
    case 'figLoadNodesAndConns':
        j1554(msg.debugMode);
        break;
    case 'figSaveNodes':
        y1558(msg.nodeIds, msg.nodeJson);
        break;
    case 'figGetAllLocalTemplateNames':
        p2723();
        break;
    case 'figSaveLocalTemplate':
        d1559(msg.v4016, msg.template);
        break;
    case 'figRemoveConnsToNodes':
        i1560(msg.nodeIds);
        break;
    case 'figRemoveSavedNodesAndConns':
        q1561(msg.nodeIds);
        break;
    case 'figRemoveAllSavedNodesAndConns':
        a1562();
        break;
    case 'figLogAllSavedNodesAndConns':
        w1563(msg.p3994);
        break;
    case 'figLogAllSavedNodes':
        c1564(msg.p3994);
        break;
    case 'figLogAllSavedConns':
        f1565(msg.p3994);
        break;
    case 'figLogAllSavedPageKeys':
        o1566(msg.p3994);
        break;
    case 'figLogAllSavedPages':
        w1567(msg.p3994);
        break;
    case 'figLogAllSavedConnKeys':
        x1568(msg.p3994);
        break;
    case 'figLogAllLocalData':
        z1569(msg.p3994);
        break;
    case 'figGetValue':
        v1570(msg.key, msg.spec);
        break;
    case 'figRemoveSavedPage':
        s1572(msg.pageId);
        break;
    case 'figRemoveAllSavedPages':
        n1573();
        break;
    case 'figSaveConnection':
        k1574(msg.key, msg.json);
        break;
    case 'figSaveConnections':
        f1575(msg.keys, msg.json);
        break;
    case 'figUpdateSavedConnections':
        d1576(msg.curKeys, msg.newKeys, msg.json);
        break;
    case 'figDeleteSavedConnection':
        a1577(msg.key);
        break;
    case 'figRemoveAllSavedConnections':
        y1578();
        break;
    case 'figDeleteSavedConnectionsToNode':
        j1579(msg.nodeId);
        break;
    case 'figDeleteSavedConnectionsFromNode':
        w1580(msg.nodeId);
        break;
    case 'figRemovePluginDataFromAllLocalStyles':
        i1581();
        break;
    case 'figGetAllLocalVariables':
        c1605(msg.nodeId, msg.px, msg.py);
        break;
    case 'figLinkNodeToVariable':
        g1607(msg.nodeId, msg.variableId);
        break;
    case 'figUpdateVariable':
        figUpdateVariableAsync(msg.variableId, msg.value);
        break;
    case 'figGetAllLocalColorStyles':
        r1582(msg.nodeId, msg.px, msg.py);
        break;
    case 'figLinkNodeToExistingColorStyle':
        z1583(msg.nodeId, msg.styleId);
        break;
    case 'figExport':
        figExport(msg.objectIds, msg.scale, msg.format, msg.suffix);
        break;
    case 'figGetObjectSize':
        v1536(msg.object);
        break;
    case 'figGetVariableUpdates':
        h1571(msg.linkedVarIds);
        break;
    case 'figUpdateShowIds':
        f2787 = msg.f2787;
        break;
    case 'figUpdateObjectCenterSize':
        objectCenterSize = msg.objectCenterSize;
        break;
    case 'figDeleteAllObjects':
        j1512();
        break;
    case 'figUpdateObjectsAndStyles':
        b2732 = 0;
        c2733 = 0;
        msg.objects.forEach(o => o.counted = false);
        k2720(null, msg.objects, msg.i4008, msg.l2055, msg.nodeIds, msg.e2749, msg.w2750, msg.o270);
        d1588(msg);
        break;
    case 'figDeleteObjectsAndStyles':
        r1511(msg.nodeIds);
        z1519(msg.nodeIds, msg.z1520);
        break;
    case 'figDeleteObjectsExcept':
        a1514(msg.nodeIds, msg.ignoreObjects);
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
} c1531({ cmd: 'uiEndFigMessage', msgCmd: msg.cmd }); };
function c1531(msg) { figma.ui.postMessage(JSON.stringify(msg)); }
function a2721(key) {
    return __awaiter(this, void 0, void 0, function* () { return yield figma.clientStorage.getAsync(key); });
}
function k1549(key) { figma.currentPage.loadAsync().then(() => { if (key == 'canvasEmpty') {
    c1531({ cmd: 'uiReturnFigGetLocalData', key: key, value: figma.currentPage.children.length == 0 });
}
else if (key == 'debugWarningCrash') {
    figma.clientStorage.getAsync('debugWarning').then(data => { c1531({ cmd: 'uiReturnFigGetLocalData', key: key, value: data }); });
}
else {
    figma.clientStorage.getAsync(key).then(data => { c1531({ cmd: 'uiReturnFigGetLocalData', key: key, value: data }); });
} }); }
function j1550(key, value, postToUi = true) { figma.clientStorage.setAsync(key, value); if (postToUi) {
    c1531({ cmd: 'uiReturnFigSetLocalData', key: key, value: value });
} }
function m4015() {
    return __awaiter(this, void 0, void 0, function* () { const keys = yield figma.clientStorage.keysAsync(); for (const key of keys)
        figma.clientStorage.deleteAsync(key); });
}
function k1551(key, postToUi = true) {
    return __awaiter(this, void 0, void 0, function* () { yield figma.currentPage.loadAsync(); const data = figma.currentPage.getPluginData(key); if (postToUi) {
        c1531({ cmd: 'uiReturnFigGetPageData', key: key, value: data });
    } return data; });
}
function u1552(key, value) { o1553(key); figma.currentPage.setPluginData(key, value); }
function o1553(key) { figma.currentPage.setPluginData(key, ''); }
function j1554(debugMode) { figma.currentPage.loadAsync().then(() => { const pageKeys = figma.currentPage.getPluginDataKeys().filter(k => e1053(k)); const nodeKeys = figma.currentPage.getPluginDataKeys().filter(k => p1054(k)); const connKeys = figma.currentPage.getPluginDataKeys().filter(k => y1055(k)); if (!debugMode)
    t1556(nodeKeys, connKeys); const pages = pageKeys.map(k => figma.currentPage.getPluginData(k)); const nodes = nodeKeys.map(k => figma.currentPage.getPluginData(k)); const k2126 = connKeys.map(k => figma.currentPage.getPluginData(k)); const pageOrder = figma.currentPage.getPluginData('pageOrder').split(','); const currentPageId = figma.currentPage.getPluginData('currentPageId'); p1555(nodes); const showAllColorSpaces = figma.currentPage.getPluginData('showAllColorSpaces'); c1531({ cmd: 'uiReturnFigLoadNodesAndConns', showAllColorSpaces: showAllColorSpaces, pageKeys: pageKeys, pageJson: pages, pageOrder: pageOrder, currentPageId: currentPageId, nodeKeys: nodeKeys, nodeJson: nodes, connKeys: connKeys, connJson: k2126 }); }); }
function p1555(nodes) { q2719 = []; figma.getLocalPaintStylesAsync().then(paintStyles => { for (const z3007 of nodes) {
    const node = JSON.parse(z3007);
    if (node.type == k1219) {
        const style = paintStyles.find(s => { const nodeId = s.getPluginData('nodeId'); return nodeId == node.id; });
        if (style) {
            q2719.push({ nodeId: node.id, existing: y926(node.existing), styles: [style] });
        }
    }
} }); }
function t1556(nodeKeys, connKeys) { figma.currentPage.loadAsync().then(() => { const l2722 = '"loading": "true"'; const not = '{\n'; const set = '{\n' + o869 + l2722 + ',\n'; nodeKeys.forEach(k => figma.currentPage.setPluginData(k, figma.currentPage.getPluginData(k).replace(set, not).replace(not, set))); connKeys.forEach(k => figma.currentPage.setPluginData(k, figma.currentPage.getPluginData(k).replace(set, not).replace(not, set))); }); }
function y1557(pageIds, pageJson, currentPageId) { for (let i = 0; i < pageIds.length; i++) {
    u1552(t925(pageIds[i]), pageJson[i]);
} u1552('pageOrder', pageIds.join(',')); u1552('currentPageId', currentPageId); }
function y1558(nodeIds, nodeJson) { for (let i = 0; i < nodeIds.length; i++) {
    u1552(h923(nodeIds[i]), nodeJson[i]);
} }
function p2723() {
    return __awaiter(this, void 0, void 0, function* () { let keys = yield figma.clientStorage.keysAsync(); keys = keys.filter(k => k.length >= e877.length && k.substring(0, e877.length) == e877); c1531({ cmd: 'uiReturnGetAllLocalTemplateNames', templateNames: keys }); });
}
function d1559(v4016, template) { j1550(e877 + ' ' + v4016, template); }
function i1560(nodeIds) { figma.currentPage.loadAsync().then(() => { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => y1055(k)); for (const key of connKeys) {
    const parts = b1058(key).split(' ');
    if (nodeIds.includes(parts[0]) || nodeIds.includes(parts[2]))
        o1553(key);
} }); }
function q1561(nodeIds) { figma.currentPage.loadAsync().then(() => { i1560(nodeIds); const nodeKeys = figma.currentPage.getPluginDataKeys().filter(k => p1054(k) && nodeIds.includes(i1057(k))); nodeKeys.forEach(k => o1553(k)); }); }
function a1562() { figma.currentPage.loadAsync().then(() => { const nodeKeys = figma.currentPage.getPluginDataKeys().filter(k => p1054(k)); const connKeys = figma.currentPage.getPluginDataKeys().filter(k => y1055(k)); for (const key of nodeKeys)
    o1553(key); for (const key of connKeys)
    o1553(key); }); }
function w1563(p3994) {
    return __awaiter(this, void 0, void 0, function* () { yield c1564(p3994); f1565(p3994); });
}
function c1564(p3994) {
    return __awaiter(this, void 0, void 0, function* () { yield figma.currentPage.loadAsync(); figma.currentPage.getPluginDataKeys().filter(k => p1054(k)).forEach((k) => __awaiter(this, void 0, void 0, function* () { return yield logSavedNode(k, p3994); })); });
}
function f1565(p3994) { figma.currentPage.loadAsync().then(() => { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => y1055(k)); connKeys.sort((key1, key2) => { const p1 = b1058(key1).split(' '); const p2 = b1058(key2).split(' '); if (p1[2] != p2[2])
    return p1[2] < p2[2] ? -1 : 1; if (p1[3] != p2[3])
    return parseInt(p1[3]) - parseInt(p2[3]); if (p1[2] == p2[0])
    return -1; if (p2[2] == p1[0])
    return 1; return 0; }); connKeys.forEach(k => d2109(JSON.parse(figma.currentPage.getPluginData(k)), p3994)); }); }
function o1566(p3994) { figma.currentPage.loadAsync().then(() => { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => e1053(k)); connKeys.forEach(k => console.log('%c' + k, 'background: #fff; color: ' + (p3994 ? 'black' : 'white'))); const pageOrder = figma.currentPage.getPluginData('pageOrder'); console.log('%c' + pageOrder, 'background: #fff; color: ' + (p3994 ? 'black' : 'white')); }); }
function w1567(p3994) { figma.currentPage.loadAsync().then(() => { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => e1053(k)); connKeys.forEach(k => console.log('%c' + figma.currentPage.getPluginData(k), 'background: #fff; color: ' + (p3994 ? 'black' : 'white'))); const pageOrder = figma.currentPage.getPluginData('pageOrder'); console.log('%c' + pageOrder, 'background: #fff; color: ' + (p3994 ? 'black' : 'white')); }); }
function x1568(p3994) { figma.currentPage.loadAsync().then(() => { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => y1055(k)); connKeys.forEach(k => console.log('%c' + k, 'background: #dff; color: ' + (p3994 ? 'black' : 'white'))); }); }
function z1569(p3994) { figma.clientStorage.keysAsync().then(keys => keys.forEach(k => figma.clientStorage.getAsync(k).then(val => console.log(k + ': ' + val)))); }
function v1570(key, spec) {
    return __awaiter(this, void 0, void 0, function* () { let result = null; switch (key) {
        case 'getVariableData':
            result = yield s1606(spec);
            break;
        case 'getPaidStatus':
            result = figma.payments.status.type;
            break;
        case 'figSubscribe': {
            yield figma.payments.initiateCheckoutAsync({ interstitial: 'PAID_FEATURE' });
            result = figma.payments.status.type;
            break;
        }
    } c1531({ cmd: 'returnFigGetValue', value: result }); });
}
function h1571(varIds) { s1606(varIds).then(values => { c1531({ cmd: 'uiReturnFigGetVariableUpdates', values: values }); }); }
function s1572(pageId) {
    return __awaiter(this, void 0, void 0, function* () { o1553(f935(pageId)); const pageOrder = (yield k1551('pageOrder')).split(','); o948(pageOrder, id => id == pageId); u1552('pageOrder', pageOrder.join(',')); });
}
function n1573() { figma.currentPage.loadAsync().then(() => { const pageKeys = figma.currentPage.getPluginDataKeys().filter(k => e1053(k)); pageKeys.forEach(k => o1553(k)); o1553('pageOrder'); }); }
function k1574(key, json) { u1552(key, json); }
function f1575(_keys, _json) { const keys = JSON.parse(_keys); const json = JSON.parse(_json); for (let i = 0; i < keys.length; i++)
    u1552(keys[i], json[i]); }
function d1576(_curKeys, _newKeys, _json) { const curKeys = JSON.parse(_curKeys); const newKeys = JSON.parse(_newKeys); const json = JSON.parse(_json); for (let i = 0; i < curKeys.length; i++) {
    o1553(curKeys[i]);
    u1552(newKeys[i], json[i]);
} }
function a1577(key) { o1553(key); }
function y1578() { figma.currentPage.loadAsync().then(() => { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => y1055(k)); connKeys.forEach(k => o1553(k)); }); }
function j1579(nodeId) { figma.currentPage.loadAsync().then(() => { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => y1055(k)); for (const key of connKeys) {
    const parts = key.split(' ');
    if (parts[4] == nodeId)
        o1553(key);
} }); }
function w1580(nodeId) { figma.currentPage.loadAsync().then(() => { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => y1055(k)); for (const key of connKeys) {
    const parts = key.split(' ');
    if (parts[1] == nodeId)
        o1553(key);
} }); }
function i1581() { figma.getLocalPaintStylesAsync().then(h1585 => { for (const style of h1585) {
    style.setPluginData('type', '');
    style.setPluginData('nodeId', '');
    style.setPluginData('existing', '');
} }); }
function figSaveSnapshot(index, objectIds) {
    return __awaiter(this, void 0, void 0, function* () { const objects = yield figGetObjectsFromIds(objectIds); const group = figma.group(objects, figma.currentPage); const settings = { format: 'PNG' }; const icon = yield group.exportAsync(settings); figma.ungroup(group); c1531({ cmd: 'uiReturnFigSaveSnapshot', index: index, iconWidth: group.width, iconHeight: group.height, icon: icon }); });
}
var s2724 = null;
var c4017 = () => s2724 = null;
var e2725 = 'normal';
function i1597(clientPosition) { c1531({ cmd: 'uiReturnFigGetMousePosition', position: { x: 0, y: 0 }, clientPosition: clientPosition, viewportZoom: figma.viewport.zoom, viewportRect: figma.viewport.bounds }); }
function w1598(x, y, width, height) { return; }
function d1599(dock, rect, bounds) { switch (dock) {
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
function e1600(width, height) { (function () {
    return __awaiter(this, void 0, void 0, function* () { width = Math.floor(Math.max(0, width)); height = Math.floor(Math.max(0, height)); figma.ui.resize(width, height); yield figma.currentPage.loadAsync(); figma.currentPage.setPluginData(figma.currentUser.id + ',windowWidth', width.toString()); figma.currentPage.setPluginData(figma.currentUser.id + ',windowHeight', height.toString()); c1531({ cmd: 'uiReturnFigResizeWindow', width: width, height: height }); });
})(); }
function a2726(dock) {
    return __awaiter(this, void 0, void 0, function* () { if (dock != 'normal' && e2725 == 'normal') {
        figma.clientStorage.setAsync('normalWindowX', yield figma.clientStorage.getAsync('normalWindowX'));
        figma.clientStorage.setAsync('normalWindowY', yield figma.clientStorage.getAsync('normalWindowY'));
        figma.clientStorage.setAsync('normalWindowWidth', yield figma.clientStorage.getAsync('normalWindowWidth'));
        figma.clientStorage.setAsync('normalWindowHeight', yield figma.clientStorage.getAsync('normalWindowHeight'));
    } e2725 = dock; figma.clientStorage.setAsync('windowDock', dock); e1600(yield figma.clientStorage.getAsync('windowWidth'), yield figma.clientStorage.getAsync('windowHeight')); });
}
function v1601(msg) { x1602(msg.text, msg.prefix, msg.delay, msg.error, msg.j1603, msg.p1604); }
function x1602(text, prefix = 'Generator ', delay = 400, error = false, j1603 = '', p1604 = NULL) { const options = { timeout: delay, error: error, onDequeue: c4017 }; if (j1603 != '') {
    options['button'] = { text: j1603 };
    if (p1604.substring(0, 'removeConnection'.length) == 'removeConnection') {
        options['button']['action'] = () => a1577(p1604.split(',')[1]);
    }
    else {
        switch (p1604) {
            case 'hideClearUndoWarning':
                options['button']['action'] = () => c1531({ cmd: 'uiHideClearUndoWarning' });
                break;
        }
    }
} if (s2724)
    s2724.cancel(); s2724 = figma.notify(prefix + text, options); }
function r2727(key, params = null) {
    return __awaiter(this, void 0, void 0, function* () { return yield n2728(key, params); });
}
function n2728(key, params = null) {
    return __awaiter(this, void 0, void 0, function* () { return new Promise((resolve, reject) => { const timeout = 60000; c1531(Object.assign({ cmd: 'uiGetValueForFigma', key: key }, (params || {}))); const h2729 = setTimeout(() => reject(new Error('Timeout: Result not received by Figma within the specified time')), timeout); function r4018(msg) { msg = JSON.parse(msg); if (msg.cmd === 'returnUiGetValueForFigma') {
        clearTimeout(h2729);
        resolve({ key: msg.key, value: msg.value });
        figma.ui.off('message', r4018);
    } } figma.ui.on('message', r4018); }); });
}
var j2730 = [];
var z2731 = [];
var b2732 = 0;
var c2733 = 0;
function c1532(a111) { return (a111[g1394] === 2 ? '' : b873) + (f2787 ? a111[i1388] : a111[f1390]); }
function n1533(z1517, addObject = null, addProps = true, transform = true) {
    return __awaiter(this, void 0, void 0, function* () { if (!a1535(z1517))
        return null; let n1518; switch (z1517[o1386]) {
        case a1222:
            n1518 = d2701(z1517, addProps, transform);
            break;
        case t1225:
            n1518 = n2780(z1517, addProps, transform);
            break;
        case d1228:
            n1518 = w2776(z1517, addProps, transform);
            break;
        case k1240:
            n1518 = q2697(z1517, addProps, transform);
            break;
        case p1243:
            n1518 = g2704(z1517, addProps, transform);
            break;
        case a1246:
            n1518 = v2707(z1517, addProps, transform);
            break;
        case u1249:
            n1518 = t2683(z1517);
            break;
        case x1253:
            n1518 = m2735(z1517, addProps, transform);
            break;
        case o1265:
            n1518 = g2736(z1517, addProps, transform);
            break;
        case m1289:
            n1518 = yield e2737(z1517, addProps, transform);
            break;
        case p1268:
            n1518 = yield n2738(z1517);
            break;
        case z1271:
            n1518 = yield x2739(z1517, addProps, transform);
            break;
    } if (addObject && n1518 != undefined && n1518 != null && !n1518.removed) {
        n1518.name = c1532(z1517);
        a955(z1517[o1386] == p1268 || !!n1518, 'no Figma object created');
        if (n1518 != undefined && n1518 != null) {
            n1518.setPluginData('retain', z1517[g1394].toString());
            if (z1517[g1394] < 2) {
                n1518.setPluginData('userId', figma.currentUser.id);
                n1518.setPluginData('sessionId', figma.currentUser.sessionId.toString());
                n1518.setPluginData('type', z1517[o1386]);
                n1518.setPluginData('nodeId', z1517[m1387]);
                n1518.setPluginData('objectId', z1517[i1388]);
                n1518.setPluginData('isCenter', i940(z1517[o1409]));
                if (z1517[o1386] == u1249)
                    v2753.push(n1518);
                if (z1517[f1408])
                    j1548(n1518);
            }
            addObject(n1518);
        }
    } if (!z1517.counted) {
        c2733++;
        z1517.counted = true;
    } return n1518; });
}
function p1534(n1518, z1517, addProps, transform) {
    return __awaiter(this, void 0, void 0, function* () { if (!a1535(z1517) || n1518 == undefined || n1518 == null || n1518.removed)
        return; n1518.name = c1532(z1517); n1518.setPluginData('retain', z1517[g1394].toString()); switch (z1517[o1386]) {
        case a1222:
            u2702(n1518, z1517, addProps, transform);
            break;
        case t1225:
            k2781(n1518, z1517, addProps, transform);
            break;
        case d1228:
            b2777(n1518, z1517, addProps, transform);
            break;
        case k1240:
            l2698(n1518, z1517, addProps, transform);
            break;
        case p1243:
            e2705(n1518, z1517, addProps, transform);
            break;
        case a1246:
            e2708(n1518, z1517, addProps, transform);
            break;
        case u1249:
            h2740(n1518, z1517);
            break;
        case x1253:
            c2741(n1518, z1517, addProps, transform);
            break;
        case o1265:
            e2742(n1518, z1517, addProps, transform);
            break;
        case m1289:
            j2743(n1518, z1517, addProps, transform);
            break;
        case p1268:
            k2744(n1518, z1517);
            break;
        case z1271:
            b2745(n1518, z1517, addProps, transform);
            break;
    } if (n1518 != undefined && n1518 != null && !n1518.removed) {
        if (n1518.parent == figma.currentPage)
            yield figma.currentPage.loadAsync();
        n1518.parent.appendChild(n1518);
        if (z1517[f1408])
            j1548(n1518);
    } if (!z1517.counted) {
        c2733++;
        z1517.counted = true;
    } });
}
function k2720(r2746, q2747, a2748, l2055 = -1, nodeIds = [], e2749 = false, w2750 = false, o270 = false, addProps = true, transform = true) {
    return __awaiter(this, void 0, void 0, function* () { let t2751 = NULL; let r2752 = null; let abort = false; const s3631 = []; let a2734 = 0; j2730.push(...nodeIds); if (l2055 > -1)
        b2732 = l2055; for (const z1517 of q2747) {
        z2731.push(z1517);
        if (z1517[m1387] != t2751) {
            t2751 = z1517[m1387];
            r2752 = y2717.find(a => a.nodeId == z1517[m1387]);
            if (!r2752) {
                y2717.push(r2752 = { nodeId: z1517[m1387], objects: [] });
            }
        }
        const addObject = n1518 => { if (r2746 != undefined && r2746 != null && !r2746.removed)
            r2746.appendChild(n1518);
        else
            r2752.objects.push(n1518); };
        let objects = r2746 != undefined && r2746 != null && !r2746.removed ? r2746.children : r2752.objects;
        let n1518 = objects.find(o => o.removed || o.getPluginData('userId') == figma.currentUser.id && o.getPluginData('objectId') == z1517[i1388]);
        if (n1518 != undefined && n1518 != null && n1518.removed) {
            h941(objects, n1518);
            if (v2753.includes(n1518))
                u946(v2753, n1518);
            if (h2769.includes(n1518))
                u946(h2769, n1518);
        }
        if (n1518 == undefined || n1518 == null || n1518.removed) {
            const newObj = yield n1533(z1517, addObject, addProps, transform);
            s3631.push(newObj);
        }
        else if (n1518 != undefined && n1518 != null && !n1518.removed && n1518.getPluginData('type') == z1517[o1386].toString()) {
            yield p1534(n1518, z1517, addProps, transform);
            if (n1518 != undefined && n1518 != null && !n1518.removed)
                s3631.push(n1518);
        }
        else {
            n1518.remove();
            if (v2753.includes(n1518))
                u946(v2753, n1518);
            if (h2769.includes(n1518))
                u946(h2769, n1518);
            yield n1533(z1517, addObject, addProps, transform);
        }
        a2734++;
        if (a2734 >= a2748) {
            const result = yield r2727('returnObjectUpdate', { b2732: b2732, c2733: c2733 });
            abort = result.value;
            a2734 = 0;
            if (abort)
                break;
        }
    } if (r2746 != undefined && r2746 != null && !r2746.removed) {
        for (const n1518 of r2746.children) {
            if (n1518 != undefined && n1518 != null && n1518.removed || !q2747.find(o => o[i1388] == n1518.getPluginData('objectId') && n1518.getPluginData('userId') == figma.currentUser.id))
                n1518.remove();
        }
    } for (const point of v2753) {
        if (point.parent == figma.currentPage)
            yield figma.currentPage.loadAsync();
        if (point != undefined && point != null && !point.removed && !point.parent.removed)
            point.parent.appendChild(point);
    } if (w2750 && !abort) {
        a1514(j2730, z2731);
        j2730 = [];
        z2731 = [];
        if (o270 && s3631.length > 0) {
            figma.viewport.scrollAndZoomIntoView(s3631);
            const bounds = h1538(s3631);
            figma.viewport.zoom = Math.min(figma.viewport.bounds.width * figma.viewport.zoom / bounds.width - 0.05, figma.viewport.bounds.height * figma.viewport.zoom / bounds.height - 0.05);
        }
    } yield r2727('returnObjectUpdate', { b2732: b2732, c2733: c2733 }); });
}
function a1535(z1517) { switch (z1517[o1386]) {
    case a1222: return j2700(z1517);
    case t1225: return h2762(z1517);
    case d1228: return w2763(z1517);
    case k1240: return s4014(z1517);
    case p1243: return h2703(z1517);
    case a1246: return f2706(z1517);
    case u1249: return j4013(z1517);
    case x1253: return o2764(z1517);
    case o1265: return k2765(z1517);
    case m1289: return v2766(z1517);
    case p1268: return z2767(z1517);
    case z1271: return m2768(z1517);
} }
function v1536(z1517) {
    return __awaiter(this, void 0, void 0, function* () { (() => __awaiter(this, void 0, void 0, function* () { const n1518 = yield n1533(z1517); const width = n1518.width; const height = n1518.height; n1518.remove(); c1531({ cmd: 'uiForwardToGenerator', msg: { cmd: 'returnFigGetObjectSize', objectId: z1517[i1388], width: width, height: height } }); }))(); });
}
function e1537(n1518) { n1518.setPluginData('type', ''); n1518.setPluginData('nodeId', ''); n1518.setPluginData('userId', ''); n1518.setPluginData('sessionId', ''); n1518.setPluginData('objectId', ''); n1518.setPluginData('isCenter', ''); n1518.setPluginData('retain', ''); }
function h1538(objects) { const bounds = { left: 0, top: 0, right: 0, bottom: 0 }; for (const a111 of objects) {
    if (a111.x < bounds.left || bounds.left == bounds.right)
        bounds.left = a111.x;
    if (a111.y < bounds.top || bounds.top == bounds.bottom)
        bounds.top = a111.y;
    if (a111.x + a111.width > bounds.right || bounds.left == bounds.right)
        bounds.right = a111.x + a111.width;
    if (a111.y + a111.height > bounds.bottom || bounds.top == bounds.bottom)
        bounds.bottom = a111.y + a111.height;
} return { x: bounds.left, y: bounds.top, width: bounds.right - bounds.left, height: bounds.bottom - bounds.top }; }
function figExport(objectIds, scale, format, suffix) {
    return __awaiter(this, void 0, void 0, function* () { yield figma.currentPage.loadAsync(); for (const objId of objectIds) {
        let n1518 = figma.currentPage.children.find(o => !o.removed && o.getPluginData('userId') == figma.currentUser.id && o.getPluginData('objectId') == objId);
        if (!n1518)
            continue;
        const settings = { constraint: { type: 'SCALE', value: scale }, format: format == 0 ? 'PNG' : 'JPG', suffix: suffix };
        yield n1518.exportAsync(settings);
    } });
}
const h2769 = [];
const p2770 = [];
function z1539(o1540, t1541) { const effects = []; for (const effect of o1540) {
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
                if (t1541 && !isNaN(spread))
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
function y2690(n1518, z1517, phantom = true) { j1544(n1518, z1517); s2691(n1518, z1517, phantom); d2692(n1518, z1517); n1518.opacity = z1517[f1410]; n1518.blendMode = z1517[e1411]; const maskType = z1517[j1412]; n1518.isMask = maskType > 0; if (n1518.isMask) {
    switch (maskType) {
        case 1:
            n1518.maskType = 'ALPHA';
            break;
        case 2:
            n1518.maskType = 'VECTOR';
            break;
        case 3:
            n1518.maskType = 'LUMINANCE';
            break;
    }
} if (n1518.isMask && n1518.fills.length == 0 && n1518.strokes.length == 0)
    n1518.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 }, opacity: 1, blendMode: 'NORMAL' }]; }
function d2692(n1518, z1517) { if (!!z1517[g1399] && !isEmpty(z1517[g1399])) {
    n1518.fills = p959(z1517[g1399]);
    if (h2769.includes(n1518))
        u946(h2769, n1518);
}
else
    n1518.fills = []; }
function s2691(n1518, z1517, phantom = true) { if (z1517[j1400] != null && !isEmpty(z1517[j1400])) {
    y1543(n1518, p959(z1517[j1400]), z1517[s1401], z1517[n1402], z1517[o1403], z1517[z1404], z1517[b1405], u2693(z1517[l1406]));
    if (z1517[f1408])
        n1518.setPluginData('dashes', z1517[l1406]);
    if (h2769.includes(n1518))
        u946(h2769, n1518);
    if (z1517[f1408])
        z952(p2770, n1518);
}
else if (isEmpty(z1517[g1399]) && isEmpty(z1517[j1400]) && !z1517[j1412] && phantom) {
    s1546(n1518);
    z952(h2769, n1518);
}
else
    n1518.strokes = []; }
function u2693(f1542) { f1542 = f1542; f1542 = f957(f1542, ','); f1542 = b958(f1542, ','); f1542 = f1542.trim(); return f1542 == '' ? [] : f1542.split(',').map(s => Math.max(0, parseFloat(s))); }
function b2694(f1542) { f1542 = f1542; f1542 = f957(f1542, ','); f1542 = b958(f1542, ','); f1542 = f1542.trim(); return f1542 == '' ? [] : f1542.split(',').map(s => Math.max(0, parseFloat(s) / r2696)); }
function y1543(n1518, fills, weight, align, join, miterLimit, cap, dashes = []) { n1518.strokes = fills; n1518.strokeWeight = Math.max(0, weight); n1518.strokeAlign = align; n1518.strokeJoin = join; const miterAngle = miterLimit / 360 * Tau; const s2771 = 1 / Math.sin(miterAngle / 2); n1518.strokeMiterLimit = Math.min(Math.max(0, s2771), 16); n1518.strokeCap = cap; n1518.dashPattern = dashes; }
function j1544(n1518, z1517) { if (!!z1517[f1407] && !isEmpty(z1517[f1407])) {
    const t1541 = z1517[o1386] == a1222 || z1517[o1386] == d1228 || z1517[o1386] == z1271;
    n1518.effects = z1539(z1517[f1407], t1541);
}
else
    n1518.effects = []; }
function t1545() { for (const a111 of h2769) {
    if (a111.removed)
        u946(h2769, a111);
    else
        s1546(a111);
} }
function s1546(a111) { figma.currentPage.loadAsync().then(() => { const back = figma.currentPage.backgrounds.find(b => b.type == 'SOLID'); let phantomColor; if (back) {
    const l = back.color.r * 0.2126 + back.color.g * 0.7152 + back.color.b * 0.0722;
    phantomColor = l > 0.5 ? { r: 0, g: 0, b: 0 } : { r: 1, g: 1, b: 1 };
}
else
    phantomColor = { r: 1, g: 0, b: 1 }; y1543(a111, [{ type: 'SOLID', color: phantomColor, opacity: 0.5 }], 1 / r2696, 'CENTER', 'MITER', 1, 'NONE', [1 / r2696, 2 / r2696]); }); }
function u1547() { for (const n1518 of p2770) {
    if (n1518.removed)
        u946(p2770, n1518);
    else
        j1548(n1518);
} }
function j1548(n1518) { n1518.strokeWeight = Math.max(0, 1.5 / r2696); if (y926(n1518.getPluginData('isCenter'))) {
    const path = n1518.vectorPaths[0];
    const parts = path.data.split(' ');
    let t = { x: parseFloat(parts[1]), y: parseFloat(parts[2]) };
    let c = { x: parseFloat(parts[4]), y: parseFloat(parts[5]) };
    let r = { x: parseFloat(parts[7]), y: parseFloat(parts[8]) };
    const a = 2;
    const b = 0.05;
    const f = 1 - Math.pow(1 - Math.min(r2696, 1), a) / Math.pow(a, b);
    t = a898(c, u900(k885(z903(t, c)), objectCenterSize / f));
    r = a898(c, u900(k885(z903(r, c)), objectCenterSize / f));
    parts[1] = t.x;
    parts[2] = t.y;
    parts[4] = c.x;
    parts[5] = c.y;
    parts[7] = r.x;
    parts[8] = r.y;
    const l2772 = { windingRule: path.windingRule, data: parts.join(' ') };
    n1518.vectorPaths = [l2772];
} const dashes = n1518.getPluginData('dashes'); if (dashes != '')
    n1518.dashPattern = b2694(dashes); }
function r1582(nodeId, px, py) { figma.getLocalPaintStylesAsync().then(_styles => { const styles = new Array(); for (const w168 of _styles) {
    const _nodeId = w168.getPluginData('nodeId');
    const _existing = w168.getPluginData('existing');
    const existing = !!_existing;
    const style = { id: w168.id, nodeId: _nodeId, name: w168.name, existing: existing, paints: new Array() };
    let onlyPaint = true;
    for (const j2774 of w168.paints) {
        if (j2774.type == 'SOLID') {
            style.paints.push([j2774.color.r, j2774.color.g, j2774.color.b, j2774.opacity]);
        }
        else {
            onlyPaint = false;
            break;
        }
    }
    if (onlyPaint)
        styles.push(style);
} c1531({ cmd: 'uiReturnFigGetAllLocalColorStyles', nodeId: nodeId, px: px, py: py, styles: JSON.stringify(styles) }); }); }
function z1583(nodeId, styleId) { figma.getLocalPaintStylesAsync().then(h1585 => { if (styleId != NULL)
    j1584(h1585, nodeId, styleId);
else
    h1586(h1585, nodeId); }); }
function j1584(h1585, nodeId, styleId, clearExisting = true) { const b2773 = q2719.find(a => a.nodeId == nodeId); if (b2773 && clearExisting)
    h1586(h1585, nodeId); const g1590 = h1585.find(s => s.id == styleId); a955(!!g1590, 'figStyle should be found here'); g1590.setPluginData('type', k1219); g1590.setPluginData('nodeId', nodeId); g1590.setPluginData('existing', i940(true)); q2719.push({ nodeId: nodeId, existing: true, styles: [g1590] }); return g1590; }
function h1586(h1585, nodeId) { const g1590 = h1585.find(s => s.getPluginData('nodeId') == nodeId); a955(!!g1590, 'figStyle should be found here'); if (g1590) {
    g1590.setPluginData('type', NULL);
    g1590.setPluginData('nodeId', NULL);
    g1590.setPluginData('existing', NULL);
    o948(q2719, a => a.nodeId == nodeId);
} return g1590; }
function o1587(styles, x1591) { const g1590 = figma.createPaintStyle(); g1590.setPluginData('type', x1591[o1386]); g1590.setPluginData('nodeId', x1591[m1387]); g1590.name = x1591[v1391]; setStylePaints(g1590, x1591); styles.push(g1590); c1531({ cmd: 'uiSetStyleId', nodeId: x1591[m1387], styleId: g1590.id }); return g1590; }
function d1588(msg) { let t2751 = NULL; let b2773; for (const x1591 of msg.styles) {
    if (x1591[m1387] != t2751) {
        t2751 = x1591[m1387];
        b2773 = q2719.find(a => a.nodeId == x1591[m1387]);
        if (!b2773) {
            b2773 = { nodeId: x1591[m1387], styles: [] };
            q2719.push(b2773);
        }
    }
    else
        b2773 = null;
    const g1590 = b2773.styles[0];
    figma.getLocalPaintStylesAsync().then(h1585 => { const localStyle = h1585.find(s => s.getPluginData('nodeId') == x1591[m1387]); if (isValid(g1590) && !isValid(localStyle)) {
        h941(b2773.styles, g1590);
    } const existing = isValid(g1590) && isValid(localStyle) && g1590.getPluginData('existing'); if (!isValid(g1590) || !isValid(localStyle)) {
        if (!existing) {
            i1521 = true;
            z1583(x1591[m1387], x1591[r1389]);
        }
    }
    else if (isValid(g1590) && g1590.getPluginData('type') == x1591[o1386]) {
        i1521 = true;
        a1589(localStyle, x1591);
    } });
} }
function a1589(g1590, x1591) { setStylePaints(g1590, x1591); g1590.name = x1591[v1391]; }
function getStylePaints(stylePaints) { const paints = new Array(); for (const j2774 of stylePaints) {
    const fill = j2774[1].split(' ');
    switch (j2774[0]) {
        case 'SOLID':
            paints.push({ type: 'SOLID', color: { r: Math.min(Math.max(0, parseFloat(fill[0]) / 0xff), 1), g: Math.min(Math.max(0, parseFloat(fill[1]) / 0xff), 1), b: Math.min(Math.max(0, parseFloat(fill[2]) / 0xff), 1) }, opacity: Math.min(Math.max(0, parseFloat(fill[3]) / 100), 1) });
            break;
    }
} return paints; }
function setStylePaints(g1590, x1591) { if (!isEmpty(x1591[v1393]))
    g1590.paints = getStylePaints(x1591[v1393]);
else
    g1590.paints = []; }
function c1605(nodeId, px, py) { figma.variables.getLocalVariablesAsync().then((i2775) => __awaiter(this, void 0, void 0, function* () { const variables = new Array(); for (const _var of i2775) {
    const collection = yield figma.variables.getVariableCollectionByIdAsync(_var.variableCollectionId);
    const variable = { id: _var.id, resolvedType: _var.resolvedType, name: _var.name, collectionName: collection.name };
    variables.push(variable);
} figma.variables.getLocalVariableCollectionsAsync().then((collections) => __awaiter(this, void 0, void 0, function* () { c1531({ cmd: 'uiReturnFigGetAllLocalVariables', nodeId: nodeId, px: px, py: py, variables: JSON.stringify(variables), nCollections: collections.length }); })); })); }
function s1606(varIds) {
    return __awaiter(this, void 0, void 0, function* () { const i2775 = yield figma.variables.getLocalVariablesAsync(); const variables = varIds.map(id => i2775.find(v => v.id == id)); let values = []; for (let i = 0; i < varIds.length; i++) {
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
function g1607(nodeId, varId) { figma.variables.getLocalVariablesAsync().then(i2775 => { figLinkVariableAsync(i2775, nodeId, varId); }); }
function figUpdateVariableAsync(varId, value) {
    return __awaiter(this, void 0, void 0, function* () { figma.variables.getLocalVariablesAsync().then((i2775) => __awaiter(this, void 0, void 0, function* () { let variable = i2775.find(v => v.id == varId); if (!variable)
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
function figLinkVariableAsync(i2775, nodeId, varId) {
    return __awaiter(this, void 0, void 0, function* () { let variable = i2775.find(v => v.id == varId); if (!variable)
        return null; const [resolvedVar, values] = yield figGetResolvedVariableValuesAsync(variable); c1531({ cmd: 'uiReturnFigLinkNodeToVariable', nodeId: nodeId, variableId: resolvedVar ? resolvedVar.id : NULL, variableName: resolvedVar ? resolvedVar.name : '', resolvedType: resolvedVar ? resolvedVar.resolvedType : NULL, values: values }); return resolvedVar; });
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
function g1592(tl, tr, bl) { let vr = point(tr.x - tl.x, tr.y - tl.y); let vb = point(bl.x - tl.x, bl.y - tl.y); let sx = vr.x; let sy = vb.y; let kx = -vr.y; let ky = -vb.x; let dx = -tl.x; let dy = -tl.y; const _sx = kx / nozero(sx); const _sy = ky / nozero(sy); let k4195 = k888([[1, _sy, 0], [_sx, 1, 0], [0, 0, 1]], n892(dx, dy)); k4195 = q890(k4195); const a = o882(vr); if (a > Tau / 4 && a < Tau * 3 / 4)
    k4195 = k888(k4195, n892(0, 0, 1, 1, Tau / 2)); if (determinant(k4195) < 0)
    k4195 = k888(k4195, n892(0, 0, -1, 1, 0)); return k4195; }
function d1593(n1518, tl, tr, bl) { const k4195 = g1592(tl, tr, bl); n1518.relativeTransform = [k4195[0], k4195[1]]; }
function r1594(n1518, z1517, setSize = true, noHeight = 0.01) { if (!z1517[n1395] || !z1517[r1396] || !z1517[e1397])
    return; const xp0 = z1517[n1395]; const xp1 = z1517[r1396]; const xp2 = z1517[e1397]; d1593(n1518, xp0, xp1, xp2); if (setSize) {
    const b893 = distv(xp0, xp1);
    const j894 = distv(xp0, xp2);
    const height = z1517[o1386] == a1246 ? z1517[i1430] : z1517[o1417];
    if (!n1518.removed) {
        n1518.resizeWithoutConstraints(Math.max(0.01, b893), height ? Math.max(0.01, j894) : noHeight);
    }
} }
function y1595(i2688, u2689) { if (i2688.removed)
    return; i2688.resizeWithoutConstraints(0.01, 0.01); i2688.setPluginData('actualX', u2689[i1413].toString()); i2688.setPluginData('actualY', u2689[y1415].toString()); i2688.x = u2689[i1413]; i2688.y = u2689[y1415]; i2688.rotation = u2689[o1409] ? 45 : 0; }
function t1596(i2688) { if (!i2688.removed)
    i2688.resizeWithoutConstraints(0.01, 0.01); }
function v2766(genBool) { return true; }
function e2737(genBool, addProps, transform) {
    return __awaiter(this, void 0, void 0, function* () { let objects = []; for (const a111 of genBool[FO_BOOLEAN_CHILDREN])
        yield n1533(a111, o => objects = [...objects, o], false); yield figma.currentPage.loadAsync(); let figBool = null; if (!isEmpty(objects)) {
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
        j2743(figBool, genBool, addProps, transform);
    } return figBool; });
}
function j2743(figBool, genBool, addProps, transform) {
    return __awaiter(this, void 0, void 0, function* () { if (genBool[FO_BOOLEAN_CHILDREN].length == 0) {
        figBool.remove();
        return;
    } yield k2720(figBool, genBool[FO_BOOLEAN_CHILDREN], genBool[FO_BOOLEAN_CHILDREN].length, -1, [], false, false, false, false, true); const hasProps = genBool[g1399].length > 0 || genBool[j1400].length > 0 || genBool[f1407].length > 0; y2690(figBool, genBool, !hasProps && addProps); });
}
function w2763(f2754) { return f2754[i1413] != null && !isNaN(f2754[i1413]) && f2754[y1415] != null && !isNaN(f2754[y1415]) && f2754[s1416] != null && !isNaN(f2754[s1416]) && f2754[o1417] != null && !isNaN(f2754[o1417]) && f2754[c1419] != null && !isNaN(f2754[c1419]) && f2754[h1426] != null && !isNaN(f2754[h1426]) && f2754[a1432] != null && !isNaN(f2754[a1432]) && f2754[h1436] != null && !isNaN(f2754[h1436]); }
function w2776(f2754, addProps, transform) { if (!w2763(f2754))
    return null; const i2755 = figma.createEllipse(); b2777(i2755, f2754, addProps, transform, true); return i2755; }
function b2777(i2755, f2754, addProps, transform, isValid = false) { if (!isValid && !w2763(f2754))
    return; e2778(i2755, f2754, transform); if (v2753.includes(i2755))
    n2685(i2755);
else
    y2690(i2755, f2754, addProps); }
function e2778(i2755, f2754, transform) { i2755.cornerRadius = f2754[c1419]; const start = f2754[h1426] / 360 * (Math.PI * 2); const sweep = f2754[a1432] / 100 * (Math.PI * 2); i2755.arcData = { startingAngle: start, endingAngle: start + sweep, innerRadius: Math.min(Math.max(0, f2754[h1436] / 100), 1) }; if (transform)
    r1594(i2755, f2754); }
function m2768(s2756) { return s2756[i1413] != null && !isNaN(s2756[i1413]) && s2756[y1415] != null && !isNaN(s2756[y1415]) && s2756[s1416] != null && !isNaN(s2756[s1416]) && s2756[o1417] != null && !isNaN(s2756[o1417]) && s2756[f1425] != null && !isNaN(s2756[f1425]) && s2756[FO_FRAME_CLIP] != null && !isNaN(s2756[FO_FRAME_CLIP]); }
function x2739(s2756, addProps, transform) {
    return __awaiter(this, void 0, void 0, function* () { if (!m2768(s2756))
        return null; const f2757 = figma.createFrame(); if (f2757) {
        f2757.expanded = false;
        r2779(f2757, s2756, addProps, transform);
        let objects = [];
        for (const a111 of s2756[b1431])
            yield n1533(a111, o => objects = [...objects, o]);
        for (const a111 of objects)
            f2757.appendChild(a111);
    } return f2757; });
}
function b2745(f2757, s2756, addProps, transform) { r2779(f2757, s2756, addProps, transform); k2720(f2757, s2756[b1431], s2756[b1431].length); }
function r2779(f2757, s2756, addProps, transform) { f2757.cornerRadius = s2756[f1425]; f2757.clipsContent = s2756[FO_FRAME_CLIP] > 0; if (transform)
    r1594(f2757, s2756); y2690(f2757, s2756, addProps && s2756[b1431].length == 0); figUpdateStrokeSides(f2757, s2756); }
function z2767(o2758) { return true; }
function n2738(o2758) {
    return __awaiter(this, void 0, void 0, function* () { let objects = []; for (const a111 of o2758[h1414])
        yield n1533(a111, o => objects = [...objects, o]); yield figma.currentPage.loadAsync(); const b2759 = !isEmpty(objects) ? figma.group(objects, figma.currentPage) : null; if (b2759) {
        b2759.expanded = false;
        k2744(b2759, o2758);
    } return b2759; });
}
function k2744(b2759, o2758) { if (o2758[h1414].length == 0) {
    b2759.remove();
    return;
} k2720(b2759, o2758[h1414], o2758[h1414].length); j1544(b2759, o2758); }
function h2762(e2760) { return e2760[i1413] != null && !isNaN(e2760[i1413]) && e2760[y1415] != null && !isNaN(e2760[y1415]) && e2760[s1416] != null && !isNaN(e2760[s1416]); }
function n2780(e2760, addProps, transform) { if (!h2762(e2760))
    return null; const o2761 = figma.createLine(); k2781(o2761, e2760, addProps, transform, true); return o2761; }
function k2781(o2761, e2760, addProps, transform, isValid = false) { if (!isValid && !h2762(e2760))
    return; if (transform)
    r1594(o2761, e2760, true, 0); y2690(o2761, e2760, addProps); }
var v2753 = [];
function j4013(u2689) { return u2689[i1413] != null && !isNaN(u2689[i1413]) && u2689[y1415] != null && !isNaN(u2689[y1415]); }
function t2683(u2689) { const i2688 = u2689[o1409] ? figma.createRectangle() : figma.createEllipse(); if (!j4013(u2689))
    return i2688; if (v2753.includes(i2688))
    i2687(i2688, u2689);
else
    h2740(i2688, u2689); return i2688; }
function h2740(i2688, u2689) { y1595(i2688, u2689); x2686(i2688); }
function c2684() { c1531({ cmd: 'uiUpdateZoom', zoom: figma.viewport.zoom }); for (const point of v2753)
    n2685(point); }
function n2685(i2688) { t1596(i2688); x2686(i2688); }
function i2687(i2688, u2689) { y1595(i2688, u2689); x2686(i2688); }
function x2686(i2688) { if (i2688.removed)
    return; figma.currentPage.loadAsync().then(() => { const isCenter = y926(i2688.getPluginData('isCenter')); const t2695 = figma.currentPage.selection.includes(i2688); const color = isCenter ? [0xf2, 0x48, 0x22] : t2695 ? [12, 140, 233] : [255, 255, 255]; const border = isCenter ? [255, 255, 255] : t2695 ? [255, 255, 255] : [12, 140, 233]; i2688.fills = p959([['SOLID', color[0], color[1], color[2], 100]]); const effects = []; effects.push(...z1539([['DROP_SHADOW', border[0] / 255, border[1] / 255, border[2] / 255, 1, 0, 0, 0, (isCenter ? 3 : t2695 ? 5 : 3.6) / r2696, 'NORMAL', true, true]], true)); effects.push(...z1539([['DROP_SHADOW', color[0] / 255, color[1] / 255, color[2] / 255, 1, 0, 0, 0, (t2695 ? 4 : 2.4) / r2696, 'NORMAL', true, true]], true)); i2688.effects = effects; }); }
function s4014(genPoly) { return genPoly[i1413] != null && !isNaN(genPoly[i1413]) && genPoly[y1415] != null && !isNaN(genPoly[y1415]) && genPoly[s1416] != null && !isNaN(genPoly[s1416]) && genPoly[o1417] != null && !isNaN(genPoly[o1417]) && genPoly[k1422] != null && !isNaN(genPoly[k1422]) && genPoly[h1428] != null && !isNaN(genPoly[h1428]); }
function q2697(genPoly, addProps, transform) { if (!s4014(genPoly))
    return null; const figPoly = figma.createPolygon(); l2698(figPoly, genPoly, addProps, transform, true); return figPoly; }
function l2698(figPoly, genPoly, addProps, transform, isValid = false) { if (!isValid && !s4014(genPoly))
    return; figPoly.cornerRadius = genPoly[k1422]; figPoly.pointCount = Math.max(3, genPoly[h1428]); if (transform)
    r1594(figPoly, genPoly); y2690(figPoly, genPoly, addProps); }
function j2700(p2699) { return p2699[i1413] != null && !isNaN(p2699[i1413]) && p2699[y1415] != null && !isNaN(p2699[y1415]) && p2699[s1416] != null && !isNaN(p2699[s1416]) && p2699[o1417] != null && !isNaN(p2699[o1417]) && p2699[h1418] != null && !isNaN(p2699[h1418]); }
function d2701(p2699, addProps, transform) { if (!j2700(p2699))
    return null; const figRect = figma.createRectangle(); u2702(figRect, p2699, addProps, transform, true); return figRect; }
function u2702(figRect, p2699, addProps, transform, isValid = false) { if (!isValid && !j2700(p2699))
    return; const foundCorners = p2699[f1407].findIndex(e => e[0] == 'ROUND_CORNERS'); if (foundCorners > -1) {
    const corners = p2699[f1407][foundCorners];
    figRect.topLeftRadius = corners[1];
    figRect.topRightRadius = corners[2];
    figRect.bottomLeftRadius = corners[3];
    figRect.bottomRightRadius = corners[4];
}
else
    figRect.cornerRadius = p2699[h1418]; if (transform)
    r1594(figRect, p2699); y2690(figRect, p2699, addProps); figUpdateStrokeSides(figRect, p2699); }
function figUpdateStrokeSides(n1518, z1517) { const foundSides = z1517[f1407].findIndex(e => e[0] == 'STROKE_SIDES'); if (foundSides < 0)
    return; const sides = z1517[f1407][foundSides]; n1518.strokeWeight = 0; n1518.strokeTopWeight = sides[1]; n1518.strokeLeftWeight = sides[2]; n1518.strokeRightWeight = sides[3]; n1518.strokeBottomWeight = sides[4]; }
function h2703(n2713) { return n2713[i1413] != null && !isNaN(n2713[i1413]) && n2713[y1415] != null && !isNaN(n2713[y1415]) && n2713[s1416] != null && !isNaN(n2713[s1416]) && n2713[o1417] != null && !isNaN(n2713[o1417]) && n2713[i1423] != null && !isNaN(n2713[i1423]) && n2713[g1429] != null && !isNaN(n2713[g1429]) && n2713[j1434] != null && !isNaN(n2713[j1434]); }
function g2704(n2713, addProps, transform) { if (!h2703(n2713))
    return null; const t2714 = figma.createStar(); e2705(t2714, n2713, addProps, transform, true); return t2714; }
function e2705(t2714, n2713, addProps, transform, isValid = false) { if (!isValid && !h2703(n2713))
    return; t2714.cornerRadius = n2713[i1423]; t2714.pointCount = n2713[g1429]; t2714.innerRadius = Math.min(Math.max(0, n2713[j1434] / 100), 1); if (transform)
    r1594(t2714, n2713); y2690(t2714, n2713, addProps); }
const t4257 = [];
function f2706(k2710) { return k2710[t1435] != null && k2710[i1413] != null && !isNaN(k2710[i1413]) && k2710[y1415] != null && !isNaN(k2710[y1415]) && k2710[s1416] != null && !isNaN(k2710[s1416]) && k2710[o1417] != null && !isNaN(k2710[o1417]) && k2710[h1437] != null && k2710[h1437] != NULL && k2710[d1438] != null && !isNaN(k2710[d1438]); }
function v2707(k2710, addProps, transform) { if (!f2706(k2710))
    return null; const q2782 = figma.createText(); e2708(q2782, k2710, addProps, transform, true); return q2782; }
function e2708(q2782, k2710, addProps, transform, isValid = false) { if (!isValid && !f2706(k2710))
    return null; const fontName = { family: k2710[h1437], style: k2710[v1439] }; try {
    if (!t4257.includes(fontName)) {
        figma.loadFontAsync(fontName).then(() => { t4257.push(fontName); y2709(q2782, k2710, fontName, addProps, transform); });
    }
    else {
        y2709(q2782, k2710, fontName, addProps, transform);
    }
}
catch (e) {
    a956(e);
} }
function y2709(q2782, k2710, fontName, addProps, transform) { q2782.fontName = fontName; q2782.fontSize = Math.max(1, k2710[d1438]); q2782.characters = k2710[t1435]; q2782.lineHeight = { unit: 'PERCENT', value: k2710[g1442] }; q2782.letterSpacing = { unit: 'PERCENT', value: k2710[t1443] }; if (k2710[n1440] == 0)
    q2782.textAlignHorizontal = 'LEFT';
else if (k2710[n1440] == 1)
    q2782.textAlignHorizontal = 'CENTER';
else if (k2710[n1440] == 2)
    q2782.textAlignHorizontal = 'RIGHT';
else if (k2710[n1440] == 3)
    q2782.textAlignHorizontal = 'JUSTIFIED'; if (k2710[i1441] == 0)
    q2782.textAlignVertical = 'TOP';
else if (k2710[i1441] == 1)
    q2782.textAlignVertical = 'CENTER';
else if (k2710[i1441] == 2)
    q2782.textAlignVertical = 'BOTTOM'; if (transform)
    r1594(q2782, k2710); y2690(q2782, k2710, addProps); if (k2710[o1424] == 0 && k2710[i1430] == 0)
    q2782.textAutoResize = 'WIDTH_AND_HEIGHT';
else if (k2710[o1424] == 0)
    q2782.textAutoResize = 'HEIGHT';
else
    q2782.textAutoResize = 'NONE'; }
function k2765(w2715) { return true; }
function g2736(w2715, addProps, transform) { if (!k2765(w2715))
    return null; const x2716 = figma.createVector(); e2742(x2716, w2715, addProps, transform, true); return x2716; }
function e2742(x2716, w2715, addProps, transform, isValid = false) { if (!isValid && !k2765(w2715))
    return; x2716.setVectorNetworkAsync(w2715[k1420]); if (transform)
    r1594(x2716, w2715, false); y2690(x2716, w2715, addProps); }
function o2764(w2711) { return w2711[u1427] != null && !isNaN(w2711[u1427]) && w2711[q1433] != null && !isNaN(w2711[q1433]); }
function m2735(w2711, addProps, transform) { const b2712 = figma.createVector(); c2741(b2712, w2711, addProps, transform, true); return b2712; }
function c2741(b2712, w2711, addProps, transform, isValid = false) { if (!isValid && !o2764(w2711))
    return; b2712.vectorPaths = [{ windingRule: w2711[u1427] == 1 ? 'NONZERO' : 'EVENODD', data: w2711[r1421] }]; b2712.cornerRadius = Number(w2711[q1433]); if (transform)
    r1594(b2712, w2711, false); y2690(b2712, w2711, addProps); }
