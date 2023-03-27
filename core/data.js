function rgbHeaderFromType(type, active)
{
    if (FLOW_TYPES.includes(type))
        return active 
        ? (darkMode ? rgbActiveFlowDark   : rgbActiveFlowLight)
        : (darkMode ? rgbFlowDark         : rgbFlowLight      );

    if (NUMBER_TYPES.includes(type))
        return active 
        ? (darkMode ? rgbActiveNumberDark : rgbActiveNumberLight)
        : (darkMode ? rgbNumberDark       : rgbNumberLight      );

    if (TEXT_TYPES.includes(type))
        return active 
        ? (darkMode ? rgbActiveTextDark   : rgbActiveTextLight)
        : (darkMode ? rgbTextDark         : rgbTextLight      );

    if (type == COLOR_STYLE)
        return active 
        ? (darkMode ? rgbActiveFlowDark   : rgbActiveFlowLight)
        : (darkMode ? rgbFlowDark         : rgbFlowLight      );

    if (SHAPE_TYPES.includes(type))
        return active 
        ? (darkMode ? rgbActiveShapeDark  : rgbActiveShapeLight)
        : (darkMode ? rgbShapeDark        : rgbShapeLight      );

        
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

        case NODE_GROUP:
        case NODE_INPUTS:
        case NODE_OUTPUTS:
            return active 
                 ? (darkMode ? rgbActiveFlowDark : rgbActiveFlowLight)
                 : (darkMode ? rgbFlowDark       : rgbFlowLight      );
    }

    return 'magenta';
}



function isDataColorNaN(color)
{
    return isNaN(color[1])
        || isNaN(color[2])
        || isNaN(color[3]);
}