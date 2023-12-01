function rgbFromType(type, active)
{
    return rgbFromTypeMode(type, active, darkMode);
}



function rgbFromTypeMode(type, active, darkMode)
{
    if (NUMBER_TYPES.includes(type))
        return active 
            ? (darkMode ? rgbActiveNumberDark : rgbActiveNumberLight)
            : (darkMode ? rgbNumberDark       : rgbNumberLight      );

    else if (TEXT_TYPES.includes(type))
        return active 
            ? (darkMode ? rgbActiveTextDark   : rgbActiveTextLight)
            : (darkMode ? rgbTextDark         : rgbTextLight      );

    else if (SHAPE_TYPES.includes(type)
         || EFFECT_TYPES.includes(type))
        return active 
            ? (darkMode ? rgbActiveShapeDark  : rgbActiveShapeLight)
            : (darkMode ? rgbShapeDark        : rgbShapeLight      );

    else if (GROUP_TYPES.includes(type))
        return active 
            ? (darkMode ? rgbActiveGroupDark  : rgbActiveGroupLight)
            : (darkMode ? rgbGroupDark        : rgbGroupLight      );

    else if (FLOW_TYPES.includes(type)
          || type == ANY_VALUE)
        return active 
            ? (darkMode ? rgbActiveFlowDark   : rgbActiveFlowLight)
            : (darkMode ? rgbFlowDark         : rgbFlowLight      );

    else if (type == COLOR_STYLE)
        return active 
            ? (darkMode ? rgbActiveFlowDark   : rgbActiveFlowLight)
            : (darkMode ? rgbFlowDark         : rgbFlowLight      );


    switch (type)
    {
        case COLOR_VALUE:      
        case FILL_VALUE:
        case STROKE_VALUE:
        case COLOR_STOP_VALUE:
        case GRADIENT_VALUE:

        case COLOR:           
        case COLOR_INTERPOLATE:
        case CORRECT_COLOR:
        case COLOR_CONTRAST:
        case COLORBLIND:
        case COLOR_BLEND:

        case COLOR_STOP:
        case GRADIENT:

            return darkMode 
                 ? rgbFlowDark         
                 : rgbFlowLight;

            // return active 
            //     ? (mode ? rgbActiveFlowDark : rgbActiveFlowLight)
            //     : (mode ? rgbFlowDark       : rgbFlowLight      );
    }

    
    // return [0xff, 0, 0xff];
    return darkMode 
         ? rgbFlowDark         
         : rgbFlowLight;
}



function isDataColorNaN(color)
{
    return isNaN(color[1])
        || isNaN(color[2])
        || isNaN(color[3]);
}