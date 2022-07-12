function rgbFromType(type, active)
{
    switch (type)
    {
        case NUMBER:    
        case NUMBER_MINMAX:
        case NUMBER_ADD:
        case NUMBER_SUBTRACT:
        case NUMBER_MULTIPLY:
        case NUMBER_DIVIDE:
        case NUMBER_MODULO:
        case NUMBER_EXPONENT:
        case NUMBER_INTERPOLATE: 
            return active 
                 ? rgbActiveNumber 
                 : rgbNumber;
        
        case COLOR:           
        case COLOR_INTERPOLATE:
        case COLOR_VALIDATE:
        case COLOR_CONTRAST:
        case COLORBLIND:
            return active 
                 ? rgbActiveColor  
                 : rgbColor;

        case RECTANGLE: 
        case ELLIPSE: 
        case POLYGON: 
        case STAR: 
            return active 
                 ? rgbActiveObject 
                 : rgbObject;
    }

    return 'magenta';
}



function isDataColorNaN(color)
{
    return isNaN(color[1])
        || isNaN(color[2])
        || isNaN(color[3]);
}