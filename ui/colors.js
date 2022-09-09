const colFigmaBlue         = '#0c8ce9';


const rgbObjectLight       = hex2rgb('#bee0ff');
const rgbActiveObjectLight = hex2rgb('#18a0fb');

const rgbObjectDark        = hex2rgb('#3c5c82');
const rgbActiveObjectDark  = hex2rgb('#18a0fb');


const rgbNumberLight       = hex2rgb('#ddd');
const rgbActiveNumberLight = hex2rgb('#787878');

const rgbNumberDark        = hex2rgb('#505050');
const rgbActiveNumberDark  = hex2rgb('#888');


const rgbColor             = hex2rgb('#ddd');   
const rgbActiveColor       = hex2rgb('#787878');


const rgbNoColorLight      = [0.95, 0.95, 0.95];
const rgbNoColorDark       = [0.3, 0.3, 0.3];

const rgbaNoColorTextLight  = [0, 0, 0, 0.6];
const rgbaNoColorTextDark   = [1, 1, 1, 0.4];


var rgbDocumentBody;



function initModeColors()
{
    rgbDocumentBody = computedStyle2rgba(document.body, 'background-color');
}