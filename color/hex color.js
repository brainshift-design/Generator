function rgb2hex(rgb)
{
    let hex =
          Math.round(rgb[R] * 0xff).toString(16).padStart(2, '0').toUpperCase()
        + Math.round(rgb[G] * 0xff).toString(16).padStart(2, '0').toUpperCase()
        + Math.round(rgb[B] * 0xff).toString(16).padStart(2, '0').toUpperCase();

    return hex;
}



function hex2rgb(hex)
{
    let rgb = [];

    if (hex.length >= 6)
    {
        rgb[R] = parseInt(hex.slice(0, 2), 16); 
        rgb[G] = parseInt(hex.slice(2, 4), 16); 
        rgb[B] = parseInt(hex.slice(4, 6), 16); 
    }
    else if (hex.length >= 3)
    {
        rgb[R] = parseInt(hex[0], 16) * 0x11; 
        rgb[G] = parseInt(hex[1], 16) * 0x11; 
        rgb[B] = parseInt(hex[2], 16) * 0x11; 
    }
    else if (hex.length == 2)
    {
        let v = parseInt(hex, 16);
        
        rgb[R] = v; 
        rgb[G] = v; 
        rgb[B] = v; 
    }
    else if (hex.length == 1)
    {
        let v = parseInt(hex, 16);
        
        rgb[R] = v * 0x11; 
        rgb[G] = v * 0x11; 
        rgb[B] = v * 0x11; 
    }
    else if (hex.length == 0)
    {
        rgb[R] = 0; 
        rgb[G] = 0; 
        rgb[B] = 0;         
    }

    rgb[R] /= 0xff;
    rgb[G] /= 0xff;
    rgb[B] /= 0xff;

    return rgb;
}