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



function invalid2validRgb(rgb)
{
    return [
        Math.min(Math.max(0, rgb[0]), 1),
        Math.min(Math.max(0, rgb[1]), 1),
        Math.min(Math.max(0, rgb[2]), 1) ];
}



function isValidRgb(rgb, lim = Number.EPSILON)
{
    return (!isNaN(rgb[0])
         && !isNaN(rgb[1])
         && !isNaN(rgb[2])
         && rgb[0] > -lim && rgb[0] < 1 + lim 
         && rgb[1] > -lim && rgb[1] < 1 + lim 
         && rgb[2] > -lim && rgb[2] < 1 + lim);
}



function rgbLerp(rgb1, rgb2, t)
{
    return [ lerp(rgb1[0], rgb2[0], t),
             lerp(rgb1[1], rgb2[1], t),
             lerp(rgb1[2], rgb2[2], t) ];
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
