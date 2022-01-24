// this is a number I made up following the information here: https://www.color-blindness.com/2007/07/20/monochromacy-complete-color-blindness/
// the simulation itself gives grayscale
// on the site the simulation has color in it, so I decided to leave some color in as well,
// but the amount is completely arbitrary, I just felt that this particular value matches
// the description on that site without being unrealistically exaggerated
const blueMono = 0.88;


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



function col2xyz(col, colorSpace, w = sRGB.W)
{
    if (colorSpace == 1) return lab2xyz(col, w);
    else                 return luv2xyz(col, w);
}



function xyz2col(col, w = sRGB.W)
{
    switch (setColorSpace)
    {
        case 2: return xyz2lab(col, w);
        case 1: return xyz2luv(col, w);
    }
}



function lch2rgb_CB(l, c, h, colorSpace, cones)
{
    const col = lch2col([
        l, 
        c * l/100, 
        h]);

    const xyz = col2xyz(col, colorSpace);
    

    let rgb;

    if (   cones.l == 0
        && cones.m == 0
        && cones.s == 0)
    {
        rgb = xyz2rgb(xyz, sRGB);

        const a = 
              ACR[0] * rgb[0]
            + ACR[1] * rgb[1]
            + ACR[2] * rgb[2];

        rgb = [a, a, a];
    }
    else
    {
        const lms = xyz2lms(xyz);

        const lms_ =
               cones.l == 0
            && cones.m == 0

            ? [ lms[0] + blueMono * (bq1*lms[2] - lms[0]),
                lms[1] + blueMono * (bq2*lms[2] - lms[1]),
                lms[2] ]
             
            : [ lms[0] + (1 - cones.l) * ((lq1*lms[1] + lq2*lms[2]) - lms[0]),
                lms[1] + (1 - cones.m) * ((mq1*lms[0] + mq2*lms[2]) - lms[1]),
                lms[2] + (1 - cones.s) * ((sq1*lms[0] + sq2*lms[1]) - lms[2]) ];

        let xyz_ = lms2xyz(lms_);
            rgb  = xyz2rgb(xyz_, sRGB);
    }
    
    return rgb;
}    



function oklch2rgb_CB(l, c, h, colorSpace, cones)
{
    let rgb;
    
    if (   cones.l == 0
        && cones.m == 0
        && cones.s == 0)
    {
        const lab = lch2col([
            l, 
            c,//okLabScale * l/100, 
            h ]);
    
        rgb = oklab2rgb(lab, sRGB);

        const a = 
              ACR[0] * rgb[0]
            + ACR[1] * rgb[1]
            + ACR[2] * rgb[2];

        rgb = [a, a, a];
    }
    else
    {
        const _rgb = lch2rgb_CB(l, c, h, colorSpace, cones);

        const xyz = rgb2xyz(_rgb, sRGB);
        const lms = xyz2lms(xyz);

        const lms_ =
               cones.l == 0
            && cones.m == 0

            ? [ lms[0] + blueMono * (bq1*lms[2] - lms[0]),
                lms[1] + blueMono * (bq2*lms[2] - lms[1]),
                lms[2] ]
             
            : [ lms[0] + (1 - cones.l) * ((lq1*lms[1] + lq2*lms[2]) - lms[0]),
                lms[1] + (1 - cones.m) * ((mq1*lms[0] + mq2*lms[2]) - lms[1]),
                lms[2] + (1 - cones.s) * ((sq1*lms[0] + sq2*lms[1]) - lms[2]) ];

        let xyz_ = lms2xyz(lms_);
            rgb  = xyz2rgb(xyz_, sRGB);
    }
    
    return rgb;
}    



