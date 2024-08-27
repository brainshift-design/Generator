function hclok2rgb(hcl, cs = sRGB)
{
    hcl = [...hcl];

    hcl[0] *= Tau;
    hcl[1] *= hcl[2]; 

    return oklab2rgb(pol2opp(hcl), cs);
}    



function hclok2rgb_(h, c, l, cs = sRGB)
{
    return hclok2rgb([h, c, l], cs);
}    
    
    
    
function rgb2hclok(rgb, cs = sRGB)
{
    const hcl = opp2pol(rgb2oklab(rgb, cs));

    hcl[0] /= Tau;
    hcl[1] /= nozero(hcl[2]);

    while (hcl[0] < 0) hcl[0] += 1;
    while (hcl[0] > 1) hcl[0] -= 1;

    return hcl;
}



function rgb2hclok_(r, g, b, cs = sRGB)
{
    return rgb2hclok([r, g, b], cs);
}



function hclab2lab(hcl)
{
    hcl = [...hcl];

    hcl[0] *= Tau;
    hcl[1] *= hcl[2];

    return pol2opp(hcl);
}



function hclab2rgb(hcl, cs = sRGB)
{
    return lab2rgb(hclab2lab(hcl), cs);
}



function hclab2rgb_(h, c, l, cs = sRGB)
{
    return hclab2rgb([h, c, l], cs);
}



function lab2hclab(lab)
{
    let hcl = opp2pol(lab);

    hcl[0] /= Tau;
    hcl[1] /= hcl[2];

    while (hcl[0] < 0) hcl[0] += 1;
    while (hcl[0] > 1) hcl[0] -= 1;

    return hcl;
}



function rgb2hclab(rgb, cs = sRGB)
{
    return lab2hclab(rgb2lab(rgb, cs));
}



function hcluv2luv(hcl)
{
    hcl = [...hcl];

    hcl[0] *= Tau;
    hcl[1] *= hcl[2];

    return pol2opp(hcl);
}



function hcluv2rgb(hcl, cs = sRGB)
{
    return luv2rgb(hcluv2luv(hcl), cs);
}



function hcluv2rgb_(h, c, l, cs = sRGB)
{
    return hcluv2rgb([h, c, l], cs);
}



function luv2hcluv(luv)
{
    let hcl = opp2pol(luv);

    hcl[0] /= Tau;
    hcl[1] /= hcl[2];

    while (hcl[0] < 0) hcl[0] += 1;
    while (hcl[0] > 1) hcl[0] -= 1;

    return hcl;
}



function rgb2hcluv(rgb, cs = sRGB)
{
    return luv2hcluv(rgb2luv(rgb, cs));
}