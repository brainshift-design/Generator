var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function w1051(key, tag) { return key.substring(0, tag.length + 1) == tag + ' '; }
function a1052(key, tag) { return key.substring(tag.length + 1); }
function v1053(key) { return w1051(key, l875); }
function j1054(key) { return w1051(key, u873); }
function a1055(key) { return w1051(key, x874); }
function b1056(key) { return a1052(key, l875); }
function a1057(key) { return a1052(key, u873); }
function p1058(key) { return a1052(key, x874); }
const generatorVersion = 390;
const d867 = 2147483647;
const NULL = '';
const j868 = '  ';
const b869 = '    ';
const o870 = '\n';
const d871 = '◦ G •';
const k872 = d871 + ' ';
const u873 = 'G_NODE';
const x874 = 'G_CONN';
const l875 = 'G_PAGE';
const y876 = 'G_TEMP';
const minWindowWidth = 602;
const minWindowHeight = 39;
const identity = Object.freeze([[1, 0, 0], [0, 1, 0], [0, 0, 1]]);
const Epsilon = 0.0000001;
const Tau = Math.PI * 2;
var p2540 = false;
function b877(x, eps = 0.000000001) { return Math.abs(x) < eps ? 0 : x; }
function nozero(x, eps = 0.000000001) { return x != 0 ? x : (x < 0 ? -eps : eps); }
function r878(v, eps = 0.000000001) { return point(nozero(v.x, eps), nozero(v.y, eps)); }
function equal(a, b, eps = 0.000000001) { return Math.abs(b - a) < eps; }
function sqr(x) { return x * x; }
;
function cube(x) { return x * x * x; }
;
function d879(f) { return Math.floor(f) | 0; }
function k880(x) { x = d879(x); x--; x |= x >> 1; x |= x >> 2; x |= x >> 4; x |= x >> 8; x |= x >> 16; x |= x >> 32; return ++x; }
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
function y883(v) { return Math.sqrt(v.x * v.x + v.y * v.y); }
function lengthv_(x, y) { return Math.sqrt(x * x + y * y); }
function w884(v) { return point(v.x == 0 ? 0 : v.x / y883(v), v.y == 0 ? 0 : v.y / y883(v)); }
function dotv(v1, v2) { return v1.x * v2.x + v1.y * v2.y; }
function d885(a1, a2) { let diff = a2 - a1; while (diff <= -Tau / 2)
    diff += Tau; while (diff > Tau / 2)
    diff -= Tau; return diff; }
function q886(v, m) { let v3 = [v.x, v.y, 1]; let r = b950(v3, m); return point(r[0], r[1]); }
function t887(...mm) { c954(mm.length > 0, 'mulm3m3() must take at least one argument'); let result = clone(mm[0]); for (let a = 1; a < mm.length; a++) {
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
function p888(m, s) { for (let i = 0; i < 3; i++)
    for (let j = 0; j < 3; j++)
        m[i][j] /= s; return m; }
function adjugate(m) { return cofactor(transpose(m)); }
function transpose(m) { return [[m[0][0], m[1][0], m[2][0]], [m[0][1], m[1][1], m[2][1]], [m[0][2], m[1][2], m[2][2]]]; }
function cofactor(m) { return [[m[1][1] * m[2][2] - m[2][1] * m[1][2], -(m[1][0] * m[2][2] - m[2][0] * m[1][2]), m[1][0] * m[2][1] - m[2][0] * m[1][1]], [-(m[0][1] * m[2][2] - m[2][1] * m[0][2]), m[0][0] * m[2][2] - m[2][0] * m[0][2], -(m[0][0] * m[2][1] - m[2][0] * m[0][1])], [m[0][1] * m[1][2] - m[1][1] * m[0][2], -(m[0][0] * m[1][2] - m[1][0] * m[0][2]), m[0][0] * m[1][1] - m[1][0] * m[0][1]]]; }
function determinant(m) { return m[0][0] * (m[1][1] * m[2][2] - m[1][2] * m[2][1]) - m[0][1] * (m[1][0] * m[2][2] - m[2][0] * m[1][2]) + m[0][2] * (m[1][0] * m[2][1] - m[2][0] * m[1][1]); }
function t889(m) { return p888(adjugate(m), determinant(m)); }
function a890(angle) { const cosA = b877(Math.cos(angle)); const sinA = b877(Math.sin(angle)); return [[cosA, sinA, 0], [-sinA, cosA, 0], [0, 0, 1]]; }
function q891(x = 0, y = 0, p892 = 1, l893 = 1, angle = 0, d894 = 0, d895 = 0) { const cosA = Math.cos(angle); const sinA = Math.sin(angle); return [[p892 * cosA - d895 * sinA, -d894 * cosA + l893 * sinA, x], [d895 * cosA + p892 * sinA, l893 * cosA + d894 * sinA, y], [0, 0, 1]]; }
function a896(v1, v2) { return v1.x * v2.y - v1.y * v2.x; }
function u897(v1, v2) { return point(v1.x + v2.x, v1.y + v2.y); }
function sqrv(v) { return v898(v, v); }
function v898(v1, v2) { return point(v1.x * v2.x, v1.y * v2.y); }
function r899(v, s) { return point(v.x * s, v.y * s); }
function s900(v1, v2) { return point(v1.x / v2.x, v1.y / v2.y); }
function t901(v, s) { return point(v.x / s, v.y / s); }
function r902(v1, v2) { return point(v1.x - v2.x, v1.y - v2.y); }
function e903(str) { return decodeURI(encodeURIComponent(str)); }
function u904(str) { return decodeURIComponent(encodeURI(str)); }
function u905(bytes) { let str = ''; for (let i = 0; i < bytes.length; i++)
    str += String.fromCharCode(bytes[i]); return str; }
function r906(str) { return Array.from(u904(str), c => c.charCodeAt(0)); }
function l907(array, size) { const newArray = new Uint8Array(size); z908(array, newArray); return newArray; }
function z908(src, dst) { e909(src, 0, src.length, dst, 0, dst.length); }
function e909(src, o910, u911, dst, e912, s913) { const size = Math.min(u911, s913); for (let i = 0; i < size; i++)
    dst[e912 + i] = src[o910 + i]; }
function f914(r915, c916) { if (r915.length != c916.length)
    return false; for (let i = 0; i < r915.length; i++) {
    if (r915[i] != c916[i])
        return false;
} return true; }
function o917(o918, q919) { return o918.findIndex(i => q919.includes(i)) > -1; }
function o920(list) { return list ? '<==' : '<--'; }
;
function z921(list) { return list ? '==>' : '-->'; }
;
function o922(nodeId) { return u873 + ' ' + nodeId; }
function p923(name) { return x874 + ' ' + name; }
function b924(name) { return l875 + ' ' + name; }
function x925(str) { return str.toLowerCase() == 'true' || str == '1'; }
function n926(y927, r928 = false) { return a933(y927.outputNodeId, y927.outputId, y927.outputOrder, y927.inputNodeId, y927.inputId, y927.list, r928); }
function t929(outputNodeId, outputId, outputOrder, inputNodeId, inputId) { return p923(outputNodeId + ' ' + outputId + ' ' + outputOrder + ' ' + inputNodeId + ' ' + inputId); }
function l930(u243) { return t929(u243.outputNodeId, u243.outputId, u243.outputOrder, u243.inputNodeId, u243.inputId); }
function e931(u243) { return t929(u243.output.node.id, u243.output.id, u243.outputOrder, u243.input.node.id, u243.input.id); }
function f932(u243, r928 = false) { return a933(u243.output.node.id, u243.output.id, u243.outputOrder, u243.input.node.id, u243.input.id, u243.list, r928); }
function a933(outputNodeId, outputId, outputOrder, inputNodeId, inputId, list, r928 = false) { const sp = r928 ? ' ' : '  '; const jsp = r928 ? '' : ' '; const arrow = sp + z937(typeof outputOrder == 'string' ? parseInt(outputOrder) : outputOrder) + z921(typeof list == 'string' ? x925(list) : list) + sp; const join = jsp + '.' + jsp; return outputNodeId + join + outputId + arrow + inputNodeId + join + inputId; }
function k934(pageId) { return b924(pageId); }
function q935(num) { const str = num.toString(); let sup = ''; for (const c of str)
    sup += e936(c); return sup; }
function e936(c) { switch (c) {
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
function z937(num) { const str = num.toString(); let sup = ''; for (const c of str)
    sup += e938(c); return sup; }
function e938(c) { switch (c) {
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
function b939(bool) { return bool ? 'true' : 'false'; }
function isValid(val) { return val != undefined && val != null; }
function isEmpty(array) { return array.length == 0; }
function m940(array, item) { e941(array, array.indexOf(item)); }
function e941(array, index) { if (index > -1 && index < array.length)
    array.splice(index, 1); }
function t942(array) { if (isEmpty(array))
    return null; let last = array.at(-1); array.splice(array.length - 1, 1); return last; }
function k943(array) { return array[array.length - 1]; }
function f944(array, from, to) { const item = array[from]; array.splice(from, 1); array.splice(to, 0, item); }
function f945(array, item) { const index = array.indexOf(item); if (index > -1)
    array.splice(index, 1); }
function l946(j2796, array) { for (const item of array) {
    const index = j2796.indexOf(item);
    if (index > -1)
        j2796.splice(index, 1);
} }
function x947(array, where) { const index = array.findIndex(where); if (index > -1)
    array.splice(index, 1); }
function g948(styleId) { return styleId.split(',')[0] + ','; }
function l949(points) { let o4035 = ''; if (points.length < 2)
    return o4035; o4035 += 'M'; o4035 += ' ' + b877(points[0].x); o4035 += ' ' + b877(points[0].y); for (let i = 1; i < points.length; i++) {
    o4035 += ' L' + ' ' + b877(points[i].x) + ' ' + b877(points[i].y);
} return o4035; }
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
        let b111 = {};
        for (const key in val)
            b111[key] = clone(val[key]);
        return b111;
    }
} throw 'unknown'; }
function m951(array, item, equal = null) { if (equal) {
    if (Array.isArray(item))
        item.forEach(i => m951(array, i, equal));
    else if (!array.find(i => equal(i, item)))
        array.push(item);
}
else {
    if (Array.isArray(item))
        item.forEach(i => m951(array, i));
    else if (!array.includes(item))
        array.push(item);
} }
function f952(array, item, equal) { if (Array.isArray(item))
    item.forEach(i => f952(array, i, equal));
else if (!array.find(equal))
    array.push(item); }
function f953(array, item, except) { if (Array.isArray(item))
    item.forEach(i => f953(array, i, except));
else if (!array.find(except))
    array.push(item); }
function c954(...args) { if (p2540) {
    console.assert(...args);
} }
function s955(...args) { if (p2540)
    console.error(...args); }
function f956(str, trim) { while (str.length >= trim.length && str.substring(0, trim.length) == trim)
    str = str.substring(trim.length); return str; }
function c957(str, trim) { while (str.length >= trim.length && str.substring(str.length - trim.length) == trim)
    str = str.substring(0, str.length - trim.length); return str; }
function d958(r4095) { const fills = []; for (const fill of r4095) {
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
function w959(type) { return k1092.includes(type); }
const m1059 = 'LIST#';
const q1060 = 'NLIST#';
const z1061 = 'TLIST#';
const z1062 = 'SLIST#';
const r1063 = 'NULL';
const t1064 = 'VAR';
const v1065 = 'VARGRP';
const p1066 = 'FEEDBK';
const d1067 = 'REPT';
const b1068 = 'CACHE';
const f1069 = 'FRZ';
const p1070 = 'TIMER';
const a1071 = 'VNAME';
const GET_LIST_VALUE_NAMES = 'GVNAMES';
const LIST_VALUE_NAMES = 'VNAMES';
const OBJECT_NAME = 'ONAME';
const f1072 = 'CMB';
const t1073 = 'LSASIT';
const y1074 = 'EXTR';
const f1075 = 'SETP';
const q1076 = 'GETP';
const a1077 = 'SUBLST';
const k1078 = 'UNIQ';
const REORDER_LIST = 'RORD';
const SHIFT_LIST = 'SHFTLST';
const t1079 = 'REVLST';
const b1080 = 'SORT';
const s1081 = 'CLMN';
const e1082 = 'CELL';
const o1083 = 'LIST';
const q1084 = 'COUNT';
const OBJECT_COUNT = 'OBJCOUNT';
const b1085 = 'LCONT';
const q1086 = 'SELECT';
const SELECT_FROM_LIST = 'LSTSEL';
const q1087 = 'IF';
const e1088 = 'LSTFLT';
const f1089 = 'ITER';
const c1090 = 'ANY#';
const a1091 = [m1059, q1060, z1061, z1062, f1072, y1074, f1075, q1076, a1077, o1083, q1084, b1085, d1067];
const k1092 = [m1059, q1060, z1061, z1062];
const v1093 = [r1063, t1064, v1065, ...a1091, t1073, y1074, f1075, q1076, a1077, k1078, REORDER_LIST, SHIFT_LIST, t1079, s1081, b1080, e1082, o1083, q1086, SELECT_FROM_LIST, q1087, e1088, p1066, d1067, f1089, b1068, f1069, p1070, a1071, GET_LIST_VALUE_NAMES, LIST_VALUE_NAMES, OBJECT_NAME];
const d1094 = 'NUM#';
const w1095 = 'NUM';
const NUMBER_PRECISION = 'NPREC';
const h1096 = 'NSIGN';
const g1097 = 'ABS';
const NUMBER_NEGATIVE = 'NEG';
const l1098 = 'ROUND';
const NUMBER_QUANTIZE = 'QUANT';
const k1099 = 'SMINMAX';
const u1100 = 'MINMAX';
const g1101 = 'LIM';
const n1102 = 'NCURVE';
const NUMBER_BIAS = 'NBIAS';
const s1103 = 'NANISNUM';
const o1104 = 'CONST';
const s1105 = 'DATE';
const r1106 = 'SEQ';
const h1107 = 'RANGE';
const x1108 = 'WAVE';
const e1109 = 'RAND';
const j1110 = 'NOISE';
const a1111 = 'PROB';
const p1112 = 'ACCUM';
const w1113 = 'LERP';
const l1114 = 'SOLVE';
const y1115 = 'NANIM';
const v1116 = 'SMATH';
const k1117 = 'MATH';
const b1118 = 'ADD';
const s1119 = 'SUB';
const e1120 = 'MUL';
const z1121 = 'DIV';
const z1122 = 'MOD';
const v1123 = 'EXP';
const c1124 = 'NBOOL';
const p1125 = 'NOT';
const q1126 = 'AND';
const k1127 = 'OR';
const q1128 = 'XOR';
const c1129 = 'COND';
const y1130 = 'EQ';
const j1131 = 'NE';
const p1132 = 'LT';
const a1133 = 'LE';
const z1134 = 'GT';
const u1135 = 'GE';
const e1136 = 'TRIG';
const m1137 = 'SIN';
const a1138 = 'COS';
const y1139 = 'TAN';
const k1140 = 'ATAN2';
const j1141 = 'CNVANG';
const t1142 = [k1117, v1116, b1118, s1119, e1120, z1121, z1122, v1123];
const a1143 = [c1124, p1125, q1126, k1127, q1128];
const v1144 = [c1129, y1130, j1131, p1132, a1133, z1134, u1135];
const c1145 = [e1136, m1137, a1138, y1139, k1140];
const k1146 = 'TEXT#';
const o1147 = 'TEXT';
const j1148 = 'TLEN';
const e1149 = 'TTRIM';
const b1150 = 'TSUB';
const w1151 = 'TCONT';
const f1152 = 'TCASE';
const t1153 = 'TREPL';
const g1154 = 'TJOIN';
const u1155 = 'TPAD';
const h1156 = 'TCMP';
const r1157 = 'TCHAR';
const p1158 = 'TUNI';
const z1159 = 'INDEX';
const b1160 = 'N2T';
const g1161 = 'C2T';
const r1162 = 'T2N';
const v1163 = 'T2C';
const g1164 = 'TSPLT';
const x3505 = 'TJSON';
const k1166 = 'TCSV';
const p1167 = 'FETCH';
const x1168 = 'TFILE';
const q1169 = [d1094, q1060, w1095, NUMBER_PRECISION, h1096, g1097, NUMBER_NEGATIVE, l1098, NUMBER_QUANTIZE, k1099, u1100, g1101, n1102, NUMBER_BIAS, s1103, o1104, s1105, r1106, h1107, x1108, e1109, j1110, p1112, w1113, l1114, y1115, b1160, r1157, ...t1142, ...a1143, ...v1144, ...c1145, j1141];
const t1170 = [k1146, z1061, o1147, j1148, e1149, b1150, w1151, f1152, g1154, u1155, t1153, h1156, p1158, z1159, r1162, v1163, g1164, x3505, k1166, p1167, x1168];
const i1171 = 'COL#';
const j1172 = 'COL';
const d1173 = 'CVAL';
const h1174 = 'CCOR';
const u1175 = 'COLP3';
const g1176 = 'CCNT';
const y1177 = 'BLND';
const a1178 = 'CLERP';
const a1179 = 'CBLND';
const e1180 = [i1171, j1172, h1174, u1175, y1177, a1178, a1179, g1161];
const b1181 = 'FILL#';
const a1182 = 'FILL';
const l1183 = [b1181, a1182];
const a1184 = 'STRK#';
const b1185 = 'STRK';
const e1186 = [a1184, b1185];
const w1187 = 'CSTOP#';
const t1188 = 'CSTOP';
const e1189 = [w1187, t1188];
const n1190 = 'GRAD#';
const n1191 = 'GRAD';
const w1192 = [n1190, n1191];
const b1193 = 'RCRN#';
const w1194 = 'RCRN';
const e1195 = [b1193, w1194];
const s1196 = 'DRSH#';
const y1197 = 'DRSH';
const u1198 = [s1196, y1197];
const v1199 = 'INSH#';
const r1200 = 'INSH';
const u1201 = [v1199, r1200];
const r1202 = 'LBLR#';
const t1203 = 'LBLR';
const l1204 = [r1202, t1203];
const s1205 = 'BBLR#';
const n1206 = 'BBLR';
const c1207 = [s1205, n1206];
const l1208 = 'MASK#';
const l1209 = 'MASK';
const o1210 = [l1208, l1209];
const i1211 = 'BLEND#';
const r1212 = 'BLEND';
const p1213 = [i1211, r1212];
const u1214 = [...e1195, ...u1198, ...u1201, ...l1204, ...c1207, ...p1213, ...o1210];
const a1215 = [i1171, b1181, n1190, a1184, s1196, v1199, r1202, s1205, i1211, l1208];
const g1216 = 'CSTL';
const f1217 = 'SHP#';
const u1218 = 'RECT#';
const e1219 = 'RECT';
const v1220 = [u1218, e1219];
const o1221 = 'LINE#';
const w1222 = 'LINE';
const s1223 = [o1221, w1222];
const c1224 = 'ELPS#';
const g1225 = 'ELPS';
const m1226 = [c1224, g1225];
const i1227 = 'TRPZ#';
const g1228 = 'TRPZ';
const d1229 = [i1227, g1228];
const k1236 = 'POLY#';
const h1237 = 'POLY';
const a1238 = [k1236, h1237];
const h1239 = 'STAR#';
const o1240 = 'STAR';
const c1241 = [h1239, o1240];
const k1242 = 'TXTS#';
const i1243 = 'TXTS';
const p1244 = [k1242, i1243];
const f1245 = 'PT#';
const v1246 = 'PT';
const g1247 = [f1245, v1246];
const h1248 = 'PCORN';
const w1249 = 'VPATH#';
const x1250 = 'VPATH';
const m1251 = [w1249, x1250];
const d1252 = 'VPT#';
const p1253 = 'VPT';
const a1254 = [d1252, p1253];
const d1255 = 'VEDGE#';
const y1256 = 'VEDGE';
const y1257 = [d1255, y1256];
const q1258 = 'VREG#';
const e1259 = 'VREG';
const g1260 = [q1258, e1259];
const f1261 = 'VNET#';
const v1262 = 'VNET';
const i1263 = [f1261, v1262];
const j1264 = 'SGRP#';
const g1265 = 'SGRP';
const d1266 = [j1264, g1265];
const m1267 = 'FRM#';
const g1268 = 'FRM';
const k1269 = [m1267, g1268];
const i1231 = 'ARC#';
const c1230 = 'ARC';
const e1232 = [i1231, c1230];
const i1234 = 'WAVEP#';
const e1233 = 'WAVEP';
const k1235 = [i1234, e1233];
const p1270 = 'MOVE';
const z1271 = 'ROT';
const f1272 = 'SCALE';
const n1273 = 'SKEW';
const q1274 = 'SCENTR';
const s1275 = 'RSTX';
const d1276 = 'PLACE';
const n1277 = 'APPLY';
const PATH_LENGTH = 'PTHLEN';
const JOIN_PATHS = 'JOINPTH';
const REORIENT_PATHS = 'REORPTH';
const k1283 = 'PTALPATH';
const f1284 = 'CPTONPATH';
const d1278 = 'MESPT';
const x1279 = 'VECLEN';
const l1280 = 'CIRCEN';
const ARC_FROM_POINTS = 'ARCPT';
const f1281 = 'INTLIN';
const b1282 = 'PTLERP';
const REVERSE_PATH = 'REVPTH';
const BLEND_PATH = 'BLENDPTH';
const PATH_TYPES = [x1250, g1228, c1230, e1233];
const PATH_VALUES = [w1249, i1227, i1231, i1234];
const p1285 = 'SBOOL';
const e1286 = 'SBOOL#';
const p1287 = 'SBOOLU';
const d1288 = 'SBOOLS';
const f1289 = 'SBOOLI';
const l1290 = 'SBOOLE';
const l1291 = [p1285, e1286, p1287, d1288, f1289, l1290];
const q1292 = 'RENDER';
const EXPORT = 'EXPORT';
const v1293 = [f1217, z1062, u1218, o1221, c1224, i1227, k1236, h1239, k1242, f1245, w1249, d1252, d1255, q1258, f1261, i1231, i1234, j1264, m1267, e1286, s1196, v1199, r1202, s1205, i1211, l1208];
const a1294 = [z1271, f1272, n1273];
const i1295 = [...v1293, ...v1220, ...s1223, ...m1226, ...d1229, ...a1238, ...c1241, ...p1244, ...g1247, h1248, ...m1251, ...a1254, ...y1257, ...g1260, ...i1263, ...e1232, ...k1235, ...d1266, ...k1269, ...l1291, p1270, ...a1294, q1274, s1275, d1276, n1277, PATH_LENGTH, JOIN_PATHS, REORIENT_PATHS, k1283, f1284, d1278, x1279, l1280, c1230, e1233, ARC_FROM_POINTS, f1281, b1282, REVERSE_PATH, BLEND_PATH, q1292, EXPORT];
const g1296 = [m1059, q1060, z1061, z1062, d1094, k1146, i1171, b1181, w1187, n1190, a1184, w1187, n1190, f1217, u1218, o1221, c1224, i1227, k1236, h1239, k1242, f1245, w1249, d1252, d1255, q1258, f1261, j1264, m1267, b1193, s1196, v1199, r1202, s1205, i1211, l1208];
const c1297 = 'GROUP';
const y1298 = 'GPARAM';
const j1299 = [c1297, y1298];
const c1300 = 'CMNT';
const i1301 = 'CMNTARR';
const z1302 = 'PANEL';
const w1303 = 'ACT';
const g1304 = 'BFACT';
const y1305 = 'BFLST';
const g1306 = 'DIS';
const q1307 = 'NOC';
const PARAM = 'PARAM';
const y1308 = 'LOG';
const h1309 = 'GRAPH';
const z1310 = [[z1122, '%'], [z1121, '/'], [s1119, '−'], [b1118, '+'], [e1120, '×'], [v1123, 'e<sup>x']];
const k1311 = [[z1121, '/'], [s1119, '−'], [b1118, '+'], [e1120, '×']];
const v1312 = 0;
const s1313 = 1;
const t1314 = 2;
const b1315 = 3;
const e1316 = [[v1312, 'not'], [s1313, 'xor'], [t1314, 'or'], [b1315, 'and']];
const k1317 = 0;
const d1318 = 1;
const t1319 = 2;
const b1320 = 3;
const n1321 = 4;
const j1322 = 5;
const b1323 = [[k1317, '<'], [d1318, '≤'], [t1319, '≠'], [b1320, '='], [n1321, '≥'], [j1322, '>']];
const y1324 = 0;
const e1325 = 1;
const i1326 = 2;
const j1327 = 3;
const m1328 = 4;
const h1329 = 5;
const m1330 = [[y1324, 'sin'], [e1325, 'cos'], [i1326, 'tan'], [j1327, 'asin'], [m1328, 'acos'], [h1329, 'atan']];
const b1331 = 'EMPTY';
const o1332 = 'CONNECT';
const u1333 = 'CREATE';
const u1334 = 'CREATE_INSERT';
const c1335 = 'DELETE';
const f1336 = 'DISCONNECT';
const e1337 = 'LINK_STYLE';
const e1338 = 'LINK_VARIABLE';
const g1339 = 'LINK_VARIABLE_GROUP';
const j1340 = 'MAKE_ACTIVE';
const MAKE_NOT_CONDITION_ACTION = 'MAKE_NOT_CONDITION';
const o1341 = 'MAKE_PASSIVE';
const q1342 = 'PASTE';
const v1343 = 'RECONNECT';
const f1344 = 'REMOVE';
const b1345 = 'RENAME';
const p1346 = 'REORDER_INPUTS';
const x1347 = 'REORDER_CONNECTIONS';
const c1348 = 'SELECT';
const z1349 = 'SELECT_MOVE';
const e1350 = 'MOVE_NODES';
const v1351 = 'SET_PARAM_VALUE';
const SET_MULTIPLE_VALUES_ACTION = 'SET_MULTIPLE_VALUES';
const y1352 = 'SET_PARAM_SETTING';
const f1353 = 'SET_NODE_RECT';
const h1354 = 'TOGGLE_DISABLE';
const o1355 = 'TOGGLE_PARAM_HEADER';
const z1356 = 'SET_CURRENT_GRAPH';
const y1357 = 'CREATE_PAGE';
const y1358 = 'DELETE_PAGE';
const b1359 = 'GROUP_NODES';
const q1360 = 'UNGROUP_NODES';
const w1361 = 'HIGHLIGHT_NODES';
const SCROLL_LIST_NODE_ACTION = 'SCROLL_LIST_NODE';
const SET_LIST_DIVIDER_ACTION = 'SET_LIST_DIVIDER';
const SET_NODE_PARAM_ACTION = 'SET_NODE_PARAM';
const d1362 = 'BNORM';
const q1363 = 'BDARK';
const v1364 = 'BMULT';
const y1365 = 'BPDRK';
const v1366 = 'BBURN';
const b1367 = 'BLITE';
const x1368 = 'BSCRN';
const q1369 = 'BPLGT';
const w1370 = 'BDODG';
const z1371 = 'BOVER';
const g1372 = 'BSOFT';
const w1373 = 'BHARD';
const k1374 = 'BDIFF';
const n1375 = 'BEXCL';
const w1376 = 'BHUE';
const n1377 = 'BSAT';
const v1378 = 'BCOL';
const x1379 = 'BLUM';
const o1380 = [[d1362, 'normal', 'NORMAL'], [q1363, 'darken', 'DARKEN'], [v1364, 'multiply', 'MULTIPLY'], [y1365, 'plus darker', 'LINEAR_BURN'], [v1366, 'color burn', 'COLOR_BURN'], [b1367, 'lighten', 'LIGHTEN'], [x1368, 'screen', 'SCREEN'], [q1369, 'plus lighter', 'LINEAR_DODGE'], [w1370, 'color dodge', 'COLOR_DODGE'], [z1371, 'overlay', 'OVERLAY'], [g1372, 'soft light', 'SOFT_LIGHT'], [w1373, 'hard light', 'HARD_LIGHT'], [k1374, 'difference', 'DIFFERENCE'], [n1375, 'exclusion', 'EXCLUSION'], [w1376, 'hue', 'HUE'], [n1377, 'saturation', 'SATURATION'], [v1378, 'color', 'COLOR'], [x1379, 'luminosity', 'LUMINOSITY']];
const k1381 = [['thin', 100], ['extra light', 200], ['light', 300], ['regular', 400], ['medium', 500], ['semi bold', 600], ['bold', 700], ['extra bold', 800], ['black', 900]];
const h1382 = 0;
const n1383 = 1;
const c1384 = 2;
const q1385 = 2;
const c1386 = 3;
const j1387 = 3;
const m1388 = 4;
const g1389 = 4;
const c1390 = 5;
const g1391 = 6;
const f1392 = 7;
const c1393 = 8;
const p1394 = 9;
const m1395 = 10;
const k1396 = 11;
const a1397 = 12;
const a1398 = 13;
const h1399 = 14;
const f1400 = 15;
const o1401 = 16;
const z1402 = 17;
const l1403 = 18;
const c1404 = 19;
const e1405 = 20;
const p1406 = 21;
const c1407 = 22;
const u1408 = 23;
const u1409 = 24;
const FO_BOOLEAN_CHILDREN = 24;
const r1410 = 24;
const m1411 = 25;
const FO_BOOLEAN_OPERATION = 25;
const c1412 = 26;
const b1413 = 27;
const n1414 = 28;
const g1415 = 28;
const p1416 = 28;
const q1417 = 28;
const n1418 = 28;
const f1419 = 28;
const v1420 = 28;
const l1421 = 28;
const o1422 = 29;
const r1423 = 29;
const o1424 = 29;
const p1425 = 29;
const u1426 = 29;
const e1427 = 29;
const g1428 = 30;
const y1429 = 30;
const c1430 = 30;
const w1431 = 30;
const m1432 = 31;
const o1433 = 31;
const r1434 = 32;
const a1435 = 33;
const k1436 = 34;
const v1437 = 35;
const k1438 = 36;
const y1439 = 37;
const y2797 = '12345679ABCDEFGHJKLMNPQRSTUVWXYZ';
function l845(array, chars = y2797) { let b847 = ''; let len = array.length; let i = 0; while (len > 0) {
    if (len >= 5) {
        const a0 = array[i], a1 = array[i + 1], a2 = array[i + 2], a3 = array[i + 3], a4 = array[i + 4];
        b847 += chars[(a0 & 0xF8) >>> 3];
        b847 += chars[((a0 & 0x07) << 2) | ((a1 & 0xC0) >>> 6)];
        b847 += chars[(a1 & 0x3E) >>> 1];
        b847 += chars[((a1 & 0x01) << 4) | ((a2 & 0xF0) >>> 4)];
        b847 += chars[((a2 & 0x0F) << 1) | ((a3 & 0x80) >>> 7)];
        b847 += chars[(a3 & 0x7C) >>> 2];
        b847 += chars[((a3 & 0x03) << 3) | ((a4 & 0xE0) >>> 5)];
        b847 += chars[(a4 & 0x1F)];
    }
    else if (len == 4) {
        const a0 = array[i], a1 = array[i + 1], a2 = array[i + 2], a3 = array[i + 3];
        b847 += chars[(a0 & 0xF8) >>> 3];
        b847 += chars[((a0 & 0x07) << 2) | ((a1 & 0xC0) >>> 6)];
        b847 += chars[(a1 & 0x3E) >>> 1];
        b847 += chars[((a1 & 0x01) << 4) | ((a2 & 0xF0) >>> 4)];
        b847 += chars[((a2 & 0x0F) << 1) | ((a3 & 0x80) >>> 7)];
        b847 += chars[(a3 & 0x7C) >>> 2];
        b847 += chars[((a3 & 0x03) << 3)];
    }
    else if (len == 3) {
        const a0 = array[i], a1 = array[i + 1], a2 = array[i + 2];
        b847 += chars[(a0 & 0xF8) >>> 3];
        b847 += chars[((a0 & 0x07) << 2) | ((a1 & 0xC0) >>> 6)];
        b847 += chars[(a1 & 0x3E) >>> 1];
        b847 += chars[((a1 & 0x01) << 4) | ((a2 & 0xF0) >>> 4)];
        b847 += chars[((a2 & 0x0F) << 1)];
    }
    else if (len == 2) {
        const a0 = array[i], a1 = array[i + 1];
        b847 += chars[(a0 & 0xF8) >>> 3];
        b847 += chars[((a0 & 0x07) << 2) | ((a1 & 0xC0) >>> 6)];
        b847 += chars[(a1 & 0x3E) >>> 1];
        b847 += chars[((a1 & 0x01) << 4)];
    }
    else if (len == 1) {
        const a0 = array[i];
        b847 += chars[(a0 & 0xF8) >>> 3];
        b847 += chars[((a0 & 0x07) << 2)];
    }
    i += 5;
    len -= 5;
} return b847; }
function x846(b847, chars = y2797) { const array = []; let len = b847.length; let c = 0; while (len > 0) {
    if (len >= 8) {
        const c0 = chars.indexOf(b847[c]), c1 = chars.indexOf(b847[c + 1]), c2 = chars.indexOf(b847[c + 2]), c3 = chars.indexOf(b847[c + 3]), c4 = chars.indexOf(b847[c + 4]), c5 = chars.indexOf(b847[c + 5]), c6 = chars.indexOf(b847[c + 6]), c7 = chars.indexOf(b847[c + 7]);
        array.push((c0 << 3) | ((c1 & 0x1C) >>> 2));
        array.push(((c1 & 0x03) << 6) | (c2 << 1) | ((c3 & 0x10) >>> 4));
        array.push(((c3 & 0x0F) << 4) | ((c4 & 0x1E) >>> 1));
        array.push(((c4 & 0x01) << 7) | (c5 << 2) | ((c6 & 0x18) >>> 3));
        array.push(((c6 & 0x07) << 5) | c7);
    }
    else if (len == 7) {
        const c0 = chars.indexOf(b847[c]), c1 = chars.indexOf(b847[c + 1]), c2 = chars.indexOf(b847[c + 2]), c3 = chars.indexOf(b847[c + 3]), c4 = chars.indexOf(b847[c + 4]), c5 = chars.indexOf(b847[c + 5]), c6 = chars.indexOf(b847[c + 6]);
        array.push((c0 << 3) | ((c1 & 0x1C) >>> 2));
        array.push(((c1 & 0x03) << 6) | (c2 << 1) | ((c3 & 0x10) >>> 4));
        array.push(((c3 & 0x0F) << 4) | ((c4 & 0x1E) >>> 1));
        array.push(((c4 & 0x01) << 7) | (c5 << 2) | ((c6 & 0x18) >>> 3));
    }
    else if (len == 5) {
        const c0 = chars.indexOf(b847[c]), c1 = chars.indexOf(b847[c + 1]), c2 = chars.indexOf(b847[c + 2]), c3 = chars.indexOf(b847[c + 3]), c4 = chars.indexOf(b847[c + 4]);
        array.push((c0 << 3) | ((c1 & 0x1C) >>> 2));
        array.push(((c1 & 0x03) << 6) | (c2 << 1) | ((c3 & 0x10) >>> 4));
        array.push(((c3 & 0x0F) << 4) | ((c4 & 0x1E) >>> 1));
    }
    else if (len == 4) {
        const c0 = chars.indexOf(b847[c]), c1 = chars.indexOf(b847[c + 1]), c2 = chars.indexOf(b847[c + 2]), c3 = chars.indexOf(b847[c + 3]);
        array.push((c0 << 3) | ((c1 & 0x1C) >>> 2));
        array.push(((c1 & 0x03) << 6) | (c2 << 1) | ((c3 & 0x10) >>> 4));
    }
    else if (len == 2) {
        const c0 = chars.indexOf(b847[c]), c1 = chars.indexOf(b847[c + 1]);
        array.push((c0 << 3) | ((c1 & 0x1C) >>> 2));
    }
    c += 8;
    len -= 8;
} return array; }
function x2102(nodeKey, t4007) {
    return __awaiter(this, void 0, void 0, function* () { const log = n2103(yield y1547(nodeKey, false)); if (t4007) {
        console.log('%c%s\n%c%s', 'background: #fa24; color: white;', a1057(nodeKey), 'background: #fa44; color: #edc;', log);
    }
    else {
        console.log('%c%s\n%c%s', 'background: #fdb; color: black;', a1057(nodeKey), 'background: #fed; color: black;', log);
    } });
}
function n2103(json) { let v4036 = json.replace('{\n', '').replace('\n}', '').replace('[\n' + j868, '').replace('\n' + j868 + ']', '').split(j868 + '"params":\n').join('').split('": "').join(': ').split('", "').join(': ').split(j868 + '"').join(j868).split(j868 + j868 + '["').join(j868 + j868).split('",\n').join('\n').split('"\n').join('\n').split('"],\n').join('\n'); if (v4036[v4036.length - 1] == '"')
    v4036 = v4036.substring(0, v4036.length - 1); if (v4036.substring(v4036.length - 2) == '"]')
    v4036 = v4036.substring(0, v4036.length - 2); return v4036; }
function x2104(json) { let v4036 = json.replace('{\n', '').replace('\n}', '').replace('[\n' + j868, '').replace('\n' + j868 + ']', ''); return v4036; }
function i2105(u243, t4007) { const d4214 = n926(u243, true); if (t4007) {
    console.log('%c%s', 'background: #4f44; color: #ded', d4214);
}
else {
    console.log('%c%s', 'background: #cfc; color: black;', d4214);
} }
console.clear();
figma.payments.setPaymentStatusInDevelopment({ type: 'PAID' });
figma.loadAllPagesAsync().then(() => { figma.on('documentchange', v1518); figma.on('selectionchange', v1526); figma.on('close', i1519); });
p1508(true);
figma.clientStorage.getAsync('pro').then(data => { figma.showUI(__html__, { visible: false, themeColors: true, title: 'Generator' }); });
var h2709 = figma.viewport.zoom;
setInterval(m1523, 100);
const i2798 = 'clock_';
const u2799 = 1000;
var c2800 = false;
var objectCenterSize = 15;
function l1520() { (function () {
    return __awaiter(this, void 0, void 0, function* () { figma.currentPage.loadAsync().then(() => __awaiter(this, void 0, void 0, function* () { let n2801 = yield figma.currentPage.getPluginData(figma.currentUser.id + ',windowWidth'); let f2802 = yield figma.currentPage.getPluginData(figma.currentUser.id + ',windowHeight'); let v2803; let q2804; if (n2801 === NULL) {
        v2803 = 800;
        figma.currentPage.setPluginData(figma.currentUser.id + ',windowWidth', n2801.toString());
    }
    else
        v2803 = parseInt(n2801); if (f2802 === NULL) {
        q2804 = 600;
        figma.currentPage.setPluginData(figma.currentUser.id + ',windowHeight', f2802.toString());
    }
    else
        q2804 = parseInt(f2802); figma.ui.resize(Math.max(minWindowWidth, v2803), Math.max(minWindowHeight, q2804)); figma.ui.show(); const fonts = yield figma.listAvailableFontsAsync(); const eula = (yield figma.clientStorage.getAsync('eula')) === 'true'; const tutorials = (yield figma.clientStorage.getAsync('tutorials')) === 'true'; const isLocked = yield u1525(); h1527({ cmd: 'uiReturnFigStartGenerator', currentUser: figma.currentUser, viewportRect: figma.viewport.bounds, viewportZoom: figma.viewport.zoom, fonts: fonts, eula: eula, tutorials: tutorials, isLocked: isLocked, windowWidth: v2803, windowHeight: q2804 }); })); });
})(); }
function h1521() { p1508(); figma.showUI(__html__, { visible: false, themeColors: true }); }
function m1522() { setInterval(l1524, u2799); }
function m1523() { if (figma.viewport.zoom == h2709)
    return; h2709 = figma.viewport.zoom; s2697(); n1541(); m1543(); }
function l1524() { x1548(i2798 + figma.currentUser.sessionId.toString(), Date.now().toString()); }
function u1525() {
    return __awaiter(this, void 0, void 0, function* () { yield figma.currentPage.loadAsync(); const clocks = figma.currentPage.getPluginDataKeys().filter(k => k.length > i2798.length && k.substring(0, i2798.length) == i2798 && k.substring(i2798.length) != figma.currentUser.sessionId.toString()).map((k) => __awaiter(this, void 0, void 0, function* () { return parseInt(yield y1547(k)); })); clocks.sort(); const now = Date.now(); const locked = clocks.length > 0 && now - (yield clocks[clocks.length - 1]) < u2799 * 2; return locked; });
}
function v1526() { s2697(); }
var s2730 = new Array();
var d2732 = new Array();
function figGetObjectsFromIds(objectIds) {
    return __awaiter(this, void 0, void 0, function* () { for (let i = v2766.length - 1; i >= 0; i--)
        if (!v2766[i].removed && objectIds.includes(v2766[i].getPluginData('objectId')))
            v2766.splice(i, 1); for (let i = m2782.length - 1; i >= 0; i--)
        if (m2782[i].removed || objectIds.includes(m2782[i].getPluginData('objectId')))
            m2782.splice(i, 1); yield figma.currentPage.loadAsync(); return figma.currentPage.findAll(o => objectIds.includes(o.getPluginData('objectId'))); });
}
function w1507(nodeIds) {
    return __awaiter(this, void 0, void 0, function* () { for (let i = v2766.length - 1; i >= 0; i--)
        if (!v2766[i].removed && nodeIds.includes(v2766[i].getPluginData('nodeId')))
            v2766.splice(i, 1); for (let i = m2782.length - 1; i >= 0; i--)
        if (m2782[i].removed || nodeIds.includes(m2782[i].getPluginData('nodeId')))
            m2782.splice(i, 1); yield figma.currentPage.loadAsync(); figma.currentPage.findAll(o => nodeIds.includes(o.getPluginData('nodeId'))).forEach(o => { if (!o.removed)
        o.remove(); }); s2730 = s2730.filter(a => !nodeIds.includes(a.nodeId)); });
}
function p1508(q1509 = false) { for (const a1514 of figma.currentPage.children) {
    if (a1514.removed)
        continue;
    if (a1514.getPluginData('objectId') != '' && a1514.getPluginData('userId') == figma.currentUser.id && (parseInt(a1514.getPluginData('retain')) == 0 || q1509))
        a1514.remove();
} }
function w1510(nodeIds, c1511) { for (let i = s2730.length - 1; i >= 0; i--) {
    const x2731 = s2730[i];
    if (!nodeIds.includes(x2731.nodeId))
        continue;
    for (let j = x2731.objects.length - 1; j >= 0; j--) {
        const a1514 = x2731.objects[j];
        if (a1514.removed || !f1512(a1514, c1511)) {
            if (!a1514.removed)
                a1514.remove();
            f945(x2731.objects, a1514);
            if (v2766.includes(a1514))
                f945(v2766, a1514);
            if (m2782.includes(a1514))
                f945(m2782, a1514);
        }
        if (!a1514.removed) {
            if (parseInt(a1514.getPluginData('retain')) == 2)
                k1533(a1514);
        }
    }
    if (isEmpty(x2731.objects))
        f945(s2730, x2731);
} }
function f1512(a1514, c1511) { if (a1514.type == g1265 || a1514.type == g1268) {
    for (const child of a1514.children) {
        const found = f1512(child, c1511);
        if (found)
            return found;
    }
}
else {
    const found = c1511.find(o => a1514.getPluginData('objectId') == o[c1384] && a1514.getPluginData('userId') == figma.currentUser.id || o[c1390] == 2 && o[c1390] == a1514.getPluginData('retain'));
    if (found)
        return found;
} return null; }
function u1515(nodeIds, w1516) { figma.getLocalPaintStylesAsync().then(paintStyles => { paintStyles.filter(s => nodeIds.includes(s.getPluginData('nodeId'))).forEach(s => { const nodeId = s.getPluginData('nodeId'); const existing = x925(s.getPluginData('existing')); if (!existing) {
    s.remove();
}
else if (w1516) {
    x947(d2732, a => a.nodeId == nodeId);
    s.setPluginData('type', NULL);
    s.setPluginData('nodeId', NULL);
    s.setPluginData('existing', NULL);
} }); }); if (w1516)
    d2732 = d2732.filter(a => !nodeIds.includes(a.nodeId)); }
var y1517 = false;
function v1518(e) { for (const change of e.documentChanges) {
    switch (change.type) {
        case 'STYLE_CREATE':
            if (!change.style)
                break;
            if (!y1517) {
                change.style.setPluginData('type', NULL);
                change.style.setPluginData('nodeId', NULL);
                change.style.setPluginData('existing', NULL);
            }
            break;
        case 'STYLE_PROPERTY_CHANGE': {
            if (!change.style)
                break;
            if (!y1517) {
                const msg = { cmd: 'uiStylePropertyChange', styleId: g948(change.id), properties: change.properties, name: '', paints: [] };
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
                h1527(msg);
            }
            break;
        }
        case 'STYLE_DELETE':
            h1527({ cmd: 'uiStyleDelete', styleId: change.id });
            break;
    }
} y1517 = false; }
function i1519() { p1508(); h1527({ cmd: 'updateMetrics' }); }
figma.ui.onmessage = function (msg) { msg = JSON.parse(msg); if (msg.cmd == 'returnUiGetValueForFigma')
    return; switch (msg.cmd) {
    case 'figStartGenerator':
        l1520();
        break;
    case 'figRestartGenerator':
        h1521();
        break;
    case 'figFinishStart':
        m1522();
        break;
    case 'figDockWindowNormal':
        q2739('normal');
        break;
    case 'figDockWindowMaximize':
        q2739('maximize');
        break;
    case 'figDockWindowTop':
        q2739('top');
        break;
    case 'figDockWindowLeft':
        q2739('left');
        break;
    case 'figDockWindowRight':
        q2739('right');
        break;
    case 'figDockWindowBottom':
        q2739('bottom');
        break;
    case 'figGetMousePosition':
        r1593(msg.clientPosition);
        break;
    case 'figResizeWindow':
        t1596(msg.width, msg.height);
        break;
    case 'figSetWindowRect':
        p1594(msg.x, msg.y, msg.width, msg.height);
        break;
    case 'figNotify':
        b1597(msg);
        break;
    case 'figGetLocalData':
        y1545(msg.key);
        break;
    case 'figSetLocalData':
        w1546(msg.key, msg.value);
        break;
    case 'figClearAllLocalData':
        k4031();
        break;
    case 'figGetPageData':
        y1547(msg.key);
        break;
    case 'figSetPageData':
        x1548(msg.key, msg.value);
        break;
    case 'figSavePages':
        s1553(msg.pageIds, msg.pageJson, msg.currentPageId);
        break;
    case 'figLoadNodesAndConns':
        s1550(msg.debugMode);
        break;
    case 'figSaveNodes':
        h1554(msg.nodeIds, msg.nodeJson);
        break;
    case 'figGetAllLocalTemplateNames':
        g2736();
        break;
    case 'figSaveLocalTemplate':
        j1555(msg.a4032, msg.template);
        break;
    case 'figRemoveConnsToNodes':
        d1556(msg.nodeIds);
        break;
    case 'figRemoveSavedNodesAndConns':
        h1557(msg.nodeIds);
        break;
    case 'figRemoveAllSavedNodesAndConns':
        r1558();
        break;
    case 'figLogAllSavedNodesAndConns':
        s1559(msg.t4007);
        break;
    case 'figLogAllSavedNodes':
        h1560(msg.t4007);
        break;
    case 'figLogAllSavedConns':
        g1561(msg.t4007);
        break;
    case 'figLogAllSavedPageKeys':
        u1562(msg.t4007);
        break;
    case 'figLogAllSavedPages':
        a1563(msg.t4007);
        break;
    case 'figLogAllSavedConnKeys':
        y1564(msg.t4007);
        break;
    case 'figLogAllLocalData':
        s1565(msg.t4007);
        break;
    case 'figGetValue':
        h1566(msg.key, msg.spec);
        break;
    case 'figRemoveSavedPage':
        s1568(msg.pageId);
        break;
    case 'figRemoveAllSavedPages':
        e1569();
        break;
    case 'figSaveConnection':
        y1570(msg.key, msg.json);
        break;
    case 'figSaveConnections':
        k1571(msg.keys, msg.json);
        break;
    case 'figUpdateSavedConnections':
        o1572(msg.curKeys, msg.newKeys, msg.json);
        break;
    case 'figDeleteSavedConnection':
        x1573(msg.key);
        break;
    case 'figRemoveAllSavedConnections':
        n1574();
        break;
    case 'figDeleteSavedConnectionsToNode':
        x1575(msg.nodeId);
        break;
    case 'figDeleteSavedConnectionsFromNode':
        e1576(msg.nodeId);
        break;
    case 'figRemovePluginDataFromAllLocalStyles':
        a1577();
        break;
    case 'figGetAllLocalVariables':
        c1601(msg.nodeId, msg.px, msg.py);
        break;
    case 'figLinkNodeToVariable':
        s1603(msg.nodeId, msg.variableId);
        break;
    case 'figUpdateVariable':
        figUpdateVariableAsync(msg.variableId, msg.value);
        break;
    case 'figGetAllLocalColorStyles':
        l1578(msg.nodeId, msg.px, msg.py);
        break;
    case 'figLinkNodeToExistingColorStyle':
        m1579(msg.nodeId, msg.styleId);
        break;
    case 'figExport':
        figExport(msg.objectIds, msg.scale, msg.format, msg.suffix);
        break;
    case 'figGetObjectSize':
        v1532(msg.object);
        break;
    case 'figGetVariableUpdates':
        u1567(msg.linkedVarIds);
        break;
    case 'figUpdateShowIds':
        c2800 = msg.c2800;
        break;
    case 'figUpdateObjectCenterSize':
        objectCenterSize = msg.objectCenterSize;
        break;
    case 'figDeleteAllObjects':
        p1508();
        break;
    case 'figUpdateObjectsAndStyles':
        x2745 = 0;
        d2746 = 0;
        msg.objects.forEach(o => o.counted = false);
        u2733(null, msg.objects, msg.k4021, msg.y2050, msg.nodeIds, msg.i2762, msg.z2763, msg.x270);
        w1584(msg);
        break;
    case 'figDeleteObjectsAndStyles':
        w1507(msg.nodeIds);
        u1515(msg.nodeIds, msg.w1516);
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
} h1527({ cmd: 'uiEndFigMessage', msgCmd: msg.cmd }); };
function h1527(msg) { figma.ui.postMessage(JSON.stringify(msg)); }
function m2734(key) {
    return __awaiter(this, void 0, void 0, function* () { return yield figma.clientStorage.getAsync(key); });
}
function y1545(key) { figma.currentPage.loadAsync().then(() => { if (key == 'canvasEmpty') {
    h1527({ cmd: 'uiReturnFigGetLocalData', key: key, value: figma.currentPage.children.length == 0 });
}
else if (key == 'debugWarningCrash') {
    figma.clientStorage.getAsync('debugWarning').then(data => { h1527({ cmd: 'uiReturnFigGetLocalData', key: key, value: data }); });
}
else {
    figma.clientStorage.getAsync(key).then(data => { h1527({ cmd: 'uiReturnFigGetLocalData', key: key, value: data }); });
} }); }
function w1546(key, value, postToUi = true) { figma.clientStorage.setAsync(key, value); if (postToUi) {
    h1527({ cmd: 'uiReturnFigSetLocalData', key: key, value: value });
} }
function k4031() {
    return __awaiter(this, void 0, void 0, function* () { const keys = yield figma.clientStorage.keysAsync(); for (const key of keys)
        figma.clientStorage.deleteAsync(key); });
}
function y1547(key, postToUi = true) {
    return __awaiter(this, void 0, void 0, function* () { yield figma.currentPage.loadAsync(); const data = figma.currentPage.getPluginData(key); if (postToUi) {
        h1527({ cmd: 'uiReturnFigGetPageData', key: key, value: data });
    } return data; });
}
function x1548(key, value) { s1549(key); figma.currentPage.setPluginData(key, value); }
function s1549(key) { figma.currentPage.setPluginData(key, ''); }
function s1550(debugMode) { figma.currentPage.loadAsync().then(() => { const pageKeys = figma.currentPage.getPluginDataKeys().filter(k => v1053(k)); const nodeKeys = figma.currentPage.getPluginDataKeys().filter(k => j1054(k)); const connKeys = figma.currentPage.getPluginDataKeys().filter(k => a1055(k)); if (!debugMode)
    w1552(nodeKeys, connKeys); const pages = pageKeys.map(k => figma.currentPage.getPluginData(k)); const nodes = nodeKeys.map(k => figma.currentPage.getPluginData(k)); const j2122 = connKeys.map(k => figma.currentPage.getPluginData(k)); const pageOrder = figma.currentPage.getPluginData('pageOrder').split(','); const currentPageId = figma.currentPage.getPluginData('currentPageId'); f1551(nodes); const showAllColorSpaces = figma.currentPage.getPluginData('showAllColorSpaces'); h1527({ cmd: 'uiReturnFigLoadNodesAndConns', showAllColorSpaces: showAllColorSpaces, pageKeys: pageKeys, pageJson: pages, pageOrder: pageOrder, currentPageId: currentPageId, nodeKeys: nodeKeys, nodeJson: nodes, connKeys: connKeys, connJson: j2122 }); }); }
function f1551(nodes) { d2732 = []; figma.getLocalPaintStylesAsync().then(paintStyles => { for (const s3019 of nodes) {
    const node = JSON.parse(s3019);
    if (node.type == g1216) {
        const style = paintStyles.find(s => { const nodeId = s.getPluginData('nodeId'); return nodeId == node.id; });
        if (style) {
            d2732.push({ nodeId: node.id, existing: x925(node.existing), styles: [style] });
        }
    }
} }); }
function w1552(nodeKeys, connKeys) { figma.currentPage.loadAsync().then(() => { const z2735 = '"loading": "true"'; const not = '{\n'; const set = '{\n' + j868 + z2735 + ',\n'; nodeKeys.forEach(k => figma.currentPage.setPluginData(k, figma.currentPage.getPluginData(k).replace(set, not).replace(not, set))); connKeys.forEach(k => figma.currentPage.setPluginData(k, figma.currentPage.getPluginData(k).replace(set, not).replace(not, set))); }); }
function s1553(pageIds, pageJson, currentPageId) { for (let i = 0; i < pageIds.length; i++) {
    x1548(b924(pageIds[i]), pageJson[i]);
} x1548('pageOrder', pageIds.join(',')); x1548('currentPageId', currentPageId); }
function h1554(nodeIds, nodeJson) { for (let i = 0; i < nodeIds.length; i++) {
    x1548(o922(nodeIds[i]), nodeJson[i]);
} }
function g2736() {
    return __awaiter(this, void 0, void 0, function* () { let keys = yield figma.clientStorage.keysAsync(); keys = keys.filter(k => k.length >= y876.length && k.substring(0, y876.length) == y876); h1527({ cmd: 'uiReturnGetAllLocalTemplateNames', templateNames: keys }); });
}
function j1555(a4032, template) { w1546(y876 + ' ' + a4032, template); }
function d1556(nodeIds) { figma.currentPage.loadAsync().then(() => { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => a1055(k)); for (const key of connKeys) {
    const parts = p1058(key).split(' ');
    if (nodeIds.includes(parts[0]) || nodeIds.includes(parts[2]))
        s1549(key);
} }); }
function h1557(nodeIds) { figma.currentPage.loadAsync().then(() => { d1556(nodeIds); const nodeKeys = figma.currentPage.getPluginDataKeys().filter(k => j1054(k) && nodeIds.includes(a1057(k))); nodeKeys.forEach(k => s1549(k)); }); }
function r1558() { figma.currentPage.loadAsync().then(() => { const nodeKeys = figma.currentPage.getPluginDataKeys().filter(k => j1054(k)); const connKeys = figma.currentPage.getPluginDataKeys().filter(k => a1055(k)); for (const key of nodeKeys)
    s1549(key); for (const key of connKeys)
    s1549(key); }); }
function s1559(t4007) {
    return __awaiter(this, void 0, void 0, function* () { yield h1560(t4007); g1561(t4007); });
}
function h1560(t4007) {
    return __awaiter(this, void 0, void 0, function* () { yield figma.currentPage.loadAsync(); figma.currentPage.getPluginDataKeys().filter(k => j1054(k)).forEach((k) => __awaiter(this, void 0, void 0, function* () { return yield x2102(k, t4007); })); });
}
function g1561(t4007) { figma.currentPage.loadAsync().then(() => { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => a1055(k)); connKeys.sort((key1, key2) => { const p1 = p1058(key1).split(' '); const p2 = p1058(key2).split(' '); if (p1[2] != p2[2])
    return p1[2] < p2[2] ? -1 : 1; if (p1[3] != p2[3])
    return parseInt(p1[3]) - parseInt(p2[3]); if (p1[2] == p2[0])
    return -1; if (p2[2] == p1[0])
    return 1; return 0; }); connKeys.forEach(k => i2105(JSON.parse(figma.currentPage.getPluginData(k)), t4007)); }); }
function u1562(t4007) { figma.currentPage.loadAsync().then(() => { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => v1053(k)); connKeys.forEach(k => console.log('%c' + k, 'background: #fff; color: ' + (t4007 ? 'black' : 'white'))); const pageOrder = figma.currentPage.getPluginData('pageOrder'); console.log('%c' + pageOrder, 'background: #fff; color: ' + (t4007 ? 'black' : 'white')); }); }
function a1563(t4007) { figma.currentPage.loadAsync().then(() => { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => v1053(k)); connKeys.forEach(k => console.log('%c' + figma.currentPage.getPluginData(k), 'background: #fff; color: ' + (t4007 ? 'black' : 'white'))); const pageOrder = figma.currentPage.getPluginData('pageOrder'); console.log('%c' + pageOrder, 'background: #fff; color: ' + (t4007 ? 'black' : 'white')); }); }
function y1564(t4007) { figma.currentPage.loadAsync().then(() => { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => a1055(k)); connKeys.forEach(k => console.log('%c' + k, 'background: #dff; color: ' + (t4007 ? 'black' : 'white'))); }); }
function s1565(t4007) { figma.clientStorage.keysAsync().then(keys => keys.forEach(k => figma.clientStorage.getAsync(k).then(val => console.log(k + ': ' + val)))); }
function h1566(key, spec) {
    return __awaiter(this, void 0, void 0, function* () { let result = null; switch (key) {
        case 'getVariableData':
            result = yield g1602(spec);
            break;
        case 'getPaidStatus':
            result = figma.payments.status.type;
            break;
        case 'figSubscribe': {
            yield figma.payments.initiateCheckoutAsync({ interstitial: 'PAID_FEATURE' });
            result = figma.payments.status.type;
            break;
        }
    } h1527({ cmd: 'returnFigGetValue', value: result }); });
}
function u1567(varIds) { g1602(varIds).then(values => { h1527({ cmd: 'uiReturnFigGetVariableUpdates', values: values }); }); }
function s1568(pageId) {
    return __awaiter(this, void 0, void 0, function* () { s1549(k934(pageId)); const pageOrder = (yield y1547('pageOrder')).split(','); x947(pageOrder, id => id == pageId); x1548('pageOrder', pageOrder.join(',')); });
}
function e1569() { figma.currentPage.loadAsync().then(() => { const pageKeys = figma.currentPage.getPluginDataKeys().filter(k => v1053(k)); pageKeys.forEach(k => s1549(k)); s1549('pageOrder'); }); }
function y1570(key, json) { x1548(key, json); }
function k1571(_keys, _json) { const keys = JSON.parse(_keys); const json = JSON.parse(_json); for (let i = 0; i < keys.length; i++)
    x1548(keys[i], json[i]); }
function o1572(_curKeys, _newKeys, _json) { const curKeys = JSON.parse(_curKeys); const newKeys = JSON.parse(_newKeys); const json = JSON.parse(_json); for (let i = 0; i < curKeys.length; i++) {
    s1549(curKeys[i]);
    x1548(newKeys[i], json[i]);
} }
function x1573(key) { s1549(key); }
function n1574() { figma.currentPage.loadAsync().then(() => { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => a1055(k)); connKeys.forEach(k => s1549(k)); }); }
function x1575(nodeId) { figma.currentPage.loadAsync().then(() => { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => a1055(k)); for (const key of connKeys) {
    const parts = key.split(' ');
    if (parts[4] == nodeId)
        s1549(key);
} }); }
function e1576(nodeId) { figma.currentPage.loadAsync().then(() => { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => a1055(k)); for (const key of connKeys) {
    const parts = key.split(' ');
    if (parts[1] == nodeId)
        s1549(key);
} }); }
function a1577() { figma.getLocalPaintStylesAsync().then(w1581 => { for (const style of w1581) {
    style.setPluginData('type', '');
    style.setPluginData('nodeId', '');
    style.setPluginData('existing', '');
} }); }
function figSaveSnapshot(index, objectIds) {
    return __awaiter(this, void 0, void 0, function* () { const objects = yield figGetObjectsFromIds(objectIds); const group = figma.group(objects, figma.currentPage); const settings = { format: 'PNG' }; const icon = yield group.exportAsync(settings); figma.ungroup(group); h1527({ cmd: 'uiReturnFigSaveSnapshot', index: index, iconWidth: group.width, iconHeight: group.height, icon: icon }); });
}
var y2737 = null;
var g4033 = () => y2737 = null;
var l2738 = 'normal';
function r1593(clientPosition) { h1527({ cmd: 'uiReturnFigGetMousePosition', position: { x: 0, y: 0 }, clientPosition: clientPosition, viewportZoom: figma.viewport.zoom, viewportRect: figma.viewport.bounds }); }
function p1594(x, y, width, height) { return; }
function o1595(dock, rect, bounds) { switch (dock) {
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
function t1596(width, height) { (function () {
    return __awaiter(this, void 0, void 0, function* () { width = Math.floor(Math.max(0, width)); height = Math.floor(Math.max(0, height)); figma.ui.resize(width, height); yield figma.currentPage.loadAsync(); figma.currentPage.setPluginData(figma.currentUser.id + ',windowWidth', width.toString()); figma.currentPage.setPluginData(figma.currentUser.id + ',windowHeight', height.toString()); h1527({ cmd: 'uiReturnFigResizeWindow', width: width, height: height }); });
})(); }
function q2739(dock) {
    return __awaiter(this, void 0, void 0, function* () { if (dock != 'normal' && l2738 == 'normal') {
        figma.clientStorage.setAsync('normalWindowX', yield figma.clientStorage.getAsync('normalWindowX'));
        figma.clientStorage.setAsync('normalWindowY', yield figma.clientStorage.getAsync('normalWindowY'));
        figma.clientStorage.setAsync('normalWindowWidth', yield figma.clientStorage.getAsync('normalWindowWidth'));
        figma.clientStorage.setAsync('normalWindowHeight', yield figma.clientStorage.getAsync('normalWindowHeight'));
    } l2738 = dock; figma.clientStorage.setAsync('windowDock', dock); t1596(yield figma.clientStorage.getAsync('windowWidth'), yield figma.clientStorage.getAsync('windowHeight')); });
}
function b1597(msg) { n1598(msg.text, msg.prefix, msg.delay, msg.error, msg.i1599, msg.r1600); }
function n1598(text, prefix = 'Generator ', delay = 400, error = false, i1599 = '', r1600 = NULL) { const options = { timeout: delay, error: error, onDequeue: g4033 }; if (i1599 != '') {
    options['button'] = { text: i1599 };
    if (r1600.substring(0, 'removeConnection'.length) == 'removeConnection') {
        options['button']['action'] = () => x1573(r1600.split(',')[1]);
    }
    else {
        switch (r1600) {
            case 'hideClearUndoWarning':
                options['button']['action'] = () => h1527({ cmd: 'uiHideClearUndoWarning' });
                break;
        }
    }
} if (y2737)
    y2737.cancel(); y2737 = figma.notify(prefix + text, options); }
function r2740(key, params = null) {
    return __awaiter(this, void 0, void 0, function* () { return yield r2741(key, params); });
}
function r2741(key, params = null) {
    return __awaiter(this, void 0, void 0, function* () { return new Promise((resolve, reject) => { const timeout = 60000; h1527(Object.assign({ cmd: 'uiGetValueForFigma', key: key }, (params || {}))); const x2742 = setTimeout(() => reject(new Error('Timeout: Result not received by Figma within the specified time')), timeout); function w4034(msg) { msg = JSON.parse(msg); if (msg.cmd === 'returnUiGetValueForFigma') {
        clearTimeout(x2742);
        resolve({ key: msg.key, value: msg.value });
        figma.ui.off('message', w4034);
    } } figma.ui.on('message', w4034); }); });
}
var x2743 = [];
var i2744 = [];
var x2745 = 0;
var d2746 = 0;
function c1528(b111) { return (b111[c1390] === 2 ? '' : k872) + (c2800 ? b111[c1384] : b111[c1386]); }
function p1529(z1513, addObject = null, addProps = true) {
    return __awaiter(this, void 0, void 0, function* () { if (!e1531(z1513))
        return null; let a1514; switch (z1513[h1382]) {
        case e1219:
            a1514 = r2714(z1513, addProps);
            break;
        case w1222:
            a1514 = d2793(z1513, addProps);
            break;
        case g1225:
            a1514 = n2789(z1513, addProps);
            break;
        case h1237:
            a1514 = l2710(z1513, addProps);
            break;
        case o1240:
            a1514 = x2717(z1513, addProps);
            break;
        case i1243:
            a1514 = e2720(z1513, addProps);
            break;
        case v1246:
            a1514 = r2696(z1513);
            break;
        case x1250:
            a1514 = n2748(z1513, addProps);
            break;
        case v1262:
            a1514 = j2749(z1513, addProps);
            break;
        case p1285:
            a1514 = yield d2750(z1513, addProps);
            break;
        case g1265:
            a1514 = yield u2751(z1513);
            break;
        case g1268:
            a1514 = yield c2752(z1513, addProps);
            break;
    } if (addObject && a1514 != undefined && a1514 != null && !a1514.removed) {
        a1514.name = c1528(z1513);
        c954(z1513[h1382] == g1265 || !!a1514, 'no Figma object created');
        if (a1514 != undefined && a1514 != null) {
            a1514.setPluginData('retain', z1513[c1390].toString());
            if (z1513[c1390] < 2) {
                a1514.setPluginData('userId', figma.currentUser.id);
                a1514.setPluginData('sessionId', figma.currentUser.sessionId.toString());
                a1514.setPluginData('type', z1513[h1382]);
                a1514.setPluginData('nodeId', z1513[n1383]);
                a1514.setPluginData('objectId', z1513[c1384]);
                a1514.setPluginData('isCenter', b939(z1513[e1405]));
                if (z1513[h1382] == v1246)
                    v2766.push(a1514);
                if (z1513[c1404])
                    a1544(a1514);
            }
            addObject(a1514);
        }
    } if (!z1513.counted) {
        d2746++;
        z1513.counted = true;
    } return a1514; });
}
function r1530(a1514, z1513, addProps) {
    return __awaiter(this, void 0, void 0, function* () { if (!e1531(z1513) || a1514 == undefined || a1514 == null || a1514.removed)
        return; a1514.name = c1528(z1513); a1514.setPluginData('retain', z1513[c1390].toString()); switch (z1513[h1382]) {
        case e1219:
            z2715(a1514, z1513, addProps);
            break;
        case w1222:
            b2794(a1514, z1513, addProps);
            break;
        case g1225:
            i2790(a1514, z1513, addProps);
            break;
        case h1237:
            y2711(a1514, z1513, addProps);
            break;
        case o1240:
            p2718(a1514, z1513, addProps);
            break;
        case i1243:
            l2721(a1514, z1513, addProps);
            break;
        case v1246:
            m2753(a1514, z1513);
            break;
        case x1250:
            i2754(a1514, z1513, addProps);
            break;
        case v1262:
            z2755(a1514, z1513, addProps);
            break;
        case p1285:
            r2756(a1514, z1513, addProps);
            break;
        case g1265:
            f2757(a1514, z1513);
            break;
        case g1268:
            k2758(a1514, z1513, addProps);
            break;
    } if (a1514 != undefined && a1514 != null && !a1514.removed) {
        if (a1514.parent == figma.currentPage)
            yield figma.currentPage.loadAsync();
        a1514.parent.appendChild(a1514);
        if (z1513[c1404])
            a1544(a1514);
    } if (!z1513.counted) {
        d2746++;
        z1513.counted = true;
    } });
}
function u2733(i2759, p2760, f2761, y2050 = -1, nodeIds = [], i2762 = false, z2763 = false, x270 = false, addProps = true) {
    return __awaiter(this, void 0, void 0, function* () { let p2764 = NULL; let n2765 = null; let abort = false; const r3643 = []; let c2747 = 0; x2743.push(...nodeIds); if (y2050 > -1)
        x2745 = y2050; for (const z1513 of p2760) {
        i2744.push(z1513);
        if (z1513[n1383] != p2764) {
            p2764 = z1513[n1383];
            n2765 = s2730.find(a => a.nodeId == z1513[n1383]);
            if (!n2765) {
                s2730.push(n2765 = { nodeId: z1513[n1383], objects: [] });
            }
        }
        const addObject = a1514 => { if (i2759 != undefined && i2759 != null && !i2759.removed)
            i2759.appendChild(a1514);
        else
            n2765.objects.push(a1514); };
        let objects = i2759 != undefined && i2759 != null && !i2759.removed ? i2759.children : n2765.objects;
        let a1514 = objects.find(o => o.removed || o.getPluginData('userId') == figma.currentUser.id && o.getPluginData('objectId') == z1513[c1384]);
        if (a1514 != undefined && a1514 != null && a1514.removed) {
            m940(objects, a1514);
            if (v2766.includes(a1514))
                f945(v2766, a1514);
            if (m2782.includes(a1514))
                f945(m2782, a1514);
        }
        if (a1514 == undefined || a1514 == null || a1514.removed) {
            const newObj = yield p1529(z1513, addObject, addProps);
            r3643.push(newObj);
        }
        else if (a1514 != undefined && a1514 != null && !a1514.removed && a1514.getPluginData('type') == z1513[h1382].toString()) {
            yield r1530(a1514, z1513, addProps);
            if (a1514 != undefined && a1514 != null && !a1514.removed)
                r3643.push(a1514);
        }
        else {
            a1514.remove();
            if (v2766.includes(a1514))
                f945(v2766, a1514);
            if (m2782.includes(a1514))
                f945(m2782, a1514);
            yield p1529(z1513, addObject, addProps);
        }
        c2747++;
        if (c2747 >= f2761) {
            const result = yield r2740('returnObjectUpdate', { x2745: x2745, d2746: d2746 });
            abort = result.value;
            c2747 = 0;
            if (abort)
                break;
        }
    } if (i2759 != undefined && i2759 != null && !i2759.removed) {
        for (const a1514 of i2759.children) {
            if (a1514 != undefined && a1514 != null && a1514.removed || !p2760.find(o => o[c1384] == a1514.getPluginData('objectId') && a1514.getPluginData('userId') == figma.currentUser.id))
                a1514.remove();
        }
    } for (const point of v2766) {
        if (point.parent == figma.currentPage)
            yield figma.currentPage.loadAsync();
        if (point != undefined && point != null && !point.removed && !point.parent.removed)
            point.parent.appendChild(point);
    } if (z2763 && !abort) {
        w1510(x2743, i2744);
        x2743 = [];
        i2744 = [];
        if (x270 && r3643.length > 0) {
            figma.viewport.scrollAndZoomIntoView(r3643);
            const bounds = g1534(r3643);
            figma.viewport.zoom = Math.min(figma.viewport.bounds.width * figma.viewport.zoom / bounds.width - 0.05, figma.viewport.bounds.height * figma.viewport.zoom / bounds.height - 0.05);
        }
    } yield r2740('returnObjectUpdate', { x2745: x2745, d2746: d2746 }); });
}
function e1531(z1513) { switch (z1513[h1382]) {
    case e1219: return j2713(z1513);
    case w1222: return n2775(z1513);
    case g1225: return n2776(z1513);
    case h1237: return k4030(z1513);
    case o1240: return l2716(z1513);
    case i1243: return k2719(z1513);
    case v1246: return h4029(z1513);
    case x1250: return y2777(z1513);
    case v1262: return p2778(z1513);
    case p1285: return e2779(z1513);
    case g1265: return l2780(z1513);
    case g1268: return w2781(z1513);
} }
function v1532(z1513) {
    return __awaiter(this, void 0, void 0, function* () { (() => __awaiter(this, void 0, void 0, function* () { const a1514 = yield p1529(z1513); const width = a1514.width; const height = a1514.height; a1514.remove(); h1527({ cmd: 'uiForwardToGenerator', msg: { cmd: 'returnFigGetObjectSize', objectId: z1513[c1384], width: width, height: height } }); }))(); });
}
function k1533(a1514) { a1514.setPluginData('type', ''); a1514.setPluginData('nodeId', ''); a1514.setPluginData('userId', ''); a1514.setPluginData('sessionId', ''); a1514.setPluginData('objectId', ''); a1514.setPluginData('isCenter', ''); a1514.setPluginData('retain', ''); }
function g1534(objects) { const bounds = { left: 0, top: 0, right: 0, bottom: 0 }; for (const b111 of objects) {
    if (b111.x < bounds.left || bounds.left == bounds.right)
        bounds.left = b111.x;
    if (b111.y < bounds.top || bounds.top == bounds.bottom)
        bounds.top = b111.y;
    if (b111.x + b111.width > bounds.right || bounds.left == bounds.right)
        bounds.right = b111.x + b111.width;
    if (b111.y + b111.height > bounds.bottom || bounds.top == bounds.bottom)
        bounds.bottom = b111.y + b111.height;
} return { x: bounds.left, y: bounds.top, width: bounds.right - bounds.left, height: bounds.bottom - bounds.top }; }
function figExport(objectIds, scale, format, suffix) {
    return __awaiter(this, void 0, void 0, function* () { yield figma.currentPage.loadAsync(); for (const objId of objectIds) {
        let a1514 = figma.currentPage.children.find(o => !o.removed && o.getPluginData('userId') == figma.currentUser.id && o.getPluginData('objectId') == objId);
        if (!a1514)
            continue;
        const settings = { constraint: { type: 'SCALE', value: scale }, format: format == 0 ? 'PNG' : 'JPG', suffix: suffix };
        yield a1514.exportAsync(settings);
    } });
}
const m2782 = [];
const k2783 = [];
function w1535(w1536, l1537) { const effects = []; for (const effect of w1536) {
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
                if (l1537 && !isNaN(spread))
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
function m2703(a1514, z1513, phantom = true) { u1540(a1514, z1513); w2704(a1514, z1513, phantom); o2705(a1514, z1513); a1514.opacity = z1513[p1406]; a1514.blendMode = z1513[c1407]; const maskType = z1513[u1408]; a1514.isMask = maskType > 0; if (a1514.isMask) {
    switch (maskType) {
        case 1:
            a1514.maskType = 'ALPHA';
            break;
        case 2:
            a1514.maskType = 'VECTOR';
            break;
        case 3:
            a1514.maskType = 'LUMINANCE';
            break;
    }
} if (a1514.isMask && a1514.fills.length == 0 && a1514.strokes.length == 0)
    a1514.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 }, opacity: 1, blendMode: 'NORMAL' }]; }
function o2705(a1514, z1513) { if (!!z1513[m1395] && !isEmpty(z1513[m1395])) {
    a1514.fills = d958(z1513[m1395]);
    if (m2782.includes(a1514))
        f945(m2782, a1514);
}
else
    a1514.fills = []; }
function w2704(a1514, z1513, phantom = true) { if (z1513[k1396] != null && !isEmpty(z1513[k1396])) {
    x1539(a1514, d958(z1513[k1396]), z1513[a1397], z1513[a1398], z1513[h1399], z1513[f1400], z1513[o1401], f2706(z1513[z1402]));
    if (z1513[c1404])
        a1514.setPluginData('dashes', z1513[z1402]);
    if (m2782.includes(a1514))
        f945(m2782, a1514);
    if (z1513[c1404])
        m951(k2783, a1514);
}
else if (isEmpty(z1513[m1395]) && isEmpty(z1513[k1396]) && !z1513[u1408] && phantom) {
    c1542(a1514);
    m951(m2782, a1514);
}
else
    a1514.strokes = []; }
function f2706(k1538) { k1538 = k1538; k1538 = f956(k1538, ','); k1538 = c957(k1538, ','); k1538 = k1538.trim(); return k1538 == '' ? [] : k1538.split(',').map(s => Math.max(0, parseFloat(s))); }
function c2707(k1538) { k1538 = k1538; k1538 = f956(k1538, ','); k1538 = c957(k1538, ','); k1538 = k1538.trim(); return k1538 == '' ? [] : k1538.split(',').map(s => Math.max(0, parseFloat(s) / h2709)); }
function x1539(a1514, fills, weight, align, join, miterLimit, cap, dashes = []) { a1514.strokes = fills; a1514.strokeWeight = Math.max(0, weight); a1514.strokeAlign = align; a1514.strokeJoin = join; const miterAngle = miterLimit / 360 * Tau; const h2784 = 1 / Math.sin(miterAngle / 2); a1514.strokeMiterLimit = Math.min(Math.max(0, h2784), 16); a1514.strokeCap = cap; a1514.dashPattern = dashes; }
function u1540(a1514, z1513) { if (!!z1513[l1403] && !isEmpty(z1513[l1403])) {
    const l1537 = z1513[h1382] == e1219 || z1513[h1382] == g1225 || z1513[h1382] == g1268;
    a1514.effects = w1535(z1513[l1403], l1537);
}
else
    a1514.effects = []; }
function n1541() { for (const b111 of m2782) {
    if (b111.removed)
        f945(m2782, b111);
    else
        c1542(b111);
} }
function c1542(b111) { figma.currentPage.loadAsync().then(() => { const back = figma.currentPage.backgrounds.find(b => b.type == 'SOLID'); let phantomColor; if (back) {
    const l = back.color.r * 0.2126 + back.color.g * 0.7152 + back.color.b * 0.0722;
    phantomColor = l > 0.5 ? { r: 0, g: 0, b: 0 } : { r: 1, g: 1, b: 1 };
}
else
    phantomColor = { r: 1, g: 0, b: 1 }; x1539(b111, [{ type: 'SOLID', color: phantomColor, opacity: 0.5 }], 1 / h2709, 'CENTER', 'MITER', 1, 'NONE', [1 / h2709, 2 / h2709]); }); }
function m1543() { for (const a1514 of k2783) {
    if (a1514.removed)
        f945(k2783, a1514);
    else
        a1544(a1514);
} }
function a1544(a1514) { a1514.strokeWeight = Math.max(0, 1.5 / h2709); if (x925(a1514.getPluginData('isCenter'))) {
    const path = a1514.vectorPaths[0];
    const parts = path.data.split(' ');
    let t = { x: parseFloat(parts[1]), y: parseFloat(parts[2]) };
    let c = { x: parseFloat(parts[4]), y: parseFloat(parts[5]) };
    let r = { x: parseFloat(parts[7]), y: parseFloat(parts[8]) };
    const a = 2;
    const b = 0.05;
    const f = 1 - Math.pow(1 - Math.min(h2709, 1), a) / Math.pow(a, b);
    t = u897(c, r899(w884(r902(t, c)), objectCenterSize / f));
    r = u897(c, r899(w884(r902(r, c)), objectCenterSize / f));
    parts[1] = t.x;
    parts[2] = t.y;
    parts[4] = c.x;
    parts[5] = c.y;
    parts[7] = r.x;
    parts[8] = r.y;
    const y2785 = { windingRule: path.windingRule, data: parts.join(' ') };
    a1514.vectorPaths = [y2785];
} const dashes = a1514.getPluginData('dashes'); if (dashes != '')
    a1514.dashPattern = c2707(dashes); }
function l1578(nodeId, px, py) { figma.getLocalPaintStylesAsync().then(_styles => { const styles = new Array(); for (const l168 of _styles) {
    const _nodeId = l168.getPluginData('nodeId');
    const _existing = l168.getPluginData('existing');
    const existing = !!_existing;
    const style = { id: l168.id, nodeId: _nodeId, name: l168.name, existing: existing, paints: new Array() };
    let onlyPaint = true;
    for (const q2787 of l168.paints) {
        if (q2787.type == 'SOLID') {
            style.paints.push([q2787.color.r, q2787.color.g, q2787.color.b, q2787.opacity]);
        }
        else {
            onlyPaint = false;
            break;
        }
    }
    if (onlyPaint)
        styles.push(style);
} h1527({ cmd: 'uiReturnFigGetAllLocalColorStyles', nodeId: nodeId, px: px, py: py, styles: JSON.stringify(styles) }); }); }
function m1579(nodeId, styleId) { figma.getLocalPaintStylesAsync().then(w1581 => { if (styleId != NULL)
    x1580(w1581, nodeId, styleId);
else
    k1582(w1581, nodeId); }); }
function x1580(w1581, nodeId, styleId, clearExisting = true) { const v2786 = d2732.find(a => a.nodeId == nodeId); if (v2786 && clearExisting)
    k1582(w1581, nodeId); const i1586 = w1581.find(s => s.id == styleId); c954(!!i1586, 'figStyle should be found here'); i1586.setPluginData('type', g1216); i1586.setPluginData('nodeId', nodeId); i1586.setPluginData('existing', b939(true)); d2732.push({ nodeId: nodeId, existing: true, styles: [i1586] }); return i1586; }
function k1582(w1581, nodeId) { const i1586 = w1581.find(s => s.getPluginData('nodeId') == nodeId); c954(!!i1586, 'figStyle should be found here'); if (i1586) {
    i1586.setPluginData('type', NULL);
    i1586.setPluginData('nodeId', NULL);
    i1586.setPluginData('existing', NULL);
    x947(d2732, a => a.nodeId == nodeId);
} return i1586; }
function j1583(styles, c1587) { const i1586 = figma.createPaintStyle(); i1586.setPluginData('type', c1587[h1382]); i1586.setPluginData('nodeId', c1587[n1383]); i1586.name = c1587[j1387]; setStylePaints(i1586, c1587); styles.push(i1586); h1527({ cmd: 'uiSetStyleId', nodeId: c1587[n1383], styleId: i1586.id }); return i1586; }
function w1584(msg) { let p2764 = NULL; let v2786; for (const c1587 of msg.styles) {
    if (c1587[n1383] != p2764) {
        p2764 = c1587[n1383];
        v2786 = d2732.find(a => a.nodeId == c1587[n1383]);
        if (!v2786) {
            v2786 = { nodeId: c1587[n1383], styles: [] };
            d2732.push(v2786);
        }
    }
    else
        v2786 = null;
    const i1586 = v2786.styles[0];
    figma.getLocalPaintStylesAsync().then(w1581 => { const localStyle = w1581.find(s => s.getPluginData('nodeId') == c1587[n1383]); if (isValid(i1586) && !isValid(localStyle)) {
        m940(v2786.styles, i1586);
    } const existing = isValid(i1586) && isValid(localStyle) && i1586.getPluginData('existing'); if (!isValid(i1586) || !isValid(localStyle)) {
        if (!existing) {
            y1517 = true;
            m1579(c1587[n1383], c1587[q1385]);
        }
    }
    else if (isValid(i1586) && i1586.getPluginData('type') == c1587[h1382]) {
        y1517 = true;
        l1585(localStyle, c1587);
    } });
} }
function l1585(i1586, c1587) { setStylePaints(i1586, c1587); i1586.name = c1587[j1387]; }
function getStylePaints(stylePaints) { const paints = new Array(); for (const q2787 of stylePaints) {
    const fill = q2787[1].split(' ');
    switch (q2787[0]) {
        case 'SOLID':
            paints.push({ type: 'SOLID', color: { r: Math.min(Math.max(0, parseFloat(fill[0]) / 0xff), 1), g: Math.min(Math.max(0, parseFloat(fill[1]) / 0xff), 1), b: Math.min(Math.max(0, parseFloat(fill[2]) / 0xff), 1) }, opacity: Math.min(Math.max(0, parseFloat(fill[3]) / 100), 1) });
            break;
    }
} return paints; }
function setStylePaints(i1586, c1587) { if (!isEmpty(c1587[g1389]))
    i1586.paints = getStylePaints(c1587[g1389]);
else
    i1586.paints = []; }
function c1601(nodeId, px, py) {
    return __awaiter(this, void 0, void 0, function* () { figma.variables.getLocalVariablesAsync().then((m2788) => __awaiter(this, void 0, void 0, function* () { const variables = new Array(); for (const _var of m2788) {
        const collection = yield figma.variables.getVariableCollectionByIdAsync(_var.variableCollectionId);
        const variable = { id: _var.id, resolvedType: _var.resolvedType, name: _var.name, collectionName: collection.name };
        variables.push(variable);
    } figma.variables.getLocalVariableCollectionsAsync().then((collections) => __awaiter(this, void 0, void 0, function* () { h1527({ cmd: 'uiReturnFigGetAllLocalVariables', nodeId: nodeId, px: px, py: py, variables: JSON.stringify(variables), nCollections: collections.length }); })); })); });
}
function g1602(varIds) {
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
function s1603(nodeId, varId) { figma.variables.getLocalVariablesAsync().then(m2788 => { figLinkVariableAsync(m2788, nodeId, varId); }); }
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
        return null; const [resolvedVar, values] = yield figGetResolvedVariableValuesAsync(variable); h1527({ cmd: 'uiReturnFigLinkNodeToVariable', nodeId: nodeId, variableId: resolvedVar ? resolvedVar.id : NULL, variableName: resolvedVar ? resolvedVar.name : '', resolvedType: resolvedVar ? resolvedVar.resolvedType : NULL, values: values }); return resolvedVar; });
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
function c1588(tl, tr, bl) { let vr = point(tr.x - tl.x, tr.y - tl.y); let vb = point(bl.x - tl.x, bl.y - tl.y); let sx = vr.x; let sy = vb.y; let kx = -vr.y; let ky = -vb.x; let dx = -tl.x; let dy = -tl.y; const _sx = kx / nozero(sx); const _sy = ky / nozero(sy); let i4211 = t887([[1, _sy, 0], [_sx, 1, 0], [0, 0, 1]], q891(dx, dy)); i4211 = t889(i4211); const a = v881(vr); if (a > Tau / 4 && a < Tau * 3 / 4)
    i4211 = t887(i4211, q891(0, 0, 1, 1, Tau / 2)); if (determinant(i4211) < 0)
    i4211 = t887(i4211, q891(0, 0, -1, 1, 0)); return i4211; }
function x1589(a1514, tl, tr, bl) { const i4211 = c1588(tl, tr, bl); a1514.relativeTransform = [i4211[0], i4211[1]]; }
function t1590(a1514, z1513, setSize = true, noHeight = 0.01) { if (!z1513[g1391] || !z1513[f1392] || !z1513[c1393])
    return; const xp0 = z1513[g1391]; const xp1 = z1513[f1392]; const xp2 = z1513[c1393]; x1589(a1514, xp0, xp1, xp2); if (setSize) {
    const p892 = distv(xp0, xp1);
    const l893 = distv(xp0, xp2);
    const height = z1513[h1382] == i1243 ? z1513[u1426] : z1513[b1413];
    if (!a1514.removed) {
        a1514.resizeWithoutConstraints(Math.max(0.01, p892), height ? Math.max(0.01, l893) : noHeight);
    }
} }
function o1591(n2701, d2702) { if (n2701.removed)
    return; n2701.resizeWithoutConstraints(0.01, 0.01); n2701.setPluginData('actualX', d2702[u1409].toString()); n2701.setPluginData('actualY', d2702[m1411].toString()); n2701.x = d2702[u1409]; n2701.y = d2702[m1411]; n2701.rotation = d2702[e1405] ? 45 : 0; }
function u1592(n2701) { if (!n2701.removed)
    n2701.resizeWithoutConstraints(0.01, 0.01); }
function e2779(genBool) { return true; }
function d2750(genBool, addProps) {
    return __awaiter(this, void 0, void 0, function* () { let objects = []; for (const b111 of genBool[FO_BOOLEAN_CHILDREN])
        yield p1529(b111, o => objects = [...objects, o]); yield figma.currentPage.loadAsync(); let figBool = null; if (!isEmpty(objects)) {
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
        r2756(figBool, genBool, addProps);
    } return figBool; });
}
function r2756(figBool, genBool, addProps) { if (genBool[FO_BOOLEAN_CHILDREN].length == 0) {
    figBool.remove();
    return;
} u2733(figBool, genBool[FO_BOOLEAN_CHILDREN], genBool[FO_BOOLEAN_CHILDREN].length, -1, [], false, false, false, false); t1590(figBool, genBool, false); m2703(figBool, genBool, addProps && genBool[FO_BOOLEAN_CHILDREN].length == 0); }
function n2776(p2767) { return p2767[u1409] != null && !isNaN(p2767[u1409]) && p2767[m1411] != null && !isNaN(p2767[m1411]) && p2767[c1412] != null && !isNaN(p2767[c1412]) && p2767[b1413] != null && !isNaN(p2767[b1413]) && p2767[g1415] != null && !isNaN(p2767[g1415]) && p2767[o1422] != null && !isNaN(p2767[o1422]) && p2767[g1428] != null && !isNaN(p2767[g1428]) && p2767[m1432] != null && !isNaN(p2767[m1432]); }
function n2789(p2767, addProps) { if (!n2776(p2767))
    return null; const x2768 = figma.createEllipse(); i2790(x2768, p2767, addProps, true); return x2768; }
function i2790(x2768, p2767, addProps, isValid = false) { if (!isValid && !n2776(p2767))
    return; b2791(x2768, p2767); if (v2766.includes(x2768))
    x2698(x2768);
else
    m2703(x2768, p2767, addProps); }
function b2791(x2768, p2767) { x2768.cornerRadius = p2767[g1415]; const start = p2767[o1422] / 360 * (Math.PI * 2); const sweep = p2767[g1428] / 100 * (Math.PI * 2); x2768.arcData = { startingAngle: start, endingAngle: start + sweep, innerRadius: Math.min(Math.max(0, p2767[m1432] / 100), 1) }; t1590(x2768, p2767); }
function w2781(r2769) { return r2769[u1409] != null && !isNaN(r2769[u1409]) && r2769[m1411] != null && !isNaN(r2769[m1411]) && r2769[c1412] != null && !isNaN(r2769[c1412]) && r2769[b1413] != null && !isNaN(r2769[b1413]) && r2769[l1421] != null && !isNaN(r2769[l1421]); }
function c2752(r2769, addProps) {
    return __awaiter(this, void 0, void 0, function* () { if (!w2781(r2769))
        return null; const s2770 = figma.createFrame(); s2770.expanded = false; if (s2770) {
        o2792(s2770, r2769, addProps);
        let objects = [];
        for (const b111 of r2769[e1427])
            yield p1529(b111, o => objects = [...objects, o]);
        for (const b111 of objects)
            s2770.appendChild(b111);
    } return s2770; });
}
function k2758(s2770, r2769, addProps) { o2792(s2770, r2769, addProps); u2733(s2770, r2769[e1427], r2769[e1427].length); }
function o2792(s2770, r2769, addProps) { s2770.cornerRadius = r2769[l1421]; t1590(s2770, r2769); m2703(s2770, r2769, addProps && r2769[e1427].length == 0); }
function l2780(m2771) { return true; }
function u2751(m2771) {
    return __awaiter(this, void 0, void 0, function* () { let objects = []; for (const b111 of m2771[r1410])
        yield p1529(b111, o => objects = [...objects, o]); yield figma.currentPage.loadAsync(); const m2772 = !isEmpty(objects) ? figma.group(objects, figma.currentPage) : null; if (m2772) {
        m2772.expanded = false;
        f2757(m2772, m2771);
    } return m2772; });
}
function f2757(m2772, m2771) { if (m2771[r1410].length == 0) {
    m2772.remove();
    return;
} u2733(m2772, m2771[r1410], m2771[r1410].length); u1540(m2772, m2771); }
function n2775(z2773) { return z2773[u1409] != null && !isNaN(z2773[u1409]) && z2773[m1411] != null && !isNaN(z2773[m1411]) && z2773[c1412] != null && !isNaN(z2773[c1412]); }
function d2793(z2773, addProps) { if (!n2775(z2773))
    return null; const t2774 = figma.createLine(); b2794(t2774, z2773, addProps, true); return t2774; }
function b2794(t2774, z2773, addProps, isValid = false) { if (!isValid && !n2775(z2773))
    return; t1590(t2774, z2773, true, 0); m2703(t2774, z2773, addProps); }
var v2766 = [];
function h4029(d2702) { return d2702[u1409] != null && !isNaN(d2702[u1409]) && d2702[m1411] != null && !isNaN(d2702[m1411]); }
function r2696(d2702) { const n2701 = d2702[e1405] ? figma.createRectangle() : figma.createEllipse(); if (!h4029(d2702))
    return n2701; if (v2766.includes(n2701))
    l2700(n2701, d2702);
else
    m2753(n2701, d2702); return n2701; }
function m2753(n2701, d2702) { o1591(n2701, d2702); n2699(n2701); }
function s2697() { h1527({ cmd: 'uiUpdateZoom', zoom: figma.viewport.zoom }); for (const point of v2766)
    x2698(point); }
function x2698(n2701) { u1592(n2701); n2699(n2701); }
function l2700(n2701, d2702) { o1591(n2701, d2702); n2699(n2701); }
function n2699(n2701) { if (n2701.removed)
    return; figma.currentPage.loadAsync().then(() => { const y3740 = x925(n2701.getPluginData('isCenter')); const k2708 = figma.currentPage.selection.includes(n2701); const color = y3740 ? [0xf2, 0x48, 0x22] : k2708 ? [12, 140, 233] : [255, 255, 255]; const border = y3740 ? [255, 255, 255] : k2708 ? [255, 255, 255] : [12, 140, 233]; n2701.fills = d958([['SOLID', color[0], color[1], color[2], 100]]); const effects = []; effects.push(...w1535([['DROP_SHADOW', border[0] / 255, border[1] / 255, border[2] / 255, 1, 0, 0, 0, (y3740 ? 3 : k2708 ? 5 : 3.6) / h2709, 'NORMAL', true, true]], true)); effects.push(...w1535([['DROP_SHADOW', color[0] / 255, color[1] / 255, color[2] / 255, 1, 0, 0, 0, (k2708 ? 4 : 2.4) / h2709, 'NORMAL', true, true]], true)); n2701.effects = effects; }); }
function k4030(genPoly) { return genPoly[u1409] != null && !isNaN(genPoly[u1409]) && genPoly[m1411] != null && !isNaN(genPoly[m1411]) && genPoly[c1412] != null && !isNaN(genPoly[c1412]) && genPoly[b1413] != null && !isNaN(genPoly[b1413]) && genPoly[n1418] != null && !isNaN(genPoly[n1418]) && genPoly[o1424] != null && !isNaN(genPoly[o1424]); }
function l2710(genPoly, addProps) { if (!k4030(genPoly))
    return null; const figPoly = figma.createPolygon(); y2711(figPoly, genPoly, addProps, true); return figPoly; }
function y2711(figPoly, genPoly, addProps, isValid = false) { if (!isValid && !k4030(genPoly))
    return; figPoly.cornerRadius = genPoly[n1418]; figPoly.pointCount = Math.max(3, genPoly[o1424]); t1590(figPoly, genPoly); m2703(figPoly, genPoly, addProps); }
function j2713(k2712) { return k2712[u1409] != null && !isNaN(k2712[u1409]) && k2712[m1411] != null && !isNaN(k2712[m1411]) && k2712[c1412] != null && !isNaN(k2712[c1412]) && k2712[b1413] != null && !isNaN(k2712[b1413]) && k2712[n1414] != null && !isNaN(k2712[n1414]); }
function r2714(k2712, addProps) { if (!j2713(k2712))
    return null; const figRect = figma.createRectangle(); z2715(figRect, k2712, addProps, true); return figRect; }
function z2715(figRect, k2712, addProps, isValid = false) { if (!isValid && !j2713(k2712))
    return; const found = k2712[l1403].findIndex(e => e[0] == 'ROUND_CORNERS'); if (found > -1) {
    const corners = k2712[l1403][found];
    figRect.topLeftRadius = corners[1];
    figRect.topRightRadius = corners[2];
    figRect.bottomLeftRadius = corners[3];
    figRect.bottomRightRadius = corners[4];
}
else
    figRect.cornerRadius = k2712[n1414]; t1590(figRect, k2712); m2703(figRect, k2712, addProps); }
function l2716(y2726) { return y2726[u1409] != null && !isNaN(y2726[u1409]) && y2726[m1411] != null && !isNaN(y2726[m1411]) && y2726[c1412] != null && !isNaN(y2726[c1412]) && y2726[b1413] != null && !isNaN(y2726[b1413]) && y2726[f1419] != null && !isNaN(y2726[f1419]) && y2726[p1425] != null && !isNaN(y2726[p1425]) && y2726[c1430] != null && !isNaN(y2726[c1430]); }
function x2717(y2726, addProps) { if (!l2716(y2726))
    return null; const z2727 = figma.createStar(); p2718(z2727, y2726, addProps, true); return z2727; }
function p2718(z2727, y2726, addProps, isValid = false) { if (!isValid && !l2716(y2726))
    return; z2727.cornerRadius = y2726[f1419]; z2727.pointCount = y2726[p1425]; z2727.innerRadius = Math.min(Math.max(0, y2726[c1430] / 100), 1); t1590(z2727, y2726); m2703(z2727, y2726, addProps); }
const k4273 = [];
function k2719(x2723) { return x2723[w1431] != null && x2723[u1409] != null && !isNaN(x2723[u1409]) && x2723[m1411] != null && !isNaN(x2723[m1411]) && x2723[c1412] != null && !isNaN(x2723[c1412]) && x2723[b1413] != null && !isNaN(x2723[b1413]) && x2723[o1433] != null && x2723[o1433] != NULL && x2723[r1434] != null && !isNaN(x2723[r1434]); }
function e2720(x2723, addProps) { if (!k2719(x2723))
    return null; const l2795 = figma.createText(); l2721(l2795, x2723, addProps, true); return l2795; }
function l2721(l2795, x2723, addProps, isValid = false) { if (!isValid && !k2719(x2723))
    return null; const fontName = { family: x2723[o1433], style: x2723[a1435] }; try {
    if (!k4273.includes(fontName)) {
        figma.loadFontAsync(fontName).then(() => { k4273.push(fontName); w2722(l2795, x2723, fontName, addProps); });
    }
    else {
        w2722(l2795, x2723, fontName, addProps);
    }
}
catch (e) {
    s955(e);
} }
function w2722(l2795, x2723, fontName, addProps) { l2795.fontName = fontName; l2795.fontSize = Math.max(1, x2723[r1434]); l2795.characters = x2723[w1431]; l2795.lineHeight = { unit: 'PERCENT', value: x2723[k1438] }; l2795.letterSpacing = { unit: 'PERCENT', value: x2723[y1439] }; if (x2723[k1436] == 0)
    l2795.textAlignHorizontal = 'LEFT';
else if (x2723[k1436] == 1)
    l2795.textAlignHorizontal = 'CENTER';
else if (x2723[k1436] == 2)
    l2795.textAlignHorizontal = 'RIGHT';
else if (x2723[k1436] == 3)
    l2795.textAlignHorizontal = 'JUSTIFIED'; if (x2723[v1437] == 0)
    l2795.textAlignVertical = 'TOP';
else if (x2723[v1437] == 1)
    l2795.textAlignVertical = 'CENTER';
else if (x2723[v1437] == 2)
    l2795.textAlignVertical = 'BOTTOM'; t1590(l2795, x2723); m2703(l2795, x2723, addProps); if (x2723[v1420] == 0 && x2723[u1426] == 0)
    l2795.textAutoResize = 'WIDTH_AND_HEIGHT';
else if (x2723[v1420] == 0)
    l2795.textAutoResize = 'HEIGHT';
else
    l2795.textAutoResize = 'NONE'; }
function p2778(u2728) { return true; }
function j2749(u2728, addProps) { if (!p2778(u2728))
    return null; const k2729 = figma.createVector(); z2755(k2729, u2728, addProps, true); return k2729; }
function z2755(k2729, u2728, addProps, isValid = false) { if (!isValid && !p2778(u2728))
    return; k2729.setVectorNetworkAsync(u2728[p1416]); t1590(k2729, u2728, false); m2703(k2729, u2728, addProps); }
function y2777(c2724) { return c2724[r1423] != null && !isNaN(c2724[r1423]) && c2724[y1429] != null && !isNaN(c2724[y1429]); }
function n2748(c2724, addProps) { const o2725 = figma.createVector(); i2754(o2725, c2724, addProps, true); return o2725; }
function i2754(o2725, c2724, addProps, isValid = false) { if (!isValid && !y2777(c2724))
    return; o2725.vectorPaths = [{ windingRule: c2724[r1423] == 1 ? 'NONZERO' : 'EVENODD', data: c2724[q1417] }]; o2725.cornerRadius = c2724[y1429]; t1590(o2725, c2724, false); m2703(o2725, c2724, addProps); }
