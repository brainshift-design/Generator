function dataColorIsNaN(c)
{
    return isNaN(c[1])
        || isNaN(c[2])
        || isNaN(c[3]);
}



function dataColorIsValid(col, lim = Eps)
{
    return rgbIsValid(dataColor2rgb(col), lim);
}