//////////// WARNING ////////////
//                             //
//  DO NOT TOUCH THIS FILE!!!  //
//                             //
/////////////////////////////////


const NUMBER_VALUE       = 'N';     // value (s) (with significant decimals)

const NUMBER             = 'NUM';   // N | n
const NUMBER_MINMAX      = 'MNMX';  // N:min N:max
const NUMBER_ADD         = 'ADD';   // count N...
const NUMBER_SUBTRACT    = 'SUB';   // count N...
const NUMBER_MULTIPLY    = 'MUL';   // count N...
const NUMBER_DIVIDE      = 'DIV';   // count N...
const NUMBER_MODULO      = 'MOD';   // count N...
const NUMBER_EXPONENT    = 'EXP';   // count N...
const NUMBER_MATH        = 'MATH';  // op count N...
const NUMBER_INTERPOLATE = 'LERP';  // count N... N:amount


const COLOR              = 'COL';   // C | N:space N:c1 N:c2 N:c3
const COLOR_INTERPOLATE  = 'CLERP'; // C C N:amount
const COLOR_VALIDATE     = 'CVLD';  // C
const COLOR_CONTRAST     = 'CCNT';  // C:text C:background
const COLORBLIND         = 'BLND';  // C


const STRING_VALUE       = 'S';     // "..." (s) (escape \\ and \")

const STRING             = 'STR';   // S | s
const STRING_ADD         = 'SADD';  // S S
const STRING_REPLACE     = 'SREPL'; // S S:what S:with


const RECTANGLE          = 'RECT';  // N:x N:y N:width N:height N:angle N:roundTL N:roundTR N:roundBL N:roundBR
const LINE               = 'LINE';  // N:x N:y N:width N:height N:angle
const ELLIPSE            = 'ELPS';  // N:x N:y N:width N:height N:angle
const POLYGON            = 'POLY';  // N:x N:y N:width N:height N:angle N:corners
const STAR               = 'STAR';  // N:x N:y N:width N:height N:angle N:points N:convex


const GROUP              = 'GRP';   // ???? count O...


const COMMENT            = 'CMNT';


const ACTIVE             = 'ACT';
const PARAM              = 'PARAM'; // nodeId paramIndex


/*

ARROW       A
COLOR       C
ELLIPSE     E
FRAME       F
GROUP       G
IMAGE       I
LIST        L
NUMBER      N
POLYGON     P
RECTANGLE   R
SLICE       /
STAR        *
STRING      S
TEXT        T
VECTOR      V

*/