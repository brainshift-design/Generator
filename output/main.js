var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function d1051(key, tag) { return key.substring(0, tag.length + 1) == tag + ' '; }
function k1052(key, tag) { return key.substring(tag.length + 1); }
function k1053(key) { return d1051(key, z875); }
function p1054(key) { return d1051(key, t873); }
function u1055(key) { return d1051(key, v874); }
function u1056(key) { return k1052(key, z875); }
function j1057(key) { return k1052(key, t873); }
function o1058(key) { return k1052(key, v874); }
const generatorVersion = 385;
const j867 = 2147483647;
const NULL = '';
const t868 = '  ';
const e869 = '    ';
const w870 = '\n';
const r871 = '◦ G •';
const s872 = r871 + ' ';
const t873 = 'G_NODE';
const v874 = 'G_CONN';
const z875 = 'G_PAGE';
const j876 = 'G_TEMP';
const minWindowWidth = 602;
const minWindowHeight = 39;
const identity = Object.freeze([[1, 0, 0], [0, 1, 0], [0, 0, 1]]);
const Epsilon = 0.0000001;
const Tau = Math.PI * 2;
var l2540 = false;
function k877(x, eps = 0.000000001) { return Math.abs(x) < eps ? 0 : x; }
function nozero(x, eps = 0.000000001) { return x != 0 ? x : (x < 0 ? -eps : eps); }
function w878(v, eps = 0.000000001) { return point(nozero(v.x, eps), nozero(v.y, eps)); }
function equal(a, b, eps = 0.000000001) { return Math.abs(b - a) < eps; }
function sqr(x) { return x * x; }
;
function cube(x) { return x * x * x; }
;
function c879(f) { return Math.floor(f) | 0; }
function l880(x) { x = c879(x); x--; x |= x >> 1; x |= x >> 2; x |= x >> 4; x |= x >> 8; x |= x >> 16; x |= x >> 32; return ++x; }
function gcd(a, b) { let temp; while (1) {
    temp = a % b;
    if (temp == 0)
        return b;
    a = b;
    b = temp;
} }
function distv(p1, p2) { const dx = p2.x - p1.x; const dy = p2.y - p1.y; return Math.sqrt(dx * dx + dy * dy); }
function l881(v) { let angle = Math.atan2(v.y, v.x); if (angle < 0)
    angle += Tau; return angle; }
function anglev2(v1, v2) { return anglev2_(v1.x, v1.y, v2.x, v2.y); }
function anglev2_(x1, y1, x2, y2) { const dx = x2 - x1; const dy = y2 - y1; let angle = Math.atan2(dy, dx); if (angle < 0)
    angle += Tau; return angle; }
function o883(v) { return Math.sqrt(v.x * v.x + v.y * v.y); }
function lengthv_(x, y) { return Math.sqrt(x * x + y * y); }
function q884(v) { return point(v.x == 0 ? 0 : v.x / o883(v), v.y == 0 ? 0 : v.y / o883(v)); }
function dotv(v1, v2) { return v1.x * v2.x + v1.y * v2.y; }
function i885(a1, a2) { let diff = a2 - a1; while (diff <= -Tau / 2)
    diff += Tau; while (diff > Tau / 2)
    diff -= Tau; return diff; }
function m886(v, m) { let v3 = [v.x, v.y, 1]; let r = m950(v3, m); return point(r[0], r[1]); }
function y887(...mm) { l954(mm.length > 0, 'mulm3m3() must take at least one argument'); let result = clone(mm[0]); for (let a = 1; a < mm.length; a++) {
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
function e888(m, s) { for (let i = 0; i < 3; i++)
    for (let j = 0; j < 3; j++)
        m[i][j] /= s; return m; }
function adjugate(m) { return cofactor(transpose(m)); }
function transpose(m) { return [[m[0][0], m[1][0], m[2][0]], [m[0][1], m[1][1], m[2][1]], [m[0][2], m[1][2], m[2][2]]]; }
function cofactor(m) { return [[m[1][1] * m[2][2] - m[2][1] * m[1][2], -(m[1][0] * m[2][2] - m[2][0] * m[1][2]), m[1][0] * m[2][1] - m[2][0] * m[1][1]], [-(m[0][1] * m[2][2] - m[2][1] * m[0][2]), m[0][0] * m[2][2] - m[2][0] * m[0][2], -(m[0][0] * m[2][1] - m[2][0] * m[0][1])], [m[0][1] * m[1][2] - m[1][1] * m[0][2], -(m[0][0] * m[1][2] - m[1][0] * m[0][2]), m[0][0] * m[1][1] - m[1][0] * m[0][1]]]; }
function determinant(m) { return m[0][0] * (m[1][1] * m[2][2] - m[1][2] * m[2][1]) - m[0][1] * (m[1][0] * m[2][2] - m[2][0] * m[1][2]) + m[0][2] * (m[1][0] * m[2][1] - m[2][0] * m[1][1]); }
function e889(m) { return e888(adjugate(m), determinant(m)); }
function e890(angle) { const cosA = k877(Math.cos(angle)); const sinA = k877(Math.sin(angle)); return [[cosA, sinA, 0], [-sinA, cosA, 0], [0, 0, 1]]; }
function j891(x = 0, y = 0, e892 = 1, b893 = 1, angle = 0, i894 = 0, a895 = 0) { const cosA = Math.cos(angle); const sinA = Math.sin(angle); return [[e892 * cosA - a895 * sinA, -i894 * cosA + b893 * sinA, x], [a895 * cosA + e892 * sinA, b893 * cosA + i894 * sinA, y], [0, 0, 1]]; }
function u896(v1, v2) { return v1.x * v2.y - v1.y * v2.x; }
function p897(v1, v2) { return point(v1.x + v2.x, v1.y + v2.y); }
function sqrv(v) { return x898(v, v); }
function x898(v1, v2) { return point(v1.x * v2.x, v1.y * v2.y); }
function t899(v, s) { return point(v.x * s, v.y * s); }
function j900(v1, v2) { return point(v1.x / v2.x, v1.y / v2.y); }
function v901(v, s) { return point(v.x / s, v.y / s); }
function f902(v1, v2) { return point(v1.x - v2.x, v1.y - v2.y); }
function n903(str) { return decodeURI(encodeURIComponent(str)); }
function q904(str) { return decodeURIComponent(encodeURI(str)); }
function f905(bytes) { let str = ''; for (let i = 0; i < bytes.length; i++)
    str += String.fromCharCode(bytes[i]); return str; }
function m906(str) { return Array.from(q904(str), c => c.charCodeAt(0)); }
function o907(array, size) { const newArray = new Uint8Array(size); w908(array, newArray); return newArray; }
function w908(src, dst) { w909(src, 0, src.length, dst, 0, dst.length); }
function w909(src, m910, o911, dst, v912, c913) { const size = Math.min(o911, c913); for (let i = 0; i < size; i++)
    dst[v912 + i] = src[m910 + i]; }
function y914(j915, n916) { if (j915.length != n916.length)
    return false; for (let i = 0; i < j915.length; i++) {
    if (j915[i] != n916[i])
        return false;
} return true; }
function c917(f918, p919) { return f918.findIndex(i => p919.includes(i)) > -1; }
function h920(list) { return list ? '<==' : '<--'; }
;
function t921(list) { return list ? '==>' : '-->'; }
;
function f922(nodeId) { return t873 + ' ' + nodeId; }
function p923(name) { return v874 + ' ' + name; }
function z924(name) { return z875 + ' ' + name; }
function n925(str) { return str.toLowerCase() == 'true' || str == '1'; }
function n926(q927, l928 = false) { return d933(q927.outputNodeId, q927.outputId, q927.outputOrder, q927.inputNodeId, q927.inputId, q927.list, l928); }
function v929(outputNodeId, outputId, outputOrder, inputNodeId, inputId) { return p923(outputNodeId + ' ' + outputId + ' ' + outputOrder + ' ' + inputNodeId + ' ' + inputId); }
function e930(q243) { return v929(q243.outputNodeId, q243.outputId, q243.outputOrder, q243.inputNodeId, q243.inputId); }
function t931(q243) { return v929(q243.output.node.id, q243.output.id, q243.outputOrder, q243.input.node.id, q243.input.id); }
function n932(q243, l928 = false) { return d933(q243.output.node.id, q243.output.id, q243.outputOrder, q243.input.node.id, q243.input.id, q243.list, l928); }
function d933(outputNodeId, outputId, outputOrder, inputNodeId, inputId, list, l928 = false) { const sp = l928 ? ' ' : '  '; const jsp = l928 ? '' : ' '; const arrow = sp + w937(typeof outputOrder == 'string' ? parseInt(outputOrder) : outputOrder) + t921(typeof list == 'string' ? n925(list) : list) + sp; const join = jsp + '.' + jsp; return outputNodeId + join + outputId + arrow + inputNodeId + join + inputId; }
function s934(pageId) { return z924(pageId); }
function q935(num) { const str = num.toString(); let sup = ''; for (const c of str)
    sup += f936(c); return sup; }
function f936(c) { switch (c) {
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
function w937(num) { const str = num.toString(); let sup = ''; for (const c of str)
    sup += y938(c); return sup; }
function y938(c) { switch (c) {
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
function l939(bool) { return bool ? 'true' : 'false'; }
function isValid(val) { return val != undefined && val != null; }
function isEmpty(array) { return array.length == 0; }
function w940(array, item) { x941(array, array.indexOf(item)); }
function x941(array, index) { if (index > -1 && index < array.length)
    array.splice(index, 1); }
function b942(array) { if (isEmpty(array))
    return null; let last = array.at(-1); array.splice(array.length - 1, 1); return last; }
function h943(array) { return array[array.length - 1]; }
function r944(array, from, to) { const item = array[from]; array.splice(from, 1); array.splice(to, 0, item); }
function q945(array, item) { const index = array.indexOf(item); if (index > -1)
    array.splice(index, 1); }
function n946(m2796, array) { for (const item of array) {
    const index = m2796.indexOf(item);
    if (index > -1)
        m2796.splice(index, 1);
} }
function b947(array, where) { const index = array.findIndex(where); if (index > -1)
    array.splice(index, 1); }
function d948(styleId) { return styleId.split(',')[0] + ','; }
function y949(points) { let e4036 = ''; if (points.length < 2)
    return e4036; e4036 += 'M'; e4036 += ' ' + k877(points[0].x); e4036 += ' ' + k877(points[0].y); for (let i = 1; i < points.length; i++) {
    e4036 += ' L' + ' ' + k877(points[i].x) + ' ' + k877(points[i].y);
} return e4036; }
function point(x, y) { return { x: x, y: y }; }
function m950(v, m) { let r = [0, 0, 0]; for (let i = 0; i < 3; i++)
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
        let k111 = {};
        for (const key in val)
            k111[key] = clone(val[key]);
        return k111;
    }
} throw 'unknown'; }
function r951(array, item, equal = null) { if (equal) {
    if (Array.isArray(item))
        item.forEach(i => r951(array, i, equal));
    else if (!array.find(i => equal(i, item)))
        array.push(item);
}
else {
    if (Array.isArray(item))
        item.forEach(i => r951(array, i));
    else if (!array.includes(item))
        array.push(item);
} }
function k952(array, item, equal) { if (Array.isArray(item))
    item.forEach(i => k952(array, i, equal));
else if (!array.find(equal))
    array.push(item); }
function i953(array, item, except) { if (Array.isArray(item))
    item.forEach(i => i953(array, i, except));
else if (!array.find(except))
    array.push(item); }
function l954(...args) { if (l2540) {
    console.assert(...args);
} }
function q955(...args) { if (l2540)
    console.error(...args); }
function q956(str, trim) { while (str.length >= trim.length && str.substring(0, trim.length) == trim)
    str = str.substring(trim.length); return str; }
function q957(str, trim) { while (str.length >= trim.length && str.substring(str.length - trim.length) == trim)
    str = str.substring(0, str.length - trim.length); return str; }
function o958(k4096) { const fills = []; for (const fill of k4096) {
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
            const l4212 = fill[1];
            const stops = [];
            for (const stop of fill[2]) {
                stops.push({ color: { r: Math.min(Math.max(0, stop[0]), 1), g: Math.min(Math.max(0, stop[1]), 1), b: Math.min(Math.max(0, stop[2]), 1), a: Math.min(Math.max(0, stop[3]), 1) }, position: stop[4] });
            }
            fills.push({ type: fill[0], gradientTransform: l4212, gradientStops: stops, blendMode: fill[3] });
            break;
        }
    }
} return fills; }
function c959(type) { return d1092.includes(type); }
const f1059 = 'LIST#';
const k1060 = 'NLIST#';
const e1061 = 'TLIST#';
const o1062 = 'SLIST#';
const w1063 = 'NULL';
const l1064 = 'VAR';
const i1065 = 'VARGRP';
const i1066 = 'FEEDBK';
const s1067 = 'REPT';
const n1068 = 'CACHE';
const x1069 = 'FRZ';
const l1070 = 'TIMER';
const r1071 = 'VNAME';
const GET_LIST_VALUE_NAMES = 'GVNAMES';
const LIST_VALUE_NAMES = 'VNAMES';
const OBJECT_NAME = 'ONAME';
const y1072 = 'CMB';
const c1073 = 'LSASIT';
const f1074 = 'EXTR';
const q1075 = 'SETP';
const e1076 = 'GETP';
const k1077 = 'SUBLST';
const f1078 = 'UNIQ';
const REORDER_LIST = 'RORD';
const SHIFT_LIST = 'SHFTLST';
const y1079 = 'REVLST';
const s1080 = 'SORT';
const h1081 = 'CLMN';
const q1082 = 'CELL';
const o1083 = 'LIST';
const b1084 = 'COUNT';
const OBJECT_COUNT = 'OBJCOUNT';
const m1085 = 'LCONT';
const g1086 = 'SELECT';
const SELECT_FROM_LIST = 'LSTSEL';
const z1087 = 'IF';
const k1088 = 'LSTFLT';
const x1089 = 'ITER';
const k1090 = 'ANY#';
const l1091 = [f1059, k1060, e1061, o1062, y1072, f1074, q1075, e1076, k1077, o1083, b1084, m1085, s1067];
const d1092 = [f1059, k1060, e1061, o1062];
const m1093 = [w1063, l1064, i1065, ...l1091, c1073, f1074, q1075, e1076, k1077, f1078, REORDER_LIST, SHIFT_LIST, y1079, h1081, s1080, q1082, o1083, g1086, SELECT_FROM_LIST, z1087, k1088, i1066, s1067, x1089, n1068, x1069, l1070, r1071, GET_LIST_VALUE_NAMES, LIST_VALUE_NAMES, OBJECT_NAME];
const e1094 = 'NUM#';
const v1095 = 'NUM';
const NUMBER_PRECISION = 'NPREC';
const d1096 = 'NSIGN';
const u1097 = 'ABS';
const NUMBER_NEGATIVE = 'NEG';
const e1098 = 'ROUND';
const NUMBER_QUANTIZE = 'QUANT';
const u1099 = 'SMINMAX';
const a1100 = 'MINMAX';
const e1101 = 'LIM';
const o1102 = 'NCURVE';
const NUMBER_BIAS = 'NBIAS';
const u1103 = 'NANISNUM';
const a1104 = 'CONST';
const a1105 = 'DATE';
const f1106 = 'SEQ';
const h1107 = 'RANGE';
const e1108 = 'WAVE';
const y1109 = 'RAND';
const p1110 = 'NOISE';
const j1111 = 'PROB';
const d1112 = 'ACCUM';
const p1113 = 'LERP';
const n1114 = 'SOLVE';
const d1115 = 'NANIM';
const n1116 = 'SMATH';
const a1117 = 'MATH';
const u1118 = 'ADD';
const z1119 = 'SUB';
const c1120 = 'MUL';
const i1121 = 'DIV';
const i1122 = 'MOD';
const p1123 = 'EXP';
const n1124 = 'NBOOL';
const a1125 = 'NOT';
const n1126 = 'AND';
const m1127 = 'OR';
const y1128 = 'XOR';
const j1129 = 'COND';
const m1130 = 'EQ';
const k1131 = 'NE';
const g1132 = 'LT';
const k1133 = 'LE';
const y1134 = 'GT';
const o1135 = 'GE';
const t1136 = 'TRIG';
const v1137 = 'SIN';
const o1138 = 'COS';
const a1139 = 'TAN';
const h1140 = 'ATAN2';
const y1141 = 'CNVANG';
const u1142 = [a1117, n1116, u1118, z1119, c1120, i1121, i1122, p1123];
const l1143 = [n1124, a1125, n1126, m1127, y1128];
const i1144 = [j1129, m1130, k1131, g1132, k1133, y1134, o1135];
const a1145 = [t1136, v1137, o1138, a1139, h1140];
const h1146 = 'TEXT#';
const o1147 = 'TEXT';
const y1148 = 'TLEN';
const b1149 = 'TTRIM';
const i1150 = 'TSUB';
const d1151 = 'TCONT';
const z1152 = 'TCASE';
const e1153 = 'TREPL';
const r1154 = 'TJOIN';
const r1155 = 'TPAD';
const w1156 = 'TCMP';
const z1157 = 'TCHAR';
const h1158 = 'TUNI';
const z1159 = 'INDEX';
const m1160 = 'N2T';
const s1161 = 'C2T';
const j1162 = 'T2N';
const v1163 = 'T2C';
const l1164 = 'TSPLT';
const q3505 = 'TJSON';
const d1166 = 'TCSV';
const t1167 = 'FETCH';
const q1168 = 'TFILE';
const z1169 = [e1094, k1060, v1095, NUMBER_PRECISION, d1096, u1097, NUMBER_NEGATIVE, e1098, NUMBER_QUANTIZE, u1099, a1100, e1101, o1102, NUMBER_BIAS, u1103, a1104, a1105, f1106, h1107, e1108, y1109, p1110, d1112, p1113, n1114, d1115, m1160, z1157, ...u1142, ...l1143, ...i1144, ...a1145, y1141];
const j1170 = [h1146, e1061, o1147, y1148, b1149, i1150, d1151, z1152, r1154, r1155, e1153, w1156, h1158, z1159, j1162, v1163, l1164, q3505, d1166, t1167, q1168];
const r1171 = 'COL#';
const l1172 = 'COL';
const u1173 = 'CVAL';
const s1174 = 'CCOR';
const e1175 = 'COLP3';
const o1176 = 'CCNT';
const w1177 = 'BLND';
const h1178 = 'CLERP';
const m1179 = 'CBLND';
const s1180 = [r1171, l1172, s1174, e1175, w1177, h1178, m1179, s1161];
const z1181 = 'FILL#';
const o1182 = 'FILL';
const w1183 = [z1181, o1182];
const b1184 = 'STRK#';
const i1185 = 'STRK';
const k1186 = [b1184, i1185];
const c1187 = 'CSTOP#';
const t1188 = 'CSTOP';
const g1189 = [c1187, t1188];
const s1190 = 'GRAD#';
const u1191 = 'GRAD';
const o1192 = [s1190, u1191];
const o1193 = 'RCRN#';
const n1194 = 'RCRN';
const o1195 = [o1193, n1194];
const o1196 = 'DRSH#';
const z1197 = 'DRSH';
const z1198 = [o1196, z1197];
const c1199 = 'INSH#';
const x1200 = 'INSH';
const o1201 = [c1199, x1200];
const x1202 = 'LBLR#';
const z1203 = 'LBLR';
const r1204 = [x1202, z1203];
const q1205 = 'BBLR#';
const s1206 = 'BBLR';
const f1207 = [q1205, s1206];
const m1208 = 'MASK#';
const n1209 = 'MASK';
const d1210 = [m1208, n1209];
const z1211 = 'BLEND#';
const r1212 = 'BLEND';
const u1213 = [z1211, r1212];
const h1214 = [...o1195, ...z1198, ...o1201, ...r1204, ...f1207, ...u1213, ...d1210];
const n1215 = [r1171, z1181, s1190, b1184, o1196, c1199, x1202, q1205, z1211, m1208];
const e1216 = 'CSTL';
const m1217 = 'SHP#';
const t1218 = 'RECT#';
const d1219 = 'RECT';
const u1220 = [t1218, d1219];
const b1221 = 'LINE#';
const z1222 = 'LINE';
const k1223 = [b1221, z1222];
const h1224 = 'ELPS#';
const p1225 = 'ELPS';
const c1226 = [h1224, p1225];
const w1227 = 'TRPZ#';
const g1228 = 'TRPZ';
const d1229 = [w1227, g1228];
const c1236 = 'POLY#';
const o1237 = 'POLY';
const f1238 = [c1236, o1237];
const k1239 = 'STAR#';
const q1240 = 'STAR';
const f1241 = [k1239, q1240];
const q1242 = 'TXTS#';
const f1243 = 'TXTS';
const d1244 = [q1242, f1243];
const s1245 = 'PT#';
const c1246 = 'PT';
const u1247 = [s1245, c1246];
const h1248 = 'PCORN';
const a1249 = 'VPATH#';
const k1250 = 'VPATH';
const b1251 = [a1249, k1250];
const f1252 = 'VPT#';
const w1253 = 'VPT';
const i1254 = [f1252, w1253];
const w1255 = 'VEDGE#';
const o1256 = 'VEDGE';
const m1257 = [w1255, o1256];
const r1258 = 'VREG#';
const b1259 = 'VREG';
const n1260 = [r1258, b1259];
const v1261 = 'VNET#';
const z1262 = 'VNET';
const i1263 = [v1261, z1262];
const x1264 = 'SGRP#';
const n1265 = 'SGRP';
const d1266 = [x1264, n1265];
const m1267 = 'FRM#';
const f1268 = 'FRM';
const c1269 = [m1267, f1268];
const p1231 = 'ARC#';
const p1230 = 'ARC';
const w1232 = [p1231, p1230];
const p1234 = 'WAVEP#';
const e1233 = 'WAVEP';
const e1235 = [p1234, e1233];
const l1270 = 'MOVE';
const p1271 = 'ROT';
const h1272 = 'SCALE';
const i1273 = 'SKEW';
const n1274 = 'SCENTR';
const o1275 = 'RSTX';
const l1276 = 'PLACE';
const u1277 = 'APPLY';
const PATH_LENGTH = 'PTHLEN';
const JOIN_PATHS = 'JOINPTH';
const REORIENT_PATHS = 'REORPTH';
const f1283 = 'PTALPATH';
const t1284 = 'CPTONPATH';
const g1278 = 'MESPT';
const p1279 = 'VECLEN';
const n1280 = 'CIRCEN';
const ARC_FROM_POINTS = 'ARCPT';
const i1281 = 'INTLIN';
const p1282 = 'PTLERP';
const REVERSE_PATH = 'REVPTH';
const BLEND_PATH = 'BLENDPTH';
const PATH_TYPES = [k1250, g1228, p1230, e1233];
const PATH_VALUES = [a1249, w1227, p1231, p1234];
const n1285 = 'BOOL';
const k1286 = 'BOOL#';
const z1287 = 'BOOLU';
const w1288 = 'BOOLS';
const s1289 = 'BOOLI';
const p1290 = 'BOOLE';
const p1291 = [n1285, k1286, z1287, w1288, s1289, p1290];
const x1292 = 'RENDER';
const EXPORT = 'EXPORT';
const e1293 = [m1217, o1062, t1218, b1221, h1224, w1227, c1236, k1239, q1242, s1245, a1249, f1252, w1255, r1258, v1261, p1231, p1234, x1264, m1267, k1286, o1196, c1199, x1202, q1205, z1211, m1208];
const x1294 = [p1271, h1272, i1273];
const u1295 = [...e1293, ...u1220, ...k1223, ...c1226, ...d1229, ...f1238, ...f1241, ...d1244, ...u1247, h1248, ...b1251, ...i1254, ...m1257, ...n1260, ...i1263, ...w1232, ...e1235, ...d1266, ...c1269, ...p1291, l1270, ...x1294, n1274, o1275, l1276, u1277, PATH_LENGTH, JOIN_PATHS, REORIENT_PATHS, f1283, t1284, g1278, p1279, n1280, p1230, e1233, ARC_FROM_POINTS, i1281, p1282, REVERSE_PATH, BLEND_PATH, x1292, EXPORT];
const g1296 = [f1059, k1060, e1061, o1062, e1094, h1146, r1171, z1181, c1187, s1190, b1184, c1187, s1190, m1217, t1218, b1221, h1224, w1227, c1236, k1239, q1242, s1245, a1249, f1252, w1255, r1258, v1261, x1264, m1267, o1193, o1196, c1199, x1202, q1205, z1211, m1208];
const h1297 = 'GROUP';
const h1298 = 'GPARAM';
const p1299 = [h1297, h1298];
const o1300 = 'CMNT';
const p1301 = 'CMNTARR';
const o1302 = 'PANEL';
const e1303 = 'ACT';
const o1304 = 'BFACT';
const v1305 = 'BFLST';
const u1306 = 'DIS';
const w1307 = 'NOC';
const PARAM = 'PARAM';
const j1308 = 'LOG';
const t1309 = 'GRAPH';
const l1310 = [[i1122, '%'], [i1121, '/'], [z1119, '−'], [u1118, '+'], [c1120, '×'], [p1123, 'e<sup>x']];
const u1311 = [[i1121, '/'], [z1119, '−'], [u1118, '+'], [c1120, '×']];
const f1312 = 0;
const c1313 = 1;
const n1314 = 2;
const f1315 = 3;
const g1316 = [[f1312, 'not'], [c1313, 'xor'], [n1314, 'or'], [f1315, 'and']];
const t1317 = 0;
const p1318 = 1;
const j1319 = 2;
const d1320 = 3;
const d1321 = 4;
const q1322 = 5;
const m1323 = [[t1317, '<'], [p1318, '≤'], [j1319, '≠'], [d1320, '='], [d1321, '≥'], [q1322, '>']];
const n1324 = 0;
const v1325 = 1;
const s1326 = 2;
const c1327 = 3;
const l1328 = 4;
const s1329 = 5;
const i1330 = [[n1324, 'sin'], [v1325, 'cos'], [s1326, 'tan'], [c1327, 'asin'], [l1328, 'acos'], [s1329, 'atan']];
const d1331 = 'EMPTY';
const m1332 = 'CONNECT';
const r1333 = 'CREATE';
const a1334 = 'CREATE_INSERT';
const x1335 = 'DELETE';
const t1336 = 'DISCONNECT';
const k1337 = 'LINK_STYLE';
const q1338 = 'LINK_VARIABLE';
const x1339 = 'LINK_VARIABLE_GROUP';
const t1340 = 'MAKE_ACTIVE';
const MAKE_NOT_CONDITION_ACTION = 'MAKE_NOT_CONDITION';
const n1341 = 'MAKE_PASSIVE';
const q1342 = 'PASTE';
const c1343 = 'RECONNECT';
const h1344 = 'REMOVE';
const v1345 = 'RENAME';
const j1346 = 'REORDER_INPUTS';
const u1347 = 'REORDER_CONNECTIONS';
const q1348 = 'SELECT';
const r1349 = 'SELECT_MOVE';
const o1350 = 'MOVE_NODES';
const m1351 = 'SET_PARAM_VALUE';
const SET_MULTIPLE_VALUES_ACTION = 'SET_MULTIPLE_VALUES';
const s1352 = 'SET_PARAM_SETTING';
const x1353 = 'SET_NODE_RECT';
const l1354 = 'TOGGLE_DISABLE';
const k1355 = 'TOGGLE_PARAM_HEADER';
const z1356 = 'SET_CURRENT_GRAPH';
const b1357 = 'CREATE_PAGE';
const r1358 = 'DELETE_PAGE';
const s1359 = 'GROUP_NODES';
const c1360 = 'UNGROUP_NODES';
const s1361 = 'HIGHLIGHT_NODES';
const SCROLL_LIST_NODE_ACTION = 'SCROLL_LIST_NODE';
const SET_LIST_DIVIDER_ACTION = 'SET_LIST_DIVIDER';
const SET_NODE_PARAM_ACTION = 'SET_NODE_PARAM';
const k1362 = 'BNORM';
const q1363 = 'BDARK';
const l1364 = 'BMULT';
const h1365 = 'BPDRK';
const i1366 = 'BBURN';
const o1367 = 'BLITE';
const c1368 = 'BSCRN';
const q1369 = 'BPLGT';
const l1370 = 'BDODG';
const v1371 = 'BOVER';
const c1372 = 'BSOFT';
const r1373 = 'BHARD';
const q1374 = 'BDIFF';
const q1375 = 'BEXCL';
const n1376 = 'BHUE';
const o1377 = 'BSAT';
const f1378 = 'BCOL';
const s1379 = 'BLUM';
const m1380 = [[k1362, 'normal', 'NORMAL'], [q1363, 'darken', 'DARKEN'], [l1364, 'multiply', 'MULTIPLY'], [h1365, 'plus darker', 'LINEAR_BURN'], [i1366, 'color burn', 'COLOR_BURN'], [o1367, 'lighten', 'LIGHTEN'], [c1368, 'screen', 'SCREEN'], [q1369, 'plus lighter', 'LINEAR_DODGE'], [l1370, 'color dodge', 'COLOR_DODGE'], [v1371, 'overlay', 'OVERLAY'], [c1372, 'soft light', 'SOFT_LIGHT'], [r1373, 'hard light', 'HARD_LIGHT'], [q1374, 'difference', 'DIFFERENCE'], [q1375, 'exclusion', 'EXCLUSION'], [n1376, 'hue', 'HUE'], [o1377, 'saturation', 'SATURATION'], [f1378, 'color', 'COLOR'], [s1379, 'luminosity', 'LUMINOSITY']];
const x1381 = [['thin', 100], ['extra light', 200], ['light', 300], ['regular', 400], ['medium', 500], ['semi bold', 600], ['bold', 700], ['extra bold', 800], ['black', 900]];
const l1382 = 0;
const u1383 = 1;
const d1384 = 2;
const v1385 = 2;
const l1386 = 3;
const o1387 = 3;
const f1388 = 4;
const p1389 = 4;
const y1390 = 5;
const s1391 = 6;
const t1392 = 7;
const x1393 = 8;
const v1394 = 9;
const a1395 = 10;
const d1396 = 11;
const z1397 = 12;
const r1398 = 13;
const z1399 = 14;
const n1400 = 15;
const u1401 = 16;
const s1402 = 17;
const a1403 = 18;
const g1404 = 19;
const t1405 = 20;
const k1406 = 21;
const b1407 = 22;
const g1408 = 23;
const v1409 = 24;
const w1410 = 24;
const k1411 = 25;
const w1412 = 26;
const z1413 = 27;
const g1414 = 28;
const e1415 = 28;
const g1416 = 28;
const q1417 = 28;
const m1418 = 28;
const p1419 = 28;
const w1420 = 28;
const t1421 = 28;
const i1422 = 29;
const m1423 = 29;
const r1424 = 29;
const t1425 = 29;
const b1426 = 29;
const e1427 = 29;
const w1428 = 30;
const q1429 = 30;
const n1430 = 30;
const o1431 = 30;
const x1432 = 31;
const f1433 = 31;
const e1434 = 32;
const r1435 = 33;
const f1436 = 34;
const l1437 = 35;
const n1438 = 36;
const k1439 = 37;
const l2797 = '12345679ABCDEFGHJKLMNPQRSTUVWXYZ';
function b845(array, chars = l2797) { let z847 = ''; let len = array.length; let i = 0; while (len > 0) {
    if (len >= 5) {
        const a0 = array[i], a1 = array[i + 1], a2 = array[i + 2], a3 = array[i + 3], a4 = array[i + 4];
        z847 += chars[(a0 & 0xF8) >>> 3];
        z847 += chars[((a0 & 0x07) << 2) | ((a1 & 0xC0) >>> 6)];
        z847 += chars[(a1 & 0x3E) >>> 1];
        z847 += chars[((a1 & 0x01) << 4) | ((a2 & 0xF0) >>> 4)];
        z847 += chars[((a2 & 0x0F) << 1) | ((a3 & 0x80) >>> 7)];
        z847 += chars[(a3 & 0x7C) >>> 2];
        z847 += chars[((a3 & 0x03) << 3) | ((a4 & 0xE0) >>> 5)];
        z847 += chars[(a4 & 0x1F)];
    }
    else if (len == 4) {
        const a0 = array[i], a1 = array[i + 1], a2 = array[i + 2], a3 = array[i + 3];
        z847 += chars[(a0 & 0xF8) >>> 3];
        z847 += chars[((a0 & 0x07) << 2) | ((a1 & 0xC0) >>> 6)];
        z847 += chars[(a1 & 0x3E) >>> 1];
        z847 += chars[((a1 & 0x01) << 4) | ((a2 & 0xF0) >>> 4)];
        z847 += chars[((a2 & 0x0F) << 1) | ((a3 & 0x80) >>> 7)];
        z847 += chars[(a3 & 0x7C) >>> 2];
        z847 += chars[((a3 & 0x03) << 3)];
    }
    else if (len == 3) {
        const a0 = array[i], a1 = array[i + 1], a2 = array[i + 2];
        z847 += chars[(a0 & 0xF8) >>> 3];
        z847 += chars[((a0 & 0x07) << 2) | ((a1 & 0xC0) >>> 6)];
        z847 += chars[(a1 & 0x3E) >>> 1];
        z847 += chars[((a1 & 0x01) << 4) | ((a2 & 0xF0) >>> 4)];
        z847 += chars[((a2 & 0x0F) << 1)];
    }
    else if (len == 2) {
        const a0 = array[i], a1 = array[i + 1];
        z847 += chars[(a0 & 0xF8) >>> 3];
        z847 += chars[((a0 & 0x07) << 2) | ((a1 & 0xC0) >>> 6)];
        z847 += chars[(a1 & 0x3E) >>> 1];
        z847 += chars[((a1 & 0x01) << 4)];
    }
    else if (len == 1) {
        const a0 = array[i];
        z847 += chars[(a0 & 0xF8) >>> 3];
        z847 += chars[((a0 & 0x07) << 2)];
    }
    i += 5;
    len -= 5;
} return z847; }
function f846(z847, chars = l2797) { const array = []; let len = z847.length; let c = 0; while (len > 0) {
    if (len >= 8) {
        const c0 = chars.indexOf(z847[c]), c1 = chars.indexOf(z847[c + 1]), c2 = chars.indexOf(z847[c + 2]), c3 = chars.indexOf(z847[c + 3]), c4 = chars.indexOf(z847[c + 4]), c5 = chars.indexOf(z847[c + 5]), c6 = chars.indexOf(z847[c + 6]), c7 = chars.indexOf(z847[c + 7]);
        array.push((c0 << 3) | ((c1 & 0x1C) >>> 2));
        array.push(((c1 & 0x03) << 6) | (c2 << 1) | ((c3 & 0x10) >>> 4));
        array.push(((c3 & 0x0F) << 4) | ((c4 & 0x1E) >>> 1));
        array.push(((c4 & 0x01) << 7) | (c5 << 2) | ((c6 & 0x18) >>> 3));
        array.push(((c6 & 0x07) << 5) | c7);
    }
    else if (len == 7) {
        const c0 = chars.indexOf(z847[c]), c1 = chars.indexOf(z847[c + 1]), c2 = chars.indexOf(z847[c + 2]), c3 = chars.indexOf(z847[c + 3]), c4 = chars.indexOf(z847[c + 4]), c5 = chars.indexOf(z847[c + 5]), c6 = chars.indexOf(z847[c + 6]);
        array.push((c0 << 3) | ((c1 & 0x1C) >>> 2));
        array.push(((c1 & 0x03) << 6) | (c2 << 1) | ((c3 & 0x10) >>> 4));
        array.push(((c3 & 0x0F) << 4) | ((c4 & 0x1E) >>> 1));
        array.push(((c4 & 0x01) << 7) | (c5 << 2) | ((c6 & 0x18) >>> 3));
    }
    else if (len == 5) {
        const c0 = chars.indexOf(z847[c]), c1 = chars.indexOf(z847[c + 1]), c2 = chars.indexOf(z847[c + 2]), c3 = chars.indexOf(z847[c + 3]), c4 = chars.indexOf(z847[c + 4]);
        array.push((c0 << 3) | ((c1 & 0x1C) >>> 2));
        array.push(((c1 & 0x03) << 6) | (c2 << 1) | ((c3 & 0x10) >>> 4));
        array.push(((c3 & 0x0F) << 4) | ((c4 & 0x1E) >>> 1));
    }
    else if (len == 4) {
        const c0 = chars.indexOf(z847[c]), c1 = chars.indexOf(z847[c + 1]), c2 = chars.indexOf(z847[c + 2]), c3 = chars.indexOf(z847[c + 3]);
        array.push((c0 << 3) | ((c1 & 0x1C) >>> 2));
        array.push(((c1 & 0x03) << 6) | (c2 << 1) | ((c3 & 0x10) >>> 4));
    }
    else if (len == 2) {
        const c0 = chars.indexOf(z847[c]), c1 = chars.indexOf(z847[c + 1]);
        array.push((c0 << 3) | ((c1 & 0x1C) >>> 2));
    }
    c += 8;
    len -= 8;
} return array; }
function x2102(nodeKey, z4008) {
    return __awaiter(this, void 0, void 0, function* () { const log = w2103(yield y1547(nodeKey, false)); if (z4008) {
        console.log('%c%s\n%c%s', 'background: #fa24; color: white;', j1057(nodeKey), 'background: #fa44; color: #edc;', log);
    }
    else {
        console.log('%c%s\n%c%s', 'background: #fdb; color: black;', j1057(nodeKey), 'background: #fed; color: black;', log);
    } });
}
function w2103(json) { let b4037 = json.replace('{\n', '').replace('\n}', '').replace('[\n' + t868, '').replace('\n' + t868 + ']', '').split(t868 + '"params":\n').join('').split('": "').join(': ').split('", "').join(': ').split(t868 + '"').join(t868).split(t868 + t868 + '["').join(t868 + t868).split('",\n').join('\n').split('"\n').join('\n').split('"],\n').join('\n'); if (b4037[b4037.length - 1] == '"')
    b4037 = b4037.substring(0, b4037.length - 1); if (b4037.substring(b4037.length - 2) == '"]')
    b4037 = b4037.substring(0, b4037.length - 2); return b4037; }
function y2104(json) { let b4037 = json.replace('{\n', '').replace('\n}', '').replace('[\n' + t868, '').replace('\n' + t868 + ']', ''); return b4037; }
function x2105(q243, z4008) { const j4215 = n926(q243, true); if (z4008) {
    console.log('%c%s', 'background: #4f44; color: #ded', j4215);
}
else {
    console.log('%c%s', 'background: #cfc; color: black;', j4215);
} }
console.clear();
figma.payments.setPaymentStatusInDevelopment({ type: 'PAID' });
figma.loadAllPagesAsync().then(() => { figma.on('documentchange', v1518); figma.on('selectionchange', r1526); figma.on('close', h1519); });
y1508(true);
figma.clientStorage.getAsync('pro').then(data => { figma.showUI(__html__, { visible: false, themeColors: true, title: 'Generator' }); });
var d2709 = figma.viewport.zoom;
setInterval(i1523, 100);
const c2798 = 'clock_';
const g2799 = 1000;
var l2800 = false;
var objectCenterSize = 15;
function g1520() { (function () {
    return __awaiter(this, void 0, void 0, function* () { figma.currentPage.loadAsync().then(() => __awaiter(this, void 0, void 0, function* () { let t2801 = yield figma.currentPage.getPluginData(figma.currentUser.id + ',windowWidth'); let p2802 = yield figma.currentPage.getPluginData(figma.currentUser.id + ',windowHeight'); let v2803; let i2804; if (t2801 === NULL) {
        v2803 = 800;
        figma.currentPage.setPluginData(figma.currentUser.id + ',windowWidth', t2801.toString());
    }
    else
        v2803 = parseInt(t2801); if (p2802 === NULL) {
        i2804 = 600;
        figma.currentPage.setPluginData(figma.currentUser.id + ',windowHeight', p2802.toString());
    }
    else
        i2804 = parseInt(p2802); figma.ui.resize(Math.max(minWindowWidth, v2803), Math.max(minWindowHeight, i2804)); figma.ui.show(); const fonts = yield figma.listAvailableFontsAsync(); const eula = (yield figma.clientStorage.getAsync('eula')) === 'true'; const tutorials = (yield figma.clientStorage.getAsync('tutorials')) === 'true'; const isLocked = yield z1525(); c1527({ cmd: 'uiReturnFigStartGenerator', currentUser: figma.currentUser, viewportRect: figma.viewport.bounds, viewportZoom: figma.viewport.zoom, fonts: fonts, eula: eula, tutorials: tutorials, isLocked: isLocked, windowWidth: v2803, windowHeight: i2804 }); })); });
})(); }
function r1521() { y1508(); figma.showUI(__html__, { visible: false, themeColors: true }); }
function n1522() { setInterval(j1524, g2799); }
function i1523() { if (figma.viewport.zoom == d2709)
    return; d2709 = figma.viewport.zoom; k2697(); s1541(); m1543(); }
function j1524() { j1548(c2798 + figma.currentUser.sessionId.toString(), Date.now().toString()); }
function z1525() {
    return __awaiter(this, void 0, void 0, function* () { yield figma.currentPage.loadAsync(); const clocks = figma.currentPage.getPluginDataKeys().filter(k => k.length > c2798.length && k.substring(0, c2798.length) == c2798 && k.substring(c2798.length) != figma.currentUser.sessionId.toString()).map((k) => __awaiter(this, void 0, void 0, function* () { return parseInt(yield y1547(k)); })); clocks.sort(); const now = Date.now(); const locked = clocks.length > 0 && now - (yield clocks[clocks.length - 1]) < g2799 * 2; return locked; });
}
function r1526() { k2697(); }
var e2730 = new Array();
var w2732 = new Array();
function k1507(nodeIds) { for (let i = w2766.length - 1; i >= 0; i--)
    if (!w2766[i].removed && nodeIds.includes(w2766[i].getPluginData('nodeId')))
        w2766.splice(i, 1); for (let i = b2782.length - 1; i >= 0; i--)
    if (b2782[i].removed || nodeIds.includes(b2782[i].getPluginData('nodeId')))
        b2782.splice(i, 1); figma.currentPage.loadAsync().then(() => { figma.currentPage.findAll(o => nodeIds.includes(o.getPluginData('nodeId'))).forEach(o => { if (!o.removed)
    o.remove(); }); }); e2730 = e2730.filter(a => !nodeIds.includes(a.nodeId)); }
function y1508(q1509 = false) { for (const q1514 of figma.currentPage.children) {
    if (q1514.removed)
        continue;
    if (q1514.getPluginData('objectId') != '' && q1514.getPluginData('userId') == figma.currentUser.id && (parseInt(q1514.getPluginData('retain')) == 0 || q1509))
        q1514.remove();
} }
function h1510(nodeIds, o1511) { for (let i = e2730.length - 1; i >= 0; i--) {
    const j2731 = e2730[i];
    if (!nodeIds.includes(j2731.nodeId))
        continue;
    for (let j = j2731.objects.length - 1; j >= 0; j--) {
        const q1514 = j2731.objects[j];
        if (q1514.removed || !m1512(q1514, o1511)) {
            if (!q1514.removed)
                q1514.remove();
            q945(j2731.objects, q1514);
            if (w2766.includes(q1514))
                q945(w2766, q1514);
            if (b2782.includes(q1514))
                q945(b2782, q1514);
        }
        if (!q1514.removed) {
            if (parseInt(q1514.getPluginData('retain')) == 2)
                j1533(q1514);
        }
    }
    if (isEmpty(j2731.objects))
        q945(e2730, j2731);
} }
function m1512(q1514, o1511) { if (q1514.type == n1265 || q1514.type == f1268) {
    for (const child of q1514.children) {
        const found = m1512(child, o1511);
        if (found)
            return found;
    }
}
else {
    const found = o1511.find(o => q1514.getPluginData('objectId') == o[d1384] && q1514.getPluginData('userId') == figma.currentUser.id || o[y1390] == 2 && o[y1390] == q1514.getPluginData('retain'));
    if (found)
        return found;
} return null; }
function j1515(nodeIds, s1516) { figma.getLocalPaintStylesAsync().then(paintStyles => { paintStyles.filter(s => nodeIds.includes(s.getPluginData('nodeId'))).forEach(s => { const nodeId = s.getPluginData('nodeId'); const existing = n925(s.getPluginData('existing')); if (!existing) {
    s.remove();
}
else if (s1516) {
    b947(w2732, a => a.nodeId == nodeId);
    s.setPluginData('type', NULL);
    s.setPluginData('nodeId', NULL);
    s.setPluginData('existing', NULL);
} }); }); if (s1516)
    w2732 = w2732.filter(a => !nodeIds.includes(a.nodeId)); }
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
                const msg = { cmd: 'uiStylePropertyChange', styleId: d948(change.id), properties: change.properties, name: '', paints: [] };
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
} y1517 = false; }
function h1519() { y1508(); c1527({ cmd: 'updateMetrics' }); }
figma.ui.onmessage = function (msg) { msg = JSON.parse(msg); if (msg.cmd == 'returnUiGetValueForFigma')
    return; switch (msg.cmd) {
    case 'figStartGenerator':
        g1520();
        break;
    case 'figRestartGenerator':
        r1521();
        break;
    case 'figFinishStart':
        n1522();
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
        x1593(msg.clientPosition);
        break;
    case 'figResizeWindow':
        r1596(msg.width, msg.height);
        break;
    case 'figSetWindowRect':
        o1594(msg.x, msg.y, msg.width, msg.height);
        break;
    case 'figNotify':
        x1597(msg);
        break;
    case 'figGetLocalData':
        r1545(msg.key);
        break;
    case 'figSetLocalData':
        n1546(msg.key, msg.value);
        break;
    case 'figClearAllLocalData':
        b4032();
        break;
    case 'figGetPageData':
        y1547(msg.key);
        break;
    case 'figSetPageData':
        j1548(msg.key, msg.value);
        break;
    case 'figSavePages':
        u1553(msg.pageIds, msg.pageJson, msg.currentPageId);
        break;
    case 'figLoadNodesAndConns':
        n1550(msg.debugMode);
        break;
    case 'figSaveNodes':
        d1554(msg.nodeIds, msg.nodeJson);
        break;
    case 'figGetAllLocalTemplateNames':
        r2736();
        break;
    case 'figSaveLocalTemplate':
        i1555(msg.c4033, msg.template);
        break;
    case 'figRemoveConnsToNodes':
        t1556(msg.nodeIds);
        break;
    case 'figRemoveSavedNodesAndConns':
        q1557(msg.nodeIds);
        break;
    case 'figRemoveAllSavedNodesAndConns':
        t1558();
        break;
    case 'figLogAllSavedNodesAndConns':
        r1559(msg.z4008);
        break;
    case 'figLogAllSavedNodes':
        h1560(msg.z4008);
        break;
    case 'figLogAllSavedConns':
        h1561(msg.z4008);
        break;
    case 'figLogAllSavedPageKeys':
        a1562(msg.z4008);
        break;
    case 'figLogAllSavedPages':
        a1563(msg.z4008);
        break;
    case 'figLogAllSavedConnKeys':
        i1564(msg.z4008);
        break;
    case 'figLogAllLocalData':
        m1565(msg.z4008);
        break;
    case 'figGetValue':
        s1566(msg.key, msg.spec);
        break;
    case 'figRemoveSavedPage':
        a1568(msg.pageId);
        break;
    case 'figRemoveAllSavedPages':
        a1569();
        break;
    case 'figSaveConnection':
        b1570(msg.key, msg.json);
        break;
    case 'figSaveConnections':
        i1571(msg.keys, msg.json);
        break;
    case 'figUpdateSavedConnections':
        j1572(msg.curKeys, msg.newKeys, msg.json);
        break;
    case 'figDeleteSavedConnection':
        z1573(msg.key);
        break;
    case 'figRemoveAllSavedConnections':
        r1574();
        break;
    case 'figDeleteSavedConnectionsToNode':
        o1575(msg.nodeId);
        break;
    case 'figDeleteSavedConnectionsFromNode':
        u1576(msg.nodeId);
        break;
    case 'figRemovePluginDataFromAllLocalStyles':
        a1577();
        break;
    case 'figGetAllLocalVariables':
        j1601(msg.nodeId, msg.px, msg.py);
        break;
    case 'figLinkNodeToVariable':
        j1603(msg.nodeId, msg.variableId);
        break;
    case 'figUpdateVariable':
        figUpdateVariableAsync(msg.variableId, msg.value);
        break;
    case 'figGetAllLocalColorStyles':
        f1578(msg.nodeId, msg.px, msg.py);
        break;
    case 'figLinkNodeToExistingColorStyle':
        s1579(msg.nodeId, msg.styleId);
        break;
    case 'figExport':
        figExport(msg.objectIds, msg.scale, msg.format, msg.suffix);
        break;
    case 'figGetObjectSize':
        v1532(msg.object);
        break;
    case 'figGetVariableUpdates':
        d1567(msg.linkedVarIds);
        break;
    case 'figUpdateShowIds':
        l2800 = msg.l2800;
        break;
    case 'figUpdateObjectCenterSize':
        objectCenterSize = msg.objectCenterSize;
        break;
    case 'figDeleteAllObjects':
        y1508();
        break;
    case 'figUpdateObjectsAndStyles':
        i2745 = 0;
        k2746 = 0;
        msg.objects.forEach(o => o.counted = false);
        p2733(null, msg.objects, msg.u4022, msg.t2050, msg.nodeIds, msg.o2762, msg.q2763, msg.t270);
        k1584(msg);
        break;
    case 'figDeleteObjectsAndStyles':
        k1507(msg.nodeIds);
        j1515(msg.nodeIds, msg.s1516);
        break;
    case 'figDeleteObjectsExcept':
        h1510(msg.nodeIds, msg.ignoreObjects);
        break;
    case 'figTriggerUndo':
        figma.triggerUndo();
        break;
    case 'figCommitUndo':
        figma.commitUndo();
        break;
} c1527({ cmd: 'uiEndFigMessage', msgCmd: msg.cmd }); };
function c1527(msg) { figma.ui.postMessage(JSON.stringify(msg)); }
function j2734(key) {
    return __awaiter(this, void 0, void 0, function* () { return yield figma.clientStorage.getAsync(key); });
}
function r1545(key) { figma.currentPage.loadAsync().then(() => { if (key == 'canvasEmpty') {
    c1527({ cmd: 'uiReturnFigGetLocalData', key: key, value: figma.currentPage.children.length == 0 });
}
else if (key == 'debugWarningCrash') {
    figma.clientStorage.getAsync('debugWarning').then(data => { c1527({ cmd: 'uiReturnFigGetLocalData', key: key, value: data }); });
}
else {
    figma.clientStorage.getAsync(key).then(data => { c1527({ cmd: 'uiReturnFigGetLocalData', key: key, value: data }); });
} }); }
function n1546(key, value, postToUi = true) { figma.clientStorage.setAsync(key, value); if (postToUi) {
    c1527({ cmd: 'uiReturnFigSetLocalData', key: key, value: value });
} }
function b4032() {
    return __awaiter(this, void 0, void 0, function* () { const keys = yield figma.clientStorage.keysAsync(); for (const key of keys)
        figma.clientStorage.deleteAsync(key); });
}
function y1547(key, postToUi = true) {
    return __awaiter(this, void 0, void 0, function* () { yield figma.currentPage.loadAsync(); const data = figma.currentPage.getPluginData(key); if (postToUi) {
        c1527({ cmd: 'uiReturnFigGetPageData', key: key, value: data });
    } return data; });
}
function j1548(key, value) { j1549(key); figma.currentPage.setPluginData(key, value); }
function j1549(key) { figma.currentPage.setPluginData(key, ''); }
function n1550(debugMode) { figma.currentPage.loadAsync().then(() => { const pageKeys = figma.currentPage.getPluginDataKeys().filter(k => k1053(k)); const nodeKeys = figma.currentPage.getPluginDataKeys().filter(k => p1054(k)); const connKeys = figma.currentPage.getPluginDataKeys().filter(k => u1055(k)); if (!debugMode)
    v1552(nodeKeys, connKeys); const pages = pageKeys.map(k => figma.currentPage.getPluginData(k)); const nodes = nodeKeys.map(k => figma.currentPage.getPluginData(k)); const n2122 = connKeys.map(k => figma.currentPage.getPluginData(k)); const pageOrder = figma.currentPage.getPluginData('pageOrder').split(','); const currentPageId = figma.currentPage.getPluginData('currentPageId'); g1551(nodes); const showAllColorSpaces = figma.currentPage.getPluginData('showAllColorSpaces'); c1527({ cmd: 'uiReturnFigLoadNodesAndConns', showAllColorSpaces: showAllColorSpaces, pageKeys: pageKeys, pageJson: pages, pageOrder: pageOrder, currentPageId: currentPageId, nodeKeys: nodeKeys, nodeJson: nodes, connKeys: connKeys, connJson: n2122 }); }); }
function g1551(nodes) { w2732 = []; figma.getLocalPaintStylesAsync().then(paintStyles => { for (const f3019 of nodes) {
    const node = JSON.parse(f3019);
    if (node.type == e1216) {
        const style = paintStyles.find(s => { const nodeId = s.getPluginData('nodeId'); return nodeId == node.id; });
        if (style) {
            w2732.push({ nodeId: node.id, existing: n925(node.existing), styles: [style] });
        }
    }
} }); }
function v1552(nodeKeys, connKeys) { figma.currentPage.loadAsync().then(() => { const w2735 = '"loading": "true"'; const not = '{\n'; const set = '{\n' + t868 + w2735 + ',\n'; nodeKeys.forEach(k => figma.currentPage.setPluginData(k, figma.currentPage.getPluginData(k).replace(set, not).replace(not, set))); connKeys.forEach(k => figma.currentPage.setPluginData(k, figma.currentPage.getPluginData(k).replace(set, not).replace(not, set))); }); }
function u1553(pageIds, pageJson, currentPageId) { for (let i = 0; i < pageIds.length; i++) {
    j1548(z924(pageIds[i]), pageJson[i]);
} j1548('pageOrder', pageIds.join(',')); j1548('currentPageId', currentPageId); }
function d1554(nodeIds, nodeJson) { for (let i = 0; i < nodeIds.length; i++) {
    j1548(f922(nodeIds[i]), nodeJson[i]);
} }
function r2736() {
    return __awaiter(this, void 0, void 0, function* () { let keys = yield figma.clientStorage.keysAsync(); keys = keys.filter(k => k.length >= j876.length && k.substring(0, j876.length) == j876); c1527({ cmd: 'uiReturnGetAllLocalTemplateNames', templateNames: keys }); });
}
function i1555(c4033, template) { n1546(j876 + ' ' + c4033, template); }
function t1556(nodeIds) { figma.currentPage.loadAsync().then(() => { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => u1055(k)); for (const key of connKeys) {
    const parts = o1058(key).split(' ');
    if (nodeIds.includes(parts[0]) || nodeIds.includes(parts[2]))
        j1549(key);
} }); }
function q1557(nodeIds) { figma.currentPage.loadAsync().then(() => { t1556(nodeIds); const nodeKeys = figma.currentPage.getPluginDataKeys().filter(k => p1054(k) && nodeIds.includes(j1057(k))); nodeKeys.forEach(k => j1549(k)); }); }
function t1558() { figma.currentPage.loadAsync().then(() => { const nodeKeys = figma.currentPage.getPluginDataKeys().filter(k => p1054(k)); const connKeys = figma.currentPage.getPluginDataKeys().filter(k => u1055(k)); for (const key of nodeKeys)
    j1549(key); for (const key of connKeys)
    j1549(key); }); }
function r1559(z4008) {
    return __awaiter(this, void 0, void 0, function* () { yield h1560(z4008); h1561(z4008); });
}
function h1560(z4008) {
    return __awaiter(this, void 0, void 0, function* () { yield figma.currentPage.loadAsync(); figma.currentPage.getPluginDataKeys().filter(k => p1054(k)).forEach((k) => __awaiter(this, void 0, void 0, function* () { return yield x2102(k, z4008); })); });
}
function h1561(z4008) { figma.currentPage.loadAsync().then(() => { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => u1055(k)); connKeys.sort((key1, key2) => { const p1 = o1058(key1).split(' '); const p2 = o1058(key2).split(' '); if (p1[2] != p2[2])
    return p1[2] < p2[2] ? -1 : 1; if (p1[3] != p2[3])
    return parseInt(p1[3]) - parseInt(p2[3]); if (p1[2] == p2[0])
    return -1; if (p2[2] == p1[0])
    return 1; return 0; }); connKeys.forEach(k => x2105(JSON.parse(figma.currentPage.getPluginData(k)), z4008)); }); }
function a1562(z4008) { figma.currentPage.loadAsync().then(() => { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => k1053(k)); connKeys.forEach(k => console.log('%c' + k, 'background: #fff; color: ' + (z4008 ? 'black' : 'white'))); const pageOrder = figma.currentPage.getPluginData('pageOrder'); console.log('%c' + pageOrder, 'background: #fff; color: ' + (z4008 ? 'black' : 'white')); }); }
function a1563(z4008) { figma.currentPage.loadAsync().then(() => { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => k1053(k)); connKeys.forEach(k => console.log('%c' + figma.currentPage.getPluginData(k), 'background: #fff; color: ' + (z4008 ? 'black' : 'white'))); const pageOrder = figma.currentPage.getPluginData('pageOrder'); console.log('%c' + pageOrder, 'background: #fff; color: ' + (z4008 ? 'black' : 'white')); }); }
function i1564(z4008) { figma.currentPage.loadAsync().then(() => { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => u1055(k)); connKeys.forEach(k => console.log('%c' + k, 'background: #dff; color: ' + (z4008 ? 'black' : 'white'))); }); }
function m1565(z4008) { figma.clientStorage.keysAsync().then(keys => keys.forEach(k => figma.clientStorage.getAsync(k).then(val => console.log(k + ': ' + val)))); }
function s1566(key, spec) {
    return __awaiter(this, void 0, void 0, function* () { let result = null; switch (key) {
        case 'getVariableData':
            result = yield x1602(spec);
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
function d1567(varIds) { x1602(varIds).then(values => { c1527({ cmd: 'uiReturnFigGetVariableUpdates', values: values }); }); }
function a1568(pageId) {
    return __awaiter(this, void 0, void 0, function* () { j1549(s934(pageId)); const pageOrder = (yield y1547('pageOrder')).split(','); b947(pageOrder, id => id == pageId); j1548('pageOrder', pageOrder.join(',')); });
}
function a1569() { figma.currentPage.loadAsync().then(() => { const pageKeys = figma.currentPage.getPluginDataKeys().filter(k => k1053(k)); pageKeys.forEach(k => j1549(k)); j1549('pageOrder'); }); }
function b1570(key, json) { j1548(key, json); }
function i1571(_keys, _json) { const keys = JSON.parse(_keys); const json = JSON.parse(_json); for (let i = 0; i < keys.length; i++)
    j1548(keys[i], json[i]); }
function j1572(_curKeys, _newKeys, _json) { const curKeys = JSON.parse(_curKeys); const newKeys = JSON.parse(_newKeys); const json = JSON.parse(_json); for (let i = 0; i < curKeys.length; i++) {
    j1549(curKeys[i]);
    j1548(newKeys[i], json[i]);
} }
function z1573(key) { j1549(key); }
function r1574() { figma.currentPage.loadAsync().then(() => { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => u1055(k)); connKeys.forEach(k => j1549(k)); }); }
function o1575(nodeId) { figma.currentPage.loadAsync().then(() => { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => u1055(k)); for (const key of connKeys) {
    const parts = key.split(' ');
    if (parts[4] == nodeId)
        j1549(key);
} }); }
function u1576(nodeId) { figma.currentPage.loadAsync().then(() => { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => u1055(k)); for (const key of connKeys) {
    const parts = key.split(' ');
    if (parts[1] == nodeId)
        j1549(key);
} }); }
function a1577() { figma.getLocalPaintStylesAsync().then(t1581 => { for (const style of t1581) {
    style.setPluginData('type', '');
    style.setPluginData('nodeId', '');
    style.setPluginData('existing', '');
} }); }
var a2737 = null;
var l4034 = () => a2737 = null;
var o2738 = 'normal';
function x1593(clientPosition) { c1527({ cmd: 'uiReturnFigGetMousePosition', position: { x: 0, y: 0 }, clientPosition: clientPosition, viewportZoom: figma.viewport.zoom, viewportRect: figma.viewport.bounds }); }
function o1594(x, y, width, height) { return; }
function i1595(dock, rect, bounds) { switch (dock) {
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
function r1596(width, height) { (function () {
    return __awaiter(this, void 0, void 0, function* () { width = Math.floor(Math.max(0, width)); height = Math.floor(Math.max(0, height)); figma.ui.resize(width, height); yield figma.currentPage.loadAsync(); figma.currentPage.setPluginData(figma.currentUser.id + ',windowWidth', width.toString()); figma.currentPage.setPluginData(figma.currentUser.id + ',windowHeight', height.toString()); c1527({ cmd: 'uiReturnFigResizeWindow', width: width, height: height }); });
})(); }
function s2739(dock) {
    return __awaiter(this, void 0, void 0, function* () { if (dock != 'normal' && o2738 == 'normal') {
        figma.clientStorage.setAsync('normalWindowX', yield figma.clientStorage.getAsync('normalWindowX'));
        figma.clientStorage.setAsync('normalWindowY', yield figma.clientStorage.getAsync('normalWindowY'));
        figma.clientStorage.setAsync('normalWindowWidth', yield figma.clientStorage.getAsync('normalWindowWidth'));
        figma.clientStorage.setAsync('normalWindowHeight', yield figma.clientStorage.getAsync('normalWindowHeight'));
    } o2738 = dock; figma.clientStorage.setAsync('windowDock', dock); r1596(yield figma.clientStorage.getAsync('windowWidth'), yield figma.clientStorage.getAsync('windowHeight')); });
}
function x1597(msg) { e1598(msg.text, msg.prefix, msg.delay, msg.error, msg.r1599, msg.y1600); }
function e1598(text, prefix = 'Generator ', delay = 400, error = false, r1599 = '', y1600 = NULL) { const options = { timeout: delay, error: error, onDequeue: l4034 }; if (r1599 != '') {
    options['button'] = { text: r1599 };
    if (y1600.substring(0, 'removeConnection'.length) == 'removeConnection') {
        options['button']['action'] = () => z1573(y1600.split(',')[1]);
    }
    else {
        switch (y1600) {
            case 'hideClearUndoWarning':
                options['button']['action'] = () => c1527({ cmd: 'uiHideClearUndoWarning' });
                break;
        }
    }
} if (a2737)
    a2737.cancel(); a2737 = figma.notify(prefix + text, options); }
function k2740(key, params = null) {
    return __awaiter(this, void 0, void 0, function* () { return yield a2741(key, params); });
}
function a2741(key, params = null) {
    return __awaiter(this, void 0, void 0, function* () { return new Promise((resolve, reject) => { const timeout = 60000; c1527(Object.assign({ cmd: 'uiGetValueForFigma', key: key }, (params || {}))); const c2742 = setTimeout(() => reject(new Error('Timeout: Result not received by Figma within the specified time')), timeout); function m4035(msg) { msg = JSON.parse(msg); if (msg.cmd === 'returnUiGetValueForFigma') {
        clearTimeout(c2742);
        resolve({ key: msg.key, value: msg.value });
        figma.ui.off('message', m4035);
    } } figma.ui.on('message', m4035); }); });
}
var a2743 = [];
var n2744 = [];
var i2745 = 0;
var k2746 = 0;
function j1528(k111) { return (k111[y1390] === 2 ? '' : s872) + (l2800 ? k111[d1384] : k111[l1386]); }
function x1529(e1513, addObject = null) {
    return __awaiter(this, void 0, void 0, function* () { if (!v1531(e1513))
        return null; let q1514; switch (e1513[l1382]) {
        case d1219:
            q1514 = v2714(e1513);
            break;
        case z1222:
            q1514 = a2793(e1513);
            break;
        case p1225:
            q1514 = k2789(e1513);
            break;
        case o1237:
            q1514 = r2710(e1513);
            break;
        case q1240:
            q1514 = w2717(e1513);
            break;
        case f1243:
            q1514 = y2720(e1513);
            break;
        case c1246:
            q1514 = f2696(e1513);
            break;
        case k1250:
            q1514 = u2748(e1513);
            break;
        case z1262:
            q1514 = i2749(e1513);
            break;
        case n1285:
            q1514 = yield j2750(e1513);
            break;
        case n1265:
            q1514 = yield j2751(e1513);
            break;
        case f1268:
            q1514 = yield p2752(e1513);
            break;
    } if (addObject && q1514 != undefined && q1514 != null && !q1514.removed) {
        q1514.name = j1528(e1513);
        l954(e1513[l1382] == n1265 || !!q1514, 'no Figma object created');
        if (q1514 != undefined && q1514 != null) {
            q1514.setPluginData('retain', e1513[y1390].toString());
            if (e1513[y1390] < 2) {
                q1514.setPluginData('userId', figma.currentUser.id);
                q1514.setPluginData('sessionId', figma.currentUser.sessionId.toString());
                q1514.setPluginData('type', e1513[l1382]);
                q1514.setPluginData('nodeId', e1513[u1383]);
                q1514.setPluginData('objectId', e1513[d1384]);
                q1514.setPluginData('isCenter', l939(e1513[t1405]));
                if (e1513[l1382] == c1246)
                    w2766.push(q1514);
                if (e1513[g1404])
                    d1544(q1514);
            }
            addObject(q1514);
        }
    } if (!e1513.counted) {
        k2746++;
        e1513.counted = true;
    } return q1514; });
}
function h1530(q1514, e1513) {
    return __awaiter(this, void 0, void 0, function* () { if (!v1531(e1513) || q1514 == undefined || q1514 == null || q1514.removed)
        return; q1514.name = j1528(e1513); q1514.setPluginData('retain', e1513[y1390].toString()); switch (e1513[l1382]) {
        case d1219:
            q2715(q1514, e1513);
            break;
        case z1222:
            i2794(q1514, e1513);
            break;
        case p1225:
            d2790(q1514, e1513);
            break;
        case o1237:
            t2711(q1514, e1513);
            break;
        case q1240:
            u2718(q1514, e1513);
            break;
        case f1243:
            s2721(q1514, e1513);
            break;
        case c1246:
            o2753(q1514, e1513);
            break;
        case k1250:
            q2754(q1514, e1513);
            break;
        case z1262:
            y2755(q1514, e1513);
            break;
        case n1285:
            t2756(q1514, e1513);
            break;
        case n1265:
            w2757(q1514, e1513);
            break;
        case f1268:
            d2758(q1514, e1513);
            break;
    } if (q1514 != undefined && q1514 != null && !q1514.removed) {
        if (q1514.parent == figma.currentPage)
            yield figma.currentPage.loadAsync();
        q1514.parent.appendChild(q1514);
        if (e1513[g1404])
            d1544(q1514);
    } if (!e1513.counted) {
        k2746++;
        e1513.counted = true;
    } });
}
function p2733(o2759, k2760, q2761, t2050 = -1, nodeIds = [], o2762 = false, q2763 = false, t270 = false) {
    return __awaiter(this, void 0, void 0, function* () { let y2764 = NULL; let h2765 = null; let abort = false; const k3643 = []; let s2747 = 0; a2743.push(...nodeIds); if (t2050 > -1)
        i2745 = t2050; for (const e1513 of k2760) {
        n2744.push(e1513);
        if (e1513[u1383] != y2764) {
            y2764 = e1513[u1383];
            h2765 = e2730.find(a => a.nodeId == e1513[u1383]);
            if (!h2765) {
                e2730.push(h2765 = { nodeId: e1513[u1383], objects: [] });
            }
        }
        const addObject = q1514 => { if (o2759 != undefined && o2759 != null && !o2759.removed)
            o2759.appendChild(q1514);
        else
            h2765.objects.push(q1514); };
        let objects = o2759 != undefined && o2759 != null && !o2759.removed ? o2759.children : h2765.objects;
        let q1514 = objects.find(o => o.removed || o.getPluginData('userId') == figma.currentUser.id && o.getPluginData('objectId') == e1513[d1384]);
        if (q1514 != undefined && q1514 != null && q1514.removed) {
            w940(objects, q1514);
            if (w2766.includes(q1514))
                q945(w2766, q1514);
            if (b2782.includes(q1514))
                q945(b2782, q1514);
        }
        if (q1514 == undefined || q1514 == null || q1514.removed) {
            const newObj = yield x1529(e1513, addObject);
            k3643.push(newObj);
        }
        else if (q1514 != undefined && q1514 != null && !q1514.removed && q1514.getPluginData('type') == e1513[l1382].toString()) {
            yield h1530(q1514, e1513);
            if (q1514 != undefined && q1514 != null && !q1514.removed)
                k3643.push(q1514);
        }
        else {
            q1514.remove();
            if (w2766.includes(q1514))
                q945(w2766, q1514);
            if (b2782.includes(q1514))
                q945(b2782, q1514);
            yield x1529(e1513, addObject);
        }
        s2747++;
        if (s2747 >= q2761) {
            const result = yield k2740('returnObjectUpdate', { i2745: i2745, k2746: k2746 });
            abort = result.value;
            s2747 = 0;
            if (abort)
                break;
        }
    } if (o2759 != undefined && o2759 != null && !o2759.removed) {
        for (const q1514 of o2759.children) {
            if (q1514 != undefined && q1514 != null && q1514.removed || !k2760.find(o => o[d1384] == q1514.getPluginData('objectId') && q1514.getPluginData('userId') == figma.currentUser.id))
                q1514.remove();
        }
    } for (const point of w2766) {
        if (point.parent == figma.currentPage)
            yield figma.currentPage.loadAsync();
        if (point != undefined && point != null && !point.removed && !point.parent.removed)
            point.parent.appendChild(point);
    } if (q2763 && !abort) {
        h1510(a2743, n2744);
        a2743 = [];
        n2744 = [];
        if (t270 && k3643.length > 0) {
            figma.viewport.scrollAndZoomIntoView(k3643);
            const bounds = d1534(k3643);
            figma.viewport.zoom = Math.min(figma.viewport.bounds.width * figma.viewport.zoom / bounds.width - 0.05, figma.viewport.bounds.height * figma.viewport.zoom / bounds.height - 0.05);
        }
    } yield k2740('returnObjectUpdate', { i2745: i2745, k2746: k2746 }); });
}
function v1531(e1513) { switch (e1513[l1382]) {
    case d1219: return n2713(e1513);
    case z1222: return x2775(e1513);
    case p1225: return p2776(e1513);
    case o1237: return q4031(e1513);
    case q1240: return g2716(e1513);
    case f1243: return l2719(e1513);
    case c1246: return k4030(e1513);
    case k1250: return d2777(e1513);
    case z1262: return c2778(e1513);
    case n1285: return h2779(e1513);
    case n1265: return b2780(e1513);
    case f1268: return b2781(e1513);
} }
function v1532(e1513) {
    return __awaiter(this, void 0, void 0, function* () { (() => __awaiter(this, void 0, void 0, function* () { const q1514 = yield x1529(e1513); const width = q1514.width; const height = q1514.height; q1514.remove(); c1527({ cmd: 'uiForwardToGenerator', msg: { cmd: 'returnFigGetObjectSize', objectId: e1513[d1384], width: width, height: height } }); }))(); });
}
function j1533(q1514) { q1514.setPluginData('type', ''); q1514.setPluginData('nodeId', ''); q1514.setPluginData('userId', ''); q1514.setPluginData('sessionId', ''); q1514.setPluginData('objectId', ''); q1514.setPluginData('isCenter', ''); q1514.setPluginData('retain', ''); }
function d1534(objects) { const bounds = { left: 0, top: 0, right: 0, bottom: 0 }; for (const k111 of objects) {
    if (k111.x < bounds.left || bounds.left == bounds.right)
        bounds.left = k111.x;
    if (k111.y < bounds.top || bounds.top == bounds.bottom)
        bounds.top = k111.y;
    if (k111.x + k111.width > bounds.right || bounds.left == bounds.right)
        bounds.right = k111.x + k111.width;
    if (k111.y + k111.height > bounds.bottom || bounds.top == bounds.bottom)
        bounds.bottom = k111.y + k111.height;
} return { x: bounds.left, y: bounds.top, width: bounds.right - bounds.left, height: bounds.bottom - bounds.top }; }
function figExport(objectIds, scale, format, suffix) {
    return __awaiter(this, void 0, void 0, function* () { yield figma.currentPage.loadAsync(); for (const objId of objectIds) {
        let q1514 = figma.currentPage.children.find(o => !o.removed && o.getPluginData('userId') == figma.currentUser.id && o.getPluginData('objectId') == objId);
        if (!q1514)
            continue;
        const settings = { constraint: { type: 'SCALE', value: scale }, format: format == 0 ? 'PNG' : 'JPG', suffix: suffix };
        yield q1514.exportAsync(settings);
    } });
}
const b2782 = [];
const y2783 = [];
function q1535(i1536, k1537) { const effects = []; for (const effect of i1536) {
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
                if (k1537 && !isNaN(spread))
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
function s2703(q1514, e1513, phantom = true) { q1540(q1514, e1513); z2704(q1514, e1513, phantom); f2705(q1514, e1513); q1514.opacity = e1513[k1406]; q1514.blendMode = e1513[b1407]; const maskType = e1513[g1408]; q1514.isMask = maskType > 0; if (q1514.isMask) {
    switch (maskType) {
        case 1:
            q1514.maskType = 'ALPHA';
            break;
        case 2:
            q1514.maskType = 'VECTOR';
            break;
        case 3:
            q1514.maskType = 'LUMINANCE';
            break;
    }
} if (q1514.isMask && q1514.fills.length == 0 && q1514.strokes.length == 0)
    q1514.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 }, opacity: 1, blendMode: 'NORMAL' }]; }
function f2705(q1514, e1513) { if (!!e1513[a1395] && !isEmpty(e1513[a1395])) {
    q1514.fills = o958(e1513[a1395]);
    if (b2782.includes(q1514))
        q945(b2782, q1514);
}
else
    q1514.fills = []; }
function z2704(q1514, e1513, phantom = true) { if (e1513[d1396] != null && !isEmpty(e1513[d1396])) {
    w1539(q1514, o958(e1513[d1396]), e1513[z1397], e1513[r1398], e1513[z1399], e1513[n1400], e1513[u1401], m2706(e1513[s1402]));
    if (e1513[g1404])
        q1514.setPluginData('dashes', e1513[s1402]);
    if (b2782.includes(q1514))
        q945(b2782, q1514);
    if (e1513[g1404])
        r951(y2783, q1514);
}
else if (isEmpty(e1513[a1395]) && isEmpty(e1513[d1396]) && !e1513[g1408] && phantom) {
    x1542(q1514);
    r951(b2782, q1514);
}
else
    q1514.strokes = []; }
function m2706(p1538) { p1538 = p1538; p1538 = q956(p1538, ','); p1538 = q957(p1538, ','); p1538 = p1538.trim(); return p1538 == '' ? [] : p1538.split(',').map(s => Math.max(0, parseFloat(s))); }
function v2707(p1538) { p1538 = p1538; p1538 = q956(p1538, ','); p1538 = q957(p1538, ','); p1538 = p1538.trim(); return p1538 == '' ? [] : p1538.split(',').map(s => Math.max(0, parseFloat(s) / d2709)); }
function w1539(q1514, fills, weight, align, join, miterLimit, cap, dashes = []) { q1514.strokes = fills; q1514.strokeWeight = Math.max(0, weight); q1514.strokeAlign = align; q1514.strokeJoin = join; const miterAngle = miterLimit / 360 * Tau; const w2784 = 1 / Math.sin(miterAngle / 2); q1514.strokeMiterLimit = Math.min(Math.max(0, w2784), 16); q1514.strokeCap = cap; q1514.dashPattern = dashes; }
function q1540(q1514, e1513) { if (!!e1513[a1403] && !isEmpty(e1513[a1403])) {
    const k1537 = e1513[l1382] == d1219 || e1513[l1382] == p1225 || e1513[l1382] == f1268;
    q1514.effects = q1535(e1513[a1403], k1537);
}
else
    q1514.effects = []; }
function s1541() { for (const k111 of b2782) {
    if (k111.removed)
        q945(b2782, k111);
    else
        x1542(k111);
} }
function x1542(k111) { figma.currentPage.loadAsync().then(() => { const back = figma.currentPage.backgrounds.find(b => b.type == 'SOLID'); let phantomColor; if (back) {
    const l = back.color.r * 0.2126 + back.color.g * 0.7152 + back.color.b * 0.0722;
    phantomColor = l > 0.5 ? { r: 0, g: 0, b: 0 } : { r: 1, g: 1, b: 1 };
}
else
    phantomColor = { r: 1, g: 0, b: 1 }; w1539(k111, [{ type: 'SOLID', color: phantomColor, opacity: 0.5 }], 1 / d2709, 'CENTER', 'MITER', 1, 'NONE', [1 / d2709, 2 / d2709]); }); }
function m1543() { for (const q1514 of y2783) {
    if (q1514.removed)
        q945(y2783, q1514);
    else
        d1544(q1514);
} }
function d1544(q1514) { q1514.strokeWeight = Math.max(0, 1.5 / d2709); if (n925(q1514.getPluginData('isCenter'))) {
    const path = q1514.vectorPaths[0];
    const parts = path.data.split(' ');
    let t = { x: parseFloat(parts[1]), y: parseFloat(parts[2]) };
    let c = { x: parseFloat(parts[4]), y: parseFloat(parts[5]) };
    let r = { x: parseFloat(parts[7]), y: parseFloat(parts[8]) };
    const a = 2;
    const b = 0.05;
    const f = 1 - Math.pow(1 - Math.min(d2709, 1), a) / Math.pow(a, b);
    t = p897(c, t899(q884(f902(t, c)), objectCenterSize / f));
    r = p897(c, t899(q884(f902(r, c)), objectCenterSize / f));
    parts[1] = t.x;
    parts[2] = t.y;
    parts[4] = c.x;
    parts[5] = c.y;
    parts[7] = r.x;
    parts[8] = r.y;
    const v2785 = { windingRule: path.windingRule, data: parts.join(' ') };
    q1514.vectorPaths = [v2785];
} const dashes = q1514.getPluginData('dashes'); if (dashes != '')
    q1514.dashPattern = v2707(dashes); }
function f1578(nodeId, px, py) { figma.getLocalPaintStylesAsync().then(_styles => { const styles = new Array(); for (const a168 of _styles) {
    const _nodeId = a168.getPluginData('nodeId');
    const _existing = a168.getPluginData('existing');
    const existing = !!_existing;
    const style = { id: a168.id, nodeId: _nodeId, name: a168.name, existing: existing, paints: new Array() };
    let onlyPaint = true;
    for (const i2787 of a168.paints) {
        if (i2787.type == 'SOLID') {
            style.paints.push([i2787.color.r, i2787.color.g, i2787.color.b, i2787.opacity]);
        }
        else {
            onlyPaint = false;
            break;
        }
    }
    if (onlyPaint)
        styles.push(style);
} c1527({ cmd: 'uiReturnFigGetAllLocalColorStyles', nodeId: nodeId, px: px, py: py, styles: JSON.stringify(styles) }); }); }
function s1579(nodeId, styleId) { figma.getLocalPaintStylesAsync().then(t1581 => { if (styleId != NULL)
    m1580(t1581, nodeId, styleId);
else
    s1582(t1581, nodeId); }); }
function m1580(t1581, nodeId, styleId, clearExisting = true) { const t2786 = w2732.find(a => a.nodeId == nodeId); if (t2786 && clearExisting)
    s1582(t1581, nodeId); const z1586 = t1581.find(s => s.id == styleId); l954(!!z1586, 'figStyle should be found here'); z1586.setPluginData('type', e1216); z1586.setPluginData('nodeId', nodeId); z1586.setPluginData('existing', l939(true)); w2732.push({ nodeId: nodeId, existing: true, styles: [z1586] }); return z1586; }
function s1582(t1581, nodeId) { const z1586 = t1581.find(s => s.getPluginData('nodeId') == nodeId); l954(!!z1586, 'figStyle should be found here'); if (z1586) {
    z1586.setPluginData('type', NULL);
    z1586.setPluginData('nodeId', NULL);
    z1586.setPluginData('existing', NULL);
    b947(w2732, a => a.nodeId == nodeId);
} return z1586; }
function a1583(styles, a1587) { const z1586 = figma.createPaintStyle(); z1586.setPluginData('type', a1587[l1382]); z1586.setPluginData('nodeId', a1587[u1383]); z1586.name = a1587[o1387]; setStylePaints(z1586, a1587); styles.push(z1586); c1527({ cmd: 'uiSetStyleId', nodeId: a1587[u1383], styleId: z1586.id }); return z1586; }
function k1584(msg) { let y2764 = NULL; let t2786; for (const a1587 of msg.styles) {
    if (a1587[u1383] != y2764) {
        y2764 = a1587[u1383];
        t2786 = w2732.find(a => a.nodeId == a1587[u1383]);
        if (!t2786) {
            t2786 = { nodeId: a1587[u1383], styles: [] };
            w2732.push(t2786);
        }
    }
    else
        t2786 = null;
    const z1586 = t2786.styles[0];
    figma.getLocalPaintStylesAsync().then(t1581 => { const localStyle = t1581.find(s => s.getPluginData('nodeId') == a1587[u1383]); if (isValid(z1586) && !isValid(localStyle)) {
        w940(t2786.styles, z1586);
    } const existing = isValid(z1586) && isValid(localStyle) && z1586.getPluginData('existing'); if (!isValid(z1586) || !isValid(localStyle)) {
        if (!existing) {
            y1517 = true;
            s1579(a1587[u1383], a1587[v1385]);
        }
    }
    else if (isValid(z1586) && z1586.getPluginData('type') == a1587[l1382]) {
        y1517 = true;
        b1585(localStyle, a1587);
    } });
} }
function b1585(z1586, a1587) { setStylePaints(z1586, a1587); z1586.name = a1587[o1387]; }
function getStylePaints(stylePaints) { const paints = new Array(); for (const i2787 of stylePaints) {
    const fill = i2787[1].split(' ');
    switch (i2787[0]) {
        case 'SOLID':
            paints.push({ type: 'SOLID', color: { r: Math.min(Math.max(0, parseFloat(fill[0]) / 0xff), 1), g: Math.min(Math.max(0, parseFloat(fill[1]) / 0xff), 1), b: Math.min(Math.max(0, parseFloat(fill[2]) / 0xff), 1) }, opacity: Math.min(Math.max(0, parseFloat(fill[3]) / 100), 1) });
            break;
    }
} return paints; }
function setStylePaints(z1586, a1587) { if (!isEmpty(a1587[p1389]))
    z1586.paints = getStylePaints(a1587[p1389]);
else
    z1586.paints = []; }
function j1601(nodeId, px, py) {
    return __awaiter(this, void 0, void 0, function* () { figma.variables.getLocalVariablesAsync().then((z2788) => __awaiter(this, void 0, void 0, function* () { const variables = new Array(); for (const _var of z2788) {
        const collection = yield figma.variables.getVariableCollectionByIdAsync(_var.variableCollectionId);
        const variable = { id: _var.id, resolvedType: _var.resolvedType, name: _var.name, collectionName: collection.name };
        variables.push(variable);
    } figma.variables.getLocalVariableCollectionsAsync().then((collections) => __awaiter(this, void 0, void 0, function* () { c1527({ cmd: 'uiReturnFigGetAllLocalVariables', nodeId: nodeId, px: px, py: py, variables: JSON.stringify(variables), nCollections: collections.length }); })); })); });
}
function x1602(varIds) {
    return __awaiter(this, void 0, void 0, function* () { const z2788 = yield figma.variables.getLocalVariablesAsync(); const variables = varIds.map(id => z2788.find(v => v.id == id)); let values = []; for (let i = 0; i < varIds.length; i++) {
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
function j1603(nodeId, varId) { figma.variables.getLocalVariablesAsync().then(z2788 => { figLinkVariableAsync(z2788, nodeId, varId); }); }
function figUpdateVariableAsync(varId, value) {
    return __awaiter(this, void 0, void 0, function* () { figma.variables.getLocalVariablesAsync().then((z2788) => __awaiter(this, void 0, void 0, function* () { let variable = z2788.find(v => v.id == varId); if (!variable)
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
function figLinkVariableAsync(z2788, nodeId, varId) {
    return __awaiter(this, void 0, void 0, function* () { let variable = z2788.find(v => v.id == varId); if (!variable)
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
function f1588(tl, tr, bl) { let vr = point(tr.x - tl.x, tr.y - tl.y); let vb = point(bl.x - tl.x, bl.y - tl.y); let sx = vr.x; let sy = vb.y; let kx = -vr.y; let ky = -vb.x; let dx = -tl.x; let dy = -tl.y; const _sx = kx / nozero(sx); const _sy = ky / nozero(sy); let l4212 = y887([[1, _sy, 0], [_sx, 1, 0], [0, 0, 1]], j891(dx, dy)); l4212 = e889(l4212); const a = l881(vr); if (a > Tau / 4 && a < Tau * 3 / 4)
    l4212 = y887(l4212, j891(0, 0, 1, 1, Tau / 2)); if (determinant(l4212) < 0)
    l4212 = y887(l4212, j891(0, 0, -1, 1, 0)); return l4212; }
function v1589(q1514, tl, tr, bl) { const l4212 = f1588(tl, tr, bl); q1514.relativeTransform = [l4212[0], l4212[1]]; }
function x1590(q1514, e1513, setSize = true, noHeight = 0.01) { if (!e1513[s1391] || !e1513[t1392] || !e1513[x1393])
    return; const xp0 = e1513[s1391]; const xp1 = e1513[t1392]; const xp2 = e1513[x1393]; v1589(q1514, xp0, xp1, xp2); if (setSize) {
    const e892 = distv(xp0, xp1);
    const b893 = distv(xp0, xp2);
    const height = e1513[l1382] == f1243 ? e1513[b1426] : e1513[z1413];
    if (!q1514.removed) {
        q1514.resizeWithoutConstraints(Math.max(0.01, e892), height ? Math.max(0.01, b893) : noHeight);
    }
} }
function r1591(x2701, m2702) { if (x2701.removed)
    return; x2701.resizeWithoutConstraints(0.01, 0.01); x2701.setPluginData('actualX', m2702[v1409].toString()); x2701.setPluginData('actualY', m2702[k1411].toString()); x2701.x = m2702[v1409]; x2701.y = m2702[k1411]; x2701.rotation = m2702[t1405] ? 45 : 0; }
function r1592(x2701) { if (!x2701.removed)
    x2701.resizeWithoutConstraints(0.01, 0.01); }
function h2779(genBool) { return genBool.children.length > 0; }
function j2750(genBool) {
    return __awaiter(this, void 0, void 0, function* () { let objects = []; for (const k111 of genBool.children)
        yield x1529(k111, o => objects = [...objects, o]); yield figma.currentPage.loadAsync(); let figBool = null; if (!isEmpty(objects)) {
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
        x1590(figBool, genBool);
        if (!h2779(genBool))
            return figBool;
    } return figBool; });
}
function t2756(figBool, genBool, isValid = false) { if (!isValid && !h2779(genBool)) {
    figBool.remove();
    return;
} x1590(figBool, genBool); p2733(figBool, genBool.children, genBool.children.length); }
function p2776(q2767) { return q2767[v1409] != null && !isNaN(q2767[v1409]) && q2767[k1411] != null && !isNaN(q2767[k1411]) && q2767[w1412] != null && !isNaN(q2767[w1412]) && q2767[z1413] != null && !isNaN(q2767[z1413]) && q2767[e1415] != null && !isNaN(q2767[e1415]) && q2767[i1422] != null && !isNaN(q2767[i1422]) && q2767[w1428] != null && !isNaN(q2767[w1428]) && q2767[x1432] != null && !isNaN(q2767[x1432]); }
function k2789(q2767) { if (!p2776(q2767))
    return null; const d2768 = figma.createEllipse(); d2790(d2768, q2767, true); return d2768; }
function d2790(d2768, q2767, isValid = false) { if (!isValid && !p2776(q2767))
    return; u2791(d2768, q2767); if (w2766.includes(d2768))
    z2698(d2768);
else
    s2703(d2768, q2767); }
function u2791(d2768, q2767) { d2768.cornerRadius = q2767[e1415]; const start = q2767[i1422] / 360 * (Math.PI * 2); const sweep = q2767[w1428] / 100 * (Math.PI * 2); d2768.arcData = { startingAngle: start, endingAngle: start + sweep, innerRadius: Math.min(Math.max(0, q2767[x1432] / 100), 1) }; x1590(d2768, q2767); }
function b2781(z2769) { return z2769[v1409] != null && !isNaN(z2769[v1409]) && z2769[k1411] != null && !isNaN(z2769[k1411]) && z2769[w1412] != null && !isNaN(z2769[w1412]) && z2769[z1413] != null && !isNaN(z2769[z1413]) && z2769[t1421] != null && !isNaN(z2769[t1421]); }
function p2752(z2769) {
    return __awaiter(this, void 0, void 0, function* () { if (!b2781(z2769))
        return null; const z2770 = figma.createFrame(); if (z2770) {
        x2792(z2770, z2769);
        let objects = [];
        for (const k111 of z2769[e1427])
            yield x1529(k111, o => objects = [...objects, o]);
        for (const k111 of objects)
            z2770.appendChild(k111);
    } return z2770; });
}
function d2758(z2770, z2769) { x2792(z2770, z2769); p2733(z2770, z2769[e1427], z2769[e1427].length); }
function x2792(z2770, z2769) { z2770.cornerRadius = z2769[t1421]; x1590(z2770, z2769); s2703(z2770, z2769, z2769[e1427].length == 0); }
function b2780(g2771) { return true; }
function j2751(g2771) {
    return __awaiter(this, void 0, void 0, function* () { let objects = []; for (const k111 of g2771[w1410])
        yield x1529(k111, o => objects = [...objects, o]); yield figma.currentPage.loadAsync(); const h2772 = !isEmpty(objects) ? figma.group(objects, figma.currentPage) : null; if (h2772)
        w2757(h2772, g2771); return h2772; });
}
function w2757(h2772, g2771) { if (g2771[w1410].length == 0) {
    h2772.remove();
    return;
} p2733(h2772, g2771[w1410], g2771[w1410].length); q1540(h2772, g2771); }
function x2775(c2773) { return c2773[v1409] != null && !isNaN(c2773[v1409]) && c2773[k1411] != null && !isNaN(c2773[k1411]) && c2773[w1412] != null && !isNaN(c2773[w1412]); }
function a2793(c2773) { if (!x2775(c2773))
    return null; const a2774 = figma.createLine(); i2794(a2774, c2773, true); return a2774; }
function i2794(a2774, c2773, isValid = false) { if (!isValid && !x2775(c2773))
    return; x1590(a2774, c2773, true, 0); s2703(a2774, c2773); }
var w2766 = [];
function k4030(m2702) { return m2702[v1409] != null && !isNaN(m2702[v1409]) && m2702[k1411] != null && !isNaN(m2702[k1411]); }
function f2696(m2702) { const x2701 = m2702[t1405] ? figma.createRectangle() : figma.createEllipse(); if (!k4030(m2702))
    return x2701; if (w2766.includes(x2701))
    r2700(x2701, m2702);
else
    o2753(x2701, m2702); return x2701; }
function o2753(x2701, m2702) { r1591(x2701, m2702); o2699(x2701); }
function k2697() { c1527({ cmd: 'uiUpdateZoom', zoom: figma.viewport.zoom }); for (const point of w2766)
    z2698(point); }
function z2698(x2701) { r1592(x2701); o2699(x2701); }
function r2700(x2701, m2702) { r1591(x2701, m2702); o2699(x2701); }
function o2699(x2701) { if (x2701.removed)
    return; figma.currentPage.loadAsync().then(() => { const i3741 = n925(x2701.getPluginData('isCenter')); const w2708 = figma.currentPage.selection.includes(x2701); const color = i3741 ? [0xf2, 0x48, 0x22] : w2708 ? [12, 140, 233] : [255, 255, 255]; const border = i3741 ? [255, 255, 255] : w2708 ? [255, 255, 255] : [12, 140, 233]; x2701.fills = o958([['SOLID', color[0], color[1], color[2], 100]]); const effects = []; effects.push(...q1535([['DROP_SHADOW', border[0] / 255, border[1] / 255, border[2] / 255, 1, 0, 0, 0, (i3741 ? 3 : w2708 ? 5 : 3.6) / d2709, 'NORMAL', true, true]], true)); effects.push(...q1535([['DROP_SHADOW', color[0] / 255, color[1] / 255, color[2] / 255, 1, 0, 0, 0, (w2708 ? 4 : 2.4) / d2709, 'NORMAL', true, true]], true)); x2701.effects = effects; }); }
function q4031(genPoly) { return genPoly[v1409] != null && !isNaN(genPoly[v1409]) && genPoly[k1411] != null && !isNaN(genPoly[k1411]) && genPoly[w1412] != null && !isNaN(genPoly[w1412]) && genPoly[z1413] != null && !isNaN(genPoly[z1413]) && genPoly[m1418] != null && !isNaN(genPoly[m1418]) && genPoly[r1424] != null && !isNaN(genPoly[r1424]); }
function r2710(genPoly) { if (!q4031(genPoly))
    return null; const figPoly = figma.createPolygon(); t2711(figPoly, genPoly, true); return figPoly; }
function t2711(figPoly, genPoly, isValid = false) { if (!isValid && !q4031(genPoly))
    return; figPoly.cornerRadius = genPoly[m1418]; figPoly.pointCount = Math.max(3, genPoly[r1424]); x1590(figPoly, genPoly); s2703(figPoly, genPoly); }
function n2713(g2712) { return g2712[v1409] != null && !isNaN(g2712[v1409]) && g2712[k1411] != null && !isNaN(g2712[k1411]) && g2712[w1412] != null && !isNaN(g2712[w1412]) && g2712[z1413] != null && !isNaN(g2712[z1413]) && g2712[g1414] != null && !isNaN(g2712[g1414]); }
function v2714(g2712) { if (!n2713(g2712))
    return null; const figRect = figma.createRectangle(); q2715(figRect, g2712, true); return figRect; }
function q2715(figRect, g2712, isValid = false) { if (!isValid && !n2713(g2712))
    return; const found = g2712[a1403].findIndex(e => e[0] == 'ROUND_CORNERS'); if (found > -1) {
    const corners = g2712[a1403][found];
    figRect.topLeftRadius = corners[1];
    figRect.topRightRadius = corners[2];
    figRect.bottomLeftRadius = corners[3];
    figRect.bottomRightRadius = corners[4];
}
else
    figRect.cornerRadius = g2712[g1414]; x1590(figRect, g2712); s2703(figRect, g2712); }
function g2716(u2726) { return u2726[v1409] != null && !isNaN(u2726[v1409]) && u2726[k1411] != null && !isNaN(u2726[k1411]) && u2726[w1412] != null && !isNaN(u2726[w1412]) && u2726[z1413] != null && !isNaN(u2726[z1413]) && u2726[p1419] != null && !isNaN(u2726[p1419]) && u2726[t1425] != null && !isNaN(u2726[t1425]) && u2726[n1430] != null && !isNaN(u2726[n1430]); }
function w2717(u2726) { if (!g2716(u2726))
    return null; const v2727 = figma.createStar(); u2718(v2727, u2726, true); return v2727; }
function u2718(v2727, u2726, isValid = false) { if (!isValid && !g2716(u2726))
    return; v2727.cornerRadius = u2726[p1419]; v2727.pointCount = u2726[t1425]; v2727.innerRadius = Math.min(Math.max(0, u2726[n1430] / 100), 1); x1590(v2727, u2726); s2703(v2727, u2726); }
const w4274 = [];
function l2719(q2723) { return q2723[o1431] != null && q2723[v1409] != null && !isNaN(q2723[v1409]) && q2723[k1411] != null && !isNaN(q2723[k1411]) && q2723[w1412] != null && !isNaN(q2723[w1412]) && q2723[z1413] != null && !isNaN(q2723[z1413]) && q2723[f1433] != null && q2723[f1433] != NULL && q2723[e1434] != null && !isNaN(q2723[e1434]); }
function y2720(q2723) { if (!l2719(q2723))
    return null; const t2795 = figma.createText(); s2721(t2795, q2723, true); return t2795; }
function s2721(t2795, q2723, isValid = false) { if (!isValid && !l2719(q2723))
    return null; const fontName = { family: q2723[f1433], style: q2723[r1435] }; try {
    if (!w4274.includes(fontName)) {
        figma.loadFontAsync(fontName).then(() => { w4274.push(fontName); e2722(t2795, q2723, fontName); });
    }
    else {
        e2722(t2795, q2723, fontName);
    }
}
catch (e) {
    q955(e);
} }
function e2722(t2795, q2723, fontName) { t2795.fontName = fontName; t2795.fontSize = Math.max(1, q2723[e1434]); t2795.characters = q2723[o1431]; t2795.lineHeight = { unit: 'PERCENT', value: q2723[n1438] }; t2795.letterSpacing = { unit: 'PERCENT', value: q2723[k1439] }; if (q2723[f1436] == 0)
    t2795.textAlignHorizontal = 'LEFT';
else if (q2723[f1436] == 1)
    t2795.textAlignHorizontal = 'CENTER';
else if (q2723[f1436] == 2)
    t2795.textAlignHorizontal = 'RIGHT';
else if (q2723[f1436] == 3)
    t2795.textAlignHorizontal = 'JUSTIFIED'; if (q2723[l1437] == 0)
    t2795.textAlignVertical = 'TOP';
else if (q2723[l1437] == 1)
    t2795.textAlignVertical = 'CENTER';
else if (q2723[l1437] == 2)
    t2795.textAlignVertical = 'BOTTOM'; x1590(t2795, q2723); s2703(t2795, q2723); if (q2723[w1420] == 0 && q2723[b1426] == 0)
    t2795.textAutoResize = 'WIDTH_AND_HEIGHT';
else if (q2723[w1420] == 0)
    t2795.textAutoResize = 'HEIGHT';
else
    t2795.textAutoResize = 'NONE'; }
function c2778(g2728) { return true; }
function i2749(g2728) { if (!c2778(g2728))
    return null; const g2729 = figma.createVector(); y2755(g2729, g2728, true); return g2729; }
function y2755(g2729, g2728, isValid = false) { if (!isValid && !c2778(g2728))
    return; g2729.setVectorNetworkAsync(g2728[g1416]); x1590(g2729, g2728, false); s2703(g2729, g2728); }
function d2777(p2724) { return p2724[m1423] != null && !isNaN(p2724[m1423]) && p2724[q1429] != null && !isNaN(p2724[q1429]); }
function u2748(p2724) { const l2725 = figma.createVector(); q2754(l2725, p2724, true); return l2725; }
function q2754(l2725, p2724, isValid = false) { if (!isValid && !d2777(p2724))
    return; l2725.vectorPaths = [{ windingRule: p2724[m1423] == 1 ? 'NONZERO' : 'EVENODD', data: p2724[q1417] }]; l2725.cornerRadius = p2724[q1429]; x1590(l2725, p2724, false); s2703(l2725, p2724); }
