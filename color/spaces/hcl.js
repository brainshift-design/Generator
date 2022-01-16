function opp2pol(opp) // opponent to polar
{
    // either lab or luv, 
    // the polar transformation is the same

    const l = opp[0], 
          a = opp[1], 
          b = opp[2];

    const h = Math.atan2(b, a);
    const c = Math.sqrt(a*a + b*b);

    return [
        h/Tau, 
        c*okLabScale, 
        l];
}



function pol2opp(pol) // polar to opponent
{
    // either lab or luv, 
    // the polar transformation is the same

    const h = pol[0], 
          c = pol[1], 
          l = pol[2];

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
    const lab = pol2opp([
        h*Tau,//(h + hueBiasLab) * Tau,
        c / okLabScale,
        l]);

    return oklab2rgb(lab, sRGB);
}    
    
    
    
function rgb2okhcl(rgb)
{
    return rgb2okhcl_(rgb[0], rgb[1], rgb[2]);
}



function rgb2okhcl_(r, g, b)
{
    const hcl = opp2pol(rgb2oklab_(r, g, b));
    return hcl;
    // return [
    //     hcl[0]/Tau - hueBiasLab,
    //     hcl[1] * okLabScale,
    //     hcl[2]];
}



// function rgb2hcl_(r, g, b, colorSpace)
// {
//     if (colorSpace == 0) return opp2pol(rgb2oklab_(r, g, b));
//     else                 return opp2pol(xyz2col(rgb2xyz_(r, g, b), sRGB.W));
// }