const NAN_CHAR            = '\uFFFD';
const NAN_DISPLAY         = '?';
    
const UNKNOWN_CHAR        = '?';
const UNKNOWN_DISPLAY     = UNKNOWN_CHAR;//'🤷‍♂️';

const OBJECT_SEPARATOR    = '>';
    

const  TRUE_DISPLAY_LIGHT = '<svg width="13" height="11" viewBox="0 1 13 11" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M12.3645 1.82058L10.2676 0.599976L5.1191 8.58091L2.44314 6.06144L0.800003 7.67327L5.54161 12.1958L12.3645 1.82058Z" fill="#2AD400"/></svg>';
const FALSE_DISPLAY_LIGHT = '<svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M9 1.27273L7.72727 0L4.5 3.22728L1.27273 5.21088e-06L0 1.27273L3.22727 4.5L6.50594e-06 7.72727L1.27273 9L4.5 5.77273L7.72727 9L8.99999 7.72727L5.77272 4.5L9 1.27273Z" fill="#F43D3D"/></svg>';    

const  TRUE_DISPLAY_DARK  = '<svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M11.1 0.998457L9.41674 0L4.20109 8.01592L1.50123 5.4381L0.1 6.77599L4.52397 11L11.1 0.998457Z" fill="#3FF911"/></svg>';
const FALSE_DISPLAY_DARK  = '<svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M9 1.27273L7.72727 0L4.5 3.22728L1.27273 5.21088e-06L0 1.27273L3.22727 4.5L6.50594e-06 7.72727L1.27273 9L4.5 5.77273L7.72727 9L8.99999 7.72727L5.77272 4.5L9 1.27273Z" fill="#FF3E3E"/></svg>';

const  TRUE_DISPLAY_MENU  = '<svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M11.1 0.998457L9.41675 0L4.2011 8.01592L1.50124 5.4381L0.100006 6.77599L4.52398 11L11.1 0.998457Z" fill="white"/></svg>';
const FALSE_DISPLAY_MENU  = '<svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M9 1.27273L7.72727 0L4.5 3.22728L1.27273 5.21088e-06L0 1.27273L3.22727 4.5L6.50594e-06 7.72727L1.27273 9L4.5 5.77273L7.72727 9L8.99999 7.72727L5.77272 4.5L9 1.27273Z" fill="white"/></svg>';



function getTrueDisplay()
{
    return darkMode
         ? TRUE_DISPLAY_DARK
         : TRUE_DISPLAY_LIGHT;
}



function getFalseDisplay()
{
    return darkMode
         ? FALSE_DISPLAY_DARK
         : FALSE_DISPLAY_LIGHT;
}