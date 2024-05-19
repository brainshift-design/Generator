var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function r1051(key, tag) { return key.substring(0, tag.length + 1) == tag + ' '; }
function l1052(key, tag) { return key.substring(tag.length + 1); }
function k1053(key) { return r1051(key, j876); }
function q1054(key) { return r1051(key, j874); }
function p1055(key) { return r1051(key, z875); }
function a1056(key) { return l1052(key, j876); }
function v1057(key) { return l1052(key, j874); }
function h1058(key) { return l1052(key, z875); }
const generatorVersion = 421;
const h868 = 2147483647;
const NULL = '';
const c869 = '  ';
const v870 = '    ';
const k871 = '\n';
const j872 = '◦ G •';
const g873 = j872 + ' ';
const j874 = 'G_NODE';
const z875 = 'G_CONN';
const j876 = 'G_PAGE';
const r877 = 'G_TEMP';
const minWindowWidth = 602;
const minWindowHeight = 39;
const identity = Object.freeze([[1, 0, 0], [0, 1, 0], [0, 0, 1]]);
const Epsilon = 0.0000001;
const Tau = Math.PI * 2;
var enableAsserts = false;
function d878(x, eps = 0.000000001) { return Math.abs(x) < eps ? 0 : x; }
function nozero(x, eps = 0.000000001) { return x != 0 ? x : (x < 0 ? -eps : eps); }
function w879(v, eps = 0.000000001) { return point(nozero(v.x, eps), nozero(v.y, eps)); }
function equal(a, b, eps = 0.000000001) { return Math.abs(b - a) < eps; }
function sqr(x) { return x * x; }
;
function cube(x) { return x * x * x; }
;
function p880(f) { return Math.floor(f) | 0; }
function g881(x) { x = p880(x); x--; x |= x >> 1; x |= x >> 2; x |= x >> 4; x |= x >> 8; x |= x >> 16; x |= x >> 32; return ++x; }
function gcd(a, b) { let temp; while (1) {
    temp = a % b;
    if (temp == 0)
        return b;
    a = b;
    b = temp;
} }
function distv(p1, p2) { const dx = p2.x - p1.x; const dy = p2.y - p1.y; return Math.sqrt(dx * dx + dy * dy); }
function x882(v) { let angle = Math.atan2(v.y, v.x); if (angle < 0)
    angle += Tau; return angle; }
function anglev2(v1, v2) { return anglev2_(v1.x, v1.y, v2.x, v2.y); }
function anglev2_(x1, y1, x2, y2) { const dx = x2 - x1; const dy = y2 - y1; let angle = Math.atan2(dy, dx); if (angle < 0)
    angle += Tau; return angle; }
function t884(v) { return Math.sqrt(v.x * v.x + v.y * v.y); }
function lengthv_(x, y) { return Math.sqrt(x * x + y * y); }
function l885(v) { return point(v.x == 0 ? 0 : v.x / t884(v), v.y == 0 ? 0 : v.y / t884(v)); }
function dotv(v1, v2) { return v1.x * v2.x + v1.y * v2.y; }
function g886(a1, a2) { let diff = a2 - a1; while (diff <= -Tau / 2)
    diff += Tau; while (diff > Tau / 2)
    diff -= Tau; return diff; }
function a887(v, m) { let v3 = [v.x, v.y, 1]; let r = d951(v3, m); return point(r[0], r[1]); }
function r888(...mm) { a955(mm.length > 0, 'mulm3m3() must take at least one argument'); let result = clone(mm[0]); for (let a = 1; a < mm.length; a++) {
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
function v889(m, s) { for (let i = 0; i < 3; i++)
    for (let j = 0; j < 3; j++)
        m[i][j] /= s; return m; }
function adjugate(m) { return cofactor(transpose(m)); }
function transpose(m) { return [[m[0][0], m[1][0], m[2][0]], [m[0][1], m[1][1], m[2][1]], [m[0][2], m[1][2], m[2][2]]]; }
function cofactor(m) { return [[m[1][1] * m[2][2] - m[2][1] * m[1][2], -(m[1][0] * m[2][2] - m[2][0] * m[1][2]), m[1][0] * m[2][1] - m[2][0] * m[1][1]], [-(m[0][1] * m[2][2] - m[2][1] * m[0][2]), m[0][0] * m[2][2] - m[2][0] * m[0][2], -(m[0][0] * m[2][1] - m[2][0] * m[0][1])], [m[0][1] * m[1][2] - m[1][1] * m[0][2], -(m[0][0] * m[1][2] - m[1][0] * m[0][2]), m[0][0] * m[1][1] - m[1][0] * m[0][1]]]; }
function determinant(m) { return m[0][0] * (m[1][1] * m[2][2] - m[1][2] * m[2][1]) - m[0][1] * (m[1][0] * m[2][2] - m[2][0] * m[1][2]) + m[0][2] * (m[1][0] * m[2][1] - m[2][0] * m[1][1]); }
function y890(m) { return v889(adjugate(m), determinant(m)); }
function s891(angle) { const cosA = d878(Math.cos(angle)); const sinA = d878(Math.sin(angle)); return [[cosA, sinA, 0], [-sinA, cosA, 0], [0, 0, 1]]; }
function c892(x = 0, y = 0, h893 = 1, p894 = 1, angle = 0, b895 = 0, d896 = 0) { const cosA = Math.cos(angle); const sinA = Math.sin(angle); return [[h893 * cosA - d896 * sinA, -b895 * cosA + p894 * sinA, x], [d896 * cosA + h893 * sinA, p894 * cosA + b895 * sinA, y], [0, 0, 1]]; }
function o897(v1, v2) { return v1.x * v2.y - v1.y * v2.x; }
function v898(v1, v2) { return point(v1.x + v2.x, v1.y + v2.y); }
function sqrv(v) { return m899(v, v); }
function m899(v1, v2) { return point(v1.x * v2.x, v1.y * v2.y); }
function w900(v, s) { return point(v.x * s, v.y * s); }
function l901(v1, v2) { return point(v1.x / v2.x, v1.y / v2.y); }
function o902(v, s) { return point(v.x / s, v.y / s); }
function h903(v1, v2) { return point(v1.x - v2.x, v1.y - v2.y); }
function k904(str) { return decodeURI(encodeURIComponent(str)); }
function d905(str) { return decodeURIComponent(encodeURI(str)); }
function k906(bytes) { let str = ''; for (let i = 0; i < bytes.length; i++)
    str += String.fromCharCode(bytes[i]); return str; }
function e907(str) { return Array.from(d905(str), c => c.charCodeAt(0)); }
function q908(array, size) { const newArray = new Uint8Array(size); o909(array, newArray); return newArray; }
function o909(src, dst) { g910(src, 0, src.length, dst, 0, dst.length); }
function g910(src, f911, n912, dst, t913, k914) { const size = Math.min(n912, k914); for (let i = 0; i < size; i++)
    dst[t913 + i] = src[f911 + i]; }
function m915(j916, z917) { if (j916.length != z917.length)
    return false; for (let i = 0; i < j916.length; i++) {
    if (j916[i] != z917[i])
        return false;
} return true; }
function t918(n919, i920) { return n919.findIndex(i => i920.includes(i)) > -1; }
function w921(list) { return list ? '<==' : '<--'; }
;
function h922(list) { return list ? '==>' : '-->'; }
;
function m923(nodeId) { return j874 + ' ' + nodeId; }
function d924(name) { return z875 + ' ' + name; }
function c925(name) { return j876 + ' ' + name; }
function h926(str) { return str.toLowerCase() == 'true' || str == '1'; }
function b927(r928, i929 = false) { return z934(r928.outputNodeId, r928.outputId, r928.outputOrder, r928.inputNodeId, r928.inputId, r928.list, i929); }
function v930(outputNodeId, outputId, outputOrder, inputNodeId, inputId) { return d924(outputNodeId + ' ' + outputId + ' ' + outputOrder + ' ' + inputNodeId + ' ' + inputId); }
function v931(i243) { return v930(i243.outputNodeId, i243.outputId, i243.outputOrder, i243.inputNodeId, i243.inputId); }
function v932(i243) { return v930(i243.output.node.id, i243.output.id, i243.outputOrder, i243.input.node.id, i243.input.id); }
function q933(i243, i929 = false) { return z934(i243.output.node.id, i243.output.id, i243.outputOrder, i243.input.node.id, i243.input.id, i243.list, i929); }
function z934(outputNodeId, outputId, outputOrder, inputNodeId, inputId, list, i929 = false) { const sp = i929 ? ' ' : '  '; const jsp = i929 ? '' : ' '; const arrow = sp + a938(typeof outputOrder == 'string' ? parseInt(outputOrder) : outputOrder) + h922(typeof list == 'string' ? h926(list) : list) + sp; const join = jsp + '.' + jsp; return outputNodeId + join + outputId + arrow + inputNodeId + join + inputId; }
function d935(pageId) { return c925(pageId); }
function s936(num) { const str = num.toString(); let sup = ''; for (const c of str)
    sup += p937(c); return sup; }
function p937(c) { switch (c) {
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
function a938(num) { const str = num.toString(); let sup = ''; for (const c of str)
    sup += p939(c); return sup; }
function p939(c) { switch (c) {
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
function a940(bool) { return bool ? 'true' : 'false'; }
function isValid(val) { return val != undefined && val != null; }
function isEmpty(array) { return array.length == 0; }
function c941(array, item) { k942(array, array.indexOf(item)); }
function k942(array, index) { if (index > -1 && index < array.length)
    array.splice(index, 1); }
function c943(array) { if (isEmpty(array))
    return null; let last = array.at(-1); array.splice(array.length - 1, 1); return last; }
function o944(array) { return array[array.length - 1]; }
function t945(array, from, to) { const item = array[from]; array.splice(from, 1); array.splice(to, 0, item); }
function f946(array, item) { const index = array.indexOf(item); if (index > -1)
    array.splice(index, 1); }
function j947(v2783, array) { for (const item of array) {
    const index = v2783.indexOf(item);
    if (index > -1)
        v2783.splice(index, 1);
} }
function w948(array, where) { const index = array.findIndex(where); if (index > -1)
    array.splice(index, 1); }
function d949(styleId) { return styleId.split(',')[0] + ','; }
function r950(points) { let g4019 = ''; if (points.length < 2)
    return g4019; g4019 += 'M'; g4019 += ' ' + d878(points[0].x); g4019 += ' ' + d878(points[0].y); for (let i = 1; i < points.length; i++) {
    g4019 += ' L' + ' ' + d878(points[i].x) + ' ' + d878(points[i].y);
} return g4019; }
function point(x, y) { return { x: x, y: y }; }
function d951(v, m) { let r = [0, 0, 0]; for (let i = 0; i < 3; i++)
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
function v952(array, item, equal = null) { if (equal) {
    if (Array.isArray(item))
        item.forEach(i => v952(array, i, equal));
    else if (!array.find(i => equal(i, item)))
        array.push(item);
}
else {
    if (Array.isArray(item))
        item.forEach(i => v952(array, i));
    else if (!array.includes(item))
        array.push(item);
} }
function h953(array, item, equal) { if (Array.isArray(item))
    item.forEach(i => h953(array, i, equal));
else if (!array.find(equal))
    array.push(item); }
function d954(array, item, except) { if (Array.isArray(item))
    item.forEach(i => d954(array, i, except));
else if (!array.find(except))
    array.push(item); }
function a955(...args) { if (enableAsserts) {
    console.assert(...args);
} }
function d956(...args) { if (enableAsserts)
    console.error(...args); }
function c957(str, trim) { while (str.length >= trim.length && str.substring(0, trim.length) == trim)
    str = str.substring(trim.length); return str; }
function e958(str, trim) { while (str.length >= trim.length && str.substring(str.length - trim.length) == trim)
    str = str.substring(0, str.length - trim.length); return str; }
function h959(v4079) { const fills = []; for (const fill of v4079) {
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
            const [p0, p1, p2] = fill[1];
            const x4194 = [[0, 1, 0], [0.5, 0.5, 1], [1, 1, 1]];
            let k4195 = [[p0.x, p1.x, p2.x], [p0.y, p1.y, p2.y], [1, 1, 1]];
            k4195 = r888(x4194, y890(k4195));
            k4195 = [k4195[0], k4195[1]];
            const stops = [];
            for (const stop of fill[2]) {
                stops.push({ color: { r: Math.min(Math.max(0, stop[0]), 1), g: Math.min(Math.max(0, stop[1]), 1), b: Math.min(Math.max(0, stop[2]), 1), a: Math.min(Math.max(0, stop[3]), 1) }, position: stop[4] });
            }
            fills.push({ type: fill[0], gradientTransform: k4195, gradientStops: stops, blendMode: fill[3] });
            break;
        }
    }
} return fills; }
function v960(type) { return h1092.includes(type); }
const g1059 = 'LIST#';
const o1060 = 'NLIST#';
const w1061 = 'TLIST#';
const i1062 = 'SLIST#';
const z1063 = 'NULL';
const f1064 = 'VAR';
const d1065 = 'VARGRP';
const d1066 = 'FEEDBK';
const j1067 = 'REPT';
const v1068 = 'CACHE';
const v1069 = 'FRZ';
const o1070 = 'TIMER';
const o1071 = 'VNAME';
const GET_LIST_VALUE_NAMES = 'GVNAMES';
const LIST_VALUE_NAMES = 'VNAMES';
const OBJECT_NAME = 'ONAME';
const t1072 = 'CMB';
const w1073 = 'LSASIT';
const l1074 = 'EXTR';
const d1075 = 'SETP';
const b1076 = 'GETP';
const r1077 = 'SUBLST';
const i1078 = 'UNIQ';
const REORDER_LIST = 'RORD';
const SHIFT_LIST = 'SHFTLST';
const g1079 = 'REVLST';
const BUCKLE_LIST = 'BUKLST';
const r1080 = 'SORT';
const r1081 = 'CLMN';
const y1082 = 'CELL';
const n1083 = 'LIST';
const i1084 = 'COUNT';
const OBJECT_COUNT = 'OBJCOUNT';
const z1085 = 'LCONT';
const y1086 = 'SELECT';
const SELECT_FROM_LIST = 'LSTSEL';
const k1087 = 'IF';
const d1088 = 'LSTFLT';
const n1090 = 'ANY#';
const o1091 = [g1059, o1060, w1061, i1062, t1072, l1074, d1075, b1076, r1077, n1083, i1084, z1085, j1067];
const h1092 = [g1059, o1060, w1061, i1062];
const j1089 = 'ITER';
const j1111 = 'PROB';
const HOLD = 'HOLD';
const e1094 = 'NUM#';
const s1095 = 'NUM';
const NUMBER_PRECISION = 'NPREC';
const z1096 = 'NSIGN';
const u1097 = 'ABS';
const NUMBER_NEGATIVE = 'NEG';
const l1098 = 'ROUND';
const NUMBER_QUANTIZE = 'QUANT';
const h1099 = 'SMINMAX';
const x1100 = 'MINMAX';
const c1101 = 'LIM';
const v1102 = 'NCURVE';
const NUMBER_MAP = 'NMAP';
const NUMBER_BIAS = 'NBIAS';
const m1103 = 'NANISNUM';
const i1104 = 'CONST';
const y1105 = 'DATE';
const x1106 = 'SEQ';
const o1107 = 'RANGE';
const y1108 = 'WAVE';
const n1109 = 'RAND';
const n1110 = 'NOISE';
const m1112 = 'ACCUM';
const a1113 = 'LERP';
const o1114 = 'SOLVE';
const x1115 = 'NANIM';
const y1116 = 'SMATH';
const v1117 = 'MATH';
const q1118 = 'ADD';
const g1119 = 'SUB';
const f1120 = 'MUL';
const s1121 = 'DIV';
const f1122 = 'MOD';
const l1123 = 'EXP';
const h1124 = 'NBOOL';
const a1125 = 'NOT';
const g1126 = 'AND';
const v1127 = 'OR';
const s1128 = 'XOR';
const t1129 = 'COND';
const d1130 = 'EQ';
const h1131 = 'NE';
const g1132 = 'LT';
const b1133 = 'LE';
const j1134 = 'GT';
const p1135 = 'GE';
const v1136 = 'TRIG';
const l1137 = 'SIN';
const e1138 = 'COS';
const j1139 = 'TAN';
const b1140 = 'ATAN2';
const k1141 = 'CNVANG';
const y1093 = [z1063, f1064, d1065, ...o1091, w1073, l1074, d1075, b1076, r1077, i1078, REORDER_LIST, SHIFT_LIST, g1079, BUCKLE_LIST, r1081, r1080, y1082, n1083, y1086, SELECT_FROM_LIST, k1087, d1088, d1066, j1067, j1089, j1111, HOLD, v1068, v1069, o1070, o1071, GET_LIST_VALUE_NAMES, LIST_VALUE_NAMES, OBJECT_NAME];
const l1142 = [v1117, y1116, q1118, g1119, f1120, s1121, f1122, l1123];
const q1143 = [h1124, a1125, g1126, v1127, s1128];
const w1144 = [t1129, d1130, h1131, g1132, b1133, j1134, p1135];
const e1145 = [v1136, l1137, e1138, j1139, b1140];
const b1146 = 'TEXT#';
const h1147 = 'TEXT';
const j1148 = 'TLEN';
const h1149 = 'TTRIM';
const t1150 = 'TSUB';
const e1151 = 'TCONT';
const d1152 = 'TCASE';
const e1153 = 'TREPL';
const c1154 = 'TJOIN';
const e1155 = 'TPAD';
const w1156 = 'TCMP';
const j1157 = 'TCHAR';
const e1158 = 'TUNI';
const i1159 = 'INDEX';
const r1160 = 'N2T';
const c1161 = 'C2T';
const w1162 = 'T2N';
const f1163 = 'T2C';
const j1164 = 'TSPLT';
const q3493 = 'TJSON';
const c1166 = 'TCSV';
const k1167 = 'FETCH';
const q1168 = 'TFILE';
const z1169 = [e1094, o1060, s1095, NUMBER_PRECISION, z1096, u1097, NUMBER_NEGATIVE, l1098, NUMBER_QUANTIZE, h1099, x1100, c1101, v1102, NUMBER_MAP, NUMBER_BIAS, m1103, i1104, y1105, x1106, o1107, y1108, n1109, n1110, m1112, a1113, o1114, x1115, r1160, j1157, ...l1142, ...q1143, ...w1144, ...e1145, k1141, BUCKLE_LIST];
const b1170 = [b1146, w1061, h1147, j1148, h1149, t1150, e1151, d1152, c1154, e1155, e1153, w1156, e1158, i1159, w1162, f1163, j1164, q3493, c1166, k1167, q1168];
const m1171 = 'COL#';
const q1172 = 'COL';
const h1173 = 'CVAL';
const e1174 = 'CCOR';
const v1175 = 'COLP3';
const g1176 = 'CCNT';
const o1177 = 'BLND';
const p1178 = 'CLERP';
const d1179 = 'CBLND';
const y1180 = [m1171, q1172, e1174, v1175, o1177, p1178, d1179, c1161];
const z1181 = 'FILL#';
const l1182 = 'FILL';
const k1183 = [z1181, l1182];
const z1184 = 'STRK#';
const z1185 = 'STRK';
const d1186 = [z1184, z1185];
const w1193 = 'STRKSD#';
const r1194 = 'STRKSD';
const z1195 = [w1193, r1194];
const b1187 = 'CSTOP#';
const y1188 = 'CSTOP';
const f1189 = [b1187, y1188];
const s1190 = 'GRAD#';
const m1191 = 'GRAD';
const h1192 = [s1190, m1191];
const n1196 = 'RCRN#';
const g1197 = 'RCRN';
const h1198 = [n1196, g1197];
const q1199 = 'DRSH#';
const b1200 = 'DRSH';
const q1201 = [q1199, b1200];
const q1202 = 'INSH#';
const k1203 = 'INSH';
const f1204 = [q1202, k1203];
const h1205 = 'LBLR#';
const o1206 = 'LBLR';
const w1207 = [h1205, o1206];
const a1208 = 'BBLR#';
const h1209 = 'BBLR';
const x1210 = [a1208, h1209];
const i1211 = 'MASK#';
const u1212 = 'MASK';
const b1213 = [i1211, u1212];
const k1214 = 'BLEND#';
const s1215 = 'BLEND';
const q1216 = [k1214, s1215];
const l1217 = [...z1195, ...h1198, ...q1201, ...f1204, ...w1207, ...x1210, ...q1216, ...b1213];
const g1218 = [m1171, z1181, s1190, z1184, w1193, q1199, q1202, h1205, a1208, k1214, i1211];
const j1219 = 'CSTL';
const c1220 = 'SHP#';
const b1221 = 'RECT#';
const l1222 = 'RECT';
const k1223 = [b1221, l1222];
const g1224 = 'LINE#';
const p1225 = 'LINE';
const e1226 = [g1224, p1225];
const u1227 = 'ELPS#';
const p1228 = 'ELPS';
const e1229 = [u1227, p1228];
const h1230 = 'TRPZ#';
const a1231 = 'TRPZ';
const g1232 = [h1230, a1231];
const r1239 = 'POLY#';
const l1240 = 'POLY';
const h1241 = [r1239, l1240];
const b1242 = 'STAR#';
const r1243 = 'STAR';
const i1244 = [b1242, r1243];
const k1245 = 'TXTS#';
const s1246 = 'TXTS';
const g1247 = [k1245, s1246];
const l1248 = 'PT#';
const z1249 = 'PT';
const i1250 = [l1248, z1249];
const c1251 = 'PCORN';
const z1252 = 'VPATH#';
const x1253 = 'VPATH';
const n1254 = [z1252, x1253];
const a1255 = 'VPT#';
const f1256 = 'VPT';
const g1257 = [a1255, f1256];
const d1258 = 'VEDGE#';
const q1259 = 'VEDGE';
const c1260 = [d1258, q1259];
const t1261 = 'VREG#';
const g1262 = 'VREG';
const v1263 = [t1261, g1262];
const z1264 = 'VNET#';
const w1265 = 'VNET';
const b1266 = [z1264, w1265];
const u1267 = 'SGRP#';
const z1268 = 'SGRP';
const c1269 = [u1267, z1268];
const k1270 = 'FRM#';
const p1271 = 'FRM';
const g1272 = [k1270, p1271];
const b1234 = 'ARC#';
const z1233 = 'ARC';
const h1235 = [b1234, z1233];
const a1237 = 'WAVEP#';
const i1236 = 'WAVEP';
const f1238 = [a1237, i1236];
const o1273 = 'MOVE';
const y1274 = 'ROT';
const u1275 = 'SCALE';
const z1276 = 'SKEW';
const u1277 = 'SCENTR';
const c1278 = 'RSTX';
const w1279 = 'PLACE';
const x1280 = 'APPLY';
const PATH_LENGTH = 'PTHLEN';
const JOIN_PATHS = 'JOINPTH';
const REORIENT_PATHS = 'REORPTH';
const i1287 = 'PTALPATH';
const l1288 = 'CPTONPATH';
const y1281 = 'MESPT';
const i1282 = 'PTANGLE';
const q1283 = 'VECLEN';
const v1284 = 'CIRCEN';
const ARC_FROM_POINTS = 'ARCPT';
const f1285 = 'INTLIN';
const b1286 = 'PTLERP';
const REVERSE_PATH = 'REVPTH';
const BLEND_PATH = 'BLENDPTH';
const PATH_TYPES = [x1253, a1231, z1233, i1236];
const PATH_VALUES = [z1252, h1230, b1234, a1237];
const a1289 = 'SBOOL';
const c1290 = 'SBOOL#';
const c1291 = 'SBOOLU';
const x1292 = 'SBOOLS';
const p1293 = 'SBOOLI';
const p1294 = 'SBOOLE';
const r1295 = [a1289, c1290, c1291, x1292, p1293, p1294];
const b1296 = 'RENDER';
const EXPORT = 'EXPORT';
const f1297 = [c1220, i1062, b1221, g1224, u1227, h1230, r1239, b1242, k1245, l1248, z1252, a1255, d1258, t1261, z1264, b1234, a1237, u1267, k1270, c1290, q1199, q1202, h1205, a1208, k1214, i1211];
const s1298 = [y1274, u1275, z1276];
const m1299 = [...f1297, ...k1223, ...e1226, ...e1229, ...g1232, ...h1241, ...i1244, ...g1247, ...i1250, c1251, ...n1254, ...g1257, ...c1260, ...v1263, ...b1266, ...h1235, ...f1238, ...c1269, ...g1272, ...r1295, o1273, ...s1298, u1277, c1278, w1279, x1280, PATH_LENGTH, JOIN_PATHS, REORIENT_PATHS, i1287, l1288, y1281, i1282, q1283, v1284, z1233, i1236, ARC_FROM_POINTS, f1285, b1286, REVERSE_PATH, BLEND_PATH, b1296, EXPORT];
const j1300 = [g1059, o1060, w1061, i1062, e1094, b1146, m1171, z1181, b1187, s1190, z1184, b1187, s1190, c1220, b1221, g1224, u1227, h1230, r1239, b1242, k1245, l1248, z1252, a1255, d1258, t1261, z1264, u1267, k1270, n1196, q1199, q1202, h1205, a1208, k1214, i1211];
const x1301 = 'GROUP';
const g1302 = 'GPARAM';
const j1303 = [x1301, g1302];
const p1304 = 'CMNT';
const t1305 = 'CMNTARR';
const w1306 = 'PANEL';
const k1307 = 'ACT';
const z1308 = 'BFACT';
const t1309 = 'BFLST';
const a1310 = 'DIS';
const l1311 = 'NOC';
const PARAM = 'PARAM';
const e1312 = 'LOG';
const h1313 = 'GRAPH';
const s1314 = [[f1122, '%'], [s1121, '/'], [g1119, '−'], [q1118, '+'], [f1120, '×'], [l1123, 'e<sup>x']];
const d1315 = [[s1121, '/'], [g1119, '−'], [q1118, '+'], [f1120, '×']];
const l1316 = 0;
const q1317 = 1;
const z1318 = 2;
const u1319 = 3;
const v1320 = [[l1316, 'not'], [q1317, 'xor'], [z1318, 'or'], [u1319, 'and']];
const s1321 = 0;
const i1322 = 1;
const z1323 = 2;
const a1324 = 3;
const h1325 = 4;
const s1326 = 5;
const q1327 = [[s1321, '<'], [i1322, '≤'], [z1323, '≠'], [a1324, '='], [h1325, '≥'], [s1326, '>']];
const z1328 = 0;
const h1329 = 1;
const s1330 = 2;
const u1331 = 3;
const b1332 = 4;
const p1333 = 5;
const n1334 = [[z1328, 'sin'], [h1329, 'cos'], [s1330, 'tan'], [u1331, 'asin'], [b1332, 'acos'], [p1333, 'atan']];
const z1335 = 'EMPTY';
const s1336 = 'CONNECT';
const z1337 = 'CREATE';
const b1338 = 'CREATE_INSERT';
const c1339 = 'DELETE';
const j1340 = 'DISCONNECT';
const q1341 = 'LINK_STYLE';
const j1342 = 'LINK_VARIABLE';
const s1343 = 'LINK_VARIABLE_GROUP';
const a1344 = 'MAKE_ACTIVE';
const MAKE_NOT_CONDITION_ACTION = 'MAKE_NOT_CONDITION';
const r1345 = 'MAKE_PASSIVE';
const y1346 = 'PASTE';
const q1347 = 'RECONNECT';
const w1348 = 'REMOVE';
const l1349 = 'RENAME';
const g1350 = 'REORDER_INPUTS';
const l1351 = 'REORDER_CONNECTIONS';
const f1352 = 'SELECT';
const y1353 = 'SELECT_MOVE';
const r1354 = 'MOVE_NODES';
const q1355 = 'SET_PARAM_VALUE';
const SET_MULTIPLE_VALUES_ACTION = 'SET_MULTIPLE_VALUES';
const o1356 = 'SET_PARAM_SETTING';
const h1357 = 'SET_NODE_RECT';
const i1358 = 'TOGGLE_DISABLE';
const h1359 = 'TOGGLE_PARAM_HEADER';
const a1360 = 'SET_CURRENT_GRAPH';
const f1361 = 'CREATE_PAGE';
const k1362 = 'DELETE_PAGE';
const r1363 = 'GROUP_NODES';
const a1364 = 'UNGROUP_NODES';
const g1365 = 'HIGHLIGHT_NODES';
const SCROLL_LIST_NODE_ACTION = 'SCROLL_LIST_NODE';
const SET_LIST_DIVIDER_ACTION = 'SET_LIST_DIVIDER';
const SET_NODE_PARAM_ACTION = 'SET_NODE_PARAM';
const j1366 = 'BNORM';
const o1367 = 'BDARK';
const t1368 = 'BMULT';
const t1369 = 'BPDRK';
const k1370 = 'BBURN';
const l1371 = 'BLITE';
const o1372 = 'BSCRN';
const x1373 = 'BPLGT';
const k1374 = 'BDODG';
const e1375 = 'BOVER';
const i1376 = 'BSOFT';
const q1377 = 'BHARD';
const y1378 = 'BDIFF';
const j1379 = 'BEXCL';
const j1380 = 'BHUE';
const c1381 = 'BSAT';
const u1382 = 'BCOL';
const o1383 = 'BLUM';
const b1384 = [[j1366, 'normal', 'NORMAL'], [o1367, 'darken', 'DARKEN'], [t1368, 'multiply', 'MULTIPLY'], [t1369, 'plus darker', 'LINEAR_BURN'], [k1370, 'color burn', 'COLOR_BURN'], [l1371, 'lighten', 'LIGHTEN'], [o1372, 'screen', 'SCREEN'], [x1373, 'plus lighter', 'LINEAR_DODGE'], [k1374, 'color dodge', 'COLOR_DODGE'], [e1375, 'overlay', 'OVERLAY'], [i1376, 'soft light', 'SOFT_LIGHT'], [q1377, 'hard light', 'HARD_LIGHT'], [y1378, 'difference', 'DIFFERENCE'], [j1379, 'exclusion', 'EXCLUSION'], [j1380, 'hue', 'HUE'], [c1381, 'saturation', 'SATURATION'], [u1382, 'color', 'COLOR'], [o1383, 'luminosity', 'LUMINOSITY']];
const h1385 = [['thin', 100], ['extra light', 200], ['light', 300], ['regular', 400], ['medium', 500], ['semi bold', 600], ['bold', 700], ['extra bold', 800], ['black', 900]];
const o1386 = 0;
const d1387 = 1;
const y1388 = 2;
const w1389 = 2;
const k1390 = 3;
const l1391 = 3;
const r1392 = 4;
const t1393 = 4;
const b1394 = 5;
const e1395 = 6;
const f1396 = 7;
const s1397 = 8;
const s1398 = 9;
const t1399 = 10;
const h1400 = 11;
const k1401 = 12;
const w1402 = 13;
const c1403 = 14;
const a1404 = 15;
const u1405 = 16;
const w1406 = 17;
const i1407 = 18;
const n1408 = 19;
const m1409 = 20;
const i1410 = 21;
const y1411 = 22;
const i1412 = 23;
const y1413 = 24;
const FO_BOOLEAN_CHILDREN = 24;
const x1414 = 24;
const y1415 = 25;
const FO_BOOLEAN_OPERATION = 25;
const l1416 = 26;
const w1417 = 27;
const p1418 = 28;
const s1419 = 28;
const r1420 = 28;
const f1421 = 28;
const p1422 = 28;
const w1423 = 28;
const j1424 = 28;
const z1425 = 28;
const u1426 = 29;
const u1427 = 29;
const v1428 = 29;
const g1429 = 29;
const y1430 = 29;
const FO_FRAME_CLIP = 29;
const y1432 = 30;
const f1433 = 30;
const b1434 = 30;
const z1435 = 30;
const p1431 = 30;
const f1436 = 31;
const r1437 = 31;
const n1438 = 32;
const h1439 = 33;
const k1440 = 34;
const g1441 = 35;
const p1442 = 36;
const m1443 = 37;
const q2784 = '12345679ABCDEFGHJKLMNPQRSTUVWXYZ';
function k846(array, chars = q2784) { let j848 = ''; let len = array.length; let i = 0; while (len > 0) {
    if (len >= 5) {
        const a0 = array[i], a1 = array[i + 1], a2 = array[i + 2], a3 = array[i + 3], a4 = array[i + 4];
        j848 += chars[(a0 & 0xF8) >>> 3];
        j848 += chars[((a0 & 0x07) << 2) | ((a1 & 0xC0) >>> 6)];
        j848 += chars[(a1 & 0x3E) >>> 1];
        j848 += chars[((a1 & 0x01) << 4) | ((a2 & 0xF0) >>> 4)];
        j848 += chars[((a2 & 0x0F) << 1) | ((a3 & 0x80) >>> 7)];
        j848 += chars[(a3 & 0x7C) >>> 2];
        j848 += chars[((a3 & 0x03) << 3) | ((a4 & 0xE0) >>> 5)];
        j848 += chars[(a4 & 0x1F)];
    }
    else if (len == 4) {
        const a0 = array[i], a1 = array[i + 1], a2 = array[i + 2], a3 = array[i + 3];
        j848 += chars[(a0 & 0xF8) >>> 3];
        j848 += chars[((a0 & 0x07) << 2) | ((a1 & 0xC0) >>> 6)];
        j848 += chars[(a1 & 0x3E) >>> 1];
        j848 += chars[((a1 & 0x01) << 4) | ((a2 & 0xF0) >>> 4)];
        j848 += chars[((a2 & 0x0F) << 1) | ((a3 & 0x80) >>> 7)];
        j848 += chars[(a3 & 0x7C) >>> 2];
        j848 += chars[((a3 & 0x03) << 3)];
    }
    else if (len == 3) {
        const a0 = array[i], a1 = array[i + 1], a2 = array[i + 2];
        j848 += chars[(a0 & 0xF8) >>> 3];
        j848 += chars[((a0 & 0x07) << 2) | ((a1 & 0xC0) >>> 6)];
        j848 += chars[(a1 & 0x3E) >>> 1];
        j848 += chars[((a1 & 0x01) << 4) | ((a2 & 0xF0) >>> 4)];
        j848 += chars[((a2 & 0x0F) << 1)];
    }
    else if (len == 2) {
        const a0 = array[i], a1 = array[i + 1];
        j848 += chars[(a0 & 0xF8) >>> 3];
        j848 += chars[((a0 & 0x07) << 2) | ((a1 & 0xC0) >>> 6)];
        j848 += chars[(a1 & 0x3E) >>> 1];
        j848 += chars[((a1 & 0x01) << 4)];
    }
    else if (len == 1) {
        const a0 = array[i];
        j848 += chars[(a0 & 0xF8) >>> 3];
        j848 += chars[((a0 & 0x07) << 2)];
    }
    i += 5;
    len -= 5;
} return j848; }
function w847(j848, chars = q2784) { const array = []; let len = j848.length; let c = 0; while (len > 0) {
    if (len >= 8) {
        const c0 = chars.indexOf(j848[c]), c1 = chars.indexOf(j848[c + 1]), c2 = chars.indexOf(j848[c + 2]), c3 = chars.indexOf(j848[c + 3]), c4 = chars.indexOf(j848[c + 4]), c5 = chars.indexOf(j848[c + 5]), c6 = chars.indexOf(j848[c + 6]), c7 = chars.indexOf(j848[c + 7]);
        array.push((c0 << 3) | ((c1 & 0x1C) >>> 2));
        array.push(((c1 & 0x03) << 6) | (c2 << 1) | ((c3 & 0x10) >>> 4));
        array.push(((c3 & 0x0F) << 4) | ((c4 & 0x1E) >>> 1));
        array.push(((c4 & 0x01) << 7) | (c5 << 2) | ((c6 & 0x18) >>> 3));
        array.push(((c6 & 0x07) << 5) | c7);
    }
    else if (len == 7) {
        const c0 = chars.indexOf(j848[c]), c1 = chars.indexOf(j848[c + 1]), c2 = chars.indexOf(j848[c + 2]), c3 = chars.indexOf(j848[c + 3]), c4 = chars.indexOf(j848[c + 4]), c5 = chars.indexOf(j848[c + 5]), c6 = chars.indexOf(j848[c + 6]);
        array.push((c0 << 3) | ((c1 & 0x1C) >>> 2));
        array.push(((c1 & 0x03) << 6) | (c2 << 1) | ((c3 & 0x10) >>> 4));
        array.push(((c3 & 0x0F) << 4) | ((c4 & 0x1E) >>> 1));
        array.push(((c4 & 0x01) << 7) | (c5 << 2) | ((c6 & 0x18) >>> 3));
    }
    else if (len == 5) {
        const c0 = chars.indexOf(j848[c]), c1 = chars.indexOf(j848[c + 1]), c2 = chars.indexOf(j848[c + 2]), c3 = chars.indexOf(j848[c + 3]), c4 = chars.indexOf(j848[c + 4]);
        array.push((c0 << 3) | ((c1 & 0x1C) >>> 2));
        array.push(((c1 & 0x03) << 6) | (c2 << 1) | ((c3 & 0x10) >>> 4));
        array.push(((c3 & 0x0F) << 4) | ((c4 & 0x1E) >>> 1));
    }
    else if (len == 4) {
        const c0 = chars.indexOf(j848[c]), c1 = chars.indexOf(j848[c + 1]), c2 = chars.indexOf(j848[c + 2]), c3 = chars.indexOf(j848[c + 3]);
        array.push((c0 << 3) | ((c1 & 0x1C) >>> 2));
        array.push(((c1 & 0x03) << 6) | (c2 << 1) | ((c3 & 0x10) >>> 4));
    }
    else if (len == 2) {
        const c0 = chars.indexOf(j848[c]), c1 = chars.indexOf(j848[c + 1]);
        array.push((c0 << 3) | ((c1 & 0x1C) >>> 2));
    }
    c += 8;
    len -= 8;
} return array; }
function logSavedNode(nodeKey, l3994) {
    return __awaiter(this, void 0, void 0, function* () { const log = c2107(yield b1551(nodeKey, false)); if (l3994) {
        console.log('%c%s\n%c%s', 'background: #fa24; color: white;', v1057(nodeKey), 'background: #fa44; color: #edc;', log);
    }
    else {
        console.log('%c%s\n%c%s', 'background: #fdb; color: black;', v1057(nodeKey), 'background: #fed; color: black;', log);
    } });
}
function c2107(json) { let z4020 = json.replace('{\n', '').replace('\n}', '').replace('[\n' + c869, '').replace('\n' + c869 + ']', '').split(c869 + '"params":\n').join('').split('": "').join(': ').split('", "').join(': ').split(c869 + '"').join(c869).split(c869 + c869 + '["').join(c869 + c869).split('",\n').join('\n').split('"\n').join('\n').split('"],\n').join('\n'); if (z4020[z4020.length - 1] == '"')
    z4020 = z4020.substring(0, z4020.length - 1); if (z4020.substring(z4020.length - 2) == '"]')
    z4020 = z4020.substring(0, z4020.length - 2); return z4020; }
function y2108(json) { let z4020 = json.replace('{\n', '').replace('\n}', '').replace('[\n' + c869, '').replace('\n' + c869 + ']', ''); return z4020; }
function b2109(i243, l3994) { const a4198 = b927(i243, true); if (l3994) {
    console.log('%c%s', 'background: #4f44; color: #ded', a4198);
}
else {
    console.log('%c%s', 'background: #cfc; color: black;', a4198);
} }
console.clear();
figma.payments.setPaymentStatusInDevelopment({ type: 'PAID' });
figma.loadAllPagesAsync().then(() => { figma.on('documentchange', a1522); figma.on('selectionchange', q1530); figma.on('close', w1523); });
r1512(true);
figma.clientStorage.getAsync('pro').then(data => { figma.showUI(__html__, { visible: false, themeColors: true, title: 'Generator' }); });
var h2696 = figma.viewport.zoom;
setInterval(x1527, 100);
var strBackgrounds = '';
setInterval(figCheckBackgrounds, 500);
const s2785 = 'clock_';
const b2786 = 1000;
var i2787 = false;
var objectCenterSize = 15;
function t1524() { (function () {
    return __awaiter(this, void 0, void 0, function* () { figma.currentPage.loadAsync().then(() => __awaiter(this, void 0, void 0, function* () { let f2788 = yield figma.currentPage.getPluginData(figma.currentUser.id + ',windowWidth'); let c2789 = yield figma.currentPage.getPluginData(figma.currentUser.id + ',windowHeight'); let s2790; let l2791; if (f2788 === NULL) {
        s2790 = 800;
        figma.currentPage.setPluginData(figma.currentUser.id + ',windowWidth', f2788.toString());
    }
    else
        s2790 = parseInt(f2788); if (c2789 === NULL) {
        l2791 = 600;
        figma.currentPage.setPluginData(figma.currentUser.id + ',windowHeight', c2789.toString());
    }
    else
        l2791 = parseInt(c2789); figma.ui.resize(Math.max(minWindowWidth, s2790), Math.max(minWindowHeight, l2791)); figma.ui.show(); const fonts = yield figma.listAvailableFontsAsync(); const eula = (yield figma.clientStorage.getAsync('eula')) === 'true'; const tutorials = (yield figma.clientStorage.getAsync('tutorials')) === 'true'; const isLocked = yield z1529(); g1531({ cmd: 'uiReturnFigStartGenerator', currentUser: figma.currentUser, viewportRect: figma.viewport.bounds, viewportZoom: figma.viewport.zoom, fonts: fonts, eula: eula, tutorials: tutorials, isLocked: isLocked, windowWidth: s2790, windowHeight: l2791 }); })); });
})(); }
function n1525() { r1512(); figma.showUI(__html__, { visible: false, themeColors: true }); }
function v1526() { setInterval(a1528, b2786); }
function x1527() { if (figma.viewport.zoom == h2696)
    return; h2696 = figma.viewport.zoom; a2684(); l1545(); b1547(); }
function figCheckBackgrounds() { if (strBackgrounds != JSON.stringify(figma.currentPage.backgrounds)) {
    l1545();
    strBackgrounds = JSON.stringify(figma.currentPage.backgrounds);
} }
function a1528() { p1552(s2785 + figma.currentUser.sessionId.toString(), Date.now().toString()); }
function z1529() {
    return __awaiter(this, void 0, void 0, function* () { yield figma.currentPage.loadAsync(); const clocks = figma.currentPage.getPluginDataKeys().filter(k => k.length > s2785.length && k.substring(0, s2785.length) == s2785 && k.substring(s2785.length) != figma.currentUser.sessionId.toString()).map((k) => __awaiter(this, void 0, void 0, function* () { return parseInt(yield b1551(k)); })); clocks.sort(); const now = Date.now(); const locked = clocks.length > 0 && now - (yield clocks[clocks.length - 1]) < b2786 * 2; return locked; });
}
function q1530() { a2684(); }
var m2717 = new Array();
var s2719 = new Array();
function figGetObjectsFromIds(objectIds) {
    return __awaiter(this, void 0, void 0, function* () { for (let i = j2753.length - 1; i >= 0; i--)
        if (!j2753[i].removed && objectIds.includes(j2753[i].getPluginData('objectId')))
            j2753.splice(i, 1); for (let i = c2769.length - 1; i >= 0; i--)
        if (c2769[i].removed || objectIds.includes(c2769[i].getPluginData('objectId')))
            c2769.splice(i, 1); yield figma.currentPage.loadAsync(); return figma.currentPage.findAll(o => objectIds.includes(o.getPluginData('objectId'))); });
}
function s1511(nodeIds) {
    return __awaiter(this, void 0, void 0, function* () { for (let i = j2753.length - 1; i >= 0; i--)
        if (!j2753[i].removed && nodeIds.includes(j2753[i].getPluginData('nodeId')))
            j2753.splice(i, 1); for (let i = c2769.length - 1; i >= 0; i--)
        if (c2769[i].removed || nodeIds.includes(c2769[i].getPluginData('nodeId')))
            c2769.splice(i, 1); yield figma.currentPage.loadAsync(); figma.currentPage.findAll(o => nodeIds.includes(o.getPluginData('nodeId'))).forEach(o => { if (!o.removed)
        o.remove(); }); m2717 = m2717.filter(a => !nodeIds.includes(a.nodeId)); });
}
function r1512(w1513 = false) { for (const t1518 of figma.currentPage.children) {
    if (t1518.removed)
        continue;
    if (t1518.getPluginData('objectId') != '' && t1518.getPluginData('userId') == figma.currentUser.id && (parseInt(t1518.getPluginData('retain')) == 0 || w1513))
        t1518.remove();
} }
function f1514(nodeIds, y1515) { for (let i = m2717.length - 1; i >= 0; i--) {
    const n2718 = m2717[i];
    if (!nodeIds.includes(n2718.nodeId))
        continue;
    for (let j = n2718.objects.length - 1; j >= 0; j--) {
        const t1518 = n2718.objects[j];
        if (t1518.removed || !d1516(t1518, y1515)) {
            if (!t1518.removed)
                t1518.remove();
            f946(n2718.objects, t1518);
            if (j2753.includes(t1518))
                f946(j2753, t1518);
            if (c2769.includes(t1518))
                f946(c2769, t1518);
        }
        if (!t1518.removed) {
            if (parseInt(t1518.getPluginData('retain')) == 2)
                a1537(t1518);
        }
    }
    if (isEmpty(n2718.objects))
        f946(m2717, n2718);
} }
function d1516(t1518, y1515) { if (t1518.type == z1268 || t1518.type == p1271) {
    for (const child of t1518.children) {
        const found = d1516(child, y1515);
        if (found)
            return found;
    }
}
else {
    const found = y1515.find(o => t1518.getPluginData('objectId') == o[y1388] && t1518.getPluginData('userId') == figma.currentUser.id || o[b1394] == 2 && o[b1394] == t1518.getPluginData('retain'));
    if (found)
        return found;
} return null; }
function x1519(nodeIds, f1520) { figma.getLocalPaintStylesAsync().then(paintStyles => { paintStyles.filter(s => nodeIds.includes(s.getPluginData('nodeId'))).forEach(s => { const nodeId = s.getPluginData('nodeId'); const existing = h926(s.getPluginData('existing')); if (!existing) {
    s.remove();
}
else if (f1520) {
    w948(s2719, a => a.nodeId == nodeId);
    s.setPluginData('type', NULL);
    s.setPluginData('nodeId', NULL);
    s.setPluginData('existing', NULL);
} }); }); if (f1520)
    s2719 = s2719.filter(a => !nodeIds.includes(a.nodeId)); }
var b1521 = false;
function a1522(e) { for (const change of e.documentChanges) {
    switch (change.type) {
        case 'STYLE_CREATE':
            if (!change.style)
                break;
            if (!b1521) {
                change.style.setPluginData('type', NULL);
                change.style.setPluginData('nodeId', NULL);
                change.style.setPluginData('existing', NULL);
            }
            break;
        case 'STYLE_PROPERTY_CHANGE': {
            if (!change.style)
                break;
            if (!b1521) {
                const msg = { cmd: 'uiStylePropertyChange', styleId: d949(change.id), properties: change.properties, name: '', paints: [] };
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
                g1531(msg);
            }
            break;
        }
        case 'STYLE_DELETE':
            g1531({ cmd: 'uiStyleDelete', styleId: change.id });
            break;
    }
} b1521 = false; }
function w1523() { r1512(); g1531({ cmd: 'updateMetrics' }); }
figma.ui.onmessage = function (msg) { msg = JSON.parse(msg); if (msg.cmd == 'returnUiGetValueForFigma')
    return; switch (msg.cmd) {
    case 'figStartGenerator':
        t1524();
        break;
    case 'figRestartGenerator':
        n1525();
        break;
    case 'figFinishStart':
        v1526();
        break;
    case 'figDockWindowNormal':
        y2726('normal');
        break;
    case 'figDockWindowMaximize':
        y2726('maximize');
        break;
    case 'figDockWindowTop':
        y2726('top');
        break;
    case 'figDockWindowLeft':
        y2726('left');
        break;
    case 'figDockWindowRight':
        y2726('right');
        break;
    case 'figDockWindowBottom':
        y2726('bottom');
        break;
    case 'figGetMousePosition':
        p1597(msg.clientPosition);
        break;
    case 'figResizeWindow':
        w1600(msg.width, msg.height);
        break;
    case 'figSetWindowRect':
        j1598(msg.x, msg.y, msg.width, msg.height);
        break;
    case 'figNotify':
        k1601(msg);
        break;
    case 'figGetLocalData':
        j1549(msg.key);
        break;
    case 'figSetLocalData':
        f1550(msg.key, msg.value);
        break;
    case 'figClearAllLocalData':
        q4015();
        break;
    case 'figGetPageData':
        b1551(msg.key);
        break;
    case 'figSetPageData':
        p1552(msg.key, msg.value);
        break;
    case 'figSavePages':
        z1557(msg.pageIds, msg.pageJson, msg.currentPageId);
        break;
    case 'figLoadNodesAndConns':
        q1554(msg.debugMode);
        break;
    case 'figSaveNodes':
        e1558(msg.nodeIds, msg.nodeJson);
        break;
    case 'figGetAllLocalTemplateNames':
        j2723();
        break;
    case 'figSaveLocalTemplate':
        v1559(msg.c4016, msg.template);
        break;
    case 'figRemoveConnsToNodes':
        d1560(msg.nodeIds);
        break;
    case 'figRemoveSavedNodesAndConns':
        c1561(msg.nodeIds);
        break;
    case 'figRemoveAllSavedNodesAndConns':
        t1562();
        break;
    case 'figLogAllSavedNodesAndConns':
        s1563(msg.l3994);
        break;
    case 'figLogAllSavedNodes':
        b1564(msg.l3994);
        break;
    case 'figLogAllSavedConns':
        f1565(msg.l3994);
        break;
    case 'figLogAllSavedPageKeys':
        o1566(msg.l3994);
        break;
    case 'figLogAllSavedPages':
        e1567(msg.l3994);
        break;
    case 'figLogAllSavedConnKeys':
        k1568(msg.l3994);
        break;
    case 'figLogAllLocalData':
        j1569(msg.l3994);
        break;
    case 'figGetValue':
        s1570(msg.key, msg.spec);
        break;
    case 'figRemoveSavedPage':
        j1572(msg.pageId);
        break;
    case 'figRemoveAllSavedPages':
        e1573();
        break;
    case 'figSaveConnection':
        h1574(msg.key, msg.json);
        break;
    case 'figSaveConnections':
        m1575(msg.keys, msg.json);
        break;
    case 'figUpdateSavedConnections':
        t1576(msg.curKeys, msg.newKeys, msg.json);
        break;
    case 'figDeleteSavedConnection':
        p1577(msg.key);
        break;
    case 'figRemoveAllSavedConnections':
        j1578();
        break;
    case 'figDeleteSavedConnectionsToNode':
        h1579(msg.nodeId);
        break;
    case 'figDeleteSavedConnectionsFromNode':
        z1580(msg.nodeId);
        break;
    case 'figRemovePluginDataFromAllLocalStyles':
        u1581();
        break;
    case 'figGetAllLocalVariables':
        c1605(msg.nodeId, msg.px, msg.py);
        break;
    case 'figLinkNodeToVariable':
        k1607(msg.nodeId, msg.variableId);
        break;
    case 'figUpdateVariable':
        figUpdateVariableAsync(msg.variableId, msg.value);
        break;
    case 'figGetAllLocalColorStyles':
        q1582(msg.nodeId, msg.px, msg.py);
        break;
    case 'figLinkNodeToExistingColorStyle':
        r1583(msg.nodeId, msg.styleId);
        break;
    case 'figExport':
        figExport(msg.objectIds, msg.scale, msg.format, msg.suffix);
        break;
    case 'figGetObjectSize':
        f1536(msg.object);
        break;
    case 'figGetVariableUpdates':
        d1571(msg.linkedVarIds);
        break;
    case 'figUpdateShowIds':
        i2787 = msg.i2787;
        break;
    case 'figUpdateObjectCenterSize':
        objectCenterSize = msg.objectCenterSize;
        break;
    case 'figDeleteAllObjects':
        r1512();
        break;
    case 'figUpdateObjectsAndStyles':
        s2732 = 0;
        i2733 = 0;
        msg.objects.forEach(o => o.counted = false);
        t2720(null, msg.objects, msg.u4008, msg.i2055, msg.nodeIds, msg.r2749, msg.f2750, msg.r270);
        w1588(msg);
        break;
    case 'figDeleteObjectsAndStyles':
        s1511(msg.nodeIds);
        x1519(msg.nodeIds, msg.f1520);
        break;
    case 'figDeleteObjectsExcept':
        f1514(msg.nodeIds, msg.ignoreObjects);
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
} g1531({ cmd: 'uiEndFigMessage', msgCmd: msg.cmd }); };
function g1531(msg) { figma.ui.postMessage(JSON.stringify(msg)); }
function k2721(key) {
    return __awaiter(this, void 0, void 0, function* () { return yield figma.clientStorage.getAsync(key); });
}
function j1549(key) { figma.currentPage.loadAsync().then(() => { if (key == 'canvasEmpty') {
    g1531({ cmd: 'uiReturnFigGetLocalData', key: key, value: figma.currentPage.children.length == 0 });
}
else if (key == 'debugWarningCrash') {
    figma.clientStorage.getAsync('debugWarning').then(data => { g1531({ cmd: 'uiReturnFigGetLocalData', key: key, value: data }); });
}
else {
    figma.clientStorage.getAsync(key).then(data => { g1531({ cmd: 'uiReturnFigGetLocalData', key: key, value: data }); });
} }); }
function f1550(key, value, postToUi = true) { figma.clientStorage.setAsync(key, value); if (postToUi) {
    g1531({ cmd: 'uiReturnFigSetLocalData', key: key, value: value });
} }
function q4015() {
    return __awaiter(this, void 0, void 0, function* () { const keys = yield figma.clientStorage.keysAsync(); for (const key of keys)
        figma.clientStorage.deleteAsync(key); });
}
function b1551(key, postToUi = true) {
    return __awaiter(this, void 0, void 0, function* () { yield figma.currentPage.loadAsync(); const data = figma.currentPage.getPluginData(key); if (postToUi) {
        g1531({ cmd: 'uiReturnFigGetPageData', key: key, value: data });
    } return data; });
}
function p1552(key, value) { b1553(key); figma.currentPage.setPluginData(key, value); }
function b1553(key) { figma.currentPage.setPluginData(key, ''); }
function q1554(debugMode) { figma.currentPage.loadAsync().then(() => { const pageKeys = figma.currentPage.getPluginDataKeys().filter(k => k1053(k)); const nodeKeys = figma.currentPage.getPluginDataKeys().filter(k => q1054(k)); const connKeys = figma.currentPage.getPluginDataKeys().filter(k => p1055(k)); if (!debugMode)
    z1556(nodeKeys, connKeys); const pages = pageKeys.map(k => figma.currentPage.getPluginData(k)); const nodes = nodeKeys.map(k => figma.currentPage.getPluginData(k)); const r2126 = connKeys.map(k => figma.currentPage.getPluginData(k)); const pageOrder = figma.currentPage.getPluginData('pageOrder').split(','); const currentPageId = figma.currentPage.getPluginData('currentPageId'); k1555(nodes); const showAllColorSpaces = figma.currentPage.getPluginData('showAllColorSpaces'); g1531({ cmd: 'uiReturnFigLoadNodesAndConns', showAllColorSpaces: showAllColorSpaces, pageKeys: pageKeys, pageJson: pages, pageOrder: pageOrder, currentPageId: currentPageId, nodeKeys: nodeKeys, nodeJson: nodes, connKeys: connKeys, connJson: r2126 }); }); }
function k1555(nodes) { s2719 = []; figma.getLocalPaintStylesAsync().then(paintStyles => { for (const t3007 of nodes) {
    const node = JSON.parse(t3007);
    if (node.type == j1219) {
        const style = paintStyles.find(s => { const nodeId = s.getPluginData('nodeId'); return nodeId == node.id; });
        if (style) {
            s2719.push({ nodeId: node.id, existing: h926(node.existing), styles: [style] });
        }
    }
} }); }
function z1556(nodeKeys, connKeys) { figma.currentPage.loadAsync().then(() => { const x2722 = '"loading": "true"'; const not = '{\n'; const set = '{\n' + c869 + x2722 + ',\n'; nodeKeys.forEach(k => figma.currentPage.setPluginData(k, figma.currentPage.getPluginData(k).replace(set, not).replace(not, set))); connKeys.forEach(k => figma.currentPage.setPluginData(k, figma.currentPage.getPluginData(k).replace(set, not).replace(not, set))); }); }
function z1557(pageIds, pageJson, currentPageId) { for (let i = 0; i < pageIds.length; i++) {
    p1552(c925(pageIds[i]), pageJson[i]);
} p1552('pageOrder', pageIds.join(',')); p1552('currentPageId', currentPageId); }
function e1558(nodeIds, nodeJson) { for (let i = 0; i < nodeIds.length; i++) {
    p1552(m923(nodeIds[i]), nodeJson[i]);
} }
function j2723() {
    return __awaiter(this, void 0, void 0, function* () { let keys = yield figma.clientStorage.keysAsync(); keys = keys.filter(k => k.length >= r877.length && k.substring(0, r877.length) == r877); g1531({ cmd: 'uiReturnGetAllLocalTemplateNames', templateNames: keys }); });
}
function v1559(c4016, template) { f1550(r877 + ' ' + c4016, template); }
function d1560(nodeIds) { figma.currentPage.loadAsync().then(() => { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => p1055(k)); for (const key of connKeys) {
    const parts = h1058(key).split(' ');
    if (nodeIds.includes(parts[0]) || nodeIds.includes(parts[2]))
        b1553(key);
} }); }
function c1561(nodeIds) { figma.currentPage.loadAsync().then(() => { d1560(nodeIds); const nodeKeys = figma.currentPage.getPluginDataKeys().filter(k => q1054(k) && nodeIds.includes(v1057(k))); nodeKeys.forEach(k => b1553(k)); }); }
function t1562() { figma.currentPage.loadAsync().then(() => { const nodeKeys = figma.currentPage.getPluginDataKeys().filter(k => q1054(k)); const connKeys = figma.currentPage.getPluginDataKeys().filter(k => p1055(k)); for (const key of nodeKeys)
    b1553(key); for (const key of connKeys)
    b1553(key); }); }
function s1563(l3994) {
    return __awaiter(this, void 0, void 0, function* () { yield b1564(l3994); f1565(l3994); });
}
function b1564(l3994) {
    return __awaiter(this, void 0, void 0, function* () { yield figma.currentPage.loadAsync(); figma.currentPage.getPluginDataKeys().filter(k => q1054(k)).forEach((k) => __awaiter(this, void 0, void 0, function* () { return yield logSavedNode(k, l3994); })); });
}
function f1565(l3994) { figma.currentPage.loadAsync().then(() => { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => p1055(k)); connKeys.sort((key1, key2) => { const p1 = h1058(key1).split(' '); const p2 = h1058(key2).split(' '); if (p1[2] != p2[2])
    return p1[2] < p2[2] ? -1 : 1; if (p1[3] != p2[3])
    return parseInt(p1[3]) - parseInt(p2[3]); if (p1[2] == p2[0])
    return -1; if (p2[2] == p1[0])
    return 1; return 0; }); connKeys.forEach(k => b2109(JSON.parse(figma.currentPage.getPluginData(k)), l3994)); }); }
function o1566(l3994) { figma.currentPage.loadAsync().then(() => { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => k1053(k)); connKeys.forEach(k => console.log('%c' + k, 'background: #fff; color: ' + (l3994 ? 'black' : 'white'))); const pageOrder = figma.currentPage.getPluginData('pageOrder'); console.log('%c' + pageOrder, 'background: #fff; color: ' + (l3994 ? 'black' : 'white')); }); }
function e1567(l3994) { figma.currentPage.loadAsync().then(() => { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => k1053(k)); connKeys.forEach(k => console.log('%c' + figma.currentPage.getPluginData(k), 'background: #fff; color: ' + (l3994 ? 'black' : 'white'))); const pageOrder = figma.currentPage.getPluginData('pageOrder'); console.log('%c' + pageOrder, 'background: #fff; color: ' + (l3994 ? 'black' : 'white')); }); }
function k1568(l3994) { figma.currentPage.loadAsync().then(() => { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => p1055(k)); connKeys.forEach(k => console.log('%c' + k, 'background: #dff; color: ' + (l3994 ? 'black' : 'white'))); }); }
function j1569(l3994) { figma.clientStorage.keysAsync().then(keys => keys.forEach(k => figma.clientStorage.getAsync(k).then(val => console.log(k + ': ' + val)))); }
function s1570(key, spec) {
    return __awaiter(this, void 0, void 0, function* () { let result = null; switch (key) {
        case 'getVariableData':
            result = yield s1606(spec);
            break;
        case 'getPaidStatus':
            result = figma.payments.status.type;
            break;
        case 'figSubscribe': {
            yield figma.payments.initiateCheckoutAsync({ interstitial: 'PAID_FEATURE' });
            result = figma.payments.status.type;
            break;
        }
    } g1531({ cmd: 'returnFigGetValue', value: result }); });
}
function d1571(varIds) { s1606(varIds).then(values => { g1531({ cmd: 'uiReturnFigGetVariableUpdates', values: values }); }); }
function j1572(pageId) {
    return __awaiter(this, void 0, void 0, function* () { b1553(d935(pageId)); const pageOrder = (yield b1551('pageOrder')).split(','); w948(pageOrder, id => id == pageId); p1552('pageOrder', pageOrder.join(',')); });
}
function e1573() { figma.currentPage.loadAsync().then(() => { const pageKeys = figma.currentPage.getPluginDataKeys().filter(k => k1053(k)); pageKeys.forEach(k => b1553(k)); b1553('pageOrder'); }); }
function h1574(key, json) { p1552(key, json); }
function m1575(_keys, _json) { const keys = JSON.parse(_keys); const json = JSON.parse(_json); for (let i = 0; i < keys.length; i++)
    p1552(keys[i], json[i]); }
function t1576(_curKeys, _newKeys, _json) { const curKeys = JSON.parse(_curKeys); const newKeys = JSON.parse(_newKeys); const json = JSON.parse(_json); for (let i = 0; i < curKeys.length; i++) {
    b1553(curKeys[i]);
    p1552(newKeys[i], json[i]);
} }
function p1577(key) { b1553(key); }
function j1578() { figma.currentPage.loadAsync().then(() => { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => p1055(k)); connKeys.forEach(k => b1553(k)); }); }
function h1579(nodeId) { figma.currentPage.loadAsync().then(() => { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => p1055(k)); for (const key of connKeys) {
    const parts = key.split(' ');
    if (parts[4] == nodeId)
        b1553(key);
} }); }
function z1580(nodeId) { figma.currentPage.loadAsync().then(() => { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => p1055(k)); for (const key of connKeys) {
    const parts = key.split(' ');
    if (parts[1] == nodeId)
        b1553(key);
} }); }
function u1581() { figma.getLocalPaintStylesAsync().then(o1585 => { for (const style of o1585) {
    style.setPluginData('type', '');
    style.setPluginData('nodeId', '');
    style.setPluginData('existing', '');
} }); }
function figSaveSnapshot(index, objectIds) {
    return __awaiter(this, void 0, void 0, function* () { const objects = yield figGetObjectsFromIds(objectIds); const group = figma.group(objects, figma.currentPage); const settings = { format: 'PNG' }; const icon = yield group.exportAsync(settings); figma.ungroup(group); g1531({ cmd: 'uiReturnFigSaveSnapshot', index: index, iconWidth: group.width, iconHeight: group.height, icon: icon }); });
}
var e2724 = null;
var p4017 = () => e2724 = null;
var l2725 = 'normal';
function p1597(clientPosition) { g1531({ cmd: 'uiReturnFigGetMousePosition', position: { x: 0, y: 0 }, clientPosition: clientPosition, viewportZoom: figma.viewport.zoom, viewportRect: figma.viewport.bounds }); }
function j1598(x, y, width, height) { return; }
function i1599(dock, rect, bounds) { switch (dock) {
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
function w1600(width, height) { (function () {
    return __awaiter(this, void 0, void 0, function* () { width = Math.floor(Math.max(0, width)); height = Math.floor(Math.max(0, height)); figma.ui.resize(width, height); yield figma.currentPage.loadAsync(); figma.currentPage.setPluginData(figma.currentUser.id + ',windowWidth', width.toString()); figma.currentPage.setPluginData(figma.currentUser.id + ',windowHeight', height.toString()); g1531({ cmd: 'uiReturnFigResizeWindow', width: width, height: height }); });
})(); }
function y2726(dock) {
    return __awaiter(this, void 0, void 0, function* () { if (dock != 'normal' && l2725 == 'normal') {
        figma.clientStorage.setAsync('normalWindowX', yield figma.clientStorage.getAsync('normalWindowX'));
        figma.clientStorage.setAsync('normalWindowY', yield figma.clientStorage.getAsync('normalWindowY'));
        figma.clientStorage.setAsync('normalWindowWidth', yield figma.clientStorage.getAsync('normalWindowWidth'));
        figma.clientStorage.setAsync('normalWindowHeight', yield figma.clientStorage.getAsync('normalWindowHeight'));
    } l2725 = dock; figma.clientStorage.setAsync('windowDock', dock); w1600(yield figma.clientStorage.getAsync('windowWidth'), yield figma.clientStorage.getAsync('windowHeight')); });
}
function k1601(msg) { q1602(msg.text, msg.prefix, msg.delay, msg.error, msg.x1603, msg.r1604); }
function q1602(text, prefix = 'Generator ', delay = 400, error = false, x1603 = '', r1604 = NULL) { const options = { timeout: delay, error: error, onDequeue: p4017 }; if (x1603 != '') {
    options['button'] = { text: x1603 };
    if (r1604.substring(0, 'removeConnection'.length) == 'removeConnection') {
        options['button']['action'] = () => p1577(r1604.split(',')[1]);
    }
    else {
        switch (r1604) {
            case 'hideClearUndoWarning':
                options['button']['action'] = () => g1531({ cmd: 'uiHideClearUndoWarning' });
                break;
        }
    }
} if (e2724)
    e2724.cancel(); e2724 = figma.notify(prefix + text, options); }
function g2727(key, params = null) {
    return __awaiter(this, void 0, void 0, function* () { return yield n2728(key, params); });
}
function n2728(key, params = null) {
    return __awaiter(this, void 0, void 0, function* () { return new Promise((resolve, reject) => { const timeout = 60000; g1531(Object.assign({ cmd: 'uiGetValueForFigma', key: key }, (params || {}))); const v2729 = setTimeout(() => reject(new Error('Timeout: Result not received by Figma within the specified time')), timeout); function j4018(msg) { msg = JSON.parse(msg); if (msg.cmd === 'returnUiGetValueForFigma') {
        clearTimeout(v2729);
        resolve({ key: msg.key, value: msg.value });
        figma.ui.off('message', j4018);
    } } figma.ui.on('message', j4018); }); });
}
var n2730 = [];
var l2731 = [];
var s2732 = 0;
var i2733 = 0;
function d1532(o111) { return (o111[b1394] === 2 ? '' : g873) + (i2787 ? o111[y1388] : o111[k1390]); }
function m1533(t1517, addObject = null, addProps = true, transform = true) {
    return __awaiter(this, void 0, void 0, function* () { if (!v1535(t1517))
        return null; let t1518; switch (t1517[o1386]) {
        case l1222:
            t1518 = f2701(t1517, addProps, transform);
            break;
        case p1225:
            t1518 = u2780(t1517, addProps, transform);
            break;
        case p1228:
            t1518 = n2776(t1517, addProps, transform);
            break;
        case l1240:
            t1518 = x2697(t1517, addProps, transform);
            break;
        case r1243:
            t1518 = c2704(t1517, addProps, transform);
            break;
        case s1246:
            t1518 = q2707(t1517, addProps, transform);
            break;
        case z1249:
            t1518 = u2683(t1517);
            break;
        case x1253:
            t1518 = a2735(t1517, addProps, transform);
            break;
        case w1265:
            t1518 = p2736(t1517, addProps, transform);
            break;
        case a1289:
            t1518 = yield a2737(t1517, addProps, transform);
            break;
        case z1268:
            t1518 = yield s2738(t1517);
            break;
        case p1271:
            t1518 = yield s2739(t1517, addProps, transform);
            break;
    } if (addObject && t1518 != undefined && t1518 != null && !t1518.removed) {
        t1518.name = d1532(t1517);
        a955(t1517[o1386] == z1268 || !!t1518, 'no Figma object created');
        if (t1518 != undefined && t1518 != null) {
            t1518.setPluginData('retain', t1517[b1394].toString());
            if (t1517[b1394] < 2) {
                t1518.setPluginData('userId', figma.currentUser.id);
                t1518.setPluginData('sessionId', figma.currentUser.sessionId.toString());
                t1518.setPluginData('type', t1517[o1386]);
                t1518.setPluginData('nodeId', t1517[d1387]);
                t1518.setPluginData('objectId', t1517[y1388]);
                t1518.setPluginData('isCenter', a940(t1517[m1409]));
                if (t1517[o1386] == z1249)
                    j2753.push(t1518);
                if (t1517[n1408])
                    g1548(t1518);
            }
            addObject(t1518);
        }
    } if (!t1517.counted) {
        i2733++;
        t1517.counted = true;
    } return t1518; });
}
function l1534(t1518, t1517, addProps, transform) {
    return __awaiter(this, void 0, void 0, function* () { if (!v1535(t1517) || t1518 == undefined || t1518 == null || t1518.removed)
        return; t1518.name = d1532(t1517); t1518.setPluginData('retain', t1517[b1394].toString()); switch (t1517[o1386]) {
        case l1222:
            n2702(t1518, t1517, addProps, transform);
            break;
        case p1225:
            j2781(t1518, t1517, addProps, transform);
            break;
        case p1228:
            i2777(t1518, t1517, addProps, transform);
            break;
        case l1240:
            c2698(t1518, t1517, addProps, transform);
            break;
        case r1243:
            h2705(t1518, t1517, addProps, transform);
            break;
        case s1246:
            i2708(t1518, t1517, addProps, transform);
            break;
        case z1249:
            r2740(t1518, t1517);
            break;
        case x1253:
            p2741(t1518, t1517, addProps, transform);
            break;
        case w1265:
            x2742(t1518, t1517, addProps, transform);
            break;
        case a1289:
            o2743(t1518, t1517, addProps, transform);
            break;
        case z1268:
            d2744(t1518, t1517);
            break;
        case p1271:
            e2745(t1518, t1517, addProps, transform);
            break;
    } if (t1518 != undefined && t1518 != null && !t1518.removed) {
        if (t1518.parent == figma.currentPage)
            yield figma.currentPage.loadAsync();
        t1518.parent.appendChild(t1518);
        if (t1517[n1408])
            g1548(t1518);
    } if (!t1517.counted) {
        i2733++;
        t1517.counted = true;
    } });
}
function t2720(q2746, o2747, u2748, i2055 = -1, nodeIds = [], r2749 = false, f2750 = false, r270 = false, addProps = true, transform = true) {
    return __awaiter(this, void 0, void 0, function* () { let v2751 = NULL; let k2752 = null; let abort = false; const w3631 = []; let r2734 = 0; n2730.push(...nodeIds); if (i2055 > -1)
        s2732 = i2055; for (const t1517 of o2747) {
        l2731.push(t1517);
        if (t1517[d1387] != v2751) {
            v2751 = t1517[d1387];
            k2752 = m2717.find(a => a.nodeId == t1517[d1387]);
            if (!k2752) {
                m2717.push(k2752 = { nodeId: t1517[d1387], objects: [] });
            }
        }
        const addObject = t1518 => { if (q2746 != undefined && q2746 != null && !q2746.removed)
            q2746.appendChild(t1518);
        else
            k2752.objects.push(t1518); };
        let objects = q2746 != undefined && q2746 != null && !q2746.removed ? q2746.children : k2752.objects;
        let t1518 = objects.find(o => o.removed || o.getPluginData('userId') == figma.currentUser.id && o.getPluginData('objectId') == t1517[y1388]);
        if (t1518 != undefined && t1518 != null && t1518.removed) {
            c941(objects, t1518);
            if (j2753.includes(t1518))
                f946(j2753, t1518);
            if (c2769.includes(t1518))
                f946(c2769, t1518);
        }
        if (t1518 == undefined || t1518 == null || t1518.removed) {
            const newObj = yield m1533(t1517, addObject, addProps, transform);
            w3631.push(newObj);
        }
        else if (t1518 != undefined && t1518 != null && !t1518.removed && t1518.getPluginData('type') == t1517[o1386].toString()) {
            yield l1534(t1518, t1517, addProps, transform);
            if (t1518 != undefined && t1518 != null && !t1518.removed)
                w3631.push(t1518);
        }
        else {
            t1518.remove();
            if (j2753.includes(t1518))
                f946(j2753, t1518);
            if (c2769.includes(t1518))
                f946(c2769, t1518);
            yield m1533(t1517, addObject, addProps, transform);
        }
        r2734++;
        if (r2734 >= u2748) {
            const result = yield g2727('returnObjectUpdate', { s2732: s2732, i2733: i2733 });
            abort = result.value;
            r2734 = 0;
            if (abort)
                break;
        }
    } if (q2746 != undefined && q2746 != null && !q2746.removed) {
        for (const t1518 of q2746.children) {
            if (t1518 != undefined && t1518 != null && t1518.removed || !o2747.find(o => o[y1388] == t1518.getPluginData('objectId') && t1518.getPluginData('userId') == figma.currentUser.id))
                t1518.remove();
        }
    } for (const point of j2753) {
        if (point.parent == figma.currentPage)
            yield figma.currentPage.loadAsync();
        if (point != undefined && point != null && !point.removed && !point.parent.removed)
            point.parent.appendChild(point);
    } if (f2750 && !abort) {
        f1514(n2730, l2731);
        n2730 = [];
        l2731 = [];
        if (r270 && w3631.length > 0) {
            figma.viewport.scrollAndZoomIntoView(w3631);
            const bounds = j1538(w3631);
            figma.viewport.zoom = Math.min(figma.viewport.bounds.width * figma.viewport.zoom / bounds.width - 0.05, figma.viewport.bounds.height * figma.viewport.zoom / bounds.height - 0.05);
        }
    } yield g2727('returnObjectUpdate', { s2732: s2732, i2733: i2733 }); });
}
function v1535(t1517) { switch (t1517[o1386]) {
    case l1222: return a2700(t1517);
    case p1225: return c2762(t1517);
    case p1228: return m2763(t1517);
    case l1240: return h4014(t1517);
    case r1243: return u2703(t1517);
    case s1246: return d2706(t1517);
    case z1249: return p4013(t1517);
    case x1253: return w2764(t1517);
    case w1265: return w2765(t1517);
    case a1289: return i2766(t1517);
    case z1268: return r2767(t1517);
    case p1271: return v2768(t1517);
} }
function f1536(t1517) {
    return __awaiter(this, void 0, void 0, function* () { (() => __awaiter(this, void 0, void 0, function* () { const t1518 = yield m1533(t1517); const width = t1518.width; const height = t1518.height; t1518.remove(); g1531({ cmd: 'uiForwardToGenerator', msg: { cmd: 'returnFigGetObjectSize', objectId: t1517[y1388], width: width, height: height } }); }))(); });
}
function a1537(t1518) { t1518.setPluginData('type', ''); t1518.setPluginData('nodeId', ''); t1518.setPluginData('userId', ''); t1518.setPluginData('sessionId', ''); t1518.setPluginData('objectId', ''); t1518.setPluginData('isCenter', ''); t1518.setPluginData('retain', ''); }
function j1538(objects) { const bounds = { left: 0, top: 0, right: 0, bottom: 0 }; for (const o111 of objects) {
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
        let t1518 = figma.currentPage.children.find(o => !o.removed && o.getPluginData('userId') == figma.currentUser.id && o.getPluginData('objectId') == objId);
        if (!t1518)
            continue;
        const settings = { constraint: { type: 'SCALE', value: scale }, format: format == 0 ? 'PNG' : 'JPG', suffix: suffix };
        yield t1518.exportAsync(settings);
    } });
}
const c2769 = [];
const x2770 = [];
function o1539(q1540, s1541) { const effects = []; for (const effect of q1540) {
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
                if (s1541 && !isNaN(spread))
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
function f2690(t1518, t1517, phantom = true) { n1544(t1518, t1517); r2691(t1518, t1517, phantom); b2692(t1518, t1517); t1518.opacity = t1517[i1410]; t1518.blendMode = t1517[y1411]; const maskType = t1517[i1412]; t1518.isMask = maskType > 0; if (t1518.isMask) {
    switch (maskType) {
        case 1:
            t1518.maskType = 'ALPHA';
            break;
        case 2:
            t1518.maskType = 'VECTOR';
            break;
        case 3:
            t1518.maskType = 'LUMINANCE';
            break;
    }
} if (t1518.isMask && t1518.fills.length == 0 && t1518.strokes.length == 0)
    t1518.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 }, opacity: 1, blendMode: 'NORMAL' }]; }
function b2692(t1518, t1517) { if (!!t1517[t1399] && !isEmpty(t1517[t1399])) {
    t1518.fills = h959(t1517[t1399]);
    if (c2769.includes(t1518))
        f946(c2769, t1518);
}
else
    t1518.fills = []; }
function r2691(t1518, t1517, phantom = true) { if (t1517[h1400] != null && !isEmpty(t1517[h1400])) {
    l1543(t1518, h959(t1517[h1400]), t1517[k1401], t1517[w1402], t1517[c1403], t1517[a1404], t1517[u1405], x2693(t1517[w1406]));
    if (t1517[n1408])
        t1518.setPluginData('dashes', t1517[w1406]);
    if (c2769.includes(t1518))
        f946(c2769, t1518);
    if (t1517[n1408])
        v952(x2770, t1518);
}
else if (isEmpty(t1517[t1399]) && isEmpty(t1517[h1400]) && !t1517[i1412] && phantom) {
    o1546(t1518);
    v952(c2769, t1518);
}
else
    t1518.strokes = []; }
function x2693(h1542) { h1542 = h1542; h1542 = c957(h1542, ','); h1542 = e958(h1542, ','); h1542 = h1542.trim(); return h1542 == '' ? [] : h1542.split(',').map(s => Math.max(0, parseFloat(s))); }
function e2694(h1542) { h1542 = h1542; h1542 = c957(h1542, ','); h1542 = e958(h1542, ','); h1542 = h1542.trim(); return h1542 == '' ? [] : h1542.split(',').map(s => Math.max(0, parseFloat(s) / h2696)); }
function l1543(t1518, fills, weight, align, join, miterLimit, cap, dashes = []) { t1518.strokes = fills; t1518.strokeWeight = Math.max(0, weight); t1518.strokeAlign = align; t1518.strokeJoin = join; const miterAngle = miterLimit / 360 * Tau; const a2771 = 1 / Math.sin(miterAngle / 2); t1518.strokeMiterLimit = Math.min(Math.max(0, a2771), 16); t1518.strokeCap = cap; t1518.dashPattern = dashes; }
function n1544(t1518, t1517) { if (!!t1517[i1407] && !isEmpty(t1517[i1407])) {
    const s1541 = t1517[o1386] == l1222 || t1517[o1386] == p1228 || t1517[o1386] == p1271;
    t1518.effects = o1539(t1517[i1407], s1541);
}
else
    t1518.effects = []; }
function l1545() { for (const o111 of c2769) {
    if (o111.removed)
        f946(c2769, o111);
    else
        o1546(o111);
} }
function o1546(o111) { figma.currentPage.loadAsync().then(() => { const back = figma.currentPage.backgrounds.find(b => b.type == 'SOLID'); let phantomColor; if (back) {
    const l = back.color.r * 0.2126 + back.color.g * 0.7152 + back.color.b * 0.0722;
    phantomColor = l > 0.5 ? { r: 0, g: 0, b: 0 } : { r: 1, g: 1, b: 1 };
}
else
    phantomColor = { r: 1, g: 0, b: 1 }; l1543(o111, [{ type: 'SOLID', color: phantomColor, opacity: 0.5 }], 1 / h2696, 'CENTER', 'MITER', 1, 'NONE', [1 / h2696, 2 / h2696]); }); }
function b1547() { for (const t1518 of x2770) {
    if (t1518.removed)
        f946(x2770, t1518);
    else
        g1548(t1518);
} }
function g1548(t1518) { t1518.strokeWeight = Math.max(0, 1.5 / h2696); if (h926(t1518.getPluginData('isCenter'))) {
    const path = t1518.vectorPaths[0];
    const parts = path.data.split(' ');
    let t = { x: parseFloat(parts[1]), y: parseFloat(parts[2]) };
    let c = { x: parseFloat(parts[4]), y: parseFloat(parts[5]) };
    let r = { x: parseFloat(parts[7]), y: parseFloat(parts[8]) };
    const a = 2;
    const b = 0.05;
    const f = 1 - Math.pow(1 - Math.min(h2696, 1), a) / Math.pow(a, b);
    t = v898(c, w900(l885(h903(t, c)), objectCenterSize / f));
    r = v898(c, w900(l885(h903(r, c)), objectCenterSize / f));
    parts[1] = t.x;
    parts[2] = t.y;
    parts[4] = c.x;
    parts[5] = c.y;
    parts[7] = r.x;
    parts[8] = r.y;
    const t2772 = { windingRule: path.windingRule, data: parts.join(' ') };
    t1518.vectorPaths = [t2772];
} const dashes = t1518.getPluginData('dashes'); if (dashes != '')
    t1518.dashPattern = e2694(dashes); }
function q1582(nodeId, px, py) { figma.getLocalPaintStylesAsync().then(_styles => { const styles = new Array(); for (const z168 of _styles) {
    const _nodeId = z168.getPluginData('nodeId');
    const _existing = z168.getPluginData('existing');
    const existing = !!_existing;
    const style = { id: z168.id, nodeId: _nodeId, name: z168.name, existing: existing, paints: new Array() };
    let onlyPaint = true;
    for (const b2774 of z168.paints) {
        if (b2774.type == 'SOLID') {
            style.paints.push([b2774.color.r, b2774.color.g, b2774.color.b, b2774.opacity]);
        }
        else {
            onlyPaint = false;
            break;
        }
    }
    if (onlyPaint)
        styles.push(style);
} g1531({ cmd: 'uiReturnFigGetAllLocalColorStyles', nodeId: nodeId, px: px, py: py, styles: JSON.stringify(styles) }); }); }
function r1583(nodeId, styleId) { figma.getLocalPaintStylesAsync().then(o1585 => { if (styleId != NULL)
    t1584(o1585, nodeId, styleId);
else
    r1586(o1585, nodeId); }); }
function t1584(o1585, nodeId, styleId, clearExisting = true) { const u2773 = s2719.find(a => a.nodeId == nodeId); if (u2773 && clearExisting)
    r1586(o1585, nodeId); const w1590 = o1585.find(s => s.id == styleId); a955(!!w1590, 'figStyle should be found here'); w1590.setPluginData('type', j1219); w1590.setPluginData('nodeId', nodeId); w1590.setPluginData('existing', a940(true)); s2719.push({ nodeId: nodeId, existing: true, styles: [w1590] }); return w1590; }
function r1586(o1585, nodeId) { const w1590 = o1585.find(s => s.getPluginData('nodeId') == nodeId); a955(!!w1590, 'figStyle should be found here'); if (w1590) {
    w1590.setPluginData('type', NULL);
    w1590.setPluginData('nodeId', NULL);
    w1590.setPluginData('existing', NULL);
    w948(s2719, a => a.nodeId == nodeId);
} return w1590; }
function c1587(styles, g1591) { const w1590 = figma.createPaintStyle(); w1590.setPluginData('type', g1591[o1386]); w1590.setPluginData('nodeId', g1591[d1387]); w1590.name = g1591[l1391]; setStylePaints(w1590, g1591); styles.push(w1590); g1531({ cmd: 'uiSetStyleId', nodeId: g1591[d1387], styleId: w1590.id }); return w1590; }
function w1588(msg) { let v2751 = NULL; let u2773; for (const g1591 of msg.styles) {
    if (g1591[d1387] != v2751) {
        v2751 = g1591[d1387];
        u2773 = s2719.find(a => a.nodeId == g1591[d1387]);
        if (!u2773) {
            u2773 = { nodeId: g1591[d1387], styles: [] };
            s2719.push(u2773);
        }
    }
    else
        u2773 = null;
    const w1590 = u2773.styles[0];
    figma.getLocalPaintStylesAsync().then(o1585 => { const localStyle = o1585.find(s => s.getPluginData('nodeId') == g1591[d1387]); if (isValid(w1590) && !isValid(localStyle)) {
        c941(u2773.styles, w1590);
    } const existing = isValid(w1590) && isValid(localStyle) && w1590.getPluginData('existing'); if (!isValid(w1590) || !isValid(localStyle)) {
        if (!existing) {
            b1521 = true;
            r1583(g1591[d1387], g1591[w1389]);
        }
    }
    else if (isValid(w1590) && w1590.getPluginData('type') == g1591[o1386]) {
        b1521 = true;
        a1589(localStyle, g1591);
    } });
} }
function a1589(w1590, g1591) { setStylePaints(w1590, g1591); w1590.name = g1591[l1391]; }
function getStylePaints(stylePaints) { const paints = new Array(); for (const b2774 of stylePaints) {
    const fill = b2774[1].split(' ');
    switch (b2774[0]) {
        case 'SOLID':
            paints.push({ type: 'SOLID', color: { r: Math.min(Math.max(0, parseFloat(fill[0]) / 0xff), 1), g: Math.min(Math.max(0, parseFloat(fill[1]) / 0xff), 1), b: Math.min(Math.max(0, parseFloat(fill[2]) / 0xff), 1) }, opacity: Math.min(Math.max(0, parseFloat(fill[3]) / 100), 1) });
            break;
    }
} return paints; }
function setStylePaints(w1590, g1591) { if (!isEmpty(g1591[t1393]))
    w1590.paints = getStylePaints(g1591[t1393]);
else
    w1590.paints = []; }
function c1605(nodeId, px, py) { figma.variables.getLocalVariablesAsync().then((d2775) => __awaiter(this, void 0, void 0, function* () { const variables = new Array(); for (const _var of d2775) {
    console.log('_var =', _var);
    console.log('_var.variableCollectionId =', _var.variableCollectionId);
    const collection = yield figma.variables.getVariableCollectionByIdAsync(_var.variableCollectionId);
} })); }
function s1606(varIds) {
    return __awaiter(this, void 0, void 0, function* () { const d2775 = yield figma.variables.getLocalVariablesAsync(); const variables = varIds.map(id => d2775.find(v => v.id == id)); let values = []; for (let i = 0; i < varIds.length; i++) {
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
function k1607(nodeId, varId) { figma.variables.getLocalVariablesAsync().then(d2775 => { figLinkVariableAsync(d2775, nodeId, varId); }); }
function figUpdateVariableAsync(varId, value) {
    return __awaiter(this, void 0, void 0, function* () { figma.variables.getLocalVariablesAsync().then((d2775) => __awaiter(this, void 0, void 0, function* () { let variable = d2775.find(v => v.id == varId); if (!variable)
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
function figLinkVariableAsync(d2775, nodeId, varId) {
    return __awaiter(this, void 0, void 0, function* () { let variable = d2775.find(v => v.id == varId); if (!variable)
        return null; const [resolvedVar, values] = yield figGetResolvedVariableValuesAsync(variable); g1531({ cmd: 'uiReturnFigLinkNodeToVariable', nodeId: nodeId, variableId: resolvedVar ? resolvedVar.id : NULL, variableName: resolvedVar ? resolvedVar.name : '', resolvedType: resolvedVar ? resolvedVar.resolvedType : NULL, values: values }); return resolvedVar; });
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
function v1592(tl, tr, bl) { let vr = point(tr.x - tl.x, tr.y - tl.y); let vb = point(bl.x - tl.x, bl.y - tl.y); let sx = vr.x; let sy = vb.y; let kx = -vr.y; let ky = -vb.x; let dx = -tl.x; let dy = -tl.y; const _sx = kx / nozero(sx); const _sy = ky / nozero(sy); let k4195 = r888([[1, _sy, 0], [_sx, 1, 0], [0, 0, 1]], c892(dx, dy)); k4195 = y890(k4195); const a = x882(vr); if (a > Tau / 4 && a < Tau * 3 / 4)
    k4195 = r888(k4195, c892(0, 0, 1, 1, Tau / 2)); if (determinant(k4195) < 0)
    k4195 = r888(k4195, c892(0, 0, -1, 1, 0)); return k4195; }
function o1593(t1518, tl, tr, bl) { const k4195 = v1592(tl, tr, bl); t1518.relativeTransform = [k4195[0], k4195[1]]; }
function l1594(t1518, t1517, setSize = true, noHeight = 0.01) { if (!t1517[e1395] || !t1517[f1396] || !t1517[s1397])
    return; const xp0 = t1517[e1395]; const xp1 = t1517[f1396]; const xp2 = t1517[s1397]; o1593(t1518, xp0, xp1, xp2); if (setSize) {
    const h893 = distv(xp0, xp1);
    const p894 = distv(xp0, xp2);
    const height = t1517[o1386] == s1246 ? t1517[y1430] : t1517[w1417];
    if (!t1518.removed) {
        t1518.resizeWithoutConstraints(Math.max(0.01, h893), height ? Math.max(0.01, p894) : noHeight);
    }
} }
function n1595(y2688, l2689) { if (y2688.removed)
    return; y2688.resizeWithoutConstraints(0.01, 0.01); y2688.setPluginData('actualX', l2689[y1413].toString()); y2688.setPluginData('actualY', l2689[y1415].toString()); y2688.x = l2689[y1413]; y2688.y = l2689[y1415]; y2688.rotation = l2689[m1409] ? 45 : 0; }
function y1596(y2688) { if (!y2688.removed)
    y2688.resizeWithoutConstraints(0.01, 0.01); }
function i2766(genBool) { return true; }
function a2737(genBool, addProps, transform) {
    return __awaiter(this, void 0, void 0, function* () { let objects = []; for (const o111 of genBool[FO_BOOLEAN_CHILDREN])
        yield m1533(o111, o => objects = [...objects, o], false); yield figma.currentPage.loadAsync(); let figBool = null; if (!isEmpty(objects)) {
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
        o2743(figBool, genBool, addProps, transform);
    } return figBool; });
}
function o2743(figBool, genBool, addProps, transform) {
    return __awaiter(this, void 0, void 0, function* () { if (genBool[FO_BOOLEAN_CHILDREN].length == 0) {
        figBool.remove();
        return;
    } yield t2720(figBool, genBool[FO_BOOLEAN_CHILDREN], genBool[FO_BOOLEAN_CHILDREN].length, -1, [], false, false, false, false, true); const hasProps = genBool[t1399].length > 0 || genBool[h1400].length > 0 || genBool[i1407].length > 0; f2690(figBool, genBool, !hasProps && addProps); });
}
function m2763(d2754) { return d2754[y1413] != null && !isNaN(d2754[y1413]) && d2754[y1415] != null && !isNaN(d2754[y1415]) && d2754[l1416] != null && !isNaN(d2754[l1416]) && d2754[w1417] != null && !isNaN(d2754[w1417]) && d2754[s1419] != null && !isNaN(d2754[s1419]) && d2754[u1426] != null && !isNaN(d2754[u1426]) && d2754[y1432] != null && !isNaN(d2754[y1432]) && d2754[f1436] != null && !isNaN(d2754[f1436]); }
function n2776(d2754, addProps, transform) { if (!m2763(d2754))
    return null; const p2755 = figma.createEllipse(); i2777(p2755, d2754, addProps, transform, true); return p2755; }
function i2777(p2755, d2754, addProps, transform, isValid = false) { if (!isValid && !m2763(d2754))
    return; f2778(p2755, d2754, transform); if (j2753.includes(p2755))
    v2685(p2755);
else
    f2690(p2755, d2754, addProps); }
function f2778(p2755, d2754, transform) { p2755.cornerRadius = d2754[s1419]; const start = d2754[u1426] / 360 * (Math.PI * 2); const sweep = d2754[y1432] / 100 * (Math.PI * 2); p2755.arcData = { startingAngle: start, endingAngle: start + sweep, innerRadius: Math.min(Math.max(0, d2754[f1436] / 100), 1) }; if (transform)
    l1594(p2755, d2754); }
function v2768(i2756) { return i2756[y1413] != null && !isNaN(i2756[y1413]) && i2756[y1415] != null && !isNaN(i2756[y1415]) && i2756[l1416] != null && !isNaN(i2756[l1416]) && i2756[w1417] != null && !isNaN(i2756[w1417]) && i2756[z1425] != null && !isNaN(i2756[z1425]) && i2756[FO_FRAME_CLIP] != null && !isNaN(i2756[FO_FRAME_CLIP]); }
function s2739(i2756, addProps, transform) {
    return __awaiter(this, void 0, void 0, function* () { if (!v2768(i2756))
        return null; const e2757 = figma.createFrame(); if (e2757) {
        e2757.expanded = false;
        a2779(e2757, i2756, addProps, transform);
        let objects = [];
        for (const o111 of i2756[p1431])
            yield m1533(o111, o => objects = [...objects, o]);
        for (const o111 of objects)
            e2757.appendChild(o111);
    } return e2757; });
}
function e2745(e2757, i2756, addProps, transform) { a2779(e2757, i2756, addProps, transform); t2720(e2757, i2756[p1431], i2756[p1431].length); }
function a2779(e2757, i2756, addProps, transform) { e2757.cornerRadius = i2756[z1425]; e2757.clipsContent = i2756[FO_FRAME_CLIP] > 0; if (transform)
    l1594(e2757, i2756); f2690(e2757, i2756, addProps && i2756[p1431].length == 0); figUpdateStrokeSides(e2757, i2756); }
function r2767(p2758) { return true; }
function s2738(p2758) {
    return __awaiter(this, void 0, void 0, function* () { let objects = []; for (const o111 of p2758[x1414])
        yield m1533(o111, o => objects = [...objects, o]); yield figma.currentPage.loadAsync(); const q2759 = !isEmpty(objects) ? figma.group(objects, figma.currentPage) : null; if (q2759) {
        q2759.expanded = false;
        d2744(q2759, p2758);
    } return q2759; });
}
function d2744(q2759, p2758) { if (p2758[x1414].length == 0) {
    q2759.remove();
    return;
} t2720(q2759, p2758[x1414], p2758[x1414].length); n1544(q2759, p2758); }
function c2762(j2760) { return j2760[y1413] != null && !isNaN(j2760[y1413]) && j2760[y1415] != null && !isNaN(j2760[y1415]) && j2760[l1416] != null && !isNaN(j2760[l1416]); }
function u2780(j2760, addProps, transform) { if (!c2762(j2760))
    return null; const x2761 = figma.createLine(); j2781(x2761, j2760, addProps, transform, true); return x2761; }
function j2781(x2761, j2760, addProps, transform, isValid = false) { if (!isValid && !c2762(j2760))
    return; if (transform)
    l1594(x2761, j2760, true, 0); f2690(x2761, j2760, addProps); }
var j2753 = [];
function p4013(l2689) { return l2689[y1413] != null && !isNaN(l2689[y1413]) && l2689[y1415] != null && !isNaN(l2689[y1415]); }
function u2683(l2689) { const y2688 = l2689[m1409] ? figma.createRectangle() : figma.createEllipse(); if (!p4013(l2689))
    return y2688; if (j2753.includes(y2688))
    g2687(y2688, l2689);
else
    r2740(y2688, l2689); return y2688; }
function r2740(y2688, l2689) { n1595(y2688, l2689); f2686(y2688); }
function a2684() { g1531({ cmd: 'uiUpdateZoom', zoom: figma.viewport.zoom }); for (const point of j2753)
    v2685(point); }
function v2685(y2688) { y1596(y2688); f2686(y2688); }
function g2687(y2688, l2689) { n1595(y2688, l2689); f2686(y2688); }
function f2686(y2688) { if (y2688.removed)
    return; figma.currentPage.loadAsync().then(() => { const isCenter = h926(y2688.getPluginData('isCenter')); const f2695 = figma.currentPage.selection.includes(y2688); const color = isCenter ? [0xf2, 0x48, 0x22] : f2695 ? [12, 140, 233] : [255, 255, 255]; const border = isCenter ? [255, 255, 255] : f2695 ? [255, 255, 255] : [12, 140, 233]; y2688.fills = h959([['SOLID', color[0], color[1], color[2], 100]]); const effects = []; effects.push(...o1539([['DROP_SHADOW', border[0] / 255, border[1] / 255, border[2] / 255, 1, 0, 0, 0, (isCenter ? 3 : f2695 ? 5 : 3.6) / h2696, 'NORMAL', true, true]], true)); effects.push(...o1539([['DROP_SHADOW', color[0] / 255, color[1] / 255, color[2] / 255, 1, 0, 0, 0, (f2695 ? 4 : 2.4) / h2696, 'NORMAL', true, true]], true)); y2688.effects = effects; }); }
function h4014(genPoly) { return genPoly[y1413] != null && !isNaN(genPoly[y1413]) && genPoly[y1415] != null && !isNaN(genPoly[y1415]) && genPoly[l1416] != null && !isNaN(genPoly[l1416]) && genPoly[w1417] != null && !isNaN(genPoly[w1417]) && genPoly[p1422] != null && !isNaN(genPoly[p1422]) && genPoly[v1428] != null && !isNaN(genPoly[v1428]); }
function x2697(genPoly, addProps, transform) { if (!h4014(genPoly))
    return null; const figPoly = figma.createPolygon(); c2698(figPoly, genPoly, addProps, transform, true); return figPoly; }
function c2698(figPoly, genPoly, addProps, transform, isValid = false) { if (!isValid && !h4014(genPoly))
    return; figPoly.cornerRadius = genPoly[p1422]; figPoly.pointCount = Math.max(3, genPoly[v1428]); if (transform)
    l1594(figPoly, genPoly); f2690(figPoly, genPoly, addProps); }
function a2700(w2699) { return w2699[y1413] != null && !isNaN(w2699[y1413]) && w2699[y1415] != null && !isNaN(w2699[y1415]) && w2699[l1416] != null && !isNaN(w2699[l1416]) && w2699[w1417] != null && !isNaN(w2699[w1417]) && w2699[p1418] != null && !isNaN(w2699[p1418]); }
function f2701(w2699, addProps, transform) { if (!a2700(w2699))
    return null; const figRect = figma.createRectangle(); n2702(figRect, w2699, addProps, transform, true); return figRect; }
function n2702(figRect, w2699, addProps, transform, isValid = false) { if (!isValid && !a2700(w2699))
    return; const foundCorners = w2699[i1407].findIndex(e => e[0] == 'ROUND_CORNERS'); if (foundCorners > -1) {
    const corners = w2699[i1407][foundCorners];
    figRect.topLeftRadius = corners[1];
    figRect.topRightRadius = corners[2];
    figRect.bottomLeftRadius = corners[3];
    figRect.bottomRightRadius = corners[4];
}
else
    figRect.cornerRadius = w2699[p1418]; if (transform)
    l1594(figRect, w2699); f2690(figRect, w2699, addProps); figUpdateStrokeSides(figRect, w2699); }
function figUpdateStrokeSides(t1518, t1517) { const foundSides = t1517[i1407].findIndex(e => e[0] == 'STROKE_SIDES'); if (foundSides < 0)
    return; const sides = t1517[i1407][foundSides]; t1518.strokeWeight = 0; t1518.strokeTopWeight = sides[1]; t1518.strokeLeftWeight = sides[2]; t1518.strokeRightWeight = sides[3]; t1518.strokeBottomWeight = sides[4]; }
function u2703(n2713) { return n2713[y1413] != null && !isNaN(n2713[y1413]) && n2713[y1415] != null && !isNaN(n2713[y1415]) && n2713[l1416] != null && !isNaN(n2713[l1416]) && n2713[w1417] != null && !isNaN(n2713[w1417]) && n2713[w1423] != null && !isNaN(n2713[w1423]) && n2713[g1429] != null && !isNaN(n2713[g1429]) && n2713[b1434] != null && !isNaN(n2713[b1434]); }
function c2704(n2713, addProps, transform) { if (!u2703(n2713))
    return null; const c2714 = figma.createStar(); h2705(c2714, n2713, addProps, transform, true); return c2714; }
function h2705(c2714, n2713, addProps, transform, isValid = false) { if (!isValid && !u2703(n2713))
    return; c2714.cornerRadius = n2713[w1423]; c2714.pointCount = n2713[g1429]; c2714.innerRadius = Math.min(Math.max(0, n2713[b1434] / 100), 1); if (transform)
    l1594(c2714, n2713); f2690(c2714, n2713, addProps); }
const w4257 = [];
function d2706(h2710) { return h2710[z1435] != null && h2710[y1413] != null && !isNaN(h2710[y1413]) && h2710[y1415] != null && !isNaN(h2710[y1415]) && h2710[l1416] != null && !isNaN(h2710[l1416]) && h2710[w1417] != null && !isNaN(h2710[w1417]) && h2710[r1437] != null && h2710[r1437] != NULL && h2710[n1438] != null && !isNaN(h2710[n1438]); }
function q2707(h2710, addProps, transform) { if (!d2706(h2710))
    return null; const l2782 = figma.createText(); i2708(l2782, h2710, addProps, transform, true); return l2782; }
function i2708(l2782, h2710, addProps, transform, isValid = false) { if (!isValid && !d2706(h2710))
    return null; const fontName = { family: h2710[r1437], style: h2710[h1439] }; try {
    if (!w4257.includes(fontName)) {
        figma.loadFontAsync(fontName).then(() => { w4257.push(fontName); k2709(l2782, h2710, fontName, addProps, transform); });
    }
    else {
        k2709(l2782, h2710, fontName, addProps, transform);
    }
}
catch (e) {
    d956(e);
} }
function k2709(l2782, h2710, fontName, addProps, transform) { l2782.fontName = fontName; l2782.fontSize = Math.max(1, h2710[n1438]); l2782.characters = h2710[z1435]; l2782.lineHeight = { unit: 'PERCENT', value: h2710[p1442] }; l2782.letterSpacing = { unit: 'PERCENT', value: h2710[m1443] }; if (h2710[k1440] == 0)
    l2782.textAlignHorizontal = 'LEFT';
else if (h2710[k1440] == 1)
    l2782.textAlignHorizontal = 'CENTER';
else if (h2710[k1440] == 2)
    l2782.textAlignHorizontal = 'RIGHT';
else if (h2710[k1440] == 3)
    l2782.textAlignHorizontal = 'JUSTIFIED'; if (h2710[g1441] == 0)
    l2782.textAlignVertical = 'TOP';
else if (h2710[g1441] == 1)
    l2782.textAlignVertical = 'CENTER';
else if (h2710[g1441] == 2)
    l2782.textAlignVertical = 'BOTTOM'; if (transform)
    l1594(l2782, h2710); f2690(l2782, h2710, addProps); if (h2710[j1424] == 0 && h2710[y1430] == 0)
    l2782.textAutoResize = 'WIDTH_AND_HEIGHT';
else if (h2710[j1424] == 0)
    l2782.textAutoResize = 'HEIGHT';
else
    l2782.textAutoResize = 'NONE'; }
function w2765(n2715) { return true; }
function p2736(n2715, addProps, transform) { if (!w2765(n2715))
    return null; const a2716 = figma.createVector(); x2742(a2716, n2715, addProps, transform, true); return a2716; }
function x2742(a2716, n2715, addProps, transform, isValid = false) { if (!isValid && !w2765(n2715))
    return; a2716.setVectorNetworkAsync(n2715[r1420]); if (transform)
    l1594(a2716, n2715, false); f2690(a2716, n2715, addProps); }
function w2764(a2711) { return a2711[u1427] != null && !isNaN(a2711[u1427]) && a2711[f1433] != null && !isNaN(a2711[f1433]); }
function a2735(a2711, addProps, transform) { const a2712 = figma.createVector(); p2741(a2712, a2711, addProps, transform, true); return a2712; }
function p2741(a2712, a2711, addProps, transform, isValid = false) { if (!isValid && !w2764(a2711))
    return; a2712.vectorPaths = [{ windingRule: a2711[u1427] == 1 ? 'NONZERO' : 'EVENODD', data: a2711[f1421] }]; a2712.cornerRadius = a2711[f1433]; if (transform)
    l1594(a2712, a2711, false); f2690(a2712, a2711, addProps); }
