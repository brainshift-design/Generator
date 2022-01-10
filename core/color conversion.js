const okLabScale = 5.8209716167;



function rgb2hsv_(r, g, b)
{
    let h, s, v;

    let min = Math.min(Math.min(r, g), b),
        max = Math.max(Math.max(r, g), b);

    let delta = max - min;

    v = max;
    s = max == 0 ? 0 : delta / max;
	
    if      (max == r) h = 1/6 * (g - b) / delta + 1;   // between yellow and magenta
    else if (max == g) h = 1/6 * (b - r) / delta + 1/3; // between cyan and yellow
    else if (max == b) h = 1/6 * (r - g) / delta + 2/3; // between between magenta and cyan

	if (h > 1) h -= 1;
	//if (h < 0) h += 1;

    return [h, s, v];
}



function rgb2hsv(rgb)
{
    return rgb2hsv_(rgb[0], rgb[1], rgb[2]);
}



function rgb2hsl_(r, g, b)
{
    let h, s, l;

    let min = Math.min(Math.min(r, g), b),
        max = Math.max(Math.max(r, g), b);

    let delta = max - min;

    l = (max + min) / 2;

         if (max == min) h = 0;
    else if (max == r  ) h = 1/6 * (g - b) / delta + 1;
    else if (max == g  ) h = 1/6 * (b - r) / delta + 1/3;
    else if (max == b  ) h = 1/6 * (r - g) / delta + 2/3;

         if (max == min) s = 0;
    else if (l <= 0.5)   s = delta / (2 * l);
    else if (l >  0.5)   s = delta / (2 - 2 * l);

    return [h, s, l];
}



function rgb2hsl(rgb)
{
    return rgb2hsl_(rgb[0], rgb[1], rgb[2]);
}



function hsv2rgb_(h, s, v)
{
    while (h < 0) h += 1;
    while (h > 1) h -= 1;

    if (s == 0)
        return [v, v, v]; // achromatic

    h *= 6 - 0.0000001;

    let i = Math.floor(h);
    let f = h - i;
	
    let p = v * (1 - s);
    let q = v * (1 - s * f);
    let t = v * (1 - s * (1 - f));

    switch (i)
    {
        case 0:  return [v, t, p];
        case 1:  return [q, v, p];
        case 2:  return [p, v, t];
        case 3:  return [p, q, v];
        case 4:  return [t, p, v];
        default: return [v, p, q];
    }
}



function hsv2rgb(hsv)
{
	return hsv2rgb_(hsv[0], hsv[1], hsv[2]);
}



function hsl2rgb_(h, s, l)
{
    let q =
        l < 0.5
        ? l * (1 + s)
        : l + s - l * s;

    let p = 2 * l - q;

    let tr = h + 1/3;
    let tg = h;
    let tb = h - 1/3;

    if (tr < 0) tr += 1; if (tr > 1) tr -= 1;
    if (tg < 0) tg += 1; if (tg > 1) tg -= 1;
    if (tb < 0) tb += 1; if (tb > 1) tb -= 1;

    let r, g, b;

    let qp6 = (q - p) * 6; 

         if (tr <  1/6)				r = p + qp6 * tr;
    else if (tr >= 1/6 && tr < 0.5)	r = q;
    else if (tr >= 0.5 && tr < 2/3)	r = p + qp6 * (2/3 - tr);
    else							r = p;
	
         if (tg <  1/6)				g = p + qp6 * tg;
    else if (tg >= 1/6 && tg < 0.5)	g = q;
    else if (tg >= 0.5 && tg < 2/3) g = p + qp6 * (2/3 - tg);
    else							g = p;

         if (tb <  1/6)				b = p + qp6 * tb;
    else if (tb >= 1/6 && tb < 0.5) b = q;
    else if (tb >= 0.5 && tb < 2/3) b = p + qp6 * (2/3 - tb);
    else							b = p;

    return [r, g, b];
}



function hsl2rgb(hsl)
{
    return hsl2rgb_(hsl[0], hsl[1], hsl[2]);
}



function rgb2xyz(rgb, cs)
{ 
    return rgb2xyz_(rgb[0], rgb[1], rgb[2], cs);
}    



function rgb2xyz_(r, g, b, cs)
{ 
    let rgb = [
        cs.degamma(r),
        cs.degamma(g),
        cs.degamma(b) ];

    return lrgb2xyz(rgb, cs);
}    



function lrgb2xyz(rgb, cs)
{
    return mulv3m3(rgb, cs.lin2xyz);
}        



function xyz2rgb(xyz, cs)
{
    let rgb = xyz2lrgb(xyz, cs);

    return [
        cs.regamma(rgb[0]),
        cs.regamma(rgb[1]),
        cs.regamma(rgb[2]) ];
}



function xyz2lrgb(xyz, cs)
{
    return mulv3m3(xyz, cs.xyz2lin);
}



function xyz2lab(xyz, W)
{
    const x = xyz[0], 
          y = xyz[1], 
          z = xyz[2];

    const e = cube(6/29);
    const k = cube(29/3);

    let xw = x / W[0];
    let yw = y / W[1];
    let zw = z / W[2];

    xw = xw > e ? Math.cbrt(xw) : (k * xw + 16)/116;
    yw = yw > e ? Math.cbrt(yw) : (k * yw + 16)/116;
    zw = zw > e ? Math.cbrt(zw) : (k * zw + 16)/116;

    const l = (116 * yw) - 16;
    const a = 500 * (xw - yw);
    const b = 200 * (yw - zw);

    return [l, a, b];
}



function xyz2luv(xyz, W)
{
    const x = xyz[0], 
          y = xyz[1], 
          z = xyz[2];

    const e = cube(6/29);
    const k = cube(29/3);

    const yw = y / W[1];

    const l = 
        yw > e
        ? 116 * Math.cbrt(yw) - 16
        : k * yw;

    const u_ = 4*x / (x + 15*y + 3*z);
    const v_ = 9*y / (x + 15*y + 3*z);
    
    const uw = 4*W[0] / (W[0] + 15*W[1] + 3*W[2]);
    const vw = 9*W[1] / (W[0] + 15*W[1] + 3*W[2]);
    
    const u = 13*l * (u_ - uw);
    const v = 13*l * (v_ - vw);

    return [l, u, v];
}



function lab2lch(lab) 
{
    // either lab or luv, 
    // the polar transformation is the same

    const l = lab[0], 
          a = lab[1], 
          b = lab[2];

    const c = Math.sqrt(a*a + b*b);
    const h = Math.atan2(b, a);

    return [l, c, h];
}



function lch2col(lch)
{
    // here 'col' could be either lab or luv, 
    // the polar transformation is the same

    const l = lch[0], 
          c = lch[1], 
          h = lch[2];

    const a = c * Math.cos(h);
    const b = c * Math.sin(h);

    return [l, a, b];
}



function lab2xyz(lab, W)
{
    const l = lab[0], 
          a = lab[1], 
          b = lab[2];

    const e = cube(6/29);
    const k = cube(29/3);

    const yw = (l + 16)/116;
    const xw = a/500 + yw;
    const zw = yw - b/200;

    let x = cube(xw) > e ? cube(xw) : (116*xw - 16)/k;
    let y = cube(yw) > e ? cube(yw) : (116*yw - 16)/k;
    let z = cube(zw) > e ? cube(zw) : (116*zw - 16)/k;

    x *= W[0];
    y *= W[1];
    z *= W[2];

    return [x, y, z];
}



function luv2xyz(luv, W)
{
    const l = luv[0], 
          u = luv[1], 
          v = luv[2];

    const e = cube(6/29);
    const k = cube(29/3);

    const uw = 4*W[0] / (W[0] + 15*W[1] + 3*W[2]);
    const vw = 9*W[1] / (W[0] + 15*W[1] + 3*W[2]);
    
    const y = 
        l > e*k
        ? cube((l + 16)/116)
        : l / k;
    
    const a = (52*l / nozero(u + 13*l*uw) - 1) / 3;
    const b = -5 * y;
    const c = -1/3;
    const d =  y * (39*l / nozero(v + 13*l*vw) - 5);

    const x = (d - b) / nozero(a - c);

    const z = x*a + b;

    return [x, y, z];
}



function xyz2lms(xyz)
{
    return mulv3m3(xyz, CAT);//HPE);
}



function lms2xyz(lms)
{
    return mulv3m3(lms, invCAT);//invHPE);
}



// this is a number I made up following the information here: https://www.color-blindness.com/2007/07/20/monochromacy-complete-color-blindness/
// the simulation itself gives grayscale
// on the site the simulation has color in it, so I decided to leave some color in as well,
// but the amount is completely arbitrary, I just felt that this particular value matches
// the description on that site without being unrealistically exaggerated
const blueMono = 0.88;



function _lch2rgb(l, c, h, colorSpace, cones)
{
    if (colorSpace == 0)
    {
        return allConesWork(cones)
             ? oklch2rgb_(l, c, h)
             : oklch2rgb_CB(l, c, h, colorSpace, cones);
    }
    else
    {
        return allConesWork(cones)
             ? lch2rgb_(l, c, h, colorSpace)
             : lch2rgb_CB(l, c, h, colorSpace, cones);
    }
}

 

function col2xyz(col, w, colorSpace)
{
    if (colorSpace == 1) return lab2xyz(col, w);
    else                 return luv2xyz(col, w);
}


function xyz2col(col, w)
{
    switch (setColorSpace)
    {
        case 2: return xyz2lab(col, w);
        case 1: return xyz2luv(col, w);
    }
}
    
    

function lch2rgb_(l, c, h, colorSpace)
{
    const col = lch2col([
        l, 
        c * l/100, 
        h + (colorSpace == 1 ? hueBiasLab : hueBiasLuv)]);

    const xyz = col2xyz(col, sRGB.W, colorSpace);

    return xyz2rgb(xyz, sRGB);
}    
    
    
    
function oklch2rgb_(l, c, h)
{
    const lab = lch2col([
        l, 
        c/okLabScale * l/100, 
        h + hueBiasLab ]);

    return oklab2rgb(lab, sRGB);
}    
    
    
    
function lch2rgb_CB(l, c, h, colorSpace, cones)
{
    const col = lch2col([
        l, 
        c * l/100, 
        h + (colorSpace == 1 ? hueBiasLab : hueBiasLuv)]);

    const xyz = col2xyz(col, sRGB.W, colorSpace);
    

    let rgb;

    if (   cones.l == 0
        && cones.m == 0
        && cones.s == 0)
    {
        rgb = xyz2rgb(xyz, sRGB);

        const a = 
              ACR[0] * rgb[R]
            + ACR[1] * rgb[G]
            + ACR[2] * rgb[B];

        rgb = [a, a, a];
    }
    else
    {
        const lms = xyz2lms(xyz);

        const lms_ =
               cones.l == 0
            && cones.m == 0

            ? [ lms[0] + blueMono * (bq1*lms[2] - lms[0]),
                lms[1] + blueMono * (bq2*lms[2] - lms[1]),
                lms[2] ]
             
            : [ lms[0] + (1 - cones.l) * ((lq1*lms[1] + lq2*lms[2]) - lms[0]),
                lms[1] + (1 - cones.m) * ((mq1*lms[0] + mq2*lms[2]) - lms[1]),
                lms[2] + (1 - cones.s) * ((sq1*lms[0] + sq2*lms[1]) - lms[2]) ];

        let xyz_ = lms2xyz(lms_);
            rgb  = xyz2rgb(xyz_, sRGB);
    }
    
    return rgb;
}    



function oklch2rgb_CB(l, c, h, colorSpace, cones)
{
    let rgb;
    
    if (   cones.l == 0
        && cones.m == 0
        && cones.s == 0)
    {
        const lab = lch2col([
            l, 
            c/okLabScale * l/100, 
            h + hueBiasLab ]);
    
        rgb = oklab2rgb(lab, sRGB);

        const a = 
              ACR[0] * rgb[R]
            + ACR[1] * rgb[G]
            + ACR[2] * rgb[B];

        rgb = [a, a, a];
    }
    else
    {
        const _rgb = lch2rgb_CB(l, c, h, colorSpace, cones);

        const xyz = rgb2xyz(_rgb, sRGB);
        const lms = xyz2lms(xyz);

        const lms_ =
               cones.l == 0
            && cones.m == 0

            ? [ lms[0] + blueMono * (bq1*lms[2] - lms[0]),
                lms[1] + blueMono * (bq2*lms[2] - lms[1]),
                lms[2] ]
             
            : [ lms[0] + (1 - cones.l) * ((lq1*lms[1] + lq2*lms[2]) - lms[0]),
                lms[1] + (1 - cones.m) * ((mq1*lms[0] + mq2*lms[2]) - lms[1]),
                lms[2] + (1 - cones.s) * ((sq1*lms[0] + sq2*lms[1]) - lms[2]) ];

        let xyz_ = lms2xyz(lms_);
            rgb  = xyz2rgb(xyz_, sRGB);
    }
    
    return rgb;
}    



function rgb2lch(rgb, colorSpace)
{
    return rgb2lch_(rgb[0], rgb[1], rgb[2], colorSpace);
}



function rgb2lch_(r, g, b, colorSpace)
{
    if (colorSpace == 0) return lab2lch(rgb2oklab_(r, g, b, sRGB));
    else                 return lab2lch(xyz2col(rgb2xyz_(r, g, b, sRGB), sRGB.W));
}



function rgb2oklab(rgb, cs)
{
    return rgb2oklab_(rgb[0], rgb[1], rgb[2], cs);
}



function rgb2oklms_(r, g, b, cs) 
{
    r = cs.degamma(r);
    g = cs.degamma(g);
    b = cs.degamma(b);

    return [
        0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b,
	    0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b,
	    0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b ];
}



function oklms2oklab(lms) 
{
    const l = Math.cbrt(lms[0]);
    const m = Math.cbrt(lms[1]);
    const s = Math.cbrt(lms[2]);

    const l_ = 0.2104542553 * l + 0.7936177850 * m - 0.0040720468 * s;
    const a_ = 1.9779984951 * l - 2.4285922050 * m + 0.4505937099 * s;
    const b_ = 0.0259040371 * l + 0.7827717662 * m - 0.8086757660 * s;

    return [
        l_ * 100,
        a_ * 100, 
        b_ * 100 ];
}



function rgb2oklab_(r, g, b, cs) 
{
    return oklms2oklab(rgb2oklms_(r, g, b, cs));
}



function oklab2rgb(lab, cs)
{
    return oklab2rgb_(lab[0], lab[1], lab[2], cs);
}



function oklab2oklms(lab)
{
    return oklab2oklms_(lab[0], lab[1], lab[2]);
}



function oklab2oklms_(l_, a_, b_) 
{
    l_ /= 100;
    a_ /= 100;
    b_ /= 100;

    return [
        l_ + 0.3963377774 * a_ + 0.2158037573 * b_,
        l_ - 0.1055613458 * a_ - 0.0638541728 * b_,
        l_ - 0.0894841775 * a_ - 1.2914855480 * b_ ];
}



function oklms2rgb(lms, cs) 
{
    const l = cube(lms[0]);
    const m = cube(lms[1]);
    const s = cube(lms[2]);

	const r =  4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s;
	const g = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
	const b = -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s;

    return [
        cs.regamma(r),
        cs.regamma(g),
        cs.regamma(b) ];
}



function oklab2rgb_(l_, a_, b_, cs) 
{
    return oklms2rgb(oklab2oklms_(l_, a_, b_), cs);
}