var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function c1048(key, tag) { return key.substring(0, tag.length + 1) == tag + ' '; }
function x1049(key, tag) { return key.substring(tag.length + 1); }
function l1050(key) { return c1048(key, c877); }
function v1051(key) { return c1048(key, z875); }
function m1052(key) { return c1048(key, t876); }
function m1053(key) { return x1049(key, c877); }
function z1054(key) { return x1049(key, z875); }
function e1055(key) { return x1049(key, t876); }
const generatorVersion = 440;
const p869 = 2147483647;
const NULL = '';
const z870 = '  ';
const w871 = '    ';
const e872 = '\n';
const a873 = '◦ G •';
const k874 = a873 + ' ';
const z875 = 'G_NODE';
const t876 = 'G_CONN';
const c877 = 'G_PAGE';
const q878 = 'G_TEMP';
const minWindowWidth = 602;
const minWindowHeight = 39;
const identity = Object.freeze([[1, 0, 0], [0, 1, 0], [0, 0, 1]]);
const Epsilon = 0.0000001;
const Tau = Math.PI * 2;
var enableAsserts = false;
function a879(x, eps = 0.000000001) { return Math.abs(x) < eps ? 0 : x; }
function nozero(x, eps = 0.000000001) { return x != 0 ? x : (x < 0 ? -eps : eps); }
function p880(v, eps = 0.000000001) { return point(nozero(v.x, eps), nozero(v.y, eps)); }
function equal(a, b, eps = 0.000000001) { return Math.abs(b - a) < eps; }
function sqr(x) { return x * x; }
;
function cube(x) { return x * x * x; }
;
function p881(f) { return Math.floor(f) | 0; }
function r882(x) { x = p881(x); x--; x |= x >> 1; x |= x >> 2; x |= x >> 4; x |= x >> 8; x |= x >> 16; x |= x >> 32; return ++x; }
function gcd(a, b) { let temp; while (1) {
    temp = a % b;
    if (temp == 0)
        return b;
    a = b;
    b = temp;
} }
function distv(p1, p2) { const dx = p2.x - p1.x; const dy = p2.y - p1.y; return Math.sqrt(dx * dx + dy * dy); }
function v883(v) { let angle = Math.atan2(v.y, v.x); if (angle < 0)
    angle += Tau; return angle; }
function anglev2(v1, v2) { return anglev2_(v1.x, v1.y, v2.x, v2.y); }
function anglev2_(x1, y1, x2, y2) { const dx = x2 - x1; const dy = y2 - y1; let angle = Math.atan2(dy, dx); if (angle < 0)
    angle += Tau; return angle; }
function j885(v) { return Math.sqrt(v.x * v.x + v.y * v.y); }
function lengthv_(x, y) { return Math.sqrt(x * x + y * y); }
function a886(v) { return point(v.x == 0 ? 0 : v.x / j885(v), v.y == 0 ? 0 : v.y / j885(v)); }
function dotv(v1, v2) { return v1.x * v2.x + v1.y * v2.y; }
function x887(a1, a2) { let diff = a2 - a1; while (diff <= -Tau / 2)
    diff += Tau; while (diff > Tau / 2)
    diff -= Tau; return diff; }
function z888(v, m) { let v3 = [v.x, v.y, 1]; let r = i948(v3, m); return point(r[0], r[1]); }
function e889(...mm) { x952(mm.length > 0, 'mulm3m3() must take at least one argument'); let result = clone(mm[0]); for (let a = 1; a < mm.length; a++) {
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
function x890(m, s) { for (let i = 0; i < 3; i++)
    for (let j = 0; j < 3; j++)
        m[i][j] /= s; return m; }
function adjugate(m) { return cofactor(transpose(m)); }
function transpose(m) { return [[m[0][0], m[1][0], m[2][0]], [m[0][1], m[1][1], m[2][1]], [m[0][2], m[1][2], m[2][2]]]; }
function cofactor(m) { return [[m[1][1] * m[2][2] - m[2][1] * m[1][2], -(m[1][0] * m[2][2] - m[2][0] * m[1][2]), m[1][0] * m[2][1] - m[2][0] * m[1][1]], [-(m[0][1] * m[2][2] - m[2][1] * m[0][2]), m[0][0] * m[2][2] - m[2][0] * m[0][2], -(m[0][0] * m[2][1] - m[2][0] * m[0][1])], [m[0][1] * m[1][2] - m[1][1] * m[0][2], -(m[0][0] * m[1][2] - m[1][0] * m[0][2]), m[0][0] * m[1][1] - m[1][0] * m[0][1]]]; }
function determinant(m) { return m[0][0] * (m[1][1] * m[2][2] - m[1][2] * m[2][1]) - m[0][1] * (m[1][0] * m[2][2] - m[2][0] * m[1][2]) + m[0][2] * (m[1][0] * m[2][1] - m[2][0] * m[1][1]); }
function z891(m) { return x890(adjugate(m), determinant(m)); }
function u892(angle) { const cosA = a879(Math.cos(angle)); const sinA = a879(Math.sin(angle)); return [[cosA, sinA, 0], [-sinA, cosA, 0], [0, 0, 1]]; }
function a893(x = 0, y = 0, scaleX = 1, scaleY = 1, angle = 0, skewX = 0, skewY = 0) { const cosA = Math.cos(angle); const sinA = Math.sin(angle); return [[scaleX * cosA - skewY * sinA, -skewX * cosA + scaleY * sinA, x], [skewY * cosA + scaleX * sinA, scaleY * cosA + skewX * sinA, y], [0, 0, 1]]; }
function d894(v1, v2) { return v1.x * v2.y - v1.y * v2.x; }
function f895(v1, v2) { return point(v1.x + v2.x, v1.y + v2.y); }
function sqrv(v) { return j896(v, v); }
function j896(v1, v2) { return point(v1.x * v2.x, v1.y * v2.y); }
function l897(v, s) { return point(v.x * s, v.y * s); }
function s898(v1, v2) { return point(v1.x / v2.x, v1.y / v2.y); }
function b899(v, s) { return point(v.x / s, v.y / s); }
function x900(v1, v2) { return point(v1.x - v2.x, v1.y - v2.y); }
function z901(str) { return decodeURI(encodeURIComponent(str)); }
function a902(str) { return decodeURIComponent(encodeURI(str)); }
function f903(bytes) { let str = ''; for (let i = 0; i < bytes.length; i++)
    str += String.fromCharCode(bytes[i]); return str; }
function h904(str) { return Array.from(a902(str), c => c.charCodeAt(0)); }
function h905(array, size) { const newArray = new Uint8Array(size); a906(array, newArray); return newArray; }
function a906(src, dst) { u907(src, 0, src.length, dst, 0, dst.length); }
function u907(src, u908, p909, dst, t910, n911) { const size = Math.min(p909, n911); for (let i = 0; i < size; i++)
    dst[t910 + i] = src[u908 + i]; }
function a912(y913, r914) { if (y913.length != r914.length)
    return false; for (let i = 0; i < y913.length; i++) {
    if (y913[i] != r914[i])
        return false;
} return true; }
function p915(n916, v917) { return n916.findIndex(i => v917.includes(i)) > -1; }
function o918(list) { return list ? '<==' : '<--'; }
;
function k919(list) { return list ? '==>' : '-->'; }
;
function b920(nodeId) { return z875 + ' ' + nodeId; }
function p921(name) { return t876 + ' ' + name; }
function d922(name) { return c877 + ' ' + name; }
function m923(str) { return str.toLowerCase() == 'true' || str == '1'; }
function s924(a925, b926 = false) { return i931(a925.outputNodeId, a925.outputId, a925.outputOrder, a925.inputNodeId, a925.inputId, a925.list, b926); }
function e927(outputNodeId, outputId, outputOrder, inputNodeId, inputId) { return p921(outputNodeId + ' ' + outputId + ' ' + outputOrder + ' ' + inputNodeId + ' ' + inputId); }
function x928(h243) { return e927(h243.outputNodeId, h243.outputId, h243.outputOrder, h243.inputNodeId, h243.inputId); }
function e929(h243) { return e927(h243.output.node.id, h243.output.id, h243.outputOrder, h243.input.node.id, h243.input.id); }
function p930(h243, b926 = false) { return i931(h243.output.node.id, h243.output.id, h243.outputOrder, h243.input.node.id, h243.input.id, h243.list, b926); }
function i931(outputNodeId, outputId, outputOrder, inputNodeId, inputId, list, b926 = false) { const sp = b926 ? ' ' : '  '; const jsp = b926 ? '' : ' '; const arrow = sp + p935(typeof outputOrder == 'string' ? parseInt(outputOrder) : outputOrder) + k919(typeof list == 'string' ? m923(list) : list) + sp; const join = jsp + '.' + jsp; return outputNodeId + join + outputId + arrow + inputNodeId + join + inputId; }
function j932(pageId) { return d922(pageId); }
function p933(num) { const str = num.toString(); let sup = ''; for (const c of str)
    sup += d934(c); return sup; }
function d934(c) { switch (c) {
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
function p935(num) { const str = num.toString(); let sup = ''; for (const c of str)
    sup += p936(c); return sup; }
function p936(c) { switch (c) {
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
function l937(bool) { return bool ? 'true' : 'false'; }
function isValid(val) { return val != undefined && val != null; }
function isEmpty(array) { return array.length == 0; }
function n938(array, item) { d939(array, array.indexOf(item)); }
function d939(array, index) { if (index > -1 && index < array.length)
    array.splice(index, 1); }
function j940(array) { if (isEmpty(array))
    return null; let last = array.at(-1); array.splice(array.length - 1, 1); return last; }
function g941(array) { return array[array.length - 1]; }
function d942(array, from, to) { const item = array[from]; array.splice(from, 1); array.splice(to, 0, item); }
function j943(array, item) { const index = array.indexOf(item); if (index > -1)
    array.splice(index, 1); }
function l944(w2796, array) { for (const item of array) {
    const index = w2796.indexOf(item);
    if (index > -1)
        w2796.splice(index, 1);
} }
function k945(array, where) { const index = array.findIndex(where); if (index > -1)
    array.splice(index, 1); }
function y946(styleId) { return styleId.split(',')[0] + ','; }
function w947(points) { let t4032 = ''; if (points.length < 2)
    return t4032; t4032 += 'M'; t4032 += ' ' + a879(points[0].x); t4032 += ' ' + a879(points[0].y); for (let i = 1; i < points.length; i++) {
    t4032 += ' L' + ' ' + a879(points[i].x) + ' ' + a879(points[i].y);
} return t4032; }
function point(x, y) { return { x: x, y: y }; }
function i948(v, m) { let r = [0, 0, 0]; for (let i = 0; i < 3; i++)
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
        let v111 = {};
        for (const key in val)
            v111[key] = clone(val[key]);
        return v111;
    }
} throw 'unknown'; }
function n949(array, item, equal = null) { if (equal) {
    if (Array.isArray(item))
        item.forEach(i => n949(array, i, equal));
    else if (!array.find(i => equal(i, item)))
        array.push(item);
}
else {
    if (Array.isArray(item))
        item.forEach(i => n949(array, i));
    else if (!array.includes(item))
        array.push(item);
} }
function s950(array, item, equal) { if (Array.isArray(item))
    item.forEach(i => s950(array, i, equal));
else if (!array.find(equal))
    array.push(item); }
function n951(array, item, except) { if (Array.isArray(item))
    item.forEach(i => n951(array, i, except));
else if (!array.find(except))
    array.push(item); }
function x952(...args) { if (enableAsserts) {
    console.assert(...args);
} }
function h953(...args) { if (enableAsserts)
    console.error(...args); }
function z954(str, trim) { while (str.length >= trim.length && str.substring(0, trim.length) == trim)
    str = str.substring(trim.length); return str; }
function h955(str, trim) { while (str.length >= trim.length && str.substring(str.length - trim.length) == trim)
    str = str.substring(0, str.length - trim.length); return str; }
function v956(p4092) { const fills = []; for (const fill of p4092) {
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
            const m4207 = [[0, 1, 0], [0.5, 0.5, 1], [1, 1, 1]];
            let b4208 = [[p0.x, p1.x, p2.x], [p0.y, p1.y, p2.y], [1, 1, 1]];
            b4208 = e889(m4207, z891(b4208));
            b4208 = [b4208[0], b4208[1]];
            const stops = [];
            for (const stop of fill[2]) {
                stops.push({ color: { r: Math.min(Math.max(0, stop[0]), 1), g: Math.min(Math.max(0, stop[1]), 1), b: Math.min(Math.max(0, stop[2]), 1), a: Math.min(Math.max(0, stop[3]), 1) }, position: stop[4] });
            }
            fills.push({ type: fill[0], gradientTransform: b4208, gradientStops: stops, blendMode: fill[3] });
            break;
        }
    }
} return fills; }
function n957(type) { return w1089.includes(type); }
const q1056 = 'LIST#';
const b1057 = 'NLIST#';
const b1058 = 'TLIST#';
const o1059 = 'SLIST#';
const n1060 = 'NULL';
const f1061 = 'VAR';
const b1062 = 'VARGRP';
const q1063 = 'FEEDBK';
const r1064 = 'REPT';
const y1065 = 'CACHE';
const q1066 = 'FRZ';
const k1067 = 'TIMER';
const e1068 = 'VNAME';
const x1352 = 'GVNAMES';
const x1353 = 'VNAMES';
const a1354 = 'ONAME';
const p1069 = 'CMB';
const w1070 = 'LSASIT';
const n1071 = 'EXTR';
const r1072 = 'SETP';
const f1073 = 'GETP';
const b1074 = 'SUBLST';
const c1075 = 'UNIQ';
const q1349 = 'RORD';
const m1350 = 'SHFTLST';
const g1076 = 'REVLST';
const a1351 = 'BUKLST';
const k1077 = 'SORT';
const a1078 = 'CLMN';
const n1079 = 'CELL';
const j1080 = 'LIST';
const k1081 = 'COUNT';
const OBJECT_COUNT = 'OBJCOUNT';
const y1082 = 'LCONT';
const o1083 = 'SELECT';
const b1360 = 'LSTSEL';
const d1084 = 'IF';
const q1085 = 'LSTFLT';
const x1087 = 'ANY#';
const c1088 = [q1056, b1057, b1058, o1059, p1069, n1071, r1072, f1073, b1074, j1080, k1081, y1082, r1064];
const w1089 = [q1056, b1057, b1058, o1059];
const k1086 = 'ITER';
const k1108 = 'PROB';
const HOLD = 'HOLD';
const c1091 = 'NUM#';
const m1092 = 'NUM';
const s1355 = 'NPREC';
const h1093 = 'NSIGN';
const j1094 = 'ABS';
const a1356 = 'NEG';
const q1095 = 'ROUND';
const l1357 = 'QUANT';
const w1096 = 'SMINMAX';
const e1097 = 'MINMAX';
const u1098 = 'LIM';
const a1099 = 'NCURVE';
const c1358 = 'NMAP';
const d1359 = 'NBIAS';
const c1100 = 'NANISNUM';
const f1101 = 'CONST';
const o1102 = 'DATE';
const n1103 = 'SEQ';
const a1104 = 'RANGE';
const y1105 = 'WAVE';
const e1106 = 'RAND';
const g1107 = 'NOISE';
const w1109 = 'ACCUM';
const x1110 = 'LERP';
const g1111 = 'SOLVE';
const a1112 = 'NANIM';
const o1113 = 'SMATH';
const f1114 = 'MATH';
const c1115 = 'ADD';
const h1116 = 'SUB';
const m1117 = 'MUL';
const n1118 = 'DIV';
const b1119 = 'MOD';
const n1120 = 'EXP';
const s1121 = 'NBOOL';
const h1122 = 'NOT';
const h1123 = 'AND';
const r1124 = 'OR';
const u1125 = 'XOR';
const a1126 = 'COND';
const k1127 = 'EQ';
const w1128 = 'NE';
const k1129 = 'LT';
const g1130 = 'LE';
const b1131 = 'GT';
const q1132 = 'GE';
const a1133 = 'TRIG';
const k1134 = 'SIN';
const e1135 = 'COS';
const w1136 = 'TAN';
const l1137 = 'ATAN2';
const o1138 = 'CNVANG';
const y1090 = [n1060, f1061, b1062, ...c1088, w1070, n1071, r1072, f1073, b1074, c1075, q1349, m1350, g1076, a1351, a1078, k1077, n1079, j1080, o1083, b1360, d1084, q1085, q1063, r1064, k1086, k1108, HOLD, y1065, q1066, k1067, e1068, x1352, x1353, a1354];
const e1139 = [f1114, o1113, c1115, h1116, m1117, n1118, b1119, n1120];
const l1140 = [s1121, h1122, h1123, r1124, u1125];
const e1141 = [a1126, k1127, w1128, k1129, g1130, b1131, q1132];
const n1142 = [a1133, k1134, e1135, w1136, l1137];
const g1143 = 'TEXT#';
const y1144 = 'TEXT';
const r1145 = 'TLEN';
const b1146 = 'TTRIM';
const y1147 = 'TSUB';
const b1148 = 'TCONT';
const h1149 = 'TCASE';
const j1150 = 'TREPL';
const k1151 = 'TJOIN';
const r1152 = 'TPAD';
const s1153 = 'TCMP';
const m1154 = 'TCHAR';
const j1155 = 'TUNI';
const y1156 = 'INDEX';
const g1157 = 'N2T';
const w1158 = 'C2T';
const g1159 = 'T2N';
const x1160 = 'T2C';
const t1161 = 'TSPLT';
const v3505 = 'TJSON';
const z1163 = 'TCSV';
const p1164 = 'FETCH';
const w1165 = 'TFILE';
const q1166 = [c1091, b1057, m1092, s1355, h1093, j1094, a1356, q1095, l1357, w1096, e1097, u1098, a1099, c1358, d1359, c1100, f1101, o1102, n1103, a1104, y1105, e1106, g1107, w1109, x1110, g1111, a1112, g1157, m1154, ...e1139, ...l1140, ...e1141, ...n1142, o1138, a1351];
const a1167 = [g1143, b1058, y1144, r1145, b1146, y1147, b1148, h1149, k1151, r1152, j1150, s1153, j1155, y1156, g1159, x1160, t1161, v3505, z1163, p1164, w1165];
const d1168 = 'COL#';
const a1169 = 'COL';
const f1170 = 'CVAL';
const w1171 = 'CCOR';
const x1172 = 'COLP3';
const i1173 = 'CCNT';
const p1174 = 'BLND';
const j1175 = 'CLERP';
const f1176 = 'CBLND';
const a1177 = [d1168, a1169, w1171, x1172, p1174, j1175, f1176, w1158];
const i1178 = 'FILL#';
const z1179 = 'FILL';
const s1180 = [i1178, z1179];
const c1181 = 'STRK#';
const i1182 = 'STRK';
const p1183 = [c1181, i1182];
const g1190 = 'STRKSD#';
const q1191 = 'STRKSD';
const p1192 = [g1190, q1191];
const b1184 = 'CSTOP#';
const v1185 = 'CSTOP';
const k1186 = [b1184, v1185];
const x1187 = 'GRAD#';
const n1188 = 'GRAD';
const a1189 = [x1187, n1188];
const h1193 = 'RCRN#';
const h1194 = 'RCRN';
const s1195 = [h1193, h1194];
const u1196 = 'DRSH#';
const n1197 = 'DRSH';
const q1198 = [u1196, n1197];
const c1199 = 'INSH#';
const b1200 = 'INSH';
const b1201 = [c1199, b1200];
const u1202 = 'LBLR#';
const a1203 = 'LBLR';
const b1204 = [u1202, a1203];
const n1205 = 'BBLR#';
const m1206 = 'BBLR';
const j1207 = [n1205, m1206];
const d1208 = 'MASK#';
const c1209 = 'MASK';
const e1210 = [d1208, c1209];
const x1211 = 'BLEND#';
const x1212 = 'BLEND';
const w1213 = [x1211, x1212];
const o1214 = [...p1192, ...s1195, ...q1198, ...b1201, ...b1204, ...j1207, ...w1213, ...e1210];
const u1215 = [d1168, i1178, x1187, c1181, g1190, u1196, c1199, u1202, n1205, x1211, d1208];
const l1216 = 'CSTL';
const u1217 = 'SHP#';
const y1218 = 'RECT#';
const u1219 = 'RECT';
const l1220 = [y1218, u1219];
const t1221 = 'LINE#';
const m1222 = 'LINE';
const c1223 = [t1221, m1222];
const u1224 = 'ELPS#';
const p1225 = 'ELPS';
const h1226 = [u1224, p1225];
const q1227 = 'TRPZ#';
const b1228 = 'TRPZ';
const x1229 = [q1227, b1228];
const i1236 = 'POLY#';
const h1237 = 'POLY';
const o1238 = [i1236, h1237];
const o1239 = 'STAR#';
const j1240 = 'STAR';
const b1241 = [o1239, j1240];
const t1242 = 'TXTS#';
const k1243 = 'TXTS';
const w1244 = [t1242, k1243];
const i1245 = 'PT#';
const t1246 = 'PT';
const s1247 = [i1245, t1246];
const t1248 = 'PCORN';
const m1249 = 'VPATH#';
const g1250 = 'VPATH';
const a1251 = [m1249, g1250];
const p1252 = 'VPT#';
const w1253 = 'VPT';
const q1254 = [p1252, w1253];
const h1255 = 'VEDGE#';
const o1256 = 'VEDGE';
const r1257 = [h1255, o1256];
const g1258 = 'VREG#';
const m1259 = 'VREG';
const g1260 = [g1258, m1259];
const w1261 = 'VNET#';
const h1262 = 'VNET';
const g1263 = [w1261, h1262];
const n1264 = 'SGRP#';
const m1265 = 'SGRP';
const o1266 = [n1264, m1265];
const r1267 = 'FRM#';
const y1268 = 'FRM';
const w1269 = [r1267, y1268];
const r1231 = 'ARC#';
const o1230 = 'ARC';
const j1232 = [r1231, o1230];
const y1234 = 'WAVEP#';
const g1233 = 'WAVEP';
const r1235 = [y1234, g1233];
const m1270 = 'MOVE';
const d1271 = 'ROT';
const g1272 = 'SCALE';
const j1273 = 'SKEW';
const SHOW_CENTER = 'SHOWCNTR';
const k1274 = 'SCENTR';
const k1275 = 'RSTX';
const z1276 = 'PLACE';
const c1277 = 'APPLY';
const PATH_LENGTH = 'PTHLEN';
const JOIN_PATHS = 'JOINPTH';
const REORIENT_PATHS = 'REORPTH';
const q1284 = 'PTALPATH';
const o1285 = 'CPTONPATH';
const g1278 = 'MESPT';
const m1279 = 'PTANGLE';
const w1280 = 'VECLEN';
const o1281 = 'CIRCEN';
const ARC_FROM_POINTS = 'ARCPT';
const w1282 = 'INTLIN';
const o1283 = 'PTLERP';
const REVERSE_PATH = 'REVPTH';
const BLEND_PATH = 'BLENDPTH';
const PATH_TYPES = [g1250, b1228, o1230, g1233];
const PATH_VALUES = [m1249, q1227, r1231, y1234];
const c1286 = 'SBOOL';
const m1287 = 'SBOOL#';
const p1288 = 'SBOOLU';
const q1289 = 'SBOOLS';
const c1290 = 'SBOOLI';
const q1291 = 'SBOOLE';
const b1292 = [c1286, m1287, p1288, q1289, c1290, q1291];
const b1293 = 'RENDER';
const EXPORT = 'EXPORT';
const i1294 = [u1217, o1059, y1218, t1221, u1224, q1227, i1236, o1239, t1242, i1245, m1249, p1252, h1255, g1258, w1261, r1231, y1234, n1264, r1267, m1287, u1196, c1199, u1202, n1205, x1211, d1208];
const m1295 = [d1271, g1272, j1273];
const t1296 = [...i1294, ...l1220, ...c1223, ...h1226, ...x1229, ...o1238, ...b1241, ...w1244, ...s1247, t1248, ...a1251, ...q1254, ...r1257, ...g1260, ...g1263, ...j1232, ...r1235, ...o1266, ...w1269, ...b1292, m1270, ...m1295, SHOW_CENTER, k1274, k1275, z1276, c1277, PATH_LENGTH, JOIN_PATHS, REORIENT_PATHS, q1284, o1285, g1278, m1279, w1280, o1281, o1230, g1233, ARC_FROM_POINTS, w1282, o1283, REVERSE_PATH, BLEND_PATH, b1293, EXPORT];
const n1297 = [q1056, b1057, b1058, o1059, c1091, g1143, d1168, i1178, b1184, x1187, c1181, b1184, x1187, u1217, y1218, t1221, u1224, q1227, i1236, o1239, t1242, i1245, m1249, p1252, h1255, g1258, w1261, n1264, r1267, h1193, u1196, c1199, u1202, n1205, x1211, d1208];
const w1298 = 'GROUP';
const k1299 = 'GPARAM';
const u1300 = [w1298, k1299];
const c1301 = 'CMNT';
const t1302 = 'CMNTARR';
const w1303 = 'PANEL';
const z1304 = 'ACT';
const d1305 = 'BFACT';
const u1306 = 'BFLST';
const f1307 = 'DIS';
const l1308 = 'NOC';
const PARAM = 'PARAM';
const g1309 = 'LOG';
const i1310 = 'GRAPH';
const m1311 = [[b1119, '%'], [n1118, '/'], [h1116, '−'], [c1115, '+'], [m1117, '×'], [n1120, 'e<sup>x']];
const l1312 = [[n1118, '/'], [h1116, '−'], [c1115, '+'], [m1117, '×']];
const u1313 = 0;
const q1314 = 1;
const r1315 = 2;
const a1316 = 3;
const t1317 = [[u1313, 'not'], [q1314, 'xor'], [r1315, 'or'], [a1316, 'and']];
const p1318 = 0;
const z1319 = 1;
const k1320 = 2;
const b1321 = 3;
const b1322 = 4;
const i1323 = 5;
const u1324 = [[p1318, '<'], [z1319, '≤'], [k1320, '≠'], [b1321, '='], [b1322, '≥'], [i1323, '>']];
const v1325 = 0;
const b1326 = 1;
const e1327 = 2;
const b1328 = 3;
const y1329 = 4;
const r1330 = 5;
const m1331 = [[v1325, 'sin'], [b1326, 'cos'], [e1327, 'tan'], [b1328, 'asin'], [y1329, 'acos'], [r1330, 'atan']];
const f1332 = 'EMPTY';
const v1333 = 'CONNECT';
const r1334 = 'CREATE';
const u1335 = 'CREATE_INSERT';
const u1336 = 'DELETE';
const z1337 = 'DISCONNECT';
const p1338 = 'LINK_STYLE';
const m1339 = 'LINK_VARIABLE';
const u1340 = 'LINK_VARIABLE_GROUP';
const w1341 = 'MAKE_ACTIVE';
const MAKE_NOT_CONDITION_ACTION = 'MAKE_NOT_CONDITION';
const a1342 = 'MAKE_PASSIVE';
const j1343 = 'PASTE';
const i1344 = 'RECONNECT';
const q1345 = 'REMOVE';
const f1346 = 'RENAME';
const h1347 = 'REORDER_INPUTS';
const l1348 = 'REORDER_CONNECTIONS';
const p1361 = 'SELECT';
const e1362 = 'SELECT_MOVE';
const n1363 = 'MOVE_NODES';
const o1364 = 'SET_PARAM_VALUE';
const SET_MULTIPLE_VALUES_ACTION = 'SET_MULTIPLE_VALUES';
const w1365 = 'SET_PARAM_SETTING';
const g1366 = 'SET_NODE_RECT';
const p1367 = 'TOGGLE_DISABLE';
const c1368 = 'TOGGLE_PARAM_HEADER';
const v1369 = 'SET_CURRENT_GRAPH';
const w1370 = 'CREATE_PAGE';
const a1371 = 'DELETE_PAGE';
const d1372 = 'GROUP_NODES';
const d1373 = 'UNGROUP_NODES';
const e1374 = 'HIGHLIGHT_NODES';
const SCROLL_LIST_NODE_ACTION = 'SCROLL_LIST_NODE';
const SET_LIST_DIVIDER_ACTION = 'SET_LIST_DIVIDER';
const SET_NODE_PARAM_ACTION = 'SET_NODE_PARAM';
const n1375 = 'BNORM';
const a1376 = 'BDARK';
const s1377 = 'BMULT';
const a1378 = 'BPDRK';
const d1379 = 'BBURN';
const q1380 = 'BLITE';
const u1381 = 'BSCRN';
const s1382 = 'BPLGT';
const k1383 = 'BDODG';
const l1384 = 'BOVER';
const r1385 = 'BSOFT';
const o1386 = 'BHARD';
const h1387 = 'BDIFF';
const v1388 = 'BEXCL';
const z1389 = 'BHUE';
const t1390 = 'BSAT';
const j1391 = 'BCOL';
const w1392 = 'BLUM';
const l1393 = [[n1375, 'normal', 'NORMAL'], [a1376, 'darken', 'DARKEN'], [s1377, 'multiply', 'MULTIPLY'], [a1378, 'plus darker', 'LINEAR_BURN'], [d1379, 'color burn', 'COLOR_BURN'], [q1380, 'lighten', 'LIGHTEN'], [u1381, 'screen', 'SCREEN'], [s1382, 'plus lighter', 'LINEAR_DODGE'], [k1383, 'color dodge', 'COLOR_DODGE'], [l1384, 'overlay', 'OVERLAY'], [r1385, 'soft light', 'SOFT_LIGHT'], [o1386, 'hard light', 'HARD_LIGHT'], [h1387, 'difference', 'DIFFERENCE'], [v1388, 'exclusion', 'EXCLUSION'], [z1389, 'hue', 'HUE'], [t1390, 'saturation', 'SATURATION'], [j1391, 'color', 'COLOR'], [w1392, 'luminosity', 'LUMINOSITY']];
const k1394 = [['thin', 100], ['extra light', 200], ['light', 300], ['regular', 400], ['medium', 500], ['semi bold', 600], ['bold', 700], ['extra bold', 800], ['black', 900]];
const e1395 = 0;
const r1396 = 1;
const n1397 = 2;
const u1398 = 2;
const l1399 = 3;
const j1400 = 3;
const q1401 = 4;
const f1402 = 4;
const p1403 = 5;
const t1404 = 6;
const l1405 = 7;
const w1406 = 8;
const u1407 = 9;
const t1408 = 10;
const m1409 = 11;
const r1410 = 12;
const h1411 = 13;
const l1412 = 14;
const z1413 = 15;
const n1414 = 16;
const h1415 = 17;
const x1416 = 18;
const t1417 = 19;
const b1418 = 20;
const x1419 = 21;
const h1420 = 22;
const z1421 = 23;
const u1422 = 24;
const w1453 = 24;
const c1423 = 24;
const c1424 = 25;
const d1454 = 25;
const n1425 = 26;
const d1426 = 27;
const s1427 = 28;
const s1428 = 28;
const z1429 = 28;
const v1430 = 28;
const n1431 = 28;
const y1432 = 28;
const o1433 = 28;
const t1434 = 28;
const a1435 = 29;
const p1436 = 29;
const c1437 = 29;
const r1438 = 29;
const z1439 = 29;
const k1455 = 29;
const u1441 = 30;
const o1442 = 30;
const i1443 = 30;
const h1444 = 30;
const v1440 = 30;
const l1445 = 31;
const x1446 = 31;
const x1447 = 32;
const y1448 = 33;
const d1449 = 34;
const h1450 = 35;
const y1451 = 36;
const l1452 = 37;
const i2797 = '12345679ABCDEFGHJKLMNPQRSTUVWXYZ';
function s847(array, chars = i2797) { let h849 = ''; let len = array.length; let i = 0; while (len > 0) {
    if (len >= 5) {
        const a0 = array[i], a1 = array[i + 1], a2 = array[i + 2], a3 = array[i + 3], a4 = array[i + 4];
        h849 += chars[(a0 & 0xF8) >>> 3];
        h849 += chars[((a0 & 0x07) << 2) | ((a1 & 0xC0) >>> 6)];
        h849 += chars[(a1 & 0x3E) >>> 1];
        h849 += chars[((a1 & 0x01) << 4) | ((a2 & 0xF0) >>> 4)];
        h849 += chars[((a2 & 0x0F) << 1) | ((a3 & 0x80) >>> 7)];
        h849 += chars[(a3 & 0x7C) >>> 2];
        h849 += chars[((a3 & 0x03) << 3) | ((a4 & 0xE0) >>> 5)];
        h849 += chars[(a4 & 0x1F)];
    }
    else if (len == 4) {
        const a0 = array[i], a1 = array[i + 1], a2 = array[i + 2], a3 = array[i + 3];
        h849 += chars[(a0 & 0xF8) >>> 3];
        h849 += chars[((a0 & 0x07) << 2) | ((a1 & 0xC0) >>> 6)];
        h849 += chars[(a1 & 0x3E) >>> 1];
        h849 += chars[((a1 & 0x01) << 4) | ((a2 & 0xF0) >>> 4)];
        h849 += chars[((a2 & 0x0F) << 1) | ((a3 & 0x80) >>> 7)];
        h849 += chars[(a3 & 0x7C) >>> 2];
        h849 += chars[((a3 & 0x03) << 3)];
    }
    else if (len == 3) {
        const a0 = array[i], a1 = array[i + 1], a2 = array[i + 2];
        h849 += chars[(a0 & 0xF8) >>> 3];
        h849 += chars[((a0 & 0x07) << 2) | ((a1 & 0xC0) >>> 6)];
        h849 += chars[(a1 & 0x3E) >>> 1];
        h849 += chars[((a1 & 0x01) << 4) | ((a2 & 0xF0) >>> 4)];
        h849 += chars[((a2 & 0x0F) << 1)];
    }
    else if (len == 2) {
        const a0 = array[i], a1 = array[i + 1];
        h849 += chars[(a0 & 0xF8) >>> 3];
        h849 += chars[((a0 & 0x07) << 2) | ((a1 & 0xC0) >>> 6)];
        h849 += chars[(a1 & 0x3E) >>> 1];
        h849 += chars[((a1 & 0x01) << 4)];
    }
    else if (len == 1) {
        const a0 = array[i];
        h849 += chars[(a0 & 0xF8) >>> 3];
        h849 += chars[((a0 & 0x07) << 2)];
    }
    i += 5;
    len -= 5;
} return h849; }
function v848(h849, chars = i2797) { const array = []; let len = h849.length; let c = 0; while (len > 0) {
    if (len >= 8) {
        const c0 = chars.indexOf(h849[c]), c1 = chars.indexOf(h849[c + 1]), c2 = chars.indexOf(h849[c + 2]), c3 = chars.indexOf(h849[c + 3]), c4 = chars.indexOf(h849[c + 4]), c5 = chars.indexOf(h849[c + 5]), c6 = chars.indexOf(h849[c + 6]), c7 = chars.indexOf(h849[c + 7]);
        array.push((c0 << 3) | ((c1 & 0x1C) >>> 2));
        array.push(((c1 & 0x03) << 6) | (c2 << 1) | ((c3 & 0x10) >>> 4));
        array.push(((c3 & 0x0F) << 4) | ((c4 & 0x1E) >>> 1));
        array.push(((c4 & 0x01) << 7) | (c5 << 2) | ((c6 & 0x18) >>> 3));
        array.push(((c6 & 0x07) << 5) | c7);
    }
    else if (len == 7) {
        const c0 = chars.indexOf(h849[c]), c1 = chars.indexOf(h849[c + 1]), c2 = chars.indexOf(h849[c + 2]), c3 = chars.indexOf(h849[c + 3]), c4 = chars.indexOf(h849[c + 4]), c5 = chars.indexOf(h849[c + 5]), c6 = chars.indexOf(h849[c + 6]);
        array.push((c0 << 3) | ((c1 & 0x1C) >>> 2));
        array.push(((c1 & 0x03) << 6) | (c2 << 1) | ((c3 & 0x10) >>> 4));
        array.push(((c3 & 0x0F) << 4) | ((c4 & 0x1E) >>> 1));
        array.push(((c4 & 0x01) << 7) | (c5 << 2) | ((c6 & 0x18) >>> 3));
    }
    else if (len == 5) {
        const c0 = chars.indexOf(h849[c]), c1 = chars.indexOf(h849[c + 1]), c2 = chars.indexOf(h849[c + 2]), c3 = chars.indexOf(h849[c + 3]), c4 = chars.indexOf(h849[c + 4]);
        array.push((c0 << 3) | ((c1 & 0x1C) >>> 2));
        array.push(((c1 & 0x03) << 6) | (c2 << 1) | ((c3 & 0x10) >>> 4));
        array.push(((c3 & 0x0F) << 4) | ((c4 & 0x1E) >>> 1));
    }
    else if (len == 4) {
        const c0 = chars.indexOf(h849[c]), c1 = chars.indexOf(h849[c + 1]), c2 = chars.indexOf(h849[c + 2]), c3 = chars.indexOf(h849[c + 3]);
        array.push((c0 << 3) | ((c1 & 0x1C) >>> 2));
        array.push(((c1 & 0x03) << 6) | (c2 << 1) | ((c3 & 0x10) >>> 4));
    }
    else if (len == 2) {
        const c0 = chars.indexOf(h849[c]), c1 = chars.indexOf(h849[c + 1]);
        array.push((c0 << 3) | ((c1 & 0x1C) >>> 2));
    }
    c += 8;
    len -= 8;
} return array; }
function logSavedNode(nodeKey, p4007) {
    return __awaiter(this, void 0, void 0, function* () { const log = t2120(yield v1564(nodeKey, false)); if (p4007) {
        console.log('%c%s\n%c%s', 'background: #fa24; color: white;', z1054(nodeKey), 'background: #fa44; color: #edc;', log);
    }
    else {
        console.log('%c%s\n%c%s', 'background: #fdb; color: black;', z1054(nodeKey), 'background: #fed; color: black;', log);
    } });
}
function t2120(json) { let c4033 = json.replace('{\n', '').replace('\n}', '').replace('[\n' + z870, '').replace('\n' + z870 + ']', '').split(z870 + '"params":\n').join('').split('": "').join(': ').split('", "').join(': ').split(z870 + '"').join(z870).split(z870 + z870 + '["').join(z870 + z870).split('",\n').join('\n').split('"\n').join('\n').split('"],\n').join('\n'); if (c4033[c4033.length - 1] == '"')
    c4033 = c4033.substring(0, c4033.length - 1); if (c4033.substring(c4033.length - 2) == '"]')
    c4033 = c4033.substring(0, c4033.length - 2); return c4033; }
function t2121(json) { let c4033 = json.replace('{\n', '').replace('\n}', '').replace('[\n' + z870, '').replace('\n' + z870 + ']', ''); return c4033; }
function u2122(h243, p4007) { const d4211 = s924(h243, true); if (p4007) {
    console.log('%c%s', 'background: #4f44; color: #ded', d4211);
}
else {
    console.log('%c%s', 'background: #cfc; color: black;', d4211);
} }
console.clear();
figma.payments.setPaymentStatusInDevelopment({ type: 'PAID' });
figma.loadAllPagesAsync().then(() => { figma.on('documentchange', p1535); figma.on('selectionchange', u1543); figma.on('close', o1536); });
f1525(true);
figma.clientStorage.getAsync('pro').then(data => { figma.showUI(__html__, { visible: false, themeColors: true, title: 'Generator' + (data !== true ? ' (Free version)' : '') }); });
var w2709 = figma.viewport.zoom;
setInterval(b1540, 100);
var strBackgrounds = '';
setInterval(figCheckBackgrounds, 500);
const o2798 = 'clock_';
const k2799 = 1000;
var r2800 = false;
var objectCenterSize = 15;
function h1537() { (function () {
    return __awaiter(this, void 0, void 0, function* () { figma.currentPage.loadAsync().then(() => __awaiter(this, void 0, void 0, function* () { let e2801 = yield figma.currentPage.getPluginData(figma.currentUser.id + ',windowWidth'); let j2802 = yield figma.currentPage.getPluginData(figma.currentUser.id + ',windowHeight'); let x2803; let u2804; if (e2801 === NULL) {
        x2803 = 800;
        figma.currentPage.setPluginData(figma.currentUser.id + ',windowWidth', e2801.toString());
    }
    else
        x2803 = parseInt(e2801); if (j2802 === NULL) {
        u2804 = 600;
        figma.currentPage.setPluginData(figma.currentUser.id + ',windowHeight', j2802.toString());
    }
    else
        u2804 = parseInt(j2802); figma.ui.resize(Math.max(minWindowWidth, x2803), Math.max(minWindowHeight, u2804)); figma.ui.show(); const fonts = yield figma.listAvailableFontsAsync(); const eula = (yield figma.clientStorage.getAsync('eula')) === 'true'; const tutorials = (yield figma.clientStorage.getAsync('tutorials')) === 'true'; const isLocked = yield g1542(); j1544({ cmd: 'uiReturnFigStartGenerator', currentUser: figma.currentUser, viewportRect: figma.viewport.bounds, viewportZoom: figma.viewport.zoom, fonts: fonts, eula: eula, tutorials: tutorials, isLocked: isLocked, windowWidth: x2803, windowHeight: u2804 }); })); });
})(); }
function d1538() { f1525(); figma.showUI(__html__, { visible: false, themeColors: true }); }
function g1539() { setInterval(s1541, k2799); }
function b1540() { if (figma.viewport.zoom == w2709)
    return; w2709 = figma.viewport.zoom; s2697(); d1558(); f1560(); }
function figCheckBackgrounds() { if (strBackgrounds != JSON.stringify(figma.currentPage.backgrounds)) {
    d1558();
    strBackgrounds = JSON.stringify(figma.currentPage.backgrounds);
} }
function s1541() { j1565(o2798 + figma.currentUser.sessionId.toString(), Date.now().toString()); }
function g1542() {
    return __awaiter(this, void 0, void 0, function* () { yield figma.currentPage.loadAsync(); const clocks = figma.currentPage.getPluginDataKeys().filter(k => k.length > o2798.length && k.substring(0, o2798.length) == o2798 && k.substring(o2798.length) != figma.currentUser.sessionId.toString()).map((k) => __awaiter(this, void 0, void 0, function* () { return parseInt(yield v1564(k)); })); clocks.sort(); const now = Date.now(); const locked = clocks.length > 0 && now - (yield clocks[clocks.length - 1]) < k2799 * 2; return locked; });
}
function u1543() { s2697(); }
var p2730 = new Array();
var c2732 = new Array();
function figGetObjectsFromIds(objectIds) {
    return __awaiter(this, void 0, void 0, function* () { for (let i = e2766.length - 1; i >= 0; i--)
        if (!e2766[i].removed && objectIds.includes(e2766[i].getPluginData('objectId')))
            e2766.splice(i, 1); for (let i = a2782.length - 1; i >= 0; i--)
        if (a2782[i].removed || objectIds.includes(a2782[i].getPluginData('objectId')))
            a2782.splice(i, 1); yield figma.currentPage.loadAsync(); return figma.currentPage.findAll(o => objectIds.includes(o.getPluginData('objectId'))); });
}
function i1524(nodeIds) {
    return __awaiter(this, void 0, void 0, function* () { for (let i = e2766.length - 1; i >= 0; i--)
        if (!e2766[i].removed && nodeIds.includes(e2766[i].getPluginData('nodeId')))
            e2766.splice(i, 1); for (let i = a2782.length - 1; i >= 0; i--)
        if (a2782[i].removed || nodeIds.includes(a2782[i].getPluginData('nodeId')))
            a2782.splice(i, 1); yield figma.currentPage.loadAsync(); figma.currentPage.findAll(o => nodeIds.includes(o.getPluginData('nodeId'))).forEach(o => { if (!o.removed)
        o.remove(); }); p2730 = p2730.filter(a => !nodeIds.includes(a.nodeId)); });
}
function f1525(g1526 = false) { for (const p1531 of figma.currentPage.children) {
    if (p1531.removed)
        continue;
    if (p1531.getPluginData('objectId') != '' && p1531.getPluginData('userId') == figma.currentUser.id && (parseInt(p1531.getPluginData('retain')) == 0 || g1526))
        p1531.remove();
} }
function r1527(nodeIds, k1528) { for (let i = p2730.length - 1; i >= 0; i--) {
    const y2731 = p2730[i];
    if (!nodeIds.includes(y2731.nodeId))
        continue;
    for (let j = y2731.objects.length - 1; j >= 0; j--) {
        const p1531 = y2731.objects[j];
        if (p1531.removed || !k1529(p1531, k1528)) {
            if (!p1531.removed)
                p1531.remove();
            j943(y2731.objects, p1531);
            if (e2766.includes(p1531))
                j943(e2766, p1531);
            if (a2782.includes(p1531))
                j943(a2782, p1531);
        }
        if (!p1531.removed) {
            if (parseInt(p1531.getPluginData('retain')) == 2)
                g1550(p1531);
        }
    }
    if (isEmpty(y2731.objects))
        j943(p2730, y2731);
} }
function k1529(p1531, k1528) { if (p1531.type == m1265 || p1531.type == y1268) {
    for (const child of p1531.children) {
        const found = k1529(child, k1528);
        if (found)
            return found;
    }
}
else {
    const found = k1528.find(o => p1531.getPluginData('objectId') == o[n1397] && p1531.getPluginData('userId') == figma.currentUser.id || o[p1403] == 2 && o[p1403] == p1531.getPluginData('retain'));
    if (found)
        return found;
} return null; }
function t1532(nodeIds, r1533) { figma.getLocalPaintStylesAsync().then(paintStyles => { paintStyles.filter(s => nodeIds.includes(s.getPluginData('nodeId'))).forEach(s => { const nodeId = s.getPluginData('nodeId'); const existing = m923(s.getPluginData('existing')); if (!existing) {
    s.remove();
}
else if (r1533) {
    k945(c2732, a => a.nodeId == nodeId);
    s.setPluginData('type', NULL);
    s.setPluginData('nodeId', NULL);
    s.setPluginData('existing', NULL);
} }); }); if (r1533)
    c2732 = c2732.filter(a => !nodeIds.includes(a.nodeId)); }
var o1534 = false;
function p1535(e) { for (const change of e.documentChanges) {
    switch (change.type) {
        case 'STYLE_CREATE':
            if (!change.style)
                break;
            if (!o1534) {
                change.style.setPluginData('type', NULL);
                change.style.setPluginData('nodeId', NULL);
                change.style.setPluginData('existing', NULL);
            }
            break;
        case 'STYLE_PROPERTY_CHANGE': {
            if (!change.style)
                break;
            if (!o1534) {
                const msg = { cmd: 'uiStylePropertyChange', styleId: y946(change.id), properties: change.properties, name: '', paints: [] };
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
                j1544(msg);
            }
            break;
        }
        case 'STYLE_DELETE':
            j1544({ cmd: 'uiStyleDelete', styleId: change.id });
            break;
    }
} o1534 = false; }
function o1536() { f1525(); j1544({ cmd: 'updateMetrics' }); }
figma.ui.onmessage = function (msg) { msg = JSON.parse(msg); if (msg.cmd == 'returnUiGetValueForFigma')
    return; switch (msg.cmd) {
    case 'figStartGenerator':
        h1537();
        break;
    case 'figRestartGenerator':
        d1538();
        break;
    case 'figFinishStart':
        g1539();
        break;
    case 'figDockWindowNormal':
        z2739('normal');
        break;
    case 'figDockWindowMaximize':
        z2739('maximize');
        break;
    case 'figDockWindowTop':
        z2739('top');
        break;
    case 'figDockWindowLeft':
        z2739('left');
        break;
    case 'figDockWindowRight':
        z2739('right');
        break;
    case 'figDockWindowBottom':
        z2739('bottom');
        break;
    case 'figGetMousePosition':
        t1610(msg.clientPosition);
        break;
    case 'figResizeWindow':
        p1613(msg.width, msg.height);
        break;
    case 'figSetWindowRect':
        v1611(msg.x, msg.y, msg.width, msg.height);
        break;
    case 'figNotify':
        g1614(msg);
        break;
    case 'figGetLocalData':
        y1562(msg.key);
        break;
    case 'figSetLocalData':
        j1563(msg.key, msg.value);
        break;
    case 'figClearAllLocalData':
        y4028();
        break;
    case 'figGetPageData':
        v1564(msg.key);
        break;
    case 'figSetPageData':
        j1565(msg.key, msg.value);
        break;
    case 'figSavePages':
        n1570(msg.pageIds, msg.pageJson, msg.currentPageId);
        break;
    case 'figLoadNodesAndConns':
        q1567(msg.debugMode);
        break;
    case 'figSaveNodes':
        c1571(msg.nodeIds, msg.nodeJson);
        break;
    case 'figGetAllLocalTemplateNames':
        z2736();
        break;
    case 'figSaveLocalTemplate':
        j1572(msg.z4029, msg.template);
        break;
    case 'figRemoveConnsToNodes':
        t1573(msg.nodeIds);
        break;
    case 'figRemoveSavedNodesAndConns':
        r1574(msg.nodeIds);
        break;
    case 'figRemoveAllSavedNodesAndConns':
        i1575();
        break;
    case 'figLogAllSavedNodesAndConns':
        b1576(msg.p4007);
        break;
    case 'figLogAllSavedNodes':
        s1577(msg.p4007);
        break;
    case 'figLogAllSavedConns':
        n1578(msg.p4007);
        break;
    case 'figLogAllSavedPageKeys':
        n1579(msg.p4007);
        break;
    case 'figLogAllSavedPages':
        z1580(msg.p4007);
        break;
    case 'figLogAllSavedConnKeys':
        o1581(msg.p4007);
        break;
    case 'figLogAllLocalData':
        w1582(msg.p4007);
        break;
    case 'figGetValue':
        v1583(msg.key, msg.spec);
        break;
    case 'figRemoveSavedPage':
        p1585(msg.pageId);
        break;
    case 'figRemoveAllSavedPages':
        v1586();
        break;
    case 'figSaveConnection':
        v1587(msg.key, msg.json);
        break;
    case 'figSaveConnections':
        o1588(msg.keys, msg.json);
        break;
    case 'figUpdateSavedConnections':
        t1589(msg.curKeys, msg.newKeys, msg.json);
        break;
    case 'figDeleteSavedConnection':
        b1590(msg.key);
        break;
    case 'figRemoveAllSavedConnections':
        u1591();
        break;
    case 'figDeleteSavedConnectionsToNode':
        e1592(msg.nodeId);
        break;
    case 'figDeleteSavedConnectionsFromNode':
        x1593(msg.nodeId);
        break;
    case 'figRemovePluginDataFromAllLocalStyles':
        b1594();
        break;
    case 'figGetAllLocalVariables':
        f1618(msg.nodeId, msg.px, msg.py);
        break;
    case 'figLinkNodeToVariable':
        o1620(msg.nodeId, msg.variableId);
        break;
    case 'figUpdateVariable':
        figUpdateVariableAsync(msg.variableId, msg.value);
        break;
    case 'figGetAllLocalColorStyles':
        w1595(msg.nodeId, msg.px, msg.py);
        break;
    case 'figLinkNodeToExistingColorStyle':
        u1596(msg.nodeId, msg.styleId);
        break;
    case 'figExport':
        figExport(msg.objectIds, msg.scale, msg.format, msg.suffix);
        break;
    case 'figGetObjectSize':
        p1549(msg.object);
        break;
    case 'figGetVariableUpdates':
        e1584(msg.linkedVarIds);
        break;
    case 'figUpdateShowIds':
        r2800 = msg.r2800;
        break;
    case 'figUpdateObjectCenterSize':
        objectCenterSize = msg.objectCenterSize;
        break;
    case 'figDeleteAllObjects':
        f1525();
        break;
    case 'figUpdateObjectsAndStyles':
        w2745 = 0;
        i2746 = 0;
        msg.objects.forEach(o => o.counted = false);
        v2733(null, msg.objects, msg.m4021, msg.j2068, msg.nodeIds, msg.h2762, msg.s2763, msg.k270);
        p1601(msg);
        break;
    case 'figDeleteObjectsAndStyles':
        i1524(msg.nodeIds);
        t1532(msg.nodeIds, msg.r1533);
        break;
    case 'figDeleteObjectsExcept':
        r1527(msg.nodeIds, msg.ignoreObjects);
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
} j1544({ cmd: 'uiEndFigMessage', msgCmd: msg.cmd }); };
function j1544(msg) { figma.ui.postMessage(JSON.stringify(msg)); }
function g2734(key) {
    return __awaiter(this, void 0, void 0, function* () { return yield figma.clientStorage.getAsync(key); });
}
function y1562(key) { figma.currentPage.loadAsync().then(() => { if (key == 'canvasEmpty') {
    j1544({ cmd: 'uiReturnFigGetLocalData', key: key, value: figma.currentPage.children.length == 0 });
}
else if (key == 'debugWarningCrash') {
    figma.clientStorage.getAsync('debugWarning').then(data => { j1544({ cmd: 'uiReturnFigGetLocalData', key: key, value: data }); });
}
else {
    figma.clientStorage.getAsync(key).then(data => { j1544({ cmd: 'uiReturnFigGetLocalData', key: key, value: data }); });
} }); }
function j1563(key, value, postToUi = true) { figma.clientStorage.setAsync(key, value); if (postToUi) {
    j1544({ cmd: 'uiReturnFigSetLocalData', key: key, value: value });
} }
function y4028() {
    return __awaiter(this, void 0, void 0, function* () { const keys = yield figma.clientStorage.keysAsync(); for (const key of keys)
        figma.clientStorage.deleteAsync(key); });
}
function v1564(key, postToUi = true) {
    return __awaiter(this, void 0, void 0, function* () { yield figma.currentPage.loadAsync(); const data = figma.currentPage.getPluginData(key); if (postToUi) {
        j1544({ cmd: 'uiReturnFigGetPageData', key: key, value: data });
    } return data; });
}
function j1565(key, value) { q1566(key); figma.currentPage.setPluginData(key, value); }
function q1566(key) { figma.currentPage.setPluginData(key, ''); }
function q1567(debugMode) { figma.currentPage.loadAsync().then(() => { const pageKeys = figma.currentPage.getPluginDataKeys().filter(k => l1050(k)); const nodeKeys = figma.currentPage.getPluginDataKeys().filter(k => v1051(k)); const connKeys = figma.currentPage.getPluginDataKeys().filter(k => m1052(k)); if (!debugMode)
    a1569(nodeKeys, connKeys); const pages = pageKeys.map(k => figma.currentPage.getPluginData(k)); const nodes = nodeKeys.map(k => figma.currentPage.getPluginData(k)); const w2139 = connKeys.map(k => figma.currentPage.getPluginData(k)); const pageOrder = figma.currentPage.getPluginData('pageOrder').split(','); const currentPageId = figma.currentPage.getPluginData('currentPageId'); i1568(nodes); const showAllColorSpaces = figma.currentPage.getPluginData('showAllColorSpaces'); j1544({ cmd: 'uiReturnFigLoadNodesAndConns', showAllColorSpaces: showAllColorSpaces, pageKeys: pageKeys, pageJson: pages, pageOrder: pageOrder, currentPageId: currentPageId, nodeKeys: nodeKeys, nodeJson: nodes, connKeys: connKeys, connJson: w2139 }); }); }
function i1568(nodes) { c2732 = []; figma.getLocalPaintStylesAsync().then(paintStyles => { for (const w3020 of nodes) {
    const node = JSON.parse(w3020);
    if (node.type == l1216) {
        const style = paintStyles.find(s => { const nodeId = s.getPluginData('nodeId'); return nodeId == node.id; });
        if (style) {
            c2732.push({ nodeId: node.id, existing: m923(node.existing), styles: [style] });
        }
    }
} }); }
function a1569(nodeKeys, connKeys) { figma.currentPage.loadAsync().then(() => { const v2735 = '"loading": "true"'; const not = '{\n'; const set = '{\n' + z870 + v2735 + ',\n'; nodeKeys.forEach(k => figma.currentPage.setPluginData(k, figma.currentPage.getPluginData(k).replace(set, not).replace(not, set))); connKeys.forEach(k => figma.currentPage.setPluginData(k, figma.currentPage.getPluginData(k).replace(set, not).replace(not, set))); }); }
function n1570(pageIds, pageJson, currentPageId) { for (let i = 0; i < pageIds.length; i++) {
    j1565(d922(pageIds[i]), pageJson[i]);
} j1565('pageOrder', pageIds.join(',')); j1565('currentPageId', currentPageId); }
function c1571(nodeIds, nodeJson) { for (let i = 0; i < nodeIds.length; i++) {
    j1565(b920(nodeIds[i]), nodeJson[i]);
} }
function z2736() {
    return __awaiter(this, void 0, void 0, function* () { let keys = yield figma.clientStorage.keysAsync(); keys = keys.filter(k => k.length >= q878.length && k.substring(0, q878.length) == q878); j1544({ cmd: 'uiReturnGetAllLocalTemplateNames', templateNames: keys }); });
}
function j1572(z4029, template) { j1563(q878 + ' ' + z4029, template); }
function t1573(nodeIds) { figma.currentPage.loadAsync().then(() => { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => m1052(k)); for (const key of connKeys) {
    const parts = e1055(key).split(' ');
    if (nodeIds.includes(parts[0]) || nodeIds.includes(parts[2]))
        q1566(key);
} }); }
function r1574(nodeIds) { figma.currentPage.loadAsync().then(() => { t1573(nodeIds); const nodeKeys = figma.currentPage.getPluginDataKeys().filter(k => v1051(k) && nodeIds.includes(z1054(k))); nodeKeys.forEach(k => q1566(k)); }); }
function i1575() { figma.currentPage.loadAsync().then(() => { const nodeKeys = figma.currentPage.getPluginDataKeys().filter(k => v1051(k)); const connKeys = figma.currentPage.getPluginDataKeys().filter(k => m1052(k)); for (const key of nodeKeys)
    q1566(key); for (const key of connKeys)
    q1566(key); }); }
function b1576(p4007) {
    return __awaiter(this, void 0, void 0, function* () { yield s1577(p4007); n1578(p4007); });
}
function s1577(p4007) {
    return __awaiter(this, void 0, void 0, function* () { yield figma.currentPage.loadAsync(); figma.currentPage.getPluginDataKeys().filter(k => v1051(k)).forEach((k) => __awaiter(this, void 0, void 0, function* () { return yield logSavedNode(k, p4007); })); });
}
function n1578(p4007) { figma.currentPage.loadAsync().then(() => { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => m1052(k)); connKeys.sort((key1, key2) => { const p1 = e1055(key1).split(' '); const p2 = e1055(key2).split(' '); if (p1[2] != p2[2])
    return p1[2] < p2[2] ? -1 : 1; if (p1[3] != p2[3])
    return parseInt(p1[3]) - parseInt(p2[3]); if (p1[2] == p2[0])
    return -1; if (p2[2] == p1[0])
    return 1; return 0; }); connKeys.forEach(k => u2122(JSON.parse(figma.currentPage.getPluginData(k)), p4007)); }); }
function n1579(p4007) { figma.currentPage.loadAsync().then(() => { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => l1050(k)); connKeys.forEach(k => console.log('%c' + k, 'background: #fff; color: ' + (p4007 ? 'black' : 'white'))); const pageOrder = figma.currentPage.getPluginData('pageOrder'); console.log('%c' + pageOrder, 'background: #fff; color: ' + (p4007 ? 'black' : 'white')); }); }
function z1580(p4007) { figma.currentPage.loadAsync().then(() => { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => l1050(k)); connKeys.forEach(k => console.log('%c' + figma.currentPage.getPluginData(k), 'background: #fff; color: ' + (p4007 ? 'black' : 'white'))); const pageOrder = figma.currentPage.getPluginData('pageOrder'); console.log('%c' + pageOrder, 'background: #fff; color: ' + (p4007 ? 'black' : 'white')); }); }
function o1581(p4007) { figma.currentPage.loadAsync().then(() => { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => m1052(k)); connKeys.forEach(k => console.log('%c' + k, 'background: #dff; color: ' + (p4007 ? 'black' : 'white'))); }); }
function w1582(p4007) { figma.clientStorage.keysAsync().then(keys => keys.forEach(k => figma.clientStorage.getAsync(k).then(val => console.log(k + ': ' + val)))); }
function v1583(key, spec) {
    return __awaiter(this, void 0, void 0, function* () { let result = null; switch (key) {
        case 'getVariableData':
            result = yield f1619(spec);
            break;
        case 'getPaidStatus':
            result = figma.payments.status.type;
            break;
        case 'figSubscribe': {
            yield figma.payments.initiateCheckoutAsync({ interstitial: 'PAID_FEATURE' });
            result = figma.payments.status.type;
            break;
        }
    } j1544({ cmd: 'returnFigGetValue', value: result }); });
}
function e1584(varIds) { f1619(varIds).then(values => { j1544({ cmd: 'uiReturnFigGetVariableUpdates', values: values }); }); }
function p1585(pageId) {
    return __awaiter(this, void 0, void 0, function* () { q1566(j932(pageId)); const pageOrder = (yield v1564('pageOrder')).split(','); k945(pageOrder, id => id == pageId); j1565('pageOrder', pageOrder.join(',')); });
}
function v1586() { figma.currentPage.loadAsync().then(() => { const pageKeys = figma.currentPage.getPluginDataKeys().filter(k => l1050(k)); pageKeys.forEach(k => q1566(k)); q1566('pageOrder'); }); }
function v1587(key, json) { j1565(key, json); }
function o1588(_keys, _json) { const keys = JSON.parse(_keys); const json = JSON.parse(_json); for (let i = 0; i < keys.length; i++)
    j1565(keys[i], json[i]); }
function t1589(_curKeys, _newKeys, _json) { const curKeys = JSON.parse(_curKeys); const newKeys = JSON.parse(_newKeys); const json = JSON.parse(_json); for (let i = 0; i < curKeys.length; i++) {
    q1566(curKeys[i]);
    j1565(newKeys[i], json[i]);
} }
function b1590(key) { q1566(key); }
function u1591() { figma.currentPage.loadAsync().then(() => { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => m1052(k)); connKeys.forEach(k => q1566(k)); }); }
function e1592(nodeId) { figma.currentPage.loadAsync().then(() => { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => m1052(k)); for (const key of connKeys) {
    const parts = key.split(' ');
    if (parts[4] == nodeId)
        q1566(key);
} }); }
function x1593(nodeId) { figma.currentPage.loadAsync().then(() => { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => m1052(k)); for (const key of connKeys) {
    const parts = key.split(' ');
    if (parts[1] == nodeId)
        q1566(key);
} }); }
function b1594() { figma.getLocalPaintStylesAsync().then(y1598 => { for (const style of y1598) {
    style.setPluginData('type', '');
    style.setPluginData('nodeId', '');
    style.setPluginData('existing', '');
} }); }
function figSaveSnapshot(index, objectIds) {
    return __awaiter(this, void 0, void 0, function* () { const objects = yield figGetObjectsFromIds(objectIds); const group = figma.group(objects, figma.currentPage); const settings = { format: 'PNG' }; const icon = yield group.exportAsync(settings); figma.ungroup(group); j1544({ cmd: 'uiReturnFigSaveSnapshot', index: index, iconWidth: group.width, iconHeight: group.height, icon: icon }); });
}
var b2737 = null;
var v4030 = () => b2737 = null;
var v2738 = 'normal';
function t1610(clientPosition) { j1544({ cmd: 'uiReturnFigGetMousePosition', position: { x: 0, y: 0 }, clientPosition: clientPosition, viewportZoom: figma.viewport.zoom, viewportRect: figma.viewport.bounds }); }
function v1611(x, y, width, height) { return; }
function g1612(dock, rect, bounds) { switch (dock) {
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
function p1613(width, height) { (function () {
    return __awaiter(this, void 0, void 0, function* () { width = Math.floor(Math.max(0, width)); height = Math.floor(Math.max(0, height)); figma.ui.resize(width, height); yield figma.currentPage.loadAsync(); figma.currentPage.setPluginData(figma.currentUser.id + ',windowWidth', width.toString()); figma.currentPage.setPluginData(figma.currentUser.id + ',windowHeight', height.toString()); j1544({ cmd: 'uiReturnFigResizeWindow', width: width, height: height }); });
})(); }
function z2739(dock) {
    return __awaiter(this, void 0, void 0, function* () { if (dock != 'normal' && v2738 == 'normal') {
        figma.clientStorage.setAsync('normalWindowX', yield figma.clientStorage.getAsync('normalWindowX'));
        figma.clientStorage.setAsync('normalWindowY', yield figma.clientStorage.getAsync('normalWindowY'));
        figma.clientStorage.setAsync('normalWindowWidth', yield figma.clientStorage.getAsync('normalWindowWidth'));
        figma.clientStorage.setAsync('normalWindowHeight', yield figma.clientStorage.getAsync('normalWindowHeight'));
    } v2738 = dock; figma.clientStorage.setAsync('windowDock', dock); p1613(yield figma.clientStorage.getAsync('windowWidth'), yield figma.clientStorage.getAsync('windowHeight')); });
}
function g1614(msg) { q1615(msg.text, msg.prefix, msg.delay, msg.error, msg.i1616, msg.d1617); }
function q1615(text, prefix = 'Generator ', delay = 400, error = false, i1616 = '', d1617 = NULL) { const options = { timeout: delay, error: error, onDequeue: v4030 }; if (i1616 != '') {
    options['button'] = { text: i1616 };
    if (d1617.substring(0, 'removeConnection'.length) == 'removeConnection') {
        options['button']['action'] = () => b1590(d1617.split(',')[1]);
    }
    else {
        switch (d1617) {
            case 'hideClearUndoWarning':
                options['button']['action'] = () => j1544({ cmd: 'uiHideClearUndoWarning' });
                break;
        }
    }
} if (b2737)
    b2737.cancel(); b2737 = figma.notify(prefix + text, options); }
function g2740(key, params = null) {
    return __awaiter(this, void 0, void 0, function* () { return yield d2741(key, params); });
}
function d2741(key, params = null) {
    return __awaiter(this, void 0, void 0, function* () { return new Promise((resolve, reject) => { const timeout = 60000; j1544(Object.assign({ cmd: 'uiGetValueForFigma', key: key }, (params || {}))); const b2742 = setTimeout(() => reject(new Error('Timeout: Result not received by Figma within the specified time')), timeout); function u4031(msg) { msg = JSON.parse(msg); if (msg.cmd === 'returnUiGetValueForFigma') {
        clearTimeout(b2742);
        resolve({ key: msg.key, value: msg.value });
        figma.ui.off('message', u4031);
    } } figma.ui.on('message', u4031); }); });
}
var w2743 = [];
var i2744 = [];
var w2745 = 0;
var i2746 = 0;
function u1545(v111) { return (v111[p1403] === 2 ? '' : k874) + (r2800 ? v111[n1397] : v111[l1399]); }
function f1546(v1530, addObject = null, addProps = true, transform = true) {
    return __awaiter(this, void 0, void 0, function* () { if (!u1548(v1530))
        return null; let p1531; switch (v1530[e1395]) {
        case u1219:
            p1531 = z2714(v1530, addProps, transform);
            break;
        case m1222:
            p1531 = j2793(v1530, addProps, transform);
            break;
        case p1225:
            p1531 = o2789(v1530, addProps, transform);
            break;
        case h1237:
            p1531 = w2710(v1530, addProps, transform);
            break;
        case j1240:
            p1531 = l2717(v1530, addProps, transform);
            break;
        case k1243:
            p1531 = e2720(v1530, addProps, transform);
            break;
        case t1246:
            p1531 = s2696(v1530);
            break;
        case g1250:
            p1531 = b2748(v1530, addProps, transform);
            break;
        case h1262:
            p1531 = l2749(v1530, addProps, transform);
            break;
        case c1286:
            p1531 = yield r2750(v1530, addProps, transform);
            break;
        case m1265:
            p1531 = yield g2751(v1530);
            break;
        case y1268:
            p1531 = yield f2752(v1530, addProps, transform);
            break;
    } if (addObject && p1531 != undefined && p1531 != null && !p1531.removed) {
        p1531.name = u1545(v1530);
        x952(v1530[e1395] == m1265 || !!p1531, 'no Figma object created');
        if (p1531 != undefined && p1531 != null) {
            p1531.setPluginData('retain', v1530[p1403].toString());
            if (v1530[p1403] < 2) {
                p1531.setPluginData('userId', figma.currentUser.id);
                p1531.setPluginData('sessionId', figma.currentUser.sessionId.toString());
                p1531.setPluginData('type', v1530[e1395]);
                p1531.setPluginData('nodeId', v1530[r1396]);
                p1531.setPluginData('objectId', v1530[n1397]);
                p1531.setPluginData('isCenter', l937(v1530[b1418]));
                if (v1530[e1395] == t1246)
                    e2766.push(p1531);
                if (v1530[t1417])
                    e1561(p1531);
            }
            addObject(p1531);
        }
    } if (!v1530.counted) {
        i2746++;
        v1530.counted = true;
    } return p1531; });
}
function r1547(p1531, v1530, addProps, transform) {
    return __awaiter(this, void 0, void 0, function* () { if (!u1548(v1530) || p1531 == undefined || p1531 == null || p1531.removed)
        return; p1531.name = u1545(v1530); p1531.setPluginData('retain', v1530[p1403].toString()); switch (v1530[e1395]) {
        case u1219:
            q2715(p1531, v1530, addProps, transform);
            break;
        case m1222:
            e2794(p1531, v1530, addProps, transform);
            break;
        case p1225:
            l2790(p1531, v1530, addProps, transform);
            break;
        case h1237:
            h2711(p1531, v1530, addProps, transform);
            break;
        case j1240:
            n2718(p1531, v1530, addProps, transform);
            break;
        case k1243:
            p2721(p1531, v1530, addProps, transform);
            break;
        case t1246:
            b2753(p1531, v1530);
            break;
        case g1250:
            w2754(p1531, v1530, addProps, transform);
            break;
        case h1262:
            r2755(p1531, v1530, addProps, transform);
            break;
        case c1286:
            k2756(p1531, v1530, addProps, transform);
            break;
        case m1265:
            g2757(p1531, v1530);
            break;
        case y1268:
            w2758(p1531, v1530, addProps, transform);
            break;
    } if (p1531 != undefined && p1531 != null && !p1531.removed) {
        if (p1531.parent == figma.currentPage)
            yield figma.currentPage.loadAsync();
        p1531.parent.appendChild(p1531);
        if (v1530[t1417])
            e1561(p1531);
    } if (!v1530.counted) {
        i2746++;
        v1530.counted = true;
    } });
}
function v2733(m2759, v2760, p2761, j2068 = -1, nodeIds = [], h2762 = false, s2763 = false, k270 = false, addProps = true, transform = true) {
    return __awaiter(this, void 0, void 0, function* () { let h2764 = NULL; let y2765 = null; let abort = false; const u3643 = []; let b2747 = 0; w2743.push(...nodeIds); if (j2068 > -1)
        w2745 = j2068; for (const v1530 of v2760) {
        i2744.push(v1530);
        if (v1530[r1396] != h2764) {
            h2764 = v1530[r1396];
            y2765 = p2730.find(a => a.nodeId == v1530[r1396]);
            if (!y2765) {
                p2730.push(y2765 = { nodeId: v1530[r1396], objects: [] });
            }
        }
        const addObject = p1531 => { if (m2759 != undefined && m2759 != null && !m2759.removed)
            m2759.appendChild(p1531);
        else
            y2765.objects.push(p1531); };
        let objects = m2759 != undefined && m2759 != null && !m2759.removed ? m2759.children : y2765.objects;
        let p1531 = objects.find(o => o.removed || o.getPluginData('userId') == figma.currentUser.id && o.getPluginData('objectId') == v1530[n1397]);
        if (p1531 != undefined && p1531 != null && p1531.removed) {
            n938(objects, p1531);
            if (e2766.includes(p1531))
                j943(e2766, p1531);
            if (a2782.includes(p1531))
                j943(a2782, p1531);
        }
        if (p1531 == undefined || p1531 == null || p1531.removed) {
            const newObj = yield f1546(v1530, addObject, addProps, transform);
            u3643.push(newObj);
        }
        else if (p1531 != undefined && p1531 != null && !p1531.removed && p1531.getPluginData('type') == v1530[e1395].toString()) {
            yield r1547(p1531, v1530, addProps, transform);
            if (p1531 != undefined && p1531 != null && !p1531.removed)
                u3643.push(p1531);
        }
        else {
            p1531.remove();
            if (e2766.includes(p1531))
                j943(e2766, p1531);
            if (a2782.includes(p1531))
                j943(a2782, p1531);
            yield f1546(v1530, addObject, addProps, transform);
        }
        b2747++;
        if (b2747 >= p2761) {
            const result = yield g2740('returnObjectUpdate', { w2745: w2745, i2746: i2746 });
            abort = result.value;
            b2747 = 0;
            if (abort)
                break;
        }
    } if (m2759 != undefined && m2759 != null && !m2759.removed) {
        for (const p1531 of m2759.children) {
            if (p1531 != undefined && p1531 != null && p1531.removed || !v2760.find(o => o[n1397] == p1531.getPluginData('objectId') && p1531.getPluginData('userId') == figma.currentUser.id))
                p1531.remove();
        }
    } for (const point of e2766) {
        if (point.parent == figma.currentPage)
            yield figma.currentPage.loadAsync();
        if (point != undefined && point != null && !point.removed && !point.parent.removed)
            point.parent.appendChild(point);
    } if (s2763 && !abort) {
        r1527(w2743, i2744);
        w2743 = [];
        i2744 = [];
        if (k270 && u3643.length > 0) {
            figma.viewport.scrollAndZoomIntoView(u3643);
            const bounds = f1551(u3643);
            figma.viewport.zoom = Math.min(figma.viewport.bounds.width * figma.viewport.zoom / bounds.width - 0.05, figma.viewport.bounds.height * figma.viewport.zoom / bounds.height - 0.05);
        }
    } yield g2740('returnObjectUpdate', { w2745: w2745, i2746: i2746 }); });
}
function u1548(v1530) { switch (v1530[e1395]) {
    case u1219: return y2713(v1530);
    case m1222: return a2775(v1530);
    case p1225: return n2776(v1530);
    case h1237: return t4027(v1530);
    case j1240: return g2716(v1530);
    case k1243: return m2719(v1530);
    case t1246: return o4026(v1530);
    case g1250: return m2777(v1530);
    case h1262: return x2778(v1530);
    case c1286: return i2779(v1530);
    case m1265: return t2780(v1530);
    case y1268: return v2781(v1530);
} }
function p1549(v1530) {
    return __awaiter(this, void 0, void 0, function* () { (() => __awaiter(this, void 0, void 0, function* () { const p1531 = yield f1546(v1530); const width = p1531.width; const height = p1531.height; p1531.remove(); j1544({ cmd: 'uiForwardToGenerator', msg: { cmd: 'returnFigGetObjectSize', objectId: v1530[n1397], width: width, height: height } }); }))(); });
}
function g1550(p1531) { p1531.setPluginData('type', ''); p1531.setPluginData('nodeId', ''); p1531.setPluginData('userId', ''); p1531.setPluginData('sessionId', ''); p1531.setPluginData('objectId', ''); p1531.setPluginData('isCenter', ''); p1531.setPluginData('retain', ''); }
function f1551(objects) { const bounds = { left: 0, top: 0, right: 0, bottom: 0 }; for (const v111 of objects) {
    if (v111.x < bounds.left || bounds.left == bounds.right)
        bounds.left = v111.x;
    if (v111.y < bounds.top || bounds.top == bounds.bottom)
        bounds.top = v111.y;
    if (v111.x + v111.width > bounds.right || bounds.left == bounds.right)
        bounds.right = v111.x + v111.width;
    if (v111.y + v111.height > bounds.bottom || bounds.top == bounds.bottom)
        bounds.bottom = v111.y + v111.height;
} return { x: bounds.left, y: bounds.top, width: bounds.right - bounds.left, height: bounds.bottom - bounds.top }; }
function figExport(objectIds, scale, format, suffix) {
    return __awaiter(this, void 0, void 0, function* () { yield figma.currentPage.loadAsync(); for (const objId of objectIds) {
        let p1531 = figma.currentPage.children.find(o => !o.removed && o.getPluginData('userId') == figma.currentUser.id && o.getPluginData('objectId') == objId);
        if (!p1531)
            continue;
        const settings = { constraint: { type: 'SCALE', value: scale }, format: format == 0 ? 'PNG' : 'JPG', suffix: suffix };
        yield p1531.exportAsync(settings);
    } });
}
const a2782 = [];
const l2783 = [];
function u1552(y1553, c1554) { const effects = []; for (const effect of y1553) {
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
                if (c1554 && !isNaN(spread))
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
function b2703(p1531, v1530, phantom = true) { u1557(p1531, v1530); n2704(p1531, v1530, phantom); s2705(p1531, v1530); p1531.opacity = v1530[x1419]; p1531.blendMode = v1530[h1420]; const maskType = v1530[z1421]; p1531.isMask = maskType > 0; if (p1531.isMask) {
    switch (maskType) {
        case 1:
            p1531.maskType = 'ALPHA';
            break;
        case 2:
            p1531.maskType = 'VECTOR';
            break;
        case 3:
            p1531.maskType = 'LUMINANCE';
            break;
    }
} if (p1531.isMask && p1531.fills.length == 0 && p1531.strokes.length == 0)
    p1531.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 }, opacity: 1, blendMode: 'NORMAL' }]; }
function s2705(p1531, v1530) { if (!!v1530[t1408] && !isEmpty(v1530[t1408])) {
    p1531.fills = v956(v1530[t1408]);
    if (a2782.includes(p1531))
        j943(a2782, p1531);
}
else
    p1531.fills = []; }
function n2704(p1531, v1530, phantom = true) { if (v1530[m1409] != null && !isEmpty(v1530[m1409])) {
    o1556(p1531, v956(v1530[m1409]), v1530[r1410], v1530[h1411], v1530[l1412], v1530[z1413], v1530[n1414], r2706(v1530[h1415]));
    if (v1530[t1417])
        p1531.setPluginData('dashes', v1530[h1415]);
    if (a2782.includes(p1531))
        j943(a2782, p1531);
    if (v1530[t1417])
        n949(l2783, p1531);
}
else if (isEmpty(v1530[t1408]) && isEmpty(v1530[m1409]) && !v1530[z1421] && phantom) {
    g1559(p1531);
    n949(a2782, p1531);
}
else
    p1531.strokes = []; }
function r2706(u1555) { u1555 = u1555; u1555 = z954(u1555, ','); u1555 = h955(u1555, ','); u1555 = u1555.trim(); return u1555 == '' ? [] : u1555.split(',').map(s => Math.max(0, parseFloat(s))); }
function d2707(u1555) { u1555 = u1555; u1555 = z954(u1555, ','); u1555 = h955(u1555, ','); u1555 = u1555.trim(); return u1555 == '' ? [] : u1555.split(',').map(s => Math.max(0, parseFloat(s) / w2709)); }
function o1556(p1531, fills, weight, align, join, miterLimit, cap, dashes = []) { p1531.strokes = fills; p1531.strokeWeight = Math.max(0, weight); p1531.strokeAlign = align; p1531.strokeJoin = join; const miterAngle = miterLimit / 360 * Tau; const a2784 = 1 / Math.sin(miterAngle / 2); p1531.strokeMiterLimit = Math.min(Math.max(0, a2784), 16); p1531.strokeCap = cap; p1531.dashPattern = dashes; }
function u1557(p1531, v1530) { if (!!v1530[x1416] && !isEmpty(v1530[x1416])) {
    const c1554 = v1530[e1395] == u1219 || v1530[e1395] == p1225 || v1530[e1395] == y1268;
    p1531.effects = u1552(v1530[x1416], c1554);
}
else
    p1531.effects = []; }
function d1558() { for (const v111 of a2782) {
    if (v111.removed)
        j943(a2782, v111);
    else
        g1559(v111);
} }
function g1559(v111) { figma.currentPage.loadAsync().then(() => { const back = figma.currentPage.backgrounds.find(b => b.type == 'SOLID'); let phantomColor; if (back) {
    const l = back.color.r * 0.2126 + back.color.g * 0.7152 + back.color.b * 0.0722;
    phantomColor = l > 0.5 ? { r: 0, g: 0, b: 0 } : { r: 1, g: 1, b: 1 };
}
else
    phantomColor = { r: 1, g: 0, b: 1 }; o1556(v111, [{ type: 'SOLID', color: phantomColor, opacity: 0.5 }], 1 / w2709, 'CENTER', 'MITER', 1, 'NONE', [1 / w2709, 2 / w2709]); }); }
function f1560() { for (const p1531 of l2783) {
    if (p1531.removed)
        j943(l2783, p1531);
    else
        e1561(p1531);
} }
function e1561(p1531) { p1531.strokeWeight = Math.max(0, 1.5 / w2709); if (m923(p1531.getPluginData('isCenter'))) {
    const path = p1531.vectorPaths[0];
    const parts = path.data.split(' ');
    let t = { x: parseFloat(parts[1]), y: parseFloat(parts[2]) };
    let c = { x: parseFloat(parts[4]), y: parseFloat(parts[5]) };
    let r = { x: parseFloat(parts[7]), y: parseFloat(parts[8]) };
    const a = 2;
    const b = 0.05;
    const f = 1 - Math.pow(1 - Math.min(w2709, 1), a) / Math.pow(a, b);
    t = f895(c, l897(a886(x900(t, c)), objectCenterSize / f));
    r = f895(c, l897(a886(x900(r, c)), objectCenterSize / f));
    parts[1] = t.x;
    parts[2] = t.y;
    parts[4] = c.x;
    parts[5] = c.y;
    parts[7] = r.x;
    parts[8] = r.y;
    const i2785 = { windingRule: path.windingRule, data: parts.join(' ') };
    p1531.vectorPaths = [i2785];
} const dashes = p1531.getPluginData('dashes'); if (dashes != '')
    p1531.dashPattern = d2707(dashes); }
function w1595(nodeId, px, py) { figma.getLocalPaintStylesAsync().then(_styles => { const styles = new Array(); for (const s168 of _styles) {
    const _nodeId = s168.getPluginData('nodeId');
    const _existing = s168.getPluginData('existing');
    const existing = !!_existing;
    const style = { id: s168.id, nodeId: _nodeId, name: s168.name, existing: existing, paints: new Array() };
    let onlyPaint = true;
    for (const b2787 of s168.paints) {
        if (b2787.type == 'SOLID') {
            style.paints.push([b2787.color.r, b2787.color.g, b2787.color.b, b2787.opacity]);
        }
        else {
            onlyPaint = false;
            break;
        }
    }
    if (onlyPaint)
        styles.push(style);
} j1544({ cmd: 'uiReturnFigGetAllLocalColorStyles', nodeId: nodeId, px: px, py: py, styles: JSON.stringify(styles) }); }); }
function u1596(nodeId, styleId) { figma.getLocalPaintStylesAsync().then(y1598 => { if (styleId != NULL)
    w1597(y1598, nodeId, styleId);
else
    z1599(y1598, nodeId); }); }
function w1597(y1598, nodeId, styleId, clearExisting = true) { const s2786 = c2732.find(a => a.nodeId == nodeId); if (s2786 && clearExisting)
    z1599(y1598, nodeId); const t1603 = y1598.find(s => s.id == styleId); x952(!!t1603, 'figStyle should be found here'); t1603.setPluginData('type', l1216); t1603.setPluginData('nodeId', nodeId); t1603.setPluginData('existing', l937(true)); c2732.push({ nodeId: nodeId, existing: true, styles: [t1603] }); return t1603; }
function z1599(y1598, nodeId) { const t1603 = y1598.find(s => s.getPluginData('nodeId') == nodeId); x952(!!t1603, 'figStyle should be found here'); if (t1603) {
    t1603.setPluginData('type', NULL);
    t1603.setPluginData('nodeId', NULL);
    t1603.setPluginData('existing', NULL);
    k945(c2732, a => a.nodeId == nodeId);
} return t1603; }
function e1600(styles, b1604) { const t1603 = figma.createPaintStyle(); t1603.setPluginData('type', b1604[e1395]); t1603.setPluginData('nodeId', b1604[r1396]); t1603.name = b1604[j1400]; setStylePaints(t1603, b1604); styles.push(t1603); j1544({ cmd: 'uiSetStyleId', nodeId: b1604[r1396], styleId: t1603.id }); return t1603; }
function p1601(msg) { let h2764 = NULL; let s2786; for (const b1604 of msg.styles) {
    if (b1604[r1396] != h2764) {
        h2764 = b1604[r1396];
        s2786 = c2732.find(a => a.nodeId == b1604[r1396]);
        if (!s2786) {
            s2786 = { nodeId: b1604[r1396], styles: [] };
            c2732.push(s2786);
        }
    }
    else
        s2786 = null;
    const t1603 = s2786.styles[0];
    figma.getLocalPaintStylesAsync().then(y1598 => { const localStyle = y1598.find(s => s.getPluginData('nodeId') == b1604[r1396]); if (isValid(t1603) && !isValid(localStyle)) {
        n938(s2786.styles, t1603);
    } const existing = isValid(t1603) && isValid(localStyle) && t1603.getPluginData('existing'); if (!isValid(t1603) || !isValid(localStyle)) {
        if (!existing) {
            o1534 = true;
            u1596(b1604[r1396], b1604[u1398]);
        }
    }
    else if (isValid(t1603) && t1603.getPluginData('type') == b1604[e1395]) {
        o1534 = true;
        j1602(localStyle, b1604);
    } });
} }
function j1602(t1603, b1604) { setStylePaints(t1603, b1604); t1603.name = b1604[j1400]; }
function getStylePaints(stylePaints) { const paints = new Array(); for (const b2787 of stylePaints) {
    const fill = b2787[1].split(' ');
    switch (b2787[0]) {
        case 'SOLID':
            paints.push({ type: 'SOLID', color: { r: Math.min(Math.max(0, parseFloat(fill[0]) / 0xff), 1), g: Math.min(Math.max(0, parseFloat(fill[1]) / 0xff), 1), b: Math.min(Math.max(0, parseFloat(fill[2]) / 0xff), 1) }, opacity: Math.min(Math.max(0, parseFloat(fill[3]) / 100), 1) });
            break;
    }
} return paints; }
function setStylePaints(t1603, b1604) { if (!isEmpty(b1604[f1402]))
    t1603.paints = getStylePaints(b1604[f1402]);
else
    t1603.paints = []; }
function f1618(nodeId, px, py) { figma.variables.getLocalVariablesAsync().then((y2788) => __awaiter(this, void 0, void 0, function* () { const variables = new Array(); for (const _var of y2788) {
    try {
        const collection = yield figma.variables.getVariableCollectionByIdAsync(_var.variableCollectionId);
        const variable = { id: _var.id, resolvedType: _var.resolvedType, name: _var.name, collectionName: collection.name };
        variables.push(variable);
    }
    catch (ex) { }
} figma.variables.getLocalVariableCollectionsAsync().then((collections) => __awaiter(this, void 0, void 0, function* () { j1544({ cmd: 'uiReturnFigGetAllLocalVariables', nodeId: nodeId, px: px, py: py, variables: JSON.stringify(variables), nCollections: collections.length }); })); })); }
function f1619(varIds) {
    return __awaiter(this, void 0, void 0, function* () { const y2788 = yield figma.variables.getLocalVariablesAsync(); const variables = varIds.map(id => y2788.find(v => v.id == id)); let values = []; for (let i = 0; i < varIds.length; i++) {
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
function o1620(nodeId, varId) { figma.variables.getLocalVariablesAsync().then(y2788 => { figLinkVariableAsync(y2788, nodeId, varId); }); }
function figUpdateVariableAsync(varId, value) {
    return __awaiter(this, void 0, void 0, function* () { figma.variables.getLocalVariablesAsync().then((y2788) => __awaiter(this, void 0, void 0, function* () { let variable = y2788.find(v => v.id == varId); if (!variable)
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
function figLinkVariableAsync(y2788, nodeId, varId) {
    return __awaiter(this, void 0, void 0, function* () { let variable = y2788.find(v => v.id == varId); if (!variable)
        return null; const [resolvedVar, values] = yield figGetResolvedVariableValuesAsync(variable); j1544({ cmd: 'uiReturnFigLinkNodeToVariable', nodeId: nodeId, variableId: resolvedVar ? resolvedVar.id : NULL, variableName: resolvedVar ? resolvedVar.name : '', resolvedType: resolvedVar ? resolvedVar.resolvedType : NULL, values: values }); return resolvedVar; });
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
function e1605(tl, tr, bl) { let vr = point(tr.x - tl.x, tr.y - tl.y); let vb = point(bl.x - tl.x, bl.y - tl.y); let sx = vr.x; let sy = vb.y; let kx = -vr.y; let ky = -vb.x; let dx = -tl.x; let dy = -tl.y; const _sx = kx / nozero(sx); const _sy = ky / nozero(sy); let b4208 = e889([[1, _sy, 0], [_sx, 1, 0], [0, 0, 1]], a893(dx, dy)); b4208 = z891(b4208); const a = v883(vr); if (a > Tau / 4 && a < Tau * 3 / 4)
    b4208 = e889(b4208, a893(0, 0, 1, 1, Tau / 2)); if (determinant(b4208) < 0)
    b4208 = e889(b4208, a893(0, 0, -1, 1, 0)); return b4208; }
function w1606(p1531, tl, tr, bl) { const b4208 = e1605(tl, tr, bl); p1531.relativeTransform = [b4208[0], b4208[1]]; }
function a1607(p1531, v1530, setSize = true, noHeight = 0.01) { if (!v1530[t1404] || !v1530[l1405] || !v1530[w1406])
    return; const xp0 = v1530[t1404]; const xp1 = v1530[l1405]; const xp2 = v1530[w1406]; w1606(p1531, xp0, xp1, xp2); if (setSize) {
    const scaleX = distv(xp0, xp1);
    const scaleY = distv(xp0, xp2);
    const height = v1530[e1395] == k1243 ? v1530[z1439] : v1530[d1426];
    if (!p1531.removed) {
        p1531.resizeWithoutConstraints(Math.max(0.01, scaleX), height ? Math.max(0.01, scaleY) : noHeight);
    }
} }
function g1608(t2701, m2702) { if (t2701.removed)
    return; t2701.resizeWithoutConstraints(0.01, 0.01); t2701.setPluginData('actualX', m2702[u1422].toString()); t2701.setPluginData('actualY', m2702[c1424].toString()); t2701.x = m2702[u1422]; t2701.y = m2702[c1424]; t2701.rotation = m2702[b1418] ? 45 : 0; }
function t1609(t2701) { if (!t2701.removed)
    t2701.resizeWithoutConstraints(0.01, 0.01); }
function i2779(genBool) { return true; }
function r2750(genBool, addProps, transform) {
    return __awaiter(this, void 0, void 0, function* () { let objects = []; for (const v111 of genBool[w1453])
        yield f1546(v111, o => objects = [...objects, o], false); yield figma.currentPage.loadAsync(); let figBool = null; if (!isEmpty(objects)) {
        switch (genBool[d1454]) {
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
        k2756(figBool, genBool, addProps, transform);
    } return figBool; });
}
function k2756(figBool, genBool, addProps, transform) {
    return __awaiter(this, void 0, void 0, function* () { if (genBool[w1453].length == 0) {
        figBool.remove();
        return;
    } yield v2733(figBool, genBool[w1453], genBool[w1453].length, -1, [], false, false, false, false, true); const hasProps = genBool[t1408].length > 0 || genBool[m1409].length > 0 || genBool[x1416].length > 0; b2703(figBool, genBool, !hasProps && addProps); });
}
function n2776(d2767) { return d2767[u1422] != null && !isNaN(d2767[u1422]) && d2767[c1424] != null && !isNaN(d2767[c1424]) && d2767[n1425] != null && !isNaN(d2767[n1425]) && d2767[d1426] != null && !isNaN(d2767[d1426]) && d2767[s1428] != null && !isNaN(d2767[s1428]) && d2767[a1435] != null && !isNaN(d2767[a1435]) && d2767[u1441] != null && !isNaN(d2767[u1441]) && d2767[l1445] != null && !isNaN(d2767[l1445]); }
function o2789(d2767, addProps, transform) { if (!n2776(d2767))
    return null; const s2768 = figma.createEllipse(); l2790(s2768, d2767, addProps, transform, true); return s2768; }
function l2790(s2768, d2767, addProps, transform, isValid = false) { if (!isValid && !n2776(d2767))
    return; t2791(s2768, d2767, transform); if (e2766.includes(s2768))
    n2698(s2768);
else
    b2703(s2768, d2767, addProps); }
function t2791(s2768, d2767, transform) { s2768.cornerRadius = d2767[s1428]; const start = d2767[a1435] / 360 * (Math.PI * 2); const sweep = d2767[u1441] / 100 * (Math.PI * 2); s2768.arcData = { startingAngle: start, endingAngle: start + sweep, innerRadius: Math.min(Math.max(0, d2767[l1445] / 100), 1) }; if (transform)
    a1607(s2768, d2767); }
function v2781(d2769) { return d2769[u1422] != null && !isNaN(d2769[u1422]) && d2769[c1424] != null && !isNaN(d2769[c1424]) && d2769[n1425] != null && !isNaN(d2769[n1425]) && d2769[d1426] != null && !isNaN(d2769[d1426]) && d2769[t1434] != null && !isNaN(d2769[t1434]) && d2769[k1455] != null && !isNaN(d2769[k1455]); }
function f2752(d2769, addProps, transform) {
    return __awaiter(this, void 0, void 0, function* () { if (!v2781(d2769))
        return null; const q2770 = figma.createFrame(); if (q2770) {
        q2770.expanded = false;
        e2792(q2770, d2769, addProps, transform);
        let objects = [];
        for (const v111 of d2769[v1440])
            yield f1546(v111, o => objects = [...objects, o]);
        for (const v111 of objects)
            q2770.appendChild(v111);
    } return q2770; });
}
function w2758(q2770, d2769, addProps, transform) { e2792(q2770, d2769, addProps, transform); v2733(q2770, d2769[v1440], d2769[v1440].length); }
function e2792(q2770, d2769, addProps, transform) { q2770.cornerRadius = d2769[t1434]; q2770.clipsContent = d2769[k1455] > 0; if (transform)
    a1607(q2770, d2769); b2703(q2770, d2769, addProps && d2769[v1440].length == 0); figUpdateStrokeSides(q2770, d2769); }
function t2780(e2771) { return true; }
function g2751(e2771) {
    return __awaiter(this, void 0, void 0, function* () { let objects = []; for (const v111 of e2771[c1423])
        yield f1546(v111, o => objects = [...objects, o]); yield figma.currentPage.loadAsync(); const q2772 = !isEmpty(objects) ? figma.group(objects, figma.currentPage) : null; if (q2772) {
        q2772.expanded = false;
        g2757(q2772, e2771);
    } return q2772; });
}
function g2757(q2772, e2771) { if (e2771[c1423].length == 0) {
    q2772.remove();
    return;
} v2733(q2772, e2771[c1423], e2771[c1423].length); u1557(q2772, e2771); }
function a2775(n2773) { return n2773[u1422] != null && !isNaN(n2773[u1422]) && n2773[c1424] != null && !isNaN(n2773[c1424]) && n2773[n1425] != null && !isNaN(n2773[n1425]); }
function j2793(n2773, addProps, transform) { if (!a2775(n2773))
    return null; const f2774 = figma.createLine(); e2794(f2774, n2773, addProps, transform, true); return f2774; }
function e2794(f2774, n2773, addProps, transform, isValid = false) { if (!isValid && !a2775(n2773))
    return; if (transform)
    a1607(f2774, n2773, true, 0); b2703(f2774, n2773, addProps); }
var e2766 = [];
function o4026(m2702) { return m2702[u1422] != null && !isNaN(m2702[u1422]) && m2702[c1424] != null && !isNaN(m2702[c1424]); }
function s2696(m2702) { const t2701 = m2702[b1418] ? figma.createRectangle() : figma.createEllipse(); if (!o4026(m2702))
    return t2701; if (e2766.includes(t2701))
    g2700(t2701, m2702);
else
    b2753(t2701, m2702); return t2701; }
function b2753(t2701, m2702) { g1608(t2701, m2702); b2699(t2701); }
function s2697() { j1544({ cmd: 'uiUpdateZoom', zoom: figma.viewport.zoom }); for (const point of e2766)
    n2698(point); }
function n2698(t2701) { t1609(t2701); b2699(t2701); }
function g2700(t2701, m2702) { g1608(t2701, m2702); b2699(t2701); }
function b2699(t2701) { if (t2701.removed)
    return; figma.currentPage.loadAsync().then(() => { const isCenter = m923(t2701.getPluginData('isCenter')); const k2708 = figma.currentPage.selection.includes(t2701); const color = isCenter ? [0xf2, 0x48, 0x22] : k2708 ? [12, 140, 233] : [255, 255, 255]; const border = isCenter ? [255, 255, 255] : k2708 ? [255, 255, 255] : [12, 140, 233]; t2701.fills = v956([['SOLID', color[0], color[1], color[2], 100]]); const effects = []; effects.push(...u1552([['DROP_SHADOW', border[0] / 255, border[1] / 255, border[2] / 255, 1, 0, 0, 0, (isCenter ? 3 : k2708 ? 5 : 3.6) / w2709, 'NORMAL', true, true]], true)); effects.push(...u1552([['DROP_SHADOW', color[0] / 255, color[1] / 255, color[2] / 255, 1, 0, 0, 0, (k2708 ? 4 : 2.4) / w2709, 'NORMAL', true, true]], true)); t2701.effects = effects; }); }
function t4027(genPoly) { return genPoly[u1422] != null && !isNaN(genPoly[u1422]) && genPoly[c1424] != null && !isNaN(genPoly[c1424]) && genPoly[n1425] != null && !isNaN(genPoly[n1425]) && genPoly[d1426] != null && !isNaN(genPoly[d1426]) && genPoly[n1431] != null && !isNaN(genPoly[n1431]) && genPoly[c1437] != null && !isNaN(genPoly[c1437]); }
function w2710(genPoly, addProps, transform) { if (!t4027(genPoly))
    return null; const figPoly = figma.createPolygon(); h2711(figPoly, genPoly, addProps, transform, true); return figPoly; }
function h2711(figPoly, genPoly, addProps, transform, isValid = false) { if (!isValid && !t4027(genPoly))
    return; figPoly.cornerRadius = genPoly[n1431]; figPoly.pointCount = Math.max(3, genPoly[c1437]); if (transform)
    a1607(figPoly, genPoly); b2703(figPoly, genPoly, addProps); }
function y2713(y2712) { return y2712[u1422] != null && !isNaN(y2712[u1422]) && y2712[c1424] != null && !isNaN(y2712[c1424]) && y2712[n1425] != null && !isNaN(y2712[n1425]) && y2712[d1426] != null && !isNaN(y2712[d1426]) && y2712[s1427] != null && !isNaN(y2712[s1427]); }
function z2714(y2712, addProps, transform) { if (!y2713(y2712))
    return null; const figRect = figma.createRectangle(); q2715(figRect, y2712, addProps, transform, true); return figRect; }
function q2715(figRect, y2712, addProps, transform, isValid = false) { if (!isValid && !y2713(y2712))
    return; const foundCorners = y2712[x1416].findIndex(e => e[0] == 'ROUND_CORNERS'); if (foundCorners > -1) {
    const corners = y2712[x1416][foundCorners];
    figRect.topLeftRadius = corners[1];
    figRect.topRightRadius = corners[2];
    figRect.bottomLeftRadius = corners[3];
    figRect.bottomRightRadius = corners[4];
}
else
    figRect.cornerRadius = y2712[s1427]; if (transform)
    a1607(figRect, y2712); b2703(figRect, y2712, addProps); figUpdateStrokeSides(figRect, y2712); }
function figUpdateStrokeSides(p1531, v1530) { const foundSides = v1530[x1416].findIndex(e => e[0] == 'STROKE_SIDES'); if (foundSides < 0)
    return; const sides = v1530[x1416][foundSides]; p1531.strokeWeight = 0; p1531.strokeTopWeight = sides[1]; p1531.strokeLeftWeight = sides[2]; p1531.strokeRightWeight = sides[3]; p1531.strokeBottomWeight = sides[4]; }
function g2716(x2726) { return x2726[u1422] != null && !isNaN(x2726[u1422]) && x2726[c1424] != null && !isNaN(x2726[c1424]) && x2726[n1425] != null && !isNaN(x2726[n1425]) && x2726[d1426] != null && !isNaN(x2726[d1426]) && x2726[y1432] != null && !isNaN(x2726[y1432]) && x2726[r1438] != null && !isNaN(x2726[r1438]) && x2726[i1443] != null && !isNaN(x2726[i1443]); }
function l2717(x2726, addProps, transform) { if (!g2716(x2726))
    return null; const c2727 = figma.createStar(); n2718(c2727, x2726, addProps, transform, true); return c2727; }
function n2718(c2727, x2726, addProps, transform, isValid = false) { if (!isValid && !g2716(x2726))
    return; c2727.cornerRadius = x2726[y1432]; c2727.pointCount = x2726[r1438]; c2727.innerRadius = Math.min(Math.max(0, x2726[i1443] / 100), 1); if (transform)
    a1607(c2727, x2726); b2703(c2727, x2726, addProps); }
const e4269 = [];
function m2719(f2723) { return f2723[h1444] != null && f2723[u1422] != null && !isNaN(f2723[u1422]) && f2723[c1424] != null && !isNaN(f2723[c1424]) && f2723[n1425] != null && !isNaN(f2723[n1425]) && f2723[d1426] != null && !isNaN(f2723[d1426]) && f2723[x1446] != null && f2723[x1446] != NULL && f2723[x1447] != null && !isNaN(f2723[x1447]); }
function e2720(f2723, addProps, transform) { if (!m2719(f2723))
    return null; const r2795 = figma.createText(); p2721(r2795, f2723, addProps, transform, true); return r2795; }
function p2721(r2795, f2723, addProps, transform, isValid = false) { if (!isValid && !m2719(f2723))
    return null; const fontName = { family: f2723[x1446], style: f2723[y1448] }; try {
    if (!e4269.includes(fontName)) {
        figma.loadFontAsync(fontName).then(() => { e4269.push(fontName); j2722(r2795, f2723, fontName, addProps, transform); });
    }
    else {
        j2722(r2795, f2723, fontName, addProps, transform);
    }
}
catch (e) {
    h953(e);
} }
function j2722(r2795, f2723, fontName, addProps, transform) { r2795.fontName = fontName; r2795.fontSize = Math.max(1, f2723[x1447]); r2795.characters = f2723[h1444]; r2795.lineHeight = { unit: 'PERCENT', value: f2723[y1451] }; r2795.letterSpacing = { unit: 'PERCENT', value: f2723[l1452] }; if (f2723[d1449] == 0)
    r2795.textAlignHorizontal = 'LEFT';
else if (f2723[d1449] == 1)
    r2795.textAlignHorizontal = 'CENTER';
else if (f2723[d1449] == 2)
    r2795.textAlignHorizontal = 'RIGHT';
else if (f2723[d1449] == 3)
    r2795.textAlignHorizontal = 'JUSTIFIED'; if (f2723[h1450] == 0)
    r2795.textAlignVertical = 'TOP';
else if (f2723[h1450] == 1)
    r2795.textAlignVertical = 'CENTER';
else if (f2723[h1450] == 2)
    r2795.textAlignVertical = 'BOTTOM'; if (transform)
    a1607(r2795, f2723); b2703(r2795, f2723, addProps); if (f2723[o1433] == 0 && f2723[z1439] == 0)
    r2795.textAutoResize = 'WIDTH_AND_HEIGHT';
else if (f2723[o1433] == 0)
    r2795.textAutoResize = 'HEIGHT';
else
    r2795.textAutoResize = 'NONE'; }
function x2778(w2728) { return true; }
function l2749(w2728, addProps, transform) { if (!x2778(w2728))
    return null; const s2729 = figma.createVector(); r2755(s2729, w2728, addProps, transform, true); return s2729; }
function r2755(s2729, w2728, addProps, transform, isValid = false) { if (!isValid && !x2778(w2728))
    return; s2729.setVectorNetworkAsync(w2728[z1429]); if (transform)
    a1607(s2729, w2728, false); b2703(s2729, w2728, addProps); }
function m2777(e2724) { return e2724[p1436] != null && !isNaN(e2724[p1436]) && e2724[o1442] != null && !isNaN(e2724[o1442]); }
function b2748(e2724, addProps, transform) { const b2725 = figma.createVector(); w2754(b2725, e2724, addProps, transform, true); return b2725; }
function w2754(b2725, e2724, addProps, transform, isValid = false) { if (!isValid && !m2777(e2724))
    return; b2725.vectorPaths = [{ windingRule: e2724[p1436] == 1 ? 'NONZERO' : 'EVENODD', data: e2724[v1430] }]; b2725.cornerRadius = Number(e2724[o1442]); if (transform)
    a1607(b2725, e2724, false); b2703(b2725, e2724, addProps); }
