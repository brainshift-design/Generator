const rgbObject       = hex2rgb('#bee0ff');
const rgbActiveObject = hex2rgb('#18a0fb');
const rgbNumber       = hex2rgb('#ddd');
const rgbActiveNumber = hex2rgb('#787878');
const rgbColor        = hex2rgb('#cc33cc'); // these are normally
const rgbActiveColor  = hex2rgb('#ff00ff'); // not used



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



function dataFromNumber(num, dec = -1)
{
    return {
        type:    'number',
        value:    num,
        decimals: dec
    };
}



function dataFromColor(color)
{
    return {
        type: 'color',
        color: color
    };
}