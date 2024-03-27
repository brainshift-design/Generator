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
function s1052(key, tag) { return key.substring(tag.length + 1); }
function r1053(key) { return w1051(key, r875); }
function x1054(key) { return w1051(key, b873); }
function r1055(key) { return w1051(key, o874); }
function v1056(key) { return s1052(key, r875); }
function h1057(key) { return s1052(key, b873); }
function f1058(key) { return s1052(key, o874); }
const generatorVersion = 387;
const s867 = 2147483647;
const NULL = '';
const r868 = '  ';
const e869 = '    ';
const j870 = '\n';
const i871 = '◦ G •';
const c872 = i871 + ' ';
const b873 = 'G_NODE';
const o874 = 'G_CONN';
const r875 = 'G_PAGE';
const y876 = 'G_TEMP';
const minWindowWidth = 602;
const minWindowHeight = 39;
const identity = Object.freeze([[1, 0, 0], [0, 1, 0], [0, 0, 1]]);
const Epsilon = 0.0000001;
const Tau = Math.PI * 2;
var f2540 = false;
function r877(x, eps = 0.000000001) { return Math.abs(x) < eps ? 0 : x; }
function nozero(x, eps = 0.000000001) { return x != 0 ? x : (x < 0 ? -eps : eps); }
function h878(v, eps = 0.000000001) { return point(nozero(v.x, eps), nozero(v.y, eps)); }
function equal(a, b, eps = 0.000000001) { return Math.abs(b - a) < eps; }
function sqr(x) { return x * x; }
;
function cube(x) { return x * x * x; }
;
function d879(f) { return Math.floor(f) | 0; }
function t880(x) { x = d879(x); x--; x |= x >> 1; x |= x >> 2; x |= x >> 4; x |= x >> 8; x |= x >> 16; x |= x >> 32; return ++x; }
function gcd(a, b) { let temp; while (1) {
    temp = a % b;
    if (temp == 0)
        return b;
    a = b;
    b = temp;
} }
function distv(p1, p2) { const dx = p2.x - p1.x; const dy = p2.y - p1.y; return Math.sqrt(dx * dx + dy * dy); }
function t881(v) { let angle = Math.atan2(v.y, v.x); if (angle < 0)
    angle += Tau; return angle; }
function anglev2(v1, v2) { return anglev2_(v1.x, v1.y, v2.x, v2.y); }
function anglev2_(x1, y1, x2, y2) { const dx = x2 - x1; const dy = y2 - y1; let angle = Math.atan2(dy, dx); if (angle < 0)
    angle += Tau; return angle; }
function n883(v) { return Math.sqrt(v.x * v.x + v.y * v.y); }
function lengthv_(x, y) { return Math.sqrt(x * x + y * y); }
function t884(v) { return point(v.x == 0 ? 0 : v.x / n883(v), v.y == 0 ? 0 : v.y / n883(v)); }
function dotv(v1, v2) { return v1.x * v2.x + v1.y * v2.y; }
function x885(a1, a2) { let diff = a2 - a1; while (diff <= -Tau / 2)
    diff += Tau; while (diff > Tau / 2)
    diff -= Tau; return diff; }
function c886(v, m) { let v3 = [v.x, v.y, 1]; let r = s950(v3, m); return point(r[0], r[1]); }
function h887(...mm) { i954(mm.length > 0, 'mulm3m3() must take at least one argument'); let result = clone(mm[0]); for (let a = 1; a < mm.length; a++) {
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
function o888(m, s) { for (let i = 0; i < 3; i++)
    for (let j = 0; j < 3; j++)
        m[i][j] /= s; return m; }
function adjugate(m) { return cofactor(transpose(m)); }
function transpose(m) { return [[m[0][0], m[1][0], m[2][0]], [m[0][1], m[1][1], m[2][1]], [m[0][2], m[1][2], m[2][2]]]; }
function cofactor(m) { return [[m[1][1] * m[2][2] - m[2][1] * m[1][2], -(m[1][0] * m[2][2] - m[2][0] * m[1][2]), m[1][0] * m[2][1] - m[2][0] * m[1][1]], [-(m[0][1] * m[2][2] - m[2][1] * m[0][2]), m[0][0] * m[2][2] - m[2][0] * m[0][2], -(m[0][0] * m[2][1] - m[2][0] * m[0][1])], [m[0][1] * m[1][2] - m[1][1] * m[0][2], -(m[0][0] * m[1][2] - m[1][0] * m[0][2]), m[0][0] * m[1][1] - m[1][0] * m[0][1]]]; }
function determinant(m) { return m[0][0] * (m[1][1] * m[2][2] - m[1][2] * m[2][1]) - m[0][1] * (m[1][0] * m[2][2] - m[2][0] * m[1][2]) + m[0][2] * (m[1][0] * m[2][1] - m[2][0] * m[1][1]); }
function x889(m) { return o888(adjugate(m), determinant(m)); }
function c890(angle) { const cosA = r877(Math.cos(angle)); const sinA = r877(Math.sin(angle)); return [[cosA, sinA, 0], [-sinA, cosA, 0], [0, 0, 1]]; }
function p891(x = 0, y = 0, i892 = 1, q893 = 1, angle = 0, n894 = 0, w895 = 0) { const cosA = Math.cos(angle); const sinA = Math.sin(angle); return [[i892 * cosA - w895 * sinA, -n894 * cosA + q893 * sinA, x], [w895 * cosA + i892 * sinA, q893 * cosA + n894 * sinA, y], [0, 0, 1]]; }
function g896(v1, v2) { return v1.x * v2.y - v1.y * v2.x; }
function n897(v1, v2) { return point(v1.x + v2.x, v1.y + v2.y); }
function sqrv(v) { return k898(v, v); }
function k898(v1, v2) { return point(v1.x * v2.x, v1.y * v2.y); }
function q899(v, s) { return point(v.x * s, v.y * s); }
function x900(v1, v2) { return point(v1.x / v2.x, v1.y / v2.y); }
function o901(v, s) { return point(v.x / s, v.y / s); }
function y902(v1, v2) { return point(v1.x - v2.x, v1.y - v2.y); }
function b903(str) { return decodeURI(encodeURIComponent(str)); }
function u904(str) { return decodeURIComponent(encodeURI(str)); }
function l905(bytes) { let str = ''; for (let i = 0; i < bytes.length; i++)
    str += String.fromCharCode(bytes[i]); return str; }
function i906(str) { return Array.from(u904(str), c => c.charCodeAt(0)); }
function m907(array, size) { const newArray = new Uint8Array(size); r908(array, newArray); return newArray; }
function r908(src, dst) { w909(src, 0, src.length, dst, 0, dst.length); }
function w909(src, p910, a911, dst, d912, k913) { const size = Math.min(a911, k913); for (let i = 0; i < size; i++)
    dst[d912 + i] = src[p910 + i]; }
function w914(d915, d916) { if (d915.length != d916.length)
    return false; for (let i = 0; i < d915.length; i++) {
    if (d915[i] != d916[i])
        return false;
} return true; }
function q917(y918, f919) { return y918.findIndex(i => f919.includes(i)) > -1; }
function i920(list) { return list ? '<==' : '<--'; }
;
function i921(list) { return list ? '==>' : '-->'; }
;
function d922(nodeId) { return b873 + ' ' + nodeId; }
function t923(name) { return o874 + ' ' + name; }
function c924(name) { return r875 + ' ' + name; }
function t925(str) { return str.toLowerCase() == 'true' || str == '1'; }
function z926(l927, n928 = false) { return q933(l927.outputNodeId, l927.outputId, l927.outputOrder, l927.inputNodeId, l927.inputId, l927.list, n928); }
function s929(outputNodeId, outputId, outputOrder, inputNodeId, inputId) { return t923(outputNodeId + ' ' + outputId + ' ' + outputOrder + ' ' + inputNodeId + ' ' + inputId); }
function l930(p243) { return s929(p243.outputNodeId, p243.outputId, p243.outputOrder, p243.inputNodeId, p243.inputId); }
function l931(p243) { return s929(p243.output.node.id, p243.output.id, p243.outputOrder, p243.input.node.id, p243.input.id); }
function h932(p243, n928 = false) { return q933(p243.output.node.id, p243.output.id, p243.outputOrder, p243.input.node.id, p243.input.id, p243.list, n928); }
function q933(outputNodeId, outputId, outputOrder, inputNodeId, inputId, list, n928 = false) { const sp = n928 ? ' ' : '  '; const jsp = n928 ? '' : ' '; const arrow = sp + q937(typeof outputOrder == 'string' ? parseInt(outputOrder) : outputOrder) + i921(typeof list == 'string' ? t925(list) : list) + sp; const join = jsp + '.' + jsp; return outputNodeId + join + outputId + arrow + inputNodeId + join + inputId; }
function g934(pageId) { return c924(pageId); }
function f935(num) { const str = num.toString(); let sup = ''; for (const c of str)
    sup += u936(c); return sup; }
function u936(c) { switch (c) {
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
function q937(num) { const str = num.toString(); let sup = ''; for (const c of str)
    sup += t938(c); return sup; }
function t938(c) { switch (c) {
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
function i939(bool) { return bool ? 'true' : 'false'; }
function isValid(val) { return val != undefined && val != null; }
function isEmpty(array) { return array.length == 0; }
function o940(array, item) { q941(array, array.indexOf(item)); }
function q941(array, index) { if (index > -1 && index < array.length)
    array.splice(index, 1); }
function q942(array) { if (isEmpty(array))
    return null; let last = array.at(-1); array.splice(array.length - 1, 1); return last; }
function s943(array) { return array[array.length - 1]; }
function i944(array, from, to) { const item = array[from]; array.splice(from, 1); array.splice(to, 0, item); }
function b945(array, item) { const index = array.indexOf(item); if (index > -1)
    array.splice(index, 1); }
function m946(z2796, array) { for (const item of array) {
    const index = z2796.indexOf(item);
    if (index > -1)
        z2796.splice(index, 1);
} }
function y947(array, where) { const index = array.findIndex(where); if (index > -1)
    array.splice(index, 1); }
function u948(styleId) { return styleId.split(',')[0] + ','; }
function j949(points) { let s4036 = ''; if (points.length < 2)
    return s4036; s4036 += 'M'; s4036 += ' ' + r877(points[0].x); s4036 += ' ' + r877(points[0].y); for (let i = 1; i < points.length; i++) {
    s4036 += ' L' + ' ' + r877(points[i].x) + ' ' + r877(points[i].y);
} return s4036; }
function point(x, y) { return { x: x, y: y }; }
function s950(v, m) { let r = [0, 0, 0]; for (let i = 0; i < 3; i++)
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
function p951(array, item, equal = null) { if (equal) {
    if (Array.isArray(item))
        item.forEach(i => p951(array, i, equal));
    else if (!array.find(i => equal(i, item)))
        array.push(item);
}
else {
    if (Array.isArray(item))
        item.forEach(i => p951(array, i));
    else if (!array.includes(item))
        array.push(item);
} }
function p952(array, item, equal) { if (Array.isArray(item))
    item.forEach(i => p952(array, i, equal));
else if (!array.find(equal))
    array.push(item); }
function e953(array, item, except) { if (Array.isArray(item))
    item.forEach(i => e953(array, i, except));
else if (!array.find(except))
    array.push(item); }
function i954(...args) { if (f2540) {
    console.assert(...args);
} }
function o955(...args) { if (f2540)
    console.error(...args); }
function l956(str, trim) { while (str.length >= trim.length && str.substring(0, trim.length) == trim)
    str = str.substring(trim.length); return str; }
function e957(str, trim) { while (str.length >= trim.length && str.substring(str.length - trim.length) == trim)
    str = str.substring(0, str.length - trim.length); return str; }
function y958(o4096) { const fills = []; for (const fill of o4096) {
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
            const n4212 = fill[1];
            const stops = [];
            for (const stop of fill[2]) {
                stops.push({ color: { r: Math.min(Math.max(0, stop[0]), 1), g: Math.min(Math.max(0, stop[1]), 1), b: Math.min(Math.max(0, stop[2]), 1), a: Math.min(Math.max(0, stop[3]), 1) }, position: stop[4] });
            }
            fills.push({ type: fill[0], gradientTransform: n4212, gradientStops: stops, blendMode: fill[3] });
            break;
        }
    }
} return fills; }
function b959(type) { return i1092.includes(type); }
const g1059 = 'LIST#';
const j1060 = 'NLIST#';
const n1061 = 'TLIST#';
const g1062 = 'SLIST#';
const n1063 = 'NULL';
const o1064 = 'VAR';
const u1065 = 'VARGRP';
const w1066 = 'FEEDBK';
const o1067 = 'REPT';
const g1068 = 'CACHE';
const l1069 = 'FRZ';
const e1070 = 'TIMER';
const r1071 = 'VNAME';
const GET_LIST_VALUE_NAMES = 'GVNAMES';
const LIST_VALUE_NAMES = 'VNAMES';
const OBJECT_NAME = 'ONAME';
const r1072 = 'CMB';
const e1073 = 'LSASIT';
const n1074 = 'EXTR';
const l1075 = 'SETP';
const a1076 = 'GETP';
const l1077 = 'SUBLST';
const p1078 = 'UNIQ';
const REORDER_LIST = 'RORD';
const SHIFT_LIST = 'SHFTLST';
const d1079 = 'REVLST';
const y1080 = 'SORT';
const c1081 = 'CLMN';
const g1082 = 'CELL';
const i1083 = 'LIST';
const o1084 = 'COUNT';
const OBJECT_COUNT = 'OBJCOUNT';
const e1085 = 'LCONT';
const i1086 = 'SELECT';
const SELECT_FROM_LIST = 'LSTSEL';
const m1087 = 'IF';
const i1088 = 'LSTFLT';
const a1089 = 'ITER';
const l1090 = 'ANY#';
const z1091 = [g1059, j1060, n1061, g1062, r1072, n1074, l1075, a1076, l1077, i1083, o1084, e1085, o1067];
const i1092 = [g1059, j1060, n1061, g1062];
const x1093 = [n1063, o1064, u1065, ...z1091, e1073, n1074, l1075, a1076, l1077, p1078, REORDER_LIST, SHIFT_LIST, d1079, c1081, y1080, g1082, i1083, i1086, SELECT_FROM_LIST, m1087, i1088, w1066, o1067, a1089, g1068, l1069, e1070, r1071, GET_LIST_VALUE_NAMES, LIST_VALUE_NAMES, OBJECT_NAME];
const l1094 = 'NUM#';
const p1095 = 'NUM';
const NUMBER_PRECISION = 'NPREC';
const p1096 = 'NSIGN';
const c1097 = 'ABS';
const NUMBER_NEGATIVE = 'NEG';
const d1098 = 'ROUND';
const NUMBER_QUANTIZE = 'QUANT';
const c1099 = 'SMINMAX';
const x1100 = 'MINMAX';
const g1101 = 'LIM';
const n1102 = 'NCURVE';
const NUMBER_BIAS = 'NBIAS';
const m1103 = 'NANISNUM';
const g1104 = 'CONST';
const u1105 = 'DATE';
const e1106 = 'SEQ';
const o1107 = 'RANGE';
const e1108 = 'WAVE';
const l1109 = 'RAND';
const q1110 = 'NOISE';
const k1111 = 'PROB';
const r1112 = 'ACCUM';
const c1113 = 'LERP';
const h1114 = 'SOLVE';
const h1115 = 'NANIM';
const g1116 = 'SMATH';
const x1117 = 'MATH';
const z1118 = 'ADD';
const k1119 = 'SUB';
const l1120 = 'MUL';
const k1121 = 'DIV';
const g1122 = 'MOD';
const f1123 = 'EXP';
const a1124 = 'NBOOL';
const f1125 = 'NOT';
const i1126 = 'AND';
const t1127 = 'OR';
const t1128 = 'XOR';
const x1129 = 'COND';
const w1130 = 'EQ';
const y1131 = 'NE';
const h1132 = 'LT';
const n1133 = 'LE';
const g1134 = 'GT';
const r1135 = 'GE';
const p1136 = 'TRIG';
const u1137 = 'SIN';
const c1138 = 'COS';
const t1139 = 'TAN';
const a1140 = 'ATAN2';
const u1141 = 'CNVANG';
const i1142 = [x1117, g1116, z1118, k1119, l1120, k1121, g1122, f1123];
const w1143 = [a1124, f1125, i1126, t1127, t1128];
const k1144 = [x1129, w1130, y1131, h1132, n1133, g1134, r1135];
const b1145 = [p1136, u1137, c1138, t1139, a1140];
const h1146 = 'TEXT#';
const g1147 = 'TEXT';
const q1148 = 'TLEN';
const d1149 = 'TTRIM';
const i1150 = 'TSUB';
const r1151 = 'TCONT';
const d1152 = 'TCASE';
const t1153 = 'TREPL';
const r1154 = 'TJOIN';
const m1155 = 'TPAD';
const a1156 = 'TCMP';
const i1157 = 'TCHAR';
const m1158 = 'TUNI';
const a1159 = 'INDEX';
const m1160 = 'N2T';
const l1161 = 'C2T';
const v1162 = 'T2N';
const g1163 = 'T2C';
const p1164 = 'TSPLT';
const j3505 = 'TJSON';
const c1166 = 'TCSV';
const e1167 = 'FETCH';
const v1168 = 'TFILE';
const p1169 = [l1094, j1060, p1095, NUMBER_PRECISION, p1096, c1097, NUMBER_NEGATIVE, d1098, NUMBER_QUANTIZE, c1099, x1100, g1101, n1102, NUMBER_BIAS, m1103, g1104, u1105, e1106, o1107, e1108, l1109, q1110, r1112, c1113, h1114, h1115, m1160, i1157, ...i1142, ...w1143, ...k1144, ...b1145, u1141];
const s1170 = [h1146, n1061, g1147, q1148, d1149, i1150, r1151, d1152, r1154, m1155, t1153, a1156, m1158, a1159, v1162, g1163, p1164, j3505, c1166, e1167, v1168];
const l1171 = 'COL#';
const v1172 = 'COL';
const f1173 = 'CVAL';
const k1174 = 'CCOR';
const q1175 = 'COLP3';
const c1176 = 'CCNT';
const j1177 = 'BLND';
const u1178 = 'CLERP';
const z1179 = 'CBLND';
const y1180 = [l1171, v1172, k1174, q1175, j1177, u1178, z1179, l1161];
const b1181 = 'FILL#';
const d1182 = 'FILL';
const p1183 = [b1181, d1182];
const p1184 = 'STRK#';
const e1185 = 'STRK';
const v1186 = [p1184, e1185];
const o1187 = 'CSTOP#';
const v1188 = 'CSTOP';
const t1189 = [o1187, v1188];
const q1190 = 'GRAD#';
const h1191 = 'GRAD';
const i1192 = [q1190, h1191];
const b1193 = 'RCRN#';
const h1194 = 'RCRN';
const o1195 = [b1193, h1194];
const z1196 = 'DRSH#';
const c1197 = 'DRSH';
const g1198 = [z1196, c1197];
const s1199 = 'INSH#';
const y1200 = 'INSH';
const c1201 = [s1199, y1200];
const k1202 = 'LBLR#';
const a1203 = 'LBLR';
const l1204 = [k1202, a1203];
const x1205 = 'BBLR#';
const w1206 = 'BBLR';
const x1207 = [x1205, w1206];
const j1208 = 'MASK#';
const a1209 = 'MASK';
const k1210 = [j1208, a1209];
const r1211 = 'BLEND#';
const n1212 = 'BLEND';
const m1213 = [r1211, n1212];
const c1214 = [...o1195, ...g1198, ...c1201, ...l1204, ...x1207, ...m1213, ...k1210];
const k1215 = [l1171, b1181, q1190, p1184, z1196, s1199, k1202, x1205, r1211, j1208];
const h1216 = 'CSTL';
const g1217 = 'SHP#';
const r1218 = 'RECT#';
const l1219 = 'RECT';
const w1220 = [r1218, l1219];
const o1221 = 'LINE#';
const i1222 = 'LINE';
const c1223 = [o1221, i1222];
const y1224 = 'ELPS#';
const l1225 = 'ELPS';
const d1226 = [y1224, l1225];
const t1227 = 'TRPZ#';
const x1228 = 'TRPZ';
const v1229 = [t1227, x1228];
const r1236 = 'POLY#';
const c1237 = 'POLY';
const d1238 = [r1236, c1237];
const r1239 = 'STAR#';
const h1240 = 'STAR';
const x1241 = [r1239, h1240];
const e1242 = 'TXTS#';
const v1243 = 'TXTS';
const j1244 = [e1242, v1243];
const z1245 = 'PT#';
const t1246 = 'PT';
const v1247 = [z1245, t1246];
const z1248 = 'PCORN';
const x1249 = 'VPATH#';
const h1250 = 'VPATH';
const s1251 = [x1249, h1250];
const l1252 = 'VPT#';
const v1253 = 'VPT';
const w1254 = [l1252, v1253];
const j1255 = 'VEDGE#';
const t1256 = 'VEDGE';
const i1257 = [j1255, t1256];
const c1258 = 'VREG#';
const a1259 = 'VREG';
const t1260 = [c1258, a1259];
const c1261 = 'VNET#';
const z1262 = 'VNET';
const o1263 = [c1261, z1262];
const i1264 = 'SGRP#';
const j1265 = 'SGRP';
const o1266 = [i1264, j1265];
const l1267 = 'FRM#';
const l1268 = 'FRM';
const g1269 = [l1267, l1268];
const a1231 = 'ARC#';
const r1230 = 'ARC';
const c1232 = [a1231, r1230];
const b1234 = 'WAVEP#';
const b1233 = 'WAVEP';
const v1235 = [b1234, b1233];
const t1270 = 'MOVE';
const f1271 = 'ROT';
const c1272 = 'SCALE';
const z1273 = 'SKEW';
const d1274 = 'SCENTR';
const y1275 = 'RSTX';
const k1276 = 'PLACE';
const m1277 = 'APPLY';
const PATH_LENGTH = 'PTHLEN';
const JOIN_PATHS = 'JOINPTH';
const REORIENT_PATHS = 'REORPTH';
const a1283 = 'PTALPATH';
const n1284 = 'CPTONPATH';
const s1278 = 'MESPT';
const y1279 = 'VECLEN';
const r1280 = 'CIRCEN';
const ARC_FROM_POINTS = 'ARCPT';
const h1281 = 'INTLIN';
const u1282 = 'PTLERP';
const REVERSE_PATH = 'REVPTH';
const BLEND_PATH = 'BLENDPTH';
const PATH_TYPES = [h1250, x1228, r1230, b1233];
const PATH_VALUES = [x1249, t1227, a1231, b1234];
const y1285 = 'SBOOL';
const p1286 = 'SBOOL#';
const h1287 = 'SBOOLU';
const f1288 = 'SBOOLS';
const r1289 = 'SBOOLI';
const b1290 = 'SBOOLE';
const i1291 = [y1285, p1286, h1287, f1288, r1289, b1290];
const a1292 = 'RENDER';
const EXPORT = 'EXPORT';
const d1293 = [g1217, g1062, r1218, o1221, y1224, t1227, r1236, r1239, e1242, z1245, x1249, l1252, j1255, c1258, c1261, a1231, b1234, i1264, l1267, p1286, z1196, s1199, k1202, x1205, r1211, j1208];
const x1294 = [f1271, c1272, z1273];
const e1295 = [...d1293, ...w1220, ...c1223, ...d1226, ...v1229, ...d1238, ...x1241, ...j1244, ...v1247, z1248, ...s1251, ...w1254, ...i1257, ...t1260, ...o1263, ...c1232, ...v1235, ...o1266, ...g1269, ...i1291, t1270, ...x1294, d1274, y1275, k1276, m1277, PATH_LENGTH, JOIN_PATHS, REORIENT_PATHS, a1283, n1284, s1278, y1279, r1280, r1230, b1233, ARC_FROM_POINTS, h1281, u1282, REVERSE_PATH, BLEND_PATH, a1292, EXPORT];
const y1296 = [g1059, j1060, n1061, g1062, l1094, h1146, l1171, b1181, o1187, q1190, p1184, o1187, q1190, g1217, r1218, o1221, y1224, t1227, r1236, r1239, e1242, z1245, x1249, l1252, j1255, c1258, c1261, i1264, l1267, b1193, z1196, s1199, k1202, x1205, r1211, j1208];
const q1297 = 'GROUP';
const n1298 = 'GPARAM';
const a1299 = [q1297, n1298];
const k1300 = 'CMNT';
const i1301 = 'CMNTARR';
const j1302 = 'PANEL';
const s1303 = 'ACT';
const e1304 = 'BFACT';
const c1305 = 'BFLST';
const q1306 = 'DIS';
const l1307 = 'NOC';
const PARAM = 'PARAM';
const r1308 = 'LOG';
const x1309 = 'GRAPH';
const z1310 = [[g1122, '%'], [k1121, '/'], [k1119, '−'], [z1118, '+'], [l1120, '×'], [f1123, 'e<sup>x']];
const h1311 = [[k1121, '/'], [k1119, '−'], [z1118, '+'], [l1120, '×']];
const q1312 = 0;
const d1313 = 1;
const j1314 = 2;
const m1315 = 3;
const i1316 = [[q1312, 'not'], [d1313, 'xor'], [j1314, 'or'], [m1315, 'and']];
const z1317 = 0;
const a1318 = 1;
const j1319 = 2;
const u1320 = 3;
const h1321 = 4;
const f1322 = 5;
const t1323 = [[z1317, '<'], [a1318, '≤'], [j1319, '≠'], [u1320, '='], [h1321, '≥'], [f1322, '>']];
const f1324 = 0;
const k1325 = 1;
const e1326 = 2;
const z1327 = 3;
const b1328 = 4;
const y1329 = 5;
const a1330 = [[f1324, 'sin'], [k1325, 'cos'], [e1326, 'tan'], [z1327, 'asin'], [b1328, 'acos'], [y1329, 'atan']];
const t1331 = 'EMPTY';
const z1332 = 'CONNECT';
const s1333 = 'CREATE';
const n1334 = 'CREATE_INSERT';
const j1335 = 'DELETE';
const x1336 = 'DISCONNECT';
const b1337 = 'LINK_STYLE';
const w1338 = 'LINK_VARIABLE';
const l1339 = 'LINK_VARIABLE_GROUP';
const i1340 = 'MAKE_ACTIVE';
const MAKE_NOT_CONDITION_ACTION = 'MAKE_NOT_CONDITION';
const d1341 = 'MAKE_PASSIVE';
const p1342 = 'PASTE';
const i1343 = 'RECONNECT';
const s1344 = 'REMOVE';
const u1345 = 'RENAME';
const s1346 = 'REORDER_INPUTS';
const w1347 = 'REORDER_CONNECTIONS';
const t1348 = 'SELECT';
const l1349 = 'SELECT_MOVE';
const w1350 = 'MOVE_NODES';
const y1351 = 'SET_PARAM_VALUE';
const SET_MULTIPLE_VALUES_ACTION = 'SET_MULTIPLE_VALUES';
const p1352 = 'SET_PARAM_SETTING';
const e1353 = 'SET_NODE_RECT';
const f1354 = 'TOGGLE_DISABLE';
const d1355 = 'TOGGLE_PARAM_HEADER';
const c1356 = 'SET_CURRENT_GRAPH';
const p1357 = 'CREATE_PAGE';
const n1358 = 'DELETE_PAGE';
const t1359 = 'GROUP_NODES';
const x1360 = 'UNGROUP_NODES';
const r1361 = 'HIGHLIGHT_NODES';
const SCROLL_LIST_NODE_ACTION = 'SCROLL_LIST_NODE';
const SET_LIST_DIVIDER_ACTION = 'SET_LIST_DIVIDER';
const SET_NODE_PARAM_ACTION = 'SET_NODE_PARAM';
const k1362 = 'BNORM';
const t1363 = 'BDARK';
const w1364 = 'BMULT';
const f1365 = 'BPDRK';
const h1366 = 'BBURN';
const x1367 = 'BLITE';
const p1368 = 'BSCRN';
const z1369 = 'BPLGT';
const o1370 = 'BDODG';
const g1371 = 'BOVER';
const c1372 = 'BSOFT';
const p1373 = 'BHARD';
const b1374 = 'BDIFF';
const q1375 = 'BEXCL';
const s1376 = 'BHUE';
const x1377 = 'BSAT';
const b1378 = 'BCOL';
const k1379 = 'BLUM';
const r1380 = [[k1362, 'normal', 'NORMAL'], [t1363, 'darken', 'DARKEN'], [w1364, 'multiply', 'MULTIPLY'], [f1365, 'plus darker', 'LINEAR_BURN'], [h1366, 'color burn', 'COLOR_BURN'], [x1367, 'lighten', 'LIGHTEN'], [p1368, 'screen', 'SCREEN'], [z1369, 'plus lighter', 'LINEAR_DODGE'], [o1370, 'color dodge', 'COLOR_DODGE'], [g1371, 'overlay', 'OVERLAY'], [c1372, 'soft light', 'SOFT_LIGHT'], [p1373, 'hard light', 'HARD_LIGHT'], [b1374, 'difference', 'DIFFERENCE'], [q1375, 'exclusion', 'EXCLUSION'], [s1376, 'hue', 'HUE'], [x1377, 'saturation', 'SATURATION'], [b1378, 'color', 'COLOR'], [k1379, 'luminosity', 'LUMINOSITY']];
const h1381 = [['thin', 100], ['extra light', 200], ['light', 300], ['regular', 400], ['medium', 500], ['semi bold', 600], ['bold', 700], ['extra bold', 800], ['black', 900]];
const f1382 = 0;
const p1383 = 1;
const c1384 = 2;
const b1385 = 2;
const e1386 = 3;
const v1387 = 3;
const m1388 = 4;
const k1389 = 4;
const g1390 = 5;
const i1391 = 6;
const o1392 = 7;
const c1393 = 8;
const o1394 = 9;
const q1395 = 10;
const t1396 = 11;
const w1397 = 12;
const l1398 = 13;
const n1399 = 14;
const n1400 = 15;
const u1401 = 16;
const h1402 = 17;
const u1403 = 18;
const x1404 = 19;
const p1405 = 20;
const w1406 = 21;
const a1407 = 22;
const c1408 = 23;
const p1409 = 24;
const k1410 = 24;
const f1411 = 25;
const o1412 = 26;
const c1413 = 27;
const b1414 = 28;
const p1415 = 28;
const m1416 = 28;
const u1417 = 28;
const q1418 = 28;
const v1419 = 28;
const b1420 = 28;
const l1421 = 28;
const l1422 = 29;
const e1423 = 29;
const t1424 = 29;
const g1425 = 29;
const s1426 = 29;
const z1427 = 29;
const a1428 = 30;
const k1429 = 30;
const x1430 = 30;
const w1431 = 30;
const m1432 = 31;
const o1433 = 31;
const x1434 = 32;
const w1435 = 33;
const a1436 = 34;
const l1437 = 35;
const r1438 = 36;
const m1439 = 37;
const w2797 = '12345679ABCDEFGHJKLMNPQRSTUVWXYZ';
function n845(array, chars = w2797) { let q847 = ''; let len = array.length; let i = 0; while (len > 0) {
    if (len >= 5) {
        const a0 = array[i], a1 = array[i + 1], a2 = array[i + 2], a3 = array[i + 3], a4 = array[i + 4];
        q847 += chars[(a0 & 0xF8) >>> 3];
        q847 += chars[((a0 & 0x07) << 2) | ((a1 & 0xC0) >>> 6)];
        q847 += chars[(a1 & 0x3E) >>> 1];
        q847 += chars[((a1 & 0x01) << 4) | ((a2 & 0xF0) >>> 4)];
        q847 += chars[((a2 & 0x0F) << 1) | ((a3 & 0x80) >>> 7)];
        q847 += chars[(a3 & 0x7C) >>> 2];
        q847 += chars[((a3 & 0x03) << 3) | ((a4 & 0xE0) >>> 5)];
        q847 += chars[(a4 & 0x1F)];
    }
    else if (len == 4) {
        const a0 = array[i], a1 = array[i + 1], a2 = array[i + 2], a3 = array[i + 3];
        q847 += chars[(a0 & 0xF8) >>> 3];
        q847 += chars[((a0 & 0x07) << 2) | ((a1 & 0xC0) >>> 6)];
        q847 += chars[(a1 & 0x3E) >>> 1];
        q847 += chars[((a1 & 0x01) << 4) | ((a2 & 0xF0) >>> 4)];
        q847 += chars[((a2 & 0x0F) << 1) | ((a3 & 0x80) >>> 7)];
        q847 += chars[(a3 & 0x7C) >>> 2];
        q847 += chars[((a3 & 0x03) << 3)];
    }
    else if (len == 3) {
        const a0 = array[i], a1 = array[i + 1], a2 = array[i + 2];
        q847 += chars[(a0 & 0xF8) >>> 3];
        q847 += chars[((a0 & 0x07) << 2) | ((a1 & 0xC0) >>> 6)];
        q847 += chars[(a1 & 0x3E) >>> 1];
        q847 += chars[((a1 & 0x01) << 4) | ((a2 & 0xF0) >>> 4)];
        q847 += chars[((a2 & 0x0F) << 1)];
    }
    else if (len == 2) {
        const a0 = array[i], a1 = array[i + 1];
        q847 += chars[(a0 & 0xF8) >>> 3];
        q847 += chars[((a0 & 0x07) << 2) | ((a1 & 0xC0) >>> 6)];
        q847 += chars[(a1 & 0x3E) >>> 1];
        q847 += chars[((a1 & 0x01) << 4)];
    }
    else if (len == 1) {
        const a0 = array[i];
        q847 += chars[(a0 & 0xF8) >>> 3];
        q847 += chars[((a0 & 0x07) << 2)];
    }
    i += 5;
    len -= 5;
} return q847; }
function g846(q847, chars = w2797) { const array = []; let len = q847.length; let c = 0; while (len > 0) {
    if (len >= 8) {
        const c0 = chars.indexOf(q847[c]), c1 = chars.indexOf(q847[c + 1]), c2 = chars.indexOf(q847[c + 2]), c3 = chars.indexOf(q847[c + 3]), c4 = chars.indexOf(q847[c + 4]), c5 = chars.indexOf(q847[c + 5]), c6 = chars.indexOf(q847[c + 6]), c7 = chars.indexOf(q847[c + 7]);
        array.push((c0 << 3) | ((c1 & 0x1C) >>> 2));
        array.push(((c1 & 0x03) << 6) | (c2 << 1) | ((c3 & 0x10) >>> 4));
        array.push(((c3 & 0x0F) << 4) | ((c4 & 0x1E) >>> 1));
        array.push(((c4 & 0x01) << 7) | (c5 << 2) | ((c6 & 0x18) >>> 3));
        array.push(((c6 & 0x07) << 5) | c7);
    }
    else if (len == 7) {
        const c0 = chars.indexOf(q847[c]), c1 = chars.indexOf(q847[c + 1]), c2 = chars.indexOf(q847[c + 2]), c3 = chars.indexOf(q847[c + 3]), c4 = chars.indexOf(q847[c + 4]), c5 = chars.indexOf(q847[c + 5]), c6 = chars.indexOf(q847[c + 6]);
        array.push((c0 << 3) | ((c1 & 0x1C) >>> 2));
        array.push(((c1 & 0x03) << 6) | (c2 << 1) | ((c3 & 0x10) >>> 4));
        array.push(((c3 & 0x0F) << 4) | ((c4 & 0x1E) >>> 1));
        array.push(((c4 & 0x01) << 7) | (c5 << 2) | ((c6 & 0x18) >>> 3));
    }
    else if (len == 5) {
        const c0 = chars.indexOf(q847[c]), c1 = chars.indexOf(q847[c + 1]), c2 = chars.indexOf(q847[c + 2]), c3 = chars.indexOf(q847[c + 3]), c4 = chars.indexOf(q847[c + 4]);
        array.push((c0 << 3) | ((c1 & 0x1C) >>> 2));
        array.push(((c1 & 0x03) << 6) | (c2 << 1) | ((c3 & 0x10) >>> 4));
        array.push(((c3 & 0x0F) << 4) | ((c4 & 0x1E) >>> 1));
    }
    else if (len == 4) {
        const c0 = chars.indexOf(q847[c]), c1 = chars.indexOf(q847[c + 1]), c2 = chars.indexOf(q847[c + 2]), c3 = chars.indexOf(q847[c + 3]);
        array.push((c0 << 3) | ((c1 & 0x1C) >>> 2));
        array.push(((c1 & 0x03) << 6) | (c2 << 1) | ((c3 & 0x10) >>> 4));
    }
    else if (len == 2) {
        const c0 = chars.indexOf(q847[c]), c1 = chars.indexOf(q847[c + 1]);
        array.push((c0 << 3) | ((c1 & 0x1C) >>> 2));
    }
    c += 8;
    len -= 8;
} return array; }
function i2102(nodeKey, j4008) {
    return __awaiter(this, void 0, void 0, function* () { const log = d2103(yield a1547(nodeKey, false)); if (j4008) {
        console.log('%c%s\n%c%s', 'background: #fa24; color: white;', h1057(nodeKey), 'background: #fa44; color: #edc;', log);
    }
    else {
        console.log('%c%s\n%c%s', 'background: #fdb; color: black;', h1057(nodeKey), 'background: #fed; color: black;', log);
    } });
}
function d2103(json) { let w4037 = json.replace('{\n', '').replace('\n}', '').replace('[\n' + r868, '').replace('\n' + r868 + ']', '').split(r868 + '"params":\n').join('').split('": "').join(': ').split('", "').join(': ').split(r868 + '"').join(r868).split(r868 + r868 + '["').join(r868 + r868).split('",\n').join('\n').split('"\n').join('\n').split('"],\n').join('\n'); if (w4037[w4037.length - 1] == '"')
    w4037 = w4037.substring(0, w4037.length - 1); if (w4037.substring(w4037.length - 2) == '"]')
    w4037 = w4037.substring(0, w4037.length - 2); return w4037; }
function c2104(json) { let w4037 = json.replace('{\n', '').replace('\n}', '').replace('[\n' + r868, '').replace('\n' + r868 + ']', ''); return w4037; }
function b2105(p243, j4008) { const i4215 = z926(p243, true); if (j4008) {
    console.log('%c%s', 'background: #4f44; color: #ded', i4215);
}
else {
    console.log('%c%s', 'background: #cfc; color: black;', i4215);
} }
console.clear();
figma.payments.setPaymentStatusInDevelopment({ type: 'PAID' });
figma.loadAllPagesAsync().then(() => { figma.on('documentchange', n1518); figma.on('selectionchange', q1526); figma.on('close', s1519); });
a1508(true);
figma.clientStorage.getAsync('pro').then(data => { figma.showUI(__html__, { visible: false, themeColors: true, title: 'Generator' }); });
var l2709 = figma.viewport.zoom;
setInterval(i1523, 100);
const z2798 = 'clock_';
const g2799 = 1000;
var v2800 = false;
var objectCenterSize = 15;
function x1520() { (function () {
    return __awaiter(this, void 0, void 0, function* () { figma.currentPage.loadAsync().then(() => __awaiter(this, void 0, void 0, function* () { let h2801 = yield figma.currentPage.getPluginData(figma.currentUser.id + ',windowWidth'); let i2802 = yield figma.currentPage.getPluginData(figma.currentUser.id + ',windowHeight'); let c2803; let m2804; if (h2801 === NULL) {
        c2803 = 800;
        figma.currentPage.setPluginData(figma.currentUser.id + ',windowWidth', h2801.toString());
    }
    else
        c2803 = parseInt(h2801); if (i2802 === NULL) {
        m2804 = 600;
        figma.currentPage.setPluginData(figma.currentUser.id + ',windowHeight', i2802.toString());
    }
    else
        m2804 = parseInt(i2802); figma.ui.resize(Math.max(minWindowWidth, c2803), Math.max(minWindowHeight, m2804)); figma.ui.show(); const fonts = yield figma.listAvailableFontsAsync(); const eula = (yield figma.clientStorage.getAsync('eula')) === 'true'; const tutorials = (yield figma.clientStorage.getAsync('tutorials')) === 'true'; const isLocked = yield r1525(); c1527({ cmd: 'uiReturnFigStartGenerator', currentUser: figma.currentUser, viewportRect: figma.viewport.bounds, viewportZoom: figma.viewport.zoom, fonts: fonts, eula: eula, tutorials: tutorials, isLocked: isLocked, windowWidth: c2803, windowHeight: m2804 }); })); });
})(); }
function x1521() { a1508(); figma.showUI(__html__, { visible: false, themeColors: true }); }
function x1522() { setInterval(s1524, g2799); }
function i1523() { if (figma.viewport.zoom == l2709)
    return; l2709 = figma.viewport.zoom; t2697(); o1541(); o1543(); }
function s1524() { v1548(z2798 + figma.currentUser.sessionId.toString(), Date.now().toString()); }
function r1525() {
    return __awaiter(this, void 0, void 0, function* () { yield figma.currentPage.loadAsync(); const clocks = figma.currentPage.getPluginDataKeys().filter(k => k.length > z2798.length && k.substring(0, z2798.length) == z2798 && k.substring(z2798.length) != figma.currentUser.sessionId.toString()).map((k) => __awaiter(this, void 0, void 0, function* () { return parseInt(yield a1547(k)); })); clocks.sort(); const now = Date.now(); const locked = clocks.length > 0 && now - (yield clocks[clocks.length - 1]) < g2799 * 2; return locked; });
}
function q1526() { t2697(); }
var r2730 = new Array();
var d2732 = new Array();
function figGetObjectsFromIds(objectIds) {
    return __awaiter(this, void 0, void 0, function* () { for (let i = n2766.length - 1; i >= 0; i--)
        if (!n2766[i].removed && objectIds.includes(n2766[i].getPluginData('objectId')))
            n2766.splice(i, 1); for (let i = w2782.length - 1; i >= 0; i--)
        if (w2782[i].removed || objectIds.includes(w2782[i].getPluginData('objectId')))
            w2782.splice(i, 1); yield figma.currentPage.loadAsync(); return figma.currentPage.findAll(o => objectIds.includes(o.getPluginData('objectId'))); });
}
function c1507(nodeIds) { for (let i = n2766.length - 1; i >= 0; i--)
    if (!n2766[i].removed && nodeIds.includes(n2766[i].getPluginData('nodeId')))
        n2766.splice(i, 1); for (let i = w2782.length - 1; i >= 0; i--)
    if (w2782[i].removed || nodeIds.includes(w2782[i].getPluginData('nodeId')))
        w2782.splice(i, 1); figma.currentPage.loadAsync().then(() => { figma.currentPage.findAll(o => nodeIds.includes(o.getPluginData('nodeId'))).forEach(o => { if (!o.removed)
    o.remove(); }); }); r2730 = r2730.filter(a => !nodeIds.includes(a.nodeId)); }
function a1508(n1509 = false) { for (const f1514 of figma.currentPage.children) {
    if (f1514.removed)
        continue;
    if (f1514.getPluginData('objectId') != '' && f1514.getPluginData('userId') == figma.currentUser.id && (parseInt(f1514.getPluginData('retain')) == 0 || n1509))
        f1514.remove();
} }
function h1510(nodeIds, w1511) { for (let i = r2730.length - 1; i >= 0; i--) {
    const y2731 = r2730[i];
    if (!nodeIds.includes(y2731.nodeId))
        continue;
    for (let j = y2731.objects.length - 1; j >= 0; j--) {
        const f1514 = y2731.objects[j];
        if (f1514.removed || !y1512(f1514, w1511)) {
            if (!f1514.removed)
                f1514.remove();
            b945(y2731.objects, f1514);
            if (n2766.includes(f1514))
                b945(n2766, f1514);
            if (w2782.includes(f1514))
                b945(w2782, f1514);
        }
        if (!f1514.removed) {
            if (parseInt(f1514.getPluginData('retain')) == 2)
                r1533(f1514);
        }
    }
    if (isEmpty(y2731.objects))
        b945(r2730, y2731);
} }
function y1512(f1514, w1511) { if (f1514.type == j1265 || f1514.type == l1268) {
    for (const child of f1514.children) {
        const found = y1512(child, w1511);
        if (found)
            return found;
    }
}
else {
    const found = w1511.find(o => f1514.getPluginData('objectId') == o[c1384] && f1514.getPluginData('userId') == figma.currentUser.id || o[g1390] == 2 && o[g1390] == f1514.getPluginData('retain'));
    if (found)
        return found;
} return null; }
function r1515(nodeIds, x1516) { figma.getLocalPaintStylesAsync().then(paintStyles => { paintStyles.filter(s => nodeIds.includes(s.getPluginData('nodeId'))).forEach(s => { const nodeId = s.getPluginData('nodeId'); const existing = t925(s.getPluginData('existing')); if (!existing) {
    s.remove();
}
else if (x1516) {
    y947(d2732, a => a.nodeId == nodeId);
    s.setPluginData('type', NULL);
    s.setPluginData('nodeId', NULL);
    s.setPluginData('existing', NULL);
} }); }); if (x1516)
    d2732 = d2732.filter(a => !nodeIds.includes(a.nodeId)); }
var x1517 = false;
function n1518(e) { for (const change of e.documentChanges) {
    switch (change.type) {
        case 'STYLE_CREATE':
            if (!change.style)
                break;
            if (!x1517) {
                change.style.setPluginData('type', NULL);
                change.style.setPluginData('nodeId', NULL);
                change.style.setPluginData('existing', NULL);
            }
            break;
        case 'STYLE_PROPERTY_CHANGE': {
            if (!change.style)
                break;
            if (!x1517) {
                const msg = { cmd: 'uiStylePropertyChange', styleId: u948(change.id), properties: change.properties, name: '', paints: [] };
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
} x1517 = false; }
function s1519() { a1508(); c1527({ cmd: 'updateMetrics' }); }
figma.ui.onmessage = function (msg) { msg = JSON.parse(msg); if (msg.cmd == 'returnUiGetValueForFigma')
    return; switch (msg.cmd) {
    case 'figStartGenerator':
        x1520();
        break;
    case 'figRestartGenerator':
        x1521();
        break;
    case 'figFinishStart':
        x1522();
        break;
    case 'figDockWindowNormal':
        i2739('normal');
        break;
    case 'figDockWindowMaximize':
        i2739('maximize');
        break;
    case 'figDockWindowTop':
        i2739('top');
        break;
    case 'figDockWindowLeft':
        i2739('left');
        break;
    case 'figDockWindowRight':
        i2739('right');
        break;
    case 'figDockWindowBottom':
        i2739('bottom');
        break;
    case 'figGetMousePosition':
        b1593(msg.clientPosition);
        break;
    case 'figResizeWindow':
        a1596(msg.width, msg.height);
        break;
    case 'figSetWindowRect':
        n1594(msg.x, msg.y, msg.width, msg.height);
        break;
    case 'figNotify':
        b1597(msg);
        break;
    case 'figGetLocalData':
        q1545(msg.key);
        break;
    case 'figSetLocalData':
        y1546(msg.key, msg.value);
        break;
    case 'figClearAllLocalData':
        k4032();
        break;
    case 'figGetPageData':
        a1547(msg.key);
        break;
    case 'figSetPageData':
        v1548(msg.key, msg.value);
        break;
    case 'figSavePages':
        o1553(msg.pageIds, msg.pageJson, msg.currentPageId);
        break;
    case 'figLoadNodesAndConns':
        k1550(msg.debugMode);
        break;
    case 'figSaveNodes':
        p1554(msg.nodeIds, msg.nodeJson);
        break;
    case 'figGetAllLocalTemplateNames':
        y2736();
        break;
    case 'figSaveLocalTemplate':
        l1555(msg.i4033, msg.template);
        break;
    case 'figRemoveConnsToNodes':
        v1556(msg.nodeIds);
        break;
    case 'figRemoveSavedNodesAndConns':
        y1557(msg.nodeIds);
        break;
    case 'figRemoveAllSavedNodesAndConns':
        d1558();
        break;
    case 'figLogAllSavedNodesAndConns':
        r1559(msg.j4008);
        break;
    case 'figLogAllSavedNodes':
        n1560(msg.j4008);
        break;
    case 'figLogAllSavedConns':
        s1561(msg.j4008);
        break;
    case 'figLogAllSavedPageKeys':
        o1562(msg.j4008);
        break;
    case 'figLogAllSavedPages':
        t1563(msg.j4008);
        break;
    case 'figLogAllSavedConnKeys':
        u1564(msg.j4008);
        break;
    case 'figLogAllLocalData':
        n1565(msg.j4008);
        break;
    case 'figGetValue':
        o1566(msg.key, msg.spec);
        break;
    case 'figRemoveSavedPage':
        b1568(msg.pageId);
        break;
    case 'figRemoveAllSavedPages':
        l1569();
        break;
    case 'figSaveConnection':
        r1570(msg.key, msg.json);
        break;
    case 'figSaveConnections':
        v1571(msg.keys, msg.json);
        break;
    case 'figUpdateSavedConnections':
        d1572(msg.curKeys, msg.newKeys, msg.json);
        break;
    case 'figDeleteSavedConnection':
        m1573(msg.key);
        break;
    case 'figRemoveAllSavedConnections':
        n1574();
        break;
    case 'figDeleteSavedConnectionsToNode':
        i1575(msg.nodeId);
        break;
    case 'figDeleteSavedConnectionsFromNode':
        b1576(msg.nodeId);
        break;
    case 'figRemovePluginDataFromAllLocalStyles':
        j1577();
        break;
    case 'figGetAllLocalVariables':
        r1601(msg.nodeId, msg.px, msg.py);
        break;
    case 'figLinkNodeToVariable':
        j1603(msg.nodeId, msg.variableId);
        break;
    case 'figUpdateVariable':
        figUpdateVariableAsync(msg.variableId, msg.value);
        break;
    case 'figGetAllLocalColorStyles':
        t1578(msg.nodeId, msg.px, msg.py);
        break;
    case 'figLinkNodeToExistingColorStyle':
        b1579(msg.nodeId, msg.styleId);
        break;
    case 'figExport':
        figExport(msg.objectIds, msg.scale, msg.format, msg.suffix);
        break;
    case 'figGetObjectSize':
        h1532(msg.object);
        break;
    case 'figGetVariableUpdates':
        h1567(msg.linkedVarIds);
        break;
    case 'figUpdateShowIds':
        v2800 = msg.v2800;
        break;
    case 'figUpdateObjectCenterSize':
        objectCenterSize = msg.objectCenterSize;
        break;
    case 'figDeleteAllObjects':
        a1508();
        break;
    case 'figUpdateObjectsAndStyles':
        j2745 = 0;
        b2746 = 0;
        msg.objects.forEach(o => o.counted = false);
        s2733(null, msg.objects, msg.k4022, msg.r2050, msg.nodeIds, msg.f2762, msg.n2763, msg.r270);
        v1584(msg);
        break;
    case 'figDeleteObjectsAndStyles':
        c1507(msg.nodeIds);
        r1515(msg.nodeIds, msg.x1516);
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
    case 'figSaveSnapshot':
        figSaveSnapshot(msg.index, msg.objectIds);
        break;
} c1527({ cmd: 'uiEndFigMessage', msgCmd: msg.cmd }); };
function c1527(msg) { figma.ui.postMessage(JSON.stringify(msg)); }
function s2734(key) {
    return __awaiter(this, void 0, void 0, function* () { return yield figma.clientStorage.getAsync(key); });
}
function q1545(key) { figma.currentPage.loadAsync().then(() => { if (key == 'canvasEmpty') {
    c1527({ cmd: 'uiReturnFigGetLocalData', key: key, value: figma.currentPage.children.length == 0 });
}
else if (key == 'debugWarningCrash') {
    figma.clientStorage.getAsync('debugWarning').then(data => { c1527({ cmd: 'uiReturnFigGetLocalData', key: key, value: data }); });
}
else {
    figma.clientStorage.getAsync(key).then(data => { c1527({ cmd: 'uiReturnFigGetLocalData', key: key, value: data }); });
} }); }
function y1546(key, value, postToUi = true) { figma.clientStorage.setAsync(key, value); if (postToUi) {
    c1527({ cmd: 'uiReturnFigSetLocalData', key: key, value: value });
} }
function k4032() {
    return __awaiter(this, void 0, void 0, function* () { const keys = yield figma.clientStorage.keysAsync(); for (const key of keys)
        figma.clientStorage.deleteAsync(key); });
}
function a1547(key, postToUi = true) {
    return __awaiter(this, void 0, void 0, function* () { yield figma.currentPage.loadAsync(); const data = figma.currentPage.getPluginData(key); if (postToUi) {
        c1527({ cmd: 'uiReturnFigGetPageData', key: key, value: data });
    } return data; });
}
function v1548(key, value) { y1549(key); figma.currentPage.setPluginData(key, value); }
function y1549(key) { figma.currentPage.setPluginData(key, ''); }
function k1550(debugMode) { figma.currentPage.loadAsync().then(() => { const pageKeys = figma.currentPage.getPluginDataKeys().filter(k => r1053(k)); const nodeKeys = figma.currentPage.getPluginDataKeys().filter(k => x1054(k)); const connKeys = figma.currentPage.getPluginDataKeys().filter(k => r1055(k)); if (!debugMode)
    l1552(nodeKeys, connKeys); const pages = pageKeys.map(k => figma.currentPage.getPluginData(k)); const nodes = nodeKeys.map(k => figma.currentPage.getPluginData(k)); const a2122 = connKeys.map(k => figma.currentPage.getPluginData(k)); const pageOrder = figma.currentPage.getPluginData('pageOrder').split(','); const currentPageId = figma.currentPage.getPluginData('currentPageId'); g1551(nodes); const showAllColorSpaces = figma.currentPage.getPluginData('showAllColorSpaces'); c1527({ cmd: 'uiReturnFigLoadNodesAndConns', showAllColorSpaces: showAllColorSpaces, pageKeys: pageKeys, pageJson: pages, pageOrder: pageOrder, currentPageId: currentPageId, nodeKeys: nodeKeys, nodeJson: nodes, connKeys: connKeys, connJson: a2122 }); }); }
function g1551(nodes) { d2732 = []; figma.getLocalPaintStylesAsync().then(paintStyles => { for (const z3019 of nodes) {
    const node = JSON.parse(z3019);
    if (node.type == h1216) {
        const style = paintStyles.find(s => { const nodeId = s.getPluginData('nodeId'); return nodeId == node.id; });
        if (style) {
            d2732.push({ nodeId: node.id, existing: t925(node.existing), styles: [style] });
        }
    }
} }); }
function l1552(nodeKeys, connKeys) { figma.currentPage.loadAsync().then(() => { const e2735 = '"loading": "true"'; const not = '{\n'; const set = '{\n' + r868 + e2735 + ',\n'; nodeKeys.forEach(k => figma.currentPage.setPluginData(k, figma.currentPage.getPluginData(k).replace(set, not).replace(not, set))); connKeys.forEach(k => figma.currentPage.setPluginData(k, figma.currentPage.getPluginData(k).replace(set, not).replace(not, set))); }); }
function o1553(pageIds, pageJson, currentPageId) { for (let i = 0; i < pageIds.length; i++) {
    v1548(c924(pageIds[i]), pageJson[i]);
} v1548('pageOrder', pageIds.join(',')); v1548('currentPageId', currentPageId); }
function p1554(nodeIds, nodeJson) { for (let i = 0; i < nodeIds.length; i++) {
    v1548(d922(nodeIds[i]), nodeJson[i]);
} }
function y2736() {
    return __awaiter(this, void 0, void 0, function* () { let keys = yield figma.clientStorage.keysAsync(); keys = keys.filter(k => k.length >= y876.length && k.substring(0, y876.length) == y876); c1527({ cmd: 'uiReturnGetAllLocalTemplateNames', templateNames: keys }); });
}
function l1555(i4033, template) { y1546(y876 + ' ' + i4033, template); }
function v1556(nodeIds) { figma.currentPage.loadAsync().then(() => { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => r1055(k)); for (const key of connKeys) {
    const parts = f1058(key).split(' ');
    if (nodeIds.includes(parts[0]) || nodeIds.includes(parts[2]))
        y1549(key);
} }); }
function y1557(nodeIds) { figma.currentPage.loadAsync().then(() => { v1556(nodeIds); const nodeKeys = figma.currentPage.getPluginDataKeys().filter(k => x1054(k) && nodeIds.includes(h1057(k))); nodeKeys.forEach(k => y1549(k)); }); }
function d1558() { figma.currentPage.loadAsync().then(() => { const nodeKeys = figma.currentPage.getPluginDataKeys().filter(k => x1054(k)); const connKeys = figma.currentPage.getPluginDataKeys().filter(k => r1055(k)); for (const key of nodeKeys)
    y1549(key); for (const key of connKeys)
    y1549(key); }); }
function r1559(j4008) {
    return __awaiter(this, void 0, void 0, function* () { yield n1560(j4008); s1561(j4008); });
}
function n1560(j4008) {
    return __awaiter(this, void 0, void 0, function* () { yield figma.currentPage.loadAsync(); figma.currentPage.getPluginDataKeys().filter(k => x1054(k)).forEach((k) => __awaiter(this, void 0, void 0, function* () { return yield i2102(k, j4008); })); });
}
function s1561(j4008) { figma.currentPage.loadAsync().then(() => { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => r1055(k)); connKeys.sort((key1, key2) => { const p1 = f1058(key1).split(' '); const p2 = f1058(key2).split(' '); if (p1[2] != p2[2])
    return p1[2] < p2[2] ? -1 : 1; if (p1[3] != p2[3])
    return parseInt(p1[3]) - parseInt(p2[3]); if (p1[2] == p2[0])
    return -1; if (p2[2] == p1[0])
    return 1; return 0; }); connKeys.forEach(k => b2105(JSON.parse(figma.currentPage.getPluginData(k)), j4008)); }); }
function o1562(j4008) { figma.currentPage.loadAsync().then(() => { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => r1053(k)); connKeys.forEach(k => console.log('%c' + k, 'background: #fff; color: ' + (j4008 ? 'black' : 'white'))); const pageOrder = figma.currentPage.getPluginData('pageOrder'); console.log('%c' + pageOrder, 'background: #fff; color: ' + (j4008 ? 'black' : 'white')); }); }
function t1563(j4008) { figma.currentPage.loadAsync().then(() => { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => r1053(k)); connKeys.forEach(k => console.log('%c' + figma.currentPage.getPluginData(k), 'background: #fff; color: ' + (j4008 ? 'black' : 'white'))); const pageOrder = figma.currentPage.getPluginData('pageOrder'); console.log('%c' + pageOrder, 'background: #fff; color: ' + (j4008 ? 'black' : 'white')); }); }
function u1564(j4008) { figma.currentPage.loadAsync().then(() => { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => r1055(k)); connKeys.forEach(k => console.log('%c' + k, 'background: #dff; color: ' + (j4008 ? 'black' : 'white'))); }); }
function n1565(j4008) { figma.clientStorage.keysAsync().then(keys => keys.forEach(k => figma.clientStorage.getAsync(k).then(val => console.log(k + ': ' + val)))); }
function o1566(key, spec) {
    return __awaiter(this, void 0, void 0, function* () { let result = null; switch (key) {
        case 'getVariableData':
            result = yield z1602(spec);
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
function h1567(varIds) { z1602(varIds).then(values => { c1527({ cmd: 'uiReturnFigGetVariableUpdates', values: values }); }); }
function b1568(pageId) {
    return __awaiter(this, void 0, void 0, function* () { y1549(g934(pageId)); const pageOrder = (yield a1547('pageOrder')).split(','); y947(pageOrder, id => id == pageId); v1548('pageOrder', pageOrder.join(',')); });
}
function l1569() { figma.currentPage.loadAsync().then(() => { const pageKeys = figma.currentPage.getPluginDataKeys().filter(k => r1053(k)); pageKeys.forEach(k => y1549(k)); y1549('pageOrder'); }); }
function r1570(key, json) { v1548(key, json); }
function v1571(_keys, _json) { const keys = JSON.parse(_keys); const json = JSON.parse(_json); for (let i = 0; i < keys.length; i++)
    v1548(keys[i], json[i]); }
function d1572(_curKeys, _newKeys, _json) { const curKeys = JSON.parse(_curKeys); const newKeys = JSON.parse(_newKeys); const json = JSON.parse(_json); for (let i = 0; i < curKeys.length; i++) {
    y1549(curKeys[i]);
    v1548(newKeys[i], json[i]);
} }
function m1573(key) { y1549(key); }
function n1574() { figma.currentPage.loadAsync().then(() => { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => r1055(k)); connKeys.forEach(k => y1549(k)); }); }
function i1575(nodeId) { figma.currentPage.loadAsync().then(() => { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => r1055(k)); for (const key of connKeys) {
    const parts = key.split(' ');
    if (parts[4] == nodeId)
        y1549(key);
} }); }
function b1576(nodeId) { figma.currentPage.loadAsync().then(() => { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => r1055(k)); for (const key of connKeys) {
    const parts = key.split(' ');
    if (parts[1] == nodeId)
        y1549(key);
} }); }
function j1577() { figma.getLocalPaintStylesAsync().then(q1581 => { for (const style of q1581) {
    style.setPluginData('type', '');
    style.setPluginData('nodeId', '');
    style.setPluginData('existing', '');
} }); }
function figSaveSnapshot(index, objectIds) {
    return __awaiter(this, void 0, void 0, function* () { const objects = yield figGetObjectsFromIds(objectIds); const group = figma.group(objects, figma.currentPage); const settings = { format: 'PNG' }; const icon = yield group.exportAsync(settings); figma.ungroup(group); c1527({ cmd: 'uiReturnFigSaveSnapshot', index: index, iconWidth: group.width, iconHeight: group.height, icon: icon }); });
}
var e2737 = null;
var d4034 = () => e2737 = null;
var d2738 = 'normal';
function b1593(clientPosition) { c1527({ cmd: 'uiReturnFigGetMousePosition', position: { x: 0, y: 0 }, clientPosition: clientPosition, viewportZoom: figma.viewport.zoom, viewportRect: figma.viewport.bounds }); }
function n1594(x, y, width, height) { return; }
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
function a1596(width, height) { (function () {
    return __awaiter(this, void 0, void 0, function* () { width = Math.floor(Math.max(0, width)); height = Math.floor(Math.max(0, height)); figma.ui.resize(width, height); yield figma.currentPage.loadAsync(); figma.currentPage.setPluginData(figma.currentUser.id + ',windowWidth', width.toString()); figma.currentPage.setPluginData(figma.currentUser.id + ',windowHeight', height.toString()); c1527({ cmd: 'uiReturnFigResizeWindow', width: width, height: height }); });
})(); }
function i2739(dock) {
    return __awaiter(this, void 0, void 0, function* () { if (dock != 'normal' && d2738 == 'normal') {
        figma.clientStorage.setAsync('normalWindowX', yield figma.clientStorage.getAsync('normalWindowX'));
        figma.clientStorage.setAsync('normalWindowY', yield figma.clientStorage.getAsync('normalWindowY'));
        figma.clientStorage.setAsync('normalWindowWidth', yield figma.clientStorage.getAsync('normalWindowWidth'));
        figma.clientStorage.setAsync('normalWindowHeight', yield figma.clientStorage.getAsync('normalWindowHeight'));
    } d2738 = dock; figma.clientStorage.setAsync('windowDock', dock); a1596(yield figma.clientStorage.getAsync('windowWidth'), yield figma.clientStorage.getAsync('windowHeight')); });
}
function b1597(msg) { u1598(msg.text, msg.prefix, msg.delay, msg.error, msg.a1599, msg.b1600); }
function u1598(text, prefix = 'Generator ', delay = 400, error = false, a1599 = '', b1600 = NULL) { const options = { timeout: delay, error: error, onDequeue: d4034 }; if (a1599 != '') {
    options['button'] = { text: a1599 };
    if (b1600.substring(0, 'removeConnection'.length) == 'removeConnection') {
        options['button']['action'] = () => m1573(b1600.split(',')[1]);
    }
    else {
        switch (b1600) {
            case 'hideClearUndoWarning':
                options['button']['action'] = () => c1527({ cmd: 'uiHideClearUndoWarning' });
                break;
        }
    }
} if (e2737)
    e2737.cancel(); e2737 = figma.notify(prefix + text, options); }
function b2740(key, params = null) {
    return __awaiter(this, void 0, void 0, function* () { return yield f2741(key, params); });
}
function f2741(key, params = null) {
    return __awaiter(this, void 0, void 0, function* () { return new Promise((resolve, reject) => { const timeout = 60000; c1527(Object.assign({ cmd: 'uiGetValueForFigma', key: key }, (params || {}))); const k2742 = setTimeout(() => reject(new Error('Timeout: Result not received by Figma within the specified time')), timeout); function d4035(msg) { msg = JSON.parse(msg); if (msg.cmd === 'returnUiGetValueForFigma') {
        clearTimeout(k2742);
        resolve({ key: msg.key, value: msg.value });
        figma.ui.off('message', d4035);
    } } figma.ui.on('message', d4035); }); });
}
var s2743 = [];
var h2744 = [];
var j2745 = 0;
var b2746 = 0;
function n1528(o111) { return (o111[g1390] === 2 ? '' : c872) + (v2800 ? o111[c1384] : o111[e1386]); }
function g1529(j1513, addObject = null) {
    return __awaiter(this, void 0, void 0, function* () { if (!t1531(j1513))
        return null; let f1514; switch (j1513[f1382]) {
        case l1219:
            f1514 = t2714(j1513);
            break;
        case i1222:
            f1514 = y2793(j1513);
            break;
        case l1225:
            f1514 = b2789(j1513);
            break;
        case c1237:
            f1514 = a2710(j1513);
            break;
        case h1240:
            f1514 = u2717(j1513);
            break;
        case v1243:
            f1514 = r2720(j1513);
            break;
        case t1246:
            f1514 = l2696(j1513);
            break;
        case h1250:
            f1514 = r2748(j1513);
            break;
        case z1262:
            f1514 = g2749(j1513);
            break;
        case y1285:
            f1514 = yield x2750(j1513);
            break;
        case j1265:
            f1514 = yield q2751(j1513);
            break;
        case l1268:
            f1514 = yield m2752(j1513);
            break;
    } if (addObject && f1514 != undefined && f1514 != null && !f1514.removed) {
        f1514.name = n1528(j1513);
        i954(j1513[f1382] == j1265 || !!f1514, 'no Figma object created');
        if (f1514 != undefined && f1514 != null) {
            f1514.setPluginData('retain', j1513[g1390].toString());
            if (j1513[g1390] < 2) {
                f1514.setPluginData('userId', figma.currentUser.id);
                f1514.setPluginData('sessionId', figma.currentUser.sessionId.toString());
                f1514.setPluginData('type', j1513[f1382]);
                f1514.setPluginData('nodeId', j1513[p1383]);
                f1514.setPluginData('objectId', j1513[c1384]);
                f1514.setPluginData('isCenter', i939(j1513[p1405]));
                if (j1513[f1382] == t1246)
                    n2766.push(f1514);
                if (j1513[x1404])
                    o1544(f1514);
            }
            addObject(f1514);
        }
    } if (!j1513.counted) {
        b2746++;
        j1513.counted = true;
    } return f1514; });
}
function t1530(f1514, j1513) {
    return __awaiter(this, void 0, void 0, function* () { if (!t1531(j1513) || f1514 == undefined || f1514 == null || f1514.removed)
        return; f1514.name = n1528(j1513); f1514.setPluginData('retain', j1513[g1390].toString()); switch (j1513[f1382]) {
        case l1219:
            s2715(f1514, j1513);
            break;
        case i1222:
            h2794(f1514, j1513);
            break;
        case l1225:
            v2790(f1514, j1513);
            break;
        case c1237:
            r2711(f1514, j1513);
            break;
        case h1240:
            h2718(f1514, j1513);
            break;
        case v1243:
            l2721(f1514, j1513);
            break;
        case t1246:
            r2753(f1514, j1513);
            break;
        case h1250:
            d2754(f1514, j1513);
            break;
        case z1262:
            q2755(f1514, j1513);
            break;
        case y1285:
            i2756(f1514, j1513);
            break;
        case j1265:
            f2757(f1514, j1513);
            break;
        case l1268:
            r2758(f1514, j1513);
            break;
    } if (f1514 != undefined && f1514 != null && !f1514.removed) {
        if (f1514.parent == figma.currentPage)
            yield figma.currentPage.loadAsync();
        f1514.parent.appendChild(f1514);
        if (j1513[x1404])
            o1544(f1514);
    } if (!j1513.counted) {
        b2746++;
        j1513.counted = true;
    } });
}
function s2733(e2759, b2760, e2761, r2050 = -1, nodeIds = [], f2762 = false, n2763 = false, r270 = false) {
    return __awaiter(this, void 0, void 0, function* () { let t2764 = NULL; let b2765 = null; let abort = false; const y3643 = []; let n2747 = 0; s2743.push(...nodeIds); if (r2050 > -1)
        j2745 = r2050; for (const j1513 of b2760) {
        h2744.push(j1513);
        if (j1513[p1383] != t2764) {
            t2764 = j1513[p1383];
            b2765 = r2730.find(a => a.nodeId == j1513[p1383]);
            if (!b2765) {
                r2730.push(b2765 = { nodeId: j1513[p1383], objects: [] });
            }
        }
        const addObject = f1514 => { if (e2759 != undefined && e2759 != null && !e2759.removed)
            e2759.appendChild(f1514);
        else
            b2765.objects.push(f1514); };
        let objects = e2759 != undefined && e2759 != null && !e2759.removed ? e2759.children : b2765.objects;
        let f1514 = objects.find(o => o.removed || o.getPluginData('userId') == figma.currentUser.id && o.getPluginData('objectId') == j1513[c1384]);
        if (f1514 != undefined && f1514 != null && f1514.removed) {
            o940(objects, f1514);
            if (n2766.includes(f1514))
                b945(n2766, f1514);
            if (w2782.includes(f1514))
                b945(w2782, f1514);
        }
        if (f1514 == undefined || f1514 == null || f1514.removed) {
            const newObj = yield g1529(j1513, addObject);
            y3643.push(newObj);
        }
        else if (f1514 != undefined && f1514 != null && !f1514.removed && f1514.getPluginData('type') == j1513[f1382].toString()) {
            yield t1530(f1514, j1513);
            if (f1514 != undefined && f1514 != null && !f1514.removed)
                y3643.push(f1514);
        }
        else {
            f1514.remove();
            if (n2766.includes(f1514))
                b945(n2766, f1514);
            if (w2782.includes(f1514))
                b945(w2782, f1514);
            yield g1529(j1513, addObject);
        }
        n2747++;
        if (n2747 >= e2761) {
            const result = yield b2740('returnObjectUpdate', { j2745: j2745, b2746: b2746 });
            abort = result.value;
            n2747 = 0;
            if (abort)
                break;
        }
    } if (e2759 != undefined && e2759 != null && !e2759.removed) {
        for (const f1514 of e2759.children) {
            if (f1514 != undefined && f1514 != null && f1514.removed || !b2760.find(o => o[c1384] == f1514.getPluginData('objectId') && f1514.getPluginData('userId') == figma.currentUser.id))
                f1514.remove();
        }
    } for (const point of n2766) {
        if (point.parent == figma.currentPage)
            yield figma.currentPage.loadAsync();
        if (point != undefined && point != null && !point.removed && !point.parent.removed)
            point.parent.appendChild(point);
    } if (n2763 && !abort) {
        h1510(s2743, h2744);
        s2743 = [];
        h2744 = [];
        if (r270 && y3643.length > 0) {
            figma.viewport.scrollAndZoomIntoView(y3643);
            const bounds = i1534(y3643);
            figma.viewport.zoom = Math.min(figma.viewport.bounds.width * figma.viewport.zoom / bounds.width - 0.05, figma.viewport.bounds.height * figma.viewport.zoom / bounds.height - 0.05);
        }
    } yield b2740('returnObjectUpdate', { j2745: j2745, b2746: b2746 }); });
}
function t1531(j1513) { switch (j1513[f1382]) {
    case l1219: return w2713(j1513);
    case i1222: return m2775(j1513);
    case l1225: return b2776(j1513);
    case c1237: return m4031(j1513);
    case h1240: return y2716(j1513);
    case v1243: return m2719(j1513);
    case t1246: return f4030(j1513);
    case h1250: return p2777(j1513);
    case z1262: return n2778(j1513);
    case y1285: return x2779(j1513);
    case j1265: return c2780(j1513);
    case l1268: return a2781(j1513);
} }
function h1532(j1513) {
    return __awaiter(this, void 0, void 0, function* () { (() => __awaiter(this, void 0, void 0, function* () { const f1514 = yield g1529(j1513); const width = f1514.width; const height = f1514.height; f1514.remove(); c1527({ cmd: 'uiForwardToGenerator', msg: { cmd: 'returnFigGetObjectSize', objectId: j1513[c1384], width: width, height: height } }); }))(); });
}
function r1533(f1514) { f1514.setPluginData('type', ''); f1514.setPluginData('nodeId', ''); f1514.setPluginData('userId', ''); f1514.setPluginData('sessionId', ''); f1514.setPluginData('objectId', ''); f1514.setPluginData('isCenter', ''); f1514.setPluginData('retain', ''); }
function i1534(objects) { const bounds = { left: 0, top: 0, right: 0, bottom: 0 }; for (const o111 of objects) {
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
        let f1514 = figma.currentPage.children.find(o => !o.removed && o.getPluginData('userId') == figma.currentUser.id && o.getPluginData('objectId') == objId);
        if (!f1514)
            continue;
        const settings = { constraint: { type: 'SCALE', value: scale }, format: format == 0 ? 'PNG' : 'JPG', suffix: suffix };
        yield f1514.exportAsync(settings);
    } });
}
const w2782 = [];
const r2783 = [];
function t1535(z1536, c1537) { const effects = []; for (const effect of z1536) {
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
                if (c1537 && !isNaN(spread))
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
function z2703(f1514, j1513, phantom = true) { e1540(f1514, j1513); j2704(f1514, j1513, phantom); o2705(f1514, j1513); f1514.opacity = j1513[w1406]; f1514.blendMode = j1513[a1407]; const maskType = j1513[c1408]; f1514.isMask = maskType > 0; if (f1514.isMask) {
    switch (maskType) {
        case 1:
            f1514.maskType = 'ALPHA';
            break;
        case 2:
            f1514.maskType = 'VECTOR';
            break;
        case 3:
            f1514.maskType = 'LUMINANCE';
            break;
    }
} if (f1514.isMask && f1514.fills.length == 0 && f1514.strokes.length == 0)
    f1514.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 }, opacity: 1, blendMode: 'NORMAL' }]; }
function o2705(f1514, j1513) { if (!!j1513[q1395] && !isEmpty(j1513[q1395])) {
    f1514.fills = y958(j1513[q1395]);
    if (w2782.includes(f1514))
        b945(w2782, f1514);
}
else
    f1514.fills = []; }
function j2704(f1514, j1513, phantom = true) { if (j1513[t1396] != null && !isEmpty(j1513[t1396])) {
    a1539(f1514, y958(j1513[t1396]), j1513[w1397], j1513[l1398], j1513[n1399], j1513[n1400], j1513[u1401], s2706(j1513[h1402]));
    if (j1513[x1404])
        f1514.setPluginData('dashes', j1513[h1402]);
    if (w2782.includes(f1514))
        b945(w2782, f1514);
    if (j1513[x1404])
        p951(r2783, f1514);
}
else if (isEmpty(j1513[q1395]) && isEmpty(j1513[t1396]) && !j1513[c1408] && phantom) {
    v1542(f1514);
    p951(w2782, f1514);
}
else
    f1514.strokes = []; }
function s2706(t1538) { t1538 = t1538; t1538 = l956(t1538, ','); t1538 = e957(t1538, ','); t1538 = t1538.trim(); return t1538 == '' ? [] : t1538.split(',').map(s => Math.max(0, parseFloat(s))); }
function d2707(t1538) { t1538 = t1538; t1538 = l956(t1538, ','); t1538 = e957(t1538, ','); t1538 = t1538.trim(); return t1538 == '' ? [] : t1538.split(',').map(s => Math.max(0, parseFloat(s) / l2709)); }
function a1539(f1514, fills, weight, align, join, miterLimit, cap, dashes = []) { f1514.strokes = fills; f1514.strokeWeight = Math.max(0, weight); f1514.strokeAlign = align; f1514.strokeJoin = join; const miterAngle = miterLimit / 360 * Tau; const d2784 = 1 / Math.sin(miterAngle / 2); f1514.strokeMiterLimit = Math.min(Math.max(0, d2784), 16); f1514.strokeCap = cap; f1514.dashPattern = dashes; }
function e1540(f1514, j1513) { if (!!j1513[u1403] && !isEmpty(j1513[u1403])) {
    const c1537 = j1513[f1382] == l1219 || j1513[f1382] == l1225 || j1513[f1382] == l1268;
    f1514.effects = t1535(j1513[u1403], c1537);
}
else
    f1514.effects = []; }
function o1541() { for (const o111 of w2782) {
    if (o111.removed)
        b945(w2782, o111);
    else
        v1542(o111);
} }
function v1542(o111) { figma.currentPage.loadAsync().then(() => { const back = figma.currentPage.backgrounds.find(b => b.type == 'SOLID'); let phantomColor; if (back) {
    const l = back.color.r * 0.2126 + back.color.g * 0.7152 + back.color.b * 0.0722;
    phantomColor = l > 0.5 ? { r: 0, g: 0, b: 0 } : { r: 1, g: 1, b: 1 };
}
else
    phantomColor = { r: 1, g: 0, b: 1 }; a1539(o111, [{ type: 'SOLID', color: phantomColor, opacity: 0.5 }], 1 / l2709, 'CENTER', 'MITER', 1, 'NONE', [1 / l2709, 2 / l2709]); }); }
function o1543() { for (const f1514 of r2783) {
    if (f1514.removed)
        b945(r2783, f1514);
    else
        o1544(f1514);
} }
function o1544(f1514) { f1514.strokeWeight = Math.max(0, 1.5 / l2709); if (t925(f1514.getPluginData('isCenter'))) {
    const path = f1514.vectorPaths[0];
    const parts = path.data.split(' ');
    let t = { x: parseFloat(parts[1]), y: parseFloat(parts[2]) };
    let c = { x: parseFloat(parts[4]), y: parseFloat(parts[5]) };
    let r = { x: parseFloat(parts[7]), y: parseFloat(parts[8]) };
    const a = 2;
    const b = 0.05;
    const f = 1 - Math.pow(1 - Math.min(l2709, 1), a) / Math.pow(a, b);
    t = n897(c, q899(t884(y902(t, c)), objectCenterSize / f));
    r = n897(c, q899(t884(y902(r, c)), objectCenterSize / f));
    parts[1] = t.x;
    parts[2] = t.y;
    parts[4] = c.x;
    parts[5] = c.y;
    parts[7] = r.x;
    parts[8] = r.y;
    const b2785 = { windingRule: path.windingRule, data: parts.join(' ') };
    f1514.vectorPaths = [b2785];
} const dashes = f1514.getPluginData('dashes'); if (dashes != '')
    f1514.dashPattern = d2707(dashes); }
function t1578(nodeId, px, py) { figma.getLocalPaintStylesAsync().then(_styles => { const styles = new Array(); for (const v168 of _styles) {
    const _nodeId = v168.getPluginData('nodeId');
    const _existing = v168.getPluginData('existing');
    const existing = !!_existing;
    const style = { id: v168.id, nodeId: _nodeId, name: v168.name, existing: existing, paints: new Array() };
    let onlyPaint = true;
    for (const l2787 of v168.paints) {
        if (l2787.type == 'SOLID') {
            style.paints.push([l2787.color.r, l2787.color.g, l2787.color.b, l2787.opacity]);
        }
        else {
            onlyPaint = false;
            break;
        }
    }
    if (onlyPaint)
        styles.push(style);
} c1527({ cmd: 'uiReturnFigGetAllLocalColorStyles', nodeId: nodeId, px: px, py: py, styles: JSON.stringify(styles) }); }); }
function b1579(nodeId, styleId) { figma.getLocalPaintStylesAsync().then(q1581 => { if (styleId != NULL)
    s1580(q1581, nodeId, styleId);
else
    h1582(q1581, nodeId); }); }
function s1580(q1581, nodeId, styleId, clearExisting = true) { const m2786 = d2732.find(a => a.nodeId == nodeId); if (m2786 && clearExisting)
    h1582(q1581, nodeId); const h1586 = q1581.find(s => s.id == styleId); i954(!!h1586, 'figStyle should be found here'); h1586.setPluginData('type', h1216); h1586.setPluginData('nodeId', nodeId); h1586.setPluginData('existing', i939(true)); d2732.push({ nodeId: nodeId, existing: true, styles: [h1586] }); return h1586; }
function h1582(q1581, nodeId) { const h1586 = q1581.find(s => s.getPluginData('nodeId') == nodeId); i954(!!h1586, 'figStyle should be found here'); if (h1586) {
    h1586.setPluginData('type', NULL);
    h1586.setPluginData('nodeId', NULL);
    h1586.setPluginData('existing', NULL);
    y947(d2732, a => a.nodeId == nodeId);
} return h1586; }
function p1583(styles, t1587) { const h1586 = figma.createPaintStyle(); h1586.setPluginData('type', t1587[f1382]); h1586.setPluginData('nodeId', t1587[p1383]); h1586.name = t1587[v1387]; setStylePaints(h1586, t1587); styles.push(h1586); c1527({ cmd: 'uiSetStyleId', nodeId: t1587[p1383], styleId: h1586.id }); return h1586; }
function v1584(msg) { let t2764 = NULL; let m2786; for (const t1587 of msg.styles) {
    if (t1587[p1383] != t2764) {
        t2764 = t1587[p1383];
        m2786 = d2732.find(a => a.nodeId == t1587[p1383]);
        if (!m2786) {
            m2786 = { nodeId: t1587[p1383], styles: [] };
            d2732.push(m2786);
        }
    }
    else
        m2786 = null;
    const h1586 = m2786.styles[0];
    figma.getLocalPaintStylesAsync().then(q1581 => { const localStyle = q1581.find(s => s.getPluginData('nodeId') == t1587[p1383]); if (isValid(h1586) && !isValid(localStyle)) {
        o940(m2786.styles, h1586);
    } const existing = isValid(h1586) && isValid(localStyle) && h1586.getPluginData('existing'); if (!isValid(h1586) || !isValid(localStyle)) {
        if (!existing) {
            x1517 = true;
            b1579(t1587[p1383], t1587[b1385]);
        }
    }
    else if (isValid(h1586) && h1586.getPluginData('type') == t1587[f1382]) {
        x1517 = true;
        m1585(localStyle, t1587);
    } });
} }
function m1585(h1586, t1587) { setStylePaints(h1586, t1587); h1586.name = t1587[v1387]; }
function getStylePaints(stylePaints) { const paints = new Array(); for (const l2787 of stylePaints) {
    const fill = l2787[1].split(' ');
    switch (l2787[0]) {
        case 'SOLID':
            paints.push({ type: 'SOLID', color: { r: Math.min(Math.max(0, parseFloat(fill[0]) / 0xff), 1), g: Math.min(Math.max(0, parseFloat(fill[1]) / 0xff), 1), b: Math.min(Math.max(0, parseFloat(fill[2]) / 0xff), 1) }, opacity: Math.min(Math.max(0, parseFloat(fill[3]) / 100), 1) });
            break;
    }
} return paints; }
function setStylePaints(h1586, t1587) { if (!isEmpty(t1587[k1389]))
    h1586.paints = getStylePaints(t1587[k1389]);
else
    h1586.paints = []; }
function r1601(nodeId, px, py) {
    return __awaiter(this, void 0, void 0, function* () { figma.variables.getLocalVariablesAsync().then((p2788) => __awaiter(this, void 0, void 0, function* () { const variables = new Array(); for (const _var of p2788) {
        const collection = yield figma.variables.getVariableCollectionByIdAsync(_var.variableCollectionId);
        const variable = { id: _var.id, resolvedType: _var.resolvedType, name: _var.name, collectionName: collection.name };
        variables.push(variable);
    } figma.variables.getLocalVariableCollectionsAsync().then((collections) => __awaiter(this, void 0, void 0, function* () { c1527({ cmd: 'uiReturnFigGetAllLocalVariables', nodeId: nodeId, px: px, py: py, variables: JSON.stringify(variables), nCollections: collections.length }); })); })); });
}
function z1602(varIds) {
    return __awaiter(this, void 0, void 0, function* () { const p2788 = yield figma.variables.getLocalVariablesAsync(); const variables = varIds.map(id => p2788.find(v => v.id == id)); let values = []; for (let i = 0; i < varIds.length; i++) {
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
function j1603(nodeId, varId) { figma.variables.getLocalVariablesAsync().then(p2788 => { figLinkVariableAsync(p2788, nodeId, varId); }); }
function figUpdateVariableAsync(varId, value) {
    return __awaiter(this, void 0, void 0, function* () { figma.variables.getLocalVariablesAsync().then((p2788) => __awaiter(this, void 0, void 0, function* () { let variable = p2788.find(v => v.id == varId); if (!variable)
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
function figLinkVariableAsync(p2788, nodeId, varId) {
    return __awaiter(this, void 0, void 0, function* () { let variable = p2788.find(v => v.id == varId); if (!variable)
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
function c1588(tl, tr, bl) { let vr = point(tr.x - tl.x, tr.y - tl.y); let vb = point(bl.x - tl.x, bl.y - tl.y); let sx = vr.x; let sy = vb.y; let kx = -vr.y; let ky = -vb.x; let dx = -tl.x; let dy = -tl.y; const _sx = kx / nozero(sx); const _sy = ky / nozero(sy); let n4212 = h887([[1, _sy, 0], [_sx, 1, 0], [0, 0, 1]], p891(dx, dy)); n4212 = x889(n4212); const a = t881(vr); if (a > Tau / 4 && a < Tau * 3 / 4)
    n4212 = h887(n4212, p891(0, 0, 1, 1, Tau / 2)); if (determinant(n4212) < 0)
    n4212 = h887(n4212, p891(0, 0, -1, 1, 0)); return n4212; }
function x1589(f1514, tl, tr, bl) { const n4212 = c1588(tl, tr, bl); f1514.relativeTransform = [n4212[0], n4212[1]]; }
function y1590(f1514, j1513, setSize = true, noHeight = 0.01) { if (!j1513[i1391] || !j1513[o1392] || !j1513[c1393])
    return; const xp0 = j1513[i1391]; const xp1 = j1513[o1392]; const xp2 = j1513[c1393]; x1589(f1514, xp0, xp1, xp2); if (setSize) {
    const i892 = distv(xp0, xp1);
    const q893 = distv(xp0, xp2);
    const height = j1513[f1382] == v1243 ? j1513[s1426] : j1513[c1413];
    if (!f1514.removed) {
        f1514.resizeWithoutConstraints(Math.max(0.01, i892), height ? Math.max(0.01, q893) : noHeight);
    }
} }
function a1591(q2701, a2702) { if (q2701.removed)
    return; q2701.resizeWithoutConstraints(0.01, 0.01); q2701.setPluginData('actualX', a2702[p1409].toString()); q2701.setPluginData('actualY', a2702[f1411].toString()); q2701.x = a2702[p1409]; q2701.y = a2702[f1411]; q2701.rotation = a2702[p1405] ? 45 : 0; }
function z1592(q2701) { if (!q2701.removed)
    q2701.resizeWithoutConstraints(0.01, 0.01); }
function x2779(genBool) { return genBool.children.length > 0; }
function x2750(genBool) {
    return __awaiter(this, void 0, void 0, function* () { let objects = []; for (const o111 of genBool.children)
        yield g1529(o111, o => objects = [...objects, o]); yield figma.currentPage.loadAsync(); let figBool = null; if (!isEmpty(objects)) {
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
        y1590(figBool, genBool);
        if (!x2779(genBool))
            return figBool;
    } return figBool; });
}
function i2756(figBool, genBool, isValid = false) { if (!isValid && !x2779(genBool)) {
    figBool.remove();
    return;
} y1590(figBool, genBool); s2733(figBool, genBool.children, genBool.children.length); }
function b2776(t2767) { return t2767[p1409] != null && !isNaN(t2767[p1409]) && t2767[f1411] != null && !isNaN(t2767[f1411]) && t2767[o1412] != null && !isNaN(t2767[o1412]) && t2767[c1413] != null && !isNaN(t2767[c1413]) && t2767[p1415] != null && !isNaN(t2767[p1415]) && t2767[l1422] != null && !isNaN(t2767[l1422]) && t2767[a1428] != null && !isNaN(t2767[a1428]) && t2767[m1432] != null && !isNaN(t2767[m1432]); }
function b2789(t2767) { if (!b2776(t2767))
    return null; const e2768 = figma.createEllipse(); v2790(e2768, t2767, true); return e2768; }
function v2790(e2768, t2767, isValid = false) { if (!isValid && !b2776(t2767))
    return; t2791(e2768, t2767); if (n2766.includes(e2768))
    e2698(e2768);
else
    z2703(e2768, t2767); }
function t2791(e2768, t2767) { e2768.cornerRadius = t2767[p1415]; const start = t2767[l1422] / 360 * (Math.PI * 2); const sweep = t2767[a1428] / 100 * (Math.PI * 2); e2768.arcData = { startingAngle: start, endingAngle: start + sweep, innerRadius: Math.min(Math.max(0, t2767[m1432] / 100), 1) }; y1590(e2768, t2767); }
function a2781(p2769) { return p2769[p1409] != null && !isNaN(p2769[p1409]) && p2769[f1411] != null && !isNaN(p2769[f1411]) && p2769[o1412] != null && !isNaN(p2769[o1412]) && p2769[c1413] != null && !isNaN(p2769[c1413]) && p2769[l1421] != null && !isNaN(p2769[l1421]); }
function m2752(p2769) {
    return __awaiter(this, void 0, void 0, function* () { if (!a2781(p2769))
        return null; const t2770 = figma.createFrame(); if (t2770) {
        m2792(t2770, p2769);
        let objects = [];
        for (const o111 of p2769[z1427])
            yield g1529(o111, o => objects = [...objects, o]);
        for (const o111 of objects)
            t2770.appendChild(o111);
    } return t2770; });
}
function r2758(t2770, p2769) { m2792(t2770, p2769); s2733(t2770, p2769[z1427], p2769[z1427].length); }
function m2792(t2770, p2769) { t2770.cornerRadius = p2769[l1421]; y1590(t2770, p2769); z2703(t2770, p2769, p2769[z1427].length == 0); }
function c2780(u2771) { return true; }
function q2751(u2771) {
    return __awaiter(this, void 0, void 0, function* () { let objects = []; for (const o111 of u2771[k1410])
        yield g1529(o111, o => objects = [...objects, o]); yield figma.currentPage.loadAsync(); const r2772 = !isEmpty(objects) ? figma.group(objects, figma.currentPage) : null; if (r2772)
        f2757(r2772, u2771); return r2772; });
}
function f2757(r2772, u2771) { if (u2771[k1410].length == 0) {
    r2772.remove();
    return;
} s2733(r2772, u2771[k1410], u2771[k1410].length); e1540(r2772, u2771); }
function m2775(z2773) { return z2773[p1409] != null && !isNaN(z2773[p1409]) && z2773[f1411] != null && !isNaN(z2773[f1411]) && z2773[o1412] != null && !isNaN(z2773[o1412]); }
function y2793(z2773) { if (!m2775(z2773))
    return null; const l2774 = figma.createLine(); h2794(l2774, z2773, true); return l2774; }
function h2794(l2774, z2773, isValid = false) { if (!isValid && !m2775(z2773))
    return; y1590(l2774, z2773, true, 0); z2703(l2774, z2773); }
var n2766 = [];
function f4030(a2702) { return a2702[p1409] != null && !isNaN(a2702[p1409]) && a2702[f1411] != null && !isNaN(a2702[f1411]); }
function l2696(a2702) { const q2701 = a2702[p1405] ? figma.createRectangle() : figma.createEllipse(); if (!f4030(a2702))
    return q2701; if (n2766.includes(q2701))
    b2700(q2701, a2702);
else
    r2753(q2701, a2702); return q2701; }
function r2753(q2701, a2702) { a1591(q2701, a2702); v2699(q2701); }
function t2697() { c1527({ cmd: 'uiUpdateZoom', zoom: figma.viewport.zoom }); for (const point of n2766)
    e2698(point); }
function e2698(q2701) { z1592(q2701); v2699(q2701); }
function b2700(q2701, a2702) { a1591(q2701, a2702); v2699(q2701); }
function v2699(q2701) { if (q2701.removed)
    return; figma.currentPage.loadAsync().then(() => { const k3741 = t925(q2701.getPluginData('isCenter')); const p2708 = figma.currentPage.selection.includes(q2701); const color = k3741 ? [0xf2, 0x48, 0x22] : p2708 ? [12, 140, 233] : [255, 255, 255]; const border = k3741 ? [255, 255, 255] : p2708 ? [255, 255, 255] : [12, 140, 233]; q2701.fills = y958([['SOLID', color[0], color[1], color[2], 100]]); const effects = []; effects.push(...t1535([['DROP_SHADOW', border[0] / 255, border[1] / 255, border[2] / 255, 1, 0, 0, 0, (k3741 ? 3 : p2708 ? 5 : 3.6) / l2709, 'NORMAL', true, true]], true)); effects.push(...t1535([['DROP_SHADOW', color[0] / 255, color[1] / 255, color[2] / 255, 1, 0, 0, 0, (p2708 ? 4 : 2.4) / l2709, 'NORMAL', true, true]], true)); q2701.effects = effects; }); }
function m4031(genPoly) { return genPoly[p1409] != null && !isNaN(genPoly[p1409]) && genPoly[f1411] != null && !isNaN(genPoly[f1411]) && genPoly[o1412] != null && !isNaN(genPoly[o1412]) && genPoly[c1413] != null && !isNaN(genPoly[c1413]) && genPoly[q1418] != null && !isNaN(genPoly[q1418]) && genPoly[t1424] != null && !isNaN(genPoly[t1424]); }
function a2710(genPoly) { if (!m4031(genPoly))
    return null; const figPoly = figma.createPolygon(); r2711(figPoly, genPoly, true); return figPoly; }
function r2711(figPoly, genPoly, isValid = false) { if (!isValid && !m4031(genPoly))
    return; figPoly.cornerRadius = genPoly[q1418]; figPoly.pointCount = Math.max(3, genPoly[t1424]); y1590(figPoly, genPoly); z2703(figPoly, genPoly); }
function w2713(m2712) { return m2712[p1409] != null && !isNaN(m2712[p1409]) && m2712[f1411] != null && !isNaN(m2712[f1411]) && m2712[o1412] != null && !isNaN(m2712[o1412]) && m2712[c1413] != null && !isNaN(m2712[c1413]) && m2712[b1414] != null && !isNaN(m2712[b1414]); }
function t2714(m2712) { if (!w2713(m2712))
    return null; const figRect = figma.createRectangle(); s2715(figRect, m2712, true); return figRect; }
function s2715(figRect, m2712, isValid = false) { if (!isValid && !w2713(m2712))
    return; const found = m2712[u1403].findIndex(e => e[0] == 'ROUND_CORNERS'); if (found > -1) {
    const corners = m2712[u1403][found];
    figRect.topLeftRadius = corners[1];
    figRect.topRightRadius = corners[2];
    figRect.bottomLeftRadius = corners[3];
    figRect.bottomRightRadius = corners[4];
}
else
    figRect.cornerRadius = m2712[b1414]; y1590(figRect, m2712); z2703(figRect, m2712); }
function y2716(n2726) { return n2726[p1409] != null && !isNaN(n2726[p1409]) && n2726[f1411] != null && !isNaN(n2726[f1411]) && n2726[o1412] != null && !isNaN(n2726[o1412]) && n2726[c1413] != null && !isNaN(n2726[c1413]) && n2726[v1419] != null && !isNaN(n2726[v1419]) && n2726[g1425] != null && !isNaN(n2726[g1425]) && n2726[x1430] != null && !isNaN(n2726[x1430]); }
function u2717(n2726) { if (!y2716(n2726))
    return null; const n2727 = figma.createStar(); h2718(n2727, n2726, true); return n2727; }
function h2718(n2727, n2726, isValid = false) { if (!isValid && !y2716(n2726))
    return; n2727.cornerRadius = n2726[v1419]; n2727.pointCount = n2726[g1425]; n2727.innerRadius = Math.min(Math.max(0, n2726[x1430] / 100), 1); y1590(n2727, n2726); z2703(n2727, n2726); }
const d4274 = [];
function m2719(u2723) { return u2723[w1431] != null && u2723[p1409] != null && !isNaN(u2723[p1409]) && u2723[f1411] != null && !isNaN(u2723[f1411]) && u2723[o1412] != null && !isNaN(u2723[o1412]) && u2723[c1413] != null && !isNaN(u2723[c1413]) && u2723[o1433] != null && u2723[o1433] != NULL && u2723[x1434] != null && !isNaN(u2723[x1434]); }
function r2720(u2723) { if (!m2719(u2723))
    return null; const w2795 = figma.createText(); l2721(w2795, u2723, true); return w2795; }
function l2721(w2795, u2723, isValid = false) { if (!isValid && !m2719(u2723))
    return null; const fontName = { family: u2723[o1433], style: u2723[w1435] }; try {
    if (!d4274.includes(fontName)) {
        figma.loadFontAsync(fontName).then(() => { d4274.push(fontName); i2722(w2795, u2723, fontName); });
    }
    else {
        i2722(w2795, u2723, fontName);
    }
}
catch (e) {
    o955(e);
} }
function i2722(w2795, u2723, fontName) { w2795.fontName = fontName; w2795.fontSize = Math.max(1, u2723[x1434]); w2795.characters = u2723[w1431]; w2795.lineHeight = { unit: 'PERCENT', value: u2723[r1438] }; w2795.letterSpacing = { unit: 'PERCENT', value: u2723[m1439] }; if (u2723[a1436] == 0)
    w2795.textAlignHorizontal = 'LEFT';
else if (u2723[a1436] == 1)
    w2795.textAlignHorizontal = 'CENTER';
else if (u2723[a1436] == 2)
    w2795.textAlignHorizontal = 'RIGHT';
else if (u2723[a1436] == 3)
    w2795.textAlignHorizontal = 'JUSTIFIED'; if (u2723[l1437] == 0)
    w2795.textAlignVertical = 'TOP';
else if (u2723[l1437] == 1)
    w2795.textAlignVertical = 'CENTER';
else if (u2723[l1437] == 2)
    w2795.textAlignVertical = 'BOTTOM'; y1590(w2795, u2723); z2703(w2795, u2723); if (u2723[b1420] == 0 && u2723[s1426] == 0)
    w2795.textAutoResize = 'WIDTH_AND_HEIGHT';
else if (u2723[b1420] == 0)
    w2795.textAutoResize = 'HEIGHT';
else
    w2795.textAutoResize = 'NONE'; }
function n2778(x2728) { return true; }
function g2749(x2728) { if (!n2778(x2728))
    return null; const b2729 = figma.createVector(); q2755(b2729, x2728, true); return b2729; }
function q2755(b2729, x2728, isValid = false) { if (!isValid && !n2778(x2728))
    return; b2729.setVectorNetworkAsync(x2728[m1416]); y1590(b2729, x2728, false); z2703(b2729, x2728); }
function p2777(h2724) { return h2724[e1423] != null && !isNaN(h2724[e1423]) && h2724[k1429] != null && !isNaN(h2724[k1429]); }
function r2748(h2724) { const e2725 = figma.createVector(); d2754(e2725, h2724, true); return e2725; }
function d2754(e2725, h2724, isValid = false) { if (!isValid && !p2777(h2724))
    return; e2725.vectorPaths = [{ windingRule: h2724[e1423] == 1 ? 'NONZERO' : 'EVENODD', data: h2724[u1417] }]; e2725.cornerRadius = h2724[k1429]; y1590(e2725, h2724, false); z2703(e2725, h2724); }
