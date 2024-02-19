var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function u1051(key, tag) { return key.substring(0, tag.length + 1) == tag + ' '; }
function y1052(key, tag) { return key.substring(tag.length + 1); }
function r1053(key) { return u1051(key, t875); }
function a1054(key) { return u1051(key, g873); }
function z1055(key) { return u1051(key, h874); }
function o1056(key) { return y1052(key, t875); }
function t1057(key) { return y1052(key, g873); }
function t1058(key) { return y1052(key, h874); }
const generatorVersion = 363;
const r867 = 2147483647;
const NULL = '';
const h868 = '  ';
const v869 = '    ';
const i870 = '\n';
const z871 = '◦ G •';
const w872 = z871 + ' ';
const g873 = 'G_NODE';
const h874 = 'G_CONN';
const t875 = 'G_PAGE';
const g876 = 'G_TEMP';
const minWindowWidth = 602;
const minWindowHeight = 39;
const identity = Object.freeze([[1, 0, 0], [0, 1, 0], [0, 0, 1]]);
const Epsilon = 0.0000001;
const Tau = Math.PI * 2;
var z2533 = false;
function c877(x, eps = 0.000000001) { return Math.abs(x) < eps ? 0 : x; }
function nozero(x, eps = 0.000000001) { return x != 0 ? x : (x < 0 ? -eps : eps); }
function s878(v, eps = 0.000000001) { return point(nozero(v.x, eps), nozero(v.y, eps)); }
function equal(a, b, eps = 0.000000001) { return Math.abs(b - a) < eps; }
function sqr(x) { return x * x; }
;
function cube(x) { return x * x * x; }
;
function s879(f) { return Math.floor(f) | 0; }
function p880(x) { x = s879(x); x--; x |= x >> 1; x |= x >> 2; x |= x >> 4; x |= x >> 8; x |= x >> 16; x |= x >> 32; return ++x; }
function gcd(a, b) { let temp; while (1) {
    temp = a % b;
    if (temp == 0)
        return b;
    a = b;
    b = temp;
} }
function distv(p1, p2) { const dx = p2.x - p1.x; const dy = p2.y - p1.y; return Math.sqrt(dx * dx + dy * dy); }
function h881(v) { let angle = Math.atan2(v.y, v.x); if (angle < 0)
    angle += Tau; return angle; }
function anglev2(v1, v2) { return anglev2_(v1.x, v1.y, v2.x, v2.y); }
function anglev2_(x1, y1, x2, y2) { const dx = x2 - x1; const dy = y2 - y1; let angle = Math.atan2(dy, dx); if (angle < 0)
    angle += Tau; return angle; }
function o883(v) { return Math.sqrt(v.x * v.x + v.y * v.y); }
function j884(v) { return point(v.x == 0 ? 0 : v.x / o883(v), v.y == 0 ? 0 : v.y / o883(v)); }
function dotv(v1, v2) { return v1.x * v2.x + v1.y * v2.y; }
function s885(a1, a2) { let diff = a2 - a1; while (diff <= -Tau / 2)
    diff += Tau; while (diff > Tau / 2)
    diff -= Tau; return diff; }
function a886(v, m) { let v3 = [v.x, v.y, 1]; let r = f950(v3, m); return point(r[0], r[1]); }
function n887(...mm) { m954(mm.length > 0, 'mulm3m3() must take at least one argument'); let result = clone(mm[0]); for (let a = 1; a < mm.length; a++) {
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
function l888(m, s) { for (let i = 0; i < 3; i++)
    for (let j = 0; j < 3; j++)
        m[i][j] /= s; return m; }
function adjugate(m) { return cofactor(transpose(m)); }
function transpose(m) { return [[m[0][0], m[1][0], m[2][0]], [m[0][1], m[1][1], m[2][1]], [m[0][2], m[1][2], m[2][2]]]; }
function cofactor(m) { return [[m[1][1] * m[2][2] - m[2][1] * m[1][2], -(m[1][0] * m[2][2] - m[2][0] * m[1][2]), m[1][0] * m[2][1] - m[2][0] * m[1][1]], [-(m[0][1] * m[2][2] - m[2][1] * m[0][2]), m[0][0] * m[2][2] - m[2][0] * m[0][2], -(m[0][0] * m[2][1] - m[2][0] * m[0][1])], [m[0][1] * m[1][2] - m[1][1] * m[0][2], -(m[0][0] * m[1][2] - m[1][0] * m[0][2]), m[0][0] * m[1][1] - m[1][0] * m[0][1]]]; }
function determinant(m) { return m[0][0] * (m[1][1] * m[2][2] - m[1][2] * m[2][1]) - m[0][1] * (m[1][0] * m[2][2] - m[2][0] * m[1][2]) + m[0][2] * (m[1][0] * m[2][1] - m[2][0] * m[1][1]); }
function o889(m) { return l888(adjugate(m), determinant(m)); }
function e890(angle) { const cosA = c877(Math.cos(angle)); const sinA = c877(Math.sin(angle)); return [[cosA, sinA, 0], [-sinA, cosA, 0], [0, 0, 1]]; }
function c891(x = 0, y = 0, a892 = 1, o893 = 1, angle = 0, r894 = 0, z895 = 0) { const cosA = Math.cos(angle); const sinA = Math.sin(angle); return [[a892 * cosA - z895 * sinA, -r894 * cosA + o893 * sinA, x], [z895 * cosA + a892 * sinA, o893 * cosA + r894 * sinA, y], [0, 0, 1]]; }
function n896(v1, v2) { return v1.x * v2.y - v1.y * v2.x; }
function h897(v1, v2) { return point(v1.x + v2.x, v1.y + v2.y); }
function sqrv(v) { return d898(v, v); }
function d898(v1, v2) { return point(v1.x * v2.x, v1.y * v2.y); }
function k899(v, s) { return point(v.x * s, v.y * s); }
function s900(v1, v2) { return point(v1.x / v2.x, v1.y / v2.y); }
function c901(v, s) { return point(v.x / s, v.y / s); }
function o902(v1, v2) { return point(v1.x - v2.x, v1.y - v2.y); }
function v903(str) { return decodeURI(encodeURIComponent(str)); }
function n904(str) { return decodeURIComponent(encodeURI(str)); }
function u905(bytes) { let str = ''; for (let i = 0; i < bytes.length; i++)
    str += String.fromCharCode(bytes[i]); return str; }
function z906(str) { return Array.from(n904(str), c => c.charCodeAt(0)); }
function x907(array, size) { const newArray = new Uint8Array(size); k908(array, newArray); return newArray; }
function k908(src, dst) { h909(src, 0, src.length, dst, 0, dst.length); }
function h909(src, a910, g911, dst, r912, g913) { const size = Math.min(g911, g913); for (let i = 0; i < size; i++)
    dst[r912 + i] = src[a910 + i]; }
function v914(m915, u916) { if (m915.length != u916.length)
    return false; for (let i = 0; i < m915.length; i++) {
    if (m915[i] != u916[i])
        return false;
} return true; }
function x917(z918, t919) { return z918.findIndex(i => t919.includes(i)) > -1; }
function x920(list) { return list ? '<==' : '<--'; }
;
function d921(list) { return list ? '==>' : '-->'; }
;
function g922(nodeId) { return g873 + ' ' + nodeId; }
function s923(name) { return h874 + ' ' + name; }
function q924(name) { return t875 + ' ' + name; }
function f925(str) { return str.toLowerCase() == 'true' || str == '1'; }
function y926(h927, o928 = false) { return i933(h927.outputNodeId, h927.outputId, h927.outputOrder, h927.inputNodeId, h927.inputId, h927.list, o928); }
function h929(outputNodeId, outputId, outputOrder, inputNodeId, inputId) { return s923(outputNodeId + ' ' + outputId + ' ' + outputOrder + ' ' + inputNodeId + ' ' + inputId); }
function g930(x243) { return h929(x243.outputNodeId, x243.outputId, x243.outputOrder, x243.inputNodeId, x243.inputId); }
function y931(x243) { return h929(x243.output.node.id, x243.output.id, x243.outputOrder, x243.input.node.id, x243.input.id); }
function z932(x243, o928 = false) { return i933(x243.output.node.id, x243.output.id, x243.outputOrder, x243.input.node.id, x243.input.id, x243.list, o928); }
function i933(outputNodeId, outputId, outputOrder, inputNodeId, inputId, list, o928 = false) { const sp = o928 ? ' ' : '  '; const jsp = o928 ? '' : ' '; const arrow = sp + y937(typeof outputOrder == 'string' ? parseInt(outputOrder) : outputOrder) + d921(typeof list == 'string' ? f925(list) : list) + sp; const join = jsp + '.' + jsp; return outputNodeId + join + outputId + arrow + inputNodeId + join + inputId; }
function z934(pageId) { return q924(pageId); }
function n935(num) { const str = num.toString(); let sup = ''; for (const c of str)
    sup += s936(c); return sup; }
function s936(c) { switch (c) {
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
function y937(num) { const str = num.toString(); let sup = ''; for (const c of str)
    sup += b938(c); return sup; }
function b938(c) { switch (c) {
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
function p939(bool) { return bool ? 'true' : 'false'; }
function isValid(val) { return val != undefined && val != null; }
function isEmpty(array) { return array.length == 0; }
function s940(array, item) { c941(array, array.indexOf(item)); }
function c941(array, index) { if (index > -1 && index < array.length)
    array.splice(index, 1); }
function c942(array) { if (isEmpty(array))
    return null; let last = array.at(-1); array.splice(array.length - 1, 1); return last; }
function d943(array) { return array[array.length - 1]; }
function n944(array, from, to) { const item = array[from]; array.splice(from, 1); array.splice(to, 0, item); }
function y945(array, item) { const index = array.indexOf(item); if (index > -1)
    array.splice(index, 1); }
function l946(m2789, array) { for (const item of array) {
    const index = m2789.indexOf(item);
    if (index > -1)
        m2789.splice(index, 1);
} }
function u947(array, where) { const index = array.findIndex(where); if (index > -1)
    array.splice(index, 1); }
function t948(styleId) { return styleId.split(',')[0] + ','; }
function f949(points) { let m4029 = ''; if (points.length < 2)
    return m4029; m4029 += 'M'; m4029 += ' ' + c877(points[0].x); m4029 += ' ' + c877(points[0].y); for (let i = 1; i < points.length; i++) {
    m4029 += ' L' + ' ' + c877(points[i].x) + ' ' + c877(points[i].y);
} return m4029; }
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
        let u111 = {};
        for (const key in val)
            u111[key] = clone(val[key]);
        return u111;
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
function h952(array, item, equal) { if (Array.isArray(item))
    item.forEach(i => h952(array, i, equal));
else if (!array.find(equal))
    array.push(item); }
function j953(array, item, except) { if (Array.isArray(item))
    item.forEach(i => j953(array, i, except));
else if (!array.find(except))
    array.push(item); }
function m954(...args) { if (z2533) {
    console.assert(...args);
} }
function p955(...args) { if (z2533)
    console.error(...args); }
function v956(str, trim) { while (str.length >= trim.length && str.substring(0, trim.length) == trim)
    str = str.substring(trim.length); return str; }
function w957(str, trim) { while (str.length >= trim.length && str.substring(str.length - trim.length) == trim)
    str = str.substring(0, str.length - trim.length); return str; }
function e958(g4089) { const fills = []; for (const fill of g4089) {
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
            const l4205 = fill[1];
            const stops = [];
            for (const stop of fill[2]) {
                stops.push({ color: { r: Math.min(Math.max(0, stop[0]), 1), g: Math.min(Math.max(0, stop[1]), 1), b: Math.min(Math.max(0, stop[2]), 1), a: Math.min(Math.max(0, stop[3]), 1) }, position: stop[4] });
            }
            fills.push({ type: fill[0], gradientTransform: l4205, gradientStops: stops, blendMode: fill[3] });
            break;
        }
    }
} return fills; }
function h959(type) { return k1092.includes(type); }
const o1059 = 'LIST#';
const h1060 = 'NLIST#';
const q1061 = 'TLIST#';
const h1062 = 'SLIST#';
const j1063 = 'NULL';
const s1064 = 'VAR';
const l1065 = 'VARGRP';
const r1066 = 'START';
const z1067 = 'REPT';
const l1068 = 'CACHE';
const v1069 = 'FRZ';
const b1070 = 'TIMER';
const z1071 = 'VNAME';
const GET_LIST_VALUE_NAMES = 'GVNAMES';
const LIST_VALUE_NAMES = 'VNAMES';
const OBJECT_NAME = 'ONAME';
const b1072 = 'CMB';
const h1073 = 'LSASIT';
const m1074 = 'EXTR';
const r1075 = 'SETP';
const k1076 = 'GETP';
const k1077 = 'SUBLST';
const x1078 = 'UNIQ';
const REORDER_LIST = 'RORD';
const SHIFT_LIST = 'SHFTLST';
const s1079 = 'REVLST';
const s1080 = 'SORT';
const u1081 = 'CLMN';
const x1082 = 'CELL';
const m1083 = 'LIST';
const c1084 = 'COUNT';
const f1085 = 'LCONT';
const d1086 = 'SELECT';
const SELECT_FROM_LIST = 'LSTSEL';
const k1087 = 'IF';
const r1088 = 'LSTFLT';
const b1089 = 'DEFINE';
const d1090 = 'ANY#';
const w1091 = [o1059, h1060, q1061, h1062, b1072, m1074, r1075, k1076, k1077, m1083, c1084, f1085, z1067];
const k1092 = [o1059, h1060, q1061, h1062];
const i1093 = [j1063, s1064, l1065, ...w1091, h1073, m1074, r1075, k1076, k1077, x1078, REORDER_LIST, SHIFT_LIST, s1079, u1081, s1080, x1082, m1083, d1086, SELECT_FROM_LIST, k1087, r1088, r1066, z1067, b1089, l1068, v1069, b1070, z1071, GET_LIST_VALUE_NAMES, LIST_VALUE_NAMES, OBJECT_NAME];
const l1094 = 'NUM#';
const h1095 = 'NUM';
const NUMBER_PRECISION = 'NPREC';
const m1096 = 'NSIGN';
const x1097 = 'ABS';
const NUMBER_NEGATIVE = 'NEG';
const k1098 = 'ROUND';
const l1099 = 'SMINMAX';
const h1100 = 'MINMAX';
const f1101 = 'LIM';
const v1102 = 'NCURVE';
const k1103 = 'NANISNUM';
const c1104 = 'CONST';
const x1105 = 'DATE';
const s1106 = 'SEQ';
const r1107 = 'RANGE';
const e1108 = 'WAVE';
const j1109 = 'RAND';
const o1110 = 'NOISE';
const e1111 = 'PROB';
const v1112 = 'ACCUM';
const b1113 = 'LERP';
const w1114 = 'SOLVE';
const m1115 = 'NANIM';
const t1116 = 'SMATH';
const u1117 = 'MATH';
const h1118 = 'ADD';
const m1119 = 'SUB';
const i1120 = 'MUL';
const g1121 = 'DIV';
const h1122 = 'MOD';
const k1123 = 'EXP';
const s1124 = 'NBOOL';
const f1125 = 'NOT';
const p1126 = 'AND';
const s1127 = 'OR';
const w1128 = 'XOR';
const e1129 = 'COND';
const f1130 = 'EQ';
const n1131 = 'NE';
const z1132 = 'LT';
const m1133 = 'LE';
const l1134 = 'GT';
const m1135 = 'GE';
const z1136 = 'TRIG';
const m1137 = 'SIN';
const k1138 = 'COS';
const e1139 = 'TAN';
const m1140 = 'ATAN2';
const m1141 = 'CNVANG';
const g1142 = [u1117, t1116, h1118, m1119, i1120, g1121, h1122, k1123];
const i1143 = [s1124, f1125, p1126, s1127, w1128];
const m1144 = [e1129, f1130, n1131, z1132, m1133, l1134, m1135];
const z1145 = [z1136, m1137, k1138, e1139, m1140];
const a1146 = 'TEXT#';
const j1147 = 'TEXT';
const m1148 = 'TLEN';
const y1149 = 'TTRIM';
const o1150 = 'TSUB';
const r1151 = 'TCONT';
const q1152 = 'TCASE';
const x1153 = 'TREPL';
const d1154 = 'TJOIN';
const a1155 = 'TPAD';
const y1156 = 'TCMP';
const l1157 = 'TCHAR';
const r1158 = 'TUNI';
const w1159 = 'INDEX';
const i1160 = 'N2T';
const z1161 = 'C2T';
const u1162 = 'T2N';
const z1163 = 'T2C';
const d1164 = 'TSPLT';
const s3498 = 'TJSON';
const e1166 = 'TCSV';
const j1167 = 'FETCH';
const q1168 = 'TFILE';
const k1169 = [l1094, h1060, h1095, NUMBER_PRECISION, m1096, x1097, NUMBER_NEGATIVE, k1098, l1099, h1100, f1101, v1102, k1103, c1104, x1105, s1106, r1107, e1108, j1109, o1110, e1111, v1112, b1113, w1114, m1115, i1160, l1157, ...g1142, ...i1143, ...m1144, ...z1145, m1141];
const n1170 = [a1146, q1061, j1147, m1148, y1149, o1150, r1151, q1152, d1154, a1155, x1153, y1156, r1158, w1159, u1162, z1163, d1164, s3498, e1166, j1167, q1168];
const g1171 = 'COL#';
const j1172 = 'COL';
const c1173 = 'CVAL';
const a1174 = 'CCOR';
const w1175 = 'COLP3';
const a1176 = 'CCNT';
const y1177 = 'BLND';
const x1178 = 'CLERP';
const t1179 = 'CBLND';
const e1180 = [g1171, j1172, a1174, w1175, y1177, x1178, t1179, z1161];
const g1181 = 'FILL#';
const g1182 = 'FILL';
const y1183 = [g1181, g1182];
const q1184 = 'STRK#';
const o1185 = 'STRK';
const w1186 = [q1184, o1185];
const b1187 = 'CSTOP#';
const j1188 = 'CSTOP';
const k1189 = [b1187, j1188];
const o1190 = 'GRAD#';
const n1191 = 'GRAD';
const v1192 = [o1190, n1191];
const n1193 = 'RCRN#';
const v1194 = 'RCRN';
const n1195 = [n1193, v1194];
const r1196 = 'DRSH#';
const g1197 = 'DRSH';
const f1198 = [r1196, g1197];
const l1199 = 'INSH#';
const u1200 = 'INSH';
const r1201 = [l1199, u1200];
const t1202 = 'LBLR#';
const c1203 = 'LBLR';
const l1204 = [t1202, c1203];
const i1205 = 'BBLR#';
const h1206 = 'BBLR';
const n1207 = [i1205, h1206];
const x1208 = 'MASK#';
const g1209 = 'MASK';
const z1210 = [x1208, g1209];
const z1211 = 'BLEND#';
const o1212 = 'BLEND';
const y1213 = [z1211, o1212];
const r1214 = [...n1195, ...f1198, ...r1201, ...l1204, ...n1207, ...y1213, ...z1210];
const c1215 = [g1171, g1181, o1190, q1184, r1196, l1199, t1202, i1205, z1211, x1208];
const t1216 = 'CSTL';
const w1217 = 'SHP#';
const j1218 = 'RECT#';
const o1219 = 'RECT';
const f1220 = [j1218, o1219];
const c1221 = 'LINE#';
const z1222 = 'LINE';
const f1223 = [c1221, z1222];
const w1224 = 'ELPS#';
const z1225 = 'ELPS';
const l1226 = [w1224, z1225];
const w1227 = 'TRPZ#';
const h1228 = 'TRPZ';
const m1229 = [w1227, h1228];
const e1230 = 'POLY#';
const u1231 = 'POLY';
const t1232 = [e1230, u1231];
const m1233 = 'STAR#';
const y1234 = 'STAR';
const n1235 = [m1233, y1234];
const n1236 = 'TXTS#';
const e1237 = 'TXTS';
const m1238 = [n1236, e1237];
const h1239 = 'PT#';
const h1240 = 'PT';
const i1241 = [h1239, h1240];
const e1242 = 'PCORN';
const c1243 = 'VPATH#';
const l1244 = 'VPATH';
const o1245 = [c1243, l1244];
const z1246 = 'VPT#';
const w1247 = 'VPT';
const v1248 = [z1246, w1247];
const t1249 = 'VEDGE#';
const t1250 = 'VEDGE';
const u1251 = [t1249, t1250];
const x1252 = 'VREG#';
const q1253 = 'VREG';
const f1254 = [x1252, q1253];
const s1255 = 'VNET#';
const s1256 = 'VNET';
const n1257 = [s1255, s1256];
const f1258 = 'SGRP#';
const l1259 = 'SGRP';
const x1260 = [f1258, l1259];
const l1261 = 'FRM#';
const g1262 = 'FRM';
const k1263 = [l1261, g1262];
const b1264 = 'MOVE';
const f1265 = 'ROT';
const f1266 = 'SCALE';
const c1267 = 'SKEW';
const z1268 = 'SCENTR';
const e1269 = 'RSTX';
const p1270 = 'PLACE';
const o1271 = 'APPLY';
const PATH_LENGTH = 'PTHLEN';
const JOIN_PATHS = 'JOINPTH';
const w1277 = 'PTALPATH';
const u1278 = 'CPTONPATH';
const j1272 = 'MESPT';
const b1273 = 'VECLEN';
const h1274 = 'CIRCEN';
const ARC_FROM_POINTS = 'ARCPT';
const w1275 = 'INTLIN';
const y1276 = 'PTLERP';
const h1279 = 'BOOL';
const z1280 = 'BOOL#';
const o1281 = 'BOOLU';
const a1282 = 'BOOLS';
const n1283 = 'BOOLI';
const t1284 = 'BOOLE';
const k1285 = [h1279, z1280, o1281, a1282, n1283, t1284];
const w1286 = 'RENDER';
const d1287 = [w1217, h1062, j1218, c1221, w1224, w1227, e1230, m1233, n1236, h1239, c1243, z1246, t1249, x1252, s1255, f1258, l1261, z1280, r1196, l1199, t1202, i1205, z1211, x1208];
const g1288 = [f1265, f1266, c1267];
const g1289 = [...d1287, ...f1220, ...f1223, ...l1226, ...m1229, ...t1232, ...n1235, ...m1238, ...i1241, e1242, ...o1245, ...v1248, ...u1251, ...f1254, ...n1257, ...x1260, ...k1263, ...k1285, b1264, ...g1288, z1268, e1269, p1270, o1271, PATH_LENGTH, JOIN_PATHS, w1277, u1278, j1272, b1273, h1274, ARC_FROM_POINTS, w1275, y1276, w1286];
const v1290 = [o1059, h1060, q1061, h1062, l1094, a1146, g1171, g1181, b1187, o1190, q1184, b1187, o1190, w1217, j1218, c1221, w1224, w1227, e1230, m1233, n1236, h1239, c1243, z1246, t1249, x1252, s1255, f1258, l1261, n1193, r1196, l1199, t1202, i1205, z1211, x1208];
const z1291 = 'GROUP';
const y1292 = 'GPARAM';
const a1293 = [z1291, y1292];
const j1294 = 'CMNT';
const v1295 = 'CMNTARR';
const b1296 = 'PANEL';
const t1297 = 'ACT';
const b1298 = 'BEF';
const f1299 = 'DIS';
const i1300 = 'NOC';
const PARAM = 'PARAM';
const x1301 = 'LOG';
const w1302 = 'GRAPH';
const r1303 = [[h1122, '%'], [g1121, '/'], [m1119, '−'], [h1118, '+'], [i1120, '×'], [k1123, 'e<sup>x']];
const e1304 = [[g1121, '/'], [m1119, '−'], [h1118, '+'], [i1120, '×']];
const f1305 = 0;
const k1306 = 1;
const v1307 = 2;
const i1308 = 3;
const i1309 = [[f1305, 'not'], [k1306, 'xor'], [v1307, 'or'], [i1308, 'and']];
const t1310 = 0;
const v1311 = 1;
const t1312 = 2;
const y1313 = 3;
const m1314 = 4;
const i1315 = 5;
const l1316 = [[t1310, '<'], [v1311, '≤'], [t1312, '≠'], [y1313, '='], [m1314, '≥'], [i1315, '>']];
const s1317 = 0;
const r1318 = 1;
const r1319 = 2;
const i1320 = 3;
const c1321 = 4;
const w1322 = 5;
const t1323 = [[s1317, 'sin'], [r1318, 'cos'], [r1319, 'tan'], [i1320, 'asin'], [c1321, 'acos'], [w1322, 'atan']];
const j1324 = 'EMPTY';
const p1325 = 'CONNECT';
const p1326 = 'CREATE';
const j1327 = 'CREATE_INSERT';
const r1328 = 'DELETE';
const m1329 = 'DISCONNECT';
const u1330 = 'LINK_STYLE';
const f1331 = 'LINK_VARIABLE';
const v1332 = 'LINK_VARIABLE_GROUP';
const o1333 = 'MAKE_ACTIVE';
const MAKE_NOT_CONDITION_ACTION = 'MAKE_NOT_CONDITION';
const z1334 = 'MAKE_PASSIVE';
const c1335 = 'PASTE';
const r1336 = 'RECONNECT';
const i1337 = 'REMOVE';
const j1338 = 'RENAME';
const n1339 = 'REORDER_INPUTS';
const z1340 = 'REORDER_CONNECTIONS';
const a1341 = 'SELECT';
const u1342 = 'SELECT_MOVE';
const x1343 = 'MOVE_NODES';
const n1344 = 'SET_PARAM_VALUE';
const SET_MULTIPLE_VALUES_ACTION = 'SET_MULTIPLE_VALUES';
const z1345 = 'SET_PARAM_SETTING';
const f1346 = 'SET_NODE_RECT';
const a1347 = 'TOGGLE_DISABLE';
const o1348 = 'TOGGLE_PARAM_HEADER';
const a1349 = 'SET_CURRENT_GRAPH';
const k1350 = 'CREATE_PAGE';
const j1351 = 'DELETE_PAGE';
const b1352 = 'GROUP_NODES';
const j1353 = 'UNGROUP_NODES';
const w1354 = 'HIGHLIGHT_NODES';
const SCROLL_LIST_NODE_ACTION = 'SCROLL_LIST_NODE';
const SET_LIST_DIVIDER_ACTION = 'SET_LIST_DIVIDER';
const SET_NODE_PARAM_ACTION = 'SET_NODE_PARAM';
const f1355 = 'BNORM';
const b1356 = 'BDARK';
const d1357 = 'BMULT';
const h1358 = 'BPDRK';
const o1359 = 'BBURN';
const p1360 = 'BLITE';
const b1361 = 'BSCRN';
const e1362 = 'BPLGT';
const w1363 = 'BDODG';
const o1364 = 'BOVER';
const o1365 = 'BSOFT';
const z1366 = 'BHARD';
const f1367 = 'BDIFF';
const y1368 = 'BEXCL';
const j1369 = 'BHUE';
const r1370 = 'BSAT';
const c1371 = 'BCOL';
const j1372 = 'BLUM';
const e1373 = [[f1355, 'normal', 'NORMAL'], [b1356, 'darken', 'DARKEN'], [d1357, 'multiply', 'MULTIPLY'], [h1358, 'plus darker', 'LINEAR_BURN'], [o1359, 'color burn', 'COLOR_BURN'], [p1360, 'lighten', 'LIGHTEN'], [b1361, 'screen', 'SCREEN'], [e1362, 'plus lighter', 'LINEAR_DODGE'], [w1363, 'color dodge', 'COLOR_DODGE'], [o1364, 'overlay', 'OVERLAY'], [o1365, 'soft light', 'SOFT_LIGHT'], [z1366, 'hard light', 'HARD_LIGHT'], [f1367, 'difference', 'DIFFERENCE'], [y1368, 'exclusion', 'EXCLUSION'], [j1369, 'hue', 'HUE'], [r1370, 'saturation', 'SATURATION'], [c1371, 'color', 'COLOR'], [j1372, 'luminosity', 'LUMINOSITY']];
const s1374 = [['thin', 100], ['extra light', 200], ['light', 300], ['regular', 400], ['medium', 500], ['semi bold', 600], ['bold', 700], ['extra bold', 800], ['black', 900]];
const i1375 = 0;
const h1376 = 1;
const y1377 = 2;
const g1378 = 2;
const j1379 = 3;
const k1380 = 3;
const o1381 = 4;
const u1382 = 4;
const q1383 = 5;
const b1384 = 6;
const l1385 = 7;
const e1386 = 8;
const m1387 = 9;
const r1388 = 10;
const t1389 = 11;
const b1390 = 12;
const n1391 = 13;
const b1392 = 14;
const v1393 = 15;
const x1394 = 16;
const x1395 = 17;
const w1396 = 18;
const y1397 = 19;
const j1398 = 20;
const y1399 = 21;
const a1400 = 22;
const a1401 = 23;
const b1402 = 24;
const e1403 = 24;
const j1404 = 25;
const i1405 = 26;
const a1406 = 27;
const w1407 = 28;
const r1408 = 28;
const o1409 = 28;
const x1410 = 28;
const c1411 = 28;
const x1412 = 28;
const x1413 = 28;
const e1414 = 28;
const b1415 = 29;
const h1416 = 29;
const n1417 = 29;
const u1418 = 29;
const c1419 = 29;
const j1420 = 29;
const n1421 = 30;
const n1422 = 30;
const f1423 = 30;
const i1424 = 30;
const d1425 = 31;
const a1426 = 31;
const n1427 = 32;
const g1428 = 33;
const u1429 = 34;
const l1430 = 35;
const j1431 = 36;
const p1432 = 37;
const m2790 = '12345679ABCDEFGHJKLMNPQRSTUVWXYZ';
function j845(array, chars = m2790) { let v847 = ''; let len = array.length; let i = 0; while (len > 0) {
    if (len >= 5) {
        const a0 = array[i], a1 = array[i + 1], a2 = array[i + 2], a3 = array[i + 3], a4 = array[i + 4];
        v847 += chars[(a0 & 0xF8) >>> 3];
        v847 += chars[((a0 & 0x07) << 2) | ((a1 & 0xC0) >>> 6)];
        v847 += chars[(a1 & 0x3E) >>> 1];
        v847 += chars[((a1 & 0x01) << 4) | ((a2 & 0xF0) >>> 4)];
        v847 += chars[((a2 & 0x0F) << 1) | ((a3 & 0x80) >>> 7)];
        v847 += chars[(a3 & 0x7C) >>> 2];
        v847 += chars[((a3 & 0x03) << 3) | ((a4 & 0xE0) >>> 5)];
        v847 += chars[(a4 & 0x1F)];
    }
    else if (len == 4) {
        const a0 = array[i], a1 = array[i + 1], a2 = array[i + 2], a3 = array[i + 3];
        v847 += chars[(a0 & 0xF8) >>> 3];
        v847 += chars[((a0 & 0x07) << 2) | ((a1 & 0xC0) >>> 6)];
        v847 += chars[(a1 & 0x3E) >>> 1];
        v847 += chars[((a1 & 0x01) << 4) | ((a2 & 0xF0) >>> 4)];
        v847 += chars[((a2 & 0x0F) << 1) | ((a3 & 0x80) >>> 7)];
        v847 += chars[(a3 & 0x7C) >>> 2];
        v847 += chars[((a3 & 0x03) << 3)];
    }
    else if (len == 3) {
        const a0 = array[i], a1 = array[i + 1], a2 = array[i + 2];
        v847 += chars[(a0 & 0xF8) >>> 3];
        v847 += chars[((a0 & 0x07) << 2) | ((a1 & 0xC0) >>> 6)];
        v847 += chars[(a1 & 0x3E) >>> 1];
        v847 += chars[((a1 & 0x01) << 4) | ((a2 & 0xF0) >>> 4)];
        v847 += chars[((a2 & 0x0F) << 1)];
    }
    else if (len == 2) {
        const a0 = array[i], a1 = array[i + 1];
        v847 += chars[(a0 & 0xF8) >>> 3];
        v847 += chars[((a0 & 0x07) << 2) | ((a1 & 0xC0) >>> 6)];
        v847 += chars[(a1 & 0x3E) >>> 1];
        v847 += chars[((a1 & 0x01) << 4)];
    }
    else if (len == 1) {
        const a0 = array[i];
        v847 += chars[(a0 & 0xF8) >>> 3];
        v847 += chars[((a0 & 0x07) << 2)];
    }
    i += 5;
    len -= 5;
} return v847; }
function u846(v847, chars = m2790) { const array = []; let len = v847.length; let c = 0; while (len > 0) {
    if (len >= 8) {
        const c0 = chars.indexOf(v847[c]), c1 = chars.indexOf(v847[c + 1]), c2 = chars.indexOf(v847[c + 2]), c3 = chars.indexOf(v847[c + 3]), c4 = chars.indexOf(v847[c + 4]), c5 = chars.indexOf(v847[c + 5]), c6 = chars.indexOf(v847[c + 6]), c7 = chars.indexOf(v847[c + 7]);
        array.push((c0 << 3) | ((c1 & 0x1C) >>> 2));
        array.push(((c1 & 0x03) << 6) | (c2 << 1) | ((c3 & 0x10) >>> 4));
        array.push(((c3 & 0x0F) << 4) | ((c4 & 0x1E) >>> 1));
        array.push(((c4 & 0x01) << 7) | (c5 << 2) | ((c6 & 0x18) >>> 3));
        array.push(((c6 & 0x07) << 5) | c7);
    }
    else if (len == 7) {
        const c0 = chars.indexOf(v847[c]), c1 = chars.indexOf(v847[c + 1]), c2 = chars.indexOf(v847[c + 2]), c3 = chars.indexOf(v847[c + 3]), c4 = chars.indexOf(v847[c + 4]), c5 = chars.indexOf(v847[c + 5]), c6 = chars.indexOf(v847[c + 6]);
        array.push((c0 << 3) | ((c1 & 0x1C) >>> 2));
        array.push(((c1 & 0x03) << 6) | (c2 << 1) | ((c3 & 0x10) >>> 4));
        array.push(((c3 & 0x0F) << 4) | ((c4 & 0x1E) >>> 1));
        array.push(((c4 & 0x01) << 7) | (c5 << 2) | ((c6 & 0x18) >>> 3));
    }
    else if (len == 5) {
        const c0 = chars.indexOf(v847[c]), c1 = chars.indexOf(v847[c + 1]), c2 = chars.indexOf(v847[c + 2]), c3 = chars.indexOf(v847[c + 3]), c4 = chars.indexOf(v847[c + 4]);
        array.push((c0 << 3) | ((c1 & 0x1C) >>> 2));
        array.push(((c1 & 0x03) << 6) | (c2 << 1) | ((c3 & 0x10) >>> 4));
        array.push(((c3 & 0x0F) << 4) | ((c4 & 0x1E) >>> 1));
    }
    else if (len == 4) {
        const c0 = chars.indexOf(v847[c]), c1 = chars.indexOf(v847[c + 1]), c2 = chars.indexOf(v847[c + 2]), c3 = chars.indexOf(v847[c + 3]);
        array.push((c0 << 3) | ((c1 & 0x1C) >>> 2));
        array.push(((c1 & 0x03) << 6) | (c2 << 1) | ((c3 & 0x10) >>> 4));
    }
    else if (len == 2) {
        const c0 = chars.indexOf(v847[c]), c1 = chars.indexOf(v847[c + 1]);
        array.push((c0 << 3) | ((c1 & 0x1C) >>> 2));
    }
    c += 8;
    len -= 8;
} return array; }
function e2095(nodeKey, a4001) { const log = e2096(y1540(nodeKey, false)); if (a4001) {
    console.log('%c%s\n%c%s', 'background: #fa24; color: white;', t1057(nodeKey), 'background: #fa44; color: #edc;', log);
}
else {
    console.log('%c%s\n%c%s', 'background: #fdb; color: black;', t1057(nodeKey), 'background: #fed; color: black;', log);
} }
function e2096(json) { let a4030 = json.replace('{\n', '').replace('\n}', '').replace('[\n' + h868, '').replace('\n' + h868 + ']', '').split(h868 + '"params":\n').join('').split('": "').join(': ').split('", "').join(': ').split(h868 + '"').join(h868).split(h868 + h868 + '["').join(h868 + h868).split('",\n').join('\n').split('"\n').join('\n').split('"],\n').join('\n'); if (a4030[a4030.length - 1] == '"')
    a4030 = a4030.substring(0, a4030.length - 1); if (a4030.substring(a4030.length - 2) == '"]')
    a4030 = a4030.substring(0, a4030.length - 2); return a4030; }
function d2097(json) { let a4030 = json.replace('{\n', '').replace('\n}', '').replace('[\n' + h868, '').replace('\n' + h868 + ']', ''); return a4030; }
function a2098(x243, a4001) { const k4208 = y926(x243, true); if (a4001) {
    console.log('%c%s', 'background: #4f44; color: #ded', k4208);
}
else {
    console.log('%c%s', 'background: #cfc; color: black;', k4208);
} }
console.clear();
figma.payments.setPaymentStatusInDevelopment({ type: 'PAID' });
figma.on('documentchange', b1511);
figma.on('selectionchange', a1519);
figma.on('close', l1512);
y1501(true);
figma.clientStorage.getAsync('pro').then(data => { figma.showUI(__html__, { visible: false, themeColors: true, title: 'Generator' }); });
var w2702 = figma.viewport.zoom;
setInterval(o1516, 100);
const k2791 = 'clock_';
const o2792 = 1000;
var w2793 = false;
var objectCenterSize = 15;
function n1513() { (function () {
    return __awaiter(this, void 0, void 0, function* () { let j2794 = yield figma.currentPage.getPluginData(figma.currentUser.id + ',windowWidth'); let r2795 = yield figma.currentPage.getPluginData(figma.currentUser.id + ',windowHeight'); let r2796; let m2797; if (j2794 === NULL) {
        r2796 = 800;
        figma.currentPage.setPluginData(figma.currentUser.id + ',windowWidth', j2794.toString());
    }
    else
        r2796 = parseInt(j2794); if (r2795 === NULL) {
        m2797 = 600;
        figma.currentPage.setPluginData(figma.currentUser.id + ',windowHeight', r2795.toString());
    }
    else
        m2797 = parseInt(r2795); figma.ui.resize(Math.max(minWindowWidth, r2796), Math.max(minWindowHeight, m2797)); figma.ui.show(); const fonts = yield figma.listAvailableFontsAsync(); const eula = (yield figma.clientStorage.getAsync('eula')) === 'true'; const tutorials = (yield figma.clientStorage.getAsync('tutorials')) === 'true'; const isLocked = r1518(); j1520({ cmd: 'uiReturnFigStartGenerator', currentUser: figma.currentUser, viewportRect: figma.viewport.bounds, viewportZoom: figma.viewport.zoom, fonts: fonts, eula: eula, tutorials: tutorials, isLocked: isLocked, windowWidth: r2796, windowHeight: m2797 }); });
})(); }
function r1514() { y1501(); figma.showUI(__html__, { visible: false, themeColors: true }); }
function k1515() { setInterval(f1517, o2792); }
function o1516() { if (figma.viewport.zoom == w2702)
    return; w2702 = figma.viewport.zoom; p2690(); w1534(); i1536(); }
function f1517() { c1541(k2791 + figma.currentUser.sessionId.toString(), Date.now().toString()); }
function r1518() { const clocks = figma.currentPage.getPluginDataKeys().filter(k => k.length > k2791.length && k.substring(0, k2791.length) == k2791 && k.substring(k2791.length) != figma.currentUser.sessionId.toString()).map(k => parseInt(y1540(k))); clocks.sort(); const now = Date.now(); const locked = clocks.length > 0 && now - clocks[clocks.length - 1] < o2792 * 2; return locked; }
function a1519() { p2690(); }
var z2723 = new Array();
var c2725 = new Array();
function m1500(nodeIds) { for (let i = s2759.length - 1; i >= 0; i--)
    if (!s2759[i].removed && nodeIds.includes(s2759[i].getPluginData('nodeId')))
        s2759.splice(i, 1); for (let i = y2775.length - 1; i >= 0; i--)
    if (y2775[i].removed || nodeIds.includes(y2775[i].getPluginData('nodeId')))
        y2775.splice(i, 1); figma.currentPage.findAll(o => nodeIds.includes(o.getPluginData('nodeId'))).forEach(o => { if (!o.removed)
    o.remove(); }); z2723 = z2723.filter(a => !nodeIds.includes(a.nodeId)); }
function y1501(o1502 = false) { for (const c1507 of figma.currentPage.children) {
    if (c1507.removed)
        continue;
    if (c1507.getPluginData('objectId') != '' && c1507.getPluginData('userId') == figma.currentUser.id && (parseInt(c1507.getPluginData('retain')) == 0 || o1502))
        c1507.remove();
} }
function v1503(nodeIds, i1504) { for (let i = z2723.length - 1; i >= 0; i--) {
    const x2724 = z2723[i];
    if (!nodeIds.includes(x2724.nodeId))
        continue;
    for (let j = x2724.objects.length - 1; j >= 0; j--) {
        const c1507 = x2724.objects[j];
        if (c1507.removed || !x1505(c1507, i1504)) {
            if (!c1507.removed)
                c1507.remove();
            y945(x2724.objects, c1507);
            if (s2759.includes(c1507))
                y945(s2759, c1507);
            if (y2775.includes(c1507))
                y945(y2775, c1507);
        }
        if (!c1507.removed) {
            if (parseInt(c1507.getPluginData('retain')) == 2)
                z1526(c1507);
        }
    }
    if (isEmpty(x2724.objects))
        y945(z2723, x2724);
} }
function x1505(c1507, i1504) { if (c1507.type == l1259 || c1507.type == g1262) {
    for (const child of c1507.children) {
        const found = x1505(child, i1504);
        if (found)
            return found;
    }
}
else {
    const found = i1504.find(o => c1507.getPluginData('objectId') == o[y1377] && c1507.getPluginData('userId') == figma.currentUser.id || o[q1383] == 2 && o[q1383] == c1507.getPluginData('retain'));
    if (found)
        return found;
} return null; }
function p1508(nodeIds, m1509) { const paintStyles = figma.getLocalPaintStyles(); paintStyles.filter(s => nodeIds.includes(s.getPluginData('nodeId'))).forEach(s => { const nodeId = s.getPluginData('nodeId'); const existing = f925(s.getPluginData('existing')); if (!existing) {
    s.remove();
}
else if (m1509) {
    u947(c2725, a => a.nodeId == nodeId);
    s.setPluginData('type', NULL);
    s.setPluginData('nodeId', NULL);
    s.setPluginData('existing', NULL);
} }); if (m1509)
    c2725 = c2725.filter(a => !nodeIds.includes(a.nodeId)); }
var v1510 = false;
function b1511(e) { for (const change of e.documentChanges) {
    switch (change.type) {
        case 'STYLE_CREATE':
            if (!change.style)
                break;
            if (!v1510) {
                change.style.setPluginData('type', NULL);
                change.style.setPluginData('nodeId', NULL);
                change.style.setPluginData('existing', NULL);
            }
            break;
        case 'STYLE_PROPERTY_CHANGE': {
            if (!change.style)
                break;
            if (!v1510) {
                const msg = { cmd: 'uiStylePropertyChange', styleId: t948(change.id), properties: change.properties, name: '', paints: [] };
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
                j1520(msg);
            }
            break;
        }
        case 'STYLE_DELETE':
            j1520({ cmd: 'uiStyleDelete', styleId: change.id });
            break;
    }
} v1510 = false; }
function l1512() { y1501(); j1520({ cmd: 'updateMetrics' }); }
figma.ui.onmessage = function (msg) { msg = JSON.parse(msg); if (msg.cmd == 'returnUiGetValueForFigma')
    return; switch (msg.cmd) {
    case 'figStartGenerator':
        n1513();
        break;
    case 'figRestartGenerator':
        r1514();
        break;
    case 'figFinishStart':
        k1515();
        break;
    case 'figDockWindowNormal':
        g2732('normal');
        break;
    case 'figDockWindowMaximize':
        g2732('maximize');
        break;
    case 'figDockWindowTop':
        g2732('top');
        break;
    case 'figDockWindowLeft':
        g2732('left');
        break;
    case 'figDockWindowRight':
        g2732('right');
        break;
    case 'figDockWindowBottom':
        g2732('bottom');
        break;
    case 'figGetMousePosition':
        l1586(msg.clientPosition);
        break;
    case 'figResizeWindow':
        n1589(msg.width, msg.height);
        break;
    case 'figSetWindowRect':
        k1587(msg.x, msg.y, msg.width, msg.height);
        break;
    case 'figNotify':
        p1590(msg);
        break;
    case 'figGetLocalData':
        b1538(msg.key);
        break;
    case 'figSetLocalData':
        g1539(msg.key, msg.value);
        break;
    case 'figClearAllLocalData':
        u4025();
        break;
    case 'figGetPageData':
        y1540(msg.key);
        break;
    case 'figSetPageData':
        c1541(msg.key, msg.value);
        break;
    case 'figSavePages':
        e1546(msg.pageIds, msg.pageJson, msg.currentPageId);
        break;
    case 'figLoadNodesAndConns':
        f1543(msg.debugMode);
        break;
    case 'figSaveNodes':
        f1547(msg.nodeIds, msg.nodeJson);
        break;
    case 'figGetAllLocalTemplateNames':
        r2729();
        break;
    case 'figSaveLocalTemplate':
        k1548(msg.z4026, msg.template);
        break;
    case 'figRemoveConnsToNodes':
        b1549(msg.nodeIds);
        break;
    case 'figRemoveSavedNodesAndConns':
        j1550(msg.nodeIds);
        break;
    case 'figRemoveAllSavedNodesAndConns':
        l1551();
        break;
    case 'figLogAllSavedNodesAndConns':
        h1552(msg.a4001);
        break;
    case 'figLogAllSavedNodes':
        z1553(msg.a4001);
        break;
    case 'figLogAllSavedConns':
        x1554(msg.a4001);
        break;
    case 'figLogAllSavedPageKeys':
        i1555(msg.a4001);
        break;
    case 'figLogAllSavedPages':
        a1556(msg.a4001);
        break;
    case 'figLogAllSavedConnKeys':
        w1557(msg.a4001);
        break;
    case 'figLogAllLocalData':
        y1558(msg.a4001);
        break;
    case 'figGetValue':
        l1559(msg.key, msg.spec);
        break;
    case 'figRemoveSavedPage':
        z1561(msg.pageId);
        break;
    case 'figRemoveAllSavedPages':
        n1562();
        break;
    case 'figSaveConnection':
        w1563(msg.key, msg.json);
        break;
    case 'figSaveConnections':
        b1564(msg.keys, msg.json);
        break;
    case 'figUpdateSavedConnections':
        c1565(msg.curKeys, msg.newKeys, msg.json);
        break;
    case 'figDeleteSavedConnection':
        r1566(msg.key);
        break;
    case 'figRemoveAllSavedConnections':
        h1567();
        break;
    case 'figDeleteSavedConnectionsToNode':
        q1568(msg.nodeId);
        break;
    case 'figDeleteSavedConnectionsFromNode':
        b1569(msg.nodeId);
        break;
    case 'figRemovePluginDataFromAllLocalStyles':
        c1570();
        break;
    case 'figGetAllLocalVariables':
        i1594(msg.nodeId, msg.px, msg.py);
        break;
    case 'figLinkNodeToVariable':
        o1596(msg.nodeId, msg.variableId);
        break;
    case 'figUpdateVariable':
        w1597(msg.variableId, msg.value);
        break;
    case 'figGetAllLocalColorStyles':
        n1571(msg.nodeId, msg.px, msg.py);
        break;
    case 'figLinkNodeToExistingColorStyle':
        e1572(msg.nodeId, msg.styleId);
        break;
    case 'figGetObjectSize':
        x1525(msg.object);
        break;
    case 'figGetVariableUpdates':
        y1560(msg.linkedVarIds);
        break;
    case 'figUpdateShowIds':
        w2793 = msg.w2793;
        break;
    case 'figUpdateObjectCenterSize':
        objectCenterSize = msg.objectCenterSize;
        break;
    case 'figDeleteAllObjects':
        y1501();
        break;
    case 'figUpdateObjectsAndStyles':
        o2738 = 0;
        c2739 = 0;
        msg.objects.forEach(o => o.counted = false);
        d2726(null, msg.objects, msg.m4015, msg.u2043, msg.nodeIds, msg.i2755, msg.a2756, msg.r270);
        s1577(msg);
        break;
    case 'figDeleteObjectsAndStyles':
        m1500(msg.nodeIds);
        p1508(msg.nodeIds, msg.m1509);
        break;
    case 'figDeleteObjectsExcept':
        v1503(msg.nodeIds, msg.ignoreObjects);
        break;
    case 'figTriggerUndo':
        figma.triggerUndo();
        break;
    case 'figCommitUndo':
        figma.commitUndo();
        break;
} j1520({ cmd: 'uiEndFigMessage', msgCmd: msg.cmd }); };
function j1520(msg) { figma.ui.postMessage(JSON.stringify(msg)); }
function l2727(key) {
    return __awaiter(this, void 0, void 0, function* () { return yield figma.clientStorage.getAsync(key); });
}
function b1538(key) { if (key == 'canvasEmpty') {
    j1520({ cmd: 'uiReturnFigGetLocalData', key: key, value: figma.currentPage.children.length == 0 });
}
else if (key == 'debugWarningCrash') {
    figma.clientStorage.getAsync('debugWarning').then(data => { j1520({ cmd: 'uiReturnFigGetLocalData', key: key, value: data }); });
}
else {
    figma.clientStorage.getAsync(key).then(data => { j1520({ cmd: 'uiReturnFigGetLocalData', key: key, value: data }); });
} }
function g1539(key, value, postToUi = true) { figma.clientStorage.setAsync(key, value); if (postToUi) {
    j1520({ cmd: 'uiReturnFigSetLocalData', key: key, value: value });
} }
function u4025() {
    return __awaiter(this, void 0, void 0, function* () { const keys = yield figma.clientStorage.keysAsync(); for (const key of keys)
        figma.clientStorage.deleteAsync(key); });
}
function y1540(key, postToUi = true) { const data = figma.currentPage.getPluginData(key); if (postToUi) {
    j1520({ cmd: 'uiReturnFigGetPageData', key: key, value: data });
} return data; }
function c1541(key, value) { t1542(key); figma.currentPage.setPluginData(key, value); }
function t1542(key) { figma.currentPage.setPluginData(key, ''); }
function f1543(debugMode) { const pageKeys = figma.currentPage.getPluginDataKeys().filter(k => r1053(k)); const nodeKeys = figma.currentPage.getPluginDataKeys().filter(k => a1054(k)); const connKeys = figma.currentPage.getPluginDataKeys().filter(k => z1055(k)); if (!debugMode)
    v1545(nodeKeys, connKeys); const pages = pageKeys.map(k => figma.currentPage.getPluginData(k)); const nodes = nodeKeys.map(k => figma.currentPage.getPluginData(k)); const f2115 = connKeys.map(k => figma.currentPage.getPluginData(k)); const pageOrder = figma.currentPage.getPluginData('pageOrder').split(','); const currentPageId = figma.currentPage.getPluginData('currentPageId'); a1544(nodes); const showAllColorSpaces = figma.currentPage.getPluginData('showAllColorSpaces'); j1520({ cmd: 'uiReturnFigLoadNodesAndConns', showAllColorSpaces: showAllColorSpaces, pageKeys: pageKeys, pageJson: pages, pageOrder: pageOrder, currentPageId: currentPageId, nodeKeys: nodeKeys, nodeJson: nodes, connKeys: connKeys, connJson: f2115 }); }
function a1544(nodes) { c2725 = []; const paintStyles = figma.getLocalPaintStyles(); for (const m3012 of nodes) {
    const node = JSON.parse(m3012);
    if (node.type == t1216) {
        const style = paintStyles.find(s => { const nodeId = s.getPluginData('nodeId'); return nodeId == node.id; });
        if (style) {
            c2725.push({ nodeId: node.id, existing: f925(node.existing), styles: [style] });
        }
    }
} }
function v1545(nodeKeys, connKeys) { const x2728 = '"loading": "true"'; const not = '{\n'; const set = '{\n' + h868 + x2728 + ',\n'; nodeKeys.forEach(k => figma.currentPage.setPluginData(k, figma.currentPage.getPluginData(k).replace(set, not).replace(not, set))); connKeys.forEach(k => figma.currentPage.setPluginData(k, figma.currentPage.getPluginData(k).replace(set, not).replace(not, set))); }
function e1546(pageIds, pageJson, currentPageId) { for (let i = 0; i < pageIds.length; i++) {
    c1541(q924(pageIds[i]), pageJson[i]);
} c1541('pageOrder', pageIds.join(',')); c1541('currentPageId', currentPageId); }
function f1547(nodeIds, nodeJson) { for (let i = 0; i < nodeIds.length; i++) {
    c1541(g922(nodeIds[i]), nodeJson[i]);
} }
function r2729() {
    return __awaiter(this, void 0, void 0, function* () { let keys = yield figma.clientStorage.keysAsync(); keys = keys.filter(k => k.length >= g876.length && k.substring(0, g876.length) == g876); j1520({ cmd: 'uiReturnGetAllLocalTemplateNames', templateNames: keys }); });
}
function k1548(z4026, template) { g1539(g876 + ' ' + z4026, template); }
function b1549(nodeIds) { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => z1055(k)); for (const key of connKeys) {
    const parts = t1058(key).split(' ');
    if (nodeIds.includes(parts[0]) || nodeIds.includes(parts[2]))
        t1542(key);
} }
function j1550(nodeIds) { b1549(nodeIds); const nodeKeys = figma.currentPage.getPluginDataKeys().filter(k => a1054(k) && nodeIds.includes(t1057(k))); nodeKeys.forEach(k => t1542(k)); }
function l1551() { const nodeKeys = figma.currentPage.getPluginDataKeys().filter(k => a1054(k)); const connKeys = figma.currentPage.getPluginDataKeys().filter(k => z1055(k)); for (const key of nodeKeys)
    t1542(key); for (const key of connKeys)
    t1542(key); }
function h1552(a4001) { z1553(a4001); x1554(a4001); }
function z1553(a4001) { figma.currentPage.getPluginDataKeys().filter(k => a1054(k)).forEach(k => e2095(k, a4001)); }
function x1554(a4001) { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => z1055(k)); connKeys.sort((key1, key2) => { const p1 = t1058(key1).split(' '); const p2 = t1058(key2).split(' '); if (p1[2] != p2[2])
    return p1[2] < p2[2] ? -1 : 1; if (p1[3] != p2[3])
    return parseInt(p1[3]) - parseInt(p2[3]); if (p1[2] == p2[0])
    return -1; if (p2[2] == p1[0])
    return 1; return 0; }); connKeys.forEach(k => a2098(JSON.parse(figma.currentPage.getPluginData(k)), a4001)); }
function i1555(a4001) { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => r1053(k)); connKeys.forEach(k => console.log('%c' + k, 'background: #fff; color: ' + (a4001 ? 'black' : 'white'))); const pageOrder = figma.currentPage.getPluginData('pageOrder'); console.log('%c' + pageOrder, 'background: #fff; color: ' + (a4001 ? 'black' : 'white')); }
function a1556(a4001) { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => r1053(k)); connKeys.forEach(k => console.log('%c' + figma.currentPage.getPluginData(k), 'background: #fff; color: ' + (a4001 ? 'black' : 'white'))); const pageOrder = figma.currentPage.getPluginData('pageOrder'); console.log('%c' + pageOrder, 'background: #fff; color: ' + (a4001 ? 'black' : 'white')); }
function w1557(a4001) { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => z1055(k)); connKeys.forEach(k => console.log('%c' + k, 'background: #dff; color: ' + (a4001 ? 'black' : 'white'))); }
function y1558(a4001) { figma.clientStorage.keysAsync().then(keys => keys.forEach(k => figma.clientStorage.getAsync(k).then(val => console.log(k + ': ' + val)))); }
function l1559(key, spec) {
    return __awaiter(this, void 0, void 0, function* () { let result = null; switch (key) {
        case 'getVariableData':
            result = y1595(spec);
            break;
        case 'getPaidStatus':
            result = figma.payments.status.type;
            break;
        case 'figSubscribe': {
            yield figma.payments.initiateCheckoutAsync({ interstitial: 'PAID_FEATURE' });
            result = figma.payments.status.type;
            break;
        }
    } j1520({ cmd: 'returnFigGetValue', value: result }); });
}
function y1560(varIds) { j1520({ cmd: 'uiReturnFigGetVariableUpdates', values: y1595(varIds) }); }
function z1561(pageId) { t1542(z934(pageId)); const pageOrder = y1540('pageOrder').split(','); u947(pageOrder, id => id == pageId); c1541('pageOrder', pageOrder.join(',')); }
function n1562() { const pageKeys = figma.currentPage.getPluginDataKeys().filter(k => r1053(k)); pageKeys.forEach(k => t1542(k)); t1542('pageOrder'); }
function w1563(key, json) { c1541(key, json); }
function b1564(_keys, _json) { const keys = JSON.parse(_keys); const json = JSON.parse(_json); for (let i = 0; i < keys.length; i++)
    c1541(keys[i], json[i]); }
function c1565(_curKeys, _newKeys, _json) { const curKeys = JSON.parse(_curKeys); const newKeys = JSON.parse(_newKeys); const json = JSON.parse(_json); for (let i = 0; i < curKeys.length; i++) {
    t1542(curKeys[i]);
    c1541(newKeys[i], json[i]);
} }
function r1566(key) { t1542(key); }
function h1567() { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => z1055(k)); connKeys.forEach(k => t1542(k)); }
function q1568(nodeId) { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => z1055(k)); for (const key of connKeys) {
    const parts = key.split(' ');
    if (parts[4] == nodeId)
        t1542(key);
} }
function b1569(nodeId) { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => z1055(k)); for (const key of connKeys) {
    const parts = key.split(' ');
    if (parts[1] == nodeId)
        t1542(key);
} }
function c1570() { const c1574 = figma.getLocalPaintStyles(); for (const style of c1574) {
    style.setPluginData('type', '');
    style.setPluginData('nodeId', '');
    style.setPluginData('existing', '');
} }
var o2730 = null;
var x4027 = () => o2730 = null;
var v2731 = 'normal';
function l1586(clientPosition) { j1520({ cmd: 'uiReturnFigGetMousePosition', position: { x: 0, y: 0 }, clientPosition: clientPosition, viewportZoom: figma.viewport.zoom, viewportRect: figma.viewport.bounds }); }
function k1587(x, y, width, height) { return; (function () {
    return __awaiter(this, void 0, void 0, function* () { const rect = { x: Math.round(x), y: Math.round(y), width: Math.floor(Math.max(0, width)), height: Math.floor(Math.max(0, height)) }; figma.ui.reposition(rect.x, rect.y); figma.ui.resize(rect.width, rect.height); figma.clientStorage.setAsync('windowX', rect.x); figma.clientStorage.setAsync('windowY', rect.y); figma.clientStorage.setAsync('windowWidth', rect.width); figma.clientStorage.setAsync('windowHeight', rect.height); j1520({ cmd: 'uiReturnFigSetWindowRect' }); });
})(); }
function g1588(dock, rect, bounds) { switch (dock) {
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
function n1589(width, height) { (function () {
    return __awaiter(this, void 0, void 0, function* () { width = Math.floor(Math.max(0, width)); height = Math.floor(Math.max(0, height)); figma.ui.resize(width, height); figma.currentPage.setPluginData(figma.currentUser.id + ',windowWidth', width.toString()); figma.currentPage.setPluginData(figma.currentUser.id + ',windowHeight', height.toString()); j1520({ cmd: 'uiReturnFigResizeWindow', width: width, height: height }); });
})(); }
function g2732(dock) {
    return __awaiter(this, void 0, void 0, function* () { if (dock != 'normal' && v2731 == 'normal') {
        figma.clientStorage.setAsync('normalWindowX', yield figma.clientStorage.getAsync('normalWindowX'));
        figma.clientStorage.setAsync('normalWindowY', yield figma.clientStorage.getAsync('normalWindowY'));
        figma.clientStorage.setAsync('normalWindowWidth', yield figma.clientStorage.getAsync('normalWindowWidth'));
        figma.clientStorage.setAsync('normalWindowHeight', yield figma.clientStorage.getAsync('normalWindowHeight'));
    } v2731 = dock; figma.clientStorage.setAsync('windowDock', dock); n1589(yield figma.clientStorage.getAsync('windowWidth'), yield figma.clientStorage.getAsync('windowHeight')); });
}
function p1590(msg) { l1591(msg.text, msg.prefix, msg.delay, msg.error, msg.d1592, msg.q1593); }
function l1591(text, prefix = 'Generator ', delay = 400, error = false, d1592 = '', q1593 = NULL) { const options = { timeout: delay, error: error, onDequeue: x4027 }; if (d1592 != '') {
    options['button'] = { text: d1592 };
    if (q1593.substring(0, 'removeConnection'.length) == 'removeConnection') {
        options['button']['action'] = () => r1566(q1593.split(',')[1]);
    }
    else {
        switch (q1593) {
            case 'hideClearUndoWarning':
                options['button']['action'] = () => j1520({ cmd: 'uiHideClearUndoWarning' });
                break;
        }
    }
} if (o2730)
    o2730.cancel(); o2730 = figma.notify(prefix + text, options); }
function w2733(key, params = null) {
    return __awaiter(this, void 0, void 0, function* () { return yield v2734(key, params); });
}
function v2734(key, params = null) {
    return __awaiter(this, void 0, void 0, function* () { return new Promise((resolve, reject) => { const timeout = 60000; j1520(Object.assign({ cmd: 'uiGetValueForFigma', key: key }, (params || {}))); const m2735 = setTimeout(() => reject(new Error('Timeout: Result not received by Figma within the specified time')), timeout); function c4028(msg) { msg = JSON.parse(msg); if (msg.cmd === 'returnUiGetValueForFigma') {
        clearTimeout(m2735);
        resolve({ key: msg.key, value: msg.value });
        figma.ui.off('message', c4028);
    } } figma.ui.on('message', c4028); }); });
}
var i2736 = [];
var o2737 = [];
var o2738 = 0;
var c2739 = 0;
function d1521(u111) { return (u111[q1383] === 2 ? '' : w872) + (w2793 ? u111[y1377] : u111[j1379]); }
function y1522(d1506, addObject = null) { if (!x1524(d1506))
    return null; let c1507; switch (d1506[i1375]) {
    case o1219:
        c1507 = s2707(d1506);
        break;
    case z1222:
        c1507 = d2786(d1506);
        break;
    case z1225:
        c1507 = k2782(d1506);
        break;
    case u1231:
        c1507 = x2703(d1506);
        break;
    case y1234:
        c1507 = s2710(d1506);
        break;
    case e1237:
        c1507 = t2713(d1506);
        break;
    case h1240:
        c1507 = o2689(d1506);
        break;
    case l1244:
        c1507 = m2741(d1506);
        break;
    case s1256:
        c1507 = z2742(d1506);
        break;
    case h1279:
        c1507 = w2743(d1506);
        break;
    case l1259:
        c1507 = w2744(d1506);
        break;
    case g1262:
        c1507 = o2745(d1506);
        break;
} if (addObject && c1507 != undefined && c1507 != null && !c1507.removed) {
    c1507.name = d1521(d1506);
    m954(d1506[i1375] == l1259 || !!c1507, 'no Figma object created');
    if (c1507 != undefined && c1507 != null) {
        c1507.setPluginData('retain', d1506[q1383].toString());
        if (d1506[q1383] < 2) {
            c1507.setPluginData('userId', figma.currentUser.id);
            c1507.setPluginData('sessionId', figma.currentUser.sessionId.toString());
            c1507.setPluginData('type', d1506[i1375]);
            c1507.setPluginData('nodeId', d1506[h1376]);
            c1507.setPluginData('objectId', d1506[y1377]);
            c1507.setPluginData('isCenter', p939(d1506[j1398]));
            if (d1506[i1375] == h1240)
                s2759.push(c1507);
            if (d1506[y1397])
                b1537(c1507);
        }
        addObject(c1507);
    }
} if (!d1506.counted) {
    c2739++;
    d1506.counted = true;
} return c1507; }
function s1523(c1507, d1506) { if (!x1524(d1506) || c1507 == undefined || c1507 == null || c1507.removed)
    return; c1507.name = d1521(d1506); c1507.setPluginData('retain', d1506[q1383].toString()); switch (d1506[i1375]) {
    case o1219:
        e2708(c1507, d1506);
        break;
    case z1222:
        s2787(c1507, d1506);
        break;
    case z1225:
        x2783(c1507, d1506);
        break;
    case u1231:
        v2704(c1507, d1506);
        break;
    case y1234:
        b2711(c1507, d1506);
        break;
    case e1237:
        c2714(c1507, d1506);
        break;
    case h1240:
        h2746(c1507, d1506);
        break;
    case l1244:
        x2747(c1507, d1506);
        break;
    case s1256:
        a2748(c1507, d1506);
        break;
    case h1279:
        z2749(c1507, d1506);
        break;
    case l1259:
        u2750(c1507, d1506);
        break;
    case g1262:
        u2751(c1507, d1506);
        break;
} if (c1507 != undefined && c1507 != null && !c1507.removed) {
    c1507.parent.appendChild(c1507);
    if (d1506[y1397])
        b1537(c1507);
} if (!d1506.counted) {
    c2739++;
    d1506.counted = true;
} }
function d2726(s2752, n2753, w2754, u2043 = -1, nodeIds = [], i2755 = false, a2756 = false, r270 = false) {
    return __awaiter(this, void 0, void 0, function* () { let x2757 = NULL; let z2758 = null; let abort = false; const c3636 = []; let c2740 = 0; i2736.push(...nodeIds); if (u2043 > -1)
        o2738 = u2043; for (const d1506 of n2753) {
        o2737.push(d1506);
        if (d1506[h1376] != x2757) {
            x2757 = d1506[h1376];
            z2758 = z2723.find(a => a.nodeId == d1506[h1376]);
            if (!z2758) {
                z2723.push(z2758 = { nodeId: d1506[h1376], objects: [] });
            }
        }
        const addObject = c1507 => { if (s2752 != undefined && s2752 != null && !s2752.removed)
            s2752.appendChild(c1507);
        else
            z2758.objects.push(c1507); };
        let objects = s2752 != undefined && s2752 != null && !s2752.removed ? s2752.children : z2758.objects;
        let c1507 = objects.find(o => o.removed || o.getPluginData('userId') == figma.currentUser.id && o.getPluginData('objectId') == d1506[y1377]);
        if (c1507 != undefined && c1507 != null && c1507.removed) {
            s940(objects, c1507);
            if (s2759.includes(c1507))
                y945(s2759, c1507);
            if (y2775.includes(c1507))
                y945(y2775, c1507);
        }
        if (c1507 == undefined || c1507 == null || c1507.removed) {
            const newObj = y1522(d1506, addObject);
            c3636.push(newObj);
        }
        else if (c1507 != undefined && c1507 != null && !c1507.removed && c1507.getPluginData('type') == d1506[i1375].toString()) {
            s1523(c1507, d1506);
            if (c1507 != undefined && c1507 != null && !c1507.removed)
                c3636.push(c1507);
        }
        else {
            c1507.remove();
            if (s2759.includes(c1507))
                y945(s2759, c1507);
            if (y2775.includes(c1507))
                y945(y2775, c1507);
            y1522(d1506, addObject);
        }
        c2740++;
        if (c2740 >= w2754) {
            const result = yield w2733('returnObjectUpdate', { o2738: o2738, c2739: c2739 });
            abort = result.value;
            c2740 = 0;
            if (abort)
                break;
        }
    } if (s2752 != undefined && s2752 != null && !s2752.removed) {
        for (const c1507 of s2752.children) {
            if (c1507 != undefined && c1507 != null && c1507.removed || !n2753.find(o => o[y1377] == c1507.getPluginData('objectId') && c1507.getPluginData('userId') == figma.currentUser.id))
                c1507.remove();
        }
    } for (const point of s2759) {
        if (point != undefined && point != null && !point.removed && !point.parent.removed)
            point.parent.appendChild(point);
    } if (a2756 && !abort) {
        v1503(i2736, o2737);
        i2736 = [];
        o2737 = [];
        if (r270 && c3636.length > 0) {
            figma.viewport.scrollAndZoomIntoView(c3636);
            const bounds = d1527(c3636);
            figma.viewport.zoom = Math.min(figma.viewport.bounds.width * figma.viewport.zoom / bounds.width - 0.05, figma.viewport.bounds.height * figma.viewport.zoom / bounds.height - 0.05);
        }
    } yield w2733('returnObjectUpdate', { o2738: o2738, c2739: c2739 }); });
}
function x1524(d1506) { switch (d1506[i1375]) {
    case o1219: return v2706(d1506);
    case z1222: return y2768(d1506);
    case z1225: return q2769(d1506);
    case u1231: return i4024(d1506);
    case y1234: return n2709(d1506);
    case e1237: return h2712(d1506);
    case h1240: return i4023(d1506);
    case l1244: return v2770(d1506);
    case s1256: return b2771(d1506);
    case h1279: return g2772(d1506);
    case l1259: return w2773(d1506);
    case g1262: return o2774(d1506);
} }
function x1525(d1506) { (() => __awaiter(this, void 0, void 0, function* () { const c1507 = y1522(d1506); const width = c1507.width; const height = c1507.height; c1507.remove(); j1520({ cmd: 'uiForwardToGenerator', msg: { cmd: 'returnFigGetObjectSize', objectId: d1506[y1377], width: width, height: height } }); }))(); }
function z1526(c1507) { c1507.setPluginData('type', ''); c1507.setPluginData('nodeId', ''); c1507.setPluginData('userId', ''); c1507.setPluginData('sessionId', ''); c1507.setPluginData('objectId', ''); c1507.setPluginData('isCenter', ''); c1507.setPluginData('retain', ''); }
function d1527(objects) { const bounds = { left: 0, top: 0, right: 0, bottom: 0 }; for (const u111 of objects) {
    if (u111.x < bounds.left || bounds.left == bounds.right)
        bounds.left = u111.x;
    if (u111.y < bounds.top || bounds.top == bounds.bottom)
        bounds.top = u111.y;
    if (u111.x + u111.width > bounds.right || bounds.left == bounds.right)
        bounds.right = u111.x + u111.width;
    if (u111.y + u111.height > bounds.bottom || bounds.top == bounds.bottom)
        bounds.bottom = u111.y + u111.height;
} return { x: bounds.left, y: bounds.top, width: bounds.right - bounds.left, height: bounds.bottom - bounds.top }; }
const y2775 = [];
const s2776 = [];
function p1528(s1529, l1530) { const effects = []; for (const effect of s1529) {
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
                if (l1530 && !isNaN(spread))
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
function p2696(c1507, d1506, phantom = true) { d1533(c1507, d1506); r2697(c1507, d1506, phantom); e2698(c1507, d1506); c1507.opacity = d1506[y1399]; c1507.blendMode = d1506[a1400]; const maskType = d1506[a1401]; c1507.isMask = maskType > 0; if (c1507.isMask) {
    switch (maskType) {
        case 1:
            c1507.maskType = 'ALPHA';
            break;
        case 2:
            c1507.maskType = 'VECTOR';
            break;
        case 3:
            c1507.maskType = 'LUMINANCE';
            break;
    }
} if (c1507.isMask && c1507.fills.length == 0 && c1507.strokes.length == 0)
    c1507.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 }, opacity: 1, blendMode: 'NORMAL' }]; }
function e2698(c1507, d1506) { if (!!d1506[r1388] && !isEmpty(d1506[r1388])) {
    c1507.fills = e958(d1506[r1388]);
    if (y2775.includes(c1507))
        y945(y2775, c1507);
}
else
    c1507.fills = []; }
function r2697(c1507, d1506, phantom = true) { if (d1506[t1389] != null && !isEmpty(d1506[t1389])) {
    k1532(c1507, e958(d1506[t1389]), d1506[b1390], d1506[n1391], d1506[b1392], d1506[v1393], d1506[x1394], h2699(d1506[x1395]));
    if (d1506[y1397])
        c1507.setPluginData('dashes', d1506[x1395]);
    if (y2775.includes(c1507))
        y945(y2775, c1507);
    if (d1506[y1397])
        p951(s2776, c1507);
}
else if (isEmpty(d1506[r1388]) && isEmpty(d1506[t1389]) && !d1506[a1401] && phantom) {
    p1535(c1507);
    p951(y2775, c1507);
}
else
    c1507.strokes = []; }
function h2699(t1531) { t1531 = t1531; t1531 = v956(t1531, ','); t1531 = w957(t1531, ','); t1531 = t1531.trim(); return t1531 == '' ? [] : t1531.split(',').map(s => Math.max(0, parseFloat(s))); }
function b2700(t1531) { t1531 = t1531; t1531 = v956(t1531, ','); t1531 = w957(t1531, ','); t1531 = t1531.trim(); return t1531 == '' ? [] : t1531.split(',').map(s => Math.max(0, parseFloat(s) / w2702)); }
function k1532(c1507, fills, weight, align, join, miterLimit, cap, dashes = []) { c1507.strokes = fills; c1507.strokeWeight = Math.max(0, weight); c1507.strokeAlign = align; c1507.strokeJoin = join; const miterAngle = miterLimit / 360 * Tau; const s2777 = 1 / Math.sin(miterAngle / 2); c1507.strokeMiterLimit = Math.min(Math.max(0, s2777), 16); c1507.strokeCap = cap; c1507.dashPattern = dashes; }
function d1533(c1507, d1506) { if (!!d1506[w1396] && !isEmpty(d1506[w1396])) {
    const l1530 = d1506[i1375] == o1219 || d1506[i1375] == z1225 || d1506[i1375] == g1262;
    c1507.effects = p1528(d1506[w1396], l1530);
}
else
    c1507.effects = []; }
function w1534() { for (const u111 of y2775) {
    if (u111.removed)
        y945(y2775, u111);
    else
        p1535(u111);
} }
function p1535(u111) { const back = figma.currentPage.backgrounds.find(b => b.type == 'SOLID'); let phantomColor; if (back) {
    const l = back.color.r * 0.2126 + back.color.g * 0.7152 + back.color.b * 0.0722;
    phantomColor = l > 0.5 ? { r: 0, g: 0, b: 0 } : { r: 1, g: 1, b: 1 };
}
else
    phantomColor = { r: 1, g: 0, b: 1 }; k1532(u111, [{ type: 'SOLID', color: phantomColor, opacity: 0.5 }], 1 / w2702, 'CENTER', 'MITER', 1, 'NONE', [1 / w2702, 2 / w2702]); }
function i1536() { for (const c1507 of s2776) {
    if (c1507.removed)
        y945(s2776, c1507);
    else
        b1537(c1507);
} }
function b1537(c1507) { c1507.strokeWeight = Math.max(0, 1.5 / w2702); if (f925(c1507.getPluginData('isCenter'))) {
    const path = c1507.vectorPaths[0];
    const parts = path.data.split(' ');
    let t = { x: parseFloat(parts[1]), y: parseFloat(parts[2]) };
    let c = { x: parseFloat(parts[4]), y: parseFloat(parts[5]) };
    let r = { x: parseFloat(parts[7]), y: parseFloat(parts[8]) };
    const a = 2;
    const b = 0.05;
    const f = 1 - Math.pow(1 - Math.min(w2702, 1), a) / Math.pow(a, b);
    t = h897(c, k899(j884(o902(t, c)), objectCenterSize / f));
    r = h897(c, k899(j884(o902(r, c)), objectCenterSize / f));
    parts[1] = t.x;
    parts[2] = t.y;
    parts[4] = c.x;
    parts[5] = c.y;
    parts[7] = r.x;
    parts[8] = r.y;
    const d2778 = { windingRule: path.windingRule, data: parts.join(' ') };
    c1507.vectorPaths = [d2778];
} const dashes = c1507.getPluginData('dashes'); if (dashes != '')
    c1507.dashPattern = b2700(dashes); }
function n1571(nodeId, px, py) { const _styles = figma.getLocalPaintStyles(); const styles = new Array(); for (const z168 of _styles) {
    const _nodeId = z168.getPluginData('nodeId');
    const _existing = z168.getPluginData('existing');
    const existing = !!_existing;
    const style = { id: z168.id, nodeId: _nodeId, name: z168.name, existing: existing, paints: new Array() };
    let onlyPaint = true;
    for (const v2780 of z168.paints) {
        if (v2780.type == 'SOLID') {
            style.paints.push([v2780.color.r, v2780.color.g, v2780.color.b, v2780.opacity]);
        }
        else {
            onlyPaint = false;
            break;
        }
    }
    if (onlyPaint)
        styles.push(style);
} j1520({ cmd: 'uiReturnFigGetAllLocalColorStyles', nodeId: nodeId, px: px, py: py, styles: JSON.stringify(styles) }); }
function e1572(nodeId, styleId) { const c1574 = figma.getLocalPaintStyles(); if (styleId != NULL)
    k1573(c1574, nodeId, styleId);
else
    g1575(c1574, nodeId); }
function k1573(c1574, nodeId, styleId, clearExisting = true) { const j2779 = c2725.find(a => a.nodeId == nodeId); if (j2779 && clearExisting)
    g1575(c1574, nodeId); const c1579 = c1574.find(s => s.id == styleId); m954(!!c1579, 'figStyle should be found here'); c1579.setPluginData('type', t1216); c1579.setPluginData('nodeId', nodeId); c1579.setPluginData('existing', p939(true)); c2725.push({ nodeId: nodeId, existing: true, styles: [c1579] }); return c1579; }
function g1575(c1574, nodeId) { const c1579 = c1574.find(s => s.getPluginData('nodeId') == nodeId); m954(!!c1579, 'figStyle should be found here'); if (c1579) {
    c1579.setPluginData('type', NULL);
    c1579.setPluginData('nodeId', NULL);
    c1579.setPluginData('existing', NULL);
    u947(c2725, a => a.nodeId == nodeId);
} return c1579; }
function j1576(styles, s1580) { const c1579 = figma.createPaintStyle(); c1579.setPluginData('type', s1580[i1375]); c1579.setPluginData('nodeId', s1580[h1376]); c1579.name = s1580[k1380]; setStylePaints(c1579, s1580); styles.push(c1579); j1520({ cmd: 'uiSetStyleId', nodeId: s1580[h1376], styleId: c1579.id }); return c1579; }
function s1577(msg) { let x2757 = NULL; let j2779; for (const s1580 of msg.styles) {
    if (s1580[h1376] != x2757) {
        x2757 = s1580[h1376];
        j2779 = c2725.find(a => a.nodeId == s1580[h1376]);
        if (!j2779) {
            j2779 = { nodeId: s1580[h1376], styles: [] };
            c2725.push(j2779);
        }
    }
    else
        j2779 = null;
    const c1579 = j2779.styles[0];
    const c1574 = figma.getLocalPaintStyles();
    const localStyle = c1574.find(s => s.getPluginData('nodeId') == s1580[h1376]);
    if (isValid(c1579) && !isValid(localStyle)) {
        s940(j2779.styles, c1579);
    }
    const existing = isValid(c1579) && isValid(localStyle) && c1579.getPluginData('existing');
    if (!isValid(c1579) || !isValid(localStyle)) {
        if (!existing) {
            v1510 = true;
            e1572(s1580[h1376], s1580[g1378]);
        }
    }
    else if (isValid(c1579) && c1579.getPluginData('type') == s1580[i1375]) {
        v1510 = true;
        s1578(localStyle, s1580);
    }
} }
function s1578(c1579, s1580) { setStylePaints(c1579, s1580); c1579.name = s1580[k1380]; }
function getStylePaints(stylePaints) { const paints = new Array(); for (const v2780 of stylePaints) {
    const fill = v2780[1].split(' ');
    switch (v2780[0]) {
        case 'SOLID':
            paints.push({ type: 'SOLID', color: { r: Math.min(Math.max(0, parseFloat(fill[0]) / 0xff), 1), g: Math.min(Math.max(0, parseFloat(fill[1]) / 0xff), 1), b: Math.min(Math.max(0, parseFloat(fill[2]) / 0xff), 1) }, opacity: Math.min(Math.max(0, parseFloat(fill[3]) / 100), 1) });
            break;
    }
} return paints; }
function setStylePaints(c1579, s1580) { if (!isEmpty(s1580[u1382]))
    c1579.paints = getStylePaints(s1580[u1382]);
else
    c1579.paints = []; }
function i1594(nodeId, px, py) { const f2781 = figma.variables.getLocalVariables(); const variables = new Array(); for (const _var of f2781) {
    const variable = { id: _var.id, resolvedType: _var.resolvedType, name: _var.name, collectionName: figma.variables.getVariableCollectionById(_var.variableCollectionId).name };
    variables.push(variable);
} j1520({ cmd: 'uiReturnFigGetAllLocalVariables', nodeId: nodeId, px: px, py: py, variables: JSON.stringify(variables), nCollections: figma.variables.getLocalVariableCollections().length }); }
function y1595(varIds) { const f2781 = figma.variables.getLocalVariables(); const variables = varIds.map(id => f2781.find(v => v.id == id)); let values = []; for (let i = 0; i < varIds.length; i++) {
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
function o1596(nodeId, varId) { const f2781 = figma.variables.getLocalVariables(); e1598(f2781, nodeId, varId); }
function w1597(varId, value) { const f2781 = figma.variables.getLocalVariables(); let variable = f2781.find(v => v.id == varId); if (!variable)
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
function e1598(f2781, nodeId, varId) { let variable = f2781.find(v => v.id == varId); if (!variable)
    return null; const [resolvedVar, values] = figGetResolvedVariableValues(variable); j1520({ cmd: 'uiReturnFigLinkNodeToVariable', nodeId: nodeId, variableId: resolvedVar ? resolvedVar.id : NULL, variableName: resolvedVar ? resolvedVar.name : '', resolvedType: resolvedVar ? resolvedVar.resolvedType : NULL, values: values }); return resolvedVar; }
function figGetResolvedVariableValues(variable) { const values = []; if (!variable)
    return values; const collection = figma.variables.getVariableCollectionById(variable.variableCollectionId); for (const mode of collection.modes) {
    let value = variable.valuesByMode[mode.modeId];
    while (value && value['type'] === 'VARIABLE_ALIAS') {
        variable = figma.variables.getVariableById(value.id);
        value = variable.valuesByMode[mode.modeId];
    }
    values.push(value);
} return [variable, values]; }
function t1581(tl, tr, bl) { let vr = point(tr.x - tl.x, tr.y - tl.y); let vb = point(bl.x - tl.x, bl.y - tl.y); let sx = vr.x; let sy = vb.y; let kx = -vr.y; let ky = -vb.x; let dx = -tl.x; let dy = -tl.y; const _sx = kx / nozero(sx); const _sy = ky / nozero(sy); let l4205 = n887([[1, _sy, 0], [_sx, 1, 0], [0, 0, 1]], c891(dx, dy)); l4205 = o889(l4205); const a = h881(vr); if (a > Tau / 4 && a < Tau * 3 / 4)
    l4205 = n887(l4205, c891(0, 0, 1, 1, Tau / 2)); if (determinant(l4205) < 0)
    l4205 = n887(l4205, c891(0, 0, -1, 1, 0)); return l4205; }
function t1582(c1507, tl, tr, bl) { const l4205 = t1581(tl, tr, bl); c1507.relativeTransform = [l4205[0], l4205[1]]; }
function n1583(c1507, d1506, setSize = true, noHeight = 0.01) { if (!d1506[b1384] || !d1506[l1385] || !d1506[e1386])
    return; const xp0 = d1506[b1384]; const xp1 = d1506[l1385]; const xp2 = d1506[e1386]; t1582(c1507, xp0, xp1, xp2); if (setSize) {
    const a892 = distv(xp0, xp1);
    const o893 = distv(xp0, xp2);
    const height = d1506[i1375] == e1237 ? d1506[c1419] : d1506[a1406];
    if (!c1507.removed) {
        c1507.resizeWithoutConstraints(Math.max(0.01, a892), height ? Math.max(0.01, o893) : noHeight);
    }
} }
function i1584(d2694, k2695) { if (d2694.removed)
    return; d2694.resizeWithoutConstraints(0.01, 0.01); d2694.setPluginData('actualX', k2695[b1402].toString()); d2694.setPluginData('actualY', k2695[j1404].toString()); d2694.x = k2695[b1402]; d2694.y = k2695[j1404]; d2694.rotation = k2695[j1398] ? 45 : 0; }
function z1585(d2694) { if (!d2694.removed)
    d2694.resizeWithoutConstraints(0.01, 0.01); }
function g2772(genBool) { return genBool.children.length > 0; }
function w2743(genBool) { let objects = []; for (const u111 of genBool.children)
    y1522(u111, o => objects = [...objects, o]); let figBool = null; if (!isEmpty(objects)) {
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
    n1583(figBool, genBool);
    if (!g2772(genBool))
        return figBool;
} return figBool; }
function z2749(figBool, genBool, isValid = false) { if (!isValid && !g2772(genBool)) {
    figBool.remove();
    return;
} n1583(figBool, genBool); d2726(figBool, genBool.children, genBool.children.length); }
function q2769(t2760) { return t2760[b1402] != null && !isNaN(t2760[b1402]) && t2760[j1404] != null && !isNaN(t2760[j1404]) && t2760[i1405] != null && !isNaN(t2760[i1405]) && t2760[a1406] != null && !isNaN(t2760[a1406]) && t2760[r1408] != null && !isNaN(t2760[r1408]) && t2760[b1415] != null && !isNaN(t2760[b1415]) && t2760[n1421] != null && !isNaN(t2760[n1421]) && t2760[d1425] != null && !isNaN(t2760[d1425]); }
function k2782(t2760) { if (!q2769(t2760))
    return null; const k2761 = figma.createEllipse(); x2783(k2761, t2760, true); return k2761; }
function x2783(k2761, t2760, isValid = false) { if (!isValid && !q2769(t2760))
    return; w2784(k2761, t2760); if (s2759.includes(k2761))
    o2691(k2761);
else
    p2696(k2761, t2760); }
function w2784(k2761, t2760) { k2761.cornerRadius = t2760[r1408]; const start = t2760[b1415] / 360 * (Math.PI * 2); const sweep = t2760[n1421] / 100 * (Math.PI * 2); k2761.arcData = { startingAngle: start, endingAngle: start + sweep, innerRadius: Math.min(Math.max(0, t2760[d1425] / 100), 1) }; n1583(k2761, t2760); }
function o2774(u2762) { return u2762[b1402] != null && !isNaN(u2762[b1402]) && u2762[j1404] != null && !isNaN(u2762[j1404]) && u2762[i1405] != null && !isNaN(u2762[i1405]) && u2762[a1406] != null && !isNaN(u2762[a1406]) && u2762[e1414] != null && !isNaN(u2762[e1414]); }
function o2745(u2762) { if (!o2774(u2762))
    return null; const n2763 = figma.createFrame(); if (n2763) {
    u2785(n2763, u2762);
    let objects = [];
    for (const u111 of u2762[j1420])
        y1522(u111, o => objects = [...objects, o]);
    for (const u111 of objects)
        n2763.appendChild(u111);
} return n2763; }
function u2751(n2763, u2762) { u2785(n2763, u2762); d2726(n2763, u2762[j1420], u2762[j1420].length); }
function u2785(n2763, u2762) { n2763.cornerRadius = u2762[e1414]; n1583(n2763, u2762); p2696(n2763, u2762, u2762[j1420].length == 0); }
function w2773(z2764) { return true; }
function w2744(z2764) { let objects = []; for (const u111 of z2764[e1403])
    y1522(u111, o => objects = [...objects, o]); const w2765 = !isEmpty(objects) ? figma.group(objects, figma.currentPage) : null; if (w2765)
    u2750(w2765, z2764); return w2765; }
function u2750(w2765, z2764) { if (z2764[e1403].length == 0) {
    w2765.remove();
    return;
} d2726(w2765, z2764[e1403], z2764[e1403].length); d1533(w2765, z2764); }
function y2768(v2766) { return v2766[b1402] != null && !isNaN(v2766[b1402]) && v2766[j1404] != null && !isNaN(v2766[j1404]) && v2766[i1405] != null && !isNaN(v2766[i1405]); }
function d2786(v2766) { if (!y2768(v2766))
    return null; const l2767 = figma.createLine(); s2787(l2767, v2766, true); return l2767; }
function s2787(l2767, v2766, isValid = false) { if (!isValid && !y2768(v2766))
    return; n1583(l2767, v2766, true, 0); p2696(l2767, v2766); }
var s2759 = [];
function i4023(k2695) { return k2695[b1402] != null && !isNaN(k2695[b1402]) && k2695[j1404] != null && !isNaN(k2695[j1404]); }
function o2689(k2695) { const d2694 = k2695[j1398] ? figma.createRectangle() : figma.createEllipse(); if (!i4023(k2695))
    return d2694; if (s2759.includes(d2694))
    d2693(d2694, k2695);
else
    h2746(d2694, k2695); return d2694; }
function h2746(d2694, k2695) { i1584(d2694, k2695); r2692(d2694); }
function p2690() { j1520({ cmd: 'uiUpdateZoom', zoom: figma.viewport.zoom }); for (const point of s2759)
    o2691(point); }
function o2691(d2694) { z1585(d2694); r2692(d2694); }
function d2693(d2694, k2695) { i1584(d2694, k2695); r2692(d2694); }
function r2692(d2694) { if (d2694.removed)
    return; const z3734 = f925(d2694.getPluginData('isCenter')); const p2701 = figma.currentPage.selection.includes(d2694); const color = z3734 ? [0xf2, 0x48, 0x22] : p2701 ? [12, 140, 233] : [255, 255, 255]; const border = z3734 ? [255, 255, 255] : p2701 ? [255, 255, 255] : [12, 140, 233]; d2694.fills = e958([['SOLID', color[0], color[1], color[2], 100]]); const effects = []; effects.push(...p1528([['DROP_SHADOW', border[0] / 255, border[1] / 255, border[2] / 255, 1, 0, 0, 0, (z3734 ? 3 : p2701 ? 5 : 3.6) / w2702, 'NORMAL', true, true]], true)); effects.push(...p1528([['DROP_SHADOW', color[0] / 255, color[1] / 255, color[2] / 255, 1, 0, 0, 0, (p2701 ? 4 : 2.4) / w2702, 'NORMAL', true, true]], true)); d2694.effects = effects; }
function i4024(genPoly) { return genPoly[b1402] != null && !isNaN(genPoly[b1402]) && genPoly[j1404] != null && !isNaN(genPoly[j1404]) && genPoly[i1405] != null && !isNaN(genPoly[i1405]) && genPoly[a1406] != null && !isNaN(genPoly[a1406]) && genPoly[c1411] != null && !isNaN(genPoly[c1411]) && genPoly[n1417] != null && !isNaN(genPoly[n1417]); }
function x2703(genPoly) { if (!i4024(genPoly))
    return null; const figPoly = figma.createPolygon(); v2704(figPoly, genPoly, true); return figPoly; }
function v2704(figPoly, genPoly, isValid = false) { if (!isValid && !i4024(genPoly))
    return; figPoly.cornerRadius = genPoly[c1411]; figPoly.pointCount = Math.max(3, genPoly[n1417]); n1583(figPoly, genPoly); p2696(figPoly, genPoly); }
function v2706(w2705) { return w2705[b1402] != null && !isNaN(w2705[b1402]) && w2705[j1404] != null && !isNaN(w2705[j1404]) && w2705[i1405] != null && !isNaN(w2705[i1405]) && w2705[a1406] != null && !isNaN(w2705[a1406]) && w2705[w1407] != null && !isNaN(w2705[w1407]); }
function s2707(w2705) { if (!v2706(w2705))
    return null; const figRect = figma.createRectangle(); e2708(figRect, w2705, true); return figRect; }
function e2708(figRect, w2705, isValid = false) { if (!isValid && !v2706(w2705))
    return; const found = w2705[w1396].findIndex(e => e[0] == 'ROUND_CORNERS'); if (found > -1) {
    const corners = w2705[w1396][found];
    figRect.topLeftRadius = corners[1];
    figRect.topRightRadius = corners[2];
    figRect.bottomLeftRadius = corners[3];
    figRect.bottomRightRadius = corners[4];
}
else
    figRect.cornerRadius = w2705[w1407]; n1583(figRect, w2705); p2696(figRect, w2705); }
function n2709(r2719) { return r2719[b1402] != null && !isNaN(r2719[b1402]) && r2719[j1404] != null && !isNaN(r2719[j1404]) && r2719[i1405] != null && !isNaN(r2719[i1405]) && r2719[a1406] != null && !isNaN(r2719[a1406]) && r2719[x1412] != null && !isNaN(r2719[x1412]) && r2719[u1418] != null && !isNaN(r2719[u1418]) && r2719[f1423] != null && !isNaN(r2719[f1423]); }
function s2710(r2719) { if (!n2709(r2719))
    return null; const k2720 = figma.createStar(); b2711(k2720, r2719, true); return k2720; }
function b2711(k2720, r2719, isValid = false) { if (!isValid && !n2709(r2719))
    return; k2720.cornerRadius = r2719[x1412]; k2720.pointCount = r2719[u1418]; k2720.innerRadius = Math.min(Math.max(0, r2719[f1423] / 100), 1); n1583(k2720, r2719); p2696(k2720, r2719); }
const i4266 = [];
function h2712(p2716) { return p2716[i1424] != null && p2716[b1402] != null && !isNaN(p2716[b1402]) && p2716[j1404] != null && !isNaN(p2716[j1404]) && p2716[i1405] != null && !isNaN(p2716[i1405]) && p2716[a1406] != null && !isNaN(p2716[a1406]) && p2716[a1426] != null && p2716[a1426] != NULL && p2716[n1427] != null && !isNaN(p2716[n1427]); }
function t2713(p2716) { if (!h2712(p2716))
    return null; const z2788 = figma.createText(); c2714(z2788, p2716, true); return z2788; }
function c2714(z2788, p2716, isValid = false) { if (!isValid && !h2712(p2716))
    return null; const fontName = { family: p2716[a1426], style: p2716[g1428] }; try {
    if (!i4266.includes(fontName)) {
        figma.loadFontAsync(fontName).then(() => { i4266.push(fontName); d2715(z2788, p2716, fontName); });
    }
    else {
        d2715(z2788, p2716, fontName);
    }
}
catch (e) {
    p955(e);
} }
function d2715(z2788, p2716, fontName) { z2788.fontName = fontName; z2788.fontSize = Math.max(1, p2716[n1427]); z2788.characters = p2716[i1424]; z2788.lineHeight = { unit: 'PERCENT', value: p2716[j1431] }; z2788.letterSpacing = { unit: 'PERCENT', value: p2716[p1432] }; if (p2716[u1429] == 0)
    z2788.textAlignHorizontal = 'LEFT';
else if (p2716[u1429] == 1)
    z2788.textAlignHorizontal = 'CENTER';
else if (p2716[u1429] == 2)
    z2788.textAlignHorizontal = 'RIGHT';
else if (p2716[u1429] == 3)
    z2788.textAlignHorizontal = 'JUSTIFIED'; if (p2716[l1430] == 0)
    z2788.textAlignVertical = 'TOP';
else if (p2716[l1430] == 1)
    z2788.textAlignVertical = 'CENTER';
else if (p2716[l1430] == 2)
    z2788.textAlignVertical = 'BOTTOM'; n1583(z2788, p2716); p2696(z2788, p2716); if (p2716[x1413] == 0 && p2716[c1419] == 0)
    z2788.textAutoResize = 'WIDTH_AND_HEIGHT';
else if (p2716[x1413] == 0)
    z2788.textAutoResize = 'HEIGHT';
else
    z2788.textAutoResize = 'NONE'; }
function b2771(s2721) { return true; }
function z2742(s2721) { if (!b2771(s2721))
    return null; const o2722 = figma.createVector(); a2748(o2722, s2721, true); return o2722; }
function a2748(o2722, s2721, isValid = false) { if (!isValid && !b2771(s2721))
    return; o2722.vectorNetwork = s2721[o1409]; n1583(o2722, s2721, false); p2696(o2722, s2721); }
function v2770(v2717) { return v2717[h1416] != null && !isNaN(v2717[h1416]) && v2717[n1422] != null && !isNaN(v2717[n1422]); }
function m2741(v2717) { const z2718 = figma.createVector(); x2747(z2718, v2717, true); return z2718; }
function x2747(z2718, v2717, isValid = false) { if (!isValid && !v2770(v2717))
    return; z2718.vectorPaths = [{ windingRule: v2717[h1416] == 1 ? 'NONZERO' : 'EVENODD', data: v2717[x1410] }]; z2718.cornerRadius = v2717[n1422]; n1583(z2718, v2717, false); p2696(z2718, v2717); }
