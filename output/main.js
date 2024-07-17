var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function r1048(key, tag) { return key.substring(0, tag.length + 1) == tag + ' '; }
function v1049(key, tag) { return key.substring(tag.length + 1); }
function n1050(key) { return r1048(key, w877); }
function x1051(key) { return r1048(key, c875); }
function w1052(key) { return r1048(key, n876); }
function d1053(key) { return v1049(key, w877); }
function y1054(key) { return v1049(key, c875); }
function a1055(key) { return v1049(key, n876); }
const generatorVersion = 439;
const g869 = 2147483647;
const NULL = '';
const x870 = '  ';
const f871 = '    ';
const j872 = '\n';
const q873 = '◦ G •';
const p874 = q873 + ' ';
const c875 = 'G_NODE';
const n876 = 'G_CONN';
const w877 = 'G_PAGE';
const z878 = 'G_TEMP';
const minWindowWidth = 602;
const minWindowHeight = 39;
const identity = Object.freeze([[1, 0, 0], [0, 1, 0], [0, 0, 1]]);
const Epsilon = 0.0000001;
const Tau = Math.PI * 2;
var enableAsserts = false;
function y879(x, eps = 0.000000001) { return Math.abs(x) < eps ? 0 : x; }
function nozero(x, eps = 0.000000001) { return x != 0 ? x : (x < 0 ? -eps : eps); }
function b880(v, eps = 0.000000001) { return point(nozero(v.x, eps), nozero(v.y, eps)); }
function equal(a, b, eps = 0.000000001) { return Math.abs(b - a) < eps; }
function sqr(x) { return x * x; }
;
function cube(x) { return x * x * x; }
;
function y881(f) { return Math.floor(f) | 0; }
function m882(x) { x = y881(x); x--; x |= x >> 1; x |= x >> 2; x |= x >> 4; x |= x >> 8; x |= x >> 16; x |= x >> 32; return ++x; }
function gcd(a, b) { let temp; while (1) {
    temp = a % b;
    if (temp == 0)
        return b;
    a = b;
    b = temp;
} }
function distv(p1, p2) { const dx = p2.x - p1.x; const dy = p2.y - p1.y; return Math.sqrt(dx * dx + dy * dy); }
function p883(v) { let angle = Math.atan2(v.y, v.x); if (angle < 0)
    angle += Tau; return angle; }
function anglev2(v1, v2) { return anglev2_(v1.x, v1.y, v2.x, v2.y); }
function anglev2_(x1, y1, x2, y2) { const dx = x2 - x1; const dy = y2 - y1; let angle = Math.atan2(dy, dx); if (angle < 0)
    angle += Tau; return angle; }
function m885(v) { return Math.sqrt(v.x * v.x + v.y * v.y); }
function lengthv_(x, y) { return Math.sqrt(x * x + y * y); }
function o886(v) { return point(v.x == 0 ? 0 : v.x / m885(v), v.y == 0 ? 0 : v.y / m885(v)); }
function dotv(v1, v2) { return v1.x * v2.x + v1.y * v2.y; }
function q887(a1, a2) { let diff = a2 - a1; while (diff <= -Tau / 2)
    diff += Tau; while (diff > Tau / 2)
    diff -= Tau; return diff; }
function e888(v, m) { let v3 = [v.x, v.y, 1]; let r = j948(v3, m); return point(r[0], r[1]); }
function c889(...mm) { l952(mm.length > 0, 'mulm3m3() must take at least one argument'); let result = clone(mm[0]); for (let a = 1; a < mm.length; a++) {
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
function r890(m, s) { for (let i = 0; i < 3; i++)
    for (let j = 0; j < 3; j++)
        m[i][j] /= s; return m; }
function adjugate(m) { return cofactor(transpose(m)); }
function transpose(m) { return [[m[0][0], m[1][0], m[2][0]], [m[0][1], m[1][1], m[2][1]], [m[0][2], m[1][2], m[2][2]]]; }
function cofactor(m) { return [[m[1][1] * m[2][2] - m[2][1] * m[1][2], -(m[1][0] * m[2][2] - m[2][0] * m[1][2]), m[1][0] * m[2][1] - m[2][0] * m[1][1]], [-(m[0][1] * m[2][2] - m[2][1] * m[0][2]), m[0][0] * m[2][2] - m[2][0] * m[0][2], -(m[0][0] * m[2][1] - m[2][0] * m[0][1])], [m[0][1] * m[1][2] - m[1][1] * m[0][2], -(m[0][0] * m[1][2] - m[1][0] * m[0][2]), m[0][0] * m[1][1] - m[1][0] * m[0][1]]]; }
function determinant(m) { return m[0][0] * (m[1][1] * m[2][2] - m[1][2] * m[2][1]) - m[0][1] * (m[1][0] * m[2][2] - m[2][0] * m[1][2]) + m[0][2] * (m[1][0] * m[2][1] - m[2][0] * m[1][1]); }
function f891(m) { return r890(adjugate(m), determinant(m)); }
function e892(angle) { const cosA = y879(Math.cos(angle)); const sinA = y879(Math.sin(angle)); return [[cosA, sinA, 0], [-sinA, cosA, 0], [0, 0, 1]]; }
function r893(x = 0, y = 0, scaleX = 1, scaleY = 1, angle = 0, skewX = 0, skewY = 0) { const cosA = Math.cos(angle); const sinA = Math.sin(angle); return [[scaleX * cosA - skewY * sinA, -skewX * cosA + scaleY * sinA, x], [skewY * cosA + scaleX * sinA, scaleY * cosA + skewX * sinA, y], [0, 0, 1]]; }
function h894(v1, v2) { return v1.x * v2.y - v1.y * v2.x; }
function y895(v1, v2) { return point(v1.x + v2.x, v1.y + v2.y); }
function sqrv(v) { return m896(v, v); }
function m896(v1, v2) { return point(v1.x * v2.x, v1.y * v2.y); }
function x897(v, s) { return point(v.x * s, v.y * s); }
function r898(v1, v2) { return point(v1.x / v2.x, v1.y / v2.y); }
function a899(v, s) { return point(v.x / s, v.y / s); }
function a900(v1, v2) { return point(v1.x - v2.x, v1.y - v2.y); }
function v901(str) { return decodeURI(encodeURIComponent(str)); }
function y902(str) { return decodeURIComponent(encodeURI(str)); }
function r903(bytes) { let str = ''; for (let i = 0; i < bytes.length; i++)
    str += String.fromCharCode(bytes[i]); return str; }
function j904(str) { return Array.from(y902(str), c => c.charCodeAt(0)); }
function z905(array, size) { const newArray = new Uint8Array(size); o906(array, newArray); return newArray; }
function o906(src, dst) { r907(src, 0, src.length, dst, 0, dst.length); }
function r907(src, t908, w909, dst, v910, z911) { const size = Math.min(w909, z911); for (let i = 0; i < size; i++)
    dst[v910 + i] = src[t908 + i]; }
function g912(n913, h914) { if (n913.length != h914.length)
    return false; for (let i = 0; i < n913.length; i++) {
    if (n913[i] != h914[i])
        return false;
} return true; }
function s915(j916, f917) { return j916.findIndex(i => f917.includes(i)) > -1; }
function m918(list) { return list ? '<==' : '<--'; }
;
function h919(list) { return list ? '==>' : '-->'; }
;
function q920(nodeId) { return c875 + ' ' + nodeId; }
function a921(name) { return n876 + ' ' + name; }
function g922(name) { return w877 + ' ' + name; }
function r923(str) { return str.toLowerCase() == 'true' || str == '1'; }
function o924(s925, a926 = false) { return p931(s925.outputNodeId, s925.outputId, s925.outputOrder, s925.inputNodeId, s925.inputId, s925.list, a926); }
function s927(outputNodeId, outputId, outputOrder, inputNodeId, inputId) { return a921(outputNodeId + ' ' + outputId + ' ' + outputOrder + ' ' + inputNodeId + ' ' + inputId); }
function i928(i243) { return s927(i243.outputNodeId, i243.outputId, i243.outputOrder, i243.inputNodeId, i243.inputId); }
function r929(i243) { return s927(i243.output.node.id, i243.output.id, i243.outputOrder, i243.input.node.id, i243.input.id); }
function q930(i243, a926 = false) { return p931(i243.output.node.id, i243.output.id, i243.outputOrder, i243.input.node.id, i243.input.id, i243.list, a926); }
function p931(outputNodeId, outputId, outputOrder, inputNodeId, inputId, list, a926 = false) { const sp = a926 ? ' ' : '  '; const jsp = a926 ? '' : ' '; const arrow = sp + f935(typeof outputOrder == 'string' ? parseInt(outputOrder) : outputOrder) + h919(typeof list == 'string' ? r923(list) : list) + sp; const join = jsp + '.' + jsp; return outputNodeId + join + outputId + arrow + inputNodeId + join + inputId; }
function f932(pageId) { return g922(pageId); }
function y933(num) { const str = num.toString(); let sup = ''; for (const c of str)
    sup += y934(c); return sup; }
function y934(c) { switch (c) {
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
function f935(num) { const str = num.toString(); let sup = ''; for (const c of str)
    sup += a936(c); return sup; }
function a936(c) { switch (c) {
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
function u937(bool) { return bool ? 'true' : 'false'; }
function isValid(val) { return val != undefined && val != null; }
function isEmpty(array) { return array.length == 0; }
function g938(array, item) { j939(array, array.indexOf(item)); }
function j939(array, index) { if (index > -1 && index < array.length)
    array.splice(index, 1); }
function x940(array) { if (isEmpty(array))
    return null; let last = array.at(-1); array.splice(array.length - 1, 1); return last; }
function x941(array) { return array[array.length - 1]; }
function x942(array, from, to) { const item = array[from]; array.splice(from, 1); array.splice(to, 0, item); }
function h943(array, item) { const index = array.indexOf(item); if (index > -1)
    array.splice(index, 1); }
function h944(i2796, array) { for (const item of array) {
    const index = i2796.indexOf(item);
    if (index > -1)
        i2796.splice(index, 1);
} }
function s945(array, where) { const index = array.findIndex(where); if (index > -1)
    array.splice(index, 1); }
function y946(styleId) { return styleId.split(',')[0] + ','; }
function r947(points) { let p4032 = ''; if (points.length < 2)
    return p4032; p4032 += 'M'; p4032 += ' ' + y879(points[0].x); p4032 += ' ' + y879(points[0].y); for (let i = 1; i < points.length; i++) {
    p4032 += ' L' + ' ' + y879(points[i].x) + ' ' + y879(points[i].y);
} return p4032; }
function point(x, y) { return { x: x, y: y }; }
function j948(v, m) { let r = [0, 0, 0]; for (let i = 0; i < 3; i++)
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
        let a111 = {};
        for (const key in val)
            a111[key] = clone(val[key]);
        return a111;
    }
} throw 'unknown'; }
function p949(array, item, equal = null) { if (equal) {
    if (Array.isArray(item))
        item.forEach(i => p949(array, i, equal));
    else if (!array.find(i => equal(i, item)))
        array.push(item);
}
else {
    if (Array.isArray(item))
        item.forEach(i => p949(array, i));
    else if (!array.includes(item))
        array.push(item);
} }
function o950(array, item, equal) { if (Array.isArray(item))
    item.forEach(i => o950(array, i, equal));
else if (!array.find(equal))
    array.push(item); }
function h951(array, item, except) { if (Array.isArray(item))
    item.forEach(i => h951(array, i, except));
else if (!array.find(except))
    array.push(item); }
function l952(...args) { if (enableAsserts) {
    console.assert(...args);
} }
function j953(...args) { if (enableAsserts)
    console.error(...args); }
function k954(str, trim) { while (str.length >= trim.length && str.substring(0, trim.length) == trim)
    str = str.substring(trim.length); return str; }
function a955(str, trim) { while (str.length >= trim.length && str.substring(str.length - trim.length) == trim)
    str = str.substring(0, str.length - trim.length); return str; }
function p956(e4092) { const fills = []; for (const fill of e4092) {
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
            const k4207 = [[0, 1, 0], [0.5, 0.5, 1], [1, 1, 1]];
            let h4208 = [[p0.x, p1.x, p2.x], [p0.y, p1.y, p2.y], [1, 1, 1]];
            h4208 = c889(k4207, f891(h4208));
            h4208 = [h4208[0], h4208[1]];
            const stops = [];
            for (const stop of fill[2]) {
                stops.push({ color: { r: Math.min(Math.max(0, stop[0]), 1), g: Math.min(Math.max(0, stop[1]), 1), b: Math.min(Math.max(0, stop[2]), 1), a: Math.min(Math.max(0, stop[3]), 1) }, position: stop[4] });
            }
            fills.push({ type: fill[0], gradientTransform: h4208, gradientStops: stops, blendMode: fill[3] });
            break;
        }
    }
} return fills; }
function g957(type) { return x1089.includes(type); }
const y1056 = 'LIST#';
const m1057 = 'NLIST#';
const u1058 = 'TLIST#';
const y1059 = 'SLIST#';
const d1060 = 'NULL';
const w1061 = 'VAR';
const p1062 = 'VARGRP';
const p1063 = 'FEEDBK';
const m1064 = 'REPT';
const p1065 = 'CACHE';
const t1066 = 'FRZ';
const n1067 = 'TIMER';
const i1068 = 'VNAME';
const f1352 = 'GVNAMES';
const y1353 = 'VNAMES';
const c1354 = 'ONAME';
const v1069 = 'CMB';
const j1070 = 'LSASIT';
const m1071 = 'EXTR';
const v1072 = 'SETP';
const v1073 = 'GETP';
const w1074 = 'SUBLST';
const g1075 = 'UNIQ';
const q1349 = 'RORD';
const f1350 = 'SHFTLST';
const b1076 = 'REVLST';
const q1351 = 'BUKLST';
const w1077 = 'SORT';
const p1078 = 'CLMN';
const o1079 = 'CELL';
const c1080 = 'LIST';
const k1081 = 'COUNT';
const OBJECT_COUNT = 'OBJCOUNT';
const t1082 = 'LCONT';
const x1083 = 'SELECT';
const a1360 = 'LSTSEL';
const w1084 = 'IF';
const h1085 = 'LSTFLT';
const u1087 = 'ANY#';
const k1088 = [y1056, m1057, u1058, y1059, v1069, m1071, v1072, v1073, w1074, c1080, k1081, t1082, m1064];
const x1089 = [y1056, m1057, u1058, y1059];
const l1086 = 'ITER';
const g1108 = 'PROB';
const HOLD = 'HOLD';
const t1091 = 'NUM#';
const g1092 = 'NUM';
const y1355 = 'NPREC';
const w1093 = 'NSIGN';
const z1094 = 'ABS';
const h1356 = 'NEG';
const e1095 = 'ROUND';
const z1357 = 'QUANT';
const f1096 = 'SMINMAX';
const g1097 = 'MINMAX';
const j1098 = 'LIM';
const l1099 = 'NCURVE';
const x1358 = 'NMAP';
const l1359 = 'NBIAS';
const e1100 = 'NANISNUM';
const i1101 = 'CONST';
const d1102 = 'DATE';
const w1103 = 'SEQ';
const l1104 = 'RANGE';
const a1105 = 'WAVE';
const c1106 = 'RAND';
const a1107 = 'NOISE';
const r1109 = 'ACCUM';
const y1110 = 'LERP';
const c1111 = 'SOLVE';
const w1112 = 'NANIM';
const g1113 = 'SMATH';
const w1114 = 'MATH';
const s1115 = 'ADD';
const d1116 = 'SUB';
const s1117 = 'MUL';
const t1118 = 'DIV';
const f1119 = 'MOD';
const e1120 = 'EXP';
const z1121 = 'NBOOL';
const d1122 = 'NOT';
const k1123 = 'AND';
const s1124 = 'OR';
const p1125 = 'XOR';
const g1126 = 'COND';
const y1127 = 'EQ';
const v1128 = 'NE';
const s1129 = 'LT';
const b1130 = 'LE';
const u1131 = 'GT';
const m1132 = 'GE';
const e1133 = 'TRIG';
const j1134 = 'SIN';
const u1135 = 'COS';
const h1136 = 'TAN';
const x1137 = 'ATAN2';
const l1138 = 'CNVANG';
const d1090 = [d1060, w1061, p1062, ...k1088, j1070, m1071, v1072, v1073, w1074, g1075, q1349, f1350, b1076, q1351, p1078, w1077, o1079, c1080, x1083, a1360, w1084, h1085, p1063, m1064, l1086, g1108, HOLD, p1065, t1066, n1067, i1068, f1352, y1353, c1354];
const v1139 = [w1114, g1113, s1115, d1116, s1117, t1118, f1119, e1120];
const e1140 = [z1121, d1122, k1123, s1124, p1125];
const l1141 = [g1126, y1127, v1128, s1129, b1130, u1131, m1132];
const n1142 = [e1133, j1134, u1135, h1136, x1137];
const t1143 = 'TEXT#';
const z1144 = 'TEXT';
const a1145 = 'TLEN';
const x1146 = 'TTRIM';
const z1147 = 'TSUB';
const a1148 = 'TCONT';
const h1149 = 'TCASE';
const a1150 = 'TREPL';
const n1151 = 'TJOIN';
const n1152 = 'TPAD';
const d1153 = 'TCMP';
const h1154 = 'TCHAR';
const f1155 = 'TUNI';
const f1156 = 'INDEX';
const s1157 = 'N2T';
const d1158 = 'C2T';
const w1159 = 'T2N';
const u1160 = 'T2C';
const d1161 = 'TSPLT';
const t3505 = 'TJSON';
const o1163 = 'TCSV';
const q1164 = 'FETCH';
const d1165 = 'TFILE';
const p1166 = [t1091, m1057, g1092, y1355, w1093, z1094, h1356, e1095, z1357, f1096, g1097, j1098, l1099, x1358, l1359, e1100, i1101, d1102, w1103, l1104, a1105, c1106, a1107, r1109, y1110, c1111, w1112, s1157, h1154, ...v1139, ...e1140, ...l1141, ...n1142, l1138, q1351];
const r1167 = [t1143, u1058, z1144, a1145, x1146, z1147, a1148, h1149, n1151, n1152, a1150, d1153, f1155, f1156, w1159, u1160, d1161, t3505, o1163, q1164, d1165];
const x1168 = 'COL#';
const b1169 = 'COL';
const k1170 = 'CVAL';
const g1171 = 'CCOR';
const g1172 = 'COLP3';
const x1173 = 'CCNT';
const b1174 = 'BLND';
const s1175 = 'CLERP';
const l1176 = 'CBLND';
const j1177 = [x1168, b1169, g1171, g1172, b1174, s1175, l1176, d1158];
const k1178 = 'FILL#';
const r1179 = 'FILL';
const r1180 = [k1178, r1179];
const g1181 = 'STRK#';
const y1182 = 'STRK';
const o1183 = [g1181, y1182];
const p1190 = 'STRKSD#';
const o1191 = 'STRKSD';
const t1192 = [p1190, o1191];
const r1184 = 'CSTOP#';
const n1185 = 'CSTOP';
const h1186 = [r1184, n1185];
const i1187 = 'GRAD#';
const x1188 = 'GRAD';
const d1189 = [i1187, x1188];
const p1193 = 'RCRN#';
const b1194 = 'RCRN';
const a1195 = [p1193, b1194];
const g1196 = 'DRSH#';
const z1197 = 'DRSH';
const c1198 = [g1196, z1197];
const w1199 = 'INSH#';
const k1200 = 'INSH';
const g1201 = [w1199, k1200];
const c1202 = 'LBLR#';
const y1203 = 'LBLR';
const w1204 = [c1202, y1203];
const t1205 = 'BBLR#';
const h1206 = 'BBLR';
const p1207 = [t1205, h1206];
const c1208 = 'MASK#';
const o1209 = 'MASK';
const u1210 = [c1208, o1209];
const v1211 = 'BLEND#';
const h1212 = 'BLEND';
const m1213 = [v1211, h1212];
const e1214 = [...t1192, ...a1195, ...c1198, ...g1201, ...w1204, ...p1207, ...m1213, ...u1210];
const o1215 = [x1168, k1178, i1187, g1181, p1190, g1196, w1199, c1202, t1205, v1211, c1208];
const e1216 = 'CSTL';
const p1217 = 'SHP#';
const w1218 = 'RECT#';
const d1219 = 'RECT';
const v1220 = [w1218, d1219];
const h1221 = 'LINE#';
const t1222 = 'LINE';
const t1223 = [h1221, t1222];
const m1224 = 'ELPS#';
const w1225 = 'ELPS';
const n1226 = [m1224, w1225];
const r1227 = 'TRPZ#';
const w1228 = 'TRPZ';
const a1229 = [r1227, w1228];
const d1236 = 'POLY#';
const a1237 = 'POLY';
const r1238 = [d1236, a1237];
const x1239 = 'STAR#';
const f1240 = 'STAR';
const s1241 = [x1239, f1240];
const f1242 = 'TXTS#';
const j1243 = 'TXTS';
const j1244 = [f1242, j1243];
const t1245 = 'PT#';
const g1246 = 'PT';
const h1247 = [t1245, g1246];
const k1248 = 'PCORN';
const m1249 = 'VPATH#';
const v1250 = 'VPATH';
const r1251 = [m1249, v1250];
const c1252 = 'VPT#';
const z1253 = 'VPT';
const a1254 = [c1252, z1253];
const d1255 = 'VEDGE#';
const m1256 = 'VEDGE';
const j1257 = [d1255, m1256];
const l1258 = 'VREG#';
const a1259 = 'VREG';
const g1260 = [l1258, a1259];
const q1261 = 'VNET#';
const s1262 = 'VNET';
const c1263 = [q1261, s1262];
const c1264 = 'SGRP#';
const i1265 = 'SGRP';
const o1266 = [c1264, i1265];
const t1267 = 'FRM#';
const f1268 = 'FRM';
const t1269 = [t1267, f1268];
const m1231 = 'ARC#';
const l1230 = 'ARC';
const h1232 = [m1231, l1230];
const g1234 = 'WAVEP#';
const o1233 = 'WAVEP';
const l1235 = [g1234, o1233];
const k1270 = 'MOVE';
const e1271 = 'ROT';
const y1272 = 'SCALE';
const z1273 = 'SKEW';
const SHOW_CENTER = 'SHOWCNTR';
const x1274 = 'SCENTR';
const d1275 = 'RSTX';
const b1276 = 'PLACE';
const k1277 = 'APPLY';
const PATH_LENGTH = 'PTHLEN';
const JOIN_PATHS = 'JOINPTH';
const REORIENT_PATHS = 'REORPTH';
const e1284 = 'PTALPATH';
const u1285 = 'CPTONPATH';
const k1278 = 'MESPT';
const s1279 = 'PTANGLE';
const p1280 = 'VECLEN';
const g1281 = 'CIRCEN';
const ARC_FROM_POINTS = 'ARCPT';
const g1282 = 'INTLIN';
const j1283 = 'PTLERP';
const REVERSE_PATH = 'REVPTH';
const BLEND_PATH = 'BLENDPTH';
const PATH_TYPES = [v1250, w1228, l1230, o1233];
const PATH_VALUES = [m1249, r1227, m1231, g1234];
const j1286 = 'SBOOL';
const h1287 = 'SBOOL#';
const n1288 = 'SBOOLU';
const c1289 = 'SBOOLS';
const z1290 = 'SBOOLI';
const u1291 = 'SBOOLE';
const o1292 = [j1286, h1287, n1288, c1289, z1290, u1291];
const r1293 = 'RENDER';
const EXPORT = 'EXPORT';
const r1294 = [p1217, y1059, w1218, h1221, m1224, r1227, d1236, x1239, f1242, t1245, m1249, c1252, d1255, l1258, q1261, m1231, g1234, c1264, t1267, h1287, g1196, w1199, c1202, t1205, v1211, c1208];
const p1295 = [e1271, y1272, z1273];
const z1296 = [...r1294, ...v1220, ...t1223, ...n1226, ...a1229, ...r1238, ...s1241, ...j1244, ...h1247, k1248, ...r1251, ...a1254, ...j1257, ...g1260, ...c1263, ...h1232, ...l1235, ...o1266, ...t1269, ...o1292, k1270, ...p1295, SHOW_CENTER, x1274, d1275, b1276, k1277, PATH_LENGTH, JOIN_PATHS, REORIENT_PATHS, e1284, u1285, k1278, s1279, p1280, g1281, l1230, o1233, ARC_FROM_POINTS, g1282, j1283, REVERSE_PATH, BLEND_PATH, r1293, EXPORT];
const d1297 = [y1056, m1057, u1058, y1059, t1091, t1143, x1168, k1178, r1184, i1187, g1181, r1184, i1187, p1217, w1218, h1221, m1224, r1227, d1236, x1239, f1242, t1245, m1249, c1252, d1255, l1258, q1261, c1264, t1267, p1193, g1196, w1199, c1202, t1205, v1211, c1208];
const g1298 = 'GROUP';
const a1299 = 'GPARAM';
const f1300 = [g1298, a1299];
const n1301 = 'CMNT';
const b1302 = 'CMNTARR';
const q1303 = 'PANEL';
const c1304 = 'ACT';
const r1305 = 'BFACT';
const s1306 = 'BFLST';
const d1307 = 'DIS';
const c1308 = 'NOC';
const PARAM = 'PARAM';
const x1309 = 'LOG';
const c1310 = 'GRAPH';
const b1311 = [[f1119, '%'], [t1118, '/'], [d1116, '−'], [s1115, '+'], [s1117, '×'], [e1120, 'e<sup>x']];
const y1312 = [[t1118, '/'], [d1116, '−'], [s1115, '+'], [s1117, '×']];
const s1313 = 0;
const l1314 = 1;
const a1315 = 2;
const j1316 = 3;
const j1317 = [[s1313, 'not'], [l1314, 'xor'], [a1315, 'or'], [j1316, 'and']];
const y1318 = 0;
const i1319 = 1;
const y1320 = 2;
const g1321 = 3;
const f1322 = 4;
const c1323 = 5;
const t1324 = [[y1318, '<'], [i1319, '≤'], [y1320, '≠'], [g1321, '='], [f1322, '≥'], [c1323, '>']];
const q1325 = 0;
const q1326 = 1;
const g1327 = 2;
const h1328 = 3;
const i1329 = 4;
const d1330 = 5;
const x1331 = [[q1325, 'sin'], [q1326, 'cos'], [g1327, 'tan'], [h1328, 'asin'], [i1329, 'acos'], [d1330, 'atan']];
const e1332 = 'EMPTY';
const j1333 = 'CONNECT';
const n1334 = 'CREATE';
const b1335 = 'CREATE_INSERT';
const e1336 = 'DELETE';
const p1337 = 'DISCONNECT';
const h1338 = 'LINK_STYLE';
const n1339 = 'LINK_VARIABLE';
const b1340 = 'LINK_VARIABLE_GROUP';
const g1341 = 'MAKE_ACTIVE';
const MAKE_NOT_CONDITION_ACTION = 'MAKE_NOT_CONDITION';
const f1342 = 'MAKE_PASSIVE';
const q1343 = 'PASTE';
const a1344 = 'RECONNECT';
const y1345 = 'REMOVE';
const v1346 = 'RENAME';
const v1347 = 'REORDER_INPUTS';
const f1348 = 'REORDER_CONNECTIONS';
const m1361 = 'SELECT';
const v1362 = 'SELECT_MOVE';
const t1363 = 'MOVE_NODES';
const t1364 = 'SET_PARAM_VALUE';
const SET_MULTIPLE_VALUES_ACTION = 'SET_MULTIPLE_VALUES';
const f1365 = 'SET_PARAM_SETTING';
const w1366 = 'SET_NODE_RECT';
const p1367 = 'TOGGLE_DISABLE';
const f1368 = 'TOGGLE_PARAM_HEADER';
const j1369 = 'SET_CURRENT_GRAPH';
const w1370 = 'CREATE_PAGE';
const t1371 = 'DELETE_PAGE';
const b1372 = 'GROUP_NODES';
const k1373 = 'UNGROUP_NODES';
const g1374 = 'HIGHLIGHT_NODES';
const SCROLL_LIST_NODE_ACTION = 'SCROLL_LIST_NODE';
const SET_LIST_DIVIDER_ACTION = 'SET_LIST_DIVIDER';
const SET_NODE_PARAM_ACTION = 'SET_NODE_PARAM';
const r1375 = 'BNORM';
const b1376 = 'BDARK';
const p1377 = 'BMULT';
const c1378 = 'BPDRK';
const v1379 = 'BBURN';
const u1380 = 'BLITE';
const u1381 = 'BSCRN';
const b1382 = 'BPLGT';
const r1383 = 'BDODG';
const c1384 = 'BOVER';
const n1385 = 'BSOFT';
const r1386 = 'BHARD';
const g1387 = 'BDIFF';
const g1388 = 'BEXCL';
const o1389 = 'BHUE';
const u1390 = 'BSAT';
const f1391 = 'BCOL';
const s1392 = 'BLUM';
const w1393 = [[r1375, 'normal', 'NORMAL'], [b1376, 'darken', 'DARKEN'], [p1377, 'multiply', 'MULTIPLY'], [c1378, 'plus darker', 'LINEAR_BURN'], [v1379, 'color burn', 'COLOR_BURN'], [u1380, 'lighten', 'LIGHTEN'], [u1381, 'screen', 'SCREEN'], [b1382, 'plus lighter', 'LINEAR_DODGE'], [r1383, 'color dodge', 'COLOR_DODGE'], [c1384, 'overlay', 'OVERLAY'], [n1385, 'soft light', 'SOFT_LIGHT'], [r1386, 'hard light', 'HARD_LIGHT'], [g1387, 'difference', 'DIFFERENCE'], [g1388, 'exclusion', 'EXCLUSION'], [o1389, 'hue', 'HUE'], [u1390, 'saturation', 'SATURATION'], [f1391, 'color', 'COLOR'], [s1392, 'luminosity', 'LUMINOSITY']];
const m1394 = [['thin', 100], ['extra light', 200], ['light', 300], ['regular', 400], ['medium', 500], ['semi bold', 600], ['bold', 700], ['extra bold', 800], ['black', 900]];
const p1395 = 0;
const l1396 = 1;
const l1397 = 2;
const w1398 = 2;
const u1399 = 3;
const b1400 = 3;
const g1401 = 4;
const q1402 = 4;
const v1403 = 5;
const u1404 = 6;
const m1405 = 7;
const o1406 = 8;
const u1407 = 9;
const r1408 = 10;
const l1409 = 11;
const w1410 = 12;
const r1411 = 13;
const w1412 = 14;
const b1413 = 15;
const q1414 = 16;
const g1415 = 17;
const k1416 = 18;
const d1417 = 19;
const r1418 = 20;
const f1419 = 21;
const n1420 = 22;
const q1421 = 23;
const i1422 = 24;
const q1453 = 24;
const q1423 = 24;
const p1424 = 25;
const h1454 = 25;
const q1425 = 26;
const a1426 = 27;
const f1427 = 28;
const y1428 = 28;
const r1429 = 28;
const f1430 = 28;
const q1431 = 28;
const t1432 = 28;
const h1433 = 28;
const u1434 = 28;
const o1435 = 29;
const e1436 = 29;
const f1437 = 29;
const w1438 = 29;
const q1439 = 29;
const k1455 = 29;
const x1441 = 30;
const o1442 = 30;
const v1443 = 30;
const s1444 = 30;
const y1440 = 30;
const c1445 = 31;
const i1446 = 31;
const r1447 = 32;
const f1448 = 33;
const f1449 = 34;
const e1450 = 35;
const h1451 = 36;
const u1452 = 37;
const y2797 = '12345679ABCDEFGHJKLMNPQRSTUVWXYZ';
function s847(array, chars = y2797) { let h849 = ''; let len = array.length; let i = 0; while (len > 0) {
    if (len >= 5) {
        const a0 = array[i], a1 = array[i + 1], a2 = array[i + 2], a3 = array[i + 3], a4 = array[i + 4];
        h849 += chars[(a0 & 0xF8) >>> 3];
        h849 += chars[((a0 & 0x07) << 2) | ((a1 & 0xC0) >>> 6)];
        h849 += chars[(a1 & 0x3E) >>> 1];
        h849 += chars[((a1 & 0x01) << 4) | ((a2 & 0xF0) >>> 4)];
        h849 += chars[((a2 & 0x0F) << 1) | ((a3 & 0x80) >>> 7)];
        h849 += chars[(a3 & 0x7C) >>> 2];
        h849 += chars[((a3 & 0x03) << 3) | ((a4 & 0xE0) >>> 5)];
        h849 += chars[(a4 & 0x1F)];
    }
    else if (len == 4) {
        const a0 = array[i], a1 = array[i + 1], a2 = array[i + 2], a3 = array[i + 3];
        h849 += chars[(a0 & 0xF8) >>> 3];
        h849 += chars[((a0 & 0x07) << 2) | ((a1 & 0xC0) >>> 6)];
        h849 += chars[(a1 & 0x3E) >>> 1];
        h849 += chars[((a1 & 0x01) << 4) | ((a2 & 0xF0) >>> 4)];
        h849 += chars[((a2 & 0x0F) << 1) | ((a3 & 0x80) >>> 7)];
        h849 += chars[(a3 & 0x7C) >>> 2];
        h849 += chars[((a3 & 0x03) << 3)];
    }
    else if (len == 3) {
        const a0 = array[i], a1 = array[i + 1], a2 = array[i + 2];
        h849 += chars[(a0 & 0xF8) >>> 3];
        h849 += chars[((a0 & 0x07) << 2) | ((a1 & 0xC0) >>> 6)];
        h849 += chars[(a1 & 0x3E) >>> 1];
        h849 += chars[((a1 & 0x01) << 4) | ((a2 & 0xF0) >>> 4)];
        h849 += chars[((a2 & 0x0F) << 1)];
    }
    else if (len == 2) {
        const a0 = array[i], a1 = array[i + 1];
        h849 += chars[(a0 & 0xF8) >>> 3];
        h849 += chars[((a0 & 0x07) << 2) | ((a1 & 0xC0) >>> 6)];
        h849 += chars[(a1 & 0x3E) >>> 1];
        h849 += chars[((a1 & 0x01) << 4)];
    }
    else if (len == 1) {
        const a0 = array[i];
        h849 += chars[(a0 & 0xF8) >>> 3];
        h849 += chars[((a0 & 0x07) << 2)];
    }
    i += 5;
    len -= 5;
} return h849; }
function x848(h849, chars = y2797) { const array = []; let len = h849.length; let c = 0; while (len > 0) {
    if (len >= 8) {
        const c0 = chars.indexOf(h849[c]), c1 = chars.indexOf(h849[c + 1]), c2 = chars.indexOf(h849[c + 2]), c3 = chars.indexOf(h849[c + 3]), c4 = chars.indexOf(h849[c + 4]), c5 = chars.indexOf(h849[c + 5]), c6 = chars.indexOf(h849[c + 6]), c7 = chars.indexOf(h849[c + 7]);
        array.push((c0 << 3) | ((c1 & 0x1C) >>> 2));
        array.push(((c1 & 0x03) << 6) | (c2 << 1) | ((c3 & 0x10) >>> 4));
        array.push(((c3 & 0x0F) << 4) | ((c4 & 0x1E) >>> 1));
        array.push(((c4 & 0x01) << 7) | (c5 << 2) | ((c6 & 0x18) >>> 3));
        array.push(((c6 & 0x07) << 5) | c7);
    }
    else if (len == 7) {
        const c0 = chars.indexOf(h849[c]), c1 = chars.indexOf(h849[c + 1]), c2 = chars.indexOf(h849[c + 2]), c3 = chars.indexOf(h849[c + 3]), c4 = chars.indexOf(h849[c + 4]), c5 = chars.indexOf(h849[c + 5]), c6 = chars.indexOf(h849[c + 6]);
        array.push((c0 << 3) | ((c1 & 0x1C) >>> 2));
        array.push(((c1 & 0x03) << 6) | (c2 << 1) | ((c3 & 0x10) >>> 4));
        array.push(((c3 & 0x0F) << 4) | ((c4 & 0x1E) >>> 1));
        array.push(((c4 & 0x01) << 7) | (c5 << 2) | ((c6 & 0x18) >>> 3));
    }
    else if (len == 5) {
        const c0 = chars.indexOf(h849[c]), c1 = chars.indexOf(h849[c + 1]), c2 = chars.indexOf(h849[c + 2]), c3 = chars.indexOf(h849[c + 3]), c4 = chars.indexOf(h849[c + 4]);
        array.push((c0 << 3) | ((c1 & 0x1C) >>> 2));
        array.push(((c1 & 0x03) << 6) | (c2 << 1) | ((c3 & 0x10) >>> 4));
        array.push(((c3 & 0x0F) << 4) | ((c4 & 0x1E) >>> 1));
    }
    else if (len == 4) {
        const c0 = chars.indexOf(h849[c]), c1 = chars.indexOf(h849[c + 1]), c2 = chars.indexOf(h849[c + 2]), c3 = chars.indexOf(h849[c + 3]);
        array.push((c0 << 3) | ((c1 & 0x1C) >>> 2));
        array.push(((c1 & 0x03) << 6) | (c2 << 1) | ((c3 & 0x10) >>> 4));
    }
    else if (len == 2) {
        const c0 = chars.indexOf(h849[c]), c1 = chars.indexOf(h849[c + 1]);
        array.push((c0 << 3) | ((c1 & 0x1C) >>> 2));
    }
    c += 8;
    len -= 8;
} return array; }
function logSavedNode(nodeKey, o4007) {
    return __awaiter(this, void 0, void 0, function* () { const log = c2120(yield b1564(nodeKey, false)); if (o4007) {
        console.log('%c%s\n%c%s', 'background: #fa24; color: white;', y1054(nodeKey), 'background: #fa44; color: #edc;', log);
    }
    else {
        console.log('%c%s\n%c%s', 'background: #fdb; color: black;', y1054(nodeKey), 'background: #fed; color: black;', log);
    } });
}
function c2120(json) { let u4033 = json.replace('{\n', '').replace('\n}', '').replace('[\n' + x870, '').replace('\n' + x870 + ']', '').split(x870 + '"params":\n').join('').split('": "').join(': ').split('", "').join(': ').split(x870 + '"').join(x870).split(x870 + x870 + '["').join(x870 + x870).split('",\n').join('\n').split('"\n').join('\n').split('"],\n').join('\n'); if (u4033[u4033.length - 1] == '"')
    u4033 = u4033.substring(0, u4033.length - 1); if (u4033.substring(u4033.length - 2) == '"]')
    u4033 = u4033.substring(0, u4033.length - 2); return u4033; }
function d2121(json) { let u4033 = json.replace('{\n', '').replace('\n}', '').replace('[\n' + x870, '').replace('\n' + x870 + ']', ''); return u4033; }
function e2122(i243, o4007) { const p4211 = o924(i243, true); if (o4007) {
    console.log('%c%s', 'background: #4f44; color: #ded', p4211);
}
else {
    console.log('%c%s', 'background: #cfc; color: black;', p4211);
} }
console.clear();
figma.payments.setPaymentStatusInDevelopment({ type: 'PAID' });
figma.loadAllPagesAsync().then(() => { figma.on('documentchange', n1535); figma.on('selectionchange', j1543); figma.on('close', z1536); });
w1525(true);
figma.clientStorage.getAsync('pro').then(data => { figma.showUI(__html__, { visible: false, themeColors: true, title: 'Generator' }); });
var c2709 = figma.viewport.zoom;
setInterval(x1540, 100);
var strBackgrounds = '';
setInterval(figCheckBackgrounds, 500);
const r2798 = 'clock_';
const m2799 = 1000;
var d2800 = false;
var objectCenterSize = 15;
function w1537() { (function () {
    return __awaiter(this, void 0, void 0, function* () { figma.currentPage.loadAsync().then(() => __awaiter(this, void 0, void 0, function* () { let e2801 = yield figma.currentPage.getPluginData(figma.currentUser.id + ',windowWidth'); let y2802 = yield figma.currentPage.getPluginData(figma.currentUser.id + ',windowHeight'); let p2803; let n2804; if (e2801 === NULL) {
        p2803 = 800;
        figma.currentPage.setPluginData(figma.currentUser.id + ',windowWidth', e2801.toString());
    }
    else
        p2803 = parseInt(e2801); if (y2802 === NULL) {
        n2804 = 600;
        figma.currentPage.setPluginData(figma.currentUser.id + ',windowHeight', y2802.toString());
    }
    else
        n2804 = parseInt(y2802); figma.ui.resize(Math.max(minWindowWidth, p2803), Math.max(minWindowHeight, n2804)); figma.ui.show(); const fonts = yield figma.listAvailableFontsAsync(); const eula = (yield figma.clientStorage.getAsync('eula')) === 'true'; const tutorials = (yield figma.clientStorage.getAsync('tutorials')) === 'true'; const isLocked = yield s1542(); a1544({ cmd: 'uiReturnFigStartGenerator', currentUser: figma.currentUser, viewportRect: figma.viewport.bounds, viewportZoom: figma.viewport.zoom, fonts: fonts, eula: eula, tutorials: tutorials, isLocked: isLocked, windowWidth: p2803, windowHeight: n2804 }); })); });
})(); }
function o1538() { w1525(); figma.showUI(__html__, { visible: false, themeColors: true }); }
function n1539() { setInterval(c1541, m2799); }
function x1540() { if (figma.viewport.zoom == c2709)
    return; c2709 = figma.viewport.zoom; h2697(); s1558(); s1560(); }
function figCheckBackgrounds() { if (strBackgrounds != JSON.stringify(figma.currentPage.backgrounds)) {
    s1558();
    strBackgrounds = JSON.stringify(figma.currentPage.backgrounds);
} }
function c1541() { v1565(r2798 + figma.currentUser.sessionId.toString(), Date.now().toString()); }
function s1542() {
    return __awaiter(this, void 0, void 0, function* () { yield figma.currentPage.loadAsync(); const clocks = figma.currentPage.getPluginDataKeys().filter(k => k.length > r2798.length && k.substring(0, r2798.length) == r2798 && k.substring(r2798.length) != figma.currentUser.sessionId.toString()).map((k) => __awaiter(this, void 0, void 0, function* () { return parseInt(yield b1564(k)); })); clocks.sort(); const now = Date.now(); const locked = clocks.length > 0 && now - (yield clocks[clocks.length - 1]) < m2799 * 2; return locked; });
}
function j1543() { h2697(); }
var h2730 = new Array();
var y2732 = new Array();
function figGetObjectsFromIds(objectIds) {
    return __awaiter(this, void 0, void 0, function* () { for (let i = m2766.length - 1; i >= 0; i--)
        if (!m2766[i].removed && objectIds.includes(m2766[i].getPluginData('objectId')))
            m2766.splice(i, 1); for (let i = c2782.length - 1; i >= 0; i--)
        if (c2782[i].removed || objectIds.includes(c2782[i].getPluginData('objectId')))
            c2782.splice(i, 1); yield figma.currentPage.loadAsync(); return figma.currentPage.findAll(o => objectIds.includes(o.getPluginData('objectId'))); });
}
function k1524(nodeIds) {
    return __awaiter(this, void 0, void 0, function* () { for (let i = m2766.length - 1; i >= 0; i--)
        if (!m2766[i].removed && nodeIds.includes(m2766[i].getPluginData('nodeId')))
            m2766.splice(i, 1); for (let i = c2782.length - 1; i >= 0; i--)
        if (c2782[i].removed || nodeIds.includes(c2782[i].getPluginData('nodeId')))
            c2782.splice(i, 1); yield figma.currentPage.loadAsync(); figma.currentPage.findAll(o => nodeIds.includes(o.getPluginData('nodeId'))).forEach(o => { if (!o.removed)
        o.remove(); }); h2730 = h2730.filter(a => !nodeIds.includes(a.nodeId)); });
}
function w1525(g1526 = false) { for (const n1531 of figma.currentPage.children) {
    if (n1531.removed)
        continue;
    if (n1531.getPluginData('objectId') != '' && n1531.getPluginData('userId') == figma.currentUser.id && (parseInt(n1531.getPluginData('retain')) == 0 || g1526))
        n1531.remove();
} }
function o1527(nodeIds, w1528) { for (let i = h2730.length - 1; i >= 0; i--) {
    const c2731 = h2730[i];
    if (!nodeIds.includes(c2731.nodeId))
        continue;
    for (let j = c2731.objects.length - 1; j >= 0; j--) {
        const n1531 = c2731.objects[j];
        if (n1531.removed || !s1529(n1531, w1528)) {
            if (!n1531.removed)
                n1531.remove();
            h943(c2731.objects, n1531);
            if (m2766.includes(n1531))
                h943(m2766, n1531);
            if (c2782.includes(n1531))
                h943(c2782, n1531);
        }
        if (!n1531.removed) {
            if (parseInt(n1531.getPluginData('retain')) == 2)
                e1550(n1531);
        }
    }
    if (isEmpty(c2731.objects))
        h943(h2730, c2731);
} }
function s1529(n1531, w1528) { if (n1531.type == i1265 || n1531.type == f1268) {
    for (const child of n1531.children) {
        const found = s1529(child, w1528);
        if (found)
            return found;
    }
}
else {
    const found = w1528.find(o => n1531.getPluginData('objectId') == o[l1397] && n1531.getPluginData('userId') == figma.currentUser.id || o[v1403] == 2 && o[v1403] == n1531.getPluginData('retain'));
    if (found)
        return found;
} return null; }
function w1532(nodeIds, m1533) { figma.getLocalPaintStylesAsync().then(paintStyles => { paintStyles.filter(s => nodeIds.includes(s.getPluginData('nodeId'))).forEach(s => { const nodeId = s.getPluginData('nodeId'); const existing = r923(s.getPluginData('existing')); if (!existing) {
    s.remove();
}
else if (m1533) {
    s945(y2732, a => a.nodeId == nodeId);
    s.setPluginData('type', NULL);
    s.setPluginData('nodeId', NULL);
    s.setPluginData('existing', NULL);
} }); }); if (m1533)
    y2732 = y2732.filter(a => !nodeIds.includes(a.nodeId)); }
var i1534 = false;
function n1535(e) { for (const change of e.documentChanges) {
    switch (change.type) {
        case 'STYLE_CREATE':
            if (!change.style)
                break;
            if (!i1534) {
                change.style.setPluginData('type', NULL);
                change.style.setPluginData('nodeId', NULL);
                change.style.setPluginData('existing', NULL);
            }
            break;
        case 'STYLE_PROPERTY_CHANGE': {
            if (!change.style)
                break;
            if (!i1534) {
                const msg = { cmd: 'uiStylePropertyChange', styleId: y946(change.id), properties: change.properties, name: '', paints: [] };
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
                a1544(msg);
            }
            break;
        }
        case 'STYLE_DELETE':
            a1544({ cmd: 'uiStyleDelete', styleId: change.id });
            break;
    }
} i1534 = false; }
function z1536() { w1525(); a1544({ cmd: 'updateMetrics' }); }
figma.ui.onmessage = function (msg) { msg = JSON.parse(msg); if (msg.cmd == 'returnUiGetValueForFigma')
    return; switch (msg.cmd) {
    case 'figStartGenerator':
        w1537();
        break;
    case 'figRestartGenerator':
        o1538();
        break;
    case 'figFinishStart':
        n1539();
        break;
    case 'figDockWindowNormal':
        x2739('normal');
        break;
    case 'figDockWindowMaximize':
        x2739('maximize');
        break;
    case 'figDockWindowTop':
        x2739('top');
        break;
    case 'figDockWindowLeft':
        x2739('left');
        break;
    case 'figDockWindowRight':
        x2739('right');
        break;
    case 'figDockWindowBottom':
        x2739('bottom');
        break;
    case 'figGetMousePosition':
        e1610(msg.clientPosition);
        break;
    case 'figResizeWindow':
        p1613(msg.width, msg.height);
        break;
    case 'figSetWindowRect':
        c1611(msg.x, msg.y, msg.width, msg.height);
        break;
    case 'figNotify':
        o1614(msg);
        break;
    case 'figGetLocalData':
        x1562(msg.key);
        break;
    case 'figSetLocalData':
        r1563(msg.key, msg.value);
        break;
    case 'figClearAllLocalData':
        o4028();
        break;
    case 'figGetPageData':
        b1564(msg.key);
        break;
    case 'figSetPageData':
        v1565(msg.key, msg.value);
        break;
    case 'figSavePages':
        d1570(msg.pageIds, msg.pageJson, msg.currentPageId);
        break;
    case 'figLoadNodesAndConns':
        p1567(msg.debugMode);
        break;
    case 'figSaveNodes':
        n1571(msg.nodeIds, msg.nodeJson);
        break;
    case 'figGetAllLocalTemplateNames':
        r2736();
        break;
    case 'figSaveLocalTemplate':
        o1572(msg.j4029, msg.template);
        break;
    case 'figRemoveConnsToNodes':
        a1573(msg.nodeIds);
        break;
    case 'figRemoveSavedNodesAndConns':
        j1574(msg.nodeIds);
        break;
    case 'figRemoveAllSavedNodesAndConns':
        h1575();
        break;
    case 'figLogAllSavedNodesAndConns':
        d1576(msg.o4007);
        break;
    case 'figLogAllSavedNodes':
        e1577(msg.o4007);
        break;
    case 'figLogAllSavedConns':
        x1578(msg.o4007);
        break;
    case 'figLogAllSavedPageKeys':
        d1579(msg.o4007);
        break;
    case 'figLogAllSavedPages':
        s1580(msg.o4007);
        break;
    case 'figLogAllSavedConnKeys':
        b1581(msg.o4007);
        break;
    case 'figLogAllLocalData':
        q1582(msg.o4007);
        break;
    case 'figGetValue':
        t1583(msg.key, msg.spec);
        break;
    case 'figRemoveSavedPage':
        r1585(msg.pageId);
        break;
    case 'figRemoveAllSavedPages':
        n1586();
        break;
    case 'figSaveConnection':
        n1587(msg.key, msg.json);
        break;
    case 'figSaveConnections':
        k1588(msg.keys, msg.json);
        break;
    case 'figUpdateSavedConnections':
        z1589(msg.curKeys, msg.newKeys, msg.json);
        break;
    case 'figDeleteSavedConnection':
        h1590(msg.key);
        break;
    case 'figRemoveAllSavedConnections':
        n1591();
        break;
    case 'figDeleteSavedConnectionsToNode':
        d1592(msg.nodeId);
        break;
    case 'figDeleteSavedConnectionsFromNode':
        g1593(msg.nodeId);
        break;
    case 'figRemovePluginDataFromAllLocalStyles':
        v1594();
        break;
    case 'figGetAllLocalVariables':
        e1618(msg.nodeId, msg.px, msg.py);
        break;
    case 'figLinkNodeToVariable':
        i1620(msg.nodeId, msg.variableId);
        break;
    case 'figUpdateVariable':
        figUpdateVariableAsync(msg.variableId, msg.value);
        break;
    case 'figGetAllLocalColorStyles':
        l1595(msg.nodeId, msg.px, msg.py);
        break;
    case 'figLinkNodeToExistingColorStyle':
        f1596(msg.nodeId, msg.styleId);
        break;
    case 'figExport':
        figExport(msg.objectIds, msg.scale, msg.format, msg.suffix);
        break;
    case 'figGetObjectSize':
        c1549(msg.object);
        break;
    case 'figGetVariableUpdates':
        n1584(msg.linkedVarIds);
        break;
    case 'figUpdateShowIds':
        d2800 = msg.d2800;
        break;
    case 'figUpdateObjectCenterSize':
        objectCenterSize = msg.objectCenterSize;
        break;
    case 'figDeleteAllObjects':
        w1525();
        break;
    case 'figUpdateObjectsAndStyles':
        p2745 = 0;
        w2746 = 0;
        msg.objects.forEach(o => o.counted = false);
        p2733(null, msg.objects, msg.e4021, msg.p2068, msg.nodeIds, msg.y2762, msg.r2763, msg.j270);
        o1601(msg);
        break;
    case 'figDeleteObjectsAndStyles':
        k1524(msg.nodeIds);
        w1532(msg.nodeIds, msg.m1533);
        break;
    case 'figDeleteObjectsExcept':
        o1527(msg.nodeIds, msg.ignoreObjects);
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
} a1544({ cmd: 'uiEndFigMessage', msgCmd: msg.cmd }); };
function a1544(msg) { figma.ui.postMessage(JSON.stringify(msg)); }
function v2734(key) {
    return __awaiter(this, void 0, void 0, function* () { return yield figma.clientStorage.getAsync(key); });
}
function x1562(key) { figma.currentPage.loadAsync().then(() => { if (key == 'canvasEmpty') {
    a1544({ cmd: 'uiReturnFigGetLocalData', key: key, value: figma.currentPage.children.length == 0 });
}
else if (key == 'debugWarningCrash') {
    figma.clientStorage.getAsync('debugWarning').then(data => { a1544({ cmd: 'uiReturnFigGetLocalData', key: key, value: data }); });
}
else {
    figma.clientStorage.getAsync(key).then(data => { a1544({ cmd: 'uiReturnFigGetLocalData', key: key, value: data }); });
} }); }
function r1563(key, value, postToUi = true) { figma.clientStorage.setAsync(key, value); if (postToUi) {
    a1544({ cmd: 'uiReturnFigSetLocalData', key: key, value: value });
} }
function o4028() {
    return __awaiter(this, void 0, void 0, function* () { const keys = yield figma.clientStorage.keysAsync(); for (const key of keys)
        figma.clientStorage.deleteAsync(key); });
}
function b1564(key, postToUi = true) {
    return __awaiter(this, void 0, void 0, function* () { yield figma.currentPage.loadAsync(); const data = figma.currentPage.getPluginData(key); if (postToUi) {
        a1544({ cmd: 'uiReturnFigGetPageData', key: key, value: data });
    } return data; });
}
function v1565(key, value) { n1566(key); figma.currentPage.setPluginData(key, value); }
function n1566(key) { figma.currentPage.setPluginData(key, ''); }
function p1567(debugMode) { figma.currentPage.loadAsync().then(() => { const pageKeys = figma.currentPage.getPluginDataKeys().filter(k => n1050(k)); const nodeKeys = figma.currentPage.getPluginDataKeys().filter(k => x1051(k)); const connKeys = figma.currentPage.getPluginDataKeys().filter(k => w1052(k)); if (!debugMode)
    h1569(nodeKeys, connKeys); const pages = pageKeys.map(k => figma.currentPage.getPluginData(k)); const nodes = nodeKeys.map(k => figma.currentPage.getPluginData(k)); const j2139 = connKeys.map(k => figma.currentPage.getPluginData(k)); const pageOrder = figma.currentPage.getPluginData('pageOrder').split(','); const currentPageId = figma.currentPage.getPluginData('currentPageId'); l1568(nodes); const showAllColorSpaces = figma.currentPage.getPluginData('showAllColorSpaces'); a1544({ cmd: 'uiReturnFigLoadNodesAndConns', showAllColorSpaces: showAllColorSpaces, pageKeys: pageKeys, pageJson: pages, pageOrder: pageOrder, currentPageId: currentPageId, nodeKeys: nodeKeys, nodeJson: nodes, connKeys: connKeys, connJson: j2139 }); }); }
function l1568(nodes) { y2732 = []; figma.getLocalPaintStylesAsync().then(paintStyles => { for (const y3020 of nodes) {
    const node = JSON.parse(y3020);
    if (node.type == e1216) {
        const style = paintStyles.find(s => { const nodeId = s.getPluginData('nodeId'); return nodeId == node.id; });
        if (style) {
            y2732.push({ nodeId: node.id, existing: r923(node.existing), styles: [style] });
        }
    }
} }); }
function h1569(nodeKeys, connKeys) { figma.currentPage.loadAsync().then(() => { const r2735 = '"loading": "true"'; const not = '{\n'; const set = '{\n' + x870 + r2735 + ',\n'; nodeKeys.forEach(k => figma.currentPage.setPluginData(k, figma.currentPage.getPluginData(k).replace(set, not).replace(not, set))); connKeys.forEach(k => figma.currentPage.setPluginData(k, figma.currentPage.getPluginData(k).replace(set, not).replace(not, set))); }); }
function d1570(pageIds, pageJson, currentPageId) { for (let i = 0; i < pageIds.length; i++) {
    v1565(g922(pageIds[i]), pageJson[i]);
} v1565('pageOrder', pageIds.join(',')); v1565('currentPageId', currentPageId); }
function n1571(nodeIds, nodeJson) { for (let i = 0; i < nodeIds.length; i++) {
    v1565(q920(nodeIds[i]), nodeJson[i]);
} }
function r2736() {
    return __awaiter(this, void 0, void 0, function* () { let keys = yield figma.clientStorage.keysAsync(); keys = keys.filter(k => k.length >= z878.length && k.substring(0, z878.length) == z878); a1544({ cmd: 'uiReturnGetAllLocalTemplateNames', templateNames: keys }); });
}
function o1572(j4029, template) { r1563(z878 + ' ' + j4029, template); }
function a1573(nodeIds) { figma.currentPage.loadAsync().then(() => { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => w1052(k)); for (const key of connKeys) {
    const parts = a1055(key).split(' ');
    if (nodeIds.includes(parts[0]) || nodeIds.includes(parts[2]))
        n1566(key);
} }); }
function j1574(nodeIds) { figma.currentPage.loadAsync().then(() => { a1573(nodeIds); const nodeKeys = figma.currentPage.getPluginDataKeys().filter(k => x1051(k) && nodeIds.includes(y1054(k))); nodeKeys.forEach(k => n1566(k)); }); }
function h1575() { figma.currentPage.loadAsync().then(() => { const nodeKeys = figma.currentPage.getPluginDataKeys().filter(k => x1051(k)); const connKeys = figma.currentPage.getPluginDataKeys().filter(k => w1052(k)); for (const key of nodeKeys)
    n1566(key); for (const key of connKeys)
    n1566(key); }); }
function d1576(o4007) {
    return __awaiter(this, void 0, void 0, function* () { yield e1577(o4007); x1578(o4007); });
}
function e1577(o4007) {
    return __awaiter(this, void 0, void 0, function* () { yield figma.currentPage.loadAsync(); figma.currentPage.getPluginDataKeys().filter(k => x1051(k)).forEach((k) => __awaiter(this, void 0, void 0, function* () { return yield logSavedNode(k, o4007); })); });
}
function x1578(o4007) { figma.currentPage.loadAsync().then(() => { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => w1052(k)); connKeys.sort((key1, key2) => { const p1 = a1055(key1).split(' '); const p2 = a1055(key2).split(' '); if (p1[2] != p2[2])
    return p1[2] < p2[2] ? -1 : 1; if (p1[3] != p2[3])
    return parseInt(p1[3]) - parseInt(p2[3]); if (p1[2] == p2[0])
    return -1; if (p2[2] == p1[0])
    return 1; return 0; }); connKeys.forEach(k => e2122(JSON.parse(figma.currentPage.getPluginData(k)), o4007)); }); }
function d1579(o4007) { figma.currentPage.loadAsync().then(() => { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => n1050(k)); connKeys.forEach(k => console.log('%c' + k, 'background: #fff; color: ' + (o4007 ? 'black' : 'white'))); const pageOrder = figma.currentPage.getPluginData('pageOrder'); console.log('%c' + pageOrder, 'background: #fff; color: ' + (o4007 ? 'black' : 'white')); }); }
function s1580(o4007) { figma.currentPage.loadAsync().then(() => { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => n1050(k)); connKeys.forEach(k => console.log('%c' + figma.currentPage.getPluginData(k), 'background: #fff; color: ' + (o4007 ? 'black' : 'white'))); const pageOrder = figma.currentPage.getPluginData('pageOrder'); console.log('%c' + pageOrder, 'background: #fff; color: ' + (o4007 ? 'black' : 'white')); }); }
function b1581(o4007) { figma.currentPage.loadAsync().then(() => { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => w1052(k)); connKeys.forEach(k => console.log('%c' + k, 'background: #dff; color: ' + (o4007 ? 'black' : 'white'))); }); }
function q1582(o4007) { figma.clientStorage.keysAsync().then(keys => keys.forEach(k => figma.clientStorage.getAsync(k).then(val => console.log(k + ': ' + val)))); }
function t1583(key, spec) {
    return __awaiter(this, void 0, void 0, function* () { let result = null; switch (key) {
        case 'getVariableData':
            result = yield j1619(spec);
            break;
        case 'getPaidStatus':
            result = figma.payments.status.type;
            break;
        case 'figSubscribe': {
            yield figma.payments.initiateCheckoutAsync({ interstitial: 'PAID_FEATURE' });
            result = figma.payments.status.type;
            break;
        }
    } a1544({ cmd: 'returnFigGetValue', value: result }); });
}
function n1584(varIds) { j1619(varIds).then(values => { a1544({ cmd: 'uiReturnFigGetVariableUpdates', values: values }); }); }
function r1585(pageId) {
    return __awaiter(this, void 0, void 0, function* () { n1566(f932(pageId)); const pageOrder = (yield b1564('pageOrder')).split(','); s945(pageOrder, id => id == pageId); v1565('pageOrder', pageOrder.join(',')); });
}
function n1586() { figma.currentPage.loadAsync().then(() => { const pageKeys = figma.currentPage.getPluginDataKeys().filter(k => n1050(k)); pageKeys.forEach(k => n1566(k)); n1566('pageOrder'); }); }
function n1587(key, json) { v1565(key, json); }
function k1588(_keys, _json) { const keys = JSON.parse(_keys); const json = JSON.parse(_json); for (let i = 0; i < keys.length; i++)
    v1565(keys[i], json[i]); }
function z1589(_curKeys, _newKeys, _json) { const curKeys = JSON.parse(_curKeys); const newKeys = JSON.parse(_newKeys); const json = JSON.parse(_json); for (let i = 0; i < curKeys.length; i++) {
    n1566(curKeys[i]);
    v1565(newKeys[i], json[i]);
} }
function h1590(key) { n1566(key); }
function n1591() { figma.currentPage.loadAsync().then(() => { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => w1052(k)); connKeys.forEach(k => n1566(k)); }); }
function d1592(nodeId) { figma.currentPage.loadAsync().then(() => { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => w1052(k)); for (const key of connKeys) {
    const parts = key.split(' ');
    if (parts[4] == nodeId)
        n1566(key);
} }); }
function g1593(nodeId) { figma.currentPage.loadAsync().then(() => { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => w1052(k)); for (const key of connKeys) {
    const parts = key.split(' ');
    if (parts[1] == nodeId)
        n1566(key);
} }); }
function v1594() { figma.getLocalPaintStylesAsync().then(i1598 => { for (const style of i1598) {
    style.setPluginData('type', '');
    style.setPluginData('nodeId', '');
    style.setPluginData('existing', '');
} }); }
function figSaveSnapshot(index, objectIds) {
    return __awaiter(this, void 0, void 0, function* () { const objects = yield figGetObjectsFromIds(objectIds); const group = figma.group(objects, figma.currentPage); const settings = { format: 'PNG' }; const icon = yield group.exportAsync(settings); figma.ungroup(group); a1544({ cmd: 'uiReturnFigSaveSnapshot', index: index, iconWidth: group.width, iconHeight: group.height, icon: icon }); });
}
var r2737 = null;
var n4030 = () => r2737 = null;
var z2738 = 'normal';
function e1610(clientPosition) { a1544({ cmd: 'uiReturnFigGetMousePosition', position: { x: 0, y: 0 }, clientPosition: clientPosition, viewportZoom: figma.viewport.zoom, viewportRect: figma.viewport.bounds }); }
function c1611(x, y, width, height) { return; }
function o1612(dock, rect, bounds) { switch (dock) {
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
function p1613(width, height) { (function () {
    return __awaiter(this, void 0, void 0, function* () { width = Math.floor(Math.max(0, width)); height = Math.floor(Math.max(0, height)); figma.ui.resize(width, height); yield figma.currentPage.loadAsync(); figma.currentPage.setPluginData(figma.currentUser.id + ',windowWidth', width.toString()); figma.currentPage.setPluginData(figma.currentUser.id + ',windowHeight', height.toString()); a1544({ cmd: 'uiReturnFigResizeWindow', width: width, height: height }); });
})(); }
function x2739(dock) {
    return __awaiter(this, void 0, void 0, function* () { if (dock != 'normal' && z2738 == 'normal') {
        figma.clientStorage.setAsync('normalWindowX', yield figma.clientStorage.getAsync('normalWindowX'));
        figma.clientStorage.setAsync('normalWindowY', yield figma.clientStorage.getAsync('normalWindowY'));
        figma.clientStorage.setAsync('normalWindowWidth', yield figma.clientStorage.getAsync('normalWindowWidth'));
        figma.clientStorage.setAsync('normalWindowHeight', yield figma.clientStorage.getAsync('normalWindowHeight'));
    } z2738 = dock; figma.clientStorage.setAsync('windowDock', dock); p1613(yield figma.clientStorage.getAsync('windowWidth'), yield figma.clientStorage.getAsync('windowHeight')); });
}
function o1614(msg) { q1615(msg.text, msg.prefix, msg.delay, msg.error, msg.v1616, msg.d1617); }
function q1615(text, prefix = 'Generator ', delay = 400, error = false, v1616 = '', d1617 = NULL) { const options = { timeout: delay, error: error, onDequeue: n4030 }; if (v1616 != '') {
    options['button'] = { text: v1616 };
    if (d1617.substring(0, 'removeConnection'.length) == 'removeConnection') {
        options['button']['action'] = () => h1590(d1617.split(',')[1]);
    }
    else {
        switch (d1617) {
            case 'hideClearUndoWarning':
                options['button']['action'] = () => a1544({ cmd: 'uiHideClearUndoWarning' });
                break;
        }
    }
} if (r2737)
    r2737.cancel(); r2737 = figma.notify(prefix + text, options); }
function v2740(key, params = null) {
    return __awaiter(this, void 0, void 0, function* () { return yield g2741(key, params); });
}
function g2741(key, params = null) {
    return __awaiter(this, void 0, void 0, function* () { return new Promise((resolve, reject) => { const timeout = 60000; a1544(Object.assign({ cmd: 'uiGetValueForFigma', key: key }, (params || {}))); const q2742 = setTimeout(() => reject(new Error('Timeout: Result not received by Figma within the specified time')), timeout); function o4031(msg) { msg = JSON.parse(msg); if (msg.cmd === 'returnUiGetValueForFigma') {
        clearTimeout(q2742);
        resolve({ key: msg.key, value: msg.value });
        figma.ui.off('message', o4031);
    } } figma.ui.on('message', o4031); }); });
}
var m2743 = [];
var o2744 = [];
var p2745 = 0;
var w2746 = 0;
function h1545(a111) { return (a111[v1403] === 2 ? '' : p874) + (d2800 ? a111[l1397] : a111[u1399]); }
function d1546(p1530, addObject = null, addProps = true, transform = true) {
    return __awaiter(this, void 0, void 0, function* () { if (!x1548(p1530))
        return null; let n1531; switch (p1530[p1395]) {
        case d1219:
            n1531 = l2714(p1530, addProps, transform);
            break;
        case t1222:
            n1531 = f2793(p1530, addProps, transform);
            break;
        case w1225:
            n1531 = j2789(p1530, addProps, transform);
            break;
        case a1237:
            n1531 = e2710(p1530, addProps, transform);
            break;
        case f1240:
            n1531 = w2717(p1530, addProps, transform);
            break;
        case j1243:
            n1531 = m2720(p1530, addProps, transform);
            break;
        case g1246:
            n1531 = h2696(p1530);
            break;
        case v1250:
            n1531 = j2748(p1530, addProps, transform);
            break;
        case s1262:
            n1531 = v2749(p1530, addProps, transform);
            break;
        case j1286:
            n1531 = yield h2750(p1530, addProps, transform);
            break;
        case i1265:
            n1531 = yield k2751(p1530);
            break;
        case f1268:
            n1531 = yield w2752(p1530, addProps, transform);
            break;
    } if (addObject && n1531 != undefined && n1531 != null && !n1531.removed) {
        n1531.name = h1545(p1530);
        l952(p1530[p1395] == i1265 || !!n1531, 'no Figma object created');
        if (n1531 != undefined && n1531 != null) {
            n1531.setPluginData('retain', p1530[v1403].toString());
            if (p1530[v1403] < 2) {
                n1531.setPluginData('userId', figma.currentUser.id);
                n1531.setPluginData('sessionId', figma.currentUser.sessionId.toString());
                n1531.setPluginData('type', p1530[p1395]);
                n1531.setPluginData('nodeId', p1530[l1396]);
                n1531.setPluginData('objectId', p1530[l1397]);
                n1531.setPluginData('isCenter', u937(p1530[r1418]));
                if (p1530[p1395] == g1246)
                    m2766.push(n1531);
                if (p1530[d1417])
                    m1561(n1531);
            }
            addObject(n1531);
        }
    } if (!p1530.counted) {
        w2746++;
        p1530.counted = true;
    } return n1531; });
}
function f1547(n1531, p1530, addProps, transform) {
    return __awaiter(this, void 0, void 0, function* () { if (!x1548(p1530) || n1531 == undefined || n1531 == null || n1531.removed)
        return; n1531.name = h1545(p1530); n1531.setPluginData('retain', p1530[v1403].toString()); switch (p1530[p1395]) {
        case d1219:
            z2715(n1531, p1530, addProps, transform);
            break;
        case t1222:
            e2794(n1531, p1530, addProps, transform);
            break;
        case w1225:
            s2790(n1531, p1530, addProps, transform);
            break;
        case a1237:
            k2711(n1531, p1530, addProps, transform);
            break;
        case f1240:
            k2718(n1531, p1530, addProps, transform);
            break;
        case j1243:
            m2721(n1531, p1530, addProps, transform);
            break;
        case g1246:
            x2753(n1531, p1530);
            break;
        case v1250:
            c2754(n1531, p1530, addProps, transform);
            break;
        case s1262:
            l2755(n1531, p1530, addProps, transform);
            break;
        case j1286:
            y2756(n1531, p1530, addProps, transform);
            break;
        case i1265:
            z2757(n1531, p1530);
            break;
        case f1268:
            c2758(n1531, p1530, addProps, transform);
            break;
    } if (n1531 != undefined && n1531 != null && !n1531.removed) {
        if (n1531.parent == figma.currentPage)
            yield figma.currentPage.loadAsync();
        n1531.parent.appendChild(n1531);
        if (p1530[d1417])
            m1561(n1531);
    } if (!p1530.counted) {
        w2746++;
        p1530.counted = true;
    } });
}
function p2733(u2759, s2760, v2761, p2068 = -1, nodeIds = [], y2762 = false, r2763 = false, j270 = false, addProps = true, transform = true) {
    return __awaiter(this, void 0, void 0, function* () { let v2764 = NULL; let c2765 = null; let abort = false; const g3643 = []; let f2747 = 0; m2743.push(...nodeIds); if (p2068 > -1)
        p2745 = p2068; for (const p1530 of s2760) {
        o2744.push(p1530);
        if (p1530[l1396] != v2764) {
            v2764 = p1530[l1396];
            c2765 = h2730.find(a => a.nodeId == p1530[l1396]);
            if (!c2765) {
                h2730.push(c2765 = { nodeId: p1530[l1396], objects: [] });
            }
        }
        const addObject = n1531 => { if (u2759 != undefined && u2759 != null && !u2759.removed)
            u2759.appendChild(n1531);
        else
            c2765.objects.push(n1531); };
        let objects = u2759 != undefined && u2759 != null && !u2759.removed ? u2759.children : c2765.objects;
        let n1531 = objects.find(o => o.removed || o.getPluginData('userId') == figma.currentUser.id && o.getPluginData('objectId') == p1530[l1397]);
        if (n1531 != undefined && n1531 != null && n1531.removed) {
            g938(objects, n1531);
            if (m2766.includes(n1531))
                h943(m2766, n1531);
            if (c2782.includes(n1531))
                h943(c2782, n1531);
        }
        if (n1531 == undefined || n1531 == null || n1531.removed) {
            const newObj = yield d1546(p1530, addObject, addProps, transform);
            g3643.push(newObj);
        }
        else if (n1531 != undefined && n1531 != null && !n1531.removed && n1531.getPluginData('type') == p1530[p1395].toString()) {
            yield f1547(n1531, p1530, addProps, transform);
            if (n1531 != undefined && n1531 != null && !n1531.removed)
                g3643.push(n1531);
        }
        else {
            n1531.remove();
            if (m2766.includes(n1531))
                h943(m2766, n1531);
            if (c2782.includes(n1531))
                h943(c2782, n1531);
            yield d1546(p1530, addObject, addProps, transform);
        }
        f2747++;
        if (f2747 >= v2761) {
            const result = yield v2740('returnObjectUpdate', { p2745: p2745, w2746: w2746 });
            abort = result.value;
            f2747 = 0;
            if (abort)
                break;
        }
    } if (u2759 != undefined && u2759 != null && !u2759.removed) {
        for (const n1531 of u2759.children) {
            if (n1531 != undefined && n1531 != null && n1531.removed || !s2760.find(o => o[l1397] == n1531.getPluginData('objectId') && n1531.getPluginData('userId') == figma.currentUser.id))
                n1531.remove();
        }
    } for (const point of m2766) {
        if (point.parent == figma.currentPage)
            yield figma.currentPage.loadAsync();
        if (point != undefined && point != null && !point.removed && !point.parent.removed)
            point.parent.appendChild(point);
    } if (r2763 && !abort) {
        o1527(m2743, o2744);
        m2743 = [];
        o2744 = [];
        if (j270 && g3643.length > 0) {
            figma.viewport.scrollAndZoomIntoView(g3643);
            const bounds = x1551(g3643);
            figma.viewport.zoom = Math.min(figma.viewport.bounds.width * figma.viewport.zoom / bounds.width - 0.05, figma.viewport.bounds.height * figma.viewport.zoom / bounds.height - 0.05);
        }
    } yield v2740('returnObjectUpdate', { p2745: p2745, w2746: w2746 }); });
}
function x1548(p1530) { switch (p1530[p1395]) {
    case d1219: return c2713(p1530);
    case t1222: return f2775(p1530);
    case w1225: return w2776(p1530);
    case a1237: return j4027(p1530);
    case f1240: return s2716(p1530);
    case j1243: return w2719(p1530);
    case g1246: return u4026(p1530);
    case v1250: return y2777(p1530);
    case s1262: return n2778(p1530);
    case j1286: return x2779(p1530);
    case i1265: return e2780(p1530);
    case f1268: return d2781(p1530);
} }
function c1549(p1530) {
    return __awaiter(this, void 0, void 0, function* () { (() => __awaiter(this, void 0, void 0, function* () { const n1531 = yield d1546(p1530); const width = n1531.width; const height = n1531.height; n1531.remove(); a1544({ cmd: 'uiForwardToGenerator', msg: { cmd: 'returnFigGetObjectSize', objectId: p1530[l1397], width: width, height: height } }); }))(); });
}
function e1550(n1531) { n1531.setPluginData('type', ''); n1531.setPluginData('nodeId', ''); n1531.setPluginData('userId', ''); n1531.setPluginData('sessionId', ''); n1531.setPluginData('objectId', ''); n1531.setPluginData('isCenter', ''); n1531.setPluginData('retain', ''); }
function x1551(objects) { const bounds = { left: 0, top: 0, right: 0, bottom: 0 }; for (const a111 of objects) {
    if (a111.x < bounds.left || bounds.left == bounds.right)
        bounds.left = a111.x;
    if (a111.y < bounds.top || bounds.top == bounds.bottom)
        bounds.top = a111.y;
    if (a111.x + a111.width > bounds.right || bounds.left == bounds.right)
        bounds.right = a111.x + a111.width;
    if (a111.y + a111.height > bounds.bottom || bounds.top == bounds.bottom)
        bounds.bottom = a111.y + a111.height;
} return { x: bounds.left, y: bounds.top, width: bounds.right - bounds.left, height: bounds.bottom - bounds.top }; }
function figExport(objectIds, scale, format, suffix) {
    return __awaiter(this, void 0, void 0, function* () { yield figma.currentPage.loadAsync(); for (const objId of objectIds) {
        let n1531 = figma.currentPage.children.find(o => !o.removed && o.getPluginData('userId') == figma.currentUser.id && o.getPluginData('objectId') == objId);
        if (!n1531)
            continue;
        const settings = { constraint: { type: 'SCALE', value: scale }, format: format == 0 ? 'PNG' : 'JPG', suffix: suffix };
        yield n1531.exportAsync(settings);
    } });
}
const c2782 = [];
const q2783 = [];
function a1552(j1553, b1554) { const effects = []; for (const effect of j1553) {
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
                if (b1554 && !isNaN(spread))
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
function p2703(n1531, p1530, phantom = true) { m1557(n1531, p1530); u2704(n1531, p1530, phantom); b2705(n1531, p1530); n1531.opacity = p1530[f1419]; n1531.blendMode = p1530[n1420]; const maskType = p1530[q1421]; n1531.isMask = maskType > 0; if (n1531.isMask) {
    switch (maskType) {
        case 1:
            n1531.maskType = 'ALPHA';
            break;
        case 2:
            n1531.maskType = 'VECTOR';
            break;
        case 3:
            n1531.maskType = 'LUMINANCE';
            break;
    }
} if (n1531.isMask && n1531.fills.length == 0 && n1531.strokes.length == 0)
    n1531.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 }, opacity: 1, blendMode: 'NORMAL' }]; }
function b2705(n1531, p1530) { if (!!p1530[r1408] && !isEmpty(p1530[r1408])) {
    n1531.fills = p956(p1530[r1408]);
    if (c2782.includes(n1531))
        h943(c2782, n1531);
}
else
    n1531.fills = []; }
function u2704(n1531, p1530, phantom = true) { if (p1530[l1409] != null && !isEmpty(p1530[l1409])) {
    g1556(n1531, p956(p1530[l1409]), p1530[w1410], p1530[r1411], p1530[w1412], p1530[b1413], p1530[q1414], h2706(p1530[g1415]));
    if (p1530[d1417])
        n1531.setPluginData('dashes', p1530[g1415]);
    if (c2782.includes(n1531))
        h943(c2782, n1531);
    if (p1530[d1417])
        p949(q2783, n1531);
}
else if (isEmpty(p1530[r1408]) && isEmpty(p1530[l1409]) && !p1530[q1421] && phantom) {
    h1559(n1531);
    p949(c2782, n1531);
}
else
    n1531.strokes = []; }
function h2706(i1555) { i1555 = i1555; i1555 = k954(i1555, ','); i1555 = a955(i1555, ','); i1555 = i1555.trim(); return i1555 == '' ? [] : i1555.split(',').map(s => Math.max(0, parseFloat(s))); }
function k2707(i1555) { i1555 = i1555; i1555 = k954(i1555, ','); i1555 = a955(i1555, ','); i1555 = i1555.trim(); return i1555 == '' ? [] : i1555.split(',').map(s => Math.max(0, parseFloat(s) / c2709)); }
function g1556(n1531, fills, weight, align, join, miterLimit, cap, dashes = []) { n1531.strokes = fills; n1531.strokeWeight = Math.max(0, weight); n1531.strokeAlign = align; n1531.strokeJoin = join; const miterAngle = miterLimit / 360 * Tau; const r2784 = 1 / Math.sin(miterAngle / 2); n1531.strokeMiterLimit = Math.min(Math.max(0, r2784), 16); n1531.strokeCap = cap; n1531.dashPattern = dashes; }
function m1557(n1531, p1530) { if (!!p1530[k1416] && !isEmpty(p1530[k1416])) {
    const b1554 = p1530[p1395] == d1219 || p1530[p1395] == w1225 || p1530[p1395] == f1268;
    n1531.effects = a1552(p1530[k1416], b1554);
}
else
    n1531.effects = []; }
function s1558() { for (const a111 of c2782) {
    if (a111.removed)
        h943(c2782, a111);
    else
        h1559(a111);
} }
function h1559(a111) { figma.currentPage.loadAsync().then(() => { const back = figma.currentPage.backgrounds.find(b => b.type == 'SOLID'); let phantomColor; if (back) {
    const l = back.color.r * 0.2126 + back.color.g * 0.7152 + back.color.b * 0.0722;
    phantomColor = l > 0.5 ? { r: 0, g: 0, b: 0 } : { r: 1, g: 1, b: 1 };
}
else
    phantomColor = { r: 1, g: 0, b: 1 }; g1556(a111, [{ type: 'SOLID', color: phantomColor, opacity: 0.5 }], 1 / c2709, 'CENTER', 'MITER', 1, 'NONE', [1 / c2709, 2 / c2709]); }); }
function s1560() { for (const n1531 of q2783) {
    if (n1531.removed)
        h943(q2783, n1531);
    else
        m1561(n1531);
} }
function m1561(n1531) { n1531.strokeWeight = Math.max(0, 1.5 / c2709); if (r923(n1531.getPluginData('isCenter'))) {
    const path = n1531.vectorPaths[0];
    const parts = path.data.split(' ');
    let t = { x: parseFloat(parts[1]), y: parseFloat(parts[2]) };
    let c = { x: parseFloat(parts[4]), y: parseFloat(parts[5]) };
    let r = { x: parseFloat(parts[7]), y: parseFloat(parts[8]) };
    const a = 2;
    const b = 0.05;
    const f = 1 - Math.pow(1 - Math.min(c2709, 1), a) / Math.pow(a, b);
    t = y895(c, x897(o886(a900(t, c)), objectCenterSize / f));
    r = y895(c, x897(o886(a900(r, c)), objectCenterSize / f));
    parts[1] = t.x;
    parts[2] = t.y;
    parts[4] = c.x;
    parts[5] = c.y;
    parts[7] = r.x;
    parts[8] = r.y;
    const w2785 = { windingRule: path.windingRule, data: parts.join(' ') };
    n1531.vectorPaths = [w2785];
} const dashes = n1531.getPluginData('dashes'); if (dashes != '')
    n1531.dashPattern = k2707(dashes); }
function l1595(nodeId, px, py) { figma.getLocalPaintStylesAsync().then(_styles => { const styles = new Array(); for (const u168 of _styles) {
    const _nodeId = u168.getPluginData('nodeId');
    const _existing = u168.getPluginData('existing');
    const existing = !!_existing;
    const style = { id: u168.id, nodeId: _nodeId, name: u168.name, existing: existing, paints: new Array() };
    let onlyPaint = true;
    for (const b2787 of u168.paints) {
        if (b2787.type == 'SOLID') {
            style.paints.push([b2787.color.r, b2787.color.g, b2787.color.b, b2787.opacity]);
        }
        else {
            onlyPaint = false;
            break;
        }
    }
    if (onlyPaint)
        styles.push(style);
} a1544({ cmd: 'uiReturnFigGetAllLocalColorStyles', nodeId: nodeId, px: px, py: py, styles: JSON.stringify(styles) }); }); }
function f1596(nodeId, styleId) { figma.getLocalPaintStylesAsync().then(i1598 => { if (styleId != NULL)
    a1597(i1598, nodeId, styleId);
else
    e1599(i1598, nodeId); }); }
function a1597(i1598, nodeId, styleId, clearExisting = true) { const f2786 = y2732.find(a => a.nodeId == nodeId); if (f2786 && clearExisting)
    e1599(i1598, nodeId); const q1603 = i1598.find(s => s.id == styleId); l952(!!q1603, 'figStyle should be found here'); q1603.setPluginData('type', e1216); q1603.setPluginData('nodeId', nodeId); q1603.setPluginData('existing', u937(true)); y2732.push({ nodeId: nodeId, existing: true, styles: [q1603] }); return q1603; }
function e1599(i1598, nodeId) { const q1603 = i1598.find(s => s.getPluginData('nodeId') == nodeId); l952(!!q1603, 'figStyle should be found here'); if (q1603) {
    q1603.setPluginData('type', NULL);
    q1603.setPluginData('nodeId', NULL);
    q1603.setPluginData('existing', NULL);
    s945(y2732, a => a.nodeId == nodeId);
} return q1603; }
function t1600(styles, z1604) { const q1603 = figma.createPaintStyle(); q1603.setPluginData('type', z1604[p1395]); q1603.setPluginData('nodeId', z1604[l1396]); q1603.name = z1604[b1400]; setStylePaints(q1603, z1604); styles.push(q1603); a1544({ cmd: 'uiSetStyleId', nodeId: z1604[l1396], styleId: q1603.id }); return q1603; }
function o1601(msg) { let v2764 = NULL; let f2786; for (const z1604 of msg.styles) {
    if (z1604[l1396] != v2764) {
        v2764 = z1604[l1396];
        f2786 = y2732.find(a => a.nodeId == z1604[l1396]);
        if (!f2786) {
            f2786 = { nodeId: z1604[l1396], styles: [] };
            y2732.push(f2786);
        }
    }
    else
        f2786 = null;
    const q1603 = f2786.styles[0];
    figma.getLocalPaintStylesAsync().then(i1598 => { const localStyle = i1598.find(s => s.getPluginData('nodeId') == z1604[l1396]); if (isValid(q1603) && !isValid(localStyle)) {
        g938(f2786.styles, q1603);
    } const existing = isValid(q1603) && isValid(localStyle) && q1603.getPluginData('existing'); if (!isValid(q1603) || !isValid(localStyle)) {
        if (!existing) {
            i1534 = true;
            f1596(z1604[l1396], z1604[w1398]);
        }
    }
    else if (isValid(q1603) && q1603.getPluginData('type') == z1604[p1395]) {
        i1534 = true;
        t1602(localStyle, z1604);
    } });
} }
function t1602(q1603, z1604) { setStylePaints(q1603, z1604); q1603.name = z1604[b1400]; }
function getStylePaints(stylePaints) { const paints = new Array(); for (const b2787 of stylePaints) {
    const fill = b2787[1].split(' ');
    switch (b2787[0]) {
        case 'SOLID':
            paints.push({ type: 'SOLID', color: { r: Math.min(Math.max(0, parseFloat(fill[0]) / 0xff), 1), g: Math.min(Math.max(0, parseFloat(fill[1]) / 0xff), 1), b: Math.min(Math.max(0, parseFloat(fill[2]) / 0xff), 1) }, opacity: Math.min(Math.max(0, parseFloat(fill[3]) / 100), 1) });
            break;
    }
} return paints; }
function setStylePaints(q1603, z1604) { if (!isEmpty(z1604[q1402]))
    q1603.paints = getStylePaints(z1604[q1402]);
else
    q1603.paints = []; }
function e1618(nodeId, px, py) { figma.variables.getLocalVariablesAsync().then((m2788) => __awaiter(this, void 0, void 0, function* () { const variables = new Array(); for (const _var of m2788) {
    try {
        const collection = yield figma.variables.getVariableCollectionByIdAsync(_var.variableCollectionId);
        const variable = { id: _var.id, resolvedType: _var.resolvedType, name: _var.name, collectionName: collection.name };
        variables.push(variable);
    }
    catch (ex) { }
} figma.variables.getLocalVariableCollectionsAsync().then((collections) => __awaiter(this, void 0, void 0, function* () { a1544({ cmd: 'uiReturnFigGetAllLocalVariables', nodeId: nodeId, px: px, py: py, variables: JSON.stringify(variables), nCollections: collections.length }); })); })); }
function j1619(varIds) {
    return __awaiter(this, void 0, void 0, function* () { const m2788 = yield figma.variables.getLocalVariablesAsync(); const variables = varIds.map(id => m2788.find(v => v.id == id)); let values = []; for (let i = 0; i < varIds.length; i++) {
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
function i1620(nodeId, varId) { figma.variables.getLocalVariablesAsync().then(m2788 => { figLinkVariableAsync(m2788, nodeId, varId); }); }
function figUpdateVariableAsync(varId, value) {
    return __awaiter(this, void 0, void 0, function* () { figma.variables.getLocalVariablesAsync().then((m2788) => __awaiter(this, void 0, void 0, function* () { let variable = m2788.find(v => v.id == varId); if (!variable)
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
function figLinkVariableAsync(m2788, nodeId, varId) {
    return __awaiter(this, void 0, void 0, function* () { let variable = m2788.find(v => v.id == varId); if (!variable)
        return null; const [resolvedVar, values] = yield figGetResolvedVariableValuesAsync(variable); a1544({ cmd: 'uiReturnFigLinkNodeToVariable', nodeId: nodeId, variableId: resolvedVar ? resolvedVar.id : NULL, variableName: resolvedVar ? resolvedVar.name : '', resolvedType: resolvedVar ? resolvedVar.resolvedType : NULL, values: values }); return resolvedVar; });
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
function r1605(tl, tr, bl) { let vr = point(tr.x - tl.x, tr.y - tl.y); let vb = point(bl.x - tl.x, bl.y - tl.y); let sx = vr.x; let sy = vb.y; let kx = -vr.y; let ky = -vb.x; let dx = -tl.x; let dy = -tl.y; const _sx = kx / nozero(sx); const _sy = ky / nozero(sy); let h4208 = c889([[1, _sy, 0], [_sx, 1, 0], [0, 0, 1]], r893(dx, dy)); h4208 = f891(h4208); const a = p883(vr); if (a > Tau / 4 && a < Tau * 3 / 4)
    h4208 = c889(h4208, r893(0, 0, 1, 1, Tau / 2)); if (determinant(h4208) < 0)
    h4208 = c889(h4208, r893(0, 0, -1, 1, 0)); return h4208; }
function i1606(n1531, tl, tr, bl) { const h4208 = r1605(tl, tr, bl); n1531.relativeTransform = [h4208[0], h4208[1]]; }
function a1607(n1531, p1530, setSize = true, noHeight = 0.01) { if (!p1530[u1404] || !p1530[m1405] || !p1530[o1406])
    return; const xp0 = p1530[u1404]; const xp1 = p1530[m1405]; const xp2 = p1530[o1406]; i1606(n1531, xp0, xp1, xp2); if (setSize) {
    const scaleX = distv(xp0, xp1);
    const scaleY = distv(xp0, xp2);
    const height = p1530[p1395] == j1243 ? p1530[q1439] : p1530[a1426];
    if (!n1531.removed) {
        n1531.resizeWithoutConstraints(Math.max(0.01, scaleX), height ? Math.max(0.01, scaleY) : noHeight);
    }
} }
function a1608(j2701, c2702) { if (j2701.removed)
    return; j2701.resizeWithoutConstraints(0.01, 0.01); j2701.setPluginData('actualX', c2702[i1422].toString()); j2701.setPluginData('actualY', c2702[p1424].toString()); j2701.x = c2702[i1422]; j2701.y = c2702[p1424]; j2701.rotation = c2702[r1418] ? 45 : 0; }
function u1609(j2701) { if (!j2701.removed)
    j2701.resizeWithoutConstraints(0.01, 0.01); }
function x2779(genBool) { return true; }
function h2750(genBool, addProps, transform) {
    return __awaiter(this, void 0, void 0, function* () { let objects = []; for (const a111 of genBool[q1453])
        yield d1546(a111, o => objects = [...objects, o], false); yield figma.currentPage.loadAsync(); let figBool = null; if (!isEmpty(objects)) {
        switch (genBool[h1454]) {
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
        y2756(figBool, genBool, addProps, transform);
    } return figBool; });
}
function y2756(figBool, genBool, addProps, transform) {
    return __awaiter(this, void 0, void 0, function* () { if (genBool[q1453].length == 0) {
        figBool.remove();
        return;
    } yield p2733(figBool, genBool[q1453], genBool[q1453].length, -1, [], false, false, false, false, true); const hasProps = genBool[r1408].length > 0 || genBool[l1409].length > 0 || genBool[k1416].length > 0; p2703(figBool, genBool, !hasProps && addProps); });
}
function w2776(r2767) { return r2767[i1422] != null && !isNaN(r2767[i1422]) && r2767[p1424] != null && !isNaN(r2767[p1424]) && r2767[q1425] != null && !isNaN(r2767[q1425]) && r2767[a1426] != null && !isNaN(r2767[a1426]) && r2767[y1428] != null && !isNaN(r2767[y1428]) && r2767[o1435] != null && !isNaN(r2767[o1435]) && r2767[x1441] != null && !isNaN(r2767[x1441]) && r2767[c1445] != null && !isNaN(r2767[c1445]); }
function j2789(r2767, addProps, transform) { if (!w2776(r2767))
    return null; const h2768 = figma.createEllipse(); s2790(h2768, r2767, addProps, transform, true); return h2768; }
function s2790(h2768, r2767, addProps, transform, isValid = false) { if (!isValid && !w2776(r2767))
    return; r2791(h2768, r2767, transform); if (m2766.includes(h2768))
    t2698(h2768);
else
    p2703(h2768, r2767, addProps); }
function r2791(h2768, r2767, transform) { h2768.cornerRadius = r2767[y1428]; const start = r2767[o1435] / 360 * (Math.PI * 2); const sweep = r2767[x1441] / 100 * (Math.PI * 2); h2768.arcData = { startingAngle: start, endingAngle: start + sweep, innerRadius: Math.min(Math.max(0, r2767[c1445] / 100), 1) }; if (transform)
    a1607(h2768, r2767); }
function d2781(t2769) { return t2769[i1422] != null && !isNaN(t2769[i1422]) && t2769[p1424] != null && !isNaN(t2769[p1424]) && t2769[q1425] != null && !isNaN(t2769[q1425]) && t2769[a1426] != null && !isNaN(t2769[a1426]) && t2769[u1434] != null && !isNaN(t2769[u1434]) && t2769[k1455] != null && !isNaN(t2769[k1455]); }
function w2752(t2769, addProps, transform) {
    return __awaiter(this, void 0, void 0, function* () { if (!d2781(t2769))
        return null; const i2770 = figma.createFrame(); if (i2770) {
        i2770.expanded = false;
        p2792(i2770, t2769, addProps, transform);
        let objects = [];
        for (const a111 of t2769[y1440])
            yield d1546(a111, o => objects = [...objects, o]);
        for (const a111 of objects)
            i2770.appendChild(a111);
    } return i2770; });
}
function c2758(i2770, t2769, addProps, transform) { p2792(i2770, t2769, addProps, transform); p2733(i2770, t2769[y1440], t2769[y1440].length); }
function p2792(i2770, t2769, addProps, transform) { i2770.cornerRadius = t2769[u1434]; i2770.clipsContent = t2769[k1455] > 0; if (transform)
    a1607(i2770, t2769); p2703(i2770, t2769, addProps && t2769[y1440].length == 0); figUpdateStrokeSides(i2770, t2769); }
function e2780(b2771) { return true; }
function k2751(b2771) {
    return __awaiter(this, void 0, void 0, function* () { let objects = []; for (const a111 of b2771[q1423])
        yield d1546(a111, o => objects = [...objects, o]); yield figma.currentPage.loadAsync(); const x2772 = !isEmpty(objects) ? figma.group(objects, figma.currentPage) : null; if (x2772) {
        x2772.expanded = false;
        z2757(x2772, b2771);
    } return x2772; });
}
function z2757(x2772, b2771) { if (b2771[q1423].length == 0) {
    x2772.remove();
    return;
} p2733(x2772, b2771[q1423], b2771[q1423].length); m1557(x2772, b2771); }
function f2775(n2773) { return n2773[i1422] != null && !isNaN(n2773[i1422]) && n2773[p1424] != null && !isNaN(n2773[p1424]) && n2773[q1425] != null && !isNaN(n2773[q1425]); }
function f2793(n2773, addProps, transform) { if (!f2775(n2773))
    return null; const a2774 = figma.createLine(); e2794(a2774, n2773, addProps, transform, true); return a2774; }
function e2794(a2774, n2773, addProps, transform, isValid = false) { if (!isValid && !f2775(n2773))
    return; if (transform)
    a1607(a2774, n2773, true, 0); p2703(a2774, n2773, addProps); }
var m2766 = [];
function u4026(c2702) { return c2702[i1422] != null && !isNaN(c2702[i1422]) && c2702[p1424] != null && !isNaN(c2702[p1424]); }
function h2696(c2702) { const j2701 = c2702[r1418] ? figma.createRectangle() : figma.createEllipse(); if (!u4026(c2702))
    return j2701; if (m2766.includes(j2701))
    y2700(j2701, c2702);
else
    x2753(j2701, c2702); return j2701; }
function x2753(j2701, c2702) { a1608(j2701, c2702); p2699(j2701); }
function h2697() { a1544({ cmd: 'uiUpdateZoom', zoom: figma.viewport.zoom }); for (const point of m2766)
    t2698(point); }
function t2698(j2701) { u1609(j2701); p2699(j2701); }
function y2700(j2701, c2702) { a1608(j2701, c2702); p2699(j2701); }
function p2699(j2701) { if (j2701.removed)
    return; figma.currentPage.loadAsync().then(() => { const isCenter = r923(j2701.getPluginData('isCenter')); const r2708 = figma.currentPage.selection.includes(j2701); const color = isCenter ? [0xf2, 0x48, 0x22] : r2708 ? [12, 140, 233] : [255, 255, 255]; const border = isCenter ? [255, 255, 255] : r2708 ? [255, 255, 255] : [12, 140, 233]; j2701.fills = p956([['SOLID', color[0], color[1], color[2], 100]]); const effects = []; effects.push(...a1552([['DROP_SHADOW', border[0] / 255, border[1] / 255, border[2] / 255, 1, 0, 0, 0, (isCenter ? 3 : r2708 ? 5 : 3.6) / c2709, 'NORMAL', true, true]], true)); effects.push(...a1552([['DROP_SHADOW', color[0] / 255, color[1] / 255, color[2] / 255, 1, 0, 0, 0, (r2708 ? 4 : 2.4) / c2709, 'NORMAL', true, true]], true)); j2701.effects = effects; }); }
function j4027(genPoly) { return genPoly[i1422] != null && !isNaN(genPoly[i1422]) && genPoly[p1424] != null && !isNaN(genPoly[p1424]) && genPoly[q1425] != null && !isNaN(genPoly[q1425]) && genPoly[a1426] != null && !isNaN(genPoly[a1426]) && genPoly[q1431] != null && !isNaN(genPoly[q1431]) && genPoly[f1437] != null && !isNaN(genPoly[f1437]); }
function e2710(genPoly, addProps, transform) { if (!j4027(genPoly))
    return null; const figPoly = figma.createPolygon(); k2711(figPoly, genPoly, addProps, transform, true); return figPoly; }
function k2711(figPoly, genPoly, addProps, transform, isValid = false) { if (!isValid && !j4027(genPoly))
    return; figPoly.cornerRadius = genPoly[q1431]; figPoly.pointCount = Math.max(3, genPoly[f1437]); if (transform)
    a1607(figPoly, genPoly); p2703(figPoly, genPoly, addProps); }
function c2713(g2712) { return g2712[i1422] != null && !isNaN(g2712[i1422]) && g2712[p1424] != null && !isNaN(g2712[p1424]) && g2712[q1425] != null && !isNaN(g2712[q1425]) && g2712[a1426] != null && !isNaN(g2712[a1426]) && g2712[f1427] != null && !isNaN(g2712[f1427]); }
function l2714(g2712, addProps, transform) { if (!c2713(g2712))
    return null; const figRect = figma.createRectangle(); z2715(figRect, g2712, addProps, transform, true); return figRect; }
function z2715(figRect, g2712, addProps, transform, isValid = false) { if (!isValid && !c2713(g2712))
    return; const foundCorners = g2712[k1416].findIndex(e => e[0] == 'ROUND_CORNERS'); if (foundCorners > -1) {
    const corners = g2712[k1416][foundCorners];
    figRect.topLeftRadius = corners[1];
    figRect.topRightRadius = corners[2];
    figRect.bottomLeftRadius = corners[3];
    figRect.bottomRightRadius = corners[4];
}
else
    figRect.cornerRadius = g2712[f1427]; if (transform)
    a1607(figRect, g2712); p2703(figRect, g2712, addProps); figUpdateStrokeSides(figRect, g2712); }
function figUpdateStrokeSides(n1531, p1530) { const foundSides = p1530[k1416].findIndex(e => e[0] == 'STROKE_SIDES'); if (foundSides < 0)
    return; const sides = p1530[k1416][foundSides]; n1531.strokeWeight = 0; n1531.strokeTopWeight = sides[1]; n1531.strokeLeftWeight = sides[2]; n1531.strokeRightWeight = sides[3]; n1531.strokeBottomWeight = sides[4]; }
function s2716(i2726) { return i2726[i1422] != null && !isNaN(i2726[i1422]) && i2726[p1424] != null && !isNaN(i2726[p1424]) && i2726[q1425] != null && !isNaN(i2726[q1425]) && i2726[a1426] != null && !isNaN(i2726[a1426]) && i2726[t1432] != null && !isNaN(i2726[t1432]) && i2726[w1438] != null && !isNaN(i2726[w1438]) && i2726[v1443] != null && !isNaN(i2726[v1443]); }
function w2717(i2726, addProps, transform) { if (!s2716(i2726))
    return null; const l2727 = figma.createStar(); k2718(l2727, i2726, addProps, transform, true); return l2727; }
function k2718(l2727, i2726, addProps, transform, isValid = false) { if (!isValid && !s2716(i2726))
    return; l2727.cornerRadius = i2726[t1432]; l2727.pointCount = i2726[w1438]; l2727.innerRadius = Math.min(Math.max(0, i2726[v1443] / 100), 1); if (transform)
    a1607(l2727, i2726); p2703(l2727, i2726, addProps); }
const z4269 = [];
function w2719(c2723) { return c2723[s1444] != null && c2723[i1422] != null && !isNaN(c2723[i1422]) && c2723[p1424] != null && !isNaN(c2723[p1424]) && c2723[q1425] != null && !isNaN(c2723[q1425]) && c2723[a1426] != null && !isNaN(c2723[a1426]) && c2723[i1446] != null && c2723[i1446] != NULL && c2723[r1447] != null && !isNaN(c2723[r1447]); }
function m2720(c2723, addProps, transform) { if (!w2719(c2723))
    return null; const z2795 = figma.createText(); m2721(z2795, c2723, addProps, transform, true); return z2795; }
function m2721(z2795, c2723, addProps, transform, isValid = false) { if (!isValid && !w2719(c2723))
    return null; const fontName = { family: c2723[i1446], style: c2723[f1448] }; try {
    if (!z4269.includes(fontName)) {
        figma.loadFontAsync(fontName).then(() => { z4269.push(fontName); l2722(z2795, c2723, fontName, addProps, transform); });
    }
    else {
        l2722(z2795, c2723, fontName, addProps, transform);
    }
}
catch (e) {
    j953(e);
} }
function l2722(z2795, c2723, fontName, addProps, transform) { z2795.fontName = fontName; z2795.fontSize = Math.max(1, c2723[r1447]); z2795.characters = c2723[s1444]; z2795.lineHeight = { unit: 'PERCENT', value: c2723[h1451] }; z2795.letterSpacing = { unit: 'PERCENT', value: c2723[u1452] }; if (c2723[f1449] == 0)
    z2795.textAlignHorizontal = 'LEFT';
else if (c2723[f1449] == 1)
    z2795.textAlignHorizontal = 'CENTER';
else if (c2723[f1449] == 2)
    z2795.textAlignHorizontal = 'RIGHT';
else if (c2723[f1449] == 3)
    z2795.textAlignHorizontal = 'JUSTIFIED'; if (c2723[e1450] == 0)
    z2795.textAlignVertical = 'TOP';
else if (c2723[e1450] == 1)
    z2795.textAlignVertical = 'CENTER';
else if (c2723[e1450] == 2)
    z2795.textAlignVertical = 'BOTTOM'; if (transform)
    a1607(z2795, c2723); p2703(z2795, c2723, addProps); if (c2723[h1433] == 0 && c2723[q1439] == 0)
    z2795.textAutoResize = 'WIDTH_AND_HEIGHT';
else if (c2723[h1433] == 0)
    z2795.textAutoResize = 'HEIGHT';
else
    z2795.textAutoResize = 'NONE'; }
function n2778(l2728) { return true; }
function v2749(l2728, addProps, transform) { if (!n2778(l2728))
    return null; const z2729 = figma.createVector(); l2755(z2729, l2728, addProps, transform, true); return z2729; }
function l2755(z2729, l2728, addProps, transform, isValid = false) { if (!isValid && !n2778(l2728))
    return; z2729.setVectorNetworkAsync(l2728[r1429]); if (transform)
    a1607(z2729, l2728, false); p2703(z2729, l2728, addProps); }
function y2777(n2724) { return n2724[e1436] != null && !isNaN(n2724[e1436]) && n2724[o1442] != null && !isNaN(n2724[o1442]); }
function j2748(n2724, addProps, transform) { const a2725 = figma.createVector(); c2754(a2725, n2724, addProps, transform, true); return a2725; }
function c2754(a2725, n2724, addProps, transform, isValid = false) { if (!isValid && !y2777(n2724))
    return; a2725.vectorPaths = [{ windingRule: n2724[e1436] == 1 ? 'NONZERO' : 'EVENODD', data: n2724[f1430] }]; a2725.cornerRadius = Number(n2724[o1442]); if (transform)
    a1607(a2725, n2724, false); p2703(a2725, n2724, addProps); }
