var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function x1051(key, tag) { return key.substring(0, tag.length + 1) == tag + ' '; }
function m1052(key, tag) { return key.substring(tag.length + 1); }
function h1053(key) { return x1051(key, q876); }
function u1054(key) { return x1051(key, z874); }
function j1055(key) { return x1051(key, k875); }
function l1056(key) { return m1052(key, q876); }
function c1057(key) { return m1052(key, z874); }
function x1058(key) { return m1052(key, k875); }
const generatorVersion = 417;
const b868 = 2147483647;
const NULL = '';
const s869 = '  ';
const n870 = '    ';
const x871 = '\n';
const d872 = '◦ G •';
const z873 = d872 + ' ';
const z874 = 'G_NODE';
const k875 = 'G_CONN';
const q876 = 'G_PAGE';
const y877 = 'G_TEMP';
const minWindowWidth = 602;
const minWindowHeight = 39;
const identity = Object.freeze([[1, 0, 0], [0, 1, 0], [0, 0, 1]]);
const Epsilon = 0.0000001;
const Tau = Math.PI * 2;
var enableAsserts = false;
function a878(x, eps = 0.000000001) { return Math.abs(x) < eps ? 0 : x; }
function nozero(x, eps = 0.000000001) { return x != 0 ? x : (x < 0 ? -eps : eps); }
function l879(v, eps = 0.000000001) { return point(nozero(v.x, eps), nozero(v.y, eps)); }
function equal(a, b, eps = 0.000000001) { return Math.abs(b - a) < eps; }
function sqr(x) { return x * x; }
;
function cube(x) { return x * x * x; }
;
function h880(f) { return Math.floor(f) | 0; }
function q881(x) { x = h880(x); x--; x |= x >> 1; x |= x >> 2; x |= x >> 4; x |= x >> 8; x |= x >> 16; x |= x >> 32; return ++x; }
function gcd(a, b) { let temp; while (1) {
    temp = a % b;
    if (temp == 0)
        return b;
    a = b;
    b = temp;
} }
function distv(p1, p2) { const dx = p2.x - p1.x; const dy = p2.y - p1.y; return Math.sqrt(dx * dx + dy * dy); }
function x882(v) { let angle = Math.atan2(v.y, v.x); if (angle < 0)
    angle += Tau; return angle; }
function anglev2(v1, v2) { return anglev2_(v1.x, v1.y, v2.x, v2.y); }
function anglev2_(x1, y1, x2, y2) { const dx = x2 - x1; const dy = y2 - y1; let angle = Math.atan2(dy, dx); if (angle < 0)
    angle += Tau; return angle; }
function i884(v) { return Math.sqrt(v.x * v.x + v.y * v.y); }
function lengthv_(x, y) { return Math.sqrt(x * x + y * y); }
function p885(v) { return point(v.x == 0 ? 0 : v.x / i884(v), v.y == 0 ? 0 : v.y / i884(v)); }
function dotv(v1, v2) { return v1.x * v2.x + v1.y * v2.y; }
function p886(a1, a2) { let diff = a2 - a1; while (diff <= -Tau / 2)
    diff += Tau; while (diff > Tau / 2)
    diff -= Tau; return diff; }
function p887(v, m) { let v3 = [v.x, v.y, 1]; let r = e951(v3, m); return point(r[0], r[1]); }
function d888(...mm) { x955(mm.length > 0, 'mulm3m3() must take at least one argument'); let result = clone(mm[0]); for (let a = 1; a < mm.length; a++) {
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
function e889(m, s) { for (let i = 0; i < 3; i++)
    for (let j = 0; j < 3; j++)
        m[i][j] /= s; return m; }
function adjugate(m) { return cofactor(transpose(m)); }
function transpose(m) { return [[m[0][0], m[1][0], m[2][0]], [m[0][1], m[1][1], m[2][1]], [m[0][2], m[1][2], m[2][2]]]; }
function cofactor(m) { return [[m[1][1] * m[2][2] - m[2][1] * m[1][2], -(m[1][0] * m[2][2] - m[2][0] * m[1][2]), m[1][0] * m[2][1] - m[2][0] * m[1][1]], [-(m[0][1] * m[2][2] - m[2][1] * m[0][2]), m[0][0] * m[2][2] - m[2][0] * m[0][2], -(m[0][0] * m[2][1] - m[2][0] * m[0][1])], [m[0][1] * m[1][2] - m[1][1] * m[0][2], -(m[0][0] * m[1][2] - m[1][0] * m[0][2]), m[0][0] * m[1][1] - m[1][0] * m[0][1]]]; }
function determinant(m) { return m[0][0] * (m[1][1] * m[2][2] - m[1][2] * m[2][1]) - m[0][1] * (m[1][0] * m[2][2] - m[2][0] * m[1][2]) + m[0][2] * (m[1][0] * m[2][1] - m[2][0] * m[1][1]); }
function o890(m) { return e889(adjugate(m), determinant(m)); }
function l891(angle) { const cosA = a878(Math.cos(angle)); const sinA = a878(Math.sin(angle)); return [[cosA, sinA, 0], [-sinA, cosA, 0], [0, 0, 1]]; }
function v892(x = 0, y = 0, d893 = 1, y894 = 1, angle = 0, s895 = 0, s896 = 0) { const cosA = Math.cos(angle); const sinA = Math.sin(angle); return [[d893 * cosA - s896 * sinA, -s895 * cosA + y894 * sinA, x], [s896 * cosA + d893 * sinA, y894 * cosA + s895 * sinA, y], [0, 0, 1]]; }
function f897(v1, v2) { return v1.x * v2.y - v1.y * v2.x; }
function t898(v1, v2) { return point(v1.x + v2.x, v1.y + v2.y); }
function sqrv(v) { return q899(v, v); }
function q899(v1, v2) { return point(v1.x * v2.x, v1.y * v2.y); }
function r900(v, s) { return point(v.x * s, v.y * s); }
function i901(v1, v2) { return point(v1.x / v2.x, v1.y / v2.y); }
function i902(v, s) { return point(v.x / s, v.y / s); }
function o903(v1, v2) { return point(v1.x - v2.x, v1.y - v2.y); }
function c904(str) { return decodeURI(encodeURIComponent(str)); }
function o905(str) { return decodeURIComponent(encodeURI(str)); }
function s906(bytes) { let str = ''; for (let i = 0; i < bytes.length; i++)
    str += String.fromCharCode(bytes[i]); return str; }
function k907(str) { return Array.from(o905(str), c => c.charCodeAt(0)); }
function t908(array, size) { const newArray = new Uint8Array(size); h909(array, newArray); return newArray; }
function h909(src, dst) { j910(src, 0, src.length, dst, 0, dst.length); }
function j910(src, d911, b912, dst, s913, q914) { const size = Math.min(b912, q914); for (let i = 0; i < size; i++)
    dst[s913 + i] = src[d911 + i]; }
function i915(a916, o917) { if (a916.length != o917.length)
    return false; for (let i = 0; i < a916.length; i++) {
    if (a916[i] != o917[i])
        return false;
} return true; }
function p918(h919, q920) { return h919.findIndex(i => q920.includes(i)) > -1; }
function t921(list) { return list ? '<==' : '<--'; }
;
function b922(list) { return list ? '==>' : '-->'; }
;
function w923(nodeId) { return z874 + ' ' + nodeId; }
function e924(name) { return k875 + ' ' + name; }
function b925(name) { return q876 + ' ' + name; }
function c926(str) { return str.toLowerCase() == 'true' || str == '1'; }
function a927(b928, h929 = false) { return u934(b928.outputNodeId, b928.outputId, b928.outputOrder, b928.inputNodeId, b928.inputId, b928.list, h929); }
function s930(outputNodeId, outputId, outputOrder, inputNodeId, inputId) { return e924(outputNodeId + ' ' + outputId + ' ' + outputOrder + ' ' + inputNodeId + ' ' + inputId); }
function k931(u243) { return s930(u243.outputNodeId, u243.outputId, u243.outputOrder, u243.inputNodeId, u243.inputId); }
function f932(u243) { return s930(u243.output.node.id, u243.output.id, u243.outputOrder, u243.input.node.id, u243.input.id); }
function j933(u243, h929 = false) { return u934(u243.output.node.id, u243.output.id, u243.outputOrder, u243.input.node.id, u243.input.id, u243.list, h929); }
function u934(outputNodeId, outputId, outputOrder, inputNodeId, inputId, list, h929 = false) { const sp = h929 ? ' ' : '  '; const jsp = h929 ? '' : ' '; const arrow = sp + g938(typeof outputOrder == 'string' ? parseInt(outputOrder) : outputOrder) + b922(typeof list == 'string' ? c926(list) : list) + sp; const join = jsp + '.' + jsp; return outputNodeId + join + outputId + arrow + inputNodeId + join + inputId; }
function z935(pageId) { return b925(pageId); }
function i936(num) { const str = num.toString(); let sup = ''; for (const c of str)
    sup += i937(c); return sup; }
function i937(c) { switch (c) {
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
function g938(num) { const str = num.toString(); let sup = ''; for (const c of str)
    sup += t939(c); return sup; }
function t939(c) { switch (c) {
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
function w940(bool) { return bool ? 'true' : 'false'; }
function isValid(val) { return val != undefined && val != null; }
function isEmpty(array) { return array.length == 0; }
function f941(array, item) { v942(array, array.indexOf(item)); }
function v942(array, index) { if (index > -1 && index < array.length)
    array.splice(index, 1); }
function w943(array) { if (isEmpty(array))
    return null; let last = array.at(-1); array.splice(array.length - 1, 1); return last; }
function v944(array) { return array[array.length - 1]; }
function k945(array, from, to) { const item = array[from]; array.splice(from, 1); array.splice(to, 0, item); }
function k946(array, item) { const index = array.indexOf(item); if (index > -1)
    array.splice(index, 1); }
function d947(e2783, array) { for (const item of array) {
    const index = e2783.indexOf(item);
    if (index > -1)
        e2783.splice(index, 1);
} }
function m948(array, where) { const index = array.findIndex(where); if (index > -1)
    array.splice(index, 1); }
function q949(styleId) { return styleId.split(',')[0] + ','; }
function r950(points) { let t4018 = ''; if (points.length < 2)
    return t4018; t4018 += 'M'; t4018 += ' ' + a878(points[0].x); t4018 += ' ' + a878(points[0].y); for (let i = 1; i < points.length; i++) {
    t4018 += ' L' + ' ' + a878(points[i].x) + ' ' + a878(points[i].y);
} return t4018; }
function point(x, y) { return { x: x, y: y }; }
function e951(v, m) { let r = [0, 0, 0]; for (let i = 0; i < 3; i++)
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
        let z111 = {};
        for (const key in val)
            z111[key] = clone(val[key]);
        return z111;
    }
} throw 'unknown'; }
function p952(array, item, equal = null) { if (equal) {
    if (Array.isArray(item))
        item.forEach(i => p952(array, i, equal));
    else if (!array.find(i => equal(i, item)))
        array.push(item);
}
else {
    if (Array.isArray(item))
        item.forEach(i => p952(array, i));
    else if (!array.includes(item))
        array.push(item);
} }
function l953(array, item, equal) { if (Array.isArray(item))
    item.forEach(i => l953(array, i, equal));
else if (!array.find(equal))
    array.push(item); }
function z954(array, item, except) { if (Array.isArray(item))
    item.forEach(i => z954(array, i, except));
else if (!array.find(except))
    array.push(item); }
function x955(...args) { if (enableAsserts) {
    console.assert(...args);
} }
function g956(...args) { if (enableAsserts)
    console.error(...args); }
function m957(str, trim) { while (str.length >= trim.length && str.substring(0, trim.length) == trim)
    str = str.substring(trim.length); return str; }
function k958(str, trim) { while (str.length >= trim.length && str.substring(str.length - trim.length) == trim)
    str = str.substring(0, str.length - trim.length); return str; }
function a959(q4078) { const fills = []; for (const fill of q4078) {
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
            const v4193 = [[0, 1, 0], [0.5, 0.5, 1], [1, 1, 1]];
            let p4194 = [[p0.x, p1.x, p2.x], [p0.y, p1.y, p2.y], [1, 1, 1]];
            p4194 = d888(v4193, o890(p4194));
            p4194 = [p4194[0], p4194[1]];
            const stops = [];
            for (const stop of fill[2]) {
                stops.push({ color: { r: Math.min(Math.max(0, stop[0]), 1), g: Math.min(Math.max(0, stop[1]), 1), b: Math.min(Math.max(0, stop[2]), 1), a: Math.min(Math.max(0, stop[3]), 1) }, position: stop[4] });
            }
            fills.push({ type: fill[0], gradientTransform: p4194, gradientStops: stops, blendMode: fill[3] });
            break;
        }
    }
} return fills; }
function m960(type) { return u1092.includes(type); }
const m1059 = 'LIST#';
const f1060 = 'NLIST#';
const v1061 = 'TLIST#';
const e1062 = 'SLIST#';
const u1063 = 'NULL';
const y1064 = 'VAR';
const l1065 = 'VARGRP';
const d1066 = 'FEEDBK';
const h1067 = 'REPT';
const l1068 = 'CACHE';
const k1069 = 'FRZ';
const t1070 = 'TIMER';
const n1071 = 'VNAME';
const GET_LIST_VALUE_NAMES = 'GVNAMES';
const LIST_VALUE_NAMES = 'VNAMES';
const OBJECT_NAME = 'ONAME';
const d1072 = 'CMB';
const h1073 = 'LSASIT';
const j1074 = 'EXTR';
const b1075 = 'SETP';
const l1076 = 'GETP';
const k1077 = 'SUBLST';
const g1078 = 'UNIQ';
const REORDER_LIST = 'RORD';
const SHIFT_LIST = 'SHFTLST';
const g1079 = 'REVLST';
const BUCKLE_LIST = 'BUKLST';
const t1080 = 'SORT';
const n1081 = 'CLMN';
const e1082 = 'CELL';
const v1083 = 'LIST';
const h1084 = 'COUNT';
const OBJECT_COUNT = 'OBJCOUNT';
const r1085 = 'LCONT';
const c1086 = 'SELECT';
const SELECT_FROM_LIST = 'LSTSEL';
const q1087 = 'IF';
const j1088 = 'LSTFLT';
const m1090 = 'ANY#';
const s1091 = [m1059, f1060, v1061, e1062, d1072, j1074, b1075, l1076, k1077, v1083, h1084, r1085, h1067];
const u1092 = [m1059, f1060, v1061, e1062];
const w1089 = 'ITER';
const b1111 = 'PROB';
const HOLD = 'HOLD';
const k1094 = 'NUM#';
const v1095 = 'NUM';
const NUMBER_PRECISION = 'NPREC';
const x1096 = 'NSIGN';
const x1097 = 'ABS';
const NUMBER_NEGATIVE = 'NEG';
const x1098 = 'ROUND';
const NUMBER_QUANTIZE = 'QUANT';
const k1099 = 'SMINMAX';
const o1100 = 'MINMAX';
const d1101 = 'LIM';
const u1102 = 'NCURVE';
const NUMBER_MAP = 'NMAP';
const NUMBER_BIAS = 'NBIAS';
const l1103 = 'NANISNUM';
const z1104 = 'CONST';
const l1105 = 'DATE';
const u1106 = 'SEQ';
const f1107 = 'RANGE';
const y1108 = 'WAVE';
const t1109 = 'RAND';
const x1110 = 'NOISE';
const v1112 = 'ACCUM';
const q1113 = 'LERP';
const s1114 = 'SOLVE';
const r1115 = 'NANIM';
const q1116 = 'SMATH';
const i1117 = 'MATH';
const n1118 = 'ADD';
const h1119 = 'SUB';
const i1120 = 'MUL';
const m1121 = 'DIV';
const x1122 = 'MOD';
const o1123 = 'EXP';
const x1124 = 'NBOOL';
const b1125 = 'NOT';
const t1126 = 'AND';
const u1127 = 'OR';
const w1128 = 'XOR';
const n1129 = 'COND';
const e1130 = 'EQ';
const o1131 = 'NE';
const n1132 = 'LT';
const v1133 = 'LE';
const s1134 = 'GT';
const p1135 = 'GE';
const s1136 = 'TRIG';
const s1137 = 'SIN';
const w1138 = 'COS';
const w1139 = 'TAN';
const w1140 = 'ATAN2';
const x1141 = 'CNVANG';
const i1093 = [u1063, y1064, l1065, ...s1091, h1073, j1074, b1075, l1076, k1077, g1078, REORDER_LIST, SHIFT_LIST, g1079, BUCKLE_LIST, n1081, t1080, e1082, v1083, c1086, SELECT_FROM_LIST, q1087, j1088, d1066, h1067, w1089, b1111, HOLD, l1068, k1069, t1070, n1071, GET_LIST_VALUE_NAMES, LIST_VALUE_NAMES, OBJECT_NAME];
const s1142 = [i1117, q1116, n1118, h1119, i1120, m1121, x1122, o1123];
const q1143 = [x1124, b1125, t1126, u1127, w1128];
const z1144 = [n1129, e1130, o1131, n1132, v1133, s1134, p1135];
const l1145 = [s1136, s1137, w1138, w1139, w1140];
const w1146 = 'TEXT#';
const e1147 = 'TEXT';
const q1148 = 'TLEN';
const s1149 = 'TTRIM';
const f1150 = 'TSUB';
const o1151 = 'TCONT';
const k1152 = 'TCASE';
const q1153 = 'TREPL';
const b1154 = 'TJOIN';
const b1155 = 'TPAD';
const f1156 = 'TCMP';
const g1157 = 'TCHAR';
const n1158 = 'TUNI';
const x1159 = 'INDEX';
const r1160 = 'N2T';
const a1161 = 'C2T';
const i1162 = 'T2N';
const k1163 = 'T2C';
const o1164 = 'TSPLT';
const n3492 = 'TJSON';
const n1166 = 'TCSV';
const a1167 = 'FETCH';
const x1168 = 'TFILE';
const c1169 = [k1094, f1060, v1095, NUMBER_PRECISION, x1096, x1097, NUMBER_NEGATIVE, x1098, NUMBER_QUANTIZE, k1099, o1100, d1101, u1102, NUMBER_MAP, NUMBER_BIAS, l1103, z1104, l1105, u1106, f1107, y1108, t1109, x1110, v1112, q1113, s1114, r1115, r1160, g1157, ...s1142, ...q1143, ...z1144, ...l1145, x1141, BUCKLE_LIST];
const y1170 = [w1146, v1061, e1147, q1148, s1149, f1150, o1151, k1152, b1154, b1155, q1153, f1156, n1158, x1159, i1162, k1163, o1164, n3492, n1166, a1167, x1168];
const x1171 = 'COL#';
const m1172 = 'COL';
const r1173 = 'CVAL';
const k1174 = 'CCOR';
const l1175 = 'COLP3';
const u1176 = 'CCNT';
const g1177 = 'BLND';
const o1178 = 'CLERP';
const m1179 = 'CBLND';
const f1180 = [x1171, m1172, k1174, l1175, g1177, o1178, m1179, a1161];
const p1181 = 'FILL#';
const e1182 = 'FILL';
const e1183 = [p1181, e1182];
const i1184 = 'STRK#';
const p1185 = 'STRK';
const d1186 = [i1184, p1185];
const z1193 = 'STRKSD#';
const e1194 = 'STRKSD';
const w1195 = [z1193, e1194];
const w1187 = 'CSTOP#';
const t1188 = 'CSTOP';
const q1189 = [w1187, t1188];
const j1190 = 'GRAD#';
const m1191 = 'GRAD';
const e1192 = [j1190, m1191];
const p1196 = 'RCRN#';
const h1197 = 'RCRN';
const b1198 = [p1196, h1197];
const q1199 = 'DRSH#';
const x1200 = 'DRSH';
const w1201 = [q1199, x1200];
const g1202 = 'INSH#';
const n1203 = 'INSH';
const u1204 = [g1202, n1203];
const h1205 = 'LBLR#';
const c1206 = 'LBLR';
const s1207 = [h1205, c1206];
const f1208 = 'BBLR#';
const q1209 = 'BBLR';
const h1210 = [f1208, q1209];
const z1211 = 'MASK#';
const r1212 = 'MASK';
const b1213 = [z1211, r1212];
const s1214 = 'BLEND#';
const c1215 = 'BLEND';
const w1216 = [s1214, c1215];
const e1217 = [...w1195, ...b1198, ...w1201, ...u1204, ...s1207, ...h1210, ...w1216, ...b1213];
const c1218 = [x1171, p1181, j1190, i1184, z1193, q1199, g1202, h1205, f1208, s1214, z1211];
const y1219 = 'CSTL';
const f1220 = 'SHP#';
const r1221 = 'RECT#';
const g1222 = 'RECT';
const h1223 = [r1221, g1222];
const t1224 = 'LINE#';
const l1225 = 'LINE';
const t1226 = [t1224, l1225];
const m1227 = 'ELPS#';
const m1228 = 'ELPS';
const o1229 = [m1227, m1228];
const w1230 = 'TRPZ#';
const m1231 = 'TRPZ';
const f1232 = [w1230, m1231];
const a1239 = 'POLY#';
const n1240 = 'POLY';
const l1241 = [a1239, n1240];
const q1242 = 'STAR#';
const d1243 = 'STAR';
const j1244 = [q1242, d1243];
const k1245 = 'TXTS#';
const v1246 = 'TXTS';
const d1247 = [k1245, v1246];
const g1248 = 'PT#';
const c1249 = 'PT';
const a1250 = [g1248, c1249];
const l1251 = 'PCORN';
const e1252 = 'VPATH#';
const c1253 = 'VPATH';
const k1254 = [e1252, c1253];
const g1255 = 'VPT#';
const q1256 = 'VPT';
const z1257 = [g1255, q1256];
const t1258 = 'VEDGE#';
const i1259 = 'VEDGE';
const o1260 = [t1258, i1259];
const p1261 = 'VREG#';
const g1262 = 'VREG';
const r1263 = [p1261, g1262];
const u1264 = 'VNET#';
const u1265 = 'VNET';
const t1266 = [u1264, u1265];
const s1267 = 'SGRP#';
const n1268 = 'SGRP';
const j1269 = [s1267, n1268];
const s1270 = 'FRM#';
const e1271 = 'FRM';
const u1272 = [s1270, e1271];
const o1234 = 'ARC#';
const y1233 = 'ARC';
const i1235 = [o1234, y1233];
const r1237 = 'WAVEP#';
const j1236 = 'WAVEP';
const j1238 = [r1237, j1236];
const b1273 = 'MOVE';
const l1274 = 'ROT';
const u1275 = 'SCALE';
const a1276 = 'SKEW';
const c1277 = 'SCENTR';
const x1278 = 'RSTX';
const i1279 = 'PLACE';
const q1280 = 'APPLY';
const PATH_LENGTH = 'PTHLEN';
const JOIN_PATHS = 'JOINPTH';
const REORIENT_PATHS = 'REORPTH';
const c1287 = 'PTALPATH';
const n1288 = 'CPTONPATH';
const p1281 = 'MESPT';
const f1282 = 'PTANGLE';
const k1283 = 'VECLEN';
const o1284 = 'CIRCEN';
const ARC_FROM_POINTS = 'ARCPT';
const k1285 = 'INTLIN';
const h1286 = 'PTLERP';
const REVERSE_PATH = 'REVPTH';
const BLEND_PATH = 'BLENDPTH';
const PATH_TYPES = [c1253, m1231, y1233, j1236];
const PATH_VALUES = [e1252, w1230, o1234, r1237];
const h1289 = 'SBOOL';
const s1290 = 'SBOOL#';
const k1291 = 'SBOOLU';
const x1292 = 'SBOOLS';
const b1293 = 'SBOOLI';
const m1294 = 'SBOOLE';
const y1295 = [h1289, s1290, k1291, x1292, b1293, m1294];
const e1296 = 'RENDER';
const EXPORT = 'EXPORT';
const z1297 = [f1220, e1062, r1221, t1224, m1227, w1230, a1239, q1242, k1245, g1248, e1252, g1255, t1258, p1261, u1264, o1234, r1237, s1267, s1270, s1290, q1199, g1202, h1205, f1208, s1214, z1211];
const j1298 = [l1274, u1275, a1276];
const o1299 = [...z1297, ...h1223, ...t1226, ...o1229, ...f1232, ...l1241, ...j1244, ...d1247, ...a1250, l1251, ...k1254, ...z1257, ...o1260, ...r1263, ...t1266, ...i1235, ...j1238, ...j1269, ...u1272, ...y1295, b1273, ...j1298, c1277, x1278, i1279, q1280, PATH_LENGTH, JOIN_PATHS, REORIENT_PATHS, c1287, n1288, p1281, f1282, k1283, o1284, y1233, j1236, ARC_FROM_POINTS, k1285, h1286, REVERSE_PATH, BLEND_PATH, e1296, EXPORT];
const q1300 = [m1059, f1060, v1061, e1062, k1094, w1146, x1171, p1181, w1187, j1190, i1184, w1187, j1190, f1220, r1221, t1224, m1227, w1230, a1239, q1242, k1245, g1248, e1252, g1255, t1258, p1261, u1264, s1267, s1270, p1196, q1199, g1202, h1205, f1208, s1214, z1211];
const c1301 = 'GROUP';
const p1302 = 'GPARAM';
const x1303 = [c1301, p1302];
const j1304 = 'CMNT';
const v1305 = 'CMNTARR';
const q1306 = 'PANEL';
const d1307 = 'ACT';
const r1308 = 'BFACT';
const q1309 = 'BFLST';
const g1310 = 'DIS';
const n1311 = 'NOC';
const PARAM = 'PARAM';
const b1312 = 'LOG';
const l1313 = 'GRAPH';
const r1314 = [[x1122, '%'], [m1121, '/'], [h1119, '−'], [n1118, '+'], [i1120, '×'], [o1123, 'e<sup>x']];
const y1315 = [[m1121, '/'], [h1119, '−'], [n1118, '+'], [i1120, '×']];
const j1316 = 0;
const v1317 = 1;
const c1318 = 2;
const j1319 = 3;
const n1320 = [[j1316, 'not'], [v1317, 'xor'], [c1318, 'or'], [j1319, 'and']];
const r1321 = 0;
const e1322 = 1;
const f1323 = 2;
const q1324 = 3;
const i1325 = 4;
const h1326 = 5;
const t1327 = [[r1321, '<'], [e1322, '≤'], [f1323, '≠'], [q1324, '='], [i1325, '≥'], [h1326, '>']];
const o1328 = 0;
const m1329 = 1;
const p1330 = 2;
const a1331 = 3;
const t1332 = 4;
const j1333 = 5;
const r1334 = [[o1328, 'sin'], [m1329, 'cos'], [p1330, 'tan'], [a1331, 'asin'], [t1332, 'acos'], [j1333, 'atan']];
const o1335 = 'EMPTY';
const a1336 = 'CONNECT';
const i1337 = 'CREATE';
const b1338 = 'CREATE_INSERT';
const t1339 = 'DELETE';
const u1340 = 'DISCONNECT';
const e1341 = 'LINK_STYLE';
const k1342 = 'LINK_VARIABLE';
const x1343 = 'LINK_VARIABLE_GROUP';
const b1344 = 'MAKE_ACTIVE';
const MAKE_NOT_CONDITION_ACTION = 'MAKE_NOT_CONDITION';
const f1345 = 'MAKE_PASSIVE';
const i1346 = 'PASTE';
const l1347 = 'RECONNECT';
const j1348 = 'REMOVE';
const o1349 = 'RENAME';
const p1350 = 'REORDER_INPUTS';
const j1351 = 'REORDER_CONNECTIONS';
const w1352 = 'SELECT';
const z1353 = 'SELECT_MOVE';
const b1354 = 'MOVE_NODES';
const z1355 = 'SET_PARAM_VALUE';
const SET_MULTIPLE_VALUES_ACTION = 'SET_MULTIPLE_VALUES';
const x1356 = 'SET_PARAM_SETTING';
const k1357 = 'SET_NODE_RECT';
const g1358 = 'TOGGLE_DISABLE';
const a1359 = 'TOGGLE_PARAM_HEADER';
const n1360 = 'SET_CURRENT_GRAPH';
const x1361 = 'CREATE_PAGE';
const o1362 = 'DELETE_PAGE';
const e1363 = 'GROUP_NODES';
const b1364 = 'UNGROUP_NODES';
const f1365 = 'HIGHLIGHT_NODES';
const SCROLL_LIST_NODE_ACTION = 'SCROLL_LIST_NODE';
const SET_LIST_DIVIDER_ACTION = 'SET_LIST_DIVIDER';
const SET_NODE_PARAM_ACTION = 'SET_NODE_PARAM';
const u1366 = 'BNORM';
const s1367 = 'BDARK';
const u1368 = 'BMULT';
const d1369 = 'BPDRK';
const x1370 = 'BBURN';
const a1371 = 'BLITE';
const u1372 = 'BSCRN';
const j1373 = 'BPLGT';
const p1374 = 'BDODG';
const i1375 = 'BOVER';
const g1376 = 'BSOFT';
const h1377 = 'BHARD';
const d1378 = 'BDIFF';
const l1379 = 'BEXCL';
const z1380 = 'BHUE';
const v1381 = 'BSAT';
const j1382 = 'BCOL';
const z1383 = 'BLUM';
const x1384 = [[u1366, 'normal', 'NORMAL'], [s1367, 'darken', 'DARKEN'], [u1368, 'multiply', 'MULTIPLY'], [d1369, 'plus darker', 'LINEAR_BURN'], [x1370, 'color burn', 'COLOR_BURN'], [a1371, 'lighten', 'LIGHTEN'], [u1372, 'screen', 'SCREEN'], [j1373, 'plus lighter', 'LINEAR_DODGE'], [p1374, 'color dodge', 'COLOR_DODGE'], [i1375, 'overlay', 'OVERLAY'], [g1376, 'soft light', 'SOFT_LIGHT'], [h1377, 'hard light', 'HARD_LIGHT'], [d1378, 'difference', 'DIFFERENCE'], [l1379, 'exclusion', 'EXCLUSION'], [z1380, 'hue', 'HUE'], [v1381, 'saturation', 'SATURATION'], [j1382, 'color', 'COLOR'], [z1383, 'luminosity', 'LUMINOSITY']];
const f1385 = [['thin', 100], ['extra light', 200], ['light', 300], ['regular', 400], ['medium', 500], ['semi bold', 600], ['bold', 700], ['extra bold', 800], ['black', 900]];
const d1386 = 0;
const t1387 = 1;
const h1388 = 2;
const r1389 = 2;
const q1390 = 3;
const p1391 = 3;
const b1392 = 4;
const a1393 = 4;
const f1394 = 5;
const w1395 = 6;
const p1396 = 7;
const g1397 = 8;
const w1398 = 9;
const w1399 = 10;
const k1400 = 11;
const q1401 = 12;
const r1402 = 13;
const f1403 = 14;
const q1404 = 15;
const o1405 = 16;
const p1406 = 17;
const m1407 = 18;
const k1408 = 19;
const s1409 = 20;
const s1410 = 21;
const q1411 = 22;
const g1412 = 23;
const v1413 = 24;
const FO_BOOLEAN_CHILDREN = 24;
const a1414 = 24;
const r1415 = 25;
const FO_BOOLEAN_OPERATION = 25;
const n1416 = 26;
const o1417 = 27;
const g1418 = 28;
const v1419 = 28;
const b1420 = 28;
const a1421 = 28;
const k1422 = 28;
const c1423 = 28;
const n1424 = 28;
const i1425 = 28;
const z1426 = 29;
const t1427 = 29;
const e1428 = 29;
const s1429 = 29;
const s1430 = 29;
const a1431 = 29;
const l1432 = 30;
const h1433 = 30;
const a1434 = 30;
const j1435 = 30;
const e1436 = 31;
const d1437 = 31;
const j1438 = 32;
const j1439 = 33;
const q1440 = 34;
const q1441 = 35;
const j1442 = 36;
const p1443 = 37;
const g2784 = '12345679ABCDEFGHJKLMNPQRSTUVWXYZ';
function n846(array, chars = g2784) { let g848 = ''; let len = array.length; let i = 0; while (len > 0) {
    if (len >= 5) {
        const a0 = array[i], a1 = array[i + 1], a2 = array[i + 2], a3 = array[i + 3], a4 = array[i + 4];
        g848 += chars[(a0 & 0xF8) >>> 3];
        g848 += chars[((a0 & 0x07) << 2) | ((a1 & 0xC0) >>> 6)];
        g848 += chars[(a1 & 0x3E) >>> 1];
        g848 += chars[((a1 & 0x01) << 4) | ((a2 & 0xF0) >>> 4)];
        g848 += chars[((a2 & 0x0F) << 1) | ((a3 & 0x80) >>> 7)];
        g848 += chars[(a3 & 0x7C) >>> 2];
        g848 += chars[((a3 & 0x03) << 3) | ((a4 & 0xE0) >>> 5)];
        g848 += chars[(a4 & 0x1F)];
    }
    else if (len == 4) {
        const a0 = array[i], a1 = array[i + 1], a2 = array[i + 2], a3 = array[i + 3];
        g848 += chars[(a0 & 0xF8) >>> 3];
        g848 += chars[((a0 & 0x07) << 2) | ((a1 & 0xC0) >>> 6)];
        g848 += chars[(a1 & 0x3E) >>> 1];
        g848 += chars[((a1 & 0x01) << 4) | ((a2 & 0xF0) >>> 4)];
        g848 += chars[((a2 & 0x0F) << 1) | ((a3 & 0x80) >>> 7)];
        g848 += chars[(a3 & 0x7C) >>> 2];
        g848 += chars[((a3 & 0x03) << 3)];
    }
    else if (len == 3) {
        const a0 = array[i], a1 = array[i + 1], a2 = array[i + 2];
        g848 += chars[(a0 & 0xF8) >>> 3];
        g848 += chars[((a0 & 0x07) << 2) | ((a1 & 0xC0) >>> 6)];
        g848 += chars[(a1 & 0x3E) >>> 1];
        g848 += chars[((a1 & 0x01) << 4) | ((a2 & 0xF0) >>> 4)];
        g848 += chars[((a2 & 0x0F) << 1)];
    }
    else if (len == 2) {
        const a0 = array[i], a1 = array[i + 1];
        g848 += chars[(a0 & 0xF8) >>> 3];
        g848 += chars[((a0 & 0x07) << 2) | ((a1 & 0xC0) >>> 6)];
        g848 += chars[(a1 & 0x3E) >>> 1];
        g848 += chars[((a1 & 0x01) << 4)];
    }
    else if (len == 1) {
        const a0 = array[i];
        g848 += chars[(a0 & 0xF8) >>> 3];
        g848 += chars[((a0 & 0x07) << 2)];
    }
    i += 5;
    len -= 5;
} return g848; }
function j847(g848, chars = g2784) { const array = []; let len = g848.length; let c = 0; while (len > 0) {
    if (len >= 8) {
        const c0 = chars.indexOf(g848[c]), c1 = chars.indexOf(g848[c + 1]), c2 = chars.indexOf(g848[c + 2]), c3 = chars.indexOf(g848[c + 3]), c4 = chars.indexOf(g848[c + 4]), c5 = chars.indexOf(g848[c + 5]), c6 = chars.indexOf(g848[c + 6]), c7 = chars.indexOf(g848[c + 7]);
        array.push((c0 << 3) | ((c1 & 0x1C) >>> 2));
        array.push(((c1 & 0x03) << 6) | (c2 << 1) | ((c3 & 0x10) >>> 4));
        array.push(((c3 & 0x0F) << 4) | ((c4 & 0x1E) >>> 1));
        array.push(((c4 & 0x01) << 7) | (c5 << 2) | ((c6 & 0x18) >>> 3));
        array.push(((c6 & 0x07) << 5) | c7);
    }
    else if (len == 7) {
        const c0 = chars.indexOf(g848[c]), c1 = chars.indexOf(g848[c + 1]), c2 = chars.indexOf(g848[c + 2]), c3 = chars.indexOf(g848[c + 3]), c4 = chars.indexOf(g848[c + 4]), c5 = chars.indexOf(g848[c + 5]), c6 = chars.indexOf(g848[c + 6]);
        array.push((c0 << 3) | ((c1 & 0x1C) >>> 2));
        array.push(((c1 & 0x03) << 6) | (c2 << 1) | ((c3 & 0x10) >>> 4));
        array.push(((c3 & 0x0F) << 4) | ((c4 & 0x1E) >>> 1));
        array.push(((c4 & 0x01) << 7) | (c5 << 2) | ((c6 & 0x18) >>> 3));
    }
    else if (len == 5) {
        const c0 = chars.indexOf(g848[c]), c1 = chars.indexOf(g848[c + 1]), c2 = chars.indexOf(g848[c + 2]), c3 = chars.indexOf(g848[c + 3]), c4 = chars.indexOf(g848[c + 4]);
        array.push((c0 << 3) | ((c1 & 0x1C) >>> 2));
        array.push(((c1 & 0x03) << 6) | (c2 << 1) | ((c3 & 0x10) >>> 4));
        array.push(((c3 & 0x0F) << 4) | ((c4 & 0x1E) >>> 1));
    }
    else if (len == 4) {
        const c0 = chars.indexOf(g848[c]), c1 = chars.indexOf(g848[c + 1]), c2 = chars.indexOf(g848[c + 2]), c3 = chars.indexOf(g848[c + 3]);
        array.push((c0 << 3) | ((c1 & 0x1C) >>> 2));
        array.push(((c1 & 0x03) << 6) | (c2 << 1) | ((c3 & 0x10) >>> 4));
    }
    else if (len == 2) {
        const c0 = chars.indexOf(g848[c]), c1 = chars.indexOf(g848[c + 1]);
        array.push((c0 << 3) | ((c1 & 0x1C) >>> 2));
    }
    c += 8;
    len -= 8;
} return array; }
function logSavedNode(nodeKey, b3993) {
    return __awaiter(this, void 0, void 0, function* () { const log = x2107(yield r1551(nodeKey, false)); if (b3993) {
        console.log('%c%s\n%c%s', 'background: #fa24; color: white;', c1057(nodeKey), 'background: #fa44; color: #edc;', log);
    }
    else {
        console.log('%c%s\n%c%s', 'background: #fdb; color: black;', c1057(nodeKey), 'background: #fed; color: black;', log);
    } });
}
function x2107(json) { let t4019 = json.replace('{\n', '').replace('\n}', '').replace('[\n' + s869, '').replace('\n' + s869 + ']', '').split(s869 + '"params":\n').join('').split('": "').join(': ').split('", "').join(': ').split(s869 + '"').join(s869).split(s869 + s869 + '["').join(s869 + s869).split('",\n').join('\n').split('"\n').join('\n').split('"],\n').join('\n'); if (t4019[t4019.length - 1] == '"')
    t4019 = t4019.substring(0, t4019.length - 1); if (t4019.substring(t4019.length - 2) == '"]')
    t4019 = t4019.substring(0, t4019.length - 2); return t4019; }
function k2108(json) { let t4019 = json.replace('{\n', '').replace('\n}', '').replace('[\n' + s869, '').replace('\n' + s869 + ']', ''); return t4019; }
function d2109(u243, b3993) { const o4197 = a927(u243, true); if (b3993) {
    console.log('%c%s', 'background: #4f44; color: #ded', o4197);
}
else {
    console.log('%c%s', 'background: #cfc; color: black;', o4197);
} }
console.clear();
figma.payments.setPaymentStatusInDevelopment({ type: 'PAID' });
figma.loadAllPagesAsync().then(() => { figma.on('documentchange', l1522); figma.on('selectionchange', c1530); figma.on('close', d1523); });
m1512(true);
figma.clientStorage.getAsync('pro').then(data => { figma.showUI(__html__, { visible: false, themeColors: true, title: 'Generator' }); });
var w2696 = figma.viewport.zoom;
setInterval(f1527, 100);
var strBackgrounds = '';
setInterval(figCheckBackgrounds, 500);
const w2785 = 'clock_';
const e2786 = 1000;
var g2787 = false;
var objectCenterSize = 15;
function p1524() { (function () {
    return __awaiter(this, void 0, void 0, function* () { figma.currentPage.loadAsync().then(() => __awaiter(this, void 0, void 0, function* () { let l2788 = yield figma.currentPage.getPluginData(figma.currentUser.id + ',windowWidth'); let k2789 = yield figma.currentPage.getPluginData(figma.currentUser.id + ',windowHeight'); let j2790; let e2791; if (l2788 === NULL) {
        j2790 = 800;
        figma.currentPage.setPluginData(figma.currentUser.id + ',windowWidth', l2788.toString());
    }
    else
        j2790 = parseInt(l2788); if (k2789 === NULL) {
        e2791 = 600;
        figma.currentPage.setPluginData(figma.currentUser.id + ',windowHeight', k2789.toString());
    }
    else
        e2791 = parseInt(k2789); figma.ui.resize(Math.max(minWindowWidth, j2790), Math.max(minWindowHeight, e2791)); figma.ui.show(); const fonts = yield figma.listAvailableFontsAsync(); const eula = (yield figma.clientStorage.getAsync('eula')) === 'true'; const tutorials = (yield figma.clientStorage.getAsync('tutorials')) === 'true'; const isLocked = yield j1529(); a1531({ cmd: 'uiReturnFigStartGenerator', currentUser: figma.currentUser, viewportRect: figma.viewport.bounds, viewportZoom: figma.viewport.zoom, fonts: fonts, eula: eula, tutorials: tutorials, isLocked: isLocked, windowWidth: j2790, windowHeight: e2791 }); })); });
})(); }
function y1525() { m1512(); figma.showUI(__html__, { visible: false, themeColors: true }); }
function z1526() { setInterval(c1528, e2786); }
function f1527() { if (figma.viewport.zoom == w2696)
    return; w2696 = figma.viewport.zoom; o2684(); q1545(); e1547(); }
function figCheckBackgrounds() { if (strBackgrounds != JSON.stringify(figma.currentPage.backgrounds)) {
    q1545();
    strBackgrounds = JSON.stringify(figma.currentPage.backgrounds);
} }
function c1528() { j1552(w2785 + figma.currentUser.sessionId.toString(), Date.now().toString()); }
function j1529() {
    return __awaiter(this, void 0, void 0, function* () { yield figma.currentPage.loadAsync(); const clocks = figma.currentPage.getPluginDataKeys().filter(k => k.length > w2785.length && k.substring(0, w2785.length) == w2785 && k.substring(w2785.length) != figma.currentUser.sessionId.toString()).map((k) => __awaiter(this, void 0, void 0, function* () { return parseInt(yield r1551(k)); })); clocks.sort(); const now = Date.now(); const locked = clocks.length > 0 && now - (yield clocks[clocks.length - 1]) < e2786 * 2; return locked; });
}
function c1530() { o2684(); }
var z2717 = new Array();
var r2719 = new Array();
function figGetObjectsFromIds(objectIds) {
    return __awaiter(this, void 0, void 0, function* () { for (let i = h2753.length - 1; i >= 0; i--)
        if (!h2753[i].removed && objectIds.includes(h2753[i].getPluginData('objectId')))
            h2753.splice(i, 1); for (let i = r2769.length - 1; i >= 0; i--)
        if (r2769[i].removed || objectIds.includes(r2769[i].getPluginData('objectId')))
            r2769.splice(i, 1); yield figma.currentPage.loadAsync(); return figma.currentPage.findAll(o => objectIds.includes(o.getPluginData('objectId'))); });
}
function m1511(nodeIds) {
    return __awaiter(this, void 0, void 0, function* () { for (let i = h2753.length - 1; i >= 0; i--)
        if (!h2753[i].removed && nodeIds.includes(h2753[i].getPluginData('nodeId')))
            h2753.splice(i, 1); for (let i = r2769.length - 1; i >= 0; i--)
        if (r2769[i].removed || nodeIds.includes(r2769[i].getPluginData('nodeId')))
            r2769.splice(i, 1); yield figma.currentPage.loadAsync(); figma.currentPage.findAll(o => nodeIds.includes(o.getPluginData('nodeId'))).forEach(o => { if (!o.removed)
        o.remove(); }); z2717 = z2717.filter(a => !nodeIds.includes(a.nodeId)); });
}
function m1512(g1513 = false) { for (const i1518 of figma.currentPage.children) {
    if (i1518.removed)
        continue;
    if (i1518.getPluginData('objectId') != '' && i1518.getPluginData('userId') == figma.currentUser.id && (parseInt(i1518.getPluginData('retain')) == 0 || g1513))
        i1518.remove();
} }
function j1514(nodeIds, v1515) { for (let i = z2717.length - 1; i >= 0; i--) {
    const d2718 = z2717[i];
    if (!nodeIds.includes(d2718.nodeId))
        continue;
    for (let j = d2718.objects.length - 1; j >= 0; j--) {
        const i1518 = d2718.objects[j];
        if (i1518.removed || !b1516(i1518, v1515)) {
            if (!i1518.removed)
                i1518.remove();
            k946(d2718.objects, i1518);
            if (h2753.includes(i1518))
                k946(h2753, i1518);
            if (r2769.includes(i1518))
                k946(r2769, i1518);
        }
        if (!i1518.removed) {
            if (parseInt(i1518.getPluginData('retain')) == 2)
                m1537(i1518);
        }
    }
    if (isEmpty(d2718.objects))
        k946(z2717, d2718);
} }
function b1516(i1518, v1515) { if (i1518.type == n1268 || i1518.type == e1271) {
    for (const child of i1518.children) {
        const found = b1516(child, v1515);
        if (found)
            return found;
    }
}
else {
    const found = v1515.find(o => i1518.getPluginData('objectId') == o[h1388] && i1518.getPluginData('userId') == figma.currentUser.id || o[f1394] == 2 && o[f1394] == i1518.getPluginData('retain'));
    if (found)
        return found;
} return null; }
function h1519(nodeIds, r1520) { figma.getLocalPaintStylesAsync().then(paintStyles => { paintStyles.filter(s => nodeIds.includes(s.getPluginData('nodeId'))).forEach(s => { const nodeId = s.getPluginData('nodeId'); const existing = c926(s.getPluginData('existing')); if (!existing) {
    s.remove();
}
else if (r1520) {
    m948(r2719, a => a.nodeId == nodeId);
    s.setPluginData('type', NULL);
    s.setPluginData('nodeId', NULL);
    s.setPluginData('existing', NULL);
} }); }); if (r1520)
    r2719 = r2719.filter(a => !nodeIds.includes(a.nodeId)); }
var v1521 = false;
function l1522(e) { for (const change of e.documentChanges) {
    switch (change.type) {
        case 'STYLE_CREATE':
            if (!change.style)
                break;
            if (!v1521) {
                change.style.setPluginData('type', NULL);
                change.style.setPluginData('nodeId', NULL);
                change.style.setPluginData('existing', NULL);
            }
            break;
        case 'STYLE_PROPERTY_CHANGE': {
            if (!change.style)
                break;
            if (!v1521) {
                const msg = { cmd: 'uiStylePropertyChange', styleId: q949(change.id), properties: change.properties, name: '', paints: [] };
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
                a1531(msg);
            }
            break;
        }
        case 'STYLE_DELETE':
            a1531({ cmd: 'uiStyleDelete', styleId: change.id });
            break;
    }
} v1521 = false; }
function d1523() { m1512(); a1531({ cmd: 'updateMetrics' }); }
figma.ui.onmessage = function (msg) { msg = JSON.parse(msg); if (msg.cmd == 'returnUiGetValueForFigma')
    return; switch (msg.cmd) {
    case 'figStartGenerator':
        p1524();
        break;
    case 'figRestartGenerator':
        y1525();
        break;
    case 'figFinishStart':
        z1526();
        break;
    case 'figDockWindowNormal':
        l2726('normal');
        break;
    case 'figDockWindowMaximize':
        l2726('maximize');
        break;
    case 'figDockWindowTop':
        l2726('top');
        break;
    case 'figDockWindowLeft':
        l2726('left');
        break;
    case 'figDockWindowRight':
        l2726('right');
        break;
    case 'figDockWindowBottom':
        l2726('bottom');
        break;
    case 'figGetMousePosition':
        z1597(msg.clientPosition);
        break;
    case 'figResizeWindow':
        i1600(msg.width, msg.height);
        break;
    case 'figSetWindowRect':
        x1598(msg.x, msg.y, msg.width, msg.height);
        break;
    case 'figNotify':
        n1601(msg);
        break;
    case 'figGetLocalData':
        z1549(msg.key);
        break;
    case 'figSetLocalData':
        t1550(msg.key, msg.value);
        break;
    case 'figClearAllLocalData':
        u4014();
        break;
    case 'figGetPageData':
        r1551(msg.key);
        break;
    case 'figSetPageData':
        j1552(msg.key, msg.value);
        break;
    case 'figSavePages':
        i1557(msg.pageIds, msg.pageJson, msg.currentPageId);
        break;
    case 'figLoadNodesAndConns':
        p1554(msg.debugMode);
        break;
    case 'figSaveNodes':
        s1558(msg.nodeIds, msg.nodeJson);
        break;
    case 'figGetAllLocalTemplateNames':
        u2723();
        break;
    case 'figSaveLocalTemplate':
        b1559(msg.h4015, msg.template);
        break;
    case 'figRemoveConnsToNodes':
        z1560(msg.nodeIds);
        break;
    case 'figRemoveSavedNodesAndConns':
        q1561(msg.nodeIds);
        break;
    case 'figRemoveAllSavedNodesAndConns':
        z1562();
        break;
    case 'figLogAllSavedNodesAndConns':
        n1563(msg.b3993);
        break;
    case 'figLogAllSavedNodes':
        g1564(msg.b3993);
        break;
    case 'figLogAllSavedConns':
        r1565(msg.b3993);
        break;
    case 'figLogAllSavedPageKeys':
        i1566(msg.b3993);
        break;
    case 'figLogAllSavedPages':
        p1567(msg.b3993);
        break;
    case 'figLogAllSavedConnKeys':
        o1568(msg.b3993);
        break;
    case 'figLogAllLocalData':
        u1569(msg.b3993);
        break;
    case 'figGetValue':
        p1570(msg.key, msg.spec);
        break;
    case 'figRemoveSavedPage':
        z1572(msg.pageId);
        break;
    case 'figRemoveAllSavedPages':
        w1573();
        break;
    case 'figSaveConnection':
        m1574(msg.key, msg.json);
        break;
    case 'figSaveConnections':
        s1575(msg.keys, msg.json);
        break;
    case 'figUpdateSavedConnections':
        i1576(msg.curKeys, msg.newKeys, msg.json);
        break;
    case 'figDeleteSavedConnection':
        h1577(msg.key);
        break;
    case 'figRemoveAllSavedConnections':
        f1578();
        break;
    case 'figDeleteSavedConnectionsToNode':
        y1579(msg.nodeId);
        break;
    case 'figDeleteSavedConnectionsFromNode':
        v1580(msg.nodeId);
        break;
    case 'figRemovePluginDataFromAllLocalStyles':
        u1581();
        break;
    case 'figGetAllLocalVariables':
        d1605(msg.nodeId, msg.px, msg.py);
        break;
    case 'figLinkNodeToVariable':
        m1607(msg.nodeId, msg.variableId);
        break;
    case 'figUpdateVariable':
        figUpdateVariableAsync(msg.variableId, msg.value);
        break;
    case 'figGetAllLocalColorStyles':
        p1582(msg.nodeId, msg.px, msg.py);
        break;
    case 'figLinkNodeToExistingColorStyle':
        d1583(msg.nodeId, msg.styleId);
        break;
    case 'figExport':
        figExport(msg.objectIds, msg.scale, msg.format, msg.suffix);
        break;
    case 'figGetObjectSize':
        g1536(msg.object);
        break;
    case 'figGetVariableUpdates':
        p1571(msg.linkedVarIds);
        break;
    case 'figUpdateShowIds':
        g2787 = msg.g2787;
        break;
    case 'figUpdateObjectCenterSize':
        objectCenterSize = msg.objectCenterSize;
        break;
    case 'figDeleteAllObjects':
        m1512();
        break;
    case 'figUpdateObjectsAndStyles':
        n2732 = 0;
        u2733 = 0;
        msg.objects.forEach(o => o.counted = false);
        u2720(null, msg.objects, msg.j4007, msg.k2055, msg.nodeIds, msg.u2749, msg.x2750, msg.e270);
        g1588(msg);
        break;
    case 'figDeleteObjectsAndStyles':
        m1511(msg.nodeIds);
        h1519(msg.nodeIds, msg.r1520);
        break;
    case 'figDeleteObjectsExcept':
        j1514(msg.nodeIds, msg.ignoreObjects);
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
} a1531({ cmd: 'uiEndFigMessage', msgCmd: msg.cmd }); };
function a1531(msg) { figma.ui.postMessage(JSON.stringify(msg)); }
function b2721(key) {
    return __awaiter(this, void 0, void 0, function* () { return yield figma.clientStorage.getAsync(key); });
}
function z1549(key) { figma.currentPage.loadAsync().then(() => { if (key == 'canvasEmpty') {
    a1531({ cmd: 'uiReturnFigGetLocalData', key: key, value: figma.currentPage.children.length == 0 });
}
else if (key == 'debugWarningCrash') {
    figma.clientStorage.getAsync('debugWarning').then(data => { a1531({ cmd: 'uiReturnFigGetLocalData', key: key, value: data }); });
}
else {
    figma.clientStorage.getAsync(key).then(data => { a1531({ cmd: 'uiReturnFigGetLocalData', key: key, value: data }); });
} }); }
function t1550(key, value, postToUi = true) { figma.clientStorage.setAsync(key, value); if (postToUi) {
    a1531({ cmd: 'uiReturnFigSetLocalData', key: key, value: value });
} }
function u4014() {
    return __awaiter(this, void 0, void 0, function* () { const keys = yield figma.clientStorage.keysAsync(); for (const key of keys)
        figma.clientStorage.deleteAsync(key); });
}
function r1551(key, postToUi = true) {
    return __awaiter(this, void 0, void 0, function* () { yield figma.currentPage.loadAsync(); const data = figma.currentPage.getPluginData(key); if (postToUi) {
        a1531({ cmd: 'uiReturnFigGetPageData', key: key, value: data });
    } return data; });
}
function j1552(key, value) { i1553(key); figma.currentPage.setPluginData(key, value); }
function i1553(key) { figma.currentPage.setPluginData(key, ''); }
function p1554(debugMode) { figma.currentPage.loadAsync().then(() => { const pageKeys = figma.currentPage.getPluginDataKeys().filter(k => h1053(k)); const nodeKeys = figma.currentPage.getPluginDataKeys().filter(k => u1054(k)); const connKeys = figma.currentPage.getPluginDataKeys().filter(k => j1055(k)); if (!debugMode)
    y1556(nodeKeys, connKeys); const pages = pageKeys.map(k => figma.currentPage.getPluginData(k)); const nodes = nodeKeys.map(k => figma.currentPage.getPluginData(k)); const c2126 = connKeys.map(k => figma.currentPage.getPluginData(k)); const pageOrder = figma.currentPage.getPluginData('pageOrder').split(','); const currentPageId = figma.currentPage.getPluginData('currentPageId'); z1555(nodes); const showAllColorSpaces = figma.currentPage.getPluginData('showAllColorSpaces'); a1531({ cmd: 'uiReturnFigLoadNodesAndConns', showAllColorSpaces: showAllColorSpaces, pageKeys: pageKeys, pageJson: pages, pageOrder: pageOrder, currentPageId: currentPageId, nodeKeys: nodeKeys, nodeJson: nodes, connKeys: connKeys, connJson: c2126 }); }); }
function z1555(nodes) { r2719 = []; figma.getLocalPaintStylesAsync().then(paintStyles => { for (const w3006 of nodes) {
    const node = JSON.parse(w3006);
    if (node.type == y1219) {
        const style = paintStyles.find(s => { const nodeId = s.getPluginData('nodeId'); return nodeId == node.id; });
        if (style) {
            r2719.push({ nodeId: node.id, existing: c926(node.existing), styles: [style] });
        }
    }
} }); }
function y1556(nodeKeys, connKeys) { figma.currentPage.loadAsync().then(() => { const z2722 = '"loading": "true"'; const not = '{\n'; const set = '{\n' + s869 + z2722 + ',\n'; nodeKeys.forEach(k => figma.currentPage.setPluginData(k, figma.currentPage.getPluginData(k).replace(set, not).replace(not, set))); connKeys.forEach(k => figma.currentPage.setPluginData(k, figma.currentPage.getPluginData(k).replace(set, not).replace(not, set))); }); }
function i1557(pageIds, pageJson, currentPageId) { for (let i = 0; i < pageIds.length; i++) {
    j1552(b925(pageIds[i]), pageJson[i]);
} j1552('pageOrder', pageIds.join(',')); j1552('currentPageId', currentPageId); }
function s1558(nodeIds, nodeJson) { for (let i = 0; i < nodeIds.length; i++) {
    j1552(w923(nodeIds[i]), nodeJson[i]);
} }
function u2723() {
    return __awaiter(this, void 0, void 0, function* () { let keys = yield figma.clientStorage.keysAsync(); keys = keys.filter(k => k.length >= y877.length && k.substring(0, y877.length) == y877); a1531({ cmd: 'uiReturnGetAllLocalTemplateNames', templateNames: keys }); });
}
function b1559(h4015, template) { t1550(y877 + ' ' + h4015, template); }
function z1560(nodeIds) { figma.currentPage.loadAsync().then(() => { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => j1055(k)); for (const key of connKeys) {
    const parts = x1058(key).split(' ');
    if (nodeIds.includes(parts[0]) || nodeIds.includes(parts[2]))
        i1553(key);
} }); }
function q1561(nodeIds) { figma.currentPage.loadAsync().then(() => { z1560(nodeIds); const nodeKeys = figma.currentPage.getPluginDataKeys().filter(k => u1054(k) && nodeIds.includes(c1057(k))); nodeKeys.forEach(k => i1553(k)); }); }
function z1562() { figma.currentPage.loadAsync().then(() => { const nodeKeys = figma.currentPage.getPluginDataKeys().filter(k => u1054(k)); const connKeys = figma.currentPage.getPluginDataKeys().filter(k => j1055(k)); for (const key of nodeKeys)
    i1553(key); for (const key of connKeys)
    i1553(key); }); }
function n1563(b3993) {
    return __awaiter(this, void 0, void 0, function* () { yield g1564(b3993); r1565(b3993); });
}
function g1564(b3993) {
    return __awaiter(this, void 0, void 0, function* () { yield figma.currentPage.loadAsync(); figma.currentPage.getPluginDataKeys().filter(k => u1054(k)).forEach((k) => __awaiter(this, void 0, void 0, function* () { return yield logSavedNode(k, b3993); })); });
}
function r1565(b3993) { figma.currentPage.loadAsync().then(() => { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => j1055(k)); connKeys.sort((key1, key2) => { const p1 = x1058(key1).split(' '); const p2 = x1058(key2).split(' '); if (p1[2] != p2[2])
    return p1[2] < p2[2] ? -1 : 1; if (p1[3] != p2[3])
    return parseInt(p1[3]) - parseInt(p2[3]); if (p1[2] == p2[0])
    return -1; if (p2[2] == p1[0])
    return 1; return 0; }); connKeys.forEach(k => d2109(JSON.parse(figma.currentPage.getPluginData(k)), b3993)); }); }
function i1566(b3993) { figma.currentPage.loadAsync().then(() => { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => h1053(k)); connKeys.forEach(k => console.log('%c' + k, 'background: #fff; color: ' + (b3993 ? 'black' : 'white'))); const pageOrder = figma.currentPage.getPluginData('pageOrder'); console.log('%c' + pageOrder, 'background: #fff; color: ' + (b3993 ? 'black' : 'white')); }); }
function p1567(b3993) { figma.currentPage.loadAsync().then(() => { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => h1053(k)); connKeys.forEach(k => console.log('%c' + figma.currentPage.getPluginData(k), 'background: #fff; color: ' + (b3993 ? 'black' : 'white'))); const pageOrder = figma.currentPage.getPluginData('pageOrder'); console.log('%c' + pageOrder, 'background: #fff; color: ' + (b3993 ? 'black' : 'white')); }); }
function o1568(b3993) { figma.currentPage.loadAsync().then(() => { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => j1055(k)); connKeys.forEach(k => console.log('%c' + k, 'background: #dff; color: ' + (b3993 ? 'black' : 'white'))); }); }
function u1569(b3993) { figma.clientStorage.keysAsync().then(keys => keys.forEach(k => figma.clientStorage.getAsync(k).then(val => console.log(k + ': ' + val)))); }
function p1570(key, spec) {
    return __awaiter(this, void 0, void 0, function* () { let result = null; switch (key) {
        case 'getVariableData':
            result = yield r1606(spec);
            break;
        case 'getPaidStatus':
            result = figma.payments.status.type;
            break;
        case 'figSubscribe': {
            yield figma.payments.initiateCheckoutAsync({ interstitial: 'PAID_FEATURE' });
            result = figma.payments.status.type;
            break;
        }
    } a1531({ cmd: 'returnFigGetValue', value: result }); });
}
function p1571(varIds) { r1606(varIds).then(values => { a1531({ cmd: 'uiReturnFigGetVariableUpdates', values: values }); }); }
function z1572(pageId) {
    return __awaiter(this, void 0, void 0, function* () { i1553(z935(pageId)); const pageOrder = (yield r1551('pageOrder')).split(','); m948(pageOrder, id => id == pageId); j1552('pageOrder', pageOrder.join(',')); });
}
function w1573() { figma.currentPage.loadAsync().then(() => { const pageKeys = figma.currentPage.getPluginDataKeys().filter(k => h1053(k)); pageKeys.forEach(k => i1553(k)); i1553('pageOrder'); }); }
function m1574(key, json) { j1552(key, json); }
function s1575(_keys, _json) { const keys = JSON.parse(_keys); const json = JSON.parse(_json); for (let i = 0; i < keys.length; i++)
    j1552(keys[i], json[i]); }
function i1576(_curKeys, _newKeys, _json) { const curKeys = JSON.parse(_curKeys); const newKeys = JSON.parse(_newKeys); const json = JSON.parse(_json); for (let i = 0; i < curKeys.length; i++) {
    i1553(curKeys[i]);
    j1552(newKeys[i], json[i]);
} }
function h1577(key) { i1553(key); }
function f1578() { figma.currentPage.loadAsync().then(() => { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => j1055(k)); connKeys.forEach(k => i1553(k)); }); }
function y1579(nodeId) { figma.currentPage.loadAsync().then(() => { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => j1055(k)); for (const key of connKeys) {
    const parts = key.split(' ');
    if (parts[4] == nodeId)
        i1553(key);
} }); }
function v1580(nodeId) { figma.currentPage.loadAsync().then(() => { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => j1055(k)); for (const key of connKeys) {
    const parts = key.split(' ');
    if (parts[1] == nodeId)
        i1553(key);
} }); }
function u1581() { figma.getLocalPaintStylesAsync().then(l1585 => { for (const style of l1585) {
    style.setPluginData('type', '');
    style.setPluginData('nodeId', '');
    style.setPluginData('existing', '');
} }); }
function figSaveSnapshot(index, objectIds) {
    return __awaiter(this, void 0, void 0, function* () { const objects = yield figGetObjectsFromIds(objectIds); const group = figma.group(objects, figma.currentPage); const settings = { format: 'PNG' }; const icon = yield group.exportAsync(settings); figma.ungroup(group); a1531({ cmd: 'uiReturnFigSaveSnapshot', index: index, iconWidth: group.width, iconHeight: group.height, icon: icon }); });
}
var z2724 = null;
var b4016 = () => z2724 = null;
var t2725 = 'normal';
function z1597(clientPosition) { a1531({ cmd: 'uiReturnFigGetMousePosition', position: { x: 0, y: 0 }, clientPosition: clientPosition, viewportZoom: figma.viewport.zoom, viewportRect: figma.viewport.bounds }); }
function x1598(x, y, width, height) { return; }
function g1599(dock, rect, bounds) { switch (dock) {
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
function i1600(width, height) { (function () {
    return __awaiter(this, void 0, void 0, function* () { width = Math.floor(Math.max(0, width)); height = Math.floor(Math.max(0, height)); figma.ui.resize(width, height); yield figma.currentPage.loadAsync(); figma.currentPage.setPluginData(figma.currentUser.id + ',windowWidth', width.toString()); figma.currentPage.setPluginData(figma.currentUser.id + ',windowHeight', height.toString()); a1531({ cmd: 'uiReturnFigResizeWindow', width: width, height: height }); });
})(); }
function l2726(dock) {
    return __awaiter(this, void 0, void 0, function* () { if (dock != 'normal' && t2725 == 'normal') {
        figma.clientStorage.setAsync('normalWindowX', yield figma.clientStorage.getAsync('normalWindowX'));
        figma.clientStorage.setAsync('normalWindowY', yield figma.clientStorage.getAsync('normalWindowY'));
        figma.clientStorage.setAsync('normalWindowWidth', yield figma.clientStorage.getAsync('normalWindowWidth'));
        figma.clientStorage.setAsync('normalWindowHeight', yield figma.clientStorage.getAsync('normalWindowHeight'));
    } t2725 = dock; figma.clientStorage.setAsync('windowDock', dock); i1600(yield figma.clientStorage.getAsync('windowWidth'), yield figma.clientStorage.getAsync('windowHeight')); });
}
function n1601(msg) { q1602(msg.text, msg.prefix, msg.delay, msg.error, msg.v1603, msg.k1604); }
function q1602(text, prefix = 'Generator ', delay = 400, error = false, v1603 = '', k1604 = NULL) { const options = { timeout: delay, error: error, onDequeue: b4016 }; if (v1603 != '') {
    options['button'] = { text: v1603 };
    if (k1604.substring(0, 'removeConnection'.length) == 'removeConnection') {
        options['button']['action'] = () => h1577(k1604.split(',')[1]);
    }
    else {
        switch (k1604) {
            case 'hideClearUndoWarning':
                options['button']['action'] = () => a1531({ cmd: 'uiHideClearUndoWarning' });
                break;
        }
    }
} if (z2724)
    z2724.cancel(); z2724 = figma.notify(prefix + text, options); }
function v2727(key, params = null) {
    return __awaiter(this, void 0, void 0, function* () { return yield y2728(key, params); });
}
function y2728(key, params = null) {
    return __awaiter(this, void 0, void 0, function* () { return new Promise((resolve, reject) => { const timeout = 60000; a1531(Object.assign({ cmd: 'uiGetValueForFigma', key: key }, (params || {}))); const e2729 = setTimeout(() => reject(new Error('Timeout: Result not received by Figma within the specified time')), timeout); function h4017(msg) { msg = JSON.parse(msg); if (msg.cmd === 'returnUiGetValueForFigma') {
        clearTimeout(e2729);
        resolve({ key: msg.key, value: msg.value });
        figma.ui.off('message', h4017);
    } } figma.ui.on('message', h4017); }); });
}
var u2730 = [];
var r2731 = [];
var n2732 = 0;
var u2733 = 0;
function d1532(z111) { return (z111[f1394] === 2 ? '' : z873) + (g2787 ? z111[h1388] : z111[q1390]); }
function w1533(r1517, addObject = null, addProps = true, transform = true) {
    return __awaiter(this, void 0, void 0, function* () { if (!p1535(r1517))
        return null; let i1518; switch (r1517[d1386]) {
        case g1222:
            i1518 = n2701(r1517, addProps, transform);
            break;
        case l1225:
            i1518 = u2780(r1517, addProps, transform);
            break;
        case m1228:
            i1518 = r2776(r1517, addProps, transform);
            break;
        case n1240:
            i1518 = q2697(r1517, addProps, transform);
            break;
        case d1243:
            i1518 = w2704(r1517, addProps, transform);
            break;
        case v1246:
            i1518 = k2707(r1517, addProps, transform);
            break;
        case c1249:
            i1518 = o2683(r1517);
            break;
        case c1253:
            i1518 = x2735(r1517, addProps, transform);
            break;
        case u1265:
            i1518 = w2736(r1517, addProps, transform);
            break;
        case h1289:
            i1518 = yield z2737(r1517, addProps, transform);
            break;
        case n1268:
            i1518 = yield r2738(r1517);
            break;
        case e1271:
            i1518 = yield l2739(r1517, addProps, transform);
            break;
    } if (addObject && i1518 != undefined && i1518 != null && !i1518.removed) {
        i1518.name = d1532(r1517);
        x955(r1517[d1386] == n1268 || !!i1518, 'no Figma object created');
        if (i1518 != undefined && i1518 != null) {
            i1518.setPluginData('retain', r1517[f1394].toString());
            if (r1517[f1394] < 2) {
                i1518.setPluginData('userId', figma.currentUser.id);
                i1518.setPluginData('sessionId', figma.currentUser.sessionId.toString());
                i1518.setPluginData('type', r1517[d1386]);
                i1518.setPluginData('nodeId', r1517[t1387]);
                i1518.setPluginData('objectId', r1517[h1388]);
                i1518.setPluginData('isCenter', w940(r1517[s1409]));
                if (r1517[d1386] == c1249)
                    h2753.push(i1518);
                if (r1517[k1408])
                    q1548(i1518);
            }
            addObject(i1518);
        }
    } if (!r1517.counted) {
        u2733++;
        r1517.counted = true;
    } return i1518; });
}
function r1534(i1518, r1517, addProps, transform) {
    return __awaiter(this, void 0, void 0, function* () { if (!p1535(r1517) || i1518 == undefined || i1518 == null || i1518.removed)
        return; i1518.name = d1532(r1517); i1518.setPluginData('retain', r1517[f1394].toString()); switch (r1517[d1386]) {
        case g1222:
            m2702(i1518, r1517, addProps, transform);
            break;
        case l1225:
            f2781(i1518, r1517, addProps, transform);
            break;
        case m1228:
            s2777(i1518, r1517, addProps, transform);
            break;
        case n1240:
            y2698(i1518, r1517, addProps, transform);
            break;
        case d1243:
            c2705(i1518, r1517, addProps, transform);
            break;
        case v1246:
            j2708(i1518, r1517, addProps, transform);
            break;
        case c1249:
            f2740(i1518, r1517);
            break;
        case c1253:
            g2741(i1518, r1517, addProps, transform);
            break;
        case u1265:
            k2742(i1518, r1517, addProps, transform);
            break;
        case h1289:
            g2743(i1518, r1517, addProps, transform);
            break;
        case n1268:
            s2744(i1518, r1517);
            break;
        case e1271:
            q2745(i1518, r1517, addProps, transform);
            break;
    } if (i1518 != undefined && i1518 != null && !i1518.removed) {
        if (i1518.parent == figma.currentPage)
            yield figma.currentPage.loadAsync();
        i1518.parent.appendChild(i1518);
        if (r1517[k1408])
            q1548(i1518);
    } if (!r1517.counted) {
        u2733++;
        r1517.counted = true;
    } });
}
function u2720(z2746, f2747, v2748, k2055 = -1, nodeIds = [], u2749 = false, x2750 = false, e270 = false, addProps = true, transform = true) {
    return __awaiter(this, void 0, void 0, function* () { let x2751 = NULL; let m2752 = null; let abort = false; const w3630 = []; let l2734 = 0; u2730.push(...nodeIds); if (k2055 > -1)
        n2732 = k2055; for (const r1517 of f2747) {
        r2731.push(r1517);
        if (r1517[t1387] != x2751) {
            x2751 = r1517[t1387];
            m2752 = z2717.find(a => a.nodeId == r1517[t1387]);
            if (!m2752) {
                z2717.push(m2752 = { nodeId: r1517[t1387], objects: [] });
            }
        }
        const addObject = i1518 => { if (z2746 != undefined && z2746 != null && !z2746.removed)
            z2746.appendChild(i1518);
        else
            m2752.objects.push(i1518); };
        let objects = z2746 != undefined && z2746 != null && !z2746.removed ? z2746.children : m2752.objects;
        let i1518 = objects.find(o => o.removed || o.getPluginData('userId') == figma.currentUser.id && o.getPluginData('objectId') == r1517[h1388]);
        if (i1518 != undefined && i1518 != null && i1518.removed) {
            f941(objects, i1518);
            if (h2753.includes(i1518))
                k946(h2753, i1518);
            if (r2769.includes(i1518))
                k946(r2769, i1518);
        }
        if (i1518 == undefined || i1518 == null || i1518.removed) {
            const newObj = yield w1533(r1517, addObject, addProps, transform);
            w3630.push(newObj);
        }
        else if (i1518 != undefined && i1518 != null && !i1518.removed && i1518.getPluginData('type') == r1517[d1386].toString()) {
            yield r1534(i1518, r1517, addProps, transform);
            if (i1518 != undefined && i1518 != null && !i1518.removed)
                w3630.push(i1518);
        }
        else {
            i1518.remove();
            if (h2753.includes(i1518))
                k946(h2753, i1518);
            if (r2769.includes(i1518))
                k946(r2769, i1518);
            yield w1533(r1517, addObject, addProps, transform);
        }
        l2734++;
        if (l2734 >= v2748) {
            const result = yield v2727('returnObjectUpdate', { n2732: n2732, u2733: u2733 });
            abort = result.value;
            l2734 = 0;
            if (abort)
                break;
        }
    } if (z2746 != undefined && z2746 != null && !z2746.removed) {
        for (const i1518 of z2746.children) {
            if (i1518 != undefined && i1518 != null && i1518.removed || !f2747.find(o => o[h1388] == i1518.getPluginData('objectId') && i1518.getPluginData('userId') == figma.currentUser.id))
                i1518.remove();
        }
    } for (const point of h2753) {
        if (point.parent == figma.currentPage)
            yield figma.currentPage.loadAsync();
        if (point != undefined && point != null && !point.removed && !point.parent.removed)
            point.parent.appendChild(point);
    } if (x2750 && !abort) {
        j1514(u2730, r2731);
        u2730 = [];
        r2731 = [];
        if (e270 && w3630.length > 0) {
            figma.viewport.scrollAndZoomIntoView(w3630);
            const bounds = r1538(w3630);
            figma.viewport.zoom = Math.min(figma.viewport.bounds.width * figma.viewport.zoom / bounds.width - 0.05, figma.viewport.bounds.height * figma.viewport.zoom / bounds.height - 0.05);
        }
    } yield v2727('returnObjectUpdate', { n2732: n2732, u2733: u2733 }); });
}
function p1535(r1517) { switch (r1517[d1386]) {
    case g1222: return b2700(r1517);
    case l1225: return m2762(r1517);
    case m1228: return f2763(r1517);
    case n1240: return g4013(r1517);
    case d1243: return d2703(r1517);
    case v1246: return v2706(r1517);
    case c1249: return t4012(r1517);
    case c1253: return c2764(r1517);
    case u1265: return b2765(r1517);
    case h1289: return x2766(r1517);
    case n1268: return q2767(r1517);
    case e1271: return c2768(r1517);
} }
function g1536(r1517) {
    return __awaiter(this, void 0, void 0, function* () { (() => __awaiter(this, void 0, void 0, function* () { const i1518 = yield w1533(r1517); const width = i1518.width; const height = i1518.height; i1518.remove(); a1531({ cmd: 'uiForwardToGenerator', msg: { cmd: 'returnFigGetObjectSize', objectId: r1517[h1388], width: width, height: height } }); }))(); });
}
function m1537(i1518) { i1518.setPluginData('type', ''); i1518.setPluginData('nodeId', ''); i1518.setPluginData('userId', ''); i1518.setPluginData('sessionId', ''); i1518.setPluginData('objectId', ''); i1518.setPluginData('isCenter', ''); i1518.setPluginData('retain', ''); }
function r1538(objects) { const bounds = { left: 0, top: 0, right: 0, bottom: 0 }; for (const z111 of objects) {
    if (z111.x < bounds.left || bounds.left == bounds.right)
        bounds.left = z111.x;
    if (z111.y < bounds.top || bounds.top == bounds.bottom)
        bounds.top = z111.y;
    if (z111.x + z111.width > bounds.right || bounds.left == bounds.right)
        bounds.right = z111.x + z111.width;
    if (z111.y + z111.height > bounds.bottom || bounds.top == bounds.bottom)
        bounds.bottom = z111.y + z111.height;
} return { x: bounds.left, y: bounds.top, width: bounds.right - bounds.left, height: bounds.bottom - bounds.top }; }
function figExport(objectIds, scale, format, suffix) {
    return __awaiter(this, void 0, void 0, function* () { yield figma.currentPage.loadAsync(); for (const objId of objectIds) {
        let i1518 = figma.currentPage.children.find(o => !o.removed && o.getPluginData('userId') == figma.currentUser.id && o.getPluginData('objectId') == objId);
        if (!i1518)
            continue;
        const settings = { constraint: { type: 'SCALE', value: scale }, format: format == 0 ? 'PNG' : 'JPG', suffix: suffix };
        yield i1518.exportAsync(settings);
    } });
}
const r2769 = [];
const d2770 = [];
function l1539(v1540, y1541) { const effects = []; for (const effect of v1540) {
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
                if (y1541 && !isNaN(spread))
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
function b2690(i1518, r1517, phantom = true) { y1544(i1518, r1517); j2691(i1518, r1517, phantom); s2692(i1518, r1517); i1518.opacity = r1517[s1410]; i1518.blendMode = r1517[q1411]; const maskType = r1517[g1412]; i1518.isMask = maskType > 0; if (i1518.isMask) {
    switch (maskType) {
        case 1:
            i1518.maskType = 'ALPHA';
            break;
        case 2:
            i1518.maskType = 'VECTOR';
            break;
        case 3:
            i1518.maskType = 'LUMINANCE';
            break;
    }
} if (i1518.isMask && i1518.fills.length == 0 && i1518.strokes.length == 0)
    i1518.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 }, opacity: 1, blendMode: 'NORMAL' }]; }
function s2692(i1518, r1517) { if (!!r1517[w1399] && !isEmpty(r1517[w1399])) {
    i1518.fills = a959(r1517[w1399]);
    if (r2769.includes(i1518))
        k946(r2769, i1518);
}
else
    i1518.fills = []; }
function j2691(i1518, r1517, phantom = true) { if (r1517[k1400] != null && !isEmpty(r1517[k1400])) {
    e1543(i1518, a959(r1517[k1400]), r1517[q1401], r1517[r1402], r1517[f1403], r1517[q1404], r1517[o1405], k2693(r1517[p1406]));
    if (r1517[k1408])
        i1518.setPluginData('dashes', r1517[p1406]);
    if (r2769.includes(i1518))
        k946(r2769, i1518);
    if (r1517[k1408])
        p952(d2770, i1518);
}
else if (isEmpty(r1517[w1399]) && isEmpty(r1517[k1400]) && !r1517[g1412] && phantom) {
    d1546(i1518);
    p952(r2769, i1518);
}
else
    i1518.strokes = []; }
function k2693(m1542) { m1542 = m1542; m1542 = m957(m1542, ','); m1542 = k958(m1542, ','); m1542 = m1542.trim(); return m1542 == '' ? [] : m1542.split(',').map(s => Math.max(0, parseFloat(s))); }
function u2694(m1542) { m1542 = m1542; m1542 = m957(m1542, ','); m1542 = k958(m1542, ','); m1542 = m1542.trim(); return m1542 == '' ? [] : m1542.split(',').map(s => Math.max(0, parseFloat(s) / w2696)); }
function e1543(i1518, fills, weight, align, join, miterLimit, cap, dashes = []) { i1518.strokes = fills; i1518.strokeWeight = Math.max(0, weight); i1518.strokeAlign = align; i1518.strokeJoin = join; const miterAngle = miterLimit / 360 * Tau; const p2771 = 1 / Math.sin(miterAngle / 2); i1518.strokeMiterLimit = Math.min(Math.max(0, p2771), 16); i1518.strokeCap = cap; i1518.dashPattern = dashes; }
function y1544(i1518, r1517) { if (!!r1517[m1407] && !isEmpty(r1517[m1407])) {
    const y1541 = r1517[d1386] == g1222 || r1517[d1386] == m1228 || r1517[d1386] == e1271;
    i1518.effects = l1539(r1517[m1407], y1541);
}
else
    i1518.effects = []; }
function q1545() { for (const z111 of r2769) {
    if (z111.removed)
        k946(r2769, z111);
    else
        d1546(z111);
} }
function d1546(z111) { figma.currentPage.loadAsync().then(() => { const back = figma.currentPage.backgrounds.find(b => b.type == 'SOLID'); let phantomColor; if (back) {
    const l = back.color.r * 0.2126 + back.color.g * 0.7152 + back.color.b * 0.0722;
    phantomColor = l > 0.5 ? { r: 0, g: 0, b: 0 } : { r: 1, g: 1, b: 1 };
}
else
    phantomColor = { r: 1, g: 0, b: 1 }; e1543(z111, [{ type: 'SOLID', color: phantomColor, opacity: 0.5 }], 1 / w2696, 'CENTER', 'MITER', 1, 'NONE', [1 / w2696, 2 / w2696]); }); }
function e1547() { for (const i1518 of d2770) {
    if (i1518.removed)
        k946(d2770, i1518);
    else
        q1548(i1518);
} }
function q1548(i1518) { i1518.strokeWeight = Math.max(0, 1.5 / w2696); if (c926(i1518.getPluginData('isCenter'))) {
    const path = i1518.vectorPaths[0];
    const parts = path.data.split(' ');
    let t = { x: parseFloat(parts[1]), y: parseFloat(parts[2]) };
    let c = { x: parseFloat(parts[4]), y: parseFloat(parts[5]) };
    let r = { x: parseFloat(parts[7]), y: parseFloat(parts[8]) };
    const a = 2;
    const b = 0.05;
    const f = 1 - Math.pow(1 - Math.min(w2696, 1), a) / Math.pow(a, b);
    t = t898(c, r900(p885(o903(t, c)), objectCenterSize / f));
    r = t898(c, r900(p885(o903(r, c)), objectCenterSize / f));
    parts[1] = t.x;
    parts[2] = t.y;
    parts[4] = c.x;
    parts[5] = c.y;
    parts[7] = r.x;
    parts[8] = r.y;
    const h2772 = { windingRule: path.windingRule, data: parts.join(' ') };
    i1518.vectorPaths = [h2772];
} const dashes = i1518.getPluginData('dashes'); if (dashes != '')
    i1518.dashPattern = u2694(dashes); }
function p1582(nodeId, px, py) { figma.getLocalPaintStylesAsync().then(_styles => { const styles = new Array(); for (const i168 of _styles) {
    const _nodeId = i168.getPluginData('nodeId');
    const _existing = i168.getPluginData('existing');
    const existing = !!_existing;
    const style = { id: i168.id, nodeId: _nodeId, name: i168.name, existing: existing, paints: new Array() };
    let onlyPaint = true;
    for (const l2774 of i168.paints) {
        if (l2774.type == 'SOLID') {
            style.paints.push([l2774.color.r, l2774.color.g, l2774.color.b, l2774.opacity]);
        }
        else {
            onlyPaint = false;
            break;
        }
    }
    if (onlyPaint)
        styles.push(style);
} a1531({ cmd: 'uiReturnFigGetAllLocalColorStyles', nodeId: nodeId, px: px, py: py, styles: JSON.stringify(styles) }); }); }
function d1583(nodeId, styleId) { figma.getLocalPaintStylesAsync().then(l1585 => { if (styleId != NULL)
    q1584(l1585, nodeId, styleId);
else
    r1586(l1585, nodeId); }); }
function q1584(l1585, nodeId, styleId, clearExisting = true) { const s2773 = r2719.find(a => a.nodeId == nodeId); if (s2773 && clearExisting)
    r1586(l1585, nodeId); const r1590 = l1585.find(s => s.id == styleId); x955(!!r1590, 'figStyle should be found here'); r1590.setPluginData('type', y1219); r1590.setPluginData('nodeId', nodeId); r1590.setPluginData('existing', w940(true)); r2719.push({ nodeId: nodeId, existing: true, styles: [r1590] }); return r1590; }
function r1586(l1585, nodeId) { const r1590 = l1585.find(s => s.getPluginData('nodeId') == nodeId); x955(!!r1590, 'figStyle should be found here'); if (r1590) {
    r1590.setPluginData('type', NULL);
    r1590.setPluginData('nodeId', NULL);
    r1590.setPluginData('existing', NULL);
    m948(r2719, a => a.nodeId == nodeId);
} return r1590; }
function v1587(styles, y1591) { const r1590 = figma.createPaintStyle(); r1590.setPluginData('type', y1591[d1386]); r1590.setPluginData('nodeId', y1591[t1387]); r1590.name = y1591[p1391]; setStylePaints(r1590, y1591); styles.push(r1590); a1531({ cmd: 'uiSetStyleId', nodeId: y1591[t1387], styleId: r1590.id }); return r1590; }
function g1588(msg) { let x2751 = NULL; let s2773; for (const y1591 of msg.styles) {
    if (y1591[t1387] != x2751) {
        x2751 = y1591[t1387];
        s2773 = r2719.find(a => a.nodeId == y1591[t1387]);
        if (!s2773) {
            s2773 = { nodeId: y1591[t1387], styles: [] };
            r2719.push(s2773);
        }
    }
    else
        s2773 = null;
    const r1590 = s2773.styles[0];
    figma.getLocalPaintStylesAsync().then(l1585 => { const localStyle = l1585.find(s => s.getPluginData('nodeId') == y1591[t1387]); if (isValid(r1590) && !isValid(localStyle)) {
        f941(s2773.styles, r1590);
    } const existing = isValid(r1590) && isValid(localStyle) && r1590.getPluginData('existing'); if (!isValid(r1590) || !isValid(localStyle)) {
        if (!existing) {
            v1521 = true;
            d1583(y1591[t1387], y1591[r1389]);
        }
    }
    else if (isValid(r1590) && r1590.getPluginData('type') == y1591[d1386]) {
        v1521 = true;
        s1589(localStyle, y1591);
    } });
} }
function s1589(r1590, y1591) { setStylePaints(r1590, y1591); r1590.name = y1591[p1391]; }
function getStylePaints(stylePaints) { const paints = new Array(); for (const l2774 of stylePaints) {
    const fill = l2774[1].split(' ');
    switch (l2774[0]) {
        case 'SOLID':
            paints.push({ type: 'SOLID', color: { r: Math.min(Math.max(0, parseFloat(fill[0]) / 0xff), 1), g: Math.min(Math.max(0, parseFloat(fill[1]) / 0xff), 1), b: Math.min(Math.max(0, parseFloat(fill[2]) / 0xff), 1) }, opacity: Math.min(Math.max(0, parseFloat(fill[3]) / 100), 1) });
            break;
    }
} return paints; }
function setStylePaints(r1590, y1591) { if (!isEmpty(y1591[a1393]))
    r1590.paints = getStylePaints(y1591[a1393]);
else
    r1590.paints = []; }
function d1605(nodeId, px, py) {
    return __awaiter(this, void 0, void 0, function* () { figma.variables.getLocalVariablesAsync().then((n2775) => __awaiter(this, void 0, void 0, function* () { const variables = new Array(); for (const _var of n2775) {
        const collection = yield figma.variables.getVariableCollectionByIdAsync(_var.variableCollectionId);
        const variable = { id: _var.id, resolvedType: _var.resolvedType, name: _var.name, collectionName: collection.name };
        variables.push(variable);
    } figma.variables.getLocalVariableCollectionsAsync().then((collections) => __awaiter(this, void 0, void 0, function* () { a1531({ cmd: 'uiReturnFigGetAllLocalVariables', nodeId: nodeId, px: px, py: py, variables: JSON.stringify(variables), nCollections: collections.length }); })); })); });
}
function r1606(varIds) {
    return __awaiter(this, void 0, void 0, function* () { const n2775 = yield figma.variables.getLocalVariablesAsync(); const variables = varIds.map(id => n2775.find(v => v.id == id)); let values = []; for (let i = 0; i < varIds.length; i++) {
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
function m1607(nodeId, varId) { figma.variables.getLocalVariablesAsync().then(n2775 => { figLinkVariableAsync(n2775, nodeId, varId); }); }
function figUpdateVariableAsync(varId, value) {
    return __awaiter(this, void 0, void 0, function* () { figma.variables.getLocalVariablesAsync().then((n2775) => __awaiter(this, void 0, void 0, function* () { let variable = n2775.find(v => v.id == varId); if (!variable)
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
function figLinkVariableAsync(n2775, nodeId, varId) {
    return __awaiter(this, void 0, void 0, function* () { let variable = n2775.find(v => v.id == varId); if (!variable)
        return null; const [resolvedVar, values] = yield figGetResolvedVariableValuesAsync(variable); a1531({ cmd: 'uiReturnFigLinkNodeToVariable', nodeId: nodeId, variableId: resolvedVar ? resolvedVar.id : NULL, variableName: resolvedVar ? resolvedVar.name : '', resolvedType: resolvedVar ? resolvedVar.resolvedType : NULL, values: values }); return resolvedVar; });
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
function t1592(tl, tr, bl) { let vr = point(tr.x - tl.x, tr.y - tl.y); let vb = point(bl.x - tl.x, bl.y - tl.y); let sx = vr.x; let sy = vb.y; let kx = -vr.y; let ky = -vb.x; let dx = -tl.x; let dy = -tl.y; const _sx = kx / nozero(sx); const _sy = ky / nozero(sy); let p4194 = d888([[1, _sy, 0], [_sx, 1, 0], [0, 0, 1]], v892(dx, dy)); p4194 = o890(p4194); const a = x882(vr); if (a > Tau / 4 && a < Tau * 3 / 4)
    p4194 = d888(p4194, v892(0, 0, 1, 1, Tau / 2)); if (determinant(p4194) < 0)
    p4194 = d888(p4194, v892(0, 0, -1, 1, 0)); return p4194; }
function p1593(i1518, tl, tr, bl) { const p4194 = t1592(tl, tr, bl); i1518.relativeTransform = [p4194[0], p4194[1]]; }
function l1594(i1518, r1517, setSize = true, noHeight = 0.01) { if (!r1517[w1395] || !r1517[p1396] || !r1517[g1397])
    return; const xp0 = r1517[w1395]; const xp1 = r1517[p1396]; const xp2 = r1517[g1397]; p1593(i1518, xp0, xp1, xp2); if (setSize) {
    const d893 = distv(xp0, xp1);
    const y894 = distv(xp0, xp2);
    const height = r1517[d1386] == v1246 ? r1517[s1430] : r1517[o1417];
    if (!i1518.removed) {
        i1518.resizeWithoutConstraints(Math.max(0.01, d893), height ? Math.max(0.01, y894) : noHeight);
    }
} }
function e1595(c2688, l2689) { if (c2688.removed)
    return; c2688.resizeWithoutConstraints(0.01, 0.01); c2688.setPluginData('actualX', l2689[v1413].toString()); c2688.setPluginData('actualY', l2689[r1415].toString()); c2688.x = l2689[v1413]; c2688.y = l2689[r1415]; c2688.rotation = l2689[s1409] ? 45 : 0; }
function z1596(c2688) { if (!c2688.removed)
    c2688.resizeWithoutConstraints(0.01, 0.01); }
function x2766(genBool) { return true; }
function z2737(genBool, addProps, transform) {
    return __awaiter(this, void 0, void 0, function* () { let objects = []; for (const z111 of genBool[FO_BOOLEAN_CHILDREN])
        yield w1533(z111, o => objects = [...objects, o], false); yield figma.currentPage.loadAsync(); let figBool = null; if (!isEmpty(objects)) {
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
        g2743(figBool, genBool, addProps, transform);
    } return figBool; });
}
function g2743(figBool, genBool, addProps, transform) {
    return __awaiter(this, void 0, void 0, function* () { if (genBool[FO_BOOLEAN_CHILDREN].length == 0) {
        figBool.remove();
        return;
    } yield u2720(figBool, genBool[FO_BOOLEAN_CHILDREN], genBool[FO_BOOLEAN_CHILDREN].length, -1, [], false, false, false, false, true); const hasProps = genBool[w1399].length > 0 || genBool[k1400].length > 0 || genBool[m1407].length > 0; b2690(figBool, genBool, !hasProps && addProps); });
}
function f2763(j2754) { return j2754[v1413] != null && !isNaN(j2754[v1413]) && j2754[r1415] != null && !isNaN(j2754[r1415]) && j2754[n1416] != null && !isNaN(j2754[n1416]) && j2754[o1417] != null && !isNaN(j2754[o1417]) && j2754[v1419] != null && !isNaN(j2754[v1419]) && j2754[z1426] != null && !isNaN(j2754[z1426]) && j2754[l1432] != null && !isNaN(j2754[l1432]) && j2754[e1436] != null && !isNaN(j2754[e1436]); }
function r2776(j2754, addProps, transform) { if (!f2763(j2754))
    return null; const a2755 = figma.createEllipse(); s2777(a2755, j2754, addProps, transform, true); return a2755; }
function s2777(a2755, j2754, addProps, transform, isValid = false) { if (!isValid && !f2763(j2754))
    return; b2778(a2755, j2754, transform); if (h2753.includes(a2755))
    b2685(a2755);
else
    b2690(a2755, j2754, addProps); }
function b2778(a2755, j2754, transform) { a2755.cornerRadius = j2754[v1419]; const start = j2754[z1426] / 360 * (Math.PI * 2); const sweep = j2754[l1432] / 100 * (Math.PI * 2); a2755.arcData = { startingAngle: start, endingAngle: start + sweep, innerRadius: Math.min(Math.max(0, j2754[e1436] / 100), 1) }; if (transform)
    l1594(a2755, j2754); }
function c2768(o2756) { return o2756[v1413] != null && !isNaN(o2756[v1413]) && o2756[r1415] != null && !isNaN(o2756[r1415]) && o2756[n1416] != null && !isNaN(o2756[n1416]) && o2756[o1417] != null && !isNaN(o2756[o1417]) && o2756[i1425] != null && !isNaN(o2756[i1425]); }
function l2739(o2756, addProps, transform) {
    return __awaiter(this, void 0, void 0, function* () { if (!c2768(o2756))
        return null; const s2757 = figma.createFrame(); s2757.expanded = false; if (s2757) {
        j2779(s2757, o2756, addProps, transform);
        let objects = [];
        for (const z111 of o2756[a1431])
            yield w1533(z111, o => objects = [...objects, o]);
        for (const z111 of objects)
            s2757.appendChild(z111);
    } return s2757; });
}
function q2745(s2757, o2756, addProps, transform) { j2779(s2757, o2756, addProps, transform); u2720(s2757, o2756[a1431], o2756[a1431].length); }
function j2779(s2757, o2756, addProps, transform) { s2757.cornerRadius = o2756[i1425]; if (transform)
    l1594(s2757, o2756); b2690(s2757, o2756, addProps && o2756[a1431].length == 0); }
function q2767(d2758) { return true; }
function r2738(d2758) {
    return __awaiter(this, void 0, void 0, function* () { let objects = []; for (const z111 of d2758[a1414])
        yield w1533(z111, o => objects = [...objects, o]); yield figma.currentPage.loadAsync(); const c2759 = !isEmpty(objects) ? figma.group(objects, figma.currentPage) : null; if (c2759) {
        c2759.expanded = false;
        s2744(c2759, d2758);
    } return c2759; });
}
function s2744(c2759, d2758) { if (d2758[a1414].length == 0) {
    c2759.remove();
    return;
} u2720(c2759, d2758[a1414], d2758[a1414].length); y1544(c2759, d2758); }
function m2762(r2760) { return r2760[v1413] != null && !isNaN(r2760[v1413]) && r2760[r1415] != null && !isNaN(r2760[r1415]) && r2760[n1416] != null && !isNaN(r2760[n1416]); }
function u2780(r2760, addProps, transform) { if (!m2762(r2760))
    return null; const z2761 = figma.createLine(); f2781(z2761, r2760, addProps, transform, true); return z2761; }
function f2781(z2761, r2760, addProps, transform, isValid = false) { if (!isValid && !m2762(r2760))
    return; if (transform)
    l1594(z2761, r2760, true, 0); b2690(z2761, r2760, addProps); }
var h2753 = [];
function t4012(l2689) { return l2689[v1413] != null && !isNaN(l2689[v1413]) && l2689[r1415] != null && !isNaN(l2689[r1415]); }
function o2683(l2689) { const c2688 = l2689[s1409] ? figma.createRectangle() : figma.createEllipse(); if (!t4012(l2689))
    return c2688; if (h2753.includes(c2688))
    t2687(c2688, l2689);
else
    f2740(c2688, l2689); return c2688; }
function f2740(c2688, l2689) { e1595(c2688, l2689); q2686(c2688); }
function o2684() { a1531({ cmd: 'uiUpdateZoom', zoom: figma.viewport.zoom }); for (const point of h2753)
    b2685(point); }
function b2685(c2688) { z1596(c2688); q2686(c2688); }
function t2687(c2688, l2689) { e1595(c2688, l2689); q2686(c2688); }
function q2686(c2688) { if (c2688.removed)
    return; figma.currentPage.loadAsync().then(() => { const isCenter = c926(c2688.getPluginData('isCenter')); const n2695 = figma.currentPage.selection.includes(c2688); const color = isCenter ? [0xf2, 0x48, 0x22] : n2695 ? [12, 140, 233] : [255, 255, 255]; const border = isCenter ? [255, 255, 255] : n2695 ? [255, 255, 255] : [12, 140, 233]; c2688.fills = a959([['SOLID', color[0], color[1], color[2], 100]]); const effects = []; effects.push(...l1539([['DROP_SHADOW', border[0] / 255, border[1] / 255, border[2] / 255, 1, 0, 0, 0, (isCenter ? 3 : n2695 ? 5 : 3.6) / w2696, 'NORMAL', true, true]], true)); effects.push(...l1539([['DROP_SHADOW', color[0] / 255, color[1] / 255, color[2] / 255, 1, 0, 0, 0, (n2695 ? 4 : 2.4) / w2696, 'NORMAL', true, true]], true)); c2688.effects = effects; }); }
function g4013(genPoly) { return genPoly[v1413] != null && !isNaN(genPoly[v1413]) && genPoly[r1415] != null && !isNaN(genPoly[r1415]) && genPoly[n1416] != null && !isNaN(genPoly[n1416]) && genPoly[o1417] != null && !isNaN(genPoly[o1417]) && genPoly[k1422] != null && !isNaN(genPoly[k1422]) && genPoly[e1428] != null && !isNaN(genPoly[e1428]); }
function q2697(genPoly, addProps, transform) { if (!g4013(genPoly))
    return null; const figPoly = figma.createPolygon(); y2698(figPoly, genPoly, addProps, transform, true); return figPoly; }
function y2698(figPoly, genPoly, addProps, transform, isValid = false) { if (!isValid && !g4013(genPoly))
    return; figPoly.cornerRadius = genPoly[k1422]; figPoly.pointCount = Math.max(3, genPoly[e1428]); if (transform)
    l1594(figPoly, genPoly); b2690(figPoly, genPoly, addProps); }
function b2700(d2699) { return d2699[v1413] != null && !isNaN(d2699[v1413]) && d2699[r1415] != null && !isNaN(d2699[r1415]) && d2699[n1416] != null && !isNaN(d2699[n1416]) && d2699[o1417] != null && !isNaN(d2699[o1417]) && d2699[g1418] != null && !isNaN(d2699[g1418]); }
function n2701(d2699, addProps, transform) { if (!b2700(d2699))
    return null; const figRect = figma.createRectangle(); m2702(figRect, d2699, addProps, transform, true); return figRect; }
function m2702(figRect, d2699, addProps, transform, isValid = false) { if (!isValid && !b2700(d2699))
    return; const foundCorners = d2699[m1407].findIndex(e => e[0] == 'ROUND_CORNERS'); if (foundCorners > -1) {
    const corners = d2699[m1407][foundCorners];
    figRect.topLeftRadius = corners[1];
    figRect.topRightRadius = corners[2];
    figRect.bottomLeftRadius = corners[3];
    figRect.bottomRightRadius = corners[4];
}
else
    figRect.cornerRadius = d2699[g1418]; if (transform)
    l1594(figRect, d2699); b2690(figRect, d2699, addProps); const foundSides = d2699[m1407].findIndex(e => e[0] == 'STROKE_SIDES'); if (foundSides > -1) {
    const sides = d2699[m1407][foundSides];
    figRect.strokeWeight = 0;
    figRect.strokeTopWeight = sides[1];
    figRect.strokeLeftWeight = sides[2];
    figRect.strokeRightWeight = sides[3];
    figRect.strokeBottomWeight = sides[4];
} }
function d2703(n2713) { return n2713[v1413] != null && !isNaN(n2713[v1413]) && n2713[r1415] != null && !isNaN(n2713[r1415]) && n2713[n1416] != null && !isNaN(n2713[n1416]) && n2713[o1417] != null && !isNaN(n2713[o1417]) && n2713[c1423] != null && !isNaN(n2713[c1423]) && n2713[s1429] != null && !isNaN(n2713[s1429]) && n2713[a1434] != null && !isNaN(n2713[a1434]); }
function w2704(n2713, addProps, transform) { if (!d2703(n2713))
    return null; const p2714 = figma.createStar(); c2705(p2714, n2713, addProps, transform, true); return p2714; }
function c2705(p2714, n2713, addProps, transform, isValid = false) { if (!isValid && !d2703(n2713))
    return; p2714.cornerRadius = n2713[c1423]; p2714.pointCount = n2713[s1429]; p2714.innerRadius = Math.min(Math.max(0, n2713[a1434] / 100), 1); if (transform)
    l1594(p2714, n2713); b2690(p2714, n2713, addProps); }
const r4256 = [];
function v2706(t2710) { return t2710[j1435] != null && t2710[v1413] != null && !isNaN(t2710[v1413]) && t2710[r1415] != null && !isNaN(t2710[r1415]) && t2710[n1416] != null && !isNaN(t2710[n1416]) && t2710[o1417] != null && !isNaN(t2710[o1417]) && t2710[d1437] != null && t2710[d1437] != NULL && t2710[j1438] != null && !isNaN(t2710[j1438]); }
function k2707(t2710, addProps, transform) { if (!v2706(t2710))
    return null; const a2782 = figma.createText(); j2708(a2782, t2710, addProps, transform, true); return a2782; }
function j2708(a2782, t2710, addProps, transform, isValid = false) { if (!isValid && !v2706(t2710))
    return null; const fontName = { family: t2710[d1437], style: t2710[j1439] }; try {
    if (!r4256.includes(fontName)) {
        figma.loadFontAsync(fontName).then(() => { r4256.push(fontName); w2709(a2782, t2710, fontName, addProps, transform); });
    }
    else {
        w2709(a2782, t2710, fontName, addProps, transform);
    }
}
catch (e) {
    g956(e);
} }
function w2709(a2782, t2710, fontName, addProps, transform) { a2782.fontName = fontName; a2782.fontSize = Math.max(1, t2710[j1438]); a2782.characters = t2710[j1435]; a2782.lineHeight = { unit: 'PERCENT', value: t2710[j1442] }; a2782.letterSpacing = { unit: 'PERCENT', value: t2710[p1443] }; if (t2710[q1440] == 0)
    a2782.textAlignHorizontal = 'LEFT';
else if (t2710[q1440] == 1)
    a2782.textAlignHorizontal = 'CENTER';
else if (t2710[q1440] == 2)
    a2782.textAlignHorizontal = 'RIGHT';
else if (t2710[q1440] == 3)
    a2782.textAlignHorizontal = 'JUSTIFIED'; if (t2710[q1441] == 0)
    a2782.textAlignVertical = 'TOP';
else if (t2710[q1441] == 1)
    a2782.textAlignVertical = 'CENTER';
else if (t2710[q1441] == 2)
    a2782.textAlignVertical = 'BOTTOM'; if (transform)
    l1594(a2782, t2710); b2690(a2782, t2710, addProps); if (t2710[n1424] == 0 && t2710[s1430] == 0)
    a2782.textAutoResize = 'WIDTH_AND_HEIGHT';
else if (t2710[n1424] == 0)
    a2782.textAutoResize = 'HEIGHT';
else
    a2782.textAutoResize = 'NONE'; }
function b2765(a2715) { return true; }
function w2736(a2715, addProps, transform) { if (!b2765(a2715))
    return null; const p2716 = figma.createVector(); k2742(p2716, a2715, addProps, transform, true); return p2716; }
function k2742(p2716, a2715, addProps, transform, isValid = false) { if (!isValid && !b2765(a2715))
    return; p2716.setVectorNetworkAsync(a2715[b1420]); if (transform)
    l1594(p2716, a2715, false); b2690(p2716, a2715, addProps); }
function c2764(k2711) { return k2711[t1427] != null && !isNaN(k2711[t1427]) && k2711[h1433] != null && !isNaN(k2711[h1433]); }
function x2735(k2711, addProps, transform) { const k2712 = figma.createVector(); g2741(k2712, k2711, addProps, transform, true); return k2712; }
function g2741(k2712, k2711, addProps, transform, isValid = false) { if (!isValid && !c2764(k2711))
    return; k2712.vectorPaths = [{ windingRule: k2711[t1427] == 1 ? 'NONZERO' : 'EVENODD', data: k2711[a1421] }]; k2712.cornerRadius = k2711[h1433]; if (transform)
    l1594(k2712, k2711, false); b2690(k2712, k2711, addProps); }
