function allConesWork(cones)
{
    return cones.l == 1 
        && cones.m == 1 
        && cones.s == 1;
}



function rgbToString(rgb)
{
    return '{' + Math.round(rgb[0] * 255) + ', '
               + Math.round(rgb[1] * 255) + ', '
               + Math.round(rgb[2] * 255) + '}';
}



function colorStyle_(r, g, b, a)
{
    if (a != undefined)
    {
        return 'rgba('
            + Math.round(r * 0xff) + ', '
            + Math.round(g * 0xff) + ', '
            + Math.round(b * 0xff) + ', '
            + a + ')';
    }
    else
    {
        return 'rgb('
            + Math.round(r * 0xff) + ', '
            + Math.round(g * 0xff) + ', '
            + Math.round(b * 0xff) + ')';
    }
}



function colorStyleRgb_(r, g, b)
{
    return colorStyle_(r, g, b, 1);
}



function colorStyleRgb(rgb)
{
    return colorStyle_(rgb[0], rgb[1], rgb[2], 1);
}



function colorStyleRgba_(r, g, b, a)
{
    return colorStyle_(r, g, b, a);
}



function colorStyleRgba(rgba)
{
    return colorStyle_(rgba[0], rgba[1], rgba[2], rgba[3]);
}



function colorStyleRgb_a(rgb, a)
{
    return colorStyle_(rgb[0], rgb[1], rgb[2], a);
}



function toRgba(rgb_)
{
    return rgb_.length == 3
         ? [...rgb_, 1]
         : rgb_;
}



function rgb_a(rgb, a)
{
    return [rgb[0], rgb[1], rgb[2], a];
}



function isDark(color, threshold = 0.71)
{
    return rgb2hclokl(color)[2] > threshold;
}



function maxRgbDistance(col1, col2)
{
    return Math.max(Math.max(Math.max(
        Math.abs(col2[0] - col1[0]),
        Math.abs(col2[1] - col1[1])),
        Math.abs(col2[2] - col1[2])));
}