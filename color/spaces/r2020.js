const Rec2020 = createColorSpace
(
    [0.708, 0.292], // R
    [0.170, 0.797], // G
    [0.131, 0.046], // B

    [0.2627,
     0.6780,
     0.0593],  // Y

    D65,       // W

    2.2,       // gamma 


    function(v) // degamma
    {
        return v >= 0.08145
             ? Math.pow((v + 0.0993) / 1.0993, this.gamma)
             : v / 4.5;
    },


    function(v) // regamma
    {
        return v > 0.0181
             ? 1.0993 * Math.pow(v, 1 / this.gamma) - 0.0993
             : v * 4.5;
    },
    

    function(rgb) // luminance
    {
        return this.Y[0] * this.degamma(rgb[0]) 
             + this.Y[1] * this.degamma(rgb[1]) 
             + this.Y[2] * this.degamma(rgb[2]);
    }
);



function rgb2r2020(rgb)
{
    return xyz2rgb(rgb2xyz(rgb), Rec2020);
}



function r20202rgb(r2020)
{
    return xyz2rgb(rgb2xyz(r2020, Rec2020));
}