const sRGB = createColorSpace
(
    [0.64, 0.33], // R
    [0.3,  0.6 ], // G
    [0.15, 0.06], // B

    [0.212656,
     0.715158,
     0.072186], // Y

    D65, // W

    2.4, // gamma



    function(v) // degamma
    {
        return v > 0.04045
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
