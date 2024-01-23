var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function h1042(key, tag) { return key.substring(0, tag.length + 1) == tag + ' '; }
function y1043(key, tag) { return key.substring(tag.length + 1); }
function v1044(key) { return h1042(key, v866); }
function e1045(key) { return h1042(key, n864); }
function f1046(key) { return h1042(key, q865); }
function d1047(key) { return y1043(key, v866); }
function e1048(key) { return y1043(key, n864); }
function f1049(key) { return y1043(key, q865); }
const generatorVersion = 341;
const i858 = 2147483647;
const NULL = '';
const r859 = '  ';
const i860 = '    ';
const o861 = '\n';
const h862 = '◦ G •';
const r863 = h862 + ' ';
const n864 = 'G_NODE';
const q865 = 'G_CONN';
const v866 = 'G_PAGE';
const m867 = 'G_TEMP';
const identity = Object.freeze([[1, 0, 0], [0, 1, 0], [0, 0, 1]]);
const Epsilon = 0.0000001;
const Tau = Math.PI * 2;
var h2524 = false;
function c868(x, eps = 0.000000001) { return Math.abs(x) < eps ? 0 : x; }
function nozero(x, eps = 0.000000001) { return x != 0 ? x : (x < 0 ? -eps : eps); }
function i869(v, eps = 0.000000001) { return point(nozero(v.x, eps), nozero(v.y, eps)); }
function equal(a, b, eps = 0.000000001) { return Math.abs(b - a) < eps; }
function sqr(x) { return x * x; }
;
function cube(x) { return x * x * x; }
;
function c870(f) { return Math.floor(f) | 0; }
function b871(x) { x = c870(x); x--; x |= x >> 1; x |= x >> 2; x |= x >> 4; x |= x >> 8; x |= x >> 16; x |= x >> 32; return ++x; }
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
function s872(v1, v2) { return t873(v1.x, v1.y, v2.x, v2.y); }
function t873(x1, y1, x2, y2) { const dx = x2 - x1; const dy = y2 - y1; let angle = Math.atan2(dy, dx); if (angle < 0)
    angle += Tau; return angle; }
function p874(v) { return Math.sqrt(v.x * v.x + v.y * v.y); }
function u875(v) { return point(v.x == 0 ? 0 : v.x / p874(v), v.y == 0 ? 0 : v.y / p874(v)); }
function dot(v1, v2) { return v1.x * v2.x + v1.y * v2.y; }
function l876(a1, a2) { let diff = a2 - a1; while (diff <= -Tau / 2)
    diff += Tau; while (diff > Tau / 2)
    diff -= Tau; return diff; }
function n877(v, m) { let v3 = [v.x, v.y, 1]; let r = t941(v3, m); return point(r[0], r[1]); }
function t878(...mm) { m945(mm.length > 0, 'mulm3m3() must take at least one argument'); let result = clone(mm[0]); for (let a = 1; a < mm.length; a++) {
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
function a879(m, s) { for (let i = 0; i < 3; i++)
    for (let j = 0; j < 3; j++)
        m[i][j] /= s; return m; }
function adjugate(m) { return cofactor(transpose(m)); }
function transpose(m) { return [[m[0][0], m[1][0], m[2][0]], [m[0][1], m[1][1], m[2][1]], [m[0][2], m[1][2], m[2][2]]]; }
function cofactor(m) { return [[m[1][1] * m[2][2] - m[2][1] * m[1][2], -(m[1][0] * m[2][2] - m[2][0] * m[1][2]), m[1][0] * m[2][1] - m[2][0] * m[1][1]], [-(m[0][1] * m[2][2] - m[2][1] * m[0][2]), m[0][0] * m[2][2] - m[2][0] * m[0][2], -(m[0][0] * m[2][1] - m[2][0] * m[0][1])], [m[0][1] * m[1][2] - m[1][1] * m[0][2], -(m[0][0] * m[1][2] - m[1][0] * m[0][2]), m[0][0] * m[1][1] - m[1][0] * m[0][1]]]; }
function determinant(m) { return m[0][0] * (m[1][1] * m[2][2] - m[1][2] * m[2][1]) - m[0][1] * (m[1][0] * m[2][2] - m[2][0] * m[1][2]) + m[0][2] * (m[1][0] * m[2][1] - m[2][0] * m[1][1]); }
function q880(m) { return a879(adjugate(m), determinant(m)); }
function e881(angle) { const cosA = c868(Math.cos(angle)); const sinA = c868(Math.sin(angle)); return [[cosA, sinA, 0], [-sinA, cosA, 0], [0, 0, 1]]; }
function v882(x = 0, y = 0, y883 = 1, t884 = 1, angle = 0, n885 = 0, v886 = 0) { const cosA = Math.cos(angle); const sinA = Math.sin(angle); return [[y883 * cosA - v886 * sinA, -n885 * cosA + t884 * sinA, x], [v886 * cosA + y883 * sinA, t884 * cosA + n885 * sinA, y], [0, 0, 1]]; }
function c887(v1, v2) { return v1.x * v2.y - v1.y * v2.x; }
function x888(v1, v2) { return point(v1.x + v2.x, v1.y + v2.y); }
function g889(v1, v2) { return point(v1.x * v2.x, v1.y * v2.y); }
function u890(v, s) { return point(v.x * s, v.y * s); }
function r891(v1, v2) { return point(v1.x / v2.x, v1.y / v2.y); }
function m892(v, s) { return point(v.x / s, v.y / s); }
function c893(v1, v2) { return point(v1.x - v2.x, v1.y - v2.y); }
function m894(str) { return decodeURI(encodeURIComponent(str)); }
function m895(str) { return decodeURIComponent(encodeURI(str)); }
function a896(bytes) { let str = ''; for (let i = 0; i < bytes.length; i++)
    str += String.fromCharCode(bytes[i]); return str; }
function l897(str) { return Array.from(m895(str), c => c.charCodeAt(0)); }
function r898(array, size) { const newArray = new Uint8Array(size); e899(array, newArray); return newArray; }
function e899(src, dst) { f900(src, 0, src.length, dst, 0, dst.length); }
function f900(src, i901, r902, dst, y903, c904) { const size = Math.min(r902, c904); for (let i = 0; i < size; i++)
    dst[y903 + i] = src[i901 + i]; }
function j905(j906, c907) { if (j906.length != c907.length)
    return false; for (let i = 0; i < j906.length; i++) {
    if (j906[i] != c907[i])
        return false;
} return true; }
function i908(t909, v910) { return t909.findIndex(i => v910.includes(i)) > -1; }
function h911(list) { return list ? '<==' : '<--'; }
;
function x912(list) { return list ? '==>' : '-->'; }
;
function i913(nodeId) { return n864 + ' ' + nodeId; }
function a914(name) { return q865 + ' ' + name; }
function e915(name) { return v866 + ' ' + name; }
function s916(str) { return str.toLowerCase() == 'true' || str == '1'; }
function i917(x918, z919 = false) { return o924(x918.outputNodeId, x918.outputId, x918.outputOrder, x918.inputNodeId, x918.inputId, x918.list, z919); }
function u920(outputNodeId, outputId, outputOrder, inputNodeId, inputId) { return a914(outputNodeId + ' ' + outputId + ' ' + outputOrder + ' ' + inputNodeId + ' ' + inputId); }
function t921(l243) { return u920(l243.outputNodeId, l243.outputId, l243.outputOrder, l243.inputNodeId, l243.inputId); }
function o922(l243) { return u920(l243.output.node.id, l243.output.id, l243.outputOrder, l243.input.node.id, l243.input.id); }
function v923(l243, z919 = false) { return o924(l243.output.node.id, l243.output.id, l243.outputOrder, l243.input.node.id, l243.input.id, l243.list, z919); }
function o924(outputNodeId, outputId, outputOrder, inputNodeId, inputId, list, z919 = false) { const sp = z919 ? ' ' : '  '; const jsp = z919 ? '' : ' '; const arrow = sp + h928(typeof outputOrder == 'string' ? parseInt(outputOrder) : outputOrder) + x912(typeof list == 'string' ? s916(list) : list) + sp; const join = jsp + '.' + jsp; return outputNodeId + join + outputId + arrow + inputNodeId + join + inputId; }
function l925(pageId) { return e915(pageId); }
function o926(num) { const str = num.toString(); let sup = ''; for (const c of str)
    sup += p927(c); return sup; }
function p927(c) { switch (c) {
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
function h928(num) { const str = num.toString(); let sup = ''; for (const c of str)
    sup += c929(c); return sup; }
function c929(c) { switch (c) {
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
function u930(bool) { return bool ? 'true' : 'false'; }
function isValid(val) { return val != undefined && val != null; }
function isEmpty(array) { return array.length == 0; }
function a931(array, item) { w932(array, array.indexOf(item)); }
function w932(array, index) { if (index > -1 && index < array.length)
    array.splice(index, 1); }
function p933(array) { if (isEmpty(array))
    return null; let last = array.at(-1); array.splice(array.length - 1, 1); return last; }
function u934(array) { return array[array.length - 1]; }
function i935(array, from, to) { const item = array[from]; array.splice(from, 1); array.splice(to, 0, item); }
function m936(array, item) { const index = array.indexOf(item); if (index > -1)
    array.splice(index, 1); }
function x937(n2785, array) { for (const item of array) {
    const index = n2785.indexOf(item);
    if (index > -1)
        n2785.splice(index, 1);
} }
function v938(array, where) { const index = array.findIndex(where); if (index > -1)
    array.splice(index, 1); }
function k939(styleId) { return styleId.split(',')[0] + ','; }
function e940(points) { let z4026 = ''; if (points.length < 2)
    return z4026; z4026 += 'M'; z4026 += ' ' + c868(points[0].x); z4026 += ' ' + c868(points[0].y); for (let i = 1; i < points.length; i++) {
    z4026 += ' L' + ' ' + c868(points[i].x) + ' ' + c868(points[i].y);
} return z4026; }
function point(x, y) { return { x: x, y: y }; }
function t941(v, m) { let r = [0, 0, 0]; for (let i = 0; i < 3; i++)
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
        let f111 = {};
        for (const key in val)
            f111[key] = clone(val[key]);
        return f111;
    }
} throw 'unknown'; }
function u942(array, item, equal = null) { if (equal) {
    if (Array.isArray(item))
        item.forEach(i => u942(array, i, equal));
    else if (!array.find(i => equal(i, item)))
        array.push(item);
}
else {
    if (Array.isArray(item))
        item.forEach(i => u942(array, i));
    else if (!array.includes(item))
        array.push(item);
} }
function e943(array, item, equal) { if (Array.isArray(item))
    item.forEach(i => e943(array, i, equal));
else if (!array.find(equal))
    array.push(item); }
function l944(array, item, except) { if (Array.isArray(item))
    item.forEach(i => l944(array, i, except));
else if (!array.find(except))
    array.push(item); }
function m945(...args) { if (h2524) {
    console.assert(...args);
} }
function u946(...args) { if (h2524)
    console.error(...args); }
function e947(str, trim) { while (str.length >= trim.length && str.substring(0, trim.length) == trim)
    str = str.substring(trim.length); return str; }
function b948(str, trim) { while (str.length >= trim.length && str.substring(str.length - trim.length) == trim)
    str = str.substring(0, str.length - trim.length); return str; }
function h949(n4086) { const fills = []; for (const fill of n4086) {
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
            const l4202 = fill[1];
            const stops = [];
            for (const stop of fill[2]) {
                stops.push({ color: { r: Math.min(Math.max(0, stop[0]), 1), g: Math.min(Math.max(0, stop[1]), 1), b: Math.min(Math.max(0, stop[2]), 1), a: Math.min(Math.max(0, stop[3]), 1) }, position: stop[4] });
            }
            fills.push({ type: fill[0], gradientTransform: l4202, gradientStops: stops, blendMode: fill[3] });
            break;
        }
    }
} return fills; }
function t950(type) { return s1083.includes(type); }
const e1050 = 'LIST#';
const b1051 = 'NLIST#';
const q1052 = 'TLIST#';
const i1053 = 'SLIST#';
const i1054 = 'NULL';
const u1055 = 'VAR';
const k1056 = 'VARGRP';
const m1057 = 'START';
const e1058 = 'REPT';
const p1059 = 'CACHE';
const o1060 = 'FRZ';
const v1061 = 'TIMER';
const d1062 = 'VNAME';
const GET_LIST_VALUE_NAMES = 'GVNAMES';
const LIST_VALUE_NAMES = 'VNAMES';
const OBJECT_NAME = 'ONAME';
const n1063 = 'CMB';
const d1064 = 'LSASIT';
const b1065 = 'EXTR';
const f1066 = 'SETP';
const r1067 = 'GETP';
const j1068 = 'SUBLST';
const u1069 = 'UNIQ';
const q1070 = 'REVLST';
const c1071 = 'SORT';
const m1072 = 'CLMN';
const n1073 = 'CELL';
const y1074 = 'LIST';
const x1075 = 'COUNT';
const y1076 = 'LCONT';
const d1077 = 'SELECT';
const SELECT_FROM_LIST = 'LSTSEL';
const i1078 = 'IF';
const a1079 = 'LSTFLT';
const v1080 = 'DEFINE';
const g1081 = 'ANY#';
const e1082 = [e1050, b1051, q1052, i1053, n1063, b1065, f1066, r1067, j1068, y1074, x1075, y1076, e1058];
const s1083 = [e1050, b1051, q1052, i1053];
const e1084 = [i1054, u1055, k1056, ...e1082, d1064, b1065, f1066, r1067, j1068, u1069, q1070, m1072, c1071, n1073, y1074, d1077, SELECT_FROM_LIST, i1078, a1079, m1057, e1058, v1080, p1059, o1060, v1061, d1062, GET_LIST_VALUE_NAMES, LIST_VALUE_NAMES, OBJECT_NAME];
const c1085 = 'NUM#';
const u1086 = 'NUM';
const NUMBER_PRECISION = 'NPREC';
const v1087 = 'NSIGN';
const l1088 = 'ABS';
const e1089 = 'ROUND';
const u1090 = 'SMINMAX';
const h1091 = 'MINMAX';
const z1092 = 'LIM';
const t1093 = 'NCURVE';
const v1094 = 'NANISNUM';
const c1095 = 'CONST';
const h1096 = 'DATE';
const u1097 = 'SEQ';
const v1098 = 'RANGE';
const u1099 = 'WAVE';
const y1100 = 'RAND';
const o1101 = 'NOISE';
const t1102 = 'PROB';
const j1103 = 'ACCUM';
const o1104 = 'LERP';
const c1105 = 'SOLVE';
const p1106 = 'NANIM';
const c1107 = 'SMATH';
const j1108 = 'MATH';
const k1109 = 'ADD';
const w1110 = 'SUB';
const g1111 = 'MUL';
const d1112 = 'DIV';
const e1113 = 'MOD';
const t1114 = 'EXP';
const i1115 = 'NBOOL';
const q1116 = 'NOT';
const l1117 = 'AND';
const i1118 = 'OR';
const b1119 = 'XOR';
const g1120 = 'COND';
const j1121 = 'EQ';
const f1122 = 'NE';
const f1123 = 'LT';
const z1124 = 'LE';
const i1125 = 'GT';
const c1126 = 'GE';
const s1127 = 'TRIG';
const s1128 = 'SIN';
const w1129 = 'COS';
const p1130 = 'TAN';
const e1131 = 'ATAN2';
const i1132 = 'CNVANG';
const o1133 = [j1108, c1107, k1109, w1110, g1111, d1112, e1113, t1114];
const b1134 = [i1115, q1116, l1117, i1118, b1119];
const g1135 = [g1120, j1121, f1122, f1123, z1124, i1125, c1126];
const n1136 = [s1127, s1128, w1129, p1130, e1131];
const v1137 = 'TEXT#';
const d1138 = 'TEXT';
const c1139 = 'TLEN';
const n1140 = 'TTRIM';
const s1141 = 'TSUB';
const l1142 = 'TCONT';
const b1143 = 'TCASE';
const i1144 = 'TREPL';
const o1145 = 'TJOIN';
const e1146 = 'TPAD';
const u1147 = 'TCMP';
const z1148 = 'TCHAR';
const n1149 = 'TUNI';
const m1150 = 'INDEX';
const w1151 = 'N2T';
const l1152 = 'C2T';
const t1153 = 'T2N';
const n1154 = 'T2C';
const o1155 = 'TSPLT';
const x3494 = 'TJSON';
const o1157 = 'TCSV';
const j1158 = 'FETCH';
const g1159 = 'TFILE';
const z1160 = [c1085, b1051, u1086, NUMBER_PRECISION, v1087, l1088, e1089, u1090, h1091, z1092, t1093, v1094, c1095, h1096, u1097, v1098, u1099, y1100, o1101, t1102, j1103, o1104, c1105, p1106, w1151, z1148, ...o1133, ...b1134, ...g1135, ...n1136, i1132];
const w1161 = [v1137, q1052, d1138, c1139, n1140, s1141, l1142, b1143, o1145, e1146, i1144, u1147, n1149, m1150, t1153, n1154, o1155, x3494, o1157, j1158, g1159];
const k1162 = 'COL#';
const n1163 = 'COL';
const v1164 = 'CVAL';
const r1165 = 'CCOR';
const y1166 = 'COLP3';
const o1167 = 'CCNT';
const d1168 = 'BLND';
const n1169 = 'CLERP';
const u1170 = 'CBLND';
const u1171 = [k1162, n1163, r1165, y1166, d1168, n1169, u1170, l1152];
const h1172 = 'FILL#';
const g1173 = 'FILL';
const o1174 = [h1172, g1173];
const o1175 = 'STRK#';
const y1176 = 'STRK';
const e1177 = [o1175, y1176];
const w1178 = 'CSTOP#';
const l1179 = 'CSTOP';
const e1180 = [w1178, l1179];
const h1181 = 'GRAD#';
const s1182 = 'GRAD';
const e1183 = [h1181, s1182];
const k1184 = 'RCRN#';
const t1185 = 'RCRN';
const s1186 = [k1184, t1185];
const o1187 = 'DRSH#';
const b1188 = 'DRSH';
const m1189 = [o1187, b1188];
const x1190 = 'INSH#';
const z1191 = 'INSH';
const m1192 = [x1190, z1191];
const x1193 = 'LBLR#';
const c1194 = 'LBLR';
const q1195 = [x1193, c1194];
const h1196 = 'BBLR#';
const y1197 = 'BBLR';
const f1198 = [h1196, y1197];
const r1199 = 'MASK#';
const p1200 = 'MASK';
const p1201 = [r1199, p1200];
const r1202 = 'BLEND#';
const m1203 = 'BLEND';
const s1204 = [r1202, m1203];
const r1205 = [...s1186, ...m1189, ...m1192, ...q1195, ...f1198, ...s1204, ...p1201];
const o1206 = [k1162, h1172, h1181, o1175, o1187, x1190, x1193, h1196, r1202, r1199];
const f1207 = 'CSTL';
const f1208 = 'SHP#';
const y1209 = 'RECT#';
const q1210 = 'RECT';
const f1211 = [y1209, q1210];
const r1212 = 'LINE#';
const x1213 = 'LINE';
const b1214 = [r1212, x1213];
const r1215 = 'ELPS#';
const d1216 = 'ELPS';
const f1217 = [r1215, d1216];
const d1218 = 'TRPZ#';
const b1219 = 'TRPZ';
const z1220 = [d1218, b1219];
const j1221 = 'POLY#';
const n1222 = 'POLY';
const q1223 = [j1221, n1222];
const q1224 = 'STAR#';
const v1225 = 'STAR';
const i1226 = [q1224, v1225];
const j1227 = 'TXTS#';
const d1228 = 'TXTS';
const x1229 = [j1227, d1228];
const g1230 = 'PT#';
const z1231 = 'PT';
const y1232 = [g1230, z1231];
const f1233 = 'PCORN';
const w1234 = 'VPATH#';
const o1235 = 'VPATH';
const q1236 = [w1234, o1235];
const g1237 = 'VPT#';
const l1238 = 'VPT';
const s1239 = [g1237, l1238];
const e1240 = 'VEDGE#';
const m1241 = 'VEDGE';
const j1242 = [e1240, m1241];
const c1243 = 'VREG#';
const v1244 = 'VREG';
const r1245 = [c1243, v1244];
const h1246 = 'VNET#';
const o1247 = 'VNET';
const v1248 = [h1246, o1247];
const k1249 = 'SGRP#';
const n1250 = 'SGRP';
const c1251 = [k1249, n1250];
const u1252 = 'FRM#';
const d1253 = 'FRM';
const r1254 = [u1252, d1253];
const f1255 = 'MOVE';
const b1256 = 'ROT';
const a1257 = 'SCALE';
const w1258 = 'SKEW';
const x1259 = 'SCENTR';
const i1260 = 'RSTX';
const e1261 = 'PLACE';
const c1262 = 'APPLY';
const h1263 = 'MESPT';
const s1264 = 'VECLEN';
const q1265 = 'CIRCEN';
const h1266 = 'INTLIN';
const m1267 = 'PTLERP';
const b1268 = 'PONPT';
const m1269 = 'BOOL';
const b1270 = 'BOOL#';
const w1271 = 'BOOLU';
const u1272 = 'BOOLS';
const k1273 = 'BOOLI';
const x1274 = 'BOOLE';
const m1275 = [m1269, b1270, w1271, u1272, k1273, x1274];
const a1276 = 'RENDER';
const l1277 = [f1208, i1053, y1209, r1212, r1215, d1218, j1221, q1224, j1227, g1230, w1234, g1237, e1240, c1243, h1246, k1249, u1252, b1270, o1187, x1190, x1193, h1196, r1202, r1199];
const v1278 = [b1256, a1257, w1258];
const y1279 = [...l1277, ...f1211, ...b1214, ...f1217, ...z1220, ...q1223, ...i1226, ...x1229, ...y1232, f1233, ...q1236, ...s1239, ...j1242, ...r1245, ...v1248, ...c1251, ...r1254, ...m1275, f1255, ...v1278, x1259, i1260, e1261, c1262, h1263, s1264, q1265, h1266, m1267, b1268, a1276];
const o1280 = [e1050, b1051, q1052, i1053, c1085, v1137, k1162, h1172, w1178, h1181, o1175, w1178, h1181, f1208, y1209, r1212, r1215, d1218, j1221, q1224, j1227, g1230, w1234, g1237, e1240, c1243, h1246, k1249, u1252, k1184, o1187, x1190, x1193, h1196, r1202, r1199];
const u1281 = 'GROUP';
const n1282 = 'GPARAM';
const s1283 = [u1281, n1282];
const j1284 = 'CMNT';
const e1285 = 'CMNTARR';
const e1286 = 'PANEL';
const u1287 = 'ACT';
const n1288 = 'BEF';
const q1289 = 'DIS';
const m1290 = 'NOC';
const p1291 = 'PARAM';
const j1292 = 'LOG';
const o1293 = 'GRAPH';
const j1294 = [[e1113, '%'], [d1112, '/'], [w1110, '−'], [k1109, '+'], [g1111, '×'], [t1114, 'e<sup>x']];
const z1295 = [[d1112, '/'], [w1110, '−'], [k1109, '+'], [g1111, '×']];
const k1296 = 0;
const b1297 = 1;
const k1298 = 2;
const e1299 = 3;
const k1300 = [[k1296, 'not'], [b1297, 'xor'], [k1298, 'or'], [e1299, 'and']];
const v1301 = 0;
const m1302 = 1;
const j1303 = 2;
const j1304 = 3;
const q1305 = 4;
const h1306 = 5;
const k1307 = [[v1301, '<'], [m1302, '≤'], [j1303, '≠'], [j1304, '='], [q1305, '≥'], [h1306, '>']];
const g1308 = 0;
const e1309 = 1;
const f1310 = 2;
const q1311 = 3;
const f1312 = 4;
const y1313 = 5;
const j1314 = [[g1308, 'sin'], [e1309, 'cos'], [f1310, 'tan'], [q1311, 'asin'], [f1312, 'acos'], [y1313, 'atan']];
const o1315 = 'EMPTY';
const q1316 = 'CONNECT';
const j1317 = 'CREATE';
const y1318 = 'CREATE_INSERT';
const n1319 = 'DELETE';
const l1320 = 'DISCONNECT';
const m1321 = 'LINK_STYLE';
const y1322 = 'LINK_VARIABLE';
const k1323 = 'LINK_VARIABLE_GROUP';
const z1324 = 'MAKE_ACTIVE';
const MAKE_NOT_CONDITION_ACTION = 'MAKE_NOT_CONDITION';
const m1325 = 'MAKE_PASSIVE';
const n1326 = 'PASTE';
const f1327 = 'RECONNECT';
const a1328 = 'REMOVE';
const y1329 = 'RENAME';
const c1330 = 'REORDER_INPUTS';
const y1331 = 'REORDER_CONNECTIONS';
const b1332 = 'SELECT';
const q1333 = 'SELECT_MOVE';
const n1334 = 'MOVE_NODES';
const t1335 = 'SET_PARAM_VALUE';
const SET_MULTIPLE_VALUES_ACTION = 'SET_MULTIPLE_VALUES';
const h1336 = 'SET_PARAM_SETTING';
const e1337 = 'SET_NODE_RECT';
const j1338 = 'TOGGLE_DISABLE';
const s1339 = 'TOGGLE_PARAM_HEADER';
const w1340 = 'SET_CURRENT_GRAPH';
const u1341 = 'CREATE_PAGE';
const n1342 = 'DELETE_PAGE';
const i1343 = 'GROUP_NODES';
const l1344 = 'UNGROUP_NODES';
const w1345 = 'HIGHLIGHT_NODES';
const SCROLL_LIST_NODE_ACTION = 'SCROLL_LIST_NODE';
const SET_LIST_DIVIDER_ACTION = 'SET_LIST_DIVIDER';
const SET_NODE_PARAM_ACTION = 'SET_NODE_PARAM';
const j1346 = 'BNORM';
const l1347 = 'BDARK';
const f1348 = 'BMULT';
const v1349 = 'BPDRK';
const i1350 = 'BBURN';
const a1351 = 'BLITE';
const d1352 = 'BSCRN';
const w1353 = 'BPLGT';
const s1354 = 'BDODG';
const y1355 = 'BOVER';
const w1356 = 'BSOFT';
const c1357 = 'BHARD';
const j1358 = 'BDIFF';
const w1359 = 'BEXCL';
const d1360 = 'BHUE';
const b1361 = 'BSAT';
const j1362 = 'BCOL';
const i1363 = 'BLUM';
const c1364 = [[j1346, 'normal', 'NORMAL'], [l1347, 'darken', 'DARKEN'], [f1348, 'multiply', 'MULTIPLY'], [v1349, 'plus darker', 'LINEAR_BURN'], [i1350, 'color burn', 'COLOR_BURN'], [a1351, 'lighten', 'LIGHTEN'], [d1352, 'screen', 'SCREEN'], [w1353, 'plus lighter', 'LINEAR_DODGE'], [s1354, 'color dodge', 'COLOR_DODGE'], [y1355, 'overlay', 'OVERLAY'], [w1356, 'soft light', 'SOFT_LIGHT'], [c1357, 'hard light', 'HARD_LIGHT'], [j1358, 'difference', 'DIFFERENCE'], [w1359, 'exclusion', 'EXCLUSION'], [d1360, 'hue', 'HUE'], [b1361, 'saturation', 'SATURATION'], [j1362, 'color', 'COLOR'], [i1363, 'luminosity', 'LUMINOSITY']];
const g1365 = [['thin', 100], ['extra light', 200], ['light', 300], ['regular', 400], ['medium', 500], ['semi bold', 600], ['bold', 700], ['extra bold', 800], ['black', 900]];
const p1366 = 0;
const p1367 = 1;
const l1368 = 2;
const q1369 = 2;
const h1370 = 3;
const m1371 = 3;
const z1372 = 4;
const f1373 = 4;
const r1374 = 5;
const r1375 = 6;
const y1376 = 7;
const p1377 = 8;
const z1378 = 9;
const d1379 = 10;
const c1380 = 11;
const b1381 = 12;
const a1382 = 13;
const f1383 = 14;
const p1384 = 15;
const b1385 = 16;
const v1386 = 17;
const e1387 = 18;
const x1388 = 19;
const p1389 = 20;
const w1390 = 21;
const f1391 = 22;
const v1392 = 23;
const n1393 = 24;
const o1394 = 24;
const u1395 = 25;
const l1396 = 26;
const f1397 = 27;
const g1398 = 28;
const e1399 = 28;
const g1400 = 28;
const u1401 = 28;
const a1402 = 28;
const p1403 = 28;
const o1404 = 28;
const w1405 = 28;
const a1406 = 29;
const x1407 = 29;
const f1408 = 29;
const b1409 = 29;
const z1410 = 29;
const g1411 = 29;
const c1412 = 30;
const f1413 = 30;
const t1414 = 30;
const c1415 = 30;
const b1416 = 31;
const d1417 = 31;
const s1418 = 32;
const a1419 = 33;
const k1420 = 34;
const k1421 = 35;
const r1422 = 36;
const w1423 = 37;
const m2786 = '12345679ABCDEFGHJKLMNPQRSTUVWXYZ';
function u839(array, chars = m2786) { let i841 = ''; let len = array.length; let i = 0; while (len > 0) {
    if (len >= 5) {
        const a0 = array[i], a1 = array[i + 1], a2 = array[i + 2], a3 = array[i + 3], a4 = array[i + 4];
        i841 += chars[(a0 & 0xF8) >>> 3];
        i841 += chars[((a0 & 0x07) << 2) | ((a1 & 0xC0) >>> 6)];
        i841 += chars[(a1 & 0x3E) >>> 1];
        i841 += chars[((a1 & 0x01) << 4) | ((a2 & 0xF0) >>> 4)];
        i841 += chars[((a2 & 0x0F) << 1) | ((a3 & 0x80) >>> 7)];
        i841 += chars[(a3 & 0x7C) >>> 2];
        i841 += chars[((a3 & 0x03) << 3) | ((a4 & 0xE0) >>> 5)];
        i841 += chars[(a4 & 0x1F)];
    }
    else if (len == 4) {
        const a0 = array[i], a1 = array[i + 1], a2 = array[i + 2], a3 = array[i + 3];
        i841 += chars[(a0 & 0xF8) >>> 3];
        i841 += chars[((a0 & 0x07) << 2) | ((a1 & 0xC0) >>> 6)];
        i841 += chars[(a1 & 0x3E) >>> 1];
        i841 += chars[((a1 & 0x01) << 4) | ((a2 & 0xF0) >>> 4)];
        i841 += chars[((a2 & 0x0F) << 1) | ((a3 & 0x80) >>> 7)];
        i841 += chars[(a3 & 0x7C) >>> 2];
        i841 += chars[((a3 & 0x03) << 3)];
    }
    else if (len == 3) {
        const a0 = array[i], a1 = array[i + 1], a2 = array[i + 2];
        i841 += chars[(a0 & 0xF8) >>> 3];
        i841 += chars[((a0 & 0x07) << 2) | ((a1 & 0xC0) >>> 6)];
        i841 += chars[(a1 & 0x3E) >>> 1];
        i841 += chars[((a1 & 0x01) << 4) | ((a2 & 0xF0) >>> 4)];
        i841 += chars[((a2 & 0x0F) << 1)];
    }
    else if (len == 2) {
        const a0 = array[i], a1 = array[i + 1];
        i841 += chars[(a0 & 0xF8) >>> 3];
        i841 += chars[((a0 & 0x07) << 2) | ((a1 & 0xC0) >>> 6)];
        i841 += chars[(a1 & 0x3E) >>> 1];
        i841 += chars[((a1 & 0x01) << 4)];
    }
    else if (len == 1) {
        const a0 = array[i];
        i841 += chars[(a0 & 0xF8) >>> 3];
        i841 += chars[((a0 & 0x07) << 2)];
    }
    i += 5;
    len -= 5;
} return i841; }
function b840(i841, chars = m2786) { const array = []; let len = i841.length; let c = 0; while (len > 0) {
    if (len >= 8) {
        const c0 = chars.indexOf(i841[c]), c1 = chars.indexOf(i841[c + 1]), c2 = chars.indexOf(i841[c + 2]), c3 = chars.indexOf(i841[c + 3]), c4 = chars.indexOf(i841[c + 4]), c5 = chars.indexOf(i841[c + 5]), c6 = chars.indexOf(i841[c + 6]), c7 = chars.indexOf(i841[c + 7]);
        array.push((c0 << 3) | ((c1 & 0x1C) >>> 2));
        array.push(((c1 & 0x03) << 6) | (c2 << 1) | ((c3 & 0x10) >>> 4));
        array.push(((c3 & 0x0F) << 4) | ((c4 & 0x1E) >>> 1));
        array.push(((c4 & 0x01) << 7) | (c5 << 2) | ((c6 & 0x18) >>> 3));
        array.push(((c6 & 0x07) << 5) | c7);
    }
    else if (len == 7) {
        const c0 = chars.indexOf(i841[c]), c1 = chars.indexOf(i841[c + 1]), c2 = chars.indexOf(i841[c + 2]), c3 = chars.indexOf(i841[c + 3]), c4 = chars.indexOf(i841[c + 4]), c5 = chars.indexOf(i841[c + 5]), c6 = chars.indexOf(i841[c + 6]);
        array.push((c0 << 3) | ((c1 & 0x1C) >>> 2));
        array.push(((c1 & 0x03) << 6) | (c2 << 1) | ((c3 & 0x10) >>> 4));
        array.push(((c3 & 0x0F) << 4) | ((c4 & 0x1E) >>> 1));
        array.push(((c4 & 0x01) << 7) | (c5 << 2) | ((c6 & 0x18) >>> 3));
    }
    else if (len == 5) {
        const c0 = chars.indexOf(i841[c]), c1 = chars.indexOf(i841[c + 1]), c2 = chars.indexOf(i841[c + 2]), c3 = chars.indexOf(i841[c + 3]), c4 = chars.indexOf(i841[c + 4]);
        array.push((c0 << 3) | ((c1 & 0x1C) >>> 2));
        array.push(((c1 & 0x03) << 6) | (c2 << 1) | ((c3 & 0x10) >>> 4));
        array.push(((c3 & 0x0F) << 4) | ((c4 & 0x1E) >>> 1));
    }
    else if (len == 4) {
        const c0 = chars.indexOf(i841[c]), c1 = chars.indexOf(i841[c + 1]), c2 = chars.indexOf(i841[c + 2]), c3 = chars.indexOf(i841[c + 3]);
        array.push((c0 << 3) | ((c1 & 0x1C) >>> 2));
        array.push(((c1 & 0x03) << 6) | (c2 << 1) | ((c3 & 0x10) >>> 4));
    }
    else if (len == 2) {
        const c0 = chars.indexOf(i841[c]), c1 = chars.indexOf(i841[c + 1]);
        array.push((c0 << 3) | ((c1 & 0x1C) >>> 2));
    }
    c += 8;
    len -= 8;
} return array; }
function m2081(nodeKey, m3998) { const log = o2082(u1531(nodeKey, false)); if (m3998) {
    console.log('%c%s\n%c%s', 'background: #fa24; color: white;', e1048(nodeKey), 'background: #fa44; color: #edc;', log);
}
else {
    console.log('%c%s\n%c%s', 'background: #fdb; color: black;', e1048(nodeKey), 'background: #fed; color: black;', log);
} }
function o2082(json) { let t4027 = json.replace('{\n', '').replace('\n}', '').replace('[\n' + r859, '').replace('\n' + r859 + ']', '').split(r859 + '"params":\n').join('').split('": "').join(': ').split('", "').join(': ').split(r859 + '"').join(r859).split(r859 + r859 + '["').join(r859 + r859).split('",\n').join('\n').split('"\n').join('\n').split('"],\n').join('\n'); if (t4027[t4027.length - 1] == '"')
    t4027 = t4027.substring(0, t4027.length - 1); if (t4027.substring(t4027.length - 2) == '"]')
    t4027 = t4027.substring(0, t4027.length - 2); return t4027; }
function q2083(json) { let t4027 = json.replace('{\n', '').replace('\n}', '').replace('[\n' + r859, '').replace('\n' + r859 + ']', ''); return t4027; }
function u2084(l243, m3998) { const o4205 = i917(l243, true); if (m3998) {
    console.log('%c%s', 'background: #4f44; color: #ded', o4205);
}
else {
    console.log('%c%s', 'background: #cfc; color: black;', o4205);
} }
console.clear();
figma.payments.setPaymentStatusInDevelopment({ type: 'PAID' });
figma.on('documentchange', g1502);
figma.on('selectionchange', k1510);
figma.on('close', h1503);
p1492(true);
figma.clientStorage.getAsync('pro').then(data => { figma.showUI(__html__, { visible: false, themeColors: true, title: 'Generator' }); });
var p2698 = figma.viewport.zoom;
setInterval(n1507, 100);
const p2787 = 'clock_';
const v2788 = 1000;
var y2789 = false;
function m1504() { (function () {
    return __awaiter(this, void 0, void 0, function* () { let t2790 = yield figma.currentPage.getPluginData(figma.currentUser.id + ',windowWidth'); let g2791 = yield figma.currentPage.getPluginData(figma.currentUser.id + ',windowHeight'); let p2792; let u2793; if (t2790 === NULL) {
        p2792 = 800;
        figma.currentPage.setPluginData(figma.currentUser.id + ',windowWidth', t2790.toString());
    }
    else
        p2792 = parseInt(t2790); if (g2791 === NULL) {
        u2793 = 600;
        figma.currentPage.setPluginData(figma.currentUser.id + ',windowHeight', g2791.toString());
    }
    else
        u2793 = parseInt(g2791); figma.ui.resize(Math.max(0, p2792), Math.max(0, u2793)); figma.ui.show(); const fonts = yield figma.listAvailableFontsAsync(); const eula = (yield figma.clientStorage.getAsync('eula')) === 'true'; const tutorials = (yield figma.clientStorage.getAsync('tutorials')) === 'true'; const isLocked = g1509(); h1511({ cmd: 'uiReturnFigStartGenerator', currentUser: figma.currentUser, viewportRect: figma.viewport.bounds, viewportZoom: figma.viewport.zoom, fonts: fonts, eula: eula, tutorials: tutorials, isLocked: isLocked, windowWidth: p2792, windowHeight: u2793 }); });
})(); }
function d1505() { p1492(); figma.showUI(__html__, { visible: false, themeColors: true }); }
function v1506() { setInterval(h1508, v2788); }
function n1507() { if (figma.viewport.zoom == p2698)
    return; p2698 = figma.viewport.zoom; y2686(); c1525(); h1527(); }
function h1508() { u1532(p2787 + figma.currentUser.sessionId.toString(), Date.now().toString()); }
function g1509() { const clocks = figma.currentPage.getPluginDataKeys().filter(k => k.length > p2787.length && k.substring(0, p2787.length) == p2787 && k.substring(p2787.length) != figma.currentUser.sessionId.toString()).map(k => parseInt(u1531(k))); clocks.sort(); const now = Date.now(); const locked = clocks.length > 0 && now - clocks[clocks.length - 1] < v2788 * 2; return locked; }
function k1510() { y2686(); }
var b2719 = new Array();
var n2721 = new Array();
function x1491(nodeIds) { for (let i = u2755.length - 1; i >= 0; i--)
    if (!u2755[i].removed && nodeIds.includes(u2755[i].getPluginData('nodeId')))
        u2755.splice(i, 1); for (let i = p2771.length - 1; i >= 0; i--)
    if (p2771[i].removed || nodeIds.includes(p2771[i].getPluginData('nodeId')))
        p2771.splice(i, 1); figma.currentPage.findAll(o => nodeIds.includes(o.getPluginData('nodeId'))).forEach(o => { if (!o.removed)
    o.remove(); }); b2719 = b2719.filter(a => !nodeIds.includes(a.nodeId)); }
function p1492(f1493 = false) { for (const a1498 of figma.currentPage.children) {
    if (a1498.removed)
        continue;
    if (a1498.getPluginData('objectId') != '' && a1498.getPluginData('userId') == figma.currentUser.id && (parseInt(a1498.getPluginData('retain')) == 0 || f1493))
        a1498.remove();
} }
function n1494(nodeIds, n1495) { for (let i = b2719.length - 1; i >= 0; i--) {
    const e2720 = b2719[i];
    if (!nodeIds.includes(e2720.nodeId))
        continue;
    for (let j = e2720.objects.length - 1; j >= 0; j--) {
        const a1498 = e2720.objects[j];
        if (a1498.removed || !q1496(a1498, n1495)) {
            if (!a1498.removed)
                a1498.remove();
            m936(e2720.objects, a1498);
            if (u2755.includes(a1498))
                m936(u2755, a1498);
            if (p2771.includes(a1498))
                m936(p2771, a1498);
        }
        if (!a1498.removed) {
            if (parseInt(a1498.getPluginData('retain')) == 2)
                c1517(a1498);
        }
    }
    if (isEmpty(e2720.objects))
        m936(b2719, e2720);
} }
function q1496(a1498, n1495) { if (a1498.type == n1250 || a1498.type == d1253) {
    for (const child of a1498.children) {
        const found = q1496(child, n1495);
        if (found)
            return found;
    }
}
else {
    const found = n1495.find(o => a1498.getPluginData('objectId') == o[l1368] && a1498.getPluginData('userId') == figma.currentUser.id || o[r1374] == 2 && o[r1374] == a1498.getPluginData('retain'));
    if (found)
        return found;
} return null; }
function j1499(nodeIds, s1500) { const paintStyles = figma.getLocalPaintStyles(); paintStyles.filter(s => nodeIds.includes(s.getPluginData('nodeId'))).forEach(s => { const nodeId = s.getPluginData('nodeId'); const existing = s916(s.getPluginData('existing')); if (!existing) {
    s.remove();
}
else if (s1500) {
    v938(n2721, a => a.nodeId == nodeId);
    s.setPluginData('type', NULL);
    s.setPluginData('nodeId', NULL);
    s.setPluginData('existing', NULL);
} }); if (s1500)
    n2721 = n2721.filter(a => !nodeIds.includes(a.nodeId)); }
var t1501 = false;
function g1502(e) { for (const change of e.documentChanges) {
    switch (change.type) {
        case 'STYLE_CREATE':
            if (!change.style)
                break;
            if (!t1501) {
                change.style.setPluginData('type', NULL);
                change.style.setPluginData('nodeId', NULL);
                change.style.setPluginData('existing', NULL);
            }
            break;
        case 'STYLE_PROPERTY_CHANGE': {
            if (!change.style)
                break;
            if (!t1501) {
                const msg = { cmd: 'uiStylePropertyChange', styleId: k939(change.id), properties: change.properties, name: '', paints: [] };
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
                h1511(msg);
            }
            break;
        }
        case 'STYLE_DELETE':
            h1511({ cmd: 'uiStyleDelete', styleId: change.id });
            break;
    }
} t1501 = false; }
function h1503() { p1492(); h1511({ cmd: 'updateMetrics' }); }
figma.ui.onmessage = function (msg) { msg = JSON.parse(msg); if (msg.cmd == 'returnUiGetValueForFigma')
    return; switch (msg.cmd) {
    case 'figStartGenerator':
        m1504();
        break;
    case 'figRestartGenerator':
        d1505();
        break;
    case 'figFinishStart':
        v1506();
        break;
    case 'figDockWindowNormal':
        l2728('normal');
        break;
    case 'figDockWindowMaximize':
        l2728('maximize');
        break;
    case 'figDockWindowTop':
        l2728('top');
        break;
    case 'figDockWindowLeft':
        l2728('left');
        break;
    case 'figDockWindowRight':
        l2728('right');
        break;
    case 'figDockWindowBottom':
        l2728('bottom');
        break;
    case 'figGetMousePosition':
        n1577(msg.clientPosition);
        break;
    case 'figResizeWindow':
        b1580(msg.width, msg.height);
        break;
    case 'figSetWindowRect':
        q1578(msg.x, msg.y, msg.width, msg.height);
        break;
    case 'figNotify':
        c1581(msg);
        break;
    case 'figGetLocalData':
        l1529(msg.key);
        break;
    case 'figSetLocalData':
        w1530(msg.key, msg.value);
        break;
    case 'figClearAllLocalData':
        g4022();
        break;
    case 'figGetPageData':
        u1531(msg.key);
        break;
    case 'figSetPageData':
        u1532(msg.key, msg.value);
        break;
    case 'figSavePages':
        l1537(msg.d4263, msg.pageJson, msg.currentPageId);
        break;
    case 'figLoadNodesAndConns':
        k1534(msg.debugMode);
        break;
    case 'figSaveNodes':
        r1538(msg.nodeIds, msg.nodeJson);
        break;
    case 'figGetAllLocalTemplateNames':
        k2725();
        break;
    case 'figSaveLocalTemplate':
        y1539(msg.m4023, msg.template);
        break;
    case 'figRemoveConnsToNodes':
        c1540(msg.nodeIds);
        break;
    case 'figRemoveSavedNodesAndConns':
        t1541(msg.nodeIds);
        break;
    case 'figRemoveAllSavedNodesAndConns':
        v1542();
        break;
    case 'figLogAllSavedNodesAndConns':
        t1543(msg.m3998);
        break;
    case 'figLogAllSavedNodes':
        q1544(msg.m3998);
        break;
    case 'figLogAllSavedConns':
        y1545(msg.m3998);
        break;
    case 'figLogAllSavedPageKeys':
        a1546(msg.m3998);
        break;
    case 'figLogAllSavedPages':
        x1547(msg.m3998);
        break;
    case 'figLogAllSavedConnKeys':
        s1548(msg.m3998);
        break;
    case 'figLogAllLocalData':
        j1549(msg.m3998);
        break;
    case 'figGetValue':
        s1550(msg.key, msg.spec);
        break;
    case 'figRemoveSavedPage':
        k1552(msg.pageId);
        break;
    case 'figRemoveAllSavedPages':
        c1553();
        break;
    case 'figSaveConnection':
        j1554(msg.key, msg.json);
        break;
    case 'figSaveConnections':
        y1555(msg.keys, msg.json);
        break;
    case 'figUpdateSavedConnections':
        m1556(msg.curKeys, msg.newKeys, msg.json);
        break;
    case 'figDeleteSavedConnection':
        z1557(msg.key);
        break;
    case 'figRemoveAllSavedConnections':
        c1558();
        break;
    case 'figDeleteSavedConnectionsToNode':
        j1559(msg.nodeId);
        break;
    case 'figDeleteSavedConnectionsFromNode':
        d1560(msg.nodeId);
        break;
    case 'figRemovePluginDataFromAllLocalStyles':
        o1561();
        break;
    case 'figGetAllLocalVariables':
        h1585(msg.nodeId, msg.px, msg.py);
        break;
    case 'figLinkNodeToVariable':
        s1587(msg.nodeId, msg.variableId);
        break;
    case 'figUpdateVariable':
        n1588(msg.variableId, msg.value);
        break;
    case 'figGetAllLocalColorStyles':
        b1562(msg.nodeId, msg.px, msg.py);
        break;
    case 'figLinkNodeToExistingColorStyle':
        v1563(msg.nodeId, msg.styleId);
        break;
    case 'figGetObjectSize':
        u1516(msg.object);
        break;
    case 'figGetVariableUpdates':
        o1551(msg.linkedVarIds);
        break;
    case 'figUpdateShowIds':
        y2789 = msg.y2789;
        break;
    case 'figDeleteAllObjects':
        p1492();
        break;
    case 'figUpdateObjectsAndStyles':
        t2734 = 0;
        n2735 = 0;
        msg.objects.forEach(o => o.counted = false);
        x2722(null, msg.objects, msg.k4012, msg.f2029, msg.nodeIds, msg.e2751, msg.f2752, msg.y270);
        h1568(msg);
        break;
    case 'figDeleteObjectsAndStyles':
        x1491(msg.nodeIds);
        j1499(msg.nodeIds, msg.s1500);
        break;
    case 'figDeleteObjectsExcept':
        n1494(msg.nodeIds, msg.ignoreObjects);
        break;
    case 'figTriggerUndo':
        figma.triggerUndo();
        break;
    case 'figCommitUndo':
        figma.commitUndo();
        break;
} h1511({ cmd: 'uiEndFigMessage', msgCmd: msg.cmd }); };
function h1511(msg) { figma.ui.postMessage(JSON.stringify(msg)); }
function y2723(key) {
    return __awaiter(this, void 0, void 0, function* () { return yield figma.clientStorage.getAsync(key); });
}
function l1529(key) { if (key == 'canvasEmpty') {
    h1511({ cmd: 'uiReturnFigGetLocalData', key: key, value: figma.currentPage.children.length == 0 });
}
else if (key == 'debugWarningCrash') {
    figma.clientStorage.getAsync('debugWarning').then(data => { h1511({ cmd: 'uiReturnFigGetLocalData', key: key, value: data }); });
}
else {
    figma.clientStorage.getAsync(key).then(data => { h1511({ cmd: 'uiReturnFigGetLocalData', key: key, value: data }); });
} }
function w1530(key, value, postToUi = true) { figma.clientStorage.setAsync(key, value); if (postToUi) {
    h1511({ cmd: 'uiReturnFigSetLocalData', key: key, value: value });
} }
function g4022() {
    return __awaiter(this, void 0, void 0, function* () { const keys = yield figma.clientStorage.keysAsync(); for (const key of keys)
        figma.clientStorage.deleteAsync(key); });
}
function u1531(key, postToUi = true) { const data = figma.currentPage.getPluginData(key); if (postToUi) {
    h1511({ cmd: 'uiReturnFigGetPageData', key: key, value: data });
} return data; }
function u1532(key, value) { x1533(key); figma.currentPage.setPluginData(key, value); }
function x1533(key) { figma.currentPage.setPluginData(key, ''); }
function k1534(debugMode) { const pageKeys = figma.currentPage.getPluginDataKeys().filter(k => v1044(k)); const nodeKeys = figma.currentPage.getPluginDataKeys().filter(k => e1045(k)); const connKeys = figma.currentPage.getPluginDataKeys().filter(k => f1046(k)); if (!debugMode)
    u1536(nodeKeys, connKeys); const pages = pageKeys.map(k => figma.currentPage.getPluginData(k)); const nodes = nodeKeys.map(k => figma.currentPage.getPluginData(k)); const r2101 = connKeys.map(k => figma.currentPage.getPluginData(k)); const pageOrder = figma.currentPage.getPluginData('pageOrder').split(','); const currentPageId = figma.currentPage.getPluginData('currentPageId'); g1535(nodes); const t3651 = figma.currentPage.getPluginData('showAllColorSpaces'); h1511({ cmd: 'uiReturnFigLoadNodesAndConns', t3651: t3651, pageKeys: pageKeys, pageJson: pages, pageOrder: pageOrder, currentPageId: currentPageId, nodeKeys: nodeKeys, nodeJson: nodes, connKeys: connKeys, connJson: r2101 }); }
function g1535(nodes) { n2721 = []; const paintStyles = figma.getLocalPaintStyles(); for (const w3008 of nodes) {
    const node = JSON.parse(w3008);
    if (node.type == f1207) {
        const style = paintStyles.find(s => { const nodeId = s.getPluginData('nodeId'); return nodeId == node.id; });
        if (style) {
            n2721.push({ nodeId: node.id, existing: s916(node.existing), styles: [style] });
        }
    }
} }
function u1536(nodeKeys, connKeys) { const b2724 = '"loading": "true"'; const not = '{\n'; const set = '{\n' + r859 + b2724 + ',\n'; nodeKeys.forEach(k => figma.currentPage.setPluginData(k, figma.currentPage.getPluginData(k).replace(set, not).replace(not, set))); connKeys.forEach(k => figma.currentPage.setPluginData(k, figma.currentPage.getPluginData(k).replace(set, not).replace(not, set))); }
function l1537(d4263, pageJson, currentPageId) { for (let i = 0; i < d4263.length; i++) {
    u1532(e915(d4263[i]), pageJson[i]);
} u1532('pageOrder', d4263.join(',')); u1532('currentPageId', currentPageId); }
function r1538(nodeIds, nodeJson) { for (let i = 0; i < nodeIds.length; i++) {
    u1532(i913(nodeIds[i]), nodeJson[i]);
} }
function k2725() {
    return __awaiter(this, void 0, void 0, function* () { let keys = yield figma.clientStorage.keysAsync(); keys = keys.filter(k => k.length >= m867.length && k.substring(0, m867.length) == m867); h1511({ cmd: 'uiReturnGetAllLocalTemplateNames', templateNames: keys }); });
}
function y1539(m4023, template) { w1530(m867 + ' ' + m4023, template); }
function c1540(nodeIds) { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => f1046(k)); for (const key of connKeys) {
    const parts = f1049(key).split(' ');
    if (nodeIds.includes(parts[0]) || nodeIds.includes(parts[2]))
        x1533(key);
} }
function t1541(nodeIds) { c1540(nodeIds); const nodeKeys = figma.currentPage.getPluginDataKeys().filter(k => e1045(k) && nodeIds.includes(e1048(k))); nodeKeys.forEach(k => x1533(k)); }
function v1542() { const nodeKeys = figma.currentPage.getPluginDataKeys().filter(k => e1045(k)); const connKeys = figma.currentPage.getPluginDataKeys().filter(k => f1046(k)); for (const key of nodeKeys)
    x1533(key); for (const key of connKeys)
    x1533(key); }
function t1543(m3998) { q1544(m3998); y1545(m3998); }
function q1544(m3998) { figma.currentPage.getPluginDataKeys().filter(k => e1045(k)).forEach(k => m2081(k, m3998)); }
function y1545(m3998) { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => f1046(k)); connKeys.sort((key1, key2) => { const p1 = f1049(key1).split(' '); const p2 = f1049(key2).split(' '); if (p1[2] != p2[2])
    return p1[2] < p2[2] ? -1 : 1; if (p1[3] != p2[3])
    return parseInt(p1[3]) - parseInt(p2[3]); if (p1[2] == p2[0])
    return -1; if (p2[2] == p1[0])
    return 1; return 0; }); connKeys.forEach(k => u2084(JSON.parse(figma.currentPage.getPluginData(k)), m3998)); }
function a1546(m3998) { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => v1044(k)); connKeys.forEach(k => console.log('%c' + k, 'background: #fff; color: ' + (m3998 ? 'black' : 'white'))); const pageOrder = figma.currentPage.getPluginData('pageOrder'); console.log('%c' + pageOrder, 'background: #fff; color: ' + (m3998 ? 'black' : 'white')); }
function x1547(m3998) { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => v1044(k)); connKeys.forEach(k => console.log('%c' + figma.currentPage.getPluginData(k), 'background: #fff; color: ' + (m3998 ? 'black' : 'white'))); const pageOrder = figma.currentPage.getPluginData('pageOrder'); console.log('%c' + pageOrder, 'background: #fff; color: ' + (m3998 ? 'black' : 'white')); }
function s1548(m3998) { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => f1046(k)); connKeys.forEach(k => console.log('%c' + k, 'background: #dff; color: ' + (m3998 ? 'black' : 'white'))); }
function j1549(m3998) { figma.clientStorage.keysAsync().then(keys => keys.forEach(k => figma.clientStorage.getAsync(k).then(val => console.log(k + ': ' + val)))); }
function s1550(key, spec) {
    return __awaiter(this, void 0, void 0, function* () { let result = null; switch (key) {
        case 'getVariableData':
            result = j1586(spec);
            break;
        case 'getPaidStatus':
            result = figma.payments.status.type;
            break;
        case 'figSubscribe': {
            yield figma.payments.initiateCheckoutAsync({ interstitial: 'PAID_FEATURE' });
            result = figma.payments.status.type;
            break;
        }
    } h1511({ cmd: 'returnFigGetValue', value: result }); });
}
function o1551(varIds) { h1511({ cmd: 'uiReturnFigGetVariableUpdates', values: j1586(varIds) }); }
function k1552(pageId) { x1533(l925(pageId)); const pageOrder = u1531('pageOrder').split(','); v938(pageOrder, id => id == pageId); u1532('pageOrder', pageOrder.join(',')); }
function c1553() { const pageKeys = figma.currentPage.getPluginDataKeys().filter(k => v1044(k)); pageKeys.forEach(k => x1533(k)); x1533('pageOrder'); }
function j1554(key, json) { u1532(key, json); }
function y1555(_keys, _json) { const keys = JSON.parse(_keys); const json = JSON.parse(_json); for (let i = 0; i < keys.length; i++)
    u1532(keys[i], json[i]); }
function m1556(_curKeys, _newKeys, _json) { const curKeys = JSON.parse(_curKeys); const newKeys = JSON.parse(_newKeys); const json = JSON.parse(_json); for (let i = 0; i < curKeys.length; i++) {
    x1533(curKeys[i]);
    u1532(newKeys[i], json[i]);
} }
function z1557(key) { x1533(key); }
function c1558() { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => f1046(k)); connKeys.forEach(k => x1533(k)); }
function j1559(nodeId) { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => f1046(k)); for (const key of connKeys) {
    const parts = key.split(' ');
    if (parts[4] == nodeId)
        x1533(key);
} }
function d1560(nodeId) { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => f1046(k)); for (const key of connKeys) {
    const parts = key.split(' ');
    if (parts[1] == nodeId)
        x1533(key);
} }
function o1561() { const q1565 = figma.getLocalPaintStyles(); for (const style of q1565) {
    style.setPluginData('type', '');
    style.setPluginData('nodeId', '');
    style.setPluginData('existing', '');
} }
var z2726 = null;
var l4024 = () => z2726 = null;
var t2727 = 'normal';
function n1577(clientPosition) { h1511({ cmd: 'uiReturnFigGetMousePosition', position: { x: 0, y: 0 }, clientPosition: clientPosition, viewportZoom: figma.viewport.zoom, viewportRect: figma.viewport.bounds }); }
function q1578(x, y, width, height) { return; (function () {
    return __awaiter(this, void 0, void 0, function* () { const rect = { x: Math.round(x), y: Math.round(y), width: Math.floor(Math.max(0, width)), height: Math.floor(Math.max(0, height)) }; figma.ui.reposition(rect.x, rect.y); figma.ui.resize(rect.width, rect.height); figma.clientStorage.setAsync('windowX', rect.x); figma.clientStorage.setAsync('windowY', rect.y); figma.clientStorage.setAsync('windowWidth', rect.width); figma.clientStorage.setAsync('windowHeight', rect.height); h1511({ cmd: 'uiReturnFigSetWindowRect' }); });
})(); }
function h1579(dock, rect, bounds) { switch (dock) {
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
function b1580(width, height) { (function () {
    return __awaiter(this, void 0, void 0, function* () { width = Math.floor(Math.max(0, width)); height = Math.floor(Math.max(0, height)); figma.ui.resize(width, height); figma.currentPage.setPluginData(figma.currentUser.id + ',windowWidth', width.toString()); figma.currentPage.setPluginData(figma.currentUser.id + ',windowHeight', height.toString()); h1511({ cmd: 'uiReturnFigResizeWindow', width: width, height: height }); });
})(); }
function l2728(dock) {
    return __awaiter(this, void 0, void 0, function* () { if (dock != 'normal' && t2727 == 'normal') {
        figma.clientStorage.setAsync('normalWindowX', yield figma.clientStorage.getAsync('normalWindowX'));
        figma.clientStorage.setAsync('normalWindowY', yield figma.clientStorage.getAsync('normalWindowY'));
        figma.clientStorage.setAsync('normalWindowWidth', yield figma.clientStorage.getAsync('normalWindowWidth'));
        figma.clientStorage.setAsync('normalWindowHeight', yield figma.clientStorage.getAsync('normalWindowHeight'));
    } t2727 = dock; figma.clientStorage.setAsync('windowDock', dock); b1580(yield figma.clientStorage.getAsync('windowWidth'), yield figma.clientStorage.getAsync('windowHeight')); });
}
function c1581(msg) { o1582(msg.text, msg.prefix, msg.delay, msg.error, msg.c1583, msg.t1584); }
function o1582(text, prefix = 'Generator ', delay = 400, error = false, c1583 = '', t1584 = NULL) { const options = { timeout: delay, error: error, onDequeue: l4024 }; if (c1583 != '') {
    options['button'] = { text: c1583 };
    if (t1584.substring(0, 'removeConnection'.length) == 'removeConnection') {
        options['button']['action'] = () => z1557(t1584.split(',')[1]);
    }
    else {
        switch (t1584) {
            case 'hideClearUndoWarning':
                options['button']['action'] = () => h1511({ cmd: 'uiHideClearUndoWarning' });
                break;
        }
    }
} if (z2726)
    z2726.cancel(); z2726 = figma.notify(prefix + text, options); }
function n2729(key, params = null) {
    return __awaiter(this, void 0, void 0, function* () { return yield s2730(key, params); });
}
function s2730(key, params = null) {
    return __awaiter(this, void 0, void 0, function* () { return new Promise((resolve, reject) => { const timeout = 60000; h1511(Object.assign({ cmd: 'uiGetValueForFigma', key: key }, (params || {}))); const r2731 = setTimeout(() => reject(new Error('Timeout: Result not received by Figma within the specified time')), timeout); function b4025(msg) { msg = JSON.parse(msg); if (msg.cmd === 'returnUiGetValueForFigma') {
        clearTimeout(r2731);
        resolve({ key: msg.key, value: msg.value });
        figma.ui.off('message', b4025);
    } } figma.ui.on('message', b4025); }); });
}
var d2732 = [];
var l2733 = [];
var t2734 = 0;
var n2735 = 0;
function x1512(f111) { return (f111[r1374] === 2 ? '' : r863) + (y2789 ? f111[l1368] : f111[h1370]); }
function s1513(q1497, addObject = null) { if (!d1515(q1497))
    return null; let a1498; switch (q1497[p1366]) {
    case q1210:
        a1498 = j2703(q1497);
        break;
    case x1213:
        a1498 = x2782(q1497);
        break;
    case d1216:
        a1498 = h2778(q1497);
        break;
    case n1222:
        a1498 = t2699(q1497);
        break;
    case v1225:
        a1498 = q2706(q1497);
        break;
    case d1228:
        a1498 = j2709(q1497);
        break;
    case z1231:
        a1498 = r2685(q1497);
        break;
    case o1235:
        a1498 = w2737(q1497);
        break;
    case o1247:
        a1498 = d2738(q1497);
        break;
    case m1269:
        a1498 = h2739(q1497);
        break;
    case n1250:
        a1498 = b2740(q1497);
        break;
    case d1253:
        a1498 = w2741(q1497);
        break;
} if (addObject && a1498 != undefined && a1498 != null && !a1498.removed) {
    a1498.name = x1512(q1497);
    m945(q1497[p1366] == n1250 || !!a1498, 'no Figma object created');
    if (a1498 != undefined && a1498 != null) {
        a1498.setPluginData('retain', q1497[r1374].toString());
        if (q1497[r1374] < 2) {
            a1498.setPluginData('userId', figma.currentUser.id);
            a1498.setPluginData('sessionId', figma.currentUser.sessionId.toString());
            a1498.setPluginData('type', q1497[p1366]);
            a1498.setPluginData('nodeId', q1497[p1367]);
            a1498.setPluginData('objectId', q1497[l1368]);
            a1498.setPluginData('isCenter', u930(q1497[p1389]));
            if (q1497[p1366] == z1231)
                u2755.push(a1498);
            if (q1497[x1388])
                m1528(a1498);
        }
        addObject(a1498);
    }
} if (!q1497.counted) {
    n2735++;
    q1497.counted = true;
} return a1498; }
function m1514(a1498, q1497) { if (!d1515(q1497) || a1498 == undefined || a1498 == null || a1498.removed)
    return; a1498.name = x1512(q1497); a1498.setPluginData('retain', q1497[r1374].toString()); switch (q1497[p1366]) {
    case q1210:
        t2704(a1498, q1497);
        break;
    case x1213:
        n2783(a1498, q1497);
        break;
    case d1216:
        h2779(a1498, q1497);
        break;
    case n1222:
        i2700(a1498, q1497);
        break;
    case v1225:
        b2707(a1498, q1497);
        break;
    case d1228:
        b2710(a1498, q1497);
        break;
    case z1231:
        k2742(a1498, q1497);
        break;
    case o1235:
        q2743(a1498, q1497);
        break;
    case o1247:
        q2744(a1498, q1497);
        break;
    case m1269:
        u2745(a1498, q1497);
        break;
    case n1250:
        e2746(a1498, q1497);
        break;
    case d1253:
        a2747(a1498, q1497);
        break;
} if (a1498 != undefined && a1498 != null && !a1498.removed) {
    a1498.parent.appendChild(a1498);
    if (q1497[x1388])
        m1528(a1498);
} if (!q1497.counted) {
    n2735++;
    q1497.counted = true;
} }
function x2722(w2748, y2749, e2750, f2029 = -1, nodeIds = [], e2751 = false, f2752 = false, y270 = false) {
    return __awaiter(this, void 0, void 0, function* () { let n2753 = NULL; let p2754 = null; let abort = false; const h3632 = []; let d2736 = 0; d2732.push(...nodeIds); if (f2029 > -1)
        t2734 = f2029; for (const q1497 of y2749) {
        l2733.push(q1497);
        if (q1497[p1367] != n2753) {
            n2753 = q1497[p1367];
            p2754 = b2719.find(a => a.nodeId == q1497[p1367]);
            if (!p2754) {
                b2719.push(p2754 = { nodeId: q1497[p1367], objects: [] });
            }
        }
        const addObject = a1498 => { if (w2748 != undefined && w2748 != null && !w2748.removed)
            w2748.appendChild(a1498);
        else
            p2754.objects.push(a1498); };
        let objects = w2748 != undefined && w2748 != null && !w2748.removed ? w2748.children : p2754.objects;
        let a1498 = objects.find(o => o.removed || o.getPluginData('userId') == figma.currentUser.id && o.getPluginData('objectId') == q1497[l1368]);
        if (a1498 != undefined && a1498 != null && a1498.removed) {
            a931(objects, a1498);
            if (u2755.includes(a1498))
                m936(u2755, a1498);
            if (p2771.includes(a1498))
                m936(p2771, a1498);
        }
        if (a1498 == undefined || a1498 == null || a1498.removed) {
            const newObj = s1513(q1497, addObject);
            h3632.push(newObj);
        }
        else if (a1498 != undefined && a1498 != null && !a1498.removed && a1498.getPluginData('type') == q1497[p1366].toString()) {
            m1514(a1498, q1497);
            if (a1498 != undefined && a1498 != null && !a1498.removed)
                h3632.push(a1498);
        }
        else {
            a1498.remove();
            if (u2755.includes(a1498))
                m936(u2755, a1498);
            if (p2771.includes(a1498))
                m936(p2771, a1498);
            s1513(q1497, addObject);
        }
        d2736++;
        if (d2736 >= e2750) {
            const result = yield n2729('returnObjectUpdate', { t2734: t2734, n2735: n2735 });
            abort = result.value;
            d2736 = 0;
            if (abort)
                break;
        }
    } if (w2748 != undefined && w2748 != null && !w2748.removed) {
        for (const a1498 of w2748.children) {
            if (a1498 != undefined && a1498 != null && a1498.removed || !y2749.find(o => o[l1368] == a1498.getPluginData('objectId') && a1498.getPluginData('userId') == figma.currentUser.id))
                a1498.remove();
        }
    } for (const point of u2755) {
        if (point != undefined && point != null && !point.removed && !point.parent.removed)
            point.parent.appendChild(point);
    } if (f2752 && !abort) {
        n1494(d2732, l2733);
        d2732 = [];
        l2733 = [];
        if (y270 && h3632.length > 0) {
            figma.viewport.scrollAndZoomIntoView(h3632);
            const bounds = g1518(h3632);
            figma.viewport.zoom = Math.min(figma.viewport.bounds.width * figma.viewport.zoom / bounds.width - 0.05, figma.viewport.bounds.height * figma.viewport.zoom / bounds.height - 0.05);
        }
    } yield n2729('returnObjectUpdate', { t2734: t2734, n2735: n2735 }); });
}
function d1515(q1497) { switch (q1497[p1366]) {
    case q1210: return u2702(q1497);
    case x1213: return r2764(q1497);
    case d1216: return j2765(q1497);
    case n1222: return w4021(q1497);
    case v1225: return v2705(q1497);
    case d1228: return p2708(q1497);
    case z1231: return f4020(q1497);
    case o1235: return v2766(q1497);
    case o1247: return i2767(q1497);
    case m1269: return o2768(q1497);
    case n1250: return z2769(q1497);
    case d1253: return o2770(q1497);
} }
function u1516(q1497) { (() => __awaiter(this, void 0, void 0, function* () { const a1498 = s1513(q1497); const width = a1498.width; const height = a1498.height; a1498.remove(); h1511({ cmd: 'uiForwardToGenerator', msg: { cmd: 'returnFigGetObjectSize', objectId: q1497[l1368], width: width, height: height } }); }))(); }
function c1517(a1498) { a1498.setPluginData('type', ''); a1498.setPluginData('nodeId', ''); a1498.setPluginData('userId', ''); a1498.setPluginData('sessionId', ''); a1498.setPluginData('objectId', ''); a1498.setPluginData('isCenter', ''); a1498.setPluginData('retain', ''); }
function g1518(objects) { const bounds = { left: 0, top: 0, right: 0, bottom: 0 }; for (const f111 of objects) {
    if (f111.x < bounds.left || bounds.left == bounds.right)
        bounds.left = f111.x;
    if (f111.y < bounds.top || bounds.top == bounds.bottom)
        bounds.top = f111.y;
    if (f111.x + f111.width > bounds.right || bounds.left == bounds.right)
        bounds.right = f111.x + f111.width;
    if (f111.y + f111.height > bounds.bottom || bounds.top == bounds.bottom)
        bounds.bottom = f111.y + f111.height;
} return { x: bounds.left, y: bounds.top, width: bounds.right - bounds.left, height: bounds.bottom - bounds.top }; }
const p2771 = [];
const r2772 = [];
function x1519(z1520, u1521) { const effects = []; for (const effect of z1520) {
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
                if (u1521 && !isNaN(spread))
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
function h2692(a1498, q1497, phantom = true) { f1524(a1498, q1497); j2693(a1498, q1497, phantom); p2694(a1498, q1497); a1498.opacity = q1497[w1390]; a1498.blendMode = q1497[f1391]; const maskType = q1497[v1392]; a1498.isMask = maskType > 0; if (a1498.isMask) {
    switch (maskType) {
        case 1:
            a1498.maskType = 'ALPHA';
            break;
        case 2:
            a1498.maskType = 'VECTOR';
            break;
        case 3:
            a1498.maskType = 'LUMINANCE';
            break;
    }
} if (a1498.isMask && a1498.fills.length == 0 && a1498.strokes.length == 0)
    a1498.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 }, opacity: 1, blendMode: 'NORMAL' }]; }
function p2694(a1498, q1497) { if (!!q1497[d1379] && !isEmpty(q1497[d1379])) {
    a1498.fills = h949(q1497[d1379]);
    if (p2771.includes(a1498))
        m936(p2771, a1498);
}
else
    a1498.fills = []; }
function j2693(a1498, q1497, phantom = true) { if (q1497[c1380] != null && !isEmpty(q1497[c1380])) {
    g1523(a1498, h949(q1497[c1380]), q1497[b1381], q1497[a1382], q1497[f1383], q1497[p1384], q1497[b1385], p2695(q1497[v1386]));
    if (q1497[x1388])
        a1498.setPluginData('dashes', q1497[v1386]);
    if (p2771.includes(a1498))
        m936(p2771, a1498);
    if (q1497[x1388])
        u942(r2772, a1498);
}
else if (isEmpty(q1497[d1379]) && isEmpty(q1497[c1380]) && !q1497[v1392] && phantom) {
    a1526(a1498);
    u942(p2771, a1498);
}
else
    a1498.strokes = []; }
function p2695(h1522) { h1522 = h1522; h1522 = e947(h1522, ','); h1522 = b948(h1522, ','); h1522 = h1522.trim(); return h1522 == '' ? [] : h1522.split(',').map(s => Math.max(0, parseFloat(s))); }
function a2696(h1522) { h1522 = h1522; h1522 = e947(h1522, ','); h1522 = b948(h1522, ','); h1522 = h1522.trim(); return h1522 == '' ? [] : h1522.split(',').map(s => Math.max(0, parseFloat(s) / p2698)); }
function g1523(a1498, fills, weight, align, join, miterLimit, cap, dashes = []) { a1498.strokes = fills; a1498.strokeWeight = Math.max(0, weight); a1498.strokeAlign = align; a1498.strokeJoin = join; const miterAngle = miterLimit / 360 * Tau; const a2773 = 1 / Math.sin(miterAngle / 2); a1498.strokeMiterLimit = Math.min(Math.max(0, a2773), 16); a1498.strokeCap = cap; a1498.dashPattern = dashes; }
function f1524(a1498, q1497) { if (!!q1497[e1387] && !isEmpty(q1497[e1387])) {
    const u1521 = q1497[p1366] == q1210 || q1497[p1366] == d1216 || q1497[p1366] == d1253;
    a1498.effects = x1519(q1497[e1387], u1521);
}
else
    a1498.effects = []; }
function c1525() { for (const f111 of p2771) {
    if (f111.removed)
        m936(p2771, f111);
    else
        a1526(f111);
} }
function a1526(f111) { const back = figma.currentPage.backgrounds.find(b => b.type == 'SOLID'); let phantomColor; if (back) {
    const l = back.color.r * 0.2126 + back.color.g * 0.7152 + back.color.b * 0.0722;
    phantomColor = l > 0.5 ? { r: 0, g: 0, b: 0 } : { r: 1, g: 1, b: 1 };
}
else
    phantomColor = { r: 1, g: 0, b: 1 }; g1523(f111, [{ type: 'SOLID', color: phantomColor, opacity: 0.5 }], 1 / p2698, 'CENTER', 'MITER', 1, 'NONE', [1 / p2698, 2 / p2698]); }
function h1527() { for (const a1498 of r2772) {
    if (a1498.removed)
        m936(r2772, a1498);
    else
        m1528(a1498);
} }
function m1528(a1498) { a1498.strokeWeight = Math.max(0, 1 / p2698); if (s916(a1498.getPluginData('isCenter'))) {
    const path = a1498.vectorPaths[0];
    const parts = path.data.split(' ');
    let t = { x: parseFloat(parts[1]), y: parseFloat(parts[2]) };
    let c = { x: parseFloat(parts[4]), y: parseFloat(parts[5]) };
    let r = { x: parseFloat(parts[7]), y: parseFloat(parts[8]) };
    const a = 2;
    const b = 0.05;
    const f = 1 - Math.pow(1 - Math.min(p2698, 1), a) / Math.pow(a, b);
    t = x888(c, u890(u875(c893(t, c)), 10 / f));
    r = x888(c, u890(u875(c893(r, c)), 10 / f));
    parts[1] = t.x;
    parts[2] = t.y;
    parts[4] = c.x;
    parts[5] = c.y;
    parts[7] = r.x;
    parts[8] = r.y;
    const a2774 = { windingRule: path.windingRule, data: parts.join(' ') };
    a1498.vectorPaths = [a2774];
} const dashes = a1498.getPluginData('dashes'); if (dashes != '')
    a1498.dashPattern = a2696(dashes); }
function b1562(nodeId, px, py) { const _styles = figma.getLocalPaintStyles(); const styles = new Array(); for (const a168 of _styles) {
    const _nodeId = a168.getPluginData('nodeId');
    const _existing = a168.getPluginData('existing');
    const existing = !!_existing;
    const style = { id: a168.id, nodeId: _nodeId, name: a168.name, existing: existing, paints: new Array() };
    let onlyPaint = true;
    for (const d2776 of a168.paints) {
        if (d2776.type == 'SOLID') {
            style.paints.push([d2776.color.r, d2776.color.g, d2776.color.b, d2776.opacity]);
        }
        else {
            onlyPaint = false;
            break;
        }
    }
    if (onlyPaint)
        styles.push(style);
} h1511({ cmd: 'uiReturnFigGetAllLocalColorStyles', nodeId: nodeId, px: px, py: py, styles: JSON.stringify(styles) }); }
function v1563(nodeId, styleId) { const q1565 = figma.getLocalPaintStyles(); if (styleId != NULL)
    k1564(q1565, nodeId, styleId);
else
    m1566(q1565, nodeId); }
function k1564(q1565, nodeId, styleId, clearExisting = true) { const h2775 = n2721.find(a => a.nodeId == nodeId); if (h2775 && clearExisting)
    m1566(q1565, nodeId); const j1570 = q1565.find(s => s.id == styleId); m945(!!j1570, 'figStyle should be found here'); j1570.setPluginData('type', f1207); j1570.setPluginData('nodeId', nodeId); j1570.setPluginData('existing', u930(true)); n2721.push({ nodeId: nodeId, existing: true, styles: [j1570] }); return j1570; }
function m1566(q1565, nodeId) { const j1570 = q1565.find(s => s.getPluginData('nodeId') == nodeId); m945(!!j1570, 'figStyle should be found here'); if (j1570) {
    j1570.setPluginData('type', NULL);
    j1570.setPluginData('nodeId', NULL);
    j1570.setPluginData('existing', NULL);
    v938(n2721, a => a.nodeId == nodeId);
} return j1570; }
function a1567(styles, i1571) { const j1570 = figma.createPaintStyle(); j1570.setPluginData('type', i1571[p1366]); j1570.setPluginData('nodeId', i1571[p1367]); j1570.name = i1571[m1371]; setStylePaints(j1570, i1571); styles.push(j1570); h1511({ cmd: 'uiSetStyleId', nodeId: i1571[p1367], styleId: j1570.id }); return j1570; }
function h1568(msg) { let n2753 = NULL; let h2775; for (const i1571 of msg.styles) {
    if (i1571[p1367] != n2753) {
        n2753 = i1571[p1367];
        h2775 = n2721.find(a => a.nodeId == i1571[p1367]);
        if (!h2775) {
            h2775 = { nodeId: i1571[p1367], styles: [] };
            n2721.push(h2775);
        }
    }
    else
        h2775 = null;
    const j1570 = h2775.styles[0];
    const q1565 = figma.getLocalPaintStyles();
    const localStyle = q1565.find(s => s.getPluginData('nodeId') == i1571[p1367]);
    if (isValid(j1570) && !isValid(localStyle)) {
        a931(h2775.styles, j1570);
    }
    const existing = isValid(j1570) && isValid(localStyle) && j1570.getPluginData('existing');
    if (!isValid(j1570) || !isValid(localStyle)) {
        if (!existing) {
            t1501 = true;
            v1563(i1571[p1367], i1571[q1369]);
        }
    }
    else if (isValid(j1570) && j1570.getPluginData('type') == i1571[p1366]) {
        t1501 = true;
        g1569(localStyle, i1571);
    }
} }
function g1569(j1570, i1571) { setStylePaints(j1570, i1571); j1570.name = i1571[m1371]; }
function getStylePaints(stylePaints) { const paints = new Array(); for (const d2776 of stylePaints) {
    const fill = d2776[1].split(' ');
    switch (d2776[0]) {
        case 'SOLID':
            paints.push({ type: 'SOLID', color: { r: Math.min(Math.max(0, parseFloat(fill[0]) / 0xff), 1), g: Math.min(Math.max(0, parseFloat(fill[1]) / 0xff), 1), b: Math.min(Math.max(0, parseFloat(fill[2]) / 0xff), 1) }, opacity: Math.min(Math.max(0, parseFloat(fill[3]) / 100), 1) });
            break;
    }
} return paints; }
function setStylePaints(j1570, i1571) { if (!isEmpty(i1571[f1373]))
    j1570.paints = getStylePaints(i1571[f1373]);
else
    j1570.paints = []; }
function h1585(nodeId, px, py) { const h2777 = figma.variables.getLocalVariables(); const variables = new Array(); for (const _var of h2777) {
    const variable = { id: _var.id, resolvedType: _var.resolvedType, name: _var.name, collectionName: figma.variables.getVariableCollectionById(_var.variableCollectionId).name };
    variables.push(variable);
} h1511({ cmd: 'uiReturnFigGetAllLocalVariables', nodeId: nodeId, px: px, py: py, variables: JSON.stringify(variables), nCollections: figma.variables.getLocalVariableCollections().length }); }
function j1586(varIds) { const h2777 = figma.variables.getLocalVariables(); const variables = varIds.map(id => h2777.find(v => v.id == id)); let values = []; for (let i = 0; i < varIds.length; i++) {
    const variable = variables[i];
    const collection = variable != undefined ? figma.variables.getVariableCollectionById(variable.variableCollectionId) : null;
    if (collection) {
        const vals = [];
        for (const mode of collection.modes) {
            vals.push(variable.valuesByMode[mode.modeId]);
        }
        values.push({ id: varIds[i], name: variable.name, resolvedType: variable.resolvedType, value: vals[0] });
    }
    else {
        values.push({ id: varIds[i], resolvedType: NULL, value: null });
    }
} return values; }
function s1587(nodeId, varId) { const h2777 = figma.variables.getLocalVariables(); m1589(h2777, nodeId, varId); }
function n1588(varId, value) { const h2777 = figma.variables.getLocalVariables(); const variable = h2777.find(v => v.id == varId); if (!variable)
    return; const collection = figma.variables.getVariableCollectionById(variable.variableCollectionId); if (variable.resolvedType == 'BOOLEAN')
    value = value != 0; if (value !== null)
    variable.setValueForMode(collection.modes[0].modeId, value); }
function m1589(h2777, nodeId, varId) { const variable = h2777.find(v => v.id == varId); const values = []; if (variable) {
    const collection = figma.variables.getVariableCollectionById(variable.variableCollectionId);
    for (const mode of collection.modes)
        values.push(variable.valuesByMode[mode.modeId]);
} h1511({ cmd: 'uiReturnFigLinkNodeToVariable', nodeId: nodeId, variableId: variable ? variable.id : NULL, variableName: variable ? variable.name : '', resolvedType: variable ? variable.resolvedType : NULL, values: values }); return variable; }
function k1572(tl, tr, bl) { let vr = point(tr.x - tl.x, tr.y - tl.y); let vb = point(bl.x - tl.x, bl.y - tl.y); let sx = vr.x; let sy = vb.y; let kx = -vr.y; let ky = -vb.x; let dx = -tl.x; let dy = -tl.y; const _sx = kx / nozero(sx); const _sy = ky / nozero(sy); let l4202 = t878([[1, _sy, 0], [_sx, 1, 0], [0, 0, 1]], v882(dx, dy)); l4202 = q880(l4202); const a = angle(vr); if (a > Tau / 4 && a < Tau * 3 / 4)
    l4202 = t878(l4202, v882(0, 0, 1, 1, Tau / 2)); if (determinant(l4202) < 0)
    l4202 = t878(l4202, v882(0, 0, -1, 1, 0)); return l4202; }
function h1573(a1498, tl, tr, bl) { const l4202 = k1572(tl, tr, bl); a1498.relativeTransform = [l4202[0], l4202[1]]; }
function v1574(a1498, q1497, setSize = true, noHeight = 0.01) { if (!q1497[r1375] || !q1497[y1376] || !q1497[p1377])
    return; const xp0 = q1497[r1375]; const xp1 = q1497[y1376]; const xp2 = q1497[p1377]; h1573(a1498, xp0, xp1, xp2); if (setSize) {
    const y883 = distance(xp0, xp1);
    const t884 = distance(xp0, xp2);
    const height = q1497[p1366] == d1228 ? q1497[z1410] : q1497[f1397];
    if (!a1498.removed) {
        a1498.resizeWithoutConstraints(Math.max(0.01, y883), height ? Math.max(0.01, t884) : noHeight);
    }
} }
function g1575(s2690, y2691) { if (s2690.removed)
    return; s2690.resizeWithoutConstraints(0.01, 0.01); s2690.setPluginData('actualX', y2691[n1393].toString()); s2690.setPluginData('actualY', y2691[u1395].toString()); s2690.x = y2691[n1393]; s2690.y = y2691[u1395]; s2690.rotation = y2691[p1389] ? 45 : 0; }
function y1576(s2690) { if (!s2690.removed)
    s2690.resizeWithoutConstraints(0.01, 0.01); }
function o2768(genBool) { return genBool.children.length > 0; }
function h2739(genBool) { let objects = []; for (const f111 of genBool.children)
    s1513(f111, o => objects = [...objects, o]); let figBool = null; if (!isEmpty(objects)) {
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
    v1574(figBool, genBool);
    if (!o2768(genBool))
        return figBool;
} return figBool; }
function u2745(figBool, genBool, isValid = false) { if (!isValid && !o2768(genBool)) {
    figBool.remove();
    return;
} v1574(figBool, genBool); x2722(figBool, genBool.children, genBool.children.length); }
function j2765(u2756) { return u2756[n1393] != null && !isNaN(u2756[n1393]) && u2756[u1395] != null && !isNaN(u2756[u1395]) && u2756[l1396] != null && !isNaN(u2756[l1396]) && u2756[f1397] != null && !isNaN(u2756[f1397]) && u2756[e1399] != null && !isNaN(u2756[e1399]) && u2756[a1406] != null && !isNaN(u2756[a1406]) && u2756[c1412] != null && !isNaN(u2756[c1412]) && u2756[b1416] != null && !isNaN(u2756[b1416]); }
function h2778(u2756) { if (!j2765(u2756))
    return null; const w2757 = figma.createEllipse(); h2779(w2757, u2756, true); return w2757; }
function h2779(w2757, u2756, isValid = false) { if (!isValid && !j2765(u2756))
    return; f2780(w2757, u2756); if (u2755.includes(w2757))
    z2687(w2757);
else
    h2692(w2757, u2756); }
function f2780(w2757, u2756) { w2757.cornerRadius = u2756[e1399]; const start = u2756[a1406] / 360 * (Math.PI * 2); const sweep = u2756[c1412] / 100 * (Math.PI * 2); w2757.arcData = { startingAngle: start, endingAngle: start + sweep, innerRadius: Math.min(Math.max(0, u2756[b1416] / 100), 1) }; v1574(w2757, u2756); }
function o2770(h2758) { return h2758[n1393] != null && !isNaN(h2758[n1393]) && h2758[u1395] != null && !isNaN(h2758[u1395]) && h2758[l1396] != null && !isNaN(h2758[l1396]) && h2758[f1397] != null && !isNaN(h2758[f1397]) && h2758[w1405] != null && !isNaN(h2758[w1405]); }
function w2741(h2758) { if (!o2770(h2758))
    return null; const i2759 = figma.createFrame(); if (i2759) {
    z2781(i2759, h2758);
    let objects = [];
    for (const f111 of h2758[g1411])
        s1513(f111, o => objects = [...objects, o]);
    for (const f111 of objects)
        i2759.appendChild(f111);
} return i2759; }
function a2747(i2759, h2758) { z2781(i2759, h2758); x2722(i2759, h2758[g1411], h2758[g1411].length); }
function z2781(i2759, h2758) { i2759.cornerRadius = h2758[w1405]; v1574(i2759, h2758); h2692(i2759, h2758, h2758[g1411].length == 0); }
function z2769(w2760) { return true; }
function b2740(w2760) { let objects = []; for (const f111 of w2760[o1394])
    s1513(f111, o => objects = [...objects, o]); const w2761 = !isEmpty(objects) ? figma.group(objects, figma.currentPage) : null; if (w2761)
    e2746(w2761, w2760); return w2761; }
function e2746(w2761, w2760) { if (w2760[o1394].length == 0) {
    w2761.remove();
    return;
} x2722(w2761, w2760[o1394], w2760[o1394].length); f1524(w2761, w2760); }
function r2764(p2762) { return p2762[n1393] != null && !isNaN(p2762[n1393]) && p2762[u1395] != null && !isNaN(p2762[u1395]) && p2762[l1396] != null && !isNaN(p2762[l1396]); }
function x2782(p2762) { if (!r2764(p2762))
    return null; const b2763 = figma.createLine(); n2783(b2763, p2762, true); return b2763; }
function n2783(b2763, p2762, isValid = false) { if (!isValid && !r2764(p2762))
    return; v1574(b2763, p2762, true, 0); h2692(b2763, p2762); }
var u2755 = [];
function f4020(y2691) { return y2691[n1393] != null && !isNaN(y2691[n1393]) && y2691[u1395] != null && !isNaN(y2691[u1395]); }
function r2685(y2691) { const s2690 = y2691[p1389] ? figma.createRectangle() : figma.createEllipse(); if (!f4020(y2691))
    return s2690; if (u2755.includes(s2690))
    r2689(s2690, y2691);
else
    k2742(s2690, y2691); return s2690; }
function k2742(s2690, y2691) { g1575(s2690, y2691); z2688(s2690); }
function y2686() { h1511({ cmd: 'uiUpdateZoom', zoom: figma.viewport.zoom }); for (const point of u2755)
    z2687(point); }
function z2687(s2690) { y1576(s2690); z2688(s2690); }
function r2689(s2690, y2691) { g1575(s2690, y2691); z2688(s2690); }
function z2688(s2690) { if (s2690.removed)
    return; const a3731 = s916(s2690.getPluginData('isCenter')); const n2697 = figma.currentPage.selection.includes(s2690); const color = a3731 ? [0xf2, 0x48, 0x22] : n2697 ? [12, 140, 233] : [255, 255, 255]; const border = a3731 ? [255, 255, 255] : n2697 ? [255, 255, 255] : [12, 140, 233]; s2690.fills = h949([['SOLID', color[0], color[1], color[2], 100]]); const effects = []; effects.push(...x1519([['DROP_SHADOW', border[0] / 255, border[1] / 255, border[2] / 255, 1, 0, 0, 0, (a3731 ? 3 : n2697 ? 5 : 3.6) / p2698, 'NORMAL', true, true]], true)); effects.push(...x1519([['DROP_SHADOW', color[0] / 255, color[1] / 255, color[2] / 255, 1, 0, 0, 0, (n2697 ? 4 : 2.4) / p2698, 'NORMAL', true, true]], true)); s2690.effects = effects; }
function w4021(genPoly) { return genPoly[n1393] != null && !isNaN(genPoly[n1393]) && genPoly[u1395] != null && !isNaN(genPoly[u1395]) && genPoly[l1396] != null && !isNaN(genPoly[l1396]) && genPoly[f1397] != null && !isNaN(genPoly[f1397]) && genPoly[a1402] != null && !isNaN(genPoly[a1402]) && genPoly[f1408] != null && !isNaN(genPoly[f1408]); }
function t2699(genPoly) { if (!w4021(genPoly))
    return null; const figPoly = figma.createPolygon(); i2700(figPoly, genPoly, true); return figPoly; }
function i2700(figPoly, genPoly, isValid = false) { if (!isValid && !w4021(genPoly))
    return; figPoly.cornerRadius = genPoly[a1402]; figPoly.pointCount = Math.max(3, genPoly[f1408]); v1574(figPoly, genPoly); h2692(figPoly, genPoly); }
function u2702(r2701) { return r2701[n1393] != null && !isNaN(r2701[n1393]) && r2701[u1395] != null && !isNaN(r2701[u1395]) && r2701[l1396] != null && !isNaN(r2701[l1396]) && r2701[f1397] != null && !isNaN(r2701[f1397]) && r2701[g1398] != null && !isNaN(r2701[g1398]); }
function j2703(r2701) { if (!u2702(r2701))
    return null; const figRect = figma.createRectangle(); t2704(figRect, r2701, true); return figRect; }
function t2704(figRect, r2701, isValid = false) { if (!isValid && !u2702(r2701))
    return; const found = r2701[e1387].findIndex(e => e[0] == 'ROUND_CORNERS'); if (found > -1) {
    const corners = r2701[e1387][found];
    figRect.topLeftRadius = corners[1];
    figRect.topRightRadius = corners[2];
    figRect.bottomLeftRadius = corners[3];
    figRect.bottomRightRadius = corners[4];
}
else
    figRect.cornerRadius = r2701[g1398]; v1574(figRect, r2701); h2692(figRect, r2701); }
function v2705(r2715) { return r2715[n1393] != null && !isNaN(r2715[n1393]) && r2715[u1395] != null && !isNaN(r2715[u1395]) && r2715[l1396] != null && !isNaN(r2715[l1396]) && r2715[f1397] != null && !isNaN(r2715[f1397]) && r2715[p1403] != null && !isNaN(r2715[p1403]) && r2715[b1409] != null && !isNaN(r2715[b1409]) && r2715[t1414] != null && !isNaN(r2715[t1414]); }
function q2706(r2715) { if (!v2705(r2715))
    return null; const l2716 = figma.createStar(); b2707(l2716, r2715, true); return l2716; }
function b2707(l2716, r2715, isValid = false) { if (!isValid && !v2705(r2715))
    return; l2716.cornerRadius = r2715[p1403]; l2716.pointCount = r2715[b1409]; l2716.innerRadius = Math.min(Math.max(0, r2715[t1414] / 100), 1); v1574(l2716, r2715); h2692(l2716, r2715); }
const j4264 = [];
function p2708(t2712) { return t2712[c1415] != null && t2712[n1393] != null && !isNaN(t2712[n1393]) && t2712[u1395] != null && !isNaN(t2712[u1395]) && t2712[l1396] != null && !isNaN(t2712[l1396]) && t2712[f1397] != null && !isNaN(t2712[f1397]) && t2712[d1417] != null && t2712[d1417] != NULL && t2712[s1418] != null && !isNaN(t2712[s1418]); }
function j2709(t2712) { if (!p2708(t2712))
    return null; const j2784 = figma.createText(); b2710(j2784, t2712, true); return j2784; }
function b2710(j2784, t2712, isValid = false) { if (!isValid && !p2708(t2712))
    return null; const fontName = { family: t2712[d1417], style: t2712[a1419] }; try {
    if (!j4264.includes(fontName)) {
        figma.loadFontAsync(fontName).then(() => { j4264.push(fontName); y2711(j2784, t2712, fontName); });
    }
    else {
        y2711(j2784, t2712, fontName);
    }
}
catch (e) {
    u946(e);
} }
function y2711(j2784, t2712, fontName) { j2784.fontName = fontName; j2784.fontSize = Math.max(1, t2712[s1418]); j2784.characters = t2712[c1415]; j2784.lineHeight = { unit: 'PERCENT', value: t2712[r1422] }; j2784.letterSpacing = { unit: 'PERCENT', value: t2712[w1423] }; if (t2712[k1420] == 0)
    j2784.textAlignHorizontal = 'LEFT';
else if (t2712[k1420] == 1)
    j2784.textAlignHorizontal = 'CENTER';
else if (t2712[k1420] == 2)
    j2784.textAlignHorizontal = 'RIGHT';
else if (t2712[k1420] == 3)
    j2784.textAlignHorizontal = 'JUSTIFIED'; if (t2712[k1421] == 0)
    j2784.textAlignVertical = 'TOP';
else if (t2712[k1421] == 1)
    j2784.textAlignVertical = 'CENTER';
else if (t2712[k1421] == 2)
    j2784.textAlignVertical = 'BOTTOM'; v1574(j2784, t2712); h2692(j2784, t2712); if (t2712[o1404] == 0 && t2712[z1410] == 0)
    j2784.textAutoResize = 'WIDTH_AND_HEIGHT';
else if (t2712[o1404] == 0)
    j2784.textAutoResize = 'HEIGHT';
else
    j2784.textAutoResize = 'NONE'; }
function i2767(v2717) { return true; }
function d2738(v2717) { if (!i2767(v2717))
    return null; const h2718 = figma.createVector(); q2744(h2718, v2717, true); return h2718; }
function q2744(h2718, v2717, isValid = false) { if (!isValid && !i2767(v2717))
    return; h2718.vectorNetwork = v2717[g1400]; v1574(h2718, v2717, false); h2692(h2718, v2717); }
function v2766(h2713) { return h2713[x1407] != null && !isNaN(h2713[x1407]) && h2713[f1413] != null && !isNaN(h2713[f1413]); }
function w2737(h2713) { const n2714 = figma.createVector(); q2743(n2714, h2713, true); return n2714; }
function q2743(n2714, h2713, isValid = false) { if (!isValid && !v2766(h2713))
    return; n2714.vectorPaths = [{ windingRule: h2713[x1407] == 1 ? 'NONZERO' : 'EVENODD', data: h2713[u1401] }]; n2714.cornerRadius = h2713[f1413]; v1574(n2714, h2713, false); h2692(n2714, h2713); }
