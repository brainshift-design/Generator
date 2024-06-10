const rgb_NaN = [
    Number.NaN,
    Number.NaN,
    Number.NaN ];

const rgba_NaN = [
    Number.NaN,
    Number.NaN,
    Number.NaN,
    Number.NaN ];


const rgbInvalid  = [0xff, 0, 0xff];
const rgbaInvalid = [0xff, 0, 0xff, 0xff];


const dataColor_NaN = Object.freeze([
    'rgb',
    Number.NaN,
    Number.NaN,
    Number.NaN ]);


// Hunt-Pointer-Estevez
// const HPE = [[ 0.4002, 0.7076, -0.0808],
//              [-0.2263, 1.1653,  0.0457],
//              [ 0,      0,       0.9182]];

// const invHPE = inversem3(HPE);


// CIECAM02
const CAT = [[ 0.7328, 0.4296, -0.1624],
             [-0.7036, 1.6975,  0.0061],
             [ 0.0030, 0.0136,  0.9834]];

const invCAT = inversem3(CAT);


const M1 = [[ 0.8189330101, 0.3618667424, -0.1288597137 ],
            [ 0.0329845436, 0.9293118715,  0.0361456387 ],
            [ 0.0482003018, 0.2643662691,  0.6338517070 ]];

const invM1 = inversem3(M1);



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



function rgbaIsOk(rgba, lim = ColorEpsilon)
{
    return !rgbaIsNaN  (rgba)
        &&  rgbaIsValid(rgba, lim);
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



function rgbaAdd(rgba1, rgba2)
{
    return [ rgba1[0] + rgba2[0],
             rgba1[1] + rgba2[1],
             rgba1[2] + rgba2[2],
             rgba1[3] + rgba2[3] ];
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



function rgbaMuls(rgba, s)
{
    return [ rgba[0] * s,
             rgba[1] * s,
             rgba[2] * s,
             rgba[3] * s ];
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
    if (a !== undefined)
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



function rgb2style_a(rgb, a = 1)
{
    return colorStyle_(rgb[0], rgb[1], rgb[2], a);
}



function toRgba(rgb_)
{
    return rgb_.length == 3
         ? [...rgb_, 1]
         : rgb_;
}



function rgb_a(rgb, a = 1)
{
    return [rgb[0], rgb[1], rgb[2], a];
}



function isDark(rgb, threshold = 0.71)
{
    return rgb2hclok(rgb)[2] < threshold;
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
    return Math.abs(rgb1[0] - rgb2[0]) < ColorEpsilon
        && Math.abs(rgb1[1] - rgb2[1]) < ColorEpsilon
        && Math.abs(rgb1[2] - rgb2[2]) < ColorEpsilon;        
}



function style2rgba(style) // SLOW
{
    utilContext.fillStyle = style;
    utilContext.fillRect(0, 0, 1, 1);

    return rgbaDiv(utilContext.getImageData(0, 0, 1, 1).data, 0xFF);
}



function computedStyle2rgba(obj, style) // SLOW
{
    utilContext.fillStyle = getStyleValue(obj, style);
    utilContext.fillRect(0, 0, 1, 1);

    return rgbaDiv(utilContext.getImageData(0, 0, 1, 1).data, 0xFF);
}



function getTextColorFromBackColor(rgb, opacity = 1)
{
    return !rgbIsNaN(rgb)
           ? (opacity >= 0.5
               ? (isDark(rgb) ? [1, 1, 1, 0.75] : [0, 0, 0, 0.75])
               : (darkMode ? [1, 1, 1, 0.75] : [0, 0, 0, 0.75]))
           : (darkMode ? rgbaNoColorTextDark : rgbaNoColorTextLight);
}



function getDefaultWarningRgba(rgb)
{
    return !rgbIsNaN(rgb)
         ? (isDark(rgb)  ? [1, 1, 1, 0.133] : [0, 0, 0, 0.161])  
         : (darkMode ? [1, 1, 1, 0.031] : [0, 0, 0, 0.031]);  
}



function getWarningStyles(colBack)
{
    let warnStyle1, 
        warnStyle2;
    
        
    const colWarning = getDefaultWarningRgba(colBack);

     
    if (!rgbIsNaN(colBack))
    {
        const hclBack = rgb2hclok(colBack);

        const hclBack1 = [...hclBack];
        const hclBack2 = [...hclBack];

        hclBack1[0] += 1/12;  if (hclBack1[0] > 1) hclBack1[0] -= 1;
        hclBack2[0] -= 1/12;  if (hclBack2[0] < 0) hclBack2[0] += 1;


        const altBack1 = rgb_a(clampRgb(hclok2rgb(hclBack1)), 0.35);
        const altBack2 = rgb_a(clampRgb(hclok2rgb(hclBack2)), 0.35);

        const factor   = getWarningFactor(colBack);

        const colWarn1 = rgbaLerp(colWarning, altBack1, factor);
        const colWarn2 = rgbaLerp(colWarning, altBack2, factor);
        
        warnStyle1     = rgba2style(colWarn1);
        warnStyle2     = rgba2style(colWarn2);
    }
    else
    {
        warnStyle1 = rgba2style(colWarning);
        warnStyle2 = rgba2style(colWarning);
    }


    return [warnStyle1, 
            warnStyle2];
}



function getWarningGradient(i, style1, style2)
{
    return 'repeating-linear-gradient('
            + '-45deg, '
            + 'transparent 0 ' + i   + 'px,' 
            +  style1 + ' '    + i   + 'px ' + i*2 +'px,'
            + 'transparent '   + i*2 + 'px ' + i*3 +'px,'
            +  style2 + ' '    + i*3 + 'px ' + i*4 +'px)';
}



function getWarningFactor(colBack)
{
    let dr, dg, db;

    if (colBack[0] < 0) dr = -colBack[0]; else if (colBack[0] > 1) dr = colBack[0] - 1; else dr = 0;
    if (colBack[1] < 0) dg = -colBack[1]; else if (colBack[1] > 1) dg = colBack[1] - 1; else dg = 0;
    if (colBack[2] < 0) db = -colBack[2]; else if (colBack[2] > 1) db = colBack[2] - 1; else db = 0;
    
    const d   = [dr, dg, db].sort()[1];
    const avg = (dr + dg + db) / 3;

    const factor = Math.min((d + avg) / 2, 1);

    // if (this.id == 'color')
    // {
    //     console.log('colBack =', colBack);
    //     console.log('dr     =', dr);
    //     console.log('dg     =', dg);
    //     console.log('db     =', db);
    //     console.log('d      =', d);
    //     console.log('avg    =', avg);
    //     console.log('factor =', factor);
    //     console.log('');
    // }

    return factor;
}



function getStripeBackColor(rgbBack)
{
    let rgbStripeBack = [...rgbBack];
        
    const factor = getWarningFactor(rgbBack);

    if (factor > 0)
    {
        const hcl = rgb2hclok(clampRgb(rgbBack));
        hcl[1] /= 2;
        

        rgbStripeBack = rgbLerp(rgbBack, clipChroma(hclok2rgb(hcl)), factor);
    }

    return rgbStripeBack;
}



function getDefaultWarningStyle(rgba)
{
    return !rgbaIsNaN(rgba)
         ? (isDark(rgba)  ? '#ffffff29' : '#00000022')
         : (darkMode ? '#ffffff08' : '#00000006'); 
}



function clampRgb(_rgb)
{
    const rgb = [..._rgb];

    rgb[0] = Math.min(Math.max(0, rgb[0]), 1);   
    rgb[1] = Math.min(Math.max(0, rgb[1]), 1);   
    rgb[2] = Math.min(Math.max(0, rgb[2]), 1); 

    return rgb;
}



function clampChan(val)
{
    return Math.min(Math.max(0, val), 1);
}



function setChan(_col, chan, val)
{
    const col = [..._col];
    col[chan] = val;
    return col;
}



function clipChroma(rgb)
{
    let hcl = rgb2hclok(rgb);

    let loopProtect = 10000;

    while (!rgbIsValid(hclok2rgb(hcl))
         && hcl[1] > 0.001
         && loopProtect-- > 0)
        hcl[1] -= 0.001;

    rgb = hclok2rgb(hcl);

    rgb[0] = Math.min(Math.max(0, rgb[0]), 1);   
    rgb[1] = Math.min(Math.max(0, rgb[1]), 1);   
    rgb[2] = Math.min(Math.max(0, rgb[2]), 1); 

    return rgb;
}



function noColorStyle(rgba)
{
    if (!rgbaIsNaN(rgba))
        return 'transparent';
    else
    {
        return darkMode
            ? 'rgba(56, 56, 56, 0.95)'
            : 'rgba(255, 255, 255, 0.95)';
    }
}



function getColorName(rgb)
{
    if (rgb.length > 3 && rgba[3] == 0)
        return 'transparent';


    const hsl = rgb2hsl(rgb);

    let   hue = hsl[0] * 360;

    while (hue >= 360) hue -= 360;
    while (hue <    0) hue += 360;
    
    const sat = hsl[1];
    const lit = hsl[2];


         if (lit >= 0.94) return 'white';
    else if (lit <  0.06) return 'black';


    let strHue = '';
    let strSat = '';
    let strLit = '';


         if (lit >= 0.81 && lit < 0.94) strLit = 'pale ';
    else if (lit >= 0.69 && lit < 0.81) strLit = 'light ';
    else if (lit >= 0.56 && lit < 0.69) strLit = 'bright ';
    else if (lit >= 0.31 && lit < 0.44) strLit = 'deep ';
    else if (lit >= 0.19 && lit < 0.31) strLit = 'dim ';
    else if (lit >= 0.06 && lit < 0.19) strLit = 'dark ';
    

    if (lit > 0.25 && lit < 0.75) 
    {
             if (sat >= 0.62 && sat < 0.88) strSat = 'calm ';
        else if (sat >= 0.31 && sat < 0.62) strSat = 'dull ';
        else if (sat >= 0.12 && sat < 0.31) strSat = 'dirty ';
    }


    if (sat >= 0.12)
    {
             if (hue < 293 && hue >= 278) strHue = 'violet';
        else if (hue < 278 && hue >= 259) strHue = 'purple';
        else if (hue < 259 && hue >= 248) strHue = 'indigo';
        else if (hue < 248 && hue >= 233) strHue = 'blue';
        else if (hue < 233 && hue >= 214) strHue = 'cobalt';
        else if (hue < 214 && hue >= 206) strHue = 'ocean';
        else if (hue < 206 && hue >= 194) strHue = 'sky';
        else if (hue < 194 && hue >= 185) strHue = 'aqua';
        else if (hue < 185 && hue >= 169) strHue = 'cyan';
        else if (hue < 169 && hue >= 139) strHue = 'jade';
        else if (hue < 139 && hue >=  86) strHue = 'green';
        else if (hue <  86 && hue >=  63) strHue = 'lime';
        else if (hue <  63 && hue >=  48) strHue = 'yellow';
        else if (hue <  48 && hue >=  45) strHue = 'gold';
        else if (hue <  45 && hue >=  35) strHue = 'mango';
        else if (hue <  35 && hue >=  26) strHue = 'orange';
        else if (hue <  26 && hue >=  18) strHue = 'amber';
        else if (hue <  18 && hue >=   7) strHue = 'salmon';
        else if (hue <   7 || hue >= 344) strHue = 'red';
        else if (hue < 344 && hue >= 328) strHue = 'rose';
        else if (hue < 328 && hue >= 293) strHue = 'magenta';
        else assert(false);
    }
    else 
        strHue = 'gray';


    return strLit + strSat + strHue;
}
