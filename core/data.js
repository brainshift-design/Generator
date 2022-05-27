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
            return active 
                 ? rgbActiveObject 
                 : rgbObject;
    }

    return 'magenta';
}



// function dataFromNumber(num, dec = -1)
// {
//     return {
//         type:     NUMBER,
//         value:    floorTo(num, dec),
//         decimals: dec
//     };
// }



// function dataFromDataColor(color)
// {
//     return {
//         type:   'color',
//         color:   color,
//         isValid: isRgbValid(dataColor2rgb(color))
//     };
// }



// function dataFromRectangle(x, y, width, height, angle, round)//, nodeId, nodeType)
// {
//     return {
//         type: 'object',

//         //nodeId: nodeId,
//         //nodeType: nodeType,

//         x:      x,
//         y:      y,
//         width:  width,
//         height: height,
//         angle:  angle,
//         round:  round
//         //color: color
//     };
// }



function isDataColorNaN(color)
{
    return isNaN(color[1])
        || isNaN(color[2])
        || isNaN(color[3]);
}