function rgbHeaderFromType(type, active)
{
    if (FLOW_TYPES.includes(type))
        return active 
        ? (isDarkMode() ? rgbActiveFlowDark : rgbActiveFlowLight)
        : (isDarkMode() ? rgbFlowDark       : rgbFlowLight      );

    if (NUMBER_TYPES.includes(type))
        return active 
        ? (isDarkMode() ? rgbActiveNumberDark : rgbActiveNumberLight)
        : (isDarkMode() ? rgbNumberDark       : rgbNumberLight      );

    if (STRING_TYPES.includes(type))
        return active 
        ? (isDarkMode() ? rgbActiveStringDark : rgbActiveStringLight)
        : (isDarkMode() ? rgbStringDark       : rgbStringLight      );

    if (SHAPE_TYPES.includes(type))
        return active 
        ? (isDarkMode() ? rgbActiveShapeDark : rgbActiveShapeLight)
        : (isDarkMode() ? rgbShapeDark       : rgbShapeLight      );

    if (type == COLOR_STYLE)//COLOR_STYLE_TYPES.includes(type))
        return active 
        ? (isDarkMode() ? rgbActiveFlowDark : rgbActiveFlowLight)
        : (isDarkMode() ? rgbFlowDark       : rgbFlowLight      );

        
    switch (type)
    {
        case COLOR_VALUE:           

        case COLOR:           
        case COLOR_INTERPOLATE:
        case COLOR_CORRECT:
        case COLOR_CONTRAST:
        case COLORBLIND:
            return active 
                 ? rgbActiveColor  
                 : rgbColor;
    }

    return 'magenta';
}



function isDataColorNaN(color)
{
    return isNaN(color[1])
        || isNaN(color[2])
        || isNaN(color[3]);
}