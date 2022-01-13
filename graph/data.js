function colorFromDataType(dataType, active)
{
    switch (dataType)
    {
        case 'number': return active ? activeNumberColor : numberColor;
        case 'color':  return active ? activeColorColor  : colorColor;
        case 'object': return active ? activeObjectColor : objectColor;
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