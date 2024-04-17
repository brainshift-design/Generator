var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function a1051(key, tag) { return key.substring(0, tag.length + 1) == tag + ' '; }
function q1052(key, tag) { return key.substring(tag.length + 1); }
function s1053(key) { return a1051(key, e875); }
function k1054(key) { return a1051(key, b873); }
function f1055(key) { return a1051(key, l874); }
function o1056(key) { return q1052(key, e875); }
function z1057(key) { return q1052(key, b873); }
function q1058(key) { return q1052(key, l874); }
const generatorVersion = 403;
const e867 = 2147483647;
const NULL = '';
const p868 = '  ';
const c869 = '    ';
const s870 = '\n';
const h871 = '◦ G •';
const q872 = h871 + ' ';
const b873 = 'G_NODE';
const l874 = 'G_CONN';
const e875 = 'G_PAGE';
const l876 = 'G_TEMP';
const minWindowWidth = 602;
const minWindowHeight = 39;
const identity = Object.freeze([[1, 0, 0], [0, 1, 0], [0, 0, 1]]);
const Epsilon = 0.0000001;
const Tau = Math.PI * 2;
var h2540 = false;
function a877(x, eps = 0.000000001) { return Math.abs(x) < eps ? 0 : x; }
function nozero(x, eps = 0.000000001) { return x != 0 ? x : (x < 0 ? -eps : eps); }
function c878(v, eps = 0.000000001) { return point(nozero(v.x, eps), nozero(v.y, eps)); }
function equal(a, b, eps = 0.000000001) { return Math.abs(b - a) < eps; }
function sqr(x) { return x * x; }
;
function cube(x) { return x * x * x; }
;
function z879(f) { return Math.floor(f) | 0; }
function d880(x) { x = z879(x); x--; x |= x >> 1; x |= x >> 2; x |= x >> 4; x |= x >> 8; x |= x >> 16; x |= x >> 32; return ++x; }
function gcd(a, b) { let temp; while (1) {
    temp = a % b;
    if (temp == 0)
        return b;
    a = b;
    b = temp;
} }
function distv(p1, p2) { const dx = p2.x - p1.x; const dy = p2.y - p1.y; return Math.sqrt(dx * dx + dy * dy); }
function o881(v) { let angle = Math.atan2(v.y, v.x); if (angle < 0)
    angle += Tau; return angle; }
function anglev2(v1, v2) { return anglev2_(v1.x, v1.y, v2.x, v2.y); }
function anglev2_(x1, y1, x2, y2) { const dx = x2 - x1; const dy = y2 - y1; let angle = Math.atan2(dy, dx); if (angle < 0)
    angle += Tau; return angle; }
function e883(v) { return Math.sqrt(v.x * v.x + v.y * v.y); }
function lengthv_(x, y) { return Math.sqrt(x * x + y * y); }
function k884(v) { return point(v.x == 0 ? 0 : v.x / e883(v), v.y == 0 ? 0 : v.y / e883(v)); }
function dotv(v1, v2) { return v1.x * v2.x + v1.y * v2.y; }
function n885(a1, a2) { let diff = a2 - a1; while (diff <= -Tau / 2)
    diff += Tau; while (diff > Tau / 2)
    diff -= Tau; return diff; }
function x886(v, m) { let v3 = [v.x, v.y, 1]; let r = y950(v3, m); return point(r[0], r[1]); }
function k887(...mm) { d954(mm.length > 0, 'mulm3m3() must take at least one argument'); let result = clone(mm[0]); for (let a = 1; a < mm.length; a++) {
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
function w888(m, s) { for (let i = 0; i < 3; i++)
    for (let j = 0; j < 3; j++)
        m[i][j] /= s; return m; }
function adjugate(m) { return cofactor(transpose(m)); }
function transpose(m) { return [[m[0][0], m[1][0], m[2][0]], [m[0][1], m[1][1], m[2][1]], [m[0][2], m[1][2], m[2][2]]]; }
function cofactor(m) { return [[m[1][1] * m[2][2] - m[2][1] * m[1][2], -(m[1][0] * m[2][2] - m[2][0] * m[1][2]), m[1][0] * m[2][1] - m[2][0] * m[1][1]], [-(m[0][1] * m[2][2] - m[2][1] * m[0][2]), m[0][0] * m[2][2] - m[2][0] * m[0][2], -(m[0][0] * m[2][1] - m[2][0] * m[0][1])], [m[0][1] * m[1][2] - m[1][1] * m[0][2], -(m[0][0] * m[1][2] - m[1][0] * m[0][2]), m[0][0] * m[1][1] - m[1][0] * m[0][1]]]; }
function determinant(m) { return m[0][0] * (m[1][1] * m[2][2] - m[1][2] * m[2][1]) - m[0][1] * (m[1][0] * m[2][2] - m[2][0] * m[1][2]) + m[0][2] * (m[1][0] * m[2][1] - m[2][0] * m[1][1]); }
function p889(m) { return w888(adjugate(m), determinant(m)); }
function s890(angle) { const cosA = a877(Math.cos(angle)); const sinA = a877(Math.sin(angle)); return [[cosA, sinA, 0], [-sinA, cosA, 0], [0, 0, 1]]; }
function k891(x = 0, y = 0, g892 = 1, d893 = 1, angle = 0, c894 = 0, f895 = 0) { const cosA = Math.cos(angle); const sinA = Math.sin(angle); return [[g892 * cosA - f895 * sinA, -c894 * cosA + d893 * sinA, x], [f895 * cosA + g892 * sinA, d893 * cosA + c894 * sinA, y], [0, 0, 1]]; }
function g896(v1, v2) { return v1.x * v2.y - v1.y * v2.x; }
function c897(v1, v2) { return point(v1.x + v2.x, v1.y + v2.y); }
function sqrv(v) { return w898(v, v); }
function w898(v1, v2) { return point(v1.x * v2.x, v1.y * v2.y); }
function p899(v, s) { return point(v.x * s, v.y * s); }
function t900(v1, v2) { return point(v1.x / v2.x, v1.y / v2.y); }
function t901(v, s) { return point(v.x / s, v.y / s); }
function q902(v1, v2) { return point(v1.x - v2.x, v1.y - v2.y); }
function g903(str) { return decodeURI(encodeURIComponent(str)); }
function e904(str) { return decodeURIComponent(encodeURI(str)); }
function p905(bytes) { let str = ''; for (let i = 0; i < bytes.length; i++)
    str += String.fromCharCode(bytes[i]); return str; }
function q906(str) { return Array.from(e904(str), c => c.charCodeAt(0)); }
function g907(array, size) { const newArray = new Uint8Array(size); m908(array, newArray); return newArray; }
function m908(src, dst) { g909(src, 0, src.length, dst, 0, dst.length); }
function g909(src, b910, a911, dst, t912, g913) { const size = Math.min(a911, g913); for (let i = 0; i < size; i++)
    dst[t912 + i] = src[b910 + i]; }
function s914(z915, h916) { if (z915.length != h916.length)
    return false; for (let i = 0; i < z915.length; i++) {
    if (z915[i] != h916[i])
        return false;
} return true; }
function d917(a918, y919) { return a918.findIndex(i => y919.includes(i)) > -1; }
function m920(list) { return list ? '<==' : '<--'; }
;
function o921(list) { return list ? '==>' : '-->'; }
;
function h922(nodeId) { return b873 + ' ' + nodeId; }
function z923(name) { return l874 + ' ' + name; }
function j924(name) { return e875 + ' ' + name; }
function i925(str) { return str.toLowerCase() == 'true' || str == '1'; }
function a926(n927, z928 = false) { return n933(n927.outputNodeId, n927.outputId, n927.outputOrder, n927.inputNodeId, n927.inputId, n927.list, z928); }
function f929(outputNodeId, outputId, outputOrder, inputNodeId, inputId) { return z923(outputNodeId + ' ' + outputId + ' ' + outputOrder + ' ' + inputNodeId + ' ' + inputId); }
function x930(p243) { return f929(p243.outputNodeId, p243.outputId, p243.outputOrder, p243.inputNodeId, p243.inputId); }
function i931(p243) { return f929(p243.output.node.id, p243.output.id, p243.outputOrder, p243.input.node.id, p243.input.id); }
function e932(p243, z928 = false) { return n933(p243.output.node.id, p243.output.id, p243.outputOrder, p243.input.node.id, p243.input.id, p243.list, z928); }
function n933(outputNodeId, outputId, outputOrder, inputNodeId, inputId, list, z928 = false) { const sp = z928 ? ' ' : '  '; const jsp = z928 ? '' : ' '; const arrow = sp + e937(typeof outputOrder == 'string' ? parseInt(outputOrder) : outputOrder) + o921(typeof list == 'string' ? i925(list) : list) + sp; const join = jsp + '.' + jsp; return outputNodeId + join + outputId + arrow + inputNodeId + join + inputId; }
function g934(pageId) { return j924(pageId); }
function j935(num) { const str = num.toString(); let sup = ''; for (const c of str)
    sup += x936(c); return sup; }
function x936(c) { switch (c) {
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
function e937(num) { const str = num.toString(); let sup = ''; for (const c of str)
    sup += a938(c); return sup; }
function a938(c) { switch (c) {
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
function u939(bool) { return bool ? 'true' : 'false'; }
function isValid(val) { return val != undefined && val != null; }
function isEmpty(array) { return array.length == 0; }
function x940(array, item) { r941(array, array.indexOf(item)); }
function r941(array, index) { if (index > -1 && index < array.length)
    array.splice(index, 1); }
function y942(array) { if (isEmpty(array))
    return null; let last = array.at(-1); array.splice(array.length - 1, 1); return last; }
function q943(array) { return array[array.length - 1]; }
function o944(array, from, to) { const item = array[from]; array.splice(from, 1); array.splice(to, 0, item); }
function s945(array, item) { const index = array.indexOf(item); if (index > -1)
    array.splice(index, 1); }
function q946(z2796, array) { for (const item of array) {
    const index = z2796.indexOf(item);
    if (index > -1)
        z2796.splice(index, 1);
} }
function z947(array, where) { const index = array.findIndex(where); if (index > -1)
    array.splice(index, 1); }
function k948(styleId) { return styleId.split(',')[0] + ','; }
function c949(points) { let t4035 = ''; if (points.length < 2)
    return t4035; t4035 += 'M'; t4035 += ' ' + a877(points[0].x); t4035 += ' ' + a877(points[0].y); for (let i = 1; i < points.length; i++) {
    t4035 += ' L' + ' ' + a877(points[i].x) + ' ' + a877(points[i].y);
} return t4035; }
function point(x, y) { return { x: x, y: y }; }
function y950(v, m) { let r = [0, 0, 0]; for (let i = 0; i < 3; i++)
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
        let w111 = {};
        for (const key in val)
            w111[key] = clone(val[key]);
        return w111;
    }
} throw 'unknown'; }
function d951(array, item, equal = null) { if (equal) {
    if (Array.isArray(item))
        item.forEach(i => d951(array, i, equal));
    else if (!array.find(i => equal(i, item)))
        array.push(item);
}
else {
    if (Array.isArray(item))
        item.forEach(i => d951(array, i));
    else if (!array.includes(item))
        array.push(item);
} }
function c952(array, item, equal) { if (Array.isArray(item))
    item.forEach(i => c952(array, i, equal));
else if (!array.find(equal))
    array.push(item); }
function y953(array, item, except) { if (Array.isArray(item))
    item.forEach(i => y953(array, i, except));
else if (!array.find(except))
    array.push(item); }
function d954(...args) { if (h2540) {
    console.assert(...args);
} }
function f955(...args) { if (h2540)
    console.error(...args); }
function l956(str, trim) { while (str.length >= trim.length && str.substring(0, trim.length) == trim)
    str = str.substring(trim.length); return str; }
function q957(str, trim) { while (str.length >= trim.length && str.substring(str.length - trim.length) == trim)
    str = str.substring(0, str.length - trim.length); return str; }
function w958(k4095) { const fills = []; for (const fill of k4095) {
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
            const w4211 = fill[1];
            const stops = [];
            for (const stop of fill[2]) {
                stops.push({ color: { r: Math.min(Math.max(0, stop[0]), 1), g: Math.min(Math.max(0, stop[1]), 1), b: Math.min(Math.max(0, stop[2]), 1), a: Math.min(Math.max(0, stop[3]), 1) }, position: stop[4] });
            }
            fills.push({ type: fill[0], gradientTransform: w4211, gradientStops: stops, blendMode: fill[3] });
            break;
        }
    }
} return fills; }
function v959(type) { return l1092.includes(type); }
const h1059 = 'LIST#';
const y1060 = 'NLIST#';
const b1061 = 'TLIST#';
const w1062 = 'SLIST#';
const r1063 = 'NULL';
const y1064 = 'VAR';
const q1065 = 'VARGRP';
const k1066 = 'FEEDBK';
const r1067 = 'REPT';
const j1068 = 'CACHE';
const v1069 = 'FRZ';
const l1070 = 'TIMER';
const y1071 = 'VNAME';
const GET_LIST_VALUE_NAMES = 'GVNAMES';
const LIST_VALUE_NAMES = 'VNAMES';
const OBJECT_NAME = 'ONAME';
const p1072 = 'CMB';
const n1073 = 'LSASIT';
const u1074 = 'EXTR';
const b1075 = 'SETP';
const i1076 = 'GETP';
const u1077 = 'SUBLST';
const o1078 = 'UNIQ';
const REORDER_LIST = 'RORD';
const SHIFT_LIST = 'SHFTLST';
const i1079 = 'REVLST';
const t1080 = 'SORT';
const u1081 = 'CLMN';
const x1082 = 'CELL';
const g1083 = 'LIST';
const l1084 = 'COUNT';
const OBJECT_COUNT = 'OBJCOUNT';
const j1085 = 'LCONT';
const i1086 = 'SELECT';
const SELECT_FROM_LIST = 'LSTSEL';
const r1087 = 'IF';
const d1088 = 'LSTFLT';
const t1090 = 'ANY#';
const d1091 = [h1059, y1060, b1061, w1062, p1072, u1074, b1075, i1076, u1077, g1083, l1084, j1085, r1067];
const l1092 = [h1059, y1060, b1061, w1062];
const p1089 = 'ITER';
const u1111 = 'PROB';
const HOLD = 'HOLD';
const o1094 = 'NUM#';
const s1095 = 'NUM';
const NUMBER_PRECISION = 'NPREC';
const n1096 = 'NSIGN';
const q1097 = 'ABS';
const NUMBER_NEGATIVE = 'NEG';
const c1098 = 'ROUND';
const NUMBER_QUANTIZE = 'QUANT';
const u1099 = 'SMINMAX';
const s1100 = 'MINMAX';
const j1101 = 'LIM';
const s1102 = 'NCURVE';
const NUMBER_MAP = 'NMAP';
const NUMBER_BIAS = 'NBIAS';
const f1103 = 'NANISNUM';
const h1104 = 'CONST';
const w1105 = 'DATE';
const l1106 = 'SEQ';
const d1107 = 'RANGE';
const y1108 = 'WAVE';
const j1109 = 'RAND';
const x1110 = 'NOISE';
const k1112 = 'ACCUM';
const h1113 = 'LERP';
const o1114 = 'SOLVE';
const d1115 = 'NANIM';
const d1116 = 'SMATH';
const p1117 = 'MATH';
const g1118 = 'ADD';
const p1119 = 'SUB';
const h1120 = 'MUL';
const t1121 = 'DIV';
const n1122 = 'MOD';
const t1123 = 'EXP';
const c1124 = 'NBOOL';
const h1125 = 'NOT';
const m1126 = 'AND';
const a1127 = 'OR';
const y1128 = 'XOR';
const b1129 = 'COND';
const o1130 = 'EQ';
const r1131 = 'NE';
const r1132 = 'LT';
const t1133 = 'LE';
const p1134 = 'GT';
const j1135 = 'GE';
const c1136 = 'TRIG';
const s1137 = 'SIN';
const z1138 = 'COS';
const o1139 = 'TAN';
const y1140 = 'ATAN2';
const f1141 = 'CNVANG';
const o1093 = [r1063, y1064, q1065, ...d1091, n1073, u1074, b1075, i1076, u1077, o1078, REORDER_LIST, SHIFT_LIST, i1079, u1081, t1080, x1082, g1083, i1086, SELECT_FROM_LIST, r1087, d1088, k1066, r1067, p1089, u1111, HOLD, j1068, v1069, l1070, y1071, GET_LIST_VALUE_NAMES, LIST_VALUE_NAMES, OBJECT_NAME];
const s1142 = [p1117, d1116, g1118, p1119, h1120, t1121, n1122, t1123];
const u1143 = [c1124, h1125, m1126, a1127, y1128];
const s1144 = [b1129, o1130, r1131, r1132, t1133, p1134, j1135];
const y1145 = [c1136, s1137, z1138, o1139, y1140];
const t1146 = 'TEXT#';
const d1147 = 'TEXT';
const a1148 = 'TLEN';
const k1149 = 'TTRIM';
const p1150 = 'TSUB';
const x1151 = 'TCONT';
const k1152 = 'TCASE';
const n1153 = 'TREPL';
const n1154 = 'TJOIN';
const z1155 = 'TPAD';
const v1156 = 'TCMP';
const y1157 = 'TCHAR';
const d1158 = 'TUNI';
const z1159 = 'INDEX';
const j1160 = 'N2T';
const k1161 = 'C2T';
const e1162 = 'T2N';
const w1163 = 'T2C';
const u1164 = 'TSPLT';
const z3505 = 'TJSON';
const d1166 = 'TCSV';
const q1167 = 'FETCH';
const s1168 = 'TFILE';
const e1169 = [o1094, y1060, s1095, NUMBER_PRECISION, n1096, q1097, NUMBER_NEGATIVE, c1098, NUMBER_QUANTIZE, u1099, s1100, j1101, s1102, NUMBER_MAP, NUMBER_BIAS, f1103, h1104, w1105, l1106, d1107, y1108, j1109, x1110, k1112, h1113, o1114, d1115, j1160, y1157, ...s1142, ...u1143, ...s1144, ...y1145, f1141];
const b1170 = [t1146, b1061, d1147, a1148, k1149, p1150, x1151, k1152, n1154, z1155, n1153, v1156, d1158, z1159, e1162, w1163, u1164, z3505, d1166, q1167, s1168];
const k1171 = 'COL#';
const q1172 = 'COL';
const s1173 = 'CVAL';
const r1174 = 'CCOR';
const b1175 = 'COLP3';
const a1176 = 'CCNT';
const t1177 = 'BLND';
const b1178 = 'CLERP';
const d1179 = 'CBLND';
const o1180 = [k1171, q1172, r1174, b1175, t1177, b1178, d1179, k1161];
const j1181 = 'FILL#';
const a1182 = 'FILL';
const o1183 = [j1181, a1182];
const m1184 = 'STRK#';
const q1185 = 'STRK';
const h1186 = [m1184, q1185];
const d1187 = 'CSTOP#';
const g1188 = 'CSTOP';
const p1189 = [d1187, g1188];
const n1190 = 'GRAD#';
const d1191 = 'GRAD';
const p1192 = [n1190, d1191];
const a1193 = 'RCRN#';
const e1194 = 'RCRN';
const n1195 = [a1193, e1194];
const b1196 = 'DRSH#';
const v1197 = 'DRSH';
const z1198 = [b1196, v1197];
const m1199 = 'INSH#';
const v1200 = 'INSH';
const c1201 = [m1199, v1200];
const l1202 = 'LBLR#';
const v1203 = 'LBLR';
const i1204 = [l1202, v1203];
const e1205 = 'BBLR#';
const h1206 = 'BBLR';
const s1207 = [e1205, h1206];
const w1208 = 'MASK#';
const l1209 = 'MASK';
const z1210 = [w1208, l1209];
const c1211 = 'BLEND#';
const x1212 = 'BLEND';
const z1213 = [c1211, x1212];
const k1214 = [...n1195, ...z1198, ...c1201, ...i1204, ...s1207, ...z1213, ...z1210];
const a1215 = [k1171, j1181, n1190, m1184, b1196, m1199, l1202, e1205, c1211, w1208];
const j1216 = 'CSTL';
const q1217 = 'SHP#';
const k1218 = 'RECT#';
const d1219 = 'RECT';
const y1220 = [k1218, d1219];
const z1221 = 'LINE#';
const j1222 = 'LINE';
const c1223 = [z1221, j1222];
const r1224 = 'ELPS#';
const y1225 = 'ELPS';
const v1226 = [r1224, y1225];
const q1227 = 'TRPZ#';
const n1228 = 'TRPZ';
const d1229 = [q1227, n1228];
const y1236 = 'POLY#';
const f1237 = 'POLY';
const f1238 = [y1236, f1237];
const h1239 = 'STAR#';
const j1240 = 'STAR';
const o1241 = [h1239, j1240];
const h1242 = 'TXTS#';
const u1243 = 'TXTS';
const q1244 = [h1242, u1243];
const k1245 = 'PT#';
const g1246 = 'PT';
const p1247 = [k1245, g1246];
const p1248 = 'PCORN';
const d1249 = 'VPATH#';
const e1250 = 'VPATH';
const k1251 = [d1249, e1250];
const l1252 = 'VPT#';
const v1253 = 'VPT';
const n1254 = [l1252, v1253];
const v1255 = 'VEDGE#';
const t1256 = 'VEDGE';
const i1257 = [v1255, t1256];
const d1258 = 'VREG#';
const k1259 = 'VREG';
const i1260 = [d1258, k1259];
const q1261 = 'VNET#';
const e1262 = 'VNET';
const s1263 = [q1261, e1262];
const k1264 = 'SGRP#';
const u1265 = 'SGRP';
const i1266 = [k1264, u1265];
const i1267 = 'FRM#';
const r1268 = 'FRM';
const y1269 = [i1267, r1268];
const e1231 = 'ARC#';
const a1230 = 'ARC';
const u1232 = [e1231, a1230];
const i1234 = 'WAVEP#';
const o1233 = 'WAVEP';
const m1235 = [i1234, o1233];
const c1270 = 'MOVE';
const d1271 = 'ROT';
const k1272 = 'SCALE';
const c1273 = 'SKEW';
const u1274 = 'SCENTR';
const j1275 = 'RSTX';
const s1276 = 'PLACE';
const o1277 = 'APPLY';
const PATH_LENGTH = 'PTHLEN';
const JOIN_PATHS = 'JOINPTH';
const REORIENT_PATHS = 'REORPTH';
const j1283 = 'PTALPATH';
const z1284 = 'CPTONPATH';
const l1278 = 'MESPT';
const g1279 = 'VECLEN';
const r1280 = 'CIRCEN';
const ARC_FROM_POINTS = 'ARCPT';
const f1281 = 'INTLIN';
const a1282 = 'PTLERP';
const REVERSE_PATH = 'REVPTH';
const BLEND_PATH = 'BLENDPTH';
const PATH_TYPES = [e1250, n1228, a1230, o1233];
const PATH_VALUES = [d1249, q1227, e1231, i1234];
const p1285 = 'SBOOL';
const t1286 = 'SBOOL#';
const y1287 = 'SBOOLU';
const b1288 = 'SBOOLS';
const m1289 = 'SBOOLI';
const t1290 = 'SBOOLE';
const p1291 = [p1285, t1286, y1287, b1288, m1289, t1290];
const c1292 = 'RENDER';
const EXPORT = 'EXPORT';
const u1293 = [q1217, w1062, k1218, z1221, r1224, q1227, y1236, h1239, h1242, k1245, d1249, l1252, v1255, d1258, q1261, e1231, i1234, k1264, i1267, t1286, b1196, m1199, l1202, e1205, c1211, w1208];
const y1294 = [d1271, k1272, c1273];
const s1295 = [...u1293, ...y1220, ...c1223, ...v1226, ...d1229, ...f1238, ...o1241, ...q1244, ...p1247, p1248, ...k1251, ...n1254, ...i1257, ...i1260, ...s1263, ...u1232, ...m1235, ...i1266, ...y1269, ...p1291, c1270, ...y1294, u1274, j1275, s1276, o1277, PATH_LENGTH, JOIN_PATHS, REORIENT_PATHS, j1283, z1284, l1278, g1279, r1280, a1230, o1233, ARC_FROM_POINTS, f1281, a1282, REVERSE_PATH, BLEND_PATH, c1292, EXPORT];
const k1296 = [h1059, y1060, b1061, w1062, o1094, t1146, k1171, j1181, d1187, n1190, m1184, d1187, n1190, q1217, k1218, z1221, r1224, q1227, y1236, h1239, h1242, k1245, d1249, l1252, v1255, d1258, q1261, k1264, i1267, a1193, b1196, m1199, l1202, e1205, c1211, w1208];
const o1297 = 'GROUP';
const k1298 = 'GPARAM';
const v1299 = [o1297, k1298];
const c1300 = 'CMNT';
const y1301 = 'CMNTARR';
const x1302 = 'PANEL';
const r1303 = 'ACT';
const b1304 = 'BFACT';
const a1305 = 'BFLST';
const a1306 = 'DIS';
const i1307 = 'NOC';
const PARAM = 'PARAM';
const b1308 = 'LOG';
const d1309 = 'GRAPH';
const c1310 = [[n1122, '%'], [t1121, '/'], [p1119, '−'], [g1118, '+'], [h1120, '×'], [t1123, 'e<sup>x']];
const e1311 = [[t1121, '/'], [p1119, '−'], [g1118, '+'], [h1120, '×']];
const x1312 = 0;
const w1313 = 1;
const t1314 = 2;
const d1315 = 3;
const q1316 = [[x1312, 'not'], [w1313, 'xor'], [t1314, 'or'], [d1315, 'and']];
const u1317 = 0;
const t1318 = 1;
const v1319 = 2;
const b1320 = 3;
const j1321 = 4;
const h1322 = 5;
const f1323 = [[u1317, '<'], [t1318, '≤'], [v1319, '≠'], [b1320, '='], [j1321, '≥'], [h1322, '>']];
const f1324 = 0;
const n1325 = 1;
const b1326 = 2;
const q1327 = 3;
const d1328 = 4;
const b1329 = 5;
const z1330 = [[f1324, 'sin'], [n1325, 'cos'], [b1326, 'tan'], [q1327, 'asin'], [d1328, 'acos'], [b1329, 'atan']];
const e1331 = 'EMPTY';
const e1332 = 'CONNECT';
const p1333 = 'CREATE';
const e1334 = 'CREATE_INSERT';
const t1335 = 'DELETE';
const i1336 = 'DISCONNECT';
const j1337 = 'LINK_STYLE';
const i1338 = 'LINK_VARIABLE';
const y1339 = 'LINK_VARIABLE_GROUP';
const p1340 = 'MAKE_ACTIVE';
const MAKE_NOT_CONDITION_ACTION = 'MAKE_NOT_CONDITION';
const l1341 = 'MAKE_PASSIVE';
const x1342 = 'PASTE';
const x1343 = 'RECONNECT';
const j1344 = 'REMOVE';
const o1345 = 'RENAME';
const r1346 = 'REORDER_INPUTS';
const f1347 = 'REORDER_CONNECTIONS';
const b1348 = 'SELECT';
const v1349 = 'SELECT_MOVE';
const c1350 = 'MOVE_NODES';
const p1351 = 'SET_PARAM_VALUE';
const SET_MULTIPLE_VALUES_ACTION = 'SET_MULTIPLE_VALUES';
const u1352 = 'SET_PARAM_SETTING';
const p1353 = 'SET_NODE_RECT';
const u1354 = 'TOGGLE_DISABLE';
const s1355 = 'TOGGLE_PARAM_HEADER';
const q1356 = 'SET_CURRENT_GRAPH';
const s1357 = 'CREATE_PAGE';
const m1358 = 'DELETE_PAGE';
const o1359 = 'GROUP_NODES';
const z1360 = 'UNGROUP_NODES';
const j1361 = 'HIGHLIGHT_NODES';
const SCROLL_LIST_NODE_ACTION = 'SCROLL_LIST_NODE';
const SET_LIST_DIVIDER_ACTION = 'SET_LIST_DIVIDER';
const SET_NODE_PARAM_ACTION = 'SET_NODE_PARAM';
const e1362 = 'BNORM';
const a1363 = 'BDARK';
const e1364 = 'BMULT';
const y1365 = 'BPDRK';
const z1366 = 'BBURN';
const h1367 = 'BLITE';
const r1368 = 'BSCRN';
const z1369 = 'BPLGT';
const u1370 = 'BDODG';
const h1371 = 'BOVER';
const m1372 = 'BSOFT';
const u1373 = 'BHARD';
const f1374 = 'BDIFF';
const q1375 = 'BEXCL';
const m1376 = 'BHUE';
const j1377 = 'BSAT';
const v1378 = 'BCOL';
const q1379 = 'BLUM';
const v1380 = [[e1362, 'normal', 'NORMAL'], [a1363, 'darken', 'DARKEN'], [e1364, 'multiply', 'MULTIPLY'], [y1365, 'plus darker', 'LINEAR_BURN'], [z1366, 'color burn', 'COLOR_BURN'], [h1367, 'lighten', 'LIGHTEN'], [r1368, 'screen', 'SCREEN'], [z1369, 'plus lighter', 'LINEAR_DODGE'], [u1370, 'color dodge', 'COLOR_DODGE'], [h1371, 'overlay', 'OVERLAY'], [m1372, 'soft light', 'SOFT_LIGHT'], [u1373, 'hard light', 'HARD_LIGHT'], [f1374, 'difference', 'DIFFERENCE'], [q1375, 'exclusion', 'EXCLUSION'], [m1376, 'hue', 'HUE'], [j1377, 'saturation', 'SATURATION'], [v1378, 'color', 'COLOR'], [q1379, 'luminosity', 'LUMINOSITY']];
const v1381 = [['thin', 100], ['extra light', 200], ['light', 300], ['regular', 400], ['medium', 500], ['semi bold', 600], ['bold', 700], ['extra bold', 800], ['black', 900]];
const o1382 = 0;
const i1383 = 1;
const y1384 = 2;
const j1385 = 2;
const j1386 = 3;
const p1387 = 3;
const v1388 = 4;
const l1389 = 4;
const c1390 = 5;
const p1391 = 6;
const x1392 = 7;
const u1393 = 8;
const z1394 = 9;
const f1395 = 10;
const g1396 = 11;
const x1397 = 12;
const t1398 = 13;
const l1399 = 14;
const p1400 = 15;
const k1401 = 16;
const o1402 = 17;
const c1403 = 18;
const a1404 = 19;
const v1405 = 20;
const d1406 = 21;
const a1407 = 22;
const j1408 = 23;
const e1409 = 24;
const FO_BOOLEAN_CHILDREN = 24;
const g1410 = 24;
const h1411 = 25;
const FO_BOOLEAN_OPERATION = 25;
const x1412 = 26;
const v1413 = 27;
const s1414 = 28;
const d1415 = 28;
const v1416 = 28;
const w1417 = 28;
const b1418 = 28;
const u1419 = 28;
const o1420 = 28;
const j1421 = 28;
const l1422 = 29;
const g1423 = 29;
const x1424 = 29;
const f1425 = 29;
const j1426 = 29;
const s1427 = 29;
const u1428 = 30;
const z1429 = 30;
const j1430 = 30;
const p1431 = 30;
const q1432 = 31;
const j1433 = 31;
const a1434 = 32;
const k1435 = 33;
const h1436 = 34;
const m1437 = 35;
const h1438 = 36;
const d1439 = 37;
const j2797 = '12345679ABCDEFGHJKLMNPQRSTUVWXYZ';
function s845(array, chars = j2797) { let f847 = ''; let len = array.length; let i = 0; while (len > 0) {
    if (len >= 5) {
        const a0 = array[i], a1 = array[i + 1], a2 = array[i + 2], a3 = array[i + 3], a4 = array[i + 4];
        f847 += chars[(a0 & 0xF8) >>> 3];
        f847 += chars[((a0 & 0x07) << 2) | ((a1 & 0xC0) >>> 6)];
        f847 += chars[(a1 & 0x3E) >>> 1];
        f847 += chars[((a1 & 0x01) << 4) | ((a2 & 0xF0) >>> 4)];
        f847 += chars[((a2 & 0x0F) << 1) | ((a3 & 0x80) >>> 7)];
        f847 += chars[(a3 & 0x7C) >>> 2];
        f847 += chars[((a3 & 0x03) << 3) | ((a4 & 0xE0) >>> 5)];
        f847 += chars[(a4 & 0x1F)];
    }
    else if (len == 4) {
        const a0 = array[i], a1 = array[i + 1], a2 = array[i + 2], a3 = array[i + 3];
        f847 += chars[(a0 & 0xF8) >>> 3];
        f847 += chars[((a0 & 0x07) << 2) | ((a1 & 0xC0) >>> 6)];
        f847 += chars[(a1 & 0x3E) >>> 1];
        f847 += chars[((a1 & 0x01) << 4) | ((a2 & 0xF0) >>> 4)];
        f847 += chars[((a2 & 0x0F) << 1) | ((a3 & 0x80) >>> 7)];
        f847 += chars[(a3 & 0x7C) >>> 2];
        f847 += chars[((a3 & 0x03) << 3)];
    }
    else if (len == 3) {
        const a0 = array[i], a1 = array[i + 1], a2 = array[i + 2];
        f847 += chars[(a0 & 0xF8) >>> 3];
        f847 += chars[((a0 & 0x07) << 2) | ((a1 & 0xC0) >>> 6)];
        f847 += chars[(a1 & 0x3E) >>> 1];
        f847 += chars[((a1 & 0x01) << 4) | ((a2 & 0xF0) >>> 4)];
        f847 += chars[((a2 & 0x0F) << 1)];
    }
    else if (len == 2) {
        const a0 = array[i], a1 = array[i + 1];
        f847 += chars[(a0 & 0xF8) >>> 3];
        f847 += chars[((a0 & 0x07) << 2) | ((a1 & 0xC0) >>> 6)];
        f847 += chars[(a1 & 0x3E) >>> 1];
        f847 += chars[((a1 & 0x01) << 4)];
    }
    else if (len == 1) {
        const a0 = array[i];
        f847 += chars[(a0 & 0xF8) >>> 3];
        f847 += chars[((a0 & 0x07) << 2)];
    }
    i += 5;
    len -= 5;
} return f847; }
function y846(f847, chars = j2797) { const array = []; let len = f847.length; let c = 0; while (len > 0) {
    if (len >= 8) {
        const c0 = chars.indexOf(f847[c]), c1 = chars.indexOf(f847[c + 1]), c2 = chars.indexOf(f847[c + 2]), c3 = chars.indexOf(f847[c + 3]), c4 = chars.indexOf(f847[c + 4]), c5 = chars.indexOf(f847[c + 5]), c6 = chars.indexOf(f847[c + 6]), c7 = chars.indexOf(f847[c + 7]);
        array.push((c0 << 3) | ((c1 & 0x1C) >>> 2));
        array.push(((c1 & 0x03) << 6) | (c2 << 1) | ((c3 & 0x10) >>> 4));
        array.push(((c3 & 0x0F) << 4) | ((c4 & 0x1E) >>> 1));
        array.push(((c4 & 0x01) << 7) | (c5 << 2) | ((c6 & 0x18) >>> 3));
        array.push(((c6 & 0x07) << 5) | c7);
    }
    else if (len == 7) {
        const c0 = chars.indexOf(f847[c]), c1 = chars.indexOf(f847[c + 1]), c2 = chars.indexOf(f847[c + 2]), c3 = chars.indexOf(f847[c + 3]), c4 = chars.indexOf(f847[c + 4]), c5 = chars.indexOf(f847[c + 5]), c6 = chars.indexOf(f847[c + 6]);
        array.push((c0 << 3) | ((c1 & 0x1C) >>> 2));
        array.push(((c1 & 0x03) << 6) | (c2 << 1) | ((c3 & 0x10) >>> 4));
        array.push(((c3 & 0x0F) << 4) | ((c4 & 0x1E) >>> 1));
        array.push(((c4 & 0x01) << 7) | (c5 << 2) | ((c6 & 0x18) >>> 3));
    }
    else if (len == 5) {
        const c0 = chars.indexOf(f847[c]), c1 = chars.indexOf(f847[c + 1]), c2 = chars.indexOf(f847[c + 2]), c3 = chars.indexOf(f847[c + 3]), c4 = chars.indexOf(f847[c + 4]);
        array.push((c0 << 3) | ((c1 & 0x1C) >>> 2));
        array.push(((c1 & 0x03) << 6) | (c2 << 1) | ((c3 & 0x10) >>> 4));
        array.push(((c3 & 0x0F) << 4) | ((c4 & 0x1E) >>> 1));
    }
    else if (len == 4) {
        const c0 = chars.indexOf(f847[c]), c1 = chars.indexOf(f847[c + 1]), c2 = chars.indexOf(f847[c + 2]), c3 = chars.indexOf(f847[c + 3]);
        array.push((c0 << 3) | ((c1 & 0x1C) >>> 2));
        array.push(((c1 & 0x03) << 6) | (c2 << 1) | ((c3 & 0x10) >>> 4));
    }
    else if (len == 2) {
        const c0 = chars.indexOf(f847[c]), c1 = chars.indexOf(f847[c + 1]);
        array.push((c0 << 3) | ((c1 & 0x1C) >>> 2));
    }
    c += 8;
    len -= 8;
} return array; }
function n2102(nodeKey, c4007) {
    return __awaiter(this, void 0, void 0, function* () { const log = a2103(yield e1547(nodeKey, false)); if (c4007) {
        console.log('%c%s\n%c%s', 'background: #fa24; color: white;', z1057(nodeKey), 'background: #fa44; color: #edc;', log);
    }
    else {
        console.log('%c%s\n%c%s', 'background: #fdb; color: black;', z1057(nodeKey), 'background: #fed; color: black;', log);
    } });
}
function a2103(json) { let b4036 = json.replace('{\n', '').replace('\n}', '').replace('[\n' + p868, '').replace('\n' + p868 + ']', '').split(p868 + '"params":\n').join('').split('": "').join(': ').split('", "').join(': ').split(p868 + '"').join(p868).split(p868 + p868 + '["').join(p868 + p868).split('",\n').join('\n').split('"\n').join('\n').split('"],\n').join('\n'); if (b4036[b4036.length - 1] == '"')
    b4036 = b4036.substring(0, b4036.length - 1); if (b4036.substring(b4036.length - 2) == '"]')
    b4036 = b4036.substring(0, b4036.length - 2); return b4036; }
function f2104(json) { let b4036 = json.replace('{\n', '').replace('\n}', '').replace('[\n' + p868, '').replace('\n' + p868 + ']', ''); return b4036; }
function g2105(p243, c4007) { const k4214 = a926(p243, true); if (c4007) {
    console.log('%c%s', 'background: #4f44; color: #ded', k4214);
}
else {
    console.log('%c%s', 'background: #cfc; color: black;', k4214);
} }
console.clear();
figma.payments.setPaymentStatusInDevelopment({ type: 'PAID' });
figma.loadAllPagesAsync().then(() => { figma.on('documentchange', v1518); figma.on('selectionchange', b1526); figma.on('close', v1519); });
k1508(true);
figma.clientStorage.getAsync('pro').then(data => { figma.showUI(__html__, { visible: false, themeColors: true, title: 'Generator' }); });
var l2709 = figma.viewport.zoom;
setInterval(z1523, 100);
const n2798 = 'clock_';
const s2799 = 1000;
var m2800 = false;
var objectCenterSize = 15;
function w1520() { (function () {
    return __awaiter(this, void 0, void 0, function* () { figma.currentPage.loadAsync().then(() => __awaiter(this, void 0, void 0, function* () { let x2801 = yield figma.currentPage.getPluginData(figma.currentUser.id + ',windowWidth'); let e2802 = yield figma.currentPage.getPluginData(figma.currentUser.id + ',windowHeight'); let g2803; let t2804; if (x2801 === NULL) {
        g2803 = 800;
        figma.currentPage.setPluginData(figma.currentUser.id + ',windowWidth', x2801.toString());
    }
    else
        g2803 = parseInt(x2801); if (e2802 === NULL) {
        t2804 = 600;
        figma.currentPage.setPluginData(figma.currentUser.id + ',windowHeight', e2802.toString());
    }
    else
        t2804 = parseInt(e2802); figma.ui.resize(Math.max(minWindowWidth, g2803), Math.max(minWindowHeight, t2804)); figma.ui.show(); const fonts = yield figma.listAvailableFontsAsync(); const eula = (yield figma.clientStorage.getAsync('eula')) === 'true'; const tutorials = (yield figma.clientStorage.getAsync('tutorials')) === 'true'; const isLocked = yield w1525(); d1527({ cmd: 'uiReturnFigStartGenerator', currentUser: figma.currentUser, viewportRect: figma.viewport.bounds, viewportZoom: figma.viewport.zoom, fonts: fonts, eula: eula, tutorials: tutorials, isLocked: isLocked, windowWidth: g2803, windowHeight: t2804 }); })); });
})(); }
function y1521() { k1508(); figma.showUI(__html__, { visible: false, themeColors: true }); }
function b1522() { setInterval(w1524, s2799); }
function z1523() { if (figma.viewport.zoom == l2709)
    return; l2709 = figma.viewport.zoom; r2697(); w1541(); u1543(); }
function w1524() { e1548(n2798 + figma.currentUser.sessionId.toString(), Date.now().toString()); }
function w1525() {
    return __awaiter(this, void 0, void 0, function* () { yield figma.currentPage.loadAsync(); const clocks = figma.currentPage.getPluginDataKeys().filter(k => k.length > n2798.length && k.substring(0, n2798.length) == n2798 && k.substring(n2798.length) != figma.currentUser.sessionId.toString()).map((k) => __awaiter(this, void 0, void 0, function* () { return parseInt(yield e1547(k)); })); clocks.sort(); const now = Date.now(); const locked = clocks.length > 0 && now - (yield clocks[clocks.length - 1]) < s2799 * 2; return locked; });
}
function b1526() { r2697(); }
var v2730 = new Array();
var s2732 = new Array();
function figGetObjectsFromIds(objectIds) {
    return __awaiter(this, void 0, void 0, function* () { for (let i = z2766.length - 1; i >= 0; i--)
        if (!z2766[i].removed && objectIds.includes(z2766[i].getPluginData('objectId')))
            z2766.splice(i, 1); for (let i = b2782.length - 1; i >= 0; i--)
        if (b2782[i].removed || objectIds.includes(b2782[i].getPluginData('objectId')))
            b2782.splice(i, 1); yield figma.currentPage.loadAsync(); return figma.currentPage.findAll(o => objectIds.includes(o.getPluginData('objectId'))); });
}
function x1507(nodeIds) {
    return __awaiter(this, void 0, void 0, function* () { for (let i = z2766.length - 1; i >= 0; i--)
        if (!z2766[i].removed && nodeIds.includes(z2766[i].getPluginData('nodeId')))
            z2766.splice(i, 1); for (let i = b2782.length - 1; i >= 0; i--)
        if (b2782[i].removed || nodeIds.includes(b2782[i].getPluginData('nodeId')))
            b2782.splice(i, 1); yield figma.currentPage.loadAsync(); figma.currentPage.findAll(o => nodeIds.includes(o.getPluginData('nodeId'))).forEach(o => { if (!o.removed)
        o.remove(); }); v2730 = v2730.filter(a => !nodeIds.includes(a.nodeId)); });
}
function k1508(s1509 = false) { for (const h1514 of figma.currentPage.children) {
    if (h1514.removed)
        continue;
    if (h1514.getPluginData('objectId') != '' && h1514.getPluginData('userId') == figma.currentUser.id && (parseInt(h1514.getPluginData('retain')) == 0 || s1509))
        h1514.remove();
} }
function b1510(nodeIds, e1511) { for (let i = v2730.length - 1; i >= 0; i--) {
    const o2731 = v2730[i];
    if (!nodeIds.includes(o2731.nodeId))
        continue;
    for (let j = o2731.objects.length - 1; j >= 0; j--) {
        const h1514 = o2731.objects[j];
        if (h1514.removed || !h1512(h1514, e1511)) {
            if (!h1514.removed)
                h1514.remove();
            s945(o2731.objects, h1514);
            if (z2766.includes(h1514))
                s945(z2766, h1514);
            if (b2782.includes(h1514))
                s945(b2782, h1514);
        }
        if (!h1514.removed) {
            if (parseInt(h1514.getPluginData('retain')) == 2)
                l1533(h1514);
        }
    }
    if (isEmpty(o2731.objects))
        s945(v2730, o2731);
} }
function h1512(h1514, e1511) { if (h1514.type == u1265 || h1514.type == r1268) {
    for (const child of h1514.children) {
        const found = h1512(child, e1511);
        if (found)
            return found;
    }
}
else {
    const found = e1511.find(o => h1514.getPluginData('objectId') == o[y1384] && h1514.getPluginData('userId') == figma.currentUser.id || o[c1390] == 2 && o[c1390] == h1514.getPluginData('retain'));
    if (found)
        return found;
} return null; }
function d1515(nodeIds, u1516) { figma.getLocalPaintStylesAsync().then(paintStyles => { paintStyles.filter(s => nodeIds.includes(s.getPluginData('nodeId'))).forEach(s => { const nodeId = s.getPluginData('nodeId'); const existing = i925(s.getPluginData('existing')); if (!existing) {
    s.remove();
}
else if (u1516) {
    z947(s2732, a => a.nodeId == nodeId);
    s.setPluginData('type', NULL);
    s.setPluginData('nodeId', NULL);
    s.setPluginData('existing', NULL);
} }); }); if (u1516)
    s2732 = s2732.filter(a => !nodeIds.includes(a.nodeId)); }
var g1517 = false;
function v1518(e) { for (const change of e.documentChanges) {
    switch (change.type) {
        case 'STYLE_CREATE':
            if (!change.style)
                break;
            if (!g1517) {
                change.style.setPluginData('type', NULL);
                change.style.setPluginData('nodeId', NULL);
                change.style.setPluginData('existing', NULL);
            }
            break;
        case 'STYLE_PROPERTY_CHANGE': {
            if (!change.style)
                break;
            if (!g1517) {
                const msg = { cmd: 'uiStylePropertyChange', styleId: k948(change.id), properties: change.properties, name: '', paints: [] };
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
                d1527(msg);
            }
            break;
        }
        case 'STYLE_DELETE':
            d1527({ cmd: 'uiStyleDelete', styleId: change.id });
            break;
    }
} g1517 = false; }
function v1519() { k1508(); d1527({ cmd: 'updateMetrics' }); }
figma.ui.onmessage = function (msg) { msg = JSON.parse(msg); if (msg.cmd == 'returnUiGetValueForFigma')
    return; switch (msg.cmd) {
    case 'figStartGenerator':
        w1520();
        break;
    case 'figRestartGenerator':
        y1521();
        break;
    case 'figFinishStart':
        b1522();
        break;
    case 'figDockWindowNormal':
        s2739('normal');
        break;
    case 'figDockWindowMaximize':
        s2739('maximize');
        break;
    case 'figDockWindowTop':
        s2739('top');
        break;
    case 'figDockWindowLeft':
        s2739('left');
        break;
    case 'figDockWindowRight':
        s2739('right');
        break;
    case 'figDockWindowBottom':
        s2739('bottom');
        break;
    case 'figGetMousePosition':
        w1593(msg.clientPosition);
        break;
    case 'figResizeWindow':
        e1596(msg.width, msg.height);
        break;
    case 'figSetWindowRect':
        o1594(msg.x, msg.y, msg.width, msg.height);
        break;
    case 'figNotify':
        q1597(msg);
        break;
    case 'figGetLocalData':
        g1545(msg.key);
        break;
    case 'figSetLocalData':
        r1546(msg.key, msg.value);
        break;
    case 'figClearAllLocalData':
        n4031();
        break;
    case 'figGetPageData':
        e1547(msg.key);
        break;
    case 'figSetPageData':
        e1548(msg.key, msg.value);
        break;
    case 'figSavePages':
        a1553(msg.pageIds, msg.pageJson, msg.currentPageId);
        break;
    case 'figLoadNodesAndConns':
        b1550(msg.debugMode);
        break;
    case 'figSaveNodes':
        s1554(msg.nodeIds, msg.nodeJson);
        break;
    case 'figGetAllLocalTemplateNames':
        t2736();
        break;
    case 'figSaveLocalTemplate':
        g1555(msg.g4032, msg.template);
        break;
    case 'figRemoveConnsToNodes':
        c1556(msg.nodeIds);
        break;
    case 'figRemoveSavedNodesAndConns':
        g1557(msg.nodeIds);
        break;
    case 'figRemoveAllSavedNodesAndConns':
        x1558();
        break;
    case 'figLogAllSavedNodesAndConns':
        c1559(msg.c4007);
        break;
    case 'figLogAllSavedNodes':
        z1560(msg.c4007);
        break;
    case 'figLogAllSavedConns':
        s1561(msg.c4007);
        break;
    case 'figLogAllSavedPageKeys':
        r1562(msg.c4007);
        break;
    case 'figLogAllSavedPages':
        r1563(msg.c4007);
        break;
    case 'figLogAllSavedConnKeys':
        r1564(msg.c4007);
        break;
    case 'figLogAllLocalData':
        t1565(msg.c4007);
        break;
    case 'figGetValue':
        h1566(msg.key, msg.spec);
        break;
    case 'figRemoveSavedPage':
        f1568(msg.pageId);
        break;
    case 'figRemoveAllSavedPages':
        y1569();
        break;
    case 'figSaveConnection':
        b1570(msg.key, msg.json);
        break;
    case 'figSaveConnections':
        x1571(msg.keys, msg.json);
        break;
    case 'figUpdateSavedConnections':
        h1572(msg.curKeys, msg.newKeys, msg.json);
        break;
    case 'figDeleteSavedConnection':
        h1573(msg.key);
        break;
    case 'figRemoveAllSavedConnections':
        s1574();
        break;
    case 'figDeleteSavedConnectionsToNode':
        a1575(msg.nodeId);
        break;
    case 'figDeleteSavedConnectionsFromNode':
        q1576(msg.nodeId);
        break;
    case 'figRemovePluginDataFromAllLocalStyles':
        h1577();
        break;
    case 'figGetAllLocalVariables':
        v1601(msg.nodeId, msg.px, msg.py);
        break;
    case 'figLinkNodeToVariable':
        f1603(msg.nodeId, msg.variableId);
        break;
    case 'figUpdateVariable':
        figUpdateVariableAsync(msg.variableId, msg.value);
        break;
    case 'figGetAllLocalColorStyles':
        g1578(msg.nodeId, msg.px, msg.py);
        break;
    case 'figLinkNodeToExistingColorStyle':
        p1579(msg.nodeId, msg.styleId);
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
        m2800 = msg.m2800;
        break;
    case 'figUpdateObjectCenterSize':
        objectCenterSize = msg.objectCenterSize;
        break;
    case 'figDeleteAllObjects':
        k1508();
        break;
    case 'figUpdateObjectsAndStyles':
        l2745 = 0;
        k2746 = 0;
        msg.objects.forEach(o => o.counted = false);
        t2733(null, msg.objects, msg.t4021, msg.c2050, msg.nodeIds, msg.l2762, msg.g2763, msg.d270);
        r1584(msg);
        break;
    case 'figDeleteObjectsAndStyles':
        x1507(msg.nodeIds);
        d1515(msg.nodeIds, msg.u1516);
        break;
    case 'figDeleteObjectsExcept':
        b1510(msg.nodeIds, msg.ignoreObjects);
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
} d1527({ cmd: 'uiEndFigMessage', msgCmd: msg.cmd }); };
function d1527(msg) { figma.ui.postMessage(JSON.stringify(msg)); }
function v2734(key) {
    return __awaiter(this, void 0, void 0, function* () { return yield figma.clientStorage.getAsync(key); });
}
function g1545(key) { figma.currentPage.loadAsync().then(() => { if (key == 'canvasEmpty') {
    d1527({ cmd: 'uiReturnFigGetLocalData', key: key, value: figma.currentPage.children.length == 0 });
}
else if (key == 'debugWarningCrash') {
    figma.clientStorage.getAsync('debugWarning').then(data => { d1527({ cmd: 'uiReturnFigGetLocalData', key: key, value: data }); });
}
else {
    figma.clientStorage.getAsync(key).then(data => { d1527({ cmd: 'uiReturnFigGetLocalData', key: key, value: data }); });
} }); }
function r1546(key, value, postToUi = true) { figma.clientStorage.setAsync(key, value); if (postToUi) {
    d1527({ cmd: 'uiReturnFigSetLocalData', key: key, value: value });
} }
function n4031() {
    return __awaiter(this, void 0, void 0, function* () { const keys = yield figma.clientStorage.keysAsync(); for (const key of keys)
        figma.clientStorage.deleteAsync(key); });
}
function e1547(key, postToUi = true) {
    return __awaiter(this, void 0, void 0, function* () { yield figma.currentPage.loadAsync(); const data = figma.currentPage.getPluginData(key); if (postToUi) {
        d1527({ cmd: 'uiReturnFigGetPageData', key: key, value: data });
    } return data; });
}
function e1548(key, value) { o1549(key); figma.currentPage.setPluginData(key, value); }
function o1549(key) { figma.currentPage.setPluginData(key, ''); }
function b1550(debugMode) { figma.currentPage.loadAsync().then(() => { const pageKeys = figma.currentPage.getPluginDataKeys().filter(k => s1053(k)); const nodeKeys = figma.currentPage.getPluginDataKeys().filter(k => k1054(k)); const connKeys = figma.currentPage.getPluginDataKeys().filter(k => f1055(k)); if (!debugMode)
    a1552(nodeKeys, connKeys); const pages = pageKeys.map(k => figma.currentPage.getPluginData(k)); const nodes = nodeKeys.map(k => figma.currentPage.getPluginData(k)); const r2122 = connKeys.map(k => figma.currentPage.getPluginData(k)); const pageOrder = figma.currentPage.getPluginData('pageOrder').split(','); const currentPageId = figma.currentPage.getPluginData('currentPageId'); x1551(nodes); const showAllColorSpaces = figma.currentPage.getPluginData('showAllColorSpaces'); d1527({ cmd: 'uiReturnFigLoadNodesAndConns', showAllColorSpaces: showAllColorSpaces, pageKeys: pageKeys, pageJson: pages, pageOrder: pageOrder, currentPageId: currentPageId, nodeKeys: nodeKeys, nodeJson: nodes, connKeys: connKeys, connJson: r2122 }); }); }
function x1551(nodes) { s2732 = []; figma.getLocalPaintStylesAsync().then(paintStyles => { for (const w3019 of nodes) {
    const node = JSON.parse(w3019);
    if (node.type == j1216) {
        const style = paintStyles.find(s => { const nodeId = s.getPluginData('nodeId'); return nodeId == node.id; });
        if (style) {
            s2732.push({ nodeId: node.id, existing: i925(node.existing), styles: [style] });
        }
    }
} }); }
function a1552(nodeKeys, connKeys) { figma.currentPage.loadAsync().then(() => { const b2735 = '"loading": "true"'; const not = '{\n'; const set = '{\n' + p868 + b2735 + ',\n'; nodeKeys.forEach(k => figma.currentPage.setPluginData(k, figma.currentPage.getPluginData(k).replace(set, not).replace(not, set))); connKeys.forEach(k => figma.currentPage.setPluginData(k, figma.currentPage.getPluginData(k).replace(set, not).replace(not, set))); }); }
function a1553(pageIds, pageJson, currentPageId) { for (let i = 0; i < pageIds.length; i++) {
    e1548(j924(pageIds[i]), pageJson[i]);
} e1548('pageOrder', pageIds.join(',')); e1548('currentPageId', currentPageId); }
function s1554(nodeIds, nodeJson) { for (let i = 0; i < nodeIds.length; i++) {
    e1548(h922(nodeIds[i]), nodeJson[i]);
} }
function t2736() {
    return __awaiter(this, void 0, void 0, function* () { let keys = yield figma.clientStorage.keysAsync(); keys = keys.filter(k => k.length >= l876.length && k.substring(0, l876.length) == l876); d1527({ cmd: 'uiReturnGetAllLocalTemplateNames', templateNames: keys }); });
}
function g1555(g4032, template) { r1546(l876 + ' ' + g4032, template); }
function c1556(nodeIds) { figma.currentPage.loadAsync().then(() => { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => f1055(k)); for (const key of connKeys) {
    const parts = q1058(key).split(' ');
    if (nodeIds.includes(parts[0]) || nodeIds.includes(parts[2]))
        o1549(key);
} }); }
function g1557(nodeIds) { figma.currentPage.loadAsync().then(() => { c1556(nodeIds); const nodeKeys = figma.currentPage.getPluginDataKeys().filter(k => k1054(k) && nodeIds.includes(z1057(k))); nodeKeys.forEach(k => o1549(k)); }); }
function x1558() { figma.currentPage.loadAsync().then(() => { const nodeKeys = figma.currentPage.getPluginDataKeys().filter(k => k1054(k)); const connKeys = figma.currentPage.getPluginDataKeys().filter(k => f1055(k)); for (const key of nodeKeys)
    o1549(key); for (const key of connKeys)
    o1549(key); }); }
function c1559(c4007) {
    return __awaiter(this, void 0, void 0, function* () { yield z1560(c4007); s1561(c4007); });
}
function z1560(c4007) {
    return __awaiter(this, void 0, void 0, function* () { yield figma.currentPage.loadAsync(); figma.currentPage.getPluginDataKeys().filter(k => k1054(k)).forEach((k) => __awaiter(this, void 0, void 0, function* () { return yield n2102(k, c4007); })); });
}
function s1561(c4007) { figma.currentPage.loadAsync().then(() => { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => f1055(k)); connKeys.sort((key1, key2) => { const p1 = q1058(key1).split(' '); const p2 = q1058(key2).split(' '); if (p1[2] != p2[2])
    return p1[2] < p2[2] ? -1 : 1; if (p1[3] != p2[3])
    return parseInt(p1[3]) - parseInt(p2[3]); if (p1[2] == p2[0])
    return -1; if (p2[2] == p1[0])
    return 1; return 0; }); connKeys.forEach(k => g2105(JSON.parse(figma.currentPage.getPluginData(k)), c4007)); }); }
function r1562(c4007) { figma.currentPage.loadAsync().then(() => { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => s1053(k)); connKeys.forEach(k => console.log('%c' + k, 'background: #fff; color: ' + (c4007 ? 'black' : 'white'))); const pageOrder = figma.currentPage.getPluginData('pageOrder'); console.log('%c' + pageOrder, 'background: #fff; color: ' + (c4007 ? 'black' : 'white')); }); }
function r1563(c4007) { figma.currentPage.loadAsync().then(() => { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => s1053(k)); connKeys.forEach(k => console.log('%c' + figma.currentPage.getPluginData(k), 'background: #fff; color: ' + (c4007 ? 'black' : 'white'))); const pageOrder = figma.currentPage.getPluginData('pageOrder'); console.log('%c' + pageOrder, 'background: #fff; color: ' + (c4007 ? 'black' : 'white')); }); }
function r1564(c4007) { figma.currentPage.loadAsync().then(() => { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => f1055(k)); connKeys.forEach(k => console.log('%c' + k, 'background: #dff; color: ' + (c4007 ? 'black' : 'white'))); }); }
function t1565(c4007) { figma.clientStorage.keysAsync().then(keys => keys.forEach(k => figma.clientStorage.getAsync(k).then(val => console.log(k + ': ' + val)))); }
function h1566(key, spec) {
    return __awaiter(this, void 0, void 0, function* () { let result = null; switch (key) {
        case 'getVariableData':
            result = yield y1602(spec);
            break;
        case 'getPaidStatus':
            result = figma.payments.status.type;
            break;
        case 'figSubscribe': {
            yield figma.payments.initiateCheckoutAsync({ interstitial: 'PAID_FEATURE' });
            result = figma.payments.status.type;
            break;
        }
    } d1527({ cmd: 'returnFigGetValue', value: result }); });
}
function w1567(varIds) { y1602(varIds).then(values => { d1527({ cmd: 'uiReturnFigGetVariableUpdates', values: values }); }); }
function f1568(pageId) {
    return __awaiter(this, void 0, void 0, function* () { o1549(g934(pageId)); const pageOrder = (yield e1547('pageOrder')).split(','); z947(pageOrder, id => id == pageId); e1548('pageOrder', pageOrder.join(',')); });
}
function y1569() { figma.currentPage.loadAsync().then(() => { const pageKeys = figma.currentPage.getPluginDataKeys().filter(k => s1053(k)); pageKeys.forEach(k => o1549(k)); o1549('pageOrder'); }); }
function b1570(key, json) { e1548(key, json); }
function x1571(_keys, _json) { const keys = JSON.parse(_keys); const json = JSON.parse(_json); for (let i = 0; i < keys.length; i++)
    e1548(keys[i], json[i]); }
function h1572(_curKeys, _newKeys, _json) { const curKeys = JSON.parse(_curKeys); const newKeys = JSON.parse(_newKeys); const json = JSON.parse(_json); for (let i = 0; i < curKeys.length; i++) {
    o1549(curKeys[i]);
    e1548(newKeys[i], json[i]);
} }
function h1573(key) { o1549(key); }
function s1574() { figma.currentPage.loadAsync().then(() => { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => f1055(k)); connKeys.forEach(k => o1549(k)); }); }
function a1575(nodeId) { figma.currentPage.loadAsync().then(() => { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => f1055(k)); for (const key of connKeys) {
    const parts = key.split(' ');
    if (parts[4] == nodeId)
        o1549(key);
} }); }
function q1576(nodeId) { figma.currentPage.loadAsync().then(() => { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => f1055(k)); for (const key of connKeys) {
    const parts = key.split(' ');
    if (parts[1] == nodeId)
        o1549(key);
} }); }
function h1577() { figma.getLocalPaintStylesAsync().then(x1581 => { for (const style of x1581) {
    style.setPluginData('type', '');
    style.setPluginData('nodeId', '');
    style.setPluginData('existing', '');
} }); }
function figSaveSnapshot(index, objectIds) {
    return __awaiter(this, void 0, void 0, function* () { const objects = yield figGetObjectsFromIds(objectIds); const group = figma.group(objects, figma.currentPage); const settings = { format: 'PNG' }; const icon = yield group.exportAsync(settings); figma.ungroup(group); d1527({ cmd: 'uiReturnFigSaveSnapshot', index: index, iconWidth: group.width, iconHeight: group.height, icon: icon }); });
}
var u2737 = null;
var z4033 = () => u2737 = null;
var i2738 = 'normal';
function w1593(clientPosition) { d1527({ cmd: 'uiReturnFigGetMousePosition', position: { x: 0, y: 0 }, clientPosition: clientPosition, viewportZoom: figma.viewport.zoom, viewportRect: figma.viewport.bounds }); }
function o1594(x, y, width, height) { return; }
function l1595(dock, rect, bounds) { switch (dock) {
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
function e1596(width, height) { (function () {
    return __awaiter(this, void 0, void 0, function* () { width = Math.floor(Math.max(0, width)); height = Math.floor(Math.max(0, height)); figma.ui.resize(width, height); yield figma.currentPage.loadAsync(); figma.currentPage.setPluginData(figma.currentUser.id + ',windowWidth', width.toString()); figma.currentPage.setPluginData(figma.currentUser.id + ',windowHeight', height.toString()); d1527({ cmd: 'uiReturnFigResizeWindow', width: width, height: height }); });
})(); }
function s2739(dock) {
    return __awaiter(this, void 0, void 0, function* () { if (dock != 'normal' && i2738 == 'normal') {
        figma.clientStorage.setAsync('normalWindowX', yield figma.clientStorage.getAsync('normalWindowX'));
        figma.clientStorage.setAsync('normalWindowY', yield figma.clientStorage.getAsync('normalWindowY'));
        figma.clientStorage.setAsync('normalWindowWidth', yield figma.clientStorage.getAsync('normalWindowWidth'));
        figma.clientStorage.setAsync('normalWindowHeight', yield figma.clientStorage.getAsync('normalWindowHeight'));
    } i2738 = dock; figma.clientStorage.setAsync('windowDock', dock); e1596(yield figma.clientStorage.getAsync('windowWidth'), yield figma.clientStorage.getAsync('windowHeight')); });
}
function q1597(msg) { c1598(msg.text, msg.prefix, msg.delay, msg.error, msg.a1599, msg.z1600); }
function c1598(text, prefix = 'Generator ', delay = 400, error = false, a1599 = '', z1600 = NULL) { const options = { timeout: delay, error: error, onDequeue: z4033 }; if (a1599 != '') {
    options['button'] = { text: a1599 };
    if (z1600.substring(0, 'removeConnection'.length) == 'removeConnection') {
        options['button']['action'] = () => h1573(z1600.split(',')[1]);
    }
    else {
        switch (z1600) {
            case 'hideClearUndoWarning':
                options['button']['action'] = () => d1527({ cmd: 'uiHideClearUndoWarning' });
                break;
        }
    }
} if (u2737)
    u2737.cancel(); u2737 = figma.notify(prefix + text, options); }
function r2740(key, params = null) {
    return __awaiter(this, void 0, void 0, function* () { return yield l2741(key, params); });
}
function l2741(key, params = null) {
    return __awaiter(this, void 0, void 0, function* () { return new Promise((resolve, reject) => { const timeout = 60000; d1527(Object.assign({ cmd: 'uiGetValueForFigma', key: key }, (params || {}))); const p2742 = setTimeout(() => reject(new Error('Timeout: Result not received by Figma within the specified time')), timeout); function c4034(msg) { msg = JSON.parse(msg); if (msg.cmd === 'returnUiGetValueForFigma') {
        clearTimeout(p2742);
        resolve({ key: msg.key, value: msg.value });
        figma.ui.off('message', c4034);
    } } figma.ui.on('message', c4034); }); });
}
var d2743 = [];
var u2744 = [];
var l2745 = 0;
var k2746 = 0;
function g1528(w111) { return (w111[c1390] === 2 ? '' : q872) + (m2800 ? w111[y1384] : w111[j1386]); }
function t1529(c1513, addObject = null, addProps = true, transform = true) {
    return __awaiter(this, void 0, void 0, function* () { if (!i1531(c1513))
        return null; let h1514; switch (c1513[o1382]) {
        case d1219:
            h1514 = e2714(c1513, addProps, transform);
            break;
        case j1222:
            h1514 = l2793(c1513, addProps, transform);
            break;
        case y1225:
            h1514 = a2789(c1513, addProps, transform);
            break;
        case f1237:
            h1514 = q2710(c1513, addProps, transform);
            break;
        case j1240:
            h1514 = h2717(c1513, addProps, transform);
            break;
        case u1243:
            h1514 = h2720(c1513, addProps, transform);
            break;
        case g1246:
            h1514 = n2696(c1513);
            break;
        case e1250:
            h1514 = j2748(c1513, addProps, transform);
            break;
        case e1262:
            h1514 = g2749(c1513, addProps, transform);
            break;
        case p1285:
            h1514 = yield k2750(c1513, addProps, transform);
            break;
        case u1265:
            h1514 = yield f2751(c1513);
            break;
        case r1268:
            h1514 = yield s2752(c1513, addProps, transform);
            break;
    } if (addObject && h1514 != undefined && h1514 != null && !h1514.removed) {
        h1514.name = g1528(c1513);
        d954(c1513[o1382] == u1265 || !!h1514, 'no Figma object created');
        if (h1514 != undefined && h1514 != null) {
            h1514.setPluginData('retain', c1513[c1390].toString());
            if (c1513[c1390] < 2) {
                h1514.setPluginData('userId', figma.currentUser.id);
                h1514.setPluginData('sessionId', figma.currentUser.sessionId.toString());
                h1514.setPluginData('type', c1513[o1382]);
                h1514.setPluginData('nodeId', c1513[i1383]);
                h1514.setPluginData('objectId', c1513[y1384]);
                h1514.setPluginData('isCenter', u939(c1513[v1405]));
                if (c1513[o1382] == g1246)
                    z2766.push(h1514);
                if (c1513[a1404])
                    t1544(h1514);
            }
            addObject(h1514);
        }
    } if (!c1513.counted) {
        k2746++;
        c1513.counted = true;
    } return h1514; });
}
function a1530(h1514, c1513, addProps, transform) {
    return __awaiter(this, void 0, void 0, function* () { if (!i1531(c1513) || h1514 == undefined || h1514 == null || h1514.removed)
        return; h1514.name = g1528(c1513); h1514.setPluginData('retain', c1513[c1390].toString()); switch (c1513[o1382]) {
        case d1219:
            h2715(h1514, c1513, addProps, transform);
            break;
        case j1222:
            r2794(h1514, c1513, addProps, transform);
            break;
        case y1225:
            v2790(h1514, c1513, addProps, transform);
            break;
        case f1237:
            s2711(h1514, c1513, addProps, transform);
            break;
        case j1240:
            y2718(h1514, c1513, addProps, transform);
            break;
        case u1243:
            y2721(h1514, c1513, addProps, transform);
            break;
        case g1246:
            o2753(h1514, c1513);
            break;
        case e1250:
            v2754(h1514, c1513, addProps, transform);
            break;
        case e1262:
            v2755(h1514, c1513, addProps, transform);
            break;
        case p1285:
            f2756(h1514, c1513, addProps, transform);
            break;
        case u1265:
            b2757(h1514, c1513);
            break;
        case r1268:
            a2758(h1514, c1513, addProps, transform);
            break;
    } if (h1514 != undefined && h1514 != null && !h1514.removed) {
        if (h1514.parent == figma.currentPage)
            yield figma.currentPage.loadAsync();
        h1514.parent.appendChild(h1514);
        if (c1513[a1404])
            t1544(h1514);
    } if (!c1513.counted) {
        k2746++;
        c1513.counted = true;
    } });
}
function t2733(x2759, a2760, s2761, c2050 = -1, nodeIds = [], l2762 = false, g2763 = false, d270 = false, addProps = true, transform = true) {
    return __awaiter(this, void 0, void 0, function* () { let q2764 = NULL; let b2765 = null; let abort = false; const o3643 = []; let q2747 = 0; d2743.push(...nodeIds); if (c2050 > -1)
        l2745 = c2050; for (const c1513 of a2760) {
        u2744.push(c1513);
        if (c1513[i1383] != q2764) {
            q2764 = c1513[i1383];
            b2765 = v2730.find(a => a.nodeId == c1513[i1383]);
            if (!b2765) {
                v2730.push(b2765 = { nodeId: c1513[i1383], objects: [] });
            }
        }
        const addObject = h1514 => { if (x2759 != undefined && x2759 != null && !x2759.removed)
            x2759.appendChild(h1514);
        else
            b2765.objects.push(h1514); };
        let objects = x2759 != undefined && x2759 != null && !x2759.removed ? x2759.children : b2765.objects;
        let h1514 = objects.find(o => o.removed || o.getPluginData('userId') == figma.currentUser.id && o.getPluginData('objectId') == c1513[y1384]);
        if (h1514 != undefined && h1514 != null && h1514.removed) {
            x940(objects, h1514);
            if (z2766.includes(h1514))
                s945(z2766, h1514);
            if (b2782.includes(h1514))
                s945(b2782, h1514);
        }
        if (h1514 == undefined || h1514 == null || h1514.removed) {
            const newObj = yield t1529(c1513, addObject, addProps, transform);
            o3643.push(newObj);
        }
        else if (h1514 != undefined && h1514 != null && !h1514.removed && h1514.getPluginData('type') == c1513[o1382].toString()) {
            yield a1530(h1514, c1513, addProps, transform);
            if (h1514 != undefined && h1514 != null && !h1514.removed)
                o3643.push(h1514);
        }
        else {
            h1514.remove();
            if (z2766.includes(h1514))
                s945(z2766, h1514);
            if (b2782.includes(h1514))
                s945(b2782, h1514);
            yield t1529(c1513, addObject, addProps, transform);
        }
        q2747++;
        if (q2747 >= s2761) {
            const result = yield r2740('returnObjectUpdate', { l2745: l2745, k2746: k2746 });
            abort = result.value;
            q2747 = 0;
            if (abort)
                break;
        }
    } if (x2759 != undefined && x2759 != null && !x2759.removed) {
        for (const h1514 of x2759.children) {
            if (h1514 != undefined && h1514 != null && h1514.removed || !a2760.find(o => o[y1384] == h1514.getPluginData('objectId') && h1514.getPluginData('userId') == figma.currentUser.id))
                h1514.remove();
        }
    } for (const point of z2766) {
        if (point.parent == figma.currentPage)
            yield figma.currentPage.loadAsync();
        if (point != undefined && point != null && !point.removed && !point.parent.removed)
            point.parent.appendChild(point);
    } if (g2763 && !abort) {
        b1510(d2743, u2744);
        d2743 = [];
        u2744 = [];
        if (d270 && o3643.length > 0) {
            figma.viewport.scrollAndZoomIntoView(o3643);
            const bounds = w1534(o3643);
            figma.viewport.zoom = Math.min(figma.viewport.bounds.width * figma.viewport.zoom / bounds.width - 0.05, figma.viewport.bounds.height * figma.viewport.zoom / bounds.height - 0.05);
        }
    } yield r2740('returnObjectUpdate', { l2745: l2745, k2746: k2746 }); });
}
function i1531(c1513) { switch (c1513[o1382]) {
    case d1219: return h2713(c1513);
    case j1222: return w2775(c1513);
    case y1225: return i2776(c1513);
    case f1237: return e4030(c1513);
    case j1240: return a2716(c1513);
    case u1243: return u2719(c1513);
    case g1246: return a4029(c1513);
    case e1250: return n2777(c1513);
    case e1262: return t2778(c1513);
    case p1285: return l2779(c1513);
    case u1265: return k2780(c1513);
    case r1268: return t2781(c1513);
} }
function x1532(c1513) {
    return __awaiter(this, void 0, void 0, function* () { (() => __awaiter(this, void 0, void 0, function* () { const h1514 = yield t1529(c1513); const width = h1514.width; const height = h1514.height; h1514.remove(); d1527({ cmd: 'uiForwardToGenerator', msg: { cmd: 'returnFigGetObjectSize', objectId: c1513[y1384], width: width, height: height } }); }))(); });
}
function l1533(h1514) { h1514.setPluginData('type', ''); h1514.setPluginData('nodeId', ''); h1514.setPluginData('userId', ''); h1514.setPluginData('sessionId', ''); h1514.setPluginData('objectId', ''); h1514.setPluginData('isCenter', ''); h1514.setPluginData('retain', ''); }
function w1534(objects) { const bounds = { left: 0, top: 0, right: 0, bottom: 0 }; for (const w111 of objects) {
    if (w111.x < bounds.left || bounds.left == bounds.right)
        bounds.left = w111.x;
    if (w111.y < bounds.top || bounds.top == bounds.bottom)
        bounds.top = w111.y;
    if (w111.x + w111.width > bounds.right || bounds.left == bounds.right)
        bounds.right = w111.x + w111.width;
    if (w111.y + w111.height > bounds.bottom || bounds.top == bounds.bottom)
        bounds.bottom = w111.y + w111.height;
} return { x: bounds.left, y: bounds.top, width: bounds.right - bounds.left, height: bounds.bottom - bounds.top }; }
function figExport(objectIds, scale, format, suffix) {
    return __awaiter(this, void 0, void 0, function* () { yield figma.currentPage.loadAsync(); for (const objId of objectIds) {
        let h1514 = figma.currentPage.children.find(o => !o.removed && o.getPluginData('userId') == figma.currentUser.id && o.getPluginData('objectId') == objId);
        if (!h1514)
            continue;
        const settings = { constraint: { type: 'SCALE', value: scale }, format: format == 0 ? 'PNG' : 'JPG', suffix: suffix };
        yield h1514.exportAsync(settings);
    } });
}
const b2782 = [];
const t2783 = [];
function j1535(b1536, w1537) { const effects = []; for (const effect of b1536) {
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
                if (w1537 && !isNaN(spread))
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
function x2703(h1514, c1513, phantom = true) { d1540(h1514, c1513); r2704(h1514, c1513, phantom); k2705(h1514, c1513); h1514.opacity = c1513[d1406]; h1514.blendMode = c1513[a1407]; const maskType = c1513[j1408]; h1514.isMask = maskType > 0; if (h1514.isMask) {
    switch (maskType) {
        case 1:
            h1514.maskType = 'ALPHA';
            break;
        case 2:
            h1514.maskType = 'VECTOR';
            break;
        case 3:
            h1514.maskType = 'LUMINANCE';
            break;
    }
} if (h1514.isMask && h1514.fills.length == 0 && h1514.strokes.length == 0)
    h1514.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 }, opacity: 1, blendMode: 'NORMAL' }]; }
function k2705(h1514, c1513) { if (!!c1513[f1395] && !isEmpty(c1513[f1395])) {
    h1514.fills = w958(c1513[f1395]);
    if (b2782.includes(h1514))
        s945(b2782, h1514);
}
else
    h1514.fills = []; }
function r2704(h1514, c1513, phantom = true) { if (c1513[g1396] != null && !isEmpty(c1513[g1396])) {
    o1539(h1514, w958(c1513[g1396]), c1513[x1397], c1513[t1398], c1513[l1399], c1513[p1400], c1513[k1401], d2706(c1513[o1402]));
    if (c1513[a1404])
        h1514.setPluginData('dashes', c1513[o1402]);
    if (b2782.includes(h1514))
        s945(b2782, h1514);
    if (c1513[a1404])
        d951(t2783, h1514);
}
else if (isEmpty(c1513[f1395]) && isEmpty(c1513[g1396]) && !c1513[j1408] && phantom) {
    h1542(h1514);
    d951(b2782, h1514);
}
else
    h1514.strokes = []; }
function d2706(z1538) { z1538 = z1538; z1538 = l956(z1538, ','); z1538 = q957(z1538, ','); z1538 = z1538.trim(); return z1538 == '' ? [] : z1538.split(',').map(s => Math.max(0, parseFloat(s))); }
function l2707(z1538) { z1538 = z1538; z1538 = l956(z1538, ','); z1538 = q957(z1538, ','); z1538 = z1538.trim(); return z1538 == '' ? [] : z1538.split(',').map(s => Math.max(0, parseFloat(s) / l2709)); }
function o1539(h1514, fills, weight, align, join, miterLimit, cap, dashes = []) { h1514.strokes = fills; h1514.strokeWeight = Math.max(0, weight); h1514.strokeAlign = align; h1514.strokeJoin = join; const miterAngle = miterLimit / 360 * Tau; const z2784 = 1 / Math.sin(miterAngle / 2); h1514.strokeMiterLimit = Math.min(Math.max(0, z2784), 16); h1514.strokeCap = cap; h1514.dashPattern = dashes; }
function d1540(h1514, c1513) { if (!!c1513[c1403] && !isEmpty(c1513[c1403])) {
    const w1537 = c1513[o1382] == d1219 || c1513[o1382] == y1225 || c1513[o1382] == r1268;
    h1514.effects = j1535(c1513[c1403], w1537);
}
else
    h1514.effects = []; }
function w1541() { for (const w111 of b2782) {
    if (w111.removed)
        s945(b2782, w111);
    else
        h1542(w111);
} }
function h1542(w111) { figma.currentPage.loadAsync().then(() => { const back = figma.currentPage.backgrounds.find(b => b.type == 'SOLID'); let phantomColor; if (back) {
    const l = back.color.r * 0.2126 + back.color.g * 0.7152 + back.color.b * 0.0722;
    phantomColor = l > 0.5 ? { r: 0, g: 0, b: 0 } : { r: 1, g: 1, b: 1 };
}
else
    phantomColor = { r: 1, g: 0, b: 1 }; o1539(w111, [{ type: 'SOLID', color: phantomColor, opacity: 0.5 }], 1 / l2709, 'CENTER', 'MITER', 1, 'NONE', [1 / l2709, 2 / l2709]); }); }
function u1543() { for (const h1514 of t2783) {
    if (h1514.removed)
        s945(t2783, h1514);
    else
        t1544(h1514);
} }
function t1544(h1514) { h1514.strokeWeight = Math.max(0, 1.5 / l2709); if (i925(h1514.getPluginData('isCenter'))) {
    const path = h1514.vectorPaths[0];
    const parts = path.data.split(' ');
    let t = { x: parseFloat(parts[1]), y: parseFloat(parts[2]) };
    let c = { x: parseFloat(parts[4]), y: parseFloat(parts[5]) };
    let r = { x: parseFloat(parts[7]), y: parseFloat(parts[8]) };
    const a = 2;
    const b = 0.05;
    const f = 1 - Math.pow(1 - Math.min(l2709, 1), a) / Math.pow(a, b);
    t = c897(c, p899(k884(q902(t, c)), objectCenterSize / f));
    r = c897(c, p899(k884(q902(r, c)), objectCenterSize / f));
    parts[1] = t.x;
    parts[2] = t.y;
    parts[4] = c.x;
    parts[5] = c.y;
    parts[7] = r.x;
    parts[8] = r.y;
    const p2785 = { windingRule: path.windingRule, data: parts.join(' ') };
    h1514.vectorPaths = [p2785];
} const dashes = h1514.getPluginData('dashes'); if (dashes != '')
    h1514.dashPattern = l2707(dashes); }
function g1578(nodeId, px, py) { figma.getLocalPaintStylesAsync().then(_styles => { const styles = new Array(); for (const v168 of _styles) {
    const _nodeId = v168.getPluginData('nodeId');
    const _existing = v168.getPluginData('existing');
    const existing = !!_existing;
    const style = { id: v168.id, nodeId: _nodeId, name: v168.name, existing: existing, paints: new Array() };
    let onlyPaint = true;
    for (const e2787 of v168.paints) {
        if (e2787.type == 'SOLID') {
            style.paints.push([e2787.color.r, e2787.color.g, e2787.color.b, e2787.opacity]);
        }
        else {
            onlyPaint = false;
            break;
        }
    }
    if (onlyPaint)
        styles.push(style);
} d1527({ cmd: 'uiReturnFigGetAllLocalColorStyles', nodeId: nodeId, px: px, py: py, styles: JSON.stringify(styles) }); }); }
function p1579(nodeId, styleId) { figma.getLocalPaintStylesAsync().then(x1581 => { if (styleId != NULL)
    e1580(x1581, nodeId, styleId);
else
    z1582(x1581, nodeId); }); }
function e1580(x1581, nodeId, styleId, clearExisting = true) { const w2786 = s2732.find(a => a.nodeId == nodeId); if (w2786 && clearExisting)
    z1582(x1581, nodeId); const i1586 = x1581.find(s => s.id == styleId); d954(!!i1586, 'figStyle should be found here'); i1586.setPluginData('type', j1216); i1586.setPluginData('nodeId', nodeId); i1586.setPluginData('existing', u939(true)); s2732.push({ nodeId: nodeId, existing: true, styles: [i1586] }); return i1586; }
function z1582(x1581, nodeId) { const i1586 = x1581.find(s => s.getPluginData('nodeId') == nodeId); d954(!!i1586, 'figStyle should be found here'); if (i1586) {
    i1586.setPluginData('type', NULL);
    i1586.setPluginData('nodeId', NULL);
    i1586.setPluginData('existing', NULL);
    z947(s2732, a => a.nodeId == nodeId);
} return i1586; }
function s1583(styles, w1587) { const i1586 = figma.createPaintStyle(); i1586.setPluginData('type', w1587[o1382]); i1586.setPluginData('nodeId', w1587[i1383]); i1586.name = w1587[p1387]; setStylePaints(i1586, w1587); styles.push(i1586); d1527({ cmd: 'uiSetStyleId', nodeId: w1587[i1383], styleId: i1586.id }); return i1586; }
function r1584(msg) { let q2764 = NULL; let w2786; for (const w1587 of msg.styles) {
    if (w1587[i1383] != q2764) {
        q2764 = w1587[i1383];
        w2786 = s2732.find(a => a.nodeId == w1587[i1383]);
        if (!w2786) {
            w2786 = { nodeId: w1587[i1383], styles: [] };
            s2732.push(w2786);
        }
    }
    else
        w2786 = null;
    const i1586 = w2786.styles[0];
    figma.getLocalPaintStylesAsync().then(x1581 => { const localStyle = x1581.find(s => s.getPluginData('nodeId') == w1587[i1383]); if (isValid(i1586) && !isValid(localStyle)) {
        x940(w2786.styles, i1586);
    } const existing = isValid(i1586) && isValid(localStyle) && i1586.getPluginData('existing'); if (!isValid(i1586) || !isValid(localStyle)) {
        if (!existing) {
            g1517 = true;
            p1579(w1587[i1383], w1587[j1385]);
        }
    }
    else if (isValid(i1586) && i1586.getPluginData('type') == w1587[o1382]) {
        g1517 = true;
        c1585(localStyle, w1587);
    } });
} }
function c1585(i1586, w1587) { setStylePaints(i1586, w1587); i1586.name = w1587[p1387]; }
function getStylePaints(stylePaints) { const paints = new Array(); for (const e2787 of stylePaints) {
    const fill = e2787[1].split(' ');
    switch (e2787[0]) {
        case 'SOLID':
            paints.push({ type: 'SOLID', color: { r: Math.min(Math.max(0, parseFloat(fill[0]) / 0xff), 1), g: Math.min(Math.max(0, parseFloat(fill[1]) / 0xff), 1), b: Math.min(Math.max(0, parseFloat(fill[2]) / 0xff), 1) }, opacity: Math.min(Math.max(0, parseFloat(fill[3]) / 100), 1) });
            break;
    }
} return paints; }
function setStylePaints(i1586, w1587) { if (!isEmpty(w1587[l1389]))
    i1586.paints = getStylePaints(w1587[l1389]);
else
    i1586.paints = []; }
function v1601(nodeId, px, py) {
    return __awaiter(this, void 0, void 0, function* () { figma.variables.getLocalVariablesAsync().then((x2788) => __awaiter(this, void 0, void 0, function* () { const variables = new Array(); for (const _var of x2788) {
        const collection = yield figma.variables.getVariableCollectionByIdAsync(_var.variableCollectionId);
        const variable = { id: _var.id, resolvedType: _var.resolvedType, name: _var.name, collectionName: collection.name };
        variables.push(variable);
    } figma.variables.getLocalVariableCollectionsAsync().then((collections) => __awaiter(this, void 0, void 0, function* () { d1527({ cmd: 'uiReturnFigGetAllLocalVariables', nodeId: nodeId, px: px, py: py, variables: JSON.stringify(variables), nCollections: collections.length }); })); })); });
}
function y1602(varIds) {
    return __awaiter(this, void 0, void 0, function* () { const x2788 = yield figma.variables.getLocalVariablesAsync(); const variables = varIds.map(id => x2788.find(v => v.id == id)); let values = []; for (let i = 0; i < varIds.length; i++) {
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
function f1603(nodeId, varId) { figma.variables.getLocalVariablesAsync().then(x2788 => { figLinkVariableAsync(x2788, nodeId, varId); }); }
function figUpdateVariableAsync(varId, value) {
    return __awaiter(this, void 0, void 0, function* () { figma.variables.getLocalVariablesAsync().then((x2788) => __awaiter(this, void 0, void 0, function* () { let variable = x2788.find(v => v.id == varId); if (!variable)
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
function figLinkVariableAsync(x2788, nodeId, varId) {
    return __awaiter(this, void 0, void 0, function* () { let variable = x2788.find(v => v.id == varId); if (!variable)
        return null; const [resolvedVar, values] = yield figGetResolvedVariableValuesAsync(variable); d1527({ cmd: 'uiReturnFigLinkNodeToVariable', nodeId: nodeId, variableId: resolvedVar ? resolvedVar.id : NULL, variableName: resolvedVar ? resolvedVar.name : '', resolvedType: resolvedVar ? resolvedVar.resolvedType : NULL, values: values }); return resolvedVar; });
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
function s1588(tl, tr, bl) { let vr = point(tr.x - tl.x, tr.y - tl.y); let vb = point(bl.x - tl.x, bl.y - tl.y); let sx = vr.x; let sy = vb.y; let kx = -vr.y; let ky = -vb.x; let dx = -tl.x; let dy = -tl.y; const _sx = kx / nozero(sx); const _sy = ky / nozero(sy); let w4211 = k887([[1, _sy, 0], [_sx, 1, 0], [0, 0, 1]], k891(dx, dy)); w4211 = p889(w4211); const a = o881(vr); if (a > Tau / 4 && a < Tau * 3 / 4)
    w4211 = k887(w4211, k891(0, 0, 1, 1, Tau / 2)); if (determinant(w4211) < 0)
    w4211 = k887(w4211, k891(0, 0, -1, 1, 0)); return w4211; }
function q1589(h1514, tl, tr, bl) { const w4211 = s1588(tl, tr, bl); h1514.relativeTransform = [w4211[0], w4211[1]]; }
function h1590(h1514, c1513, setSize = true, noHeight = 0.01) { if (!c1513[p1391] || !c1513[x1392] || !c1513[u1393])
    return; const xp0 = c1513[p1391]; const xp1 = c1513[x1392]; const xp2 = c1513[u1393]; q1589(h1514, xp0, xp1, xp2); if (setSize) {
    const g892 = distv(xp0, xp1);
    const d893 = distv(xp0, xp2);
    const height = c1513[o1382] == u1243 ? c1513[j1426] : c1513[v1413];
    if (!h1514.removed) {
        h1514.resizeWithoutConstraints(Math.max(0.01, g892), height ? Math.max(0.01, d893) : noHeight);
    }
} }
function v1591(w2701, p2702) { if (w2701.removed)
    return; w2701.resizeWithoutConstraints(0.01, 0.01); w2701.setPluginData('actualX', p2702[e1409].toString()); w2701.setPluginData('actualY', p2702[h1411].toString()); w2701.x = p2702[e1409]; w2701.y = p2702[h1411]; w2701.rotation = p2702[v1405] ? 45 : 0; }
function z1592(w2701) { if (!w2701.removed)
    w2701.resizeWithoutConstraints(0.01, 0.01); }
function l2779(genBool) { return true; }
function k2750(genBool, addProps, transform) {
    return __awaiter(this, void 0, void 0, function* () { let objects = []; for (const w111 of genBool[FO_BOOLEAN_CHILDREN])
        yield t1529(w111, o => objects = [...objects, o], false); yield figma.currentPage.loadAsync(); let figBool = null; if (!isEmpty(objects)) {
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
        f2756(figBool, genBool, addProps, transform);
    } return figBool; });
}
function f2756(figBool, genBool, addProps, transform) {
    return __awaiter(this, void 0, void 0, function* () { if (genBool[FO_BOOLEAN_CHILDREN].length == 0) {
        figBool.remove();
        return;
    } yield t2733(figBool, genBool[FO_BOOLEAN_CHILDREN], genBool[FO_BOOLEAN_CHILDREN].length, -1, [], false, false, false, false, true); const hasProps = genBool[f1395].length > 0 || genBool[g1396].length > 0 || genBool[c1403].length > 0; x2703(figBool, genBool, !hasProps && addProps); });
}
function i2776(m2767) { return m2767[e1409] != null && !isNaN(m2767[e1409]) && m2767[h1411] != null && !isNaN(m2767[h1411]) && m2767[x1412] != null && !isNaN(m2767[x1412]) && m2767[v1413] != null && !isNaN(m2767[v1413]) && m2767[d1415] != null && !isNaN(m2767[d1415]) && m2767[l1422] != null && !isNaN(m2767[l1422]) && m2767[u1428] != null && !isNaN(m2767[u1428]) && m2767[q1432] != null && !isNaN(m2767[q1432]); }
function a2789(m2767, addProps, transform) { if (!i2776(m2767))
    return null; const l2768 = figma.createEllipse(); v2790(l2768, m2767, addProps, transform, true); return l2768; }
function v2790(l2768, m2767, addProps, transform, isValid = false) { if (!isValid && !i2776(m2767))
    return; s2791(l2768, m2767, transform); if (z2766.includes(l2768))
    j2698(l2768);
else
    x2703(l2768, m2767, addProps); }
function s2791(l2768, m2767, transform) { l2768.cornerRadius = m2767[d1415]; const start = m2767[l1422] / 360 * (Math.PI * 2); const sweep = m2767[u1428] / 100 * (Math.PI * 2); l2768.arcData = { startingAngle: start, endingAngle: start + sweep, innerRadius: Math.min(Math.max(0, m2767[q1432] / 100), 1) }; if (transform)
    h1590(l2768, m2767); }
function t2781(d2769) { return d2769[e1409] != null && !isNaN(d2769[e1409]) && d2769[h1411] != null && !isNaN(d2769[h1411]) && d2769[x1412] != null && !isNaN(d2769[x1412]) && d2769[v1413] != null && !isNaN(d2769[v1413]) && d2769[j1421] != null && !isNaN(d2769[j1421]); }
function s2752(d2769, addProps, transform) {
    return __awaiter(this, void 0, void 0, function* () { if (!t2781(d2769))
        return null; const n2770 = figma.createFrame(); n2770.expanded = false; if (n2770) {
        u2792(n2770, d2769, addProps, transform);
        let objects = [];
        for (const w111 of d2769[s1427])
            yield t1529(w111, o => objects = [...objects, o]);
        for (const w111 of objects)
            n2770.appendChild(w111);
    } return n2770; });
}
function a2758(n2770, d2769, addProps, transform) { u2792(n2770, d2769, addProps, transform); t2733(n2770, d2769[s1427], d2769[s1427].length); }
function u2792(n2770, d2769, addProps, transform) { n2770.cornerRadius = d2769[j1421]; if (transform)
    h1590(n2770, d2769); x2703(n2770, d2769, addProps && d2769[s1427].length == 0); }
function k2780(f2771) { return true; }
function f2751(f2771) {
    return __awaiter(this, void 0, void 0, function* () { let objects = []; for (const w111 of f2771[g1410])
        yield t1529(w111, o => objects = [...objects, o]); yield figma.currentPage.loadAsync(); const z2772 = !isEmpty(objects) ? figma.group(objects, figma.currentPage) : null; if (z2772) {
        z2772.expanded = false;
        b2757(z2772, f2771);
    } return z2772; });
}
function b2757(z2772, f2771) { if (f2771[g1410].length == 0) {
    z2772.remove();
    return;
} t2733(z2772, f2771[g1410], f2771[g1410].length); d1540(z2772, f2771); }
function w2775(g2773) { return g2773[e1409] != null && !isNaN(g2773[e1409]) && g2773[h1411] != null && !isNaN(g2773[h1411]) && g2773[x1412] != null && !isNaN(g2773[x1412]); }
function l2793(g2773, addProps, transform) { if (!w2775(g2773))
    return null; const d2774 = figma.createLine(); r2794(d2774, g2773, addProps, transform, true); return d2774; }
function r2794(d2774, g2773, addProps, transform, isValid = false) { if (!isValid && !w2775(g2773))
    return; if (transform)
    h1590(d2774, g2773, true, 0); x2703(d2774, g2773, addProps); }
var z2766 = [];
function a4029(p2702) { return p2702[e1409] != null && !isNaN(p2702[e1409]) && p2702[h1411] != null && !isNaN(p2702[h1411]); }
function n2696(p2702) { const w2701 = p2702[v1405] ? figma.createRectangle() : figma.createEllipse(); if (!a4029(p2702))
    return w2701; if (z2766.includes(w2701))
    t2700(w2701, p2702);
else
    o2753(w2701, p2702); return w2701; }
function o2753(w2701, p2702) { v1591(w2701, p2702); d2699(w2701); }
function r2697() { d1527({ cmd: 'uiUpdateZoom', zoom: figma.viewport.zoom }); for (const point of z2766)
    j2698(point); }
function j2698(w2701) { z1592(w2701); d2699(w2701); }
function t2700(w2701, p2702) { v1591(w2701, p2702); d2699(w2701); }
function d2699(w2701) { if (w2701.removed)
    return; figma.currentPage.loadAsync().then(() => { const v3740 = i925(w2701.getPluginData('isCenter')); const q2708 = figma.currentPage.selection.includes(w2701); const color = v3740 ? [0xf2, 0x48, 0x22] : q2708 ? [12, 140, 233] : [255, 255, 255]; const border = v3740 ? [255, 255, 255] : q2708 ? [255, 255, 255] : [12, 140, 233]; w2701.fills = w958([['SOLID', color[0], color[1], color[2], 100]]); const effects = []; effects.push(...j1535([['DROP_SHADOW', border[0] / 255, border[1] / 255, border[2] / 255, 1, 0, 0, 0, (v3740 ? 3 : q2708 ? 5 : 3.6) / l2709, 'NORMAL', true, true]], true)); effects.push(...j1535([['DROP_SHADOW', color[0] / 255, color[1] / 255, color[2] / 255, 1, 0, 0, 0, (q2708 ? 4 : 2.4) / l2709, 'NORMAL', true, true]], true)); w2701.effects = effects; }); }
function e4030(genPoly) { return genPoly[e1409] != null && !isNaN(genPoly[e1409]) && genPoly[h1411] != null && !isNaN(genPoly[h1411]) && genPoly[x1412] != null && !isNaN(genPoly[x1412]) && genPoly[v1413] != null && !isNaN(genPoly[v1413]) && genPoly[b1418] != null && !isNaN(genPoly[b1418]) && genPoly[x1424] != null && !isNaN(genPoly[x1424]); }
function q2710(genPoly, addProps, transform) { if (!e4030(genPoly))
    return null; const figPoly = figma.createPolygon(); s2711(figPoly, genPoly, addProps, transform, true); return figPoly; }
function s2711(figPoly, genPoly, addProps, transform, isValid = false) { if (!isValid && !e4030(genPoly))
    return; figPoly.cornerRadius = genPoly[b1418]; figPoly.pointCount = Math.max(3, genPoly[x1424]); if (transform)
    h1590(figPoly, genPoly); x2703(figPoly, genPoly, addProps); }
function h2713(f2712) { return f2712[e1409] != null && !isNaN(f2712[e1409]) && f2712[h1411] != null && !isNaN(f2712[h1411]) && f2712[x1412] != null && !isNaN(f2712[x1412]) && f2712[v1413] != null && !isNaN(f2712[v1413]) && f2712[s1414] != null && !isNaN(f2712[s1414]); }
function e2714(f2712, addProps, transform) { if (!h2713(f2712))
    return null; const figRect = figma.createRectangle(); h2715(figRect, f2712, addProps, transform, true); return figRect; }
function h2715(figRect, f2712, addProps, transform, isValid = false) { if (!isValid && !h2713(f2712))
    return; const found = f2712[c1403].findIndex(e => e[0] == 'ROUND_CORNERS'); if (found > -1) {
    const corners = f2712[c1403][found];
    figRect.topLeftRadius = corners[1];
    figRect.topRightRadius = corners[2];
    figRect.bottomLeftRadius = corners[3];
    figRect.bottomRightRadius = corners[4];
}
else
    figRect.cornerRadius = f2712[s1414]; if (transform)
    h1590(figRect, f2712); x2703(figRect, f2712, addProps); }
function a2716(k2726) { return k2726[e1409] != null && !isNaN(k2726[e1409]) && k2726[h1411] != null && !isNaN(k2726[h1411]) && k2726[x1412] != null && !isNaN(k2726[x1412]) && k2726[v1413] != null && !isNaN(k2726[v1413]) && k2726[u1419] != null && !isNaN(k2726[u1419]) && k2726[f1425] != null && !isNaN(k2726[f1425]) && k2726[j1430] != null && !isNaN(k2726[j1430]); }
function h2717(k2726, addProps, transform) { if (!a2716(k2726))
    return null; const l2727 = figma.createStar(); y2718(l2727, k2726, addProps, transform, true); return l2727; }
function y2718(l2727, k2726, addProps, transform, isValid = false) { if (!isValid && !a2716(k2726))
    return; l2727.cornerRadius = k2726[u1419]; l2727.pointCount = k2726[f1425]; l2727.innerRadius = Math.min(Math.max(0, k2726[j1430] / 100), 1); if (transform)
    h1590(l2727, k2726); x2703(l2727, k2726, addProps); }
const x4273 = [];
function u2719(o2723) { return o2723[p1431] != null && o2723[e1409] != null && !isNaN(o2723[e1409]) && o2723[h1411] != null && !isNaN(o2723[h1411]) && o2723[x1412] != null && !isNaN(o2723[x1412]) && o2723[v1413] != null && !isNaN(o2723[v1413]) && o2723[j1433] != null && o2723[j1433] != NULL && o2723[a1434] != null && !isNaN(o2723[a1434]); }
function h2720(o2723, addProps, transform) { if (!u2719(o2723))
    return null; const y2795 = figma.createText(); y2721(y2795, o2723, addProps, transform, true); return y2795; }
function y2721(y2795, o2723, addProps, transform, isValid = false) { if (!isValid && !u2719(o2723))
    return null; const fontName = { family: o2723[j1433], style: o2723[k1435] }; try {
    if (!x4273.includes(fontName)) {
        figma.loadFontAsync(fontName).then(() => { x4273.push(fontName); q2722(y2795, o2723, fontName, addProps, transform); });
    }
    else {
        q2722(y2795, o2723, fontName, addProps, transform);
    }
}
catch (e) {
    f955(e);
} }
function q2722(y2795, o2723, fontName, addProps, transform) { y2795.fontName = fontName; y2795.fontSize = Math.max(1, o2723[a1434]); y2795.characters = o2723[p1431]; y2795.lineHeight = { unit: 'PERCENT', value: o2723[h1438] }; y2795.letterSpacing = { unit: 'PERCENT', value: o2723[d1439] }; if (o2723[h1436] == 0)
    y2795.textAlignHorizontal = 'LEFT';
else if (o2723[h1436] == 1)
    y2795.textAlignHorizontal = 'CENTER';
else if (o2723[h1436] == 2)
    y2795.textAlignHorizontal = 'RIGHT';
else if (o2723[h1436] == 3)
    y2795.textAlignHorizontal = 'JUSTIFIED'; if (o2723[m1437] == 0)
    y2795.textAlignVertical = 'TOP';
else if (o2723[m1437] == 1)
    y2795.textAlignVertical = 'CENTER';
else if (o2723[m1437] == 2)
    y2795.textAlignVertical = 'BOTTOM'; if (transform)
    h1590(y2795, o2723); x2703(y2795, o2723, addProps); if (o2723[o1420] == 0 && o2723[j1426] == 0)
    y2795.textAutoResize = 'WIDTH_AND_HEIGHT';
else if (o2723[o1420] == 0)
    y2795.textAutoResize = 'HEIGHT';
else
    y2795.textAutoResize = 'NONE'; }
function t2778(z2728) { return true; }
function g2749(z2728, addProps, transform) { if (!t2778(z2728))
    return null; const k2729 = figma.createVector(); v2755(k2729, z2728, addProps, transform, true); return k2729; }
function v2755(k2729, z2728, addProps, transform, isValid = false) { if (!isValid && !t2778(z2728))
    return; k2729.setVectorNetworkAsync(z2728[v1416]); if (transform)
    h1590(k2729, z2728, false); x2703(k2729, z2728, addProps); }
function n2777(x2724) { return x2724[g1423] != null && !isNaN(x2724[g1423]) && x2724[z1429] != null && !isNaN(x2724[z1429]); }
function j2748(x2724, addProps, transform) { const u2725 = figma.createVector(); v2754(u2725, x2724, addProps, transform, true); return u2725; }
function v2754(u2725, x2724, addProps, transform, isValid = false) { if (!isValid && !n2777(x2724))
    return; u2725.vectorPaths = [{ windingRule: x2724[g1423] == 1 ? 'NONZERO' : 'EVENODD', data: x2724[w1417] }]; u2725.cornerRadius = x2724[z1429]; if (transform)
    h1590(u2725, x2724, false); x2703(u2725, x2724, addProps); }
