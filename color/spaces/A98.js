const AdobeRGB = createColorSpace
(
    [0.64, 0.33], // R
    [0.21, 0.71], // G
    [0.15, 0.06], // B

    [0.297361,
     0.627355,
     0.075284], // Y

    D65,        // W

    563/256,    // gamma 


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



function rgb2a98(rgb)
{
    return xyz2rgb(rgb2xyz(rgb), Adobe98);
}



function a982rgb(a98)
{
    return xyz2rgb(rgb2xyz(a98, Adobe98));
}