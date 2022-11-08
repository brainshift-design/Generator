const INVALID             = '?';
const DISPLAY_INVALID     = INVALID;//'🤷‍♂️';


const NUMBER_VALUE        = 'N';     // value (s) (with significant decimals)

const NUMBER              = 'NUM';   // N | n
const NUMBER_LIMITS       = 'LIM';   // N:min N:max
const NUMBER_RANDOM       = 'RAND';  // N:seed N:scale N:min N:max
const NUMBER_MATH         = 'MATH';  // op count N...
const NUMBER_ADD          = 'ADD';   // count N...
const NUMBER_SUBTRACT     = 'SUB';   // count N...
const NUMBER_MULTIPLY     = 'MUL';   // count N...
const NUMBER_DIVIDE       = 'DIV';   // count N...
const NUMBER_MODULO       = 'MOD';   // count N...
const NUMBER_EXPONENT     = 'EXP';   // count N...
const NUMBER_INTERPOLATE  = 'LERP';  // count N... N:amount


const NUMBER_TYPES =
[
    NUMBER_VALUE,

    NUMBER,
    NUMBER_LIMITS,
    NUMBER_RANDOM,
    NUMBER_MATH,
    NUMBER_ADD,
    NUMBER_SUBTRACT,
    NUMBER_MULTIPLY,
    NUMBER_DIVIDE,
    NUMBER_MODULO,
    NUMBER_EXPONENT,
    NUMBER_INTERPOLATE 
];


const MATH_OPS = 
[   // the order is important for logical keyboard value changes
    [NUMBER_SUBTRACT, '-' ],
    [NUMBER_ADD,      '+' ],
    [NUMBER_DIVIDE,   '÷' ],
    [NUMBER_MULTIPLY, '×' ],
    [NUMBER_MODULO,   '%' ],
    [NUMBER_EXPONENT, 'eˣ'] 
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


const FILL_VALUE = 'FL';
const FILL       = 'FILL';

const FILL_TYPES =
[
    FILL_VALUE,
    FILL
];


const STROKE_VALUE    = 'SK';
const STROKE          = 'STRK';

const STROKE_TYPES =
[
    STROKE_VALUE,
    STROKE
];


const COLOR_STOP_VALUE    = 'CS';
const COLOR_STOP          = 'CSTOP';

const GRADIENT_VALUE      = 'GR';
const GRADIENT            = 'GRAD';

const GRADIENT_TYPES =
[
    GRADIENT_VALUE,
    GRADIENT
];


const PROPERTY_TYPES =
[
    ...FILL_TYPES,
    ...STROKE_TYPES,
    ...GRADIENT_TYPES
    // ...STYLE_TYPES will also be here
];


const SHAPE_VALUE      = 'SHP';  // abstract placeholder


const RECTANGLE_VALUE  = 'R';
const RECTANGLE        = 'RECT'; // N:x N:y N:width N:height N:angle N:roundTL N:roundTR N:roundBL N:roundBR
const RECTANGLE_TYPES  = [RECTANGLE_VALUE, RECTANGLE];

const LINE_VALUE       = 'L';
const LINE             = 'LINE'; // N:x N:y N:width N:height N:angle
const LINE_TYPES       = [LINE_VALUE, LINE];

const ELLIPSE_VALUE    = 'E';
const ELLIPSE          = 'ELPS'; // N:x N:y N:width N:height N:angle
const ELLIPSE_TYPES    = [ELLIPSE_VALUE, ELLIPSE];

const POLYGON_VALUE    = 'P';
const POLYGON          = 'POLY'; // N:x N:y N:width N:height N:angle N:corners
const POLYGON_TYPES    = [POLYGON_VALUE, POLYGON];

const STAR_VALUE       = 'ST';
const STAR             = 'STAR'; // N:x N:y N:width N:height N:angle N:points N:convex
const STAR_TYPES       = [STAR_VALUE, STAR];


const SHAPE_VALUES =
[
    SHAPE_VALUE,

    RECTANGLE_VALUE,
    LINE_VALUE,
    ELLIPSE_VALUE,
    POLYGON_VALUE,
    STAR_VALUE
];


const SHAPE_TYPES =
[
    ...SHAPE_VALUES,

    RECTANGLE,
    LINE,
    ELLIPSE,
    POLYGON,
    STAR//,
    //TEXT
];


const OBJECT_TYPES = // because they produce or modify objects
[
    ...SHAPE_TYPES,
    ...PROPERTY_TYPES
];


const GROUP            = 'GRP';   // ???? count O...


const COMMENT          = 'CMNT';


const ACTIVE           = 'ACT';
const BEFORE_ACTIVE    = 'BEF';
const DISABLED         = 'DIS';
const PARAM            = 'PARAM'; // nodeId paramId


const LOG              = 'LOG';



/*

FRAME       F
IMAGE       I
SLICE       /
TEXT        T
VECTOR      V

*/