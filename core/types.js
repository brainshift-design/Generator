//////////// WARNING ////////////
//                             //
//  DO NOT TOUCH THIS FILE!!!  //
//                             //
/////////////////////////////////



// data types

const DATA_NUMBER    = 'num';
const DATA_COLOR     = 'col';
const DATA_STRING    = 'str';
const DATA_RECTANGLE = 'rect';
const DATA_LINE      = 'line';
const DATA_ELLIPSE   = 'elps';
const DATA_POLYGON   = 'poly';
const DATA_STAR      = 'star';
const DATA_VECTOR    = 'vec';
const DATA_BOOLEAN   = 'bool';
const DATA_TEXT      = 'txt';
const DATA_GROUP     = 'grp';
const DATA_FRAME     = 'frm';
const DATA_SLICE     = 'slc';



function dataTypeIsShape(dataType)
{
    return dataType == DATA_RECTANGLE
        || dataType == DATA_LINE
        || dataType == DATA_ELLIPSE
        || dataType == DATA_POLYGON
        || dataType == DATA_STAR
        || dataType == DATA_VECTOR
        || dataType == DATA_BOOLEAN
        || dataType == DATA_TEXT;
}



// node types

const NODE_NUMBER             = 'number';
const NODE_NUMBER_MINMAX      = 'number_minmax';
const NODE_NUMBER_ADD         = 'number_add';
const NODE_NUMBER_SUBTRACT    = 'number_subtract';
const NODE_NUMBER_MULTIPLY    = 'number_multiply';
const NODE_NUMBER_DIVIDE      = 'number_divide';
const NODE_NUMBER_MODULO      = 'number_modulo';
const NODE_NUMBER_POWER       = 'number_power';
const NODE_NUMBER_INTERPOLATE = 'number_interpolate';

const NODE_COLOR              = 'color';
const NODE_COLOR_INTERPOLATE  = 'color_interpolate';
const NODE_COLOR_VALIDATE     = 'color_validate';
const NODE_COLOR_CONTRAST     = 'color_contrast';
const NODE_COLOR_BLIND        = 'color_blind';

const NODE_STRING             = 'string';
const NODE_STRING_ADD         = 'string_add';
const NODE_STRING_REPLACE     = 'string_replace';

const NODE_GEOMETRY_RECTANGLE = 'geometry_rectangle';
const NODE_GEOMETRY_ELLIPSE   = 'geometry_ellipse';

const NODE_GROUP              = 'group';



function getShortNodeName(nodeType)
{
    switch (nodeType)
    {
        case NODE_NUMBER:             return 'num';
        case NODE_NUMBER_SUBTRACT:    
        case NODE_NUMBER_MULTIPLY:    
        case NODE_NUMBER_DIVIDE:      
        case NODE_NUMBER_MODULO:      
        case NODE_NUMBER_POWER:       return extractShortNodeName(nodeType, 1, 3);
        case NODE_NUMBER_INTERPOLATE: 
        case NODE_COLOR_INTERPOLATE:  return 'inter';
        case NODE_NUMBER_MINMAX:      
        case NODE_COLOR_CONTRAST:     return extractShortNodeName(nodeType, 2);
        case NODE_COLOR_VALIDATE:     
        case NODE_COLOR_BLIND:        return 'colorblind';

        default:                      return extractShortNodeName(nodeType);
    }
}



function extractShortNodeName(nodeType, iPart = -1, nChars = -1)
{
    const parts = nodeType.split('_');

    if (   iPart  < 0 
        && nChars < 0)
        return nodeType.substring(parts[0].length);
    
    return nChars > -1
         ? parts[iPart].substring(0, nChars)
         : parts[iPart];
}