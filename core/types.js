const NAN_CHAR            = '-';
const NAN_DISPLAY         = '–';

const UNKNOWN_CHAR        = '?';
const UNKNOWN_DISPLAY     = UNKNOWN_CHAR;//'🤷‍♂️';


const LIST_VALUE          = 'LIST#';
const LIST                = 'LIST';

const ITEMS               = 'ITEMS';
const SELECT              = 'SEL';
const PASS                = 'PASS';

const START               = 'STRT';
const REPEAT              = 'REPT';

const CACHE               = 'CACHE';
const COPY                = 'COPY';


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
    SELECT,
    PASS,
    START,
    REPEAT,
    FOREACH,
    CACHE,
    COPY
];


const NUMBER_VALUE            = 'NUM#';  
const NUMBER                  = 'NUM';   
const NUMBER_ROUND            = 'ROUND';   
const NUMBER_LIMITS           = 'LIM';   
const NUMBER_SERIES           = 'SER';  
const NUMBER_RANDOM           = 'RAND';  
const NUMBER_INTERPOLATE      = 'LERP';  

const NUMBER_MATH             = 'MATH';  
const NUMBER_ADD              = 'ADD';   
const NUMBER_SUBTRACT         = 'SUB';   
const NUMBER_MULTIPLY         = 'MUL';   
const NUMBER_DIVIDE           = 'DIV';   
const NUMBER_MODULO           = 'MOD';   
const NUMBER_EXPONENT         = 'EXP';

const NUMBER_BOOLEAN          = 'BOOL';  
const NUMBER_NOT              = 'NOT';
const NUMBER_AND              = 'AND';
const NUMBER_OR               = 'OR';
const NUMBER_XOR              = 'XOR';

const NUMBER_CONDITION        = 'COND';
const NUMBER_EQUAL            = 'EQ';
const NUMBER_NOT_EQUAL        = 'NE';
const NUMBER_LESS             = 'LT';
const NUMBER_LESS_OR_EQUAL    = 'LE';
const NUMBER_GREATER          = 'GT';
const NUMBER_GREATER_OR_EQUAL = 'GE';


const MATH_TYPES =
[
    NUMBER_MATH,
    NUMBER_ADD,
    NUMBER_SUBTRACT,
    NUMBER_MULTIPLY,
    NUMBER_DIVIDE,
    NUMBER_MODULO,
    NUMBER_EXPONENT
];


const BOOLEAN_TYPES =
[
    NUMBER_BOOLEAN,
    NUMBER_NOT,
    NUMBER_AND,
    NUMBER_OR,
    NUMBER_XOR
];


const CONDITION_TYPES =
[
    NUMBER_CONDITION,
    NUMBER_EQUAL,
    NUMBER_NOT_EQUAL,
    NUMBER_LESS,
    NUMBER_LESS_OR_EQUAL,
    NUMBER_GREATER,
    NUMBER_GREATER_OR_EQUAL
];


const NUMBER_TYPES =
[
    NUMBER_VALUE,
    NUMBER,
    NUMBER_ROUND,
    NUMBER_LIMITS,
    NUMBER_SERIES,
    NUMBER_RANDOM,
    NUMBER_INTERPOLATE,

    ...MATH_TYPES,
    ...BOOLEAN_TYPES,
    ...CONDITION_TYPES
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



const BOOLEAN_NOT = 0;
const BOOLEAN_AND = 1;
const BOOLEAN_OR  = 2;
const BOOLEAN_XOR = 3;

const BOOLEAN_OPS = 
[   
    [BOOLEAN_NOT, 'not'],
    [BOOLEAN_AND, 'and'],
    [BOOLEAN_OR,  'or' ],
    [BOOLEAN_XOR, 'xor'] 
];



const CONDITION_EQUAL            = 0;
const CONDITION_NOT_EQUAL        = 1;
const CONDITION_LESS             = 2;
const CONDITION_LESS_OR_EQUAL    = 3;
const CONDITION_GREATER          = 4;
const CONDITION_GREATER_OR_EQUAL = 5;

const CONDITION_OPS = 
[   
    [CONDITION_EQUAL,            '='],
    [CONDITION_NOT_EQUAL,        '≠'],
    [CONDITION_LESS,             '<'],
    [CONDITION_LESS_OR_EQUAL,    '≤'],
    [CONDITION_GREATER,          '>'],
    [CONDITION_GREATER_OR_EQUAL, '≥'] 
];



/*

FRAME       F
IMAGE       I
SLICE       /
TEXT        T
VECTOR      V

*/