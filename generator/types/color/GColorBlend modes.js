function blendNormal(col, back, opacity)
{
    // = col over back

    return [ col[0] * opacity + back[0] * (1 - opacity),
             col[1] * opacity + back[1] * (1 - opacity),
             col[2] * opacity + back[2] * (1 - opacity) ];
}



function blendDarken(col, back, opacity)
{
    // = min(back, col)

    return blendNormal(
        [ Math.min(back[0], col[0]),
          Math.min(back[1], col[1]),
          Math.min(back[2], col[2]) ],
        back,
        opacity);
}



function blendMultiply(col, back, opacity)
{
    // = back * col

    return blendNormal(
        [ back[0] * col[0],
          back[1] * col[1],
          back[2] * col[2] ],
        back,
        opacity);
}



function blendColorBurn(col, back, opacity)
{
    // = 1 - (1 - back) / col,   col > 0
    // = 0,                      col = 0

    return [ col[0] > 0 ? 1 - (1 - back[0]) / col[0] : 0,
             col[1] > 0 ? 1 - (1 - back[1]) / col[1] : 0,
             col[2] > 0 ? 1 - (1 - back[2]) / col[2] : 0 ];
}



function blendLighten(col, back, opacity)
{
    // = max(back, col)

    return blendNormal(
        [ Math.max(back[0], col[0]),
          Math.max(back[1], col[1]),
          Math.max(back[2], col[2]) ],
        back,
        opacity);
}



function blendScreen(col, back, opacity)
{
    // = back + col - (back * col)

    return [ back[0] + col[0] - back[0] * col[0],
             back[1] + col[1] - back[1] * col[1],
             back[2] + col[2] - back[2] * col[2] ];
}



function blendColorDodge(col, back, opacity)
{
    // = back / (1 - col),   col < 1
    // = back / (1 - col),   col < 1
    // = 1,                  col = 1

    return [ col[0] < 1 ? back[0] / (1 - col[0]) : 1,
             col[1] < 1 ? back[1] / (1 - col[1]) : 1,
             col[2] < 1 ? back[2] / (1 - col[2]) : 1 ];
}



function blendOverlay(col, back, opacity)
{
    // = 2 * col * back,                   back < 0.5 
    // = 1 - 2 * (1 - col) * (1 - back),   else

    return [ back[0] < 0.5 ? 2 * col[0] * back[0] : 1 - 2 * (1 - col[0]) * (1 - back[0]),
             back[1] < 0.5 ? 2 * col[1] * back[1] : 1 - 2 * (1 - col[1]) * (1 - back[1]),
             back[2] < 0.5 ? 2 * col[2] * back[2] : 1 - 2 * (1 - col[2]) * (1 - back[2]) ];
}



function bSL_D(x)
{
    return x <= 0.25
         ? ((16 * x - 12) * x + 4) * x
         : Math.sqrt(x);
}



function blendSoftLight(col, back, opacity)
{
    // = (2 * col - 1) * (back - back²) + back,     col < 0.5 
    // = (2 * col - 1) * (D(back) - col) + back,   else

    //   D(x) = ((16 * x - 12) * x + 4) * x,   x ≤ 0.25
    //          √(x),                          x > 0.25

    return [ col[0] < 0.5 ? (2 * col[0] - 1) * (back[0] - sqr(back[0])) + back : (2 * col[0] - 1) * (bSL_D(back[0]) - col[0]) + back[0],
             col[1] < 0.5 ? (2 * col[1] - 1) * (back[1] - sqr(back[1])) + back : (2 * col[1] - 1) * (bSL_D(back[1]) - col[1]) + back[1],
             col[2] < 0.5 ? (2 * col[2] - 1) * (back[2] - sqr(back[2])) + back : (2 * col[2] - 1) * (bSL_D(back[2]) - col[2]) + back[2] ];
}



function blendHardLight(col, back, opacity)
{
    // = 2 * col * back,                   col < 0.5
    // = 1 - 2 * (1 - col) * (1 - back),   else

    return [ col[0] < 0.5 ? 2 * col[0] * back : 1 - 2 * (1 - col[0]) * (1 - back[0]),
             col[1] < 0.5 ? 2 * col[1] * back : 1 - 2 * (1 - col[1]) * (1 - back[1]),
             col[2] < 0.5 ? 2 * col[2] * back : 1 - 2 * (1 - col[2]) * (1 - back[2]) ];
}



function blendDifference(col, back, opacity)
{
    // = |back - col|

    return [ Math.abs(back[0] - col[0]),
             Math.abs(back[1] - col[1]),
             Math.abs(back[2] - col[2]) ];
}



function blendExclusion(col, back, opacity)
{
    // = col * (1 - back) + (1 - col) * back
    
    return [ col[0] * (1 - back[0]) + (1 - col[0]) * back[0],
             col[1] * (1 - back[1]) + (1 - col[1]) * back[1],
             col[2] * (1 - back[2]) + (1 - col[2]) * back[2] ];
}



/*	NOTE: see the PDF spec for the explanation of how the next four blending modes work
    (they don't actually convert RGB to HSL, but use a faster method of calculation, and
    the result is the same.  */

function blendHue(col, back, opacity)
{
    // replace the destination hue with the source hue

    return hsl2rgb(
        setChan(rgb2hsl(back), 0, rgb2hsl(col)[0]));
}



function blendSaturation(col, back, opacity)
{
    // replace the destination saturation with the source saturation

    return hsl2rgb(
        setChan(rgb2hsl(back), 1, rgb2hsl(col)[1]));
}



function blendColor(col, back, opacity)
{
    // replace the destination hue & saturation with the source hue & saturation

    const hslCol  = rgb2hsl(col);
    const hslBack = rgb2hsl(back);

    return hsl2rgb(
        setChan(
            setChan(
                hslBack,
                0, 
                hslCol[0]),
            1,
            hslCol[1]));
}



function bl_lum(col)
{
    return col[0] * 0.30
         + col[1] * 0.59
         + col[2] * 0.11;
}



function bl_clamp(col)
{
    let r = col[0];
    let g = col[1];
    let b = col[2];


    const lum = bl_lum(r, g, b);
    const min = Math.min(Math.min(r, g), b);
    const max = Math.max(Math.max(r, g), b);


    if (min < 0)
    {
        r = lum + ((r - lum) * lum) / (lum - min);
        g = lum + ((g - lum) * lum) / (lum - min);
        b = lum + ((b - lum) * lum) / (lum - min);
    }
    
    if (max > 1)
    {
        r = lum + ((r - lum) * (1 - lum)) / (max - lum);
        g = lum + ((g - lum) * (1 - lum)) / (max - lum);
        b = lum + ((b - lum) * (1 - lum)) / (max - lum);
    }

    
    return [r, g, b];
}



function bl_setLum(col, lum)
{
    const d = lum - bl_lum(col);
    
    return clamp(
        col[0] + d,
        col[1] + d,
        col[2] + d);
}



function blendLuminosity(col, back, opacity)
{
    // replace the destination luminostiy with the source luminosity

    return bl_setLum(back, bl_lum(col));
}