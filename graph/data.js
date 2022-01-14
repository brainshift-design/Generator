function rgbFromDataType(dataType, active)
{
    switch (dataType)
    {
        case 'number': return active ? rgbActiveNumber : rgbNumber;
        case 'color':  return active ? rgbActiveColor  : rgbColor;
        case 'object': return active ? rgbActiveObject : rgbObject;
    }

    return 'magenta';
}



function dataFromNumber(num)
{
    return {
        type: 'number',
        value: num 
    };
}



function dataFromColor(color)
{
    return {
        type: 'color',
        color: color
    };
}