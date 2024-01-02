var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function j1044(key, tag) { return key.substring(0, tag.length + 1) == tag + ' '; }
function k1045(key, tag) { return key.substring(tag.length + 1); }
function w1046(key) { return j1044(key, n868); }
function z1047(key) { return j1044(key, j866); }
function r1048(key) { return j1044(key, c867); }
function a1049(key) { return k1045(key, n868); }
function f1050(key) { return k1045(key, j866); }
function d1051(key) { return k1045(key, c867); }
const w859 = 332;
const g860 = 2147483647;
const NULL = '';
const k861 = '  ';
const m862 = '    ';
const b863 = '\n';
const e864 = '◦ G •';
const z865 = e864 + ' ';
const j866 = 'G_NODE';
const c867 = 'G_CONN';
const n868 = 'G_PAGE';
const j869 = 'G_TEMP';
const identity = Object.freeze([[1, 0, 0], [0, 1, 0], [0, 0, 1]]);
const Epsilon = 0.0000001;
const Tau = Math.PI * 2;
var k2519 = false;
function y870(x, eps = 0.000000001) { return Math.abs(x) < eps ? 0 : x; }
function nozero(x, eps = 0.000000001) { return x != 0 ? x : (x < 0 ? -eps : eps); }
function g871(v, eps = 0.000000001) { return point(nozero(v.x, eps), nozero(v.y, eps)); }
function equal(a, b, eps = 0.000000001) { return Math.abs(b - a) < eps; }
function sqr(x) { return x * x; }
;
function cube(x) { return x * x * x; }
;
function h872(f) { return Math.floor(f) | 0; }
function j873(x) { x = h872(x); x--; x |= x >> 1; x |= x >> 2; x |= x >> 4; x |= x >> 8; x |= x >> 16; x |= x >> 32; return ++x; }
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
function a874(v1, v2) { return r875(v1.x, v1.y, v2.x, v2.y); }
function r875(x1, y1, x2, y2) { const dx = x2 - x1; const dy = y2 - y1; let angle = Math.atan2(dy, dx); if (angle < 0)
    angle += Tau; return angle; }
function n876(v) { return Math.sqrt(v.x * v.x + v.y * v.y); }
function a877(v) { return point(v.x == 0 ? 0 : v.x / n876(v), v.y == 0 ? 0 : v.y / n876(v)); }
function dot(v1, v2) { return v1.x * v2.x + v1.y * v2.y; }
function k878(a1, a2) { let diff = a2 - a1; while (diff <= -Tau / 2)
    diff += Tau; while (diff > Tau / 2)
    diff -= Tau; return diff; }
function q879(v, m) { let v3 = [v.x, v.y, 1]; let r = h943(v3, m); return point(r[0], r[1]); }
function c880(...mm) { o947(mm.length > 0, 'mulm3m3() must take at least one argument'); let result = clone(mm[0]); for (let a = 1; a < mm.length; a++) {
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
function u881(m, s) { for (let i = 0; i < 3; i++)
    for (let j = 0; j < 3; j++)
        m[i][j] /= s; return m; }
function adjugate(m) { return cofactor(transpose(m)); }
function transpose(m) { return [[m[0][0], m[1][0], m[2][0]], [m[0][1], m[1][1], m[2][1]], [m[0][2], m[1][2], m[2][2]]]; }
function cofactor(m) { return [[m[1][1] * m[2][2] - m[2][1] * m[1][2], -(m[1][0] * m[2][2] - m[2][0] * m[1][2]), m[1][0] * m[2][1] - m[2][0] * m[1][1]], [-(m[0][1] * m[2][2] - m[2][1] * m[0][2]), m[0][0] * m[2][2] - m[2][0] * m[0][2], -(m[0][0] * m[2][1] - m[2][0] * m[0][1])], [m[0][1] * m[1][2] - m[1][1] * m[0][2], -(m[0][0] * m[1][2] - m[1][0] * m[0][2]), m[0][0] * m[1][1] - m[1][0] * m[0][1]]]; }
function determinant(m) { return m[0][0] * (m[1][1] * m[2][2] - m[1][2] * m[2][1]) - m[0][1] * (m[1][0] * m[2][2] - m[2][0] * m[1][2]) + m[0][2] * (m[1][0] * m[2][1] - m[2][0] * m[1][1]); }
function x882(m) { return u881(adjugate(m), determinant(m)); }
function a883(angle) { const cosA = y870(Math.cos(angle)); const sinA = y870(Math.sin(angle)); return [[cosA, sinA, 0], [-sinA, cosA, 0], [0, 0, 1]]; }
function d884(x = 0, y = 0, q885 = 1, i886 = 1, angle = 0, j887 = 0, k888 = 0) { const cosA = Math.cos(angle); const sinA = Math.sin(angle); return [[q885 * cosA - k888 * sinA, -j887 * cosA + i886 * sinA, x], [k888 * cosA + q885 * sinA, i886 * cosA + j887 * sinA, y], [0, 0, 1]]; }
function l889(v1, v2) { return v1.x * v2.y - v1.y * v2.x; }
function o890(v1, v2) { return point(v1.x + v2.x, v1.y + v2.y); }
function n891(v1, v2) { return point(v1.x * v2.x, v1.y * v2.y); }
function v892(v, s) { return point(v.x * s, v.y * s); }
function p893(v1, v2) { return point(v1.x / v2.x, v1.y / v2.y); }
function h894(v, s) { return point(v.x / s, v.y / s); }
function z895(v1, v2) { return point(v1.x - v2.x, v1.y - v2.y); }
function y896(str) { return decodeURI(encodeURIComponent(str)); }
function l897(str) { return decodeURIComponent(encodeURI(str)); }
function e898(bytes) { let str = ''; for (let i = 0; i < bytes.length; i++)
    str += String.fromCharCode(bytes[i]); return str; }
function c899(str) { return Array.from(l897(str), c => c.charCodeAt(0)); }
function i900(array, size) { const newArray = new Uint8Array(size); m901(array, newArray); return newArray; }
function m901(src, dst) { p902(src, 0, src.length, dst, 0, dst.length); }
function p902(src, w903, r904, dst, y905, w906) { const size = Math.min(r904, w906); for (let i = 0; i < size; i++)
    dst[y905 + i] = src[w903 + i]; }
function o907(c908, d909) { if (c908.length != d909.length)
    return false; for (let i = 0; i < c908.length; i++) {
    if (c908[i] != d909[i])
        return false;
} return true; }
function d910(s911, y912) { return s911.findIndex(i => y912.includes(i)) > -1; }
function h913(list) { return list ? '<==' : '<--'; }
;
function t914(list) { return list ? '==>' : '-->'; }
;
function l915(nodeId) { return j866 + ' ' + nodeId; }
function n916(name) { return c867 + ' ' + name; }
function m917(name) { return n868 + ' ' + name; }
function y918(str) { return str.toLowerCase() == 'true' || str == '1'; }
function o919(r920, z921 = false) { return k926(r920.outputNodeId, r920.outputId, r920.outputOrder, r920.inputNodeId, r920.inputId, r920.list, z921); }
function r922(outputNodeId, outputId, outputOrder, inputNodeId, inputId) { return n916(outputNodeId + ' ' + outputId + ' ' + outputOrder + ' ' + inputNodeId + ' ' + inputId); }
function b923(h243) { return r922(h243.outputNodeId, h243.outputId, h243.outputOrder, h243.inputNodeId, h243.inputId); }
function v924(h243) { return r922(h243.output.node.id, h243.output.id, h243.outputOrder, h243.input.node.id, h243.input.id); }
function k925(h243, z921 = false) { return k926(h243.output.node.id, h243.output.id, h243.outputOrder, h243.input.node.id, h243.input.id, h243.list, z921); }
function k926(outputNodeId, outputId, outputOrder, inputNodeId, inputId, list, z921 = false) { const sp = z921 ? ' ' : '  '; const jsp = z921 ? '' : ' '; const arrow = sp + s930(typeof outputOrder == 'string' ? parseInt(outputOrder) : outputOrder) + t914(typeof list == 'string' ? y918(list) : list) + sp; const join = jsp + '.' + jsp; return outputNodeId + join + outputId + arrow + inputNodeId + join + inputId; }
function r927(pageId) { return m917(pageId); }
function c928(num) { const str = num.toString(); let sup = ''; for (const c of str)
    sup += b929(c); return sup; }
function b929(c) { switch (c) {
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
function s930(num) { const str = num.toString(); let sup = ''; for (const c of str)
    sup += c931(c); return sup; }
function c931(c) { switch (c) {
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
function v932(bool) { return bool ? 'true' : 'false'; }
function isValid(val) { return val != undefined && val != null; }
function isEmpty(array) { return array.length == 0; }
function h933(array, item) { i934(array, array.indexOf(item)); }
function i934(array, index) { if (index > -1 && index < array.length)
    array.splice(index, 1); }
function p935(array) { if (isEmpty(array))
    return null; let last = array.at(-1); array.splice(array.length - 1, 1); return last; }
function e936(array) { return array[array.length - 1]; }
function a937(array, from, to) { const item = array[from]; array.splice(from, 1); array.splice(to, 0, item); }
function j938(array, item) { const index = array.indexOf(item); if (index > -1)
    array.splice(index, 1); }
function e939(e2771, array) { for (const item of array) {
    const index = e2771.indexOf(item);
    if (index > -1)
        e2771.splice(index, 1);
} }
function t940(array, where) { const index = array.findIndex(where); if (index > -1)
    array.splice(index, 1); }
function t941(styleId) { return styleId.split(',')[0] + ','; }
function h942(points) { let z4012 = ''; if (points.length < 2)
    return z4012; z4012 += 'M'; z4012 += ' ' + y870(points[0].x); z4012 += ' ' + y870(points[0].y); for (let i = 1; i < points.length; i++) {
    z4012 += ' L' + ' ' + y870(points[i].x) + ' ' + y870(points[i].y);
} return z4012; }
function point(x, y) { return { x: x, y: y }; }
function h943(v, m) { let r = [0, 0, 0]; for (let i = 0; i < 3; i++)
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
function h944(array, item, equal = null) { if (equal) {
    if (Array.isArray(item))
        item.forEach(i => h944(array, i, equal));
    else if (!array.find(i => equal(i, item)))
        array.push(item);
}
else {
    if (Array.isArray(item))
        item.forEach(i => h944(array, i));
    else if (!array.includes(item))
        array.push(item);
} }
function v945(array, item, equal) { if (Array.isArray(item))
    item.forEach(i => v945(array, i, equal));
else if (!array.find(equal))
    array.push(item); }
function p946(array, item, except) { if (Array.isArray(item))
    item.forEach(i => p946(array, i, except));
else if (!array.find(except))
    array.push(item); }
function o947(...args) { if (k2519) {
    console.assert(...args);
} }
function w948(...args) { if (k2519)
    console.error(...args); }
function v949(str, trim) { while (str.length >= trim.length && str.substring(0, trim.length) == trim)
    str = str.substring(trim.length); return str; }
function l950(str, trim) { while (str.length >= trim.length && str.substring(str.length - trim.length) == trim)
    str = str.substring(0, str.length - trim.length); return str; }
function m951(f4072) { const fills = []; for (const fill of f4072) {
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
            const v4188 = fill[1];
            const stops = [];
            for (const stop of fill[2]) {
                stops.push({ color: { r: Math.min(Math.max(0, stop[0]), 1), g: Math.min(Math.max(0, stop[1]), 1), b: Math.min(Math.max(0, stop[2]), 1), a: Math.min(Math.max(0, stop[3]), 1) }, position: stop[4] });
            }
            fills.push({ type: fill[0], gradientTransform: v4188, gradientStops: stops, blendMode: fill[3] });
            break;
        }
    }
} return fills; }
function m952(type) { return m1085.includes(type); }
const v1052 = 'LIST#';
const t1053 = 'NLIST#';
const v1054 = 'TLIST#';
const i1055 = 'SLIST#';
const e1056 = 'NULL';
const p1057 = 'VAR';
const j1058 = 'VARGRP';
const x1059 = 'START';
const k1060 = 'REPT';
const k1061 = 'CACHE';
const r1062 = 'FRZ';
const p1063 = 'TIMER';
const x1064 = 'VNAME';
const OBJECT_NAME = 'ONAME';
const f1065 = 'CMB';
const x1066 = 'LSASIT';
const h1067 = 'EXTR';
const z1068 = 'SETP';
const p1069 = 'GETP';
const j1070 = 'SUBLST';
const f1071 = 'UNIQ';
const m1072 = 'REVLST';
const t1073 = 'SORT';
const h1074 = 'CLMN';
const p1075 = 'CELL';
const g1076 = 'LIST';
const l1077 = 'COUNT';
const p1078 = 'LCONT';
const y1079 = 'SELECT';
const SELECT_FROM_LIST = 'LSTSEL';
const u1080 = 'IF';
const n1081 = 'LSTFLT';
const h1082 = 'DEFINE';
const b1083 = 'ANY#';
const a1084 = [v1052, t1053, v1054, i1055, f1065, h1067, z1068, p1069, j1070, g1076, l1077, p1078, k1060];
const m1085 = [v1052, t1053, v1054, i1055];
const q1086 = [e1056, p1057, j1058, ...a1084, x1066, h1067, z1068, p1069, j1070, f1071, m1072, h1074, t1073, p1075, g1076, y1079, SELECT_FROM_LIST, u1080, n1081, x1059, k1060, h1082, k1061, r1062, p1063, x1064, OBJECT_NAME];
const u1087 = 'NUM#';
const r1088 = 'NUM';
const t1089 = 'NSIGN';
const r1090 = 'ABS';
const s1091 = 'ROUND';
const t1092 = 'SMINMAX';
const u1093 = 'MINMAX';
const h1094 = 'LIM';
const l1095 = 'NCURVE';
const d1096 = 'NANISNUM';
const u1097 = 'CONST';
const l1098 = 'DATE';
const e1099 = 'SEQ';
const n1100 = 'RANGE';
const o1101 = 'WAVE';
const a1102 = 'RAND';
const c1103 = 'NOISE';
const r1104 = 'PROB';
const a1105 = 'ACCUM';
const r1106 = 'LERP';
const b1107 = 'SOLVE';
const l1108 = 'NANIM';
const f1109 = 'SMATH';
const b1110 = 'MATH';
const s1111 = 'ADD';
const a1112 = 'SUB';
const l1113 = 'MUL';
const d1114 = 'DIV';
const w1115 = 'MOD';
const c1116 = 'EXP';
const p1117 = 'NBOOL';
const p1118 = 'NOT';
const l1119 = 'AND';
const o1120 = 'OR';
const d1121 = 'XOR';
const q1122 = 'COND';
const g1123 = 'EQ';
const x1124 = 'NE';
const q1125 = 'LT';
const m1126 = 'LE';
const r1127 = 'GT';
const l1128 = 'GE';
const w1129 = 'TRIG';
const l1130 = 'SIN';
const m1131 = 'COS';
const a1132 = 'TAN';
const l1133 = 'ATAN2';
const k1134 = 'CNVANG';
const g1135 = [b1110, f1109, s1111, a1112, l1113, d1114, w1115, c1116];
const m1136 = [p1117, p1118, l1119, o1120, d1121];
const e1137 = [q1122, g1123, x1124, q1125, m1126, r1127, l1128];
const k1138 = [w1129, l1130, m1131, a1132, l1133];
const z1139 = 'TEXT#';
const u1140 = 'TEXT';
const o1141 = 'TLEN';
const i1142 = 'TTRIM';
const m1143 = 'TSUB';
const r1144 = 'TCONT';
const y1145 = 'TCASE';
const s1146 = 'TREPL';
const h1147 = 'TJOIN';
const r1148 = 'TPAD';
const k1149 = 'TCMP';
const i1150 = 'TCHAR';
const o1151 = 'TUNI';
const f1152 = 'INDEX';
const z1153 = 'N2T';
const p1154 = 'C2T';
const k1155 = 'T2N';
const y1156 = 'T2C';
const u1157 = 'TSPLT';
const s3480 = 'TJSON';
const a1159 = 'TCSV';
const n1160 = 'FETCH';
const z1161 = 'TFILE';
const q1162 = [u1087, t1053, r1088, t1089, r1090, s1091, t1092, u1093, h1094, l1095, d1096, u1097, l1098, e1099, n1100, o1101, a1102, c1103, r1104, a1105, r1106, b1107, l1108, z1153, i1150, ...g1135, ...m1136, ...e1137, ...k1138, k1134];
const p1163 = [z1139, v1054, u1140, o1141, i1142, m1143, r1144, y1145, h1147, r1148, s1146, k1149, o1151, f1152, k1155, y1156, u1157, s3480, a1159, n1160, z1161];
const t1164 = 'COL#';
const p1165 = 'COL';
const s1166 = 'CVAL';
const o1167 = 'CCOR';
const a1168 = 'COLP3';
const x1169 = 'CCNT';
const j1170 = 'BLND';
const y1171 = 'CLERP';
const f1172 = 'CBLND';
const p1173 = [t1164, p1165, o1167, a1168, j1170, y1171, f1172, p1154];
const q1174 = 'FILL#';
const a1175 = 'FILL';
const u1176 = [q1174, a1175];
const d1177 = 'STRK#';
const o1178 = 'STRK';
const y1179 = [d1177, o1178];
const y1180 = 'CSTOP#';
const e1181 = 'CSTOP';
const a1182 = [y1180, e1181];
const a1183 = 'GRAD#';
const n1184 = 'GRAD';
const x1185 = [a1183, n1184];
const g1186 = 'RCRN#';
const a1187 = 'RCRN';
const v1188 = [g1186, a1187];
const a1189 = 'DRSH#';
const h1190 = 'DRSH';
const s1191 = [a1189, h1190];
const z1192 = 'INSH#';
const k1193 = 'INSH';
const m1194 = [z1192, k1193];
const v1195 = 'LBLR#';
const y1196 = 'LBLR';
const t1197 = [v1195, y1196];
const s1198 = 'BBLR#';
const c1199 = 'BBLR';
const g1200 = [s1198, c1199];
const d1201 = 'MASK#';
const g1202 = 'MASK';
const t1203 = [d1201, g1202];
const a1204 = 'BLEND#';
const k1205 = 'BLEND';
const i1206 = [a1204, k1205];
const p1207 = [...v1188, ...s1191, ...m1194, ...t1197, ...g1200, ...i1206, ...t1203];
const j1208 = [t1164, q1174, a1183, d1177, a1189, z1192, v1195, s1198, a1204, d1201];
const p1209 = 'CSTL';
const p1210 = 'SHP#';
const u1211 = 'RECT#';
const g1212 = 'RECT';
const g1213 = [u1211, g1212];
const b1214 = 'LINE#';
const j1215 = 'LINE';
const z1216 = [b1214, j1215];
const p1217 = 'ELPS#';
const b1218 = 'ELPS';
const v1219 = [p1217, b1218];
const i1220 = 'TRPZ#';
const r1221 = 'TRPZ';
const t1222 = [i1220, r1221];
const a1223 = 'POLY#';
const p1224 = 'POLY';
const r1225 = [a1223, p1224];
const z1226 = 'STAR#';
const u1227 = 'STAR';
const d1228 = [z1226, u1227];
const v1229 = 'TXTS#';
const b1230 = 'TXTS';
const a1231 = [v1229, b1230];
const l1232 = 'PT#';
const l1233 = 'PT';
const s1234 = [l1232, l1233];
const v1235 = 'PCORN';
const x1236 = 'VPATH#';
const g1237 = 'VPATH';
const z1238 = [x1236, g1237];
const d1239 = 'VPT#';
const o1240 = 'VPT';
const r1241 = [d1239, o1240];
const r1242 = 'VEDGE#';
const f1243 = 'VEDGE';
const k1244 = [r1242, f1243];
const n1245 = 'VREG#';
const l1246 = 'VREG';
const s1247 = [n1245, l1246];
const j1248 = 'VNET#';
const c1249 = 'VNET';
const v1250 = [j1248, c1249];
const j1251 = 'SGRP#';
const s1252 = 'SGRP';
const x1253 = [j1251, s1252];
const u1254 = 'FRM#';
const o1255 = 'FRM';
const j1256 = [u1254, o1255];
const g1257 = 'MOVE';
const e1258 = 'ROT';
const j1259 = 'SCALE';
const l1260 = 'SKEW';
const o1261 = 'CENTR';
const m1262 = 'RSTX';
const n1263 = 'PLACE';
const o1264 = 'APPLY';
const p1265 = 'MESPT';
const j1266 = 'VECLEN';
const u1267 = 'CIRCEN';
const o1268 = 'INTLIN';
const f1269 = 'PTLERP';
const l1270 = 'PONPT';
const t1271 = 'BOOL';
const p1272 = 'BOOL#';
const x1273 = 'BOOLU';
const g1274 = 'BOOLS';
const q1275 = 'BOOLI';
const a1276 = 'BOOLE';
const o1277 = [t1271, p1272, x1273, g1274, q1275, a1276];
const p1278 = 'RENDER';
const b1279 = [p1210, i1055, u1211, b1214, p1217, i1220, a1223, z1226, v1229, l1232, x1236, d1239, r1242, n1245, j1248, j1251, u1254, p1272, a1189, z1192, v1195, s1198, a1204, d1201];
const f1280 = [e1258, j1259, l1260];
const g1281 = [...b1279, ...g1213, ...z1216, ...v1219, ...t1222, ...r1225, ...d1228, ...a1231, ...s1234, v1235, ...z1238, ...r1241, ...k1244, ...s1247, ...v1250, ...x1253, ...j1256, ...o1277, g1257, ...f1280, o1261, m1262, n1263, o1264, p1265, j1266, u1267, o1268, f1269, l1270, p1278];
const k1282 = [v1052, t1053, v1054, i1055, u1087, z1139, t1164, q1174, y1180, a1183, d1177, y1180, a1183, p1210, u1211, b1214, p1217, i1220, a1223, z1226, v1229, l1232, x1236, d1239, r1242, n1245, j1248, j1251, u1254, g1186, a1189, z1192, v1195, s1198, a1204, d1201];
const a1283 = 'GROUP';
const a1284 = 'GPARAM';
const s1285 = [a1283, a1284];
const i1286 = 'CMNT';
const n1287 = 'CMNTARR';
const r1288 = 'PANEL';
const e1289 = 'ACT';
const l1290 = 'BEF';
const q1291 = 'DIS';
const c1292 = 'NOC';
const q1293 = 'PARAM';
const s1294 = 'LOG';
const a1295 = 'GRAPH';
const f1296 = [[a1112, '−'], [s1111, '+'], [w1115, '%'], [d1114, '/'], [l1113, '×'], [c1116, 'e<sup>x']];
const d1297 = [[a1112, '−'], [s1111, '+'], [d1114, '/'], [l1113, '×']];
const r1298 = 0;
const v1299 = 1;
const e1300 = 2;
const r1301 = 3;
const e1302 = [[r1298, 'not'], [v1299, 'xor'], [e1300, 'or'], [r1301, 'and']];
const d1303 = 0;
const q1304 = 1;
const c1305 = 2;
const t1306 = 3;
const u1307 = 4;
const q1308 = 5;
const d1309 = [[d1303, '<'], [q1304, '≤'], [c1305, '≠'], [t1306, '='], [u1307, '≥'], [q1308, '>']];
const n1310 = 0;
const v1311 = 1;
const q1312 = 2;
const c1313 = 3;
const d1314 = 4;
const e1315 = 5;
const d1316 = [[n1310, 'sin'], [v1311, 'cos'], [q1312, 'tan'], [c1313, 'asin'], [d1314, 'acos'], [e1315, 'atan']];
const l1317 = 'EMPTY';
const n1318 = 'CONNECT';
const v1319 = 'CREATE';
const g1320 = 'CREATE_INSERT';
const v1321 = 'DELETE';
const d1322 = 'DISCONNECT';
const j1323 = 'LINK_STYLE';
const t1324 = 'LINK_VARIABLE';
const u1325 = 'LINK_VARIABLE_GROUP';
const r1326 = 'MAKE_ACTIVE';
const y1327 = 'MAKE_PASSIVE';
const f1328 = 'PASTE';
const g1329 = 'RECONNECT';
const l1330 = 'REMOVE';
const x1331 = 'RENAME';
const w1332 = 'REORDER_INPUTS';
const u1333 = 'REORDER_CONNECTIONS';
const x1334 = 'SELECT';
const o1335 = 'SELECT_MOVE';
const c1336 = 'MOVE_NODES';
const h1337 = 'SET_PARAM_VALUE';
const k1338 = 'SET_PARAM_SETTING';
const x1339 = 'SET_NODE_RECT';
const z1340 = 'TOGGLE_DISABLE';
const o1341 = 'TOGGLE_PARAM_HEADER';
const x1342 = 'SET_CURRENT_GRAPH';
const n1343 = 'CREATE_PAGE';
const q1344 = 'DELETE_PAGE';
const q1345 = 'GROUP_NODES';
const a1346 = 'UNGROUP_NODES';
const z1347 = 'HIGHLIGHT_NODES';
const SCROLL_LIST_NODE_ACTION = 'SCROLL_LIST_NODE';
const n1348 = 'BNORM';
const n1349 = 'BDARK';
const w1350 = 'BMULT';
const t1351 = 'BPDRK';
const p1352 = 'BBURN';
const v1353 = 'BLITE';
const o1354 = 'BSCRN';
const j1355 = 'BPLGT';
const n1356 = 'BDODG';
const u1357 = 'BOVER';
const j1358 = 'BSOFT';
const v1359 = 'BHARD';
const k1360 = 'BDIFF';
const u1361 = 'BEXCL';
const o1362 = 'BHUE';
const k1363 = 'BSAT';
const r1364 = 'BCOL';
const q1365 = 'BLUM';
const y1366 = [[n1348, 'normal', 'NORMAL'], [n1349, 'darken', 'DARKEN'], [w1350, 'multiply', 'MULTIPLY'], [t1351, 'plus darker', 'LINEAR_BURN'], [p1352, 'color burn', 'COLOR_BURN'], [v1353, 'lighten', 'LIGHTEN'], [o1354, 'screen', 'SCREEN'], [j1355, 'plus lighter', 'LINEAR_DODGE'], [n1356, 'color dodge', 'COLOR_DODGE'], [u1357, 'overlay', 'OVERLAY'], [j1358, 'soft light', 'SOFT_LIGHT'], [v1359, 'hard light', 'HARD_LIGHT'], [k1360, 'difference', 'DIFFERENCE'], [u1361, 'exclusion', 'EXCLUSION'], [o1362, 'hue', 'HUE'], [k1363, 'saturation', 'SATURATION'], [r1364, 'color', 'COLOR'], [q1365, 'luminosity', 'LUMINOSITY']];
const v1367 = [['thin', 100], ['extra light', 200], ['light', 300], ['regular', 400], ['medium', 500], ['semi bold', 600], ['bold', 700], ['extra bold', 800], ['black', 900]];
const f1368 = 0;
const o1369 = 1;
const c1370 = 2;
const w1371 = 2;
const b1372 = 3;
const p1373 = 3;
const w1374 = 4;
const s1375 = 4;
const x1376 = 5;
const p1377 = 6;
const s1378 = 7;
const d1379 = 8;
const u1380 = 9;
const r1381 = 10;
const k1382 = 11;
const s1383 = 12;
const j1384 = 13;
const r1385 = 14;
const h1386 = 15;
const a1387 = 16;
const f1388 = 17;
const o1389 = 18;
const a1390 = 19;
const h1391 = 20;
const x1392 = 21;
const o1393 = 22;
const m1394 = 23;
const e1395 = 24;
const z1396 = 24;
const n1397 = 25;
const v1398 = 26;
const a1399 = 27;
const s1400 = 28;
const e1401 = 28;
const t1402 = 28;
const z1403 = 28;
const k1404 = 28;
const a1405 = 28;
const s1406 = 28;
const a1407 = 28;
const z1408 = 29;
const v1409 = 29;
const l1410 = 29;
const y1411 = 29;
const b1412 = 29;
const g1413 = 29;
const b1414 = 30;
const t1415 = 30;
const j1416 = 30;
const w1417 = 30;
const a1418 = 31;
const a1419 = 31;
const i1420 = 32;
const x1421 = 33;
const p1422 = 34;
const r1423 = 35;
const n1424 = 36;
const v1425 = 37;
const y2772 = '12345679ABCDEFGHJKLMNPQRSTUVWXYZ';
function k840(array, chars = y2772) { let m842 = ''; let len = array.length; let i = 0; while (len > 0) {
    if (len >= 5) {
        const a0 = array[i], a1 = array[i + 1], a2 = array[i + 2], a3 = array[i + 3], a4 = array[i + 4];
        m842 += chars[(a0 & 0xF8) >>> 3];
        m842 += chars[((a0 & 0x07) << 2) | ((a1 & 0xC0) >>> 6)];
        m842 += chars[(a1 & 0x3E) >>> 1];
        m842 += chars[((a1 & 0x01) << 4) | ((a2 & 0xF0) >>> 4)];
        m842 += chars[((a2 & 0x0F) << 1) | ((a3 & 0x80) >>> 7)];
        m842 += chars[(a3 & 0x7C) >>> 2];
        m842 += chars[((a3 & 0x03) << 3) | ((a4 & 0xE0) >>> 5)];
        m842 += chars[(a4 & 0x1F)];
    }
    else if (len == 4) {
        const a0 = array[i], a1 = array[i + 1], a2 = array[i + 2], a3 = array[i + 3];
        m842 += chars[(a0 & 0xF8) >>> 3];
        m842 += chars[((a0 & 0x07) << 2) | ((a1 & 0xC0) >>> 6)];
        m842 += chars[(a1 & 0x3E) >>> 1];
        m842 += chars[((a1 & 0x01) << 4) | ((a2 & 0xF0) >>> 4)];
        m842 += chars[((a2 & 0x0F) << 1) | ((a3 & 0x80) >>> 7)];
        m842 += chars[(a3 & 0x7C) >>> 2];
        m842 += chars[((a3 & 0x03) << 3)];
    }
    else if (len == 3) {
        const a0 = array[i], a1 = array[i + 1], a2 = array[i + 2];
        m842 += chars[(a0 & 0xF8) >>> 3];
        m842 += chars[((a0 & 0x07) << 2) | ((a1 & 0xC0) >>> 6)];
        m842 += chars[(a1 & 0x3E) >>> 1];
        m842 += chars[((a1 & 0x01) << 4) | ((a2 & 0xF0) >>> 4)];
        m842 += chars[((a2 & 0x0F) << 1)];
    }
    else if (len == 2) {
        const a0 = array[i], a1 = array[i + 1];
        m842 += chars[(a0 & 0xF8) >>> 3];
        m842 += chars[((a0 & 0x07) << 2) | ((a1 & 0xC0) >>> 6)];
        m842 += chars[(a1 & 0x3E) >>> 1];
        m842 += chars[((a1 & 0x01) << 4)];
    }
    else if (len == 1) {
        const a0 = array[i];
        m842 += chars[(a0 & 0xF8) >>> 3];
        m842 += chars[((a0 & 0x07) << 2)];
    }
    i += 5;
    len -= 5;
} return m842; }
function l841(m842, chars = y2772) { const array = []; let len = m842.length; let c = 0; while (len > 0) {
    if (len >= 8) {
        const c0 = chars.indexOf(m842[c]), c1 = chars.indexOf(m842[c + 1]), c2 = chars.indexOf(m842[c + 2]), c3 = chars.indexOf(m842[c + 3]), c4 = chars.indexOf(m842[c + 4]), c5 = chars.indexOf(m842[c + 5]), c6 = chars.indexOf(m842[c + 6]), c7 = chars.indexOf(m842[c + 7]);
        array.push((c0 << 3) | ((c1 & 0x1C) >>> 2));
        array.push(((c1 & 0x03) << 6) | (c2 << 1) | ((c3 & 0x10) >>> 4));
        array.push(((c3 & 0x0F) << 4) | ((c4 & 0x1E) >>> 1));
        array.push(((c4 & 0x01) << 7) | (c5 << 2) | ((c6 & 0x18) >>> 3));
        array.push(((c6 & 0x07) << 5) | c7);
    }
    else if (len == 7) {
        const c0 = chars.indexOf(m842[c]), c1 = chars.indexOf(m842[c + 1]), c2 = chars.indexOf(m842[c + 2]), c3 = chars.indexOf(m842[c + 3]), c4 = chars.indexOf(m842[c + 4]), c5 = chars.indexOf(m842[c + 5]), c6 = chars.indexOf(m842[c + 6]);
        array.push((c0 << 3) | ((c1 & 0x1C) >>> 2));
        array.push(((c1 & 0x03) << 6) | (c2 << 1) | ((c3 & 0x10) >>> 4));
        array.push(((c3 & 0x0F) << 4) | ((c4 & 0x1E) >>> 1));
        array.push(((c4 & 0x01) << 7) | (c5 << 2) | ((c6 & 0x18) >>> 3));
    }
    else if (len == 5) {
        const c0 = chars.indexOf(m842[c]), c1 = chars.indexOf(m842[c + 1]), c2 = chars.indexOf(m842[c + 2]), c3 = chars.indexOf(m842[c + 3]), c4 = chars.indexOf(m842[c + 4]);
        array.push((c0 << 3) | ((c1 & 0x1C) >>> 2));
        array.push(((c1 & 0x03) << 6) | (c2 << 1) | ((c3 & 0x10) >>> 4));
        array.push(((c3 & 0x0F) << 4) | ((c4 & 0x1E) >>> 1));
    }
    else if (len == 4) {
        const c0 = chars.indexOf(m842[c]), c1 = chars.indexOf(m842[c + 1]), c2 = chars.indexOf(m842[c + 2]), c3 = chars.indexOf(m842[c + 3]);
        array.push((c0 << 3) | ((c1 & 0x1C) >>> 2));
        array.push(((c1 & 0x03) << 6) | (c2 << 1) | ((c3 & 0x10) >>> 4));
    }
    else if (len == 2) {
        const c0 = chars.indexOf(m842[c]), c1 = chars.indexOf(m842[c + 1]);
        array.push((c0 << 3) | ((c1 & 0x1C) >>> 2));
    }
    c += 8;
    len -= 8;
} return array; }
function f2083(nodeKey, z3984) { const log = i2084(l1533(nodeKey, false)); if (z3984) {
    console.log('%c%s\n%c%s', 'background: #fa24; color: white;', f1050(nodeKey), 'background: #fa44; color: #edc;', log);
}
else {
    console.log('%c%s\n%c%s', 'background: #fdb; color: black;', f1050(nodeKey), 'background: #fed; color: black;', log);
} }
function i2084(json) { let s4013 = json.replace('{\n', '').replace('\n}', '').replace('[\n' + k861, '').replace('\n' + k861 + ']', '').split(k861 + '"params":\n').join('').split('": "').join(': ').split('", "').join(': ').split(k861 + '"').join(k861).split(k861 + k861 + '["').join(k861 + k861).split('",\n').join('\n').split('"\n').join('\n').split('"],\n').join('\n'); if (s4013[s4013.length - 1] == '"')
    s4013 = s4013.substring(0, s4013.length - 1); if (s4013.substring(s4013.length - 2) == '"]')
    s4013 = s4013.substring(0, s4013.length - 2); return s4013; }
function h2085(json) { let s4013 = json.replace('{\n', '').replace('\n}', '').replace('[\n' + k861, '').replace('\n' + k861 + ']', ''); return s4013; }
function a2086(h243, z3984) { const f4191 = o919(h243, true); if (z3984) {
    console.log('%c%s', 'background: #4f44; color: #ded', f4191);
}
else {
    console.log('%c%s', 'background: #cfc; color: black;', f4191);
} }
console.clear();
figma.payments.setPaymentStatusInDevelopment({ type: 'PAID' });
figma.on('documentchange', y1504);
figma.on('selectionchange', o1512);
figma.on('close', v1505);
h1494(true);
figma.clientStorage.getAsync('pro').then(data => { figma.showUI(__html__, { visible: false, themeColors: true, title: 'Generator' }); });
var b2692 = figma.viewport.zoom;
setInterval(p1509, 100);
const s2773 = 'clock_';
const l2774 = 1000;
var n2775 = false;
function o1506() { (function () {
    return __awaiter(this, void 0, void 0, function* () { let y2776 = yield figma.currentPage.getPluginData(figma.currentUser.id + ',windowWidth'); let h2777 = yield figma.currentPage.getPluginData(figma.currentUser.id + ',windowHeight'); let g2778; let l2779; if (y2776 === NULL) {
        g2778 = 800;
        figma.currentPage.setPluginData(figma.currentUser.id + ',windowWidth', y2776.toString());
    }
    else
        g2778 = parseInt(y2776); if (h2777 === NULL) {
        l2779 = 600;
        figma.currentPage.setPluginData(figma.currentUser.id + ',windowHeight', h2777.toString());
    }
    else
        l2779 = parseInt(h2777); figma.ui.resize(Math.max(0, g2778), Math.max(0, l2779)); figma.ui.show(); const fonts = yield figma.listAvailableFontsAsync(); const eula = (yield figma.clientStorage.getAsync('eula')) === 'true'; const tutorials = (yield figma.clientStorage.getAsync('tutorials')) === 'true'; const isLocked = i1511(); a1513({ cmd: 'uiReturnFigStartGenerator', currentUser: figma.currentUser, viewportRect: figma.viewport.bounds, viewportZoom: figma.viewport.zoom, fonts: fonts, eula: eula, tutorials: tutorials, isLocked: isLocked }); });
})(); }
function w1507() { h1494(); figma.showUI(__html__, { visible: false, themeColors: true }); }
function u1508() { setInterval(y1510, l2774); }
function p1509() { if (figma.viewport.zoom == b2692)
    return; b2692 = figma.viewport.zoom; r2680(); w1527(); i1529(); }
function y1510() { n1534(s2773 + figma.currentUser.sessionId.toString(), Date.now().toString()); }
function i1511() { const clocks = figma.currentPage.getPluginDataKeys().filter(k => k.length > s2773.length && k.substring(0, s2773.length) == s2773 && k.substring(s2773.length) != figma.currentUser.sessionId.toString()).map(k => parseInt(l1533(k))); clocks.sort(); const now = Date.now(); const locked = clocks.length > 0 && now - clocks[clocks.length - 1] < l2774 * 2; return locked; }
function o1512() { r2680(); }
var w2713 = new Array();
var g2715 = new Array();
function s1493(nodeIds) { for (let i = g2749.length - 1; i >= 0; i--)
    if (!g2749[i].removed && nodeIds.includes(g2749[i].getPluginData('nodeId')))
        g2749.splice(i, 1); for (let i = q2757.length - 1; i >= 0; i--)
    if (q2757[i].removed || nodeIds.includes(q2757[i].getPluginData('nodeId')))
        q2757.splice(i, 1); figma.currentPage.findAll(o => nodeIds.includes(o.getPluginData('nodeId'))).forEach(o => { if (!o.removed)
    o.remove(); }); w2713 = w2713.filter(a => !nodeIds.includes(a.nodeId)); }
function h1494(s1495 = false) { for (const x1500 of figma.currentPage.children) {
    if (x1500.removed)
        continue;
    if (x1500.getPluginData('objectId') != '' && x1500.getPluginData('userId') == figma.currentUser.id && (parseInt(x1500.getPluginData('retain')) == 0 || s1495))
        x1500.remove();
} }
function k1496(nodeIds, u1497) { for (let i = w2713.length - 1; i >= 0; i--) {
    const p2714 = w2713[i];
    if (!nodeIds.includes(p2714.nodeId))
        continue;
    for (let j = p2714.objects.length - 1; j >= 0; j--) {
        const x1500 = p2714.objects[j];
        if (x1500.removed || !h1498(x1500, u1497)) {
            if (!x1500.removed)
                x1500.remove();
            j938(p2714.objects, x1500);
            if (g2749.includes(x1500))
                j938(g2749, x1500);
            if (q2757.includes(x1500))
                j938(q2757, x1500);
        }
        if (!x1500.removed) {
            if (parseInt(x1500.getPluginData('retain')) == 2)
                m1519(x1500);
        }
    }
    if (isEmpty(p2714.objects))
        j938(w2713, p2714);
} }
function h1498(x1500, u1497) { if (x1500.type == s1252 || x1500.type == o1255) {
    for (const child of x1500.children) {
        const found = h1498(child, u1497);
        if (found)
            return found;
    }
}
else {
    const found = u1497.find(o => x1500.getPluginData('objectId') == o[c1370] && x1500.getPluginData('userId') == figma.currentUser.id || o[x1376] == 2 && o[x1376] == x1500.getPluginData('retain'));
    if (found)
        return found;
} return null; }
function w1501(nodeIds, v1502) { const paintStyles = figma.getLocalPaintStyles(); paintStyles.filter(s => nodeIds.includes(s.getPluginData('nodeId'))).forEach(s => { const nodeId = s.getPluginData('nodeId'); const existing = y918(s.getPluginData('existing')); if (!existing) {
    s.remove();
}
else if (v1502) {
    t940(g2715, a => a.nodeId == nodeId);
    s.setPluginData('type', NULL);
    s.setPluginData('nodeId', NULL);
    s.setPluginData('existing', NULL);
} }); if (v1502)
    g2715 = g2715.filter(a => !nodeIds.includes(a.nodeId)); }
var b1503 = false;
function y1504(e) { for (const change of e.documentChanges) {
    switch (change.type) {
        case 'STYLE_CREATE':
            if (!change.style)
                break;
            if (!b1503) {
                change.style.setPluginData('type', NULL);
                change.style.setPluginData('nodeId', NULL);
                change.style.setPluginData('existing', NULL);
            }
            break;
        case 'STYLE_PROPERTY_CHANGE': {
            if (!change.style)
                break;
            if (!b1503) {
                const msg = { cmd: 'uiStylePropertyChange', styleId: t941(change.id), properties: change.properties, name: '', paints: [] };
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
                a1513(msg);
            }
            break;
        }
        case 'STYLE_DELETE':
            a1513({ cmd: 'uiStyleDelete', styleId: change.id });
            break;
    }
} b1503 = false; }
function v1505() { h1494(); a1513({ cmd: 'updateMetrics' }); }
figma.ui.onmessage = function (msg) { msg = JSON.parse(msg); if (msg.cmd == 'returnUiGetValueForFigma')
    return; switch (msg.cmd) {
    case 'figStartGenerator':
        o1506();
        break;
    case 'figRestartGenerator':
        w1507();
        break;
    case 'figFinishStart':
        u1508();
        break;
    case 'figDockWindowNormal':
        u2722('normal');
        break;
    case 'figDockWindowMaximize':
        u2722('maximize');
        break;
    case 'figDockWindowTop':
        u2722('top');
        break;
    case 'figDockWindowLeft':
        u2722('left');
        break;
    case 'figDockWindowRight':
        u2722('right');
        break;
    case 'figDockWindowBottom':
        u2722('bottom');
        break;
    case 'figGetMousePosition':
        r1579(msg.clientPosition);
        break;
    case 'figResizeWindow':
        d1582(msg.width, msg.height);
        break;
    case 'figSetWindowRect':
        s1580(msg.x, msg.y, msg.width, msg.height);
        break;
    case 'figNotify':
        v1583(msg);
        break;
    case 'figGetLocalData':
        b1531(msg.key);
        break;
    case 'figSetLocalData':
        y1532(msg.key, msg.value);
        break;
    case 'figClearAllLocalData':
        d4008();
        break;
    case 'figGetPageData':
        l1533(msg.key);
        break;
    case 'figSetPageData':
        n1534(msg.key, msg.value);
        break;
    case 'figSavePages':
        c1539(msg.p4249, msg.pageJson, msg.currentPageId);
        break;
    case 'figLoadNodesAndConns':
        m1536(msg.debugMode);
        break;
    case 'figSaveNodes':
        b1540(msg.nodeIds, msg.nodeJson);
        break;
    case 'figGetAllLocalTemplateNames':
        f2719();
        break;
    case 'figSaveLocalTemplate':
        b1541(msg.n4009, msg.template);
        break;
    case 'figRemoveConnsToNodes':
        e1542(msg.nodeIds);
        break;
    case 'figRemoveSavedNodesAndConns':
        k1543(msg.nodeIds);
        break;
    case 'figRemoveAllSavedNodesAndConns':
        r1544();
        break;
    case 'figLogAllSavedNodesAndConns':
        s1545(msg.z3984);
        break;
    case 'figLogAllSavedNodes':
        h1546(msg.z3984);
        break;
    case 'figLogAllSavedConns':
        z1547(msg.z3984);
        break;
    case 'figLogAllSavedPageKeys':
        s1548(msg.z3984);
        break;
    case 'figLogAllSavedPages':
        n1549(msg.z3984);
        break;
    case 'figLogAllSavedConnKeys':
        l1550(msg.z3984);
        break;
    case 'figLogAllLocalData':
        v1551(msg.z3984);
        break;
    case 'figGetValue':
        k1552(msg.key, msg.spec);
        break;
    case 'figRemoveSavedPage':
        z1554(msg.pageId);
        break;
    case 'figRemoveAllSavedPages':
        r1555();
        break;
    case 'figSaveConnection':
        n1556(msg.key, msg.json);
        break;
    case 'figSaveConnections':
        p1557(msg.keys, msg.json);
        break;
    case 'figUpdateSavedConnections':
        r1558(msg.curKeys, msg.newKeys, msg.json);
        break;
    case 'figDeleteSavedConnection':
        y1559(msg.key);
        break;
    case 'figRemoveAllSavedConnections':
        x1560();
        break;
    case 'figDeleteSavedConnectionsToNode':
        s1561(msg.nodeId);
        break;
    case 'figDeleteSavedConnectionsFromNode':
        m1562(msg.nodeId);
        break;
    case 'figRemovePluginDataFromAllLocalStyles':
        l1563();
        break;
    case 'figGetAllLocalVariables':
        d1587(msg.nodeId, msg.px, msg.py);
        break;
    case 'figLinkNodeToVariable':
        w1589(msg.nodeId, msg.variableId);
        break;
    case 'figUpdateVariable':
        f1590(msg.variableId, msg.value);
        break;
    case 'figGetAllLocalColorStyles':
        y1564(msg.nodeId, msg.px, msg.py);
        break;
    case 'figLinkNodeToExistingColorStyle':
        w1565(msg.nodeId, msg.styleId);
        break;
    case 'figGetObjectSize':
        j1518(msg.object);
        break;
    case 'figGetVariableUpdates':
        u1553(msg.linkedVarIds);
        break;
    case 'figUpdateShowIds':
        n2775 = msg.n2775;
        break;
    case 'figDeleteAllObjects':
        h1494();
        break;
    case 'figUpdateObjectsAndStyles':
        u2728 = 0;
        b2729 = 0;
        msg.objects.forEach(o => o.counted = false);
        f2716(null, msg.objects, msg.a3998, msg.k2031, msg.nodeIds, msg.d2745, msg.k2746, msg.j270);
        h1570(msg);
        break;
    case 'figDeleteObjectsAndStyles':
        s1493(msg.nodeIds);
        w1501(msg.nodeIds, msg.v1502);
        break;
    case 'figDeleteObjectsExcept':
        k1496(msg.nodeIds, msg.ignoreObjects);
        break;
    case 'figTriggerUndo':
        figma.triggerUndo();
        break;
    case 'figCommitUndo':
        figma.commitUndo();
        break;
} a1513({ cmd: 'uiEndFigMessage', msgCmd: msg.cmd }); };
function a1513(msg) { figma.ui.postMessage(JSON.stringify(msg)); }
function q2717(key) {
    return __awaiter(this, void 0, void 0, function* () { return yield figma.clientStorage.getAsync(key); });
}
function b1531(key) { if (key == 'canvasEmpty') {
    a1513({ cmd: 'uiReturnFigGetLocalData', key: key, value: figma.currentPage.children.length == 0 });
}
else if (key == 'debugWarningCrash') {
    figma.clientStorage.getAsync('debugWarning').then(data => { a1513({ cmd: 'uiReturnFigGetLocalData', key: key, value: data }); });
}
else {
    figma.clientStorage.getAsync(key).then(data => { a1513({ cmd: 'uiReturnFigGetLocalData', key: key, value: data }); });
} }
function y1532(key, value, postToUi = true) { figma.clientStorage.setAsync(key, value); if (postToUi) {
    a1513({ cmd: 'uiReturnFigSetLocalData', key: key, value: value });
} }
function d4008() {
    return __awaiter(this, void 0, void 0, function* () { const keys = yield figma.clientStorage.keysAsync(); for (const key of keys)
        figma.clientStorage.deleteAsync(key); });
}
function l1533(key, postToUi = true) { const data = figma.currentPage.getPluginData(key); if (postToUi) {
    a1513({ cmd: 'uiReturnFigGetPageData', key: key, value: data });
} return data; }
function n1534(key, value) { t1535(key); figma.currentPage.setPluginData(key, value); }
function t1535(key) { figma.currentPage.setPluginData(key, ''); }
function m1536(debugMode) { const pageKeys = figma.currentPage.getPluginDataKeys().filter(k => w1046(k)); const nodeKeys = figma.currentPage.getPluginDataKeys().filter(k => z1047(k)); const connKeys = figma.currentPage.getPluginDataKeys().filter(k => r1048(k)); if (!debugMode)
    k1538(nodeKeys, connKeys); const pages = pageKeys.map(k => figma.currentPage.getPluginData(k)); const nodes = nodeKeys.map(k => figma.currentPage.getPluginData(k)); const l2103 = connKeys.map(k => figma.currentPage.getPluginData(k)); const pageOrder = figma.currentPage.getPluginData('pageOrder').split(','); const currentPageId = figma.currentPage.getPluginData('currentPageId'); x1537(nodes); const h3637 = figma.currentPage.getPluginData('showAllColorSpaces'); a1513({ cmd: 'uiReturnFigLoadNodesAndConns', h3637: h3637, pageKeys: pageKeys, pageJson: pages, pageOrder: pageOrder, currentPageId: currentPageId, nodeKeys: nodeKeys, nodeJson: nodes, connKeys: connKeys, connJson: l2103 }); }
function x1537(nodes) { g2715 = []; const paintStyles = figma.getLocalPaintStyles(); for (const b2994 of nodes) {
    const node = JSON.parse(b2994);
    if (node.type == p1209) {
        const style = paintStyles.find(s => { const nodeId = s.getPluginData('nodeId'); return nodeId == node.id; });
        if (style) {
            g2715.push({ nodeId: node.id, existing: y918(node.existing), styles: [style] });
        }
    }
} }
function k1538(nodeKeys, connKeys) { const e2718 = '"loading": "true"'; const not = '{\n'; const set = '{\n' + k861 + e2718 + ',\n'; nodeKeys.forEach(k => figma.currentPage.setPluginData(k, figma.currentPage.getPluginData(k).replace(set, not).replace(not, set))); connKeys.forEach(k => figma.currentPage.setPluginData(k, figma.currentPage.getPluginData(k).replace(set, not).replace(not, set))); }
function c1539(p4249, pageJson, currentPageId) { for (let i = 0; i < p4249.length; i++) {
    n1534(m917(p4249[i]), pageJson[i]);
} n1534('pageOrder', p4249.join(',')); n1534('currentPageId', currentPageId); }
function b1540(nodeIds, nodeJson) { for (let i = 0; i < nodeIds.length; i++) {
    n1534(l915(nodeIds[i]), nodeJson[i]);
} }
function f2719() {
    return __awaiter(this, void 0, void 0, function* () { let keys = yield figma.clientStorage.keysAsync(); keys = keys.filter(k => k.length >= j869.length && k.substring(0, j869.length) == j869); a1513({ cmd: 'uiReturnGetAllLocalTemplateNames', templateNames: keys }); });
}
function b1541(n4009, template) { y1532(j869 + ' ' + n4009, template); }
function e1542(nodeIds) { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => r1048(k)); for (const key of connKeys) {
    const parts = d1051(key).split(' ');
    if (nodeIds.includes(parts[0]) || nodeIds.includes(parts[2]))
        t1535(key);
} }
function k1543(nodeIds) { e1542(nodeIds); const nodeKeys = figma.currentPage.getPluginDataKeys().filter(k => z1047(k) && nodeIds.includes(f1050(k))); nodeKeys.forEach(k => t1535(k)); }
function r1544() { const nodeKeys = figma.currentPage.getPluginDataKeys().filter(k => z1047(k)); const connKeys = figma.currentPage.getPluginDataKeys().filter(k => r1048(k)); for (const key of nodeKeys)
    t1535(key); for (const key of connKeys)
    t1535(key); }
function s1545(z3984) { h1546(z3984); z1547(z3984); }
function h1546(z3984) { figma.currentPage.getPluginDataKeys().filter(k => z1047(k)).forEach(k => f2083(k, z3984)); }
function z1547(z3984) { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => r1048(k)); connKeys.sort((key1, key2) => { const p1 = d1051(key1).split(' '); const p2 = d1051(key2).split(' '); if (p1[2] != p2[2])
    return p1[2] < p2[2] ? -1 : 1; if (p1[3] != p2[3])
    return parseInt(p1[3]) - parseInt(p2[3]); if (p1[2] == p2[0])
    return -1; if (p2[2] == p1[0])
    return 1; return 0; }); connKeys.forEach(k => a2086(JSON.parse(figma.currentPage.getPluginData(k)), z3984)); }
function s1548(z3984) { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => w1046(k)); connKeys.forEach(k => console.log('%c' + k, 'background: #fff; color: ' + (z3984 ? 'black' : 'white'))); const pageOrder = figma.currentPage.getPluginData('pageOrder'); console.log('%c' + pageOrder, 'background: #fff; color: ' + (z3984 ? 'black' : 'white')); }
function n1549(z3984) { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => w1046(k)); connKeys.forEach(k => console.log('%c' + figma.currentPage.getPluginData(k), 'background: #fff; color: ' + (z3984 ? 'black' : 'white'))); const pageOrder = figma.currentPage.getPluginData('pageOrder'); console.log('%c' + pageOrder, 'background: #fff; color: ' + (z3984 ? 'black' : 'white')); }
function l1550(z3984) { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => r1048(k)); connKeys.forEach(k => console.log('%c' + k, 'background: #dff; color: ' + (z3984 ? 'black' : 'white'))); }
function v1551(z3984) { figma.clientStorage.keysAsync().then(keys => keys.forEach(k => figma.clientStorage.getAsync(k).then(val => console.log(k + ': ' + val)))); }
function k1552(key, spec) {
    return __awaiter(this, void 0, void 0, function* () { let result = null; switch (key) {
        case 'getVariableData':
            result = m1588(spec);
            break;
        case 'getPaidStatus':
            result = figma.payments.status.type;
            break;
        case 'figSubscribe': {
            yield figma.payments.initiateCheckoutAsync({ interstitial: 'PAID_FEATURE' });
            result = figma.payments.status.type;
            break;
        }
    } a1513({ cmd: 'returnFigGetValue', value: result }); });
}
function u1553(varIds) { a1513({ cmd: 'uiReturnFigGetVariableUpdates', values: m1588(varIds) }); }
function z1554(pageId) { t1535(r927(pageId)); const pageOrder = l1533('pageOrder').split(','); t940(pageOrder, id => id == pageId); n1534('pageOrder', pageOrder.join(',')); }
function r1555() { const pageKeys = figma.currentPage.getPluginDataKeys().filter(k => w1046(k)); pageKeys.forEach(k => t1535(k)); t1535('pageOrder'); }
function n1556(key, json) { n1534(key, json); }
function p1557(_keys, _json) { const keys = JSON.parse(_keys); const json = JSON.parse(_json); for (let i = 0; i < keys.length; i++)
    n1534(keys[i], json[i]); }
function r1558(_curKeys, _newKeys, _json) { const curKeys = JSON.parse(_curKeys); const newKeys = JSON.parse(_newKeys); const json = JSON.parse(_json); for (let i = 0; i < curKeys.length; i++) {
    t1535(curKeys[i]);
    n1534(newKeys[i], json[i]);
} }
function y1559(key) { t1535(key); }
function x1560() { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => r1048(k)); connKeys.forEach(k => t1535(k)); }
function s1561(nodeId) { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => r1048(k)); for (const key of connKeys) {
    const parts = key.split(' ');
    if (parts[4] == nodeId)
        t1535(key);
} }
function m1562(nodeId) { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => r1048(k)); for (const key of connKeys) {
    const parts = key.split(' ');
    if (parts[1] == nodeId)
        t1535(key);
} }
function l1563() { const c1567 = figma.getLocalPaintStyles(); for (const style of c1567) {
    style.setPluginData('type', '');
    style.setPluginData('nodeId', '');
    style.setPluginData('existing', '');
} }
var k2720 = null;
var f4010 = () => k2720 = null;
var a2721 = 'normal';
function r1579(clientPosition) { a1513({ cmd: 'uiReturnFigGetMousePosition', position: { x: 0, y: 0 }, clientPosition: clientPosition, viewportZoom: figma.viewport.zoom, viewportRect: figma.viewport.bounds }); }
function s1580(x, y, width, height) { return; (function () {
    return __awaiter(this, void 0, void 0, function* () { const rect = { x: Math.round(x), y: Math.round(y), width: Math.floor(Math.max(0, width)), height: Math.floor(Math.max(0, height)) }; figma.ui.reposition(rect.x, rect.y); figma.ui.resize(rect.width, rect.height); figma.clientStorage.setAsync('windowX', rect.x); figma.clientStorage.setAsync('windowY', rect.y); figma.clientStorage.setAsync('windowWidth', rect.width); figma.clientStorage.setAsync('windowHeight', rect.height); a1513({ cmd: 'uiReturnFigSetWindowRect' }); });
})(); }
function z1581(dock, rect, bounds) { switch (dock) {
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
function d1582(width, height) { (function () {
    return __awaiter(this, void 0, void 0, function* () { width = Math.floor(Math.max(0, width)); height = Math.floor(Math.max(0, height)); figma.ui.resize(width, height); figma.currentPage.setPluginData(figma.currentUser.id + ',windowWidth', width.toString()); figma.currentPage.setPluginData(figma.currentUser.id + ',windowHeight', height.toString()); a1513({ cmd: 'uiReturnFigResizeWindow' }); });
})(); }
function u2722(dock) {
    return __awaiter(this, void 0, void 0, function* () { if (dock != 'normal' && a2721 == 'normal') {
        figma.clientStorage.setAsync('normalWindowX', yield figma.clientStorage.getAsync('normalWindowX'));
        figma.clientStorage.setAsync('normalWindowY', yield figma.clientStorage.getAsync('normalWindowY'));
        figma.clientStorage.setAsync('normalWindowWidth', yield figma.clientStorage.getAsync('normalWindowWidth'));
        figma.clientStorage.setAsync('normalWindowHeight', yield figma.clientStorage.getAsync('normalWindowHeight'));
    } a2721 = dock; figma.clientStorage.setAsync('windowDock', dock); d1582(yield figma.clientStorage.getAsync('windowWidth'), yield figma.clientStorage.getAsync('windowHeight')); });
}
function v1583(msg) { x1584(msg.text, msg.prefix, msg.delay, msg.error, msg.v1585, msg.r1586); }
function x1584(text, prefix = 'Generator ', delay = 400, error = false, v1585 = '', r1586 = NULL) { const options = { timeout: delay, error: error, onDequeue: f4010 }; if (v1585 != '') {
    options['button'] = { text: v1585 };
    if (r1586.substring(0, 'removeConnection'.length) == 'removeConnection') {
        options['button']['action'] = () => y1559(r1586.split(',')[1]);
    }
    else {
        switch (r1586) {
            case 'hideClearUndoWarning':
                options['button']['action'] = () => a1513({ cmd: 'uiHideClearUndoWarning' });
                break;
        }
    }
} if (k2720)
    k2720.cancel(); k2720 = figma.notify(prefix + text, options); }
function m2723(key, params = null) {
    return __awaiter(this, void 0, void 0, function* () { return yield p2724(key, params); });
}
function p2724(key, params = null) {
    return __awaiter(this, void 0, void 0, function* () { return new Promise((resolve, reject) => { const timeout = 60000; a1513(Object.assign({ cmd: 'uiGetValueForFigma', key: key }, (params || {}))); const l2725 = setTimeout(() => reject(new Error('Timeout: Result not received by Figma within the specified time')), timeout); function w4011(msg) { msg = JSON.parse(msg); if (msg.cmd === 'returnUiGetValueForFigma') {
        clearTimeout(l2725);
        resolve({ key: msg.key, value: msg.value });
        figma.ui.off('message', w4011);
    } } figma.ui.on('message', w4011); }); });
}
var o2726 = [];
var c2727 = [];
var u2728 = 0;
var b2729 = 0;
function z1514(t111) { return (t111[x1376] === 2 ? '' : z865) + (n2775 ? t111[c1370] : t111[b1372]); }
function t1515(c1499, addObject = null) { if (!o1517(c1499))
    return null; let x1500; switch (c1499[f1368]) {
    case g1212:
        x1500 = m2697(c1499);
        break;
    case j1215:
        x1500 = g2768(c1499);
        break;
    case b1218:
        x1500 = c2764(c1499);
        break;
    case p1224:
        x1500 = k2693(c1499);
        break;
    case u1227:
        x1500 = k2700(c1499);
        break;
    case b1230:
        x1500 = j2703(c1499);
        break;
    case l1233:
        x1500 = a2679(c1499);
        break;
    case g1237:
        x1500 = g2731(c1499);
        break;
    case c1249:
        x1500 = t2732(c1499);
        break;
    case t1271:
        x1500 = e2733(c1499);
        break;
    case s1252:
        x1500 = p2734(c1499);
        break;
    case o1255:
        x1500 = k2735(c1499);
        break;
} if (addObject && x1500 != undefined && x1500 != null && !x1500.removed) {
    x1500.name = z1514(c1499);
    o947(c1499[f1368] == s1252 || !!x1500, 'no Figma object created');
    if (x1500 != undefined && x1500 != null) {
        x1500.setPluginData('retain', c1499[x1376].toString());
        if (c1499[x1376] < 2) {
            x1500.setPluginData('userId', figma.currentUser.id);
            x1500.setPluginData('sessionId', figma.currentUser.sessionId.toString());
            x1500.setPluginData('type', c1499[f1368]);
            x1500.setPluginData('nodeId', c1499[o1369]);
            x1500.setPluginData('objectId', c1499[c1370]);
            x1500.setPluginData('isCenter', v932(c1499[h1391]));
            if (c1499[f1368] == l1233)
                g2749.push(x1500);
            if (c1499[a1390])
                r1530(x1500);
        }
        addObject(x1500);
    }
} if (!c1499.counted) {
    b2729++;
    c1499.counted = true;
} return x1500; }
function g1516(x1500, c1499) { if (!o1517(c1499) || x1500 == undefined || x1500 == null || x1500.removed)
    return; x1500.name = z1514(c1499); x1500.setPluginData('retain', c1499[x1376].toString()); switch (c1499[f1368]) {
    case g1212:
        d2698(x1500, c1499);
        break;
    case j1215:
        f2769(x1500, c1499);
        break;
    case b1218:
        a2765(x1500, c1499);
        break;
    case p1224:
        n2694(x1500, c1499);
        break;
    case u1227:
        h2701(x1500, c1499);
        break;
    case b1230:
        m2704(x1500, c1499);
        break;
    case l1233:
        p2736(x1500, c1499);
        break;
    case g1237:
        b2737(x1500, c1499);
        break;
    case c1249:
        r2738(x1500, c1499);
        break;
    case t1271:
        m2739(x1500, c1499);
        break;
    case s1252:
        u2740(x1500, c1499);
        break;
    case o1255:
        x2741(x1500, c1499);
        break;
} if (x1500 != undefined && x1500 != null && !x1500.removed) {
    x1500.parent.appendChild(x1500);
    if (c1499[a1390])
        r1530(x1500);
} if (!c1499.counted) {
    b2729++;
    c1499.counted = true;
} }
function f2716(c2742, n2743, g2744, k2031 = -1, nodeIds = [], d2745 = false, k2746 = false, j270 = false) {
    return __awaiter(this, void 0, void 0, function* () { let e2747 = NULL; let u2748 = null; let abort = false; const l3618 = []; let v2730 = 0; o2726.push(...nodeIds); if (k2031 > -1)
        u2728 = k2031; for (const c1499 of n2743) {
        c2727.push(c1499);
        if (c1499[o1369] != e2747) {
            e2747 = c1499[o1369];
            u2748 = w2713.find(a => a.nodeId == c1499[o1369]);
            if (!u2748) {
                w2713.push(u2748 = { nodeId: c1499[o1369], objects: [] });
            }
        }
        const addObject = x1500 => { if (c2742 != undefined && c2742 != null && !c2742.removed)
            c2742.appendChild(x1500);
        else
            u2748.objects.push(x1500); };
        let objects = c2742 != undefined && c2742 != null && !c2742.removed ? c2742.children : u2748.objects;
        let x1500 = objects.find(o => o.removed || o.getPluginData('userId') == figma.currentUser.id && o.getPluginData('objectId') == c1499[c1370]);
        if (x1500 != undefined && x1500 != null && x1500.removed) {
            h933(objects, x1500);
            if (g2749.includes(x1500))
                j938(g2749, x1500);
            if (q2757.includes(x1500))
                j938(q2757, x1500);
        }
        if (x1500 == undefined || x1500 == null || x1500.removed) {
            const newObj = t1515(c1499, addObject);
            l3618.push(newObj);
        }
        else if (x1500 != undefined && x1500 != null && !x1500.removed && x1500.getPluginData('type') == c1499[f1368].toString()) {
            g1516(x1500, c1499);
            if (x1500 != undefined && x1500 != null && !x1500.removed)
                l3618.push(x1500);
        }
        else {
            x1500.remove();
            if (g2749.includes(x1500))
                j938(g2749, x1500);
            if (q2757.includes(x1500))
                j938(q2757, x1500);
            t1515(c1499, addObject);
        }
        v2730++;
        if (v2730 >= g2744) {
            const result = yield m2723('returnObjectUpdate', { u2728: u2728, b2729: b2729 });
            abort = result.value;
            v2730 = 0;
            if (abort)
                break;
        }
    } if (c2742 != undefined && c2742 != null && !c2742.removed) {
        for (const x1500 of c2742.children) {
            if (x1500 != undefined && x1500 != null && x1500.removed || !n2743.find(o => o[c1370] == x1500.getPluginData('objectId') && x1500.getPluginData('userId') == figma.currentUser.id))
                x1500.remove();
        }
    } for (const point of g2749) {
        if (point != undefined && point != null && !point.removed && !point.parent.removed)
            point.parent.appendChild(point);
    } if (k2746 && !abort) {
        k1496(o2726, c2727);
        o2726 = [];
        c2727 = [];
        if (j270 && l3618.length > 0) {
            figma.viewport.scrollAndZoomIntoView(l3618);
            const bounds = c1520(l3618);
            figma.viewport.zoom = Math.min(figma.viewport.bounds.width * figma.viewport.zoom / bounds.width - 0.05, figma.viewport.bounds.height * figma.viewport.zoom / bounds.height - 0.05);
        }
    } yield m2723('returnObjectUpdate', { u2728: u2728, b2729: b2729 }); });
}
function o1517(c1499) { switch (c1499[f1368]) {
    case g1212: return j2696(c1499);
    case j1215: return p2750(c1499);
    case b1218: return t2751(c1499);
    case p1224: return v4007(c1499);
    case u1227: return i2699(c1499);
    case b1230: return d2702(c1499);
    case l1233: return d4006(c1499);
    case g1237: return i2752(c1499);
    case c1249: return y2753(c1499);
    case t1271: return y2754(c1499);
    case s1252: return k2755(c1499);
    case o1255: return m2756(c1499);
} }
function j1518(c1499) { (() => __awaiter(this, void 0, void 0, function* () { const x1500 = t1515(c1499); const width = x1500.width; const height = x1500.height; x1500.remove(); a1513({ cmd: 'uiForwardToGenerator', msg: { cmd: 'returnFigGetObjectSize', objectId: c1499[c1370], width: width, height: height } }); }))(); }
function m1519(x1500) { x1500.setPluginData('type', ''); x1500.setPluginData('nodeId', ''); x1500.setPluginData('userId', ''); x1500.setPluginData('sessionId', ''); x1500.setPluginData('objectId', ''); x1500.setPluginData('isCenter', ''); x1500.setPluginData('retain', ''); }
function c1520(objects) { const bounds = { left: 0, top: 0, right: 0, bottom: 0 }; for (const t111 of objects) {
    if (t111.x < bounds.left || bounds.left == bounds.right)
        bounds.left = t111.x;
    if (t111.y < bounds.top || bounds.top == bounds.bottom)
        bounds.top = t111.y;
    if (t111.x + t111.width > bounds.right || bounds.left == bounds.right)
        bounds.right = t111.x + t111.width;
    if (t111.y + t111.height > bounds.bottom || bounds.top == bounds.bottom)
        bounds.bottom = t111.y + t111.height;
} return { x: bounds.left, y: bounds.top, width: bounds.right - bounds.left, height: bounds.bottom - bounds.top }; }
const q2757 = [];
const u2758 = [];
function g1521(i1522, f1523) { const effects = []; for (const effect of i1522) {
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
                if (f1523 && !isNaN(spread))
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
function o2686(x1500, c1499, phantom = true) { y1526(x1500, c1499); a2687(x1500, c1499, phantom); l2688(x1500, c1499); x1500.opacity = c1499[x1392]; x1500.blendMode = c1499[o1393]; const maskType = c1499[m1394]; x1500.isMask = maskType > 0; if (x1500.isMask) {
    switch (maskType) {
        case 1:
            x1500.maskType = 'ALPHA';
            break;
        case 2:
            x1500.maskType = 'VECTOR';
            break;
        case 3:
            x1500.maskType = 'LUMINANCE';
            break;
    }
} if (x1500.isMask && x1500.fills.length == 0 && x1500.strokes.length == 0)
    x1500.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 }, opacity: 1, blendMode: 'NORMAL' }]; }
function l2688(x1500, c1499) { if (!!c1499[r1381] && !isEmpty(c1499[r1381])) {
    x1500.fills = m951(c1499[r1381]);
    if (q2757.includes(x1500))
        j938(q2757, x1500);
}
else
    x1500.fills = []; }
function a2687(x1500, c1499, phantom = true) { if (c1499[k1382] != null && !isEmpty(c1499[k1382])) {
    z1525(x1500, m951(c1499[k1382]), c1499[s1383], c1499[j1384], c1499[r1385], c1499[h1386], c1499[a1387], n2689(c1499[f1388]));
    if (c1499[a1390])
        x1500.setPluginData('dashes', c1499[f1388]);
    if (q2757.includes(x1500))
        j938(q2757, x1500);
    if (c1499[a1390])
        h944(u2758, x1500);
}
else if (isEmpty(c1499[r1381]) && isEmpty(c1499[k1382]) && !c1499[m1394] && phantom) {
    j1528(x1500);
    h944(q2757, x1500);
}
else
    x1500.strokes = []; }
function n2689(k1524) { k1524 = k1524; k1524 = v949(k1524, ','); k1524 = l950(k1524, ','); k1524 = k1524.trim(); return k1524 == '' ? [] : k1524.split(',').map(s => Math.max(0, parseFloat(s))); }
function p2690(k1524) { k1524 = k1524; k1524 = v949(k1524, ','); k1524 = l950(k1524, ','); k1524 = k1524.trim(); return k1524 == '' ? [] : k1524.split(',').map(s => Math.max(0, parseFloat(s) / b2692)); }
function z1525(x1500, fills, weight, align, join, miterLimit, cap, dashes = []) { x1500.strokes = fills; x1500.strokeWeight = Math.max(0, weight); x1500.strokeAlign = align; x1500.strokeJoin = join; const miterAngle = miterLimit / 360 * Tau; const b2759 = 1 / Math.sin(miterAngle / 2); x1500.strokeMiterLimit = Math.min(Math.max(0, b2759), 16); x1500.strokeCap = cap; x1500.dashPattern = dashes; }
function y1526(x1500, c1499) { if (!!c1499[o1389] && !isEmpty(c1499[o1389])) {
    const f1523 = c1499[f1368] == g1212 || c1499[f1368] == b1218 || c1499[f1368] == o1255;
    x1500.effects = g1521(c1499[o1389], f1523);
}
else
    x1500.effects = []; }
function w1527() { for (const t111 of q2757) {
    if (t111.removed)
        j938(q2757, t111);
    else
        j1528(t111);
} }
function j1528(t111) { const back = figma.currentPage.backgrounds.find(b => b.type == 'SOLID'); let phantomColor; if (back) {
    const l = back.color.r * 0.2126 + back.color.g * 0.7152 + back.color.b * 0.0722;
    phantomColor = l > 0.5 ? { r: 0, g: 0, b: 0 } : { r: 1, g: 1, b: 1 };
}
else
    phantomColor = { r: 1, g: 0, b: 1 }; z1525(t111, [{ type: 'SOLID', color: phantomColor, opacity: 0.5 }], 1 / b2692, 'CENTER', 'MITER', 1, 'NONE', [1 / b2692, 2 / b2692]); }
function i1529() { for (const x1500 of u2758) {
    if (x1500.removed)
        j938(u2758, x1500);
    else
        r1530(x1500);
} }
function r1530(x1500) { x1500.strokeWeight = Math.max(0, 1 / b2692); if (y918(x1500.getPluginData('isCenter'))) {
    const path = x1500.vectorPaths[0];
    const parts = path.data.split(' ');
    let t = { x: parseFloat(parts[1]), y: parseFloat(parts[2]) };
    let c = { x: parseFloat(parts[4]), y: parseFloat(parts[5]) };
    let r = { x: parseFloat(parts[7]), y: parseFloat(parts[8]) };
    const a = 2;
    const b = 0.05;
    const f = 1 - Math.pow(1 - Math.min(b2692, 1), a) / Math.pow(a, b);
    t = o890(c, v892(a877(z895(t, c)), 10 / f));
    r = o890(c, v892(a877(z895(r, c)), 10 / f));
    parts[1] = t.x;
    parts[2] = t.y;
    parts[4] = c.x;
    parts[5] = c.y;
    parts[7] = r.x;
    parts[8] = r.y;
    const g2760 = { windingRule: path.windingRule, data: parts.join(' ') };
    x1500.vectorPaths = [g2760];
} const dashes = x1500.getPluginData('dashes'); if (dashes != '')
    x1500.dashPattern = p2690(dashes); }
function y1564(nodeId, px, py) { const _styles = figma.getLocalPaintStyles(); const styles = new Array(); for (const s168 of _styles) {
    const _nodeId = s168.getPluginData('nodeId');
    const _existing = s168.getPluginData('existing');
    const existing = !!_existing;
    const style = { id: s168.id, nodeId: _nodeId, name: s168.name, existing: existing, paints: new Array() };
    let onlyPaint = true;
    for (const w2762 of s168.paints) {
        if (w2762.type == 'SOLID') {
            style.paints.push([w2762.color.r, w2762.color.g, w2762.color.b, w2762.opacity]);
        }
        else {
            onlyPaint = false;
            break;
        }
    }
    if (onlyPaint)
        styles.push(style);
} a1513({ cmd: 'uiReturnFigGetAllLocalColorStyles', nodeId: nodeId, px: px, py: py, styles: JSON.stringify(styles) }); }
function w1565(nodeId, styleId) { const c1567 = figma.getLocalPaintStyles(); if (styleId != NULL)
    j1566(c1567, nodeId, styleId);
else
    m1568(c1567, nodeId); }
function j1566(c1567, nodeId, styleId, clearExisting = true) { const k2761 = g2715.find(a => a.nodeId == nodeId); if (k2761 && clearExisting)
    m1568(c1567, nodeId); const e1572 = c1567.find(s => s.id == styleId); o947(!!e1572, 'figStyle should be found here'); e1572.setPluginData('type', p1209); e1572.setPluginData('nodeId', nodeId); e1572.setPluginData('existing', v932(true)); g2715.push({ nodeId: nodeId, existing: true, styles: [e1572] }); return e1572; }
function m1568(c1567, nodeId) { const e1572 = c1567.find(s => s.getPluginData('nodeId') == nodeId); o947(!!e1572, 'figStyle should be found here'); if (e1572) {
    e1572.setPluginData('type', NULL);
    e1572.setPluginData('nodeId', NULL);
    e1572.setPluginData('existing', NULL);
    t940(g2715, a => a.nodeId == nodeId);
} return e1572; }
function f1569(styles, h1573) { const e1572 = figma.createPaintStyle(); e1572.setPluginData('type', h1573[f1368]); e1572.setPluginData('nodeId', h1573[o1369]); e1572.name = h1573[p1373]; setStylePaints(e1572, h1573); styles.push(e1572); a1513({ cmd: 'uiSetStyleId', nodeId: h1573[o1369], styleId: e1572.id }); return e1572; }
function h1570(msg) { let e2747 = NULL; let k2761; for (const h1573 of msg.styles) {
    if (h1573[o1369] != e2747) {
        e2747 = h1573[o1369];
        k2761 = g2715.find(a => a.nodeId == h1573[o1369]);
        if (!k2761) {
            k2761 = { nodeId: h1573[o1369], styles: [] };
            g2715.push(k2761);
        }
    }
    else
        k2761 = null;
    const e1572 = k2761.styles[0];
    const c1567 = figma.getLocalPaintStyles();
    const localStyle = c1567.find(s => s.getPluginData('nodeId') == h1573[o1369]);
    if (isValid(e1572) && !isValid(localStyle)) {
        h933(k2761.styles, e1572);
    }
    const existing = isValid(e1572) && isValid(localStyle) && e1572.getPluginData('existing');
    if (!isValid(e1572) || !isValid(localStyle)) {
        if (!existing) {
            b1503 = true;
            w1565(h1573[o1369], h1573[w1371]);
        }
    }
    else if (isValid(e1572) && e1572.getPluginData('type') == h1573[f1368]) {
        b1503 = true;
        j1571(localStyle, h1573);
    }
} }
function j1571(e1572, h1573) { setStylePaints(e1572, h1573); e1572.name = h1573[p1373]; }
function getStylePaints(stylePaints) { const paints = new Array(); for (const w2762 of stylePaints) {
    const fill = w2762[1].split(' ');
    switch (w2762[0]) {
        case 'SOLID':
            paints.push({ type: 'SOLID', color: { r: Math.min(Math.max(0, parseFloat(fill[0]) / 0xff), 1), g: Math.min(Math.max(0, parseFloat(fill[1]) / 0xff), 1), b: Math.min(Math.max(0, parseFloat(fill[2]) / 0xff), 1) }, opacity: Math.min(Math.max(0, parseFloat(fill[3]) / 100), 1) });
            break;
    }
} return paints; }
function setStylePaints(e1572, h1573) { if (!isEmpty(h1573[s1375]))
    e1572.paints = getStylePaints(h1573[s1375]);
else
    e1572.paints = []; }
function d1587(nodeId, px, py) { const w2763 = figma.variables.getLocalVariables(); const variables = new Array(); for (const _var of w2763) {
    const variable = { id: _var.id, resolvedType: _var.resolvedType, name: _var.name, collectionName: figma.variables.getVariableCollectionById(_var.variableCollectionId).name };
    variables.push(variable);
} a1513({ cmd: 'uiReturnFigGetAllLocalVariables', nodeId: nodeId, px: px, py: py, variables: JSON.stringify(variables), nCollections: figma.variables.getLocalVariableCollections().length }); }
function m1588(varIds) { const w2763 = figma.variables.getLocalVariables(); const variables = varIds.map(id => w2763.find(v => v.id == id)); let values = []; for (let i = 0; i < varIds.length; i++) {
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
function w1589(nodeId, varId) { const w2763 = figma.variables.getLocalVariables(); w1591(w2763, nodeId, varId); }
function f1590(varId, value) { const w2763 = figma.variables.getLocalVariables(); const variable = w2763.find(v => v.id == varId); if (!variable)
    return; const collection = figma.variables.getVariableCollectionById(variable.variableCollectionId); if (variable.resolvedType == 'BOOLEAN')
    value = value != 0; if (value !== null)
    variable.setValueForMode(collection.modes[0].modeId, value); }
function w1591(w2763, nodeId, varId) { const variable = w2763.find(v => v.id == varId); const values = []; if (variable) {
    const collection = figma.variables.getVariableCollectionById(variable.variableCollectionId);
    for (const mode of collection.modes)
        values.push(variable.valuesByMode[mode.modeId]);
} a1513({ cmd: 'uiReturnFigLinkNodeToVariable', nodeId: nodeId, variableId: variable ? variable.id : NULL, variableName: variable ? variable.name : '', resolvedType: variable ? variable.resolvedType : NULL, values: values }); return variable; }
function k1574(tl, tr, bl) { let vr = point(tr.x - tl.x, tr.y - tl.y); let vb = point(bl.x - tl.x, bl.y - tl.y); let sx = vr.x; let sy = vb.y; let kx = -vr.y; let ky = -vb.x; let dx = -tl.x; let dy = -tl.y; const _sx = kx / nozero(sx); const _sy = ky / nozero(sy); let v4188 = c880([[1, _sy, 0], [_sx, 1, 0], [0, 0, 1]], d884(dx, dy)); v4188 = x882(v4188); const a = angle(vr); if (a > Tau / 4 && a < Tau * 3 / 4)
    v4188 = c880(v4188, d884(0, 0, 1, 1, Tau / 2)); if (determinant(v4188) < 0)
    v4188 = c880(v4188, d884(0, 0, -1, 1, 0)); return v4188; }
function b1575(x1500, tl, tr, bl) { const v4188 = k1574(tl, tr, bl); x1500.relativeTransform = [v4188[0], v4188[1]]; }
function c1576(x1500, c1499, setSize = true, noHeight = 0.01) { if (!c1499[p1377] || !c1499[s1378] || !c1499[d1379])
    return; const xp0 = c1499[p1377]; const xp1 = c1499[s1378]; const xp2 = c1499[d1379]; b1575(x1500, xp0, xp1, xp2); if (setSize) {
    const q885 = distance(xp0, xp1);
    const i886 = distance(xp0, xp2);
    const height = c1499[f1368] == b1230 ? c1499[b1412] : c1499[a1399];
    if (!x1500.removed) {
        x1500.resizeWithoutConstraints(Math.max(0.01, q885), height ? Math.max(0.01, i886) : noHeight);
    }
} }
function x1577(h2684, g2685) { if (h2684.removed)
    return; h2684.resizeWithoutConstraints(0.01, 0.01); h2684.setPluginData('actualX', g2685[e1395].toString()); h2684.setPluginData('actualY', g2685[n1397].toString()); h2684.x = g2685[e1395]; h2684.y = g2685[n1397]; h2684.rotation = g2685[h1391] ? 45 : 0; }
function n1578(h2684) { if (!h2684.removed)
    h2684.resizeWithoutConstraints(0.01, 0.01); }
function y2754(genBool) { return genBool.children.length > 0; }
function e2733(genBool) { let objects = []; for (const t111 of genBool.children)
    t1515(t111, o => objects = [...objects, o]); let figBool = null; if (!isEmpty(objects)) {
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
    c1576(figBool, genBool);
    if (!y2754(genBool))
        return figBool;
} return figBool; }
function m2739(figBool, genBool, isValid = false) { if (!isValid && !y2754(genBool)) {
    figBool.remove();
    return;
} c1576(figBool, genBool); f2716(figBool, genBool.children, genBool.children.length); }
function t2751(genEllipse) { return genEllipse[e1395] != null && !isNaN(genEllipse[e1395]) && genEllipse[n1397] != null && !isNaN(genEllipse[n1397]) && genEllipse[v1398] != null && !isNaN(genEllipse[v1398]) && genEllipse[a1399] != null && !isNaN(genEllipse[a1399]) && genEllipse[e1401] != null && !isNaN(genEllipse[e1401]) && genEllipse[z1408] != null && !isNaN(genEllipse[z1408]) && genEllipse[b1414] != null && !isNaN(genEllipse[b1414]) && genEllipse[a1418] != null && !isNaN(genEllipse[a1418]); }
function c2764(genEllipse) { if (!t2751(genEllipse))
    return null; const figEllipse = figma.createEllipse(); a2765(figEllipse, genEllipse, true); return figEllipse; }
function a2765(figEllipse, genEllipse, isValid = false) { if (!isValid && !t2751(genEllipse))
    return; s2766(figEllipse, genEllipse); if (g2749.includes(figEllipse))
    t2681(figEllipse);
else
    o2686(figEllipse, genEllipse); }
function s2766(figEllipse, genEllipse) { figEllipse.cornerRadius = genEllipse[e1401]; figEllipse.arcData = { startingAngle: genEllipse[z1408] / 360 * (Math.PI * 2), endingAngle: genEllipse[b1414] / 360 * (Math.PI * 2), innerRadius: Math.min(Math.max(0, genEllipse[a1418] / 100), 1) }; c1576(figEllipse, genEllipse); }
function m2756(genFrame) { return genFrame[e1395] != null && !isNaN(genFrame[e1395]) && genFrame[n1397] != null && !isNaN(genFrame[n1397]) && genFrame[v1398] != null && !isNaN(genFrame[v1398]) && genFrame[a1399] != null && !isNaN(genFrame[a1399]) && genFrame[a1407] != null && !isNaN(genFrame[a1407]); }
function k2735(genFrame) { if (!m2756(genFrame))
    return null; const figFrame = figma.createFrame(); if (figFrame) {
    f2767(figFrame, genFrame);
    let objects = [];
    for (const t111 of genFrame[g1413])
        t1515(t111, o => objects = [...objects, o]);
    for (const t111 of objects)
        figFrame.appendChild(t111);
} return figFrame; }
function x2741(figFrame, genFrame) { f2767(figFrame, genFrame); f2716(figFrame, genFrame[g1413], genFrame[g1413].length); }
function f2767(figFrame, genFrame) { figFrame.cornerRadius = genFrame[a1407]; c1576(figFrame, genFrame); o2686(figFrame, genFrame, genFrame[g1413].length == 0); }
function k2755(genGroup) { return true; }
function p2734(genGroup) { let objects = []; for (const t111 of genGroup[z1396])
    t1515(t111, o => objects = [...objects, o]); const figGroup = !isEmpty(objects) ? figma.group(objects, figma.currentPage) : null; if (figGroup)
    u2740(figGroup, genGroup); return figGroup; }
function u2740(figGroup, genGroup) { if (genGroup[z1396].length == 0) {
    figGroup.remove();
    return;
} f2716(figGroup, genGroup[z1396], genGroup[z1396].length); y1526(figGroup, genGroup); }
function p2750(genLine) { return genLine[e1395] != null && !isNaN(genLine[e1395]) && genLine[n1397] != null && !isNaN(genLine[n1397]) && genLine[v1398] != null && !isNaN(genLine[v1398]); }
function g2768(genLine) { if (!p2750(genLine))
    return null; const figLine = figma.createLine(); f2769(figLine, genLine, true); return figLine; }
function f2769(figLine, genLine, isValid = false) { if (!isValid && !p2750(genLine))
    return; c1576(figLine, genLine, true, 0); o2686(figLine, genLine); }
var g2749 = [];
function d4006(g2685) { return g2685[e1395] != null && !isNaN(g2685[e1395]) && g2685[n1397] != null && !isNaN(g2685[n1397]); }
function a2679(g2685) { const h2684 = g2685[h1391] ? figma.createRectangle() : figma.createEllipse(); if (!d4006(g2685))
    return h2684; if (g2749.includes(h2684))
    e2683(h2684, g2685);
else
    p2736(h2684, g2685); return h2684; }
function p2736(h2684, g2685) { x1577(h2684, g2685); l2682(h2684); }
function r2680() { a1513({ cmd: 'uiUpdateZoom', zoom: figma.viewport.zoom }); for (const point of g2749)
    t2681(point); }
function t2681(h2684) { n1578(h2684); l2682(h2684); }
function e2683(h2684, g2685) { x1577(h2684, g2685); l2682(h2684); }
function l2682(h2684) { if (h2684.removed)
    return; const x3717 = y918(h2684.getPluginData('isCenter')); const u2691 = figma.currentPage.selection.includes(h2684); const color = x3717 ? [0xf2, 0x48, 0x22] : u2691 ? [12, 140, 233] : [255, 255, 255]; const border = x3717 ? [255, 255, 255] : u2691 ? [255, 255, 255] : [12, 140, 233]; h2684.fills = m951([['SOLID', color[0], color[1], color[2], 100]]); const effects = []; effects.push(...g1521([['DROP_SHADOW', border[0] / 255, border[1] / 255, border[2] / 255, 1, 0, 0, 0, (x3717 ? 3 : u2691 ? 5 : 3.6) / b2692, 'NORMAL', true, true]], true)); effects.push(...g1521([['DROP_SHADOW', color[0] / 255, color[1] / 255, color[2] / 255, 1, 0, 0, 0, (u2691 ? 4 : 2.4) / b2692, 'NORMAL', true, true]], true)); h2684.effects = effects; }
function v4007(genPoly) { return genPoly[e1395] != null && !isNaN(genPoly[e1395]) && genPoly[n1397] != null && !isNaN(genPoly[n1397]) && genPoly[v1398] != null && !isNaN(genPoly[v1398]) && genPoly[a1399] != null && !isNaN(genPoly[a1399]) && genPoly[k1404] != null && !isNaN(genPoly[k1404]) && genPoly[l1410] != null && !isNaN(genPoly[l1410]); }
function k2693(genPoly) { if (!v4007(genPoly))
    return null; const figPoly = figma.createPolygon(); n2694(figPoly, genPoly, true); return figPoly; }
function n2694(figPoly, genPoly, isValid = false) { if (!isValid && !v4007(genPoly))
    return; figPoly.cornerRadius = genPoly[k1404]; figPoly.pointCount = Math.max(3, genPoly[l1410]); c1576(figPoly, genPoly); o2686(figPoly, genPoly); }
function j2696(v2695) { return v2695[e1395] != null && !isNaN(v2695[e1395]) && v2695[n1397] != null && !isNaN(v2695[n1397]) && v2695[v1398] != null && !isNaN(v2695[v1398]) && v2695[a1399] != null && !isNaN(v2695[a1399]) && v2695[s1400] != null && !isNaN(v2695[s1400]); }
function m2697(v2695) { if (!j2696(v2695))
    return null; const figRect = figma.createRectangle(); d2698(figRect, v2695, true); return figRect; }
function d2698(figRect, v2695, isValid = false) { if (!isValid && !j2696(v2695))
    return; const found = v2695[o1389].findIndex(e => e[0] == 'ROUND_CORNERS'); if (found > -1) {
    const corners = v2695[o1389][found];
    figRect.topLeftRadius = corners[1];
    figRect.topRightRadius = corners[2];
    figRect.bottomLeftRadius = corners[3];
    figRect.bottomRightRadius = corners[4];
}
else
    figRect.cornerRadius = v2695[s1400]; c1576(figRect, v2695); o2686(figRect, v2695); }
function i2699(x2709) { return x2709[e1395] != null && !isNaN(x2709[e1395]) && x2709[n1397] != null && !isNaN(x2709[n1397]) && x2709[v1398] != null && !isNaN(x2709[v1398]) && x2709[a1399] != null && !isNaN(x2709[a1399]) && x2709[a1405] != null && !isNaN(x2709[a1405]) && x2709[y1411] != null && !isNaN(x2709[y1411]) && x2709[j1416] != null && !isNaN(x2709[j1416]); }
function k2700(x2709) { if (!i2699(x2709))
    return null; const g2710 = figma.createStar(); h2701(g2710, x2709, true); return g2710; }
function h2701(g2710, x2709, isValid = false) { if (!isValid && !i2699(x2709))
    return; g2710.cornerRadius = x2709[a1405]; g2710.pointCount = x2709[y1411]; g2710.innerRadius = Math.min(Math.max(0, x2709[j1416] / 100), 1); c1576(g2710, x2709); o2686(g2710, x2709); }
const x4250 = [];
function d2702(m2706) { return m2706[w1417] != null && m2706[e1395] != null && !isNaN(m2706[e1395]) && m2706[n1397] != null && !isNaN(m2706[n1397]) && m2706[v1398] != null && !isNaN(m2706[v1398]) && m2706[a1399] != null && !isNaN(m2706[a1399]) && m2706[a1419] != null && m2706[a1419] != NULL && m2706[i1420] != null && !isNaN(m2706[i1420]); }
function j2703(m2706) { if (!d2702(m2706))
    return null; const q2770 = figma.createText(); m2704(q2770, m2706, true); return q2770; }
function m2704(q2770, m2706, isValid = false) { if (!isValid && !d2702(m2706))
    return null; const fontName = { family: m2706[a1419], style: m2706[x1421] }; try {
    if (!x4250.includes(fontName)) {
        figma.loadFontAsync(fontName).then(() => { x4250.push(fontName); v2705(q2770, m2706, fontName); });
    }
    else {
        v2705(q2770, m2706, fontName);
    }
}
catch (e) {
    w948(e);
} }
function v2705(q2770, m2706, fontName) { q2770.fontName = fontName; q2770.fontSize = Math.max(1, m2706[i1420]); q2770.characters = m2706[w1417]; q2770.lineHeight = { unit: 'PERCENT', value: m2706[n1424] }; q2770.letterSpacing = { unit: 'PERCENT', value: m2706[v1425] }; if (m2706[p1422] == 0)
    q2770.textAlignHorizontal = 'LEFT';
else if (m2706[p1422] == 1)
    q2770.textAlignHorizontal = 'CENTER';
else if (m2706[p1422] == 2)
    q2770.textAlignHorizontal = 'RIGHT';
else if (m2706[p1422] == 3)
    q2770.textAlignHorizontal = 'JUSTIFIED'; if (m2706[r1423] == 0)
    q2770.textAlignVertical = 'TOP';
else if (m2706[r1423] == 1)
    q2770.textAlignVertical = 'CENTER';
else if (m2706[r1423] == 2)
    q2770.textAlignVertical = 'BOTTOM'; c1576(q2770, m2706); o2686(q2770, m2706); if (m2706[s1406] == 0 && m2706[b1412] == 0)
    q2770.textAutoResize = 'WIDTH_AND_HEIGHT';
else if (m2706[s1406] == 0)
    q2770.textAutoResize = 'HEIGHT';
else
    q2770.textAutoResize = 'NONE'; }
function y2753(l2711) { return true; }
function t2732(l2711) { if (!y2753(l2711))
    return null; const k2712 = figma.createVector(); r2738(k2712, l2711, true); return k2712; }
function r2738(k2712, l2711, isValid = false) { if (!isValid && !y2753(l2711))
    return; k2712.vectorNetwork = l2711[t1402]; c1576(k2712, l2711, false); o2686(k2712, l2711); }
function i2752(r2707) { return r2707[v1409] != null && !isNaN(r2707[v1409]) && r2707[t1415] != null && !isNaN(r2707[t1415]); }
function g2731(r2707) { const y2708 = figma.createVector(); b2737(y2708, r2707, true); return y2708; }
function b2737(y2708, r2707, isValid = false) { if (!isValid && !i2752(r2707))
    return; y2708.vectorPaths = [{ windingRule: r2707[v1409] == 1 ? 'NONZERO' : 'EVENODD', data: r2707[z1403] }]; y2708.cornerRadius = r2707[t1415]; c1576(y2708, r2707, false); o2686(y2708, r2707); }
