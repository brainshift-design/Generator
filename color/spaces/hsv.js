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



function hsv2rgb_(h, s, v)
{
    // h %= 1;

    // if (h < 0) h += 1;
    //while (h > 1) h -= 1;

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