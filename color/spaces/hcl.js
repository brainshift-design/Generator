function lab2hcl(lab) 
{
    // either lab or luv, 
    // the polar transformation is the same

    const l = lab[0], 
          a = lab[1], 
          b = lab[2];

    const c = Math.sqrt(a*a + b*b);
    const h = Math.atan2(b, a);

    return [h, c, l];
}



function hcl2lab(hcl)
{
    // either lab or luv, 
    // the polar transformation is the same

    const h = hcl[0], 
          c = hcl[1], 
          l = hcl[2];

    const a = c * Math.cos(h);
    const b = c * Math.sin(h);

    return [l, a, b];
}



// function _hcl2rgb(h, c, l, colorSpace, cones)
// {
//     if (colorSpace == 0)
//     {
//         return allConesWork(cones)
//              ? okhcl2rgb_  (h, c, l)
//              : okhcl2rgb_CB(h, c, l, colorSpace, cones);
//     }
//     else
//     {
//         return allConesWork(cones)
//              ? hcl2rgb_  (h, c, l, colorSpace)
//              : hcl2rgb_CB(h, c, l, colorSpace, cones);
//     }
// }

 

// function hcl2rgb_(h, c, l)//, colorSpace)
// {
//     const col = hcl2col([
//         h,// + (colorSpace == 1 ? hueBiasLab : hueBiasLuv),
//         c * l/100, 
//         l]);

//     const xyz = col2xyz(col, colorSpace);

//     return xyz2rgb(xyz, sRGB);
// }    
    
    
    
function okhcl2rgb(hcl)
{
    return okhcl2rgb_(hcl[0], hcl[1], hcl[2]);
}    
    
    
    
function okhcl2rgb_(h, c, l)
{
    const lab = hcl2lab([
        h + hueBiasLab,
        c/okLabScale * l/100, 
        l]);

    return oklab2rgb(lab, sRGB);
}    
    
    
    
function rgb2okhcl(rgb)//, colorSpace)
{
    return rgb2okhcl_(rgb[0], rgb[1], rgb[2]);//, colorSpace);
}



function rgb2okhcl_(r, g, b)
{
    return lab2hcl(rgb2oklab_(r, g, b));
}



// function rgb2hcl_(r, g, b, colorSpace)
// {
//     if (colorSpace == 0) return lab2hcl(rgb2oklab_(r, g, b));
//     else                 return lab2hcl(xyz2col(rgb2xyz_(r, g, b), sRGB.W));
// }