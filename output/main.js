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
function w1052(key, tag) { return key.substring(tag.length + 1); }
function v1053(key) { return i1051(key, n875); }
function v1054(key) { return i1051(key, k873); }
function b1055(key) { return i1051(key, f874); }
function u1056(key) { return w1052(key, n875); }
function w1057(key) { return w1052(key, k873); }
function k1058(key) { return w1052(key, f874); }
const generatorVersion = 407;
const d867 = 2147483647;
const NULL = '';
const k868 = '  ';
const b869 = '    ';
const u870 = '\n';
const k871 = '◦ G •';
const z872 = k871 + ' ';
const k873 = 'G_NODE';
const f874 = 'G_CONN';
const n875 = 'G_PAGE';
const e876 = 'G_TEMP';
const minWindowWidth = 602;
const minWindowHeight = 39;
const identity = Object.freeze([[1, 0, 0], [0, 1, 0], [0, 0, 1]]);
const Epsilon = 0.0000001;
const Tau = Math.PI * 2;
var q2540 = false;
function u877(x, eps = 0.000000001) { return Math.abs(x) < eps ? 0 : x; }
function nozero(x, eps = 0.000000001) { return x != 0 ? x : (x < 0 ? -eps : eps); }
function p878(v, eps = 0.000000001) { return point(nozero(v.x, eps), nozero(v.y, eps)); }
function equal(a, b, eps = 0.000000001) { return Math.abs(b - a) < eps; }
function sqr(x) { return x * x; }
;
function cube(x) { return x * x * x; }
;
function c879(f) { return Math.floor(f) | 0; }
function s880(x) { x = c879(x); x--; x |= x >> 1; x |= x >> 2; x |= x >> 4; x |= x >> 8; x |= x >> 16; x |= x >> 32; return ++x; }
function gcd(a, b) { let temp; while (1) {
    temp = a % b;
    if (temp == 0)
        return b;
    a = b;
    b = temp;
} }
function distv(p1, p2) { const dx = p2.x - p1.x; const dy = p2.y - p1.y; return Math.sqrt(dx * dx + dy * dy); }
function j881(v) { let angle = Math.atan2(v.y, v.x); if (angle < 0)
    angle += Tau; return angle; }
function anglev2(v1, v2) { return anglev2_(v1.x, v1.y, v2.x, v2.y); }
function anglev2_(x1, y1, x2, y2) { const dx = x2 - x1; const dy = y2 - y1; let angle = Math.atan2(dy, dx); if (angle < 0)
    angle += Tau; return angle; }
function r883(v) { return Math.sqrt(v.x * v.x + v.y * v.y); }
function lengthv_(x, y) { return Math.sqrt(x * x + y * y); }
function y884(v) { return point(v.x == 0 ? 0 : v.x / r883(v), v.y == 0 ? 0 : v.y / r883(v)); }
function dotv(v1, v2) { return v1.x * v2.x + v1.y * v2.y; }
function r885(a1, a2) { let diff = a2 - a1; while (diff <= -Tau / 2)
    diff += Tau; while (diff > Tau / 2)
    diff -= Tau; return diff; }
function x886(v, m) { let v3 = [v.x, v.y, 1]; let r = f950(v3, m); return point(r[0], r[1]); }
function e887(...mm) { d954(mm.length > 0, 'mulm3m3() must take at least one argument'); let result = clone(mm[0]); for (let a = 1; a < mm.length; a++) {
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
function a888(m, s) { for (let i = 0; i < 3; i++)
    for (let j = 0; j < 3; j++)
        m[i][j] /= s; return m; }
function adjugate(m) { return cofactor(transpose(m)); }
function transpose(m) { return [[m[0][0], m[1][0], m[2][0]], [m[0][1], m[1][1], m[2][1]], [m[0][2], m[1][2], m[2][2]]]; }
function cofactor(m) { return [[m[1][1] * m[2][2] - m[2][1] * m[1][2], -(m[1][0] * m[2][2] - m[2][0] * m[1][2]), m[1][0] * m[2][1] - m[2][0] * m[1][1]], [-(m[0][1] * m[2][2] - m[2][1] * m[0][2]), m[0][0] * m[2][2] - m[2][0] * m[0][2], -(m[0][0] * m[2][1] - m[2][0] * m[0][1])], [m[0][1] * m[1][2] - m[1][1] * m[0][2], -(m[0][0] * m[1][2] - m[1][0] * m[0][2]), m[0][0] * m[1][1] - m[1][0] * m[0][1]]]; }
function determinant(m) { return m[0][0] * (m[1][1] * m[2][2] - m[1][2] * m[2][1]) - m[0][1] * (m[1][0] * m[2][2] - m[2][0] * m[1][2]) + m[0][2] * (m[1][0] * m[2][1] - m[2][0] * m[1][1]); }
function o889(m) { return a888(adjugate(m), determinant(m)); }
function u890(angle) { const cosA = u877(Math.cos(angle)); const sinA = u877(Math.sin(angle)); return [[cosA, sinA, 0], [-sinA, cosA, 0], [0, 0, 1]]; }
function b891(x = 0, y = 0, s892 = 1, m893 = 1, angle = 0, k894 = 0, u895 = 0) { const cosA = Math.cos(angle); const sinA = Math.sin(angle); return [[s892 * cosA - u895 * sinA, -k894 * cosA + m893 * sinA, x], [u895 * cosA + s892 * sinA, m893 * cosA + k894 * sinA, y], [0, 0, 1]]; }
function e896(v1, v2) { return v1.x * v2.y - v1.y * v2.x; }
function d897(v1, v2) { return point(v1.x + v2.x, v1.y + v2.y); }
function sqrv(v) { return s898(v, v); }
function s898(v1, v2) { return point(v1.x * v2.x, v1.y * v2.y); }
function f899(v, s) { return point(v.x * s, v.y * s); }
function y900(v1, v2) { return point(v1.x / v2.x, v1.y / v2.y); }
function a901(v, s) { return point(v.x / s, v.y / s); }
function m902(v1, v2) { return point(v1.x - v2.x, v1.y - v2.y); }
function f903(str) { return decodeURI(encodeURIComponent(str)); }
function z904(str) { return decodeURIComponent(encodeURI(str)); }
function u905(bytes) { let str = ''; for (let i = 0; i < bytes.length; i++)
    str += String.fromCharCode(bytes[i]); return str; }
function f906(str) { return Array.from(z904(str), c => c.charCodeAt(0)); }
function j907(array, size) { const newArray = new Uint8Array(size); u908(array, newArray); return newArray; }
function u908(src, dst) { g909(src, 0, src.length, dst, 0, dst.length); }
function g909(src, d910, w911, dst, c912, h913) { const size = Math.min(w911, h913); for (let i = 0; i < size; i++)
    dst[c912 + i] = src[d910 + i]; }
function k914(y915, p916) { if (y915.length != p916.length)
    return false; for (let i = 0; i < y915.length; i++) {
    if (y915[i] != p916[i])
        return false;
} return true; }
function s917(r918, k919) { return r918.findIndex(i => k919.includes(i)) > -1; }
function b920(list) { return list ? '<==' : '<--'; }
;
function n921(list) { return list ? '==>' : '-->'; }
;
function c922(nodeId) { return k873 + ' ' + nodeId; }
function v923(name) { return f874 + ' ' + name; }
function h924(name) { return n875 + ' ' + name; }
function s925(str) { return str.toLowerCase() == 'true' || str == '1'; }
function s926(n927, z928 = false) { return k933(n927.outputNodeId, n927.outputId, n927.outputOrder, n927.inputNodeId, n927.inputId, n927.list, z928); }
function k929(outputNodeId, outputId, outputOrder, inputNodeId, inputId) { return v923(outputNodeId + ' ' + outputId + ' ' + outputOrder + ' ' + inputNodeId + ' ' + inputId); }
function i930(m243) { return k929(m243.outputNodeId, m243.outputId, m243.outputOrder, m243.inputNodeId, m243.inputId); }
function b931(m243) { return k929(m243.output.node.id, m243.output.id, m243.outputOrder, m243.input.node.id, m243.input.id); }
function b932(m243, z928 = false) { return k933(m243.output.node.id, m243.output.id, m243.outputOrder, m243.input.node.id, m243.input.id, m243.list, z928); }
function k933(outputNodeId, outputId, outputOrder, inputNodeId, inputId, list, z928 = false) { const sp = z928 ? ' ' : '  '; const jsp = z928 ? '' : ' '; const arrow = sp + t937(typeof outputOrder == 'string' ? parseInt(outputOrder) : outputOrder) + n921(typeof list == 'string' ? s925(list) : list) + sp; const join = jsp + '.' + jsp; return outputNodeId + join + outputId + arrow + inputNodeId + join + inputId; }
function d934(pageId) { return h924(pageId); }
function r935(num) { const str = num.toString(); let sup = ''; for (const c of str)
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
function t937(num) { const str = num.toString(); let sup = ''; for (const c of str)
    sup += s938(c); return sup; }
function s938(c) { switch (c) {
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
function e939(bool) { return bool ? 'true' : 'false'; }
function isValid(val) { return val != undefined && val != null; }
function isEmpty(array) { return array.length == 0; }
function m940(array, item) { o941(array, array.indexOf(item)); }
function o941(array, index) { if (index > -1 && index < array.length)
    array.splice(index, 1); }
function k942(array) { if (isEmpty(array))
    return null; let last = array.at(-1); array.splice(array.length - 1, 1); return last; }
function t943(array) { return array[array.length - 1]; }
function k944(array, from, to) { const item = array[from]; array.splice(from, 1); array.splice(to, 0, item); }
function x945(array, item) { const index = array.indexOf(item); if (index > -1)
    array.splice(index, 1); }
function y946(p2796, array) { for (const item of array) {
    const index = p2796.indexOf(item);
    if (index > -1)
        p2796.splice(index, 1);
} }
function k947(array, where) { const index = array.findIndex(where); if (index > -1)
    array.splice(index, 1); }
function b948(styleId) { return styleId.split(',')[0] + ','; }
function l949(points) { let w4035 = ''; if (points.length < 2)
    return w4035; w4035 += 'M'; w4035 += ' ' + u877(points[0].x); w4035 += ' ' + u877(points[0].y); for (let i = 1; i < points.length; i++) {
    w4035 += ' L' + ' ' + u877(points[i].x) + ' ' + u877(points[i].y);
} return w4035; }
function point(x, y) { return { x: x, y: y }; }
function f950(v, m) { let r = [0, 0, 0]; for (let i = 0; i < 3; i++)
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
        let y111 = {};
        for (const key in val)
            y111[key] = clone(val[key]);
        return y111;
    }
} throw 'unknown'; }
function l951(array, item, equal = null) { if (equal) {
    if (Array.isArray(item))
        item.forEach(i => l951(array, i, equal));
    else if (!array.find(i => equal(i, item)))
        array.push(item);
}
else {
    if (Array.isArray(item))
        item.forEach(i => l951(array, i));
    else if (!array.includes(item))
        array.push(item);
} }
function l952(array, item, equal) { if (Array.isArray(item))
    item.forEach(i => l952(array, i, equal));
else if (!array.find(equal))
    array.push(item); }
function h953(array, item, except) { if (Array.isArray(item))
    item.forEach(i => h953(array, i, except));
else if (!array.find(except))
    array.push(item); }
function d954(...args) { if (q2540) {
    console.assert(...args);
} }
function l955(...args) { if (q2540)
    console.error(...args); }
function x956(str, trim) { while (str.length >= trim.length && str.substring(0, trim.length) == trim)
    str = str.substring(trim.length); return str; }
function q957(str, trim) { while (str.length >= trim.length && str.substring(str.length - trim.length) == trim)
    str = str.substring(0, str.length - trim.length); return str; }
function y958(a4095) { const fills = []; for (const fill of a4095) {
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
            const i4211 = fill[1];
            const stops = [];
            for (const stop of fill[2]) {
                stops.push({ color: { r: Math.min(Math.max(0, stop[0]), 1), g: Math.min(Math.max(0, stop[1]), 1), b: Math.min(Math.max(0, stop[2]), 1), a: Math.min(Math.max(0, stop[3]), 1) }, position: stop[4] });
            }
            fills.push({ type: fill[0], gradientTransform: i4211, gradientStops: stops, blendMode: fill[3] });
            break;
        }
    }
} return fills; }
function h959(type) { return s1092.includes(type); }
const p1059 = 'LIST#';
const h1060 = 'NLIST#';
const v1061 = 'TLIST#';
const l1062 = 'SLIST#';
const e1063 = 'NULL';
const f1064 = 'VAR';
const g1065 = 'VARGRP';
const c1066 = 'FEEDBK';
const c1067 = 'REPT';
const h1068 = 'CACHE';
const a1069 = 'FRZ';
const t1070 = 'TIMER';
const c1071 = 'VNAME';
const GET_LIST_VALUE_NAMES = 'GVNAMES';
const LIST_VALUE_NAMES = 'VNAMES';
const OBJECT_NAME = 'ONAME';
const s1072 = 'CMB';
const h1073 = 'LSASIT';
const p1074 = 'EXTR';
const u1075 = 'SETP';
const q1076 = 'GETP';
const u1077 = 'SUBLST';
const a1078 = 'UNIQ';
const REORDER_LIST = 'RORD';
const SHIFT_LIST = 'SHFTLST';
const t1079 = 'REVLST';
const BUCKLE_LIST = 'BUKLST';
const t1080 = 'SORT';
const v1081 = 'CLMN';
const s1082 = 'CELL';
const d1083 = 'LIST';
const p1084 = 'COUNT';
const OBJECT_COUNT = 'OBJCOUNT';
const b1085 = 'LCONT';
const f1086 = 'SELECT';
const SELECT_FROM_LIST = 'LSTSEL';
const q1087 = 'IF';
const h1088 = 'LSTFLT';
const s1090 = 'ANY#';
const d1091 = [p1059, h1060, v1061, l1062, s1072, p1074, u1075, q1076, u1077, d1083, p1084, b1085, c1067];
const s1092 = [p1059, h1060, v1061, l1062];
const f1089 = 'ITER';
const a1111 = 'PROB';
const HOLD = 'HOLD';
const p1094 = 'NUM#';
const p1095 = 'NUM';
const NUMBER_PRECISION = 'NPREC';
const g1096 = 'NSIGN';
const g1097 = 'ABS';
const NUMBER_NEGATIVE = 'NEG';
const l1098 = 'ROUND';
const NUMBER_QUANTIZE = 'QUANT';
const d1099 = 'SMINMAX';
const c1100 = 'MINMAX';
const y1101 = 'LIM';
const y1102 = 'NCURVE';
const NUMBER_MAP = 'NMAP';
const NUMBER_BIAS = 'NBIAS';
const x1103 = 'NANISNUM';
const o1104 = 'CONST';
const m1105 = 'DATE';
const p1106 = 'SEQ';
const p1107 = 'RANGE';
const g1108 = 'WAVE';
const b1109 = 'RAND';
const l1110 = 'NOISE';
const w1112 = 'ACCUM';
const r1113 = 'LERP';
const v1114 = 'SOLVE';
const l1115 = 'NANIM';
const d1116 = 'SMATH';
const i1117 = 'MATH';
const p1118 = 'ADD';
const e1119 = 'SUB';
const a1120 = 'MUL';
const l1121 = 'DIV';
const v1122 = 'MOD';
const c1123 = 'EXP';
const i1124 = 'NBOOL';
const q1125 = 'NOT';
const j1126 = 'AND';
const e1127 = 'OR';
const r1128 = 'XOR';
const z1129 = 'COND';
const n1130 = 'EQ';
const k1131 = 'NE';
const i1132 = 'LT';
const w1133 = 'LE';
const q1134 = 'GT';
const u1135 = 'GE';
const w1136 = 'TRIG';
const v1137 = 'SIN';
const o1138 = 'COS';
const c1139 = 'TAN';
const l1140 = 'ATAN2';
const q1141 = 'CNVANG';
const o1093 = [e1063, f1064, g1065, ...d1091, h1073, p1074, u1075, q1076, u1077, a1078, REORDER_LIST, SHIFT_LIST, t1079, BUCKLE_LIST, v1081, t1080, s1082, d1083, f1086, SELECT_FROM_LIST, q1087, h1088, c1066, c1067, f1089, a1111, HOLD, h1068, a1069, t1070, c1071, GET_LIST_VALUE_NAMES, LIST_VALUE_NAMES, OBJECT_NAME];
const k1142 = [i1117, d1116, p1118, e1119, a1120, l1121, v1122, c1123];
const f1143 = [i1124, q1125, j1126, e1127, r1128];
const t1144 = [z1129, n1130, k1131, i1132, w1133, q1134, u1135];
const r1145 = [w1136, v1137, o1138, c1139, l1140];
const h1146 = 'TEXT#';
const b1147 = 'TEXT';
const s1148 = 'TLEN';
const e1149 = 'TTRIM';
const m1150 = 'TSUB';
const y1151 = 'TCONT';
const q1152 = 'TCASE';
const g1153 = 'TREPL';
const d1154 = 'TJOIN';
const r1155 = 'TPAD';
const d1156 = 'TCMP';
const w1157 = 'TCHAR';
const p1158 = 'TUNI';
const y1159 = 'INDEX';
const c1160 = 'N2T';
const l1161 = 'C2T';
const y1162 = 'T2N';
const g1163 = 'T2C';
const o1164 = 'TSPLT';
const f3505 = 'TJSON';
const r1166 = 'TCSV';
const z1167 = 'FETCH';
const a1168 = 'TFILE';
const b1169 = [p1094, h1060, p1095, NUMBER_PRECISION, g1096, g1097, NUMBER_NEGATIVE, l1098, NUMBER_QUANTIZE, d1099, c1100, y1101, y1102, NUMBER_MAP, NUMBER_BIAS, x1103, o1104, m1105, p1106, p1107, g1108, b1109, l1110, w1112, r1113, v1114, l1115, c1160, w1157, ...k1142, ...f1143, ...t1144, ...r1145, q1141, BUCKLE_LIST];
const p1170 = [h1146, v1061, b1147, s1148, e1149, m1150, y1151, q1152, d1154, r1155, g1153, d1156, p1158, y1159, y1162, g1163, o1164, f3505, r1166, z1167, a1168];
const i1171 = 'COL#';
const u1172 = 'COL';
const n1173 = 'CVAL';
const s1174 = 'CCOR';
const k1175 = 'COLP3';
const a1176 = 'CCNT';
const p1177 = 'BLND';
const i1178 = 'CLERP';
const q1179 = 'CBLND';
const j1180 = [i1171, u1172, s1174, k1175, p1177, i1178, q1179, l1161];
const i1181 = 'FILL#';
const m1182 = 'FILL';
const n1183 = [i1181, m1182];
const m1184 = 'STRK#';
const p1185 = 'STRK';
const t1186 = [m1184, p1185];
const c1187 = 'CSTOP#';
const t1188 = 'CSTOP';
const z1189 = [c1187, t1188];
const r1190 = 'GRAD#';
const a1191 = 'GRAD';
const g1192 = [r1190, a1191];
const p1193 = 'RCRN#';
const z1194 = 'RCRN';
const a1195 = [p1193, z1194];
const s1196 = 'DRSH#';
const d1197 = 'DRSH';
const r1198 = [s1196, d1197];
const s1199 = 'INSH#';
const z1200 = 'INSH';
const h1201 = [s1199, z1200];
const a1202 = 'LBLR#';
const q1203 = 'LBLR';
const o1204 = [a1202, q1203];
const e1205 = 'BBLR#';
const d1206 = 'BBLR';
const d1207 = [e1205, d1206];
const n1208 = 'MASK#';
const t1209 = 'MASK';
const q1210 = [n1208, t1209];
const n1211 = 'BLEND#';
const n1212 = 'BLEND';
const y1213 = [n1211, n1212];
const p1214 = [...a1195, ...r1198, ...h1201, ...o1204, ...d1207, ...y1213, ...q1210];
const u1215 = [i1171, i1181, r1190, m1184, s1196, s1199, a1202, e1205, n1211, n1208];
const y1216 = 'CSTL';
const l1217 = 'SHP#';
const u1218 = 'RECT#';
const y1219 = 'RECT';
const h1220 = [u1218, y1219];
const p1221 = 'LINE#';
const g1222 = 'LINE';
const b1223 = [p1221, g1222];
const j1224 = 'ELPS#';
const p1225 = 'ELPS';
const c1226 = [j1224, p1225];
const e1227 = 'TRPZ#';
const n1228 = 'TRPZ';
const s1229 = [e1227, n1228];
const i1236 = 'POLY#';
const v1237 = 'POLY';
const y1238 = [i1236, v1237];
const i1239 = 'STAR#';
const l1240 = 'STAR';
const q1241 = [i1239, l1240];
const o1242 = 'TXTS#';
const a1243 = 'TXTS';
const i1244 = [o1242, a1243];
const d1245 = 'PT#';
const m1246 = 'PT';
const h1247 = [d1245, m1246];
const a1248 = 'PCORN';
const f1249 = 'VPATH#';
const b1250 = 'VPATH';
const h1251 = [f1249, b1250];
const j1252 = 'VPT#';
const s1253 = 'VPT';
const k1254 = [j1252, s1253];
const j1255 = 'VEDGE#';
const a1256 = 'VEDGE';
const z1257 = [j1255, a1256];
const g1258 = 'VREG#';
const z1259 = 'VREG';
const c1260 = [g1258, z1259];
const y1261 = 'VNET#';
const p1262 = 'VNET';
const v1263 = [y1261, p1262];
const b1264 = 'SGRP#';
const t1265 = 'SGRP';
const o1266 = [b1264, t1265];
const x1267 = 'FRM#';
const h1268 = 'FRM';
const n1269 = [x1267, h1268];
const x1231 = 'ARC#';
const s1230 = 'ARC';
const y1232 = [x1231, s1230];
const q1234 = 'WAVEP#';
const q1233 = 'WAVEP';
const b1235 = [q1234, q1233];
const m1270 = 'MOVE';
const d1271 = 'ROT';
const m1272 = 'SCALE';
const l1273 = 'SKEW';
const n1274 = 'SCENTR';
const q1275 = 'RSTX';
const b1276 = 'PLACE';
const g1277 = 'APPLY';
const PATH_LENGTH = 'PTHLEN';
const JOIN_PATHS = 'JOINPTH';
const REORIENT_PATHS = 'REORPTH';
const i1283 = 'PTALPATH';
const q1284 = 'CPTONPATH';
const s1278 = 'MESPT';
const g1279 = 'VECLEN';
const c1280 = 'CIRCEN';
const ARC_FROM_POINTS = 'ARCPT';
const u1281 = 'INTLIN';
const e1282 = 'PTLERP';
const REVERSE_PATH = 'REVPTH';
const BLEND_PATH = 'BLENDPTH';
const PATH_TYPES = [b1250, n1228, s1230, q1233];
const PATH_VALUES = [f1249, e1227, x1231, q1234];
const l1285 = 'SBOOL';
const n1286 = 'SBOOL#';
const g1287 = 'SBOOLU';
const f1288 = 'SBOOLS';
const h1289 = 'SBOOLI';
const b1290 = 'SBOOLE';
const i1291 = [l1285, n1286, g1287, f1288, h1289, b1290];
const o1292 = 'RENDER';
const EXPORT = 'EXPORT';
const y1293 = [l1217, l1062, u1218, p1221, j1224, e1227, i1236, i1239, o1242, d1245, f1249, j1252, j1255, g1258, y1261, x1231, q1234, b1264, x1267, n1286, s1196, s1199, a1202, e1205, n1211, n1208];
const g1294 = [d1271, m1272, l1273];
const m1295 = [...y1293, ...h1220, ...b1223, ...c1226, ...s1229, ...y1238, ...q1241, ...i1244, ...h1247, a1248, ...h1251, ...k1254, ...z1257, ...c1260, ...v1263, ...y1232, ...b1235, ...o1266, ...n1269, ...i1291, m1270, ...g1294, n1274, q1275, b1276, g1277, PATH_LENGTH, JOIN_PATHS, REORIENT_PATHS, i1283, q1284, s1278, g1279, c1280, s1230, q1233, ARC_FROM_POINTS, u1281, e1282, REVERSE_PATH, BLEND_PATH, o1292, EXPORT];
const b1296 = [p1059, h1060, v1061, l1062, p1094, h1146, i1171, i1181, c1187, r1190, m1184, c1187, r1190, l1217, u1218, p1221, j1224, e1227, i1236, i1239, o1242, d1245, f1249, j1252, j1255, g1258, y1261, b1264, x1267, p1193, s1196, s1199, a1202, e1205, n1211, n1208];
const s1297 = 'GROUP';
const y1298 = 'GPARAM';
const p1299 = [s1297, y1298];
const p1300 = 'CMNT';
const p1301 = 'CMNTARR';
const a1302 = 'PANEL';
const m1303 = 'ACT';
const t1304 = 'BFACT';
const y1305 = 'BFLST';
const u1306 = 'DIS';
const y1307 = 'NOC';
const PARAM = 'PARAM';
const e1308 = 'LOG';
const t1309 = 'GRAPH';
const i1310 = [[v1122, '%'], [l1121, '/'], [e1119, '−'], [p1118, '+'], [a1120, '×'], [c1123, 'e<sup>x']];
const t1311 = [[l1121, '/'], [e1119, '−'], [p1118, '+'], [a1120, '×']];
const g1312 = 0;
const a1313 = 1;
const w1314 = 2;
const h1315 = 3;
const u1316 = [[g1312, 'not'], [a1313, 'xor'], [w1314, 'or'], [h1315, 'and']];
const g1317 = 0;
const e1318 = 1;
const q1319 = 2;
const g1320 = 3;
const i1321 = 4;
const r1322 = 5;
const a1323 = [[g1317, '<'], [e1318, '≤'], [q1319, '≠'], [g1320, '='], [i1321, '≥'], [r1322, '>']];
const m1324 = 0;
const d1325 = 1;
const o1326 = 2;
const o1327 = 3;
const f1328 = 4;
const a1329 = 5;
const p1330 = [[m1324, 'sin'], [d1325, 'cos'], [o1326, 'tan'], [o1327, 'asin'], [f1328, 'acos'], [a1329, 'atan']];
const i1331 = 'EMPTY';
const h1332 = 'CONNECT';
const c1333 = 'CREATE';
const q1334 = 'CREATE_INSERT';
const n1335 = 'DELETE';
const u1336 = 'DISCONNECT';
const s1337 = 'LINK_STYLE';
const p1338 = 'LINK_VARIABLE';
const s1339 = 'LINK_VARIABLE_GROUP';
const q1340 = 'MAKE_ACTIVE';
const MAKE_NOT_CONDITION_ACTION = 'MAKE_NOT_CONDITION';
const p1341 = 'MAKE_PASSIVE';
const b1342 = 'PASTE';
const m1343 = 'RECONNECT';
const y1344 = 'REMOVE';
const h1345 = 'RENAME';
const b1346 = 'REORDER_INPUTS';
const n1347 = 'REORDER_CONNECTIONS';
const b1348 = 'SELECT';
const y1349 = 'SELECT_MOVE';
const s1350 = 'MOVE_NODES';
const u1351 = 'SET_PARAM_VALUE';
const SET_MULTIPLE_VALUES_ACTION = 'SET_MULTIPLE_VALUES';
const o1352 = 'SET_PARAM_SETTING';
const i1353 = 'SET_NODE_RECT';
const j1354 = 'TOGGLE_DISABLE';
const g1355 = 'TOGGLE_PARAM_HEADER';
const y1356 = 'SET_CURRENT_GRAPH';
const z1357 = 'CREATE_PAGE';
const a1358 = 'DELETE_PAGE';
const p1359 = 'GROUP_NODES';
const j1360 = 'UNGROUP_NODES';
const g1361 = 'HIGHLIGHT_NODES';
const SCROLL_LIST_NODE_ACTION = 'SCROLL_LIST_NODE';
const SET_LIST_DIVIDER_ACTION = 'SET_LIST_DIVIDER';
const SET_NODE_PARAM_ACTION = 'SET_NODE_PARAM';
const t1362 = 'BNORM';
const e1363 = 'BDARK';
const e1364 = 'BMULT';
const z1365 = 'BPDRK';
const m1366 = 'BBURN';
const e1367 = 'BLITE';
const j1368 = 'BSCRN';
const j1369 = 'BPLGT';
const n1370 = 'BDODG';
const c1371 = 'BOVER';
const r1372 = 'BSOFT';
const m1373 = 'BHARD';
const z1374 = 'BDIFF';
const q1375 = 'BEXCL';
const g1376 = 'BHUE';
const f1377 = 'BSAT';
const b1378 = 'BCOL';
const e1379 = 'BLUM';
const b1380 = [[t1362, 'normal', 'NORMAL'], [e1363, 'darken', 'DARKEN'], [e1364, 'multiply', 'MULTIPLY'], [z1365, 'plus darker', 'LINEAR_BURN'], [m1366, 'color burn', 'COLOR_BURN'], [e1367, 'lighten', 'LIGHTEN'], [j1368, 'screen', 'SCREEN'], [j1369, 'plus lighter', 'LINEAR_DODGE'], [n1370, 'color dodge', 'COLOR_DODGE'], [c1371, 'overlay', 'OVERLAY'], [r1372, 'soft light', 'SOFT_LIGHT'], [m1373, 'hard light', 'HARD_LIGHT'], [z1374, 'difference', 'DIFFERENCE'], [q1375, 'exclusion', 'EXCLUSION'], [g1376, 'hue', 'HUE'], [f1377, 'saturation', 'SATURATION'], [b1378, 'color', 'COLOR'], [e1379, 'luminosity', 'LUMINOSITY']];
const b1381 = [['thin', 100], ['extra light', 200], ['light', 300], ['regular', 400], ['medium', 500], ['semi bold', 600], ['bold', 700], ['extra bold', 800], ['black', 900]];
const m1382 = 0;
const g1383 = 1;
const i1384 = 2;
const u1385 = 2;
const u1386 = 3;
const y1387 = 3;
const t1388 = 4;
const k1389 = 4;
const o1390 = 5;
const u1391 = 6;
const r1392 = 7;
const z1393 = 8;
const i1394 = 9;
const k1395 = 10;
const w1396 = 11;
const x1397 = 12;
const h1398 = 13;
const y1399 = 14;
const v1400 = 15;
const x1401 = 16;
const d1402 = 17;
const r1403 = 18;
const k1404 = 19;
const q1405 = 20;
const c1406 = 21;
const b1407 = 22;
const j1408 = 23;
const s1409 = 24;
const FO_BOOLEAN_CHILDREN = 24;
const a1410 = 24;
const t1411 = 25;
const FO_BOOLEAN_OPERATION = 25;
const x1412 = 26;
const v1413 = 27;
const o1414 = 28;
const i1415 = 28;
const t1416 = 28;
const m1417 = 28;
const v1418 = 28;
const j1419 = 28;
const f1420 = 28;
const n1421 = 28;
const k1422 = 29;
const z1423 = 29;
const v1424 = 29;
const s1425 = 29;
const k1426 = 29;
const s1427 = 29;
const d1428 = 30;
const o1429 = 30;
const u1430 = 30;
const i1431 = 30;
const x1432 = 31;
const d1433 = 31;
const j1434 = 32;
const d1435 = 33;
const x1436 = 34;
const u1437 = 35;
const v1438 = 36;
const r1439 = 37;
const y2797 = '12345679ABCDEFGHJKLMNPQRSTUVWXYZ';
function q845(array, chars = y2797) { let w847 = ''; let len = array.length; let i = 0; while (len > 0) {
    if (len >= 5) {
        const a0 = array[i], a1 = array[i + 1], a2 = array[i + 2], a3 = array[i + 3], a4 = array[i + 4];
        w847 += chars[(a0 & 0xF8) >>> 3];
        w847 += chars[((a0 & 0x07) << 2) | ((a1 & 0xC0) >>> 6)];
        w847 += chars[(a1 & 0x3E) >>> 1];
        w847 += chars[((a1 & 0x01) << 4) | ((a2 & 0xF0) >>> 4)];
        w847 += chars[((a2 & 0x0F) << 1) | ((a3 & 0x80) >>> 7)];
        w847 += chars[(a3 & 0x7C) >>> 2];
        w847 += chars[((a3 & 0x03) << 3) | ((a4 & 0xE0) >>> 5)];
        w847 += chars[(a4 & 0x1F)];
    }
    else if (len == 4) {
        const a0 = array[i], a1 = array[i + 1], a2 = array[i + 2], a3 = array[i + 3];
        w847 += chars[(a0 & 0xF8) >>> 3];
        w847 += chars[((a0 & 0x07) << 2) | ((a1 & 0xC0) >>> 6)];
        w847 += chars[(a1 & 0x3E) >>> 1];
        w847 += chars[((a1 & 0x01) << 4) | ((a2 & 0xF0) >>> 4)];
        w847 += chars[((a2 & 0x0F) << 1) | ((a3 & 0x80) >>> 7)];
        w847 += chars[(a3 & 0x7C) >>> 2];
        w847 += chars[((a3 & 0x03) << 3)];
    }
    else if (len == 3) {
        const a0 = array[i], a1 = array[i + 1], a2 = array[i + 2];
        w847 += chars[(a0 & 0xF8) >>> 3];
        w847 += chars[((a0 & 0x07) << 2) | ((a1 & 0xC0) >>> 6)];
        w847 += chars[(a1 & 0x3E) >>> 1];
        w847 += chars[((a1 & 0x01) << 4) | ((a2 & 0xF0) >>> 4)];
        w847 += chars[((a2 & 0x0F) << 1)];
    }
    else if (len == 2) {
        const a0 = array[i], a1 = array[i + 1];
        w847 += chars[(a0 & 0xF8) >>> 3];
        w847 += chars[((a0 & 0x07) << 2) | ((a1 & 0xC0) >>> 6)];
        w847 += chars[(a1 & 0x3E) >>> 1];
        w847 += chars[((a1 & 0x01) << 4)];
    }
    else if (len == 1) {
        const a0 = array[i];
        w847 += chars[(a0 & 0xF8) >>> 3];
        w847 += chars[((a0 & 0x07) << 2)];
    }
    i += 5;
    len -= 5;
} return w847; }
function d846(w847, chars = y2797) { const array = []; let len = w847.length; let c = 0; while (len > 0) {
    if (len >= 8) {
        const c0 = chars.indexOf(w847[c]), c1 = chars.indexOf(w847[c + 1]), c2 = chars.indexOf(w847[c + 2]), c3 = chars.indexOf(w847[c + 3]), c4 = chars.indexOf(w847[c + 4]), c5 = chars.indexOf(w847[c + 5]), c6 = chars.indexOf(w847[c + 6]), c7 = chars.indexOf(w847[c + 7]);
        array.push((c0 << 3) | ((c1 & 0x1C) >>> 2));
        array.push(((c1 & 0x03) << 6) | (c2 << 1) | ((c3 & 0x10) >>> 4));
        array.push(((c3 & 0x0F) << 4) | ((c4 & 0x1E) >>> 1));
        array.push(((c4 & 0x01) << 7) | (c5 << 2) | ((c6 & 0x18) >>> 3));
        array.push(((c6 & 0x07) << 5) | c7);
    }
    else if (len == 7) {
        const c0 = chars.indexOf(w847[c]), c1 = chars.indexOf(w847[c + 1]), c2 = chars.indexOf(w847[c + 2]), c3 = chars.indexOf(w847[c + 3]), c4 = chars.indexOf(w847[c + 4]), c5 = chars.indexOf(w847[c + 5]), c6 = chars.indexOf(w847[c + 6]);
        array.push((c0 << 3) | ((c1 & 0x1C) >>> 2));
        array.push(((c1 & 0x03) << 6) | (c2 << 1) | ((c3 & 0x10) >>> 4));
        array.push(((c3 & 0x0F) << 4) | ((c4 & 0x1E) >>> 1));
        array.push(((c4 & 0x01) << 7) | (c5 << 2) | ((c6 & 0x18) >>> 3));
    }
    else if (len == 5) {
        const c0 = chars.indexOf(w847[c]), c1 = chars.indexOf(w847[c + 1]), c2 = chars.indexOf(w847[c + 2]), c3 = chars.indexOf(w847[c + 3]), c4 = chars.indexOf(w847[c + 4]);
        array.push((c0 << 3) | ((c1 & 0x1C) >>> 2));
        array.push(((c1 & 0x03) << 6) | (c2 << 1) | ((c3 & 0x10) >>> 4));
        array.push(((c3 & 0x0F) << 4) | ((c4 & 0x1E) >>> 1));
    }
    else if (len == 4) {
        const c0 = chars.indexOf(w847[c]), c1 = chars.indexOf(w847[c + 1]), c2 = chars.indexOf(w847[c + 2]), c3 = chars.indexOf(w847[c + 3]);
        array.push((c0 << 3) | ((c1 & 0x1C) >>> 2));
        array.push(((c1 & 0x03) << 6) | (c2 << 1) | ((c3 & 0x10) >>> 4));
    }
    else if (len == 2) {
        const c0 = chars.indexOf(w847[c]), c1 = chars.indexOf(w847[c + 1]);
        array.push((c0 << 3) | ((c1 & 0x1C) >>> 2));
    }
    c += 8;
    len -= 8;
} return array; }
function x2102(nodeKey, v4007) {
    return __awaiter(this, void 0, void 0, function* () { const log = v2103(yield b1547(nodeKey, false)); if (v4007) {
        console.log('%c%s\n%c%s', 'background: #fa24; color: white;', w1057(nodeKey), 'background: #fa44; color: #edc;', log);
    }
    else {
        console.log('%c%s\n%c%s', 'background: #fdb; color: black;', w1057(nodeKey), 'background: #fed; color: black;', log);
    } });
}
function v2103(json) { let u4036 = json.replace('{\n', '').replace('\n}', '').replace('[\n' + k868, '').replace('\n' + k868 + ']', '').split(k868 + '"params":\n').join('').split('": "').join(': ').split('", "').join(': ').split(k868 + '"').join(k868).split(k868 + k868 + '["').join(k868 + k868).split('",\n').join('\n').split('"\n').join('\n').split('"],\n').join('\n'); if (u4036[u4036.length - 1] == '"')
    u4036 = u4036.substring(0, u4036.length - 1); if (u4036.substring(u4036.length - 2) == '"]')
    u4036 = u4036.substring(0, u4036.length - 2); return u4036; }
function f2104(json) { let u4036 = json.replace('{\n', '').replace('\n}', '').replace('[\n' + k868, '').replace('\n' + k868 + ']', ''); return u4036; }
function l2105(m243, v4007) { const l4214 = s926(m243, true); if (v4007) {
    console.log('%c%s', 'background: #4f44; color: #ded', l4214);
}
else {
    console.log('%c%s', 'background: #cfc; color: black;', l4214);
} }
console.clear();
figma.payments.setPaymentStatusInDevelopment({ type: 'UNPAID' });
figma.loadAllPagesAsync().then(() => { figma.on('documentchange', y1518); figma.on('selectionchange', b1526); figma.on('close', n1519); });
f1508(true);
figma.clientStorage.getAsync('pro').then(data => { figma.showUI(__html__, { visible: false, themeColors: true, title: 'Generator' }); });
var k2709 = figma.viewport.zoom;
setInterval(k1523, 100);
const n2798 = 'clock_';
const o2799 = 1000;
var b2800 = false;
var objectCenterSize = 15;
function l1520() { (function () {
    return __awaiter(this, void 0, void 0, function* () { figma.currentPage.loadAsync().then(() => __awaiter(this, void 0, void 0, function* () { let k2801 = yield figma.currentPage.getPluginData(figma.currentUser.id + ',windowWidth'); let e2802 = yield figma.currentPage.getPluginData(figma.currentUser.id + ',windowHeight'); let g2803; let a2804; if (k2801 === NULL) {
        g2803 = 800;
        figma.currentPage.setPluginData(figma.currentUser.id + ',windowWidth', k2801.toString());
    }
    else
        g2803 = parseInt(k2801); if (e2802 === NULL) {
        a2804 = 600;
        figma.currentPage.setPluginData(figma.currentUser.id + ',windowHeight', e2802.toString());
    }
    else
        a2804 = parseInt(e2802); figma.ui.resize(Math.max(minWindowWidth, g2803), Math.max(minWindowHeight, a2804)); figma.ui.show(); const fonts = yield figma.listAvailableFontsAsync(); const eula = (yield figma.clientStorage.getAsync('eula')) === 'true'; const tutorials = (yield figma.clientStorage.getAsync('tutorials')) === 'true'; const isLocked = yield q1525(); m1527({ cmd: 'uiReturnFigStartGenerator', currentUser: figma.currentUser, viewportRect: figma.viewport.bounds, viewportZoom: figma.viewport.zoom, fonts: fonts, eula: eula, tutorials: tutorials, isLocked: isLocked, windowWidth: g2803, windowHeight: a2804 }); })); });
})(); }
function v1521() { f1508(); figma.showUI(__html__, { visible: false, themeColors: true }); }
function k1522() { setInterval(t1524, o2799); }
function k1523() { if (figma.viewport.zoom == k2709)
    return; k2709 = figma.viewport.zoom; a2697(); i1541(); e1543(); }
function t1524() { h1548(n2798 + figma.currentUser.sessionId.toString(), Date.now().toString()); }
function q1525() {
    return __awaiter(this, void 0, void 0, function* () { yield figma.currentPage.loadAsync(); const clocks = figma.currentPage.getPluginDataKeys().filter(k => k.length > n2798.length && k.substring(0, n2798.length) == n2798 && k.substring(n2798.length) != figma.currentUser.sessionId.toString()).map((k) => __awaiter(this, void 0, void 0, function* () { return parseInt(yield b1547(k)); })); clocks.sort(); const now = Date.now(); const locked = clocks.length > 0 && now - (yield clocks[clocks.length - 1]) < o2799 * 2; return locked; });
}
function b1526() { a2697(); }
var k2730 = new Array();
var t2732 = new Array();
function figGetObjectsFromIds(objectIds) {
    return __awaiter(this, void 0, void 0, function* () { for (let i = o2766.length - 1; i >= 0; i--)
        if (!o2766[i].removed && objectIds.includes(o2766[i].getPluginData('objectId')))
            o2766.splice(i, 1); for (let i = y2782.length - 1; i >= 0; i--)
        if (y2782[i].removed || objectIds.includes(y2782[i].getPluginData('objectId')))
            y2782.splice(i, 1); yield figma.currentPage.loadAsync(); return figma.currentPage.findAll(o => objectIds.includes(o.getPluginData('objectId'))); });
}
function y1507(nodeIds) {
    return __awaiter(this, void 0, void 0, function* () { for (let i = o2766.length - 1; i >= 0; i--)
        if (!o2766[i].removed && nodeIds.includes(o2766[i].getPluginData('nodeId')))
            o2766.splice(i, 1); for (let i = y2782.length - 1; i >= 0; i--)
        if (y2782[i].removed || nodeIds.includes(y2782[i].getPluginData('nodeId')))
            y2782.splice(i, 1); yield figma.currentPage.loadAsync(); figma.currentPage.findAll(o => nodeIds.includes(o.getPluginData('nodeId'))).forEach(o => { if (!o.removed)
        o.remove(); }); k2730 = k2730.filter(a => !nodeIds.includes(a.nodeId)); });
}
function f1508(f1509 = false) { for (const w1514 of figma.currentPage.children) {
    if (w1514.removed)
        continue;
    if (w1514.getPluginData('objectId') != '' && w1514.getPluginData('userId') == figma.currentUser.id && (parseInt(w1514.getPluginData('retain')) == 0 || f1509))
        w1514.remove();
} }
function j1510(nodeIds, c1511) { for (let i = k2730.length - 1; i >= 0; i--) {
    const u2731 = k2730[i];
    if (!nodeIds.includes(u2731.nodeId))
        continue;
    for (let j = u2731.objects.length - 1; j >= 0; j--) {
        const w1514 = u2731.objects[j];
        if (w1514.removed || !n1512(w1514, c1511)) {
            if (!w1514.removed)
                w1514.remove();
            x945(u2731.objects, w1514);
            if (o2766.includes(w1514))
                x945(o2766, w1514);
            if (y2782.includes(w1514))
                x945(y2782, w1514);
        }
        if (!w1514.removed) {
            if (parseInt(w1514.getPluginData('retain')) == 2)
                z1533(w1514);
        }
    }
    if (isEmpty(u2731.objects))
        x945(k2730, u2731);
} }
function n1512(w1514, c1511) { if (w1514.type == t1265 || w1514.type == h1268) {
    for (const child of w1514.children) {
        const found = n1512(child, c1511);
        if (found)
            return found;
    }
}
else {
    const found = c1511.find(o => w1514.getPluginData('objectId') == o[i1384] && w1514.getPluginData('userId') == figma.currentUser.id || o[o1390] == 2 && o[o1390] == w1514.getPluginData('retain'));
    if (found)
        return found;
} return null; }
function r1515(nodeIds, c1516) { figma.getLocalPaintStylesAsync().then(paintStyles => { paintStyles.filter(s => nodeIds.includes(s.getPluginData('nodeId'))).forEach(s => { const nodeId = s.getPluginData('nodeId'); const existing = s925(s.getPluginData('existing')); if (!existing) {
    s.remove();
}
else if (c1516) {
    k947(t2732, a => a.nodeId == nodeId);
    s.setPluginData('type', NULL);
    s.setPluginData('nodeId', NULL);
    s.setPluginData('existing', NULL);
} }); }); if (c1516)
    t2732 = t2732.filter(a => !nodeIds.includes(a.nodeId)); }
var v1517 = false;
function y1518(e) { for (const change of e.documentChanges) {
    switch (change.type) {
        case 'STYLE_CREATE':
            if (!change.style)
                break;
            if (!v1517) {
                change.style.setPluginData('type', NULL);
                change.style.setPluginData('nodeId', NULL);
                change.style.setPluginData('existing', NULL);
            }
            break;
        case 'STYLE_PROPERTY_CHANGE': {
            if (!change.style)
                break;
            if (!v1517) {
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
                m1527(msg);
            }
            break;
        }
        case 'STYLE_DELETE':
            m1527({ cmd: 'uiStyleDelete', styleId: change.id });
            break;
    }
} v1517 = false; }
function n1519() { f1508(); m1527({ cmd: 'updateMetrics' }); }
figma.ui.onmessage = function (msg) { msg = JSON.parse(msg); if (msg.cmd == 'returnUiGetValueForFigma')
    return; switch (msg.cmd) {
    case 'figStartGenerator':
        l1520();
        break;
    case 'figRestartGenerator':
        v1521();
        break;
    case 'figFinishStart':
        k1522();
        break;
    case 'figDockWindowNormal':
        a2739('normal');
        break;
    case 'figDockWindowMaximize':
        a2739('maximize');
        break;
    case 'figDockWindowTop':
        a2739('top');
        break;
    case 'figDockWindowLeft':
        a2739('left');
        break;
    case 'figDockWindowRight':
        a2739('right');
        break;
    case 'figDockWindowBottom':
        a2739('bottom');
        break;
    case 'figGetMousePosition':
        n1593(msg.clientPosition);
        break;
    case 'figResizeWindow':
        b1596(msg.width, msg.height);
        break;
    case 'figSetWindowRect':
        o1594(msg.x, msg.y, msg.width, msg.height);
        break;
    case 'figNotify':
        a1597(msg);
        break;
    case 'figGetLocalData':
        o1545(msg.key);
        break;
    case 'figSetLocalData':
        h1546(msg.key, msg.value);
        break;
    case 'figClearAllLocalData':
        g4031();
        break;
    case 'figGetPageData':
        b1547(msg.key);
        break;
    case 'figSetPageData':
        h1548(msg.key, msg.value);
        break;
    case 'figSavePages':
        p1553(msg.pageIds, msg.pageJson, msg.currentPageId);
        break;
    case 'figLoadNodesAndConns':
        e1550(msg.debugMode);
        break;
    case 'figSaveNodes':
        f1554(msg.nodeIds, msg.nodeJson);
        break;
    case 'figGetAllLocalTemplateNames':
        i2736();
        break;
    case 'figSaveLocalTemplate':
        e1555(msg.w4032, msg.template);
        break;
    case 'figRemoveConnsToNodes':
        s1556(msg.nodeIds);
        break;
    case 'figRemoveSavedNodesAndConns':
        z1557(msg.nodeIds);
        break;
    case 'figRemoveAllSavedNodesAndConns':
        h1558();
        break;
    case 'figLogAllSavedNodesAndConns':
        z1559(msg.v4007);
        break;
    case 'figLogAllSavedNodes':
        q1560(msg.v4007);
        break;
    case 'figLogAllSavedConns':
        h1561(msg.v4007);
        break;
    case 'figLogAllSavedPageKeys':
        g1562(msg.v4007);
        break;
    case 'figLogAllSavedPages':
        u1563(msg.v4007);
        break;
    case 'figLogAllSavedConnKeys':
        l1564(msg.v4007);
        break;
    case 'figLogAllLocalData':
        e1565(msg.v4007);
        break;
    case 'figGetValue':
        u1566(msg.key, msg.spec);
        break;
    case 'figRemoveSavedPage':
        w1568(msg.pageId);
        break;
    case 'figRemoveAllSavedPages':
        c1569();
        break;
    case 'figSaveConnection':
        n1570(msg.key, msg.json);
        break;
    case 'figSaveConnections':
        v1571(msg.keys, msg.json);
        break;
    case 'figUpdateSavedConnections':
        i1572(msg.curKeys, msg.newKeys, msg.json);
        break;
    case 'figDeleteSavedConnection':
        t1573(msg.key);
        break;
    case 'figRemoveAllSavedConnections':
        v1574();
        break;
    case 'figDeleteSavedConnectionsToNode':
        d1575(msg.nodeId);
        break;
    case 'figDeleteSavedConnectionsFromNode':
        a1576(msg.nodeId);
        break;
    case 'figRemovePluginDataFromAllLocalStyles':
        f1577();
        break;
    case 'figGetAllLocalVariables':
        t1601(msg.nodeId, msg.px, msg.py);
        break;
    case 'figLinkNodeToVariable':
        f1603(msg.nodeId, msg.variableId);
        break;
    case 'figUpdateVariable':
        figUpdateVariableAsync(msg.variableId, msg.value);
        break;
    case 'figGetAllLocalColorStyles':
        r1578(msg.nodeId, msg.px, msg.py);
        break;
    case 'figLinkNodeToExistingColorStyle':
        e1579(msg.nodeId, msg.styleId);
        break;
    case 'figExport':
        figExport(msg.objectIds, msg.scale, msg.format, msg.suffix);
        break;
    case 'figGetObjectSize':
        h1532(msg.object);
        break;
    case 'figGetVariableUpdates':
        n1567(msg.linkedVarIds);
        break;
    case 'figUpdateShowIds':
        b2800 = msg.b2800;
        break;
    case 'figUpdateObjectCenterSize':
        objectCenterSize = msg.objectCenterSize;
        break;
    case 'figDeleteAllObjects':
        f1508();
        break;
    case 'figUpdateObjectsAndStyles':
        p2745 = 0;
        s2746 = 0;
        msg.objects.forEach(o => o.counted = false);
        p2733(null, msg.objects, msg.r4021, msg.k2050, msg.nodeIds, msg.q2762, msg.r2763, msg.o270);
        g1584(msg);
        break;
    case 'figDeleteObjectsAndStyles':
        y1507(msg.nodeIds);
        r1515(msg.nodeIds, msg.c1516);
        break;
    case 'figDeleteObjectsExcept':
        j1510(msg.nodeIds, msg.ignoreObjects);
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
} m1527({ cmd: 'uiEndFigMessage', msgCmd: msg.cmd }); };
function m1527(msg) { figma.ui.postMessage(JSON.stringify(msg)); }
function g2734(key) {
    return __awaiter(this, void 0, void 0, function* () { return yield figma.clientStorage.getAsync(key); });
}
function o1545(key) { figma.currentPage.loadAsync().then(() => { if (key == 'canvasEmpty') {
    m1527({ cmd: 'uiReturnFigGetLocalData', key: key, value: figma.currentPage.children.length == 0 });
}
else if (key == 'debugWarningCrash') {
    figma.clientStorage.getAsync('debugWarning').then(data => { m1527({ cmd: 'uiReturnFigGetLocalData', key: key, value: data }); });
}
else {
    figma.clientStorage.getAsync(key).then(data => { m1527({ cmd: 'uiReturnFigGetLocalData', key: key, value: data }); });
} }); }
function h1546(key, value, postToUi = true) { figma.clientStorage.setAsync(key, value); if (postToUi) {
    m1527({ cmd: 'uiReturnFigSetLocalData', key: key, value: value });
} }
function g4031() {
    return __awaiter(this, void 0, void 0, function* () { const keys = yield figma.clientStorage.keysAsync(); for (const key of keys)
        figma.clientStorage.deleteAsync(key); });
}
function b1547(key, postToUi = true) {
    return __awaiter(this, void 0, void 0, function* () { yield figma.currentPage.loadAsync(); const data = figma.currentPage.getPluginData(key); if (postToUi) {
        m1527({ cmd: 'uiReturnFigGetPageData', key: key, value: data });
    } return data; });
}
function h1548(key, value) { t1549(key); figma.currentPage.setPluginData(key, value); }
function t1549(key) { figma.currentPage.setPluginData(key, ''); }
function e1550(debugMode) { figma.currentPage.loadAsync().then(() => { const pageKeys = figma.currentPage.getPluginDataKeys().filter(k => v1053(k)); const nodeKeys = figma.currentPage.getPluginDataKeys().filter(k => v1054(k)); const connKeys = figma.currentPage.getPluginDataKeys().filter(k => b1055(k)); if (!debugMode)
    v1552(nodeKeys, connKeys); const pages = pageKeys.map(k => figma.currentPage.getPluginData(k)); const nodes = nodeKeys.map(k => figma.currentPage.getPluginData(k)); const j2122 = connKeys.map(k => figma.currentPage.getPluginData(k)); const pageOrder = figma.currentPage.getPluginData('pageOrder').split(','); const currentPageId = figma.currentPage.getPluginData('currentPageId'); y1551(nodes); const showAllColorSpaces = figma.currentPage.getPluginData('showAllColorSpaces'); m1527({ cmd: 'uiReturnFigLoadNodesAndConns', showAllColorSpaces: showAllColorSpaces, pageKeys: pageKeys, pageJson: pages, pageOrder: pageOrder, currentPageId: currentPageId, nodeKeys: nodeKeys, nodeJson: nodes, connKeys: connKeys, connJson: j2122 }); }); }
function y1551(nodes) { t2732 = []; figma.getLocalPaintStylesAsync().then(paintStyles => { for (const o3019 of nodes) {
    const node = JSON.parse(o3019);
    if (node.type == y1216) {
        const style = paintStyles.find(s => { const nodeId = s.getPluginData('nodeId'); return nodeId == node.id; });
        if (style) {
            t2732.push({ nodeId: node.id, existing: s925(node.existing), styles: [style] });
        }
    }
} }); }
function v1552(nodeKeys, connKeys) { figma.currentPage.loadAsync().then(() => { const d2735 = '"loading": "true"'; const not = '{\n'; const set = '{\n' + k868 + d2735 + ',\n'; nodeKeys.forEach(k => figma.currentPage.setPluginData(k, figma.currentPage.getPluginData(k).replace(set, not).replace(not, set))); connKeys.forEach(k => figma.currentPage.setPluginData(k, figma.currentPage.getPluginData(k).replace(set, not).replace(not, set))); }); }
function p1553(pageIds, pageJson, currentPageId) { for (let i = 0; i < pageIds.length; i++) {
    h1548(h924(pageIds[i]), pageJson[i]);
} h1548('pageOrder', pageIds.join(',')); h1548('currentPageId', currentPageId); }
function f1554(nodeIds, nodeJson) { for (let i = 0; i < nodeIds.length; i++) {
    h1548(c922(nodeIds[i]), nodeJson[i]);
} }
function i2736() {
    return __awaiter(this, void 0, void 0, function* () { let keys = yield figma.clientStorage.keysAsync(); keys = keys.filter(k => k.length >= e876.length && k.substring(0, e876.length) == e876); m1527({ cmd: 'uiReturnGetAllLocalTemplateNames', templateNames: keys }); });
}
function e1555(w4032, template) { h1546(e876 + ' ' + w4032, template); }
function s1556(nodeIds) { figma.currentPage.loadAsync().then(() => { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => b1055(k)); for (const key of connKeys) {
    const parts = k1058(key).split(' ');
    if (nodeIds.includes(parts[0]) || nodeIds.includes(parts[2]))
        t1549(key);
} }); }
function z1557(nodeIds) { figma.currentPage.loadAsync().then(() => { s1556(nodeIds); const nodeKeys = figma.currentPage.getPluginDataKeys().filter(k => v1054(k) && nodeIds.includes(w1057(k))); nodeKeys.forEach(k => t1549(k)); }); }
function h1558() { figma.currentPage.loadAsync().then(() => { const nodeKeys = figma.currentPage.getPluginDataKeys().filter(k => v1054(k)); const connKeys = figma.currentPage.getPluginDataKeys().filter(k => b1055(k)); for (const key of nodeKeys)
    t1549(key); for (const key of connKeys)
    t1549(key); }); }
function z1559(v4007) {
    return __awaiter(this, void 0, void 0, function* () { yield q1560(v4007); h1561(v4007); });
}
function q1560(v4007) {
    return __awaiter(this, void 0, void 0, function* () { yield figma.currentPage.loadAsync(); figma.currentPage.getPluginDataKeys().filter(k => v1054(k)).forEach((k) => __awaiter(this, void 0, void 0, function* () { return yield x2102(k, v4007); })); });
}
function h1561(v4007) { figma.currentPage.loadAsync().then(() => { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => b1055(k)); connKeys.sort((key1, key2) => { const p1 = k1058(key1).split(' '); const p2 = k1058(key2).split(' '); if (p1[2] != p2[2])
    return p1[2] < p2[2] ? -1 : 1; if (p1[3] != p2[3])
    return parseInt(p1[3]) - parseInt(p2[3]); if (p1[2] == p2[0])
    return -1; if (p2[2] == p1[0])
    return 1; return 0; }); connKeys.forEach(k => l2105(JSON.parse(figma.currentPage.getPluginData(k)), v4007)); }); }
function g1562(v4007) { figma.currentPage.loadAsync().then(() => { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => v1053(k)); connKeys.forEach(k => console.log('%c' + k, 'background: #fff; color: ' + (v4007 ? 'black' : 'white'))); const pageOrder = figma.currentPage.getPluginData('pageOrder'); console.log('%c' + pageOrder, 'background: #fff; color: ' + (v4007 ? 'black' : 'white')); }); }
function u1563(v4007) { figma.currentPage.loadAsync().then(() => { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => v1053(k)); connKeys.forEach(k => console.log('%c' + figma.currentPage.getPluginData(k), 'background: #fff; color: ' + (v4007 ? 'black' : 'white'))); const pageOrder = figma.currentPage.getPluginData('pageOrder'); console.log('%c' + pageOrder, 'background: #fff; color: ' + (v4007 ? 'black' : 'white')); }); }
function l1564(v4007) { figma.currentPage.loadAsync().then(() => { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => b1055(k)); connKeys.forEach(k => console.log('%c' + k, 'background: #dff; color: ' + (v4007 ? 'black' : 'white'))); }); }
function e1565(v4007) { figma.clientStorage.keysAsync().then(keys => keys.forEach(k => figma.clientStorage.getAsync(k).then(val => console.log(k + ': ' + val)))); }
function u1566(key, spec) {
    return __awaiter(this, void 0, void 0, function* () { let result = null; switch (key) {
        case 'getVariableData':
            result = yield e1602(spec);
            break;
        case 'getPaidStatus':
            result = figma.payments.status.type;
            break;
        case 'figSubscribe': {
            yield figma.payments.initiateCheckoutAsync({ interstitial: 'PAID_FEATURE' });
            result = figma.payments.status.type;
            break;
        }
    } m1527({ cmd: 'returnFigGetValue', value: result }); });
}
function n1567(varIds) { e1602(varIds).then(values => { m1527({ cmd: 'uiReturnFigGetVariableUpdates', values: values }); }); }
function w1568(pageId) {
    return __awaiter(this, void 0, void 0, function* () { t1549(d934(pageId)); const pageOrder = (yield b1547('pageOrder')).split(','); k947(pageOrder, id => id == pageId); h1548('pageOrder', pageOrder.join(',')); });
}
function c1569() { figma.currentPage.loadAsync().then(() => { const pageKeys = figma.currentPage.getPluginDataKeys().filter(k => v1053(k)); pageKeys.forEach(k => t1549(k)); t1549('pageOrder'); }); }
function n1570(key, json) { h1548(key, json); }
function v1571(_keys, _json) { const keys = JSON.parse(_keys); const json = JSON.parse(_json); for (let i = 0; i < keys.length; i++)
    h1548(keys[i], json[i]); }
function i1572(_curKeys, _newKeys, _json) { const curKeys = JSON.parse(_curKeys); const newKeys = JSON.parse(_newKeys); const json = JSON.parse(_json); for (let i = 0; i < curKeys.length; i++) {
    t1549(curKeys[i]);
    h1548(newKeys[i], json[i]);
} }
function t1573(key) { t1549(key); }
function v1574() { figma.currentPage.loadAsync().then(() => { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => b1055(k)); connKeys.forEach(k => t1549(k)); }); }
function d1575(nodeId) { figma.currentPage.loadAsync().then(() => { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => b1055(k)); for (const key of connKeys) {
    const parts = key.split(' ');
    if (parts[4] == nodeId)
        t1549(key);
} }); }
function a1576(nodeId) { figma.currentPage.loadAsync().then(() => { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => b1055(k)); for (const key of connKeys) {
    const parts = key.split(' ');
    if (parts[1] == nodeId)
        t1549(key);
} }); }
function f1577() { figma.getLocalPaintStylesAsync().then(z1581 => { for (const style of z1581) {
    style.setPluginData('type', '');
    style.setPluginData('nodeId', '');
    style.setPluginData('existing', '');
} }); }
function figSaveSnapshot(index, objectIds) {
    return __awaiter(this, void 0, void 0, function* () { const objects = yield figGetObjectsFromIds(objectIds); const group = figma.group(objects, figma.currentPage); const settings = { format: 'PNG' }; const icon = yield group.exportAsync(settings); figma.ungroup(group); m1527({ cmd: 'uiReturnFigSaveSnapshot', index: index, iconWidth: group.width, iconHeight: group.height, icon: icon }); });
}
var h2737 = null;
var v4033 = () => h2737 = null;
var d2738 = 'normal';
function n1593(clientPosition) { m1527({ cmd: 'uiReturnFigGetMousePosition', position: { x: 0, y: 0 }, clientPosition: clientPosition, viewportZoom: figma.viewport.zoom, viewportRect: figma.viewport.bounds }); }
function o1594(x, y, width, height) { return; }
function k1595(dock, rect, bounds) { switch (dock) {
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
function b1596(width, height) { (function () {
    return __awaiter(this, void 0, void 0, function* () { width = Math.floor(Math.max(0, width)); height = Math.floor(Math.max(0, height)); figma.ui.resize(width, height); yield figma.currentPage.loadAsync(); figma.currentPage.setPluginData(figma.currentUser.id + ',windowWidth', width.toString()); figma.currentPage.setPluginData(figma.currentUser.id + ',windowHeight', height.toString()); m1527({ cmd: 'uiReturnFigResizeWindow', width: width, height: height }); });
})(); }
function a2739(dock) {
    return __awaiter(this, void 0, void 0, function* () { if (dock != 'normal' && d2738 == 'normal') {
        figma.clientStorage.setAsync('normalWindowX', yield figma.clientStorage.getAsync('normalWindowX'));
        figma.clientStorage.setAsync('normalWindowY', yield figma.clientStorage.getAsync('normalWindowY'));
        figma.clientStorage.setAsync('normalWindowWidth', yield figma.clientStorage.getAsync('normalWindowWidth'));
        figma.clientStorage.setAsync('normalWindowHeight', yield figma.clientStorage.getAsync('normalWindowHeight'));
    } d2738 = dock; figma.clientStorage.setAsync('windowDock', dock); b1596(yield figma.clientStorage.getAsync('windowWidth'), yield figma.clientStorage.getAsync('windowHeight')); });
}
function a1597(msg) { t1598(msg.text, msg.prefix, msg.delay, msg.error, msg.o1599, msg.t1600); }
function t1598(text, prefix = 'Generator ', delay = 400, error = false, o1599 = '', t1600 = NULL) { const options = { timeout: delay, error: error, onDequeue: v4033 }; if (o1599 != '') {
    options['button'] = { text: o1599 };
    if (t1600.substring(0, 'removeConnection'.length) == 'removeConnection') {
        options['button']['action'] = () => t1573(t1600.split(',')[1]);
    }
    else {
        switch (t1600) {
            case 'hideClearUndoWarning':
                options['button']['action'] = () => m1527({ cmd: 'uiHideClearUndoWarning' });
                break;
        }
    }
} if (h2737)
    h2737.cancel(); h2737 = figma.notify(prefix + text, options); }
function z2740(key, params = null) {
    return __awaiter(this, void 0, void 0, function* () { return yield f2741(key, params); });
}
function f2741(key, params = null) {
    return __awaiter(this, void 0, void 0, function* () { return new Promise((resolve, reject) => { const timeout = 60000; m1527(Object.assign({ cmd: 'uiGetValueForFigma', key: key }, (params || {}))); const p2742 = setTimeout(() => reject(new Error('Timeout: Result not received by Figma within the specified time')), timeout); function a4034(msg) { msg = JSON.parse(msg); if (msg.cmd === 'returnUiGetValueForFigma') {
        clearTimeout(p2742);
        resolve({ key: msg.key, value: msg.value });
        figma.ui.off('message', a4034);
    } } figma.ui.on('message', a4034); }); });
}
var n2743 = [];
var d2744 = [];
var p2745 = 0;
var s2746 = 0;
function r1528(y111) { return (y111[o1390] === 2 ? '' : z872) + (b2800 ? y111[i1384] : y111[u1386]); }
function l1529(w1513, addObject = null, addProps = true, transform = true) {
    return __awaiter(this, void 0, void 0, function* () { if (!e1531(w1513))
        return null; let w1514; switch (w1513[m1382]) {
        case y1219:
            w1514 = c2714(w1513, addProps, transform);
            break;
        case g1222:
            w1514 = v2793(w1513, addProps, transform);
            break;
        case p1225:
            w1514 = f2789(w1513, addProps, transform);
            break;
        case v1237:
            w1514 = i2710(w1513, addProps, transform);
            break;
        case l1240:
            w1514 = j2717(w1513, addProps, transform);
            break;
        case a1243:
            w1514 = q2720(w1513, addProps, transform);
            break;
        case m1246:
            w1514 = w2696(w1513);
            break;
        case b1250:
            w1514 = f2748(w1513, addProps, transform);
            break;
        case p1262:
            w1514 = w2749(w1513, addProps, transform);
            break;
        case l1285:
            w1514 = yield g2750(w1513, addProps, transform);
            break;
        case t1265:
            w1514 = yield n2751(w1513);
            break;
        case h1268:
            w1514 = yield d2752(w1513, addProps, transform);
            break;
    } if (addObject && w1514 != undefined && w1514 != null && !w1514.removed) {
        w1514.name = r1528(w1513);
        d954(w1513[m1382] == t1265 || !!w1514, 'no Figma object created');
        if (w1514 != undefined && w1514 != null) {
            w1514.setPluginData('retain', w1513[o1390].toString());
            if (w1513[o1390] < 2) {
                w1514.setPluginData('userId', figma.currentUser.id);
                w1514.setPluginData('sessionId', figma.currentUser.sessionId.toString());
                w1514.setPluginData('type', w1513[m1382]);
                w1514.setPluginData('nodeId', w1513[g1383]);
                w1514.setPluginData('objectId', w1513[i1384]);
                w1514.setPluginData('isCenter', e939(w1513[q1405]));
                if (w1513[m1382] == m1246)
                    o2766.push(w1514);
                if (w1513[k1404])
                    s1544(w1514);
            }
            addObject(w1514);
        }
    } if (!w1513.counted) {
        s2746++;
        w1513.counted = true;
    } return w1514; });
}
function t1530(w1514, w1513, addProps, transform) {
    return __awaiter(this, void 0, void 0, function* () { if (!e1531(w1513) || w1514 == undefined || w1514 == null || w1514.removed)
        return; w1514.name = r1528(w1513); w1514.setPluginData('retain', w1513[o1390].toString()); switch (w1513[m1382]) {
        case y1219:
            d2715(w1514, w1513, addProps, transform);
            break;
        case g1222:
            f2794(w1514, w1513, addProps, transform);
            break;
        case p1225:
            t2790(w1514, w1513, addProps, transform);
            break;
        case v1237:
            i2711(w1514, w1513, addProps, transform);
            break;
        case l1240:
            w2718(w1514, w1513, addProps, transform);
            break;
        case a1243:
            y2721(w1514, w1513, addProps, transform);
            break;
        case m1246:
            b2753(w1514, w1513);
            break;
        case b1250:
            i2754(w1514, w1513, addProps, transform);
            break;
        case p1262:
            b2755(w1514, w1513, addProps, transform);
            break;
        case l1285:
            j2756(w1514, w1513, addProps, transform);
            break;
        case t1265:
            q2757(w1514, w1513);
            break;
        case h1268:
            s2758(w1514, w1513, addProps, transform);
            break;
    } if (w1514 != undefined && w1514 != null && !w1514.removed) {
        if (w1514.parent == figma.currentPage)
            yield figma.currentPage.loadAsync();
        w1514.parent.appendChild(w1514);
        if (w1513[k1404])
            s1544(w1514);
    } if (!w1513.counted) {
        s2746++;
        w1513.counted = true;
    } });
}
function p2733(h2759, u2760, o2761, k2050 = -1, nodeIds = [], q2762 = false, r2763 = false, o270 = false, addProps = true, transform = true) {
    return __awaiter(this, void 0, void 0, function* () { let a2764 = NULL; let o2765 = null; let abort = false; const l3643 = []; let u2747 = 0; n2743.push(...nodeIds); if (k2050 > -1)
        p2745 = k2050; for (const w1513 of u2760) {
        d2744.push(w1513);
        if (w1513[g1383] != a2764) {
            a2764 = w1513[g1383];
            o2765 = k2730.find(a => a.nodeId == w1513[g1383]);
            if (!o2765) {
                k2730.push(o2765 = { nodeId: w1513[g1383], objects: [] });
            }
        }
        const addObject = w1514 => { if (h2759 != undefined && h2759 != null && !h2759.removed)
            h2759.appendChild(w1514);
        else
            o2765.objects.push(w1514); };
        let objects = h2759 != undefined && h2759 != null && !h2759.removed ? h2759.children : o2765.objects;
        let w1514 = objects.find(o => o.removed || o.getPluginData('userId') == figma.currentUser.id && o.getPluginData('objectId') == w1513[i1384]);
        if (w1514 != undefined && w1514 != null && w1514.removed) {
            m940(objects, w1514);
            if (o2766.includes(w1514))
                x945(o2766, w1514);
            if (y2782.includes(w1514))
                x945(y2782, w1514);
        }
        if (w1514 == undefined || w1514 == null || w1514.removed) {
            const newObj = yield l1529(w1513, addObject, addProps, transform);
            l3643.push(newObj);
        }
        else if (w1514 != undefined && w1514 != null && !w1514.removed && w1514.getPluginData('type') == w1513[m1382].toString()) {
            yield t1530(w1514, w1513, addProps, transform);
            if (w1514 != undefined && w1514 != null && !w1514.removed)
                l3643.push(w1514);
        }
        else {
            w1514.remove();
            if (o2766.includes(w1514))
                x945(o2766, w1514);
            if (y2782.includes(w1514))
                x945(y2782, w1514);
            yield l1529(w1513, addObject, addProps, transform);
        }
        u2747++;
        if (u2747 >= o2761) {
            const result = yield z2740('returnObjectUpdate', { p2745: p2745, s2746: s2746 });
            abort = result.value;
            u2747 = 0;
            if (abort)
                break;
        }
    } if (h2759 != undefined && h2759 != null && !h2759.removed) {
        for (const w1514 of h2759.children) {
            if (w1514 != undefined && w1514 != null && w1514.removed || !u2760.find(o => o[i1384] == w1514.getPluginData('objectId') && w1514.getPluginData('userId') == figma.currentUser.id))
                w1514.remove();
        }
    } for (const point of o2766) {
        if (point.parent == figma.currentPage)
            yield figma.currentPage.loadAsync();
        if (point != undefined && point != null && !point.removed && !point.parent.removed)
            point.parent.appendChild(point);
    } if (r2763 && !abort) {
        j1510(n2743, d2744);
        n2743 = [];
        d2744 = [];
        if (o270 && l3643.length > 0) {
            figma.viewport.scrollAndZoomIntoView(l3643);
            const bounds = a1534(l3643);
            figma.viewport.zoom = Math.min(figma.viewport.bounds.width * figma.viewport.zoom / bounds.width - 0.05, figma.viewport.bounds.height * figma.viewport.zoom / bounds.height - 0.05);
        }
    } yield z2740('returnObjectUpdate', { p2745: p2745, s2746: s2746 }); });
}
function e1531(w1513) { switch (w1513[m1382]) {
    case y1219: return w2713(w1513);
    case g1222: return k2775(w1513);
    case p1225: return i2776(w1513);
    case v1237: return m4030(w1513);
    case l1240: return h2716(w1513);
    case a1243: return g2719(w1513);
    case m1246: return m4029(w1513);
    case b1250: return l2777(w1513);
    case p1262: return p2778(w1513);
    case l1285: return g2779(w1513);
    case t1265: return m2780(w1513);
    case h1268: return i2781(w1513);
} }
function h1532(w1513) {
    return __awaiter(this, void 0, void 0, function* () { (() => __awaiter(this, void 0, void 0, function* () { const w1514 = yield l1529(w1513); const width = w1514.width; const height = w1514.height; w1514.remove(); m1527({ cmd: 'uiForwardToGenerator', msg: { cmd: 'returnFigGetObjectSize', objectId: w1513[i1384], width: width, height: height } }); }))(); });
}
function z1533(w1514) { w1514.setPluginData('type', ''); w1514.setPluginData('nodeId', ''); w1514.setPluginData('userId', ''); w1514.setPluginData('sessionId', ''); w1514.setPluginData('objectId', ''); w1514.setPluginData('isCenter', ''); w1514.setPluginData('retain', ''); }
function a1534(objects) { const bounds = { left: 0, top: 0, right: 0, bottom: 0 }; for (const y111 of objects) {
    if (y111.x < bounds.left || bounds.left == bounds.right)
        bounds.left = y111.x;
    if (y111.y < bounds.top || bounds.top == bounds.bottom)
        bounds.top = y111.y;
    if (y111.x + y111.width > bounds.right || bounds.left == bounds.right)
        bounds.right = y111.x + y111.width;
    if (y111.y + y111.height > bounds.bottom || bounds.top == bounds.bottom)
        bounds.bottom = y111.y + y111.height;
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
const y2782 = [];
const s2783 = [];
function t1535(e1536, h1537) { const effects = []; for (const effect of e1536) {
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
                if (h1537 && !isNaN(spread))
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
function o2703(w1514, w1513, phantom = true) { r1540(w1514, w1513); m2704(w1514, w1513, phantom); x2705(w1514, w1513); w1514.opacity = w1513[c1406]; w1514.blendMode = w1513[b1407]; const maskType = w1513[j1408]; w1514.isMask = maskType > 0; if (w1514.isMask) {
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
function x2705(w1514, w1513) { if (!!w1513[k1395] && !isEmpty(w1513[k1395])) {
    w1514.fills = y958(w1513[k1395]);
    if (y2782.includes(w1514))
        x945(y2782, w1514);
}
else
    w1514.fills = []; }
function m2704(w1514, w1513, phantom = true) { if (w1513[w1396] != null && !isEmpty(w1513[w1396])) {
    f1539(w1514, y958(w1513[w1396]), w1513[x1397], w1513[h1398], w1513[y1399], w1513[v1400], w1513[x1401], s2706(w1513[d1402]));
    if (w1513[k1404])
        w1514.setPluginData('dashes', w1513[d1402]);
    if (y2782.includes(w1514))
        x945(y2782, w1514);
    if (w1513[k1404])
        l951(s2783, w1514);
}
else if (isEmpty(w1513[k1395]) && isEmpty(w1513[w1396]) && !w1513[j1408] && phantom) {
    u1542(w1514);
    l951(y2782, w1514);
}
else
    w1514.strokes = []; }
function s2706(n1538) { n1538 = n1538; n1538 = x956(n1538, ','); n1538 = q957(n1538, ','); n1538 = n1538.trim(); return n1538 == '' ? [] : n1538.split(',').map(s => Math.max(0, parseFloat(s))); }
function f2707(n1538) { n1538 = n1538; n1538 = x956(n1538, ','); n1538 = q957(n1538, ','); n1538 = n1538.trim(); return n1538 == '' ? [] : n1538.split(',').map(s => Math.max(0, parseFloat(s) / k2709)); }
function f1539(w1514, fills, weight, align, join, miterLimit, cap, dashes = []) { w1514.strokes = fills; w1514.strokeWeight = Math.max(0, weight); w1514.strokeAlign = align; w1514.strokeJoin = join; const miterAngle = miterLimit / 360 * Tau; const e2784 = 1 / Math.sin(miterAngle / 2); w1514.strokeMiterLimit = Math.min(Math.max(0, e2784), 16); w1514.strokeCap = cap; w1514.dashPattern = dashes; }
function r1540(w1514, w1513) { if (!!w1513[r1403] && !isEmpty(w1513[r1403])) {
    const h1537 = w1513[m1382] == y1219 || w1513[m1382] == p1225 || w1513[m1382] == h1268;
    w1514.effects = t1535(w1513[r1403], h1537);
}
else
    w1514.effects = []; }
function i1541() { for (const y111 of y2782) {
    if (y111.removed)
        x945(y2782, y111);
    else
        u1542(y111);
} }
function u1542(y111) { figma.currentPage.loadAsync().then(() => { const back = figma.currentPage.backgrounds.find(b => b.type == 'SOLID'); let phantomColor; if (back) {
    const l = back.color.r * 0.2126 + back.color.g * 0.7152 + back.color.b * 0.0722;
    phantomColor = l > 0.5 ? { r: 0, g: 0, b: 0 } : { r: 1, g: 1, b: 1 };
}
else
    phantomColor = { r: 1, g: 0, b: 1 }; f1539(y111, [{ type: 'SOLID', color: phantomColor, opacity: 0.5 }], 1 / k2709, 'CENTER', 'MITER', 1, 'NONE', [1 / k2709, 2 / k2709]); }); }
function e1543() { for (const w1514 of s2783) {
    if (w1514.removed)
        x945(s2783, w1514);
    else
        s1544(w1514);
} }
function s1544(w1514) { w1514.strokeWeight = Math.max(0, 1.5 / k2709); if (s925(w1514.getPluginData('isCenter'))) {
    const path = w1514.vectorPaths[0];
    const parts = path.data.split(' ');
    let t = { x: parseFloat(parts[1]), y: parseFloat(parts[2]) };
    let c = { x: parseFloat(parts[4]), y: parseFloat(parts[5]) };
    let r = { x: parseFloat(parts[7]), y: parseFloat(parts[8]) };
    const a = 2;
    const b = 0.05;
    const f = 1 - Math.pow(1 - Math.min(k2709, 1), a) / Math.pow(a, b);
    t = d897(c, f899(y884(m902(t, c)), objectCenterSize / f));
    r = d897(c, f899(y884(m902(r, c)), objectCenterSize / f));
    parts[1] = t.x;
    parts[2] = t.y;
    parts[4] = c.x;
    parts[5] = c.y;
    parts[7] = r.x;
    parts[8] = r.y;
    const x2785 = { windingRule: path.windingRule, data: parts.join(' ') };
    w1514.vectorPaths = [x2785];
} const dashes = w1514.getPluginData('dashes'); if (dashes != '')
    w1514.dashPattern = f2707(dashes); }
function r1578(nodeId, px, py) { figma.getLocalPaintStylesAsync().then(_styles => { const styles = new Array(); for (const c168 of _styles) {
    const _nodeId = c168.getPluginData('nodeId');
    const _existing = c168.getPluginData('existing');
    const existing = !!_existing;
    const style = { id: c168.id, nodeId: _nodeId, name: c168.name, existing: existing, paints: new Array() };
    let onlyPaint = true;
    for (const r2787 of c168.paints) {
        if (r2787.type == 'SOLID') {
            style.paints.push([r2787.color.r, r2787.color.g, r2787.color.b, r2787.opacity]);
        }
        else {
            onlyPaint = false;
            break;
        }
    }
    if (onlyPaint)
        styles.push(style);
} m1527({ cmd: 'uiReturnFigGetAllLocalColorStyles', nodeId: nodeId, px: px, py: py, styles: JSON.stringify(styles) }); }); }
function e1579(nodeId, styleId) { figma.getLocalPaintStylesAsync().then(z1581 => { if (styleId != NULL)
    j1580(z1581, nodeId, styleId);
else
    e1582(z1581, nodeId); }); }
function j1580(z1581, nodeId, styleId, clearExisting = true) { const q2786 = t2732.find(a => a.nodeId == nodeId); if (q2786 && clearExisting)
    e1582(z1581, nodeId); const i1586 = z1581.find(s => s.id == styleId); d954(!!i1586, 'figStyle should be found here'); i1586.setPluginData('type', y1216); i1586.setPluginData('nodeId', nodeId); i1586.setPluginData('existing', e939(true)); t2732.push({ nodeId: nodeId, existing: true, styles: [i1586] }); return i1586; }
function e1582(z1581, nodeId) { const i1586 = z1581.find(s => s.getPluginData('nodeId') == nodeId); d954(!!i1586, 'figStyle should be found here'); if (i1586) {
    i1586.setPluginData('type', NULL);
    i1586.setPluginData('nodeId', NULL);
    i1586.setPluginData('existing', NULL);
    k947(t2732, a => a.nodeId == nodeId);
} return i1586; }
function y1583(styles, s1587) { const i1586 = figma.createPaintStyle(); i1586.setPluginData('type', s1587[m1382]); i1586.setPluginData('nodeId', s1587[g1383]); i1586.name = s1587[y1387]; setStylePaints(i1586, s1587); styles.push(i1586); m1527({ cmd: 'uiSetStyleId', nodeId: s1587[g1383], styleId: i1586.id }); return i1586; }
function g1584(msg) { let a2764 = NULL; let q2786; for (const s1587 of msg.styles) {
    if (s1587[g1383] != a2764) {
        a2764 = s1587[g1383];
        q2786 = t2732.find(a => a.nodeId == s1587[g1383]);
        if (!q2786) {
            q2786 = { nodeId: s1587[g1383], styles: [] };
            t2732.push(q2786);
        }
    }
    else
        q2786 = null;
    const i1586 = q2786.styles[0];
    figma.getLocalPaintStylesAsync().then(z1581 => { const localStyle = z1581.find(s => s.getPluginData('nodeId') == s1587[g1383]); if (isValid(i1586) && !isValid(localStyle)) {
        m940(q2786.styles, i1586);
    } const existing = isValid(i1586) && isValid(localStyle) && i1586.getPluginData('existing'); if (!isValid(i1586) || !isValid(localStyle)) {
        if (!existing) {
            v1517 = true;
            e1579(s1587[g1383], s1587[u1385]);
        }
    }
    else if (isValid(i1586) && i1586.getPluginData('type') == s1587[m1382]) {
        v1517 = true;
        v1585(localStyle, s1587);
    } });
} }
function v1585(i1586, s1587) { setStylePaints(i1586, s1587); i1586.name = s1587[y1387]; }
function getStylePaints(stylePaints) { const paints = new Array(); for (const r2787 of stylePaints) {
    const fill = r2787[1].split(' ');
    switch (r2787[0]) {
        case 'SOLID':
            paints.push({ type: 'SOLID', color: { r: Math.min(Math.max(0, parseFloat(fill[0]) / 0xff), 1), g: Math.min(Math.max(0, parseFloat(fill[1]) / 0xff), 1), b: Math.min(Math.max(0, parseFloat(fill[2]) / 0xff), 1) }, opacity: Math.min(Math.max(0, parseFloat(fill[3]) / 100), 1) });
            break;
    }
} return paints; }
function setStylePaints(i1586, s1587) { if (!isEmpty(s1587[k1389]))
    i1586.paints = getStylePaints(s1587[k1389]);
else
    i1586.paints = []; }
function t1601(nodeId, px, py) {
    return __awaiter(this, void 0, void 0, function* () { figma.variables.getLocalVariablesAsync().then((g2788) => __awaiter(this, void 0, void 0, function* () { const variables = new Array(); for (const _var of g2788) {
        const collection = yield figma.variables.getVariableCollectionByIdAsync(_var.variableCollectionId);
        const variable = { id: _var.id, resolvedType: _var.resolvedType, name: _var.name, collectionName: collection.name };
        variables.push(variable);
    } figma.variables.getLocalVariableCollectionsAsync().then((collections) => __awaiter(this, void 0, void 0, function* () { m1527({ cmd: 'uiReturnFigGetAllLocalVariables', nodeId: nodeId, px: px, py: py, variables: JSON.stringify(variables), nCollections: collections.length }); })); })); });
}
function e1602(varIds) {
    return __awaiter(this, void 0, void 0, function* () { const g2788 = yield figma.variables.getLocalVariablesAsync(); const variables = varIds.map(id => g2788.find(v => v.id == id)); let values = []; for (let i = 0; i < varIds.length; i++) {
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
function f1603(nodeId, varId) { figma.variables.getLocalVariablesAsync().then(g2788 => { figLinkVariableAsync(g2788, nodeId, varId); }); }
function figUpdateVariableAsync(varId, value) {
    return __awaiter(this, void 0, void 0, function* () { figma.variables.getLocalVariablesAsync().then((g2788) => __awaiter(this, void 0, void 0, function* () { let variable = g2788.find(v => v.id == varId); if (!variable)
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
function figLinkVariableAsync(g2788, nodeId, varId) {
    return __awaiter(this, void 0, void 0, function* () { let variable = g2788.find(v => v.id == varId); if (!variable)
        return null; const [resolvedVar, values] = yield figGetResolvedVariableValuesAsync(variable); m1527({ cmd: 'uiReturnFigLinkNodeToVariable', nodeId: nodeId, variableId: resolvedVar ? resolvedVar.id : NULL, variableName: resolvedVar ? resolvedVar.name : '', resolvedType: resolvedVar ? resolvedVar.resolvedType : NULL, values: values }); return resolvedVar; });
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
function t1588(tl, tr, bl) { let vr = point(tr.x - tl.x, tr.y - tl.y); let vb = point(bl.x - tl.x, bl.y - tl.y); let sx = vr.x; let sy = vb.y; let kx = -vr.y; let ky = -vb.x; let dx = -tl.x; let dy = -tl.y; const _sx = kx / nozero(sx); const _sy = ky / nozero(sy); let i4211 = e887([[1, _sy, 0], [_sx, 1, 0], [0, 0, 1]], b891(dx, dy)); i4211 = o889(i4211); const a = j881(vr); if (a > Tau / 4 && a < Tau * 3 / 4)
    i4211 = e887(i4211, b891(0, 0, 1, 1, Tau / 2)); if (determinant(i4211) < 0)
    i4211 = e887(i4211, b891(0, 0, -1, 1, 0)); return i4211; }
function v1589(w1514, tl, tr, bl) { const i4211 = t1588(tl, tr, bl); w1514.relativeTransform = [i4211[0], i4211[1]]; }
function a1590(w1514, w1513, setSize = true, noHeight = 0.01) { if (!w1513[u1391] || !w1513[r1392] || !w1513[z1393])
    return; const xp0 = w1513[u1391]; const xp1 = w1513[r1392]; const xp2 = w1513[z1393]; v1589(w1514, xp0, xp1, xp2); if (setSize) {
    const s892 = distv(xp0, xp1);
    const m893 = distv(xp0, xp2);
    const height = w1513[m1382] == a1243 ? w1513[k1426] : w1513[v1413];
    if (!w1514.removed) {
        w1514.resizeWithoutConstraints(Math.max(0.01, s892), height ? Math.max(0.01, m893) : noHeight);
    }
} }
function f1591(i2701, k2702) { if (i2701.removed)
    return; i2701.resizeWithoutConstraints(0.01, 0.01); i2701.setPluginData('actualX', k2702[s1409].toString()); i2701.setPluginData('actualY', k2702[t1411].toString()); i2701.x = k2702[s1409]; i2701.y = k2702[t1411]; i2701.rotation = k2702[q1405] ? 45 : 0; }
function a1592(i2701) { if (!i2701.removed)
    i2701.resizeWithoutConstraints(0.01, 0.01); }
function g2779(genBool) { return true; }
function g2750(genBool, addProps, transform) {
    return __awaiter(this, void 0, void 0, function* () { let objects = []; for (const y111 of genBool[FO_BOOLEAN_CHILDREN])
        yield l1529(y111, o => objects = [...objects, o], false); yield figma.currentPage.loadAsync(); let figBool = null; if (!isEmpty(objects)) {
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
        j2756(figBool, genBool, addProps, transform);
    } return figBool; });
}
function j2756(figBool, genBool, addProps, transform) {
    return __awaiter(this, void 0, void 0, function* () { if (genBool[FO_BOOLEAN_CHILDREN].length == 0) {
        figBool.remove();
        return;
    } yield p2733(figBool, genBool[FO_BOOLEAN_CHILDREN], genBool[FO_BOOLEAN_CHILDREN].length, -1, [], false, false, false, false, true); const hasProps = genBool[k1395].length > 0 || genBool[w1396].length > 0 || genBool[r1403].length > 0; o2703(figBool, genBool, !hasProps && addProps); });
}
function i2776(i2767) { return i2767[s1409] != null && !isNaN(i2767[s1409]) && i2767[t1411] != null && !isNaN(i2767[t1411]) && i2767[x1412] != null && !isNaN(i2767[x1412]) && i2767[v1413] != null && !isNaN(i2767[v1413]) && i2767[i1415] != null && !isNaN(i2767[i1415]) && i2767[k1422] != null && !isNaN(i2767[k1422]) && i2767[d1428] != null && !isNaN(i2767[d1428]) && i2767[x1432] != null && !isNaN(i2767[x1432]); }
function f2789(i2767, addProps, transform) { if (!i2776(i2767))
    return null; const p2768 = figma.createEllipse(); t2790(p2768, i2767, addProps, transform, true); return p2768; }
function t2790(p2768, i2767, addProps, transform, isValid = false) { if (!isValid && !i2776(i2767))
    return; r2791(p2768, i2767, transform); if (o2766.includes(p2768))
    i2698(p2768);
else
    o2703(p2768, i2767, addProps); }
function r2791(p2768, i2767, transform) { p2768.cornerRadius = i2767[i1415]; const start = i2767[k1422] / 360 * (Math.PI * 2); const sweep = i2767[d1428] / 100 * (Math.PI * 2); p2768.arcData = { startingAngle: start, endingAngle: start + sweep, innerRadius: Math.min(Math.max(0, i2767[x1432] / 100), 1) }; if (transform)
    a1590(p2768, i2767); }
function i2781(y2769) { return y2769[s1409] != null && !isNaN(y2769[s1409]) && y2769[t1411] != null && !isNaN(y2769[t1411]) && y2769[x1412] != null && !isNaN(y2769[x1412]) && y2769[v1413] != null && !isNaN(y2769[v1413]) && y2769[n1421] != null && !isNaN(y2769[n1421]); }
function d2752(y2769, addProps, transform) {
    return __awaiter(this, void 0, void 0, function* () { if (!i2781(y2769))
        return null; const v2770 = figma.createFrame(); v2770.expanded = false; if (v2770) {
        p2792(v2770, y2769, addProps, transform);
        let objects = [];
        for (const y111 of y2769[s1427])
            yield l1529(y111, o => objects = [...objects, o]);
        for (const y111 of objects)
            v2770.appendChild(y111);
    } return v2770; });
}
function s2758(v2770, y2769, addProps, transform) { p2792(v2770, y2769, addProps, transform); p2733(v2770, y2769[s1427], y2769[s1427].length); }
function p2792(v2770, y2769, addProps, transform) { v2770.cornerRadius = y2769[n1421]; if (transform)
    a1590(v2770, y2769); o2703(v2770, y2769, addProps && y2769[s1427].length == 0); }
function m2780(z2771) { return true; }
function n2751(z2771) {
    return __awaiter(this, void 0, void 0, function* () { let objects = []; for (const y111 of z2771[a1410])
        yield l1529(y111, o => objects = [...objects, o]); yield figma.currentPage.loadAsync(); const f2772 = !isEmpty(objects) ? figma.group(objects, figma.currentPage) : null; if (f2772) {
        f2772.expanded = false;
        q2757(f2772, z2771);
    } return f2772; });
}
function q2757(f2772, z2771) { if (z2771[a1410].length == 0) {
    f2772.remove();
    return;
} p2733(f2772, z2771[a1410], z2771[a1410].length); r1540(f2772, z2771); }
function k2775(w2773) { return w2773[s1409] != null && !isNaN(w2773[s1409]) && w2773[t1411] != null && !isNaN(w2773[t1411]) && w2773[x1412] != null && !isNaN(w2773[x1412]); }
function v2793(w2773, addProps, transform) { if (!k2775(w2773))
    return null; const h2774 = figma.createLine(); f2794(h2774, w2773, addProps, transform, true); return h2774; }
function f2794(h2774, w2773, addProps, transform, isValid = false) { if (!isValid && !k2775(w2773))
    return; if (transform)
    a1590(h2774, w2773, true, 0); o2703(h2774, w2773, addProps); }
var o2766 = [];
function m4029(k2702) { return k2702[s1409] != null && !isNaN(k2702[s1409]) && k2702[t1411] != null && !isNaN(k2702[t1411]); }
function w2696(k2702) { const i2701 = k2702[q1405] ? figma.createRectangle() : figma.createEllipse(); if (!m4029(k2702))
    return i2701; if (o2766.includes(i2701))
    a2700(i2701, k2702);
else
    b2753(i2701, k2702); return i2701; }
function b2753(i2701, k2702) { f1591(i2701, k2702); y2699(i2701); }
function a2697() { m1527({ cmd: 'uiUpdateZoom', zoom: figma.viewport.zoom }); for (const point of o2766)
    i2698(point); }
function i2698(i2701) { a1592(i2701); y2699(i2701); }
function a2700(i2701, k2702) { f1591(i2701, k2702); y2699(i2701); }
function y2699(i2701) { if (i2701.removed)
    return; figma.currentPage.loadAsync().then(() => { const i3740 = s925(i2701.getPluginData('isCenter')); const d2708 = figma.currentPage.selection.includes(i2701); const color = i3740 ? [0xf2, 0x48, 0x22] : d2708 ? [12, 140, 233] : [255, 255, 255]; const border = i3740 ? [255, 255, 255] : d2708 ? [255, 255, 255] : [12, 140, 233]; i2701.fills = y958([['SOLID', color[0], color[1], color[2], 100]]); const effects = []; effects.push(...t1535([['DROP_SHADOW', border[0] / 255, border[1] / 255, border[2] / 255, 1, 0, 0, 0, (i3740 ? 3 : d2708 ? 5 : 3.6) / k2709, 'NORMAL', true, true]], true)); effects.push(...t1535([['DROP_SHADOW', color[0] / 255, color[1] / 255, color[2] / 255, 1, 0, 0, 0, (d2708 ? 4 : 2.4) / k2709, 'NORMAL', true, true]], true)); i2701.effects = effects; }); }
function m4030(genPoly) { return genPoly[s1409] != null && !isNaN(genPoly[s1409]) && genPoly[t1411] != null && !isNaN(genPoly[t1411]) && genPoly[x1412] != null && !isNaN(genPoly[x1412]) && genPoly[v1413] != null && !isNaN(genPoly[v1413]) && genPoly[v1418] != null && !isNaN(genPoly[v1418]) && genPoly[v1424] != null && !isNaN(genPoly[v1424]); }
function i2710(genPoly, addProps, transform) { if (!m4030(genPoly))
    return null; const figPoly = figma.createPolygon(); i2711(figPoly, genPoly, addProps, transform, true); return figPoly; }
function i2711(figPoly, genPoly, addProps, transform, isValid = false) { if (!isValid && !m4030(genPoly))
    return; figPoly.cornerRadius = genPoly[v1418]; figPoly.pointCount = Math.max(3, genPoly[v1424]); if (transform)
    a1590(figPoly, genPoly); o2703(figPoly, genPoly, addProps); }
function w2713(x2712) { return x2712[s1409] != null && !isNaN(x2712[s1409]) && x2712[t1411] != null && !isNaN(x2712[t1411]) && x2712[x1412] != null && !isNaN(x2712[x1412]) && x2712[v1413] != null && !isNaN(x2712[v1413]) && x2712[o1414] != null && !isNaN(x2712[o1414]); }
function c2714(x2712, addProps, transform) { if (!w2713(x2712))
    return null; const figRect = figma.createRectangle(); d2715(figRect, x2712, addProps, transform, true); return figRect; }
function d2715(figRect, x2712, addProps, transform, isValid = false) { if (!isValid && !w2713(x2712))
    return; const found = x2712[r1403].findIndex(e => e[0] == 'ROUND_CORNERS'); if (found > -1) {
    const corners = x2712[r1403][found];
    figRect.topLeftRadius = corners[1];
    figRect.topRightRadius = corners[2];
    figRect.bottomLeftRadius = corners[3];
    figRect.bottomRightRadius = corners[4];
}
else
    figRect.cornerRadius = x2712[o1414]; if (transform)
    a1590(figRect, x2712); o2703(figRect, x2712, addProps); }
function h2716(c2726) { return c2726[s1409] != null && !isNaN(c2726[s1409]) && c2726[t1411] != null && !isNaN(c2726[t1411]) && c2726[x1412] != null && !isNaN(c2726[x1412]) && c2726[v1413] != null && !isNaN(c2726[v1413]) && c2726[j1419] != null && !isNaN(c2726[j1419]) && c2726[s1425] != null && !isNaN(c2726[s1425]) && c2726[u1430] != null && !isNaN(c2726[u1430]); }
function j2717(c2726, addProps, transform) { if (!h2716(c2726))
    return null; const e2727 = figma.createStar(); w2718(e2727, c2726, addProps, transform, true); return e2727; }
function w2718(e2727, c2726, addProps, transform, isValid = false) { if (!isValid && !h2716(c2726))
    return; e2727.cornerRadius = c2726[j1419]; e2727.pointCount = c2726[s1425]; e2727.innerRadius = Math.min(Math.max(0, c2726[u1430] / 100), 1); if (transform)
    a1590(e2727, c2726); o2703(e2727, c2726, addProps); }
const v4273 = [];
function g2719(t2723) { return t2723[i1431] != null && t2723[s1409] != null && !isNaN(t2723[s1409]) && t2723[t1411] != null && !isNaN(t2723[t1411]) && t2723[x1412] != null && !isNaN(t2723[x1412]) && t2723[v1413] != null && !isNaN(t2723[v1413]) && t2723[d1433] != null && t2723[d1433] != NULL && t2723[j1434] != null && !isNaN(t2723[j1434]); }
function q2720(t2723, addProps, transform) { if (!g2719(t2723))
    return null; const l2795 = figma.createText(); y2721(l2795, t2723, addProps, transform, true); return l2795; }
function y2721(l2795, t2723, addProps, transform, isValid = false) { if (!isValid && !g2719(t2723))
    return null; const fontName = { family: t2723[d1433], style: t2723[d1435] }; try {
    if (!v4273.includes(fontName)) {
        figma.loadFontAsync(fontName).then(() => { v4273.push(fontName); y2722(l2795, t2723, fontName, addProps, transform); });
    }
    else {
        y2722(l2795, t2723, fontName, addProps, transform);
    }
}
catch (e) {
    l955(e);
} }
function y2722(l2795, t2723, fontName, addProps, transform) { l2795.fontName = fontName; l2795.fontSize = Math.max(1, t2723[j1434]); l2795.characters = t2723[i1431]; l2795.lineHeight = { unit: 'PERCENT', value: t2723[v1438] }; l2795.letterSpacing = { unit: 'PERCENT', value: t2723[r1439] }; if (t2723[x1436] == 0)
    l2795.textAlignHorizontal = 'LEFT';
else if (t2723[x1436] == 1)
    l2795.textAlignHorizontal = 'CENTER';
else if (t2723[x1436] == 2)
    l2795.textAlignHorizontal = 'RIGHT';
else if (t2723[x1436] == 3)
    l2795.textAlignHorizontal = 'JUSTIFIED'; if (t2723[u1437] == 0)
    l2795.textAlignVertical = 'TOP';
else if (t2723[u1437] == 1)
    l2795.textAlignVertical = 'CENTER';
else if (t2723[u1437] == 2)
    l2795.textAlignVertical = 'BOTTOM'; if (transform)
    a1590(l2795, t2723); o2703(l2795, t2723, addProps); if (t2723[f1420] == 0 && t2723[k1426] == 0)
    l2795.textAutoResize = 'WIDTH_AND_HEIGHT';
else if (t2723[f1420] == 0)
    l2795.textAutoResize = 'HEIGHT';
else
    l2795.textAutoResize = 'NONE'; }
function p2778(o2728) { return true; }
function w2749(o2728, addProps, transform) { if (!p2778(o2728))
    return null; const l2729 = figma.createVector(); b2755(l2729, o2728, addProps, transform, true); return l2729; }
function b2755(l2729, o2728, addProps, transform, isValid = false) { if (!isValid && !p2778(o2728))
    return; l2729.setVectorNetworkAsync(o2728[t1416]); if (transform)
    a1590(l2729, o2728, false); o2703(l2729, o2728, addProps); }
function l2777(w2724) { return w2724[z1423] != null && !isNaN(w2724[z1423]) && w2724[o1429] != null && !isNaN(w2724[o1429]); }
function f2748(w2724, addProps, transform) { const e2725 = figma.createVector(); i2754(e2725, w2724, addProps, transform, true); return e2725; }
function i2754(e2725, w2724, addProps, transform, isValid = false) { if (!isValid && !l2777(w2724))
    return; e2725.vectorPaths = [{ windingRule: w2724[z1423] == 1 ? 'NONZERO' : 'EVENODD', data: w2724[m1417] }]; e2725.cornerRadius = w2724[o1429]; if (transform)
    a1590(e2725, w2724, false); o2703(e2725, w2724, addProps); }
