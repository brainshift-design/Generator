function rgb2xyz(rgb, cs = sRGB)
{ 
    return lrgb2xyz(degamma(rgb, cs), cs);
}    



function lrgb2xyz(rgb, cs = sRGB)
{
    return mulv3m3(rgb, cs.lin2xyz);
}        



function xyz2rgb(xyz, cs = sRGB)
{
    return regamma(xyz2lrgb(xyz, cs), cs);
}



function xyz2lrgb(xyz, cs = sRGB)
{
    return mulv3m3(xyz, cs.xyz2lin);
}