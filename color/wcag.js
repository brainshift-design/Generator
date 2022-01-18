function getContrastRatio2(textColor)
{
    if (!isValidRgb(textColor))
        return Number.NaN;

    const yBack = sRGB.luminance(contrastBackColor);
    const yTxt  = sRGB.luminance(textColor);

    return (
        yBack > yTxt
        ? (yBack + 0.05) / (yTxt  + 0.05)
        : (yTxt  + 0.05) / (yBack + 0.05));
}



//// WCAG 2 rating

//     if (cr >= 7  ) rating = '&nbsp;&nbsp;AAA';
//else if (cr >= 4.5) rating = '&nbsp;&nbsp;AA';
//else if (cr >= 3  ) rating = '&nbsp;&nbsp;AA<sub>L</sub>';

////////////



function getContrastRatio3(textColor)
{
    if (!isValidRgb(textColor))
        return Number.NaN;

    return APCAcontrast(
        sRGB.luminance(textColor),
        sRGB.luminance(contrastBackColor));
        // sRGBtoY(textColor),
        // sRGBtoY(contrastBackColor));
}



// I copied the code below from https://stackoverflow.com/questions/66567403/how-do-you-find-the-color-contrast-using-apca-advanced-perpetual-contrast-algor.
// It's almost verbatim, I only reformatted it a tiny bit to better fit my code style.



///////////////////////////////////////////////////////////////////////////////
/////
/////    APCA - Advanced Perceptual Contrast Algorithm - Beta 0.98G-4g
/////     
/////    Function to parse color values and determine SAPC/APCA contrast
/////    Copyright © 2019-2021 by Andrew Somers. All Rights Reserved.
/////    LICENSE: APCA version to be licensed under W3 cooperative agrmnt.
/////    CONTACT: For SAPC/APCA Please use the ISSUES tab at:
/////    https://github.com/Myndex/SAPC-APCA/
/////
///////////////////////////////////////////////////////////////////////////////
/////
/////    USAGE:
/////        Use sRGBtoY(color) to convert sRGB to Luminance (Y)
/////        Then send Y-text and Y-background to APCAcontrast(Text, BG)
/////
/////    Lc = APCAcontrast( sRGBtoY(TEXTcolor) , sRGBtoY(BACKGNDcolor) );
/////
/////    Live Demonstrator at https://www.myndex.com/APCA/
/////
///////////////////////////////////////////////////////////////////////////////



//////////   APCA G - 4g Constants   //////////////////////////////////////


const mainTRC     = 2.4; // 2.4 exponent emulates actual monitor perception
       
const sRco        = 0.2126729, 
      sGco        = 0.7151522, 
      sBco        = 0.0721750; // sRGB coefficients
   
const normBG      = 0.56, 
      normTXT     = 0.57,
      revTXT      = 0.62,
      revBG       = 0.65;  // G-4g constants for use with 2.4 exponent
   
const blkThrs     = 0.022,
      blkClmp     = 1.414, 
      scaleBoW    = 1.14,
      scaleWoB    = 1.14,
      loBoWthresh = 
      loWoBthresh = 0.035991,
      loBoWfactor = 
      loWoBfactor = 27.7847239587675,
      loBoWoffset = 
      loWoBoffset = 0.027,
      loClip      = 0.001,
      deltaYmin   = 0.0005;



////////// ƒ sRGBtoY()   ///////////////////////////////////////////////

// function sRGBtoY(rgb) 
// {
//     // linearize r, g, or b then apply coefficients
//     // and sum then return the resulting luminance
    
//     return sRco * Math.pow(rgb[0], mainTRC) 
//          + sGco * Math.pow(rgb[1], mainTRC)
//          + sBco * Math.pow(rgb[2], mainTRC);
// }



////////// ƒ APCAcontrast()   //////////////////////////////////////////

function APCAcontrast(txtY, bgY) 
{
    // send linear Y (luminance) for text and background.
    // IMPORTANT: Do not swap, polarity is important.
        
    let SAPC           = 0; // For raw SAPC values
    let outputContrast = 0; // For weighted final values
    
    // TUTORIAL
    
    // Use Y for text and BG, and soft clamp black,
    // return 0 for very close luminances, determine
    // polarity, and calculate SAPC raw contrast
    // Then scale for easy to remember levels.
  
    // Note that reverse contrast (white text on black)
    // intentionally returns a negative number
    // Proper polarity is important!
 
//////////   BLACK SOFT CLAMP   ///////////////////////////////////////////

    // Soft clamps Y for either color if it is near black.
    txtY = 
        txtY > blkThrs 
        ? txtY 
        : txtY + Math.pow(blkThrs - txtY, blkClmp);
        
    bgY = 
        bgY > blkThrs 
        ? bgY 
        : bgY + Math.pow(blkThrs - bgY, blkClmp);

    ///// Return 0 Early for extremely low ∆Y
    if (Math.abs(bgY - txtY) < deltaYmin)  
        return 0; 


//////////   APCA/SAPC CONTRAST   /////////////////////////////////////////

    if (bgY > txtY) 
    {  
        // For normal polarity, black text on white (BoW)

        // Calculate the SAPC contrast value and scale
      
        SAPC = (Math.pow(bgY, normBG) - Math.pow(txtY, normTXT)) * scaleBoW;

        // Low Contrast smooth rollout to prevent polarity reversal
        // and also a low-clip for very low contrasts
        outputContrast = 
            SAPC < loClip 
            ? 0 
            : (SAPC < loBoWthresh
               ? SAPC - SAPC * loBoWfactor * loBoWoffset 
               : SAPC - loBoWoffset);

    } 
    else 
    {  
        // For reverse polarity, light text on dark (WoB)
        // WoB should always return negative value.

        SAPC = (Math.pow(bgY, revBG) - Math.pow(txtY, revTXT)) * scaleWoB;

        outputContrast = 
            SAPC > -loClip 
            ? 0 
            : (SAPC > -loWoBthresh 
               ? SAPC - SAPC * loWoBfactor * loWoBoffset 
               : SAPC + loWoBoffset);
    }

    // return Lc (lightness contrast) as a signed numeric value 
    // It is permissible to round to the nearest whole number.
       
    return outputContrast * 100;
}



////////////////////////////////////////////////////////////////////////////////
/////
/////                 SAPC Method and APCA Algorithm
/////
/////   Thanks To: 
/////   • This project references the research and work of Dr.Legge, Dr.Arditi,
/////     Dr.Lovie-Kitchin, M.Fairchild, R.Hunt, M.Stone, Dr.Poynton, L.Arend, &
/////     many others — see refs at https://www.myndex.com/WEB/WCAG_CE17polarity
/////   • Stoyan Stefanov for his input parsing idea, Twitter @stoyanstefanov
/////   • Bruce Bailey of USAccessBoard for his encouragement, ideas, & feedback
/////   • Chris Loiselle of Oracle for getting us back on track in a pandemic
/////
////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////
/////
/////   *****  SAPC BLOCK  *****
/////
/////   For Evaluations, this is referred to as: SAPC-8, 0.98 G-series constants
/////                S-LUV Advanced Perceptual Contrast
/////   Copyright © 2019-2021 by Andrew Somers. All Rights Reserved.
/////   SIMPLE VERSION — Only the basic APCA contrast predictor.
/////
/////   Included Extensions & Model Features in this file:
/////       • SAPC-8 Core Contrast (Base APCA) 
/////       • G series constants, group "G-4g" using a 2.4 monitor exponent
/////       • sRGB to Y, parses numeric sRGB color to luminance
/////       • SmoothScale™ scaling technique (non-clinical use only)
/////       • SoftToe black level soft clamp and flare compensation.
/////
/////
////////////////////////////////////////////////////////////////////////////////
/////
/////                DISCLAIMER AND LIMITATIONS OF USE
/////     APCA is an embodiment of certain suprathreshold contrast
/////     prediction technologies and it is licensed to the W3 on a
/////     limited basis for use in certain specific accessibility
/////     guidelines for web content only. APCA may be used for 
/////     predicting colors for web content use without royalty.
/////
/////     However, Any such license excludes other use cases
/////     not related to web content. Prohibited uses include
/////     medical, clinical evaluation, human safety related,
/////     aerospace, transportation, military applications, 
/////     and uses which are not specific to web based content
/////     presented on self-illuminated displays or devices.
/////
/////
////////////////////////////////////////////////////////////////////////////////