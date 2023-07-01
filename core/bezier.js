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


    let loopProtect = 1000;

    while (Math.abs(arcLen - length) > error
        && loopProtect-- > 0)
    {
        t += (arcLen - length) / hullLength;

        halves = splitSeg(p0, p1, p2, p3, t);
        l      = halves[0];

        length = arcLength(l[0], l[1], l[2], l[3], error);
    }

    if (loopProtect == 0)
        console.log('endless loop in positionOnSegment()');


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
        [c012, c12, c2, p3] ];
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



function bounds2(p0, p1, p2)
{
    let rect = new Rect();

    rect = expandRect_(rect, p0);
    rect = expandRect_(rect, p2);

    /*	if p1 is between p0 and p2 then 
        p0 and p2 are opposite corners of the bounds  */

    if (   (   p0.x <= p1.x && p1.x <= p2.x
            || p2.x <= p1.x && p1.x <= p0.x)
        && (   p0.y <= p1.y && p1.y <= p2.y
            || p2.y <= p1.y && p1.y <= p0.y))
        return rect;

    /*         p₀ - p₁
        t = ─────────────
            p₀ - 2p₁ + p₂	*/

    const pt = divv((subv(p0, p1)), nozerov(addv(subv(p0, mulvs(p1, 2)), p2)));

    const p = point(
        lerp2(p0.x, p1.x, p2.x, pt.x),
        lerp2(p0.y, p1.y, p2.y, pt.y));

    return expandRect_(rect, p);
}



function bounds3(p0, p1, p2, p3)
{
    let rect = new Rect();

    rect = expandRect_(rect, p0);
    rect = expandRect_(rect, p3);

    // f(t) = ax³ + bx² + cx + d

    const ax =   -p0.x + 3*p1.x - 3*p2.x + p3.x;
    const bx =  3*p0.x - 6*p1.x + 3*p2.x;
    const cx = -3*p0.x + 3*p1.x;
    //const dx = p0.x;

    const ay =   -p0.y + 3*p1.y - 3*p2.y + p3.y;
    const by =  3*p0.y - 6*p1.y + 3*p2.y;
    const cy = -3*p0.y + 3*p1.y;
    //const dy = p0.y;

    // f'(t) = 3ax² + 2bx + c

    let ax_ = ax * 3;
    let bx_ = bx * 2;

    let ay_ = ay * 3;
    let by_ = by * 2;

    // if a == 0, then the derivative is a line with only one solution

    if (   ax_ == 0 
        || ay_ == 0)
    {
        if (   bx_ == 0 
            && by_ == 0)
        {
            rect = expandRect(rect, new AbsRect(
                Math.min(p0.x, p1.x, p2.x, p3.x),
                Math.min(p0.y, p1.y, p2.y, p3.y),
                Math.max(p0.x, p1.x, p2.x, p3.x),
                Math.max(p0.y, p1.y, p2.y, p3.y)));
        }
        else if (bx_ == 0 
              && by_ != 0)
        {
            const pt = point(
                -cx / bx_,
                -cy / by_);

            const pMin = point(
                Math.min(p0.x, p1.x, p2.x, p3.x),
                lerp3(p0.y, p1.y, p2.y, p3.y, pt.y));

            const pMax = point(
                Math.max(p0.x, p1.x, p2.x, p3.x),
                lerp3(p0.y, p1.y, p2.y, p3.y, pt.y));

            rect = expandRect_(rect, pMin);
            rect = expandRect_(rect, pMax);
        }
        else if (by_ == 0 
              && bx_ != 0)
        {
            const pt = point(
                -cx / bx_,
                -cy / by_);

            const pMin = point(
                lerp3(p0.x, p1.x, p2.x, p3.x, pt.x),
                Math.min(p0.y, p1.y, p2.y, p3.y));

            const pMax = point(
                lerp3(p0.x, p1.x, p2.x, p3.x, pt.x),
                Math.max(p0.y, p1.y, p2.y, p3.y));

            rect = expandRect_(rect, pMin);
            rect = expandRect_(rect, pMax);
        }
        else
        {
            const pt = point(
                -cx / bx_,
                -cy / by_);
                
            const p = point(
                lerp3(p0.x, p1.x, p2.x, p3.x, pt.x),
                lerp3(p0.y, p1.y, p2.y, p3.y, pt.y));

            rect = expandRect_(rect, p);
        }
    }

    // quadratic discriminants

    else
    {
        let roots = new Array(4); // there will be ≤4 solutions

        let nRoots = 0;
        let r;

        let Dx = bx_*bx_ - 4*ax_*cx;
        const _2ax = 0.5 / ax_;
        bx_ *= _2ax;

        if (Dx == 0)
        {
            if (bx_ >= 0 && bx_ <= 1) roots[nRoots++] = -bx_;
        }
        else if (Dx > 0)
        {
            Dx = Math.sqrt(Dx) * _2ax;

            r = -bx_ + Dx;  if (r >= 0 && r <= 1) roots[nRoots++] = r;
            r = -bx_ - Dx;  if (r >= 0 && r <= 1) roots[nRoots++] = r;
        }

        let Dy = sqr(by_) - 4*ay_*cy;
        const _2ay = 0.5 / ay_;
        by_ *= _2ay;

        if (Dy == 0)
        {
            if (   by_ >=   - Number.EPSILON 
                && by_ <= 1 + Number.EPSILON)
                roots[nRoots++] = -by_;
        }
        else if (Dy > 0)
        {
            Dy = Math.sqrt(Dy) * _2ay;

            r = -by_ + Dy;
            if (   r >=   - Number.EPSILON 
                && r <= 1 + Number.EPSILON)
                roots[nRoots++] = r;

            r = -by_ - Dy;
            if (   r >=   - Number.EPSILON 
                && r <= 1 + Number.EPSILON)
                roots[nRoots++] = r;
        }

        //

        for (let i = 0; i < nRoots; i++)
        {
            rect = expandRect_(
                rect, 
                point(
                    lerp3(p0.x, p1.x, p2.x, p3.x, roots[i]),
                    lerp3(p0.y, p1.y, p2.y, p3.y, roots[i])));
        }
    }

    return rect;
}