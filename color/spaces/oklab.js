function rgb2oklab(rgb, cs = sRGB)
{
    return rgb2oklab_(rgb[0], rgb[1], rgb[2], cs);
}



function rgb2oklab_(r, g, b, cs = sRGB) 
{
    return oklms2oklab(rgb2oklms_(r, g, b, cs));
}







function oklab2rgb(lab, cs = sRGB)
{
    return oklms2rgb(oklab2oklms(lab), cs);
}



function oklab2rgb_(l, a, b, cs = sRGB) 
{
    return oklab2rgb([l, a, b], cs);
}