const colFigmaBlue         = '#0c8ce9';



const rgbFlowLight         = hex2rgb('#dcdcdc');
const rgbActiveFlowLight   = hex2rgb('#969696');
  
const rgbFlowDark          = hex2rgb('#616161');
const rgbActiveFlowDark    = hex2rgb('#8b8b8b');


const rgbNumberLight       = hex2rgb('#BDDDF3');
const rgbActiveNumberLight = hex2rgb('#37A1E8');

const rgbNumberDark        = hex2rgb('#426287');
const rgbActiveNumberDark  = hex2rgb('#1785CE');


const rgbTextLight       = hex2rgb('#ECE0B8');
const rgbActiveTextLight = hex2rgb('#F6C953');
 
const rgbTextDark        = hex2rgb('#796A43');
const rgbActiveTextDark  = hex2rgb('#F0C75B');


const rgbColor             = hex2rgb('#c38fc5');   
const rgbActiveColor       = hex2rgb('#df2ae2');


const rgbShapeLight        = hex2rgb('#EBD1C3');
const rgbActiveShapeLight  = hex2rgb('#E1765F');
 
const rgbShapeDark         = hex2rgb('#5E4436');
const rgbActiveShapeDark   = hex2rgb('#E1765F');


const rgbCustomLight       = hex2rgb('#C3EBD3');
const rgbActiveCustomLight = hex2rgb('#42C266');

const rgbCustomDark        = hex2rgb('#365E41');
const rgbActiveCustomDark  = hex2rgb('#33AD55');


const rgbNoColorLight      = [0.95, 0.95, 0.95];
const rgbNoColorDark       = [0.3,  0.3,  0.3 ];

const rgbaNoColorTextLight = [0, 0, 0, 0.6];
const rgbaNoColorTextDark  = [1, 1, 1, 0.4];



const rgbDefaultFill       = [0xD9, 0xD9, 0xD9];


var rgbDocumentBody;



function initThemeColors()
{
    rgbDocumentBody = computedStyle2rgba(document.body, 'background-color');

    darkMode = isDarkMode();
}