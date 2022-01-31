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
        case 'rgbhex': 
        case 'rgb':    return            col;
        case 'hsv':    return hsv2rgb   (col);
        case 'hsl':    return hsl2rgb   (col);
        case 'hclokl': return hclokl2rgb(col);
        case 'hcllab': return hcllab2rgb(col);
        case 'hclluv': return hclluv2rgb(col);
        case 'oklab':  return oklab2rgb (col);
        case 'lab':    return lab2rgb   (col);
        case 'luv':    return luv2rgb   (col);
    }
}



function convertDataColorToSpace(color, toSpace)
{
    switch (toSpace)
    {
        case 'hex':    
        case 'rgbhex': 
        case 'rgb':    return convert2rgb   (color);
        case 'hsv':    return convert2hsv   (color);
        case 'hsl':    return convert2hsl   (color);
        case 'hclokl': return convert2hclokl(color);
        case 'hcllab': return convert2hcllab(color);
        case 'hclluv': return convert2hclluv(color);
        case 'oklab':  return convert2oklab (color);
        case 'lab':    return convert2lab   (color);
        case 'luv':    return convert2luv   (color);
    }
}



function convert2rgb(fromColor)
{
    const col = dataColor2array(fromColor);

    let rgb;

    switch (fromColor[0])
    {
        case 'rgbhex':
        case 'rgb':    rgb =            col;  break;
        case 'hsv':    rgb = hsv2rgb   (col); break;
        case 'hsl':    rgb = hsl2rgb   (col); break;
        case 'hclokl': rgb = hclokl2rgb(col); break;
        case 'hcllab': rgb = hcllab2rgb(col); break;
        case 'hclluv': rgb = hclluv2rgb(col); break;
        case 'oklab':  rgb = oklab2rgb (col); break;
        case 'lab':    rgb = lab2rgb   (col); break;
        case 'luv':    rgb = luv2rgb   (col); break;
    }

    return rgb2dataColor(rgb);
}



function convert2hsv(fromColor)
{
    const col = dataColor2array(fromColor);
    
    let hsv;
    
    switch (fromColor[0])
    {
        case 'rgbhex':
        case 'rgb':    hsv = rgb2hsv(           col ); break;
        case 'hsv':    hsv =                    col;   break;
        case 'hsl':    hsv = rgb2hsv(hsl2rgb   (col)); break;
        case 'hclokl': hsv = rgb2hsv(hclokl2rgb(col)); break;
        case 'hcllab': hsv = rgb2hsv(hcllab2rgb(col)); break;
        case 'hclluv': hsv = rgb2hsv(hclluv2rgb(col)); break;
        case 'oklab':  hsv = rgb2hsv(oklab2rgb (col)); break;
        case 'lab':    hsv = rgb2hsv(lab2rgb   (col)); break;
        case 'luv':    hsv = rgb2hsv(luv2rgb   (col)); break;
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
        case 'rgbhex':
        case 'rgb':    hsl = rgb2hsl(           col ); break;
        case 'hsv':    hsl = rgb2hsl(hsv2rgb   (col)); break;
        case 'hsl':    hsl =                    col;   break;
        case 'hclokl': hsl = rgb2hsl(hclokl2rgb(col)); break;
        case 'hcllab': hsl = rgb2hsl(hcllab2rgb(col)); break;
        case 'hclluv': hsl = rgb2hsl(hclluv2rgb(col)); break;
        case 'oklab':  hsl = rgb2hsl(oklab2rgb (col)); break;
        case 'lab':    hsl = rgb2hsl(lab2rgb   (col)); break;
        case 'luv':    hsl = rgb2hsl(luv2rgb   (col)); break;
    }

    return [
       'hsl',
        hsl[0],
        hsl[1],
        hsl[2] ];
}



function convert2oklab(fromColor)
{
    const col = dataColor2array(fromColor);

    let lab;

    switch (fromColor[0])
    {
        case 'rgbhex':
        case 'rgb':    lab = rgb2oklab(           col ); break;
        case 'hsv':    lab = rgb2oklab(hsv2rgb   (col)); break;
        case 'hsl':    lab = rgb2oklab(hsl2rgb   (col)); break;
        case 'hclokl': lab = rgb2oklab(hclokl2rgb(col)); break;
        case 'hcllab': lab = rgb2oklab(hcllab2rgb(col)); break;
        case 'hclluv': lab = rgb2oklab(hclluv2rgb(col)); break;
        case 'oklab':  lab =                      col;   break;
        case 'lab':    lab = rgb2oklab(lab2rgb   (col)); break;
        case 'luv':    lab = rgb2oklab(luv2rgb   (col)); break;
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
        case 'rgbhex':
        case 'rgb':    lab = rgb2lab(           col ); break;
        case 'hsv':    lab = rgb2lab(hsv2rgb   (col)); break;
        case 'hsl':    lab = rgb2lab(hsl2rgb   (col)); break;
        case 'hclokl': lab = rgb2lab(hclokl2rgb(col)); break;
        case 'hcllab': lab = pol2opp           (col);  break;
        case 'hclluv': lab = rgb2lab(hclluv2rgb(col)); break;
        case 'oklab':  lab = rgb2lab(oklab2rgb (col)); break;
        case 'lab':    lab =                    col;   break;
        case 'luv':    lab = rgb2lab(luv2rgb   (col)); break;
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
        case 'rgbhex':
        case 'rgb':    luv = rgb2luv(           col ); break;
        case 'hsv':    luv = rgb2luv(hsv2rgb   (col)); break;
        case 'hsl':    luv = rgb2luv(hsl2rgb   (col)); break;
        case 'hclokl': luv = rgb2luv(hclokl2rgb(col)); break;
        case 'hcllab': luv = rgb2luv(hcllab2rgb(col)); break;
        case 'hclluv': luv = pol2opp           (col);  break;
        case 'oklab':  luv = rgb2luv(oklab2rgb (col)); break;
        case 'lab':    luv = rgb2luv(lab2rgb   (col)); break;
        case 'luv':    luv =                    col;   break;
    }

    return [
       'luv',
        luv[0],
        luv[1],
        luv[2] ];
}



function convert2hclokl(fromColor)
{
    const col = dataColor2array(fromColor);

    let hcl;

    switch (fromColor[0])
    {
        case 'rgbhex':
        case 'rgb':    hcl = rgb2hclokl(           col);  break;
        case 'hsv':    hcl = rgb2hclokl(hsv2rgb   (col)); break;
        case 'hsl':    hcl = rgb2hclokl(hsl2rgb   (col)); break;
        case 'hclokl': hcl =                       col;   break;
        case 'hcllab': hcl = rgb2hclokl(hcllab2rgb(col)); break;
        case 'hclluv': hcl = rgb2hclokl(hclluv2rgb(col)); break;
        case 'oklab':  hcl = rgb2hclokl(oklab2rgb (col)); break;
        case 'lab':    hcl = rgb2hclokl(lab2rgb   (col)); break;
        case 'luv':    hcl = rgb2hclokl(luv2rgb   (col)); break;
    }

    return [
       'hclokl',
        hcl[0],
        hcl[1],
        hcl[2] ];
}



function convert2hcllab(fromColor)
{
    const col = dataColor2array(fromColor);

    let hcl;

    switch (fromColor[0])
    {
        case 'rgbhex':
        case 'rgb':    hcl = rgb2hcllab(           col) ; break;
        case 'hsv':    hcl = rgb2hcllab(hsv2rgb   (col)); break;
        case 'hsl':    hcl = rgb2hcllab(hsl2rgb   (col)); break;
        case 'hclokl': hcl = rgb2hcllab(hclokl2rgb(col)); break;
        case 'hcllab': hcl =                       col;   break;
        case 'hclluv': hcl = rgb2hcllab(hclluv2rgb(col)); break;
        case 'oklab':  hcl = rgb2hcllab(oklab2rgb (col)); break;
        case 'lab':    hcl = opp2pol              (col);  break;
        case 'luv':    hcl = rgb2hcllab(luv2rgb   (col)); break;
    }

    return [
       'hcllab',
        hcl[0],
        hcl[1],
        hcl[2] ];
}



function convert2hclluv(fromColor)
{
    const col = dataColor2array(fromColor);

    let hcl;

    switch (fromColor[0])
    {
        case 'rgbhex':
        case 'rgb':    hcl = rgb2hclluv(           col );  break;
        case 'hsv':    hcl = rgb2hclluv(hsv2rgb   (col)); break;
        case 'hsl':    hcl = rgb2hclluv(hsl2rgb   (col)); break;
        case 'hcllab': hcl = rgb2hclluv(hcllab2rgb(col)); break;
        case 'hclluv': hcl =                       col;   break;
        case 'hclokl': hcl = rgb2hclluv(hclokl2rgb(col)); break;
        case 'oklab':  hcl = rgb2hclluv(oklab2rgb (col)); break;
        case 'lab':    hcl = rgb2hclluv(lab2rgb   (col)); break;
        case 'luv':    hcl = opp2pol              (col);  break;
    }

    return [
       'hclluv',
        hcl[0],
        hcl[1],
        hcl[2] ];
}