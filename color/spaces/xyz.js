function rgb2xyz(rgb, cs = sRGB)
{ 
    return lin2xyz(degamma(rgb, cs), cs);
}    



function lin2xyz(rgb, cs = sRGB)
{
    return mulv3m3(rgb, cs.lin2xyz);
}        



function xyz2rgb(xyz, cs = sRGB)
{
    return regamma(xyz2lin(xyz, cs), cs);
}



function xyz2lin(xyz, cs = sRGB)
{
    return mulv3m3(xyz, cs.xyz2lin);
}