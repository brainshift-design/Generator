var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function c1051(key, tag) { return key.substring(0, tag.length + 1) == tag + ' '; }
function l1052(key, tag) { return key.substring(tag.length + 1); }
function h1053(key) { return c1051(key, t875); }
function r1054(key) { return c1051(key, u873); }
function d1055(key) { return c1051(key, f874); }
function s1056(key) { return l1052(key, t875); }
function d1057(key) { return l1052(key, u873); }
function i1058(key) { return l1052(key, f874); }
const generatorVersion = 394;
const k867 = 2147483647;
const NULL = '';
const g868 = '  ';
const s869 = '    ';
const p870 = '\n';
const v871 = '◦ G •';
const f872 = v871 + ' ';
const u873 = 'G_NODE';
const f874 = 'G_CONN';
const t875 = 'G_PAGE';
const y876 = 'G_TEMP';
const minWindowWidth = 602;
const minWindowHeight = 39;
const identity = Object.freeze([[1, 0, 0], [0, 1, 0], [0, 0, 1]]);
const Epsilon = 0.0000001;
const Tau = Math.PI * 2;
var o2540 = false;
function e877(x, eps = 0.000000001) { return Math.abs(x) < eps ? 0 : x; }
function nozero(x, eps = 0.000000001) { return x != 0 ? x : (x < 0 ? -eps : eps); }
function i878(v, eps = 0.000000001) { return point(nozero(v.x, eps), nozero(v.y, eps)); }
function equal(a, b, eps = 0.000000001) { return Math.abs(b - a) < eps; }
function sqr(x) { return x * x; }
;
function cube(x) { return x * x * x; }
;
function n879(f) { return Math.floor(f) | 0; }
function n880(x) { x = n879(x); x--; x |= x >> 1; x |= x >> 2; x |= x >> 4; x |= x >> 8; x |= x >> 16; x |= x >> 32; return ++x; }
function gcd(a, b) { let temp; while (1) {
    temp = a % b;
    if (temp == 0)
        return b;
    a = b;
    b = temp;
} }
function distv(p1, p2) { const dx = p2.x - p1.x; const dy = p2.y - p1.y; return Math.sqrt(dx * dx + dy * dy); }
function b881(v) { let angle = Math.atan2(v.y, v.x); if (angle < 0)
    angle += Tau; return angle; }
function anglev2(v1, v2) { return anglev2_(v1.x, v1.y, v2.x, v2.y); }
function anglev2_(x1, y1, x2, y2) { const dx = x2 - x1; const dy = y2 - y1; let angle = Math.atan2(dy, dx); if (angle < 0)
    angle += Tau; return angle; }
function x883(v) { return Math.sqrt(v.x * v.x + v.y * v.y); }
function lengthv_(x, y) { return Math.sqrt(x * x + y * y); }
function o884(v) { return point(v.x == 0 ? 0 : v.x / x883(v), v.y == 0 ? 0 : v.y / x883(v)); }
function dotv(v1, v2) { return v1.x * v2.x + v1.y * v2.y; }
function o885(a1, a2) { let diff = a2 - a1; while (diff <= -Tau / 2)
    diff += Tau; while (diff > Tau / 2)
    diff -= Tau; return diff; }
function w886(v, m) { let v3 = [v.x, v.y, 1]; let r = c950(v3, m); return point(r[0], r[1]); }
function y887(...mm) { m954(mm.length > 0, 'mulm3m3() must take at least one argument'); let result = clone(mm[0]); for (let a = 1; a < mm.length; a++) {
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
function z888(m, s) { for (let i = 0; i < 3; i++)
    for (let j = 0; j < 3; j++)
        m[i][j] /= s; return m; }
function adjugate(m) { return cofactor(transpose(m)); }
function transpose(m) { return [[m[0][0], m[1][0], m[2][0]], [m[0][1], m[1][1], m[2][1]], [m[0][2], m[1][2], m[2][2]]]; }
function cofactor(m) { return [[m[1][1] * m[2][2] - m[2][1] * m[1][2], -(m[1][0] * m[2][2] - m[2][0] * m[1][2]), m[1][0] * m[2][1] - m[2][0] * m[1][1]], [-(m[0][1] * m[2][2] - m[2][1] * m[0][2]), m[0][0] * m[2][2] - m[2][0] * m[0][2], -(m[0][0] * m[2][1] - m[2][0] * m[0][1])], [m[0][1] * m[1][2] - m[1][1] * m[0][2], -(m[0][0] * m[1][2] - m[1][0] * m[0][2]), m[0][0] * m[1][1] - m[1][0] * m[0][1]]]; }
function determinant(m) { return m[0][0] * (m[1][1] * m[2][2] - m[1][2] * m[2][1]) - m[0][1] * (m[1][0] * m[2][2] - m[2][0] * m[1][2]) + m[0][2] * (m[1][0] * m[2][1] - m[2][0] * m[1][1]); }
function v889(m) { return z888(adjugate(m), determinant(m)); }
function p890(angle) { const cosA = e877(Math.cos(angle)); const sinA = e877(Math.sin(angle)); return [[cosA, sinA, 0], [-sinA, cosA, 0], [0, 0, 1]]; }
function x891(x = 0, y = 0, f892 = 1, i893 = 1, angle = 0, q894 = 0, k895 = 0) { const cosA = Math.cos(angle); const sinA = Math.sin(angle); return [[f892 * cosA - k895 * sinA, -q894 * cosA + i893 * sinA, x], [k895 * cosA + f892 * sinA, i893 * cosA + q894 * sinA, y], [0, 0, 1]]; }
function u896(v1, v2) { return v1.x * v2.y - v1.y * v2.x; }
function f897(v1, v2) { return point(v1.x + v2.x, v1.y + v2.y); }
function sqrv(v) { return y898(v, v); }
function y898(v1, v2) { return point(v1.x * v2.x, v1.y * v2.y); }
function i899(v, s) { return point(v.x * s, v.y * s); }
function c900(v1, v2) { return point(v1.x / v2.x, v1.y / v2.y); }
function e901(v, s) { return point(v.x / s, v.y / s); }
function c902(v1, v2) { return point(v1.x - v2.x, v1.y - v2.y); }
function b903(str) { return decodeURI(encodeURIComponent(str)); }
function e904(str) { return decodeURIComponent(encodeURI(str)); }
function b905(bytes) { let str = ''; for (let i = 0; i < bytes.length; i++)
    str += String.fromCharCode(bytes[i]); return str; }
function w906(str) { return Array.from(e904(str), c => c.charCodeAt(0)); }
function z907(array, size) { const newArray = new Uint8Array(size); o908(array, newArray); return newArray; }
function o908(src, dst) { k909(src, 0, src.length, dst, 0, dst.length); }
function k909(src, a910, u911, dst, x912, a913) { const size = Math.min(u911, a913); for (let i = 0; i < size; i++)
    dst[x912 + i] = src[a910 + i]; }
function d914(h915, i916) { if (h915.length != i916.length)
    return false; for (let i = 0; i < h915.length; i++) {
    if (h915[i] != i916[i])
        return false;
} return true; }
function k917(v918, e919) { return v918.findIndex(i => e919.includes(i)) > -1; }
function w920(list) { return list ? '<==' : '<--'; }
;
function t921(list) { return list ? '==>' : '-->'; }
;
function l922(nodeId) { return u873 + ' ' + nodeId; }
function k923(name) { return f874 + ' ' + name; }
function d924(name) { return t875 + ' ' + name; }
function r925(str) { return str.toLowerCase() == 'true' || str == '1'; }
function q926(w927, d928 = false) { return z933(w927.outputNodeId, w927.outputId, w927.outputOrder, w927.inputNodeId, w927.inputId, w927.list, d928); }
function u929(outputNodeId, outputId, outputOrder, inputNodeId, inputId) { return k923(outputNodeId + ' ' + outputId + ' ' + outputOrder + ' ' + inputNodeId + ' ' + inputId); }
function y930(t243) { return u929(t243.outputNodeId, t243.outputId, t243.outputOrder, t243.inputNodeId, t243.inputId); }
function t931(t243) { return u929(t243.output.node.id, t243.output.id, t243.outputOrder, t243.input.node.id, t243.input.id); }
function f932(t243, d928 = false) { return z933(t243.output.node.id, t243.output.id, t243.outputOrder, t243.input.node.id, t243.input.id, t243.list, d928); }
function z933(outputNodeId, outputId, outputOrder, inputNodeId, inputId, list, d928 = false) { const sp = d928 ? ' ' : '  '; const jsp = d928 ? '' : ' '; const arrow = sp + d937(typeof outputOrder == 'string' ? parseInt(outputOrder) : outputOrder) + t921(typeof list == 'string' ? r925(list) : list) + sp; const join = jsp + '.' + jsp; return outputNodeId + join + outputId + arrow + inputNodeId + join + inputId; }
function l934(pageId) { return d924(pageId); }
function j935(num) { const str = num.toString(); let sup = ''; for (const c of str)
    sup += z936(c); return sup; }
function z936(c) { switch (c) {
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
function d937(num) { const str = num.toString(); let sup = ''; for (const c of str)
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
function m939(bool) { return bool ? 'true' : 'false'; }
function isValid(val) { return val != undefined && val != null; }
function isEmpty(array) { return array.length == 0; }
function s940(array, item) { x941(array, array.indexOf(item)); }
function x941(array, index) { if (index > -1 && index < array.length)
    array.splice(index, 1); }
function j942(array) { if (isEmpty(array))
    return null; let last = array.at(-1); array.splice(array.length - 1, 1); return last; }
function p943(array) { return array[array.length - 1]; }
function v944(array, from, to) { const item = array[from]; array.splice(from, 1); array.splice(to, 0, item); }
function u945(array, item) { const index = array.indexOf(item); if (index > -1)
    array.splice(index, 1); }
function a946(k2796, array) { for (const item of array) {
    const index = k2796.indexOf(item);
    if (index > -1)
        k2796.splice(index, 1);
} }
function f947(array, where) { const index = array.findIndex(where); if (index > -1)
    array.splice(index, 1); }
function f948(styleId) { return styleId.split(',')[0] + ','; }
function i949(points) { let e4035 = ''; if (points.length < 2)
    return e4035; e4035 += 'M'; e4035 += ' ' + e877(points[0].x); e4035 += ' ' + e877(points[0].y); for (let i = 1; i < points.length; i++) {
    e4035 += ' L' + ' ' + e877(points[i].x) + ' ' + e877(points[i].y);
} return e4035; }
function point(x, y) { return { x: x, y: y }; }
function c950(v, m) { let r = [0, 0, 0]; for (let i = 0; i < 3; i++)
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
        let t111 = {};
        for (const key in val)
            t111[key] = clone(val[key]);
        return t111;
    }
} throw 'unknown'; }
function k951(array, item, equal = null) { if (equal) {
    if (Array.isArray(item))
        item.forEach(i => k951(array, i, equal));
    else if (!array.find(i => equal(i, item)))
        array.push(item);
}
else {
    if (Array.isArray(item))
        item.forEach(i => k951(array, i));
    else if (!array.includes(item))
        array.push(item);
} }
function j952(array, item, equal) { if (Array.isArray(item))
    item.forEach(i => j952(array, i, equal));
else if (!array.find(equal))
    array.push(item); }
function t953(array, item, except) { if (Array.isArray(item))
    item.forEach(i => t953(array, i, except));
else if (!array.find(except))
    array.push(item); }
function m954(...args) { if (o2540) {
    console.assert(...args);
} }
function j955(...args) { if (o2540)
    console.error(...args); }
function t956(str, trim) { while (str.length >= trim.length && str.substring(0, trim.length) == trim)
    str = str.substring(trim.length); return str; }
function r957(str, trim) { while (str.length >= trim.length && str.substring(str.length - trim.length) == trim)
    str = str.substring(0, str.length - trim.length); return str; }
function x958(x4095) { const fills = []; for (const fill of x4095) {
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
            const m4211 = fill[1];
            const stops = [];
            for (const stop of fill[2]) {
                stops.push({ color: { r: Math.min(Math.max(0, stop[0]), 1), g: Math.min(Math.max(0, stop[1]), 1), b: Math.min(Math.max(0, stop[2]), 1), a: Math.min(Math.max(0, stop[3]), 1) }, position: stop[4] });
            }
            fills.push({ type: fill[0], gradientTransform: m4211, gradientStops: stops, blendMode: fill[3] });
            break;
        }
    }
} return fills; }
function m959(type) { return v1092.includes(type); }
const a1059 = 'LIST#';
const w1060 = 'NLIST#';
const j1061 = 'TLIST#';
const u1062 = 'SLIST#';
const m1063 = 'NULL';
const r1064 = 'VAR';
const e1065 = 'VARGRP';
const f1066 = 'FEEDBK';
const b1067 = 'REPT';
const m1068 = 'CACHE';
const h1069 = 'FRZ';
const e1070 = 'TIMER';
const e1071 = 'VNAME';
const GET_LIST_VALUE_NAMES = 'GVNAMES';
const LIST_VALUE_NAMES = 'VNAMES';
const OBJECT_NAME = 'ONAME';
const f1072 = 'CMB';
const h1073 = 'LSASIT';
const d1074 = 'EXTR';
const n1075 = 'SETP';
const y1076 = 'GETP';
const k1077 = 'SUBLST';
const j1078 = 'UNIQ';
const REORDER_LIST = 'RORD';
const SHIFT_LIST = 'SHFTLST';
const k1079 = 'REVLST';
const u1080 = 'SORT';
const k1081 = 'CLMN';
const z1082 = 'CELL';
const e1083 = 'LIST';
const l1084 = 'COUNT';
const OBJECT_COUNT = 'OBJCOUNT';
const t1085 = 'LCONT';
const i1086 = 'SELECT';
const SELECT_FROM_LIST = 'LSTSEL';
const k1087 = 'IF';
const j1088 = 'LSTFLT';
const v1090 = 'ANY#';
const r1091 = [a1059, w1060, j1061, u1062, f1072, d1074, n1075, y1076, k1077, e1083, l1084, t1085, b1067];
const v1092 = [a1059, w1060, j1061, u1062];
const y1089 = 'ITER';
const i1111 = 'PROB';
const z1094 = 'NUM#';
const k1095 = 'NUM';
const NUMBER_PRECISION = 'NPREC';
const o1096 = 'NSIGN';
const s1097 = 'ABS';
const NUMBER_NEGATIVE = 'NEG';
const h1098 = 'ROUND';
const NUMBER_QUANTIZE = 'QUANT';
const x1099 = 'SMINMAX';
const n1100 = 'MINMAX';
const e1101 = 'LIM';
const d1102 = 'NCURVE';
const NUMBER_BIAS = 'NBIAS';
const d1103 = 'NANISNUM';
const x1104 = 'CONST';
const d1105 = 'DATE';
const w1106 = 'SEQ';
const e1107 = 'RANGE';
const e1108 = 'WAVE';
const e1109 = 'RAND';
const f1110 = 'NOISE';
const t1112 = 'ACCUM';
const y1113 = 'LERP';
const f1114 = 'SOLVE';
const m1115 = 'NANIM';
const k1116 = 'SMATH';
const p1117 = 'MATH';
const a1118 = 'ADD';
const y1119 = 'SUB';
const w1120 = 'MUL';
const v1121 = 'DIV';
const s1122 = 'MOD';
const n1123 = 'EXP';
const l1124 = 'NBOOL';
const n1125 = 'NOT';
const j1126 = 'AND';
const l1127 = 'OR';
const i1128 = 'XOR';
const s1129 = 'COND';
const y1130 = 'EQ';
const g1131 = 'NE';
const c1132 = 'LT';
const m1133 = 'LE';
const x1134 = 'GT';
const q1135 = 'GE';
const h1136 = 'TRIG';
const w1137 = 'SIN';
const g1138 = 'COS';
const h1139 = 'TAN';
const w1140 = 'ATAN2';
const e1141 = 'CNVANG';
const u1093 = [m1063, r1064, e1065, ...r1091, h1073, d1074, n1075, y1076, k1077, j1078, REORDER_LIST, SHIFT_LIST, k1079, k1081, u1080, z1082, e1083, i1086, SELECT_FROM_LIST, k1087, j1088, f1066, b1067, y1089, i1111, m1068, h1069, e1070, e1071, GET_LIST_VALUE_NAMES, LIST_VALUE_NAMES, OBJECT_NAME];
const g1142 = [p1117, k1116, a1118, y1119, w1120, v1121, s1122, n1123];
const e1143 = [l1124, n1125, j1126, l1127, i1128];
const t1144 = [s1129, y1130, g1131, c1132, m1133, x1134, q1135];
const n1145 = [h1136, w1137, g1138, h1139, w1140];
const x1146 = 'TEXT#';
const x1147 = 'TEXT';
const o1148 = 'TLEN';
const n1149 = 'TTRIM';
const z1150 = 'TSUB';
const y1151 = 'TCONT';
const r1152 = 'TCASE';
const j1153 = 'TREPL';
const b1154 = 'TJOIN';
const s1155 = 'TPAD';
const m1156 = 'TCMP';
const p1157 = 'TCHAR';
const r1158 = 'TUNI';
const k1159 = 'INDEX';
const u1160 = 'N2T';
const l1161 = 'C2T';
const w1162 = 'T2N';
const l1163 = 'T2C';
const f1164 = 'TSPLT';
const g3505 = 'TJSON';
const f1166 = 'TCSV';
const h1167 = 'FETCH';
const a1168 = 'TFILE';
const p1169 = [z1094, w1060, k1095, NUMBER_PRECISION, o1096, s1097, NUMBER_NEGATIVE, h1098, NUMBER_QUANTIZE, x1099, n1100, e1101, d1102, NUMBER_BIAS, d1103, x1104, d1105, w1106, e1107, e1108, e1109, f1110, t1112, y1113, f1114, m1115, u1160, p1157, ...g1142, ...e1143, ...t1144, ...n1145, e1141];
const e1170 = [x1146, j1061, x1147, o1148, n1149, z1150, y1151, r1152, b1154, s1155, j1153, m1156, r1158, k1159, w1162, l1163, f1164, g3505, f1166, h1167, a1168];
const n1171 = 'COL#';
const j1172 = 'COL';
const s1173 = 'CVAL';
const b1174 = 'CCOR';
const s1175 = 'COLP3';
const o1176 = 'CCNT';
const n1177 = 'BLND';
const u1178 = 'CLERP';
const y1179 = 'CBLND';
const p1180 = [n1171, j1172, b1174, s1175, n1177, u1178, y1179, l1161];
const l1181 = 'FILL#';
const w1182 = 'FILL';
const v1183 = [l1181, w1182];
const s1184 = 'STRK#';
const z1185 = 'STRK';
const o1186 = [s1184, z1185];
const t1187 = 'CSTOP#';
const k1188 = 'CSTOP';
const e1189 = [t1187, k1188];
const d1190 = 'GRAD#';
const s1191 = 'GRAD';
const f1192 = [d1190, s1191];
const v1193 = 'RCRN#';
const n1194 = 'RCRN';
const l1195 = [v1193, n1194];
const h1196 = 'DRSH#';
const v1197 = 'DRSH';
const z1198 = [h1196, v1197];
const u1199 = 'INSH#';
const i1200 = 'INSH';
const p1201 = [u1199, i1200];
const w1202 = 'LBLR#';
const y1203 = 'LBLR';
const i1204 = [w1202, y1203];
const m1205 = 'BBLR#';
const p1206 = 'BBLR';
const y1207 = [m1205, p1206];
const i1208 = 'MASK#';
const j1209 = 'MASK';
const d1210 = [i1208, j1209];
const z1211 = 'BLEND#';
const u1212 = 'BLEND';
const s1213 = [z1211, u1212];
const u1214 = [...l1195, ...z1198, ...p1201, ...i1204, ...y1207, ...s1213, ...d1210];
const j1215 = [n1171, l1181, d1190, s1184, h1196, u1199, w1202, m1205, z1211, i1208];
const o1216 = 'CSTL';
const b1217 = 'SHP#';
const s1218 = 'RECT#';
const f1219 = 'RECT';
const k1220 = [s1218, f1219];
const l1221 = 'LINE#';
const x1222 = 'LINE';
const w1223 = [l1221, x1222];
const m1224 = 'ELPS#';
const m1225 = 'ELPS';
const i1226 = [m1224, m1225];
const n1227 = 'TRPZ#';
const f1228 = 'TRPZ';
const p1229 = [n1227, f1228];
const o1236 = 'POLY#';
const y1237 = 'POLY';
const m1238 = [o1236, y1237];
const g1239 = 'STAR#';
const k1240 = 'STAR';
const p1241 = [g1239, k1240];
const k1242 = 'TXTS#';
const b1243 = 'TXTS';
const b1244 = [k1242, b1243];
const e1245 = 'PT#';
const x1246 = 'PT';
const m1247 = [e1245, x1246];
const b1248 = 'PCORN';
const d1249 = 'VPATH#';
const w1250 = 'VPATH';
const g1251 = [d1249, w1250];
const d1252 = 'VPT#';
const t1253 = 'VPT';
const k1254 = [d1252, t1253];
const w1255 = 'VEDGE#';
const s1256 = 'VEDGE';
const a1257 = [w1255, s1256];
const m1258 = 'VREG#';
const v1259 = 'VREG';
const d1260 = [m1258, v1259];
const b1261 = 'VNET#';
const t1262 = 'VNET';
const s1263 = [b1261, t1262];
const y1264 = 'SGRP#';
const k1265 = 'SGRP';
const l1266 = [y1264, k1265];
const v1267 = 'FRM#';
const c1268 = 'FRM';
const u1269 = [v1267, c1268];
const t1231 = 'ARC#';
const k1230 = 'ARC';
const n1232 = [t1231, k1230];
const q1234 = 'WAVEP#';
const z1233 = 'WAVEP';
const a1235 = [q1234, z1233];
const u1270 = 'MOVE';
const q1271 = 'ROT';
const o1272 = 'SCALE';
const l1273 = 'SKEW';
const u1274 = 'SCENTR';
const u1275 = 'RSTX';
const b1276 = 'PLACE';
const w1277 = 'APPLY';
const PATH_LENGTH = 'PTHLEN';
const JOIN_PATHS = 'JOINPTH';
const REORIENT_PATHS = 'REORPTH';
const c1283 = 'PTALPATH';
const t1284 = 'CPTONPATH';
const u1278 = 'MESPT';
const h1279 = 'VECLEN';
const p1280 = 'CIRCEN';
const ARC_FROM_POINTS = 'ARCPT';
const v1281 = 'INTLIN';
const m1282 = 'PTLERP';
const REVERSE_PATH = 'REVPTH';
const BLEND_PATH = 'BLENDPTH';
const PATH_TYPES = [w1250, f1228, k1230, z1233];
const PATH_VALUES = [d1249, n1227, t1231, q1234];
const d1285 = 'SBOOL';
const q1286 = 'SBOOL#';
const t1287 = 'SBOOLU';
const p1288 = 'SBOOLS';
const t1289 = 'SBOOLI';
const i1290 = 'SBOOLE';
const o1291 = [d1285, q1286, t1287, p1288, t1289, i1290];
const l1292 = 'RENDER';
const EXPORT = 'EXPORT';
const r1293 = [b1217, u1062, s1218, l1221, m1224, n1227, o1236, g1239, k1242, e1245, d1249, d1252, w1255, m1258, b1261, t1231, q1234, y1264, v1267, q1286, h1196, u1199, w1202, m1205, z1211, i1208];
const c1294 = [q1271, o1272, l1273];
const i1295 = [...r1293, ...k1220, ...w1223, ...i1226, ...p1229, ...m1238, ...p1241, ...b1244, ...m1247, b1248, ...g1251, ...k1254, ...a1257, ...d1260, ...s1263, ...n1232, ...a1235, ...l1266, ...u1269, ...o1291, u1270, ...c1294, u1274, u1275, b1276, w1277, PATH_LENGTH, JOIN_PATHS, REORIENT_PATHS, c1283, t1284, u1278, h1279, p1280, k1230, z1233, ARC_FROM_POINTS, v1281, m1282, REVERSE_PATH, BLEND_PATH, l1292, EXPORT];
const w1296 = [a1059, w1060, j1061, u1062, z1094, x1146, n1171, l1181, t1187, d1190, s1184, t1187, d1190, b1217, s1218, l1221, m1224, n1227, o1236, g1239, k1242, e1245, d1249, d1252, w1255, m1258, b1261, y1264, v1267, v1193, h1196, u1199, w1202, m1205, z1211, i1208];
const s1297 = 'GROUP';
const c1298 = 'GPARAM';
const q1299 = [s1297, c1298];
const t1300 = 'CMNT';
const b1301 = 'CMNTARR';
const k1302 = 'PANEL';
const g1303 = 'ACT';
const i1304 = 'BFACT';
const f1305 = 'BFLST';
const s1306 = 'DIS';
const r1307 = 'NOC';
const PARAM = 'PARAM';
const z1308 = 'LOG';
const p1309 = 'GRAPH';
const v1310 = [[s1122, '%'], [v1121, '/'], [y1119, '−'], [a1118, '+'], [w1120, '×'], [n1123, 'e<sup>x']];
const w1311 = [[v1121, '/'], [y1119, '−'], [a1118, '+'], [w1120, '×']];
const f1312 = 0;
const e1313 = 1;
const f1314 = 2;
const i1315 = 3;
const p1316 = [[f1312, 'not'], [e1313, 'xor'], [f1314, 'or'], [i1315, 'and']];
const q1317 = 0;
const z1318 = 1;
const v1319 = 2;
const u1320 = 3;
const r1321 = 4;
const f1322 = 5;
const i1323 = [[q1317, '<'], [z1318, '≤'], [v1319, '≠'], [u1320, '='], [r1321, '≥'], [f1322, '>']];
const m1324 = 0;
const g1325 = 1;
const e1326 = 2;
const w1327 = 3;
const i1328 = 4;
const l1329 = 5;
const x1330 = [[m1324, 'sin'], [g1325, 'cos'], [e1326, 'tan'], [w1327, 'asin'], [i1328, 'acos'], [l1329, 'atan']];
const i1331 = 'EMPTY';
const u1332 = 'CONNECT';
const e1333 = 'CREATE';
const o1334 = 'CREATE_INSERT';
const n1335 = 'DELETE';
const l1336 = 'DISCONNECT';
const f1337 = 'LINK_STYLE';
const t1338 = 'LINK_VARIABLE';
const n1339 = 'LINK_VARIABLE_GROUP';
const l1340 = 'MAKE_ACTIVE';
const MAKE_NOT_CONDITION_ACTION = 'MAKE_NOT_CONDITION';
const y1341 = 'MAKE_PASSIVE';
const u1342 = 'PASTE';
const z1343 = 'RECONNECT';
const y1344 = 'REMOVE';
const m1345 = 'RENAME';
const i1346 = 'REORDER_INPUTS';
const h1347 = 'REORDER_CONNECTIONS';
const l1348 = 'SELECT';
const u1349 = 'SELECT_MOVE';
const t1350 = 'MOVE_NODES';
const f1351 = 'SET_PARAM_VALUE';
const SET_MULTIPLE_VALUES_ACTION = 'SET_MULTIPLE_VALUES';
const s1352 = 'SET_PARAM_SETTING';
const g1353 = 'SET_NODE_RECT';
const w1354 = 'TOGGLE_DISABLE';
const b1355 = 'TOGGLE_PARAM_HEADER';
const w1356 = 'SET_CURRENT_GRAPH';
const b1357 = 'CREATE_PAGE';
const u1358 = 'DELETE_PAGE';
const c1359 = 'GROUP_NODES';
const b1360 = 'UNGROUP_NODES';
const v1361 = 'HIGHLIGHT_NODES';
const SCROLL_LIST_NODE_ACTION = 'SCROLL_LIST_NODE';
const SET_LIST_DIVIDER_ACTION = 'SET_LIST_DIVIDER';
const SET_NODE_PARAM_ACTION = 'SET_NODE_PARAM';
const i1362 = 'BNORM';
const n1363 = 'BDARK';
const r1364 = 'BMULT';
const m1365 = 'BPDRK';
const c1366 = 'BBURN';
const b1367 = 'BLITE';
const p1368 = 'BSCRN';
const s1369 = 'BPLGT';
const w1370 = 'BDODG';
const j1371 = 'BOVER';
const x1372 = 'BSOFT';
const m1373 = 'BHARD';
const j1374 = 'BDIFF';
const v1375 = 'BEXCL';
const w1376 = 'BHUE';
const g1377 = 'BSAT';
const k1378 = 'BCOL';
const a1379 = 'BLUM';
const x1380 = [[i1362, 'normal', 'NORMAL'], [n1363, 'darken', 'DARKEN'], [r1364, 'multiply', 'MULTIPLY'], [m1365, 'plus darker', 'LINEAR_BURN'], [c1366, 'color burn', 'COLOR_BURN'], [b1367, 'lighten', 'LIGHTEN'], [p1368, 'screen', 'SCREEN'], [s1369, 'plus lighter', 'LINEAR_DODGE'], [w1370, 'color dodge', 'COLOR_DODGE'], [j1371, 'overlay', 'OVERLAY'], [x1372, 'soft light', 'SOFT_LIGHT'], [m1373, 'hard light', 'HARD_LIGHT'], [j1374, 'difference', 'DIFFERENCE'], [v1375, 'exclusion', 'EXCLUSION'], [w1376, 'hue', 'HUE'], [g1377, 'saturation', 'SATURATION'], [k1378, 'color', 'COLOR'], [a1379, 'luminosity', 'LUMINOSITY']];
const x1381 = [['thin', 100], ['extra light', 200], ['light', 300], ['regular', 400], ['medium', 500], ['semi bold', 600], ['bold', 700], ['extra bold', 800], ['black', 900]];
const l1382 = 0;
const o1383 = 1;
const s1384 = 2;
const s1385 = 2;
const q1386 = 3;
const n1387 = 3;
const i1388 = 4;
const m1389 = 4;
const r1390 = 5;
const j1391 = 6;
const k1392 = 7;
const r1393 = 8;
const m1394 = 9;
const q1395 = 10;
const q1396 = 11;
const h1397 = 12;
const i1398 = 13;
const m1399 = 14;
const k1400 = 15;
const h1401 = 16;
const r1402 = 17;
const s1403 = 18;
const x1404 = 19;
const j1405 = 20;
const i1406 = 21;
const g1407 = 22;
const x1408 = 23;
const a1409 = 24;
const FO_BOOLEAN_CHILDREN = 24;
const f1410 = 24;
const q1411 = 25;
const FO_BOOLEAN_OPERATION = 25;
const r1412 = 26;
const u1413 = 27;
const e1414 = 28;
const d1415 = 28;
const j1416 = 28;
const t1417 = 28;
const u1418 = 28;
const z1419 = 28;
const v1420 = 28;
const o1421 = 28;
const t1422 = 29;
const c1423 = 29;
const a1424 = 29;
const m1425 = 29;
const z1426 = 29;
const g1427 = 29;
const a1428 = 30;
const t1429 = 30;
const f1430 = 30;
const o1431 = 30;
const x1432 = 31;
const x1433 = 31;
const q1434 = 32;
const q1435 = 33;
const g1436 = 34;
const s1437 = 35;
const q1438 = 36;
const i1439 = 37;
const d2797 = '12345679ABCDEFGHJKLMNPQRSTUVWXYZ';
function u845(array, chars = d2797) { let i847 = ''; let len = array.length; let i = 0; while (len > 0) {
    if (len >= 5) {
        const a0 = array[i], a1 = array[i + 1], a2 = array[i + 2], a3 = array[i + 3], a4 = array[i + 4];
        i847 += chars[(a0 & 0xF8) >>> 3];
        i847 += chars[((a0 & 0x07) << 2) | ((a1 & 0xC0) >>> 6)];
        i847 += chars[(a1 & 0x3E) >>> 1];
        i847 += chars[((a1 & 0x01) << 4) | ((a2 & 0xF0) >>> 4)];
        i847 += chars[((a2 & 0x0F) << 1) | ((a3 & 0x80) >>> 7)];
        i847 += chars[(a3 & 0x7C) >>> 2];
        i847 += chars[((a3 & 0x03) << 3) | ((a4 & 0xE0) >>> 5)];
        i847 += chars[(a4 & 0x1F)];
    }
    else if (len == 4) {
        const a0 = array[i], a1 = array[i + 1], a2 = array[i + 2], a3 = array[i + 3];
        i847 += chars[(a0 & 0xF8) >>> 3];
        i847 += chars[((a0 & 0x07) << 2) | ((a1 & 0xC0) >>> 6)];
        i847 += chars[(a1 & 0x3E) >>> 1];
        i847 += chars[((a1 & 0x01) << 4) | ((a2 & 0xF0) >>> 4)];
        i847 += chars[((a2 & 0x0F) << 1) | ((a3 & 0x80) >>> 7)];
        i847 += chars[(a3 & 0x7C) >>> 2];
        i847 += chars[((a3 & 0x03) << 3)];
    }
    else if (len == 3) {
        const a0 = array[i], a1 = array[i + 1], a2 = array[i + 2];
        i847 += chars[(a0 & 0xF8) >>> 3];
        i847 += chars[((a0 & 0x07) << 2) | ((a1 & 0xC0) >>> 6)];
        i847 += chars[(a1 & 0x3E) >>> 1];
        i847 += chars[((a1 & 0x01) << 4) | ((a2 & 0xF0) >>> 4)];
        i847 += chars[((a2 & 0x0F) << 1)];
    }
    else if (len == 2) {
        const a0 = array[i], a1 = array[i + 1];
        i847 += chars[(a0 & 0xF8) >>> 3];
        i847 += chars[((a0 & 0x07) << 2) | ((a1 & 0xC0) >>> 6)];
        i847 += chars[(a1 & 0x3E) >>> 1];
        i847 += chars[((a1 & 0x01) << 4)];
    }
    else if (len == 1) {
        const a0 = array[i];
        i847 += chars[(a0 & 0xF8) >>> 3];
        i847 += chars[((a0 & 0x07) << 2)];
    }
    i += 5;
    len -= 5;
} return i847; }
function o846(i847, chars = d2797) { const array = []; let len = i847.length; let c = 0; while (len > 0) {
    if (len >= 8) {
        const c0 = chars.indexOf(i847[c]), c1 = chars.indexOf(i847[c + 1]), c2 = chars.indexOf(i847[c + 2]), c3 = chars.indexOf(i847[c + 3]), c4 = chars.indexOf(i847[c + 4]), c5 = chars.indexOf(i847[c + 5]), c6 = chars.indexOf(i847[c + 6]), c7 = chars.indexOf(i847[c + 7]);
        array.push((c0 << 3) | ((c1 & 0x1C) >>> 2));
        array.push(((c1 & 0x03) << 6) | (c2 << 1) | ((c3 & 0x10) >>> 4));
        array.push(((c3 & 0x0F) << 4) | ((c4 & 0x1E) >>> 1));
        array.push(((c4 & 0x01) << 7) | (c5 << 2) | ((c6 & 0x18) >>> 3));
        array.push(((c6 & 0x07) << 5) | c7);
    }
    else if (len == 7) {
        const c0 = chars.indexOf(i847[c]), c1 = chars.indexOf(i847[c + 1]), c2 = chars.indexOf(i847[c + 2]), c3 = chars.indexOf(i847[c + 3]), c4 = chars.indexOf(i847[c + 4]), c5 = chars.indexOf(i847[c + 5]), c6 = chars.indexOf(i847[c + 6]);
        array.push((c0 << 3) | ((c1 & 0x1C) >>> 2));
        array.push(((c1 & 0x03) << 6) | (c2 << 1) | ((c3 & 0x10) >>> 4));
        array.push(((c3 & 0x0F) << 4) | ((c4 & 0x1E) >>> 1));
        array.push(((c4 & 0x01) << 7) | (c5 << 2) | ((c6 & 0x18) >>> 3));
    }
    else if (len == 5) {
        const c0 = chars.indexOf(i847[c]), c1 = chars.indexOf(i847[c + 1]), c2 = chars.indexOf(i847[c + 2]), c3 = chars.indexOf(i847[c + 3]), c4 = chars.indexOf(i847[c + 4]);
        array.push((c0 << 3) | ((c1 & 0x1C) >>> 2));
        array.push(((c1 & 0x03) << 6) | (c2 << 1) | ((c3 & 0x10) >>> 4));
        array.push(((c3 & 0x0F) << 4) | ((c4 & 0x1E) >>> 1));
    }
    else if (len == 4) {
        const c0 = chars.indexOf(i847[c]), c1 = chars.indexOf(i847[c + 1]), c2 = chars.indexOf(i847[c + 2]), c3 = chars.indexOf(i847[c + 3]);
        array.push((c0 << 3) | ((c1 & 0x1C) >>> 2));
        array.push(((c1 & 0x03) << 6) | (c2 << 1) | ((c3 & 0x10) >>> 4));
    }
    else if (len == 2) {
        const c0 = chars.indexOf(i847[c]), c1 = chars.indexOf(i847[c + 1]);
        array.push((c0 << 3) | ((c1 & 0x1C) >>> 2));
    }
    c += 8;
    len -= 8;
} return array; }
function v2102(nodeKey, z4007) {
    return __awaiter(this, void 0, void 0, function* () { const log = p2103(yield i1547(nodeKey, false)); if (z4007) {
        console.log('%c%s\n%c%s', 'background: #fa24; color: white;', d1057(nodeKey), 'background: #fa44; color: #edc;', log);
    }
    else {
        console.log('%c%s\n%c%s', 'background: #fdb; color: black;', d1057(nodeKey), 'background: #fed; color: black;', log);
    } });
}
function p2103(json) { let o4036 = json.replace('{\n', '').replace('\n}', '').replace('[\n' + g868, '').replace('\n' + g868 + ']', '').split(g868 + '"params":\n').join('').split('": "').join(': ').split('", "').join(': ').split(g868 + '"').join(g868).split(g868 + g868 + '["').join(g868 + g868).split('",\n').join('\n').split('"\n').join('\n').split('"],\n').join('\n'); if (o4036[o4036.length - 1] == '"')
    o4036 = o4036.substring(0, o4036.length - 1); if (o4036.substring(o4036.length - 2) == '"]')
    o4036 = o4036.substring(0, o4036.length - 2); return o4036; }
function o2104(json) { let o4036 = json.replace('{\n', '').replace('\n}', '').replace('[\n' + g868, '').replace('\n' + g868 + ']', ''); return o4036; }
function k2105(t243, z4007) { const i4214 = q926(t243, true); if (z4007) {
    console.log('%c%s', 'background: #4f44; color: #ded', i4214);
}
else {
    console.log('%c%s', 'background: #cfc; color: black;', i4214);
} }
console.clear();
figma.payments.setPaymentStatusInDevelopment({ type: 'PAID' });
figma.loadAllPagesAsync().then(() => { figma.on('documentchange', q1518); figma.on('selectionchange', q1526); figma.on('close', k1519); });
s1508(true);
figma.clientStorage.getAsync('pro').then(data => { figma.showUI(__html__, { visible: false, themeColors: true, title: 'Generator' }); });
var o2709 = figma.viewport.zoom;
setInterval(j1523, 100);
const b2798 = 'clock_';
const r2799 = 1000;
var e2800 = false;
var objectCenterSize = 15;
function p1520() { (function () {
    return __awaiter(this, void 0, void 0, function* () { figma.currentPage.loadAsync().then(() => __awaiter(this, void 0, void 0, function* () { let t2801 = yield figma.currentPage.getPluginData(figma.currentUser.id + ',windowWidth'); let l2802 = yield figma.currentPage.getPluginData(figma.currentUser.id + ',windowHeight'); let p2803; let t2804; if (t2801 === NULL) {
        p2803 = 800;
        figma.currentPage.setPluginData(figma.currentUser.id + ',windowWidth', t2801.toString());
    }
    else
        p2803 = parseInt(t2801); if (l2802 === NULL) {
        t2804 = 600;
        figma.currentPage.setPluginData(figma.currentUser.id + ',windowHeight', l2802.toString());
    }
    else
        t2804 = parseInt(l2802); figma.ui.resize(Math.max(minWindowWidth, p2803), Math.max(minWindowHeight, t2804)); figma.ui.show(); const fonts = yield figma.listAvailableFontsAsync(); const eula = (yield figma.clientStorage.getAsync('eula')) === 'true'; const tutorials = (yield figma.clientStorage.getAsync('tutorials')) === 'true'; const isLocked = yield f1525(); w1527({ cmd: 'uiReturnFigStartGenerator', currentUser: figma.currentUser, viewportRect: figma.viewport.bounds, viewportZoom: figma.viewport.zoom, fonts: fonts, eula: eula, tutorials: tutorials, isLocked: isLocked, windowWidth: p2803, windowHeight: t2804 }); })); });
})(); }
function c1521() { s1508(); figma.showUI(__html__, { visible: false, themeColors: true }); }
function m1522() { setInterval(k1524, r2799); }
function j1523() { if (figma.viewport.zoom == o2709)
    return; o2709 = figma.viewport.zoom; x2697(); z1541(); c1543(); }
function k1524() { p1548(b2798 + figma.currentUser.sessionId.toString(), Date.now().toString()); }
function f1525() {
    return __awaiter(this, void 0, void 0, function* () { yield figma.currentPage.loadAsync(); const clocks = figma.currentPage.getPluginDataKeys().filter(k => k.length > b2798.length && k.substring(0, b2798.length) == b2798 && k.substring(b2798.length) != figma.currentUser.sessionId.toString()).map((k) => __awaiter(this, void 0, void 0, function* () { return parseInt(yield i1547(k)); })); clocks.sort(); const now = Date.now(); const locked = clocks.length > 0 && now - (yield clocks[clocks.length - 1]) < r2799 * 2; return locked; });
}
function q1526() { x2697(); }
var n2730 = new Array();
var j2732 = new Array();
function figGetObjectsFromIds(objectIds) {
    return __awaiter(this, void 0, void 0, function* () { for (let i = p2766.length - 1; i >= 0; i--)
        if (!p2766[i].removed && objectIds.includes(p2766[i].getPluginData('objectId')))
            p2766.splice(i, 1); for (let i = n2782.length - 1; i >= 0; i--)
        if (n2782[i].removed || objectIds.includes(n2782[i].getPluginData('objectId')))
            n2782.splice(i, 1); yield figma.currentPage.loadAsync(); return figma.currentPage.findAll(o => objectIds.includes(o.getPluginData('objectId'))); });
}
function b1507(nodeIds) {
    return __awaiter(this, void 0, void 0, function* () { for (let i = p2766.length - 1; i >= 0; i--)
        if (!p2766[i].removed && nodeIds.includes(p2766[i].getPluginData('nodeId')))
            p2766.splice(i, 1); for (let i = n2782.length - 1; i >= 0; i--)
        if (n2782[i].removed || nodeIds.includes(n2782[i].getPluginData('nodeId')))
            n2782.splice(i, 1); yield figma.currentPage.loadAsync(); figma.currentPage.findAll(o => nodeIds.includes(o.getPluginData('nodeId'))).forEach(o => { if (!o.removed)
        o.remove(); }); n2730 = n2730.filter(a => !nodeIds.includes(a.nodeId)); });
}
function s1508(e1509 = false) { for (const q1514 of figma.currentPage.children) {
    if (q1514.removed)
        continue;
    if (q1514.getPluginData('objectId') != '' && q1514.getPluginData('userId') == figma.currentUser.id && (parseInt(q1514.getPluginData('retain')) == 0 || e1509))
        q1514.remove();
} }
function w1510(nodeIds, c1511) { for (let i = n2730.length - 1; i >= 0; i--) {
    const e2731 = n2730[i];
    if (!nodeIds.includes(e2731.nodeId))
        continue;
    for (let j = e2731.objects.length - 1; j >= 0; j--) {
        const q1514 = e2731.objects[j];
        if (q1514.removed || !s1512(q1514, c1511)) {
            if (!q1514.removed)
                q1514.remove();
            u945(e2731.objects, q1514);
            if (p2766.includes(q1514))
                u945(p2766, q1514);
            if (n2782.includes(q1514))
                u945(n2782, q1514);
        }
        if (!q1514.removed) {
            if (parseInt(q1514.getPluginData('retain')) == 2)
                e1533(q1514);
        }
    }
    if (isEmpty(e2731.objects))
        u945(n2730, e2731);
} }
function s1512(q1514, c1511) { if (q1514.type == k1265 || q1514.type == c1268) {
    for (const child of q1514.children) {
        const found = s1512(child, c1511);
        if (found)
            return found;
    }
}
else {
    const found = c1511.find(o => q1514.getPluginData('objectId') == o[s1384] && q1514.getPluginData('userId') == figma.currentUser.id || o[r1390] == 2 && o[r1390] == q1514.getPluginData('retain'));
    if (found)
        return found;
} return null; }
function b1515(nodeIds, h1516) { figma.getLocalPaintStylesAsync().then(paintStyles => { paintStyles.filter(s => nodeIds.includes(s.getPluginData('nodeId'))).forEach(s => { const nodeId = s.getPluginData('nodeId'); const existing = r925(s.getPluginData('existing')); if (!existing) {
    s.remove();
}
else if (h1516) {
    f947(j2732, a => a.nodeId == nodeId);
    s.setPluginData('type', NULL);
    s.setPluginData('nodeId', NULL);
    s.setPluginData('existing', NULL);
} }); }); if (h1516)
    j2732 = j2732.filter(a => !nodeIds.includes(a.nodeId)); }
var o1517 = false;
function q1518(e) { for (const change of e.documentChanges) {
    switch (change.type) {
        case 'STYLE_CREATE':
            if (!change.style)
                break;
            if (!o1517) {
                change.style.setPluginData('type', NULL);
                change.style.setPluginData('nodeId', NULL);
                change.style.setPluginData('existing', NULL);
            }
            break;
        case 'STYLE_PROPERTY_CHANGE': {
            if (!change.style)
                break;
            if (!o1517) {
                const msg = { cmd: 'uiStylePropertyChange', styleId: f948(change.id), properties: change.properties, name: '', paints: [] };
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
                w1527(msg);
            }
            break;
        }
        case 'STYLE_DELETE':
            w1527({ cmd: 'uiStyleDelete', styleId: change.id });
            break;
    }
} o1517 = false; }
function k1519() { s1508(); w1527({ cmd: 'updateMetrics' }); }
figma.ui.onmessage = function (msg) { msg = JSON.parse(msg); if (msg.cmd == 'returnUiGetValueForFigma')
    return; switch (msg.cmd) {
    case 'figStartGenerator':
        p1520();
        break;
    case 'figRestartGenerator':
        c1521();
        break;
    case 'figFinishStart':
        m1522();
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
        z1593(msg.clientPosition);
        break;
    case 'figResizeWindow':
        l1596(msg.width, msg.height);
        break;
    case 'figSetWindowRect':
        a1594(msg.x, msg.y, msg.width, msg.height);
        break;
    case 'figNotify':
        k1597(msg);
        break;
    case 'figGetLocalData':
        a1545(msg.key);
        break;
    case 'figSetLocalData':
        y1546(msg.key, msg.value);
        break;
    case 'figClearAllLocalData':
        b4031();
        break;
    case 'figGetPageData':
        i1547(msg.key);
        break;
    case 'figSetPageData':
        p1548(msg.key, msg.value);
        break;
    case 'figSavePages':
        c1553(msg.pageIds, msg.pageJson, msg.currentPageId);
        break;
    case 'figLoadNodesAndConns':
        a1550(msg.debugMode);
        break;
    case 'figSaveNodes':
        b1554(msg.nodeIds, msg.nodeJson);
        break;
    case 'figGetAllLocalTemplateNames':
        v2736();
        break;
    case 'figSaveLocalTemplate':
        g1555(msg.a4032, msg.template);
        break;
    case 'figRemoveConnsToNodes':
        m1556(msg.nodeIds);
        break;
    case 'figRemoveSavedNodesAndConns':
        b1557(msg.nodeIds);
        break;
    case 'figRemoveAllSavedNodesAndConns':
        o1558();
        break;
    case 'figLogAllSavedNodesAndConns':
        f1559(msg.z4007);
        break;
    case 'figLogAllSavedNodes':
        y1560(msg.z4007);
        break;
    case 'figLogAllSavedConns':
        w1561(msg.z4007);
        break;
    case 'figLogAllSavedPageKeys':
        o1562(msg.z4007);
        break;
    case 'figLogAllSavedPages':
        l1563(msg.z4007);
        break;
    case 'figLogAllSavedConnKeys':
        x1564(msg.z4007);
        break;
    case 'figLogAllLocalData':
        j1565(msg.z4007);
        break;
    case 'figGetValue':
        d1566(msg.key, msg.spec);
        break;
    case 'figRemoveSavedPage':
        c1568(msg.pageId);
        break;
    case 'figRemoveAllSavedPages':
        u1569();
        break;
    case 'figSaveConnection':
        d1570(msg.key, msg.json);
        break;
    case 'figSaveConnections':
        m1571(msg.keys, msg.json);
        break;
    case 'figUpdateSavedConnections':
        j1572(msg.curKeys, msg.newKeys, msg.json);
        break;
    case 'figDeleteSavedConnection':
        r1573(msg.key);
        break;
    case 'figRemoveAllSavedConnections':
        u1574();
        break;
    case 'figDeleteSavedConnectionsToNode':
        p1575(msg.nodeId);
        break;
    case 'figDeleteSavedConnectionsFromNode':
        g1576(msg.nodeId);
        break;
    case 'figRemovePluginDataFromAllLocalStyles':
        j1577();
        break;
    case 'figGetAllLocalVariables':
        k1601(msg.nodeId, msg.px, msg.py);
        break;
    case 'figLinkNodeToVariable':
        v1603(msg.nodeId, msg.variableId);
        break;
    case 'figUpdateVariable':
        figUpdateVariableAsync(msg.variableId, msg.value);
        break;
    case 'figGetAllLocalColorStyles':
        k1578(msg.nodeId, msg.px, msg.py);
        break;
    case 'figLinkNodeToExistingColorStyle':
        j1579(msg.nodeId, msg.styleId);
        break;
    case 'figExport':
        figExport(msg.objectIds, msg.scale, msg.format, msg.suffix);
        break;
    case 'figGetObjectSize':
        y1532(msg.object);
        break;
    case 'figGetVariableUpdates':
        o1567(msg.linkedVarIds);
        break;
    case 'figUpdateShowIds':
        e2800 = msg.e2800;
        break;
    case 'figUpdateObjectCenterSize':
        objectCenterSize = msg.objectCenterSize;
        break;
    case 'figDeleteAllObjects':
        s1508();
        break;
    case 'figUpdateObjectsAndStyles':
        u2745 = 0;
        f2746 = 0;
        msg.objects.forEach(o => o.counted = false);
        v2733(null, msg.objects, msg.l4021, msg.t2050, msg.nodeIds, msg.o2762, msg.l2763, msg.y270);
        g1584(msg);
        break;
    case 'figDeleteObjectsAndStyles':
        b1507(msg.nodeIds);
        b1515(msg.nodeIds, msg.h1516);
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
} w1527({ cmd: 'uiEndFigMessage', msgCmd: msg.cmd }); };
function w1527(msg) { figma.ui.postMessage(JSON.stringify(msg)); }
function a2734(key) {
    return __awaiter(this, void 0, void 0, function* () { return yield figma.clientStorage.getAsync(key); });
}
function a1545(key) { figma.currentPage.loadAsync().then(() => { if (key == 'canvasEmpty') {
    w1527({ cmd: 'uiReturnFigGetLocalData', key: key, value: figma.currentPage.children.length == 0 });
}
else if (key == 'debugWarningCrash') {
    figma.clientStorage.getAsync('debugWarning').then(data => { w1527({ cmd: 'uiReturnFigGetLocalData', key: key, value: data }); });
}
else {
    figma.clientStorage.getAsync(key).then(data => { w1527({ cmd: 'uiReturnFigGetLocalData', key: key, value: data }); });
} }); }
function y1546(key, value, postToUi = true) { figma.clientStorage.setAsync(key, value); if (postToUi) {
    w1527({ cmd: 'uiReturnFigSetLocalData', key: key, value: value });
} }
function b4031() {
    return __awaiter(this, void 0, void 0, function* () { const keys = yield figma.clientStorage.keysAsync(); for (const key of keys)
        figma.clientStorage.deleteAsync(key); });
}
function i1547(key, postToUi = true) {
    return __awaiter(this, void 0, void 0, function* () { yield figma.currentPage.loadAsync(); const data = figma.currentPage.getPluginData(key); if (postToUi) {
        w1527({ cmd: 'uiReturnFigGetPageData', key: key, value: data });
    } return data; });
}
function p1548(key, value) { x1549(key); figma.currentPage.setPluginData(key, value); }
function x1549(key) { figma.currentPage.setPluginData(key, ''); }
function a1550(debugMode) { figma.currentPage.loadAsync().then(() => { const pageKeys = figma.currentPage.getPluginDataKeys().filter(k => h1053(k)); const nodeKeys = figma.currentPage.getPluginDataKeys().filter(k => r1054(k)); const connKeys = figma.currentPage.getPluginDataKeys().filter(k => d1055(k)); if (!debugMode)
    v1552(nodeKeys, connKeys); const pages = pageKeys.map(k => figma.currentPage.getPluginData(k)); const nodes = nodeKeys.map(k => figma.currentPage.getPluginData(k)); const c2122 = connKeys.map(k => figma.currentPage.getPluginData(k)); const pageOrder = figma.currentPage.getPluginData('pageOrder').split(','); const currentPageId = figma.currentPage.getPluginData('currentPageId'); p1551(nodes); const showAllColorSpaces = figma.currentPage.getPluginData('showAllColorSpaces'); w1527({ cmd: 'uiReturnFigLoadNodesAndConns', showAllColorSpaces: showAllColorSpaces, pageKeys: pageKeys, pageJson: pages, pageOrder: pageOrder, currentPageId: currentPageId, nodeKeys: nodeKeys, nodeJson: nodes, connKeys: connKeys, connJson: c2122 }); }); }
function p1551(nodes) { j2732 = []; figma.getLocalPaintStylesAsync().then(paintStyles => { for (const p3019 of nodes) {
    const node = JSON.parse(p3019);
    if (node.type == o1216) {
        const style = paintStyles.find(s => { const nodeId = s.getPluginData('nodeId'); return nodeId == node.id; });
        if (style) {
            j2732.push({ nodeId: node.id, existing: r925(node.existing), styles: [style] });
        }
    }
} }); }
function v1552(nodeKeys, connKeys) { figma.currentPage.loadAsync().then(() => { const b2735 = '"loading": "true"'; const not = '{\n'; const set = '{\n' + g868 + b2735 + ',\n'; nodeKeys.forEach(k => figma.currentPage.setPluginData(k, figma.currentPage.getPluginData(k).replace(set, not).replace(not, set))); connKeys.forEach(k => figma.currentPage.setPluginData(k, figma.currentPage.getPluginData(k).replace(set, not).replace(not, set))); }); }
function c1553(pageIds, pageJson, currentPageId) { for (let i = 0; i < pageIds.length; i++) {
    p1548(d924(pageIds[i]), pageJson[i]);
} p1548('pageOrder', pageIds.join(',')); p1548('currentPageId', currentPageId); }
function b1554(nodeIds, nodeJson) { for (let i = 0; i < nodeIds.length; i++) {
    p1548(l922(nodeIds[i]), nodeJson[i]);
} }
function v2736() {
    return __awaiter(this, void 0, void 0, function* () { let keys = yield figma.clientStorage.keysAsync(); keys = keys.filter(k => k.length >= y876.length && k.substring(0, y876.length) == y876); w1527({ cmd: 'uiReturnGetAllLocalTemplateNames', templateNames: keys }); });
}
function g1555(a4032, template) { y1546(y876 + ' ' + a4032, template); }
function m1556(nodeIds) { figma.currentPage.loadAsync().then(() => { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => d1055(k)); for (const key of connKeys) {
    const parts = i1058(key).split(' ');
    if (nodeIds.includes(parts[0]) || nodeIds.includes(parts[2]))
        x1549(key);
} }); }
function b1557(nodeIds) { figma.currentPage.loadAsync().then(() => { m1556(nodeIds); const nodeKeys = figma.currentPage.getPluginDataKeys().filter(k => r1054(k) && nodeIds.includes(d1057(k))); nodeKeys.forEach(k => x1549(k)); }); }
function o1558() { figma.currentPage.loadAsync().then(() => { const nodeKeys = figma.currentPage.getPluginDataKeys().filter(k => r1054(k)); const connKeys = figma.currentPage.getPluginDataKeys().filter(k => d1055(k)); for (const key of nodeKeys)
    x1549(key); for (const key of connKeys)
    x1549(key); }); }
function f1559(z4007) {
    return __awaiter(this, void 0, void 0, function* () { yield y1560(z4007); w1561(z4007); });
}
function y1560(z4007) {
    return __awaiter(this, void 0, void 0, function* () { yield figma.currentPage.loadAsync(); figma.currentPage.getPluginDataKeys().filter(k => r1054(k)).forEach((k) => __awaiter(this, void 0, void 0, function* () { return yield v2102(k, z4007); })); });
}
function w1561(z4007) { figma.currentPage.loadAsync().then(() => { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => d1055(k)); connKeys.sort((key1, key2) => { const p1 = i1058(key1).split(' '); const p2 = i1058(key2).split(' '); if (p1[2] != p2[2])
    return p1[2] < p2[2] ? -1 : 1; if (p1[3] != p2[3])
    return parseInt(p1[3]) - parseInt(p2[3]); if (p1[2] == p2[0])
    return -1; if (p2[2] == p1[0])
    return 1; return 0; }); connKeys.forEach(k => k2105(JSON.parse(figma.currentPage.getPluginData(k)), z4007)); }); }
function o1562(z4007) { figma.currentPage.loadAsync().then(() => { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => h1053(k)); connKeys.forEach(k => console.log('%c' + k, 'background: #fff; color: ' + (z4007 ? 'black' : 'white'))); const pageOrder = figma.currentPage.getPluginData('pageOrder'); console.log('%c' + pageOrder, 'background: #fff; color: ' + (z4007 ? 'black' : 'white')); }); }
function l1563(z4007) { figma.currentPage.loadAsync().then(() => { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => h1053(k)); connKeys.forEach(k => console.log('%c' + figma.currentPage.getPluginData(k), 'background: #fff; color: ' + (z4007 ? 'black' : 'white'))); const pageOrder = figma.currentPage.getPluginData('pageOrder'); console.log('%c' + pageOrder, 'background: #fff; color: ' + (z4007 ? 'black' : 'white')); }); }
function x1564(z4007) { figma.currentPage.loadAsync().then(() => { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => d1055(k)); connKeys.forEach(k => console.log('%c' + k, 'background: #dff; color: ' + (z4007 ? 'black' : 'white'))); }); }
function j1565(z4007) { figma.clientStorage.keysAsync().then(keys => keys.forEach(k => figma.clientStorage.getAsync(k).then(val => console.log(k + ': ' + val)))); }
function d1566(key, spec) {
    return __awaiter(this, void 0, void 0, function* () { let result = null; switch (key) {
        case 'getVariableData':
            result = yield f1602(spec);
            break;
        case 'getPaidStatus':
            result = figma.payments.status.type;
            break;
        case 'figSubscribe': {
            yield figma.payments.initiateCheckoutAsync({ interstitial: 'PAID_FEATURE' });
            result = figma.payments.status.type;
            break;
        }
    } w1527({ cmd: 'returnFigGetValue', value: result }); });
}
function o1567(varIds) { f1602(varIds).then(values => { w1527({ cmd: 'uiReturnFigGetVariableUpdates', values: values }); }); }
function c1568(pageId) {
    return __awaiter(this, void 0, void 0, function* () { x1549(l934(pageId)); const pageOrder = (yield i1547('pageOrder')).split(','); f947(pageOrder, id => id == pageId); p1548('pageOrder', pageOrder.join(',')); });
}
function u1569() { figma.currentPage.loadAsync().then(() => { const pageKeys = figma.currentPage.getPluginDataKeys().filter(k => h1053(k)); pageKeys.forEach(k => x1549(k)); x1549('pageOrder'); }); }
function d1570(key, json) { p1548(key, json); }
function m1571(_keys, _json) { const keys = JSON.parse(_keys); const json = JSON.parse(_json); for (let i = 0; i < keys.length; i++)
    p1548(keys[i], json[i]); }
function j1572(_curKeys, _newKeys, _json) { const curKeys = JSON.parse(_curKeys); const newKeys = JSON.parse(_newKeys); const json = JSON.parse(_json); for (let i = 0; i < curKeys.length; i++) {
    x1549(curKeys[i]);
    p1548(newKeys[i], json[i]);
} }
function r1573(key) { x1549(key); }
function u1574() { figma.currentPage.loadAsync().then(() => { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => d1055(k)); connKeys.forEach(k => x1549(k)); }); }
function p1575(nodeId) { figma.currentPage.loadAsync().then(() => { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => d1055(k)); for (const key of connKeys) {
    const parts = key.split(' ');
    if (parts[4] == nodeId)
        x1549(key);
} }); }
function g1576(nodeId) { figma.currentPage.loadAsync().then(() => { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => d1055(k)); for (const key of connKeys) {
    const parts = key.split(' ');
    if (parts[1] == nodeId)
        x1549(key);
} }); }
function j1577() { figma.getLocalPaintStylesAsync().then(i1581 => { for (const style of i1581) {
    style.setPluginData('type', '');
    style.setPluginData('nodeId', '');
    style.setPluginData('existing', '');
} }); }
function figSaveSnapshot(index, objectIds) {
    return __awaiter(this, void 0, void 0, function* () { const objects = yield figGetObjectsFromIds(objectIds); const group = figma.group(objects, figma.currentPage); const settings = { format: 'PNG' }; const icon = yield group.exportAsync(settings); figma.ungroup(group); w1527({ cmd: 'uiReturnFigSaveSnapshot', index: index, iconWidth: group.width, iconHeight: group.height, icon: icon }); });
}
var q2737 = null;
var j4033 = () => q2737 = null;
var l2738 = 'normal';
function z1593(clientPosition) { w1527({ cmd: 'uiReturnFigGetMousePosition', position: { x: 0, y: 0 }, clientPosition: clientPosition, viewportZoom: figma.viewport.zoom, viewportRect: figma.viewport.bounds }); }
function a1594(x, y, width, height) { return; }
function u1595(dock, rect, bounds) { switch (dock) {
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
function l1596(width, height) { (function () {
    return __awaiter(this, void 0, void 0, function* () { width = Math.floor(Math.max(0, width)); height = Math.floor(Math.max(0, height)); figma.ui.resize(width, height); yield figma.currentPage.loadAsync(); figma.currentPage.setPluginData(figma.currentUser.id + ',windowWidth', width.toString()); figma.currentPage.setPluginData(figma.currentUser.id + ',windowHeight', height.toString()); w1527({ cmd: 'uiReturnFigResizeWindow', width: width, height: height }); });
})(); }
function a2739(dock) {
    return __awaiter(this, void 0, void 0, function* () { if (dock != 'normal' && l2738 == 'normal') {
        figma.clientStorage.setAsync('normalWindowX', yield figma.clientStorage.getAsync('normalWindowX'));
        figma.clientStorage.setAsync('normalWindowY', yield figma.clientStorage.getAsync('normalWindowY'));
        figma.clientStorage.setAsync('normalWindowWidth', yield figma.clientStorage.getAsync('normalWindowWidth'));
        figma.clientStorage.setAsync('normalWindowHeight', yield figma.clientStorage.getAsync('normalWindowHeight'));
    } l2738 = dock; figma.clientStorage.setAsync('windowDock', dock); l1596(yield figma.clientStorage.getAsync('windowWidth'), yield figma.clientStorage.getAsync('windowHeight')); });
}
function k1597(msg) { f1598(msg.text, msg.prefix, msg.delay, msg.error, msg.p1599, msg.x1600); }
function f1598(text, prefix = 'Generator ', delay = 400, error = false, p1599 = '', x1600 = NULL) { const options = { timeout: delay, error: error, onDequeue: j4033 }; if (p1599 != '') {
    options['button'] = { text: p1599 };
    if (x1600.substring(0, 'removeConnection'.length) == 'removeConnection') {
        options['button']['action'] = () => r1573(x1600.split(',')[1]);
    }
    else {
        switch (x1600) {
            case 'hideClearUndoWarning':
                options['button']['action'] = () => w1527({ cmd: 'uiHideClearUndoWarning' });
                break;
        }
    }
} if (q2737)
    q2737.cancel(); q2737 = figma.notify(prefix + text, options); }
function v2740(key, params = null) {
    return __awaiter(this, void 0, void 0, function* () { return yield y2741(key, params); });
}
function y2741(key, params = null) {
    return __awaiter(this, void 0, void 0, function* () { return new Promise((resolve, reject) => { const timeout = 60000; w1527(Object.assign({ cmd: 'uiGetValueForFigma', key: key }, (params || {}))); const o2742 = setTimeout(() => reject(new Error('Timeout: Result not received by Figma within the specified time')), timeout); function y4034(msg) { msg = JSON.parse(msg); if (msg.cmd === 'returnUiGetValueForFigma') {
        clearTimeout(o2742);
        resolve({ key: msg.key, value: msg.value });
        figma.ui.off('message', y4034);
    } } figma.ui.on('message', y4034); }); });
}
var c2743 = [];
var r2744 = [];
var u2745 = 0;
var f2746 = 0;
function n1528(t111) { return (t111[r1390] === 2 ? '' : f872) + (e2800 ? t111[s1384] : t111[q1386]); }
function h1529(s1513, addObject = null, addProps = true, transform = true) {
    return __awaiter(this, void 0, void 0, function* () { if (!m1531(s1513))
        return null; let q1514; switch (s1513[l1382]) {
        case f1219:
            q1514 = s2714(s1513, addProps, transform);
            break;
        case x1222:
            q1514 = z2793(s1513, addProps, transform);
            break;
        case m1225:
            q1514 = l2789(s1513, addProps, transform);
            break;
        case y1237:
            q1514 = e2710(s1513, addProps, transform);
            break;
        case k1240:
            q1514 = m2717(s1513, addProps, transform);
            break;
        case b1243:
            q1514 = c2720(s1513, addProps, transform);
            break;
        case x1246:
            q1514 = s2696(s1513);
            break;
        case w1250:
            q1514 = h2748(s1513, addProps, transform);
            break;
        case t1262:
            q1514 = a2749(s1513, addProps, transform);
            break;
        case d1285:
            q1514 = yield k2750(s1513, addProps, transform);
            break;
        case k1265:
            q1514 = yield f2751(s1513);
            break;
        case c1268:
            q1514 = yield t2752(s1513, addProps, transform);
            break;
    } if (addObject && q1514 != undefined && q1514 != null && !q1514.removed) {
        q1514.name = n1528(s1513);
        m954(s1513[l1382] == k1265 || !!q1514, 'no Figma object created');
        if (q1514 != undefined && q1514 != null) {
            q1514.setPluginData('retain', s1513[r1390].toString());
            if (s1513[r1390] < 2) {
                q1514.setPluginData('userId', figma.currentUser.id);
                q1514.setPluginData('sessionId', figma.currentUser.sessionId.toString());
                q1514.setPluginData('type', s1513[l1382]);
                q1514.setPluginData('nodeId', s1513[o1383]);
                q1514.setPluginData('objectId', s1513[s1384]);
                q1514.setPluginData('isCenter', m939(s1513[j1405]));
                if (s1513[l1382] == x1246)
                    p2766.push(q1514);
                if (s1513[x1404])
                    y1544(q1514);
            }
            addObject(q1514);
        }
    } if (!s1513.counted) {
        f2746++;
        s1513.counted = true;
    } return q1514; });
}
function h1530(q1514, s1513, addProps, transform) {
    return __awaiter(this, void 0, void 0, function* () { if (!m1531(s1513) || q1514 == undefined || q1514 == null || q1514.removed)
        return; q1514.name = n1528(s1513); q1514.setPluginData('retain', s1513[r1390].toString()); switch (s1513[l1382]) {
        case f1219:
            b2715(q1514, s1513, addProps, transform);
            break;
        case x1222:
            v2794(q1514, s1513, addProps, transform);
            break;
        case m1225:
            n2790(q1514, s1513, addProps, transform);
            break;
        case y1237:
            y2711(q1514, s1513, addProps, transform);
            break;
        case k1240:
            d2718(q1514, s1513, addProps, transform);
            break;
        case b1243:
            u2721(q1514, s1513, addProps, transform);
            break;
        case x1246:
            b2753(q1514, s1513);
            break;
        case w1250:
            w2754(q1514, s1513, addProps, transform);
            break;
        case t1262:
            p2755(q1514, s1513, addProps, transform);
            break;
        case d1285:
            n2756(q1514, s1513, addProps, transform);
            break;
        case k1265:
            j2757(q1514, s1513);
            break;
        case c1268:
            g2758(q1514, s1513, addProps, transform);
            break;
    } if (q1514 != undefined && q1514 != null && !q1514.removed) {
        if (q1514.parent == figma.currentPage)
            yield figma.currentPage.loadAsync();
        q1514.parent.appendChild(q1514);
        if (s1513[x1404])
            y1544(q1514);
    } if (!s1513.counted) {
        f2746++;
        s1513.counted = true;
    } });
}
function v2733(l2759, f2760, r2761, t2050 = -1, nodeIds = [], o2762 = false, l2763 = false, y270 = false, addProps = true, transform = true) {
    return __awaiter(this, void 0, void 0, function* () { let a2764 = NULL; let a2765 = null; let abort = false; const s3643 = []; let a2747 = 0; c2743.push(...nodeIds); if (t2050 > -1)
        u2745 = t2050; for (const s1513 of f2760) {
        r2744.push(s1513);
        if (s1513[o1383] != a2764) {
            a2764 = s1513[o1383];
            a2765 = n2730.find(a => a.nodeId == s1513[o1383]);
            if (!a2765) {
                n2730.push(a2765 = { nodeId: s1513[o1383], objects: [] });
            }
        }
        const addObject = q1514 => { if (l2759 != undefined && l2759 != null && !l2759.removed)
            l2759.appendChild(q1514);
        else
            a2765.objects.push(q1514); };
        let objects = l2759 != undefined && l2759 != null && !l2759.removed ? l2759.children : a2765.objects;
        let q1514 = objects.find(o => o.removed || o.getPluginData('userId') == figma.currentUser.id && o.getPluginData('objectId') == s1513[s1384]);
        if (q1514 != undefined && q1514 != null && q1514.removed) {
            s940(objects, q1514);
            if (p2766.includes(q1514))
                u945(p2766, q1514);
            if (n2782.includes(q1514))
                u945(n2782, q1514);
        }
        if (q1514 == undefined || q1514 == null || q1514.removed) {
            const newObj = yield h1529(s1513, addObject, addProps, transform);
            s3643.push(newObj);
        }
        else if (q1514 != undefined && q1514 != null && !q1514.removed && q1514.getPluginData('type') == s1513[l1382].toString()) {
            yield h1530(q1514, s1513, addProps, transform);
            if (q1514 != undefined && q1514 != null && !q1514.removed)
                s3643.push(q1514);
        }
        else {
            q1514.remove();
            if (p2766.includes(q1514))
                u945(p2766, q1514);
            if (n2782.includes(q1514))
                u945(n2782, q1514);
            yield h1529(s1513, addObject, addProps, transform);
        }
        a2747++;
        if (a2747 >= r2761) {
            const result = yield v2740('returnObjectUpdate', { u2745: u2745, f2746: f2746 });
            abort = result.value;
            a2747 = 0;
            if (abort)
                break;
        }
    } if (l2759 != undefined && l2759 != null && !l2759.removed) {
        for (const q1514 of l2759.children) {
            if (q1514 != undefined && q1514 != null && q1514.removed || !f2760.find(o => o[s1384] == q1514.getPluginData('objectId') && q1514.getPluginData('userId') == figma.currentUser.id))
                q1514.remove();
        }
    } for (const point of p2766) {
        if (point.parent == figma.currentPage)
            yield figma.currentPage.loadAsync();
        if (point != undefined && point != null && !point.removed && !point.parent.removed)
            point.parent.appendChild(point);
    } if (l2763 && !abort) {
        w1510(c2743, r2744);
        c2743 = [];
        r2744 = [];
        if (y270 && s3643.length > 0) {
            figma.viewport.scrollAndZoomIntoView(s3643);
            const bounds = q1534(s3643);
            figma.viewport.zoom = Math.min(figma.viewport.bounds.width * figma.viewport.zoom / bounds.width - 0.05, figma.viewport.bounds.height * figma.viewport.zoom / bounds.height - 0.05);
        }
    } yield v2740('returnObjectUpdate', { u2745: u2745, f2746: f2746 }); });
}
function m1531(s1513) { switch (s1513[l1382]) {
    case f1219: return p2713(s1513);
    case x1222: return e2775(s1513);
    case m1225: return f2776(s1513);
    case y1237: return g4030(s1513);
    case k1240: return n2716(s1513);
    case b1243: return c2719(s1513);
    case x1246: return j4029(s1513);
    case w1250: return v2777(s1513);
    case t1262: return i2778(s1513);
    case d1285: return k2779(s1513);
    case k1265: return z2780(s1513);
    case c1268: return r2781(s1513);
} }
function y1532(s1513) {
    return __awaiter(this, void 0, void 0, function* () { (() => __awaiter(this, void 0, void 0, function* () { const q1514 = yield h1529(s1513); const width = q1514.width; const height = q1514.height; q1514.remove(); w1527({ cmd: 'uiForwardToGenerator', msg: { cmd: 'returnFigGetObjectSize', objectId: s1513[s1384], width: width, height: height } }); }))(); });
}
function e1533(q1514) { q1514.setPluginData('type', ''); q1514.setPluginData('nodeId', ''); q1514.setPluginData('userId', ''); q1514.setPluginData('sessionId', ''); q1514.setPluginData('objectId', ''); q1514.setPluginData('isCenter', ''); q1514.setPluginData('retain', ''); }
function q1534(objects) { const bounds = { left: 0, top: 0, right: 0, bottom: 0 }; for (const t111 of objects) {
    if (t111.x < bounds.left || bounds.left == bounds.right)
        bounds.left = t111.x;
    if (t111.y < bounds.top || bounds.top == bounds.bottom)
        bounds.top = t111.y;
    if (t111.x + t111.width > bounds.right || bounds.left == bounds.right)
        bounds.right = t111.x + t111.width;
    if (t111.y + t111.height > bounds.bottom || bounds.top == bounds.bottom)
        bounds.bottom = t111.y + t111.height;
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
const n2782 = [];
const a2783 = [];
function w1535(x1536, u1537) { const effects = []; for (const effect of x1536) {
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
                if (u1537 && !isNaN(spread))
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
function l2703(q1514, s1513, phantom = true) { q1540(q1514, s1513); q2704(q1514, s1513, phantom); w2705(q1514, s1513); q1514.opacity = s1513[i1406]; q1514.blendMode = s1513[g1407]; const maskType = s1513[x1408]; q1514.isMask = maskType > 0; if (q1514.isMask) {
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
function w2705(q1514, s1513) { if (!!s1513[q1395] && !isEmpty(s1513[q1395])) {
    q1514.fills = x958(s1513[q1395]);
    if (n2782.includes(q1514))
        u945(n2782, q1514);
}
else
    q1514.fills = []; }
function q2704(q1514, s1513, phantom = true) { if (s1513[q1396] != null && !isEmpty(s1513[q1396])) {
    y1539(q1514, x958(s1513[q1396]), s1513[h1397], s1513[i1398], s1513[m1399], s1513[k1400], s1513[h1401], m2706(s1513[r1402]));
    if (s1513[x1404])
        q1514.setPluginData('dashes', s1513[r1402]);
    if (n2782.includes(q1514))
        u945(n2782, q1514);
    if (s1513[x1404])
        k951(a2783, q1514);
}
else if (isEmpty(s1513[q1395]) && isEmpty(s1513[q1396]) && !s1513[x1408] && phantom) {
    w1542(q1514);
    k951(n2782, q1514);
}
else
    q1514.strokes = []; }
function m2706(f1538) { f1538 = f1538; f1538 = t956(f1538, ','); f1538 = r957(f1538, ','); f1538 = f1538.trim(); return f1538 == '' ? [] : f1538.split(',').map(s => Math.max(0, parseFloat(s))); }
function o2707(f1538) { f1538 = f1538; f1538 = t956(f1538, ','); f1538 = r957(f1538, ','); f1538 = f1538.trim(); return f1538 == '' ? [] : f1538.split(',').map(s => Math.max(0, parseFloat(s) / o2709)); }
function y1539(q1514, fills, weight, align, join, miterLimit, cap, dashes = []) { q1514.strokes = fills; q1514.strokeWeight = Math.max(0, weight); q1514.strokeAlign = align; q1514.strokeJoin = join; const miterAngle = miterLimit / 360 * Tau; const j2784 = 1 / Math.sin(miterAngle / 2); q1514.strokeMiterLimit = Math.min(Math.max(0, j2784), 16); q1514.strokeCap = cap; q1514.dashPattern = dashes; }
function q1540(q1514, s1513) { if (!!s1513[s1403] && !isEmpty(s1513[s1403])) {
    const u1537 = s1513[l1382] == f1219 || s1513[l1382] == m1225 || s1513[l1382] == c1268;
    q1514.effects = w1535(s1513[s1403], u1537);
}
else
    q1514.effects = []; }
function z1541() { for (const t111 of n2782) {
    if (t111.removed)
        u945(n2782, t111);
    else
        w1542(t111);
} }
function w1542(t111) { figma.currentPage.loadAsync().then(() => { const back = figma.currentPage.backgrounds.find(b => b.type == 'SOLID'); let phantomColor; if (back) {
    const l = back.color.r * 0.2126 + back.color.g * 0.7152 + back.color.b * 0.0722;
    phantomColor = l > 0.5 ? { r: 0, g: 0, b: 0 } : { r: 1, g: 1, b: 1 };
}
else
    phantomColor = { r: 1, g: 0, b: 1 }; y1539(t111, [{ type: 'SOLID', color: phantomColor, opacity: 0.5 }], 1 / o2709, 'CENTER', 'MITER', 1, 'NONE', [1 / o2709, 2 / o2709]); }); }
function c1543() { for (const q1514 of a2783) {
    if (q1514.removed)
        u945(a2783, q1514);
    else
        y1544(q1514);
} }
function y1544(q1514) { q1514.strokeWeight = Math.max(0, 1.5 / o2709); if (r925(q1514.getPluginData('isCenter'))) {
    const path = q1514.vectorPaths[0];
    const parts = path.data.split(' ');
    let t = { x: parseFloat(parts[1]), y: parseFloat(parts[2]) };
    let c = { x: parseFloat(parts[4]), y: parseFloat(parts[5]) };
    let r = { x: parseFloat(parts[7]), y: parseFloat(parts[8]) };
    const a = 2;
    const b = 0.05;
    const f = 1 - Math.pow(1 - Math.min(o2709, 1), a) / Math.pow(a, b);
    t = f897(c, i899(o884(c902(t, c)), objectCenterSize / f));
    r = f897(c, i899(o884(c902(r, c)), objectCenterSize / f));
    parts[1] = t.x;
    parts[2] = t.y;
    parts[4] = c.x;
    parts[5] = c.y;
    parts[7] = r.x;
    parts[8] = r.y;
    const i2785 = { windingRule: path.windingRule, data: parts.join(' ') };
    q1514.vectorPaths = [i2785];
} const dashes = q1514.getPluginData('dashes'); if (dashes != '')
    q1514.dashPattern = o2707(dashes); }
function k1578(nodeId, px, py) { figma.getLocalPaintStylesAsync().then(_styles => { const styles = new Array(); for (const h168 of _styles) {
    const _nodeId = h168.getPluginData('nodeId');
    const _existing = h168.getPluginData('existing');
    const existing = !!_existing;
    const style = { id: h168.id, nodeId: _nodeId, name: h168.name, existing: existing, paints: new Array() };
    let onlyPaint = true;
    for (const i2787 of h168.paints) {
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
} w1527({ cmd: 'uiReturnFigGetAllLocalColorStyles', nodeId: nodeId, px: px, py: py, styles: JSON.stringify(styles) }); }); }
function j1579(nodeId, styleId) { figma.getLocalPaintStylesAsync().then(i1581 => { if (styleId != NULL)
    g1580(i1581, nodeId, styleId);
else
    g1582(i1581, nodeId); }); }
function g1580(i1581, nodeId, styleId, clearExisting = true) { const k2786 = j2732.find(a => a.nodeId == nodeId); if (k2786 && clearExisting)
    g1582(i1581, nodeId); const r1586 = i1581.find(s => s.id == styleId); m954(!!r1586, 'figStyle should be found here'); r1586.setPluginData('type', o1216); r1586.setPluginData('nodeId', nodeId); r1586.setPluginData('existing', m939(true)); j2732.push({ nodeId: nodeId, existing: true, styles: [r1586] }); return r1586; }
function g1582(i1581, nodeId) { const r1586 = i1581.find(s => s.getPluginData('nodeId') == nodeId); m954(!!r1586, 'figStyle should be found here'); if (r1586) {
    r1586.setPluginData('type', NULL);
    r1586.setPluginData('nodeId', NULL);
    r1586.setPluginData('existing', NULL);
    f947(j2732, a => a.nodeId == nodeId);
} return r1586; }
function q1583(styles, v1587) { const r1586 = figma.createPaintStyle(); r1586.setPluginData('type', v1587[l1382]); r1586.setPluginData('nodeId', v1587[o1383]); r1586.name = v1587[n1387]; setStylePaints(r1586, v1587); styles.push(r1586); w1527({ cmd: 'uiSetStyleId', nodeId: v1587[o1383], styleId: r1586.id }); return r1586; }
function g1584(msg) { let a2764 = NULL; let k2786; for (const v1587 of msg.styles) {
    if (v1587[o1383] != a2764) {
        a2764 = v1587[o1383];
        k2786 = j2732.find(a => a.nodeId == v1587[o1383]);
        if (!k2786) {
            k2786 = { nodeId: v1587[o1383], styles: [] };
            j2732.push(k2786);
        }
    }
    else
        k2786 = null;
    const r1586 = k2786.styles[0];
    figma.getLocalPaintStylesAsync().then(i1581 => { const localStyle = i1581.find(s => s.getPluginData('nodeId') == v1587[o1383]); if (isValid(r1586) && !isValid(localStyle)) {
        s940(k2786.styles, r1586);
    } const existing = isValid(r1586) && isValid(localStyle) && r1586.getPluginData('existing'); if (!isValid(r1586) || !isValid(localStyle)) {
        if (!existing) {
            o1517 = true;
            j1579(v1587[o1383], v1587[s1385]);
        }
    }
    else if (isValid(r1586) && r1586.getPluginData('type') == v1587[l1382]) {
        o1517 = true;
        s1585(localStyle, v1587);
    } });
} }
function s1585(r1586, v1587) { setStylePaints(r1586, v1587); r1586.name = v1587[n1387]; }
function getStylePaints(stylePaints) { const paints = new Array(); for (const i2787 of stylePaints) {
    const fill = i2787[1].split(' ');
    switch (i2787[0]) {
        case 'SOLID':
            paints.push({ type: 'SOLID', color: { r: Math.min(Math.max(0, parseFloat(fill[0]) / 0xff), 1), g: Math.min(Math.max(0, parseFloat(fill[1]) / 0xff), 1), b: Math.min(Math.max(0, parseFloat(fill[2]) / 0xff), 1) }, opacity: Math.min(Math.max(0, parseFloat(fill[3]) / 100), 1) });
            break;
    }
} return paints; }
function setStylePaints(r1586, v1587) { if (!isEmpty(v1587[m1389]))
    r1586.paints = getStylePaints(v1587[m1389]);
else
    r1586.paints = []; }
function k1601(nodeId, px, py) {
    return __awaiter(this, void 0, void 0, function* () { figma.variables.getLocalVariablesAsync().then((z2788) => __awaiter(this, void 0, void 0, function* () { const variables = new Array(); for (const _var of z2788) {
        const collection = yield figma.variables.getVariableCollectionByIdAsync(_var.variableCollectionId);
        const variable = { id: _var.id, resolvedType: _var.resolvedType, name: _var.name, collectionName: collection.name };
        variables.push(variable);
    } figma.variables.getLocalVariableCollectionsAsync().then((collections) => __awaiter(this, void 0, void 0, function* () { w1527({ cmd: 'uiReturnFigGetAllLocalVariables', nodeId: nodeId, px: px, py: py, variables: JSON.stringify(variables), nCollections: collections.length }); })); })); });
}
function f1602(varIds) {
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
function v1603(nodeId, varId) { figma.variables.getLocalVariablesAsync().then(z2788 => { figLinkVariableAsync(z2788, nodeId, varId); }); }
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
        return null; const [resolvedVar, values] = yield figGetResolvedVariableValuesAsync(variable); w1527({ cmd: 'uiReturnFigLinkNodeToVariable', nodeId: nodeId, variableId: resolvedVar ? resolvedVar.id : NULL, variableName: resolvedVar ? resolvedVar.name : '', resolvedType: resolvedVar ? resolvedVar.resolvedType : NULL, values: values }); return resolvedVar; });
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
function d1588(tl, tr, bl) { let vr = point(tr.x - tl.x, tr.y - tl.y); let vb = point(bl.x - tl.x, bl.y - tl.y); let sx = vr.x; let sy = vb.y; let kx = -vr.y; let ky = -vb.x; let dx = -tl.x; let dy = -tl.y; const _sx = kx / nozero(sx); const _sy = ky / nozero(sy); let m4211 = y887([[1, _sy, 0], [_sx, 1, 0], [0, 0, 1]], x891(dx, dy)); m4211 = v889(m4211); const a = b881(vr); if (a > Tau / 4 && a < Tau * 3 / 4)
    m4211 = y887(m4211, x891(0, 0, 1, 1, Tau / 2)); if (determinant(m4211) < 0)
    m4211 = y887(m4211, x891(0, 0, -1, 1, 0)); return m4211; }
function k1589(q1514, tl, tr, bl) { const m4211 = d1588(tl, tr, bl); q1514.relativeTransform = [m4211[0], m4211[1]]; }
function j1590(q1514, s1513, setSize = true, noHeight = 0.01) { if (!s1513[j1391] || !s1513[k1392] || !s1513[r1393])
    return; const xp0 = s1513[j1391]; const xp1 = s1513[k1392]; const xp2 = s1513[r1393]; k1589(q1514, xp0, xp1, xp2); if (setSize) {
    const f892 = distv(xp0, xp1);
    const i893 = distv(xp0, xp2);
    const height = s1513[l1382] == b1243 ? s1513[z1426] : s1513[u1413];
    if (!q1514.removed) {
        q1514.resizeWithoutConstraints(Math.max(0.01, f892), height ? Math.max(0.01, i893) : noHeight);
    }
} }
function v1591(k2701, j2702) { if (k2701.removed)
    return; k2701.resizeWithoutConstraints(0.01, 0.01); k2701.setPluginData('actualX', j2702[a1409].toString()); k2701.setPluginData('actualY', j2702[q1411].toString()); k2701.x = j2702[a1409]; k2701.y = j2702[q1411]; k2701.rotation = j2702[j1405] ? 45 : 0; }
function f1592(k2701) { if (!k2701.removed)
    k2701.resizeWithoutConstraints(0.01, 0.01); }
function k2779(genBool) { return true; }
function k2750(genBool, addProps, transform) {
    return __awaiter(this, void 0, void 0, function* () { let objects = []; for (const t111 of genBool[FO_BOOLEAN_CHILDREN])
        yield h1529(t111, o => objects = [...objects, o], false); yield figma.currentPage.loadAsync(); let figBool = null; if (!isEmpty(objects)) {
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
        n2756(figBool, genBool, addProps, transform);
    } return figBool; });
}
function n2756(figBool, genBool, addProps, transform) {
    return __awaiter(this, void 0, void 0, function* () { if (genBool[FO_BOOLEAN_CHILDREN].length == 0) {
        figBool.remove();
        return;
    } yield v2733(figBool, genBool[FO_BOOLEAN_CHILDREN], genBool[FO_BOOLEAN_CHILDREN].length, -1, [], false, false, false, false, false); if (transform)
        j1590(figBool, genBool, false); const hasProps = genBool[q1395].length > 0 || genBool[q1396].length > 0 || genBool[s1403].length > 0; l2703(figBool, genBool, !hasProps && addProps); });
}
function f2776(l2767) { return l2767[a1409] != null && !isNaN(l2767[a1409]) && l2767[q1411] != null && !isNaN(l2767[q1411]) && l2767[r1412] != null && !isNaN(l2767[r1412]) && l2767[u1413] != null && !isNaN(l2767[u1413]) && l2767[d1415] != null && !isNaN(l2767[d1415]) && l2767[t1422] != null && !isNaN(l2767[t1422]) && l2767[a1428] != null && !isNaN(l2767[a1428]) && l2767[x1432] != null && !isNaN(l2767[x1432]); }
function l2789(l2767, addProps, transform) { if (!f2776(l2767))
    return null; const o2768 = figma.createEllipse(); n2790(o2768, l2767, addProps, transform, true); return o2768; }
function n2790(o2768, l2767, addProps, transform, isValid = false) { if (!isValid && !f2776(l2767))
    return; l2791(o2768, l2767, transform); if (p2766.includes(o2768))
    d2698(o2768);
else
    l2703(o2768, l2767, addProps); }
function l2791(o2768, l2767, transform) { o2768.cornerRadius = l2767[d1415]; const start = l2767[t1422] / 360 * (Math.PI * 2); const sweep = l2767[a1428] / 100 * (Math.PI * 2); o2768.arcData = { startingAngle: start, endingAngle: start + sweep, innerRadius: Math.min(Math.max(0, l2767[x1432] / 100), 1) }; if (transform)
    j1590(o2768, l2767); }
function r2781(r2769) { return r2769[a1409] != null && !isNaN(r2769[a1409]) && r2769[q1411] != null && !isNaN(r2769[q1411]) && r2769[r1412] != null && !isNaN(r2769[r1412]) && r2769[u1413] != null && !isNaN(r2769[u1413]) && r2769[o1421] != null && !isNaN(r2769[o1421]); }
function t2752(r2769, addProps, transform) {
    return __awaiter(this, void 0, void 0, function* () { if (!r2781(r2769))
        return null; const g2770 = figma.createFrame(); g2770.expanded = false; if (g2770) {
        k2792(g2770, r2769, addProps, transform);
        let objects = [];
        for (const t111 of r2769[g1427])
            yield h1529(t111, o => objects = [...objects, o]);
        for (const t111 of objects)
            g2770.appendChild(t111);
    } return g2770; });
}
function g2758(g2770, r2769, addProps, transform) { k2792(g2770, r2769, addProps, transform); v2733(g2770, r2769[g1427], r2769[g1427].length); }
function k2792(g2770, r2769, addProps, transform) { g2770.cornerRadius = r2769[o1421]; if (transform)
    j1590(g2770, r2769); l2703(g2770, r2769, addProps && r2769[g1427].length == 0); }
function z2780(x2771) { return true; }
function f2751(x2771) {
    return __awaiter(this, void 0, void 0, function* () { let objects = []; for (const t111 of x2771[f1410])
        yield h1529(t111, o => objects = [...objects, o]); yield figma.currentPage.loadAsync(); const b2772 = !isEmpty(objects) ? figma.group(objects, figma.currentPage) : null; if (b2772) {
        b2772.expanded = false;
        j2757(b2772, x2771);
    } return b2772; });
}
function j2757(b2772, x2771) { if (x2771[f1410].length == 0) {
    b2772.remove();
    return;
} v2733(b2772, x2771[f1410], x2771[f1410].length); q1540(b2772, x2771); }
function e2775(d2773) { return d2773[a1409] != null && !isNaN(d2773[a1409]) && d2773[q1411] != null && !isNaN(d2773[q1411]) && d2773[r1412] != null && !isNaN(d2773[r1412]); }
function z2793(d2773, addProps, transform) { if (!e2775(d2773))
    return null; const h2774 = figma.createLine(); v2794(h2774, d2773, addProps, transform, true); return h2774; }
function v2794(h2774, d2773, addProps, transform, isValid = false) { if (!isValid && !e2775(d2773))
    return; if (transform)
    j1590(h2774, d2773, true, 0); l2703(h2774, d2773, addProps); }
var p2766 = [];
function j4029(j2702) { return j2702[a1409] != null && !isNaN(j2702[a1409]) && j2702[q1411] != null && !isNaN(j2702[q1411]); }
function s2696(j2702) { const k2701 = j2702[j1405] ? figma.createRectangle() : figma.createEllipse(); if (!j4029(j2702))
    return k2701; if (p2766.includes(k2701))
    j2700(k2701, j2702);
else
    b2753(k2701, j2702); return k2701; }
function b2753(k2701, j2702) { v1591(k2701, j2702); z2699(k2701); }
function x2697() { w1527({ cmd: 'uiUpdateZoom', zoom: figma.viewport.zoom }); for (const point of p2766)
    d2698(point); }
function d2698(k2701) { f1592(k2701); z2699(k2701); }
function j2700(k2701, j2702) { v1591(k2701, j2702); z2699(k2701); }
function z2699(k2701) { if (k2701.removed)
    return; figma.currentPage.loadAsync().then(() => { const c3740 = r925(k2701.getPluginData('isCenter')); const f2708 = figma.currentPage.selection.includes(k2701); const color = c3740 ? [0xf2, 0x48, 0x22] : f2708 ? [12, 140, 233] : [255, 255, 255]; const border = c3740 ? [255, 255, 255] : f2708 ? [255, 255, 255] : [12, 140, 233]; k2701.fills = x958([['SOLID', color[0], color[1], color[2], 100]]); const effects = []; effects.push(...w1535([['DROP_SHADOW', border[0] / 255, border[1] / 255, border[2] / 255, 1, 0, 0, 0, (c3740 ? 3 : f2708 ? 5 : 3.6) / o2709, 'NORMAL', true, true]], true)); effects.push(...w1535([['DROP_SHADOW', color[0] / 255, color[1] / 255, color[2] / 255, 1, 0, 0, 0, (f2708 ? 4 : 2.4) / o2709, 'NORMAL', true, true]], true)); k2701.effects = effects; }); }
function g4030(genPoly) { return genPoly[a1409] != null && !isNaN(genPoly[a1409]) && genPoly[q1411] != null && !isNaN(genPoly[q1411]) && genPoly[r1412] != null && !isNaN(genPoly[r1412]) && genPoly[u1413] != null && !isNaN(genPoly[u1413]) && genPoly[u1418] != null && !isNaN(genPoly[u1418]) && genPoly[a1424] != null && !isNaN(genPoly[a1424]); }
function e2710(genPoly, addProps, transform) { if (!g4030(genPoly))
    return null; const figPoly = figma.createPolygon(); y2711(figPoly, genPoly, addProps, transform, true); return figPoly; }
function y2711(figPoly, genPoly, addProps, transform, isValid = false) { if (!isValid && !g4030(genPoly))
    return; figPoly.cornerRadius = genPoly[u1418]; figPoly.pointCount = Math.max(3, genPoly[a1424]); if (transform)
    j1590(figPoly, genPoly); l2703(figPoly, genPoly, addProps); }
function p2713(h2712) { return h2712[a1409] != null && !isNaN(h2712[a1409]) && h2712[q1411] != null && !isNaN(h2712[q1411]) && h2712[r1412] != null && !isNaN(h2712[r1412]) && h2712[u1413] != null && !isNaN(h2712[u1413]) && h2712[e1414] != null && !isNaN(h2712[e1414]); }
function s2714(h2712, addProps, transform) { if (!p2713(h2712))
    return null; const figRect = figma.createRectangle(); b2715(figRect, h2712, addProps, transform, true); return figRect; }
function b2715(figRect, h2712, addProps, transform, isValid = false) { if (!isValid && !p2713(h2712))
    return; const found = h2712[s1403].findIndex(e => e[0] == 'ROUND_CORNERS'); if (found > -1) {
    const corners = h2712[s1403][found];
    figRect.topLeftRadius = corners[1];
    figRect.topRightRadius = corners[2];
    figRect.bottomLeftRadius = corners[3];
    figRect.bottomRightRadius = corners[4];
}
else
    figRect.cornerRadius = h2712[e1414]; if (transform)
    j1590(figRect, h2712); l2703(figRect, h2712, addProps); }
function n2716(r2726) { return r2726[a1409] != null && !isNaN(r2726[a1409]) && r2726[q1411] != null && !isNaN(r2726[q1411]) && r2726[r1412] != null && !isNaN(r2726[r1412]) && r2726[u1413] != null && !isNaN(r2726[u1413]) && r2726[z1419] != null && !isNaN(r2726[z1419]) && r2726[m1425] != null && !isNaN(r2726[m1425]) && r2726[f1430] != null && !isNaN(r2726[f1430]); }
function m2717(r2726, addProps, transform) { if (!n2716(r2726))
    return null; const v2727 = figma.createStar(); d2718(v2727, r2726, addProps, transform, true); return v2727; }
function d2718(v2727, r2726, addProps, transform, isValid = false) { if (!isValid && !n2716(r2726))
    return; v2727.cornerRadius = r2726[z1419]; v2727.pointCount = r2726[m1425]; v2727.innerRadius = Math.min(Math.max(0, r2726[f1430] / 100), 1); if (transform)
    j1590(v2727, r2726); l2703(v2727, r2726, addProps); }
const g4273 = [];
function c2719(a2723) { return a2723[o1431] != null && a2723[a1409] != null && !isNaN(a2723[a1409]) && a2723[q1411] != null && !isNaN(a2723[q1411]) && a2723[r1412] != null && !isNaN(a2723[r1412]) && a2723[u1413] != null && !isNaN(a2723[u1413]) && a2723[x1433] != null && a2723[x1433] != NULL && a2723[q1434] != null && !isNaN(a2723[q1434]); }
function c2720(a2723, addProps, transform) { if (!c2719(a2723))
    return null; const e2795 = figma.createText(); u2721(e2795, a2723, addProps, transform, true); return e2795; }
function u2721(e2795, a2723, addProps, transform, isValid = false) { if (!isValid && !c2719(a2723))
    return null; const fontName = { family: a2723[x1433], style: a2723[q1435] }; try {
    if (!g4273.includes(fontName)) {
        figma.loadFontAsync(fontName).then(() => { g4273.push(fontName); x2722(e2795, a2723, fontName, addProps, transform); });
    }
    else {
        x2722(e2795, a2723, fontName, addProps, transform);
    }
}
catch (e) {
    j955(e);
} }
function x2722(e2795, a2723, fontName, addProps, transform) { e2795.fontName = fontName; e2795.fontSize = Math.max(1, a2723[q1434]); e2795.characters = a2723[o1431]; e2795.lineHeight = { unit: 'PERCENT', value: a2723[q1438] }; e2795.letterSpacing = { unit: 'PERCENT', value: a2723[i1439] }; if (a2723[g1436] == 0)
    e2795.textAlignHorizontal = 'LEFT';
else if (a2723[g1436] == 1)
    e2795.textAlignHorizontal = 'CENTER';
else if (a2723[g1436] == 2)
    e2795.textAlignHorizontal = 'RIGHT';
else if (a2723[g1436] == 3)
    e2795.textAlignHorizontal = 'JUSTIFIED'; if (a2723[s1437] == 0)
    e2795.textAlignVertical = 'TOP';
else if (a2723[s1437] == 1)
    e2795.textAlignVertical = 'CENTER';
else if (a2723[s1437] == 2)
    e2795.textAlignVertical = 'BOTTOM'; if (transform)
    j1590(e2795, a2723); l2703(e2795, a2723, addProps); if (a2723[v1420] == 0 && a2723[z1426] == 0)
    e2795.textAutoResize = 'WIDTH_AND_HEIGHT';
else if (a2723[v1420] == 0)
    e2795.textAutoResize = 'HEIGHT';
else
    e2795.textAutoResize = 'NONE'; }
function i2778(a2728) { return true; }
function a2749(a2728, addProps, transform) { if (!i2778(a2728))
    return null; const t2729 = figma.createVector(); p2755(t2729, a2728, addProps, transform, true); return t2729; }
function p2755(t2729, a2728, addProps, transform, isValid = false) { if (!isValid && !i2778(a2728))
    return; t2729.setVectorNetworkAsync(a2728[j1416]); if (transform)
    j1590(t2729, a2728, false); l2703(t2729, a2728, addProps); }
function v2777(f2724) { return f2724[c1423] != null && !isNaN(f2724[c1423]) && f2724[t1429] != null && !isNaN(f2724[t1429]); }
function h2748(f2724, addProps, transform) { const e2725 = figma.createVector(); w2754(e2725, f2724, addProps, transform, true); return e2725; }
function w2754(e2725, f2724, addProps, transform, isValid = false) { if (!isValid && !v2777(f2724))
    return; e2725.vectorPaths = [{ windingRule: f2724[c1423] == 1 ? 'NONZERO' : 'EVENODD', data: f2724[t1417] }]; e2725.cornerRadius = f2724[t1429]; if (transform)
    j1590(e2725, f2724, false); l2703(e2725, f2724, addProps); }
