const NAN_CHAR            = '-';
const NAN_DISPLAY         = '–';

const UNKNOWN_CHAR        = '?';
const UNKNOWN_DISPLAY     = UNKNOWN_CHAR;//'🤷‍♂️';


const LIST_VALUE          = 'LIST#';
const LIST                = 'LIST';

const ITEMS               = 'ITEMS';

const START               = 'STRT';
const REPEAT              = 'REPT';

const CACHE               = 'CACHE';


const LIST_TYPES =
[
    LIST_VALUE,
    LIST,
    ITEMS,
    REPEAT
];


const FOREACH             = 'FOR';


const FLOW_TYPES =
[
    ...LIST_TYPES,
    ITEMS,
    START,
    REPEAT,
    FOREACH,
    CACHE
];


const NUMBER_VALUE        = 'NUM#';  
const NUMBER              = 'NUM';   
const NUMBER_ROUND        = 'ROUND';   
const NUMBER_LIMITS       = 'LIM';   
const NUMBER_SERIES       = 'SER';  
const NUMBER_RANDOM       = 'RAND';  
const NUMBER_INTERPOLATE  = 'LERP';  
 
const NUMBER_MATH         = 'MATH';  
const NUMBER_ADD          = 'ADD';   
const NUMBER_SUBTRACT     = 'SUB';   
const NUMBER_MULTIPLY     = 'MUL';   
const NUMBER_DIVIDE       = 'DIV';   
const NUMBER_MODULO       = 'MOD';   
const NUMBER_EXPONENT     = 'EXP';   

const NUMBER_VAR_MATH     = 'MATH*';  
const NUMBER_VAR_ADD      = 'ADD*';   
const NUMBER_VAR_SUBTRACT = 'SUB*';   
const NUMBER_VAR_MULTIPLY = 'MUL*';   
const NUMBER_VAR_DIVIDE   = 'DIV*';   
const NUMBER_VAR_MODULO   = 'MOD*';   
const NUMBER_VAR_EXPONENT = 'EXP*';   


const NUMBER_TYPES =
[
    NUMBER_VALUE,
    NUMBER,
    NUMBER_ROUND,
    NUMBER_LIMITS,
    NUMBER_SERIES,
    NUMBER_RANDOM,
    NUMBER_INTERPOLATE,

    NUMBER_MATH,
    NUMBER_ADD,
    NUMBER_SUBTRACT,
    NUMBER_MULTIPLY,
    NUMBER_DIVIDE,
    NUMBER_MODULO,
    NUMBER_EXPONENT,

    NUMBER_VAR_MATH,
    NUMBER_VAR_ADD,
    NUMBER_VAR_SUBTRACT,
    NUMBER_VAR_MULTIPLY,
    NUMBER_VAR_DIVIDE,
    NUMBER_VAR_MODULO,
    NUMBER_VAR_EXPONENT
];


const STRING_VALUE   = 'STR#';  
const STRING         = 'STR';   
const STRING_ADD     = 'SADD';  
const STRING_REPLACE = 'SREPL'; 


const STRING_TYPES =
[
    STRING_VALUE,
    STRING,
    STRING_ADD,
    STRING_REPLACE
];


const COLOR_VALUE       = 'COL#';  
const COLOR             = 'COL';   
const COLOR_INTERPOLATE = 'CLERP'; 
const COLOR_CORRECT     = 'CCOR';  
const COLOR_CONTRAST    = 'CCNT';  
const COLORBLIND        = 'BLND';  


const COLOR_TYPES =
[
    COLOR_VALUE,
    COLOR,
    COLOR_INTERPOLATE,
    COLOR_CORRECT,
    COLORBLIND
];


const FILL_VALUE       = 'FILL#';
const FILL             = 'FILL';
const FILL_TYPES       = [FILL_VALUE, FILL];

const STROKE_VALUE     = 'STRK#';
const STROKE           = 'STRK';
const STROKE_TYPES     = [STROKE_VALUE, STROKE];

const COLOR_STOP_VALUE = 'CSTOP#';
const COLOR_STOP       = 'CSTOP';

const GRADIENT_VALUE   = 'GRAD#';
const GRADIENT         = 'GRAD';
const GRADIENT_TYPES   = [GRADIENT_VALUE, GRADIENT];

const STYLE_VALUE      = 'STYLE#';
const STYLE            = 'STYLE';
const STYLE_TYPES      = [STYLE_VALUE, STYLE];


const SHAPE_VALUE      = 'SHP#'; // abstract placeholder

const RECTANGLE_VALUE  = 'RECT#';
const RECTANGLE        = 'RECT'; 
const RECTANGLE_TYPES  = [RECTANGLE_VALUE, RECTANGLE];

const LINE_VALUE       = 'LINE#';
const LINE             = 'LINE'; 
const LINE_TYPES       = [LINE_VALUE, LINE];

const ELLIPSE_VALUE    = 'ELPS#';
const ELLIPSE          = 'ELPS'; 
const ELLIPSE_TYPES    = [ELLIPSE_VALUE, ELLIPSE];

const POLYGON_VALUE    = 'POLY#';
const POLYGON          = 'POLY'; 
const POLYGON_TYPES    = [POLYGON_VALUE, POLYGON];

const STAR_VALUE       = 'STAR#';
const STAR             = 'STAR'; 
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

    ...RECTANGLE_TYPES,
    ...LINE_TYPES,
    ...ELLIPSE_TYPES,
    ...POLYGON_TYPES,
    ...STAR_TYPES//,
    //TEXT
];


const ALL_TYPES =
[
    ...FLOW_TYPES,
    ...NUMBER_TYPES,
    ...STRING_TYPES,
    ...COLOR_TYPES,
    ...FILL_TYPES,
    ...STROKE_TYPES,
    ...GRADIENT_TYPES,
    ...STYLE_TYPES,
    ...SHAPE_TYPES
];


const GROUP         = 'GRP';   // ???? count O...


const COMMENT       = 'CMNT';


const ACTIVE        = 'ACT';
const BEFORE_ACTIVE = 'BEF';
const DISABLED      = 'DIS';
const NOCACHE       = 'NOC';

const PARAM         = 'PARAM'; // nodeId paramId


const LOG           = 'LOG';



const MATH_OPS = 
[   // the order is important for logical keyboard value changes
    [NUMBER_SUBTRACT, '-' ],
    [NUMBER_ADD,      '+' ],
    [NUMBER_DIVIDE,   '/' ], //'÷' ],
    [NUMBER_MULTIPLY, '×' ],
    [NUMBER_MODULO,   '%' ],
    [NUMBER_EXPONENT, 'eˣ'] 
];



/*

FRAME       F
IMAGE       I
SLICE       /
TEXT        T
VECTOR      V

*/