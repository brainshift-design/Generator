var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function b1046(key, tag) { return key.substring(0, tag.length + 1) == tag + ' '; }
function n1047(key, tag) { return key.substring(tag.length + 1); }
function w1048(key) { return b1046(key, q870); }
function k1049(key) { return b1046(key, p868); }
function n1050(key) { return b1046(key, h869); }
function m1051(key) { return n1047(key, q870); }
function k1052(key) { return n1047(key, p868); }
function n1053(key) { return n1047(key, h869); }
const z861 = 318;
const w862 = 2147483647;
const NULL = '';
const b863 = '  ';
const u864 = '    ';
const y865 = '\n';
const n866 = '◦ G •';
const h867 = n866 + ' ';
const p868 = 'G_NODE';
const h869 = 'G_CONN';
const q870 = 'G_PAGE';
const l871 = 'G_TEMP';
const identity = Object.freeze([[1, 0, 0], [0, 1, 0], [0, 0, 1]]);
const Epsilon = 0.0000001;
const Tau = Math.PI * 2;
var q2523 = false;
function j872(x, eps = 0.000000001) { return Math.abs(x) < eps ? 0 : x; }
function nozero(x, eps = 0.000000001) { return x != 0 ? x : (x < 0 ? -eps : eps); }
function w873(v, eps = 0.000000001) { return point(nozero(v.x, eps), nozero(v.y, eps)); }
function equal(a, b, eps = 0.000000001) { return Math.abs(b - a) < eps; }
function sqr(x) { return x * x; }
;
function cube(x) { return x * x * x; }
;
function t874(f) { return Math.floor(f) | 0; }
function x875(x) { x = t874(x); x--; x |= x >> 1; x |= x >> 2; x |= x >> 4; x |= x >> 8; x |= x >> 16; x |= x >> 32; return ++x; }
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
function i876(v1, v2) { return m877(v1.x, v1.y, v2.x, v2.y); }
function m877(x1, y1, x2, y2) { const dx = x2 - x1; const dy = y2 - y1; let angle = Math.atan2(dy, dx); if (angle < 0)
    angle += Tau; return angle; }
function f878(v) { return Math.sqrt(v.x * v.x + v.y * v.y); }
function k879(v) { return point(v.x == 0 ? 0 : v.x / f878(v), v.y == 0 ? 0 : v.y / f878(v)); }
function dot(v1, v2) { return v1.x * v2.x + v1.y * v2.y; }
function e880(a1, a2) { let diff = a2 - a1; while (diff <= -Tau / 2)
    diff += Tau; while (diff > Tau / 2)
    diff -= Tau; return diff; }
function m881(v, m) { let v3 = [v.x, v.y, 1]; let r = m945(v3, m); return point(r[0], r[1]); }
function i882(...mm) { w949(mm.length > 0, 'mulm3m3() must take at least one argument'); let result = clone(mm[0]); for (let a = 1; a < mm.length; a++) {
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
function b883(m, s) { for (let i = 0; i < 3; i++)
    for (let j = 0; j < 3; j++)
        m[i][j] /= s; return m; }
function adjugate(m) { return cofactor(transpose(m)); }
function transpose(m) { return [[m[0][0], m[1][0], m[2][0]], [m[0][1], m[1][1], m[2][1]], [m[0][2], m[1][2], m[2][2]]]; }
function cofactor(m) { return [[m[1][1] * m[2][2] - m[2][1] * m[1][2], -(m[1][0] * m[2][2] - m[2][0] * m[1][2]), m[1][0] * m[2][1] - m[2][0] * m[1][1]], [-(m[0][1] * m[2][2] - m[2][1] * m[0][2]), m[0][0] * m[2][2] - m[2][0] * m[0][2], -(m[0][0] * m[2][1] - m[2][0] * m[0][1])], [m[0][1] * m[1][2] - m[1][1] * m[0][2], -(m[0][0] * m[1][2] - m[1][0] * m[0][2]), m[0][0] * m[1][1] - m[1][0] * m[0][1]]]; }
function determinant(m) { return m[0][0] * (m[1][1] * m[2][2] - m[1][2] * m[2][1]) - m[0][1] * (m[1][0] * m[2][2] - m[2][0] * m[1][2]) + m[0][2] * (m[1][0] * m[2][1] - m[2][0] * m[1][1]); }
function l884(m) { return b883(adjugate(m), determinant(m)); }
function c885(angle) { const cosA = j872(Math.cos(angle)); const sinA = j872(Math.sin(angle)); return [[cosA, sinA, 0], [-sinA, cosA, 0], [0, 0, 1]]; }
function l886(x = 0, y = 0, f887 = 1, m888 = 1, angle = 0, h889 = 0, q890 = 0) { const cosA = Math.cos(angle); const sinA = Math.sin(angle); return [[f887 * cosA - q890 * sinA, -h889 * cosA + m888 * sinA, x], [q890 * cosA + f887 * sinA, m888 * cosA + h889 * sinA, y], [0, 0, 1]]; }
function d891(v1, v2) { return v1.x * v2.y - v1.y * v2.x; }
function i892(v1, v2) { return point(v1.x + v2.x, v1.y + v2.y); }
function x893(v1, v2) { return point(v1.x * v2.x, v1.y * v2.y); }
function n894(v, s) { return point(v.x * s, v.y * s); }
function f895(v1, v2) { return point(v1.x / v2.x, v1.y / v2.y); }
function o896(v, s) { return point(v.x / s, v.y / s); }
function k897(v1, v2) { return point(v1.x - v2.x, v1.y - v2.y); }
function a898(str) { return decodeURI(encodeURIComponent(str)); }
function i899(str) { return decodeURIComponent(encodeURI(str)); }
function s900(bytes) { let str = ''; for (let i = 0; i < bytes.length; i++)
    str += String.fromCharCode(bytes[i]); return str; }
function n901(str) { return Array.from(i899(str), c => c.charCodeAt(0)); }
function h902(array, size) { const newArray = new Uint8Array(size); u903(array, newArray); return newArray; }
function u903(src, dst) { l904(src, 0, src.length, dst, 0, dst.length); }
function l904(src, m905, v906, dst, s907, z908) { const size = Math.min(v906, z908); for (let i = 0; i < size; i++)
    dst[s907 + i] = src[m905 + i]; }
function k909(v910, d911) { if (v910.length != d911.length)
    return false; for (let i = 0; i < v910.length; i++) {
    if (v910[i] != d911[i])
        return false;
} return true; }
function r912(i913, h914) { return i913.findIndex(i => h914.includes(i)) > -1; }
function q915(list) { return list ? '<==' : '<--'; }
;
function q916(list) { return list ? '==>' : '-->'; }
;
function u917(nodeId) { return p868 + ' ' + nodeId; }
function p918(name) { return h869 + ' ' + name; }
function s919(name) { return q870 + ' ' + name; }
function m920(str) { return str.toLowerCase() == 'true' || str == '1'; }
function i921(v922, h923 = false) { return j928(v922.outputNodeId, v922.outputId, v922.outputOrder, v922.inputNodeId, v922.inputId, v922.list, h923); }
function r924(outputNodeId, outputId, outputOrder, inputNodeId, inputId) { return p918(outputNodeId + ' ' + outputId + ' ' + outputOrder + ' ' + inputNodeId + ' ' + inputId); }
function n925(r243) { return r924(r243.outputNodeId, r243.outputId, r243.outputOrder, r243.inputNodeId, r243.inputId); }
function c926(r243) { return r924(r243.output.node.id, r243.output.id, r243.outputOrder, r243.input.node.id, r243.input.id); }
function m927(r243, h923 = false) { return j928(r243.output.node.id, r243.output.id, r243.outputOrder, r243.input.node.id, r243.input.id, r243.list, h923); }
function j928(outputNodeId, outputId, outputOrder, inputNodeId, inputId, list, h923 = false) { const sp = h923 ? ' ' : '  '; const jsp = h923 ? '' : ' '; const arrow = sp + l932(typeof outputOrder == 'string' ? parseInt(outputOrder) : outputOrder) + q916(typeof list == 'string' ? m920(list) : list) + sp; const join = jsp + '.' + jsp; return '( ' + outputNodeId + join + outputId + arrow + inputNodeId + join + inputId + ' )'; }
function o929(pageId) { return s919(pageId); }
function i930(num) { const str = num.toString(); let sup = ''; for (const c of str)
    sup += y931(c); return sup; }
function y931(c) { switch (c) {
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
function l932(num) { const str = num.toString(); let sup = ''; for (const c of str)
    sup += w933(c); return sup; }
function w933(c) { switch (c) {
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
function s934(bool) { return bool ? 'true' : 'false'; }
function isValid(val) { return val != undefined && val != null; }
function isEmpty(array) { return array.length == 0; }
function r935(array, item) { e936(array, array.indexOf(item)); }
function e936(array, index) { if (index > -1 && index < array.length)
    array.splice(index, 1); }
function o937(array) { if (isEmpty(array))
    return null; let last = array.at(-1); array.splice(array.length - 1, 1); return last; }
function q938(array) { return array[array.length - 1]; }
function z939(array, from, to) { const item = array[from]; array.splice(from, 1); array.splice(to, 0, item); }
function g940(array, item) { const index = array.indexOf(item); if (index > -1)
    array.splice(index, 1); }
function t941(y2767, array) { for (const item of array) {
    const index = y2767.indexOf(item);
    if (index > -1)
        y2767.splice(index, 1);
} }
function f942(array, where) { const index = array.findIndex(where); if (index > -1)
    array.splice(index, 1); }
function c943(styleId) { return styleId.split(',')[0] + ','; }
function l944(points) { let j4010 = ''; if (points.length < 2)
    return j4010; j4010 += 'M'; j4010 += ' ' + j872(points[0].x); j4010 += ' ' + j872(points[0].y); for (let i = 1; i < points.length; i++) {
    j4010 += ' L' + ' ' + j872(points[i].x) + ' ' + j872(points[i].y);
} return j4010; }
function point(x, y) { return { x: x, y: y }; }
function m945(v, m) { let r = [0, 0, 0]; for (let i = 0; i < 3; i++)
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
function l946(array, item, equal = null) { if (equal) {
    if (Array.isArray(item))
        item.forEach(i => l946(array, i, equal));
    else if (!array.find(i => equal(i, item)))
        array.push(item);
}
else {
    if (Array.isArray(item))
        item.forEach(i => l946(array, i));
    else if (!array.includes(item))
        array.push(item);
} }
function z947(array, item, equal) { if (Array.isArray(item))
    item.forEach(i => z947(array, i, equal));
else if (!array.find(equal))
    array.push(item); }
function p948(array, item, except) { if (Array.isArray(item))
    item.forEach(i => p948(array, i, except));
else if (!array.find(except))
    array.push(item); }
function w949(...args) { if (q2523)
    console.assert(...args); }
function o950(...args) { if (q2523)
    console.error(...args); }
function u951(str, trim) { while (str.length >= trim.length && str.substring(0, trim.length) == trim)
    str = str.substring(trim.length); return str; }
function u952(str, trim) { while (str.length >= trim.length && str.substring(str.length - trim.length) == trim)
    str = str.substring(0, str.length - trim.length); return str; }
function i953(x4070) { const fills = []; for (const fill of x4070) {
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
            const b4186 = fill[1];
            const stops = [];
            for (const stop of fill[2]) {
                stops.push({ color: { r: Math.min(Math.max(0, stop[0]), 1), g: Math.min(Math.max(0, stop[1]), 1), b: Math.min(Math.max(0, stop[2]), 1), a: Math.min(Math.max(0, stop[3]), 1) }, position: stop[4] });
            }
            fills.push({ type: fill[0], gradientTransform: b4186, gradientStops: stops, blendMode: fill[3] });
            break;
        }
    }
} return fills; }
function v954(type) { return f1087.includes(type); }
const u1054 = 'LIST#';
const f1055 = 'NLIST#';
const u1056 = 'TLIST#';
const c1057 = 'SLIST#';
const h1058 = 'NULL';
const f1059 = 'VAR';
const u1060 = 'VARGRP';
const c1061 = 'START';
const e1062 = 'REPT';
const j1063 = 'CACHE';
const t1064 = 'FRZ';
const z1065 = 'TIMER';
const h1066 = 'VNAME';
const w1067 = 'CMB';
const m1068 = 'CDENSE';
const h1069 = 'EXTR';
const m1070 = 'SETP';
const m1071 = 'EXTRP';
const w1072 = 'SUBLST';
const v1073 = 'UNIQ';
const o1074 = 'REVLST';
const u1075 = 'SORT';
const h1076 = 'CLMN';
const x1077 = 'CELL';
const f1078 = 'LIST';
const s1079 = 'COUNT';
const f1080 = 'LCONT';
const d1081 = 'SEL';
const p1082 = 'IF';
const p1083 = 'LSTFLT';
const z1084 = 'DEFINE';
const w1085 = 'ANY#';
const x1086 = [u1054, f1055, u1056, c1057, w1067, h1069, m1070, m1071, w1072, f1078, s1079, f1080, e1062];
const f1087 = [u1054, f1055, u1056, c1057];
const m1088 = [h1058, f1059, u1060, ...x1086, m1068, h1069, m1070, m1071, w1072, v1073, o1074, h1076, u1075, x1077, f1078, d1081, p1082, p1083, c1061, e1062, z1084, j1063, t1064, z1065, h1066];
const g1089 = 'NUM#';
const t1090 = 'NUM';
const q1091 = 'NSIGN';
const q1092 = 'ABS';
const v1093 = 'ROUND';
const u1094 = 'SMINMAX';
const w1095 = 'MINMAX';
const u1096 = 'LIM';
const y1097 = 'NCURVE';
const e1098 = 'NANISNUM';
const b1099 = 'CONST';
const r1100 = 'DATE';
const f1101 = 'SEQ';
const b1102 = 'RANGE';
const p1103 = 'WAVE';
const x1104 = 'RAND';
const a1105 = 'NOISE';
const q1106 = 'PROB';
const o1107 = 'ACCUM';
const y1108 = 'LERP';
const a1109 = 'SOLVE';
const y1110 = 'NANIM';
const w1111 = 'SMATH';
const x1112 = 'MATH';
const o1113 = 'ADD';
const z1114 = 'SUB';
const q1115 = 'MUL';
const n1116 = 'DIV';
const o1117 = 'MOD';
const j1118 = 'EXP';
const x1119 = 'NBOOL';
const c1120 = 'NOT';
const c1121 = 'AND';
const j1122 = 'OR';
const g1123 = 'XOR';
const o1124 = 'COND';
const w1125 = 'EQ';
const w1126 = 'NE';
const a1127 = 'LT';
const a1128 = 'LE';
const s1129 = 'GT';
const z1130 = 'GE';
const i1131 = 'TRIG';
const t1132 = 'SIN';
const d1133 = 'COS';
const b1134 = 'TAN';
const z1135 = 'ATAN2';
const c1136 = 'CNVANG';
const a1137 = [x1112, w1111, o1113, z1114, q1115, n1116, o1117, j1118];
const s1138 = [x1119, c1120, c1121, j1122, g1123];
const y1139 = [o1124, w1125, w1126, a1127, a1128, s1129, z1130];
const f1140 = [i1131, t1132, d1133, b1134, z1135];
const j1141 = 'TEXT#';
const g1142 = 'TEXT';
const l1143 = 'TLEN';
const h1144 = 'TTRIM';
const w1145 = 'TSUB';
const s1146 = 'TCONT';
const b1147 = 'TCASE';
const v1148 = 'TREPL';
const e1149 = 'TJOIN';
const i1150 = 'TPAD';
const f1151 = 'TCMP';
const o1152 = 'TCHAR';
const g1153 = 'TUNI';
const z1154 = 'INDEX';
const p1155 = 'N2T';
const v1156 = 'C2T';
const v1157 = 'T2N';
const a1158 = 'T2C';
const a1159 = 'TSPLT';
const e3484 = 'TJSON';
const p1161 = 'TCSV';
const n1162 = 'FETCH';
const g1163 = 'TFILE';
const b1164 = [g1089, f1055, t1090, q1091, q1092, v1093, u1094, w1095, u1096, y1097, e1098, b1099, r1100, f1101, b1102, p1103, x1104, a1105, q1106, o1107, y1108, a1109, y1110, p1155, o1152, v1156, ...a1137, ...s1138, ...y1139, ...f1140, c1136];
const p1165 = [j1141, u1056, g1142, l1143, h1144, w1145, s1146, b1147, e1149, i1150, v1148, f1151, g1153, z1154, v1157, a1158, a1159, e3484, p1161, n1162, g1163];
const d1166 = 'COL#';
const u1167 = 'COL';
const n1168 = 'CVAL';
const z1169 = 'CCOR';
const n1170 = 'COLP3';
const m1171 = 'CCNT';
const w1172 = 'BLND';
const l1173 = 'CLERP';
const r1174 = 'CBLND';
const s1175 = [d1166, u1167, z1169, n1170, w1172, l1173, r1174];
const w1176 = 'FILL#';
const x1177 = 'FILL';
const y1178 = [w1176, x1177];
const s1179 = 'STRK#';
const d1180 = 'STRK';
const u1181 = [s1179, d1180];
const f1182 = 'CSTOP#';
const w1183 = 'CSTOP';
const j1184 = [f1182, w1183];
const t1185 = 'GRAD#';
const u1186 = 'GRAD';
const m1187 = [t1185, u1186];
const d1188 = 'RCRN#';
const l1189 = 'RCRN';
const e1190 = [d1188, l1189];
const h1191 = 'DRSH#';
const a1192 = 'DRSH';
const r1193 = [h1191, a1192];
const t1194 = 'INSH#';
const p1195 = 'INSH';
const v1196 = [t1194, p1195];
const z1197 = 'LBLR#';
const k1198 = 'LBLR';
const s1199 = [z1197, k1198];
const s1200 = 'BBLR#';
const y1201 = 'BBLR';
const n1202 = [s1200, y1201];
const v1203 = 'MASK#';
const q1204 = 'MASK';
const w1205 = [v1203, q1204];
const j1206 = 'BLEND#';
const d1207 = 'BLEND';
const p1208 = [j1206, d1207];
const h1209 = [...e1190, ...r1193, ...v1196, ...s1199, ...n1202, ...p1208, ...w1205];
const t1210 = [d1166, w1176, t1185, s1179, h1191, t1194, z1197, s1200, j1206, v1203];
const x1211 = 'CSTL';
const x1212 = 'SHP#';
const h1213 = 'RECT#';
const x1214 = 'RECT';
const j1215 = [h1213, x1214];
const k1216 = 'LINE#';
const r1217 = 'LINE';
const x1218 = [k1216, r1217];
const h1219 = 'ELPS#';
const u1220 = 'ELPS';
const r1221 = [h1219, u1220];
const q1222 = 'TRPZ#';
const b1223 = 'TRPZ';
const v1224 = [q1222, b1223];
const g1225 = 'POLY#';
const m1226 = 'POLY';
const e1227 = [g1225, m1226];
const r1228 = 'STAR#';
const b1229 = 'STAR';
const w1230 = [r1228, b1229];
const w1231 = 'TXTS#';
const n1232 = 'TXTS';
const f1233 = [w1231, n1232];
const z1234 = 'PT#';
const f1235 = 'PT';
const g1236 = [z1234, f1235];
const j1237 = 'PCORN';
const f1238 = 'VPATH#';
const n1239 = 'VPATH';
const j1240 = [f1238, n1239];
const r1241 = 'VPT#';
const x1242 = 'VPT';
const w1243 = [r1241, x1242];
const s1244 = 'VEDGE#';
const g1245 = 'VEDGE';
const k1246 = [s1244, g1245];
const s1247 = 'VREG#';
const u1248 = 'VREG';
const k1249 = [s1247, u1248];
const e1250 = 'VNET#';
const e1251 = 'VNET';
const b1252 = [e1250, e1251];
const c1253 = 'SGRP#';
const x1254 = 'SGRP';
const b1255 = [c1253, x1254];
const h1256 = 'FRM#';
const m1257 = 'FRM';
const a1258 = [h1256, m1257];
const k1259 = 'MOVE';
const j1260 = 'ROT';
const f1261 = 'SCALE';
const l1262 = 'SKEW';
const n1263 = 'CENTR';
const k1264 = 'RSTX';
const w1265 = 'PLACE';
const k1266 = 'APPLY';
const r1267 = 'MESPT';
const h1268 = 'VECLEN';
const s1269 = 'CIRCEN';
const c1270 = 'INTLIN';
const b1271 = 'PTLERP';
const l1272 = 'PONPT';
const k1273 = 'BOOL';
const y1274 = 'BOOL#';
const d1275 = 'BOOLU';
const t1276 = 'BOOLS';
const u1277 = 'BOOLI';
const j1278 = 'BOOLE';
const p1279 = [k1273, y1274, d1275, t1276, u1277, j1278];
const w1280 = 'RENDER';
const t1281 = [x1212, c1057, h1213, k1216, h1219, q1222, g1225, r1228, w1231, z1234, f1238, r1241, s1244, s1247, e1250, c1253, h1256, y1274, h1191, t1194, z1197, s1200, j1206, v1203];
const k1282 = [j1260, f1261, l1262];
const h1283 = [...t1281, ...j1215, ...x1218, ...r1221, ...v1224, ...e1227, ...w1230, ...f1233, ...g1236, j1237, ...j1240, ...w1243, ...k1246, ...k1249, ...b1252, ...b1255, ...a1258, ...p1279, k1259, ...k1282, n1263, k1264, w1265, k1266, r1267, h1268, s1269, c1270, b1271, l1272, w1280];
const x1284 = [u1054, f1055, u1056, c1057, g1089, j1141, d1166, w1176, f1182, t1185, s1179, f1182, t1185, x1212, h1213, k1216, h1219, q1222, g1225, r1228, w1231, z1234, f1238, r1241, s1244, s1247, e1250, c1253, h1256, d1188, h1191, t1194, z1197, s1200, j1206, v1203];
const s1285 = 'GROUP';
const u1286 = 'GPARAM';
const k1287 = [s1285, u1286];
const i1288 = 'CMNT';
const x1289 = 'CMNTARR';
const x1290 = 'PANEL';
const u1291 = 'ACT';
const j1292 = 'BEF';
const v1293 = 'DIS';
const d1294 = 'NOC';
const e1295 = 'PARAM';
const f1296 = 'LOG';
const j1297 = 'GRAPH';
const l1298 = [[z1114, '−'], [o1113, '+'], [o1117, '%'], [n1116, '/'], [q1115, '×'], [j1118, 'e<sup>x</sup>']];
const w1299 = [[z1114, '−'], [o1113, '+'], [n1116, '/'], [q1115, '×']];
const v1300 = 0;
const s1301 = 1;
const k1302 = 2;
const c1303 = 3;
const h1304 = [[v1300, 'not'], [s1301, 'xor'], [k1302, 'or'], [c1303, 'and']];
const d1305 = 0;
const t1306 = 1;
const r1307 = 2;
const e1308 = 3;
const t1309 = 4;
const h1310 = 5;
const m1311 = [[d1305, '<'], [t1306, '≤'], [r1307, '≠'], [e1308, '='], [t1309, '≥'], [h1310, '>']];
const c1312 = 0;
const l1313 = 1;
const n1314 = 2;
const p1315 = 3;
const u1316 = 4;
const e1317 = 5;
const q1318 = [[c1312, 'sin'], [l1313, 'cos'], [n1314, 'tan'], [p1315, 'asin'], [u1316, 'acos'], [e1317, 'atan']];
const s1319 = 'EMPTY';
const b1320 = 'CONNECT';
const a1321 = 'CREATE';
const j1322 = 'CREATE_INSERT';
const j1323 = 'DELETE';
const u1324 = 'DISCONNECT';
const i1325 = 'LINK_STYLE';
const s1326 = 'LINK_VARIABLE';
const p1327 = 'LINK_VARIABLE_GROUP';
const h1328 = 'MAKE_ACTIVE';
const t1329 = 'MAKE_PASSIVE';
const y1330 = 'PASTE';
const j1331 = 'RECONNECT';
const i1332 = 'REMOVE';
const n1333 = 'RENAME';
const t1334 = 'REORDER_INPUTS';
const d1335 = 'REORDER_CONNECTIONS';
const j1336 = 'SELECT';
const i1337 = 'SELECT_MOVE';
const a1338 = 'MOVE_NODES';
const t1339 = 'SET_PARAM_VALUE';
const y1340 = 'SET_PARAM_SETTING';
const d1341 = 'SET_NODE_RECT';
const f1342 = 'TOGGLE_DISABLE';
const o1343 = 'TOGGLE_PARAM_HEADER';
const q1344 = 'SET_CURRENT_GRAPH';
const l1345 = 'CREATE_PAGE';
const s1346 = 'DELETE_PAGE';
const y1347 = 'GROUP_NODES';
const h1348 = 'UNGROUP_NODES';
const o1349 = 'HIGHLIGHT_NODES';
const j1350 = 'BNORM';
const a1351 = 'BDARK';
const t1352 = 'BMULT';
const t1353 = 'BPDRK';
const u1354 = 'BBURN';
const v1355 = 'BLITE';
const j1356 = 'BSCRN';
const b1357 = 'BPLGT';
const h1358 = 'BDODG';
const z1359 = 'BOVER';
const l1360 = 'BSOFT';
const d1361 = 'BHARD';
const j1362 = 'BDIFF';
const l1363 = 'BEXCL';
const v1364 = 'BHUE';
const x1365 = 'BSAT';
const d1366 = 'BCOL';
const p1367 = 'BLUM';
const r1368 = [[j1350, 'normal', 'NORMAL'], [a1351, 'darken', 'DARKEN'], [t1352, 'multiply', 'MULTIPLY'], [t1353, 'plus darker', 'LINEAR_BURN'], [u1354, 'color burn', 'COLOR_BURN'], [v1355, 'lighten', 'LIGHTEN'], [j1356, 'screen', 'SCREEN'], [b1357, 'plus lighter', 'LINEAR_DODGE'], [h1358, 'color dodge', 'COLOR_DODGE'], [z1359, 'overlay', 'OVERLAY'], [l1360, 'soft light', 'SOFT_LIGHT'], [d1361, 'hard light', 'HARD_LIGHT'], [j1362, 'difference', 'DIFFERENCE'], [l1363, 'exclusion', 'EXCLUSION'], [v1364, 'hue', 'HUE'], [x1365, 'saturation', 'SATURATION'], [d1366, 'color', 'COLOR'], [p1367, 'luminosity', 'LUMINOSITY']];
const k1369 = [['thin', 100], ['extra light', 200], ['light', 300], ['regular', 400], ['medium', 500], ['semi bold', 600], ['bold', 700], ['extra bold', 800], ['black', 900]];
const g1370 = 0;
const m1371 = 1;
const e1372 = 2;
const w1373 = 2;
const t1374 = 3;
const x1375 = 3;
const u1376 = 4;
const v1377 = 4;
const t1378 = 5;
const j1379 = 6;
const q1380 = 7;
const u1381 = 8;
const i1382 = 9;
const s1383 = 10;
const k1384 = 11;
const x1385 = 12;
const q1386 = 13;
const o1387 = 14;
const s1388 = 15;
const y1389 = 16;
const t1390 = 17;
const h1391 = 18;
const a1392 = 19;
const b1393 = 20;
const i1394 = 21;
const v1395 = 22;
const t1396 = 23;
const u1397 = 24;
const s1398 = 24;
const s1399 = 25;
const h1400 = 26;
const c1401 = 27;
const g1402 = 28;
const x1403 = 28;
const h1404 = 28;
const w1405 = 28;
const w1406 = 28;
const x1407 = 28;
const a1408 = 28;
const x1409 = 28;
const a1410 = 29;
const o1411 = 29;
const h1412 = 29;
const y1413 = 29;
const i1414 = 29;
const q1415 = 29;
const v1416 = 30;
const q1417 = 30;
const a1418 = 30;
const y1419 = 30;
const h1420 = 31;
const o1421 = 31;
const x1422 = 32;
const t1423 = 33;
const q1424 = 34;
const y1425 = 35;
const l1426 = 36;
const d1427 = 37;
const k2768 = '12345679ABCDEFGHJKLMNPQRSTUVWXYZ';
function l842(array, chars = k2768) { let h844 = ''; let len = array.length; let i = 0; while (len > 0) {
    if (len >= 5) {
        const a0 = array[i], a1 = array[i + 1], a2 = array[i + 2], a3 = array[i + 3], a4 = array[i + 4];
        h844 += chars[(a0 & 0xF8) >>> 3];
        h844 += chars[((a0 & 0x07) << 2) | ((a1 & 0xC0) >>> 6)];
        h844 += chars[(a1 & 0x3E) >>> 1];
        h844 += chars[((a1 & 0x01) << 4) | ((a2 & 0xF0) >>> 4)];
        h844 += chars[((a2 & 0x0F) << 1) | ((a3 & 0x80) >>> 7)];
        h844 += chars[(a3 & 0x7C) >>> 2];
        h844 += chars[((a3 & 0x03) << 3) | ((a4 & 0xE0) >>> 5)];
        h844 += chars[(a4 & 0x1F)];
    }
    else if (len == 4) {
        const a0 = array[i], a1 = array[i + 1], a2 = array[i + 2], a3 = array[i + 3];
        h844 += chars[(a0 & 0xF8) >>> 3];
        h844 += chars[((a0 & 0x07) << 2) | ((a1 & 0xC0) >>> 6)];
        h844 += chars[(a1 & 0x3E) >>> 1];
        h844 += chars[((a1 & 0x01) << 4) | ((a2 & 0xF0) >>> 4)];
        h844 += chars[((a2 & 0x0F) << 1) | ((a3 & 0x80) >>> 7)];
        h844 += chars[(a3 & 0x7C) >>> 2];
        h844 += chars[((a3 & 0x03) << 3)];
    }
    else if (len == 3) {
        const a0 = array[i], a1 = array[i + 1], a2 = array[i + 2];
        h844 += chars[(a0 & 0xF8) >>> 3];
        h844 += chars[((a0 & 0x07) << 2) | ((a1 & 0xC0) >>> 6)];
        h844 += chars[(a1 & 0x3E) >>> 1];
        h844 += chars[((a1 & 0x01) << 4) | ((a2 & 0xF0) >>> 4)];
        h844 += chars[((a2 & 0x0F) << 1)];
    }
    else if (len == 2) {
        const a0 = array[i], a1 = array[i + 1];
        h844 += chars[(a0 & 0xF8) >>> 3];
        h844 += chars[((a0 & 0x07) << 2) | ((a1 & 0xC0) >>> 6)];
        h844 += chars[(a1 & 0x3E) >>> 1];
        h844 += chars[((a1 & 0x01) << 4)];
    }
    else if (len == 1) {
        const a0 = array[i];
        h844 += chars[(a0 & 0xF8) >>> 3];
        h844 += chars[((a0 & 0x07) << 2)];
    }
    i += 5;
    len -= 5;
} return h844; }
function v843(h844, chars = k2768) { const array = []; let len = h844.length; let c = 0; while (len > 0) {
    if (len >= 8) {
        const c0 = chars.indexOf(h844[c]), c1 = chars.indexOf(h844[c + 1]), c2 = chars.indexOf(h844[c + 2]), c3 = chars.indexOf(h844[c + 3]), c4 = chars.indexOf(h844[c + 4]), c5 = chars.indexOf(h844[c + 5]), c6 = chars.indexOf(h844[c + 6]), c7 = chars.indexOf(h844[c + 7]);
        array.push((c0 << 3) | ((c1 & 0x1C) >>> 2));
        array.push(((c1 & 0x03) << 6) | (c2 << 1) | ((c3 & 0x10) >>> 4));
        array.push(((c3 & 0x0F) << 4) | ((c4 & 0x1E) >>> 1));
        array.push(((c4 & 0x01) << 7) | (c5 << 2) | ((c6 & 0x18) >>> 3));
        array.push(((c6 & 0x07) << 5) | c7);
    }
    else if (len == 7) {
        const c0 = chars.indexOf(h844[c]), c1 = chars.indexOf(h844[c + 1]), c2 = chars.indexOf(h844[c + 2]), c3 = chars.indexOf(h844[c + 3]), c4 = chars.indexOf(h844[c + 4]), c5 = chars.indexOf(h844[c + 5]), c6 = chars.indexOf(h844[c + 6]);
        array.push((c0 << 3) | ((c1 & 0x1C) >>> 2));
        array.push(((c1 & 0x03) << 6) | (c2 << 1) | ((c3 & 0x10) >>> 4));
        array.push(((c3 & 0x0F) << 4) | ((c4 & 0x1E) >>> 1));
        array.push(((c4 & 0x01) << 7) | (c5 << 2) | ((c6 & 0x18) >>> 3));
    }
    else if (len == 5) {
        const c0 = chars.indexOf(h844[c]), c1 = chars.indexOf(h844[c + 1]), c2 = chars.indexOf(h844[c + 2]), c3 = chars.indexOf(h844[c + 3]), c4 = chars.indexOf(h844[c + 4]);
        array.push((c0 << 3) | ((c1 & 0x1C) >>> 2));
        array.push(((c1 & 0x03) << 6) | (c2 << 1) | ((c3 & 0x10) >>> 4));
        array.push(((c3 & 0x0F) << 4) | ((c4 & 0x1E) >>> 1));
    }
    else if (len == 4) {
        const c0 = chars.indexOf(h844[c]), c1 = chars.indexOf(h844[c + 1]), c2 = chars.indexOf(h844[c + 2]), c3 = chars.indexOf(h844[c + 3]);
        array.push((c0 << 3) | ((c1 & 0x1C) >>> 2));
        array.push(((c1 & 0x03) << 6) | (c2 << 1) | ((c3 & 0x10) >>> 4));
    }
    else if (len == 2) {
        const c0 = chars.indexOf(h844[c]), c1 = chars.indexOf(h844[c + 1]);
        array.push((c0 << 3) | ((c1 & 0x1C) >>> 2));
    }
    c += 8;
    len -= 8;
} return array; }
function n2086(nodeKey, d3982) { const log = a2087(n1537(nodeKey, false)); if (d3982) {
    console.log('%c%s\n%c%s', 'background: #fa24; color: white;', k1052(nodeKey), 'background: #fa44; color: #edc;', log);
}
else {
    console.log('%c%s\n%c%s', 'background: #fdb; color: black;', k1052(nodeKey), 'background: #fed; color: black;', log);
} }
function a2087(json) { let k4011 = json.replace('{\n', '').replace('\n}', '').replace('[\n' + b863, '').replace('\n' + b863 + ']', '').split(b863 + '"params":\n').join('').split('": "').join(': ').split('", "').join(': ').split(b863 + '"').join(b863).split(b863 + b863 + '["').join(b863 + b863).split('",\n').join('\n').split('"\n').join('\n').split('"],\n').join('\n'); if (k4011[k4011.length - 1] == '"')
    k4011 = k4011.substring(0, k4011.length - 1); if (k4011.substring(k4011.length - 2) == '"]')
    k4011 = k4011.substring(0, k4011.length - 2); return k4011; }
function l2088(json) { let k4011 = json.replace('{\n', '').replace('\n}', '').replace('[\n' + b863, '').replace('\n' + b863 + ']', ''); return k4011; }
function a2089(r243, d3982) { const p4189 = i921(r243, true); if (d3982) {
    console.log('%c%s', 'background: #4f44; color: #ded', p4189);
}
else {
    console.log('%c%s', 'background: #cfc; color: black;', p4189);
} }
console.clear();
figma.on('documentchange', w1508);
figma.on('selectionchange', i1516);
figma.on('close', w1509);
b1498(true);
figma.clientStorage.getAsync('pro').then(data => { figma.showUI(__html__, { visible: false, themeColors: true, title: 'Generator' + (data === true ? ' Pro' : '') }); });
var r2695 = figma.viewport.zoom;
setInterval(w1513, 100);
const c2769 = 'clock_';
const j2770 = 1000;
var o2771 = false;
function r1510() { (function () {
    return __awaiter(this, void 0, void 0, function* () { let z2772 = yield figma.currentPage.getPluginData(figma.currentUser.id + ',windowWidth'); let g2773 = yield figma.currentPage.getPluginData(figma.currentUser.id + ',windowHeight'); let g2774; let d2775; if (z2772 === NULL) {
        g2774 = 800;
        figma.currentPage.setPluginData(figma.currentUser.id + ',windowWidth', z2772.toString());
    }
    else
        g2774 = parseInt(z2772); if (g2773 === NULL) {
        d2775 = 600;
        figma.currentPage.setPluginData(figma.currentUser.id + ',windowHeight', g2773.toString());
    }
    else
        d2775 = parseInt(g2773); figma.ui.resize(Math.max(0, g2774), Math.max(0, d2775)); figma.ui.show(); const fonts = yield figma.listAvailableFontsAsync(); const eula = (yield figma.clientStorage.getAsync('eula')) === 'true'; const tutorials = (yield figma.clientStorage.getAsync('tutorials')) === 'true'; const isLocked = b1515(); m1517({ cmd: 'uiReturnFigStartGenerator', currentUser: figma.currentUser, viewportRect: figma.viewport.bounds, viewportZoom: figma.viewport.zoom, fonts: fonts, eula: eula, tutorials: tutorials, isLocked: isLocked }); });
})(); }
function c1511() { b1498(); figma.showUI(__html__, { visible: false, themeColors: true }); }
function t1512() { setInterval(l1514, j2770); }
function w1513() { if (figma.viewport.zoom == r2695)
    return; r2695 = figma.viewport.zoom; t2683(); o1531(); w1533(); }
function l1514() { i1538(c2769 + figma.currentUser.sessionId.toString(), Date.now().toString()); }
function b1515() { const clocks = figma.currentPage.getPluginDataKeys().filter(k => k.length > c2769.length && k.substring(0, c2769.length) == c2769 && k.substring(c2769.length) != figma.currentUser.sessionId.toString()).map(k => parseInt(n1537(k))); clocks.sort(); const now = Date.now(); const locked = clocks.length > 0 && now - clocks[clocks.length - 1] < j2770 * 2; return locked; }
function i1516() { t2683(); }
var y2710 = new Array();
var s2712 = new Array();
function k1496(l1497) { for (let i = q2745.length - 1; i >= 0; i--)
    if (!q2745[i].removed && l1497.includes(q2745[i].getPluginData('nodeId')))
        q2745.splice(i, 1); for (let i = f2753.length - 1; i >= 0; i--)
    if (f2753[i].removed || l1497.includes(f2753[i].getPluginData('nodeId')))
        f2753.splice(i, 1); figma.currentPage.findAll(o => l1497.includes(o.getPluginData('nodeId'))).forEach(o => { if (!o.removed)
    o.remove(); }); y2710 = y2710.filter(a => !l1497.includes(a.nodeId)); }
function b1498(y1499 = false) { for (const o1504 of figma.currentPage.children) {
    if (o1504.removed)
        continue;
    if (o1504.getPluginData('objectId') != '' && o1504.getPluginData('userId') == figma.currentUser.id && (parseInt(o1504.getPluginData('retain')) == 0 || y1499))
        o1504.remove();
} }
function t1500(l1497, u1501) { for (let i = y2710.length - 1; i >= 0; i--) {
    const n2711 = y2710[i];
    if (!l1497.includes(n2711.nodeId))
        continue;
    for (let j = n2711.objects.length - 1; j >= 0; j--) {
        const o1504 = n2711.objects[j];
        if (o1504.removed || !f1502(o1504, u1501)) {
            if (!o1504.removed)
                o1504.remove();
            g940(n2711.objects, o1504);
            if (q2745.includes(o1504))
                g940(q2745, o1504);
            if (f2753.includes(o1504))
                g940(f2753, o1504);
        }
        if (!o1504.removed) {
            if (parseInt(o1504.getPluginData('retain')) == 2)
                m1523(o1504);
        }
    }
    if (isEmpty(n2711.objects))
        g940(y2710, n2711);
} }
function f1502(o1504, u1501) { if (o1504.type == x1254 || o1504.type == m1257) {
    for (const child of o1504.children) {
        const found = f1502(child, u1501);
        if (found)
            return found;
    }
}
else {
    const found = u1501.find(o => o1504.getPluginData('objectId') == o[e1372] && o1504.getPluginData('userId') == figma.currentUser.id || o[t1378] == 2 && o[t1378] == o1504.getPluginData('retain'));
    if (found)
        return found;
} return null; }
function p1505(l1497, x1506) { const paintStyles = figma.getLocalPaintStyles(); paintStyles.filter(s => l1497.includes(s.getPluginData('nodeId'))).forEach(s => { const nodeId = s.getPluginData('nodeId'); const existing = m920(s.getPluginData('existing')); if (!existing) {
    s.remove();
}
else if (x1506) {
    f942(s2712, a => a.nodeId == nodeId);
    s.setPluginData('type', NULL);
    s.setPluginData('nodeId', NULL);
    s.setPluginData('existing', NULL);
} }); if (x1506)
    s2712 = s2712.filter(a => !l1497.includes(a.nodeId)); }
var f1507 = false;
function w1508(e) { for (const change of e.documentChanges) {
    switch (change.type) {
        case 'STYLE_CREATE':
            if (!change.style)
                break;
            if (!f1507) {
                change.style.setPluginData('type', NULL);
                change.style.setPluginData('nodeId', NULL);
                change.style.setPluginData('existing', NULL);
            }
            break;
        case 'STYLE_PROPERTY_CHANGE': {
            if (!change.style)
                break;
            if (!f1507) {
                const msg = { cmd: 'uiStylePropertyChange', styleId: c943(change.id), properties: change.properties, name: '', paints: [] };
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
                m1517(msg);
            }
            break;
        }
        case 'STYLE_DELETE':
            m1517({ cmd: 'uiStyleDelete', styleId: change.id });
            break;
    }
} f1507 = false; }
function w1509() { b1498(); m1517({ cmd: 'updateMetrics' }); }
figma.ui.onmessage = function (msg) { msg = JSON.parse(msg); if (msg.cmd == 'returnUiGetValueForFigma')
    return; switch (msg.cmd) {
    case 'figStartGenerator':
        r1510();
        break;
    case 'figRestartGenerator':
        c1511();
        break;
    case 'figFinishStart':
        t1512();
        break;
    case 'figDockWindowNormal':
        e2719('normal');
        break;
    case 'figDockWindowMaximize':
        e2719('maximize');
        break;
    case 'figDockWindowTop':
        e2719('top');
        break;
    case 'figDockWindowLeft':
        e2719('left');
        break;
    case 'figDockWindowRight':
        e2719('right');
        break;
    case 'figDockWindowBottom':
        e2719('bottom');
        break;
    case 'figGetMousePosition':
        l1583(msg.clientPosition);
        break;
    case 'figResizeWindow':
        h1586(msg.width, msg.height);
        break;
    case 'figSetWindowRect':
        r1584(msg.x, msg.y, msg.width, msg.height);
        break;
    case 'figNotify':
        q1587(msg);
        break;
    case 'figGetLocalData':
        c1535(msg.key);
        break;
    case 'figSetLocalData':
        d1536(msg.key, msg.value);
        break;
    case 'figClearAllLocalData':
        v4006();
        break;
    case 'figGetPageData':
        n1537(msg.key);
        break;
    case 'figSetPageData':
        i1538(msg.key, msg.value);
        break;
    case 'figSavePages':
        u1543(msg.pageIds, msg.pageJson, msg.currentPageId);
        break;
    case 'figLoadNodesAndConns':
        d1540(msg.debugMode);
        break;
    case 'figSaveNodes':
        s1544(msg.l1497, msg.nodeJson);
        break;
    case 'figGetAllLocalTemplateNames':
        q2716();
        break;
    case 'figSaveLocalTemplate':
        g1545(msg.s4007, msg.template);
        break;
    case 'figRemoveConnsToNodes':
        g1546(msg.l1497);
        break;
    case 'figRemoveSavedNodesAndConns':
        h1547(msg.l1497);
        break;
    case 'figRemoveAllSavedNodesAndConns':
        r1548();
        break;
    case 'figLogAllSavedNodesAndConns':
        a1549(msg.d3982);
        break;
    case 'figLogAllSavedNodes':
        z1550(msg.d3982);
        break;
    case 'figLogAllSavedConns':
        x1551(msg.d3982);
        break;
    case 'figLogAllSavedPageKeys':
        h1552(msg.d3982);
        break;
    case 'figLogAllSavedPages':
        j1553(msg.d3982);
        break;
    case 'figLogAllSavedConnKeys':
        f1554(msg.d3982);
        break;
    case 'figLogAllLocalData':
        q1555(msg.d3982);
        break;
    case 'figGetValue':
        g1556(msg.key, msg.spec);
        break;
    case 'figRemoveSavedPage':
        l1558(msg.pageId);
        break;
    case 'figRemoveAllSavedPages':
        k1559();
        break;
    case 'figSaveConnection':
        i1560(msg.key, msg.json);
        break;
    case 'figSaveConnections':
        u1561(msg.keys, msg.json);
        break;
    case 'figUpdateSavedConnections':
        t1562(msg.curKeys, msg.newKeys, msg.json);
        break;
    case 'figDeleteSavedConnection':
        g1563(msg.key);
        break;
    case 'figRemoveAllSavedConnections':
        r1564();
        break;
    case 'figDeleteSavedConnectionsToNode':
        c1565(msg.nodeId);
        break;
    case 'figDeleteSavedConnectionsFromNode':
        c1566(msg.nodeId);
        break;
    case 'figRemovePluginDataFromAllLocalStyles':
        w1567();
        break;
    case 'figGetAllLocalVariables':
        k1591(msg.nodeId, msg.px, msg.py);
        break;
    case 'figLinkNodeToVariable':
        x1593(msg.nodeId, msg.variableId);
        break;
    case 'figUpdateVariable':
        z1594(msg.variableId, msg.value);
        break;
    case 'figGetAllLocalColorStyles':
        f1568(msg.nodeId, msg.px, msg.py);
        break;
    case 'figLinkNodeToExistingColorStyle':
        i1569(msg.nodeId, msg.styleId);
        break;
    case 'figGetObjectSize':
        o1522(msg.object);
        break;
    case 'figGetVariableUpdates':
        t1557(msg.linkedVarIds);
        break;
    case 'figUpdateShowIds':
        o2771 = msg.o2771;
        break;
    case 'figDeleteAllObjects':
        b1498();
        break;
    case 'figUpdateObjectsAndStyles':
        t2725 = 0;
        x2726 = 0;
        z2713(null, msg.objects, msg.o3996, msg.l1497, msg.n2741, msg.e2742, msg.r272);
        p1574(msg);
        break;
    case 'figDeleteObjectsAndStyles':
        k1496(msg.l1497);
        p1505(msg.l1497, msg.x1506);
        break;
    case 'figDeleteObjectsExcept':
        t1500(msg.l1497, msg.ignoreObjects);
        break;
    case 'figTriggerUndo':
        figma.triggerUndo();
        break;
    case 'figCommitUndo':
        figma.commitUndo();
        break;
} m1517({ cmd: 'uiEndFigMessage', msgCmd: msg.cmd }); };
function m1517(msg) { figma.ui.postMessage(JSON.stringify(msg)); }
function c2714(key) {
    return __awaiter(this, void 0, void 0, function* () { return yield figma.clientStorage.getAsync(key); });
}
function c1535(key) { if (key == 'canvasEmpty') {
    m1517({ cmd: 'uiReturnFigGetLocalData', key: key, value: figma.currentPage.children.length == 0 });
}
else if (key == 'debugWarningCrash') {
    figma.clientStorage.getAsync('debugWarning').then(data => { m1517({ cmd: 'uiReturnFigGetLocalData', key: key, value: data }); });
}
else {
    figma.clientStorage.getAsync(key).then(data => { m1517({ cmd: 'uiReturnFigGetLocalData', key: key, value: data }); });
} }
function d1536(key, value, postToUi = true) { figma.clientStorage.setAsync(key, value); if (postToUi) {
    m1517({ cmd: 'uiReturnFigSetLocalData', key: key, value: value });
} }
function v4006() {
    return __awaiter(this, void 0, void 0, function* () { const keys = yield figma.clientStorage.keysAsync(); for (const key of keys)
        figma.clientStorage.deleteAsync(key); });
}
function n1537(key, postToUi = true) { const data = figma.currentPage.getPluginData(key); if (postToUi) {
    m1517({ cmd: 'uiReturnFigGetPageData', key: key, value: data });
} return data; }
function i1538(key, value) { i1539(key); figma.currentPage.setPluginData(key, value); }
function i1539(key) { figma.currentPage.setPluginData(key, ''); }
function d1540(debugMode) { const pageKeys = figma.currentPage.getPluginDataKeys().filter(k => w1048(k)); const nodeKeys = figma.currentPage.getPluginDataKeys().filter(k => k1049(k)); const connKeys = figma.currentPage.getPluginDataKeys().filter(k => n1050(k)); if (!debugMode)
    m1542(nodeKeys, connKeys); const pages = pageKeys.map(k => figma.currentPage.getPluginData(k)); const nodes = nodeKeys.map(k => figma.currentPage.getPluginData(k)); const p2106 = connKeys.map(k => figma.currentPage.getPluginData(k)); const pageOrder = figma.currentPage.getPluginData('pageOrder').split(','); const currentPageId = figma.currentPage.getPluginData('currentPageId'); a1541(nodes); const h3641 = figma.currentPage.getPluginData('showAllColorSpaces'); m1517({ cmd: 'uiReturnFigLoadNodesAndConns', h3641: h3641, pageKeys: pageKeys, pageJson: pages, pageOrder: pageOrder, currentPageId: currentPageId, nodeKeys: nodeKeys, nodeJson: nodes, connKeys: connKeys, connJson: p2106 }); }
function a1541(nodes) { s2712 = []; const paintStyles = figma.getLocalPaintStyles(); for (const v2990 of nodes) {
    const node = JSON.parse(v2990);
    if (node.type == x1211) {
        const style = paintStyles.find(s => { const nodeId = s.getPluginData('nodeId'); return nodeId == node.id; });
        if (style) {
            s2712.push({ nodeId: node.id, existing: m920(node.existing), styles: [style] });
        }
    }
} }
function m1542(nodeKeys, connKeys) { const i2715 = '"loading": "true"'; const not = '{\n'; const set = '{\n' + b863 + i2715 + ',\n'; nodeKeys.forEach(k => figma.currentPage.setPluginData(k, figma.currentPage.getPluginData(k).replace(set, not).replace(not, set))); connKeys.forEach(k => figma.currentPage.setPluginData(k, figma.currentPage.getPluginData(k).replace(set, not).replace(not, set))); }
function u1543(pageIds, pageJson, currentPageId) { for (let i = 0; i < pageIds.length; i++) {
    i1538(s919(pageIds[i]), pageJson[i]);
} i1538('pageOrder', pageIds.join(',')); i1538('currentPageId', currentPageId); }
function s1544(l1497, nodeJson) { for (let i = 0; i < l1497.length; i++) {
    i1538(u917(l1497[i]), nodeJson[i]);
} }
function q2716() {
    return __awaiter(this, void 0, void 0, function* () { let keys = yield figma.clientStorage.keysAsync(); keys = keys.filter(k => k.length >= l871.length && k.substring(0, l871.length) == l871); m1517({ cmd: 'uiReturnGetAllLocalTemplateNames', templateNames: keys }); });
}
function g1545(s4007, template) { d1536(l871 + ' ' + s4007, template); }
function g1546(l1497) { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => n1050(k)); for (const key of connKeys) {
    const parts = n1053(key).split(' ');
    if (l1497.includes(parts[0]) || l1497.includes(parts[2]))
        i1539(key);
} }
function h1547(l1497) { g1546(l1497); const nodeKeys = figma.currentPage.getPluginDataKeys().filter(k => k1049(k) && l1497.includes(k1052(k))); nodeKeys.forEach(k => i1539(k)); }
function r1548() { const nodeKeys = figma.currentPage.getPluginDataKeys().filter(k => k1049(k)); const connKeys = figma.currentPage.getPluginDataKeys().filter(k => n1050(k)); for (const key of nodeKeys)
    i1539(key); for (const key of connKeys)
    i1539(key); }
function a1549(d3982) { z1550(d3982); x1551(d3982); }
function z1550(d3982) { figma.currentPage.getPluginDataKeys().filter(k => k1049(k)).forEach(k => n2086(k, d3982)); }
function x1551(d3982) { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => n1050(k)); connKeys.sort((key1, key2) => { const p1 = n1053(key1).split(' '); const p2 = n1053(key2).split(' '); if (p1[2] != p2[2])
    return p1[2] < p2[2] ? -1 : 1; if (p1[3] != p2[3])
    return parseInt(p1[3]) - parseInt(p2[3]); if (p1[2] == p2[0])
    return -1; if (p2[2] == p1[0])
    return 1; return 0; }); connKeys.forEach(k => a2089(JSON.parse(figma.currentPage.getPluginData(k)), d3982)); }
function h1552(d3982) { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => w1048(k)); connKeys.forEach(k => console.log('%c' + k, 'background: #fff; color: ' + (d3982 ? 'black' : 'white'))); const pageOrder = figma.currentPage.getPluginData('pageOrder'); console.log('%c' + pageOrder, 'background: #fff; color: ' + (d3982 ? 'black' : 'white')); }
function j1553(d3982) { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => w1048(k)); connKeys.forEach(k => console.log('%c' + figma.currentPage.getPluginData(k), 'background: #fff; color: ' + (d3982 ? 'black' : 'white'))); const pageOrder = figma.currentPage.getPluginData('pageOrder'); console.log('%c' + pageOrder, 'background: #fff; color: ' + (d3982 ? 'black' : 'white')); }
function f1554(d3982) { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => n1050(k)); connKeys.forEach(k => console.log('%c' + k, 'background: #dff; color: ' + (d3982 ? 'black' : 'white'))); }
function q1555(d3982) { figma.clientStorage.keysAsync().then(keys => keys.forEach(k => figma.clientStorage.getAsync(k).then(val => console.log(k + ': ' + val)))); }
function g1556(key, spec) { switch (key) {
    case 'getVariableData': {
        m1517({ cmd: 'returnFigGetValue', value: c1592(spec) });
        break;
    }
} }
function t1557(varIds) { m1517({ cmd: 'uiReturnFigGetVariableUpdates', values: c1592(varIds) }); }
function l1558(pageId) { i1539(o929(pageId)); const pageOrder = n1537('pageOrder').split(','); f942(pageOrder, id => id == pageId); i1538('pageOrder', pageOrder.join(',')); }
function k1559() { const pageKeys = figma.currentPage.getPluginDataKeys().filter(k => w1048(k)); pageKeys.forEach(k => i1539(k)); i1539('pageOrder'); }
function i1560(key, json) { i1538(key, json); }
function u1561(_keys, _json) { const keys = JSON.parse(_keys); const json = JSON.parse(_json); for (let i = 0; i < keys.length; i++)
    i1538(keys[i], json[i]); }
function t1562(_curKeys, _newKeys, _json) { const curKeys = JSON.parse(_curKeys); const newKeys = JSON.parse(_newKeys); const json = JSON.parse(_json); for (let i = 0; i < curKeys.length; i++) {
    i1539(curKeys[i]);
    i1538(newKeys[i], json[i]);
} }
function g1563(key) { i1539(key); }
function r1564() { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => n1050(k)); connKeys.forEach(k => i1539(k)); }
function c1565(nodeId) { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => n1050(k)); for (const key of connKeys) {
    const parts = key.split(' ');
    if (parts[4] == nodeId)
        i1539(key);
} }
function c1566(nodeId) { const connKeys = figma.currentPage.getPluginDataKeys().filter(k => n1050(k)); for (const key of connKeys) {
    const parts = key.split(' ');
    if (parts[1] == nodeId)
        i1539(key);
} }
function w1567() { const u1571 = figma.getLocalPaintStyles(); for (const style of u1571) {
    style.setPluginData('type', '');
    style.setPluginData('nodeId', '');
    style.setPluginData('existing', '');
} }
var l2717 = null;
var f4008 = () => l2717 = null;
var f2718 = 'normal';
function l1583(clientPosition) { m1517({ cmd: 'uiReturnFigGetMousePosition', position: { x: 0, y: 0 }, clientPosition: clientPosition, viewportZoom: figma.viewport.zoom, viewportRect: figma.viewport.bounds }); }
function r1584(x, y, width, height) { return; (function () {
    return __awaiter(this, void 0, void 0, function* () { const rect = { x: Math.round(x), y: Math.round(y), width: Math.floor(Math.max(0, width)), height: Math.floor(Math.max(0, height)) }; figma.ui.reposition(rect.x, rect.y); figma.ui.resize(rect.width, rect.height); figma.clientStorage.setAsync('windowX', rect.x); figma.clientStorage.setAsync('windowY', rect.y); figma.clientStorage.setAsync('windowWidth', rect.width); figma.clientStorage.setAsync('windowHeight', rect.height); m1517({ cmd: 'uiReturnFigSetWindowRect' }); });
})(); }
function g1585(dock, rect, bounds) { switch (dock) {
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
function h1586(width, height) { (function () {
    return __awaiter(this, void 0, void 0, function* () { let position = false; width = Math.floor(Math.max(0, width)); height = Math.floor(Math.max(0, height)); width = Math.round(width); height = Math.round(height); figma.ui.resize(width, height); figma.currentPage.setPluginData(figma.currentUser.id + ',windowWidth', width.toString()); figma.currentPage.setPluginData(figma.currentUser.id + ',windowHeight', height.toString()); m1517({ cmd: 'uiReturnFigResizeWindow' }); });
})(); }
function e2719(dock) {
    return __awaiter(this, void 0, void 0, function* () { if (dock != 'normal' && f2718 == 'normal') {
        figma.clientStorage.setAsync('normalWindowX', yield figma.clientStorage.getAsync('normalWindowX'));
        figma.clientStorage.setAsync('normalWindowY', yield figma.clientStorage.getAsync('normalWindowY'));
        figma.clientStorage.setAsync('normalWindowWidth', yield figma.clientStorage.getAsync('normalWindowWidth'));
        figma.clientStorage.setAsync('normalWindowHeight', yield figma.clientStorage.getAsync('normalWindowHeight'));
    } f2718 = dock; figma.clientStorage.setAsync('windowDock', dock); h1586(yield figma.clientStorage.getAsync('windowWidth'), yield figma.clientStorage.getAsync('windowHeight')); });
}
function q1587(msg) { q1588(msg.text, msg.prefix, msg.delay, msg.error, msg.a1589, msg.w1590); }
function q1588(text, prefix = 'Generator ', delay = 400, error = false, a1589 = '', w1590 = NULL) { const options = { timeout: delay, error: error, onDequeue: f4008 }; if (a1589 != '') {
    options['button'] = { text: a1589 };
    if (w1590.substring(0, 'removeConnection'.length) == 'removeConnection') {
        options['button']['action'] = () => g1563(w1590.split(',')[1]);
    }
    else {
        switch (w1590) {
            case 'hideClearUndoWarning':
                options['button']['action'] = () => m1517({ cmd: 'uiHideClearUndoWarning' });
                break;
        }
    }
} if (l2717)
    l2717.cancel(); l2717 = figma.notify(prefix + text, options); }
function q2720(key, params = null) {
    return __awaiter(this, void 0, void 0, function* () { return yield p2721(key, params); });
}
function p2721(key, params = null) {
    return __awaiter(this, void 0, void 0, function* () { return new Promise((resolve, reject) => { const timeout = 60000; m1517(Object.assign({ cmd: 'uiGetValueForFigma', key: key }, (params || {}))); const p2722 = setTimeout(() => reject(new Error('Timeout: Result not received by Figma within the specified time')), timeout); function z4009(msg) { msg = JSON.parse(msg); if (msg.cmd === 'returnUiGetValueForFigma') {
        clearTimeout(p2722);
        resolve({ key: msg.key, value: msg.value });
        figma.ui.off('message', z4009);
    } } figma.ui.on('message', z4009); }); });
}
var o2723 = [];
var b2724 = [];
var t2725 = 0;
var x2726 = 0;
function e1518(a111) { return (a111[t1378] === 2 ? '' : h867) + (o2771 ? a111[e1372] : a111[t1374]); }
function s1519(x1503, addObject = null) { if (!d1521(x1503))
    return null; let o1504; switch (x1503[g1370]) {
    case x1214:
        o1504 = f2700(x1503);
        break;
    case r1217:
        o1504 = s2764(x1503);
        break;
    case u1220:
        o1504 = l2760(x1503);
        break;
    case m1226:
        o1504 = s2696(x1503);
        break;
    case b1229:
        o1504 = w2703(x1503);
        break;
    case n1232:
        o1504 = t2706(x1503);
        break;
    case f1235:
        o1504 = y2682(x1503);
        break;
    case n1239:
        o1504 = s2727(x1503);
        break;
    case e1251:
        o1504 = r2728(x1503);
        break;
    case k1273:
        o1504 = g2729(x1503);
        break;
    case x1254:
        o1504 = s2730(x1503);
        break;
    case m1257:
        o1504 = r2731(x1503);
        break;
} if (addObject && !o1504.removed) {
    o1504.name = e1518(x1503);
    w949(x1503[g1370] == x1254 || !!o1504, 'no Figma object created');
    if (o1504) {
        o1504.setPluginData('retain', x1503[t1378].toString());
        if (x1503[t1378] < 2) {
            o1504.setPluginData('userId', figma.currentUser.id);
            o1504.setPluginData('sessionId', figma.currentUser.sessionId.toString());
            o1504.setPluginData('type', x1503[g1370]);
            o1504.setPluginData('nodeId', x1503[m1371]);
            o1504.setPluginData('objectId', x1503[e1372]);
            o1504.setPluginData('isCenter', s934(x1503[b1393]));
            if (x1503[g1370] == f1235)
                q2745.push(o1504);
            if (x1503[a1392])
                q1534(o1504);
        }
        addObject(o1504);
        t2725++;
        x2726++;
    }
} return o1504; }
function t1520(o1504, x1503) { if (!d1521(x1503) || o1504.removed)
    return; o1504.name = e1518(x1503); o1504.setPluginData('retain', x1503[t1378].toString()); switch (x1503[g1370]) {
    case x1214:
        q2701(o1504, x1503);
        break;
    case r1217:
        h2765(o1504, x1503);
        break;
    case u1220:
        b2761(o1504, x1503);
        break;
    case m1226:
        a2697(o1504, x1503);
        break;
    case b1229:
        h2704(o1504, x1503);
        break;
    case n1232:
        x2707(o1504, x1503);
        break;
    case f1235:
        e2732(o1504, x1503);
        break;
    case n1239:
        t2733(o1504, x1503);
        break;
    case e1251:
        p2734(o1504, x1503);
        break;
    case k1273:
        z2735(o1504, x1503);
        break;
    case x1254:
        z2736(o1504, x1503);
        break;
    case m1257:
        b2737(o1504, x1503);
        break;
} o1504.parent.appendChild(o1504); if (x1503[a1392])
    q1534(o1504); t2725++; x2726++; }
function z2713(l2738, y2739, y2740, l1497 = [], n2741 = false, e2742 = false, r272 = false) {
    return __awaiter(this, void 0, void 0, function* () { let g2743 = NULL; let s2744 = null; let abort = false; const z3622 = []; o2723.push(...l1497); for (const x1503 of y2739) {
        b2724.push(x1503);
        if (x1503[m1371] != g2743) {
            g2743 = x1503[m1371];
            s2744 = y2710.find(a => a.nodeId == x1503[m1371]);
            if (!s2744) {
                y2710.push(s2744 = { nodeId: x1503[m1371], objects: [] });
            }
        }
        const addObject = o1504 => { if (l2738 && !l2738.removed)
            l2738.appendChild(o1504);
        else
            s2744.objects.push(o1504); };
        let objects = l2738 && !l2738.removed ? l2738.children : s2744.objects;
        let o1504 = objects.find(o => o.removed || o.getPluginData('userId') == figma.currentUser.id && o.getPluginData('objectId') == x1503[e1372]);
        if (o1504 != undefined && o1504 != null && o1504.removed) {
            r935(objects, o1504);
            if (q2745.includes(o1504))
                g940(q2745, o1504);
            if (f2753.includes(o1504))
                g940(f2753, o1504);
        }
        if (o1504 == undefined || o1504 == null || o1504.removed) {
            const newObj = s1519(x1503, addObject);
            z3622.push(newObj);
        }
        else if (!o1504.removed && o1504.getPluginData('type') == x1503[g1370].toString()) {
            t1520(o1504, x1503);
            if (o1504 && !o1504.removed)
                z3622.push(o1504);
        }
        else {
            o1504.remove();
            if (q2745.includes(o1504))
                g940(q2745, o1504);
            if (f2753.includes(o1504))
                g940(f2753, o1504);
            s1519(x1503, addObject);
        }
        if (x2726 >= y2740) {
            const result = yield q2720('returnObjectUpdate', { objectCount: t2725 });
            abort = result.value;
            x2726 = 0;
            if (abort)
                break;
        }
    } if (l2738 && !l2738.removed) {
        for (const o1504 of l2738.children) {
            if (o1504.removed || !y2739.find(o => o[e1372] == o1504.getPluginData('objectId') && o1504.getPluginData('userId') == figma.currentUser.id))
                o1504.remove();
        }
    } for (const point of q2745)
        if (!point.removed && !point.parent.removed)
            point.parent.appendChild(point); if (e2742 && !abort) {
        t1500(o2723, b2724);
        o2723 = [];
        b2724 = [];
        if (r272 && z3622.length > 0) {
            figma.viewport.scrollAndZoomIntoView(z3622);
            const bounds = l1524(z3622);
            figma.viewport.zoom = Math.min(figma.viewport.bounds.width * figma.viewport.zoom / bounds.width - 0.05, figma.viewport.bounds.height * figma.viewport.zoom / bounds.height - 0.05);
        }
    } yield q2720('returnObjectUpdate', { objectCount: t2725 }); });
}
function d1521(x1503) { switch (x1503[g1370]) {
    case x1214: return m2699(x1503);
    case r1217: return u2746(x1503);
    case u1220: return l2747(x1503);
    case m1226: return a4005(x1503);
    case b1229: return d2702(x1503);
    case n1232: return j2705(x1503);
    case f1235: return h4004(x1503);
    case n1239: return o2748(x1503);
    case e1251: return k2749(x1503);
    case k1273: return a2750(x1503);
    case x1254: return g2751(x1503);
    case m1257: return v2752(x1503);
} }
function o1522(x1503) { (() => __awaiter(this, void 0, void 0, function* () { const o1504 = s1519(x1503); const width = o1504.width; const height = o1504.height; o1504.remove(); m1517({ cmd: 'uiForwardToGenerator', msg: { cmd: 'returnFigGetObjectSize', objectId: x1503[e1372], width: width, height: height } }); }))(); }
function m1523(o1504) { o1504.setPluginData('type', ''); o1504.setPluginData('nodeId', ''); o1504.setPluginData('userId', ''); o1504.setPluginData('sessionId', ''); o1504.setPluginData('objectId', ''); o1504.setPluginData('isCenter', ''); o1504.setPluginData('retain', ''); }
function l1524(objects) { const bounds = { left: 0, top: 0, right: 0, bottom: 0 }; for (const a111 of objects) {
    if (a111.x < bounds.left || bounds.left == bounds.right)
        bounds.left = a111.x;
    if (a111.y < bounds.top || bounds.top == bounds.bottom)
        bounds.top = a111.y;
    if (a111.x + a111.width > bounds.right || bounds.left == bounds.right)
        bounds.right = a111.x + a111.width;
    if (a111.y + a111.height > bounds.bottom || bounds.top == bounds.bottom)
        bounds.bottom = a111.y + a111.height;
} return { x: bounds.left, y: bounds.top, width: bounds.right - bounds.left, height: bounds.bottom - bounds.top }; }
const f2753 = [];
const v2754 = [];
function d1525(g1526, d1527) { const effects = []; for (const effect of g1526) {
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
                effects.push({ type: type, color: color, offset: offset, radius: radius, visible: visible, blendMode: blend, showShadowBehindNode: behind });
                if (d1527 && !isNaN(spread))
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
            if (!isNaN(color.r) && !isNaN(color.g) && !isNaN(color.b) && !isNaN(color.a) && !isNaN(offset.x) && !isNaN(offset.y) && !isNaN(radius) && !isNaN(spread))
                effects.push({ type: type, color: color, offset: offset, radius: radius, spread: spread, visible: visible, blendMode: blend });
            break;
        }
        case 'LAYER_BLUR': {
            const radius = effect[1];
            const visible = effect[2];
            if (!isNaN(radius))
                effects.push({ type: type, visible: visible, radius: Math.max(0, radius) });
            break;
        }
        case 'BACKGROUND_BLUR': {
            const radius = effect[1];
            const visible = effect[2];
            if (!isNaN(radius))
                effects.push({ type: type, visible: visible, radius: Math.max(0, radius) });
            break;
        }
    }
} return effects; }
function r2689(o1504, x1503, phantom = true) { e1530(o1504, x1503); d2690(o1504, x1503, phantom); m2691(o1504, x1503); o1504.opacity = x1503[i1394]; o1504.blendMode = x1503[v1395]; const maskType = x1503[t1396]; o1504.isMask = maskType > 0; if (o1504.isMask) {
    switch (maskType) {
        case 1:
            o1504.maskType = 'ALPHA';
            break;
        case 2:
            o1504.maskType = 'VECTOR';
            break;
        case 3:
            o1504.maskType = 'LUMINANCE';
            break;
    }
} if (o1504.isMask && o1504.fills.length == 0 && o1504.strokes.length == 0)
    o1504.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 }, opacity: 1, blendMode: 'NORMAL' }]; }
function m2691(o1504, x1503) { if (!!x1503[s1383] && !isEmpty(x1503[s1383])) {
    o1504.fills = i953(x1503[s1383]);
    if (f2753.includes(o1504))
        g940(f2753, o1504);
}
else
    o1504.fills = []; }
function d2690(o1504, x1503, phantom = true) { if (x1503[k1384] != null && !isEmpty(x1503[k1384])) {
    q1529(o1504, i953(x1503[k1384]), x1503[x1385], x1503[q1386], x1503[o1387], x1503[s1388], x1503[y1389], l2692(x1503[t1390]));
    if (x1503[a1392])
        o1504.setPluginData('dashes', x1503[t1390]);
    if (f2753.includes(o1504))
        g940(f2753, o1504);
    if (x1503[a1392])
        l946(v2754, o1504);
}
else if (isEmpty(x1503[s1383]) && isEmpty(x1503[k1384]) && !x1503[t1396] && phantom) {
    a1532(o1504);
    l946(f2753, o1504);
}
else
    o1504.strokes = []; }
function l2692(l1528) { l1528 = l1528; l1528 = u951(l1528, ','); l1528 = u952(l1528, ','); l1528 = l1528.trim(); return l1528 == '' ? [] : l1528.split(',').map(s => Math.max(0, parseFloat(s))); }
function q2693(l1528) { l1528 = l1528; l1528 = u951(l1528, ','); l1528 = u952(l1528, ','); l1528 = l1528.trim(); return l1528 == '' ? [] : l1528.split(',').map(s => Math.max(0, parseFloat(s) / r2695)); }
function q1529(o1504, fills, weight, align, join, miterLimit, cap, dashes = []) { o1504.strokes = fills; o1504.strokeWeight = Math.max(0, weight); o1504.strokeAlign = align; o1504.strokeJoin = join; const miterAngle = miterLimit / 360 * Tau; const q2755 = 1 / Math.sin(miterAngle / 2); o1504.strokeMiterLimit = Math.min(Math.max(0, q2755), 16); o1504.strokeCap = cap; o1504.dashPattern = dashes; }
function e1530(o1504, x1503) { if (!!x1503[h1391] && !isEmpty(x1503[h1391])) {
    const d1527 = x1503[g1370] == x1214 || x1503[g1370] == u1220 || x1503[g1370] == m1257;
    o1504.effects = d1525(x1503[h1391], d1527);
}
else
    o1504.effects = []; }
function o1531() { for (const a111 of f2753) {
    if (a111.removed)
        g940(f2753, a111);
    else
        a1532(a111);
} }
function a1532(a111) { const back = figma.currentPage.backgrounds.find(b => b.type == 'SOLID'); let phantomColor; if (back) {
    const l = back.color.r * 0.2126 + back.color.g * 0.7152 + back.color.b * 0.0722;
    phantomColor = l > 0.5 ? { r: 0, g: 0, b: 0 } : { r: 1, g: 1, b: 1 };
}
else
    phantomColor = { r: 1, g: 0, b: 1 }; q1529(a111, [{ type: 'SOLID', color: phantomColor, opacity: 0.5 }], 1 / r2695, 'CENTER', 'MITER', 1, 'NONE', [1 / r2695, 2 / r2695]); }
function w1533() { for (const o1504 of v2754) {
    if (o1504.removed)
        g940(v2754, o1504);
    else
        q1534(o1504);
} }
function q1534(o1504) { o1504.strokeWeight = Math.max(0, 1 / r2695); if (m920(o1504.getPluginData('isCenter'))) {
    const path = o1504.vectorPaths[0];
    const parts = path.data.split(' ');
    let t = { x: parseFloat(parts[1]), y: parseFloat(parts[2]) };
    let c = { x: parseFloat(parts[4]), y: parseFloat(parts[5]) };
    let r = { x: parseFloat(parts[7]), y: parseFloat(parts[8]) };
    const a = 2;
    const b = 0.05;
    const f = 1 - Math.pow(1 - Math.min(r2695, 1), a) / Math.pow(a, b);
    t = i892(c, n894(k879(k897(t, c)), 10 / f));
    r = i892(c, n894(k879(k897(r, c)), 10 / f));
    parts[1] = t.x;
    parts[2] = t.y;
    parts[4] = c.x;
    parts[5] = c.y;
    parts[7] = r.x;
    parts[8] = r.y;
    const a2756 = { windingRule: path.windingRule, data: parts.join(' ') };
    o1504.vectorPaths = [a2756];
} const dashes = o1504.getPluginData('dashes'); if (dashes != '')
    o1504.dashPattern = q2693(dashes); }
function f1568(nodeId, px, py) { const _styles = figma.getLocalPaintStyles(); const styles = new Array(); for (const v168 of _styles) {
    const _nodeId = v168.getPluginData('nodeId');
    const _existing = v168.getPluginData('existing');
    const existing = !!_existing;
    const style = { id: v168.id, nodeId: _nodeId, name: v168.name, existing: existing, paints: new Array() };
    let onlyPaint = true;
    for (const u2758 of v168.paints) {
        if (u2758.type == 'SOLID') {
            style.paints.push([u2758.color.r, u2758.color.g, u2758.color.b, u2758.opacity]);
        }
        else {
            onlyPaint = false;
            break;
        }
    }
    if (onlyPaint)
        styles.push(style);
} m1517({ cmd: 'uiReturnFigGetAllLocalColorStyles', nodeId: nodeId, px: px, py: py, styles: JSON.stringify(styles) }); }
function i1569(nodeId, styleId) { const u1571 = figma.getLocalPaintStyles(); if (styleId != NULL)
    x1570(u1571, nodeId, styleId);
else
    e1572(u1571, nodeId); }
function x1570(u1571, nodeId, styleId, clearExisting = true) { const p2757 = s2712.find(a => a.nodeId == nodeId); if (p2757 && clearExisting)
    e1572(u1571, nodeId); const q1576 = u1571.find(s => s.id == styleId); w949(!!q1576, 'figStyle should be found here'); q1576.setPluginData('type', x1211); q1576.setPluginData('nodeId', nodeId); q1576.setPluginData('existing', s934(true)); s2712.push({ nodeId: nodeId, existing: true, styles: [q1576] }); return q1576; }
function e1572(u1571, nodeId) { const q1576 = u1571.find(s => s.getPluginData('nodeId') == nodeId); w949(!!q1576, 'figStyle should be found here'); if (q1576) {
    q1576.setPluginData('type', NULL);
    q1576.setPluginData('nodeId', NULL);
    q1576.setPluginData('existing', NULL);
    f942(s2712, a => a.nodeId == nodeId);
} return q1576; }
function w1573(styles, t1577) { const q1576 = figma.createPaintStyle(); q1576.setPluginData('type', t1577[g1370]); q1576.setPluginData('nodeId', t1577[m1371]); q1576.name = t1577[x1375]; setStylePaints(q1576, t1577); styles.push(q1576); m1517({ cmd: 'uiSetStyleId', nodeId: t1577[m1371], styleId: q1576.id }); return q1576; }
function p1574(msg) { let g2743 = NULL; let p2757; for (const t1577 of msg.styles) {
    if (t1577[m1371] != g2743) {
        g2743 = t1577[m1371];
        p2757 = s2712.find(a => a.nodeId == t1577[m1371]);
        if (!p2757) {
            p2757 = { nodeId: t1577[m1371], styles: [] };
            s2712.push(p2757);
        }
    }
    else
        p2757 = null;
    const q1576 = p2757.styles[0];
    const u1571 = figma.getLocalPaintStyles();
    const localStyle = u1571.find(s => s.getPluginData('nodeId') == t1577[m1371]);
    if (isValid(q1576) && !isValid(localStyle)) {
        r935(p2757.styles, q1576);
    }
    const existing = isValid(q1576) && isValid(localStyle) && q1576.getPluginData('existing');
    if (!isValid(q1576) || !isValid(localStyle)) {
        if (!existing) {
            f1507 = true;
            i1569(t1577[m1371], t1577[w1373]);
        }
    }
    else if (isValid(q1576) && q1576.getPluginData('type') == t1577[g1370]) {
        f1507 = true;
        s1575(localStyle, t1577);
    }
} }
function s1575(q1576, t1577) { setStylePaints(q1576, t1577); q1576.name = t1577[x1375]; }
function getStylePaints(stylePaints) { const paints = new Array(); for (const u2758 of stylePaints) {
    const fill = u2758[1].split(' ');
    switch (u2758[0]) {
        case 'SOLID':
            paints.push({ type: 'SOLID', color: { r: Math.min(Math.max(0, parseFloat(fill[0]) / 0xff), 1), g: Math.min(Math.max(0, parseFloat(fill[1]) / 0xff), 1), b: Math.min(Math.max(0, parseFloat(fill[2]) / 0xff), 1) }, opacity: Math.min(Math.max(0, parseFloat(fill[3]) / 100), 1) });
            break;
    }
} return paints; }
function setStylePaints(q1576, t1577) { if (!isEmpty(t1577[v1377]))
    q1576.paints = getStylePaints(t1577[v1377]);
else
    q1576.paints = []; }
function k1591(nodeId, px, py) { const n2759 = figma.variables.getLocalVariables(); const variables = new Array(); for (const _var of n2759) {
    const variable = { id: _var.id, resolvedType: _var.resolvedType, name: _var.name, collectionName: figma.variables.getVariableCollectionById(_var.variableCollectionId).name };
    variables.push(variable);
} m1517({ cmd: 'uiReturnFigGetAllLocalVariables', nodeId: nodeId, px: px, py: py, variables: JSON.stringify(variables), nCollections: figma.variables.getLocalVariableCollections().length }); }
function c1592(varIds) { const n2759 = figma.variables.getLocalVariables(); const variables = varIds.map(id => n2759.find(v => v.id == id)); let values = []; for (let i = 0; i < varIds.length; i++) {
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
function x1593(nodeId, varId) { const n2759 = figma.variables.getLocalVariables(); i1595(n2759, nodeId, varId); }
function z1594(varId, value) { const n2759 = figma.variables.getLocalVariables(); const variable = n2759.find(v => v.id == varId); if (!variable)
    return; const collection = figma.variables.getVariableCollectionById(variable.variableCollectionId); if (variable.resolvedType == 'BOOLEAN')
    value = value != 0; if (value !== null)
    variable.setValueForMode(collection.modes[0].modeId, value); }
function i1595(n2759, nodeId, varId) { const variable = n2759.find(v => v.id == varId); const values = []; if (variable) {
    const collection = figma.variables.getVariableCollectionById(variable.variableCollectionId);
    for (const mode of collection.modes)
        values.push(variable.valuesByMode[mode.modeId]);
} m1517({ cmd: 'uiReturnFigLinkNodeToVariable', nodeId: nodeId, variableId: variable ? variable.id : NULL, variableName: variable ? variable.name : '', resolvedType: variable ? variable.resolvedType : NULL, values: values }); return variable; }
function u1578(tl, tr, bl) { let vr = point(tr.x - tl.x, tr.y - tl.y); let vb = point(bl.x - tl.x, bl.y - tl.y); let sx = vr.x; let sy = vb.y; let kx = -vr.y; let ky = -vb.x; let dx = -tl.x; let dy = -tl.y; const _sx = kx / nozero(sx); const _sy = ky / nozero(sy); let b4186 = i882([[1, _sy, 0], [_sx, 1, 0], [0, 0, 1]], l886(dx, dy)); b4186 = l884(b4186); const a = angle(vr); if (a > Tau / 4 && a < Tau * 3 / 4)
    b4186 = i882(b4186, l886(0, 0, 1, 1, Tau / 2)); if (determinant(b4186) < 0)
    b4186 = i882(b4186, l886(0, 0, -1, 1, 0)); return b4186; }
function f1579(o1504, tl, tr, bl) { const b4186 = u1578(tl, tr, bl); o1504.relativeTransform = [b4186[0], b4186[1]]; }
function x1580(o1504, x1503, setSize = true, noHeight = 0.01) { if (!x1503[j1379] || !x1503[q1380] || !x1503[u1381])
    return; const xp0 = x1503[j1379]; const xp1 = x1503[q1380]; const xp2 = x1503[u1381]; f1579(o1504, xp0, xp1, xp2); if (setSize) {
    const f887 = distance(xp0, xp1);
    const m888 = distance(xp0, xp2);
    const height = x1503[g1370] == n1232 ? x1503[i1414] : x1503[c1401];
    if (!o1504.removed) {
        o1504.resizeWithoutConstraints(Math.max(0.01, f887), height ? Math.max(0.01, m888) : noHeight);
    }
} }
function z1581(u2687, s2688) { if (u2687.removed)
    return; u2687.resizeWithoutConstraints(0.01, 0.01); u2687.setPluginData('actualX', s2688[u1397].toString()); u2687.setPluginData('actualY', s2688[s1399].toString()); u2687.x = s2688[u1397]; u2687.y = s2688[s1399]; u2687.rotation = s2688[b1393] ? 45 : 0; }
function l1582(u2687) { if (!u2687.removed)
    u2687.resizeWithoutConstraints(0.01, 0.01); }
function a2750(genBool) { return genBool.children.length > 0; }
function g2729(genBool) { let objects = []; for (const a111 of genBool.children)
    s1519(a111, o => objects = [...objects, o]); let figBool = null; if (!isEmpty(objects)) {
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
    x1580(figBool, genBool);
    if (!a2750(genBool))
        return figBool;
} return figBool; }
function z2735(figBool, genBool) { if (!a2750(genBool)) {
    figBool.remove();
    return;
} x1580(figBool, genBool); z2713(figBool, genBool.children, genBool.children.length); }
function l2747(genEllipse) { return genEllipse[u1397] != null && !isNaN(genEllipse[u1397]) && genEllipse[s1399] != null && !isNaN(genEllipse[s1399]) && genEllipse[h1400] != null && !isNaN(genEllipse[h1400]) && genEllipse[c1401] != null && !isNaN(genEllipse[c1401]) && genEllipse[x1403] != null && !isNaN(genEllipse[x1403]) && genEllipse[a1410] != null && !isNaN(genEllipse[a1410]) && genEllipse[v1416] != null && !isNaN(genEllipse[v1416]) && genEllipse[h1420] != null && !isNaN(genEllipse[h1420]); }
function l2760(genEllipse) { if (!l2747(genEllipse))
    return null; const figEllipse = figma.createEllipse(); g2762(figEllipse, genEllipse); if (q2745.includes(figEllipse))
    i2684(figEllipse);
else
    r2689(figEllipse, genEllipse); return figEllipse; }
function b2761(figEllipse, genEllipse) { g2762(figEllipse, genEllipse); r2689(figEllipse, genEllipse); }
function g2762(figEllipse, genEllipse) { figEllipse.cornerRadius = genEllipse[x1403]; figEllipse.arcData = { startingAngle: genEllipse[a1410] / 360 * (Math.PI * 2), endingAngle: genEllipse[v1416] / 360 * (Math.PI * 2), innerRadius: Math.min(Math.max(0, genEllipse[h1420] / 100), 1) }; x1580(figEllipse, genEllipse); }
function v2752(genFrame) { return genFrame[u1397] != null && !isNaN(genFrame[u1397]) && genFrame[s1399] != null && !isNaN(genFrame[s1399]) && genFrame[h1400] != null && !isNaN(genFrame[h1400]) && genFrame[c1401] != null && !isNaN(genFrame[c1401]) && genFrame[x1409] != null && !isNaN(genFrame[x1409]); }
function r2731(genFrame) { if (!v2752(genFrame))
    return null; const figFrame = figma.createFrame(); if (figFrame) {
    j2763(figFrame, genFrame);
    let objects = [];
    for (const a111 of genFrame[q1415])
        s1519(a111, o => objects = [...objects, o]);
    for (const a111 of objects)
        figFrame.appendChild(a111);
} return figFrame; }
function b2737(figFrame, genFrame) { j2763(figFrame, genFrame); z2713(figFrame, genFrame[q1415], genFrame[q1415].length); }
function j2763(figFrame, genFrame) { figFrame.cornerRadius = genFrame[x1409]; x1580(figFrame, genFrame); r2689(figFrame, genFrame, genFrame[q1415].length == 0); }
function g2751(genGroup) { return genGroup[s1398].length > 0; }
function s2730(genGroup) { let objects = []; for (const a111 of genGroup[s1398])
    s1519(a111, o => objects = [...objects, o]); const figGroup = !isEmpty(objects) ? figma.group(objects, figma.currentPage) : null; if (figGroup) {
    if (!g2751(genGroup))
        return figGroup;
} return figGroup; }
function z2736(figGroup, genGroup) { if (!g2751(genGroup)) {
    figGroup.remove();
    return;
} z2713(figGroup, genGroup[s1398], genGroup[s1398].length); }
function u2746(genLine) { return genLine[u1397] != null && !isNaN(genLine[u1397]) && genLine[s1399] != null && !isNaN(genLine[s1399]) && genLine[h1400] != null && !isNaN(genLine[h1400]); }
function s2764(genLine) { if (!u2746(genLine))
    return null; const figLine = figma.createLine(); h2765(figLine, genLine); return figLine; }
function h2765(figLine, genLine) { x1580(figLine, genLine, true, 0); r2689(figLine, genLine); }
var q2745 = [];
function h4004(s2688) { return s2688[u1397] != null && !isNaN(s2688[u1397]) && s2688[s1399] != null && !isNaN(s2688[s1399]); }
function y2682(s2688) { const u2687 = s2688[b1393] ? figma.createRectangle() : figma.createEllipse(); if (!h4004(s2688))
    return u2687; if (q2745.includes(u2687))
    l2686(u2687, s2688);
else
    e2732(u2687, s2688); return u2687; }
function e2732(u2687, s2688) { z1581(u2687, s2688); s2685(u2687); }
function t2683() { m1517({ cmd: 'uiUpdateZoom', zoom: figma.viewport.zoom }); for (const point of q2745)
    i2684(point); }
function i2684(u2687) { l1582(u2687); s2685(u2687); }
function l2686(u2687, s2688) { z1581(u2687, s2688); s2685(u2687); }
function s2685(u2687) { if (u2687.removed)
    return; const l3716 = m920(u2687.getPluginData('isCenter')); const s2694 = figma.currentPage.selection.includes(u2687); const color = l3716 ? [0xf2, 0x48, 0x22] : s2694 ? [12, 140, 233] : [255, 255, 255]; const border = l3716 ? [255, 255, 255] : s2694 ? [255, 255, 255] : [12, 140, 233]; u2687.fills = i953([['SOLID', color[0], color[1], color[2], 100]]); const effects = []; effects.push(...d1525([['DROP_SHADOW', border[0] / 255, border[1] / 255, border[2] / 255, 1, 0, 0, 0, (l3716 ? 3 : s2694 ? 5 : 3.6) / r2695, 'NORMAL', true, true]], true)); effects.push(...d1525([['DROP_SHADOW', color[0] / 255, color[1] / 255, color[2] / 255, 1, 0, 0, 0, (s2694 ? 4 : 2.4) / r2695, 'NORMAL', true, true]], true)); u2687.effects = effects; }
function a4005(genPoly) { return genPoly[u1397] != null && !isNaN(genPoly[u1397]) && genPoly[s1399] != null && !isNaN(genPoly[s1399]) && genPoly[h1400] != null && !isNaN(genPoly[h1400]) && genPoly[c1401] != null && !isNaN(genPoly[c1401]) && genPoly[w1406] != null && !isNaN(genPoly[w1406]) && genPoly[h1412] != null && !isNaN(genPoly[h1412]); }
function s2696(genPoly) { if (!a4005(genPoly))
    return null; const figPoly = figma.createPolygon(); a2697(figPoly, genPoly); return figPoly; }
function a2697(figPoly, genPoly) { if (!a4005(genPoly))
    return; figPoly.cornerRadius = genPoly[w1406]; figPoly.pointCount = Math.max(3, genPoly[h1412]); x1580(figPoly, genPoly); r2689(figPoly, genPoly); }
function m2699(j2698) { return j2698[u1397] != null && !isNaN(j2698[u1397]) && j2698[s1399] != null && !isNaN(j2698[s1399]) && j2698[h1400] != null && !isNaN(j2698[h1400]) && j2698[c1401] != null && !isNaN(j2698[c1401]) && j2698[g1402] != null && !isNaN(j2698[g1402]); }
function f2700(j2698) { if (!m2699(j2698))
    return null; const figRect = figma.createRectangle(); q2701(figRect, j2698); return figRect; }
function q2701(figRect, j2698) { if (!m2699(j2698))
    return; const found = j2698[h1391].findIndex(e => e[0] == 'ROUND_CORNERS'); if (found > -1) {
    const corners = j2698[h1391][found];
    figRect.topLeftRadius = corners[1];
    figRect.topRightRadius = corners[2];
    figRect.bottomLeftRadius = corners[3];
    figRect.bottomRightRadius = corners[4];
}
else
    figRect.cornerRadius = j2698[g1402]; x1580(figRect, j2698); r2689(figRect, j2698); }
function d2702(genStar) { return genStar[u1397] != null && !isNaN(genStar[u1397]) && genStar[s1399] != null && !isNaN(genStar[s1399]) && genStar[h1400] != null && !isNaN(genStar[h1400]) && genStar[c1401] != null && !isNaN(genStar[c1401]) && genStar[x1407] != null && !isNaN(genStar[x1407]) && genStar[y1413] != null && !isNaN(genStar[y1413]) && genStar[a1418] != null && !isNaN(genStar[a1418]); }
function w2703(genStar) { if (!d2702(genStar))
    return null; const figStar = figma.createStar(); h2704(figStar, genStar); return figStar; }
function h2704(figStar, genStar) { figStar.cornerRadius = genStar[x1407]; figStar.pointCount = genStar[y1413]; figStar.innerRadius = Math.min(Math.max(0, genStar[a1418] / 100), 1); x1580(figStar, genStar); r2689(figStar, genStar); }
const loadedFonts = [];
function j2705(l2709) { return l2709[y1419] != null && l2709[u1397] != null && !isNaN(l2709[u1397]) && l2709[s1399] != null && !isNaN(l2709[s1399]) && l2709[h1400] != null && !isNaN(l2709[h1400]) && l2709[c1401] != null && !isNaN(l2709[c1401]) && l2709[o1421] != null && l2709[o1421] != NULL && l2709[x1422] != null && !isNaN(l2709[x1422]); }
function t2706(l2709) { if (!j2705(l2709))
    return null; const i2766 = figma.createText(); x2707(i2766, l2709); return i2766; }
function x2707(i2766, l2709) { const fontName = { family: l2709[o1421], style: l2709[t1423] }; try {
    if (!loadedFonts.includes(fontName)) {
        figma.loadFontAsync(fontName).then(() => { p2708(i2766, l2709, fontName); loadedFonts.push(fontName); });
    }
    else {
        p2708(i2766, l2709, fontName);
    }
}
catch (e) {
    o950(e);
} }
function p2708(i2766, l2709, fontName) { i2766.fontName = fontName; i2766.fontSize = Math.max(1, l2709[x1422]); i2766.characters = l2709[y1419]; i2766.lineHeight = { unit: 'PERCENT', value: l2709[l1426] }; i2766.letterSpacing = { unit: 'PERCENT', value: l2709[d1427] }; if (l2709[q1424] == 0)
    i2766.textAlignHorizontal = 'LEFT';
else if (l2709[q1424] == 1)
    i2766.textAlignHorizontal = 'CENTER';
else if (l2709[q1424] == 2)
    i2766.textAlignHorizontal = 'RIGHT';
else if (l2709[q1424] == 3)
    i2766.textAlignHorizontal = 'JUSTIFIED'; if (l2709[y1425] == 0)
    i2766.textAlignVertical = 'TOP';
else if (l2709[y1425] == 1)
    i2766.textAlignVertical = 'CENTER';
else if (l2709[y1425] == 2)
    i2766.textAlignVertical = 'BOTTOM'; x1580(i2766, l2709); r2689(i2766, l2709); if (l2709[a1408] == 0 && l2709[i1414] == 0)
    i2766.textAutoResize = 'WIDTH_AND_HEIGHT';
else if (l2709[a1408] == 0)
    i2766.textAutoResize = 'HEIGHT';
else
    i2766.textAutoResize = 'NONE'; }
function k2749(genNetwork) { return true; }
function r2728(genNetwork) { const figNetwork = figma.createVector(); if (!k2749(genNetwork))
    return figNetwork; figNetwork.vectorNetwork = genNetwork[h1404]; x1580(figNetwork, genNetwork, false); r2689(figNetwork, genNetwork); return figNetwork; }
function p2734(figNetwork, genNetwork) { if (!k2749(genNetwork))
    return; figNetwork.vectorNetwork = genNetwork[h1404]; x1580(figNetwork, genNetwork, false); r2689(figNetwork, genNetwork); }
function o2748(genPath) { return genPath[o1411] != null && !isNaN(genPath[o1411]) && genPath[q1417] != null && !isNaN(genPath[q1417]); }
function s2727(genPath) { const figPath = figma.createVector(); t2733(figPath, genPath); return figPath; }
function t2733(figPath, genPath) { if (!o2748(genPath))
    return; figPath.vectorPaths = [{ windingRule: genPath[o1411] == 1 ? 'NONZERO' : 'EVENODD', data: genPath[w1405] }]; figPath.cornerRadius = genPath[q1417]; x1580(figPath, genPath, false); r2689(figPath, genPath); }
