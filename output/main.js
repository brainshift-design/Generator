var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function n1051(key, tag) { return key.substring(0, tag.length + 1) == tag + ' '; }
function b1052(key, tag) { return key.substring(tag.length + 1); }
function z1053(key) { return n1051(key, q875); }
function q1054(key) { return n1051(key, e873); }
function q1055(key) { return n1051(key, y874); }
function p1056(key) { return b1052(key, q875); }
function d1057(key) { return b1052(key, e873); }
function t1058(key) { return b1052(key, y874); }
const generatorVersion = 388;
const f867 = 2147483647;
const NULL = '';
const p868 = '  ';
const i869 = '    ';
const b870 = '\n';
const o871 = '◦ G •';
const j872 = o871 + ' ';
const e873 = 'G_NODE';
const y874 = 'G_CONN';
const q875 = 'G_PAGE';
const z876 = 'G_TEMP';
const minWindowWidth = 602;
const minWindowHeight = 39;
const identity = Object.freeze([[1, 0, 0], [0, 1, 0], [0, 0, 1]]);
const Epsilon = 0.0000001;
const Tau = Math.PI * 2;
var o2540 = false;
function d877(x, eps = 0.000000001) { return Math.abs(x) < eps ? 0 : x; }
function nozero(x, eps = 0.000000001) { return x != 0 ? x : (x < 0 ? -eps : eps); }
function d878(v, eps = 0.000000001) { return point(nozero(v.x, eps), nozero(v.y, eps)); }
function equal(a, b, eps = 0.000000001) { return Math.abs(b - a) < eps; }
function sqr(x) { return x * x; }
;
function cube(x) { return x * x * x; }
;
function x879(f) { return Math.floor(f) | 0; }
function q880(x) { x = x879(x); x--; x |= x >> 1; x |= x >> 2; x |= x >> 4; x |= x >> 8; x |= x >> 16; x |= x >> 32; return ++x; }
function gcd(a, b) { let temp; while (1) {
    temp = a % b;
    if (temp == 0)
        return b;
    a = b;
    b = temp;
} }
function distv(p1, p2) { const dx = p2.x - p1.x; const dy = p2.y - p1.y; return Math.sqrt(dx * dx + dy * dy); }
function m881(v) { let angle = Math.atan2(v.y, v.x); if (angle < 0)
    angle += Tau; return angle; }
function anglev2(v1, v2) { return anglev2_(v1.x, v1.y, v2.x, v2.y); }
function anglev2_(x1, y1, x2, y2) { const dx = x2 - x1; const dy = y2 - y1; let angle = Math.atan2(dy, dx); if (angle < 0)
    angle += Tau; return angle; }
function d883(v) { return Math.sqrt(v.x * v.x + v.y * v.y); }
function lengthv_(x, y) { return Math.sqrt(x * x + y * y); }
function u884(v) { return point(v.x == 0 ? 0 : v.x / d883(v), v.y == 0 ? 0 : v.y / d883(v)); }
function dotv(v1, v2) { return v1.x * v2.x + v1.y * v2.y; }
function f885(a1, a2) { let diff = a2 - a1; while (diff <= -Tau / 2)
    diff += Tau; while (diff > Tau / 2)
    diff -= Tau; return diff; }
function t886(v, m) { let v3 = [v.x, v.y, 1]; let r = a950(v3, m); return point(r[0], r[1]); }
function k887(...mm) { z954(mm.length > 0, 'mulm3m3() must take at least one argument'); let result = clone(mm[0]); for (let a = 1; a < mm.length; a++) {
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
function b888(m, s) { for (let i = 0; i < 3; i++)
    for (let j = 0; j < 3; j++)
        m[i][j] /= s; return m; }
function adjugate(m) { return cofactor(transpose(m)); }
function transpose(m) { return [[m[0][0], m[1][0], m[2][0]], [m[0][1], m[1][1], m[2][1]], [m[0][2], m[1][2], m[2][2]]]; }
function cofactor(m) { return [[m[1][1] * m[2][2] - m[2][1] * m[1][2], -(m[1][0] * m[2][2] - m[2][0] * m[1][2]), m[1][0] * m[2][1] - m[2][0] * m[1][1]], [-(m[0][1] * m[2][2] - m[2][1] * m[0][2]), m[0][0] * m[2][2] - m[2][0] * m[0][2], -(m[0][0] * m[2][1] - m[2][0] * m[0][1])], [m[0][1] * m[1][2] - m[1][1] * m[0][2], -(m[0][0] * m[1][2] - m[1][0] * m[0][2]), m[0][0] * m[1][1] - m[1][0] * m[0][1]]]; }
function determinant(m) { return m[0][0] * (m[1][1] * m[2][2] - m[1][2] * m[2][1]) - m[0][1] * (m[1][0] * m[2][2] - m[2][0] * m[1][2]) + m[0][2] * (m[1][0] * m[2][1] - m[2][0] * m[1][1]); }
function d889(m) { return b888(adjugate(m), determinant(m)); }
function u890(angle) { const cosA = d877(Math.cos(angle)); const sinA = d877(Math.sin(angle)); return [[cosA, sinA, 0], [-sinA, cosA, 0], [0, 0, 1]]; }
function m891(x = 0, y = 0, f892 = 1, q893 = 1, angle = 0, p894 = 0, u895 = 0) { const cosA = Math.cos(angle); const sinA = Math.sin(angle); return [[f892 * cosA - u895 * sinA, -p894 * cosA + q893 * sinA, x], [u895 * cosA + f892 * sinA, q893 * cosA + p894 * sinA, y], [0, 0, 1]]; }
function g896(v1, v2) { return v1.x * v2.y - v1.y * v2.x; }
function o897(v1, v2) { return point(v1.x + v2.x, v1.y + v2.y); }
function sqrv(v) { return c898(v, v); }
function c898(v1, v2) { return point(v1.x * v2.x, v1.y * v2.y); }
function d899(v, s) { return point(v.x * s, v.y * s); }
function k900(v1, v2) { return point(v1.x / v2.x, v1.y / v2.y); }
function g901(v, s) { return point(v.x / s, v.y / s); }
function a902(v1, v2) { return point(v1.x - v2.x, v1.y - v2.y); }
function g903(str) { return decodeURI(encodeURIComponent(str)); }
function w904(str) { return decodeURIComponent(encodeURI(str)); }
function y905(bytes) { let str = ''; for (let i = 0; i < bytes.length; i++)
    str += String.fromCharCode(bytes[i]); return str; }
function d906(str) { return Array.from(w904(str), c => c.charCodeAt(0)); }
function d907(array, size) { const newArray = new Uint8Array(size); h908(array, newArray); return newArray; }
function h908(src, dst) { c909(src, 0, src.length, dst, 0, dst.length); }
function c909(src, v910, x911, dst, q912, e913) { const size = Math.min(x911, e913); for (let i = 0; i < size; i++)
    dst[q912 + i] = src[v910 + i]; }
function z914(c915, u916) { if (c915.length != u916.length)
    return false; for (let i = 0; i < c915.length; i++) {
    if (c915[i] != u916[i])
        return false;
} return true; }
function k917(e918, l919) { return e918.findIndex(i => l919.includes(i)) > -1; }
function d920(list) { return list ? '<==' : '<--'; }
;
function k921(list) { return list ? '==>' : '-->'; }
;
function e922(nodeId) { return e873 + ' ' + nodeId; }
function m923(name) { return y874 + ' ' + name; }
function n924(name) { return q875 + ' ' + name; }
function o925(str) { return str.toLowerCase() == 'true' || str == '1'; }
function i926(t927, o928 = false) { return z933(t927.outputNodeId, t927.outputId, t927.outputOrder, t927.inputNodeId, t927.inputId, t927.list, o928); }
function d929(outputNodeId, outputId, outputOrder, inputNodeId, inputId) { return m923(outputNodeId + ' ' + outputId + ' ' + outputOrder + ' ' + inputNodeId + ' ' + inputId); }
function j930(z243) { return d929(z243.outputNodeId, z243.outputId, z243.outputOrder, z243.inputNodeId, z243.inputId); }
function l931(z243) { return d929(z243.output.node.id, z243.output.id, z243.outputOrder, z243.input.node.id, z243.input.id); }
function b932(z243, o928 = false) { return z933(z243.output.node.id, z243.output.id, z243.outputOrder, z243.input.node.id, z243.input.id, z243.list, o928); }
function z933(outputNodeId, outputId, outputOrder, inputNodeId, inputId, list, o928 = false) { const sp = o928 ? ' ' : '  '; const jsp = o928 ? '' : ' '; const arrow = sp + x937(typeof outputOrder == 'string' ? parseInt(outputOrder) : outputOrder) + k921(typeof list == 'string' ? o925(list) : list) + sp; const join = jsp + '.' + jsp; return outputNodeId + join + outputId + arrow + inputNodeId + join + inputId; }
function m934(pageId) { return n924(pageId); }
function k935(num) { const str = num.toString(); let sup = ''; for (const c of str)
    sup += l936(c); return sup; }
function l936(c) { switch (c) {
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
function x937(num) { const str = num.toString(); let sup = ''; for (const c of str)
    sup += g938(c); return sup; }
function g938(c) { switch (c) {
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
function w939(bool) { return bool ? 'true' : 'false'; }
function isValid(val) { return val != undefined && val != null; }
function isEmpty(array) { return array.length == 0; }
function b940(array, item) { q941(array, array.indexOf(item)); }
function q941(array, index) { if (index > -1 && index < array.length)
    array.splice(index, 1); }
function d942(array) { if (isEmpty(array))
    return null; let last = array.at(-1); array.splice(array.length - 1, 1); return last; }
function y943(array) { return array[array.length - 1]; }
function i944(array, from, to) { const item = array[from]; array.splice(from, 1); array.splice(to, 0, item); }
function x945(array, item) { const index = array.indexOf(item); if (index > -1)
    array.splice(index, 1); }
function w946(r2796, array) { for (const item of array) {
    const index = r2796.indexOf(item);
    if (index > -1)
        r2796.splice(index, 1);
} }
function b947(array, where) { const index = array.findIndex(where); if (index > -1)
    array.splice(index, 1); }
function q948(styleId) { return styleId.split(',')[0] + ','; }
function n949(points) { let g4035 = ''; if (points.length < 2)
    return g4035; g4035 += 'M'; g4035 += ' ' + d877(points[0].x); g4035 += ' ' + d877(points[0].y); for (let i = 1; i < points.length; i++) {
    g4035 += ' L' + ' ' + d877(points[i].x) + ' ' + d877(points[i].y);
} return g4035; }
function point(x, y) { return { x: x, y: y }; }
function a950(v, m) { let r = [0, 0, 0]; for (let i = 0; i < 3; i++)
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
function w951(array, item, equal = null) { if (equal) {
    if (Array.isArray(item))
        item.forEach(i => w951(array, i, equal));
    else if (!array.find(i => equal(i, item)))
        array.push(item);
}
else {
    if (Array.isArray(item))
        item.forEach(i => w951(array, i));
    else if (!array.includes(item))
        array.push(item);
} }
function j952(array, item, equal) { if (Array.isArray(item))
    item.forEach(i => j952(array, i, equal));
else if (!array.find(equal))
    array.push(item); }
function q953(array, item, except) { if (Array.isArray(item))
    item.forEach(i => q953(array, i, except));
else if (!array.find(except))
    array.push(item); }
function z954(...args) { if (o2540) {
    console.assert(...args);
} }
function a955(...args) { if (o2540)
    console.error(...args); }
function b956(str, trim) { while (str.length >= trim.length && str.substring(0, trim.length) == trim)
    str = str.substring(trim.length); return str; }
function n957(str, trim) { while (str.length >= trim.length && str.substring(str.length - trim.length) == trim)
    str = str.substring(0, str.length - trim.length); return str; }
function t958(s4095) { const fills = []; for (const fill of s4095) {
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
            const b4211 = fill[1];
            const stops = [];
            for (const stop of fill[2]) {
                stops.push({ color: { r: Math.min(Math.max(0, stop[0]), 1), g: Math.min(Math.max(0, stop[1]), 1), b: Math.min(Math.max(0, stop[2]), 1), a: Math.min(Math.max(0, stop[3]), 1) }, position: stop[4] });
            }
            fills.push({ type: fill[0], gradientTransform: b4211, gradientStops: stops, blendMode: fill[3] });
            break;
        }
    }
} return fills; }
function i959(type) { return j1092.includes(type); }
const g1059 = 'LIST#';
const m1060 = 'NLIST#';
const n1061 = 'TLIST#';
const z1062 = 'SLIST#';
const o1063 = 'NULL';
const z1064 = 'VAR';
const m1065 = 'VARGRP';
const t1066 = 'FEEDBK';
const c1067 = 'REPT';
const o1068 = 'CACHE';
const c1069 = 'FRZ';
const l1070 = 'TIMER';
const d1071 = 'VNAME';
const GET_LIST_VALUE_NAMES = 'GVNAMES';
const LIST_VALUE_NAMES = 'VNAMES';
const OBJECT_NAME = 'ONAME';
const k1072 = 'CMB';
const z1073 = 'LSASIT';
const m1074 = 'EXTR';
const h1075 = 'SETP';
const g1076 = 'GETP';
const b1077 = 'SUBLST';
const m1078 = 'UNIQ';
const REORDER_LIST = 'RORD';
const SHIFT_LIST = 'SHFTLST';
const u1079 = 'REVLST';
const c1080 = 'SORT';
const r1081 = 'CLMN';
const w1082 = 'CELL';
const d1083 = 'LIST';
const h1084 = 'COUNT';
const OBJECT_COUNT = 'OBJCOUNT';
const x1085 = 'LCONT';
const f1086 = 'SELECT';
const SELECT_FROM_LIST = 'LSTSEL';
const c1087 = 'IF';
const q1088 = 'LSTFLT';
const y1089 = 'ITER';
const x1090 = 'ANY#';
const u1091 = [g1059, m1060, n1061, z1062, k1072, m1074, h1075, g1076, b1077, d1083, h1084, x1085, c1067];
const j1092 = [g1059, m1060, n1061, z1062];
const w1093 = [o1063, z1064, m1065, ...u1091, z1073, m1074, h1075, g1076, b1077, m1078, REORDER_LIST, SHIFT_LIST, u1079, r1081, c1080, w1082, d1083, f1086, SELECT_FROM_LIST, c1087, q1088, t1066, c1067, y1089, o1068, c1069, l1070, d1071, GET_LIST_VALUE_NAMES, LIST_VALUE_NAMES, OBJECT_NAME];
const n1094 = 'NUM#';
const g1095 = 'NUM';
const NUMBER_PRECISION = 'NPREC';
const b1096 = 'NSIGN';
const q1097 = 'ABS';
const NUMBER_NEGATIVE = 'NEG';
const p1098 = 'ROUND';
const NUMBER_QUANTIZE = 'QUANT';
const g1099 = 'SMINMAX';
const t1100 = 'MINMAX';
const m1101 = 'LIM';
const l1102 = 'NCURVE';
const NUMBER_BIAS = 'NBIAS';
const f1103 = 'NANISNUM';
const m1104 = 'CONST';
const h1105 = 'DATE';
const d1106 = 'SEQ';
const b1107 = 'RANGE';
const m1108 = 'WAVE';
const i1109 = 'RAND';
const j1110 = 'NOISE';
const n1111 = 'PROB';
const r1112 = 'ACCUM';
const z1113 = 'LERP';
const d1114 = 'SOLVE';
const u1115 = 'NANIM';
const q1116 = 'SMATH';
const v1117 = 'MATH';
const h1118 = 'ADD';
const b1119 = 'SUB';
const h1120 = 'MUL';
const r1121 = 'DIV';
const m1122 = 'MOD';
const q1123 = 'EXP';
const e1124 = 'NBOOL';
const q1125 = 'NOT';
const t1126 = 'AND';
const n1127 = 'OR';
const l1128 = 'XOR';
const f1129 = 'COND';
const g1130 = 'EQ';
const q1131 = 'NE';
const l1132 = 'LT';
const f1133 = 'LE';
const a1134 = 'GT';
const p1135 = 'GE';
const f1136 = 'TRIG';
const r1137 = 'SIN';
const r1138 = 'COS';
const a1139 = 'TAN';
const u1140 = 'ATAN2';
const d1141 = 'CNVANG';
const p1142 = [v1117, q1116, h1118, b1119, h1120, r1121, m1122, q1123];
const h1143 = [e1124, q1125, t1126, n1127, l1128];
const o1144 = [f1129, g1130, q1131, l1132, f1133, a1134, p1135];
const k1145 = [f1136, r1137, r1138, a1139, u1140];
const d1146 = 'TEXT#';
const k1147 = 'TEXT';
const t1148 = 'TLEN';
const s1149 = 'TTRIM';
const p1150 = 'TSUB';
const f1151 = 'TCONT';
const i1152 = 'TCASE';
const n1153 = 'TREPL';
const z1154 = 'TJOIN';
const c1155 = 'TPAD';
const a1156 = 'TCMP';
const v1157 = 'TCHAR';
const a1158 = 'TUNI';
const v1159 = 'INDEX';
const n1160 = 'N2T';
const p1161 = 'C2T';
const p1162 = 'T2N';
const h1163 = 'T2C';
const c1164 = 'TSPLT';
const e3505 = 'TJSON';
const b1166 = 'TCSV';
const l1167 = 'FETCH';
const y1168 = 'TFILE';
const n1169 = [n1094, m1060, g1095, NUMBER_PRECISION, b1096, q1097, NUMBER_NEGATIVE, p1098, NUMBER_QUANTIZE, g1099, t1100, m1101, l1102, NUMBER_BIAS, f1103, m1104, h1105, d1106, b1107, m1108, i1109, j1110, r1112, z1113, d1114, u1115, n1160, v1157, ...p1142, ...h1143, ...o1144, ...k1145, d1141];
const p1170 = [d1146, n1061, k1147, t1148, s1149, p1150, f1151, i1152, z1154, c1155, n1153, a1156, a1158, v1159, p1162, h1163, c1164, e3505, b1166, l1167, y1168];
const z1171 = 'COL#';
const e1172 = 'COL';
const h1173 = 'CVAL';
const h1174 = 'CCOR';
const d1175 = 'COLP3';
const b1176 = 'CCNT';
const e1177 = 'BLND';
const b1178 = 'CLERP';
const u1179 = 'CBLND';
const n1180 = [z1171, e1172, h1174, d1175, e1177, b1178, u1179, p1161];
const j1181 = 'FILL#';
const u1182 = 'FILL';
const s1183 = [j1181, u1182];
const q1184 = 'STRK#';
const a1185 = 'STRK';
const h1186 = [q1184, a1185];
const y1187 = 'CSTOP#';
const f1188 = 'CSTOP';
const y1189 = [y1187, f1188];
const p1190 = 'GRAD#';
const j1191 = 'GRAD';
const r1192 = [p1190, j1191];
const v1193 = 'RCRN#';
const m1194 = 'RCRN';
const f1195 = [v1193, m1194];
const n1196 = 'DRSH#';
const i1197 = 'DRSH';
const f1198 = [n1196, i1197];
const v1199 = 'INSH#';
const i1200 = 'INSH';
const r1201 = [v1199, i1200];
const m1202 = 'LBLR#';
const f1203 = 'LBLR';
const d1204 = [m1202, f1203];
const q1205 = 'BBLR#';
const a1206 = 'BBLR';
const b1207 = [q1205, a1206];
const g1208 = 'MASK#';
const w1209 = 'MASK';
const a1210 = [g1208, w1209];
const w1211 = 'BLEND#';
const u1212 = 'BLEND';
const f1213 = [w1211, u1212];
const i1214 = [...f1195, ...f1198, ...r1201, ...d1204, ...b1207, ...f1213, ...a1210];
const e1215 = [z1171, j1181, p1190, q1184, n1196, v1199, m1202, q1205, w1211, g1208];
const v1216 = 'CSTL';
const w1217 = 'SHP#';
const q1218 = 'RECT#';
const b1219 = 'RECT';
const l1220 = [q1218, b1219];
const d1221 = 'LINE#';
const g1222 = 'LINE';
const a1223 = [d1221, g1222];
const y1224 = 'ELPS#';
const g1225 = 'ELPS';
const i1226 = [y1224, g1225];
const j1227 = 'TRPZ#';
const u1228 = 'TRPZ';
const b1229 = [j1227, u1228];
const w1236 = 'POLY#';
const o1237 = 'POLY';
const p1238 = [w1236, o1237];
const a1239 = 'STAR#';
const a1240 = 'STAR';
const f1241 = [a1239, a1240];
const s1242 = 'TXTS#';
const i1243 = 'TXTS';
const x1244 = [s1242, i1243];
const t1245 = 'PT#';
const o1246 = 'PT';
const l1247 = [t1245, o1246];
const n1248 = 'PCORN';
const i1249 = 'VPATH#';
const k1250 = 'VPATH';
const q1251 = [i1249, k1250];
const r1252 = 'VPT#';
const d1253 = 'VPT';
const j1254 = [r1252, d1253];
const e1255 = 'VEDGE#';
const k1256 = 'VEDGE';
const m1257 = [e1255, k1256];
const h1258 = 'VREG#';
const x1259 = 'VREG';
const i1260 = [h1258, x1259];
const q1261 = 'VNET#';
const h1262 = 'VNET';
const e1263 = [q1261, h1262];
const h1264 = 'SGRP#';
const h1265 = 'SGRP';
const w1266 = [h1264, h1265];
const p1267 = 'FRM#';
const s1268 = 'FRM';
const l1269 = [p1267, s1268];
const t1231 = 'ARC#';
const p1230 = 'ARC';
const z1232 = [t1231, p1230];
const m1234 = 'WAVEP#';
const f1233 = 'WAVEP';
const w1235 = [m1234, f1233];
const h1270 = 'MOVE';
const g1271 = 'ROT';
const h1272 = 'SCALE';
const q1273 = 'SKEW';
const b1274 = 'SCENTR';
const g1275 = 'RSTX';
const l1276 = 'PLACE';
const x1277 = 'APPLY';
const PATH_LENGTH = 'PTHLEN';
const JOIN_PATHS = 'JOINPTH';
const REORIENT_PATHS = 'REORPTH';
const l1283 = 'PTALPATH';
const r1284 = 'CPTONPATH';
const c1278 = 'MESPT';
const f1279 = 'VECLEN';
const r1280 = 'CIRCEN';
const ARC_FROM_POINTS = 'ARCPT';
const w1281 = 'INTLIN';
const w1282 = 'PTLERP';
const REVERSE_PATH = 'REVPTH';
const BLEND_PATH = 'BLENDPTH';
const PATH_TYPES = [k1250, u1228, p1230, f1233];
const PATH_VALUES = [i1249, j1227, t1231, m1234];
const y1285 = 'SBOOL';
const b1286 = 'SBOOL#';
const w1287 = 'SBOOLU';
const w1288 = 'SBOOLS';
const i1289 = 'SBOOLI';
const l1290 = 'SBOOLE';
const k1291 = [y1285, b1286, w1287, w1288, i1289, l1290];
const g1292 = 'RENDER';
const EXPORT = 'EXPORT';
const s1293 = [w1217, z1062, q1218, d1221, y1224, j1227, w1236, a1239, s1242, t1245, i1249, r1252, e1255, h1258, q1261, t1231, m1234, h1264, p1267, b1286, n1196, v1199, m1202, q1205, w1211, g1208];
const s1294 = [g1271, h1272, q1273];
const j1295 = [...s1293, ...l1220, ...a1223, ...i1226, ...b1229, ...p1238, ...f1241, ...x1244, ...l1247, n1248, ...q1251, ...j1254, ...m1257, ...i1260, ...e1263, ...z1232, ...w1235, ...w1266, ...l1269, ...k1291, h1270, ...s1294, b1274, g1275, l1276, x1277, PATH_LENGTH, JOIN_PATHS, REORIENT_PATHS, l1283, r1284, c1278, f1279, r1280, p1230, f1233, ARC_FROM_POINTS, w1281, w1282, REVERSE_PATH, BLEND_PATH, g1292, EXPORT];
const y1296 = [g1059, m1060, n1061, z1062, n1094, d1146, z1171, j1181, y1187, p1190, q1184, y1187, p1190, w1217, q1218, d1221, y1224, j1227, w1236, a1239, s1242, t1245, i1249, r1252, e1255, h1258, q1261, h1264, p1267, v1193, n1196, v1199, m1202, q1205, w1211, g1208];
const n1297 = 'GROUP';
const b1298 = 'GPARAM';
const q1299 = [n1297, b1298];
const w1300 = 'CMNT';
const z1301 = 'CMNTARR';
const s1302 = 'PANEL';
const b1303 = 'ACT';
const a1304 = 'BFACT';
const d1305 = 'BFLST';
const j1306 = 'DIS';
const b1307 = 'NOC';
const PARAM = 'PARAM';
const b1308 = 'LOG';
const d1309 = 'GRAPH';
const t1310 = [[m1122, '%'], [r1121, '/'], [b1119, '−'], [h1118, '+'], [h1120, '×'], [q1123, 'e<sup>x']];
const n1311 = [[r1121, '/'], [b1119, '−'], [h1118, '+'], [h1120, '×']];
const j1312 = 0;
const c1313 = 1;
const f1314 = 2;
const l1315 = 3;
const u1316 = [[j1312, 'not'], [c1313, 'xor'], [f1314, 'or'], [l1315, 'and']];
const v1317 = 0;
const n1318 = 1;
const i1319 = 2;
const f1320 = 3;
const a1321 = 4;
const t1322 = 5;
const k1323 = [[v1317, '<'], [n1318, '≤'], [i1319, '≠'], [f1320, '='], [a1321, '≥'], [t1322, '>']];
const z1324 = 0;
const x1325 = 1;
const z1326 = 2;
const o1327 = 3;
const y1328 = 4;
const s1329 = 5;
const i1330 = [[z1324, 'sin'], [x1325, 'cos'], [z1326, 'tan'], [o1327, 'asin'], [y1328, 'acos'], [s1329, 'atan']];
const x1331 = 'EMPTY';
const w1332 = 'CONNECT';
const l1333 = 'CREATE';
const i1334 = 'CREATE_INSERT';
const r1335 = 'DELETE';
const d1336 = 'DISCONNECT';
const u1337 = 'LINK_STYLE';
const l1338 = 'LINK_VARIABLE';
const o1339 = 'LINK_VARIABLE_GROUP';
const p1340 = 'MAKE_ACTIVE';
const MAKE_NOT_CONDITION_ACTION = 'MAKE_NOT_CONDITION';
const a1341 = 'MAKE_PASSIVE';
const u1342 = 'PASTE';
const s1343 = 'RECONNECT';
const o1344 = 'REMOVE';
const y1345 = 'RENAME';
const a1346 = 'REORDER_INPUTS';
const e1347 = 'REORDER_CONNECTIONS';
const m1348 = 'SELECT';
const g1349 = 'SELECT_MOVE';
const p1350 = 'MOVE_NODES';
const c1351 = 'SET_PARAM_VALUE';
const SET_MULTIPLE_VALUES_ACTION = 'SET_MULTIPLE_VALUES';
const a1352 = 'SET_PARAM_SETTING';
const t1353 = 'SET_NODE_RECT';
const k1354 = 'TOGGLE_DISABLE';
const w1355 = 'TOGGLE_PARAM_HEADER';
const g1356 = 'SET_CURRENT_GRAPH';
const i1357 = 'CREATE_PAGE';
const c1358 = 'DELETE_PAGE';
const d1359 = 'GROUP_NODES';
const d1360 = 'UNGROUP_NODES';
const v1361 = 'HIGHLIGHT_NODES';
const SCROLL_LIST_NODE_ACTION = 'SCROLL_LIST_NODE';
const SET_LIST_DIVIDER_ACTION = 'SET_LIST_DIVIDER';
const SET_NODE_PARAM_ACTION = 'SET_NODE_PARAM';
const d1362 = 'BNORM';
const j1363 = 'BDARK';
const u1364 = 'BMULT';
const v1365 = 'BPDRK';
const r1366 = 'BBURN';
const x1367 = 'BLITE';
const t1368 = 'BSCRN';
const o1369 = 'BPLGT';
const i1370 = 'BDODG';
const z1371 = 'BOVER';
const k1372 = 'BSOFT';
const y1373 = 'BHARD';
const t1374 = 'BDIFF';
const f1375 = 'BEXCL';
const f1376 = 'BHUE';
const a1377 = 'BSAT';
const w1378 = 'BCOL';
const a1379 = 'BLUM';
const w1380 = [[d1362, 'normal', 'NORMAL'], [j1363, 'darken', 'DARKEN'], [u1364, 'multiply', 'MULTIPLY'], [v1365, 'plus darker', 'LINEAR_BURN'], [r1366, 'color burn', 'COLOR_BURN'], [x1367, 'lighten', 'LIGHTEN'], [t1368, 'screen', 'SCREEN'], [o1369, 'plus lighter', 'LINEAR_DODGE'], [i1370, 'color dodge', 'COLOR_DODGE'], [z1371, 'overlay', 'OVERLAY'], [k1372, 'soft light', 'SOFT_LIGHT'], [y1373, 'hard light', 'HARD_LIGHT'], [t1374, 'difference', 'DIFFERENCE'], [f1375, 'exclusion', 'EXCLUSION'], [f1376, 'hue', 'HUE'], [a1377, 'saturation', 'SATURATION'], [w1378, 'color', 'COLOR'], [a1379, 'luminosity', 'LUMINOSITY']];
const v1381 = [['thin', 100], ['extra light', 200], ['light', 300], ['regular', 400], ['medium', 500], ['semi bold', 600], ['bold', 700], ['extra bold', 800], ['black', 900]];
const b1382 = 0;
const r1383 = 1;
const d1384 = 2;
const f1385 = 2;
const x1386 = 3;
const c1387 = 3;
const a1388 = 4;
const m1389 = 4;
const k1390 = 5;
const v1391 = 6;
const s1392 = 7;
const h1393 = 8;
const k1394 = 9;
const t1395 = 10;
const w1396 = 11;
const l1397 = 12;
const y1398 = 13;
const s1399 = 14;
const h1400 = 15;
const c1401 = 16;
const k1402 = 17;
const y1403 = 18;
const y1404 = 19;
const p1405 = 20;
const s1406 = 21;
const b1407 = 22;
const a1408 = 23;
const f1409 = 24;
const FO_BOOLEAN_CHILDREN = 24;
const q1410 = 24;
const g1411 = 25;
const FO_BOOLEAN_OPERATION = 25;
const l1412 = 26;
const b1413 = 27;
const h1414 = 28;
const h1415 = 28;
const t1416 = 28;
const l1417 = 28;
const g1418 = 28;
const o1419 = 28;
const y1420 = 28;
const o1421 = 28;
const x1422 = 29;
const h1423 = 29;
const d1424 = 29;
const m1425 = 29;
const h1426 = 29;
const c1427 = 29;
const o1428 = 30;
const z1429 = 30;
const i1430 = 30;
const u1431 = 30;
const b1432 = 31;
const d1433 = 31;
const t1434 = 32;
const t1435 = 33;
const l1436 = 34;
const d1437 = 35;
const s1438 = 36;
const n1439 = 37;
const s2797 = '12345679ABCDEFGHJKLMNPQRSTUVWXYZ';
function g845(array, chars = s2797) { let q847 = ''; let len = array.length; let i = 0; while (len > 0) {
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
function m846(q847, chars = s2797) { const array = []; let len = q847.length; let c = 0; while (len > 0) {
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
function g2102(nodeKey, i4007) {
    return __awaiter(this, void 0, void 0, function* () { const log = s2103(yield n1547(nodeKey, false)); if (i4007) {
        console.log('%c%s\n%c%s', 'background: #fa24; color: white;', d1057(nodeKey), 'background: #fa44; color: #edc;', log);
    }
    else {
        console.log('%c%s\n%c%s', 'background: #fdb; color: black;', d1057(nodeKey), 'background: #fed; color: black;', log);
    } });
}
function s2103(json) { let w4036 = json.replace('{\n', '').replace('\n}', '').replace('[\n' + p868, '').replace('\n' + p868 + ']', '').split(p868 + '"params":\n').join('').split('": "').join(': ').split('", "').join(': ').split(p868 + '"').join(p868).split(p868 + p868 + '["').join(p868 + p868).split('",\n').join('\n').split('"\n').join('\n').split('"],\n').join('\n'); if (w4036[w4036.length - 1] == '"')
    w4036 = w4036.substring(0, w4036.length - 1); if (w4036.substring(w4036.length - 2) == '"]')
    w4036 = w4036.substring(0, w4036.length - 2); return w4036; }
function h2104(json) { let w4036 = json.replace('{\n', '').replace('\n}', '').replace('[\n' + p868, '').replace('\n' + p868 + ']', ''); return w4036; }
function k2105(z243, i4007) { const l4214 = i926(z243, true); if (i4007) {
    console.log('%c%s', 'background: #4f44; color: #ded', l4214);
}
else {
    console.log('%c%s', 'background: #cfc; color: black;', l4214);
} }
console.clear();
figma.payments.setPaymentStatusInDevelopment({ type: 'PAID' });
figma.loadAllPagesAsync().then(() => { figma.on('documentchange', c1518); figma.on('selectionchange', h1526); figma.on('close', z1519); });
i1508(true);
figma.clientStorage.getAsync('pro').then(data => { figma.showUI(__html__, { visible: false, themeColors: true, title: 'Generator' }); });
var c2709 = figma.viewport.zoom;
setInterval(h1523, 100);
const b2798 = 'clock_';
const e2799 = 1000;
var i2800 = false;
var objectCenterSize = 15;
function f1520() { (function () {
    return __awaiter(this, void 0, void 0, function* () { figma.currentPage.loadAsync().then(() => __awaiter(this, void 0, void 0, function* () { let l2801 = yield figma.currentPage.getPluginData(figma.currentUser.id + ',windowWidth'); let b2802 = yield figma.currentPage.getPluginData(figma.currentUser.id + ',windowHeight'); let b2803; let v2804; if (l2801 === NULL) {
        b2803 = 800;
        figma.currentPage.setPluginData(figma.currentUser.id + ',windowWidth', l2801.toString());
    }
    else
        b2803 = parseInt(l2801); if (b2802 === NULL) {
        v2804 = 600;
        figma.currentPage.setPluginData(figma.currentUser.id + ',windowHeight', b2802.toString());
    }
    else
        v2804 = parseInt(b2802); figma.ui.resize(Math.max(minWindowWidth, b2803), Math.max(minWindowHeight, v2804)); figma.ui.show(); const fonts = yield figma.listAvailableFontsAsync(); const eula = (yield figma.clientStorage.getAsync('eula')) === 'true'; const tutorials = (yield figma.clientStorage.getAsync('tutorials')) === 'true'; const isLocked = yield o1525(); l1527({ cmd: 'uiReturnFigStartGenerator', currentUser: figma.currentUser, viewportRect: figma.viewport.bounds, viewportZoom: figma.viewport.zoom, fonts: fonts, eula: eula, tutorials: tutorials, isLocked: isLocked, windowWidth: b2803, windowHeight: v2804 }); })); });
})(); }
function l1521() { i1508(); figma.showUI(__html__, { visible: false, themeColors: true }); }
function z1522() { setInterval(a1524, e2799); }
function h1523() { if (figma.viewport.zoom == c2709)
    return; c2709 = figma.viewport.zoom; a2697(); e1541(); r1543(); }
function a1524() { x1548(b2798 + figma.currentUser.sessionId.toString(), Date.now().toString()); }
function o1525() {
    return __awaiter(this, void 0, void 0, function* () { yield figma.currentPage.loadAsync(); const clocks = figma.currentPage.getPluginDataKeys().filter(k => k.length > b2798.length && k.substring(0, b2798.length) == b2798 && k.substring(b2798.length) != figma.currentUser.sessionId.toString()).map((k) => __awaiter(this, void 0, void 0, function* () { return parseInt(yield n1547(k)); })); clocks.sort(); const now = Date.now(); const locked = clocks.length > 0 && now - (yield clocks[clocks.length - 1]) < e2799 * 2; return locked; });
}
function h1526() { a2697(); }
var c2730 = new Array();
var m2732 = new Array();
function figGetObjectsFromIds(objectIds) {
    return __awaiter(this, void 0, void 0, function* () { for (let i = l2766.length - 1; i >= 0; i--)
        if (!l2766[i].removed && objectIds.includes(l2766[i].getPluginData('objectId')))
            l2766.splice(i, 1); for (let i = p2782.length - 1; i >= 0; i--)
        if (p2782[i].removed || objectIds.includes(p2782[i].getPluginData('objectId')))
            p2782.splice(i, 1); yield figma.currentPage.loadAsync(); return figma.currentPage.findAll(o => objectIds.includes(o.getPluginData('objectId'))); });
}
function l1507(nodeIds) {
    return __awaiter(this, void 0, void 0, function* () { for (let i = l2766.length - 1; i >= 0; i--)
        if (!l2766[i].removed && nodeIds.includes(l2766[i].getPluginData('nodeId')))
            l2766.splice(i, 1); for (let i = p2782.length - 1; i >= 0; i--)
        if (p2782[i].removed || nodeIds.includes(p2782[i].getPluginData('nodeId')))
            p2782.splice(i, 1); yield figma.currentPage.loadAsync(); figma.currentPage.findAll(o => nodeIds.includes(o.getPluginData('nodeId'))).forEach(o => { if (!o.removed)
        o.remove(); }); c2730 = c2730.filter(a => !nodeIds.includes(a.nodeId)); });
}
function i1508(r1509 = false) { for (const i1514 of figma.currentPage.children) {
    if (i1514.removed)
        continue;
    if (i1514.getPluginData('objectId') != '' && i1514.getPluginData('userId') == figma.currentUser.id && (parseInt(i1514.getPluginData('retain')) == 0 || r1509))
        i1514.remove();
} }
function g1510(nodeIds, e1511) { for (let i = c2730.length - 1; i >= 0; i--) {
    const h2731 = c2730[i];
    if (!nodeIds.includes(h2731.nodeId))
        continue;
    for (let j = h2731.objects.length - 1; j >= 0; j--) {
        const i1514 = h2731.objects[j];
        if (i1514.removed || !s1512(i1514, e1511)) {
            if (!i1514.removed)
                i1514.remove();
            x945(h2731.objects, i1514);
            if (l2766.includes(i1514))
                x945(l2766, i1514);
            if (p2782.includes(i1514))
                x945(p2782, i1514);
        }
        if (!i1514.removed) {
            if (parseInt(i1514.getPluginData('retain')) == 2)
                k1533(i1514);
        }
    }
    if (isEmpty(h2731.objects))
        x945(c2730, h2731);
} }
function s1512(i1514, e1511) { if (i1514.type == h1265 || i1514.type == s1268) {
    for (const child of i1514.children) {
        const found = s1512(child, e1511);
        if (found)
            return found;
    }
}
else {
    const found = e1511.find(o => i1514.getPluginData('objectId') == o[d1384] && i1514.getPluginData('userId') == figma.currentUser.id || o[k1390] == 2 && o[k1390] == i1514.getPluginData('retain'));
    if (found)
        return found;
} return null; }
function s1515(nodeIds, n1516) { figma.getLocalPaintStylesAsync().then(paintStyles => { paintStyles.filter(s => nodeIds.includes(s.getPluginData('nodeId'))).forEach(s => { const nodeId = s.getPluginData('nodeId'); const existing = o925(s.getPluginData('existing')); if (!existing) {
    s.remove();
}
else if (n1516) {
    b947(m2732, a => a.nodeId == nodeId);
    s.setPluginData('type', NULL);
    s.setPluginData('nodeId', NULL);
    s.setPluginData('existing', NULL);
} }); }); if (n1516)
    m2732 = m2732.filter(a => !nodeIds.includes(a.nodeId)); }
var b1517 = false;
function c1518(e) { for (const change of e.documentChanges) {
    switch (change.type) {
        case 'STYLE_CREATE':
            if (!change.style)
                break;
            if (!b1517) {
                change.style.setPluginData('type', NULL);
                change.style.setPluginData('nodeId', NULL);
                change.style.setPluginData('existing', NULL);
            }
            break;
        case 'STYLE_PROPERTY_CHANGE': {
            if (!change.style)
                break;
            if (!b1517) {
                const msg = { cmd: 'uiStylePropertyChange', styleId: q948(change.id), properties: change.properties, name: '', paints: [] };
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
                l1527(msg);
            }
            break;
        }
        case 'STYLE_DELETE':
            l1527({ cmd: 'uiStyleDelete', styleId: change.id });
            break;
    }
} b1517 = false; }
function z1519() { i1508(); l1527({ cmd: 'updateMetrics' }); }
figma.ui.onmessage = function (msg) { msg = JSON.parse(msg); if (msg.cmd == 'returnUiGetValueForFigma')
    return; switch (msg.cmd) {
    case 'figStartGenerator':
        f1520();
        break;
    case 'figRestartGenerator':
        l1521();
        break;
    case 'figFinishStart':
        z1522();
        break;
    case 'figDockWindowNormal':
        v2739('normal');
        break;
    case 'figDockWindowMaximize':
        v2739('maximize');
        break;
    case 'figDockWindowTop':
        v2739('top');
        break;
    case 'figDockWindowLeft':
        v2739('left');
        break;
    case 'figDockWindowRight':
        v2739('right');
        break;
    case 'figDockWindowBottom':
        v2739('bottom');
        break;
    case 'figGetMousePosition':
        o1593(msg.clientPosition);
        break;
    case 'figResizeWindow':
        f1596(msg.width, msg.height);
        break;
    case 'figSetWindowRect':
        n1594(msg.x, msg.y, msg.width, msg.height);
        break;
    case 'figNotify':
        f1597(msg);
        break;
    case 'figGetLocalData':
        j1545(msg.key);
        break;
    case 'figSetLocalData':
        p1546(msg.key, msg.value);
        break;
    case 'figClearAllLocalData':
        y4031();
        break;
    case 'figGetPageData':
        n1547(msg.key);
        break;
    case 'figSetPageData':
        x1548(msg.key, msg.value);
        break;
    case 'figSavePages':
        z1553(msg.pageIds, msg.pageJson, msg.currentPageId);
        break;
    case 'figLoadNodesAndConns':
        k1550(msg.debugMode);
        break;
    case 'figSaveNodes':
        u1554(msg.nodeIds, msg.nodeJson);
        break;
    case 'figGetAllLocalTemplateNames':
        z2736();
        break;
    case 'figSaveLocalTemplate':
        n1555(msg.w4032, msg.template);
        break;
    case 'figRemoveConnsToNodes':
        b1556(msg.nodeIds);
        break;
    case 'figRemoveSavedNodesAndConns':
        c1557(msg.nodeIds);
        break;
    case 'figRemoveAllSavedNodesAndConns':
        m1558();
        break;
    case 'figLogAllSavedNodesAndConns':
        r1559(msg.i4007);
        break;
    case 'figLogAllSavedNodes':
        b1560(msg.i4007);
        break;
    case 'figLogAllSavedConns':
        g1561(msg.i4007);
        break;
    case 'figLogAllSavedPageKeys':
        y1562(msg.i4007);
        break;
    case 'figLogAllSavedPages':
        f1563(msg.i4007);
        break;
    case 'figLogAllSavedConnKeys':
        x1564(msg.i4007);
        break;
    case 'figLogAllLocalData':
        v1565(msg.i4007);
        break;
    case 'figGetValue':
        b1566(msg.key, msg.spec);
        break;
    case 'figRemoveSavedPage':
        u1568(msg.pageId);
        break;
    case 'figRemoveAllSavedPages':
        g1569();
        break;
    case 'figSaveConnection':
        m1570(msg.key, msg.json);
        break;
    case 'figSaveConnections':
        y1571(msg.keys, msg.json);
        break;
    case 'figUpdateSavedConnections':
        v1572(msg.curKeys, msg.newKeys, msg.json);
        break;
    case 'figDeleteSavedConnection':
        m1573(msg.key);
        break;
    case 'figRemoveAllSavedConnections':
        t1574();
        break;
    case 'figDeleteSavedConnectionsToNode':
        b1575(msg.nodeId);
        break;
    case 'figDeleteSavedConnectionsFromNode':
        b1576(msg.nodeId);
        break;
    case 'figRemovePluginDataFromAllLocalStyles':
        h1577();
        break;
    case 'figGetAllLocalVariables':
        i1601(msg.nodeId, msg.px, msg.py);
        break;
    case 'figLinkNodeToVariable':
        r1603(msg.nodeId, msg.variableId);
        break;
    case 'figUpdateVariable':
        figUpdateVariableAsync(msg.variableId, msg.value);
        break;
    case 'figGetAllLocalColorStyles':
        o1578(msg.nodeId, msg.px, msg.py);
        break;
    case 'figLinkNodeToExistingColorStyle':
        q1579(msg.nodeId, msg.styleId);
        break;
    case 'figExport':
        figExport(msg.objectIds, msg.scale, msg.format, msg.suffix);
        break;
    case 'figGetObjectSize':
        c1532(msg.object);
        break;
    case 'figGetVariableUpdates':
        h1567(msg.linkedVarIds);
        break;
    case 'figUpdateShowIds':
        i2800 = msg.i2800;
        break;
    case 'figUpdateObjectCenterSize':
        objectCenterSize = msg.objectCenterSize;
        break;
    case 'figDeleteAllObjects':
        i1508();
        break;
    case 'figUpdateObjectsAndStyles':
        u2745 = 0;
        m2746 = 0;
        msg.objects.forEach(o => o.counted = false);
        j2733(null, msg.objects, msg.q4021, msg.w2050, msg.nodeIds, msg.q2762, msg.q2763, msg.c270);
        s1584(msg);
        break;
    case 'figDeleteObjectsAndStyles':
        l1507(msg.nodeIds);
        s1515(msg.nodeIds, msg.n1516);
        break;
    case 'figDeleteObjectsExcept':
        g1510(msg.nodeIds, msg.ignoreObjects);
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
} l1527({ cmd: 'uiEndFigMessage', msgCmd: msg.cmd }); };
function l1527(msg) { figma.ui.postMessage(JSON.stringify(msg)); }
function r2734(key) {
    return __awaiter(this, void 0, void 0, function* () { return yield figma.clientStorage.getAsync(key); });
}
function j1545(key) { figma.currentPage.loadAsync().then(() => { if (key == 'canvasEmpty') {
    l1527({ cmd: 'uiReturnFigGetLocalData', key: key, value: figma.currentPage.children.length == 0 });
}
else if (key == 'debugWarningCrash') {
    figma.clientStorage.getAsync('debugWarning').then(data => { l1527({ cmd: 'uiReturnFigGetLocalData', key: key, value: data }); });
}
else {
    figma.clientStorage.getAsync(key).then(data => { l1527({ cmd: 'uiReturnFigGetLocalData', key: key, value: data }); });
} }); }
function p1546(key, value, postToUi = true) { figma.clientStorage.setAsync(key, value); if (postToUi) {
    l1527({ cmd: 'uiReturnFigSetLocalData', key: key, value: value });
} }
function y4031() {
    return __awaiter(this, void 0, void 0, function* () { const keys = yield figma.clientStorage.keysAsync(); for (const key of keys)
        figma.clientStorage.deleteAsync(key); });
}
function n1547(key, postToUi = true) {
    return __awaiter(this, void 0, void 0, function* () { yield figma.currentPage.loadAsync(); const data = figma.currentPage.getPluginData(key); if (postToUi) {
        l1527({ cmd: 'uiReturnFigGetPageData', key: key, value: data });
    } return data; });
}
function x1548(key, value) { m1549(key); figma.currentPage.setPluginData(key, value); }
function m1549(key) { figma.currentPage.setPluginData(key, ''); }
function k1550(debugMode) { figma.currentPage.loadAsync().then(() => { const pageKeys = figma.currentPage.getPluginDataKeys().filter(k => z1053(k)); const nodeKeys = figma.currentPage.getPluginDataKeys().filter(k => q1054(k)); const connKeys = figma.currentPage.getPluginDataKeys().filter(k => q1055(k)); if (!debugMode)
    z1552(nodeKeys, connKeys); const pages = pageKeys.map(k => figma.currentPage.getPluginData(k)); const nodes = nodeKeys.map(k => figma.currentPage.getPluginData(k)); const a2122 = connKeys.map(k => figma.currentPage.getPluginData(k)); const pageOrder = figma.currentPage.getPluginData('pageOrder').split(','); const currentPageId = figma.currentPage.getPluginData('currentPageId'); h1551(nodes); const showAllColorSpaces = figma.currentPage.getPluginData('showAllColorSpaces'); l1527({ cmd: 'uiReturnFigLoadNodesAndConns', showAllColorSpaces: showAllColorSpaces, pageKeys: pageKeys, pageJson: pages, pageOrder: pageOrder, currentPageId: currentPageId, nodeKeys: nodeKeys, nodeJson: nodes, connKeys: connKeys, connJson: a2122 }); }); }
function h1551(nodes) { m2732 = []; figma.getLocalPaintStylesAsync().then(paintStyles => { for (const x3019 of nodes) {
    const node = JSON.parse(x3019);
    if (node.type == v1216) {
        const style = paintStyles.find(s => { const nodeId = s.getPluginData('nodeId'); return nodeId == node.id; });
        if (style) {
            m2732.push({ nodeId: node.id, existing: o925(node.existing), styles: [style] });
        }
    }
} }); }
function z1552(nodeKeys, connKeys) { figma.currentPage.loadAsync().then(() => { const j2735 = '"loading": "true"'; const not = '{\n'; const set = '{\n' + p868 + j2735 + ',\n'; nodeKeys.forEach(k => figma.currentPage.setPluginData(k, figma.currentPage.getPluginData(k).replace(set, not).replace(not, set))); connKeys.forEach(k => figma.currentPage.setPluginData(k, figma.currentPage.getPluginData(k).replace(set, not).replace(not, set))); }); }
function z1553(pageIds, pageJson, currentPageId) { for (let i = 0; i < pageIds.length; i++) {
    x1548(n924(pageIds[i]), pageJson[i]);
} x1548('pageOrder', pageIds.join(',')); x1548('currentPageId', currentPageId); }
function u1554(nodeIds, nodeJson) { for (let i = 0; i < nodeIds.length; i++) {
    x1548(e922(nodeIds[i]), nodeJson[i]);
} }
function z2736() {
    return __awaiter(this, void 0, void 0, function* () { let keys = yield figma.clientStorage.keysAsync(); keys = keys.filter(k => k.length >= z876.length && k.substring(0, z876.length) == z876); l1527({ cmd: 'uiReturnGetAllLocalTemplateNames', templateNames: keys }); });
}
function n1555(w4032, template) { p1546(z876 + ' ' + w4032, template); }
function b1556(nodeIds) { figma.currentPage.loadAsync().then(() => { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => q1055(k)); for (const key of connKeys) {
    const parts = t1058(key).split(' ');
    if (nodeIds.includes(parts[0]) || nodeIds.includes(parts[2]))
        m1549(key);
} }); }
function c1557(nodeIds) { figma.currentPage.loadAsync().then(() => { b1556(nodeIds); const nodeKeys = figma.currentPage.getPluginDataKeys().filter(k => q1054(k) && nodeIds.includes(d1057(k))); nodeKeys.forEach(k => m1549(k)); }); }
function m1558() { figma.currentPage.loadAsync().then(() => { const nodeKeys = figma.currentPage.getPluginDataKeys().filter(k => q1054(k)); const connKeys = figma.currentPage.getPluginDataKeys().filter(k => q1055(k)); for (const key of nodeKeys)
    m1549(key); for (const key of connKeys)
    m1549(key); }); }
function r1559(i4007) {
    return __awaiter(this, void 0, void 0, function* () { yield b1560(i4007); g1561(i4007); });
}
function b1560(i4007) {
    return __awaiter(this, void 0, void 0, function* () { yield figma.currentPage.loadAsync(); figma.currentPage.getPluginDataKeys().filter(k => q1054(k)).forEach((k) => __awaiter(this, void 0, void 0, function* () { return yield g2102(k, i4007); })); });
}
function g1561(i4007) { figma.currentPage.loadAsync().then(() => { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => q1055(k)); connKeys.sort((key1, key2) => { const p1 = t1058(key1).split(' '); const p2 = t1058(key2).split(' '); if (p1[2] != p2[2])
    return p1[2] < p2[2] ? -1 : 1; if (p1[3] != p2[3])
    return parseInt(p1[3]) - parseInt(p2[3]); if (p1[2] == p2[0])
    return -1; if (p2[2] == p1[0])
    return 1; return 0; }); connKeys.forEach(k => k2105(JSON.parse(figma.currentPage.getPluginData(k)), i4007)); }); }
function y1562(i4007) { figma.currentPage.loadAsync().then(() => { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => z1053(k)); connKeys.forEach(k => console.log('%c' + k, 'background: #fff; color: ' + (i4007 ? 'black' : 'white'))); const pageOrder = figma.currentPage.getPluginData('pageOrder'); console.log('%c' + pageOrder, 'background: #fff; color: ' + (i4007 ? 'black' : 'white')); }); }
function f1563(i4007) { figma.currentPage.loadAsync().then(() => { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => z1053(k)); connKeys.forEach(k => console.log('%c' + figma.currentPage.getPluginData(k), 'background: #fff; color: ' + (i4007 ? 'black' : 'white'))); const pageOrder = figma.currentPage.getPluginData('pageOrder'); console.log('%c' + pageOrder, 'background: #fff; color: ' + (i4007 ? 'black' : 'white')); }); }
function x1564(i4007) { figma.currentPage.loadAsync().then(() => { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => q1055(k)); connKeys.forEach(k => console.log('%c' + k, 'background: #dff; color: ' + (i4007 ? 'black' : 'white'))); }); }
function v1565(i4007) { figma.clientStorage.keysAsync().then(keys => keys.forEach(k => figma.clientStorage.getAsync(k).then(val => console.log(k + ': ' + val)))); }
function b1566(key, spec) {
    return __awaiter(this, void 0, void 0, function* () { let result = null; switch (key) {
        case 'getVariableData':
            result = yield t1602(spec);
            break;
        case 'getPaidStatus':
            result = figma.payments.status.type;
            break;
        case 'figSubscribe': {
            yield figma.payments.initiateCheckoutAsync({ interstitial: 'PAID_FEATURE' });
            result = figma.payments.status.type;
            break;
        }
    } l1527({ cmd: 'returnFigGetValue', value: result }); });
}
function h1567(varIds) { t1602(varIds).then(values => { l1527({ cmd: 'uiReturnFigGetVariableUpdates', values: values }); }); }
function u1568(pageId) {
    return __awaiter(this, void 0, void 0, function* () { m1549(m934(pageId)); const pageOrder = (yield n1547('pageOrder')).split(','); b947(pageOrder, id => id == pageId); x1548('pageOrder', pageOrder.join(',')); });
}
function g1569() { figma.currentPage.loadAsync().then(() => { const pageKeys = figma.currentPage.getPluginDataKeys().filter(k => z1053(k)); pageKeys.forEach(k => m1549(k)); m1549('pageOrder'); }); }
function m1570(key, json) { x1548(key, json); }
function y1571(_keys, _json) { const keys = JSON.parse(_keys); const json = JSON.parse(_json); for (let i = 0; i < keys.length; i++)
    x1548(keys[i], json[i]); }
function v1572(_curKeys, _newKeys, _json) { const curKeys = JSON.parse(_curKeys); const newKeys = JSON.parse(_newKeys); const json = JSON.parse(_json); for (let i = 0; i < curKeys.length; i++) {
    m1549(curKeys[i]);
    x1548(newKeys[i], json[i]);
} }
function m1573(key) { m1549(key); }
function t1574() { figma.currentPage.loadAsync().then(() => { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => q1055(k)); connKeys.forEach(k => m1549(k)); }); }
function b1575(nodeId) { figma.currentPage.loadAsync().then(() => { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => q1055(k)); for (const key of connKeys) {
    const parts = key.split(' ');
    if (parts[4] == nodeId)
        m1549(key);
} }); }
function b1576(nodeId) { figma.currentPage.loadAsync().then(() => { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => q1055(k)); for (const key of connKeys) {
    const parts = key.split(' ');
    if (parts[1] == nodeId)
        m1549(key);
} }); }
function h1577() { figma.getLocalPaintStylesAsync().then(u1581 => { for (const style of u1581) {
    style.setPluginData('type', '');
    style.setPluginData('nodeId', '');
    style.setPluginData('existing', '');
} }); }
function figSaveSnapshot(index, objectIds) {
    return __awaiter(this, void 0, void 0, function* () { const objects = yield figGetObjectsFromIds(objectIds); const group = figma.group(objects, figma.currentPage); const settings = { format: 'PNG' }; const icon = yield group.exportAsync(settings); figma.ungroup(group); l1527({ cmd: 'uiReturnFigSaveSnapshot', index: index, iconWidth: group.width, iconHeight: group.height, icon: icon }); });
}
var k2737 = null;
var c4033 = () => k2737 = null;
var n2738 = 'normal';
function o1593(clientPosition) { l1527({ cmd: 'uiReturnFigGetMousePosition', position: { x: 0, y: 0 }, clientPosition: clientPosition, viewportZoom: figma.viewport.zoom, viewportRect: figma.viewport.bounds }); }
function n1594(x, y, width, height) { return; }
function z1595(dock, rect, bounds) { switch (dock) {
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
function f1596(width, height) { (function () {
    return __awaiter(this, void 0, void 0, function* () { width = Math.floor(Math.max(0, width)); height = Math.floor(Math.max(0, height)); figma.ui.resize(width, height); yield figma.currentPage.loadAsync(); figma.currentPage.setPluginData(figma.currentUser.id + ',windowWidth', width.toString()); figma.currentPage.setPluginData(figma.currentUser.id + ',windowHeight', height.toString()); l1527({ cmd: 'uiReturnFigResizeWindow', width: width, height: height }); });
})(); }
function v2739(dock) {
    return __awaiter(this, void 0, void 0, function* () { if (dock != 'normal' && n2738 == 'normal') {
        figma.clientStorage.setAsync('normalWindowX', yield figma.clientStorage.getAsync('normalWindowX'));
        figma.clientStorage.setAsync('normalWindowY', yield figma.clientStorage.getAsync('normalWindowY'));
        figma.clientStorage.setAsync('normalWindowWidth', yield figma.clientStorage.getAsync('normalWindowWidth'));
        figma.clientStorage.setAsync('normalWindowHeight', yield figma.clientStorage.getAsync('normalWindowHeight'));
    } n2738 = dock; figma.clientStorage.setAsync('windowDock', dock); f1596(yield figma.clientStorage.getAsync('windowWidth'), yield figma.clientStorage.getAsync('windowHeight')); });
}
function f1597(msg) { u1598(msg.text, msg.prefix, msg.delay, msg.error, msg.x1599, msg.h1600); }
function u1598(text, prefix = 'Generator ', delay = 400, error = false, x1599 = '', h1600 = NULL) { const options = { timeout: delay, error: error, onDequeue: c4033 }; if (x1599 != '') {
    options['button'] = { text: x1599 };
    if (h1600.substring(0, 'removeConnection'.length) == 'removeConnection') {
        options['button']['action'] = () => m1573(h1600.split(',')[1]);
    }
    else {
        switch (h1600) {
            case 'hideClearUndoWarning':
                options['button']['action'] = () => l1527({ cmd: 'uiHideClearUndoWarning' });
                break;
        }
    }
} if (k2737)
    k2737.cancel(); k2737 = figma.notify(prefix + text, options); }
function r2740(key, params = null) {
    return __awaiter(this, void 0, void 0, function* () { return yield h2741(key, params); });
}
function h2741(key, params = null) {
    return __awaiter(this, void 0, void 0, function* () { return new Promise((resolve, reject) => { const timeout = 60000; l1527(Object.assign({ cmd: 'uiGetValueForFigma', key: key }, (params || {}))); const j2742 = setTimeout(() => reject(new Error('Timeout: Result not received by Figma within the specified time')), timeout); function j4034(msg) { msg = JSON.parse(msg); if (msg.cmd === 'returnUiGetValueForFigma') {
        clearTimeout(j2742);
        resolve({ key: msg.key, value: msg.value });
        figma.ui.off('message', j4034);
    } } figma.ui.on('message', j4034); }); });
}
var b2743 = [];
var p2744 = [];
var u2745 = 0;
var m2746 = 0;
function n1528(o111) { return (o111[k1390] === 2 ? '' : j872) + (i2800 ? o111[d1384] : o111[x1386]); }
function d1529(u1513, addObject = null, addProps = true) {
    return __awaiter(this, void 0, void 0, function* () { if (!l1531(u1513))
        return null; let i1514; switch (u1513[b1382]) {
        case b1219:
            i1514 = e2714(u1513, addProps);
            break;
        case g1222:
            i1514 = z2793(u1513, addProps);
            break;
        case g1225:
            i1514 = u2789(u1513, addProps);
            break;
        case o1237:
            i1514 = r2710(u1513, addProps);
            break;
        case a1240:
            i1514 = c2717(u1513, addProps);
            break;
        case i1243:
            i1514 = v2720(u1513, addProps);
            break;
        case o1246:
            i1514 = v2696(u1513);
            break;
        case k1250:
            i1514 = w2748(u1513, addProps);
            break;
        case h1262:
            i1514 = j2749(u1513, addProps);
            break;
        case y1285:
            i1514 = yield a2750(u1513, addProps);
            break;
        case h1265:
            i1514 = yield s2751(u1513);
            break;
        case s1268:
            i1514 = yield f2752(u1513, addProps);
            break;
    } if (addObject && i1514 != undefined && i1514 != null && !i1514.removed) {
        i1514.name = n1528(u1513);
        z954(u1513[b1382] == h1265 || !!i1514, 'no Figma object created');
        if (i1514 != undefined && i1514 != null) {
            i1514.setPluginData('retain', u1513[k1390].toString());
            if (u1513[k1390] < 2) {
                i1514.setPluginData('userId', figma.currentUser.id);
                i1514.setPluginData('sessionId', figma.currentUser.sessionId.toString());
                i1514.setPluginData('type', u1513[b1382]);
                i1514.setPluginData('nodeId', u1513[r1383]);
                i1514.setPluginData('objectId', u1513[d1384]);
                i1514.setPluginData('isCenter', w939(u1513[p1405]));
                if (u1513[b1382] == o1246)
                    l2766.push(i1514);
                if (u1513[y1404])
                    t1544(i1514);
            }
            addObject(i1514);
        }
    } if (!u1513.counted) {
        m2746++;
        u1513.counted = true;
    } return i1514; });
}
function u1530(i1514, u1513, addProps) {
    return __awaiter(this, void 0, void 0, function* () { if (!l1531(u1513) || i1514 == undefined || i1514 == null || i1514.removed)
        return; i1514.name = n1528(u1513); i1514.setPluginData('retain', u1513[k1390].toString()); switch (u1513[b1382]) {
        case b1219:
            o2715(i1514, u1513, addProps);
            break;
        case g1222:
            x2794(i1514, u1513, addProps);
            break;
        case g1225:
            j2790(i1514, u1513, addProps);
            break;
        case o1237:
            x2711(i1514, u1513, addProps);
            break;
        case a1240:
            v2718(i1514, u1513, addProps);
            break;
        case i1243:
            e2721(i1514, u1513, addProps);
            break;
        case o1246:
            q2753(i1514, u1513);
            break;
        case k1250:
            f2754(i1514, u1513, addProps);
            break;
        case h1262:
            w2755(i1514, u1513, addProps);
            break;
        case y1285:
            z2756(i1514, u1513, addProps);
            break;
        case h1265:
            f2757(i1514, u1513);
            break;
        case s1268:
            g2758(i1514, u1513, addProps);
            break;
    } if (i1514 != undefined && i1514 != null && !i1514.removed) {
        if (i1514.parent == figma.currentPage)
            yield figma.currentPage.loadAsync();
        i1514.parent.appendChild(i1514);
        if (u1513[y1404])
            t1544(i1514);
    } if (!u1513.counted) {
        m2746++;
        u1513.counted = true;
    } });
}
function j2733(o2759, x2760, n2761, w2050 = -1, nodeIds = [], q2762 = false, q2763 = false, c270 = false, addProps = true) {
    return __awaiter(this, void 0, void 0, function* () { let a2764 = NULL; let k2765 = null; let abort = false; const v3643 = []; let s2747 = 0; b2743.push(...nodeIds); if (w2050 > -1)
        u2745 = w2050; for (const u1513 of x2760) {
        p2744.push(u1513);
        if (u1513[r1383] != a2764) {
            a2764 = u1513[r1383];
            k2765 = c2730.find(a => a.nodeId == u1513[r1383]);
            if (!k2765) {
                c2730.push(k2765 = { nodeId: u1513[r1383], objects: [] });
            }
        }
        const addObject = i1514 => { if (o2759 != undefined && o2759 != null && !o2759.removed)
            o2759.appendChild(i1514);
        else
            k2765.objects.push(i1514); };
        let objects = o2759 != undefined && o2759 != null && !o2759.removed ? o2759.children : k2765.objects;
        let i1514 = objects.find(o => o.removed || o.getPluginData('userId') == figma.currentUser.id && o.getPluginData('objectId') == u1513[d1384]);
        if (i1514 != undefined && i1514 != null && i1514.removed) {
            b940(objects, i1514);
            if (l2766.includes(i1514))
                x945(l2766, i1514);
            if (p2782.includes(i1514))
                x945(p2782, i1514);
        }
        if (i1514 == undefined || i1514 == null || i1514.removed) {
            const newObj = yield d1529(u1513, addObject, addProps);
            v3643.push(newObj);
        }
        else if (i1514 != undefined && i1514 != null && !i1514.removed && i1514.getPluginData('type') == u1513[b1382].toString()) {
            yield u1530(i1514, u1513, addProps);
            if (i1514 != undefined && i1514 != null && !i1514.removed)
                v3643.push(i1514);
        }
        else {
            i1514.remove();
            if (l2766.includes(i1514))
                x945(l2766, i1514);
            if (p2782.includes(i1514))
                x945(p2782, i1514);
            yield d1529(u1513, addObject, addProps);
        }
        s2747++;
        if (s2747 >= n2761) {
            const result = yield r2740('returnObjectUpdate', { u2745: u2745, m2746: m2746 });
            abort = result.value;
            s2747 = 0;
            if (abort)
                break;
        }
    } if (o2759 != undefined && o2759 != null && !o2759.removed) {
        for (const i1514 of o2759.children) {
            if (i1514 != undefined && i1514 != null && i1514.removed || !x2760.find(o => o[d1384] == i1514.getPluginData('objectId') && i1514.getPluginData('userId') == figma.currentUser.id))
                i1514.remove();
        }
    } for (const point of l2766) {
        if (point.parent == figma.currentPage)
            yield figma.currentPage.loadAsync();
        if (point != undefined && point != null && !point.removed && !point.parent.removed)
            point.parent.appendChild(point);
    } if (q2763 && !abort) {
        g1510(b2743, p2744);
        b2743 = [];
        p2744 = [];
        if (c270 && v3643.length > 0) {
            figma.viewport.scrollAndZoomIntoView(v3643);
            const bounds = a1534(v3643);
            figma.viewport.zoom = Math.min(figma.viewport.bounds.width * figma.viewport.zoom / bounds.width - 0.05, figma.viewport.bounds.height * figma.viewport.zoom / bounds.height - 0.05);
        }
    } yield r2740('returnObjectUpdate', { u2745: u2745, m2746: m2746 }); });
}
function l1531(u1513) { switch (u1513[b1382]) {
    case b1219: return i2713(u1513);
    case g1222: return n2775(u1513);
    case g1225: return v2776(u1513);
    case o1237: return o4030(u1513);
    case a1240: return l2716(u1513);
    case i1243: return f2719(u1513);
    case o1246: return r4029(u1513);
    case k1250: return k2777(u1513);
    case h1262: return h2778(u1513);
    case y1285: return g2779(u1513);
    case h1265: return w2780(u1513);
    case s1268: return o2781(u1513);
} }
function c1532(u1513) {
    return __awaiter(this, void 0, void 0, function* () { (() => __awaiter(this, void 0, void 0, function* () { const i1514 = yield d1529(u1513); const width = i1514.width; const height = i1514.height; i1514.remove(); l1527({ cmd: 'uiForwardToGenerator', msg: { cmd: 'returnFigGetObjectSize', objectId: u1513[d1384], width: width, height: height } }); }))(); });
}
function k1533(i1514) { i1514.setPluginData('type', ''); i1514.setPluginData('nodeId', ''); i1514.setPluginData('userId', ''); i1514.setPluginData('sessionId', ''); i1514.setPluginData('objectId', ''); i1514.setPluginData('isCenter', ''); i1514.setPluginData('retain', ''); }
function a1534(objects) { const bounds = { left: 0, top: 0, right: 0, bottom: 0 }; for (const o111 of objects) {
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
        let i1514 = figma.currentPage.children.find(o => !o.removed && o.getPluginData('userId') == figma.currentUser.id && o.getPluginData('objectId') == objId);
        if (!i1514)
            continue;
        const settings = { constraint: { type: 'SCALE', value: scale }, format: format == 0 ? 'PNG' : 'JPG', suffix: suffix };
        yield i1514.exportAsync(settings);
    } });
}
const p2782 = [];
const m2783 = [];
function c1535(f1536, o1537) { const effects = []; for (const effect of f1536) {
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
                if (o1537 && !isNaN(spread))
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
function g2703(i1514, u1513, phantom = true) { f1540(i1514, u1513); x2704(i1514, u1513, phantom); e2705(i1514, u1513); i1514.opacity = u1513[s1406]; i1514.blendMode = u1513[b1407]; const maskType = u1513[a1408]; i1514.isMask = maskType > 0; if (i1514.isMask) {
    switch (maskType) {
        case 1:
            i1514.maskType = 'ALPHA';
            break;
        case 2:
            i1514.maskType = 'VECTOR';
            break;
        case 3:
            i1514.maskType = 'LUMINANCE';
            break;
    }
} if (i1514.isMask && i1514.fills.length == 0 && i1514.strokes.length == 0)
    i1514.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 }, opacity: 1, blendMode: 'NORMAL' }]; }
function e2705(i1514, u1513) { if (!!u1513[t1395] && !isEmpty(u1513[t1395])) {
    i1514.fills = t958(u1513[t1395]);
    if (p2782.includes(i1514))
        x945(p2782, i1514);
}
else
    i1514.fills = []; }
function x2704(i1514, u1513, phantom = true) { if (u1513[w1396] != null && !isEmpty(u1513[w1396])) {
    p1539(i1514, t958(u1513[w1396]), u1513[l1397], u1513[y1398], u1513[s1399], u1513[h1400], u1513[c1401], y2706(u1513[k1402]));
    if (u1513[y1404])
        i1514.setPluginData('dashes', u1513[k1402]);
    if (p2782.includes(i1514))
        x945(p2782, i1514);
    if (u1513[y1404])
        w951(m2783, i1514);
}
else if (isEmpty(u1513[t1395]) && isEmpty(u1513[w1396]) && !u1513[a1408] && phantom) {
    k1542(i1514);
    w951(p2782, i1514);
}
else
    i1514.strokes = []; }
function y2706(f1538) { f1538 = f1538; f1538 = b956(f1538, ','); f1538 = n957(f1538, ','); f1538 = f1538.trim(); return f1538 == '' ? [] : f1538.split(',').map(s => Math.max(0, parseFloat(s))); }
function l2707(f1538) { f1538 = f1538; f1538 = b956(f1538, ','); f1538 = n957(f1538, ','); f1538 = f1538.trim(); return f1538 == '' ? [] : f1538.split(',').map(s => Math.max(0, parseFloat(s) / c2709)); }
function p1539(i1514, fills, weight, align, join, miterLimit, cap, dashes = []) { i1514.strokes = fills; i1514.strokeWeight = Math.max(0, weight); i1514.strokeAlign = align; i1514.strokeJoin = join; const miterAngle = miterLimit / 360 * Tau; const v2784 = 1 / Math.sin(miterAngle / 2); i1514.strokeMiterLimit = Math.min(Math.max(0, v2784), 16); i1514.strokeCap = cap; i1514.dashPattern = dashes; }
function f1540(i1514, u1513) { if (!!u1513[y1403] && !isEmpty(u1513[y1403])) {
    const o1537 = u1513[b1382] == b1219 || u1513[b1382] == g1225 || u1513[b1382] == s1268;
    i1514.effects = c1535(u1513[y1403], o1537);
}
else
    i1514.effects = []; }
function e1541() { for (const o111 of p2782) {
    if (o111.removed)
        x945(p2782, o111);
    else
        k1542(o111);
} }
function k1542(o111) { figma.currentPage.loadAsync().then(() => { const back = figma.currentPage.backgrounds.find(b => b.type == 'SOLID'); let phantomColor; if (back) {
    const l = back.color.r * 0.2126 + back.color.g * 0.7152 + back.color.b * 0.0722;
    phantomColor = l > 0.5 ? { r: 0, g: 0, b: 0 } : { r: 1, g: 1, b: 1 };
}
else
    phantomColor = { r: 1, g: 0, b: 1 }; p1539(o111, [{ type: 'SOLID', color: phantomColor, opacity: 0.5 }], 1 / c2709, 'CENTER', 'MITER', 1, 'NONE', [1 / c2709, 2 / c2709]); }); }
function r1543() { for (const i1514 of m2783) {
    if (i1514.removed)
        x945(m2783, i1514);
    else
        t1544(i1514);
} }
function t1544(i1514) { i1514.strokeWeight = Math.max(0, 1.5 / c2709); if (o925(i1514.getPluginData('isCenter'))) {
    const path = i1514.vectorPaths[0];
    const parts = path.data.split(' ');
    let t = { x: parseFloat(parts[1]), y: parseFloat(parts[2]) };
    let c = { x: parseFloat(parts[4]), y: parseFloat(parts[5]) };
    let r = { x: parseFloat(parts[7]), y: parseFloat(parts[8]) };
    const a = 2;
    const b = 0.05;
    const f = 1 - Math.pow(1 - Math.min(c2709, 1), a) / Math.pow(a, b);
    t = o897(c, d899(u884(a902(t, c)), objectCenterSize / f));
    r = o897(c, d899(u884(a902(r, c)), objectCenterSize / f));
    parts[1] = t.x;
    parts[2] = t.y;
    parts[4] = c.x;
    parts[5] = c.y;
    parts[7] = r.x;
    parts[8] = r.y;
    const j2785 = { windingRule: path.windingRule, data: parts.join(' ') };
    i1514.vectorPaths = [j2785];
} const dashes = i1514.getPluginData('dashes'); if (dashes != '')
    i1514.dashPattern = l2707(dashes); }
function o1578(nodeId, px, py) { figma.getLocalPaintStylesAsync().then(_styles => { const styles = new Array(); for (const m168 of _styles) {
    const _nodeId = m168.getPluginData('nodeId');
    const _existing = m168.getPluginData('existing');
    const existing = !!_existing;
    const style = { id: m168.id, nodeId: _nodeId, name: m168.name, existing: existing, paints: new Array() };
    let onlyPaint = true;
    for (const v2787 of m168.paints) {
        if (v2787.type == 'SOLID') {
            style.paints.push([v2787.color.r, v2787.color.g, v2787.color.b, v2787.opacity]);
        }
        else {
            onlyPaint = false;
            break;
        }
    }
    if (onlyPaint)
        styles.push(style);
} l1527({ cmd: 'uiReturnFigGetAllLocalColorStyles', nodeId: nodeId, px: px, py: py, styles: JSON.stringify(styles) }); }); }
function q1579(nodeId, styleId) { figma.getLocalPaintStylesAsync().then(u1581 => { if (styleId != NULL)
    y1580(u1581, nodeId, styleId);
else
    o1582(u1581, nodeId); }); }
function y1580(u1581, nodeId, styleId, clearExisting = true) { const b2786 = m2732.find(a => a.nodeId == nodeId); if (b2786 && clearExisting)
    o1582(u1581, nodeId); const m1586 = u1581.find(s => s.id == styleId); z954(!!m1586, 'figStyle should be found here'); m1586.setPluginData('type', v1216); m1586.setPluginData('nodeId', nodeId); m1586.setPluginData('existing', w939(true)); m2732.push({ nodeId: nodeId, existing: true, styles: [m1586] }); return m1586; }
function o1582(u1581, nodeId) { const m1586 = u1581.find(s => s.getPluginData('nodeId') == nodeId); z954(!!m1586, 'figStyle should be found here'); if (m1586) {
    m1586.setPluginData('type', NULL);
    m1586.setPluginData('nodeId', NULL);
    m1586.setPluginData('existing', NULL);
    b947(m2732, a => a.nodeId == nodeId);
} return m1586; }
function a1583(styles, d1587) { const m1586 = figma.createPaintStyle(); m1586.setPluginData('type', d1587[b1382]); m1586.setPluginData('nodeId', d1587[r1383]); m1586.name = d1587[c1387]; setStylePaints(m1586, d1587); styles.push(m1586); l1527({ cmd: 'uiSetStyleId', nodeId: d1587[r1383], styleId: m1586.id }); return m1586; }
function s1584(msg) { let a2764 = NULL; let b2786; for (const d1587 of msg.styles) {
    if (d1587[r1383] != a2764) {
        a2764 = d1587[r1383];
        b2786 = m2732.find(a => a.nodeId == d1587[r1383]);
        if (!b2786) {
            b2786 = { nodeId: d1587[r1383], styles: [] };
            m2732.push(b2786);
        }
    }
    else
        b2786 = null;
    const m1586 = b2786.styles[0];
    figma.getLocalPaintStylesAsync().then(u1581 => { const localStyle = u1581.find(s => s.getPluginData('nodeId') == d1587[r1383]); if (isValid(m1586) && !isValid(localStyle)) {
        b940(b2786.styles, m1586);
    } const existing = isValid(m1586) && isValid(localStyle) && m1586.getPluginData('existing'); if (!isValid(m1586) || !isValid(localStyle)) {
        if (!existing) {
            b1517 = true;
            q1579(d1587[r1383], d1587[f1385]);
        }
    }
    else if (isValid(m1586) && m1586.getPluginData('type') == d1587[b1382]) {
        b1517 = true;
        m1585(localStyle, d1587);
    } });
} }
function m1585(m1586, d1587) { setStylePaints(m1586, d1587); m1586.name = d1587[c1387]; }
function getStylePaints(stylePaints) { const paints = new Array(); for (const v2787 of stylePaints) {
    const fill = v2787[1].split(' ');
    switch (v2787[0]) {
        case 'SOLID':
            paints.push({ type: 'SOLID', color: { r: Math.min(Math.max(0, parseFloat(fill[0]) / 0xff), 1), g: Math.min(Math.max(0, parseFloat(fill[1]) / 0xff), 1), b: Math.min(Math.max(0, parseFloat(fill[2]) / 0xff), 1) }, opacity: Math.min(Math.max(0, parseFloat(fill[3]) / 100), 1) });
            break;
    }
} return paints; }
function setStylePaints(m1586, d1587) { if (!isEmpty(d1587[m1389]))
    m1586.paints = getStylePaints(d1587[m1389]);
else
    m1586.paints = []; }
function i1601(nodeId, px, py) {
    return __awaiter(this, void 0, void 0, function* () { figma.variables.getLocalVariablesAsync().then((d2788) => __awaiter(this, void 0, void 0, function* () { const variables = new Array(); for (const _var of d2788) {
        const collection = yield figma.variables.getVariableCollectionByIdAsync(_var.variableCollectionId);
        const variable = { id: _var.id, resolvedType: _var.resolvedType, name: _var.name, collectionName: collection.name };
        variables.push(variable);
    } figma.variables.getLocalVariableCollectionsAsync().then((collections) => __awaiter(this, void 0, void 0, function* () { l1527({ cmd: 'uiReturnFigGetAllLocalVariables', nodeId: nodeId, px: px, py: py, variables: JSON.stringify(variables), nCollections: collections.length }); })); })); });
}
function t1602(varIds) {
    return __awaiter(this, void 0, void 0, function* () { const d2788 = yield figma.variables.getLocalVariablesAsync(); const variables = varIds.map(id => d2788.find(v => v.id == id)); let values = []; for (let i = 0; i < varIds.length; i++) {
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
function r1603(nodeId, varId) { figma.variables.getLocalVariablesAsync().then(d2788 => { figLinkVariableAsync(d2788, nodeId, varId); }); }
function figUpdateVariableAsync(varId, value) {
    return __awaiter(this, void 0, void 0, function* () { figma.variables.getLocalVariablesAsync().then((d2788) => __awaiter(this, void 0, void 0, function* () { let variable = d2788.find(v => v.id == varId); if (!variable)
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
function figLinkVariableAsync(d2788, nodeId, varId) {
    return __awaiter(this, void 0, void 0, function* () { let variable = d2788.find(v => v.id == varId); if (!variable)
        return null; const [resolvedVar, values] = yield figGetResolvedVariableValuesAsync(variable); l1527({ cmd: 'uiReturnFigLinkNodeToVariable', nodeId: nodeId, variableId: resolvedVar ? resolvedVar.id : NULL, variableName: resolvedVar ? resolvedVar.name : '', resolvedType: resolvedVar ? resolvedVar.resolvedType : NULL, values: values }); return resolvedVar; });
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
function q1588(tl, tr, bl) { let vr = point(tr.x - tl.x, tr.y - tl.y); let vb = point(bl.x - tl.x, bl.y - tl.y); let sx = vr.x; let sy = vb.y; let kx = -vr.y; let ky = -vb.x; let dx = -tl.x; let dy = -tl.y; const _sx = kx / nozero(sx); const _sy = ky / nozero(sy); let b4211 = k887([[1, _sy, 0], [_sx, 1, 0], [0, 0, 1]], m891(dx, dy)); b4211 = d889(b4211); const a = m881(vr); if (a > Tau / 4 && a < Tau * 3 / 4)
    b4211 = k887(b4211, m891(0, 0, 1, 1, Tau / 2)); if (determinant(b4211) < 0)
    b4211 = k887(b4211, m891(0, 0, -1, 1, 0)); return b4211; }
function n1589(i1514, tl, tr, bl) { const b4211 = q1588(tl, tr, bl); i1514.relativeTransform = [b4211[0], b4211[1]]; }
function a1590(i1514, u1513, setSize = true, noHeight = 0.01) { if (!u1513[v1391] || !u1513[s1392] || !u1513[h1393])
    return; const xp0 = u1513[v1391]; const xp1 = u1513[s1392]; const xp2 = u1513[h1393]; n1589(i1514, xp0, xp1, xp2); if (setSize) {
    const f892 = distv(xp0, xp1);
    const q893 = distv(xp0, xp2);
    const height = u1513[b1382] == i1243 ? u1513[h1426] : u1513[b1413];
    if (!i1514.removed) {
        i1514.resizeWithoutConstraints(Math.max(0.01, f892), height ? Math.max(0.01, q893) : noHeight);
    }
} }
function d1591(l2701, c2702) { if (l2701.removed)
    return; l2701.resizeWithoutConstraints(0.01, 0.01); l2701.setPluginData('actualX', c2702[f1409].toString()); l2701.setPluginData('actualY', c2702[g1411].toString()); l2701.x = c2702[f1409]; l2701.y = c2702[g1411]; l2701.rotation = c2702[p1405] ? 45 : 0; }
function c1592(l2701) { if (!l2701.removed)
    l2701.resizeWithoutConstraints(0.01, 0.01); }
function g2779(genBool) { return true; }
function a2750(genBool, addProps) {
    return __awaiter(this, void 0, void 0, function* () { let objects = []; for (const o111 of genBool[FO_BOOLEAN_CHILDREN])
        yield d1529(o111, o => objects = [...objects, o]); yield figma.currentPage.loadAsync(); let figBool = null; if (!isEmpty(objects)) {
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
        z2756(figBool, genBool, addProps);
    } return figBool; });
}
function z2756(figBool, genBool, addProps) { if (genBool[FO_BOOLEAN_CHILDREN].length == 0) {
    figBool.remove();
    return;
} j2733(figBool, genBool[FO_BOOLEAN_CHILDREN], genBool[FO_BOOLEAN_CHILDREN].length, -1, [], false, false, false, false); a1590(figBool, genBool, false); g2703(figBool, genBool, addProps && genBool[FO_BOOLEAN_CHILDREN].length == 0); }
function v2776(a2767) { return a2767[f1409] != null && !isNaN(a2767[f1409]) && a2767[g1411] != null && !isNaN(a2767[g1411]) && a2767[l1412] != null && !isNaN(a2767[l1412]) && a2767[b1413] != null && !isNaN(a2767[b1413]) && a2767[h1415] != null && !isNaN(a2767[h1415]) && a2767[x1422] != null && !isNaN(a2767[x1422]) && a2767[o1428] != null && !isNaN(a2767[o1428]) && a2767[b1432] != null && !isNaN(a2767[b1432]); }
function u2789(a2767, addProps) { if (!v2776(a2767))
    return null; const r2768 = figma.createEllipse(); j2790(r2768, a2767, addProps, true); return r2768; }
function j2790(r2768, a2767, addProps, isValid = false) { if (!isValid && !v2776(a2767))
    return; u2791(r2768, a2767); if (l2766.includes(r2768))
    v2698(r2768);
else
    g2703(r2768, a2767, addProps); }
function u2791(r2768, a2767) { r2768.cornerRadius = a2767[h1415]; const start = a2767[x1422] / 360 * (Math.PI * 2); const sweep = a2767[o1428] / 100 * (Math.PI * 2); r2768.arcData = { startingAngle: start, endingAngle: start + sweep, innerRadius: Math.min(Math.max(0, a2767[b1432] / 100), 1) }; a1590(r2768, a2767); }
function o2781(v2769) { return v2769[f1409] != null && !isNaN(v2769[f1409]) && v2769[g1411] != null && !isNaN(v2769[g1411]) && v2769[l1412] != null && !isNaN(v2769[l1412]) && v2769[b1413] != null && !isNaN(v2769[b1413]) && v2769[o1421] != null && !isNaN(v2769[o1421]); }
function f2752(v2769, addProps) {
    return __awaiter(this, void 0, void 0, function* () { if (!o2781(v2769))
        return null; const o2770 = figma.createFrame(); o2770.expanded = false; if (o2770) {
        e2792(o2770, v2769, addProps);
        let objects = [];
        for (const o111 of v2769[c1427])
            yield d1529(o111, o => objects = [...objects, o]);
        for (const o111 of objects)
            o2770.appendChild(o111);
    } return o2770; });
}
function g2758(o2770, v2769, addProps) { e2792(o2770, v2769, addProps); j2733(o2770, v2769[c1427], v2769[c1427].length); }
function e2792(o2770, v2769, addProps) { o2770.cornerRadius = v2769[o1421]; a1590(o2770, v2769); g2703(o2770, v2769, addProps && v2769[c1427].length == 0); }
function w2780(a2771) { return true; }
function s2751(a2771) {
    return __awaiter(this, void 0, void 0, function* () { let objects = []; for (const o111 of a2771[q1410])
        yield d1529(o111, o => objects = [...objects, o]); yield figma.currentPage.loadAsync(); const o2772 = !isEmpty(objects) ? figma.group(objects, figma.currentPage) : null; if (o2772) {
        o2772.expanded = false;
        f2757(o2772, a2771);
    } return o2772; });
}
function f2757(o2772, a2771) { if (a2771[q1410].length == 0) {
    o2772.remove();
    return;
} j2733(o2772, a2771[q1410], a2771[q1410].length); f1540(o2772, a2771); }
function n2775(z2773) { return z2773[f1409] != null && !isNaN(z2773[f1409]) && z2773[g1411] != null && !isNaN(z2773[g1411]) && z2773[l1412] != null && !isNaN(z2773[l1412]); }
function z2793(z2773, addProps) { if (!n2775(z2773))
    return null; const n2774 = figma.createLine(); x2794(n2774, z2773, addProps, true); return n2774; }
function x2794(n2774, z2773, addProps, isValid = false) { if (!isValid && !n2775(z2773))
    return; a1590(n2774, z2773, true, 0); g2703(n2774, z2773, addProps); }
var l2766 = [];
function r4029(c2702) { return c2702[f1409] != null && !isNaN(c2702[f1409]) && c2702[g1411] != null && !isNaN(c2702[g1411]); }
function v2696(c2702) { const l2701 = c2702[p1405] ? figma.createRectangle() : figma.createEllipse(); if (!r4029(c2702))
    return l2701; if (l2766.includes(l2701))
    b2700(l2701, c2702);
else
    q2753(l2701, c2702); return l2701; }
function q2753(l2701, c2702) { d1591(l2701, c2702); b2699(l2701); }
function a2697() { l1527({ cmd: 'uiUpdateZoom', zoom: figma.viewport.zoom }); for (const point of l2766)
    v2698(point); }
function v2698(l2701) { c1592(l2701); b2699(l2701); }
function b2700(l2701, c2702) { d1591(l2701, c2702); b2699(l2701); }
function b2699(l2701) { if (l2701.removed)
    return; figma.currentPage.loadAsync().then(() => { const s3740 = o925(l2701.getPluginData('isCenter')); const m2708 = figma.currentPage.selection.includes(l2701); const color = s3740 ? [0xf2, 0x48, 0x22] : m2708 ? [12, 140, 233] : [255, 255, 255]; const border = s3740 ? [255, 255, 255] : m2708 ? [255, 255, 255] : [12, 140, 233]; l2701.fills = t958([['SOLID', color[0], color[1], color[2], 100]]); const effects = []; effects.push(...c1535([['DROP_SHADOW', border[0] / 255, border[1] / 255, border[2] / 255, 1, 0, 0, 0, (s3740 ? 3 : m2708 ? 5 : 3.6) / c2709, 'NORMAL', true, true]], true)); effects.push(...c1535([['DROP_SHADOW', color[0] / 255, color[1] / 255, color[2] / 255, 1, 0, 0, 0, (m2708 ? 4 : 2.4) / c2709, 'NORMAL', true, true]], true)); l2701.effects = effects; }); }
function o4030(genPoly) { return genPoly[f1409] != null && !isNaN(genPoly[f1409]) && genPoly[g1411] != null && !isNaN(genPoly[g1411]) && genPoly[l1412] != null && !isNaN(genPoly[l1412]) && genPoly[b1413] != null && !isNaN(genPoly[b1413]) && genPoly[g1418] != null && !isNaN(genPoly[g1418]) && genPoly[d1424] != null && !isNaN(genPoly[d1424]); }
function r2710(genPoly, addProps) { if (!o4030(genPoly))
    return null; const figPoly = figma.createPolygon(); x2711(figPoly, genPoly, addProps, true); return figPoly; }
function x2711(figPoly, genPoly, addProps, isValid = false) { if (!isValid && !o4030(genPoly))
    return; figPoly.cornerRadius = genPoly[g1418]; figPoly.pointCount = Math.max(3, genPoly[d1424]); a1590(figPoly, genPoly); g2703(figPoly, genPoly, addProps); }
function i2713(k2712) { return k2712[f1409] != null && !isNaN(k2712[f1409]) && k2712[g1411] != null && !isNaN(k2712[g1411]) && k2712[l1412] != null && !isNaN(k2712[l1412]) && k2712[b1413] != null && !isNaN(k2712[b1413]) && k2712[h1414] != null && !isNaN(k2712[h1414]); }
function e2714(k2712, addProps) { if (!i2713(k2712))
    return null; const figRect = figma.createRectangle(); o2715(figRect, k2712, addProps, true); return figRect; }
function o2715(figRect, k2712, addProps, isValid = false) { if (!isValid && !i2713(k2712))
    return; const found = k2712[y1403].findIndex(e => e[0] == 'ROUND_CORNERS'); if (found > -1) {
    const corners = k2712[y1403][found];
    figRect.topLeftRadius = corners[1];
    figRect.topRightRadius = corners[2];
    figRect.bottomLeftRadius = corners[3];
    figRect.bottomRightRadius = corners[4];
}
else
    figRect.cornerRadius = k2712[h1414]; a1590(figRect, k2712); g2703(figRect, k2712, addProps); }
function l2716(g2726) { return g2726[f1409] != null && !isNaN(g2726[f1409]) && g2726[g1411] != null && !isNaN(g2726[g1411]) && g2726[l1412] != null && !isNaN(g2726[l1412]) && g2726[b1413] != null && !isNaN(g2726[b1413]) && g2726[o1419] != null && !isNaN(g2726[o1419]) && g2726[m1425] != null && !isNaN(g2726[m1425]) && g2726[i1430] != null && !isNaN(g2726[i1430]); }
function c2717(g2726, addProps) { if (!l2716(g2726))
    return null; const l2727 = figma.createStar(); v2718(l2727, g2726, addProps, true); return l2727; }
function v2718(l2727, g2726, addProps, isValid = false) { if (!isValid && !l2716(g2726))
    return; l2727.cornerRadius = g2726[o1419]; l2727.pointCount = g2726[m1425]; l2727.innerRadius = Math.min(Math.max(0, g2726[i1430] / 100), 1); a1590(l2727, g2726); g2703(l2727, g2726, addProps); }
const t4273 = [];
function f2719(x2723) { return x2723[u1431] != null && x2723[f1409] != null && !isNaN(x2723[f1409]) && x2723[g1411] != null && !isNaN(x2723[g1411]) && x2723[l1412] != null && !isNaN(x2723[l1412]) && x2723[b1413] != null && !isNaN(x2723[b1413]) && x2723[d1433] != null && x2723[d1433] != NULL && x2723[t1434] != null && !isNaN(x2723[t1434]); }
function v2720(x2723, addProps) { if (!f2719(x2723))
    return null; const e2795 = figma.createText(); e2721(e2795, x2723, addProps, true); return e2795; }
function e2721(e2795, x2723, addProps, isValid = false) { if (!isValid && !f2719(x2723))
    return null; const fontName = { family: x2723[d1433], style: x2723[t1435] }; try {
    if (!t4273.includes(fontName)) {
        figma.loadFontAsync(fontName).then(() => { t4273.push(fontName); l2722(e2795, x2723, fontName, addProps); });
    }
    else {
        l2722(e2795, x2723, fontName, addProps);
    }
}
catch (e) {
    a955(e);
} }
function l2722(e2795, x2723, fontName, addProps) { e2795.fontName = fontName; e2795.fontSize = Math.max(1, x2723[t1434]); e2795.characters = x2723[u1431]; e2795.lineHeight = { unit: 'PERCENT', value: x2723[s1438] }; e2795.letterSpacing = { unit: 'PERCENT', value: x2723[n1439] }; if (x2723[l1436] == 0)
    e2795.textAlignHorizontal = 'LEFT';
else if (x2723[l1436] == 1)
    e2795.textAlignHorizontal = 'CENTER';
else if (x2723[l1436] == 2)
    e2795.textAlignHorizontal = 'RIGHT';
else if (x2723[l1436] == 3)
    e2795.textAlignHorizontal = 'JUSTIFIED'; if (x2723[d1437] == 0)
    e2795.textAlignVertical = 'TOP';
else if (x2723[d1437] == 1)
    e2795.textAlignVertical = 'CENTER';
else if (x2723[d1437] == 2)
    e2795.textAlignVertical = 'BOTTOM'; a1590(e2795, x2723); g2703(e2795, x2723, addProps); if (x2723[y1420] == 0 && x2723[h1426] == 0)
    e2795.textAutoResize = 'WIDTH_AND_HEIGHT';
else if (x2723[y1420] == 0)
    e2795.textAutoResize = 'HEIGHT';
else
    e2795.textAutoResize = 'NONE'; }
function h2778(v2728) { return true; }
function j2749(v2728, addProps) { if (!h2778(v2728))
    return null; const v2729 = figma.createVector(); w2755(v2729, v2728, addProps, true); return v2729; }
function w2755(v2729, v2728, addProps, isValid = false) { if (!isValid && !h2778(v2728))
    return; v2729.setVectorNetworkAsync(v2728[t1416]); a1590(v2729, v2728, false); g2703(v2729, v2728, addProps); }
function k2777(a2724) { return a2724[h1423] != null && !isNaN(a2724[h1423]) && a2724[z1429] != null && !isNaN(a2724[z1429]); }
function w2748(a2724, addProps) { const i2725 = figma.createVector(); f2754(i2725, a2724, addProps, true); return i2725; }
function f2754(i2725, a2724, addProps, isValid = false) { if (!isValid && !k2777(a2724))
    return; i2725.vectorPaths = [{ windingRule: a2724[h1423] == 1 ? 'NONZERO' : 'EVENODD', data: a2724[l1417] }]; i2725.cornerRadius = a2724[z1429]; a1590(i2725, a2724, false); g2703(i2725, a2724, addProps); }
