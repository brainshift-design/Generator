function rgbLightenHsv(rgb, amount)
{
    const hsv = rgb2hsv(rgb);
    hsv[2] *= amount;
    return hsv2rgb(hsv);
}



function rgbSaturateHsv(rgb, amount)
{
    const hsv = rgb2hsv(rgb);
    hsv[1] *= amount;
    return hsv2rgb(hsv);
}



function rgbSaturateHsl(rgb, amount)
{
    const hsl = rgb2hsl(rgb);
    hsl[1] *= amount;
    return hsl2rgb(hsl);
}



function lin2rgb_(r, g, b)
{
    return [
        sRGB.degamma(r), 
        sRGB.degamma(g), 
        sRGB.degamma(b)];
}



function lin2rgb(rgb)
{
    return lin2rgb_(rgb[0], rgb[1], rgb[2]);
}



function rgb2lin_(r, g, b)
{
    return [
        sRGB.regamma(r), 
        sRGB.regamma(g), 
        sRGB.regamma(b)];
}



function rgb2lin(rgb)
{
    return rgb2lin_(rgb[0], rgb[1], rgb[2]);
}