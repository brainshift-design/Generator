const colFigmaBlue         = '#0c8ce9';



const rgbActiveFlowLight   = hex2rgb('#969696');
const rgbFlowLight         = hex2rgb('#D1D1D1');
  
const rgbActiveNumberLight = hex2rgb('#369FE5');
const rgbNumberLight       = hex2rgb('#B8D4F2');

const rgbActiveCustomLight = hex2rgb('#3AAB5A');
const rgbCustomLight       = hex2rgb('#B9D9BF');

const rgbActiveShapeLight  = hex2rgb('#E1765F');
const rgbShapeLight        = hex2rgb('#F0C7C0');

const rgbActiveTextLight   = hex2rgb('#F6C953');
const rgbTextLight         = hex2rgb('#FBE6BE');


const rgbActiveFlowDark    = hex2rgb('#8B8B8B');
const rgbFlowDark          = hex2rgb('#4D4D4D');

const rgbActiveNumberDark  = hex2rgb('#1785CE');
const rgbNumberDark        = hex2rgb('#304E6A');

const rgbActiveCustomDark  = hex2rgb('#33AD55');
const rgbCustomDark        = hex2rgb('#365E3F');

const rgbActiveShapeDark   = hex2rgb('#E1765F');
const rgbShapeDark         = hex2rgb('#734B43');

const rgbActiveTextDark    = hex2rgb('#F4C855');
const rgbTextDark          = hex2rgb('#7E6E48');


const rgbColor             = hex2rgb('#c38fc5');   
const rgbActiveColor       = hex2rgb('#df2ae2');



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