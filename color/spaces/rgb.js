function rgbLightenHsv(rgb, amount)
{
    const hsb = rgb2hsv(rgb);
    hsb[2] *= amount;
    return hsv2rgb(hsb);
}



function rgbSaturateHsv(rgb, amount)
{
    const hsb = rgb2hsv(rgb);
    hsb[1] *= amount;
    return hsv2rgb(hsb);
}



function rgbSaturateHsl(rgb, amount)
{
    const hsl = rgb2hsl(rgb);
    hsl[1] *= amount;
    return hsl2rgb(hsl);
}