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