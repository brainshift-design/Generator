function rgb2xyz(rgb, cs)
{ 
    return rgb2xyz_(rgb[0], rgb[1], rgb[2], cs);
}    



function rgb2xyz_(r, g, b, cs)
{ 
    let rgb = [
        cs.degamma(r),
        cs.degamma(g),
        cs.degamma(b) ];

    return lrgb2xyz(rgb, cs);
}    



function lrgb2xyz(rgb, cs)
{
    return mulv3m3(rgb, cs.lin2xyz);
}        



function xyz2rgb(xyz, cs)
{
    let rgb = xyz2lrgb(xyz, cs);

    return [
        cs.regamma(rgb[0]),
        cs.regamma(rgb[1]),
        cs.regamma(rgb[2]) ];
}



function xyz2lrgb(xyz, cs)
{
    return mulv3m3(xyz, cs.xyz2lin);
}



