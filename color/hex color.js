function rgb2hex(rgb)
{
    let hex =
          Math.round(rgb[0] * 0xff).toString(16).padStart(2, '0').toUpperCase()
        + Math.round(rgb[1] * 0xff).toString(16).padStart(2, '0').toUpperCase()
        + Math.round(rgb[2] * 0xff).toString(16).padStart(2, '0').toUpperCase();

    return hex;
}



function rgba2hex(rgba)
{
    let hex =
          Math.round(rgb[0] * 0xff).toString(16).padStart(2, '0').toUpperCase()
        + Math.round(rgb[1] * 0xff).toString(16).padStart(2, '0').toUpperCase()
        + Math.round(rgb[2] * 0xff).toString(16).padStart(2, '0').toUpperCase()
        + Math.round(rgb[3] * 0xff).toString(16).padStart(2, '0').toUpperCase();

    return hex;
}



function validHex2rgb(hex) // can process invalid '-'
{
    return hex.indexOf(NAN_CHAR) > -1 
           ? rgb_NaN 
           : hex2rgb(hex);
}



function validHex2rgba(hex) // can process invalid '-'
{
    return hex.indexOf(NAN_CHAR) > -1 
           ? rgba_NaN 
           : hex2rgba(hex);
}



function hex2rgb(hex)
{
    if (hex[0] == '#')
        hex = hex.substring(1);

        
    let rgb = [];

    if (hex.length >= 6)
    {
        rgb[0] = parseInt(hex.slice(0, 2), 16); 
        rgb[1] = parseInt(hex.slice(2, 4), 16); 
        rgb[2] = parseInt(hex.slice(4, 6), 16); 
    }
    else if (hex.length >= 3)
    {
        rgb[0] = parseInt(hex[0], 16) * 0x11; 
        rgb[1] = parseInt(hex[1], 16) * 0x11; 
        rgb[2] = parseInt(hex[2], 16) * 0x11; 
    }
    else if (hex.length == 2)
    {
        let v = parseInt(hex, 16);
        
        rgb[0] = v; 
        rgb[1] = v; 
        rgb[2] = v; 
    }
    else if (hex.length == 1)
    {
        let v = parseInt(hex, 16);
        
        rgb[0] = v * 0x11; 
        rgb[1] = v * 0x11; 
        rgb[2] = v * 0x11; 
    }
    else if (hex.length == 0)
    {
        rgb[0] = 0; 
        rgb[1] = 0; 
        rgb[2] = 0;         
    }


    rgb[0] /= 0xff;
    rgb[1] /= 0xff;
    rgb[2] /= 0xff;

    
    return rgb;
}



function hex2rgba(hex)
{
    if (hex[0] == '#')
        hex = hex.substring(1);

        
    let rgba = [];

    if (hex.length >= 8)
    {
        rgba[0] = parseInt(hex.slice(0, 2), 16); 
        rgba[1] = parseInt(hex.slice(2, 4), 16); 
        rgba[2] = parseInt(hex.slice(4, 6), 16); 
        rgba[3] = parseInt(hex.slice(6, 8), 16); 
    }
    else if (hex.length >= 6)
    {
        rgba[0] = parseInt(hex.slice(0, 2), 16); 
        rgba[1] = parseInt(hex.slice(2, 4), 16); 
        rgba[2] = parseInt(hex.slice(4, 6), 16); 
        rgba[3] = 0xff; 
    }
    else if (hex.length >= 4)
    {
        rgba[0] = parseInt(hex[0], 16) * 0x11; 
        rgba[1] = parseInt(hex[1], 16) * 0x11; 
        rgba[2] = parseInt(hex[2], 16) * 0x11; 
        rgba[3] = parseInt(hex[3], 16) * 0x11; 
    }
    else if (hex.length == 3)
    {
        rgba[0] = parseInt(hex[0], 16) * 0x11; 
        rgba[1] = parseInt(hex[1], 16) * 0x11; 
        rgba[2] = parseInt(hex[2], 16) * 0x11; 
        rgba[3] = 0xff; 
    }
    else if (hex.length == 2)
    {
        let v = parseInt(hex, 16);
        
        rgba[0] = v; 
        rgba[1] = v; 
        rgba[2] = v; 
        rgba[3] = 0xff; 
    }
    else if (hex.length == 1)
    {
        let v = parseInt(hex, 16);
        
        rgba[0] = v * 0x11; 
        rgba[1] = v * 0x11; 
        rgba[2] = v * 0x11; 
        rgba[3] = 0xff; 
    }
    else if (hex.length == 0)
    {
        rgba[0] = 0; 
        rgba[1] = 0; 
        rgba[2] = 0;         
        rgba[3] = 0; 
    }


    rgba[0] /= 0xff;
    rgba[1] /= 0xff;
    rgba[2] /= 0xff;
    rgba[3] /= 0xff;


    return rgba;
}