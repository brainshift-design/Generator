const NAN_CHAR               = '\uFFFD';
const NAN_DISPLAY            = '?';

const SEP                    = ' ';
    
const UNKNOWN_CHAR           = '?';
const UNKNOWN_DISPLAY        = UNKNOWN_CHAR;//'🤷‍♂️';

const NAME_SEPARATOR         = ' ';
const OBJECT_SEPARATOR       = ' > ';
const   PROP_SEPARATOR       = ' / ';
const  INPUT_SEPARATOR       = ':';

const CENTER_SUFFIX          = ' •';
const  XFORM_SUFFIX          = ' ◇';
    

const  TRUE_DISPLAY_LIGHT    = '<svg width="13" height="11" viewBox="0 1 13 11" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M12.3645 1.82058L10.2676 0.599976L5.1191 8.58091L2.44314 6.06144L0.800003 7.67327L5.54161 12.1958L12.3645 1.82058Z" fill="#2AD400"/></svg>';
const FALSE_DISPLAY_LIGHT    = '<svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M9 1.27273L7.72727 0L4.5 3.22728L1.27273 5.21088e-06L0 1.27273L3.22727 4.5L6.50594e-06 7.72727L1.27273 9L4.5 5.77273L7.72727 9L8.99999 7.72727L5.77272 4.5L9 1.27273Z" fill="#F43D3D"/></svg>';    

const  TRUE_DISPLAY_DARK     = '<svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M11.1 0.998457L9.41674 0L4.20109 8.01592L1.50123 5.4381L0.1 6.77599L4.52397 11L11.1 0.998457Z" fill="#3FF911"/></svg>';
const FALSE_DISPLAY_DARK     = '<svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M9 1.27273L7.72727 0L4.5 3.22728L1.27273 5.21088e-06L0 1.27273L3.22727 4.5L6.50594e-06 7.72727L1.27273 9L4.5 5.77273L7.72727 9L8.99999 7.72727L5.77272 4.5L9 1.27273Z" fill="#FF3E3E"/></svg>';

const  TRUE_DISPLAY_LIGHT_BW = '<svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M10.7157 0.893364L9.55198 0.139526L4.15187 8.47598L1.20316 5.59262L0.248535 6.5928L4.41886 10.5815L5.04702 9.60025L10.7157 0.893364Z" fill="black"/></svg>';
const FALSE_DISPLAY_LIGHT_BW = '<svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M1.13479 0.1521L0.1521 1.13479L3.51727 4.49997L0.152106 7.86514L1.1348 8.84783L4.49997 5.48266L7.86511 8.8478L8.8478 7.86511L5.48266 4.49997L8.84781 1.13482L7.86511 0.152129L4.49997 3.51727L1.13479 0.1521Z" fill="black"/></svg>';

const  TRUE_DISPLAY_DARK_BW  = '<svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M11.1 0.998457L9.41672 0L4.20107 8.01592L1.50121 5.4381L0.0999756 6.77599L4.52395 11L11.1 0.998457Z" fill="white"/></svg>';
const FALSE_DISPLAY_DARK_BW  = '<svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M9 1.27273L7.72727 0L4.5 3.22728L1.27273 5.21088e-06L0 1.27273L3.22727 4.5L6.50594e-06 7.72727L1.27273 9L4.5 5.77273L7.72727 9L8.99999 7.72727L5.77272 4.5L9 1.27273Z" fill="white"/></svg>';

const  TRUE_DISPLAY_MENU     = '<svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M11.1 0.998457L9.41675 0L4.2011 8.01592L1.50124 5.4381L0.100006 6.77599L4.52398 11L11.1 0.998457Z" fill="white"/></svg>';
const FALSE_DISPLAY_MENU     = '<svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M9 1.27273L7.72727 0L4.5 3.22728L1.27273 5.21088e-06L0 1.27273L3.22727 4.5L6.50594e-06 7.72727L1.27273 9L4.5 5.77273L7.72727 9L8.99999 7.72727L5.77272 4.5L9 1.27273Z" fill="white"/></svg>';



function getTrueDisplay(color = true)
{
    return darkMode
         ? (color ? TRUE_DISPLAY_DARK  : TRUE_DISPLAY_DARK_BW )
         : (color ? TRUE_DISPLAY_LIGHT : TRUE_DISPLAY_LIGHT_BW);
}



function getFalseDisplay(color = true)
{
    return darkMode
         ? (color ? FALSE_DISPLAY_DARK  : FALSE_DISPLAY_DARK_BW )
         : (color ? FALSE_DISPLAY_LIGHT : FALSE_DISPLAY_LIGHT_BW);
}