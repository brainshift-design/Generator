var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function p1051(key, tag) { return key.substring(0, tag.length + 1) == tag + ' '; }
function g1052(key, tag) { return key.substring(tag.length + 1); }
function e1053(key) { return p1051(key, v875); }
function m1054(key) { return p1051(key, g873); }
function q1055(key) { return p1051(key, j874); }
function s1056(key) { return g1052(key, v875); }
function c1057(key) { return g1052(key, g873); }
function g1058(key) { return g1052(key, j874); }
const generatorVersion = 360;
const t867 = 2147483647;
const NULL = '';
const l868 = '  ';
const z869 = '    ';
const j870 = '\n';
const p871 = '◦ G •';
const g872 = p871 + ' ';
const g873 = 'G_NODE';
const j874 = 'G_CONN';
const v875 = 'G_PAGE';
const k876 = 'G_TEMP';
const minWindowWidth = 602;
const minWindowHeight = 39;
const identity = Object.freeze([[1, 0, 0], [0, 1, 0], [0, 0, 1]]);
const Epsilon = 0.0000001;
const Tau = Math.PI * 2;
var f2533 = false;
function f877(x, eps = 0.000000001) { return Math.abs(x) < eps ? 0 : x; }
function nozero(x, eps = 0.000000001) { return x != 0 ? x : (x < 0 ? -eps : eps); }
function c878(v, eps = 0.000000001) { return point(nozero(v.x, eps), nozero(v.y, eps)); }
function equal(a, b, eps = 0.000000001) { return Math.abs(b - a) < eps; }
function sqr(x) { return x * x; }
;
function cube(x) { return x * x * x; }
;
function f879(f) { return Math.floor(f) | 0; }
function q880(x) { x = f879(x); x--; x |= x >> 1; x |= x >> 2; x |= x >> 4; x |= x >> 8; x |= x >> 16; x |= x >> 32; return ++x; }
function gcd(a, b) { let temp; while (1) {
    temp = a % b;
    if (temp == 0)
        return b;
    a = b;
    b = temp;
} }
function distv(p1, p2) { const dx = p2.x - p1.x; const dy = p2.y - p1.y; return Math.sqrt(dx * dx + dy * dy); }
function y881(v) { let angle = Math.atan2(v.y, v.x); if (angle < 0)
    angle += Tau; return angle; }
function anglev2(v1, v2) { return anglev2_(v1.x, v1.y, v2.x, v2.y); }
function anglev2_(x1, y1, x2, y2) { const dx = x2 - x1; const dy = y2 - y1; let angle = Math.atan2(dy, dx); if (angle < 0)
    angle += Tau; return angle; }
function i883(v) { return Math.sqrt(v.x * v.x + v.y * v.y); }
function s884(v) { return point(v.x == 0 ? 0 : v.x / i883(v), v.y == 0 ? 0 : v.y / i883(v)); }
function dotv(v1, v2) { return v1.x * v2.x + v1.y * v2.y; }
function p885(a1, a2) { let diff = a2 - a1; while (diff <= -Tau / 2)
    diff += Tau; while (diff > Tau / 2)
    diff -= Tau; return diff; }
function y886(v, m) { let v3 = [v.x, v.y, 1]; let r = j950(v3, m); return point(r[0], r[1]); }
function v887(...mm) { g954(mm.length > 0, 'mulm3m3() must take at least one argument'); let result = clone(mm[0]); for (let a = 1; a < mm.length; a++) {
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
function r888(m, s) { for (let i = 0; i < 3; i++)
    for (let j = 0; j < 3; j++)
        m[i][j] /= s; return m; }
function adjugate(m) { return cofactor(transpose(m)); }
function transpose(m) { return [[m[0][0], m[1][0], m[2][0]], [m[0][1], m[1][1], m[2][1]], [m[0][2], m[1][2], m[2][2]]]; }
function cofactor(m) { return [[m[1][1] * m[2][2] - m[2][1] * m[1][2], -(m[1][0] * m[2][2] - m[2][0] * m[1][2]), m[1][0] * m[2][1] - m[2][0] * m[1][1]], [-(m[0][1] * m[2][2] - m[2][1] * m[0][2]), m[0][0] * m[2][2] - m[2][0] * m[0][2], -(m[0][0] * m[2][1] - m[2][0] * m[0][1])], [m[0][1] * m[1][2] - m[1][1] * m[0][2], -(m[0][0] * m[1][2] - m[1][0] * m[0][2]), m[0][0] * m[1][1] - m[1][0] * m[0][1]]]; }
function determinant(m) { return m[0][0] * (m[1][1] * m[2][2] - m[1][2] * m[2][1]) - m[0][1] * (m[1][0] * m[2][2] - m[2][0] * m[1][2]) + m[0][2] * (m[1][0] * m[2][1] - m[2][0] * m[1][1]); }
function v889(m) { return r888(adjugate(m), determinant(m)); }
function u890(angle) { const cosA = f877(Math.cos(angle)); const sinA = f877(Math.sin(angle)); return [[cosA, sinA, 0], [-sinA, cosA, 0], [0, 0, 1]]; }
function v891(x = 0, y = 0, k892 = 1, o893 = 1, angle = 0, f894 = 0, e895 = 0) { const cosA = Math.cos(angle); const sinA = Math.sin(angle); return [[k892 * cosA - e895 * sinA, -f894 * cosA + o893 * sinA, x], [e895 * cosA + k892 * sinA, o893 * cosA + f894 * sinA, y], [0, 0, 1]]; }
function d896(v1, v2) { return v1.x * v2.y - v1.y * v2.x; }
function u897(v1, v2) { return point(v1.x + v2.x, v1.y + v2.y); }
function sqrv(v) { return p898(v, v); }
function p898(v1, v2) { return point(v1.x * v2.x, v1.y * v2.y); }
function w899(v, s) { return point(v.x * s, v.y * s); }
function z900(v1, v2) { return point(v1.x / v2.x, v1.y / v2.y); }
function s901(v, s) { return point(v.x / s, v.y / s); }
function m902(v1, v2) { return point(v1.x - v2.x, v1.y - v2.y); }
function c903(str) { return decodeURI(encodeURIComponent(str)); }
function s904(str) { return decodeURIComponent(encodeURI(str)); }
function f905(bytes) { let str = ''; for (let i = 0; i < bytes.length; i++)
    str += String.fromCharCode(bytes[i]); return str; }
function m906(str) { return Array.from(s904(str), c => c.charCodeAt(0)); }
function s907(array, size) { const newArray = new Uint8Array(size); y908(array, newArray); return newArray; }
function y908(src, dst) { q909(src, 0, src.length, dst, 0, dst.length); }
function q909(src, e910, r911, dst, n912, x913) { const size = Math.min(r911, x913); for (let i = 0; i < size; i++)
    dst[n912 + i] = src[e910 + i]; }
function l914(w915, v916) { if (w915.length != v916.length)
    return false; for (let i = 0; i < w915.length; i++) {
    if (w915[i] != v916[i])
        return false;
} return true; }
function n917(e918, p919) { return e918.findIndex(i => p919.includes(i)) > -1; }
function p920(list) { return list ? '<==' : '<--'; }
;
function o921(list) { return list ? '==>' : '-->'; }
;
function b922(nodeId) { return g873 + ' ' + nodeId; }
function q923(name) { return j874 + ' ' + name; }
function f924(name) { return v875 + ' ' + name; }
function n925(str) { return str.toLowerCase() == 'true' || str == '1'; }
function f926(s927, a928 = false) { return g933(s927.outputNodeId, s927.outputId, s927.outputOrder, s927.inputNodeId, s927.inputId, s927.list, a928); }
function e929(outputNodeId, outputId, outputOrder, inputNodeId, inputId) { return q923(outputNodeId + ' ' + outputId + ' ' + outputOrder + ' ' + inputNodeId + ' ' + inputId); }
function r930(i243) { return e929(i243.outputNodeId, i243.outputId, i243.outputOrder, i243.inputNodeId, i243.inputId); }
function p931(i243) { return e929(i243.output.node.id, i243.output.id, i243.outputOrder, i243.input.node.id, i243.input.id); }
function q932(i243, a928 = false) { return g933(i243.output.node.id, i243.output.id, i243.outputOrder, i243.input.node.id, i243.input.id, i243.list, a928); }
function g933(outputNodeId, outputId, outputOrder, inputNodeId, inputId, list, a928 = false) { const sp = a928 ? ' ' : '  '; const jsp = a928 ? '' : ' '; const arrow = sp + g937(typeof outputOrder == 'string' ? parseInt(outputOrder) : outputOrder) + o921(typeof list == 'string' ? n925(list) : list) + sp; const join = jsp + '.' + jsp; return outputNodeId + join + outputId + arrow + inputNodeId + join + inputId; }
function g934(pageId) { return f924(pageId); }
function x935(num) { const str = num.toString(); let sup = ''; for (const c of str)
    sup += m936(c); return sup; }
function m936(c) { switch (c) {
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
function g937(num) { const str = num.toString(); let sup = ''; for (const c of str)
    sup += p938(c); return sup; }
function p938(c) { switch (c) {
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
function m939(bool) { return bool ? 'true' : 'false'; }
function isValid(val) { return val != undefined && val != null; }
function isEmpty(array) { return array.length == 0; }
function d940(array, item) { g941(array, array.indexOf(item)); }
function g941(array, index) { if (index > -1 && index < array.length)
    array.splice(index, 1); }
function x942(array) { if (isEmpty(array))
    return null; let last = array.at(-1); array.splice(array.length - 1, 1); return last; }
function b943(array) { return array[array.length - 1]; }
function r944(array, from, to) { const item = array[from]; array.splice(from, 1); array.splice(to, 0, item); }
function c945(array, item) { const index = array.indexOf(item); if (index > -1)
    array.splice(index, 1); }
function h946(y2789, array) { for (const item of array) {
    const index = y2789.indexOf(item);
    if (index > -1)
        y2789.splice(index, 1);
} }
function n947(array, where) { const index = array.findIndex(where); if (index > -1)
    array.splice(index, 1); }
function c948(styleId) { return styleId.split(',')[0] + ','; }
function i949(points) { let l4029 = ''; if (points.length < 2)
    return l4029; l4029 += 'M'; l4029 += ' ' + f877(points[0].x); l4029 += ' ' + f877(points[0].y); for (let i = 1; i < points.length; i++) {
    l4029 += ' L' + ' ' + f877(points[i].x) + ' ' + f877(points[i].y);
} return l4029; }
function point(x, y) { return { x: x, y: y }; }
function j950(v, m) { let r = [0, 0, 0]; for (let i = 0; i < 3; i++)
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
function q951(array, item, equal = null) { if (equal) {
    if (Array.isArray(item))
        item.forEach(i => q951(array, i, equal));
    else if (!array.find(i => equal(i, item)))
        array.push(item);
}
else {
    if (Array.isArray(item))
        item.forEach(i => q951(array, i));
    else if (!array.includes(item))
        array.push(item);
} }
function q952(array, item, equal) { if (Array.isArray(item))
    item.forEach(i => q952(array, i, equal));
else if (!array.find(equal))
    array.push(item); }
function z953(array, item, except) { if (Array.isArray(item))
    item.forEach(i => z953(array, i, except));
else if (!array.find(except))
    array.push(item); }
function g954(...args) { if (f2533) {
    console.assert(...args);
} }
function k955(...args) { if (f2533)
    console.error(...args); }
function r956(str, trim) { while (str.length >= trim.length && str.substring(0, trim.length) == trim)
    str = str.substring(trim.length); return str; }
function v957(str, trim) { while (str.length >= trim.length && str.substring(str.length - trim.length) == trim)
    str = str.substring(0, str.length - trim.length); return str; }
function w958(r4089) { const fills = []; for (const fill of r4089) {
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
            const j4205 = fill[1];
            const stops = [];
            for (const stop of fill[2]) {
                stops.push({ color: { r: Math.min(Math.max(0, stop[0]), 1), g: Math.min(Math.max(0, stop[1]), 1), b: Math.min(Math.max(0, stop[2]), 1), a: Math.min(Math.max(0, stop[3]), 1) }, position: stop[4] });
            }
            fills.push({ type: fill[0], gradientTransform: j4205, gradientStops: stops, blendMode: fill[3] });
            break;
        }
    }
} return fills; }
function e959(type) { return v1092.includes(type); }
const e1059 = 'LIST#';
const p1060 = 'NLIST#';
const f1061 = 'TLIST#';
const s1062 = 'SLIST#';
const l1063 = 'NULL';
const c1064 = 'VAR';
const g1065 = 'VARGRP';
const u1066 = 'START';
const z1067 = 'REPT';
const t1068 = 'CACHE';
const t1069 = 'FRZ';
const m1070 = 'TIMER';
const b1071 = 'VNAME';
const GET_LIST_VALUE_NAMES = 'GVNAMES';
const LIST_VALUE_NAMES = 'VNAMES';
const OBJECT_NAME = 'ONAME';
const g1072 = 'CMB';
const w1073 = 'LSASIT';
const p1074 = 'EXTR';
const o1075 = 'SETP';
const i1076 = 'GETP';
const g1077 = 'SUBLST';
const s1078 = 'UNIQ';
const REORDER_LIST = 'RORD';
const SHIFT_LIST = 'SHFTLST';
const s1079 = 'REVLST';
const z1080 = 'SORT';
const p1081 = 'CLMN';
const b1082 = 'CELL';
const c1083 = 'LIST';
const v1084 = 'COUNT';
const f1085 = 'LCONT';
const g1086 = 'SELECT';
const SELECT_FROM_LIST = 'LSTSEL';
const s1087 = 'IF';
const j1088 = 'LSTFLT';
const k1089 = 'DEFINE';
const n1090 = 'ANY#';
const t1091 = [e1059, p1060, f1061, s1062, g1072, p1074, o1075, i1076, g1077, c1083, v1084, f1085, z1067];
const v1092 = [e1059, p1060, f1061, s1062];
const o1093 = [l1063, c1064, g1065, ...t1091, w1073, p1074, o1075, i1076, g1077, s1078, REORDER_LIST, SHIFT_LIST, s1079, p1081, z1080, b1082, c1083, g1086, SELECT_FROM_LIST, s1087, j1088, u1066, z1067, k1089, t1068, t1069, m1070, b1071, GET_LIST_VALUE_NAMES, LIST_VALUE_NAMES, OBJECT_NAME];
const m1094 = 'NUM#';
const d1095 = 'NUM';
const NUMBER_PRECISION = 'NPREC';
const i1096 = 'NSIGN';
const r1097 = 'ABS';
const NUMBER_NEGATIVE = 'NEG';
const z1098 = 'ROUND';
const v1099 = 'SMINMAX';
const v1100 = 'MINMAX';
const t1101 = 'LIM';
const w1102 = 'NCURVE';
const s1103 = 'NANISNUM';
const q1104 = 'CONST';
const e1105 = 'DATE';
const j1106 = 'SEQ';
const j1107 = 'RANGE';
const p1108 = 'WAVE';
const y1109 = 'RAND';
const h1110 = 'NOISE';
const l1111 = 'PROB';
const j1112 = 'ACCUM';
const o1113 = 'LERP';
const f1114 = 'SOLVE';
const z1115 = 'NANIM';
const d1116 = 'SMATH';
const p1117 = 'MATH';
const p1118 = 'ADD';
const x1119 = 'SUB';
const a1120 = 'MUL';
const b1121 = 'DIV';
const q1122 = 'MOD';
const i1123 = 'EXP';
const f1124 = 'NBOOL';
const t1125 = 'NOT';
const f1126 = 'AND';
const r1127 = 'OR';
const k1128 = 'XOR';
const m1129 = 'COND';
const f1130 = 'EQ';
const r1131 = 'NE';
const h1132 = 'LT';
const x1133 = 'LE';
const w1134 = 'GT';
const f1135 = 'GE';
const s1136 = 'TRIG';
const j1137 = 'SIN';
const l1138 = 'COS';
const q1139 = 'TAN';
const w1140 = 'ATAN2';
const w1141 = 'CNVANG';
const c1142 = [p1117, d1116, p1118, x1119, a1120, b1121, q1122, i1123];
const l1143 = [f1124, t1125, f1126, r1127, k1128];
const c1144 = [m1129, f1130, r1131, h1132, x1133, w1134, f1135];
const c1145 = [s1136, j1137, l1138, q1139, w1140];
const j1146 = 'TEXT#';
const h1147 = 'TEXT';
const j1148 = 'TLEN';
const m1149 = 'TTRIM';
const z1150 = 'TSUB';
const t1151 = 'TCONT';
const b1152 = 'TCASE';
const c1153 = 'TREPL';
const u1154 = 'TJOIN';
const t1155 = 'TPAD';
const d1156 = 'TCMP';
const o1157 = 'TCHAR';
const n1158 = 'TUNI';
const x1159 = 'INDEX';
const z1160 = 'N2T';
const r1161 = 'C2T';
const z1162 = 'T2N';
const d1163 = 'T2C';
const s1164 = 'TSPLT';
const t3498 = 'TJSON';
const e1166 = 'TCSV';
const m1167 = 'FETCH';
const r1168 = 'TFILE';
const z1169 = [m1094, p1060, d1095, NUMBER_PRECISION, i1096, r1097, NUMBER_NEGATIVE, z1098, v1099, v1100, t1101, w1102, s1103, q1104, e1105, j1106, j1107, p1108, y1109, h1110, l1111, j1112, o1113, f1114, z1115, z1160, o1157, ...c1142, ...l1143, ...c1144, ...c1145, w1141];
const g1170 = [j1146, f1061, h1147, j1148, m1149, z1150, t1151, b1152, u1154, t1155, c1153, d1156, n1158, x1159, z1162, d1163, s1164, t3498, e1166, m1167, r1168];
const u1171 = 'COL#';
const d1172 = 'COL';
const y1173 = 'CVAL';
const a1174 = 'CCOR';
const e1175 = 'COLP3';
const y1176 = 'CCNT';
const e1177 = 'BLND';
const f1178 = 'CLERP';
const d1179 = 'CBLND';
const j1180 = [u1171, d1172, a1174, e1175, e1177, f1178, d1179, r1161];
const y1181 = 'FILL#';
const i1182 = 'FILL';
const x1183 = [y1181, i1182];
const m1184 = 'STRK#';
const m1185 = 'STRK';
const p1186 = [m1184, m1185];
const f1187 = 'CSTOP#';
const c1188 = 'CSTOP';
const c1189 = [f1187, c1188];
const c1190 = 'GRAD#';
const e1191 = 'GRAD';
const w1192 = [c1190, e1191];
const o1193 = 'RCRN#';
const r1194 = 'RCRN';
const f1195 = [o1193, r1194];
const w1196 = 'DRSH#';
const z1197 = 'DRSH';
const s1198 = [w1196, z1197];
const m1199 = 'INSH#';
const x1200 = 'INSH';
const x1201 = [m1199, x1200];
const p1202 = 'LBLR#';
const k1203 = 'LBLR';
const f1204 = [p1202, k1203];
const f1205 = 'BBLR#';
const p1206 = 'BBLR';
const c1207 = [f1205, p1206];
const b1208 = 'MASK#';
const q1209 = 'MASK';
const v1210 = [b1208, q1209];
const z1211 = 'BLEND#';
const i1212 = 'BLEND';
const j1213 = [z1211, i1212];
const o1214 = [...f1195, ...s1198, ...x1201, ...f1204, ...c1207, ...j1213, ...v1210];
const a1215 = [u1171, y1181, c1190, m1184, w1196, m1199, p1202, f1205, z1211, b1208];
const i1216 = 'CSTL';
const c1217 = 'SHP#';
const q1218 = 'RECT#';
const g1219 = 'RECT';
const a1220 = [q1218, g1219];
const z1221 = 'LINE#';
const j1222 = 'LINE';
const o1223 = [z1221, j1222];
const x1224 = 'ELPS#';
const c1225 = 'ELPS';
const x1226 = [x1224, c1225];
const p1227 = 'TRPZ#';
const g1228 = 'TRPZ';
const v1229 = [p1227, g1228];
const h1230 = 'POLY#';
const z1231 = 'POLY';
const l1232 = [h1230, z1231];
const t1233 = 'STAR#';
const f1234 = 'STAR';
const l1235 = [t1233, f1234];
const j1236 = 'TXTS#';
const y1237 = 'TXTS';
const r1238 = [j1236, y1237];
const h1239 = 'PT#';
const w1240 = 'PT';
const n1241 = [h1239, w1240];
const d1242 = 'PCORN';
const m1243 = 'VPATH#';
const h1244 = 'VPATH';
const c1245 = [m1243, h1244];
const v1246 = 'VPT#';
const m1247 = 'VPT';
const a1248 = [v1246, m1247];
const q1249 = 'VEDGE#';
const w1250 = 'VEDGE';
const u1251 = [q1249, w1250];
const i1252 = 'VREG#';
const l1253 = 'VREG';
const l1254 = [i1252, l1253];
const y1255 = 'VNET#';
const n1256 = 'VNET';
const a1257 = [y1255, n1256];
const n1258 = 'SGRP#';
const d1259 = 'SGRP';
const h1260 = [n1258, d1259];
const a1261 = 'FRM#';
const v1262 = 'FRM';
const g1263 = [a1261, v1262];
const i1264 = 'MOVE';
const v1265 = 'ROT';
const n1266 = 'SCALE';
const p1267 = 'SKEW';
const d1268 = 'SCENTR';
const c1269 = 'RSTX';
const r1270 = 'PLACE';
const k1271 = 'APPLY';
const PATH_LENGTH = 'PTHLEN';
const JOIN_PATHS = 'JOINPTH';
const x1277 = 'PTALPATH';
const g1278 = 'CPTONPATH';
const k1272 = 'MESPT';
const j1273 = 'VECLEN';
const k1274 = 'CIRCEN';
const ARC_FROM_POINTS = 'ARCPT';
const n1275 = 'INTLIN';
const v1276 = 'PTLERP';
const u1279 = 'BOOL';
const g1280 = 'BOOL#';
const l1281 = 'BOOLU';
const o1282 = 'BOOLS';
const q1283 = 'BOOLI';
const y1284 = 'BOOLE';
const n1285 = [u1279, g1280, l1281, o1282, q1283, y1284];
const q1286 = 'RENDER';
const z1287 = [c1217, s1062, q1218, z1221, x1224, p1227, h1230, t1233, j1236, h1239, m1243, v1246, q1249, i1252, y1255, n1258, a1261, g1280, w1196, m1199, p1202, f1205, z1211, b1208];
const i1288 = [v1265, n1266, p1267];
const h1289 = [...z1287, ...a1220, ...o1223, ...x1226, ...v1229, ...l1232, ...l1235, ...r1238, ...n1241, d1242, ...c1245, ...a1248, ...u1251, ...l1254, ...a1257, ...h1260, ...g1263, ...n1285, i1264, ...i1288, d1268, c1269, r1270, k1271, PATH_LENGTH, JOIN_PATHS, x1277, g1278, k1272, j1273, k1274, ARC_FROM_POINTS, n1275, v1276, q1286];
const y1290 = [e1059, p1060, f1061, s1062, m1094, j1146, u1171, y1181, f1187, c1190, m1184, f1187, c1190, c1217, q1218, z1221, x1224, p1227, h1230, t1233, j1236, h1239, m1243, v1246, q1249, i1252, y1255, n1258, a1261, o1193, w1196, m1199, p1202, f1205, z1211, b1208];
const i1291 = 'GROUP';
const l1292 = 'GPARAM';
const o1293 = [i1291, l1292];
const z1294 = 'CMNT';
const v1295 = 'CMNTARR';
const r1296 = 'PANEL';
const x1297 = 'ACT';
const e1298 = 'BEF';
const m1299 = 'DIS';
const p1300 = 'NOC';
const PARAM = 'PARAM';
const g1301 = 'LOG';
const i1302 = 'GRAPH';
const x1303 = [[q1122, '%'], [b1121, '/'], [x1119, '−'], [p1118, '+'], [a1120, '×'], [i1123, 'e<sup>x']];
const z1304 = [[b1121, '/'], [x1119, '−'], [p1118, '+'], [a1120, '×']];
const m1305 = 0;
const k1306 = 1;
const z1307 = 2;
const b1308 = 3;
const x1309 = [[m1305, 'not'], [k1306, 'xor'], [z1307, 'or'], [b1308, 'and']];
const c1310 = 0;
const q1311 = 1;
const t1312 = 2;
const s1313 = 3;
const x1314 = 4;
const w1315 = 5;
const m1316 = [[c1310, '<'], [q1311, '≤'], [t1312, '≠'], [s1313, '='], [x1314, '≥'], [w1315, '>']];
const f1317 = 0;
const h1318 = 1;
const v1319 = 2;
const f1320 = 3;
const n1321 = 4;
const g1322 = 5;
const w1323 = [[f1317, 'sin'], [h1318, 'cos'], [v1319, 'tan'], [f1320, 'asin'], [n1321, 'acos'], [g1322, 'atan']];
const e1324 = 'EMPTY';
const j1325 = 'CONNECT';
const z1326 = 'CREATE';
const w1327 = 'CREATE_INSERT';
const j1328 = 'DELETE';
const o1329 = 'DISCONNECT';
const w1330 = 'LINK_STYLE';
const y1331 = 'LINK_VARIABLE';
const t1332 = 'LINK_VARIABLE_GROUP';
const u1333 = 'MAKE_ACTIVE';
const MAKE_NOT_CONDITION_ACTION = 'MAKE_NOT_CONDITION';
const f1334 = 'MAKE_PASSIVE';
const z1335 = 'PASTE';
const c1336 = 'RECONNECT';
const q1337 = 'REMOVE';
const r1338 = 'RENAME';
const m1339 = 'REORDER_INPUTS';
const c1340 = 'REORDER_CONNECTIONS';
const q1341 = 'SELECT';
const y1342 = 'SELECT_MOVE';
const l1343 = 'MOVE_NODES';
const f1344 = 'SET_PARAM_VALUE';
const SET_MULTIPLE_VALUES_ACTION = 'SET_MULTIPLE_VALUES';
const h1345 = 'SET_PARAM_SETTING';
const p1346 = 'SET_NODE_RECT';
const s1347 = 'TOGGLE_DISABLE';
const q1348 = 'TOGGLE_PARAM_HEADER';
const d1349 = 'SET_CURRENT_GRAPH';
const j1350 = 'CREATE_PAGE';
const l1351 = 'DELETE_PAGE';
const p1352 = 'GROUP_NODES';
const i1353 = 'UNGROUP_NODES';
const g1354 = 'HIGHLIGHT_NODES';
const SCROLL_LIST_NODE_ACTION = 'SCROLL_LIST_NODE';
const SET_LIST_DIVIDER_ACTION = 'SET_LIST_DIVIDER';
const SET_NODE_PARAM_ACTION = 'SET_NODE_PARAM';
const b1355 = 'BNORM';
const z1356 = 'BDARK';
const m1357 = 'BMULT';
const t1358 = 'BPDRK';
const p1359 = 'BBURN';
const m1360 = 'BLITE';
const o1361 = 'BSCRN';
const q1362 = 'BPLGT';
const m1363 = 'BDODG';
const a1364 = 'BOVER';
const d1365 = 'BSOFT';
const x1366 = 'BHARD';
const y1367 = 'BDIFF';
const n1368 = 'BEXCL';
const x1369 = 'BHUE';
const t1370 = 'BSAT';
const v1371 = 'BCOL';
const o1372 = 'BLUM';
const v1373 = [[b1355, 'normal', 'NORMAL'], [z1356, 'darken', 'DARKEN'], [m1357, 'multiply', 'MULTIPLY'], [t1358, 'plus darker', 'LINEAR_BURN'], [p1359, 'color burn', 'COLOR_BURN'], [m1360, 'lighten', 'LIGHTEN'], [o1361, 'screen', 'SCREEN'], [q1362, 'plus lighter', 'LINEAR_DODGE'], [m1363, 'color dodge', 'COLOR_DODGE'], [a1364, 'overlay', 'OVERLAY'], [d1365, 'soft light', 'SOFT_LIGHT'], [x1366, 'hard light', 'HARD_LIGHT'], [y1367, 'difference', 'DIFFERENCE'], [n1368, 'exclusion', 'EXCLUSION'], [x1369, 'hue', 'HUE'], [t1370, 'saturation', 'SATURATION'], [v1371, 'color', 'COLOR'], [o1372, 'luminosity', 'LUMINOSITY']];
const s1374 = [['thin', 100], ['extra light', 200], ['light', 300], ['regular', 400], ['medium', 500], ['semi bold', 600], ['bold', 700], ['extra bold', 800], ['black', 900]];
const o1375 = 0;
const o1376 = 1;
const v1377 = 2;
const q1378 = 2;
const w1379 = 3;
const t1380 = 3;
const h1381 = 4;
const f1382 = 4;
const f1383 = 5;
const f1384 = 6;
const k1385 = 7;
const i1386 = 8;
const k1387 = 9;
const o1388 = 10;
const d1389 = 11;
const z1390 = 12;
const q1391 = 13;
const x1392 = 14;
const b1393 = 15;
const z1394 = 16;
const o1395 = 17;
const a1396 = 18;
const l1397 = 19;
const k1398 = 20;
const b1399 = 21;
const k1400 = 22;
const q1401 = 23;
const e1402 = 24;
const s1403 = 24;
const k1404 = 25;
const o1405 = 26;
const x1406 = 27;
const u1407 = 28;
const q1408 = 28;
const s1409 = 28;
const m1410 = 28;
const e1411 = 28;
const v1412 = 28;
const w1413 = 28;
const w1414 = 28;
const f1415 = 29;
const i1416 = 29;
const k1417 = 29;
const g1418 = 29;
const p1419 = 29;
const u1420 = 29;
const m1421 = 30;
const k1422 = 30;
const k1423 = 30;
const y1424 = 30;
const d1425 = 31;
const x1426 = 31;
const n1427 = 32;
const v1428 = 33;
const d1429 = 34;
const n1430 = 35;
const d1431 = 36;
const l1432 = 37;
const d2790 = '12345679ABCDEFGHJKLMNPQRSTUVWXYZ';
function j845(array, chars = d2790) { let y847 = ''; let len = array.length; let i = 0; while (len > 0) {
    if (len >= 5) {
        const a0 = array[i], a1 = array[i + 1], a2 = array[i + 2], a3 = array[i + 3], a4 = array[i + 4];
        y847 += chars[(a0 & 0xF8) >>> 3];
        y847 += chars[((a0 & 0x07) << 2) | ((a1 & 0xC0) >>> 6)];
        y847 += chars[(a1 & 0x3E) >>> 1];
        y847 += chars[((a1 & 0x01) << 4) | ((a2 & 0xF0) >>> 4)];
        y847 += chars[((a2 & 0x0F) << 1) | ((a3 & 0x80) >>> 7)];
        y847 += chars[(a3 & 0x7C) >>> 2];
        y847 += chars[((a3 & 0x03) << 3) | ((a4 & 0xE0) >>> 5)];
        y847 += chars[(a4 & 0x1F)];
    }
    else if (len == 4) {
        const a0 = array[i], a1 = array[i + 1], a2 = array[i + 2], a3 = array[i + 3];
        y847 += chars[(a0 & 0xF8) >>> 3];
        y847 += chars[((a0 & 0x07) << 2) | ((a1 & 0xC0) >>> 6)];
        y847 += chars[(a1 & 0x3E) >>> 1];
        y847 += chars[((a1 & 0x01) << 4) | ((a2 & 0xF0) >>> 4)];
        y847 += chars[((a2 & 0x0F) << 1) | ((a3 & 0x80) >>> 7)];
        y847 += chars[(a3 & 0x7C) >>> 2];
        y847 += chars[((a3 & 0x03) << 3)];
    }
    else if (len == 3) {
        const a0 = array[i], a1 = array[i + 1], a2 = array[i + 2];
        y847 += chars[(a0 & 0xF8) >>> 3];
        y847 += chars[((a0 & 0x07) << 2) | ((a1 & 0xC0) >>> 6)];
        y847 += chars[(a1 & 0x3E) >>> 1];
        y847 += chars[((a1 & 0x01) << 4) | ((a2 & 0xF0) >>> 4)];
        y847 += chars[((a2 & 0x0F) << 1)];
    }
    else if (len == 2) {
        const a0 = array[i], a1 = array[i + 1];
        y847 += chars[(a0 & 0xF8) >>> 3];
        y847 += chars[((a0 & 0x07) << 2) | ((a1 & 0xC0) >>> 6)];
        y847 += chars[(a1 & 0x3E) >>> 1];
        y847 += chars[((a1 & 0x01) << 4)];
    }
    else if (len == 1) {
        const a0 = array[i];
        y847 += chars[(a0 & 0xF8) >>> 3];
        y847 += chars[((a0 & 0x07) << 2)];
    }
    i += 5;
    len -= 5;
} return y847; }
function l846(y847, chars = d2790) { const array = []; let len = y847.length; let c = 0; while (len > 0) {
    if (len >= 8) {
        const c0 = chars.indexOf(y847[c]), c1 = chars.indexOf(y847[c + 1]), c2 = chars.indexOf(y847[c + 2]), c3 = chars.indexOf(y847[c + 3]), c4 = chars.indexOf(y847[c + 4]), c5 = chars.indexOf(y847[c + 5]), c6 = chars.indexOf(y847[c + 6]), c7 = chars.indexOf(y847[c + 7]);
        array.push((c0 << 3) | ((c1 & 0x1C) >>> 2));
        array.push(((c1 & 0x03) << 6) | (c2 << 1) | ((c3 & 0x10) >>> 4));
        array.push(((c3 & 0x0F) << 4) | ((c4 & 0x1E) >>> 1));
        array.push(((c4 & 0x01) << 7) | (c5 << 2) | ((c6 & 0x18) >>> 3));
        array.push(((c6 & 0x07) << 5) | c7);
    }
    else if (len == 7) {
        const c0 = chars.indexOf(y847[c]), c1 = chars.indexOf(y847[c + 1]), c2 = chars.indexOf(y847[c + 2]), c3 = chars.indexOf(y847[c + 3]), c4 = chars.indexOf(y847[c + 4]), c5 = chars.indexOf(y847[c + 5]), c6 = chars.indexOf(y847[c + 6]);
        array.push((c0 << 3) | ((c1 & 0x1C) >>> 2));
        array.push(((c1 & 0x03) << 6) | (c2 << 1) | ((c3 & 0x10) >>> 4));
        array.push(((c3 & 0x0F) << 4) | ((c4 & 0x1E) >>> 1));
        array.push(((c4 & 0x01) << 7) | (c5 << 2) | ((c6 & 0x18) >>> 3));
    }
    else if (len == 5) {
        const c0 = chars.indexOf(y847[c]), c1 = chars.indexOf(y847[c + 1]), c2 = chars.indexOf(y847[c + 2]), c3 = chars.indexOf(y847[c + 3]), c4 = chars.indexOf(y847[c + 4]);
        array.push((c0 << 3) | ((c1 & 0x1C) >>> 2));
        array.push(((c1 & 0x03) << 6) | (c2 << 1) | ((c3 & 0x10) >>> 4));
        array.push(((c3 & 0x0F) << 4) | ((c4 & 0x1E) >>> 1));
    }
    else if (len == 4) {
        const c0 = chars.indexOf(y847[c]), c1 = chars.indexOf(y847[c + 1]), c2 = chars.indexOf(y847[c + 2]), c3 = chars.indexOf(y847[c + 3]);
        array.push((c0 << 3) | ((c1 & 0x1C) >>> 2));
        array.push(((c1 & 0x03) << 6) | (c2 << 1) | ((c3 & 0x10) >>> 4));
    }
    else if (len == 2) {
        const c0 = chars.indexOf(y847[c]), c1 = chars.indexOf(y847[c + 1]);
        array.push((c0 << 3) | ((c1 & 0x1C) >>> 2));
    }
    c += 8;
    len -= 8;
} return array; }
function r2095(nodeKey, h4001) { const log = b2096(v1540(nodeKey, false)); if (h4001) {
    console.log('%c%s\n%c%s', 'background: #fa24; color: white;', c1057(nodeKey), 'background: #fa44; color: #edc;', log);
}
else {
    console.log('%c%s\n%c%s', 'background: #fdb; color: black;', c1057(nodeKey), 'background: #fed; color: black;', log);
} }
function b2096(json) { let m4030 = json.replace('{\n', '').replace('\n}', '').replace('[\n' + l868, '').replace('\n' + l868 + ']', '').split(l868 + '"params":\n').join('').split('": "').join(': ').split('", "').join(': ').split(l868 + '"').join(l868).split(l868 + l868 + '["').join(l868 + l868).split('",\n').join('\n').split('"\n').join('\n').split('"],\n').join('\n'); if (m4030[m4030.length - 1] == '"')
    m4030 = m4030.substring(0, m4030.length - 1); if (m4030.substring(m4030.length - 2) == '"]')
    m4030 = m4030.substring(0, m4030.length - 2); return m4030; }
function j2097(json) { let m4030 = json.replace('{\n', '').replace('\n}', '').replace('[\n' + l868, '').replace('\n' + l868 + ']', ''); return m4030; }
function l2098(i243, h4001) { const j4208 = f926(i243, true); if (h4001) {
    console.log('%c%s', 'background: #4f44; color: #ded', j4208);
}
else {
    console.log('%c%s', 'background: #cfc; color: black;', j4208);
} }
console.clear();
figma.payments.setPaymentStatusInDevelopment({ type: 'PAID' });
figma.on('documentchange', r1511);
figma.on('selectionchange', h1519);
figma.on('close', z1512);
o1501(true);
figma.clientStorage.getAsync('pro').then(data => { figma.showUI(__html__, { visible: false, themeColors: true, title: 'Generator' }); });
var u2702 = figma.viewport.zoom;
setInterval(c1516, 100);
const p2791 = 'clock_';
const p2792 = 1000;
var u2793 = false;
var objectCenterSize = 15;
function r1513() { (function () {
    return __awaiter(this, void 0, void 0, function* () { let t2794 = yield figma.currentPage.getPluginData(figma.currentUser.id + ',windowWidth'); let b2795 = yield figma.currentPage.getPluginData(figma.currentUser.id + ',windowHeight'); let p2796; let r2797; if (t2794 === NULL) {
        p2796 = 800;
        figma.currentPage.setPluginData(figma.currentUser.id + ',windowWidth', t2794.toString());
    }
    else
        p2796 = parseInt(t2794); if (b2795 === NULL) {
        r2797 = 600;
        figma.currentPage.setPluginData(figma.currentUser.id + ',windowHeight', b2795.toString());
    }
    else
        r2797 = parseInt(b2795); figma.ui.resize(Math.max(minWindowWidth, p2796), Math.max(minWindowHeight, r2797)); figma.ui.show(); const fonts = yield figma.listAvailableFontsAsync(); const eula = (yield figma.clientStorage.getAsync('eula')) === 'true'; const tutorials = (yield figma.clientStorage.getAsync('tutorials')) === 'true'; const isLocked = p1518(); l1520({ cmd: 'uiReturnFigStartGenerator', currentUser: figma.currentUser, viewportRect: figma.viewport.bounds, viewportZoom: figma.viewport.zoom, fonts: fonts, eula: eula, tutorials: tutorials, isLocked: isLocked, windowWidth: p2796, windowHeight: r2797 }); });
})(); }
function x1514() { o1501(); figma.showUI(__html__, { visible: false, themeColors: true }); }
function u1515() { setInterval(x1517, p2792); }
function c1516() { if (figma.viewport.zoom == u2702)
    return; u2702 = figma.viewport.zoom; v2690(); a1534(); g1536(); }
function x1517() { i1541(p2791 + figma.currentUser.sessionId.toString(), Date.now().toString()); }
function p1518() { const clocks = figma.currentPage.getPluginDataKeys().filter(k => k.length > p2791.length && k.substring(0, p2791.length) == p2791 && k.substring(p2791.length) != figma.currentUser.sessionId.toString()).map(k => parseInt(v1540(k))); clocks.sort(); const now = Date.now(); const locked = clocks.length > 0 && now - clocks[clocks.length - 1] < p2792 * 2; return locked; }
function h1519() { v2690(); }
var s2723 = new Array();
var s2725 = new Array();
function c1500(nodeIds) { for (let i = b2759.length - 1; i >= 0; i--)
    if (!b2759[i].removed && nodeIds.includes(b2759[i].getPluginData('nodeId')))
        b2759.splice(i, 1); for (let i = h2775.length - 1; i >= 0; i--)
    if (h2775[i].removed || nodeIds.includes(h2775[i].getPluginData('nodeId')))
        h2775.splice(i, 1); figma.currentPage.findAll(o => nodeIds.includes(o.getPluginData('nodeId'))).forEach(o => { if (!o.removed)
    o.remove(); }); s2723 = s2723.filter(a => !nodeIds.includes(a.nodeId)); }
function o1501(q1502 = false) { for (const p1507 of figma.currentPage.children) {
    if (p1507.removed)
        continue;
    if (p1507.getPluginData('objectId') != '' && p1507.getPluginData('userId') == figma.currentUser.id && (parseInt(p1507.getPluginData('retain')) == 0 || q1502))
        p1507.remove();
} }
function m1503(nodeIds, r1504) { for (let i = s2723.length - 1; i >= 0; i--) {
    const p2724 = s2723[i];
    if (!nodeIds.includes(p2724.nodeId))
        continue;
    for (let j = p2724.objects.length - 1; j >= 0; j--) {
        const p1507 = p2724.objects[j];
        if (p1507.removed || !l1505(p1507, r1504)) {
            if (!p1507.removed)
                p1507.remove();
            c945(p2724.objects, p1507);
            if (b2759.includes(p1507))
                c945(b2759, p1507);
            if (h2775.includes(p1507))
                c945(h2775, p1507);
        }
        if (!p1507.removed) {
            if (parseInt(p1507.getPluginData('retain')) == 2)
                c1526(p1507);
        }
    }
    if (isEmpty(p2724.objects))
        c945(s2723, p2724);
} }
function l1505(p1507, r1504) { if (p1507.type == d1259 || p1507.type == v1262) {
    for (const child of p1507.children) {
        const found = l1505(child, r1504);
        if (found)
            return found;
    }
}
else {
    const found = r1504.find(o => p1507.getPluginData('objectId') == o[v1377] && p1507.getPluginData('userId') == figma.currentUser.id || o[f1383] == 2 && o[f1383] == p1507.getPluginData('retain'));
    if (found)
        return found;
} return null; }
function s1508(nodeIds, a1509) { const paintStyles = figma.getLocalPaintStyles(); paintStyles.filter(s => nodeIds.includes(s.getPluginData('nodeId'))).forEach(s => { const nodeId = s.getPluginData('nodeId'); const existing = n925(s.getPluginData('existing')); if (!existing) {
    s.remove();
}
else if (a1509) {
    n947(s2725, a => a.nodeId == nodeId);
    s.setPluginData('type', NULL);
    s.setPluginData('nodeId', NULL);
    s.setPluginData('existing', NULL);
} }); if (a1509)
    s2725 = s2725.filter(a => !nodeIds.includes(a.nodeId)); }
var f1510 = false;
function r1511(e) { for (const change of e.documentChanges) {
    switch (change.type) {
        case 'STYLE_CREATE':
            if (!change.style)
                break;
            if (!f1510) {
                change.style.setPluginData('type', NULL);
                change.style.setPluginData('nodeId', NULL);
                change.style.setPluginData('existing', NULL);
            }
            break;
        case 'STYLE_PROPERTY_CHANGE': {
            if (!change.style)
                break;
            if (!f1510) {
                const msg = { cmd: 'uiStylePropertyChange', styleId: c948(change.id), properties: change.properties, name: '', paints: [] };
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
                l1520(msg);
            }
            break;
        }
        case 'STYLE_DELETE':
            l1520({ cmd: 'uiStyleDelete', styleId: change.id });
            break;
    }
} f1510 = false; }
function z1512() { o1501(); l1520({ cmd: 'updateMetrics' }); }
figma.ui.onmessage = function (msg) { msg = JSON.parse(msg); if (msg.cmd == 'returnUiGetValueForFigma')
    return; switch (msg.cmd) {
    case 'figStartGenerator':
        r1513();
        break;
    case 'figRestartGenerator':
        x1514();
        break;
    case 'figFinishStart':
        u1515();
        break;
    case 'figDockWindowNormal':
        k2732('normal');
        break;
    case 'figDockWindowMaximize':
        k2732('maximize');
        break;
    case 'figDockWindowTop':
        k2732('top');
        break;
    case 'figDockWindowLeft':
        k2732('left');
        break;
    case 'figDockWindowRight':
        k2732('right');
        break;
    case 'figDockWindowBottom':
        k2732('bottom');
        break;
    case 'figGetMousePosition':
        s1586(msg.clientPosition);
        break;
    case 'figResizeWindow':
        a1589(msg.width, msg.height);
        break;
    case 'figSetWindowRect':
        o1587(msg.x, msg.y, msg.width, msg.height);
        break;
    case 'figNotify':
        d1590(msg);
        break;
    case 'figGetLocalData':
        k1538(msg.key);
        break;
    case 'figSetLocalData':
        l1539(msg.key, msg.value);
        break;
    case 'figClearAllLocalData':
        b4025();
        break;
    case 'figGetPageData':
        v1540(msg.key);
        break;
    case 'figSetPageData':
        i1541(msg.key, msg.value);
        break;
    case 'figSavePages':
        i1546(msg.pageIds, msg.pageJson, msg.currentPageId);
        break;
    case 'figLoadNodesAndConns':
        i1543(msg.debugMode);
        break;
    case 'figSaveNodes':
        b1547(msg.nodeIds, msg.nodeJson);
        break;
    case 'figGetAllLocalTemplateNames':
        b2729();
        break;
    case 'figSaveLocalTemplate':
        r1548(msg.x4026, msg.template);
        break;
    case 'figRemoveConnsToNodes':
        g1549(msg.nodeIds);
        break;
    case 'figRemoveSavedNodesAndConns':
        b1550(msg.nodeIds);
        break;
    case 'figRemoveAllSavedNodesAndConns':
        s1551();
        break;
    case 'figLogAllSavedNodesAndConns':
        s1552(msg.h4001);
        break;
    case 'figLogAllSavedNodes':
        j1553(msg.h4001);
        break;
    case 'figLogAllSavedConns':
        u1554(msg.h4001);
        break;
    case 'figLogAllSavedPageKeys':
        z1555(msg.h4001);
        break;
    case 'figLogAllSavedPages':
        q1556(msg.h4001);
        break;
    case 'figLogAllSavedConnKeys':
        t1557(msg.h4001);
        break;
    case 'figLogAllLocalData':
        q1558(msg.h4001);
        break;
    case 'figGetValue':
        x1559(msg.key, msg.spec);
        break;
    case 'figRemoveSavedPage':
        c1561(msg.pageId);
        break;
    case 'figRemoveAllSavedPages':
        z1562();
        break;
    case 'figSaveConnection':
        u1563(msg.key, msg.json);
        break;
    case 'figSaveConnections':
        j1564(msg.keys, msg.json);
        break;
    case 'figUpdateSavedConnections':
        u1565(msg.curKeys, msg.newKeys, msg.json);
        break;
    case 'figDeleteSavedConnection':
        t1566(msg.key);
        break;
    case 'figRemoveAllSavedConnections':
        m1567();
        break;
    case 'figDeleteSavedConnectionsToNode':
        r1568(msg.nodeId);
        break;
    case 'figDeleteSavedConnectionsFromNode':
        d1569(msg.nodeId);
        break;
    case 'figRemovePluginDataFromAllLocalStyles':
        n1570();
        break;
    case 'figGetAllLocalVariables':
        c1594(msg.nodeId, msg.px, msg.py);
        break;
    case 'figLinkNodeToVariable':
        i1596(msg.nodeId, msg.variableId);
        break;
    case 'figUpdateVariable':
        d1597(msg.variableId, msg.value);
        break;
    case 'figGetAllLocalColorStyles':
        h1571(msg.nodeId, msg.px, msg.py);
        break;
    case 'figLinkNodeToExistingColorStyle':
        n1572(msg.nodeId, msg.styleId);
        break;
    case 'figGetObjectSize':
        u1525(msg.object);
        break;
    case 'figGetVariableUpdates':
        j1560(msg.linkedVarIds);
        break;
    case 'figUpdateShowIds':
        u2793 = msg.u2793;
        break;
    case 'figUpdateObjectCenterSize':
        objectCenterSize = msg.objectCenterSize;
        break;
    case 'figDeleteAllObjects':
        o1501();
        break;
    case 'figUpdateObjectsAndStyles':
        w2738 = 0;
        n2739 = 0;
        msg.objects.forEach(o => o.counted = false);
        o2726(null, msg.objects, msg.p4015, msg.y2043, msg.nodeIds, msg.h2755, msg.d2756, msg.a270);
        p1577(msg);
        break;
    case 'figDeleteObjectsAndStyles':
        c1500(msg.nodeIds);
        s1508(msg.nodeIds, msg.a1509);
        break;
    case 'figDeleteObjectsExcept':
        m1503(msg.nodeIds, msg.ignoreObjects);
        break;
    case 'figTriggerUndo':
        figma.triggerUndo();
        break;
    case 'figCommitUndo':
        figma.commitUndo();
        break;
} l1520({ cmd: 'uiEndFigMessage', msgCmd: msg.cmd }); };
function l1520(msg) { figma.ui.postMessage(JSON.stringify(msg)); }
function n2727(key) {
    return __awaiter(this, void 0, void 0, function* () { return yield figma.clientStorage.getAsync(key); });
}
function k1538(key) { if (key == 'canvasEmpty') {
    l1520({ cmd: 'uiReturnFigGetLocalData', key: key, value: figma.currentPage.children.length == 0 });
}
else if (key == 'debugWarningCrash') {
    figma.clientStorage.getAsync('debugWarning').then(data => { l1520({ cmd: 'uiReturnFigGetLocalData', key: key, value: data }); });
}
else {
    figma.clientStorage.getAsync(key).then(data => { l1520({ cmd: 'uiReturnFigGetLocalData', key: key, value: data }); });
} }
function l1539(key, value, postToUi = true) { figma.clientStorage.setAsync(key, value); if (postToUi) {
    l1520({ cmd: 'uiReturnFigSetLocalData', key: key, value: value });
} }
function b4025() {
    return __awaiter(this, void 0, void 0, function* () { const keys = yield figma.clientStorage.keysAsync(); for (const key of keys)
        figma.clientStorage.deleteAsync(key); });
}
function v1540(key, postToUi = true) { const data = figma.currentPage.getPluginData(key); if (postToUi) {
    l1520({ cmd: 'uiReturnFigGetPageData', key: key, value: data });
} return data; }
function i1541(key, value) { x1542(key); figma.currentPage.setPluginData(key, value); }
function x1542(key) { figma.currentPage.setPluginData(key, ''); }
function i1543(debugMode) { const pageKeys = figma.currentPage.getPluginDataKeys().filter(k => e1053(k)); const nodeKeys = figma.currentPage.getPluginDataKeys().filter(k => m1054(k)); const connKeys = figma.currentPage.getPluginDataKeys().filter(k => q1055(k)); if (!debugMode)
    f1545(nodeKeys, connKeys); const pages = pageKeys.map(k => figma.currentPage.getPluginData(k)); const nodes = nodeKeys.map(k => figma.currentPage.getPluginData(k)); const w2115 = connKeys.map(k => figma.currentPage.getPluginData(k)); const pageOrder = figma.currentPage.getPluginData('pageOrder').split(','); const currentPageId = figma.currentPage.getPluginData('currentPageId'); j1544(nodes); const showAllColorSpaces = figma.currentPage.getPluginData('showAllColorSpaces'); l1520({ cmd: 'uiReturnFigLoadNodesAndConns', showAllColorSpaces: showAllColorSpaces, pageKeys: pageKeys, pageJson: pages, pageOrder: pageOrder, currentPageId: currentPageId, nodeKeys: nodeKeys, nodeJson: nodes, connKeys: connKeys, connJson: w2115 }); }
function j1544(nodes) { s2725 = []; const paintStyles = figma.getLocalPaintStyles(); for (const j3012 of nodes) {
    const node = JSON.parse(j3012);
    if (node.type == i1216) {
        const style = paintStyles.find(s => { const nodeId = s.getPluginData('nodeId'); return nodeId == node.id; });
        if (style) {
            s2725.push({ nodeId: node.id, existing: n925(node.existing), styles: [style] });
        }
    }
} }
function f1545(nodeKeys, connKeys) { const p2728 = '"loading": "true"'; const not = '{\n'; const set = '{\n' + l868 + p2728 + ',\n'; nodeKeys.forEach(k => figma.currentPage.setPluginData(k, figma.currentPage.getPluginData(k).replace(set, not).replace(not, set))); connKeys.forEach(k => figma.currentPage.setPluginData(k, figma.currentPage.getPluginData(k).replace(set, not).replace(not, set))); }
function i1546(pageIds, pageJson, currentPageId) { for (let i = 0; i < pageIds.length; i++) {
    i1541(f924(pageIds[i]), pageJson[i]);
} i1541('pageOrder', pageIds.join(',')); i1541('currentPageId', currentPageId); }
function b1547(nodeIds, nodeJson) { for (let i = 0; i < nodeIds.length; i++) {
    i1541(b922(nodeIds[i]), nodeJson[i]);
} }
function b2729() {
    return __awaiter(this, void 0, void 0, function* () { let keys = yield figma.clientStorage.keysAsync(); keys = keys.filter(k => k.length >= k876.length && k.substring(0, k876.length) == k876); l1520({ cmd: 'uiReturnGetAllLocalTemplateNames', templateNames: keys }); });
}
function r1548(x4026, template) { l1539(k876 + ' ' + x4026, template); }
function g1549(nodeIds) { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => q1055(k)); for (const key of connKeys) {
    const parts = g1058(key).split(' ');
    if (nodeIds.includes(parts[0]) || nodeIds.includes(parts[2]))
        x1542(key);
} }
function b1550(nodeIds) { g1549(nodeIds); const nodeKeys = figma.currentPage.getPluginDataKeys().filter(k => m1054(k) && nodeIds.includes(c1057(k))); nodeKeys.forEach(k => x1542(k)); }
function s1551() { const nodeKeys = figma.currentPage.getPluginDataKeys().filter(k => m1054(k)); const connKeys = figma.currentPage.getPluginDataKeys().filter(k => q1055(k)); for (const key of nodeKeys)
    x1542(key); for (const key of connKeys)
    x1542(key); }
function s1552(h4001) { j1553(h4001); u1554(h4001); }
function j1553(h4001) { figma.currentPage.getPluginDataKeys().filter(k => m1054(k)).forEach(k => r2095(k, h4001)); }
function u1554(h4001) { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => q1055(k)); connKeys.sort((key1, key2) => { const p1 = g1058(key1).split(' '); const p2 = g1058(key2).split(' '); if (p1[2] != p2[2])
    return p1[2] < p2[2] ? -1 : 1; if (p1[3] != p2[3])
    return parseInt(p1[3]) - parseInt(p2[3]); if (p1[2] == p2[0])
    return -1; if (p2[2] == p1[0])
    return 1; return 0; }); connKeys.forEach(k => l2098(JSON.parse(figma.currentPage.getPluginData(k)), h4001)); }
function z1555(h4001) { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => e1053(k)); connKeys.forEach(k => console.log('%c' + k, 'background: #fff; color: ' + (h4001 ? 'black' : 'white'))); const pageOrder = figma.currentPage.getPluginData('pageOrder'); console.log('%c' + pageOrder, 'background: #fff; color: ' + (h4001 ? 'black' : 'white')); }
function q1556(h4001) { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => e1053(k)); connKeys.forEach(k => console.log('%c' + figma.currentPage.getPluginData(k), 'background: #fff; color: ' + (h4001 ? 'black' : 'white'))); const pageOrder = figma.currentPage.getPluginData('pageOrder'); console.log('%c' + pageOrder, 'background: #fff; color: ' + (h4001 ? 'black' : 'white')); }
function t1557(h4001) { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => q1055(k)); connKeys.forEach(k => console.log('%c' + k, 'background: #dff; color: ' + (h4001 ? 'black' : 'white'))); }
function q1558(h4001) { figma.clientStorage.keysAsync().then(keys => keys.forEach(k => figma.clientStorage.getAsync(k).then(val => console.log(k + ': ' + val)))); }
function x1559(key, spec) {
    return __awaiter(this, void 0, void 0, function* () { let result = null; switch (key) {
        case 'getVariableData':
            result = t1595(spec);
            break;
        case 'getPaidStatus':
            result = figma.payments.status.type;
            break;
        case 'figSubscribe': {
            yield figma.payments.initiateCheckoutAsync({ interstitial: 'PAID_FEATURE' });
            result = figma.payments.status.type;
            break;
        }
    } l1520({ cmd: 'returnFigGetValue', value: result }); });
}
function j1560(varIds) { l1520({ cmd: 'uiReturnFigGetVariableUpdates', values: t1595(varIds) }); }
function c1561(pageId) { x1542(g934(pageId)); const pageOrder = v1540('pageOrder').split(','); n947(pageOrder, id => id == pageId); i1541('pageOrder', pageOrder.join(',')); }
function z1562() { const pageKeys = figma.currentPage.getPluginDataKeys().filter(k => e1053(k)); pageKeys.forEach(k => x1542(k)); x1542('pageOrder'); }
function u1563(key, json) { i1541(key, json); }
function j1564(_keys, _json) { const keys = JSON.parse(_keys); const json = JSON.parse(_json); for (let i = 0; i < keys.length; i++)
    i1541(keys[i], json[i]); }
function u1565(_curKeys, _newKeys, _json) { const curKeys = JSON.parse(_curKeys); const newKeys = JSON.parse(_newKeys); const json = JSON.parse(_json); for (let i = 0; i < curKeys.length; i++) {
    x1542(curKeys[i]);
    i1541(newKeys[i], json[i]);
} }
function t1566(key) { x1542(key); }
function m1567() { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => q1055(k)); connKeys.forEach(k => x1542(k)); }
function r1568(nodeId) { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => q1055(k)); for (const key of connKeys) {
    const parts = key.split(' ');
    if (parts[4] == nodeId)
        x1542(key);
} }
function d1569(nodeId) { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => q1055(k)); for (const key of connKeys) {
    const parts = key.split(' ');
    if (parts[1] == nodeId)
        x1542(key);
} }
function n1570() { const m1574 = figma.getLocalPaintStyles(); for (const style of m1574) {
    style.setPluginData('type', '');
    style.setPluginData('nodeId', '');
    style.setPluginData('existing', '');
} }
var v2730 = null;
var d4027 = () => v2730 = null;
var b2731 = 'normal';
function s1586(clientPosition) { l1520({ cmd: 'uiReturnFigGetMousePosition', position: { x: 0, y: 0 }, clientPosition: clientPosition, viewportZoom: figma.viewport.zoom, viewportRect: figma.viewport.bounds }); }
function o1587(x, y, width, height) { return; (function () {
    return __awaiter(this, void 0, void 0, function* () { const rect = { x: Math.round(x), y: Math.round(y), width: Math.floor(Math.max(0, width)), height: Math.floor(Math.max(0, height)) }; figma.ui.reposition(rect.x, rect.y); figma.ui.resize(rect.width, rect.height); figma.clientStorage.setAsync('windowX', rect.x); figma.clientStorage.setAsync('windowY', rect.y); figma.clientStorage.setAsync('windowWidth', rect.width); figma.clientStorage.setAsync('windowHeight', rect.height); l1520({ cmd: 'uiReturnFigSetWindowRect' }); });
})(); }
function s1588(dock, rect, bounds) { switch (dock) {
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
function a1589(width, height) { (function () {
    return __awaiter(this, void 0, void 0, function* () { width = Math.floor(Math.max(0, width)); height = Math.floor(Math.max(0, height)); figma.ui.resize(width, height); figma.currentPage.setPluginData(figma.currentUser.id + ',windowWidth', width.toString()); figma.currentPage.setPluginData(figma.currentUser.id + ',windowHeight', height.toString()); l1520({ cmd: 'uiReturnFigResizeWindow', width: width, height: height }); });
})(); }
function k2732(dock) {
    return __awaiter(this, void 0, void 0, function* () { if (dock != 'normal' && b2731 == 'normal') {
        figma.clientStorage.setAsync('normalWindowX', yield figma.clientStorage.getAsync('normalWindowX'));
        figma.clientStorage.setAsync('normalWindowY', yield figma.clientStorage.getAsync('normalWindowY'));
        figma.clientStorage.setAsync('normalWindowWidth', yield figma.clientStorage.getAsync('normalWindowWidth'));
        figma.clientStorage.setAsync('normalWindowHeight', yield figma.clientStorage.getAsync('normalWindowHeight'));
    } b2731 = dock; figma.clientStorage.setAsync('windowDock', dock); a1589(yield figma.clientStorage.getAsync('windowWidth'), yield figma.clientStorage.getAsync('windowHeight')); });
}
function d1590(msg) { m1591(msg.text, msg.prefix, msg.delay, msg.error, msg.e1592, msg.m1593); }
function m1591(text, prefix = 'Generator ', delay = 400, error = false, e1592 = '', m1593 = NULL) { const options = { timeout: delay, error: error, onDequeue: d4027 }; if (e1592 != '') {
    options['button'] = { text: e1592 };
    if (m1593.substring(0, 'removeConnection'.length) == 'removeConnection') {
        options['button']['action'] = () => t1566(m1593.split(',')[1]);
    }
    else {
        switch (m1593) {
            case 'hideClearUndoWarning':
                options['button']['action'] = () => l1520({ cmd: 'uiHideClearUndoWarning' });
                break;
        }
    }
} if (v2730)
    v2730.cancel(); v2730 = figma.notify(prefix + text, options); }
function e2733(key, params = null) {
    return __awaiter(this, void 0, void 0, function* () { return yield g2734(key, params); });
}
function g2734(key, params = null) {
    return __awaiter(this, void 0, void 0, function* () { return new Promise((resolve, reject) => { const timeout = 60000; l1520(Object.assign({ cmd: 'uiGetValueForFigma', key: key }, (params || {}))); const g2735 = setTimeout(() => reject(new Error('Timeout: Result not received by Figma within the specified time')), timeout); function y4028(msg) { msg = JSON.parse(msg); if (msg.cmd === 'returnUiGetValueForFigma') {
        clearTimeout(g2735);
        resolve({ key: msg.key, value: msg.value });
        figma.ui.off('message', y4028);
    } } figma.ui.on('message', y4028); }); });
}
var r2736 = [];
var m2737 = [];
var w2738 = 0;
var n2739 = 0;
function c1521(w111) { return (w111[f1383] === 2 ? '' : g872) + (u2793 ? w111[v1377] : w111[w1379]); }
function x1522(b1506, addObject = null) { if (!v1524(b1506))
    return null; let p1507; switch (b1506[o1375]) {
    case g1219:
        p1507 = a2707(b1506);
        break;
    case j1222:
        p1507 = j2786(b1506);
        break;
    case c1225:
        p1507 = n2782(b1506);
        break;
    case z1231:
        p1507 = l2703(b1506);
        break;
    case f1234:
        p1507 = x2710(b1506);
        break;
    case y1237:
        p1507 = z2713(b1506);
        break;
    case w1240:
        p1507 = x2689(b1506);
        break;
    case h1244:
        p1507 = a2741(b1506);
        break;
    case n1256:
        p1507 = v2742(b1506);
        break;
    case u1279:
        p1507 = o2743(b1506);
        break;
    case d1259:
        p1507 = a2744(b1506);
        break;
    case v1262:
        p1507 = g2745(b1506);
        break;
} if (addObject && p1507 != undefined && p1507 != null && !p1507.removed) {
    p1507.name = c1521(b1506);
    g954(b1506[o1375] == d1259 || !!p1507, 'no Figma object created');
    if (p1507 != undefined && p1507 != null) {
        p1507.setPluginData('retain', b1506[f1383].toString());
        if (b1506[f1383] < 2) {
            p1507.setPluginData('userId', figma.currentUser.id);
            p1507.setPluginData('sessionId', figma.currentUser.sessionId.toString());
            p1507.setPluginData('type', b1506[o1375]);
            p1507.setPluginData('nodeId', b1506[o1376]);
            p1507.setPluginData('objectId', b1506[v1377]);
            p1507.setPluginData('isCenter', m939(b1506[k1398]));
            if (b1506[o1375] == w1240)
                b2759.push(p1507);
            if (b1506[l1397])
                v1537(p1507);
        }
        addObject(p1507);
    }
} if (!b1506.counted) {
    n2739++;
    b1506.counted = true;
} return p1507; }
function w1523(p1507, b1506) { if (!v1524(b1506) || p1507 == undefined || p1507 == null || p1507.removed)
    return; p1507.name = c1521(b1506); p1507.setPluginData('retain', b1506[f1383].toString()); switch (b1506[o1375]) {
    case g1219:
        f2708(p1507, b1506);
        break;
    case j1222:
        m2787(p1507, b1506);
        break;
    case c1225:
        c2783(p1507, b1506);
        break;
    case z1231:
        t2704(p1507, b1506);
        break;
    case f1234:
        o2711(p1507, b1506);
        break;
    case y1237:
        o2714(p1507, b1506);
        break;
    case w1240:
        g2746(p1507, b1506);
        break;
    case h1244:
        z2747(p1507, b1506);
        break;
    case n1256:
        z2748(p1507, b1506);
        break;
    case u1279:
        n2749(p1507, b1506);
        break;
    case d1259:
        b2750(p1507, b1506);
        break;
    case v1262:
        g2751(p1507, b1506);
        break;
} if (p1507 != undefined && p1507 != null && !p1507.removed) {
    p1507.parent.appendChild(p1507);
    if (b1506[l1397])
        v1537(p1507);
} if (!b1506.counted) {
    n2739++;
    b1506.counted = true;
} }
function o2726(s2752, y2753, u2754, y2043 = -1, nodeIds = [], h2755 = false, d2756 = false, a270 = false) {
    return __awaiter(this, void 0, void 0, function* () { let b2757 = NULL; let w2758 = null; let abort = false; const b3636 = []; let c2740 = 0; r2736.push(...nodeIds); if (y2043 > -1)
        w2738 = y2043; for (const b1506 of y2753) {
        m2737.push(b1506);
        if (b1506[o1376] != b2757) {
            b2757 = b1506[o1376];
            w2758 = s2723.find(a => a.nodeId == b1506[o1376]);
            if (!w2758) {
                s2723.push(w2758 = { nodeId: b1506[o1376], objects: [] });
            }
        }
        const addObject = p1507 => { if (s2752 != undefined && s2752 != null && !s2752.removed)
            s2752.appendChild(p1507);
        else
            w2758.objects.push(p1507); };
        let objects = s2752 != undefined && s2752 != null && !s2752.removed ? s2752.children : w2758.objects;
        let p1507 = objects.find(o => o.removed || o.getPluginData('userId') == figma.currentUser.id && o.getPluginData('objectId') == b1506[v1377]);
        if (p1507 != undefined && p1507 != null && p1507.removed) {
            d940(objects, p1507);
            if (b2759.includes(p1507))
                c945(b2759, p1507);
            if (h2775.includes(p1507))
                c945(h2775, p1507);
        }
        if (p1507 == undefined || p1507 == null || p1507.removed) {
            const newObj = x1522(b1506, addObject);
            b3636.push(newObj);
        }
        else if (p1507 != undefined && p1507 != null && !p1507.removed && p1507.getPluginData('type') == b1506[o1375].toString()) {
            w1523(p1507, b1506);
            if (p1507 != undefined && p1507 != null && !p1507.removed)
                b3636.push(p1507);
        }
        else {
            p1507.remove();
            if (b2759.includes(p1507))
                c945(b2759, p1507);
            if (h2775.includes(p1507))
                c945(h2775, p1507);
            x1522(b1506, addObject);
        }
        c2740++;
        if (c2740 >= u2754) {
            const result = yield e2733('returnObjectUpdate', { w2738: w2738, n2739: n2739 });
            abort = result.value;
            c2740 = 0;
            if (abort)
                break;
        }
    } if (s2752 != undefined && s2752 != null && !s2752.removed) {
        for (const p1507 of s2752.children) {
            if (p1507 != undefined && p1507 != null && p1507.removed || !y2753.find(o => o[v1377] == p1507.getPluginData('objectId') && p1507.getPluginData('userId') == figma.currentUser.id))
                p1507.remove();
        }
    } for (const point of b2759) {
        if (point != undefined && point != null && !point.removed && !point.parent.removed)
            point.parent.appendChild(point);
    } if (d2756 && !abort) {
        m1503(r2736, m2737);
        r2736 = [];
        m2737 = [];
        if (a270 && b3636.length > 0) {
            figma.viewport.scrollAndZoomIntoView(b3636);
            const bounds = z1527(b3636);
            figma.viewport.zoom = Math.min(figma.viewport.bounds.width * figma.viewport.zoom / bounds.width - 0.05, figma.viewport.bounds.height * figma.viewport.zoom / bounds.height - 0.05);
        }
    } yield e2733('returnObjectUpdate', { w2738: w2738, n2739: n2739 }); });
}
function v1524(b1506) { switch (b1506[o1375]) {
    case g1219: return o2706(b1506);
    case j1222: return t2768(b1506);
    case c1225: return h2769(b1506);
    case z1231: return a4024(b1506);
    case f1234: return w2709(b1506);
    case y1237: return d2712(b1506);
    case w1240: return x4023(b1506);
    case h1244: return q2770(b1506);
    case n1256: return x2771(b1506);
    case u1279: return j2772(b1506);
    case d1259: return k2773(b1506);
    case v1262: return q2774(b1506);
} }
function u1525(b1506) { (() => __awaiter(this, void 0, void 0, function* () { const p1507 = x1522(b1506); const width = p1507.width; const height = p1507.height; p1507.remove(); l1520({ cmd: 'uiForwardToGenerator', msg: { cmd: 'returnFigGetObjectSize', objectId: b1506[v1377], width: width, height: height } }); }))(); }
function c1526(p1507) { p1507.setPluginData('type', ''); p1507.setPluginData('nodeId', ''); p1507.setPluginData('userId', ''); p1507.setPluginData('sessionId', ''); p1507.setPluginData('objectId', ''); p1507.setPluginData('isCenter', ''); p1507.setPluginData('retain', ''); }
function z1527(objects) { const bounds = { left: 0, top: 0, right: 0, bottom: 0 }; for (const w111 of objects) {
    if (w111.x < bounds.left || bounds.left == bounds.right)
        bounds.left = w111.x;
    if (w111.y < bounds.top || bounds.top == bounds.bottom)
        bounds.top = w111.y;
    if (w111.x + w111.width > bounds.right || bounds.left == bounds.right)
        bounds.right = w111.x + w111.width;
    if (w111.y + w111.height > bounds.bottom || bounds.top == bounds.bottom)
        bounds.bottom = w111.y + w111.height;
} return { x: bounds.left, y: bounds.top, width: bounds.right - bounds.left, height: bounds.bottom - bounds.top }; }
const h2775 = [];
const l2776 = [];
function p1528(y1529, q1530) { const effects = []; for (const effect of y1529) {
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
                if (q1530 && !isNaN(spread))
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
function m2696(p1507, b1506, phantom = true) { n1533(p1507, b1506); q2697(p1507, b1506, phantom); q2698(p1507, b1506); p1507.opacity = b1506[b1399]; p1507.blendMode = b1506[k1400]; const maskType = b1506[q1401]; p1507.isMask = maskType > 0; if (p1507.isMask) {
    switch (maskType) {
        case 1:
            p1507.maskType = 'ALPHA';
            break;
        case 2:
            p1507.maskType = 'VECTOR';
            break;
        case 3:
            p1507.maskType = 'LUMINANCE';
            break;
    }
} if (p1507.isMask && p1507.fills.length == 0 && p1507.strokes.length == 0)
    p1507.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 }, opacity: 1, blendMode: 'NORMAL' }]; }
function q2698(p1507, b1506) { if (!!b1506[o1388] && !isEmpty(b1506[o1388])) {
    p1507.fills = w958(b1506[o1388]);
    if (h2775.includes(p1507))
        c945(h2775, p1507);
}
else
    p1507.fills = []; }
function q2697(p1507, b1506, phantom = true) { if (b1506[d1389] != null && !isEmpty(b1506[d1389])) {
    x1532(p1507, w958(b1506[d1389]), b1506[z1390], b1506[q1391], b1506[x1392], b1506[b1393], b1506[z1394], d2699(b1506[o1395]));
    if (b1506[l1397])
        p1507.setPluginData('dashes', b1506[o1395]);
    if (h2775.includes(p1507))
        c945(h2775, p1507);
    if (b1506[l1397])
        q951(l2776, p1507);
}
else if (isEmpty(b1506[o1388]) && isEmpty(b1506[d1389]) && !b1506[q1401] && phantom) {
    u1535(p1507);
    q951(h2775, p1507);
}
else
    p1507.strokes = []; }
function d2699(k1531) { k1531 = k1531; k1531 = r956(k1531, ','); k1531 = v957(k1531, ','); k1531 = k1531.trim(); return k1531 == '' ? [] : k1531.split(',').map(s => Math.max(0, parseFloat(s))); }
function p2700(k1531) { k1531 = k1531; k1531 = r956(k1531, ','); k1531 = v957(k1531, ','); k1531 = k1531.trim(); return k1531 == '' ? [] : k1531.split(',').map(s => Math.max(0, parseFloat(s) / u2702)); }
function x1532(p1507, fills, weight, align, join, miterLimit, cap, dashes = []) { p1507.strokes = fills; p1507.strokeWeight = Math.max(0, weight); p1507.strokeAlign = align; p1507.strokeJoin = join; const miterAngle = miterLimit / 360 * Tau; const a2777 = 1 / Math.sin(miterAngle / 2); p1507.strokeMiterLimit = Math.min(Math.max(0, a2777), 16); p1507.strokeCap = cap; p1507.dashPattern = dashes; }
function n1533(p1507, b1506) { if (!!b1506[a1396] && !isEmpty(b1506[a1396])) {
    const q1530 = b1506[o1375] == g1219 || b1506[o1375] == c1225 || b1506[o1375] == v1262;
    p1507.effects = p1528(b1506[a1396], q1530);
}
else
    p1507.effects = []; }
function a1534() { for (const w111 of h2775) {
    if (w111.removed)
        c945(h2775, w111);
    else
        u1535(w111);
} }
function u1535(w111) { const back = figma.currentPage.backgrounds.find(b => b.type == 'SOLID'); let phantomColor; if (back) {
    const l = back.color.r * 0.2126 + back.color.g * 0.7152 + back.color.b * 0.0722;
    phantomColor = l > 0.5 ? { r: 0, g: 0, b: 0 } : { r: 1, g: 1, b: 1 };
}
else
    phantomColor = { r: 1, g: 0, b: 1 }; x1532(w111, [{ type: 'SOLID', color: phantomColor, opacity: 0.5 }], 1 / u2702, 'CENTER', 'MITER', 1, 'NONE', [1 / u2702, 2 / u2702]); }
function g1536() { for (const p1507 of l2776) {
    if (p1507.removed)
        c945(l2776, p1507);
    else
        v1537(p1507);
} }
function v1537(p1507) { p1507.strokeWeight = Math.max(0, 1.5 / u2702); if (n925(p1507.getPluginData('isCenter'))) {
    const path = p1507.vectorPaths[0];
    const parts = path.data.split(' ');
    let t = { x: parseFloat(parts[1]), y: parseFloat(parts[2]) };
    let c = { x: parseFloat(parts[4]), y: parseFloat(parts[5]) };
    let r = { x: parseFloat(parts[7]), y: parseFloat(parts[8]) };
    const a = 2;
    const b = 0.05;
    const f = 1 - Math.pow(1 - Math.min(u2702, 1), a) / Math.pow(a, b);
    t = u897(c, w899(s884(m902(t, c)), objectCenterSize / f));
    r = u897(c, w899(s884(m902(r, c)), objectCenterSize / f));
    parts[1] = t.x;
    parts[2] = t.y;
    parts[4] = c.x;
    parts[5] = c.y;
    parts[7] = r.x;
    parts[8] = r.y;
    const s2778 = { windingRule: path.windingRule, data: parts.join(' ') };
    p1507.vectorPaths = [s2778];
} const dashes = p1507.getPluginData('dashes'); if (dashes != '')
    p1507.dashPattern = p2700(dashes); }
function h1571(nodeId, px, py) { const _styles = figma.getLocalPaintStyles(); const styles = new Array(); for (const c168 of _styles) {
    const _nodeId = c168.getPluginData('nodeId');
    const _existing = c168.getPluginData('existing');
    const existing = !!_existing;
    const style = { id: c168.id, nodeId: _nodeId, name: c168.name, existing: existing, paints: new Array() };
    let onlyPaint = true;
    for (const m2780 of c168.paints) {
        if (m2780.type == 'SOLID') {
            style.paints.push([m2780.color.r, m2780.color.g, m2780.color.b, m2780.opacity]);
        }
        else {
            onlyPaint = false;
            break;
        }
    }
    if (onlyPaint)
        styles.push(style);
} l1520({ cmd: 'uiReturnFigGetAllLocalColorStyles', nodeId: nodeId, px: px, py: py, styles: JSON.stringify(styles) }); }
function n1572(nodeId, styleId) { const m1574 = figma.getLocalPaintStyles(); if (styleId != NULL)
    d1573(m1574, nodeId, styleId);
else
    c1575(m1574, nodeId); }
function d1573(m1574, nodeId, styleId, clearExisting = true) { const i2779 = s2725.find(a => a.nodeId == nodeId); if (i2779 && clearExisting)
    c1575(m1574, nodeId); const p1579 = m1574.find(s => s.id == styleId); g954(!!p1579, 'figStyle should be found here'); p1579.setPluginData('type', i1216); p1579.setPluginData('nodeId', nodeId); p1579.setPluginData('existing', m939(true)); s2725.push({ nodeId: nodeId, existing: true, styles: [p1579] }); return p1579; }
function c1575(m1574, nodeId) { const p1579 = m1574.find(s => s.getPluginData('nodeId') == nodeId); g954(!!p1579, 'figStyle should be found here'); if (p1579) {
    p1579.setPluginData('type', NULL);
    p1579.setPluginData('nodeId', NULL);
    p1579.setPluginData('existing', NULL);
    n947(s2725, a => a.nodeId == nodeId);
} return p1579; }
function e1576(styles, l1580) { const p1579 = figma.createPaintStyle(); p1579.setPluginData('type', l1580[o1375]); p1579.setPluginData('nodeId', l1580[o1376]); p1579.name = l1580[t1380]; setStylePaints(p1579, l1580); styles.push(p1579); l1520({ cmd: 'uiSetStyleId', nodeId: l1580[o1376], styleId: p1579.id }); return p1579; }
function p1577(msg) { let b2757 = NULL; let i2779; for (const l1580 of msg.styles) {
    if (l1580[o1376] != b2757) {
        b2757 = l1580[o1376];
        i2779 = s2725.find(a => a.nodeId == l1580[o1376]);
        if (!i2779) {
            i2779 = { nodeId: l1580[o1376], styles: [] };
            s2725.push(i2779);
        }
    }
    else
        i2779 = null;
    const p1579 = i2779.styles[0];
    const m1574 = figma.getLocalPaintStyles();
    const localStyle = m1574.find(s => s.getPluginData('nodeId') == l1580[o1376]);
    if (isValid(p1579) && !isValid(localStyle)) {
        d940(i2779.styles, p1579);
    }
    const existing = isValid(p1579) && isValid(localStyle) && p1579.getPluginData('existing');
    if (!isValid(p1579) || !isValid(localStyle)) {
        if (!existing) {
            f1510 = true;
            n1572(l1580[o1376], l1580[q1378]);
        }
    }
    else if (isValid(p1579) && p1579.getPluginData('type') == l1580[o1375]) {
        f1510 = true;
        n1578(localStyle, l1580);
    }
} }
function n1578(p1579, l1580) { setStylePaints(p1579, l1580); p1579.name = l1580[t1380]; }
function getStylePaints(stylePaints) { const paints = new Array(); for (const m2780 of stylePaints) {
    const fill = m2780[1].split(' ');
    switch (m2780[0]) {
        case 'SOLID':
            paints.push({ type: 'SOLID', color: { r: Math.min(Math.max(0, parseFloat(fill[0]) / 0xff), 1), g: Math.min(Math.max(0, parseFloat(fill[1]) / 0xff), 1), b: Math.min(Math.max(0, parseFloat(fill[2]) / 0xff), 1) }, opacity: Math.min(Math.max(0, parseFloat(fill[3]) / 100), 1) });
            break;
    }
} return paints; }
function setStylePaints(p1579, l1580) { if (!isEmpty(l1580[f1382]))
    p1579.paints = getStylePaints(l1580[f1382]);
else
    p1579.paints = []; }
function c1594(nodeId, px, py) { const o2781 = figma.variables.getLocalVariables(); const variables = new Array(); for (const _var of o2781) {
    const variable = { id: _var.id, resolvedType: _var.resolvedType, name: _var.name, collectionName: figma.variables.getVariableCollectionById(_var.variableCollectionId).name };
    variables.push(variable);
} l1520({ cmd: 'uiReturnFigGetAllLocalVariables', nodeId: nodeId, px: px, py: py, variables: JSON.stringify(variables), nCollections: figma.variables.getLocalVariableCollections().length }); }
function t1595(varIds) { const o2781 = figma.variables.getLocalVariables(); const variables = varIds.map(id => o2781.find(v => v.id == id)); let values = []; for (let i = 0; i < varIds.length; i++) {
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
function i1596(nodeId, varId) { const o2781 = figma.variables.getLocalVariables(); y1598(o2781, nodeId, varId); }
function d1597(varId, value) { const o2781 = figma.variables.getLocalVariables(); let variable = o2781.find(v => v.id == varId); if (!variable)
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
function y1598(o2781, nodeId, varId) { let variable = o2781.find(v => v.id == varId); if (!variable)
    return null; const [resolvedVar, values] = figGetResolvedVariableValues(variable); l1520({ cmd: 'uiReturnFigLinkNodeToVariable', nodeId: nodeId, variableId: resolvedVar ? resolvedVar.id : NULL, variableName: resolvedVar ? resolvedVar.name : '', resolvedType: resolvedVar ? resolvedVar.resolvedType : NULL, values: values }); return resolvedVar; }
function figGetResolvedVariableValues(variable) { const values = []; if (!variable)
    return values; const collection = figma.variables.getVariableCollectionById(variable.variableCollectionId); for (const mode of collection.modes) {
    let value = variable.valuesByMode[mode.modeId];
    while (value && value['type'] === 'VARIABLE_ALIAS') {
        variable = figma.variables.getVariableById(value.id);
        value = variable.valuesByMode[mode.modeId];
    }
    values.push(value);
} return [variable, values]; }
function b1581(tl, tr, bl) { let vr = point(tr.x - tl.x, tr.y - tl.y); let vb = point(bl.x - tl.x, bl.y - tl.y); let sx = vr.x; let sy = vb.y; let kx = -vr.y; let ky = -vb.x; let dx = -tl.x; let dy = -tl.y; const _sx = kx / nozero(sx); const _sy = ky / nozero(sy); let j4205 = v887([[1, _sy, 0], [_sx, 1, 0], [0, 0, 1]], v891(dx, dy)); j4205 = v889(j4205); const a = y881(vr); if (a > Tau / 4 && a < Tau * 3 / 4)
    j4205 = v887(j4205, v891(0, 0, 1, 1, Tau / 2)); if (determinant(j4205) < 0)
    j4205 = v887(j4205, v891(0, 0, -1, 1, 0)); return j4205; }
function i1582(p1507, tl, tr, bl) { const j4205 = b1581(tl, tr, bl); p1507.relativeTransform = [j4205[0], j4205[1]]; }
function j1583(p1507, b1506, setSize = true, noHeight = 0.01) { if (!b1506[f1384] || !b1506[k1385] || !b1506[i1386])
    return; const xp0 = b1506[f1384]; const xp1 = b1506[k1385]; const xp2 = b1506[i1386]; i1582(p1507, xp0, xp1, xp2); if (setSize) {
    const k892 = distv(xp0, xp1);
    const o893 = distv(xp0, xp2);
    const height = b1506[o1375] == y1237 ? b1506[p1419] : b1506[x1406];
    if (!p1507.removed) {
        p1507.resizeWithoutConstraints(Math.max(0.01, k892), height ? Math.max(0.01, o893) : noHeight);
    }
} }
function x1584(v2694, l2695) { if (v2694.removed)
    return; v2694.resizeWithoutConstraints(0.01, 0.01); v2694.setPluginData('actualX', l2695[e1402].toString()); v2694.setPluginData('actualY', l2695[k1404].toString()); v2694.x = l2695[e1402]; v2694.y = l2695[k1404]; v2694.rotation = l2695[k1398] ? 45 : 0; }
function y1585(v2694) { if (!v2694.removed)
    v2694.resizeWithoutConstraints(0.01, 0.01); }
function j2772(genBool) { return genBool.children.length > 0; }
function o2743(genBool) { let objects = []; for (const w111 of genBool.children)
    x1522(w111, o => objects = [...objects, o]); let figBool = null; if (!isEmpty(objects)) {
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
    j1583(figBool, genBool);
    if (!j2772(genBool))
        return figBool;
} return figBool; }
function n2749(figBool, genBool, isValid = false) { if (!isValid && !j2772(genBool)) {
    figBool.remove();
    return;
} j1583(figBool, genBool); o2726(figBool, genBool.children, genBool.children.length); }
function h2769(u2760) { return u2760[e1402] != null && !isNaN(u2760[e1402]) && u2760[k1404] != null && !isNaN(u2760[k1404]) && u2760[o1405] != null && !isNaN(u2760[o1405]) && u2760[x1406] != null && !isNaN(u2760[x1406]) && u2760[q1408] != null && !isNaN(u2760[q1408]) && u2760[f1415] != null && !isNaN(u2760[f1415]) && u2760[m1421] != null && !isNaN(u2760[m1421]) && u2760[d1425] != null && !isNaN(u2760[d1425]); }
function n2782(u2760) { if (!h2769(u2760))
    return null; const b2761 = figma.createEllipse(); c2783(b2761, u2760, true); return b2761; }
function c2783(b2761, u2760, isValid = false) { if (!isValid && !h2769(u2760))
    return; z2784(b2761, u2760); if (b2759.includes(b2761))
    j2691(b2761);
else
    m2696(b2761, u2760); }
function z2784(b2761, u2760) { b2761.cornerRadius = u2760[q1408]; const start = u2760[f1415] / 360 * (Math.PI * 2); const sweep = u2760[m1421] / 100 * (Math.PI * 2); b2761.arcData = { startingAngle: start, endingAngle: start + sweep, innerRadius: Math.min(Math.max(0, u2760[d1425] / 100), 1) }; j1583(b2761, u2760); }
function q2774(k2762) { return k2762[e1402] != null && !isNaN(k2762[e1402]) && k2762[k1404] != null && !isNaN(k2762[k1404]) && k2762[o1405] != null && !isNaN(k2762[o1405]) && k2762[x1406] != null && !isNaN(k2762[x1406]) && k2762[w1414] != null && !isNaN(k2762[w1414]); }
function g2745(k2762) { if (!q2774(k2762))
    return null; const e2763 = figma.createFrame(); if (e2763) {
    o2785(e2763, k2762);
    let objects = [];
    for (const w111 of k2762[u1420])
        x1522(w111, o => objects = [...objects, o]);
    for (const w111 of objects)
        e2763.appendChild(w111);
} return e2763; }
function g2751(e2763, k2762) { o2785(e2763, k2762); o2726(e2763, k2762[u1420], k2762[u1420].length); }
function o2785(e2763, k2762) { e2763.cornerRadius = k2762[w1414]; j1583(e2763, k2762); m2696(e2763, k2762, k2762[u1420].length == 0); }
function k2773(b2764) { return true; }
function a2744(b2764) { let objects = []; for (const w111 of b2764[s1403])
    x1522(w111, o => objects = [...objects, o]); const v2765 = !isEmpty(objects) ? figma.group(objects, figma.currentPage) : null; if (v2765)
    b2750(v2765, b2764); return v2765; }
function b2750(v2765, b2764) { if (b2764[s1403].length == 0) {
    v2765.remove();
    return;
} o2726(v2765, b2764[s1403], b2764[s1403].length); n1533(v2765, b2764); }
function t2768(e2766) { return e2766[e1402] != null && !isNaN(e2766[e1402]) && e2766[k1404] != null && !isNaN(e2766[k1404]) && e2766[o1405] != null && !isNaN(e2766[o1405]); }
function j2786(e2766) { if (!t2768(e2766))
    return null; const z2767 = figma.createLine(); m2787(z2767, e2766, true); return z2767; }
function m2787(z2767, e2766, isValid = false) { if (!isValid && !t2768(e2766))
    return; j1583(z2767, e2766, true, 0); m2696(z2767, e2766); }
var b2759 = [];
function x4023(l2695) { return l2695[e1402] != null && !isNaN(l2695[e1402]) && l2695[k1404] != null && !isNaN(l2695[k1404]); }
function x2689(l2695) { const v2694 = l2695[k1398] ? figma.createRectangle() : figma.createEllipse(); if (!x4023(l2695))
    return v2694; if (b2759.includes(v2694))
    n2693(v2694, l2695);
else
    g2746(v2694, l2695); return v2694; }
function g2746(v2694, l2695) { x1584(v2694, l2695); y2692(v2694); }
function v2690() { l1520({ cmd: 'uiUpdateZoom', zoom: figma.viewport.zoom }); for (const point of b2759)
    j2691(point); }
function j2691(v2694) { y1585(v2694); y2692(v2694); }
function n2693(v2694, l2695) { x1584(v2694, l2695); y2692(v2694); }
function y2692(v2694) { if (v2694.removed)
    return; const m3734 = n925(v2694.getPluginData('isCenter')); const t2701 = figma.currentPage.selection.includes(v2694); const color = m3734 ? [0xf2, 0x48, 0x22] : t2701 ? [12, 140, 233] : [255, 255, 255]; const border = m3734 ? [255, 255, 255] : t2701 ? [255, 255, 255] : [12, 140, 233]; v2694.fills = w958([['SOLID', color[0], color[1], color[2], 100]]); const effects = []; effects.push(...p1528([['DROP_SHADOW', border[0] / 255, border[1] / 255, border[2] / 255, 1, 0, 0, 0, (m3734 ? 3 : t2701 ? 5 : 3.6) / u2702, 'NORMAL', true, true]], true)); effects.push(...p1528([['DROP_SHADOW', color[0] / 255, color[1] / 255, color[2] / 255, 1, 0, 0, 0, (t2701 ? 4 : 2.4) / u2702, 'NORMAL', true, true]], true)); v2694.effects = effects; }
function a4024(genPoly) { return genPoly[e1402] != null && !isNaN(genPoly[e1402]) && genPoly[k1404] != null && !isNaN(genPoly[k1404]) && genPoly[o1405] != null && !isNaN(genPoly[o1405]) && genPoly[x1406] != null && !isNaN(genPoly[x1406]) && genPoly[e1411] != null && !isNaN(genPoly[e1411]) && genPoly[k1417] != null && !isNaN(genPoly[k1417]); }
function l2703(genPoly) { if (!a4024(genPoly))
    return null; const figPoly = figma.createPolygon(); t2704(figPoly, genPoly, true); return figPoly; }
function t2704(figPoly, genPoly, isValid = false) { if (!isValid && !a4024(genPoly))
    return; figPoly.cornerRadius = genPoly[e1411]; figPoly.pointCount = Math.max(3, genPoly[k1417]); j1583(figPoly, genPoly); m2696(figPoly, genPoly); }
function o2706(i2705) { return i2705[e1402] != null && !isNaN(i2705[e1402]) && i2705[k1404] != null && !isNaN(i2705[k1404]) && i2705[o1405] != null && !isNaN(i2705[o1405]) && i2705[x1406] != null && !isNaN(i2705[x1406]) && i2705[u1407] != null && !isNaN(i2705[u1407]); }
function a2707(i2705) { if (!o2706(i2705))
    return null; const figRect = figma.createRectangle(); f2708(figRect, i2705, true); return figRect; }
function f2708(figRect, i2705, isValid = false) { if (!isValid && !o2706(i2705))
    return; const found = i2705[a1396].findIndex(e => e[0] == 'ROUND_CORNERS'); if (found > -1) {
    const corners = i2705[a1396][found];
    figRect.topLeftRadius = corners[1];
    figRect.topRightRadius = corners[2];
    figRect.bottomLeftRadius = corners[3];
    figRect.bottomRightRadius = corners[4];
}
else
    figRect.cornerRadius = i2705[u1407]; j1583(figRect, i2705); m2696(figRect, i2705); }
function w2709(s2719) { return s2719[e1402] != null && !isNaN(s2719[e1402]) && s2719[k1404] != null && !isNaN(s2719[k1404]) && s2719[o1405] != null && !isNaN(s2719[o1405]) && s2719[x1406] != null && !isNaN(s2719[x1406]) && s2719[v1412] != null && !isNaN(s2719[v1412]) && s2719[g1418] != null && !isNaN(s2719[g1418]) && s2719[k1423] != null && !isNaN(s2719[k1423]); }
function x2710(s2719) { if (!w2709(s2719))
    return null; const i2720 = figma.createStar(); o2711(i2720, s2719, true); return i2720; }
function o2711(i2720, s2719, isValid = false) { if (!isValid && !w2709(s2719))
    return; i2720.cornerRadius = s2719[v1412]; i2720.pointCount = s2719[g1418]; i2720.innerRadius = Math.min(Math.max(0, s2719[k1423] / 100), 1); j1583(i2720, s2719); m2696(i2720, s2719); }
const n4266 = [];
function d2712(k2716) { return k2716[y1424] != null && k2716[e1402] != null && !isNaN(k2716[e1402]) && k2716[k1404] != null && !isNaN(k2716[k1404]) && k2716[o1405] != null && !isNaN(k2716[o1405]) && k2716[x1406] != null && !isNaN(k2716[x1406]) && k2716[x1426] != null && k2716[x1426] != NULL && k2716[n1427] != null && !isNaN(k2716[n1427]); }
function z2713(k2716) { if (!d2712(k2716))
    return null; const j2788 = figma.createText(); o2714(j2788, k2716, true); return j2788; }
function o2714(j2788, k2716, isValid = false) { if (!isValid && !d2712(k2716))
    return null; const fontName = { family: k2716[x1426], style: k2716[v1428] }; try {
    if (!n4266.includes(fontName)) {
        figma.loadFontAsync(fontName).then(() => { n4266.push(fontName); i2715(j2788, k2716, fontName); });
    }
    else {
        i2715(j2788, k2716, fontName);
    }
}
catch (e) {
    k955(e);
} }
function i2715(j2788, k2716, fontName) { j2788.fontName = fontName; j2788.fontSize = Math.max(1, k2716[n1427]); j2788.characters = k2716[y1424]; j2788.lineHeight = { unit: 'PERCENT', value: k2716[d1431] }; j2788.letterSpacing = { unit: 'PERCENT', value: k2716[l1432] }; if (k2716[d1429] == 0)
    j2788.textAlignHorizontal = 'LEFT';
else if (k2716[d1429] == 1)
    j2788.textAlignHorizontal = 'CENTER';
else if (k2716[d1429] == 2)
    j2788.textAlignHorizontal = 'RIGHT';
else if (k2716[d1429] == 3)
    j2788.textAlignHorizontal = 'JUSTIFIED'; if (k2716[n1430] == 0)
    j2788.textAlignVertical = 'TOP';
else if (k2716[n1430] == 1)
    j2788.textAlignVertical = 'CENTER';
else if (k2716[n1430] == 2)
    j2788.textAlignVertical = 'BOTTOM'; j1583(j2788, k2716); m2696(j2788, k2716); if (k2716[w1413] == 0 && k2716[p1419] == 0)
    j2788.textAutoResize = 'WIDTH_AND_HEIGHT';
else if (k2716[w1413] == 0)
    j2788.textAutoResize = 'HEIGHT';
else
    j2788.textAutoResize = 'NONE'; }
function x2771(h2721) { return true; }
function v2742(h2721) { if (!x2771(h2721))
    return null; const p2722 = figma.createVector(); z2748(p2722, h2721, true); return p2722; }
function z2748(p2722, h2721, isValid = false) { if (!isValid && !x2771(h2721))
    return; p2722.vectorNetwork = h2721[s1409]; j1583(p2722, h2721, false); m2696(p2722, h2721); }
function q2770(f2717) { return f2717[i1416] != null && !isNaN(f2717[i1416]) && f2717[k1422] != null && !isNaN(f2717[k1422]); }
function a2741(f2717) { const y2718 = figma.createVector(); z2747(y2718, f2717, true); return y2718; }
function z2747(y2718, f2717, isValid = false) { if (!isValid && !q2770(f2717))
    return; y2718.vectorPaths = [{ windingRule: f2717[i1416] == 1 ? 'NONZERO' : 'EVENODD', data: f2717[m1410] }]; y2718.cornerRadius = f2717[k1422]; j1583(y2718, f2717, false); m2696(y2718, f2717); }
