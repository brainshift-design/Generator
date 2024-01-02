const generatorVersion = 332;


const MAX_INT32        = 2147483647;
  
const NULL             = '';
  
const HTAB             = '  '; // half-tab
const TAB              = '    ';
const NL               = '\n';
  
const GENERATOR_LOGO   = '◦ G •';
const OBJECT_PREFIX    = GENERATOR_LOGO + ' ';

const nodeTag          = 'G_NODE';
const connTag          = 'G_CONN';
const pageTag          = 'G_PAGE';
const tempTag          = 'G_TEMP';



const identity = Object.freeze(
    [[1, 0, 0],
     [0, 1, 0],
     [0, 0, 1]]);



const Epsilon = 0.0000001;
const Tau     = Math.PI * 2;



var enableAsserts = false;



function hardZero(x, eps = 0.000000001) 
{ 
    return Math.abs(x) < eps ? 0 : x;
}



function nozero(x, eps = 0.000000001) 
{ 
    return x != 0 
         ? x 
         : (x < 0 ? -eps : eps);
}



function nozerov(v, eps = 0.000000001) 
{ 
    return point(
        nozero(v.x, eps), 
        nozero(v.y, eps)); 
}



function equal(a, b, eps = 0.000000001)
{
    return Math.abs(b - a) < eps;
}



function sqr (x) { return x*x;   };
function cube(x) { return x*x*x; };
 

function toInt(f) { return Math.floor(f) | 0; }



function nextPow2(x)
{
    x = toInt(x);

    x--;

    x |= x >>  1;
    x |= x >>  2;
    x |= x >>  4;
    x |= x >>  8;
    x |= x >> 16;
    x |= x >> 32;

    return ++x;
}



function gcd(a, b)
{
    let temp;
    while (1)
    {
        temp = a % b;

        if (temp == 0)
          return b;

        a = b;
        b = temp;
    }
}



function distance(p1, p2)
{
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;

    return Math.sqrt(dx*dx + dy*dy);
}



function angle(v)
{
    let angle = Math.atan2(v.y, v.x);
    if (angle < 0) angle += Tau;

    return angle;
}



function anglev(v1, v2)
{
    return anglev_(v1.x, v1.y, v2.x, v2.y);
}



function anglev_(x1, y1, x2, y2)
{
    const dx = x2 - x1;
    const dy = y2 - y1;

    let angle = Math.atan2(dy, dx);
    if (angle < 0) angle += Tau;

    return angle;
}



function lengthv(v)
{
    return Math.sqrt(v.x*v.x + v.y*v.y);
}



function unitv(v)
{
    return point(
        v.x == 0 ? 0 : v.x / lengthv(v),
        v.y == 0 ? 0 : v.y / lengthv(v));
}



function dot(v1, v2)
{
    return v1.x * v2.x + v1.y * v2.y;
}



function angleDiff(a1, a2)
{
    let diff = a2 - a1;

    while (diff <= -Tau/2) diff += Tau;
    while (diff >   Tau/2) diff -= Tau;

    return diff; // |-Tau/2, Tau/2]
}



function mulv2m3(v, m)
{
    let v3 = [v.x, v.y, 1];
    let r  = mulv3m3(v3, m);

    return point(r[0], r[1]);
}



function mulm3m3(...mm)
{
    consoleAssert(mm.length > 0, 'mulm3m3() must take at least one argument');

    let result = clone(mm[0]);

    for (let a = 1; a < mm.length; a++)
    {
        const m1 = result;
        const m2 = mm[a];

        const m = [[0, 0, 0],
                   [0, 0, 0],
                   [0, 0, 0]];

        for (let i = 0; i < 3; i++)
        {
            for (let j = 0; j < 3; j++)
            {
                /*	calculate the dot product of ith row 
                    of this and jth column of m  */
                for (let k = 0; k < 3; k++)
                    m[i][j] += m1[i][k] * m2[k][j];
            }
        }

        result = m;
    }

    return result;
}



function divm3s(m, s)
{
    for (let i = 0; i < 3; i++)
        for (let j = 0; j < 3; j++)
            m[i][j] /= s;

    return m;
}



function adjugate(m)
{
    return cofactor(transpose(m));
}



function transpose(m)
{
    return [[m[0][0], m[1][0], m[2][0]],
            [m[0][1], m[1][1], m[2][1]],
            [m[0][2], m[1][2], m[2][2]]];
}



function cofactor(m)
{
    return [[  m[1][1] * m[2][2] - m[2][1] * m[1][2], -(m[1][0] * m[2][2] - m[2][0] * m[1][2]),  m[1][0] * m[2][1] - m[2][0] * m[1][1] ],
            [-(m[0][1] * m[2][2] - m[2][1] * m[0][2]),  m[0][0] * m[2][2] - m[2][0] * m[0][2], -(m[0][0] * m[2][1] - m[2][0] * m[0][1])],
            [  m[0][1] * m[1][2] - m[1][1] * m[0][2], -(m[0][0] * m[1][2] - m[1][0] * m[0][2]),  m[0][0] * m[1][1] - m[1][0] * m[0][1] ]]; 
}



function determinant(m)
{
    return   m[0][0] * (m[1][1] * m[2][2] - m[1][2] * m[2][1])
           - m[0][1] * (m[1][0] * m[2][2] - m[2][0] * m[1][2])
           + m[0][2] * (m[1][0] * m[2][1] - m[2][0] * m[1][1]);
}



function inversem3(m)
{
    return divm3s(adjugate(m), determinant(m));
}



function createRotateTransform(angle)
{
    const cosA = hardZero(Math.cos(angle));
    const sinA = hardZero(Math.sin(angle));

    return [[ cosA, sinA, 0],
            [-sinA, cosA, 0],
            [ 0,    0,    1]];
}



function createTransform(x = 0, y = 0, scaleX = 1, scaleY = 1, angle = 0, skewX = 0, skewY = 0)
{
    const cosA = Math.cos(angle);
    const sinA = Math.sin(angle);

    return [[scaleX*cosA -  skewY*sinA, -skewX*cosA + scaleY*sinA, x],
            [ skewY*cosA + scaleX*sinA, scaleY*cosA +  skewX*sinA, y],
            [0,                         0,                         1]];
}



function crossv2(v1, v2)
{
    // returns the magnitude of v1×v2 = ‖v1‖‖v2‖sinθ "perpendicular dot product",
    // equivalent to dot(v1, cross(v2)) (same as in 3D with a Z component of 0)
    // also the area of the parallelogram between the two vectors
    // also determinant of 2×2 matrix built from the two vectors
    // positive if turn from v1 to v2 is clockwise

    return v1.x * v2.y - v1.y * v2.x;
}	



function addv(v1, v2)
{
    return point(
        v1.x + v2.x,
        v1.y + v2.y);
}	



function mulv(v1, v2)
{
    return point(
        v1.x * v2.x,
        v1.y * v2.y);
}	



function mulvs(v, s)
{
    return point(
        v.x * s,
        v.y * s);
}	



function divv(v1, v2)
{
    return point(
        v1.x / v2.x,
        v1.y / v2.y);
}	



function divvs(v, s)
{
    return point(
        v.x / s,
        v.y / s);
}	



function subv(v1, v2)
{
    return point(
        v1.x - v2.x,
        v1.y - v2.y);
}	



function toUtf8(str) 
{
    return decodeURI(encodeURIComponent(str));
}



function fromUtf8(str) 
{
    return decodeURIComponent(encodeURI(str));
}



function charCodeArrayToString(bytes) 
{
    let str = '';

    for (let i = 0; i < bytes.length; i++)
        str += String.fromCharCode(bytes[i]);

    return str;
}



function stringToCharCodeArray(str)
{
    return Array.from(fromUtf8(str), c => c.charCodeAt(0));
}



function newSizeArrayFrom(array, size) // resizes an array and returns a new array
{
    const newArray = new Uint8Array(size);
    copyArray(array, newArray);
    return newArray;
}



function copyArray(src, dst)
{
    copyArrayAt(
        src, 0, src.length,
        dst, 0, dst.length);
}



function copyArrayAt(src, srcStart, srcSize, dst, dstStart, dstSize)
{
    const size = Math.min(srcSize, dstSize);

    for (let i = 0; i < size; i++)
        dst[dstStart + i] = src[srcStart + i];
}



function arraysAreEqual(arr1, arr2)
{
    if (arr1.length != arr2.length)
        return false;

    for (let i = 0; i < arr1.length; i++)
    {
        if (arr1[i] != arr2[i])
            return false;
    }

    return true;
}



function arraysIntersect(array1, array2)
{
    return array1.findIndex(i => array2.includes(i)) > -1;
}



function  leftArrowChar(list) { return list ? '<==' : '<--'; }; 
function rightArrowChar(list) { return list ? '==>' : '-->'; }; 

function nodeNameForStorage(nodeId) { return nodeTag + ' ' + nodeId; }
function connNameForStorage(name)   { return connTag + ' ' + name;   }
function pageNameForStorage(name)   { return pageTag + ' ' + name;   }



function parseBool(str) 
{ 
    return str.toLowerCase() == 'true'
        || str == '1';
}



function connToString(_conn, logSpace = false)
{
    return getConnectionString(
        _conn.outputNodeId,
        _conn.outputId,
        _conn.outputOrder,
        _conn.inputNodeId,
        _conn.inputId,
        _conn.list,
        logSpace);
}



function getConnectionKey(outputNodeId, outputId, outputOrder, inputNodeId, inputId)
{
    return connNameForStorage(
          outputNodeId + ' '
        + outputId     + ' '
        + outputOrder  + ' '
        + inputNodeId  + ' '
        + inputId);
}



function getStorageConnKey(conn)
{
    return getConnectionKey(
        conn.outputNodeId,
        conn.outputId,
        conn.outputOrder,
        conn.inputNodeId,
        conn.inputId);
}



function getConnKey(conn)
{
    return getConnectionKey(
        conn.output.node.id,
        conn.output.id,
        conn.outputOrder,
        conn.input.node.id,
        conn.input.id);
}



function getConnString(conn, logSpace = false)
{
    return getConnectionString(
        conn.output.node.id,
        conn.output.id,
        conn.outputOrder,
        conn.input.node.id,
        conn.input.id,
        conn.list,
        logSpace);
}



function getConnectionString(outputNodeId, outputId, outputOrder, inputNodeId, inputId, list, logSpace = false)
{
    const  sp   = logSpace ? ' ' : '  '; 
    const jsp   = logSpace ? ''  : ' '; 

    const arrow = 
          sp 
        + subscriptNumber(typeof outputOrder == 'string' ? parseInt(outputOrder) : outputOrder) 
        + rightArrowChar(typeof list == 'string' ? parseBool(list) : list) 
        + sp;

    const join  = jsp + '.' + jsp;

    return /*'( ' +*/ outputNodeId + join + outputId
         + arrow
         + inputNodeId  + join + inputId;
         //+ ' )';
}



function getPageKey(pageId)
{
    return pageNameForStorage(pageId);
}



function superscriptNumber(num)
{
    const str = num.toString();

    let sup = '';

    for (const c of str)
        sup += superscriptChar(c);

    return sup;
}



function superscriptChar(c)
{
    switch (c)
    {
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
    }
}



function subscriptNumber(num)
{
    const str = num.toString();

    let sup = '';

    for (const c of str)
        sup += subscriptChar(c);

    return sup;
}



function subscriptChar(c)
{
    switch (c)
    {
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
    }
}



function boolToString(bool)
{
    return bool ? 'true' : 'false';
}



function isValid(val)
{
    return val != undefined
        && val != null;
}



function isEmpty(array)
{
    return array.length == 0;
}



function removeFrom(array, item)
{
    removeAt(array, array.indexOf(item));
}



function removeAt(array, index)
{
    if (   index > -1 
        && index < array.length)
        array.splice(index, 1);
}



function removeLast(array)
{
    if (isEmpty(array))
        return null;

    let last = array.at(-1);
    array.splice(array.length-1, 1);

    return last;
}



function lastOf(array)
{
    return array[array.length-1];
}



function moveInArray(array, from, to) 
{
    const item = array[from];
    array.splice(from, 1);
    array.splice(to, 0, item);
}



function removeFromArray(array, item)
{
    const index = array.indexOf(item);
    
    if (index > -1)
        array.splice(index, 1);
}



function removeArrayFromArray(fromArray, array)
{
    for (const item of array)
    {
        const index = fromArray.indexOf(item);
        
        if (index > -1)
            fromArray.splice(index, 1);
    }
}



function removeFromArrayWhere(array, where)
{
    const index = array.findIndex(where);
    
    if (index > -1)
        array.splice(index, 1);
}



function cleanStyleId(styleId)
{
    return styleId.split(',')[0] + ',';
}



function getLinearPathData(points)
{
    let pathData = '';


    if (points.length < 2)
        return pathData;


    pathData += 'M';
    pathData += ' ' + hardZero(points[0].x);
    pathData += ' ' + hardZero(points[0].y);

    for (let i = 1; i < points.length; i++)
    {
        pathData += 
              ' L'
            + ' ' + hardZero(points[i].x)
            + ' ' + hardZero(points[i].y);
    }


    return pathData;
}



function point(x, y) { return {x: x, y: y}; }



function mulv3m3(v, m)
{
    let r = [0, 0, 0];

    for (let i = 0; i < 3; i++)
        for (let j = 0; j < 3; j++)
            r[i] += v[j] * m[i][j];

    return r;
}



function clone(val) 
{
    const type = typeof val;
    
    if (val === null) 
      return null;

    else if (type === 'undefined' 
          || type === 'number' 
          || type === 'string' 
          || type === 'boolean') 
        return val;

    else if (type === 'object') 
    {
        if (val instanceof Array) 
            return val.map(x => clone(x));

        else if (val instanceof Uint8Array) 
            return new Uint8Array(val);

        else 
        {
            let obj = {};

            for (const key in val) 
                obj[key] = clone(val[key]);

            return obj;
        }
    }

    throw 'unknown';
}



function pushUnique(array, item, equal = null)
{
    if (equal)
    {
        if (Array.isArray(item))
            item.forEach(i => pushUnique(array, i, equal));
        else if (!array.find(i => equal(i, item)))
            array.push(item);
    }
    else
    {
        if (Array.isArray(item))
            item.forEach(i => pushUnique(array, i));
        else if (!array.includes(item))
            array.push(item);
    }
}



function pushUniqueBy(array, item, equal)
{
    if (Array.isArray(item))
        item.forEach(i => pushUniqueBy(array, i, equal));
    else if (!array.find(equal))
        array.push(item);
}



function pushUniqueExcept(array, item, except)
{
    if (Array.isArray(item))
        item.forEach(i => pushUniqueExcept(array, i, except));
    else if (!array.find(except))
        array.push(item);
}



function consoleAssert(...args)
{
    // if (  !settings 
    //     || settings.enableAsserts)
    if (enableAsserts)
    {
        console.assert(...args);
        //console.trace();
    }
}



function consoleError(...args)
{
    // if (  !settings
    //     || settings.enableAsserts)
    if (enableAsserts)
        console.error(...args);
}



function trimCharFromStart(str, trim) 
{
    while (str.length >= trim.length
        && str.substring(0, trim.length) == trim) 
        str = str.substring(trim.length);

    return str;
}



function trimCharFromEnd(str, trim) 
{
    while (str.length >= trim.length
        && str.substring(str.length - trim.length) == trim) 
        str = str.substring(0, str.length - trim.length);

    return str;
}



function getObjectFills(genObjFills)
{
    const fills = [];


    for (const fill of genObjFills)
    {
        switch (fill[0])
        {
            case 'SOLID':
            {
                const color = {
                    r: Math.min(Math.max(0, fill[1] / 0xff), 1), 
                    g: Math.min(Math.max(0, fill[2] / 0xff), 1), 
                    b: Math.min(Math.max(0, fill[3] / 0xff), 1) };

                const opacity = Math.min(Math.max(0, fill[4] / 100), 1);


                if (   !isNaN(color.r)
                    && !isNaN(color.g)
                    && !isNaN(color.b)
                    && !isNaN(opacity))
                    fills.push(
                    {
                        type:      fill[0], 
                        color:     color,
                        opacity:   opacity,
                        blendMode: fill[5]
                    });


                break;
            }

            case 'GRADIENT_LINEAR':
            case 'GRADIENT_RADIAL':
            case 'GRADIENT_ANGULAR':
            case 'GRADIENT_DIAMOND':
            {
                const xform = fill[1];


                const stops = [];

                for (const stop of fill[2])
                {
                    stops.push({
                        color: 
                        {
                            r: Math.min(Math.max(0, stop[0]), 1),
                            g: Math.min(Math.max(0, stop[1]), 1),
                            b: Math.min(Math.max(0, stop[2]), 1),
                            a: Math.min(Math.max(0, stop[3]), 1)
                        },
                        position: stop[4]
                    });  
                }


                fills.push(
                {
                    type:              fill[0],
                    gradientTransform: xform,
                    gradientStops:     stops,
                    blendMode:         fill[3]
                });


                break;
            }
        }
    }


    return fills;
}



function isListType(type)
{
    return LIST_VALUES.includes(type);
}