function rgbHeaderFromType(type, active)
{
    if (FLOW_TYPES.includes(type))
        return active 
        ? (darkMode ? rgbActiveFlowDark : rgbActiveFlowLight)
        : (darkMode ? rgbFlowDark       : rgbFlowLight      );

    if (NUMBER_TYPES.includes(type))
        return active 
        ? (darkMode ? rgbActiveNumberDark : rgbActiveNumberLight)
        : (darkMode ? rgbNumberDark       : rgbNumberLight      );

    if (STRING_TYPES.includes(type))
        return active 
        ? (darkMode ? rgbActiveStringDark : rgbActiveStringLight)
        : (darkMode ? rgbStringDark       : rgbStringLight      );

    if (SHAPE_TYPES.includes(type))
        return active 
        ? (darkMode ? rgbActiveShapeDark : rgbActiveShapeLight)
        : (darkMode ? rgbShapeDark       : rgbShapeLight      );

    if (type == COLOR_STYLE)//COLOR_STYLE_TYPES.includes(type))
        return active 
        ? (darkMode ? rgbActiveFlowDark : rgbActiveFlowLight)
        : (darkMode ? rgbFlowDark       : rgbFlowLight      );

        
    switch (type)
    {
        case COLOR_VALUE:           

        case COLOR:           
        case COLOR_INTERPOLATE:
        case CORRECT_COLOR:
        case COLOR_CONTRAST:
        case COLORBLIND:
            return active 
                 ? rgbActiveColor  
                 : rgbColor;

        case CUSTOM:
        case CUSTOM_INPUTS:
        case CUSTOM_OUTPUTS:
            return active 
                 ? (darkMode ? rgbActiveCustomDark : rgbActiveCustomLight)
                 : (darkMode ? rgbCustomDark       : rgbCustomLight      );
    }

    return 'magenta';
}



function isDataColorNaN(color)
{
    return isNaN(color[1])
        || isNaN(color[2])
        || isNaN(color[3]);
}