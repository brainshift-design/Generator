var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function z1042(key, tag) { return key.substring(0, tag.length + 1) == tag + ' '; }
function s1043(key, tag) { return key.substring(tag.length + 1); }
function z1044(key) { return z1042(key, k866); }
function f1045(key) { return z1042(key, y864); }
function u1046(key) { return z1042(key, s865); }
function l1047(key) { return s1043(key, k866); }
function o1048(key) { return s1043(key, y864); }
function v1049(key) { return s1043(key, s865); }
const generatorVersion = 346;
const p858 = 2147483647;
const NULL = '';
const t859 = '  ';
const k860 = '    ';
const x861 = '\n';
const p862 = '◦ G •';
const e863 = p862 + ' ';
const y864 = 'G_NODE';
const s865 = 'G_CONN';
const k866 = 'G_PAGE';
const f867 = 'G_TEMP';
const identity = Object.freeze([[1, 0, 0], [0, 1, 0], [0, 0, 1]]);
const Epsilon = 0.0000001;
const Tau = Math.PI * 2;
var c2524 = false;
function r868(x, eps = 0.000000001) { return Math.abs(x) < eps ? 0 : x; }
function nozero(x, eps = 0.000000001) { return x != 0 ? x : (x < 0 ? -eps : eps); }
function y869(v, eps = 0.000000001) { return point(nozero(v.x, eps), nozero(v.y, eps)); }
function equal(a, b, eps = 0.000000001) { return Math.abs(b - a) < eps; }
function sqr(x) { return x * x; }
;
function cube(x) { return x * x * x; }
;
function r870(f) { return Math.floor(f) | 0; }
function o871(x) { x = r870(x); x--; x |= x >> 1; x |= x >> 2; x |= x >> 4; x |= x >> 8; x |= x >> 16; x |= x >> 32; return ++x; }
function gcd(a, b) { let temp; while (1) {
    temp = a % b;
    if (temp == 0)
        return b;
    a = b;
    b = temp;
} }
function distance(p1, p2) { const dx = p2.x - p1.x; const dy = p2.y - p1.y; return Math.sqrt(dx * dx + dy * dy); }
function angle(v) { let angle = Math.atan2(v.y, v.x); if (angle < 0)
    angle += Tau; return angle; }
function y872(v1, v2) { return g873(v1.x, v1.y, v2.x, v2.y); }
function g873(x1, y1, x2, y2) { const dx = x2 - x1; const dy = y2 - y1; let angle = Math.atan2(dy, dx); if (angle < 0)
    angle += Tau; return angle; }
function a874(v) { return Math.sqrt(v.x * v.x + v.y * v.y); }
function c875(v) { return point(v.x == 0 ? 0 : v.x / a874(v), v.y == 0 ? 0 : v.y / a874(v)); }
function dot(v1, v2) { return v1.x * v2.x + v1.y * v2.y; }
function s876(a1, a2) { let diff = a2 - a1; while (diff <= -Tau / 2)
    diff += Tau; while (diff > Tau / 2)
    diff -= Tau; return diff; }
function i877(v, m) { let v3 = [v.x, v.y, 1]; let r = a941(v3, m); return point(r[0], r[1]); }
function x878(...mm) { p945(mm.length > 0, 'mulm3m3() must take at least one argument'); let result = clone(mm[0]); for (let a = 1; a < mm.length; a++) {
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
function q879(m, s) { for (let i = 0; i < 3; i++)
    for (let j = 0; j < 3; j++)
        m[i][j] /= s; return m; }
function adjugate(m) { return cofactor(transpose(m)); }
function transpose(m) { return [[m[0][0], m[1][0], m[2][0]], [m[0][1], m[1][1], m[2][1]], [m[0][2], m[1][2], m[2][2]]]; }
function cofactor(m) { return [[m[1][1] * m[2][2] - m[2][1] * m[1][2], -(m[1][0] * m[2][2] - m[2][0] * m[1][2]), m[1][0] * m[2][1] - m[2][0] * m[1][1]], [-(m[0][1] * m[2][2] - m[2][1] * m[0][2]), m[0][0] * m[2][2] - m[2][0] * m[0][2], -(m[0][0] * m[2][1] - m[2][0] * m[0][1])], [m[0][1] * m[1][2] - m[1][1] * m[0][2], -(m[0][0] * m[1][2] - m[1][0] * m[0][2]), m[0][0] * m[1][1] - m[1][0] * m[0][1]]]; }
function determinant(m) { return m[0][0] * (m[1][1] * m[2][2] - m[1][2] * m[2][1]) - m[0][1] * (m[1][0] * m[2][2] - m[2][0] * m[1][2]) + m[0][2] * (m[1][0] * m[2][1] - m[2][0] * m[1][1]); }
function i880(m) { return q879(adjugate(m), determinant(m)); }
function s881(angle) { const cosA = r868(Math.cos(angle)); const sinA = r868(Math.sin(angle)); return [[cosA, sinA, 0], [-sinA, cosA, 0], [0, 0, 1]]; }
function p882(x = 0, y = 0, s883 = 1, b884 = 1, angle = 0, k885 = 0, r886 = 0) { const cosA = Math.cos(angle); const sinA = Math.sin(angle); return [[s883 * cosA - r886 * sinA, -k885 * cosA + b884 * sinA, x], [r886 * cosA + s883 * sinA, b884 * cosA + k885 * sinA, y], [0, 0, 1]]; }
function k887(v1, v2) { return v1.x * v2.y - v1.y * v2.x; }
function b888(v1, v2) { return point(v1.x + v2.x, v1.y + v2.y); }
function o889(v1, v2) { return point(v1.x * v2.x, v1.y * v2.y); }
function o890(v, s) { return point(v.x * s, v.y * s); }
function b891(v1, v2) { return point(v1.x / v2.x, v1.y / v2.y); }
function r892(v, s) { return point(v.x / s, v.y / s); }
function b893(v1, v2) { return point(v1.x - v2.x, v1.y - v2.y); }
function b894(str) { return decodeURI(encodeURIComponent(str)); }
function o895(str) { return decodeURIComponent(encodeURI(str)); }
function m896(bytes) { let str = ''; for (let i = 0; i < bytes.length; i++)
    str += String.fromCharCode(bytes[i]); return str; }
function r897(str) { return Array.from(o895(str), c => c.charCodeAt(0)); }
function f898(array, size) { const newArray = new Uint8Array(size); l899(array, newArray); return newArray; }
function l899(src, dst) { w900(src, 0, src.length, dst, 0, dst.length); }
function w900(src, v901, s902, dst, g903, z904) { const size = Math.min(s902, z904); for (let i = 0; i < size; i++)
    dst[g903 + i] = src[v901 + i]; }
function k905(c906, q907) { if (c906.length != q907.length)
    return false; for (let i = 0; i < c906.length; i++) {
    if (c906[i] != q907[i])
        return false;
} return true; }
function f908(z909, j910) { return z909.findIndex(i => j910.includes(i)) > -1; }
function z911(list) { return list ? '<==' : '<--'; }
;
function a912(list) { return list ? '==>' : '-->'; }
;
function y913(nodeId) { return y864 + ' ' + nodeId; }
function l914(name) { return s865 + ' ' + name; }
function r915(name) { return k866 + ' ' + name; }
function i916(str) { return str.toLowerCase() == 'true' || str == '1'; }
function w917(d918, n919 = false) { return j924(d918.outputNodeId, d918.outputId, d918.outputOrder, d918.inputNodeId, d918.inputId, d918.list, n919); }
function b920(outputNodeId, outputId, outputOrder, inputNodeId, inputId) { return l914(outputNodeId + ' ' + outputId + ' ' + outputOrder + ' ' + inputNodeId + ' ' + inputId); }
function a921(l243) { return b920(l243.outputNodeId, l243.outputId, l243.outputOrder, l243.inputNodeId, l243.inputId); }
function d922(l243) { return b920(l243.output.node.id, l243.output.id, l243.outputOrder, l243.input.node.id, l243.input.id); }
function d923(l243, n919 = false) { return j924(l243.output.node.id, l243.output.id, l243.outputOrder, l243.input.node.id, l243.input.id, l243.list, n919); }
function j924(outputNodeId, outputId, outputOrder, inputNodeId, inputId, list, n919 = false) { const sp = n919 ? ' ' : '  '; const jsp = n919 ? '' : ' '; const arrow = sp + f928(typeof outputOrder == 'string' ? parseInt(outputOrder) : outputOrder) + a912(typeof list == 'string' ? i916(list) : list) + sp; const join = jsp + '.' + jsp; return outputNodeId + join + outputId + arrow + inputNodeId + join + inputId; }
function q925(pageId) { return r915(pageId); }
function x926(num) { const str = num.toString(); let sup = ''; for (const c of str)
    sup += x927(c); return sup; }
function x927(c) { switch (c) {
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
function f928(num) { const str = num.toString(); let sup = ''; for (const c of str)
    sup += l929(c); return sup; }
function l929(c) { switch (c) {
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
function q930(bool) { return bool ? 'true' : 'false'; }
function isValid(val) { return val != undefined && val != null; }
function isEmpty(array) { return array.length == 0; }
function a931(array, item) { c932(array, array.indexOf(item)); }
function c932(array, index) { if (index > -1 && index < array.length)
    array.splice(index, 1); }
function m933(array) { if (isEmpty(array))
    return null; let last = array.at(-1); array.splice(array.length - 1, 1); return last; }
function u934(array) { return array[array.length - 1]; }
function n935(array, from, to) { const item = array[from]; array.splice(from, 1); array.splice(to, 0, item); }
function a936(array, item) { const index = array.indexOf(item); if (index > -1)
    array.splice(index, 1); }
function j937(j2785, array) { for (const item of array) {
    const index = j2785.indexOf(item);
    if (index > -1)
        j2785.splice(index, 1);
} }
function s938(array, where) { const index = array.findIndex(where); if (index > -1)
    array.splice(index, 1); }
function q939(styleId) { return styleId.split(',')[0] + ','; }
function h940(points) { let t4026 = ''; if (points.length < 2)
    return t4026; t4026 += 'M'; t4026 += ' ' + r868(points[0].x); t4026 += ' ' + r868(points[0].y); for (let i = 1; i < points.length; i++) {
    t4026 += ' L' + ' ' + r868(points[i].x) + ' ' + r868(points[i].y);
} return t4026; }
function point(x, y) { return { x: x, y: y }; }
function a941(v, m) { let r = [0, 0, 0]; for (let i = 0; i < 3; i++)
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
        let d111 = {};
        for (const key in val)
            d111[key] = clone(val[key]);
        return d111;
    }
} throw 'unknown'; }
function e942(array, item, equal = null) { if (equal) {
    if (Array.isArray(item))
        item.forEach(i => e942(array, i, equal));
    else if (!array.find(i => equal(i, item)))
        array.push(item);
}
else {
    if (Array.isArray(item))
        item.forEach(i => e942(array, i));
    else if (!array.includes(item))
        array.push(item);
} }
function b943(array, item, equal) { if (Array.isArray(item))
    item.forEach(i => b943(array, i, equal));
else if (!array.find(equal))
    array.push(item); }
function f944(array, item, except) { if (Array.isArray(item))
    item.forEach(i => f944(array, i, except));
else if (!array.find(except))
    array.push(item); }
function p945(...args) { if (c2524) {
    console.assert(...args);
} }
function a946(...args) { if (c2524)
    console.error(...args); }
function s947(str, trim) { while (str.length >= trim.length && str.substring(0, trim.length) == trim)
    str = str.substring(trim.length); return str; }
function q948(str, trim) { while (str.length >= trim.length && str.substring(str.length - trim.length) == trim)
    str = str.substring(0, str.length - trim.length); return str; }
function j949(g4086) { const fills = []; for (const fill of g4086) {
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
            const g4202 = fill[1];
            const stops = [];
            for (const stop of fill[2]) {
                stops.push({ color: { r: Math.min(Math.max(0, stop[0]), 1), g: Math.min(Math.max(0, stop[1]), 1), b: Math.min(Math.max(0, stop[2]), 1), a: Math.min(Math.max(0, stop[3]), 1) }, position: stop[4] });
            }
            fills.push({ type: fill[0], gradientTransform: g4202, gradientStops: stops, blendMode: fill[3] });
            break;
        }
    }
} return fills; }
function g950(type) { return p1083.includes(type); }
const d1050 = 'LIST#';
const a1051 = 'NLIST#';
const w1052 = 'TLIST#';
const h1053 = 'SLIST#';
const a1054 = 'NULL';
const h1055 = 'VAR';
const z1056 = 'VARGRP';
const i1057 = 'START';
const p1058 = 'REPT';
const m1059 = 'CACHE';
const x1060 = 'FRZ';
const s1061 = 'TIMER';
const q1062 = 'VNAME';
const GET_LIST_VALUE_NAMES = 'GVNAMES';
const LIST_VALUE_NAMES = 'VNAMES';
const OBJECT_NAME = 'ONAME';
const i1063 = 'CMB';
const y1064 = 'LSASIT';
const o1065 = 'EXTR';
const f1066 = 'SETP';
const p1067 = 'GETP';
const a1068 = 'SUBLST';
const r1069 = 'UNIQ';
const q1070 = 'REVLST';
const REORDER_LIST = 'RORD';
const j1071 = 'SORT';
const l1072 = 'CLMN';
const q1073 = 'CELL';
const w1074 = 'LIST';
const k1075 = 'COUNT';
const m1076 = 'LCONT';
const u1077 = 'SELECT';
const SELECT_FROM_LIST = 'LSTSEL';
const g1078 = 'IF';
const x1079 = 'LSTFLT';
const l1080 = 'DEFINE';
const y1081 = 'ANY#';
const f1082 = [d1050, a1051, w1052, h1053, i1063, o1065, f1066, p1067, a1068, w1074, k1075, m1076, p1058];
const p1083 = [d1050, a1051, w1052, h1053];
const a1084 = [a1054, h1055, z1056, ...f1082, y1064, o1065, f1066, p1067, a1068, r1069, q1070, REORDER_LIST, l1072, j1071, q1073, w1074, u1077, SELECT_FROM_LIST, g1078, x1079, i1057, p1058, l1080, m1059, x1060, s1061, q1062, GET_LIST_VALUE_NAMES, LIST_VALUE_NAMES, OBJECT_NAME];
const j1085 = 'NUM#';
const p1086 = 'NUM';
const NUMBER_PRECISION = 'NPREC';
const c1087 = 'NSIGN';
const a1088 = 'ABS';
const NUMBER_NEGATIVE = 'NEG';
const u1089 = 'ROUND';
const d1090 = 'SMINMAX';
const j1091 = 'MINMAX';
const z1092 = 'LIM';
const r1093 = 'NCURVE';
const a1094 = 'NANISNUM';
const u1095 = 'CONST';
const v1096 = 'DATE';
const r1097 = 'SEQ';
const t1098 = 'RANGE';
const l1099 = 'WAVE';
const z1100 = 'RAND';
const f1101 = 'NOISE';
const l1102 = 'PROB';
const x1103 = 'ACCUM';
const e1104 = 'LERP';
const u1105 = 'SOLVE';
const p1106 = 'NANIM';
const f1107 = 'SMATH';
const k1108 = 'MATH';
const q1109 = 'ADD';
const v1110 = 'SUB';
const e1111 = 'MUL';
const b1112 = 'DIV';
const s1113 = 'MOD';
const b1114 = 'EXP';
const y1115 = 'NBOOL';
const m1116 = 'NOT';
const b1117 = 'AND';
const i1118 = 'OR';
const o1119 = 'XOR';
const y1120 = 'COND';
const d1121 = 'EQ';
const o1122 = 'NE';
const g1123 = 'LT';
const n1124 = 'LE';
const h1125 = 'GT';
const k1126 = 'GE';
const u1127 = 'TRIG';
const q1128 = 'SIN';
const c1129 = 'COS';
const o1130 = 'TAN';
const v1131 = 'ATAN2';
const a1132 = 'CNVANG';
const v1133 = [k1108, f1107, q1109, v1110, e1111, b1112, s1113, b1114];
const y1134 = [y1115, m1116, b1117, i1118, o1119];
const f1135 = [y1120, d1121, o1122, g1123, n1124, h1125, k1126];
const n1136 = [u1127, q1128, c1129, o1130, v1131];
const i1137 = 'TEXT#';
const k1138 = 'TEXT';
const f1139 = 'TLEN';
const u1140 = 'TTRIM';
const j1141 = 'TSUB';
const r1142 = 'TCONT';
const k1143 = 'TCASE';
const y1144 = 'TREPL';
const y1145 = 'TJOIN';
const h1146 = 'TPAD';
const g1147 = 'TCMP';
const p1148 = 'TCHAR';
const b1149 = 'TUNI';
const h1150 = 'INDEX';
const u1151 = 'N2T';
const j1152 = 'C2T';
const e1153 = 'T2N';
const m1154 = 'T2C';
const v1155 = 'TSPLT';
const a3494 = 'TJSON';
const f1157 = 'TCSV';
const j1158 = 'FETCH';
const w1159 = 'TFILE';
const k1160 = [j1085, a1051, p1086, NUMBER_PRECISION, c1087, a1088, NUMBER_NEGATIVE, u1089, d1090, j1091, z1092, r1093, a1094, u1095, v1096, r1097, t1098, l1099, z1100, f1101, l1102, x1103, e1104, u1105, p1106, u1151, p1148, ...v1133, ...y1134, ...f1135, ...n1136, a1132];
const u1161 = [i1137, w1052, k1138, f1139, u1140, j1141, r1142, k1143, y1145, h1146, y1144, g1147, b1149, h1150, e1153, m1154, v1155, a3494, f1157, j1158, w1159];
const o1162 = 'COL#';
const i1163 = 'COL';
const b1164 = 'CVAL';
const a1165 = 'CCOR';
const e1166 = 'COLP3';
const g1167 = 'CCNT';
const u1168 = 'BLND';
const v1169 = 'CLERP';
const l1170 = 'CBLND';
const e1171 = [o1162, i1163, a1165, e1166, u1168, v1169, l1170, j1152];
const q1172 = 'FILL#';
const c1173 = 'FILL';
const u1174 = [q1172, c1173];
const p1175 = 'STRK#';
const l1176 = 'STRK';
const d1177 = [p1175, l1176];
const h1178 = 'CSTOP#';
const o1179 = 'CSTOP';
const a1180 = [h1178, o1179];
const d1181 = 'GRAD#';
const f1182 = 'GRAD';
const p1183 = [d1181, f1182];
const u1184 = 'RCRN#';
const u1185 = 'RCRN';
const m1186 = [u1184, u1185];
const w1187 = 'DRSH#';
const j1188 = 'DRSH';
const c1189 = [w1187, j1188];
const p1190 = 'INSH#';
const h1191 = 'INSH';
const y1192 = [p1190, h1191];
const o1193 = 'LBLR#';
const v1194 = 'LBLR';
const a1195 = [o1193, v1194];
const u1196 = 'BBLR#';
const j1197 = 'BBLR';
const i1198 = [u1196, j1197];
const y1199 = 'MASK#';
const u1200 = 'MASK';
const a1201 = [y1199, u1200];
const m1202 = 'BLEND#';
const t1203 = 'BLEND';
const q1204 = [m1202, t1203];
const c1205 = [...m1186, ...c1189, ...y1192, ...a1195, ...i1198, ...q1204, ...a1201];
const d1206 = [o1162, q1172, d1181, p1175, w1187, p1190, o1193, u1196, m1202, y1199];
const g1207 = 'CSTL';
const k1208 = 'SHP#';
const w1209 = 'RECT#';
const k1210 = 'RECT';
const m1211 = [w1209, k1210];
const y1212 = 'LINE#';
const v1213 = 'LINE';
const w1214 = [y1212, v1213];
const h1215 = 'ELPS#';
const p1216 = 'ELPS';
const z1217 = [h1215, p1216];
const n1218 = 'TRPZ#';
const h1219 = 'TRPZ';
const o1220 = [n1218, h1219];
const h1221 = 'POLY#';
const w1222 = 'POLY';
const s1223 = [h1221, w1222];
const g1224 = 'STAR#';
const d1225 = 'STAR';
const g1226 = [g1224, d1225];
const c1227 = 'TXTS#';
const g1228 = 'TXTS';
const t1229 = [c1227, g1228];
const u1230 = 'PT#';
const c1231 = 'PT';
const v1232 = [u1230, c1231];
const i1233 = 'PCORN';
const t1234 = 'VPATH#';
const z1235 = 'VPATH';
const q1236 = [t1234, z1235];
const l1237 = 'VPT#';
const y1238 = 'VPT';
const s1239 = [l1237, y1238];
const q1240 = 'VEDGE#';
const f1241 = 'VEDGE';
const l1242 = [q1240, f1241];
const m1243 = 'VREG#';
const s1244 = 'VREG';
const c1245 = [m1243, s1244];
const j1246 = 'VNET#';
const c1247 = 'VNET';
const s1248 = [j1246, c1247];
const o1249 = 'SGRP#';
const k1250 = 'SGRP';
const u1251 = [o1249, k1250];
const w1252 = 'FRM#';
const b1253 = 'FRM';
const k1254 = [w1252, b1253];
const m1255 = 'MOVE';
const d1256 = 'ROT';
const u1257 = 'SCALE';
const n1258 = 'SKEW';
const m1259 = 'SCENTR';
const w1260 = 'RSTX';
const b1261 = 'PLACE';
const z1262 = 'APPLY';
const q1263 = 'MESPT';
const b1264 = 'VECLEN';
const h1265 = 'CIRCEN';
const r1266 = 'INTLIN';
const p1267 = 'PTLERP';
const b1268 = 'PONPT';
const w1269 = 'BOOL';
const q1270 = 'BOOL#';
const e1271 = 'BOOLU';
const b1272 = 'BOOLS';
const v1273 = 'BOOLI';
const q1274 = 'BOOLE';
const i1275 = [w1269, q1270, e1271, b1272, v1273, q1274];
const v1276 = 'RENDER';
const k1277 = [k1208, h1053, w1209, y1212, h1215, n1218, h1221, g1224, c1227, u1230, t1234, l1237, q1240, m1243, j1246, o1249, w1252, q1270, w1187, p1190, o1193, u1196, m1202, y1199];
const z1278 = [d1256, u1257, n1258];
const d1279 = [...k1277, ...m1211, ...w1214, ...z1217, ...o1220, ...s1223, ...g1226, ...t1229, ...v1232, i1233, ...q1236, ...s1239, ...l1242, ...c1245, ...s1248, ...u1251, ...k1254, ...i1275, m1255, ...z1278, m1259, w1260, b1261, z1262, q1263, b1264, h1265, r1266, p1267, b1268, v1276];
const u1280 = [d1050, a1051, w1052, h1053, j1085, i1137, o1162, q1172, h1178, d1181, p1175, h1178, d1181, k1208, w1209, y1212, h1215, n1218, h1221, g1224, c1227, u1230, t1234, l1237, q1240, m1243, j1246, o1249, w1252, u1184, w1187, p1190, o1193, u1196, m1202, y1199];
const d1281 = 'GROUP';
const j1282 = 'GPARAM';
const s1283 = [d1281, j1282];
const j1284 = 'CMNT';
const a1285 = 'CMNTARR';
const g1286 = 'PANEL';
const t1287 = 'ACT';
const y1288 = 'BEF';
const g1289 = 'DIS';
const v1290 = 'NOC';
const v1291 = 'PARAM';
const x1292 = 'LOG';
const m1293 = 'GRAPH';
const v1294 = [[s1113, '%'], [b1112, '/'], [v1110, '−'], [q1109, '+'], [e1111, '×'], [b1114, 'e<sup>x']];
const p1295 = [[b1112, '/'], [v1110, '−'], [q1109, '+'], [e1111, '×']];
const f1296 = 0;
const v1297 = 1;
const l1298 = 2;
const k1299 = 3;
const l1300 = [[f1296, 'not'], [v1297, 'xor'], [l1298, 'or'], [k1299, 'and']];
const t1301 = 0;
const b1302 = 1;
const v1303 = 2;
const x1304 = 3;
const g1305 = 4;
const t1306 = 5;
const a1307 = [[t1301, '<'], [b1302, '≤'], [v1303, '≠'], [x1304, '='], [g1305, '≥'], [t1306, '>']];
const l1308 = 0;
const b1309 = 1;
const r1310 = 2;
const t1311 = 3;
const u1312 = 4;
const j1313 = 5;
const s1314 = [[l1308, 'sin'], [b1309, 'cos'], [r1310, 'tan'], [t1311, 'asin'], [u1312, 'acos'], [j1313, 'atan']];
const t1315 = 'EMPTY';
const r1316 = 'CONNECT';
const h1317 = 'CREATE';
const h1318 = 'CREATE_INSERT';
const b1319 = 'DELETE';
const b1320 = 'DISCONNECT';
const x1321 = 'LINK_STYLE';
const q1322 = 'LINK_VARIABLE';
const v1323 = 'LINK_VARIABLE_GROUP';
const b1324 = 'MAKE_ACTIVE';
const MAKE_NOT_CONDITION_ACTION = 'MAKE_NOT_CONDITION';
const u1325 = 'MAKE_PASSIVE';
const g1326 = 'PASTE';
const p1327 = 'RECONNECT';
const z1328 = 'REMOVE';
const a1329 = 'RENAME';
const d1330 = 'REORDER_INPUTS';
const a1331 = 'REORDER_CONNECTIONS';
const y1332 = 'SELECT';
const p1333 = 'SELECT_MOVE';
const s1334 = 'MOVE_NODES';
const a1335 = 'SET_PARAM_VALUE';
const SET_MULTIPLE_VALUES_ACTION = 'SET_MULTIPLE_VALUES';
const c1336 = 'SET_PARAM_SETTING';
const o1337 = 'SET_NODE_RECT';
const u1338 = 'TOGGLE_DISABLE';
const c1339 = 'TOGGLE_PARAM_HEADER';
const g1340 = 'SET_CURRENT_GRAPH';
const f1341 = 'CREATE_PAGE';
const i1342 = 'DELETE_PAGE';
const w1343 = 'GROUP_NODES';
const p1344 = 'UNGROUP_NODES';
const b1345 = 'HIGHLIGHT_NODES';
const SCROLL_LIST_NODE_ACTION = 'SCROLL_LIST_NODE';
const SET_LIST_DIVIDER_ACTION = 'SET_LIST_DIVIDER';
const SET_NODE_PARAM_ACTION = 'SET_NODE_PARAM';
const a1346 = 'BNORM';
const n1347 = 'BDARK';
const u1348 = 'BMULT';
const c1349 = 'BPDRK';
const x1350 = 'BBURN';
const x1351 = 'BLITE';
const n1352 = 'BSCRN';
const j1353 = 'BPLGT';
const j1354 = 'BDODG';
const n1355 = 'BOVER';
const d1356 = 'BSOFT';
const f1357 = 'BHARD';
const u1358 = 'BDIFF';
const d1359 = 'BEXCL';
const z1360 = 'BHUE';
const e1361 = 'BSAT';
const b1362 = 'BCOL';
const k1363 = 'BLUM';
const y1364 = [[a1346, 'normal', 'NORMAL'], [n1347, 'darken', 'DARKEN'], [u1348, 'multiply', 'MULTIPLY'], [c1349, 'plus darker', 'LINEAR_BURN'], [x1350, 'color burn', 'COLOR_BURN'], [x1351, 'lighten', 'LIGHTEN'], [n1352, 'screen', 'SCREEN'], [j1353, 'plus lighter', 'LINEAR_DODGE'], [j1354, 'color dodge', 'COLOR_DODGE'], [n1355, 'overlay', 'OVERLAY'], [d1356, 'soft light', 'SOFT_LIGHT'], [f1357, 'hard light', 'HARD_LIGHT'], [u1358, 'difference', 'DIFFERENCE'], [d1359, 'exclusion', 'EXCLUSION'], [z1360, 'hue', 'HUE'], [e1361, 'saturation', 'SATURATION'], [b1362, 'color', 'COLOR'], [k1363, 'luminosity', 'LUMINOSITY']];
const q1365 = [['thin', 100], ['extra light', 200], ['light', 300], ['regular', 400], ['medium', 500], ['semi bold', 600], ['bold', 700], ['extra bold', 800], ['black', 900]];
const u1366 = 0;
const f1367 = 1;
const r1368 = 2;
const r1369 = 2;
const q1370 = 3;
const d1371 = 3;
const n1372 = 4;
const f1373 = 4;
const u1374 = 5;
const w1375 = 6;
const p1376 = 7;
const t1377 = 8;
const f1378 = 9;
const z1379 = 10;
const t1380 = 11;
const s1381 = 12;
const v1382 = 13;
const x1383 = 14;
const c1384 = 15;
const f1385 = 16;
const n1386 = 17;
const p1387 = 18;
const g1388 = 19;
const e1389 = 20;
const x1390 = 21;
const w1391 = 22;
const t1392 = 23;
const r1393 = 24;
const c1394 = 24;
const c1395 = 25;
const e1396 = 26;
const x1397 = 27;
const y1398 = 28;
const z1399 = 28;
const g1400 = 28;
const v1401 = 28;
const w1402 = 28;
const c1403 = 28;
const l1404 = 28;
const u1405 = 28;
const k1406 = 29;
const i1407 = 29;
const p1408 = 29;
const n1409 = 29;
const y1410 = 29;
const j1411 = 29;
const a1412 = 30;
const u1413 = 30;
const j1414 = 30;
const h1415 = 30;
const j1416 = 31;
const d1417 = 31;
const h1418 = 32;
const s1419 = 33;
const d1420 = 34;
const f1421 = 35;
const z1422 = 36;
const n1423 = 37;
const w2786 = '12345679ABCDEFGHJKLMNPQRSTUVWXYZ';
function l839(array, chars = w2786) { let b841 = ''; let len = array.length; let i = 0; while (len > 0) {
    if (len >= 5) {
        const a0 = array[i], a1 = array[i + 1], a2 = array[i + 2], a3 = array[i + 3], a4 = array[i + 4];
        b841 += chars[(a0 & 0xF8) >>> 3];
        b841 += chars[((a0 & 0x07) << 2) | ((a1 & 0xC0) >>> 6)];
        b841 += chars[(a1 & 0x3E) >>> 1];
        b841 += chars[((a1 & 0x01) << 4) | ((a2 & 0xF0) >>> 4)];
        b841 += chars[((a2 & 0x0F) << 1) | ((a3 & 0x80) >>> 7)];
        b841 += chars[(a3 & 0x7C) >>> 2];
        b841 += chars[((a3 & 0x03) << 3) | ((a4 & 0xE0) >>> 5)];
        b841 += chars[(a4 & 0x1F)];
    }
    else if (len == 4) {
        const a0 = array[i], a1 = array[i + 1], a2 = array[i + 2], a3 = array[i + 3];
        b841 += chars[(a0 & 0xF8) >>> 3];
        b841 += chars[((a0 & 0x07) << 2) | ((a1 & 0xC0) >>> 6)];
        b841 += chars[(a1 & 0x3E) >>> 1];
        b841 += chars[((a1 & 0x01) << 4) | ((a2 & 0xF0) >>> 4)];
        b841 += chars[((a2 & 0x0F) << 1) | ((a3 & 0x80) >>> 7)];
        b841 += chars[(a3 & 0x7C) >>> 2];
        b841 += chars[((a3 & 0x03) << 3)];
    }
    else if (len == 3) {
        const a0 = array[i], a1 = array[i + 1], a2 = array[i + 2];
        b841 += chars[(a0 & 0xF8) >>> 3];
        b841 += chars[((a0 & 0x07) << 2) | ((a1 & 0xC0) >>> 6)];
        b841 += chars[(a1 & 0x3E) >>> 1];
        b841 += chars[((a1 & 0x01) << 4) | ((a2 & 0xF0) >>> 4)];
        b841 += chars[((a2 & 0x0F) << 1)];
    }
    else if (len == 2) {
        const a0 = array[i], a1 = array[i + 1];
        b841 += chars[(a0 & 0xF8) >>> 3];
        b841 += chars[((a0 & 0x07) << 2) | ((a1 & 0xC0) >>> 6)];
        b841 += chars[(a1 & 0x3E) >>> 1];
        b841 += chars[((a1 & 0x01) << 4)];
    }
    else if (len == 1) {
        const a0 = array[i];
        b841 += chars[(a0 & 0xF8) >>> 3];
        b841 += chars[((a0 & 0x07) << 2)];
    }
    i += 5;
    len -= 5;
} return b841; }
function m840(b841, chars = w2786) { const array = []; let len = b841.length; let c = 0; while (len > 0) {
    if (len >= 8) {
        const c0 = chars.indexOf(b841[c]), c1 = chars.indexOf(b841[c + 1]), c2 = chars.indexOf(b841[c + 2]), c3 = chars.indexOf(b841[c + 3]), c4 = chars.indexOf(b841[c + 4]), c5 = chars.indexOf(b841[c + 5]), c6 = chars.indexOf(b841[c + 6]), c7 = chars.indexOf(b841[c + 7]);
        array.push((c0 << 3) | ((c1 & 0x1C) >>> 2));
        array.push(((c1 & 0x03) << 6) | (c2 << 1) | ((c3 & 0x10) >>> 4));
        array.push(((c3 & 0x0F) << 4) | ((c4 & 0x1E) >>> 1));
        array.push(((c4 & 0x01) << 7) | (c5 << 2) | ((c6 & 0x18) >>> 3));
        array.push(((c6 & 0x07) << 5) | c7);
    }
    else if (len == 7) {
        const c0 = chars.indexOf(b841[c]), c1 = chars.indexOf(b841[c + 1]), c2 = chars.indexOf(b841[c + 2]), c3 = chars.indexOf(b841[c + 3]), c4 = chars.indexOf(b841[c + 4]), c5 = chars.indexOf(b841[c + 5]), c6 = chars.indexOf(b841[c + 6]);
        array.push((c0 << 3) | ((c1 & 0x1C) >>> 2));
        array.push(((c1 & 0x03) << 6) | (c2 << 1) | ((c3 & 0x10) >>> 4));
        array.push(((c3 & 0x0F) << 4) | ((c4 & 0x1E) >>> 1));
        array.push(((c4 & 0x01) << 7) | (c5 << 2) | ((c6 & 0x18) >>> 3));
    }
    else if (len == 5) {
        const c0 = chars.indexOf(b841[c]), c1 = chars.indexOf(b841[c + 1]), c2 = chars.indexOf(b841[c + 2]), c3 = chars.indexOf(b841[c + 3]), c4 = chars.indexOf(b841[c + 4]);
        array.push((c0 << 3) | ((c1 & 0x1C) >>> 2));
        array.push(((c1 & 0x03) << 6) | (c2 << 1) | ((c3 & 0x10) >>> 4));
        array.push(((c3 & 0x0F) << 4) | ((c4 & 0x1E) >>> 1));
    }
    else if (len == 4) {
        const c0 = chars.indexOf(b841[c]), c1 = chars.indexOf(b841[c + 1]), c2 = chars.indexOf(b841[c + 2]), c3 = chars.indexOf(b841[c + 3]);
        array.push((c0 << 3) | ((c1 & 0x1C) >>> 2));
        array.push(((c1 & 0x03) << 6) | (c2 << 1) | ((c3 & 0x10) >>> 4));
    }
    else if (len == 2) {
        const c0 = chars.indexOf(b841[c]), c1 = chars.indexOf(b841[c + 1]);
        array.push((c0 << 3) | ((c1 & 0x1C) >>> 2));
    }
    c += 8;
    len -= 8;
} return array; }
function l2081(nodeKey, m3998) { const log = f2082(d1531(nodeKey, false)); if (m3998) {
    console.log('%c%s\n%c%s', 'background: #fa24; color: white;', o1048(nodeKey), 'background: #fa44; color: #edc;', log);
}
else {
    console.log('%c%s\n%c%s', 'background: #fdb; color: black;', o1048(nodeKey), 'background: #fed; color: black;', log);
} }
function f2082(json) { let g4027 = json.replace('{\n', '').replace('\n}', '').replace('[\n' + t859, '').replace('\n' + t859 + ']', '').split(t859 + '"params":\n').join('').split('": "').join(': ').split('", "').join(': ').split(t859 + '"').join(t859).split(t859 + t859 + '["').join(t859 + t859).split('",\n').join('\n').split('"\n').join('\n').split('"],\n').join('\n'); if (g4027[g4027.length - 1] == '"')
    g4027 = g4027.substring(0, g4027.length - 1); if (g4027.substring(g4027.length - 2) == '"]')
    g4027 = g4027.substring(0, g4027.length - 2); return g4027; }
function n2083(json) { let g4027 = json.replace('{\n', '').replace('\n}', '').replace('[\n' + t859, '').replace('\n' + t859 + ']', ''); return g4027; }
function q2084(l243, m3998) { const f4205 = w917(l243, true); if (m3998) {
    console.log('%c%s', 'background: #4f44; color: #ded', f4205);
}
else {
    console.log('%c%s', 'background: #cfc; color: black;', f4205);
} }
console.clear();
figma.payments.setPaymentStatusInDevelopment({ type: 'PAID' });
figma.on('documentchange', w1502);
figma.on('selectionchange', u1510);
figma.on('close', x1503);
k1492(true);
figma.clientStorage.getAsync('pro').then(data => { figma.showUI(__html__, { visible: false, themeColors: true, title: 'Generator' }); });
var u2698 = figma.viewport.zoom;
setInterval(q1507, 100);
const q2787 = 'clock_';
const k2788 = 1000;
var i2789 = false;
function l1504() { (function () {
    return __awaiter(this, void 0, void 0, function* () { let v2790 = yield figma.currentPage.getPluginData(figma.currentUser.id + ',windowWidth'); let t2791 = yield figma.currentPage.getPluginData(figma.currentUser.id + ',windowHeight'); let z2792; let z2793; if (v2790 === NULL) {
        z2792 = 800;
        figma.currentPage.setPluginData(figma.currentUser.id + ',windowWidth', v2790.toString());
    }
    else
        z2792 = parseInt(v2790); if (t2791 === NULL) {
        z2793 = 600;
        figma.currentPage.setPluginData(figma.currentUser.id + ',windowHeight', t2791.toString());
    }
    else
        z2793 = parseInt(t2791); figma.ui.resize(Math.max(0, z2792), Math.max(0, z2793)); figma.ui.show(); const fonts = yield figma.listAvailableFontsAsync(); const eula = (yield figma.clientStorage.getAsync('eula')) === 'true'; const tutorials = (yield figma.clientStorage.getAsync('tutorials')) === 'true'; const isLocked = w1509(); p1511({ cmd: 'uiReturnFigStartGenerator', currentUser: figma.currentUser, viewportRect: figma.viewport.bounds, viewportZoom: figma.viewport.zoom, fonts: fonts, eula: eula, tutorials: tutorials, isLocked: isLocked, windowWidth: z2792, windowHeight: z2793 }); });
})(); }
function c1505() { k1492(); figma.showUI(__html__, { visible: false, themeColors: true }); }
function i1506() { setInterval(h1508, k2788); }
function q1507() { if (figma.viewport.zoom == u2698)
    return; u2698 = figma.viewport.zoom; r2686(); w1525(); x1527(); }
function h1508() { i1532(q2787 + figma.currentUser.sessionId.toString(), Date.now().toString()); }
function w1509() { const clocks = figma.currentPage.getPluginDataKeys().filter(k => k.length > q2787.length && k.substring(0, q2787.length) == q2787 && k.substring(q2787.length) != figma.currentUser.sessionId.toString()).map(k => parseInt(d1531(k))); clocks.sort(); const now = Date.now(); const locked = clocks.length > 0 && now - clocks[clocks.length - 1] < k2788 * 2; return locked; }
function u1510() { r2686(); }
var h2719 = new Array();
var l2721 = new Array();
function o1491(nodeIds) { for (let i = a2755.length - 1; i >= 0; i--)
    if (!a2755[i].removed && nodeIds.includes(a2755[i].getPluginData('nodeId')))
        a2755.splice(i, 1); for (let i = z2771.length - 1; i >= 0; i--)
    if (z2771[i].removed || nodeIds.includes(z2771[i].getPluginData('nodeId')))
        z2771.splice(i, 1); figma.currentPage.findAll(o => nodeIds.includes(o.getPluginData('nodeId'))).forEach(o => { if (!o.removed)
    o.remove(); }); h2719 = h2719.filter(a => !nodeIds.includes(a.nodeId)); }
function k1492(u1493 = false) { for (const y1498 of figma.currentPage.children) {
    if (y1498.removed)
        continue;
    if (y1498.getPluginData('objectId') != '' && y1498.getPluginData('userId') == figma.currentUser.id && (parseInt(y1498.getPluginData('retain')) == 0 || u1493))
        y1498.remove();
} }
function y1494(nodeIds, g1495) { for (let i = h2719.length - 1; i >= 0; i--) {
    const l2720 = h2719[i];
    if (!nodeIds.includes(l2720.nodeId))
        continue;
    for (let j = l2720.objects.length - 1; j >= 0; j--) {
        const y1498 = l2720.objects[j];
        if (y1498.removed || !y1496(y1498, g1495)) {
            if (!y1498.removed)
                y1498.remove();
            a936(l2720.objects, y1498);
            if (a2755.includes(y1498))
                a936(a2755, y1498);
            if (z2771.includes(y1498))
                a936(z2771, y1498);
        }
        if (!y1498.removed) {
            if (parseInt(y1498.getPluginData('retain')) == 2)
                z1517(y1498);
        }
    }
    if (isEmpty(l2720.objects))
        a936(h2719, l2720);
} }
function y1496(y1498, g1495) { if (y1498.type == k1250 || y1498.type == b1253) {
    for (const child of y1498.children) {
        const found = y1496(child, g1495);
        if (found)
            return found;
    }
}
else {
    const found = g1495.find(o => y1498.getPluginData('objectId') == o[r1368] && y1498.getPluginData('userId') == figma.currentUser.id || o[u1374] == 2 && o[u1374] == y1498.getPluginData('retain'));
    if (found)
        return found;
} return null; }
function a1499(nodeIds, z1500) { const paintStyles = figma.getLocalPaintStyles(); paintStyles.filter(s => nodeIds.includes(s.getPluginData('nodeId'))).forEach(s => { const nodeId = s.getPluginData('nodeId'); const existing = i916(s.getPluginData('existing')); if (!existing) {
    s.remove();
}
else if (z1500) {
    s938(l2721, a => a.nodeId == nodeId);
    s.setPluginData('type', NULL);
    s.setPluginData('nodeId', NULL);
    s.setPluginData('existing', NULL);
} }); if (z1500)
    l2721 = l2721.filter(a => !nodeIds.includes(a.nodeId)); }
var c1501 = false;
function w1502(e) { for (const change of e.documentChanges) {
    switch (change.type) {
        case 'STYLE_CREATE':
            if (!change.style)
                break;
            if (!c1501) {
                change.style.setPluginData('type', NULL);
                change.style.setPluginData('nodeId', NULL);
                change.style.setPluginData('existing', NULL);
            }
            break;
        case 'STYLE_PROPERTY_CHANGE': {
            if (!change.style)
                break;
            if (!c1501) {
                const msg = { cmd: 'uiStylePropertyChange', styleId: q939(change.id), properties: change.properties, name: '', paints: [] };
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
                p1511(msg);
            }
            break;
        }
        case 'STYLE_DELETE':
            p1511({ cmd: 'uiStyleDelete', styleId: change.id });
            break;
    }
} c1501 = false; }
function x1503() { k1492(); p1511({ cmd: 'updateMetrics' }); }
figma.ui.onmessage = function (msg) { msg = JSON.parse(msg); if (msg.cmd == 'returnUiGetValueForFigma')
    return; switch (msg.cmd) {
    case 'figStartGenerator':
        l1504();
        break;
    case 'figRestartGenerator':
        c1505();
        break;
    case 'figFinishStart':
        i1506();
        break;
    case 'figDockWindowNormal':
        y2728('normal');
        break;
    case 'figDockWindowMaximize':
        y2728('maximize');
        break;
    case 'figDockWindowTop':
        y2728('top');
        break;
    case 'figDockWindowLeft':
        y2728('left');
        break;
    case 'figDockWindowRight':
        y2728('right');
        break;
    case 'figDockWindowBottom':
        y2728('bottom');
        break;
    case 'figGetMousePosition':
        u1577(msg.clientPosition);
        break;
    case 'figResizeWindow':
        k1580(msg.width, msg.height);
        break;
    case 'figSetWindowRect':
        m1578(msg.x, msg.y, msg.width, msg.height);
        break;
    case 'figNotify':
        w1581(msg);
        break;
    case 'figGetLocalData':
        q1529(msg.key);
        break;
    case 'figSetLocalData':
        a1530(msg.key, msg.value);
        break;
    case 'figClearAllLocalData':
        a4022();
        break;
    case 'figGetPageData':
        d1531(msg.key);
        break;
    case 'figSetPageData':
        i1532(msg.key, msg.value);
        break;
    case 'figSavePages':
        q1537(msg.t4263, msg.pageJson, msg.currentPageId);
        break;
    case 'figLoadNodesAndConns':
        g1534(msg.debugMode);
        break;
    case 'figSaveNodes':
        v1538(msg.nodeIds, msg.nodeJson);
        break;
    case 'figGetAllLocalTemplateNames':
        c2725();
        break;
    case 'figSaveLocalTemplate':
        v1539(msg.q4023, msg.template);
        break;
    case 'figRemoveConnsToNodes':
        j1540(msg.nodeIds);
        break;
    case 'figRemoveSavedNodesAndConns':
        l1541(msg.nodeIds);
        break;
    case 'figRemoveAllSavedNodesAndConns':
        h1542();
        break;
    case 'figLogAllSavedNodesAndConns':
        n1543(msg.m3998);
        break;
    case 'figLogAllSavedNodes':
        x1544(msg.m3998);
        break;
    case 'figLogAllSavedConns':
        n1545(msg.m3998);
        break;
    case 'figLogAllSavedPageKeys':
        m1546(msg.m3998);
        break;
    case 'figLogAllSavedPages':
        j1547(msg.m3998);
        break;
    case 'figLogAllSavedConnKeys':
        b1548(msg.m3998);
        break;
    case 'figLogAllLocalData':
        y1549(msg.m3998);
        break;
    case 'figGetValue':
        g1550(msg.key, msg.spec);
        break;
    case 'figRemoveSavedPage':
        d1552(msg.pageId);
        break;
    case 'figRemoveAllSavedPages':
        v1553();
        break;
    case 'figSaveConnection':
        v1554(msg.key, msg.json);
        break;
    case 'figSaveConnections':
        b1555(msg.keys, msg.json);
        break;
    case 'figUpdateSavedConnections':
        t1556(msg.curKeys, msg.newKeys, msg.json);
        break;
    case 'figDeleteSavedConnection':
        m1557(msg.key);
        break;
    case 'figRemoveAllSavedConnections':
        q1558();
        break;
    case 'figDeleteSavedConnectionsToNode':
        o1559(msg.nodeId);
        break;
    case 'figDeleteSavedConnectionsFromNode':
        x1560(msg.nodeId);
        break;
    case 'figRemovePluginDataFromAllLocalStyles':
        k1561();
        break;
    case 'figGetAllLocalVariables':
        b1585(msg.nodeId, msg.px, msg.py);
        break;
    case 'figLinkNodeToVariable':
        n1587(msg.nodeId, msg.variableId);
        break;
    case 'figUpdateVariable':
        l1588(msg.variableId, msg.value);
        break;
    case 'figGetAllLocalColorStyles':
        p1562(msg.nodeId, msg.px, msg.py);
        break;
    case 'figLinkNodeToExistingColorStyle':
        q1563(msg.nodeId, msg.styleId);
        break;
    case 'figGetObjectSize':
        a1516(msg.object);
        break;
    case 'figGetVariableUpdates':
        z1551(msg.linkedVarIds);
        break;
    case 'figUpdateShowIds':
        i2789 = msg.i2789;
        break;
    case 'figDeleteAllObjects':
        k1492();
        break;
    case 'figUpdateObjectsAndStyles':
        j2734 = 0;
        d2735 = 0;
        msg.objects.forEach(o => o.counted = false);
        b2722(null, msg.objects, msg.f4012, msg.o2029, msg.nodeIds, msg.t2751, msg.w2752, msg.r270);
        u1568(msg);
        break;
    case 'figDeleteObjectsAndStyles':
        o1491(msg.nodeIds);
        a1499(msg.nodeIds, msg.z1500);
        break;
    case 'figDeleteObjectsExcept':
        y1494(msg.nodeIds, msg.ignoreObjects);
        break;
    case 'figTriggerUndo':
        figma.triggerUndo();
        break;
    case 'figCommitUndo':
        figma.commitUndo();
        break;
} p1511({ cmd: 'uiEndFigMessage', msgCmd: msg.cmd }); };
function p1511(msg) { figma.ui.postMessage(JSON.stringify(msg)); }
function c2723(key) {
    return __awaiter(this, void 0, void 0, function* () { return yield figma.clientStorage.getAsync(key); });
}
function q1529(key) { if (key == 'canvasEmpty') {
    p1511({ cmd: 'uiReturnFigGetLocalData', key: key, value: figma.currentPage.children.length == 0 });
}
else if (key == 'debugWarningCrash') {
    figma.clientStorage.getAsync('debugWarning').then(data => { p1511({ cmd: 'uiReturnFigGetLocalData', key: key, value: data }); });
}
else {
    figma.clientStorage.getAsync(key).then(data => { p1511({ cmd: 'uiReturnFigGetLocalData', key: key, value: data }); });
} }
function a1530(key, value, postToUi = true) { figma.clientStorage.setAsync(key, value); if (postToUi) {
    p1511({ cmd: 'uiReturnFigSetLocalData', key: key, value: value });
} }
function a4022() {
    return __awaiter(this, void 0, void 0, function* () { const keys = yield figma.clientStorage.keysAsync(); for (const key of keys)
        figma.clientStorage.deleteAsync(key); });
}
function d1531(key, postToUi = true) { const data = figma.currentPage.getPluginData(key); if (postToUi) {
    p1511({ cmd: 'uiReturnFigGetPageData', key: key, value: data });
} return data; }
function i1532(key, value) { g1533(key); figma.currentPage.setPluginData(key, value); }
function g1533(key) { figma.currentPage.setPluginData(key, ''); }
function g1534(debugMode) { const pageKeys = figma.currentPage.getPluginDataKeys().filter(k => z1044(k)); const nodeKeys = figma.currentPage.getPluginDataKeys().filter(k => f1045(k)); const connKeys = figma.currentPage.getPluginDataKeys().filter(k => u1046(k)); if (!debugMode)
    n1536(nodeKeys, connKeys); const pages = pageKeys.map(k => figma.currentPage.getPluginData(k)); const nodes = nodeKeys.map(k => figma.currentPage.getPluginData(k)); const i2101 = connKeys.map(k => figma.currentPage.getPluginData(k)); const pageOrder = figma.currentPage.getPluginData('pageOrder').split(','); const currentPageId = figma.currentPage.getPluginData('currentPageId'); v1535(nodes); const g3651 = figma.currentPage.getPluginData('showAllColorSpaces'); p1511({ cmd: 'uiReturnFigLoadNodesAndConns', g3651: g3651, pageKeys: pageKeys, pageJson: pages, pageOrder: pageOrder, currentPageId: currentPageId, nodeKeys: nodeKeys, nodeJson: nodes, connKeys: connKeys, connJson: i2101 }); }
function v1535(nodes) { l2721 = []; const paintStyles = figma.getLocalPaintStyles(); for (const z3008 of nodes) {
    const node = JSON.parse(z3008);
    if (node.type == g1207) {
        const style = paintStyles.find(s => { const nodeId = s.getPluginData('nodeId'); return nodeId == node.id; });
        if (style) {
            l2721.push({ nodeId: node.id, existing: i916(node.existing), styles: [style] });
        }
    }
} }
function n1536(nodeKeys, connKeys) { const o2724 = '"loading": "true"'; const not = '{\n'; const set = '{\n' + t859 + o2724 + ',\n'; nodeKeys.forEach(k => figma.currentPage.setPluginData(k, figma.currentPage.getPluginData(k).replace(set, not).replace(not, set))); connKeys.forEach(k => figma.currentPage.setPluginData(k, figma.currentPage.getPluginData(k).replace(set, not).replace(not, set))); }
function q1537(t4263, pageJson, currentPageId) { for (let i = 0; i < t4263.length; i++) {
    i1532(r915(t4263[i]), pageJson[i]);
} i1532('pageOrder', t4263.join(',')); i1532('currentPageId', currentPageId); }
function v1538(nodeIds, nodeJson) { for (let i = 0; i < nodeIds.length; i++) {
    i1532(y913(nodeIds[i]), nodeJson[i]);
} }
function c2725() {
    return __awaiter(this, void 0, void 0, function* () { let keys = yield figma.clientStorage.keysAsync(); keys = keys.filter(k => k.length >= f867.length && k.substring(0, f867.length) == f867); p1511({ cmd: 'uiReturnGetAllLocalTemplateNames', templateNames: keys }); });
}
function v1539(q4023, template) { a1530(f867 + ' ' + q4023, template); }
function j1540(nodeIds) { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => u1046(k)); for (const key of connKeys) {
    const parts = v1049(key).split(' ');
    if (nodeIds.includes(parts[0]) || nodeIds.includes(parts[2]))
        g1533(key);
} }
function l1541(nodeIds) { j1540(nodeIds); const nodeKeys = figma.currentPage.getPluginDataKeys().filter(k => f1045(k) && nodeIds.includes(o1048(k))); nodeKeys.forEach(k => g1533(k)); }
function h1542() { const nodeKeys = figma.currentPage.getPluginDataKeys().filter(k => f1045(k)); const connKeys = figma.currentPage.getPluginDataKeys().filter(k => u1046(k)); for (const key of nodeKeys)
    g1533(key); for (const key of connKeys)
    g1533(key); }
function n1543(m3998) { x1544(m3998); n1545(m3998); }
function x1544(m3998) { figma.currentPage.getPluginDataKeys().filter(k => f1045(k)).forEach(k => l2081(k, m3998)); }
function n1545(m3998) { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => u1046(k)); connKeys.sort((key1, key2) => { const p1 = v1049(key1).split(' '); const p2 = v1049(key2).split(' '); if (p1[2] != p2[2])
    return p1[2] < p2[2] ? -1 : 1; if (p1[3] != p2[3])
    return parseInt(p1[3]) - parseInt(p2[3]); if (p1[2] == p2[0])
    return -1; if (p2[2] == p1[0])
    return 1; return 0; }); connKeys.forEach(k => q2084(JSON.parse(figma.currentPage.getPluginData(k)), m3998)); }
function m1546(m3998) { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => z1044(k)); connKeys.forEach(k => console.log('%c' + k, 'background: #fff; color: ' + (m3998 ? 'black' : 'white'))); const pageOrder = figma.currentPage.getPluginData('pageOrder'); console.log('%c' + pageOrder, 'background: #fff; color: ' + (m3998 ? 'black' : 'white')); }
function j1547(m3998) { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => z1044(k)); connKeys.forEach(k => console.log('%c' + figma.currentPage.getPluginData(k), 'background: #fff; color: ' + (m3998 ? 'black' : 'white'))); const pageOrder = figma.currentPage.getPluginData('pageOrder'); console.log('%c' + pageOrder, 'background: #fff; color: ' + (m3998 ? 'black' : 'white')); }
function b1548(m3998) { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => u1046(k)); connKeys.forEach(k => console.log('%c' + k, 'background: #dff; color: ' + (m3998 ? 'black' : 'white'))); }
function y1549(m3998) { figma.clientStorage.keysAsync().then(keys => keys.forEach(k => figma.clientStorage.getAsync(k).then(val => console.log(k + ': ' + val)))); }
function g1550(key, spec) {
    return __awaiter(this, void 0, void 0, function* () { let result = null; switch (key) {
        case 'getVariableData':
            result = z1586(spec);
            break;
        case 'getPaidStatus':
            result = figma.payments.status.type;
            break;
        case 'figSubscribe': {
            yield figma.payments.initiateCheckoutAsync({ interstitial: 'PAID_FEATURE' });
            result = figma.payments.status.type;
            break;
        }
    } p1511({ cmd: 'returnFigGetValue', value: result }); });
}
function z1551(varIds) { p1511({ cmd: 'uiReturnFigGetVariableUpdates', values: z1586(varIds) }); }
function d1552(pageId) { g1533(q925(pageId)); const pageOrder = d1531('pageOrder').split(','); s938(pageOrder, id => id == pageId); i1532('pageOrder', pageOrder.join(',')); }
function v1553() { const pageKeys = figma.currentPage.getPluginDataKeys().filter(k => z1044(k)); pageKeys.forEach(k => g1533(k)); g1533('pageOrder'); }
function v1554(key, json) { i1532(key, json); }
function b1555(_keys, _json) { const keys = JSON.parse(_keys); const json = JSON.parse(_json); for (let i = 0; i < keys.length; i++)
    i1532(keys[i], json[i]); }
function t1556(_curKeys, _newKeys, _json) { const curKeys = JSON.parse(_curKeys); const newKeys = JSON.parse(_newKeys); const json = JSON.parse(_json); for (let i = 0; i < curKeys.length; i++) {
    g1533(curKeys[i]);
    i1532(newKeys[i], json[i]);
} }
function m1557(key) { g1533(key); }
function q1558() { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => u1046(k)); connKeys.forEach(k => g1533(k)); }
function o1559(nodeId) { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => u1046(k)); for (const key of connKeys) {
    const parts = key.split(' ');
    if (parts[4] == nodeId)
        g1533(key);
} }
function x1560(nodeId) { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => u1046(k)); for (const key of connKeys) {
    const parts = key.split(' ');
    if (parts[1] == nodeId)
        g1533(key);
} }
function k1561() { const r1565 = figma.getLocalPaintStyles(); for (const style of r1565) {
    style.setPluginData('type', '');
    style.setPluginData('nodeId', '');
    style.setPluginData('existing', '');
} }
var b2726 = null;
var j4024 = () => b2726 = null;
var d2727 = 'normal';
function u1577(clientPosition) { p1511({ cmd: 'uiReturnFigGetMousePosition', position: { x: 0, y: 0 }, clientPosition: clientPosition, viewportZoom: figma.viewport.zoom, viewportRect: figma.viewport.bounds }); }
function m1578(x, y, width, height) { return; (function () {
    return __awaiter(this, void 0, void 0, function* () { const rect = { x: Math.round(x), y: Math.round(y), width: Math.floor(Math.max(0, width)), height: Math.floor(Math.max(0, height)) }; figma.ui.reposition(rect.x, rect.y); figma.ui.resize(rect.width, rect.height); figma.clientStorage.setAsync('windowX', rect.x); figma.clientStorage.setAsync('windowY', rect.y); figma.clientStorage.setAsync('windowWidth', rect.width); figma.clientStorage.setAsync('windowHeight', rect.height); p1511({ cmd: 'uiReturnFigSetWindowRect' }); });
})(); }
function t1579(dock, rect, bounds) { switch (dock) {
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
function k1580(width, height) { (function () {
    return __awaiter(this, void 0, void 0, function* () { width = Math.floor(Math.max(0, width)); height = Math.floor(Math.max(0, height)); figma.ui.resize(width, height); figma.currentPage.setPluginData(figma.currentUser.id + ',windowWidth', width.toString()); figma.currentPage.setPluginData(figma.currentUser.id + ',windowHeight', height.toString()); p1511({ cmd: 'uiReturnFigResizeWindow', width: width, height: height }); });
})(); }
function y2728(dock) {
    return __awaiter(this, void 0, void 0, function* () { if (dock != 'normal' && d2727 == 'normal') {
        figma.clientStorage.setAsync('normalWindowX', yield figma.clientStorage.getAsync('normalWindowX'));
        figma.clientStorage.setAsync('normalWindowY', yield figma.clientStorage.getAsync('normalWindowY'));
        figma.clientStorage.setAsync('normalWindowWidth', yield figma.clientStorage.getAsync('normalWindowWidth'));
        figma.clientStorage.setAsync('normalWindowHeight', yield figma.clientStorage.getAsync('normalWindowHeight'));
    } d2727 = dock; figma.clientStorage.setAsync('windowDock', dock); k1580(yield figma.clientStorage.getAsync('windowWidth'), yield figma.clientStorage.getAsync('windowHeight')); });
}
function w1581(msg) { w1582(msg.text, msg.prefix, msg.delay, msg.error, msg.c1583, msg.k1584); }
function w1582(text, prefix = 'Generator ', delay = 400, error = false, c1583 = '', k1584 = NULL) { const options = { timeout: delay, error: error, onDequeue: j4024 }; if (c1583 != '') {
    options['button'] = { text: c1583 };
    if (k1584.substring(0, 'removeConnection'.length) == 'removeConnection') {
        options['button']['action'] = () => m1557(k1584.split(',')[1]);
    }
    else {
        switch (k1584) {
            case 'hideClearUndoWarning':
                options['button']['action'] = () => p1511({ cmd: 'uiHideClearUndoWarning' });
                break;
        }
    }
} if (b2726)
    b2726.cancel(); b2726 = figma.notify(prefix + text, options); }
function j2729(key, params = null) {
    return __awaiter(this, void 0, void 0, function* () { return yield d2730(key, params); });
}
function d2730(key, params = null) {
    return __awaiter(this, void 0, void 0, function* () { return new Promise((resolve, reject) => { const timeout = 60000; p1511(Object.assign({ cmd: 'uiGetValueForFigma', key: key }, (params || {}))); const s2731 = setTimeout(() => reject(new Error('Timeout: Result not received by Figma within the specified time')), timeout); function s4025(msg) { msg = JSON.parse(msg); if (msg.cmd === 'returnUiGetValueForFigma') {
        clearTimeout(s2731);
        resolve({ key: msg.key, value: msg.value });
        figma.ui.off('message', s4025);
    } } figma.ui.on('message', s4025); }); });
}
var c2732 = [];
var t2733 = [];
var j2734 = 0;
var d2735 = 0;
function b1512(d111) { return (d111[u1374] === 2 ? '' : e863) + (i2789 ? d111[r1368] : d111[q1370]); }
function b1513(c1497, addObject = null) { if (!z1515(c1497))
    return null; let y1498; switch (c1497[u1366]) {
    case k1210:
        y1498 = k2703(c1497);
        break;
    case v1213:
        y1498 = y2782(c1497);
        break;
    case p1216:
        y1498 = p2778(c1497);
        break;
    case w1222:
        y1498 = v2699(c1497);
        break;
    case d1225:
        y1498 = z2706(c1497);
        break;
    case g1228:
        y1498 = t2709(c1497);
        break;
    case c1231:
        y1498 = t2685(c1497);
        break;
    case z1235:
        y1498 = u2737(c1497);
        break;
    case c1247:
        y1498 = h2738(c1497);
        break;
    case w1269:
        y1498 = e2739(c1497);
        break;
    case k1250:
        y1498 = t2740(c1497);
        break;
    case b1253:
        y1498 = h2741(c1497);
        break;
} if (addObject && y1498 != undefined && y1498 != null && !y1498.removed) {
    y1498.name = b1512(c1497);
    p945(c1497[u1366] == k1250 || !!y1498, 'no Figma object created');
    if (y1498 != undefined && y1498 != null) {
        y1498.setPluginData('retain', c1497[u1374].toString());
        if (c1497[u1374] < 2) {
            y1498.setPluginData('userId', figma.currentUser.id);
            y1498.setPluginData('sessionId', figma.currentUser.sessionId.toString());
            y1498.setPluginData('type', c1497[u1366]);
            y1498.setPluginData('nodeId', c1497[f1367]);
            y1498.setPluginData('objectId', c1497[r1368]);
            y1498.setPluginData('isCenter', q930(c1497[e1389]));
            if (c1497[u1366] == c1231)
                a2755.push(y1498);
            if (c1497[g1388])
                b1528(y1498);
        }
        addObject(y1498);
    }
} if (!c1497.counted) {
    d2735++;
    c1497.counted = true;
} return y1498; }
function t1514(y1498, c1497) { if (!z1515(c1497) || y1498 == undefined || y1498 == null || y1498.removed)
    return; y1498.name = b1512(c1497); y1498.setPluginData('retain', c1497[u1374].toString()); switch (c1497[u1366]) {
    case k1210:
        k2704(y1498, c1497);
        break;
    case v1213:
        e2783(y1498, c1497);
        break;
    case p1216:
        m2779(y1498, c1497);
        break;
    case w1222:
        l2700(y1498, c1497);
        break;
    case d1225:
        j2707(y1498, c1497);
        break;
    case g1228:
        o2710(y1498, c1497);
        break;
    case c1231:
        t2742(y1498, c1497);
        break;
    case z1235:
        r2743(y1498, c1497);
        break;
    case c1247:
        n2744(y1498, c1497);
        break;
    case w1269:
        b2745(y1498, c1497);
        break;
    case k1250:
        z2746(y1498, c1497);
        break;
    case b1253:
        g2747(y1498, c1497);
        break;
} if (y1498 != undefined && y1498 != null && !y1498.removed) {
    y1498.parent.appendChild(y1498);
    if (c1497[g1388])
        b1528(y1498);
} if (!c1497.counted) {
    d2735++;
    c1497.counted = true;
} }
function b2722(f2748, u2749, x2750, o2029 = -1, nodeIds = [], t2751 = false, w2752 = false, r270 = false) {
    return __awaiter(this, void 0, void 0, function* () { let m2753 = NULL; let j2754 = null; let abort = false; const n3632 = []; let u2736 = 0; c2732.push(...nodeIds); if (o2029 > -1)
        j2734 = o2029; for (const c1497 of u2749) {
        t2733.push(c1497);
        if (c1497[f1367] != m2753) {
            m2753 = c1497[f1367];
            j2754 = h2719.find(a => a.nodeId == c1497[f1367]);
            if (!j2754) {
                h2719.push(j2754 = { nodeId: c1497[f1367], objects: [] });
            }
        }
        const addObject = y1498 => { if (f2748 != undefined && f2748 != null && !f2748.removed)
            f2748.appendChild(y1498);
        else
            j2754.objects.push(y1498); };
        let objects = f2748 != undefined && f2748 != null && !f2748.removed ? f2748.children : j2754.objects;
        let y1498 = objects.find(o => o.removed || o.getPluginData('userId') == figma.currentUser.id && o.getPluginData('objectId') == c1497[r1368]);
        if (y1498 != undefined && y1498 != null && y1498.removed) {
            a931(objects, y1498);
            if (a2755.includes(y1498))
                a936(a2755, y1498);
            if (z2771.includes(y1498))
                a936(z2771, y1498);
        }
        if (y1498 == undefined || y1498 == null || y1498.removed) {
            const newObj = b1513(c1497, addObject);
            n3632.push(newObj);
        }
        else if (y1498 != undefined && y1498 != null && !y1498.removed && y1498.getPluginData('type') == c1497[u1366].toString()) {
            t1514(y1498, c1497);
            if (y1498 != undefined && y1498 != null && !y1498.removed)
                n3632.push(y1498);
        }
        else {
            y1498.remove();
            if (a2755.includes(y1498))
                a936(a2755, y1498);
            if (z2771.includes(y1498))
                a936(z2771, y1498);
            b1513(c1497, addObject);
        }
        u2736++;
        if (u2736 >= x2750) {
            const result = yield j2729('returnObjectUpdate', { j2734: j2734, d2735: d2735 });
            abort = result.value;
            u2736 = 0;
            if (abort)
                break;
        }
    } if (f2748 != undefined && f2748 != null && !f2748.removed) {
        for (const y1498 of f2748.children) {
            if (y1498 != undefined && y1498 != null && y1498.removed || !u2749.find(o => o[r1368] == y1498.getPluginData('objectId') && y1498.getPluginData('userId') == figma.currentUser.id))
                y1498.remove();
        }
    } for (const point of a2755) {
        if (point != undefined && point != null && !point.removed && !point.parent.removed)
            point.parent.appendChild(point);
    } if (w2752 && !abort) {
        y1494(c2732, t2733);
        c2732 = [];
        t2733 = [];
        if (r270 && n3632.length > 0) {
            figma.viewport.scrollAndZoomIntoView(n3632);
            const bounds = y1518(n3632);
            figma.viewport.zoom = Math.min(figma.viewport.bounds.width * figma.viewport.zoom / bounds.width - 0.05, figma.viewport.bounds.height * figma.viewport.zoom / bounds.height - 0.05);
        }
    } yield j2729('returnObjectUpdate', { j2734: j2734, d2735: d2735 }); });
}
function z1515(c1497) { switch (c1497[u1366]) {
    case k1210: return d2702(c1497);
    case v1213: return q2764(c1497);
    case p1216: return w2765(c1497);
    case w1222: return a4021(c1497);
    case d1225: return q2705(c1497);
    case g1228: return x2708(c1497);
    case c1231: return h4020(c1497);
    case z1235: return y2766(c1497);
    case c1247: return p2767(c1497);
    case w1269: return i2768(c1497);
    case k1250: return x2769(c1497);
    case b1253: return j2770(c1497);
} }
function a1516(c1497) { (() => __awaiter(this, void 0, void 0, function* () { const y1498 = b1513(c1497); const width = y1498.width; const height = y1498.height; y1498.remove(); p1511({ cmd: 'uiForwardToGenerator', msg: { cmd: 'returnFigGetObjectSize', objectId: c1497[r1368], width: width, height: height } }); }))(); }
function z1517(y1498) { y1498.setPluginData('type', ''); y1498.setPluginData('nodeId', ''); y1498.setPluginData('userId', ''); y1498.setPluginData('sessionId', ''); y1498.setPluginData('objectId', ''); y1498.setPluginData('isCenter', ''); y1498.setPluginData('retain', ''); }
function y1518(objects) { const bounds = { left: 0, top: 0, right: 0, bottom: 0 }; for (const d111 of objects) {
    if (d111.x < bounds.left || bounds.left == bounds.right)
        bounds.left = d111.x;
    if (d111.y < bounds.top || bounds.top == bounds.bottom)
        bounds.top = d111.y;
    if (d111.x + d111.width > bounds.right || bounds.left == bounds.right)
        bounds.right = d111.x + d111.width;
    if (d111.y + d111.height > bounds.bottom || bounds.top == bounds.bottom)
        bounds.bottom = d111.y + d111.height;
} return { x: bounds.left, y: bounds.top, width: bounds.right - bounds.left, height: bounds.bottom - bounds.top }; }
const z2771 = [];
const o2772 = [];
function d1519(e1520, y1521) { const effects = []; for (const effect of e1520) {
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
                if (y1521 && !isNaN(spread))
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
function y2692(y1498, c1497, phantom = true) { h1524(y1498, c1497); g2693(y1498, c1497, phantom); y2694(y1498, c1497); y1498.opacity = c1497[x1390]; y1498.blendMode = c1497[w1391]; const maskType = c1497[t1392]; y1498.isMask = maskType > 0; if (y1498.isMask) {
    switch (maskType) {
        case 1:
            y1498.maskType = 'ALPHA';
            break;
        case 2:
            y1498.maskType = 'VECTOR';
            break;
        case 3:
            y1498.maskType = 'LUMINANCE';
            break;
    }
} if (y1498.isMask && y1498.fills.length == 0 && y1498.strokes.length == 0)
    y1498.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 }, opacity: 1, blendMode: 'NORMAL' }]; }
function y2694(y1498, c1497) { if (!!c1497[z1379] && !isEmpty(c1497[z1379])) {
    y1498.fills = j949(c1497[z1379]);
    if (z2771.includes(y1498))
        a936(z2771, y1498);
}
else
    y1498.fills = []; }
function g2693(y1498, c1497, phantom = true) { if (c1497[t1380] != null && !isEmpty(c1497[t1380])) {
    k1523(y1498, j949(c1497[t1380]), c1497[s1381], c1497[v1382], c1497[x1383], c1497[c1384], c1497[f1385], r2695(c1497[n1386]));
    if (c1497[g1388])
        y1498.setPluginData('dashes', c1497[n1386]);
    if (z2771.includes(y1498))
        a936(z2771, y1498);
    if (c1497[g1388])
        e942(o2772, y1498);
}
else if (isEmpty(c1497[z1379]) && isEmpty(c1497[t1380]) && !c1497[t1392] && phantom) {
    f1526(y1498);
    e942(z2771, y1498);
}
else
    y1498.strokes = []; }
function r2695(i1522) { i1522 = i1522; i1522 = s947(i1522, ','); i1522 = q948(i1522, ','); i1522 = i1522.trim(); return i1522 == '' ? [] : i1522.split(',').map(s => Math.max(0, parseFloat(s))); }
function p2696(i1522) { i1522 = i1522; i1522 = s947(i1522, ','); i1522 = q948(i1522, ','); i1522 = i1522.trim(); return i1522 == '' ? [] : i1522.split(',').map(s => Math.max(0, parseFloat(s) / u2698)); }
function k1523(y1498, fills, weight, align, join, miterLimit, cap, dashes = []) { y1498.strokes = fills; y1498.strokeWeight = Math.max(0, weight); y1498.strokeAlign = align; y1498.strokeJoin = join; const miterAngle = miterLimit / 360 * Tau; const n2773 = 1 / Math.sin(miterAngle / 2); y1498.strokeMiterLimit = Math.min(Math.max(0, n2773), 16); y1498.strokeCap = cap; y1498.dashPattern = dashes; }
function h1524(y1498, c1497) { if (!!c1497[p1387] && !isEmpty(c1497[p1387])) {
    const y1521 = c1497[u1366] == k1210 || c1497[u1366] == p1216 || c1497[u1366] == b1253;
    y1498.effects = d1519(c1497[p1387], y1521);
}
else
    y1498.effects = []; }
function w1525() { for (const d111 of z2771) {
    if (d111.removed)
        a936(z2771, d111);
    else
        f1526(d111);
} }
function f1526(d111) { const back = figma.currentPage.backgrounds.find(b => b.type == 'SOLID'); let phantomColor; if (back) {
    const l = back.color.r * 0.2126 + back.color.g * 0.7152 + back.color.b * 0.0722;
    phantomColor = l > 0.5 ? { r: 0, g: 0, b: 0 } : { r: 1, g: 1, b: 1 };
}
else
    phantomColor = { r: 1, g: 0, b: 1 }; k1523(d111, [{ type: 'SOLID', color: phantomColor, opacity: 0.5 }], 1 / u2698, 'CENTER', 'MITER', 1, 'NONE', [1 / u2698, 2 / u2698]); }
function x1527() { for (const y1498 of o2772) {
    if (y1498.removed)
        a936(o2772, y1498);
    else
        b1528(y1498);
} }
function b1528(y1498) { y1498.strokeWeight = Math.max(0, 1 / u2698); if (i916(y1498.getPluginData('isCenter'))) {
    const path = y1498.vectorPaths[0];
    const parts = path.data.split(' ');
    let t = { x: parseFloat(parts[1]), y: parseFloat(parts[2]) };
    let c = { x: parseFloat(parts[4]), y: parseFloat(parts[5]) };
    let r = { x: parseFloat(parts[7]), y: parseFloat(parts[8]) };
    const a = 2;
    const b = 0.05;
    const f = 1 - Math.pow(1 - Math.min(u2698, 1), a) / Math.pow(a, b);
    t = b888(c, o890(c875(b893(t, c)), 10 / f));
    r = b888(c, o890(c875(b893(r, c)), 10 / f));
    parts[1] = t.x;
    parts[2] = t.y;
    parts[4] = c.x;
    parts[5] = c.y;
    parts[7] = r.x;
    parts[8] = r.y;
    const o2774 = { windingRule: path.windingRule, data: parts.join(' ') };
    y1498.vectorPaths = [o2774];
} const dashes = y1498.getPluginData('dashes'); if (dashes != '')
    y1498.dashPattern = p2696(dashes); }
function p1562(nodeId, px, py) { const _styles = figma.getLocalPaintStyles(); const styles = new Array(); for (const t168 of _styles) {
    const _nodeId = t168.getPluginData('nodeId');
    const _existing = t168.getPluginData('existing');
    const existing = !!_existing;
    const style = { id: t168.id, nodeId: _nodeId, name: t168.name, existing: existing, paints: new Array() };
    let onlyPaint = true;
    for (const s2776 of t168.paints) {
        if (s2776.type == 'SOLID') {
            style.paints.push([s2776.color.r, s2776.color.g, s2776.color.b, s2776.opacity]);
        }
        else {
            onlyPaint = false;
            break;
        }
    }
    if (onlyPaint)
        styles.push(style);
} p1511({ cmd: 'uiReturnFigGetAllLocalColorStyles', nodeId: nodeId, px: px, py: py, styles: JSON.stringify(styles) }); }
function q1563(nodeId, styleId) { const r1565 = figma.getLocalPaintStyles(); if (styleId != NULL)
    w1564(r1565, nodeId, styleId);
else
    h1566(r1565, nodeId); }
function w1564(r1565, nodeId, styleId, clearExisting = true) { const e2775 = l2721.find(a => a.nodeId == nodeId); if (e2775 && clearExisting)
    h1566(r1565, nodeId); const m1570 = r1565.find(s => s.id == styleId); p945(!!m1570, 'figStyle should be found here'); m1570.setPluginData('type', g1207); m1570.setPluginData('nodeId', nodeId); m1570.setPluginData('existing', q930(true)); l2721.push({ nodeId: nodeId, existing: true, styles: [m1570] }); return m1570; }
function h1566(r1565, nodeId) { const m1570 = r1565.find(s => s.getPluginData('nodeId') == nodeId); p945(!!m1570, 'figStyle should be found here'); if (m1570) {
    m1570.setPluginData('type', NULL);
    m1570.setPluginData('nodeId', NULL);
    m1570.setPluginData('existing', NULL);
    s938(l2721, a => a.nodeId == nodeId);
} return m1570; }
function u1567(styles, j1571) { const m1570 = figma.createPaintStyle(); m1570.setPluginData('type', j1571[u1366]); m1570.setPluginData('nodeId', j1571[f1367]); m1570.name = j1571[d1371]; setStylePaints(m1570, j1571); styles.push(m1570); p1511({ cmd: 'uiSetStyleId', nodeId: j1571[f1367], styleId: m1570.id }); return m1570; }
function u1568(msg) { let m2753 = NULL; let e2775; for (const j1571 of msg.styles) {
    if (j1571[f1367] != m2753) {
        m2753 = j1571[f1367];
        e2775 = l2721.find(a => a.nodeId == j1571[f1367]);
        if (!e2775) {
            e2775 = { nodeId: j1571[f1367], styles: [] };
            l2721.push(e2775);
        }
    }
    else
        e2775 = null;
    const m1570 = e2775.styles[0];
    const r1565 = figma.getLocalPaintStyles();
    const localStyle = r1565.find(s => s.getPluginData('nodeId') == j1571[f1367]);
    if (isValid(m1570) && !isValid(localStyle)) {
        a931(e2775.styles, m1570);
    }
    const existing = isValid(m1570) && isValid(localStyle) && m1570.getPluginData('existing');
    if (!isValid(m1570) || !isValid(localStyle)) {
        if (!existing) {
            c1501 = true;
            q1563(j1571[f1367], j1571[r1369]);
        }
    }
    else if (isValid(m1570) && m1570.getPluginData('type') == j1571[u1366]) {
        c1501 = true;
        y1569(localStyle, j1571);
    }
} }
function y1569(m1570, j1571) { setStylePaints(m1570, j1571); m1570.name = j1571[d1371]; }
function getStylePaints(stylePaints) { const paints = new Array(); for (const s2776 of stylePaints) {
    const fill = s2776[1].split(' ');
    switch (s2776[0]) {
        case 'SOLID':
            paints.push({ type: 'SOLID', color: { r: Math.min(Math.max(0, parseFloat(fill[0]) / 0xff), 1), g: Math.min(Math.max(0, parseFloat(fill[1]) / 0xff), 1), b: Math.min(Math.max(0, parseFloat(fill[2]) / 0xff), 1) }, opacity: Math.min(Math.max(0, parseFloat(fill[3]) / 100), 1) });
            break;
    }
} return paints; }
function setStylePaints(m1570, j1571) { if (!isEmpty(j1571[f1373]))
    m1570.paints = getStylePaints(j1571[f1373]);
else
    m1570.paints = []; }
function b1585(nodeId, px, py) { const k2777 = figma.variables.getLocalVariables(); const variables = new Array(); for (const _var of k2777) {
    const variable = { id: _var.id, resolvedType: _var.resolvedType, name: _var.name, collectionName: figma.variables.getVariableCollectionById(_var.variableCollectionId).name };
    variables.push(variable);
} p1511({ cmd: 'uiReturnFigGetAllLocalVariables', nodeId: nodeId, px: px, py: py, variables: JSON.stringify(variables), nCollections: figma.variables.getLocalVariableCollections().length }); }
function z1586(varIds) { const k2777 = figma.variables.getLocalVariables(); const variables = varIds.map(id => k2777.find(v => v.id == id)); let values = []; for (let i = 0; i < varIds.length; i++) {
    const variable = variables[i];
    const collection = variable != undefined ? figma.variables.getVariableCollectionById(variable.variableCollectionId) : null;
    if (collection) {
        const vals = [];
        for (const mode of collection.modes) {
            let _var = variable;
            let value = _var.valuesByMode[mode.modeId];
            while (value && value.type === 'VARIABLE_ALIAS') {
                _var = figma.variables.getVariableById(value.id);
                value = _var.valuesByMode[mode.modeId];
            }
            vals.push(value);
        }
        values.push({ id: varIds[i], name: variable.name, resolvedType: variable.resolvedType, value: vals[0] });
    }
    else {
        values.push({ id: varIds[i], resolvedType: NULL, value: null });
    }
} return values; }
function n1587(nodeId, varId) { const k2777 = figma.variables.getLocalVariables(); e1589(k2777, nodeId, varId); }
function l1588(varId, value) { const k2777 = figma.variables.getLocalVariables(); let variable = k2777.find(v => v.id == varId); if (!variable)
    return; let collection = figma.variables.getVariableCollectionById(variable.variableCollectionId); let mode = collection.modes[0]; let curValue = variable.valuesByMode[mode.modeId]; while (curValue && curValue.hasOwnProperty('type') && curValue['type'] === 'VARIABLE_ALIAS') {
    variable = figma.variables.getVariableById(curValue['id']);
    curValue = variable.valuesByMode[mode.modeId];
    collection = figma.variables.getVariableCollectionById(variable.variableCollectionId);
    mode = collection.modes[0];
} if (value !== null) {
    if (variable.resolvedType == 'BOOLEAN')
        value = value != 0;
    else
        variable.setValueForMode(mode.modeId, value);
} }
function e1589(k2777, nodeId, varId) { let variable = k2777.find(v => v.id == varId); if (!variable)
    return null; const [resolvedVar, values] = figGetResolvedVariableValues(variable); p1511({ cmd: 'uiReturnFigLinkNodeToVariable', nodeId: nodeId, variableId: resolvedVar ? resolvedVar.id : NULL, variableName: resolvedVar ? resolvedVar.name : '', resolvedType: resolvedVar ? resolvedVar.resolvedType : NULL, values: values }); return resolvedVar; }
function figGetResolvedVariableValues(variable) { const values = []; if (!variable)
    return values; const collection = figma.variables.getVariableCollectionById(variable.variableCollectionId); for (const mode of collection.modes) {
    let value = variable.valuesByMode[mode.modeId];
    while (value && value['type'] === 'VARIABLE_ALIAS') {
        variable = figma.variables.getVariableById(value.id);
        value = variable.valuesByMode[mode.modeId];
    }
    values.push(value);
} return [variable, values]; }
function d1572(tl, tr, bl) { let vr = point(tr.x - tl.x, tr.y - tl.y); let vb = point(bl.x - tl.x, bl.y - tl.y); let sx = vr.x; let sy = vb.y; let kx = -vr.y; let ky = -vb.x; let dx = -tl.x; let dy = -tl.y; const _sx = kx / nozero(sx); const _sy = ky / nozero(sy); let g4202 = x878([[1, _sy, 0], [_sx, 1, 0], [0, 0, 1]], p882(dx, dy)); g4202 = i880(g4202); const a = angle(vr); if (a > Tau / 4 && a < Tau * 3 / 4)
    g4202 = x878(g4202, p882(0, 0, 1, 1, Tau / 2)); if (determinant(g4202) < 0)
    g4202 = x878(g4202, p882(0, 0, -1, 1, 0)); return g4202; }
function d1573(y1498, tl, tr, bl) { const g4202 = d1572(tl, tr, bl); y1498.relativeTransform = [g4202[0], g4202[1]]; }
function t1574(y1498, c1497, setSize = true, noHeight = 0.01) { if (!c1497[w1375] || !c1497[p1376] || !c1497[t1377])
    return; const xp0 = c1497[w1375]; const xp1 = c1497[p1376]; const xp2 = c1497[t1377]; d1573(y1498, xp0, xp1, xp2); if (setSize) {
    const s883 = distance(xp0, xp1);
    const b884 = distance(xp0, xp2);
    const height = c1497[u1366] == g1228 ? c1497[y1410] : c1497[x1397];
    if (!y1498.removed) {
        y1498.resizeWithoutConstraints(Math.max(0.01, s883), height ? Math.max(0.01, b884) : noHeight);
    }
} }
function s1575(d2690, j2691) { if (d2690.removed)
    return; d2690.resizeWithoutConstraints(0.01, 0.01); d2690.setPluginData('actualX', j2691[r1393].toString()); d2690.setPluginData('actualY', j2691[c1395].toString()); d2690.x = j2691[r1393]; d2690.y = j2691[c1395]; d2690.rotation = j2691[e1389] ? 45 : 0; }
function q1576(d2690) { if (!d2690.removed)
    d2690.resizeWithoutConstraints(0.01, 0.01); }
function i2768(genBool) { return genBool.children.length > 0; }
function e2739(genBool) { let objects = []; for (const d111 of genBool.children)
    b1513(d111, o => objects = [...objects, o]); let figBool = null; if (!isEmpty(objects)) {
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
    t1574(figBool, genBool);
    if (!i2768(genBool))
        return figBool;
} return figBool; }
function b2745(figBool, genBool, isValid = false) { if (!isValid && !i2768(genBool)) {
    figBool.remove();
    return;
} t1574(figBool, genBool); b2722(figBool, genBool.children, genBool.children.length); }
function w2765(h2756) { return h2756[r1393] != null && !isNaN(h2756[r1393]) && h2756[c1395] != null && !isNaN(h2756[c1395]) && h2756[e1396] != null && !isNaN(h2756[e1396]) && h2756[x1397] != null && !isNaN(h2756[x1397]) && h2756[z1399] != null && !isNaN(h2756[z1399]) && h2756[k1406] != null && !isNaN(h2756[k1406]) && h2756[a1412] != null && !isNaN(h2756[a1412]) && h2756[j1416] != null && !isNaN(h2756[j1416]); }
function p2778(h2756) { if (!w2765(h2756))
    return null; const a2757 = figma.createEllipse(); m2779(a2757, h2756, true); return a2757; }
function m2779(a2757, h2756, isValid = false) { if (!isValid && !w2765(h2756))
    return; c2780(a2757, h2756); if (a2755.includes(a2757))
    q2687(a2757);
else
    y2692(a2757, h2756); }
function c2780(a2757, h2756) { a2757.cornerRadius = h2756[z1399]; const start = h2756[k1406] / 360 * (Math.PI * 2); const sweep = h2756[a1412] / 100 * (Math.PI * 2); a2757.arcData = { startingAngle: start, endingAngle: start + sweep, innerRadius: Math.min(Math.max(0, h2756[j1416] / 100), 1) }; t1574(a2757, h2756); }
function j2770(v2758) { return v2758[r1393] != null && !isNaN(v2758[r1393]) && v2758[c1395] != null && !isNaN(v2758[c1395]) && v2758[e1396] != null && !isNaN(v2758[e1396]) && v2758[x1397] != null && !isNaN(v2758[x1397]) && v2758[u1405] != null && !isNaN(v2758[u1405]); }
function h2741(v2758) { if (!j2770(v2758))
    return null; const h2759 = figma.createFrame(); if (h2759) {
    v2781(h2759, v2758);
    let objects = [];
    for (const d111 of v2758[j1411])
        b1513(d111, o => objects = [...objects, o]);
    for (const d111 of objects)
        h2759.appendChild(d111);
} return h2759; }
function g2747(h2759, v2758) { v2781(h2759, v2758); b2722(h2759, v2758[j1411], v2758[j1411].length); }
function v2781(h2759, v2758) { h2759.cornerRadius = v2758[u1405]; t1574(h2759, v2758); y2692(h2759, v2758, v2758[j1411].length == 0); }
function x2769(o2760) { return true; }
function t2740(o2760) { let objects = []; for (const d111 of o2760[c1394])
    b1513(d111, o => objects = [...objects, o]); const w2761 = !isEmpty(objects) ? figma.group(objects, figma.currentPage) : null; if (w2761)
    z2746(w2761, o2760); return w2761; }
function z2746(w2761, o2760) { if (o2760[c1394].length == 0) {
    w2761.remove();
    return;
} b2722(w2761, o2760[c1394], o2760[c1394].length); h1524(w2761, o2760); }
function q2764(l2762) { return l2762[r1393] != null && !isNaN(l2762[r1393]) && l2762[c1395] != null && !isNaN(l2762[c1395]) && l2762[e1396] != null && !isNaN(l2762[e1396]); }
function y2782(l2762) { if (!q2764(l2762))
    return null; const n2763 = figma.createLine(); e2783(n2763, l2762, true); return n2763; }
function e2783(n2763, l2762, isValid = false) { if (!isValid && !q2764(l2762))
    return; t1574(n2763, l2762, true, 0); y2692(n2763, l2762); }
var a2755 = [];
function h4020(j2691) { return j2691[r1393] != null && !isNaN(j2691[r1393]) && j2691[c1395] != null && !isNaN(j2691[c1395]); }
function t2685(j2691) { const d2690 = j2691[e1389] ? figma.createRectangle() : figma.createEllipse(); if (!h4020(j2691))
    return d2690; if (a2755.includes(d2690))
    b2689(d2690, j2691);
else
    t2742(d2690, j2691); return d2690; }
function t2742(d2690, j2691) { s1575(d2690, j2691); l2688(d2690); }
function r2686() { p1511({ cmd: 'uiUpdateZoom', zoom: figma.viewport.zoom }); for (const point of a2755)
    q2687(point); }
function q2687(d2690) { q1576(d2690); l2688(d2690); }
function b2689(d2690, j2691) { s1575(d2690, j2691); l2688(d2690); }
function l2688(d2690) { if (d2690.removed)
    return; const a3731 = i916(d2690.getPluginData('isCenter')); const n2697 = figma.currentPage.selection.includes(d2690); const color = a3731 ? [0xf2, 0x48, 0x22] : n2697 ? [12, 140, 233] : [255, 255, 255]; const border = a3731 ? [255, 255, 255] : n2697 ? [255, 255, 255] : [12, 140, 233]; d2690.fills = j949([['SOLID', color[0], color[1], color[2], 100]]); const effects = []; effects.push(...d1519([['DROP_SHADOW', border[0] / 255, border[1] / 255, border[2] / 255, 1, 0, 0, 0, (a3731 ? 3 : n2697 ? 5 : 3.6) / u2698, 'NORMAL', true, true]], true)); effects.push(...d1519([['DROP_SHADOW', color[0] / 255, color[1] / 255, color[2] / 255, 1, 0, 0, 0, (n2697 ? 4 : 2.4) / u2698, 'NORMAL', true, true]], true)); d2690.effects = effects; }
function a4021(genPoly) { return genPoly[r1393] != null && !isNaN(genPoly[r1393]) && genPoly[c1395] != null && !isNaN(genPoly[c1395]) && genPoly[e1396] != null && !isNaN(genPoly[e1396]) && genPoly[x1397] != null && !isNaN(genPoly[x1397]) && genPoly[w1402] != null && !isNaN(genPoly[w1402]) && genPoly[p1408] != null && !isNaN(genPoly[p1408]); }
function v2699(genPoly) { if (!a4021(genPoly))
    return null; const figPoly = figma.createPolygon(); l2700(figPoly, genPoly, true); return figPoly; }
function l2700(figPoly, genPoly, isValid = false) { if (!isValid && !a4021(genPoly))
    return; figPoly.cornerRadius = genPoly[w1402]; figPoly.pointCount = Math.max(3, genPoly[p1408]); t1574(figPoly, genPoly); y2692(figPoly, genPoly); }
function d2702(j2701) { return j2701[r1393] != null && !isNaN(j2701[r1393]) && j2701[c1395] != null && !isNaN(j2701[c1395]) && j2701[e1396] != null && !isNaN(j2701[e1396]) && j2701[x1397] != null && !isNaN(j2701[x1397]) && j2701[y1398] != null && !isNaN(j2701[y1398]); }
function k2703(j2701) { if (!d2702(j2701))
    return null; const figRect = figma.createRectangle(); k2704(figRect, j2701, true); return figRect; }
function k2704(figRect, j2701, isValid = false) { if (!isValid && !d2702(j2701))
    return; const found = j2701[p1387].findIndex(e => e[0] == 'ROUND_CORNERS'); if (found > -1) {
    const corners = j2701[p1387][found];
    figRect.topLeftRadius = corners[1];
    figRect.topRightRadius = corners[2];
    figRect.bottomLeftRadius = corners[3];
    figRect.bottomRightRadius = corners[4];
}
else
    figRect.cornerRadius = j2701[y1398]; t1574(figRect, j2701); y2692(figRect, j2701); }
function q2705(e2715) { return e2715[r1393] != null && !isNaN(e2715[r1393]) && e2715[c1395] != null && !isNaN(e2715[c1395]) && e2715[e1396] != null && !isNaN(e2715[e1396]) && e2715[x1397] != null && !isNaN(e2715[x1397]) && e2715[c1403] != null && !isNaN(e2715[c1403]) && e2715[n1409] != null && !isNaN(e2715[n1409]) && e2715[j1414] != null && !isNaN(e2715[j1414]); }
function z2706(e2715) { if (!q2705(e2715))
    return null; const u2716 = figma.createStar(); j2707(u2716, e2715, true); return u2716; }
function j2707(u2716, e2715, isValid = false) { if (!isValid && !q2705(e2715))
    return; u2716.cornerRadius = e2715[c1403]; u2716.pointCount = e2715[n1409]; u2716.innerRadius = Math.min(Math.max(0, e2715[j1414] / 100), 1); t1574(u2716, e2715); y2692(u2716, e2715); }
const p4264 = [];
function x2708(j2712) { return j2712[h1415] != null && j2712[r1393] != null && !isNaN(j2712[r1393]) && j2712[c1395] != null && !isNaN(j2712[c1395]) && j2712[e1396] != null && !isNaN(j2712[e1396]) && j2712[x1397] != null && !isNaN(j2712[x1397]) && j2712[d1417] != null && j2712[d1417] != NULL && j2712[h1418] != null && !isNaN(j2712[h1418]); }
function t2709(j2712) { if (!x2708(j2712))
    return null; const m2784 = figma.createText(); o2710(m2784, j2712, true); return m2784; }
function o2710(m2784, j2712, isValid = false) { if (!isValid && !x2708(j2712))
    return null; const fontName = { family: j2712[d1417], style: j2712[s1419] }; try {
    if (!p4264.includes(fontName)) {
        figma.loadFontAsync(fontName).then(() => { p4264.push(fontName); b2711(m2784, j2712, fontName); });
    }
    else {
        b2711(m2784, j2712, fontName);
    }
}
catch (e) {
    a946(e);
} }
function b2711(m2784, j2712, fontName) { m2784.fontName = fontName; m2784.fontSize = Math.max(1, j2712[h1418]); m2784.characters = j2712[h1415]; m2784.lineHeight = { unit: 'PERCENT', value: j2712[z1422] }; m2784.letterSpacing = { unit: 'PERCENT', value: j2712[n1423] }; if (j2712[d1420] == 0)
    m2784.textAlignHorizontal = 'LEFT';
else if (j2712[d1420] == 1)
    m2784.textAlignHorizontal = 'CENTER';
else if (j2712[d1420] == 2)
    m2784.textAlignHorizontal = 'RIGHT';
else if (j2712[d1420] == 3)
    m2784.textAlignHorizontal = 'JUSTIFIED'; if (j2712[f1421] == 0)
    m2784.textAlignVertical = 'TOP';
else if (j2712[f1421] == 1)
    m2784.textAlignVertical = 'CENTER';
else if (j2712[f1421] == 2)
    m2784.textAlignVertical = 'BOTTOM'; t1574(m2784, j2712); y2692(m2784, j2712); if (j2712[l1404] == 0 && j2712[y1410] == 0)
    m2784.textAutoResize = 'WIDTH_AND_HEIGHT';
else if (j2712[l1404] == 0)
    m2784.textAutoResize = 'HEIGHT';
else
    m2784.textAutoResize = 'NONE'; }
function p2767(v2717) { return true; }
function h2738(v2717) { if (!p2767(v2717))
    return null; const r2718 = figma.createVector(); n2744(r2718, v2717, true); return r2718; }
function n2744(r2718, v2717, isValid = false) { if (!isValid && !p2767(v2717))
    return; r2718.vectorNetwork = v2717[g1400]; t1574(r2718, v2717, false); y2692(r2718, v2717); }
function y2766(r2713) { return r2713[i1407] != null && !isNaN(r2713[i1407]) && r2713[u1413] != null && !isNaN(r2713[u1413]); }
function u2737(r2713) { const b2714 = figma.createVector(); r2743(b2714, r2713, true); return b2714; }
function r2743(b2714, r2713, isValid = false) { if (!isValid && !y2766(r2713))
    return; b2714.vectorPaths = [{ windingRule: r2713[i1407] == 1 ? 'NONZERO' : 'EVENODD', data: r2713[v1401] }]; b2714.cornerRadius = r2713[u1413]; t1574(b2714, r2713, false); y2692(b2714, r2713); }
