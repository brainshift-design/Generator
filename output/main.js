var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function m1051(key, tag) { return key.substring(0, tag.length + 1) == tag + ' '; }
function w1052(key, tag) { return key.substring(tag.length + 1); }
function j1053(key) { return m1051(key, w875); }
function i1054(key) { return m1051(key, h873); }
function l1055(key) { return m1051(key, d874); }
function b1056(key) { return w1052(key, w875); }
function d1057(key) { return w1052(key, h873); }
function y1058(key) { return w1052(key, d874); }
const generatorVersion = 370;
const l867 = 2147483647;
const NULL = '';
const w868 = '  ';
const v869 = '    ';
const l870 = '\n';
const p871 = '◦ G •';
const m872 = p871 + ' ';
const h873 = 'G_NODE';
const d874 = 'G_CONN';
const w875 = 'G_PAGE';
const m876 = 'G_TEMP';
const minWindowWidth = 602;
const minWindowHeight = 39;
const identity = Object.freeze([[1, 0, 0], [0, 1, 0], [0, 0, 1]]);
const Epsilon = 0.0000001;
const Tau = Math.PI * 2;
var c2539 = false;
function p877(x, eps = 0.000000001) { return Math.abs(x) < eps ? 0 : x; }
function nozero(x, eps = 0.000000001) { return x != 0 ? x : (x < 0 ? -eps : eps); }
function y878(v, eps = 0.000000001) { return point(nozero(v.x, eps), nozero(v.y, eps)); }
function equal(a, b, eps = 0.000000001) { return Math.abs(b - a) < eps; }
function sqr(x) { return x * x; }
;
function cube(x) { return x * x * x; }
;
function n879(f) { return Math.floor(f) | 0; }
function k880(x) { x = n879(x); x--; x |= x >> 1; x |= x >> 2; x |= x >> 4; x |= x >> 8; x |= x >> 16; x |= x >> 32; return ++x; }
function gcd(a, b) { let temp; while (1) {
    temp = a % b;
    if (temp == 0)
        return b;
    a = b;
    b = temp;
} }
function distv(p1, p2) { const dx = p2.x - p1.x; const dy = p2.y - p1.y; return Math.sqrt(dx * dx + dy * dy); }
function j881(v) { let angle = Math.atan2(v.y, v.x); if (angle < 0)
    angle += Tau; return angle; }
function anglev2(v1, v2) { return anglev2_(v1.x, v1.y, v2.x, v2.y); }
function anglev2_(x1, y1, x2, y2) { const dx = x2 - x1; const dy = y2 - y1; let angle = Math.atan2(dy, dx); if (angle < 0)
    angle += Tau; return angle; }
function t883(v) { return Math.sqrt(v.x * v.x + v.y * v.y); }
function lengthv_(x, y) { return Math.sqrt(x * x + y * y); }
function f884(v) { return point(v.x == 0 ? 0 : v.x / t883(v), v.y == 0 ? 0 : v.y / t883(v)); }
function dotv(v1, v2) { return v1.x * v2.x + v1.y * v2.y; }
function q885(a1, a2) { let diff = a2 - a1; while (diff <= -Tau / 2)
    diff += Tau; while (diff > Tau / 2)
    diff -= Tau; return diff; }
function x886(v, m) { let v3 = [v.x, v.y, 1]; let r = w950(v3, m); return point(r[0], r[1]); }
function u887(...mm) { g954(mm.length > 0, 'mulm3m3() must take at least one argument'); let result = clone(mm[0]); for (let a = 1; a < mm.length; a++) {
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
function v888(m, s) { for (let i = 0; i < 3; i++)
    for (let j = 0; j < 3; j++)
        m[i][j] /= s; return m; }
function adjugate(m) { return cofactor(transpose(m)); }
function transpose(m) { return [[m[0][0], m[1][0], m[2][0]], [m[0][1], m[1][1], m[2][1]], [m[0][2], m[1][2], m[2][2]]]; }
function cofactor(m) { return [[m[1][1] * m[2][2] - m[2][1] * m[1][2], -(m[1][0] * m[2][2] - m[2][0] * m[1][2]), m[1][0] * m[2][1] - m[2][0] * m[1][1]], [-(m[0][1] * m[2][2] - m[2][1] * m[0][2]), m[0][0] * m[2][2] - m[2][0] * m[0][2], -(m[0][0] * m[2][1] - m[2][0] * m[0][1])], [m[0][1] * m[1][2] - m[1][1] * m[0][2], -(m[0][0] * m[1][2] - m[1][0] * m[0][2]), m[0][0] * m[1][1] - m[1][0] * m[0][1]]]; }
function determinant(m) { return m[0][0] * (m[1][1] * m[2][2] - m[1][2] * m[2][1]) - m[0][1] * (m[1][0] * m[2][2] - m[2][0] * m[1][2]) + m[0][2] * (m[1][0] * m[2][1] - m[2][0] * m[1][1]); }
function z889(m) { return v888(adjugate(m), determinant(m)); }
function q890(angle) { const cosA = p877(Math.cos(angle)); const sinA = p877(Math.sin(angle)); return [[cosA, sinA, 0], [-sinA, cosA, 0], [0, 0, 1]]; }
function i891(x = 0, y = 0, o892 = 1, g893 = 1, angle = 0, w894 = 0, p895 = 0) { const cosA = Math.cos(angle); const sinA = Math.sin(angle); return [[o892 * cosA - p895 * sinA, -w894 * cosA + g893 * sinA, x], [p895 * cosA + o892 * sinA, g893 * cosA + w894 * sinA, y], [0, 0, 1]]; }
function m896(v1, v2) { return v1.x * v2.y - v1.y * v2.x; }
function c897(v1, v2) { return point(v1.x + v2.x, v1.y + v2.y); }
function sqrv(v) { return g898(v, v); }
function g898(v1, v2) { return point(v1.x * v2.x, v1.y * v2.y); }
function o899(v, s) { return point(v.x * s, v.y * s); }
function w900(v1, v2) { return point(v1.x / v2.x, v1.y / v2.y); }
function l901(v, s) { return point(v.x / s, v.y / s); }
function e902(v1, v2) { return point(v1.x - v2.x, v1.y - v2.y); }
function i903(str) { return decodeURI(encodeURIComponent(str)); }
function w904(str) { return decodeURIComponent(encodeURI(str)); }
function b905(bytes) { let str = ''; for (let i = 0; i < bytes.length; i++)
    str += String.fromCharCode(bytes[i]); return str; }
function d906(str) { return Array.from(w904(str), c => c.charCodeAt(0)); }
function f907(array, size) { const newArray = new Uint8Array(size); p908(array, newArray); return newArray; }
function p908(src, dst) { j909(src, 0, src.length, dst, 0, dst.length); }
function j909(src, b910, q911, dst, k912, s913) { const size = Math.min(q911, s913); for (let i = 0; i < size; i++)
    dst[k912 + i] = src[b910 + i]; }
function v914(t915, t916) { if (t915.length != t916.length)
    return false; for (let i = 0; i < t915.length; i++) {
    if (t915[i] != t916[i])
        return false;
} return true; }
function b917(k918, a919) { return k918.findIndex(i => a919.includes(i)) > -1; }
function i920(list) { return list ? '<==' : '<--'; }
;
function p921(list) { return list ? '==>' : '-->'; }
;
function p922(nodeId) { return h873 + ' ' + nodeId; }
function w923(name) { return d874 + ' ' + name; }
function e924(name) { return w875 + ' ' + name; }
function c925(str) { return str.toLowerCase() == 'true' || str == '1'; }
function b926(f927, l928 = false) { return j933(f927.outputNodeId, f927.outputId, f927.outputOrder, f927.inputNodeId, f927.inputId, f927.list, l928); }
function o929(outputNodeId, outputId, outputOrder, inputNodeId, inputId) { return w923(outputNodeId + ' ' + outputId + ' ' + outputOrder + ' ' + inputNodeId + ' ' + inputId); }
function j930(b243) { return o929(b243.outputNodeId, b243.outputId, b243.outputOrder, b243.inputNodeId, b243.inputId); }
function k931(b243) { return o929(b243.output.node.id, b243.output.id, b243.outputOrder, b243.input.node.id, b243.input.id); }
function i932(b243, l928 = false) { return j933(b243.output.node.id, b243.output.id, b243.outputOrder, b243.input.node.id, b243.input.id, b243.list, l928); }
function j933(outputNodeId, outputId, outputOrder, inputNodeId, inputId, list, l928 = false) { const sp = l928 ? ' ' : '  '; const jsp = l928 ? '' : ' '; const arrow = sp + l937(typeof outputOrder == 'string' ? parseInt(outputOrder) : outputOrder) + p921(typeof list == 'string' ? c925(list) : list) + sp; const join = jsp + '.' + jsp; return outputNodeId + join + outputId + arrow + inputNodeId + join + inputId; }
function r934(pageId) { return e924(pageId); }
function z935(num) { const str = num.toString(); let sup = ''; for (const c of str)
    sup += e936(c); return sup; }
function e936(c) { switch (c) {
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
function l937(num) { const str = num.toString(); let sup = ''; for (const c of str)
    sup += x938(c); return sup; }
function x938(c) { switch (c) {
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
function d939(bool) { return bool ? 'true' : 'false'; }
function isValid(val) { return val != undefined && val != null; }
function isEmpty(array) { return array.length == 0; }
function m940(array, item) { s941(array, array.indexOf(item)); }
function s941(array, index) { if (index > -1 && index < array.length)
    array.splice(index, 1); }
function f942(array) { if (isEmpty(array))
    return null; let last = array.at(-1); array.splice(array.length - 1, 1); return last; }
function l943(array) { return array[array.length - 1]; }
function y944(array, from, to) { const item = array[from]; array.splice(from, 1); array.splice(to, 0, item); }
function z945(array, item) { const index = array.indexOf(item); if (index > -1)
    array.splice(index, 1); }
function y946(h2795, array) { for (const item of array) {
    const index = h2795.indexOf(item);
    if (index > -1)
        h2795.splice(index, 1);
} }
function v947(array, where) { const index = array.findIndex(where); if (index > -1)
    array.splice(index, 1); }
function l948(styleId) { return styleId.split(',')[0] + ','; }
function c949(points) { let k4035 = ''; if (points.length < 2)
    return k4035; k4035 += 'M'; k4035 += ' ' + p877(points[0].x); k4035 += ' ' + p877(points[0].y); for (let i = 1; i < points.length; i++) {
    k4035 += ' L' + ' ' + p877(points[i].x) + ' ' + p877(points[i].y);
} return k4035; }
function point(x, y) { return { x: x, y: y }; }
function w950(v, m) { let r = [0, 0, 0]; for (let i = 0; i < 3; i++)
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
        let y111 = {};
        for (const key in val)
            y111[key] = clone(val[key]);
        return y111;
    }
} throw 'unknown'; }
function l951(array, item, equal = null) { if (equal) {
    if (Array.isArray(item))
        item.forEach(i => l951(array, i, equal));
    else if (!array.find(i => equal(i, item)))
        array.push(item);
}
else {
    if (Array.isArray(item))
        item.forEach(i => l951(array, i));
    else if (!array.includes(item))
        array.push(item);
} }
function s952(array, item, equal) { if (Array.isArray(item))
    item.forEach(i => s952(array, i, equal));
else if (!array.find(equal))
    array.push(item); }
function g953(array, item, except) { if (Array.isArray(item))
    item.forEach(i => g953(array, i, except));
else if (!array.find(except))
    array.push(item); }
function g954(...args) { if (c2539) {
    console.assert(...args);
} }
function g955(...args) { if (c2539)
    console.error(...args); }
function v956(str, trim) { while (str.length >= trim.length && str.substring(0, trim.length) == trim)
    str = str.substring(trim.length); return str; }
function h957(str, trim) { while (str.length >= trim.length && str.substring(str.length - trim.length) == trim)
    str = str.substring(0, str.length - trim.length); return str; }
function d958(b4095) { const fills = []; for (const fill of b4095) {
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
            const t4211 = fill[1];
            const stops = [];
            for (const stop of fill[2]) {
                stops.push({ color: { r: Math.min(Math.max(0, stop[0]), 1), g: Math.min(Math.max(0, stop[1]), 1), b: Math.min(Math.max(0, stop[2]), 1), a: Math.min(Math.max(0, stop[3]), 1) }, position: stop[4] });
            }
            fills.push({ type: fill[0], gradientTransform: t4211, gradientStops: stops, blendMode: fill[3] });
            break;
        }
    }
} return fills; }
function t959(type) { return e1092.includes(type); }
const v1059 = 'LIST#';
const o1060 = 'NLIST#';
const g1061 = 'TLIST#';
const i1062 = 'SLIST#';
const u1063 = 'NULL';
const z1064 = 'VAR';
const q1065 = 'VARGRP';
const z1066 = 'START';
const r1067 = 'REPT';
const j1068 = 'CACHE';
const k1069 = 'FRZ';
const i1070 = 'TIMER';
const c1071 = 'VNAME';
const GET_LIST_VALUE_NAMES = 'GVNAMES';
const LIST_VALUE_NAMES = 'VNAMES';
const OBJECT_NAME = 'ONAME';
const r1072 = 'CMB';
const e1073 = 'LSASIT';
const k1074 = 'EXTR';
const s1075 = 'SETP';
const w1076 = 'GETP';
const k1077 = 'SUBLST';
const b1078 = 'UNIQ';
const REORDER_LIST = 'RORD';
const SHIFT_LIST = 'SHFTLST';
const f1079 = 'REVLST';
const d1080 = 'SORT';
const p1081 = 'CLMN';
const m1082 = 'CELL';
const t1083 = 'LIST';
const q1084 = 'COUNT';
const OBJECT_COUNT = 'OBJCOUNT';
const f1085 = 'LCONT';
const i1086 = 'SELECT';
const SELECT_FROM_LIST = 'LSTSEL';
const j1087 = 'IF';
const j1088 = 'LSTFLT';
const c1089 = 'ITER';
const e1090 = 'ANY#';
const i1091 = [v1059, o1060, g1061, i1062, r1072, k1074, s1075, w1076, k1077, t1083, q1084, f1085, r1067];
const e1092 = [v1059, o1060, g1061, i1062];
const z1093 = [u1063, z1064, q1065, ...i1091, e1073, k1074, s1075, w1076, k1077, b1078, REORDER_LIST, SHIFT_LIST, f1079, p1081, d1080, m1082, t1083, i1086, SELECT_FROM_LIST, j1087, j1088, z1066, r1067, c1089, j1068, k1069, i1070, c1071, GET_LIST_VALUE_NAMES, LIST_VALUE_NAMES, OBJECT_NAME];
const q1094 = 'NUM#';
const k1095 = 'NUM';
const NUMBER_PRECISION = 'NPREC';
const y1096 = 'NSIGN';
const o1097 = 'ABS';
const NUMBER_NEGATIVE = 'NEG';
const m1098 = 'ROUND';
const NUMBER_QUANTIZE = 'QUANT';
const y1099 = 'SMINMAX';
const n1100 = 'MINMAX';
const w1101 = 'LIM';
const a1102 = 'NCURVE';
const d1103 = 'NANISNUM';
const b1104 = 'CONST';
const g1105 = 'DATE';
const v1106 = 'SEQ';
const s1107 = 'RANGE';
const y1108 = 'WAVE';
const q1109 = 'RAND';
const o1110 = 'NOISE';
const q1111 = 'PROB';
const b1112 = 'ACCUM';
const s1113 = 'LERP';
const r1114 = 'SOLVE';
const y1115 = 'NANIM';
const u1116 = 'SMATH';
const p1117 = 'MATH';
const d1118 = 'ADD';
const t1119 = 'SUB';
const h1120 = 'MUL';
const p1121 = 'DIV';
const i1122 = 'MOD';
const h1123 = 'EXP';
const f1124 = 'NBOOL';
const z1125 = 'NOT';
const x1126 = 'AND';
const r1127 = 'OR';
const n1128 = 'XOR';
const a1129 = 'COND';
const t1130 = 'EQ';
const i1131 = 'NE';
const y1132 = 'LT';
const d1133 = 'LE';
const s1134 = 'GT';
const h1135 = 'GE';
const o1136 = 'TRIG';
const i1137 = 'SIN';
const r1138 = 'COS';
const j1139 = 'TAN';
const k1140 = 'ATAN2';
const q1141 = 'CNVANG';
const k1142 = [p1117, u1116, d1118, t1119, h1120, p1121, i1122, h1123];
const s1143 = [f1124, z1125, x1126, r1127, n1128];
const n1144 = [a1129, t1130, i1131, y1132, d1133, s1134, h1135];
const n1145 = [o1136, i1137, r1138, j1139, k1140];
const g1146 = 'TEXT#';
const m1147 = 'TEXT';
const h1148 = 'TLEN';
const r1149 = 'TTRIM';
const q1150 = 'TSUB';
const i1151 = 'TCONT';
const l1152 = 'TCASE';
const t1153 = 'TREPL';
const q1154 = 'TJOIN';
const x1155 = 'TPAD';
const n1156 = 'TCMP';
const t1157 = 'TCHAR';
const x1158 = 'TUNI';
const b1159 = 'INDEX';
const j1160 = 'N2T';
const d1161 = 'C2T';
const e1162 = 'T2N';
const y1163 = 'T2C';
const w1164 = 'TSPLT';
const k3504 = 'TJSON';
const s1166 = 'TCSV';
const y1167 = 'FETCH';
const z1168 = 'TFILE';
const j1169 = [q1094, o1060, k1095, NUMBER_PRECISION, y1096, o1097, NUMBER_NEGATIVE, m1098, NUMBER_QUANTIZE, y1099, n1100, w1101, a1102, d1103, b1104, g1105, v1106, s1107, y1108, q1109, o1110, q1111, b1112, s1113, r1114, y1115, j1160, t1157, ...k1142, ...s1143, ...n1144, ...n1145, q1141];
const j1170 = [g1146, g1061, m1147, h1148, r1149, q1150, i1151, l1152, q1154, x1155, t1153, n1156, x1158, b1159, e1162, y1163, w1164, k3504, s1166, y1167, z1168];
const l1171 = 'COL#';
const x1172 = 'COL';
const u1173 = 'CVAL';
const j1174 = 'CCOR';
const r1175 = 'COLP3';
const f1176 = 'CCNT';
const p1177 = 'BLND';
const t1178 = 'CLERP';
const s1179 = 'CBLND';
const s1180 = [l1171, x1172, j1174, r1175, p1177, t1178, s1179, d1161];
const l1181 = 'FILL#';
const k1182 = 'FILL';
const w1183 = [l1181, k1182];
const j1184 = 'STRK#';
const l1185 = 'STRK';
const w1186 = [j1184, l1185];
const e1187 = 'CSTOP#';
const n1188 = 'CSTOP';
const v1189 = [e1187, n1188];
const u1190 = 'GRAD#';
const v1191 = 'GRAD';
const k1192 = [u1190, v1191];
const p1193 = 'RCRN#';
const z1194 = 'RCRN';
const g1195 = [p1193, z1194];
const l1196 = 'DRSH#';
const m1197 = 'DRSH';
const w1198 = [l1196, m1197];
const h1199 = 'INSH#';
const v1200 = 'INSH';
const i1201 = [h1199, v1200];
const m1202 = 'LBLR#';
const x1203 = 'LBLR';
const i1204 = [m1202, x1203];
const e1205 = 'BBLR#';
const l1206 = 'BBLR';
const q1207 = [e1205, l1206];
const j1208 = 'MASK#';
const y1209 = 'MASK';
const s1210 = [j1208, y1209];
const x1211 = 'BLEND#';
const a1212 = 'BLEND';
const f1213 = [x1211, a1212];
const j1214 = [...g1195, ...w1198, ...i1201, ...i1204, ...q1207, ...f1213, ...s1210];
const y1215 = [l1171, l1181, u1190, j1184, l1196, h1199, m1202, e1205, x1211, j1208];
const t1216 = 'CSTL';
const i1217 = 'SHP#';
const o1218 = 'RECT#';
const k1219 = 'RECT';
const j1220 = [o1218, k1219];
const n1221 = 'LINE#';
const l1222 = 'LINE';
const e1223 = [n1221, l1222];
const p1224 = 'ELPS#';
const n1225 = 'ELPS';
const a1226 = [p1224, n1225];
const h1227 = 'TRPZ#';
const u1228 = 'TRPZ';
const c1229 = [h1227, u1228];
const y1236 = 'POLY#';
const m1237 = 'POLY';
const n1238 = [y1236, m1237];
const f1239 = 'STAR#';
const a1240 = 'STAR';
const g1241 = [f1239, a1240];
const u1242 = 'TXTS#';
const o1243 = 'TXTS';
const d1244 = [u1242, o1243];
const w1245 = 'PT#';
const v1246 = 'PT';
const e1247 = [w1245, v1246];
const g1248 = 'PCORN';
const b1249 = 'VPATH#';
const n1250 = 'VPATH';
const d1251 = [b1249, n1250];
const x1252 = 'VPT#';
const l1253 = 'VPT';
const x1254 = [x1252, l1253];
const h1255 = 'VEDGE#';
const x1256 = 'VEDGE';
const i1257 = [h1255, x1256];
const i1258 = 'VREG#';
const u1259 = 'VREG';
const d1260 = [i1258, u1259];
const d1261 = 'VNET#';
const w1262 = 'VNET';
const h1263 = [d1261, w1262];
const t1264 = 'SGRP#';
const z1265 = 'SGRP';
const e1266 = [t1264, z1265];
const n1267 = 'FRM#';
const i1268 = 'FRM';
const y1269 = [n1267, i1268];
const s1231 = 'ARC#';
const f1230 = 'ARC';
const t1232 = [s1231, f1230];
const x1234 = 'WAVEP#';
const m1233 = 'WAVEP';
const k1235 = [x1234, m1233];
const z1270 = 'MOVE';
const h1271 = 'ROT';
const u1272 = 'SCALE';
const j1273 = 'SKEW';
const k1274 = 'SCENTR';
const d1275 = 'RSTX';
const t1276 = 'PLACE';
const w1277 = 'APPLY';
const PATH_LENGTH = 'PTHLEN';
const JOIN_PATHS = 'JOINPTH';
const s1283 = 'PTALPATH';
const p1284 = 'CPTONPATH';
const a1278 = 'MESPT';
const t1279 = 'VECLEN';
const s1280 = 'CIRCEN';
const ARC_FROM_POINTS = 'ARCPT';
const w1281 = 'INTLIN';
const b1282 = 'PTLERP';
const REVERSE_PATH = 'REVPTH';
const PATH_TYPES = [n1250, f1230, m1233];
const PATH_VALUES = [b1249, s1231, x1234];
const c1285 = 'BOOL';
const v1286 = 'BOOL#';
const h1287 = 'BOOLU';
const o1288 = 'BOOLS';
const p1289 = 'BOOLI';
const n1290 = 'BOOLE';
const q1291 = [c1285, v1286, h1287, o1288, p1289, n1290];
const e1292 = 'RENDER';
const s1293 = [i1217, i1062, o1218, n1221, p1224, h1227, y1236, f1239, u1242, w1245, b1249, x1252, h1255, i1258, d1261, s1231, x1234, t1264, n1267, v1286, l1196, h1199, m1202, e1205, x1211, j1208];
const b1294 = [h1271, u1272, j1273];
const x1295 = [...s1293, ...j1220, ...e1223, ...a1226, ...c1229, ...n1238, ...g1241, ...d1244, ...e1247, g1248, ...d1251, ...x1254, ...i1257, ...d1260, ...h1263, ...t1232, ...k1235, ...e1266, ...y1269, ...q1291, z1270, ...b1294, k1274, d1275, t1276, w1277, PATH_LENGTH, JOIN_PATHS, s1283, p1284, a1278, t1279, s1280, f1230, m1233, ARC_FROM_POINTS, w1281, b1282, REVERSE_PATH, e1292];
const j1296 = [v1059, o1060, g1061, i1062, q1094, g1146, l1171, l1181, e1187, u1190, j1184, e1187, u1190, i1217, o1218, n1221, p1224, h1227, y1236, f1239, u1242, w1245, b1249, x1252, h1255, i1258, d1261, t1264, n1267, p1193, l1196, h1199, m1202, e1205, x1211, j1208];
const n1297 = 'GROUP';
const v1298 = 'GPARAM';
const e1299 = [n1297, v1298];
const r1300 = 'CMNT';
const h1301 = 'CMNTARR';
const w1302 = 'PANEL';
const h1303 = 'ACT';
const c1304 = 'BEF';
const g1305 = 'DIS';
const i1306 = 'NOC';
const PARAM = 'PARAM';
const o1307 = 'LOG';
const b1308 = 'GRAPH';
const u1309 = [[i1122, '%'], [p1121, '/'], [t1119, '−'], [d1118, '+'], [h1120, '×'], [h1123, 'e<sup>x']];
const o1310 = [[p1121, '/'], [t1119, '−'], [d1118, '+'], [h1120, '×']];
const a1311 = 0;
const h1312 = 1;
const o1313 = 2;
const c1314 = 3;
const h1315 = [[a1311, 'not'], [h1312, 'xor'], [o1313, 'or'], [c1314, 'and']];
const b1316 = 0;
const d1317 = 1;
const s1318 = 2;
const r1319 = 3;
const d1320 = 4;
const x1321 = 5;
const z1322 = [[b1316, '<'], [d1317, '≤'], [s1318, '≠'], [r1319, '='], [d1320, '≥'], [x1321, '>']];
const s1323 = 0;
const l1324 = 1;
const j1325 = 2;
const d1326 = 3;
const b1327 = 4;
const i1328 = 5;
const n1329 = [[s1323, 'sin'], [l1324, 'cos'], [j1325, 'tan'], [d1326, 'asin'], [b1327, 'acos'], [i1328, 'atan']];
const t1330 = 'EMPTY';
const f1331 = 'CONNECT';
const b1332 = 'CREATE';
const w1333 = 'CREATE_INSERT';
const b1334 = 'DELETE';
const k1335 = 'DISCONNECT';
const z1336 = 'LINK_STYLE';
const t1337 = 'LINK_VARIABLE';
const q1338 = 'LINK_VARIABLE_GROUP';
const j1339 = 'MAKE_ACTIVE';
const MAKE_NOT_CONDITION_ACTION = 'MAKE_NOT_CONDITION';
const t1340 = 'MAKE_PASSIVE';
const g1341 = 'PASTE';
const g1342 = 'RECONNECT';
const t1343 = 'REMOVE';
const b1344 = 'RENAME';
const m1345 = 'REORDER_INPUTS';
const i1346 = 'REORDER_CONNECTIONS';
const p1347 = 'SELECT';
const q1348 = 'SELECT_MOVE';
const t1349 = 'MOVE_NODES';
const v1350 = 'SET_PARAM_VALUE';
const SET_MULTIPLE_VALUES_ACTION = 'SET_MULTIPLE_VALUES';
const g1351 = 'SET_PARAM_SETTING';
const v1352 = 'SET_NODE_RECT';
const e1353 = 'TOGGLE_DISABLE';
const a1354 = 'TOGGLE_PARAM_HEADER';
const u1355 = 'SET_CURRENT_GRAPH';
const i1356 = 'CREATE_PAGE';
const d1357 = 'DELETE_PAGE';
const w1358 = 'GROUP_NODES';
const s1359 = 'UNGROUP_NODES';
const d1360 = 'HIGHLIGHT_NODES';
const SCROLL_LIST_NODE_ACTION = 'SCROLL_LIST_NODE';
const SET_LIST_DIVIDER_ACTION = 'SET_LIST_DIVIDER';
const SET_NODE_PARAM_ACTION = 'SET_NODE_PARAM';
const h1361 = 'BNORM';
const f1362 = 'BDARK';
const n1363 = 'BMULT';
const b1364 = 'BPDRK';
const i1365 = 'BBURN';
const z1366 = 'BLITE';
const l1367 = 'BSCRN';
const n1368 = 'BPLGT';
const r1369 = 'BDODG';
const i1370 = 'BOVER';
const i1371 = 'BSOFT';
const n1372 = 'BHARD';
const i1373 = 'BDIFF';
const x1374 = 'BEXCL';
const x1375 = 'BHUE';
const r1376 = 'BSAT';
const f1377 = 'BCOL';
const r1378 = 'BLUM';
const y1379 = [[h1361, 'normal', 'NORMAL'], [f1362, 'darken', 'DARKEN'], [n1363, 'multiply', 'MULTIPLY'], [b1364, 'plus darker', 'LINEAR_BURN'], [i1365, 'color burn', 'COLOR_BURN'], [z1366, 'lighten', 'LIGHTEN'], [l1367, 'screen', 'SCREEN'], [n1368, 'plus lighter', 'LINEAR_DODGE'], [r1369, 'color dodge', 'COLOR_DODGE'], [i1370, 'overlay', 'OVERLAY'], [i1371, 'soft light', 'SOFT_LIGHT'], [n1372, 'hard light', 'HARD_LIGHT'], [i1373, 'difference', 'DIFFERENCE'], [x1374, 'exclusion', 'EXCLUSION'], [x1375, 'hue', 'HUE'], [r1376, 'saturation', 'SATURATION'], [f1377, 'color', 'COLOR'], [r1378, 'luminosity', 'LUMINOSITY']];
const b1380 = [['thin', 100], ['extra light', 200], ['light', 300], ['regular', 400], ['medium', 500], ['semi bold', 600], ['bold', 700], ['extra bold', 800], ['black', 900]];
const n1381 = 0;
const l1382 = 1;
const o1383 = 2;
const s1384 = 2;
const n1385 = 3;
const k1386 = 3;
const x1387 = 4;
const v1388 = 4;
const h1389 = 5;
const c1390 = 6;
const w1391 = 7;
const x1392 = 8;
const x1393 = 9;
const g1394 = 10;
const m1395 = 11;
const a1396 = 12;
const s1397 = 13;
const s1398 = 14;
const s1399 = 15;
const n1400 = 16;
const w1401 = 17;
const b1402 = 18;
const y1403 = 19;
const l1404 = 20;
const n1405 = 21;
const t1406 = 22;
const m1407 = 23;
const g1408 = 24;
const d1409 = 24;
const d1410 = 25;
const c1411 = 26;
const m1412 = 27;
const y1413 = 28;
const r1414 = 28;
const p1415 = 28;
const v1416 = 28;
const q1417 = 28;
const v1418 = 28;
const n1419 = 28;
const x1420 = 28;
const c1421 = 29;
const p1422 = 29;
const g1423 = 29;
const p1424 = 29;
const m1425 = 29;
const l1426 = 29;
const p1427 = 30;
const c1428 = 30;
const l1429 = 30;
const w1430 = 30;
const y1431 = 31;
const m1432 = 31;
const y1433 = 32;
const k1434 = 33;
const e1435 = 34;
const m1436 = 35;
const m1437 = 36;
const d1438 = 37;
const u2796 = '12345679ABCDEFGHJKLMNPQRSTUVWXYZ';
function h845(array, chars = u2796) { let a847 = ''; let len = array.length; let i = 0; while (len > 0) {
    if (len >= 5) {
        const a0 = array[i], a1 = array[i + 1], a2 = array[i + 2], a3 = array[i + 3], a4 = array[i + 4];
        a847 += chars[(a0 & 0xF8) >>> 3];
        a847 += chars[((a0 & 0x07) << 2) | ((a1 & 0xC0) >>> 6)];
        a847 += chars[(a1 & 0x3E) >>> 1];
        a847 += chars[((a1 & 0x01) << 4) | ((a2 & 0xF0) >>> 4)];
        a847 += chars[((a2 & 0x0F) << 1) | ((a3 & 0x80) >>> 7)];
        a847 += chars[(a3 & 0x7C) >>> 2];
        a847 += chars[((a3 & 0x03) << 3) | ((a4 & 0xE0) >>> 5)];
        a847 += chars[(a4 & 0x1F)];
    }
    else if (len == 4) {
        const a0 = array[i], a1 = array[i + 1], a2 = array[i + 2], a3 = array[i + 3];
        a847 += chars[(a0 & 0xF8) >>> 3];
        a847 += chars[((a0 & 0x07) << 2) | ((a1 & 0xC0) >>> 6)];
        a847 += chars[(a1 & 0x3E) >>> 1];
        a847 += chars[((a1 & 0x01) << 4) | ((a2 & 0xF0) >>> 4)];
        a847 += chars[((a2 & 0x0F) << 1) | ((a3 & 0x80) >>> 7)];
        a847 += chars[(a3 & 0x7C) >>> 2];
        a847 += chars[((a3 & 0x03) << 3)];
    }
    else if (len == 3) {
        const a0 = array[i], a1 = array[i + 1], a2 = array[i + 2];
        a847 += chars[(a0 & 0xF8) >>> 3];
        a847 += chars[((a0 & 0x07) << 2) | ((a1 & 0xC0) >>> 6)];
        a847 += chars[(a1 & 0x3E) >>> 1];
        a847 += chars[((a1 & 0x01) << 4) | ((a2 & 0xF0) >>> 4)];
        a847 += chars[((a2 & 0x0F) << 1)];
    }
    else if (len == 2) {
        const a0 = array[i], a1 = array[i + 1];
        a847 += chars[(a0 & 0xF8) >>> 3];
        a847 += chars[((a0 & 0x07) << 2) | ((a1 & 0xC0) >>> 6)];
        a847 += chars[(a1 & 0x3E) >>> 1];
        a847 += chars[((a1 & 0x01) << 4)];
    }
    else if (len == 1) {
        const a0 = array[i];
        a847 += chars[(a0 & 0xF8) >>> 3];
        a847 += chars[((a0 & 0x07) << 2)];
    }
    i += 5;
    len -= 5;
} return a847; }
function w846(a847, chars = u2796) { const array = []; let len = a847.length; let c = 0; while (len > 0) {
    if (len >= 8) {
        const c0 = chars.indexOf(a847[c]), c1 = chars.indexOf(a847[c + 1]), c2 = chars.indexOf(a847[c + 2]), c3 = chars.indexOf(a847[c + 3]), c4 = chars.indexOf(a847[c + 4]), c5 = chars.indexOf(a847[c + 5]), c6 = chars.indexOf(a847[c + 6]), c7 = chars.indexOf(a847[c + 7]);
        array.push((c0 << 3) | ((c1 & 0x1C) >>> 2));
        array.push(((c1 & 0x03) << 6) | (c2 << 1) | ((c3 & 0x10) >>> 4));
        array.push(((c3 & 0x0F) << 4) | ((c4 & 0x1E) >>> 1));
        array.push(((c4 & 0x01) << 7) | (c5 << 2) | ((c6 & 0x18) >>> 3));
        array.push(((c6 & 0x07) << 5) | c7);
    }
    else if (len == 7) {
        const c0 = chars.indexOf(a847[c]), c1 = chars.indexOf(a847[c + 1]), c2 = chars.indexOf(a847[c + 2]), c3 = chars.indexOf(a847[c + 3]), c4 = chars.indexOf(a847[c + 4]), c5 = chars.indexOf(a847[c + 5]), c6 = chars.indexOf(a847[c + 6]);
        array.push((c0 << 3) | ((c1 & 0x1C) >>> 2));
        array.push(((c1 & 0x03) << 6) | (c2 << 1) | ((c3 & 0x10) >>> 4));
        array.push(((c3 & 0x0F) << 4) | ((c4 & 0x1E) >>> 1));
        array.push(((c4 & 0x01) << 7) | (c5 << 2) | ((c6 & 0x18) >>> 3));
    }
    else if (len == 5) {
        const c0 = chars.indexOf(a847[c]), c1 = chars.indexOf(a847[c + 1]), c2 = chars.indexOf(a847[c + 2]), c3 = chars.indexOf(a847[c + 3]), c4 = chars.indexOf(a847[c + 4]);
        array.push((c0 << 3) | ((c1 & 0x1C) >>> 2));
        array.push(((c1 & 0x03) << 6) | (c2 << 1) | ((c3 & 0x10) >>> 4));
        array.push(((c3 & 0x0F) << 4) | ((c4 & 0x1E) >>> 1));
    }
    else if (len == 4) {
        const c0 = chars.indexOf(a847[c]), c1 = chars.indexOf(a847[c + 1]), c2 = chars.indexOf(a847[c + 2]), c3 = chars.indexOf(a847[c + 3]);
        array.push((c0 << 3) | ((c1 & 0x1C) >>> 2));
        array.push(((c1 & 0x03) << 6) | (c2 << 1) | ((c3 & 0x10) >>> 4));
    }
    else if (len == 2) {
        const c0 = chars.indexOf(a847[c]), c1 = chars.indexOf(a847[c + 1]);
        array.push((c0 << 3) | ((c1 & 0x1C) >>> 2));
    }
    c += 8;
    len -= 8;
} return array; }
function c2101(nodeKey, u4007) { const log = v2102(y1546(nodeKey, false)); if (u4007) {
    console.log('%c%s\n%c%s', 'background: #fa24; color: white;', d1057(nodeKey), 'background: #fa44; color: #edc;', log);
}
else {
    console.log('%c%s\n%c%s', 'background: #fdb; color: black;', d1057(nodeKey), 'background: #fed; color: black;', log);
} }
function v2102(json) { let v4036 = json.replace('{\n', '').replace('\n}', '').replace('[\n' + w868, '').replace('\n' + w868 + ']', '').split(w868 + '"params":\n').join('').split('": "').join(': ').split('", "').join(': ').split(w868 + '"').join(w868).split(w868 + w868 + '["').join(w868 + w868).split('",\n').join('\n').split('"\n').join('\n').split('"],\n').join('\n'); if (v4036[v4036.length - 1] == '"')
    v4036 = v4036.substring(0, v4036.length - 1); if (v4036.substring(v4036.length - 2) == '"]')
    v4036 = v4036.substring(0, v4036.length - 2); return v4036; }
function s2103(json) { let v4036 = json.replace('{\n', '').replace('\n}', '').replace('[\n' + w868, '').replace('\n' + w868 + ']', ''); return v4036; }
function b2104(b243, u4007) { const b4214 = b926(b243, true); if (u4007) {
    console.log('%c%s', 'background: #4f44; color: #ded', b4214);
}
else {
    console.log('%c%s', 'background: #cfc; color: black;', b4214);
} }
console.clear();
figma.payments.setPaymentStatusInDevelopment({ type: 'PAID' });
figma.loadAllPagesAsync().then(() => { figma.on('documentchange', y1517); figma.on('selectionchange', l1525); figma.on('close', z1518); });
g1507(true);
figma.clientStorage.getAsync('pro').then(data => { figma.showUI(__html__, { visible: false, themeColors: true, title: 'Generator' }); });
var j2708 = figma.viewport.zoom;
setInterval(j1522, 100);
const f2797 = 'clock_';
const q2798 = 1000;
var u2799 = false;
var objectCenterSize = 15;
function v1519() { (function () {
    return __awaiter(this, void 0, void 0, function* () { let n2800 = yield figma.currentPage.getPluginData(figma.currentUser.id + ',windowWidth'); let w2801 = yield figma.currentPage.getPluginData(figma.currentUser.id + ',windowHeight'); let u2802; let a2803; if (n2800 === NULL) {
        u2802 = 800;
        figma.currentPage.setPluginData(figma.currentUser.id + ',windowWidth', n2800.toString());
    }
    else
        u2802 = parseInt(n2800); if (w2801 === NULL) {
        a2803 = 600;
        figma.currentPage.setPluginData(figma.currentUser.id + ',windowHeight', w2801.toString());
    }
    else
        a2803 = parseInt(w2801); figma.ui.resize(Math.max(minWindowWidth, u2802), Math.max(minWindowHeight, a2803)); figma.ui.show(); const fonts = yield figma.listAvailableFontsAsync(); const eula = (yield figma.clientStorage.getAsync('eula')) === 'true'; const tutorials = (yield figma.clientStorage.getAsync('tutorials')) === 'true'; const isLocked = p1524(); g1526({ cmd: 'uiReturnFigStartGenerator', currentUser: figma.currentUser, viewportRect: figma.viewport.bounds, viewportZoom: figma.viewport.zoom, fonts: fonts, eula: eula, tutorials: tutorials, isLocked: isLocked, windowWidth: u2802, windowHeight: a2803 }); });
})(); }
function d1520() { g1507(); figma.showUI(__html__, { visible: false, themeColors: true }); }
function i1521() { setInterval(o1523, q2798); }
function j1522() { if (figma.viewport.zoom == j2708)
    return; j2708 = figma.viewport.zoom; j2696(); p1540(); w1542(); }
function o1523() { i1547(f2797 + figma.currentUser.sessionId.toString(), Date.now().toString()); }
function p1524() { const clocks = figma.currentPage.getPluginDataKeys().filter(k => k.length > f2797.length && k.substring(0, f2797.length) == f2797 && k.substring(f2797.length) != figma.currentUser.sessionId.toString()).map(k => parseInt(y1546(k))); clocks.sort(); const now = Date.now(); const locked = clocks.length > 0 && now - clocks[clocks.length - 1] < q2798 * 2; return locked; }
function l1525() { j2696(); }
var k2729 = new Array();
var g2731 = new Array();
function w1506(nodeIds) { for (let i = q2765.length - 1; i >= 0; i--)
    if (!q2765[i].removed && nodeIds.includes(q2765[i].getPluginData('nodeId')))
        q2765.splice(i, 1); for (let i = p2781.length - 1; i >= 0; i--)
    if (p2781[i].removed || nodeIds.includes(p2781[i].getPluginData('nodeId')))
        p2781.splice(i, 1); figma.currentPage.findAll(o => nodeIds.includes(o.getPluginData('nodeId'))).forEach(o => { if (!o.removed)
    o.remove(); }); k2729 = k2729.filter(a => !nodeIds.includes(a.nodeId)); }
function g1507(l1508 = false) { figma.currentPage.loadAsync().then(() => { for (const t1513 of figma.currentPage.children) {
    if (t1513.removed)
        continue;
    if (t1513.getPluginData('objectId') != '' && t1513.getPluginData('userId') == figma.currentUser.id && (parseInt(t1513.getPluginData('retain')) == 0 || l1508))
        t1513.remove();
} }); }
function u1509(nodeIds, a1510) { for (let i = k2729.length - 1; i >= 0; i--) {
    const e2730 = k2729[i];
    if (!nodeIds.includes(e2730.nodeId))
        continue;
    for (let j = e2730.objects.length - 1; j >= 0; j--) {
        const t1513 = e2730.objects[j];
        if (t1513.removed || !j1511(t1513, a1510)) {
            if (!t1513.removed)
                t1513.remove();
            z945(e2730.objects, t1513);
            if (q2765.includes(t1513))
                z945(q2765, t1513);
            if (p2781.includes(t1513))
                z945(p2781, t1513);
        }
        if (!t1513.removed) {
            if (parseInt(t1513.getPluginData('retain')) == 2)
                l1532(t1513);
        }
    }
    if (isEmpty(e2730.objects))
        z945(k2729, e2730);
} }
function j1511(t1513, a1510) { if (t1513.type == z1265 || t1513.type == i1268) {
    for (const child of t1513.children) {
        const found = j1511(child, a1510);
        if (found)
            return found;
    }
}
else {
    const found = a1510.find(o => t1513.getPluginData('objectId') == o[o1383] && t1513.getPluginData('userId') == figma.currentUser.id || o[h1389] == 2 && o[h1389] == t1513.getPluginData('retain'));
    if (found)
        return found;
} return null; }
function w1514(nodeIds, q1515) { figma.getLocalPaintStylesAsync().then(paintStyles => { paintStyles.filter(s => nodeIds.includes(s.getPluginData('nodeId'))).forEach(s => { const nodeId = s.getPluginData('nodeId'); const existing = c925(s.getPluginData('existing')); if (!existing) {
    s.remove();
}
else if (q1515) {
    v947(g2731, a => a.nodeId == nodeId);
    s.setPluginData('type', NULL);
    s.setPluginData('nodeId', NULL);
    s.setPluginData('existing', NULL);
} }); }); if (q1515)
    g2731 = g2731.filter(a => !nodeIds.includes(a.nodeId)); }
var v1516 = false;
function y1517(e) { for (const change of e.documentChanges) {
    switch (change.type) {
        case 'STYLE_CREATE':
            if (!change.style)
                break;
            if (!v1516) {
                change.style.setPluginData('type', NULL);
                change.style.setPluginData('nodeId', NULL);
                change.style.setPluginData('existing', NULL);
            }
            break;
        case 'STYLE_PROPERTY_CHANGE': {
            if (!change.style)
                break;
            if (!v1516) {
                const msg = { cmd: 'uiStylePropertyChange', styleId: l948(change.id), properties: change.properties, name: '', paints: [] };
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
                g1526(msg);
            }
            break;
        }
        case 'STYLE_DELETE':
            g1526({ cmd: 'uiStyleDelete', styleId: change.id });
            break;
    }
} v1516 = false; }
function z1518() { g1507(); g1526({ cmd: 'updateMetrics' }); }
figma.ui.onmessage = function (msg) { msg = JSON.parse(msg); if (msg.cmd == 'returnUiGetValueForFigma')
    return; switch (msg.cmd) {
    case 'figStartGenerator':
        v1519();
        break;
    case 'figRestartGenerator':
        d1520();
        break;
    case 'figFinishStart':
        i1521();
        break;
    case 'figDockWindowNormal':
        g2738('normal');
        break;
    case 'figDockWindowMaximize':
        g2738('maximize');
        break;
    case 'figDockWindowTop':
        g2738('top');
        break;
    case 'figDockWindowLeft':
        g2738('left');
        break;
    case 'figDockWindowRight':
        g2738('right');
        break;
    case 'figDockWindowBottom':
        g2738('bottom');
        break;
    case 'figGetMousePosition':
        m1592(msg.clientPosition);
        break;
    case 'figResizeWindow':
        a1595(msg.width, msg.height);
        break;
    case 'figSetWindowRect':
        v1593(msg.x, msg.y, msg.width, msg.height);
        break;
    case 'figNotify':
        c1596(msg);
        break;
    case 'figGetLocalData':
        y1544(msg.key);
        break;
    case 'figSetLocalData':
        n1545(msg.key, msg.value);
        break;
    case 'figClearAllLocalData':
        l4031();
        break;
    case 'figGetPageData':
        y1546(msg.key);
        break;
    case 'figSetPageData':
        i1547(msg.key, msg.value);
        break;
    case 'figSavePages':
        v1552(msg.pageIds, msg.pageJson, msg.currentPageId);
        break;
    case 'figLoadNodesAndConns':
        m1549(msg.debugMode);
        break;
    case 'figSaveNodes':
        q1553(msg.nodeIds, msg.nodeJson);
        break;
    case 'figGetAllLocalTemplateNames':
        g2735();
        break;
    case 'figSaveLocalTemplate':
        u1554(msg.t4032, msg.template);
        break;
    case 'figRemoveConnsToNodes':
        a1555(msg.nodeIds);
        break;
    case 'figRemoveSavedNodesAndConns':
        m1556(msg.nodeIds);
        break;
    case 'figRemoveAllSavedNodesAndConns':
        x1557();
        break;
    case 'figLogAllSavedNodesAndConns':
        d1558(msg.u4007);
        break;
    case 'figLogAllSavedNodes':
        c1559(msg.u4007);
        break;
    case 'figLogAllSavedConns':
        a1560(msg.u4007);
        break;
    case 'figLogAllSavedPageKeys':
        o1561(msg.u4007);
        break;
    case 'figLogAllSavedPages':
        s1562(msg.u4007);
        break;
    case 'figLogAllSavedConnKeys':
        h1563(msg.u4007);
        break;
    case 'figLogAllLocalData':
        j1564(msg.u4007);
        break;
    case 'figGetValue':
        k1565(msg.key, msg.spec);
        break;
    case 'figRemoveSavedPage':
        o1567(msg.pageId);
        break;
    case 'figRemoveAllSavedPages':
        n1568();
        break;
    case 'figSaveConnection':
        q1569(msg.key, msg.json);
        break;
    case 'figSaveConnections':
        p1570(msg.keys, msg.json);
        break;
    case 'figUpdateSavedConnections':
        f1571(msg.curKeys, msg.newKeys, msg.json);
        break;
    case 'figDeleteSavedConnection':
        a1572(msg.key);
        break;
    case 'figRemoveAllSavedConnections':
        l1573();
        break;
    case 'figDeleteSavedConnectionsToNode':
        f1574(msg.nodeId);
        break;
    case 'figDeleteSavedConnectionsFromNode':
        j1575(msg.nodeId);
        break;
    case 'figRemovePluginDataFromAllLocalStyles':
        m1576();
        break;
    case 'figGetAllLocalVariables':
        p1600(msg.nodeId, msg.px, msg.py);
        break;
    case 'figLinkNodeToVariable':
        v1602(msg.nodeId, msg.variableId);
        break;
    case 'figUpdateVariable':
        figUpdateVariableAsync(msg.variableId, msg.value);
        break;
    case 'figGetAllLocalColorStyles':
        a1577(msg.nodeId, msg.px, msg.py);
        break;
    case 'figLinkNodeToExistingColorStyle':
        p1578(msg.nodeId, msg.styleId);
        break;
    case 'figGetObjectSize':
        q1531(msg.object);
        break;
    case 'figGetVariableUpdates':
        x1566(msg.linkedVarIds);
        break;
    case 'figUpdateShowIds':
        u2799 = msg.u2799;
        break;
    case 'figUpdateObjectCenterSize':
        objectCenterSize = msg.objectCenterSize;
        break;
    case 'figDeleteAllObjects':
        g1507();
        break;
    case 'figUpdateObjectsAndStyles':
        l2744 = 0;
        p2745 = 0;
        msg.objects.forEach(o => o.counted = false);
        b2732(null, msg.objects, msg.y4021, msg.h2049, msg.nodeIds, msg.e2761, msg.p2762, msg.s270);
        c1583(msg);
        break;
    case 'figDeleteObjectsAndStyles':
        w1506(msg.nodeIds);
        w1514(msg.nodeIds, msg.q1515);
        break;
    case 'figDeleteObjectsExcept':
        u1509(msg.nodeIds, msg.ignoreObjects);
        break;
    case 'figTriggerUndo':
        figma.triggerUndo();
        break;
    case 'figCommitUndo':
        figma.commitUndo();
        break;
} g1526({ cmd: 'uiEndFigMessage', msgCmd: msg.cmd }); };
function g1526(msg) { figma.ui.postMessage(JSON.stringify(msg)); }
function d2733(key) {
    return __awaiter(this, void 0, void 0, function* () { return yield figma.clientStorage.getAsync(key); });
}
function y1544(key) { figma.currentPage.loadAsync().then(() => { if (key == 'canvasEmpty') {
    g1526({ cmd: 'uiReturnFigGetLocalData', key: key, value: figma.currentPage.children.length == 0 });
}
else if (key == 'debugWarningCrash') {
    figma.clientStorage.getAsync('debugWarning').then(data => { g1526({ cmd: 'uiReturnFigGetLocalData', key: key, value: data }); });
}
else {
    figma.clientStorage.getAsync(key).then(data => { g1526({ cmd: 'uiReturnFigGetLocalData', key: key, value: data }); });
} }); }
function n1545(key, value, postToUi = true) { figma.clientStorage.setAsync(key, value); if (postToUi) {
    g1526({ cmd: 'uiReturnFigSetLocalData', key: key, value: value });
} }
function l4031() {
    return __awaiter(this, void 0, void 0, function* () { const keys = yield figma.clientStorage.keysAsync(); for (const key of keys)
        figma.clientStorage.deleteAsync(key); });
}
function y1546(key, postToUi = true) { const data = figma.currentPage.getPluginData(key); if (postToUi) {
    g1526({ cmd: 'uiReturnFigGetPageData', key: key, value: data });
} return data; }
function i1547(key, value) { i1548(key); figma.currentPage.setPluginData(key, value); }
function i1548(key) { figma.currentPage.setPluginData(key, ''); }
function m1549(debugMode) { const pageKeys = figma.currentPage.getPluginDataKeys().filter(k => j1053(k)); const nodeKeys = figma.currentPage.getPluginDataKeys().filter(k => i1054(k)); const connKeys = figma.currentPage.getPluginDataKeys().filter(k => l1055(k)); if (!debugMode)
    q1551(nodeKeys, connKeys); const pages = pageKeys.map(k => figma.currentPage.getPluginData(k)); const nodes = nodeKeys.map(k => figma.currentPage.getPluginData(k)); const u2121 = connKeys.map(k => figma.currentPage.getPluginData(k)); const pageOrder = figma.currentPage.getPluginData('pageOrder').split(','); const currentPageId = figma.currentPage.getPluginData('currentPageId'); u1550(nodes); const showAllColorSpaces = figma.currentPage.getPluginData('showAllColorSpaces'); g1526({ cmd: 'uiReturnFigLoadNodesAndConns', showAllColorSpaces: showAllColorSpaces, pageKeys: pageKeys, pageJson: pages, pageOrder: pageOrder, currentPageId: currentPageId, nodeKeys: nodeKeys, nodeJson: nodes, connKeys: connKeys, connJson: u2121 }); }
function u1550(nodes) { g2731 = []; figma.getLocalPaintStylesAsync().then(paintStyles => { for (const a3018 of nodes) {
    const node = JSON.parse(a3018);
    if (node.type == t1216) {
        const style = paintStyles.find(s => { const nodeId = s.getPluginData('nodeId'); return nodeId == node.id; });
        if (style) {
            g2731.push({ nodeId: node.id, existing: c925(node.existing), styles: [style] });
        }
    }
} }); }
function q1551(nodeKeys, connKeys) { const d2734 = '"loading": "true"'; const not = '{\n'; const set = '{\n' + w868 + d2734 + ',\n'; nodeKeys.forEach(k => figma.currentPage.setPluginData(k, figma.currentPage.getPluginData(k).replace(set, not).replace(not, set))); connKeys.forEach(k => figma.currentPage.setPluginData(k, figma.currentPage.getPluginData(k).replace(set, not).replace(not, set))); }
function v1552(pageIds, pageJson, currentPageId) { for (let i = 0; i < pageIds.length; i++) {
    i1547(e924(pageIds[i]), pageJson[i]);
} i1547('pageOrder', pageIds.join(',')); i1547('currentPageId', currentPageId); }
function q1553(nodeIds, nodeJson) { for (let i = 0; i < nodeIds.length; i++) {
    i1547(p922(nodeIds[i]), nodeJson[i]);
} }
function g2735() {
    return __awaiter(this, void 0, void 0, function* () { let keys = yield figma.clientStorage.keysAsync(); keys = keys.filter(k => k.length >= m876.length && k.substring(0, m876.length) == m876); g1526({ cmd: 'uiReturnGetAllLocalTemplateNames', templateNames: keys }); });
}
function u1554(t4032, template) { n1545(m876 + ' ' + t4032, template); }
function a1555(nodeIds) { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => l1055(k)); for (const key of connKeys) {
    const parts = y1058(key).split(' ');
    if (nodeIds.includes(parts[0]) || nodeIds.includes(parts[2]))
        i1548(key);
} }
function m1556(nodeIds) { a1555(nodeIds); const nodeKeys = figma.currentPage.getPluginDataKeys().filter(k => i1054(k) && nodeIds.includes(d1057(k))); nodeKeys.forEach(k => i1548(k)); }
function x1557() { const nodeKeys = figma.currentPage.getPluginDataKeys().filter(k => i1054(k)); const connKeys = figma.currentPage.getPluginDataKeys().filter(k => l1055(k)); for (const key of nodeKeys)
    i1548(key); for (const key of connKeys)
    i1548(key); }
function d1558(u4007) { c1559(u4007); a1560(u4007); }
function c1559(u4007) { figma.currentPage.getPluginDataKeys().filter(k => i1054(k)).forEach(k => c2101(k, u4007)); }
function a1560(u4007) { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => l1055(k)); connKeys.sort((key1, key2) => { const p1 = y1058(key1).split(' '); const p2 = y1058(key2).split(' '); if (p1[2] != p2[2])
    return p1[2] < p2[2] ? -1 : 1; if (p1[3] != p2[3])
    return parseInt(p1[3]) - parseInt(p2[3]); if (p1[2] == p2[0])
    return -1; if (p2[2] == p1[0])
    return 1; return 0; }); connKeys.forEach(k => b2104(JSON.parse(figma.currentPage.getPluginData(k)), u4007)); }
function o1561(u4007) { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => j1053(k)); connKeys.forEach(k => console.log('%c' + k, 'background: #fff; color: ' + (u4007 ? 'black' : 'white'))); const pageOrder = figma.currentPage.getPluginData('pageOrder'); console.log('%c' + pageOrder, 'background: #fff; color: ' + (u4007 ? 'black' : 'white')); }
function s1562(u4007) { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => j1053(k)); connKeys.forEach(k => console.log('%c' + figma.currentPage.getPluginData(k), 'background: #fff; color: ' + (u4007 ? 'black' : 'white'))); const pageOrder = figma.currentPage.getPluginData('pageOrder'); console.log('%c' + pageOrder, 'background: #fff; color: ' + (u4007 ? 'black' : 'white')); }
function h1563(u4007) { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => l1055(k)); connKeys.forEach(k => console.log('%c' + k, 'background: #dff; color: ' + (u4007 ? 'black' : 'white'))); }
function j1564(u4007) { figma.clientStorage.keysAsync().then(keys => keys.forEach(k => figma.clientStorage.getAsync(k).then(val => console.log(k + ': ' + val)))); }
function k1565(key, spec) {
    return __awaiter(this, void 0, void 0, function* () { let result = null; switch (key) {
        case 'getVariableData':
            result = yield j1601(spec);
            break;
        case 'getPaidStatus':
            result = figma.payments.status.type;
            break;
        case 'figSubscribe': {
            yield figma.payments.initiateCheckoutAsync({ interstitial: 'PAID_FEATURE' });
            result = figma.payments.status.type;
            break;
        }
    } g1526({ cmd: 'returnFigGetValue', value: result }); });
}
function x1566(varIds) { j1601(varIds).then(values => { g1526({ cmd: 'uiReturnFigGetVariableUpdates', values: values }); }); }
function o1567(pageId) { i1548(r934(pageId)); const pageOrder = y1546('pageOrder').split(','); v947(pageOrder, id => id == pageId); i1547('pageOrder', pageOrder.join(',')); }
function n1568() { const pageKeys = figma.currentPage.getPluginDataKeys().filter(k => j1053(k)); pageKeys.forEach(k => i1548(k)); i1548('pageOrder'); }
function q1569(key, json) { i1547(key, json); }
function p1570(_keys, _json) { const keys = JSON.parse(_keys); const json = JSON.parse(_json); for (let i = 0; i < keys.length; i++)
    i1547(keys[i], json[i]); }
function f1571(_curKeys, _newKeys, _json) { const curKeys = JSON.parse(_curKeys); const newKeys = JSON.parse(_newKeys); const json = JSON.parse(_json); for (let i = 0; i < curKeys.length; i++) {
    i1548(curKeys[i]);
    i1547(newKeys[i], json[i]);
} }
function a1572(key) { i1548(key); }
function l1573() { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => l1055(k)); connKeys.forEach(k => i1548(k)); }
function f1574(nodeId) { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => l1055(k)); for (const key of connKeys) {
    const parts = key.split(' ');
    if (parts[4] == nodeId)
        i1548(key);
} }
function j1575(nodeId) { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => l1055(k)); for (const key of connKeys) {
    const parts = key.split(' ');
    if (parts[1] == nodeId)
        i1548(key);
} }
function m1576() { figma.getLocalPaintStylesAsync().then(n1580 => { for (const style of n1580) {
    style.setPluginData('type', '');
    style.setPluginData('nodeId', '');
    style.setPluginData('existing', '');
} }); }
var b2736 = null;
var d4033 = () => b2736 = null;
var r2737 = 'normal';
function m1592(clientPosition) { g1526({ cmd: 'uiReturnFigGetMousePosition', position: { x: 0, y: 0 }, clientPosition: clientPosition, viewportZoom: figma.viewport.zoom, viewportRect: figma.viewport.bounds }); }
function v1593(x, y, width, height) { return; }
function n1594(dock, rect, bounds) { switch (dock) {
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
function a1595(width, height) { (function () {
    return __awaiter(this, void 0, void 0, function* () { width = Math.floor(Math.max(0, width)); height = Math.floor(Math.max(0, height)); figma.ui.resize(width, height); figma.currentPage.setPluginData(figma.currentUser.id + ',windowWidth', width.toString()); figma.currentPage.setPluginData(figma.currentUser.id + ',windowHeight', height.toString()); g1526({ cmd: 'uiReturnFigResizeWindow', width: width, height: height }); });
})(); }
function g2738(dock) {
    return __awaiter(this, void 0, void 0, function* () { if (dock != 'normal' && r2737 == 'normal') {
        figma.clientStorage.setAsync('normalWindowX', yield figma.clientStorage.getAsync('normalWindowX'));
        figma.clientStorage.setAsync('normalWindowY', yield figma.clientStorage.getAsync('normalWindowY'));
        figma.clientStorage.setAsync('normalWindowWidth', yield figma.clientStorage.getAsync('normalWindowWidth'));
        figma.clientStorage.setAsync('normalWindowHeight', yield figma.clientStorage.getAsync('normalWindowHeight'));
    } r2737 = dock; figma.clientStorage.setAsync('windowDock', dock); a1595(yield figma.clientStorage.getAsync('windowWidth'), yield figma.clientStorage.getAsync('windowHeight')); });
}
function c1596(msg) { p1597(msg.text, msg.prefix, msg.delay, msg.error, msg.z1598, msg.o1599); }
function p1597(text, prefix = 'Generator ', delay = 400, error = false, z1598 = '', o1599 = NULL) { const options = { timeout: delay, error: error, onDequeue: d4033 }; if (z1598 != '') {
    options['button'] = { text: z1598 };
    if (o1599.substring(0, 'removeConnection'.length) == 'removeConnection') {
        options['button']['action'] = () => a1572(o1599.split(',')[1]);
    }
    else {
        switch (o1599) {
            case 'hideClearUndoWarning':
                options['button']['action'] = () => g1526({ cmd: 'uiHideClearUndoWarning' });
                break;
        }
    }
} if (b2736)
    b2736.cancel(); b2736 = figma.notify(prefix + text, options); }
function m2739(key, params = null) {
    return __awaiter(this, void 0, void 0, function* () { return yield m2740(key, params); });
}
function m2740(key, params = null) {
    return __awaiter(this, void 0, void 0, function* () { return new Promise((resolve, reject) => { const timeout = 60000; g1526(Object.assign({ cmd: 'uiGetValueForFigma', key: key }, (params || {}))); const j2741 = setTimeout(() => reject(new Error('Timeout: Result not received by Figma within the specified time')), timeout); function i4034(msg) { msg = JSON.parse(msg); if (msg.cmd === 'returnUiGetValueForFigma') {
        clearTimeout(j2741);
        resolve({ key: msg.key, value: msg.value });
        figma.ui.off('message', i4034);
    } } figma.ui.on('message', i4034); }); });
}
var e2742 = [];
var b2743 = [];
var l2744 = 0;
var p2745 = 0;
function i1527(y111) { return (y111[h1389] === 2 ? '' : m872) + (u2799 ? y111[o1383] : y111[n1385]); }
function o1528(s1512, addObject = null) { if (!l1530(s1512))
    return null; let t1513; switch (s1512[n1381]) {
    case k1219:
        t1513 = j2713(s1512);
        break;
    case l1222:
        t1513 = l2792(s1512);
        break;
    case n1225:
        t1513 = u2788(s1512);
        break;
    case m1237:
        t1513 = p2709(s1512);
        break;
    case a1240:
        t1513 = a2716(s1512);
        break;
    case o1243:
        t1513 = i2719(s1512);
        break;
    case v1246:
        t1513 = n2695(s1512);
        break;
    case n1250:
        t1513 = b2747(s1512);
        break;
    case w1262:
        t1513 = l2748(s1512);
        break;
    case c1285:
        t1513 = a2749(s1512);
        break;
    case z1265:
        t1513 = m2750(s1512);
        break;
    case i1268:
        t1513 = d2751(s1512);
        break;
} if (addObject && t1513 != undefined && t1513 != null && !t1513.removed) {
    t1513.name = i1527(s1512);
    g954(s1512[n1381] == z1265 || !!t1513, 'no Figma object created');
    if (t1513 != undefined && t1513 != null) {
        t1513.setPluginData('retain', s1512[h1389].toString());
        if (s1512[h1389] < 2) {
            t1513.setPluginData('userId', figma.currentUser.id);
            t1513.setPluginData('sessionId', figma.currentUser.sessionId.toString());
            t1513.setPluginData('type', s1512[n1381]);
            t1513.setPluginData('nodeId', s1512[l1382]);
            t1513.setPluginData('objectId', s1512[o1383]);
            t1513.setPluginData('isCenter', d939(s1512[l1404]));
            if (s1512[n1381] == v1246)
                q2765.push(t1513);
            if (s1512[y1403])
                i1543(t1513);
        }
        addObject(t1513);
    }
} if (!s1512.counted) {
    p2745++;
    s1512.counted = true;
} return t1513; }
function d1529(t1513, s1512) {
    return __awaiter(this, void 0, void 0, function* () { if (!l1530(s1512) || t1513 == undefined || t1513 == null || t1513.removed)
        return; t1513.name = i1527(s1512); t1513.setPluginData('retain', s1512[h1389].toString()); switch (s1512[n1381]) {
        case k1219:
            r2714(t1513, s1512);
            break;
        case l1222:
            d2793(t1513, s1512);
            break;
        case n1225:
            d2789(t1513, s1512);
            break;
        case m1237:
            x2710(t1513, s1512);
            break;
        case a1240:
            f2717(t1513, s1512);
            break;
        case o1243:
            k2720(t1513, s1512);
            break;
        case v1246:
            k2752(t1513, s1512);
            break;
        case n1250:
            r2753(t1513, s1512);
            break;
        case w1262:
            j2754(t1513, s1512);
            break;
        case c1285:
            z2755(t1513, s1512);
            break;
        case z1265:
            j2756(t1513, s1512);
            break;
        case i1268:
            w2757(t1513, s1512);
            break;
    } if (t1513 != undefined && t1513 != null && !t1513.removed) {
        if (t1513.parent == figma.currentPage)
            yield figma.currentPage.loadAsync();
        t1513.parent.appendChild(t1513);
        if (s1512[y1403])
            i1543(t1513);
    } if (!s1512.counted) {
        p2745++;
        s1512.counted = true;
    } });
}
function b2732(f2758, c2759, f2760, h2049 = -1, nodeIds = [], e2761 = false, p2762 = false, s270 = false) {
    return __awaiter(this, void 0, void 0, function* () { let y2763 = NULL; let k2764 = null; let abort = false; const y3642 = []; let y2746 = 0; e2742.push(...nodeIds); if (h2049 > -1)
        l2744 = h2049; for (const s1512 of c2759) {
        b2743.push(s1512);
        if (s1512[l1382] != y2763) {
            y2763 = s1512[l1382];
            k2764 = k2729.find(a => a.nodeId == s1512[l1382]);
            if (!k2764) {
                k2729.push(k2764 = { nodeId: s1512[l1382], objects: [] });
            }
        }
        const addObject = t1513 => { if (f2758 != undefined && f2758 != null && !f2758.removed)
            f2758.appendChild(t1513);
        else
            k2764.objects.push(t1513); };
        let objects = f2758 != undefined && f2758 != null && !f2758.removed ? f2758.children : k2764.objects;
        let t1513 = objects.find(o => o.removed || o.getPluginData('userId') == figma.currentUser.id && o.getPluginData('objectId') == s1512[o1383]);
        if (t1513 != undefined && t1513 != null && t1513.removed) {
            m940(objects, t1513);
            if (q2765.includes(t1513))
                z945(q2765, t1513);
            if (p2781.includes(t1513))
                z945(p2781, t1513);
        }
        if (t1513 == undefined || t1513 == null || t1513.removed) {
            const newObj = o1528(s1512, addObject);
            y3642.push(newObj);
        }
        else if (t1513 != undefined && t1513 != null && !t1513.removed && t1513.getPluginData('type') == s1512[n1381].toString()) {
            yield d1529(t1513, s1512);
            if (t1513 != undefined && t1513 != null && !t1513.removed)
                y3642.push(t1513);
        }
        else {
            t1513.remove();
            if (q2765.includes(t1513))
                z945(q2765, t1513);
            if (p2781.includes(t1513))
                z945(p2781, t1513);
            o1528(s1512, addObject);
        }
        y2746++;
        if (y2746 >= f2760) {
            const result = yield m2739('returnObjectUpdate', { l2744: l2744, p2745: p2745 });
            abort = result.value;
            y2746 = 0;
            if (abort)
                break;
        }
    } if (f2758 != undefined && f2758 != null && !f2758.removed) {
        for (const t1513 of f2758.children) {
            if (t1513 != undefined && t1513 != null && t1513.removed || !c2759.find(o => o[o1383] == t1513.getPluginData('objectId') && t1513.getPluginData('userId') == figma.currentUser.id))
                t1513.remove();
        }
    } for (const point of q2765) {
        if (point.parent == figma.currentPage)
            yield figma.currentPage.loadAsync();
        if (point != undefined && point != null && !point.removed && !point.parent.removed)
            point.parent.appendChild(point);
    } if (p2762 && !abort) {
        u1509(e2742, b2743);
        e2742 = [];
        b2743 = [];
        if (s270 && y3642.length > 0) {
            figma.viewport.scrollAndZoomIntoView(y3642);
            const bounds = d1533(y3642);
            figma.viewport.zoom = Math.min(figma.viewport.bounds.width * figma.viewport.zoom / bounds.width - 0.05, figma.viewport.bounds.height * figma.viewport.zoom / bounds.height - 0.05);
        }
    } yield m2739('returnObjectUpdate', { l2744: l2744, p2745: p2745 }); });
}
function l1530(s1512) { switch (s1512[n1381]) {
    case k1219: return g2712(s1512);
    case l1222: return v2774(s1512);
    case n1225: return a2775(s1512);
    case m1237: return v4030(s1512);
    case a1240: return g2715(s1512);
    case o1243: return f2718(s1512);
    case v1246: return k4029(s1512);
    case n1250: return e2776(s1512);
    case w1262: return f2777(s1512);
    case c1285: return l2778(s1512);
    case z1265: return o2779(s1512);
    case i1268: return q2780(s1512);
} }
function q1531(s1512) { (() => __awaiter(this, void 0, void 0, function* () { const t1513 = o1528(s1512); const width = t1513.width; const height = t1513.height; t1513.remove(); g1526({ cmd: 'uiForwardToGenerator', msg: { cmd: 'returnFigGetObjectSize', objectId: s1512[o1383], width: width, height: height } }); }))(); }
function l1532(t1513) { t1513.setPluginData('type', ''); t1513.setPluginData('nodeId', ''); t1513.setPluginData('userId', ''); t1513.setPluginData('sessionId', ''); t1513.setPluginData('objectId', ''); t1513.setPluginData('isCenter', ''); t1513.setPluginData('retain', ''); }
function d1533(objects) { const bounds = { left: 0, top: 0, right: 0, bottom: 0 }; for (const y111 of objects) {
    if (y111.x < bounds.left || bounds.left == bounds.right)
        bounds.left = y111.x;
    if (y111.y < bounds.top || bounds.top == bounds.bottom)
        bounds.top = y111.y;
    if (y111.x + y111.width > bounds.right || bounds.left == bounds.right)
        bounds.right = y111.x + y111.width;
    if (y111.y + y111.height > bounds.bottom || bounds.top == bounds.bottom)
        bounds.bottom = y111.y + y111.height;
} return { x: bounds.left, y: bounds.top, width: bounds.right - bounds.left, height: bounds.bottom - bounds.top }; }
const p2781 = [];
const m2782 = [];
function g1534(f1535, a1536) { const effects = []; for (const effect of f1535) {
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
                if (a1536 && !isNaN(spread))
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
function t2702(t1513, s1512, phantom = true) { n1539(t1513, s1512); k2703(t1513, s1512, phantom); r2704(t1513, s1512); t1513.opacity = s1512[n1405]; t1513.blendMode = s1512[t1406]; const maskType = s1512[m1407]; t1513.isMask = maskType > 0; if (t1513.isMask) {
    switch (maskType) {
        case 1:
            t1513.maskType = 'ALPHA';
            break;
        case 2:
            t1513.maskType = 'VECTOR';
            break;
        case 3:
            t1513.maskType = 'LUMINANCE';
            break;
    }
} if (t1513.isMask && t1513.fills.length == 0 && t1513.strokes.length == 0)
    t1513.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 }, opacity: 1, blendMode: 'NORMAL' }]; }
function r2704(t1513, s1512) { if (!!s1512[g1394] && !isEmpty(s1512[g1394])) {
    t1513.fills = d958(s1512[g1394]);
    if (p2781.includes(t1513))
        z945(p2781, t1513);
}
else
    t1513.fills = []; }
function k2703(t1513, s1512, phantom = true) { if (s1512[m1395] != null && !isEmpty(s1512[m1395])) {
    x1538(t1513, d958(s1512[m1395]), s1512[a1396], s1512[s1397], s1512[s1398], s1512[s1399], s1512[n1400], v2705(s1512[w1401]));
    if (s1512[y1403])
        t1513.setPluginData('dashes', s1512[w1401]);
    if (p2781.includes(t1513))
        z945(p2781, t1513);
    if (s1512[y1403])
        l951(m2782, t1513);
}
else if (isEmpty(s1512[g1394]) && isEmpty(s1512[m1395]) && !s1512[m1407] && phantom) {
    u1541(t1513);
    l951(p2781, t1513);
}
else
    t1513.strokes = []; }
function v2705(p1537) { p1537 = p1537; p1537 = v956(p1537, ','); p1537 = h957(p1537, ','); p1537 = p1537.trim(); return p1537 == '' ? [] : p1537.split(',').map(s => Math.max(0, parseFloat(s))); }
function c2706(p1537) { p1537 = p1537; p1537 = v956(p1537, ','); p1537 = h957(p1537, ','); p1537 = p1537.trim(); return p1537 == '' ? [] : p1537.split(',').map(s => Math.max(0, parseFloat(s) / j2708)); }
function x1538(t1513, fills, weight, align, join, miterLimit, cap, dashes = []) { t1513.strokes = fills; t1513.strokeWeight = Math.max(0, weight); t1513.strokeAlign = align; t1513.strokeJoin = join; const miterAngle = miterLimit / 360 * Tau; const a2783 = 1 / Math.sin(miterAngle / 2); t1513.strokeMiterLimit = Math.min(Math.max(0, a2783), 16); t1513.strokeCap = cap; t1513.dashPattern = dashes; }
function n1539(t1513, s1512) { if (!!s1512[b1402] && !isEmpty(s1512[b1402])) {
    const a1536 = s1512[n1381] == k1219 || s1512[n1381] == n1225 || s1512[n1381] == i1268;
    t1513.effects = g1534(s1512[b1402], a1536);
}
else
    t1513.effects = []; }
function p1540() { for (const y111 of p2781) {
    if (y111.removed)
        z945(p2781, y111);
    else
        u1541(y111);
} }
function u1541(y111) { const back = figma.currentPage.backgrounds.find(b => b.type == 'SOLID'); let phantomColor; if (back) {
    const l = back.color.r * 0.2126 + back.color.g * 0.7152 + back.color.b * 0.0722;
    phantomColor = l > 0.5 ? { r: 0, g: 0, b: 0 } : { r: 1, g: 1, b: 1 };
}
else
    phantomColor = { r: 1, g: 0, b: 1 }; x1538(y111, [{ type: 'SOLID', color: phantomColor, opacity: 0.5 }], 1 / j2708, 'CENTER', 'MITER', 1, 'NONE', [1 / j2708, 2 / j2708]); }
function w1542() { for (const t1513 of m2782) {
    if (t1513.removed)
        z945(m2782, t1513);
    else
        i1543(t1513);
} }
function i1543(t1513) { t1513.strokeWeight = Math.max(0, 1.5 / j2708); if (c925(t1513.getPluginData('isCenter'))) {
    const path = t1513.vectorPaths[0];
    const parts = path.data.split(' ');
    let t = { x: parseFloat(parts[1]), y: parseFloat(parts[2]) };
    let c = { x: parseFloat(parts[4]), y: parseFloat(parts[5]) };
    let r = { x: parseFloat(parts[7]), y: parseFloat(parts[8]) };
    const a = 2;
    const b = 0.05;
    const f = 1 - Math.pow(1 - Math.min(j2708, 1), a) / Math.pow(a, b);
    t = c897(c, o899(f884(e902(t, c)), objectCenterSize / f));
    r = c897(c, o899(f884(e902(r, c)), objectCenterSize / f));
    parts[1] = t.x;
    parts[2] = t.y;
    parts[4] = c.x;
    parts[5] = c.y;
    parts[7] = r.x;
    parts[8] = r.y;
    const x2784 = { windingRule: path.windingRule, data: parts.join(' ') };
    t1513.vectorPaths = [x2784];
} const dashes = t1513.getPluginData('dashes'); if (dashes != '')
    t1513.dashPattern = c2706(dashes); }
function a1577(nodeId, px, py) { figma.getLocalPaintStylesAsync().then(_styles => { const styles = new Array(); for (const d168 of _styles) {
    const _nodeId = d168.getPluginData('nodeId');
    const _existing = d168.getPluginData('existing');
    const existing = !!_existing;
    const style = { id: d168.id, nodeId: _nodeId, name: d168.name, existing: existing, paints: new Array() };
    let onlyPaint = true;
    for (const w2786 of d168.paints) {
        if (w2786.type == 'SOLID') {
            style.paints.push([w2786.color.r, w2786.color.g, w2786.color.b, w2786.opacity]);
        }
        else {
            onlyPaint = false;
            break;
        }
    }
    if (onlyPaint)
        styles.push(style);
} g1526({ cmd: 'uiReturnFigGetAllLocalColorStyles', nodeId: nodeId, px: px, py: py, styles: JSON.stringify(styles) }); }); }
function p1578(nodeId, styleId) { figma.getLocalPaintStylesAsync().then(n1580 => { if (styleId != NULL)
    c1579(n1580, nodeId, styleId);
else
    x1581(n1580, nodeId); }); }
function c1579(n1580, nodeId, styleId, clearExisting = true) { const a2785 = g2731.find(a => a.nodeId == nodeId); if (a2785 && clearExisting)
    x1581(n1580, nodeId); const v1585 = n1580.find(s => s.id == styleId); g954(!!v1585, 'figStyle should be found here'); v1585.setPluginData('type', t1216); v1585.setPluginData('nodeId', nodeId); v1585.setPluginData('existing', d939(true)); g2731.push({ nodeId: nodeId, existing: true, styles: [v1585] }); return v1585; }
function x1581(n1580, nodeId) { const v1585 = n1580.find(s => s.getPluginData('nodeId') == nodeId); g954(!!v1585, 'figStyle should be found here'); if (v1585) {
    v1585.setPluginData('type', NULL);
    v1585.setPluginData('nodeId', NULL);
    v1585.setPluginData('existing', NULL);
    v947(g2731, a => a.nodeId == nodeId);
} return v1585; }
function z1582(styles, u1586) { const v1585 = figma.createPaintStyle(); v1585.setPluginData('type', u1586[n1381]); v1585.setPluginData('nodeId', u1586[l1382]); v1585.name = u1586[k1386]; setStylePaints(v1585, u1586); styles.push(v1585); g1526({ cmd: 'uiSetStyleId', nodeId: u1586[l1382], styleId: v1585.id }); return v1585; }
function c1583(msg) { let y2763 = NULL; let a2785; for (const u1586 of msg.styles) {
    if (u1586[l1382] != y2763) {
        y2763 = u1586[l1382];
        a2785 = g2731.find(a => a.nodeId == u1586[l1382]);
        if (!a2785) {
            a2785 = { nodeId: u1586[l1382], styles: [] };
            g2731.push(a2785);
        }
    }
    else
        a2785 = null;
    const v1585 = a2785.styles[0];
    figma.getLocalPaintStylesAsync().then(n1580 => { const localStyle = n1580.find(s => s.getPluginData('nodeId') == u1586[l1382]); if (isValid(v1585) && !isValid(localStyle)) {
        m940(a2785.styles, v1585);
    } const existing = isValid(v1585) && isValid(localStyle) && v1585.getPluginData('existing'); if (!isValid(v1585) || !isValid(localStyle)) {
        if (!existing) {
            v1516 = true;
            p1578(u1586[l1382], u1586[s1384]);
        }
    }
    else if (isValid(v1585) && v1585.getPluginData('type') == u1586[n1381]) {
        v1516 = true;
        i1584(localStyle, u1586);
    } });
} }
function i1584(v1585, u1586) { setStylePaints(v1585, u1586); v1585.name = u1586[k1386]; }
function getStylePaints(stylePaints) { const paints = new Array(); for (const w2786 of stylePaints) {
    const fill = w2786[1].split(' ');
    switch (w2786[0]) {
        case 'SOLID':
            paints.push({ type: 'SOLID', color: { r: Math.min(Math.max(0, parseFloat(fill[0]) / 0xff), 1), g: Math.min(Math.max(0, parseFloat(fill[1]) / 0xff), 1), b: Math.min(Math.max(0, parseFloat(fill[2]) / 0xff), 1) }, opacity: Math.min(Math.max(0, parseFloat(fill[3]) / 100), 1) });
            break;
    }
} return paints; }
function setStylePaints(v1585, u1586) { if (!isEmpty(u1586[v1388]))
    v1585.paints = getStylePaints(u1586[v1388]);
else
    v1585.paints = []; }
function p1600(nodeId, px, py) {
    return __awaiter(this, void 0, void 0, function* () { figma.variables.getLocalVariablesAsync().then((k2787) => __awaiter(this, void 0, void 0, function* () { const variables = new Array(); for (const _var of k2787) {
        const collection = yield figma.variables.getVariableCollectionByIdAsync(_var.variableCollectionId);
        const variable = { id: _var.id, resolvedType: _var.resolvedType, name: _var.name, collectionName: collection.name };
        variables.push(variable);
    } figma.variables.getLocalVariableCollectionsAsync().then((collections) => __awaiter(this, void 0, void 0, function* () { g1526({ cmd: 'uiReturnFigGetAllLocalVariables', nodeId: nodeId, px: px, py: py, variables: JSON.stringify(variables), nCollections: collections.length }); })); })); });
}
function j1601(varIds) {
    return __awaiter(this, void 0, void 0, function* () { const k2787 = yield figma.variables.getLocalVariablesAsync(); const variables = varIds.map(id => k2787.find(v => v.id == id)); let values = []; for (let i = 0; i < varIds.length; i++) {
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
function v1602(nodeId, varId) { figma.variables.getLocalVariablesAsync().then(k2787 => { figLinkVariableAsync(k2787, nodeId, varId); }); }
function figUpdateVariableAsync(varId, value) {
    return __awaiter(this, void 0, void 0, function* () { figma.variables.getLocalVariablesAsync().then((k2787) => __awaiter(this, void 0, void 0, function* () { let variable = k2787.find(v => v.id == varId); if (!variable)
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
function figLinkVariableAsync(k2787, nodeId, varId) {
    return __awaiter(this, void 0, void 0, function* () { let variable = k2787.find(v => v.id == varId); if (!variable)
        return null; const [resolvedVar, values] = yield figGetResolvedVariableValuesAsync(variable); g1526({ cmd: 'uiReturnFigLinkNodeToVariable', nodeId: nodeId, variableId: resolvedVar ? resolvedVar.id : NULL, variableName: resolvedVar ? resolvedVar.name : '', resolvedType: resolvedVar ? resolvedVar.resolvedType : NULL, values: values }); return resolvedVar; });
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
function v1587(tl, tr, bl) { let vr = point(tr.x - tl.x, tr.y - tl.y); let vb = point(bl.x - tl.x, bl.y - tl.y); let sx = vr.x; let sy = vb.y; let kx = -vr.y; let ky = -vb.x; let dx = -tl.x; let dy = -tl.y; const _sx = kx / nozero(sx); const _sy = ky / nozero(sy); let t4211 = u887([[1, _sy, 0], [_sx, 1, 0], [0, 0, 1]], i891(dx, dy)); t4211 = z889(t4211); const a = j881(vr); if (a > Tau / 4 && a < Tau * 3 / 4)
    t4211 = u887(t4211, i891(0, 0, 1, 1, Tau / 2)); if (determinant(t4211) < 0)
    t4211 = u887(t4211, i891(0, 0, -1, 1, 0)); return t4211; }
function j1588(t1513, tl, tr, bl) { const t4211 = v1587(tl, tr, bl); t1513.relativeTransform = [t4211[0], t4211[1]]; }
function g1589(t1513, s1512, setSize = true, noHeight = 0.01) { if (!s1512[c1390] || !s1512[w1391] || !s1512[x1392])
    return; const xp0 = s1512[c1390]; const xp1 = s1512[w1391]; const xp2 = s1512[x1392]; j1588(t1513, xp0, xp1, xp2); if (setSize) {
    const o892 = distv(xp0, xp1);
    const g893 = distv(xp0, xp2);
    const height = s1512[n1381] == o1243 ? s1512[m1425] : s1512[m1412];
    if (!t1513.removed) {
        t1513.resizeWithoutConstraints(Math.max(0.01, o892), height ? Math.max(0.01, g893) : noHeight);
    }
} }
function t1590(i2700, q2701) { if (i2700.removed)
    return; i2700.resizeWithoutConstraints(0.01, 0.01); i2700.setPluginData('actualX', q2701[g1408].toString()); i2700.setPluginData('actualY', q2701[d1410].toString()); i2700.x = q2701[g1408]; i2700.y = q2701[d1410]; i2700.rotation = q2701[l1404] ? 45 : 0; }
function d1591(i2700) { if (!i2700.removed)
    i2700.resizeWithoutConstraints(0.01, 0.01); }
function l2778(genBool) { return genBool.children.length > 0; }
function a2749(genBool) { let objects = []; for (const y111 of genBool.children)
    o1528(y111, o => objects = [...objects, o]); let figBool = null; if (!isEmpty(objects)) {
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
    g1589(figBool, genBool);
    if (!l2778(genBool))
        return figBool;
} return figBool; }
function z2755(figBool, genBool, isValid = false) { if (!isValid && !l2778(genBool)) {
    figBool.remove();
    return;
} g1589(figBool, genBool); b2732(figBool, genBool.children, genBool.children.length); }
function a2775(b2766) { return b2766[g1408] != null && !isNaN(b2766[g1408]) && b2766[d1410] != null && !isNaN(b2766[d1410]) && b2766[c1411] != null && !isNaN(b2766[c1411]) && b2766[m1412] != null && !isNaN(b2766[m1412]) && b2766[r1414] != null && !isNaN(b2766[r1414]) && b2766[c1421] != null && !isNaN(b2766[c1421]) && b2766[p1427] != null && !isNaN(b2766[p1427]) && b2766[y1431] != null && !isNaN(b2766[y1431]); }
function u2788(b2766) { if (!a2775(b2766))
    return null; const c2767 = figma.createEllipse(); d2789(c2767, b2766, true); return c2767; }
function d2789(c2767, b2766, isValid = false) { if (!isValid && !a2775(b2766))
    return; w2790(c2767, b2766); if (q2765.includes(c2767))
    p2697(c2767);
else
    t2702(c2767, b2766); }
function w2790(c2767, b2766) { c2767.cornerRadius = b2766[r1414]; const start = b2766[c1421] / 360 * (Math.PI * 2); const sweep = b2766[p1427] / 100 * (Math.PI * 2); c2767.arcData = { startingAngle: start, endingAngle: start + sweep, innerRadius: Math.min(Math.max(0, b2766[y1431] / 100), 1) }; g1589(c2767, b2766); }
function q2780(g2768) { return g2768[g1408] != null && !isNaN(g2768[g1408]) && g2768[d1410] != null && !isNaN(g2768[d1410]) && g2768[c1411] != null && !isNaN(g2768[c1411]) && g2768[m1412] != null && !isNaN(g2768[m1412]) && g2768[x1420] != null && !isNaN(g2768[x1420]); }
function d2751(g2768) { if (!q2780(g2768))
    return null; const k2769 = figma.createFrame(); if (k2769) {
    f2791(k2769, g2768);
    let objects = [];
    for (const y111 of g2768[l1426])
        o1528(y111, o => objects = [...objects, o]);
    for (const y111 of objects)
        k2769.appendChild(y111);
} return k2769; }
function w2757(k2769, g2768) { f2791(k2769, g2768); b2732(k2769, g2768[l1426], g2768[l1426].length); }
function f2791(k2769, g2768) { k2769.cornerRadius = g2768[x1420]; g1589(k2769, g2768); t2702(k2769, g2768, g2768[l1426].length == 0); }
function o2779(e2770) { return true; }
function m2750(e2770) { let objects = []; for (const y111 of e2770[d1409])
    o1528(y111, o => objects = [...objects, o]); const j2771 = !isEmpty(objects) ? figma.group(objects, figma.currentPage) : null; if (j2771)
    j2756(j2771, e2770); return j2771; }
function j2756(j2771, e2770) { if (e2770[d1409].length == 0) {
    j2771.remove();
    return;
} b2732(j2771, e2770[d1409], e2770[d1409].length); n1539(j2771, e2770); }
function v2774(z2772) { return z2772[g1408] != null && !isNaN(z2772[g1408]) && z2772[d1410] != null && !isNaN(z2772[d1410]) && z2772[c1411] != null && !isNaN(z2772[c1411]); }
function l2792(z2772) { if (!v2774(z2772))
    return null; const s2773 = figma.createLine(); d2793(s2773, z2772, true); return s2773; }
function d2793(s2773, z2772, isValid = false) { if (!isValid && !v2774(z2772))
    return; g1589(s2773, z2772, true, 0); t2702(s2773, z2772); }
var q2765 = [];
function k4029(q2701) { return q2701[g1408] != null && !isNaN(q2701[g1408]) && q2701[d1410] != null && !isNaN(q2701[d1410]); }
function n2695(q2701) { const i2700 = q2701[l1404] ? figma.createRectangle() : figma.createEllipse(); if (!k4029(q2701))
    return i2700; if (q2765.includes(i2700))
    t2699(i2700, q2701);
else
    k2752(i2700, q2701); return i2700; }
function k2752(i2700, q2701) { t1590(i2700, q2701); z2698(i2700); }
function j2696() { g1526({ cmd: 'uiUpdateZoom', zoom: figma.viewport.zoom }); for (const point of q2765)
    p2697(point); }
function p2697(i2700) { d1591(i2700); z2698(i2700); }
function t2699(i2700, q2701) { t1590(i2700, q2701); z2698(i2700); }
function z2698(i2700) { if (i2700.removed)
    return; const l3740 = c925(i2700.getPluginData('isCenter')); const p2707 = figma.currentPage.selection.includes(i2700); const color = l3740 ? [0xf2, 0x48, 0x22] : p2707 ? [12, 140, 233] : [255, 255, 255]; const border = l3740 ? [255, 255, 255] : p2707 ? [255, 255, 255] : [12, 140, 233]; i2700.fills = d958([['SOLID', color[0], color[1], color[2], 100]]); const effects = []; effects.push(...g1534([['DROP_SHADOW', border[0] / 255, border[1] / 255, border[2] / 255, 1, 0, 0, 0, (l3740 ? 3 : p2707 ? 5 : 3.6) / j2708, 'NORMAL', true, true]], true)); effects.push(...g1534([['DROP_SHADOW', color[0] / 255, color[1] / 255, color[2] / 255, 1, 0, 0, 0, (p2707 ? 4 : 2.4) / j2708, 'NORMAL', true, true]], true)); i2700.effects = effects; }
function v4030(genPoly) { return genPoly[g1408] != null && !isNaN(genPoly[g1408]) && genPoly[d1410] != null && !isNaN(genPoly[d1410]) && genPoly[c1411] != null && !isNaN(genPoly[c1411]) && genPoly[m1412] != null && !isNaN(genPoly[m1412]) && genPoly[q1417] != null && !isNaN(genPoly[q1417]) && genPoly[g1423] != null && !isNaN(genPoly[g1423]); }
function p2709(genPoly) { if (!v4030(genPoly))
    return null; const figPoly = figma.createPolygon(); x2710(figPoly, genPoly, true); return figPoly; }
function x2710(figPoly, genPoly, isValid = false) { if (!isValid && !v4030(genPoly))
    return; figPoly.cornerRadius = genPoly[q1417]; figPoly.pointCount = Math.max(3, genPoly[g1423]); g1589(figPoly, genPoly); t2702(figPoly, genPoly); }
function g2712(d2711) { return d2711[g1408] != null && !isNaN(d2711[g1408]) && d2711[d1410] != null && !isNaN(d2711[d1410]) && d2711[c1411] != null && !isNaN(d2711[c1411]) && d2711[m1412] != null && !isNaN(d2711[m1412]) && d2711[y1413] != null && !isNaN(d2711[y1413]); }
function j2713(d2711) { if (!g2712(d2711))
    return null; const figRect = figma.createRectangle(); r2714(figRect, d2711, true); return figRect; }
function r2714(figRect, d2711, isValid = false) { if (!isValid && !g2712(d2711))
    return; const found = d2711[b1402].findIndex(e => e[0] == 'ROUND_CORNERS'); if (found > -1) {
    const corners = d2711[b1402][found];
    figRect.topLeftRadius = corners[1];
    figRect.topRightRadius = corners[2];
    figRect.bottomLeftRadius = corners[3];
    figRect.bottomRightRadius = corners[4];
}
else
    figRect.cornerRadius = d2711[y1413]; g1589(figRect, d2711); t2702(figRect, d2711); }
function g2715(p2725) { return p2725[g1408] != null && !isNaN(p2725[g1408]) && p2725[d1410] != null && !isNaN(p2725[d1410]) && p2725[c1411] != null && !isNaN(p2725[c1411]) && p2725[m1412] != null && !isNaN(p2725[m1412]) && p2725[v1418] != null && !isNaN(p2725[v1418]) && p2725[p1424] != null && !isNaN(p2725[p1424]) && p2725[l1429] != null && !isNaN(p2725[l1429]); }
function a2716(p2725) { if (!g2715(p2725))
    return null; const q2726 = figma.createStar(); f2717(q2726, p2725, true); return q2726; }
function f2717(q2726, p2725, isValid = false) { if (!isValid && !g2715(p2725))
    return; q2726.cornerRadius = p2725[v1418]; q2726.pointCount = p2725[p1424]; q2726.innerRadius = Math.min(Math.max(0, p2725[l1429] / 100), 1); g1589(q2726, p2725); t2702(q2726, p2725); }
const k4272 = [];
function f2718(g2722) { return g2722[w1430] != null && g2722[g1408] != null && !isNaN(g2722[g1408]) && g2722[d1410] != null && !isNaN(g2722[d1410]) && g2722[c1411] != null && !isNaN(g2722[c1411]) && g2722[m1412] != null && !isNaN(g2722[m1412]) && g2722[m1432] != null && g2722[m1432] != NULL && g2722[y1433] != null && !isNaN(g2722[y1433]); }
function i2719(g2722) { if (!f2718(g2722))
    return null; const h2794 = figma.createText(); k2720(h2794, g2722, true); return h2794; }
function k2720(h2794, g2722, isValid = false) { if (!isValid && !f2718(g2722))
    return null; const fontName = { family: g2722[m1432], style: g2722[k1434] }; try {
    if (!k4272.includes(fontName)) {
        figma.loadFontAsync(fontName).then(() => { k4272.push(fontName); i2721(h2794, g2722, fontName); });
    }
    else {
        i2721(h2794, g2722, fontName);
    }
}
catch (e) {
    g955(e);
} }
function i2721(h2794, g2722, fontName) { h2794.fontName = fontName; h2794.fontSize = Math.max(1, g2722[y1433]); h2794.characters = g2722[w1430]; h2794.lineHeight = { unit: 'PERCENT', value: g2722[m1437] }; h2794.letterSpacing = { unit: 'PERCENT', value: g2722[d1438] }; if (g2722[e1435] == 0)
    h2794.textAlignHorizontal = 'LEFT';
else if (g2722[e1435] == 1)
    h2794.textAlignHorizontal = 'CENTER';
else if (g2722[e1435] == 2)
    h2794.textAlignHorizontal = 'RIGHT';
else if (g2722[e1435] == 3)
    h2794.textAlignHorizontal = 'JUSTIFIED'; if (g2722[m1436] == 0)
    h2794.textAlignVertical = 'TOP';
else if (g2722[m1436] == 1)
    h2794.textAlignVertical = 'CENTER';
else if (g2722[m1436] == 2)
    h2794.textAlignVertical = 'BOTTOM'; g1589(h2794, g2722); t2702(h2794, g2722); if (g2722[n1419] == 0 && g2722[m1425] == 0)
    h2794.textAutoResize = 'WIDTH_AND_HEIGHT';
else if (g2722[n1419] == 0)
    h2794.textAutoResize = 'HEIGHT';
else
    h2794.textAutoResize = 'NONE'; }
function f2777(x2727) { return true; }
function l2748(x2727) { if (!f2777(x2727))
    return null; const a2728 = figma.createVector(); j2754(a2728, x2727, true); return a2728; }
function j2754(a2728, x2727, isValid = false) { if (!isValid && !f2777(x2727))
    return; a2728.setVectorNetworkAsync(x2727[p1415]); g1589(a2728, x2727, false); t2702(a2728, x2727); }
function e2776(w2723) { return w2723[p1422] != null && !isNaN(w2723[p1422]) && w2723[c1428] != null && !isNaN(w2723[c1428]); }
function b2747(w2723) { const e2724 = figma.createVector(); r2753(e2724, w2723, true); return e2724; }
function r2753(e2724, w2723, isValid = false) { if (!isValid && !e2776(w2723))
    return; e2724.vectorPaths = [{ windingRule: w2723[p1422] == 1 ? 'NONZERO' : 'EVENODD', data: w2723[v1416] }]; e2724.cornerRadius = w2723[c1428]; g1589(e2724, w2723, false); t2702(e2724, w2723); }
