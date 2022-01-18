function hclokl2rgb(hcl, cs = sRGB)
{
    hcl[0] *= Tau;
    hcl[1] *= hcl[2]; 
    return oklab2rgb(pol2opp(hcl), cs);
}    



function hclokl2rgb_(h, c, l, cs = sRGB)
{
    return hclokl2rgb_([h, c, l], cs);
}    
    
    
    
function rgb2hclokl(rgb, cs = sRGB)
{
    const hcl = opp2pol(rgb2oklab(rgb, cs));
    hcl[0] /= Tau;
    hcl[1] /= hcl[2];
    return hcl;
}



function rgb2hclokl_(r, g, b, cs = sRGB)
{
    return rgb2hclokl([r, g, b], cs);
}



function hcllab2rgb(hcl, cs = sRGB)
{
    hcl[0] *= Tau;
    hcl[1] *= hcl[2];
    return lab2rgb(pol2opp(hcl), cs);
}



function rgb2hcllab(rgb, cs = sRGB)
{
    let hcl = opp2pol(rgb2lab(rgb, cs));
    hcl[0] /= Tau;
    hcl[1] /= hcl[2];
    return hcl;
}



function hclluv2rgb(hcl, cs = sRGB)
{
    hcl[0] *= Tau;
    hcl[1] *= hcl[2];
    return luv2rgb(pol2opp(hcl), cs);
}



function rgb2hclluv(rgb, cs = sRGB)
{
    let hcl = opp2pol(rgb2luv(rgb, cs));
    hcl[0] /= Tau;
    hcl[1] /= hcl[2];
    return hcl;
}