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
        case 'rgb':   return           col;

        case 'hsb':   return hsv2rgb  (col);
        case 'hsl':   return hsl2rgb  (col);

        case 'hclok': return hclok2rgb(col);
        case 'hclab': return hclab2rgb(col);
        case 'hcluv': return hcluv2rgb(col);

        case 'oklab': return oklab2rgb(col);
        case 'lab':   return lab2rgb  (col);
        case 'luv':   return luv2rgb  (col);
    }
}



function convertDataColorToSpace(color, toSpace)
{
    switch (toSpace)
    {
        case 'hex':    
        case 'rgb':   return convert2rgb    (color);

        case 'hsb':   return convert2hsv    (color);
        case 'hsl':   return convert2hsl    (color);

        case 'hclok': return convert2hclok  (color);
        case 'hclab': return convert2hclab  (color);
        case 'hcluv': return convert2hcluv  (color);

        case 'oklab': return dataColor2oklab(color);
        case 'lab':   return convert2lab    (color);
        case 'luv':   return convert2luv    (color);
    }
}



function convert2rgb(fromColor)
{
    const col = dataColor2array(fromColor);

    let rgb;

    switch (fromColor[0])
    {
        case 'hex':
        case 'rgb':   rgb =           col;  break;

        case 'hsb':   rgb = hsv2rgb  (col); break;
        case 'hsl':   rgb = hsl2rgb  (col); break;

        case 'hclok': rgb = hclok2rgb(col); break;
        case 'hclab': rgb = hclab2rgb(col); break;
        case 'hcluv': rgb = hcluv2rgb(col); break;

        case 'oklab': rgb = oklab2rgb(col); break;
        case 'lab':   rgb = lab2rgb  (col); break;
        case 'luv':   rgb = luv2rgb  (col); break;
    }

    return rgb2dataColor(rgb);
}



function convert2hsv(fromColor)
{
    const col = dataColor2array(fromColor);
    
    let hsb;
    
    switch (fromColor[0])
    {
        case 'hex':
        case 'rgb':   hsb = rgb2hsv(          col ); break;

        case 'hsb':   hsb =                   col;   break;
        case 'hsl':   hsb = rgb2hsv(hsl2rgb  (col)); break;

        case 'hclok': hsb = rgb2hsv(hclok2rgb(col)); break;
        case 'hclab': hsb = rgb2hsv(hclab2rgb(col)); break;
        case 'hcluv': hsb = rgb2hsv(hcluv2rgb(col)); break;

        case 'oklab': hsb = rgb2hsv(oklab2rgb(col)); break;
        case 'lab':   hsb = rgb2hsv(lab2rgb  (col)); break;
        case 'luv':   hsb = rgb2hsv(luv2rgb  (col)); break;
    }
    
    if (isNaN(hsb[0]))
        hsb[0] = 5/6;
    
    return [
       'hsb',
        hsb[0],
        hsb[1],
        hsb[2] ];
}



function convert2hsl(fromColor)
{
    const col = dataColor2array(fromColor);

    let hsl;

    switch (fromColor[0])
    {
        case 'hex':
        case 'rgb':   hsl = rgb2hsl(          col ); break;

        case 'hsb':   hsl = rgb2hsl(hsv2rgb  (col)); break;
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

        case 'hsb':   lab = rgb2oklab(hsv2rgb  (col)); break;
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

        case 'hsb':   lab = rgb2lab(hsv2rgb  (col)); break;
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

        case 'hsb':   luv = rgb2luv(hsv2rgb  (col)); break;
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

        case 'hsb':   hcl = rgb2hclok(hsv2rgb  (col)); break;
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
        
        case 'hsb':   lab = rgb2hclab(hsv2rgb  (col)); break;
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

        case 'hsb':   hcl = rgb2hcluv(hsv2rgb  (col)); break;
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