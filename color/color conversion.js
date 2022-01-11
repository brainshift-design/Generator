function lab2lch(lab) 
{
    // either lab or luv, 
    // the polar transformation is the same

    const l = lab[0], 
          a = lab[1], 
          b = lab[2];

    const c = Math.sqrt(a*a + b*b);
    const h = Math.atan2(b, a);

    return [l, c, h];
}



function lch2lab(lch)
{
    // either lab or luv, 
    // the polar transformation is the same

    const l = lch[0], 
          c = lch[1], 
          h = lch[2];

    const a = c * Math.cos(h);
    const b = c * Math.sin(h);

    return [l, a, b];
}



function _lch2rgb(l, c, h, colorSpace, cones)
{
    if (colorSpace == 0)
    {
        return allConesWork(cones)
             ? oklch2rgb_(l, c, h)
             : oklch2rgb_CB(l, c, h, colorSpace, cones);
    }
    else
    {
        return allConesWork(cones)
             ? lch2rgb_(l, c, h, colorSpace)
             : lch2rgb_CB(l, c, h, colorSpace, cones);
    }
}

 

function col2xyz(col, w, colorSpace)
{
    if (colorSpace == 1) return lab2xyz(col, w);
    else                 return luv2xyz(col, w);
}


function xyz2col(col, w)
{
    switch (setColorSpace)
    {
        case 2: return xyz2lab(col, w);
        case 1: return xyz2luv(col, w);
    }
}
    
    

function lch2rgb_(l, c, h, colorSpace)
{
    const col = lch2col([
        l, 
        c * l/100, 
        h + (colorSpace == 1 ? hueBiasLab : hueBiasLuv)]);

    const xyz = col2xyz(col, sRGB.W, colorSpace);

    return xyz2rgb(xyz, sRGB);
}    
    
    
    
function oklch2rgb_(l, c, h)
{
    const lab = lch2col([
        l, 
        c/okLabScale * l/100, 
        h + hueBiasLab ]);

    return oklab2rgb(lab, sRGB);
}    
    
    
    
function rgb2lch(rgb, colorSpace)
{
    return rgb2lch_(rgb[0], rgb[1], rgb[2], colorSpace);
}



function rgb2lch_(r, g, b, colorSpace)
{
    if (colorSpace == 0) return lab2lch(rgb2oklab_(r, g, b, sRGB));
    else                 return lab2lch(xyz2col(rgb2xyz_(r, g, b, sRGB), sRGB.W));
}