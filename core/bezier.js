function bezierTangent(x0, y0, x1, y1, x2, y2, x3, y3, t)
{
    const p0 = point(x0, y0);
    const p1 = point(x1, y1);
    const p2 = point(x2, y2);
    const p3 = point(x3, y3);

    return unit(addv(addv(
        mulvs(subv(p1, p0), 3*sqr(1-t)),
        mulvs(subv(p2, p1), 6*(1-t)*t)),
        mulvs(subv(p3, p2), 3*sqr(t))));
}



function positionOnSegment(p0, p1, p2, p3, arcLen, error = 0.001)
{
    const hullLength = 
          distance(p0, p1) 
        + distance(p1, p2)
        + distance(p2, p3);

    if (hullLength == 0)
        return Number.NAN;


    let t = arcLen / hullLength;

    if (t < 0 || t > 1)
        return Number.NAN;

        
    let halves = splitSeg(p0, p1, p2, p3, t);
    let l      = halves[0];

    let length = arcLength(l[0], l[1], l[2], l[3], error);

    while (Math.abs(arcLen - length) > error)
    {
        t += (arcLen - length) / hullLength;

        halves = splitSeg(p0, p1, p2, p3, t);
        l      = halves[0];

        length = arcLength(l[0], l[1], l[2], l[3], error);
    }

    return t;
}



function splitSeg(p0, p1, p2, p3, t)
{
    const c0   = lerpv(p0, p1, t);
    const c1   = lerpv(p1, p2, t);
    const c2   = lerpv(p2, p3, t);
                
    const c01  = lerpv(c0, c1, t);
    const c12  = lerpv(c1, c2, t);

    const c012 = lerpv(c01, c12, t);

    return [
        [p0, c0, c01, c012],
        [c012, c12, c2, p3]];
}



// function splitSegments(_p0, _p1, _p2, _p3, ts)
// {
//     const segments = [];


//     let p0 = _p0, 
//         p1 = _p1,
//         p2 = _p2,
//         p3 = _p3;

//     for (let i = 0; i < ts.length; i++)
//     {
//         const parts = split(p0, p1, p2, p3, ts[i]);
//         const l     = parts[0];
//         const r     = parts[1];


//         segments.push(l);


//         if (i < ts.length-1)
//         {
//             p0 = r[0];
//             p1 = r[1];
//             p2 = r[2];
//             p3 = r[3];

//             for (let j = i+1; j < ts.length; j++)
//                 ts[j] = 1 - (1 - ts[j]) / (1 - ts[i]);
//         }
//         else segments.push(r);
//     }


//     return segments;
// }



function arcLength(p0, p1, p2, p3, error = 0.0000001)
{
    const arcLen = 
          distance(p0, p1)
        + distance(p1, p2)
        + distance(p2, p3);

    const chord = distance(p0, p3);

    if ((arcLen - chord) > error)
    {
        const halves = splitSeg(p0, p1, p2, p3, 0.5);
        const l      = halves[0];
        const r      = halves[1];
            
        return arcLength(l[0], l[1], l[2], l[3], error)
             + arcLength(r[0], r[1], r[2], r[3], error);
    }

    return arcLen;
}