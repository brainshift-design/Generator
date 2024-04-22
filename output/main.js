var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function i1051(key, tag) { return key.substring(0, tag.length + 1) == tag + ' '; }
function s1052(key, tag) { return key.substring(tag.length + 1); }
function s1053(key) { return i1051(key, f875); }
function u1054(key) { return i1051(key, y873); }
function s1055(key) { return i1051(key, e874); }
function h1056(key) { return s1052(key, f875); }
function g1057(key) { return s1052(key, y873); }
function k1058(key) { return s1052(key, e874); }
const generatorVersion = 406;
const z867 = 2147483647;
const NULL = '';
const p868 = '  ';
const s869 = '    ';
const t870 = '\n';
const p871 = '◦ G •';
const n872 = p871 + ' ';
const y873 = 'G_NODE';
const e874 = 'G_CONN';
const f875 = 'G_PAGE';
const h876 = 'G_TEMP';
const minWindowWidth = 602;
const minWindowHeight = 39;
const identity = Object.freeze([[1, 0, 0], [0, 1, 0], [0, 0, 1]]);
const Epsilon = 0.0000001;
const Tau = Math.PI * 2;
var o2540 = false;
function l877(x, eps = 0.000000001) { return Math.abs(x) < eps ? 0 : x; }
function nozero(x, eps = 0.000000001) { return x != 0 ? x : (x < 0 ? -eps : eps); }
function x878(v, eps = 0.000000001) { return point(nozero(v.x, eps), nozero(v.y, eps)); }
function equal(a, b, eps = 0.000000001) { return Math.abs(b - a) < eps; }
function sqr(x) { return x * x; }
;
function cube(x) { return x * x * x; }
;
function m879(f) { return Math.floor(f) | 0; }
function s880(x) { x = m879(x); x--; x |= x >> 1; x |= x >> 2; x |= x >> 4; x |= x >> 8; x |= x >> 16; x |= x >> 32; return ++x; }
function gcd(a, b) { let temp; while (1) {
    temp = a % b;
    if (temp == 0)
        return b;
    a = b;
    b = temp;
} }
function distv(p1, p2) { const dx = p2.x - p1.x; const dy = p2.y - p1.y; return Math.sqrt(dx * dx + dy * dy); }
function v881(v) { let angle = Math.atan2(v.y, v.x); if (angle < 0)
    angle += Tau; return angle; }
function anglev2(v1, v2) { return anglev2_(v1.x, v1.y, v2.x, v2.y); }
function anglev2_(x1, y1, x2, y2) { const dx = x2 - x1; const dy = y2 - y1; let angle = Math.atan2(dy, dx); if (angle < 0)
    angle += Tau; return angle; }
function h883(v) { return Math.sqrt(v.x * v.x + v.y * v.y); }
function lengthv_(x, y) { return Math.sqrt(x * x + y * y); }
function b884(v) { return point(v.x == 0 ? 0 : v.x / h883(v), v.y == 0 ? 0 : v.y / h883(v)); }
function dotv(v1, v2) { return v1.x * v2.x + v1.y * v2.y; }
function k885(a1, a2) { let diff = a2 - a1; while (diff <= -Tau / 2)
    diff += Tau; while (diff > Tau / 2)
    diff -= Tau; return diff; }
function w886(v, m) { let v3 = [v.x, v.y, 1]; let r = b950(v3, m); return point(r[0], r[1]); }
function r887(...mm) { o954(mm.length > 0, 'mulm3m3() must take at least one argument'); let result = clone(mm[0]); for (let a = 1; a < mm.length; a++) {
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
function m888(m, s) { for (let i = 0; i < 3; i++)
    for (let j = 0; j < 3; j++)
        m[i][j] /= s; return m; }
function adjugate(m) { return cofactor(transpose(m)); }
function transpose(m) { return [[m[0][0], m[1][0], m[2][0]], [m[0][1], m[1][1], m[2][1]], [m[0][2], m[1][2], m[2][2]]]; }
function cofactor(m) { return [[m[1][1] * m[2][2] - m[2][1] * m[1][2], -(m[1][0] * m[2][2] - m[2][0] * m[1][2]), m[1][0] * m[2][1] - m[2][0] * m[1][1]], [-(m[0][1] * m[2][2] - m[2][1] * m[0][2]), m[0][0] * m[2][2] - m[2][0] * m[0][2], -(m[0][0] * m[2][1] - m[2][0] * m[0][1])], [m[0][1] * m[1][2] - m[1][1] * m[0][2], -(m[0][0] * m[1][2] - m[1][0] * m[0][2]), m[0][0] * m[1][1] - m[1][0] * m[0][1]]]; }
function determinant(m) { return m[0][0] * (m[1][1] * m[2][2] - m[1][2] * m[2][1]) - m[0][1] * (m[1][0] * m[2][2] - m[2][0] * m[1][2]) + m[0][2] * (m[1][0] * m[2][1] - m[2][0] * m[1][1]); }
function e889(m) { return m888(adjugate(m), determinant(m)); }
function w890(angle) { const cosA = l877(Math.cos(angle)); const sinA = l877(Math.sin(angle)); return [[cosA, sinA, 0], [-sinA, cosA, 0], [0, 0, 1]]; }
function c891(x = 0, y = 0, d892 = 1, a893 = 1, angle = 0, j894 = 0, m895 = 0) { const cosA = Math.cos(angle); const sinA = Math.sin(angle); return [[d892 * cosA - m895 * sinA, -j894 * cosA + a893 * sinA, x], [m895 * cosA + d892 * sinA, a893 * cosA + j894 * sinA, y], [0, 0, 1]]; }
function q896(v1, v2) { return v1.x * v2.y - v1.y * v2.x; }
function t897(v1, v2) { return point(v1.x + v2.x, v1.y + v2.y); }
function sqrv(v) { return p898(v, v); }
function p898(v1, v2) { return point(v1.x * v2.x, v1.y * v2.y); }
function b899(v, s) { return point(v.x * s, v.y * s); }
function w900(v1, v2) { return point(v1.x / v2.x, v1.y / v2.y); }
function p901(v, s) { return point(v.x / s, v.y / s); }
function v902(v1, v2) { return point(v1.x - v2.x, v1.y - v2.y); }
function s903(str) { return decodeURI(encodeURIComponent(str)); }
function b904(str) { return decodeURIComponent(encodeURI(str)); }
function h905(bytes) { let str = ''; for (let i = 0; i < bytes.length; i++)
    str += String.fromCharCode(bytes[i]); return str; }
function x906(str) { return Array.from(b904(str), c => c.charCodeAt(0)); }
function o907(array, size) { const newArray = new Uint8Array(size); h908(array, newArray); return newArray; }
function h908(src, dst) { a909(src, 0, src.length, dst, 0, dst.length); }
function a909(src, c910, a911, dst, g912, y913) { const size = Math.min(a911, y913); for (let i = 0; i < size; i++)
    dst[g912 + i] = src[c910 + i]; }
function z914(s915, k916) { if (s915.length != k916.length)
    return false; for (let i = 0; i < s915.length; i++) {
    if (s915[i] != k916[i])
        return false;
} return true; }
function g917(a918, x919) { return a918.findIndex(i => x919.includes(i)) > -1; }
function n920(list) { return list ? '<==' : '<--'; }
;
function c921(list) { return list ? '==>' : '-->'; }
;
function n922(nodeId) { return y873 + ' ' + nodeId; }
function k923(name) { return e874 + ' ' + name; }
function w924(name) { return f875 + ' ' + name; }
function r925(str) { return str.toLowerCase() == 'true' || str == '1'; }
function m926(n927, p928 = false) { return v933(n927.outputNodeId, n927.outputId, n927.outputOrder, n927.inputNodeId, n927.inputId, n927.list, p928); }
function r929(outputNodeId, outputId, outputOrder, inputNodeId, inputId) { return k923(outputNodeId + ' ' + outputId + ' ' + outputOrder + ' ' + inputNodeId + ' ' + inputId); }
function o930(t243) { return r929(t243.outputNodeId, t243.outputId, t243.outputOrder, t243.inputNodeId, t243.inputId); }
function n931(t243) { return r929(t243.output.node.id, t243.output.id, t243.outputOrder, t243.input.node.id, t243.input.id); }
function v932(t243, p928 = false) { return v933(t243.output.node.id, t243.output.id, t243.outputOrder, t243.input.node.id, t243.input.id, t243.list, p928); }
function v933(outputNodeId, outputId, outputOrder, inputNodeId, inputId, list, p928 = false) { const sp = p928 ? ' ' : '  '; const jsp = p928 ? '' : ' '; const arrow = sp + a937(typeof outputOrder == 'string' ? parseInt(outputOrder) : outputOrder) + c921(typeof list == 'string' ? r925(list) : list) + sp; const join = jsp + '.' + jsp; return outputNodeId + join + outputId + arrow + inputNodeId + join + inputId; }
function p934(pageId) { return w924(pageId); }
function c935(num) { const str = num.toString(); let sup = ''; for (const c of str)
    sup += a936(c); return sup; }
function a936(c) { switch (c) {
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
function a937(num) { const str = num.toString(); let sup = ''; for (const c of str)
    sup += f938(c); return sup; }
function f938(c) { switch (c) {
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
function t939(bool) { return bool ? 'true' : 'false'; }
function isValid(val) { return val != undefined && val != null; }
function isEmpty(array) { return array.length == 0; }
function m940(array, item) { i941(array, array.indexOf(item)); }
function i941(array, index) { if (index > -1 && index < array.length)
    array.splice(index, 1); }
function j942(array) { if (isEmpty(array))
    return null; let last = array.at(-1); array.splice(array.length - 1, 1); return last; }
function l943(array) { return array[array.length - 1]; }
function c944(array, from, to) { const item = array[from]; array.splice(from, 1); array.splice(to, 0, item); }
function w945(array, item) { const index = array.indexOf(item); if (index > -1)
    array.splice(index, 1); }
function w946(k2796, array) { for (const item of array) {
    const index = k2796.indexOf(item);
    if (index > -1)
        k2796.splice(index, 1);
} }
function e947(array, where) { const index = array.findIndex(where); if (index > -1)
    array.splice(index, 1); }
function b948(styleId) { return styleId.split(',')[0] + ','; }
function r949(points) { let x4035 = ''; if (points.length < 2)
    return x4035; x4035 += 'M'; x4035 += ' ' + l877(points[0].x); x4035 += ' ' + l877(points[0].y); for (let i = 1; i < points.length; i++) {
    x4035 += ' L' + ' ' + l877(points[i].x) + ' ' + l877(points[i].y);
} return x4035; }
function point(x, y) { return { x: x, y: y }; }
function b950(v, m) { let r = [0, 0, 0]; for (let i = 0; i < 3; i++)
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
        let o111 = {};
        for (const key in val)
            o111[key] = clone(val[key]);
        return o111;
    }
} throw 'unknown'; }
function j951(array, item, equal = null) { if (equal) {
    if (Array.isArray(item))
        item.forEach(i => j951(array, i, equal));
    else if (!array.find(i => equal(i, item)))
        array.push(item);
}
else {
    if (Array.isArray(item))
        item.forEach(i => j951(array, i));
    else if (!array.includes(item))
        array.push(item);
} }
function t952(array, item, equal) { if (Array.isArray(item))
    item.forEach(i => t952(array, i, equal));
else if (!array.find(equal))
    array.push(item); }
function r953(array, item, except) { if (Array.isArray(item))
    item.forEach(i => r953(array, i, except));
else if (!array.find(except))
    array.push(item); }
function o954(...args) { if (o2540) {
    console.assert(...args);
} }
function u955(...args) { if (o2540)
    console.error(...args); }
function b956(str, trim) { while (str.length >= trim.length && str.substring(0, trim.length) == trim)
    str = str.substring(trim.length); return str; }
function k957(str, trim) { while (str.length >= trim.length && str.substring(str.length - trim.length) == trim)
    str = str.substring(0, str.length - trim.length); return str; }
function w958(s4095) { const fills = []; for (const fill of s4095) {
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
            const q4211 = fill[1];
            const stops = [];
            for (const stop of fill[2]) {
                stops.push({ color: { r: Math.min(Math.max(0, stop[0]), 1), g: Math.min(Math.max(0, stop[1]), 1), b: Math.min(Math.max(0, stop[2]), 1), a: Math.min(Math.max(0, stop[3]), 1) }, position: stop[4] });
            }
            fills.push({ type: fill[0], gradientTransform: q4211, gradientStops: stops, blendMode: fill[3] });
            break;
        }
    }
} return fills; }
function j959(type) { return v1092.includes(type); }
const x1059 = 'LIST#';
const l1060 = 'NLIST#';
const d1061 = 'TLIST#';
const d1062 = 'SLIST#';
const x1063 = 'NULL';
const n1064 = 'VAR';
const c1065 = 'VARGRP';
const w1066 = 'FEEDBK';
const i1067 = 'REPT';
const o1068 = 'CACHE';
const f1069 = 'FRZ';
const z1070 = 'TIMER';
const t1071 = 'VNAME';
const GET_LIST_VALUE_NAMES = 'GVNAMES';
const LIST_VALUE_NAMES = 'VNAMES';
const OBJECT_NAME = 'ONAME';
const d1072 = 'CMB';
const d1073 = 'LSASIT';
const k1074 = 'EXTR';
const l1075 = 'SETP';
const c1076 = 'GETP';
const f1077 = 'SUBLST';
const v1078 = 'UNIQ';
const REORDER_LIST = 'RORD';
const SHIFT_LIST = 'SHFTLST';
const u1079 = 'REVLST';
const BUCKLE_LIST = 'BUKLST';
const o1080 = 'SORT';
const z1081 = 'CLMN';
const y1082 = 'CELL';
const w1083 = 'LIST';
const f1084 = 'COUNT';
const OBJECT_COUNT = 'OBJCOUNT';
const m1085 = 'LCONT';
const g1086 = 'SELECT';
const SELECT_FROM_LIST = 'LSTSEL';
const k1087 = 'IF';
const z1088 = 'LSTFLT';
const c1090 = 'ANY#';
const g1091 = [x1059, l1060, d1061, d1062, d1072, k1074, l1075, c1076, f1077, w1083, f1084, m1085, i1067];
const v1092 = [x1059, l1060, d1061, d1062];
const q1089 = 'ITER';
const b1111 = 'PROB';
const HOLD = 'HOLD';
const m1094 = 'NUM#';
const s1095 = 'NUM';
const NUMBER_PRECISION = 'NPREC';
const e1096 = 'NSIGN';
const z1097 = 'ABS';
const NUMBER_NEGATIVE = 'NEG';
const k1098 = 'ROUND';
const NUMBER_QUANTIZE = 'QUANT';
const q1099 = 'SMINMAX';
const e1100 = 'MINMAX';
const e1101 = 'LIM';
const s1102 = 'NCURVE';
const NUMBER_MAP = 'NMAP';
const NUMBER_BIAS = 'NBIAS';
const b1103 = 'NANISNUM';
const m1104 = 'CONST';
const k1105 = 'DATE';
const e1106 = 'SEQ';
const p1107 = 'RANGE';
const h1108 = 'WAVE';
const j1109 = 'RAND';
const q1110 = 'NOISE';
const l1112 = 'ACCUM';
const p1113 = 'LERP';
const i1114 = 'SOLVE';
const m1115 = 'NANIM';
const f1116 = 'SMATH';
const g1117 = 'MATH';
const s1118 = 'ADD';
const a1119 = 'SUB';
const w1120 = 'MUL';
const m1121 = 'DIV';
const i1122 = 'MOD';
const y1123 = 'EXP';
const c1124 = 'NBOOL';
const s1125 = 'NOT';
const x1126 = 'AND';
const c1127 = 'OR';
const q1128 = 'XOR';
const s1129 = 'COND';
const g1130 = 'EQ';
const c1131 = 'NE';
const v1132 = 'LT';
const f1133 = 'LE';
const q1134 = 'GT';
const k1135 = 'GE';
const g1136 = 'TRIG';
const w1137 = 'SIN';
const k1138 = 'COS';
const v1139 = 'TAN';
const h1140 = 'ATAN2';
const r1141 = 'CNVANG';
const a1093 = [x1063, n1064, c1065, ...g1091, d1073, k1074, l1075, c1076, f1077, v1078, REORDER_LIST, SHIFT_LIST, u1079, BUCKLE_LIST, z1081, o1080, y1082, w1083, g1086, SELECT_FROM_LIST, k1087, z1088, w1066, i1067, q1089, b1111, HOLD, o1068, f1069, z1070, t1071, GET_LIST_VALUE_NAMES, LIST_VALUE_NAMES, OBJECT_NAME];
const d1142 = [g1117, f1116, s1118, a1119, w1120, m1121, i1122, y1123];
const p1143 = [c1124, s1125, x1126, c1127, q1128];
const a1144 = [s1129, g1130, c1131, v1132, f1133, q1134, k1135];
const b1145 = [g1136, w1137, k1138, v1139, h1140];
const v1146 = 'TEXT#';
const f1147 = 'TEXT';
const s1148 = 'TLEN';
const a1149 = 'TTRIM';
const n1150 = 'TSUB';
const x1151 = 'TCONT';
const h1152 = 'TCASE';
const j1153 = 'TREPL';
const t1154 = 'TJOIN';
const s1155 = 'TPAD';
const v1156 = 'TCMP';
const u1157 = 'TCHAR';
const y1158 = 'TUNI';
const t1159 = 'INDEX';
const m1160 = 'N2T';
const b1161 = 'C2T';
const y1162 = 'T2N';
const o1163 = 'T2C';
const d1164 = 'TSPLT';
const i3505 = 'TJSON';
const f1166 = 'TCSV';
const g1167 = 'FETCH';
const z1168 = 'TFILE';
const y1169 = [m1094, l1060, s1095, NUMBER_PRECISION, e1096, z1097, NUMBER_NEGATIVE, k1098, NUMBER_QUANTIZE, q1099, e1100, e1101, s1102, NUMBER_MAP, NUMBER_BIAS, b1103, m1104, k1105, e1106, p1107, h1108, j1109, q1110, l1112, p1113, i1114, m1115, m1160, u1157, ...d1142, ...p1143, ...a1144, ...b1145, r1141, BUCKLE_LIST];
const g1170 = [v1146, d1061, f1147, s1148, a1149, n1150, x1151, h1152, t1154, s1155, j1153, v1156, y1158, t1159, y1162, o1163, d1164, i3505, f1166, g1167, z1168];
const i1171 = 'COL#';
const w1172 = 'COL';
const x1173 = 'CVAL';
const t1174 = 'CCOR';
const e1175 = 'COLP3';
const i1176 = 'CCNT';
const t1177 = 'BLND';
const y1178 = 'CLERP';
const b1179 = 'CBLND';
const x1180 = [i1171, w1172, t1174, e1175, t1177, y1178, b1179, b1161];
const r1181 = 'FILL#';
const k1182 = 'FILL';
const q1183 = [r1181, k1182];
const f1184 = 'STRK#';
const i1185 = 'STRK';
const u1186 = [f1184, i1185];
const m1187 = 'CSTOP#';
const l1188 = 'CSTOP';
const x1189 = [m1187, l1188];
const o1190 = 'GRAD#';
const l1191 = 'GRAD';
const y1192 = [o1190, l1191];
const r1193 = 'RCRN#';
const i1194 = 'RCRN';
const f1195 = [r1193, i1194];
const s1196 = 'DRSH#';
const o1197 = 'DRSH';
const m1198 = [s1196, o1197];
const m1199 = 'INSH#';
const v1200 = 'INSH';
const o1201 = [m1199, v1200];
const f1202 = 'LBLR#';
const t1203 = 'LBLR';
const u1204 = [f1202, t1203];
const e1205 = 'BBLR#';
const b1206 = 'BBLR';
const j1207 = [e1205, b1206];
const q1208 = 'MASK#';
const p1209 = 'MASK';
const j1210 = [q1208, p1209];
const c1211 = 'BLEND#';
const w1212 = 'BLEND';
const w1213 = [c1211, w1212];
const v1214 = [...f1195, ...m1198, ...o1201, ...u1204, ...j1207, ...w1213, ...j1210];
const u1215 = [i1171, r1181, o1190, f1184, s1196, m1199, f1202, e1205, c1211, q1208];
const r1216 = 'CSTL';
const i1217 = 'SHP#';
const j1218 = 'RECT#';
const v1219 = 'RECT';
const t1220 = [j1218, v1219];
const t1221 = 'LINE#';
const v1222 = 'LINE';
const c1223 = [t1221, v1222];
const k1224 = 'ELPS#';
const u1225 = 'ELPS';
const k1226 = [k1224, u1225];
const e1227 = 'TRPZ#';
const o1228 = 'TRPZ';
const n1229 = [e1227, o1228];
const m1236 = 'POLY#';
const q1237 = 'POLY';
const w1238 = [m1236, q1237];
const b1239 = 'STAR#';
const g1240 = 'STAR';
const l1241 = [b1239, g1240];
const w1242 = 'TXTS#';
const w1243 = 'TXTS';
const o1244 = [w1242, w1243];
const l1245 = 'PT#';
const p1246 = 'PT';
const b1247 = [l1245, p1246];
const v1248 = 'PCORN';
const o1249 = 'VPATH#';
const o1250 = 'VPATH';
const k1251 = [o1249, o1250];
const f1252 = 'VPT#';
const r1253 = 'VPT';
const t1254 = [f1252, r1253];
const c1255 = 'VEDGE#';
const t1256 = 'VEDGE';
const d1257 = [c1255, t1256];
const j1258 = 'VREG#';
const z1259 = 'VREG';
const t1260 = [j1258, z1259];
const x1261 = 'VNET#';
const v1262 = 'VNET';
const d1263 = [x1261, v1262];
const c1264 = 'SGRP#';
const q1265 = 'SGRP';
const v1266 = [c1264, q1265];
const k1267 = 'FRM#';
const q1268 = 'FRM';
const m1269 = [k1267, q1268];
const t1231 = 'ARC#';
const m1230 = 'ARC';
const g1232 = [t1231, m1230];
const g1234 = 'WAVEP#';
const m1233 = 'WAVEP';
const i1235 = [g1234, m1233];
const i1270 = 'MOVE';
const a1271 = 'ROT';
const l1272 = 'SCALE';
const i1273 = 'SKEW';
const o1274 = 'SCENTR';
const h1275 = 'RSTX';
const w1276 = 'PLACE';
const z1277 = 'APPLY';
const PATH_LENGTH = 'PTHLEN';
const JOIN_PATHS = 'JOINPTH';
const REORIENT_PATHS = 'REORPTH';
const a1283 = 'PTALPATH';
const y1284 = 'CPTONPATH';
const n1278 = 'MESPT';
const y1279 = 'VECLEN';
const f1280 = 'CIRCEN';
const ARC_FROM_POINTS = 'ARCPT';
const j1281 = 'INTLIN';
const i1282 = 'PTLERP';
const REVERSE_PATH = 'REVPTH';
const BLEND_PATH = 'BLENDPTH';
const PATH_TYPES = [o1250, o1228, m1230, m1233];
const PATH_VALUES = [o1249, e1227, t1231, g1234];
const b1285 = 'SBOOL';
const n1286 = 'SBOOL#';
const p1287 = 'SBOOLU';
const t1288 = 'SBOOLS';
const d1289 = 'SBOOLI';
const p1290 = 'SBOOLE';
const i1291 = [b1285, n1286, p1287, t1288, d1289, p1290];
const g1292 = 'RENDER';
const EXPORT = 'EXPORT';
const x1293 = [i1217, d1062, j1218, t1221, k1224, e1227, m1236, b1239, w1242, l1245, o1249, f1252, c1255, j1258, x1261, t1231, g1234, c1264, k1267, n1286, s1196, m1199, f1202, e1205, c1211, q1208];
const h1294 = [a1271, l1272, i1273];
const j1295 = [...x1293, ...t1220, ...c1223, ...k1226, ...n1229, ...w1238, ...l1241, ...o1244, ...b1247, v1248, ...k1251, ...t1254, ...d1257, ...t1260, ...d1263, ...g1232, ...i1235, ...v1266, ...m1269, ...i1291, i1270, ...h1294, o1274, h1275, w1276, z1277, PATH_LENGTH, JOIN_PATHS, REORIENT_PATHS, a1283, y1284, n1278, y1279, f1280, m1230, m1233, ARC_FROM_POINTS, j1281, i1282, REVERSE_PATH, BLEND_PATH, g1292, EXPORT];
const q1296 = [x1059, l1060, d1061, d1062, m1094, v1146, i1171, r1181, m1187, o1190, f1184, m1187, o1190, i1217, j1218, t1221, k1224, e1227, m1236, b1239, w1242, l1245, o1249, f1252, c1255, j1258, x1261, c1264, k1267, r1193, s1196, m1199, f1202, e1205, c1211, q1208];
const t1297 = 'GROUP';
const t1298 = 'GPARAM';
const x1299 = [t1297, t1298];
const p1300 = 'CMNT';
const f1301 = 'CMNTARR';
const l1302 = 'PANEL';
const j1303 = 'ACT';
const g1304 = 'BFACT';
const o1305 = 'BFLST';
const y1306 = 'DIS';
const x1307 = 'NOC';
const PARAM = 'PARAM';
const c1308 = 'LOG';
const l1309 = 'GRAPH';
const f1310 = [[i1122, '%'], [m1121, '/'], [a1119, '−'], [s1118, '+'], [w1120, '×'], [y1123, 'e<sup>x']];
const u1311 = [[m1121, '/'], [a1119, '−'], [s1118, '+'], [w1120, '×']];
const p1312 = 0;
const l1313 = 1;
const t1314 = 2;
const k1315 = 3;
const o1316 = [[p1312, 'not'], [l1313, 'xor'], [t1314, 'or'], [k1315, 'and']];
const u1317 = 0;
const e1318 = 1;
const b1319 = 2;
const c1320 = 3;
const f1321 = 4;
const q1322 = 5;
const m1323 = [[u1317, '<'], [e1318, '≤'], [b1319, '≠'], [c1320, '='], [f1321, '≥'], [q1322, '>']];
const x1324 = 0;
const z1325 = 1;
const t1326 = 2;
const o1327 = 3;
const a1328 = 4;
const f1329 = 5;
const r1330 = [[x1324, 'sin'], [z1325, 'cos'], [t1326, 'tan'], [o1327, 'asin'], [a1328, 'acos'], [f1329, 'atan']];
const d1331 = 'EMPTY';
const f1332 = 'CONNECT';
const p1333 = 'CREATE';
const j1334 = 'CREATE_INSERT';
const a1335 = 'DELETE';
const x1336 = 'DISCONNECT';
const z1337 = 'LINK_STYLE';
const u1338 = 'LINK_VARIABLE';
const k1339 = 'LINK_VARIABLE_GROUP';
const d1340 = 'MAKE_ACTIVE';
const MAKE_NOT_CONDITION_ACTION = 'MAKE_NOT_CONDITION';
const q1341 = 'MAKE_PASSIVE';
const n1342 = 'PASTE';
const i1343 = 'RECONNECT';
const y1344 = 'REMOVE';
const u1345 = 'RENAME';
const s1346 = 'REORDER_INPUTS';
const v1347 = 'REORDER_CONNECTIONS';
const d1348 = 'SELECT';
const w1349 = 'SELECT_MOVE';
const u1350 = 'MOVE_NODES';
const v1351 = 'SET_PARAM_VALUE';
const SET_MULTIPLE_VALUES_ACTION = 'SET_MULTIPLE_VALUES';
const o1352 = 'SET_PARAM_SETTING';
const s1353 = 'SET_NODE_RECT';
const v1354 = 'TOGGLE_DISABLE';
const j1355 = 'TOGGLE_PARAM_HEADER';
const o1356 = 'SET_CURRENT_GRAPH';
const y1357 = 'CREATE_PAGE';
const l1358 = 'DELETE_PAGE';
const g1359 = 'GROUP_NODES';
const u1360 = 'UNGROUP_NODES';
const j1361 = 'HIGHLIGHT_NODES';
const SCROLL_LIST_NODE_ACTION = 'SCROLL_LIST_NODE';
const SET_LIST_DIVIDER_ACTION = 'SET_LIST_DIVIDER';
const SET_NODE_PARAM_ACTION = 'SET_NODE_PARAM';
const x1362 = 'BNORM';
const x1363 = 'BDARK';
const t1364 = 'BMULT';
const b1365 = 'BPDRK';
const o1366 = 'BBURN';
const z1367 = 'BLITE';
const c1368 = 'BSCRN';
const t1369 = 'BPLGT';
const m1370 = 'BDODG';
const o1371 = 'BOVER';
const a1372 = 'BSOFT';
const u1373 = 'BHARD';
const x1374 = 'BDIFF';
const m1375 = 'BEXCL';
const s1376 = 'BHUE';
const i1377 = 'BSAT';
const o1378 = 'BCOL';
const c1379 = 'BLUM';
const g1380 = [[x1362, 'normal', 'NORMAL'], [x1363, 'darken', 'DARKEN'], [t1364, 'multiply', 'MULTIPLY'], [b1365, 'plus darker', 'LINEAR_BURN'], [o1366, 'color burn', 'COLOR_BURN'], [z1367, 'lighten', 'LIGHTEN'], [c1368, 'screen', 'SCREEN'], [t1369, 'plus lighter', 'LINEAR_DODGE'], [m1370, 'color dodge', 'COLOR_DODGE'], [o1371, 'overlay', 'OVERLAY'], [a1372, 'soft light', 'SOFT_LIGHT'], [u1373, 'hard light', 'HARD_LIGHT'], [x1374, 'difference', 'DIFFERENCE'], [m1375, 'exclusion', 'EXCLUSION'], [s1376, 'hue', 'HUE'], [i1377, 'saturation', 'SATURATION'], [o1378, 'color', 'COLOR'], [c1379, 'luminosity', 'LUMINOSITY']];
const y1381 = [['thin', 100], ['extra light', 200], ['light', 300], ['regular', 400], ['medium', 500], ['semi bold', 600], ['bold', 700], ['extra bold', 800], ['black', 900]];
const l1382 = 0;
const d1383 = 1;
const k1384 = 2;
const w1385 = 2;
const p1386 = 3;
const n1387 = 3;
const u1388 = 4;
const z1389 = 4;
const l1390 = 5;
const y1391 = 6;
const n1392 = 7;
const n1393 = 8;
const p1394 = 9;
const t1395 = 10;
const s1396 = 11;
const p1397 = 12;
const o1398 = 13;
const w1399 = 14;
const g1400 = 15;
const t1401 = 16;
const t1402 = 17;
const j1403 = 18;
const j1404 = 19;
const g1405 = 20;
const v1406 = 21;
const t1407 = 22;
const u1408 = 23;
const i1409 = 24;
const FO_BOOLEAN_CHILDREN = 24;
const q1410 = 24;
const f1411 = 25;
const FO_BOOLEAN_OPERATION = 25;
const k1412 = 26;
const j1413 = 27;
const a1414 = 28;
const w1415 = 28;
const y1416 = 28;
const t1417 = 28;
const n1418 = 28;
const w1419 = 28;
const m1420 = 28;
const b1421 = 28;
const f1422 = 29;
const c1423 = 29;
const h1424 = 29;
const o1425 = 29;
const a1426 = 29;
const m1427 = 29;
const e1428 = 30;
const e1429 = 30;
const t1430 = 30;
const d1431 = 30;
const t1432 = 31;
const r1433 = 31;
const w1434 = 32;
const n1435 = 33;
const e1436 = 34;
const b1437 = 35;
const t1438 = 36;
const d1439 = 37;
const m2797 = '12345679ABCDEFGHJKLMNPQRSTUVWXYZ';
function q845(array, chars = m2797) { let k847 = ''; let len = array.length; let i = 0; while (len > 0) {
    if (len >= 5) {
        const a0 = array[i], a1 = array[i + 1], a2 = array[i + 2], a3 = array[i + 3], a4 = array[i + 4];
        k847 += chars[(a0 & 0xF8) >>> 3];
        k847 += chars[((a0 & 0x07) << 2) | ((a1 & 0xC0) >>> 6)];
        k847 += chars[(a1 & 0x3E) >>> 1];
        k847 += chars[((a1 & 0x01) << 4) | ((a2 & 0xF0) >>> 4)];
        k847 += chars[((a2 & 0x0F) << 1) | ((a3 & 0x80) >>> 7)];
        k847 += chars[(a3 & 0x7C) >>> 2];
        k847 += chars[((a3 & 0x03) << 3) | ((a4 & 0xE0) >>> 5)];
        k847 += chars[(a4 & 0x1F)];
    }
    else if (len == 4) {
        const a0 = array[i], a1 = array[i + 1], a2 = array[i + 2], a3 = array[i + 3];
        k847 += chars[(a0 & 0xF8) >>> 3];
        k847 += chars[((a0 & 0x07) << 2) | ((a1 & 0xC0) >>> 6)];
        k847 += chars[(a1 & 0x3E) >>> 1];
        k847 += chars[((a1 & 0x01) << 4) | ((a2 & 0xF0) >>> 4)];
        k847 += chars[((a2 & 0x0F) << 1) | ((a3 & 0x80) >>> 7)];
        k847 += chars[(a3 & 0x7C) >>> 2];
        k847 += chars[((a3 & 0x03) << 3)];
    }
    else if (len == 3) {
        const a0 = array[i], a1 = array[i + 1], a2 = array[i + 2];
        k847 += chars[(a0 & 0xF8) >>> 3];
        k847 += chars[((a0 & 0x07) << 2) | ((a1 & 0xC0) >>> 6)];
        k847 += chars[(a1 & 0x3E) >>> 1];
        k847 += chars[((a1 & 0x01) << 4) | ((a2 & 0xF0) >>> 4)];
        k847 += chars[((a2 & 0x0F) << 1)];
    }
    else if (len == 2) {
        const a0 = array[i], a1 = array[i + 1];
        k847 += chars[(a0 & 0xF8) >>> 3];
        k847 += chars[((a0 & 0x07) << 2) | ((a1 & 0xC0) >>> 6)];
        k847 += chars[(a1 & 0x3E) >>> 1];
        k847 += chars[((a1 & 0x01) << 4)];
    }
    else if (len == 1) {
        const a0 = array[i];
        k847 += chars[(a0 & 0xF8) >>> 3];
        k847 += chars[((a0 & 0x07) << 2)];
    }
    i += 5;
    len -= 5;
} return k847; }
function o846(k847, chars = m2797) { const array = []; let len = k847.length; let c = 0; while (len > 0) {
    if (len >= 8) {
        const c0 = chars.indexOf(k847[c]), c1 = chars.indexOf(k847[c + 1]), c2 = chars.indexOf(k847[c + 2]), c3 = chars.indexOf(k847[c + 3]), c4 = chars.indexOf(k847[c + 4]), c5 = chars.indexOf(k847[c + 5]), c6 = chars.indexOf(k847[c + 6]), c7 = chars.indexOf(k847[c + 7]);
        array.push((c0 << 3) | ((c1 & 0x1C) >>> 2));
        array.push(((c1 & 0x03) << 6) | (c2 << 1) | ((c3 & 0x10) >>> 4));
        array.push(((c3 & 0x0F) << 4) | ((c4 & 0x1E) >>> 1));
        array.push(((c4 & 0x01) << 7) | (c5 << 2) | ((c6 & 0x18) >>> 3));
        array.push(((c6 & 0x07) << 5) | c7);
    }
    else if (len == 7) {
        const c0 = chars.indexOf(k847[c]), c1 = chars.indexOf(k847[c + 1]), c2 = chars.indexOf(k847[c + 2]), c3 = chars.indexOf(k847[c + 3]), c4 = chars.indexOf(k847[c + 4]), c5 = chars.indexOf(k847[c + 5]), c6 = chars.indexOf(k847[c + 6]);
        array.push((c0 << 3) | ((c1 & 0x1C) >>> 2));
        array.push(((c1 & 0x03) << 6) | (c2 << 1) | ((c3 & 0x10) >>> 4));
        array.push(((c3 & 0x0F) << 4) | ((c4 & 0x1E) >>> 1));
        array.push(((c4 & 0x01) << 7) | (c5 << 2) | ((c6 & 0x18) >>> 3));
    }
    else if (len == 5) {
        const c0 = chars.indexOf(k847[c]), c1 = chars.indexOf(k847[c + 1]), c2 = chars.indexOf(k847[c + 2]), c3 = chars.indexOf(k847[c + 3]), c4 = chars.indexOf(k847[c + 4]);
        array.push((c0 << 3) | ((c1 & 0x1C) >>> 2));
        array.push(((c1 & 0x03) << 6) | (c2 << 1) | ((c3 & 0x10) >>> 4));
        array.push(((c3 & 0x0F) << 4) | ((c4 & 0x1E) >>> 1));
    }
    else if (len == 4) {
        const c0 = chars.indexOf(k847[c]), c1 = chars.indexOf(k847[c + 1]), c2 = chars.indexOf(k847[c + 2]), c3 = chars.indexOf(k847[c + 3]);
        array.push((c0 << 3) | ((c1 & 0x1C) >>> 2));
        array.push(((c1 & 0x03) << 6) | (c2 << 1) | ((c3 & 0x10) >>> 4));
    }
    else if (len == 2) {
        const c0 = chars.indexOf(k847[c]), c1 = chars.indexOf(k847[c + 1]);
        array.push((c0 << 3) | ((c1 & 0x1C) >>> 2));
    }
    c += 8;
    len -= 8;
} return array; }
function r2102(nodeKey, y4007) {
    return __awaiter(this, void 0, void 0, function* () { const log = z2103(yield y1547(nodeKey, false)); if (y4007) {
        console.log('%c%s\n%c%s', 'background: #fa24; color: white;', g1057(nodeKey), 'background: #fa44; color: #edc;', log);
    }
    else {
        console.log('%c%s\n%c%s', 'background: #fdb; color: black;', g1057(nodeKey), 'background: #fed; color: black;', log);
    } });
}
function z2103(json) { let z4036 = json.replace('{\n', '').replace('\n}', '').replace('[\n' + p868, '').replace('\n' + p868 + ']', '').split(p868 + '"params":\n').join('').split('": "').join(': ').split('", "').join(': ').split(p868 + '"').join(p868).split(p868 + p868 + '["').join(p868 + p868).split('",\n').join('\n').split('"\n').join('\n').split('"],\n').join('\n'); if (z4036[z4036.length - 1] == '"')
    z4036 = z4036.substring(0, z4036.length - 1); if (z4036.substring(z4036.length - 2) == '"]')
    z4036 = z4036.substring(0, z4036.length - 2); return z4036; }
function c2104(json) { let z4036 = json.replace('{\n', '').replace('\n}', '').replace('[\n' + p868, '').replace('\n' + p868 + ']', ''); return z4036; }
function h2105(t243, y4007) { const h4214 = m926(t243, true); if (y4007) {
    console.log('%c%s', 'background: #4f44; color: #ded', h4214);
}
else {
    console.log('%c%s', 'background: #cfc; color: black;', h4214);
} }
console.clear();
figma.payments.setPaymentStatusInDevelopment({ type: 'UNPAID' });
figma.loadAllPagesAsync().then(() => { figma.on('documentchange', g1518); figma.on('selectionchange', w1526); figma.on('close', v1519); });
w1508(true);
figma.clientStorage.getAsync('pro').then(data => { figma.showUI(__html__, { visible: false, themeColors: true, title: 'Generator' }); });
var v2709 = figma.viewport.zoom;
setInterval(v1523, 100);
const h2798 = 'clock_';
const m2799 = 1000;
var g2800 = false;
var objectCenterSize = 15;
function n1520() { (function () {
    return __awaiter(this, void 0, void 0, function* () { figma.currentPage.loadAsync().then(() => __awaiter(this, void 0, void 0, function* () { let p2801 = yield figma.currentPage.getPluginData(figma.currentUser.id + ',windowWidth'); let y2802 = yield figma.currentPage.getPluginData(figma.currentUser.id + ',windowHeight'); let c2803; let o2804; if (p2801 === NULL) {
        c2803 = 800;
        figma.currentPage.setPluginData(figma.currentUser.id + ',windowWidth', p2801.toString());
    }
    else
        c2803 = parseInt(p2801); if (y2802 === NULL) {
        o2804 = 600;
        figma.currentPage.setPluginData(figma.currentUser.id + ',windowHeight', y2802.toString());
    }
    else
        o2804 = parseInt(y2802); figma.ui.resize(Math.max(minWindowWidth, c2803), Math.max(minWindowHeight, o2804)); figma.ui.show(); const fonts = yield figma.listAvailableFontsAsync(); const eula = (yield figma.clientStorage.getAsync('eula')) === 'true'; const tutorials = (yield figma.clientStorage.getAsync('tutorials')) === 'true'; const isLocked = yield d1525(); c1527({ cmd: 'uiReturnFigStartGenerator', currentUser: figma.currentUser, viewportRect: figma.viewport.bounds, viewportZoom: figma.viewport.zoom, fonts: fonts, eula: eula, tutorials: tutorials, isLocked: isLocked, windowWidth: c2803, windowHeight: o2804 }); })); });
})(); }
function j1521() { w1508(); figma.showUI(__html__, { visible: false, themeColors: true }); }
function m1522() { setInterval(n1524, m2799); }
function v1523() { if (figma.viewport.zoom == v2709)
    return; v2709 = figma.viewport.zoom; y2697(); h1541(); n1543(); }
function n1524() { b1548(h2798 + figma.currentUser.sessionId.toString(), Date.now().toString()); }
function d1525() {
    return __awaiter(this, void 0, void 0, function* () { yield figma.currentPage.loadAsync(); const clocks = figma.currentPage.getPluginDataKeys().filter(k => k.length > h2798.length && k.substring(0, h2798.length) == h2798 && k.substring(h2798.length) != figma.currentUser.sessionId.toString()).map((k) => __awaiter(this, void 0, void 0, function* () { return parseInt(yield y1547(k)); })); clocks.sort(); const now = Date.now(); const locked = clocks.length > 0 && now - (yield clocks[clocks.length - 1]) < m2799 * 2; return locked; });
}
function w1526() { y2697(); }
var v2730 = new Array();
var g2732 = new Array();
function figGetObjectsFromIds(objectIds) {
    return __awaiter(this, void 0, void 0, function* () { for (let i = e2766.length - 1; i >= 0; i--)
        if (!e2766[i].removed && objectIds.includes(e2766[i].getPluginData('objectId')))
            e2766.splice(i, 1); for (let i = k2782.length - 1; i >= 0; i--)
        if (k2782[i].removed || objectIds.includes(k2782[i].getPluginData('objectId')))
            k2782.splice(i, 1); yield figma.currentPage.loadAsync(); return figma.currentPage.findAll(o => objectIds.includes(o.getPluginData('objectId'))); });
}
function s1507(nodeIds) {
    return __awaiter(this, void 0, void 0, function* () { for (let i = e2766.length - 1; i >= 0; i--)
        if (!e2766[i].removed && nodeIds.includes(e2766[i].getPluginData('nodeId')))
            e2766.splice(i, 1); for (let i = k2782.length - 1; i >= 0; i--)
        if (k2782[i].removed || nodeIds.includes(k2782[i].getPluginData('nodeId')))
            k2782.splice(i, 1); yield figma.currentPage.loadAsync(); figma.currentPage.findAll(o => nodeIds.includes(o.getPluginData('nodeId'))).forEach(o => { if (!o.removed)
        o.remove(); }); v2730 = v2730.filter(a => !nodeIds.includes(a.nodeId)); });
}
function w1508(t1509 = false) { for (const w1514 of figma.currentPage.children) {
    if (w1514.removed)
        continue;
    if (w1514.getPluginData('objectId') != '' && w1514.getPluginData('userId') == figma.currentUser.id && (parseInt(w1514.getPluginData('retain')) == 0 || t1509))
        w1514.remove();
} }
function w1510(nodeIds, t1511) { for (let i = v2730.length - 1; i >= 0; i--) {
    const l2731 = v2730[i];
    if (!nodeIds.includes(l2731.nodeId))
        continue;
    for (let j = l2731.objects.length - 1; j >= 0; j--) {
        const w1514 = l2731.objects[j];
        if (w1514.removed || !w1512(w1514, t1511)) {
            if (!w1514.removed)
                w1514.remove();
            w945(l2731.objects, w1514);
            if (e2766.includes(w1514))
                w945(e2766, w1514);
            if (k2782.includes(w1514))
                w945(k2782, w1514);
        }
        if (!w1514.removed) {
            if (parseInt(w1514.getPluginData('retain')) == 2)
                z1533(w1514);
        }
    }
    if (isEmpty(l2731.objects))
        w945(v2730, l2731);
} }
function w1512(w1514, t1511) { if (w1514.type == q1265 || w1514.type == q1268) {
    for (const child of w1514.children) {
        const found = w1512(child, t1511);
        if (found)
            return found;
    }
}
else {
    const found = t1511.find(o => w1514.getPluginData('objectId') == o[k1384] && w1514.getPluginData('userId') == figma.currentUser.id || o[l1390] == 2 && o[l1390] == w1514.getPluginData('retain'));
    if (found)
        return found;
} return null; }
function j1515(nodeIds, k1516) { figma.getLocalPaintStylesAsync().then(paintStyles => { paintStyles.filter(s => nodeIds.includes(s.getPluginData('nodeId'))).forEach(s => { const nodeId = s.getPluginData('nodeId'); const existing = r925(s.getPluginData('existing')); if (!existing) {
    s.remove();
}
else if (k1516) {
    e947(g2732, a => a.nodeId == nodeId);
    s.setPluginData('type', NULL);
    s.setPluginData('nodeId', NULL);
    s.setPluginData('existing', NULL);
} }); }); if (k1516)
    g2732 = g2732.filter(a => !nodeIds.includes(a.nodeId)); }
var d1517 = false;
function g1518(e) { for (const change of e.documentChanges) {
    switch (change.type) {
        case 'STYLE_CREATE':
            if (!change.style)
                break;
            if (!d1517) {
                change.style.setPluginData('type', NULL);
                change.style.setPluginData('nodeId', NULL);
                change.style.setPluginData('existing', NULL);
            }
            break;
        case 'STYLE_PROPERTY_CHANGE': {
            if (!change.style)
                break;
            if (!d1517) {
                const msg = { cmd: 'uiStylePropertyChange', styleId: b948(change.id), properties: change.properties, name: '', paints: [] };
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
                c1527(msg);
            }
            break;
        }
        case 'STYLE_DELETE':
            c1527({ cmd: 'uiStyleDelete', styleId: change.id });
            break;
    }
} d1517 = false; }
function v1519() { w1508(); c1527({ cmd: 'updateMetrics' }); }
figma.ui.onmessage = function (msg) { msg = JSON.parse(msg); if (msg.cmd == 'returnUiGetValueForFigma')
    return; switch (msg.cmd) {
    case 'figStartGenerator':
        n1520();
        break;
    case 'figRestartGenerator':
        j1521();
        break;
    case 'figFinishStart':
        m1522();
        break;
    case 'figDockWindowNormal':
        x2739('normal');
        break;
    case 'figDockWindowMaximize':
        x2739('maximize');
        break;
    case 'figDockWindowTop':
        x2739('top');
        break;
    case 'figDockWindowLeft':
        x2739('left');
        break;
    case 'figDockWindowRight':
        x2739('right');
        break;
    case 'figDockWindowBottom':
        x2739('bottom');
        break;
    case 'figGetMousePosition':
        l1593(msg.clientPosition);
        break;
    case 'figResizeWindow':
        z1596(msg.width, msg.height);
        break;
    case 'figSetWindowRect':
        j1594(msg.x, msg.y, msg.width, msg.height);
        break;
    case 'figNotify':
        m1597(msg);
        break;
    case 'figGetLocalData':
        f1545(msg.key);
        break;
    case 'figSetLocalData':
        r1546(msg.key, msg.value);
        break;
    case 'figClearAllLocalData':
        r4031();
        break;
    case 'figGetPageData':
        y1547(msg.key);
        break;
    case 'figSetPageData':
        b1548(msg.key, msg.value);
        break;
    case 'figSavePages':
        a1553(msg.pageIds, msg.pageJson, msg.currentPageId);
        break;
    case 'figLoadNodesAndConns':
        h1550(msg.debugMode);
        break;
    case 'figSaveNodes':
        h1554(msg.nodeIds, msg.nodeJson);
        break;
    case 'figGetAllLocalTemplateNames':
        p2736();
        break;
    case 'figSaveLocalTemplate':
        l1555(msg.j4032, msg.template);
        break;
    case 'figRemoveConnsToNodes':
        i1556(msg.nodeIds);
        break;
    case 'figRemoveSavedNodesAndConns':
        x1557(msg.nodeIds);
        break;
    case 'figRemoveAllSavedNodesAndConns':
        o1558();
        break;
    case 'figLogAllSavedNodesAndConns':
        x1559(msg.y4007);
        break;
    case 'figLogAllSavedNodes':
        b1560(msg.y4007);
        break;
    case 'figLogAllSavedConns':
        x1561(msg.y4007);
        break;
    case 'figLogAllSavedPageKeys':
        h1562(msg.y4007);
        break;
    case 'figLogAllSavedPages':
        s1563(msg.y4007);
        break;
    case 'figLogAllSavedConnKeys':
        k1564(msg.y4007);
        break;
    case 'figLogAllLocalData':
        r1565(msg.y4007);
        break;
    case 'figGetValue':
        w1566(msg.key, msg.spec);
        break;
    case 'figRemoveSavedPage':
        u1568(msg.pageId);
        break;
    case 'figRemoveAllSavedPages':
        q1569();
        break;
    case 'figSaveConnection':
        f1570(msg.key, msg.json);
        break;
    case 'figSaveConnections':
        n1571(msg.keys, msg.json);
        break;
    case 'figUpdateSavedConnections':
        u1572(msg.curKeys, msg.newKeys, msg.json);
        break;
    case 'figDeleteSavedConnection':
        v1573(msg.key);
        break;
    case 'figRemoveAllSavedConnections':
        a1574();
        break;
    case 'figDeleteSavedConnectionsToNode':
        f1575(msg.nodeId);
        break;
    case 'figDeleteSavedConnectionsFromNode':
        e1576(msg.nodeId);
        break;
    case 'figRemovePluginDataFromAllLocalStyles':
        z1577();
        break;
    case 'figGetAllLocalVariables':
        u1601(msg.nodeId, msg.px, msg.py);
        break;
    case 'figLinkNodeToVariable':
        k1603(msg.nodeId, msg.variableId);
        break;
    case 'figUpdateVariable':
        figUpdateVariableAsync(msg.variableId, msg.value);
        break;
    case 'figGetAllLocalColorStyles':
        a1578(msg.nodeId, msg.px, msg.py);
        break;
    case 'figLinkNodeToExistingColorStyle':
        h1579(msg.nodeId, msg.styleId);
        break;
    case 'figExport':
        figExport(msg.objectIds, msg.scale, msg.format, msg.suffix);
        break;
    case 'figGetObjectSize':
        x1532(msg.object);
        break;
    case 'figGetVariableUpdates':
        w1567(msg.linkedVarIds);
        break;
    case 'figUpdateShowIds':
        g2800 = msg.g2800;
        break;
    case 'figUpdateObjectCenterSize':
        objectCenterSize = msg.objectCenterSize;
        break;
    case 'figDeleteAllObjects':
        w1508();
        break;
    case 'figUpdateObjectsAndStyles':
        k2745 = 0;
        o2746 = 0;
        msg.objects.forEach(o => o.counted = false);
        v2733(null, msg.objects, msg.i4021, msg.a2050, msg.nodeIds, msg.o2762, msg.m2763, msg.c270);
        w1584(msg);
        break;
    case 'figDeleteObjectsAndStyles':
        s1507(msg.nodeIds);
        j1515(msg.nodeIds, msg.k1516);
        break;
    case 'figDeleteObjectsExcept':
        w1510(msg.nodeIds, msg.ignoreObjects);
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
} c1527({ cmd: 'uiEndFigMessage', msgCmd: msg.cmd }); };
function c1527(msg) { figma.ui.postMessage(JSON.stringify(msg)); }
function x2734(key) {
    return __awaiter(this, void 0, void 0, function* () { return yield figma.clientStorage.getAsync(key); });
}
function f1545(key) { figma.currentPage.loadAsync().then(() => { if (key == 'canvasEmpty') {
    c1527({ cmd: 'uiReturnFigGetLocalData', key: key, value: figma.currentPage.children.length == 0 });
}
else if (key == 'debugWarningCrash') {
    figma.clientStorage.getAsync('debugWarning').then(data => { c1527({ cmd: 'uiReturnFigGetLocalData', key: key, value: data }); });
}
else {
    figma.clientStorage.getAsync(key).then(data => { c1527({ cmd: 'uiReturnFigGetLocalData', key: key, value: data }); });
} }); }
function r1546(key, value, postToUi = true) { figma.clientStorage.setAsync(key, value); if (postToUi) {
    c1527({ cmd: 'uiReturnFigSetLocalData', key: key, value: value });
} }
function r4031() {
    return __awaiter(this, void 0, void 0, function* () { const keys = yield figma.clientStorage.keysAsync(); for (const key of keys)
        figma.clientStorage.deleteAsync(key); });
}
function y1547(key, postToUi = true) {
    return __awaiter(this, void 0, void 0, function* () { yield figma.currentPage.loadAsync(); const data = figma.currentPage.getPluginData(key); if (postToUi) {
        c1527({ cmd: 'uiReturnFigGetPageData', key: key, value: data });
    } return data; });
}
function b1548(key, value) { p1549(key); figma.currentPage.setPluginData(key, value); }
function p1549(key) { figma.currentPage.setPluginData(key, ''); }
function h1550(debugMode) { figma.currentPage.loadAsync().then(() => { const pageKeys = figma.currentPage.getPluginDataKeys().filter(k => s1053(k)); const nodeKeys = figma.currentPage.getPluginDataKeys().filter(k => u1054(k)); const connKeys = figma.currentPage.getPluginDataKeys().filter(k => s1055(k)); if (!debugMode)
    w1552(nodeKeys, connKeys); const pages = pageKeys.map(k => figma.currentPage.getPluginData(k)); const nodes = nodeKeys.map(k => figma.currentPage.getPluginData(k)); const n2122 = connKeys.map(k => figma.currentPage.getPluginData(k)); const pageOrder = figma.currentPage.getPluginData('pageOrder').split(','); const currentPageId = figma.currentPage.getPluginData('currentPageId'); d1551(nodes); const showAllColorSpaces = figma.currentPage.getPluginData('showAllColorSpaces'); c1527({ cmd: 'uiReturnFigLoadNodesAndConns', showAllColorSpaces: showAllColorSpaces, pageKeys: pageKeys, pageJson: pages, pageOrder: pageOrder, currentPageId: currentPageId, nodeKeys: nodeKeys, nodeJson: nodes, connKeys: connKeys, connJson: n2122 }); }); }
function d1551(nodes) { g2732 = []; figma.getLocalPaintStylesAsync().then(paintStyles => { for (const c3019 of nodes) {
    const node = JSON.parse(c3019);
    if (node.type == r1216) {
        const style = paintStyles.find(s => { const nodeId = s.getPluginData('nodeId'); return nodeId == node.id; });
        if (style) {
            g2732.push({ nodeId: node.id, existing: r925(node.existing), styles: [style] });
        }
    }
} }); }
function w1552(nodeKeys, connKeys) { figma.currentPage.loadAsync().then(() => { const b2735 = '"loading": "true"'; const not = '{\n'; const set = '{\n' + p868 + b2735 + ',\n'; nodeKeys.forEach(k => figma.currentPage.setPluginData(k, figma.currentPage.getPluginData(k).replace(set, not).replace(not, set))); connKeys.forEach(k => figma.currentPage.setPluginData(k, figma.currentPage.getPluginData(k).replace(set, not).replace(not, set))); }); }
function a1553(pageIds, pageJson, currentPageId) { for (let i = 0; i < pageIds.length; i++) {
    b1548(w924(pageIds[i]), pageJson[i]);
} b1548('pageOrder', pageIds.join(',')); b1548('currentPageId', currentPageId); }
function h1554(nodeIds, nodeJson) { for (let i = 0; i < nodeIds.length; i++) {
    b1548(n922(nodeIds[i]), nodeJson[i]);
} }
function p2736() {
    return __awaiter(this, void 0, void 0, function* () { let keys = yield figma.clientStorage.keysAsync(); keys = keys.filter(k => k.length >= h876.length && k.substring(0, h876.length) == h876); c1527({ cmd: 'uiReturnGetAllLocalTemplateNames', templateNames: keys }); });
}
function l1555(j4032, template) { r1546(h876 + ' ' + j4032, template); }
function i1556(nodeIds) { figma.currentPage.loadAsync().then(() => { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => s1055(k)); for (const key of connKeys) {
    const parts = k1058(key).split(' ');
    if (nodeIds.includes(parts[0]) || nodeIds.includes(parts[2]))
        p1549(key);
} }); }
function x1557(nodeIds) { figma.currentPage.loadAsync().then(() => { i1556(nodeIds); const nodeKeys = figma.currentPage.getPluginDataKeys().filter(k => u1054(k) && nodeIds.includes(g1057(k))); nodeKeys.forEach(k => p1549(k)); }); }
function o1558() { figma.currentPage.loadAsync().then(() => { const nodeKeys = figma.currentPage.getPluginDataKeys().filter(k => u1054(k)); const connKeys = figma.currentPage.getPluginDataKeys().filter(k => s1055(k)); for (const key of nodeKeys)
    p1549(key); for (const key of connKeys)
    p1549(key); }); }
function x1559(y4007) {
    return __awaiter(this, void 0, void 0, function* () { yield b1560(y4007); x1561(y4007); });
}
function b1560(y4007) {
    return __awaiter(this, void 0, void 0, function* () { yield figma.currentPage.loadAsync(); figma.currentPage.getPluginDataKeys().filter(k => u1054(k)).forEach((k) => __awaiter(this, void 0, void 0, function* () { return yield r2102(k, y4007); })); });
}
function x1561(y4007) { figma.currentPage.loadAsync().then(() => { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => s1055(k)); connKeys.sort((key1, key2) => { const p1 = k1058(key1).split(' '); const p2 = k1058(key2).split(' '); if (p1[2] != p2[2])
    return p1[2] < p2[2] ? -1 : 1; if (p1[3] != p2[3])
    return parseInt(p1[3]) - parseInt(p2[3]); if (p1[2] == p2[0])
    return -1; if (p2[2] == p1[0])
    return 1; return 0; }); connKeys.forEach(k => h2105(JSON.parse(figma.currentPage.getPluginData(k)), y4007)); }); }
function h1562(y4007) { figma.currentPage.loadAsync().then(() => { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => s1053(k)); connKeys.forEach(k => console.log('%c' + k, 'background: #fff; color: ' + (y4007 ? 'black' : 'white'))); const pageOrder = figma.currentPage.getPluginData('pageOrder'); console.log('%c' + pageOrder, 'background: #fff; color: ' + (y4007 ? 'black' : 'white')); }); }
function s1563(y4007) { figma.currentPage.loadAsync().then(() => { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => s1053(k)); connKeys.forEach(k => console.log('%c' + figma.currentPage.getPluginData(k), 'background: #fff; color: ' + (y4007 ? 'black' : 'white'))); const pageOrder = figma.currentPage.getPluginData('pageOrder'); console.log('%c' + pageOrder, 'background: #fff; color: ' + (y4007 ? 'black' : 'white')); }); }
function k1564(y4007) { figma.currentPage.loadAsync().then(() => { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => s1055(k)); connKeys.forEach(k => console.log('%c' + k, 'background: #dff; color: ' + (y4007 ? 'black' : 'white'))); }); }
function r1565(y4007) { figma.clientStorage.keysAsync().then(keys => keys.forEach(k => figma.clientStorage.getAsync(k).then(val => console.log(k + ': ' + val)))); }
function w1566(key, spec) {
    return __awaiter(this, void 0, void 0, function* () { let result = null; switch (key) {
        case 'getVariableData':
            result = yield d1602(spec);
            break;
        case 'getPaidStatus':
            result = figma.payments.status.type;
            break;
        case 'figSubscribe': {
            yield figma.payments.initiateCheckoutAsync({ interstitial: 'PAID_FEATURE' });
            result = figma.payments.status.type;
            break;
        }
    } c1527({ cmd: 'returnFigGetValue', value: result }); });
}
function w1567(varIds) { d1602(varIds).then(values => { c1527({ cmd: 'uiReturnFigGetVariableUpdates', values: values }); }); }
function u1568(pageId) {
    return __awaiter(this, void 0, void 0, function* () { p1549(p934(pageId)); const pageOrder = (yield y1547('pageOrder')).split(','); e947(pageOrder, id => id == pageId); b1548('pageOrder', pageOrder.join(',')); });
}
function q1569() { figma.currentPage.loadAsync().then(() => { const pageKeys = figma.currentPage.getPluginDataKeys().filter(k => s1053(k)); pageKeys.forEach(k => p1549(k)); p1549('pageOrder'); }); }
function f1570(key, json) { b1548(key, json); }
function n1571(_keys, _json) { const keys = JSON.parse(_keys); const json = JSON.parse(_json); for (let i = 0; i < keys.length; i++)
    b1548(keys[i], json[i]); }
function u1572(_curKeys, _newKeys, _json) { const curKeys = JSON.parse(_curKeys); const newKeys = JSON.parse(_newKeys); const json = JSON.parse(_json); for (let i = 0; i < curKeys.length; i++) {
    p1549(curKeys[i]);
    b1548(newKeys[i], json[i]);
} }
function v1573(key) { p1549(key); }
function a1574() { figma.currentPage.loadAsync().then(() => { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => s1055(k)); connKeys.forEach(k => p1549(k)); }); }
function f1575(nodeId) { figma.currentPage.loadAsync().then(() => { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => s1055(k)); for (const key of connKeys) {
    const parts = key.split(' ');
    if (parts[4] == nodeId)
        p1549(key);
} }); }
function e1576(nodeId) { figma.currentPage.loadAsync().then(() => { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => s1055(k)); for (const key of connKeys) {
    const parts = key.split(' ');
    if (parts[1] == nodeId)
        p1549(key);
} }); }
function z1577() { figma.getLocalPaintStylesAsync().then(y1581 => { for (const style of y1581) {
    style.setPluginData('type', '');
    style.setPluginData('nodeId', '');
    style.setPluginData('existing', '');
} }); }
function figSaveSnapshot(index, objectIds) {
    return __awaiter(this, void 0, void 0, function* () { const objects = yield figGetObjectsFromIds(objectIds); const group = figma.group(objects, figma.currentPage); const settings = { format: 'PNG' }; const icon = yield group.exportAsync(settings); figma.ungroup(group); c1527({ cmd: 'uiReturnFigSaveSnapshot', index: index, iconWidth: group.width, iconHeight: group.height, icon: icon }); });
}
var f2737 = null;
var e4033 = () => f2737 = null;
var b2738 = 'normal';
function l1593(clientPosition) { c1527({ cmd: 'uiReturnFigGetMousePosition', position: { x: 0, y: 0 }, clientPosition: clientPosition, viewportZoom: figma.viewport.zoom, viewportRect: figma.viewport.bounds }); }
function j1594(x, y, width, height) { return; }
function w1595(dock, rect, bounds) { switch (dock) {
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
function z1596(width, height) { (function () {
    return __awaiter(this, void 0, void 0, function* () { width = Math.floor(Math.max(0, width)); height = Math.floor(Math.max(0, height)); figma.ui.resize(width, height); yield figma.currentPage.loadAsync(); figma.currentPage.setPluginData(figma.currentUser.id + ',windowWidth', width.toString()); figma.currentPage.setPluginData(figma.currentUser.id + ',windowHeight', height.toString()); c1527({ cmd: 'uiReturnFigResizeWindow', width: width, height: height }); });
})(); }
function x2739(dock) {
    return __awaiter(this, void 0, void 0, function* () { if (dock != 'normal' && b2738 == 'normal') {
        figma.clientStorage.setAsync('normalWindowX', yield figma.clientStorage.getAsync('normalWindowX'));
        figma.clientStorage.setAsync('normalWindowY', yield figma.clientStorage.getAsync('normalWindowY'));
        figma.clientStorage.setAsync('normalWindowWidth', yield figma.clientStorage.getAsync('normalWindowWidth'));
        figma.clientStorage.setAsync('normalWindowHeight', yield figma.clientStorage.getAsync('normalWindowHeight'));
    } b2738 = dock; figma.clientStorage.setAsync('windowDock', dock); z1596(yield figma.clientStorage.getAsync('windowWidth'), yield figma.clientStorage.getAsync('windowHeight')); });
}
function m1597(msg) { c1598(msg.text, msg.prefix, msg.delay, msg.error, msg.c1599, msg.j1600); }
function c1598(text, prefix = 'Generator ', delay = 400, error = false, c1599 = '', j1600 = NULL) { const options = { timeout: delay, error: error, onDequeue: e4033 }; if (c1599 != '') {
    options['button'] = { text: c1599 };
    if (j1600.substring(0, 'removeConnection'.length) == 'removeConnection') {
        options['button']['action'] = () => v1573(j1600.split(',')[1]);
    }
    else {
        switch (j1600) {
            case 'hideClearUndoWarning':
                options['button']['action'] = () => c1527({ cmd: 'uiHideClearUndoWarning' });
                break;
        }
    }
} if (f2737)
    f2737.cancel(); f2737 = figma.notify(prefix + text, options); }
function x2740(key, params = null) {
    return __awaiter(this, void 0, void 0, function* () { return yield y2741(key, params); });
}
function y2741(key, params = null) {
    return __awaiter(this, void 0, void 0, function* () { return new Promise((resolve, reject) => { const timeout = 60000; c1527(Object.assign({ cmd: 'uiGetValueForFigma', key: key }, (params || {}))); const y2742 = setTimeout(() => reject(new Error('Timeout: Result not received by Figma within the specified time')), timeout); function p4034(msg) { msg = JSON.parse(msg); if (msg.cmd === 'returnUiGetValueForFigma') {
        clearTimeout(y2742);
        resolve({ key: msg.key, value: msg.value });
        figma.ui.off('message', p4034);
    } } figma.ui.on('message', p4034); }); });
}
var h2743 = [];
var f2744 = [];
var k2745 = 0;
var o2746 = 0;
function k1528(o111) { return (o111[l1390] === 2 ? '' : n872) + (g2800 ? o111[k1384] : o111[p1386]); }
function d1529(b1513, addObject = null, addProps = true, transform = true) {
    return __awaiter(this, void 0, void 0, function* () { if (!e1531(b1513))
        return null; let w1514; switch (b1513[l1382]) {
        case v1219:
            w1514 = h2714(b1513, addProps, transform);
            break;
        case v1222:
            w1514 = s2793(b1513, addProps, transform);
            break;
        case u1225:
            w1514 = w2789(b1513, addProps, transform);
            break;
        case q1237:
            w1514 = d2710(b1513, addProps, transform);
            break;
        case g1240:
            w1514 = p2717(b1513, addProps, transform);
            break;
        case w1243:
            w1514 = e2720(b1513, addProps, transform);
            break;
        case p1246:
            w1514 = f2696(b1513);
            break;
        case o1250:
            w1514 = j2748(b1513, addProps, transform);
            break;
        case v1262:
            w1514 = w2749(b1513, addProps, transform);
            break;
        case b1285:
            w1514 = yield e2750(b1513, addProps, transform);
            break;
        case q1265:
            w1514 = yield p2751(b1513);
            break;
        case q1268:
            w1514 = yield i2752(b1513, addProps, transform);
            break;
    } if (addObject && w1514 != undefined && w1514 != null && !w1514.removed) {
        w1514.name = k1528(b1513);
        o954(b1513[l1382] == q1265 || !!w1514, 'no Figma object created');
        if (w1514 != undefined && w1514 != null) {
            w1514.setPluginData('retain', b1513[l1390].toString());
            if (b1513[l1390] < 2) {
                w1514.setPluginData('userId', figma.currentUser.id);
                w1514.setPluginData('sessionId', figma.currentUser.sessionId.toString());
                w1514.setPluginData('type', b1513[l1382]);
                w1514.setPluginData('nodeId', b1513[d1383]);
                w1514.setPluginData('objectId', b1513[k1384]);
                w1514.setPluginData('isCenter', t939(b1513[g1405]));
                if (b1513[l1382] == p1246)
                    e2766.push(w1514);
                if (b1513[j1404])
                    u1544(w1514);
            }
            addObject(w1514);
        }
    } if (!b1513.counted) {
        o2746++;
        b1513.counted = true;
    } return w1514; });
}
function j1530(w1514, b1513, addProps, transform) {
    return __awaiter(this, void 0, void 0, function* () { if (!e1531(b1513) || w1514 == undefined || w1514 == null || w1514.removed)
        return; w1514.name = k1528(b1513); w1514.setPluginData('retain', b1513[l1390].toString()); switch (b1513[l1382]) {
        case v1219:
            x2715(w1514, b1513, addProps, transform);
            break;
        case v1222:
            c2794(w1514, b1513, addProps, transform);
            break;
        case u1225:
            z2790(w1514, b1513, addProps, transform);
            break;
        case q1237:
            k2711(w1514, b1513, addProps, transform);
            break;
        case g1240:
            p2718(w1514, b1513, addProps, transform);
            break;
        case w1243:
            x2721(w1514, b1513, addProps, transform);
            break;
        case p1246:
            n2753(w1514, b1513);
            break;
        case o1250:
            i2754(w1514, b1513, addProps, transform);
            break;
        case v1262:
            b2755(w1514, b1513, addProps, transform);
            break;
        case b1285:
            c2756(w1514, b1513, addProps, transform);
            break;
        case q1265:
            n2757(w1514, b1513);
            break;
        case q1268:
            e2758(w1514, b1513, addProps, transform);
            break;
    } if (w1514 != undefined && w1514 != null && !w1514.removed) {
        if (w1514.parent == figma.currentPage)
            yield figma.currentPage.loadAsync();
        w1514.parent.appendChild(w1514);
        if (b1513[j1404])
            u1544(w1514);
    } if (!b1513.counted) {
        o2746++;
        b1513.counted = true;
    } });
}
function v2733(i2759, v2760, d2761, a2050 = -1, nodeIds = [], o2762 = false, m2763 = false, c270 = false, addProps = true, transform = true) {
    return __awaiter(this, void 0, void 0, function* () { let z2764 = NULL; let s2765 = null; let abort = false; const t3643 = []; let f2747 = 0; h2743.push(...nodeIds); if (a2050 > -1)
        k2745 = a2050; for (const b1513 of v2760) {
        f2744.push(b1513);
        if (b1513[d1383] != z2764) {
            z2764 = b1513[d1383];
            s2765 = v2730.find(a => a.nodeId == b1513[d1383]);
            if (!s2765) {
                v2730.push(s2765 = { nodeId: b1513[d1383], objects: [] });
            }
        }
        const addObject = w1514 => { if (i2759 != undefined && i2759 != null && !i2759.removed)
            i2759.appendChild(w1514);
        else
            s2765.objects.push(w1514); };
        let objects = i2759 != undefined && i2759 != null && !i2759.removed ? i2759.children : s2765.objects;
        let w1514 = objects.find(o => o.removed || o.getPluginData('userId') == figma.currentUser.id && o.getPluginData('objectId') == b1513[k1384]);
        if (w1514 != undefined && w1514 != null && w1514.removed) {
            m940(objects, w1514);
            if (e2766.includes(w1514))
                w945(e2766, w1514);
            if (k2782.includes(w1514))
                w945(k2782, w1514);
        }
        if (w1514 == undefined || w1514 == null || w1514.removed) {
            const newObj = yield d1529(b1513, addObject, addProps, transform);
            t3643.push(newObj);
        }
        else if (w1514 != undefined && w1514 != null && !w1514.removed && w1514.getPluginData('type') == b1513[l1382].toString()) {
            yield j1530(w1514, b1513, addProps, transform);
            if (w1514 != undefined && w1514 != null && !w1514.removed)
                t3643.push(w1514);
        }
        else {
            w1514.remove();
            if (e2766.includes(w1514))
                w945(e2766, w1514);
            if (k2782.includes(w1514))
                w945(k2782, w1514);
            yield d1529(b1513, addObject, addProps, transform);
        }
        f2747++;
        if (f2747 >= d2761) {
            const result = yield x2740('returnObjectUpdate', { k2745: k2745, o2746: o2746 });
            abort = result.value;
            f2747 = 0;
            if (abort)
                break;
        }
    } if (i2759 != undefined && i2759 != null && !i2759.removed) {
        for (const w1514 of i2759.children) {
            if (w1514 != undefined && w1514 != null && w1514.removed || !v2760.find(o => o[k1384] == w1514.getPluginData('objectId') && w1514.getPluginData('userId') == figma.currentUser.id))
                w1514.remove();
        }
    } for (const point of e2766) {
        if (point.parent == figma.currentPage)
            yield figma.currentPage.loadAsync();
        if (point != undefined && point != null && !point.removed && !point.parent.removed)
            point.parent.appendChild(point);
    } if (m2763 && !abort) {
        w1510(h2743, f2744);
        h2743 = [];
        f2744 = [];
        if (c270 && t3643.length > 0) {
            figma.viewport.scrollAndZoomIntoView(t3643);
            const bounds = g1534(t3643);
            figma.viewport.zoom = Math.min(figma.viewport.bounds.width * figma.viewport.zoom / bounds.width - 0.05, figma.viewport.bounds.height * figma.viewport.zoom / bounds.height - 0.05);
        }
    } yield x2740('returnObjectUpdate', { k2745: k2745, o2746: o2746 }); });
}
function e1531(b1513) { switch (b1513[l1382]) {
    case v1219: return e2713(b1513);
    case v1222: return f2775(b1513);
    case u1225: return y2776(b1513);
    case q1237: return y4030(b1513);
    case g1240: return x2716(b1513);
    case w1243: return e2719(b1513);
    case p1246: return r4029(b1513);
    case o1250: return b2777(b1513);
    case v1262: return t2778(b1513);
    case b1285: return f2779(b1513);
    case q1265: return r2780(b1513);
    case q1268: return l2781(b1513);
} }
function x1532(b1513) {
    return __awaiter(this, void 0, void 0, function* () { (() => __awaiter(this, void 0, void 0, function* () { const w1514 = yield d1529(b1513); const width = w1514.width; const height = w1514.height; w1514.remove(); c1527({ cmd: 'uiForwardToGenerator', msg: { cmd: 'returnFigGetObjectSize', objectId: b1513[k1384], width: width, height: height } }); }))(); });
}
function z1533(w1514) { w1514.setPluginData('type', ''); w1514.setPluginData('nodeId', ''); w1514.setPluginData('userId', ''); w1514.setPluginData('sessionId', ''); w1514.setPluginData('objectId', ''); w1514.setPluginData('isCenter', ''); w1514.setPluginData('retain', ''); }
function g1534(objects) { const bounds = { left: 0, top: 0, right: 0, bottom: 0 }; for (const o111 of objects) {
    if (o111.x < bounds.left || bounds.left == bounds.right)
        bounds.left = o111.x;
    if (o111.y < bounds.top || bounds.top == bounds.bottom)
        bounds.top = o111.y;
    if (o111.x + o111.width > bounds.right || bounds.left == bounds.right)
        bounds.right = o111.x + o111.width;
    if (o111.y + o111.height > bounds.bottom || bounds.top == bounds.bottom)
        bounds.bottom = o111.y + o111.height;
} return { x: bounds.left, y: bounds.top, width: bounds.right - bounds.left, height: bounds.bottom - bounds.top }; }
function figExport(objectIds, scale, format, suffix) {
    return __awaiter(this, void 0, void 0, function* () { yield figma.currentPage.loadAsync(); for (const objId of objectIds) {
        let w1514 = figma.currentPage.children.find(o => !o.removed && o.getPluginData('userId') == figma.currentUser.id && o.getPluginData('objectId') == objId);
        if (!w1514)
            continue;
        const settings = { constraint: { type: 'SCALE', value: scale }, format: format == 0 ? 'PNG' : 'JPG', suffix: suffix };
        yield w1514.exportAsync(settings);
    } });
}
const k2782 = [];
const f2783 = [];
function f1535(d1536, x1537) { const effects = []; for (const effect of d1536) {
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
                if (x1537 && !isNaN(spread))
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
function v2703(w1514, b1513, phantom = true) { u1540(w1514, b1513); o2704(w1514, b1513, phantom); m2705(w1514, b1513); w1514.opacity = b1513[v1406]; w1514.blendMode = b1513[t1407]; const maskType = b1513[u1408]; w1514.isMask = maskType > 0; if (w1514.isMask) {
    switch (maskType) {
        case 1:
            w1514.maskType = 'ALPHA';
            break;
        case 2:
            w1514.maskType = 'VECTOR';
            break;
        case 3:
            w1514.maskType = 'LUMINANCE';
            break;
    }
} if (w1514.isMask && w1514.fills.length == 0 && w1514.strokes.length == 0)
    w1514.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 }, opacity: 1, blendMode: 'NORMAL' }]; }
function m2705(w1514, b1513) { if (!!b1513[t1395] && !isEmpty(b1513[t1395])) {
    w1514.fills = w958(b1513[t1395]);
    if (k2782.includes(w1514))
        w945(k2782, w1514);
}
else
    w1514.fills = []; }
function o2704(w1514, b1513, phantom = true) { if (b1513[s1396] != null && !isEmpty(b1513[s1396])) {
    k1539(w1514, w958(b1513[s1396]), b1513[p1397], b1513[o1398], b1513[w1399], b1513[g1400], b1513[t1401], x2706(b1513[t1402]));
    if (b1513[j1404])
        w1514.setPluginData('dashes', b1513[t1402]);
    if (k2782.includes(w1514))
        w945(k2782, w1514);
    if (b1513[j1404])
        j951(f2783, w1514);
}
else if (isEmpty(b1513[t1395]) && isEmpty(b1513[s1396]) && !b1513[u1408] && phantom) {
    f1542(w1514);
    j951(k2782, w1514);
}
else
    w1514.strokes = []; }
function x2706(j1538) { j1538 = j1538; j1538 = b956(j1538, ','); j1538 = k957(j1538, ','); j1538 = j1538.trim(); return j1538 == '' ? [] : j1538.split(',').map(s => Math.max(0, parseFloat(s))); }
function q2707(j1538) { j1538 = j1538; j1538 = b956(j1538, ','); j1538 = k957(j1538, ','); j1538 = j1538.trim(); return j1538 == '' ? [] : j1538.split(',').map(s => Math.max(0, parseFloat(s) / v2709)); }
function k1539(w1514, fills, weight, align, join, miterLimit, cap, dashes = []) { w1514.strokes = fills; w1514.strokeWeight = Math.max(0, weight); w1514.strokeAlign = align; w1514.strokeJoin = join; const miterAngle = miterLimit / 360 * Tau; const i2784 = 1 / Math.sin(miterAngle / 2); w1514.strokeMiterLimit = Math.min(Math.max(0, i2784), 16); w1514.strokeCap = cap; w1514.dashPattern = dashes; }
function u1540(w1514, b1513) { if (!!b1513[j1403] && !isEmpty(b1513[j1403])) {
    const x1537 = b1513[l1382] == v1219 || b1513[l1382] == u1225 || b1513[l1382] == q1268;
    w1514.effects = f1535(b1513[j1403], x1537);
}
else
    w1514.effects = []; }
function h1541() { for (const o111 of k2782) {
    if (o111.removed)
        w945(k2782, o111);
    else
        f1542(o111);
} }
function f1542(o111) { figma.currentPage.loadAsync().then(() => { const back = figma.currentPage.backgrounds.find(b => b.type == 'SOLID'); let phantomColor; if (back) {
    const l = back.color.r * 0.2126 + back.color.g * 0.7152 + back.color.b * 0.0722;
    phantomColor = l > 0.5 ? { r: 0, g: 0, b: 0 } : { r: 1, g: 1, b: 1 };
}
else
    phantomColor = { r: 1, g: 0, b: 1 }; k1539(o111, [{ type: 'SOLID', color: phantomColor, opacity: 0.5 }], 1 / v2709, 'CENTER', 'MITER', 1, 'NONE', [1 / v2709, 2 / v2709]); }); }
function n1543() { for (const w1514 of f2783) {
    if (w1514.removed)
        w945(f2783, w1514);
    else
        u1544(w1514);
} }
function u1544(w1514) { w1514.strokeWeight = Math.max(0, 1.5 / v2709); if (r925(w1514.getPluginData('isCenter'))) {
    const path = w1514.vectorPaths[0];
    const parts = path.data.split(' ');
    let t = { x: parseFloat(parts[1]), y: parseFloat(parts[2]) };
    let c = { x: parseFloat(parts[4]), y: parseFloat(parts[5]) };
    let r = { x: parseFloat(parts[7]), y: parseFloat(parts[8]) };
    const a = 2;
    const b = 0.05;
    const f = 1 - Math.pow(1 - Math.min(v2709, 1), a) / Math.pow(a, b);
    t = t897(c, b899(b884(v902(t, c)), objectCenterSize / f));
    r = t897(c, b899(b884(v902(r, c)), objectCenterSize / f));
    parts[1] = t.x;
    parts[2] = t.y;
    parts[4] = c.x;
    parts[5] = c.y;
    parts[7] = r.x;
    parts[8] = r.y;
    const f2785 = { windingRule: path.windingRule, data: parts.join(' ') };
    w1514.vectorPaths = [f2785];
} const dashes = w1514.getPluginData('dashes'); if (dashes != '')
    w1514.dashPattern = q2707(dashes); }
function a1578(nodeId, px, py) { figma.getLocalPaintStylesAsync().then(_styles => { const styles = new Array(); for (const x168 of _styles) {
    const _nodeId = x168.getPluginData('nodeId');
    const _existing = x168.getPluginData('existing');
    const existing = !!_existing;
    const style = { id: x168.id, nodeId: _nodeId, name: x168.name, existing: existing, paints: new Array() };
    let onlyPaint = true;
    for (const t2787 of x168.paints) {
        if (t2787.type == 'SOLID') {
            style.paints.push([t2787.color.r, t2787.color.g, t2787.color.b, t2787.opacity]);
        }
        else {
            onlyPaint = false;
            break;
        }
    }
    if (onlyPaint)
        styles.push(style);
} c1527({ cmd: 'uiReturnFigGetAllLocalColorStyles', nodeId: nodeId, px: px, py: py, styles: JSON.stringify(styles) }); }); }
function h1579(nodeId, styleId) { figma.getLocalPaintStylesAsync().then(y1581 => { if (styleId != NULL)
    m1580(y1581, nodeId, styleId);
else
    a1582(y1581, nodeId); }); }
function m1580(y1581, nodeId, styleId, clearExisting = true) { const c2786 = g2732.find(a => a.nodeId == nodeId); if (c2786 && clearExisting)
    a1582(y1581, nodeId); const h1586 = y1581.find(s => s.id == styleId); o954(!!h1586, 'figStyle should be found here'); h1586.setPluginData('type', r1216); h1586.setPluginData('nodeId', nodeId); h1586.setPluginData('existing', t939(true)); g2732.push({ nodeId: nodeId, existing: true, styles: [h1586] }); return h1586; }
function a1582(y1581, nodeId) { const h1586 = y1581.find(s => s.getPluginData('nodeId') == nodeId); o954(!!h1586, 'figStyle should be found here'); if (h1586) {
    h1586.setPluginData('type', NULL);
    h1586.setPluginData('nodeId', NULL);
    h1586.setPluginData('existing', NULL);
    e947(g2732, a => a.nodeId == nodeId);
} return h1586; }
function v1583(styles, w1587) { const h1586 = figma.createPaintStyle(); h1586.setPluginData('type', w1587[l1382]); h1586.setPluginData('nodeId', w1587[d1383]); h1586.name = w1587[n1387]; setStylePaints(h1586, w1587); styles.push(h1586); c1527({ cmd: 'uiSetStyleId', nodeId: w1587[d1383], styleId: h1586.id }); return h1586; }
function w1584(msg) { let z2764 = NULL; let c2786; for (const w1587 of msg.styles) {
    if (w1587[d1383] != z2764) {
        z2764 = w1587[d1383];
        c2786 = g2732.find(a => a.nodeId == w1587[d1383]);
        if (!c2786) {
            c2786 = { nodeId: w1587[d1383], styles: [] };
            g2732.push(c2786);
        }
    }
    else
        c2786 = null;
    const h1586 = c2786.styles[0];
    figma.getLocalPaintStylesAsync().then(y1581 => { const localStyle = y1581.find(s => s.getPluginData('nodeId') == w1587[d1383]); if (isValid(h1586) && !isValid(localStyle)) {
        m940(c2786.styles, h1586);
    } const existing = isValid(h1586) && isValid(localStyle) && h1586.getPluginData('existing'); if (!isValid(h1586) || !isValid(localStyle)) {
        if (!existing) {
            d1517 = true;
            h1579(w1587[d1383], w1587[w1385]);
        }
    }
    else if (isValid(h1586) && h1586.getPluginData('type') == w1587[l1382]) {
        d1517 = true;
        g1585(localStyle, w1587);
    } });
} }
function g1585(h1586, w1587) { setStylePaints(h1586, w1587); h1586.name = w1587[n1387]; }
function getStylePaints(stylePaints) { const paints = new Array(); for (const t2787 of stylePaints) {
    const fill = t2787[1].split(' ');
    switch (t2787[0]) {
        case 'SOLID':
            paints.push({ type: 'SOLID', color: { r: Math.min(Math.max(0, parseFloat(fill[0]) / 0xff), 1), g: Math.min(Math.max(0, parseFloat(fill[1]) / 0xff), 1), b: Math.min(Math.max(0, parseFloat(fill[2]) / 0xff), 1) }, opacity: Math.min(Math.max(0, parseFloat(fill[3]) / 100), 1) });
            break;
    }
} return paints; }
function setStylePaints(h1586, w1587) { if (!isEmpty(w1587[z1389]))
    h1586.paints = getStylePaints(w1587[z1389]);
else
    h1586.paints = []; }
function u1601(nodeId, px, py) {
    return __awaiter(this, void 0, void 0, function* () { figma.variables.getLocalVariablesAsync().then((m2788) => __awaiter(this, void 0, void 0, function* () { const variables = new Array(); for (const _var of m2788) {
        const collection = yield figma.variables.getVariableCollectionByIdAsync(_var.variableCollectionId);
        const variable = { id: _var.id, resolvedType: _var.resolvedType, name: _var.name, collectionName: collection.name };
        variables.push(variable);
    } figma.variables.getLocalVariableCollectionsAsync().then((collections) => __awaiter(this, void 0, void 0, function* () { c1527({ cmd: 'uiReturnFigGetAllLocalVariables', nodeId: nodeId, px: px, py: py, variables: JSON.stringify(variables), nCollections: collections.length }); })); })); });
}
function d1602(varIds) {
    return __awaiter(this, void 0, void 0, function* () { const m2788 = yield figma.variables.getLocalVariablesAsync(); const variables = varIds.map(id => m2788.find(v => v.id == id)); let values = []; for (let i = 0; i < varIds.length; i++) {
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
function k1603(nodeId, varId) { figma.variables.getLocalVariablesAsync().then(m2788 => { figLinkVariableAsync(m2788, nodeId, varId); }); }
function figUpdateVariableAsync(varId, value) {
    return __awaiter(this, void 0, void 0, function* () { figma.variables.getLocalVariablesAsync().then((m2788) => __awaiter(this, void 0, void 0, function* () { let variable = m2788.find(v => v.id == varId); if (!variable)
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
function figLinkVariableAsync(m2788, nodeId, varId) {
    return __awaiter(this, void 0, void 0, function* () { let variable = m2788.find(v => v.id == varId); if (!variable)
        return null; const [resolvedVar, values] = yield figGetResolvedVariableValuesAsync(variable); c1527({ cmd: 'uiReturnFigLinkNodeToVariable', nodeId: nodeId, variableId: resolvedVar ? resolvedVar.id : NULL, variableName: resolvedVar ? resolvedVar.name : '', resolvedType: resolvedVar ? resolvedVar.resolvedType : NULL, values: values }); return resolvedVar; });
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
function r1588(tl, tr, bl) { let vr = point(tr.x - tl.x, tr.y - tl.y); let vb = point(bl.x - tl.x, bl.y - tl.y); let sx = vr.x; let sy = vb.y; let kx = -vr.y; let ky = -vb.x; let dx = -tl.x; let dy = -tl.y; const _sx = kx / nozero(sx); const _sy = ky / nozero(sy); let q4211 = r887([[1, _sy, 0], [_sx, 1, 0], [0, 0, 1]], c891(dx, dy)); q4211 = e889(q4211); const a = v881(vr); if (a > Tau / 4 && a < Tau * 3 / 4)
    q4211 = r887(q4211, c891(0, 0, 1, 1, Tau / 2)); if (determinant(q4211) < 0)
    q4211 = r887(q4211, c891(0, 0, -1, 1, 0)); return q4211; }
function v1589(w1514, tl, tr, bl) { const q4211 = r1588(tl, tr, bl); w1514.relativeTransform = [q4211[0], q4211[1]]; }
function w1590(w1514, b1513, setSize = true, noHeight = 0.01) { if (!b1513[y1391] || !b1513[n1392] || !b1513[n1393])
    return; const xp0 = b1513[y1391]; const xp1 = b1513[n1392]; const xp2 = b1513[n1393]; v1589(w1514, xp0, xp1, xp2); if (setSize) {
    const d892 = distv(xp0, xp1);
    const a893 = distv(xp0, xp2);
    const height = b1513[l1382] == w1243 ? b1513[a1426] : b1513[j1413];
    if (!w1514.removed) {
        w1514.resizeWithoutConstraints(Math.max(0.01, d892), height ? Math.max(0.01, a893) : noHeight);
    }
} }
function g1591(l2701, m2702) { if (l2701.removed)
    return; l2701.resizeWithoutConstraints(0.01, 0.01); l2701.setPluginData('actualX', m2702[i1409].toString()); l2701.setPluginData('actualY', m2702[f1411].toString()); l2701.x = m2702[i1409]; l2701.y = m2702[f1411]; l2701.rotation = m2702[g1405] ? 45 : 0; }
function j1592(l2701) { if (!l2701.removed)
    l2701.resizeWithoutConstraints(0.01, 0.01); }
function f2779(genBool) { return true; }
function e2750(genBool, addProps, transform) {
    return __awaiter(this, void 0, void 0, function* () { let objects = []; for (const o111 of genBool[FO_BOOLEAN_CHILDREN])
        yield d1529(o111, o => objects = [...objects, o], false); yield figma.currentPage.loadAsync(); let figBool = null; if (!isEmpty(objects)) {
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
        c2756(figBool, genBool, addProps, transform);
    } return figBool; });
}
function c2756(figBool, genBool, addProps, transform) {
    return __awaiter(this, void 0, void 0, function* () { if (genBool[FO_BOOLEAN_CHILDREN].length == 0) {
        figBool.remove();
        return;
    } yield v2733(figBool, genBool[FO_BOOLEAN_CHILDREN], genBool[FO_BOOLEAN_CHILDREN].length, -1, [], false, false, false, false, true); const hasProps = genBool[t1395].length > 0 || genBool[s1396].length > 0 || genBool[j1403].length > 0; v2703(figBool, genBool, !hasProps && addProps); });
}
function y2776(z2767) { return z2767[i1409] != null && !isNaN(z2767[i1409]) && z2767[f1411] != null && !isNaN(z2767[f1411]) && z2767[k1412] != null && !isNaN(z2767[k1412]) && z2767[j1413] != null && !isNaN(z2767[j1413]) && z2767[w1415] != null && !isNaN(z2767[w1415]) && z2767[f1422] != null && !isNaN(z2767[f1422]) && z2767[e1428] != null && !isNaN(z2767[e1428]) && z2767[t1432] != null && !isNaN(z2767[t1432]); }
function w2789(z2767, addProps, transform) { if (!y2776(z2767))
    return null; const g2768 = figma.createEllipse(); z2790(g2768, z2767, addProps, transform, true); return g2768; }
function z2790(g2768, z2767, addProps, transform, isValid = false) { if (!isValid && !y2776(z2767))
    return; c2791(g2768, z2767, transform); if (e2766.includes(g2768))
    r2698(g2768);
else
    v2703(g2768, z2767, addProps); }
function c2791(g2768, z2767, transform) { g2768.cornerRadius = z2767[w1415]; const start = z2767[f1422] / 360 * (Math.PI * 2); const sweep = z2767[e1428] / 100 * (Math.PI * 2); g2768.arcData = { startingAngle: start, endingAngle: start + sweep, innerRadius: Math.min(Math.max(0, z2767[t1432] / 100), 1) }; if (transform)
    w1590(g2768, z2767); }
function l2781(g2769) { return g2769[i1409] != null && !isNaN(g2769[i1409]) && g2769[f1411] != null && !isNaN(g2769[f1411]) && g2769[k1412] != null && !isNaN(g2769[k1412]) && g2769[j1413] != null && !isNaN(g2769[j1413]) && g2769[b1421] != null && !isNaN(g2769[b1421]); }
function i2752(g2769, addProps, transform) {
    return __awaiter(this, void 0, void 0, function* () { if (!l2781(g2769))
        return null; const h2770 = figma.createFrame(); h2770.expanded = false; if (h2770) {
        a2792(h2770, g2769, addProps, transform);
        let objects = [];
        for (const o111 of g2769[m1427])
            yield d1529(o111, o => objects = [...objects, o]);
        for (const o111 of objects)
            h2770.appendChild(o111);
    } return h2770; });
}
function e2758(h2770, g2769, addProps, transform) { a2792(h2770, g2769, addProps, transform); v2733(h2770, g2769[m1427], g2769[m1427].length); }
function a2792(h2770, g2769, addProps, transform) { h2770.cornerRadius = g2769[b1421]; if (transform)
    w1590(h2770, g2769); v2703(h2770, g2769, addProps && g2769[m1427].length == 0); }
function r2780(s2771) { return true; }
function p2751(s2771) {
    return __awaiter(this, void 0, void 0, function* () { let objects = []; for (const o111 of s2771[q1410])
        yield d1529(o111, o => objects = [...objects, o]); yield figma.currentPage.loadAsync(); const o2772 = !isEmpty(objects) ? figma.group(objects, figma.currentPage) : null; if (o2772) {
        o2772.expanded = false;
        n2757(o2772, s2771);
    } return o2772; });
}
function n2757(o2772, s2771) { if (s2771[q1410].length == 0) {
    o2772.remove();
    return;
} v2733(o2772, s2771[q1410], s2771[q1410].length); u1540(o2772, s2771); }
function f2775(r2773) { return r2773[i1409] != null && !isNaN(r2773[i1409]) && r2773[f1411] != null && !isNaN(r2773[f1411]) && r2773[k1412] != null && !isNaN(r2773[k1412]); }
function s2793(r2773, addProps, transform) { if (!f2775(r2773))
    return null; const g2774 = figma.createLine(); c2794(g2774, r2773, addProps, transform, true); return g2774; }
function c2794(g2774, r2773, addProps, transform, isValid = false) { if (!isValid && !f2775(r2773))
    return; if (transform)
    w1590(g2774, r2773, true, 0); v2703(g2774, r2773, addProps); }
var e2766 = [];
function r4029(m2702) { return m2702[i1409] != null && !isNaN(m2702[i1409]) && m2702[f1411] != null && !isNaN(m2702[f1411]); }
function f2696(m2702) { const l2701 = m2702[g1405] ? figma.createRectangle() : figma.createEllipse(); if (!r4029(m2702))
    return l2701; if (e2766.includes(l2701))
    z2700(l2701, m2702);
else
    n2753(l2701, m2702); return l2701; }
function n2753(l2701, m2702) { g1591(l2701, m2702); n2699(l2701); }
function y2697() { c1527({ cmd: 'uiUpdateZoom', zoom: figma.viewport.zoom }); for (const point of e2766)
    r2698(point); }
function r2698(l2701) { j1592(l2701); n2699(l2701); }
function z2700(l2701, m2702) { g1591(l2701, m2702); n2699(l2701); }
function n2699(l2701) { if (l2701.removed)
    return; figma.currentPage.loadAsync().then(() => { const d3740 = r925(l2701.getPluginData('isCenter')); const y2708 = figma.currentPage.selection.includes(l2701); const color = d3740 ? [0xf2, 0x48, 0x22] : y2708 ? [12, 140, 233] : [255, 255, 255]; const border = d3740 ? [255, 255, 255] : y2708 ? [255, 255, 255] : [12, 140, 233]; l2701.fills = w958([['SOLID', color[0], color[1], color[2], 100]]); const effects = []; effects.push(...f1535([['DROP_SHADOW', border[0] / 255, border[1] / 255, border[2] / 255, 1, 0, 0, 0, (d3740 ? 3 : y2708 ? 5 : 3.6) / v2709, 'NORMAL', true, true]], true)); effects.push(...f1535([['DROP_SHADOW', color[0] / 255, color[1] / 255, color[2] / 255, 1, 0, 0, 0, (y2708 ? 4 : 2.4) / v2709, 'NORMAL', true, true]], true)); l2701.effects = effects; }); }
function y4030(genPoly) { return genPoly[i1409] != null && !isNaN(genPoly[i1409]) && genPoly[f1411] != null && !isNaN(genPoly[f1411]) && genPoly[k1412] != null && !isNaN(genPoly[k1412]) && genPoly[j1413] != null && !isNaN(genPoly[j1413]) && genPoly[n1418] != null && !isNaN(genPoly[n1418]) && genPoly[h1424] != null && !isNaN(genPoly[h1424]); }
function d2710(genPoly, addProps, transform) { if (!y4030(genPoly))
    return null; const figPoly = figma.createPolygon(); k2711(figPoly, genPoly, addProps, transform, true); return figPoly; }
function k2711(figPoly, genPoly, addProps, transform, isValid = false) { if (!isValid && !y4030(genPoly))
    return; figPoly.cornerRadius = genPoly[n1418]; figPoly.pointCount = Math.max(3, genPoly[h1424]); if (transform)
    w1590(figPoly, genPoly); v2703(figPoly, genPoly, addProps); }
function e2713(u2712) { return u2712[i1409] != null && !isNaN(u2712[i1409]) && u2712[f1411] != null && !isNaN(u2712[f1411]) && u2712[k1412] != null && !isNaN(u2712[k1412]) && u2712[j1413] != null && !isNaN(u2712[j1413]) && u2712[a1414] != null && !isNaN(u2712[a1414]); }
function h2714(u2712, addProps, transform) { if (!e2713(u2712))
    return null; const figRect = figma.createRectangle(); x2715(figRect, u2712, addProps, transform, true); return figRect; }
function x2715(figRect, u2712, addProps, transform, isValid = false) { if (!isValid && !e2713(u2712))
    return; const found = u2712[j1403].findIndex(e => e[0] == 'ROUND_CORNERS'); if (found > -1) {
    const corners = u2712[j1403][found];
    figRect.topLeftRadius = corners[1];
    figRect.topRightRadius = corners[2];
    figRect.bottomLeftRadius = corners[3];
    figRect.bottomRightRadius = corners[4];
}
else
    figRect.cornerRadius = u2712[a1414]; if (transform)
    w1590(figRect, u2712); v2703(figRect, u2712, addProps); }
function x2716(r2726) { return r2726[i1409] != null && !isNaN(r2726[i1409]) && r2726[f1411] != null && !isNaN(r2726[f1411]) && r2726[k1412] != null && !isNaN(r2726[k1412]) && r2726[j1413] != null && !isNaN(r2726[j1413]) && r2726[w1419] != null && !isNaN(r2726[w1419]) && r2726[o1425] != null && !isNaN(r2726[o1425]) && r2726[t1430] != null && !isNaN(r2726[t1430]); }
function p2717(r2726, addProps, transform) { if (!x2716(r2726))
    return null; const t2727 = figma.createStar(); p2718(t2727, r2726, addProps, transform, true); return t2727; }
function p2718(t2727, r2726, addProps, transform, isValid = false) { if (!isValid && !x2716(r2726))
    return; t2727.cornerRadius = r2726[w1419]; t2727.pointCount = r2726[o1425]; t2727.innerRadius = Math.min(Math.max(0, r2726[t1430] / 100), 1); if (transform)
    w1590(t2727, r2726); v2703(t2727, r2726, addProps); }
const m4273 = [];
function e2719(y2723) { return y2723[d1431] != null && y2723[i1409] != null && !isNaN(y2723[i1409]) && y2723[f1411] != null && !isNaN(y2723[f1411]) && y2723[k1412] != null && !isNaN(y2723[k1412]) && y2723[j1413] != null && !isNaN(y2723[j1413]) && y2723[r1433] != null && y2723[r1433] != NULL && y2723[w1434] != null && !isNaN(y2723[w1434]); }
function e2720(y2723, addProps, transform) { if (!e2719(y2723))
    return null; const u2795 = figma.createText(); x2721(u2795, y2723, addProps, transform, true); return u2795; }
function x2721(u2795, y2723, addProps, transform, isValid = false) { if (!isValid && !e2719(y2723))
    return null; const fontName = { family: y2723[r1433], style: y2723[n1435] }; try {
    if (!m4273.includes(fontName)) {
        figma.loadFontAsync(fontName).then(() => { m4273.push(fontName); j2722(u2795, y2723, fontName, addProps, transform); });
    }
    else {
        j2722(u2795, y2723, fontName, addProps, transform);
    }
}
catch (e) {
    u955(e);
} }
function j2722(u2795, y2723, fontName, addProps, transform) { u2795.fontName = fontName; u2795.fontSize = Math.max(1, y2723[w1434]); u2795.characters = y2723[d1431]; u2795.lineHeight = { unit: 'PERCENT', value: y2723[t1438] }; u2795.letterSpacing = { unit: 'PERCENT', value: y2723[d1439] }; if (y2723[e1436] == 0)
    u2795.textAlignHorizontal = 'LEFT';
else if (y2723[e1436] == 1)
    u2795.textAlignHorizontal = 'CENTER';
else if (y2723[e1436] == 2)
    u2795.textAlignHorizontal = 'RIGHT';
else if (y2723[e1436] == 3)
    u2795.textAlignHorizontal = 'JUSTIFIED'; if (y2723[b1437] == 0)
    u2795.textAlignVertical = 'TOP';
else if (y2723[b1437] == 1)
    u2795.textAlignVertical = 'CENTER';
else if (y2723[b1437] == 2)
    u2795.textAlignVertical = 'BOTTOM'; if (transform)
    w1590(u2795, y2723); v2703(u2795, y2723, addProps); if (y2723[m1420] == 0 && y2723[a1426] == 0)
    u2795.textAutoResize = 'WIDTH_AND_HEIGHT';
else if (y2723[m1420] == 0)
    u2795.textAutoResize = 'HEIGHT';
else
    u2795.textAutoResize = 'NONE'; }
function t2778(b2728) { return true; }
function w2749(b2728, addProps, transform) { if (!t2778(b2728))
    return null; const m2729 = figma.createVector(); b2755(m2729, b2728, addProps, transform, true); return m2729; }
function b2755(m2729, b2728, addProps, transform, isValid = false) { if (!isValid && !t2778(b2728))
    return; m2729.setVectorNetworkAsync(b2728[y1416]); if (transform)
    w1590(m2729, b2728, false); v2703(m2729, b2728, addProps); }
function b2777(q2724) { return q2724[c1423] != null && !isNaN(q2724[c1423]) && q2724[e1429] != null && !isNaN(q2724[e1429]); }
function j2748(q2724, addProps, transform) { const g2725 = figma.createVector(); i2754(g2725, q2724, addProps, transform, true); return g2725; }
function i2754(g2725, q2724, addProps, transform, isValid = false) { if (!isValid && !b2777(q2724))
    return; g2725.vectorPaths = [{ windingRule: q2724[c1423] == 1 ? 'NONZERO' : 'EVENODD', data: q2724[t1417] }]; g2725.cornerRadius = q2724[e1429]; if (transform)
    w1590(g2725, q2724, false); v2703(g2725, q2724, addProps); }
