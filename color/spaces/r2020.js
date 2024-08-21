const Rec2020 = createColorSpace
(
    [0.708, 0.292], // R
    [0.170, 0.797], // G
    [0.131, 0.046], // B

    [0.2627,
     0.6780,
     0.0593],  // Y

    D65,       // W

    2.4,       // gamma 


    function(v) // degamma
    {
        // Rec. 2020 uses a simple power function with a gamma of 2.4.
        return Math.pow(v, this.gamma);
    },


    function(v) // regamma
    {
        // The inverse of the degamma function
        return Math.pow(v, 1 / this.gamma);
    },

    
    function(rgb) // luminance
    {
        return this.Y[0] * this.degamma(rgb[0]) 
             + this.Y[1] * this.degamma(rgb[1]) 
             + this.Y[2] * this.degamma(rgb[2]);
    }
);



function rgb2pro(rgb)
{
    return xyz2rgb(rgb2xyz(rgb), Rec2020);
}



function pro2rgb(r2020)
{
    return xyz2rgb(rgb2xyz(r2020, Rec2020));
}