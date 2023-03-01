// Hunt-Pointer-Estevez
// const HPE = [[ 0.4002, 0.7076, -0.0808],
//              [-0.2263, 1.1653,  0.0457],
//              [ 0,      0,       0.9182]];

// const invHPE = inverse(HPE);


// CIECAM02
const CAT = [[ 0.7328, 0.4296, -0.1624],
             [-0.7036, 1.6975,  0.0061],
             [ 0.0030, 0.0136,  0.9834]];

const invCAT = inverse(CAT);


const M1 = [[ 0.8189330101, 0.3618667424, -0.1288597137 ],
            [ 0.0329845436, 0.9293118715,  0.0361456387 ],
            [ 0.0482003018, 0.2643662691,  0.6338517070 ]];

const invM1 = inverse(M1);



// function colorIsNaN(c)
// {
//     return isNaN(c[0])
//         || isNaN(c[1])
//         || isNaN(c[2]);
// }



function rgbIsNaN(rgb) 
{
    return isNaN(rgb[0])
        || isNaN(rgb[1])
        || isNaN(rgb[2]);
}



function rgbaIsNaN(rgba) 
{
    return isNaN(rgba[0])
        || isNaN(rgba[1])
        || isNaN(rgba[2])
        || isNaN(rgba[3]);
}



function rgbIsValid(rgb, lim = ColorEpsilon)
{
    return rgb[0] > -lim && rgb[0] < 1 + lim 
        && rgb[1] > -lim && rgb[1] < 1 + lim 
        && rgb[2] > -lim && rgb[2] < 1 + lim;
}



function rgbaIsValid(rgba, lim = ColorEpsilon)
{
    return rgba[0] > -lim && rgba[0] < 1 + lim 
        && rgba[1] > -lim && rgba[1] < 1 + lim 
        && rgba[2] > -lim && rgba[2] < 1 + lim
        && rgba[3] > -lim && rgba[3] < 1 + lim;
}



function rgbIsOk(rgb, lim = ColorEpsilon)
{
    return !rgbIsNaN  (rgb)
        &&  rgbIsValid(rgb, lim);
}



function invalid2validRgb(rgb)
{
    return [
        Math.min(Math.max(0, rgb[0]), 1),
        Math.min(Math.max(0, rgb[1]), 1),
        Math.min(Math.max(0, rgb[2]), 1) ];
}



function rgbLerp(rgb1, rgb2, t)
{
    return [ lerp(rgb1[0], rgb2[0], t),
             lerp(rgb1[1], rgb2[1], t),
             lerp(rgb1[2], rgb2[2], t) ];
}



function rgbaLerp(rgba1, rgba2, t)
{
    return [ lerp(rgba1[0], rgba2[0], t),
             lerp(rgba1[1], rgba2[1], t),
             lerp(rgba1[2], rgba2[2], t),
             lerp(rgba1[3], rgba2[3], t) ];
}



function rgbAdd(rgb1, rgb2)
{
    return [ rgb1[0] + rgb2[0],
             rgb1[1] + rgb2[1],
             rgb1[2] + rgb2[2] ];
}



function rgbSub(rgb1, rgb2)
{
    return [ rgb1[0] - rgb2[0],
             rgb1[1] - rgb2[1],
             rgb1[2] - rgb2[2] ];
}



function rgbMuls(rgb, s)
{
    return [ rgb[0] * s,
             rgb[1] * s,
             rgb[2] * s ];
}



function rgbAvg(rgb1, rgb2)
{
    return [ (rgb1[0] + rgb2[0]) / 2,
             (rgb1[1] + rgb2[1]) / 2,
             (rgb1[2] + rgb2[2]) / 2 ];
}



function rgbMax(rgb1, rgb2)
{
    return [ Math.max(rgb1[0], rgb2[0]),
             Math.max(rgb1[1], rgb2[1]),
             Math.max(rgb1[2], rgb2[2]) ];
}



function rgbPow(col, p)
{
    return [
        Math.pow(col[0], p), 
        Math.pow(col[1], p), 
        Math.pow(col[2], p) ]
}
