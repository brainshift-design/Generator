var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function l1043(key, tag) { return key.substring(0, tag.length + 1) == tag + ' '; }
function m1044(key, tag) { return key.substring(tag.length + 1); }
function h1045(key) { return l1043(key, c867); }
function j1046(key) { return l1043(key, f865); }
function u1047(key) { return l1043(key, y866); }
function h1048(key) { return m1044(key, c867); }
function k1049(key) { return m1044(key, f865); }
function v1050(key) { return m1044(key, y866); }
const k858 = 327;
const u859 = 2147483647;
const NULL = '';
const g860 = '  ';
const g861 = '    ';
const z862 = '\n';
const a863 = '◦ G •';
const e864 = a863 + ' ';
const f865 = 'G_NODE';
const y866 = 'G_CONN';
const c867 = 'G_PAGE';
const s868 = 'G_TEMP';
const identity = Object.freeze([[1, 0, 0], [0, 1, 0], [0, 0, 1]]);
const Epsilon = 0.0000001;
const Tau = Math.PI * 2;
var z2516 = false;
function t869(x, eps = 0.000000001) { return Math.abs(x) < eps ? 0 : x; }
function nozero(x, eps = 0.000000001) { return x != 0 ? x : (x < 0 ? -eps : eps); }
function l870(v, eps = 0.000000001) { return point(nozero(v.x, eps), nozero(v.y, eps)); }
function equal(a, b, eps = 0.000000001) { return Math.abs(b - a) < eps; }
function sqr(x) { return x * x; }
;
function cube(x) { return x * x * x; }
;
function w871(f) { return Math.floor(f) | 0; }
function t872(x) { x = w871(x); x--; x |= x >> 1; x |= x >> 2; x |= x >> 4; x |= x >> 8; x |= x >> 16; x |= x >> 32; return ++x; }
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
function l873(v1, v2) { return p874(v1.x, v1.y, v2.x, v2.y); }
function p874(x1, y1, x2, y2) { const dx = x2 - x1; const dy = y2 - y1; let angle = Math.atan2(dy, dx); if (angle < 0)
    angle += Tau; return angle; }
function z875(v) { return Math.sqrt(v.x * v.x + v.y * v.y); }
function z876(v) { return point(v.x == 0 ? 0 : v.x / z875(v), v.y == 0 ? 0 : v.y / z875(v)); }
function dot(v1, v2) { return v1.x * v2.x + v1.y * v2.y; }
function t877(a1, a2) { let diff = a2 - a1; while (diff <= -Tau / 2)
    diff += Tau; while (diff > Tau / 2)
    diff -= Tau; return diff; }
function f878(v, m) { let v3 = [v.x, v.y, 1]; let r = v942(v3, m); return point(r[0], r[1]); }
function f879(...mm) { s946(mm.length > 0, 'mulm3m3() must take at least one argument'); let result = clone(mm[0]); for (let a = 1; a < mm.length; a++) {
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
function a880(m, s) { for (let i = 0; i < 3; i++)
    for (let j = 0; j < 3; j++)
        m[i][j] /= s; return m; }
function adjugate(m) { return cofactor(transpose(m)); }
function transpose(m) { return [[m[0][0], m[1][0], m[2][0]], [m[0][1], m[1][1], m[2][1]], [m[0][2], m[1][2], m[2][2]]]; }
function cofactor(m) { return [[m[1][1] * m[2][2] - m[2][1] * m[1][2], -(m[1][0] * m[2][2] - m[2][0] * m[1][2]), m[1][0] * m[2][1] - m[2][0] * m[1][1]], [-(m[0][1] * m[2][2] - m[2][1] * m[0][2]), m[0][0] * m[2][2] - m[2][0] * m[0][2], -(m[0][0] * m[2][1] - m[2][0] * m[0][1])], [m[0][1] * m[1][2] - m[1][1] * m[0][2], -(m[0][0] * m[1][2] - m[1][0] * m[0][2]), m[0][0] * m[1][1] - m[1][0] * m[0][1]]]; }
function determinant(m) { return m[0][0] * (m[1][1] * m[2][2] - m[1][2] * m[2][1]) - m[0][1] * (m[1][0] * m[2][2] - m[2][0] * m[1][2]) + m[0][2] * (m[1][0] * m[2][1] - m[2][0] * m[1][1]); }
function m881(m) { return a880(adjugate(m), determinant(m)); }
function q882(angle) { const cosA = t869(Math.cos(angle)); const sinA = t869(Math.sin(angle)); return [[cosA, sinA, 0], [-sinA, cosA, 0], [0, 0, 1]]; }
function f883(x = 0, y = 0, q884 = 1, z885 = 1, angle = 0, m886 = 0, a887 = 0) { const cosA = Math.cos(angle); const sinA = Math.sin(angle); return [[q884 * cosA - a887 * sinA, -m886 * cosA + z885 * sinA, x], [a887 * cosA + q884 * sinA, z885 * cosA + m886 * sinA, y], [0, 0, 1]]; }
function a888(v1, v2) { return v1.x * v2.y - v1.y * v2.x; }
function y889(v1, v2) { return point(v1.x + v2.x, v1.y + v2.y); }
function d890(v1, v2) { return point(v1.x * v2.x, v1.y * v2.y); }
function r891(v, s) { return point(v.x * s, v.y * s); }
function z892(v1, v2) { return point(v1.x / v2.x, v1.y / v2.y); }
function j893(v, s) { return point(v.x / s, v.y / s); }
function u894(v1, v2) { return point(v1.x - v2.x, v1.y - v2.y); }
function q895(str) { return decodeURI(encodeURIComponent(str)); }
function q896(str) { return decodeURIComponent(encodeURI(str)); }
function s897(bytes) { let str = ''; for (let i = 0; i < bytes.length; i++)
    str += String.fromCharCode(bytes[i]); return str; }
function x898(str) { return Array.from(q896(str), c => c.charCodeAt(0)); }
function n899(array, size) { const newArray = new Uint8Array(size); g900(array, newArray); return newArray; }
function g900(src, dst) { h901(src, 0, src.length, dst, 0, dst.length); }
function h901(src, u902, t903, dst, e904, t905) { const size = Math.min(t903, t905); for (let i = 0; i < size; i++)
    dst[e904 + i] = src[u902 + i]; }
function g906(b907, e908) { if (b907.length != e908.length)
    return false; for (let i = 0; i < b907.length; i++) {
    if (b907[i] != e908[i])
        return false;
} return true; }
function v909(w910, t911) { return w910.findIndex(i => t911.includes(i)) > -1; }
function z912(list) { return list ? '<==' : '<--'; }
;
function f913(list) { return list ? '==>' : '-->'; }
;
function u914(nodeId) { return f865 + ' ' + nodeId; }
function t915(name) { return y866 + ' ' + name; }
function p916(name) { return c867 + ' ' + name; }
function u917(str) { return str.toLowerCase() == 'true' || str == '1'; }
function j918(e919, s920 = false) { return t925(e919.outputNodeId, e919.outputId, e919.outputOrder, e919.inputNodeId, e919.inputId, e919.list, s920); }
function y921(outputNodeId, outputId, outputOrder, inputNodeId, inputId) { return t915(outputNodeId + ' ' + outputId + ' ' + outputOrder + ' ' + inputNodeId + ' ' + inputId); }
function c922(k243) { return y921(k243.outputNodeId, k243.outputId, k243.outputOrder, k243.inputNodeId, k243.inputId); }
function t923(k243) { return y921(k243.output.node.id, k243.output.id, k243.outputOrder, k243.input.node.id, k243.input.id); }
function p924(k243, s920 = false) { return t925(k243.output.node.id, k243.output.id, k243.outputOrder, k243.input.node.id, k243.input.id, k243.list, s920); }
function t925(outputNodeId, outputId, outputOrder, inputNodeId, inputId, list, s920 = false) { const sp = s920 ? ' ' : '  '; const jsp = s920 ? '' : ' '; const arrow = sp + y929(typeof outputOrder == 'string' ? parseInt(outputOrder) : outputOrder) + f913(typeof list == 'string' ? u917(list) : list) + sp; const join = jsp + '.' + jsp; return outputNodeId + join + outputId + arrow + inputNodeId + join + inputId; }
function x926(pageId) { return p916(pageId); }
function j927(num) { const str = num.toString(); let sup = ''; for (const c of str)
    sup += q928(c); return sup; }
function q928(c) { switch (c) {
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
function y929(num) { const str = num.toString(); let sup = ''; for (const c of str)
    sup += i930(c); return sup; }
function i930(c) { switch (c) {
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
function g931(bool) { return bool ? 'true' : 'false'; }
function isValid(val) { return val != undefined && val != null; }
function isEmpty(array) { return array.length == 0; }
function w932(array, item) { s933(array, array.indexOf(item)); }
function s933(array, index) { if (index > -1 && index < array.length)
    array.splice(index, 1); }
function z934(array) { if (isEmpty(array))
    return null; let last = array.at(-1); array.splice(array.length - 1, 1); return last; }
function t935(array) { return array[array.length - 1]; }
function s936(array, from, to) { const item = array[from]; array.splice(from, 1); array.splice(to, 0, item); }
function x937(array, item) { const index = array.indexOf(item); if (index > -1)
    array.splice(index, 1); }
function a938(k2768, array) { for (const item of array) {
    const index = k2768.indexOf(item);
    if (index > -1)
        k2768.splice(index, 1);
} }
function x939(array, where) { const index = array.findIndex(where); if (index > -1)
    array.splice(index, 1); }
function t940(styleId) { return styleId.split(',')[0] + ','; }
function l941(points) { let b4009 = ''; if (points.length < 2)
    return b4009; b4009 += 'M'; b4009 += ' ' + t869(points[0].x); b4009 += ' ' + t869(points[0].y); for (let i = 1; i < points.length; i++) {
    b4009 += ' L' + ' ' + t869(points[i].x) + ' ' + t869(points[i].y);
} return b4009; }
function point(x, y) { return { x: x, y: y }; }
function v942(v, m) { let r = [0, 0, 0]; for (let i = 0; i < 3; i++)
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
        let c111 = {};
        for (const key in val)
            c111[key] = clone(val[key]);
        return c111;
    }
} throw 'unknown'; }
function e943(array, item, equal = null) { if (equal) {
    if (Array.isArray(item))
        item.forEach(i => e943(array, i, equal));
    else if (!array.find(i => equal(i, item)))
        array.push(item);
}
else {
    if (Array.isArray(item))
        item.forEach(i => e943(array, i));
    else if (!array.includes(item))
        array.push(item);
} }
function b944(array, item, equal) { if (Array.isArray(item))
    item.forEach(i => b944(array, i, equal));
else if (!array.find(equal))
    array.push(item); }
function k945(array, item, except) { if (Array.isArray(item))
    item.forEach(i => k945(array, i, except));
else if (!array.find(except))
    array.push(item); }
function s946(...args) { if (z2516) {
    console.assert(...args);
} }
function u947(...args) { if (z2516)
    console.error(...args); }
function p948(str, trim) { while (str.length >= trim.length && str.substring(0, trim.length) == trim)
    str = str.substring(trim.length); return str; }
function b949(str, trim) { while (str.length >= trim.length && str.substring(str.length - trim.length) == trim)
    str = str.substring(0, str.length - trim.length); return str; }
function b950(e4069) { const fills = []; for (const fill of e4069) {
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
            const c4185 = fill[1];
            const stops = [];
            for (const stop of fill[2]) {
                stops.push({ color: { r: Math.min(Math.max(0, stop[0]), 1), g: Math.min(Math.max(0, stop[1]), 1), b: Math.min(Math.max(0, stop[2]), 1), a: Math.min(Math.max(0, stop[3]), 1) }, position: stop[4] });
            }
            fills.push({ type: fill[0], gradientTransform: c4185, gradientStops: stops, blendMode: fill[3] });
            break;
        }
    }
} return fills; }
function w951(type) { return s1084.includes(type); }
const c1051 = 'LIST#';
const g1052 = 'NLIST#';
const r1053 = 'TLIST#';
const u1054 = 'SLIST#';
const v1055 = 'NULL';
const b1056 = 'VAR';
const z1057 = 'VARGRP';
const b1058 = 'START';
const r1059 = 'REPT';
const j1060 = 'CACHE';
const z1061 = 'FRZ';
const l1062 = 'TIMER';
const u1063 = 'VNAME';
const OBJECT_NAME = 'ONAME';
const e1064 = 'CMB';
const s1065 = 'CDENSE';
const a1066 = 'EXTR';
const c1067 = 'SETP';
const h1068 = 'EXTRP';
const r1069 = 'SUBLST';
const c1070 = 'UNIQ';
const v1071 = 'REVLST';
const h1072 = 'SORT';
const u1073 = 'CLMN';
const q1074 = 'CELL';
const p1075 = 'LIST';
const w1076 = 'COUNT';
const x1077 = 'LCONT';
const c1078 = 'SEL';
const f1079 = 'IF';
const y1080 = 'LSTFLT';
const f1081 = 'DEFINE';
const w1082 = 'ANY#';
const a1083 = [c1051, g1052, r1053, u1054, e1064, a1066, c1067, h1068, r1069, p1075, w1076, x1077, r1059];
const s1084 = [c1051, g1052, r1053, u1054];
const f1085 = [v1055, b1056, z1057, ...a1083, s1065, a1066, c1067, h1068, r1069, c1070, v1071, u1073, h1072, q1074, p1075, c1078, f1079, y1080, b1058, r1059, f1081, j1060, z1061, l1062, u1063, OBJECT_NAME];
const g1086 = 'NUM#';
const o1087 = 'NUM';
const l1088 = 'NSIGN';
const w1089 = 'ABS';
const p1090 = 'ROUND';
const p1091 = 'SMINMAX';
const f1092 = 'MINMAX';
const x1093 = 'LIM';
const f1094 = 'NCURVE';
const k1095 = 'NANISNUM';
const q1096 = 'CONST';
const b1097 = 'DATE';
const h1098 = 'SEQ';
const u1099 = 'RANGE';
const g1100 = 'WAVE';
const h1101 = 'RAND';
const m1102 = 'NOISE';
const p1103 = 'PROB';
const i1104 = 'ACCUM';
const z1105 = 'LERP';
const v1106 = 'SOLVE';
const m1107 = 'NANIM';
const a1108 = 'SMATH';
const f1109 = 'MATH';
const y1110 = 'ADD';
const d1111 = 'SUB';
const x1112 = 'MUL';
const v1113 = 'DIV';
const s1114 = 'MOD';
const d1115 = 'EXP';
const c1116 = 'NBOOL';
const l1117 = 'NOT';
const c1118 = 'AND';
const y1119 = 'OR';
const l1120 = 'XOR';
const m1121 = 'COND';
const q1122 = 'EQ';
const l1123 = 'NE';
const c1124 = 'LT';
const m1125 = 'LE';
const q1126 = 'GT';
const k1127 = 'GE';
const o1128 = 'TRIG';
const f1129 = 'SIN';
const y1130 = 'COS';
const v1131 = 'TAN';
const p1132 = 'ATAN2';
const i1133 = 'CNVANG';
const y1134 = [f1109, a1108, y1110, d1111, x1112, v1113, s1114, d1115];
const r1135 = [c1116, l1117, c1118, y1119, l1120];
const s1136 = [m1121, q1122, l1123, c1124, m1125, q1126, k1127];
const g1137 = [o1128, f1129, y1130, v1131, p1132];
const r1138 = 'TEXT#';
const s1139 = 'TEXT';
const k1140 = 'TLEN';
const u1141 = 'TTRIM';
const o1142 = 'TSUB';
const g1143 = 'TCONT';
const x1144 = 'TCASE';
const l1145 = 'TREPL';
const s1146 = 'TJOIN';
const j1147 = 'TPAD';
const f1148 = 'TCMP';
const b1149 = 'TCHAR';
const h1150 = 'TUNI';
const f1151 = 'INDEX';
const y1152 = 'N2T';
const j1153 = 'C2T';
const i1154 = 'T2N';
const u1155 = 'T2C';
const r1156 = 'TSPLT';
const z3477 = 'TJSON';
const m1158 = 'TCSV';
const w1159 = 'FETCH';
const j1160 = 'TFILE';
const k1161 = [g1086, g1052, o1087, l1088, w1089, p1090, p1091, f1092, x1093, f1094, k1095, q1096, b1097, h1098, u1099, g1100, h1101, m1102, p1103, i1104, z1105, v1106, m1107, y1152, b1149, j1153, ...y1134, ...r1135, ...s1136, ...g1137, i1133];
const x1162 = [r1138, r1053, s1139, k1140, u1141, o1142, g1143, x1144, s1146, j1147, l1145, f1148, h1150, f1151, i1154, u1155, r1156, z3477, m1158, w1159, j1160];
const u1163 = 'COL#';
const g1164 = 'COL';
const d1165 = 'CVAL';
const o1166 = 'CCOR';
const o1167 = 'COLP3';
const w1168 = 'CCNT';
const b1169 = 'BLND';
const k1170 = 'CLERP';
const w1171 = 'CBLND';
const t1172 = [u1163, g1164, o1166, o1167, b1169, k1170, w1171];
const k1173 = 'FILL#';
const o1174 = 'FILL';
const q1175 = [k1173, o1174];
const x1176 = 'STRK#';
const j1177 = 'STRK';
const n1178 = [x1176, j1177];
const q1179 = 'CSTOP#';
const t1180 = 'CSTOP';
const h1181 = [q1179, t1180];
const f1182 = 'GRAD#';
const m1183 = 'GRAD';
const y1184 = [f1182, m1183];
const t1185 = 'RCRN#';
const w1186 = 'RCRN';
const g1187 = [t1185, w1186];
const z1188 = 'DRSH#';
const e1189 = 'DRSH';
const z1190 = [z1188, e1189];
const r1191 = 'INSH#';
const t1192 = 'INSH';
const v1193 = [r1191, t1192];
const i1194 = 'LBLR#';
const z1195 = 'LBLR';
const x1196 = [i1194, z1195];
const t1197 = 'BBLR#';
const a1198 = 'BBLR';
const u1199 = [t1197, a1198];
const x1200 = 'MASK#';
const d1201 = 'MASK';
const m1202 = [x1200, d1201];
const d1203 = 'BLEND#';
const r1204 = 'BLEND';
const l1205 = [d1203, r1204];
const l1206 = [...g1187, ...z1190, ...v1193, ...x1196, ...u1199, ...l1205, ...m1202];
const o1207 = [u1163, k1173, f1182, x1176, z1188, r1191, i1194, t1197, d1203, x1200];
const v1208 = 'CSTL';
const s1209 = 'SHP#';
const w1210 = 'RECT#';
const h1211 = 'RECT';
const n1212 = [w1210, h1211];
const w1213 = 'LINE#';
const c1214 = 'LINE';
const c1215 = [w1213, c1214];
const f1216 = 'ELPS#';
const k1217 = 'ELPS';
const w1218 = [f1216, k1217];
const m1219 = 'TRPZ#';
const g1220 = 'TRPZ';
const h1221 = [m1219, g1220];
const p1222 = 'POLY#';
const s1223 = 'POLY';
const b1224 = [p1222, s1223];
const s1225 = 'STAR#';
const c1226 = 'STAR';
const y1227 = [s1225, c1226];
const b1228 = 'TXTS#';
const o1229 = 'TXTS';
const s1230 = [b1228, o1229];
const e1231 = 'PT#';
const j1232 = 'PT';
const s1233 = [e1231, j1232];
const t1234 = 'PCORN';
const q1235 = 'VPATH#';
const u1236 = 'VPATH';
const b1237 = [q1235, u1236];
const v1238 = 'VPT#';
const m1239 = 'VPT';
const i1240 = [v1238, m1239];
const h1241 = 'VEDGE#';
const l1242 = 'VEDGE';
const g1243 = [h1241, l1242];
const h1244 = 'VREG#';
const s1245 = 'VREG';
const e1246 = [h1244, s1245];
const x1247 = 'VNET#';
const t1248 = 'VNET';
const g1249 = [x1247, t1248];
const t1250 = 'SGRP#';
const n1251 = 'SGRP';
const x1252 = [t1250, n1251];
const n1253 = 'FRM#';
const n1254 = 'FRM';
const p1255 = [n1253, n1254];
const o1256 = 'MOVE';
const u1257 = 'ROT';
const c1258 = 'SCALE';
const y1259 = 'SKEW';
const j1260 = 'CENTR';
const m1261 = 'RSTX';
const n1262 = 'PLACE';
const g1263 = 'APPLY';
const a1264 = 'MESPT';
const s1265 = 'VECLEN';
const x1266 = 'CIRCEN';
const u1267 = 'INTLIN';
const c1268 = 'PTLERP';
const l1269 = 'PONPT';
const h1270 = 'BOOL';
const e1271 = 'BOOL#';
const o1272 = 'BOOLU';
const k1273 = 'BOOLS';
const e1274 = 'BOOLI';
const z1275 = 'BOOLE';
const w1276 = [h1270, e1271, o1272, k1273, e1274, z1275];
const i1277 = 'RENDER';
const k1278 = [s1209, u1054, w1210, w1213, f1216, m1219, p1222, s1225, b1228, e1231, q1235, v1238, h1241, h1244, x1247, t1250, n1253, e1271, z1188, r1191, i1194, t1197, d1203, x1200];
const j1279 = [u1257, c1258, y1259];
const o1280 = [...k1278, ...n1212, ...c1215, ...w1218, ...h1221, ...b1224, ...y1227, ...s1230, ...s1233, t1234, ...b1237, ...i1240, ...g1243, ...e1246, ...g1249, ...x1252, ...p1255, ...w1276, o1256, ...j1279, j1260, m1261, n1262, g1263, a1264, s1265, x1266, u1267, c1268, l1269, i1277];
const e1281 = [c1051, g1052, r1053, u1054, g1086, r1138, u1163, k1173, q1179, f1182, x1176, q1179, f1182, s1209, w1210, w1213, f1216, m1219, p1222, s1225, b1228, e1231, q1235, v1238, h1241, h1244, x1247, t1250, n1253, t1185, z1188, r1191, i1194, t1197, d1203, x1200];
const e1282 = 'GROUP';
const u1283 = 'GPARAM';
const u1284 = [e1282, u1283];
const f1285 = 'CMNT';
const h1286 = 'CMNTARR';
const v1287 = 'PANEL';
const f1288 = 'ACT';
const d1289 = 'BEF';
const b1290 = 'DIS';
const a1291 = 'NOC';
const y1292 = 'PARAM';
const x1293 = 'LOG';
const d1294 = 'GRAPH';
const v1295 = [[d1111, '−'], [y1110, '+'], [s1114, '%'], [v1113, '/'], [x1112, '×'], [d1115, 'e<sup>x']];
const u1296 = [[d1111, '−'], [y1110, '+'], [v1113, '/'], [x1112, '×']];
const e1297 = 0;
const g1298 = 1;
const p1299 = 2;
const u1300 = 3;
const j1301 = [[e1297, 'not'], [g1298, 'xor'], [p1299, 'or'], [u1300, 'and']];
const u1302 = 0;
const h1303 = 1;
const z1304 = 2;
const o1305 = 3;
const y1306 = 4;
const m1307 = 5;
const j1308 = [[u1302, '<'], [h1303, '≤'], [z1304, '≠'], [o1305, '='], [y1306, '≥'], [m1307, '>']];
const o1309 = 0;
const t1310 = 1;
const f1311 = 2;
const j1312 = 3;
const s1313 = 4;
const j1314 = 5;
const e1315 = [[o1309, 'sin'], [t1310, 'cos'], [f1311, 'tan'], [j1312, 'asin'], [s1313, 'acos'], [j1314, 'atan']];
const i1316 = 'EMPTY';
const s1317 = 'CONNECT';
const l1318 = 'CREATE';
const u1319 = 'CREATE_INSERT';
const l1320 = 'DELETE';
const c1321 = 'DISCONNECT';
const p1322 = 'LINK_STYLE';
const z1323 = 'LINK_VARIABLE';
const k1324 = 'LINK_VARIABLE_GROUP';
const g1325 = 'MAKE_ACTIVE';
const f1326 = 'MAKE_PASSIVE';
const q1327 = 'PASTE';
const h1328 = 'RECONNECT';
const i1329 = 'REMOVE';
const e1330 = 'RENAME';
const r1331 = 'REORDER_INPUTS';
const b1332 = 'REORDER_CONNECTIONS';
const v1333 = 'SELECT';
const o1334 = 'SELECT_MOVE';
const f1335 = 'MOVE_NODES';
const j1336 = 'SET_PARAM_VALUE';
const x1337 = 'SET_PARAM_SETTING';
const v1338 = 'SET_NODE_RECT';
const f1339 = 'TOGGLE_DISABLE';
const g1340 = 'TOGGLE_PARAM_HEADER';
const u1341 = 'SET_CURRENT_GRAPH';
const m1342 = 'CREATE_PAGE';
const q1343 = 'DELETE_PAGE';
const k1344 = 'GROUP_NODES';
const v1345 = 'UNGROUP_NODES';
const r1346 = 'HIGHLIGHT_NODES';
const f1347 = 'BNORM';
const n1348 = 'BDARK';
const y1349 = 'BMULT';
const n1350 = 'BPDRK';
const b1351 = 'BBURN';
const t1352 = 'BLITE';
const m1353 = 'BSCRN';
const d1354 = 'BPLGT';
const s1355 = 'BDODG';
const t1356 = 'BOVER';
const v1357 = 'BSOFT';
const x1358 = 'BHARD';
const s1359 = 'BDIFF';
const j1360 = 'BEXCL';
const h1361 = 'BHUE';
const f1362 = 'BSAT';
const a1363 = 'BCOL';
const k1364 = 'BLUM';
const b1365 = [[f1347, 'normal', 'NORMAL'], [n1348, 'darken', 'DARKEN'], [y1349, 'multiply', 'MULTIPLY'], [n1350, 'plus darker', 'LINEAR_BURN'], [b1351, 'color burn', 'COLOR_BURN'], [t1352, 'lighten', 'LIGHTEN'], [m1353, 'screen', 'SCREEN'], [d1354, 'plus lighter', 'LINEAR_DODGE'], [s1355, 'color dodge', 'COLOR_DODGE'], [t1356, 'overlay', 'OVERLAY'], [v1357, 'soft light', 'SOFT_LIGHT'], [x1358, 'hard light', 'HARD_LIGHT'], [s1359, 'difference', 'DIFFERENCE'], [j1360, 'exclusion', 'EXCLUSION'], [h1361, 'hue', 'HUE'], [f1362, 'saturation', 'SATURATION'], [a1363, 'color', 'COLOR'], [k1364, 'luminosity', 'LUMINOSITY']];
const e1366 = [['thin', 100], ['extra light', 200], ['light', 300], ['regular', 400], ['medium', 500], ['semi bold', 600], ['bold', 700], ['extra bold', 800], ['black', 900]];
const o1367 = 0;
const e1368 = 1;
const e1369 = 2;
const v1370 = 2;
const k1371 = 3;
const x1372 = 3;
const f1373 = 4;
const n1374 = 4;
const r1375 = 5;
const p1376 = 6;
const z1377 = 7;
const o1378 = 8;
const o1379 = 9;
const p1380 = 10;
const a1381 = 11;
const c1382 = 12;
const j1383 = 13;
const v1384 = 14;
const c1385 = 15;
const y1386 = 16;
const p1387 = 17;
const s1388 = 18;
const w1389 = 19;
const l1390 = 20;
const n1391 = 21;
const z1392 = 22;
const d1393 = 23;
const w1394 = 24;
const y1395 = 24;
const o1396 = 25;
const l1397 = 26;
const f1398 = 27;
const i1399 = 28;
const r1400 = 28;
const c1401 = 28;
const b1402 = 28;
const j1403 = 28;
const c1404 = 28;
const c1405 = 28;
const e1406 = 28;
const n1407 = 29;
const y1408 = 29;
const l1409 = 29;
const c1410 = 29;
const u1411 = 29;
const h1412 = 29;
const j1413 = 30;
const c1414 = 30;
const j1415 = 30;
const e1416 = 30;
const w1417 = 31;
const f1418 = 31;
const h1419 = 32;
const d1420 = 33;
const o1421 = 34;
const w1422 = 35;
const h1423 = 36;
const t1424 = 37;
const u2769 = '12345679ABCDEFGHJKLMNPQRSTUVWXYZ';
function a839(array, chars = u2769) { let p841 = ''; let len = array.length; let i = 0; while (len > 0) {
    if (len >= 5) {
        const a0 = array[i], a1 = array[i + 1], a2 = array[i + 2], a3 = array[i + 3], a4 = array[i + 4];
        p841 += chars[(a0 & 0xF8) >>> 3];
        p841 += chars[((a0 & 0x07) << 2) | ((a1 & 0xC0) >>> 6)];
        p841 += chars[(a1 & 0x3E) >>> 1];
        p841 += chars[((a1 & 0x01) << 4) | ((a2 & 0xF0) >>> 4)];
        p841 += chars[((a2 & 0x0F) << 1) | ((a3 & 0x80) >>> 7)];
        p841 += chars[(a3 & 0x7C) >>> 2];
        p841 += chars[((a3 & 0x03) << 3) | ((a4 & 0xE0) >>> 5)];
        p841 += chars[(a4 & 0x1F)];
    }
    else if (len == 4) {
        const a0 = array[i], a1 = array[i + 1], a2 = array[i + 2], a3 = array[i + 3];
        p841 += chars[(a0 & 0xF8) >>> 3];
        p841 += chars[((a0 & 0x07) << 2) | ((a1 & 0xC0) >>> 6)];
        p841 += chars[(a1 & 0x3E) >>> 1];
        p841 += chars[((a1 & 0x01) << 4) | ((a2 & 0xF0) >>> 4)];
        p841 += chars[((a2 & 0x0F) << 1) | ((a3 & 0x80) >>> 7)];
        p841 += chars[(a3 & 0x7C) >>> 2];
        p841 += chars[((a3 & 0x03) << 3)];
    }
    else if (len == 3) {
        const a0 = array[i], a1 = array[i + 1], a2 = array[i + 2];
        p841 += chars[(a0 & 0xF8) >>> 3];
        p841 += chars[((a0 & 0x07) << 2) | ((a1 & 0xC0) >>> 6)];
        p841 += chars[(a1 & 0x3E) >>> 1];
        p841 += chars[((a1 & 0x01) << 4) | ((a2 & 0xF0) >>> 4)];
        p841 += chars[((a2 & 0x0F) << 1)];
    }
    else if (len == 2) {
        const a0 = array[i], a1 = array[i + 1];
        p841 += chars[(a0 & 0xF8) >>> 3];
        p841 += chars[((a0 & 0x07) << 2) | ((a1 & 0xC0) >>> 6)];
        p841 += chars[(a1 & 0x3E) >>> 1];
        p841 += chars[((a1 & 0x01) << 4)];
    }
    else if (len == 1) {
        const a0 = array[i];
        p841 += chars[(a0 & 0xF8) >>> 3];
        p841 += chars[((a0 & 0x07) << 2)];
    }
    i += 5;
    len -= 5;
} return p841; }
function x840(p841, chars = u2769) { const array = []; let len = p841.length; let c = 0; while (len > 0) {
    if (len >= 8) {
        const c0 = chars.indexOf(p841[c]), c1 = chars.indexOf(p841[c + 1]), c2 = chars.indexOf(p841[c + 2]), c3 = chars.indexOf(p841[c + 3]), c4 = chars.indexOf(p841[c + 4]), c5 = chars.indexOf(p841[c + 5]), c6 = chars.indexOf(p841[c + 6]), c7 = chars.indexOf(p841[c + 7]);
        array.push((c0 << 3) | ((c1 & 0x1C) >>> 2));
        array.push(((c1 & 0x03) << 6) | (c2 << 1) | ((c3 & 0x10) >>> 4));
        array.push(((c3 & 0x0F) << 4) | ((c4 & 0x1E) >>> 1));
        array.push(((c4 & 0x01) << 7) | (c5 << 2) | ((c6 & 0x18) >>> 3));
        array.push(((c6 & 0x07) << 5) | c7);
    }
    else if (len == 7) {
        const c0 = chars.indexOf(p841[c]), c1 = chars.indexOf(p841[c + 1]), c2 = chars.indexOf(p841[c + 2]), c3 = chars.indexOf(p841[c + 3]), c4 = chars.indexOf(p841[c + 4]), c5 = chars.indexOf(p841[c + 5]), c6 = chars.indexOf(p841[c + 6]);
        array.push((c0 << 3) | ((c1 & 0x1C) >>> 2));
        array.push(((c1 & 0x03) << 6) | (c2 << 1) | ((c3 & 0x10) >>> 4));
        array.push(((c3 & 0x0F) << 4) | ((c4 & 0x1E) >>> 1));
        array.push(((c4 & 0x01) << 7) | (c5 << 2) | ((c6 & 0x18) >>> 3));
    }
    else if (len == 5) {
        const c0 = chars.indexOf(p841[c]), c1 = chars.indexOf(p841[c + 1]), c2 = chars.indexOf(p841[c + 2]), c3 = chars.indexOf(p841[c + 3]), c4 = chars.indexOf(p841[c + 4]);
        array.push((c0 << 3) | ((c1 & 0x1C) >>> 2));
        array.push(((c1 & 0x03) << 6) | (c2 << 1) | ((c3 & 0x10) >>> 4));
        array.push(((c3 & 0x0F) << 4) | ((c4 & 0x1E) >>> 1));
    }
    else if (len == 4) {
        const c0 = chars.indexOf(p841[c]), c1 = chars.indexOf(p841[c + 1]), c2 = chars.indexOf(p841[c + 2]), c3 = chars.indexOf(p841[c + 3]);
        array.push((c0 << 3) | ((c1 & 0x1C) >>> 2));
        array.push(((c1 & 0x03) << 6) | (c2 << 1) | ((c3 & 0x10) >>> 4));
    }
    else if (len == 2) {
        const c0 = chars.indexOf(p841[c]), c1 = chars.indexOf(p841[c + 1]);
        array.push((c0 << 3) | ((c1 & 0x1C) >>> 2));
    }
    c += 8;
    len -= 8;
} return array; }
function b2081(nodeKey, h3981) { const log = r2082(s1532(nodeKey, false)); if (h3981) {
    console.log('%c%s\n%c%s', 'background: #fa24; color: white;', k1049(nodeKey), 'background: #fa44; color: #edc;', log);
}
else {
    console.log('%c%s\n%c%s', 'background: #fdb; color: black;', k1049(nodeKey), 'background: #fed; color: black;', log);
} }
function r2082(json) { let l4010 = json.replace('{\n', '').replace('\n}', '').replace('[\n' + g860, '').replace('\n' + g860 + ']', '').split(g860 + '"params":\n').join('').split('": "').join(': ').split('", "').join(': ').split(g860 + '"').join(g860).split(g860 + g860 + '["').join(g860 + g860).split('",\n').join('\n').split('"\n').join('\n').split('"],\n').join('\n'); if (l4010[l4010.length - 1] == '"')
    l4010 = l4010.substring(0, l4010.length - 1); if (l4010.substring(l4010.length - 2) == '"]')
    l4010 = l4010.substring(0, l4010.length - 2); return l4010; }
function s2083(json) { let l4010 = json.replace('{\n', '').replace('\n}', '').replace('[\n' + g860, '').replace('\n' + g860 + ']', ''); return l4010; }
function e2084(k243, h3981) { const b4188 = j918(k243, true); if (h3981) {
    console.log('%c%s', 'background: #4f44; color: #ded', b4188);
}
else {
    console.log('%c%s', 'background: #cfc; color: black;', b4188);
} }
console.clear();
figma.payments.setPaymentStatusInDevelopment({ type: 'PAID' });
figma.on('documentchange', k1503);
figma.on('selectionchange', q1511);
figma.on('close', c1504);
k1493(true);
figma.clientStorage.getAsync('pro').then(data => { figma.showUI(__html__, { visible: false, themeColors: true, title: 'Generator' + (data === true ? ' Pro' : '') }); });
var f2689 = figma.viewport.zoom;
setInterval(p1508, 100);
const w2770 = 'clock_';
const f2771 = 1000;
var l2772 = false;
function i1505() { (function () {
    return __awaiter(this, void 0, void 0, function* () { let u2773 = yield figma.currentPage.getPluginData(figma.currentUser.id + ',windowWidth'); let k2774 = yield figma.currentPage.getPluginData(figma.currentUser.id + ',windowHeight'); let v2775; let q2776; if (u2773 === NULL) {
        v2775 = 800;
        figma.currentPage.setPluginData(figma.currentUser.id + ',windowWidth', u2773.toString());
    }
    else
        v2775 = parseInt(u2773); if (k2774 === NULL) {
        q2776 = 600;
        figma.currentPage.setPluginData(figma.currentUser.id + ',windowHeight', k2774.toString());
    }
    else
        q2776 = parseInt(k2774); figma.ui.resize(Math.max(0, v2775), Math.max(0, q2776)); figma.ui.show(); const fonts = yield figma.listAvailableFontsAsync(); const eula = (yield figma.clientStorage.getAsync('eula')) === 'true'; const tutorials = (yield figma.clientStorage.getAsync('tutorials')) === 'true'; const isLocked = f1510(); h1512({ cmd: 'uiReturnFigStartGenerator', currentUser: figma.currentUser, viewportRect: figma.viewport.bounds, viewportZoom: figma.viewport.zoom, fonts: fonts, eula: eula, tutorials: tutorials, isLocked: isLocked }); });
})(); }
function b1506() { k1493(); figma.showUI(__html__, { visible: false, themeColors: true }); }
function t1507() { setInterval(n1509, f2771); }
function p1508() { if (figma.viewport.zoom == f2689)
    return; f2689 = figma.viewport.zoom; a2677(); i1526(); m1528(); }
function n1509() { r1533(w2770 + figma.currentUser.sessionId.toString(), Date.now().toString()); }
function f1510() { const clocks = figma.currentPage.getPluginDataKeys().filter(k => k.length > w2770.length && k.substring(0, w2770.length) == w2770 && k.substring(w2770.length) != figma.currentUser.sessionId.toString()).map(k => parseInt(s1532(k))); clocks.sort(); const now = Date.now(); const locked = clocks.length > 0 && now - clocks[clocks.length - 1] < f2771 * 2; return locked; }
function q1511() { a2677(); }
var s2710 = new Array();
var k2712 = new Array();
function d1492(nodeIds) { for (let i = e2746.length - 1; i >= 0; i--)
    if (!e2746[i].removed && nodeIds.includes(e2746[i].getPluginData('nodeId')))
        e2746.splice(i, 1); for (let i = m2754.length - 1; i >= 0; i--)
    if (m2754[i].removed || nodeIds.includes(m2754[i].getPluginData('nodeId')))
        m2754.splice(i, 1); figma.currentPage.findAll(o => nodeIds.includes(o.getPluginData('nodeId'))).forEach(o => { if (!o.removed)
    o.remove(); }); s2710 = s2710.filter(a => !nodeIds.includes(a.nodeId)); }
function k1493(a1494 = false) { for (const v1499 of figma.currentPage.children) {
    if (v1499.removed)
        continue;
    if (v1499.getPluginData('objectId') != '' && v1499.getPluginData('userId') == figma.currentUser.id && (parseInt(v1499.getPluginData('retain')) == 0 || a1494))
        v1499.remove();
} }
function n1495(nodeIds, h1496) { for (let i = s2710.length - 1; i >= 0; i--) {
    const r2711 = s2710[i];
    if (!nodeIds.includes(r2711.nodeId))
        continue;
    for (let j = r2711.objects.length - 1; j >= 0; j--) {
        const v1499 = r2711.objects[j];
        if (v1499.removed || !i1497(v1499, h1496)) {
            if (!v1499.removed)
                v1499.remove();
            x937(r2711.objects, v1499);
            if (e2746.includes(v1499))
                x937(e2746, v1499);
            if (m2754.includes(v1499))
                x937(m2754, v1499);
        }
        if (!v1499.removed) {
            if (parseInt(v1499.getPluginData('retain')) == 2)
                o1518(v1499);
        }
    }
    if (isEmpty(r2711.objects))
        x937(s2710, r2711);
} }
function i1497(v1499, h1496) { if (v1499.type == n1251 || v1499.type == n1254) {
    for (const child of v1499.children) {
        const found = i1497(child, h1496);
        if (found)
            return found;
    }
}
else {
    const found = h1496.find(o => v1499.getPluginData('objectId') == o[e1369] && v1499.getPluginData('userId') == figma.currentUser.id || o[r1375] == 2 && o[r1375] == v1499.getPluginData('retain'));
    if (found)
        return found;
} return null; }
function q1500(nodeIds, f1501) { const paintStyles = figma.getLocalPaintStyles(); paintStyles.filter(s => nodeIds.includes(s.getPluginData('nodeId'))).forEach(s => { const nodeId = s.getPluginData('nodeId'); const existing = u917(s.getPluginData('existing')); if (!existing) {
    s.remove();
}
else if (f1501) {
    x939(k2712, a => a.nodeId == nodeId);
    s.setPluginData('type', NULL);
    s.setPluginData('nodeId', NULL);
    s.setPluginData('existing', NULL);
} }); if (f1501)
    k2712 = k2712.filter(a => !nodeIds.includes(a.nodeId)); }
var d1502 = false;
function k1503(e) { for (const change of e.documentChanges) {
    switch (change.type) {
        case 'STYLE_CREATE':
            if (!change.style)
                break;
            if (!d1502) {
                change.style.setPluginData('type', NULL);
                change.style.setPluginData('nodeId', NULL);
                change.style.setPluginData('existing', NULL);
            }
            break;
        case 'STYLE_PROPERTY_CHANGE': {
            if (!change.style)
                break;
            if (!d1502) {
                const msg = { cmd: 'uiStylePropertyChange', styleId: t940(change.id), properties: change.properties, name: '', paints: [] };
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
                h1512(msg);
            }
            break;
        }
        case 'STYLE_DELETE':
            h1512({ cmd: 'uiStyleDelete', styleId: change.id });
            break;
    }
} d1502 = false; }
function c1504() { k1493(); h1512({ cmd: 'updateMetrics' }); }
figma.ui.onmessage = function (msg) { msg = JSON.parse(msg); if (msg.cmd == 'returnUiGetValueForFigma')
    return; switch (msg.cmd) {
    case 'figStartGenerator':
        i1505();
        break;
    case 'figRestartGenerator':
        b1506();
        break;
    case 'figFinishStart':
        t1507();
        break;
    case 'figDockWindowNormal':
        o2719('normal');
        break;
    case 'figDockWindowMaximize':
        o2719('maximize');
        break;
    case 'figDockWindowTop':
        o2719('top');
        break;
    case 'figDockWindowLeft':
        o2719('left');
        break;
    case 'figDockWindowRight':
        o2719('right');
        break;
    case 'figDockWindowBottom':
        o2719('bottom');
        break;
    case 'figGetMousePosition':
        f1578(msg.clientPosition);
        break;
    case 'figResizeWindow':
        t1581(msg.width, msg.height);
        break;
    case 'figSetWindowRect':
        t1579(msg.x, msg.y, msg.width, msg.height);
        break;
    case 'figNotify':
        o1582(msg);
        break;
    case 'figGetLocalData':
        k1530(msg.key);
        break;
    case 'figSetLocalData':
        p1531(msg.key, msg.value);
        break;
    case 'figClearAllLocalData':
        l4005();
        break;
    case 'figGetPageData':
        s1532(msg.key);
        break;
    case 'figSetPageData':
        r1533(msg.key, msg.value);
        break;
    case 'figSavePages':
        s1538(msg.r4246, msg.pageJson, msg.currentPageId);
        break;
    case 'figLoadNodesAndConns':
        v1535(msg.debugMode);
        break;
    case 'figSaveNodes':
        m1539(msg.nodeIds, msg.nodeJson);
        break;
    case 'figGetAllLocalTemplateNames':
        e2716();
        break;
    case 'figSaveLocalTemplate':
        j1540(msg.c4006, msg.template);
        break;
    case 'figRemoveConnsToNodes':
        e1541(msg.nodeIds);
        break;
    case 'figRemoveSavedNodesAndConns':
        f1542(msg.nodeIds);
        break;
    case 'figRemoveAllSavedNodesAndConns':
        m1543();
        break;
    case 'figLogAllSavedNodesAndConns':
        o1544(msg.h3981);
        break;
    case 'figLogAllSavedNodes':
        p1545(msg.h3981);
        break;
    case 'figLogAllSavedConns':
        w1546(msg.h3981);
        break;
    case 'figLogAllSavedPageKeys':
        p1547(msg.h3981);
        break;
    case 'figLogAllSavedPages':
        q1548(msg.h3981);
        break;
    case 'figLogAllSavedConnKeys':
        d1549(msg.h3981);
        break;
    case 'figLogAllLocalData':
        x1550(msg.h3981);
        break;
    case 'figGetValue':
        y1551(msg.key, msg.spec);
        break;
    case 'figRemoveSavedPage':
        z1553(msg.pageId);
        break;
    case 'figRemoveAllSavedPages':
        v1554();
        break;
    case 'figSaveConnection':
        k1555(msg.key, msg.json);
        break;
    case 'figSaveConnections':
        e1556(msg.keys, msg.json);
        break;
    case 'figUpdateSavedConnections':
        j1557(msg.curKeys, msg.newKeys, msg.json);
        break;
    case 'figDeleteSavedConnection':
        b1558(msg.key);
        break;
    case 'figRemoveAllSavedConnections':
        v1559();
        break;
    case 'figDeleteSavedConnectionsToNode':
        a1560(msg.nodeId);
        break;
    case 'figDeleteSavedConnectionsFromNode':
        w1561(msg.nodeId);
        break;
    case 'figRemovePluginDataFromAllLocalStyles':
        h1562();
        break;
    case 'figGetAllLocalVariables':
        v1586(msg.nodeId, msg.px, msg.py);
        break;
    case 'figLinkNodeToVariable':
        v1588(msg.nodeId, msg.variableId);
        break;
    case 'figUpdateVariable':
        b1589(msg.variableId, msg.value);
        break;
    case 'figGetAllLocalColorStyles':
        u1563(msg.nodeId, msg.px, msg.py);
        break;
    case 'figLinkNodeToExistingColorStyle':
        d1564(msg.nodeId, msg.styleId);
        break;
    case 'figGetObjectSize':
        i1517(msg.object);
        break;
    case 'figGetVariableUpdates':
        t1552(msg.linkedVarIds);
        break;
    case 'figUpdateShowIds':
        l2772 = msg.l2772;
        break;
    case 'figDeleteAllObjects':
        k1493();
        break;
    case 'figUpdateObjectsAndStyles':
        s2725 = 0;
        g2726 = 0;
        msg.objects.forEach(o => o.counted = false);
        t2713(null, msg.objects, msg.m3995, msg.x2029, msg.nodeIds, msg.b2742, msg.k2743, msg.e270);
        z1569(msg);
        break;
    case 'figDeleteObjectsAndStyles':
        d1492(msg.nodeIds);
        q1500(msg.nodeIds, msg.f1501);
        break;
    case 'figDeleteObjectsExcept':
        n1495(msg.nodeIds, msg.ignoreObjects);
        break;
    case 'figTriggerUndo':
        figma.triggerUndo();
        break;
    case 'figCommitUndo':
        figma.commitUndo();
        break;
} h1512({ cmd: 'uiEndFigMessage', msgCmd: msg.cmd }); };
function h1512(msg) { figma.ui.postMessage(JSON.stringify(msg)); }
function a2714(key) {
    return __awaiter(this, void 0, void 0, function* () { return yield figma.clientStorage.getAsync(key); });
}
function k1530(key) { if (key == 'canvasEmpty') {
    h1512({ cmd: 'uiReturnFigGetLocalData', key: key, value: figma.currentPage.children.length == 0 });
}
else if (key == 'debugWarningCrash') {
    figma.clientStorage.getAsync('debugWarning').then(data => { h1512({ cmd: 'uiReturnFigGetLocalData', key: key, value: data }); });
}
else {
    figma.clientStorage.getAsync(key).then(data => { h1512({ cmd: 'uiReturnFigGetLocalData', key: key, value: data }); });
} }
function p1531(key, value, postToUi = true) { figma.clientStorage.setAsync(key, value); if (postToUi) {
    h1512({ cmd: 'uiReturnFigSetLocalData', key: key, value: value });
} }
function l4005() {
    return __awaiter(this, void 0, void 0, function* () { const keys = yield figma.clientStorage.keysAsync(); for (const key of keys)
        figma.clientStorage.deleteAsync(key); });
}
function s1532(key, postToUi = true) { const data = figma.currentPage.getPluginData(key); if (postToUi) {
    h1512({ cmd: 'uiReturnFigGetPageData', key: key, value: data });
} return data; }
function r1533(key, value) { m1534(key); figma.currentPage.setPluginData(key, value); }
function m1534(key) { figma.currentPage.setPluginData(key, ''); }
function v1535(debugMode) { const pageKeys = figma.currentPage.getPluginDataKeys().filter(k => h1045(k)); const nodeKeys = figma.currentPage.getPluginDataKeys().filter(k => j1046(k)); const connKeys = figma.currentPage.getPluginDataKeys().filter(k => u1047(k)); if (!debugMode)
    i1537(nodeKeys, connKeys); const pages = pageKeys.map(k => figma.currentPage.getPluginData(k)); const nodes = nodeKeys.map(k => figma.currentPage.getPluginData(k)); const l2101 = connKeys.map(k => figma.currentPage.getPluginData(k)); const pageOrder = figma.currentPage.getPluginData('pageOrder').split(','); const currentPageId = figma.currentPage.getPluginData('currentPageId'); r1536(nodes); const m3634 = figma.currentPage.getPluginData('showAllColorSpaces'); h1512({ cmd: 'uiReturnFigLoadNodesAndConns', m3634: m3634, pageKeys: pageKeys, pageJson: pages, pageOrder: pageOrder, currentPageId: currentPageId, nodeKeys: nodeKeys, nodeJson: nodes, connKeys: connKeys, connJson: l2101 }); }
function r1536(nodes) { k2712 = []; const paintStyles = figma.getLocalPaintStyles(); for (const h2991 of nodes) {
    const node = JSON.parse(h2991);
    if (node.type == v1208) {
        const style = paintStyles.find(s => { const nodeId = s.getPluginData('nodeId'); return nodeId == node.id; });
        if (style) {
            k2712.push({ nodeId: node.id, existing: u917(node.existing), styles: [style] });
        }
    }
} }
function i1537(nodeKeys, connKeys) { const k2715 = '"loading": "true"'; const not = '{\n'; const set = '{\n' + g860 + k2715 + ',\n'; nodeKeys.forEach(k => figma.currentPage.setPluginData(k, figma.currentPage.getPluginData(k).replace(set, not).replace(not, set))); connKeys.forEach(k => figma.currentPage.setPluginData(k, figma.currentPage.getPluginData(k).replace(set, not).replace(not, set))); }
function s1538(r4246, pageJson, currentPageId) { for (let i = 0; i < r4246.length; i++) {
    r1533(p916(r4246[i]), pageJson[i]);
} r1533('pageOrder', r4246.join(',')); r1533('currentPageId', currentPageId); }
function m1539(nodeIds, nodeJson) { for (let i = 0; i < nodeIds.length; i++) {
    r1533(u914(nodeIds[i]), nodeJson[i]);
} }
function e2716() {
    return __awaiter(this, void 0, void 0, function* () { let keys = yield figma.clientStorage.keysAsync(); keys = keys.filter(k => k.length >= s868.length && k.substring(0, s868.length) == s868); h1512({ cmd: 'uiReturnGetAllLocalTemplateNames', templateNames: keys }); });
}
function j1540(c4006, template) { p1531(s868 + ' ' + c4006, template); }
function e1541(nodeIds) { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => u1047(k)); for (const key of connKeys) {
    const parts = v1050(key).split(' ');
    if (nodeIds.includes(parts[0]) || nodeIds.includes(parts[2]))
        m1534(key);
} }
function f1542(nodeIds) { e1541(nodeIds); const nodeKeys = figma.currentPage.getPluginDataKeys().filter(k => j1046(k) && nodeIds.includes(k1049(k))); nodeKeys.forEach(k => m1534(k)); }
function m1543() { const nodeKeys = figma.currentPage.getPluginDataKeys().filter(k => j1046(k)); const connKeys = figma.currentPage.getPluginDataKeys().filter(k => u1047(k)); for (const key of nodeKeys)
    m1534(key); for (const key of connKeys)
    m1534(key); }
function o1544(h3981) { p1545(h3981); w1546(h3981); }
function p1545(h3981) { figma.currentPage.getPluginDataKeys().filter(k => j1046(k)).forEach(k => b2081(k, h3981)); }
function w1546(h3981) { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => u1047(k)); connKeys.sort((key1, key2) => { const p1 = v1050(key1).split(' '); const p2 = v1050(key2).split(' '); if (p1[2] != p2[2])
    return p1[2] < p2[2] ? -1 : 1; if (p1[3] != p2[3])
    return parseInt(p1[3]) - parseInt(p2[3]); if (p1[2] == p2[0])
    return -1; if (p2[2] == p1[0])
    return 1; return 0; }); connKeys.forEach(k => e2084(JSON.parse(figma.currentPage.getPluginData(k)), h3981)); }
function p1547(h3981) { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => h1045(k)); connKeys.forEach(k => console.log('%c' + k, 'background: #fff; color: ' + (h3981 ? 'black' : 'white'))); const pageOrder = figma.currentPage.getPluginData('pageOrder'); console.log('%c' + pageOrder, 'background: #fff; color: ' + (h3981 ? 'black' : 'white')); }
function q1548(h3981) { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => h1045(k)); connKeys.forEach(k => console.log('%c' + figma.currentPage.getPluginData(k), 'background: #fff; color: ' + (h3981 ? 'black' : 'white'))); const pageOrder = figma.currentPage.getPluginData('pageOrder'); console.log('%c' + pageOrder, 'background: #fff; color: ' + (h3981 ? 'black' : 'white')); }
function d1549(h3981) { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => u1047(k)); connKeys.forEach(k => console.log('%c' + k, 'background: #dff; color: ' + (h3981 ? 'black' : 'white'))); }
function x1550(h3981) { figma.clientStorage.keysAsync().then(keys => keys.forEach(k => figma.clientStorage.getAsync(k).then(val => console.log(k + ': ' + val)))); }
function y1551(key, spec) {
    return __awaiter(this, void 0, void 0, function* () { let result = null; switch (key) {
        case 'getVariableData':
            result = s1587(spec);
            break;
        case 'getPaidStatus':
            result = figma.payments.status.type;
            break;
        case 'figSubscribe': {
            yield figma.payments.initiateCheckoutAsync({ interstitial: 'PAID_FEATURE' });
            result = figma.payments.status.type;
            break;
        }
    } h1512({ cmd: 'returnFigGetValue', value: result }); });
}
function t1552(varIds) { h1512({ cmd: 'uiReturnFigGetVariableUpdates', values: s1587(varIds) }); }
function z1553(pageId) { m1534(x926(pageId)); const pageOrder = s1532('pageOrder').split(','); x939(pageOrder, id => id == pageId); r1533('pageOrder', pageOrder.join(',')); }
function v1554() { const pageKeys = figma.currentPage.getPluginDataKeys().filter(k => h1045(k)); pageKeys.forEach(k => m1534(k)); m1534('pageOrder'); }
function k1555(key, json) { r1533(key, json); }
function e1556(_keys, _json) { const keys = JSON.parse(_keys); const json = JSON.parse(_json); for (let i = 0; i < keys.length; i++)
    r1533(keys[i], json[i]); }
function j1557(_curKeys, _newKeys, _json) { const curKeys = JSON.parse(_curKeys); const newKeys = JSON.parse(_newKeys); const json = JSON.parse(_json); for (let i = 0; i < curKeys.length; i++) {
    m1534(curKeys[i]);
    r1533(newKeys[i], json[i]);
} }
function b1558(key) { m1534(key); }
function v1559() { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => u1047(k)); connKeys.forEach(k => m1534(k)); }
function a1560(nodeId) { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => u1047(k)); for (const key of connKeys) {
    const parts = key.split(' ');
    if (parts[4] == nodeId)
        m1534(key);
} }
function w1561(nodeId) { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => u1047(k)); for (const key of connKeys) {
    const parts = key.split(' ');
    if (parts[1] == nodeId)
        m1534(key);
} }
function h1562() { const y1566 = figma.getLocalPaintStyles(); for (const style of y1566) {
    style.setPluginData('type', '');
    style.setPluginData('nodeId', '');
    style.setPluginData('existing', '');
} }
var l2717 = null;
var c4007 = () => l2717 = null;
var l2718 = 'normal';
function f1578(clientPosition) { h1512({ cmd: 'uiReturnFigGetMousePosition', position: { x: 0, y: 0 }, clientPosition: clientPosition, viewportZoom: figma.viewport.zoom, viewportRect: figma.viewport.bounds }); }
function t1579(x, y, width, height) { return; (function () {
    return __awaiter(this, void 0, void 0, function* () { const rect = { x: Math.round(x), y: Math.round(y), width: Math.floor(Math.max(0, width)), height: Math.floor(Math.max(0, height)) }; figma.ui.reposition(rect.x, rect.y); figma.ui.resize(rect.width, rect.height); figma.clientStorage.setAsync('windowX', rect.x); figma.clientStorage.setAsync('windowY', rect.y); figma.clientStorage.setAsync('windowWidth', rect.width); figma.clientStorage.setAsync('windowHeight', rect.height); h1512({ cmd: 'uiReturnFigSetWindowRect' }); });
})(); }
function k1580(dock, rect, bounds) { switch (dock) {
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
function t1581(width, height) { (function () {
    return __awaiter(this, void 0, void 0, function* () { width = Math.floor(Math.max(0, width)); height = Math.floor(Math.max(0, height)); figma.ui.resize(width, height); figma.currentPage.setPluginData(figma.currentUser.id + ',windowWidth', width.toString()); figma.currentPage.setPluginData(figma.currentUser.id + ',windowHeight', height.toString()); h1512({ cmd: 'uiReturnFigResizeWindow' }); });
})(); }
function o2719(dock) {
    return __awaiter(this, void 0, void 0, function* () { if (dock != 'normal' && l2718 == 'normal') {
        figma.clientStorage.setAsync('normalWindowX', yield figma.clientStorage.getAsync('normalWindowX'));
        figma.clientStorage.setAsync('normalWindowY', yield figma.clientStorage.getAsync('normalWindowY'));
        figma.clientStorage.setAsync('normalWindowWidth', yield figma.clientStorage.getAsync('normalWindowWidth'));
        figma.clientStorage.setAsync('normalWindowHeight', yield figma.clientStorage.getAsync('normalWindowHeight'));
    } l2718 = dock; figma.clientStorage.setAsync('windowDock', dock); t1581(yield figma.clientStorage.getAsync('windowWidth'), yield figma.clientStorage.getAsync('windowHeight')); });
}
function o1582(msg) { i1583(msg.text, msg.prefix, msg.delay, msg.error, msg.x1584, msg.m1585); }
function i1583(text, prefix = 'Generator ', delay = 400, error = false, x1584 = '', m1585 = NULL) { const options = { timeout: delay, error: error, onDequeue: c4007 }; if (x1584 != '') {
    options['button'] = { text: x1584 };
    if (m1585.substring(0, 'removeConnection'.length) == 'removeConnection') {
        options['button']['action'] = () => b1558(m1585.split(',')[1]);
    }
    else {
        switch (m1585) {
            case 'hideClearUndoWarning':
                options['button']['action'] = () => h1512({ cmd: 'uiHideClearUndoWarning' });
                break;
        }
    }
} if (l2717)
    l2717.cancel(); l2717 = figma.notify(prefix + text, options); }
function p2720(key, params = null) {
    return __awaiter(this, void 0, void 0, function* () { return yield r2721(key, params); });
}
function r2721(key, params = null) {
    return __awaiter(this, void 0, void 0, function* () { return new Promise((resolve, reject) => { const timeout = 60000; h1512(Object.assign({ cmd: 'uiGetValueForFigma', key: key }, (params || {}))); const f2722 = setTimeout(() => reject(new Error('Timeout: Result not received by Figma within the specified time')), timeout); function o4008(msg) { msg = JSON.parse(msg); if (msg.cmd === 'returnUiGetValueForFigma') {
        clearTimeout(f2722);
        resolve({ key: msg.key, value: msg.value });
        figma.ui.off('message', o4008);
    } } figma.ui.on('message', o4008); }); });
}
var n2723 = [];
var z2724 = [];
var s2725 = 0;
var g2726 = 0;
function n1513(c111) { return (c111[r1375] === 2 ? '' : e864) + (l2772 ? c111[e1369] : c111[k1371]); }
function u1514(x1498, addObject = null) { if (!q1516(x1498))
    return null; let v1499; switch (x1498[o1367]) {
    case h1211:
        v1499 = e2694(x1498);
        break;
    case c1214:
        v1499 = h2765(x1498);
        break;
    case k1217:
        v1499 = i2761(x1498);
        break;
    case s1223:
        v1499 = m2690(x1498);
        break;
    case c1226:
        v1499 = p2697(x1498);
        break;
    case o1229:
        v1499 = i2700(x1498);
        break;
    case j1232:
        v1499 = b2676(x1498);
        break;
    case u1236:
        v1499 = i2728(x1498);
        break;
    case t1248:
        v1499 = z2729(x1498);
        break;
    case h1270:
        v1499 = p2730(x1498);
        break;
    case n1251:
        v1499 = l2731(x1498);
        break;
    case n1254:
        v1499 = z2732(x1498);
        break;
} if (addObject && v1499 != undefined && v1499 != null && !v1499.removed) {
    v1499.name = n1513(x1498);
    s946(x1498[o1367] == n1251 || !!v1499, 'no Figma object created');
    if (v1499 != undefined && v1499 != null) {
        v1499.setPluginData('retain', x1498[r1375].toString());
        if (x1498[r1375] < 2) {
            v1499.setPluginData('userId', figma.currentUser.id);
            v1499.setPluginData('sessionId', figma.currentUser.sessionId.toString());
            v1499.setPluginData('type', x1498[o1367]);
            v1499.setPluginData('nodeId', x1498[e1368]);
            v1499.setPluginData('objectId', x1498[e1369]);
            v1499.setPluginData('isCenter', g931(x1498[l1390]));
            if (x1498[o1367] == j1232)
                e2746.push(v1499);
            if (x1498[w1389])
                v1529(v1499);
        }
        addObject(v1499);
    }
} if (!x1498.counted) {
    g2726++;
    x1498.counted = true;
} return v1499; }
function x1515(v1499, x1498) { if (!q1516(x1498) || v1499 == undefined || v1499 == null || v1499.removed)
    return; v1499.name = n1513(x1498); v1499.setPluginData('retain', x1498[r1375].toString()); switch (x1498[o1367]) {
    case h1211:
        n2695(v1499, x1498);
        break;
    case c1214:
        s2766(v1499, x1498);
        break;
    case k1217:
        h2762(v1499, x1498);
        break;
    case s1223:
        o2691(v1499, x1498);
        break;
    case c1226:
        b2698(v1499, x1498);
        break;
    case o1229:
        o2701(v1499, x1498);
        break;
    case j1232:
        w2733(v1499, x1498);
        break;
    case u1236:
        i2734(v1499, x1498);
        break;
    case t1248:
        f2735(v1499, x1498);
        break;
    case h1270:
        o2736(v1499, x1498);
        break;
    case n1251:
        z2737(v1499, x1498);
        break;
    case n1254:
        a2738(v1499, x1498);
        break;
} if (v1499 != undefined && v1499 != null && !v1499.removed) {
    v1499.parent.appendChild(v1499);
    if (x1498[w1389])
        v1529(v1499);
} if (!x1498.counted) {
    g2726++;
    x1498.counted = true;
} }
function t2713(q2739, d2740, u2741, x2029 = -1, nodeIds = [], b2742 = false, k2743 = false, e270 = false) {
    return __awaiter(this, void 0, void 0, function* () { let m2744 = NULL; let v2745 = null; let abort = false; const o3615 = []; let z2727 = 0; n2723.push(...nodeIds); if (x2029 > -1)
        s2725 = x2029; for (const x1498 of d2740) {
        z2724.push(x1498);
        if (x1498[e1368] != m2744) {
            m2744 = x1498[e1368];
            v2745 = s2710.find(a => a.nodeId == x1498[e1368]);
            if (!v2745) {
                s2710.push(v2745 = { nodeId: x1498[e1368], objects: [] });
            }
        }
        const addObject = v1499 => { if (q2739 != undefined && q2739 != null && !q2739.removed)
            q2739.appendChild(v1499);
        else
            v2745.objects.push(v1499); };
        let objects = q2739 != undefined && q2739 != null && !q2739.removed ? q2739.children : v2745.objects;
        let v1499 = objects.find(o => o.removed || o.getPluginData('userId') == figma.currentUser.id && o.getPluginData('objectId') == x1498[e1369]);
        if (v1499 != undefined && v1499 != null && v1499.removed) {
            w932(objects, v1499);
            if (e2746.includes(v1499))
                x937(e2746, v1499);
            if (m2754.includes(v1499))
                x937(m2754, v1499);
        }
        if (v1499 == undefined || v1499 == null || v1499.removed) {
            const newObj = u1514(x1498, addObject);
            o3615.push(newObj);
        }
        else if (v1499 != undefined && v1499 != null && !v1499.removed && v1499.getPluginData('type') == x1498[o1367].toString()) {
            x1515(v1499, x1498);
            if (v1499 != undefined && v1499 != null && !v1499.removed)
                o3615.push(v1499);
        }
        else {
            v1499.remove();
            if (e2746.includes(v1499))
                x937(e2746, v1499);
            if (m2754.includes(v1499))
                x937(m2754, v1499);
            u1514(x1498, addObject);
        }
        z2727++;
        if (z2727 >= u2741) {
            const result = yield p2720('returnObjectUpdate', { s2725: s2725, g2726: g2726 });
            abort = result.value;
            z2727 = 0;
            if (abort)
                break;
        }
    } if (q2739 != undefined && q2739 != null && !q2739.removed) {
        for (const v1499 of q2739.children) {
            if (v1499 != undefined && v1499 != null && v1499.removed || !d2740.find(o => o[e1369] == v1499.getPluginData('objectId') && v1499.getPluginData('userId') == figma.currentUser.id))
                v1499.remove();
        }
    } for (const point of e2746) {
        if (point != undefined && point != null && !point.removed && !point.parent.removed)
            point.parent.appendChild(point);
    } if (k2743 && !abort) {
        n1495(n2723, z2724);
        n2723 = [];
        z2724 = [];
        if (e270 && o3615.length > 0) {
            figma.viewport.scrollAndZoomIntoView(o3615);
            const bounds = x1519(o3615);
            figma.viewport.zoom = Math.min(figma.viewport.bounds.width * figma.viewport.zoom / bounds.width - 0.05, figma.viewport.bounds.height * figma.viewport.zoom / bounds.height - 0.05);
        }
    } yield p2720('returnObjectUpdate', { s2725: s2725, g2726: g2726 }); });
}
function q1516(x1498) { switch (x1498[o1367]) {
    case h1211: return r2693(x1498);
    case c1214: return i2747(x1498);
    case k1217: return q2748(x1498);
    case s1223: return l4004(x1498);
    case c1226: return b2696(x1498);
    case o1229: return b2699(x1498);
    case j1232: return n4003(x1498);
    case u1236: return t2749(x1498);
    case t1248: return j2750(x1498);
    case h1270: return q2751(x1498);
    case n1251: return e2752(x1498);
    case n1254: return n2753(x1498);
} }
function i1517(x1498) { (() => __awaiter(this, void 0, void 0, function* () { const v1499 = u1514(x1498); const width = v1499.width; const height = v1499.height; v1499.remove(); h1512({ cmd: 'uiForwardToGenerator', msg: { cmd: 'returnFigGetObjectSize', objectId: x1498[e1369], width: width, height: height } }); }))(); }
function o1518(v1499) { v1499.setPluginData('type', ''); v1499.setPluginData('nodeId', ''); v1499.setPluginData('userId', ''); v1499.setPluginData('sessionId', ''); v1499.setPluginData('objectId', ''); v1499.setPluginData('isCenter', ''); v1499.setPluginData('retain', ''); }
function x1519(objects) { const bounds = { left: 0, top: 0, right: 0, bottom: 0 }; for (const c111 of objects) {
    if (c111.x < bounds.left || bounds.left == bounds.right)
        bounds.left = c111.x;
    if (c111.y < bounds.top || bounds.top == bounds.bottom)
        bounds.top = c111.y;
    if (c111.x + c111.width > bounds.right || bounds.left == bounds.right)
        bounds.right = c111.x + c111.width;
    if (c111.y + c111.height > bounds.bottom || bounds.top == bounds.bottom)
        bounds.bottom = c111.y + c111.height;
} return { x: bounds.left, y: bounds.top, width: bounds.right - bounds.left, height: bounds.bottom - bounds.top }; }
const m2754 = [];
const q2755 = [];
function a1520(f1521, b1522) { const effects = []; for (const effect of f1521) {
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
                if (b1522 && !isNaN(spread))
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
function i2683(v1499, x1498, phantom = true) { h1525(v1499, x1498); y2684(v1499, x1498, phantom); l2685(v1499, x1498); v1499.opacity = x1498[n1391]; v1499.blendMode = x1498[z1392]; const maskType = x1498[d1393]; v1499.isMask = maskType > 0; if (v1499.isMask) {
    switch (maskType) {
        case 1:
            v1499.maskType = 'ALPHA';
            break;
        case 2:
            v1499.maskType = 'VECTOR';
            break;
        case 3:
            v1499.maskType = 'LUMINANCE';
            break;
    }
} if (v1499.isMask && v1499.fills.length == 0 && v1499.strokes.length == 0)
    v1499.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 }, opacity: 1, blendMode: 'NORMAL' }]; }
function l2685(v1499, x1498) { if (!!x1498[p1380] && !isEmpty(x1498[p1380])) {
    v1499.fills = b950(x1498[p1380]);
    if (m2754.includes(v1499))
        x937(m2754, v1499);
}
else
    v1499.fills = []; }
function y2684(v1499, x1498, phantom = true) { if (x1498[a1381] != null && !isEmpty(x1498[a1381])) {
    j1524(v1499, b950(x1498[a1381]), x1498[c1382], x1498[j1383], x1498[v1384], x1498[c1385], x1498[y1386], k2686(x1498[p1387]));
    if (x1498[w1389])
        v1499.setPluginData('dashes', x1498[p1387]);
    if (m2754.includes(v1499))
        x937(m2754, v1499);
    if (x1498[w1389])
        e943(q2755, v1499);
}
else if (isEmpty(x1498[p1380]) && isEmpty(x1498[a1381]) && !x1498[d1393] && phantom) {
    f1527(v1499);
    e943(m2754, v1499);
}
else
    v1499.strokes = []; }
function k2686(t1523) { t1523 = t1523; t1523 = p948(t1523, ','); t1523 = b949(t1523, ','); t1523 = t1523.trim(); return t1523 == '' ? [] : t1523.split(',').map(s => Math.max(0, parseFloat(s))); }
function z2687(t1523) { t1523 = t1523; t1523 = p948(t1523, ','); t1523 = b949(t1523, ','); t1523 = t1523.trim(); return t1523 == '' ? [] : t1523.split(',').map(s => Math.max(0, parseFloat(s) / f2689)); }
function j1524(v1499, fills, weight, align, join, miterLimit, cap, dashes = []) { v1499.strokes = fills; v1499.strokeWeight = Math.max(0, weight); v1499.strokeAlign = align; v1499.strokeJoin = join; const miterAngle = miterLimit / 360 * Tau; const j2756 = 1 / Math.sin(miterAngle / 2); v1499.strokeMiterLimit = Math.min(Math.max(0, j2756), 16); v1499.strokeCap = cap; v1499.dashPattern = dashes; }
function h1525(v1499, x1498) { if (!!x1498[s1388] && !isEmpty(x1498[s1388])) {
    const b1522 = x1498[o1367] == h1211 || x1498[o1367] == k1217 || x1498[o1367] == n1254;
    v1499.effects = a1520(x1498[s1388], b1522);
}
else
    v1499.effects = []; }
function i1526() { for (const c111 of m2754) {
    if (c111.removed)
        x937(m2754, c111);
    else
        f1527(c111);
} }
function f1527(c111) { const back = figma.currentPage.backgrounds.find(b => b.type == 'SOLID'); let phantomColor; if (back) {
    const l = back.color.r * 0.2126 + back.color.g * 0.7152 + back.color.b * 0.0722;
    phantomColor = l > 0.5 ? { r: 0, g: 0, b: 0 } : { r: 1, g: 1, b: 1 };
}
else
    phantomColor = { r: 1, g: 0, b: 1 }; j1524(c111, [{ type: 'SOLID', color: phantomColor, opacity: 0.5 }], 1 / f2689, 'CENTER', 'MITER', 1, 'NONE', [1 / f2689, 2 / f2689]); }
function m1528() { for (const v1499 of q2755) {
    if (v1499.removed)
        x937(q2755, v1499);
    else
        v1529(v1499);
} }
function v1529(v1499) { v1499.strokeWeight = Math.max(0, 1 / f2689); if (u917(v1499.getPluginData('isCenter'))) {
    const path = v1499.vectorPaths[0];
    const parts = path.data.split(' ');
    let t = { x: parseFloat(parts[1]), y: parseFloat(parts[2]) };
    let c = { x: parseFloat(parts[4]), y: parseFloat(parts[5]) };
    let r = { x: parseFloat(parts[7]), y: parseFloat(parts[8]) };
    const a = 2;
    const b = 0.05;
    const f = 1 - Math.pow(1 - Math.min(f2689, 1), a) / Math.pow(a, b);
    t = y889(c, r891(z876(u894(t, c)), 10 / f));
    r = y889(c, r891(z876(u894(r, c)), 10 / f));
    parts[1] = t.x;
    parts[2] = t.y;
    parts[4] = c.x;
    parts[5] = c.y;
    parts[7] = r.x;
    parts[8] = r.y;
    const b2757 = { windingRule: path.windingRule, data: parts.join(' ') };
    v1499.vectorPaths = [b2757];
} const dashes = v1499.getPluginData('dashes'); if (dashes != '')
    v1499.dashPattern = z2687(dashes); }
function u1563(nodeId, px, py) { const _styles = figma.getLocalPaintStyles(); const styles = new Array(); for (const j168 of _styles) {
    const _nodeId = j168.getPluginData('nodeId');
    const _existing = j168.getPluginData('existing');
    const existing = !!_existing;
    const style = { id: j168.id, nodeId: _nodeId, name: j168.name, existing: existing, paints: new Array() };
    let onlyPaint = true;
    for (const p2759 of j168.paints) {
        if (p2759.type == 'SOLID') {
            style.paints.push([p2759.color.r, p2759.color.g, p2759.color.b, p2759.opacity]);
        }
        else {
            onlyPaint = false;
            break;
        }
    }
    if (onlyPaint)
        styles.push(style);
} h1512({ cmd: 'uiReturnFigGetAllLocalColorStyles', nodeId: nodeId, px: px, py: py, styles: JSON.stringify(styles) }); }
function d1564(nodeId, styleId) { const y1566 = figma.getLocalPaintStyles(); if (styleId != NULL)
    q1565(y1566, nodeId, styleId);
else
    p1567(y1566, nodeId); }
function q1565(y1566, nodeId, styleId, clearExisting = true) { const p2758 = k2712.find(a => a.nodeId == nodeId); if (p2758 && clearExisting)
    p1567(y1566, nodeId); const h1571 = y1566.find(s => s.id == styleId); s946(!!h1571, 'figStyle should be found here'); h1571.setPluginData('type', v1208); h1571.setPluginData('nodeId', nodeId); h1571.setPluginData('existing', g931(true)); k2712.push({ nodeId: nodeId, existing: true, styles: [h1571] }); return h1571; }
function p1567(y1566, nodeId) { const h1571 = y1566.find(s => s.getPluginData('nodeId') == nodeId); s946(!!h1571, 'figStyle should be found here'); if (h1571) {
    h1571.setPluginData('type', NULL);
    h1571.setPluginData('nodeId', NULL);
    h1571.setPluginData('existing', NULL);
    x939(k2712, a => a.nodeId == nodeId);
} return h1571; }
function b1568(styles, q1572) { const h1571 = figma.createPaintStyle(); h1571.setPluginData('type', q1572[o1367]); h1571.setPluginData('nodeId', q1572[e1368]); h1571.name = q1572[x1372]; setStylePaints(h1571, q1572); styles.push(h1571); h1512({ cmd: 'uiSetStyleId', nodeId: q1572[e1368], styleId: h1571.id }); return h1571; }
function z1569(msg) { let m2744 = NULL; let p2758; for (const q1572 of msg.styles) {
    if (q1572[e1368] != m2744) {
        m2744 = q1572[e1368];
        p2758 = k2712.find(a => a.nodeId == q1572[e1368]);
        if (!p2758) {
            p2758 = { nodeId: q1572[e1368], styles: [] };
            k2712.push(p2758);
        }
    }
    else
        p2758 = null;
    const h1571 = p2758.styles[0];
    const y1566 = figma.getLocalPaintStyles();
    const localStyle = y1566.find(s => s.getPluginData('nodeId') == q1572[e1368]);
    if (isValid(h1571) && !isValid(localStyle)) {
        w932(p2758.styles, h1571);
    }
    const existing = isValid(h1571) && isValid(localStyle) && h1571.getPluginData('existing');
    if (!isValid(h1571) || !isValid(localStyle)) {
        if (!existing) {
            d1502 = true;
            d1564(q1572[e1368], q1572[v1370]);
        }
    }
    else if (isValid(h1571) && h1571.getPluginData('type') == q1572[o1367]) {
        d1502 = true;
        f1570(localStyle, q1572);
    }
} }
function f1570(h1571, q1572) { setStylePaints(h1571, q1572); h1571.name = q1572[x1372]; }
function getStylePaints(stylePaints) { const paints = new Array(); for (const p2759 of stylePaints) {
    const fill = p2759[1].split(' ');
    switch (p2759[0]) {
        case 'SOLID':
            paints.push({ type: 'SOLID', color: { r: Math.min(Math.max(0, parseFloat(fill[0]) / 0xff), 1), g: Math.min(Math.max(0, parseFloat(fill[1]) / 0xff), 1), b: Math.min(Math.max(0, parseFloat(fill[2]) / 0xff), 1) }, opacity: Math.min(Math.max(0, parseFloat(fill[3]) / 100), 1) });
            break;
    }
} return paints; }
function setStylePaints(h1571, q1572) { if (!isEmpty(q1572[n1374]))
    h1571.paints = getStylePaints(q1572[n1374]);
else
    h1571.paints = []; }
function v1586(nodeId, px, py) { const b2760 = figma.variables.getLocalVariables(); const variables = new Array(); for (const _var of b2760) {
    const variable = { id: _var.id, resolvedType: _var.resolvedType, name: _var.name, collectionName: figma.variables.getVariableCollectionById(_var.variableCollectionId).name };
    variables.push(variable);
} h1512({ cmd: 'uiReturnFigGetAllLocalVariables', nodeId: nodeId, px: px, py: py, variables: JSON.stringify(variables), nCollections: figma.variables.getLocalVariableCollections().length }); }
function s1587(varIds) { const b2760 = figma.variables.getLocalVariables(); const variables = varIds.map(id => b2760.find(v => v.id == id)); let values = []; for (let i = 0; i < varIds.length; i++) {
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
function v1588(nodeId, varId) { const b2760 = figma.variables.getLocalVariables(); q1590(b2760, nodeId, varId); }
function b1589(varId, value) { const b2760 = figma.variables.getLocalVariables(); const variable = b2760.find(v => v.id == varId); if (!variable)
    return; const collection = figma.variables.getVariableCollectionById(variable.variableCollectionId); if (variable.resolvedType == 'BOOLEAN')
    value = value != 0; if (value !== null)
    variable.setValueForMode(collection.modes[0].modeId, value); }
function q1590(b2760, nodeId, varId) { const variable = b2760.find(v => v.id == varId); const values = []; if (variable) {
    const collection = figma.variables.getVariableCollectionById(variable.variableCollectionId);
    for (const mode of collection.modes)
        values.push(variable.valuesByMode[mode.modeId]);
} h1512({ cmd: 'uiReturnFigLinkNodeToVariable', nodeId: nodeId, variableId: variable ? variable.id : NULL, variableName: variable ? variable.name : '', resolvedType: variable ? variable.resolvedType : NULL, values: values }); return variable; }
function c1573(tl, tr, bl) { let vr = point(tr.x - tl.x, tr.y - tl.y); let vb = point(bl.x - tl.x, bl.y - tl.y); let sx = vr.x; let sy = vb.y; let kx = -vr.y; let ky = -vb.x; let dx = -tl.x; let dy = -tl.y; const _sx = kx / nozero(sx); const _sy = ky / nozero(sy); let c4185 = f879([[1, _sy, 0], [_sx, 1, 0], [0, 0, 1]], f883(dx, dy)); c4185 = m881(c4185); const a = angle(vr); if (a > Tau / 4 && a < Tau * 3 / 4)
    c4185 = f879(c4185, f883(0, 0, 1, 1, Tau / 2)); if (determinant(c4185) < 0)
    c4185 = f879(c4185, f883(0, 0, -1, 1, 0)); return c4185; }
function o1574(v1499, tl, tr, bl) { const c4185 = c1573(tl, tr, bl); v1499.relativeTransform = [c4185[0], c4185[1]]; }
function v1575(v1499, x1498, setSize = true, noHeight = 0.01) { if (!x1498[p1376] || !x1498[z1377] || !x1498[o1378])
    return; const xp0 = x1498[p1376]; const xp1 = x1498[z1377]; const xp2 = x1498[o1378]; o1574(v1499, xp0, xp1, xp2); if (setSize) {
    const q884 = distance(xp0, xp1);
    const z885 = distance(xp0, xp2);
    const height = x1498[o1367] == o1229 ? x1498[u1411] : x1498[f1398];
    if (!v1499.removed) {
        v1499.resizeWithoutConstraints(Math.max(0.01, q884), height ? Math.max(0.01, z885) : noHeight);
    }
} }
function z1576(d2681, o2682) { if (d2681.removed)
    return; d2681.resizeWithoutConstraints(0.01, 0.01); d2681.setPluginData('actualX', o2682[w1394].toString()); d2681.setPluginData('actualY', o2682[o1396].toString()); d2681.x = o2682[w1394]; d2681.y = o2682[o1396]; d2681.rotation = o2682[l1390] ? 45 : 0; }
function o1577(d2681) { if (!d2681.removed)
    d2681.resizeWithoutConstraints(0.01, 0.01); }
function q2751(genBool) { return genBool.children.length > 0; }
function p2730(genBool) { let objects = []; for (const c111 of genBool.children)
    u1514(c111, o => objects = [...objects, o]); let figBool = null; if (!isEmpty(objects)) {
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
    v1575(figBool, genBool);
    if (!q2751(genBool))
        return figBool;
} return figBool; }
function o2736(figBool, genBool, isValid = false) { if (!isValid && !q2751(genBool)) {
    figBool.remove();
    return;
} v1575(figBool, genBool); t2713(figBool, genBool.children, genBool.children.length); }
function q2748(genEllipse) { return genEllipse[w1394] != null && !isNaN(genEllipse[w1394]) && genEllipse[o1396] != null && !isNaN(genEllipse[o1396]) && genEllipse[l1397] != null && !isNaN(genEllipse[l1397]) && genEllipse[f1398] != null && !isNaN(genEllipse[f1398]) && genEllipse[r1400] != null && !isNaN(genEllipse[r1400]) && genEllipse[n1407] != null && !isNaN(genEllipse[n1407]) && genEllipse[j1413] != null && !isNaN(genEllipse[j1413]) && genEllipse[w1417] != null && !isNaN(genEllipse[w1417]); }
function i2761(genEllipse) { if (!q2748(genEllipse))
    return null; const figEllipse = figma.createEllipse(); h2762(figEllipse, genEllipse, true); return figEllipse; }
function h2762(figEllipse, genEllipse, isValid = false) { if (!isValid && !q2748(genEllipse))
    return; y2763(figEllipse, genEllipse); if (e2746.includes(figEllipse))
    y2678(figEllipse);
else
    i2683(figEllipse, genEllipse); }
function y2763(figEllipse, genEllipse) { figEllipse.cornerRadius = genEllipse[r1400]; figEllipse.arcData = { startingAngle: genEllipse[n1407] / 360 * (Math.PI * 2), endingAngle: genEllipse[j1413] / 360 * (Math.PI * 2), innerRadius: Math.min(Math.max(0, genEllipse[w1417] / 100), 1) }; v1575(figEllipse, genEllipse); }
function n2753(genFrame) { return genFrame[w1394] != null && !isNaN(genFrame[w1394]) && genFrame[o1396] != null && !isNaN(genFrame[o1396]) && genFrame[l1397] != null && !isNaN(genFrame[l1397]) && genFrame[f1398] != null && !isNaN(genFrame[f1398]) && genFrame[e1406] != null && !isNaN(genFrame[e1406]); }
function z2732(genFrame) { if (!n2753(genFrame))
    return null; const figFrame = figma.createFrame(); if (figFrame) {
    i2764(figFrame, genFrame);
    let objects = [];
    for (const c111 of genFrame[h1412])
        u1514(c111, o => objects = [...objects, o]);
    for (const c111 of objects)
        figFrame.appendChild(c111);
} return figFrame; }
function a2738(figFrame, genFrame) { i2764(figFrame, genFrame); t2713(figFrame, genFrame[h1412], genFrame[h1412].length); }
function i2764(figFrame, genFrame) { figFrame.cornerRadius = genFrame[e1406]; v1575(figFrame, genFrame); i2683(figFrame, genFrame, genFrame[h1412].length == 0); }
function e2752(genGroup) { return true; }
function l2731(genGroup) { let objects = []; for (const c111 of genGroup[y1395])
    u1514(c111, o => objects = [...objects, o]); const figGroup = !isEmpty(objects) ? figma.group(objects, figma.currentPage) : null; if (figGroup)
    z2737(figGroup, genGroup); return figGroup; }
function z2737(figGroup, genGroup) { if (genGroup[y1395].length == 0) {
    figGroup.remove();
    return;
} t2713(figGroup, genGroup[y1395], genGroup[y1395].length); h1525(figGroup, genGroup); }
function i2747(genLine) { return genLine[w1394] != null && !isNaN(genLine[w1394]) && genLine[o1396] != null && !isNaN(genLine[o1396]) && genLine[l1397] != null && !isNaN(genLine[l1397]); }
function h2765(genLine) { if (!i2747(genLine))
    return null; const figLine = figma.createLine(); s2766(figLine, genLine, true); return figLine; }
function s2766(figLine, genLine, isValid = false) { if (!isValid && !i2747(genLine))
    return; v1575(figLine, genLine, true, 0); i2683(figLine, genLine); }
var e2746 = [];
function n4003(o2682) { return o2682[w1394] != null && !isNaN(o2682[w1394]) && o2682[o1396] != null && !isNaN(o2682[o1396]); }
function b2676(o2682) { const d2681 = o2682[l1390] ? figma.createRectangle() : figma.createEllipse(); if (!n4003(o2682))
    return d2681; if (e2746.includes(d2681))
    u2680(d2681, o2682);
else
    w2733(d2681, o2682); return d2681; }
function w2733(d2681, o2682) { z1576(d2681, o2682); r2679(d2681); }
function a2677() { h1512({ cmd: 'uiUpdateZoom', zoom: figma.viewport.zoom }); for (const point of e2746)
    y2678(point); }
function y2678(d2681) { o1577(d2681); r2679(d2681); }
function u2680(d2681, o2682) { z1576(d2681, o2682); r2679(d2681); }
function r2679(d2681) { if (d2681.removed)
    return; const q3714 = u917(d2681.getPluginData('isCenter')); const i2688 = figma.currentPage.selection.includes(d2681); const color = q3714 ? [0xf2, 0x48, 0x22] : i2688 ? [12, 140, 233] : [255, 255, 255]; const border = q3714 ? [255, 255, 255] : i2688 ? [255, 255, 255] : [12, 140, 233]; d2681.fills = b950([['SOLID', color[0], color[1], color[2], 100]]); const effects = []; effects.push(...a1520([['DROP_SHADOW', border[0] / 255, border[1] / 255, border[2] / 255, 1, 0, 0, 0, (q3714 ? 3 : i2688 ? 5 : 3.6) / f2689, 'NORMAL', true, true]], true)); effects.push(...a1520([['DROP_SHADOW', color[0] / 255, color[1] / 255, color[2] / 255, 1, 0, 0, 0, (i2688 ? 4 : 2.4) / f2689, 'NORMAL', true, true]], true)); d2681.effects = effects; }
function l4004(genPoly) { return genPoly[w1394] != null && !isNaN(genPoly[w1394]) && genPoly[o1396] != null && !isNaN(genPoly[o1396]) && genPoly[l1397] != null && !isNaN(genPoly[l1397]) && genPoly[f1398] != null && !isNaN(genPoly[f1398]) && genPoly[j1403] != null && !isNaN(genPoly[j1403]) && genPoly[l1409] != null && !isNaN(genPoly[l1409]); }
function m2690(genPoly) { if (!l4004(genPoly))
    return null; const figPoly = figma.createPolygon(); o2691(figPoly, genPoly, true); return figPoly; }
function o2691(figPoly, genPoly, isValid = false) { if (!isValid && !l4004(genPoly))
    return; figPoly.cornerRadius = genPoly[j1403]; figPoly.pointCount = Math.max(3, genPoly[l1409]); v1575(figPoly, genPoly); i2683(figPoly, genPoly); }
function r2693(c2692) { return c2692[w1394] != null && !isNaN(c2692[w1394]) && c2692[o1396] != null && !isNaN(c2692[o1396]) && c2692[l1397] != null && !isNaN(c2692[l1397]) && c2692[f1398] != null && !isNaN(c2692[f1398]) && c2692[i1399] != null && !isNaN(c2692[i1399]); }
function e2694(c2692) { if (!r2693(c2692))
    return null; const figRect = figma.createRectangle(); n2695(figRect, c2692, true); return figRect; }
function n2695(figRect, c2692, isValid = false) { if (!isValid && !r2693(c2692))
    return; const found = c2692[s1388].findIndex(e => e[0] == 'ROUND_CORNERS'); if (found > -1) {
    const corners = c2692[s1388][found];
    figRect.topLeftRadius = corners[1];
    figRect.topRightRadius = corners[2];
    figRect.bottomLeftRadius = corners[3];
    figRect.bottomRightRadius = corners[4];
}
else
    figRect.cornerRadius = c2692[i1399]; v1575(figRect, c2692); i2683(figRect, c2692); }
function b2696(h2706) { return h2706[w1394] != null && !isNaN(h2706[w1394]) && h2706[o1396] != null && !isNaN(h2706[o1396]) && h2706[l1397] != null && !isNaN(h2706[l1397]) && h2706[f1398] != null && !isNaN(h2706[f1398]) && h2706[c1404] != null && !isNaN(h2706[c1404]) && h2706[c1410] != null && !isNaN(h2706[c1410]) && h2706[j1415] != null && !isNaN(h2706[j1415]); }
function p2697(h2706) { if (!b2696(h2706))
    return null; const q2707 = figma.createStar(); b2698(q2707, h2706, true); return q2707; }
function b2698(q2707, h2706, isValid = false) { if (!isValid && !b2696(h2706))
    return; q2707.cornerRadius = h2706[c1404]; q2707.pointCount = h2706[c1410]; q2707.innerRadius = Math.min(Math.max(0, h2706[j1415] / 100), 1); v1575(q2707, h2706); i2683(q2707, h2706); }
const p4247 = [];
function b2699(o2703) { return o2703[e1416] != null && o2703[w1394] != null && !isNaN(o2703[w1394]) && o2703[o1396] != null && !isNaN(o2703[o1396]) && o2703[l1397] != null && !isNaN(o2703[l1397]) && o2703[f1398] != null && !isNaN(o2703[f1398]) && o2703[f1418] != null && o2703[f1418] != NULL && o2703[h1419] != null && !isNaN(o2703[h1419]); }
function i2700(o2703) { if (!b2699(o2703))
    return null; const n2767 = figma.createText(); o2701(n2767, o2703, true); return n2767; }
function o2701(n2767, o2703, isValid = false) { if (!isValid && !b2699(o2703))
    return null; const fontName = { family: o2703[f1418], style: o2703[d1420] }; try {
    if (!p4247.includes(fontName)) {
        figma.loadFontAsync(fontName).then(() => { p4247.push(fontName); o2702(n2767, o2703, fontName); });
    }
    else {
        o2702(n2767, o2703, fontName);
    }
}
catch (e) {
    u947(e);
} }
function o2702(n2767, o2703, fontName) { n2767.fontName = fontName; n2767.fontSize = Math.max(1, o2703[h1419]); n2767.characters = o2703[e1416]; n2767.lineHeight = { unit: 'PERCENT', value: o2703[h1423] }; n2767.letterSpacing = { unit: 'PERCENT', value: o2703[t1424] }; if (o2703[o1421] == 0)
    n2767.textAlignHorizontal = 'LEFT';
else if (o2703[o1421] == 1)
    n2767.textAlignHorizontal = 'CENTER';
else if (o2703[o1421] == 2)
    n2767.textAlignHorizontal = 'RIGHT';
else if (o2703[o1421] == 3)
    n2767.textAlignHorizontal = 'JUSTIFIED'; if (o2703[w1422] == 0)
    n2767.textAlignVertical = 'TOP';
else if (o2703[w1422] == 1)
    n2767.textAlignVertical = 'CENTER';
else if (o2703[w1422] == 2)
    n2767.textAlignVertical = 'BOTTOM'; v1575(n2767, o2703); i2683(n2767, o2703); if (o2703[c1405] == 0 && o2703[u1411] == 0)
    n2767.textAutoResize = 'WIDTH_AND_HEIGHT';
else if (o2703[c1405] == 0)
    n2767.textAutoResize = 'HEIGHT';
else
    n2767.textAutoResize = 'NONE'; }
function j2750(y2708) { return true; }
function z2729(y2708) { if (!j2750(y2708))
    return null; const y2709 = figma.createVector(); f2735(y2709, y2708, true); return y2709; }
function f2735(y2709, y2708, isValid = false) { if (!isValid && !j2750(y2708))
    return; y2709.vectorNetwork = y2708[c1401]; v1575(y2709, y2708, false); i2683(y2709, y2708); }
function t2749(h2704) { return h2704[y1408] != null && !isNaN(h2704[y1408]) && h2704[c1414] != null && !isNaN(h2704[c1414]); }
function i2728(h2704) { const h2705 = figma.createVector(); i2734(h2705, h2704, true); return h2705; }
function i2734(h2705, h2704, isValid = false) { if (!isValid && !t2749(h2704))
    return; h2705.vectorPaths = [{ windingRule: h2704[y1408] == 1 ? 'NONZERO' : 'EVENODD', data: h2704[b1402] }]; h2705.cornerRadius = h2704[c1414]; v1575(h2705, h2704, false); i2683(h2705, h2704); }
