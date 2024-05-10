var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function j1052(key, tag) { return key.substring(0, tag.length + 1) == tag + ' '; }
function e1053(key, tag) { return key.substring(tag.length + 1); }
function w1054(key) { return j1052(key, q876); }
function v1055(key) { return j1052(key, x874); }
function c1056(key) { return j1052(key, o875); }
function m1057(key) { return e1053(key, q876); }
function u1058(key) { return e1053(key, x874); }
function g1059(key) { return e1053(key, o875); }
const generatorVersion = 416;
const w868 = 2147483647;
const NULL = '';
const k869 = '  ';
const u870 = '    ';
const r871 = '\n';
const j872 = '◦ G •';
const f873 = j872 + ' ';
const x874 = 'G_NODE';
const o875 = 'G_CONN';
const q876 = 'G_PAGE';
const f877 = 'G_TEMP';
const minWindowWidth = 602;
const minWindowHeight = 39;
const identity = Object.freeze([[1, 0, 0], [0, 1, 0], [0, 0, 1]]);
const Epsilon = 0.0000001;
const Tau = Math.PI * 2;
var enableAsserts = false;
function g878(x, eps = 0.000000001) { return Math.abs(x) < eps ? 0 : x; }
function nozero(x, eps = 0.000000001) { return x != 0 ? x : (x < 0 ? -eps : eps); }
function h879(v, eps = 0.000000001) { return point(nozero(v.x, eps), nozero(v.y, eps)); }
function equal(a, b, eps = 0.000000001) { return Math.abs(b - a) < eps; }
function sqr(x) { return x * x; }
;
function cube(x) { return x * x * x; }
;
function q880(f) { return Math.floor(f) | 0; }
function i881(x) { x = q880(x); x--; x |= x >> 1; x |= x >> 2; x |= x >> 4; x |= x >> 8; x |= x >> 16; x |= x >> 32; return ++x; }
function gcd(a, b) { let temp; while (1) {
    temp = a % b;
    if (temp == 0)
        return b;
    a = b;
    b = temp;
} }
function distv(p1, p2) { const dx = p2.x - p1.x; const dy = p2.y - p1.y; return Math.sqrt(dx * dx + dy * dy); }
function t882(v) { let angle = Math.atan2(v.y, v.x); if (angle < 0)
    angle += Tau; return angle; }
function anglev2(v1, v2) { return anglev2_(v1.x, v1.y, v2.x, v2.y); }
function anglev2_(x1, y1, x2, y2) { const dx = x2 - x1; const dy = y2 - y1; let angle = Math.atan2(dy, dx); if (angle < 0)
    angle += Tau; return angle; }
function e884(v) { return Math.sqrt(v.x * v.x + v.y * v.y); }
function lengthv_(x, y) { return Math.sqrt(x * x + y * y); }
function u885(v) { return point(v.x == 0 ? 0 : v.x / e884(v), v.y == 0 ? 0 : v.y / e884(v)); }
function dotv(v1, v2) { return v1.x * v2.x + v1.y * v2.y; }
function r886(a1, a2) { let diff = a2 - a1; while (diff <= -Tau / 2)
    diff += Tau; while (diff > Tau / 2)
    diff -= Tau; return diff; }
function g887(v, m) { let v3 = [v.x, v.y, 1]; let r = h951(v3, m); return point(r[0], r[1]); }
function p888(...mm) { u955(mm.length > 0, 'mulm3m3() must take at least one argument'); let result = clone(mm[0]); for (let a = 1; a < mm.length; a++) {
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
function w889(m, s) { for (let i = 0; i < 3; i++)
    for (let j = 0; j < 3; j++)
        m[i][j] /= s; return m; }
function adjugate(m) { return cofactor(transpose(m)); }
function transpose(m) { return [[m[0][0], m[1][0], m[2][0]], [m[0][1], m[1][1], m[2][1]], [m[0][2], m[1][2], m[2][2]]]; }
function cofactor(m) { return [[m[1][1] * m[2][2] - m[2][1] * m[1][2], -(m[1][0] * m[2][2] - m[2][0] * m[1][2]), m[1][0] * m[2][1] - m[2][0] * m[1][1]], [-(m[0][1] * m[2][2] - m[2][1] * m[0][2]), m[0][0] * m[2][2] - m[2][0] * m[0][2], -(m[0][0] * m[2][1] - m[2][0] * m[0][1])], [m[0][1] * m[1][2] - m[1][1] * m[0][2], -(m[0][0] * m[1][2] - m[1][0] * m[0][2]), m[0][0] * m[1][1] - m[1][0] * m[0][1]]]; }
function determinant(m) { return m[0][0] * (m[1][1] * m[2][2] - m[1][2] * m[2][1]) - m[0][1] * (m[1][0] * m[2][2] - m[2][0] * m[1][2]) + m[0][2] * (m[1][0] * m[2][1] - m[2][0] * m[1][1]); }
function u890(m) { return w889(adjugate(m), determinant(m)); }
function k891(angle) { const cosA = g878(Math.cos(angle)); const sinA = g878(Math.sin(angle)); return [[cosA, sinA, 0], [-sinA, cosA, 0], [0, 0, 1]]; }
function j892(x = 0, y = 0, b893 = 1, y894 = 1, angle = 0, u895 = 0, t896 = 0) { const cosA = Math.cos(angle); const sinA = Math.sin(angle); return [[b893 * cosA - t896 * sinA, -u895 * cosA + y894 * sinA, x], [t896 * cosA + b893 * sinA, y894 * cosA + u895 * sinA, y], [0, 0, 1]]; }
function x897(v1, v2) { return v1.x * v2.y - v1.y * v2.x; }
function n898(v1, v2) { return point(v1.x + v2.x, v1.y + v2.y); }
function sqrv(v) { return p899(v, v); }
function p899(v1, v2) { return point(v1.x * v2.x, v1.y * v2.y); }
function g900(v, s) { return point(v.x * s, v.y * s); }
function m901(v1, v2) { return point(v1.x / v2.x, v1.y / v2.y); }
function g902(v, s) { return point(v.x / s, v.y / s); }
function u903(v1, v2) { return point(v1.x - v2.x, v1.y - v2.y); }
function z904(str) { return decodeURI(encodeURIComponent(str)); }
function s905(str) { return decodeURIComponent(encodeURI(str)); }
function e906(bytes) { let str = ''; for (let i = 0; i < bytes.length; i++)
    str += String.fromCharCode(bytes[i]); return str; }
function t907(str) { return Array.from(s905(str), c => c.charCodeAt(0)); }
function r908(array, size) { const newArray = new Uint8Array(size); f909(array, newArray); return newArray; }
function f909(src, dst) { o910(src, 0, src.length, dst, 0, dst.length); }
function o910(src, z911, t912, dst, b913, k914) { const size = Math.min(t912, k914); for (let i = 0; i < size; i++)
    dst[b913 + i] = src[z911 + i]; }
function p915(q916, l917) { if (q916.length != l917.length)
    return false; for (let i = 0; i < q916.length; i++) {
    if (q916[i] != l917[i])
        return false;
} return true; }
function k918(i919, q920) { return i919.findIndex(i => q920.includes(i)) > -1; }
function m921(list) { return list ? '<==' : '<--'; }
;
function z922(list) { return list ? '==>' : '-->'; }
;
function z923(nodeId) { return x874 + ' ' + nodeId; }
function p924(name) { return o875 + ' ' + name; }
function j925(name) { return q876 + ' ' + name; }
function h926(str) { return str.toLowerCase() == 'true' || str == '1'; }
function i927(g928, c929 = false) { return a934(g928.outputNodeId, g928.outputId, g928.outputOrder, g928.inputNodeId, g928.inputId, g928.list, c929); }
function v930(outputNodeId, outputId, outputOrder, inputNodeId, inputId) { return p924(outputNodeId + ' ' + outputId + ' ' + outputOrder + ' ' + inputNodeId + ' ' + inputId); }
function s931(t243) { return v930(t243.outputNodeId, t243.outputId, t243.outputOrder, t243.inputNodeId, t243.inputId); }
function s932(t243) { return v930(t243.output.node.id, t243.output.id, t243.outputOrder, t243.input.node.id, t243.input.id); }
function q933(t243, c929 = false) { return a934(t243.output.node.id, t243.output.id, t243.outputOrder, t243.input.node.id, t243.input.id, t243.list, c929); }
function a934(outputNodeId, outputId, outputOrder, inputNodeId, inputId, list, c929 = false) { const sp = c929 ? ' ' : '  '; const jsp = c929 ? '' : ' '; const arrow = sp + w938(typeof outputOrder == 'string' ? parseInt(outputOrder) : outputOrder) + z922(typeof list == 'string' ? h926(list) : list) + sp; const join = jsp + '.' + jsp; return outputNodeId + join + outputId + arrow + inputNodeId + join + inputId; }
function d935(pageId) { return j925(pageId); }
function c936(num) { const str = num.toString(); let sup = ''; for (const c of str)
    sup += y937(c); return sup; }
function y937(c) { switch (c) {
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
function w938(num) { const str = num.toString(); let sup = ''; for (const c of str)
    sup += m939(c); return sup; }
function m939(c) { switch (c) {
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
function q940(bool) { return bool ? 'true' : 'false'; }
function isValid(val) { return val != undefined && val != null; }
function isEmpty(array) { return array.length == 0; }
function x941(array, item) { p942(array, array.indexOf(item)); }
function p942(array, index) { if (index > -1 && index < array.length)
    array.splice(index, 1); }
function j943(array) { if (isEmpty(array))
    return null; let last = array.at(-1); array.splice(array.length - 1, 1); return last; }
function h944(array) { return array[array.length - 1]; }
function v945(array, from, to) { const item = array[from]; array.splice(from, 1); array.splice(to, 0, item); }
function r946(array, item) { const index = array.indexOf(item); if (index > -1)
    array.splice(index, 1); }
function i947(x2782, array) { for (const item of array) {
    const index = x2782.indexOf(item);
    if (index > -1)
        x2782.splice(index, 1);
} }
function r948(array, where) { const index = array.findIndex(where); if (index > -1)
    array.splice(index, 1); }
function j949(styleId) { return styleId.split(',')[0] + ','; }
function e950(points) { let z4017 = ''; if (points.length < 2)
    return z4017; z4017 += 'M'; z4017 += ' ' + g878(points[0].x); z4017 += ' ' + g878(points[0].y); for (let i = 1; i < points.length; i++) {
    z4017 += ' L' + ' ' + g878(points[i].x) + ' ' + g878(points[i].y);
} return z4017; }
function point(x, y) { return { x: x, y: y }; }
function h951(v, m) { let r = [0, 0, 0]; for (let i = 0; i < 3; i++)
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
        let r111 = {};
        for (const key in val)
            r111[key] = clone(val[key]);
        return r111;
    }
} throw 'unknown'; }
function m952(array, item, equal = null) { if (equal) {
    if (Array.isArray(item))
        item.forEach(i => m952(array, i, equal));
    else if (!array.find(i => equal(i, item)))
        array.push(item);
}
else {
    if (Array.isArray(item))
        item.forEach(i => m952(array, i));
    else if (!array.includes(item))
        array.push(item);
} }
function e953(array, item, equal) { if (Array.isArray(item))
    item.forEach(i => e953(array, i, equal));
else if (!array.find(equal))
    array.push(item); }
function y954(array, item, except) { if (Array.isArray(item))
    item.forEach(i => y954(array, i, except));
else if (!array.find(except))
    array.push(item); }
function u955(...args) { if (enableAsserts) {
    console.assert(...args);
} }
function m956(...args) { if (enableAsserts)
    console.error(...args); }
function g957(str, trim) { while (str.length >= trim.length && str.substring(0, trim.length) == trim)
    str = str.substring(trim.length); return str; }
function f958(str, trim) { while (str.length >= trim.length && str.substring(str.length - trim.length) == trim)
    str = str.substring(0, str.length - trim.length); return str; }
function p959(q4077) { const fills = []; for (const fill of q4077) {
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
            const f4192 = [[0, 1, 0], [0.5, 0.5, 1], [1, 1, 1]];
            let i4193 = [[p0.x, p1.x, p2.x], [p0.y, p1.y, p2.y], [1, 1, 1]];
            i4193 = p888(f4192, u890(i4193));
            i4193 = [i4193[0], i4193[1]];
            const stops = [];
            for (const stop of fill[2]) {
                stops.push({ color: { r: Math.min(Math.max(0, stop[0]), 1), g: Math.min(Math.max(0, stop[1]), 1), b: Math.min(Math.max(0, stop[2]), 1), a: Math.min(Math.max(0, stop[3]), 1) }, position: stop[4] });
            }
            fills.push({ type: fill[0], gradientTransform: i4193, gradientStops: stops, blendMode: fill[3] });
            break;
        }
    }
} return fills; }
function l960(type) { return u1093.includes(type); }
const p1060 = 'LIST#';
const i1061 = 'NLIST#';
const q1062 = 'TLIST#';
const p1063 = 'SLIST#';
const x1064 = 'NULL';
const a1065 = 'VAR';
const f1066 = 'VARGRP';
const g1067 = 'FEEDBK';
const h1068 = 'REPT';
const r1069 = 'CACHE';
const u1070 = 'FRZ';
const x1071 = 'TIMER';
const p1072 = 'VNAME';
const GET_LIST_VALUE_NAMES = 'GVNAMES';
const LIST_VALUE_NAMES = 'VNAMES';
const OBJECT_NAME = 'ONAME';
const g1073 = 'CMB';
const y1074 = 'LSASIT';
const w1075 = 'EXTR';
const s1076 = 'SETP';
const z1077 = 'GETP';
const m1078 = 'SUBLST';
const v1079 = 'UNIQ';
const REORDER_LIST = 'RORD';
const SHIFT_LIST = 'SHFTLST';
const i1080 = 'REVLST';
const BUCKLE_LIST = 'BUKLST';
const q1081 = 'SORT';
const z1082 = 'CLMN';
const i1083 = 'CELL';
const h1084 = 'LIST';
const n1085 = 'COUNT';
const OBJECT_COUNT = 'OBJCOUNT';
const n1086 = 'LCONT';
const m1087 = 'SELECT';
const SELECT_FROM_LIST = 'LSTSEL';
const k1088 = 'IF';
const j1089 = 'LSTFLT';
const f1091 = 'ANY#';
const l1092 = [p1060, i1061, q1062, p1063, g1073, w1075, s1076, z1077, m1078, h1084, n1085, n1086, h1068];
const u1093 = [p1060, i1061, q1062, p1063];
const c1090 = 'ITER';
const z1112 = 'PROB';
const HOLD = 'HOLD';
const p1095 = 'NUM#';
const b1096 = 'NUM';
const NUMBER_PRECISION = 'NPREC';
const l1097 = 'NSIGN';
const p1098 = 'ABS';
const NUMBER_NEGATIVE = 'NEG';
const i1099 = 'ROUND';
const NUMBER_QUANTIZE = 'QUANT';
const o1100 = 'SMINMAX';
const a1101 = 'MINMAX';
const z1102 = 'LIM';
const s1103 = 'NCURVE';
const NUMBER_MAP = 'NMAP';
const NUMBER_BIAS = 'NBIAS';
const v1104 = 'NANISNUM';
const s1105 = 'CONST';
const f1106 = 'DATE';
const c1107 = 'SEQ';
const f1108 = 'RANGE';
const z1109 = 'WAVE';
const c1110 = 'RAND';
const d1111 = 'NOISE';
const z1113 = 'ACCUM';
const x1114 = 'LERP';
const y1115 = 'SOLVE';
const i1116 = 'NANIM';
const i1117 = 'SMATH';
const h1118 = 'MATH';
const j1119 = 'ADD';
const m1120 = 'SUB';
const t1121 = 'MUL';
const w1122 = 'DIV';
const y1123 = 'MOD';
const p1124 = 'EXP';
const o1125 = 'NBOOL';
const l1126 = 'NOT';
const v1127 = 'AND';
const l1128 = 'OR';
const j1129 = 'XOR';
const u1130 = 'COND';
const h1131 = 'EQ';
const k1132 = 'NE';
const d1133 = 'LT';
const g1134 = 'LE';
const h1135 = 'GT';
const r1136 = 'GE';
const h1137 = 'TRIG';
const m1138 = 'SIN';
const p1139 = 'COS';
const i1140 = 'TAN';
const k1141 = 'ATAN2';
const g1142 = 'CNVANG';
const v1094 = [x1064, a1065, f1066, ...l1092, y1074, w1075, s1076, z1077, m1078, v1079, REORDER_LIST, SHIFT_LIST, i1080, BUCKLE_LIST, z1082, q1081, i1083, h1084, m1087, SELECT_FROM_LIST, k1088, j1089, g1067, h1068, c1090, z1112, HOLD, r1069, u1070, x1071, p1072, GET_LIST_VALUE_NAMES, LIST_VALUE_NAMES, OBJECT_NAME];
const l1143 = [h1118, i1117, j1119, m1120, t1121, w1122, y1123, p1124];
const g1144 = [o1125, l1126, v1127, l1128, j1129];
const y1145 = [u1130, h1131, k1132, d1133, g1134, h1135, r1136];
const f1146 = [h1137, m1138, p1139, i1140, k1141];
const m1147 = 'TEXT#';
const w1148 = 'TEXT';
const w1149 = 'TLEN';
const g1150 = 'TTRIM';
const t1151 = 'TSUB';
const d1152 = 'TCONT';
const f1153 = 'TCASE';
const w1154 = 'TREPL';
const v1155 = 'TJOIN';
const e1156 = 'TPAD';
const b1157 = 'TCMP';
const c1158 = 'TCHAR';
const g1159 = 'TUNI';
const g1160 = 'INDEX';
const j1161 = 'N2T';
const r1162 = 'C2T';
const w1163 = 'T2N';
const e1164 = 'T2C';
const v1165 = 'TSPLT';
const p3491 = 'TJSON';
const w1167 = 'TCSV';
const s1168 = 'FETCH';
const p1169 = 'TFILE';
const h1170 = [p1095, i1061, b1096, NUMBER_PRECISION, l1097, p1098, NUMBER_NEGATIVE, i1099, NUMBER_QUANTIZE, o1100, a1101, z1102, s1103, NUMBER_MAP, NUMBER_BIAS, v1104, s1105, f1106, c1107, f1108, z1109, c1110, d1111, z1113, x1114, y1115, i1116, j1161, c1158, ...l1143, ...g1144, ...y1145, ...f1146, g1142, BUCKLE_LIST];
const b1171 = [m1147, q1062, w1148, w1149, g1150, t1151, d1152, f1153, v1155, e1156, w1154, b1157, g1159, g1160, w1163, e1164, v1165, p3491, w1167, s1168, p1169];
const v1172 = 'COL#';
const s1173 = 'COL';
const b1174 = 'CVAL';
const b1175 = 'CCOR';
const m1176 = 'COLP3';
const k1177 = 'CCNT';
const r1178 = 'BLND';
const r1179 = 'CLERP';
const j1180 = 'CBLND';
const z1181 = [v1172, s1173, b1175, m1176, r1178, r1179, j1180, r1162];
const y1182 = 'FILL#';
const o1183 = 'FILL';
const d1184 = [y1182, o1183];
const b1185 = 'STRK#';
const d1186 = 'STRK';
const e1187 = [b1185, d1186];
const i1194 = 'STRKSD#';
const z1195 = 'STRKSD';
const t1196 = [i1194, z1195];
const h1188 = 'CSTOP#';
const l1189 = 'CSTOP';
const d1190 = [h1188, l1189];
const q1191 = 'GRAD#';
const e1192 = 'GRAD';
const g1193 = [q1191, e1192];
const k1197 = 'RCRN#';
const g1198 = 'RCRN';
const l1199 = [k1197, g1198];
const f1200 = 'DRSH#';
const j1201 = 'DRSH';
const t1202 = [f1200, j1201];
const h1203 = 'INSH#';
const p1204 = 'INSH';
const e1205 = [h1203, p1204];
const x1206 = 'LBLR#';
const l1207 = 'LBLR';
const d1208 = [x1206, l1207];
const u1209 = 'BBLR#';
const i1210 = 'BBLR';
const u1211 = [u1209, i1210];
const j1212 = 'MASK#';
const l1213 = 'MASK';
const x1214 = [j1212, l1213];
const h1215 = 'BLEND#';
const k1216 = 'BLEND';
const c1217 = [h1215, k1216];
const t1218 = [...t1196, ...l1199, ...t1202, ...e1205, ...d1208, ...u1211, ...c1217, ...x1214];
const d1219 = [v1172, y1182, q1191, b1185, i1194, f1200, h1203, x1206, u1209, h1215, j1212];
const r1220 = 'CSTL';
const o1221 = 'SHP#';
const o1222 = 'RECT#';
const h1223 = 'RECT';
const m1224 = [o1222, h1223];
const q1225 = 'LINE#';
const x1226 = 'LINE';
const p1227 = [q1225, x1226];
const j1228 = 'ELPS#';
const c1229 = 'ELPS';
const i1230 = [j1228, c1229];
const b1231 = 'TRPZ#';
const e1232 = 'TRPZ';
const g1233 = [b1231, e1232];
const d1240 = 'POLY#';
const s1241 = 'POLY';
const b1242 = [d1240, s1241];
const m1243 = 'STAR#';
const c1244 = 'STAR';
const i1245 = [m1243, c1244];
const g1246 = 'TXTS#';
const t1247 = 'TXTS';
const j1248 = [g1246, t1247];
const b1249 = 'PT#';
const o1250 = 'PT';
const r1251 = [b1249, o1250];
const r1252 = 'PCORN';
const d1253 = 'VPATH#';
const t1254 = 'VPATH';
const q1255 = [d1253, t1254];
const u1256 = 'VPT#';
const m1257 = 'VPT';
const v1258 = [u1256, m1257];
const y1259 = 'VEDGE#';
const h1260 = 'VEDGE';
const i1261 = [y1259, h1260];
const b1262 = 'VREG#';
const b1263 = 'VREG';
const m1264 = [b1262, b1263];
const h1265 = 'VNET#';
const q1266 = 'VNET';
const c1267 = [h1265, q1266];
const z1268 = 'SGRP#';
const x1269 = 'SGRP';
const b1270 = [z1268, x1269];
const t1271 = 'FRM#';
const c1272 = 'FRM';
const u1273 = [t1271, c1272];
const z1235 = 'ARC#';
const m1234 = 'ARC';
const f1236 = [z1235, m1234];
const z1238 = 'WAVEP#';
const r1237 = 'WAVEP';
const y1239 = [z1238, r1237];
const z1274 = 'MOVE';
const z1275 = 'ROT';
const n1276 = 'SCALE';
const c1277 = 'SKEW';
const e1278 = 'SCENTR';
const d1279 = 'RSTX';
const k1280 = 'PLACE';
const d1281 = 'APPLY';
const PATH_LENGTH = 'PTHLEN';
const JOIN_PATHS = 'JOINPTH';
const REORIENT_PATHS = 'REORPTH';
const a1287 = 'PTALPATH';
const m1288 = 'CPTONPATH';
const f1282 = 'MESPT';
const i1283 = 'VECLEN';
const n1284 = 'CIRCEN';
const ARC_FROM_POINTS = 'ARCPT';
const q1285 = 'INTLIN';
const k1286 = 'PTLERP';
const REVERSE_PATH = 'REVPTH';
const BLEND_PATH = 'BLENDPTH';
const PATH_TYPES = [t1254, e1232, m1234, r1237];
const PATH_VALUES = [d1253, b1231, z1235, z1238];
const v1289 = 'SBOOL';
const f1290 = 'SBOOL#';
const t1291 = 'SBOOLU';
const v1292 = 'SBOOLS';
const a1293 = 'SBOOLI';
const r1294 = 'SBOOLE';
const v1295 = [v1289, f1290, t1291, v1292, a1293, r1294];
const q1296 = 'RENDER';
const EXPORT = 'EXPORT';
const a1297 = [o1221, p1063, o1222, q1225, j1228, b1231, d1240, m1243, g1246, b1249, d1253, u1256, y1259, b1262, h1265, z1235, z1238, z1268, t1271, f1290, f1200, h1203, x1206, u1209, h1215, j1212];
const a1298 = [z1275, n1276, c1277];
const v1299 = [...a1297, ...m1224, ...p1227, ...i1230, ...g1233, ...b1242, ...i1245, ...j1248, ...r1251, r1252, ...q1255, ...v1258, ...i1261, ...m1264, ...c1267, ...f1236, ...y1239, ...b1270, ...u1273, ...v1295, z1274, ...a1298, e1278, d1279, k1280, d1281, PATH_LENGTH, JOIN_PATHS, REORIENT_PATHS, a1287, m1288, f1282, i1283, n1284, m1234, r1237, ARC_FROM_POINTS, q1285, k1286, REVERSE_PATH, BLEND_PATH, q1296, EXPORT];
const s1300 = [p1060, i1061, q1062, p1063, p1095, m1147, v1172, y1182, h1188, q1191, b1185, h1188, q1191, o1221, o1222, q1225, j1228, b1231, d1240, m1243, g1246, b1249, d1253, u1256, y1259, b1262, h1265, z1268, t1271, k1197, f1200, h1203, x1206, u1209, h1215, j1212];
const e1301 = 'GROUP';
const u1302 = 'GPARAM';
const l1303 = [e1301, u1302];
const a1304 = 'CMNT';
const v1305 = 'CMNTARR';
const o1306 = 'PANEL';
const w1307 = 'ACT';
const e1308 = 'BFACT';
const t1309 = 'BFLST';
const d1310 = 'DIS';
const s1311 = 'NOC';
const PARAM = 'PARAM';
const i1312 = 'LOG';
const s1313 = 'GRAPH';
const o1314 = [[y1123, '%'], [w1122, '/'], [m1120, '−'], [j1119, '+'], [t1121, '×'], [p1124, 'e<sup>x']];
const d1315 = [[w1122, '/'], [m1120, '−'], [j1119, '+'], [t1121, '×']];
const c1316 = 0;
const t1317 = 1;
const n1318 = 2;
const v1319 = 3;
const w1320 = [[c1316, 'not'], [t1317, 'xor'], [n1318, 'or'], [v1319, 'and']];
const p1321 = 0;
const p1322 = 1;
const d1323 = 2;
const s1324 = 3;
const i1325 = 4;
const x1326 = 5;
const b1327 = [[p1321, '<'], [p1322, '≤'], [d1323, '≠'], [s1324, '='], [i1325, '≥'], [x1326, '>']];
const d1328 = 0;
const e1329 = 1;
const i1330 = 2;
const n1331 = 3;
const b1332 = 4;
const i1333 = 5;
const k1334 = [[d1328, 'sin'], [e1329, 'cos'], [i1330, 'tan'], [n1331, 'asin'], [b1332, 'acos'], [i1333, 'atan']];
const f1335 = 'EMPTY';
const i1336 = 'CONNECT';
const u1337 = 'CREATE';
const h1338 = 'CREATE_INSERT';
const r1339 = 'DELETE';
const c1340 = 'DISCONNECT';
const o1341 = 'LINK_STYLE';
const v1342 = 'LINK_VARIABLE';
const s1343 = 'LINK_VARIABLE_GROUP';
const s1344 = 'MAKE_ACTIVE';
const MAKE_NOT_CONDITION_ACTION = 'MAKE_NOT_CONDITION';
const m1345 = 'MAKE_PASSIVE';
const k1346 = 'PASTE';
const d1347 = 'RECONNECT';
const m1348 = 'REMOVE';
const n1349 = 'RENAME';
const s1350 = 'REORDER_INPUTS';
const x1351 = 'REORDER_CONNECTIONS';
const m1352 = 'SELECT';
const e1353 = 'SELECT_MOVE';
const z1354 = 'MOVE_NODES';
const d1355 = 'SET_PARAM_VALUE';
const SET_MULTIPLE_VALUES_ACTION = 'SET_MULTIPLE_VALUES';
const o1356 = 'SET_PARAM_SETTING';
const r1357 = 'SET_NODE_RECT';
const t1358 = 'TOGGLE_DISABLE';
const s1359 = 'TOGGLE_PARAM_HEADER';
const y1360 = 'SET_CURRENT_GRAPH';
const m1361 = 'CREATE_PAGE';
const t1362 = 'DELETE_PAGE';
const a1363 = 'GROUP_NODES';
const l1364 = 'UNGROUP_NODES';
const q1365 = 'HIGHLIGHT_NODES';
const SCROLL_LIST_NODE_ACTION = 'SCROLL_LIST_NODE';
const SET_LIST_DIVIDER_ACTION = 'SET_LIST_DIVIDER';
const SET_NODE_PARAM_ACTION = 'SET_NODE_PARAM';
const q1366 = 'BNORM';
const z1367 = 'BDARK';
const i1368 = 'BMULT';
const i1369 = 'BPDRK';
const v1370 = 'BBURN';
const i1371 = 'BLITE';
const l1372 = 'BSCRN';
const v1373 = 'BPLGT';
const s1374 = 'BDODG';
const h1375 = 'BOVER';
const t1376 = 'BSOFT';
const x1377 = 'BHARD';
const l1378 = 'BDIFF';
const f1379 = 'BEXCL';
const x1380 = 'BHUE';
const u1381 = 'BSAT';
const p1382 = 'BCOL';
const p1383 = 'BLUM';
const l1384 = [[q1366, 'normal', 'NORMAL'], [z1367, 'darken', 'DARKEN'], [i1368, 'multiply', 'MULTIPLY'], [i1369, 'plus darker', 'LINEAR_BURN'], [v1370, 'color burn', 'COLOR_BURN'], [i1371, 'lighten', 'LIGHTEN'], [l1372, 'screen', 'SCREEN'], [v1373, 'plus lighter', 'LINEAR_DODGE'], [s1374, 'color dodge', 'COLOR_DODGE'], [h1375, 'overlay', 'OVERLAY'], [t1376, 'soft light', 'SOFT_LIGHT'], [x1377, 'hard light', 'HARD_LIGHT'], [l1378, 'difference', 'DIFFERENCE'], [f1379, 'exclusion', 'EXCLUSION'], [x1380, 'hue', 'HUE'], [u1381, 'saturation', 'SATURATION'], [p1382, 'color', 'COLOR'], [p1383, 'luminosity', 'LUMINOSITY']];
const l1385 = [['thin', 100], ['extra light', 200], ['light', 300], ['regular', 400], ['medium', 500], ['semi bold', 600], ['bold', 700], ['extra bold', 800], ['black', 900]];
const a1386 = 0;
const x1387 = 1;
const j1388 = 2;
const h1389 = 2;
const r1390 = 3;
const r1391 = 3;
const b1392 = 4;
const p1393 = 4;
const t1394 = 5;
const q1395 = 6;
const v1396 = 7;
const v1397 = 8;
const h1398 = 9;
const b1399 = 10;
const w1400 = 11;
const l1401 = 12;
const u1402 = 13;
const d1403 = 14;
const s1404 = 15;
const j1405 = 16;
const l1406 = 17;
const q1407 = 18;
const m1408 = 19;
const r1409 = 20;
const j1410 = 21;
const r1411 = 22;
const f1412 = 23;
const n1413 = 24;
const FO_BOOLEAN_CHILDREN = 24;
const v1414 = 24;
const e1415 = 25;
const FO_BOOLEAN_OPERATION = 25;
const w1416 = 26;
const d1417 = 27;
const o1418 = 28;
const z1419 = 28;
const p1420 = 28;
const t1421 = 28;
const q1422 = 28;
const a1423 = 28;
const q1424 = 28;
const d1425 = 28;
const h1426 = 29;
const w1427 = 29;
const c1428 = 29;
const b1429 = 29;
const m1430 = 29;
const y1431 = 29;
const p1432 = 30;
const j1433 = 30;
const i1434 = 30;
const l1435 = 30;
const z1436 = 31;
const l1437 = 31;
const w1438 = 32;
const c1439 = 33;
const z1440 = 34;
const k1441 = 35;
const k1442 = 36;
const r1443 = 37;
const s2783 = '12345679ABCDEFGHJKLMNPQRSTUVWXYZ';
function b846(array, chars = s2783) { let f848 = ''; let len = array.length; let i = 0; while (len > 0) {
    if (len >= 5) {
        const a0 = array[i], a1 = array[i + 1], a2 = array[i + 2], a3 = array[i + 3], a4 = array[i + 4];
        f848 += chars[(a0 & 0xF8) >>> 3];
        f848 += chars[((a0 & 0x07) << 2) | ((a1 & 0xC0) >>> 6)];
        f848 += chars[(a1 & 0x3E) >>> 1];
        f848 += chars[((a1 & 0x01) << 4) | ((a2 & 0xF0) >>> 4)];
        f848 += chars[((a2 & 0x0F) << 1) | ((a3 & 0x80) >>> 7)];
        f848 += chars[(a3 & 0x7C) >>> 2];
        f848 += chars[((a3 & 0x03) << 3) | ((a4 & 0xE0) >>> 5)];
        f848 += chars[(a4 & 0x1F)];
    }
    else if (len == 4) {
        const a0 = array[i], a1 = array[i + 1], a2 = array[i + 2], a3 = array[i + 3];
        f848 += chars[(a0 & 0xF8) >>> 3];
        f848 += chars[((a0 & 0x07) << 2) | ((a1 & 0xC0) >>> 6)];
        f848 += chars[(a1 & 0x3E) >>> 1];
        f848 += chars[((a1 & 0x01) << 4) | ((a2 & 0xF0) >>> 4)];
        f848 += chars[((a2 & 0x0F) << 1) | ((a3 & 0x80) >>> 7)];
        f848 += chars[(a3 & 0x7C) >>> 2];
        f848 += chars[((a3 & 0x03) << 3)];
    }
    else if (len == 3) {
        const a0 = array[i], a1 = array[i + 1], a2 = array[i + 2];
        f848 += chars[(a0 & 0xF8) >>> 3];
        f848 += chars[((a0 & 0x07) << 2) | ((a1 & 0xC0) >>> 6)];
        f848 += chars[(a1 & 0x3E) >>> 1];
        f848 += chars[((a1 & 0x01) << 4) | ((a2 & 0xF0) >>> 4)];
        f848 += chars[((a2 & 0x0F) << 1)];
    }
    else if (len == 2) {
        const a0 = array[i], a1 = array[i + 1];
        f848 += chars[(a0 & 0xF8) >>> 3];
        f848 += chars[((a0 & 0x07) << 2) | ((a1 & 0xC0) >>> 6)];
        f848 += chars[(a1 & 0x3E) >>> 1];
        f848 += chars[((a1 & 0x01) << 4)];
    }
    else if (len == 1) {
        const a0 = array[i];
        f848 += chars[(a0 & 0xF8) >>> 3];
        f848 += chars[((a0 & 0x07) << 2)];
    }
    i += 5;
    len -= 5;
} return f848; }
function c847(f848, chars = s2783) { const array = []; let len = f848.length; let c = 0; while (len > 0) {
    if (len >= 8) {
        const c0 = chars.indexOf(f848[c]), c1 = chars.indexOf(f848[c + 1]), c2 = chars.indexOf(f848[c + 2]), c3 = chars.indexOf(f848[c + 3]), c4 = chars.indexOf(f848[c + 4]), c5 = chars.indexOf(f848[c + 5]), c6 = chars.indexOf(f848[c + 6]), c7 = chars.indexOf(f848[c + 7]);
        array.push((c0 << 3) | ((c1 & 0x1C) >>> 2));
        array.push(((c1 & 0x03) << 6) | (c2 << 1) | ((c3 & 0x10) >>> 4));
        array.push(((c3 & 0x0F) << 4) | ((c4 & 0x1E) >>> 1));
        array.push(((c4 & 0x01) << 7) | (c5 << 2) | ((c6 & 0x18) >>> 3));
        array.push(((c6 & 0x07) << 5) | c7);
    }
    else if (len == 7) {
        const c0 = chars.indexOf(f848[c]), c1 = chars.indexOf(f848[c + 1]), c2 = chars.indexOf(f848[c + 2]), c3 = chars.indexOf(f848[c + 3]), c4 = chars.indexOf(f848[c + 4]), c5 = chars.indexOf(f848[c + 5]), c6 = chars.indexOf(f848[c + 6]);
        array.push((c0 << 3) | ((c1 & 0x1C) >>> 2));
        array.push(((c1 & 0x03) << 6) | (c2 << 1) | ((c3 & 0x10) >>> 4));
        array.push(((c3 & 0x0F) << 4) | ((c4 & 0x1E) >>> 1));
        array.push(((c4 & 0x01) << 7) | (c5 << 2) | ((c6 & 0x18) >>> 3));
    }
    else if (len == 5) {
        const c0 = chars.indexOf(f848[c]), c1 = chars.indexOf(f848[c + 1]), c2 = chars.indexOf(f848[c + 2]), c3 = chars.indexOf(f848[c + 3]), c4 = chars.indexOf(f848[c + 4]);
        array.push((c0 << 3) | ((c1 & 0x1C) >>> 2));
        array.push(((c1 & 0x03) << 6) | (c2 << 1) | ((c3 & 0x10) >>> 4));
        array.push(((c3 & 0x0F) << 4) | ((c4 & 0x1E) >>> 1));
    }
    else if (len == 4) {
        const c0 = chars.indexOf(f848[c]), c1 = chars.indexOf(f848[c + 1]), c2 = chars.indexOf(f848[c + 2]), c3 = chars.indexOf(f848[c + 3]);
        array.push((c0 << 3) | ((c1 & 0x1C) >>> 2));
        array.push(((c1 & 0x03) << 6) | (c2 << 1) | ((c3 & 0x10) >>> 4));
    }
    else if (len == 2) {
        const c0 = chars.indexOf(f848[c]), c1 = chars.indexOf(f848[c + 1]);
        array.push((c0 << 3) | ((c1 & 0x1C) >>> 2));
    }
    c += 8;
    len -= 8;
} return array; }
function logSavedNode(nodeKey, m3992) {
    return __awaiter(this, void 0, void 0, function* () { const log = w2106(yield v1551(nodeKey, false)); if (m3992) {
        console.log('%c%s\n%c%s', 'background: #fa24; color: white;', u1058(nodeKey), 'background: #fa44; color: #edc;', log);
    }
    else {
        console.log('%c%s\n%c%s', 'background: #fdb; color: black;', u1058(nodeKey), 'background: #fed; color: black;', log);
    } });
}
function w2106(json) { let b4018 = json.replace('{\n', '').replace('\n}', '').replace('[\n' + k869, '').replace('\n' + k869 + ']', '').split(k869 + '"params":\n').join('').split('": "').join(': ').split('", "').join(': ').split(k869 + '"').join(k869).split(k869 + k869 + '["').join(k869 + k869).split('",\n').join('\n').split('"\n').join('\n').split('"],\n').join('\n'); if (b4018[b4018.length - 1] == '"')
    b4018 = b4018.substring(0, b4018.length - 1); if (b4018.substring(b4018.length - 2) == '"]')
    b4018 = b4018.substring(0, b4018.length - 2); return b4018; }
function m2107(json) { let b4018 = json.replace('{\n', '').replace('\n}', '').replace('[\n' + k869, '').replace('\n' + k869 + ']', ''); return b4018; }
function c2108(t243, m3992) { const z4196 = i927(t243, true); if (m3992) {
    console.log('%c%s', 'background: #4f44; color: #ded', z4196);
}
else {
    console.log('%c%s', 'background: #cfc; color: black;', z4196);
} }
console.clear();
figma.payments.setPaymentStatusInDevelopment({ type: 'PAID' });
figma.loadAllPagesAsync().then(() => { figma.on('documentchange', z1522); figma.on('selectionchange', h1530); figma.on('close', y1523); });
r1512(true);
figma.clientStorage.getAsync('pro').then(data => { figma.showUI(__html__, { visible: false, themeColors: true, title: 'Generator' }); });
var n2695 = figma.viewport.zoom;
setInterval(z1527, 100);
var strBackgrounds = '';
setInterval(figCheckBackgrounds, 500);
const u2784 = 'clock_';
const a2785 = 1000;
var f2786 = false;
var objectCenterSize = 15;
function s1524() { (function () {
    return __awaiter(this, void 0, void 0, function* () { figma.currentPage.loadAsync().then(() => __awaiter(this, void 0, void 0, function* () { let i2787 = yield figma.currentPage.getPluginData(figma.currentUser.id + ',windowWidth'); let j2788 = yield figma.currentPage.getPluginData(figma.currentUser.id + ',windowHeight'); let h2789; let b2790; if (i2787 === NULL) {
        h2789 = 800;
        figma.currentPage.setPluginData(figma.currentUser.id + ',windowWidth', i2787.toString());
    }
    else
        h2789 = parseInt(i2787); if (j2788 === NULL) {
        b2790 = 600;
        figma.currentPage.setPluginData(figma.currentUser.id + ',windowHeight', j2788.toString());
    }
    else
        b2790 = parseInt(j2788); figma.ui.resize(Math.max(minWindowWidth, h2789), Math.max(minWindowHeight, b2790)); figma.ui.show(); const fonts = yield figma.listAvailableFontsAsync(); const eula = (yield figma.clientStorage.getAsync('eula')) === 'true'; const tutorials = (yield figma.clientStorage.getAsync('tutorials')) === 'true'; const isLocked = yield o1529(); h1531({ cmd: 'uiReturnFigStartGenerator', currentUser: figma.currentUser, viewportRect: figma.viewport.bounds, viewportZoom: figma.viewport.zoom, fonts: fonts, eula: eula, tutorials: tutorials, isLocked: isLocked, windowWidth: h2789, windowHeight: b2790 }); })); });
})(); }
function z1525() { r1512(); figma.showUI(__html__, { visible: false, themeColors: true }); }
function m1526() { setInterval(m1528, a2785); }
function z1527() { if (figma.viewport.zoom == n2695)
    return; n2695 = figma.viewport.zoom; b2683(); v1545(); a1547(); }
function figCheckBackgrounds() { if (strBackgrounds != JSON.stringify(figma.currentPage.backgrounds)) {
    v1545();
    strBackgrounds = JSON.stringify(figma.currentPage.backgrounds);
} }
function m1528() { y1552(u2784 + figma.currentUser.sessionId.toString(), Date.now().toString()); }
function o1529() {
    return __awaiter(this, void 0, void 0, function* () { yield figma.currentPage.loadAsync(); const clocks = figma.currentPage.getPluginDataKeys().filter(k => k.length > u2784.length && k.substring(0, u2784.length) == u2784 && k.substring(u2784.length) != figma.currentUser.sessionId.toString()).map((k) => __awaiter(this, void 0, void 0, function* () { return parseInt(yield v1551(k)); })); clocks.sort(); const now = Date.now(); const locked = clocks.length > 0 && now - (yield clocks[clocks.length - 1]) < a2785 * 2; return locked; });
}
function h1530() { b2683(); }
var y2716 = new Array();
var a2718 = new Array();
function figGetObjectsFromIds(objectIds) {
    return __awaiter(this, void 0, void 0, function* () { for (let i = m2752.length - 1; i >= 0; i--)
        if (!m2752[i].removed && objectIds.includes(m2752[i].getPluginData('objectId')))
            m2752.splice(i, 1); for (let i = y2768.length - 1; i >= 0; i--)
        if (y2768[i].removed || objectIds.includes(y2768[i].getPluginData('objectId')))
            y2768.splice(i, 1); yield figma.currentPage.loadAsync(); return figma.currentPage.findAll(o => objectIds.includes(o.getPluginData('objectId'))); });
}
function v1511(nodeIds) {
    return __awaiter(this, void 0, void 0, function* () { for (let i = m2752.length - 1; i >= 0; i--)
        if (!m2752[i].removed && nodeIds.includes(m2752[i].getPluginData('nodeId')))
            m2752.splice(i, 1); for (let i = y2768.length - 1; i >= 0; i--)
        if (y2768[i].removed || nodeIds.includes(y2768[i].getPluginData('nodeId')))
            y2768.splice(i, 1); yield figma.currentPage.loadAsync(); figma.currentPage.findAll(o => nodeIds.includes(o.getPluginData('nodeId'))).forEach(o => { if (!o.removed)
        o.remove(); }); y2716 = y2716.filter(a => !nodeIds.includes(a.nodeId)); });
}
function r1512(x1513 = false) { for (const c1518 of figma.currentPage.children) {
    if (c1518.removed)
        continue;
    if (c1518.getPluginData('objectId') != '' && c1518.getPluginData('userId') == figma.currentUser.id && (parseInt(c1518.getPluginData('retain')) == 0 || x1513))
        c1518.remove();
} }
function x1514(nodeIds, i1515) { for (let i = y2716.length - 1; i >= 0; i--) {
    const l2717 = y2716[i];
    if (!nodeIds.includes(l2717.nodeId))
        continue;
    for (let j = l2717.objects.length - 1; j >= 0; j--) {
        const c1518 = l2717.objects[j];
        if (c1518.removed || !l1516(c1518, i1515)) {
            if (!c1518.removed)
                c1518.remove();
            r946(l2717.objects, c1518);
            if (m2752.includes(c1518))
                r946(m2752, c1518);
            if (y2768.includes(c1518))
                r946(y2768, c1518);
        }
        if (!c1518.removed) {
            if (parseInt(c1518.getPluginData('retain')) == 2)
                s1537(c1518);
        }
    }
    if (isEmpty(l2717.objects))
        r946(y2716, l2717);
} }
function l1516(c1518, i1515) { if (c1518.type == x1269 || c1518.type == c1272) {
    for (const child of c1518.children) {
        const found = l1516(child, i1515);
        if (found)
            return found;
    }
}
else {
    const found = i1515.find(o => c1518.getPluginData('objectId') == o[j1388] && c1518.getPluginData('userId') == figma.currentUser.id || o[t1394] == 2 && o[t1394] == c1518.getPluginData('retain'));
    if (found)
        return found;
} return null; }
function j1519(nodeIds, s1520) { figma.getLocalPaintStylesAsync().then(paintStyles => { paintStyles.filter(s => nodeIds.includes(s.getPluginData('nodeId'))).forEach(s => { const nodeId = s.getPluginData('nodeId'); const existing = h926(s.getPluginData('existing')); if (!existing) {
    s.remove();
}
else if (s1520) {
    r948(a2718, a => a.nodeId == nodeId);
    s.setPluginData('type', NULL);
    s.setPluginData('nodeId', NULL);
    s.setPluginData('existing', NULL);
} }); }); if (s1520)
    a2718 = a2718.filter(a => !nodeIds.includes(a.nodeId)); }
var u1521 = false;
function z1522(e) { for (const change of e.documentChanges) {
    switch (change.type) {
        case 'STYLE_CREATE':
            if (!change.style)
                break;
            if (!u1521) {
                change.style.setPluginData('type', NULL);
                change.style.setPluginData('nodeId', NULL);
                change.style.setPluginData('existing', NULL);
            }
            break;
        case 'STYLE_PROPERTY_CHANGE': {
            if (!change.style)
                break;
            if (!u1521) {
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
                h1531(msg);
            }
            break;
        }
        case 'STYLE_DELETE':
            h1531({ cmd: 'uiStyleDelete', styleId: change.id });
            break;
    }
} u1521 = false; }
function y1523() { r1512(); h1531({ cmd: 'updateMetrics' }); }
figma.ui.onmessage = function (msg) { msg = JSON.parse(msg); if (msg.cmd == 'returnUiGetValueForFigma')
    return; switch (msg.cmd) {
    case 'figStartGenerator':
        s1524();
        break;
    case 'figRestartGenerator':
        z1525();
        break;
    case 'figFinishStart':
        m1526();
        break;
    case 'figDockWindowNormal':
        b2725('normal');
        break;
    case 'figDockWindowMaximize':
        b2725('maximize');
        break;
    case 'figDockWindowTop':
        b2725('top');
        break;
    case 'figDockWindowLeft':
        b2725('left');
        break;
    case 'figDockWindowRight':
        b2725('right');
        break;
    case 'figDockWindowBottom':
        b2725('bottom');
        break;
    case 'figGetMousePosition':
        h1597(msg.clientPosition);
        break;
    case 'figResizeWindow':
        m1600(msg.width, msg.height);
        break;
    case 'figSetWindowRect':
        o1598(msg.x, msg.y, msg.width, msg.height);
        break;
    case 'figNotify':
        m1601(msg);
        break;
    case 'figGetLocalData':
        r1549(msg.key);
        break;
    case 'figSetLocalData':
        z1550(msg.key, msg.value);
        break;
    case 'figClearAllLocalData':
        j4013();
        break;
    case 'figGetPageData':
        v1551(msg.key);
        break;
    case 'figSetPageData':
        y1552(msg.key, msg.value);
        break;
    case 'figSavePages':
        k1557(msg.pageIds, msg.pageJson, msg.currentPageId);
        break;
    case 'figLoadNodesAndConns':
        u1554(msg.debugMode);
        break;
    case 'figSaveNodes':
        s1558(msg.nodeIds, msg.nodeJson);
        break;
    case 'figGetAllLocalTemplateNames':
        f2722();
        break;
    case 'figSaveLocalTemplate':
        l1559(msg.x4014, msg.template);
        break;
    case 'figRemoveConnsToNodes':
        v1560(msg.nodeIds);
        break;
    case 'figRemoveSavedNodesAndConns':
        k1561(msg.nodeIds);
        break;
    case 'figRemoveAllSavedNodesAndConns':
        h1562();
        break;
    case 'figLogAllSavedNodesAndConns':
        s1563(msg.m3992);
        break;
    case 'figLogAllSavedNodes':
        a1564(msg.m3992);
        break;
    case 'figLogAllSavedConns':
        n1565(msg.m3992);
        break;
    case 'figLogAllSavedPageKeys':
        j1566(msg.m3992);
        break;
    case 'figLogAllSavedPages':
        b1567(msg.m3992);
        break;
    case 'figLogAllSavedConnKeys':
        g1568(msg.m3992);
        break;
    case 'figLogAllLocalData':
        w1569(msg.m3992);
        break;
    case 'figGetValue':
        x1570(msg.key, msg.spec);
        break;
    case 'figRemoveSavedPage':
        y1572(msg.pageId);
        break;
    case 'figRemoveAllSavedPages':
        d1573();
        break;
    case 'figSaveConnection':
        y1574(msg.key, msg.json);
        break;
    case 'figSaveConnections':
        u1575(msg.keys, msg.json);
        break;
    case 'figUpdateSavedConnections':
        u1576(msg.curKeys, msg.newKeys, msg.json);
        break;
    case 'figDeleteSavedConnection':
        k1577(msg.key);
        break;
    case 'figRemoveAllSavedConnections':
        o1578();
        break;
    case 'figDeleteSavedConnectionsToNode':
        w1579(msg.nodeId);
        break;
    case 'figDeleteSavedConnectionsFromNode':
        l1580(msg.nodeId);
        break;
    case 'figRemovePluginDataFromAllLocalStyles':
        m1581();
        break;
    case 'figGetAllLocalVariables':
        f1605(msg.nodeId, msg.px, msg.py);
        break;
    case 'figLinkNodeToVariable':
        v1607(msg.nodeId, msg.variableId);
        break;
    case 'figUpdateVariable':
        figUpdateVariableAsync(msg.variableId, msg.value);
        break;
    case 'figGetAllLocalColorStyles':
        p1582(msg.nodeId, msg.px, msg.py);
        break;
    case 'figLinkNodeToExistingColorStyle':
        v1583(msg.nodeId, msg.styleId);
        break;
    case 'figExport':
        figExport(msg.objectIds, msg.scale, msg.format, msg.suffix);
        break;
    case 'figGetObjectSize':
        k1536(msg.object);
        break;
    case 'figGetVariableUpdates':
        t1571(msg.linkedVarIds);
        break;
    case 'figUpdateShowIds':
        f2786 = msg.f2786;
        break;
    case 'figUpdateObjectCenterSize':
        objectCenterSize = msg.objectCenterSize;
        break;
    case 'figDeleteAllObjects':
        r1512();
        break;
    case 'figUpdateObjectsAndStyles':
        s2731 = 0;
        g2732 = 0;
        msg.objects.forEach(o => o.counted = false);
        v2719(null, msg.objects, msg.x4006, msg.e2054, msg.nodeIds, msg.b2748, msg.n2749, msg.e270);
        u1588(msg);
        break;
    case 'figDeleteObjectsAndStyles':
        v1511(msg.nodeIds);
        j1519(msg.nodeIds, msg.s1520);
        break;
    case 'figDeleteObjectsExcept':
        x1514(msg.nodeIds, msg.ignoreObjects);
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
} h1531({ cmd: 'uiEndFigMessage', msgCmd: msg.cmd }); };
function h1531(msg) { figma.ui.postMessage(JSON.stringify(msg)); }
function t2720(key) {
    return __awaiter(this, void 0, void 0, function* () { return yield figma.clientStorage.getAsync(key); });
}
function r1549(key) { figma.currentPage.loadAsync().then(() => { if (key == 'canvasEmpty') {
    h1531({ cmd: 'uiReturnFigGetLocalData', key: key, value: figma.currentPage.children.length == 0 });
}
else if (key == 'debugWarningCrash') {
    figma.clientStorage.getAsync('debugWarning').then(data => { h1531({ cmd: 'uiReturnFigGetLocalData', key: key, value: data }); });
}
else {
    figma.clientStorage.getAsync(key).then(data => { h1531({ cmd: 'uiReturnFigGetLocalData', key: key, value: data }); });
} }); }
function z1550(key, value, postToUi = true) { figma.clientStorage.setAsync(key, value); if (postToUi) {
    h1531({ cmd: 'uiReturnFigSetLocalData', key: key, value: value });
} }
function j4013() {
    return __awaiter(this, void 0, void 0, function* () { const keys = yield figma.clientStorage.keysAsync(); for (const key of keys)
        figma.clientStorage.deleteAsync(key); });
}
function v1551(key, postToUi = true) {
    return __awaiter(this, void 0, void 0, function* () { yield figma.currentPage.loadAsync(); const data = figma.currentPage.getPluginData(key); if (postToUi) {
        h1531({ cmd: 'uiReturnFigGetPageData', key: key, value: data });
    } return data; });
}
function y1552(key, value) { c1553(key); figma.currentPage.setPluginData(key, value); }
function c1553(key) { figma.currentPage.setPluginData(key, ''); }
function u1554(debugMode) { figma.currentPage.loadAsync().then(() => { const pageKeys = figma.currentPage.getPluginDataKeys().filter(k => w1054(k)); const nodeKeys = figma.currentPage.getPluginDataKeys().filter(k => v1055(k)); const connKeys = figma.currentPage.getPluginDataKeys().filter(k => c1056(k)); if (!debugMode)
    r1556(nodeKeys, connKeys); const pages = pageKeys.map(k => figma.currentPage.getPluginData(k)); const nodes = nodeKeys.map(k => figma.currentPage.getPluginData(k)); const a2125 = connKeys.map(k => figma.currentPage.getPluginData(k)); const pageOrder = figma.currentPage.getPluginData('pageOrder').split(','); const currentPageId = figma.currentPage.getPluginData('currentPageId'); e1555(nodes); const showAllColorSpaces = figma.currentPage.getPluginData('showAllColorSpaces'); h1531({ cmd: 'uiReturnFigLoadNodesAndConns', showAllColorSpaces: showAllColorSpaces, pageKeys: pageKeys, pageJson: pages, pageOrder: pageOrder, currentPageId: currentPageId, nodeKeys: nodeKeys, nodeJson: nodes, connKeys: connKeys, connJson: a2125 }); }); }
function e1555(nodes) { a2718 = []; figma.getLocalPaintStylesAsync().then(paintStyles => { for (const h3005 of nodes) {
    const node = JSON.parse(h3005);
    if (node.type == r1220) {
        const style = paintStyles.find(s => { const nodeId = s.getPluginData('nodeId'); return nodeId == node.id; });
        if (style) {
            a2718.push({ nodeId: node.id, existing: h926(node.existing), styles: [style] });
        }
    }
} }); }
function r1556(nodeKeys, connKeys) { figma.currentPage.loadAsync().then(() => { const c2721 = '"loading": "true"'; const not = '{\n'; const set = '{\n' + k869 + c2721 + ',\n'; nodeKeys.forEach(k => figma.currentPage.setPluginData(k, figma.currentPage.getPluginData(k).replace(set, not).replace(not, set))); connKeys.forEach(k => figma.currentPage.setPluginData(k, figma.currentPage.getPluginData(k).replace(set, not).replace(not, set))); }); }
function k1557(pageIds, pageJson, currentPageId) { for (let i = 0; i < pageIds.length; i++) {
    y1552(j925(pageIds[i]), pageJson[i]);
} y1552('pageOrder', pageIds.join(',')); y1552('currentPageId', currentPageId); }
function s1558(nodeIds, nodeJson) { for (let i = 0; i < nodeIds.length; i++) {
    y1552(z923(nodeIds[i]), nodeJson[i]);
} }
function f2722() {
    return __awaiter(this, void 0, void 0, function* () { let keys = yield figma.clientStorage.keysAsync(); keys = keys.filter(k => k.length >= f877.length && k.substring(0, f877.length) == f877); h1531({ cmd: 'uiReturnGetAllLocalTemplateNames', templateNames: keys }); });
}
function l1559(x4014, template) { z1550(f877 + ' ' + x4014, template); }
function v1560(nodeIds) { figma.currentPage.loadAsync().then(() => { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => c1056(k)); for (const key of connKeys) {
    const parts = g1059(key).split(' ');
    if (nodeIds.includes(parts[0]) || nodeIds.includes(parts[2]))
        c1553(key);
} }); }
function k1561(nodeIds) { figma.currentPage.loadAsync().then(() => { v1560(nodeIds); const nodeKeys = figma.currentPage.getPluginDataKeys().filter(k => v1055(k) && nodeIds.includes(u1058(k))); nodeKeys.forEach(k => c1553(k)); }); }
function h1562() { figma.currentPage.loadAsync().then(() => { const nodeKeys = figma.currentPage.getPluginDataKeys().filter(k => v1055(k)); const connKeys = figma.currentPage.getPluginDataKeys().filter(k => c1056(k)); for (const key of nodeKeys)
    c1553(key); for (const key of connKeys)
    c1553(key); }); }
function s1563(m3992) {
    return __awaiter(this, void 0, void 0, function* () { yield a1564(m3992); n1565(m3992); });
}
function a1564(m3992) {
    return __awaiter(this, void 0, void 0, function* () { yield figma.currentPage.loadAsync(); figma.currentPage.getPluginDataKeys().filter(k => v1055(k)).forEach((k) => __awaiter(this, void 0, void 0, function* () { return yield logSavedNode(k, m3992); })); });
}
function n1565(m3992) { figma.currentPage.loadAsync().then(() => { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => c1056(k)); connKeys.sort((key1, key2) => { const p1 = g1059(key1).split(' '); const p2 = g1059(key2).split(' '); if (p1[2] != p2[2])
    return p1[2] < p2[2] ? -1 : 1; if (p1[3] != p2[3])
    return parseInt(p1[3]) - parseInt(p2[3]); if (p1[2] == p2[0])
    return -1; if (p2[2] == p1[0])
    return 1; return 0; }); connKeys.forEach(k => c2108(JSON.parse(figma.currentPage.getPluginData(k)), m3992)); }); }
function j1566(m3992) { figma.currentPage.loadAsync().then(() => { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => w1054(k)); connKeys.forEach(k => console.log('%c' + k, 'background: #fff; color: ' + (m3992 ? 'black' : 'white'))); const pageOrder = figma.currentPage.getPluginData('pageOrder'); console.log('%c' + pageOrder, 'background: #fff; color: ' + (m3992 ? 'black' : 'white')); }); }
function b1567(m3992) { figma.currentPage.loadAsync().then(() => { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => w1054(k)); connKeys.forEach(k => console.log('%c' + figma.currentPage.getPluginData(k), 'background: #fff; color: ' + (m3992 ? 'black' : 'white'))); const pageOrder = figma.currentPage.getPluginData('pageOrder'); console.log('%c' + pageOrder, 'background: #fff; color: ' + (m3992 ? 'black' : 'white')); }); }
function g1568(m3992) { figma.currentPage.loadAsync().then(() => { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => c1056(k)); connKeys.forEach(k => console.log('%c' + k, 'background: #dff; color: ' + (m3992 ? 'black' : 'white'))); }); }
function w1569(m3992) { figma.clientStorage.keysAsync().then(keys => keys.forEach(k => figma.clientStorage.getAsync(k).then(val => console.log(k + ': ' + val)))); }
function x1570(key, spec) {
    return __awaiter(this, void 0, void 0, function* () { let result = null; switch (key) {
        case 'getVariableData':
            result = yield x1606(spec);
            break;
        case 'getPaidStatus':
            result = figma.payments.status.type;
            break;
        case 'figSubscribe': {
            yield figma.payments.initiateCheckoutAsync({ interstitial: 'PAID_FEATURE' });
            result = figma.payments.status.type;
            break;
        }
    } h1531({ cmd: 'returnFigGetValue', value: result }); });
}
function t1571(varIds) { x1606(varIds).then(values => { h1531({ cmd: 'uiReturnFigGetVariableUpdates', values: values }); }); }
function y1572(pageId) {
    return __awaiter(this, void 0, void 0, function* () { c1553(d935(pageId)); const pageOrder = (yield v1551('pageOrder')).split(','); r948(pageOrder, id => id == pageId); y1552('pageOrder', pageOrder.join(',')); });
}
function d1573() { figma.currentPage.loadAsync().then(() => { const pageKeys = figma.currentPage.getPluginDataKeys().filter(k => w1054(k)); pageKeys.forEach(k => c1553(k)); c1553('pageOrder'); }); }
function y1574(key, json) { y1552(key, json); }
function u1575(_keys, _json) { const keys = JSON.parse(_keys); const json = JSON.parse(_json); for (let i = 0; i < keys.length; i++)
    y1552(keys[i], json[i]); }
function u1576(_curKeys, _newKeys, _json) { const curKeys = JSON.parse(_curKeys); const newKeys = JSON.parse(_newKeys); const json = JSON.parse(_json); for (let i = 0; i < curKeys.length; i++) {
    c1553(curKeys[i]);
    y1552(newKeys[i], json[i]);
} }
function k1577(key) { c1553(key); }
function o1578() { figma.currentPage.loadAsync().then(() => { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => c1056(k)); connKeys.forEach(k => c1553(k)); }); }
function w1579(nodeId) { figma.currentPage.loadAsync().then(() => { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => c1056(k)); for (const key of connKeys) {
    const parts = key.split(' ');
    if (parts[4] == nodeId)
        c1553(key);
} }); }
function l1580(nodeId) { figma.currentPage.loadAsync().then(() => { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => c1056(k)); for (const key of connKeys) {
    const parts = key.split(' ');
    if (parts[1] == nodeId)
        c1553(key);
} }); }
function m1581() { figma.getLocalPaintStylesAsync().then(l1585 => { for (const style of l1585) {
    style.setPluginData('type', '');
    style.setPluginData('nodeId', '');
    style.setPluginData('existing', '');
} }); }
function figSaveSnapshot(index, objectIds) {
    return __awaiter(this, void 0, void 0, function* () { const objects = yield figGetObjectsFromIds(objectIds); const group = figma.group(objects, figma.currentPage); const settings = { format: 'PNG' }; const icon = yield group.exportAsync(settings); figma.ungroup(group); h1531({ cmd: 'uiReturnFigSaveSnapshot', index: index, iconWidth: group.width, iconHeight: group.height, icon: icon }); });
}
var v2723 = null;
var y4015 = () => v2723 = null;
var c2724 = 'normal';
function h1597(clientPosition) { h1531({ cmd: 'uiReturnFigGetMousePosition', position: { x: 0, y: 0 }, clientPosition: clientPosition, viewportZoom: figma.viewport.zoom, viewportRect: figma.viewport.bounds }); }
function o1598(x, y, width, height) { return; }
function x1599(dock, rect, bounds) { switch (dock) {
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
function m1600(width, height) { (function () {
    return __awaiter(this, void 0, void 0, function* () { width = Math.floor(Math.max(0, width)); height = Math.floor(Math.max(0, height)); figma.ui.resize(width, height); yield figma.currentPage.loadAsync(); figma.currentPage.setPluginData(figma.currentUser.id + ',windowWidth', width.toString()); figma.currentPage.setPluginData(figma.currentUser.id + ',windowHeight', height.toString()); h1531({ cmd: 'uiReturnFigResizeWindow', width: width, height: height }); });
})(); }
function b2725(dock) {
    return __awaiter(this, void 0, void 0, function* () { if (dock != 'normal' && c2724 == 'normal') {
        figma.clientStorage.setAsync('normalWindowX', yield figma.clientStorage.getAsync('normalWindowX'));
        figma.clientStorage.setAsync('normalWindowY', yield figma.clientStorage.getAsync('normalWindowY'));
        figma.clientStorage.setAsync('normalWindowWidth', yield figma.clientStorage.getAsync('normalWindowWidth'));
        figma.clientStorage.setAsync('normalWindowHeight', yield figma.clientStorage.getAsync('normalWindowHeight'));
    } c2724 = dock; figma.clientStorage.setAsync('windowDock', dock); m1600(yield figma.clientStorage.getAsync('windowWidth'), yield figma.clientStorage.getAsync('windowHeight')); });
}
function m1601(msg) { u1602(msg.text, msg.prefix, msg.delay, msg.error, msg.n1603, msg.u1604); }
function u1602(text, prefix = 'Generator ', delay = 400, error = false, n1603 = '', u1604 = NULL) { const options = { timeout: delay, error: error, onDequeue: y4015 }; if (n1603 != '') {
    options['button'] = { text: n1603 };
    if (u1604.substring(0, 'removeConnection'.length) == 'removeConnection') {
        options['button']['action'] = () => k1577(u1604.split(',')[1]);
    }
    else {
        switch (u1604) {
            case 'hideClearUndoWarning':
                options['button']['action'] = () => h1531({ cmd: 'uiHideClearUndoWarning' });
                break;
        }
    }
} if (v2723)
    v2723.cancel(); v2723 = figma.notify(prefix + text, options); }
function c2726(key, params = null) {
    return __awaiter(this, void 0, void 0, function* () { return yield y2727(key, params); });
}
function y2727(key, params = null) {
    return __awaiter(this, void 0, void 0, function* () { return new Promise((resolve, reject) => { const timeout = 60000; h1531(Object.assign({ cmd: 'uiGetValueForFigma', key: key }, (params || {}))); const g2728 = setTimeout(() => reject(new Error('Timeout: Result not received by Figma within the specified time')), timeout); function f4016(msg) { msg = JSON.parse(msg); if (msg.cmd === 'returnUiGetValueForFigma') {
        clearTimeout(g2728);
        resolve({ key: msg.key, value: msg.value });
        figma.ui.off('message', f4016);
    } } figma.ui.on('message', f4016); }); });
}
var j2729 = [];
var h2730 = [];
var s2731 = 0;
var g2732 = 0;
function m1532(r111) { return (r111[t1394] === 2 ? '' : f873) + (f2786 ? r111[j1388] : r111[r1390]); }
function p1533(a1517, addObject = null, addProps = true, transform = true) {
    return __awaiter(this, void 0, void 0, function* () { if (!b1535(a1517))
        return null; let c1518; switch (a1517[a1386]) {
        case h1223:
            c1518 = x2700(a1517, addProps, transform);
            break;
        case x1226:
            c1518 = i2779(a1517, addProps, transform);
            break;
        case c1229:
            c1518 = y2775(a1517, addProps, transform);
            break;
        case s1241:
            c1518 = s2696(a1517, addProps, transform);
            break;
        case c1244:
            c1518 = y2703(a1517, addProps, transform);
            break;
        case t1247:
            c1518 = t2706(a1517, addProps, transform);
            break;
        case o1250:
            c1518 = p2682(a1517);
            break;
        case t1254:
            c1518 = c2734(a1517, addProps, transform);
            break;
        case q1266:
            c1518 = d2735(a1517, addProps, transform);
            break;
        case v1289:
            c1518 = yield g2736(a1517, addProps, transform);
            break;
        case x1269:
            c1518 = yield q2737(a1517);
            break;
        case c1272:
            c1518 = yield y2738(a1517, addProps, transform);
            break;
    } if (addObject && c1518 != undefined && c1518 != null && !c1518.removed) {
        c1518.name = m1532(a1517);
        u955(a1517[a1386] == x1269 || !!c1518, 'no Figma object created');
        if (c1518 != undefined && c1518 != null) {
            c1518.setPluginData('retain', a1517[t1394].toString());
            if (a1517[t1394] < 2) {
                c1518.setPluginData('userId', figma.currentUser.id);
                c1518.setPluginData('sessionId', figma.currentUser.sessionId.toString());
                c1518.setPluginData('type', a1517[a1386]);
                c1518.setPluginData('nodeId', a1517[x1387]);
                c1518.setPluginData('objectId', a1517[j1388]);
                c1518.setPluginData('isCenter', q940(a1517[r1409]));
                if (a1517[a1386] == o1250)
                    m2752.push(c1518);
                if (a1517[m1408])
                    j1548(c1518);
            }
            addObject(c1518);
        }
    } if (!a1517.counted) {
        g2732++;
        a1517.counted = true;
    } return c1518; });
}
function r1534(c1518, a1517, addProps, transform) {
    return __awaiter(this, void 0, void 0, function* () { if (!b1535(a1517) || c1518 == undefined || c1518 == null || c1518.removed)
        return; c1518.name = m1532(a1517); c1518.setPluginData('retain', a1517[t1394].toString()); switch (a1517[a1386]) {
        case h1223:
            i2701(c1518, a1517, addProps, transform);
            break;
        case x1226:
            c2780(c1518, a1517, addProps, transform);
            break;
        case c1229:
            u2776(c1518, a1517, addProps, transform);
            break;
        case s1241:
            m2697(c1518, a1517, addProps, transform);
            break;
        case c1244:
            c2704(c1518, a1517, addProps, transform);
            break;
        case t1247:
            e2707(c1518, a1517, addProps, transform);
            break;
        case o1250:
            s2739(c1518, a1517);
            break;
        case t1254:
            k2740(c1518, a1517, addProps, transform);
            break;
        case q1266:
            u2741(c1518, a1517, addProps, transform);
            break;
        case v1289:
            i2742(c1518, a1517, addProps, transform);
            break;
        case x1269:
            h2743(c1518, a1517);
            break;
        case c1272:
            c2744(c1518, a1517, addProps, transform);
            break;
    } if (c1518 != undefined && c1518 != null && !c1518.removed) {
        if (c1518.parent == figma.currentPage)
            yield figma.currentPage.loadAsync();
        c1518.parent.appendChild(c1518);
        if (a1517[m1408])
            j1548(c1518);
    } if (!a1517.counted) {
        g2732++;
        a1517.counted = true;
    } });
}
function v2719(u2745, z2746, z2747, e2054 = -1, nodeIds = [], b2748 = false, n2749 = false, e270 = false, addProps = true, transform = true) {
    return __awaiter(this, void 0, void 0, function* () { let p2750 = NULL; let g2751 = null; let abort = false; const m3629 = []; let g2733 = 0; j2729.push(...nodeIds); if (e2054 > -1)
        s2731 = e2054; for (const a1517 of z2746) {
        h2730.push(a1517);
        if (a1517[x1387] != p2750) {
            p2750 = a1517[x1387];
            g2751 = y2716.find(a => a.nodeId == a1517[x1387]);
            if (!g2751) {
                y2716.push(g2751 = { nodeId: a1517[x1387], objects: [] });
            }
        }
        const addObject = c1518 => { if (u2745 != undefined && u2745 != null && !u2745.removed)
            u2745.appendChild(c1518);
        else
            g2751.objects.push(c1518); };
        let objects = u2745 != undefined && u2745 != null && !u2745.removed ? u2745.children : g2751.objects;
        let c1518 = objects.find(o => o.removed || o.getPluginData('userId') == figma.currentUser.id && o.getPluginData('objectId') == a1517[j1388]);
        if (c1518 != undefined && c1518 != null && c1518.removed) {
            x941(objects, c1518);
            if (m2752.includes(c1518))
                r946(m2752, c1518);
            if (y2768.includes(c1518))
                r946(y2768, c1518);
        }
        if (c1518 == undefined || c1518 == null || c1518.removed) {
            const newObj = yield p1533(a1517, addObject, addProps, transform);
            m3629.push(newObj);
        }
        else if (c1518 != undefined && c1518 != null && !c1518.removed && c1518.getPluginData('type') == a1517[a1386].toString()) {
            yield r1534(c1518, a1517, addProps, transform);
            if (c1518 != undefined && c1518 != null && !c1518.removed)
                m3629.push(c1518);
        }
        else {
            c1518.remove();
            if (m2752.includes(c1518))
                r946(m2752, c1518);
            if (y2768.includes(c1518))
                r946(y2768, c1518);
            yield p1533(a1517, addObject, addProps, transform);
        }
        g2733++;
        if (g2733 >= z2747) {
            const result = yield c2726('returnObjectUpdate', { s2731: s2731, g2732: g2732 });
            abort = result.value;
            g2733 = 0;
            if (abort)
                break;
        }
    } if (u2745 != undefined && u2745 != null && !u2745.removed) {
        for (const c1518 of u2745.children) {
            if (c1518 != undefined && c1518 != null && c1518.removed || !z2746.find(o => o[j1388] == c1518.getPluginData('objectId') && c1518.getPluginData('userId') == figma.currentUser.id))
                c1518.remove();
        }
    } for (const point of m2752) {
        if (point.parent == figma.currentPage)
            yield figma.currentPage.loadAsync();
        if (point != undefined && point != null && !point.removed && !point.parent.removed)
            point.parent.appendChild(point);
    } if (n2749 && !abort) {
        x1514(j2729, h2730);
        j2729 = [];
        h2730 = [];
        if (e270 && m3629.length > 0) {
            figma.viewport.scrollAndZoomIntoView(m3629);
            const bounds = c1538(m3629);
            figma.viewport.zoom = Math.min(figma.viewport.bounds.width * figma.viewport.zoom / bounds.width - 0.05, figma.viewport.bounds.height * figma.viewport.zoom / bounds.height - 0.05);
        }
    } yield c2726('returnObjectUpdate', { s2731: s2731, g2732: g2732 }); });
}
function b1535(a1517) { switch (a1517[a1386]) {
    case h1223: return q2699(a1517);
    case x1226: return v2761(a1517);
    case c1229: return y2762(a1517);
    case s1241: return d4012(a1517);
    case c1244: return a2702(a1517);
    case t1247: return v2705(a1517);
    case o1250: return y4011(a1517);
    case t1254: return y2763(a1517);
    case q1266: return b2764(a1517);
    case v1289: return f2765(a1517);
    case x1269: return j2766(a1517);
    case c1272: return f2767(a1517);
} }
function k1536(a1517) {
    return __awaiter(this, void 0, void 0, function* () { (() => __awaiter(this, void 0, void 0, function* () { const c1518 = yield p1533(a1517); const width = c1518.width; const height = c1518.height; c1518.remove(); h1531({ cmd: 'uiForwardToGenerator', msg: { cmd: 'returnFigGetObjectSize', objectId: a1517[j1388], width: width, height: height } }); }))(); });
}
function s1537(c1518) { c1518.setPluginData('type', ''); c1518.setPluginData('nodeId', ''); c1518.setPluginData('userId', ''); c1518.setPluginData('sessionId', ''); c1518.setPluginData('objectId', ''); c1518.setPluginData('isCenter', ''); c1518.setPluginData('retain', ''); }
function c1538(objects) { const bounds = { left: 0, top: 0, right: 0, bottom: 0 }; for (const r111 of objects) {
    if (r111.x < bounds.left || bounds.left == bounds.right)
        bounds.left = r111.x;
    if (r111.y < bounds.top || bounds.top == bounds.bottom)
        bounds.top = r111.y;
    if (r111.x + r111.width > bounds.right || bounds.left == bounds.right)
        bounds.right = r111.x + r111.width;
    if (r111.y + r111.height > bounds.bottom || bounds.top == bounds.bottom)
        bounds.bottom = r111.y + r111.height;
} return { x: bounds.left, y: bounds.top, width: bounds.right - bounds.left, height: bounds.bottom - bounds.top }; }
function figExport(objectIds, scale, format, suffix) {
    return __awaiter(this, void 0, void 0, function* () { yield figma.currentPage.loadAsync(); for (const objId of objectIds) {
        let c1518 = figma.currentPage.children.find(o => !o.removed && o.getPluginData('userId') == figma.currentUser.id && o.getPluginData('objectId') == objId);
        if (!c1518)
            continue;
        const settings = { constraint: { type: 'SCALE', value: scale }, format: format == 0 ? 'PNG' : 'JPG', suffix: suffix };
        yield c1518.exportAsync(settings);
    } });
}
const y2768 = [];
const f2769 = [];
function z1539(l1540, x1541) { const effects = []; for (const effect of l1540) {
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
                if (x1541 && !isNaN(spread))
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
function a2689(c1518, a1517, phantom = true) { k1544(c1518, a1517); k2690(c1518, a1517, phantom); l2691(c1518, a1517); c1518.opacity = a1517[j1410]; c1518.blendMode = a1517[r1411]; const maskType = a1517[f1412]; c1518.isMask = maskType > 0; if (c1518.isMask) {
    switch (maskType) {
        case 1:
            c1518.maskType = 'ALPHA';
            break;
        case 2:
            c1518.maskType = 'VECTOR';
            break;
        case 3:
            c1518.maskType = 'LUMINANCE';
            break;
    }
} if (c1518.isMask && c1518.fills.length == 0 && c1518.strokes.length == 0)
    c1518.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 }, opacity: 1, blendMode: 'NORMAL' }]; }
function l2691(c1518, a1517) { if (!!a1517[b1399] && !isEmpty(a1517[b1399])) {
    c1518.fills = p959(a1517[b1399]);
    if (y2768.includes(c1518))
        r946(y2768, c1518);
}
else
    c1518.fills = []; }
function k2690(c1518, a1517, phantom = true) { if (a1517[w1400] != null && !isEmpty(a1517[w1400])) {
    o1543(c1518, p959(a1517[w1400]), a1517[l1401], a1517[u1402], a1517[d1403], a1517[s1404], a1517[j1405], z2692(a1517[l1406]));
    if (a1517[m1408])
        c1518.setPluginData('dashes', a1517[l1406]);
    if (y2768.includes(c1518))
        r946(y2768, c1518);
    if (a1517[m1408])
        m952(f2769, c1518);
}
else if (isEmpty(a1517[b1399]) && isEmpty(a1517[w1400]) && !a1517[f1412] && phantom) {
    o1546(c1518);
    m952(y2768, c1518);
}
else
    c1518.strokes = []; }
function z2692(a1542) { a1542 = a1542; a1542 = g957(a1542, ','); a1542 = f958(a1542, ','); a1542 = a1542.trim(); return a1542 == '' ? [] : a1542.split(',').map(s => Math.max(0, parseFloat(s))); }
function k2693(a1542) { a1542 = a1542; a1542 = g957(a1542, ','); a1542 = f958(a1542, ','); a1542 = a1542.trim(); return a1542 == '' ? [] : a1542.split(',').map(s => Math.max(0, parseFloat(s) / n2695)); }
function o1543(c1518, fills, weight, align, join, miterLimit, cap, dashes = []) { c1518.strokes = fills; c1518.strokeWeight = Math.max(0, weight); c1518.strokeAlign = align; c1518.strokeJoin = join; const miterAngle = miterLimit / 360 * Tau; const s2770 = 1 / Math.sin(miterAngle / 2); c1518.strokeMiterLimit = Math.min(Math.max(0, s2770), 16); c1518.strokeCap = cap; c1518.dashPattern = dashes; }
function k1544(c1518, a1517) { if (!!a1517[q1407] && !isEmpty(a1517[q1407])) {
    const x1541 = a1517[a1386] == h1223 || a1517[a1386] == c1229 || a1517[a1386] == c1272;
    c1518.effects = z1539(a1517[q1407], x1541);
}
else
    c1518.effects = []; }
function v1545() { for (const r111 of y2768) {
    if (r111.removed)
        r946(y2768, r111);
    else
        o1546(r111);
} }
function o1546(r111) { figma.currentPage.loadAsync().then(() => { const back = figma.currentPage.backgrounds.find(b => b.type == 'SOLID'); let phantomColor; if (back) {
    const l = back.color.r * 0.2126 + back.color.g * 0.7152 + back.color.b * 0.0722;
    phantomColor = l > 0.5 ? { r: 0, g: 0, b: 0 } : { r: 1, g: 1, b: 1 };
}
else
    phantomColor = { r: 1, g: 0, b: 1 }; o1543(r111, [{ type: 'SOLID', color: phantomColor, opacity: 0.5 }], 1 / n2695, 'CENTER', 'MITER', 1, 'NONE', [1 / n2695, 2 / n2695]); }); }
function a1547() { for (const c1518 of f2769) {
    if (c1518.removed)
        r946(f2769, c1518);
    else
        j1548(c1518);
} }
function j1548(c1518) { c1518.strokeWeight = Math.max(0, 1.5 / n2695); if (h926(c1518.getPluginData('isCenter'))) {
    const path = c1518.vectorPaths[0];
    const parts = path.data.split(' ');
    let t = { x: parseFloat(parts[1]), y: parseFloat(parts[2]) };
    let c = { x: parseFloat(parts[4]), y: parseFloat(parts[5]) };
    let r = { x: parseFloat(parts[7]), y: parseFloat(parts[8]) };
    const a = 2;
    const b = 0.05;
    const f = 1 - Math.pow(1 - Math.min(n2695, 1), a) / Math.pow(a, b);
    t = n898(c, g900(u885(u903(t, c)), objectCenterSize / f));
    r = n898(c, g900(u885(u903(r, c)), objectCenterSize / f));
    parts[1] = t.x;
    parts[2] = t.y;
    parts[4] = c.x;
    parts[5] = c.y;
    parts[7] = r.x;
    parts[8] = r.y;
    const h2771 = { windingRule: path.windingRule, data: parts.join(' ') };
    c1518.vectorPaths = [h2771];
} const dashes = c1518.getPluginData('dashes'); if (dashes != '')
    c1518.dashPattern = k2693(dashes); }
function p1582(nodeId, px, py) { figma.getLocalPaintStylesAsync().then(_styles => { const styles = new Array(); for (const r168 of _styles) {
    const _nodeId = r168.getPluginData('nodeId');
    const _existing = r168.getPluginData('existing');
    const existing = !!_existing;
    const style = { id: r168.id, nodeId: _nodeId, name: r168.name, existing: existing, paints: new Array() };
    let onlyPaint = true;
    for (const h2773 of r168.paints) {
        if (h2773.type == 'SOLID') {
            style.paints.push([h2773.color.r, h2773.color.g, h2773.color.b, h2773.opacity]);
        }
        else {
            onlyPaint = false;
            break;
        }
    }
    if (onlyPaint)
        styles.push(style);
} h1531({ cmd: 'uiReturnFigGetAllLocalColorStyles', nodeId: nodeId, px: px, py: py, styles: JSON.stringify(styles) }); }); }
function v1583(nodeId, styleId) { figma.getLocalPaintStylesAsync().then(l1585 => { if (styleId != NULL)
    p1584(l1585, nodeId, styleId);
else
    j1586(l1585, nodeId); }); }
function p1584(l1585, nodeId, styleId, clearExisting = true) { const m2772 = a2718.find(a => a.nodeId == nodeId); if (m2772 && clearExisting)
    j1586(l1585, nodeId); const j1590 = l1585.find(s => s.id == styleId); u955(!!j1590, 'figStyle should be found here'); j1590.setPluginData('type', r1220); j1590.setPluginData('nodeId', nodeId); j1590.setPluginData('existing', q940(true)); a2718.push({ nodeId: nodeId, existing: true, styles: [j1590] }); return j1590; }
function j1586(l1585, nodeId) { const j1590 = l1585.find(s => s.getPluginData('nodeId') == nodeId); u955(!!j1590, 'figStyle should be found here'); if (j1590) {
    j1590.setPluginData('type', NULL);
    j1590.setPluginData('nodeId', NULL);
    j1590.setPluginData('existing', NULL);
    r948(a2718, a => a.nodeId == nodeId);
} return j1590; }
function j1587(styles, a1591) { const j1590 = figma.createPaintStyle(); j1590.setPluginData('type', a1591[a1386]); j1590.setPluginData('nodeId', a1591[x1387]); j1590.name = a1591[r1391]; setStylePaints(j1590, a1591); styles.push(j1590); h1531({ cmd: 'uiSetStyleId', nodeId: a1591[x1387], styleId: j1590.id }); return j1590; }
function u1588(msg) { let p2750 = NULL; let m2772; for (const a1591 of msg.styles) {
    if (a1591[x1387] != p2750) {
        p2750 = a1591[x1387];
        m2772 = a2718.find(a => a.nodeId == a1591[x1387]);
        if (!m2772) {
            m2772 = { nodeId: a1591[x1387], styles: [] };
            a2718.push(m2772);
        }
    }
    else
        m2772 = null;
    const j1590 = m2772.styles[0];
    figma.getLocalPaintStylesAsync().then(l1585 => { const localStyle = l1585.find(s => s.getPluginData('nodeId') == a1591[x1387]); if (isValid(j1590) && !isValid(localStyle)) {
        x941(m2772.styles, j1590);
    } const existing = isValid(j1590) && isValid(localStyle) && j1590.getPluginData('existing'); if (!isValid(j1590) || !isValid(localStyle)) {
        if (!existing) {
            u1521 = true;
            v1583(a1591[x1387], a1591[h1389]);
        }
    }
    else if (isValid(j1590) && j1590.getPluginData('type') == a1591[a1386]) {
        u1521 = true;
        m1589(localStyle, a1591);
    } });
} }
function m1589(j1590, a1591) { setStylePaints(j1590, a1591); j1590.name = a1591[r1391]; }
function getStylePaints(stylePaints) { const paints = new Array(); for (const h2773 of stylePaints) {
    const fill = h2773[1].split(' ');
    switch (h2773[0]) {
        case 'SOLID':
            paints.push({ type: 'SOLID', color: { r: Math.min(Math.max(0, parseFloat(fill[0]) / 0xff), 1), g: Math.min(Math.max(0, parseFloat(fill[1]) / 0xff), 1), b: Math.min(Math.max(0, parseFloat(fill[2]) / 0xff), 1) }, opacity: Math.min(Math.max(0, parseFloat(fill[3]) / 100), 1) });
            break;
    }
} return paints; }
function setStylePaints(j1590, a1591) { if (!isEmpty(a1591[p1393]))
    j1590.paints = getStylePaints(a1591[p1393]);
else
    j1590.paints = []; }
function f1605(nodeId, px, py) {
    return __awaiter(this, void 0, void 0, function* () { figma.variables.getLocalVariablesAsync().then((l2774) => __awaiter(this, void 0, void 0, function* () { const variables = new Array(); for (const _var of l2774) {
        const collection = yield figma.variables.getVariableCollectionByIdAsync(_var.variableCollectionId);
        const variable = { id: _var.id, resolvedType: _var.resolvedType, name: _var.name, collectionName: collection.name };
        variables.push(variable);
    } figma.variables.getLocalVariableCollectionsAsync().then((collections) => __awaiter(this, void 0, void 0, function* () { h1531({ cmd: 'uiReturnFigGetAllLocalVariables', nodeId: nodeId, px: px, py: py, variables: JSON.stringify(variables), nCollections: collections.length }); })); })); });
}
function x1606(varIds) {
    return __awaiter(this, void 0, void 0, function* () { const l2774 = yield figma.variables.getLocalVariablesAsync(); const variables = varIds.map(id => l2774.find(v => v.id == id)); let values = []; for (let i = 0; i < varIds.length; i++) {
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
function v1607(nodeId, varId) { figma.variables.getLocalVariablesAsync().then(l2774 => { figLinkVariableAsync(l2774, nodeId, varId); }); }
function figUpdateVariableAsync(varId, value) {
    return __awaiter(this, void 0, void 0, function* () { figma.variables.getLocalVariablesAsync().then((l2774) => __awaiter(this, void 0, void 0, function* () { let variable = l2774.find(v => v.id == varId); if (!variable)
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
function figLinkVariableAsync(l2774, nodeId, varId) {
    return __awaiter(this, void 0, void 0, function* () { let variable = l2774.find(v => v.id == varId); if (!variable)
        return null; const [resolvedVar, values] = yield figGetResolvedVariableValuesAsync(variable); h1531({ cmd: 'uiReturnFigLinkNodeToVariable', nodeId: nodeId, variableId: resolvedVar ? resolvedVar.id : NULL, variableName: resolvedVar ? resolvedVar.name : '', resolvedType: resolvedVar ? resolvedVar.resolvedType : NULL, values: values }); return resolvedVar; });
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
function z1592(tl, tr, bl) { let vr = point(tr.x - tl.x, tr.y - tl.y); let vb = point(bl.x - tl.x, bl.y - tl.y); let sx = vr.x; let sy = vb.y; let kx = -vr.y; let ky = -vb.x; let dx = -tl.x; let dy = -tl.y; const _sx = kx / nozero(sx); const _sy = ky / nozero(sy); let i4193 = p888([[1, _sy, 0], [_sx, 1, 0], [0, 0, 1]], j892(dx, dy)); i4193 = u890(i4193); const a = t882(vr); if (a > Tau / 4 && a < Tau * 3 / 4)
    i4193 = p888(i4193, j892(0, 0, 1, 1, Tau / 2)); if (determinant(i4193) < 0)
    i4193 = p888(i4193, j892(0, 0, -1, 1, 0)); return i4193; }
function r1593(c1518, tl, tr, bl) { const i4193 = z1592(tl, tr, bl); c1518.relativeTransform = [i4193[0], i4193[1]]; }
function d1594(c1518, a1517, setSize = true, noHeight = 0.01) { if (!a1517[q1395] || !a1517[v1396] || !a1517[v1397])
    return; const xp0 = a1517[q1395]; const xp1 = a1517[v1396]; const xp2 = a1517[v1397]; r1593(c1518, xp0, xp1, xp2); if (setSize) {
    const b893 = distv(xp0, xp1);
    const y894 = distv(xp0, xp2);
    const height = a1517[a1386] == t1247 ? a1517[m1430] : a1517[d1417];
    if (!c1518.removed) {
        c1518.resizeWithoutConstraints(Math.max(0.01, b893), height ? Math.max(0.01, y894) : noHeight);
    }
} }
function a1595(q2687, q2688) { if (q2687.removed)
    return; q2687.resizeWithoutConstraints(0.01, 0.01); q2687.setPluginData('actualX', q2688[n1413].toString()); q2687.setPluginData('actualY', q2688[e1415].toString()); q2687.x = q2688[n1413]; q2687.y = q2688[e1415]; q2687.rotation = q2688[r1409] ? 45 : 0; }
function q1596(q2687) { if (!q2687.removed)
    q2687.resizeWithoutConstraints(0.01, 0.01); }
function f2765(genBool) { return true; }
function g2736(genBool, addProps, transform) {
    return __awaiter(this, void 0, void 0, function* () { let objects = []; for (const r111 of genBool[FO_BOOLEAN_CHILDREN])
        yield p1533(r111, o => objects = [...objects, o], false); yield figma.currentPage.loadAsync(); let figBool = null; if (!isEmpty(objects)) {
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
        i2742(figBool, genBool, addProps, transform);
    } return figBool; });
}
function i2742(figBool, genBool, addProps, transform) {
    return __awaiter(this, void 0, void 0, function* () { if (genBool[FO_BOOLEAN_CHILDREN].length == 0) {
        figBool.remove();
        return;
    } yield v2719(figBool, genBool[FO_BOOLEAN_CHILDREN], genBool[FO_BOOLEAN_CHILDREN].length, -1, [], false, false, false, false, true); const hasProps = genBool[b1399].length > 0 || genBool[w1400].length > 0 || genBool[q1407].length > 0; a2689(figBool, genBool, !hasProps && addProps); });
}
function y2762(y2753) { return y2753[n1413] != null && !isNaN(y2753[n1413]) && y2753[e1415] != null && !isNaN(y2753[e1415]) && y2753[w1416] != null && !isNaN(y2753[w1416]) && y2753[d1417] != null && !isNaN(y2753[d1417]) && y2753[z1419] != null && !isNaN(y2753[z1419]) && y2753[h1426] != null && !isNaN(y2753[h1426]) && y2753[p1432] != null && !isNaN(y2753[p1432]) && y2753[z1436] != null && !isNaN(y2753[z1436]); }
function y2775(y2753, addProps, transform) { if (!y2762(y2753))
    return null; const x2754 = figma.createEllipse(); u2776(x2754, y2753, addProps, transform, true); return x2754; }
function u2776(x2754, y2753, addProps, transform, isValid = false) { if (!isValid && !y2762(y2753))
    return; x2777(x2754, y2753, transform); if (m2752.includes(x2754))
    n2684(x2754);
else
    a2689(x2754, y2753, addProps); }
function x2777(x2754, y2753, transform) { x2754.cornerRadius = y2753[z1419]; const start = y2753[h1426] / 360 * (Math.PI * 2); const sweep = y2753[p1432] / 100 * (Math.PI * 2); x2754.arcData = { startingAngle: start, endingAngle: start + sweep, innerRadius: Math.min(Math.max(0, y2753[z1436] / 100), 1) }; if (transform)
    d1594(x2754, y2753); }
function f2767(u2755) { return u2755[n1413] != null && !isNaN(u2755[n1413]) && u2755[e1415] != null && !isNaN(u2755[e1415]) && u2755[w1416] != null && !isNaN(u2755[w1416]) && u2755[d1417] != null && !isNaN(u2755[d1417]) && u2755[d1425] != null && !isNaN(u2755[d1425]); }
function y2738(u2755, addProps, transform) {
    return __awaiter(this, void 0, void 0, function* () { if (!f2767(u2755))
        return null; const c2756 = figma.createFrame(); c2756.expanded = false; if (c2756) {
        t2778(c2756, u2755, addProps, transform);
        let objects = [];
        for (const r111 of u2755[y1431])
            yield p1533(r111, o => objects = [...objects, o]);
        for (const r111 of objects)
            c2756.appendChild(r111);
    } return c2756; });
}
function c2744(c2756, u2755, addProps, transform) { t2778(c2756, u2755, addProps, transform); v2719(c2756, u2755[y1431], u2755[y1431].length); }
function t2778(c2756, u2755, addProps, transform) { c2756.cornerRadius = u2755[d1425]; if (transform)
    d1594(c2756, u2755); a2689(c2756, u2755, addProps && u2755[y1431].length == 0); }
function j2766(e2757) { return true; }
function q2737(e2757) {
    return __awaiter(this, void 0, void 0, function* () { let objects = []; for (const r111 of e2757[v1414])
        yield p1533(r111, o => objects = [...objects, o]); yield figma.currentPage.loadAsync(); const v2758 = !isEmpty(objects) ? figma.group(objects, figma.currentPage) : null; if (v2758) {
        v2758.expanded = false;
        h2743(v2758, e2757);
    } return v2758; });
}
function h2743(v2758, e2757) { if (e2757[v1414].length == 0) {
    v2758.remove();
    return;
} v2719(v2758, e2757[v1414], e2757[v1414].length); k1544(v2758, e2757); }
function v2761(b2759) { return b2759[n1413] != null && !isNaN(b2759[n1413]) && b2759[e1415] != null && !isNaN(b2759[e1415]) && b2759[w1416] != null && !isNaN(b2759[w1416]); }
function i2779(b2759, addProps, transform) { if (!v2761(b2759))
    return null; const s2760 = figma.createLine(); c2780(s2760, b2759, addProps, transform, true); return s2760; }
function c2780(s2760, b2759, addProps, transform, isValid = false) { if (!isValid && !v2761(b2759))
    return; if (transform)
    d1594(s2760, b2759, true, 0); a2689(s2760, b2759, addProps); }
var m2752 = [];
function y4011(q2688) { return q2688[n1413] != null && !isNaN(q2688[n1413]) && q2688[e1415] != null && !isNaN(q2688[e1415]); }
function p2682(q2688) { const q2687 = q2688[r1409] ? figma.createRectangle() : figma.createEllipse(); if (!y4011(q2688))
    return q2687; if (m2752.includes(q2687))
    y2686(q2687, q2688);
else
    s2739(q2687, q2688); return q2687; }
function s2739(q2687, q2688) { a1595(q2687, q2688); d2685(q2687); }
function b2683() { h1531({ cmd: 'uiUpdateZoom', zoom: figma.viewport.zoom }); for (const point of m2752)
    n2684(point); }
function n2684(q2687) { q1596(q2687); d2685(q2687); }
function y2686(q2687, q2688) { a1595(q2687, q2688); d2685(q2687); }
function d2685(q2687) { if (q2687.removed)
    return; figma.currentPage.loadAsync().then(() => { const isCenter = h926(q2687.getPluginData('isCenter')); const m2694 = figma.currentPage.selection.includes(q2687); const color = isCenter ? [0xf2, 0x48, 0x22] : m2694 ? [12, 140, 233] : [255, 255, 255]; const border = isCenter ? [255, 255, 255] : m2694 ? [255, 255, 255] : [12, 140, 233]; q2687.fills = p959([['SOLID', color[0], color[1], color[2], 100]]); const effects = []; effects.push(...z1539([['DROP_SHADOW', border[0] / 255, border[1] / 255, border[2] / 255, 1, 0, 0, 0, (isCenter ? 3 : m2694 ? 5 : 3.6) / n2695, 'NORMAL', true, true]], true)); effects.push(...z1539([['DROP_SHADOW', color[0] / 255, color[1] / 255, color[2] / 255, 1, 0, 0, 0, (m2694 ? 4 : 2.4) / n2695, 'NORMAL', true, true]], true)); q2687.effects = effects; }); }
function d4012(genPoly) { return genPoly[n1413] != null && !isNaN(genPoly[n1413]) && genPoly[e1415] != null && !isNaN(genPoly[e1415]) && genPoly[w1416] != null && !isNaN(genPoly[w1416]) && genPoly[d1417] != null && !isNaN(genPoly[d1417]) && genPoly[q1422] != null && !isNaN(genPoly[q1422]) && genPoly[c1428] != null && !isNaN(genPoly[c1428]); }
function s2696(genPoly, addProps, transform) { if (!d4012(genPoly))
    return null; const figPoly = figma.createPolygon(); m2697(figPoly, genPoly, addProps, transform, true); return figPoly; }
function m2697(figPoly, genPoly, addProps, transform, isValid = false) { if (!isValid && !d4012(genPoly))
    return; figPoly.cornerRadius = genPoly[q1422]; figPoly.pointCount = Math.max(3, genPoly[c1428]); if (transform)
    d1594(figPoly, genPoly); a2689(figPoly, genPoly, addProps); }
function q2699(t2698) { return t2698[n1413] != null && !isNaN(t2698[n1413]) && t2698[e1415] != null && !isNaN(t2698[e1415]) && t2698[w1416] != null && !isNaN(t2698[w1416]) && t2698[d1417] != null && !isNaN(t2698[d1417]) && t2698[o1418] != null && !isNaN(t2698[o1418]); }
function x2700(t2698, addProps, transform) { if (!q2699(t2698))
    return null; const figRect = figma.createRectangle(); i2701(figRect, t2698, addProps, transform, true); return figRect; }
function i2701(figRect, t2698, addProps, transform, isValid = false) { if (!isValid && !q2699(t2698))
    return; const foundCorners = t2698[q1407].findIndex(e => e[0] == 'ROUND_CORNERS'); if (foundCorners > -1) {
    const corners = t2698[q1407][foundCorners];
    figRect.topLeftRadius = corners[1];
    figRect.topRightRadius = corners[2];
    figRect.bottomLeftRadius = corners[3];
    figRect.bottomRightRadius = corners[4];
}
else
    figRect.cornerRadius = t2698[o1418]; if (transform)
    d1594(figRect, t2698); a2689(figRect, t2698, addProps); const foundSides = t2698[q1407].findIndex(e => e[0] == 'STROKE_SIDES'); if (foundSides > -1) {
    const sides = t2698[q1407][foundSides];
    figRect.strokeWeight = 0;
    figRect.strokeTopWeight = sides[1];
    figRect.strokeLeftWeight = sides[2];
    figRect.strokeRightWeight = sides[3];
    figRect.strokeBottomWeight = sides[4];
} }
function a2702(m2712) { return m2712[n1413] != null && !isNaN(m2712[n1413]) && m2712[e1415] != null && !isNaN(m2712[e1415]) && m2712[w1416] != null && !isNaN(m2712[w1416]) && m2712[d1417] != null && !isNaN(m2712[d1417]) && m2712[a1423] != null && !isNaN(m2712[a1423]) && m2712[b1429] != null && !isNaN(m2712[b1429]) && m2712[i1434] != null && !isNaN(m2712[i1434]); }
function y2703(m2712, addProps, transform) { if (!a2702(m2712))
    return null; const a2713 = figma.createStar(); c2704(a2713, m2712, addProps, transform, true); return a2713; }
function c2704(a2713, m2712, addProps, transform, isValid = false) { if (!isValid && !a2702(m2712))
    return; a2713.cornerRadius = m2712[a1423]; a2713.pointCount = m2712[b1429]; a2713.innerRadius = Math.min(Math.max(0, m2712[i1434] / 100), 1); if (transform)
    d1594(a2713, m2712); a2689(a2713, m2712, addProps); }
const b4255 = [];
function v2705(i2709) { return i2709[l1435] != null && i2709[n1413] != null && !isNaN(i2709[n1413]) && i2709[e1415] != null && !isNaN(i2709[e1415]) && i2709[w1416] != null && !isNaN(i2709[w1416]) && i2709[d1417] != null && !isNaN(i2709[d1417]) && i2709[l1437] != null && i2709[l1437] != NULL && i2709[w1438] != null && !isNaN(i2709[w1438]); }
function t2706(i2709, addProps, transform) { if (!v2705(i2709))
    return null; const d2781 = figma.createText(); e2707(d2781, i2709, addProps, transform, true); return d2781; }
function e2707(d2781, i2709, addProps, transform, isValid = false) { if (!isValid && !v2705(i2709))
    return null; const fontName = { family: i2709[l1437], style: i2709[c1439] }; try {
    if (!b4255.includes(fontName)) {
        figma.loadFontAsync(fontName).then(() => { b4255.push(fontName); i2708(d2781, i2709, fontName, addProps, transform); });
    }
    else {
        i2708(d2781, i2709, fontName, addProps, transform);
    }
}
catch (e) {
    m956(e);
} }
function i2708(d2781, i2709, fontName, addProps, transform) { d2781.fontName = fontName; d2781.fontSize = Math.max(1, i2709[w1438]); d2781.characters = i2709[l1435]; d2781.lineHeight = { unit: 'PERCENT', value: i2709[k1442] }; d2781.letterSpacing = { unit: 'PERCENT', value: i2709[r1443] }; if (i2709[z1440] == 0)
    d2781.textAlignHorizontal = 'LEFT';
else if (i2709[z1440] == 1)
    d2781.textAlignHorizontal = 'CENTER';
else if (i2709[z1440] == 2)
    d2781.textAlignHorizontal = 'RIGHT';
else if (i2709[z1440] == 3)
    d2781.textAlignHorizontal = 'JUSTIFIED'; if (i2709[k1441] == 0)
    d2781.textAlignVertical = 'TOP';
else if (i2709[k1441] == 1)
    d2781.textAlignVertical = 'CENTER';
else if (i2709[k1441] == 2)
    d2781.textAlignVertical = 'BOTTOM'; if (transform)
    d1594(d2781, i2709); a2689(d2781, i2709, addProps); if (i2709[q1424] == 0 && i2709[m1430] == 0)
    d2781.textAutoResize = 'WIDTH_AND_HEIGHT';
else if (i2709[q1424] == 0)
    d2781.textAutoResize = 'HEIGHT';
else
    d2781.textAutoResize = 'NONE'; }
function b2764(j2714) { return true; }
function d2735(j2714, addProps, transform) { if (!b2764(j2714))
    return null; const z2715 = figma.createVector(); u2741(z2715, j2714, addProps, transform, true); return z2715; }
function u2741(z2715, j2714, addProps, transform, isValid = false) { if (!isValid && !b2764(j2714))
    return; z2715.setVectorNetworkAsync(j2714[p1420]); if (transform)
    d1594(z2715, j2714, false); a2689(z2715, j2714, addProps); }
function y2763(y2710) { return y2710[w1427] != null && !isNaN(y2710[w1427]) && y2710[j1433] != null && !isNaN(y2710[j1433]); }
function c2734(y2710, addProps, transform) { const q2711 = figma.createVector(); k2740(q2711, y2710, addProps, transform, true); return q2711; }
function k2740(q2711, y2710, addProps, transform, isValid = false) { if (!isValid && !y2763(y2710))
    return; q2711.vectorPaths = [{ windingRule: y2710[w1427] == 1 ? 'NONZERO' : 'EVENODD', data: y2710[t1421] }]; q2711.cornerRadius = y2710[j1433]; if (transform)
    d1594(q2711, y2710, false); a2689(q2711, y2710, addProps); }
