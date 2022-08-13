function rgb2hex(rgb)
{
    let hex =
          Math.round(rgb[0] * 0xff).toString(16).padStart(2, '0').toUpperCase()
        + Math.round(rgb[1] * 0xff).toString(16).padStart(2, '0').toUpperCase()
        + Math.round(rgb[2] * 0xff).toString(16).padStart(2, '0').toUpperCase();

    return hex;
}



function validHex2rgb(hex) // can process invalid '?'
{
    return hex.indexOf(INVALID) > -1 
           ? rgb_NaN 
           : hex2rgb(hex);
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