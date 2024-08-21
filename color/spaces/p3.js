const P3 = createColorSpace
(
    [0.68,  0.32], // R
    [0.265, 0.69], // G
    [0.15,  0.06], // B

    [0.228974,  // Y
     0.691738,
     0.079289],

    D65,        // W

    2.4,        // gamma


    function(v) // degamma
    {
        return v >= 0.04045
               ? Math.pow((v + 0.055) / 1.055, this.gamma)
               : v / 12.92;
    },
    

    function(v) // regamma
    {
        return v > 0.0031308
               ? 1.055 * Math.pow(v, 1/this.gamma) - 0.055
               : v * 12.92;
    },
    

    function(rgb) // luminance
    {
        return  this.Y[0] * this.degamma(rgb[0]) 
              + this.Y[1] * this.degamma(rgb[1]) 
              + this.Y[2] * this.degamma(rgb[2]);
    }
);



function rgb2p3(rgb)
{
    return xyz2rgb(rgb2xyz(rgb), P3);
}



function p32rgb(p3)
{
    return xyz2rgb(rgb2xyz(p3, P3));
}