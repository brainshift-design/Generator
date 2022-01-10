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


// achromatopsia
const ACR = [0.212656, 0.715158, 0.072186];


const lmsW = xyz2lms(lrgb2xyz([1, 1, 1], sRGB));
const lmsB = xyz2lms(lrgb2xyz([0, 0, 1], sRGB));
const lmsR = xyz2lms(lrgb2xyz([1, 0, 0], sRGB));

const lq1 = (lmsW[2]*lmsB[0] - lmsB[2]*lmsW[0]) / (lmsW[2]*lmsB[1] - lmsB[2]*lmsW[1]);
const lq2 = (lmsW[1]*lmsB[0] - lmsB[1]*lmsW[0]) / (lmsW[1]*lmsB[2] - lmsB[1]*lmsW[2]);

const mq1 = (lmsW[2]*lmsB[1] - lmsB[2]*lmsW[1]) / (lmsW[2]*lmsB[0] - lmsB[2]*lmsW[0]);
const mq2 = (lmsW[0]*lmsB[1] - lmsB[0]*lmsW[1]) / (lmsW[0]*lmsB[2] - lmsB[0]*lmsW[2]);

const sq1 = (lmsW[1]*lmsR[2] - lmsR[1]*lmsW[2]) / (lmsW[1]*lmsR[0] - lmsR[1]*lmsW[0]);
const sq2 = (lmsW[0]*lmsR[2] - lmsR[0]*lmsW[2]) / (lmsW[0]*lmsR[1] - lmsR[0]*lmsW[1]);

const bq1 = lmsW[0] / lmsW[2];
const bq2 = lmsW[1] / lmsW[2];



function validRgb(rgb)
{
    if (!isValidRgb(rgb))
        rgb = [0.9, 0.9, 0.9];

    return rgb;
}



function isValidRgb(rgb, lim = -Eps)
{
    return (rgb[R] >= 0 + lim && rgb[R] <= 1 - lim 
         && rgb[G] >= 0 + lim && rgb[G] <= 1 - lim 
         && rgb[B] >= 0 + lim && rgb[B] <= 1 - lim);
}



function lerp(a, b, t)
{
    return a + (b - a) * t;
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