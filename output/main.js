var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function f1051(key, tag) { return key.substring(0, tag.length + 1) == tag + ' '; }
function z1052(key, tag) { return key.substring(tag.length + 1); }
function g1053(key) { return f1051(key, n875); }
function u1054(key) { return f1051(key, g873); }
function a1055(key) { return f1051(key, w874); }
function p1056(key) { return z1052(key, n875); }
function l1057(key) { return z1052(key, g873); }
function u1058(key) { return z1052(key, w874); }
const generatorVersion = 375;
const u867 = 2147483647;
const NULL = '';
const a868 = '  ';
const x869 = '    ';
const z870 = '\n';
const d871 = '◦ G •';
const e872 = d871 + ' ';
const g873 = 'G_NODE';
const w874 = 'G_CONN';
const n875 = 'G_PAGE';
const e876 = 'G_TEMP';
const minWindowWidth = 602;
const minWindowHeight = 39;
const identity = Object.freeze([[1, 0, 0], [0, 1, 0], [0, 0, 1]]);
const Epsilon = 0.0000001;
const Tau = Math.PI * 2;
var h2539 = false;
function z877(x, eps = 0.000000001) { return Math.abs(x) < eps ? 0 : x; }
function nozero(x, eps = 0.000000001) { return x != 0 ? x : (x < 0 ? -eps : eps); }
function z878(v, eps = 0.000000001) { return point(nozero(v.x, eps), nozero(v.y, eps)); }
function equal(a, b, eps = 0.000000001) { return Math.abs(b - a) < eps; }
function sqr(x) { return x * x; }
;
function cube(x) { return x * x * x; }
;
function b879(f) { return Math.floor(f) | 0; }
function k880(x) { x = b879(x); x--; x |= x >> 1; x |= x >> 2; x |= x >> 4; x |= x >> 8; x |= x >> 16; x |= x >> 32; return ++x; }
function gcd(a, b) { let temp; while (1) {
    temp = a % b;
    if (temp == 0)
        return b;
    a = b;
    b = temp;
} }
function distv(p1, p2) { const dx = p2.x - p1.x; const dy = p2.y - p1.y; return Math.sqrt(dx * dx + dy * dy); }
function f881(v) { let angle = Math.atan2(v.y, v.x); if (angle < 0)
    angle += Tau; return angle; }
function anglev2(v1, v2) { return anglev2_(v1.x, v1.y, v2.x, v2.y); }
function anglev2_(x1, y1, x2, y2) { const dx = x2 - x1; const dy = y2 - y1; let angle = Math.atan2(dy, dx); if (angle < 0)
    angle += Tau; return angle; }
function n883(v) { return Math.sqrt(v.x * v.x + v.y * v.y); }
function lengthv_(x, y) { return Math.sqrt(x * x + y * y); }
function u884(v) { return point(v.x == 0 ? 0 : v.x / n883(v), v.y == 0 ? 0 : v.y / n883(v)); }
function dotv(v1, v2) { return v1.x * v2.x + v1.y * v2.y; }
function e885(a1, a2) { let diff = a2 - a1; while (diff <= -Tau / 2)
    diff += Tau; while (diff > Tau / 2)
    diff -= Tau; return diff; }
function t886(v, m) { let v3 = [v.x, v.y, 1]; let r = o950(v3, m); return point(r[0], r[1]); }
function w887(...mm) { d954(mm.length > 0, 'mulm3m3() must take at least one argument'); let result = clone(mm[0]); for (let a = 1; a < mm.length; a++) {
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
function t888(m, s) { for (let i = 0; i < 3; i++)
    for (let j = 0; j < 3; j++)
        m[i][j] /= s; return m; }
function adjugate(m) { return cofactor(transpose(m)); }
function transpose(m) { return [[m[0][0], m[1][0], m[2][0]], [m[0][1], m[1][1], m[2][1]], [m[0][2], m[1][2], m[2][2]]]; }
function cofactor(m) { return [[m[1][1] * m[2][2] - m[2][1] * m[1][2], -(m[1][0] * m[2][2] - m[2][0] * m[1][2]), m[1][0] * m[2][1] - m[2][0] * m[1][1]], [-(m[0][1] * m[2][2] - m[2][1] * m[0][2]), m[0][0] * m[2][2] - m[2][0] * m[0][2], -(m[0][0] * m[2][1] - m[2][0] * m[0][1])], [m[0][1] * m[1][2] - m[1][1] * m[0][2], -(m[0][0] * m[1][2] - m[1][0] * m[0][2]), m[0][0] * m[1][1] - m[1][0] * m[0][1]]]; }
function determinant(m) { return m[0][0] * (m[1][1] * m[2][2] - m[1][2] * m[2][1]) - m[0][1] * (m[1][0] * m[2][2] - m[2][0] * m[1][2]) + m[0][2] * (m[1][0] * m[2][1] - m[2][0] * m[1][1]); }
function f889(m) { return t888(adjugate(m), determinant(m)); }
function j890(angle) { const cosA = z877(Math.cos(angle)); const sinA = z877(Math.sin(angle)); return [[cosA, sinA, 0], [-sinA, cosA, 0], [0, 0, 1]]; }
function t891(x = 0, y = 0, n892 = 1, h893 = 1, angle = 0, a894 = 0, p895 = 0) { const cosA = Math.cos(angle); const sinA = Math.sin(angle); return [[n892 * cosA - p895 * sinA, -a894 * cosA + h893 * sinA, x], [p895 * cosA + n892 * sinA, h893 * cosA + a894 * sinA, y], [0, 0, 1]]; }
function m896(v1, v2) { return v1.x * v2.y - v1.y * v2.x; }
function w897(v1, v2) { return point(v1.x + v2.x, v1.y + v2.y); }
function sqrv(v) { return d898(v, v); }
function d898(v1, v2) { return point(v1.x * v2.x, v1.y * v2.y); }
function l899(v, s) { return point(v.x * s, v.y * s); }
function j900(v1, v2) { return point(v1.x / v2.x, v1.y / v2.y); }
function z901(v, s) { return point(v.x / s, v.y / s); }
function e902(v1, v2) { return point(v1.x - v2.x, v1.y - v2.y); }
function m903(str) { return decodeURI(encodeURIComponent(str)); }
function b904(str) { return decodeURIComponent(encodeURI(str)); }
function h905(bytes) { let str = ''; for (let i = 0; i < bytes.length; i++)
    str += String.fromCharCode(bytes[i]); return str; }
function l906(str) { return Array.from(b904(str), c => c.charCodeAt(0)); }
function v907(array, size) { const newArray = new Uint8Array(size); b908(array, newArray); return newArray; }
function b908(src, dst) { o909(src, 0, src.length, dst, 0, dst.length); }
function o909(src, j910, b911, dst, f912, t913) { const size = Math.min(b911, t913); for (let i = 0; i < size; i++)
    dst[f912 + i] = src[j910 + i]; }
function x914(g915, b916) { if (g915.length != b916.length)
    return false; for (let i = 0; i < g915.length; i++) {
    if (g915[i] != b916[i])
        return false;
} return true; }
function n917(q918, k919) { return q918.findIndex(i => k919.includes(i)) > -1; }
function h920(list) { return list ? '<==' : '<--'; }
;
function l921(list) { return list ? '==>' : '-->'; }
;
function a922(nodeId) { return g873 + ' ' + nodeId; }
function u923(name) { return w874 + ' ' + name; }
function o924(name) { return n875 + ' ' + name; }
function f925(str) { return str.toLowerCase() == 'true' || str == '1'; }
function q926(w927, f928 = false) { return o933(w927.outputNodeId, w927.outputId, w927.outputOrder, w927.inputNodeId, w927.inputId, w927.list, f928); }
function h929(outputNodeId, outputId, outputOrder, inputNodeId, inputId) { return u923(outputNodeId + ' ' + outputId + ' ' + outputOrder + ' ' + inputNodeId + ' ' + inputId); }
function a930(b243) { return h929(b243.outputNodeId, b243.outputId, b243.outputOrder, b243.inputNodeId, b243.inputId); }
function h931(b243) { return h929(b243.output.node.id, b243.output.id, b243.outputOrder, b243.input.node.id, b243.input.id); }
function w932(b243, f928 = false) { return o933(b243.output.node.id, b243.output.id, b243.outputOrder, b243.input.node.id, b243.input.id, b243.list, f928); }
function o933(outputNodeId, outputId, outputOrder, inputNodeId, inputId, list, f928 = false) { const sp = f928 ? ' ' : '  '; const jsp = f928 ? '' : ' '; const arrow = sp + c937(typeof outputOrder == 'string' ? parseInt(outputOrder) : outputOrder) + l921(typeof list == 'string' ? f925(list) : list) + sp; const join = jsp + '.' + jsp; return outputNodeId + join + outputId + arrow + inputNodeId + join + inputId; }
function r934(pageId) { return o924(pageId); }
function k935(num) { const str = num.toString(); let sup = ''; for (const c of str)
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
function c937(num) { const str = num.toString(); let sup = ''; for (const c of str)
    sup += m938(c); return sup; }
function m938(c) { switch (c) {
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
function n939(bool) { return bool ? 'true' : 'false'; }
function isValid(val) { return val != undefined && val != null; }
function isEmpty(array) { return array.length == 0; }
function s940(array, item) { y941(array, array.indexOf(item)); }
function y941(array, index) { if (index > -1 && index < array.length)
    array.splice(index, 1); }
function u942(array) { if (isEmpty(array))
    return null; let last = array.at(-1); array.splice(array.length - 1, 1); return last; }
function f943(array) { return array[array.length - 1]; }
function w944(array, from, to) { const item = array[from]; array.splice(from, 1); array.splice(to, 0, item); }
function h945(array, item) { const index = array.indexOf(item); if (index > -1)
    array.splice(index, 1); }
function o946(u2795, array) { for (const item of array) {
    const index = u2795.indexOf(item);
    if (index > -1)
        u2795.splice(index, 1);
} }
function t947(array, where) { const index = array.findIndex(where); if (index > -1)
    array.splice(index, 1); }
function j948(styleId) { return styleId.split(',')[0] + ','; }
function t949(points) { let o4035 = ''; if (points.length < 2)
    return o4035; o4035 += 'M'; o4035 += ' ' + z877(points[0].x); o4035 += ' ' + z877(points[0].y); for (let i = 1; i < points.length; i++) {
    o4035 += ' L' + ' ' + z877(points[i].x) + ' ' + z877(points[i].y);
} return o4035; }
function point(x, y) { return { x: x, y: y }; }
function o950(v, m) { let r = [0, 0, 0]; for (let i = 0; i < 3; i++)
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
function y951(array, item, equal = null) { if (equal) {
    if (Array.isArray(item))
        item.forEach(i => y951(array, i, equal));
    else if (!array.find(i => equal(i, item)))
        array.push(item);
}
else {
    if (Array.isArray(item))
        item.forEach(i => y951(array, i));
    else if (!array.includes(item))
        array.push(item);
} }
function f952(array, item, equal) { if (Array.isArray(item))
    item.forEach(i => f952(array, i, equal));
else if (!array.find(equal))
    array.push(item); }
function t953(array, item, except) { if (Array.isArray(item))
    item.forEach(i => t953(array, i, except));
else if (!array.find(except))
    array.push(item); }
function d954(...args) { if (h2539) {
    console.assert(...args);
} }
function x955(...args) { if (h2539)
    console.error(...args); }
function y956(str, trim) { while (str.length >= trim.length && str.substring(0, trim.length) == trim)
    str = str.substring(trim.length); return str; }
function j957(str, trim) { while (str.length >= trim.length && str.substring(str.length - trim.length) == trim)
    str = str.substring(0, str.length - trim.length); return str; }
function x958(u4095) { const fills = []; for (const fill of u4095) {
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
            const z4211 = fill[1];
            const stops = [];
            for (const stop of fill[2]) {
                stops.push({ color: { r: Math.min(Math.max(0, stop[0]), 1), g: Math.min(Math.max(0, stop[1]), 1), b: Math.min(Math.max(0, stop[2]), 1), a: Math.min(Math.max(0, stop[3]), 1) }, position: stop[4] });
            }
            fills.push({ type: fill[0], gradientTransform: z4211, gradientStops: stops, blendMode: fill[3] });
            break;
        }
    }
} return fills; }
function w959(type) { return w1092.includes(type); }
const y1059 = 'LIST#';
const u1060 = 'NLIST#';
const l1061 = 'TLIST#';
const u1062 = 'SLIST#';
const p1063 = 'NULL';
const t1064 = 'VAR';
const q1065 = 'VARGRP';
const z1066 = 'START';
const g1067 = 'REPT';
const m1068 = 'CACHE';
const l1069 = 'FRZ';
const p1070 = 'TIMER';
const l1071 = 'VNAME';
const GET_LIST_VALUE_NAMES = 'GVNAMES';
const LIST_VALUE_NAMES = 'VNAMES';
const OBJECT_NAME = 'ONAME';
const e1072 = 'CMB';
const w1073 = 'LSASIT';
const f1074 = 'EXTR';
const z1075 = 'SETP';
const b1076 = 'GETP';
const r1077 = 'SUBLST';
const s1078 = 'UNIQ';
const REORDER_LIST = 'RORD';
const SHIFT_LIST = 'SHFTLST';
const u1079 = 'REVLST';
const i1080 = 'SORT';
const h1081 = 'CLMN';
const b1082 = 'CELL';
const f1083 = 'LIST';
const k1084 = 'COUNT';
const OBJECT_COUNT = 'OBJCOUNT';
const v1085 = 'LCONT';
const q1086 = 'SELECT';
const SELECT_FROM_LIST = 'LSTSEL';
const w1087 = 'IF';
const j1088 = 'LSTFLT';
const d1089 = 'ITER';
const f1090 = 'ANY#';
const s1091 = [y1059, u1060, l1061, u1062, e1072, f1074, z1075, b1076, r1077, f1083, k1084, v1085, g1067];
const w1092 = [y1059, u1060, l1061, u1062];
const a1093 = [p1063, t1064, q1065, ...s1091, w1073, f1074, z1075, b1076, r1077, s1078, REORDER_LIST, SHIFT_LIST, u1079, h1081, i1080, b1082, f1083, q1086, SELECT_FROM_LIST, w1087, j1088, z1066, g1067, d1089, m1068, l1069, p1070, l1071, GET_LIST_VALUE_NAMES, LIST_VALUE_NAMES, OBJECT_NAME];
const k1094 = 'NUM#';
const t1095 = 'NUM';
const NUMBER_PRECISION = 'NPREC';
const f1096 = 'NSIGN';
const l1097 = 'ABS';
const NUMBER_NEGATIVE = 'NEG';
const w1098 = 'ROUND';
const NUMBER_QUANTIZE = 'QUANT';
const x1099 = 'SMINMAX';
const i1100 = 'MINMAX';
const z1101 = 'LIM';
const b1102 = 'NCURVE';
const NUMBER_BIAS = 'NBIAS';
const z1103 = 'NANISNUM';
const m1104 = 'CONST';
const r1105 = 'DATE';
const b1106 = 'SEQ';
const d1107 = 'RANGE';
const a1108 = 'WAVE';
const u1109 = 'RAND';
const z1110 = 'NOISE';
const x1111 = 'PROB';
const t1112 = 'ACCUM';
const z1113 = 'LERP';
const q1114 = 'SOLVE';
const n1115 = 'NANIM';
const k1116 = 'SMATH';
const o1117 = 'MATH';
const e1118 = 'ADD';
const y1119 = 'SUB';
const z1120 = 'MUL';
const d1121 = 'DIV';
const x1122 = 'MOD';
const i1123 = 'EXP';
const f1124 = 'NBOOL';
const x1125 = 'NOT';
const o1126 = 'AND';
const e1127 = 'OR';
const l1128 = 'XOR';
const m1129 = 'COND';
const u1130 = 'EQ';
const p1131 = 'NE';
const v1132 = 'LT';
const u1133 = 'LE';
const m1134 = 'GT';
const j1135 = 'GE';
const g1136 = 'TRIG';
const b1137 = 'SIN';
const t1138 = 'COS';
const t1139 = 'TAN';
const t1140 = 'ATAN2';
const m1141 = 'CNVANG';
const v1142 = [o1117, k1116, e1118, y1119, z1120, d1121, x1122, i1123];
const o1143 = [f1124, x1125, o1126, e1127, l1128];
const e1144 = [m1129, u1130, p1131, v1132, u1133, m1134, j1135];
const h1145 = [g1136, b1137, t1138, t1139, t1140];
const z1146 = 'TEXT#';
const w1147 = 'TEXT';
const j1148 = 'TLEN';
const x1149 = 'TTRIM';
const j1150 = 'TSUB';
const q1151 = 'TCONT';
const h1152 = 'TCASE';
const x1153 = 'TREPL';
const y1154 = 'TJOIN';
const e1155 = 'TPAD';
const b1156 = 'TCMP';
const s1157 = 'TCHAR';
const t1158 = 'TUNI';
const o1159 = 'INDEX';
const c1160 = 'N2T';
const x1161 = 'C2T';
const r1162 = 'T2N';
const o1163 = 'T2C';
const a1164 = 'TSPLT';
const e3504 = 'TJSON';
const c1166 = 'TCSV';
const y1167 = 'FETCH';
const n1168 = 'TFILE';
const g1169 = [k1094, u1060, t1095, NUMBER_PRECISION, f1096, l1097, NUMBER_NEGATIVE, w1098, NUMBER_QUANTIZE, x1099, i1100, z1101, b1102, NUMBER_BIAS, z1103, m1104, r1105, b1106, d1107, a1108, u1109, z1110, x1111, t1112, z1113, q1114, n1115, c1160, s1157, ...v1142, ...o1143, ...e1144, ...h1145, m1141];
const h1170 = [z1146, l1061, w1147, j1148, x1149, j1150, q1151, h1152, y1154, e1155, x1153, b1156, t1158, o1159, r1162, o1163, a1164, e3504, c1166, y1167, n1168];
const i1171 = 'COL#';
const v1172 = 'COL';
const l1173 = 'CVAL';
const e1174 = 'CCOR';
const m1175 = 'COLP3';
const h1176 = 'CCNT';
const j1177 = 'BLND';
const d1178 = 'CLERP';
const x1179 = 'CBLND';
const y1180 = [i1171, v1172, e1174, m1175, j1177, d1178, x1179, x1161];
const r1181 = 'FILL#';
const u1182 = 'FILL';
const o1183 = [r1181, u1182];
const c1184 = 'STRK#';
const e1185 = 'STRK';
const i1186 = [c1184, e1185];
const x1187 = 'CSTOP#';
const w1188 = 'CSTOP';
const h1189 = [x1187, w1188];
const h1190 = 'GRAD#';
const n1191 = 'GRAD';
const h1192 = [h1190, n1191];
const f1193 = 'RCRN#';
const q1194 = 'RCRN';
const w1195 = [f1193, q1194];
const u1196 = 'DRSH#';
const h1197 = 'DRSH';
const o1198 = [u1196, h1197];
const u1199 = 'INSH#';
const f1200 = 'INSH';
const a1201 = [u1199, f1200];
const j1202 = 'LBLR#';
const d1203 = 'LBLR';
const q1204 = [j1202, d1203];
const a1205 = 'BBLR#';
const u1206 = 'BBLR';
const v1207 = [a1205, u1206];
const s1208 = 'MASK#';
const l1209 = 'MASK';
const x1210 = [s1208, l1209];
const r1211 = 'BLEND#';
const p1212 = 'BLEND';
const w1213 = [r1211, p1212];
const q1214 = [...w1195, ...o1198, ...a1201, ...q1204, ...v1207, ...w1213, ...x1210];
const l1215 = [i1171, r1181, h1190, c1184, u1196, u1199, j1202, a1205, r1211, s1208];
const c1216 = 'CSTL';
const d1217 = 'SHP#';
const l1218 = 'RECT#';
const v1219 = 'RECT';
const b1220 = [l1218, v1219];
const e1221 = 'LINE#';
const b1222 = 'LINE';
const g1223 = [e1221, b1222];
const z1224 = 'ELPS#';
const t1225 = 'ELPS';
const a1226 = [z1224, t1225];
const q1227 = 'TRPZ#';
const v1228 = 'TRPZ';
const i1229 = [q1227, v1228];
const i1236 = 'POLY#';
const r1237 = 'POLY';
const y1238 = [i1236, r1237];
const b1239 = 'STAR#';
const j1240 = 'STAR';
const m1241 = [b1239, j1240];
const e1242 = 'TXTS#';
const l1243 = 'TXTS';
const j1244 = [e1242, l1243];
const p1245 = 'PT#';
const y1246 = 'PT';
const l1247 = [p1245, y1246];
const p1248 = 'PCORN';
const f1249 = 'VPATH#';
const t1250 = 'VPATH';
const r1251 = [f1249, t1250];
const v1252 = 'VPT#';
const s1253 = 'VPT';
const t1254 = [v1252, s1253];
const b1255 = 'VEDGE#';
const z1256 = 'VEDGE';
const d1257 = [b1255, z1256];
const d1258 = 'VREG#';
const w1259 = 'VREG';
const a1260 = [d1258, w1259];
const e1261 = 'VNET#';
const a1262 = 'VNET';
const k1263 = [e1261, a1262];
const t1264 = 'SGRP#';
const x1265 = 'SGRP';
const w1266 = [t1264, x1265];
const g1267 = 'FRM#';
const e1268 = 'FRM';
const s1269 = [g1267, e1268];
const a1231 = 'ARC#';
const r1230 = 'ARC';
const v1232 = [a1231, r1230];
const r1234 = 'WAVEP#';
const i1233 = 'WAVEP';
const x1235 = [r1234, i1233];
const c1270 = 'MOVE';
const l1271 = 'ROT';
const e1272 = 'SCALE';
const j1273 = 'SKEW';
const l1274 = 'SCENTR';
const p1275 = 'RSTX';
const a1276 = 'PLACE';
const q1277 = 'APPLY';
const PATH_LENGTH = 'PTHLEN';
const JOIN_PATHS = 'JOINPTH';
const q1283 = 'PTALPATH';
const p1284 = 'CPTONPATH';
const w1278 = 'MESPT';
const j1279 = 'VECLEN';
const v1280 = 'CIRCEN';
const ARC_FROM_POINTS = 'ARCPT';
const p1281 = 'INTLIN';
const b1282 = 'PTLERP';
const REVERSE_PATH = 'REVPTH';
const PATH_TYPES = [t1250, v1228, r1230, i1233];
const PATH_VALUES = [f1249, q1227, a1231, r1234];
const a1285 = 'BOOL';
const f1286 = 'BOOL#';
const c1287 = 'BOOLU';
const p1288 = 'BOOLS';
const q1289 = 'BOOLI';
const y1290 = 'BOOLE';
const f1291 = [a1285, f1286, c1287, p1288, q1289, y1290];
const n1292 = 'RENDER';
const c1293 = [d1217, u1062, l1218, e1221, z1224, q1227, i1236, b1239, e1242, p1245, f1249, v1252, b1255, d1258, e1261, a1231, r1234, t1264, g1267, f1286, u1196, u1199, j1202, a1205, r1211, s1208];
const b1294 = [l1271, e1272, j1273];
const f1295 = [...c1293, ...b1220, ...g1223, ...a1226, ...i1229, ...y1238, ...m1241, ...j1244, ...l1247, p1248, ...r1251, ...t1254, ...d1257, ...a1260, ...k1263, ...v1232, ...x1235, ...w1266, ...s1269, ...f1291, c1270, ...b1294, l1274, p1275, a1276, q1277, PATH_LENGTH, JOIN_PATHS, q1283, p1284, w1278, j1279, v1280, r1230, i1233, ARC_FROM_POINTS, p1281, b1282, REVERSE_PATH, n1292];
const m1296 = [y1059, u1060, l1061, u1062, k1094, z1146, i1171, r1181, x1187, h1190, c1184, x1187, h1190, d1217, l1218, e1221, z1224, q1227, i1236, b1239, e1242, p1245, f1249, v1252, b1255, d1258, e1261, t1264, g1267, f1193, u1196, u1199, j1202, a1205, r1211, s1208];
const u1297 = 'GROUP';
const s1298 = 'GPARAM';
const m1299 = [u1297, s1298];
const t1300 = 'CMNT';
const r1301 = 'CMNTARR';
const g1302 = 'PANEL';
const w1303 = 'ACT';
const c1304 = 'BEF';
const i1305 = 'DIS';
const n1306 = 'NOC';
const PARAM = 'PARAM';
const l1307 = 'LOG';
const g1308 = 'GRAPH';
const d1309 = [[x1122, '%'], [d1121, '/'], [y1119, '−'], [e1118, '+'], [z1120, '×'], [i1123, 'e<sup>x']];
const a1310 = [[d1121, '/'], [y1119, '−'], [e1118, '+'], [z1120, '×']];
const j1311 = 0;
const g1312 = 1;
const u1313 = 2;
const a1314 = 3;
const k1315 = [[j1311, 'not'], [g1312, 'xor'], [u1313, 'or'], [a1314, 'and']];
const c1316 = 0;
const k1317 = 1;
const v1318 = 2;
const t1319 = 3;
const s1320 = 4;
const u1321 = 5;
const r1322 = [[c1316, '<'], [k1317, '≤'], [v1318, '≠'], [t1319, '='], [s1320, '≥'], [u1321, '>']];
const n1323 = 0;
const u1324 = 1;
const x1325 = 2;
const y1326 = 3;
const b1327 = 4;
const i1328 = 5;
const g1329 = [[n1323, 'sin'], [u1324, 'cos'], [x1325, 'tan'], [y1326, 'asin'], [b1327, 'acos'], [i1328, 'atan']];
const d1330 = 'EMPTY';
const f1331 = 'CONNECT';
const y1332 = 'CREATE';
const j1333 = 'CREATE_INSERT';
const q1334 = 'DELETE';
const d1335 = 'DISCONNECT';
const i1336 = 'LINK_STYLE';
const e1337 = 'LINK_VARIABLE';
const n1338 = 'LINK_VARIABLE_GROUP';
const g1339 = 'MAKE_ACTIVE';
const MAKE_NOT_CONDITION_ACTION = 'MAKE_NOT_CONDITION';
const m1340 = 'MAKE_PASSIVE';
const t1341 = 'PASTE';
const v1342 = 'RECONNECT';
const l1343 = 'REMOVE';
const p1344 = 'RENAME';
const p1345 = 'REORDER_INPUTS';
const y1346 = 'REORDER_CONNECTIONS';
const s1347 = 'SELECT';
const b1348 = 'SELECT_MOVE';
const q1349 = 'MOVE_NODES';
const c1350 = 'SET_PARAM_VALUE';
const SET_MULTIPLE_VALUES_ACTION = 'SET_MULTIPLE_VALUES';
const c1351 = 'SET_PARAM_SETTING';
const y1352 = 'SET_NODE_RECT';
const y1353 = 'TOGGLE_DISABLE';
const u1354 = 'TOGGLE_PARAM_HEADER';
const y1355 = 'SET_CURRENT_GRAPH';
const a1356 = 'CREATE_PAGE';
const t1357 = 'DELETE_PAGE';
const c1358 = 'GROUP_NODES';
const f1359 = 'UNGROUP_NODES';
const j1360 = 'HIGHLIGHT_NODES';
const SCROLL_LIST_NODE_ACTION = 'SCROLL_LIST_NODE';
const SET_LIST_DIVIDER_ACTION = 'SET_LIST_DIVIDER';
const SET_NODE_PARAM_ACTION = 'SET_NODE_PARAM';
const l1361 = 'BNORM';
const d1362 = 'BDARK';
const a1363 = 'BMULT';
const a1364 = 'BPDRK';
const u1365 = 'BBURN';
const l1366 = 'BLITE';
const w1367 = 'BSCRN';
const e1368 = 'BPLGT';
const w1369 = 'BDODG';
const c1370 = 'BOVER';
const y1371 = 'BSOFT';
const w1372 = 'BHARD';
const o1373 = 'BDIFF';
const g1374 = 'BEXCL';
const y1375 = 'BHUE';
const y1376 = 'BSAT';
const f1377 = 'BCOL';
const x1378 = 'BLUM';
const f1379 = [[l1361, 'normal', 'NORMAL'], [d1362, 'darken', 'DARKEN'], [a1363, 'multiply', 'MULTIPLY'], [a1364, 'plus darker', 'LINEAR_BURN'], [u1365, 'color burn', 'COLOR_BURN'], [l1366, 'lighten', 'LIGHTEN'], [w1367, 'screen', 'SCREEN'], [e1368, 'plus lighter', 'LINEAR_DODGE'], [w1369, 'color dodge', 'COLOR_DODGE'], [c1370, 'overlay', 'OVERLAY'], [y1371, 'soft light', 'SOFT_LIGHT'], [w1372, 'hard light', 'HARD_LIGHT'], [o1373, 'difference', 'DIFFERENCE'], [g1374, 'exclusion', 'EXCLUSION'], [y1375, 'hue', 'HUE'], [y1376, 'saturation', 'SATURATION'], [f1377, 'color', 'COLOR'], [x1378, 'luminosity', 'LUMINOSITY']];
const z1380 = [['thin', 100], ['extra light', 200], ['light', 300], ['regular', 400], ['medium', 500], ['semi bold', 600], ['bold', 700], ['extra bold', 800], ['black', 900]];
const f1381 = 0;
const a1382 = 1;
const r1383 = 2;
const d1384 = 2;
const b1385 = 3;
const h1386 = 3;
const z1387 = 4;
const p1388 = 4;
const r1389 = 5;
const d1390 = 6;
const p1391 = 7;
const c1392 = 8;
const i1393 = 9;
const x1394 = 10;
const b1395 = 11;
const q1396 = 12;
const v1397 = 13;
const k1398 = 14;
const v1399 = 15;
const d1400 = 16;
const b1401 = 17;
const o1402 = 18;
const f1403 = 19;
const o1404 = 20;
const e1405 = 21;
const f1406 = 22;
const k1407 = 23;
const s1408 = 24;
const v1409 = 24;
const a1410 = 25;
const v1411 = 26;
const v1412 = 27;
const x1413 = 28;
const g1414 = 28;
const e1415 = 28;
const l1416 = 28;
const m1417 = 28;
const w1418 = 28;
const z1419 = 28;
const n1420 = 28;
const l1421 = 29;
const h1422 = 29;
const m1423 = 29;
const t1424 = 29;
const n1425 = 29;
const v1426 = 29;
const n1427 = 30;
const r1428 = 30;
const f1429 = 30;
const i1430 = 30;
const d1431 = 31;
const u1432 = 31;
const c1433 = 32;
const b1434 = 33;
const x1435 = 34;
const r1436 = 35;
const u1437 = 36;
const c1438 = 37;
const e2796 = '12345679ABCDEFGHJKLMNPQRSTUVWXYZ';
function r845(array, chars = e2796) { let e847 = ''; let len = array.length; let i = 0; while (len > 0) {
    if (len >= 5) {
        const a0 = array[i], a1 = array[i + 1], a2 = array[i + 2], a3 = array[i + 3], a4 = array[i + 4];
        e847 += chars[(a0 & 0xF8) >>> 3];
        e847 += chars[((a0 & 0x07) << 2) | ((a1 & 0xC0) >>> 6)];
        e847 += chars[(a1 & 0x3E) >>> 1];
        e847 += chars[((a1 & 0x01) << 4) | ((a2 & 0xF0) >>> 4)];
        e847 += chars[((a2 & 0x0F) << 1) | ((a3 & 0x80) >>> 7)];
        e847 += chars[(a3 & 0x7C) >>> 2];
        e847 += chars[((a3 & 0x03) << 3) | ((a4 & 0xE0) >>> 5)];
        e847 += chars[(a4 & 0x1F)];
    }
    else if (len == 4) {
        const a0 = array[i], a1 = array[i + 1], a2 = array[i + 2], a3 = array[i + 3];
        e847 += chars[(a0 & 0xF8) >>> 3];
        e847 += chars[((a0 & 0x07) << 2) | ((a1 & 0xC0) >>> 6)];
        e847 += chars[(a1 & 0x3E) >>> 1];
        e847 += chars[((a1 & 0x01) << 4) | ((a2 & 0xF0) >>> 4)];
        e847 += chars[((a2 & 0x0F) << 1) | ((a3 & 0x80) >>> 7)];
        e847 += chars[(a3 & 0x7C) >>> 2];
        e847 += chars[((a3 & 0x03) << 3)];
    }
    else if (len == 3) {
        const a0 = array[i], a1 = array[i + 1], a2 = array[i + 2];
        e847 += chars[(a0 & 0xF8) >>> 3];
        e847 += chars[((a0 & 0x07) << 2) | ((a1 & 0xC0) >>> 6)];
        e847 += chars[(a1 & 0x3E) >>> 1];
        e847 += chars[((a1 & 0x01) << 4) | ((a2 & 0xF0) >>> 4)];
        e847 += chars[((a2 & 0x0F) << 1)];
    }
    else if (len == 2) {
        const a0 = array[i], a1 = array[i + 1];
        e847 += chars[(a0 & 0xF8) >>> 3];
        e847 += chars[((a0 & 0x07) << 2) | ((a1 & 0xC0) >>> 6)];
        e847 += chars[(a1 & 0x3E) >>> 1];
        e847 += chars[((a1 & 0x01) << 4)];
    }
    else if (len == 1) {
        const a0 = array[i];
        e847 += chars[(a0 & 0xF8) >>> 3];
        e847 += chars[((a0 & 0x07) << 2)];
    }
    i += 5;
    len -= 5;
} return e847; }
function u846(e847, chars = e2796) { const array = []; let len = e847.length; let c = 0; while (len > 0) {
    if (len >= 8) {
        const c0 = chars.indexOf(e847[c]), c1 = chars.indexOf(e847[c + 1]), c2 = chars.indexOf(e847[c + 2]), c3 = chars.indexOf(e847[c + 3]), c4 = chars.indexOf(e847[c + 4]), c5 = chars.indexOf(e847[c + 5]), c6 = chars.indexOf(e847[c + 6]), c7 = chars.indexOf(e847[c + 7]);
        array.push((c0 << 3) | ((c1 & 0x1C) >>> 2));
        array.push(((c1 & 0x03) << 6) | (c2 << 1) | ((c3 & 0x10) >>> 4));
        array.push(((c3 & 0x0F) << 4) | ((c4 & 0x1E) >>> 1));
        array.push(((c4 & 0x01) << 7) | (c5 << 2) | ((c6 & 0x18) >>> 3));
        array.push(((c6 & 0x07) << 5) | c7);
    }
    else if (len == 7) {
        const c0 = chars.indexOf(e847[c]), c1 = chars.indexOf(e847[c + 1]), c2 = chars.indexOf(e847[c + 2]), c3 = chars.indexOf(e847[c + 3]), c4 = chars.indexOf(e847[c + 4]), c5 = chars.indexOf(e847[c + 5]), c6 = chars.indexOf(e847[c + 6]);
        array.push((c0 << 3) | ((c1 & 0x1C) >>> 2));
        array.push(((c1 & 0x03) << 6) | (c2 << 1) | ((c3 & 0x10) >>> 4));
        array.push(((c3 & 0x0F) << 4) | ((c4 & 0x1E) >>> 1));
        array.push(((c4 & 0x01) << 7) | (c5 << 2) | ((c6 & 0x18) >>> 3));
    }
    else if (len == 5) {
        const c0 = chars.indexOf(e847[c]), c1 = chars.indexOf(e847[c + 1]), c2 = chars.indexOf(e847[c + 2]), c3 = chars.indexOf(e847[c + 3]), c4 = chars.indexOf(e847[c + 4]);
        array.push((c0 << 3) | ((c1 & 0x1C) >>> 2));
        array.push(((c1 & 0x03) << 6) | (c2 << 1) | ((c3 & 0x10) >>> 4));
        array.push(((c3 & 0x0F) << 4) | ((c4 & 0x1E) >>> 1));
    }
    else if (len == 4) {
        const c0 = chars.indexOf(e847[c]), c1 = chars.indexOf(e847[c + 1]), c2 = chars.indexOf(e847[c + 2]), c3 = chars.indexOf(e847[c + 3]);
        array.push((c0 << 3) | ((c1 & 0x1C) >>> 2));
        array.push(((c1 & 0x03) << 6) | (c2 << 1) | ((c3 & 0x10) >>> 4));
    }
    else if (len == 2) {
        const c0 = chars.indexOf(e847[c]), c1 = chars.indexOf(e847[c + 1]);
        array.push((c0 << 3) | ((c1 & 0x1C) >>> 2));
    }
    c += 8;
    len -= 8;
} return array; }
function q2101(nodeKey, m4007) {
    return __awaiter(this, void 0, void 0, function* () { const log = c2102(yield j1546(nodeKey, false)); if (m4007) {
        console.log('%c%s\n%c%s', 'background: #fa24; color: white;', l1057(nodeKey), 'background: #fa44; color: #edc;', log);
    }
    else {
        console.log('%c%s\n%c%s', 'background: #fdb; color: black;', l1057(nodeKey), 'background: #fed; color: black;', log);
    } });
}
function c2102(json) { let g4036 = json.replace('{\n', '').replace('\n}', '').replace('[\n' + a868, '').replace('\n' + a868 + ']', '').split(a868 + '"params":\n').join('').split('": "').join(': ').split('", "').join(': ').split(a868 + '"').join(a868).split(a868 + a868 + '["').join(a868 + a868).split('",\n').join('\n').split('"\n').join('\n').split('"],\n').join('\n'); if (g4036[g4036.length - 1] == '"')
    g4036 = g4036.substring(0, g4036.length - 1); if (g4036.substring(g4036.length - 2) == '"]')
    g4036 = g4036.substring(0, g4036.length - 2); return g4036; }
function p2103(json) { let g4036 = json.replace('{\n', '').replace('\n}', '').replace('[\n' + a868, '').replace('\n' + a868 + ']', ''); return g4036; }
function v2104(b243, m4007) { const z4214 = q926(b243, true); if (m4007) {
    console.log('%c%s', 'background: #4f44; color: #ded', z4214);
}
else {
    console.log('%c%s', 'background: #cfc; color: black;', z4214);
} }
console.clear();
figma.payments.setPaymentStatusInDevelopment({ type: 'PAID' });
figma.loadAllPagesAsync().then(() => { figma.on('documentchange', u1517); figma.on('selectionchange', x1525); figma.on('close', w1518); });
b1507(true);
figma.clientStorage.getAsync('pro').then(data => { figma.showUI(__html__, { visible: false, themeColors: true, title: 'Generator' }); });
var s2708 = figma.viewport.zoom;
setInterval(w1522, 100);
const c2797 = 'clock_';
const b2798 = 1000;
var d2799 = false;
var objectCenterSize = 15;
function j1519() { (function () {
    return __awaiter(this, void 0, void 0, function* () { figma.currentPage.loadAsync().then(() => __awaiter(this, void 0, void 0, function* () { let t2800 = yield figma.currentPage.getPluginData(figma.currentUser.id + ',windowWidth'); let o2801 = yield figma.currentPage.getPluginData(figma.currentUser.id + ',windowHeight'); let w2802; let p2803; if (t2800 === NULL) {
        w2802 = 800;
        figma.currentPage.setPluginData(figma.currentUser.id + ',windowWidth', t2800.toString());
    }
    else
        w2802 = parseInt(t2800); if (o2801 === NULL) {
        p2803 = 600;
        figma.currentPage.setPluginData(figma.currentUser.id + ',windowHeight', o2801.toString());
    }
    else
        p2803 = parseInt(o2801); figma.ui.resize(Math.max(minWindowWidth, w2802), Math.max(minWindowHeight, p2803)); figma.ui.show(); const fonts = yield figma.listAvailableFontsAsync(); const eula = (yield figma.clientStorage.getAsync('eula')) === 'true'; const tutorials = (yield figma.clientStorage.getAsync('tutorials')) === 'true'; const isLocked = yield g1524(); h1526({ cmd: 'uiReturnFigStartGenerator', currentUser: figma.currentUser, viewportRect: figma.viewport.bounds, viewportZoom: figma.viewport.zoom, fonts: fonts, eula: eula, tutorials: tutorials, isLocked: isLocked, windowWidth: w2802, windowHeight: p2803 }); })); });
})(); }
function r1520() { b1507(); figma.showUI(__html__, { visible: false, themeColors: true }); }
function r1521() { setInterval(m1523, b2798); }
function w1522() { if (figma.viewport.zoom == s2708)
    return; s2708 = figma.viewport.zoom; b2696(); j1540(); b1542(); }
function m1523() { h1547(c2797 + figma.currentUser.sessionId.toString(), Date.now().toString()); }
function g1524() {
    return __awaiter(this, void 0, void 0, function* () { yield figma.currentPage.loadAsync(); const clocks = figma.currentPage.getPluginDataKeys().filter(k => k.length > c2797.length && k.substring(0, c2797.length) == c2797 && k.substring(c2797.length) != figma.currentUser.sessionId.toString()).map((k) => __awaiter(this, void 0, void 0, function* () { return parseInt(yield j1546(k)); })); clocks.sort(); const now = Date.now(); const locked = clocks.length > 0 && now - (yield clocks[clocks.length - 1]) < b2798 * 2; return locked; });
}
function x1525() { b2696(); }
var k2729 = new Array();
var l2731 = new Array();
function u1506(nodeIds) { for (let i = r2765.length - 1; i >= 0; i--)
    if (!r2765[i].removed && nodeIds.includes(r2765[i].getPluginData('nodeId')))
        r2765.splice(i, 1); for (let i = b2781.length - 1; i >= 0; i--)
    if (b2781[i].removed || nodeIds.includes(b2781[i].getPluginData('nodeId')))
        b2781.splice(i, 1); figma.currentPage.loadAsync().then(() => { figma.currentPage.findAll(o => nodeIds.includes(o.getPluginData('nodeId'))).forEach(o => { if (!o.removed)
    o.remove(); }); }); k2729 = k2729.filter(a => !nodeIds.includes(a.nodeId)); }
function b1507(h1508 = false) { for (const b1513 of figma.currentPage.children) {
    if (b1513.removed)
        continue;
    if (b1513.getPluginData('objectId') != '' && b1513.getPluginData('userId') == figma.currentUser.id && (parseInt(b1513.getPluginData('retain')) == 0 || h1508))
        b1513.remove();
} }
function p1509(nodeIds, n1510) { for (let i = k2729.length - 1; i >= 0; i--) {
    const n2730 = k2729[i];
    if (!nodeIds.includes(n2730.nodeId))
        continue;
    for (let j = n2730.objects.length - 1; j >= 0; j--) {
        const b1513 = n2730.objects[j];
        if (b1513.removed || !h1511(b1513, n1510)) {
            if (!b1513.removed)
                b1513.remove();
            h945(n2730.objects, b1513);
            if (r2765.includes(b1513))
                h945(r2765, b1513);
            if (b2781.includes(b1513))
                h945(b2781, b1513);
        }
        if (!b1513.removed) {
            if (parseInt(b1513.getPluginData('retain')) == 2)
                h1532(b1513);
        }
    }
    if (isEmpty(n2730.objects))
        h945(k2729, n2730);
} }
function h1511(b1513, n1510) { if (b1513.type == x1265 || b1513.type == e1268) {
    for (const child of b1513.children) {
        const found = h1511(child, n1510);
        if (found)
            return found;
    }
}
else {
    const found = n1510.find(o => b1513.getPluginData('objectId') == o[r1383] && b1513.getPluginData('userId') == figma.currentUser.id || o[r1389] == 2 && o[r1389] == b1513.getPluginData('retain'));
    if (found)
        return found;
} return null; }
function h1514(nodeIds, t1515) { figma.getLocalPaintStylesAsync().then(paintStyles => { paintStyles.filter(s => nodeIds.includes(s.getPluginData('nodeId'))).forEach(s => { const nodeId = s.getPluginData('nodeId'); const existing = f925(s.getPluginData('existing')); if (!existing) {
    s.remove();
}
else if (t1515) {
    t947(l2731, a => a.nodeId == nodeId);
    s.setPluginData('type', NULL);
    s.setPluginData('nodeId', NULL);
    s.setPluginData('existing', NULL);
} }); }); if (t1515)
    l2731 = l2731.filter(a => !nodeIds.includes(a.nodeId)); }
var h1516 = false;
function u1517(e) { for (const change of e.documentChanges) {
    switch (change.type) {
        case 'STYLE_CREATE':
            if (!change.style)
                break;
            if (!h1516) {
                change.style.setPluginData('type', NULL);
                change.style.setPluginData('nodeId', NULL);
                change.style.setPluginData('existing', NULL);
            }
            break;
        case 'STYLE_PROPERTY_CHANGE': {
            if (!change.style)
                break;
            if (!h1516) {
                const msg = { cmd: 'uiStylePropertyChange', styleId: j948(change.id), properties: change.properties, name: '', paints: [] };
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
                h1526(msg);
            }
            break;
        }
        case 'STYLE_DELETE':
            h1526({ cmd: 'uiStyleDelete', styleId: change.id });
            break;
    }
} h1516 = false; }
function w1518() { b1507(); h1526({ cmd: 'updateMetrics' }); }
figma.ui.onmessage = function (msg) { msg = JSON.parse(msg); if (msg.cmd == 'returnUiGetValueForFigma')
    return; switch (msg.cmd) {
    case 'figStartGenerator':
        j1519();
        break;
    case 'figRestartGenerator':
        r1520();
        break;
    case 'figFinishStart':
        r1521();
        break;
    case 'figDockWindowNormal':
        m2738('normal');
        break;
    case 'figDockWindowMaximize':
        m2738('maximize');
        break;
    case 'figDockWindowTop':
        m2738('top');
        break;
    case 'figDockWindowLeft':
        m2738('left');
        break;
    case 'figDockWindowRight':
        m2738('right');
        break;
    case 'figDockWindowBottom':
        m2738('bottom');
        break;
    case 'figGetMousePosition':
        c1592(msg.clientPosition);
        break;
    case 'figResizeWindow':
        w1595(msg.width, msg.height);
        break;
    case 'figSetWindowRect':
        m1593(msg.x, msg.y, msg.width, msg.height);
        break;
    case 'figNotify':
        j1596(msg);
        break;
    case 'figGetLocalData':
        v1544(msg.key);
        break;
    case 'figSetLocalData':
        v1545(msg.key, msg.value);
        break;
    case 'figClearAllLocalData':
        s4031();
        break;
    case 'figGetPageData':
        j1546(msg.key);
        break;
    case 'figSetPageData':
        h1547(msg.key, msg.value);
        break;
    case 'figSavePages':
        y1552(msg.pageIds, msg.pageJson, msg.currentPageId);
        break;
    case 'figLoadNodesAndConns':
        x1549(msg.debugMode);
        break;
    case 'figSaveNodes':
        w1553(msg.nodeIds, msg.nodeJson);
        break;
    case 'figGetAllLocalTemplateNames':
        f2735();
        break;
    case 'figSaveLocalTemplate':
        d1554(msg.y4032, msg.template);
        break;
    case 'figRemoveConnsToNodes':
        r1555(msg.nodeIds);
        break;
    case 'figRemoveSavedNodesAndConns':
        e1556(msg.nodeIds);
        break;
    case 'figRemoveAllSavedNodesAndConns':
        x1557();
        break;
    case 'figLogAllSavedNodesAndConns':
        o1558(msg.m4007);
        break;
    case 'figLogAllSavedNodes':
        h1559(msg.m4007);
        break;
    case 'figLogAllSavedConns':
        r1560(msg.m4007);
        break;
    case 'figLogAllSavedPageKeys':
        m1561(msg.m4007);
        break;
    case 'figLogAllSavedPages':
        u1562(msg.m4007);
        break;
    case 'figLogAllSavedConnKeys':
        g1563(msg.m4007);
        break;
    case 'figLogAllLocalData':
        b1564(msg.m4007);
        break;
    case 'figGetValue':
        d1565(msg.key, msg.spec);
        break;
    case 'figRemoveSavedPage':
        f1567(msg.pageId);
        break;
    case 'figRemoveAllSavedPages':
        y1568();
        break;
    case 'figSaveConnection':
        p1569(msg.key, msg.json);
        break;
    case 'figSaveConnections':
        n1570(msg.keys, msg.json);
        break;
    case 'figUpdateSavedConnections':
        r1571(msg.curKeys, msg.newKeys, msg.json);
        break;
    case 'figDeleteSavedConnection':
        a1572(msg.key);
        break;
    case 'figRemoveAllSavedConnections':
        f1573();
        break;
    case 'figDeleteSavedConnectionsToNode':
        a1574(msg.nodeId);
        break;
    case 'figDeleteSavedConnectionsFromNode':
        n1575(msg.nodeId);
        break;
    case 'figRemovePluginDataFromAllLocalStyles':
        p1576();
        break;
    case 'figGetAllLocalVariables':
        v1600(msg.nodeId, msg.px, msg.py);
        break;
    case 'figLinkNodeToVariable':
        j1602(msg.nodeId, msg.variableId);
        break;
    case 'figUpdateVariable':
        figUpdateVariableAsync(msg.variableId, msg.value);
        break;
    case 'figGetAllLocalColorStyles':
        r1577(msg.nodeId, msg.px, msg.py);
        break;
    case 'figLinkNodeToExistingColorStyle':
        q1578(msg.nodeId, msg.styleId);
        break;
    case 'figGetObjectSize':
        j1531(msg.object);
        break;
    case 'figGetVariableUpdates':
        z1566(msg.linkedVarIds);
        break;
    case 'figUpdateShowIds':
        d2799 = msg.d2799;
        break;
    case 'figUpdateObjectCenterSize':
        objectCenterSize = msg.objectCenterSize;
        break;
    case 'figDeleteAllObjects':
        b1507();
        break;
    case 'figUpdateObjectsAndStyles':
        u2744 = 0;
        k2745 = 0;
        msg.objects.forEach(o => o.counted = false);
        f2732(null, msg.objects, msg.q4021, msg.u2049, msg.nodeIds, msg.k2761, msg.i2762, msg.m270);
        j1583(msg);
        break;
    case 'figDeleteObjectsAndStyles':
        u1506(msg.nodeIds);
        h1514(msg.nodeIds, msg.t1515);
        break;
    case 'figDeleteObjectsExcept':
        p1509(msg.nodeIds, msg.ignoreObjects);
        break;
    case 'figTriggerUndo':
        figma.triggerUndo();
        break;
    case 'figCommitUndo':
        figma.commitUndo();
        break;
} h1526({ cmd: 'uiEndFigMessage', msgCmd: msg.cmd }); };
function h1526(msg) { figma.ui.postMessage(JSON.stringify(msg)); }
function k2733(key) {
    return __awaiter(this, void 0, void 0, function* () { return yield figma.clientStorage.getAsync(key); });
}
function v1544(key) { figma.currentPage.loadAsync().then(() => { if (key == 'canvasEmpty') {
    h1526({ cmd: 'uiReturnFigGetLocalData', key: key, value: figma.currentPage.children.length == 0 });
}
else if (key == 'debugWarningCrash') {
    figma.clientStorage.getAsync('debugWarning').then(data => { h1526({ cmd: 'uiReturnFigGetLocalData', key: key, value: data }); });
}
else {
    figma.clientStorage.getAsync(key).then(data => { h1526({ cmd: 'uiReturnFigGetLocalData', key: key, value: data }); });
} }); }
function v1545(key, value, postToUi = true) { figma.clientStorage.setAsync(key, value); if (postToUi) {
    h1526({ cmd: 'uiReturnFigSetLocalData', key: key, value: value });
} }
function s4031() {
    return __awaiter(this, void 0, void 0, function* () { const keys = yield figma.clientStorage.keysAsync(); for (const key of keys)
        figma.clientStorage.deleteAsync(key); });
}
function j1546(key, postToUi = true) {
    return __awaiter(this, void 0, void 0, function* () { yield figma.currentPage.loadAsync(); const data = figma.currentPage.getPluginData(key); if (postToUi) {
        h1526({ cmd: 'uiReturnFigGetPageData', key: key, value: data });
    } return data; });
}
function h1547(key, value) { u1548(key); figma.currentPage.setPluginData(key, value); }
function u1548(key) { figma.currentPage.setPluginData(key, ''); }
function x1549(debugMode) { figma.currentPage.loadAsync().then(() => { const pageKeys = figma.currentPage.getPluginDataKeys().filter(k => g1053(k)); const nodeKeys = figma.currentPage.getPluginDataKeys().filter(k => u1054(k)); const connKeys = figma.currentPage.getPluginDataKeys().filter(k => a1055(k)); if (!debugMode)
    i1551(nodeKeys, connKeys); const pages = pageKeys.map(k => figma.currentPage.getPluginData(k)); const nodes = nodeKeys.map(k => figma.currentPage.getPluginData(k)); const h2121 = connKeys.map(k => figma.currentPage.getPluginData(k)); const pageOrder = figma.currentPage.getPluginData('pageOrder').split(','); const currentPageId = figma.currentPage.getPluginData('currentPageId'); v1550(nodes); const showAllColorSpaces = figma.currentPage.getPluginData('showAllColorSpaces'); h1526({ cmd: 'uiReturnFigLoadNodesAndConns', showAllColorSpaces: showAllColorSpaces, pageKeys: pageKeys, pageJson: pages, pageOrder: pageOrder, currentPageId: currentPageId, nodeKeys: nodeKeys, nodeJson: nodes, connKeys: connKeys, connJson: h2121 }); }); }
function v1550(nodes) { l2731 = []; figma.getLocalPaintStylesAsync().then(paintStyles => { for (const r3018 of nodes) {
    const node = JSON.parse(r3018);
    if (node.type == c1216) {
        const style = paintStyles.find(s => { const nodeId = s.getPluginData('nodeId'); return nodeId == node.id; });
        if (style) {
            l2731.push({ nodeId: node.id, existing: f925(node.existing), styles: [style] });
        }
    }
} }); }
function i1551(nodeKeys, connKeys) { figma.currentPage.loadAsync().then(() => { const l2734 = '"loading": "true"'; const not = '{\n'; const set = '{\n' + a868 + l2734 + ',\n'; nodeKeys.forEach(k => figma.currentPage.setPluginData(k, figma.currentPage.getPluginData(k).replace(set, not).replace(not, set))); connKeys.forEach(k => figma.currentPage.setPluginData(k, figma.currentPage.getPluginData(k).replace(set, not).replace(not, set))); }); }
function y1552(pageIds, pageJson, currentPageId) { for (let i = 0; i < pageIds.length; i++) {
    h1547(o924(pageIds[i]), pageJson[i]);
} h1547('pageOrder', pageIds.join(',')); h1547('currentPageId', currentPageId); }
function w1553(nodeIds, nodeJson) { for (let i = 0; i < nodeIds.length; i++) {
    h1547(a922(nodeIds[i]), nodeJson[i]);
} }
function f2735() {
    return __awaiter(this, void 0, void 0, function* () { let keys = yield figma.clientStorage.keysAsync(); keys = keys.filter(k => k.length >= e876.length && k.substring(0, e876.length) == e876); h1526({ cmd: 'uiReturnGetAllLocalTemplateNames', templateNames: keys }); });
}
function d1554(y4032, template) { v1545(e876 + ' ' + y4032, template); }
function r1555(nodeIds) { figma.currentPage.loadAsync().then(() => { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => a1055(k)); for (const key of connKeys) {
    const parts = u1058(key).split(' ');
    if (nodeIds.includes(parts[0]) || nodeIds.includes(parts[2]))
        u1548(key);
} }); }
function e1556(nodeIds) { figma.currentPage.loadAsync().then(() => { r1555(nodeIds); const nodeKeys = figma.currentPage.getPluginDataKeys().filter(k => u1054(k) && nodeIds.includes(l1057(k))); nodeKeys.forEach(k => u1548(k)); }); }
function x1557() { figma.currentPage.loadAsync().then(() => { const nodeKeys = figma.currentPage.getPluginDataKeys().filter(k => u1054(k)); const connKeys = figma.currentPage.getPluginDataKeys().filter(k => a1055(k)); for (const key of nodeKeys)
    u1548(key); for (const key of connKeys)
    u1548(key); }); }
function o1558(m4007) {
    return __awaiter(this, void 0, void 0, function* () { yield h1559(m4007); r1560(m4007); });
}
function h1559(m4007) {
    return __awaiter(this, void 0, void 0, function* () { yield figma.currentPage.loadAsync(); figma.currentPage.getPluginDataKeys().filter(k => u1054(k)).forEach((k) => __awaiter(this, void 0, void 0, function* () { return yield q2101(k, m4007); })); });
}
function r1560(m4007) { figma.currentPage.loadAsync().then(() => { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => a1055(k)); connKeys.sort((key1, key2) => { const p1 = u1058(key1).split(' '); const p2 = u1058(key2).split(' '); if (p1[2] != p2[2])
    return p1[2] < p2[2] ? -1 : 1; if (p1[3] != p2[3])
    return parseInt(p1[3]) - parseInt(p2[3]); if (p1[2] == p2[0])
    return -1; if (p2[2] == p1[0])
    return 1; return 0; }); connKeys.forEach(k => v2104(JSON.parse(figma.currentPage.getPluginData(k)), m4007)); }); }
function m1561(m4007) { figma.currentPage.loadAsync().then(() => { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => g1053(k)); connKeys.forEach(k => console.log('%c' + k, 'background: #fff; color: ' + (m4007 ? 'black' : 'white'))); const pageOrder = figma.currentPage.getPluginData('pageOrder'); console.log('%c' + pageOrder, 'background: #fff; color: ' + (m4007 ? 'black' : 'white')); }); }
function u1562(m4007) { figma.currentPage.loadAsync().then(() => { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => g1053(k)); connKeys.forEach(k => console.log('%c' + figma.currentPage.getPluginData(k), 'background: #fff; color: ' + (m4007 ? 'black' : 'white'))); const pageOrder = figma.currentPage.getPluginData('pageOrder'); console.log('%c' + pageOrder, 'background: #fff; color: ' + (m4007 ? 'black' : 'white')); }); }
function g1563(m4007) { figma.currentPage.loadAsync().then(() => { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => a1055(k)); connKeys.forEach(k => console.log('%c' + k, 'background: #dff; color: ' + (m4007 ? 'black' : 'white'))); }); }
function b1564(m4007) { figma.clientStorage.keysAsync().then(keys => keys.forEach(k => figma.clientStorage.getAsync(k).then(val => console.log(k + ': ' + val)))); }
function d1565(key, spec) {
    return __awaiter(this, void 0, void 0, function* () { let result = null; switch (key) {
        case 'getVariableData':
            result = yield e1601(spec);
            break;
        case 'getPaidStatus':
            result = figma.payments.status.type;
            break;
        case 'figSubscribe': {
            yield figma.payments.initiateCheckoutAsync({ interstitial: 'PAID_FEATURE' });
            result = figma.payments.status.type;
            break;
        }
    } h1526({ cmd: 'returnFigGetValue', value: result }); });
}
function z1566(varIds) { e1601(varIds).then(values => { h1526({ cmd: 'uiReturnFigGetVariableUpdates', values: values }); }); }
function f1567(pageId) {
    return __awaiter(this, void 0, void 0, function* () { u1548(r934(pageId)); const pageOrder = (yield j1546('pageOrder')).split(','); t947(pageOrder, id => id == pageId); h1547('pageOrder', pageOrder.join(',')); });
}
function y1568() { figma.currentPage.loadAsync().then(() => { const pageKeys = figma.currentPage.getPluginDataKeys().filter(k => g1053(k)); pageKeys.forEach(k => u1548(k)); u1548('pageOrder'); }); }
function p1569(key, json) { h1547(key, json); }
function n1570(_keys, _json) { const keys = JSON.parse(_keys); const json = JSON.parse(_json); for (let i = 0; i < keys.length; i++)
    h1547(keys[i], json[i]); }
function r1571(_curKeys, _newKeys, _json) { const curKeys = JSON.parse(_curKeys); const newKeys = JSON.parse(_newKeys); const json = JSON.parse(_json); for (let i = 0; i < curKeys.length; i++) {
    u1548(curKeys[i]);
    h1547(newKeys[i], json[i]);
} }
function a1572(key) { u1548(key); }
function f1573() { figma.currentPage.loadAsync().then(() => { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => a1055(k)); connKeys.forEach(k => u1548(k)); }); }
function a1574(nodeId) { figma.currentPage.loadAsync().then(() => { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => a1055(k)); for (const key of connKeys) {
    const parts = key.split(' ');
    if (parts[4] == nodeId)
        u1548(key);
} }); }
function n1575(nodeId) { figma.currentPage.loadAsync().then(() => { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => a1055(k)); for (const key of connKeys) {
    const parts = key.split(' ');
    if (parts[1] == nodeId)
        u1548(key);
} }); }
function p1576() { figma.getLocalPaintStylesAsync().then(n1580 => { for (const style of n1580) {
    style.setPluginData('type', '');
    style.setPluginData('nodeId', '');
    style.setPluginData('existing', '');
} }); }
var k2736 = null;
var e4033 = () => k2736 = null;
var k2737 = 'normal';
function c1592(clientPosition) { h1526({ cmd: 'uiReturnFigGetMousePosition', position: { x: 0, y: 0 }, clientPosition: clientPosition, viewportZoom: figma.viewport.zoom, viewportRect: figma.viewport.bounds }); }
function m1593(x, y, width, height) { return; }
function y1594(dock, rect, bounds) { switch (dock) {
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
function w1595(width, height) { (function () {
    return __awaiter(this, void 0, void 0, function* () { width = Math.floor(Math.max(0, width)); height = Math.floor(Math.max(0, height)); figma.ui.resize(width, height); yield figma.currentPage.loadAsync(); figma.currentPage.setPluginData(figma.currentUser.id + ',windowWidth', width.toString()); figma.currentPage.setPluginData(figma.currentUser.id + ',windowHeight', height.toString()); h1526({ cmd: 'uiReturnFigResizeWindow', width: width, height: height }); });
})(); }
function m2738(dock) {
    return __awaiter(this, void 0, void 0, function* () { if (dock != 'normal' && k2737 == 'normal') {
        figma.clientStorage.setAsync('normalWindowX', yield figma.clientStorage.getAsync('normalWindowX'));
        figma.clientStorage.setAsync('normalWindowY', yield figma.clientStorage.getAsync('normalWindowY'));
        figma.clientStorage.setAsync('normalWindowWidth', yield figma.clientStorage.getAsync('normalWindowWidth'));
        figma.clientStorage.setAsync('normalWindowHeight', yield figma.clientStorage.getAsync('normalWindowHeight'));
    } k2737 = dock; figma.clientStorage.setAsync('windowDock', dock); w1595(yield figma.clientStorage.getAsync('windowWidth'), yield figma.clientStorage.getAsync('windowHeight')); });
}
function j1596(msg) { v1597(msg.text, msg.prefix, msg.delay, msg.error, msg.e1598, msg.s1599); }
function v1597(text, prefix = 'Generator ', delay = 400, error = false, e1598 = '', s1599 = NULL) { const options = { timeout: delay, error: error, onDequeue: e4033 }; if (e1598 != '') {
    options['button'] = { text: e1598 };
    if (s1599.substring(0, 'removeConnection'.length) == 'removeConnection') {
        options['button']['action'] = () => a1572(s1599.split(',')[1]);
    }
    else {
        switch (s1599) {
            case 'hideClearUndoWarning':
                options['button']['action'] = () => h1526({ cmd: 'uiHideClearUndoWarning' });
                break;
        }
    }
} if (k2736)
    k2736.cancel(); k2736 = figma.notify(prefix + text, options); }
function r2739(key, params = null) {
    return __awaiter(this, void 0, void 0, function* () { return yield f2740(key, params); });
}
function f2740(key, params = null) {
    return __awaiter(this, void 0, void 0, function* () { return new Promise((resolve, reject) => { const timeout = 60000; h1526(Object.assign({ cmd: 'uiGetValueForFigma', key: key }, (params || {}))); const m2741 = setTimeout(() => reject(new Error('Timeout: Result not received by Figma within the specified time')), timeout); function z4034(msg) { msg = JSON.parse(msg); if (msg.cmd === 'returnUiGetValueForFigma') {
        clearTimeout(m2741);
        resolve({ key: msg.key, value: msg.value });
        figma.ui.off('message', z4034);
    } } figma.ui.on('message', z4034); }); });
}
var k2742 = [];
var n2743 = [];
var u2744 = 0;
var k2745 = 0;
function h1527(z111) { return (z111[r1389] === 2 ? '' : e872) + (d2799 ? z111[r1383] : z111[b1385]); }
function g1528(f1512, addObject = null) {
    return __awaiter(this, void 0, void 0, function* () { if (!o1530(f1512))
        return null; let b1513; switch (f1512[f1381]) {
        case v1219:
            b1513 = x2713(f1512);
            break;
        case b1222:
            b1513 = d2792(f1512);
            break;
        case t1225:
            b1513 = b2788(f1512);
            break;
        case r1237:
            b1513 = z2709(f1512);
            break;
        case j1240:
            b1513 = n2716(f1512);
            break;
        case l1243:
            b1513 = l2719(f1512);
            break;
        case y1246:
            b1513 = n2695(f1512);
            break;
        case t1250:
            b1513 = i2747(f1512);
            break;
        case a1262:
            b1513 = c2748(f1512);
            break;
        case a1285:
            b1513 = yield t2749(f1512);
            break;
        case x1265:
            b1513 = yield z2750(f1512);
            break;
        case e1268:
            b1513 = yield o2751(f1512);
            break;
    } if (addObject && b1513 != undefined && b1513 != null && !b1513.removed) {
        b1513.name = h1527(f1512);
        d954(f1512[f1381] == x1265 || !!b1513, 'no Figma object created');
        if (b1513 != undefined && b1513 != null) {
            b1513.setPluginData('retain', f1512[r1389].toString());
            if (f1512[r1389] < 2) {
                b1513.setPluginData('userId', figma.currentUser.id);
                b1513.setPluginData('sessionId', figma.currentUser.sessionId.toString());
                b1513.setPluginData('type', f1512[f1381]);
                b1513.setPluginData('nodeId', f1512[a1382]);
                b1513.setPluginData('objectId', f1512[r1383]);
                b1513.setPluginData('isCenter', n939(f1512[o1404]));
                if (f1512[f1381] == y1246)
                    r2765.push(b1513);
                if (f1512[f1403])
                    f1543(b1513);
            }
            addObject(b1513);
        }
    } if (!f1512.counted) {
        k2745++;
        f1512.counted = true;
    } return b1513; });
}
function b1529(b1513, f1512) {
    return __awaiter(this, void 0, void 0, function* () { if (!o1530(f1512) || b1513 == undefined || b1513 == null || b1513.removed)
        return; b1513.name = h1527(f1512); b1513.setPluginData('retain', f1512[r1389].toString()); switch (f1512[f1381]) {
        case v1219:
            s2714(b1513, f1512);
            break;
        case b1222:
            w2793(b1513, f1512);
            break;
        case t1225:
            f2789(b1513, f1512);
            break;
        case r1237:
            c2710(b1513, f1512);
            break;
        case j1240:
            m2717(b1513, f1512);
            break;
        case l1243:
            n2720(b1513, f1512);
            break;
        case y1246:
            k2752(b1513, f1512);
            break;
        case t1250:
            u2753(b1513, f1512);
            break;
        case a1262:
            j2754(b1513, f1512);
            break;
        case a1285:
            f2755(b1513, f1512);
            break;
        case x1265:
            c2756(b1513, f1512);
            break;
        case e1268:
            j2757(b1513, f1512);
            break;
    } if (b1513 != undefined && b1513 != null && !b1513.removed) {
        if (b1513.parent == figma.currentPage)
            yield figma.currentPage.loadAsync();
        b1513.parent.appendChild(b1513);
        if (f1512[f1403])
            f1543(b1513);
    } if (!f1512.counted) {
        k2745++;
        f1512.counted = true;
    } });
}
function f2732(g2758, q2759, d2760, u2049 = -1, nodeIds = [], k2761 = false, i2762 = false, m270 = false) {
    return __awaiter(this, void 0, void 0, function* () { let i2763 = NULL; let m2764 = null; let abort = false; const f3642 = []; let c2746 = 0; k2742.push(...nodeIds); if (u2049 > -1)
        u2744 = u2049; for (const f1512 of q2759) {
        n2743.push(f1512);
        if (f1512[a1382] != i2763) {
            i2763 = f1512[a1382];
            m2764 = k2729.find(a => a.nodeId == f1512[a1382]);
            if (!m2764) {
                k2729.push(m2764 = { nodeId: f1512[a1382], objects: [] });
            }
        }
        const addObject = b1513 => { if (g2758 != undefined && g2758 != null && !g2758.removed)
            g2758.appendChild(b1513);
        else
            m2764.objects.push(b1513); };
        let objects = g2758 != undefined && g2758 != null && !g2758.removed ? g2758.children : m2764.objects;
        let b1513 = objects.find(o => o.removed || o.getPluginData('userId') == figma.currentUser.id && o.getPluginData('objectId') == f1512[r1383]);
        if (b1513 != undefined && b1513 != null && b1513.removed) {
            s940(objects, b1513);
            if (r2765.includes(b1513))
                h945(r2765, b1513);
            if (b2781.includes(b1513))
                h945(b2781, b1513);
        }
        if (b1513 == undefined || b1513 == null || b1513.removed) {
            const newObj = yield g1528(f1512, addObject);
            f3642.push(newObj);
        }
        else if (b1513 != undefined && b1513 != null && !b1513.removed && b1513.getPluginData('type') == f1512[f1381].toString()) {
            yield b1529(b1513, f1512);
            if (b1513 != undefined && b1513 != null && !b1513.removed)
                f3642.push(b1513);
        }
        else {
            b1513.remove();
            if (r2765.includes(b1513))
                h945(r2765, b1513);
            if (b2781.includes(b1513))
                h945(b2781, b1513);
            yield g1528(f1512, addObject);
        }
        c2746++;
        if (c2746 >= d2760) {
            const result = yield r2739('returnObjectUpdate', { u2744: u2744, k2745: k2745 });
            abort = result.value;
            c2746 = 0;
            if (abort)
                break;
        }
    } if (g2758 != undefined && g2758 != null && !g2758.removed) {
        for (const b1513 of g2758.children) {
            if (b1513 != undefined && b1513 != null && b1513.removed || !q2759.find(o => o[r1383] == b1513.getPluginData('objectId') && b1513.getPluginData('userId') == figma.currentUser.id))
                b1513.remove();
        }
    } for (const point of r2765) {
        if (point.parent == figma.currentPage)
            yield figma.currentPage.loadAsync();
        if (point != undefined && point != null && !point.removed && !point.parent.removed)
            point.parent.appendChild(point);
    } if (i2762 && !abort) {
        p1509(k2742, n2743);
        k2742 = [];
        n2743 = [];
        if (m270 && f3642.length > 0) {
            figma.viewport.scrollAndZoomIntoView(f3642);
            const bounds = a1533(f3642);
            figma.viewport.zoom = Math.min(figma.viewport.bounds.width * figma.viewport.zoom / bounds.width - 0.05, figma.viewport.bounds.height * figma.viewport.zoom / bounds.height - 0.05);
        }
    } yield r2739('returnObjectUpdate', { u2744: u2744, k2745: k2745 }); });
}
function o1530(f1512) { switch (f1512[f1381]) {
    case v1219: return z2712(f1512);
    case b1222: return g2774(f1512);
    case t1225: return a2775(f1512);
    case r1237: return b4030(f1512);
    case j1240: return t2715(f1512);
    case l1243: return c2718(f1512);
    case y1246: return p4029(f1512);
    case t1250: return v2776(f1512);
    case a1262: return o2777(f1512);
    case a1285: return e2778(f1512);
    case x1265: return n2779(f1512);
    case e1268: return k2780(f1512);
} }
function j1531(f1512) {
    return __awaiter(this, void 0, void 0, function* () { (() => __awaiter(this, void 0, void 0, function* () { const b1513 = yield g1528(f1512); const width = b1513.width; const height = b1513.height; b1513.remove(); h1526({ cmd: 'uiForwardToGenerator', msg: { cmd: 'returnFigGetObjectSize', objectId: f1512[r1383], width: width, height: height } }); }))(); });
}
function h1532(b1513) { b1513.setPluginData('type', ''); b1513.setPluginData('nodeId', ''); b1513.setPluginData('userId', ''); b1513.setPluginData('sessionId', ''); b1513.setPluginData('objectId', ''); b1513.setPluginData('isCenter', ''); b1513.setPluginData('retain', ''); }
function a1533(objects) { const bounds = { left: 0, top: 0, right: 0, bottom: 0 }; for (const z111 of objects) {
    if (z111.x < bounds.left || bounds.left == bounds.right)
        bounds.left = z111.x;
    if (z111.y < bounds.top || bounds.top == bounds.bottom)
        bounds.top = z111.y;
    if (z111.x + z111.width > bounds.right || bounds.left == bounds.right)
        bounds.right = z111.x + z111.width;
    if (z111.y + z111.height > bounds.bottom || bounds.top == bounds.bottom)
        bounds.bottom = z111.y + z111.height;
} return { x: bounds.left, y: bounds.top, width: bounds.right - bounds.left, height: bounds.bottom - bounds.top }; }
const b2781 = [];
const d2782 = [];
function c1534(s1535, f1536) { const effects = []; for (const effect of s1535) {
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
                if (f1536 && !isNaN(spread))
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
function i2702(b1513, f1512, phantom = true) { q1539(b1513, f1512); e2703(b1513, f1512, phantom); c2704(b1513, f1512); b1513.opacity = f1512[e1405]; b1513.blendMode = f1512[f1406]; const maskType = f1512[k1407]; b1513.isMask = maskType > 0; if (b1513.isMask) {
    switch (maskType) {
        case 1:
            b1513.maskType = 'ALPHA';
            break;
        case 2:
            b1513.maskType = 'VECTOR';
            break;
        case 3:
            b1513.maskType = 'LUMINANCE';
            break;
    }
} if (b1513.isMask && b1513.fills.length == 0 && b1513.strokes.length == 0)
    b1513.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 }, opacity: 1, blendMode: 'NORMAL' }]; }
function c2704(b1513, f1512) { if (!!f1512[x1394] && !isEmpty(f1512[x1394])) {
    b1513.fills = x958(f1512[x1394]);
    if (b2781.includes(b1513))
        h945(b2781, b1513);
}
else
    b1513.fills = []; }
function e2703(b1513, f1512, phantom = true) { if (f1512[b1395] != null && !isEmpty(f1512[b1395])) {
    t1538(b1513, x958(f1512[b1395]), f1512[q1396], f1512[v1397], f1512[k1398], f1512[v1399], f1512[d1400], n2705(f1512[b1401]));
    if (f1512[f1403])
        b1513.setPluginData('dashes', f1512[b1401]);
    if (b2781.includes(b1513))
        h945(b2781, b1513);
    if (f1512[f1403])
        y951(d2782, b1513);
}
else if (isEmpty(f1512[x1394]) && isEmpty(f1512[b1395]) && !f1512[k1407] && phantom) {
    e1541(b1513);
    y951(b2781, b1513);
}
else
    b1513.strokes = []; }
function n2705(q1537) { q1537 = q1537; q1537 = y956(q1537, ','); q1537 = j957(q1537, ','); q1537 = q1537.trim(); return q1537 == '' ? [] : q1537.split(',').map(s => Math.max(0, parseFloat(s))); }
function q2706(q1537) { q1537 = q1537; q1537 = y956(q1537, ','); q1537 = j957(q1537, ','); q1537 = q1537.trim(); return q1537 == '' ? [] : q1537.split(',').map(s => Math.max(0, parseFloat(s) / s2708)); }
function t1538(b1513, fills, weight, align, join, miterLimit, cap, dashes = []) { b1513.strokes = fills; b1513.strokeWeight = Math.max(0, weight); b1513.strokeAlign = align; b1513.strokeJoin = join; const miterAngle = miterLimit / 360 * Tau; const c2783 = 1 / Math.sin(miterAngle / 2); b1513.strokeMiterLimit = Math.min(Math.max(0, c2783), 16); b1513.strokeCap = cap; b1513.dashPattern = dashes; }
function q1539(b1513, f1512) { if (!!f1512[o1402] && !isEmpty(f1512[o1402])) {
    const f1536 = f1512[f1381] == v1219 || f1512[f1381] == t1225 || f1512[f1381] == e1268;
    b1513.effects = c1534(f1512[o1402], f1536);
}
else
    b1513.effects = []; }
function j1540() { for (const z111 of b2781) {
    if (z111.removed)
        h945(b2781, z111);
    else
        e1541(z111);
} }
function e1541(z111) { figma.currentPage.loadAsync().then(() => { const back = figma.currentPage.backgrounds.find(b => b.type == 'SOLID'); let phantomColor; if (back) {
    const l = back.color.r * 0.2126 + back.color.g * 0.7152 + back.color.b * 0.0722;
    phantomColor = l > 0.5 ? { r: 0, g: 0, b: 0 } : { r: 1, g: 1, b: 1 };
}
else
    phantomColor = { r: 1, g: 0, b: 1 }; t1538(z111, [{ type: 'SOLID', color: phantomColor, opacity: 0.5 }], 1 / s2708, 'CENTER', 'MITER', 1, 'NONE', [1 / s2708, 2 / s2708]); }); }
function b1542() { for (const b1513 of d2782) {
    if (b1513.removed)
        h945(d2782, b1513);
    else
        f1543(b1513);
} }
function f1543(b1513) { b1513.strokeWeight = Math.max(0, 1.5 / s2708); if (f925(b1513.getPluginData('isCenter'))) {
    const path = b1513.vectorPaths[0];
    const parts = path.data.split(' ');
    let t = { x: parseFloat(parts[1]), y: parseFloat(parts[2]) };
    let c = { x: parseFloat(parts[4]), y: parseFloat(parts[5]) };
    let r = { x: parseFloat(parts[7]), y: parseFloat(parts[8]) };
    const a = 2;
    const b = 0.05;
    const f = 1 - Math.pow(1 - Math.min(s2708, 1), a) / Math.pow(a, b);
    t = w897(c, l899(u884(e902(t, c)), objectCenterSize / f));
    r = w897(c, l899(u884(e902(r, c)), objectCenterSize / f));
    parts[1] = t.x;
    parts[2] = t.y;
    parts[4] = c.x;
    parts[5] = c.y;
    parts[7] = r.x;
    parts[8] = r.y;
    const k2784 = { windingRule: path.windingRule, data: parts.join(' ') };
    b1513.vectorPaths = [k2784];
} const dashes = b1513.getPluginData('dashes'); if (dashes != '')
    b1513.dashPattern = q2706(dashes); }
function r1577(nodeId, px, py) { figma.getLocalPaintStylesAsync().then(_styles => { const styles = new Array(); for (const u168 of _styles) {
    const _nodeId = u168.getPluginData('nodeId');
    const _existing = u168.getPluginData('existing');
    const existing = !!_existing;
    const style = { id: u168.id, nodeId: _nodeId, name: u168.name, existing: existing, paints: new Array() };
    let onlyPaint = true;
    for (const a2786 of u168.paints) {
        if (a2786.type == 'SOLID') {
            style.paints.push([a2786.color.r, a2786.color.g, a2786.color.b, a2786.opacity]);
        }
        else {
            onlyPaint = false;
            break;
        }
    }
    if (onlyPaint)
        styles.push(style);
} h1526({ cmd: 'uiReturnFigGetAllLocalColorStyles', nodeId: nodeId, px: px, py: py, styles: JSON.stringify(styles) }); }); }
function q1578(nodeId, styleId) { figma.getLocalPaintStylesAsync().then(n1580 => { if (styleId != NULL)
    k1579(n1580, nodeId, styleId);
else
    z1581(n1580, nodeId); }); }
function k1579(n1580, nodeId, styleId, clearExisting = true) { const y2785 = l2731.find(a => a.nodeId == nodeId); if (y2785 && clearExisting)
    z1581(n1580, nodeId); const f1585 = n1580.find(s => s.id == styleId); d954(!!f1585, 'figStyle should be found here'); f1585.setPluginData('type', c1216); f1585.setPluginData('nodeId', nodeId); f1585.setPluginData('existing', n939(true)); l2731.push({ nodeId: nodeId, existing: true, styles: [f1585] }); return f1585; }
function z1581(n1580, nodeId) { const f1585 = n1580.find(s => s.getPluginData('nodeId') == nodeId); d954(!!f1585, 'figStyle should be found here'); if (f1585) {
    f1585.setPluginData('type', NULL);
    f1585.setPluginData('nodeId', NULL);
    f1585.setPluginData('existing', NULL);
    t947(l2731, a => a.nodeId == nodeId);
} return f1585; }
function n1582(styles, l1586) { const f1585 = figma.createPaintStyle(); f1585.setPluginData('type', l1586[f1381]); f1585.setPluginData('nodeId', l1586[a1382]); f1585.name = l1586[h1386]; setStylePaints(f1585, l1586); styles.push(f1585); h1526({ cmd: 'uiSetStyleId', nodeId: l1586[a1382], styleId: f1585.id }); return f1585; }
function j1583(msg) { let i2763 = NULL; let y2785; for (const l1586 of msg.styles) {
    if (l1586[a1382] != i2763) {
        i2763 = l1586[a1382];
        y2785 = l2731.find(a => a.nodeId == l1586[a1382]);
        if (!y2785) {
            y2785 = { nodeId: l1586[a1382], styles: [] };
            l2731.push(y2785);
        }
    }
    else
        y2785 = null;
    const f1585 = y2785.styles[0];
    figma.getLocalPaintStylesAsync().then(n1580 => { const localStyle = n1580.find(s => s.getPluginData('nodeId') == l1586[a1382]); if (isValid(f1585) && !isValid(localStyle)) {
        s940(y2785.styles, f1585);
    } const existing = isValid(f1585) && isValid(localStyle) && f1585.getPluginData('existing'); if (!isValid(f1585) || !isValid(localStyle)) {
        if (!existing) {
            h1516 = true;
            q1578(l1586[a1382], l1586[d1384]);
        }
    }
    else if (isValid(f1585) && f1585.getPluginData('type') == l1586[f1381]) {
        h1516 = true;
        f1584(localStyle, l1586);
    } });
} }
function f1584(f1585, l1586) { setStylePaints(f1585, l1586); f1585.name = l1586[h1386]; }
function getStylePaints(stylePaints) { const paints = new Array(); for (const a2786 of stylePaints) {
    const fill = a2786[1].split(' ');
    switch (a2786[0]) {
        case 'SOLID':
            paints.push({ type: 'SOLID', color: { r: Math.min(Math.max(0, parseFloat(fill[0]) / 0xff), 1), g: Math.min(Math.max(0, parseFloat(fill[1]) / 0xff), 1), b: Math.min(Math.max(0, parseFloat(fill[2]) / 0xff), 1) }, opacity: Math.min(Math.max(0, parseFloat(fill[3]) / 100), 1) });
            break;
    }
} return paints; }
function setStylePaints(f1585, l1586) { if (!isEmpty(l1586[p1388]))
    f1585.paints = getStylePaints(l1586[p1388]);
else
    f1585.paints = []; }
function v1600(nodeId, px, py) {
    return __awaiter(this, void 0, void 0, function* () { figma.variables.getLocalVariablesAsync().then((l2787) => __awaiter(this, void 0, void 0, function* () { const variables = new Array(); for (const _var of l2787) {
        const collection = yield figma.variables.getVariableCollectionByIdAsync(_var.variableCollectionId);
        const variable = { id: _var.id, resolvedType: _var.resolvedType, name: _var.name, collectionName: collection.name };
        variables.push(variable);
    } figma.variables.getLocalVariableCollectionsAsync().then((collections) => __awaiter(this, void 0, void 0, function* () { h1526({ cmd: 'uiReturnFigGetAllLocalVariables', nodeId: nodeId, px: px, py: py, variables: JSON.stringify(variables), nCollections: collections.length }); })); })); });
}
function e1601(varIds) {
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
function j1602(nodeId, varId) { figma.variables.getLocalVariablesAsync().then(l2787 => { figLinkVariableAsync(l2787, nodeId, varId); }); }
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
        return null; const [resolvedVar, values] = yield figGetResolvedVariableValuesAsync(variable); h1526({ cmd: 'uiReturnFigLinkNodeToVariable', nodeId: nodeId, variableId: resolvedVar ? resolvedVar.id : NULL, variableName: resolvedVar ? resolvedVar.name : '', resolvedType: resolvedVar ? resolvedVar.resolvedType : NULL, values: values }); return resolvedVar; });
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
function k1587(tl, tr, bl) { let vr = point(tr.x - tl.x, tr.y - tl.y); let vb = point(bl.x - tl.x, bl.y - tl.y); let sx = vr.x; let sy = vb.y; let kx = -vr.y; let ky = -vb.x; let dx = -tl.x; let dy = -tl.y; const _sx = kx / nozero(sx); const _sy = ky / nozero(sy); let z4211 = w887([[1, _sy, 0], [_sx, 1, 0], [0, 0, 1]], t891(dx, dy)); z4211 = f889(z4211); const a = f881(vr); if (a > Tau / 4 && a < Tau * 3 / 4)
    z4211 = w887(z4211, t891(0, 0, 1, 1, Tau / 2)); if (determinant(z4211) < 0)
    z4211 = w887(z4211, t891(0, 0, -1, 1, 0)); return z4211; }
function x1588(b1513, tl, tr, bl) { const z4211 = k1587(tl, tr, bl); b1513.relativeTransform = [z4211[0], z4211[1]]; }
function l1589(b1513, f1512, setSize = true, noHeight = 0.01) { if (!f1512[d1390] || !f1512[p1391] || !f1512[c1392])
    return; const xp0 = f1512[d1390]; const xp1 = f1512[p1391]; const xp2 = f1512[c1392]; x1588(b1513, xp0, xp1, xp2); if (setSize) {
    const n892 = distv(xp0, xp1);
    const h893 = distv(xp0, xp2);
    const height = f1512[f1381] == l1243 ? f1512[n1425] : f1512[v1412];
    if (!b1513.removed) {
        b1513.resizeWithoutConstraints(Math.max(0.01, n892), height ? Math.max(0.01, h893) : noHeight);
    }
} }
function n1590(m2700, f2701) { if (m2700.removed)
    return; m2700.resizeWithoutConstraints(0.01, 0.01); m2700.setPluginData('actualX', f2701[s1408].toString()); m2700.setPluginData('actualY', f2701[a1410].toString()); m2700.x = f2701[s1408]; m2700.y = f2701[a1410]; m2700.rotation = f2701[o1404] ? 45 : 0; }
function i1591(m2700) { if (!m2700.removed)
    m2700.resizeWithoutConstraints(0.01, 0.01); }
function e2778(genBool) { return genBool.children.length > 0; }
function t2749(genBool) {
    return __awaiter(this, void 0, void 0, function* () { let objects = []; for (const z111 of genBool.children)
        yield g1528(z111, o => objects = [...objects, o]); yield figma.currentPage.loadAsync(); let figBool = null; if (!isEmpty(objects)) {
        switch (genBool.operation) {
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
        l1589(figBool, genBool);
        if (!e2778(genBool))
            return figBool;
    } return figBool; });
}
function f2755(figBool, genBool, isValid = false) { if (!isValid && !e2778(genBool)) {
    figBool.remove();
    return;
} l1589(figBool, genBool); f2732(figBool, genBool.children, genBool.children.length); }
function a2775(r2766) { return r2766[s1408] != null && !isNaN(r2766[s1408]) && r2766[a1410] != null && !isNaN(r2766[a1410]) && r2766[v1411] != null && !isNaN(r2766[v1411]) && r2766[v1412] != null && !isNaN(r2766[v1412]) && r2766[g1414] != null && !isNaN(r2766[g1414]) && r2766[l1421] != null && !isNaN(r2766[l1421]) && r2766[n1427] != null && !isNaN(r2766[n1427]) && r2766[d1431] != null && !isNaN(r2766[d1431]); }
function b2788(r2766) { if (!a2775(r2766))
    return null; const o2767 = figma.createEllipse(); f2789(o2767, r2766, true); return o2767; }
function f2789(o2767, r2766, isValid = false) { if (!isValid && !a2775(r2766))
    return; c2790(o2767, r2766); if (r2765.includes(o2767))
    n2697(o2767);
else
    i2702(o2767, r2766); }
function c2790(o2767, r2766) { o2767.cornerRadius = r2766[g1414]; const start = r2766[l1421] / 360 * (Math.PI * 2); const sweep = r2766[n1427] / 100 * (Math.PI * 2); o2767.arcData = { startingAngle: start, endingAngle: start + sweep, innerRadius: Math.min(Math.max(0, r2766[d1431] / 100), 1) }; l1589(o2767, r2766); }
function k2780(m2768) { return m2768[s1408] != null && !isNaN(m2768[s1408]) && m2768[a1410] != null && !isNaN(m2768[a1410]) && m2768[v1411] != null && !isNaN(m2768[v1411]) && m2768[v1412] != null && !isNaN(m2768[v1412]) && m2768[n1420] != null && !isNaN(m2768[n1420]); }
function o2751(m2768) {
    return __awaiter(this, void 0, void 0, function* () { if (!k2780(m2768))
        return null; const m2769 = figma.createFrame(); if (m2769) {
        a2791(m2769, m2768);
        let objects = [];
        for (const z111 of m2768[v1426])
            yield g1528(z111, o => objects = [...objects, o]);
        for (const z111 of objects)
            m2769.appendChild(z111);
    } return m2769; });
}
function j2757(m2769, m2768) { a2791(m2769, m2768); f2732(m2769, m2768[v1426], m2768[v1426].length); }
function a2791(m2769, m2768) { m2769.cornerRadius = m2768[n1420]; l1589(m2769, m2768); i2702(m2769, m2768, m2768[v1426].length == 0); }
function n2779(i2770) { return true; }
function z2750(i2770) {
    return __awaiter(this, void 0, void 0, function* () { let objects = []; for (const z111 of i2770[v1409])
        yield g1528(z111, o => objects = [...objects, o]); yield figma.currentPage.loadAsync(); const d2771 = !isEmpty(objects) ? figma.group(objects, figma.currentPage) : null; if (d2771)
        c2756(d2771, i2770); return d2771; });
}
function c2756(d2771, i2770) { if (i2770[v1409].length == 0) {
    d2771.remove();
    return;
} f2732(d2771, i2770[v1409], i2770[v1409].length); q1539(d2771, i2770); }
function g2774(z2772) { return z2772[s1408] != null && !isNaN(z2772[s1408]) && z2772[a1410] != null && !isNaN(z2772[a1410]) && z2772[v1411] != null && !isNaN(z2772[v1411]); }
function d2792(z2772) { if (!g2774(z2772))
    return null; const l2773 = figma.createLine(); w2793(l2773, z2772, true); return l2773; }
function w2793(l2773, z2772, isValid = false) { if (!isValid && !g2774(z2772))
    return; l1589(l2773, z2772, true, 0); i2702(l2773, z2772); }
var r2765 = [];
function p4029(f2701) { return f2701[s1408] != null && !isNaN(f2701[s1408]) && f2701[a1410] != null && !isNaN(f2701[a1410]); }
function n2695(f2701) { const m2700 = f2701[o1404] ? figma.createRectangle() : figma.createEllipse(); if (!p4029(f2701))
    return m2700; if (r2765.includes(m2700))
    w2699(m2700, f2701);
else
    k2752(m2700, f2701); return m2700; }
function k2752(m2700, f2701) { n1590(m2700, f2701); g2698(m2700); }
function b2696() { h1526({ cmd: 'uiUpdateZoom', zoom: figma.viewport.zoom }); for (const point of r2765)
    n2697(point); }
function n2697(m2700) { i1591(m2700); g2698(m2700); }
function w2699(m2700, f2701) { n1590(m2700, f2701); g2698(m2700); }
function g2698(m2700) { if (m2700.removed)
    return; figma.currentPage.loadAsync().then(() => { const x3740 = f925(m2700.getPluginData('isCenter')); const e2707 = figma.currentPage.selection.includes(m2700); const color = x3740 ? [0xf2, 0x48, 0x22] : e2707 ? [12, 140, 233] : [255, 255, 255]; const border = x3740 ? [255, 255, 255] : e2707 ? [255, 255, 255] : [12, 140, 233]; m2700.fills = x958([['SOLID', color[0], color[1], color[2], 100]]); const effects = []; effects.push(...c1534([['DROP_SHADOW', border[0] / 255, border[1] / 255, border[2] / 255, 1, 0, 0, 0, (x3740 ? 3 : e2707 ? 5 : 3.6) / s2708, 'NORMAL', true, true]], true)); effects.push(...c1534([['DROP_SHADOW', color[0] / 255, color[1] / 255, color[2] / 255, 1, 0, 0, 0, (e2707 ? 4 : 2.4) / s2708, 'NORMAL', true, true]], true)); m2700.effects = effects; }); }
function b4030(genPoly) { return genPoly[s1408] != null && !isNaN(genPoly[s1408]) && genPoly[a1410] != null && !isNaN(genPoly[a1410]) && genPoly[v1411] != null && !isNaN(genPoly[v1411]) && genPoly[v1412] != null && !isNaN(genPoly[v1412]) && genPoly[m1417] != null && !isNaN(genPoly[m1417]) && genPoly[m1423] != null && !isNaN(genPoly[m1423]); }
function z2709(genPoly) { if (!b4030(genPoly))
    return null; const figPoly = figma.createPolygon(); c2710(figPoly, genPoly, true); return figPoly; }
function c2710(figPoly, genPoly, isValid = false) { if (!isValid && !b4030(genPoly))
    return; figPoly.cornerRadius = genPoly[m1417]; figPoly.pointCount = Math.max(3, genPoly[m1423]); l1589(figPoly, genPoly); i2702(figPoly, genPoly); }
function z2712(w2711) { return w2711[s1408] != null && !isNaN(w2711[s1408]) && w2711[a1410] != null && !isNaN(w2711[a1410]) && w2711[v1411] != null && !isNaN(w2711[v1411]) && w2711[v1412] != null && !isNaN(w2711[v1412]) && w2711[x1413] != null && !isNaN(w2711[x1413]); }
function x2713(w2711) { if (!z2712(w2711))
    return null; const figRect = figma.createRectangle(); s2714(figRect, w2711, true); return figRect; }
function s2714(figRect, w2711, isValid = false) { if (!isValid && !z2712(w2711))
    return; const found = w2711[o1402].findIndex(e => e[0] == 'ROUND_CORNERS'); if (found > -1) {
    const corners = w2711[o1402][found];
    figRect.topLeftRadius = corners[1];
    figRect.topRightRadius = corners[2];
    figRect.bottomLeftRadius = corners[3];
    figRect.bottomRightRadius = corners[4];
}
else
    figRect.cornerRadius = w2711[x1413]; l1589(figRect, w2711); i2702(figRect, w2711); }
function t2715(m2725) { return m2725[s1408] != null && !isNaN(m2725[s1408]) && m2725[a1410] != null && !isNaN(m2725[a1410]) && m2725[v1411] != null && !isNaN(m2725[v1411]) && m2725[v1412] != null && !isNaN(m2725[v1412]) && m2725[w1418] != null && !isNaN(m2725[w1418]) && m2725[t1424] != null && !isNaN(m2725[t1424]) && m2725[f1429] != null && !isNaN(m2725[f1429]); }
function n2716(m2725) { if (!t2715(m2725))
    return null; const j2726 = figma.createStar(); m2717(j2726, m2725, true); return j2726; }
function m2717(j2726, m2725, isValid = false) { if (!isValid && !t2715(m2725))
    return; j2726.cornerRadius = m2725[w1418]; j2726.pointCount = m2725[t1424]; j2726.innerRadius = Math.min(Math.max(0, m2725[f1429] / 100), 1); l1589(j2726, m2725); i2702(j2726, m2725); }
const m4272 = [];
function c2718(c2722) { return c2722[i1430] != null && c2722[s1408] != null && !isNaN(c2722[s1408]) && c2722[a1410] != null && !isNaN(c2722[a1410]) && c2722[v1411] != null && !isNaN(c2722[v1411]) && c2722[v1412] != null && !isNaN(c2722[v1412]) && c2722[u1432] != null && c2722[u1432] != NULL && c2722[c1433] != null && !isNaN(c2722[c1433]); }
function l2719(c2722) { if (!c2718(c2722))
    return null; const n2794 = figma.createText(); n2720(n2794, c2722, true); return n2794; }
function n2720(n2794, c2722, isValid = false) { if (!isValid && !c2718(c2722))
    return null; const fontName = { family: c2722[u1432], style: c2722[b1434] }; try {
    if (!m4272.includes(fontName)) {
        figma.loadFontAsync(fontName).then(() => { m4272.push(fontName); g2721(n2794, c2722, fontName); });
    }
    else {
        g2721(n2794, c2722, fontName);
    }
}
catch (e) {
    x955(e);
} }
function g2721(n2794, c2722, fontName) { n2794.fontName = fontName; n2794.fontSize = Math.max(1, c2722[c1433]); n2794.characters = c2722[i1430]; n2794.lineHeight = { unit: 'PERCENT', value: c2722[u1437] }; n2794.letterSpacing = { unit: 'PERCENT', value: c2722[c1438] }; if (c2722[x1435] == 0)
    n2794.textAlignHorizontal = 'LEFT';
else if (c2722[x1435] == 1)
    n2794.textAlignHorizontal = 'CENTER';
else if (c2722[x1435] == 2)
    n2794.textAlignHorizontal = 'RIGHT';
else if (c2722[x1435] == 3)
    n2794.textAlignHorizontal = 'JUSTIFIED'; if (c2722[r1436] == 0)
    n2794.textAlignVertical = 'TOP';
else if (c2722[r1436] == 1)
    n2794.textAlignVertical = 'CENTER';
else if (c2722[r1436] == 2)
    n2794.textAlignVertical = 'BOTTOM'; l1589(n2794, c2722); i2702(n2794, c2722); if (c2722[z1419] == 0 && c2722[n1425] == 0)
    n2794.textAutoResize = 'WIDTH_AND_HEIGHT';
else if (c2722[z1419] == 0)
    n2794.textAutoResize = 'HEIGHT';
else
    n2794.textAutoResize = 'NONE'; }
function o2777(f2727) { return true; }
function c2748(f2727) { if (!o2777(f2727))
    return null; const w2728 = figma.createVector(); j2754(w2728, f2727, true); return w2728; }
function j2754(w2728, f2727, isValid = false) { if (!isValid && !o2777(f2727))
    return; w2728.setVectorNetworkAsync(f2727[e1415]); l1589(w2728, f2727, false); i2702(w2728, f2727); }
function v2776(z2723) { return z2723[h1422] != null && !isNaN(z2723[h1422]) && z2723[r1428] != null && !isNaN(z2723[r1428]); }
function i2747(z2723) { const y2724 = figma.createVector(); u2753(y2724, z2723, true); return y2724; }
function u2753(y2724, z2723, isValid = false) { if (!isValid && !v2776(z2723))
    return; y2724.vectorPaths = [{ windingRule: z2723[h1422] == 1 ? 'NONZERO' : 'EVENODD', data: z2723[l1416] }]; y2724.cornerRadius = z2723[r1428]; l1589(y2724, z2723, false); i2702(y2724, z2723); }
