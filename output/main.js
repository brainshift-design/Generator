var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function p1048(key, tag) { return key.substring(0, tag.length + 1) == tag + ' '; }
function v1049(key, tag) { return key.substring(tag.length + 1); }
function f1050(key) { return p1048(key, i877); }
function n1051(key) { return p1048(key, g875); }
function z1052(key) { return p1048(key, n876); }
function w1053(key) { return v1049(key, i877); }
function o1054(key) { return v1049(key, g875); }
function r1055(key) { return v1049(key, n876); }
const generatorVersion = 432;
const l869 = 2147483647;
const NULL = '';
const l870 = '  ';
const y871 = '    ';
const f872 = '\n';
const f873 = '◦ G •';
const v874 = f873 + ' ';
const g875 = 'G_NODE';
const n876 = 'G_CONN';
const i877 = 'G_PAGE';
const p878 = 'G_TEMP';
const minWindowWidth = 602;
const minWindowHeight = 39;
const identity = Object.freeze([[1, 0, 0], [0, 1, 0], [0, 0, 1]]);
const Epsilon = 0.0000001;
const Tau = Math.PI * 2;
var enableAsserts = false;
function f879(x, eps = 0.000000001) { return Math.abs(x) < eps ? 0 : x; }
function nozero(x, eps = 0.000000001) { return x != 0 ? x : (x < 0 ? -eps : eps); }
function c880(v, eps = 0.000000001) { return point(nozero(v.x, eps), nozero(v.y, eps)); }
function equal(a, b, eps = 0.000000001) { return Math.abs(b - a) < eps; }
function sqr(x) { return x * x; }
;
function cube(x) { return x * x * x; }
;
function w881(f) { return Math.floor(f) | 0; }
function p882(x) { x = w881(x); x--; x |= x >> 1; x |= x >> 2; x |= x >> 4; x |= x >> 8; x |= x >> 16; x |= x >> 32; return ++x; }
function gcd(a, b) { let temp; while (1) {
    temp = a % b;
    if (temp == 0)
        return b;
    a = b;
    b = temp;
} }
function distv(p1, p2) { const dx = p2.x - p1.x; const dy = p2.y - p1.y; return Math.sqrt(dx * dx + dy * dy); }
function w883(v) { let angle = Math.atan2(v.y, v.x); if (angle < 0)
    angle += Tau; return angle; }
function anglev2(v1, v2) { return anglev2_(v1.x, v1.y, v2.x, v2.y); }
function anglev2_(x1, y1, x2, y2) { const dx = x2 - x1; const dy = y2 - y1; let angle = Math.atan2(dy, dx); if (angle < 0)
    angle += Tau; return angle; }
function x885(v) { return Math.sqrt(v.x * v.x + v.y * v.y); }
function lengthv_(x, y) { return Math.sqrt(x * x + y * y); }
function u886(v) { return point(v.x == 0 ? 0 : v.x / x885(v), v.y == 0 ? 0 : v.y / x885(v)); }
function dotv(v1, v2) { return v1.x * v2.x + v1.y * v2.y; }
function b887(a1, a2) { let diff = a2 - a1; while (diff <= -Tau / 2)
    diff += Tau; while (diff > Tau / 2)
    diff -= Tau; return diff; }
function p888(v, m) { let v3 = [v.x, v.y, 1]; let r = t948(v3, m); return point(r[0], r[1]); }
function q889(...mm) { c952(mm.length > 0, 'mulm3m3() must take at least one argument'); let result = clone(mm[0]); for (let a = 1; a < mm.length; a++) {
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
function d890(m, s) { for (let i = 0; i < 3; i++)
    for (let j = 0; j < 3; j++)
        m[i][j] /= s; return m; }
function adjugate(m) { return cofactor(transpose(m)); }
function transpose(m) { return [[m[0][0], m[1][0], m[2][0]], [m[0][1], m[1][1], m[2][1]], [m[0][2], m[1][2], m[2][2]]]; }
function cofactor(m) { return [[m[1][1] * m[2][2] - m[2][1] * m[1][2], -(m[1][0] * m[2][2] - m[2][0] * m[1][2]), m[1][0] * m[2][1] - m[2][0] * m[1][1]], [-(m[0][1] * m[2][2] - m[2][1] * m[0][2]), m[0][0] * m[2][2] - m[2][0] * m[0][2], -(m[0][0] * m[2][1] - m[2][0] * m[0][1])], [m[0][1] * m[1][2] - m[1][1] * m[0][2], -(m[0][0] * m[1][2] - m[1][0] * m[0][2]), m[0][0] * m[1][1] - m[1][0] * m[0][1]]]; }
function determinant(m) { return m[0][0] * (m[1][1] * m[2][2] - m[1][2] * m[2][1]) - m[0][1] * (m[1][0] * m[2][2] - m[2][0] * m[1][2]) + m[0][2] * (m[1][0] * m[2][1] - m[2][0] * m[1][1]); }
function p891(m) { return d890(adjugate(m), determinant(m)); }
function v892(angle) { const cosA = f879(Math.cos(angle)); const sinA = f879(Math.sin(angle)); return [[cosA, sinA, 0], [-sinA, cosA, 0], [0, 0, 1]]; }
function z893(x = 0, y = 0, scaleX = 1, scaleY = 1, angle = 0, skewX = 0, skewY = 0) { const cosA = Math.cos(angle); const sinA = Math.sin(angle); return [[scaleX * cosA - skewY * sinA, -skewX * cosA + scaleY * sinA, x], [skewY * cosA + scaleX * sinA, scaleY * cosA + skewX * sinA, y], [0, 0, 1]]; }
function q894(v1, v2) { return v1.x * v2.y - v1.y * v2.x; }
function o895(v1, v2) { return point(v1.x + v2.x, v1.y + v2.y); }
function sqrv(v) { return e896(v, v); }
function e896(v1, v2) { return point(v1.x * v2.x, v1.y * v2.y); }
function v897(v, s) { return point(v.x * s, v.y * s); }
function i898(v1, v2) { return point(v1.x / v2.x, v1.y / v2.y); }
function h899(v, s) { return point(v.x / s, v.y / s); }
function r900(v1, v2) { return point(v1.x - v2.x, v1.y - v2.y); }
function g901(str) { return decodeURI(encodeURIComponent(str)); }
function g902(str) { return decodeURIComponent(encodeURI(str)); }
function v903(bytes) { let str = ''; for (let i = 0; i < bytes.length; i++)
    str += String.fromCharCode(bytes[i]); return str; }
function p904(str) { return Array.from(g902(str), c => c.charCodeAt(0)); }
function n905(array, size) { const newArray = new Uint8Array(size); o906(array, newArray); return newArray; }
function o906(src, dst) { h907(src, 0, src.length, dst, 0, dst.length); }
function h907(src, u908, e909, dst, j910, h911) { const size = Math.min(e909, h911); for (let i = 0; i < size; i++)
    dst[j910 + i] = src[u908 + i]; }
function m912(n913, f914) { if (n913.length != f914.length)
    return false; for (let i = 0; i < n913.length; i++) {
    if (n913[i] != f914[i])
        return false;
} return true; }
function p915(c916, v917) { return c916.findIndex(i => v917.includes(i)) > -1; }
function s918(list) { return list ? '<==' : '<--'; }
;
function r919(list) { return list ? '==>' : '-->'; }
;
function r920(nodeId) { return g875 + ' ' + nodeId; }
function j921(name) { return n876 + ' ' + name; }
function h922(name) { return i877 + ' ' + name; }
function f923(str) { return str.toLowerCase() == 'true' || str == '1'; }
function i924(w925, c926 = false) { return r931(w925.outputNodeId, w925.outputId, w925.outputOrder, w925.inputNodeId, w925.inputId, w925.list, c926); }
function g927(outputNodeId, outputId, outputOrder, inputNodeId, inputId) { return j921(outputNodeId + ' ' + outputId + ' ' + outputOrder + ' ' + inputNodeId + ' ' + inputId); }
function o928(a243) { return g927(a243.outputNodeId, a243.outputId, a243.outputOrder, a243.inputNodeId, a243.inputId); }
function h929(a243) { return g927(a243.output.node.id, a243.output.id, a243.outputOrder, a243.input.node.id, a243.input.id); }
function b930(a243, c926 = false) { return r931(a243.output.node.id, a243.output.id, a243.outputOrder, a243.input.node.id, a243.input.id, a243.list, c926); }
function r931(outputNodeId, outputId, outputOrder, inputNodeId, inputId, list, c926 = false) { const sp = c926 ? ' ' : '  '; const jsp = c926 ? '' : ' '; const arrow = sp + w935(typeof outputOrder == 'string' ? parseInt(outputOrder) : outputOrder) + r919(typeof list == 'string' ? f923(list) : list) + sp; const join = jsp + '.' + jsp; return outputNodeId + join + outputId + arrow + inputNodeId + join + inputId; }
function a932(pageId) { return h922(pageId); }
function i933(num) { const str = num.toString(); let sup = ''; for (const c of str)
    sup += o934(c); return sup; }
function o934(c) { switch (c) {
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
function w935(num) { const str = num.toString(); let sup = ''; for (const c of str)
    sup += q936(c); return sup; }
function q936(c) { switch (c) {
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
function t937(bool) { return bool ? 'true' : 'false'; }
function isValid(val) { return val != undefined && val != null; }
function isEmpty(array) { return array.length == 0; }
function g938(array, item) { v939(array, array.indexOf(item)); }
function v939(array, index) { if (index > -1 && index < array.length)
    array.splice(index, 1); }
function j940(array) { if (isEmpty(array))
    return null; let last = array.at(-1); array.splice(array.length - 1, 1); return last; }
function m941(array) { return array[array.length - 1]; }
function g942(array, from, to) { const item = array[from]; array.splice(from, 1); array.splice(to, 0, item); }
function k943(array, item) { const index = array.indexOf(item); if (index > -1)
    array.splice(index, 1); }
function h944(d2795, array) { for (const item of array) {
    const index = d2795.indexOf(item);
    if (index > -1)
        d2795.splice(index, 1);
} }
function w945(array, where) { const index = array.findIndex(where); if (index > -1)
    array.splice(index, 1); }
function c946(styleId) { return styleId.split(',')[0] + ','; }
function h947(points) { let o4031 = ''; if (points.length < 2)
    return o4031; o4031 += 'M'; o4031 += ' ' + f879(points[0].x); o4031 += ' ' + f879(points[0].y); for (let i = 1; i < points.length; i++) {
    o4031 += ' L' + ' ' + f879(points[i].x) + ' ' + f879(points[i].y);
} return o4031; }
function point(x, y) { return { x: x, y: y }; }
function t948(v, m) { let r = [0, 0, 0]; for (let i = 0; i < 3; i++)
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
function b949(array, item, equal = null) { if (equal) {
    if (Array.isArray(item))
        item.forEach(i => b949(array, i, equal));
    else if (!array.find(i => equal(i, item)))
        array.push(item);
}
else {
    if (Array.isArray(item))
        item.forEach(i => b949(array, i));
    else if (!array.includes(item))
        array.push(item);
} }
function m950(array, item, equal) { if (Array.isArray(item))
    item.forEach(i => m950(array, i, equal));
else if (!array.find(equal))
    array.push(item); }
function j951(array, item, except) { if (Array.isArray(item))
    item.forEach(i => j951(array, i, except));
else if (!array.find(except))
    array.push(item); }
function c952(...args) { if (enableAsserts) {
    console.assert(...args);
} }
function q953(...args) { if (enableAsserts)
    console.error(...args); }
function p954(str, trim) { while (str.length >= trim.length && str.substring(0, trim.length) == trim)
    str = str.substring(trim.length); return str; }
function i955(str, trim) { while (str.length >= trim.length && str.substring(str.length - trim.length) == trim)
    str = str.substring(0, str.length - trim.length); return str; }
function y956(i4091) { const fills = []; for (const fill of i4091) {
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
            const f4206 = [[0, 1, 0], [0.5, 0.5, 1], [1, 1, 1]];
            let f4207 = [[p0.x, p1.x, p2.x], [p0.y, p1.y, p2.y], [1, 1, 1]];
            f4207 = q889(f4206, p891(f4207));
            f4207 = [f4207[0], f4207[1]];
            const stops = [];
            for (const stop of fill[2]) {
                stops.push({ color: { r: Math.min(Math.max(0, stop[0]), 1), g: Math.min(Math.max(0, stop[1]), 1), b: Math.min(Math.max(0, stop[2]), 1), a: Math.min(Math.max(0, stop[3]), 1) }, position: stop[4] });
            }
            fills.push({ type: fill[0], gradientTransform: f4207, gradientStops: stops, blendMode: fill[3] });
            break;
        }
    }
} return fills; }
function b957(type) { return g1089.includes(type); }
const m1056 = 'LIST#';
const n1057 = 'NLIST#';
const z1058 = 'TLIST#';
const s1059 = 'SLIST#';
const d1060 = 'NULL';
const u1061 = 'VAR';
const r1062 = 'VARGRP';
const a1063 = 'FEEDBK';
const a1064 = 'REPT';
const w1065 = 'CACHE';
const l1066 = 'FRZ';
const x1067 = 'TIMER';
const c1068 = 'VNAME';
const w1352 = 'GVNAMES';
const x1353 = 'VNAMES';
const k1354 = 'ONAME';
const c1069 = 'CMB';
const b1070 = 'LSASIT';
const t1071 = 'EXTR';
const v1072 = 'SETP';
const e1073 = 'GETP';
const p1074 = 'SUBLST';
const r1075 = 'UNIQ';
const u1349 = 'RORD';
const q1350 = 'SHFTLST';
const v1076 = 'REVLST';
const x1351 = 'BUKLST';
const e1077 = 'SORT';
const t1078 = 'CLMN';
const n1079 = 'CELL';
const y1080 = 'LIST';
const u1081 = 'COUNT';
const OBJECT_COUNT = 'OBJCOUNT';
const l1082 = 'LCONT';
const r1083 = 'SELECT';
const d1360 = 'LSTSEL';
const b1084 = 'IF';
const y1085 = 'LSTFLT';
const t1087 = 'ANY#';
const s1088 = [m1056, n1057, z1058, s1059, c1069, t1071, v1072, e1073, p1074, y1080, u1081, l1082, a1064];
const g1089 = [m1056, n1057, z1058, s1059];
const j1086 = 'ITER';
const g1108 = 'PROB';
const HOLD = 'HOLD';
const a1091 = 'NUM#';
const c1092 = 'NUM';
const x1355 = 'NPREC';
const s1093 = 'NSIGN';
const m1094 = 'ABS';
const z1356 = 'NEG';
const b1095 = 'ROUND';
const v1357 = 'QUANT';
const s1096 = 'SMINMAX';
const c1097 = 'MINMAX';
const h1098 = 'LIM';
const d1099 = 'NCURVE';
const o1358 = 'NMAP';
const i1359 = 'NBIAS';
const l1100 = 'NANISNUM';
const o1101 = 'CONST';
const e1102 = 'DATE';
const m1103 = 'SEQ';
const u1104 = 'RANGE';
const m1105 = 'WAVE';
const r1106 = 'RAND';
const v1107 = 'NOISE';
const w1109 = 'ACCUM';
const w1110 = 'LERP';
const i1111 = 'SOLVE';
const u1112 = 'NANIM';
const l1113 = 'SMATH';
const u1114 = 'MATH';
const i1115 = 'ADD';
const i1116 = 'SUB';
const z1117 = 'MUL';
const y1118 = 'DIV';
const c1119 = 'MOD';
const n1120 = 'EXP';
const s1121 = 'NBOOL';
const e1122 = 'NOT';
const w1123 = 'AND';
const t1124 = 'OR';
const b1125 = 'XOR';
const q1126 = 'COND';
const c1127 = 'EQ';
const r1128 = 'NE';
const n1129 = 'LT';
const z1130 = 'LE';
const t1131 = 'GT';
const x1132 = 'GE';
const q1133 = 'TRIG';
const b1134 = 'SIN';
const j1135 = 'COS';
const q1136 = 'TAN';
const z1137 = 'ATAN2';
const x1138 = 'CNVANG';
const j1090 = [d1060, u1061, r1062, ...s1088, b1070, t1071, v1072, e1073, p1074, r1075, u1349, q1350, v1076, x1351, t1078, e1077, n1079, y1080, r1083, d1360, b1084, y1085, a1063, a1064, j1086, g1108, HOLD, w1065, l1066, x1067, c1068, w1352, x1353, k1354];
const p1139 = [u1114, l1113, i1115, i1116, z1117, y1118, c1119, n1120];
const g1140 = [s1121, e1122, w1123, t1124, b1125];
const o1141 = [q1126, c1127, r1128, n1129, z1130, t1131, x1132];
const m1142 = [q1133, b1134, j1135, q1136, z1137];
const v1143 = 'TEXT#';
const j1144 = 'TEXT';
const a1145 = 'TLEN';
const g1146 = 'TTRIM';
const q1147 = 'TSUB';
const y1148 = 'TCONT';
const e1149 = 'TCASE';
const t1150 = 'TREPL';
const s1151 = 'TJOIN';
const d1152 = 'TPAD';
const e1153 = 'TCMP';
const q1154 = 'TCHAR';
const t1155 = 'TUNI';
const j1156 = 'INDEX';
const h1157 = 'N2T';
const t1158 = 'C2T';
const s1159 = 'T2N';
const v1160 = 'T2C';
const o1161 = 'TSPLT';
const z3504 = 'TJSON';
const t1163 = 'TCSV';
const x1164 = 'FETCH';
const d1165 = 'TFILE';
const l1166 = [a1091, n1057, c1092, x1355, s1093, m1094, z1356, b1095, v1357, s1096, c1097, h1098, d1099, o1358, i1359, l1100, o1101, e1102, m1103, u1104, m1105, r1106, v1107, w1109, w1110, i1111, u1112, h1157, q1154, ...p1139, ...g1140, ...o1141, ...m1142, x1138, x1351];
const d1167 = [v1143, z1058, j1144, a1145, g1146, q1147, y1148, e1149, s1151, d1152, t1150, e1153, t1155, j1156, s1159, v1160, o1161, z3504, t1163, x1164, d1165];
const k1168 = 'COL#';
const k1169 = 'COL';
const r1170 = 'CVAL';
const j1171 = 'CCOR';
const b1172 = 'COLP3';
const i1173 = 'CCNT';
const v1174 = 'BLND';
const y1175 = 'CLERP';
const f1176 = 'CBLND';
const j1177 = [k1168, k1169, j1171, b1172, v1174, y1175, f1176, t1158];
const m1178 = 'FILL#';
const s1179 = 'FILL';
const v1180 = [m1178, s1179];
const z1181 = 'STRK#';
const e1182 = 'STRK';
const n1183 = [z1181, e1182];
const z1190 = 'STRKSD#';
const j1191 = 'STRKSD';
const g1192 = [z1190, j1191];
const u1184 = 'CSTOP#';
const g1185 = 'CSTOP';
const p1186 = [u1184, g1185];
const s1187 = 'GRAD#';
const a1188 = 'GRAD';
const i1189 = [s1187, a1188];
const e1193 = 'RCRN#';
const u1194 = 'RCRN';
const r1195 = [e1193, u1194];
const k1196 = 'DRSH#';
const t1197 = 'DRSH';
const y1198 = [k1196, t1197];
const g1199 = 'INSH#';
const p1200 = 'INSH';
const c1201 = [g1199, p1200];
const g1202 = 'LBLR#';
const o1203 = 'LBLR';
const m1204 = [g1202, o1203];
const j1205 = 'BBLR#';
const r1206 = 'BBLR';
const v1207 = [j1205, r1206];
const j1208 = 'MASK#';
const r1209 = 'MASK';
const n1210 = [j1208, r1209];
const a1211 = 'BLEND#';
const u1212 = 'BLEND';
const a1213 = [a1211, u1212];
const x1214 = [...g1192, ...r1195, ...y1198, ...c1201, ...m1204, ...v1207, ...a1213, ...n1210];
const v1215 = [k1168, m1178, s1187, z1181, z1190, k1196, g1199, g1202, j1205, a1211, j1208];
const k1216 = 'CSTL';
const q1217 = 'SHP#';
const y1218 = 'RECT#';
const q1219 = 'RECT';
const n1220 = [y1218, q1219];
const t1221 = 'LINE#';
const c1222 = 'LINE';
const c1223 = [t1221, c1222];
const k1224 = 'ELPS#';
const i1225 = 'ELPS';
const d1226 = [k1224, i1225];
const w1227 = 'TRPZ#';
const o1228 = 'TRPZ';
const e1229 = [w1227, o1228];
const t1236 = 'POLY#';
const p1237 = 'POLY';
const a1238 = [t1236, p1237];
const k1239 = 'STAR#';
const p1240 = 'STAR';
const u1241 = [k1239, p1240];
const j1242 = 'TXTS#';
const j1243 = 'TXTS';
const u1244 = [j1242, j1243];
const z1245 = 'PT#';
const o1246 = 'PT';
const f1247 = [z1245, o1246];
const h1248 = 'PCORN';
const y1249 = 'VPATH#';
const g1250 = 'VPATH';
const t1251 = [y1249, g1250];
const u1252 = 'VPT#';
const h1253 = 'VPT';
const s1254 = [u1252, h1253];
const w1255 = 'VEDGE#';
const z1256 = 'VEDGE';
const e1257 = [w1255, z1256];
const d1258 = 'VREG#';
const e1259 = 'VREG';
const g1260 = [d1258, e1259];
const u1261 = 'VNET#';
const g1262 = 'VNET';
const f1263 = [u1261, g1262];
const d1264 = 'SGRP#';
const a1265 = 'SGRP';
const p1266 = [d1264, a1265];
const o1267 = 'FRM#';
const w1268 = 'FRM';
const f1269 = [o1267, w1268];
const m1231 = 'ARC#';
const o1230 = 'ARC';
const k1232 = [m1231, o1230];
const d1234 = 'WAVEP#';
const g1233 = 'WAVEP';
const s1235 = [d1234, g1233];
const c1270 = 'MOVE';
const u1271 = 'ROT';
const q1272 = 'SCALE';
const o1273 = 'SKEW';
const SHOW_CENTER = 'SHOWCNTR';
const b1274 = 'SCENTR';
const t1275 = 'RSTX';
const j1276 = 'PLACE';
const t1277 = 'APPLY';
const PATH_LENGTH = 'PTHLEN';
const JOIN_PATHS = 'JOINPTH';
const REORIENT_PATHS = 'REORPTH';
const x1284 = 'PTALPATH';
const u1285 = 'CPTONPATH';
const h1278 = 'MESPT';
const k1279 = 'PTANGLE';
const u1280 = 'VECLEN';
const x1281 = 'CIRCEN';
const ARC_FROM_POINTS = 'ARCPT';
const p1282 = 'INTLIN';
const q1283 = 'PTLERP';
const REVERSE_PATH = 'REVPTH';
const BLEND_PATH = 'BLENDPTH';
const PATH_TYPES = [g1250, o1228, o1230, g1233];
const PATH_VALUES = [y1249, w1227, m1231, d1234];
const s1286 = 'SBOOL';
const d1287 = 'SBOOL#';
const o1288 = 'SBOOLU';
const h1289 = 'SBOOLS';
const s1290 = 'SBOOLI';
const p1291 = 'SBOOLE';
const m1292 = [s1286, d1287, o1288, h1289, s1290, p1291];
const w1293 = 'RENDER';
const EXPORT = 'EXPORT';
const d1294 = [q1217, s1059, y1218, t1221, k1224, w1227, t1236, k1239, j1242, z1245, y1249, u1252, w1255, d1258, u1261, m1231, d1234, d1264, o1267, d1287, k1196, g1199, g1202, j1205, a1211, j1208];
const v1295 = [u1271, q1272, o1273];
const n1296 = [...d1294, ...n1220, ...c1223, ...d1226, ...e1229, ...a1238, ...u1241, ...u1244, ...f1247, h1248, ...t1251, ...s1254, ...e1257, ...g1260, ...f1263, ...k1232, ...s1235, ...p1266, ...f1269, ...m1292, c1270, ...v1295, SHOW_CENTER, b1274, t1275, j1276, t1277, PATH_LENGTH, JOIN_PATHS, REORIENT_PATHS, x1284, u1285, h1278, k1279, u1280, x1281, o1230, g1233, ARC_FROM_POINTS, p1282, q1283, REVERSE_PATH, BLEND_PATH, w1293, EXPORT];
const e1297 = [m1056, n1057, z1058, s1059, a1091, v1143, k1168, m1178, u1184, s1187, z1181, u1184, s1187, q1217, y1218, t1221, k1224, w1227, t1236, k1239, j1242, z1245, y1249, u1252, w1255, d1258, u1261, d1264, o1267, e1193, k1196, g1199, g1202, j1205, a1211, j1208];
const f1298 = 'GROUP';
const t1299 = 'GPARAM';
const j1300 = [f1298, t1299];
const z1301 = 'CMNT';
const j1302 = 'CMNTARR';
const b1303 = 'PANEL';
const w1304 = 'ACT';
const l1305 = 'BFACT';
const d1306 = 'BFLST';
const g1307 = 'DIS';
const g1308 = 'NOC';
const PARAM = 'PARAM';
const y1309 = 'LOG';
const m1310 = 'GRAPH';
const g1311 = [[c1119, '%'], [y1118, '/'], [i1116, '−'], [i1115, '+'], [z1117, '×'], [n1120, 'e<sup>x']];
const w1312 = [[y1118, '/'], [i1116, '−'], [i1115, '+'], [z1117, '×']];
const s1313 = 0;
const j1314 = 1;
const j1315 = 2;
const e1316 = 3;
const q1317 = [[s1313, 'not'], [j1314, 'xor'], [j1315, 'or'], [e1316, 'and']];
const h1318 = 0;
const i1319 = 1;
const i1320 = 2;
const m1321 = 3;
const a1322 = 4;
const o1323 = 5;
const m1324 = [[h1318, '<'], [i1319, '≤'], [i1320, '≠'], [m1321, '='], [a1322, '≥'], [o1323, '>']];
const n1325 = 0;
const i1326 = 1;
const t1327 = 2;
const k1328 = 3;
const f1329 = 4;
const f1330 = 5;
const f1331 = [[n1325, 'sin'], [i1326, 'cos'], [t1327, 'tan'], [k1328, 'asin'], [f1329, 'acos'], [f1330, 'atan']];
const n1332 = 'EMPTY';
const o1333 = 'CONNECT';
const b1334 = 'CREATE';
const u1335 = 'CREATE_INSERT';
const n1336 = 'DELETE';
const o1337 = 'DISCONNECT';
const u1338 = 'LINK_STYLE';
const l1339 = 'LINK_VARIABLE';
const r1340 = 'LINK_VARIABLE_GROUP';
const m1341 = 'MAKE_ACTIVE';
const MAKE_NOT_CONDITION_ACTION = 'MAKE_NOT_CONDITION';
const w1342 = 'MAKE_PASSIVE';
const p1343 = 'PASTE';
const v1344 = 'RECONNECT';
const m1345 = 'REMOVE';
const s1346 = 'RENAME';
const t1347 = 'REORDER_INPUTS';
const m1348 = 'REORDER_CONNECTIONS';
const j1361 = 'SELECT';
const v1362 = 'SELECT_MOVE';
const a1363 = 'MOVE_NODES';
const s1364 = 'SET_PARAM_VALUE';
const SET_MULTIPLE_VALUES_ACTION = 'SET_MULTIPLE_VALUES';
const g1365 = 'SET_PARAM_SETTING';
const s1366 = 'SET_NODE_RECT';
const i1367 = 'TOGGLE_DISABLE';
const r1368 = 'TOGGLE_PARAM_HEADER';
const o1369 = 'SET_CURRENT_GRAPH';
const v1370 = 'CREATE_PAGE';
const q1371 = 'DELETE_PAGE';
const v1372 = 'GROUP_NODES';
const v1373 = 'UNGROUP_NODES';
const r1374 = 'HIGHLIGHT_NODES';
const SCROLL_LIST_NODE_ACTION = 'SCROLL_LIST_NODE';
const SET_LIST_DIVIDER_ACTION = 'SET_LIST_DIVIDER';
const SET_NODE_PARAM_ACTION = 'SET_NODE_PARAM';
const w1375 = 'BNORM';
const p1376 = 'BDARK';
const l1377 = 'BMULT';
const s1378 = 'BPDRK';
const a1379 = 'BBURN';
const u1380 = 'BLITE';
const p1381 = 'BSCRN';
const g1382 = 'BPLGT';
const p1383 = 'BDODG';
const p1384 = 'BOVER';
const i1385 = 'BSOFT';
const j1386 = 'BHARD';
const q1387 = 'BDIFF';
const d1388 = 'BEXCL';
const d1389 = 'BHUE';
const v1390 = 'BSAT';
const s1391 = 'BCOL';
const z1392 = 'BLUM';
const l1393 = [[w1375, 'normal', 'NORMAL'], [p1376, 'darken', 'DARKEN'], [l1377, 'multiply', 'MULTIPLY'], [s1378, 'plus darker', 'LINEAR_BURN'], [a1379, 'color burn', 'COLOR_BURN'], [u1380, 'lighten', 'LIGHTEN'], [p1381, 'screen', 'SCREEN'], [g1382, 'plus lighter', 'LINEAR_DODGE'], [p1383, 'color dodge', 'COLOR_DODGE'], [p1384, 'overlay', 'OVERLAY'], [i1385, 'soft light', 'SOFT_LIGHT'], [j1386, 'hard light', 'HARD_LIGHT'], [q1387, 'difference', 'DIFFERENCE'], [d1388, 'exclusion', 'EXCLUSION'], [d1389, 'hue', 'HUE'], [v1390, 'saturation', 'SATURATION'], [s1391, 'color', 'COLOR'], [z1392, 'luminosity', 'LUMINOSITY']];
const i1394 = [['thin', 100], ['extra light', 200], ['light', 300], ['regular', 400], ['medium', 500], ['semi bold', 600], ['bold', 700], ['extra bold', 800], ['black', 900]];
const h1395 = 0;
const q1396 = 1;
const w1397 = 2;
const w1398 = 2;
const p1399 = 3;
const u1400 = 3;
const k1401 = 4;
const b1402 = 4;
const y1403 = 5;
const z1404 = 6;
const a1405 = 7;
const b1406 = 8;
const a1407 = 9;
const f1408 = 10;
const o1409 = 11;
const h1410 = 12;
const n1411 = 13;
const c1412 = 14;
const o1413 = 15;
const o1414 = 16;
const n1415 = 17;
const c1416 = 18;
const g1417 = 19;
const l1418 = 20;
const k1419 = 21;
const w1420 = 22;
const b1421 = 23;
const e1422 = 24;
const l1453 = 24;
const n1423 = 24;
const s1424 = 25;
const t1454 = 25;
const c1425 = 26;
const q1426 = 27;
const k1427 = 28;
const n1428 = 28;
const k1429 = 28;
const g1430 = 28;
const t1431 = 28;
const o1432 = 28;
const d1433 = 28;
const g1434 = 28;
const k1435 = 29;
const n1436 = 29;
const i1437 = 29;
const q1438 = 29;
const o1439 = 29;
const s1455 = 29;
const i1441 = 30;
const l1442 = 30;
const p1443 = 30;
const w1444 = 30;
const g1440 = 30;
const h1445 = 31;
const q1446 = 31;
const l1447 = 32;
const w1448 = 33;
const u1449 = 34;
const e1450 = 35;
const k1451 = 36;
const k1452 = 37;
const d2796 = '12345679ABCDEFGHJKLMNPQRSTUVWXYZ';
function c847(array, chars = d2796) { let b849 = ''; let len = array.length; let i = 0; while (len > 0) {
    if (len >= 5) {
        const a0 = array[i], a1 = array[i + 1], a2 = array[i + 2], a3 = array[i + 3], a4 = array[i + 4];
        b849 += chars[(a0 & 0xF8) >>> 3];
        b849 += chars[((a0 & 0x07) << 2) | ((a1 & 0xC0) >>> 6)];
        b849 += chars[(a1 & 0x3E) >>> 1];
        b849 += chars[((a1 & 0x01) << 4) | ((a2 & 0xF0) >>> 4)];
        b849 += chars[((a2 & 0x0F) << 1) | ((a3 & 0x80) >>> 7)];
        b849 += chars[(a3 & 0x7C) >>> 2];
        b849 += chars[((a3 & 0x03) << 3) | ((a4 & 0xE0) >>> 5)];
        b849 += chars[(a4 & 0x1F)];
    }
    else if (len == 4) {
        const a0 = array[i], a1 = array[i + 1], a2 = array[i + 2], a3 = array[i + 3];
        b849 += chars[(a0 & 0xF8) >>> 3];
        b849 += chars[((a0 & 0x07) << 2) | ((a1 & 0xC0) >>> 6)];
        b849 += chars[(a1 & 0x3E) >>> 1];
        b849 += chars[((a1 & 0x01) << 4) | ((a2 & 0xF0) >>> 4)];
        b849 += chars[((a2 & 0x0F) << 1) | ((a3 & 0x80) >>> 7)];
        b849 += chars[(a3 & 0x7C) >>> 2];
        b849 += chars[((a3 & 0x03) << 3)];
    }
    else if (len == 3) {
        const a0 = array[i], a1 = array[i + 1], a2 = array[i + 2];
        b849 += chars[(a0 & 0xF8) >>> 3];
        b849 += chars[((a0 & 0x07) << 2) | ((a1 & 0xC0) >>> 6)];
        b849 += chars[(a1 & 0x3E) >>> 1];
        b849 += chars[((a1 & 0x01) << 4) | ((a2 & 0xF0) >>> 4)];
        b849 += chars[((a2 & 0x0F) << 1)];
    }
    else if (len == 2) {
        const a0 = array[i], a1 = array[i + 1];
        b849 += chars[(a0 & 0xF8) >>> 3];
        b849 += chars[((a0 & 0x07) << 2) | ((a1 & 0xC0) >>> 6)];
        b849 += chars[(a1 & 0x3E) >>> 1];
        b849 += chars[((a1 & 0x01) << 4)];
    }
    else if (len == 1) {
        const a0 = array[i];
        b849 += chars[(a0 & 0xF8) >>> 3];
        b849 += chars[((a0 & 0x07) << 2)];
    }
    i += 5;
    len -= 5;
} return b849; }
function h848(b849, chars = d2796) { const array = []; let len = b849.length; let c = 0; while (len > 0) {
    if (len >= 8) {
        const c0 = chars.indexOf(b849[c]), c1 = chars.indexOf(b849[c + 1]), c2 = chars.indexOf(b849[c + 2]), c3 = chars.indexOf(b849[c + 3]), c4 = chars.indexOf(b849[c + 4]), c5 = chars.indexOf(b849[c + 5]), c6 = chars.indexOf(b849[c + 6]), c7 = chars.indexOf(b849[c + 7]);
        array.push((c0 << 3) | ((c1 & 0x1C) >>> 2));
        array.push(((c1 & 0x03) << 6) | (c2 << 1) | ((c3 & 0x10) >>> 4));
        array.push(((c3 & 0x0F) << 4) | ((c4 & 0x1E) >>> 1));
        array.push(((c4 & 0x01) << 7) | (c5 << 2) | ((c6 & 0x18) >>> 3));
        array.push(((c6 & 0x07) << 5) | c7);
    }
    else if (len == 7) {
        const c0 = chars.indexOf(b849[c]), c1 = chars.indexOf(b849[c + 1]), c2 = chars.indexOf(b849[c + 2]), c3 = chars.indexOf(b849[c + 3]), c4 = chars.indexOf(b849[c + 4]), c5 = chars.indexOf(b849[c + 5]), c6 = chars.indexOf(b849[c + 6]);
        array.push((c0 << 3) | ((c1 & 0x1C) >>> 2));
        array.push(((c1 & 0x03) << 6) | (c2 << 1) | ((c3 & 0x10) >>> 4));
        array.push(((c3 & 0x0F) << 4) | ((c4 & 0x1E) >>> 1));
        array.push(((c4 & 0x01) << 7) | (c5 << 2) | ((c6 & 0x18) >>> 3));
    }
    else if (len == 5) {
        const c0 = chars.indexOf(b849[c]), c1 = chars.indexOf(b849[c + 1]), c2 = chars.indexOf(b849[c + 2]), c3 = chars.indexOf(b849[c + 3]), c4 = chars.indexOf(b849[c + 4]);
        array.push((c0 << 3) | ((c1 & 0x1C) >>> 2));
        array.push(((c1 & 0x03) << 6) | (c2 << 1) | ((c3 & 0x10) >>> 4));
        array.push(((c3 & 0x0F) << 4) | ((c4 & 0x1E) >>> 1));
    }
    else if (len == 4) {
        const c0 = chars.indexOf(b849[c]), c1 = chars.indexOf(b849[c + 1]), c2 = chars.indexOf(b849[c + 2]), c3 = chars.indexOf(b849[c + 3]);
        array.push((c0 << 3) | ((c1 & 0x1C) >>> 2));
        array.push(((c1 & 0x03) << 6) | (c2 << 1) | ((c3 & 0x10) >>> 4));
    }
    else if (len == 2) {
        const c0 = chars.indexOf(b849[c]), c1 = chars.indexOf(b849[c + 1]);
        array.push((c0 << 3) | ((c1 & 0x1C) >>> 2));
    }
    c += 8;
    len -= 8;
} return array; }
function logSavedNode(nodeKey, w4006) {
    return __awaiter(this, void 0, void 0, function* () { const log = z2119(yield r1563(nodeKey, false)); if (w4006) {
        console.log('%c%s\n%c%s', 'background: #fa24; color: white;', o1054(nodeKey), 'background: #fa44; color: #edc;', log);
    }
    else {
        console.log('%c%s\n%c%s', 'background: #fdb; color: black;', o1054(nodeKey), 'background: #fed; color: black;', log);
    } });
}
function z2119(json) { let e4032 = json.replace('{\n', '').replace('\n}', '').replace('[\n' + l870, '').replace('\n' + l870 + ']', '').split(l870 + '"params":\n').join('').split('": "').join(': ').split('", "').join(': ').split(l870 + '"').join(l870).split(l870 + l870 + '["').join(l870 + l870).split('",\n').join('\n').split('"\n').join('\n').split('"],\n').join('\n'); if (e4032[e4032.length - 1] == '"')
    e4032 = e4032.substring(0, e4032.length - 1); if (e4032.substring(e4032.length - 2) == '"]')
    e4032 = e4032.substring(0, e4032.length - 2); return e4032; }
function z2120(json) { let e4032 = json.replace('{\n', '').replace('\n}', '').replace('[\n' + l870, '').replace('\n' + l870 + ']', ''); return e4032; }
function m2121(a243, w4006) { const m4210 = i924(a243, true); if (w4006) {
    console.log('%c%s', 'background: #4f44; color: #ded', m4210);
}
else {
    console.log('%c%s', 'background: #cfc; color: black;', m4210);
} }
console.clear();
figma.payments.setPaymentStatusInDevelopment({ type: 'PAID' });
figma.loadAllPagesAsync().then(() => { figma.on('documentchange', c1534); figma.on('selectionchange', w1542); figma.on('close', v1535); });
z1524(true);
figma.clientStorage.getAsync('pro').then(data => { figma.showUI(__html__, { visible: false, themeColors: true, title: 'Generator' }); });
var v2708 = figma.viewport.zoom;
setInterval(u1539, 100);
var strBackgrounds = '';
setInterval(figCheckBackgrounds, 500);
const i2797 = 'clock_';
const p2798 = 1000;
var u2799 = false;
var objectCenterSize = 15;
function c1536() { (function () {
    return __awaiter(this, void 0, void 0, function* () { figma.currentPage.loadAsync().then(() => __awaiter(this, void 0, void 0, function* () { let m2800 = yield figma.currentPage.getPluginData(figma.currentUser.id + ',windowWidth'); let x2801 = yield figma.currentPage.getPluginData(figma.currentUser.id + ',windowHeight'); let q2802; let x2803; if (m2800 === NULL) {
        q2802 = 800;
        figma.currentPage.setPluginData(figma.currentUser.id + ',windowWidth', m2800.toString());
    }
    else
        q2802 = parseInt(m2800); if (x2801 === NULL) {
        x2803 = 600;
        figma.currentPage.setPluginData(figma.currentUser.id + ',windowHeight', x2801.toString());
    }
    else
        x2803 = parseInt(x2801); figma.ui.resize(Math.max(minWindowWidth, q2802), Math.max(minWindowHeight, x2803)); figma.ui.show(); const fonts = yield figma.listAvailableFontsAsync(); const eula = (yield figma.clientStorage.getAsync('eula')) === 'true'; const tutorials = (yield figma.clientStorage.getAsync('tutorials')) === 'true'; const isLocked = yield u1541(); e1543({ cmd: 'uiReturnFigStartGenerator', currentUser: figma.currentUser, viewportRect: figma.viewport.bounds, viewportZoom: figma.viewport.zoom, fonts: fonts, eula: eula, tutorials: tutorials, isLocked: isLocked, windowWidth: q2802, windowHeight: x2803 }); })); });
})(); }
function u1537() { z1524(); figma.showUI(__html__, { visible: false, themeColors: true }); }
function y1538() { setInterval(c1540, p2798); }
function u1539() { if (figma.viewport.zoom == v2708)
    return; v2708 = figma.viewport.zoom; x2696(); j1557(); s1559(); }
function figCheckBackgrounds() { if (strBackgrounds != JSON.stringify(figma.currentPage.backgrounds)) {
    j1557();
    strBackgrounds = JSON.stringify(figma.currentPage.backgrounds);
} }
function c1540() { m1564(i2797 + figma.currentUser.sessionId.toString(), Date.now().toString()); }
function u1541() {
    return __awaiter(this, void 0, void 0, function* () { yield figma.currentPage.loadAsync(); const clocks = figma.currentPage.getPluginDataKeys().filter(k => k.length > i2797.length && k.substring(0, i2797.length) == i2797 && k.substring(i2797.length) != figma.currentUser.sessionId.toString()).map((k) => __awaiter(this, void 0, void 0, function* () { return parseInt(yield r1563(k)); })); clocks.sort(); const now = Date.now(); const locked = clocks.length > 0 && now - (yield clocks[clocks.length - 1]) < p2798 * 2; return locked; });
}
function w1542() { x2696(); }
var k2729 = new Array();
var d2731 = new Array();
function figGetObjectsFromIds(objectIds) {
    return __awaiter(this, void 0, void 0, function* () { for (let i = h2765.length - 1; i >= 0; i--)
        if (!h2765[i].removed && objectIds.includes(h2765[i].getPluginData('objectId')))
            h2765.splice(i, 1); for (let i = r2781.length - 1; i >= 0; i--)
        if (r2781[i].removed || objectIds.includes(r2781[i].getPluginData('objectId')))
            r2781.splice(i, 1); yield figma.currentPage.loadAsync(); return figma.currentPage.findAll(o => objectIds.includes(o.getPluginData('objectId'))); });
}
function t1523(nodeIds) {
    return __awaiter(this, void 0, void 0, function* () { for (let i = h2765.length - 1; i >= 0; i--)
        if (!h2765[i].removed && nodeIds.includes(h2765[i].getPluginData('nodeId')))
            h2765.splice(i, 1); for (let i = r2781.length - 1; i >= 0; i--)
        if (r2781[i].removed || nodeIds.includes(r2781[i].getPluginData('nodeId')))
            r2781.splice(i, 1); yield figma.currentPage.loadAsync(); figma.currentPage.findAll(o => nodeIds.includes(o.getPluginData('nodeId'))).forEach(o => { if (!o.removed)
        o.remove(); }); k2729 = k2729.filter(a => !nodeIds.includes(a.nodeId)); });
}
function z1524(b1525 = false) { for (const s1530 of figma.currentPage.children) {
    if (s1530.removed)
        continue;
    if (s1530.getPluginData('objectId') != '' && s1530.getPluginData('userId') == figma.currentUser.id && (parseInt(s1530.getPluginData('retain')) == 0 || b1525))
        s1530.remove();
} }
function q1526(nodeIds, w1527) { for (let i = k2729.length - 1; i >= 0; i--) {
    const i2730 = k2729[i];
    if (!nodeIds.includes(i2730.nodeId))
        continue;
    for (let j = i2730.objects.length - 1; j >= 0; j--) {
        const s1530 = i2730.objects[j];
        if (s1530.removed || !s1528(s1530, w1527)) {
            if (!s1530.removed)
                s1530.remove();
            k943(i2730.objects, s1530);
            if (h2765.includes(s1530))
                k943(h2765, s1530);
            if (r2781.includes(s1530))
                k943(r2781, s1530);
        }
        if (!s1530.removed) {
            if (parseInt(s1530.getPluginData('retain')) == 2)
                z1549(s1530);
        }
    }
    if (isEmpty(i2730.objects))
        k943(k2729, i2730);
} }
function s1528(s1530, w1527) { if (s1530.type == a1265 || s1530.type == w1268) {
    for (const child of s1530.children) {
        const found = s1528(child, w1527);
        if (found)
            return found;
    }
}
else {
    const found = w1527.find(o => s1530.getPluginData('objectId') == o[w1397] && s1530.getPluginData('userId') == figma.currentUser.id || o[y1403] == 2 && o[y1403] == s1530.getPluginData('retain'));
    if (found)
        return found;
} return null; }
function a1531(nodeIds, i1532) { figma.getLocalPaintStylesAsync().then(paintStyles => { paintStyles.filter(s => nodeIds.includes(s.getPluginData('nodeId'))).forEach(s => { const nodeId = s.getPluginData('nodeId'); const existing = f923(s.getPluginData('existing')); if (!existing) {
    s.remove();
}
else if (i1532) {
    w945(d2731, a => a.nodeId == nodeId);
    s.setPluginData('type', NULL);
    s.setPluginData('nodeId', NULL);
    s.setPluginData('existing', NULL);
} }); }); if (i1532)
    d2731 = d2731.filter(a => !nodeIds.includes(a.nodeId)); }
var j1533 = false;
function c1534(e) { for (const change of e.documentChanges) {
    switch (change.type) {
        case 'STYLE_CREATE':
            if (!change.style)
                break;
            if (!j1533) {
                change.style.setPluginData('type', NULL);
                change.style.setPluginData('nodeId', NULL);
                change.style.setPluginData('existing', NULL);
            }
            break;
        case 'STYLE_PROPERTY_CHANGE': {
            if (!change.style)
                break;
            if (!j1533) {
                const msg = { cmd: 'uiStylePropertyChange', styleId: c946(change.id), properties: change.properties, name: '', paints: [] };
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
                e1543(msg);
            }
            break;
        }
        case 'STYLE_DELETE':
            e1543({ cmd: 'uiStyleDelete', styleId: change.id });
            break;
    }
} j1533 = false; }
function v1535() { z1524(); e1543({ cmd: 'updateMetrics' }); }
figma.ui.onmessage = function (msg) { msg = JSON.parse(msg); if (msg.cmd == 'returnUiGetValueForFigma')
    return; switch (msg.cmd) {
    case 'figStartGenerator':
        c1536();
        break;
    case 'figRestartGenerator':
        u1537();
        break;
    case 'figFinishStart':
        y1538();
        break;
    case 'figDockWindowNormal':
        d2738('normal');
        break;
    case 'figDockWindowMaximize':
        d2738('maximize');
        break;
    case 'figDockWindowTop':
        d2738('top');
        break;
    case 'figDockWindowLeft':
        d2738('left');
        break;
    case 'figDockWindowRight':
        d2738('right');
        break;
    case 'figDockWindowBottom':
        d2738('bottom');
        break;
    case 'figGetMousePosition':
        s1609(msg.clientPosition);
        break;
    case 'figResizeWindow':
        b1612(msg.width, msg.height);
        break;
    case 'figSetWindowRect':
        m1610(msg.x, msg.y, msg.width, msg.height);
        break;
    case 'figNotify':
        j1613(msg);
        break;
    case 'figGetLocalData':
        x1561(msg.key);
        break;
    case 'figSetLocalData':
        v1562(msg.key, msg.value);
        break;
    case 'figClearAllLocalData':
        h4027();
        break;
    case 'figGetPageData':
        r1563(msg.key);
        break;
    case 'figSetPageData':
        m1564(msg.key, msg.value);
        break;
    case 'figSavePages':
        p1569(msg.pageIds, msg.pageJson, msg.currentPageId);
        break;
    case 'figLoadNodesAndConns':
        g1566(msg.debugMode);
        break;
    case 'figSaveNodes':
        c1570(msg.nodeIds, msg.nodeJson);
        break;
    case 'figGetAllLocalTemplateNames':
        v2735();
        break;
    case 'figSaveLocalTemplate':
        j1571(msg.m4028, msg.template);
        break;
    case 'figRemoveConnsToNodes':
        w1572(msg.nodeIds);
        break;
    case 'figRemoveSavedNodesAndConns':
        v1573(msg.nodeIds);
        break;
    case 'figRemoveAllSavedNodesAndConns':
        j1574();
        break;
    case 'figLogAllSavedNodesAndConns':
        k1575(msg.w4006);
        break;
    case 'figLogAllSavedNodes':
        z1576(msg.w4006);
        break;
    case 'figLogAllSavedConns':
        k1577(msg.w4006);
        break;
    case 'figLogAllSavedPageKeys':
        h1578(msg.w4006);
        break;
    case 'figLogAllSavedPages':
        j1579(msg.w4006);
        break;
    case 'figLogAllSavedConnKeys':
        z1580(msg.w4006);
        break;
    case 'figLogAllLocalData':
        i1581(msg.w4006);
        break;
    case 'figGetValue':
        n1582(msg.key, msg.spec);
        break;
    case 'figRemoveSavedPage':
        f1584(msg.pageId);
        break;
    case 'figRemoveAllSavedPages':
        s1585();
        break;
    case 'figSaveConnection':
        a1586(msg.key, msg.json);
        break;
    case 'figSaveConnections':
        n1587(msg.keys, msg.json);
        break;
    case 'figUpdateSavedConnections':
        g1588(msg.curKeys, msg.newKeys, msg.json);
        break;
    case 'figDeleteSavedConnection':
        p1589(msg.key);
        break;
    case 'figRemoveAllSavedConnections':
        t1590();
        break;
    case 'figDeleteSavedConnectionsToNode':
        s1591(msg.nodeId);
        break;
    case 'figDeleteSavedConnectionsFromNode':
        b1592(msg.nodeId);
        break;
    case 'figRemovePluginDataFromAllLocalStyles':
        g1593();
        break;
    case 'figGetAllLocalVariables':
        d1617(msg.nodeId, msg.px, msg.py);
        break;
    case 'figLinkNodeToVariable':
        t1619(msg.nodeId, msg.variableId);
        break;
    case 'figUpdateVariable':
        figUpdateVariableAsync(msg.variableId, msg.value);
        break;
    case 'figGetAllLocalColorStyles':
        a1594(msg.nodeId, msg.px, msg.py);
        break;
    case 'figLinkNodeToExistingColorStyle':
        f1595(msg.nodeId, msg.styleId);
        break;
    case 'figExport':
        figExport(msg.objectIds, msg.scale, msg.format, msg.suffix);
        break;
    case 'figGetObjectSize':
        j1548(msg.object);
        break;
    case 'figGetVariableUpdates':
        s1583(msg.linkedVarIds);
        break;
    case 'figUpdateShowIds':
        u2799 = msg.u2799;
        break;
    case 'figUpdateObjectCenterSize':
        objectCenterSize = msg.objectCenterSize;
        break;
    case 'figDeleteAllObjects':
        z1524();
        break;
    case 'figUpdateObjectsAndStyles':
        b2744 = 0;
        v2745 = 0;
        msg.objects.forEach(o => o.counted = false);
        f2732(null, msg.objects, msg.c4020, msg.n2067, msg.nodeIds, msg.v2761, msg.j2762, msg.g270);
        i1600(msg);
        break;
    case 'figDeleteObjectsAndStyles':
        t1523(msg.nodeIds);
        a1531(msg.nodeIds, msg.i1532);
        break;
    case 'figDeleteObjectsExcept':
        q1526(msg.nodeIds, msg.ignoreObjects);
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
} e1543({ cmd: 'uiEndFigMessage', msgCmd: msg.cmd }); };
function e1543(msg) { figma.ui.postMessage(JSON.stringify(msg)); }
function r2733(key) {
    return __awaiter(this, void 0, void 0, function* () { return yield figma.clientStorage.getAsync(key); });
}
function x1561(key) { figma.currentPage.loadAsync().then(() => { if (key == 'canvasEmpty') {
    e1543({ cmd: 'uiReturnFigGetLocalData', key: key, value: figma.currentPage.children.length == 0 });
}
else if (key == 'debugWarningCrash') {
    figma.clientStorage.getAsync('debugWarning').then(data => { e1543({ cmd: 'uiReturnFigGetLocalData', key: key, value: data }); });
}
else {
    figma.clientStorage.getAsync(key).then(data => { e1543({ cmd: 'uiReturnFigGetLocalData', key: key, value: data }); });
} }); }
function v1562(key, value, postToUi = true) { figma.clientStorage.setAsync(key, value); if (postToUi) {
    e1543({ cmd: 'uiReturnFigSetLocalData', key: key, value: value });
} }
function h4027() {
    return __awaiter(this, void 0, void 0, function* () { const keys = yield figma.clientStorage.keysAsync(); for (const key of keys)
        figma.clientStorage.deleteAsync(key); });
}
function r1563(key, postToUi = true) {
    return __awaiter(this, void 0, void 0, function* () { yield figma.currentPage.loadAsync(); const data = figma.currentPage.getPluginData(key); if (postToUi) {
        e1543({ cmd: 'uiReturnFigGetPageData', key: key, value: data });
    } return data; });
}
function m1564(key, value) { b1565(key); figma.currentPage.setPluginData(key, value); }
function b1565(key) { figma.currentPage.setPluginData(key, ''); }
function g1566(debugMode) { figma.currentPage.loadAsync().then(() => { const pageKeys = figma.currentPage.getPluginDataKeys().filter(k => f1050(k)); const nodeKeys = figma.currentPage.getPluginDataKeys().filter(k => n1051(k)); const connKeys = figma.currentPage.getPluginDataKeys().filter(k => z1052(k)); if (!debugMode)
    s1568(nodeKeys, connKeys); const pages = pageKeys.map(k => figma.currentPage.getPluginData(k)); const nodes = nodeKeys.map(k => figma.currentPage.getPluginData(k)); const x2138 = connKeys.map(k => figma.currentPage.getPluginData(k)); const pageOrder = figma.currentPage.getPluginData('pageOrder').split(','); const currentPageId = figma.currentPage.getPluginData('currentPageId'); n1567(nodes); const showAllColorSpaces = figma.currentPage.getPluginData('showAllColorSpaces'); e1543({ cmd: 'uiReturnFigLoadNodesAndConns', showAllColorSpaces: showAllColorSpaces, pageKeys: pageKeys, pageJson: pages, pageOrder: pageOrder, currentPageId: currentPageId, nodeKeys: nodeKeys, nodeJson: nodes, connKeys: connKeys, connJson: x2138 }); }); }
function n1567(nodes) { d2731 = []; figma.getLocalPaintStylesAsync().then(paintStyles => { for (const c3019 of nodes) {
    const node = JSON.parse(c3019);
    if (node.type == k1216) {
        const style = paintStyles.find(s => { const nodeId = s.getPluginData('nodeId'); return nodeId == node.id; });
        if (style) {
            d2731.push({ nodeId: node.id, existing: f923(node.existing), styles: [style] });
        }
    }
} }); }
function s1568(nodeKeys, connKeys) { figma.currentPage.loadAsync().then(() => { const a2734 = '"loading": "true"'; const not = '{\n'; const set = '{\n' + l870 + a2734 + ',\n'; nodeKeys.forEach(k => figma.currentPage.setPluginData(k, figma.currentPage.getPluginData(k).replace(set, not).replace(not, set))); connKeys.forEach(k => figma.currentPage.setPluginData(k, figma.currentPage.getPluginData(k).replace(set, not).replace(not, set))); }); }
function p1569(pageIds, pageJson, currentPageId) { for (let i = 0; i < pageIds.length; i++) {
    m1564(h922(pageIds[i]), pageJson[i]);
} m1564('pageOrder', pageIds.join(',')); m1564('currentPageId', currentPageId); }
function c1570(nodeIds, nodeJson) { for (let i = 0; i < nodeIds.length; i++) {
    m1564(r920(nodeIds[i]), nodeJson[i]);
} }
function v2735() {
    return __awaiter(this, void 0, void 0, function* () { let keys = yield figma.clientStorage.keysAsync(); keys = keys.filter(k => k.length >= p878.length && k.substring(0, p878.length) == p878); e1543({ cmd: 'uiReturnGetAllLocalTemplateNames', templateNames: keys }); });
}
function j1571(m4028, template) { v1562(p878 + ' ' + m4028, template); }
function w1572(nodeIds) { figma.currentPage.loadAsync().then(() => { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => z1052(k)); for (const key of connKeys) {
    const parts = r1055(key).split(' ');
    if (nodeIds.includes(parts[0]) || nodeIds.includes(parts[2]))
        b1565(key);
} }); }
function v1573(nodeIds) { figma.currentPage.loadAsync().then(() => { w1572(nodeIds); const nodeKeys = figma.currentPage.getPluginDataKeys().filter(k => n1051(k) && nodeIds.includes(o1054(k))); nodeKeys.forEach(k => b1565(k)); }); }
function j1574() { figma.currentPage.loadAsync().then(() => { const nodeKeys = figma.currentPage.getPluginDataKeys().filter(k => n1051(k)); const connKeys = figma.currentPage.getPluginDataKeys().filter(k => z1052(k)); for (const key of nodeKeys)
    b1565(key); for (const key of connKeys)
    b1565(key); }); }
function k1575(w4006) {
    return __awaiter(this, void 0, void 0, function* () { yield z1576(w4006); k1577(w4006); });
}
function z1576(w4006) {
    return __awaiter(this, void 0, void 0, function* () { yield figma.currentPage.loadAsync(); figma.currentPage.getPluginDataKeys().filter(k => n1051(k)).forEach((k) => __awaiter(this, void 0, void 0, function* () { return yield logSavedNode(k, w4006); })); });
}
function k1577(w4006) { figma.currentPage.loadAsync().then(() => { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => z1052(k)); connKeys.sort((key1, key2) => { const p1 = r1055(key1).split(' '); const p2 = r1055(key2).split(' '); if (p1[2] != p2[2])
    return p1[2] < p2[2] ? -1 : 1; if (p1[3] != p2[3])
    return parseInt(p1[3]) - parseInt(p2[3]); if (p1[2] == p2[0])
    return -1; if (p2[2] == p1[0])
    return 1; return 0; }); connKeys.forEach(k => m2121(JSON.parse(figma.currentPage.getPluginData(k)), w4006)); }); }
function h1578(w4006) { figma.currentPage.loadAsync().then(() => { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => f1050(k)); connKeys.forEach(k => console.log('%c' + k, 'background: #fff; color: ' + (w4006 ? 'black' : 'white'))); const pageOrder = figma.currentPage.getPluginData('pageOrder'); console.log('%c' + pageOrder, 'background: #fff; color: ' + (w4006 ? 'black' : 'white')); }); }
function j1579(w4006) { figma.currentPage.loadAsync().then(() => { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => f1050(k)); connKeys.forEach(k => console.log('%c' + figma.currentPage.getPluginData(k), 'background: #fff; color: ' + (w4006 ? 'black' : 'white'))); const pageOrder = figma.currentPage.getPluginData('pageOrder'); console.log('%c' + pageOrder, 'background: #fff; color: ' + (w4006 ? 'black' : 'white')); }); }
function z1580(w4006) { figma.currentPage.loadAsync().then(() => { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => z1052(k)); connKeys.forEach(k => console.log('%c' + k, 'background: #dff; color: ' + (w4006 ? 'black' : 'white'))); }); }
function i1581(w4006) { figma.clientStorage.keysAsync().then(keys => keys.forEach(k => figma.clientStorage.getAsync(k).then(val => console.log(k + ': ' + val)))); }
function n1582(key, spec) {
    return __awaiter(this, void 0, void 0, function* () { let result = null; switch (key) {
        case 'getVariableData':
            result = yield l1618(spec);
            break;
        case 'getPaidStatus':
            result = figma.payments.status.type;
            break;
        case 'figSubscribe': {
            yield figma.payments.initiateCheckoutAsync({ interstitial: 'PAID_FEATURE' });
            result = figma.payments.status.type;
            break;
        }
    } e1543({ cmd: 'returnFigGetValue', value: result }); });
}
function s1583(varIds) { l1618(varIds).then(values => { e1543({ cmd: 'uiReturnFigGetVariableUpdates', values: values }); }); }
function f1584(pageId) {
    return __awaiter(this, void 0, void 0, function* () { b1565(a932(pageId)); const pageOrder = (yield r1563('pageOrder')).split(','); w945(pageOrder, id => id == pageId); m1564('pageOrder', pageOrder.join(',')); });
}
function s1585() { figma.currentPage.loadAsync().then(() => { const pageKeys = figma.currentPage.getPluginDataKeys().filter(k => f1050(k)); pageKeys.forEach(k => b1565(k)); b1565('pageOrder'); }); }
function a1586(key, json) { m1564(key, json); }
function n1587(_keys, _json) { const keys = JSON.parse(_keys); const json = JSON.parse(_json); for (let i = 0; i < keys.length; i++)
    m1564(keys[i], json[i]); }
function g1588(_curKeys, _newKeys, _json) { const curKeys = JSON.parse(_curKeys); const newKeys = JSON.parse(_newKeys); const json = JSON.parse(_json); for (let i = 0; i < curKeys.length; i++) {
    b1565(curKeys[i]);
    m1564(newKeys[i], json[i]);
} }
function p1589(key) { b1565(key); }
function t1590() { figma.currentPage.loadAsync().then(() => { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => z1052(k)); connKeys.forEach(k => b1565(k)); }); }
function s1591(nodeId) { figma.currentPage.loadAsync().then(() => { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => z1052(k)); for (const key of connKeys) {
    const parts = key.split(' ');
    if (parts[4] == nodeId)
        b1565(key);
} }); }
function b1592(nodeId) { figma.currentPage.loadAsync().then(() => { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => z1052(k)); for (const key of connKeys) {
    const parts = key.split(' ');
    if (parts[1] == nodeId)
        b1565(key);
} }); }
function g1593() { figma.getLocalPaintStylesAsync().then(f1597 => { for (const style of f1597) {
    style.setPluginData('type', '');
    style.setPluginData('nodeId', '');
    style.setPluginData('existing', '');
} }); }
function figSaveSnapshot(index, objectIds) {
    return __awaiter(this, void 0, void 0, function* () { const objects = yield figGetObjectsFromIds(objectIds); const group = figma.group(objects, figma.currentPage); const settings = { format: 'PNG' }; const icon = yield group.exportAsync(settings); figma.ungroup(group); e1543({ cmd: 'uiReturnFigSaveSnapshot', index: index, iconWidth: group.width, iconHeight: group.height, icon: icon }); });
}
var q2736 = null;
var m4029 = () => q2736 = null;
var o2737 = 'normal';
function s1609(clientPosition) { e1543({ cmd: 'uiReturnFigGetMousePosition', position: { x: 0, y: 0 }, clientPosition: clientPosition, viewportZoom: figma.viewport.zoom, viewportRect: figma.viewport.bounds }); }
function m1610(x, y, width, height) { return; }
function r1611(dock, rect, bounds) { switch (dock) {
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
function b1612(width, height) { (function () {
    return __awaiter(this, void 0, void 0, function* () { width = Math.floor(Math.max(0, width)); height = Math.floor(Math.max(0, height)); figma.ui.resize(width, height); yield figma.currentPage.loadAsync(); figma.currentPage.setPluginData(figma.currentUser.id + ',windowWidth', width.toString()); figma.currentPage.setPluginData(figma.currentUser.id + ',windowHeight', height.toString()); e1543({ cmd: 'uiReturnFigResizeWindow', width: width, height: height }); });
})(); }
function d2738(dock) {
    return __awaiter(this, void 0, void 0, function* () { if (dock != 'normal' && o2737 == 'normal') {
        figma.clientStorage.setAsync('normalWindowX', yield figma.clientStorage.getAsync('normalWindowX'));
        figma.clientStorage.setAsync('normalWindowY', yield figma.clientStorage.getAsync('normalWindowY'));
        figma.clientStorage.setAsync('normalWindowWidth', yield figma.clientStorage.getAsync('normalWindowWidth'));
        figma.clientStorage.setAsync('normalWindowHeight', yield figma.clientStorage.getAsync('normalWindowHeight'));
    } o2737 = dock; figma.clientStorage.setAsync('windowDock', dock); b1612(yield figma.clientStorage.getAsync('windowWidth'), yield figma.clientStorage.getAsync('windowHeight')); });
}
function j1613(msg) { s1614(msg.text, msg.prefix, msg.delay, msg.error, msg.l1615, msg.j1616); }
function s1614(text, prefix = 'Generator ', delay = 400, error = false, l1615 = '', j1616 = NULL) { const options = { timeout: delay, error: error, onDequeue: m4029 }; if (l1615 != '') {
    options['button'] = { text: l1615 };
    if (j1616.substring(0, 'removeConnection'.length) == 'removeConnection') {
        options['button']['action'] = () => p1589(j1616.split(',')[1]);
    }
    else {
        switch (j1616) {
            case 'hideClearUndoWarning':
                options['button']['action'] = () => e1543({ cmd: 'uiHideClearUndoWarning' });
                break;
        }
    }
} if (q2736)
    q2736.cancel(); q2736 = figma.notify(prefix + text, options); }
function y2739(key, params = null) {
    return __awaiter(this, void 0, void 0, function* () { return yield z2740(key, params); });
}
function z2740(key, params = null) {
    return __awaiter(this, void 0, void 0, function* () { return new Promise((resolve, reject) => { const timeout = 60000; e1543(Object.assign({ cmd: 'uiGetValueForFigma', key: key }, (params || {}))); const m2741 = setTimeout(() => reject(new Error('Timeout: Result not received by Figma within the specified time')), timeout); function l4030(msg) { msg = JSON.parse(msg); if (msg.cmd === 'returnUiGetValueForFigma') {
        clearTimeout(m2741);
        resolve({ key: msg.key, value: msg.value });
        figma.ui.off('message', l4030);
    } } figma.ui.on('message', l4030); }); });
}
var t2742 = [];
var r2743 = [];
var b2744 = 0;
var v2745 = 0;
function m1544(r111) { return (r111[y1403] === 2 ? '' : v874) + (u2799 ? r111[w1397] : r111[p1399]); }
function p1545(p1529, addObject = null, addProps = true, transform = true) {
    return __awaiter(this, void 0, void 0, function* () { if (!i1547(p1529))
        return null; let s1530; switch (p1529[h1395]) {
        case q1219:
            s1530 = o2713(p1529, addProps, transform);
            break;
        case c1222:
            s1530 = k2792(p1529, addProps, transform);
            break;
        case i1225:
            s1530 = v2788(p1529, addProps, transform);
            break;
        case p1237:
            s1530 = k2709(p1529, addProps, transform);
            break;
        case p1240:
            s1530 = p2716(p1529, addProps, transform);
            break;
        case j1243:
            s1530 = j2719(p1529, addProps, transform);
            break;
        case o1246:
            s1530 = x2695(p1529);
            break;
        case g1250:
            s1530 = f2747(p1529, addProps, transform);
            break;
        case g1262:
            s1530 = q2748(p1529, addProps, transform);
            break;
        case s1286:
            s1530 = yield f2749(p1529, addProps, transform);
            break;
        case a1265:
            s1530 = yield i2750(p1529);
            break;
        case w1268:
            s1530 = yield k2751(p1529, addProps, transform);
            break;
    } if (addObject && s1530 != undefined && s1530 != null && !s1530.removed) {
        s1530.name = m1544(p1529);
        c952(p1529[h1395] == a1265 || !!s1530, 'no Figma object created');
        if (s1530 != undefined && s1530 != null) {
            s1530.setPluginData('retain', p1529[y1403].toString());
            if (p1529[y1403] < 2) {
                s1530.setPluginData('userId', figma.currentUser.id);
                s1530.setPluginData('sessionId', figma.currentUser.sessionId.toString());
                s1530.setPluginData('type', p1529[h1395]);
                s1530.setPluginData('nodeId', p1529[q1396]);
                s1530.setPluginData('objectId', p1529[w1397]);
                s1530.setPluginData('isCenter', t937(p1529[l1418]));
                if (p1529[h1395] == o1246)
                    h2765.push(s1530);
                if (p1529[g1417])
                    u1560(s1530);
            }
            addObject(s1530);
        }
    } if (!p1529.counted) {
        v2745++;
        p1529.counted = true;
    } return s1530; });
}
function c1546(s1530, p1529, addProps, transform) {
    return __awaiter(this, void 0, void 0, function* () { if (!i1547(p1529) || s1530 == undefined || s1530 == null || s1530.removed)
        return; s1530.name = m1544(p1529); s1530.setPluginData('retain', p1529[y1403].toString()); switch (p1529[h1395]) {
        case q1219:
            n2714(s1530, p1529, addProps, transform);
            break;
        case c1222:
            z2793(s1530, p1529, addProps, transform);
            break;
        case i1225:
            x2789(s1530, p1529, addProps, transform);
            break;
        case p1237:
            k2710(s1530, p1529, addProps, transform);
            break;
        case p1240:
            n2717(s1530, p1529, addProps, transform);
            break;
        case j1243:
            s2720(s1530, p1529, addProps, transform);
            break;
        case o1246:
            c2752(s1530, p1529);
            break;
        case g1250:
            y2753(s1530, p1529, addProps, transform);
            break;
        case g1262:
            w2754(s1530, p1529, addProps, transform);
            break;
        case s1286:
            d2755(s1530, p1529, addProps, transform);
            break;
        case a1265:
            i2756(s1530, p1529);
            break;
        case w1268:
            a2757(s1530, p1529, addProps, transform);
            break;
    } if (s1530 != undefined && s1530 != null && !s1530.removed) {
        if (s1530.parent == figma.currentPage)
            yield figma.currentPage.loadAsync();
        s1530.parent.appendChild(s1530);
        if (p1529[g1417])
            u1560(s1530);
    } if (!p1529.counted) {
        v2745++;
        p1529.counted = true;
    } });
}
function f2732(d2758, d2759, r2760, n2067 = -1, nodeIds = [], v2761 = false, j2762 = false, g270 = false, addProps = true, transform = true) {
    return __awaiter(this, void 0, void 0, function* () { let k2763 = NULL; let b2764 = null; let abort = false; const i3642 = []; let y2746 = 0; t2742.push(...nodeIds); if (n2067 > -1)
        b2744 = n2067; for (const p1529 of d2759) {
        r2743.push(p1529);
        if (p1529[q1396] != k2763) {
            k2763 = p1529[q1396];
            b2764 = k2729.find(a => a.nodeId == p1529[q1396]);
            if (!b2764) {
                k2729.push(b2764 = { nodeId: p1529[q1396], objects: [] });
            }
        }
        const addObject = s1530 => { if (d2758 != undefined && d2758 != null && !d2758.removed)
            d2758.appendChild(s1530);
        else
            b2764.objects.push(s1530); };
        let objects = d2758 != undefined && d2758 != null && !d2758.removed ? d2758.children : b2764.objects;
        let s1530 = objects.find(o => o.removed || o.getPluginData('userId') == figma.currentUser.id && o.getPluginData('objectId') == p1529[w1397]);
        if (s1530 != undefined && s1530 != null && s1530.removed) {
            g938(objects, s1530);
            if (h2765.includes(s1530))
                k943(h2765, s1530);
            if (r2781.includes(s1530))
                k943(r2781, s1530);
        }
        if (s1530 == undefined || s1530 == null || s1530.removed) {
            const newObj = yield p1545(p1529, addObject, addProps, transform);
            i3642.push(newObj);
        }
        else if (s1530 != undefined && s1530 != null && !s1530.removed && s1530.getPluginData('type') == p1529[h1395].toString()) {
            yield c1546(s1530, p1529, addProps, transform);
            if (s1530 != undefined && s1530 != null && !s1530.removed)
                i3642.push(s1530);
        }
        else {
            s1530.remove();
            if (h2765.includes(s1530))
                k943(h2765, s1530);
            if (r2781.includes(s1530))
                k943(r2781, s1530);
            yield p1545(p1529, addObject, addProps, transform);
        }
        y2746++;
        if (y2746 >= r2760) {
            const result = yield y2739('returnObjectUpdate', { b2744: b2744, v2745: v2745 });
            abort = result.value;
            y2746 = 0;
            if (abort)
                break;
        }
    } if (d2758 != undefined && d2758 != null && !d2758.removed) {
        for (const s1530 of d2758.children) {
            if (s1530 != undefined && s1530 != null && s1530.removed || !d2759.find(o => o[w1397] == s1530.getPluginData('objectId') && s1530.getPluginData('userId') == figma.currentUser.id))
                s1530.remove();
        }
    } for (const point of h2765) {
        if (point.parent == figma.currentPage)
            yield figma.currentPage.loadAsync();
        if (point != undefined && point != null && !point.removed && !point.parent.removed)
            point.parent.appendChild(point);
    } if (j2762 && !abort) {
        q1526(t2742, r2743);
        t2742 = [];
        r2743 = [];
        if (g270 && i3642.length > 0) {
            figma.viewport.scrollAndZoomIntoView(i3642);
            const bounds = k1550(i3642);
            figma.viewport.zoom = Math.min(figma.viewport.bounds.width * figma.viewport.zoom / bounds.width - 0.05, figma.viewport.bounds.height * figma.viewport.zoom / bounds.height - 0.05);
        }
    } yield y2739('returnObjectUpdate', { b2744: b2744, v2745: v2745 }); });
}
function i1547(p1529) { switch (p1529[h1395]) {
    case q1219: return s2712(p1529);
    case c1222: return k2774(p1529);
    case i1225: return g2775(p1529);
    case p1237: return j4026(p1529);
    case p1240: return c2715(p1529);
    case j1243: return b2718(p1529);
    case o1246: return k4025(p1529);
    case g1250: return q2776(p1529);
    case g1262: return f2777(p1529);
    case s1286: return e2778(p1529);
    case a1265: return v2779(p1529);
    case w1268: return r2780(p1529);
} }
function j1548(p1529) {
    return __awaiter(this, void 0, void 0, function* () { (() => __awaiter(this, void 0, void 0, function* () { const s1530 = yield p1545(p1529); const width = s1530.width; const height = s1530.height; s1530.remove(); e1543({ cmd: 'uiForwardToGenerator', msg: { cmd: 'returnFigGetObjectSize', objectId: p1529[w1397], width: width, height: height } }); }))(); });
}
function z1549(s1530) { s1530.setPluginData('type', ''); s1530.setPluginData('nodeId', ''); s1530.setPluginData('userId', ''); s1530.setPluginData('sessionId', ''); s1530.setPluginData('objectId', ''); s1530.setPluginData('isCenter', ''); s1530.setPluginData('retain', ''); }
function k1550(objects) { const bounds = { left: 0, top: 0, right: 0, bottom: 0 }; for (const r111 of objects) {
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
        let s1530 = figma.currentPage.children.find(o => !o.removed && o.getPluginData('userId') == figma.currentUser.id && o.getPluginData('objectId') == objId);
        if (!s1530)
            continue;
        const settings = { constraint: { type: 'SCALE', value: scale }, format: format == 0 ? 'PNG' : 'JPG', suffix: suffix };
        yield s1530.exportAsync(settings);
    } });
}
const r2781 = [];
const q2782 = [];
function z1551(a1552, v1553) { const effects = []; for (const effect of a1552) {
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
                if (v1553 && !isNaN(spread))
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
function f2702(s1530, p1529, phantom = true) { b1556(s1530, p1529); u2703(s1530, p1529, phantom); u2704(s1530, p1529); s1530.opacity = p1529[k1419]; s1530.blendMode = p1529[w1420]; const maskType = p1529[b1421]; s1530.isMask = maskType > 0; if (s1530.isMask) {
    switch (maskType) {
        case 1:
            s1530.maskType = 'ALPHA';
            break;
        case 2:
            s1530.maskType = 'VECTOR';
            break;
        case 3:
            s1530.maskType = 'LUMINANCE';
            break;
    }
} if (s1530.isMask && s1530.fills.length == 0 && s1530.strokes.length == 0)
    s1530.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 }, opacity: 1, blendMode: 'NORMAL' }]; }
function u2704(s1530, p1529) { if (!!p1529[f1408] && !isEmpty(p1529[f1408])) {
    s1530.fills = y956(p1529[f1408]);
    if (r2781.includes(s1530))
        k943(r2781, s1530);
}
else
    s1530.fills = []; }
function u2703(s1530, p1529, phantom = true) { if (p1529[o1409] != null && !isEmpty(p1529[o1409])) {
    m1555(s1530, y956(p1529[o1409]), p1529[h1410], p1529[n1411], p1529[c1412], p1529[o1413], p1529[o1414], o2705(p1529[n1415]));
    if (p1529[g1417])
        s1530.setPluginData('dashes', p1529[n1415]);
    if (r2781.includes(s1530))
        k943(r2781, s1530);
    if (p1529[g1417])
        b949(q2782, s1530);
}
else if (isEmpty(p1529[f1408]) && isEmpty(p1529[o1409]) && !p1529[b1421] && phantom) {
    t1558(s1530);
    b949(r2781, s1530);
}
else
    s1530.strokes = []; }
function o2705(d1554) { d1554 = d1554; d1554 = p954(d1554, ','); d1554 = i955(d1554, ','); d1554 = d1554.trim(); return d1554 == '' ? [] : d1554.split(',').map(s => Math.max(0, parseFloat(s))); }
function c2706(d1554) { d1554 = d1554; d1554 = p954(d1554, ','); d1554 = i955(d1554, ','); d1554 = d1554.trim(); return d1554 == '' ? [] : d1554.split(',').map(s => Math.max(0, parseFloat(s) / v2708)); }
function m1555(s1530, fills, weight, align, join, miterLimit, cap, dashes = []) { s1530.strokes = fills; s1530.strokeWeight = Math.max(0, weight); s1530.strokeAlign = align; s1530.strokeJoin = join; const miterAngle = miterLimit / 360 * Tau; const i2783 = 1 / Math.sin(miterAngle / 2); s1530.strokeMiterLimit = Math.min(Math.max(0, i2783), 16); s1530.strokeCap = cap; s1530.dashPattern = dashes; }
function b1556(s1530, p1529) { if (!!p1529[c1416] && !isEmpty(p1529[c1416])) {
    const v1553 = p1529[h1395] == q1219 || p1529[h1395] == i1225 || p1529[h1395] == w1268;
    s1530.effects = z1551(p1529[c1416], v1553);
}
else
    s1530.effects = []; }
function j1557() { for (const r111 of r2781) {
    if (r111.removed)
        k943(r2781, r111);
    else
        t1558(r111);
} }
function t1558(r111) { figma.currentPage.loadAsync().then(() => { const back = figma.currentPage.backgrounds.find(b => b.type == 'SOLID'); let phantomColor; if (back) {
    const l = back.color.r * 0.2126 + back.color.g * 0.7152 + back.color.b * 0.0722;
    phantomColor = l > 0.5 ? { r: 0, g: 0, b: 0 } : { r: 1, g: 1, b: 1 };
}
else
    phantomColor = { r: 1, g: 0, b: 1 }; m1555(r111, [{ type: 'SOLID', color: phantomColor, opacity: 0.5 }], 1 / v2708, 'CENTER', 'MITER', 1, 'NONE', [1 / v2708, 2 / v2708]); }); }
function s1559() { for (const s1530 of q2782) {
    if (s1530.removed)
        k943(q2782, s1530);
    else
        u1560(s1530);
} }
function u1560(s1530) { s1530.strokeWeight = Math.max(0, 1.5 / v2708); if (f923(s1530.getPluginData('isCenter'))) {
    const path = s1530.vectorPaths[0];
    const parts = path.data.split(' ');
    let t = { x: parseFloat(parts[1]), y: parseFloat(parts[2]) };
    let c = { x: parseFloat(parts[4]), y: parseFloat(parts[5]) };
    let r = { x: parseFloat(parts[7]), y: parseFloat(parts[8]) };
    const a = 2;
    const b = 0.05;
    const f = 1 - Math.pow(1 - Math.min(v2708, 1), a) / Math.pow(a, b);
    t = o895(c, v897(u886(r900(t, c)), objectCenterSize / f));
    r = o895(c, v897(u886(r900(r, c)), objectCenterSize / f));
    parts[1] = t.x;
    parts[2] = t.y;
    parts[4] = c.x;
    parts[5] = c.y;
    parts[7] = r.x;
    parts[8] = r.y;
    const c2784 = { windingRule: path.windingRule, data: parts.join(' ') };
    s1530.vectorPaths = [c2784];
} const dashes = s1530.getPluginData('dashes'); if (dashes != '')
    s1530.dashPattern = c2706(dashes); }
function a1594(nodeId, px, py) { figma.getLocalPaintStylesAsync().then(_styles => { const styles = new Array(); for (const m168 of _styles) {
    const _nodeId = m168.getPluginData('nodeId');
    const _existing = m168.getPluginData('existing');
    const existing = !!_existing;
    const style = { id: m168.id, nodeId: _nodeId, name: m168.name, existing: existing, paints: new Array() };
    let onlyPaint = true;
    for (const b2786 of m168.paints) {
        if (b2786.type == 'SOLID') {
            style.paints.push([b2786.color.r, b2786.color.g, b2786.color.b, b2786.opacity]);
        }
        else {
            onlyPaint = false;
            break;
        }
    }
    if (onlyPaint)
        styles.push(style);
} e1543({ cmd: 'uiReturnFigGetAllLocalColorStyles', nodeId: nodeId, px: px, py: py, styles: JSON.stringify(styles) }); }); }
function f1595(nodeId, styleId) { figma.getLocalPaintStylesAsync().then(f1597 => { if (styleId != NULL)
    y1596(f1597, nodeId, styleId);
else
    r1598(f1597, nodeId); }); }
function y1596(f1597, nodeId, styleId, clearExisting = true) { const y2785 = d2731.find(a => a.nodeId == nodeId); if (y2785 && clearExisting)
    r1598(f1597, nodeId); const q1602 = f1597.find(s => s.id == styleId); c952(!!q1602, 'figStyle should be found here'); q1602.setPluginData('type', k1216); q1602.setPluginData('nodeId', nodeId); q1602.setPluginData('existing', t937(true)); d2731.push({ nodeId: nodeId, existing: true, styles: [q1602] }); return q1602; }
function r1598(f1597, nodeId) { const q1602 = f1597.find(s => s.getPluginData('nodeId') == nodeId); c952(!!q1602, 'figStyle should be found here'); if (q1602) {
    q1602.setPluginData('type', NULL);
    q1602.setPluginData('nodeId', NULL);
    q1602.setPluginData('existing', NULL);
    w945(d2731, a => a.nodeId == nodeId);
} return q1602; }
function k1599(styles, t1603) { const q1602 = figma.createPaintStyle(); q1602.setPluginData('type', t1603[h1395]); q1602.setPluginData('nodeId', t1603[q1396]); q1602.name = t1603[u1400]; setStylePaints(q1602, t1603); styles.push(q1602); e1543({ cmd: 'uiSetStyleId', nodeId: t1603[q1396], styleId: q1602.id }); return q1602; }
function i1600(msg) { let k2763 = NULL; let y2785; for (const t1603 of msg.styles) {
    if (t1603[q1396] != k2763) {
        k2763 = t1603[q1396];
        y2785 = d2731.find(a => a.nodeId == t1603[q1396]);
        if (!y2785) {
            y2785 = { nodeId: t1603[q1396], styles: [] };
            d2731.push(y2785);
        }
    }
    else
        y2785 = null;
    const q1602 = y2785.styles[0];
    figma.getLocalPaintStylesAsync().then(f1597 => { const localStyle = f1597.find(s => s.getPluginData('nodeId') == t1603[q1396]); if (isValid(q1602) && !isValid(localStyle)) {
        g938(y2785.styles, q1602);
    } const existing = isValid(q1602) && isValid(localStyle) && q1602.getPluginData('existing'); if (!isValid(q1602) || !isValid(localStyle)) {
        if (!existing) {
            j1533 = true;
            f1595(t1603[q1396], t1603[w1398]);
        }
    }
    else if (isValid(q1602) && q1602.getPluginData('type') == t1603[h1395]) {
        j1533 = true;
        p1601(localStyle, t1603);
    } });
} }
function p1601(q1602, t1603) { setStylePaints(q1602, t1603); q1602.name = t1603[u1400]; }
function getStylePaints(stylePaints) { const paints = new Array(); for (const b2786 of stylePaints) {
    const fill = b2786[1].split(' ');
    switch (b2786[0]) {
        case 'SOLID':
            paints.push({ type: 'SOLID', color: { r: Math.min(Math.max(0, parseFloat(fill[0]) / 0xff), 1), g: Math.min(Math.max(0, parseFloat(fill[1]) / 0xff), 1), b: Math.min(Math.max(0, parseFloat(fill[2]) / 0xff), 1) }, opacity: Math.min(Math.max(0, parseFloat(fill[3]) / 100), 1) });
            break;
    }
} return paints; }
function setStylePaints(q1602, t1603) { if (!isEmpty(t1603[b1402]))
    q1602.paints = getStylePaints(t1603[b1402]);
else
    q1602.paints = []; }
function d1617(nodeId, px, py) { figma.variables.getLocalVariablesAsync().then((h2787) => __awaiter(this, void 0, void 0, function* () { const variables = new Array(); for (const _var of h2787) {
    try {
        const collection = yield figma.variables.getVariableCollectionByIdAsync(_var.variableCollectionId);
        const variable = { id: _var.id, resolvedType: _var.resolvedType, name: _var.name, collectionName: collection.name };
        variables.push(variable);
    }
    catch (ex) { }
} figma.variables.getLocalVariableCollectionsAsync().then((collections) => __awaiter(this, void 0, void 0, function* () { e1543({ cmd: 'uiReturnFigGetAllLocalVariables', nodeId: nodeId, px: px, py: py, variables: JSON.stringify(variables), nCollections: collections.length }); })); })); }
function l1618(varIds) {
    return __awaiter(this, void 0, void 0, function* () { const h2787 = yield figma.variables.getLocalVariablesAsync(); const variables = varIds.map(id => h2787.find(v => v.id == id)); let values = []; for (let i = 0; i < varIds.length; i++) {
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
function t1619(nodeId, varId) { figma.variables.getLocalVariablesAsync().then(h2787 => { figLinkVariableAsync(h2787, nodeId, varId); }); }
function figUpdateVariableAsync(varId, value) {
    return __awaiter(this, void 0, void 0, function* () { figma.variables.getLocalVariablesAsync().then((h2787) => __awaiter(this, void 0, void 0, function* () { let variable = h2787.find(v => v.id == varId); if (!variable)
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
function figLinkVariableAsync(h2787, nodeId, varId) {
    return __awaiter(this, void 0, void 0, function* () { let variable = h2787.find(v => v.id == varId); if (!variable)
        return null; const [resolvedVar, values] = yield figGetResolvedVariableValuesAsync(variable); e1543({ cmd: 'uiReturnFigLinkNodeToVariable', nodeId: nodeId, variableId: resolvedVar ? resolvedVar.id : NULL, variableName: resolvedVar ? resolvedVar.name : '', resolvedType: resolvedVar ? resolvedVar.resolvedType : NULL, values: values }); return resolvedVar; });
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
function x1604(tl, tr, bl) { let vr = point(tr.x - tl.x, tr.y - tl.y); let vb = point(bl.x - tl.x, bl.y - tl.y); let sx = vr.x; let sy = vb.y; let kx = -vr.y; let ky = -vb.x; let dx = -tl.x; let dy = -tl.y; const _sx = kx / nozero(sx); const _sy = ky / nozero(sy); let f4207 = q889([[1, _sy, 0], [_sx, 1, 0], [0, 0, 1]], z893(dx, dy)); f4207 = p891(f4207); const a = w883(vr); if (a > Tau / 4 && a < Tau * 3 / 4)
    f4207 = q889(f4207, z893(0, 0, 1, 1, Tau / 2)); if (determinant(f4207) < 0)
    f4207 = q889(f4207, z893(0, 0, -1, 1, 0)); return f4207; }
function b1605(s1530, tl, tr, bl) { const f4207 = x1604(tl, tr, bl); s1530.relativeTransform = [f4207[0], f4207[1]]; }
function c1606(s1530, p1529, setSize = true, noHeight = 0.01) { if (!p1529[z1404] || !p1529[a1405] || !p1529[b1406])
    return; const xp0 = p1529[z1404]; const xp1 = p1529[a1405]; const xp2 = p1529[b1406]; b1605(s1530, xp0, xp1, xp2); if (setSize) {
    const scaleX = distv(xp0, xp1);
    const scaleY = distv(xp0, xp2);
    const height = p1529[h1395] == j1243 ? p1529[o1439] : p1529[q1426];
    if (!s1530.removed) {
        s1530.resizeWithoutConstraints(Math.max(0.01, scaleX), height ? Math.max(0.01, scaleY) : noHeight);
    }
} }
function f1607(m2700, e2701) { if (m2700.removed)
    return; m2700.resizeWithoutConstraints(0.01, 0.01); m2700.setPluginData('actualX', e2701[e1422].toString()); m2700.setPluginData('actualY', e2701[s1424].toString()); m2700.x = e2701[e1422]; m2700.y = e2701[s1424]; m2700.rotation = e2701[l1418] ? 45 : 0; }
function l1608(m2700) { if (!m2700.removed)
    m2700.resizeWithoutConstraints(0.01, 0.01); }
function e2778(genBool) { return true; }
function f2749(genBool, addProps, transform) {
    return __awaiter(this, void 0, void 0, function* () { let objects = []; for (const r111 of genBool[l1453])
        yield p1545(r111, o => objects = [...objects, o], false); yield figma.currentPage.loadAsync(); let figBool = null; if (!isEmpty(objects)) {
        switch (genBool[t1454]) {
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
        d2755(figBool, genBool, addProps, transform);
    } return figBool; });
}
function d2755(figBool, genBool, addProps, transform) {
    return __awaiter(this, void 0, void 0, function* () { if (genBool[l1453].length == 0) {
        figBool.remove();
        return;
    } yield f2732(figBool, genBool[l1453], genBool[l1453].length, -1, [], false, false, false, false, true); const hasProps = genBool[f1408].length > 0 || genBool[o1409].length > 0 || genBool[c1416].length > 0; f2702(figBool, genBool, !hasProps && addProps); });
}
function g2775(i2766) { return i2766[e1422] != null && !isNaN(i2766[e1422]) && i2766[s1424] != null && !isNaN(i2766[s1424]) && i2766[c1425] != null && !isNaN(i2766[c1425]) && i2766[q1426] != null && !isNaN(i2766[q1426]) && i2766[n1428] != null && !isNaN(i2766[n1428]) && i2766[k1435] != null && !isNaN(i2766[k1435]) && i2766[i1441] != null && !isNaN(i2766[i1441]) && i2766[h1445] != null && !isNaN(i2766[h1445]); }
function v2788(i2766, addProps, transform) { if (!g2775(i2766))
    return null; const a2767 = figma.createEllipse(); x2789(a2767, i2766, addProps, transform, true); return a2767; }
function x2789(a2767, i2766, addProps, transform, isValid = false) { if (!isValid && !g2775(i2766))
    return; n2790(a2767, i2766, transform); if (h2765.includes(a2767))
    e2697(a2767);
else
    f2702(a2767, i2766, addProps); }
function n2790(a2767, i2766, transform) { a2767.cornerRadius = i2766[n1428]; const start = i2766[k1435] / 360 * (Math.PI * 2); const sweep = i2766[i1441] / 100 * (Math.PI * 2); a2767.arcData = { startingAngle: start, endingAngle: start + sweep, innerRadius: Math.min(Math.max(0, i2766[h1445] / 100), 1) }; if (transform)
    c1606(a2767, i2766); }
function r2780(o2768) { return o2768[e1422] != null && !isNaN(o2768[e1422]) && o2768[s1424] != null && !isNaN(o2768[s1424]) && o2768[c1425] != null && !isNaN(o2768[c1425]) && o2768[q1426] != null && !isNaN(o2768[q1426]) && o2768[g1434] != null && !isNaN(o2768[g1434]) && o2768[s1455] != null && !isNaN(o2768[s1455]); }
function k2751(o2768, addProps, transform) {
    return __awaiter(this, void 0, void 0, function* () { if (!r2780(o2768))
        return null; const s2769 = figma.createFrame(); if (s2769) {
        s2769.expanded = false;
        q2791(s2769, o2768, addProps, transform);
        let objects = [];
        for (const r111 of o2768[g1440])
            yield p1545(r111, o => objects = [...objects, o]);
        for (const r111 of objects)
            s2769.appendChild(r111);
    } return s2769; });
}
function a2757(s2769, o2768, addProps, transform) { q2791(s2769, o2768, addProps, transform); f2732(s2769, o2768[g1440], o2768[g1440].length); }
function q2791(s2769, o2768, addProps, transform) { s2769.cornerRadius = o2768[g1434]; s2769.clipsContent = o2768[s1455] > 0; if (transform)
    c1606(s2769, o2768); f2702(s2769, o2768, addProps && o2768[g1440].length == 0); figUpdateStrokeSides(s2769, o2768); }
function v2779(m2770) { return true; }
function i2750(m2770) {
    return __awaiter(this, void 0, void 0, function* () { let objects = []; for (const r111 of m2770[n1423])
        yield p1545(r111, o => objects = [...objects, o]); yield figma.currentPage.loadAsync(); const b2771 = !isEmpty(objects) ? figma.group(objects, figma.currentPage) : null; if (b2771) {
        b2771.expanded = false;
        i2756(b2771, m2770);
    } return b2771; });
}
function i2756(b2771, m2770) { if (m2770[n1423].length == 0) {
    b2771.remove();
    return;
} f2732(b2771, m2770[n1423], m2770[n1423].length); b1556(b2771, m2770); }
function k2774(j2772) { return j2772[e1422] != null && !isNaN(j2772[e1422]) && j2772[s1424] != null && !isNaN(j2772[s1424]) && j2772[c1425] != null && !isNaN(j2772[c1425]); }
function k2792(j2772, addProps, transform) { if (!k2774(j2772))
    return null; const c2773 = figma.createLine(); z2793(c2773, j2772, addProps, transform, true); return c2773; }
function z2793(c2773, j2772, addProps, transform, isValid = false) { if (!isValid && !k2774(j2772))
    return; if (transform)
    c1606(c2773, j2772, true, 0); f2702(c2773, j2772, addProps); }
var h2765 = [];
function k4025(e2701) { return e2701[e1422] != null && !isNaN(e2701[e1422]) && e2701[s1424] != null && !isNaN(e2701[s1424]); }
function x2695(e2701) { const m2700 = e2701[l1418] ? figma.createRectangle() : figma.createEllipse(); if (!k4025(e2701))
    return m2700; if (h2765.includes(m2700))
    p2699(m2700, e2701);
else
    c2752(m2700, e2701); return m2700; }
function c2752(m2700, e2701) { f1607(m2700, e2701); i2698(m2700); }
function x2696() { e1543({ cmd: 'uiUpdateZoom', zoom: figma.viewport.zoom }); for (const point of h2765)
    e2697(point); }
function e2697(m2700) { l1608(m2700); i2698(m2700); }
function p2699(m2700, e2701) { f1607(m2700, e2701); i2698(m2700); }
function i2698(m2700) { if (m2700.removed)
    return; figma.currentPage.loadAsync().then(() => { const isCenter = f923(m2700.getPluginData('isCenter')); const x2707 = figma.currentPage.selection.includes(m2700); const color = isCenter ? [0xf2, 0x48, 0x22] : x2707 ? [12, 140, 233] : [255, 255, 255]; const border = isCenter ? [255, 255, 255] : x2707 ? [255, 255, 255] : [12, 140, 233]; m2700.fills = y956([['SOLID', color[0], color[1], color[2], 100]]); const effects = []; effects.push(...z1551([['DROP_SHADOW', border[0] / 255, border[1] / 255, border[2] / 255, 1, 0, 0, 0, (isCenter ? 3 : x2707 ? 5 : 3.6) / v2708, 'NORMAL', true, true]], true)); effects.push(...z1551([['DROP_SHADOW', color[0] / 255, color[1] / 255, color[2] / 255, 1, 0, 0, 0, (x2707 ? 4 : 2.4) / v2708, 'NORMAL', true, true]], true)); m2700.effects = effects; }); }
function j4026(genPoly) { return genPoly[e1422] != null && !isNaN(genPoly[e1422]) && genPoly[s1424] != null && !isNaN(genPoly[s1424]) && genPoly[c1425] != null && !isNaN(genPoly[c1425]) && genPoly[q1426] != null && !isNaN(genPoly[q1426]) && genPoly[t1431] != null && !isNaN(genPoly[t1431]) && genPoly[i1437] != null && !isNaN(genPoly[i1437]); }
function k2709(genPoly, addProps, transform) { if (!j4026(genPoly))
    return null; const figPoly = figma.createPolygon(); k2710(figPoly, genPoly, addProps, transform, true); return figPoly; }
function k2710(figPoly, genPoly, addProps, transform, isValid = false) { if (!isValid && !j4026(genPoly))
    return; figPoly.cornerRadius = genPoly[t1431]; figPoly.pointCount = Math.max(3, genPoly[i1437]); if (transform)
    c1606(figPoly, genPoly); f2702(figPoly, genPoly, addProps); }
function s2712(o2711) { return o2711[e1422] != null && !isNaN(o2711[e1422]) && o2711[s1424] != null && !isNaN(o2711[s1424]) && o2711[c1425] != null && !isNaN(o2711[c1425]) && o2711[q1426] != null && !isNaN(o2711[q1426]) && o2711[k1427] != null && !isNaN(o2711[k1427]); }
function o2713(o2711, addProps, transform) { if (!s2712(o2711))
    return null; const figRect = figma.createRectangle(); n2714(figRect, o2711, addProps, transform, true); return figRect; }
function n2714(figRect, o2711, addProps, transform, isValid = false) { if (!isValid && !s2712(o2711))
    return; const foundCorners = o2711[c1416].findIndex(e => e[0] == 'ROUND_CORNERS'); if (foundCorners > -1) {
    const corners = o2711[c1416][foundCorners];
    figRect.topLeftRadius = corners[1];
    figRect.topRightRadius = corners[2];
    figRect.bottomLeftRadius = corners[3];
    figRect.bottomRightRadius = corners[4];
}
else
    figRect.cornerRadius = o2711[k1427]; if (transform)
    c1606(figRect, o2711); f2702(figRect, o2711, addProps); figUpdateStrokeSides(figRect, o2711); }
function figUpdateStrokeSides(s1530, p1529) { const foundSides = p1529[c1416].findIndex(e => e[0] == 'STROKE_SIDES'); if (foundSides < 0)
    return; const sides = p1529[c1416][foundSides]; s1530.strokeWeight = 0; s1530.strokeTopWeight = sides[1]; s1530.strokeLeftWeight = sides[2]; s1530.strokeRightWeight = sides[3]; s1530.strokeBottomWeight = sides[4]; }
function c2715(q2725) { return q2725[e1422] != null && !isNaN(q2725[e1422]) && q2725[s1424] != null && !isNaN(q2725[s1424]) && q2725[c1425] != null && !isNaN(q2725[c1425]) && q2725[q1426] != null && !isNaN(q2725[q1426]) && q2725[o1432] != null && !isNaN(q2725[o1432]) && q2725[q1438] != null && !isNaN(q2725[q1438]) && q2725[p1443] != null && !isNaN(q2725[p1443]); }
function p2716(q2725, addProps, transform) { if (!c2715(q2725))
    return null; const x2726 = figma.createStar(); n2717(x2726, q2725, addProps, transform, true); return x2726; }
function n2717(x2726, q2725, addProps, transform, isValid = false) { if (!isValid && !c2715(q2725))
    return; x2726.cornerRadius = q2725[o1432]; x2726.pointCount = q2725[q1438]; x2726.innerRadius = Math.min(Math.max(0, q2725[p1443] / 100), 1); if (transform)
    c1606(x2726, q2725); f2702(x2726, q2725, addProps); }
const g4268 = [];
function b2718(w2722) { return w2722[w1444] != null && w2722[e1422] != null && !isNaN(w2722[e1422]) && w2722[s1424] != null && !isNaN(w2722[s1424]) && w2722[c1425] != null && !isNaN(w2722[c1425]) && w2722[q1426] != null && !isNaN(w2722[q1426]) && w2722[q1446] != null && w2722[q1446] != NULL && w2722[l1447] != null && !isNaN(w2722[l1447]); }
function j2719(w2722, addProps, transform) { if (!b2718(w2722))
    return null; const h2794 = figma.createText(); s2720(h2794, w2722, addProps, transform, true); return h2794; }
function s2720(h2794, w2722, addProps, transform, isValid = false) { if (!isValid && !b2718(w2722))
    return null; const fontName = { family: w2722[q1446], style: w2722[w1448] }; try {
    if (!g4268.includes(fontName)) {
        figma.loadFontAsync(fontName).then(() => { g4268.push(fontName); j2721(h2794, w2722, fontName, addProps, transform); });
    }
    else {
        j2721(h2794, w2722, fontName, addProps, transform);
    }
}
catch (e) {
    q953(e);
} }
function j2721(h2794, w2722, fontName, addProps, transform) { h2794.fontName = fontName; h2794.fontSize = Math.max(1, w2722[l1447]); h2794.characters = w2722[w1444]; h2794.lineHeight = { unit: 'PERCENT', value: w2722[k1451] }; h2794.letterSpacing = { unit: 'PERCENT', value: w2722[k1452] }; if (w2722[u1449] == 0)
    h2794.textAlignHorizontal = 'LEFT';
else if (w2722[u1449] == 1)
    h2794.textAlignHorizontal = 'CENTER';
else if (w2722[u1449] == 2)
    h2794.textAlignHorizontal = 'RIGHT';
else if (w2722[u1449] == 3)
    h2794.textAlignHorizontal = 'JUSTIFIED'; if (w2722[e1450] == 0)
    h2794.textAlignVertical = 'TOP';
else if (w2722[e1450] == 1)
    h2794.textAlignVertical = 'CENTER';
else if (w2722[e1450] == 2)
    h2794.textAlignVertical = 'BOTTOM'; if (transform)
    c1606(h2794, w2722); f2702(h2794, w2722, addProps); if (w2722[d1433] == 0 && w2722[o1439] == 0)
    h2794.textAutoResize = 'WIDTH_AND_HEIGHT';
else if (w2722[d1433] == 0)
    h2794.textAutoResize = 'HEIGHT';
else
    h2794.textAutoResize = 'NONE'; }
function f2777(g2727) { return true; }
function q2748(g2727, addProps, transform) { if (!f2777(g2727))
    return null; const o2728 = figma.createVector(); w2754(o2728, g2727, addProps, transform, true); return o2728; }
function w2754(o2728, g2727, addProps, transform, isValid = false) { if (!isValid && !f2777(g2727))
    return; o2728.setVectorNetworkAsync(g2727[k1429]); if (transform)
    c1606(o2728, g2727, false); f2702(o2728, g2727, addProps); }
function q2776(f2723) { return f2723[n1436] != null && !isNaN(f2723[n1436]) && f2723[l1442] != null && !isNaN(f2723[l1442]); }
function f2747(f2723, addProps, transform) { const r2724 = figma.createVector(); y2753(r2724, f2723, addProps, transform, true); return r2724; }
function y2753(r2724, f2723, addProps, transform, isValid = false) { if (!isValid && !q2776(f2723))
    return; r2724.vectorPaths = [{ windingRule: f2723[n1436] == 1 ? 'NONZERO' : 'EVENODD', data: f2723[g1430] }]; r2724.cornerRadius = Number(f2723[l1442]); if (transform)
    c1606(r2724, f2723, false); f2702(r2724, f2723, addProps); }
