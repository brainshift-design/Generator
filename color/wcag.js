function getContrastRatio2(textColor, backColor)
{
    if (    rgbIsNaN  (textColor)
        || !rgbIsValid(textColor))
        return Number.NaN;

    const txtY = sRGB.luminance(textColor);
    const  bgY = sRGB.luminance(backColor);

    return (
        bgY > txtY
        ? ( bgY + 0.05) / (txtY + 0.05)
        : (txtY + 0.05) / ( bgY + 0.05));
}



function getContrastRating2(ratio)
{
         if (ratio >= 7  ) return 'AAA';
    else if (ratio >= 4.5) return 'AA';
    else if (ratio >= 3  ) return 'AA<sub>L</sub>';
    else                   return '';
}



function getContrastRatio3(textColor, backColor)
{
    if (!rgbIsOk(textColor))
        return Number.NaN;

    return getApcaContrast(
        sRGBtoY(textColor),
        sRGBtoY(backColor));
}



// I copied the code below from https://github.com/Myndex/SAPC-APCA/blob/master/WEBTOOLS/APCA/JS/DEV.0.1.2.G_SAPCsRGB.js
// and refactored it to fit my code style.

const mainTrc     = 2.4; // 2.4 exponent emulates actual monitor perception
       
const sRco        = 0.2126729, 
      sGco        = 0.7151522, 
      sBco        = 0.0721750; // sRGB coefficients
   
const normBg      = 0.56, 
      normTxt     = 0.57,
      revTxt      = 0.62,
      revBg       = 0.65; // G-4g constants for use with 2.4 exponent
   
const blkThrs     = 0.022,
      blkClip     = 1.414, 
      scaleBoW    = 1.14,
      scaleWoB    = 1.14,
      loBoWthresh = 0.035991,
      loWoBthresh = 0.035991,
      loBoWfactor = 27.7847239587675,
      loWoBfactor = 27.7847239587675,
      loBoWoffset = 0.027,
      loWoBoffset = 0.027,
      loClip      = 0.001,
      deltaYmin   = 0.0005;



function sRGBtoY(rgb) 
{
    // NOTE this is not the actual sRGB luminance as it
    // ignores the straight section. Using actual sRGB
    // luminance gives a slightly different contrast score.

    return sRco * Math.pow(rgb[0], mainTrc) 
         + sGco * Math.pow(rgb[1], mainTrc)
         + sBco * Math.pow(rgb[2], mainTrc);
}



function getApcaContrast(txtY, bgY)
{
    let sapc           = 0; // For raw SAPC values
    let outputContrast = 0; // For weighted final values

    txtY = 
        txtY > blkThrs 
        ? txtY 
        : txtY + Math.pow(blkThrs - txtY, blkClip);
        
    bgY = 
        bgY > blkThrs 
        ? bgY 
        : bgY + Math.pow(blkThrs - bgY, blkClip);

    if (Math.abs(bgY - txtY) < deltaYmin)  
        return 0; 


    if (bgY > txtY) 
    {  
        sapc = (Math.pow(bgY, normBg) - Math.pow(txtY, normTxt)) * scaleBoW;

        outputContrast = 
            sapc < loClip 
            ? 0 
            : sapc < loBoWthresh
              ? sapc - sapc * loBoWfactor * loBoWoffset 
              : sapc - loBoWoffset;
    } 
    else 
    {  
        sapc = (Math.pow(bgY, revBg) - Math.pow(txtY, revTxt)) * scaleWoB;

        outputContrast = 
            sapc > -loClip 
            ? 0 
            : sapc > -loWoBthresh 
              ? sapc - sapc * loWoBfactor * loWoBoffset 
              : sapc + loWoBoffset;
    }


    return outputContrast * 100;
}