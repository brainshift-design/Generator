var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function l1048(key, tag) { return key.substring(0, tag.length + 1) == tag + ' '; }
function k1049(key, tag) { return key.substring(tag.length + 1); }
function i1050(key) { return l1048(key, h877); }
function l1051(key) { return l1048(key, c875); }
function x1052(key) { return l1048(key, q876); }
function n1053(key) { return k1049(key, h877); }
function w1054(key) { return k1049(key, c875); }
function n1055(key) { return k1049(key, q876); }
const generatorVersion = 435;
const e869 = 2147483647;
const NULL = '';
const t870 = '  ';
const q871 = '    ';
const u872 = '\n';
const f873 = '◦ G •';
const v874 = f873 + ' ';
const c875 = 'G_NODE';
const q876 = 'G_CONN';
const h877 = 'G_PAGE';
const y878 = 'G_TEMP';
const minWindowWidth = 602;
const minWindowHeight = 39;
const identity = Object.freeze([[1, 0, 0], [0, 1, 0], [0, 0, 1]]);
const Epsilon = 0.0000001;
const Tau = Math.PI * 2;
var enableAsserts = false;
function x879(x, eps = 0.000000001) { return Math.abs(x) < eps ? 0 : x; }
function nozero(x, eps = 0.000000001) { return x != 0 ? x : (x < 0 ? -eps : eps); }
function y880(v, eps = 0.000000001) { return point(nozero(v.x, eps), nozero(v.y, eps)); }
function equal(a, b, eps = 0.000000001) { return Math.abs(b - a) < eps; }
function sqr(x) { return x * x; }
;
function cube(x) { return x * x * x; }
;
function q881(f) { return Math.floor(f) | 0; }
function i882(x) { x = q881(x); x--; x |= x >> 1; x |= x >> 2; x |= x >> 4; x |= x >> 8; x |= x >> 16; x |= x >> 32; return ++x; }
function gcd(a, b) { let temp; while (1) {
    temp = a % b;
    if (temp == 0)
        return b;
    a = b;
    b = temp;
} }
function distv(p1, p2) { const dx = p2.x - p1.x; const dy = p2.y - p1.y; return Math.sqrt(dx * dx + dy * dy); }
function m883(v) { let angle = Math.atan2(v.y, v.x); if (angle < 0)
    angle += Tau; return angle; }
function anglev2(v1, v2) { return anglev2_(v1.x, v1.y, v2.x, v2.y); }
function anglev2_(x1, y1, x2, y2) { const dx = x2 - x1; const dy = y2 - y1; let angle = Math.atan2(dy, dx); if (angle < 0)
    angle += Tau; return angle; }
function s885(v) { return Math.sqrt(v.x * v.x + v.y * v.y); }
function lengthv_(x, y) { return Math.sqrt(x * x + y * y); }
function w886(v) { return point(v.x == 0 ? 0 : v.x / s885(v), v.y == 0 ? 0 : v.y / s885(v)); }
function dotv(v1, v2) { return v1.x * v2.x + v1.y * v2.y; }
function a887(a1, a2) { let diff = a2 - a1; while (diff <= -Tau / 2)
    diff += Tau; while (diff > Tau / 2)
    diff -= Tau; return diff; }
function y888(v, m) { let v3 = [v.x, v.y, 1]; let r = b948(v3, m); return point(r[0], r[1]); }
function y889(...mm) { g952(mm.length > 0, 'mulm3m3() must take at least one argument'); let result = clone(mm[0]); for (let a = 1; a < mm.length; a++) {
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
function w890(m, s) { for (let i = 0; i < 3; i++)
    for (let j = 0; j < 3; j++)
        m[i][j] /= s; return m; }
function adjugate(m) { return cofactor(transpose(m)); }
function transpose(m) { return [[m[0][0], m[1][0], m[2][0]], [m[0][1], m[1][1], m[2][1]], [m[0][2], m[1][2], m[2][2]]]; }
function cofactor(m) { return [[m[1][1] * m[2][2] - m[2][1] * m[1][2], -(m[1][0] * m[2][2] - m[2][0] * m[1][2]), m[1][0] * m[2][1] - m[2][0] * m[1][1]], [-(m[0][1] * m[2][2] - m[2][1] * m[0][2]), m[0][0] * m[2][2] - m[2][0] * m[0][2], -(m[0][0] * m[2][1] - m[2][0] * m[0][1])], [m[0][1] * m[1][2] - m[1][1] * m[0][2], -(m[0][0] * m[1][2] - m[1][0] * m[0][2]), m[0][0] * m[1][1] - m[1][0] * m[0][1]]]; }
function determinant(m) { return m[0][0] * (m[1][1] * m[2][2] - m[1][2] * m[2][1]) - m[0][1] * (m[1][0] * m[2][2] - m[2][0] * m[1][2]) + m[0][2] * (m[1][0] * m[2][1] - m[2][0] * m[1][1]); }
function f891(m) { return w890(adjugate(m), determinant(m)); }
function y892(angle) { const cosA = x879(Math.cos(angle)); const sinA = x879(Math.sin(angle)); return [[cosA, sinA, 0], [-sinA, cosA, 0], [0, 0, 1]]; }
function b893(x = 0, y = 0, scaleX = 1, scaleY = 1, angle = 0, skewX = 0, skewY = 0) { const cosA = Math.cos(angle); const sinA = Math.sin(angle); return [[scaleX * cosA - skewY * sinA, -skewX * cosA + scaleY * sinA, x], [skewY * cosA + scaleX * sinA, scaleY * cosA + skewX * sinA, y], [0, 0, 1]]; }
function r894(v1, v2) { return v1.x * v2.y - v1.y * v2.x; }
function h895(v1, v2) { return point(v1.x + v2.x, v1.y + v2.y); }
function sqrv(v) { return d896(v, v); }
function d896(v1, v2) { return point(v1.x * v2.x, v1.y * v2.y); }
function n897(v, s) { return point(v.x * s, v.y * s); }
function d898(v1, v2) { return point(v1.x / v2.x, v1.y / v2.y); }
function z899(v, s) { return point(v.x / s, v.y / s); }
function p900(v1, v2) { return point(v1.x - v2.x, v1.y - v2.y); }
function a901(str) { return decodeURI(encodeURIComponent(str)); }
function w902(str) { return decodeURIComponent(encodeURI(str)); }
function d903(bytes) { let str = ''; for (let i = 0; i < bytes.length; i++)
    str += String.fromCharCode(bytes[i]); return str; }
function l904(str) { return Array.from(w902(str), c => c.charCodeAt(0)); }
function f905(array, size) { const newArray = new Uint8Array(size); n906(array, newArray); return newArray; }
function n906(src, dst) { d907(src, 0, src.length, dst, 0, dst.length); }
function d907(src, i908, c909, dst, b910, k911) { const size = Math.min(c909, k911); for (let i = 0; i < size; i++)
    dst[b910 + i] = src[i908 + i]; }
function y912(l913, a914) { if (l913.length != a914.length)
    return false; for (let i = 0; i < l913.length; i++) {
    if (l913[i] != a914[i])
        return false;
} return true; }
function a915(m916, d917) { return m916.findIndex(i => d917.includes(i)) > -1; }
function h918(list) { return list ? '<==' : '<--'; }
;
function o919(list) { return list ? '==>' : '-->'; }
;
function g920(nodeId) { return c875 + ' ' + nodeId; }
function h921(name) { return q876 + ' ' + name; }
function z922(name) { return h877 + ' ' + name; }
function p923(str) { return str.toLowerCase() == 'true' || str == '1'; }
function i924(n925, s926 = false) { return d931(n925.outputNodeId, n925.outputId, n925.outputOrder, n925.inputNodeId, n925.inputId, n925.list, s926); }
function t927(outputNodeId, outputId, outputOrder, inputNodeId, inputId) { return h921(outputNodeId + ' ' + outputId + ' ' + outputOrder + ' ' + inputNodeId + ' ' + inputId); }
function o928(f243) { return t927(f243.outputNodeId, f243.outputId, f243.outputOrder, f243.inputNodeId, f243.inputId); }
function o929(f243) { return t927(f243.output.node.id, f243.output.id, f243.outputOrder, f243.input.node.id, f243.input.id); }
function z930(f243, s926 = false) { return d931(f243.output.node.id, f243.output.id, f243.outputOrder, f243.input.node.id, f243.input.id, f243.list, s926); }
function d931(outputNodeId, outputId, outputOrder, inputNodeId, inputId, list, s926 = false) { const sp = s926 ? ' ' : '  '; const jsp = s926 ? '' : ' '; const arrow = sp + y935(typeof outputOrder == 'string' ? parseInt(outputOrder) : outputOrder) + o919(typeof list == 'string' ? p923(list) : list) + sp; const join = jsp + '.' + jsp; return outputNodeId + join + outputId + arrow + inputNodeId + join + inputId; }
function e932(pageId) { return z922(pageId); }
function z933(num) { const str = num.toString(); let sup = ''; for (const c of str)
    sup += i934(c); return sup; }
function i934(c) { switch (c) {
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
    sup += u936(c); return sup; }
function u936(c) { switch (c) {
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
function f937(bool) { return bool ? 'true' : 'false'; }
function isValid(val) { return val != undefined && val != null; }
function isEmpty(array) { return array.length == 0; }
function b938(array, item) { g939(array, array.indexOf(item)); }
function g939(array, index) { if (index > -1 && index < array.length)
    array.splice(index, 1); }
function e940(array) { if (isEmpty(array))
    return null; let last = array.at(-1); array.splice(array.length - 1, 1); return last; }
function s941(array) { return array[array.length - 1]; }
function r942(array, from, to) { const item = array[from]; array.splice(from, 1); array.splice(to, 0, item); }
function v943(array, item) { const index = array.indexOf(item); if (index > -1)
    array.splice(index, 1); }
function w944(o2795, array) { for (const item of array) {
    const index = o2795.indexOf(item);
    if (index > -1)
        o2795.splice(index, 1);
} }
function l945(array, where) { const index = array.findIndex(where); if (index > -1)
    array.splice(index, 1); }
function h946(styleId) { return styleId.split(',')[0] + ','; }
function n947(points) { let q4031 = ''; if (points.length < 2)
    return q4031; q4031 += 'M'; q4031 += ' ' + x879(points[0].x); q4031 += ' ' + x879(points[0].y); for (let i = 1; i < points.length; i++) {
    q4031 += ' L' + ' ' + x879(points[i].x) + ' ' + x879(points[i].y);
} return q4031; }
function point(x, y) { return { x: x, y: y }; }
function b948(v, m) { let r = [0, 0, 0]; for (let i = 0; i < 3; i++)
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
        let l111 = {};
        for (const key in val)
            l111[key] = clone(val[key]);
        return l111;
    }
} throw 'unknown'; }
function q949(array, item, equal = null) { if (equal) {
    if (Array.isArray(item))
        item.forEach(i => q949(array, i, equal));
    else if (!array.find(i => equal(i, item)))
        array.push(item);
}
else {
    if (Array.isArray(item))
        item.forEach(i => q949(array, i));
    else if (!array.includes(item))
        array.push(item);
} }
function u950(array, item, equal) { if (Array.isArray(item))
    item.forEach(i => u950(array, i, equal));
else if (!array.find(equal))
    array.push(item); }
function z951(array, item, except) { if (Array.isArray(item))
    item.forEach(i => z951(array, i, except));
else if (!array.find(except))
    array.push(item); }
function g952(...args) { if (enableAsserts) {
    console.assert(...args);
} }
function p953(...args) { if (enableAsserts)
    console.error(...args); }
function s954(str, trim) { while (str.length >= trim.length && str.substring(0, trim.length) == trim)
    str = str.substring(trim.length); return str; }
function h955(str, trim) { while (str.length >= trim.length && str.substring(str.length - trim.length) == trim)
    str = str.substring(0, str.length - trim.length); return str; }
function a956(i4091) { const fills = []; for (const fill of i4091) {
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
            const d4206 = [[0, 1, 0], [0.5, 0.5, 1], [1, 1, 1]];
            let c4207 = [[p0.x, p1.x, p2.x], [p0.y, p1.y, p2.y], [1, 1, 1]];
            c4207 = y889(d4206, f891(c4207));
            c4207 = [c4207[0], c4207[1]];
            const stops = [];
            for (const stop of fill[2]) {
                stops.push({ color: { r: Math.min(Math.max(0, stop[0]), 1), g: Math.min(Math.max(0, stop[1]), 1), b: Math.min(Math.max(0, stop[2]), 1), a: Math.min(Math.max(0, stop[3]), 1) }, position: stop[4] });
            }
            fills.push({ type: fill[0], gradientTransform: c4207, gradientStops: stops, blendMode: fill[3] });
            break;
        }
    }
} return fills; }
function h957(type) { return f1089.includes(type); }
const q1056 = 'LIST#';
const h1057 = 'NLIST#';
const v1058 = 'TLIST#';
const s1059 = 'SLIST#';
const p1060 = 'NULL';
const x1061 = 'VAR';
const y1062 = 'VARGRP';
const g1063 = 'FEEDBK';
const s1064 = 'REPT';
const z1065 = 'CACHE';
const j1066 = 'FRZ';
const v1067 = 'TIMER';
const f1068 = 'VNAME';
const r1352 = 'GVNAMES';
const d1353 = 'VNAMES';
const x1354 = 'ONAME';
const u1069 = 'CMB';
const n1070 = 'LSASIT';
const j1071 = 'EXTR';
const f1072 = 'SETP';
const t1073 = 'GETP';
const b1074 = 'SUBLST';
const k1075 = 'UNIQ';
const b1349 = 'RORD';
const o1350 = 'SHFTLST';
const i1076 = 'REVLST';
const t1351 = 'BUKLST';
const o1077 = 'SORT';
const t1078 = 'CLMN';
const b1079 = 'CELL';
const u1080 = 'LIST';
const k1081 = 'COUNT';
const OBJECT_COUNT = 'OBJCOUNT';
const o1082 = 'LCONT';
const w1083 = 'SELECT';
const w1360 = 'LSTSEL';
const r1084 = 'IF';
const z1085 = 'LSTFLT';
const z1087 = 'ANY#';
const x1088 = [q1056, h1057, v1058, s1059, u1069, j1071, f1072, t1073, b1074, u1080, k1081, o1082, s1064];
const f1089 = [q1056, h1057, v1058, s1059];
const v1086 = 'ITER';
const l1108 = 'PROB';
const HOLD = 'HOLD';
const n1091 = 'NUM#';
const x1092 = 'NUM';
const v1355 = 'NPREC';
const t1093 = 'NSIGN';
const q1094 = 'ABS';
const p1356 = 'NEG';
const f1095 = 'ROUND';
const z1357 = 'QUANT';
const s1096 = 'SMINMAX';
const c1097 = 'MINMAX';
const k1098 = 'LIM';
const j1099 = 'NCURVE';
const e1358 = 'NMAP';
const k1359 = 'NBIAS';
const s1100 = 'NANISNUM';
const c1101 = 'CONST';
const h1102 = 'DATE';
const q1103 = 'SEQ';
const w1104 = 'RANGE';
const y1105 = 'WAVE';
const f1106 = 'RAND';
const d1107 = 'NOISE';
const l1109 = 'ACCUM';
const e1110 = 'LERP';
const c1111 = 'SOLVE';
const n1112 = 'NANIM';
const u1113 = 'SMATH';
const x1114 = 'MATH';
const f1115 = 'ADD';
const i1116 = 'SUB';
const b1117 = 'MUL';
const p1118 = 'DIV';
const t1119 = 'MOD';
const d1120 = 'EXP';
const j1121 = 'NBOOL';
const x1122 = 'NOT';
const z1123 = 'AND';
const o1124 = 'OR';
const a1125 = 'XOR';
const l1126 = 'COND';
const m1127 = 'EQ';
const c1128 = 'NE';
const v1129 = 'LT';
const r1130 = 'LE';
const f1131 = 'GT';
const d1132 = 'GE';
const k1133 = 'TRIG';
const j1134 = 'SIN';
const r1135 = 'COS';
const c1136 = 'TAN';
const x1137 = 'ATAN2';
const z1138 = 'CNVANG';
const g1090 = [p1060, x1061, y1062, ...x1088, n1070, j1071, f1072, t1073, b1074, k1075, b1349, o1350, i1076, t1351, t1078, o1077, b1079, u1080, w1083, w1360, r1084, z1085, g1063, s1064, v1086, l1108, HOLD, z1065, j1066, v1067, f1068, r1352, d1353, x1354];
const s1139 = [x1114, u1113, f1115, i1116, b1117, p1118, t1119, d1120];
const t1140 = [j1121, x1122, z1123, o1124, a1125];
const r1141 = [l1126, m1127, c1128, v1129, r1130, f1131, d1132];
const n1142 = [k1133, j1134, r1135, c1136, x1137];
const l1143 = 'TEXT#';
const a1144 = 'TEXT';
const d1145 = 'TLEN';
const z1146 = 'TTRIM';
const d1147 = 'TSUB';
const v1148 = 'TCONT';
const l1149 = 'TCASE';
const w1150 = 'TREPL';
const r1151 = 'TJOIN';
const n1152 = 'TPAD';
const q1153 = 'TCMP';
const f1154 = 'TCHAR';
const j1155 = 'TUNI';
const f1156 = 'INDEX';
const i1157 = 'N2T';
const b1158 = 'C2T';
const w1159 = 'T2N';
const m1160 = 'T2C';
const t1161 = 'TSPLT';
const t3504 = 'TJSON';
const q1163 = 'TCSV';
const t1164 = 'FETCH';
const y1165 = 'TFILE';
const y1166 = [n1091, h1057, x1092, v1355, t1093, q1094, p1356, f1095, z1357, s1096, c1097, k1098, j1099, e1358, k1359, s1100, c1101, h1102, q1103, w1104, y1105, f1106, d1107, l1109, e1110, c1111, n1112, i1157, f1154, ...s1139, ...t1140, ...r1141, ...n1142, z1138, t1351];
const d1167 = [l1143, v1058, a1144, d1145, z1146, d1147, v1148, l1149, r1151, n1152, w1150, q1153, j1155, f1156, w1159, m1160, t1161, t3504, q1163, t1164, y1165];
const l1168 = 'COL#';
const g1169 = 'COL';
const c1170 = 'CVAL';
const k1171 = 'CCOR';
const b1172 = 'COLP3';
const w1173 = 'CCNT';
const z1174 = 'BLND';
const m1175 = 'CLERP';
const v1176 = 'CBLND';
const m1177 = [l1168, g1169, k1171, b1172, z1174, m1175, v1176, b1158];
const y1178 = 'FILL#';
const l1179 = 'FILL';
const a1180 = [y1178, l1179];
const i1181 = 'STRK#';
const q1182 = 'STRK';
const q1183 = [i1181, q1182];
const m1190 = 'STRKSD#';
const u1191 = 'STRKSD';
const w1192 = [m1190, u1191];
const y1184 = 'CSTOP#';
const a1185 = 'CSTOP';
const s1186 = [y1184, a1185];
const m1187 = 'GRAD#';
const e1188 = 'GRAD';
const z1189 = [m1187, e1188];
const d1193 = 'RCRN#';
const f1194 = 'RCRN';
const z1195 = [d1193, f1194];
const q1196 = 'DRSH#';
const x1197 = 'DRSH';
const r1198 = [q1196, x1197];
const b1199 = 'INSH#';
const e1200 = 'INSH';
const w1201 = [b1199, e1200];
const s1202 = 'LBLR#';
const p1203 = 'LBLR';
const j1204 = [s1202, p1203];
const m1205 = 'BBLR#';
const q1206 = 'BBLR';
const q1207 = [m1205, q1206];
const q1208 = 'MASK#';
const t1209 = 'MASK';
const n1210 = [q1208, t1209];
const s1211 = 'BLEND#';
const j1212 = 'BLEND';
const q1213 = [s1211, j1212];
const v1214 = [...w1192, ...z1195, ...r1198, ...w1201, ...j1204, ...q1207, ...q1213, ...n1210];
const e1215 = [l1168, y1178, m1187, i1181, m1190, q1196, b1199, s1202, m1205, s1211, q1208];
const d1216 = 'CSTL';
const j1217 = 'SHP#';
const r1218 = 'RECT#';
const t1219 = 'RECT';
const g1220 = [r1218, t1219];
const m1221 = 'LINE#';
const y1222 = 'LINE';
const l1223 = [m1221, y1222];
const t1224 = 'ELPS#';
const h1225 = 'ELPS';
const o1226 = [t1224, h1225];
const x1227 = 'TRPZ#';
const r1228 = 'TRPZ';
const a1229 = [x1227, r1228];
const q1236 = 'POLY#';
const b1237 = 'POLY';
const h1238 = [q1236, b1237];
const m1239 = 'STAR#';
const j1240 = 'STAR';
const b1241 = [m1239, j1240];
const v1242 = 'TXTS#';
const l1243 = 'TXTS';
const m1244 = [v1242, l1243];
const u1245 = 'PT#';
const l1246 = 'PT';
const f1247 = [u1245, l1246];
const h1248 = 'PCORN';
const b1249 = 'VPATH#';
const w1250 = 'VPATH';
const g1251 = [b1249, w1250];
const g1252 = 'VPT#';
const x1253 = 'VPT';
const v1254 = [g1252, x1253];
const s1255 = 'VEDGE#';
const x1256 = 'VEDGE';
const g1257 = [s1255, x1256];
const w1258 = 'VREG#';
const b1259 = 'VREG';
const x1260 = [w1258, b1259];
const s1261 = 'VNET#';
const z1262 = 'VNET';
const q1263 = [s1261, z1262];
const y1264 = 'SGRP#';
const p1265 = 'SGRP';
const y1266 = [y1264, p1265];
const m1267 = 'FRM#';
const k1268 = 'FRM';
const r1269 = [m1267, k1268];
const x1231 = 'ARC#';
const v1230 = 'ARC';
const u1232 = [x1231, v1230];
const g1234 = 'WAVEP#';
const x1233 = 'WAVEP';
const e1235 = [g1234, x1233];
const n1270 = 'MOVE';
const c1271 = 'ROT';
const c1272 = 'SCALE';
const e1273 = 'SKEW';
const SHOW_CENTER = 'SHOWCNTR';
const j1274 = 'SCENTR';
const e1275 = 'RSTX';
const q1276 = 'PLACE';
const n1277 = 'APPLY';
const PATH_LENGTH = 'PTHLEN';
const JOIN_PATHS = 'JOINPTH';
const REORIENT_PATHS = 'REORPTH';
const d1284 = 'PTALPATH';
const o1285 = 'CPTONPATH';
const y1278 = 'MESPT';
const y1279 = 'PTANGLE';
const v1280 = 'VECLEN';
const j1281 = 'CIRCEN';
const ARC_FROM_POINTS = 'ARCPT';
const p1282 = 'INTLIN';
const p1283 = 'PTLERP';
const REVERSE_PATH = 'REVPTH';
const BLEND_PATH = 'BLENDPTH';
const PATH_TYPES = [w1250, r1228, v1230, x1233];
const PATH_VALUES = [b1249, x1227, x1231, g1234];
const q1286 = 'SBOOL';
const w1287 = 'SBOOL#';
const b1288 = 'SBOOLU';
const n1289 = 'SBOOLS';
const g1290 = 'SBOOLI';
const j1291 = 'SBOOLE';
const e1292 = [q1286, w1287, b1288, n1289, g1290, j1291];
const g1293 = 'RENDER';
const EXPORT = 'EXPORT';
const p1294 = [j1217, s1059, r1218, m1221, t1224, x1227, q1236, m1239, v1242, u1245, b1249, g1252, s1255, w1258, s1261, x1231, g1234, y1264, m1267, w1287, q1196, b1199, s1202, m1205, s1211, q1208];
const q1295 = [c1271, c1272, e1273];
const c1296 = [...p1294, ...g1220, ...l1223, ...o1226, ...a1229, ...h1238, ...b1241, ...m1244, ...f1247, h1248, ...g1251, ...v1254, ...g1257, ...x1260, ...q1263, ...u1232, ...e1235, ...y1266, ...r1269, ...e1292, n1270, ...q1295, SHOW_CENTER, j1274, e1275, q1276, n1277, PATH_LENGTH, JOIN_PATHS, REORIENT_PATHS, d1284, o1285, y1278, y1279, v1280, j1281, v1230, x1233, ARC_FROM_POINTS, p1282, p1283, REVERSE_PATH, BLEND_PATH, g1293, EXPORT];
const f1297 = [q1056, h1057, v1058, s1059, n1091, l1143, l1168, y1178, y1184, m1187, i1181, y1184, m1187, j1217, r1218, m1221, t1224, x1227, q1236, m1239, v1242, u1245, b1249, g1252, s1255, w1258, s1261, y1264, m1267, d1193, q1196, b1199, s1202, m1205, s1211, q1208];
const m1298 = 'GROUP';
const w1299 = 'GPARAM';
const w1300 = [m1298, w1299];
const z1301 = 'CMNT';
const v1302 = 'CMNTARR';
const q1303 = 'PANEL';
const o1304 = 'ACT';
const u1305 = 'BFACT';
const e1306 = 'BFLST';
const c1307 = 'DIS';
const n1308 = 'NOC';
const PARAM = 'PARAM';
const q1309 = 'LOG';
const c1310 = 'GRAPH';
const k1311 = [[t1119, '%'], [p1118, '/'], [i1116, '−'], [f1115, '+'], [b1117, '×'], [d1120, 'e<sup>x']];
const i1312 = [[p1118, '/'], [i1116, '−'], [f1115, '+'], [b1117, '×']];
const x1313 = 0;
const f1314 = 1;
const o1315 = 2;
const c1316 = 3;
const j1317 = [[x1313, 'not'], [f1314, 'xor'], [o1315, 'or'], [c1316, 'and']];
const n1318 = 0;
const j1319 = 1;
const y1320 = 2;
const b1321 = 3;
const k1322 = 4;
const w1323 = 5;
const l1324 = [[n1318, '<'], [j1319, '≤'], [y1320, '≠'], [b1321, '='], [k1322, '≥'], [w1323, '>']];
const d1325 = 0;
const x1326 = 1;
const v1327 = 2;
const o1328 = 3;
const t1329 = 4;
const c1330 = 5;
const l1331 = [[d1325, 'sin'], [x1326, 'cos'], [v1327, 'tan'], [o1328, 'asin'], [t1329, 'acos'], [c1330, 'atan']];
const a1332 = 'EMPTY';
const c1333 = 'CONNECT';
const c1334 = 'CREATE';
const w1335 = 'CREATE_INSERT';
const n1336 = 'DELETE';
const z1337 = 'DISCONNECT';
const b1338 = 'LINK_STYLE';
const i1339 = 'LINK_VARIABLE';
const j1340 = 'LINK_VARIABLE_GROUP';
const o1341 = 'MAKE_ACTIVE';
const MAKE_NOT_CONDITION_ACTION = 'MAKE_NOT_CONDITION';
const j1342 = 'MAKE_PASSIVE';
const l1343 = 'PASTE';
const l1344 = 'RECONNECT';
const v1345 = 'REMOVE';
const b1346 = 'RENAME';
const g1347 = 'REORDER_INPUTS';
const a1348 = 'REORDER_CONNECTIONS';
const i1361 = 'SELECT';
const n1362 = 'SELECT_MOVE';
const u1363 = 'MOVE_NODES';
const o1364 = 'SET_PARAM_VALUE';
const SET_MULTIPLE_VALUES_ACTION = 'SET_MULTIPLE_VALUES';
const r1365 = 'SET_PARAM_SETTING';
const k1366 = 'SET_NODE_RECT';
const g1367 = 'TOGGLE_DISABLE';
const v1368 = 'TOGGLE_PARAM_HEADER';
const j1369 = 'SET_CURRENT_GRAPH';
const a1370 = 'CREATE_PAGE';
const c1371 = 'DELETE_PAGE';
const h1372 = 'GROUP_NODES';
const e1373 = 'UNGROUP_NODES';
const z1374 = 'HIGHLIGHT_NODES';
const SCROLL_LIST_NODE_ACTION = 'SCROLL_LIST_NODE';
const SET_LIST_DIVIDER_ACTION = 'SET_LIST_DIVIDER';
const SET_NODE_PARAM_ACTION = 'SET_NODE_PARAM';
const k1375 = 'BNORM';
const r1376 = 'BDARK';
const y1377 = 'BMULT';
const k1378 = 'BPDRK';
const p1379 = 'BBURN';
const c1380 = 'BLITE';
const q1381 = 'BSCRN';
const u1382 = 'BPLGT';
const n1383 = 'BDODG';
const e1384 = 'BOVER';
const i1385 = 'BSOFT';
const t1386 = 'BHARD';
const x1387 = 'BDIFF';
const e1388 = 'BEXCL';
const h1389 = 'BHUE';
const g1390 = 'BSAT';
const o1391 = 'BCOL';
const v1392 = 'BLUM';
const r1393 = [[k1375, 'normal', 'NORMAL'], [r1376, 'darken', 'DARKEN'], [y1377, 'multiply', 'MULTIPLY'], [k1378, 'plus darker', 'LINEAR_BURN'], [p1379, 'color burn', 'COLOR_BURN'], [c1380, 'lighten', 'LIGHTEN'], [q1381, 'screen', 'SCREEN'], [u1382, 'plus lighter', 'LINEAR_DODGE'], [n1383, 'color dodge', 'COLOR_DODGE'], [e1384, 'overlay', 'OVERLAY'], [i1385, 'soft light', 'SOFT_LIGHT'], [t1386, 'hard light', 'HARD_LIGHT'], [x1387, 'difference', 'DIFFERENCE'], [e1388, 'exclusion', 'EXCLUSION'], [h1389, 'hue', 'HUE'], [g1390, 'saturation', 'SATURATION'], [o1391, 'color', 'COLOR'], [v1392, 'luminosity', 'LUMINOSITY']];
const m1394 = [['thin', 100], ['extra light', 200], ['light', 300], ['regular', 400], ['medium', 500], ['semi bold', 600], ['bold', 700], ['extra bold', 800], ['black', 900]];
const b1395 = 0;
const a1396 = 1;
const o1397 = 2;
const w1398 = 2;
const u1399 = 3;
const l1400 = 3;
const v1401 = 4;
const l1402 = 4;
const r1403 = 5;
const a1404 = 6;
const l1405 = 7;
const m1406 = 8;
const n1407 = 9;
const d1408 = 10;
const n1409 = 11;
const d1410 = 12;
const q1411 = 13;
const o1412 = 14;
const o1413 = 15;
const h1414 = 16;
const g1415 = 17;
const o1416 = 18;
const z1417 = 19;
const p1418 = 20;
const f1419 = 21;
const x1420 = 22;
const m1421 = 23;
const c1422 = 24;
const q1453 = 24;
const n1423 = 24;
const c1424 = 25;
const w1454 = 25;
const l1425 = 26;
const h1426 = 27;
const p1427 = 28;
const s1428 = 28;
const y1429 = 28;
const j1430 = 28;
const d1431 = 28;
const c1432 = 28;
const q1433 = 28;
const e1434 = 28;
const h1435 = 29;
const e1436 = 29;
const d1437 = 29;
const m1438 = 29;
const t1439 = 29;
const y1455 = 29;
const g1441 = 30;
const t1442 = 30;
const q1443 = 30;
const e1444 = 30;
const w1440 = 30;
const q1445 = 31;
const a1446 = 31;
const g1447 = 32;
const j1448 = 33;
const f1449 = 34;
const m1450 = 35;
const b1451 = 36;
const y1452 = 37;
const g2796 = '12345679ABCDEFGHJKLMNPQRSTUVWXYZ';
function j847(array, chars = g2796) { let e849 = ''; let len = array.length; let i = 0; while (len > 0) {
    if (len >= 5) {
        const a0 = array[i], a1 = array[i + 1], a2 = array[i + 2], a3 = array[i + 3], a4 = array[i + 4];
        e849 += chars[(a0 & 0xF8) >>> 3];
        e849 += chars[((a0 & 0x07) << 2) | ((a1 & 0xC0) >>> 6)];
        e849 += chars[(a1 & 0x3E) >>> 1];
        e849 += chars[((a1 & 0x01) << 4) | ((a2 & 0xF0) >>> 4)];
        e849 += chars[((a2 & 0x0F) << 1) | ((a3 & 0x80) >>> 7)];
        e849 += chars[(a3 & 0x7C) >>> 2];
        e849 += chars[((a3 & 0x03) << 3) | ((a4 & 0xE0) >>> 5)];
        e849 += chars[(a4 & 0x1F)];
    }
    else if (len == 4) {
        const a0 = array[i], a1 = array[i + 1], a2 = array[i + 2], a3 = array[i + 3];
        e849 += chars[(a0 & 0xF8) >>> 3];
        e849 += chars[((a0 & 0x07) << 2) | ((a1 & 0xC0) >>> 6)];
        e849 += chars[(a1 & 0x3E) >>> 1];
        e849 += chars[((a1 & 0x01) << 4) | ((a2 & 0xF0) >>> 4)];
        e849 += chars[((a2 & 0x0F) << 1) | ((a3 & 0x80) >>> 7)];
        e849 += chars[(a3 & 0x7C) >>> 2];
        e849 += chars[((a3 & 0x03) << 3)];
    }
    else if (len == 3) {
        const a0 = array[i], a1 = array[i + 1], a2 = array[i + 2];
        e849 += chars[(a0 & 0xF8) >>> 3];
        e849 += chars[((a0 & 0x07) << 2) | ((a1 & 0xC0) >>> 6)];
        e849 += chars[(a1 & 0x3E) >>> 1];
        e849 += chars[((a1 & 0x01) << 4) | ((a2 & 0xF0) >>> 4)];
        e849 += chars[((a2 & 0x0F) << 1)];
    }
    else if (len == 2) {
        const a0 = array[i], a1 = array[i + 1];
        e849 += chars[(a0 & 0xF8) >>> 3];
        e849 += chars[((a0 & 0x07) << 2) | ((a1 & 0xC0) >>> 6)];
        e849 += chars[(a1 & 0x3E) >>> 1];
        e849 += chars[((a1 & 0x01) << 4)];
    }
    else if (len == 1) {
        const a0 = array[i];
        e849 += chars[(a0 & 0xF8) >>> 3];
        e849 += chars[((a0 & 0x07) << 2)];
    }
    i += 5;
    len -= 5;
} return e849; }
function h848(e849, chars = g2796) { const array = []; let len = e849.length; let c = 0; while (len > 0) {
    if (len >= 8) {
        const c0 = chars.indexOf(e849[c]), c1 = chars.indexOf(e849[c + 1]), c2 = chars.indexOf(e849[c + 2]), c3 = chars.indexOf(e849[c + 3]), c4 = chars.indexOf(e849[c + 4]), c5 = chars.indexOf(e849[c + 5]), c6 = chars.indexOf(e849[c + 6]), c7 = chars.indexOf(e849[c + 7]);
        array.push((c0 << 3) | ((c1 & 0x1C) >>> 2));
        array.push(((c1 & 0x03) << 6) | (c2 << 1) | ((c3 & 0x10) >>> 4));
        array.push(((c3 & 0x0F) << 4) | ((c4 & 0x1E) >>> 1));
        array.push(((c4 & 0x01) << 7) | (c5 << 2) | ((c6 & 0x18) >>> 3));
        array.push(((c6 & 0x07) << 5) | c7);
    }
    else if (len == 7) {
        const c0 = chars.indexOf(e849[c]), c1 = chars.indexOf(e849[c + 1]), c2 = chars.indexOf(e849[c + 2]), c3 = chars.indexOf(e849[c + 3]), c4 = chars.indexOf(e849[c + 4]), c5 = chars.indexOf(e849[c + 5]), c6 = chars.indexOf(e849[c + 6]);
        array.push((c0 << 3) | ((c1 & 0x1C) >>> 2));
        array.push(((c1 & 0x03) << 6) | (c2 << 1) | ((c3 & 0x10) >>> 4));
        array.push(((c3 & 0x0F) << 4) | ((c4 & 0x1E) >>> 1));
        array.push(((c4 & 0x01) << 7) | (c5 << 2) | ((c6 & 0x18) >>> 3));
    }
    else if (len == 5) {
        const c0 = chars.indexOf(e849[c]), c1 = chars.indexOf(e849[c + 1]), c2 = chars.indexOf(e849[c + 2]), c3 = chars.indexOf(e849[c + 3]), c4 = chars.indexOf(e849[c + 4]);
        array.push((c0 << 3) | ((c1 & 0x1C) >>> 2));
        array.push(((c1 & 0x03) << 6) | (c2 << 1) | ((c3 & 0x10) >>> 4));
        array.push(((c3 & 0x0F) << 4) | ((c4 & 0x1E) >>> 1));
    }
    else if (len == 4) {
        const c0 = chars.indexOf(e849[c]), c1 = chars.indexOf(e849[c + 1]), c2 = chars.indexOf(e849[c + 2]), c3 = chars.indexOf(e849[c + 3]);
        array.push((c0 << 3) | ((c1 & 0x1C) >>> 2));
        array.push(((c1 & 0x03) << 6) | (c2 << 1) | ((c3 & 0x10) >>> 4));
    }
    else if (len == 2) {
        const c0 = chars.indexOf(e849[c]), c1 = chars.indexOf(e849[c + 1]);
        array.push((c0 << 3) | ((c1 & 0x1C) >>> 2));
    }
    c += 8;
    len -= 8;
} return array; }
function logSavedNode(nodeKey, o4006) {
    return __awaiter(this, void 0, void 0, function* () { const log = v2119(yield y1563(nodeKey, false)); if (o4006) {
        console.log('%c%s\n%c%s', 'background: #fa24; color: white;', w1054(nodeKey), 'background: #fa44; color: #edc;', log);
    }
    else {
        console.log('%c%s\n%c%s', 'background: #fdb; color: black;', w1054(nodeKey), 'background: #fed; color: black;', log);
    } });
}
function v2119(json) { let a4032 = json.replace('{\n', '').replace('\n}', '').replace('[\n' + t870, '').replace('\n' + t870 + ']', '').split(t870 + '"params":\n').join('').split('": "').join(': ').split('", "').join(': ').split(t870 + '"').join(t870).split(t870 + t870 + '["').join(t870 + t870).split('",\n').join('\n').split('"\n').join('\n').split('"],\n').join('\n'); if (a4032[a4032.length - 1] == '"')
    a4032 = a4032.substring(0, a4032.length - 1); if (a4032.substring(a4032.length - 2) == '"]')
    a4032 = a4032.substring(0, a4032.length - 2); return a4032; }
function s2120(json) { let a4032 = json.replace('{\n', '').replace('\n}', '').replace('[\n' + t870, '').replace('\n' + t870 + ']', ''); return a4032; }
function d2121(f243, o4006) { const g4210 = i924(f243, true); if (o4006) {
    console.log('%c%s', 'background: #4f44; color: #ded', g4210);
}
else {
    console.log('%c%s', 'background: #cfc; color: black;', g4210);
} }
console.clear();
figma.payments.setPaymentStatusInDevelopment({ type: 'PAID' });
figma.loadAllPagesAsync().then(() => { figma.on('documentchange', j1534); figma.on('selectionchange', d1542); figma.on('close', i1535); });
m1524(true);
figma.clientStorage.getAsync('pro').then(data => { figma.showUI(__html__, { visible: false, themeColors: true, title: 'Generator' }); });
var z2708 = figma.viewport.zoom;
setInterval(j1539, 100);
var strBackgrounds = '';
setInterval(figCheckBackgrounds, 500);
const c2797 = 'clock_';
const d2798 = 1000;
var f2799 = false;
var objectCenterSize = 15;
function f1536() { (function () {
    return __awaiter(this, void 0, void 0, function* () { figma.currentPage.loadAsync().then(() => __awaiter(this, void 0, void 0, function* () { let r2800 = yield figma.currentPage.getPluginData(figma.currentUser.id + ',windowWidth'); let q2801 = yield figma.currentPage.getPluginData(figma.currentUser.id + ',windowHeight'); let m2802; let j2803; if (r2800 === NULL) {
        m2802 = 800;
        figma.currentPage.setPluginData(figma.currentUser.id + ',windowWidth', r2800.toString());
    }
    else
        m2802 = parseInt(r2800); if (q2801 === NULL) {
        j2803 = 600;
        figma.currentPage.setPluginData(figma.currentUser.id + ',windowHeight', q2801.toString());
    }
    else
        j2803 = parseInt(q2801); figma.ui.resize(Math.max(minWindowWidth, m2802), Math.max(minWindowHeight, j2803)); figma.ui.show(); const fonts = yield figma.listAvailableFontsAsync(); const eula = (yield figma.clientStorage.getAsync('eula')) === 'true'; const tutorials = (yield figma.clientStorage.getAsync('tutorials')) === 'true'; const isLocked = yield c1541(); p1543({ cmd: 'uiReturnFigStartGenerator', currentUser: figma.currentUser, viewportRect: figma.viewport.bounds, viewportZoom: figma.viewport.zoom, fonts: fonts, eula: eula, tutorials: tutorials, isLocked: isLocked, windowWidth: m2802, windowHeight: j2803 }); })); });
})(); }
function x1537() { m1524(); figma.showUI(__html__, { visible: false, themeColors: true }); }
function i1538() { setInterval(u1540, d2798); }
function j1539() { if (figma.viewport.zoom == z2708)
    return; z2708 = figma.viewport.zoom; x2696(); r1557(); j1559(); }
function figCheckBackgrounds() { if (strBackgrounds != JSON.stringify(figma.currentPage.backgrounds)) {
    r1557();
    strBackgrounds = JSON.stringify(figma.currentPage.backgrounds);
} }
function u1540() { z1564(c2797 + figma.currentUser.sessionId.toString(), Date.now().toString()); }
function c1541() {
    return __awaiter(this, void 0, void 0, function* () { yield figma.currentPage.loadAsync(); const clocks = figma.currentPage.getPluginDataKeys().filter(k => k.length > c2797.length && k.substring(0, c2797.length) == c2797 && k.substring(c2797.length) != figma.currentUser.sessionId.toString()).map((k) => __awaiter(this, void 0, void 0, function* () { return parseInt(yield y1563(k)); })); clocks.sort(); const now = Date.now(); const locked = clocks.length > 0 && now - (yield clocks[clocks.length - 1]) < d2798 * 2; return locked; });
}
function d1542() { x2696(); }
var q2729 = new Array();
var u2731 = new Array();
function figGetObjectsFromIds(objectIds) {
    return __awaiter(this, void 0, void 0, function* () { for (let i = t2765.length - 1; i >= 0; i--)
        if (!t2765[i].removed && objectIds.includes(t2765[i].getPluginData('objectId')))
            t2765.splice(i, 1); for (let i = r2781.length - 1; i >= 0; i--)
        if (r2781[i].removed || objectIds.includes(r2781[i].getPluginData('objectId')))
            r2781.splice(i, 1); yield figma.currentPage.loadAsync(); return figma.currentPage.findAll(o => objectIds.includes(o.getPluginData('objectId'))); });
}
function e1523(nodeIds) {
    return __awaiter(this, void 0, void 0, function* () { for (let i = t2765.length - 1; i >= 0; i--)
        if (!t2765[i].removed && nodeIds.includes(t2765[i].getPluginData('nodeId')))
            t2765.splice(i, 1); for (let i = r2781.length - 1; i >= 0; i--)
        if (r2781[i].removed || nodeIds.includes(r2781[i].getPluginData('nodeId')))
            r2781.splice(i, 1); yield figma.currentPage.loadAsync(); figma.currentPage.findAll(o => nodeIds.includes(o.getPluginData('nodeId'))).forEach(o => { if (!o.removed)
        o.remove(); }); q2729 = q2729.filter(a => !nodeIds.includes(a.nodeId)); });
}
function m1524(v1525 = false) { for (const f1530 of figma.currentPage.children) {
    if (f1530.removed)
        continue;
    if (f1530.getPluginData('objectId') != '' && f1530.getPluginData('userId') == figma.currentUser.id && (parseInt(f1530.getPluginData('retain')) == 0 || v1525))
        f1530.remove();
} }
function x1526(nodeIds, p1527) { for (let i = q2729.length - 1; i >= 0; i--) {
    const e2730 = q2729[i];
    if (!nodeIds.includes(e2730.nodeId))
        continue;
    for (let j = e2730.objects.length - 1; j >= 0; j--) {
        const f1530 = e2730.objects[j];
        if (f1530.removed || !f1528(f1530, p1527)) {
            if (!f1530.removed)
                f1530.remove();
            v943(e2730.objects, f1530);
            if (t2765.includes(f1530))
                v943(t2765, f1530);
            if (r2781.includes(f1530))
                v943(r2781, f1530);
        }
        if (!f1530.removed) {
            if (parseInt(f1530.getPluginData('retain')) == 2)
                o1549(f1530);
        }
    }
    if (isEmpty(e2730.objects))
        v943(q2729, e2730);
} }
function f1528(f1530, p1527) { if (f1530.type == p1265 || f1530.type == k1268) {
    for (const child of f1530.children) {
        const found = f1528(child, p1527);
        if (found)
            return found;
    }
}
else {
    const found = p1527.find(o => f1530.getPluginData('objectId') == o[o1397] && f1530.getPluginData('userId') == figma.currentUser.id || o[r1403] == 2 && o[r1403] == f1530.getPluginData('retain'));
    if (found)
        return found;
} return null; }
function e1531(nodeIds, y1532) { figma.getLocalPaintStylesAsync().then(paintStyles => { paintStyles.filter(s => nodeIds.includes(s.getPluginData('nodeId'))).forEach(s => { const nodeId = s.getPluginData('nodeId'); const existing = p923(s.getPluginData('existing')); if (!existing) {
    s.remove();
}
else if (y1532) {
    l945(u2731, a => a.nodeId == nodeId);
    s.setPluginData('type', NULL);
    s.setPluginData('nodeId', NULL);
    s.setPluginData('existing', NULL);
} }); }); if (y1532)
    u2731 = u2731.filter(a => !nodeIds.includes(a.nodeId)); }
var d1533 = false;
function j1534(e) { for (const change of e.documentChanges) {
    switch (change.type) {
        case 'STYLE_CREATE':
            if (!change.style)
                break;
            if (!d1533) {
                change.style.setPluginData('type', NULL);
                change.style.setPluginData('nodeId', NULL);
                change.style.setPluginData('existing', NULL);
            }
            break;
        case 'STYLE_PROPERTY_CHANGE': {
            if (!change.style)
                break;
            if (!d1533) {
                const msg = { cmd: 'uiStylePropertyChange', styleId: h946(change.id), properties: change.properties, name: '', paints: [] };
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
                p1543(msg);
            }
            break;
        }
        case 'STYLE_DELETE':
            p1543({ cmd: 'uiStyleDelete', styleId: change.id });
            break;
    }
} d1533 = false; }
function i1535() { m1524(); p1543({ cmd: 'updateMetrics' }); }
figma.ui.onmessage = function (msg) { msg = JSON.parse(msg); if (msg.cmd == 'returnUiGetValueForFigma')
    return; switch (msg.cmd) {
    case 'figStartGenerator':
        f1536();
        break;
    case 'figRestartGenerator':
        x1537();
        break;
    case 'figFinishStart':
        i1538();
        break;
    case 'figDockWindowNormal':
        l2738('normal');
        break;
    case 'figDockWindowMaximize':
        l2738('maximize');
        break;
    case 'figDockWindowTop':
        l2738('top');
        break;
    case 'figDockWindowLeft':
        l2738('left');
        break;
    case 'figDockWindowRight':
        l2738('right');
        break;
    case 'figDockWindowBottom':
        l2738('bottom');
        break;
    case 'figGetMousePosition':
        s1609(msg.clientPosition);
        break;
    case 'figResizeWindow':
        m1612(msg.width, msg.height);
        break;
    case 'figSetWindowRect':
        z1610(msg.x, msg.y, msg.width, msg.height);
        break;
    case 'figNotify':
        p1613(msg);
        break;
    case 'figGetLocalData':
        x1561(msg.key);
        break;
    case 'figSetLocalData':
        x1562(msg.key, msg.value);
        break;
    case 'figClearAllLocalData':
        s4027();
        break;
    case 'figGetPageData':
        y1563(msg.key);
        break;
    case 'figSetPageData':
        z1564(msg.key, msg.value);
        break;
    case 'figSavePages':
        v1569(msg.pageIds, msg.pageJson, msg.currentPageId);
        break;
    case 'figLoadNodesAndConns':
        i1566(msg.debugMode);
        break;
    case 'figSaveNodes':
        x1570(msg.nodeIds, msg.nodeJson);
        break;
    case 'figGetAllLocalTemplateNames':
        k2735();
        break;
    case 'figSaveLocalTemplate':
        s1571(msg.s4028, msg.template);
        break;
    case 'figRemoveConnsToNodes':
        z1572(msg.nodeIds);
        break;
    case 'figRemoveSavedNodesAndConns':
        j1573(msg.nodeIds);
        break;
    case 'figRemoveAllSavedNodesAndConns':
        b1574();
        break;
    case 'figLogAllSavedNodesAndConns':
        s1575(msg.o4006);
        break;
    case 'figLogAllSavedNodes':
        z1576(msg.o4006);
        break;
    case 'figLogAllSavedConns':
        n1577(msg.o4006);
        break;
    case 'figLogAllSavedPageKeys':
        f1578(msg.o4006);
        break;
    case 'figLogAllSavedPages':
        g1579(msg.o4006);
        break;
    case 'figLogAllSavedConnKeys':
        e1580(msg.o4006);
        break;
    case 'figLogAllLocalData':
        n1581(msg.o4006);
        break;
    case 'figGetValue':
        w1582(msg.key, msg.spec);
        break;
    case 'figRemoveSavedPage':
        y1584(msg.pageId);
        break;
    case 'figRemoveAllSavedPages':
        b1585();
        break;
    case 'figSaveConnection':
        i1586(msg.key, msg.json);
        break;
    case 'figSaveConnections':
        h1587(msg.keys, msg.json);
        break;
    case 'figUpdateSavedConnections':
        t1588(msg.curKeys, msg.newKeys, msg.json);
        break;
    case 'figDeleteSavedConnection':
        l1589(msg.key);
        break;
    case 'figRemoveAllSavedConnections':
        i1590();
        break;
    case 'figDeleteSavedConnectionsToNode':
        n1591(msg.nodeId);
        break;
    case 'figDeleteSavedConnectionsFromNode':
        b1592(msg.nodeId);
        break;
    case 'figRemovePluginDataFromAllLocalStyles':
        z1593();
        break;
    case 'figGetAllLocalVariables':
        g1617(msg.nodeId, msg.px, msg.py);
        break;
    case 'figLinkNodeToVariable':
        x1619(msg.nodeId, msg.variableId);
        break;
    case 'figUpdateVariable':
        figUpdateVariableAsync(msg.variableId, msg.value);
        break;
    case 'figGetAllLocalColorStyles':
        f1594(msg.nodeId, msg.px, msg.py);
        break;
    case 'figLinkNodeToExistingColorStyle':
        w1595(msg.nodeId, msg.styleId);
        break;
    case 'figExport':
        figExport(msg.objectIds, msg.scale, msg.format, msg.suffix);
        break;
    case 'figGetObjectSize':
        t1548(msg.object);
        break;
    case 'figGetVariableUpdates':
        r1583(msg.linkedVarIds);
        break;
    case 'figUpdateShowIds':
        f2799 = msg.f2799;
        break;
    case 'figUpdateObjectCenterSize':
        objectCenterSize = msg.objectCenterSize;
        break;
    case 'figDeleteAllObjects':
        m1524();
        break;
    case 'figUpdateObjectsAndStyles':
        y2744 = 0;
        p2745 = 0;
        msg.objects.forEach(o => o.counted = false);
        f2732(null, msg.objects, msg.m4020, msg.z2067, msg.nodeIds, msg.l2761, msg.e2762, msg.a270);
        x1600(msg);
        break;
    case 'figDeleteObjectsAndStyles':
        e1523(msg.nodeIds);
        e1531(msg.nodeIds, msg.y1532);
        break;
    case 'figDeleteObjectsExcept':
        x1526(msg.nodeIds, msg.ignoreObjects);
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
} p1543({ cmd: 'uiEndFigMessage', msgCmd: msg.cmd }); };
function p1543(msg) { figma.ui.postMessage(JSON.stringify(msg)); }
function s2733(key) {
    return __awaiter(this, void 0, void 0, function* () { return yield figma.clientStorage.getAsync(key); });
}
function x1561(key) { figma.currentPage.loadAsync().then(() => { if (key == 'canvasEmpty') {
    p1543({ cmd: 'uiReturnFigGetLocalData', key: key, value: figma.currentPage.children.length == 0 });
}
else if (key == 'debugWarningCrash') {
    figma.clientStorage.getAsync('debugWarning').then(data => { p1543({ cmd: 'uiReturnFigGetLocalData', key: key, value: data }); });
}
else {
    figma.clientStorage.getAsync(key).then(data => { p1543({ cmd: 'uiReturnFigGetLocalData', key: key, value: data }); });
} }); }
function x1562(key, value, postToUi = true) { figma.clientStorage.setAsync(key, value); if (postToUi) {
    p1543({ cmd: 'uiReturnFigSetLocalData', key: key, value: value });
} }
function s4027() {
    return __awaiter(this, void 0, void 0, function* () { const keys = yield figma.clientStorage.keysAsync(); for (const key of keys)
        figma.clientStorage.deleteAsync(key); });
}
function y1563(key, postToUi = true) {
    return __awaiter(this, void 0, void 0, function* () { yield figma.currentPage.loadAsync(); const data = figma.currentPage.getPluginData(key); if (postToUi) {
        p1543({ cmd: 'uiReturnFigGetPageData', key: key, value: data });
    } return data; });
}
function z1564(key, value) { b1565(key); figma.currentPage.setPluginData(key, value); }
function b1565(key) { figma.currentPage.setPluginData(key, ''); }
function i1566(debugMode) { figma.currentPage.loadAsync().then(() => { const pageKeys = figma.currentPage.getPluginDataKeys().filter(k => i1050(k)); const nodeKeys = figma.currentPage.getPluginDataKeys().filter(k => l1051(k)); const connKeys = figma.currentPage.getPluginDataKeys().filter(k => x1052(k)); if (!debugMode)
    t1568(nodeKeys, connKeys); const pages = pageKeys.map(k => figma.currentPage.getPluginData(k)); const nodes = nodeKeys.map(k => figma.currentPage.getPluginData(k)); const c2138 = connKeys.map(k => figma.currentPage.getPluginData(k)); const pageOrder = figma.currentPage.getPluginData('pageOrder').split(','); const currentPageId = figma.currentPage.getPluginData('currentPageId'); l1567(nodes); const showAllColorSpaces = figma.currentPage.getPluginData('showAllColorSpaces'); p1543({ cmd: 'uiReturnFigLoadNodesAndConns', showAllColorSpaces: showAllColorSpaces, pageKeys: pageKeys, pageJson: pages, pageOrder: pageOrder, currentPageId: currentPageId, nodeKeys: nodeKeys, nodeJson: nodes, connKeys: connKeys, connJson: c2138 }); }); }
function l1567(nodes) { u2731 = []; figma.getLocalPaintStylesAsync().then(paintStyles => { for (const t3019 of nodes) {
    const node = JSON.parse(t3019);
    if (node.type == d1216) {
        const style = paintStyles.find(s => { const nodeId = s.getPluginData('nodeId'); return nodeId == node.id; });
        if (style) {
            u2731.push({ nodeId: node.id, existing: p923(node.existing), styles: [style] });
        }
    }
} }); }
function t1568(nodeKeys, connKeys) { figma.currentPage.loadAsync().then(() => { const b2734 = '"loading": "true"'; const not = '{\n'; const set = '{\n' + t870 + b2734 + ',\n'; nodeKeys.forEach(k => figma.currentPage.setPluginData(k, figma.currentPage.getPluginData(k).replace(set, not).replace(not, set))); connKeys.forEach(k => figma.currentPage.setPluginData(k, figma.currentPage.getPluginData(k).replace(set, not).replace(not, set))); }); }
function v1569(pageIds, pageJson, currentPageId) { for (let i = 0; i < pageIds.length; i++) {
    z1564(z922(pageIds[i]), pageJson[i]);
} z1564('pageOrder', pageIds.join(',')); z1564('currentPageId', currentPageId); }
function x1570(nodeIds, nodeJson) { for (let i = 0; i < nodeIds.length; i++) {
    z1564(g920(nodeIds[i]), nodeJson[i]);
} }
function k2735() {
    return __awaiter(this, void 0, void 0, function* () { let keys = yield figma.clientStorage.keysAsync(); keys = keys.filter(k => k.length >= y878.length && k.substring(0, y878.length) == y878); p1543({ cmd: 'uiReturnGetAllLocalTemplateNames', templateNames: keys }); });
}
function s1571(s4028, template) { x1562(y878 + ' ' + s4028, template); }
function z1572(nodeIds) { figma.currentPage.loadAsync().then(() => { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => x1052(k)); for (const key of connKeys) {
    const parts = n1055(key).split(' ');
    if (nodeIds.includes(parts[0]) || nodeIds.includes(parts[2]))
        b1565(key);
} }); }
function j1573(nodeIds) { figma.currentPage.loadAsync().then(() => { z1572(nodeIds); const nodeKeys = figma.currentPage.getPluginDataKeys().filter(k => l1051(k) && nodeIds.includes(w1054(k))); nodeKeys.forEach(k => b1565(k)); }); }
function b1574() { figma.currentPage.loadAsync().then(() => { const nodeKeys = figma.currentPage.getPluginDataKeys().filter(k => l1051(k)); const connKeys = figma.currentPage.getPluginDataKeys().filter(k => x1052(k)); for (const key of nodeKeys)
    b1565(key); for (const key of connKeys)
    b1565(key); }); }
function s1575(o4006) {
    return __awaiter(this, void 0, void 0, function* () { yield z1576(o4006); n1577(o4006); });
}
function z1576(o4006) {
    return __awaiter(this, void 0, void 0, function* () { yield figma.currentPage.loadAsync(); figma.currentPage.getPluginDataKeys().filter(k => l1051(k)).forEach((k) => __awaiter(this, void 0, void 0, function* () { return yield logSavedNode(k, o4006); })); });
}
function n1577(o4006) { figma.currentPage.loadAsync().then(() => { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => x1052(k)); connKeys.sort((key1, key2) => { const p1 = n1055(key1).split(' '); const p2 = n1055(key2).split(' '); if (p1[2] != p2[2])
    return p1[2] < p2[2] ? -1 : 1; if (p1[3] != p2[3])
    return parseInt(p1[3]) - parseInt(p2[3]); if (p1[2] == p2[0])
    return -1; if (p2[2] == p1[0])
    return 1; return 0; }); connKeys.forEach(k => d2121(JSON.parse(figma.currentPage.getPluginData(k)), o4006)); }); }
function f1578(o4006) { figma.currentPage.loadAsync().then(() => { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => i1050(k)); connKeys.forEach(k => console.log('%c' + k, 'background: #fff; color: ' + (o4006 ? 'black' : 'white'))); const pageOrder = figma.currentPage.getPluginData('pageOrder'); console.log('%c' + pageOrder, 'background: #fff; color: ' + (o4006 ? 'black' : 'white')); }); }
function g1579(o4006) { figma.currentPage.loadAsync().then(() => { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => i1050(k)); connKeys.forEach(k => console.log('%c' + figma.currentPage.getPluginData(k), 'background: #fff; color: ' + (o4006 ? 'black' : 'white'))); const pageOrder = figma.currentPage.getPluginData('pageOrder'); console.log('%c' + pageOrder, 'background: #fff; color: ' + (o4006 ? 'black' : 'white')); }); }
function e1580(o4006) { figma.currentPage.loadAsync().then(() => { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => x1052(k)); connKeys.forEach(k => console.log('%c' + k, 'background: #dff; color: ' + (o4006 ? 'black' : 'white'))); }); }
function n1581(o4006) { figma.clientStorage.keysAsync().then(keys => keys.forEach(k => figma.clientStorage.getAsync(k).then(val => console.log(k + ': ' + val)))); }
function w1582(key, spec) {
    return __awaiter(this, void 0, void 0, function* () { let result = null; switch (key) {
        case 'getVariableData':
            result = yield z1618(spec);
            break;
        case 'getPaidStatus':
            result = figma.payments.status.type;
            break;
        case 'figSubscribe': {
            yield figma.payments.initiateCheckoutAsync({ interstitial: 'PAID_FEATURE' });
            result = figma.payments.status.type;
            break;
        }
    } p1543({ cmd: 'returnFigGetValue', value: result }); });
}
function r1583(varIds) { z1618(varIds).then(values => { p1543({ cmd: 'uiReturnFigGetVariableUpdates', values: values }); }); }
function y1584(pageId) {
    return __awaiter(this, void 0, void 0, function* () { b1565(e932(pageId)); const pageOrder = (yield y1563('pageOrder')).split(','); l945(pageOrder, id => id == pageId); z1564('pageOrder', pageOrder.join(',')); });
}
function b1585() { figma.currentPage.loadAsync().then(() => { const pageKeys = figma.currentPage.getPluginDataKeys().filter(k => i1050(k)); pageKeys.forEach(k => b1565(k)); b1565('pageOrder'); }); }
function i1586(key, json) { z1564(key, json); }
function h1587(_keys, _json) { const keys = JSON.parse(_keys); const json = JSON.parse(_json); for (let i = 0; i < keys.length; i++)
    z1564(keys[i], json[i]); }
function t1588(_curKeys, _newKeys, _json) { const curKeys = JSON.parse(_curKeys); const newKeys = JSON.parse(_newKeys); const json = JSON.parse(_json); for (let i = 0; i < curKeys.length; i++) {
    b1565(curKeys[i]);
    z1564(newKeys[i], json[i]);
} }
function l1589(key) { b1565(key); }
function i1590() { figma.currentPage.loadAsync().then(() => { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => x1052(k)); connKeys.forEach(k => b1565(k)); }); }
function n1591(nodeId) { figma.currentPage.loadAsync().then(() => { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => x1052(k)); for (const key of connKeys) {
    const parts = key.split(' ');
    if (parts[4] == nodeId)
        b1565(key);
} }); }
function b1592(nodeId) { figma.currentPage.loadAsync().then(() => { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => x1052(k)); for (const key of connKeys) {
    const parts = key.split(' ');
    if (parts[1] == nodeId)
        b1565(key);
} }); }
function z1593() { figma.getLocalPaintStylesAsync().then(f1597 => { for (const style of f1597) {
    style.setPluginData('type', '');
    style.setPluginData('nodeId', '');
    style.setPluginData('existing', '');
} }); }
function figSaveSnapshot(index, objectIds) {
    return __awaiter(this, void 0, void 0, function* () { const objects = yield figGetObjectsFromIds(objectIds); const group = figma.group(objects, figma.currentPage); const settings = { format: 'PNG' }; const icon = yield group.exportAsync(settings); figma.ungroup(group); p1543({ cmd: 'uiReturnFigSaveSnapshot', index: index, iconWidth: group.width, iconHeight: group.height, icon: icon }); });
}
var e2736 = null;
var m4029 = () => e2736 = null;
var h2737 = 'normal';
function s1609(clientPosition) { p1543({ cmd: 'uiReturnFigGetMousePosition', position: { x: 0, y: 0 }, clientPosition: clientPosition, viewportZoom: figma.viewport.zoom, viewportRect: figma.viewport.bounds }); }
function z1610(x, y, width, height) { return; }
function m1611(dock, rect, bounds) { switch (dock) {
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
function m1612(width, height) { (function () {
    return __awaiter(this, void 0, void 0, function* () { width = Math.floor(Math.max(0, width)); height = Math.floor(Math.max(0, height)); figma.ui.resize(width, height); yield figma.currentPage.loadAsync(); figma.currentPage.setPluginData(figma.currentUser.id + ',windowWidth', width.toString()); figma.currentPage.setPluginData(figma.currentUser.id + ',windowHeight', height.toString()); p1543({ cmd: 'uiReturnFigResizeWindow', width: width, height: height }); });
})(); }
function l2738(dock) {
    return __awaiter(this, void 0, void 0, function* () { if (dock != 'normal' && h2737 == 'normal') {
        figma.clientStorage.setAsync('normalWindowX', yield figma.clientStorage.getAsync('normalWindowX'));
        figma.clientStorage.setAsync('normalWindowY', yield figma.clientStorage.getAsync('normalWindowY'));
        figma.clientStorage.setAsync('normalWindowWidth', yield figma.clientStorage.getAsync('normalWindowWidth'));
        figma.clientStorage.setAsync('normalWindowHeight', yield figma.clientStorage.getAsync('normalWindowHeight'));
    } h2737 = dock; figma.clientStorage.setAsync('windowDock', dock); m1612(yield figma.clientStorage.getAsync('windowWidth'), yield figma.clientStorage.getAsync('windowHeight')); });
}
function p1613(msg) { e1614(msg.text, msg.prefix, msg.delay, msg.error, msg.q1615, msg.b1616); }
function e1614(text, prefix = 'Generator ', delay = 400, error = false, q1615 = '', b1616 = NULL) { const options = { timeout: delay, error: error, onDequeue: m4029 }; if (q1615 != '') {
    options['button'] = { text: q1615 };
    if (b1616.substring(0, 'removeConnection'.length) == 'removeConnection') {
        options['button']['action'] = () => l1589(b1616.split(',')[1]);
    }
    else {
        switch (b1616) {
            case 'hideClearUndoWarning':
                options['button']['action'] = () => p1543({ cmd: 'uiHideClearUndoWarning' });
                break;
        }
    }
} if (e2736)
    e2736.cancel(); e2736 = figma.notify(prefix + text, options); }
function m2739(key, params = null) {
    return __awaiter(this, void 0, void 0, function* () { return yield a2740(key, params); });
}
function a2740(key, params = null) {
    return __awaiter(this, void 0, void 0, function* () { return new Promise((resolve, reject) => { const timeout = 60000; p1543(Object.assign({ cmd: 'uiGetValueForFigma', key: key }, (params || {}))); const l2741 = setTimeout(() => reject(new Error('Timeout: Result not received by Figma within the specified time')), timeout); function h4030(msg) { msg = JSON.parse(msg); if (msg.cmd === 'returnUiGetValueForFigma') {
        clearTimeout(l2741);
        resolve({ key: msg.key, value: msg.value });
        figma.ui.off('message', h4030);
    } } figma.ui.on('message', h4030); }); });
}
var m2742 = [];
var g2743 = [];
var y2744 = 0;
var p2745 = 0;
function z1544(l111) { return (l111[r1403] === 2 ? '' : v874) + (f2799 ? l111[o1397] : l111[u1399]); }
function g1545(j1529, addObject = null, addProps = true, transform = true) {
    return __awaiter(this, void 0, void 0, function* () { if (!j1547(j1529))
        return null; let f1530; switch (j1529[b1395]) {
        case t1219:
            f1530 = i2713(j1529, addProps, transform);
            break;
        case y1222:
            f1530 = f2792(j1529, addProps, transform);
            break;
        case h1225:
            f1530 = x2788(j1529, addProps, transform);
            break;
        case b1237:
            f1530 = g2709(j1529, addProps, transform);
            break;
        case j1240:
            f1530 = e2716(j1529, addProps, transform);
            break;
        case l1243:
            f1530 = m2719(j1529, addProps, transform);
            break;
        case l1246:
            f1530 = a2695(j1529);
            break;
        case w1250:
            f1530 = t2747(j1529, addProps, transform);
            break;
        case z1262:
            f1530 = g2748(j1529, addProps, transform);
            break;
        case q1286:
            f1530 = yield k2749(j1529, addProps, transform);
            break;
        case p1265:
            f1530 = yield w2750(j1529);
            break;
        case k1268:
            f1530 = yield e2751(j1529, addProps, transform);
            break;
    } if (addObject && f1530 != undefined && f1530 != null && !f1530.removed) {
        f1530.name = z1544(j1529);
        g952(j1529[b1395] == p1265 || !!f1530, 'no Figma object created');
        if (f1530 != undefined && f1530 != null) {
            f1530.setPluginData('retain', j1529[r1403].toString());
            if (j1529[r1403] < 2) {
                f1530.setPluginData('userId', figma.currentUser.id);
                f1530.setPluginData('sessionId', figma.currentUser.sessionId.toString());
                f1530.setPluginData('type', j1529[b1395]);
                f1530.setPluginData('nodeId', j1529[a1396]);
                f1530.setPluginData('objectId', j1529[o1397]);
                f1530.setPluginData('isCenter', f937(j1529[p1418]));
                if (j1529[b1395] == l1246)
                    t2765.push(f1530);
                if (j1529[z1417])
                    e1560(f1530);
            }
            addObject(f1530);
        }
    } if (!j1529.counted) {
        p2745++;
        j1529.counted = true;
    } return f1530; });
}
function q1546(f1530, j1529, addProps, transform) {
    return __awaiter(this, void 0, void 0, function* () { if (!j1547(j1529) || f1530 == undefined || f1530 == null || f1530.removed)
        return; f1530.name = z1544(j1529); f1530.setPluginData('retain', j1529[r1403].toString()); switch (j1529[b1395]) {
        case t1219:
            h2714(f1530, j1529, addProps, transform);
            break;
        case y1222:
            e2793(f1530, j1529, addProps, transform);
            break;
        case h1225:
            v2789(f1530, j1529, addProps, transform);
            break;
        case b1237:
            n2710(f1530, j1529, addProps, transform);
            break;
        case j1240:
            t2717(f1530, j1529, addProps, transform);
            break;
        case l1243:
            x2720(f1530, j1529, addProps, transform);
            break;
        case l1246:
            v2752(f1530, j1529);
            break;
        case w1250:
            z2753(f1530, j1529, addProps, transform);
            break;
        case z1262:
            u2754(f1530, j1529, addProps, transform);
            break;
        case q1286:
            g2755(f1530, j1529, addProps, transform);
            break;
        case p1265:
            c2756(f1530, j1529);
            break;
        case k1268:
            c2757(f1530, j1529, addProps, transform);
            break;
    } if (f1530 != undefined && f1530 != null && !f1530.removed) {
        if (f1530.parent == figma.currentPage)
            yield figma.currentPage.loadAsync();
        f1530.parent.appendChild(f1530);
        if (j1529[z1417])
            e1560(f1530);
    } if (!j1529.counted) {
        p2745++;
        j1529.counted = true;
    } });
}
function f2732(c2758, g2759, j2760, z2067 = -1, nodeIds = [], l2761 = false, e2762 = false, a270 = false, addProps = true, transform = true) {
    return __awaiter(this, void 0, void 0, function* () { let j2763 = NULL; let c2764 = null; let abort = false; const g3642 = []; let l2746 = 0; m2742.push(...nodeIds); if (z2067 > -1)
        y2744 = z2067; for (const j1529 of g2759) {
        g2743.push(j1529);
        if (j1529[a1396] != j2763) {
            j2763 = j1529[a1396];
            c2764 = q2729.find(a => a.nodeId == j1529[a1396]);
            if (!c2764) {
                q2729.push(c2764 = { nodeId: j1529[a1396], objects: [] });
            }
        }
        const addObject = f1530 => { if (c2758 != undefined && c2758 != null && !c2758.removed)
            c2758.appendChild(f1530);
        else
            c2764.objects.push(f1530); };
        let objects = c2758 != undefined && c2758 != null && !c2758.removed ? c2758.children : c2764.objects;
        let f1530 = objects.find(o => o.removed || o.getPluginData('userId') == figma.currentUser.id && o.getPluginData('objectId') == j1529[o1397]);
        if (f1530 != undefined && f1530 != null && f1530.removed) {
            b938(objects, f1530);
            if (t2765.includes(f1530))
                v943(t2765, f1530);
            if (r2781.includes(f1530))
                v943(r2781, f1530);
        }
        if (f1530 == undefined || f1530 == null || f1530.removed) {
            const newObj = yield g1545(j1529, addObject, addProps, transform);
            g3642.push(newObj);
        }
        else if (f1530 != undefined && f1530 != null && !f1530.removed && f1530.getPluginData('type') == j1529[b1395].toString()) {
            yield q1546(f1530, j1529, addProps, transform);
            if (f1530 != undefined && f1530 != null && !f1530.removed)
                g3642.push(f1530);
        }
        else {
            f1530.remove();
            if (t2765.includes(f1530))
                v943(t2765, f1530);
            if (r2781.includes(f1530))
                v943(r2781, f1530);
            yield g1545(j1529, addObject, addProps, transform);
        }
        l2746++;
        if (l2746 >= j2760) {
            const result = yield m2739('returnObjectUpdate', { y2744: y2744, p2745: p2745 });
            abort = result.value;
            l2746 = 0;
            if (abort)
                break;
        }
    } if (c2758 != undefined && c2758 != null && !c2758.removed) {
        for (const f1530 of c2758.children) {
            if (f1530 != undefined && f1530 != null && f1530.removed || !g2759.find(o => o[o1397] == f1530.getPluginData('objectId') && f1530.getPluginData('userId') == figma.currentUser.id))
                f1530.remove();
        }
    } for (const point of t2765) {
        if (point.parent == figma.currentPage)
            yield figma.currentPage.loadAsync();
        if (point != undefined && point != null && !point.removed && !point.parent.removed)
            point.parent.appendChild(point);
    } if (e2762 && !abort) {
        x1526(m2742, g2743);
        m2742 = [];
        g2743 = [];
        if (a270 && g3642.length > 0) {
            figma.viewport.scrollAndZoomIntoView(g3642);
            const bounds = k1550(g3642);
            figma.viewport.zoom = Math.min(figma.viewport.bounds.width * figma.viewport.zoom / bounds.width - 0.05, figma.viewport.bounds.height * figma.viewport.zoom / bounds.height - 0.05);
        }
    } yield m2739('returnObjectUpdate', { y2744: y2744, p2745: p2745 }); });
}
function j1547(j1529) { switch (j1529[b1395]) {
    case t1219: return n2712(j1529);
    case y1222: return m2774(j1529);
    case h1225: return m2775(j1529);
    case b1237: return p4026(j1529);
    case j1240: return q2715(j1529);
    case l1243: return y2718(j1529);
    case l1246: return o4025(j1529);
    case w1250: return b2776(j1529);
    case z1262: return t2777(j1529);
    case q1286: return i2778(j1529);
    case p1265: return x2779(j1529);
    case k1268: return v2780(j1529);
} }
function t1548(j1529) {
    return __awaiter(this, void 0, void 0, function* () { (() => __awaiter(this, void 0, void 0, function* () { const f1530 = yield g1545(j1529); const width = f1530.width; const height = f1530.height; f1530.remove(); p1543({ cmd: 'uiForwardToGenerator', msg: { cmd: 'returnFigGetObjectSize', objectId: j1529[o1397], width: width, height: height } }); }))(); });
}
function o1549(f1530) { f1530.setPluginData('type', ''); f1530.setPluginData('nodeId', ''); f1530.setPluginData('userId', ''); f1530.setPluginData('sessionId', ''); f1530.setPluginData('objectId', ''); f1530.setPluginData('isCenter', ''); f1530.setPluginData('retain', ''); }
function k1550(objects) { const bounds = { left: 0, top: 0, right: 0, bottom: 0 }; for (const l111 of objects) {
    if (l111.x < bounds.left || bounds.left == bounds.right)
        bounds.left = l111.x;
    if (l111.y < bounds.top || bounds.top == bounds.bottom)
        bounds.top = l111.y;
    if (l111.x + l111.width > bounds.right || bounds.left == bounds.right)
        bounds.right = l111.x + l111.width;
    if (l111.y + l111.height > bounds.bottom || bounds.top == bounds.bottom)
        bounds.bottom = l111.y + l111.height;
} return { x: bounds.left, y: bounds.top, width: bounds.right - bounds.left, height: bounds.bottom - bounds.top }; }
function figExport(objectIds, scale, format, suffix) {
    return __awaiter(this, void 0, void 0, function* () { yield figma.currentPage.loadAsync(); for (const objId of objectIds) {
        let f1530 = figma.currentPage.children.find(o => !o.removed && o.getPluginData('userId') == figma.currentUser.id && o.getPluginData('objectId') == objId);
        if (!f1530)
            continue;
        const settings = { constraint: { type: 'SCALE', value: scale }, format: format == 0 ? 'PNG' : 'JPG', suffix: suffix };
        yield f1530.exportAsync(settings);
    } });
}
const r2781 = [];
const v2782 = [];
function d1551(v1552, q1553) { const effects = []; for (const effect of v1552) {
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
                if (q1553 && !isNaN(spread))
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
function j2702(f1530, j1529, phantom = true) { z1556(f1530, j1529); p2703(f1530, j1529, phantom); o2704(f1530, j1529); f1530.opacity = j1529[f1419]; f1530.blendMode = j1529[x1420]; const maskType = j1529[m1421]; f1530.isMask = maskType > 0; if (f1530.isMask) {
    switch (maskType) {
        case 1:
            f1530.maskType = 'ALPHA';
            break;
        case 2:
            f1530.maskType = 'VECTOR';
            break;
        case 3:
            f1530.maskType = 'LUMINANCE';
            break;
    }
} if (f1530.isMask && f1530.fills.length == 0 && f1530.strokes.length == 0)
    f1530.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 }, opacity: 1, blendMode: 'NORMAL' }]; }
function o2704(f1530, j1529) { if (!!j1529[d1408] && !isEmpty(j1529[d1408])) {
    f1530.fills = a956(j1529[d1408]);
    if (r2781.includes(f1530))
        v943(r2781, f1530);
}
else
    f1530.fills = []; }
function p2703(f1530, j1529, phantom = true) { if (j1529[n1409] != null && !isEmpty(j1529[n1409])) {
    y1555(f1530, a956(j1529[n1409]), j1529[d1410], j1529[q1411], j1529[o1412], j1529[o1413], j1529[h1414], v2705(j1529[g1415]));
    if (j1529[z1417])
        f1530.setPluginData('dashes', j1529[g1415]);
    if (r2781.includes(f1530))
        v943(r2781, f1530);
    if (j1529[z1417])
        q949(v2782, f1530);
}
else if (isEmpty(j1529[d1408]) && isEmpty(j1529[n1409]) && !j1529[m1421] && phantom) {
    w1558(f1530);
    q949(r2781, f1530);
}
else
    f1530.strokes = []; }
function v2705(k1554) { k1554 = k1554; k1554 = s954(k1554, ','); k1554 = h955(k1554, ','); k1554 = k1554.trim(); return k1554 == '' ? [] : k1554.split(',').map(s => Math.max(0, parseFloat(s))); }
function o2706(k1554) { k1554 = k1554; k1554 = s954(k1554, ','); k1554 = h955(k1554, ','); k1554 = k1554.trim(); return k1554 == '' ? [] : k1554.split(',').map(s => Math.max(0, parseFloat(s) / z2708)); }
function y1555(f1530, fills, weight, align, join, miterLimit, cap, dashes = []) { f1530.strokes = fills; f1530.strokeWeight = Math.max(0, weight); f1530.strokeAlign = align; f1530.strokeJoin = join; const miterAngle = miterLimit / 360 * Tau; const r2783 = 1 / Math.sin(miterAngle / 2); f1530.strokeMiterLimit = Math.min(Math.max(0, r2783), 16); f1530.strokeCap = cap; f1530.dashPattern = dashes; }
function z1556(f1530, j1529) { if (!!j1529[o1416] && !isEmpty(j1529[o1416])) {
    const q1553 = j1529[b1395] == t1219 || j1529[b1395] == h1225 || j1529[b1395] == k1268;
    f1530.effects = d1551(j1529[o1416], q1553);
}
else
    f1530.effects = []; }
function r1557() { for (const l111 of r2781) {
    if (l111.removed)
        v943(r2781, l111);
    else
        w1558(l111);
} }
function w1558(l111) { figma.currentPage.loadAsync().then(() => { const back = figma.currentPage.backgrounds.find(b => b.type == 'SOLID'); let phantomColor; if (back) {
    const l = back.color.r * 0.2126 + back.color.g * 0.7152 + back.color.b * 0.0722;
    phantomColor = l > 0.5 ? { r: 0, g: 0, b: 0 } : { r: 1, g: 1, b: 1 };
}
else
    phantomColor = { r: 1, g: 0, b: 1 }; y1555(l111, [{ type: 'SOLID', color: phantomColor, opacity: 0.5 }], 1 / z2708, 'CENTER', 'MITER', 1, 'NONE', [1 / z2708, 2 / z2708]); }); }
function j1559() { for (const f1530 of v2782) {
    if (f1530.removed)
        v943(v2782, f1530);
    else
        e1560(f1530);
} }
function e1560(f1530) { f1530.strokeWeight = Math.max(0, 1.5 / z2708); if (p923(f1530.getPluginData('isCenter'))) {
    const path = f1530.vectorPaths[0];
    const parts = path.data.split(' ');
    let t = { x: parseFloat(parts[1]), y: parseFloat(parts[2]) };
    let c = { x: parseFloat(parts[4]), y: parseFloat(parts[5]) };
    let r = { x: parseFloat(parts[7]), y: parseFloat(parts[8]) };
    const a = 2;
    const b = 0.05;
    const f = 1 - Math.pow(1 - Math.min(z2708, 1), a) / Math.pow(a, b);
    t = h895(c, n897(w886(p900(t, c)), objectCenterSize / f));
    r = h895(c, n897(w886(p900(r, c)), objectCenterSize / f));
    parts[1] = t.x;
    parts[2] = t.y;
    parts[4] = c.x;
    parts[5] = c.y;
    parts[7] = r.x;
    parts[8] = r.y;
    const t2784 = { windingRule: path.windingRule, data: parts.join(' ') };
    f1530.vectorPaths = [t2784];
} const dashes = f1530.getPluginData('dashes'); if (dashes != '')
    f1530.dashPattern = o2706(dashes); }
function f1594(nodeId, px, py) { figma.getLocalPaintStylesAsync().then(_styles => { const styles = new Array(); for (const e168 of _styles) {
    const _nodeId = e168.getPluginData('nodeId');
    const _existing = e168.getPluginData('existing');
    const existing = !!_existing;
    const style = { id: e168.id, nodeId: _nodeId, name: e168.name, existing: existing, paints: new Array() };
    let onlyPaint = true;
    for (const z2786 of e168.paints) {
        if (z2786.type == 'SOLID') {
            style.paints.push([z2786.color.r, z2786.color.g, z2786.color.b, z2786.opacity]);
        }
        else {
            onlyPaint = false;
            break;
        }
    }
    if (onlyPaint)
        styles.push(style);
} p1543({ cmd: 'uiReturnFigGetAllLocalColorStyles', nodeId: nodeId, px: px, py: py, styles: JSON.stringify(styles) }); }); }
function w1595(nodeId, styleId) { figma.getLocalPaintStylesAsync().then(f1597 => { if (styleId != NULL)
    e1596(f1597, nodeId, styleId);
else
    q1598(f1597, nodeId); }); }
function e1596(f1597, nodeId, styleId, clearExisting = true) { const z2785 = u2731.find(a => a.nodeId == nodeId); if (z2785 && clearExisting)
    q1598(f1597, nodeId); const p1602 = f1597.find(s => s.id == styleId); g952(!!p1602, 'figStyle should be found here'); p1602.setPluginData('type', d1216); p1602.setPluginData('nodeId', nodeId); p1602.setPluginData('existing', f937(true)); u2731.push({ nodeId: nodeId, existing: true, styles: [p1602] }); return p1602; }
function q1598(f1597, nodeId) { const p1602 = f1597.find(s => s.getPluginData('nodeId') == nodeId); g952(!!p1602, 'figStyle should be found here'); if (p1602) {
    p1602.setPluginData('type', NULL);
    p1602.setPluginData('nodeId', NULL);
    p1602.setPluginData('existing', NULL);
    l945(u2731, a => a.nodeId == nodeId);
} return p1602; }
function y1599(styles, x1603) { const p1602 = figma.createPaintStyle(); p1602.setPluginData('type', x1603[b1395]); p1602.setPluginData('nodeId', x1603[a1396]); p1602.name = x1603[l1400]; setStylePaints(p1602, x1603); styles.push(p1602); p1543({ cmd: 'uiSetStyleId', nodeId: x1603[a1396], styleId: p1602.id }); return p1602; }
function x1600(msg) { let j2763 = NULL; let z2785; for (const x1603 of msg.styles) {
    if (x1603[a1396] != j2763) {
        j2763 = x1603[a1396];
        z2785 = u2731.find(a => a.nodeId == x1603[a1396]);
        if (!z2785) {
            z2785 = { nodeId: x1603[a1396], styles: [] };
            u2731.push(z2785);
        }
    }
    else
        z2785 = null;
    const p1602 = z2785.styles[0];
    figma.getLocalPaintStylesAsync().then(f1597 => { const localStyle = f1597.find(s => s.getPluginData('nodeId') == x1603[a1396]); if (isValid(p1602) && !isValid(localStyle)) {
        b938(z2785.styles, p1602);
    } const existing = isValid(p1602) && isValid(localStyle) && p1602.getPluginData('existing'); if (!isValid(p1602) || !isValid(localStyle)) {
        if (!existing) {
            d1533 = true;
            w1595(x1603[a1396], x1603[w1398]);
        }
    }
    else if (isValid(p1602) && p1602.getPluginData('type') == x1603[b1395]) {
        d1533 = true;
        e1601(localStyle, x1603);
    } });
} }
function e1601(p1602, x1603) { setStylePaints(p1602, x1603); p1602.name = x1603[l1400]; }
function getStylePaints(stylePaints) { const paints = new Array(); for (const z2786 of stylePaints) {
    const fill = z2786[1].split(' ');
    switch (z2786[0]) {
        case 'SOLID':
            paints.push({ type: 'SOLID', color: { r: Math.min(Math.max(0, parseFloat(fill[0]) / 0xff), 1), g: Math.min(Math.max(0, parseFloat(fill[1]) / 0xff), 1), b: Math.min(Math.max(0, parseFloat(fill[2]) / 0xff), 1) }, opacity: Math.min(Math.max(0, parseFloat(fill[3]) / 100), 1) });
            break;
    }
} return paints; }
function setStylePaints(p1602, x1603) { if (!isEmpty(x1603[l1402]))
    p1602.paints = getStylePaints(x1603[l1402]);
else
    p1602.paints = []; }
function g1617(nodeId, px, py) { figma.variables.getLocalVariablesAsync().then((g2787) => __awaiter(this, void 0, void 0, function* () { const variables = new Array(); for (const _var of g2787) {
    try {
        const collection = yield figma.variables.getVariableCollectionByIdAsync(_var.variableCollectionId);
        const variable = { id: _var.id, resolvedType: _var.resolvedType, name: _var.name, collectionName: collection.name };
        variables.push(variable);
    }
    catch (ex) { }
} figma.variables.getLocalVariableCollectionsAsync().then((collections) => __awaiter(this, void 0, void 0, function* () { p1543({ cmd: 'uiReturnFigGetAllLocalVariables', nodeId: nodeId, px: px, py: py, variables: JSON.stringify(variables), nCollections: collections.length }); })); })); }
function z1618(varIds) {
    return __awaiter(this, void 0, void 0, function* () { const g2787 = yield figma.variables.getLocalVariablesAsync(); const variables = varIds.map(id => g2787.find(v => v.id == id)); let values = []; for (let i = 0; i < varIds.length; i++) {
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
function x1619(nodeId, varId) { figma.variables.getLocalVariablesAsync().then(g2787 => { figLinkVariableAsync(g2787, nodeId, varId); }); }
function figUpdateVariableAsync(varId, value) {
    return __awaiter(this, void 0, void 0, function* () { figma.variables.getLocalVariablesAsync().then((g2787) => __awaiter(this, void 0, void 0, function* () { let variable = g2787.find(v => v.id == varId); if (!variable)
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
function figLinkVariableAsync(g2787, nodeId, varId) {
    return __awaiter(this, void 0, void 0, function* () { let variable = g2787.find(v => v.id == varId); if (!variable)
        return null; const [resolvedVar, values] = yield figGetResolvedVariableValuesAsync(variable); p1543({ cmd: 'uiReturnFigLinkNodeToVariable', nodeId: nodeId, variableId: resolvedVar ? resolvedVar.id : NULL, variableName: resolvedVar ? resolvedVar.name : '', resolvedType: resolvedVar ? resolvedVar.resolvedType : NULL, values: values }); return resolvedVar; });
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
function r1604(tl, tr, bl) { let vr = point(tr.x - tl.x, tr.y - tl.y); let vb = point(bl.x - tl.x, bl.y - tl.y); let sx = vr.x; let sy = vb.y; let kx = -vr.y; let ky = -vb.x; let dx = -tl.x; let dy = -tl.y; const _sx = kx / nozero(sx); const _sy = ky / nozero(sy); let c4207 = y889([[1, _sy, 0], [_sx, 1, 0], [0, 0, 1]], b893(dx, dy)); c4207 = f891(c4207); const a = m883(vr); if (a > Tau / 4 && a < Tau * 3 / 4)
    c4207 = y889(c4207, b893(0, 0, 1, 1, Tau / 2)); if (determinant(c4207) < 0)
    c4207 = y889(c4207, b893(0, 0, -1, 1, 0)); return c4207; }
function r1605(f1530, tl, tr, bl) { const c4207 = r1604(tl, tr, bl); f1530.relativeTransform = [c4207[0], c4207[1]]; }
function d1606(f1530, j1529, setSize = true, noHeight = 0.01) { if (!j1529[a1404] || !j1529[l1405] || !j1529[m1406])
    return; const xp0 = j1529[a1404]; const xp1 = j1529[l1405]; const xp2 = j1529[m1406]; r1605(f1530, xp0, xp1, xp2); if (setSize) {
    const scaleX = distv(xp0, xp1);
    const scaleY = distv(xp0, xp2);
    const height = j1529[b1395] == l1243 ? j1529[t1439] : j1529[h1426];
    if (!f1530.removed) {
        f1530.resizeWithoutConstraints(Math.max(0.01, scaleX), height ? Math.max(0.01, scaleY) : noHeight);
    }
} }
function m1607(t2700, b2701) { if (t2700.removed)
    return; t2700.resizeWithoutConstraints(0.01, 0.01); t2700.setPluginData('actualX', b2701[c1422].toString()); t2700.setPluginData('actualY', b2701[c1424].toString()); t2700.x = b2701[c1422]; t2700.y = b2701[c1424]; t2700.rotation = b2701[p1418] ? 45 : 0; }
function p1608(t2700) { if (!t2700.removed)
    t2700.resizeWithoutConstraints(0.01, 0.01); }
function i2778(genBool) { return true; }
function k2749(genBool, addProps, transform) {
    return __awaiter(this, void 0, void 0, function* () { let objects = []; for (const l111 of genBool[q1453])
        yield g1545(l111, o => objects = [...objects, o], false); yield figma.currentPage.loadAsync(); let figBool = null; if (!isEmpty(objects)) {
        switch (genBool[w1454]) {
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
        g2755(figBool, genBool, addProps, transform);
    } return figBool; });
}
function g2755(figBool, genBool, addProps, transform) {
    return __awaiter(this, void 0, void 0, function* () { if (genBool[q1453].length == 0) {
        figBool.remove();
        return;
    } yield f2732(figBool, genBool[q1453], genBool[q1453].length, -1, [], false, false, false, false, true); const hasProps = genBool[d1408].length > 0 || genBool[n1409].length > 0 || genBool[o1416].length > 0; j2702(figBool, genBool, !hasProps && addProps); });
}
function m2775(x2766) { return x2766[c1422] != null && !isNaN(x2766[c1422]) && x2766[c1424] != null && !isNaN(x2766[c1424]) && x2766[l1425] != null && !isNaN(x2766[l1425]) && x2766[h1426] != null && !isNaN(x2766[h1426]) && x2766[s1428] != null && !isNaN(x2766[s1428]) && x2766[h1435] != null && !isNaN(x2766[h1435]) && x2766[g1441] != null && !isNaN(x2766[g1441]) && x2766[q1445] != null && !isNaN(x2766[q1445]); }
function x2788(x2766, addProps, transform) { if (!m2775(x2766))
    return null; const v2767 = figma.createEllipse(); v2789(v2767, x2766, addProps, transform, true); return v2767; }
function v2789(v2767, x2766, addProps, transform, isValid = false) { if (!isValid && !m2775(x2766))
    return; i2790(v2767, x2766, transform); if (t2765.includes(v2767))
    u2697(v2767);
else
    j2702(v2767, x2766, addProps); }
function i2790(v2767, x2766, transform) { v2767.cornerRadius = x2766[s1428]; const start = x2766[h1435] / 360 * (Math.PI * 2); const sweep = x2766[g1441] / 100 * (Math.PI * 2); v2767.arcData = { startingAngle: start, endingAngle: start + sweep, innerRadius: Math.min(Math.max(0, x2766[q1445] / 100), 1) }; if (transform)
    d1606(v2767, x2766); }
function v2780(g2768) { return g2768[c1422] != null && !isNaN(g2768[c1422]) && g2768[c1424] != null && !isNaN(g2768[c1424]) && g2768[l1425] != null && !isNaN(g2768[l1425]) && g2768[h1426] != null && !isNaN(g2768[h1426]) && g2768[e1434] != null && !isNaN(g2768[e1434]) && g2768[y1455] != null && !isNaN(g2768[y1455]); }
function e2751(g2768, addProps, transform) {
    return __awaiter(this, void 0, void 0, function* () { if (!v2780(g2768))
        return null; const w2769 = figma.createFrame(); if (w2769) {
        w2769.expanded = false;
        b2791(w2769, g2768, addProps, transform);
        let objects = [];
        for (const l111 of g2768[w1440])
            yield g1545(l111, o => objects = [...objects, o]);
        for (const l111 of objects)
            w2769.appendChild(l111);
    } return w2769; });
}
function c2757(w2769, g2768, addProps, transform) { b2791(w2769, g2768, addProps, transform); f2732(w2769, g2768[w1440], g2768[w1440].length); }
function b2791(w2769, g2768, addProps, transform) { w2769.cornerRadius = g2768[e1434]; w2769.clipsContent = g2768[y1455] > 0; if (transform)
    d1606(w2769, g2768); j2702(w2769, g2768, addProps && g2768[w1440].length == 0); figUpdateStrokeSides(w2769, g2768); }
function x2779(m2770) { return true; }
function w2750(m2770) {
    return __awaiter(this, void 0, void 0, function* () { let objects = []; for (const l111 of m2770[n1423])
        yield g1545(l111, o => objects = [...objects, o]); yield figma.currentPage.loadAsync(); const w2771 = !isEmpty(objects) ? figma.group(objects, figma.currentPage) : null; if (w2771) {
        w2771.expanded = false;
        c2756(w2771, m2770);
    } return w2771; });
}
function c2756(w2771, m2770) { if (m2770[n1423].length == 0) {
    w2771.remove();
    return;
} f2732(w2771, m2770[n1423], m2770[n1423].length); z1556(w2771, m2770); }
function m2774(i2772) { return i2772[c1422] != null && !isNaN(i2772[c1422]) && i2772[c1424] != null && !isNaN(i2772[c1424]) && i2772[l1425] != null && !isNaN(i2772[l1425]); }
function f2792(i2772, addProps, transform) { if (!m2774(i2772))
    return null; const m2773 = figma.createLine(); e2793(m2773, i2772, addProps, transform, true); return m2773; }
function e2793(m2773, i2772, addProps, transform, isValid = false) { if (!isValid && !m2774(i2772))
    return; if (transform)
    d1606(m2773, i2772, true, 0); j2702(m2773, i2772, addProps); }
var t2765 = [];
function o4025(b2701) { return b2701[c1422] != null && !isNaN(b2701[c1422]) && b2701[c1424] != null && !isNaN(b2701[c1424]); }
function a2695(b2701) { const t2700 = b2701[p1418] ? figma.createRectangle() : figma.createEllipse(); if (!o4025(b2701))
    return t2700; if (t2765.includes(t2700))
    s2699(t2700, b2701);
else
    v2752(t2700, b2701); return t2700; }
function v2752(t2700, b2701) { m1607(t2700, b2701); m2698(t2700); }
function x2696() { p1543({ cmd: 'uiUpdateZoom', zoom: figma.viewport.zoom }); for (const point of t2765)
    u2697(point); }
function u2697(t2700) { p1608(t2700); m2698(t2700); }
function s2699(t2700, b2701) { m1607(t2700, b2701); m2698(t2700); }
function m2698(t2700) { if (t2700.removed)
    return; figma.currentPage.loadAsync().then(() => { const isCenter = p923(t2700.getPluginData('isCenter')); const g2707 = figma.currentPage.selection.includes(t2700); const color = isCenter ? [0xf2, 0x48, 0x22] : g2707 ? [12, 140, 233] : [255, 255, 255]; const border = isCenter ? [255, 255, 255] : g2707 ? [255, 255, 255] : [12, 140, 233]; t2700.fills = a956([['SOLID', color[0], color[1], color[2], 100]]); const effects = []; effects.push(...d1551([['DROP_SHADOW', border[0] / 255, border[1] / 255, border[2] / 255, 1, 0, 0, 0, (isCenter ? 3 : g2707 ? 5 : 3.6) / z2708, 'NORMAL', true, true]], true)); effects.push(...d1551([['DROP_SHADOW', color[0] / 255, color[1] / 255, color[2] / 255, 1, 0, 0, 0, (g2707 ? 4 : 2.4) / z2708, 'NORMAL', true, true]], true)); t2700.effects = effects; }); }
function p4026(genPoly) { return genPoly[c1422] != null && !isNaN(genPoly[c1422]) && genPoly[c1424] != null && !isNaN(genPoly[c1424]) && genPoly[l1425] != null && !isNaN(genPoly[l1425]) && genPoly[h1426] != null && !isNaN(genPoly[h1426]) && genPoly[d1431] != null && !isNaN(genPoly[d1431]) && genPoly[d1437] != null && !isNaN(genPoly[d1437]); }
function g2709(genPoly, addProps, transform) { if (!p4026(genPoly))
    return null; const figPoly = figma.createPolygon(); n2710(figPoly, genPoly, addProps, transform, true); return figPoly; }
function n2710(figPoly, genPoly, addProps, transform, isValid = false) { if (!isValid && !p4026(genPoly))
    return; figPoly.cornerRadius = genPoly[d1431]; figPoly.pointCount = Math.max(3, genPoly[d1437]); if (transform)
    d1606(figPoly, genPoly); j2702(figPoly, genPoly, addProps); }
function n2712(d2711) { return d2711[c1422] != null && !isNaN(d2711[c1422]) && d2711[c1424] != null && !isNaN(d2711[c1424]) && d2711[l1425] != null && !isNaN(d2711[l1425]) && d2711[h1426] != null && !isNaN(d2711[h1426]) && d2711[p1427] != null && !isNaN(d2711[p1427]); }
function i2713(d2711, addProps, transform) { if (!n2712(d2711))
    return null; const figRect = figma.createRectangle(); h2714(figRect, d2711, addProps, transform, true); return figRect; }
function h2714(figRect, d2711, addProps, transform, isValid = false) { if (!isValid && !n2712(d2711))
    return; const foundCorners = d2711[o1416].findIndex(e => e[0] == 'ROUND_CORNERS'); if (foundCorners > -1) {
    const corners = d2711[o1416][foundCorners];
    figRect.topLeftRadius = corners[1];
    figRect.topRightRadius = corners[2];
    figRect.bottomLeftRadius = corners[3];
    figRect.bottomRightRadius = corners[4];
}
else
    figRect.cornerRadius = d2711[p1427]; if (transform)
    d1606(figRect, d2711); j2702(figRect, d2711, addProps); figUpdateStrokeSides(figRect, d2711); }
function figUpdateStrokeSides(f1530, j1529) { const foundSides = j1529[o1416].findIndex(e => e[0] == 'STROKE_SIDES'); if (foundSides < 0)
    return; const sides = j1529[o1416][foundSides]; f1530.strokeWeight = 0; f1530.strokeTopWeight = sides[1]; f1530.strokeLeftWeight = sides[2]; f1530.strokeRightWeight = sides[3]; f1530.strokeBottomWeight = sides[4]; }
function q2715(h2725) { return h2725[c1422] != null && !isNaN(h2725[c1422]) && h2725[c1424] != null && !isNaN(h2725[c1424]) && h2725[l1425] != null && !isNaN(h2725[l1425]) && h2725[h1426] != null && !isNaN(h2725[h1426]) && h2725[c1432] != null && !isNaN(h2725[c1432]) && h2725[m1438] != null && !isNaN(h2725[m1438]) && h2725[q1443] != null && !isNaN(h2725[q1443]); }
function e2716(h2725, addProps, transform) { if (!q2715(h2725))
    return null; const l2726 = figma.createStar(); t2717(l2726, h2725, addProps, transform, true); return l2726; }
function t2717(l2726, h2725, addProps, transform, isValid = false) { if (!isValid && !q2715(h2725))
    return; l2726.cornerRadius = h2725[c1432]; l2726.pointCount = h2725[m1438]; l2726.innerRadius = Math.min(Math.max(0, h2725[q1443] / 100), 1); if (transform)
    d1606(l2726, h2725); j2702(l2726, h2725, addProps); }
const u4268 = [];
function y2718(z2722) { return z2722[e1444] != null && z2722[c1422] != null && !isNaN(z2722[c1422]) && z2722[c1424] != null && !isNaN(z2722[c1424]) && z2722[l1425] != null && !isNaN(z2722[l1425]) && z2722[h1426] != null && !isNaN(z2722[h1426]) && z2722[a1446] != null && z2722[a1446] != NULL && z2722[g1447] != null && !isNaN(z2722[g1447]); }
function m2719(z2722, addProps, transform) { if (!y2718(z2722))
    return null; const c2794 = figma.createText(); x2720(c2794, z2722, addProps, transform, true); return c2794; }
function x2720(c2794, z2722, addProps, transform, isValid = false) { if (!isValid && !y2718(z2722))
    return null; const fontName = { family: z2722[a1446], style: z2722[j1448] }; try {
    if (!u4268.includes(fontName)) {
        figma.loadFontAsync(fontName).then(() => { u4268.push(fontName); n2721(c2794, z2722, fontName, addProps, transform); });
    }
    else {
        n2721(c2794, z2722, fontName, addProps, transform);
    }
}
catch (e) {
    p953(e);
} }
function n2721(c2794, z2722, fontName, addProps, transform) { c2794.fontName = fontName; c2794.fontSize = Math.max(1, z2722[g1447]); c2794.characters = z2722[e1444]; c2794.lineHeight = { unit: 'PERCENT', value: z2722[b1451] }; c2794.letterSpacing = { unit: 'PERCENT', value: z2722[y1452] }; if (z2722[f1449] == 0)
    c2794.textAlignHorizontal = 'LEFT';
else if (z2722[f1449] == 1)
    c2794.textAlignHorizontal = 'CENTER';
else if (z2722[f1449] == 2)
    c2794.textAlignHorizontal = 'RIGHT';
else if (z2722[f1449] == 3)
    c2794.textAlignHorizontal = 'JUSTIFIED'; if (z2722[m1450] == 0)
    c2794.textAlignVertical = 'TOP';
else if (z2722[m1450] == 1)
    c2794.textAlignVertical = 'CENTER';
else if (z2722[m1450] == 2)
    c2794.textAlignVertical = 'BOTTOM'; if (transform)
    d1606(c2794, z2722); j2702(c2794, z2722, addProps); if (z2722[q1433] == 0 && z2722[t1439] == 0)
    c2794.textAutoResize = 'WIDTH_AND_HEIGHT';
else if (z2722[q1433] == 0)
    c2794.textAutoResize = 'HEIGHT';
else
    c2794.textAutoResize = 'NONE'; }
function t2777(c2727) { return true; }
function g2748(c2727, addProps, transform) { if (!t2777(c2727))
    return null; const b2728 = figma.createVector(); u2754(b2728, c2727, addProps, transform, true); return b2728; }
function u2754(b2728, c2727, addProps, transform, isValid = false) { if (!isValid && !t2777(c2727))
    return; b2728.setVectorNetworkAsync(c2727[y1429]); if (transform)
    d1606(b2728, c2727, false); j2702(b2728, c2727, addProps); }
function b2776(h2723) { return h2723[e1436] != null && !isNaN(h2723[e1436]) && h2723[t1442] != null && !isNaN(h2723[t1442]); }
function t2747(h2723, addProps, transform) { const n2724 = figma.createVector(); z2753(n2724, h2723, addProps, transform, true); return n2724; }
function z2753(n2724, h2723, addProps, transform, isValid = false) { if (!isValid && !b2776(h2723))
    return; n2724.vectorPaths = [{ windingRule: h2723[e1436] == 1 ? 'NONZERO' : 'EVENODD', data: h2723[j1430] }]; n2724.cornerRadius = Number(h2723[t1442]); if (transform)
    d1606(n2724, h2723, false); j2702(n2724, h2723, addProps); }
