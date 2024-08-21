const ProPhotoRGB = createColorSpace
(
    [0.7347, 0.2653], // R
    [0.1596, 0.8404], // G
    [0.0366, 0.0001], // B

    [0.2880402,
     0.7118741,
     0.0000857], // Y

    D50,         // W

    1.8,         // gamma 


    function(v) // degamma
    {
        return v >= 0.001953125 //0.03125
               ? Math.pow(v, this.gamma)
               : v / 16;
    },


    function(v) // regamma
    {
        return v > Math.pow(16 * 0.001953125, this.gamma - 1)
               ? Math.pow(v, 1/this.gamma)
               : v * 16;
    },


    function(rgb) // luminance
    {
        return  this.Y[0] * this.degamma(rgb[0]) 
              + this.Y[1] * this.degamma(rgb[1]) 
              + this.Y[2] * this.degamma(rgb[2]);
    }
);



function rgb2pro(rgb)
{
    return xyz2rgb(rgb2xyz(rgb), ProPhotoRGB);
}



function pro2rgb(pro)
{
    return xyz2rgb(rgb2xyz(pro, ProPhotoRGB));
}