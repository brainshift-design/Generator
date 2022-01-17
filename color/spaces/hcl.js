function hclokl2rgb(hcl, cs = sRGB)
{
    return oklab2rgb(pol2opp(hcl), cs);
}    



function hclokl2rgb_(h, c, l, cs = sRGB)
{
    return hclokl2rgb_([h, c, l], cs);
}    
    
    
    
function rgb2hclokl(rgb, cs = sRGB)
{
    const oklab = rgb2oklab(rgb, cs);
    console.log('oklab:', oklab);

    const okhcl = opp2pol(oklab, cs);
    console.log('okhcl:', okhcl);

    return okhcl;
    
    //return opp2pol(rgb2oklab(rgb, cs));
}



function rgb2hclokl_(r, g, b, cs = sRGB)
{
    return rgb2hclokl([r, g, b], cs);
}



function rgb2hcllab(rgb, cs = sRGB)
{
    return opp2pol(rgb2lab(rgb, cs));
}



function hcllab2rgb(hcl, cs = sRGB)
{
    return lab2rgb(pol2opp(hcl), cs);
}



function rgb2hclluv(rgb, cs = sRGB)
{
    return opp2pol(rgb2luv(rgb, cs));
}



function hclluv2rgb(hcl, cs = sRGB)
{
    return luv2rgb(pol2opp(hcl), cs);
}