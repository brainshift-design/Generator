function rgbFromType(type, active)
{
    return rgbFromTypeMode(type, active, darkMode);
}



function rgbFromTypeMode(type, active, mode)
{
    if (FLOW_TYPES.includes(type))
        return active 
        ? (mode ? rgbActiveFlowDark   : rgbActiveFlowLight)
        : (mode ? rgbFlowDark         : rgbFlowLight      );

    if (NUMBER_TYPES.includes(type))
        return active 
        ? (mode ? rgbActiveNumberDark : rgbActiveNumberLight)
        : (mode ? rgbNumberDark       : rgbNumberLight      );

    if (TEXT_TYPES.includes(type))
        return active 
        ? (mode ? rgbActiveTextDark   : rgbActiveTextLight)
        : (mode ? rgbTextDark         : rgbTextLight      );

    if (type == COLOR_STYLE)
        return active 
        ? (mode ? rgbActiveFlowDark   : rgbActiveFlowLight)
        : (mode ? rgbFlowDark         : rgbFlowLight      );

    if (SHAPE_TYPES.includes(type))
        return active 
        ? (mode ? rgbActiveShapeDark  : rgbActiveShapeLight)
        : (mode ? rgbShapeDark        : rgbShapeLight      );

    if (GROUP_TYPES.includes(type))
        return active 
        ? (mode ? rgbActiveGroupDark  : rgbActiveGroupLight)
        : (mode ? rgbGroupDark        : rgbGroupLight      );

        
    switch (type)
    {
        case COLOR_VALUE:           

        case COLOR:           
        case COLOR_INTERPOLATE:
        case CORRECT_COLOR:
        case COLOR_CONTRAST:
        case COLORBLIND:
        case COLOR_BLEND:
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