const smallScrollGap =  6;
const largeScrollGap = 14;

const MAX_INT32      = 2147483647;

const NULL           = '';

const TAB            = '  ';
const NL             = '\n';

const GENERATOR_LOGO = '◦G•';
const OBJECT_PREFIX  = 'G.';


function  leftArrowChar(list) { return list ? '⟸' : '⟵'; }
function rightArrowChar(list) { return list ? '⟹' : '⟶'; }

function parseBool(str) { return str === 'true'; }
