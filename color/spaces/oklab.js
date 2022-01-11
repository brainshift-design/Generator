const okLabScale = 5.8209716167;



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