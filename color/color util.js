const rgb_NaN = [
    Number.NaN,
    Number.NaN,
    Number.NaN ];

const rgba_NaN = [
    Number.NaN,
    Number.NaN,
    Number.NaN,
    Number.NaN ];


const rgb_display_NaN  = [1, 0, 1];
const rgba_display_NaN = [1, 0, 1, 1];

const rgbInvalid  = [0xff, 0, 0xff];
const rgbaInvalid = [0xff, 0, 0xff, 0xff];


const dataColor_NaN = Object.freeze([
    'rgb',
    Number.NaN,
    Number.NaN,
    Number.NaN ]);


const transparent = [0, 0, 0, 0];


const TRANSPARENT_THRESHOLD_DARK  = 0.45;
const TRANSPARENT_THRESHOLD_LIGHT = 0.45;

const getTransparentThreshold = () => 
    darkMode
    ? TRANSPARENT_THRESHOLD_DARK
    : TRANSPARENT_THRESHOLD_LIGHT;


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



function xy2xyz(x, y, Y = 1) 
{
    let X = (x / y) * Y;
    let Z = ((1 - x - y) / y) * Y;
    
    let N = X + Y + Z;

    return [X / N, 
            Y / N, 
            Z / N];
}



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



function isLight(rgb, threshold = 0.71)
{
    return !isDark(rgb, threshold);
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



function maxColorDistance(col1, col2)
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
           ? (opacity < getTransparentThreshold()
              ? (darkMode    ? [1, 1, 1, 0.75] : [0, 0, 0, 0.75])
              : (isDark(rgb) ? [1, 1, 1, 0.75] : [0, 0, 0, 0.75]))
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



function addHueHsl(rgb, d, min = 0, max = Tau)
{
    const hsl = rgb2hsl(rgb);

    return hsl2rgb_(
        trimAngle(hsl[0] + d, min, max),
        hsl[1], 
        hsl[2]);
}



function addHueHclok(rgb, d, min = 0, max = Tau)
{
    const hcl = rgb2hclok(rgb);

    return hclok2rgb_(
        trimAngle(hcl[0] + d, min, max),
        hcl[1], 
        hcl[2]);
}



function addHueHclab(rgb, d, min = 0, max = Tau)
{
    const hcl = rgb2hclab(rgb);

    return hclab2rgb_(
        trimAngle(hcl[0] + d, min, max),
        hcl[1], 
        hcl[2]);
}



function addHueHcluv(rgb, d, min = 0, max = Tau)
{
    const hcl = rgb2hcluv(rgb);

    return hcluv2rgb_(
        trimAngle(hcl[0] + d, min, max),
        hcl[1], 
        hcl[2]);
}



function addHclok(rgb, hcl_chan, d)
{
    const hcl = rgb2hclok(rgb);

    if (hcl_chan == 0)
        hcl[0] = trimAngle(hcl[0] + d, 0, Tau);
    else
        hcl[hcl_chan] += d;

    return hclok2rgb(hcl);
}



function multHclok(rgb, hcl_chan, f)
{
    const hcl = rgb2hclok(rgb);

    if (hcl_chan == 0)
        hcl[0] = trimAngle(hcl[0] * f, 0, Tau);
    else
        hcl[hcl_chan] *= f;

    return hclok2rgb(hcl);
}



function rgbSaturate(rgb, l) { return multHclok(rgb, 1, l); }
function rgbLighten (rgb, l) { return multHclok(rgb, 2, l); }



function colorDistance(col1, col2)
{
    return Math.sqrt(
        sqr(col2[0] - col1[0])
      + sqr(col2[1] - col1[1])
      + sqr(col2[2] - col1[2]));
}



function deltaE(rgb1, rgb2)
{
    return deltaE00(rgb1, rgb2);
}



function deltaE76(rgb1, rgb2, _rgb2lab = rgb2oklab) 
{
    const lab1 = _rgb2lab(rgb1);
    const lab2 = _rgb2lab(rgb2);

    return colorDistance(lab1, lab2);
}



function deltaE94(rgb1, rgb2, kH = 1, kC = 1, kL = 1, _rgb2lab = rgb2oklab) 
{
    const [L1, a1, b1] = _rgb2lab(rgb1);
    const [L2, a2, b2] = _rgb2lab(rgb2);
    
    const C1 = Math.sqrt(a1*a1 + b1*b1);
    const C2 = Math.sqrt(a2*a2 + b2*b2);
    const dL = L2 - L1;
    const dC = C2 - C1;
    const da = a2 - a1;
    const db = b2 - b1;
    const dH = Math.sqrt(da*da + db*db - dC*dC);
    
    const SL = 1;
    const SC = 1 + 0.045 * C1;
    const SH = 1 + 0.015 * C1;
    
    const deltaE = Math.sqrt(
        sqr(dL / (kL * SL)) +
        sqr(dC / (kC * SC)) +
        sqr(dH / (kH * SH)));
    
    return deltaE;
}



function deltaE00(rgb1, rgb2, kH = 1, kC = 1, kL = 1, _rgb2lab = rgb2oklab)
{
    const lab1        = _rgb2lab(rgb1);
    const lab2        = _rgb2lab(rgb2);

    const L1          = lab1[0], a1 = lab1[1], b1 = lab1[2];
    const L2          = lab2[0], a2 = lab2[1], b2 = lab2[2];

    const avgLPrime   = (L1 + L2) / 2;
    const C1          = Math.sqrt(a1 * a1 + b1 * b1);
    const C2          = Math.sqrt(a2 * a2 + b2 * b2);
    const avgC        = (C1 + C2) / 2;
    const G           = 0.5 * (1 - Math.sqrt(Math.pow(avgC, 7) / (Math.pow(avgC, 7) + Math.pow(25, 7))));
    
    const a1Prime     = a1 * (1 + G);
    const a2Prime     = a2 * (1 + G);
    const C1Prime     = Math.sqrt(a1Prime * a1Prime + b1 * b1);
    const C2Prime     = Math.sqrt(a2Prime * a2Prime + b2 * b2);
    
    const h1Prime     = Math.atan2(b1, a1Prime) * (180 / Math.PI);
    const h2Prime     = Math.atan2(b2, a2Prime) * (180 / Math.PI);
    
    const deltaLPrime = L2 - L1;
    const deltaCPrime = C2Prime - C1Prime;
    const deltahPrime = 2 * Math.sqrt(C1Prime * C2Prime) * Math.sin(((h2Prime - h1Prime) / 2) * (Math.PI / 180));

    const avgCPrime = (C1Prime + C2Prime) / 2;
    const avghPrime =
        Math.abs(h1Prime - h2Prime) > 180
            ? (h1Prime + h2Prime + 360) / 2
            : (h1Prime + h2Prime) / 2;
    

    const SL = 1 + (0.015 * sqr(avgLPrime - 50)) / Math.sqrt(20 + sqr(avgLPrime - 50));
    const SC = 1 + 0.045 * avgCPrime;
    const SH = 1 + 0.015 * avgCPrime * (1 - 0.17 * Math.cos(avghPrime - 30) + 0.24 * Math.cos(2 * avghPrime) + 0.32 * Math.cos(3 * avghPrime + 6) - 0.20 * Math.cos(4 * avghPrime - 63));

    const RT = -2 * Math.sqrt(Math.pow(avgCPrime, 7) / (Math.pow(avgCPrime, 7) + Math.pow(25, 7))) * Math.sin(60 * Math.exp(-sqr((avghPrime - 275) / 25)) * (Math.PI / 180));
    
    const deltaE = Math.sqrt(
          sqr(deltaLPrime / (kL * SL)) +
          sqr(deltaCPrime / (kC * SC)) +
          sqr(deltahPrime / (kH * SH)) +
        RT * (deltaCPrime / (kC * SC)) * (deltahPrime / (kH * SH)));
    
    return deltaE;
}



function deltaECMC(rgb1, rgb2, kC = 1, kL = 2, _rgb2lab = rgb2oklab) 
{
    const [L1, a1, b1] = _rgb2lab(rgb1);
    const [L2, a2, b2] = _rgb2lab(rgb2);
    
    const C1     = Math.sqrt(a1*a1 + b1*b1);
    const C2     = Math.sqrt(a2*a2 + b2*b2);
    const deltaL = L2 - L1;
    const deltaC = C2 - C1;
    const da     = a2 - a1;
    const db     = b2 - b1;
    const deltaH = Math.sqrt(da*da + db*db - deltaC*deltaC);

    const SL     = L1 < 16 ? 0.511 : (0.040975 * L1) / (1 + 0.01765 * L1);
    const SC     = 0.0638 * C1 / (1 + 0.0131 * C1) + 0.638;
    const SH     = SC * (1 + 0.0131 * C1);

    return Math.sqrt(
          sqr(deltaL / (kL * SL))
        + sqr(deltaC / (kC * SC))
        + sqr(deltaH / SH));
}



function deltaEITU(rgb1, rgb2) 
{
    const linear1 = rgb1.map(v => sRGB.degamma(v));
    const linear2 = rgb2.map(v => sRGB.degamma(v));

    return colorDistance(linear1, linear2);
}



function isColorType(type)
{
    return COLOR_VALUES.includes(type);
}



function isColorTypeOnHeader(type, node)
{
    return isColorType(type)
        && COLOR_HEADER_TYPES.includes(node.type);
}



function rgbFromColorValue(value)
{
    consoleAssert(
         value, 
        'rgbFromColorValue() requires a valid value');


    if (    value.type == COLOR_VALUE 
        && !rgbIsNaN(value.toRgb())) 
        return value.toRgb();

    else if ( value.type == FILL_VALUE 
          && !rgbIsNaN(value.color.toRgb())) 
        return value.color.toRgb();

    else if ( value.type == STROKE_VALUE 
          &&  value.fills.items.length > 0
          && !rgbIsNaN(value.fills.items.at(-1).color.toRgb())) 
        return value.fills.items.at(-1).color.toRgb();

    else if ( value.type == GRADIENT_VALUE 
          && !rgbaIsNaN(value.toRgba())) 
        return rgb_a(value.toRgba());

    else if ( value.type == COLOR_STOP_VALUE 
          && !rgbIsNaN(value.fill.color.toRgb())) 
        return rgb_a(value.fill.color.toRgb());


    return rgb_NaN;
}



function setSvgLinearGradientStroke(svg, target, color1, color2, x1, y1, x2, y2, contrast = 0) 
{
    if (!(svg instanceof SVGElement))
        throw new Error('\'svg\' must be an SVG element');

    
    let defs = svg.querySelector('defs');

    if (!defs) 
    {
        defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
        svg.insertBefore(defs, svg.firstChild);
    }


    const existingGradients = defs.querySelectorAll('linearGradient');
    const gradientId        = `svgLinearGradient-${target.curveId}`;
    
    existingGradients.forEach(gradient => 
    {
        if (gradient.id == gradientId)
            gradient.remove();
    });


    const linearGradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');

    linearGradient.setAttribute('id', gradientId);

    linearGradient.setAttribute('x1', x1 + '%');
    linearGradient.setAttribute('y1', y1 + '%');
    linearGradient.setAttribute('x2', x2 + '%');
    linearGradient.setAttribute('y2', y2 + '%');

    
    const contrastDist = 35;

    const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop1.setAttribute('offset', '0%');
    stop1.setAttribute('stop-color', color1);

    // const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    // stop2.setAttribute('offset', roundTo(contrastDist*contrast, 2) + '%');
    // stop2.setAttribute('stop-color', color1);

    // const stop3 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    // stop3.setAttribute('offset', roundTo(100 - contrastDist*contrast, 2) + '%');
    // stop3.setAttribute('stop-color', color2);

    const stop4 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop4.setAttribute('offset', '100%');
    stop4.setAttribute('stop-color', color2);

 
    linearGradient.appendChild(stop1);
    // linearGradient.appendChild(stop2);
    // linearGradient.appendChild(stop3);
    linearGradient.appendChild(stop4);

    defs.appendChild(linearGradient);


    target.style.stroke = `url(#${gradientId})`;


    return gradientId;
}



function getChannelNamesFromSpace(space)
{
    switch (space)
    {
    case 'hex':   return ['r', 'g', 'b'];
    case 'rgb':   return ['r', 'g', 'b'];
    case 'lin':   return ['r', 'g', 'b'];
    case 'p3':    return ['r', 'g', 'b'];
    case 'a98':   return ['r', 'g', 'b'];
    case 'pro':   return ['r', 'g', 'b'];
    case 'r2020': return ['r', 'g', 'b'];
    case 'hsl':   return ['h', 's', 'l'];
    case 'hsv':   return ['h', 's', 'b'];
    case 'hclok': return ['h', 'c', 'l'];
    case 'hclab': return ['h', 'c', 'l'];
    case 'hcluv': return ['h', 'c', 'l'];
    case 'oklab': return ['l', 'a', 'b'];
    case 'lab':   return ['l', 'a', 'b'];
    case 'luv':   return ['l', 'u', 'v'];
    case 'xyz':   return ['x', 'y', 'z'];
    case 'xyz50': return ['x', 'y', 'z'];
    case 'xyz65': return ['x', 'y', 'z'];
    }

    console.error('invalid color space \'' + space + '\'');
    return ['c1', 'c2', 'c3'];
}