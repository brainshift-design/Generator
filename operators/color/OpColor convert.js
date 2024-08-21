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

        case 'lin':   return lin2rgb  (col);
        case 'p3':    return p32rgb   (col);
        case 'a98':   return a982rgb  (col);
        case 'pro':   return pro2rgb  (col);
        case 'r2020': return r20202rgb(col);

        case 'hsv':   return hsv2rgb  (col);
        case 'hsl':   return hsl2rgb  (col);

        case 'hclok': return hclok2rgb(col);
        case 'hclab': return hclab2rgb(col);
        case 'hcluv': return hcluv2rgb(col);

        case 'oklab': return oklab2rgb(col);
        case 'lab':   return lab2rgb  (col);
        case 'luv':   return luv2rgb  (col);

        case 'xyz':   return xyz2rgb  (col);
        case 'xyz50': return xyz2rgb  (col, sRGB_D50);
        case 'xyz65': return xyz2rgb  (col);
    }
}



function convertDataColorToSpace(color, toSpace)
{
    switch (toSpace)
    {
        case 'hex':    
        case 'rgb':   return convert2rgb    (color);

        case 'lin':   return convert2lin    (color);
        case 'p3':    return convert2p3     (color);
        case 'a98':   return convert2a98    (color);
        case 'pro':   return convert2pro    (color);
        case 'r2020': return convert2r2020  (color);

        case 'hsv':   return convert2hsv    (color);
        case 'hsl':   return convert2hsl    (color);

        case 'hclok': return convert2hclok  (color);
        case 'hclab': return convert2hclab  (color);
        case 'hcluv': return convert2hcluv  (color);

        case 'oklab': return dataColor2oklab(color);
        case 'lab':   return convert2lab    (color);
        case 'luv':   return convert2luv    (color);

        case 'xyz':   return convert2xyz    (color);
        case 'xyz50': return convert2xyz50  (color);
        case 'xyz65': return convert2xyz65  (color);
    }
}



function convert2rgb(fromColor)
{
    const col = dataColor2array(fromColor);

    let rgb;

    switch (fromColor[0])
    {
        case 'hex':
        case 'rgb':   rgb =           col ; break;

        case 'lin':   rgb = lin2rgb  (col); break;
        case 'p3':    rgb = p32rgb   (col); break;
        case 'a98':   rgb = a982rgb  (col); break;
        case 'pro':   rgb = pro2rgb  (col); break;
        case 'r2020': rgb = r20202rgb(col); break;

        case 'hsv':   rgb = hsv2rgb  (col); break;
        case 'hsl':   rgb = hsl2rgb  (col); break;

        case 'hclok': rgb = hclok2rgb(col); break;
        case 'hclab': rgb = hclab2rgb(col); break;
        case 'hcluv': rgb = hcluv2rgb(col); break;

        case 'oklab': rgb = oklab2rgb(col); break;
        case 'lab':   rgb = lab2rgb  (col); break;
        case 'luv':   rgb = luv2rgb  (col); break;

        case 'xyz':   rgb = xyz2rgb  (col);           break;
        case 'xyz50': rgb = xyz2rgb  (col, sRGB_D50); break;
        case 'xyz65': rgb = xyz2rgb  (col, sRGB_D65); break;
    }

    return rgb2dataColor(rgb);
}



function convert2lin(fromColor)
{
    const col = dataColor2array(fromColor);

    let lin;

    switch (fromColor[0])
    {
        case 'hex':
        case 'rgb':   lin = rgb2lin          (col) ; break;

        case 'lin':   lin =                   col  ; break;
        case 'p3':    lin = rgb2lin(p32rgb   (col)); break;
        case 'a98':   lin = rgb2lin(a982rgb  (col)); break;
        case 'pro':   lin = rgb2lin(pro2rgb  (col)); break;
        case 'r2020': lin = rgb2lin(r20202rgb(col)); break;

        case 'hsv':   lin = rgb2lin(hsv2rgb  (col)); break;
        case 'hsl':   lin = rgb2lin(hsl2rgb  (col)); break;

        case 'hclok': lin = rgb2lin(hclok2rgb(col)); break;
        case 'hclab': lin = rgb2lin(hclab2rgb(col)); break;
        case 'hcluv': lin = rgb2lin(hcluv2rgb(col)); break;

        case 'oklab': lin = rgb2lin(oklab2rgb(col)); break;
        case 'lab':   lin = rgb2lin(lab2rgb  (col)); break;
        case 'luv':   lin = rgb2lin(luv2rgb  (col)); break;

        case 'xyz':   lin = xyz2lin          (col);           break;
        case 'xyz50': lin = xyz2lin          (col, sRGB_D50); break;
        case 'xyz65': lin = xyz2lin          (col, sRGB_D65); break;
    }

    return [
       'lin',
        lin[0],
        lin[1],
        lin[2] ];
}



function convert2p3(fromColor)
{
    const col = dataColor2array(fromColor);

    let p3;

    switch (fromColor[0])
    {
        case 'hex':
        case 'rgb':   p3 = rgb2p3          (col) ; break;

        case 'lin':   p3 = rgb2p3(lin2rgb  (col)); break;
        case 'p3':    p3 =                  col  ; break;
        case 'a98':   p3 = rgb2p3(a982rgb  (col)); break;
        case 'pro':   p3 = rgb2p3(pro2rgb  (col)); break;
        case 'r2020': p3 = rgb2p3(r20202rgb(col)); break;

        case 'hsv':   p3 = rgb2p3(hsv2rgb  (col)); break;
        case 'hsl':   p3 = rgb2p3(hsl2rgb  (col)); break;

        case 'hclok': p3 = rgb2p3(hclok2rgb(col)); break;
        case 'hclab': p3 = rgb2p3(hclab2rgb(col)); break;
        case 'hcluv': p3 = rgb2p3(hcluv2rgb(col)); break;

        case 'oklab': p3 = rgb2p3(oklab2rgb(col)); break;
        case 'lab':   p3 = rgb2p3(lab2rgb  (col)); break;
        case 'luv':   p3 = rgb2p3(luv2rgb  (col)); break;

        case 'xyz':   p3 = rgb2p3(xyz2rgb  (col));           break;
        case 'xyz50': p3 = rgb2p3(xyz2rgb  (col, sRGB_D50)); break;
        case 'xyz65': p3 = rgb2p3(xyz2rgb  (col, sRGB_D65)); break;
    }

    return [
        'p3',
         p3[0],
         p3[1],
         p3[2] ];
 }



function convert2a98(fromColor)
{
    const col = dataColor2array(fromColor);

    let a98;

    switch (fromColor[0])
    {
        case 'hex':
        case 'rgb':   a98 = rgb2a98          (col) ; break;

        case 'lin':   a98 = rgb2a98(lin2rgb  (col)); break;
        case 'p3':    a98 = rgb2a98(p32rgb   (col)); break;
        case 'a98':   a98 =                   col  ; break;
        case 'pro':   a98 = rgb2a98(pro2rgb  (col)); break;
        case 'r2020': a98 = rgb2a98(r20202rgb(col)); break;

        case 'hsv':   a98 = rgb2a98(hsv2rgb  (col)); break;
        case 'hsl':   a98 = rgb2a98(hsl2rgb  (col)); break;

        case 'hclok': a98 = rgb2a98(hclok2rgb(col)); break;
        case 'hclab': a98 = rgb2a98(hclab2rgb(col)); break;
        case 'hcluv': a98 = rgb2a98(hcluv2rgb(col)); break;

        case 'oklab': a98 = rgb2a98(oklab2rgb(col)); break;
        case 'lab':   a98 = rgb2a98(lab2rgb  (col)); break;
        case 'luv':   a98 = rgb2a98(luv2rgb  (col)); break;

        case 'xyz':   a98 = rgb2a98(xyz2rgb  (col));           break;
        case 'xyz50': a98 = rgb2a98(xyz2rgb  (col, sRGB_D50)); break;
        case 'xyz65': a98 = rgb2a98(xyz2rgb  (col, sRGB_D65)); break;
    }

    return [
        'a98',
         a98[0],
         a98[1],
         a98[2] ];
 }



function convert2pro(fromColor)
{
    const col = dataColor2array(fromColor);

    let pro;

    switch (fromColor[0])
    {
        case 'hex':
        case 'rgb':   pro = rgb2pro          (col) ; break;

        case 'lin':   pro = rgb2pro(lin2rgb  (col)); break;
        case 'p3':    pro = rgb2pro(p32rgb   (col)); break;
        case 'a98':   pro = rgb2pro(a982rgb  (col)); break;
        case 'pro':   pro =                   col  ; break;
        case 'r2020': pro = rgb2pro(r20202rgb(col)); break;

        case 'hsv':   pro = rgb2pro(hsv2rgb  (col)); break;
        case 'hsl':   pro = rgb2pro(hsl2rgb  (col)); break;

        case 'hclok': pro = rgb2pro(hclok2rgb(col)); break;
        case 'hclab': pro = rgb2pro(hclab2rgb(col)); break;
        case 'hcluv': pro = rgb2pro(hcluv2rgb(col)); break;

        case 'oklab': pro = rgb2pro(oklab2rgb(col)); break;
        case 'lab':   pro = rgb2pro(lab2rgb  (col)); break;
        case 'luv':   pro = rgb2pro(luv2rgb  (col)); break;

        case 'xyz':   pro = rgb2pro(xyz2rgb  (col));           break;
        case 'xyz50': pro = rgb2pro(xyz2rgb  (col, sRGB_D50)); break;
        case 'xyz65': pro = rgb2pro(xyz2rgb  (col, sRGB_D65)); break;
    }

    return [
        'pro',
         pro[0],
         pro[1],
         pro[2] ];
}



function convert2r2020(fromColor)
{
    const col = dataColor2array(fromColor);

    let r2020;

    switch (fromColor[0])
    {
        case 'hex':
        case 'rgb':   r2020 = rgb2r2020          (col) ; break;

        case 'lin':   r2020 = rgb2r2020(lin2rgb  (col)); break;
        case 'p3':    r2020 = rgb2r2020(p32rgb   (col)); break;
        case 'a98':   r2020 = rgb2r2020(a982rgb  (col)); break;
        case 'pro':   r2020 = rgb2r2020(r20202rgb(col)); break;
        case 'r2020': r2020 =                     col  ; break;

        case 'hsv':   r2020 = rgb2r2020(hsv2rgb  (col)); break;
        case 'hsl':   r2020 = rgb2r2020(hsl2rgb  (col)); break;

        case 'hclok': r2020 = rgb2r2020(hclok2rgb(col)); break;
        case 'hclab': r2020 = rgb2r2020(hclab2rgb(col)); break;
        case 'hcluv': r2020 = rgb2r2020(hcluv2rgb(col)); break;

        case 'oklab': r2020 = rgb2r2020(oklab2rgb(col)); break;
        case 'lab':   r2020 = rgb2r2020(lab2rgb  (col)); break;
        case 'luv':   r2020 = rgb2r2020(luv2rgb  (col)); break;

        case 'xyz':   r2020 = rgb2r2020(xyz2rgb  (col));           break;
        case 'xyz50': r2020 = rgb2r2020(xyz2rgb  (col, sRGB_D50)); break;
        case 'xyz65': r2020 = rgb2r2020(xyz2rgb  (col, sRGB_D65)); break;
    }

    return [
        'r2020',
         r2020[0],
         r2020[1],
         r2020[2] ];
}



function convert2hsv(fromColor)
{
    const col = dataColor2array(fromColor);
    
    let hsv;
    
    switch (fromColor[0])
    {
        case 'hex':
        case 'rgb':   hsv = rgb2hsv(          col ); break;

        case 'lin':   hsv = rgb2hsv(lin2rgb  (col)); break;                  col  ; break;
        case 'p3':    hsv = rgb2hsv(p32rgb   (col)); break;
        case 'a98':   hsv = rgb2hsv(a982rgb  (col)); break;
        case 'pro':   hsv = rgb2hsv(pro2rgb  (col)); break;
        case 'r2020': hsv = rgb2hsv(r20202rgb(col)); break;

        case 'hsv':   hsv =                   col;   break;
        case 'hsl':   hsv = rgb2hsv(hsl2rgb  (col)); break;

        case 'hclok': hsv = rgb2hsv(hclok2rgb(col)); break;
        case 'hclab': hsv = rgb2hsv(hclab2rgb(col)); break;
        case 'hcluv': hsv = rgb2hsv(hcluv2rgb(col)); break;

        case 'oklab': hsv = rgb2hsv(oklab2rgb(col)); break;
        case 'lab':   hsv = rgb2hsv(lab2rgb  (col)); break;
        case 'luv':   hsv = rgb2hsv(luv2rgb  (col)); break;

        case 'xyz':   hsv = rgb2hsv(xyz2rgb  (col));           break;
        case 'xyz50': hsv = rgb2hsv(xyz2rgb  (col, sRGB_D50)); break;
        case 'xyz65': hsv = rgb2hsv(xyz2rgb  (col, sRGB_D65)); break;
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

        case 'lin':   hsl = rgb2hsl(lin2rgb  (col)); break;                  col  ; break;
        case 'p3':    hsl = rgb2hsl(p32rgb   (col)); break;
        case 'a98':   hsl = rgb2hsl(a982rgb  (col)); break;
        case 'pro':   hsl = rgb2hsl(pro2rgb  (col)); break;
        case 'r2020': hsl = rgb2hsl(r20202rgb(col)); break;

        case 'hsv':   hsl = rgb2hsl(hsv2rgb  (col)); break;
        case 'hsl':   hsl =                   col;   break;

        case 'hclok': hsl = rgb2hsl(hclok2rgb(col)); break;
        case 'hclab': hsl = rgb2hsl(hclab2rgb(col)); break;
        case 'hcluv': hsl = rgb2hsl(hcluv2rgb(col)); break;

        case 'oklab': hsl = rgb2hsl(oklab2rgb(col)); break;
        case 'lab':   hsl = rgb2hsl(lab2rgb  (col)); break;
        case 'luv':   hsl = rgb2hsl(luv2rgb  (col)); break;

        case 'xyz':   hsl = rgb2hsl(xyz2rgb  (col));           break;
        case 'xyz50': hsl = rgb2hsl(xyz2rgb  (col, sRGB_D50)); break;
        case 'xyz65': hsl = rgb2hsl(xyz2rgb  (col, sRGB_D65)); break;
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

        case 'lin':   lab = rgb2oklab(lin2rgb  (col)); break;                  col  ; break;
        case 'p3':    lab = rgb2oklab(p32rgb   (col)); break;
        case 'a98':   lab = rgb2oklab(a982rgb  (col)); break;
        case 'pro':   lab = rgb2oklab(pro2rgb  (col)); break;
        case 'r2020': lab = rgb2oklab(r20202rgb(col)); break;

        case 'hsv':   lab = rgb2oklab(hsv2rgb  (col)); break;
        case 'hsl':   lab = rgb2oklab(hsl2rgb  (col)); break;

        case 'hclok': lab = rgb2oklab(hclok2rgb(col)); break;
        case 'hclab': lab = rgb2oklab(hclab2rgb(col)); break;
        case 'hcluv': lab = rgb2oklab(hcluv2rgb(col)); break;

        case 'oklab': lab =                     col;   break;
        case 'lab':   lab = rgb2oklab(lab2rgb  (col)); break;
        case 'luv':   lab = rgb2oklab(luv2rgb  (col)); break;

        case 'xyz':   lab = rgb2oklab(xyz2rgb  (col));           break;
        case 'xyz50': lab = rgb2oklab(xyz2rgb  (col, sRGB_D50)); break;
        case 'xyz65': lab = rgb2oklab(xyz2rgb  (col, sRGB_D65)); break;
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

        case 'lin':   lab = rgb2lab(lin2rgb  (col)); break;                  col  ; break;
        case 'p3':    lab = rgb2lab(p32rgb   (col)); break;
        case 'a98':   lab = rgb2lab(a982rgb  (col)); break;
        case 'pro':   lab = rgb2lab(pro2rgb  (col)); break;
        case 'r2020': lab = rgb2lab(r20202rgb(col)); break;
        case 'hsv':   lab = rgb2lab(hsv2rgb  (col)); break;

        case 'hsl':   lab = rgb2lab(hsl2rgb  (col)); break;

        case 'hclok': lab = rgb2lab(hclok2rgb(col)); break;
        case 'hclab': lab =         hclab2lab(col);  break;
        case 'hcluv': lab = rgb2lab(hcluv2rgb(col)); break;

        case 'oklab': lab = rgb2lab(oklab2rgb(col)); break;
        case 'lab':   lab =                   col;   break;
        case 'luv':   lab = rgb2lab(luv2rgb  (col)); break;

        case 'xyz':   lab = xyz2lab          (col, sRGB.W);     break;
        case 'xyz50': lab = xyz2lab          (col, sRGB_D50.W); break;
        case 'xyz65': lab = xyz2lab          (col, sRGB_D65.W); break;
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

        case 'lin':   luv = rgb2luv(lin2rgb  (col)); break;                  col  ; break;
        case 'p3':    luv = rgb2luv(p32rgb   (col)); break;
        case 'a98':   luv = rgb2luv(a982rgb  (col)); break;
        case 'pro':   luv = rgb2luv(pro2rgb  (col)); break;
        case 'r2020': luv = rgb2luv(r20202rgb(col)); break;

        case 'hsv':   luv = rgb2luv(hsv2rgb  (col)); break;
        case 'hsl':   luv = rgb2luv(hsl2rgb  (col)); break;

        case 'hclok': luv = rgb2luv(hclok2rgb(col)); break;
        case 'hclab': luv = rgb2luv(hclab2rgb(col)); break;
        case 'hcluv': luv =         hcluv2luv(col);  break;

        case 'oklab': luv = rgb2luv(oklab2rgb(col)); break;
        case 'lab':   luv = rgb2luv(lab2rgb  (col)); break;
        case 'luv':   luv =                   col;   break;

        case 'xyz':   luv = xyz2luv          (col, sRGB.W);     break;
        case 'xyz50': luv = xyz2luv          (col, sRGB_D50.W); break;
        case 'xyz65': luv = xyz2luv          (col, sRGB_D65.W); break;
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

        case 'lin':   hcl = rgb2hclok(lin2rgb  (col)); break;                  col  ; break;
        case 'p3':    hcl = rgb2hclok(p32rgb   (col)); break;
        case 'a98':   hcl = rgb2hclok(a982rgb  (col)); break;
        case 'pro':   hcl = rgb2hclok(pro2rgb  (col)); break;
        case 'r2020': hcl = rgb2hclok(r20202rgb(col)); break;

        case 'hsv':   hcl = rgb2hclok(hsv2rgb  (col)); break;
        case 'hsl':   hcl = rgb2hclok(hsl2rgb  (col)); break;

        case 'hclok': hcl =                     col;   break;
        case 'hclab': hcl = rgb2hclok(hclab2rgb(col)); break;
        case 'hcluv': hcl = rgb2hclok(hcluv2rgb(col)); break;

        case 'oklab': hcl = rgb2hclok(oklab2rgb(col)); break;
        case 'lab':   hcl = rgb2hclok(lab2rgb  (col)); break;
        case 'luv':   hcl = rgb2hclok(luv2rgb  (col)); break;

        case 'xyz':   hcl = rgb2hclok(xyz2rgb  (col));           break;
        case 'xyz50': hcl = rgb2hclok(xyz2rgb  (col, sRGB_D50)); break;
        case 'xyz65': hcl = rgb2hclok(xyz2rgb  (col, sRGB_D65)); break;
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
        
        case 'lin':   lab = rgb2hclab(lin2rgb  (col)); break;                  col  ; break;
        case 'p3':    lab = rgb2hclab(p32rgb   (col)); break;
        case 'a98':   lab = rgb2hclab(a982rgb  (col)); break;
        case 'pro':   lab = rgb2hclab(pro2rgb  (col)); break;
        case 'r2020': lab = rgb2hclab(r20202rgb(col)); break;

        case 'hsv':   lab = rgb2hclab(hsv2rgb  (col)); break;
        case 'hsl':   lab = rgb2hclab(hsl2rgb  (col)); break;
        
        case 'hclok': lab = rgb2hclab(hclok2rgb(col)); break;
        case 'hclab': lab =                     col;   break;
        case 'hcluv': lab = rgb2hclab(hcluv2rgb(col)); break;
        
        case 'oklab': lab = rgb2hclab(oklab2rgb(col)); break;
        case 'lab':   lab = lab2hclab(          col ); break;
        case 'luv':   lab = rgb2hclab(luv2rgb  (col)); break;

        case 'xyz':   lab = rgb2hclab(xyz2rgb  (col));           break;
        case 'xyz50': lab = rgb2hclab(xyz2rgb  (col, sRGB_D50)); break;
        case 'xyz65': lab = rgb2hclab(xyz2rgb  (col, sRGB_D65)); break;
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

        case 'lin':   hcl = rgb2hcluv(lin2rgb  (col)); break;                  col  ; break;
        case 'p3':    hcl = rgb2hcluv(p32rgb   (col)); break;
        case 'a98':   hcl = rgb2hcluv(a982rgb  (col)); break;
        case 'pro':   hcl = rgb2hcluv(pro2rgb  (col)); break;
        case 'r2020': hcl = rgb2hcluv(r20202rgb(col)); break;

        case 'hsv':   hcl = rgb2hcluv(hsv2rgb  (col)); break;
        case 'hsl':   hcl = rgb2hcluv(hsl2rgb  (col)); break;

        case 'hclab': hcl = rgb2hcluv(hclab2rgb(col)); break;
        case 'hcluv': hcl =                     col;   break;
        case 'hclok': hcl = rgb2hcluv(hclok2rgb(col)); break;

        case 'oklab': hcl = rgb2hcluv(oklab2rgb(col)); break;
        case 'lab':   hcl = rgb2hcluv(lab2rgb  (col)); break;
        case 'luv':   hcl = luv2hcluv(          col ); break;

        case 'xyz':   hcl = rgb2hcluv(xyz2rgb  (col));           break;
        case 'xyz50': hcl = rgb2hcluv(xyz2rgb  (col, sRGB_D50)); break;
        case 'xyz65': hcl = rgb2hcluv(xyz2rgb  (col, sRGB_D65)); break;
    }

    return [
       'hcluv',
        hcl[0],
        hcl[1],
        hcl[2] ];
}



function convert2xyz(fromColor)
{
    const col = dataColor2array(fromColor);

    let xyz;

    switch (fromColor[0])
    {
        case 'hex':
        case 'rgb':   xyz = rgb2xyz(          col ); break;

        case 'lin':   xyz = rgb2xyz(lin2rgb  (col)); break;                  col  ; break;
        case 'p3':    xyz = rgb2xyz(p32rgb   (col)); break;
        case 'a98':   xyz = rgb2xyz(a982rgb  (col)); break;
        case 'pro':   xyz = rgb2xyz(pro2rgb  (col)); break;
        case 'r2020': xyz = rgb2xyz(r20202rgb(col)); break;

        case 'hsv':   xyz = rgb2xyz(hsv2rgb  (col)); break;
        case 'hsl':   xyz = rgb2xyz(hsl2rgb  (col)); break;

        case 'hclab': xyz = rgb2xyz(hclab2rgb(col)); break;
        case 'hcluv': xyz = rgb2xyz(hclab2rgb(col)); break;
        case 'hclok': xyz = rgb2xyz(hclok2rgb(col)); break;

        case 'oklab': xyz = rgb2xyz(oklab2rgb(col)); break;
        case 'lab':   xyz = lab2xyz(          col, sRGB.W); break;
        case 'luv':   xyz = luv2xyz(          col, sRGB.W); break;

        case 'xyz':   xyz =                   col;             break;
        case 'xyz50': xyz = rgb2xyz(xyz2rgb  (col, sRGB_D50)); break;
        case 'xyz65': xyz = rgb2xyz(xyz2rgb  (col, sRGB_D65)); break;
    }

    return [
       'xyz',
        xyz[0],
        xyz[1],
        xyz[2] ];
}



function convert2xyz50(fromColor)
{
    const col = dataColor2array(fromColor);

    let xyz;

    switch (fromColor[0])
    {
        case 'hex':
        case 'rgb':   xyz = rgb2xyz(          col,  sRGB_D50);    break;

        case 'lin':   xyz = rgb2xyz(lin2rgb  (col), sRGB_D50);   break;                  col  ; break;
        case 'p3':    xyz = rgb2xyz(p32rgb   (col), sRGB_D50);   break;
        case 'a98':   xyz = rgb2xyz(a982rgb  (col), sRGB_D50);   break;
        case 'pro':   xyz = rgb2xyz(pro2rgb  (col), sRGB_D50);   break;
        case 'r2020': xyz = rgb2xyz(r20202rgb(col), sRGB_D50);   break;

        case 'hsv':   xyz = rgb2xyz(hsv2rgb  (col), sRGB_D50);   break;
        case 'hsl':   xyz = rgb2xyz(hsl2rgb  (col), sRGB_D50);   break;

        case 'hclab': xyz = rgb2xyz(hclab2rgb(col), sRGB_D50);   break;
        case 'hcluv': xyz = rgb2xyz(hclab2rgb(col), sRGB_D50);   break;
        case 'hclok': xyz = rgb2xyz(hclok2rgb(col), sRGB_D50);   break;

        case 'oklab': xyz = rgb2xyz(oklab2rgb(col), sRGB_D50);   break;
        case 'lab':   xyz = lab2xyz(          col,  sRGB_D50.W); break;
        case 'luv':   xyz = luv2xyz(          col,  sRGB_D50.W); break;

        case 'xyz':   xyz = rgb2xyz(xyz2rgb  (col), sRGB_D50);   break;
        case 'xyz50': xyz =                   col;               break;
        case 'xyz65': xyz = rgb2xyz(xyz2rgb  (col), sRGB_D50);   break;
    }

    return [
       'xyz50',
        xyz[0],
        xyz[1],
        xyz[2] ];
}



function convert2xyz65(fromColor)
{
    const col = dataColor2array(fromColor);

    let xyz;

    switch (fromColor[0])
    {
        case 'hex':
        case 'rgb':   xyz = rgb2xyz(          col,  sRGB_D65);    break;

        case 'lin':   xyz = rgb2xyz(lin2rgb  (col), sRGB_D65);   break;                  col  ; break;
        case 'p3':    xyz = rgb2xyz(p32rgb   (col), sRGB_D65);   break;
        case 'a98':   xyz = rgb2xyz(a982rgb  (col), sRGB_D65);   break;
        case 'pro':   xyz = rgb2xyz(pro2rgb  (col), sRGB_D65);   break;
        case 'r2020': xyz = rgb2xyz(r20202rgb(col), sRGB_D65);   break;

        case 'hsv':   xyz = rgb2xyz(hsv2rgb  (col), sRGB_D65);   break;
        case 'hsl':   xyz = rgb2xyz(hsl2rgb  (col), sRGB_D65);   break;

        case 'hclab': xyz = rgb2xyz(hclab2rgb(col), sRGB_D65);   break;
        case 'hcluv': xyz = rgb2xyz(hclab2rgb(col), sRGB_D65);   break;
        case 'hclok': xyz = rgb2xyz(hclok2rgb(col), sRGB_D65);   break;

        case 'oklab': xyz = rgb2xyz(oklab2rgb(col), sRGB_D65);   break;
        case 'lab':   xyz = lab2xyz(          col,  sRGB_D65.W); break;
        case 'luv':   xyz = luv2xyz(          col,  sRGB_D65.W); break;

        case 'xyz':   xyz = rgb2xyz(xyz2rgb  (col), sRGB_D65);   break;
        case 'xyz50': xyz = rgb2xyz(xyz2rgb  (col, sRGB_D50), sRGB_D65);   break;
        case 'xyz65': xyz =                   col;               break;
    }

    return [
       'xyz65',
        xyz[0],
        xyz[1],
        xyz[2] ];
}