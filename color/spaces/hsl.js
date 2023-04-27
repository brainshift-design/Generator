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



function hsl2rgb_(h, s, l)
{
    while (h < 0) h++;
    h %= 1;

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