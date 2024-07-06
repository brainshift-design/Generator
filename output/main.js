var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function v1048(key, tag) { return key.substring(0, tag.length + 1) == tag + ' '; }
function a1049(key, tag) { return key.substring(tag.length + 1); }
function j1050(key) { return v1048(key, x877); }
function d1051(key) { return v1048(key, y875); }
function t1052(key) { return v1048(key, k876); }
function m1053(key) { return a1049(key, x877); }
function x1054(key) { return a1049(key, y875); }
function n1055(key) { return a1049(key, k876); }
const generatorVersion = 437;
const b869 = 2147483647;
const NULL = '';
const y870 = '  ';
const l871 = '    ';
const t872 = '\n';
const b873 = '◦ G •';
const v874 = b873 + ' ';
const y875 = 'G_NODE';
const k876 = 'G_CONN';
const x877 = 'G_PAGE';
const j878 = 'G_TEMP';
const minWindowWidth = 602;
const minWindowHeight = 39;
const identity = Object.freeze([[1, 0, 0], [0, 1, 0], [0, 0, 1]]);
const Epsilon = 0.0000001;
const Tau = Math.PI * 2;
var enableAsserts = false;
function w879(x, eps = 0.000000001) { return Math.abs(x) < eps ? 0 : x; }
function nozero(x, eps = 0.000000001) { return x != 0 ? x : (x < 0 ? -eps : eps); }
function m880(v, eps = 0.000000001) { return point(nozero(v.x, eps), nozero(v.y, eps)); }
function equal(a, b, eps = 0.000000001) { return Math.abs(b - a) < eps; }
function sqr(x) { return x * x; }
;
function cube(x) { return x * x * x; }
;
function e881(f) { return Math.floor(f) | 0; }
function n882(x) { x = e881(x); x--; x |= x >> 1; x |= x >> 2; x |= x >> 4; x |= x >> 8; x |= x >> 16; x |= x >> 32; return ++x; }
function gcd(a, b) { let temp; while (1) {
    temp = a % b;
    if (temp == 0)
        return b;
    a = b;
    b = temp;
} }
function distv(p1, p2) { const dx = p2.x - p1.x; const dy = p2.y - p1.y; return Math.sqrt(dx * dx + dy * dy); }
function o883(v) { let angle = Math.atan2(v.y, v.x); if (angle < 0)
    angle += Tau; return angle; }
function anglev2(v1, v2) { return anglev2_(v1.x, v1.y, v2.x, v2.y); }
function anglev2_(x1, y1, x2, y2) { const dx = x2 - x1; const dy = y2 - y1; let angle = Math.atan2(dy, dx); if (angle < 0)
    angle += Tau; return angle; }
function f885(v) { return Math.sqrt(v.x * v.x + v.y * v.y); }
function lengthv_(x, y) { return Math.sqrt(x * x + y * y); }
function w886(v) { return point(v.x == 0 ? 0 : v.x / f885(v), v.y == 0 ? 0 : v.y / f885(v)); }
function dotv(v1, v2) { return v1.x * v2.x + v1.y * v2.y; }
function w887(a1, a2) { let diff = a2 - a1; while (diff <= -Tau / 2)
    diff += Tau; while (diff > Tau / 2)
    diff -= Tau; return diff; }
function l888(v, m) { let v3 = [v.x, v.y, 1]; let r = q948(v3, m); return point(r[0], r[1]); }
function x889(...mm) { c952(mm.length > 0, 'mulm3m3() must take at least one argument'); let result = clone(mm[0]); for (let a = 1; a < mm.length; a++) {
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
function e890(m, s) { for (let i = 0; i < 3; i++)
    for (let j = 0; j < 3; j++)
        m[i][j] /= s; return m; }
function adjugate(m) { return cofactor(transpose(m)); }
function transpose(m) { return [[m[0][0], m[1][0], m[2][0]], [m[0][1], m[1][1], m[2][1]], [m[0][2], m[1][2], m[2][2]]]; }
function cofactor(m) { return [[m[1][1] * m[2][2] - m[2][1] * m[1][2], -(m[1][0] * m[2][2] - m[2][0] * m[1][2]), m[1][0] * m[2][1] - m[2][0] * m[1][1]], [-(m[0][1] * m[2][2] - m[2][1] * m[0][2]), m[0][0] * m[2][2] - m[2][0] * m[0][2], -(m[0][0] * m[2][1] - m[2][0] * m[0][1])], [m[0][1] * m[1][2] - m[1][1] * m[0][2], -(m[0][0] * m[1][2] - m[1][0] * m[0][2]), m[0][0] * m[1][1] - m[1][0] * m[0][1]]]; }
function determinant(m) { return m[0][0] * (m[1][1] * m[2][2] - m[1][2] * m[2][1]) - m[0][1] * (m[1][0] * m[2][2] - m[2][0] * m[1][2]) + m[0][2] * (m[1][0] * m[2][1] - m[2][0] * m[1][1]); }
function r891(m) { return e890(adjugate(m), determinant(m)); }
function x892(angle) { const cosA = w879(Math.cos(angle)); const sinA = w879(Math.sin(angle)); return [[cosA, sinA, 0], [-sinA, cosA, 0], [0, 0, 1]]; }
function b893(x = 0, y = 0, scaleX = 1, scaleY = 1, angle = 0, skewX = 0, skewY = 0) { const cosA = Math.cos(angle); const sinA = Math.sin(angle); return [[scaleX * cosA - skewY * sinA, -skewX * cosA + scaleY * sinA, x], [skewY * cosA + scaleX * sinA, scaleY * cosA + skewX * sinA, y], [0, 0, 1]]; }
function c894(v1, v2) { return v1.x * v2.y - v1.y * v2.x; }
function x895(v1, v2) { return point(v1.x + v2.x, v1.y + v2.y); }
function sqrv(v) { return x896(v, v); }
function x896(v1, v2) { return point(v1.x * v2.x, v1.y * v2.y); }
function i897(v, s) { return point(v.x * s, v.y * s); }
function g898(v1, v2) { return point(v1.x / v2.x, v1.y / v2.y); }
function p899(v, s) { return point(v.x / s, v.y / s); }
function v900(v1, v2) { return point(v1.x - v2.x, v1.y - v2.y); }
function n901(str) { return decodeURI(encodeURIComponent(str)); }
function c902(str) { return decodeURIComponent(encodeURI(str)); }
function q903(bytes) { let str = ''; for (let i = 0; i < bytes.length; i++)
    str += String.fromCharCode(bytes[i]); return str; }
function f904(str) { return Array.from(c902(str), c => c.charCodeAt(0)); }
function h905(array, size) { const newArray = new Uint8Array(size); d906(array, newArray); return newArray; }
function d906(src, dst) { d907(src, 0, src.length, dst, 0, dst.length); }
function d907(src, z908, g909, dst, j910, n911) { const size = Math.min(g909, n911); for (let i = 0; i < size; i++)
    dst[j910 + i] = src[z908 + i]; }
function v912(r913, l914) { if (r913.length != l914.length)
    return false; for (let i = 0; i < r913.length; i++) {
    if (r913[i] != l914[i])
        return false;
} return true; }
function y915(b916, l917) { return b916.findIndex(i => l917.includes(i)) > -1; }
function g918(list) { return list ? '<==' : '<--'; }
;
function d919(list) { return list ? '==>' : '-->'; }
;
function e920(nodeId) { return y875 + ' ' + nodeId; }
function y921(name) { return k876 + ' ' + name; }
function d922(name) { return x877 + ' ' + name; }
function n923(str) { return str.toLowerCase() == 'true' || str == '1'; }
function w924(g925, n926 = false) { return b931(g925.outputNodeId, g925.outputId, g925.outputOrder, g925.inputNodeId, g925.inputId, g925.list, n926); }
function s927(outputNodeId, outputId, outputOrder, inputNodeId, inputId) { return y921(outputNodeId + ' ' + outputId + ' ' + outputOrder + ' ' + inputNodeId + ' ' + inputId); }
function y928(d243) { return s927(d243.outputNodeId, d243.outputId, d243.outputOrder, d243.inputNodeId, d243.inputId); }
function x929(d243) { return s927(d243.output.node.id, d243.output.id, d243.outputOrder, d243.input.node.id, d243.input.id); }
function b930(d243, n926 = false) { return b931(d243.output.node.id, d243.output.id, d243.outputOrder, d243.input.node.id, d243.input.id, d243.list, n926); }
function b931(outputNodeId, outputId, outputOrder, inputNodeId, inputId, list, n926 = false) { const sp = n926 ? ' ' : '  '; const jsp = n926 ? '' : ' '; const arrow = sp + y935(typeof outputOrder == 'string' ? parseInt(outputOrder) : outputOrder) + d919(typeof list == 'string' ? n923(list) : list) + sp; const join = jsp + '.' + jsp; return outputNodeId + join + outputId + arrow + inputNodeId + join + inputId; }
function r932(pageId) { return d922(pageId); }
function t933(num) { const str = num.toString(); let sup = ''; for (const c of str)
    sup += b934(c); return sup; }
function b934(c) { switch (c) {
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
function y935(num) { const str = num.toString(); let sup = ''; for (const c of str)
    sup += c936(c); return sup; }
function c936(c) { switch (c) {
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
function w937(bool) { return bool ? 'true' : 'false'; }
function isValid(val) { return val != undefined && val != null; }
function isEmpty(array) { return array.length == 0; }
function i938(array, item) { f939(array, array.indexOf(item)); }
function f939(array, index) { if (index > -1 && index < array.length)
    array.splice(index, 1); }
function c940(array) { if (isEmpty(array))
    return null; let last = array.at(-1); array.splice(array.length - 1, 1); return last; }
function t941(array) { return array[array.length - 1]; }
function w942(array, from, to) { const item = array[from]; array.splice(from, 1); array.splice(to, 0, item); }
function f943(array, item) { const index = array.indexOf(item); if (index > -1)
    array.splice(index, 1); }
function n944(j2795, array) { for (const item of array) {
    const index = j2795.indexOf(item);
    if (index > -1)
        j2795.splice(index, 1);
} }
function r945(array, where) { const index = array.findIndex(where); if (index > -1)
    array.splice(index, 1); }
function v946(styleId) { return styleId.split(',')[0] + ','; }
function f947(points) { let l4031 = ''; if (points.length < 2)
    return l4031; l4031 += 'M'; l4031 += ' ' + w879(points[0].x); l4031 += ' ' + w879(points[0].y); for (let i = 1; i < points.length; i++) {
    l4031 += ' L' + ' ' + w879(points[i].x) + ' ' + w879(points[i].y);
} return l4031; }
function point(x, y) { return { x: x, y: y }; }
function q948(v, m) { let r = [0, 0, 0]; for (let i = 0; i < 3; i++)
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
        let g111 = {};
        for (const key in val)
            g111[key] = clone(val[key]);
        return g111;
    }
} throw 'unknown'; }
function e949(array, item, equal = null) { if (equal) {
    if (Array.isArray(item))
        item.forEach(i => e949(array, i, equal));
    else if (!array.find(i => equal(i, item)))
        array.push(item);
}
else {
    if (Array.isArray(item))
        item.forEach(i => e949(array, i));
    else if (!array.includes(item))
        array.push(item);
} }
function w950(array, item, equal) { if (Array.isArray(item))
    item.forEach(i => w950(array, i, equal));
else if (!array.find(equal))
    array.push(item); }
function l951(array, item, except) { if (Array.isArray(item))
    item.forEach(i => l951(array, i, except));
else if (!array.find(except))
    array.push(item); }
function c952(...args) { if (enableAsserts) {
    console.assert(...args);
} }
function c953(...args) { if (enableAsserts)
    console.error(...args); }
function l954(str, trim) { while (str.length >= trim.length && str.substring(0, trim.length) == trim)
    str = str.substring(trim.length); return str; }
function w955(str, trim) { while (str.length >= trim.length && str.substring(str.length - trim.length) == trim)
    str = str.substring(0, str.length - trim.length); return str; }
function k956(m4091) { const fills = []; for (const fill of m4091) {
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
            const z4206 = [[0, 1, 0], [0.5, 0.5, 1], [1, 1, 1]];
            let y4207 = [[p0.x, p1.x, p2.x], [p0.y, p1.y, p2.y], [1, 1, 1]];
            y4207 = x889(z4206, r891(y4207));
            y4207 = [y4207[0], y4207[1]];
            const stops = [];
            for (const stop of fill[2]) {
                stops.push({ color: { r: Math.min(Math.max(0, stop[0]), 1), g: Math.min(Math.max(0, stop[1]), 1), b: Math.min(Math.max(0, stop[2]), 1), a: Math.min(Math.max(0, stop[3]), 1) }, position: stop[4] });
            }
            fills.push({ type: fill[0], gradientTransform: y4207, gradientStops: stops, blendMode: fill[3] });
            break;
        }
    }
} return fills; }
function o957(type) { return x1089.includes(type); }
const z1056 = 'LIST#';
const f1057 = 'NLIST#';
const g1058 = 'TLIST#';
const a1059 = 'SLIST#';
const o1060 = 'NULL';
const o1061 = 'VAR';
const l1062 = 'VARGRP';
const s1063 = 'FEEDBK';
const e1064 = 'REPT';
const m1065 = 'CACHE';
const p1066 = 'FRZ';
const v1067 = 'TIMER';
const d1068 = 'VNAME';
const j1352 = 'GVNAMES';
const l1353 = 'VNAMES';
const p1354 = 'ONAME';
const v1069 = 'CMB';
const t1070 = 'LSASIT';
const j1071 = 'EXTR';
const z1072 = 'SETP';
const q1073 = 'GETP';
const f1074 = 'SUBLST';
const k1075 = 'UNIQ';
const y1349 = 'RORD';
const x1350 = 'SHFTLST';
const u1076 = 'REVLST';
const j1351 = 'BUKLST';
const l1077 = 'SORT';
const y1078 = 'CLMN';
const v1079 = 'CELL';
const k1080 = 'LIST';
const n1081 = 'COUNT';
const OBJECT_COUNT = 'OBJCOUNT';
const x1082 = 'LCONT';
const p1083 = 'SELECT';
const f1360 = 'LSTSEL';
const z1084 = 'IF';
const s1085 = 'LSTFLT';
const j1087 = 'ANY#';
const v1088 = [z1056, f1057, g1058, a1059, v1069, j1071, z1072, q1073, f1074, k1080, n1081, x1082, e1064];
const x1089 = [z1056, f1057, g1058, a1059];
const o1086 = 'ITER';
const h1108 = 'PROB';
const HOLD = 'HOLD';
const m1091 = 'NUM#';
const s1092 = 'NUM';
const b1355 = 'NPREC';
const l1093 = 'NSIGN';
const v1094 = 'ABS';
const i1356 = 'NEG';
const t1095 = 'ROUND';
const n1357 = 'QUANT';
const m1096 = 'SMINMAX';
const u1097 = 'MINMAX';
const d1098 = 'LIM';
const z1099 = 'NCURVE';
const m1358 = 'NMAP';
const j1359 = 'NBIAS';
const l1100 = 'NANISNUM';
const c1101 = 'CONST';
const l1102 = 'DATE';
const a1103 = 'SEQ';
const g1104 = 'RANGE';
const a1105 = 'WAVE';
const e1106 = 'RAND';
const d1107 = 'NOISE';
const m1109 = 'ACCUM';
const s1110 = 'LERP';
const o1111 = 'SOLVE';
const g1112 = 'NANIM';
const k1113 = 'SMATH';
const p1114 = 'MATH';
const b1115 = 'ADD';
const q1116 = 'SUB';
const w1117 = 'MUL';
const s1118 = 'DIV';
const m1119 = 'MOD';
const x1120 = 'EXP';
const g1121 = 'NBOOL';
const a1122 = 'NOT';
const f1123 = 'AND';
const d1124 = 'OR';
const h1125 = 'XOR';
const q1126 = 'COND';
const o1127 = 'EQ';
const v1128 = 'NE';
const l1129 = 'LT';
const y1130 = 'LE';
const z1131 = 'GT';
const i1132 = 'GE';
const z1133 = 'TRIG';
const j1134 = 'SIN';
const i1135 = 'COS';
const c1136 = 'TAN';
const x1137 = 'ATAN2';
const j1138 = 'CNVANG';
const r1090 = [o1060, o1061, l1062, ...v1088, t1070, j1071, z1072, q1073, f1074, k1075, y1349, x1350, u1076, j1351, y1078, l1077, v1079, k1080, p1083, f1360, z1084, s1085, s1063, e1064, o1086, h1108, HOLD, m1065, p1066, v1067, d1068, j1352, l1353, p1354];
const z1139 = [p1114, k1113, b1115, q1116, w1117, s1118, m1119, x1120];
const n1140 = [g1121, a1122, f1123, d1124, h1125];
const l1141 = [q1126, o1127, v1128, l1129, y1130, z1131, i1132];
const c1142 = [z1133, j1134, i1135, c1136, x1137];
const i1143 = 'TEXT#';
const e1144 = 'TEXT';
const d1145 = 'TLEN';
const f1146 = 'TTRIM';
const i1147 = 'TSUB';
const v1148 = 'TCONT';
const t1149 = 'TCASE';
const d1150 = 'TREPL';
const q1151 = 'TJOIN';
const c1152 = 'TPAD';
const r1153 = 'TCMP';
const b1154 = 'TCHAR';
const f1155 = 'TUNI';
const c1156 = 'INDEX';
const g1157 = 'N2T';
const w1158 = 'C2T';
const z1159 = 'T2N';
const j1160 = 'T2C';
const p1161 = 'TSPLT';
const z3504 = 'TJSON';
const v1163 = 'TCSV';
const o1164 = 'FETCH';
const t1165 = 'TFILE';
const g1166 = [m1091, f1057, s1092, b1355, l1093, v1094, i1356, t1095, n1357, m1096, u1097, d1098, z1099, m1358, j1359, l1100, c1101, l1102, a1103, g1104, a1105, e1106, d1107, m1109, s1110, o1111, g1112, g1157, b1154, ...z1139, ...n1140, ...l1141, ...c1142, j1138, j1351];
const h1167 = [i1143, g1058, e1144, d1145, f1146, i1147, v1148, t1149, q1151, c1152, d1150, r1153, f1155, c1156, z1159, j1160, p1161, z3504, v1163, o1164, t1165];
const a1168 = 'COL#';
const g1169 = 'COL';
const y1170 = 'CVAL';
const t1171 = 'CCOR';
const n1172 = 'COLP3';
const s1173 = 'CCNT';
const y1174 = 'BLND';
const m1175 = 'CLERP';
const d1176 = 'CBLND';
const r1177 = [a1168, g1169, t1171, n1172, y1174, m1175, d1176, w1158];
const a1178 = 'FILL#';
const a1179 = 'FILL';
const b1180 = [a1178, a1179];
const i1181 = 'STRK#';
const s1182 = 'STRK';
const b1183 = [i1181, s1182];
const g1190 = 'STRKSD#';
const w1191 = 'STRKSD';
const b1192 = [g1190, w1191];
const i1184 = 'CSTOP#';
const i1185 = 'CSTOP';
const x1186 = [i1184, i1185];
const q1187 = 'GRAD#';
const y1188 = 'GRAD';
const d1189 = [q1187, y1188];
const j1193 = 'RCRN#';
const q1194 = 'RCRN';
const y1195 = [j1193, q1194];
const d1196 = 'DRSH#';
const h1197 = 'DRSH';
const u1198 = [d1196, h1197];
const l1199 = 'INSH#';
const x1200 = 'INSH';
const y1201 = [l1199, x1200];
const h1202 = 'LBLR#';
const o1203 = 'LBLR';
const v1204 = [h1202, o1203];
const k1205 = 'BBLR#';
const d1206 = 'BBLR';
const j1207 = [k1205, d1206];
const t1208 = 'MASK#';
const o1209 = 'MASK';
const c1210 = [t1208, o1209];
const k1211 = 'BLEND#';
const f1212 = 'BLEND';
const v1213 = [k1211, f1212];
const x1214 = [...b1192, ...y1195, ...u1198, ...y1201, ...v1204, ...j1207, ...v1213, ...c1210];
const a1215 = [a1168, a1178, q1187, i1181, g1190, d1196, l1199, h1202, k1205, k1211, t1208];
const w1216 = 'CSTL';
const g1217 = 'SHP#';
const m1218 = 'RECT#';
const g1219 = 'RECT';
const w1220 = [m1218, g1219];
const p1221 = 'LINE#';
const i1222 = 'LINE';
const w1223 = [p1221, i1222];
const a1224 = 'ELPS#';
const c1225 = 'ELPS';
const r1226 = [a1224, c1225];
const d1227 = 'TRPZ#';
const c1228 = 'TRPZ';
const a1229 = [d1227, c1228];
const b1236 = 'POLY#';
const e1237 = 'POLY';
const g1238 = [b1236, e1237];
const y1239 = 'STAR#';
const f1240 = 'STAR';
const n1241 = [y1239, f1240];
const x1242 = 'TXTS#';
const k1243 = 'TXTS';
const b1244 = [x1242, k1243];
const v1245 = 'PT#';
const q1246 = 'PT';
const f1247 = [v1245, q1246];
const m1248 = 'PCORN';
const q1249 = 'VPATH#';
const b1250 = 'VPATH';
const x1251 = [q1249, b1250];
const u1252 = 'VPT#';
const o1253 = 'VPT';
const p1254 = [u1252, o1253];
const i1255 = 'VEDGE#';
const p1256 = 'VEDGE';
const k1257 = [i1255, p1256];
const o1258 = 'VREG#';
const s1259 = 'VREG';
const s1260 = [o1258, s1259];
const z1261 = 'VNET#';
const h1262 = 'VNET';
const t1263 = [z1261, h1262];
const f1264 = 'SGRP#';
const g1265 = 'SGRP';
const o1266 = [f1264, g1265];
const q1267 = 'FRM#';
const t1268 = 'FRM';
const t1269 = [q1267, t1268];
const v1231 = 'ARC#';
const j1230 = 'ARC';
const w1232 = [v1231, j1230];
const c1234 = 'WAVEP#';
const o1233 = 'WAVEP';
const d1235 = [c1234, o1233];
const y1270 = 'MOVE';
const s1271 = 'ROT';
const z1272 = 'SCALE';
const o1273 = 'SKEW';
const SHOW_CENTER = 'SHOWCNTR';
const a1274 = 'SCENTR';
const j1275 = 'RSTX';
const s1276 = 'PLACE';
const x1277 = 'APPLY';
const PATH_LENGTH = 'PTHLEN';
const JOIN_PATHS = 'JOINPTH';
const REORIENT_PATHS = 'REORPTH';
const y1284 = 'PTALPATH';
const l1285 = 'CPTONPATH';
const v1278 = 'MESPT';
const e1279 = 'PTANGLE';
const l1280 = 'VECLEN';
const l1281 = 'CIRCEN';
const ARC_FROM_POINTS = 'ARCPT';
const r1282 = 'INTLIN';
const m1283 = 'PTLERP';
const REVERSE_PATH = 'REVPTH';
const BLEND_PATH = 'BLENDPTH';
const PATH_TYPES = [b1250, c1228, j1230, o1233];
const PATH_VALUES = [q1249, d1227, v1231, c1234];
const b1286 = 'SBOOL';
const i1287 = 'SBOOL#';
const z1288 = 'SBOOLU';
const u1289 = 'SBOOLS';
const o1290 = 'SBOOLI';
const q1291 = 'SBOOLE';
const p1292 = [b1286, i1287, z1288, u1289, o1290, q1291];
const n1293 = 'RENDER';
const EXPORT = 'EXPORT';
const f1294 = [g1217, a1059, m1218, p1221, a1224, d1227, b1236, y1239, x1242, v1245, q1249, u1252, i1255, o1258, z1261, v1231, c1234, f1264, q1267, i1287, d1196, l1199, h1202, k1205, k1211, t1208];
const f1295 = [s1271, z1272, o1273];
const f1296 = [...f1294, ...w1220, ...w1223, ...r1226, ...a1229, ...g1238, ...n1241, ...b1244, ...f1247, m1248, ...x1251, ...p1254, ...k1257, ...s1260, ...t1263, ...w1232, ...d1235, ...o1266, ...t1269, ...p1292, y1270, ...f1295, SHOW_CENTER, a1274, j1275, s1276, x1277, PATH_LENGTH, JOIN_PATHS, REORIENT_PATHS, y1284, l1285, v1278, e1279, l1280, l1281, j1230, o1233, ARC_FROM_POINTS, r1282, m1283, REVERSE_PATH, BLEND_PATH, n1293, EXPORT];
const e1297 = [z1056, f1057, g1058, a1059, m1091, i1143, a1168, a1178, i1184, q1187, i1181, i1184, q1187, g1217, m1218, p1221, a1224, d1227, b1236, y1239, x1242, v1245, q1249, u1252, i1255, o1258, z1261, f1264, q1267, j1193, d1196, l1199, h1202, k1205, k1211, t1208];
const f1298 = 'GROUP';
const u1299 = 'GPARAM';
const h1300 = [f1298, u1299];
const z1301 = 'CMNT';
const m1302 = 'CMNTARR';
const s1303 = 'PANEL';
const r1304 = 'ACT';
const i1305 = 'BFACT';
const x1306 = 'BFLST';
const f1307 = 'DIS';
const n1308 = 'NOC';
const PARAM = 'PARAM';
const g1309 = 'LOG';
const p1310 = 'GRAPH';
const r1311 = [[m1119, '%'], [s1118, '/'], [q1116, '−'], [b1115, '+'], [w1117, '×'], [x1120, 'e<sup>x']];
const p1312 = [[s1118, '/'], [q1116, '−'], [b1115, '+'], [w1117, '×']];
const j1313 = 0;
const g1314 = 1;
const h1315 = 2;
const i1316 = 3;
const v1317 = [[j1313, 'not'], [g1314, 'xor'], [h1315, 'or'], [i1316, 'and']];
const u1318 = 0;
const t1319 = 1;
const f1320 = 2;
const f1321 = 3;
const r1322 = 4;
const z1323 = 5;
const f1324 = [[u1318, '<'], [t1319, '≤'], [f1320, '≠'], [f1321, '='], [r1322, '≥'], [z1323, '>']];
const h1325 = 0;
const c1326 = 1;
const l1327 = 2;
const j1328 = 3;
const v1329 = 4;
const d1330 = 5;
const o1331 = [[h1325, 'sin'], [c1326, 'cos'], [l1327, 'tan'], [j1328, 'asin'], [v1329, 'acos'], [d1330, 'atan']];
const s1332 = 'EMPTY';
const a1333 = 'CONNECT';
const x1334 = 'CREATE';
const m1335 = 'CREATE_INSERT';
const z1336 = 'DELETE';
const z1337 = 'DISCONNECT';
const u1338 = 'LINK_STYLE';
const q1339 = 'LINK_VARIABLE';
const n1340 = 'LINK_VARIABLE_GROUP';
const v1341 = 'MAKE_ACTIVE';
const MAKE_NOT_CONDITION_ACTION = 'MAKE_NOT_CONDITION';
const u1342 = 'MAKE_PASSIVE';
const s1343 = 'PASTE';
const e1344 = 'RECONNECT';
const w1345 = 'REMOVE';
const b1346 = 'RENAME';
const g1347 = 'REORDER_INPUTS';
const h1348 = 'REORDER_CONNECTIONS';
const m1361 = 'SELECT';
const w1362 = 'SELECT_MOVE';
const s1363 = 'MOVE_NODES';
const c1364 = 'SET_PARAM_VALUE';
const SET_MULTIPLE_VALUES_ACTION = 'SET_MULTIPLE_VALUES';
const b1365 = 'SET_PARAM_SETTING';
const z1366 = 'SET_NODE_RECT';
const o1367 = 'TOGGLE_DISABLE';
const l1368 = 'TOGGLE_PARAM_HEADER';
const u1369 = 'SET_CURRENT_GRAPH';
const h1370 = 'CREATE_PAGE';
const i1371 = 'DELETE_PAGE';
const a1372 = 'GROUP_NODES';
const d1373 = 'UNGROUP_NODES';
const g1374 = 'HIGHLIGHT_NODES';
const SCROLL_LIST_NODE_ACTION = 'SCROLL_LIST_NODE';
const SET_LIST_DIVIDER_ACTION = 'SET_LIST_DIVIDER';
const SET_NODE_PARAM_ACTION = 'SET_NODE_PARAM';
const j1375 = 'BNORM';
const k1376 = 'BDARK';
const y1377 = 'BMULT';
const u1378 = 'BPDRK';
const j1379 = 'BBURN';
const f1380 = 'BLITE';
const w1381 = 'BSCRN';
const e1382 = 'BPLGT';
const l1383 = 'BDODG';
const y1384 = 'BOVER';
const u1385 = 'BSOFT';
const e1386 = 'BHARD';
const h1387 = 'BDIFF';
const l1388 = 'BEXCL';
const v1389 = 'BHUE';
const d1390 = 'BSAT';
const m1391 = 'BCOL';
const m1392 = 'BLUM';
const l1393 = [[j1375, 'normal', 'NORMAL'], [k1376, 'darken', 'DARKEN'], [y1377, 'multiply', 'MULTIPLY'], [u1378, 'plus darker', 'LINEAR_BURN'], [j1379, 'color burn', 'COLOR_BURN'], [f1380, 'lighten', 'LIGHTEN'], [w1381, 'screen', 'SCREEN'], [e1382, 'plus lighter', 'LINEAR_DODGE'], [l1383, 'color dodge', 'COLOR_DODGE'], [y1384, 'overlay', 'OVERLAY'], [u1385, 'soft light', 'SOFT_LIGHT'], [e1386, 'hard light', 'HARD_LIGHT'], [h1387, 'difference', 'DIFFERENCE'], [l1388, 'exclusion', 'EXCLUSION'], [v1389, 'hue', 'HUE'], [d1390, 'saturation', 'SATURATION'], [m1391, 'color', 'COLOR'], [m1392, 'luminosity', 'LUMINOSITY']];
const k1394 = [['thin', 100], ['extra light', 200], ['light', 300], ['regular', 400], ['medium', 500], ['semi bold', 600], ['bold', 700], ['extra bold', 800], ['black', 900]];
const b1395 = 0;
const z1396 = 1;
const c1397 = 2;
const p1398 = 2;
const c1399 = 3;
const x1400 = 3;
const n1401 = 4;
const u1402 = 4;
const m1403 = 5;
const q1404 = 6;
const o1405 = 7;
const i1406 = 8;
const f1407 = 9;
const e1408 = 10;
const g1409 = 11;
const q1410 = 12;
const j1411 = 13;
const s1412 = 14;
const d1413 = 15;
const d1414 = 16;
const j1415 = 17;
const i1416 = 18;
const k1417 = 19;
const u1418 = 20;
const i1419 = 21;
const x1420 = 22;
const r1421 = 23;
const d1422 = 24;
const h1453 = 24;
const q1423 = 24;
const q1424 = 25;
const e1454 = 25;
const v1425 = 26;
const w1426 = 27;
const p1427 = 28;
const t1428 = 28;
const f1429 = 28;
const j1430 = 28;
const i1431 = 28;
const j1432 = 28;
const s1433 = 28;
const m1434 = 28;
const s1435 = 29;
const b1436 = 29;
const r1437 = 29;
const v1438 = 29;
const j1439 = 29;
const f1455 = 29;
const y1441 = 30;
const c1442 = 30;
const f1443 = 30;
const f1444 = 30;
const l1440 = 30;
const u1445 = 31;
const t1446 = 31;
const j1447 = 32;
const h1448 = 33;
const b1449 = 34;
const t1450 = 35;
const p1451 = 36;
const i1452 = 37;
const r2796 = '12345679ABCDEFGHJKLMNPQRSTUVWXYZ';
function m847(array, chars = r2796) { let d849 = ''; let len = array.length; let i = 0; while (len > 0) {
    if (len >= 5) {
        const a0 = array[i], a1 = array[i + 1], a2 = array[i + 2], a3 = array[i + 3], a4 = array[i + 4];
        d849 += chars[(a0 & 0xF8) >>> 3];
        d849 += chars[((a0 & 0x07) << 2) | ((a1 & 0xC0) >>> 6)];
        d849 += chars[(a1 & 0x3E) >>> 1];
        d849 += chars[((a1 & 0x01) << 4) | ((a2 & 0xF0) >>> 4)];
        d849 += chars[((a2 & 0x0F) << 1) | ((a3 & 0x80) >>> 7)];
        d849 += chars[(a3 & 0x7C) >>> 2];
        d849 += chars[((a3 & 0x03) << 3) | ((a4 & 0xE0) >>> 5)];
        d849 += chars[(a4 & 0x1F)];
    }
    else if (len == 4) {
        const a0 = array[i], a1 = array[i + 1], a2 = array[i + 2], a3 = array[i + 3];
        d849 += chars[(a0 & 0xF8) >>> 3];
        d849 += chars[((a0 & 0x07) << 2) | ((a1 & 0xC0) >>> 6)];
        d849 += chars[(a1 & 0x3E) >>> 1];
        d849 += chars[((a1 & 0x01) << 4) | ((a2 & 0xF0) >>> 4)];
        d849 += chars[((a2 & 0x0F) << 1) | ((a3 & 0x80) >>> 7)];
        d849 += chars[(a3 & 0x7C) >>> 2];
        d849 += chars[((a3 & 0x03) << 3)];
    }
    else if (len == 3) {
        const a0 = array[i], a1 = array[i + 1], a2 = array[i + 2];
        d849 += chars[(a0 & 0xF8) >>> 3];
        d849 += chars[((a0 & 0x07) << 2) | ((a1 & 0xC0) >>> 6)];
        d849 += chars[(a1 & 0x3E) >>> 1];
        d849 += chars[((a1 & 0x01) << 4) | ((a2 & 0xF0) >>> 4)];
        d849 += chars[((a2 & 0x0F) << 1)];
    }
    else if (len == 2) {
        const a0 = array[i], a1 = array[i + 1];
        d849 += chars[(a0 & 0xF8) >>> 3];
        d849 += chars[((a0 & 0x07) << 2) | ((a1 & 0xC0) >>> 6)];
        d849 += chars[(a1 & 0x3E) >>> 1];
        d849 += chars[((a1 & 0x01) << 4)];
    }
    else if (len == 1) {
        const a0 = array[i];
        d849 += chars[(a0 & 0xF8) >>> 3];
        d849 += chars[((a0 & 0x07) << 2)];
    }
    i += 5;
    len -= 5;
} return d849; }
function s848(d849, chars = r2796) { const array = []; let len = d849.length; let c = 0; while (len > 0) {
    if (len >= 8) {
        const c0 = chars.indexOf(d849[c]), c1 = chars.indexOf(d849[c + 1]), c2 = chars.indexOf(d849[c + 2]), c3 = chars.indexOf(d849[c + 3]), c4 = chars.indexOf(d849[c + 4]), c5 = chars.indexOf(d849[c + 5]), c6 = chars.indexOf(d849[c + 6]), c7 = chars.indexOf(d849[c + 7]);
        array.push((c0 << 3) | ((c1 & 0x1C) >>> 2));
        array.push(((c1 & 0x03) << 6) | (c2 << 1) | ((c3 & 0x10) >>> 4));
        array.push(((c3 & 0x0F) << 4) | ((c4 & 0x1E) >>> 1));
        array.push(((c4 & 0x01) << 7) | (c5 << 2) | ((c6 & 0x18) >>> 3));
        array.push(((c6 & 0x07) << 5) | c7);
    }
    else if (len == 7) {
        const c0 = chars.indexOf(d849[c]), c1 = chars.indexOf(d849[c + 1]), c2 = chars.indexOf(d849[c + 2]), c3 = chars.indexOf(d849[c + 3]), c4 = chars.indexOf(d849[c + 4]), c5 = chars.indexOf(d849[c + 5]), c6 = chars.indexOf(d849[c + 6]);
        array.push((c0 << 3) | ((c1 & 0x1C) >>> 2));
        array.push(((c1 & 0x03) << 6) | (c2 << 1) | ((c3 & 0x10) >>> 4));
        array.push(((c3 & 0x0F) << 4) | ((c4 & 0x1E) >>> 1));
        array.push(((c4 & 0x01) << 7) | (c5 << 2) | ((c6 & 0x18) >>> 3));
    }
    else if (len == 5) {
        const c0 = chars.indexOf(d849[c]), c1 = chars.indexOf(d849[c + 1]), c2 = chars.indexOf(d849[c + 2]), c3 = chars.indexOf(d849[c + 3]), c4 = chars.indexOf(d849[c + 4]);
        array.push((c0 << 3) | ((c1 & 0x1C) >>> 2));
        array.push(((c1 & 0x03) << 6) | (c2 << 1) | ((c3 & 0x10) >>> 4));
        array.push(((c3 & 0x0F) << 4) | ((c4 & 0x1E) >>> 1));
    }
    else if (len == 4) {
        const c0 = chars.indexOf(d849[c]), c1 = chars.indexOf(d849[c + 1]), c2 = chars.indexOf(d849[c + 2]), c3 = chars.indexOf(d849[c + 3]);
        array.push((c0 << 3) | ((c1 & 0x1C) >>> 2));
        array.push(((c1 & 0x03) << 6) | (c2 << 1) | ((c3 & 0x10) >>> 4));
    }
    else if (len == 2) {
        const c0 = chars.indexOf(d849[c]), c1 = chars.indexOf(d849[c + 1]);
        array.push((c0 << 3) | ((c1 & 0x1C) >>> 2));
    }
    c += 8;
    len -= 8;
} return array; }
function logSavedNode(nodeKey, i4006) {
    return __awaiter(this, void 0, void 0, function* () { const log = k2119(yield e1563(nodeKey, false)); if (i4006) {
        console.log('%c%s\n%c%s', 'background: #fa24; color: white;', x1054(nodeKey), 'background: #fa44; color: #edc;', log);
    }
    else {
        console.log('%c%s\n%c%s', 'background: #fdb; color: black;', x1054(nodeKey), 'background: #fed; color: black;', log);
    } });
}
function k2119(json) { let r4032 = json.replace('{\n', '').replace('\n}', '').replace('[\n' + y870, '').replace('\n' + y870 + ']', '').split(y870 + '"params":\n').join('').split('": "').join(': ').split('", "').join(': ').split(y870 + '"').join(y870).split(y870 + y870 + '["').join(y870 + y870).split('",\n').join('\n').split('"\n').join('\n').split('"],\n').join('\n'); if (r4032[r4032.length - 1] == '"')
    r4032 = r4032.substring(0, r4032.length - 1); if (r4032.substring(r4032.length - 2) == '"]')
    r4032 = r4032.substring(0, r4032.length - 2); return r4032; }
function v2120(json) { let r4032 = json.replace('{\n', '').replace('\n}', '').replace('[\n' + y870, '').replace('\n' + y870 + ']', ''); return r4032; }
function m2121(d243, i4006) { const o4210 = w924(d243, true); if (i4006) {
    console.log('%c%s', 'background: #4f44; color: #ded', o4210);
}
else {
    console.log('%c%s', 'background: #cfc; color: black;', o4210);
} }
console.clear();
figma.payments.setPaymentStatusInDevelopment({ type: 'PAID' });
figma.loadAllPagesAsync().then(() => { figma.on('documentchange', c1534); figma.on('selectionchange', r1542); figma.on('close', j1535); });
c1524(true);
figma.clientStorage.getAsync('pro').then(data => { figma.showUI(__html__, { visible: false, themeColors: true, title: 'Generator' }); });
var m2708 = figma.viewport.zoom;
setInterval(j1539, 100);
var strBackgrounds = '';
setInterval(figCheckBackgrounds, 500);
const s2797 = 'clock_';
const m2798 = 1000;
var f2799 = false;
var objectCenterSize = 15;
function t1536() { (function () {
    return __awaiter(this, void 0, void 0, function* () { figma.currentPage.loadAsync().then(() => __awaiter(this, void 0, void 0, function* () { let k2800 = yield figma.currentPage.getPluginData(figma.currentUser.id + ',windowWidth'); let p2801 = yield figma.currentPage.getPluginData(figma.currentUser.id + ',windowHeight'); let s2802; let o2803; if (k2800 === NULL) {
        s2802 = 800;
        figma.currentPage.setPluginData(figma.currentUser.id + ',windowWidth', k2800.toString());
    }
    else
        s2802 = parseInt(k2800); if (p2801 === NULL) {
        o2803 = 600;
        figma.currentPage.setPluginData(figma.currentUser.id + ',windowHeight', p2801.toString());
    }
    else
        o2803 = parseInt(p2801); figma.ui.resize(Math.max(minWindowWidth, s2802), Math.max(minWindowHeight, o2803)); figma.ui.show(); const fonts = yield figma.listAvailableFontsAsync(); const eula = (yield figma.clientStorage.getAsync('eula')) === 'true'; const tutorials = (yield figma.clientStorage.getAsync('tutorials')) === 'true'; const isLocked = yield b1541(); h1543({ cmd: 'uiReturnFigStartGenerator', currentUser: figma.currentUser, viewportRect: figma.viewport.bounds, viewportZoom: figma.viewport.zoom, fonts: fonts, eula: eula, tutorials: tutorials, isLocked: isLocked, windowWidth: s2802, windowHeight: o2803 }); })); });
})(); }
function l1537() { c1524(); figma.showUI(__html__, { visible: false, themeColors: true }); }
function y1538() { setInterval(v1540, m2798); }
function j1539() { if (figma.viewport.zoom == m2708)
    return; m2708 = figma.viewport.zoom; b2696(); i1557(); h1559(); }
function figCheckBackgrounds() { if (strBackgrounds != JSON.stringify(figma.currentPage.backgrounds)) {
    i1557();
    strBackgrounds = JSON.stringify(figma.currentPage.backgrounds);
} }
function v1540() { s1564(s2797 + figma.currentUser.sessionId.toString(), Date.now().toString()); }
function b1541() {
    return __awaiter(this, void 0, void 0, function* () { yield figma.currentPage.loadAsync(); const clocks = figma.currentPage.getPluginDataKeys().filter(k => k.length > s2797.length && k.substring(0, s2797.length) == s2797 && k.substring(s2797.length) != figma.currentUser.sessionId.toString()).map((k) => __awaiter(this, void 0, void 0, function* () { return parseInt(yield e1563(k)); })); clocks.sort(); const now = Date.now(); const locked = clocks.length > 0 && now - (yield clocks[clocks.length - 1]) < m2798 * 2; return locked; });
}
function r1542() { b2696(); }
var q2729 = new Array();
var c2731 = new Array();
function figGetObjectsFromIds(objectIds) {
    return __awaiter(this, void 0, void 0, function* () { for (let i = w2765.length - 1; i >= 0; i--)
        if (!w2765[i].removed && objectIds.includes(w2765[i].getPluginData('objectId')))
            w2765.splice(i, 1); for (let i = m2781.length - 1; i >= 0; i--)
        if (m2781[i].removed || objectIds.includes(m2781[i].getPluginData('objectId')))
            m2781.splice(i, 1); yield figma.currentPage.loadAsync(); return figma.currentPage.findAll(o => objectIds.includes(o.getPluginData('objectId'))); });
}
function k1523(nodeIds) {
    return __awaiter(this, void 0, void 0, function* () { for (let i = w2765.length - 1; i >= 0; i--)
        if (!w2765[i].removed && nodeIds.includes(w2765[i].getPluginData('nodeId')))
            w2765.splice(i, 1); for (let i = m2781.length - 1; i >= 0; i--)
        if (m2781[i].removed || nodeIds.includes(m2781[i].getPluginData('nodeId')))
            m2781.splice(i, 1); yield figma.currentPage.loadAsync(); figma.currentPage.findAll(o => nodeIds.includes(o.getPluginData('nodeId'))).forEach(o => { if (!o.removed)
        o.remove(); }); q2729 = q2729.filter(a => !nodeIds.includes(a.nodeId)); });
}
function c1524(m1525 = false) { for (const n1530 of figma.currentPage.children) {
    if (n1530.removed)
        continue;
    if (n1530.getPluginData('objectId') != '' && n1530.getPluginData('userId') == figma.currentUser.id && (parseInt(n1530.getPluginData('retain')) == 0 || m1525))
        n1530.remove();
} }
function v1526(nodeIds, o1527) { for (let i = q2729.length - 1; i >= 0; i--) {
    const n2730 = q2729[i];
    if (!nodeIds.includes(n2730.nodeId))
        continue;
    for (let j = n2730.objects.length - 1; j >= 0; j--) {
        const n1530 = n2730.objects[j];
        if (n1530.removed || !s1528(n1530, o1527)) {
            if (!n1530.removed)
                n1530.remove();
            f943(n2730.objects, n1530);
            if (w2765.includes(n1530))
                f943(w2765, n1530);
            if (m2781.includes(n1530))
                f943(m2781, n1530);
        }
        if (!n1530.removed) {
            if (parseInt(n1530.getPluginData('retain')) == 2)
                m1549(n1530);
        }
    }
    if (isEmpty(n2730.objects))
        f943(q2729, n2730);
} }
function s1528(n1530, o1527) { if (n1530.type == g1265 || n1530.type == t1268) {
    for (const child of n1530.children) {
        const found = s1528(child, o1527);
        if (found)
            return found;
    }
}
else {
    const found = o1527.find(o => n1530.getPluginData('objectId') == o[c1397] && n1530.getPluginData('userId') == figma.currentUser.id || o[m1403] == 2 && o[m1403] == n1530.getPluginData('retain'));
    if (found)
        return found;
} return null; }
function l1531(nodeIds, p1532) { figma.getLocalPaintStylesAsync().then(paintStyles => { paintStyles.filter(s => nodeIds.includes(s.getPluginData('nodeId'))).forEach(s => { const nodeId = s.getPluginData('nodeId'); const existing = n923(s.getPluginData('existing')); if (!existing) {
    s.remove();
}
else if (p1532) {
    r945(c2731, a => a.nodeId == nodeId);
    s.setPluginData('type', NULL);
    s.setPluginData('nodeId', NULL);
    s.setPluginData('existing', NULL);
} }); }); if (p1532)
    c2731 = c2731.filter(a => !nodeIds.includes(a.nodeId)); }
var o1533 = false;
function c1534(e) { for (const change of e.documentChanges) {
    switch (change.type) {
        case 'STYLE_CREATE':
            if (!change.style)
                break;
            if (!o1533) {
                change.style.setPluginData('type', NULL);
                change.style.setPluginData('nodeId', NULL);
                change.style.setPluginData('existing', NULL);
            }
            break;
        case 'STYLE_PROPERTY_CHANGE': {
            if (!change.style)
                break;
            if (!o1533) {
                const msg = { cmd: 'uiStylePropertyChange', styleId: v946(change.id), properties: change.properties, name: '', paints: [] };
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
                h1543(msg);
            }
            break;
        }
        case 'STYLE_DELETE':
            h1543({ cmd: 'uiStyleDelete', styleId: change.id });
            break;
    }
} o1533 = false; }
function j1535() { c1524(); h1543({ cmd: 'updateMetrics' }); }
figma.ui.onmessage = function (msg) { msg = JSON.parse(msg); if (msg.cmd == 'returnUiGetValueForFigma')
    return; switch (msg.cmd) {
    case 'figStartGenerator':
        t1536();
        break;
    case 'figRestartGenerator':
        l1537();
        break;
    case 'figFinishStart':
        y1538();
        break;
    case 'figDockWindowNormal':
        h2738('normal');
        break;
    case 'figDockWindowMaximize':
        h2738('maximize');
        break;
    case 'figDockWindowTop':
        h2738('top');
        break;
    case 'figDockWindowLeft':
        h2738('left');
        break;
    case 'figDockWindowRight':
        h2738('right');
        break;
    case 'figDockWindowBottom':
        h2738('bottom');
        break;
    case 'figGetMousePosition':
        f1609(msg.clientPosition);
        break;
    case 'figResizeWindow':
        o1612(msg.width, msg.height);
        break;
    case 'figSetWindowRect':
        p1610(msg.x, msg.y, msg.width, msg.height);
        break;
    case 'figNotify':
        o1613(msg);
        break;
    case 'figGetLocalData':
        l1561(msg.key);
        break;
    case 'figSetLocalData':
        f1562(msg.key, msg.value);
        break;
    case 'figClearAllLocalData':
        n4027();
        break;
    case 'figGetPageData':
        e1563(msg.key);
        break;
    case 'figSetPageData':
        s1564(msg.key, msg.value);
        break;
    case 'figSavePages':
        j1569(msg.pageIds, msg.pageJson, msg.currentPageId);
        break;
    case 'figLoadNodesAndConns':
        w1566(msg.debugMode);
        break;
    case 'figSaveNodes':
        l1570(msg.nodeIds, msg.nodeJson);
        break;
    case 'figGetAllLocalTemplateNames':
        s2735();
        break;
    case 'figSaveLocalTemplate':
        a1571(msg.y4028, msg.template);
        break;
    case 'figRemoveConnsToNodes':
        w1572(msg.nodeIds);
        break;
    case 'figRemoveSavedNodesAndConns':
        d1573(msg.nodeIds);
        break;
    case 'figRemoveAllSavedNodesAndConns':
        g1574();
        break;
    case 'figLogAllSavedNodesAndConns':
        i1575(msg.i4006);
        break;
    case 'figLogAllSavedNodes':
        g1576(msg.i4006);
        break;
    case 'figLogAllSavedConns':
        f1577(msg.i4006);
        break;
    case 'figLogAllSavedPageKeys':
        u1578(msg.i4006);
        break;
    case 'figLogAllSavedPages':
        f1579(msg.i4006);
        break;
    case 'figLogAllSavedConnKeys':
        j1580(msg.i4006);
        break;
    case 'figLogAllLocalData':
        z1581(msg.i4006);
        break;
    case 'figGetValue':
        f1582(msg.key, msg.spec);
        break;
    case 'figRemoveSavedPage':
        y1584(msg.pageId);
        break;
    case 'figRemoveAllSavedPages':
        x1585();
        break;
    case 'figSaveConnection':
        v1586(msg.key, msg.json);
        break;
    case 'figSaveConnections':
        i1587(msg.keys, msg.json);
        break;
    case 'figUpdateSavedConnections':
        b1588(msg.curKeys, msg.newKeys, msg.json);
        break;
    case 'figDeleteSavedConnection':
        g1589(msg.key);
        break;
    case 'figRemoveAllSavedConnections':
        d1590();
        break;
    case 'figDeleteSavedConnectionsToNode':
        k1591(msg.nodeId);
        break;
    case 'figDeleteSavedConnectionsFromNode':
        q1592(msg.nodeId);
        break;
    case 'figRemovePluginDataFromAllLocalStyles':
        r1593();
        break;
    case 'figGetAllLocalVariables':
        y1617(msg.nodeId, msg.px, msg.py);
        break;
    case 'figLinkNodeToVariable':
        u1619(msg.nodeId, msg.variableId);
        break;
    case 'figUpdateVariable':
        figUpdateVariableAsync(msg.variableId, msg.value);
        break;
    case 'figGetAllLocalColorStyles':
        c1594(msg.nodeId, msg.px, msg.py);
        break;
    case 'figLinkNodeToExistingColorStyle':
        j1595(msg.nodeId, msg.styleId);
        break;
    case 'figExport':
        figExport(msg.objectIds, msg.scale, msg.format, msg.suffix);
        break;
    case 'figGetObjectSize':
        i1548(msg.object);
        break;
    case 'figGetVariableUpdates':
        g1583(msg.linkedVarIds);
        break;
    case 'figUpdateShowIds':
        f2799 = msg.f2799;
        break;
    case 'figUpdateObjectCenterSize':
        objectCenterSize = msg.objectCenterSize;
        break;
    case 'figDeleteAllObjects':
        c1524();
        break;
    case 'figUpdateObjectsAndStyles':
        b2744 = 0;
        o2745 = 0;
        msg.objects.forEach(o => o.counted = false);
        q2732(null, msg.objects, msg.w4020, msg.m2067, msg.nodeIds, msg.s2761, msg.f2762, msg.w270);
        a1600(msg);
        break;
    case 'figDeleteObjectsAndStyles':
        k1523(msg.nodeIds);
        l1531(msg.nodeIds, msg.p1532);
        break;
    case 'figDeleteObjectsExcept':
        v1526(msg.nodeIds, msg.ignoreObjects);
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
} h1543({ cmd: 'uiEndFigMessage', msgCmd: msg.cmd }); };
function h1543(msg) { figma.ui.postMessage(JSON.stringify(msg)); }
function l2733(key) {
    return __awaiter(this, void 0, void 0, function* () { return yield figma.clientStorage.getAsync(key); });
}
function l1561(key) { figma.currentPage.loadAsync().then(() => { if (key == 'canvasEmpty') {
    h1543({ cmd: 'uiReturnFigGetLocalData', key: key, value: figma.currentPage.children.length == 0 });
}
else if (key == 'debugWarningCrash') {
    figma.clientStorage.getAsync('debugWarning').then(data => { h1543({ cmd: 'uiReturnFigGetLocalData', key: key, value: data }); });
}
else {
    figma.clientStorage.getAsync(key).then(data => { h1543({ cmd: 'uiReturnFigGetLocalData', key: key, value: data }); });
} }); }
function f1562(key, value, postToUi = true) { figma.clientStorage.setAsync(key, value); if (postToUi) {
    h1543({ cmd: 'uiReturnFigSetLocalData', key: key, value: value });
} }
function n4027() {
    return __awaiter(this, void 0, void 0, function* () { const keys = yield figma.clientStorage.keysAsync(); for (const key of keys)
        figma.clientStorage.deleteAsync(key); });
}
function e1563(key, postToUi = true) {
    return __awaiter(this, void 0, void 0, function* () { yield figma.currentPage.loadAsync(); const data = figma.currentPage.getPluginData(key); if (postToUi) {
        h1543({ cmd: 'uiReturnFigGetPageData', key: key, value: data });
    } return data; });
}
function s1564(key, value) { g1565(key); figma.currentPage.setPluginData(key, value); }
function g1565(key) { figma.currentPage.setPluginData(key, ''); }
function w1566(debugMode) { figma.currentPage.loadAsync().then(() => { const pageKeys = figma.currentPage.getPluginDataKeys().filter(k => j1050(k)); const nodeKeys = figma.currentPage.getPluginDataKeys().filter(k => d1051(k)); const connKeys = figma.currentPage.getPluginDataKeys().filter(k => t1052(k)); if (!debugMode)
    x1568(nodeKeys, connKeys); const pages = pageKeys.map(k => figma.currentPage.getPluginData(k)); const nodes = nodeKeys.map(k => figma.currentPage.getPluginData(k)); const s2138 = connKeys.map(k => figma.currentPage.getPluginData(k)); const pageOrder = figma.currentPage.getPluginData('pageOrder').split(','); const currentPageId = figma.currentPage.getPluginData('currentPageId'); f1567(nodes); const showAllColorSpaces = figma.currentPage.getPluginData('showAllColorSpaces'); h1543({ cmd: 'uiReturnFigLoadNodesAndConns', showAllColorSpaces: showAllColorSpaces, pageKeys: pageKeys, pageJson: pages, pageOrder: pageOrder, currentPageId: currentPageId, nodeKeys: nodeKeys, nodeJson: nodes, connKeys: connKeys, connJson: s2138 }); }); }
function f1567(nodes) { c2731 = []; figma.getLocalPaintStylesAsync().then(paintStyles => { for (const x3019 of nodes) {
    const node = JSON.parse(x3019);
    if (node.type == w1216) {
        const style = paintStyles.find(s => { const nodeId = s.getPluginData('nodeId'); return nodeId == node.id; });
        if (style) {
            c2731.push({ nodeId: node.id, existing: n923(node.existing), styles: [style] });
        }
    }
} }); }
function x1568(nodeKeys, connKeys) { figma.currentPage.loadAsync().then(() => { const e2734 = '"loading": "true"'; const not = '{\n'; const set = '{\n' + y870 + e2734 + ',\n'; nodeKeys.forEach(k => figma.currentPage.setPluginData(k, figma.currentPage.getPluginData(k).replace(set, not).replace(not, set))); connKeys.forEach(k => figma.currentPage.setPluginData(k, figma.currentPage.getPluginData(k).replace(set, not).replace(not, set))); }); }
function j1569(pageIds, pageJson, currentPageId) { for (let i = 0; i < pageIds.length; i++) {
    s1564(d922(pageIds[i]), pageJson[i]);
} s1564('pageOrder', pageIds.join(',')); s1564('currentPageId', currentPageId); }
function l1570(nodeIds, nodeJson) { for (let i = 0; i < nodeIds.length; i++) {
    s1564(e920(nodeIds[i]), nodeJson[i]);
} }
function s2735() {
    return __awaiter(this, void 0, void 0, function* () { let keys = yield figma.clientStorage.keysAsync(); keys = keys.filter(k => k.length >= j878.length && k.substring(0, j878.length) == j878); h1543({ cmd: 'uiReturnGetAllLocalTemplateNames', templateNames: keys }); });
}
function a1571(y4028, template) { f1562(j878 + ' ' + y4028, template); }
function w1572(nodeIds) { figma.currentPage.loadAsync().then(() => { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => t1052(k)); for (const key of connKeys) {
    const parts = n1055(key).split(' ');
    if (nodeIds.includes(parts[0]) || nodeIds.includes(parts[2]))
        g1565(key);
} }); }
function d1573(nodeIds) { figma.currentPage.loadAsync().then(() => { w1572(nodeIds); const nodeKeys = figma.currentPage.getPluginDataKeys().filter(k => d1051(k) && nodeIds.includes(x1054(k))); nodeKeys.forEach(k => g1565(k)); }); }
function g1574() { figma.currentPage.loadAsync().then(() => { const nodeKeys = figma.currentPage.getPluginDataKeys().filter(k => d1051(k)); const connKeys = figma.currentPage.getPluginDataKeys().filter(k => t1052(k)); for (const key of nodeKeys)
    g1565(key); for (const key of connKeys)
    g1565(key); }); }
function i1575(i4006) {
    return __awaiter(this, void 0, void 0, function* () { yield g1576(i4006); f1577(i4006); });
}
function g1576(i4006) {
    return __awaiter(this, void 0, void 0, function* () { yield figma.currentPage.loadAsync(); figma.currentPage.getPluginDataKeys().filter(k => d1051(k)).forEach((k) => __awaiter(this, void 0, void 0, function* () { return yield logSavedNode(k, i4006); })); });
}
function f1577(i4006) { figma.currentPage.loadAsync().then(() => { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => t1052(k)); connKeys.sort((key1, key2) => { const p1 = n1055(key1).split(' '); const p2 = n1055(key2).split(' '); if (p1[2] != p2[2])
    return p1[2] < p2[2] ? -1 : 1; if (p1[3] != p2[3])
    return parseInt(p1[3]) - parseInt(p2[3]); if (p1[2] == p2[0])
    return -1; if (p2[2] == p1[0])
    return 1; return 0; }); connKeys.forEach(k => m2121(JSON.parse(figma.currentPage.getPluginData(k)), i4006)); }); }
function u1578(i4006) { figma.currentPage.loadAsync().then(() => { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => j1050(k)); connKeys.forEach(k => console.log('%c' + k, 'background: #fff; color: ' + (i4006 ? 'black' : 'white'))); const pageOrder = figma.currentPage.getPluginData('pageOrder'); console.log('%c' + pageOrder, 'background: #fff; color: ' + (i4006 ? 'black' : 'white')); }); }
function f1579(i4006) { figma.currentPage.loadAsync().then(() => { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => j1050(k)); connKeys.forEach(k => console.log('%c' + figma.currentPage.getPluginData(k), 'background: #fff; color: ' + (i4006 ? 'black' : 'white'))); const pageOrder = figma.currentPage.getPluginData('pageOrder'); console.log('%c' + pageOrder, 'background: #fff; color: ' + (i4006 ? 'black' : 'white')); }); }
function j1580(i4006) { figma.currentPage.loadAsync().then(() => { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => t1052(k)); connKeys.forEach(k => console.log('%c' + k, 'background: #dff; color: ' + (i4006 ? 'black' : 'white'))); }); }
function z1581(i4006) { figma.clientStorage.keysAsync().then(keys => keys.forEach(k => figma.clientStorage.getAsync(k).then(val => console.log(k + ': ' + val)))); }
function f1582(key, spec) {
    return __awaiter(this, void 0, void 0, function* () { let result = null; switch (key) {
        case 'getVariableData':
            result = yield f1618(spec);
            break;
        case 'getPaidStatus':
            result = figma.payments.status.type;
            break;
        case 'figSubscribe': {
            yield figma.payments.initiateCheckoutAsync({ interstitial: 'PAID_FEATURE' });
            result = figma.payments.status.type;
            break;
        }
    } h1543({ cmd: 'returnFigGetValue', value: result }); });
}
function g1583(varIds) { f1618(varIds).then(values => { h1543({ cmd: 'uiReturnFigGetVariableUpdates', values: values }); }); }
function y1584(pageId) {
    return __awaiter(this, void 0, void 0, function* () { g1565(r932(pageId)); const pageOrder = (yield e1563('pageOrder')).split(','); r945(pageOrder, id => id == pageId); s1564('pageOrder', pageOrder.join(',')); });
}
function x1585() { figma.currentPage.loadAsync().then(() => { const pageKeys = figma.currentPage.getPluginDataKeys().filter(k => j1050(k)); pageKeys.forEach(k => g1565(k)); g1565('pageOrder'); }); }
function v1586(key, json) { s1564(key, json); }
function i1587(_keys, _json) { const keys = JSON.parse(_keys); const json = JSON.parse(_json); for (let i = 0; i < keys.length; i++)
    s1564(keys[i], json[i]); }
function b1588(_curKeys, _newKeys, _json) { const curKeys = JSON.parse(_curKeys); const newKeys = JSON.parse(_newKeys); const json = JSON.parse(_json); for (let i = 0; i < curKeys.length; i++) {
    g1565(curKeys[i]);
    s1564(newKeys[i], json[i]);
} }
function g1589(key) { g1565(key); }
function d1590() { figma.currentPage.loadAsync().then(() => { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => t1052(k)); connKeys.forEach(k => g1565(k)); }); }
function k1591(nodeId) { figma.currentPage.loadAsync().then(() => { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => t1052(k)); for (const key of connKeys) {
    const parts = key.split(' ');
    if (parts[4] == nodeId)
        g1565(key);
} }); }
function q1592(nodeId) { figma.currentPage.loadAsync().then(() => { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => t1052(k)); for (const key of connKeys) {
    const parts = key.split(' ');
    if (parts[1] == nodeId)
        g1565(key);
} }); }
function r1593() { figma.getLocalPaintStylesAsync().then(n1597 => { for (const style of n1597) {
    style.setPluginData('type', '');
    style.setPluginData('nodeId', '');
    style.setPluginData('existing', '');
} }); }
function figSaveSnapshot(index, objectIds) {
    return __awaiter(this, void 0, void 0, function* () { const objects = yield figGetObjectsFromIds(objectIds); const group = figma.group(objects, figma.currentPage); const settings = { format: 'PNG' }; const icon = yield group.exportAsync(settings); figma.ungroup(group); h1543({ cmd: 'uiReturnFigSaveSnapshot', index: index, iconWidth: group.width, iconHeight: group.height, icon: icon }); });
}
var c2736 = null;
var k4029 = () => c2736 = null;
var k2737 = 'normal';
function f1609(clientPosition) { h1543({ cmd: 'uiReturnFigGetMousePosition', position: { x: 0, y: 0 }, clientPosition: clientPosition, viewportZoom: figma.viewport.zoom, viewportRect: figma.viewport.bounds }); }
function p1610(x, y, width, height) { return; }
function z1611(dock, rect, bounds) { switch (dock) {
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
function o1612(width, height) { (function () {
    return __awaiter(this, void 0, void 0, function* () { width = Math.floor(Math.max(0, width)); height = Math.floor(Math.max(0, height)); figma.ui.resize(width, height); yield figma.currentPage.loadAsync(); figma.currentPage.setPluginData(figma.currentUser.id + ',windowWidth', width.toString()); figma.currentPage.setPluginData(figma.currentUser.id + ',windowHeight', height.toString()); h1543({ cmd: 'uiReturnFigResizeWindow', width: width, height: height }); });
})(); }
function h2738(dock) {
    return __awaiter(this, void 0, void 0, function* () { if (dock != 'normal' && k2737 == 'normal') {
        figma.clientStorage.setAsync('normalWindowX', yield figma.clientStorage.getAsync('normalWindowX'));
        figma.clientStorage.setAsync('normalWindowY', yield figma.clientStorage.getAsync('normalWindowY'));
        figma.clientStorage.setAsync('normalWindowWidth', yield figma.clientStorage.getAsync('normalWindowWidth'));
        figma.clientStorage.setAsync('normalWindowHeight', yield figma.clientStorage.getAsync('normalWindowHeight'));
    } k2737 = dock; figma.clientStorage.setAsync('windowDock', dock); o1612(yield figma.clientStorage.getAsync('windowWidth'), yield figma.clientStorage.getAsync('windowHeight')); });
}
function o1613(msg) { x1614(msg.text, msg.prefix, msg.delay, msg.error, msg.h1615, msg.f1616); }
function x1614(text, prefix = 'Generator ', delay = 400, error = false, h1615 = '', f1616 = NULL) { const options = { timeout: delay, error: error, onDequeue: k4029 }; if (h1615 != '') {
    options['button'] = { text: h1615 };
    if (f1616.substring(0, 'removeConnection'.length) == 'removeConnection') {
        options['button']['action'] = () => g1589(f1616.split(',')[1]);
    }
    else {
        switch (f1616) {
            case 'hideClearUndoWarning':
                options['button']['action'] = () => h1543({ cmd: 'uiHideClearUndoWarning' });
                break;
        }
    }
} if (c2736)
    c2736.cancel(); c2736 = figma.notify(prefix + text, options); }
function h2739(key, params = null) {
    return __awaiter(this, void 0, void 0, function* () { return yield b2740(key, params); });
}
function b2740(key, params = null) {
    return __awaiter(this, void 0, void 0, function* () { return new Promise((resolve, reject) => { const timeout = 60000; h1543(Object.assign({ cmd: 'uiGetValueForFigma', key: key }, (params || {}))); const w2741 = setTimeout(() => reject(new Error('Timeout: Result not received by Figma within the specified time')), timeout); function q4030(msg) { msg = JSON.parse(msg); if (msg.cmd === 'returnUiGetValueForFigma') {
        clearTimeout(w2741);
        resolve({ key: msg.key, value: msg.value });
        figma.ui.off('message', q4030);
    } } figma.ui.on('message', q4030); }); });
}
var o2742 = [];
var k2743 = [];
var b2744 = 0;
var o2745 = 0;
function p1544(g111) { return (g111[m1403] === 2 ? '' : v874) + (f2799 ? g111[c1397] : g111[c1399]); }
function w1545(f1529, addObject = null, addProps = true, transform = true) {
    return __awaiter(this, void 0, void 0, function* () { if (!v1547(f1529))
        return null; let n1530; switch (f1529[b1395]) {
        case g1219:
            n1530 = b2713(f1529, addProps, transform);
            break;
        case i1222:
            n1530 = n2792(f1529, addProps, transform);
            break;
        case c1225:
            n1530 = h2788(f1529, addProps, transform);
            break;
        case e1237:
            n1530 = l2709(f1529, addProps, transform);
            break;
        case f1240:
            n1530 = h2716(f1529, addProps, transform);
            break;
        case k1243:
            n1530 = a2719(f1529, addProps, transform);
            break;
        case q1246:
            n1530 = v2695(f1529);
            break;
        case b1250:
            n1530 = p2747(f1529, addProps, transform);
            break;
        case h1262:
            n1530 = y2748(f1529, addProps, transform);
            break;
        case b1286:
            n1530 = yield n2749(f1529, addProps, transform);
            break;
        case g1265:
            n1530 = yield n2750(f1529);
            break;
        case t1268:
            n1530 = yield r2751(f1529, addProps, transform);
            break;
    } if (addObject && n1530 != undefined && n1530 != null && !n1530.removed) {
        n1530.name = p1544(f1529);
        c952(f1529[b1395] == g1265 || !!n1530, 'no Figma object created');
        if (n1530 != undefined && n1530 != null) {
            n1530.setPluginData('retain', f1529[m1403].toString());
            if (f1529[m1403] < 2) {
                n1530.setPluginData('userId', figma.currentUser.id);
                n1530.setPluginData('sessionId', figma.currentUser.sessionId.toString());
                n1530.setPluginData('type', f1529[b1395]);
                n1530.setPluginData('nodeId', f1529[z1396]);
                n1530.setPluginData('objectId', f1529[c1397]);
                n1530.setPluginData('isCenter', w937(f1529[u1418]));
                if (f1529[b1395] == q1246)
                    w2765.push(n1530);
                if (f1529[k1417])
                    g1560(n1530);
            }
            addObject(n1530);
        }
    } if (!f1529.counted) {
        o2745++;
        f1529.counted = true;
    } return n1530; });
}
function c1546(n1530, f1529, addProps, transform) {
    return __awaiter(this, void 0, void 0, function* () { if (!v1547(f1529) || n1530 == undefined || n1530 == null || n1530.removed)
        return; n1530.name = p1544(f1529); n1530.setPluginData('retain', f1529[m1403].toString()); switch (f1529[b1395]) {
        case g1219:
            c2714(n1530, f1529, addProps, transform);
            break;
        case i1222:
            b2793(n1530, f1529, addProps, transform);
            break;
        case c1225:
            p2789(n1530, f1529, addProps, transform);
            break;
        case e1237:
            y2710(n1530, f1529, addProps, transform);
            break;
        case f1240:
            k2717(n1530, f1529, addProps, transform);
            break;
        case k1243:
            o2720(n1530, f1529, addProps, transform);
            break;
        case q1246:
            m2752(n1530, f1529);
            break;
        case b1250:
            f2753(n1530, f1529, addProps, transform);
            break;
        case h1262:
            d2754(n1530, f1529, addProps, transform);
            break;
        case b1286:
            o2755(n1530, f1529, addProps, transform);
            break;
        case g1265:
            l2756(n1530, f1529);
            break;
        case t1268:
            l2757(n1530, f1529, addProps, transform);
            break;
    } if (n1530 != undefined && n1530 != null && !n1530.removed) {
        if (n1530.parent == figma.currentPage)
            yield figma.currentPage.loadAsync();
        n1530.parent.appendChild(n1530);
        if (f1529[k1417])
            g1560(n1530);
    } if (!f1529.counted) {
        o2745++;
        f1529.counted = true;
    } });
}
function q2732(w2758, g2759, g2760, m2067 = -1, nodeIds = [], s2761 = false, f2762 = false, w270 = false, addProps = true, transform = true) {
    return __awaiter(this, void 0, void 0, function* () { let w2763 = NULL; let x2764 = null; let abort = false; const e3642 = []; let r2746 = 0; o2742.push(...nodeIds); if (m2067 > -1)
        b2744 = m2067; for (const f1529 of g2759) {
        k2743.push(f1529);
        if (f1529[z1396] != w2763) {
            w2763 = f1529[z1396];
            x2764 = q2729.find(a => a.nodeId == f1529[z1396]);
            if (!x2764) {
                q2729.push(x2764 = { nodeId: f1529[z1396], objects: [] });
            }
        }
        const addObject = n1530 => { if (w2758 != undefined && w2758 != null && !w2758.removed)
            w2758.appendChild(n1530);
        else
            x2764.objects.push(n1530); };
        let objects = w2758 != undefined && w2758 != null && !w2758.removed ? w2758.children : x2764.objects;
        let n1530 = objects.find(o => o.removed || o.getPluginData('userId') == figma.currentUser.id && o.getPluginData('objectId') == f1529[c1397]);
        if (n1530 != undefined && n1530 != null && n1530.removed) {
            i938(objects, n1530);
            if (w2765.includes(n1530))
                f943(w2765, n1530);
            if (m2781.includes(n1530))
                f943(m2781, n1530);
        }
        if (n1530 == undefined || n1530 == null || n1530.removed) {
            const newObj = yield w1545(f1529, addObject, addProps, transform);
            e3642.push(newObj);
        }
        else if (n1530 != undefined && n1530 != null && !n1530.removed && n1530.getPluginData('type') == f1529[b1395].toString()) {
            yield c1546(n1530, f1529, addProps, transform);
            if (n1530 != undefined && n1530 != null && !n1530.removed)
                e3642.push(n1530);
        }
        else {
            n1530.remove();
            if (w2765.includes(n1530))
                f943(w2765, n1530);
            if (m2781.includes(n1530))
                f943(m2781, n1530);
            yield w1545(f1529, addObject, addProps, transform);
        }
        r2746++;
        if (r2746 >= g2760) {
            const result = yield h2739('returnObjectUpdate', { b2744: b2744, o2745: o2745 });
            abort = result.value;
            r2746 = 0;
            if (abort)
                break;
        }
    } if (w2758 != undefined && w2758 != null && !w2758.removed) {
        for (const n1530 of w2758.children) {
            if (n1530 != undefined && n1530 != null && n1530.removed || !g2759.find(o => o[c1397] == n1530.getPluginData('objectId') && n1530.getPluginData('userId') == figma.currentUser.id))
                n1530.remove();
        }
    } for (const point of w2765) {
        if (point.parent == figma.currentPage)
            yield figma.currentPage.loadAsync();
        if (point != undefined && point != null && !point.removed && !point.parent.removed)
            point.parent.appendChild(point);
    } if (f2762 && !abort) {
        v1526(o2742, k2743);
        o2742 = [];
        k2743 = [];
        if (w270 && e3642.length > 0) {
            figma.viewport.scrollAndZoomIntoView(e3642);
            const bounds = g1550(e3642);
            figma.viewport.zoom = Math.min(figma.viewport.bounds.width * figma.viewport.zoom / bounds.width - 0.05, figma.viewport.bounds.height * figma.viewport.zoom / bounds.height - 0.05);
        }
    } yield h2739('returnObjectUpdate', { b2744: b2744, o2745: o2745 }); });
}
function v1547(f1529) { switch (f1529[b1395]) {
    case g1219: return o2712(f1529);
    case i1222: return y2774(f1529);
    case c1225: return s2775(f1529);
    case e1237: return y4026(f1529);
    case f1240: return z2715(f1529);
    case k1243: return a2718(f1529);
    case q1246: return t4025(f1529);
    case b1250: return u2776(f1529);
    case h1262: return b2777(f1529);
    case b1286: return l2778(f1529);
    case g1265: return t2779(f1529);
    case t1268: return o2780(f1529);
} }
function i1548(f1529) {
    return __awaiter(this, void 0, void 0, function* () { (() => __awaiter(this, void 0, void 0, function* () { const n1530 = yield w1545(f1529); const width = n1530.width; const height = n1530.height; n1530.remove(); h1543({ cmd: 'uiForwardToGenerator', msg: { cmd: 'returnFigGetObjectSize', objectId: f1529[c1397], width: width, height: height } }); }))(); });
}
function m1549(n1530) { n1530.setPluginData('type', ''); n1530.setPluginData('nodeId', ''); n1530.setPluginData('userId', ''); n1530.setPluginData('sessionId', ''); n1530.setPluginData('objectId', ''); n1530.setPluginData('isCenter', ''); n1530.setPluginData('retain', ''); }
function g1550(objects) { const bounds = { left: 0, top: 0, right: 0, bottom: 0 }; for (const g111 of objects) {
    if (g111.x < bounds.left || bounds.left == bounds.right)
        bounds.left = g111.x;
    if (g111.y < bounds.top || bounds.top == bounds.bottom)
        bounds.top = g111.y;
    if (g111.x + g111.width > bounds.right || bounds.left == bounds.right)
        bounds.right = g111.x + g111.width;
    if (g111.y + g111.height > bounds.bottom || bounds.top == bounds.bottom)
        bounds.bottom = g111.y + g111.height;
} return { x: bounds.left, y: bounds.top, width: bounds.right - bounds.left, height: bounds.bottom - bounds.top }; }
function figExport(objectIds, scale, format, suffix) {
    return __awaiter(this, void 0, void 0, function* () { yield figma.currentPage.loadAsync(); for (const objId of objectIds) {
        let n1530 = figma.currentPage.children.find(o => !o.removed && o.getPluginData('userId') == figma.currentUser.id && o.getPluginData('objectId') == objId);
        if (!n1530)
            continue;
        const settings = { constraint: { type: 'SCALE', value: scale }, format: format == 0 ? 'PNG' : 'JPG', suffix: suffix };
        yield n1530.exportAsync(settings);
    } });
}
const m2781 = [];
const j2782 = [];
function q1551(p1552, h1553) { const effects = []; for (const effect of p1552) {
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
                if (h1553 && !isNaN(spread))
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
function x2702(n1530, f1529, phantom = true) { f1556(n1530, f1529); e2703(n1530, f1529, phantom); m2704(n1530, f1529); n1530.opacity = f1529[i1419]; n1530.blendMode = f1529[x1420]; const maskType = f1529[r1421]; n1530.isMask = maskType > 0; if (n1530.isMask) {
    switch (maskType) {
        case 1:
            n1530.maskType = 'ALPHA';
            break;
        case 2:
            n1530.maskType = 'VECTOR';
            break;
        case 3:
            n1530.maskType = 'LUMINANCE';
            break;
    }
} if (n1530.isMask && n1530.fills.length == 0 && n1530.strokes.length == 0)
    n1530.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 }, opacity: 1, blendMode: 'NORMAL' }]; }
function m2704(n1530, f1529) { if (!!f1529[e1408] && !isEmpty(f1529[e1408])) {
    n1530.fills = k956(f1529[e1408]);
    if (m2781.includes(n1530))
        f943(m2781, n1530);
}
else
    n1530.fills = []; }
function e2703(n1530, f1529, phantom = true) { if (f1529[g1409] != null && !isEmpty(f1529[g1409])) {
    v1555(n1530, k956(f1529[g1409]), f1529[q1410], f1529[j1411], f1529[s1412], f1529[d1413], f1529[d1414], i2705(f1529[j1415]));
    if (f1529[k1417])
        n1530.setPluginData('dashes', f1529[j1415]);
    if (m2781.includes(n1530))
        f943(m2781, n1530);
    if (f1529[k1417])
        e949(j2782, n1530);
}
else if (isEmpty(f1529[e1408]) && isEmpty(f1529[g1409]) && !f1529[r1421] && phantom) {
    u1558(n1530);
    e949(m2781, n1530);
}
else
    n1530.strokes = []; }
function i2705(n1554) { n1554 = n1554; n1554 = l954(n1554, ','); n1554 = w955(n1554, ','); n1554 = n1554.trim(); return n1554 == '' ? [] : n1554.split(',').map(s => Math.max(0, parseFloat(s))); }
function z2706(n1554) { n1554 = n1554; n1554 = l954(n1554, ','); n1554 = w955(n1554, ','); n1554 = n1554.trim(); return n1554 == '' ? [] : n1554.split(',').map(s => Math.max(0, parseFloat(s) / m2708)); }
function v1555(n1530, fills, weight, align, join, miterLimit, cap, dashes = []) { n1530.strokes = fills; n1530.strokeWeight = Math.max(0, weight); n1530.strokeAlign = align; n1530.strokeJoin = join; const miterAngle = miterLimit / 360 * Tau; const x2783 = 1 / Math.sin(miterAngle / 2); n1530.strokeMiterLimit = Math.min(Math.max(0, x2783), 16); n1530.strokeCap = cap; n1530.dashPattern = dashes; }
function f1556(n1530, f1529) { if (!!f1529[i1416] && !isEmpty(f1529[i1416])) {
    const h1553 = f1529[b1395] == g1219 || f1529[b1395] == c1225 || f1529[b1395] == t1268;
    n1530.effects = q1551(f1529[i1416], h1553);
}
else
    n1530.effects = []; }
function i1557() { for (const g111 of m2781) {
    if (g111.removed)
        f943(m2781, g111);
    else
        u1558(g111);
} }
function u1558(g111) { figma.currentPage.loadAsync().then(() => { const back = figma.currentPage.backgrounds.find(b => b.type == 'SOLID'); let phantomColor; if (back) {
    const l = back.color.r * 0.2126 + back.color.g * 0.7152 + back.color.b * 0.0722;
    phantomColor = l > 0.5 ? { r: 0, g: 0, b: 0 } : { r: 1, g: 1, b: 1 };
}
else
    phantomColor = { r: 1, g: 0, b: 1 }; v1555(g111, [{ type: 'SOLID', color: phantomColor, opacity: 0.5 }], 1 / m2708, 'CENTER', 'MITER', 1, 'NONE', [1 / m2708, 2 / m2708]); }); }
function h1559() { for (const n1530 of j2782) {
    if (n1530.removed)
        f943(j2782, n1530);
    else
        g1560(n1530);
} }
function g1560(n1530) { n1530.strokeWeight = Math.max(0, 1.5 / m2708); if (n923(n1530.getPluginData('isCenter'))) {
    const path = n1530.vectorPaths[0];
    const parts = path.data.split(' ');
    let t = { x: parseFloat(parts[1]), y: parseFloat(parts[2]) };
    let c = { x: parseFloat(parts[4]), y: parseFloat(parts[5]) };
    let r = { x: parseFloat(parts[7]), y: parseFloat(parts[8]) };
    const a = 2;
    const b = 0.05;
    const f = 1 - Math.pow(1 - Math.min(m2708, 1), a) / Math.pow(a, b);
    t = x895(c, i897(w886(v900(t, c)), objectCenterSize / f));
    r = x895(c, i897(w886(v900(r, c)), objectCenterSize / f));
    parts[1] = t.x;
    parts[2] = t.y;
    parts[4] = c.x;
    parts[5] = c.y;
    parts[7] = r.x;
    parts[8] = r.y;
    const d2784 = { windingRule: path.windingRule, data: parts.join(' ') };
    n1530.vectorPaths = [d2784];
} const dashes = n1530.getPluginData('dashes'); if (dashes != '')
    n1530.dashPattern = z2706(dashes); }
function c1594(nodeId, px, py) { figma.getLocalPaintStylesAsync().then(_styles => { const styles = new Array(); for (const j168 of _styles) {
    const _nodeId = j168.getPluginData('nodeId');
    const _existing = j168.getPluginData('existing');
    const existing = !!_existing;
    const style = { id: j168.id, nodeId: _nodeId, name: j168.name, existing: existing, paints: new Array() };
    let onlyPaint = true;
    for (const p2786 of j168.paints) {
        if (p2786.type == 'SOLID') {
            style.paints.push([p2786.color.r, p2786.color.g, p2786.color.b, p2786.opacity]);
        }
        else {
            onlyPaint = false;
            break;
        }
    }
    if (onlyPaint)
        styles.push(style);
} h1543({ cmd: 'uiReturnFigGetAllLocalColorStyles', nodeId: nodeId, px: px, py: py, styles: JSON.stringify(styles) }); }); }
function j1595(nodeId, styleId) { figma.getLocalPaintStylesAsync().then(n1597 => { if (styleId != NULL)
    v1596(n1597, nodeId, styleId);
else
    p1598(n1597, nodeId); }); }
function v1596(n1597, nodeId, styleId, clearExisting = true) { const w2785 = c2731.find(a => a.nodeId == nodeId); if (w2785 && clearExisting)
    p1598(n1597, nodeId); const y1602 = n1597.find(s => s.id == styleId); c952(!!y1602, 'figStyle should be found here'); y1602.setPluginData('type', w1216); y1602.setPluginData('nodeId', nodeId); y1602.setPluginData('existing', w937(true)); c2731.push({ nodeId: nodeId, existing: true, styles: [y1602] }); return y1602; }
function p1598(n1597, nodeId) { const y1602 = n1597.find(s => s.getPluginData('nodeId') == nodeId); c952(!!y1602, 'figStyle should be found here'); if (y1602) {
    y1602.setPluginData('type', NULL);
    y1602.setPluginData('nodeId', NULL);
    y1602.setPluginData('existing', NULL);
    r945(c2731, a => a.nodeId == nodeId);
} return y1602; }
function j1599(styles, z1603) { const y1602 = figma.createPaintStyle(); y1602.setPluginData('type', z1603[b1395]); y1602.setPluginData('nodeId', z1603[z1396]); y1602.name = z1603[x1400]; setStylePaints(y1602, z1603); styles.push(y1602); h1543({ cmd: 'uiSetStyleId', nodeId: z1603[z1396], styleId: y1602.id }); return y1602; }
function a1600(msg) { let w2763 = NULL; let w2785; for (const z1603 of msg.styles) {
    if (z1603[z1396] != w2763) {
        w2763 = z1603[z1396];
        w2785 = c2731.find(a => a.nodeId == z1603[z1396]);
        if (!w2785) {
            w2785 = { nodeId: z1603[z1396], styles: [] };
            c2731.push(w2785);
        }
    }
    else
        w2785 = null;
    const y1602 = w2785.styles[0];
    figma.getLocalPaintStylesAsync().then(n1597 => { const localStyle = n1597.find(s => s.getPluginData('nodeId') == z1603[z1396]); if (isValid(y1602) && !isValid(localStyle)) {
        i938(w2785.styles, y1602);
    } const existing = isValid(y1602) && isValid(localStyle) && y1602.getPluginData('existing'); if (!isValid(y1602) || !isValid(localStyle)) {
        if (!existing) {
            o1533 = true;
            j1595(z1603[z1396], z1603[p1398]);
        }
    }
    else if (isValid(y1602) && y1602.getPluginData('type') == z1603[b1395]) {
        o1533 = true;
        w1601(localStyle, z1603);
    } });
} }
function w1601(y1602, z1603) { setStylePaints(y1602, z1603); y1602.name = z1603[x1400]; }
function getStylePaints(stylePaints) { const paints = new Array(); for (const p2786 of stylePaints) {
    const fill = p2786[1].split(' ');
    switch (p2786[0]) {
        case 'SOLID':
            paints.push({ type: 'SOLID', color: { r: Math.min(Math.max(0, parseFloat(fill[0]) / 0xff), 1), g: Math.min(Math.max(0, parseFloat(fill[1]) / 0xff), 1), b: Math.min(Math.max(0, parseFloat(fill[2]) / 0xff), 1) }, opacity: Math.min(Math.max(0, parseFloat(fill[3]) / 100), 1) });
            break;
    }
} return paints; }
function setStylePaints(y1602, z1603) { if (!isEmpty(z1603[u1402]))
    y1602.paints = getStylePaints(z1603[u1402]);
else
    y1602.paints = []; }
function y1617(nodeId, px, py) { figma.variables.getLocalVariablesAsync().then((l2787) => __awaiter(this, void 0, void 0, function* () { const variables = new Array(); for (const _var of l2787) {
    try {
        const collection = yield figma.variables.getVariableCollectionByIdAsync(_var.variableCollectionId);
        const variable = { id: _var.id, resolvedType: _var.resolvedType, name: _var.name, collectionName: collection.name };
        variables.push(variable);
    }
    catch (ex) { }
} figma.variables.getLocalVariableCollectionsAsync().then((collections) => __awaiter(this, void 0, void 0, function* () { h1543({ cmd: 'uiReturnFigGetAllLocalVariables', nodeId: nodeId, px: px, py: py, variables: JSON.stringify(variables), nCollections: collections.length }); })); })); }
function f1618(varIds) {
    return __awaiter(this, void 0, void 0, function* () { const l2787 = yield figma.variables.getLocalVariablesAsync(); const variables = varIds.map(id => l2787.find(v => v.id == id)); let values = []; for (let i = 0; i < varIds.length; i++) {
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
function u1619(nodeId, varId) { figma.variables.getLocalVariablesAsync().then(l2787 => { figLinkVariableAsync(l2787, nodeId, varId); }); }
function figUpdateVariableAsync(varId, value) {
    return __awaiter(this, void 0, void 0, function* () { figma.variables.getLocalVariablesAsync().then((l2787) => __awaiter(this, void 0, void 0, function* () { let variable = l2787.find(v => v.id == varId); if (!variable)
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
function figLinkVariableAsync(l2787, nodeId, varId) {
    return __awaiter(this, void 0, void 0, function* () { let variable = l2787.find(v => v.id == varId); if (!variable)
        return null; const [resolvedVar, values] = yield figGetResolvedVariableValuesAsync(variable); h1543({ cmd: 'uiReturnFigLinkNodeToVariable', nodeId: nodeId, variableId: resolvedVar ? resolvedVar.id : NULL, variableName: resolvedVar ? resolvedVar.name : '', resolvedType: resolvedVar ? resolvedVar.resolvedType : NULL, values: values }); return resolvedVar; });
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
function a1604(tl, tr, bl) { let vr = point(tr.x - tl.x, tr.y - tl.y); let vb = point(bl.x - tl.x, bl.y - tl.y); let sx = vr.x; let sy = vb.y; let kx = -vr.y; let ky = -vb.x; let dx = -tl.x; let dy = -tl.y; const _sx = kx / nozero(sx); const _sy = ky / nozero(sy); let y4207 = x889([[1, _sy, 0], [_sx, 1, 0], [0, 0, 1]], b893(dx, dy)); y4207 = r891(y4207); const a = o883(vr); if (a > Tau / 4 && a < Tau * 3 / 4)
    y4207 = x889(y4207, b893(0, 0, 1, 1, Tau / 2)); if (determinant(y4207) < 0)
    y4207 = x889(y4207, b893(0, 0, -1, 1, 0)); return y4207; }
function g1605(n1530, tl, tr, bl) { const y4207 = a1604(tl, tr, bl); n1530.relativeTransform = [y4207[0], y4207[1]]; }
function t1606(n1530, f1529, setSize = true, noHeight = 0.01) { if (!f1529[q1404] || !f1529[o1405] || !f1529[i1406])
    return; const xp0 = f1529[q1404]; const xp1 = f1529[o1405]; const xp2 = f1529[i1406]; g1605(n1530, xp0, xp1, xp2); if (setSize) {
    const scaleX = distv(xp0, xp1);
    const scaleY = distv(xp0, xp2);
    const height = f1529[b1395] == k1243 ? f1529[j1439] : f1529[w1426];
    if (!n1530.removed) {
        n1530.resizeWithoutConstraints(Math.max(0.01, scaleX), height ? Math.max(0.01, scaleY) : noHeight);
    }
} }
function m1607(x2700, x2701) { if (x2700.removed)
    return; x2700.resizeWithoutConstraints(0.01, 0.01); x2700.setPluginData('actualX', x2701[d1422].toString()); x2700.setPluginData('actualY', x2701[q1424].toString()); x2700.x = x2701[d1422]; x2700.y = x2701[q1424]; x2700.rotation = x2701[u1418] ? 45 : 0; }
function a1608(x2700) { if (!x2700.removed)
    x2700.resizeWithoutConstraints(0.01, 0.01); }
function l2778(genBool) { return true; }
function n2749(genBool, addProps, transform) {
    return __awaiter(this, void 0, void 0, function* () { let objects = []; for (const g111 of genBool[h1453])
        yield w1545(g111, o => objects = [...objects, o], false); yield figma.currentPage.loadAsync(); let figBool = null; if (!isEmpty(objects)) {
        switch (genBool[e1454]) {
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
        o2755(figBool, genBool, addProps, transform);
    } return figBool; });
}
function o2755(figBool, genBool, addProps, transform) {
    return __awaiter(this, void 0, void 0, function* () { if (genBool[h1453].length == 0) {
        figBool.remove();
        return;
    } yield q2732(figBool, genBool[h1453], genBool[h1453].length, -1, [], false, false, false, false, true); const hasProps = genBool[e1408].length > 0 || genBool[g1409].length > 0 || genBool[i1416].length > 0; x2702(figBool, genBool, !hasProps && addProps); });
}
function s2775(e2766) { return e2766[d1422] != null && !isNaN(e2766[d1422]) && e2766[q1424] != null && !isNaN(e2766[q1424]) && e2766[v1425] != null && !isNaN(e2766[v1425]) && e2766[w1426] != null && !isNaN(e2766[w1426]) && e2766[t1428] != null && !isNaN(e2766[t1428]) && e2766[s1435] != null && !isNaN(e2766[s1435]) && e2766[y1441] != null && !isNaN(e2766[y1441]) && e2766[u1445] != null && !isNaN(e2766[u1445]); }
function h2788(e2766, addProps, transform) { if (!s2775(e2766))
    return null; const c2767 = figma.createEllipse(); p2789(c2767, e2766, addProps, transform, true); return c2767; }
function p2789(c2767, e2766, addProps, transform, isValid = false) { if (!isValid && !s2775(e2766))
    return; h2790(c2767, e2766, transform); if (w2765.includes(c2767))
    n2697(c2767);
else
    x2702(c2767, e2766, addProps); }
function h2790(c2767, e2766, transform) { c2767.cornerRadius = e2766[t1428]; const start = e2766[s1435] / 360 * (Math.PI * 2); const sweep = e2766[y1441] / 100 * (Math.PI * 2); c2767.arcData = { startingAngle: start, endingAngle: start + sweep, innerRadius: Math.min(Math.max(0, e2766[u1445] / 100), 1) }; if (transform)
    t1606(c2767, e2766); }
function o2780(x2768) { return x2768[d1422] != null && !isNaN(x2768[d1422]) && x2768[q1424] != null && !isNaN(x2768[q1424]) && x2768[v1425] != null && !isNaN(x2768[v1425]) && x2768[w1426] != null && !isNaN(x2768[w1426]) && x2768[m1434] != null && !isNaN(x2768[m1434]) && x2768[f1455] != null && !isNaN(x2768[f1455]); }
function r2751(x2768, addProps, transform) {
    return __awaiter(this, void 0, void 0, function* () { if (!o2780(x2768))
        return null; const j2769 = figma.createFrame(); if (j2769) {
        j2769.expanded = false;
        r2791(j2769, x2768, addProps, transform);
        let objects = [];
        for (const g111 of x2768[l1440])
            yield w1545(g111, o => objects = [...objects, o]);
        for (const g111 of objects)
            j2769.appendChild(g111);
    } return j2769; });
}
function l2757(j2769, x2768, addProps, transform) { r2791(j2769, x2768, addProps, transform); q2732(j2769, x2768[l1440], x2768[l1440].length); }
function r2791(j2769, x2768, addProps, transform) { j2769.cornerRadius = x2768[m1434]; j2769.clipsContent = x2768[f1455] > 0; if (transform)
    t1606(j2769, x2768); x2702(j2769, x2768, addProps && x2768[l1440].length == 0); figUpdateStrokeSides(j2769, x2768); }
function t2779(w2770) { return true; }
function n2750(w2770) {
    return __awaiter(this, void 0, void 0, function* () { let objects = []; for (const g111 of w2770[q1423])
        yield w1545(g111, o => objects = [...objects, o]); yield figma.currentPage.loadAsync(); const x2771 = !isEmpty(objects) ? figma.group(objects, figma.currentPage) : null; if (x2771) {
        x2771.expanded = false;
        l2756(x2771, w2770);
    } return x2771; });
}
function l2756(x2771, w2770) { if (w2770[q1423].length == 0) {
    x2771.remove();
    return;
} q2732(x2771, w2770[q1423], w2770[q1423].length); f1556(x2771, w2770); }
function y2774(c2772) { return c2772[d1422] != null && !isNaN(c2772[d1422]) && c2772[q1424] != null && !isNaN(c2772[q1424]) && c2772[v1425] != null && !isNaN(c2772[v1425]); }
function n2792(c2772, addProps, transform) { if (!y2774(c2772))
    return null; const t2773 = figma.createLine(); b2793(t2773, c2772, addProps, transform, true); return t2773; }
function b2793(t2773, c2772, addProps, transform, isValid = false) { if (!isValid && !y2774(c2772))
    return; if (transform)
    t1606(t2773, c2772, true, 0); x2702(t2773, c2772, addProps); }
var w2765 = [];
function t4025(x2701) { return x2701[d1422] != null && !isNaN(x2701[d1422]) && x2701[q1424] != null && !isNaN(x2701[q1424]); }
function v2695(x2701) { const x2700 = x2701[u1418] ? figma.createRectangle() : figma.createEllipse(); if (!t4025(x2701))
    return x2700; if (w2765.includes(x2700))
    s2699(x2700, x2701);
else
    m2752(x2700, x2701); return x2700; }
function m2752(x2700, x2701) { m1607(x2700, x2701); g2698(x2700); }
function b2696() { h1543({ cmd: 'uiUpdateZoom', zoom: figma.viewport.zoom }); for (const point of w2765)
    n2697(point); }
function n2697(x2700) { a1608(x2700); g2698(x2700); }
function s2699(x2700, x2701) { m1607(x2700, x2701); g2698(x2700); }
function g2698(x2700) { if (x2700.removed)
    return; figma.currentPage.loadAsync().then(() => { const isCenter = n923(x2700.getPluginData('isCenter')); const p2707 = figma.currentPage.selection.includes(x2700); const color = isCenter ? [0xf2, 0x48, 0x22] : p2707 ? [12, 140, 233] : [255, 255, 255]; const border = isCenter ? [255, 255, 255] : p2707 ? [255, 255, 255] : [12, 140, 233]; x2700.fills = k956([['SOLID', color[0], color[1], color[2], 100]]); const effects = []; effects.push(...q1551([['DROP_SHADOW', border[0] / 255, border[1] / 255, border[2] / 255, 1, 0, 0, 0, (isCenter ? 3 : p2707 ? 5 : 3.6) / m2708, 'NORMAL', true, true]], true)); effects.push(...q1551([['DROP_SHADOW', color[0] / 255, color[1] / 255, color[2] / 255, 1, 0, 0, 0, (p2707 ? 4 : 2.4) / m2708, 'NORMAL', true, true]], true)); x2700.effects = effects; }); }
function y4026(genPoly) { return genPoly[d1422] != null && !isNaN(genPoly[d1422]) && genPoly[q1424] != null && !isNaN(genPoly[q1424]) && genPoly[v1425] != null && !isNaN(genPoly[v1425]) && genPoly[w1426] != null && !isNaN(genPoly[w1426]) && genPoly[i1431] != null && !isNaN(genPoly[i1431]) && genPoly[r1437] != null && !isNaN(genPoly[r1437]); }
function l2709(genPoly, addProps, transform) { if (!y4026(genPoly))
    return null; const figPoly = figma.createPolygon(); y2710(figPoly, genPoly, addProps, transform, true); return figPoly; }
function y2710(figPoly, genPoly, addProps, transform, isValid = false) { if (!isValid && !y4026(genPoly))
    return; figPoly.cornerRadius = genPoly[i1431]; figPoly.pointCount = Math.max(3, genPoly[r1437]); if (transform)
    t1606(figPoly, genPoly); x2702(figPoly, genPoly, addProps); }
function o2712(v2711) { return v2711[d1422] != null && !isNaN(v2711[d1422]) && v2711[q1424] != null && !isNaN(v2711[q1424]) && v2711[v1425] != null && !isNaN(v2711[v1425]) && v2711[w1426] != null && !isNaN(v2711[w1426]) && v2711[p1427] != null && !isNaN(v2711[p1427]); }
function b2713(v2711, addProps, transform) { if (!o2712(v2711))
    return null; const figRect = figma.createRectangle(); c2714(figRect, v2711, addProps, transform, true); return figRect; }
function c2714(figRect, v2711, addProps, transform, isValid = false) { if (!isValid && !o2712(v2711))
    return; const foundCorners = v2711[i1416].findIndex(e => e[0] == 'ROUND_CORNERS'); if (foundCorners > -1) {
    const corners = v2711[i1416][foundCorners];
    figRect.topLeftRadius = corners[1];
    figRect.topRightRadius = corners[2];
    figRect.bottomLeftRadius = corners[3];
    figRect.bottomRightRadius = corners[4];
}
else
    figRect.cornerRadius = v2711[p1427]; if (transform)
    t1606(figRect, v2711); x2702(figRect, v2711, addProps); figUpdateStrokeSides(figRect, v2711); }
function figUpdateStrokeSides(n1530, f1529) { const foundSides = f1529[i1416].findIndex(e => e[0] == 'STROKE_SIDES'); if (foundSides < 0)
    return; const sides = f1529[i1416][foundSides]; n1530.strokeWeight = 0; n1530.strokeTopWeight = sides[1]; n1530.strokeLeftWeight = sides[2]; n1530.strokeRightWeight = sides[3]; n1530.strokeBottomWeight = sides[4]; }
function z2715(g2725) { return g2725[d1422] != null && !isNaN(g2725[d1422]) && g2725[q1424] != null && !isNaN(g2725[q1424]) && g2725[v1425] != null && !isNaN(g2725[v1425]) && g2725[w1426] != null && !isNaN(g2725[w1426]) && g2725[j1432] != null && !isNaN(g2725[j1432]) && g2725[v1438] != null && !isNaN(g2725[v1438]) && g2725[f1443] != null && !isNaN(g2725[f1443]); }
function h2716(g2725, addProps, transform) { if (!z2715(g2725))
    return null; const c2726 = figma.createStar(); k2717(c2726, g2725, addProps, transform, true); return c2726; }
function k2717(c2726, g2725, addProps, transform, isValid = false) { if (!isValid && !z2715(g2725))
    return; c2726.cornerRadius = g2725[j1432]; c2726.pointCount = g2725[v1438]; c2726.innerRadius = Math.min(Math.max(0, g2725[f1443] / 100), 1); if (transform)
    t1606(c2726, g2725); x2702(c2726, g2725, addProps); }
const u4268 = [];
function a2718(m2722) { return m2722[f1444] != null && m2722[d1422] != null && !isNaN(m2722[d1422]) && m2722[q1424] != null && !isNaN(m2722[q1424]) && m2722[v1425] != null && !isNaN(m2722[v1425]) && m2722[w1426] != null && !isNaN(m2722[w1426]) && m2722[t1446] != null && m2722[t1446] != NULL && m2722[j1447] != null && !isNaN(m2722[j1447]); }
function a2719(m2722, addProps, transform) { if (!a2718(m2722))
    return null; const a2794 = figma.createText(); o2720(a2794, m2722, addProps, transform, true); return a2794; }
function o2720(a2794, m2722, addProps, transform, isValid = false) { if (!isValid && !a2718(m2722))
    return null; const fontName = { family: m2722[t1446], style: m2722[h1448] }; try {
    if (!u4268.includes(fontName)) {
        figma.loadFontAsync(fontName).then(() => { u4268.push(fontName); j2721(a2794, m2722, fontName, addProps, transform); });
    }
    else {
        j2721(a2794, m2722, fontName, addProps, transform);
    }
}
catch (e) {
    c953(e);
} }
function j2721(a2794, m2722, fontName, addProps, transform) { a2794.fontName = fontName; a2794.fontSize = Math.max(1, m2722[j1447]); a2794.characters = m2722[f1444]; a2794.lineHeight = { unit: 'PERCENT', value: m2722[p1451] }; a2794.letterSpacing = { unit: 'PERCENT', value: m2722[i1452] }; if (m2722[b1449] == 0)
    a2794.textAlignHorizontal = 'LEFT';
else if (m2722[b1449] == 1)
    a2794.textAlignHorizontal = 'CENTER';
else if (m2722[b1449] == 2)
    a2794.textAlignHorizontal = 'RIGHT';
else if (m2722[b1449] == 3)
    a2794.textAlignHorizontal = 'JUSTIFIED'; if (m2722[t1450] == 0)
    a2794.textAlignVertical = 'TOP';
else if (m2722[t1450] == 1)
    a2794.textAlignVertical = 'CENTER';
else if (m2722[t1450] == 2)
    a2794.textAlignVertical = 'BOTTOM'; if (transform)
    t1606(a2794, m2722); x2702(a2794, m2722, addProps); if (m2722[s1433] == 0 && m2722[j1439] == 0)
    a2794.textAutoResize = 'WIDTH_AND_HEIGHT';
else if (m2722[s1433] == 0)
    a2794.textAutoResize = 'HEIGHT';
else
    a2794.textAutoResize = 'NONE'; }
function b2777(h2727) { return true; }
function y2748(h2727, addProps, transform) { if (!b2777(h2727))
    return null; const k2728 = figma.createVector(); d2754(k2728, h2727, addProps, transform, true); return k2728; }
function d2754(k2728, h2727, addProps, transform, isValid = false) { if (!isValid && !b2777(h2727))
    return; k2728.setVectorNetworkAsync(h2727[f1429]); if (transform)
    t1606(k2728, h2727, false); x2702(k2728, h2727, addProps); }
function u2776(m2723) { return m2723[b1436] != null && !isNaN(m2723[b1436]) && m2723[c1442] != null && !isNaN(m2723[c1442]); }
function p2747(m2723, addProps, transform) { const h2724 = figma.createVector(); f2753(h2724, m2723, addProps, transform, true); return h2724; }
function f2753(h2724, m2723, addProps, transform, isValid = false) { if (!isValid && !u2776(m2723))
    return; h2724.vectorPaths = [{ windingRule: m2723[b1436] == 1 ? 'NONZERO' : 'EVENODD', data: m2723[j1430] }]; h2724.cornerRadius = Number(m2723[c1442]); if (transform)
    t1606(h2724, m2723, false); x2702(h2724, m2723, addProps); }
