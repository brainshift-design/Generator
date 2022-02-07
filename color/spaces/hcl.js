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



function hcllab2lab(hcl)
{
    hcl[0] *= Tau;
    hcl[1] *= hcl[2];
    return pol2opp(hcl);
}



function hcllab2rgb(hcl, cs = sRGB)
{
    return lab2rgb(hcllab2lab(hcl), cs);
}



function lab2hcllab(lab)
{
    let hcl = opp2pol(lab);
    hcl[0] /= Tau;
    hcl[1] /= hcl[2];
    return hcl;
}



function rgb2hcllab(rgb, cs = sRGB)
{
    return lab2hcllab(rgb2lab(rgb, cs));
}



function hclluv2luv(hcl)
{
    hcl[0] *= Tau;
    hcl[1] *= hcl[2];
    return pol2opp(hcl);
}



function hclluv2rgb(hcl, cs = sRGB)
{
    return luv2rgb(hclluv2luv(hcl), cs);
}



function luv2hclluv(luv)
{
    let hcl = opp2pol(luv);
    hcl[0] /= Tau;
    hcl[1] /= hcl[2];
    return hcl;
}



function rgb2hclluv(rgb, cs = sRGB)
{
    return luv2hclluv(rgb2luv(rgb, cs));
}