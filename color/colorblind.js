const lmsW = xyz2lms(lrgb2xyz([1, 1, 1]));
const lmsB = xyz2lms(lrgb2xyz([0, 0, 1]));
const lmsR = xyz2lms(lrgb2xyz([1, 0, 0]));

const lq1 = (lmsW[2]*lmsB[0] - lmsB[2]*lmsW[0]) / (lmsW[2]*lmsB[1] - lmsB[2]*lmsW[1]);
const lq2 = (lmsW[1]*lmsB[0] - lmsB[1]*lmsW[0]) / (lmsW[1]*lmsB[2] - lmsB[1]*lmsW[2]);

const mq1 = (lmsW[2]*lmsB[1] - lmsB[2]*lmsW[1]) / (lmsW[2]*lmsB[0] - lmsB[2]*lmsW[0]);
const mq2 = (lmsW[0]*lmsB[1] - lmsB[0]*lmsW[1]) / (lmsW[0]*lmsB[2] - lmsB[0]*lmsW[2]);

const sq1 = (lmsW[1]*lmsR[2] - lmsR[1]*lmsW[2]) / (lmsW[1]*lmsR[0] - lmsR[1]*lmsW[0]);
const sq2 = (lmsW[0]*lmsR[2] - lmsR[0]*lmsW[2]) / (lmsW[0]*lmsR[1] - lmsR[0]*lmsW[1]);

const bq1 = lmsW[0] / lmsW[2];
const bq2 = lmsW[1] / lmsW[2];


// this is a number I made up following the information here: https://www.color-blindness.com/2007/07/20/monochromacy-complete-color-blindness/
// the simulation itself gives grayscale
// on the site the simulation has color in it, so I decided to leave some color in as well,
// but the amount is completely arbitrary, I just felt that this particular value matches
// the description on that site without being unrealistically exaggerated
const blueMono = 0.88;


function rgb2colorblind(rgb, l, m, s, cs = sRGB)
{
    if (   l == 0
        && m == 0
        && s == 0)
    {
        // achromatopsia is simulated by taking only the luminance

        const a = 
              cs.Y[0] * rgb[0]
            + cs.Y[1] * rgb[1]
            + cs.Y[2] * rgb[2];

        rgb = [a, a, a];
    }
    else
    {
        const xyz = rgb2xyz(rgb, cs);
        const lms = xyz2lms(xyz);

        const a = 
              cs.Y[0] * rgb[0]
            + cs.Y[1] * rgb[1]
            + cs.Y[2] * rgb[2];

        const lm = Math.min(l + m, 1);


        const lms_ = [
            lms[0] + lerp(blueMono * (bq1*lms[2] - lms[0]), (1 - l) * ((lq1*lms[1] + lq2*lms[2]) - lms[0]), lm),
            lms[1] + lerp(blueMono * (bq2*lms[2] - lms[1]), (1 - m) * ((mq1*lms[0] + mq2*lms[2]) - lms[1]), lm),
            lms[2] + lerp(0,                     lerp(s, 1 - s, lm) * ((sq1*lms[0] + sq2*lms[1]) - lms[2]), lm) ];

        const xyz_ = lms2xyz(lms_);
              rgb  = xyz2rgb(xyz_, cs);


        let bm_ = rgb2lab(rgb, cs);
        bm_[0] = lerp(a, bm_[0], lm);
        rgb = lab2rgb(bm_, cs);

        
        rgb = rgbLerp(
            [a, a, a], 
            rgb, 
            Math.min(s + lm, 1));
    }
    

    return rgb;
}