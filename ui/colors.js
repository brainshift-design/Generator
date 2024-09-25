const colFigmaBlue         = '#0c8ce9';



const rgbActiveNumberLight = hex2rgb('#369fe5');
const rgbNumberLight = hex2rgb('#b9d5ef');
const rgbActiveTextLight = hex2rgb('#f6c953');
const rgbTextLight = hex2rgb('#f6e4bd');
const rgbActiveShapeLight = hex2rgb('#e1765f');
const rgbShapeLight = hex2rgb('#f0c7bf');
const rgbActiveFlowLight = hex2rgb('#969696');
const rgbFlowLight = hex2rgb('#d2d2d2');
const rgbActiveNumberDark = hex2rgb('#1785ce');
const rgbNumberDark = hex2rgb('#2a4a66');
const rgbActiveTextDark = hex2rgb('#f4c855');
const rgbTextDark = hex2rgb('#756339');
const rgbActiveShapeDark = hex2rgb('#e1765f');
const rgbShapeDark = hex2rgb('#6e443b');
const rgbActiveFlowDark = hex2rgb('#cccccc');
const rgbFlowDark = hex2rgb('#656565');


const rgbColor             = hex2rgb('#c38fc5');   
const rgbActiveColor       = hex2rgb('#df2ae2');



const rgbNoColorLight      = [0.7, 0.7, 0.7];
const rgbNoColorDark       = [0.4, 0.4, 0.4];

const rgbaNoColorTextLight = [0, 0, 0, 0.6];
const rgbaNoColorTextDark  = [1, 1, 1, 0.4];



const rgbDefaultFill       = [0xD9, 0xD9, 0xD9];


var rgbDocumentBody;



function initThemeColors()
{
    rgbDocumentBody = computedStyle2rgba(document.body, 'background-color');

    darkMode        = isDarkMode();
}