function rgbLightenHsv(rgb, amount)
{
    const hsv = rgb2hsv(rgb);
    hsv[2] *= amount;
    return hsv2rgb(hsv);
}



function rgbSaturateHsv(rgb, amount)
{
    const hsv = rgb2hsv(rgb);
    hsv[1] *= amount;
    return hsv2rgb(hsv);
}



function rgbSaturateHsl(rgb, amount)
{
    const hsl = rgb2hsl(rgb);
    hsl[1] *= amount;
    return hsl2rgb(hsl);
}



function lrgb2rgb_(r, g, b)
{
    return [
        sRGB.degamma(r), 
        sRGB.degamma(g), 
        sRGB.degamma(b)];
}



function lrgb2rgb(rgb)
{
    return lrgb2rgb_(rgb[0], rgb[1], rgb[2]);
}



function rgb2lrgb_(r, g, b)
{
    return [
        sRGB.regamma(r), 
        sRGB.regamma(g), 
        sRGB.regamma(b)];
}



function rgb2lrgb(rgb)
{
    return lrgb2rgb_(rgb[0], rgb[1], rgb[2]);
}



function srgb2p3(rgb)
{
    const p3 = 
        [ [ 0.8225, 0.1774, 0      ],
          [ 0.0332, 0.9669, 0      ],
          [ 0.0171, 0.0724, 0.9108 ] ];

    rgb = degamma(rgb);

    return regamma(dot3(p3, rgb));
}



function p32srgb(rgb) 
{
    const invp3 = 
        [ [ 1.2249, -0.2247, 0      ],
          [-0.0420,  1.0419, 0      ],
          [-0.0197, -0.0786, 1.0979 ] ];
  
    rgb = dot3(invp3, degamma(rgb));
  
    return regamma(rgb);
}



function srgb2a98(rgb)
{
    return xyz2rgb(rgb2xyz(rgb, A98), sRGB);
}



function a982srgb(rgb)
{
    return xyz2rgb(rgb2xyz(rgb, sRGB), A98);
}