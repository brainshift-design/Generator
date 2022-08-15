const INVALID             = '?';
const DISPLAY_INVALID     = '🤷‍♂️';


const NUMBER_VALUE        = 'N';     // value (s) (with significant decimals)

const NUMBER              = 'NUM';   // N | n
const NUMBER_LIMITS       = 'LIM';   // N:min N:max
const NUMBER_ADD          = 'ADD';   // count N...
const NUMBER_SUBTRACT     = 'SUB';   // count N...
const NUMBER_MULTIPLY     = 'MUL';   // count N...
const NUMBER_DIVIDE       = 'DIV';   // count N...
const NUMBER_MODULO       = 'MOD';   // count N...
const NUMBER_EXPONENT     = 'EXP';   // count N...
const NUMBER_MATH         = 'MATH';  // op count N...
const NUMBER_INTERPOLATE  = 'LERP';  // count N... N:amount


const NUMBER_TYPES =
[
    NUMBER_VALUE,

    NUMBER,
    NUMBER_LIMITS,
    NUMBER_ADD,
    NUMBER_SUBTRACT,
    NUMBER_MULTIPLY,
    NUMBER_DIVIDE,
    NUMBER_MODULO,
    NUMBER_EXPONENT,
    NUMBER_MATH,
    NUMBER_INTERPOLATE 
];


const STRING_VALUE        = 'S';     // "..." (s) (escape \\ and \")

const STRING              = 'STR';   // S | s
const STRING_ADD          = 'SADD';  // S S
const STRING_REPLACE      = 'SREPL'; // S S:what S:with


const COLOR_VALUE         = 'C';     // color value

const COLOR               = 'COL';   // C | N:space N:c1 N:c2 N:c3
const COLOR_INTERPOLATE   = 'CLERP'; // C C N:amount
const COLOR_VALIDATE      = 'CVLD';  // C
const COLOR_CONTRAST      = 'CCNT';  // C:text C:background
const COLORBLIND          = 'BLND';  // C


const COLOR_TYPES =
[
    COLOR_VALUE,
    COLOR,
    COLOR_INTERPOLATE,
    COLOR_VALIDATE,
    COLORBLIND
];


const COLOR_FILL_VALUE    = 'CF'; // ???????? remove?
const COLOR_FILL          = 'CFILL';

const COLOR_FILL_TYPES =
[
    COLOR_FILL_VALUE,
    COLOR_FILL
];


const COLOR_STOP_VALUE    = 'CS';
const COLOR_STOP          = 'CSTOP';

const GRADIENT_VALUE      = 'G';
const GRADIENT            = 'GRAD';


const GEOMETRY_VALUE      = 'G0';    // abstract placeholder

const RECTANGLE_VALUE     = 'R';
const LINE_VALUE          = 'L';
const ELLIPSE_VALUE       = 'E';
const POLYGON_VALUE       = 'P';
const STAR_VALUE          = 'ST';

const RECTANGLE           = 'RECT';  // N:x N:y N:width N:height N:angle N:roundTL N:roundTR N:roundBL N:roundBR
const LINE                = 'LINE';  // N:x N:y N:width N:height N:angle
const ELLIPSE             = 'ELPS';  // N:x N:y N:width N:height N:angle
const POLYGON             = 'POLY';  // N:x N:y N:width N:height N:angle N:corners
const STAR                = 'STAR';  // N:x N:y N:width N:height N:angle N:points N:convex


const GEOMETRY_VALUES =
[
    GEOMETRY_VALUE,

    RECTANGLE_VALUE,
    LINE_VALUE,
    ELLIPSE_VALUE,
    POLYGON_VALUE,
    STAR_VALUE
];


const GEOMETRY_TYPES =
[
    ...GEOMETRY_VALUES,

    RECTANGLE,
    LINE,
    ELLIPSE,
    POLYGON,
    STAR//,
    //TEXT
];


const GROUP               = 'GRP';   // ???? count O...


const COMMENT             = 'CMNT';


const ACTIVE              = 'ACT';
const PARAM               = 'PARAM'; // nodeId paramId


/*

FRAME       F
IMAGE       I
SLICE       /
TEXT        T
VECTOR      V

*/