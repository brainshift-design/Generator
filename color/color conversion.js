function col2xyz(col, colorSpace, w = sRGB.W)
{
    if (colorSpace == 1) return lab2xyz(col, w);
    else                 return luv2xyz(col, w);
}


function xyz2col(col, w = sRGB.W)
{
    switch (setColorSpace)
    {
        case 2: return xyz2lab(col, w);
        case 1: return xyz2luv(col, w);
    }
}