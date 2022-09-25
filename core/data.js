function rgbHeaderFromType(type, active)
{
    switch (type)
    {
        case NUMBER_VALUE:    
        case NUMBER:    
        case NUMBER_LIMITS:
        case NUMBER_ADD:
        case NUMBER_SUBTRACT:
        case NUMBER_MULTIPLY:
        case NUMBER_DIVIDE:
        case NUMBER_MODULO:
        case NUMBER_EXPONENT:
        case NUMBER_INTERPOLATE: 
            return active 
                ? (isDarkMode() ? rgbActiveNumberDark : rgbActiveNumberLight)
                : (isDarkMode() ? rgbNumberDark       : rgbNumberLight      );

        case COLOR_VALUE:           

        case COLOR:           
        case COLOR_INTERPOLATE:
        case COLOR_VALIDATE:
        case COLOR_CONTRAST:
        case COLORBLIND:
            return active 
                 ? rgbActiveColor  
                 : rgbColor;

        case SHAPE_VALUE:
        case RECTANGLE_VALUE: 
        case LINE_VALUE: 
        case ELLIPSE_VALUE: 
        case POLYGON_VALUE: 
        case STAR_VALUE: 
        
        case RECTANGLE: 
        case LINE: 
        case ELLIPSE: 
        case POLYGON: 
        case STAR: 
        
        case FILL_VALUE:
        case STROKE_VALUE:
            
        case FILL:
        case STROKE:
            return active 
                ? (isDarkMode() ? rgbActiveObjectDark : rgbActiveObjectLight)
                : (isDarkMode() ? rgbObjectDark       : rgbObjectLight      );
    }

    return 'magenta';
}



function isDataColorNaN(color)
{
    return isNaN(color[1])
        || isNaN(color[2])
        || isNaN(color[3]);
}