const LIST_VALUE             = 'LIST#';

const NUMBER_LIST_VALUE      = 'NLIST#';
const   TEXT_LIST_VALUE      = 'TLIST#';
const  SHAPE_LIST_VALUE      = 'SLIST#';
const  COLOR_LIST_VALUE      = 'CLIST#';
const  FILL_LIST_VALUE       = 'FLIST#';
const  COLOR_STOP_LIST_VALUE = 'CSLIST#';


const NULL_NODE              = 'NULL';
const VARIABLE_GROUP         = 'VARGRP';
const FEEDBACK               = 'FEEDBK';
const REPEAT                 = 'REPT';
const ADVANCE                = 'ADVNC';
const CACHE                  = 'CACHE';
const FREEZE                 = 'FRZ';
const TIMER                  = 'TIMER';
const GET_VALUE_NAME         = 'GVNAME';
const SET_VALUE_NAME         = 'SVNAME';
const GET_LIST_VALUE_NAMES   = 'GVNAMES';
const SET_LIST_VALUE_NAMES   = 'SVNAMES';
const SET_OBJECT_NAME        = 'SONAME';


const VARIABLE               = 'VAR';
const VARIABLE_VALUE         = 'VAR#';
const VARIABLE_TYPES         = [VARIABLE_VALUE, VARIABLE];


const LIST                   = 'LIST';
const LIST_AS_ITEM           = 'LSASIT';
const EXTRACT                = 'EXTR';
const SET_PARAM              = 'SETP';
const GET_PARAM              = 'GETP';
const SUBLIST                = 'SUBLST';
const UNIQUE                 = 'UNIQ';
const REORDER_LIST           = 'RORD';
const SHIFT_LIST             = 'SHFTLST';
const REVERSE_LIST           = 'REVLST';
const BUCKLE_LIST            = 'BUKLST';
const SORT                   = 'SORT';
const COLUMN                 = 'CLMN';
const CELL                   = 'CELL';
const ITEMS                  = 'ITEMS';
const LIST_COUNT             = 'COUNT';
const OBJECT_COUNT           = 'OBJCOUNT';
const LIST_CONTAINS          = 'LCONT';
const LIST_FIND              = 'LFIND';
const SELECT                 = 'SELECT';
const SELECT_FROM_LIST       = 'LSTSEL';
const IF_ELSE                = 'IF';
const FILTER                 = 'LSTFLT';


const ANY_VALUE              = 'ANY#';


const LIST_TYPES =
[
    LIST_VALUE,
    NUMBER_LIST_VALUE,
    TEXT_LIST_VALUE,
    SHAPE_LIST_VALUE,
    COLOR_LIST_VALUE,
    FILL_LIST_VALUE,
    COLOR_STOP_LIST_VALUE,
    LIST,
    EXTRACT,
    SET_PARAM,
    GET_PARAM,
    SUBLIST,
    ITEMS,
    LIST_COUNT,
    LIST_CONTAINS,
    LIST_FIND,
    REPEAT,
    ADVANCE
];


const LIST_VALUES =
[
                LIST_VALUE,
         NUMBER_LIST_VALUE,
           TEXT_LIST_VALUE,
          SHAPE_LIST_VALUE,
          COLOR_LIST_VALUE,
           FILL_LIST_VALUE,
     COLOR_STOP_LIST_VALUE
];


const ITERATE                 = 'ITER';  
const PROBABILITY             = 'PROB';  
const HOLD                    = 'HOLD';


const BOOLEAN_NUMBER          = 'BOOL';

const NUMBER_VALUE            = 'NUM#';  
const NUMBER                  = 'NUM';   
const BOUNDED_NUMBER          = 'BNDNUM';   
const NUMBER_PRECISION        = 'NPREC';   
const NUMBER_SIGN             = 'NSIGN';   
const NUMBER_ABSOLUTE         = 'ABS';   
const NUMBER_NEGATIVE         = 'NEG';   
const NUMBER_ROUND            = 'ROUND';   
const NUMBER_QUANTIZE         = 'QUANT';   
const NUMBER_SIMPLE_MINMAX    = 'SMINMAX';   
const NUMBER_MINMAX           = 'MINMAX';   
const NUMBER_LIMITS           = 'LIM';   
const NUMBER_CURVE            = 'NCURVE';   
const NUMBER_MAP              = 'NMAP';   
const NUMBER_BIAS             = 'NBIAS';   
const NUMBER_NAN              = 'NANISNUM';
const NUMBER_CONSTANT         = 'CONST';  
const NUMBER_DATETIME         = 'DATE';  
const NUMBER_SEQUENCE         = 'SEQ';  
const NUMBER_RANGE            = 'RANGE';  
const NUMBER_WAVE             = 'WAVE';  
const NUMBER_RANDOM           = 'RAND';  
const NUMBER_NOISE            = 'NOISE';  
const NUMBER_ACCUMULATE       = 'ACCUM';  
const NUMBER_INTERPOLATE      = 'LERP'; 
const NUMBER_SOLVE            = 'SOLVE';
const NUMBER_ANIMATE          = 'NANIM';

const NUMBER_SIMPLE_MATH      = 'SMATH';  
const NUMBER_MATH             = 'MATH';  
const NUMBER_ADD              = 'ADD';   
const NUMBER_SUBTRACT         = 'SUB';   
const NUMBER_MULTIPLY         = 'MUL';   
const NUMBER_DIVIDE           = 'DIV';   
const NUMBER_MODULO           = 'MOD';   
const NUMBER_EXPONENT         = 'EXP';

const NUMBER_BOOLEAN          = 'NBOOL';  
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

const NUMBER_TRIG             = 'TRIG';  
const NUMBER_SIN              = 'SIN';   
const NUMBER_COS              = 'COS';   
const NUMBER_TAN              = 'TAN';
const NUMBER_ATAN2            = 'ATAN2';

const CONVERT_ANGLE           = 'CNVANG';


const TEXT_VALUE              = 'TEXT#';
const TEXT                    = 'TEXT';
const TEXT_LENGTH             = 'TLEN';
const TEXT_TRIM               = 'TTRIM';
const TEXT_SUBSTRING          = 'TSUB';
const TEXT_CONTAINS           = 'TCONT';
const TEXT_FIND               = 'TFIND';
const TEXT_CASE               = 'TCASE';
const TEXT_REPLACE            = 'TREPL';
const TEXT_ADD                = 'TADD';
const TEXT_JOIN               = 'TJOIN';
const TEXT_PAD                = 'TPAD';
const TEXT_COMPARE            = 'TCMP';
const TEXT_CHAR               = 'TCHAR';
const TEXT_UNICODE            = 'TUNI';
const INDEX_TO_NAME           = 'INDEX';
const NUMBER_TO_TEXT          = 'N2T';
const COLOR_TO_TEXT           = 'C2T';
const TEXT_TO_NUMBER          = 'T2N';
const TEXT_TO_COLOR           = 'T2C';
const TEXT_SPLIT              = 'TSPLT';
const PARSE_JSON              = 'TJSON';
const PARSE_CSV               = 'TCSV';
const TEXT_FETCH              = 'FETCH';
const TEXT_FILE               = 'TFILE';


const COLOR_VALUE             = 'COL#';  
const COLOR                   = 'COL';   
const VALID_COLOR             = 'CVAL';  
const CORRECT_COLOR           = 'CCOR';  
const COLOR_CONTRAST          = 'CCNT';  
const COLOR_DIFFERENCE           = 'CDLTE';  
const COLORBLIND              = 'BLND';  
const COLOR_SCHEME            = 'CPAL'; 
const COLOR_INTERPOLATE       = 'CLERP'; 
const COLOR_BLEND             = 'CBLND';


const FILL_VALUE          = 'FILL#';
const FILL                = 'FILL';
const FILL_TYPES          = [FILL_VALUE, FILL];

const STROKE_VALUE        = 'STRK#';
const STROKE              = 'STRK';
const STROKE_TYPES        = [STROKE_VALUE, STROKE];

const STROKE_SIDES_VALUE  = 'STRKSD#';
const STROKE_SIDES        = 'STRKSD';
const STROKE_SIDES_TYPES  = [STROKE_SIDES_VALUE, STROKE_SIDES];

const COLOR_STOP_VALUE    = 'CSTOP#';
const COLOR_STOP          = 'CSTOP';
const COLOR_STOP_TYPES    = [COLOR_STOP_VALUE, COLOR_STOP];

const GRADIENT_VALUE      = 'GRAD#';
const GRADIENT            = 'GRAD';
const GRADIENT_TYPES      = [GRADIENT_VALUE, GRADIENT];


const ROUND_CORNERS_VALUE = 'RCRN#';
const ROUND_CORNERS       = 'RCRN';
const ROUND_CORNERS_TYPES = [ROUND_CORNERS_VALUE, ROUND_CORNERS];

const DROP_SHADOW_VALUE   = 'DRSH#';
const DROP_SHADOW         = 'DRSH';
const DROP_SHADOW_TYPES   = [DROP_SHADOW_VALUE, DROP_SHADOW];

const INNER_SHADOW_VALUE  = 'INSH#';
const INNER_SHADOW        = 'INSH';
const INNER_SHADOW_TYPES  = [INNER_SHADOW_VALUE, INNER_SHADOW];

const LAYER_BLUR_VALUE    = 'LBLR#';
const LAYER_BLUR          = 'LBLR';
const LAYER_BLUR_TYPES    = [LAYER_BLUR_VALUE, LAYER_BLUR];

const BACK_BLUR_VALUE     = 'BBLR#';
const BACK_BLUR           = 'BBLR';
const BACK_BLUR_TYPES     = [BACK_BLUR_VALUE, BACK_BLUR];

const LAYER_MASK_VALUE    = 'MASK#';
const LAYER_MASK          = 'MASK';
const LAYER_MASK_TYPES    = [LAYER_MASK_VALUE, LAYER_MASK];

const LAYER_BLEND_VALUE   = 'BLEND#';
const LAYER_BLEND         = 'BLEND';
const LAYER_BLEND_TYPES   = [LAYER_BLEND_VALUE, LAYER_BLEND];


const COLOR_STYLE           = 'CSTL';


const SHAPE_VALUE           = 'SHP#'; // abstract placeholder

const RECTANGLE_VALUE       = 'RECT#';
const RECTANGLE             = 'RECT'; 
//const RECTANGLE_EXT         = 'RECTEXT'; 
const RECTANGLE_TYPES       = [RECTANGLE_VALUE, RECTANGLE];//, RECTANGLE_EXT];

const LINE_VALUE            = 'LINE#';
const LINE                  = 'LINE'; 
const LINE_TYPES            = [LINE_VALUE, LINE];

const ELLIPSE_VALUE         = 'ELPS#';
const ELLIPSE               = 'ELPS'; 
const ELLIPSE_TYPES         = [ELLIPSE_VALUE, ELLIPSE];

const TRAPEZE_VALUE         = 'TRPZ#';
const TRAPEZE               = 'TRPZ';
const TRAPEZE_TYPES         = [TRAPEZE_VALUE, TRAPEZE];

const POLYGON_VALUE         = 'POLY#';
const POLYGON               = 'POLY'; 
const POLYGON_TYPES         = [POLYGON_VALUE, POLYGON];

const STAR_VALUE            = 'STAR#';
const STAR                  = 'STAR'; 
const STAR_TYPES            = [STAR_VALUE, STAR];

const TEXT_SHAPE_VALUE      = 'TXTS#';
const TEXT_SHAPE            = 'TXTS'; 
const TEXT_SHAPE_TYPES      = [TEXT_SHAPE_VALUE, TEXT_SHAPE];

const POINT_VALUE           = 'PT#';
const POINT                 = 'PT';
const POINT_TYPES           = [POINT_VALUE, POINT];

const POINT_CORNER          = 'PCORN';

const VECTOR_PATH_VALUE     = 'VPATH#';
const VECTOR_PATH           = 'VPATH'; 
const VECTOR_PATH_TYPES     = [VECTOR_PATH_VALUE, VECTOR_PATH];

const VECTOR_VERTEX_VALUE   = 'VPT#';
const VECTOR_VERTEX         = 'VPT'; 
const VECTOR_VERTEX_TYPES   = [VECTOR_VERTEX_VALUE, VECTOR_VERTEX];

const VECTOR_EDGE_VALUE     = 'VEDGE#';
const VECTOR_EDGE           = 'VEDGE'; 
const VECTOR_EDGE_TYPES     = [VECTOR_EDGE_VALUE, VECTOR_EDGE];

const VECTOR_REGION_VALUE   = 'VREG#';
const VECTOR_REGION         = 'VREG'; 
const VECTOR_REGION_TYPES   = [VECTOR_REGION_VALUE, VECTOR_REGION];

const VECTOR_NETWORK_VALUE  = 'VNET#';
const VECTOR_NETWORK        = 'VNET'; 
const VECTOR_NETWORK_TYPES  = [VECTOR_NETWORK_VALUE, VECTOR_NETWORK];

const SHAPE_GROUP_VALUE     = 'SGRP#';
const SHAPE_GROUP           = 'SGRP';
const SHAPE_GROUP_TYPES     = [SHAPE_GROUP_VALUE, SHAPE_GROUP];

const FRAME_VALUE           = 'FRM#';
const FRAME                 = 'FRM';
const FRAME_TYPES           = [FRAME_VALUE, FRAME];
 
const ARC_PATH_VALUE        = 'ARC#';
const ARC_PATH              = 'ARC';
const ARC_PATH_TYPES        = [ARC_PATH_VALUE, ARC_PATH];

const WAVE_PATH_VALUE       = 'WAVEP#';
const WAVE_PATH             = 'WAVEP';
const WAVE_PATH_TYPES       = [WAVE_PATH_VALUE, WAVE_PATH];

const MOVE                  = 'MOVE';
const ROTATE                = 'ROT';
const SCALE                 = 'SCALE';
const SKEW                  = 'SKEW';

const SHOW_CENTER           = 'SHOWCNTR';
const SET_CENTER            = 'SCENTR';
const RESET_XFORM           = 'RSTX';

const PLACE                 = 'PLACE';
const SHAPE_APPLY           = 'APPLY';

const PATH_LENGTH           = 'PTHLEN';
const JOIN_PATHS            = 'JOINPTH';
const REORIENT_PATHS        = 'REORPTH';
const POINT_ALONG_PATH      = 'PTALPATH';
const CLOSEST_POINT_ON_PATH = 'CPTONPATH';
const MEASURE_VECTOR        = 'MESPT';
const POINT_ANGLE           = 'PTANGLE';
const VECTOR                = 'VECLEN';
const CIRCLE_CENTER         = 'CIRCEN';
const ARC_FROM_POINTS       = 'ARCPT';
const INTERSECT_LINES       = 'INTLIN';
const INTERPOLATE_POINT     = 'PTLERP';
const REVERSE_PATH          = 'REVPTH';
const BLEND_PATH            = 'BLENDPTH';


const SHAPE_BOOLEAN         = 'SBOOL';
const SHAPE_BOOLEAN_VALUE   = 'SBOOL#';

const BOOL_UNION            = 'SBOOLU';
const BOOL_SUBTRACT         = 'SBOOLS';
const BOOL_INTERSECT        = 'SBOOLI';
const BOOL_EXCLUDE          = 'SBOOLE';


const PERSIST               = 'PERSIST';
const EXPORT                = 'EXPORT';


const GROUP_NODE            = 'GROUP';
const GROUP_PARAM           = 'GPARAM';


const COMMENT               = 'CMNT';
const COMMENT_ARROW         = 'CMNTARR';
const PANEL                 = 'PANEL';


const ACTIVE                = 'ACT';
const BEFORE_ACTIVE         = 'BFACT';
const BEFORE_LIST           = 'BFLST';
const DISABLED              = 'DIS';
const NOCACHE               = 'NOC';

const PARAM                 = 'PARAM'; // nodeId paramId


const LOG                   = 'LOG';


const GRAPH                 = 'GRAPH';



const FLOW_TYPES =
[
    NULL_NODE,
    VARIABLE,
    VARIABLE_GROUP,
    ...LIST_TYPES,
    LIST_AS_ITEM,
    EXTRACT,
    SET_PARAM,
    GET_PARAM,
    SUBLIST,
    UNIQUE,
    REORDER_LIST,
    SHIFT_LIST,
    REVERSE_LIST,
    COLUMN,
    SORT,
    CELL,
    ITEMS,
    SELECT,
    SELECT_FROM_LIST,
    IF_ELSE,
    FILTER,
    FEEDBACK,
    REPEAT,
    ADVANCE,
    ITERATE,
    PROBABILITY,
    HOLD,
    CACHE,
    FREEZE,
    PARSE_JSON,
    PARSE_CSV,
    TIMER,
    GET_VALUE_NAME,
    SET_VALUE_NAME,
    GET_LIST_VALUE_NAMES,
    SET_LIST_VALUE_NAMES,
    COLOR_SCHEME,
    COLOR_DIFFERENCE,
    COLOR_TO_TEXT
];


const MATH_TYPES =
[
    NUMBER_MATH,
    NUMBER_SIMPLE_MATH,
    NUMBER_ADD,
    NUMBER_SUBTRACT,
    NUMBER_MULTIPLY,
    NUMBER_DIVIDE,
    NUMBER_MODULO,
    NUMBER_EXPONENT
];


const NUMBER_BOOLEAN_TYPES =
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


const TRIG_TYPES =
[
    NUMBER_TRIG,
    NUMBER_SIN,
    NUMBER_COS,
    NUMBER_TAN,
    NUMBER_ATAN2
];


const NUMBER_TYPES =
[
    NUMBER_VALUE,
    NUMBER_LIST_VALUE,
    NUMBER,
    BOUNDED_NUMBER,
    BOOLEAN_NUMBER,
    NUMBER_PRECISION,
    NUMBER_SIGN,
    NUMBER_ABSOLUTE,
    NUMBER_NEGATIVE,
    NUMBER_ROUND,
    NUMBER_QUANTIZE,
    NUMBER_SIMPLE_MINMAX,
    NUMBER_MINMAX,
    NUMBER_LIMITS,
    NUMBER_CURVE,
    NUMBER_MAP,
    NUMBER_BIAS,
    NUMBER_NAN,
    NUMBER_CONSTANT,
    NUMBER_DATETIME,
    NUMBER_SEQUENCE,
    NUMBER_RANGE,
    NUMBER_WAVE,
    NUMBER_RANDOM,
    NUMBER_NOISE,
    NUMBER_ACCUMULATE,
    NUMBER_INTERPOLATE,
    NUMBER_SOLVE,
    NUMBER_ANIMATE,
    NUMBER_TO_TEXT,
    TEXT_CHAR,

    ...MATH_TYPES,
    ...NUMBER_BOOLEAN_TYPES,
    ...CONDITION_TYPES,
    ...TRIG_TYPES,

    CONVERT_ANGLE,
    BUCKLE_LIST
];


const TEXT_TYPES =
[
    TEXT_VALUE,
    TEXT_LIST_VALUE,
    TEXT,
    TEXT_LENGTH,
    TEXT_TRIM,
    TEXT_SUBSTRING,
    TEXT_CONTAINS,
    TEXT_FIND,
    TEXT_CASE,
    TEXT_ADD,
    TEXT_JOIN,
    TEXT_PAD,
    TEXT_REPLACE,
    TEXT_COMPARE,
    TEXT_UNICODE,
    INDEX_TO_NAME,
    TEXT_TO_NUMBER,
    TEXT_TO_COLOR,
    TEXT_SPLIT,
    TEXT_FETCH,
    TEXT_FILE
];


const COLOR_TYPES =
[
    COLOR_VALUE,
    COLOR,
    VALID_COLOR,
    CORRECT_COLOR,
    COLORBLIND,
    COLOR_CONTRAST,
    COLOR_DIFFERENCE,
    COLOR_INTERPOLATE,
    COLOR_BLEND,
    COLOR_TO_TEXT
];


const COLOR_HEADER_TYPES =
[
    COLOR,
    FILL,
    STROKE,
    COLOR_STOP,
    GRADIENT
    // COLOR_CONTRAST,
    // COLOR_INTERPOLATE,
    // COLOR_BLEND,
    // COLORBLIND
];


const COLOR_VALUES =
[
    COLOR_VALUE,
    FILL_VALUE,
    STROKE_VALUE,
    COLOR_STOP_VALUE,
    GRADIENT_VALUE
];


const EFFECT_TYPES =
[
    ...STROKE_SIDES_TYPES,
    ...ROUND_CORNERS_TYPES,
    ...DROP_SHADOW_TYPES,
    ...INNER_SHADOW_TYPES,
    ...LAYER_BLUR_TYPES,
    ...BACK_BLUR_TYPES,
    ...LAYER_BLEND_TYPES,
    ...LAYER_MASK_TYPES
];


const STYLE_VALUES =
[
           COLOR_VALUE, 
            FILL_VALUE, 
        GRADIENT_VALUE, 
          STROKE_VALUE,
    STROKE_SIDES_VALUE,
     DROP_SHADOW_VALUE,
    INNER_SHADOW_VALUE,
      LAYER_BLUR_VALUE,
       BACK_BLUR_VALUE,
     LAYER_BLEND_VALUE,
      LAYER_MASK_VALUE
];


const PATH_TYPES =
[
    VECTOR_PATH, 
    TRAPEZE,
    ARC_PATH,
    WAVE_PATH
];

const PATH_VALUES =
[
    VECTOR_PATH_VALUE, 
    TRAPEZE_VALUE,
    ARC_PATH_VALUE,
    WAVE_PATH_VALUE
];


const BOOLEAN_TYPES =
[
    SHAPE_BOOLEAN,
    SHAPE_BOOLEAN_VALUE,
    BOOL_UNION,
    BOOL_SUBTRACT,
    BOOL_INTERSECT,
    BOOL_EXCLUDE
];


const SHAPE_VALUES =
[
    SHAPE_VALUE,
    SHAPE_LIST_VALUE,
    RECTANGLE_VALUE,
    LINE_VALUE,
    ELLIPSE_VALUE,
    TRAPEZE_VALUE,
    POLYGON_VALUE,
    STAR_VALUE,
    TEXT_SHAPE_VALUE,
    POINT_VALUE,
    VECTOR_PATH_VALUE,
    VECTOR_VERTEX_VALUE,
    VECTOR_EDGE_VALUE,
    VECTOR_REGION_VALUE,
    VECTOR_NETWORK_VALUE,
    ARC_PATH_VALUE,
    WAVE_PATH_VALUE,
    SHAPE_GROUP_VALUE,
    FRAME_VALUE,
    SHAPE_BOOLEAN_VALUE,
    DROP_SHADOW_VALUE,
    INNER_SHADOW_VALUE,
    LAYER_BLUR_VALUE,
    BACK_BLUR_VALUE,
    LAYER_BLEND_VALUE,
    LAYER_MASK_VALUE
];


const AFFINE_TYPES =
[
    ROTATE,
    SCALE,
    SKEW
];


const SHAPE_TYPES =
[
    ...SHAPE_VALUES,

    ...RECTANGLE_TYPES,
    ...LINE_TYPES,
    ...ELLIPSE_TYPES,
    ...TRAPEZE_TYPES,
    ...POLYGON_TYPES,
    ...STAR_TYPES,
    ...TEXT_SHAPE_TYPES,
    ...POINT_TYPES,
       POINT_CORNER,
    ...VECTOR_PATH_TYPES,
    ...VECTOR_VERTEX_TYPES,
    ...VECTOR_EDGE_TYPES,
    ...VECTOR_REGION_TYPES,
    ...VECTOR_NETWORK_TYPES,
    ...ARC_PATH_TYPES,
    ...WAVE_PATH_TYPES,
    ...SHAPE_GROUP_TYPES,
    ...FRAME_TYPES,
    ...BOOLEAN_TYPES,
    
    MOVE,
    ...AFFINE_TYPES,
    SHOW_CENTER,
    SET_CENTER,
    RESET_XFORM,
        
    PLACE,
    SHAPE_APPLY,
    
    PATH_LENGTH,
    JOIN_PATHS,
    REORIENT_PATHS,
    POINT_ALONG_PATH,
    CLOSEST_POINT_ON_PATH,
        
    MEASURE_VECTOR,
    POINT_ANGLE,
    VECTOR,
    CIRCLE_CENTER,
    ARC_PATH,
    WAVE_PATH,
    ARC_FROM_POINTS,
    INTERSECT_LINES,
    INTERPOLATE_POINT,
    REVERSE_PATH,
    BLEND_PATH,

    SET_OBJECT_NAME,

    PERSIST,
    EXPORT
];


const NUMBER_VALUES = [NUMBER_VALUE, NUMBER_LIST_VALUE];
const   TEXT_VALUES = [  TEXT_VALUE,   TEXT_LIST_VALUE];


const ALL_VALUES =
[
            LIST_VALUE,
     NUMBER_LIST_VALUE,
       TEXT_LIST_VALUE,
      SHAPE_LIST_VALUE,
     
        VARIABLE_VALUE,
        
          NUMBER_VALUE,
            TEXT_VALUE,
           COLOR_VALUE,
 
            FILL_VALUE,
      COLOR_STOP_VALUE,
        GRADIENT_VALUE,
          STROKE_VALUE,
 
      COLOR_STOP_VALUE,
        GRADIENT_VALUE,
 
           SHAPE_VALUE,
       RECTANGLE_VALUE,
            LINE_VALUE,
         ELLIPSE_VALUE,
         TRAPEZE_VALUE,
         POLYGON_VALUE,
            STAR_VALUE,
      TEXT_SHAPE_VALUE,
           POINT_VALUE,
     VECTOR_PATH_VALUE,
   VECTOR_VERTEX_VALUE,
     VECTOR_EDGE_VALUE,
   VECTOR_REGION_VALUE,
  VECTOR_NETWORK_VALUE,
     SHAPE_GROUP_VALUE,
           FRAME_VALUE,

   ROUND_CORNERS_VALUE,
     DROP_SHADOW_VALUE,
    INNER_SHADOW_VALUE,
      LAYER_BLUR_VALUE,
       BACK_BLUR_VALUE,

     LAYER_BLEND_VALUE,
      LAYER_MASK_VALUE
];


const GROUP_TYPES =
[
    GROUP_NODE,
    GROUP_PARAM
];


const MATH_OPS = 
[   // the order is important for logical keyboard value changes
    [NUMBER_MODULO,   '%' ],
    [NUMBER_DIVIDE,   '/' ], //'÷' ],
    [NUMBER_SUBTRACT, '−' ],
    [NUMBER_ADD,      '+' ],
    [NUMBER_MULTIPLY, '×' ],
    [NUMBER_EXPONENT, 'e<sup>x'] 
];


const MATH_OPS_SHORT = 
[   // the order is important for logical keyboard value changes
    [NUMBER_DIVIDE,   '/' ], //'÷' ],
    [NUMBER_SUBTRACT, '−' ],
    [NUMBER_ADD,      '+'],
    [NUMBER_MULTIPLY, '×']
];



const BOOLEAN_NOT = 0;
const BOOLEAN_XOR = 1;
const BOOLEAN_OR  = 2;
const BOOLEAN_AND = 3;


const BOOLEAN_OPS = 
[   
    [BOOLEAN_NOT, 'not'],
    [BOOLEAN_XOR, 'xor'], 
    [BOOLEAN_OR,  'or' ],
    [BOOLEAN_AND, 'and']
];



const CONDITION_LESS             = 0;
const CONDITION_LESS_OR_EQUAL    = 1;
const CONDITION_NOT_EQUAL        = 2;
const CONDITION_EQUAL            = 3;
const CONDITION_GREATER_OR_EQUAL = 4;
const CONDITION_GREATER          = 5;


const CONDITION_OPS = 
[   
    [CONDITION_LESS,             '<'],
    [CONDITION_LESS_OR_EQUAL,    '≤'],
    [CONDITION_NOT_EQUAL,        '≠'],
    [CONDITION_EQUAL,            '='],
    [CONDITION_GREATER_OR_EQUAL, '≥'],
    [CONDITION_GREATER,          '>']
];



const TRIG_SIN  = 0;
const TRIG_COS  = 1;
const TRIG_TAN  = 2;
const TRIG_ASIN = 3;
const TRIG_ACOS = 4;
const TRIG_ATAN = 5;


const TRIG_OPS = 
[   
    [TRIG_SIN,  'sin' ],
    [TRIG_COS,  'cos' ],
    [TRIG_TAN,  'tan' ],
    [TRIG_ASIN, 'asin'],
    [TRIG_ACOS, 'acos'],
    [TRIG_ATAN, 'atan']
];



const EMPTY_ACTION               = 'EMPTY';
const CONNECT_ACTION             = 'CONNECT';
const CREATE_ACTION              = 'CREATE';
const CREATE_INSERT_ACTION       = 'CREATE_INSERT';
const DELETE_ACTION              = 'DELETE';
const DISCONNECT_ACTION          = 'DISCONNECT';
const LINK_STYLE_ACTION          = 'LINK_STYLE';
const LINK_VARIABLE_ACTION       = 'LINK_VARIABLE';
const LINK_VARIABLE_GROUP_ACTION = 'LINK_VARIABLE_GROUP';
const MAKE_ACTIVE_ACTION         = 'MAKE_ACTIVE';
const MAKE_NOT_CONDITION_ACTION  = 'MAKE_NOT_CONDITION';
const MAKE_PASSIVE_ACTION        = 'MAKE_PASSIVE';
const PASTE_ACTION               = 'PASTE';
const RECONNECT_ACTION           = 'RECONNECT';
const REMOVE_ACTION              = 'REMOVE';
const RENAME_ACTION              = 'RENAME';
const REORDER_INPUTS_ACTION      = 'REORDER_INPUTS';
const REORDER_CONNECTIONS_ACTION = 'REORDER_CONNECTIONS';
const SELECT_ACTION              = 'SELECT';
const SELECT_MOVE_ACTION         = 'SELECT_MOVE';
const MOVE_NODES_ACTION          = 'MOVE_NODES';
const SET_PARAM_VALUE_ACTION     = 'SET_PARAM_VALUE';
const SET_MULTIPLE_VALUES_ACTION = 'SET_MULTIPLE_VALUES';
const SET_PARAM_SETTING_ACTION   = 'SET_PARAM_SETTING';
const SET_NODE_RECT_ACTION       = 'SET_NODE_RECT';
const TOGGLE_DISABLE_ACTION      = 'TOGGLE_DISABLE';
const TOGGLE_PARAM_HEADER_ACTION = 'TOGGLE_PARAM_HEADER';
const SET_CURRENT_GRAPH_ACTION   = 'SET_CURRENT_GRAPH';
const CREATE_PAGE_ACTION         = 'CREATE_PAGE';
const DELETE_PAGE_ACTION         = 'DELETE_PAGE';
const GROUP_NODES_ACTION         = 'GROUP_NODES';
const UNGROUP_NODES_ACTION       = 'UNGROUP_NODES';
const HIGHLIGHT_NODES_ACTION     = 'HIGHLIGHT_NODES';
const SCROLL_LIST_NODE_ACTION    = 'SCROLL_LIST_NODE';
const SET_LIST_DIVIDER_ACTION    = 'SET_LIST_DIVIDER';
const SET_NODE_PARAM_ACTION      = 'SET_NODE_PARAM';


const BLEND_NORMAL               = 'BNORM';
const BLEND_DARKEN               = 'BDARK';
const BLEND_MULTIPLY             = 'BMULT';
const BLEND_PLUS_DARKER          = 'BPDRK';
const BLEND_COLOR_BURN           = 'BBURN';
const BLEND_LIGNTEN              = 'BLITE';
const BLEND_SCREEN               = 'BSCRN';
const BLEND_PLUS_LIGHTER         = 'BPLGT';
const BLEND_COLOR_DODGE          = 'BDODG';
const BLEND_OVERLAY              = 'BOVER';
const BLEND_SOFT_LIGHT           = 'BSOFT';
const BLEND_HARD_LIGHT           = 'BHARD';
const BLEND_DIFFERENCE           = 'BDIFF';
const BLEND_EXCLUSION            = 'BEXCL';
const BLEND_HUE                  = 'BHUE';
const BLEND_SATURATION           = 'BSAT';
const BLEND_COLOR                = 'BCOL';
const BLEND_LUMINOSITY           = 'BLUM';

const BLEND_NORMAL_INDEX         =  0;
const BLEND_DARKEN_INDEX         =  1;
const BLEND_MULTIPLY_INDEX       =  2;
const BLEND_PLUS_DARKER_INDEX    =  3;
const BLEND_COLOR_BURN_INDEX     =  4;
const BLEND_LIGHTEN_INDEX        =  5;
const BLEND_SCREEN_INDEX         =  6;
const BLEND_PLUS_LIGHTER_INDEX   =  7;
const BLEND_COLOR_DODGE_INDEX    =  8;
const BLEND_OVERLAY_INDEX        =  9;
const BLEND_SOFT_LIGHT_INDEX     = 10;
const BLEND_HARD_LIGHT_INDEX     = 11;
const BLEND_DIFFERENCE_INDEX     = 12;
const BLEND_EXCLUSION_INDEX      = 13;
const BLEND_HUE_INDEX            = 14;
const BLEND_SATURATION_INDEX     = 15;
const BLEND_COLOR_INDEX          = 16;
const BLEND_LUMINOSITY_INDEX     = 17;


const BlendModes =
[
    [BLEND_NORMAL,       'normal',       'NORMAL'      ],
    [BLEND_DARKEN,       'darken',       'DARKEN'      ],
    [BLEND_MULTIPLY,     'multiply',     'MULTIPLY'    ],
    [BLEND_PLUS_DARKER,  'plus darker',  'LINEAR_BURN' ],
    [BLEND_COLOR_BURN,   'color burn',   'COLOR_BURN'  ],
    [BLEND_LIGNTEN,      'lighten',      'LIGHTEN'     ],
    [BLEND_SCREEN,       'screen',       'SCREEN'      ],
    [BLEND_PLUS_LIGHTER, 'plus lighter', 'LINEAR_DODGE'],
    [BLEND_COLOR_DODGE,  'color dodge',  'COLOR_DODGE' ],
    [BLEND_OVERLAY,      'overlay',      'OVERLAY'     ],
    [BLEND_SOFT_LIGHT,   'soft light',   'SOFT_LIGHT'  ],
    [BLEND_HARD_LIGHT,   'hard light',   'HARD_LIGHT'  ],
    [BLEND_DIFFERENCE,   'difference',   'DIFFERENCE'  ],
    [BLEND_EXCLUSION,    'exclusion',    'EXCLUSION'   ],
    [BLEND_HUE,          'hue',          'HUE'         ],
    [BLEND_SATURATION,   'saturation',   'SATURATION'  ],
    [BLEND_COLOR,        'color',        'COLOR'       ],
    [BLEND_LUMINOSITY,   'luminosity',   'LUMINOSITY'  ]
];



const FONT_WEIGHTS =
[
    ['thin',        100],
    ['extra light', 200],
    ['light',       300],
    ['regular',     400],
    ['medium',      500],
    ['semi bold',   600],
    ['bold',        700],
    ['extra bold',  800],
    ['black',       900]
];



const FO_TYPE           =  0;
const FO_NODE_ID        =  1;

const FO_OBJECT_ID      =  2;   const FO_STYLE_ID     = 2;
const FO_OBJECT_NAME    =  3;   const FO_STYLE_NAME   = 3;

const FO_FEEDBACK       =  4;   const FO_STYLE_PAINTS = 4;
const FO_PERSIST        =  5;


const FO_XP0            =  6;
const FO_XP1            =  7;
const FO_XP2            =  8;

const FO_SCALE          =  9;

const FO_FILLS          = 10;   const FO_VARIABLE_TYPE   = 10;
const FO_STROKES        = 11;   const FO_VARIABLE_VALUE  = 11;

const FO_STROKE_WEIGHT  = 12;
const FO_STROKE_ALIGN   = 13;
const FO_STROKE_JOIN    = 14;                                    
const FO_STROKE_MITER   = 15;
const FO_STROKE_CAP     = 16;
const FO_STROKE_DASHES  = 17;

const FO_EFFECTS        = 18;

const FO_DECO           = 19;
const FO_IS_CENTER      = 20;   

const FO_OPACITY        = 21;
const FO_BLEND          = 22;
const FO_MASK           = 23;

const FO_X              = 24;                                                                         const FO_BOOLEAN_CHILDREN    = 24;                                                                                              const FO_GROUP_CHILDREN = 24;
const FO_Y              = 25;                                                                         const FO_BOOLEAN_OPERATION   = 25;
const FO_WIDTH          = 26;   
const FO_HEIGHT         = 27;                                    

const FO_RECT_ROUND     = 28;   const FO_ELLIPSE_ROUND   = 28;   const FO_VECTOR_NETWORK_DATA = 28;   const FO_VECTOR_PATH_DATA    = 28;   const FO_POLY_ROUND   = 28;   const FO_STAR_ROUND  = 28;   const FO_FIG_WIDTH      = 28;   const FO_FRAME_ROUND    = 28;
                                const FO_ELLIPSE_START   = 29;                                        const FO_VECTOR_PATH_WINDING = 29;   const FO_POLY_CORNERS = 29;   const FO_STAR_POINTS = 29;   const FO_FIG_HEIGHT     = 29;   const FO_FRAME_CLIP     = 29;
                                const FO_ELLIPSE_SWEEP   = 30;                                        const FO_VECTOR_PATH_ROUND   = 30;                                 const FO_STAR_CONVEX = 30;   const FO_TEXT           = 30;   const FO_FRAME_CHILDREN = 30;
                                                                                                                                 
                                const FO_ELLIPSE_INNER   = 31;                                                                                                                                        const FO_FONT           = 31;
                                                                                                                                                                                                      const FO_FONT_SIZE      = 32;
                                                                                                                                                                                                      const FO_FONT_STYLE     = 33;
                                                                                                                                                                                                                                    
                                                                                                                                                                                                      const FO_ALIGN_H        = 34;
                                                                                                                                                                                                      const FO_ALIGN_V        = 35;
                                                                                                                                                                                                                                    
                                                                                                                                                                                                      const FO_LINE_HEIGHT    = 36;
                                                                                                                                                                                                      const FO_LETTER_SPACING = 37;