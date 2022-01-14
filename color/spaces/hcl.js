function lab2hcl(lab) 
{
    // either lab or luv, 
    // the polar transformation is the same

    const l = lab[0], 
          a = lab[1], 
          b = lab[2];

    const h = Math.atan2(b, a);
    const c = Math.sqrt(a*a + b*b);

    return [
        h/Tau, 
        c*okLabScale, 
        l];
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



function okhcl2rgb(hcl)
{
    return okhcl2rgb_(hcl[0], hcl[1], hcl[2]);
}    
    
    
    
function okhcl2rgb_(h, c, l)
{
    const lab = hcl2lab([
        h*Tau,// + hueBiasLab,
        c/okLabScale,// * l/100, 
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