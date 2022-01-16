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
        case 'rgb':    return col;
        case 'hsv':    return hsv2rgb  (col);
        case 'hsl':    return hsl2rgb  (col);
        case 'hclokl': return okhcl2rgb(col);
        case 'hcllab': return lab2rgb  (col);
        case 'hclluv': return luv2rgb  (col);
    }
}



function rgb2dataColor(rgb)
{
    return [
       'rgb',
        rgb[0],
        rgb[1],
        rgb[2] ];
}



function getNormalValue(value, space, chan)
{
    switch (space)
    {
        case 'rgbhex':
        case 'rgb':    return getNormalValueRgb_(value, chan);
        case 'hsv':   
        case 'hsl':    return getNormalValueHs_ (value, chan);
        case 'hclokl': 
        case 'hcllab': 
        case 'hclluv': return getNormalValueHcl (value, chan);
    }
}



function getNormalValueRgb_(value, chan)
{
    switch (chan)
    {
        case 0: return value / 255;
        case 1: return value / 255; 
        case 2: return value / 255;
    }
}



function getNormalValueHs_(value, chan)
{
    switch (chan)
    {
        case 0: return value / 360;
        case 1: return value / 100; 
        case 2: return value / 100;
    }
}



function getNormalValueHcl(value, chan)
{
    switch (chan)
    {
        case 0: return value / 360;
        case 1: return value / 100; 
        case 2: return value / 100;
    }
}



function getNormalColor(color)
{
    return getNormalColor_(
        color[0], 
        color[1], 
        color[2], 
        color[3])
}



function getNormalColor_(space, c1, c2, c3)
{
    switch (space)
    {
        case 'rgbhex':
        case 'rgb':    return getNormalColorRgb_(c1, c2, c3);
        case 'hsv':   
        case 'hsl':    return getNormalColorHs_ (c1, c2, c3);
        case 'hclokl': 
        case 'hcllab': 
        case 'hclluv': return getNormalColorHcl (c1, c2, c3);
    }
}



function getNormalColorRgb_(c1, c2, c3)
{
    return [
        c1 / 255, 
        c2 / 255, 
        c3 / 255];
}



function getNormalColorHs_(c1, c2, c3)
{
    return [
        c1 / 360, 
        c2 / 100, 
        c3 / 100];
}



function getNormalColorHcl(c1, c2, c3)
{
    return [
        c1 / 360, 
        c2 / 100, 
        c3 / 100];
}



function getDataColor(color)
{
    switch (color[0])
    {
        case 'rgbhex':    
        case 'rgb':    return getDataColorRgb_(color[1], color[2], color[3]);
        case 'hsv':   
        case 'hsl':    return getDataColorHs_(color[1], color[2], color[3]);
        case 'hclokl': 
        case 'hcllab': 
        case 'hclluv': return getDataColorHcl(color[1], color[2], color[3]);
    }
}



function getDataColorRgb_(c1, c2, c3)
{
    return [
        c1 * 255, 
        c2 * 255, 
        c3 * 255];
}



function getDataColorHs_(c1, c2, c3)
{
    return [
        c1 * 360, 
        c2 * 100, 
        c3 * 100];
}



function getDataColorHcl(c1, c2, c3)
{
    return [
        c1 * 360, 
        c2 * 100, 
        c3 * 100];
}



function convertDataColorTo(color, toSpace)
{
    switch (toSpace)
    {
        case 'hex':    return convert2rgb   (color);
        case 'rgbhex': return convert2rgb   (color);
        case 'rgb':    return convert2rgb   (color);
        case 'hsv':    return convert2hsv   (color);
        case 'hsl':    return convert2hsl   (color);
        case 'hclokl': return convert2hclokl(color);
        case 'hcllab': return convert2hcllab(color);
        case 'hclluv': return convert2hclluv(color);
    }
}



function convert2rgb(fromColor)
{
    const col = dataColor2array(fromColor);

    let rgb;

    switch (fromColor[0])
    {
        case 'rgb':    rgb = col;                   break;
        case 'hsv':    rgb = hsv2rgb(col);          break;
        case 'hsl':    rgb = hsl2rgb(col);          break;
        case 'hclokl': rgb = okhcl2rgb(col);        break;
        case 'hcllab': rgb = lab2rgb(pol2opp(col)); break;
        case 'hclluv': rgb = luv2rgb(pol2opp(col)); break;
    }

    return rgb2dataColor(rgb);
}



function convert2hsv(fromColor)
{
    const col = dataColor2array(fromColor);
    
    let hsv;
    
    switch (fromColor[0])
    {
        case 'rgb':    hsv = rgb2hsv(col);                   break;
        case 'hsv':    hsv = col;                            break;
        case 'hsl':    hsv = rgb2hsv(hsl2rgb(col));          break;
        case 'hclokl': hsv = rgb2hsv(okhcl2rgb(col));        break;
        case 'hcllab': hsv = rgb2hsv(lab2rgb(hsl2lab(col))); break;
        case 'hclluv': hsv = rgb2hsv(luv2rgb(hsl2lab(col))); break;
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
        case 'rgb':    hsl = rgb2hsl(col);                   break;
        case 'hsv':    hsl = rgb2hsl(hsv2rgb(col));          break;
        case 'hsl':    hsl = col;                            break;
        case 'hclokl': hsl = rgb2hsl(okhcl2rgb(col));        break;
        case 'hcllab': hsl = rgb2hsl(lab2rgb(hsl2lab(col))); break;
        case 'hclluv': hsl = rgb2hsl(luv2rgb(hsl2lab(col))); break;
    }

    return [
       'hsl',
        hsl[0],
        hsl[1],
        hsl[2] ];
}



function convert2hclokl(fromColor)
{
    const col = dataColor2array(fromColor);

    let hcl;

    switch (fromColor[0])
    {
        case 'rgb':    hcl = rgb2okhcl(col);                   break;
        case 'hsv':    hcl = rgb2okhcl(hsv2rgb(col));          break;
        case 'hsl':    hcl = rgb2okhcl(hsl2rgb(col));          break;
        case 'hclokl': hcl = col;                              break;
        case 'hcllab': hcl = rgb2okhcl(lab2rgb(pol2opp(col))); break;
        case 'hclluv': hcl = rgb2okhcl(luv2rgb(pol2opp(col))); break;
    }

    return [
       'hcl',
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
        case 'rgb':    hcl = opp2pol(rgb2lab(col));            break;
        case 'hsv':    hcl = opp2pol(rgb2lab(hsv2rgb(col)));   break;
        case 'hsl':    hcl = opp2pol(rgb2lab(hsl2rgb(col)));   break;
        case 'hclokl': hcl = opp2pol(rgb2lab(okhcl2rgb(col))); break;
        case 'hcllab': hcl = col;                              break;
        case 'hclluv': hcl = opp2pol(rgb2lab(luv2rgb(col)));   break;
    }

    return [
       'hcl',
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
        case 'rgb':    hcl = opp2pol(rgb2luv(col));            break;
        case 'hsv':    hcl = opp2pol(rgb2luv(hsv2rgb(col)));   break;
        case 'hsl':    hcl = opp2pol(rgb2luv(hsl2rgb(col)));   break;
        case 'hclokl': hcl = opp2pol(rgb2luv(okhcl2rgb(col))); break;
        case 'hcllab': hcl = opp2pol(rgb2luv(lab2rgb(col)));   break;
        case 'hclluv': hcl = col;                              break;
    }

    return [
       'hcl',
        hcl[0],
        hcl[1],
        hcl[2] ];
}