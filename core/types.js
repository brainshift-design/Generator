//////////// WARNING ////////////
//                             //
//  DO NOT TOUCH THIS FILE!!!  //
//                             //
/////////////////////////////////


// for gen requests each type is followed first by the node ID, then the params

const NUMBER             = 'num';   // N | (value decimals)
const NUMBER_MINMAX      = 'mnmx';  // N:min N:max
const NUMBER_ADD         = 'add';   // count N...
const NUMBER_SUBTRACT    = 'sub';   // count N...
const NUMBER_MULTIPLY    = 'mul';   // count N...
const NUMBER_DIVIDE      = 'div';   // count N...
const NUMBER_MODULO      = 'mod';   // count N...
const NUMBER_POWER       = 'pow';   // count N...
const NUMBER_INTERPOLATE = 'lerp';  // N N N:amount

const COLOR              = 'clr';   // C N:space N:1 N:2 N:3
const COLOR_INTERPOLATE  = 'clerp'; // C C N:amount
const COLOR_VALIDATE     = 'cvld';  // C
const COLOR_CONTRAST     = 'ccnt';  // C:text C:background
const COLORBLIND         = 'blnd';  // C

const STRING             = 'str';   // S|value
const STRING_ADD         = 'sadd';  // S S
const STRING_REPLACE     = 'srepl'; // S S:what S:with

const RECTANGLE          = 'rect';  // N:x N:y N:width N:height N:angle N:roundTL N:roundTR N:roundBL N:roundBR
const ELLIPSE            = 'elps';  // N:x N:y N:width N:height N:angle

const GROUP              = 'grp';   // ???? count O...