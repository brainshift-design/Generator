const rgbNaN = [
    Number.NaN,
    Number.NaN,
    Number.NaN ];

const rgbaNaN = [
    Number.NaN,
    Number.NaN,
    Number.NaN,
    Number.NaN ];


const rgbInvalid  = [0xff, 0, 0xff];
const rgbaInvalid = [0xff, 0, 0xff, 0xff];


const dataColor_NaN = [
    'rgb',
    Number.NaN,
    Number.NaN,
    Number.NaN ];


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



function rgb2style(rgb)
{
    return colorStyle_(rgb[0], rgb[1], rgb[2], 1);
}



function colorStyleRgba_(r, g, b, a)
{
    return colorStyle_(r, g, b, a);
}



function rgba2style(rgba)
{
    return colorStyle_(rgba[0], rgba[1], rgba[2], rgba[3]);
}



function rgb2style_a(rgb, a)
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



function isDark(rgb, threshold = 0.71)
{
    return rgb2hclokl(rgb)[2] < threshold;
}



function rgbDistance(col1, col2)
{
    const d0 = col2[0] - col1[0];
    const d1 = col2[1] - col1[1];
    const d2 = col2[2] - col1[2];

    return Math.sqrt(d0*d0 + d1*d1 + d2*d2);
}



function rgbaMul(rgba, v)
{
    return [
        rgba[0] * v,
        rgba[1] * v,
        rgba[2] * v,
        rgba[3] * v ];
}



function rgbaDiv(rgba, v)
{
    return [
        rgba[0] / v,
        rgba[1] / v,
        rgba[2] / v,
        rgba[3] / v ];
}



function maxRgbDistance(col1, col2)
{
    return Math.max(Math.max(Math.max(
        Math.abs(col2[0] - col1[0]),
        Math.abs(col2[1] - col1[1])),
        Math.abs(col2[2] - col1[2])));
}



function rgbEqual(rgb1, rgb2)
{
    return Math.abs(rgb1[0] - rgb2[0]) < Eps
        && Math.abs(rgb1[1] - rgb2[1]) < Eps
        && Math.abs(rgb1[2] - rgb2[2]) < Eps;        
}



function style2rgba(style) 
{
    utilContext.fillStyle = style;
    utilContext.fillRect(0, 0, 1, 1);

    return rgbaDiv(utilContext.getImageData(0, 0, 1, 1).data, 0xFF);
}



function computedStyle2rgba(obj, style) 
{
    utilContext.fillStyle = getStyleValue(obj, style);
    utilContext.fillRect(0, 0, 1, 1);

    return rgbaDiv(utilContext.getImageData(0, 0, 1, 1).data, 0xFF);
}



function getTextColorFromBackColor(rgb, opacity = 1)
{
    return !rgbIsNaN(rgb)
           ? (opacity >= 0.5
               ? (isDark(rgb)  ? [1, 1, 1, 0.75] : [0, 0, 0, 0.75])
               : (isDarkMode() ? [1, 1, 1, 0.75] : [0, 0, 0, 0.75]))
           : (isDarkMode() ? rgbaNoColorTextDark : rgbaNoColorTextLight);
}



function getDefaultWarningStyle(rgb)
{
    return !rgbIsNaN(rgb)
         ? (isDark(rgb)  ? '#ffffff29' : '#00000022')
         : (isDarkMode() ? '#ffffff08' : '#00000006'); 
}