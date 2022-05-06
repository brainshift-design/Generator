//////////// WARNING ////////////
//                             //
//  DO NOT TOUCH THIS FILE!!!  //
//                             //
/////////////////////////////////


const NUMBER_VALUE       = 'NVAL';  // value (s) (with significant decimals)

const NUMBER             = 'NUM';   // N | n
const NUMBER_MINMAX      = 'MNMX';  // N:min N:max
const NUMBER_ADD         = 'ADD';   // count N...
const NUMBER_SUBTRACT    = 'SUB';   // count N...
const NUMBER_MULTIPLY    = 'MUL';   // count N...
const NUMBER_DIVIDE      = 'DIV';   // count N...
const NUMBER_MODULO      = 'MOD';   // count N...
const NUMBER_POWER       = 'POW';   // count N...
const NUMBER_INTERPOLATE = 'LERP';  // N N N:amount


const COLOR_VALUE        = 'CVAL';  // N:space N:1 N:2 N:3 (c)

const COLOR              = 'CLR';   // C | c
const COLOR_INTERPOLATE  = 'CLERP'; // C C N:amount
const COLOR_VALIDATE     = 'CVLD';  // C
const COLOR_CONTRAST     = 'CCNT';  // C:text C:background
const COLORBLIND         = 'BLND';  // C


const STRING_VALUE       = 'SVAL';  // "..." (s) (escape \\ and \")

const STRING             = 'STR';   // S | s
const STRING_ADD         = 'SADD';  // S S
const STRING_REPLACE     = 'SREPL'; // S S:what S:with


const RECTANGLE          = 'RECT';  // N:x N:y N:width N:height N:angle N:roundTL N:roundTR N:roundBL N:roundBR
const ELLIPSE            = 'ELPS';  // N:x N:y N:width N:height N:angle

const GROUP              = 'GRP';   // ???? count O...