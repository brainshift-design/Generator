function dataColor2array(color)
{
    return [
        color[1], 
        color[2], 
        color[3]];
}



function dataColor2rgb(color)
{
    const col = dataColor2array(color);

    switch (color[0])
    {
        case 'hex':
        case 'rgb':         return                 col;

        case 'lrgb':        return lrgb2rgb       (col);
        case 'rgbp3':       return p32srgb        (col);
        case 'rgba98':      return rgba982srgb    (col);
        case 'rgbprophoto': return rgbprophoto2rgb(col);
        case 'rgbrec2020':  return rgbrec20202rgb (col);

        case 'hsv':         return hsv2rgb        (col);
        case 'hsl':         return hsl2rgb        (col);

        case 'hclok':       return hclok2rgb      (col);
        case 'hclab':       return hclab2rgb      (col);
        case 'hcluv':       return hcluv2rgb      (col);

        case 'oklab':       return oklab2rgb      (col);
        case 'lab':         return lab2rgb        (col);
        case 'luv':         return luv2rgb        (col);

        case 'xyz':         return xyz2rgb        (col);
        case 'xyzd50':      return xyz2rgb        (col, sRGB_D50);
        case 'xyzd65':      return xyz2rgb        (col);
    }
}



function convertDataColorToSpace(color, toSpace)
{
    switch (toSpace)
    {
        case 'hex':    
        case 'rgb':         return convert2rgb        (color);

        case 'lrgb':        return convert2lrgb       (color);
        case 'rgbp3':       return convert2p3         (color);
        case 'rgba98':      return convert2rgba98     (color);
        case 'rgbprophoto': return convert2rgbprophoto(color);
        case 'rgbrec2020':  return convert2rgbrec2020 (color);

        case 'hsv':         return convert2hsv        (color);
        case 'hsl':         return convert2hsl        (color);

        case 'hclok':       return convert2hclok      (color);
        case 'hclab':       return convert2hclab      (color);
        case 'hcluv':       return convert2hcluv      (color);

        case 'oklab':       return dataColor2oklab    (color);
        case 'lab':         return convert2lab        (color);
        case 'luv':         return convert2luv        (color);

        case 'xyz':         return convert2xyz        (color);
        case 'xyzd50':      return convert2xyzd50     (color);
        case 'xyzd65':      return convert2xyzd65     (color);
    }
}



function convert2rgb(fromColor)
{
    const col = dataColor2array(fromColor);

    let rgb;

    switch (fromColor[0])
    {
        case 'hex':
        case 'rgb':         rgb =                 col ; break;

        case 'lrgb':        rgb = lrgb2rgb       (col); break;
        case 'rgbp3':       rgb = p32srgb        (col); break;
        case 'rgba98':      rgb = rgba982srgb    (col); break;
        case 'rgbprophoto': rgb = rgbprophoto2rgb(col); break;
        case 'rgbrec2020':  rgb = rgbrec20202rgb (col); break;

        case 'hsv':         rgb = hsv2rgb        (col); break;
        case 'hsl':         rgb = hsl2rgb        (col); break;

        case 'hclok':       rgb = hclok2rgb      (col); break;
        case 'hclab':       rgb = hclab2rgb      (col); break;
        case 'hcluv':       rgb = hcluv2rgb      (col); break;

        case 'oklab':       rgb = oklab2rgb      (col); break;
        case 'lab':         rgb = lab2rgb        (col); break;
        case 'luv':         rgb = luv2rgb        (col); break;

        case 'xyz':         rgb = xyz2rgb        (col); break;
        case 'xyzd50':      rgb = xyz2rgb        (col, sRGB_D50); break;
        case 'xyzd65':      rgb = xyz2rgb        (col); break;
    }

    return rgb2dataColor(rgb);
}



function convert2lrgb(fromColor)
{
    const col = dataColor2array(fromColor);

    let rgb;

    switch (fromColor[0])
    {
        case 'hex':
        case 'rgb':         rgb = rgb2lrgb                (col);  break;

        case 'lrgb':        rgb =                          col ;  break;
        case 'rgbp3':       rgb = rgb2lrgb(p32srgb        (col)); break;
        case 'rgba98':      rgb = rgb2lrgb(rgba982srgb    (col)); break;
        case 'rgbprophoto': rgb = rgb2lrgb(rgbprophoto2rgb(col)); break;
        case 'rgbrec2020':  rgb = rgb2lrgb(rgbrec20202rgb (col)); break;

        case 'hsv':         rgb = rgb2lrgb(hsv2rgb        (col)); break;
        case 'hsl':         rgb = rgb2lrgb(hsl2rgb        (col)); break;

        case 'hclok':       rgb = rgb2lrgb(hclok2rgb      (col)); break;
        case 'hclab':       rgb = rgb2lrgb(hclab2rgb      (col)); break;
        case 'hcluv':       rgb = rgb2lrgb(hcluv2rgb      (col)); break;

        case 'oklab':       rgb = rgb2lrgb(oklab2rgb      (col)); break;
        case 'lab':         rgb = rgb2lrgb(lab2rgb        (col)); break;
        case 'luv':         rgb = rgb2lrgb(luv2rgb        (col)); break;

        case 'xyz':         rgb = rgb2lrgb(xyz2rgb        (col)); break;
        case 'xyzd50':      rgb = rgb2lrgb(xyz2rgb        (col, sRGB_D50)); break;
        case 'xyzd65':      rgb = rgb2lrgb(xyz2rgb        (col)); break;
    }

    return rgb2dataColor(rgb);
}



function convert2hsv(fromColor)
{
    const col = dataColor2array(fromColor);
    
    let hsv;
    
    switch (fromColor[0])
    {
        case 'hex':
        case 'rgb':   hsv = rgb2hsv(          col ); break;

        case 'hsv':   hsv =                   col;   break;
        case 'hsl':   hsv = rgb2hsv(hsl2rgb  (col)); break;

        case 'hclok': hsv = rgb2hsv(hclok2rgb(col)); break;
        case 'hclab': hsv = rgb2hsv(hclab2rgb(col)); break;
        case 'hcluv': hsv = rgb2hsv(hcluv2rgb(col)); break;

        case 'oklab': hsv = rgb2hsv(oklab2rgb(col)); break;
        case 'lab':   hsv = rgb2hsv(lab2rgb  (col)); break;
        case 'luv':   hsv = rgb2hsv(luv2rgb  (col)); break;
    }
    
    if (isNaN(hsv[0]))
        hsv[0] = 5/6;
    
    return [
       'hsv',
        hsv[0],
        hsv[1],
        hsv[2] ];
}



function convert2hsl(fromColor)
{
    const col = dataColor2array(fromColor);

    let hsl;

    switch (fromColor[0])
    {
        case 'hex':
        case 'rgb':   hsl = rgb2hsl(          col ); break;

        case 'hsv':   hsl = rgb2hsl(hsv2rgb  (col)); break;
        case 'hsl':   hsl =                   col;   break;

        case 'hclok': hsl = rgb2hsl(hclok2rgb(col)); break;
        case 'hclab': hsl = rgb2hsl(hclab2rgb(col)); break;
        case 'hcluv': hsl = rgb2hsl(hcluv2rgb(col)); break;

        case 'oklab': hsl = rgb2hsl(oklab2rgb(col)); break;
        case 'lab':   hsl = rgb2hsl(lab2rgb  (col)); break;
        case 'luv':   hsl = rgb2hsl(luv2rgb  (col)); break;
    }

    return [
       'hsl',
        hsl[0],
        hsl[1],
        hsl[2] ];
}



function dataColor2oklab(fromColor)
{
    const col = dataColor2array(fromColor);

    let lab;

    switch (fromColor[0])
    {
        case 'hex':
        case 'rgb':   lab = rgb2oklab(          col ); break;

        case 'hsv':   lab = rgb2oklab(hsv2rgb  (col)); break;
        case 'hsl':   lab = rgb2oklab(hsl2rgb  (col)); break;

        case 'hclok': lab = rgb2oklab(hclok2rgb(col)); break;
        case 'hclab': lab = rgb2oklab(hclab2rgb(col)); break;
        case 'hcluv': lab = rgb2oklab(hcluv2rgb(col)); break;

        case 'oklab': lab =                     col;   break;
        case 'lab':   lab = rgb2oklab(lab2rgb  (col)); break;
        case 'luv':   lab = rgb2oklab(luv2rgb  (col)); break;
    }

    return [
       'oklab',
        lab[0],
        lab[1],
        lab[2] ];
}



function convert2lab(fromColor)
{
    const col = dataColor2array(fromColor);

    let lab;

    switch (fromColor[0])
    {
        case 'hex':
        case 'rgb':   lab = rgb2lab(          col ); break;

        case 'hsv':   lab = rgb2lab(hsv2rgb  (col)); break;
        case 'hsl':   lab = rgb2lab(hsl2rgb  (col)); break;

        case 'hclok': lab = rgb2lab(hclok2rgb(col)); break;
        case 'hclab': lab =         hclab2lab(col);  break;
        case 'hcluv': lab = rgb2lab(hcluv2rgb(col)); break;

        case 'oklab': lab = rgb2lab(oklab2rgb(col)); break;
        case 'lab':   lab =                   col;   break;
        case 'luv':   lab = rgb2lab(luv2rgb  (col)); break;
    }

    return [
       'lab',
        lab[0],
        lab[1],
        lab[2] ];
}



function convert2luv(fromColor)
{
    const col = dataColor2array(fromColor);

    let luv;

    switch (fromColor[0])
    {
        case 'hex':
        case 'rgb':   luv = rgb2luv(          col ); break;

        case 'hsv':   luv = rgb2luv(hsv2rgb  (col)); break;
        case 'hsl':   luv = rgb2luv(hsl2rgb  (col)); break;

        case 'hclok': luv = rgb2luv(hclok2rgb(col)); break;
        case 'hclab': luv = rgb2luv(hclab2rgb(col)); break;
        case 'hcluv': luv =         hcluv2luv(col);  break;

        case 'oklab': luv = rgb2luv(oklab2rgb(col)); break;
        case 'lab':   luv = rgb2luv(lab2rgb  (col)); break;
        case 'luv':   luv =                   col;   break;
    }

    return [
       'luv',
        luv[0],
        luv[1],
        luv[2] ];
}



function convert2hclok(fromColor)
{
    const col = dataColor2array(fromColor);

    let hcl;

    switch (fromColor[0])
    {
        case 'hex':
        case 'rgb':   hcl = rgb2hclok(          col);  break;

        case 'hsv':   hcl = rgb2hclok(hsv2rgb  (col)); break;
        case 'hsl':   hcl = rgb2hclok(hsl2rgb  (col)); break;

        case 'hclok': hcl =                     col;   break;
        case 'hclab': hcl = rgb2hclok(hclab2rgb(col)); break;
        case 'hcluv': hcl = rgb2hclok(hcluv2rgb(col)); break;

        case 'oklab': hcl = rgb2hclok(oklab2rgb(col)); break;
        case 'lab':   hcl = rgb2hclok(lab2rgb  (col)); break;
        case 'luv':   hcl = rgb2hclok(luv2rgb  (col)); break;
    }

    return [
       'hclok',
        hcl[0],
        hcl[1],
        hcl[2] ];
}



function convert2hclab(fromColor)
{
    const col = dataColor2array(fromColor);

    let lab;

    switch (fromColor[0])
    {
        case 'hex':
        case 'rgb':   lab = rgb2hclab(          col) ; break;
        
        case 'hsv':   lab = rgb2hclab(hsv2rgb  (col)); break;
        case 'hsl':   lab = rgb2hclab(hsl2rgb  (col)); break;
        
        case 'hclok': lab = rgb2hclab(hclok2rgb(col)); break;
        case 'hclab': lab =                     col;   break;
        case 'hcluv': lab = rgb2hclab(hcluv2rgb(col)); break;
        
        case 'oklab': lab = rgb2hclab(oklab2rgb(col)); break;
        case 'lab':   lab = lab2hclab(          col ); break;
        case 'luv':   lab = rgb2hclab(luv2rgb  (col)); break;
    }

    return [
       'hclab',
        lab[0],
        lab[1],
        lab[2] ];
}



function convert2hcluv(fromColor)
{
    const col = dataColor2array(fromColor);

    let hcl;

    switch (fromColor[0])
    {
        case 'hex':
        case 'rgb':   hcl = rgb2hcluv(          col ); break;

        case 'hsv':   hcl = rgb2hcluv(hsv2rgb  (col)); break;
        case 'hsl':   hcl = rgb2hcluv(hsl2rgb  (col)); break;

        case 'hclab': hcl = rgb2hcluv(hclab2rgb(col)); break;
        case 'hcluv': hcl =                     col;   break;
        case 'hclok': hcl = rgb2hcluv(hclok2rgb(col)); break;

        case 'oklab': hcl = rgb2hcluv(oklab2rgb(col)); break;
        case 'lab':   hcl = rgb2hcluv(lab2rgb  (col)); break;
        case 'luv':   hcl = luv2hcluv(          col ); break;
    }

    return [
       'hcluv',
        hcl[0],
        hcl[1],
        hcl[2] ];
}