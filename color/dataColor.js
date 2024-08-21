const ColorEpsilon = 0.001;



function rgb2dataColor(rgb)
{
    const _space = 'rgb';

    return [
        _space, 
        getNormalColorValue(rgb[0], _space, 0), 
        getNormalColorValue(rgb[1], _space, 1), 
        getNormalColorValue(rgb[2], _space, 2) ]; 
}



function makeDataColor(space, c1, c2, c3, allSpaces)
{
    const _space = colorSpace(space.value, allSpaces);

    return [
        _space, 
        getNormalColorValue(c1.value, _space, 0), 
        getNormalColorValue(c2.value, _space, 1), 
        getNormalColorValue(c3.value, _space, 2) ]; 
}



function dataColorIsNaN(c)
{
    return isNaN(c[1])
        || isNaN(c[2])
        || isNaN(c[3]);
}



function dataColorIsValid(col, lim = ColorEpsilon)
{
    return rgbIsValid(dataColor2rgb(col), lim);
}



function dataColorIsOk(col, lim = ColorEpsilon)
{
    return rgbIsOk(dataColor2rgb(col), lim);
}